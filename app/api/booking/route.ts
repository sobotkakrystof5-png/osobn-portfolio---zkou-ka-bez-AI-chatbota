import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';

const bookingSchema = z.object({
  service:    z.string().min(1, 'Chybí služba'),
  subService: z.string().optional(),
  phone:      z.string().min(9,  'Neplatné telefonní číslo'),
  email:      z.email(),
  note:       z.string().optional(),
  date:       z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Neplatný formát data (YYYY-MM-DD)'),
  slot:       z.string().min(1, 'Chybí časový slot'),
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
    return NextResponse.json(
      { error: 'Neplatná data rezervace', issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { service, subService, phone, email, note, date, slot } = parsed.data;

  const [y, m, d] = date.split('-');
  const dateFormatted = `${parseInt(d)}. ${parseInt(m)}. ${y}`;
  const timeStart = slot.split('–')[0].trim();

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[Booking] RESEND_API_KEY chybí v environment variables');
    return NextResponse.json({ error: 'Konfigurace serveru je neúplná.' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);

    // Email mně — notifikace o nové rezervaci
    const { error: err1 } = await resend.emails.send({
      from: 'VIZEON Booking <onboarding@resend.dev>',
      to: 'sobotkakrystof5@gmail.com',
      subject: `Nová rezervace — ${service} — ${dateFormatted}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="border-bottom: 1px solid #eee; padding-bottom: 12px;">Nová rezervace konzultace</h2>
          <table style="width:100%; border-collapse:collapse;">
            <tr><td style="padding:8px 0; color:#666; width:140px;">Služba</td><td style="padding:8px 0; font-weight:500;">${service}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Typ projektu</td><td style="padding:8px 0;">${subService ?? '—'}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Telefon</td><td style="padding:8px 0;">${phone}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">E-mail</td><td style="padding:8px 0;">${email}</td></tr>
            <tr><td style="padding:8px 0; color:#666;">Poznámka</td><td style="padding:8px 0;">${note ?? '—'}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; color:#666;"><strong>Datum</strong></td><td style="padding:8px; font-weight:700;">${dateFormatted}</td></tr>
            <tr style="background:#f9f9f9;"><td style="padding:8px; color:#666;"><strong>Čas</strong></td><td style="padding:8px; font-weight:700;">${slot}</td></tr>
          </table>
          <p style="margin-top:20px; color:#999; font-size:13px;">Odesláno přes VIZEON rezervační systém</p>
        </div>
      `,
    });

    if (err1) {
      console.error('[Booking] Resend chyba (notifikace mně):', JSON.stringify(err1));
      return NextResponse.json({ error: `Nepodařilo se odeslat email: ${err1.message}` }, { status: 500 });
    }

    // Potvrzovací email klientovi
    const { error: err2 } = await resend.emails.send({
      from: 'Kryštof Sobotka — VIZEON <onboarding@resend.dev>',
      to: email,
      subject: `Potvrzení konzultace — ${dateFormatted} v ${timeStart}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0a; color: #fff; padding: 40px; border-radius: 12px;">
          <h1 style="font-size: 24px; font-weight: 300; margin-bottom: 8px;">Budu s vámi počítat.</h1>
          <p style="color: #c9a84c; font-size: 14px; margin-bottom: 32px;">VIZEON — Kryštof Sobotka</p>
          <p style="color: #aaa; line-height: 1.7;">V <strong style="color:#fff">${dateFormatted} v ${timeStart}</strong> vás kontaktuji na čísle <strong style="color:#fff">${phone}</strong>. Domluvíme se na detailech a vy mi popíšete vizi vašeho projektu.</p>
          <div style="background: #1a1a1a; border-radius: 8px; padding: 20px; margin: 24px 0;">
            <p style="color:#888; font-size:13px; margin:0 0 8px;">Shrnutí rezervace</p>
            <p style="margin:4px 0; font-size:14px;"><span style="color:#666;">Služba:</span> ${subService ?? service}</p>
            <p style="margin:4px 0; font-size:14px;"><span style="color:#666;">Termín:</span> ${dateFormatted} · ${slot}</p>
          </div>
          <p style="color: #666; font-size: 13px; line-height: 1.7;">Pokud potřebujete termín změnit, ozvěte se na <a href="mailto:sobotkakrystof5@gmail.com" style="color:#c9a84c;">sobotkakrystof5@gmail.com</a>.</p>
          <p style="margin-top: 32px; color: #444; font-size: 12px;">VIZEON · Kryštof Sobotka · vizeon.cz</p>
        </div>
      `,
    });

    if (err2) {
      console.warn('[Booking] Potvrzení klientovi selhalo:', JSON.stringify(err2));
      // Hlavní notifikace prošla — pokračujeme, klient uvidí success
    }

    console.log(`[Booking] Rezervace úspěšně odeslána: ${service} ${dateFormatted} ${slot}`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[Booking] Neočekávaná chyba:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: `Chyba: ${message}` }, { status: 500 });
  }
}
