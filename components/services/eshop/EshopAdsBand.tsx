"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Pás „E-shop je základ, reklama ho rozjede“ přes celou šířku (stejná výbava
// jako pás garancí u webů). Vpravo ilustrační graf objednávek bez reklamy
// a s reklamou: po najetí se sám přepne na „s reklamou“, pak už přepíná
// klient. Graf nemá osy ani čísla, je to ilustrace, ne výsledek klienta.
const WITHOUT = [3, 2, 4, 3, 2, 4, 3, 2, 3, 4, 3, 2, 4, 3];
const WITH = [3, 2, 4, 3, 6, 7, 9, 8, 10, 12, 11, 13, 15, 16];
const MAX = 16;
const LAUNCH_DAY = 4;

const CHANNELS = ["Google reklamy", "Meta reklamy", "Remarketing", "Měření prodejů"];

export function EshopAdsBand() {
  const reduced = usePrefersReducedMotion();
  const chartRef = useRef<HTMLDivElement>(null);
  const inView = useInView(chartRef, { once: true, margin: "-25% 0px" });
  const [withAds, setWithAds] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (!inView || touched) return;
    const timer = window.setTimeout(() => setWithAds(true), reduced ? 0 : 1200);
    return () => window.clearTimeout(timer);
  }, [inView, touched, reduced]);

  const choose = (value: boolean) => {
    setTouched(true);
    setWithAds(value);
  };

  const bars = withAds ? WITH : WITHOUT;

  return (
    <section aria-labelledby="reklamy" className="relative overflow-hidden border-y border-[#c9a84c]/25 bg-[#0b0906] py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_75%_at_88%_50%,rgba(201,168,76,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/80 to-transparent"
      />

      <div className={cn(t.container.wide, "relative grid items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20")}>
        <div>
          <p className={cn(t.eyebrow, "mb-4")}>— Po spuštění</p>
          <h2 id="reklamy" className="font-cormorant font-light text-[40px] leading-[1.05] text-[#f0ece6] md:text-[60px]">
            E-shop je základ. <span className="text-gleam">Reklama</span> ho rozjede.
          </h2>
          <p className={cn(t.lead, "mt-6 max-w-md")}>
            Spuštěný e-shop ještě neznamená zákazníky. Nastavíme vám reklamy na Googlu, Facebooku a Instagramu
            a hlídáme, kolik vás stojí jedna objednávka.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2">
            {CHANNELS.map((channel) => (
              <li key={channel} className="border border-[#c9a84c]/25 bg-[#c9a84c]/[0.06] px-3 py-1.5 font-inter text-[13px] text-[#f0ece6]">
                {channel}
              </li>
            ))}
          </ul>
          <CTAButton className="mt-9 inline-flex bg-[#c9a84c] px-8 py-4 shadow-[0_0_44px_-8px_rgba(201,168,76,0.6)] font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-all duration-300 hover:bg-[#d4b968]">
            Probrat e-shop i reklamu →
          </CTAButton>
        </div>

        <div ref={chartRef} className="border border-[#c9a84c]/20 bg-[#080808]/70 p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="font-inter text-[15px] font-medium text-[#f0ece6]">Objednávky za 14 dní</p>
            <div className="flex border border-white/[0.08] p-1" role="group" aria-label="Přepnout graf">
              {[
                { value: false, label: "Bez reklamy" },
                { value: true, label: "S reklamou" },
              ].map((option) => (
                <button
                  key={option.label}
                  type="button"
                  aria-pressed={withAds === option.value}
                  onClick={() => choose(option.value)}
                  className={cn(
                    "px-3.5 py-2 font-inter text-[13px] transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]/60",
                    withAds === option.value ? "bg-[#c9a84c] text-[#080808]" : "text-text-secondary hover:text-[#f0ece6]"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mt-8 h-[220px] md:h-[260px]" aria-hidden="true">
            {/* Značka spuštění kampaně */}
            <motion.div
              className="absolute bottom-0 top-0 border-l border-dashed border-[#c9a84c]/60"
              style={{ left: `${(LAUNCH_DAY / WITH.length) * 100}%` }}
              initial={false}
              animate={{ opacity: withAds ? 1 : 0 }}
              transition={{ duration: reduced ? 0 : 0.4 }}
            >
              <span className="absolute -top-1 left-2 whitespace-nowrap font-inter text-[11px] uppercase tracking-[0.12em] text-[#c9a84c]">
                Start kampaně
              </span>
            </motion.div>

            <div className="flex h-full items-end gap-1.5 md:gap-2">
              {bars.map((value, index) => (
                <motion.span
                  key={index}
                  className={cn(
                    "block flex-1 origin-bottom",
                    withAds && index >= LAUNCH_DAY ? "bg-[#c9a84c]" : "bg-white/[0.14]"
                  )}
                  style={{ height: "100%" }}
                  initial={false}
                  animate={{ scaleY: inView ? value / MAX : 0 }}
                  transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : index * 0.03, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}
            </div>
          </div>
          <p className="mt-4 font-inter text-[13px] text-text-muted">Ilustrace. Skutečný výsledek záleží na oboru, rozpočtu a nabídce.</p>
          <p className="sr-only">Ilustrační graf: bez reklamy jsou objednávky stále na stejné úrovni, po startu kampaně rostou.</p>
        </div>
      </div>
    </section>
  );
}
