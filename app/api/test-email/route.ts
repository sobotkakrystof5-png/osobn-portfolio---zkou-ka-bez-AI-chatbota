/**
 * TESTOVACÍ ENDPOINT — ověření Resend + Gmail SMTP
 * Použití: GET /api/test-email?to=email@example.com
 * Po otestování SMAŽ nebo přidej auth ochranu.
 */

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { sendClientConfirmationEmail } from "@/lib/email";

export async function GET(req: NextRequest) {
  const to = req.nextUrl.searchParams.get("to") ?? "sobotkakrystof5@gmail.com";
  const results: Record<string, unknown> = {};

  // ── 1. Test Resend (admin notifikace) ────────────────────────────────────
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    results.resend = { ok: false, error: "RESEND_API_KEY chybí" };
  } else {
    try {
      const resend = new Resend(apiKey);
      const { data, error } = await resend.emails.send({
        from: "VIZEON Test <onboarding@resend.dev>",
        to: "sobotkakrystof5@gmail.com",
        subject: "✅ Test Resend — VIZEON",
        html: `<p>Resend funguje. Odesláno: ${new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" })}</p>`,
      });
      results.resend = error
        ? { ok: false, error: error.message }
        : { ok: true, emailId: data?.id };
    } catch (e) {
      results.resend = { ok: false, error: e instanceof Error ? e.message : String(e) };
    }
  }

  // ── 2. Test Gmail SMTP (klientské potvrzení) ─────────────────────────────
  try {
    await sendClientConfirmationEmail({
      to,
      firstName:     "Test",
      name:          "Test Uživatel",
      phone:         "+420 777 000 000",
      service:       "Testovací rezervace",
      dateFormatted: "25. 5. 2026",
      slot:          "10:00 – 10:30",
      timeStart:     "10:00",
    });
    results.gmail = { ok: true, sentTo: to };
  } catch (e) {
    results.gmail = { ok: false, error: e instanceof Error ? e.message : String(e) };
  }

  const allOk = Object.values(results).every((r) => (r as { ok: boolean }).ok);
  return NextResponse.json({ allOk, results }, { status: allOk ? 200 : 500 });
}
