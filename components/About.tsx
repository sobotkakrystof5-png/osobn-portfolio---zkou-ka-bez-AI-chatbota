"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { fadeIn, slideLeft, slideRight, stagger, viewport } from "@/lib/animations";

export default function About() {
  return (
    <section id="o-mne" className="py-28 md:py-40 bg-[#080808]" aria-label="O mně">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.blockquote variants={fadeIn} initial="hidden" whileInView="visible" viewport={viewport} className="mb-20 md:mb-28 overflow-hidden">
          <p className="font-cormorant font-light italic text-[#f0ece6] text-[36px] md:text-[56px] lg:text-[68px] leading-[1.1] text-balance">
            &ldquo;Nejsem agentura.&nbsp;
            <span className="text-shimmer">Jsem člověk, který to udělá.</span>&rdquo;
          </p>
        </motion.blockquote>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">

          {/* Fotka */}
          <motion.div variants={slideLeft} className="md:col-span-2">
            <div className="relative w-full max-w-sm" style={{ borderLeft: "1px solid rgba(201,168,76,0.4)", borderBottom: "1px solid rgba(201,168,76,0.4)" }}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image src="/profil.jpg" alt="Zakladatel VIZEON" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" sizes="(max-width: 768px) 100vw, 40vw" priority />
                {/* Zlatý overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#c9a84c]/10 to-transparent pointer-events-none" />
              </div>
            </div>
            <p className="mt-4 font-inter font-medium text-[10px] tracking-[0.15em] text-[#c9a84c] uppercase">
              Zakladatel VIZEON · Česká republika
            </p>
          </motion.div>

          {/* Text */}
          <motion.div variants={slideRight} className="md:col-span-3 space-y-6">
            <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c]">— O mně</p>
            <h2 className="font-cormorant font-light text-[32px] md:text-[48px] leading-[1.1] text-[#f0ece6]">
              Jeden kontakt. Žádné přehazování. Výsledky.
            </h2>
            <p className="font-inter font-light text-[15px] md:text-[17px] leading-[1.8] text-[#8a8070]">
              Jsem designér studující v Německu se zápalem pro věci, které mají smysl.
            </p>
            <p className="font-inter font-light text-[15px] md:text-[17px] leading-[1.8] text-[#8a8070]">
              Zatímco velké agentury předají váš projekt juniorovi, kterého nikdy neuvidíte — vy komunikujete přímo se mnou. Od první zprávy až po spuštění.
            </p>
            <p className="font-inter font-light text-[15px] md:text-[17px] leading-[1.8] text-[#8a8070]">
              Nevytvářím weby, které vyhrávají ceny a přivádějí nula zákazníků. Vytvářím nástroje, které váš byznys posouvají dopředu.
            </p>
            {/* Zlatý box */}
            <div className="border-l-2 border-[#c9a84c]/60 pl-5 py-1">
              <p className="font-inter font-light text-[15px] md:text-[17px] leading-[1.8] text-[#c9a84c]">
                Špatný web vás stojí zákazníky každý den.&nbsp;
                <span className="text-[#8a8070]">Pojďme to změnit.</span>
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
