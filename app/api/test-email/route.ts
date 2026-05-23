/**
 * TESTOVACÍ ENDPOINT — pouze pro ověření funkčnosti Resendu
 * Použití: GET /api/test-email
 * Po úspěšném otestování tento soubor SMAŽ nebo přidej auth ochranu.
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY;

  // 1. Zkontroluj přítomnost klíče
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        step: "env-check",
        error: "RESEND_API_KEY není nastavený v Environment Variables na Vercelu.",
      },
      { status: 500 }
    );
  }

  // 2. Zkus odeslat testovací email
  try {
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: "VIZEON Test <onboarding@resend.dev>",
      to: "sobotkakrystof5@gmail.com",
      subject: "✅ Test — VIZEON email funguje!",
      html: `
        <div style="font-family: sans-serif; padding: 32px; max-width: 500px;">
          <h2 style="color: #16a34a;">✅ Email funguje!</h2>
          <p>Pokud vidíš tuto zprávu, Resend je správně nakonfigurovaný a emaily se odesílají.</p>
          <p style="color: #666; font-size: 13px;">Odesláno: ${new Date().toLocaleString("cs-CZ", { timeZone: "Europe/Prague" })}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          step: "send",
          error: error.message,
          detail: error,
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: "Testovací email odeslán na sobotkakrystof5@gmail.com — zkontroluj doručenou poštu (i spam).",
      emailId: data?.id,
    });

  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        step: "exception",
        error: err instanceof Error ? err.message : JSON.stringify(err),
      },
      { status: 500 }
    );
  }
}
