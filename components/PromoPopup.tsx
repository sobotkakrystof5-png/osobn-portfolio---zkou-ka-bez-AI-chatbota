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

export default function PromoPopup() {
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted]     = useState(false);
  const { openBooking }           = useBooking();
  const { m, s }                  = useCountdown(11 * 60 + 23);

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

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => setDismissed(true), 600);
    if (typeof window !== "undefined") sessionStorage.setItem("vizeon_promo_v3", "1");
  }, []);

  const handleCTA = useCallback(() => {
    handleClose();
    setTimeout(() => openBooking(), 350);
  }, [openBooking, handleClose]);

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
              className="relative w-full max-w-[580px] pointer-events-auto"
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.88, y: 30 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Pulsing border */}
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

                {/* Particles */}
                {[0,1,2,3,4].map(i => (
                  <motion.div key={i}
                    className="absolute rounded-full bg-[#c9a84c] pointer-events-none"
                    style={{ width: 2+(i%2), height: 2+(i%2), left:`${12+i*17}%`, top:`${20+(i%3)*20}%` }}
                    animate={{ y:[0,-14-i*2,0], opacity:[0.06,0.25,0.06] }}
                    transition={{ duration: 3+i*0.7, repeat: Infinity, delay: i*0.4 }}
                  />
                ))}

                {/* Close */}
                <button onClick={handleClose} aria-label="Zavřít"
                  className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[#6b5e50] hover:text-[#f0ece6] hover:border-white/25 hover:bg-white/5 transition-all duration-200 text-[13px]">
                  ✕
                </button>

                <div className="relative z-10 px-8 pt-7 pb-8 sm:px-12 sm:pt-9 sm:pb-10">

                  {/* Badges row */}
                  <div className="flex flex-wrap items-center gap-2 mb-7">
                    <motion.span
                      className="inline-flex items-center gap-[6px] px-3 py-[5px] font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] border border-[#c9a84c]/35"
                      style={{ background: "rgba(201,168,76,0.07)" }}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                    >
                      <motion.span className="w-[6px] h-[6px] rounded-full bg-[#c9a84c] shrink-0"
                        animate={{ opacity:[1,0.15,1], scale:[1,1.4,1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                      Exkluzivní sleva · Jen pro 2 weby
                    </motion.span>

                    <motion.span
                      className="inline-flex items-center gap-2 px-3 py-[5px] font-inter text-[9px] uppercase tracking-[0.15em] text-red-400 border border-red-500/25"
                      style={{ background: "rgba(239,68,68,0.06)" }}
                      initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                    >
                      <motion.span animate={{ opacity:[1,0,1] }} transition={{ duration: 1, repeat: Infinity }}>⏱</motion.span>
                      Vyprší za {m}:{s}
                    </motion.span>
                  </div>

                  {/* Main number */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.55, ease: [0.22,1,0.36,1] }}
                    className="mb-4"
                  >
                    <motion.span
                      className="font-cormorant font-semibold leading-none select-none block"
                      style={{
                        fontSize: "clamp(5.5rem, 20vw, 8.5rem)",
                        background: "linear-gradient(135deg, #b8943e 0%, #f7e48a 45%, #c9a84c 75%, #e8c96a 100%)",
                        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                      }}
                      animate={{ filter:["drop-shadow(0 0 22px rgba(201,168,76,0.4))","drop-shadow(0 0 45px rgba(201,168,76,0.7))","drop-shadow(0 0 22px rgba(201,168,76,0.4))"] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    >
                      −50%
                    </motion.span>
                  </motion.div>

                  {/* Punchy headlines */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="mb-6"
                  >
                    <h2 className="font-cormorant font-light text-[28px] sm:text-[34px] leading-[1.15] text-[#f0ece6] mb-2">
                      Teď nebo nikdy.
                    </h2>
                    <p className="font-inter font-light text-[14px] text-[#8a8070] leading-[1.7]">
                      Profesionální web, který <span className="text-[#f0ece6]">vydělává</span> — za polovinu.<br />
                      Nabídka platí výhradně pro <span className="text-[#c9a84c] font-medium">poslední 2 volná místa</span>.
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <div className="w-full h-[1px] mb-5" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} />

                  {/* Spots bar */}
                  <motion.div
                    className="flex items-center gap-4 p-4 mb-6 border border-white/[0.06]"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
                  >
                    <div className="flex gap-[5px] shrink-0">
                      {[...Array(10)].map((_, i) => (
                        <motion.div key={i}
                          className="w-[9px] h-[9px] rounded-full"
                          style={i < 8
                            ? { background: "rgba(239,68,68,0.5)", boxShadow: "0 0 5px rgba(239,68,68,0.2)" }
                            : { background: "#c9a84c", boxShadow: "0 0 10px rgba(201,168,76,0.7)" }
                          }
                          animate={i >= 8 ? { opacity:[1,0.5,1], scale:[1,1.2,1] } : {}}
                          transition={{ duration: 1.6, repeat: Infinity, delay: (i-8)*0.5 }}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-inter font-semibold text-[12px] text-[#f0ece6]">8 z 10 slev již obsazeno</p>
                      <p className="font-inter font-light text-[10px] text-[#6b5e50] uppercase tracking-[0.1em] mt-[2px]">
                        Zbývají <span className="text-[#c9a84c]">2 poslední místa</span> — čas neúprosně běží
                      </p>
                    </div>
                  </motion.div>

                  {/* CTA buttons */}
                  <motion.div
                    className="flex flex-col sm:flex-row gap-3 mb-5"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
                  >
                    <motion.button onClick={handleCTA}
                      className="flex-1 font-inter font-semibold text-[12px] tracking-[0.12em] uppercase text-[#080808] px-6 py-[15px] text-center"
                      style={{ background: "linear-gradient(90deg, #b8943e, #f0d070, #c9a84c)", boxShadow: "0 0 40px rgba(201,168,76,0.4), 0 4px 20px rgba(0,0,0,0.4)" }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 60px rgba(201,168,76,0.6)" }}
                      whileTap={{ scale: 0.97 }}
                    >
                      Nezávazná konzultace zdarma →
                    </motion.button>
                    <motion.button onClick={handleCTA}
                      className="flex-1 font-inter font-medium text-[12px] tracking-[0.12em] uppercase text-[#c9a84c] px-6 py-[13px] border border-[#c9a84c]/35 hover:border-[#c9a84c]/65 hover:bg-[#c9a84c]/5 transition-all duration-300 text-center"
                      whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                    >
                      Začněme →
                    </motion.button>
                  </motion.div>

                  {/* Warning */}
                  <motion.p
                    className="font-inter text-[10.5px] text-center leading-[1.65]"
                    style={{ color: "rgba(201,168,76,0.5)" }}
                    animate={{ opacity:[0.55, 1, 0.55] }} transition={{ duration: 2.8, repeat: Infinity }}
                    initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                  >
                    ⚠ Nezavírej tuto nabídku — jakmile obsadíme 2. místo, cena se vrátí na plnou výši.
                  </motion.p>

                  <p className="font-inter text-[9px] text-[#3d3830] tracking-[0.1em] uppercase text-center mt-3">
                    Bez závazků · Odpovídám do 24 h · Platí pro první 2 weby
                  </p>
                </div>

                <div className="h-[2px] w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }} />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
