"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Search, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Našeptávač vyhledávače s frázemi, které zákazníci oboru opravdu píšou.
// Fráze se po jedné „napíšou“ do pole a v seznamu se rozsvítí ta aktuální.
// Seznam je v HTML celý (SEO i bez JS), animace jen přepíná zvýraznění.

export function SearchPanel({ searches }: { searches: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.5 });
  const reduced = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(searches[0]?.length ?? 0);

  const current = searches[active] ?? "";

  useEffect(() => {
    if (!inView || reduced) {
      setTyped(current.length);
      return;
    }
    setTyped(0);
    let i = 0;
    const type = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= current.length) window.clearInterval(type);
    }, 55);
    const next = window.setTimeout(() => setActive((a) => (a + 1) % searches.length), current.length * 55 + 1800);
    return () => {
      window.clearInterval(type);
      window.clearTimeout(next);
    };
  }, [active, inView, reduced, current, searches.length]);

  return (
    <div ref={ref} className="border border-white/[0.08] bg-[#0e0e0e] p-5 sm:p-7">
      <div className="flex items-center gap-3 bg-[#f5f0e8] px-4 py-3.5" aria-hidden="true">
        <Search size={18} className="shrink-0 text-[#6b6355]" />
        <span className="min-w-0 truncate font-inter text-[16px] text-[#1d1b18]">
          {current.slice(0, typed)}
          <span className="ml-0.5 inline-block h-[18px] w-px translate-y-[3px] animate-pulse bg-[#1d1b18]" />
        </span>
      </div>
      <ul className="mt-2" aria-label="Fráze, které zákazníci píšou do vyhledávače">
        {searches.map((phrase, i) => (
          <li key={phrase}>
            <button
              type="button"
              onClick={() => setActive(i)}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-3 text-left font-inter text-[16px] transition-colors duration-300",
                i === active ? "bg-[#c9a84c]/[0.12] text-[#f6f2ea]" : "text-text-secondary hover:bg-white/[0.03] hover:text-[#f0ece6]"
              )}
            >
              <Search size={15} aria-hidden="true" className={cn("shrink-0", i === active ? "text-[#c9a84c]" : "text-text-muted")} />
              <span className="min-w-0 flex-1">{phrase}</span>
              <TrendingUp
                size={15}
                aria-hidden="true"
                className={cn("shrink-0 transition-opacity duration-300", i === active ? "text-[#c9a84c] opacity-100" : "opacity-0")}
              />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
