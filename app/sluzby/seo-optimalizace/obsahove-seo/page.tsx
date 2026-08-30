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
    title: "Obsahové SEO — klíčová slova a obsahová strategie",
    description:
      "Obsahové SEO: výzkum klíčových slov, obsahová strategie a interní prolinkování, díky kterým web dlouhodobě roste v přirozeném vyhledávání.",
    alternates: { canonical: "https://vizeon.cz/sluzby/seo-optimalizace/obsahove-seo" },
    openGraph: {
      title: "Obsahové SEO | VIZEON",
      description: "Klíčová slova, obsahová strategie a interní prolinkování pro dlouhodobý růst návštěvnosti.",
      url: "https://vizeon.cz/sluzby/seo-optimalizace/obsahove-seo",
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
        { "@type": "ListItem", position: 4, name: "Obsahové SEO", item: "https://vizeon.cz/sluzby/seo-optimalizace/obsahove-seo" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Obsahové SEO",
      name: "Obsahové SEO",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/seo-optimalizace/obsahove-seo",
      description: "Výzkum klíčových slov, obsahová strategie a interní prolinkování pro dlouhodobý růst v přirozeném vyhledávání.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak dlouho trvá, než se obsahové SEO projeví?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Obvykle v řádu měsíců, ne dní — obsahové SEO je dlouhodobá práce. Vyhledávače potřebují čas, aby nový obsah vyhodnotily a začaly mu důvěřovat.",
          },
        },
      ],
    },
  ],
};

export default function ObsahoveSeoPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/seo-optimalizace/obsahove-seo" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Obsahové SEO"
          h1="Obsahové SEO, které přivádí návštěvníky dlouhodobě"
          lead="Obsahové SEO znamená psát o tom, co lidé ve vašem oboru skutečně hledají, a propojit stránky tak, aby si navzájem posilovaly pozice, ne aby si konkurovaly."
        />

        <div className="space-y-14">
          <section aria-labelledby="vyzkum">
            <h2 id="vyzkum" className={cn(t.h2Page, "mb-4")}>Výzkum klíčových slov</h2>
            <p className={t.body}>
              Najdu fráze, které lidé ve vašem oboru skutečně zadávají do vyhledávače — na základě
              dat, ne odhadu. Rozdělím je podle záměru (informační, srovnávací, nákupní), ať každá
              stránka cílí na jinou fázi rozhodování zákazníka.
            </p>
          </section>

          <section aria-labelledby="strategie">
            <h2 id="strategie" className={cn(t.h2Page, "mb-4")}>Obsahová strategie a blog</h2>
            <p className={t.body}>
              Pravidelný obsah — třeba{" "}
              <Link href="/blog" className={t.link}>blog</Link>{" "}
              nebo oborové stránky — je dlouhodobý zdroj návštěvnosti, který na rozdíl od placené
              reklamy nezmizí ve chvíli, kdy přestanete platit. Obsah navrhuju tak, aby přímo
              podporoval hlavní služby, ne aby s nimi soutěžil o pozornost.
            </p>
          </section>

          <section aria-labelledby="prolinkovani">
            <h2 id="prolinkovani" className={cn(t.h2Page, "mb-4")}>Interní prolinkování</h2>
            <p className={t.body}>
              Jak jsou stránky mezi sebou propojené, rozhoduje skoro stejně jako samotný obsah —
              osiřelá stránka bez odkazů se hůř indexuje a hůř rankuje. Přesně tímhle principem jsou
              propojené i oborové stránky na tomto webu, třeba{" "}
              <Link href="/web-pro-remeslniky" className={t.link}>web pro řemeslníky</Link>{" "}
              s jednotlivými řemesly — je to konkrétní ukázka toho, jak topic-cluster prolinkování
              v praxi vypadá.
            </p>
          </section>

          <section aria-labelledby="faq-obsahove">
            <h2 id="faq-obsahove" className={cn(t.h2Page, "mb-6")}>Časté otázky o obsahovém SEO</h2>
            <div className="space-y-6">
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Jak dlouho trvá, než se obsahové SEO projeví?</h3>
                <p className={t.body}>Obvykle v řádu měsíců, ne dní — obsahové SEO je dlouhodobá práce. Vyhledávače potřebují čas, aby nový obsah vyhodnotily a začaly mu důvěřovat.</p>
              </div>
            </div>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete web, který roste v přirozeném vyhledávání i bez placené reklamy?"
          subheading="Nezávazná konzultace zdarma — probereme, jaký obsah má pro váš obor smysl."
        />

        <div className="mt-14">
          <Link href="/sluzby/seo-optimalizace" className={t.backLink}>← Zpět na SEO optimalizaci</Link>
        </div>
      </div>
    </PageShell>
  );
}
