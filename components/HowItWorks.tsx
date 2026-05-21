"use client";

import { motion } from "framer-motion";
import { Phone, Ruler, MessageCircle, Code2, Eye, Settings2, Rocket } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const steps = [
  { number: "01", icon: Phone, title: "První konzultace", description: "Zavoláme si nebo napíšeme. Zdarma, bez závazků. Pochopím váš byznys a cíle." },
  { number: "02", icon: Ruler, title: "Návrh konceptu", description: "Připravím první vizuální návrh přesně pro vás — ne šablonu, ale váš web." },
  { number: "03", icon: MessageCircle, title: "Konzultace návrhu", description: "Společně projdeme návrh. Upravíme vše co potřebujete. Váš souhlas je nutný." },
  { number: "04", icon: Code2, title: "Tvorba webu", description: "Stavím váš web. Ručně, s péčí o každý detail. Průběžně informuji o postupu." },
  { number: "05", icon: Eye, title: "Ukázka webu", description: "Pošlu vám live odkaz na rozpracovaný web. Vidíte vše v reálném provozu." },
  { number: "06", icon: Settings2, title: "Doladění detailů", description: "Poslední úpravy. Dokud nejste 100% spokojeni. Žádný spěch, žádné kompromisy." },
  { number: "07", icon: Rocket, title: "Bezpečné předání", description: "Přístupy, návod, podpora. Web je váš. Plná kontrola ve vašich rukou." },
];

export default function HowItWorks() {
  return (
    <section id="jak-to-funguje" className="py-28 md:py-40 bg-[#080808]" aria-label="Jak to funguje">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Jak spolupráce probíhá
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-16 max-w-2xl">
          Sedm kroků od nápadu ke spuštění.
        </motion.h2>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport} className="relative">
          <div className="absolute left-[28px] md:left-[52px] top-4 bottom-4 w-[1px]"
            style={{ background: "linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.05))" }} aria-hidden="true" />
          <div className="space-y-10 md:space-y-12">
            {steps.map((step, i) => (
              <motion.div key={i} variants={fadeUp} className="relative flex items-start pl-[64px] md:pl-[112px] gap-6 group">
                <span className="absolute left-0 font-cormorant font-light text-[44px] leading-none text-[#c9a84c]/20 select-none group-hover:text-[#c9a84c]/40 transition-colors duration-300" aria-hidden="true">
                  {step.number}
                </span>
                <div className="absolute left-[18px] md:left-[42px] top-0.5 w-[22px] h-[22px] rounded-full bg-[#080808] border border-[rgba(201,168,76,0.3)] flex items-center justify-center group-hover:border-[rgba(201,168,76,0.6)] transition-colors duration-300" aria-hidden="true">
                  <step.icon size={11} className="text-[#c9a84c]" />
                </div>
                <div>
                  <h3 className="font-inter font-medium text-[15px] text-[#f0ece6] mb-1.5">{step.title}</h3>
                  <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.75] max-w-xl">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
