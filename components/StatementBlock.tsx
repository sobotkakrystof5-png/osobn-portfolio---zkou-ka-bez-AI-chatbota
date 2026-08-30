"use client";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";

const STATEMENT_INTRO =
  "Nejsem tým, který se rok co rok mění. Za svou prací stojím vlastním jménem, a proto mi na jejím výsledku záleží stejně jako vám. ";
const STATEMENT_EMPHASIS =
  "Pracuji do té doby, dokud nejste s výsledkem plně spokojeni. Dokud není všechno podle vašich představ, nepřestávám.";

export default function StatementBlock() {
  return (
    <section className="py-20 md:py-28 bg-[#0e0e0e]" aria-label="Přístup ke tvorbě webů">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2">
          <span className="font-cormorant font-light text-6xl text-[#c9a84c] select-none" aria-hidden="true">01</span>
        </div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="md:col-span-8 md:col-start-4">
          <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
            Naše motto
          </p>
          <p className="font-cormorant font-light text-[26px] md:text-[34px] leading-[1.25] text-[#f0ece6]">
            {STATEMENT_INTRO}
            <span className="text-[#c9a84c]">{STATEMENT_EMPHASIS}</span>
          </p>
          <span className="mt-8 block font-cormorant font-light text-[20px] tracking-[0.3em] text-[#f0ece6]">
            VIZEON
          </span>
        </motion.div>
      </div>
    </section>
  );
}
