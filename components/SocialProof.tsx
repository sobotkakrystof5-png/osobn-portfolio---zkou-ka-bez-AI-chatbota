"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { Handshake, ShieldCheck, Clock } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

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

// Server vykreslí cílovou hodnotu (crawler i čtečka bez JS ji vidí). Po
// hydrataci se číslo vynuluje a naběhne, až se pruh ukáže. Píše se rovnou do
// textContent, ať animace nepřekresluje React 60× za sekundu. Dřív to dělal
// framer-motion (`animate`, `useInView`), teď requestAnimationFrame a
// IntersectionObserver. S prefers-reduced-motion zůstává cílová hodnota.
const DURATION_MS = 1800;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

function CountUp({ to, delay }: { to: number; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timer = 0;
    const run = () => {
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / DURATION_MS, 1);
        node.textContent = String(Math.round(easeOutExpo(p) * to));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    };

    node.textContent = "0";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(run, delay * 1000);
      },
      { rootMargin: "0px 0px -60px 0px" },
    );
    io.observe(node);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(frame);
      node.textContent = String(to);
    };
  }, [to, delay]);

  return <span ref={ref}>{to}</span>;
}

export default function SocialProof() {
  const listRef = useReveal<HTMLUListElement>();
  return (
    <section aria-label="Proč spolupracovat s námi" className="py-10 md:py-12 bg-[#0b0b0b] border-y border-white/[0.06]">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <ul
          ref={listRef}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(201,168,76,0.15)]"
        >
          {ITEMS.map(({ icon: Icon, value, suffix, title, sub }, index) => (
            <li key={title} style={{ "--reveal-i": index } as CSSProperties} className="reveal-item flex flex-col items-center text-center px-6 lg:px-10 py-8 sm:py-1">
              <span className="w-9 h-9 border border-[rgba(201,168,76,0.4)] flex items-center justify-center mb-4" aria-hidden="true">
                <Icon size={16} strokeWidth={1.25} className="text-[#c9a84c]" />
              </span>
              <p className="font-inter font-semibold text-[clamp(38px,3vw+20px,52px)] leading-none tracking-[-0.035em] tabular-nums text-[#c9a84c] mb-3">
                <CountUp to={value} delay={index * 0.1} />
                <span className="text-[0.5em] font-medium tracking-normal text-[#c9a84c]/70">{suffix}</span>
              </p>
              <p className="font-inter font-medium text-[15px] text-[#f0ece6] mb-1">{title}</p>
              <p className="font-inter font-normal text-[13px] text-text-secondary leading-[1.6]">{sub}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
