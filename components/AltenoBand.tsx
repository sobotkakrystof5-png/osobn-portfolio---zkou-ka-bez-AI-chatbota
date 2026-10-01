"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, revealInstant, viewport } from "@/lib/animations";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { altenoUrl } from "@/lib/alteno";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Pruh pod HomeExplore: říká návštěvníkovi, že u stejného člověka pořídí i
// automatizaci. Primární akce vede dovnitř webu (/automatizace), ven na
// alteno.cz míří až sekundární odkaz a samotné logo.

export default function AltenoBand() {
  const reduced = useReducedMotion() ?? false;

  return (
    <section className="pb-24 md:pb-32 bg-[#0e0e0e]" aria-labelledby="alteno-band-nadpis">
      <div className={t.container.wide}>
        <motion.div
          // Pod reduced motion se mění jen varianty, ne initial/whileInView:
          // SSR vždy nese opacity 0 a bez whileInView by ji nikdo nepřepsal
          // (pruh by zůstal neviditelný). Viz components/automation/Reveal.tsx.
          variants={reduced ? revealInstant : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative border border-[rgba(201,168,76,0.2)] p-7 md:p-10 overflow-hidden flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at left, rgba(201,168,76,0.05), transparent 60%)" }}
            aria-hidden="true"
          />

          <div className="relative z-10 shrink-0">
            <BrandLockup size="lg" altenoHref={altenoUrl("/", "home-banner-logo")} className="mb-4" />
            <p className="font-inter font-light text-[12px] tracking-[0.05em] text-[#8a8070]">
              Jeden člověk, dvě značky.
            </p>
          </div>

          <div className="relative z-10 flex-1">
            <h2 id="alteno-band-nadpis" className={cn(t.h2Page, "mb-3")}>
              Web je začátek. Rutinu za vás zvládne automatizace.
            </h2>
            <p className={cn(t.body, "max-w-xl mb-7")}>
              Potvrzení poptávek, odpovědi na běžné dotazy nebo zápisy do tabulek můžou běžet samy,
              i když zrovna nesedíte u počítače.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/automatizace"
                className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3.5 hover:bg-[#d4b968] transition-colors duration-300 text-center"
              >
                Zjistit víc o automatizaci →
              </Link>
              <a
                href={altenoUrl("/", "home-banner")}
                target="_blank"
                rel="noopener"
                className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#f0ece6] border border-white/10 px-6 py-3.5 hover:border-white/20 hover:bg-white/5 transition-colors duration-300 text-center"
              >
                Prohlédnout ALTENO ↗
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
