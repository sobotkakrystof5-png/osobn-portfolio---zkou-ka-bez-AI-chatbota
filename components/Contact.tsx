"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { fadeUp, slideLeft, slideRight, stagger, viewport } from "@/lib/animations";
import LeadForm from "@/components/LeadForm";
import PhoneReveal from "@/components/PhoneReveal";

function InstagramIcon({ size = 16, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Contact({ headingLevel = "h1" }: { headingLevel?: "h1" | "h2" }) {
  const Heading = motion[headingLevel];

  return (
    <section id="kontakt" className="py-28 md:py-40 bg-[#0e0e0e] relative overflow-hidden scroll-mb-24" aria-label="Kontakt">
      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.05), transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <Heading variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[52px] md:text-[88px] leading-[1.0] text-[#f0ece6] mb-16">
          Pojďme <span className="text-shimmer">na to</span>.
        </Heading>
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-5 gap-12 md:gap-16">

          {/* Formulář */}
          <motion.div variants={slideLeft} className="md:col-span-3">
            <LeadForm />
          </motion.div>

          {/* Kontaktní info */}
          <motion.div variants={slideRight} className="md:col-span-2">
            <div className="space-y-7 pl-0 md:pl-8" style={{ borderLeft: "0px" }}>
              <div className="hidden md:block w-full h-[1px] mb-2" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.3), transparent)" }} />
              <a href="mailto:info@vizeon.cz" className="flex items-center gap-3 group" aria-label="Email">
                <Mail size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-normal text-[14px] text-text-secondary group-hover:text-[#f0ece6] transition-colors duration-300 break-all">info@vizeon.cz</span>
              </a>
              <PhoneReveal iconSize={15} textSize={14} />
              <a href="https://www.instagram.com/vizeon_official/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group" aria-label="Instagram">
                <InstagramIcon size={15} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-normal text-[14px] text-text-secondary group-hover:text-[#f0ece6] transition-colors duration-300">Instagram</span>
              </a>
              <div className="pt-4">
                <p className="font-cormorant font-light text-[30px] leading-[1.25]">
                  <span className="text-shimmer">Odpovídáme do hodiny.</span>
                  <br />
                  <span className="text-text-secondary">Hovor navrhneme ve dvou termínech.</span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
