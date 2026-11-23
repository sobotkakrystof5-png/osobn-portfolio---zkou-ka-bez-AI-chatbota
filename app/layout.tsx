import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import CookieBanner from "@/components/CookieBanner";
import LeadSourceCapture from "@/components/LeadSourceCapture";
import { FOUNDER_ID, FOUNDER_REF, ORG_ID, ORG_REF } from "@/lib/schema";


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

// Když session intro homepage už viděla, označí <html> ještě před prvním
// vykreslením, aby CSS nezobrazilo černé pozadí intra (.intro-backdrop
// v globals.css, components/IntroAnimation.tsx). Musí být obyčejný inline
// <script> v <head>: next/script beforeInteractive v App Routeru běží až
// s bootstrapem Next.js, tedy po prvním vykreslení. Při zablokovaném
// storage spadne do catch a intro se chová jako při první návštěvě.
const INTRO_SEEN = `try{if(sessionStorage.getItem("vizeon_intro"))document.documentElement.setAttribute("data-intro-seen","")}catch(e){}`;

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400"],
  variable: "--font-cormorant",
  display: "swap",
});

// Variabilní Inter (bez výčtu řezů): jeden soubor pokryje všechny váhy,
// takže font-semibold/bold je skutečný řez, ne dopočítané ztučnění.
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Weby a e-shopy na míru pro firmy a živnostníky | VIZEON",
    template: "%s | VIZEON",
  },
  description:
    "Weby a e-shopy na míru pro firmy a živnostníky. Moderní design, SEO a navíc automatizace procesů a AI chatboti. Přímá komunikace a cena předem.",
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
  // Canonical tu záměrně není: layout ho dědí každá stránka bez vlastního
  // (404, /admin, budoucí stránky) a ty by se pak tiše kanonizovaly na
  // homepage. Každá indexovatelná stránka si ho nastavuje sama.
  authors: [{ name: "VIZEON", url: "https://vizeon.cz" }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://vizeon.cz",
    title: "Weby a e-shopy na míru pro firmy a živnostníky | VIZEON",
    description:
      "Jeden člověk. Přímá komunikace. Weby které prodávají, ne jen existují.",
    siteName: "VIZEON",
  },
  twitter: { card: "summary_large_image" },
  // Bez limitu délky úryvku: vyhledávače a AI odpovědi můžou citovat celé pasáže.
  // Bez `index, follow`: to je výchozí chování a dědila by ho i 404, kde Next.js
  // přidává vlastní `noindex` (dva protichůdné meta robots tagy hlásí audit jako chybu).
  robots: {
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
    googleBot: { "max-snippet": -1, "max-image-preview": "large", "max-video-preview": -1 },
  },
  // Ověření webu v Search Console, Bing Webmaster Tools a Seznam Webmaster.
  // Kódy jsou ve Vercel env (viz .env.example); bez nich se značka nevypíše.
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION || undefined,
    other: {
      ...(process.env.BING_SITE_VERIFICATION && { "msvalidate.01": process.env.BING_SITE_VERIFICATION }),
      ...(process.env.SEZNAM_SITE_VERIFICATION && { "seznam-wmt": process.env.SEZNAM_SITE_VERIFICATION }),
    },
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
    // Jediná entita firmy na webu. Ostatní schema (provider, publisher,
    // creator) na ni odkazuje přes ORG_REF, ne vlastní kopií. Dřív tu byl
    // ještě samostatný uzel Organization se stejným @id a jinými daty, což
    // parsery čtou jako konflikt. ProfessionalService je podtyp Organization.
    {
      "@type": "ProfessionalService",
      "@id": ORG_ID,
      name: "VIZEON",
      url: "https://vizeon.cz",
      email: "info@vizeon.cz",
      // app/logo.png/route.tsx: 512×512 PNG (Google chce ≥112 px a rastr).
      logo: {
        "@type": "ImageObject",
        "@id": "https://vizeon.cz/#logo",
        url: "https://vizeon.cz/logo.png",
        width: 512,
        height: 512,
        caption: "VIZEON",
      },
      image: { "@id": "https://vizeon.cz/#logo" },
      identifier: {
        "@type": "PropertyValue",
        propertyID: "IČO",
        value: "29977231",
      },
      areaServed: { "@type": "Country", name: "Česká republika" },
      founder: FOUNDER_REF,
      foundingDate: "2026",
      knowsAbout: [
        "Tvorba webových stránek",
        "Tvorba e-shopů",
        "Shopify",
        "Next.js",
        "SEO optimalizace",
        "Lokální SEO",
        "Automatizace procesů",
        "n8n",
        "AI chatboti",
        "Rezervační systémy",
      ],
      slogan: "Nekupujete si web. Kupujete si výsledky.",
      description:
        "Weby a e-shopy na míru pro firmy a živnostníky. Moderní design, SEO a navíc automatizace procesů a AI chatboti. Přímá komunikace, konzultace zdarma.",
      serviceType: [
        "Tvorba webů na míru",
        "Tvorba e-shopů",
        "Automatizace procesů a AI agenti",
        "Webové aplikace a systémy na míru",
        "Rezervační systémy",
        "SEO optimalizace",
        "Správa sociálních sítí",
        "Reklama Google a Meta",
      ],
      sameAs: [
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
      "@type": "Person",
      "@id": FOUNDER_ID,
      name: "Kryštof",
      jobTitle: "Zakladatel VIZEON a ALTENO",
      worksFor: ORG_REF,
      url: "https://vizeon.cz/kontakt#s-kym-mluvite",
      image: "https://vizeon.cz/avatar.jpg",
      knowsAbout: ["Tvorba webů", "SEO", "Automatizace procesů", "AI chatboti"],
    },
    {
      "@type": "WebSite",
      "@id": "https://vizeon.cz/#website",
      url: "https://vizeon.cz",
      name: "VIZEON",
      inLanguage: "cs-CZ",
      publisher: ORG_REF,
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // suppressHydrationWarning: atribut data-intro-seen přidává inline skript
    // před hydratací, React by jinak hlásil nesoulad atributů na <html>.
    <html lang="cs" className={cn(cormorant.variable, inter.variable, "font-sans")} suppressHydrationWarning>
      <head>
        <Script id="safe-storage-polyfill" strategy="beforeInteractive">
          {STORAGE_POLYFILL}
        </Script>
        <script dangerouslySetInnerHTML={{ __html: INTRO_SEEN }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <a href="#main-content" className="skip-to-content">
          Přejít na obsah
        </a>
        {children}
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
        <CookieBanner />
        <LeadSourceCapture />
        {/* Google Analytics i Clarity načítá CookieBanner, jen po souhlasu
            a až v klidu po načtení stránky (lib/analytics.ts). */}
      </body>
    </html>
  );
}
