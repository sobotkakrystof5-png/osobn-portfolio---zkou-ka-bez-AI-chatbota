import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import AutomationAccordion from "@/components/AutomationAccordion";
import AutomationFAQ from "@/components/AutomationFAQ";
import { AltenoMark, BrandLockup } from "@/components/brand/AltenoMark";
import { CTAButton } from "@/components/CTAButton";
import {
  AUTOMATION_BUNDLES,
  AUTOMATION_FAQ,
  AUTOMATION_SERVICES,
  AUTOMATION_STEPS,
} from "@/lib/data/automation";
import { altenoUrl } from "@/lib/alteno";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Stránka záměrně necílí na hlavní fráze ALTENA ("automatizace firemních
// procesů", "AI agenti na míru") — ty patří alteno.cz a VIZEON by si s vlastní
// sesterskou doménou přetahoval stejné dotazy. Míří na long-tail z pohledu
// majitele webu: automatizace poptávek z webu, web a automatizace od jednoho
// dodavatele. Stejná logika jako u metadat homepage (viz app/page.tsx).
export function generateMetadata(): Metadata {
  return {
    title: "Automatizace a AI pro majitele webu | VIZEON × ALTENO",
    description:
      "Automatizace poptávek z webu, chatboti a AI agenti pro živnostníky a malé firmy. Web i automatizace od jednoho dodavatele, od 4 999 Kč, konzultace zdarma.",
    alternates: { canonical: "https://vizeon.cz/automatizace" },
    openGraph: {
      title: "Automatizace a AI pro majitele webu | VIZEON × ALTENO",
      description:
        "Web přivede zákazníky, automatizace se postará o to, co následuje. Jeden člověk, dvě značky, konzultace zdarma.",
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
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Automatizace a AI",
        itemListElement: AUTOMATION_SERVICES.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.title,
            description: s.summary,
            url: `https://vizeon.cz/automatizace#${s.id}`,
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

export default function AutomatizacePage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/automatizace" />

      {/* Hero */}
      <div className={cn(t.container.wide, "pt-16 md:pt-24 pb-4")}>
        <p className={cn(t.eyebrow, "mb-4")}>— Automatizace by ALTENO</p>
        <h1 className={cn(t.h1, "mb-6 max-w-3xl")}>
          Automatizace pro firmy, které mají web hotový
        </h1>
        <p className={cn(t.lead, "max-w-2xl mb-8")}>
          Web vám přivede zákazníky. Automatizace se postará o všechno, co následuje: potvrzení
          poptávek, odpovědi na běžné dotazy, zápisy do tabulek, připomínky. Stavím ji pod značkou
          ALTENO, vy mluvíte pořád se stejným člověkem.
        </p>

        <div className="inline-flex items-center gap-3 border border-[rgba(201,168,76,0.25)] px-4 py-2 mb-10">
          <span className="font-inter font-light text-[11px] uppercase tracking-[0.15em] text-[#8a8070]">
            Sesterská značka
          </span>
          <AltenoMark size="sm" />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <CTAButton className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-colors duration-300 text-center">
            Konzultace zdarma →
          </CTAButton>
          <a
            href={altenoUrl("/", "automatizace-hero")}
            target="_blank"
            rel="noopener"
            className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#f0ece6] border border-white/10 px-8 py-4 hover:border-white/20 hover:bg-white/5 transition-colors duration-300 text-center"
          >
            Prohlédnout ALTENO ↗
          </a>
        </div>
      </div>

      {/* Čtyři služby jako rozklikávací položky */}
      <AutomationAccordion />

      <div className={cn(t.container.page, "py-16 md:py-24 space-y-16 md:space-y-20")}>
        {/* Balíčky */}
        <section aria-labelledby="balicky">
          <h2 id="balicky" className={cn(t.h2Page, "mb-3")}>
            Web a automatizace najednou
          </h2>
          <p className={cn(t.body, "mb-8 max-w-2xl")}>
            Když web teprve vzniká, dává smysl plánovat rovnou i to, co se bude dít po odeslání
            formuláře. Ušetří to pozdější přestavby.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {AUTOMATION_BUNDLES.map((b) => (
              <div key={b.title} className="border border-white/[0.06] p-5 flex flex-col">
                <h3 className={cn(t.h3, "mb-2")}>{b.title}</h3>
                <p className={cn(t.body, "mb-5")}>{b.text}</p>
                <p className="mt-auto font-inter font-light text-[12px] uppercase tracking-[0.1em] text-[#c9a84c]">
                  {b.price}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Rodina značek */}
        <section aria-labelledby="rodina">
          <h2 id="rodina" className={cn(t.h2Page, "mb-5")}>
            Jeden člověk, dvě značky
          </h2>
          <BrandLockup
            size="md"
            className="mb-6"
            altenoHref={altenoUrl("/", "automatizace-rodina")}
          />
          <p className={cn(t.body, "max-w-2xl mb-6")}>
            Web stavím pod značkou VIZEON, automatizaci pod značkou ALTENO. Za oběma stojím já.
            Máte jeden kontakt, jednu komunikaci a jeden klientský portál{" "}
            <Link href="/zakaziq" className={t.link}>
              ZakazIQ
            </Link>
            , kde vidíte, v jaké fázi je vaše zakázka. Nic se nepřehazuje mezi dodavateli.
          </p>
          <p className={t.body}>
            <Link href="/ukazky-webu/alteno" className={t.link}>
              Podívejte se, jak vypadá web, který jsem pro ALTENO postavil
            </Link>
            .
          </p>
        </section>

        {/* Průběh */}
        <section aria-labelledby="jak-to-probiha">
          <h2 id="jak-to-probiha" className={cn(t.h2Page, "mb-8")}>
            Jak to probíhá
          </h2>
          <div className="space-y-6">
            {AUTOMATION_STEPS.map((s) => (
              <div key={s.step} className="flex gap-5">
                <span
                  className="font-cormorant font-light text-[26px] leading-none text-[#c9a84c]/40 shrink-0 w-8 pt-1"
                  aria-hidden="true"
                >
                  {s.step}
                </span>
                <div>
                  <h3 className={cn(t.h3, "mb-1.5")}>{s.title}</h3>
                  <p className={t.body}>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <p className={cn(t.body, "mt-8")}>
            Podrobný průběh spolupráce na webu popisuje stránka{" "}
            <Link href="/spoluprace" className={t.link}>
              jak probíhá spolupráce
            </Link>
            .
          </p>
        </section>

        {/* FAQ */}
        <section aria-labelledby="faq-automatizace">
          <h2 id="faq-automatizace" className={cn(t.h2Page, "mb-6")}>
            Časté otázky o automatizaci
          </h2>
          <AutomationFAQ />
        </section>

        <ClosingCTA
          heading="Máte web a chcete, aby za vás dělal víc?"
          subheading="Nezávazná konzultace zdarma. Projdeme váš provoz a řeknu vám, co se vyplatí automatizovat jako první."
        />

        <div>
          <Link href="/sluzby" className={t.backLink}>
            ← Zpět na přehled služeb
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
