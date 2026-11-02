import type { ReactNode } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import ServiceChat from "@/components/automation/ServiceChat";
import ServiceConsole from "@/components/automation/ServiceConsole";
import ServiceFlow from "@/components/automation/ServiceFlow";
import ServicePhone from "@/components/automation/ServicePhone";
import PainArtwork from "@/components/automation/PainArtwork";
import BenefitArtwork from "@/components/automation/BenefitArtwork";
import UseCaseArtwork from "@/components/automation/UseCaseArtwork";
import { Reveal } from "@/components/automation/Reveal";
import { ProcessScene3D } from "@/components/automation/ProcessScene3D";
import { ProcessSteps } from "@/components/automation/ProcessSteps";
import AutomationFAQ from "@/components/AutomationFAQ";
import { CTAButton } from "@/components/CTAButton";
import { SectionHead } from "@/components/services/SectionHead";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { LinkIcon, TargetIcon } from "@/components/automation/process-icons";
import { automationPages, getAutomationPage } from "@/lib/data/automation-pages";
import { getServiceDemo, type ServiceDemo } from "@/lib/data/automation-demos";
import { altenoUrl, type AltenoCampaign } from "@/lib/alteno";
import { t } from "@/lib/ui";
import { cn, firstSentence } from "@/lib/utils";

// Podstránka jedné ze 4 služeb sekce Automatizace (přepis 11/2026 ve stylu
// hubu a E-shopů). Hero ukazuje 3D animaci procesu ze 4 kroků `how`, pod
// ním argumentace: co vás zdržuje → jak to funguje → ukázka → kde se to
// hodí → co z toho máte → pojďme se bavit. Na kartách jen krátké věty.
//
// ŽÁDNÁ CENA v žádné podobě. Typ `Service` pole pro cenu nemá; cenu řeší
// hub /automatizace a odkaz na ceník (/sluzby#automatizace).
//
// Hero se NEBALÍ do fade-in: H1 a lead musí být v serverovém HTML viditelné
// hned (LCP, SEO). 3D scéna stojí vedle, bez reveal. Sekce pod hero se
// odhalují přes <Reveal> (klientský obal, text zůstává v SSR).
//
// „Co vás zdržuje" a „Co získáte" tvoří dvojici před/po a schválně se liší
// od zbytku stránky: bolest má neutrální šedou ilustraci na šrafovaném
// podkladu (PainArtwork, bez akcentu), přínos zlatou na měkkém dozvuku
// (BenefitArtwork, akcent jen na řešení).

type Props = {
  params: Promise<{ slug: string }>;
};

// Scéna se vybírá podle `demo.kind`, ne podle slugu: tvar scény je
// vlastnost dat, ne téhle stránky. Větev `default` přiřazuje do `never`:
// když do sjednocení ServiceDemo přibude tvar a zapomene se sem dopsat,
// spadne build.
function renderScene(demo: ServiceDemo) {
  switch (demo.kind) {
    case "console":
      return <ServiceConsole demo={demo} />;
    case "chat":
      return <ServiceChat demo={demo} />;
    case "flow":
      return <ServiceFlow demo={demo} />;
    case "phone":
      return <ServicePhone demo={demo} />;
    default: {
      const exhaustive: never = demo;
      return exhaustive;
    }
  }
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const sectionGap = "mt-24 md:mt-32";
const indexLabel = "font-inter text-[11px] tracking-[0.1em] tabular-nums text-text-secondary";
const panelLabel = "font-inter text-[11px] uppercase tracking-[0.15em] text-text-secondary";
const chip =
  "inline-flex min-h-9 items-center gap-1.5 border px-3.5 py-1.5 font-inter text-[13px]";

/** Odkazový čip v panelu „Pro koho". Výška 36 px kvůli dotyku. */
function LinkChip({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className={cn(
        chip,
        "border-white/[0.08] bg-[#0e0e0e] text-[#f0ece6] transition-colors duration-300 hover:border-accent/40 hover:text-accent"
      )}
    >
      {children}
      <span aria-hidden className="text-text-secondary">
        →
      </span>
    </Link>
  );
}

/** Neodkazovaný štítek nástroje v panelu „Co s tím propojíme". VIZEON nemá
 *  stránky nástrojů, takže čip jen pojmenovává. */
function ToolChip({ children }: { children: ReactNode }) {
  return (
    <span className={cn(chip, "border-white/[0.06] text-[#b8b0a2]")}>{children}</span>
  );
}

// Kampaň odkazu ALTENO v lockupu nad H1 (kampaně jsou v lib/alteno.ts).
const ALTENO_CAMPAIGN: Record<string, AltenoCampaign> = {
  "ai-agenti": "automatizace-ai-agenti",
  "automatizace-procesu": "automatizace-automatizace-procesu",
  "chatboti-rag": "automatizace-chatboti-rag",
  "voice-agenti": "automatizace-voice-agenti",
};

export function generateStaticParams() {
  return automationPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = getAutomationPage(slug);

  if (!page) {
    return {};
  }

  const url = `https://vizeon.cz/automatizace/${page.slug}`;

  return {
    // „ | VIZEON" doplní šablona titulku v app/layout.tsx.
    title: page.seoTitle,
    description: page.lead,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.seoTitle} | VIZEON`,
      description: page.lead,
      url,
      type: "website",
    },
  };
}

export default async function AutomationServicePage({ params }: Props) {
  const { slug } = await params;
  const page = getAutomationPage(slug);

  if (!page) {
    notFound();
  }

  const demo = getServiceDemo(page.slug);
  const url = `https://vizeon.cz/automatizace/${page.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
          { "@type": "ListItem", position: 2, name: "Automatizace", item: "https://vizeon.cz/automatizace" },
          { "@type": "ListItem", position: 3, name: page.title, item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: page.title,
        name: page.title,
        provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
        areaServed: { "@type": "Country", name: "Česká republika" },
        url,
        description: page.lead,
      },
      {
        // Text otázek i odpovědí musí 1:1 sedět s viditelnou sekcí
        // „Časté otázky" níž. Obojí čte stejné pole `miniFaq`.
        "@type": "FAQPage",
        mainEntity: page.miniFaq.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: item.a },
        })),
      },
    ],
  };

  const sceneId = demo ? "ukazka" : "jak-to-funguje";
  const useCaseCols = page.useCases.length % 3 === 0 ? "lg:grid-cols-3" : "lg:grid-cols-2";

  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page={`/automatizace/${page.slug}`} />

      <div className={cn(t.container.wide, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <Link href="/automatizace" className={t.backLink}>
          ← Zpět na přehled automatizací
        </Link>

        {/* Hero: vlevo název a slib, vpravo 3D scéna služby. */}
        <div className="mt-8 grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <div>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6">
              <div className="flex flex-wrap items-center gap-3">
                <p className={t.eyebrow}>— Automatizace a AI</p>
                {page.comingSoon ? (
                  <span className="font-inter font-medium text-[10px] tracking-[0.1em] uppercase px-2.5 py-[3px] text-[#c9a84c] border border-[rgba(201,168,76,0.4)]">
                    Připravujeme
                  </span>
                ) : null}
              </div>
              <BrandLockup
                size="sm"
                altenoHref={altenoUrl("/", ALTENO_CAMPAIGN[page.slug] ?? "automatizace-hero")}
                className="self-start sm:self-auto"
              />
            </div>

            <h1 className="max-w-2xl font-cormorant font-light text-[44px] leading-[1.04] text-[#f0ece6] md:text-[68px]">
              {page.title}
            </h1>
            <p className={cn(t.lead, "mt-7 max-w-xl")}>{page.lead}</p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <CTAButton className="glow-pulse flex justify-center bg-[#c9a84c] px-8 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
                Konzultace zdarma →
              </CTAButton>
              <a
                href={`#${sceneId}`}
                className="flex justify-center border border-white/10 px-8 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#f0ece6] transition-all duration-300 hover:border-white/20 hover:bg-white/5"
              >
                {demo ? "Vyzkoušet ukázku ↓" : "Jak to funguje ↓"}
              </a>
            </div>
          </div>

          <ProcessScene3D slug={page.slug} />
        </div>

        {/* Co vás dnes zdržuje. Vodorovná karta: ilustrace vlevo nese
            problém dřív, než se čte, věta vpravo ho jen pojmenuje. Karta
            není odkaz, nezvedá se; jen ohnisko ilustrace při najetí
            škubne (`group` + `.pain-jolt`). */}
        <Reveal className={sectionGap}>
          <section aria-labelledby="co-vas-zdrzuje">
            <SectionHead id="co-vas-zdrzuje" eyebrow="Dnes" title="Co vás dnes zdržuje" />
            <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {page.pain.map((item, i) => (
                <li
                  key={item.art}
                  className="group flex items-stretch gap-4 border border-white/[0.07] bg-[#0b0b0b] p-2 pr-5 sm:gap-6"
                >
                  <div className="aspect-square w-24 shrink-0 sm:w-36">
                    <PainArtwork art={item.art} />
                  </div>
                  <div className="flex flex-col justify-center gap-2 py-2">
                    <span aria-hidden className={indexLabel}>
                      {pad(i + 1)}
                    </span>
                    <p className="font-inter text-[15px] leading-snug text-[#f0ece6] sm:text-[17px]">
                      {item.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </Reveal>

        {/* Jak to funguje: stejné 4 kroky jako 3D scéna v hero, se stejnými
            ikonami, na kartě jen první věta popisu. */}
        <Reveal className={sectionGap}>
          <section aria-labelledby="jak-to-funguje-nadpis" id="jak-to-funguje" className="scroll-mt-24">
            <SectionHead
              id="jak-to-funguje-nadpis"
              eyebrow="Jak to funguje"
              title="Čtyři kroky od vstupu po výsledek"
            />
            <ProcessSteps slug={page.slug} steps={page.how} />
          </section>
        </Reveal>

        {/* Interaktivní ukázka (konzole, chat, tok nebo telefon podle dat). */}
        {demo ? (
          <section aria-labelledby="ukazka-nadpis" id="ukazka" className={cn(sectionGap, "scroll-mt-24")}>
            <SectionHead
              id="ukazka-nadpis"
              eyebrow="Ukázka"
              title="Vyzkoušejte si to naživo"
              lead="Klikněte si a uvidíte, jak to vypadá v praxi."
            />
            <div className="max-w-5xl">{renderScene(demo)}</div>
          </section>
        ) : null}

        {/* Kde se to nejvíc vyplatí. Modelové situace, ne reference: žádná
            firma, žádná úspora v číslech. Na kartě jen první věta. */}
        <Reveal className={sectionGap}>
          <section aria-labelledby="kde-se-to-vyplati">
            <SectionHead id="kde-se-to-vyplati" eyebrow="Využití" title="Kde se to nejvíc vyplatí" />
            <div className={cn("grid grid-cols-1 gap-4 sm:grid-cols-2", useCaseCols)}>
              {page.useCases.map((useCase, i) => {
                const wide = page.useCases.length % 2 === 1 && i === page.useCases.length - 1;

                return (
                  <div
                    key={useCase.title}
                    className={cn(
                      "flex h-full flex-col overflow-hidden border border-white/[0.07] bg-[#0b0b0b] p-6",
                      wide && "sm:col-span-2 lg:col-span-1"
                    )}
                  >
                    <div className="-mx-6 -mt-6 mb-5 h-28 overflow-hidden border-b border-white/[0.06]">
                      <UseCaseArtwork id={`uc-${page.slug}-${i}`} glyph={useCase.glyph} />
                    </div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3 className="font-inter font-medium text-[17px] text-[#f0ece6]">{useCase.title}</h3>
                      <span aria-hidden className={indexLabel}>
                        {pad(i + 1)}
                      </span>
                    </div>
                    <p className="mt-3 font-inter text-[15px] leading-[1.6] text-text-secondary">
                      {firstSentence(useCase.text)}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Co získáte. Bento místo stejnoměrné mřížky, ilustrace
            v zapuštěném panelu. Karta není odkaz, nezvedá se; na najetí
            reaguje jen výsledek v ilustraci (`group` + `.benefit-lift`).

            ROZVRŽENÍ POČÍTÁ S PĚTI PŘÍNOSY (má je každá služba):
            lg 6 sloupců = hlavní karta 4 + jedna 2, pod nimi tři po 2;
            sm = hlavní přes oba sloupce, pod ní 2 × 2. Jiný počet nechá
            v posledním řádku mezeru, pak se musí přepočítat tady. */}
        <Reveal className={sectionGap}>
          <section aria-labelledby="co-ziskate">
            <SectionHead id="co-ziskate" eyebrow="Výsledek" title="Co získáte" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
              {page.benefits.map((benefit, i) => {
                const featured = i === 0;

                return (
                  <div
                    key={benefit.art}
                    className={cn(
                      "group flex flex-col border border-white/[0.07] bg-[#0b0b0b] p-2",
                      featured ? "sm:col-span-2 lg:col-span-4 lg:flex-row" : "lg:col-span-2"
                    )}
                  >
                    <div
                      className={
                        featured
                          ? "h-48 sm:h-56 lg:h-auto lg:min-h-60 lg:w-[58%] lg:shrink-0"
                          : "h-40"
                      }
                    >
                      <BenefitArtwork art={benefit.art} />
                    </div>
                    <div
                      className={cn(
                        "flex flex-1 flex-col justify-between gap-5 px-4 pb-4 pt-5",
                        featured && "lg:px-7 lg:py-7"
                      )}
                    >
                      <p
                        className={
                          featured
                            ? "font-cormorant font-light text-[24px] leading-[1.25] text-[#f0ece6] lg:text-[30px]"
                            : "font-inter text-[15px] leading-snug text-[#f0ece6]"
                        }
                      >
                        {benefit.text}
                      </p>
                      <span aria-hidden className={indexLabel}>
                        {pad(i + 1)} / {pad(page.benefits.length)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </Reveal>

        {/* Dva panely vedle sebe: komu se služba hodí a do čeho se napojí.
            Jedna věta a čipy, chybí-li čipy, zůstane jen věta. */}
        <div className={cn(sectionGap, "grid grid-cols-1 gap-4 lg:grid-cols-2")}>
          <Reveal className="h-full">
            <section
              aria-labelledby="pro-koho"
              className="flex h-full flex-col border border-white/[0.07] bg-[#0b0b0b] p-6 sm:p-8"
            >
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center border border-[#c9a84c]/35 bg-[#100e09] text-accent"
              >
                <TargetIcon className="h-5 w-5" />
              </span>
              <h2 id="pro-koho" className="mt-6 font-cormorant font-light text-[30px] leading-[1.1] text-[#f0ece6] md:text-[36px]">
                Pro koho to dává smysl
              </h2>
              <p className={cn(t.body, "mt-3")}>{firstSentence(page.whoItsFor.text)}</p>
              {page.whoItsFor.relatedIndustries.length > 0 ? (
                <div className="mt-auto pt-6">
                  <p className={panelLabel}>Nejčastěji se to hodí</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {page.whoItsFor.relatedIndustries.map((industry) => (
                      <LinkChip key={industry.href} href={industry.href}>
                        {industry.label}
                      </LinkChip>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          </Reveal>

          <Reveal className="h-full">
            <section
              aria-labelledby="co-propojime"
              className="flex h-full flex-col border border-white/[0.07] bg-[#0b0b0b] p-6 sm:p-8"
            >
              <span
                aria-hidden
                className="grid h-12 w-12 place-items-center border border-[#c9a84c]/35 bg-[#100e09] text-accent"
              >
                <LinkIcon className="h-5 w-5" />
              </span>
              <h2 id="co-propojime" className="mt-6 font-cormorant font-light text-[30px] leading-[1.1] text-[#f0ece6] md:text-[36px]">
                Co s tím propojíme
              </h2>
              <p className={cn(t.body, "mt-3")}>{firstSentence(page.whatWeConnect.text)}</p>
              {page.whatWeConnect.tools.length > 0 ? (
                <div className="mt-auto pt-6">
                  <p className={panelLabel}>Nejčastěji</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {page.whatWeConnect.tools.map((tool) => (
                      <ToolChip key={tool}>{tool}</ToolChip>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          </Reveal>
        </div>

        {/* Časté otázky jako akordeon (stejně jako hub). Odpověď je v DOM
            vždy, takže text sedí 1:1 s FAQPage v JSON-LD. */}
        <section aria-labelledby="caste-otazky" className={cn(sectionGap, "grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16")}>
          <div>
            <p className={cn(t.eyebrow, "mb-4")}>— Otázky</p>
            <h2 id="caste-otazky" className="font-cormorant font-light text-[34px] leading-[1.08] text-[#f0ece6] md:text-[52px]">
              Časté otázky
            </h2>
          </div>
          <AutomationFAQ
            items={page.miniFaq.map((item) => ({ question: item.q, answer: item.a }))}
            idPrefix={`faq-${page.slug}`}
          />
        </section>

        <Reveal className="mt-24 md:mt-32">
          <ClosingCTA
            heading="Zní to jako něco, co byste využili?"
            subheading="Projdeme spolu na nezávazné konzultaci váš konkrétní provoz a řekneme vám na rovinu, jestli se automatizace vyplatí."
          />

          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className={t.body}>
              Kolik to bude stát? Orientační ceny automatizací najdete{" "}
              <Link href="/sluzby#automatizace" className={t.link}>
                v ceníku
              </Link>
              .
            </p>
            <Link href="/automatizace" className={t.backLink}>
              ← Zpět na přehled automatizací
            </Link>
          </div>
        </Reveal>
      </div>
    </PageShell>
  );
}
