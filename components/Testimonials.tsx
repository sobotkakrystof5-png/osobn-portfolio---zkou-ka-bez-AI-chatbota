"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, stagger, viewport } from "@/lib/animations";
import FirstClientModal from "@/components/FirstClientModal";

const placeholders = [
  {
    label: "Vaše zkušenost zde",
    desc: "Buďte první, kdo sdílí svůj příběh spolupráce.",
  },
  {
    label: "Vaše zkušenost zde",
    desc: "Společně vytvoříme web, který vám přivede zákazníky.",
  },
  {
    label: "Vaše zkušenost zde",
    desc: "Přímá komunikace, výsledky na míru vašemu oboru.",
  },
];

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
            — Co říkají klienti
          </motion.p>

          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl"
          >
            Klienti, kteří to <span className="text-shimmer">zažili</span>.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="font-inter font-light text-[15px] md:text-[17px] text-[#8a8070] max-w-xl mb-16 leading-[1.8]"
          >
            Teprve začínám budovat portfolio referencí. Buď mezi prvními&nbsp;—
            a získej výhodné podmínky.
          </motion.p>

          {/* Placeholder cards */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {placeholders.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="group h-full bg-[#111111] border border-dashed border-white/[0.07] p-7 flex flex-col gap-5 hover:border-[rgba(201,168,76,0.2)] transition-all duration-300 relative overflow-hidden"
              >
                {/* Corner glow on hover */}
                <div
                  className="absolute top-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at top right, rgba(201,168,76,0.07), transparent 70%)",
                  }}
                  aria-hidden="true"
                />

                {/* Avatar placeholder */}
                <div
                  className="w-9 h-9 rounded-full bg-white/[0.03] border border-dashed border-white/[0.07]"
                  aria-hidden="true"
                />

                {/* Text skeleton lines */}
                <div className="flex flex-col gap-2 flex-1" aria-hidden="true">
                  <div className="h-[2px] w-2/3 bg-white/[0.05] rounded" />
                  <div className="h-[2px] w-full bg-white/[0.04] rounded" />
                  <div className="h-[2px] w-4/5 bg-white/[0.04] rounded" />
                  <div className="h-[2px] w-3/5 bg-white/[0.03] rounded" />
                </div>

                {/* Label & desc */}
                <div>
                  <p className="font-inter font-medium text-[13px] text-[#3d3830] mb-1">
                    {item.label}
                  </p>
                  <p className="font-inter font-light text-[12px] text-[#2a2520] leading-[1.7]">
                    {item.desc}
                  </p>
                </div>

                {/* CTA */}
                <button
                  onClick={() => setModalOpen(true)}
                  className="inline-flex font-inter font-medium text-[12px] tracking-[0.08em] uppercase text-[#c9a84c] border border-[rgba(201,168,76,0.3)] px-4 py-2 hover:bg-[rgba(201,168,76,0.06)] hover:border-[rgba(201,168,76,0.5)] transition-all duration-300 mt-auto w-fit"
                >
                  Stát se prvním klientem →
                </button>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <FirstClientModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
