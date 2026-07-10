import { NextRequest, NextResponse } from 'next/server';

/* ─── Rate limiting ─────────────────────────────────────────────────────────
 * Jednoduchý in-memory limiter pro Edge runtime.
 * Serverless funkce sdílejí paměť v rámci jednoho warm instance,
 * takže to funguje jako první vrstva obrany bez externích závislostí.
 * ────────────────────────────────────────────────────────────────────────── */

interface RateEntry {
  count: number;
  resetAt: number;
}

const rateMap = new Map<string, RateEntry>();

// Úklid starých záznamů aby mapa nerostla donekonečna
function cleanup() {
  const now = Date.now();
  for (const [key, entry] of rateMap) {
    if (entry.resetAt < now) rateMap.delete(key);
  }
}

function isRateLimited(key: string, maxRequests: number, windowMs: number): boolean {
  cleanup();
  const now = Date.now();
  const entry = rateMap.get(key);

  if (!entry || entry.resetAt < now) {
    rateMap.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  if (entry.count > maxRequests) return true;
  return false;
}

/* ─── Povolené originy ──────────────────────────────────────────────────── */
// vizeon.cz (bez www) je jediná kanonická doména — www.vizeon.cz se přesměrovává
// na apex ve vercel.json, takže sem by Origin: https://www.vizeon.cz neměl nikdy dorazit.
const ALLOWED_ORIGINS = [
  'https://vizeon.cz',
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return true; // same-origin requesty nemají Origin header → pustit
  if (ALLOWED_ORIGINS.includes(origin)) return true;
  if (/^https:\/\/.+\.vercel\.app$/.test(origin)) return true;
  if (origin.startsWith('http://localhost')) return true;
  return false;
}

/* ─── Middleware ────────────────────────────────────────────────────────── */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Jen pro naše API endpointy
  if (!pathname.startsWith('/api/contact') && !pathname.startsWith('/api/booking')) {
    return NextResponse.next();
  }

  const origin = req.headers.get('origin');
  const isDev = process.env.NODE_ENV === 'development';

  // 0. CORS preflight — prohlížeč (typicky Safari) umí poslat OPTIONS i před
  //    same-origin POST. Musí dostat 2xx s CORS hlavičkami, jinak selže celý
  //    POST s "Load failed" ještě než se pošle na server.
  if (req.method === 'OPTIONS') {
    const preflight = new NextResponse(null, { status: 204 });
    if (isDev || isAllowedOrigin(origin)) {
      preflight.headers.set('Access-Control-Allow-Origin', origin ?? '*');
      preflight.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
      preflight.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    }
    return preflight;
  }

  // 1. Dovolí GET (pro dostupné sloty) a POST
  if (req.method !== 'POST' && req.method !== 'GET') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // 2. Origin check — blokuje přímé API volání zvenčí
  if (!isDev && !isAllowedOrigin(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 3. Rate limiting — max 10 requestů za 10 minut per IP.
  //    Počítadlo je oddělené pro booking a contact (scope v klíči), aby
  //    odeslání jednoho formuláře nevyčerpávalo limit toho druhého.
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';
  const scope = pathname.startsWith('/api/booking') ? 'booking' : 'contact';

  if (isRateLimited(`${scope}:${ip}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json(
      { error: 'Příliš mnoho požadavků. Zkuste to prosím za chvíli.' },
      {
        status: 429,
        headers: { 'Retry-After': '600' },
      },
    );
  }

  // 4. CORS headers na response
  const response = NextResponse.next();
  if (origin && isAllowedOrigin(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'POST');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  return response;
}

export const config = {
  matcher: ['/api/contact', '/api/booking'],
};
