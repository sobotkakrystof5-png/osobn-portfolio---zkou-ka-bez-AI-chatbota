"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Workflow, CalendarCheck, Cable, LayoutDashboard, ArrowRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { brandText } from "@/components/brand/BrandName";

// „Víc než web": automatizace a ZakazIQ ve čtyřech rámečcích. Vlevo rámečky
// jako taby, vpravo detail vybraného. Myš přepíná najetím, dotyk klepnutím,
// klávesnice šipkami (vzor Tabs z WAI-ARIA APG). Panely leží v jedné buňce
// gridu přes sebe, takže výška sekce se při přepnutí nemění a text všech
// panelů je v HTML. Až budou screenshoty ZakazIQ, patří do panelu místo
// velké ikony.
type Frame = {
  id: string;
  icon: LucideIcon;
  title: string;
  lead: string;
  body: string;
  points: string[];
  href: string;
  cta: string;
};

const FRAMES: Frame[] = [
  {
    id: "automatizace",
    icon: Workflow,
    title: "Automatizace v našich procesech",
    lead: "Ověřené ve vlastním podnikání.",
    body: "Automatizace používáme ve vlastních procesech každý den, takže víme, co v praxi funguje. Stejné postupy nastavíme i vám. Postaví je naše sesterská značka ALTENO.",
    points: ["Ověřené u nás", "Nastavíme je i vám", "Ve spolupráci s ALTENO"],
    href: "/automatizace",
    cta: "Automatizace",
  },
  {
    id: "zakaziq",
    icon: CalendarCheck,
    title: "Vlastní systém ZakazIQ",
    lead: "Rezervační systém, který sami používáme.",
    body: "Přes ZakazIQ se s klienty domlouváme na konzultacích a máme v něm přehled o všech projektech. Teď z něj děláme produkt i pro další firmy.",
    points: ["Rezervace konzultací", "Přehled o projektech", "Vyvíjíme ho i pro další firmy"],
    href: "/zakaziq",
    cta: "Více o ZakazIQ",
  },
  {
    id: "napojeni",
    icon: Cable,
    title: "Web napojený na ZakazIQ",
    lead: "Web a systém od jednoho dodavatele.",
    body: "Postavíme vám web a napojíme vás přímo do ZakazIQ, který pak můžete používat na doživotí. Web i systém na sebe od začátku navazují.",
    points: ["Web na míru", "Napojení na ZakazIQ", "Přístup na doživotí"],
    href: "#kontakt",
    cta: "Chci web se ZakazIQ",
  },
  {
    id: "prehled",
    icon: LayoutDashboard,
    title: "Celé podnikání na jednom místě",
    lead: "Klienti, zakázky i finance pohromadě.",
    body: "V ZakazIQ máte přehled o klientech, zakázkách i financích na jednom místě. Systém si upravíte úplně sami, podle toho, jak pracujete.",
    points: ["Klienti", "Zakázky", "Finance"],
    href: "/zakaziq",
    cta: "Více o ZakazIQ",
  },
];

const ARROW_STEP: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

export default function MoreThanWeb() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number | null = null;
    if (event.key in ARROW_STEP) next = (index + ARROW_STEP[event.key] + FRAMES.length) % FRAMES.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = FRAMES.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  function onPointerEnter(event: PointerEvent<HTMLButtonElement>, index: number) {
    // Jen skutečná myš: dotyk posílá emulované najetí těsně před klepnutím.
    if (event.pointerType === "mouse") setActive(index);
  }

  return (
    <section id="vic-nez-web" className="py-24 md:py-32 bg-[#0e0e0e]" aria-labelledby="vic-nez-web-nadpis">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className={cn(t.eyebrow, "mb-4")}>
          — Víc než web
        </motion.p>
        <motion.h2 id="vic-nez-web-nadpis" variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl">
          Web je teprve začátek.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className={cn(t.lead, "max-w-2xl mb-12 md:mb-14")}>
          Nejsme jen tvůrci webů. Automatizace a vlastní systém ZakazIQ používáme sami a nastavíme je i vám.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="grid gap-5 lg:grid-cols-12 lg:gap-8">
          <div role="tablist" aria-label="Co od nás dostanete navíc" className="grid grid-cols-2 gap-3 lg:col-span-5 lg:grid-cols-1 lg:gap-4">
            {FRAMES.map((frame, index) => {
              const selected = index === active;
              return (
                <button
                  key={frame.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`vic-nez-web-tab-${frame.id}`}
                  aria-selected={selected}
                  aria-controls={`vic-nez-web-panel-${frame.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onPointerEnter={(event) => onPointerEnter(event, index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "group relative flex flex-col gap-3 p-4 text-left border transition-colors duration-300 lg:flex-row lg:items-center lg:gap-5 lg:p-6",
                    selected ? "border-[#c9a84c]/60 bg-[#c9a84c]/[0.06]" : "border-white/[0.06] bg-[#111111] hover:border-[#c9a84c]/30"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn("absolute inset-y-0 left-0 hidden w-[2px] bg-[#c9a84c] transition-opacity duration-300 lg:block", selected ? "opacity-100" : "opacity-0")}
                  />
                  <span
                    aria-hidden="true"
                    className={cn("w-10 h-10 shrink-0 border flex items-center justify-center transition-colors duration-300", selected ? "border-[#c9a84c]/80" : "border-[#c9a84c]/35")}
                  >
                    <frame.icon size={17} strokeWidth={1.5} className="text-[#c9a84c]" />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className={cn("font-inter font-medium text-[14px] leading-snug transition-colors duration-300 lg:text-[15px]", selected ? "text-[#f0ece6]" : "text-text-secondary group-hover:text-[#f0ece6]")}>
                      {frame.title}
                    </span>
                    <span className="hidden font-inter font-normal text-[13px] leading-snug text-text-muted lg:block">{frame.lead}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid lg:col-span-7">
            {FRAMES.map((frame, index) => {
              const selected = index === active;
              return (
                <div
                  key={frame.id}
                  role="tabpanel"
                  id={`vic-nez-web-panel-${frame.id}`}
                  aria-labelledby={`vic-nez-web-tab-${frame.id}`}
                  className={cn(
                    "glass-panel [grid-area:1/1] flex flex-col p-7 md:p-10 transition-[opacity,visibility] duration-300",
                    selected ? "visible opacity-100" : "invisible opacity-0"
                  )}
                >
                  <div className="flex items-start justify-between mb-8">
                    <span className="w-14 h-14 border border-[#c9a84c]/50 flex items-center justify-center" aria-hidden="true">
                      <frame.icon size={24} strokeWidth={1.25} className="text-[#c9a84c]" />
                    </span>
                    <span className="font-cormorant font-light text-[56px] leading-none text-[#c9a84c]/25 select-none" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-cormorant font-light text-[28px] md:text-[36px] leading-[1.15] text-[#f0ece6] mb-3">{frame.title}</h3>
                  <p className="font-inter font-medium text-[14px] text-[#c9a84c] mb-5">{frame.lead}</p>
                  <p className="font-inter font-normal text-[15px] md:text-[16px] text-text-secondary leading-[1.8] mb-8 max-w-xl">{brandText(frame.body)}</p>
                  <ul className="flex flex-wrap gap-2 mb-10">
                    {frame.points.map((point) => (
                      <li key={point} className="font-inter font-normal text-[12px] uppercase tracking-[0.12em] text-[#f0ece6] border border-white/[0.1] px-3 py-1.5">
                        {brandText(point)}
                      </li>
                    ))}
                  </ul>
                  <Link href={frame.href}
                    className="mt-auto inline-flex w-fit items-center gap-2 font-inter font-medium text-[12px] tracking-[0.1em] uppercase text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-300">
                    {frame.cta} <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
