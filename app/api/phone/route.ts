import { NextRequest, NextResponse } from "next/server";

/**
 * Telefonní číslo se nikdy nevyskytuje v HTML ani v JS bundlu. Žije jen v
 * serverovém env (`CONTACT_PHONE`) a prohlížeč si ho vyžádá až po kliknutí na
 * „Zobrazit telefon“. Vyhledávače a crawlery tlačítka nemačkají, takže číslo
 * nikdy nezaindexují. `/api/` je navíc v robots.txt zakázané.
 */
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 10;
const hits = new Map<string, { count: number; reset: number }>();

function limited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || entry.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const headers = {
  "Cache-Control": "no-store",
  "X-Robots-Tag": "noindex, nofollow",
};

export async function POST(req: NextRequest) {
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403, headers });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429, headers });
  }

  const phone = process.env.CONTACT_PHONE;
  if (!phone) {
    return NextResponse.json({ error: "Unavailable" }, { status: 503, headers });
  }
  return NextResponse.json({ phone }, { headers });
}
