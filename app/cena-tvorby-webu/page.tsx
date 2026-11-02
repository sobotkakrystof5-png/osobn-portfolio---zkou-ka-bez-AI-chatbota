import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { PriceTable } from "@/components/services/PriceTable";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { Alteno, Vizeon } from "@/components/brand/BrandName";

// Stránka o ceně webu. Kompletní ceník všech služeb je od 11/2026 v přehledu
// Služby a ceník (/sluzby), tady zůstávají jen weby a texty k ceně.

export function generateMetadata(): Metadata {
  return {
    title: "Cena tvorby webu na míru",
    description:
      "Cena tvorby webu na míru pro živnostníky a malé firmy. Transparentní ceník od 4 999 Kč bez skrytých poplatků, co je v ceně a co ne.",
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
            text: "Protože nejsme agentura. Nemáme agenturní režii, subdodavatele ani lidi navíc mezi vámi a tím, kdo web reálně staví. Ušetřené náklady na provoz se promítají přímo do ceny.",
          },
        },
        {
          "@type": "Question",
          name: "Co je v ceně zahrnuté?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Responzivní design, základní on-page SEO, dohodnutý počet úprav do finálního schválení a zaškolení ke správě obsahu. Hosting a doménu řešíte zvlášť, s výběrem i nastavením ale poradíme. Drobné úpravy po spuštění uděláme jako jednorázový technický zásah.",
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
        {
          "@type": "Question",
          name: "Kolik stojí automatizace a AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Automatizace začíná na 4 999 Kč a pevnou cenu znáte předem. Prvních 14 dní po spuštění máte podporu zdarma, potom si můžete vzít průběžnou podporu jako měsíční paušál. Cenu AI agentů a chatbotů určuje rozsah, dostanete ji v nabídce po konzultaci. Tuhle část realizuje sesterská značka ALTENO.",
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
      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Cena webu"
          h1="Cena webu na míru."
          lead={
            <>
              Ceník je veřejný a stejný pro každého klienta, cena se odvíjí jen od rozsahu práce.
              Pokud řešíte konkrétní obor, mrkněte i na{" "}
              <Link href="/tvorba-webu-pro-zivnostniky" className={t.link}>
                tvorbu webu pro živnostníky
              </Link>
              . Co všechno cenu ovlivňuje, rozebíráme v článku{" "}
              <Link href="/blog/kolik-stoji-tvorba-webu-2026" className={t.link}>
                Kolik stojí tvorba webových stránek v roce 2026
              </Link>
              .
            </>
          }
        />

        <div className="space-y-14">
          <section aria-labelledby="cenik-webu">
            <h2 id="cenik-webu" className={cn(t.h2Page, "mb-6")}>
              Ceník webů
            </h2>
            <PriceTable categories={["Weby"]} />
            <p className={cn(t.body, "mt-6")}>
              Ceny e-shopů, aplikací, automatizací, grafiky a dalších služeb najdete v přehledu{" "}
              <Link href="/sluzby" className={t.link}>
                služby a ceník
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="proc-levneji">
            <h2 id="proc-levneji" className={cn(t.h2Page, "mb-6")}>
              Proč je cena nižší než u agentury
            </h2>
            <p className={cn(t.body, "mb-6")}>
              <Vizeon /> není agentura s týmem projektových manažerů a subdodavatelů. Design i vývoj
              děláme sami, od první schůzky až po předání hotového webu.
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
                  Píšete rovnou nám, lidem, kteří web staví. Dotazy a drobné úpravy řešíme na místě,
                  bez předávání mezi obchodníkem a vývojářem.
                </p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Od návrhu po spuštění v jedněch rukou</h3>
                <p className={t.body}>
                  Design, kód i nasazení máme na starosti sami. Méně lidí v procesu znamená méně
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
                  <li>Základní on-page SEO: meta popisky, strukturovaná data, rychlost načítání</li>
                  <li>Dohodnutý počet kol úprav do finálního schválení</li>
                  <li>Zaškolení ke správě obsahu po předání webu</li>
                  <li>Testování napříč zařízeními a prohlížeči před spuštěním</li>
                </ul>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-3")}>Co v ceně není</h3>
                <ul className={cn(t.body, "space-y-2 list-disc list-inside")}>
                  <li>Hosting a doménu vlastníte vy, s výběrem i nastavením ale poradíme</li>
                  <li>Copywriting nebo focení nad rámec podkladů, které sami dodáte</li>
                  <li>Úpravy po spuštění webu, ty děláme jako jednorázový technický zásah</li>
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
                  Protože nejsme agentura. Nemáme agenturní režii, subdodavatele ani lidi navíc
                  mezi vámi a tím, kdo web reálně staví. Ušetřené náklady na provoz se promítají
                  přímo do ceny.
                </p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Co je v ceně zahrnuté?</h3>
                <p className={t.body}>
                  Responzivní design, základní on-page SEO, dohodnutý počet úprav do finálního
                  schválení a zaškolení ke správě obsahu. Hosting a doménu řešíte zvlášť, s výběrem
                  i nastavením ale poradíme. Drobné úpravy po spuštění uděláme jako jednorázový
                  technický zásah.
                </p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Platí se záloha?</h3>
                <p className={t.body}>
                  Ano, 30 % zálohou při zahájení práce a 70 % doplatek po dokončení a schválení
                  webu. Před tím proběhne nezávazná konzultace zdarma, kde probereme rozsah a cenu.
                </p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Kolik stojí automatizace a AI?</h3>
                <p className={t.body}>
                  Automatizace začíná na 4 999 Kč a pevnou cenu znáte předem. Prvních 14 dní po
                  spuštění máte podporu zdarma, potom si můžete vzít průběžnou podporu jako měsíční
                  paušál. Cenu AI agentů a chatbotů určuje rozsah, dostanete ji v nabídce po
                  konzultaci. Tuhle část realizuje sesterská značka <Alteno />, podrobnosti najdete
                  na stránce{" "}
                  <Link href="/automatizace" className={t.link}>
                    automatizace a AI
                  </Link>
                  .
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
