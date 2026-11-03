"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { Handshake, ShieldCheck, Clock } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/animations";

// Pruh důvěry hned pod hero. Sedí v samostatném pásu (o odstín světlejší
// pozadí, vlasová linka nahoře i dole), ať se oddělí od hero. Váhu nesou
// zlatá čísla, která po najetí do obrazovky naběhnou od nuly. Čísla jsou v Interu s tabulkovými
// číslicemi: všechny cifry mají stejnou šířku, takže se při počítání
// nehýbou do stran (Cormorant má proporční číslice a skákal by).
const ITEMS = [
  { icon: Handshake, value: 10, suffix: "+", title: "Spokojených klientů", sub: "Od řemeslníků po malé firmy" },
  { icon: ShieldCheck, value: 100, suffix: " %", title: "Spokojenost", sub: "Garance úprav, dokud nejste spokojeni" },
  { icon: Clock, value: 60, suffix: " min", title: "Odpovídáme do hodiny", sub: "A navrhneme dva termíny hovoru" },
];

// Server vykreslí cílovou hodnotu (crawler i čtečka bez JS ji vidí), po
// hydrataci se číslo mimo obrazovku vynuluje a naběhne, až se pruh ukáže.
// Píše se rovnou do textContent, ať animace nepřekresluje React 60× za
// sekundu. S prefers-reduced-motion zůstává cílová hodnota bez animace.
function CountUp({ to, delay }: { to: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, viewport);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduced) {
      node.textContent = String(to);
      return;
    }
    if (!inView) {
      node.textContent = "0";
      return;
    }
    const controls = animate(0, to, {
      duration: 1.8,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (value) => {
        node.textContent = String(Math.round(value));
      },
    });
    return () => controls.stop();
  }, [inView, reduced, to, delay]);

  return <span ref={ref}>{to}</span>;
}

export default function SocialProof() {
  return (
    <section aria-label="Proč spolupracovat s námi" className="py-10 md:py-12 bg-[#0b0b0b] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(201,168,76,0.15)]"
        >
          {ITEMS.map(({ icon: Icon, value, suffix, title, sub }, index) => (
            <motion.li key={title} variants={fadeUp} className="flex flex-col items-center text-center px-6 lg:px-10 py-8 sm:py-1">
              <span className="w-9 h-9 border border-[rgba(201,168,76,0.4)] flex items-center justify-center mb-4" aria-hidden="true">
                <Icon size={16} strokeWidth={1.25} className="text-[#c9a84c]" />
              </span>
              <p className="font-inter font-semibold text-[clamp(38px,3vw+20px,52px)] leading-none tracking-[-0.035em] tabular-nums text-[#c9a84c] mb-3">
                <CountUp to={value} delay={index * 0.1} />
                <span className="text-[0.5em] font-medium tracking-normal text-[#c9a84c]/70">{suffix}</span>
              </p>
              <p className="font-inter font-medium text-[15px] text-[#f0ece6] mb-1">{title}</p>
              <p className="font-inter font-normal text-[13px] text-text-secondary leading-[1.6]">{sub}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
