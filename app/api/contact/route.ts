import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { asciiSafe, contactFrom } from "@/lib/email";
import {
  describeLeadSource,
  EMAIL_RE,
  findInterest,
  INTEREST_IDS,
  normalizePhone,
  SOURCE_KEYS,
} from "@/lib/lead";
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
  page: text(200).optional().catch(undefined),
  source: z.partialRecord(z.enum(SOURCE_KEYS), text(200)).optional().catch(undefined),
  website: z.string().max(500).optional(),
});

type Lead = z.infer<typeof schema>;

const CONTACT_FIELDS = new Set(["name", "email", "phone"]);
const IDEMPOTENCY_KEY_RE = /^\S{1,200}$/;

/**
 * Same-origin brána mezi formulářem v prohlížeči a doručením poptávky.
 * Prohlížeč zná jen `/api/contact`, klíč k ZakazIQ zůstává na serveru.
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

  const headerKey = req.headers.get("idempotency-key");
  const idempotencyKey = headerKey && IDEMPOTENCY_KEY_RE.test(headerKey) ? headerKey : randomUUID();

  const result = await sendRequest(
    {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      message: composeMessage(lead),
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
  if (await sendFallbackEmail(lead, result.code)) return acceptedResponse();

  console.error("[Contact API] KRITICKÉ: poptávku se nepodařilo doručit žádnou cestou");
  return NextResponse.json(
    { error: "Zprávu se nepodařilo odeslat. Napište nám prosím přímo na info@vizeon.cz." },
    { status: 502 },
  );
}

/** Zpráva do ZakazIQ: zájem, stránka a zdroj nahoře, pak text návštěvníka. */
function composeMessage(lead: Lead): string | undefined {
  const head = [
    lead.interest && `Zájem: ${findInterest(lead.interest)?.label}`,
    lead.page && `Stránka: ${lead.page}`,
    describeLeadSource(lead.source) && `Zdroj: ${describeLeadSource(lead.source)}`,
  ].filter(Boolean);
  return [head.join("\n"), lead.message].filter(Boolean).join("\n\n") || undefined;
}

/** Záchranná síť: prostý e-mail přes Resend s důvodem, proč neprošel ZakazIQ. */
async function sendFallbackEmail(lead: Lead, zakazIqCode: string): Promise<boolean> {
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
      ["Stránka", lead.page],
      ["Zdroj", source],
    ] as [string, string | undefined][]
  ).filter((d): d is [string, string] => Boolean(d[1]));

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
      subject: asciiSafe(`Nova poptavka${interest ? ` (${interest})` : ""} od ${lead.name} - VIZEON`),
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f5f5f5; border-radius: 4px;">
          <h2 style="margin: 0 0 8px; font-weight: 300; font-size: 28px; color: #c9a84c;">Nová poptávka z webu VIZEON</h2>
          <p style="margin: 0 0 24px; color: #888; font-size: 13px;">Do ZakazIQ se nepropsala (${escapeHtml(zakazIqCode)}). Zapiš ji prosím ručně.</p>
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
        "Nová poptávka z webu VIZEON",
        `Do ZakazIQ se nepropsala (${zakazIqCode}). Zapiš ji prosím ručně.`,
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
