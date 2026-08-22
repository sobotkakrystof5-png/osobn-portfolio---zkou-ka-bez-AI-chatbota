"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    number: "01",
    title: "Schovinox",
    category: "Zámečnictví & Kovovýroba",
    tech: "Next.js · React",
    description: "Firemní web pro zakázkovou kovovýrobu pod vedením pana Schovánka — zámečnictví, svařování a broušení s 40letou rodinnou zkušeností. Cíl: lépe prezentovat firmu a prodávat vlastní produkty na grilování.",
    url: "https://www.schovinox.cz",
    image: "/portfolio/schovinox.jpg",
    alt: "Firemní web pro kovovýrobu Schovinox — zámečnictví a svařování",
    badgeType: "client" as const,
  },
  {
    number: "02",
    title: "U Cerhů",
    category: "Svatby & Ubytování",
    tech: "HTML/CSS/JS Vanilla",
    description: "Landing page pro statek v Kněžmostě. Cíl: získat více zakázek na svatby a ubytování v Českém ráji.",
    url: "https://www.u-cerhu.cz",
    image: "/portfolio/ucerhu.jpg",
    alt: "Web na míru pro statek U Cerhů — svatby a ubytování v Českém ráji",
    badgeType: "client" as const,
  },
  {
    number: "03",
    title: "Masáže Tomáš Kestner",
    category: "Wellness & Osobní brand",
    tech: "HTML/CSS/JS Vanilla",
    description: "Prezentační web pro maséra s 20 lety praxe, 7 z toho u profesionálního fotbalu FK Mladá Boleslav. Cíl: vybudovat důvěru a přivést nové klienty na objednávku.",
    url: "https://www.masazekestner.cz",
    image: "/portfolio/kestner.jpg",
    alt: "Prezentační web pro maséra Tomáše Kestnera — masáže Mladá Boleslav",
    badgeType: "client" as const,
  },
  {
    number: "04",
    title: "Auf Gehts",
    category: "Vzdělávání & Osobní brand",
    tech: "Next.js · TypeScript · Framer Motion",
    description: "Osobní brand web pro lektora němčiny. Zaměřeno na důvěru a první kontakt.",
    url: "https://auf-gehts-cz-56ly.vercel.app",
    image: "/portfolio/aufgehts.jpg",
    alt: "Osobní web na míru pro lektora němčiny Auf Gehts — příklad webu pro živnostníka",
    badgeType: "demo" as const,
  },
  {
    number: "05",
    title: "EstatIQ",
    category: "PropTech & Správa nemovitostí",
    tech: "HTML/CSS/JS Vanilla",
    description: "Vlastní SaaS produkt pro správu nemovitostí — platební automatizace, evidence dokumentů a daňový export. Aktuálně v prelaunch fázi s early access waitlistem.",
    url: "https://www.estatiq.cz",
    image: "/portfolio/estatiq.jpg",
    alt: "EstatIQ — vlastní produkt pro správu nemovitostí ve fázi prelaunch",
    badgeType: "own" as const,
  },
];

const badgeStyles: Record<string, { label: string; className: string }> = {
  client: { label: "Skutečný klient", className: "text-[#c9a84c] border-[#c9a84c]/30" },
  demo: { label: "Ukázkový projekt", className: "text-[#8a8070] border-white/[0.1]" },
  own: { label: "Vlastní produkt (prelaunch)", className: "text-[#e8c76a] border-[#e8c76a]/25" },
};

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
          className="font-inter font-light text-[16px] md:text-[19px] text-[#c8c0b4] leading-[1.7] max-w-xl mb-16">
          Weby a grafika, které zvyšují konverze a tržby. Každý projekt je ručně vytvořený, každý má svůj příběh.
        </motion.p>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="space-y-5">
          {projects.map((p, i) => (
            <motion.a key={i} variants={fadeUp} href={p.url} target="_blank" rel="noopener noreferrer"
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
