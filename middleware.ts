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

function isRateLimited(ip: string, maxRequests: number, windowMs: number): boolean {
  cleanup();
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || entry.resetAt < now) {
    rateMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  entry.count += 1;
  if (entry.count > maxRequests) return true;
  return false;
}

/* ─── Povolené originy ──────────────────────────────────────────────────── */
const ALLOWED_ORIGINS = [
  'https://vizeon.cz',
  'https://www.vizeon.cz',
  // Vercel preview deployments
  /^https:\/\/vizeon.*\.vercel\.app$/,
];

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false; // direct API call bez browseru → blokuj
  return ALLOWED_ORIGINS.some((allowed) =>
    allowed instanceof RegExp ? allowed.test(origin) : allowed === origin,
  );
}

/* ─── Middleware ────────────────────────────────────────────────────────── */
export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Jen pro naše API endpointy
  if (!pathname.startsWith('/api/contact') && !pathname.startsWith('/api/booking')) {
    return NextResponse.next();
  }

  // 1. Jen POST
  if (req.method !== 'POST') {
    return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
  }

  // 2. Origin check — blokuje přímé API volání zvenčí
  const origin = req.headers.get('origin');
  const isDev = process.env.NODE_ENV === 'development';

  if (!isDev && !isAllowedOrigin(origin)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // 3. Rate limiting — max 5 requestů za 10 minut per IP
  const ip =
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip, 5, 10 * 60 * 1000)) {
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
