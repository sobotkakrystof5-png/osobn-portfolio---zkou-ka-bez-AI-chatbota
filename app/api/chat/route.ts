import { NextRequest, NextResponse } from "next/server";

// Same-origin proxy k n8n Chat Trigger webhooku. Prohlížeč mluví jen s vizeon.cz,
// takže odpadá cross-origin fetch k *.elestio.app — a s ním i CORS/ITP chování,
// které se v některých prohlížečích (např. Safari) chová jinak než v Chrome/Brave.
// Bonus: skutečná n8n URL už není vidět v client JS bundlu.
const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

export async function POST(req: NextRequest) {
  if (!N8N_WEBHOOK_URL) {
    console.error("[Chat proxy] N8N_WEBHOOK_URL není nastavená");
    return NextResponse.json({ error: "Chat není nakonfigurovaný." }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Neplatný JSON" }, { status: 400 });
  }

  try {
    const res = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(60_000),
    });

    const text = await res.text();
    return new NextResponse(text, {
      status: res.status,
      headers: { "Content-Type": res.headers.get("content-type") ?? "application/json" },
    });
  } catch (err) {
    console.error("[Chat proxy]", err);
    return NextResponse.json({ error: "Nepodařilo se spojit s chatbotem." }, { status: 502 });
  }
}
