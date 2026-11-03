"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// Pás „Jak to funguje" na /zakaziq. Port z alteno (ZakazIqSteps.tsx): po
// dojetí do výřezu se čísla krok po kroku rozsvítí zlatě a mezi nimi
// přejede linka, zakázka pásem „proteče". Texty jsou v HTML od začátku,
// animuje se jen barva a scaleX.

type Step = { title: string; detail: ReactNode };

const STAGGER_MS = 160;

export function ZakazIqSteps({ steps }: { steps: Step[] }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const lit = reduced || inView;

  return (
    <ol ref={ref} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title}>
          <div aria-hidden="true" className="flex items-center gap-4">
            <span
              className={cn(
                "font-cormorant text-[44px] font-light leading-none lining-nums tabular-nums transition-colors",
                reduced ? "duration-0" : "duration-700",
                lit ? "text-[#c9a84c]" : "text-white/20"
              )}
              style={reduced ? undefined : { transitionDelay: `${i * STAGGER_MS}ms` }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {i < steps.length - 1 && (
              <span className="hidden h-px flex-1 overflow-hidden bg-white/[0.08] lg:block">
                <motion.span
                  className="block h-full w-full origin-left bg-gradient-to-r from-[#c9a84c] to-[#c9a84c]/50"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: lit ? 1 : 0 }}
                  transition={{
                    duration: reduced ? 0 : 0.7,
                    delay: reduced ? 0 : (i * STAGGER_MS) / 1000 + 0.15,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </span>
            )}
          </div>
          <h3 className="mt-4 font-inter text-[16px] font-medium text-[#f0ece6]">{step.title}</h3>
          <p className="mt-1 font-inter text-[15px] text-text-secondary">{step.detail}</p>
        </li>
      ))}
    </ol>
  );
}
