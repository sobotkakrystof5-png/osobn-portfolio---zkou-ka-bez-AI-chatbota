"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check, Code2, Plug, Sparkles, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { PriceLabel } from "@/components/PriceLabel";
import { CTAButton } from "@/components/CTAButton";
import { Alteno } from "@/components/brand/BrandName";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { AUTOMATION_PACKAGE, PRICE_BY_NAME } from "@/lib/data/pricing";
import { altenoUrl } from "@/lib/alteno";
import { fadeUp, revealInstant, viewport } from "@/lib/animations";

// Cena automatizace stejně jako u e-shopů: vlevo jedna karta s cenou „od“
// a tím, co je v ní, vpravo čtyři věci, od kterých se cena odvíjí, každá se
// škálou od základu po náročnější řešení. AI agenty a chatboty naceňujeme
// až podle rozsahu (lib/data/pricing.ts), proto o nich jen poznámka.

const INCLUDED = [
  "Konzultace a návrh řešení",
  "Pevná cena, kterou znáte předem",
  "Napojení na vaše nástroje",
  "Testování na reálných případech",
  "14 dní podpory po spuštění zdarma",
];

type Factor = { icon: LucideIcon; title: string; text: string; scale: [string, string, string] };

const FACTORS: Factor[] = [
  {
    icon: Workflow,
    title: "Rozsah",
    text: "Kolik kroků automatizace udělá a kolik výjimek musí zvládnout.",
    scale: ["Pár kroků", "Celý proces", "Víc procesů"],
  },
  {
    icon: Plug,
    title: "Napojené systémy",
    text: "Kam všude se data posílají.",
    scale: ["E-mail a tabulka", "CRM a účetnictví", "Vlastní systémy"],
  },
  {
    icon: Sparkles,
    title: "Práce s AI",
    text: "Jestli stačí pevná pravidla, nebo má AI číst a rozhodovat.",
    scale: ["Bez AI", "AI čte a třídí", "AI agent"],
  },
  {
    icon: Code2,
    title: "Technologie",
    text: "Jednodušší toky stavíme v n8n nebo Make, složitější kódem v Pythonu.",
    scale: ["n8n nebo Make", "Kombinace", "Vlastní kód"],
  },
];

// Síla zlaté u stupňů škály: základ plný, náročnější slábne.
const LEVEL_TONE = ["bg-[#c9a84c]", "bg-[#c9a84c]/50", "bg-[#c9a84c]/25"];

export function AutomationPricing() {
  const reduced = usePrefersReducedMotion();
  const reveal = reduced ? revealInstant : fadeUp;
  const price = PRICE_BY_NAME[AUTOMATION_PACKAGE];

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative flex flex-col border border-[#c9a84c]/45 bg-[#0b0b0b] px-7 pb-9 pt-10 shadow-[0_0_70px_-18px_rgba(201,168,76,0.45)] md:px-10"
      >
        <span className="relative block w-fit" aria-hidden="true">
          <span className="absolute -inset-4 rounded-full bg-[#c9a84c]/[0.14] blur-2xl" />
          <span className="relative flex h-16 w-16 items-center justify-center border border-[#c9a84c]/45 bg-[#100e09]">
            <Workflow size={28} strokeWidth={1.1} className="text-[#c9a84c]" />
          </span>
        </span>
        <p className="mt-8 w-fit border border-[#c9a84c]/25 bg-[#c9a84c]/[0.07] px-3 py-1.5 font-inter font-medium text-[11px] uppercase tracking-[0.16em] text-[#c9a84c]">
          Pevná cena předem
        </p>
        <h3 className="mt-5 font-cormorant font-light text-[36px] leading-none text-[#f0ece6]">{AUTOMATION_PACKAGE}</h3>
        <p className="mt-5 font-cormorant font-light text-[56px] leading-none lining-nums text-[#f0ece6] md:text-[64px]">
          <PriceLabel price={price} />
        </p>
        <p className="mt-3 font-inter text-[15px] leading-[1.7] text-text-secondary">
          Cena za jednu automatizaci. Přesnou částku víte dřív, než začneme.
        </p>

        <ul className="mt-8 space-y-3.5">
          {INCLUDED.map((item, index) => (
            <motion.li
              key={item}
              initial={{ opacity: 0, x: reduced ? 0 : -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewport}
              transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.2 + index * 0.07 }}
              className="flex items-start gap-3 font-inter text-[15px] leading-[1.5] text-[#f0ece6]"
            >
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c9a84c]" aria-hidden="true">
                <Check size={11} strokeWidth={3} className="text-[#080808]" />
              </span>
              {item}
            </motion.li>
          ))}
        </ul>

        <div className="mt-auto pt-10">
          <CTAButton className="flex w-full justify-center bg-[#c9a84c] px-6 py-4 text-center font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
            Chci cenu pro svůj provoz →
          </CTAButton>
          <p className="mt-4 font-inter text-[13px] leading-[1.6] text-text-muted">
            AI agenty a chatboty naceníme podle rozsahu, cenu dostanete po konzultaci.
          </p>
        </div>
      </motion.div>

      <div>
        <h3 className="font-cormorant font-light text-[30px] leading-[1.1] text-[#f0ece6] md:text-[36px]">Od čeho se cena odvíjí</h3>
        <div className="mt-6 flex items-center gap-3 font-inter text-[12px] uppercase tracking-[0.12em] text-text-muted" aria-hidden="true">
          <span className="text-[#c9a84c]">Základní cena</span>
          <span className="h-px flex-1 bg-gradient-to-r from-[#c9a84c]/60 to-white/10" />
          <ArrowRight size={13} />
          <span>Náročnější řešení</span>
        </div>

        <ul className="mt-8 space-y-9">
          {FACTORS.map((factor, factorIndex) => {
            const Icon = factor.icon;
            return (
              <motion.li
                key={factor.title}
                variants={reveal}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-5"
              >
                <span className="flex h-12 w-12 items-center justify-center border border-[#c9a84c]/35 bg-[#100e09]" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.25} className="text-[#c9a84c]" />
                </span>
                <div>
                  <h4 className="font-inter text-[17px] font-medium text-[#f0ece6]">{factor.title}</h4>
                  <p className="mt-1.5 font-inter text-[15px] leading-[1.65] text-text-secondary">{factor.text}</p>
                  <ol className="mt-4 grid grid-cols-3 gap-1.5" aria-label={`${factor.title}: od základu po náročnější řešení`}>
                    {factor.scale.map((level, levelIndex) => (
                      <li key={level}>
                        <motion.span
                          aria-hidden="true"
                          className={`block h-1.5 origin-left ${LEVEL_TONE[levelIndex]}`}
                          initial={{ scaleX: reduced ? 1 : 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={viewport}
                          transition={{
                            duration: reduced ? 0 : 0.5,
                            delay: reduced ? 0 : 0.25 + factorIndex * 0.05 + levelIndex * 0.18,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        />
                        <span
                          className={`mt-2 block font-inter text-[13px] leading-[1.35] ${
                            levelIndex === 0 ? "text-[#f0ece6]" : "text-text-muted"
                          }`}
                        >
                          {level}
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <p className="mt-10 font-inter text-[14px] leading-[1.7] text-text-secondary">
          Kolik vám rutina bere času, si spočítáte v{" "}
          <a
            href={altenoUrl("/cenik#kalkulacka", "automatizace-hero")}
            target="_blank"
            rel="noopener"
            className="text-[#c9a84c] hover:underline"
          >
            kalkulačce na <Alteno /> ↗
          </a>
          .
        </p>
      </div>
    </div>
  );
}
