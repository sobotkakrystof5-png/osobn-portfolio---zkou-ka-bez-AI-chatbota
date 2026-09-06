"use client";

import { motion } from "framer-motion";
import { TestimonialCard } from "@/components/TestimonialCard";
import { carouselTestimonials } from "@/lib/data/testimonials";
import { fadeUp, stagger, cardEntrance, viewport } from "@/lib/animations";

export default function ReferencesSection() {
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
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-14 max-w-2xl"
        >
          Co o nás <span className="text-shimmer">řekli</span>.
        </motion.h2>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-stretch"
        >
          {carouselTestimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={cardEntrance}>
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
