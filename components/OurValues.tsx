"use client";

import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { fadeUp, revealInstant, viewport } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { Vizeon } from "@/components/brand/BrandName";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Naše hodnoty jako závazek, ne jako heslo. Vlevo pečeť s korunou (zákazník
// = pán) a motto, vpravo listina se sloupci Slib a Čin. Ke každému slibu
// se při scrollu „orazítkuje“ fajfka, dole se dokreslí podtržení podpisu
// a nakonec dopadne razítko. Čin u každého slibu je jen to, co web slibuje
// i jinde (garance u webů, pruh důvěry, kroky spolupráce), ať se texty
// nerozcházejí.
const PLEDGES = [
  { n: "I.", promise: "Nasloucháme vám", deed: "Konzultace zdarma, kde mluvíte hlavně vy." },
  { n: "II.", promise: "Ladíme do spokojenosti", deed: "Web spustíme, až když ho schválíte." },
  { n: "III.", promise: "Hrajeme férově", deed: "Cenu i termín znáte předem." },
  { n: "IV.", promise: "Jsme tu i potom", deed: "Odpověď do 24 hodin, i po spuštění webu." },
];

const CORNERS = [
  "left-3 top-3 border-l border-t",
  "right-3 top-3 border-r border-t",
  "left-3 bottom-3 border-l border-b",
  "right-3 bottom-3 border-r border-b",
];

const EASE = [0.22, 1, 0.36, 1] as const;

const motionVariants = {
  list: { hidden: {}, visible: { transition: { staggerChildren: 0.18, delayChildren: 0.1 } } },
  row: { hidden: { opacity: 0, x: -24 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: EASE } } },
  tick: {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 520, damping: 16, delay: 0.35 } },
  },
  seal: {
    hidden: { opacity: 0, scale: 1.35, rotate: -14 },
    visible: { opacity: 1, scale: 1, rotate: 0, transition: { type: "spring", stiffness: 260, damping: 18 } },
  },
  flourish: {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { duration: 1.3, ease: "easeInOut", delay: 0.2 }, opacity: { duration: 0.01, delay: 0.2 } },
    },
  },
  stamp: {
    hidden: { opacity: 0, scale: 1.9, rotate: -4 },
    visible: { opacity: 1, scale: 1, rotate: -12, transition: { type: "spring", stiffness: 420, damping: 20, delay: 1.1 } },
  },
} satisfies Record<string, Variants>;

// Pod reduced motion stejné klíče, jen bez pohybu a s nulovou délkou.
// `initial`/`whileInView` zůstávají, mění se jen varianty (viz revealInstant).
function still(to: Record<string, number>): Variants {
  return { hidden: { opacity: 0, ...to }, visible: { opacity: 1, ...to, transition: { duration: 0 } } };
}

const stillVariants = {
  list: { hidden: {}, visible: {} },
  row: revealInstant,
  tick: still({ scale: 1 }),
  seal: still({ scale: 1, rotate: 0 }),
  flourish: still({ pathLength: 1 }),
  stamp: still({ scale: 1, rotate: -12 }),
} satisfies Record<keyof typeof motionVariants, Variants>;

// Pečeť: text v kruhu se pomalu otáčí (s prefers-reduced-motion stojí),
// uprostřed koruna. Stejná stavba jako pečeť garance na stránce Weby.
function PledgeSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      <defs>
        <path id="hodnoty-pecet-kruh" d="M100,100 m-79,0 a79,79 0 1,1 158,0 a79,79 0 1,1 -158,0" />
      </defs>
      <circle cx="100" cy="100" r="97" stroke="#c9a84c" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="64" stroke="#c9a84c" strokeOpacity="0.55" />
      <circle cx="100" cy="100" r="58" fill="#c9a84c" fillOpacity="0.1" />
      <g className="motion-safe:animate-[spin_50s_linear_infinite]" style={{ transformOrigin: "100px 100px" }}>
        <text fill="#c9a84c" fontSize="11.5" fontWeight="500" className="font-inter uppercase">
          <textPath href="#hodnoty-pecet-kruh" textLength="490" lengthAdjust="spacing">
            Náš zákazník · náš pán · náš závazek ·
          </textPath>
        </text>
      </g>
      <Crown x={74} y={72} size={52} strokeWidth={1.2} color="#c9a84c" />
    </svg>
  );
}

export default function OurValues() {
  const reduced = usePrefersReducedMotion();
  const v = reduced ? stillVariants : motionVariants;
  const reveal = reduced ? revealInstant : fadeUp;

  return (
    <section
      id="hodnoty"
      aria-labelledby="hodnoty-nadpis"
      className="relative overflow-clip border-y border-[#c9a84c]/25 bg-[#0b0906] py-24 md:py-32"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_18%_40%,rgba(201,168,76,0.16),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/80 to-transparent"
      />

      <div className={cn(t.container.wide, "relative grid items-start gap-14 lg:grid-cols-12 lg:gap-16")}>
        <div className="lg:sticky lg:top-32 lg:col-span-5">
          <motion.div variants={v.seal} initial="hidden" whileInView="visible" viewport={viewport} className="mb-10 w-[136px] md:w-[172px]">
            <PledgeSeal className="w-full" />
          </motion.div>
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} className={cn(t.eyebrow, "mb-5")}>
            — Naše hodnoty
          </motion.p>
          <motion.h2
            id="hodnoty-nadpis"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-cormorant font-light text-[46px] leading-[1.02] text-[#f0ece6] md:text-[72px]"
          >
            Náš zákazník, <span className="text-shimmer">náš pán.</span>
          </motion.h2>
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} className={cn(t.lead, "mt-7 max-w-md")}>
            Vaše spokojenost je pro nás absolutní priorita. Nejsou to jen slova. Je to závazek, pod který se podepisujeme.
          </motion.p>
        </div>

        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative border border-[#c9a84c]/30 bg-[#0d0b07]/90 p-7 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.9)] md:p-12 lg:col-span-7"
        >
          <span aria-hidden="true" className="pointer-events-none absolute inset-[6px] border border-[#c9a84c]/10" />
          {CORNERS.map((corner) => (
            <span key={corner} aria-hidden="true" className={cn("pointer-events-none absolute h-5 w-5 border-[#c9a84c]/70", corner)} />
          ))}

          <div className="relative">
            <p className={cn(t.eyebrow, "mb-3")}>Platí pro každý projekt</p>
            <h3 className="font-cormorant font-light text-[30px] leading-[1.1] text-[#f0ece6] md:text-[40px]">Náš závazek vám</h3>

            <div
              aria-hidden="true"
              className="mt-8 hidden grid-cols-[64px_minmax(0,0.9fr)_minmax(0,1.1fr)] gap-x-8 border-b border-[#c9a84c]/25 pb-3 md:grid"
            >
              <span />
              <span className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">Slib</span>
              <span className="font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-text-muted">Čin</span>
            </div>

            <motion.ol
              variants={v.list}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-6 border-t border-[#c9a84c]/25 md:mt-0 md:border-t-0"
            >
              {PLEDGES.map(({ n, promise, deed }) => (
                <motion.li
                  key={n}
                  variants={v.row}
                  className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-b border-white/[0.07] py-6 md:grid-cols-[64px_minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-x-8"
                >
                  <span aria-hidden="true" className="row-span-2 self-start font-cormorant text-[30px] leading-none text-[#c9a84c]/80 md:row-span-1 md:self-center md:text-[38px]">
                    {n}
                  </span>
                  <span className="font-inter text-[17px] font-medium text-[#f0ece6]">{promise}</span>
                  <span className="flex items-center gap-3">
                    <motion.span
                      variants={v.tick}
                      aria-hidden="true"
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a84c] shadow-[0_0_18px_-2px_rgba(201,168,76,0.55)]"
                    >
                      <Check size={14} strokeWidth={3} className="text-[#080808]" />
                    </motion.span>
                    <span className="font-inter text-[14.5px] leading-[1.6] text-text-secondary">{deed}</span>
                  </span>
                </motion.li>
              ))}
            </motion.ol>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              className="mt-10 flex flex-wrap items-end justify-between gap-8"
            >
              <div>
                <p className="font-cormorant font-light text-[30px] leading-none text-[#f0ece6]">Kryštof</p>
                <svg viewBox="0 0 220 36" fill="none" aria-hidden="true" className="mt-1 h-8 w-52 text-[#c9a84c]">
                  <motion.path
                    variants={v.flourish}
                    d="M3 26 C 28 27, 40 6, 62 9 C 80 12, 70 31, 92 28 C 116 25, 128 11, 150 14 C 172 17, 168 31, 190 26 C 202 23, 210 18, 217 12"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                  />
                </svg>
                <p className="mt-2 font-inter text-[13px] text-text-muted">
                  zakladatel <Vizeon />
                </p>
              </div>

              <motion.div
                variants={v.stamp}
                className="flex h-32 w-32 shrink-0 flex-col items-center justify-center rounded-full border-2 border-[#c9a84c]/80 text-[#c9a84c] outline outline-1 -outline-offset-[9px] outline-[#c9a84c]/45"
              >
                <span className="font-cormorant text-[36px] leading-none">100&nbsp;%</span>
                <span className="mt-1 font-inter text-[10px] font-medium uppercase tracking-[0.14em]">spokojenost</span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
