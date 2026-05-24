"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Kavárna Svěží",
    category: "Pohostinství & Kavárna",
    tech: "Next.js · Tailwind · Vercel",
    description: "Landing page pro pražskou kavárnu. Cíl: přivést zákazníky z Googlu a zvýšit rezervace.",
    url: "https://kav-rna-sv.vercel.app",
    image: "/portfolio/kavarna.jpg",
    alt: "Screenshot webu Kavárna Svěží",
  },
  {
    number: "02",
    title: "Auf Gehts",
    category: "Vzdělávání & Osobní brand",
    tech: "Next.js · TypeScript · Framer Motion",
    description: "Osobní brand web pro lektora němčiny. Zaměřeno na důvěru a první kontakt.",
    url: "https://auf-gehts-cz-56ly.vercel.app",
    image: "/portfolio/aufgehts.jpg",
    alt: "Screenshot webu Auf Gehts",
  },
  {
    number: "03",
    title: "HairDeluxe",
    category: "Kadeřnictví & Wellness",
    tech: "Next.js · Tailwind · Vercel",
    description: "Web pro kadeřnický salon. Důraz na ukázku práce a online rezervace.",
    url: "https://hair-deluxe-jo.vercel.app",
    image: "/portfolio/hairdeluxe.jpg",
    alt: "Screenshot webu HairDeluxe",
  },
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-28 md:py-40 bg-[#0e0e0e]" aria-label="Portfolio">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Moje práce
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-4 max-w-2xl">
          Výsledky mluví za vše.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[14px] text-[#8a8070] mb-16">
          Každý projekt je ručně vytvořený. Každý má svůj příběh.
        </motion.p>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="space-y-5">
          {projects.map((p, i) => (
            <motion.a key={i} variants={fadeUp} href={p.url} target="_blank" rel="noopener noreferrer"
              className="group relative block h-[280px] md:h-[480px] overflow-hidden border border-white/[0.05] hover:border-[rgba(201,168,76,0.2)] transition-colors duration-500"
              aria-label={`Zobrazit projekt ${p.title}`}>
              <Image src={p.image} alt={p.alt} fill className="object-cover object-top group-hover:scale-[1.04] transition-transform duration-700 ease-out" sizes="90vw" />
              {/* Desktop overlay */}
              <div className="absolute inset-0 hidden md:block transition-opacity duration-500" style={{ background: "linear-gradient(to right, rgba(8,8,8,0.88) 38%, transparent)" }} aria-hidden="true" />
              {/* Mobile overlay */}
              <div className="absolute inset-0 md:hidden" style={{ background: "linear-gradient(to top, rgba(8,8,8,0.92) 55%, transparent)" }} aria-hidden="true" />
              {/* Zlatá linka nahoře při hoveru */}
              <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#c9a84c]/0 group-hover:bg-[#c9a84c]/40 transition-colors duration-500" aria-hidden="true" />
              {/* Demo badge */}
              <span className="absolute top-4 right-4 z-10 font-inter font-normal text-[10px] uppercase tracking-[0.12em] text-[#8a8070] border border-white/[0.1] bg-[#080808]/80 px-2.5 py-1 backdrop-blur-sm">
                Ukázkový projekt
              </span>

              <div className="absolute bottom-0 left-0 p-7 md:p-10">
                <span className="absolute top-3 left-3 md:top-6 md:left-6 font-cormorant font-light text-[80px] md:text-[110px] leading-none text-white/[0.04] select-none" aria-hidden="true">{p.number}</span>
                <h3 className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-1">{p.title}</h3>
                <p className="font-inter font-light text-[11px] uppercase tracking-[0.12em] text-[#c9a84c] mb-1">{p.category}</p>
                <p className="font-inter font-light text-[11px] text-[#3d3830] mb-3">{p.tech}</p>
                <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.75] mb-5 max-w-md">{p.description}</p>
                <span className="inline-flex items-center gap-2 font-inter font-medium text-[12px] tracking-[0.08em] uppercase text-[#8a8070] border border-white/10 px-4 py-2 group-hover:border-[rgba(201,168,76,0.3)] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300">
                  Zobrazit web <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="font-inter font-light text-[12px] text-[#3d3830] text-center mt-8"
        >
          Ukázkové projekty vytvořené pro demonstraci schopností a designového stylu — ne weby skutečných klientů.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="mt-14 text-center">
          <p className="font-cormorant font-light text-[28px] md:text-[40px] text-[#f0ece6] mb-2">Váš projekt může být dalším.</p>
          <p className="font-inter font-light text-[13px] text-[#8a8070] mb-8">Bez čekání. Bez agentury. Přímo se mnou.</p>
          <CTAButton className="inline-flex font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300">
            Začněme →
          </CTAButton>
        </motion.div>
      </div>
    </section>
  );
}
