import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import {
  asciiSafe,
  bookingNotificationFrom,
  bookingConfirmationFrom,
  buildClientConfirmationHtml,
} from '@/lib/email';

const bookingSchema = z.object({
  service:     z.string().optional().default('individualni'),
  serviceName: z.string().optional().default(''),
  subService:  z.string().optional(),
  name:       z.string().trim().min(2, 'Chybí jméno').max(120),
  phone:      z.string().optional().default(''),
  email:      z.email(),
  note:       z.string().optional(),
  date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Neplatný formát data (YYYY-MM-DD)'),
  time_slot:  z.string().min(1, 'Chybí časový slot'),
});

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') ?? '';
  if (!contentType.includes('application/json')) {
    return NextResponse.json({ error: 'Invalid content type' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    console.error('[Booking] Validation failed:', JSON.stringify(parsed.error.issues));
    return NextResponse.json(
      { error: 'Neplatná data rezervace', issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { service, serviceName, subService, name, phone, email, note, date, time_slot } = parsed.data;
  const firstName = name.split(/\s+/)[0];

  const [y, m, d] = date.split('-');
  const dateFormatted = `${parseInt(d)}. ${parseInt(m)}. ${y}`;
  const timeStart = time_slot.split(/\s*[-–]\s*/)[0].trim();
  const serviceLabel = subService ?? serviceName ?? service ?? '—';

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
     .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[Booking] RESEND_API_KEY chybí v environment variables');
    return NextResponse.json({ error: 'Konfigurace serveru je neúplná.' }, { status: 500 });
  }

  const adminEmail = process.env.CONTACT_EMAIL ?? 'sobotkakrystof5@gmail.com';
  const resend = new Resend(apiKey);

  try {
    // ── 1. Admin notifikace ─────────────────────────────────────────────────────
    const { error: err1 } = await resend.emails.send({
      from: bookingNotificationFrom(),
      to: adminEmail,
      replyTo: email,
      subject: asciiSafe(`Nova rezervace - ${name} - ${dateFormatted}`),
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 12px;">Nová rezervace konzultace</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; color:#666; width:140px;">Jméno</td><td style="padding:8px 0; font-weight:600;">${escapeHtml(name)}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Služba</td><td style="padding:8px 0; font-weight:500;">${escapeHtml(serviceName || service || '—')}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Typ projektu</td><td style="padding:8px 0;">${subService ? escapeHtml(subService) : '—'}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Telefon</td><td style="padding:8px 0;"><a href="tel:${encodeURIComponent(phone)}" style="color:#111; text-decoration:none;">${escapeHtml(phone)}</a></td></tr>
            <tr><td style="padding:8px 0; color:#666;">E-mail</td><td style="padding:8px 0;"><a href="mailto:${encodeURIComponent(email)}" style="color:#111; text-decoration:none;">${escapeHtml(email)}</a></td></tr>
            <tr><td style="padding:8px 0; color:#666;">Poznámka</td><td style="padding:8px 0;">${note ? escapeHtml(note) : '—'}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; color:#666;"><strong>Datum</strong></td><td style="padding:8px; font-weight:700;">${dateFormatted}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; color:#666;"><strong>Čas</strong></td><td style="padding:8px; font-weight:700;">${escapeHtml(time_slot)}</td></tr>
          </table>
          <p style="margin-top:20px; color:#999; font-size:13px;">Odesláno přes VIZEON rezervační systém</p>
        </div>
      `,
    });

    if (err1) {
      console.error('[Booking] Resend chyba (notifikace admin):', JSON.stringify(err1));
      return NextResponse.json({ error: `Nepodařilo se odeslat email: ${err1.message}` }, { status: 500 });
    }

    // ── 2. Potvrzovací e-mail klientovi (Resend) ────────────────────────────────
    const { error: err2 } = await resend.emails.send({
      from: bookingConfirmationFrom(),
      to: email,
      replyTo: adminEmail,
      subject: asciiSafe(`Potvrzeni rezervace - ${dateFormatted} v ${timeStart}`),
      html: buildClientConfirmationHtml({
        firstName,
        name,
        service: serviceLabel,
        dateFormatted,
        slot: time_slot,
        timeStart,
        replyEmail: adminEmail,
      }),
    });

    if (err2) {
      console.warn('[Booking] Potvrzovací e-mail klientovi NEODESLÁN:', JSON.stringify(err2));
    } else {
      console.log(`[Booking] Potvrzovací e-mail odeslán: ${email}`);
    }

    console.log(`[Booking] Rezervace zpracována: ${serviceLabel} ${dateFormatted} ${time_slot}`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[Booking] Neočekávaná chyba:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: `Chyba: ${message}` }, { status: 500 });
  }
}
