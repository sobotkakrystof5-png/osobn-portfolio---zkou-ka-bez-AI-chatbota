"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  BellRing,
  Bot,
  CalendarCheck,
  ClipboardList,
  CreditCard,
  Inbox,
  MailCheck,
  ReceiptText,
  Sheet,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { CTAButton } from "@/components/CTAButton";
import { brandText } from "@/components/brand/BrandName";
import { cn } from "@/lib/utils";
import { EASE, HeroCtas, LockupLine, rise } from "./shared";

// Návrh C, „Výsledek, ne web“: motto webu jako H1 přes celou šířku a pod
// ním panel, kde si návštěvník vybere, co má jeho web dělat. Panel hned
// přehraje, jak to vypadá v provozu, a řekne, co pro to postavíme. Dokud
// návštěvník nic nevybere, panel sám střídá všechny čtyři cíle.
// Události jsou ukázkové, bez čísel o skutečných klientech a bez cen služeb.

type Goal = {
  id: string;
  label: string;
  steps: { icon: LucideIcon; title: string; sub: string }[];
  build: string[];
  cta: string;
};

const GOALS: Goal[] = [
  {
    id: "poptavky",
    label: "Poptávky",
    steps: [
      { icon: Inbox, title: "Nová poptávka z webu", sub: "Rekonstrukce koupelny · Jana N." },
      { icon: MailCheck, title: "Potvrzení odešlo zákazníkovi", sub: "Automaticky, bez vás" },
      { icon: ClipboardList, title: "Zapsáno do přehledu zakázek", sub: "I s fotkou a rozměry" },
      { icon: BellRing, title: "Upozornění vám do mobilu", sub: "Ozvete se, kdy se vám hodí" },
    ],
    build: ["Pro Web", "Poptávkový formulář", "Automatizace"],
    cta: "Chci víc poptávek",
  },
  {
    id: "prodej",
    label: "Objednávky",
    steps: [
      { icon: ShoppingBag, title: "Nová objednávka #1042", sub: "Keramický hrnek, sada 2 ks · 890 Kč" },
      { icon: CreditCard, title: "Zaplaceno kartou", sub: "Peníze míří na váš účet" },
      { icon: ReceiptText, title: "Faktura odeslána zákazníkovi", sub: "Bez ručního přepisování" },
      { icon: Truck, title: "Předáno dopravci", sub: "Zásilkovna · sledování v e-mailu" },
    ],
    build: ["E-shop na míru", "Platby a doprava", "Napojení skladu"],
    cta: "Chci prodávat online",
  },
  {
    id: "kalendar",
    label: "Rezervace",
    steps: [
      { icon: CalendarCheck, title: "Nová rezervace", sub: "Út 14:00 · masáž 60 minut" },
      { icon: MailCheck, title: "Potvrzení zákazníkovi", sub: "S adresou a pokyny" },
      { icon: BellRing, title: "Připomínka den předem", sub: "Méně zapomenutých termínů" },
      { icon: ClipboardList, title: "Termín v kalendáři ZakazIQ", sub: "Přístup na doživotí" },
    ],
    build: ["Web na míru", "Rezervace v ZakazIQ", "Připomínky"],
    cta: "Chci plný kalendář",
  },
  {
    id: "cas",
    label: "Volný čas",
    steps: [
      { icon: Bot, title: "AI odpověděla na dotaz", sub: "Otevírací doba a ceník, ve 22:14" },
      { icon: ReceiptText, title: "Faktura přečtena a zapsána", sub: "Rovnou do účetnictví" },
      { icon: Sheet, title: "Data jsou v tabulce", sub: "Bez kopírování" },
      { icon: BellRing, title: "Hlášení jen, když jste potřeba", sub: "Zbytek vyřeší systém" },
    ],
    build: ["Automatizace s ALTENO", "AI agenti", "Napojení vašich nástrojů"],
    cta: "Chci ušetřit čas",
  },
];

const STEP_MS = 900;
const HOLD_MS = 2600;

export default function HeroC() {
  const reduced = usePrefersReducedMotion();
  const [goalIndex, setGoalIndex] = useState(0);
  const [done, setDone] = useState(0);
  // Po prvním kliknutí přestane panel cíle střídat sám.
  const [picked, setPicked] = useState(false);

  const goal = GOALS[goalIndex];

  useEffect(() => {
    if (reduced) {
      setDone(goal.steps.length);
      return;
    }
    const finished = done >= goal.steps.length;
    if (finished && picked) return;
    const timer = window.setTimeout(
      () => {
        if (finished) {
          setGoalIndex((index) => (index + 1) % GOALS.length);
          setDone(0);
        } else {
          setDone((value) => value + 1);
        }
      },
      finished ? HOLD_MS : done === 0 ? 700 : STEP_MS
    );
    return () => window.clearTimeout(timer);
  }, [done, reduced, picked, goal.steps.length]);

  const choose = (index: number) => {
    setPicked(true);
    setGoalIndex(index);
    setDone(0);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="hero" aria-label="Úvodní sekce" className="relative overflow-hidden bg-[#080808]">
        <div className="mx-auto max-w-7xl px-6 pb-20 pt-28 md:px-12 md:pt-40 lg:pb-24 lg:pt-36">
          <h1 className="font-cormorant font-light leading-[0.98] tracking-[-0.02em] text-[#f0ece6] text-[clamp(42px,8vw,120px)]">
            <motion.span {...rise(0.05)} className="block">
              Nekupujete si web.
            </motion.span>{" "}
            <motion.span {...rise(0.15)} className="block text-[#c9a84c]">
              Kupujete si výsledky.
            </motion.span>
          </h1>

          <div className="mt-12 grid gap-12 md:mt-16 lg:grid-cols-2 lg:gap-12">
            <div>
              <motion.p {...rise(0.3)} className="max-w-md font-inter text-[17px] leading-[1.75] text-text-secondary md:text-[18px]">
                Stavíme weby a e-shopy na míru pro firmy a živnostníky. Přivedou vám zákazníky a automatizace za vás
                vyřídí, co následuje.
              </motion.p>
              <motion.div {...rise(0.4)}>
                <HeroCtas className="mt-9" />
              </motion.div>
              <motion.div {...rise(0.5)}>
                <LockupLine className="mt-9" />
              </motion.div>
            </div>

            {/* Živý panel: vyberte cíl a uvidíte ho v provozu. */}
            <motion.div {...rise(0.35)} data-ui className="border border-[#c9a84c]/30 bg-[#0b0b0b]">
              <div className="px-5 pt-5 md:px-6">
                <p id="hero-c-goal" className="font-inter text-[15px] text-[#f0ece6]">
                  Co vám má web přinášet?
                </p>
                <div role="tablist" aria-labelledby="hero-c-goal" className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {GOALS.map((item, index) => {
                    const isActive = index === goalIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="hero-c-panel"
                        onClick={() => choose(index)}
                        className={cn(
                          "px-3 py-3 text-left font-inter text-[13.5px] transition-colors duration-300 sm:text-center",
                          isActive
                            ? "bg-[#c9a84c] font-medium text-[#080808]"
                            : "bg-white/[0.04] text-text-secondary hover:bg-white/[0.08] hover:text-[#f0ece6]"
                        )}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div id="hero-c-panel" role="tabpanel" aria-live="polite" className="px-5 pb-2 pt-4 md:px-6">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.ol
                    key={goal.id}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -14 }}
                    transition={{ duration: 0.35, ease: EASE }}
                  >
                    {goal.steps.map((step, index) => {
                      const isDone = index < done;
                      const Icon = step.icon;
                      return (
                        <li key={step.title} className="flex items-center gap-4 py-2.5">
                          <motion.span
                            initial={false}
                            animate={{
                              backgroundColor: isDone ? "#c9a84c" : "#0b0b0b",
                              borderColor: isDone ? "#c9a84c" : "rgba(255,255,255,0.14)",
                              scale: isDone && index === done - 1 ? [1, 1.15, 1] : 1,
                            }}
                            transition={{ duration: 0.45, ease: EASE }}
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border"
                          >
                            <Icon size={15} strokeWidth={isDone ? 2 : 1.5} className={isDone ? "text-[#080808]" : "text-text-muted"} />
                          </motion.span>
                          <span className="min-w-0">
                            <span
                              className={cn(
                                "block truncate font-inter text-[14.5px] transition-colors duration-500",
                                isDone ? "text-[#f0ece6]" : "text-text-muted"
                              )}
                            >
                              {step.title}
                            </span>
                            <span className="block truncate font-inter text-[12.5px] text-text-muted">{step.sub}</span>
                          </span>
                        </li>
                      );
                    })}
                  </motion.ol>
                </AnimatePresence>
              </div>

              <div className="flex flex-col gap-4 border-t border-white/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
                <p className="font-inter text-[13px] text-text-muted">
                  Postavíme:{" "}
                  {goal.build.map((part, index) => (
                    <span key={part} className="text-[#f0ece6]">
                      {index > 0 && <span className="text-text-muted"> · </span>}
                      {brandText(part)}
                    </span>
                  ))}
                </p>
                <CTAButton className="shrink-0 font-inter text-[14px] font-medium text-[#c9a84c] transition-colors duration-300 hover:text-[#d4b968]">
                  {goal.cta} →
                </CTAButton>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
