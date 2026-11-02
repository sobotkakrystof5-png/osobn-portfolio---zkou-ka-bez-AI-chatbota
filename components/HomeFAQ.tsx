"use client";

import { useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, Globe, Plus, ShoppingBag, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeUp, revealInstant, viewport } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { CTAButton } from "@/components/CTAButton";
import { brandText } from "@/components/brand/BrandName";
import { HOME_FAQ } from "@/lib/data/home-faq";
import type { HomeFaqGroup } from "@/lib/data/home-faq";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Časté dotazy na homepage rozdělené záložkami podle nabídky. Všechny tři
// panely jsou v HTML vždy (neaktivní jen s `hidden`) a odpovědi se sbalují
// přes grid-template-rows, ne podmíněným mountem. Crawlery a AI enginy tak
// vidí všechny otázky i odpovědi, ne jen otevřenou (stejně jako FAQ.tsx).
const META: Record<HomeFaqGroup["id"], { icon: LucideIcon; more: string }> = {
  weby: { icon: Globe, more: "Vše o webech" },
  eshopy: { icon: ShoppingBag, more: "Vše o e-shopech" },
  automatizace: { icon: Workflow, more: "Vše o automatizacích" },
};

const EASE = [0.22, 1, 0.36, 1] as const;

const motionVariants = {
  list: { hidden: {}, visible: { transition: { staggerChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } },
} satisfies Record<string, Variants>;

const stillVariants = {
  list: { hidden: {}, visible: {} },
  item: revealInstant,
} satisfies Record<string, Variants>;

function questionCount(n: number) {
  if (n === 1) return "1 otázka";
  if (n >= 2 && n <= 4) return `${n} otázky`;
  return `${n} otázek`;
}

export default function HomeFAQ() {
  const reduced = usePrefersReducedMotion();
  const v = reduced ? stillVariants : motionVariants;
  const reveal = reduced ? revealInstant : fadeUp;

  const [active, setActive] = useState<HomeFaqGroup["id"]>(HOME_FAQ[0].id);
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const selectTab = (id: HomeFaqGroup["id"]) => {
    if (id === active) return;
    setActive(id);
    setOpenIndex(0);
  };

  // Šipky přepínají záložky (WAI-ARIA tabs), Home/End skočí na krajní.
  const onTabKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = HOME_FAQ.length - 1;
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (index + 1) % HOME_FAQ.length
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (index - 1 + HOME_FAQ.length) % HOME_FAQ.length
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? last
              : null;
    if (next === null) return;
    e.preventDefault();
    selectTab(HOME_FAQ[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="faq" aria-labelledby="faq-nadpis" className="relative overflow-clip bg-[#080808] py-24 md:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_45%_60%_at_85%_30%,rgba(201,168,76,0.08),transparent_70%)]"
      />

      <div className={cn(t.container.wide, "relative grid items-start gap-12 lg:grid-cols-12 lg:gap-16")}>
        <div className="lg:sticky lg:top-32 lg:col-span-4">
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} className={cn(t.eyebrow, "mb-5")}>
            — Časté dotazy
          </motion.p>
          <motion.h2
            id="faq-nadpis"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-cormorant font-light text-[40px] leading-[1.04] text-[#f0ece6] md:text-[60px]"
          >
            Ptáte se. <span className="text-shimmer">Odpovídáme.</span>
          </motion.h2>
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} className={cn(t.lead, "mt-6 max-w-sm")}>
            Vyberte, co řešíte.
          </motion.p>

          <motion.div
            role="tablist"
            aria-label="Témata častých dotazů"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="mt-9 grid grid-cols-3 gap-2 lg:grid-cols-1 lg:gap-3"
          >
            {HOME_FAQ.map((group, i) => {
              const { icon: Icon } = META[group.id];
              const isActive = group.id === active;
              return (
                <button
                  key={group.id}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`home-faq-tab-${group.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`home-faq-panel-${group.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectTab(group.id)}
                  onKeyDown={(e) => onTabKeyDown(e, i)}
                  className={cn(
                    "group relative flex min-h-[44px] flex-col items-center gap-2 border px-2 py-4 text-center transition-colors duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] lg:flex-row lg:gap-4 lg:px-5 lg:py-4 lg:text-left",
                    isActive ? "border-[#c9a84c]/50" : "border-white/[0.07] hover:border-white/20",
                  )}
                >
                  {isActive && (
                    <motion.span
                      aria-hidden="true"
                      layoutId="home-faq-tab"
                      transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 34 }}
                      className="absolute inset-0 bg-[#c9a84c]/[0.07]"
                    />
                  )}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "relative flex h-10 w-10 shrink-0 items-center justify-center border transition-colors duration-300",
                      isActive ? "border-[#c9a84c]/60 bg-[#c9a84c] text-[#080808]" : "border-white/10 text-[#c9a84c]",
                    )}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                  </span>
                  <span className="relative min-w-0 lg:flex-1">
                    <span
                      className={cn(
                        "block font-inter font-medium text-[13px] transition-colors duration-300 md:text-[15px]",
                        isActive ? "text-[#f0ece6]" : "text-text-secondary group-hover:text-[#f0ece6]",
                      )}
                    >
                      {group.label}
                    </span>
                    <span className="mt-0.5 hidden font-inter text-[12px] text-text-muted lg:block">{questionCount(group.items.length)}</span>
                  </span>
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className={cn(
                      "relative hidden shrink-0 transition-all duration-300 lg:block",
                      isActive ? "translate-x-0 text-[#c9a84c] opacity-100" : "-translate-x-1 text-text-muted opacity-0 group-hover:opacity-60",
                    )}
                  />
                </button>
              );
            })}
          </motion.div>
        </div>

        <div className="lg:col-span-8">
          {HOME_FAQ.map((group) => {
            const isActive = group.id === active;
            return (
              <div
                key={group.id}
                id={`home-faq-panel-${group.id}`}
                role="tabpanel"
                aria-labelledby={`home-faq-tab-${group.id}`}
                hidden={!isActive}
              >
                {/* Klíč s aktivní záložkou přehraje nástup otázek při každém přepnutí. */}
                <motion.ul
                  key={isActive ? "on" : "off"}
                  variants={v.list}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  className="flex flex-col gap-3"
                >
                  {group.items.map((faq, i) => {
                    const isOpen = isActive && openIndex === i;
                    const qId = `home-faq-q-${group.id}-${i}`;
                    const aId = `home-faq-a-${group.id}-${i}`;
                    return (
                      <motion.li
                        key={faq.question}
                        variants={v.item}
                        className={cn(
                          "border transition-colors duration-300",
                          isOpen ? "border-[#c9a84c]/35 bg-[#c9a84c]/[0.04]" : "border-white/[0.06] bg-white/[0.015] hover:border-white/15",
                        )}
                      >
                        <h3>
                          <button
                            id={qId}
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={aId}
                            onClick={() => setOpenIndex(isOpen ? null : i)}
                            className="group flex min-h-[44px] w-full items-center gap-4 px-5 py-5 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#c9a84c] md:gap-6 md:px-7"
                          >
                            <span aria-hidden="true" className="w-6 shrink-0 font-inter text-[12px] tabular-nums tracking-[0.08em] text-[#c9a84c]/70">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={cn(
                                "flex-1 font-inter font-medium text-[15px] transition-colors duration-300 md:text-[16px]",
                                isOpen ? "text-[#f0ece6]" : "text-[#f0ece6]/85 group-hover:text-[#f0ece6]",
                              )}
                            >
                              {brandText(faq.question)}
                            </span>
                            <span
                              aria-hidden="true"
                              className={cn(
                                "flex h-8 w-8 shrink-0 items-center justify-center border transition-all duration-300",
                                isOpen ? "border-[#c9a84c] bg-[#c9a84c] text-[#080808]" : "border-white/10 text-[#c9a84c]",
                              )}
                            >
                              <Plus size={15} strokeWidth={1.8} className={cn("transition-transform duration-300", isOpen && "rotate-45")} />
                            </span>
                          </button>
                        </h3>
                        <div
                          id={aId}
                          role="region"
                          aria-labelledby={qId}
                          className="grid transition-[grid-template-rows] duration-300 ease-out"
                          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                        >
                          <div className="overflow-hidden">
                            <p className={cn(t.body, "pb-6 pl-[60px] pr-5 md:pl-[76px] md:pr-16")}>{brandText(faq.answer)}</p>
                          </div>
                        </div>
                      </motion.li>
                    );
                  })}
                </motion.ul>

                <div className="mt-6 flex flex-col gap-4 border border-white/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-7">
                  <p className="font-inter text-[15px] text-text-secondary">
                    Nenašli jste odpověď? <span className="text-[#f0ece6]">Zeptejte se nás.</span>
                  </p>
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                    <Link
                      href={group.href}
                      className="font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-text-secondary transition-colors duration-300 hover:text-[#f0ece6]"
                    >
                      {META[group.id].more} →
                    </Link>
                    <CTAButton className="bg-[#c9a84c] px-6 py-3 font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
                      Konzultace zdarma →
                    </CTAButton>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
