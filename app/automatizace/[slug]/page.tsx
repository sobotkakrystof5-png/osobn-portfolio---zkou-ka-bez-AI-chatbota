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
import { LinkIcon, TargetIcon } from "@/components/automation/process-icons";
import { automationPages, getAutomationPage } from "@/lib/data/automation-pages";
import { getServiceDemo, type ServiceDemo } from "@/lib/data/automation-demos";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Podstránka jedné ze 4 služeb sekce Automatizace. Port struktury
// alteno.cz/sluzby/[slug] v designu VIZEON (zadání:
// PROMPT-AUTOMATIZACE-PODSTRANKY.md). Pořadí sekcí nese argumentaci
// (co mě zdržuje → jak to funguje → kde se to hodí → co z toho mám →
// pojďme se bavit) a nepřehazuje se.
//
// ŽÁDNÁ CENA v žádné podobě. Typ `Service` pole pro cenu nemá; cenu řeší
// odkaz na /cena-tvorby-webu.
//
// Hero se NEBALÍ do fade-in: H1 a lead musí být v serverovém HTML viditelné
// hned (LCP, SEO). Scéna stojí hned pod hlavičkou, bez reveal. Sekce pod
// scénou se odhalují přes <Reveal> (klientský obal, text zůstává v SSR).
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

const indexLabel = "font-inter text-[11px] tracking-[0.1em] tabular-nums text-[#8a8070]";
const panelLabel = "font-inter text-[11px] uppercase tracking-[0.15em] text-[#8a8070]";
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
      <span aria-hidden className="text-[#8a8070]">
        →
      </span>
    </Link>
  );
}

/** Neodkazovaný štítek nástroje v panelu „Co s tím propojím". VIZEON nemá
 *  stránky nástrojů, takže čip jen pojmenovává. */
function ToolChip({ children }: { children: ReactNode }) {
  return (
    <span className={cn(chip, "border-white/[0.06] text-[#b8b0a2]")}>{children}</span>
  );
}

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

  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page={`/automatizace/${page.slug}`} />

      <div className={cn(t.container.wide, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        {/* Hero */}
        <div className="max-w-3xl">
          <Link href="/automatizace" className={t.backLink}>
            ← Zpět na přehled automatizací
          </Link>

          <div className="mt-8 mb-4 flex flex-wrap items-center gap-3">
            <p className={t.eyebrow}>— Automatizace by ALTENO</p>
            {page.comingSoon ? (
              <span className="font-inter font-medium text-[10px] tracking-[0.1em] uppercase px-2.5 py-[3px] text-[#c9a84c] border border-[rgba(201,168,76,0.4)]">
                Připravuji
              </span>
            ) : null}
          </div>

          <h1 className={cn(t.h1, "mb-6")}>{page.title}</h1>
          <p className={t.lead}>{page.lead}</p>
        </div>

        {/* Interaktivní scéna */}
        {demo ? (
          <div className="mt-10 sm:mt-12 max-w-5xl">{renderScene(demo)}</div>
        ) : null}

        <div className="mt-20 md:mt-28 max-w-5xl space-y-16 md:space-y-24">
          {/* Co vás dnes zdržuje. Vodorovná karta: ilustrace vlevo nese
              problém dřív, než se čte, věta vpravo ho jen pojmenuje. Karta
              není odkaz, nezvedá se; jen ohnisko ilustrace při najetí
              škubne (`group` + `.pain-jolt`). Na mobilu zůstává vodorovná
              s menším obrázkem. */}
          <Reveal>
            <section aria-labelledby="co-vas-zdrzuje">
              <h2 id="co-vas-zdrzuje" className={cn(t.h2Page, "mb-8")}>
                Co vás dnes zdržuje
              </h2>
              <ul className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                {page.pain.map((item, i) => (
                  <li
                    key={item.art}
                    className="group flex items-stretch gap-4 border border-white/[0.06] bg-[#080808] p-2 pr-5 sm:gap-6"
                  >
                    <div className="aspect-square w-28 shrink-0 sm:w-40">
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

          {/* Jak to funguje. Číslované kroky se svislou spojnicí, statické.
              Kolečko je na lince přesně: `pl-10` odsadí obsah 2,5rem od
              okraje, kolečko `h-8` (2rem) má střed na lince při `-left-14`
              (−3,5rem + 1rem = −2,5rem). Kolečko tím vyčnívá o 1rem vlevo od
              seznamu; na mobilu by sahalo do okraje kontejneru, proto tam
              `ml-4` (od `sm` jako v předloze bez posunu). */}
          <Reveal className="max-w-3xl">
            <section aria-labelledby="jak-to-funguje">
              <h2 id="jak-to-funguje" className={cn(t.h2Page, "mb-8")}>
                Jak to funguje
              </h2>
              <ol className="relative ml-4 sm:ml-0 space-y-8 border-l border-white/[0.08] pl-10">
                {page.how.map((step, i) => (
                  <li key={step.title} className="relative">
                    <span
                      aria-hidden
                      className="absolute -left-14 top-0 flex h-8 w-8 items-center justify-center rounded-full border border-accent/40 bg-[#080808] font-inter text-xs text-accent"
                    >
                      {i + 1}
                    </span>
                    <h3 className="font-inter font-medium text-[16px] leading-8 text-[#f0ece6]">
                      {step.title}
                    </h3>
                    <p className={cn(t.body, "mt-1")}>{step.text}</p>
                  </li>
                ))}
              </ol>
            </section>
          </Reveal>

          {/* Dva panely vedle sebe: komu se služba hodí a do čeho se napojí.
              Chybí-li k panelu čipy, zůstane jen s textem a mřížka ho
              vytáhne na výšku souseda. */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Reveal className="h-full">
              <section
                aria-labelledby="pro-koho"
                className="flex h-full flex-col border border-white/[0.06] bg-[#080808] p-6 sm:p-8"
              >
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center border border-white/[0.08] bg-[#0e0e0e] text-accent"
                >
                  <TargetIcon className="h-5 w-5" />
                </span>
                <h2 id="pro-koho" className={cn(t.h2Page, "mt-5 text-[24px] md:text-[28px]")}>
                  Pro koho to dává smysl
                </h2>
                <p className={cn(t.body, "mt-3")}>{page.whoItsFor.text}</p>
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
                aria-labelledby="co-propojim"
                className="flex h-full flex-col border border-white/[0.06] bg-[#080808] p-6 sm:p-8"
              >
                <span
                  aria-hidden
                  className="grid h-10 w-10 place-items-center border border-white/[0.08] bg-[#0e0e0e] text-accent"
                >
                  <LinkIcon className="h-5 w-5" />
                </span>
                <h2 id="co-propojim" className={cn(t.h2Page, "mt-5 text-[24px] md:text-[28px]")}>
                  Co s tím propojím
                </h2>
                <p className={cn(t.body, "mt-3")}>{page.whatWeConnect.text}</p>
                {page.whatWeConnect.tools.length > 0 ? (
                  <div className="mt-auto pt-6">
                    <p className={panelLabel}>Konkrétně jde nejčastěji o</p>
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

          {/* Kde se to nejvíc vyplatí. Modelové situace, ne reference: žádná
              firma, žádná úspora v číslech. Karta není odkaz (data nemají
              `href`), proto bez hoveru. Lichý poslední příklad bere celý
              řádek; pás grafiky to unese, viz UseCaseArtwork. */}
          <Reveal>
            <section aria-labelledby="kde-se-to-vyplati">
              <h2 id="kde-se-to-vyplati" className={cn(t.h2Page, "mb-8")}>
                Kde se to nejvíc vyplatí
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {page.useCases.map((useCase, i) => {
                  const wide =
                    page.useCases.length % 2 === 1 && i === page.useCases.length - 1;

                  return (
                    <div
                      key={useCase.title}
                      className={cn(
                        "glass-panel flex h-full flex-col overflow-hidden p-6",
                        wide && "sm:col-span-2"
                      )}
                    >
                      <div className="-mx-6 -mt-6 mb-5 h-28 overflow-hidden border-b border-white/[0.06]">
                        <UseCaseArtwork id={`uc-${page.slug}-${i}`} glyph={useCase.glyph} />
                      </div>
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 className="font-inter font-medium text-[16px] text-[#f0ece6]">
                          {useCase.title}
                        </h3>
                        <span aria-hidden className={indexLabel}>
                          {pad(i + 1)}
                        </span>
                      </div>
                      <p className={cn(t.body, "mt-4 border-t border-white/[0.06] pt-4")}>
                        {useCase.text}
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
          <Reveal>
            <section aria-labelledby="co-ziskate">
              <h2 id="co-ziskate" className={cn(t.h2Page, "mb-8")}>
                Co získáte
              </h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
                {page.benefits.map((benefit, i) => {
                  const featured = i === 0;

                  return (
                    <div
                      key={benefit.art}
                      className={cn(
                        "group flex flex-col border border-white/[0.06] bg-[#080808] p-2",
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

          {/* Časté otázky. Statické h3/p, ne accordion: text je vidět bez
              klikání a sedí 1:1 s FAQPage v JSON-LD. */}
          <Reveal className="max-w-3xl">
            <section aria-labelledby="caste-otazky">
              <h2 id="caste-otazky" className={cn(t.h2Page, "mb-8")}>
                Časté otázky
              </h2>
              <div className="space-y-8">
                {page.miniFaq.map((item) => (
                  <div key={item.q}>
                    <h3 className="font-inter font-medium text-[16px] text-[#f0ece6]">
                      {item.q}
                    </h3>
                    <p className={cn(t.body, "mt-2")}>{item.a}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        </div>

        <Reveal className="max-w-5xl">
          <ClosingCTA
            heading="Zní to jako něco, co byste využili?"
            subheading="Projdeme spolu na nezávazné konzultaci váš konkrétní provoz a řeknu vám na rovinu, jestli se automatizace vyplatí."
          />

          <div className="mt-10 flex flex-col items-center gap-3 text-center">
            <p className={t.body}>
              Kolik to bude stát? Orientační ceny automatizací najdete{" "}
              <Link href="/cena-tvorby-webu" className={t.link}>
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
