import Link from "next/link";
import {
  ArrowRight,
  Archive,
  CalendarCheck,
  Check,
  Code2,
  Gauge,
  HeartHandshake,
  ListChecks,
  Mail,
  MapPin,
  MonitorSmartphone,
  QrCode,
  ShieldCheck,
  Stamp,
  TrendingUp,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import AutomationFAQ from "@/components/AutomationFAQ";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/automation/Reveal";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import { Vizeon } from "@/components/brand/BrandName";
import { ZakazIqCalendarDemo } from "@/components/zakaziq/ZakazIqCalendarDemo";
import { ZakazIqMark, zakaziqWordmark } from "@/components/zakaziq/ZakazIqMark";
import { ZakazIqModules } from "@/components/zakaziq/ZakazIqModules";
import { ZakazIqFlow, ZakazIqOrigin, ZakazIqOverviews } from "@/components/zakaziq/ZakazIqOwnStory";
import { ZakazIqStickyCta } from "@/components/zakaziq/ZakazIqStickyCta";
import { ZakazIqSteps } from "@/components/zakaziq/ZakazIqSteps";
import { ZakazIqTeamDemo } from "@/components/zakaziq/ZakazIqTeamDemo";
import { zq, zqCard, zqCta } from "@/components/zakaziq/dilky";
import {
  ZAKAZIQ_FAQ,
  ZAKAZIQ_OBORY,
  ZAKAZIQ_OWN_RESULT,
  ZAKAZIQ_PRICE,
  ZAKAZIQ_PRICE_INCLUDES,
  ZAKAZIQ_PROOF,
  ZAKAZIQ_URL,
} from "@/lib/data/zakaziq";
import { heroIn } from "@/lib/animations";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// /zakaziq ve dvou oddělených částech (zadání 22. 11. 2026):
//
// 1. Klientský prostor a náš admin (#klientsky-prostor): jak s klienty
//    pracujeme. Sdělení efektivita, rychlost, spokojenost. Paleta VIZEON
//    (zlatá, hranaté glass-panely), výzva = konzultace k projektu.
// 2. ZakazIQ pro firmy (#pro-firmy): SaaS za 249 Kč měsíčně. Vlastní
//    prostředí produktu (navy plocha, zaoblené karty, bílá tlačítka Dílků),
//    ať je na první pohled vidět, že jde o jiný produkt.
//
// Fakta z repa ProjectIQ (PRODUCT.md, landing zakaziq.cz, R-134) jsou
// v lib/data/zakaziq.ts. Nevymýšlet čísla ani výsledky.

const h2 = "font-cormorant font-light text-[34px] leading-[1.08] text-[#f0ece6] md:text-[46px]";
const h3 = "font-cormorant text-[30px] font-light leading-[1.1] text-[#f0ece6] md:text-[38px]";
const eyebrowNavy = "font-inter text-[11px] font-normal uppercase tracking-[0.2em] text-[#8aaee3]";
const sectionGap = "mt-24 md:mt-32";
const pad = (n: number) => String(n).padStart(2, "0");

/* ─── Část 1: klientský prostor ─────────────────────────────────────────── */

const HERO_BENEFITS = ["Vyšší efektivita", "Rychlejší průběh", "Spokojenější klienti"];

const PILLARS: { icon: LucideIcon; title: string; lead: string; points: string[] }[] = [
  {
    icon: Gauge,
    title: "Vyšší efektivita",
    lead: "Méně ruční práce na obou stranách.",
    points: [
      "Hotovou práci hlásíme rovnou do prostoru",
      "Faktury se připraví samy, my je jen schválíme",
      "Úkol odškrtnete jedním klikem",
    ],
  },
  {
    icon: Zap,
    title: "Rychlejší průběh",
    lead: "Žádné čekání na odpověď v e-mailu.",
    points: [
      "Zprávy jako ve WhatsAppu, i hlasem",
      "Požadavek nadiktujete, AI z něj udělá zadání",
      "Konzultaci si zarezervujete sami",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Spokojenější klienti",
    lead: "Pořád víte, kde váš projekt je.",
    points: [
      "Etapy a procenta hotové práce",
      "Platby a faktury s QR kódem",
      "Po spuštění vidíte poptávky z webu",
    ],
  },
];

const PROJECT_STEPS = [
  { title: "Konzultace zdarma", detail: "Probereme, co potřebujete." },
  { title: "Pozvánka do prostoru", detail: "Heslo si nastavíte sami, nic neinstalujete." },
  { title: "Tvorba po etapách", detail: "Zprávy, úkoly a hotová práce na jednom místě." },
  { title: "Spuštění", detail: "Vidíte, kolik poptávek váš web přinesl." },
];

/* ─── Část 2: ZakazIQ pro firmy ─────────────────────────────────────────── */

const SAAS_FACTS = [`${ZAKAZIQ_PRICE} Kč měsíčně`, "14 dní zdarma", "Neomezeně pracovníků", "Zrušíte kdykoli"];

const MIRROR: { icon: LucideIcon; us: string; you: string }[] = [
  {
    icon: CalendarCheck,
    us: "Konzultaci si zarezervujete sami, bez telefonování.",
    you: "Objednají se na webu, přes odkaz nebo QR kód na pultu.",
  },
  { icon: Mail, us: "Potvrzení s časem vám přijde e-mailem.", you: "Dostanou potvrzení, změnu i připomínku den předem." },
  { icon: ListChecks, us: "Vidíte etapy a co je hotové.", you: "Stav své zakázky vidí na vlastní stránce." },
  { icon: QrCode, us: "Fakturu zaplatíte naskenováním QR kódu.", you: "Dostanou od vás fakturu s QR platbou." },
  { icon: Stamp, us: "Po dokončení vyplníte krátký dotazník.", you: "Sbírají razítka na věrnostní kartu." },
];

const SAAS_STEPS = [
  { title: "Zákazník se objedná", detail: "Na webu, přes odkaz nebo QR kód na pultu." },
  { title: "Zařadí se do kalendáře", detail: "Jako čárkovaný blok. Hned vidíte, kam padne." },
  { title: "Potvrdíte jedním klikem", detail: "V aplikaci nebo přímo z e-mailu." },
  { title: "Zbytek se počítá sám", detail: "Po zaplacení razítko a příjem v přehledu." },
];

const CONNECT: { icon: LucideIcon; title: string; text: string; code?: string; href?: string }[] = [
  {
    icon: QrCode,
    title: "Odkaz a QR kód",
    text: "Nemáte web? Odkaz dáte na Instagram, do Google profilu nebo na pult.",
    code: "zakaziq.cz/r/vase-firma",
  },
  {
    icon: Code2,
    title: "Jeden řádek do webu",
    text: "Vložíte ho do hotového webu a jedním klikem ověříte, že poptávky chodí.",
    code: '<script src="…/embed/vase-firma.js">',
  },
  {
    icon: MonitorSmartphone,
    title: "Web od nás",
    text: "Postavíme vám web a když budete chtít, rovnou ho napojíme.",
    href: "/sluzby/tvorba-webovych-stranek",
  },
];

const TRUST: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: ShieldCheck, title: "Data vidíte jen vy", text: "A lidé, které pozvete. Každá firma má data oddělená." },
  { icon: MapPin, title: "Databáze v EU", text: "Běží ve Frankfurtu v Německu." },
  { icon: Archive, title: "Po zrušení nic nezmizí", text: "Data zůstanou k nahlédnutí, jen je nepůjde měnit." },
];

const EARLY_POINTS = [
  "ZakazIQ vám nastavíme osobně, i s vašimi službami",
  "Napojíme váš web, nebo připravíme odkaz a QR kód",
  "Píšete přímo nám, žádná linka podpory",
];

/** Kryštofova čtyři slova k výsledku +63 % (přehled, efektivita, stabilita,
 *  hlubší pohled na podnikání). Konkrétní přehledy jsou v ZakazIqOwnStory. */
const OWN_RESULT_WORDS = ["Přehled", "Efektivita", "Stabilita", "Hlubší pohled"];

const RISK_NOTE = "Bez závazku · 14 dní zdarma · Zrušíte kdykoli";

type Secondary = { href: string; label: string; external?: boolean };

function SecondaryLink({ link }: { link: Secondary }) {
  return (
    <a
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="min-h-11 content-center font-inter text-[14px] text-[#b8ceef] underline decoration-[#2b57a8] underline-offset-[6px] transition-colors hover:text-white"
    >
      {link.label}
    </a>
  );
}

/** Výzva v části 2: bílé tlačítko Dílků a pod ním věta, která bere obavu. */
function SaasCta({
  label = "Chci ZakazIQ vyzkoušet",
  note = RISK_NOTE,
  secondary,
  className,
}: {
  label?: string;
  note?: string | null;
  secondary?: Secondary;
  className?: string;
}) {
  return (
    <div className={cn("mt-10", className)}>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <CTAButton className={zqCta}>
          {label}
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </CTAButton>
        {secondary && <SecondaryLink link={secondary} />}
      </div>
      {note && (
        <p className="mt-3 flex items-center gap-1.5 font-inter text-[13px] text-[#b8ceef]">
          <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" />
          {note}
        </p>
      )}
    </div>
  );
}

/** Pás s výzvou přes celou šířku v části 2. */
function CtaBand({
  heading,
  text,
  label = "Chci to vyzkoušet",
  secondary,
  big = false,
  className,
}: {
  heading: string;
  text: string;
  label?: string;
  secondary?: Secondary;
  big?: boolean;
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        zqCard,
        "flex flex-col items-start justify-between gap-6 bg-[linear-gradient(120deg,#16305e_0%,#0c1a36_70%)] md:flex-row md:items-center",
        big ? "p-8 md:p-14" : "p-7 md:p-10",
        className
      )}
    >
      <div>
        <p className={cn("font-cormorant font-light leading-[1.1] text-white", big ? "text-[36px] md:text-[52px]" : "text-[28px] md:text-[36px]")}>
          {heading}
        </p>
        <p className="mt-2 font-inter text-[15px] text-[#b8ceef]">{text}</p>
        <p className="mt-3 flex items-center gap-1.5 font-inter text-[13px] text-[#8aaee3]">
          <ShieldCheck size={14} strokeWidth={1.75} aria-hidden="true" />
          {RISK_NOTE}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-start gap-2 md:items-end">
        <CTAButton className={cn(zqCta, big && "min-h-[58px] px-8 text-[16px]")}>
          {label}
          <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
        </CTAButton>
        {secondary && <SecondaryLink link={secondary} />}
      </div>
    </Reveal>
  );
}

/** Pole dílků z loga ZakazIQ do pozadí části produktu (motiv Dílků). Čisté CSS. */
function TileBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 h-[300px] overflow-hidden [mask-image:linear-gradient(to_bottom,black_0%,transparent_85%)]"
    >
      <div className="grid w-max grid-cols-[repeat(32,44px)] gap-2 opacity-[0.14]">
        {Array.from({ length: 32 * 7 }, (_, i) => (
          <span
            key={i}
            className={cn("h-11 w-11 rounded-[12px]", (i * 37) % 100 < 7 ? "bg-[#3a6ec4]" : "border border-[#1b3868]")}
          />
        ))}
      </div>
    </div>
  );
}

export default function ZakazIQ() {
  return (
    <>
      {/* ══════════ ČÁST 1 · KLIENTSKÝ PROSTOR A ADMIN ══════════ */}
      <section id="klientsky-prostor" aria-labelledby="zakaziq-h1" className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-[15%] top-[-5%] h-[680px] w-[680px] rounded-full bg-[#c9a84c]/[0.06] blur-[120px]"
          aria-hidden="true"
        />

        <div className={cn(t.container.wide, "relative pb-24 pt-28 md:pb-32 md:pt-36")}>
          <Link href="/" className={t.backLink}>
            ← Zpět na hlavní stránku
          </Link>

          {/* Rozcestník: dvě oddělené části stránky */}
          <nav aria-label="Části stránky" className="hero-in mt-8 flex flex-wrap gap-2" style={heroIn(0, 20)}>
            <a
              href="#klientsky-prostor"
              aria-current="true"
              className="inline-flex min-h-11 items-center gap-2 border border-[#c9a84c]/50 bg-[#c9a84c]/[0.08] px-4 font-inter text-[13px] text-[#f0ece6]"
            >
              <span className="font-cormorant text-[18px] leading-none text-[#c9a84c]">01</span> Klientský prostor
            </a>
            <a
              href="#pro-firmy"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[#2b57a8]/70 px-4 font-inter text-[13px] text-text-secondary transition-colors hover:border-[#8aaee3] hover:text-[#f0ece6]"
            >
              <span className="font-cormorant text-[18px] leading-none text-[#8aaee3]">02</span> ZakazIQ pro vaši firmu
            </a>
          </nav>

          {/* ─── Hero části 1 ─── */}
          <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            {/* Hero nad ohybem se animuje v CSS (.hero-in), ne přes Reveal (LCP na mobilu). */}
            <div className="hero-in lg:col-span-5" style={heroIn(60, 45)}>
              <h1 id="zakaziq-h1">
                <span className="flex items-center gap-4">
                  <ZakazIqMark />
                  <span className={cn("pb-1 font-inter text-[44px] font-semibold leading-none tracking-tight sm:text-[56px]", zakaziqWordmark)}>
                    ZakazIQ
                  </span>
                </span>
                <span className="mt-6 block font-cormorant text-[36px] font-light leading-[1.06] text-[#f0ece6] md:text-[48px]">
                  Rychlejší projekty. Spokojenější klienti.
                </span>
              </h1>

              <p className={cn(t.lead, "mt-5 max-w-xl text-[#d6cebf]")}>
                Každou zakázku vedeme v ZakazIQ. My v adminu, vy v klientském prostoru. Méně e-mailů, rychlejší
                odpovědi a pořád víte, kde váš projekt je.
              </p>

              <ul aria-label="Co vám to přinese" className="mt-6 flex flex-wrap gap-2">
                {HERO_BENEFITS.map((b) => (
                  <li
                    key={b}
                    className="inline-flex items-center gap-1.5 border border-white/[0.1] px-3 py-1.5 font-inter text-[13px] text-text-secondary"
                  >
                    <Check size={13} strokeWidth={2} className="text-[#c9a84c]" aria-hidden="true" />
                    {b}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
                <CTAButton className="glow-pulse inline-flex items-center justify-center gap-2 bg-[#c9a84c] px-8 py-4 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968] active:scale-[0.98]">
                  Začněme váš projekt
                  <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
                </CTAButton>
                <a
                  href="#pro-firmy"
                  className="min-h-11 content-center font-inter text-[14px] text-text-secondary underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-[#f0ece6]"
                >
                  Hledáte aplikaci pro svou firmu?
                </a>
              </div>
            </div>

            <div className="hero-in relative isolate lg:col-span-7" style={heroIn(140, 45)}>
              <div aria-hidden="true" className="absolute -inset-8 -z-10 bg-[#2b57a8]/[0.10] blur-3xl" />
              <ZakazIqTeamDemo />
            </div>
          </div>

          {/* ─── Tři přínosy ─── */}
          <Reveal className={sectionGap}>
            <p className={cn(t.eyebrow, "mb-4")}>— Admin a klientský prostor</p>
            <h2 className={cn(h2, "max-w-3xl")}>Proč s klienty pracujeme právě takhle.</h2>
            <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {PILLARS.map((p, i) => (
                <li key={p.title} className="glass-panel glass-panel-hover flex flex-col p-7">
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center bg-[#c9a84c]/[0.1] text-[#c9a84c]">
                      <p.icon size={22} strokeWidth={1.5} aria-hidden="true" />
                    </span>
                    <span aria-hidden="true" className="font-cormorant text-[32px] font-light leading-none lining-nums text-[#c9a84c]/70">
                      {pad(i + 1)}
                    </span>
                  </div>
                  <h3 className="mt-6 font-inter text-[20px] font-medium text-[#f0ece6]">{p.title}</h3>
                  <p className="mt-1.5 font-inter text-[15px] text-text-secondary">{p.lead}</p>
                  <ul className="mt-6 space-y-3 border-t border-white/[0.07] pt-5">
                    {p.points.map((point) => (
                      <li key={point} className="flex items-start gap-3 font-inter text-[15px] leading-[1.5] text-[#f0ece6]">
                        <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-[#c9a84c]" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ─── Průběh projektu ─── */}
          <Reveal className={cn(sectionGap, "glass-panel p-7 md:p-10")}>
            <h2 className={h2}>Jak probíhá projekt u nás</h2>
            <p className={cn(t.body, "mt-3")}>Od první konzultace po spuštění v jednom prostoru.</p>
            <ZakazIqSteps steps={PROJECT_STEPS} />
          </Reveal>

          {/* ─── Výzva části 1 ─── */}
          <Reveal className="mt-10 flex flex-col items-start justify-between gap-6 border border-[#c9a84c]/30 bg-[#c9a84c]/[0.05] p-7 md:flex-row md:items-center md:p-10">
            <div>
              <p className="font-cormorant text-[28px] font-light leading-[1.15] text-[#f0ece6] md:text-[36px]">
                Chcete projekt, u kterého víte, na čem jste?
              </p>
              <p className="mt-2 font-inter text-[15px] text-text-secondary">
                Ozveme se do hodiny. Klientský prostor dostanete k zakázce u <Vizeon />.
              </p>
            </div>
            <CTAButton className="inline-flex shrink-0 items-center gap-2 bg-[#c9a84c] px-8 py-4 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968] active:scale-[0.98]">
              Chci plán a cenu
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </CTAButton>
          </Reveal>
        </div>
      </section>

      {/* ══════════ ČÁST 2 · ZAKAZIQ PRO FIRMY (SaaS) ══════════ */}
      {/* Prodejní cesta: úvod → fakta → zrcadlo → funkce → náš příběh a výsledek → jak to
          funguje → napojení → první firmy → cena → bezpečí a závěr. Za každým
          blokem výzva, k tomu plovoucí lišta (ZakazIqStickyCta). */}
      <section
        id="pro-firmy"
        aria-labelledby="pro-firmy-h2"
        className="relative scroll-mt-20 overflow-hidden border-t border-[#1b3868] bg-[linear-gradient(180deg,#0b1730_0%,#09111f_30%,#080808_100%)]"
      >
        <TileBackdrop />

        <div className={cn(t.container.wide, "relative py-24 md:py-32")}>
          {/* ─── Úvod části 2 ─── */}
          <div id="pro-firmy-hero" className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
            <Reveal className="lg:col-span-5">
              <span className="inline-flex items-center gap-2 rounded-full border border-[#2b57a8] bg-[#0c1a36]/80 px-3.5 py-1.5 font-inter text-[12px] font-medium text-[#b8ceef]">
                <ZakazIqMark size="sm" className="h-5 w-5" />
                <span className="font-cormorant text-[16px] leading-none text-[#8aaee3]">02</span>
                ZakazIQ pro vaši firmu
              </span>
              <h2 id="pro-firmy-h2" className="mt-6 font-cormorant text-[40px] font-light leading-[1.04] text-[#f0ece6] md:text-[58px]">
                Každá poptávka na svém místě.
              </h2>
              <p className={cn(t.lead, "mt-5 max-w-xl text-[#d6cebf]")}>
                Aplikace pro malé firmy: poptávky z webu, kalendář, zákazníci s věrnostními kartami, zakázky, faktury
                i odhad daní. Na telefonu i na počítači.
              </p>
              <ul aria-label="Cena a podmínky" className="mt-6 flex flex-wrap gap-2">
                {SAAS_FACTS.map((fact) => (
                  <li
                    key={fact}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#1b3868] bg-[#0c1a36]/60 px-3 py-1 font-inter text-[13px] text-[#dce7f7]"
                  >
                    <Check size={13} strokeWidth={2} className="text-[#8aaee3]" aria-hidden="true" />
                    {fact}
                  </li>
                ))}
              </ul>
              <a
                href="#dukaz"
                className="mt-5 inline-flex min-h-11 items-center gap-2.5 rounded-full border border-[#8aaee3]/60 bg-[#23478b]/40 py-1.5 pl-1.5 pr-4 font-inter text-[14px] text-white transition-colors hover:bg-[#23478b]/70"
              >
                <span className="rounded-full bg-white px-2.5 py-1 font-semibold text-[#0c1a36]">{ZAKAZIQ_OWN_RESULT.value} %</span>
                {ZAKAZIQ_OWN_RESULT.label} <ArrowRight size={14} aria-hidden="true" />
              </a>
              <SaasCta className="mt-8" secondary={{ href: "#cena", label: "Kolik to stojí?" }} />
            </Reveal>
            <Reveal className="relative isolate lg:col-span-7">
              <div aria-hidden="true" className="absolute -inset-8 -z-10 bg-[#2b57a8]/[0.14] blur-3xl" />
              <ZakazIqCalendarDemo />
            </Reveal>
          </div>

          {/* ─── Fakta, ne sliby ─── */}
          <Reveal className="mt-16 md:mt-24">
            <p className={cn(eyebrowNavy, "mb-5")}>— Fakta, ne sliby</p>
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-[24px] border border-[#1b3868] bg-[#1b3868] lg:grid-cols-4">
              {ZAKAZIQ_PROOF.map((p) => (
                <li key={p.label} className="bg-[#0a152b] p-6 md:p-8">
                  <p className="font-cormorant text-[48px] font-light leading-none lining-nums text-white md:text-[64px]">{p.value}</p>
                  <p className="mt-3 font-inter text-[14px] leading-[1.5] text-[#b8ceef]">{p.label}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              <span className="mr-1 font-inter text-[13px] text-text-muted">Připravené pro obory:</span>
              {ZAKAZIQ_OBORY.map((o) => (
                <span key={o} className="rounded-full border border-[#1b3868] px-3 py-1 font-inter text-[13px] text-[#dce7f7]">
                  {o}
                </span>
              ))}
            </div>
          </Reveal>

          {/* ─── Zrcadlo ─── */}
          <Reveal className={sectionGap}>
            <p className={cn(eyebrowNavy, "mb-4")}>— Znáte to od nás</p>
            <h2 className={cn(h2, "max-w-3xl")}>Co zažijete u nás, mohou mít vaši zákazníci u vás.</h2>
            <div className="mt-10">
              <div className="hidden grid-cols-[1fr_56px_1fr] gap-6 px-6 pb-3 md:grid">
                <p className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">Jako náš klient</p>
                <span />
                <p className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#8aaee3]">Vaši zákazníci u vás</p>
              </div>
              <ul className="space-y-3">
                {MIRROR.map((row) => (
                  <li key={row.us} className={cn(zqCard, "grid grid-cols-1 items-center gap-4 rounded-[20px] px-6 py-5 md:grid-cols-[1fr_56px_1fr] md:gap-6")}>
                    <div>
                      <p className="mb-1 font-inter text-[11px] uppercase tracking-[0.18em] text-text-muted md:hidden">Jako náš klient</p>
                      <p className="font-inter text-[16px] leading-[1.55] text-text-secondary">{row.us}</p>
                    </div>
                    <span
                      aria-hidden="true"
                      className="grid h-11 w-11 place-items-center rounded-[12px] bg-gradient-to-br from-[#2b57a8] to-[#1b3868] text-white md:mx-auto"
                    >
                      <row.icon size={19} strokeWidth={1.75} />
                    </span>
                    <div>
                      <p className="mb-1 font-inter text-[11px] uppercase tracking-[0.18em] text-[#8aaee3] md:hidden">Vaši zákazníci u vás</p>
                      <p className="font-inter text-[16px] font-medium leading-[1.55] text-[#f0ece6]">{row.you}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <SaasCta label="Chci to pro své zákazníky" secondary={{ href: "#funkce", label: "Co všechno umí?" }} />
          </Reveal>

          {/* ─── Funkce ─── */}
          <Reveal className={sectionGap}>
            <div id="funkce" className="scroll-mt-28">
              <p className={cn(eyebrowNavy, "mb-4")}>— Funkce</p>
              <h2 className={cn(h2, "max-w-3xl")}>Devět věcí, jedna aplikace.</h2>
              <p className={cn(t.body, "mt-4 max-w-2xl")}>
                Jedna poptávka vede k termínu, k zákazníkovi a po zaplacení k příjmu. Nic se nepřepisuje ručně.
              </p>
            </div>
            <ZakazIqModules />
          </Reveal>

          {/* Dokud ZakazIQ nemá otevřenou registraci (ProjectIQ SIGNUP_OPEN = false),
              přístup nastavujeme osobně. Po otevření texty výzev přepsat. */}
          <CtaBand
            className="mt-10"
            heading="Vyzkoušejte ZakazIQ 14 dní zdarma."
            text="Přístup vám nastavíme osobně, ať první poptávku přijmete bez starostí."
          />

          {/* ─── Náš příběh a výsledek: hlavní důkaz ─── */}
          {/* +63 % je Kryštofova vlastní zkušenost s VIZEON (zadání 22. 11. 2026),
              ne výsledek zákazníků ZakazIQ. Data a citace: ZAKAZIQ_OWN_RESULT.
              Příběh, čtyři přehledy a řetěz web → systém → služba: ZakazIqOwnStory. */}
          <Reveal className={sectionGap}>
            <div id="dukaz" className="scroll-mt-28">
              <p className={cn(eyebrowNavy, "mb-4")}>— Náš příběh</p>
              <h2 className={cn(h2, "max-w-3xl")}>Vzniklo z našeho vlastního chaosu.</h2>
              <p className={cn(t.body, "mt-4 max-w-2xl")}>
                Nejdřív jsme ZakazIQ postavili pro sebe. Dnes ho dáváme svým klientům jako klientský prostor
                k zakázce. A teď i jako aplikaci pro vaši firmu.
              </p>
            </div>
            <ZakazIqOrigin />
          </Reveal>

          <Reveal className={cn(zqCard, "mt-16 grid grid-cols-1 overflow-hidden md:mt-20 lg:grid-cols-12")}>
            <div className="flex flex-col justify-center bg-[radial-gradient(120%_120%_at_0%_0%,#23478b_0%,#0c1a36_62%)] p-8 md:p-12 lg:col-span-5">
              <p className="flex items-start gap-1 font-cormorant font-light leading-none text-white">
                <span className="text-[104px] lining-nums md:text-[150px]">{ZAKAZIQ_OWN_RESULT.value}</span>
                <span className="mt-4 text-[44px] md:mt-6 md:text-[60px]">%</span>
              </p>
              <p className="mt-4 font-inter text-[18px] font-medium text-white">{ZAKAZIQ_OWN_RESULT.label}</p>
              <p className="mt-1 font-inter text-[14px] text-[#b8ceef]">{ZAKAZIQ_OWN_RESULT.context}</p>
            </div>

            <div className="border-t border-[#1b3868] p-8 md:p-12 lg:col-span-7 lg:border-l lg:border-t-0">
              <TrendingUp size={28} strokeWidth={1.25} className="text-[#3a6ec4]" aria-hidden="true" />
              <blockquote className="mt-4 font-cormorant text-[26px] font-light leading-[1.25] text-white md:text-[32px]">
                {ZAKAZIQ_OWN_RESULT.quote}
              </blockquote>
              <p className="mt-5 font-inter text-[14px] text-[#b8ceef]">
                Kryštof, zakladatel <Vizeon />
              </p>
              <ul aria-label="Co nám ZakazIQ dalo" className="mt-8 flex flex-wrap gap-2">
                {OWN_RESULT_WORDS.map((w) => (
                  <li
                    key={w}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#2b57a8] bg-[#0c1a36]/60 px-3.5 py-1.5 font-inter text-[13px] text-[#dce7f7]"
                  >
                    <Check size={13} strokeWidth={2.2} className="text-[#8aaee3]" aria-hidden="true" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <h3 className={h3}>Odkud se těch 63 % bere.</h3>
            <p className={cn(t.body, "mt-3 max-w-2xl")}>Čtyři věci, které díky ZakazIQ máme každý den pod kontrolou.</p>
            <ZakazIqOverviews />
          </Reveal>

          <Reveal className="mt-16 md:mt-20">
            <h3 className={h3}>Web. Systém. Služba.</h3>
            <p className={cn(t.body, "mt-3 max-w-2xl")}>
              Poptávka přijde z webu, v systému se z ní stane zakázka a klient dostane službu i všechny e-maily bez
              ručního psaní. Tak to u nás běží každý den. Stejně to postavíme i vám.
            </p>
            <ZakazIqFlow />
            <SaasCta label="Chci ZakazIQ pro svou firmu" secondary={{ href: "#cena", label: "Kolik to stojí?" }} />
          </Reveal>

          {/* ─── Jak to funguje ─── */}
          <Reveal className={cn(sectionGap, zqCard, "p-7 md:p-10")}>
            <h2 className={h2}>Jak to funguje</h2>
            <p className={cn(t.body, "mt-3")}>Od objednávky po zaplacení na jednom místě.</p>
            <ZakazIqSteps steps={SAAS_STEPS} tone="navy" />
            <SaasCta label="Chci začít" />
          </Reveal>

          {/* ─── Napojení webu ─── */}
          <Reveal className={sectionGap}>
            <p className={cn(eyebrowNavy, "mb-4")}>— Napojení</p>
            <h2 className={cn(h2, "max-w-3xl")}>Web vám postavíme a rovnou napojíme.</h2>
            <p className={cn(t.body, "mt-4 max-w-2xl")}>Tři cesty, vyberete tu, která sedí vašemu webu.</p>
            <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
              {CONNECT.map((c) => (
                <li key={c.title} className={cn(zqCard, "flex flex-col p-6")}>
                  <c.icon size={22} strokeWidth={1.4} className="text-[#8aaee3]" aria-hidden="true" />
                  <h3 className="mt-5 font-inter text-[17px] font-medium text-[#f0ece6]">{c.title}</h3>
                  <p className="mt-2 font-inter text-[15px] leading-[1.6] text-text-secondary">{c.text}</p>
                  <div className="mt-auto pt-6">
                    {c.code ? (
                      <code className={cn("block break-all rounded-[12px] border bg-[#0c1a36] px-3.5 py-3 text-[13px] text-[#eef2fb]", zq.line, zq.data)}>
                        {c.code}
                      </code>
                    ) : (
                      <Link
                        href={c.href!}
                        className="inline-flex min-h-11 items-center gap-2 font-inter text-[14px] font-medium text-[#8aaee3] hover:text-white hover:underline"
                      >
                        Tvorba webových stránek <ArrowRight size={15} aria-hidden="true" />
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ul>
            <SaasCta label="Chci web napojený na ZakazIQ" note="Web i aplikace od jednoho dodavatele" />
          </Reveal>

          {/* ─── První firmy ─── */}
          {/* Skutečný důvod omezení: přístup zatím nastavujeme každé firmě osobně
              (ProjectIQ R-134, SIGNUP_OPEN = false). Žádné odpočítávání ani počty míst. */}
          <Reveal
            className={cn(
              sectionGap,
              "relative overflow-hidden rounded-[32px] border border-[#2b57a8] bg-[radial-gradient(120%_120%_at_100%_0%,#23478b_0%,#0c1a36_55%,#0a1224_100%)] p-8 md:p-12"
            )}
          >
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-7">
                <p className={cn(eyebrowNavy, "mb-4 text-[#b8ceef]")}>— Spouštíme s prvními firmami</p>
                <p className="font-cormorant text-[34px] font-light leading-[1.08] text-white md:text-[46px]">
                  Buďte mezi prvními, kdo má poptávky v kalendáři.
                </p>
                <p className="mt-4 max-w-xl font-inter text-[15px] leading-[1.65] text-[#b8ceef]">
                  Osobní nastavení nám zabere čas, proto firmy přibíráme postupně.
                </p>
              </div>
              <div className="lg:col-span-5">
                <ul className="space-y-3">
                  {EARLY_POINTS.map((point) => (
                    <li key={point} className="flex items-start gap-3 font-inter text-[15px] leading-[1.55] text-white">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-white/10">
                        <Check size={14} strokeWidth={2} className="text-white" aria-hidden="true" />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <SaasCta className="mt-8" label="Chci být mezi prvními" note={null} />
              </div>
            </div>
          </Reveal>

          {/* ─── Cena ─── */}
          <Reveal className={cn(sectionGap, zqCard, "overflow-hidden")}>
            <div id="cena" className="grid scroll-mt-28 grid-cols-1 lg:grid-cols-2">
              <div className="p-8 md:p-12">
                <p className={cn(eyebrowNavy, "mb-4")}>— Cena</p>
                <h2 className={h2}>Všechny funkce za jednu cenu.</h2>
                <p className="mt-8 flex items-baseline gap-3">
                  <span className="font-cormorant text-[88px] font-light leading-none lining-nums text-white md:text-[112px]">
                    {ZAKAZIQ_PRICE}
                  </span>
                  <span className="font-inter text-[18px] text-[#b8ceef]">Kč / měsíc</span>
                </p>
                <p className={cn(t.body, "mt-5 max-w-md")}>
                  Konečná cena, nic se nepřipočítává. 14 dní zdarma, kartu zadáte předem a zrušíte kdykoli.
                </p>

                {/* Klienti webu: R-134 v ProjectIQ (30 dní a nastavení spolu, cena beze slevy) */}
                <div className="mt-8 border-l-2 border-[#8aaee3]/60 pl-5">
                  <p className="font-inter text-[15px] font-medium text-[#f0ece6]">Máte od nás web?</p>
                  <p className="mt-1 font-inter text-[15px] leading-[1.6] text-text-secondary">
                    ZakazIQ vám připravíme předem a projdeme spolu za 20 minut. Na vyzkoušení máte 30 dní.
                  </p>
                </div>
              </div>

              <div className="flex flex-col justify-center gap-8 border-t border-[#1b3868] p-8 md:p-12 lg:border-l lg:border-t-0">
                <div>
                  <h3 className="font-inter text-[17px] font-medium text-[#f0ece6]">Co je v ceně</h3>
                  <ul className="mt-5 space-y-3">
                    {ZAKAZIQ_PRICE_INCLUDES.map((item) => (
                      <li key={item} className="flex items-start gap-3 font-inter text-[16px] text-[#f0ece6]">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[7px] bg-[#1b3868]">
                          <Check size={14} strokeWidth={1.75} className="text-[#b8ceef]" aria-hidden="true" />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <SaasCta className="mt-0" secondary={{ href: ZAKAZIQ_URL, label: "www.zakaziq.cz", external: true }} />
              </div>
            </div>
          </Reveal>

          {/* ─── Bezpečí dat ─── */}
          <Reveal className={sectionGap}>
            <h2 className={cn(h2, "max-w-3xl")}>Vaše data, vaše pravidla.</h2>
            <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {TRUST.map((item) => (
                <li key={item.title} className={cn(zqCard, "p-6")}>
                  <item.icon size={22} strokeWidth={1.4} className="text-[#8aaee3]" aria-hidden="true" />
                  <h3 className="mt-5 font-inter text-[16px] font-medium text-[#f0ece6]">{item.title}</h3>
                  <p className="mt-2 font-inter text-[14px] leading-[1.6] text-text-secondary">{item.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ─── Závěrečná výzva části 2 ─── */}
          <div id="zakaziq-final-cta">
            <CtaBand
              className={sectionGap}
              big
              heading="Poptávky v kalendáři, ne v e-mailu."
              text="Napište nám a ukážeme vám ZakazIQ na vašem oboru. Bez závazku a zdarma."
              secondary={{ href: "#zakaziq-faq", label: "Mám ještě otázku" }}
            />
          </div>
        </div>

        <ZakazIqStickyCta />
      </section>

      {/* ══════════ SPOLEČNÉ · OTÁZKY A ZÁVĚR ══════════ */}
      <section aria-labelledby="zakaziq-faq" className={cn(t.container.wide, "pb-24 pt-24 md:pb-32 md:pt-32")}>
        <h2 id="zakaziq-faq" className={cn(h2, "mb-8")}>
          Časté otázky
        </h2>
        <AutomationFAQ items={ZAKAZIQ_FAQ} idPrefix="zakaziq-faq" />

        <ClosingCTA
          heading="Web s klientským prostorem, nebo aplikace pro vaši firmu?"
          subheading="Ozveme se do hodiny a probereme, co vám pomůže víc."
        />
      </section>
    </>
  );
}
