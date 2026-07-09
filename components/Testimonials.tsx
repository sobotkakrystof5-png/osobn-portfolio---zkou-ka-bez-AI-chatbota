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
            Co o nás <span className="text-shimmer">řekli</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-inter font-light text-[16px] md:text-[18px] text-[#8a8070] max-w-2xl mb-12 leading-[1.9]"
          >
            Stavím portfolio referencí krok za krokem. To pro vás znamená jedno:{" "}
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
            className="mb-16"
          >
            <div className="border border-[#c9a84c]/20 bg-[#141414] p-8 md:p-10 max-w-2xl relative">
              <span className="absolute top-6 left-8 text-[#c9a84c]/30 font-cormorant text-[72px] leading-none select-none">&ldquo;</span>
              <p className="font-inter font-light text-[15px] md:text-[17px] text-[#c8c0b4] leading-[1.9] mt-8 mb-8">
                Spolupráce s Kryštofem z Vizeon na našem novém a skvělém webu u-cerhu.cz byla konstruktivní, rychlá a hlavně zábavná. Doporučím všem ve svém okolí. Jen tak dál a přeji hodně úspěchů, Kryštofe.
              </p>
              <div className="flex items-center gap-4 pt-4 border-t border-[#c9a84c]/10">
                <div>
                  <p className="font-inter font-medium text-[13px] text-[#f0ece6] tracking-wide">Jiří Bartoň</p>
                  <a
                    href="https://www.u-cerhu.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter font-light text-[12px] text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-200 tracking-[0.05em]"
                  >
                    u-cerhu.cz ↗
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

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
              Pojďme do toho společně →
            </button>
          </motion.div>
        </div>
      </section>

      <FirstClientModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
