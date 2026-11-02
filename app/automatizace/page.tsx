import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { LegacyHashRedirect } from "@/components/automation/LegacyHashRedirect";
import AutomationFAQ from "@/components/AutomationFAQ";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { CTAButton } from "@/components/CTAButton";
import { PriceLabel } from "@/components/PriceLabel";
import { AutomationHeroVisual } from "@/components/services/automation/AutomationHeroVisual";
import { ManualVsAuto } from "@/components/services/automation/ManualVsAuto";
import { ServiceFinder } from "@/components/services/automation/ServiceFinder";
import { AutomationPricing } from "@/components/services/automation/AutomationPricing";
import { AutomationSteps } from "@/components/services/automation/AutomationSteps";
import { TwoBrandsBand } from "@/components/services/automation/TwoBrandsBand";
import { EshopStickyCTA } from "@/components/services/eshop/EshopStickyCTA";
import { AUTOMATION_FAQ, AUTOMATION_SERVICES } from "@/lib/data/automation";
import { AUTOMATION_PACKAGE, PRICE_BY_NAME } from "@/lib/data/pricing";
import { altenoUrl } from "@/lib/alteno";
import { SectionHead } from "@/components/services/SectionHead";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Stránka Automatizace (přepis 11/2026, stejný styl jako E-shopy): místo
// odstavců živá poptávka, přepínač Ručně × S automatizací, výběr služby
// podle toho, co klienta zdržuje, cena s faktory a průběh. Cíl je klik na
// konzultaci zdarma.
//
// Stránka záměrně necílí na hlavní fráze ALTENA ("automatizace firemních
// procesů", "AI agenti na míru"). Ty patří alteno.cz a VIZEON by si se
// sesterskou doménou přetahoval stejné dotazy. Míří na long-tail z pohledu
// majitele webu: automatizace poptávek z webu, web a automatizace od jednoho
// dodavatele. Stejná logika jako u metadat homepage (viz app/page.tsx).

const PRICE = PRICE_BY_NAME[AUTOMATION_PACKAGE];

export function generateMetadata(): Metadata {
  return {
    // `absolute`: šablona titulku v app/layout.tsx by jinak přidala druhé
    // „| VIZEON" („… | VIZEON × ALTENO | VIZEON").
    title: { absolute: "Automatizace a AI pro majitele webu | VIZEON × ALTENO" },
    description:
      "Automatizace poptávek z webu, chatboti a AI agenti pro živnostníky a malé firmy. Web i automatizace na sebe navazují, od 4 999 Kč, konzultace zdarma.",
    alternates: { canonical: "https://vizeon.cz/automatizace" },
    openGraph: {
      title: "Automatizace a AI pro majitele webu | VIZEON × ALTENO",
      description:
        "Web přivede zákazníky, automatizace se postará o to, co následuje. Spolupráce VIZEON × ALTENO, konzultace zdarma.",
      url: "https://vizeon.cz/automatizace",
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
        { "@type": "ListItem", position: 2, name: "Automatizace", item: "https://vizeon.cz/automatizace" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Automatizace a AI pro majitele webu",
      name: "Automatizace a AI",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/automatizace",
      description:
        "Automatizace poptávek z webu, chatboti s odpověďmi z vlastních podkladů a AI agenti pro živnostníky a malé firmy. Realizace pod sesterskou značkou ALTENO.",
      offers: {
        "@type": "Offer",
        name: AUTOMATION_PACKAGE,
        priceSpecification: { "@type": "PriceSpecification", minPrice: 4999, priceCurrency: "CZK" },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Automatizace a AI",
        itemListElement: AUTOMATION_SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.summary,
            url: `https://vizeon.cz/automatizace/${s.id}`,
          },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: AUTOMATION_FAQ.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    },
  ],
};

// Summary služeb pro výběr „Co vás zdržuje“ (klientská komponenta si plná
// data podstránek netahá).
const SUMMARIES = Object.fromEntries(AUTOMATION_SERVICES.map((s) => [s.id, s.summary]));

const sectionGap = "mt-28 md:mt-40";

export default function AutomatizacePage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/automatizace" />
      <LegacyHashRedirect />

      <div className={cn(t.container.wide, "pt-16 md:pt-24")}>
        {/* Hero: slib, cena hned nahoře a vpravo poptávka, která se vyřídí sama. */}
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <p className={t.eyebrow}>— Automatizace a AI</p>
              <BrandLockup
                size="sm"
                altenoHref={altenoUrl("/", "automatizace-hero")}
                className="self-start sm:self-auto"
              />
            </div>
            <h1 className="max-w-2xl font-cormorant font-light text-[44px] leading-[1.04] text-[#f0ece6] md:text-[72px]">
              Automatizace, která pracuje <span className="whitespace-nowrap text-shimmer">za vás.</span>
            </h1>
            <p className={cn(t.lead, "mt-7 max-w-xl")}>
              Web vám přivede zákazníky. Automatizace vyřídí, co následuje: potvrdí poptávku, odpoví na
              běžný dotaz, zapíše data a připomene termín.
            </p>

            <div className="mt-9 flex flex-wrap items-end gap-x-6 gap-y-2">
              <p className="font-cormorant font-light text-[52px] leading-none lining-nums text-[#f0ece6] md:text-[60px]">
                <PriceLabel price={PRICE} />
              </p>
              <p className="pb-1.5 font-inter text-[13px] uppercase tracking-[0.12em] text-text-muted">
                Pevná cena předem
              </p>
            </div>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton className="glow-pulse flex justify-center bg-[#c9a84c] px-8 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
                Konzultace zdarma →
              </CTAButton>
              <a
                href="#rozdil"
                className="flex justify-center border border-white/10 px-8 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#f0ece6] transition-all duration-300 hover:border-white/20 hover:bg-white/5"
              >
                Jak to funguje ↓
              </a>
            </div>
          </div>

          <AutomationHeroVisual />
        </div>

        <section aria-labelledby="rozdil-nadpis" id="rozdil" className={cn(sectionGap, "scroll-mt-24")}>
          <SectionHead
            id="rozdil-nadpis"
            eyebrow="Rozdíl"
            title="Stejná poptávka. Jiný večer."
            lead="Přepněte si to: co dnes děláte ručně a co by se udělalo samo."
          />
          <ManualVsAuto />
        </section>

        <section aria-labelledby="sluzby-nadpis" id="sluzby" className={cn(sectionGap, "scroll-mt-24")}>
          <SectionHead
            id="sluzby-nadpis"
            eyebrow="Co umíme"
            title="Co vás zdržuje nejvíc?"
            lead="Vyberte, co vás trápí, a ukážeme vám řešení."
          />
          <ServiceFinder summaries={SUMMARIES} />
        </section>

        <section aria-labelledby="cena" className={sectionGap}>
          <SectionHead
            id="cena"
            eyebrow="Cena"
            title="Pevná cena, žádná překvapení"
            lead="Kolik bude stát ta vaše, záleží na čtyřech věcech. Řekneme vám to předem."
          />
          <AutomationPricing />
        </section>

        <section aria-labelledby="spoluprace" className={sectionGap}>
          <SectionHead
            id="spoluprace"
            eyebrow="Spolupráce"
            title="Od konzultace po automatizaci, která běží"
            lead="Víte, co se děje a co přijde dál."
          />
          <AutomationSteps />
        </section>
      </div>

      <div className={sectionGap}>
        <TwoBrandsBand />
      </div>

      <div className={cn(t.container.wide, sectionGap)}>
        <section aria-labelledby="faq-automatizace" className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <p className={cn(t.eyebrow, "mb-4")}>— Otázky</p>
            <h2 id="faq-automatizace" className="font-cormorant font-light text-[34px] leading-[1.08] text-[#f0ece6] md:text-[52px]">
              Časté otázky o automatizaci
            </h2>
          </div>
          <AutomationFAQ />
        </section>
      </div>

      <div id="automatizace-zaver" className={cn(t.container.wide, "pb-16 pt-24 md:pb-24 md:pt-32")}>
        <ClosingCTA
          heading="Máte web a chcete, aby za vás dělal víc?"
          subheading="Nezávazná konzultace zdarma. Projdeme váš provoz a řekneme vám, co se vyplatí automatizovat jako první."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>

      <EshopStickyCTA price={PRICE} endId="automatizace-zaver" />
    </PageShell>
  );
}
