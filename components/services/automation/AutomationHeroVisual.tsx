"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { BellRing, CalendarClock, Check, Inbox, MailCheck, Sparkles, Table2 } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// Hero stránky Automatizace: poptávka přijde mimo pracovní dobu a sama
// projde celým zpracováním (potvrzení, zápis, odpověď, upozornění,
// připomínka). Stejná mechanika jako EshopHeroVisual. Poptávky jsou
// ukázkové, žádné skutečné osoby ani klienti.
const INQUIRIES = [
  { id: 1, name: "Jana N.", topic: "Rekonstrukce koupelny", source: "Formulář na webu", time: "21:47" },
  { id: 2, name: "Petr D.", topic: "Termín na servis auta", source: "E-mail", time: "06:12" },
  { id: 3, name: "Lucie K.", topic: "Cena svatebního focení", source: "Chat na webu", time: "23:05" },
];

const STEPS = [
  { icon: MailCheck, label: "Potvrzení odesláno zákazníkovi" },
  { icon: Table2, label: "Zapsáno do tabulky zakázek" },
  { icon: Sparkles, label: "AI připravila odpověď na dotaz" },
  { icon: BellRing, label: "Upozornění vám do mobilu" },
  { icon: CalendarClock, label: "Připomínka termínu naplánovaná" },
];

const STEP_MS = 1000;
const HOLD_MS = 2400;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function AutomationHeroVisual({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  // Kolik kroků je hotových (0 až STEPS.length).
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (reduced) {
      setDone(STEPS.length);
      return;
    }
    const finished = done >= STEPS.length;
    const timer = window.setTimeout(
      () => {
        if (finished) {
          setIndex((value) => (value + 1) % INQUIRIES.length);
          setDone(0);
        } else {
          setDone((value) => value + 1);
        }
      },
      finished ? HOLD_MS : done === 0 ? 1400 : STEP_MS
    );
    return () => window.clearTimeout(timer);
  }, [done, reduced]);

  const inquiry = INQUIRIES[index];
  const finished = done >= STEPS.length;

  return (
    <div
      role="img"
      aria-label="Ukázka: poptávka přijde večer a automatizace ji sama potvrdí, zapíše, připraví odpověď a upozorní vás"
      className={cn("relative mx-auto w-full max-w-[440px]", className)}
    >
      <span aria-hidden="true" className="absolute inset-x-6 inset-y-10 rounded-full bg-[#c9a84c]/[0.13] blur-3xl" />

      {/* Upozornění na novou poptávku vyskočí nad kartou. */}
      <div aria-hidden="true" className="relative mb-4 flex h-[52px] justify-end">
        <AnimatePresence mode="wait">
          <motion.div
            key={inquiry.id}
            initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex items-center gap-3 border border-[#c9a84c]/35 bg-[#100e09] px-4 py-3"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#c9a84c]">
              <Inbox size={14} strokeWidth={2} className="text-[#080808]" />
            </span>
            <span className="font-inter text-[13px] text-[#f0ece6]">
              Nová poptávka <span className="tabular-nums text-[#c9a84c]">· {inquiry.time}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div aria-hidden="true" className="relative border border-[#c9a84c]/30 bg-[#0b0b0b] shadow-[0_0_80px_-24px_rgba(201,168,76,0.45)]">
        <div className="flex items-center justify-between border-b border-white/[0.06] px-6 py-4">
          <span className="font-inter text-[12px] uppercase tracking-[0.14em] text-text-muted">Poptávka</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={inquiry.id}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-inter text-[13px] text-[#f0ece6]"
            >
              {inquiry.source}
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="flex items-center gap-4 px-6 py-5">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-[#c9a84c]/30 bg-[#c9a84c]/[0.08]">
            <Inbox size={22} strokeWidth={1.25} className="text-[#c9a84c]" />
          </span>
          <AnimatePresence mode="wait">
            <motion.div
              key={inquiry.id}
              initial={reduced ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="min-w-0"
            >
              <p className="truncate font-inter text-[15px] text-[#f0ece6]">{inquiry.topic}</p>
              <p className="mt-1 font-cormorant text-[24px] leading-none text-[#f0ece6]">{inquiry.name}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Kroky: svislá linka se plní, jak poptávka postupuje. Řádek má
            56 px (kroužek 36 + 2 × 10), linka vede středy kroužků. */}
        <ol className="relative px-6 pb-6 pt-1">
          <span className="absolute left-[41.5px] top-[32px] h-[224px] w-px bg-white/[0.08]" />
          <motion.span
            className="absolute left-[41.5px] top-[32px] h-[224px] w-px origin-top bg-[#c9a84c]"
            initial={false}
            animate={{ scaleY: Math.max(0, done - 1) / (STEPS.length - 1) }}
            transition={{ duration: reduced ? 0 : 0.6, ease: EASE }}
          />
          {STEPS.map((step, stepIndex) => {
            const isDone = stepIndex < done;
            const Icon = step.icon;
            return (
              <li key={step.label} className="relative flex items-center gap-4 py-2.5">
                <motion.span
                  initial={false}
                  animate={{
                    backgroundColor: isDone ? "#c9a84c" : "#0b0b0b",
                    borderColor: isDone ? "#c9a84c" : "rgba(255,255,255,0.14)",
                    scale: isDone && !reduced && stepIndex === done - 1 ? [1, 1.18, 1] : 1,
                  }}
                  transition={{ duration: reduced ? 0 : 0.45, ease: EASE }}
                  className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                >
                  {isDone ? (
                    <Check size={16} strokeWidth={2.5} className="text-[#080808]" />
                  ) : (
                    <Icon size={15} strokeWidth={1.5} className="text-text-muted" />
                  )}
                </motion.span>
                <span
                  className={cn(
                    "font-inter text-[14px] transition-colors duration-500",
                    isDone ? "text-[#f0ece6]" : "text-text-muted"
                  )}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ol>

        <div className="flex items-center justify-between border-t border-white/[0.06] px-6 py-4">
          <span className="font-inter text-[13px] text-text-muted">Vy u toho být nemusíte</span>
          <motion.span
            initial={false}
            animate={{ opacity: finished ? 1 : 0.35 }}
            className="font-inter text-[12px] font-medium uppercase tracking-[0.12em] text-[#c9a84c]"
          >
            {finished ? "Vyřízeno ✓" : "Zpracovává se"}
          </motion.span>
        </div>
      </div>
    </div>
  );
}
