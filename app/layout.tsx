import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { BookingProvider } from "@/context/BookingContext";
import { Toaster } from "react-hot-toast";
import ClientBooking from "./ClientBooking";
import { GoogleAnalytics } from "@next/third-parties/google";
import N8nChatWidget from "@/components/N8nChatWidget";
import CookieBanner from "@/components/CookieBanner";

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
      name: "VIZEON",
      url: "https://vizeon.cz",
      telephone: "+420604837333",
      email: "info@vizeon.cz",
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
        // TODO: až vznikne Google Business Profile, doplnit sem jeho Google Maps
        // URL (formát https://maps.app.goo.gl/... nebo g.page/...) — posílí to
        // provázání profilu s webem pro Google.
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
