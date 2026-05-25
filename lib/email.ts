// ─────────────────────────────────────────────────────────────────────────────
// Resend sender helpers — pro admin notifikaci
// ─────────────────────────────────────────────────────────────────────────────
// Defenzivní vrstva proti ByteString chybě: HTTP hlavičky (from, subject)
// musí být ASCII. Tento helper sanitizuje vstup a umožňuje override
// odesílací adresy přes ENV (např. po verifikaci vlastní domény na Resend).

const FALLBACK = {
  bookingNotification: "VIZEON Booking <onboarding@resend.dev>",
  bookingConfirmation: "Krystof Sobotka - VIZEON <onboarding@resend.dev>",
  contact:             "VIZEON Kontakt <onboarding@resend.dev>",
} as const;

export function asciiSafe(s: string): string {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[–—]/g, "-")
    .replace(/[^\x20-\x7E]/g, "");
}

export function bookingNotificationFrom(): string {
  return asciiSafe(process.env.RESEND_BOOKING_FROM ?? FALLBACK.bookingNotification);
}

export function bookingConfirmationFrom(): string {
  return asciiSafe(process.env.RESEND_BOOKING_CONFIRM_FROM ?? FALLBACK.bookingConfirmation);
}

export function contactFrom(): string {
  return asciiSafe(process.env.RESEND_CONTACT_FROM ?? FALLBACK.contact);
}

// ─────────────────────────────────────────────────────────────────────────────
// Gmail SMTP — pro potvrzovací e-mail klientovi
// ─────────────────────────────────────────────────────────────────────────────
// Posílá přes Gmail účet vlastníka (sobotkakrystof5@gmail.com).
// Vyžaduje env proměnnou GMAIL_APP_PASSWORD (App Password z Google účtu).
// Viz: https://myaccount.google.com/apppasswords
// ─────────────────────────────────────────────────────────────────────────────
import nodemailer from "nodemailer";

export interface ClientConfirmationData {
  to: string;
  firstName: string;
  name: string;
  phone: string;
  service: string;
  dateFormatted: string;
  slot: string;
  timeStart: string;
}

export async function sendClientConfirmationEmail(data: ClientConfirmationData): Promise<void> {
  const appPassword = process.env.GMAIL_APP_PASSWORD;
  const gmailUser   = process.env.GMAIL_USER ?? "sobotkakrystof5@gmail.com";

  if (!appPassword) {
    throw new Error("GMAIL_APP_PASSWORD není nastavena v environment variables.");
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // STARTTLS
    auth: {
      user: gmailUser,
      pass: appPassword,
    },
  });

  const escapeHtml = (s: string) =>
    s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
     .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

  await transporter.sendMail({
    from: `"Kryštof Sobotka – VIZEON" <${gmailUser}>`,
    to: data.to,
    replyTo: gmailUser,
    subject: `Potvrzení rezervace – ${data.dateFormatted} v ${data.timeStart}`,
    html: `
      <!DOCTYPE html>
      <html lang="cs">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
      <body style="margin:0; padding:0; background:#f4f4f4;">
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; max-width: 600px; margin: 32px auto; background: #0d0d0d; color: #e8e8e8; border-radius: 14px; overflow: hidden;">

          <!-- Header -->
          <div style="padding: 40px 40px 28px; border-bottom: 1px solid #1f1f1f;">
            <p style="margin: 0 0 6px; color: #c9a84c; font-size: 11px; letter-spacing: 2.5px; text-transform: uppercase;">VIZEON · Kryštof Sobotka</p>
            <h1 style="margin: 0; font-size: 26px; font-weight: 300; line-height: 1.3; color: #ffffff;">Vaše rezervace<br>je potvrzena.</h1>
          </div>

          <!-- Úvodní text -->
          <div style="padding: 32px 40px 0;">
            <p style="margin: 0 0 16px; color: #b0b0b0; font-size: 15px; line-height: 1.75;">
              Vážený/á <strong style="color:#ffffff;">${escapeHtml(data.firstName)}</strong>,
            </p>
            <p style="margin: 0 0 16px; color: #b0b0b0; font-size: 15px; line-height: 1.75;">
              děkuji za Vaši důvěru a těším se na naši společnou konzultaci.
              Termín <strong style="color:#ffffff;">${escapeHtml(data.dateFormatted)} v ${escapeHtml(data.timeStart)}</strong> jsem si zapsal
              a s Vaší účastí plně počítám.
            </p>
            <p style="margin: 0; color: #b0b0b0; font-size: 15px; line-height: 1.75;">
              V případě jakýchkoliv dotazů nebo potřeby změny termínu mě neváhejte kontaktovat —
              jsem tu pro Vás.
            </p>
          </div>

          <!-- Shrnutí rezervace -->
          <div style="margin: 28px 40px; background: #1a1a1a; border: 1px solid #2a2a2a; border-radius: 10px; padding: 24px;">
            <p style="margin: 0 0 16px; color: #c9a84c; font-size: 11px; letter-spacing: 2px; text-transform: uppercase;">Souhrn rezervace</p>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 7px 0; color: #666; font-size: 13px; width: 110px; vertical-align: top;">Jméno</td>
                <td style="padding: 7px 0; color: #e8e8e8; font-size: 13px; font-weight: 500;">${escapeHtml(data.name)}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #666; font-size: 13px; vertical-align: top;">Služba</td>
                <td style="padding: 7px 0; color: #e8e8e8; font-size: 13px;">${escapeHtml(data.service)}</td>
              </tr>
              <tr style="border-top: 1px solid #2a2a2a;">
                <td style="padding: 10px 0 7px; color: #666; font-size: 13px; vertical-align: top;">Datum</td>
                <td style="padding: 10px 0 7px; color: #ffffff; font-size: 15px; font-weight: 600;">${escapeHtml(data.dateFormatted)}</td>
              </tr>
              <tr>
                <td style="padding: 7px 0; color: #666; font-size: 13px; vertical-align: top;">Čas</td>
                <td style="padding: 7px 0; color: #ffffff; font-size: 15px; font-weight: 600;">${escapeHtml(data.slot)}</td>
              </tr>
            </table>
          </div>

          <!-- Kontakt -->
          <div style="padding: 0 40px 36px;">
            <p style="margin: 0 0 8px; color: #666; font-size: 13px; line-height: 1.7;">
              Potřebujete termín přesunout nebo máte dotaz před konzultací?
            </p>
            <a href="mailto:${escapeHtml(gmailUser)}"
               style="color: #c9a84c; font-size: 13px; text-decoration: none; font-weight: 500;">
              ${escapeHtml(gmailUser)}
            </a>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 40px; border-top: 1px solid #1a1a1a; text-align: center;">
            <p style="margin: 0; color: #3a3a3a; font-size: 11px; letter-spacing: 1px;">
              VIZEON · Kryštof Sobotka · vizeon.vercel.app
            </p>
          </div>

        </div>
      </body>
      </html>
    `,
  });
}
