import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { asciiSafe, contactFrom } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

type ContactData = z.infer<typeof schema>;

const DEFAULT_SERVICE = "new_website";
const AGENT_TIMEOUT_MS = 8_000;

/**
 * Same-origin brána mezi formulářem v prohlížeči a doručením poptávky.
 *
 * Prohlížeč zná jen `/api/contact`; URL backendu a bearer token zůstávají
 * výhradně v serverovém prostředí Next.js. Díky tomu nelze klíč vyčíst ze
 * zdrojového kódu stránky ani z DevTools návštěvníka.
 *
 * Doručení má dvě nezávislé cesty:
 *   1. lead agent (`vizeon-lead-agent`) — klasifikace, scoring, Notion + e-mail
 *   2. Resend — prostý e-mail, záchranná síť
 *
 * Resend se použije jen tehdy, když agent poptávku nepřevezme. Ztracená
 * poptávka je dražší než e-mail navíc, takže tichý výpadek radši vyměníme
 * za občasnou duplicitu. Chybu vrátíme až v okamžiku, kdy selhaly obě cesty
 * a poptávka reálně nikde není — teprve pak má smysl poslat návštěvníka
 * jinam než do prázdna.
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
    return NextResponse.json(
      { error: "Neplatná data formuláře", issues: parsed.error.issues },
      { status: 422 }
    );
  }

  if (await forwardToLeadAgent(parsed.data)) {
    return acceptedResponse();
  }

  console.warn("[Contact API] Lead agent poptávku nepřevzal — zkouším Resend");

  if (await sendFallbackEmail(parsed.data)) {
    return acceptedResponse();
  }

  // Obě cesty selhaly: poptávka není nikde zaznamenaná. Tvářit se, že vše
  // proběhlo, by znamenalo zákazníka o kontakt připravit bez jeho vědomí.
  console.error("[Contact API] KRITICKÉ: poptávku se nepodařilo doručit žádnou cestou");
  return NextResponse.json(
    { error: "Zprávu se nepodařilo odeslat. Napiš prosím přímo na info@vizeon.cz." },
    { status: 502 }
  );
}

/** Vrací true, jen když agent poptávku prokazatelně převzal. */
async function forwardToLeadAgent(data: ContactData): Promise<boolean> {
  const agentUrl = process.env.LEAD_AGENT_URL;
  const agentApiKey = process.env.LEAD_AGENT_API_KEY;

  if (!agentUrl || !agentApiKey) {
    // Do logu nepatří hodnoty proměnných — stačí vědět, že konfigurace chybí.
    console.error("[Contact API] Lead agent není nakonfigurovaný");
    return false;
  }

  const { name, email, phone, message } = data;
  try {
    const agentResponse = await fetch(agentUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${agentApiKey}`,
      },
      body: JSON.stringify({
        name,
        email,
        phone: phone || undefined,
        message,
        // Současný formulář nemá výběr služby. Výchozí hodnota zachová jeho UI
        // beze změny a stále splní povinné schéma LeadInput v agent backendu.
        service: DEFAULT_SERVICE,
      }),
      signal: AbortSignal.timeout(AGENT_TIMEOUT_MS),
    });

    if (!agentResponse.ok) {
      // Tělo odpovědi nečteme ani nelogujeme: je to externí systém a mohlo by
      // obsahovat citlivé diagnostické údaje.
      console.error(`[Contact API] Lead agent vrátil HTTP ${agentResponse.status}`);
      return false;
    }

    return true;
  } catch (error) {
    // Typ chyby napoví, zda šlo např. o timeout. Text chyby ani stack trace
    // nelogujeme — klientský request nebo HTTP hlavičky by mohly nést secret.
    console.error(`[Contact API] Lead agent není dostupný (typ_chyby=${errorName(error)})`);
    return false;
  }
}

/** Záchranná síť: prostý e-mail přes Resend, stejný jako před nasazením agenta. */
async function sendFallbackEmail(data: ContactData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Contact API] RESEND_API_KEY chybí v environment variables");
    return false;
  }

  const toEmail = process.env.CONTACT_EMAIL ?? "info@vizeon.cz";
  const { name, email, phone, message } = data;

  try {
    const resend = new Resend(apiKey);
    const { error: sendError } = await resend.emails.send({
      from: contactFrom(),
      to: [toEmail],
      replyTo: email,
      subject: asciiSafe(`Nova zprava od ${name} - VIZEON`),
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px; background: #0a0a0a; color: #f5f5f5; border-radius: 4px;">
          <h2 style="margin: 0 0 24px; font-weight: 300; font-size: 28px; color: #c9a84c;">
            Nová zpráva z webu VIZEON
          </h2>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
            <tr>
              <td style="padding: 10px 0; color: #888; font-size: 13px; width: 90px;">Jméno</td>
              <td style="padding: 10px 0; color: #f5f5f5; font-size: 15px;">${escapeHtml(name)}</td>
            </tr>
            <tr style="border-top: 1px solid rgba(255,255,255,0.07);">
              <td style="padding: 10px 0; color: #888; font-size: 13px;">Email</td>
              <td style="padding: 10px 0; font-size: 15px;">
                <a href="mailto:${escapeHtml(email)}" style="color: #c9a84c;">${escapeHtml(email)}</a>
              </td>
            </tr>
            ${
              phone
                ? `
            <tr style="border-top: 1px solid rgba(255,255,255,0.07);">
              <td style="padding: 10px 0; color: #888; font-size: 13px;">Telefon</td>
              <td style="padding: 10px 0; color: #f5f5f5; font-size: 15px;">
                <a href="tel:${escapeHtml(phone)}" style="color: #c9a84c;">${escapeHtml(phone)}</a>
              </td>
            </tr>`
                : ""
            }
          </table>

          <div style="background: #161616; border-left: 2px solid #c9a84c; padding: 16px 20px; border-radius: 2px; margin-bottom: 24px;">
            <p style="margin: 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px;">Zpráva</p>
            <p style="margin: 0; color: #f5f5f5; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${escapeHtml(message)}</p>
          </div>

          <p style="margin: 0; color: #444; font-size: 12px;">
            Odesláno z vizeon.cz · ${new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" })}
          </p>
        </div>
      `,
      text: `Nová zpráva z webu VIZEON\n\nJméno: ${name}\nEmail: ${email}${phone ? `\nTelefon: ${phone}` : ""}\n\nZpráva:\n${message}`,
    });

    if (sendError) {
      console.error("[Contact API] Resend chyba:", JSON.stringify(sendError));
      return false;
    }

    console.log(`[Contact API] Záložní e-mail od ${name} úspěšně odeslán`);
    return true;
  } catch (error) {
    console.error(`[Contact API] Resend selhal (typ_chyby=${errorName(error)})`);
    return false;
  }
}

function acceptedResponse() {
  return NextResponse.json({ ok: true, status: "accepted" }, { status: 202 });
}

function errorName(error: unknown): string {
  return error instanceof Error ? error.name : "UnknownError";
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
