"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Palette, PresentationIcon, Megaphone, RefreshCw } from "lucide-react";
import { fadeUp, cardEntrance, staggerDramatic, viewport } from "@/lib/animations";
import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

const scrollToCenik = () => {
  document.querySelector("#cenik")?.scrollIntoView({ behavior: "smooth" });
};

const services = [
  {
    icon: Globe,
    title: "Tvorba webů na míru",
    subtitle: "Vizitka · Promo stránka · Plnohodnotný web",
    description: "Weby, které přivádějí zákazníky — ne jen návštěvníky. Každý pixel ručně, každý detail pro váš byznys.",
    badge: "Nejoblíbenější",
    packages: ["Online Vizitka — od 7 499 Kč", "Promo Page (landing page) — od 9 999 Kč", "Pro Web (více stránek + animace) — od 14 999 Kč", "Web Care — 999 Kč/měs"],
  },
  {
    icon: Zap,
    title: "Webové aplikace",
    subtitle: "Rezervační systémy · Kalkulačky · Nástroje na míru",
    description: "Rezervační systémy, kalkulačky, nástroje na míru. Technologie, která pracuje za vás.",
    packages: ["Kalkulačka na míru", "Rezervační systém", "Interaktivní formuláře", "Vlastní dashboard"],
  },
  {
    icon: Palette,
    title: "Grafický design",
    subtitle: "Logo · Vizitky · Bannery · Tiskoviny",
    description: "Logo, vizitky, šablony, PDF materiály. Vizuální identita, která se nezapomíná.",
    badge: "Nejžádanější",
    packages: ["Brand Logo — od 699 Kč", "Business Card — od 299 Kč", "Social Visual — od 299 Kč", "Print Design — od 699 Kč"],
  },
  {
    icon: PresentationIcon,
    title: "Firemní prezentace",
    subtitle: "PowerPoint · Google Slides · PDF",
    description: "PowerPoint, který přesvědčí i nejsceptičtějšího klienta. Žádné šablony. Jen váš příběh.",
    packages: ["Slide Deck Standard — od 1 099 Kč", "Slide Deck Premium — od 3 499 Kč"],
  },
  {
    icon: Megaphone,
    title: "Správa sociálních sítí",
    subtitle: "Instagram · Facebook · LinkedIn",
    description: "Obsah, grafiky, publikování, komentáře. Vy podnikejte — sítě nechte na mně.",
    packages: ["Social Starter — od 4 999 Kč/měs", "Social Pro — od 7 499 Kč/měs", "Content Blueprint — 499 Kč"],
  },
  {
    icon: RefreshCw,
    title: "Správa & údržba webu",
    subtitle: "Aktualizace · Bezpečnost · Změny obsahu",
    description: "Aktualizace, bezpečnost, změny obsahu. Web, který funguje dnes i za rok.",
    badge: "Výhodné",
    packages: ["Web Care — 999 Kč/měs", "Jednorázové úpravy na vyžádání"],
  },
];

/* ─── 3D Tilt card ──────────────────────────────────── */
function TiltCard({
  children,
  className,
  onClick,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  ariaLabel?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${-y * 7}deg) rotateY(${x * 7}deg)`;
    card.style.transition = "transform 0.08s ease-out";
  };

  const handleMouseLeave = () => {
    const card = ref.current;
    if (!card) return;
    card.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    card.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
  };

  return (
    <div
      ref={ref}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onClick?.()}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

/* ─── Plovoucí zlaté částice v pozadí ───────────────── */
function FloatingParticles() {
  const particles = [
    { left: "7%",  top: "12%", size: 2,   dur: 5.0, delay: 0.0 },
    { left: "91%", top: "28%", size: 1.5, dur: 6.5, delay: 1.2 },
    { left: "53%", top: "68%", size: 2.5, dur: 4.5, delay: 0.5 },
    { left: "18%", top: "78%", size: 1.0, dur: 7.0, delay: 2.0 },
    { left: "76%", top: "9%",  size: 2.0, dur: 5.5, delay: 1.8 },
    { left: "40%", top: "42%", size: 1.5, dur: 6.0, delay: 0.8 },
    { left: "63%", top: "85%", size: 1.0, dur: 5.8, delay: 3.0 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#c9a84c]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], opacity: [0.08, 0.32, 0.08] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

export default function Services() {
  return (
    <section id="sluzby" className="py-28 md:py-40 bg-[#0e0e0e] relative overflow-hidden" aria-label="Služby">
      <FloatingParticles />

      {/* Ambient glow blobs */}
      <div
        className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04), transparent 70%)", filter: "blur(90px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.03), transparent 70%)", filter: "blur(90px)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4"
        >
          — Co pro vás udělám
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-16 max-w-2xl"
        >
          Ne co umím. Co z toho budete mít <span className="text-shimmer">vy</span>.
        </motion.h2>

        <motion.div
          variants={staggerDramatic}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {services.map((s, i) => (
            <motion.div
              key={i}
              variants={cardEntrance}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <TiltCard
                ariaLabel={`${s.title} – zobrazit ceník`}
                onClick={scrollToCenik}
                className="group relative glass-panel glass-panel-hover p-7 md:p-8 cursor-pointer h-full"
              >
                {/* Gradient pozadí */}
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(155deg, #141414 0%, #0d0d0d 100%)" }} aria-hidden="true" />

                {/* Watermark číslo — dekorativní */}
                <div
                  className="absolute top-4 right-6 font-cormorant text-[64px] leading-none select-none pointer-events-none text-white/[0.025] group-hover:text-[rgba(201,168,76,0.06)] transition-colors duration-500"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 20% 0%, rgba(201,168,76,0.06), transparent 60%)" }}
                  aria-hidden="true"
                />

                {/* Top shimmer line */}
                <div className="card-shimmer-line absolute top-0 left-0 right-0 h-[1px] pointer-events-none" aria-hidden="true" />

                {/* Left accent stripe — hover */}
                <div
                  className="absolute left-0 top-10 bottom-10 w-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.4), transparent)" }}
                  aria-hidden="true"
                />

                {/* Badge slot — pevná výška */}
                <div className="h-7 flex items-center mb-5 relative z-10">
                  {s.badge && (
                    <span
                      className={`font-inter font-medium text-[10px] tracking-[0.1em] uppercase px-2.5 py-[3px] ${
                        s.badge === "Nejoblíbenější"
                          ? "text-[#080808] bg-[#c9a84c] badge-pulse"
                          : "text-[#c9a84c] border border-[rgba(201,168,76,0.4)] badge-outline-glow"
                      }`}
                    >
                      {s.badge}
                    </span>
                  )}
                </div>

                {/* Ikonka v boxu */}
                <div className="relative w-10 h-10 border border-[rgba(201,168,76,0.15)] flex items-center justify-center mb-6 group-hover:border-[rgba(201,168,76,0.45)] transition-all duration-300 z-10">
                  <s.icon
                    size={17}
                    className="text-[#c9a84c] group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(201,168,76,0.05)" }}
                    aria-hidden="true"
                  />
                </div>

                {/* Název — Cormorant serif, dominantní */}
                <h3 className="font-cormorant font-light text-[22px] md:text-[25px] text-[#f0ece6] mb-2 leading-tight relative z-10">
                  {s.title}
                </h3>

                {/* Subtitle s dash */}
                <p className="font-inter font-light text-[11px] text-[#c9a84c]/60 mb-4 tracking-[0.05em] flex items-center gap-2 relative z-10">
                  <span className="w-4 h-[1px] bg-[#c9a84c]/35 shrink-0" aria-hidden="true" />
                  {s.subtitle}
                </p>

                {/* Popis */}
                <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.75] mb-5 relative z-10">
                  {s.description}
                </p>

                {/* Balíčky jako tagy — jen názvy */}
                {s.packages && (
                  <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
                    {s.packages.map((pkg, j) => {
                      const name = pkg.split(" — ")[0].split(" (")[0];
                      return (
                        <span
                          key={j}
                          className="font-inter font-light text-[10px] text-[#8a8070]/45 border border-white/[0.05] px-2 py-0.5 bg-white/[0.015] group-hover:border-white/[0.08] transition-colors duration-300"
                        >
                          {name}
                        </span>
                      );
                    })}
                  </div>
                )}

                <p className="font-inter font-light text-[11px] tracking-[0.1em] uppercase text-[#c9a84c]/40 group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300 relative z-10">
                  Zobrazit ceny →
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
