import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Technické SEO — rychlost, strukturovaná data a indexovatelnost",
    description:
      "Technické SEO: Core Web Vitals, strukturovaná data a indexovatelnost webu — základ, bez kterého žádné jiné SEO nefunguje.",
    alternates: { canonical: "https://vizeon.cz/sluzby/seo-optimalizace/technicke-seo" },
    openGraph: {
      title: "Technické SEO | VIZEON",
      description: "Rychlost, strukturovaná data a indexovatelnost webu jako základ pro všechno ostatní SEO.",
      url: "https://vizeon.cz/sluzby/seo-optimalizace/technicke-seo",
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
        { "@type": "ListItem", position: 3, name: "SEO optimalizace", item: "https://vizeon.cz/sluzby/seo-optimalizace" },
        { "@type": "ListItem", position: 4, name: "Technické SEO", item: "https://vizeon.cz/sluzby/seo-optimalizace/technicke-seo" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Technické SEO",
      name: "Technické SEO",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/seo-optimalizace/technicke-seo",
      description: "Optimalizace rychlosti, strukturovaných dat a indexovatelnosti webu pro vyhledávače.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak poznám, že má web technický problém?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nejčastější signály jsou pomalé načítání, propad pozic bez zjevného důvodu nebo stránky, které se neobjevují ve výsledcích vyhledávání vůbec. Přesně tohle prověřuje SEO audit.",
          },
        },
      ],
    },
  ],
};

export default function TechnickeSeoPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/seo-optimalizace/technicke-seo" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Technické SEO"
          h1="Technické SEO, bez kterého žádná jiná SEO práce nefunguje"
          lead="Technické SEO je základ, na kterém stojí všechno ostatní. Sebelepší obsah nepomůže, pokud web pomalu načítá nebo ho vyhledávače nedokážou správně přečíst."
        />

        <div className="space-y-14">
          <section aria-labelledby="rychlost">
            <h2 id="rychlost" className={cn(t.h2Page, "mb-4")}>Rychlost a Core Web Vitals</h2>
            <p className={t.body}>
              Optimalizace obrázků, načítání a mobilního výkonu podle metrik Core Web Vitals, které
              Google používá jako přímý ranking signál. Pomalý web ztrácí pozice i návštěvníky, kteří
              zavřou kartu dřív, než se stihne načíst.
            </p>
          </section>

          <section aria-labelledby="strukturovana">
            <h2 id="strukturovana" className={cn(t.h2Page, "mb-4")}>Strukturovaná data</h2>
            <p className={t.body}>
              Schema.org značky (JSON-LD) pomáhají vyhledávačům pochopit, o čem stránka je — třeba
              že jde o službu, recenzi nebo často kladenou otázku. Tenhle web sám používá
              strukturovaná data na každé stránce, je to konkrétní ukázka, jak to v praxi vypadá.
            </p>
          </section>

          <section aria-labelledby="indexovatelnost">
            <h2 id="indexovatelnost" className={cn(t.h2Page, "mb-4")}>Indexovatelnost</h2>
            <p className={t.body}>
              Sitemap.xml, robots.txt a hlavně canonical adresy — stránka bez vlastní canonical URL
              se v Next.js dokáže tiše zdědit po nadřazené stránce a sama sebe odindexovat. Je to
              jedna z nejčastějších a nejhůř viditelných chyb, kterou technické SEO odhalí a opraví.
            </p>
          </section>

          <section aria-labelledby="faq-technicke">
            <h2 id="faq-technicke" className={cn(t.h2Page, "mb-6")}>Časté otázky o technickém SEO</h2>
            <div className="space-y-6">
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Jak poznám, že má web technický problém?</h3>
                <p className={t.body}>
                  Nejčastější signály jsou pomalé načítání, propad pozic bez zjevného důvodu nebo
                  stránky, které se neobjevují ve výsledcích vyhledávání vůbec. Přesně tohle prověřuje{" "}
                  <Link href="/sluzby/seo-optimalizace/audit" className={t.link}>SEO audit</Link>.
                </p>
              </div>
            </div>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete vědět, jestli web technicky brzdí vaše SEO?"
          subheading="Nezávazná konzultace zdarma — probereme, kde přesně web ztrácí rychlost i pozice."
        />

        <div className="mt-14">
          <Link href="/sluzby/seo-optimalizace" className={t.backLink}>← Zpět na SEO optimalizaci</Link>
        </div>
      </div>
    </PageShell>
  );
}
