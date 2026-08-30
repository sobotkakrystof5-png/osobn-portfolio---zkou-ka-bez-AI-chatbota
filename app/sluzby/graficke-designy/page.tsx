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
    title: "Grafické designy — logo, vizitky, bannery a tiskoviny",
    description:
      "Grafický design na míru pro živnostníky a malé firmy zahrnuje logo, vizitky, sociální vizuály i tiskové materiály. Jednotný vizuál zvyšuje důvěru zákazníků.",
    alternates: { canonical: "https://vizeon.cz/sluzby/graficke-designy" },
    openGraph: {
      title: "Grafické designy | VIZEON",
      description: "Logo, vizitky, bannery a tiskoviny na míru vašemu byznysu.",
      url: "https://vizeon.cz/sluzby/graficke-designy",
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
        { "@type": "ListItem", position: 3, name: "Grafické designy", item: "https://vizeon.cz/sluzby/graficke-designy" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Grafický design",
      name: "Grafické designy na míru",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/graficke-designy",
      description: "Logo, vizitky, sociální vizuály a tiskové materiály na míru.",
    },
  ],
};

const items = [
  { name: "Brand Logo", price: "od 699 Kč", desc: "Originální logo, které dostanete ve formátech SVG, PNG i PDF a v každé velikosti, kterou budete potřebovat." },
  { name: "Business Card", price: "od 299 Kč", desc: "Vizitka na míru, digitální i tisková verze." },
  { name: "Social Visual", price: "od 299 Kč/ks", desc: "Grafický vizuál pro jeden příspěvek nebo story. Publikaci si řešíte sami." },
  { name: "Print Design", price: "od 699 Kč", desc: "Leták, plakát nebo banner připravený k tisku." },
];

export default function GrafickeDesignyPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/graficke-designy" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Grafické designy"
          h1="Vizuál, kterému zákazníci uvěří na první pohled"
          lead="Grafiku navrhuju od loga pro začínajícího živnostníka až po jednotný vizuál pro celou firmu tak, aby zvyšovala důvěru a bylo poznat, že za ní stojí profesionál."
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
            <p className={cn(t.body, "mt-6")}>
              Kompletní ceník včetně balíčků najdete na{" "}
              <Link href="/cena-tvorby-webu" className={t.link}>samostatné stránce s ceníkem</Link>.
            </p>
          </section>

          <section aria-labelledby="pro-koho">
            <h2 id="pro-koho" className={cn(t.h2Page, "mb-4")}>Pro koho se to hodí</h2>
            <p className={t.body}>
              Grafiku řeším nejčastěji společně s tvorbou webu, třeba logo a vizitka pro{" "}
              <Link href="/web-pro-remeslniky" className={t.link}>řemeslníky</Link>, jednotný vizuál
              pro{" "}
              <Link href="/web-pro-kadernictvi" className={t.link}>kadeřnictví</Link>{" "}
              nebo důvěryhodná grafika pro{" "}
              <Link href="/web-pro-ucetni" className={t.link}>účetní kancelář</Link>. Objednat si ji
              ale můžete i samostatně, bez tvorby webu.
            </p>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete jednotný vizuál pro váš byznys?"
          subheading="Nezávazná konzultace zdarma. Probereme, co přesně potřebujete."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
