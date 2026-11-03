import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  ChevronRight,
  Code2,
  KeyRound,
  PenLine,
  Phone,
  Plus,
  Receipt,
  Rocket,
  Ruler,
} from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { CTAButton } from "@/components/CTAButton";
import { PriceLabel } from "@/components/PriceLabel";
import { brandText } from "@/components/brand/BrandName";
import { ProjectStage } from "@/components/portfolio/ProjectStage";
import { ScrollScreen } from "@/components/portfolio/ScrollScreen";
import { WEB_PACKAGES } from "@/components/services/WebPackages";
import { WebIllustration } from "@/components/services/WebIllustrations";
import { JourneyPhone } from "@/components/industry/JourneyPhone";
import { ShiftList } from "@/components/industry/ShiftList";
import { SearchPanel } from "@/components/industry/SearchPanel";
import { RevealGroup, RevealItem } from "@/components/industry/Motion";
import { heroIn } from "@/lib/animations";
import { INDUSTRY_PAGES, type IndustryPage } from "@/lib/data/industry-pages";
import { projects, projectScreens } from "@/lib/data/portfolio";
import { testimonials } from "@/lib/data/testimonials";
import { PRICE_BY_NAME } from "@/lib/data/pricing";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Šablona oborové stránky (app/web-pro-*). Obsah je v lib/data/industry-pages,
// stránka ho jen skládá do sekcí v pořadí argumentu:
//   1. hero s telefonem, ve kterém zákazník najde web oboru a pošle poptávku
//   2. kde dnes obor přichází o zakázky × co s tím udělá web
//   3. co web pro obor umí (bento, první dlaždice nese „vždy v ceně“)
//   4. na co zákazníci oboru hledají (SEO, našeptávač s frázemi)
//   5. reálný projekt z oboru nebo příbuzného oboru, s ohlasem klienta
//   6. kolik to stojí (Promo Page × Pro Web, doporučená varianta svítí)
//   7. jak to proběhne, 8. časté otázky, 9. závěrečná výzva a další obory
// Klíčová slova: title „Webové stránky pro …“, H1 „Web pro …“, H2 „Kolik stojí
// web pro …“ a FAQ s otázkami, které lidé píšou do vyhledávače.

const BASE = "https://vizeon.cz";
const HUB = { href: "/tvorba-webu-pro-zivnostniky", label: "Weby pro živnostníky" };

const PACKAGES = (["Promo Page", "Pro Web"] as const).map((name) => WEB_PACKAGES.find((p) => p.name === name)!);

const GUARANTEES = [
  { icon: Receipt, title: "Cena předem", text: "Bez vašeho souhlasu se nezmění." },
  { icon: CalendarCheck, title: "Termín předem", text: "Víte, kdy bude web hotový." },
  { icon: PenLine, title: "Ladíme do schválení", text: "Spustíme, až je podle vás." },
  { icon: KeyRound, title: "Web je váš", text: "Doména i přístupy patří vám." },
];

const STEPS = [
  { icon: Phone, title: "Konzultace zdarma", text: "Zjistíme, co váš podnik a zákazníci potřebují." },
  { icon: Ruler, title: "Návrh na míru", text: "Žádná šablona. Návrh doladíme společně." },
  { icon: Code2, title: "Tvorba webu", text: "Rozpracovaný web vidíte průběžně naživo." },
  { icon: Rocket, title: "Spuštění a předání", text: "Web spustíme a předáme vám přístupy." },
];

const ALWAYS_INCLUDED = [
  "Vyladěno na mobil",
  "Základ SEO pro Google i Seznam",
  "Rychlé načítání",
  "Poptávkový formulář",
];

/** „od 9 999 Kč“ → 9999 pro strukturovaná data. */
function minPrice(price: string) {
  const match = price.match(/(\d[\d\s]*)\s*Kč/);
  return match ? Number(match[1].replace(/\s/g, "")) : undefined;
}

/** Časté otázky: cena a termín jsou u všech oborů stejné, mezi nimi otázky oboru. */
function faqsFor(page: IndustryPage) {
  return [
    {
      q: `Kolik stojí web pro ${page.forWhom}?`,
      a: `${page.plan.reason} Promo Page stojí ${PRICE_BY_NAME["Promo Page"]}, Pro Web ${PRICE_BY_NAME["Pro Web"]}. Cenu znáte předem a bez vašeho souhlasu se nezmění.`,
    },
    ...page.faqs,
    {
      q: "Jak dlouho tvorba webu trvá?",
      a: "Promo Page je hotová do 10 pracovních dní, Pro Web do 3 týdnů. Přesný termín znáte předem, ještě než začneme.",
    },
  ];
}

export function industryMetadata(page: IndustryPage): Metadata {
  const url = `${BASE}/${page.slug}`;
  return {
    title: page.meta.title,
    description: page.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${page.meta.title} | VIZEON`,
      description: page.meta.description,
      url,
      type: "website",
    },
  };
}

function jsonLdFor(page: IndustryPage, faqs: { q: string; a: string }[]) {
  const url = `${BASE}/${page.slug}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domů", item: BASE },
          { "@type": "ListItem", position: 2, name: "Tvorba webu pro živnostníky", item: `${BASE}${HUB.href}` },
          { "@type": "ListItem", position: 3, name: `Web pro ${page.forWhom}`, item: url },
        ],
      },
      {
        "@type": "Service",
        serviceType: page.serviceType,
        name: `Web pro ${page.forWhom}`,
        description: page.meta.description,
        url,
        provider: { "@type": "ProfessionalService", name: "VIZEON", url: BASE },
        areaServed: { "@type": "Country", name: "Česká republika" },
        audience: { "@type": "BusinessAudience", name: page.name },
        offers: PACKAGES.map((pkg) => ({
          "@type": "Offer",
          name: pkg.name,
          description: pkg.desc,
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: minPrice(PRICE_BY_NAME[pkg.name]),
            priceCurrency: "CZK",
          },
        })),
      },
      {
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };
}

const h2 = "font-cormorant font-light text-[34px] leading-[1.08] text-[#f0ece6] md:text-[46px]";
const sectionY = "py-24 md:py-36";

export function IndustryLanding({ page }: { page: IndustryPage }) {
  const faqs = faqsFor(page);
  const plan = WEB_PACKAGES.find((p) => p.name === page.plan.name)!;
  const days = plan.delivery.replace("Hotovo ", "");
  const project = projects.find((p) => p.slug === page.project.slug);
  const screens = project ? projectScreens(project) : null;
  const testimonial = project
    ? testimonials.find((x) => x.url.replace(/\/$/, "") === project.url.replace(/\/$/, ""))
    : undefined;
  const [lead, ...features] = page.features;
  const others = [
    ...page.related,
    ...INDUSTRY_PAGES.map((p) => p.slug).filter((s) => s !== page.slug && !page.related.includes(s)),
  ]
    .map((slug) => INDUSTRY_PAGES.find((p) => p.slug === slug)!)
    .filter(Boolean);

  return (
    <PageShell jsonLd={jsonLdFor(page, faqs)}>
      <AnalyticsTracker page={`/${page.slug}`} />

      {/* ─── 1. Hero ─────────────────────────────────── */}
      <section aria-labelledby="hero-h1" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-[20%] top-[-10%] h-[680px] w-[680px] rounded-full bg-[#c9a84c]/[0.06] blur-[120px]"
          aria-hidden="true"
        />
        <div className={cn(t.container.wide, "relative grid items-center gap-16 pb-24 pt-28 md:pt-36 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10 lg:pb-32")}>
          {/* Hero se animuje v CSS (.hero-in), ne přes RevealGroup: H1 a úvodní
              text jsou LCP prvky a s framer-motion se na mobilu ukázaly až po
              hydrataci JS. Zpoždění odpovídají dřívějšímu staggeru 40 + 80 ms. */}
          <div>
            <div className="hero-in" style={heroIn(40)}>
              <nav aria-label="Drobečková navigace" className="mb-8">
                <ol className="flex flex-wrap items-center gap-1.5 font-inter text-[14px] text-text-muted">
                  <li>
                    <Link href="/" className="transition-colors duration-300 hover:text-[#f0ece6]">Domů</Link>
                  </li>
                  <li aria-hidden="true"><ChevronRight size={13} /></li>
                  <li>
                    <Link href={HUB.href} className="transition-colors duration-300 hover:text-[#f0ece6]">{HUB.label}</Link>
                  </li>
                  <li aria-hidden="true"><ChevronRight size={13} /></li>
                  <li aria-current="page" className="text-text-secondary">{page.name}</li>
                </ol>
              </nav>
            </div>
            <div className="hero-in" style={heroIn(120)}>
              <h1
                id="hero-h1"
                className="max-w-[17ch] font-cormorant font-light text-[40px] leading-[1.04] tracking-[-0.01em] text-[#f0ece6] sm:text-[52px] lg:text-[60px] xl:text-[66px]"
              >
                {page.h1.lead} <span className="text-shimmer">{page.h1.accent}</span>
              </h1>
            </div>
            <div className="hero-in" style={heroIn(200)}>
              <p className={cn(t.lead, "mt-7 max-w-xl text-[#d6cebf]")}>{page.intro}</p>
            </div>
            <div className="hero-in mt-10 flex flex-col gap-3 sm:flex-row" style={heroIn(280)}>
              <CTAButton className="glow-pulse inline-flex items-center justify-center gap-2 bg-[#c9a84c] px-8 py-4 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968] active:scale-[0.98]">
                Nezávazná konzultace
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </CTAButton>
              <a
                href="#cena"
                className="inline-flex items-center justify-center border border-white/15 px-8 py-4 font-inter text-[14px] font-medium uppercase tracking-[0.1em] text-[#f0ece6] transition-colors duration-300 hover:border-[#c9a84c]/50 hover:bg-white/[0.04]"
              >
                Kolik to stojí
              </a>
            </div>
            <div className="hero-in" style={heroIn(360)}>
              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 font-inter text-[15px] text-text-secondary">
                {[`${plan.name} ${PRICE_BY_NAME[plan.name]}`, plan.delivery, "Na Googlu i Seznamu"].map((fact) => (
                  <li key={fact} className="flex items-center gap-2">
                    <Check size={16} strokeWidth={2.6} className="text-[#c9a84c]" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hero-in" style={heroIn(40)}>
            <JourneyPhone scene={page.scene} />
          </div>
        </div>
      </section>

      {/* ─── 2. Dnes × s webem ─────────────────────────── */}
      <section aria-labelledby="dnes" className={cn(t.container.wide, sectionY, "pt-8 md:pt-12")}>
        <div className="grid gap-12 lg:grid-cols-[0.75fr_1.6fr] lg:gap-16">
          <RevealGroup className="lg:sticky lg:top-32 lg:self-start">
            <RevealItem>
              <h2 id="dnes" className={h2}>{page.shiftsHeading ?? "Kde dnes přicházíte o zakázky"}</h2>
            </RevealItem>
            <RevealItem>
              <p className={cn(t.body, "mt-5 max-w-sm")}>
                Tři místa, kde web pro {page.forWhom} udělá největší rozdíl.
              </p>
            </RevealItem>
          </RevealGroup>
          <ShiftList shifts={page.shifts} />
        </div>
      </section>

      {/* ─── 3. Co web umí ─────────────────────────────── */}
      <section aria-labelledby="funkce" className={cn("bg-[#0c0c0c]", sectionY)}>
        <div className={t.container.wide}>
          <RevealGroup className="mb-12 max-w-2xl md:mb-16">
            <RevealItem>
              <h2 id="funkce" className={h2}>Co bude umět váš web pro {page.forWhom}</h2>
            </RevealItem>
            <RevealItem>
              <p className={cn(t.lead, "mt-5")}>Postavíme ho kolem toho, jak se vaši zákazníci rozhodují.</p>
            </RevealItem>
          </RevealGroup>

          <RevealGroup as="ul" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:grid-rows-2">
            <RevealItem
              as="li"
              className="group relative flex flex-col overflow-hidden border border-[#c9a84c]/30 bg-[#14110a] p-8 transition-colors duration-500 hover:border-[#c9a84c]/60 md:col-span-2 lg:col-span-1 lg:row-span-2 lg:p-10"
            >
              <span className="card-shimmer-line absolute inset-x-0 top-0 h-px" aria-hidden="true" />
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#c9a84c] text-[#080808] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-105">
                <lead.icon size={26} strokeWidth={1.8} aria-hidden="true" />
              </span>
              <h3 className="mt-8 font-cormorant text-[34px] font-normal leading-[1.1] text-[#f6f2ea]">{lead.title}</h3>
              <p className="mt-3 font-inter text-[17px] leading-[1.65] text-[#d6cebf]">{lead.text}</p>
              <div className="mt-auto pt-10">
                <p className="font-inter text-[13px] font-medium uppercase tracking-[0.14em] text-[#e3c878]">Vždy v ceně</p>
                <ul className="mt-4 space-y-2.5">
                  {ALWAYS_INCLUDED.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 font-inter text-[15px] text-[#e8e1d4]">
                      <Check size={15} strokeWidth={2.8} className="shrink-0 text-[#c9a84c]" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>

            {features.map((feature) => (
              <RevealItem
                key={feature.title}
                as="li"
                className="group relative flex gap-4 overflow-hidden border border-white/[0.07] bg-[#101010] p-5 transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-[#c9a84c]/35 md:block md:p-7"
              >
                <span className="card-shimmer-line absolute inset-x-0 top-0 h-px" aria-hidden="true" />
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a84c]/35 bg-[#c9a84c]/[0.08] text-[#c9a84c] transition-colors duration-500 group-hover:bg-[#c9a84c] group-hover:text-[#080808]">
                  <feature.icon size={20} strokeWidth={1.8} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="font-inter text-[18px] font-semibold leading-snug text-[#f6f2ea] md:mt-6 md:text-[19px]">{feature.title}</h3>
                  <p className="mt-1.5 font-inter text-[16px] leading-[1.6] text-text-secondary md:mt-2">{feature.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Rozcestník řemesel (jen /web-pro-remeslniky) */}
      {page.crafts && (
        <section aria-labelledby="remesla" className={cn(t.container.wide, "pt-24 md:pt-36")}>
          <RevealGroup className="mb-12 max-w-2xl">
            <RevealItem>
              <h2 id="remesla" className={h2}>Web pro vaše řemeslo</h2>
            </RevealItem>
            <RevealItem>
              <p className={cn(t.lead, "mt-5")}>Každé řemeslo prodává něco jiného. Vyberte to své.</p>
            </RevealItem>
          </RevealGroup>
          <RevealGroup as="ul" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {page.crafts.map((craft) => (
              <RevealItem as="li" key={craft.href}>
                <Link
                  href={craft.href}
                  className="group flex h-full flex-col border border-white/[0.07] bg-[#0e0e0e] p-5 transition-colors duration-300 hover:border-[#c9a84c]/40"
                >
                  <span className="font-inter text-[16px] font-semibold text-[#f0ece6]">{craft.name}</span>
                  <span className="mt-1.5 font-inter text-[14px] leading-[1.55] text-text-secondary">{craft.text}</span>
                  <span className="mt-auto flex items-center gap-1.5 pt-4 font-inter text-[13px] text-[#c9a84c]">
                    {craft.anchor}
                    <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </RevealItem>
            ))}
          </RevealGroup>
        </section>
      )}

      {/* ─── 4. Vyhledávání ─────────────────────────────── */}
      <section aria-labelledby="hledani" className={cn(t.container.wide, sectionY)}>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <RevealGroup>
            <RevealItem>
              <h2 id="hledani" className={h2}>Najdou vás tam, kde vás hledají</h2>
            </RevealItem>
            <RevealItem>
              <p className={cn(t.lead, "mt-5")}>
                Zákazník nehledá „web“. Hledá „{page.searches[0]}“. Proto web pro {page.forWhom} stavíme na
                frázích, které lidé opravdu píšou do Googlu a Seznamu.
              </p>
            </RevealItem>
            <RevealItem>
              <ul className="mt-8 space-y-3">
                {[
                  "Nadpisy a texty podle hledaných frází",
                  "Strukturovaná data, kterým vyhledávače rozumí",
                  "Rychlé načítání, které vyhledávače odměňují",
                  "Připraveno na lokální hledání a mapy",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-inter text-[17px] text-[#e8e1d4]">
                    <Check size={18} strokeWidth={2.6} className="mt-0.5 shrink-0 text-[#c9a84c]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
            {page.links && page.links.length > 0 && (
              <RevealItem>
                <ul className="mt-9 space-y-2">
                  {page.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1.5 font-inter text-[15px] text-[#c9a84c] transition-colors duration-300 hover:text-[#e3c878]"
                      >
                        {link.label}
                        <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </RevealItem>
            )}
          </RevealGroup>
          <RevealGroup>
            <RevealItem>
              <SearchPanel searches={page.searches} />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      {/* ─── 5. Projekt z praxe ─────────────────────────── */}
      {project && screens && (
        <section aria-labelledby="praxe" className={cn("bg-[#0c0c0c]", sectionY)}>
          <div className={cn(t.container.wide, "grid items-center gap-14 lg:grid-cols-[1.2fr_1fr] lg:gap-16")}>
            <RevealGroup className="group lg:order-2">
              <RevealItem>
                <p className="font-inter text-[15px] text-[#e3c878]">
                  {page.project.fit === "same" ? "Web z vašeho oboru" : "Web z příbuzného oboru"}
                </p>
              </RevealItem>
              <RevealItem>
                <h2 id="praxe" className={cn(h2, "mt-3")}>{project.title}</h2>
              </RevealItem>
              <RevealItem>
                <p className={cn(t.lead, "mt-4")}>{project.tagline}</p>
              </RevealItem>
              <RevealItem>
                <ul className="mt-7 space-y-2.5">
                  {project.highlights.slice(0, 3).map((item) => (
                    <li key={item} className="flex items-start gap-3 font-inter text-[16px] leading-[1.55] text-[#e8e1d4]">
                      <Check size={17} strokeWidth={2.6} className="mt-0.5 shrink-0 text-[#c9a84c]" aria-hidden="true" />
                      {item.replace(" — ", ": ")}
                    </li>
                  ))}
                </ul>
              </RevealItem>
              {testimonial && (
                <RevealItem>
                  <figure className="mt-9 border-l-2 border-[#c9a84c] pl-6">
                    <blockquote className="font-cormorant text-[22px] leading-[1.4] text-[#f0ece6] md:text-[24px]">
                      „{brandText(testimonial.excerpt ?? testimonial.quote, "cormorant")}“
                    </blockquote>
                    <figcaption className="mt-3 font-inter text-[14px] text-text-secondary">{testimonial.name}</figcaption>
                  </figure>
                </RevealItem>
              )}
              <RevealItem className="mt-9 flex flex-wrap gap-x-7 gap-y-3">
                <Link
                  href={`/ukazky-webu/${project.slug}`}
                  className="group inline-flex items-center gap-2 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] text-[#c9a84c] transition-colors duration-300 hover:text-[#e3c878]"
                >
                  Celá ukázka projektu
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </Link>
                <Link
                  href="/ukazky-webu"
                  className="font-inter text-[14px] font-medium uppercase tracking-[0.1em] text-text-secondary transition-colors duration-300 hover:text-[#f0ece6]"
                >
                  Všechny projekty
                </Link>
              </RevealItem>
            </RevealGroup>

            <RevealGroup className="group lg:order-1">
              <RevealItem>
                <ProjectStage
                  project={project}
                  screens={screens}
                  variant="feature"
                  desktopScreen={
                    screens.full && (
                      <ScrollScreen
                        fold={screens.desktop}
                        full={screens.full}
                        alt={project.alt}
                        sizes="(min-width: 1024px) 600px, 85vw"
                      />
                    )
                  }
                />
                <p className="mt-3 font-inter text-[13px] text-text-muted">Najeďte myší na obrazovku a projeďte celý web.</p>
              </RevealItem>
            </RevealGroup>
          </div>
        </section>
      )}

      {/* ─── 6. Cena ─────────────────────────────────── */}
      <section id="cena" aria-labelledby="cena-h" className={cn(t.container.wide, sectionY, "scroll-mt-20")}>
        <RevealGroup className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <RevealItem>
            <h2 id="cena-h" className={h2}>Kolik stojí web pro {page.forWhom}</h2>
          </RevealItem>
          <RevealItem>
            <p className={cn(t.lead, "mt-5")}>{page.plan.reason}</p>
          </RevealItem>
        </RevealGroup>

        <RevealGroup as="ul" className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 md:gap-6">
          {PACKAGES.map((pkg) => {
            const featured = pkg.name === page.plan.name;
            return (
              <RevealItem
                as="li"
                key={pkg.name}
                className={cn(
                  "group relative flex flex-col border bg-[#0b0b0b] px-7 pb-9 pt-10 transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 md:px-9",
                  featured
                    ? "order-first border-[#c9a84c]/50 shadow-[0_0_70px_-20px_rgba(201,168,76,0.45)] md:order-none"
                    : "border-white/[0.08] hover:border-[#c9a84c]/30"
                )}
              >
                {featured && (
                  <span className="absolute left-7 top-0 -translate-y-1/2 bg-[#c9a84c] px-3.5 py-1.5 font-inter text-[12px] font-semibold uppercase tracking-[0.12em] text-[#080808] md:left-9">
                    Doporučujeme pro {page.forWhom}
                  </span>
                )}
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="font-inter text-[13px] font-medium uppercase tracking-[0.14em] text-[#c9a84c]">{pkg.kind}</p>
                    <h3 className="mt-3 font-cormorant text-[38px] font-light leading-none text-[#f0ece6]">{pkg.name}</h3>
                  </div>
                  <span className="relative block w-[92px] shrink-0" aria-hidden="true">
                    <WebIllustration
                      kind={pkg.illustration}
                      className="h-auto w-full text-[#c9a84c] transition-transform duration-500 group-hover:-translate-y-1"
                    />
                  </span>
                </div>
                <p className="mt-5 font-inter text-[16px] leading-[1.7] text-text-secondary">{pkg.desc}</p>
                <ul className="mt-6 space-y-2" aria-label={`Co obsahuje ${pkg.name}`}>
                  {pkg.tags.map((tag) => (
                    <li key={tag} className="flex items-center gap-2.5 font-inter text-[15px] text-[#e8e1d4]">
                      <Check size={15} strokeWidth={2.8} className="shrink-0 text-[#c9a84c]" aria-hidden="true" />
                      {tag}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-9">
                  <p className="font-cormorant text-[44px] font-light leading-none lining-nums text-[#f0ece6]">
                    <PriceLabel price={PRICE_BY_NAME[pkg.name]} />
                  </p>
                  <p className="mt-2 font-inter text-[13px] uppercase tracking-[0.12em] text-text-muted">{pkg.delivery}</p>
                  <CTAButton
                    className={cn(
                      "mt-7 flex w-full items-center justify-center gap-2 px-6 py-4 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] transition-colors duration-300",
                      featured
                        ? "bg-[#c9a84c] text-[#080808] hover:bg-[#d4b968]"
                        : "border border-white/15 text-[#f0ece6] hover:border-[#c9a84c]/50 hover:bg-white/[0.04]"
                    )}
                  >
                    Chci {pkg.name}
                    <ArrowRight size={16} aria-hidden="true" />
                  </CTAButton>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <RevealGroup as="ul" className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
          {GUARANTEES.map((g) => (
            <RevealItem as="li" key={g.title} className="flex items-start gap-3">
              <g.icon size={20} strokeWidth={1.7} className="mt-0.5 shrink-0 text-[#c9a84c]" aria-hidden="true" />
              <span>
                <span className="block font-inter text-[15px] font-semibold text-[#f0ece6]">{g.title}</span>
                <span className="mt-0.5 block font-inter text-[14px] leading-snug text-text-secondary">{g.text}</span>
              </span>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className={cn(t.body, "mx-auto mt-12 max-w-2xl text-center")}>
          Stačí vám rychlá stránka na jeden účel? Je tu{" "}
          <Link href="/sluzby/tvorba-webovych-stranek" className={t.link}>Micro Page {PRICE_BY_NAME["Micro Page"]}</Link>.
          Co je v ceně, najdete v <Link href="/cena-tvorby-webu" className={t.link}>ceníku webů</Link>.
        </p>
      </section>

      {/* ─── 7. Jak to proběhne ─────────────────────────── */}
      <section aria-labelledby="postup" className={cn("bg-[#0c0c0c]", sectionY)}>
        <div className={t.container.wide}>
          <RevealGroup className="mb-14 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <RevealItem>
              <h2 id="postup" className={cn(h2, "max-w-xl")}>Od první zprávy po spuštění</h2>
            </RevealItem>
            <RevealItem>
              <Link
                href="/spoluprace"
                className="group inline-flex items-center gap-1.5 font-inter text-[15px] text-[#c9a84c] transition-colors duration-300 hover:text-[#e3c878]"
              >
                Spolupráce podrobně
                <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </RevealItem>
          </RevealGroup>
          <RevealGroup as="ol" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step, i) => (
              <RevealItem
                as="li"
                key={step.title}
                className="group relative border-t-2 border-white/[0.08] pt-7 transition-colors duration-500 hover:border-[#c9a84c]"
              >
                <span className="absolute -top-[2px] left-0 h-[2px] w-0 bg-[#c9a84c] transition-[width] duration-700 group-hover:w-full" aria-hidden="true" />
                <span className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a84c]/35 text-[#c9a84c]">
                    <step.icon size={19} strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <span className="font-inter text-[13px] text-text-muted">{i === STEPS.length - 1 ? days : null}</span>
                </span>
                <h3 className="mt-6 font-inter text-[19px] font-semibold text-[#f6f2ea]">{step.title}</h3>
                <p className="mt-2 font-inter text-[16px] leading-[1.6] text-text-secondary">{step.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─── 8. Časté otázky ─────────────────────────────── */}
      <section aria-labelledby="faq" className={cn(t.container.wide, sectionY)}>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.4fr] lg:gap-20">
          <RevealGroup className="lg:sticky lg:top-32 lg:self-start">
            <RevealItem>
              <h2 id="faq" className={h2}>Časté otázky k webu pro {page.forWhom}</h2>
            </RevealItem>
            <RevealItem>
              <p className={cn(t.body, "mt-5")}>
                Nenašli jste odpověď? Napište nám, ozveme se do hodiny.
              </p>
            </RevealItem>
            <RevealItem>
              <CTAButton className="mt-7 inline-flex items-center gap-2 border border-white/15 px-6 py-3.5 font-inter text-[13px] font-medium uppercase tracking-[0.1em] text-[#f0ece6] transition-colors duration-300 hover:border-[#c9a84c]/50 hover:bg-white/[0.04]">
                Zeptat se nás
                <ArrowRight size={15} aria-hidden="true" />
              </CTAButton>
            </RevealItem>
          </RevealGroup>
          <RevealGroup>
            {faqs.map((faq, i) => (
              <RevealItem key={faq.q}>
                <details open={i === 0} className="group border-b border-white/[0.08]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 font-inter text-[18px] font-medium leading-snug text-[#f0ece6] transition-colors duration-300 hover:text-[#e3c878] md:text-[19px] [&::-webkit-details-marker]:hidden">
                    {faq.q}
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#c9a84c] transition-[transform,background-color] duration-300 group-open:rotate-45 group-open:bg-[#c9a84c]/10">
                      <Plus size={17} aria-hidden="true" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 pr-12 font-inter text-[16px] leading-[1.75] text-text-secondary md:text-[17px]">{faq.a}</p>
                </details>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ─── 9. Závěr ───────────────────────────────── */}
      <section aria-labelledby="zaver" className={cn(t.container.wide, "pb-24 md:pb-32")}>
        <RevealGroup className="relative overflow-hidden border border-[#c9a84c]/30 bg-[#100d08] px-6 py-16 text-center md:px-16 md:py-24">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(201,168,76,0.18),transparent_75%)]"
            aria-hidden="true"
          />
          <RevealItem>
            <h2 id="zaver" className="relative mx-auto max-w-3xl font-cormorant text-[36px] font-light leading-[1.08] text-[#f6f2ea] md:text-[54px]">
              Web pro {page.forWhom} může být hotový {days}.
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="relative mx-auto mt-5 max-w-xl font-inter text-[17px] leading-[1.7] text-[#d6cebf]">
              Nezávazná konzultace zdarma. Ozveme se do hodiny a navrhneme dva termíny hovoru.
            </p>
          </RevealItem>
          <RevealItem className="relative mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CTAButton className="glow-pulse inline-flex items-center gap-2 bg-[#c9a84c] px-9 py-4 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968] active:scale-[0.98]">
              Nezávazná konzultace zdarma
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </CTAButton>
            <Link
              href="/ukazky-webu"
              className="inline-flex items-center border border-white/15 px-9 py-4 font-inter text-[14px] font-medium uppercase tracking-[0.1em] text-[#f0ece6] transition-colors duration-300 hover:border-[#c9a84c]/50 hover:bg-white/[0.04]"
            >
              Ukázky webů
            </Link>
          </RevealItem>
        </RevealGroup>

        <nav aria-labelledby="obory" className="mt-20">
          <h2 id="obory" className="font-inter text-[17px] font-semibold text-[#f0ece6]">Weby pro další obory</h2>
          <ul className="mt-5 flex flex-wrap gap-2">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/${other.slug}`}
                  className="group inline-flex items-center gap-1.5 border border-white/[0.08] px-3.5 py-2 font-inter text-[14px] text-text-secondary transition-colors duration-300 hover:border-[#c9a84c]/40 hover:text-[#f0ece6]"
                >
                  Web pro {other.forWhom}
                  <ArrowUpRight size={13} strokeWidth={1.6} className="text-text-muted transition-colors duration-300 group-hover:text-[#c9a84c]" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <Link href={HUB.href} className={cn(t.backLink, "mt-10 inline-block")}>
            ← Tvorba webu pro živnostníky
          </Link>
        </nav>
      </section>
    </PageShell>
  );
}
