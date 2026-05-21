"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Palette, PresentationIcon, Megaphone, RefreshCw } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const scrollToCenik = () => {
  document.querySelector("#cenik")?.scrollIntoView({ behavior: "smooth" });
};

const services = [
  { icon: Globe, title: "Tvorba webů na míru", description: "Od jednoduché vizitky po složitý React/Next.js web. Každý pixel ručně. Každý detail pro váš byznys." },
  { icon: Zap, title: "Webové aplikace", description: "Rezervační systémy, kalkulačky, nástroje na míru. Technologie, která pracuje za vás." },
  { icon: Palette, title: "Grafický design", description: "Logo, vizitky, šablony, PDF materiály. Vizuální identita, která se nezapomíná." },
  { icon: PresentationIcon, title: "Firemní prezentace", description: "PowerPoint, který přesvědčí i nejsceptičtějšího klienta. Žádné šablony. Jen váš příběh." },
  { icon: Megaphone, title: "Správa sociálních sítí", description: "Obsah, grafiky, publikování, komentáře. Vy podnikejte — sítě nechte na mně." },
  { icon: RefreshCw, title: "Správa & údržba webu", description: "Aktualizace, bezpečnost, změny obsahu. Web, který funguje dnes i za rok." },
];

export default function Services() {
  return (
    <section id="sluzby" className="py-28 md:py-40 bg-[#0e0e0e]" aria-label="Služby">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Co pro vás udělám
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-16 max-w-2xl">
          Ne co umím. Co z toho budete mít <span className="text-shimmer">vy</span>.
        </motion.h2>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {services.map((s, i) => (
            <motion.div key={i} variants={fadeUp}
              onClick={scrollToCenik}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && scrollToCenik()}
              aria-label={`${s.title} – zobrazit ceník`}
              className="group relative bg-[#111111] border border-white/[0.05] p-7 md:p-9 overflow-hidden hover:border-[rgba(201,168,76,0.2)] hover:-translate-y-1 transition-all duration-300 cursor-pointer">
              {/* Hover glow corner */}
              <div className="absolute top-0 right-0 w-24 h-24 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: "radial-gradient(circle at top right, rgba(201,168,76,0.08), transparent 70%)" }} />
              <s.icon size={20} className="text-[#c9a84c] mb-5 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
              <h3 className="font-inter font-medium text-[15px] text-[#f0ece6] mb-3">{s.title}</h3>
              <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.7]">{s.description}</p>
              <p className="mt-4 font-inter font-light text-[11px] tracking-[0.1em] uppercase text-[#c9a84c]/60 group-hover:text-[#c9a84c] transition-colors duration-300">Zobrazit ceny →</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
