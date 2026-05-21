"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, stagger, viewport } from "@/lib/animations";

const services = [
  { category: "🌐 Weby", items: [
    { name: "Online Vizitka", originalPrice: "14 999 Kč", price: "7 499 Kč", bonus: "🎁 1× Social Visual", featured: false },
    { name: "Promo Page", originalPrice: "19 999 Kč", price: "9 999 Kč", bonus: "🎁 Business Card + 3× Social Visual", featured: true, badge: "Nejoblíbenější" },
    { name: "Pro Web", originalPrice: "29 999 Kč", price: "14 999 Kč", bonus: "🎁 Business Card + Logo + 5× Social Visual", featured: false },
    { name: "Web Care", originalPrice: "1 999 Kč", price: "999 Kč/měs", featured: false },
  ]},
  { category: "🎨 Design", items: [
    { name: "Brand Logo", originalPrice: "1 499 Kč", price: "699 Kč", featured: false },
    { name: "Business Card", originalPrice: "599 Kč", price: "299 Kč", featured: false },
    { name: "Social Visual", originalPrice: "599 Kč", price: "299 Kč/ks", bonus: "balíček 5ks: 1 299 Kč", featured: false },
    { name: "Print Design", originalPrice: "1 499 Kč", price: "699 Kč", featured: false },
  ]},
  { category: "📊 Prezentace", items: [
    { name: "Slide Deck Standard", originalPrice: "2 199 Kč", price: "1 099 Kč", featured: false },
    { name: "Slide Deck Premium", originalPrice: "6 999 Kč", price: "3 499 Kč", bonus: "🎁 1× Social Visual", featured: false },
  ]},
  { category: "📱 Správa sítí", items: [
    { name: "Social Starter", originalPrice: "9 999 Kč", price: "4 999 Kč/měs", bonus: "🎁 Content Blueprint", featured: false },
    { name: "Social Pro", originalPrice: "14 999 Kč", price: "7 499 Kč/měs", bonus: "🎁 Blueprint + 5× Social Visual", featured: false },
    { name: "Content Blueprint", originalPrice: "999 Kč", price: "499 Kč", featured: false },
  ]},
];

const bundles = [
  { name: "💼 Small Bundle", price: "1 699 Kč", savings: "ušetříte 1 295 Kč", includes: ["Brand Logo", "Business Card", "1× Social Visual"] },
  { name: "🌐 Small Bundle + Web", price: "9 999 Kč", savings: "ušetříte 7 494 Kč", includes: ["Promo Page", "Brand Logo", "Business Card", "3× Social Visual"] },
  { name: "🚀 Middle Bundle", price: "17 499 Kč", savings: "ušetříte 17 495 Kč", includes: ["Pro Web", "Brand Logo", "Business Card", "5× Social Visual", "Slide Deck Standard"] },
  { name: "💎 Mega Bundle", price: "29 999 Kč", savings: "ušetříte 35 001 Kč", includes: ["Pro Web", "Brand Logo", "Business Card", "10× Social Visual", "Slide Deck Premium", "Social Starter 3 měsíce"] },
];

type ServiceItem = { name: string; originalPrice: string; price: string; bonus?: string; featured: boolean; badge?: string };

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <div className={`relative bg-[#111111] border p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
      item.featured ? "border-[rgba(201,168,76,0.35)]" : "border-white/[0.05] hover:border-[rgba(201,168,76,0.15)]"
    }`}>
      {item.featured && (
        <>
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top, rgba(201,168,76,0.05), transparent 60%)" }} />
          <span className="absolute -top-3 left-5 font-inter font-medium text-[11px] tracking-[0.08em] uppercase text-[#080808] bg-[#c9a84c] px-3 py-1">
            {item.badge}
          </span>
        </>
      )}
      <h4 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-2">{item.name}</h4>
      <p className="font-inter font-light text-[12px] text-[#3d3830] line-through mb-1">{item.originalPrice}</p>
      <p className="font-cormorant font-normal text-[30px] text-[#f0ece6] leading-none mb-3">{item.price}</p>
      {item.bonus && <p className="font-inter font-light text-[11px] text-[#c9a84c]">{item.bonus}</p>}
    </div>
  );
}

function BundleCard({ bundle }: { bundle: typeof bundles[0] }) {
  return (
    <div className="bg-[#111111] border border-[rgba(201,168,76,0.15)] p-7 md:p-9 hover:border-[rgba(201,168,76,0.35)] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at top right, rgba(201,168,76,0.04), transparent 60%)" }} />
      <h4 className="font-cormorant font-light text-[26px] text-[#f0ece6] mb-1">{bundle.name}</h4>
      <p className="font-inter font-light text-[12px] text-[#c9a84c] mb-5">{bundle.savings}</p>
      <ul className="space-y-2 mb-6">
        {bundle.includes.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check size={12} className="text-[#c9a84c] shrink-0" aria-hidden="true" />
            <span className="font-inter font-light text-[13px] text-[#8a8070]">{item}</span>
          </li>
        ))}
      </ul>
      <p className="font-cormorant font-normal text-[38px] text-[#f0ece6] leading-none">{bundle.price}</p>
    </div>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState<"services" | "bundles">("services");

  return (
    <section id="cenik" className="py-28 md:py-40 bg-[#080808]" aria-label="Ceník">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Transparentní ceník
        </motion.p>
        <motion.h2 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-4 max-w-2xl">
          Férové ceny. Žádná překvapení.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[14px] text-[#8a8070] mb-12">
          Víte přesně co dostanete a za kolik. Žádné skryté poplatky.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="flex gap-6 mb-14 border-b border-white/[0.05] pb-0">
          {(["services", "bundles"] as const).map((t) => (
            <button key={t} role="tab" aria-selected={tab === t} onClick={() => setTab(t)}
              className={`font-inter text-[12px] tracking-[0.06em] uppercase pb-3 -mb-[1px] transition-all duration-300 ${
                tab === t ? "text-[#f0ece6] border-b border-[#c9a84c]" : "text-[#8a8070] border-b border-transparent hover:text-[#f0ece6]"
              }`}>
              {t === "services" ? "Jednotlivé služby" : "Výhodné bundly"}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "services" ? (
            <motion.div key="services" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }} className="space-y-10">
              {services.map((group, gi) => (
                <div key={gi}>
                  <h3 className="font-inter font-medium text-[11px] uppercase tracking-[0.15em] text-[#3d3830] mb-5">{group.category}</h3>
                  <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {group.items.map((item, ii) => (
                      <motion.div key={ii} variants={fadeUp}><ServiceCard item={item} /></motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div key="bundles" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
              <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
                className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {bundles.map((bundle, i) => (
                  <motion.div key={i} variants={fadeUp}><BundleCard bundle={bundle} /></motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="mt-14 border border-[rgba(201,168,76,0.2)] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at left, rgba(201,168,76,0.04), transparent 60%)" }} />
          <div>
            <h3 className="font-cormorant font-light text-[26px] text-[#f0ece6] mb-1">Není tu váš případ?</h3>
            <p className="font-inter font-light text-[14px] text-[#8a8070]">Napište mi — sestavím nabídku přesně pro vás.</p>
          </div>
          <a href="#kontakt" onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
            className="shrink-0 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-all duration-300">
            Napsat zprávu →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
