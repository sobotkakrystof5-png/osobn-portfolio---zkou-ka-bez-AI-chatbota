"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { fadeUp, revealInstant, viewport } from "@/lib/animations";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { CTAButton } from "@/components/CTAButton";
import { altenoUrl } from "@/lib/alteno";
import { automationIndex } from "@/lib/data/automation-index";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { Alteno, Vizeon, brandText } from "@/components/brand/BrandName";

// Pruh spolupráce ALTENO × VIZEON pod HomeExplore. Ukazuje, co dělá která
// značka a že jde o jedno navazující řešení. Primární akce otevírá konzultaci,
// sekundární vede dovnitř webu (/automatizace), ven na alteno.cz míří až
// textový odkaz a samotné logo.

const brands = [
  {
    brand: "VIZEON",
    role: "Web",
    title: "Weby a e-shopy na míru",
    text: "Design, texty a SEO, díky kterým vás zákazníci najdou, uvěří vám a ozvou se.",
  },
  {
    brand: "ALTENO",
    role: "Automatizace",
    title: "Automatizace a AI asistenti",
    text: "Chatboti, automatizace procesů a AI agenti, kteří za vás vyřídí poptávky, dotazy i papírování.",
  },
];

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
          className="relative border border-[rgba(201,168,76,0.25)] px-6 py-14 md:px-14 md:py-20 lg:px-20 lg:py-24 overflow-hidden flex flex-col items-center text-center"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top, rgba(201,168,76,0.09), transparent 65%)" }}
            aria-hidden="true"
          />
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10 flex flex-col items-center w-full">
            <p className={cn(t.eyebrow, "mb-8")}>— Spolupráce</p>

            <BrandLockup size="xl" altenoHref={altenoUrl("/", "home-banner-logo")} className="mb-10 md:mb-12" />

            <h2
              id="alteno-band-nadpis"
              className="font-cormorant font-light text-[32px] md:text-[48px] leading-[1.12] text-[#f0ece6] max-w-3xl mb-6"
            >
              Web, který přivede zákazníky.
              <br className="hidden md:block" /> Automatizace, která je obslouží.
            </h2>
            <p className={cn(t.lead, "max-w-2xl mb-12 md:mb-14")}>
              <Vizeon /> a <Alteno /> tvoří jedno navazující řešení. Web i automatizace vznikají společně,
              takže poptávka z formuláře rovnou putuje dál a vy máte pro obojí jeden kontakt.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch gap-4 md:gap-6 w-full max-w-4xl mb-12 md:mb-14 text-left">
              {brands.map((b, i) => (
                <div key={b.brand} className="contents">
                  {i === 1 && (
                    <span
                      aria-hidden="true"
                      className="self-center justify-self-center font-inter font-light text-[22px] text-[#c9a84c]/60"
                    >
                      ×
                    </span>
                  )}
                  <div className="glass-panel p-6 md:p-8 flex flex-col">
                    <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-3">
                      {brandText(b.brand)} <span className="text-[#8a8070]">· {b.role}</span>
                    </p>
                    <h3 className="font-cormorant font-light text-[24px] md:text-[26px] text-[#f0ece6] leading-tight mb-3">
                      {b.title}
                    </h3>
                    <p className="font-inter font-light text-[14px] text-[#8a8070] leading-[1.75]">{b.text}</p>

                    {b.brand === "ALTENO" && (
                      <ul className="flex flex-wrap gap-2 mt-5" aria-label="Služby automatizace">
                        {automationIndex.map((s) => (
                          <li key={s.slug}>
                            <Link
                              href={`/automatizace/${s.slug}`}
                              className="inline-block font-inter font-light text-[11px] tracking-[0.04em] text-[#f0ece6]/80 border border-white/10 px-2.5 py-1 hover:border-[#c9a84c]/50 hover:text-[#c9a84c] transition-colors duration-300"
                            >
                              {s.title}
                              {s.comingSoon && <span className="text-[#8a8070]"> · brzy</span>}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <CTAButton className="glow-pulse font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300 w-full sm:w-auto text-center">
                Chci web i automatizaci →
              </CTAButton>
              <Link
                href="/automatizace"
                className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#f0ece6] border border-white/10 px-8 py-4 hover:border-white/20 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center"
              >
                Zjistit víc o automatizaci
              </Link>
            </div>

            <a
              href={altenoUrl("/", "home-banner")}
              target="_blank"
              rel="noopener"
              className="mt-6 inline-flex items-center gap-1.5 font-inter font-light text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#c9a84c] transition-colors duration-300"
            >
              Prohlédnout alteno.cz <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
