"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { fadeUp, stagger, cardEntrance, staggerDramatic, viewport } from "@/lib/animations";

const services = [
  {
    category: "🌐 Weby",
    items: [
      {
        name: "Online Vizitka",
        subtitle: "Jednostránkový web — kontakty, portfolio, o mně",
        price: "7 499 Kč",
        featured: false,
        badge: "Nejlevnější",
      },
      {
        name: "Promo Page",
        subtitle: "Landing page — jedna stránka, maximální dojem",
        price: "9 999 Kč",
        featured: true,
        badge: "Nejoblíbenější",
      },
      {
        name: "Pro Web",
        subtitle: "Více stránek, pokročilé animace a systémy na míru",
        price: "14 999 Kč",
        featured: false,
      },
      {
        name: "Web Care",
        subtitle: "Správa webu — aktualizace, bezpečnost, obsah",
        price: "999 Kč/měs",
        featured: false,
      },
    ],
  },
  {
    category: "🎨 Design",
    items: [
      {
        name: "Brand Logo",
        subtitle: "Originální logo — SVG, PNG, PDF v každé velikosti",
        price: "699 Kč",
        featured: false,
      },
      {
        name: "Business Card",
        subtitle: "Vizitka na míru — digitální i tisková verze",
        price: "299 Kč",
        featured: false,
        badge: "Nejlevnější",
      },
      {
        name: "Social Visual",
        subtitle: "Grafický post nebo story pro sociální sítě",
        price: "299 Kč/ks",
        bonus: "balíček 5ks: 1 299 Kč",
        featured: false,
      },
      {
        name: "Print Design",
        subtitle: "Leták, plakát nebo banner — připraveno k tisku",
        price: "699 Kč",
        featured: false,
      },
    ],
  },
  {
    category: "📊 Prezentace",
    items: [
      {
        name: "Slide Deck Standard",
        subtitle: "Prezentace do 15 slidů — design, struktura, obsah",
        price: "1 099 Kč",
        featured: false,
        badge: "Nejlevnější",
      },
      {
        name: "Slide Deck Premium",
        subtitle: "Prémiová prezentace bez omezení — animace, interaktivita",
        price: "3 499 Kč",
        featured: false,
      },
    ],
  },
  {
    category: "📱 Správa sítí",
    items: [
      {
        name: "Social Starter",
        subtitle: "Instagram nebo Facebook — 8 příspěvků/měs + komentáře",
        price: "4 999 Kč/měs",
        featured: false,
      },
      {
        name: "Social Pro",
        subtitle: "Instagram + Facebook — grafiky, texty, publikování, DM",
        price: "7 499 Kč/měs",
        featured: false,
      },
      {
        name: "Content Blueprint",
        subtitle: "Jednorázový content plán — témata, strategie, harmonogram",
        price: "499 Kč",
        featured: false,
        badge: "Nejlevnější",
      },
    ],
  },
];

const bundles = [
  {
    name: "💼 Small Bundle",
    tagline: "Starter Branding Pack",
    description: "Ideální pro živnostníky, kteří teprve začínají budovat značku",
    price: "2 499 Kč",
    includes: [
      "Brand Logo (699 Kč)",
      "Business Card (299 Kč)",
      "Content Blueprint (499 Kč)",
      "5× Social Visual (1 299 Kč)",
    ],
  },
  {
    name: "🌐 Small Bundle + Web",
    tagline: "Základ online prezence",
    description: "Starter Branding Pack + tvůj první profesionální web",
    price: "14 999 Kč",
    includes: [
      "Online Vizitka (7 499 Kč)",
      "Brand Logo (699 Kč)",
      "Business Card (299 Kč)",
      "Content Blueprint (499 Kč)",
      "5× Social Visual (1 299 Kč)",
    ],
  },
  {
    name: "🚀 Middle Bundle",
    tagline: "Rostoucí značka",
    description: "Nejpopulárnější volba — web + sociální sítě na 2 měsíce",
    price: "29 999 Kč",
    includes: [
      "Promo Page (9 999 Kč)",
      "Brand Logo (699 Kč)",
      "Business Card (299 Kč)",
      "Slide Deck Standard (1 099 Kč)",
      "Social Starter — 2 měsíce (9 998 Kč)",
      "Content Blueprint (499 Kč)",
      "5× Social Visual (1 299 Kč)",
    ],
  },
  {
    name: "💎 Mega Bundle",
    tagline: "Kompletní online prezence",
    description: "Vše co firma potřebuje na jednom místě",
    price: "49 999 Kč",
    includes: [
      "Pro Web (14 999 Kč)",
      "Brand Logo (699 Kč)",
      "Business Card (299 Kč)",
      "Slide Deck Premium (3 499 Kč)",
      "Social Pro — 3 měsíce (22 497 Kč)",
      "Content Blueprint (499 Kč)",
      "Web Care — 3 měsíce (2 997 Kč)",
    ],
  },
];

type ServiceItem = {
  name: string;
  subtitle?: string;
  price: string;
  bonus?: string;
  featured: boolean;
  badge?: string;
};

function ServiceCard({ item }: { item: ServiceItem }) {
  return (
    <motion.div
      className={`relative glass-panel glass-panel-hover p-6 overflow-hidden ${
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

      <p className="font-cormorant font-normal text-[30px] text-[#f0ece6] leading-none mb-3 relative z-10">{item.price}</p>
      {item.bonus && (
        <p className="font-inter font-light text-[11px] text-[#c9a84c] relative z-10">{item.bonus}</p>
      )}
    </motion.div>
  );
}

function BundleCard({ bundle }: { bundle: (typeof bundles)[0] }) {
  return (
    <motion.div
      className="glass-panel glass-panel-hover relative overflow-hidden group p-7 md:p-9"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top right, rgba(201,168,76,0.04), transparent 60%)" }}
        aria-hidden="true"
      />
      {/* Top shimmer line */}
      <div
        className="card-shimmer-line absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        aria-hidden="true"
      />

      {/* Název bundlu */}
      <h4 className="font-cormorant font-light text-[26px] text-[#f0ece6] mb-0.5 relative z-10">{bundle.name}</h4>

      {/* Tagline — co je to */}
      <p className="font-inter font-light text-[12px] text-[#c9a84c]/70 mb-1 tracking-[0.03em] relative z-10">{bundle.tagline}</p>

      {/* Stručný popis */}
      <p className="font-inter font-light text-[12px] text-[#8a8070] mb-4 relative z-10">{bundle.description}</p>

      {/* Co zahrnuje */}
      <ul className="space-y-2 mb-6 relative z-10">
        {bundle.includes.map((item, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check size={11} className="text-[#c9a84c] shrink-0" aria-hidden="true" />
            <span className="font-inter font-light text-[12px] text-[#8a8070]">{item}</span>
          </li>
        ))}
      </ul>

      {/* Cena */}
      <div className="relative z-10">
        <p className="font-cormorant font-normal text-[38px] text-[#f0ece6] leading-none">{bundle.price}</p>
      </div>
    </motion.div>
  );
}

export default function Pricing() {
  const [tab, setTab] = useState<"services" | "bundles">("services");

  return (
    <section id="cenik" className="py-28 md:py-40 bg-[#080808]" aria-label="Ceník">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4"
        >
          — Transparentní ceník
        </motion.p>
        <motion.h2
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-4 max-w-2xl"
        >
          Férové ceny. Žádná překvapení.
        </motion.h2>
        <motion.p
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="font-inter font-light text-[14px] text-[#8a8070] mb-8"
        >
          Víte přesně co dostanete a za kolik — cena dle dohodnuté nabídky.
        </motion.p>

        {/* ── Bundly banner ── */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="mb-12 relative overflow-hidden border border-[rgba(201,168,76,0.35)] bg-[rgba(201,168,76,0.04)] p-5 md:p-6 flex items-start gap-3"
          role="note"
          aria-label="Výhodné bundly"
        >
          {/* Levá zlatá linka */}
          <div
            className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none"
            style={{ background: "linear-gradient(180deg, transparent, #c9a84c, transparent)" }}
            aria-hidden="true"
          />
          <span className="text-[20px] shrink-0 mt-0.5" aria-hidden="true">💼</span>
          <div>
            <p className="font-inter font-semibold text-[13px] text-[#c9a84c] mb-0.5 tracking-[0.03em]">
              Výhodné bundly
            </p>
            <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.7]">
              Kombinací služeb do balíčku ušetříte až{" "}
              <span className="text-[#f0ece6] font-medium">desítky tisíc korun</span>{" "}
              oproti jednotlivým cenám. Vše pod záložkou Výhodné bundly.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="flex gap-6 mb-14 border-b border-white/[0.05] pb-0"
        >
          {(["services", "bundles"] as const).map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`font-inter text-[12px] tracking-[0.06em] uppercase pb-3 -mb-[1px] transition-all duration-300 ${
                tab === t
                  ? "text-[#f0ece6] border-b border-[#c9a84c]"
                  : "text-[#8a8070] border-b border-transparent hover:text-[#f0ece6]"
              }`}
            >
              {t === "services" ? "Jednotlivé služby" : "Výhodné bundly"}
            </button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {tab === "services" ? (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              {services.map((group, gi) => (
                <div key={gi}>
                  <h3 className="font-inter font-medium text-[11px] uppercase tracking-[0.15em] text-[#3d3830] mb-5">
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
                      <motion.div key={ii} variants={cardEntrance}>
                        <ServiceCard item={item} />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="bundles"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                className="grid grid-cols-1 md:grid-cols-2 gap-5"
              >
                {bundles.map((bundle, i) => (
                  <motion.div key={i} variants={fadeUp}>
                    <BundleCard bundle={bundle} />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

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
            <p className="font-inter font-light text-[14px] text-[#8a8070]">Napište mi — sestavím nabídku přesně pro vás.</p>
          </div>
          <a
            href="#kontakt"
            onClick={(e) => { e.preventDefault(); document.querySelector("#kontakt")?.scrollIntoView({ behavior: "smooth" }); }}
            className="shrink-0 font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(201,168,76,0.3)]"
          >
            Napsat zprávu →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
