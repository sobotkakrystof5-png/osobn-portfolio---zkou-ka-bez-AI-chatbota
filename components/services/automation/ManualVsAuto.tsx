"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { CalendarClock, Check, Clock, Inbox, MessagesSquare, ReceiptText, Table2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// Jedna poptávka ve dvou verzích: ručně, nebo s automatizací. Po najetí se
// sama přepne na „S automatizací“, pak přepíná klient (stejně jako graf
// v EshopAdsBand). Žádná úspora v hodinách ani procentech, jen co se
// v každém kroku stane.
type Row = { icon: LucideIcon; moment: string; manual: string; auto: string };

const ROWS: Row[] = [
  {
    icon: Inbox,
    moment: "Poptávka v pátek večer",
    manual: "Uvidíte ji v pondělí. Pokud ji nepřehlédnete.",
    auto: "Zákazník hned dostane potvrzení.",
  },
  {
    icon: Table2,
    moment: "Zápis poptávky",
    manual: "Přepisujete ji do tabulky.",
    auto: "Do tabulky se zapíše sama.",
  },
  {
    icon: MessagesSquare,
    moment: "Dotaz na cenu a termín",
    manual: "Píšete pořád stejnou odpověď.",
    auto: "Chatbot odpoví z vašich podkladů.",
  },
  {
    icon: CalendarClock,
    moment: "Den před termínem",
    manual: "Obvoláváte zákazníky.",
    auto: "Připomínka odejde sama.",
  },
  {
    icon: ReceiptText,
    moment: "Po zakázce",
    manual: "Večer doháníte faktury.",
    auto: "Faktura vznikne a odejde sama.",
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ManualVsAuto() {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, margin: "-25% 0px" });
  const [auto, setAuto] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || touched) return;
    const timer = window.setTimeout(() => setAuto(true), reduced ? 0 : 1400);
    return () => window.clearTimeout(timer);
  }, [inView, touched, reduced]);

  const choose = (value: boolean) => {
    setTouched(true);
    setAuto(value);
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        "border bg-[#0b0b0b] transition-[border-color,box-shadow] duration-700",
        auto ? "border-[#c9a84c]/35 shadow-[0_0_80px_-30px_rgba(201,168,76,0.45)]" : "border-white/[0.08]"
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.06] px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors duration-500",
              auto ? "bg-[#c9a84c] shadow-[0_0_12px_rgba(201,168,76,0.8)]" : "bg-white/25"
            )}
          />
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={auto ? "auto" : "manual"}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-inter text-[15px] font-medium text-[#f0ece6]"
            >
              {auto ? "Všechno běží samo" : "5 věcí čeká na vás"}
            </motion.p>
          </AnimatePresence>
        </div>
        <div className="flex border border-white/[0.08] p-1" role="group" aria-label="Přepnout ukázku">
          {[
            { value: false, label: "Ručně" },
            { value: true, label: "S automatizací" },
          ].map((option) => (
            <button
              key={option.label}
              type="button"
              aria-pressed={auto === option.value}
              onClick={() => choose(option.value)}
              className={cn(
                "px-3.5 py-2 font-inter text-[13px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]/60",
                auto === option.value ? "bg-[#c9a84c] text-[#080808]" : "text-text-secondary hover:text-[#f0ece6]"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <ul aria-live="polite">
        {ROWS.map((row, index) => {
          const Icon = row.icon;
          return (
            <li
              key={row.moment}
              className="grid gap-3 border-b border-white/[0.05] px-5 py-5 last:border-b-0 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] sm:items-center sm:gap-6 md:px-8"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/[0.08] bg-[#0e0e0e]" aria-hidden="true">
                  <Icon size={18} strokeWidth={1.4} className="text-[#c9a84c]" />
                </span>
                <span className="font-inter text-[15px] text-text-secondary">{row.moment}</span>
              </div>

              <div className="relative min-h-[28px] pl-14 sm:pl-0">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.p
                    key={auto ? "auto" : "manual"}
                    initial={reduced ? false : { opacity: 0, x: auto ? 14 : -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, x: auto ? -14 : 14 }}
                    transition={{ duration: 0.35, delay: reduced ? 0 : index * 0.07, ease: EASE }}
                    className="flex items-center gap-3 font-inter text-[15px] leading-snug"
                  >
                    {auto ? (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#c9a84c]" aria-hidden="true">
                        <Check size={13} strokeWidth={3} className="text-[#080808]" />
                      </span>
                    ) : (
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-white/15" aria-hidden="true">
                        <Clock size={12} strokeWidth={2} className="text-text-muted" />
                      </span>
                    )}
                    <span className={auto ? "text-[#f0ece6]" : "text-text-muted"}>{auto ? row.auto : row.manual}</span>
                  </motion.p>
                </AnimatePresence>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
