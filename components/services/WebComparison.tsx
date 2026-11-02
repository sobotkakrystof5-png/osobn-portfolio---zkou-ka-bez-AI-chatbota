import { Fragment } from "react";
import type { CSSProperties } from "react";
import { Bot, Check, Minus, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Vizeon } from "@/components/brand/BrandName";
import { CTAButton } from "@/components/CTAButton";
import { cn } from "@/lib/utils";

// Srovnání „web sami s AI“ a „web od nás“ (vzor: tabulka Dnes, ručně ×
// Prvotka). Řádky jsou to, co musí mít každý web. Sloupec sami s AI je
// matná šedá karta s křížky, náš sloupec je vyvýšená zlatá karta se září,
// plnými fajfkami, skóre a CTA. Písmo je záměrně velké a světlé, ať se dá
// číst i bez brýlí. Srovnání je férové: u ceny přiznáváme, že sami s AI je
// start levnější (pomlčka místo křížku).
type Row = {
  topic: string;
  diy: string;
  /** Ikona u varianty sami s AI. Výchozí křížek, u férových bodů pomlčka. */
  diyIcon?: LucideIcon;
  title: string;
  text: string;
};

const ROWS: Row[] = [
  {
    topic: "Design",
    diy: "Šablona, jakou má půlka internetu.",
    title: "Design na míru vašemu oboru",
    text: "Postavený podle toho, jak se vaši zákazníci rozhodují.",
  },
  {
    topic: "Mobil",
    diy: "Na mobilu se něco rozpadne a nevíte proč.",
    title: "Vyladěný na mobilu",
    text: "Rychlé načítání a pohodlné ovládání palcem.",
  },
  {
    topic: "Poptávky",
    diy: "Hezký web, ze kterého nikdo nezavolá.",
    title: "Jasná cesta k poptávce",
    text: "Tlačítka a formulář tam, kde je zákazník potřebuje.",
  },
  {
    topic: "Google",
    diy: "Web, o kterém vyhledávač skoro neví.",
    title: "Najdou vás na Googlu i Seznamu",
    text: "Nadpisy, popisky, strukturovaná data a rychlost.",
  },
  {
    topic: "Čas",
    diy: "Večery strávené promptováním a opravami.",
    title: "Vy dodáte podklady, my zbytek",
    text: "Hotovo v termínu, který znáte předem.",
  },
  {
    topic: "Cena",
    diy: "Na startu levnější, platíte ale vlastním časem.",
    diyIcon: Minus,
    title: "Pevná cena předem",
    text: "Veřejný ceník, žádné příplatky navíc.",
  },
];

// Na desktopu má každá buňka pevný řádek mřížky (--row), protože pozadí obou
// karet jsou samostatné vrstvy přes všechny řádky (--rows = hlavička, řádky,
// patička). Bez pevných řádků by je automatické umístění obcházelo.
const at = (row: number) => ({ "--row": row }) as CSSProperties;
const cell = "relative md:[grid-row:var(--row)]";

/** Šest teček skóre: plné zlaté u nás, prázdné u varianty sami s AI. */
function ScoreDots({ filled }: { filled: number }) {
  return (
    <span className="flex gap-1.5" aria-hidden="true">
      {ROWS.map((row, index) => (
        <span
          key={row.topic}
          className={cn(
            "h-2.5 w-2.5 rounded-full",
            index < filled ? "bg-[#c9a84c] shadow-[0_0_10px_rgba(201,168,76,0.6)]" : "border border-white/25"
          )}
        />
      ))}
    </span>
  );
}

export function WebComparison() {
  const footerRow = ROWS.length + 2;

  return (
    <div
      className="grid grid-cols-1 md:py-8 md:grid-cols-[minmax(0,0.62fr)_minmax(0,1fr)_minmax(0,1.2fr)] md:gap-x-5 md:[grid-template-rows:repeat(var(--rows),auto)]"
      style={{ "--rows": footerRow } as CSSProperties}
    >
      {/* Pozadí karet přes všechny řádky. Naše karta přesahuje nahoru i dolů,
          ať je na první pohled vidět, která varianta je ta lepší. */}
      <div aria-hidden="true" className="relative hidden border border-white/[0.08] bg-white/[0.02] md:col-start-2 md:block md:[grid-row:1/-1]" />
      <div
        aria-hidden="true"
        className="relative -my-6 hidden border border-[#c9a84c]/50 bg-gradient-to-b from-[#1a150b] via-[#110e08] to-[#0c0a06] shadow-[0_0_90px_-24px_rgba(201,168,76,0.55)] md:col-start-3 md:block md:[grid-row:1/-1]"
      >
        <span className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#c9a84c]/30 via-[#e9cf7f] to-[#c9a84c]/30" />
        <span className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(ellipse_70%_100%_at_50%_0%,rgba(201,168,76,0.2),transparent_75%)]" />
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap bg-[#c9a84c] px-4 py-1.5 font-inter text-[12px] font-semibold uppercase tracking-[0.14em] text-[#080808] shadow-[0_0_30px_-4px_rgba(201,168,76,0.7)]">
          Doporučujeme
        </span>
      </div>

      {/* Hlavička sloupců (jen desktop), na mobilu nese každá buňka vlastní popisek. */}
      <p
        style={at(1)}
        className={cn(cell, "hidden items-end pb-8 font-inter text-[14px] font-medium uppercase leading-relaxed tracking-[0.14em] text-text-secondary md:col-start-1 md:flex")}
      >
        Co musí mít
        <br />
        každý web
      </p>
      <div style={at(1)} className={cn(cell, "hidden px-8 pb-8 pt-10 md:col-start-2 md:block")}>
        <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04]" aria-hidden="true">
          <Bot size={22} strokeWidth={1.5} className="text-text-secondary" />
        </span>
        <p className="font-cormorant text-[34px] font-normal leading-none text-[#d8d1c5]">Sami s AI</p>
        <p className="mt-3 font-inter text-[16px] text-text-secondary">Levný start, nejistý výsledek.</p>
      </div>
      <div style={at(1)} className={cn(cell, "hidden px-8 pb-8 pt-12 md:col-start-3 md:block")}>
        <p className="text-[42px] leading-none">
          <Vizeon font="cormorant" />
        </p>
        <p className="mt-4 font-inter text-[17px] font-medium text-[#e3c878]">Web, který pro vás vydělává.</p>
      </div>

      {ROWS.map((row, index) => {
        const DiyIcon = row.diyIcon ?? X;
        const fair = Boolean(row.diyIcon);
        const r = at(index + 2);
        return (
          <Fragment key={row.topic}>
            <div style={r} className={cn(cell, "border-t border-white/[0.1] pb-4 pt-10 md:col-start-1 md:py-8 md:pr-4")}>
              <p className="font-inter text-[14px] font-medium tabular-nums text-[#c9a84c]">{String(index + 1).padStart(2, "0")}</p>
              <h3 className="mt-1 font-cormorant text-[32px] font-normal leading-tight text-[#f0ece6] md:text-[34px]">{row.topic}</h3>
            </div>

            <div
              style={r}
              className={cn(
                cell,
                "flex gap-4 border border-white/[0.08] bg-white/[0.02] p-5 md:col-start-2 md:border-0 md:border-t md:border-white/[0.07] md:bg-transparent md:px-8 md:py-8"
              )}
            >
              <span
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                  fair ? "bg-white/[0.07] text-text-secondary" : "bg-[#d9776a]/15 text-[#e48a7d] ring-1 ring-[#d9776a]/35"
                )}
                aria-hidden="true"
              >
                <DiyIcon size={17} strokeWidth={2.25} />
              </span>
              <div>
                <p className="mb-1 font-inter text-[12px] font-medium uppercase tracking-[0.14em] text-text-secondary md:hidden">Sami s AI</p>
                <p className="font-inter text-[17px] leading-[1.6] text-[#c9c1b3] md:text-[18px]">{row.diy}</p>
              </div>
            </div>

            <div
              style={r}
              className={cn(
                cell,
                "mt-3 flex gap-4 border border-[#c9a84c]/45 bg-gradient-to-br from-[#17130a] to-[#0d0b07] p-5 shadow-[0_0_50px_-22px_rgba(201,168,76,0.6)] md:col-start-3 md:mt-0 md:border-0 md:border-t md:border-[#c9a84c]/20 md:bg-none md:px-8 md:py-8 md:shadow-none"
              )}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9a84c] shadow-[0_0_18px_-2px_rgba(201,168,76,0.75)]"
                aria-hidden="true"
              >
                <Check size={18} strokeWidth={3} className="text-[#080808]" />
              </span>
              <div>
                <p className="mb-1.5 text-[14px] md:hidden">
                  <Vizeon />
                </p>
                <p className="font-inter text-[19px] font-semibold leading-snug text-[#f6f2ea] md:text-[20px]">{row.title}</p>
                <p className="mt-1.5 font-inter text-[16px] leading-[1.6] text-[#d6cebf] md:text-[17px]">{row.text}</p>
              </div>
            </div>
          </Fragment>
        );
      })}

      {/* Patička: skóre obou variant, u nás navíc CTA. */}
      <div style={at(footerRow)} className={cn(cell, "hidden border-t border-white/[0.07] px-8 py-9 md:col-start-2 md:block")}>
        <p className="font-inter text-[13px] font-medium uppercase tracking-[0.14em] text-text-secondary">Jistota výsledku</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="font-cormorant text-[44px] leading-none lining-nums text-text-secondary">0 / {ROWS.length}</span>
          <ScoreDots filled={0} />
        </div>
      </div>
      <div
        style={at(footerRow)}
        className={cn(
          cell,
          "mt-8 border border-[#c9a84c]/45 bg-[#100d08] p-6 md:col-start-3 md:mt-0 md:border-0 md:border-t md:border-[#c9a84c]/20 md:bg-transparent md:px-8 md:pb-10 md:pt-9"
        )}
      >
        <p className="font-inter text-[13px] font-medium uppercase tracking-[0.14em] text-[#e3c878]">Jistota výsledku</p>
        <div className="mt-4 flex items-center gap-4">
          <span className="text-gleam font-cormorant text-[44px] leading-none lining-nums">{ROWS.length} / {ROWS.length}</span>
          <ScoreDots filled={ROWS.length} />
        </div>
        <CTAButton className="mt-7 flex w-full items-center justify-center bg-[#c9a84c] px-6 py-4 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] text-[#080808] shadow-[0_0_44px_-8px_rgba(201,168,76,0.6)] transition-all duration-300 hover:bg-[#d4b968]">
          Chci web, který prodává →
        </CTAButton>
      </div>
    </div>
  );
}
