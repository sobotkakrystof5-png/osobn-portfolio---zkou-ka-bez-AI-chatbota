/**
 * TESTOVACÍ ENDPOINT — ověření Resend (admin notifikace + klientské potvrzení)
 * Použití: GET /api/test-email?to=email@example.com
 * Po otestování SMAŽ nebo přidej auth ochranu.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingNotificationFrom, bookingConfirmationFrom, buildClientConfirmationHtml } from "@/lib/email";

export async function GET(req: NextRequest) {
  const to = req.nextUrl.searchParams.get("to") ?? "sobotkakrystof5@gmail.com";
  const results: Record<string, unknown> = {};

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ allOk: false, error: "RESEND_API_KEY chybí" }, { status: 500 });
  }

  const resend = new Resend(apiKey);

  // ── 1. Test admin notifikace ─────────────────────────────────────────────
  try {
    const { data, error } = await resend.emails.send({
      from: bookingNotificationFrom(),
      to: "sobotkakrystof5@gmail.com",
      subject: "Test - Nova rezervace - Test Uzivatel - 25. 5. 2026",
      html: `<p>Admin notifikace funguje. Odesláno: ${new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" })}</p>`,
    });
    results.adminNotification = error
      ? { ok: false, error: error.message }
      : { ok: true, emailId: data?.id };
  } catch (e) {
    results.adminNotification = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  // ── 2. Test klientského potvrzení (Resend) ───────────────────────────────
  try {
    const { data, error } = await resend.emails.send({
      from: bookingConfirmationFrom(),
      to,
      replyTo: "sobotkakrystof5@gmail.com",
      subject: "Test - Potvrzeni rezervace - 25. 5. 2026 v 10:00",
      html: buildClientConfirmationHtml({
        firstName:     "Test",
        name:          "Test Uživatel",
        service:       "Testovací rezervace",
        dateFormatted: "25. 5. 2026",
        slot:          "10:00 – 10:30",
        timeStart:     "10:00",
        replyEmail:    "sobotkakrystof5@gmail.com",
      }),
    });
    results.clientConfirmation = error
      ? { ok: false, error: error.message }
      : { ok: true, emailId: data?.id, sentTo: to };
  } catch (e) {
    results.clientConfirmation = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  const allOk = Object.values(results).every((r) => (r as { ok: boolean }).ok);
  return NextResponse.json({ allOk, results }, { status: allOk ? 200 : 500 });
}
