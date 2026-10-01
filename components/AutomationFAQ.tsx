"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { AUTOMATION_FAQ } from "@/lib/data/automation";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Stejný princip jako components/FAQ.tsx: odpověď je v DOM vždy a sbaluje se
// přes grid-template-rows, ne podmíněným mountem. Crawlery a AI enginy, které
// čtou vykreslený text, tak vidí všechny odpovědi, ne jen tu otevřenou.

export default function AutomationFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const reduced = useReducedMotion() ?? false;

  return (
    <div className="max-w-3xl">
      {AUTOMATION_FAQ.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={faq.question}
            variants={reduced ? undefined : fadeUp}
            initial={reduced ? false : "hidden"}
            whileInView={reduced ? undefined : "visible"}
            viewport={viewport}
            className="border-b border-white/[0.05] last:border-b-0"
          >
            <button
              id={`automatizace-faq-btn-${i}`}
              type="button"
              aria-expanded={isOpen}
              aria-controls={`automatizace-faq-panel-${i}`}
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full min-h-[44px] flex items-center justify-between gap-6 py-5 text-left group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c]"
            >
              <span
                className={cn(
                  "font-inter font-medium text-[14px] transition-colors duration-300",
                  isOpen ? "text-[#c9a84c]" : "text-[#f0ece6] group-hover:text-[#c9a84c]",
                )}
              >
                {faq.question}
              </span>
              <ChevronDown
                size={16}
                className={cn("shrink-0 text-[#c9a84c] transition-transform duration-300", isOpen && "rotate-180")}
                aria-hidden="true"
              />
            </button>

            <div
              id={`automatizace-faq-panel-${i}`}
              role="region"
              aria-labelledby={`automatizace-faq-btn-${i}`}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className={cn(t.body, "pb-5 pt-1")}>{faq.answer}</p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
