"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { ChartColumn, Check, CreditCard, Mail, Megaphone, ReceiptText, Truck, Warehouse, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// „Vše v jedné platformě“: e-shop uprostřed, kolem něj všechno, co na něj
// napojíme. Po spojnicích tečou tečky do středu (data proudí do e-shopu).
// Uzly se samy střídají, dokud na některý klient neklikne nebo nenajede,
// pak výběr nechávají na něm. Vpravo detail vybraného uzlu.
type Node = { icon: LucideIcon; label: string; title: string; text: string; checks: string[] };

const NODES: Node[] = [
  {
    icon: CreditCard,
    label: "Platby",
    title: "Platby",
    text: "Platební brána napojená přímo na e-shop. Zákazník zaplatí hned v objednávce.",
    checks: ["Platba kartou a převodem", "Dobírka", "Peníze rovnou na váš účet"],
  },
  {
    icon: Truck,
    label: "Doprava",
    title: "Doprava",
    text: "Dopravci a výdejní místa přímo v pokladně, včetně štítků a sledování.",
    checks: ["Zásilkovna, Balíkovna, PPL, DPD", "Ceny dopravy podle košíku", "Sledování zásilek"],
  },
  {
    icon: Warehouse,
    label: "Sklad",
    title: "Sklad",
    text: "Zásoby se odečítají samy. Nebo balení převezme sklad, který to dělá za vás.",
    checks: ["Skladové zásoby v e-shopu", "Napojení balicího skladu", "Hlídání docházejícího zboží"],
  },
  {
    icon: ReceiptText,
    label: "Faktury",
    title: "Faktury",
    text: "Ke každé objednávce faktura, bez přepisování a bez zapomínání.",
    checks: ["Automatické faktury", "Napojení na fakturační systém", "Podklady pro účetní"],
  },
  {
    icon: Mail,
    label: "E-maily",
    title: "E-maily zákazníkům",
    text: "Zákazník ví, co se s jeho objednávkou děje, a vy nemusíte nic psát.",
    checks: ["Potvrzení objednávky", "Info o odeslání", "Připomenutí opuštěného košíku"],
  },
  {
    icon: Megaphone,
    label: "Reklamy",
    title: "Reklamy",
    text: "E-shop připravený na Google a Meta reklamy hned od spuštění.",
    checks: ["Měřicí kódy a pixel", "Produktový feed", "Remarketing"],
  },
  {
    icon: ChartColumn,
    label: "Analytika",
    title: "Analytika",
    text: "Vidíte, co se prodává, odkud zákazníci chodí a co vám vydělává.",
    checks: ["Google Analytics", "Měření objednávek", "Přehled tržeb"],
  },
  {
    icon: Wrench,
    label: "Správa",
    title: "Správa a podpora",
    text: "Po spuštění vás v tom nenecháme. Ukážeme vám správu a pomůžeme s čímkoli.",
    checks: ["Zaškolení", "Úpravy a nové funkce", "Odpověď do 24 hodin"],
  },
];

const SIZE = 400;
const CENTER = SIZE / 2;
const RADIUS = 152;
const CYCLE_MS = 3800;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Uzly po kruhu, první nahoře, po směru hodinových ručiček.
const POINTS = NODES.map((_, index) => {
  const angle = (index / NODES.length) * Math.PI * 2 - Math.PI / 2;
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
});

const pct = (value: number) => `${(value / SIZE) * 100}%`;

export function PlatformHub() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-20% 0px" });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched || !inView || reduced) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % NODES.length), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [touched, inView, reduced]);

  const choose = (index: number) => {
    setTouched(true);
    setActive(index);
  };

  const node = NODES[active];
  const ActiveIcon = node.icon;

  return (
    <div ref={rootRef} className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20">
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none" aria-hidden="true" className="absolute inset-0 h-full w-full">
          <circle cx={CENTER} cy={CENTER} r={RADIUS} stroke="#ffffff" strokeOpacity="0.05" strokeDasharray="2 6" />
          {POINTS.map((point, index) => (
            <motion.line
              key={index}
              x1={CENTER}
              y1={CENTER}
              x2={point.x}
              y2={point.y}
              stroke="#c9a84c"
              initial={{ pathLength: reduced ? 1 : 0, strokeOpacity: 0.18 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              animate={{ strokeOpacity: index === active ? 0.9 : 0.18 }}
              transition={{ pathLength: { duration: 0.9, delay: reduced ? 0 : 0.2 + index * 0.08, ease: EASE }, strokeOpacity: { duration: 0.4 } }}
            />
          ))}
          {/* Tečky tečou od uzlů do e-shopu. */}
          {!reduced &&
            POINTS.map((point, index) => (
              <motion.circle
                key={`dot-${index}`}
                r={index === active ? 3.5 : 2.5}
                fill="#c9a84c"
                initial={{ cx: point.x, cy: point.y, opacity: 0 }}
                animate={{ cx: [point.x, CENTER], cy: [point.y, CENTER], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 2.4, delay: index * 0.3, repeat: Infinity, repeatDelay: 0.6, ease: "easeIn" }}
              />
            ))}
        </svg>

        {/* Střed: e-shop. */}
        <div className="absolute left-1/2 top-1/2 flex h-[34%] w-[34%] -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full border border-[#c9a84c]/60 bg-[#100e09] text-center shadow-[0_0_70px_-10px_rgba(201,168,76,0.5)]">
          <span className="font-cormorant text-[22px] leading-none text-[#f0ece6] sm:text-[28px]">Váš e-shop</span>
          <span className="mt-1.5 font-inter text-[10px] uppercase tracking-[0.12em] text-[#c9a84c] sm:text-[11px]">Shopify · vlastní kód</span>
        </div>

        {POINTS.map((point, index) => {
          const Icon = NODES[index].icon;
          const isActive = index === active;
          return (
            <button
              key={NODES[index].label}
              type="button"
              onClick={() => choose(index)}
              onMouseEnter={() => choose(index)}
              aria-pressed={isActive}
              aria-controls="platforma-detail"
              className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5 focus-visible:outline-none"
              style={{ left: pct(point.x), top: pct(point.y) }}
            >
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-300 sm:h-14 sm:w-14",
                  "group-focus-visible:ring-2 group-focus-visible:ring-[#c9a84c]/60",
                  isActive
                    ? "scale-110 border-[#c9a84c] bg-[#c9a84c] text-[#080808] shadow-[0_0_34px_rgba(201,168,76,0.55)]"
                    : "border-[#c9a84c]/30 bg-[#0b0b0b] text-[#c9a84c] group-hover:border-[#c9a84c]/70"
                )}
              >
                <Icon size={20} strokeWidth={1.5} />
              </span>
              <span
                className={cn(
                  "whitespace-nowrap font-inter text-[11px] transition-colors duration-300 sm:text-[13px]",
                  isActive ? "text-[#f0ece6]" : "text-text-secondary"
                )}
              >
                {NODES[index].label}
              </span>
            </button>
          );
        })}
      </div>

      <div id="platforma-detail" aria-live="polite" className="relative min-h-[300px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="border border-[#c9a84c]/25 bg-[#0b0b0b] p-7 md:p-9"
          >
            <span className="flex h-12 w-12 items-center justify-center border border-[#c9a84c]/40 bg-[#c9a84c]/[0.08]" aria-hidden="true">
              <ActiveIcon size={22} strokeWidth={1.25} className="text-[#c9a84c]" />
            </span>
            <h3 className="mt-6 font-cormorant font-light text-[32px] leading-none text-[#f0ece6] md:text-[40px]">{node.title}</h3>
            <p className="mt-4 font-inter text-[16px] leading-[1.75] text-text-secondary md:text-[17px]">{node.text}</p>
            <ul className="mt-6 space-y-3">
              {node.checks.map((check, index) => (
                <motion.li
                  key={check}
                  initial={reduced ? false : { opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: reduced ? 0 : 0.12 + index * 0.1, ease: EASE }}
                  className="flex items-center gap-3 font-inter text-[15px] text-[#f0ece6]"
                >
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9a84c]" aria-hidden="true">
                    <Check size={11} strokeWidth={3} className="text-[#080808]" />
                  </span>
                  {check}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        {/* Ukazatel, kolikátý uzel je právě vybraný. */}
        <div className="mt-5 flex gap-2" aria-hidden="true">
          {NODES.map((item, index) => (
            <span
              key={item.label}
              className={cn(
                "h-1 flex-1 transition-colors duration-500",
                index === active ? "bg-[#c9a84c]" : "bg-white/[0.08]"
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
