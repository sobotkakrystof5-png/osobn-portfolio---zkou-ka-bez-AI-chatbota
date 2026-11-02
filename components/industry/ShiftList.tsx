"use client";

import { ArrowRight, Check, X } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { viewport } from "@/lib/animations";
import { Vizeon } from "@/components/brand/BrandName";

// Srovnání „dnes“ × „s webem od nás“ pro jeden obor. Při vstupu do výřezu
// se problém přeškrtne a z něj vyjede řešení: čin, ne jen slova. Výchozí
// stav je i pod reduced motion stejný (kvůli hydrataci), jen délky jsou nulové.

const EASE = [0.22, 1, 0.36, 1] as const;

export function ShiftList({ shifts }: { shifts: { pain: string; fix: string }[] }) {
  const reduced = useReducedMotion() ?? false;
  const d = (s: number) => (reduced ? 0 : s);

  return (
    <div>
      <div className="mb-4 hidden grid-cols-[1fr_56px_1.15fr] font-inter text-[13px] font-medium uppercase tracking-[0.14em] md:grid">
        <p className="text-text-muted">Dnes</p>
        <span />
        <p className="text-[#e3c878]">
          S webem od <Vizeon />
        </p>
      </div>

      <ul className="space-y-3">
        {shifts.map((shift, i) => (
          <motion.li
            key={shift.pain}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 items-stretch gap-2 md:grid-cols-[1fr_56px_1.15fr] md:gap-0"
          >
            <motion.div
              variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0 } }}
              transition={{ duration: d(0.6), ease: EASE, delay: d(i * 0.12) }}
              className="flex items-start gap-3.5 bg-white/[0.025] px-5 py-5"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d9776a]/15 text-[#e48a7d] ring-1 ring-[#d9776a]/35">
                <X size={15} strokeWidth={2.4} aria-hidden="true" />
              </span>
              {/* Přeškrtnutí přes všechny řádky: animuje se barva čáry, ne její šířka. */}
              <motion.p
                variants={{
                  hidden: { textDecorationColor: "rgba(228,138,125,0)", color: "#c9c1b3" },
                  visible: { textDecorationColor: "rgba(228,138,125,0.75)", color: "#a39a8b" },
                }}
                transition={{ duration: d(0.5), delay: d(0.55 + i * 0.12) }}
                className="font-inter text-[16px] leading-[1.55] line-through decoration-1 md:text-[17px]"
              >
                {shift.pain}
              </motion.p>
            </motion.div>

            <span className="hidden items-center justify-center text-[#c9a84c] md:flex" aria-hidden="true">
              <motion.span
                variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: d(0.4), delay: d(0.8 + i * 0.12) }}
              >
                <ArrowRight size={20} strokeWidth={1.6} />
              </motion.span>
            </span>

            <motion.div
              variants={{ hidden: { opacity: 0, x: 20 }, visible: { opacity: 1, x: 0 } }}
              transition={{ duration: d(0.7), ease: EASE, delay: d(0.9 + i * 0.12) }}
              className="flex items-start gap-3.5 border border-[#c9a84c]/35 bg-[#15110a] px-5 py-5"
            >
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#c9a84c] text-[#080808]">
                <Check size={16} strokeWidth={3} aria-hidden="true" />
              </span>
              <p className="font-inter text-[16px] font-medium leading-[1.55] text-[#f6f2ea] md:text-[17px]">{shift.fix}</p>
            </motion.div>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
