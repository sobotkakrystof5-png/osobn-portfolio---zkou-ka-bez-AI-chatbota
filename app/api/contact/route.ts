import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { asciiSafe, contactFrom } from "@/lib/email";
import {
  describeLeadSource,
  EMAIL_RE,
  findInterest,
  findTimeline,
  INTEREST_IDS,
  normalizePhone,
  normalizeUrl,
  SOURCE_KEYS,
  TIMELINE_IDS,
} from "@/lib/lead";
import { checkSpam } from "@/lib/spam";
import { verifyTurnstile } from "@/lib/turnstile";
import { sendRequest, type ZakazIqIssue } from "@/lib/zakaziq";

// Hláška v `error` platí i pro chybějící pole, ne jen pro neplatné.
const text = (max: number, error?: string) => z.string(error ? { error } : undefined).trim().max(max);

const schema = z.object({
  name: text(120, "Zadejte prosím jméno").min(2, "Zadejte prosím jméno"),
  email: text(200, "Neplatná emailová adresa").refine((v) => EMAIL_RE.test(v), "Neplatná emailová adresa"),
  phone: text(40, "Zadejte prosím telefon, např. 777 123 456").refine((v) => normalizePhone(v) !== null, "Zadejte prosím telefon, např. 777 123 456"),
  message: text(1500).optional(),
  // Doplňkové údaje poptávku nikdy nezablokují: neplatná hodnota se zahodí.
  interest: z.enum(INTEREST_IDS).optional().catch(undefined),
  timeline: z.enum(TIMELINE_IDS).optional().catch(undefined),
  url: text(500).optional().catch(undefined),
  page: text(200).optional().catch(undefined),
  source: z.partialRecord(z.enum(SOURCE_KEYS), text(200)).optional().catch(undefined),
  website: z.string().max(500).optional(),
  // Ochrana proti robotům (LeadForm). Chybějící nebo nesmyslná hodnota poptávku
  // nezablokuje, jen ji pošle k ruční kontrole e-mailem.
  elapsed: z.number().int().min(0).max(30 * 24 * 60 * 60 * 1000).optional().catch(undefined),
  turnstileToken: z.string().max(2048).optional().catch(undefined),
});

type Lead = z.infer<typeof schema>;

const CONTACT_FIELDS = new Set(["name", "email", "phone"]);
const IDEMPOTENCY_KEY_RE = /^\S{1,200}$/;

/**
 * Same-origin brána mezi formulářem v prohlížeči a doručením poptávky.
 * Prohlížeč zná jen `/api/contact`, klíč k ZakazIQ zůstává na serveru.
 *
 * Ochrana proti robotům (před doručením):
 *   - middleware.ts: v produkci jen s hlavičkou Origin https://vizeon.cz, limit na IP
 *   - skrytá past `website` a lib/spam.ts → jistý robot dostane falešný úspěch
 *   - Cloudflare Turnstile (lib/turnstile.ts), když jsou nastavené klíče;
 *     odmítnutý token = 422, chybějící token = jen e-mailem ke kontrole
 *   - podezřelá poptávka (lib/spam.ts) jde jen e-mailem „Možná spam“, ne do adminu
 *
 * Doručení:
 *   1. Admin ZakazIQ (lib/zakaziq.ts): nepotvrzená poptávka v Poptávkách
 *      z webů a upozornění do zvonku; e-mail admin neposílá
 *   2. Resend: prostý e-mail, záchranná síť, když ZakazIQ poptávku nepřevezme
 *
 * Ztracená poptávka je dražší než e-mail navíc, takže při pochybnosti radši
 * občasná duplicita. Chybu vrátíme, až když selžou obě cesty.
 */
export async function POST(req: NextRequest) {
  const contentType = req.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json({ error: "Invalid content type" }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const issues = parsed.error.issues.map((i) => ({ field: String(i.path[0] ?? ""), message: i.message }));
    return invalidResponse(issues);
  }
  const lead = parsed.data;

  // Past na roboty: člověk skryté pole nevidí. Robotovi předstíráme úspěch.
  if (lead.website) {
    console.info("[Contact API] Vyplněná past na roboty, poptávka zahozena");
    return acceptedResponse();
  }

  const spam = checkSpam(lead);
  if (spam.drop) {
    console.info(`[Contact API] Robot (${spam.drop}), poptávka zahozena`);
    return acceptedResponse();
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || null;
  const human = await verifyTurnstile(lead.turnstileToken, ip);
  if (human === "invalid") {
    return NextResponse.json(
      {
        error: "Nepodařilo se ověřit, že formulář vyplňuje člověk. Zkuste ho prosím odeslat znovu, nebo napište na info@vizeon.cz.",
        code: "CAPTCHA",
      },
      { status: 422 },
    );
  }
  if (human === "missing") spam.review.push("chybí ověření Cloudflare Turnstile (v prohlížeči se nenačetlo nebo nestihlo)");
  if (human === "unavailable") spam.review.push("ověření Cloudflare Turnstile neodpovědělo");

  // Podezřelé jde jen e-mailem. Když e-mail selže, radši do adminu než ztratit poptávku.
  if (spam.review.length) {
    console.info(`[Contact API] Možná spam (${spam.review.join("; ")}), posílám jen e-mailem`);
    // Mimo produkci se nic neposílá, stejně jako do ZakazIQ (lib/zakaziq.ts).
    if (process.env.VERCEL_ENV !== "production") return acceptedResponse();
    if (await sendFallbackEmail(lead, { kind: "review", reasons: spam.review })) return acceptedResponse();
  }

  const headerKey = req.headers.get("idempotency-key");
  const idempotencyKey = headerKey && IDEMPOTENCY_KEY_RE.test(headerKey) ? headerKey : randomUUID();

  const result = await sendRequest(
    {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: composeMessage(lead),
      companyUrl: companyUrl(lead),
      // Mimo produkci (lokálně, preview) se do ZakazIQ nic neposílá, ať se
      // Poptávky v adminu neplní testy.
      test: process.env.VERCEL_ENV !== "production",
    },
    idempotencyKey,
  );
  if (result.ok) return acceptedResponse();

  // Chyba v kontaktu, kterou návštěvník může opravit, patří k poli.
  // Cokoli jiného řeší záložní e-mail, aby poptávka nepropadla.
  if (result.code === "VALIDATION_ERROR" && result.issues?.length && result.issues.every((i) => CONTACT_FIELDS.has(i.field))) {
    return invalidResponse(result.issues);
  }

  console.warn(`[Contact API] ZakazIQ poptávku nepřevzal (${result.code}), zkouším Resend`);
  if (await sendFallbackEmail(lead, { kind: "fallback", code: result.code })) return acceptedResponse();

  console.error("[Contact API] KRITICKÉ: poptávku se nepodařilo doručit žádnou cestou");
  return NextResponse.json(
    { error: "Zprávu se nepodařilo odeslat. Napište nám prosím přímo na info@vizeon.cz." },
    { status: 502 },
  );
}

/** Adresa webu z kroku 2 u prověrky; neplatná se zahodí, poptávku neblokuje. */
function companyUrl(lead: Lead): string | undefined {
  return (lead.url && normalizeUrl(lead.url)) || undefined;
}

/** Zpráva do ZakazIQ: zájem, termín, stránka a zdroj nahoře, pak text návštěvníka. */
function composeMessage(lead: Lead): string | undefined {
  const head = [
    lead.interest && `Zájem: ${findInterest(lead.interest)?.label}`,
    lead.timeline && `Termín: ${findTimeline(lead.timeline)?.label}`,
    lead.page && `Stránka: ${lead.page}`,
    describeLeadSource(lead.source) && `Zdroj: ${describeLeadSource(lead.source)}`,
  ].filter(Boolean);
  return [head.join("\n"), lead.message].filter(Boolean).join("\n\n") || undefined;
}

/** Proč poptávka jde e-mailem: ZakazIQ ji nepřevzal, nebo vypadá jako spam. */
type EmailReason = { kind: "fallback"; code: string } | { kind: "review"; reasons: string[] };

/** Prostý e-mail přes Resend: záchranná síť, nebo poptávka ke kontrole, jestli není spam. */
async function sendFallbackEmail(lead: Lead, why: EmailReason): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Contact API] RESEND_API_KEY chybí v environment variables");
    return false;
  }

  const toEmail = process.env.CONTACT_EMAIL ?? "info@vizeon.cz";
  const interest = findInterest(lead.interest)?.label;
  const source = describeLeadSource(lead.source);
  const phone = normalizePhone(lead.phone) ?? lead.phone;

  const details = (
    [
      ["Jméno", lead.name],
      ["E-mail", lead.email],
      ["Telefon", phone],
      ["Zájem", interest],
      ["Termín", findTimeline(lead.timeline)?.label],
      ["Web", companyUrl(lead)],
      ["Stránka", lead.page],
      ["Zdroj", source],
    ] as [string, string | undefined][]
  ).filter((d): d is [string, string] => Boolean(d[1]));

  const review = why.kind === "review";
  const heading = review ? "Možná spam z webu VIZEON" : "Nová poptávka z webu VIZEON";
  const note = review
    ? `Do ZakazIQ jsem ji neposlal, vypadá jako spam: ${why.reasons.join("; ")}. Jestli je skutečná, zapiš ji ručně.`
    : `Do ZakazIQ se nepropsala (${why.code}). Zapiš ji prosím ručně.`;
  const subject = `${review ? "Mozna spam: poptavka" : "Nova poptavka"}${interest ? ` (${interest})` : ""} od ${lead.name} - VIZEON`;

  const htmlValue = (label: string, value: string) => {
    const v = escapeHtml(value);
    if (label === "E-mail") return `<a href="mailto:${v}" style="color: #c9a84c;">${v}</a>`;
    if (label === "Telefon") return `<a href="tel:${v}" style="color: #c9a84c;">${v}</a>`;
    return v;
  };

  try {
    const resend = new Resend(apiKey);
    const { error: sendError } = await resend.emails.send({
      from: contactFrom(),
      to: [toEmail],
      replyTo: lead.email,
      subject: asciiSafe(subject),
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f5f5f5; border-radius: 4px;">
          <h2 style="margin: 0 0 8px; font-weight: 300; font-size: 28px; color: #c9a84c;">${heading}</h2>
          <p style="margin: 0 0 24px; color: #888; font-size: 13px;">${escapeHtml(note)}</p>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            ${details
              .map(
                ([label, value], i) => `
            <tr${i ? ` style="border-top: 1px solid rgba(255,255,255,0.07);"` : ""}>
              <td style="padding: 10px 0; color: #888; font-size: 13px; width: 90px;">${label}</td>
              <td style="padding: 10px 0; color: #f5f5f5; font-size: 15px;">${htmlValue(label, value)}</td>
            </tr>`,
              )
              .join("")}
          </table>
          ${
            lead.message
              ? `
          <div style="background: #161616; border-left: 2px solid #c9a84c; padding: 16px 20px; border-radius: 2px; margin-bottom: 24px;">
            <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Zpráva</p>
            <p style="margin: 0; color: #f5f5f5; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(lead.message)}</p>
          </div>`
              : ""
          }
          <p style="margin: 0; color: #444; font-size: 12px;">
            Odesláno z vizeon.cz · ${new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" })}
          </p>
        </div>
      `,
      text: [
        heading,
        note,
        "",
        ...details.map(([label, value]) => `${label}: ${value}`),
        ...(lead.message ? ["", "Zpráva:", lead.message] : []),
      ].join("\n"),
    });

    if (sendError) {
      console.error("[Contact API] Resend chyba:", sendError.name);
      return false;
    }
    console.log("[Contact API] Záložní e-mail odeslán");
    return true;
  } catch (error) {
    console.error(`[Contact API] Resend selhal (typ_chyby=${error instanceof Error ? error.name : "UnknownError"})`);
    return false;
  }
}

function acceptedResponse() {
  return NextResponse.json({ ok: true, status: "accepted" }, { status: 202 });
}

function invalidResponse(issues: ZakazIqIssue[]) {
  return NextResponse.json({ error: "Zkontrolujte prosím formulář.", issues }, { status: 422 });
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
