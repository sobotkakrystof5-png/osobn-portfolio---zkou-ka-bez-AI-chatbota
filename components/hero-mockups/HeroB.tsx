"use client";

import Image from "next/image";
import Link from "next/link";
import { MotionConfig, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { brandText } from "@/components/brand/BrandName";
import { BrowserChrome, HERO_LEAD, HeroCtas, LockupLine, SHOTS, SplitHeadline, rise } from "./shared";

// Návrh B, „Hotová práce“: nahoře velký nadpis a vedle něj odstavec s
// tlačítky, spodní polovinu první obrazovky drží pás skutečných webů, které
// jsme postavili, přes celou šířku. Pás pomalu jede, na najetí myší stojí
// a každý web vede na detail projektu. Důkaz místo slibu, hned na první dobrou.

const LOOP = [...SHOTS, ...SHOTS];

export default function HeroB() {
  return (
    <MotionConfig reducedMotion="user">
      {/* Smyčka jede o polovinu délky pásu, druhá polovina je kopie první. */}
      <style>{`@keyframes hero-b-marquee { to { transform: translateX(-50%); } }`}</style>
      <section id="hero" aria-label="Úvodní sekce" className="relative overflow-hidden bg-[#080808] pb-16 pt-28 md:pb-20 md:pt-40 lg:pt-36">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
            <div className="lg:col-span-7">
              <SplitHeadline size="wide" />
            </div>
            <div className="lg:col-span-5 lg:pb-1">
              <motion.p {...rise(0.3)} className="font-inter text-[17px] leading-[1.75] text-text-secondary">
                {HERO_LEAD}
              </motion.p>
              <motion.div {...rise(0.4)}>
                <HeroCtas className="mt-8" secondary={false} />
              </motion.div>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="group/marquee mt-14 overflow-x-auto motion-safe:overflow-hidden md:mt-20"
        >
          <ul
            aria-label="Weby, které jsme postavili"
            className="flex w-max motion-safe:animate-[hero-b-marquee_80s_linear_infinite] group-hover/marquee:[animation-play-state:paused]"
          >
            {LOOP.map((item, index) => {
              const copy = index >= SHOTS.length;
              return (
                <li key={`${item.slug}-${index}`} aria-hidden={copy || undefined} className="w-[300px] shrink-0 pr-5 md:w-[460px] md:pr-6 lg:w-[520px]">
                  <Link href={`/ukazky-webu/${item.slug}`} tabIndex={copy ? -1 : undefined} className="group/card block">
                    <div className="border border-white/[0.09] bg-[#0b0b0b] transition-colors duration-300 group-hover/card:border-[#c9a84c]/50">
                      <BrowserChrome />
                      <div className="relative aspect-[16/10] overflow-hidden">
                        <Image
                          src={item.desktop}
                          alt={copy ? "" : `Web ${item.title}`}
                          fill
                          priority={index < 3}
                          sizes="(min-width: 1024px) 520px, (min-width: 768px) 460px, 300px"
                          className="object-cover object-top transition-transform duration-700 ease-out group-hover/card:scale-[1.03]"
                        />
                      </div>
                    </div>
                    <div className="mt-3.5 flex items-baseline justify-between gap-4">
                      <span className="truncate font-inter text-[15px] text-[#f0ece6] transition-colors duration-300 group-hover/card:text-[#c9a84c]">
                        {brandText(item.title)}
                      </span>
                      <span className="shrink-0 font-inter text-[13px] text-text-muted">{item.kind}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </motion.div>

        <div className="mx-auto mt-10 flex max-w-7xl flex-col gap-6 px-6 md:mt-12 md:flex-row md:items-center md:justify-between md:px-12">
          <motion.div {...rise(0.6)}>
            <LockupLine />
          </motion.div>
          <motion.div {...rise(0.65)}>
            <Link
              href="/ukazky-webu"
              className="inline-flex items-center gap-2 font-inter text-[14px] text-[#f0ece6] transition-colors duration-300 hover:text-[#c9a84c]"
            >
              Všechny projekty <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
