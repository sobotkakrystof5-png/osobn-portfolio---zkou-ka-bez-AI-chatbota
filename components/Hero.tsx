"use client";

import { Fragment, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { heroIn } from "@/lib/animations";
import { CTAButton } from "@/components/CTAButton";
import { BrandLockup } from "@/components/brand/BrandLockup";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let id: number;
    const pts: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    const n = window.innerWidth < 768 ? 35 : 70;

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < n; i++) pts.push({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.25, vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.2 + 0.3, o: Math.random() * 0.2 + 0.05,
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of pts) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.o})`;
        ctx.fill();
      }
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(id); };
  }, []);

  const words = ["Weby", "a", "e-shopy,", "které", "spojují", "moderní", "design,", "SEO", "a", "automatizaci", "procesů."];

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080808]" aria-label="Úvodní sekce">
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" aria-hidden="true" />

      {/* Mřížka v pozadí */}
      <div className="grid-overlay z-0" aria-hidden="true" />

      {/* FloatGlow orb — zlatý vlevo */}
      <motion.div
        className="glow-orb absolute -left-16 md:-left-40 top-1/3 w-[200px] h-[200px] md:w-[480px] md:h-[480px] rounded-full bg-[#c9a84c] z-0"
        animate={{ y: [0, -14, 0], opacity: [0.3, 0.5, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      />

      {/* FloatGlow orb — teplý vpravo */}
      <motion.div
        className="glow-orb absolute -right-16 md:-right-48 bottom-[10%] w-[180px] h-[180px] md:w-[420px] md:h-[420px] rounded-full z-0"
        style={{ background: "#6b4f1a" }}
        animate={{ y: [0, 14, 0], opacity: [0.25, 0.42, 0.25], scale: [1, 1.04, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        aria-hidden="true"
      />

      {/* Velký středový glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[700px] md:h-[700px] rounded-full pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 65%)" }}
        aria-hidden="true" />

      {/* Tenká zlatá linka dole */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] z-0"
        style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }}
        aria-hidden="true" />

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24 sm:pt-28 md:pt-24 pb-12 sm:pb-14 md:pb-20">
        {/* Vstup textu běží v CSS (.hero-in), ne přes framer-motion: H1 a podtitulek
            jsou LCP prvky a s JS animací se na mobilu ukázaly až po hydrataci
            (LCP 5–7 s). Proto i kratší zpoždění než dřív (podtitulek míval 0,8 s). */}
        <h1
          className="font-cormorant font-light leading-[1.12] text-[38px] sm:text-[48px] md:text-[62px] lg:text-[76px] text-[#f0ece6] mb-5 md:mb-6"
          aria-label="Weby a e-shopy, které spojují moderní design, SEO a automatizaci procesů.">
          {words.map((word, i) => (
            <Fragment key={i}>
              <span style={heroIn(i * 50, 45)}
                className={`hero-in inline-block ${i >= 7 ? "text-shimmer" : ""}`}>
                {word}
              </span>
              {/* Mezera jako reálný text uzel MIMO inline-block span (ne jen CSS
                  margin), ať plain-text extrakce (čtečky, Google, AI crawlery)
                  nečte slova slepená dohromady — viz SXO audit finding 5.
                  Musí být sourozenec spanu, ne jeho potomek: mezera na konci
                  obsahu display:inline-block boxu se ořízne na nulovou šířku
                  (inline-block si své okraje řádku zarovnává samo), takže by
                  vizuálně zmizela a slova by se slepila. */}
              {i < words.length - 1 ? " " : ""}
            </Fragment>
          ))}
        </h1>

        <h2 style={heroIn(200, 0)}
          className="hero-in font-inter font-normal text-[15px] md:text-[17px] leading-[1.7] text-text-secondary max-w-lg mx-auto mb-8 md:mb-10 text-left">
          Pro živnostníky a malé i střední firmy stavím komplexní řešení na míru: weby a e-shopy, automatizaci procesů a AI chatboty. Komunikujete přímo se mnou, od první konzultace až po spuštění.
        </h2>

        <div style={heroIn(350, 0)}
          className="hero-in flex flex-col sm:flex-row items-center justify-center gap-4 mb-7">
          <CTAButton className="glow-pulse font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300 w-full sm:w-auto text-center">
            Nezávazná konzultace zdarma →
          </CTAButton>
          <Link href="/ukazky-webu"
            className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#f0ece6] border border-white/10 px-8 py-4 hover:border-white/20 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center">
            Ukázky webů
          </Link>
        </div>

        {/* Spolupráce ALTENO × VIZEON hned pod hlavními CTA, ještě nad ohybem.
            Logo ALTENO tu záměrně NENÍ odkaz ven: návštěvník hero sekce ještě
            nemá důvod odcházet, „Automatizace →" vede dovnitř webu. */}
        <div style={heroIn(450, 0)}
          className="hero-in flex flex-col items-center gap-2.5">
          <BrandLockup size="sm" />
          <p className="font-inter font-normal text-[12px] text-text-secondary">
            Weby a automatizace pod jednou střechou ·{" "}
            <Link href="/automatizace" className="text-[#c9a84c] hover:underline">
              Automatizace →
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}
