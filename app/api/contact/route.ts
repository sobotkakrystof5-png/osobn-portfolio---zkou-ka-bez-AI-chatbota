import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.email(),
  phone: z.string().optional(),
  message: z.string().min(10),
});

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

  const { name, email, phone, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[Contact API] RESEND_API_KEY chybí v environment variables");
    return NextResponse.json({ error: "Konfigurace serveru je neúplná." }, { status: 500 });
  }

  const toEmail = process.env.CONTACT_EMAIL ?? "sobotkakrystof5@gmail.com";

  try {
    const resend = new Resend(apiKey);
    const { error: sendError } = await resend.emails.send({
      from: "VIZEON Kontakt <onboarding@resend.dev>",
      to: [toEmail],
      replyTo: email,
      subject: `Nova zprava od ${name} - VIZEON`,
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
      return NextResponse.json({ error: `Resend: ${sendError.message}` }, { status: 500 });
    }

    console.log(`[Contact API] Zpráva od ${name} (${email}) úspěšně odeslána`);
    return NextResponse.json({ ok: true });

  } catch (err) {
    console.error("[Contact API] Neočekávaná chyba:", err);
    const message = err instanceof Error ? err.message : JSON.stringify(err);
    return NextResponse.json({ error: `Resend: ${message}` }, { status: 500 });
  }
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
