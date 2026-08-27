import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { BookingProvider } from "@/context/BookingContext";
import { Toaster } from "react-hot-toast";
import ClientBooking from "./ClientBooking";
import { GoogleAnalytics } from "@next/third-parties/google";
import N8nChatWidget from "@/components/N8nChatWidget";

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
    default: "VIZEON | Tvorba webů, grafika a správa sítí",
    template: "%s | VIZEON",
  },
  description:
    "Tvorba webů na míru pro živnostníky a malé firmy. Bez šablon, hotovo za 10 dní — weby, které přivádějí zákazníky, ne jen návštěvníky.",
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
    "správa sociálních sítí malé firmy",
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
        "Tvorba webů na míru, grafický design, prezentace a správa sociálních sítí. Weby a grafika, které zvyšují tržby a konverze.",
      serviceType: [
        "Tvorba webů na míru",
        "Tvorba grafiky",
        "Grafický design",
        "Zvýšení tržeb a konverzí",
        "Firemní prezentace",
        "Správa sociálních sítí",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak dlouho trvá vytvoření webu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Záleží na rozsahu. Micro Page do 2 pracovních dní, Online Vizitka do 5 pracovních dní, Promo Page do 10 dní, Pro Web do 3 týdnů. Vždy dopředu víte přesný termín — žádná překvapení.",
          },
        },
        {
          "@type": "Question",
          name: "Jak probíhá naše spolupráce?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Konzultace → Návrh → Vaše zpětná vazba → Tvorba → Ukázka → Doladění → Předání. Průběžně komunikujeme a nic neschvaluje bez vašeho souhlasu.",
          },
        },
        {
          "@type": "Question",
          name: "Pracuješ s AI nebo je vše ručně?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nástroje AI používám jako pomocníka — pro inspiraci, urychlení rutinních kroků nebo generování textu. Každý výsledek ale ručně přepracuji, doladím a přizpůsobím vašemu projektu. Finální dílo je vždy moje práce, ne AI výstup.",
          },
        },
        {
          "@type": "Question",
          name: "Co je zahrnuto v ceně?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Design, kód, mobilní verze, základní SEO, testování a předání. Žádné skryté poplatky, žádné dodatečné faktury.",
          },
        },
        {
          "@type": "Question",
          name: "Mohu web po předání spravovat sám?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano. Předám vám přístupy a krátký návod. Případně se postaráme o správu za 999 Kč/měsíc — vy se starejte o byznys, já o web.",
          },
        },
        {
          "@type": "Question",
          name: "Co když se mi výsledek nebude líbit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To se nestane — průběžně konzultujeme a upravujeme. Ale pokud by přesto nastal problém, opravím vše dokud nejste 100% spokojeni.",
          },
        },
        {
          "@type": "Question",
          name: "Pracuješ i mimo ČR?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano. Pracuji online pro klienty po celé ČR i zahraničí. Komunikace přes telefon, WhatsApp nebo video hovor — odkudkoliv.",
          },
        },
        {
          "@type": "Question",
          name: "Jak mi nový web nebo grafika pomůže zvýšit tržby?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Web navržený na míru pro vaše zákazníky, s jasnou strukturou a cestou k objednávce, přivádí víc poptávek než šablonový web, který jen 'existuje'. Stejně tak sjednocená grafika (logo, vizitky, sociální sítě) zvyšuje důvěru a tím i konverze — víc lidí, kteří web nebo profil navštíví, se promění v zákazníky.",
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
        </BookingProvider>
        <GoogleAnalytics gaId="G-J5FMJYTGCK" />
      </body>
    </html>
  );
}
