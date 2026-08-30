"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { faqs } from "@/lib/data/faq";

function FAQItem({ faq, isOpen, onToggle, index }: { faq: typeof faqs[0]; isOpen: boolean; onToggle: () => void; index: number }) {
  return (
    <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
      className="border-b border-white/[0.05] last:border-b-0">
      <button id={`faq-btn-${index}`} aria-expanded={isOpen} aria-controls={`faq-panel-${index}`}
        onClick={onToggle} className="w-full flex items-center justify-between py-5 text-left group">
        <span className={`font-inter font-medium text-[14px] pr-8 transition-colors duration-300 ${isOpen ? "text-[#c9a84c]" : "text-[#f0ece6] group-hover:text-[#c9a84c]"}`}>
          {faq.question}
        </span>
        <ChevronDown size={16} className={`shrink-0 text-[#c9a84c] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {isOpen && <div className="h-[1px] faq-line-expand" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} aria-hidden="true" />}

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div id={`faq-panel-${index}`} role="region" aria-labelledby={`faq-btn-${index}`}
            initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden">
            <p className="font-inter font-light text-[14px] text-[#8a8070] leading-[1.85] pb-5 pt-3">{faq.answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-28 md:py-40 bg-[#080808]" aria-label="Časté dotazy">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Časté dotazy
        </motion.p>
        <motion.h1 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-14 max-w-2xl">
          Odpovědi na vaše otázky.
        </motion.h1>

        <div className="max-w-3xl">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} isOpen={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? null : i)} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
