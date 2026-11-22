import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { ZakazIqCalendarDemo } from "@/components/zakaziq/ZakazIqCalendarDemo";
import { ZAKAZIQ_PRICE } from "@/lib/data/zakaziq";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Rezervace v ZakazIQ pro firmy (kalendář, objednávací stránka /r, widget)
// a konzultace z volných termínů v klientském prostoru (ProjectIQ R-126).
// Dřív stránka tvrdila, že rezervace pro web klienta je samostatná aplikace
// na míru. Dnes je to přímo ZakazIQ.

const FAQ = [
  {
    question: "Potvrdí se termín sám?",
    answer:
      "Ne. Každá objednávka je nejdřív poptávka. Vy ji potvrdíte, nabídnete jiný čas, nebo odmítnete. Zákazník pak dostane e-mail.",
  },
  {
    question: "Potřebuji k tomu web?",
    answer:
      "Ne. Stačí odkaz na objednávací stránku nebo QR kód na pultu. Když web máte, vložíte do něj jeden řádek kódu.",
  },
  {
    question: "Kolik rezervační systém stojí?",
    answer: `Rezervace jsou součástí ZakazIQ za ${ZAKAZIQ_PRICE} Kč měsíčně, spolu se zákazníky, zakázkami a fakturami. Prvních 14 dní je zdarma.`,
  },
];

export function generateMetadata(): Metadata {
  return {
    title: "Rezervační systém pro malé firmy — ZakazIQ",
    description:
      "Rezervační systém ZakazIQ: zákazník si vybere termín na webu, přes odkaz nebo QR kód, vy ho jedním klikem potvrdíte. Potvrzení i připomínky jdou e-mailem samy. 249 Kč měsíčně.",
    alternates: { canonical: "https://vizeon.cz/zakaziq/rezervacni-system" },
    openGraph: {
      title: "Rezervační systém ZakazIQ | VIZEON",
      description: "Objednávky z webu rovnou do kalendáře. Potvrdíte jedním klikem.",
      url: "https://vizeon.cz/zakaziq/rezervacni-system",
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
        { "@type": "ListItem", position: 2, name: "ZakazIQ", item: "https://vizeon.cz/zakaziq" },
        { "@type": "ListItem", position: 3, name: "Rezervační systém", item: "https://vizeon.cz/zakaziq/rezervacni-system" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Rezervační systém",
      name: "Rezervační systém ZakazIQ",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/zakaziq/rezervacni-system",
      description:
        "Online rezervace pro malé firmy: objednávky z webu, odkazu nebo QR kódu se zařadí do kalendáře a majitel je potvrdí jedním klikem.",
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

const FEATURES = [
  "Objednávka z webu, odkazu nebo QR kódu",
  "Čárkovaná poptávka, dokud ji nepotvrdíte",
  "Služby, směny pracovníků a blokace",
  "Jednomu pracovníkovi se termíny nepřekryjí",
  "Potvrzení, změna i připomínka e-mailem",
  "Neomezeně pracovníků v jednom kalendáři",
];

export default function RezervacniSystemPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/zakaziq/rezervacni-system" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="ZakazIQ · Rezervace"
          h1="Rezervační systém, ve kterém potvrzujete vy"
          lead="Zákazník si vybere termín na webu, přes odkaz nebo QR kód. V kalendáři se objeví jako poptávka a vy ji jedním klikem potvrdíte."
        />

        <ZakazIqCalendarDemo />

        <div className="mt-16 space-y-16">
          <section aria-labelledby="umi">
            <h2 id="umi" className={cn(t.h2Page, "mb-6")}>Co rezervace v ZakazIQ umí</h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {FEATURES.map((f) => (
                <li key={f} className="glass-panel flex items-start gap-3 px-5 py-4 font-inter text-[15px] leading-[1.55] text-[#f0ece6]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-[#c9a84c]/[0.12]">
                    <Check size={13} strokeWidth={2.2} className="text-[#c9a84c]" aria-hidden="true" />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
            <p className={cn(t.body, "mt-6")}>
              Rezervace jsou jen jedna část. Co dalšího v aplikaci máte, najdete na stránce{" "}
              <Link href="/zakaziq#funkce" className={t.link}>
                ZakazIQ
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="konzultace">
            <h2 id="konzultace" className={cn(t.h2Page, "mb-4")}>Stejně si domlouváte konzultace s námi</h2>
            <p className={t.body}>
              Jako náš klient si konzultaci vyberete z volných termínů v klientském prostoru. Trvá 30 minut přes Google
              Meet a změnit ji můžete do 24 hodin předem. Hodí se pro{" "}
              <Link href="/web-pro-kadernictvi" className={t.link}>kadeřnictví</Link>,{" "}
              <Link href="/web-pro-masery-a-wellness" className={t.link}>masérky a wellness</Link>{" "}
              i{" "}
              <Link href="/web-pro-fitness-trenery" className={t.link}>fitness trenéry</Link>.
            </p>
          </section>

          <section aria-labelledby="faq-rezervace">
            <h2 id="faq-rezervace" className={cn(t.h2Page, "mb-6")}>Časté otázky</h2>
            <div className="space-y-6">
              {FAQ.map((f) => (
                <div key={f.question}>
                  <h3 className={cn(t.h3, "mb-1.5")}>{f.question}</h3>
                  <p className={t.body}>{f.answer}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete objednávky rovnou v kalendáři?"
          subheading="Ozveme se do hodiny a ukážeme vám rezervace na vašem oboru."
          buttonLabel="Chci ukázku rezervací →"
        />

        <div className="mt-14">
          <Link href="/zakaziq" className={t.backLink}>← Zpět na ZakazIQ</Link>
        </div>
      </div>
    </PageShell>
  );
}
