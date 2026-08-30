"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { fadeUp, cardEntrance, staggerDramatic, viewport } from "@/lib/animations";
import { SERVICE_CATEGORIES } from "@/lib/data/services";
import { useRef } from "react";
import type { MouseEvent, ReactNode } from "react";

/* ─── 3D Tilt card ──────────────────────────────────── */
// Karta je "stretched link" — skutečný <a href> přes celou plochu (z-20),
// takže jde otevřít v nové záložce, funguje bez JS a je indexovatelný. Vnořené
// odkazy v popisu (z-30, position: relative) leží nad ním, takže mají přednost
// tam, kde se s kartou překrývají.
function TiltCard({
  children,
  className,
  href,
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  href: string;
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
    >
      <Link href={href} aria-label={ariaLabel} className="absolute inset-0 z-20">
        <span className="sr-only">{ariaLabel}</span>
      </Link>
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
        <motion.h1
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl"
        >
          Ne co umím. Co z toho budete mít <span className="text-shimmer">vy</span>.
        </motion.h1>

        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[15px] md:text-[17px] text-[#8a8070] leading-[1.8] max-w-xl mb-16"
        >
          Ať potřebujete{" "}
          <Link href="/web-pro-remeslniky" className="text-[#c9a84c] hover:underline">
            web pro řemeslníky
          </Link>
          ,{" "}
          <Link href="/web-pro-kadernictvi" className="text-[#c9a84c] hover:underline">
            kadeřnictví
          </Link>{" "}
          nebo{" "}
          <Link href="/web-pro-ucetni" className="text-[#c9a84c] hover:underline">
            účetní kancelář
          </Link>
          , řeším ho na míru vašemu oboru. Přečtěte si, jak přesně probíhá{" "}
          <Link href="/tvorba-webu-pro-zivnostniky" className="text-[#c9a84c] hover:underline">
            tvorba webu pro živnostníky
          </Link>{" "}
          krok za krokem.
        </motion.p>

        <motion.div
          variants={staggerDramatic}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6"
        >
          {SERVICE_CATEGORIES.map((s, i) => (
            <motion.div
              key={i}
              variants={cardEntrance}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
            >
              <TiltCard
                ariaLabel={`${s.title} – zjistit více`}
                href={s.href}
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
                  Zjistit více →
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
