"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { User, Briefcase, Handshake, Images, Receipt, LayoutDashboard, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeUp, stagger, cardEntrance, viewport } from "@/lib/animations";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

type Card = {
  href: string;
  label: string;
  icon: LucideIcon;
  tagline: string;
  body: string;
  span: string;
};

const cards: Card[] = [
  {
    href: "/o-mne",
    label: "O mně",
    icon: User,
    tagline: "Jeden kontakt. Žádné přehazování. Výsledky.",
    body: "S agenturou dostanete juniora, kterého nikdy neuvidíte. Se mnou mluvíte pořád se stejným člověkem. Od prvního e-mailu až po spuštěný web.",
    span: "md:col-span-4",
  },
  {
    href: "/sluzby",
    label: "Služby",
    icon: Briefcase,
    tagline: "Ne co umím. Co z toho budete mít vy.",
    body: "Web, AI chatbot, rezervační systém, grafika. Řeším to, co váš obor skutečně potřebuje, ne univerzální balíček pro každého.",
    span: "md:col-span-4",
  },
  {
    href: "/spoluprace",
    label: "Spolupráce",
    icon: Handshake,
    tagline: "Víte přesně, co se děje a kdy.",
    body: "Sedm kroků od první konzultace po bezpečné předání webu. Žádné černé skříňky, žádné čekání bez informací.",
    span: "md:col-span-4",
  },
  {
    href: "/ukazky-webu",
    label: "Projekty",
    icon: Images,
    tagline: "Výsledky mluví za vše.",
    body: "Zámečnictví, penzion, kadeřnictví i vzdělávací projekt. Podívejte se na hotové weby a přečtěte si, co o spolupráci říkají samotní klienti.",
    span: "md:col-span-12",
  },
  {
    href: "/cena-tvorby-webu",
    label: "Ceník",
    icon: Receipt,
    tagline: "Cena tvorby webu na míru.",
    body: "Ceny vidíte hned, bez vyplňování formuláře. Nabízím weby od jednoduché vizitky po kompletní web, s jasným rozpisem toho, za co platíte.",
    span: "md:col-span-6",
  },
  {
    href: "/zakaziq",
    label: "ZakazIQ",
    icon: LayoutDashboard,
    tagline: "Přímá komunikace. Zpětná vazba. Přehled.",
    body: "Po konzultaci vás rovnou zařadím do systému. Schůzku si domluvíte na pár kliknutí a vidíte přesně, v jaké fázi je váš projekt.",
    span: "md:col-span-6",
  },
];

export default function HomeExplore() {
  return (
    <section id="prozkoumat" className="py-28 md:py-40 bg-[#0e0e0e]" aria-label="Prozkoumejte VIZEON">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className={cn(t.eyebrow, "mb-4")}>
          — Kdo jsme
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className={cn(t.h2Page, "mb-6 max-w-2xl")}>
          Prozkoumejte <span className="tracking-[0.12em]">VIZEON</span>
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className={cn(t.lead, "max-w-2xl mb-16")}>
          Poznejte VIZEON, náš přístup k práci, nabízené služby, realizované projekty i způsob,
          jakým probíhá spolupráce. Nechybí ani transparentní ceník a klientský portál ZakazIQ.
        </motion.p>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {cards.map((card) => (
            <motion.div key={card.href} variants={cardEntrance} whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 320, damping: 26 }}
              className={card.span}>
              <Link href={card.href}
                className="group relative glass-panel glass-panel-hover p-7 md:p-8 h-full flex flex-col overflow-hidden">
                <div className="card-shimmer-line absolute top-0 left-0 right-0 h-[1px] pointer-events-none" aria-hidden="true" />

                <div className="relative w-10 h-10 border border-[rgba(201,168,76,0.4)] flex items-center justify-center mb-6 group-hover:border-[rgba(201,168,76,0.8)] transition-all duration-300">
                  <card.icon size={17} className="text-[#c9a84c] group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                </div>

                <h3 className="font-cormorant font-light text-[24px] md:text-[26px] text-[#f0ece6] mb-2 leading-tight">
                  {card.label}
                </h3>
                <p className="font-inter font-medium text-[13px] text-[#c9a84c] mb-4 leading-snug">
                  {card.tagline}
                </p>
                <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.75] mb-4">
                  {card.body}
                </p>

                <span className="mt-auto pt-2 inline-flex items-center gap-1.5 font-inter font-medium text-[12px] tracking-[0.08em] uppercase text-[#8a8070] group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300">
                  Prozkoumat <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
