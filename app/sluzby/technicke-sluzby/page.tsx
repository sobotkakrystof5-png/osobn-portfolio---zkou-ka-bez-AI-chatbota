import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { PRICE_BY_NAME } from "@/lib/data/pricing";

export function generateMetadata(): Metadata {
  return {
    title: "Technické služby — doména, přesměrování a údržba webu",
    description:
      "Přesměrování a přelinkování domény, správa DNS, bezpečnostní aktualizace a průběžná údržba webu. Technické zázemí pro váš web bez starostí.",
    alternates: { canonical: "https://vizeon.cz/sluzby/technicke-sluzby" },
    openGraph: {
      title: "Technické služby | VIZEON",
      description: "Doména, přesměrování, přelinkování a údržba webu zajistí technické zázemí bez starostí.",
      url: "https://vizeon.cz/sluzby/technicke-sluzby",
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
        { "@type": "ListItem", position: 2, name: "Služby", item: "https://vizeon.cz/sluzby" },
        { "@type": "ListItem", position: 3, name: "Technické služby", item: "https://vizeon.cz/sluzby/technicke-sluzby" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Technická správa webu",
      name: "Technické služby",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/technicke-sluzby",
      description:
        "Přesměrování a přelinkování domény, správa DNS, bezpečnostní aktualizace a průběžná údržba webu.",
    },
  ],
};

const items = [
  { name: "Přesměrování domény", price: PRICE_BY_NAME["Přesměrování domény"], desc: "Nastavení DNS a přesměrování staré adresy na novou, bez výpadku." },
  { name: "Přelinkování domény", price: PRICE_BY_NAME["Přelinkování domény"], desc: "Migrace webu na jinou doménu tak, aby si Google zachoval pozice a odkazy fungovaly dál." },
  { name: "Web Care", price: PRICE_BY_NAME["Web Care"], desc: "Průběžná správa, aktualizace a bezpečnost hotového webu." },
  { name: "Technický zásah", price: PRICE_BY_NAME["Technický zásah"], desc: "Jednorázová oprava, úprava nebo drobná změna na existujícím webu." },
];

export default function TechnickeSluzbyPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/technicke-sluzby" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Technické služby"
          h1="Technické zázemí webu, o které se nemusíte starat"
          lead="O přesměrování a přelinkování domény, DNS záznamy, bezpečnostní aktualizace nebo drobný technický zásah se postarám sám, ať se vy můžete věnovat byznysu."
        />

        <div className="space-y-14">
          <section aria-labelledby="nabizim">
            <h2 id="nabizim" className={cn(t.h2Page, "mb-6")}>Co nabízím</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {items.map((i) => (
                <div key={i.name} className="border border-white/[0.06] p-5">
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <h3 className={t.h3}>{i.name}</h3>
                    <span className="font-cormorant text-[20px] text-[#c9a84c] whitespace-nowrap">{i.price}</span>
                  </div>
                  <p className={t.body}>{i.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="pro-koho">
            <h2 id="pro-koho" className={cn(t.h2Page, "mb-4")}>Kdy se tahle služba hodí</h2>
            <p className={t.body}>
              Typicky tehdy, když měníte název firmy nebo doménu a potřebujete, ať staré odkazy dál
              fungují, když stěhujete web od jiného poskytovatele, nebo když potřebujete jen drobný
              technický zásah bez tvorby celého nového webu. Pokud řešíte i obsahovou nebo vizuální
              stránku webu, mrkněte na{" "}
              <Link href="/sluzby/tvorba-webovych-stranek" className={t.link}>tvorbu webových stránek na míru</Link>.
            </p>
          </section>

          <section aria-labelledby="cena">
            <h2 id="cena" className={cn(t.h2Page, "mb-4")}>Cena</h2>
            <p className={t.body}>
              Přesměrování, přelinkování i jednorázové zásahy jsou vždy na dotaz. Cena záleží na
              rozsahu práce a na tom, s jakým poskytovatelem domény nebo hostingu pracujeme.
              Pravidelná měsíční údržba Web Care má pevnou cenu 999 Kč/měsíc.
            </p>
          </section>
        </div>

        <ClosingCTA
          heading="Potřebujete vyřešit technickou stránku webu?"
          subheading="Nezávazná konzultace zdarma. Popište, co potřebujete, a pošlu konkrétní nabídku."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
