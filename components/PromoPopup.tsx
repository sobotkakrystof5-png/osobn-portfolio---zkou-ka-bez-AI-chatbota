"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

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

const serviceCategories = [
  {
    key: "weby",
    emoji: "🌐",
    label: "Weby",
    count: "4 typy",
    items: [
      { name: "Online Vizitka",      subtitle: "Jednostránkový web",       original: "14 999 Kč",     promo: "7 499 Kč" },
      { name: "Promo Page",          subtitle: "Landing page",              original: "19 999 Kč",     promo: "9 999 Kč" },
      { name: "Pro Web",             subtitle: "Více stránek na míru",      original: "29 999 Kč",     promo: "14 999 Kč" },
      { name: "Web Care",            subtitle: "Správa webu / měsíčně",     original: "1 999 Kč/měs",  promo: "999 Kč/měs" },
    ],
  },
  {
    key: "design",
    emoji: "🎨",
    label: "Design",
    count: "4 typy",
    items: [
      { name: "Brand Logo",          subtitle: "Originální logo",           original: "1 499 Kč",      promo: "699 Kč" },
      { name: "Business Card",       subtitle: "Vizitka na míru",           original: "599 Kč",        promo: "299 Kč" },
      { name: "Social Visual",       subtitle: "Post nebo story",           original: "599 Kč/ks",     promo: "299 Kč/ks" },
      { name: "Print Design",        subtitle: "Leták, plakát, banner",     original: "1 499 Kč",      promo: "699 Kč" },
    ],
  },
  {
    key: "prezentace",
    emoji: "📊",
    label: "Prezentace",
    count: "2 typy",
    items: [
      { name: "Slide Deck Standard", subtitle: "Do 15 slidů",               original: "2 199 Kč",      promo: "1 099 Kč" },
      { name: "Slide Deck Premium",  subtitle: "Bez limitu + animace",      original: "6 999 Kč",      promo: "3 499 Kč" },
    ],
  },
  {
    key: "social",
    emoji: "📱",
    label: "Sociální sítě",
    count: "3 typy",
    items: [
      { name: "Social Starter",      subtitle: "8 příspěvků / měs",         original: "9 999 Kč/měs",  promo: "4 999 Kč/měs" },
      { name: "Social Pro",          subtitle: "Kompletní správa sítí",     original: "14 999 Kč/měs", promo: "7 499 Kč/měs" },
      { name: "Content Blueprint",   subtitle: "Jednorázový content plán",  original: "999 Kč",        promo: "499 Kč" },
    ],
  },
];

type Step = "offer" | "category" | "service" | "reveal";

interface ServiceItem {
  name: string;
  subtitle: string;
  original: string;
  promo: string;
}

interface ServiceCategory {
  key: string;
  emoji: string;
  label: string;
  count: string;
  items: ServiceItem[];
}

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
    if (typeof window !== "undefined" && sessionStorage.getItem("vizeon_promo_v3")) {
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

  // Cenový reveal — 6 fází
  // 0 → původní cena (okamžitě)
  // 1 → červená přeškrtnutí čára (900 ms)
  // 2 → badge "−50% sleva" (1 800 ms)
  // 3 → nová cena (2 700 ms)
  // 4 → "Teď pouze pro vás." (3 400 ms)
  // 5 → CTA tlačítko (4 100 ms)
  useEffect(() => {
    if (step !== "reveal") { setRevealPhase(0); return; }
    const t1 = setTimeout(() => setRevealPhase(1), 900);
    const t2 = setTimeout(() => setRevealPhase(2), 1800);
    const t3 = setTimeout(() => setRevealPhase(3), 2700);
    const t4 = setTimeout(() => setRevealPhase(4), 3400);
    const t5 = setTimeout(() => setRevealPhase(5), 4100);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); };
  }, [step]);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => setDismissed(true), 600);
    if (typeof window !== "undefined") sessionStorage.setItem("vizeon_promo_v3", "1");
  }, []);

  const handleCTA = useCallback(() => {
    handleClose();
    setTimeout(() => openBooking(), 350);
  }, [openBooking, handleClose]);

  const handleBack = useCallback(() => {
    if (step === "reveal")   { setStep("service"); }
    else if (step === "service")  { setStep("category"); }
    else if (step === "category") { setStep("offer"); }
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

          {/* Modal wrapper */}
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

                {/* ← Zpět (kroky 2–4) */}
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
                        {/* Badges */}
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

                        {/* Velké číslo */}
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

                        {/* Heslo */}
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

                        {/* Divider */}
                        <div className="w-full h-[1px] mb-5"
                          style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} />

                        {/* Vizuální progress míst */}
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

                        {/* CTA */}
                        <motion.div
                          className="mb-5"
                          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
                        >
                          <motion.button
                            onClick={() => setStep("category")}
                            className="w-full font-inter font-semibold text-[12px] tracking-[0.14em] uppercase text-[#080808] px-6 py-[15px] text-center"
                            style={{ background: "linear-gradient(90deg, #b8943e, #f0d070, #c9a84c)", boxShadow: "0 0 40px rgba(201,168,76,0.4), 0 4px 20px rgba(0,0,0,0.4)" }}
                            whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(201,168,76,0.6)" }}
                            whileTap={{ scale: 0.97 }}
                          >
                            Chci 50% slevu →
                          </motion.button>
                        </motion.div>

                        {/* Varování */}
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
                        <p className="font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] mb-3">
                          Krok 1 ze 2
                        </p>
                        <h2 className="font-cormorant font-light text-[24px] sm:text-[30px] text-[#f0ece6] mb-1 leading-[1.2]">
                          Jakou službu hledáte?
                        </h2>
                        <p className="font-inter font-light text-[12px] text-[#8a8070] mb-6">
                          Vyberte oblast — ukážeme vám cenu.
                        </p>

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
                        <p className="font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] mb-3">
                          Krok 2 ze 2
                        </p>
                        <h2 className="font-cormorant font-light text-[24px] sm:text-[30px] text-[#f0ece6] mb-1 leading-[1.2]">
                          {selectedCat.emoji} {selectedCat.label}
                        </h2>
                        <p className="font-inter font-light text-[12px] text-[#8a8070] mb-5">
                          Vyberte typ — odhalíme vaši cenu.
                        </p>

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
                              <span className="font-inter font-light text-[12px] text-[#c9a84c] opacity-60 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                                →
                              </span>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* ══ KROK 4: ANIMOVANÝ CENOVÝ REVEAL ══════════════════ */}
                    {step === "reveal" && selectedSvc && (
                      <motion.div key="reveal"
                        initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -28 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] mb-1">
                          {selectedSvc.name}
                        </p>
                        <h2 className="font-cormorant font-light text-[22px] sm:text-[26px] text-[#f0ece6] mb-6 leading-[1.2]">
                          Vaše exkluzivní cena.
                        </h2>

                        {/* Původní cena + přeškrtnutí */}
                        <div className="relative inline-block mb-5">
                          <motion.p
                            className="font-cormorant font-light leading-none"
                            style={{
                              fontSize: "clamp(2.4rem, 9vw, 3.8rem)",
                              color: "rgba(240,236,230,0.45)",
                            }}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                          >
                            {selectedSvc.original}
                          </motion.p>

                          {/* Animovaná červená přeškrtnutí čára */}
                          <AnimatePresence>
                            {revealPhase >= 1 && (
                              <motion.div
                                className="absolute left-0 right-0 h-[2.5px] bg-red-500 origin-left"
                                style={{ top: "52%" }}
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                exit={{}}
                                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                              />
                            )}
                          </AnimatePresence>
                        </div>

                        {/* Badge −50% sleva */}
                        <AnimatePresence>
                          {revealPhase >= 2 && (
                            <motion.div
                              className="flex items-center gap-3 mb-5"
                              initial={{ opacity: 0, x: 24, scale: 0.85 }}
                              animate={{ opacity: 1, x: 0, scale: 1 }}
                              exit={{}}
                              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <motion.span
                                className="font-inter font-bold text-[12px] uppercase tracking-[0.1em] px-3 py-[6px]"
                                style={{
                                  background: "rgba(201,168,76,0.12)",
                                  border: "1px solid rgba(201,168,76,0.45)",
                                  color: "#c9a84c",
                                }}
                                animate={{ boxShadow: ["0 0 0px rgba(201,168,76,0)","0 0 22px rgba(201,168,76,0.55)","0 0 0px rgba(201,168,76,0)"] }}
                                transition={{ duration: 1.4, repeat: Infinity }}
                              >
                                −50% sleva
                              </motion.span>
                              <span className="font-inter font-light text-[11px] text-[#8a8070]">
                                dodatečná exkluzivní sleva
                              </span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* Nová zlatá cena */}
                        <AnimatePresence>
                          {revealPhase >= 3 && (
                            <motion.div
                              className="mb-4"
                              initial={{ opacity: 0, y: 18 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{}}
                              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            >
                              <motion.span
                                className="font-cormorant font-semibold leading-none block"
                                style={{
                                  fontSize: "clamp(3.2rem, 13vw, 5.2rem)",
                                  background: "linear-gradient(135deg, #b8943e 0%, #f7e48a 45%, #c9a84c 75%, #e8c96a 100%)",
                                  WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: "transparent",
                                  backgroundClip: "text",
                                }}
                                animate={{ filter: ["drop-shadow(0 0 12px rgba(201,168,76,0.25))","drop-shadow(0 0 38px rgba(201,168,76,0.75))","drop-shadow(0 0 12px rgba(201,168,76,0.25))"] }}
                                transition={{ duration: 2, repeat: Infinity }}
                              >
                                {selectedSvc.promo}
                              </motion.span>
                            </motion.div>
                          )}
                        </AnimatePresence>

                        {/* „Teď pouze pro vás." */}
                        <AnimatePresence>
                          {revealPhase >= 4 && (
                            <motion.p
                              className="font-inter font-medium text-[14px] text-[#f0ece6] mb-6"
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

                        {/* CTA tlačítko */}
                        <AnimatePresence>
                          {revealPhase >= 5 && (
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
