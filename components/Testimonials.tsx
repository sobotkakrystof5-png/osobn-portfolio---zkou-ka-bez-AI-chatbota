"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";
import FirstClientModal from "@/components/FirstClientModal";
import { TestimonialCard } from "@/components/TestimonialCard";
import { testimonials } from "@/lib/data/testimonials";

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
            Stavím portfolio referencí krok za krokem. Každému projektu věnuji{" "}
            <span className="text-[#f0ece6]">
              plnou pozornost
            </span>{" "}
            a nabízím férové ceny. Kvalitu ale dokazuji prací, ne slovy.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-5xl mb-16"
          >
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} {...testimonial} />
            ))}
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
