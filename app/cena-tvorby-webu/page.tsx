import type { Metadata } from "next";
import Link from "next/link";
import Pricing from "@/components/Pricing";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Cena tvorby webu na míru",
    description:
      "Cena tvorby webu na míru pro živnostníky, transparentní ceník od 4 999 Kč, hotovo do 3 týdnů. Weby, grafika i správa sítí.",
    alternates: { canonical: "https://vizeon.cz/cena-tvorby-webu" },
    openGraph: {
      title: "Ceník — cena tvorby webu na míru | VIZEON",
      description: "Kolik stojí web pro živnostníka? Přehledný ceník bez skrytých poplatků.",
      url: "https://vizeon.cz/cena-tvorby-webu",
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
        { "@type": "ListItem", position: 2, name: "Ceník", item: "https://vizeon.cz/cena-tvorby-webu" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba webu na míru",
      name: "Tvorba webu na míru — ceník",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/cena-tvorby-webu",
      description:
        "Tvorba webu na míru pro živnostníky a malé firmy, transparentní ceník od 4 999 Kč bez skrytých poplatků.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Proč je cena nižší než u agentur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Protože weby dělám sám, bez agenturní režie, subdodavatelů a lidí navíc mezi vámi a tím, kdo web reálně staví. Ušetřené náklady na provoz se promítají přímo do ceny.",
          },
        },
        {
          "@type": "Question",
          name: "Co je v ceně zahrnuté?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Responzivní design, základní on-page SEO, dohodnutý počet úprav do finálního schválení a zaškolení ke správě obsahu. Hosting, doménu a průběžnou správu webu po spuštění řešíte zvlášť — na správu nabízím službu Web Care od 999 Kč/měsíc.",
          },
        },
        {
          "@type": "Question",
          name: "Platí se záloha?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, 30 % zálohou při zahájení práce a 70 % doplatek po dokončení a schválení webu. Před tím proběhne nezávazná konzultace zdarma, kde probereme rozsah a cenu.",
          },
        },
      ],
    },
  ],
};

export default function CenaTvorbyWebuPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/cena-tvorby-webu" />
      <Pricing />

      <div className={cn(t.container.page, "pb-16 md:pb-24")}>
        <div className="space-y-14">
          <section aria-labelledby="proc-levneji">
            <h2 id="proc-levneji" className={cn(t.h2Page, "mb-6")}>
              Proč je cena nižší než u agentury
            </h2>
            <p className={cn(t.body, "mb-6")}>
              VIZEON není agentura s týmem projektových manažerů a subdodavatelů — design i vývoj
              řeším sám, od první schůzky až po předání hotového webu.
            </p>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Žádná agenturní režie</h3>
                <p className={t.body}>
                  Neplatíte provoz kanceláře, obchodní oddělení ani marži mezi vámi a člověkem,
                  který web reálně dělá.
                </p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Přímá komunikace</h3>
                <p className={t.body}>
                  Píšete rovnou mně. Dotazy a drobné úpravy řešíme na místě, bez předávání mezi
                  obchodníkem a vývojářem.
                </p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Jeden člověk od návrhu po spuštění</h3>
                <p className={t.body}>
                  Design, kód i nasazení mám na starosti sám — méně lidí v procesu znamená míň
                  prostoru pro nedorozumění a rychlejší postup.
                </p>
              </div>
            </div>
          </section>

          <section aria-labelledby="v-cene">
            <h2 id="v-cene" className={cn(t.h2Page, "mb-6")}>
              Co je v ceně a co v ní není
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className={cn(t.h3, "mb-3")}>Co je v ceně</h3>
                <ul className={cn(t.body, "space-y-2 list-disc list-inside")}>
                  <li>Responzivní design pro mobil, tablet i desktop</li>
                  <li>Základní on-page SEO — meta popisky, strukturovaná data, rychlost načítání</li>
                  <li>Dohodnutý počet kol úprav do finálního schválení</li>
                  <li>Zaškolení ke správě obsahu po předání webu</li>
                  <li>Testování napříč zařízeními a prohlížeči před spuštěním</li>
                </ul>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-3")}>Co v ceně není</h3>
                <ul className={cn(t.body, "space-y-2 list-disc list-inside")}>
                  <li>Hosting a doména — vlastníte je vy, s výběrem i nastavením ale poradím</li>
                  <li>Copywriting nebo focení nad rámec podkladů, které sami dodáte</li>
                  <li>
                    Průběžná správa webu po spuštění — řeší samostatná služba Web Care od 999 Kč/měsíc
                  </li>
                  <li>Úpravy nad rámec už schválené nabídky</li>
                </ul>
              </div>
            </div>
          </section>

          <section aria-labelledby="faq-cena">
            <h2 id="faq-cena" className={cn(t.h2Page, "mb-6")}>
              Časté otázky o ceně
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Proč je cena nižší než u agentur?</h3>
                <p className={t.body}>
                  Protože weby dělám sám, bez agenturní režie, subdodavatelů a lidí navíc mezi
                  vámi a tím, kdo web reálně staví. Ušetřené náklady na provoz se promítají přímo
                  do ceny.
                </p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Co je v ceně zahrnuté?</h3>
                <p className={t.body}>
                  Responzivní design, základní on-page SEO, dohodnutý počet úprav do finálního
                  schválení a zaškolení ke správě obsahu. Hosting, doménu a průběžnou správu webu
                  po spuštění řešíte zvlášť — na správu nabízím službu Web Care od 999 Kč/měsíc.
                </p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Platí se záloha?</h3>
                <p className={t.body}>
                  Ano, 30 % zálohou při zahájení práce a 70 % doplatek po dokončení a schválení
                  webu. Před tím proběhne nezávazná konzultace zdarma, kde probereme rozsah a cenu.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-14">
          <Link href="/" className={t.backLink}>
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
