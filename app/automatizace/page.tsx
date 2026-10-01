import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import ServiceArtwork from "@/components/automation/ServiceArtwork";
import { Reveal } from "@/components/automation/Reveal";
import AutomationFAQ from "@/components/AutomationFAQ";
import { AltenoMark, BrandLockup } from "@/components/brand/AltenoMark";
import { CTAButton } from "@/components/CTAButton";
import {
  AUTOMATION_BUNDLES,
  AUTOMATION_FAQ,
  AUTOMATION_SERVICES,
  AUTOMATION_STEPS,
} from "@/lib/data/automation";
import { automationPages } from "@/lib/data/automation-pages";
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
    // `absolute`: šablona titulku v app/layout.tsx by jinak přidala druhé
    // „| VIZEON" („… | VIZEON × ALTENO | VIZEON").
    title: { absolute: "Automatizace a AI pro majitele webu | VIZEON × ALTENO" },
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

/** Zvýrazněná karta v gridu služeb (stejně jako na alteno.cz/sluzby). */
const HIGHLIGHTED_SLUG = "ai-agenti";

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

      {/* Čtyři služby jako karty, každá celá vede na svou podstránku
          (/automatizace/<slug>). Rozvržení podle hubu alteno.cz/sluzby:
          grafika přes celý horní slot, název s pořadím, summary pod linkou,
          „Zjistit víc". AI agenti jsou zvýraznění. Název je h2, sekce vlastní
          nadpis nemá (stejně jako v předloze). */}
      <section aria-label="Služby automatizace" className={cn(t.container.wide, "pt-12 md:pt-16")}>
        <Reveal className="grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2">
          {automationPages.map((page, i) => {
            const highlighted = page.slug === HIGHLIGHTED_SLUG;

            return (
              <Link
                key={page.slug}
                href={`/automatizace/${page.slug}`}
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden border p-6 transition-colors duration-500 hover:border-[rgba(201,168,76,0.45)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c]",
                  highlighted ? "border-[rgba(201,168,76,0.2)] bg-[#0e0e0e]" : "border-white/[0.06] bg-[#080808]"
                )}
              >
                <div className="card-shimmer-line absolute top-0 left-0 right-0 h-[1px] pointer-events-none z-10" aria-hidden="true" />

                {/* Grafika přes celý slot, záporné okraje ji pouštějí až
                    k hraně karty. */}
                <div
                  className={cn(
                    "-mx-6 -mt-6 mb-5 h-32 overflow-hidden border-b sm:h-36",
                    highlighted ? "border-accent/20" : "border-white/[0.06]"
                  )}
                >
                  <ServiceArtwork slug={page.slug} id={`svc-${page.slug}`} />
                </div>

                <div className="flex items-baseline justify-between gap-3">
                  <h2 className="font-inter font-medium text-[17px] text-[#f0ece6] transition-colors duration-300 group-hover:text-[#c9a84c]">
                    {page.title}
                  </h2>
                  <div className="flex shrink-0 items-center gap-2">
                    {page.comingSoon ? (
                      <span className="font-inter font-medium text-[10px] tracking-[0.1em] uppercase px-2.5 py-[3px] text-[#c9a84c] border border-[rgba(201,168,76,0.4)]">
                        Připravuji
                      </span>
                    ) : null}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "font-inter text-[11px] tracking-[0.1em] tabular-nums",
                        highlighted ? "text-[#c9a84c]/60" : "text-[#8a8070]"
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                </div>

                <p
                  className={cn(
                    t.body,
                    "mt-4 border-t pt-4",
                    highlighted ? "border-accent/20" : "border-white/[0.06]"
                  )}
                >
                  {page.summary}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-auto pt-6 font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-[#c9a84c]"
                >
                  Zjistit víc →
                </span>
              </Link>
            );
          })}
        </Reveal>
      </section>

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
