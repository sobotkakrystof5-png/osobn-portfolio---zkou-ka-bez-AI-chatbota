import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { CTAButton } from "@/components/CTAButton";
import { PriceLabel } from "@/components/PriceLabel";
import { EshopHeroVisual } from "@/components/services/eshop/EshopHeroVisual";
import { OrderJourney } from "@/components/services/eshop/OrderJourney";
import { PlatformHub } from "@/components/services/eshop/PlatformHub";
import { ShippingConfigurator } from "@/components/services/eshop/ShippingConfigurator";
import { EshopPricing, PlatformChoice } from "@/components/services/eshop/EshopPricing";
import { LaunchTimeline } from "@/components/services/eshop/LaunchTimeline";
import { EshopAdsBand } from "@/components/services/eshop/EshopAdsBand";
import { EshopStickyCTA } from "@/components/services/eshop/EshopStickyCTA";
import { ESHOP_PACKAGE, PRICE_BY_NAME } from "@/lib/data/pricing";
import { SectionHead } from "@/components/services/SectionHead";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Stránka E-shopy (přepis 11/2026): místo odstavců cesta jedné objednávky,
// platforma se vším napojeným, vyzkoušitelná doprava a jedna cena s tím,
// od čeho se odvíjí. Motto: e-shop je základ e-commerce, reklama ho rozjede.
// Cena je v lib/data/pricing.ts (kategorie „E-shopy“).

const PRICE = PRICE_BY_NAME[ESHOP_PACKAGE];

export function generateMetadata(): Metadata {
  return {
    title: "Tvorba e-shopu na míru od 29 990 Kč: Shopify i vlastní kód",
    description:
      "Tvorba e-shopu na míru od 29 990 Kč. Shopify nebo vlastní kód, platební brána, dopravci a výdejní místa, napojení skladu, automatické faktury a reklamy po spuštění.",
    alternates: { canonical: "https://vizeon.cz/sluzby/tvorba-e-shopu" },
    openGraph: {
      title: "Tvorba e-shopu na míru | VIZEON",
      description: "E-shop je základ e-commerce. Platby, doprava, sklad i reklama od jednoho partnera, od 29 990 Kč.",
      url: "https://vizeon.cz/sluzby/tvorba-e-shopu",
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
        { "@type": "ListItem", position: 3, name: "Tvorba e-shopu", item: "https://vizeon.cz/sluzby/tvorba-e-shopu" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba e-shopu na míru",
      name: "Tvorba e-shopu na míru",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/tvorba-e-shopu",
      description:
        "E-shopy na míru na Shopify nebo ve vlastním kódu s platební bránou, dopravci a výdejními místy, napojením skladu, automatickými fakturami a reklamou po spuštění.",
      offers: {
        "@type": "Offer",
        name: ESHOP_PACKAGE,
        priceSpecification: { "@type": "PriceSpecification", minPrice: 29990, priceCurrency: "CZK" },
      },
    },
  ],
};

const sectionGap = "mt-28 md:mt-40";

export default function TvorbaEshopuPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/tvorba-e-shopu" />

      <div className={cn(t.container.wide, "pt-16 md:pt-24")}>
        {/* Hero: motto, cena hned nahoře a vpravo živá objednávka. */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <p className={cn(t.eyebrow, "mb-4")}>— Tvorba e-shopu na míru</p>
            <h1 className="max-w-2xl font-cormorant font-light text-[44px] leading-[1.04] text-[#f0ece6] md:text-[72px]">
              E-shop je <span className="text-shimmer">základ</span>{" "}
              <span className="whitespace-nowrap">e-commerce.</span>
            </h1>
            <p className={cn(t.lead, "mt-7 max-w-xl")}>
              Postavíme vám e-shop, napojíme platby, dopravce i sklad a pomůžeme vám ho rozjet reklamou.
              Všechno s jedním partnerem.
            </p>

            <div className="mt-9 flex flex-wrap items-end gap-x-6 gap-y-2">
              <p className="font-cormorant font-light text-[52px] leading-none lining-nums text-[#f0ece6] md:text-[60px]">
                <PriceLabel price={PRICE} />
              </p>
              <p className="pb-1.5 font-inter text-[13px] uppercase tracking-[0.12em] text-text-muted">
                Shopify nebo vlastní kód
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton className="glow-pulse flex justify-center bg-[#c9a84c] px-8 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
                Konzultace zdarma →
              </CTAButton>
              <a
                href="#jak-to-funguje"
                className="flex justify-center border border-white/10 px-8 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#f0ece6] transition-all duration-300 hover:border-white/20 hover:bg-white/5"
              >
                Jak to funguje ↓
              </a>
            </div>
          </div>

          <EshopHeroVisual />
        </div>

        <section aria-labelledby="jak-to-funguje-nadpis" id="jak-to-funguje" className={cn(sectionGap, "scroll-mt-24")}>
          <SectionHead
            id="jak-to-funguje-nadpis"
            eyebrow="Jak to funguje"
            title="Cesta jedné objednávky"
            lead="Od kliknutí na Koupit po balík u dveří. Každou zastávku nastavíme za vás."
          />
          <OrderJourney />
        </section>

        <section aria-labelledby="platforma" className={sectionGap}>
          <SectionHead
            id="platforma"
            eyebrow="Vše v jedné platformě"
            title="Jeden e-shop. Všechno napojené."
            lead="Platby, doprava, sklad, faktury i reklamy běží v jednom systému. Vy máte jeden přehled a jednoho partnera, který to celé zná."
          />
          <PlatformHub />
        </section>

        <section aria-labelledby="logistika" className={sectionGap}>
          <SectionHead
            id="logistika"
            eyebrow="Logistika"
            title="Doprava, jakou chtějí vaši zákazníci"
            lead="Vyzkoušejte si to: vyberte dopravce a podívejte se, co uvidí zákazník v pokladně. Napojení, štítky i sledování zásilek nastavíme my."
          />
          <ShippingConfigurator />
        </section>

        <section aria-labelledby="cena" className={sectionGap}>
          <SectionHead
            id="cena"
            eyebrow="Cena"
            title="Jedna cena, žádná překvapení"
            lead="Základ e-shopu za pevnou cenu. Kolik bude stát ten váš, záleží na čtyřech věcech a řekneme vám to předem."
          />
          <EshopPricing />
        </section>

        <section aria-labelledby="platforma-volba" className="mt-24 md:mt-32">
          <h2 id="platforma-volba" className={cn(t.h2Page, "mb-3")}>Shopify, nebo vlastní kód?</h2>
          <p className={cn(t.body, "mb-8 max-w-2xl")}>Obojí umíme. Co dává smysl pro váš e-shop, doporučíme na konzultaci.</p>
          <PlatformChoice />
        </section>

        <section aria-labelledby="spusteni" className={sectionGap}>
          <SectionHead
            id="spusteni"
            eyebrow="Spolupráce"
            title="Od konzultace po první objednávku"
            lead="Víte, co se děje a co přijde dál. Od prvního hovoru po e-shop, který prodává."
          />
          <LaunchTimeline />
        </section>
      </div>

      <div className={sectionGap}>
        <EshopAdsBand />
      </div>

      <div id="eshop-zaver" className={cn(t.container.wide, "pb-16 md:pb-24")}>
        <ClosingCTA
          heading="Chcete prodávat online?"
          subheading="Nezávazná konzultace zdarma. Probereme sortiment, dopravu a platby a řekneme vám přesnou cenu."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>

      <EshopStickyCTA price={PRICE} />
    </PageShell>
  );
}
