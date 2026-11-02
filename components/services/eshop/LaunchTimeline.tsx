"use client";

import { motion } from "framer-motion";
import { Code2, FileCheck, Phone, Rocket, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";

// Spolupráce od konzultace po první objednávku. Linka se při najetí
// protáhne zleva doprava (na mobilu shora dolů) a kroky se rozsvítí za ní.
// Kroky jde předat zvenku (automatizace má 4); rozvržení umí 4 nebo 5.
export type TimelineStep = { icon: LucideIcon; title: string; text: string };

const STEPS: TimelineStep[] = [
  { icon: Phone, title: "Konzultace zdarma", text: "Probereme sortiment, dopravu, platby a vaše cíle." },
  { icon: FileCheck, title: "Návrh a pevná cena", text: "Víte, co dostanete a za kolik, ještě než začneme." },
  { icon: Code2, title: "Stavba a nastavení", text: "E-shop, platby, dopravce i sklad nastavíme a otestujeme." },
  { icon: Rocket, title: "Spuštění a zaškolení", text: "Spustíme, ukážeme vám správu a můžete prodávat." },
  { icon: TrendingUp, title: "Růst", text: "Reklamy, úpravy a nové funkce, až je budete potřebovat." },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Sloupce a linka mezi středy prvního a posledního kroužku (polovina sloupce).
const LAYOUT = {
  4: { cols: "lg:grid-cols-4", inset: "lg:left-[12.5%] lg:right-[12.5%]" },
  5: { cols: "lg:grid-cols-5", inset: "lg:left-[10%] lg:right-[10%]" },
} as const;

export function LaunchTimeline({ steps = STEPS }: { steps?: TimelineStep[] }) {
  const layout = LAYOUT[steps.length === 4 ? 4 : 5];
  const reduced = usePrefersReducedMotion();
  const lineDuration = reduced ? 0 : 1.4;
  const stepDelay = (index: number) => (reduced ? 0 : 0.15 + index * 0.26);

  return (
    <motion.ol
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      className={`relative grid gap-9 lg:gap-6 ${layout.cols}`}
    >
      {/* Linka: na desktopu vodorovně přes středy kroužků, na mobilu svisle. */}
      <span aria-hidden="true" className={`absolute bottom-6 left-[27px] top-6 w-px bg-white/[0.08] lg:bottom-auto lg:top-[27px] lg:h-px lg:w-auto ${layout.inset}`} />
      <motion.span
        aria-hidden="true"
        className={`absolute left-[27px] top-6 hidden h-px origin-left bg-[#c9a84c] lg:top-[27px] lg:block ${layout.inset}`}
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: lineDuration, ease: EASE } } }}
      />
      <motion.span
        aria-hidden="true"
        className="absolute bottom-6 left-[27px] top-6 w-px origin-top bg-[#c9a84c] lg:hidden"
        variants={{ hidden: { scaleY: 0 }, visible: { scaleY: 1, transition: { duration: lineDuration, ease: EASE } } }}
      />

      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.li
            key={step.title}
            className="relative grid grid-cols-[auto_minmax(0,1fr)] gap-x-5 lg:flex lg:flex-col lg:items-center lg:text-center"
            variants={{
              hidden: { opacity: 0, y: reduced ? 0 : 16 },
              visible: { opacity: 1, y: 0, transition: { duration: reduced ? 0 : 0.5, delay: stepDelay(index), ease: EASE } },
            }}
          >
            <motion.span
              className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border"
              variants={{
                hidden: { backgroundColor: "#080808", borderColor: "rgba(255,255,255,0.15)", color: "#8a8378" },
                visible: {
                  backgroundColor: "#c9a84c",
                  borderColor: "#c9a84c",
                  color: "#080808",
                  transition: { duration: reduced ? 0 : 0.4, delay: reduced ? 0 : stepDelay(index) + 0.2 },
                },
              }}
              aria-hidden="true"
            >
              <Icon size={22} strokeWidth={1.5} />
            </motion.span>
            <div className="lg:mt-5">
              <h3 className="font-inter text-[17px] font-medium text-[#f0ece6]">{step.title}</h3>
              <p className="mt-1.5 font-inter text-[15px] leading-[1.6] text-text-secondary">{step.text}</p>
            </div>
          </motion.li>
        );
      })}
    </motion.ol>
  );
}
