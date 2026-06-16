import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { asciiSafe, bookingNotificationFrom, sendClientConfirmationEmail } from '@/lib/email';
import { createClient } from '@supabase/supabase-js';
import type { ServiceKey } from '@/types/booking';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

const ZAKAZIQ_ENDPOINT = 'https://project-iq-sigma.vercel.app/api/public/booking';

// ZakazIQ přijímá jen hrubou kategorii projektu — naše služby (lib/booking-config.ts)
// jsou granulárnější, přesný název služby/sub-služby putuje v poli `message`.
const ZAKAZIQ_PROJECT_TYPE: Record<ServiceKey, string> = {
  weby: 'Web na míru',
  grafika: 'Grafický design',
  prezentace: 'Firemní prezentace',
  socialni: 'Správa sociálních sítí',
  bundle: 'Jiné',
  individualni: 'Jiné',
};

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date');
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Neplatné datum' }, { status: 400 });
  }

  const [{ data: available }, { data: taken }] = await Promise.all([
    supabase.from('available_slots').select('time_slot, capacity').eq('date', date).order('time_slot'),
    supabase.from('bookings').select('time_slot').eq('date', date).neq('status', 'cancelled'),
  ]);

  const bookedCount: Record<string, number> = {};
  for (const b of taken ?? []) {
    bookedCount[b.time_slot] = (bookedCount[b.time_slot] ?? 0) + 1;
  }

  const slots = (available ?? []).map((s: { time_slot: string; capacity: number }) => ({
    time_slot: s.time_slot,
    is_available: (bookedCount[s.time_slot] ?? 0) < s.capacity,
  }));

  return NextResponse.json({ slots });
}

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
    console.error('[Booking] Validation failed:', JSON.stringify(parsed.error.issues), '| Body:', JSON.stringify(body));
    return NextResponse.json(
      { error: 'Neplatná data rezervace', issues: parsed.error.issues },
      { status: 422 },
    );
  }

  const { service, serviceName, subService, name, phone, email, note, date, time_slot } = parsed.data;
  const firstName = name.split(/\s+/)[0];

  const escapeHtml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const [y, m, d] = date.split('-');
  const dateFormatted = `${parseInt(d)}. ${parseInt(m)}. ${y}`;
  const timeStart = time_slot.split(/\s*[-–]\s*/)[0].trim();

  // ── 1. Uložit rezervaci do Supabase (vlastní rezervační systém) ──────────────
  const { data: booking, error: supabaseError } = await supabase
    .from('bookings')
    .insert({
      name,
      email,
      phone: phone || null,
      service: serviceName || service,
      date,
      time_slot,
      note: note || null,
      status: 'pending',
    })
    .select('id')
    .single();

  if (supabaseError || !booking) {
    console.error('[Booking] Supabase insert error:', supabaseError);
    return NextResponse.json(
      { error: 'Nepodařilo se uložit rezervaci do databáze. Zkuste to prosím znovu.' },
      { status: 500 },
    );
  }

  // ── 2. Předání rezervace do ZakazIQ (přehled zakázek / kalendář) ──────────
  const zakaziqKey = process.env.ZAKAZIQ_API_KEY;
  if (!zakaziqKey) {
    console.error('[Booking] ZAKAZIQ_API_KEY chybí v environment variables');
    // Pokus o odstranění z Supabase pokud chybí konfigurace
    await supabase.from('bookings').delete().eq('id', booking.id).catch(e =>
      console.error('[Booking] Selhalo smazání booking z Supabase:', e)
    );
    return NextResponse.json({ error: 'Konfigurace serveru je neúplná.' }, { status: 500 });
  }

  const projectDetail = subService || serviceName || service;
  const zakaziqMessage = [
    projectDetail ? `Služba: ${projectDetail}` : null,
    phone ? `Telefon: ${phone}` : null,
    note || null,
  ].filter(Boolean).join('\n');

  let zakaziqId: string | null = null;

  try {
    const zakaziqRes = await fetch(ZAKAZIQ_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-api-key': zakaziqKey },
      body: JSON.stringify({
        name,
        email,
        projectType: ZAKAZIQ_PROJECT_TYPE[service as ServiceKey] ?? 'Jiné',
        date,
        time: timeStart,
        message: zakaziqMessage,
      }),
    });

    if (!zakaziqRes.ok) {
      const detail = await zakaziqRes.text().catch(() => '');
      console.error(`[Booking] ZakazIQ vrátil chybu ${zakaziqRes.status}:`, detail);
      // Pokus o odstranění z Supabase pokud se ZakazIQ nezdařilo
      await supabase.from('bookings').delete().eq('id', booking.id).catch(e =>
        console.error('[Booking] Selhalo smazání booking z Supabase:', e)
      );
      return NextResponse.json(
        { error: 'Rezervaci se nepodařilo uložit. Zkuste to prosím znovu.' },
        { status: 502 },
      );
    }

    // Pokusit se extrahovat ID z ZakazIQ response
    try {
      const zakaziqData = await zakaziqRes.json();
      zakaziqId = zakaziqData.id || zakaziqData.booking_id || null;
    } catch {
      // Ignorovat parsing error
    }

    // Aktualizovat booking s ZakazIQ ID pokud se podařilo získat
    if (zakaziqId) {
      await supabase
        .from('bookings')
        .update({ zakaziq_id: zakaziqId })
        .eq('id', booking.id)
        .catch(e => console.warn('[Booking] Selhala aktualizace zakaziq_id:', e));
    }
  } catch (err) {
    console.error('[Booking] Spojení se ZakazIQ se nezdařilo:', err);
    // Pokus o odstranění z Supabase pokud se ZakazIQ nezdařilo
    await supabase.from('bookings').delete().eq('id', booking.id).catch(e =>
      console.error('[Booking] Selhalo smazání booking z Supabase:', e)
    );
    return NextResponse.json(
      { error: 'Spojení se nezdařilo. Zkuste to prosím znovu.' },
      { status: 502 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[Booking] RESEND_API_KEY chybí v environment variables');
    return NextResponse.json({ error: 'Konfigurace serveru je neúplná.' }, { status: 500 });
  }

  try {
    const resend = new Resend(apiKey);

    // ── 1. Admin notifikace (Resend → sobotkakrystof5@gmail.com) ─────────────
    const { error: err1 } = await resend.emails.send({
      from: bookingNotificationFrom(),
      to: 'sobotkakrystof5@gmail.com',
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
      console.error('[Booking] Resend chyba (notifikace mně):', JSON.stringify(err1));
      return NextResponse.json({ error: `Nepodařilo se odeslat email: ${err1.message}` }, { status: 500 });
    }

    // ── 2. Potvrzovací e-mail klientovi (Gmail SMTP přes Nodemailer) ──────────
    // Gmail SMTP nemá omezení na příjemce — funguje pro jakýkoliv e-mail klienta
    // bez nutnosti vlastní domény. Vyžaduje env: GMAIL_APP_PASSWORD.
    // Selhání nezablokuje dokončení rezervace.
    try {
      await sendClientConfirmationEmail({
        to:            email,
        firstName,
        name,
        phone,
        service:       subService ?? serviceName ?? service ?? '—',
        dateFormatted,
        slot: time_slot,
        timeStart,
      });
      console.log(`[Booking] Potvrzovací e-mail úspěšně odeslán klientovi: ${email}`);
    } catch (emailErr) {
      // Chyba se loguje, ale NEZABLOKUJE dokončení rezervace.
      const msg = emailErr instanceof Error ? emailErr.message : JSON.stringify(emailErr);
      console.error(`[Booking] Potvrzovací e-mail klientovi NEODESLÁN. Příjemce: ${email} | Chyba: ${msg}`);
    }

    console.log(`[Booking] Rezervace úspěšně zpracována: ${subService ?? serviceName ?? service} ${dateFormatted} ${time_slot}`);
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('[Booking] Neočekávaná chyba:', error);
    const message = error instanceof Error ? error.message : JSON.stringify(error);
    return NextResponse.json({ error: `Chyba: ${message}` }, { status: 500 });
  }
}
