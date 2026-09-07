import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { BookingProvider } from "@/context/BookingContext";
import { Toaster } from "react-hot-toast";
import ClientBooking from "./ClientBooking";
import { GoogleAnalytics } from "@next/third-parties/google";
import N8nChatWidget from "@/components/N8nChatWidgetLoader";
import CookieBanner from "@/components/CookieBanner";

// Safari s vypnutým "Block All Cookies" hodí synchronní SecurityError na
// KAŽDÝ přístup k localStorage/sessionStorage — nejen náš vlastní kód (ten
// má safeStorageGet/Set, viz lib/utils.ts), ale i @n8n/chat (session ID
// persistence, viz node_modules/@n8n/chat/dist), který tuhle výjimku nikde
// nechytá. Tam nemůžeme opravit zdroj (node_modules se přepíše při dalším
// npm install), takže storage nahradíme in-memory náhradou ještě předtím,
// než se spustí JAKÝKOLI jiný skript — beforeInteractive garantuje běh před
// Next.js hydratací i před dynamickým importem chat widgetu.
const STORAGE_POLYFILL = `
(function () {
  function works(name) {
    try {
      var s = window[name];
      var k = "__vizeon_test__";
      s.setItem(k, "1");
      s.removeItem(k);
      return true;
    } catch (e) {
      return false;
    }
  }
  function memoryStorage() {
    var data = {};
    return {
      getItem: function (k) { return Object.prototype.hasOwnProperty.call(data, k) ? data[k] : null; },
      setItem: function (k, v) { data[k] = String(v); },
      removeItem: function (k) { delete data[k]; },
      clear: function () { data = {}; },
      key: function (i) { return Object.keys(data)[i] || null; },
      get length() { return Object.keys(data).length; },
    };
  }
  ["localStorage", "sessionStorage"].forEach(function (name) {
    if (!works(name)) {
      try {
        Object.defineProperty(window, name, { value: memoryStorage(), configurable: true, writable: false });
      } catch (e) {}
    }
  });
})();
`;

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "VIZEON | Tvorba webů, AI chatboti a grafika",
    template: "%s | VIZEON",
  },
  description:
    "Tvorba webů na míru pro živnostníky a malé firmy. Bez šablon, hotovo za 10 dní. Weby, které přivádějí zákazníky, ne jen návštěvníky.",
  keywords: [
    "tvorba webů",
    "tvorba webu na míru",
    "weby na míru",
    "levné weby na míru",
    "webový designer ČR",
    "tvorba grafiky",
    "grafika na míru",
    "grafický design živnostníci",
    "konverzní web",
    "web který zvyšuje tržby",
    "zvýšení tržeb",
    "zvýšení konverzí",
    "AI chatbot pro firmy",
    "rezervační systém na míru",
    "Next.js React web Česká republika",
    "VIZEON",
  ],
  metadataBase: new URL("https://vizeon.cz"),
  alternates: { canonical: "https://vizeon.cz" },
  authors: [{ name: "VIZEON", url: "https://vizeon.cz" }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://vizeon.cz",
    title: "VIZEON — Web. Design. Výsledky.",
    description:
      "Jeden člověk. Přímá komunikace. Weby které prodávají, ne jen existují.",
    siteName: "VIZEON",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

// Validace: vlož vyrenderovaný obsah tohoto <script type="application/ld+json">
// (View Source na produkci) do https://validator.schema.org nebo do Google
// Rich Results Test (https://search.google.com/test/rich-results).
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": "https://vizeon.cz/#organization",
      name: "VIZEON",
      url: "https://vizeon.cz",
      telephone: "+420604837333",
      email: "info@vizeon.cz",
      // TODO: nahradit reálným logem ≥112×112px, až vznikne design asset —
      // aktuální favicon.ico je 32×32 a nesplňuje Google minimum pro Organization.logo.
      logo: "https://vizeon.cz/favicon.ico",
      areaServed: { "@type": "Country", name: "Česká republika" },
      description:
        "Tvorba webů na míru, AI chatboti, systémy na míru, grafický design a technické služby. Weby a grafika, které zvyšují tržby a konverze.",
      serviceType: [
        "Tvorba webů na míru",
        "AI Chatbot",
        "Systémy na míru",
        "Grafický design",
        "Technické služby",
        "SEO optimalizace",
        "Zvýšení tržeb a konverzí",
      ],
      sameAs: [
        "https://www.facebook.com/profile.php?id=100086439650056",
        "https://www.instagram.com/vizeon_official/",
        // TODO: až vznikne Google Business Profile, doplnit sem jeho Google Maps
        // URL (formát https://maps.app.goo.gl/... nebo g.page/...) — posílí to
        // provázání profilu s webem pro Google.
      ],
      // TODO: až vznikne Google Business Profile s reálnými recenzemi (viz manuální
      // checklist), doplnit sem `aggregateRating: { "@type": "AggregateRating",
      // ratingValue, reviewCount }` s reálnými hodnotami z profilu. Nikdy nevyplňovat
      // fabrikovanými/odhadnutými čísly — viz omezení v SEO-backlinkchecker-prompt.md.
    },
    {
      "@type": "Organization",
      "@id": "https://vizeon.cz/#organization",
      name: "VIZEON",
      url: "https://vizeon.cz",
      logo: "https://vizeon.cz/favicon.ico",
      sameAs: [
        "https://www.facebook.com/profile.php?id=100086439650056",
        "https://www.instagram.com/vizeon_official/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://vizeon.cz/#website",
      url: "https://vizeon.cz",
      name: "VIZEON",
      inLanguage: "cs-CZ",
      publisher: { "@id": "https://vizeon.cz/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs" className={cn(cormorant.variable, inter.variable, "font-sans")}>
      <head>
        <Script id="safe-storage-polyfill" strategy="beforeInteractive">
          {STORAGE_POLYFILL}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <BookingProvider>
          <a href="#main-content" className="skip-to-content">
            Přejít na obsah
          </a>
          {children}
          <ClientBooking />
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
          <N8nChatWidget />
          <CookieBanner />
        </BookingProvider>
        <GoogleAnalytics gaId="G-J5FMJYTGCK" />
      </body>
    </html>
  );
}
