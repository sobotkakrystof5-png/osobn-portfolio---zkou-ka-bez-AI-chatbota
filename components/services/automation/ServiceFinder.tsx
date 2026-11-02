"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { Bot, Check, MessagesSquare, PhoneMissed, Repeat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ServiceArtwork from "@/components/automation/ServiceArtwork";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { automationIndex } from "@/lib/data/automation-index";
import { cn } from "@/lib/utils";

// „Co vás zdržuje nejvíc?“: klient vybere svou bolest a vpravo uvidí
// službu, která ji řeší, s odkazem na její podstránku. Výběr se sám
// střídá, dokud klient neklikne.
// Název a stav služby jdou z lehkého lib/data/automation-index.ts, summary
// posílá stránka ze serveru (plné automation-pages.ts do klientského JS
// netaháme). Fajfky shrnují kroky „Jak to funguje“ podstránky.
type Pick = { slug: string; icon: LucideIcon; pain: string; checks: string[] };

const PICKS: Pick[] = [
  {
    slug: "chatboti-rag",
    icon: MessagesSquare,
    pain: "Odpovídám pořád na stejné dotazy",
    checks: ["Odpovídá z vašich podkladů", "K odpovědi uvede zdroj", "Složitý dotaz předá vám"],
  },
  {
    slug: "automatizace-procesu",
    icon: Repeat,
    pain: "Přepisuju data z jednoho místa do druhého",
    checks: ["Zachytí e-mail, formulář i doklad", "AI přečte, co v něm je", "Výsledek pošle do vašich systémů"],
  },
  {
    slug: "ai-agenti",
    icon: Bot,
    pain: "Každý nestandardní případ čeká na mě",
    checks: ["Napojený na vaše data", "Drží se vašich pravidel", "Ptá se jen tam, kde má"],
  },
  {
    slug: "voice-agenti",
    icon: PhoneMissed,
    pain: "Nestíhám brát telefony",
    checks: ["Zvedne hovor i mimo pracovní dobu", "Vyřídí, nebo přepojí na vás", "Zápis hovoru pošle dál"],
  },
];

const ITEMS = PICKS.map((pick) => {
  const entry = automationIndex.find((page) => page.slug === pick.slug);
  if (!entry) throw new Error(`Chybí podstránka automatizace: ${pick.slug}`);
  return { ...pick, title: entry.title, comingSoon: Boolean(entry.comingSoon) };
});

const CYCLE_MS = 4200;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** `summaries`: slug → jednověté summary z lib/data/automation-pages.ts. */
export function ServiceFinder({ summaries }: { summaries: Record<string, string> }) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-20% 0px" });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched || !inView || reduced) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % ITEMS.length), CYCLE_MS);
    return () => window.clearInterval(timer);
  }, [touched, inView, reduced]);

  const choose = (index: number) => {
    setTouched(true);
    setActive(index);
  };

  const item = ITEMS[active];

  return (
    <div ref={rootRef} className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div>
        <p className="mb-5 font-inter text-[12px] uppercase tracking-[0.14em] text-text-muted">Váš problém</p>
        <ul className="space-y-3">
          {ITEMS.map((option, index) => {
            const Icon = option.icon;
            const isActive = index === active;
            return (
              <li key={option.slug}>
                <button
                  type="button"
                  onClick={() => choose(index)}
                  aria-pressed={isActive}
                  aria-controls="sluzba-detail"
                  className={cn(
                    "group relative flex w-full items-center gap-4 overflow-hidden border px-5 py-4 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]/60",
                    isActive
                      ? "border-[#c9a84c]/60 bg-[#100e09] shadow-[0_0_44px_-18px_rgba(201,168,76,0.5)]"
                      : "border-white/[0.07] bg-[#0b0b0b] hover:border-[#c9a84c]/30"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors duration-300",
                      isActive ? "border-[#c9a84c] bg-[#c9a84c] text-[#080808]" : "border-[#c9a84c]/30 text-[#c9a84c]"
                    )}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                  </span>
                  <span className={cn("font-inter text-[16px] leading-snug", isActive ? "text-[#f0ece6]" : "text-text-secondary group-hover:text-[#f0ece6]")}>
                    {option.pain}
                  </span>
                  {/* Proužek odpočítává, kdy se výběr sám posune. */}
                  {isActive && !touched && !reduced && inView ? (
                    <motion.span
                      key={`timer-${active}`}
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-[#c9a84c]/70"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                    />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div id="sluzba-detail" aria-live="polite" className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={item.slug}
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex h-full flex-col overflow-hidden border border-[#c9a84c]/25 bg-[#0b0b0b]"
          >
            <div className="h-40 border-b border-white/[0.06] sm:h-48">
              <ServiceArtwork slug={item.slug} id={`finder-${item.slug}`} />
            </div>
            <div className="flex flex-1 flex-col p-7 md:p-9">
              <p className="font-inter text-[12px] uppercase tracking-[0.14em] text-[#c9a84c]">Řešení</p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <h3 className="font-cormorant font-light text-[32px] leading-none text-[#f0ece6] md:text-[40px]">{item.title}</h3>
                {item.comingSoon ? (
                  <span className="border border-[rgba(201,168,76,0.4)] px-2.5 py-[3px] font-inter text-[10px] font-medium uppercase tracking-[0.1em] text-[#c9a84c]">
                    Připravujeme
                  </span>
                ) : null}
              </div>
              <p className="mt-4 font-inter text-[16px] leading-[1.7] text-text-secondary">{summaries[item.slug]}</p>
              <ul className="mt-6 space-y-3">
                {item.checks.map((check, index) => (
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
              <Link
                href={`/automatizace/${item.slug}`}
                className="mt-auto inline-flex w-fit items-center gap-2 pt-8 font-inter text-[13px] font-medium uppercase tracking-[0.1em] text-[#c9a84c] transition-colors duration-300 hover:text-[#d4b968]"
              >
                Jak to funguje →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
