import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

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
    default: "VIZEON | Tvorba webů, grafika a správa sítí — Kryštof Sobotka",
    template: "%s | VIZEON",
  },
  description:
    "Weby, které přivádějí zákazníky. Tvorba webů na míru, grafický design, prezentace a správa sociálních sítí pro živnostníky a malé firmy. Nezávazná konzultace zdarma.",
  keywords: [
    "tvorba webů na míru",
    "webový designer ČR",
    "grafický design živnostníci",
    "správa sociálních sítí malé firmy",
    "Next.js React web Česká republika",
    "Kryštof Sobotka",
    "VIZEON",
  ],
  metadataBase: new URL("https://vizeon.cz"),
  authors: [{ name: "Kryštof Sobotka", url: "https://vizeon.cz" }],
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    url: "https://vizeon.cz",
    title: "VIZEON — Web. Design. Výsledky.",
    description:
      "Jeden člověk. Přímá komunikace. Weby které prodávají, ne jen existují.",
    siteName: "VIZEON",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { "max-image-preview": "large" },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      name: "VIZEON",
      url: "https://vizeon.cz",
      telephone: "+420604837333",
      email: "sobotkakrystof5@gmail.com",
      areaServed: "CZ",
      description:
        "Tvorba webů na míru, grafický design, prezentace a správa sociálních sítí.",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "10",
      },
    },
    {
      "@type": "Person",
      name: "Kryštof Sobotka",
      jobTitle: "Web Designer & Developer",
      worksFor: { "@type": "Organization", name: "VIZEON" },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak dlouho trvá vytvoření webu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Online Vizitka do 5 dní, Promo Page do 10 dní, Pro Web do 3 týdnů.",
          },
        },
        {
          "@type": "Question",
          name: "Pracuješ s AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ne. Vše dělám ručně, každý web je originál.",
          },
        },
      ],
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
        <a href="#main-content" className="skip-to-content">
          Přejít na obsah
        </a>
        {children}
      </body>
    </html>
  );
}
