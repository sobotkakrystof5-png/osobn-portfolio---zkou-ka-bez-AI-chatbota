"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, revealInstant, viewport } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { Alteno, Vizeon } from "@/components/brand/BrandName";
import { CTAButton } from "@/components/CTAButton";
import { altenoUrl } from "@/lib/alteno";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Konec příběhu: čára dojela k cíli, teď dvě cesty dál (zakázka, nebo
// místo v týmu) a podpis zakladatele. Podpis se dokreslí stejně jako
// v sekci hodnot na homepage.

const flourish: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { pathLength: { duration: 1.3, ease: "easeInOut", delay: 0.3 }, opacity: { duration: 0.01, delay: 0.3 } },
  },
};
const flourishStill: Variants = {
  hidden: { pathLength: 1, opacity: 0 },
  visible: { pathLength: 1, opacity: 1, transition: { duration: 0 } },
};

export default function AboutFinale() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced ? revealInstant : fadeUp;

  return (
    <section aria-labelledby="u-toho-nadpis" className="bg-[#080808] pb-16 pt-28 md:pb-24 md:pt-40">
      <div className={cn(t.container.wide, "grid gap-16 lg:grid-cols-12 lg:items-end lg:gap-16")}>
        <motion.div
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="lg:col-span-7"
        >
          <motion.h2 variants={reveal} id="u-toho-nadpis" className="font-cormorant text-[46px] font-light leading-[1] text-[#f0ece6] md:text-[76px]">
            Chcete být u toho?
          </motion.h2>
          <motion.p variants={reveal} className="mt-7 max-w-xl font-inter text-[17px] leading-[1.7] text-[#f0ece6]/90 md:text-[19px]">
            Hledáte web, který vám přivede zákazníky, nebo místo v týmu, který teprve roste? Napište, odpovídám do hodiny.
          </motion.p>
          <motion.div variants={reveal} className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <CTAButton className="inline-flex bg-[#c9a84c] px-8 py-4 font-inter text-[14px] font-medium text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
              Nezávazná konzultace zdarma →
            </CTAButton>
            <Link
              href="/kontakt"
              className="group inline-flex items-center gap-2 font-inter text-[15px] font-medium text-[#f0ece6] transition-colors duration-300 hover:text-[#c9a84c]"
            >
              Chci do týmu
              <ArrowRight size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} className="bg-[#0f0d0a] p-8 md:p-10 lg:col-span-5">
          <p className="font-cormorant text-[34px] font-light leading-none text-[#f0ece6]">Kryštof</p>
          <svg viewBox="0 0 220 36" fill="none" aria-hidden="true" className="mt-1 h-8 w-52 text-[#c9a84c]">
            <motion.path
              variants={reduced ? flourishStill : flourish}
              initial="hidden"
              whileInView="visible"
              viewport={viewport}
              d="M3 26 C 28 27, 40 6, 62 9 C 80 12, 70 31, 92 28 C 116 25, 128 11, 150 14 C 172 17, 168 31, 190 26 C 202 23, 210 18, 217 12"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          </svg>
          <p className="mt-2 font-inter text-[14px] text-text-secondary">
            zakladatel <Vizeon /> a <Alteno />
          </p>
          <p className="mt-8 font-inter text-[15px] leading-[1.7] text-[#f0ece6]/85">
            Automatizaci a umělou inteligenci pro firmy řeší{" "}
            <a href={altenoUrl("/", "o-mne")} target="_blank" rel="noopener" className={t.link}>
              <Alteno /> ↗
            </a>
            . Co všechno se dá zautomatizovat, popisuje stránka{" "}
            <Link href="/automatizace" className={t.link}>
              automatizace a AI
            </Link>
            .
          </p>
        </motion.div>
      </div>

      <div className={cn(t.container.wide, "mt-20 md:mt-28")}>
        <Link href="/" className={t.backLink}>
          ← Zpět na hlavní stránku
        </Link>
      </div>
    </section>
  );
}
