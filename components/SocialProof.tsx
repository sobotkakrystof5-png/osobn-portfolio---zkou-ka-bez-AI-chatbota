"use client";

import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";

export default function SocialProof() {
  return (
    <section aria-label="Přístup ke spolupráci" className="relative py-20 md:py-28 bg-[#0e0e0e] overflow-hidden">
      {/* Zlaté linky */}
      <div className="absolute top-0 inset-x-0 h-[1px]" style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)" }} />
      <div className="absolute bottom-0 inset-x-0 h-[1px]" style={{ background: "linear-gradient(90deg,transparent,rgba(201,168,76,0.25),transparent)" }} />

      {/* Glow uprostřed */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />

      <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="font-cormorant font-light text-[26px] md:text-[38px] leading-[1.3] text-[#f0ece6] mb-6"
        >
          Buduji si jméno, <span className="text-shimmer">projekt po projektu</span>.
        </motion.p>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.1 }}
          className="font-inter font-light text-[15px] md:text-[17px] leading-[1.9] text-[#8a8070] max-w-2xl mx-auto mb-12"
        >
          Každou zakázku beru jako referenci na celý svůj budoucí byznys. Proto dostanete mou plnou
          pozornost, poctivou cenu a garanci úprav do úplné spokojenosti — ne odbytou práci od agentury,
          která má 50 dalších klientů.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3"
        >
          {[
            { title: "Web hotový do 10 dní", sub: "Vždy dopředu víte přesný termín" },
            { title: "Odpovídám do 24 hodin", sub: "Žádné čekání na account managera" },
            { title: "Komunikujete přímo se mnou", sub: "Od první zprávy až po předání" },
          ].map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden border border-[rgba(201,168,76,0.2)] bg-[rgba(201,168,76,0.03)] px-5 py-3 flex flex-col items-center text-center gap-0.5 w-fit transition-colors duration-300 hover:border-[rgba(201,168,76,0.4)]"
            >
              {/* Horní zlatá linka */}
              <div
                className="absolute top-0 inset-x-0 h-[1px] pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, #c9a84c, transparent)" }}
                aria-hidden="true"
              />
              <p className="font-inter font-medium text-[14px] text-[#c9a84c] tracking-[0.02em]">{item.title}</p>
              <p className="font-inter font-light text-[12px] text-[#8a8070]">{item.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
