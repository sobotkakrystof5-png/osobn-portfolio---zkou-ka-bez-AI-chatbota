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
            &ldquo;Výsledek&nbsp;
            <span className="text-shimmer">není náhoda.</span>&rdquo;
          </p>
        </motion.blockquote>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16 items-start">

          {/* Fotka */}
          <motion.div variants={slideLeft} className="md:col-span-2">
            <div className="relative w-full max-w-sm" style={{ borderLeft: "1px solid rgba(201,168,76,0.4)", borderBottom: "1px solid rgba(201,168,76,0.4)" }}>
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image src="/profil.jpg" alt="Zakladatel VIZEON, tvůrce webů na míru pro živnostníky a malé firmy" fill className="object-cover object-top grayscale hover:grayscale-0 transition-all duration-700" sizes="(max-width: 768px) 100vw, 40vw" priority />
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
            <h1 className="font-cormorant font-light text-[32px] md:text-[48px] leading-[1.1] text-[#f0ece6]">
              Za svou prací si stojím. Od začátku až do výsledku.
            </h1>
            <p className="font-inter font-light text-[15px] md:text-[17px] leading-[1.8] text-[#8a8070]">
              Jsem mladý podnikatel studující v Německu a věřím, že technologie mají smysl tehdy, když lidem zefektivňují práci a pomáhají jim posouvat se dál.
            </p>
            <p className="font-inter font-light text-[15px] md:text-[17px] leading-[1.8] text-[#8a8070]">
              AI vnímám jako nástroj, ne jako náhradu za přemýšlení a kreativitu. Každý projekt proto řeším osobně od prvního nápadu až po poslední detail, s důrazem na funkčnost a skutečný přínos pro vaše podnikání.
            </p>
            <p className="font-inter font-light text-[15px] md:text-[17px] leading-[1.8] text-[#8a8070]">
              Stejný přístup mě přivedl k automatizaci rutinních procesů a implementaci AI do firem. V současnosti pracuji na novém startupu v této oblasti.
            </p>
            <p className="font-inter font-light text-[15px] md:text-[17px] leading-[1.8] text-[#8a8070]">
              Studium v Německu ve mně posílilo důraz na preciznost, důslednost a kvalitu. Tyto hodnoty přenáším do každé své práce.
            </p>
            <p className="font-inter font-medium text-[15px] md:text-[17px] leading-[1.8] text-[#f0ece6]">
              Tvořím digitální řešení, která dávají smysl, šetří čas a posouvají podnikání dál.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
