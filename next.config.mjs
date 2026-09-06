import { fileURLToPath } from "url";
import { dirname } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  // ── Dev server (Turbopack) ───────────────────────────────────────────────
  turbopack: {
    root: __dirname,
  },

  // ── Produkční základy ────────────────────────────────────────────────────
  poweredByHeader: false,      // neposílat "X-Powered-By: Next.js"
  reactStrictMode: true,       // odhaluje potenciální problémy za vývoje
  compress: true,              // gzip/brotli pro non-Vercel prostředí

  // ── Optimalizace obrázků ─────────────────────────────────────────────────
  images: {
    remotePatterns: [],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,          // 30 dní na Vercel CDN
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // ── Přesměrování ─────────────────────────────────────────────────────────
  async redirects() {
    return [
      {
        source: "/sluzby/tvorba-webu",
        destination: "/sluzby/tvorba-webovych-stranek",
        permanent: true,
      },
      {
        source: "/cenik",
        destination: "/cena-tvorby-webu",
        permanent: true,
      },
      {
        source: "/reference",
        destination: "/ukazky-webu",
        permanent: true,
      },
      {
        source: "/sluzby/systemy",
        destination: "/sluzby/systemy-na-miru",
        permanent: true,
      },
    ];
  },

  // ── HTTP hlavičky ────────────────────────────────────────────────────────
  async headers() {
    const isDev = process.env.NODE_ENV !== "production";

    return [
      // Bezpečnostní hlavičky na všech routách
      {
        source: "/(.*)",
        headers: [
          // Zabraňuje vložení stránky do <iframe> (clickjacking)
          { key: "X-Frame-Options", value: "DENY" },
          // Zabraňuje MIME sniffingu
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Referrer pouze na stejný origin a HTTPS
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // Zakázat nevyužité browser features
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
          },
          // HSTS — vynutit HTTPS na 2 roky (doporučeno pro preload list)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // CSP — defense-in-depth. 'unsafe-inline'/'unsafe-eval' na script-src jsou
          // potřeba kvůli Next.js inline hydration scriptům, JSON-LD blokům a @n8n/chat
          // (Vue runtime); 'unsafe-inline' na style-src kvůli Tailwind/Framer Motion.
          // Chat widget volá jen same-origin /api/chat (viz N8nChatWidget.tsx), takže
          // n8n instance samotná není v connect-src potřeba.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: https:",
              "connect-src 'self' https://www.google-analytics.com https://*.supabase.co wss://*.supabase.co",
              "frame-src 'self'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // Pomáhá s výkonem: prefetch DNS pro Google Fonts
          { key: "X-DNS-Prefetch-Control", value: "on" },
        ],
      },

      // Statické assety Next.js — cache 1 rok (obsah má hash v názvu).
      // Jen v produkci: ve vývoji Turbopack servíruje JS chunky ze stejné
      // cesty a "immutable" cache donutí prohlížeč ignorovat i restarty
      // dev serveru (viz Next.js varování "can break development behavior").
      ...(isDev
        ? []
        : [
            {
              source: "/_next/static/(.*)",
              headers: [
                { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
              ],
            },
          ]),

      // Portfolio obrázky — cache 1 rok
      {
        source: "/portfolio/(.*)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },

      // Ostatní statické soubory (favicon, profilová foto)
      {
        source: "/(favicon\\.ico|profil\\.jpg)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
    ];
  },
};

export default nextConfig;
