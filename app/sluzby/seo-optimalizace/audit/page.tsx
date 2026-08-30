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
    title: "SEO audit webu — zjistěte, proč vás Google i Seznam nenajdou",
    description:
      "SEO audit webu odhalí technické chyby, chybějící klíčová slova a mezery vůči konkurenci. Přehledný report s prioritizovanými doporučeními.",
    alternates: { canonical: "https://vizeon.cz/sluzby/seo-optimalizace/audit" },
    openGraph: {
      title: "SEO audit webu | VIZEON",
      description: "Diagnostika webu — technická kontrola, klíčová slova a srovnání s konkurencí.",
      url: "https://vizeon.cz/sluzby/seo-optimalizace/audit",
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
        { "@type": "ListItem", position: 4, name: "SEO audit", item: "https://vizeon.cz/sluzby/seo-optimalizace/audit" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "SEO audit webu",
      name: "SEO audit webu",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/seo-optimalizace/audit",
      description: "Technická kontrola webu, analýza klíčových slov a srovnání s konkurencí s přehledným reportem doporučení.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak dlouho audit trvá?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Podle rozsahu webu obvykle 3 až 7 pracovních dní. Termín znáte předem, ať můžete plánovat další kroky.",
          },
        },
        {
          "@type": "Question",
          name: "Dostanu i konkrétní návod, co dělat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, report obsahuje seřazená doporučení podle dopadu a náročnosti, ne jen seznam problémů. Na konzultaci probereme, co dává smysl řešit jako první.",
          },
        },
      ],
    },
  ],
};

export default function SeoAuditPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/seo-optimalizace/audit" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="SEO audit"
          h1="SEO audit webu, který ukáže přesně, co brzdí vaše pozice"
          lead="SEO audit je diagnostika, ne oprava — proberu web ze všech úhlů a dostanete přehledný report s tím, co konkrétně upravit a v jakém pořadí."
        />

        <div className="space-y-14">
          <section aria-labelledby="obsah">
            <h2 id="obsah" className={cn(t.h2Page, "mb-6")}>Co audit obsahuje</h2>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Technická kontrola</h3>
                <p className={t.body}>Rychlost načítání, indexovatelnost, strukturovaná data a mobilní zobrazení — základ, který musí sedět, než řešíme cokoliv dalšího.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Obsahová analýza</h3>
                <p className={t.body}>Na jaká klíčová slova web aktuálně reálně rankuje, kde chybí obsah a kde si stránky navzájem konkurují místo aby se doplňovaly.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Srovnání s konkurencí</h3>
                <p className={t.body}>Na co rankují weby, se kterými reálně soutěžíte o zákazníky, a jaké mezery ve vyhledávání můžete využít vy.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="prubeh">
            <h2 id="prubeh" className={cn(t.h2Page, "mb-4")}>Jak audit probíhá</h2>
            <p className={t.body}>
              Web proberu pomocí Google Search Console, PageSpeed Insights a kontroly meta dat i
              strukturovaných dat. Výstupem je přehledný report, kde jsou doporučení seřazená podle
              dopadu — co přinese výsledek rychle, a co je dlouhodobější práce.
            </p>
          </section>

          <section aria-labelledby="dal">
            <h2 id="dal" className={cn(t.h2Page, "mb-4")}>Co s auditem dál</h2>
            <p className={t.body}>
              Audit sám o sobě web nezlepší — je to podklad pro rozhodnutí, co řešit dřív. Podle
              toho, co odhalí, obvykle navazuje{" "}
              <Link href="/sluzby/seo-optimalizace/technicke-seo" className={t.link}>technické SEO</Link>,{" "}
              <Link href="/sluzby/seo-optimalizace/obsahove-seo" className={t.link}>obsahové SEO</Link>{" "}
              nebo{" "}
              <Link href="/sluzby/seo-optimalizace/lokalni-seo" className={t.link}>lokální SEO</Link>.
            </p>
          </section>

          <section aria-labelledby="faq-audit">
            <h2 id="faq-audit" className={cn(t.h2Page, "mb-6")}>Časté otázky o SEO auditu</h2>
            <div className="space-y-6">
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Jak dlouho audit trvá?</h3>
                <p className={t.body}>Podle rozsahu webu obvykle 3 až 7 pracovních dní. Termín znáte předem, ať můžete plánovat další kroky.</p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Dostanu i konkrétní návod, co dělat?</h3>
                <p className={t.body}>Ano, report obsahuje seřazená doporučení podle dopadu a náročnosti, ne jen seznam problémů. Na konzultaci probereme, co dává smysl řešit jako první.</p>
              </div>
            </div>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete vědět, co přesně brzdí váš web ve vyhledávání?"
          subheading="Nezávazná konzultace zdarma — probereme rozsah webu a co audit odhalí."
        />

        <div className="mt-14">
          <Link href="/sluzby/seo-optimalizace" className={t.backLink}>← Zpět na SEO optimalizaci</Link>
        </div>
      </div>
    </PageShell>
  );
}
