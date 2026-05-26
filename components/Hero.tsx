"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { staggerFast, fadeIn, fadeUp } from "@/lib/animations";
import { CTAButton } from "@/components/CTAButton";

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

  const go = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const words = ["Weby,", "které", "přivádějí", "zákazníky", "–", "ne", "jen", "návštěvníky."];

  return (
    <section id="hero" className="relative min-h-screen h-screen flex items-start md:items-center justify-center overflow-hidden bg-[#080808]" aria-label="Úvodní sekce">
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

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto pt-24 sm:pt-28 md:pt-20 pb-16 sm:pb-20 md:pb-28">
        <motion.h1 variants={staggerFast} initial="hidden" animate="visible"
          className="font-cormorant font-light leading-[1.05] text-[38px] sm:text-[48px] md:text-[84px] lg:text-[100px] text-[#f0ece6] mb-6 md:mb-8"
          aria-label="Weby, které přivádějí zákazníky – ne jen návštěvníky.">
          {words.map((word, i) => (
            <motion.span key={i} variants={fadeUp}
              className={`inline-block mr-[0.2em] last:mr-0 ${i >= 4 ? "text-shimmer" : ""}`}>
              {word}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 0.8 }}
          className="font-inter font-light text-[16px] md:text-[18px] leading-[1.8] text-[#8a8070] max-w-lg mx-auto mb-12">
          Web za 7 dní. Zákazníci navždy.
        </motion.p>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <CTAButton className="glow-pulse font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300 w-full sm:w-auto text-center">
            Nezávazná konzultace zdarma →
          </CTAButton>
          <a href="#sluzby" onClick={go("#sluzby")}
            className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#f0ece6] border border-white/10 px-8 py-4 hover:border-white/20 hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center">
            Zobrazit služby
          </a>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.2 }}
          className="flex items-center justify-center flex-wrap gap-x-3 gap-y-2">
          {[
            { text: "Bez závazků", icon: "✓" },
            { text: "Transparentní ceník", icon: "✓" },
            { text: "Jen výsledky", icon: "✓" },
          ].map((item, i) => (
            <motion.span
              key={i}
              className="inline-flex items-center gap-[5px] px-3 py-[5px] font-inter font-medium text-[10px] uppercase tracking-[0.18em] border"
              style={{
                color: "#c9a84c",
                borderColor: "rgba(201,168,76,0.25)",
                background: "rgba(201,168,76,0.05)",
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 + i * 0.12, duration: 0.4 }}
              whileHover={{
                borderColor: "rgba(201,168,76,0.55)",
                background: "rgba(201,168,76,0.1)",
                y: -1,
              }}
            >
              <span style={{ color: "rgba(201,168,76,0.6)", fontSize: "9px" }}>{item.icon}</span>
              {item.text}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Scroll */}
      <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.8 }}
        className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3" aria-hidden="true">
        <span className="font-inter font-light text-[10px] tracking-[0.25em] text-[#3d3830] uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#c9a84c]/60 to-transparent origin-top scroll-line" />
      </motion.div>
    </section>
  );
}
