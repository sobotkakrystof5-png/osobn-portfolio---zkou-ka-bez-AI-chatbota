"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";
import { projects, badgeStyles } from "@/lib/data/portfolio";

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 md:py-40 bg-[#0e0e0e]" aria-label="Portfolio">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Moje práce
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-4 max-w-2xl">
          Výsledky mluví za vše.
        </motion.h1>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[16px] md:text-[19px] text-[#c8c0b4] leading-[1.7] max-w-xl mb-16">
          Weby a grafika navržené tak, aby dobře vypadaly a fungovaly. A hlavně aby přinášely výsledky. Každý projekt tvořím od základu s důrazem na detail, kvalitu a to, co dává smysl právě vašemu podnikání.
        </motion.p>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="space-y-5">
          {projects.map((p, i) => (
            <div key={i}>
              <motion.a variants={fadeUp} href={p.url} target="_blank" rel="noopener noreferrer"
                className="group relative block overflow-hidden border border-white/[0.05] hover:border-[rgba(201,168,76,0.2)] transition-colors duration-500 min-h-[380px] md:min-h-0 md:h-[560px]"
                aria-label={`Zobrazit projekt ${p.title}`}>

                {/* Fotka: normální flow box na mobilu (dává kartě přirozenou výšku), full-bleed pozadí na desktopu */}
                <div className="relative h-[190px] xs:h-[220px] md:absolute md:inset-0 md:h-auto">
                  <Image src={p.image} alt={p.alt} fill className="object-cover object-center transition-transform duration-700 ease-out md:group-hover:scale-[1.04]" sizes="(min-width: 768px) 90vw, 100vw" />
                  {/* Gradient pod textem — jen na desktopu, mobil má text v normálním flow pod fotkou */}
                  <div className="hidden md:block absolute inset-0 transition-opacity duration-500" style={{ background: "linear-gradient(to right, rgba(8,8,8,0.88) 38%, transparent)" }} aria-hidden="true" />
                </div>

                {/* Zlatá linka nahoře při hoveru (jen desktop, kde karta má celoplošnou fotku) */}
                <div className="hidden md:block absolute top-0 left-0 right-0 h-[1px] z-10 bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/40 transition-colors duration-500" aria-hidden="true" />

                {/* Badge: vlastní řádek nad titulkem na mobilu, roh karty na desktopu */}
                <span className={`block md:absolute md:top-4 md:right-4 z-10 w-fit mx-5 xs:mx-6 mt-4 md:m-0 font-inter font-normal text-[10px] uppercase tracking-[0.12em] border px-2.5 py-1 md:backdrop-blur-sm md:bg-[#080808]/80 ${badgeStyles[p.badgeType].className}`}>
                  {badgeStyles[p.badgeType].label}
                </span>

                {/* Textový obsah: normální flow pod fotkou na mobilu, absolutně přes gradient dole vlevo na desktopu */}
                <div className="relative p-5 xs:p-6 pt-3 md:p-10 md:absolute md:bottom-0 md:left-0">
                  <span className="absolute top-1 right-4 md:top-6 md:left-6 md:right-auto font-cormorant font-light text-[64px] md:text-[110px] leading-none text-white/[0.04] select-none" aria-hidden="true">{p.number}</span>
                  <h3 className="relative font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-1">{p.title}</h3>
                  <p className="relative font-inter font-light text-[11px] uppercase tracking-[0.12em] text-[#c9a84c] mb-1">{p.category}</p>
                  <p className="relative font-inter font-normal text-[11px] tracking-[0.04em] text-[#a89c8a] mb-3">{p.tech}</p>
                  <p className="relative font-inter font-light text-[13px] text-[#8a8070] leading-[1.7] md:leading-[1.75] mb-4 md:mb-5 md:max-w-md [-webkit-line-clamp:3] [display:-webkit-box] [-webkit-box-orient:vertical] overflow-hidden md:[-webkit-line-clamp:unset] md:[display:block] md:overflow-visible">
                    {p.description}
                  </p>
                  <span className="relative inline-flex items-center gap-2 font-inter font-medium text-[12px] tracking-[0.08em] uppercase text-[#8a8070] border border-white/10 px-4 py-2 group-hover:border-[rgba(201,168,76,0.3)] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300">
                    Zobrazit web <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
              </motion.a>
              {p.internalLink && (
                <Link
                  href={p.internalLink.href}
                  className="inline-block mt-3 font-inter font-light text-[12px] text-[#8a8070] hover:text-[#c9a84c] transition-colors duration-300 underline decoration-white/20 hover:decoration-[#c9a84c]"
                >
                  {p.internalLink.text} →
                </Link>
              )}
            </div>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="font-inter font-light text-[12px] text-[#3d3830] text-center mt-8"
        >
          Portfolio zahrnuje weby skutečných klientů i ukázkové projekty pro demonstraci designového stylu.
        </motion.p>
      </div>
    </section>
  );
}
