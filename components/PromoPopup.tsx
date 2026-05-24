"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";
import type { ServiceKey } from "@/types/booking";

// Mapování PromoPopup klíčů kategorií → BookingModal SERVICES klíče
const CATEGORY_KEY_MAP: Record<string, { key: ServiceKey; name: string }> = {
  weby:       { key: "weby",       name: "Weby" },
  design:     { key: "grafika",    name: "Grafický design" },
  prezentace: { key: "prezentace", name: "Prezentace" },
  social:     { key: "socialni",   name: "Sociální sítě" },
};

function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  return {
    m: String(Math.floor(left / 60)).padStart(2, "0"),
    s: String(left % 60).padStart(2, "0"),
  };
}

// Tři cenové kotvy — Jobs style: tržní cena → naše cena → exkluzivní dnes
const serviceCategories = [
  {
    key: "weby",
    emoji: "🌐",
    label: "Weby",
    count: "4 typy",
    items: [
      { name: "Online Vizitka",      subtitle: "Jednostránkový web",       original: "14 999 Kč",     mid: "7 499 Kč",    promo: "3 749 Kč" },
      { name: "Promo Page",          subtitle: "Landing page",              original: "19 999 Kč",     mid: "9 999 Kč",    promo: "4 999 Kč" },
      { name: "Pro Web",             subtitle: "Více stránek na míru",      original: "29 999 Kč",     mid: "14 999 Kč",   promo: "7 499 Kč" },
      { name: "Web Care",            subtitle: "Správa webu / měsíčně",     original: "1 999 Kč/měs",  mid: "999 Kč/měs",  promo: "499 Kč/měs" },
    ],
  },
  {
    key: "design",
    emoji: "🎨",
    label: "Design",
    count: "4 typy",
    items: [
      { name: "Brand Logo",          subtitle: "Originální logo",           original: "1 499 Kč",      mid: "699 Kč",      promo: "349 Kč" },
      { name: "Business Card",       subtitle: "Vizitka na míru",           original: "599 Kč",        mid: "299 Kč",      promo: "149 Kč" },
      { name: "Social Visual",       subtitle: "Post nebo story",           original: "599 Kč/ks",     mid: "299 Kč/ks",   promo: "149 Kč/ks" },
      { name: "Print Design",        subtitle: "Leták, plakát, banner",     original: "1 499 Kč",      mid: "699 Kč",      promo: "349 Kč" },
    ],
  },
  {
    key: "prezentace",
    emoji: "📊",
    label: "Prezentace",
    count: "2 typy",
    items: [
      { name: "Slide Deck Standard", subtitle: "Do 15 slidů",               original: "2 199 Kč",      mid: "1 099 Kč",    promo: "549 Kč" },
      { name: "Slide Deck Premium",  subtitle: "Bez limitu + animace",      original: "6 999 Kč",      mid: "3 499 Kč",    promo: "1 749 Kč" },
    ],
  },
  {
    key: "social",
    emoji: "📱",
    label: "Sociální sítě",
    count: "3 typy",
    items: [
      { name: "Social Starter",      subtitle: "8 příspěvků / měs",         original: "9 999 Kč/měs",  mid: "4 999 Kč/měs", promo: "2 499 Kč/měs" },
      { name: "Social Pro",          subtitle: "Kompletní správa sítí",     original: "14 999 Kč/měs", mid: "7 499 Kč/měs", promo: "3 749 Kč/měs" },
      { name: "Content Blueprint",   subtitle: "Jednorázový content plán",  original: "999 Kč",        mid: "499 Kč",       promo: "249 Kč" },
    ],
  },
];

type Step = "offer" | "category" | "service" | "reveal";

interface ServiceItem {
  name: string;
  subtitle: string;
  original: string;
  mid: string;
  promo: string;
}

interface ServiceCategory {
  key: string;
  emoji: string;
  label: string;
  count: string;
  items: ServiceItem[];
}

// Reveal fáze — Jobs 3-tier anchor:
// 0 → tržní cena se objeví (ihned)
// 1 → červená čára přeškrtne tržní cenu (800 ms)
// 2 → tržní cena PADÁ dolů, naše cena stoupá (1 500 ms)
// 3 → červená čára přeškrtne naši cenu (2 300 ms)
// 4 → naše cena PADÁ, promo cena stoupá se zlatým glowem (2 900 ms)
// 5 → "Teď pouze pro vás." (3 700 ms)
// 6 → CTA tlačítko (4 300 ms)

export default function PromoPopup() {
  const [visible, setVisible]         = useState(false);
  const [dismissed, setDismissed]     = useState(false);
  const [mounted, setMounted]         = useState(false);
  const [step, setStep]               = useState<Step>("offer");
  const [selectedCat, setSelectedCat] = useState<ServiceCategory | null>(null);
  const [selectedSvc, setSelectedSvc] = useState<ServiceItem | null>(null);
  const [revealPhase, setRevealPhase] = useState(0);
  const { openBooking }               = useBooking();
  const { m, s }                      = useCountdown(11 * 60 + 23);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("vizeon_promo_v4")) {
      setDismissed(true);
      return;
    }
    const hero = document.getElementById("hero");
    if (!hero) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (!e.isIntersecting) { setTimeout(() => setVisible(true), 500); obs.disconnect(); } },
      { threshold: 0.05 }
    );
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (step !== "reveal") { setRevealPhase(0); return; }
    const t1 = setTimeout(() => setRevealPhase(1), 800);
    const t2 = setTimeout(() => setRevealPhase(2), 1500);
    const t3 = setTimeout(() => setRevealPhase(3), 2300);
    const t4 = setTimeout(() => setRevealPhase(4), 2900);
    const t5 = setTimeout(() => setRevealPhase(5), 3700);
    const t6 = setTimeout(() => setRevealPhase(6), 4300);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); };
  }, [step]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => setDismissed(true), 600);
    if (typeof window !== "undefined") sessionStorage.setItem("vizeon_promo_v4", "1");
  }, []);

  const handleCTA = useCallback(() => {
    handleClose();
    // Předáme vybranou službu — BookingModal díky tomu přeskočí krok výběru
    // a klient jde rovnou na Kontakt → Termín → Souhrn.
    const mapped = selectedCat ? CATEGORY_KEY_MAP[selectedCat.key] : null;
    const prefill = (mapped && selectedSvc)
      ? { service: mapped.key, serviceName: mapped.name, subService: selectedSvc.name }
      : undefined;
    setTimeout(() => openBooking(prefill), 350);
  }, [openBooking, handleClose, selectedCat, selectedSvc]);

  // "Chci to" → výběr kategorie → výběr služby → Jobs reveal → booking formulář
  const handleDirectBooking = useCallback(() => {
    setStep("category");
  }, []);

  const handleBack = useCallback(() => {
    if (step === "reveal")        setStep("service");
    else if (step === "service")  setStep("category");
    else if (step === "category") setStep("offer");
  }, [step]);

  if (!mounted || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bg"
            className="fixed inset-0 z-[160] cursor-pointer"
            style={{ background: "rgba(3,2,1,0.85)", backdropFilter: "blur(8px)" }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog" aria-modal="true"
            className="fixed inset-0 z-[161] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-[560px] pointer-events-auto"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Pulsující rámeček */}
              <motion.div
                className="absolute -inset-[1.5px] pointer-events-none"
                style={{ background: "linear-gradient(135deg, #c9a84c 0%, rgba(201,168,76,0.1) 50%, #c9a84c 100%)" }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />

              <div className="relative overflow-hidden bg-[#060503]"
                style={{ boxShadow: "0 0 140px rgba(201,168,76,0.22), 0 50px 120px rgba(0,0,0,0.95)" }}>

                {/* Shimmer top bar */}
                <motion.div className="h-[3px] w-full"
                  style={{ background: "linear-gradient(90deg, transparent, #c9a84c, #f7e48a, #c9a84c, transparent)", backgroundSize: "300% 100%" }}
                  animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />

                {/* Bg glow */}
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.08) 0%, transparent 60%)" }} />

                {/* Plovoucí zlaté částice */}
                {[0,1,2,3,4].map(i => (
                  <motion.div key={i}
                    className="absolute rounded-full bg-[#c9a84c] pointer-events-none"
                    style={{ width: 2+(i%2), height: 2+(i%2), left:`${12+i*17}%`, top:`${20+(i%3)*20}%` }}
                    animate={{ y:[0,-14-i*2,0], opacity:[0.06,0.25,0.06] }}
                    transition={{ duration: 3+i*0.7, repeat: Infinity, delay: i*0.4 }}
                  />
                ))}

                {/* ← Zpět */}
                {step !== "offer" && (
                  <button onClick={handleBack} aria-label="Zpět"
                    className="absolute top-4 left-4 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[#6b5e50] hover:text-[#f0ece6] hover:border-white/25 hover:bg-white/5 transition-all duration-200 text-[12px]">
                    ←
                  </button>
                )}

                {/* ✕ Zavřít */}
                <button onClick={handleClose} aria-label="Zavřít"
                  className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[#6b5e50] hover:text-[#f0ece6] hover:border-white/25 hover:bg-white/5 transition-all duration-200 text-[13px]">
                  ✕
                </button>

                <div className="relative z-10 px-8 pt-7 pb-8 sm:px-12 sm:pt-9 sm:pb-10">
                  <AnimatePresence mode="wait">

                    {/* ══ KROK 1: NABÍDKA ══════════════════════════════════ */}
                    {step === "offer" && (
                      <motion.div key="offer"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.28 }}
                      >
                        <div className="flex flex-wrap items-center gap-2 mb-6">
                          <motion.span
                            className="inline-flex items-center gap-[6px] px-3 py-[5px] font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] border border-[#c9a84c]/35"
                            style={{ background: "rgba(201,168,76,0.07)" }}
                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}
                          >
                            <motion.span className="w-[6px] h-[6px] rounded-full bg-[#c9a84c] shrink-0"
                              animate={{ opacity:[1,0.15,1], scale:[1,1.4,1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                            Zbývají 2 poslední místa
                          </motion.span>
                          <motion.span
                            className="inline-flex items-center gap-2 px-3 py-[5px] font-inter text-[9px] uppercase tracking-[0.15em] text-red-400 border border-red-500/25"
                            style={{ background: "rgba(239,68,68,0.06)" }}
                            initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}
                          >
                            <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration: 1, repeat: Infinity }}>⏱</motion.span>
                            Vyprší za {m}:{s}
                          </motion.span>
                        </div>

                        <motion.span
                          className="font-cormorant font-semibold leading-none select-none block mb-3"
                          style={{
                            fontSize: "clamp(5rem, 18vw, 8rem)",
                            background: "linear-gradient(135deg, #b8943e 0%, #f7e48a 45%, #c9a84c 75%, #e8c96a 100%)",
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                          }}
                          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.2, duration: 0.5, ease: [0.22,1,0.36,1] }}
                        >
                          −50%
                        </motion.span>

                        <motion.div
                          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
                          className="mb-5"
                        >
                          <h2 className="font-cormorant font-light text-[26px] sm:text-[32px] leading-[1.15] text-[#f0ece6] mb-1.5">
                            Teď nebo nikdy.
                          </h2>
                          <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.7]">
                            Web, který <span className="text-[#f0ece6]">vydělává</span> — za polovinu ceny.
                          </p>
                        </motion.div>

                        <div className="w-full h-[1px] mb-5"
                          style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} />

                        <motion.div
                          className="flex items-center gap-4 p-4 mb-6 border border-white/[0.06]"
                          style={{ background: "rgba(255,255,255,0.025)" }}
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                        >
                          <div className="flex gap-[5px] shrink-0">
                            {[...Array(10)].map((_, i) => (
                              <motion.div key={i}
                                className="w-[9px] h-[9px] rounded-full"
                                style={i < 8
                                  ? { background: "rgba(239,68,68,0.5)", boxShadow: "0 0 5px rgba(239,68,68,0.2)" }
                                  : { background: "#c9a84c", boxShadow: "0 0 10px rgba(201,168,76,0.7)" }
                                }
                                animate={i >= 8 ? { opacity:[1,0.5,1], scale:[1,1.2,1] } : undefined}
                                transition={{ duration: 1.6, repeat: Infinity, delay: (i-8)*0.5 }}
                              />
                            ))}
                          </div>
                          <div>
                            <p className="font-inter font-semibold text-[12px] text-[#f0ece6]">
                              Zbývají jen <span className="text-[#c9a84c]">2 místa</span>
                            </p>
                            <p className="font-inter font-light text-[10px] text-[#6b5e50] uppercase tracking-[0.1em] mt-[2px]">
                              8 z 10 zájemců nabídku již využilo
                            </p>
                          </div>
                        </motion.div>

                        <motion.div
                          className="mb-5"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                        >
                          <motion.button
                            onClick={handleDirectBooking}
                            className="w-full font-inter font-semibold text-[12px] tracking-[0.14em] uppercase text-[#080808] px-6 py-[15px] text-center"
                            style={{ background: "linear-gradient(90deg, #b8943e, #f0d070, #c9a84c)", boxShadow: "0 0 40px rgba(201,168,76,0.4), 0 4px 20px rgba(0,0,0,0.4)" }}
                            whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(201,168,76,0.6)" }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Chci to →
                          </motion.button>
                        </motion.div>

                        <motion.p
                          className="font-inter text-[10px] text-center"
                          style={{ color: "rgba(201,168,76,0.5)" }}
                          animate={{ opacity:[0.5, 1, 0.5] }}
                          transition={{ duration: 2.8, repeat: Infinity }}
                          initial={{ opacity: 0 }}
                        >
                          ⚠ Jakmile obsadíme 2. místo — cena se vrátí na plnou výši.
                        </motion.p>
                      </motion.div>
                    )}

                    {/* ══ KROK 2: VÝBĚR KATEGORIE ══════════════════════════ */}
                    {step === "category" && (
                      <motion.div key="category"
                        initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] mb-3">Krok 1 ze 2</p>
                        <h2 className="font-cormorant font-light text-[24px] sm:text-[30px] text-[#f0ece6] mb-1 leading-[1.2]">
                          Jakou službu hledáte?
                        </h2>
                        <p className="font-inter font-light text-[12px] text-[#8a8070] mb-6">Vyberte oblast — ukážeme vám cenu.</p>

                        <div className="grid grid-cols-2 gap-3">
                          {serviceCategories.map((cat, i) => (
                            <motion.button
                              key={cat.key}
                              onClick={() => { setSelectedCat(cat); setStep("service"); }}
                              className="flex flex-col items-start gap-1.5 p-4 border border-white/[0.08] hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.04)] transition-all duration-200 text-left"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.06 }}
                              whileHover={{ y: -2 }} whileTap={{ scale: 0.97 }}
                            >
                              <span className="text-[22px]">{cat.emoji}</span>
                              <span className="font-inter font-semibold text-[13px] text-[#f0ece6]">{cat.label}</span>
                              <span className="font-inter font-light text-[10px] text-[#6b5e50]">{cat.count}</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* ══ KROK 3: VÝBĚR DRUHU ══════════════════════════════ */}
                    {step === "service" && selectedCat && (
                      <motion.div key="service"
                        initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] mb-3">Krok 2 ze 2</p>
                        <h2 className="font-cormorant font-light text-[24px] sm:text-[30px] text-[#f0ece6] mb-1 leading-[1.2]">
                          {selectedCat.emoji} {selectedCat.label}
                        </h2>
                        <p className="font-inter font-light text-[12px] text-[#8a8070] mb-5">Vyberte typ — odhalíme vaši cenu.</p>

                        <div className="flex flex-col gap-2">
                          {selectedCat.items.map((item, i) => (
                            <motion.button
                              key={item.name}
                              onClick={() => { setSelectedSvc(item); setStep("reveal"); }}
                              className="flex items-center justify-between px-4 py-3.5 border border-white/[0.08] hover:border-[rgba(201,168,76,0.4)] hover:bg-[rgba(201,168,76,0.04)] transition-all duration-200 text-left group"
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.07 }}
                              whileHover={{ x: 4 }} whileTap={{ scale: 0.98 }}
                            >
                              <div>
                                <p className="font-inter font-semibold text-[13px] text-[#f0ece6]">{item.name}</p>
                                <p className="font-inter font-light text-[10px] text-[#6b5e50] mt-[2px]">{item.subtitle}</p>
                              </div>
                              <span className="font-inter font-light text-[12px] text-[#c9a84c] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">→</span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* ══ KROK 4: JOBS-STYLE CENOVÝ REVEAL ════════════════ */}
                    {step === "reveal" && selectedSvc && (
                      <motion.div key="reveal"
                        initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] mb-1">
                          {selectedSvc.name}
                        </p>
                        <h2 className="font-cormorant font-light text-[20px] sm:text-[24px] text-[#f0ece6] mb-6 leading-[1.2]">
                          Co byste čekali zaplatit.
                        </h2>

                        {/* ─── Cenová scéna ─────────────────────────────────── */}
                        <div className="relative min-h-[160px]">

                          {/* KOTVA 1 — Tržní cena (padá pryč při fázi 2) */}
                          <AnimatePresence>
                            {revealPhase < 2 && (
                              <motion.div
                                key="price-original"
                                className="absolute inset-x-0 top-0"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40, scale: 0.92 }}
                                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                              >
                                <p className="font-inter font-light text-[9px] uppercase tracking-[0.2em] text-[#4a4035] mb-1">
                                  Tržní cena
                                </p>
                                <div className="relative inline-block">
                                  <span
                                    className="font-cormorant font-light leading-none"
                                    style={{
                                      fontSize: "clamp(2.8rem, 10vw, 4.2rem)",
                                      color: "rgba(240,236,230,0.35)",
                                    }}
                                  >
                                    {selectedSvc.original}
                                  </span>
                                  {/* Přeškrtnutí tržní ceny */}
                                  <AnimatePresence>
                                    {revealPhase >= 1 && (
                                      <motion.div
                                        className="absolute left-0 right-0 h-[3px] bg-red-500 origin-left"
                                        style={{ top: "50%" }}
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        exit={{}}
                                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                      />
                                    )}
                                  </AnimatePresence>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* KOTVA 2 — Naše cena (stoupá → pak padá pryč při fázi 4) */}
                          <AnimatePresence>
                            {revealPhase >= 2 && revealPhase < 4 && (
                              <motion.div
                                key="price-mid"
                                className="absolute inset-x-0 top-0"
                                initial={{ opacity: 0, y: -28 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 40, scale: 0.92 }}
                                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                              >
                                <p className="font-inter font-light text-[9px] uppercase tracking-[0.2em] text-[#c9a84c]/50 mb-1">
                                  Naše standardní cena
                                </p>
                                <div className="relative inline-block">
                                  <span
                                    className="font-cormorant font-light leading-none"
                                    style={{
                                      fontSize: "clamp(2.8rem, 10vw, 4.2rem)",
                                      color: "rgba(240,236,230,0.55)",
                                    }}
                                  >
                                    {selectedSvc.mid}
                                  </span>
                                  {/* Přeškrtnutí naší ceny */}
                                  <AnimatePresence>
                                    {revealPhase >= 3 && (
                                      <motion.div
                                        className="absolute left-0 right-0 h-[3px] bg-red-500 origin-left"
                                        style={{ top: "50%" }}
                                        initial={{ scaleX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        exit={{}}
                                        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                                      />
                                    )}
                                  </AnimatePresence>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* KOTVA 3 — Promo cena — ZLATÝ TRIUMF (stoupá ze spodu) */}
                          <AnimatePresence>
                            {revealPhase >= 4 && (
                              <motion.div
                                key="price-promo"
                                className="absolute inset-x-0 top-0"
                                initial={{ opacity: 0, y: -36, scale: 0.88 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{}}
                                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                              >
                                <p className="font-inter font-light text-[9px] uppercase tracking-[0.2em] text-[#c9a84c] mb-1">
                                  Jen dnes · Exkluzivně pro vás
                                </p>
                                <motion.span
                                  className="font-cormorant font-semibold leading-none block"
                                  style={{
                                    fontSize: "clamp(3.2rem, 13vw, 5.5rem)",
                                    background: "linear-gradient(135deg, #b8943e 0%, #f7e48a 45%, #c9a84c 75%, #e8c96a 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    backgroundClip: "text",
                                  }}
                                  animate={{ filter: ["drop-shadow(0 0 10px rgba(201,168,76,0.2))","drop-shadow(0 0 40px rgba(201,168,76,0.8))","drop-shadow(0 0 10px rgba(201,168,76,0.2))"] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  {selectedSvc.promo}
                                </motion.span>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        {/* ─── konec cenové scény ───────────────────────────── */}

                        {/* "Teď pouze pro vás." */}
                        <AnimatePresence>
                          {revealPhase >= 5 && (
                            <motion.p
                              className="font-inter font-medium text-[14px] text-[#f0ece6] mt-5 mb-5"
                              initial={{ opacity: 0, y: 6 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{}}
                              transition={{ duration: 0.38 }}
                            >
                              Teď pouze pro vás.{" "}
                              <motion.span
                                className="text-[#c9a84c]"
                                animate={{ opacity: [0.7, 1, 0.7] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                Teď nebo nikdy.
                              </motion.span>
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* CTA */}
                        <AnimatePresence>
                          {revealPhase >= 6 && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{}}
                              transition={{ duration: 0.42 }}
                            >
                              <motion.button
                                onClick={handleCTA}
                                className="w-full font-inter font-semibold text-[12px] tracking-[0.14em] uppercase text-[#080808] px-6 py-[15px] text-center mb-4"
                                style={{ background: "linear-gradient(90deg, #b8943e, #f0d070, #c9a84c)" }}
                                animate={{ boxShadow: ["0 0 25px rgba(201,168,76,0.3)","0 0 55px rgba(201,168,76,0.65)","0 0 25px rgba(201,168,76,0.3)"] }}
                                transition={{ duration: 1.8, repeat: Infinity }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.97 }}
                              >
                                Rezervovat — Nezávazně zdarma →
                              </motion.button>

                              <motion.p
                                className="font-inter text-[10px] text-center"
                                style={{ color: "rgba(201,168,76,0.5)" }}
                                animate={{ opacity:[0.5, 1, 0.5] }}
                                transition={{ duration: 2.8, repeat: Infinity }}
                              >
                                ⚠ Cena platí jen dokud jsou volná místa.
                              </motion.p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    )}

                  </AnimatePresence>
                </div>

                <div className="h-[2px] w-full"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }} />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
