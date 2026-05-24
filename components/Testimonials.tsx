"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";
import FirstClientModal from "@/components/FirstClientModal";

export default function Testimonials() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        id="reference"
        className="py-28 md:py-40 bg-[#0e0e0e] overflow-hidden"
        aria-label="Reference"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4"
          >
            — Upřímně
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-8 max-w-2xl"
          >
            Upřímně o <span className="text-shimmer">referencích</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-inter font-light text-[16px] md:text-[18px] text-[#8a8070] max-w-2xl mb-12 leading-[1.9]"
          >
            Teprve stavím své portfolio referencí. To pro vás znamená jedno:{" "}
            <span className="text-[#f0ece6]">
              věnuji vašemu projektu plnou pozornost
            </span>
            , férové ceny a dokazuji kvalitu prací, ne slovy.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
            >
              Získat výhodné podmínky prvního klienta →
            </button>
          </motion.div>
        </div>
      </section>

      <FirstClientModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
