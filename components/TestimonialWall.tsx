"use client";

import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";
import { homeTestimonials } from "@/lib/data/testimonials";

export default function TestimonialWall() {
  return (
    <section aria-label="Reference klientů" className="py-20 md:py-28 bg-[#0e0e0e]">
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
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-12 max-w-2xl"
        >
          Co o nás <span className="text-shimmer">řekli</span>.
        </motion.h2>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="relative border border-[#c9a84c]/20 bg-[#141414]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 left-6 md:left-10 font-cormorant text-[120px] md:text-[160px] leading-none text-[#c9a84c]/[0.08] select-none"
          >
            &ldquo;
          </span>

          <div className="relative flex flex-wrap items-center gap-x-8 gap-y-3 px-8 md:px-12 pt-9 pb-7 border-b border-[#c9a84c]/10">
            <div className="flex items-center gap-3">
              <span className="font-cormorant font-light text-[40px] leading-none text-[#f0ece6]">
                5,0
              </span>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-0.5 text-[#c9a84c]" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={11} className="fill-[#c9a84c]" />
                  ))}
                </div>
                <span className="font-inter font-light text-[11px] tracking-[0.05em] text-[#8a8070]">
                  z {homeTestimonials.length} referencí
                </span>
              </div>
            </div>
            <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.6]">
              Beze slev na upřímnosti — reference psali klienti sami, beze změny.
            </p>
          </div>

          <div className="relative grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#c9a84c]/10">
            {homeTestimonials.map((t) => (
              <div key={t.name} className="flex flex-col p-8 md:p-10">
                <p className="font-cormorant font-light text-[22px] md:text-[24px] leading-[1.35] text-[#f0ece6] mb-4">
                  {t.highlight}
                </p>
                <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.8] mb-6 flex-1 [-webkit-line-clamp:4] [display:-webkit-box] [-webkit-box-orient:vertical] overflow-hidden">
                  {t.quote}
                </p>
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-[#c9a84c]/10">
                  <p className="font-inter font-medium text-[13px] text-[#f0ece6] tracking-wide">
                    {t.name}
                  </p>
                  <a
                    href={t.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-inter font-light text-[12px] text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-200 tracking-[0.05em] shrink-0"
                  >
                    {t.urlLabel}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
