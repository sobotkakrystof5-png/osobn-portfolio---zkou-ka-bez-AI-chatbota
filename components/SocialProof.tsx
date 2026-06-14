"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { stagger, fadeUp, viewport } from "@/lib/animations";

const stats = [
  { prefix: "", value: 10, suffix: "+", label: "spokojených klientů", sublabel: "Každý ručně, žádné šablony" },
  { prefix: "+", value: 40, suffix: "%", label: "průměrný nárůst tržeb", sublabel: "Po spuštění nového webu" },
  { prefix: "", value: 10, suffix: " dní", label: "web hotový", sublabel: "Zákazníci navždy" },
  { prefix: "", value: 100, suffix: "%", label: "spokojenost klientů", sublabel: "Opravy do úplné spokojenosti" },
];

function SpinCounter({ prefix, value, suffix, active }: { prefix: string; value: number; suffix: string; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const duration = 1800;

    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      // ease out expo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplay(Math.floor(ease * value));
      if (progress < 1) requestAnimationFrame(step);
      else { setDisplay(value); setDone(true); }
    };
    requestAnimationFrame(step);
  }, [active, value]);

  return (
    <span className={`font-cormorant font-light leading-none tabular-nums transition-all duration-300 ${done ? "text-[#c9a84c]" : "text-[#f0ece6]"}`}
      style={{ fontSize: "clamp(52px, 7vw, 80px)" }}>
      {prefix}{display}{suffix}
    </span>
  );
}

export default function SocialProof() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} aria-label="Výsledky v číslech" className="relative py-20 md:py-28 bg-[#0e0e0e] overflow-hidden">
      {/* Zlaté linky */}
      <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-[1px]" style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)" }} />

      {/* Glow uprostřed */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="flex flex-col items-center text-center gap-3 px-4">
              <SpinCounter prefix={s.prefix} value={s.value} suffix={s.suffix} active={active} />
              <div>
                <p className="font-inter font-medium text-[14px] text-[#f0ece6] mb-0.5">{s.label}</p>
                <p className="font-inter font-light text-[12px] text-[#8a8070]">{s.sublabel}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
