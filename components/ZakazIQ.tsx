import Link from "next/link";
import {
  ArrowRight,
  Archive,
  CalendarCheck,
  Check,
  Code2,
  ListChecks,
  Mail,
  MapPin,
  MonitorSmartphone,
  QrCode,
  ShieldCheck,
  Stamp,
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
import { ZakazIqPortalMockup } from "@/components/zakaziq/ZakazIqPortalMockup";
import { ZakazIqSteps } from "@/components/zakaziq/ZakazIqSteps";
import { zq } from "@/components/zakaziq/dilky";
import { ZAKAZIQ_FAQ, ZAKAZIQ_PRICE, ZAKAZIQ_PRICE_INCLUDES, ZAKAZIQ_URL } from "@/lib/data/zakaziq";
import { heroIn } from "@/lib/animations";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// /zakaziq podle aktuálního rozsahu produktu (repo ProjectIQ, 11/2026).
// ZakazIQ už není jen „komunikační portál k projektu": je to přehled
// podnikání pro malé firmy za 249 Kč měsíčně (Workspace) a k tomu klientský
// prostor, ve kterém naši klienti sledují svůj web. Spojuje je „zrcadlo"
// z plánu konverze (docs/klientsky-prostor/KONVERZE-PLAN.md § 2.5): co
// klient zažije u nás, mohou mít jeho zákazníci u něj.
//
// Stránka je v paletě VIZEON, ukázky rozhraní v Dílkách ZakazIQ
// (components/zakaziq/dilky.ts). Fakta a ceny: lib/data/zakaziq.ts.

const h2 = "font-cormorant font-light text-[34px] leading-[1.08] text-[#f0ece6] md:text-[46px]";
const sectionGap = "mt-24 md:mt-32";

const HERO_FACTS = [`${ZAKAZIQ_PRICE} Kč měsíčně`, "14 dní zdarma", "Neomezeně pracovníků", "Zrušíte kdykoli"];

const MIRROR: { icon: LucideIcon; us: string; you: string }[] = [
  {
    icon: CalendarCheck,
    us: "Konzultaci si zarezervujete sami, bez telefonování.",
    you: "Objednají se na webu, přes odkaz nebo QR kód na pultu.",
  },
  {
    icon: Mail,
    us: "Potvrzení s časem vám přijde e-mailem.",
    you: "Dostanou potvrzení, změnu i připomínku den předem.",
  },
  {
    icon: ListChecks,
    us: "Vidíte etapy a co je hotové.",
    you: "Stav své zakázky vidí na vlastní stránce.",
  },
  {
    icon: QrCode,
    us: "Fakturu zaplatíte naskenováním QR kódu.",
    you: "Dostanou od vás fakturu s QR platbou.",
  },
  {
    icon: Stamp,
    us: "Po dokončení vyplníte krátký dotazník.",
    you: "Sbírají razítka na věrnostní kartu.",
  },
];

const PORTAL_POINTS = [
  "Čeká na vás: vždy víte, co je na vás",
  "Zprávy jako ve WhatsAppu, i hlasem a s přílohou",
  "Etapy projektu a procenta hotové práce",
  "Faktury s QR kódem a přehled plateb",
  "Konzultace z volných termínů přes Google Meet",
  "Po spuštění počet poptávek z vašeho webu",
];

const STEPS = [
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

export default function ZakazIQ() {
  return (
    <section id="zakaziq" aria-labelledby="zakaziq-h1" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-[15%] top-[-5%] h-[680px] w-[680px] rounded-full bg-[#2b57a8]/[0.10] blur-[120px]"
        aria-hidden="true"
      />

      <div className={cn(t.container.wide, "relative pb-24 pt-28 md:pb-32 md:pt-36")}>
        <Link href="/" className={t.backLink}>
          ← Zpět na hlavní stránku
        </Link>

        {/* ─── Hero: produkt vlevo, živá ukázka kalendáře vpravo ─── */}
        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          {/* Hero nad ohybem se animuje v CSS (.hero-in), ne přes Reveal (LCP na mobilu). */}
          <div className="hero-in lg:col-span-5" style={heroIn(0, 45)}>
            <span className="inline-flex items-center border border-[#c9a84c]/35 bg-[#c9a84c]/[0.06] px-3.5 py-1.5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">
              Náš vlastní produkt
            </span>

            <h1 id="zakaziq-h1" className="mt-6">
              <span className="flex items-center gap-4">
                <ZakazIqMark />
                <span className={cn("pb-1 font-inter text-[44px] font-semibold leading-none tracking-tight sm:text-[56px]", zakaziqWordmark)}>
                  ZakazIQ
                </span>
              </span>
              <span className="mt-6 block font-cormorant text-[34px] font-light leading-[1.08] text-[#f0ece6] md:text-[44px]">
                Každá poptávka na svém místě.
              </span>
            </h1>

            <p className={cn(t.lead, "mt-5 max-w-xl text-[#d6cebf]")}>
              Poptávky z webu, kalendář, zákazníci, zakázky, faktury i odhad daní v jedné aplikaci pro malé firmy. Na
              telefonu i na počítači.
            </p>

            <ul aria-label="Cena a podmínky" className="mt-6 flex flex-wrap gap-2">
              {HERO_FACTS.map((fact) => (
                <li
                  key={fact}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.1] px-3 py-1 font-inter text-[13px] text-text-secondary"
                >
                  <Check size={13} strokeWidth={2} className="text-[#c9a84c]" aria-hidden="true" />
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
              <CTAButton className="glow-pulse inline-flex items-center justify-center gap-2 bg-[#c9a84c] px-8 py-4 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968] active:scale-[0.98]">
                Chci ZakazIQ vyzkoušet
                <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
              </CTAButton>
              <a href="#zrcadlo" className="min-h-11 content-center font-inter text-[14px] text-text-secondary underline decoration-white/20 underline-offset-[6px] transition-colors hover:text-[#f0ece6]">
                Jak ho používáme s klienty
              </a>
            </div>
          </div>

          <div className="hero-in relative isolate lg:col-span-7" style={heroIn(120, 45)}>
            <div aria-hidden="true" className="absolute -inset-8 -z-10 bg-[#2b57a8]/[0.12] blur-3xl" />
            <ZakazIqCalendarDemo />
          </div>
        </div>

        {/* ─── Zrcadlo: co zažijete u nás, dostanou vaši zákazníci u vás ─── */}
        <Reveal className={sectionGap}>
          <div id="zrcadlo" className="scroll-mt-28">
            <p className={cn(t.eyebrow, "mb-4")}>— Jeden systém, dvě strany</p>
            <h2 className={cn(h2, "max-w-3xl")}>Co zažijete u nás, mohou mít vaši zákazníci u vás.</h2>
            <p className={cn(t.body, "mt-4 max-w-2xl")}>
              S klienty pracujeme v ZakazIQ. Stejné pohodlí pak můžete dát svým zákazníkům.
            </p>
          </div>

          <div className="mt-10">
            <div className="hidden grid-cols-[1fr_56px_1fr] gap-6 px-6 pb-3 md:grid">
              <p className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">
                Jako náš klient
              </p>
              <span />
              <p className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#8aaee3]">
                Vaši zákazníci u vás
              </p>
            </div>
            <ul className="space-y-3">
              {MIRROR.map((row) => (
                <li
                  key={row.us}
                  className="glass-panel grid grid-cols-1 items-center gap-4 px-6 py-5 md:grid-cols-[1fr_56px_1fr] md:gap-6"
                >
                  <div>
                    <p className="mb-1 font-inter text-[11px] uppercase tracking-[0.18em] text-text-muted md:hidden">
                      Jako náš klient
                    </p>
                    <p className="font-inter text-[16px] leading-[1.55] text-text-secondary">{row.us}</p>
                  </div>
                  {/* Dílek ZakazIQ uprostřed: obě strany běží na stejném systému */}
                  <span
                    aria-hidden="true"
                    className="grid h-11 w-11 place-items-center rounded-[12px] bg-gradient-to-br from-[#2b57a8] to-[#1b3868] text-white md:mx-auto"
                  >
                    <row.icon size={19} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="mb-1 font-inter text-[11px] uppercase tracking-[0.18em] text-[#8aaee3] md:hidden">
                      Vaši zákazníci u vás
                    </p>
                    <p className="font-inter text-[16px] font-medium leading-[1.55] text-[#f0ece6]">{row.you}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        {/* ─── Klientský prostor ─── */}
        <Reveal className={cn(sectionGap, "grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center")}>
          <div className="lg:col-span-5">
            <p className={cn(t.eyebrow, "mb-4")}>— Pro naše klienty</p>
            <h2 className={h2}>Celý projekt v jednom prostoru.</h2>
            <p className={cn(t.body, "mt-4")}>
              Jako klient <Vizeon /> dostanete přístup do klientského prostoru. Žádné dohledávání v e-mailech.
            </p>
            <ul className="mt-8 space-y-3">
              {PORTAL_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-3 font-inter text-[15px] leading-[1.6] text-[#f0ece6]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-[6px] bg-[#c9a84c]/[0.12]">
                    <Check size={13} strokeWidth={2.2} className="text-[#c9a84c]" aria-hidden="true" />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative isolate lg:col-span-7">
            <div aria-hidden="true" className="absolute -inset-6 -z-10 bg-[#2b57a8]/[0.10] blur-3xl" />
            <div className="lg:[transform:perspective(1600px)_rotateY(-6deg)_rotateX(2deg)]">
              <ZakazIqPortalMockup />
            </div>
          </div>
        </Reveal>

        {/* ─── Funkce aplikace ─── */}
        <Reveal className={sectionGap}>
          <div id="funkce" className="scroll-mt-28">
            <p className={cn(t.eyebrow, "mb-4")}>— Pro vaši firmu</p>
            <h2 className={cn(h2, "max-w-3xl")}>Devět věcí, jedna aplikace.</h2>
            <p className={cn(t.body, "mt-4 max-w-2xl")}>
              Jedna poptávka vede k termínu, k zákazníkovi a po zaplacení k příjmu. Nic se nepřepisuje ručně.
            </p>
          </div>
          <ZakazIqModules />
        </Reveal>

        {/* ─── Jak to funguje ─── */}
        <Reveal className={cn(sectionGap, "glass-panel p-7 md:p-10")}>
          <h2 className={h2}>Jak to funguje</h2>
          <p className={cn(t.body, "mt-3")}>Od objednávky po zaplacení na jednom místě.</p>
          <ZakazIqSteps steps={STEPS} />
        </Reveal>

        {/* ─── Napojení webu ─── */}
        <Reveal className={sectionGap}>
          <p className={cn(t.eyebrow, "mb-4")}>— Napojení</p>
          <h2 className={cn(h2, "max-w-3xl")}>Web vám postavíme a rovnou napojíme.</h2>
          <p className={cn(t.body, "mt-4 max-w-2xl")}>Tři cesty, vyberete tu, která sedí vašemu webu.</p>
          <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {CONNECT.map((c) => (
              <li key={c.title} className="glass-panel flex flex-col p-6">
                <c.icon size={22} strokeWidth={1.4} className="text-[#c9a84c]" aria-hidden="true" />
                <h3 className="mt-5 font-inter text-[17px] font-medium text-[#f0ece6]">{c.title}</h3>
                <p className="mt-2 font-inter text-[15px] leading-[1.6] text-text-secondary">{c.text}</p>
                <div className="mt-auto pt-6">
                  {c.code ? (
                    <code className={cn("block break-all rounded-[12px] border px-3.5 py-3 text-[13px]", zq.line, "bg-[#0c1a36] text-[#eef2fb]", zq.data)}>
                      {c.code}
                    </code>
                  ) : (
                    <Link href={c.href!} className="inline-flex min-h-11 items-center gap-2 font-inter text-[14px] font-medium text-[#c9a84c] hover:underline">
                      Tvorba webových stránek <ArrowRight size={15} aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ─── Cena ─── */}
        <Reveal className={cn(sectionGap, "glass-panel overflow-hidden")}>
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 md:p-12">
              <p className={cn(t.eyebrow, "mb-4")}>— Cena</p>
              <h2 className={h2}>Všechny funkce za jednu cenu.</h2>
              <p className="mt-8 flex items-baseline gap-3">
                <span className="font-cormorant text-[88px] font-light leading-none lining-nums text-[#f0ece6] md:text-[112px]">
                  {ZAKAZIQ_PRICE}
                </span>
                <span className="font-inter text-[18px] text-text-secondary">Kč / měsíc</span>
              </p>
              <p className={cn(t.body, "mt-5 max-w-md")}>
                Konečná cena, nic se nepřipočítává. 14 dní zdarma, kartu zadáte předem a zrušíte kdykoli.
              </p>

              {/* Klienti webu: R-134 v ProjectIQ (30 dní a nastavení spolu, cena beze slevy) */}
              <div className="mt-8 border-l-2 border-[#c9a84c]/60 pl-5">
                <p className="font-inter text-[15px] font-medium text-[#f0ece6]">Máte od nás web?</p>
                <p className="mt-1 font-inter text-[15px] leading-[1.6] text-text-secondary">
                  ZakazIQ vám připravíme předem a projdeme spolu za 20 minut. Na vyzkoušení máte 30 dní.
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center gap-8 border-t border-white/[0.07] p-8 md:p-12 lg:border-l lg:border-t-0">
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
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <CTAButton className="inline-flex items-center gap-2 bg-[#c9a84c] px-7 py-3.5 font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
                  Chci to vyzkoušet
                  <ArrowRight size={15} aria-hidden="true" />
                </CTAButton>
                <a
                  href={ZAKAZIQ_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-11 content-center font-inter text-[14px] text-text-secondary underline decoration-white/20 underline-offset-[6px] hover:text-[#f0ece6]"
                >
                  www.zakaziq.cz
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        {/* ─── Vlastní produkt a data ─── */}
        <Reveal className={cn(sectionGap, "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12")}>
          <div className="lg:col-span-5">
            <h2 className={h2}>Stavíme ho sami a sami v něm pracujeme.</h2>
            <p className={cn(t.body, "mt-4")}>
              Poptávky z našich webů, zakázky, faktury i konzultace s klienty vedeme právě v ZakazIQ.
            </p>
            <p className="mt-4 font-inter text-[14px] text-text-muted">
              — <Vizeon />
            </p>
          </div>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-7">
            {TRUST.map((item) => (
              <li key={item.title} className="glass-panel p-6">
                <item.icon size={22} strokeWidth={1.4} className="text-[#8aaee3]" aria-hidden="true" />
                <h3 className="mt-5 font-inter text-[16px] font-medium text-[#f0ece6]">{item.title}</h3>
                <p className="mt-2 font-inter text-[14px] leading-[1.6] text-text-secondary">{item.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ─── Časté otázky ─── */}
        <section aria-labelledby="zakaziq-faq" className={sectionGap}>
          <h2 id="zakaziq-faq" className={cn(h2, "mb-8")}>
            Časté otázky
          </h2>
          <AutomationFAQ items={ZAKAZIQ_FAQ} idPrefix="zakaziq-faq" />
        </section>

        <ClosingCTA
          heading="Chcete mít poptávky rovnou v kalendáři?"
          subheading="Nezávazná konzultace zdarma. Ukážeme vám ZakazIQ na vašem oboru."
        />
      </div>
    </section>
  );
}
