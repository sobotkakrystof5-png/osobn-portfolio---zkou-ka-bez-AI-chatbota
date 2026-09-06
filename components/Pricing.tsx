"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, cardEntrance, staggerDramatic, viewport } from "@/lib/animations";
import { PRICING_CATEGORIES, type PricingItem } from "@/lib/data/pricing";

function ServiceCard({ item }: { item: PricingItem }) {
  return (
    <motion.div
      className={`relative glass-panel glass-panel-hover p-6 overflow-hidden h-full flex flex-col ${
        item.featured ? "border-[rgba(201,168,76,0.35)]!" : ""
      }`}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
    >
      {item.featured && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at top, rgba(201,168,76,0.06), transparent 60%)" }}
          aria-hidden="true"
        />
      )}

      {/* Top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{ background: item.featured ? "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)" : undefined }}
        aria-hidden="true"
      />

      {/* Badge slot — pevná výška, žádné skákání */}
      <div className="h-8 flex items-center mb-3">
        {item.badge && (
          <span
            className={`font-inter font-medium text-[10px] tracking-[0.1em] uppercase px-2.5 py-[3px] ${
              item.badge === "Nejoblíbenější"
                ? "text-[#080808] bg-[#c9a84c] badge-pulse"
                : "text-[#c9a84c] border border-[rgba(201,168,76,0.4)] badge-outline-glow"
            }`}
          >
            {item.badge}
          </span>
        )}
      </div>

      {/* Název — dominantní */}
      <h4 className="font-inter font-semibold text-[14px] text-[#f0ece6] mb-0.5 relative z-10">{item.name}</h4>

      {/* Subtitle — malé, popisné */}
      {item.subtitle && (
        <p className="font-inter font-light text-[11px] text-[#c9a84c]/60 mb-3 tracking-[0.03em] relative z-10">
          {item.subtitle}
        </p>
      )}

      <div className="mt-auto">
        <p className="font-cormorant font-normal text-[30px] text-[#f0ece6] leading-none mb-3 relative z-10">{item.price}</p>
        {item.bonus && (
          <p className="font-inter font-light text-[11px] text-[#c9a84c] relative z-10">{item.bonus}</p>
        )}
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  return (
    <section id="cenik" className="py-28 md:py-40 bg-[#080808]" aria-label="Ceník">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4"
        >
          — Transparentní ceník
        </motion.p>
        <motion.h1
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl"
        >
          Cena webu na míru.
        </motion.h1>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[15px] md:text-[17px] text-[#8a8070] leading-[1.8] max-w-xl mb-16"
        >
          Ceník je veřejný a stejný pro každého klienta, cena se odvíjí jen od rozsahu práce.
          Najdete tu stejné služby i bundly, které používám v nabídkách. Pokud řešíte konkrétní
          obor, mrkněte i na{" "}
          <Link href="/tvorba-webu-pro-zivnostniky" className="text-[#c9a84c] hover:underline">
            tvorbu webu pro živnostníky
          </Link>
          . Kompletní rozbor, co všechno cenu ovlivňuje, najdete v článku{" "}
          <Link href="/blog/kolik-stoji-tvorba-webu-2026" className="text-[#c9a84c] hover:underline">
            Kolik stojí tvorba webových stránek v roce 2026
          </Link>
          .
        </motion.p>

        <div className="space-y-10">
          {PRICING_CATEGORIES.map((group, gi) => (
            <div key={gi}>
              <h3 className="font-inter font-medium text-[11px] uppercase tracking-[0.15em] text-[#3d3830] mb-5 flex items-center gap-2">
                <group.icon size={14} className="text-[#c9a84c]/60" aria-hidden="true" />
                {group.category}
              </h3>
              <motion.div
                variants={staggerDramatic}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                {group.items.map((item, ii) => (
                  <motion.div key={ii} variants={cardEntrance} className="h-full">
                    <ServiceCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Trust strip — jemné info o konzultaci a platbě */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="mt-12 pt-8 border-t border-white/[0.04] flex flex-wrap items-center gap-x-8 gap-y-3"
          aria-label="Obchodní podmínky"
        >
          {[
            "Nezávazná konzultace zdarma",
            "Záloha 30 % · doplatek 70 % po dokončení",
            "Cena dle dohodnuté nabídky",
          ].map((item, i) => (
            <span key={i} className="font-inter font-light text-[11px] tracking-[0.05em] text-[#3d3830] flex items-center gap-2">
              <span className="text-[#c9a84c]/25 text-[8px]">◆</span>
              {item}
            </span>
          ))}
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="mt-8 border border-[rgba(201,168,76,0.2)] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-[rgba(201,168,76,0.4)] transition-[border-color] duration-300"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at left, rgba(201,168,76,0.04), transparent 60%)" }}
            aria-hidden="true"
          />
          <div>
            <h3 className="font-cormorant font-light text-[26px] text-[#f0ece6] mb-1">Není tu váš případ?</h3>
            <p className="font-inter font-light text-[14px] text-[#8a8070]">Napište mi a sestavím nabídku přesně pro vás.</p>
          </div>
          <Link
            href="/kontakt"
            className="shrink-0 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
          >
            Napsat zprávu →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
