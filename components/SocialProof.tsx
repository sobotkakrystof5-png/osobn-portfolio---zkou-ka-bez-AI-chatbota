"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MessageCircle, Clock } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const ITEMS = [
  { icon: ShieldCheck, title: "100 % spokojenost", sub: "Garance úprav, dokud nejste spokojeni" },
  { icon: MessageCircle, title: "Komunikujete přímo se mnou", sub: "Žádný account manager mezi vámi a mnou" },
  { icon: Clock, title: "Odpovídám do 24 hodin", sub: "Vždy víte, na čem jste" },
];

export default function SocialProof() {
  return (
    <section aria-label="Přístup ke spolupráci" className="py-20 md:py-28 bg-[#0e0e0e]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-[rgba(201,168,76,0.12)]"
        >
          {ITEMS.map(({ icon: Icon, title, sub }, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="flex flex-col items-center text-center gap-3 px-8 py-8 sm:py-0"
            >
              <Icon size={24} strokeWidth={1.5} className="text-[#c9a84c]" aria-hidden="true" />
              <p className="font-inter font-medium text-[16px] text-[#f0ece6] tracking-[0.01em]">{title}</p>
              <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.6]">{sub}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
