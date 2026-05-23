"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBooking } from "@/context/BookingContext";

/* ─── Countdown timer hook ─── */
function useCountdown(seconds: number) {
  const [left, setLeft] = useState(seconds);
  useEffect(() => {
    if (left <= 0) return;
    const t = setTimeout(() => setLeft(l => l - 1), 1000);
    return () => clearTimeout(t);
  }, [left]);
  const m = String(Math.floor(left / 60)).padStart(2, "0");
  const s = String(left % 60).padStart(2, "0");
  return { m, s, expired: left <= 0 };
}

export default function PromoPopup() {
  const [visible, setVisible]     = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted]     = useState(false);
  const { openBooking }           = useBooking();

  const { m, s } = useCountdown(9 * 60 + 47); // fake urgency timer

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("vizeon_promo_v2")) {
      setDismissed(true);
      return;
    }
    const hero = document.getElementById("hero");
    if (!hero) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setTimeout(() => setVisible(true), 500);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const handleClose = useCallback(() => {
    setVisible(false);
    setTimeout(() => setDismissed(true), 600);
    if (typeof window !== "undefined") sessionStorage.setItem("vizeon_promo_v2", "1");
  }, []);

  const handleCTA = useCallback(() => {
    openBooking();
    handleClose();
  }, [openBooking, handleClose]);

  if (!mounted || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            key="promo-bg"
            className="fixed inset-0 z-[160] cursor-pointer"
            style={{ background: "rgba(4,3,2,0.82)", backdropFilter: "blur(6px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={handleClose}
            aria-hidden="true"
          />

          {/* ── Modal ── */}
          <motion.div
            key="promo-modal"
            role="dialog"
            aria-modal="true"
            aria-label="Limitovaná nabídka"
            className="fixed inset-0 z-[161] flex items-center justify-center p-4 pointer-events-none"
          >
            <motion.div
              className="relative w-full max-w-[640px] pointer-events-auto"
              initial={{ opacity: 0, scale: 0.82, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 24 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Outer glow border */}
              <motion.div
                className="absolute -inset-[1.5px] rounded-[3px] pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, #c9a84c 0%, rgba(201,168,76,0.15) 40%, #c9a84c 100%)",
                }}
                animate={{ opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2.5, repeat: Infinity }}
              />

              {/* Card */}
              <div
                className="relative overflow-hidden bg-[#070604]"
                style={{
                  boxShadow: "0 0 120px rgba(201,168,76,0.2), 0 40px 100px rgba(0,0,0,0.9)",
                }}
              >
                {/* ── Animated top shimmer bar ── */}
                <motion.div
                  className="h-[4px] w-full"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, #c9a84c 30%, #f7e48a 50%, #c9a84c 70%, transparent 100%)",
                    backgroundSize: "300% 100%",
                  }}
                  animate={{ backgroundPosition: ["100% 0%", "-100% 0%"] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
                />

                {/* Background radial glow */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "radial-gradient(ellipse 75% 55% at 50% 0%, rgba(201,168,76,0.09) 0%, transparent 65%)",
                  }}
                />

                {/* Floating particles */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full bg-[#c9a84c] pointer-events-none"
                    style={{
                      width: 2 + (i % 2),
                      height: 2 + (i % 2),
                      left: `${10 + i * 15}%`,
                      top: `${15 + (i % 4) * 18}%`,
                    }}
                    animate={{ y: [0, -16 - i * 2, 0], opacity: [0.08, 0.3, 0.08] }}
                    transition={{ duration: 3.5 + i * 0.6, repeat: Infinity, delay: i * 0.35 }}
                  />
                ))}

                {/* ── Close X ── */}
                <button
                  onClick={handleClose}
                  aria-label="Zavřít"
                  className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-[#6b5e50] hover:text-[#f0ece6] hover:border-white/25 hover:bg-white/5 transition-all duration-200 font-inter text-[13px]"
                >
                  ✕
                </button>

                <div className="relative z-10 px-8 pt-7 pb-8 sm:px-12 sm:pt-9 sm:pb-10">

                  {/* ── Top badge row ── */}
                  <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span
                      className="inline-flex items-center gap-[7px] px-3 py-[5px] font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] border border-[#c9a84c]/35"
                      style={{ background: "rgba(201,168,76,0.07)" }}
                    >
                      <motion.span
                        className="w-[6px] h-[6px] rounded-full bg-[#c9a84c] shrink-0"
                        animate={{ opacity: [1, 0.15, 1], scale: [1, 1.4, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                      />
                      Limitovaná nabídka · Pouze první 2 weby
                    </span>

                    {/* Countdown */}
                    <span
                      className="inline-flex items-center gap-2 px-3 py-[5px] font-inter text-[9px] uppercase tracking-[0.15em] text-red-400 border border-red-500/25"
                      style={{ background: "rgba(239,68,68,0.06)" }}
                    >
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        ⏱
                      </motion.span>
                      Vyprší za {m}:{s}
                    </span>
                  </div>

                  {/* ── Giant number ── */}
                  <div className="flex items-end gap-4 mb-4">
                    <motion.span
                      className="font-cormorant font-semibold leading-none select-none"
                      style={{
                        fontSize: "clamp(5rem, 18vw, 7.5rem)",
                        background: "linear-gradient(135deg, #b8943e 0%, #f7e48a 45%, #c9a84c 75%, #e8c96a 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        filter: "drop-shadow(0 0 28px rgba(201,168,76,0.5))",
                      }}
                      animate={{ filter: ["drop-shadow(0 0 20px rgba(201,168,76,0.4))", "drop-shadow(0 0 40px rgba(201,168,76,0.7))", "drop-shadow(0 0 20px rgba(201,168,76,0.4))"] }}
                      transition={{ duration: 2.8, repeat: Infinity }}
                    >
                      −50%
                    </motion.span>
                    <div className="mb-3">
                      <p className="font-cormorant font-light text-[#f0ece6] text-[22px] leading-tight">na váš web</p>
                      <p className="font-inter text-[10px] uppercase tracking-[0.18em] text-[#6b5e50] mt-[2px]">Profesionální web za polovinu</p>
                    </div>
                  </div>

                  {/* ── Headline ── */}
                  <h2 className="font-cormorant font-light text-[28px] sm:text-[34px] leading-[1.2] text-[#f0ece6] mb-4">
                    Toto je příležitost,{" "}
                    <span style={{ color: "#c9a84c" }}>kterou nikde jinde<br />levněji neseženeš.</span>
                  </h2>

                  {/* ── Divider ── */}
                  <div className="w-full h-[1px] mb-5" style={{ background: "linear-gradient(90deg, rgba(201,168,76,0.4), transparent)" }} />

                  {/* ── Persuasion copy ── */}
                  <p className="font-inter font-light text-[13.5px] leading-[1.85] text-[#8a8070] mb-6 max-w-lg">
                    Profesionální web, který skutečně prodává — nyní{" "}
                    <span className="text-[#f0ece6] font-normal">o 50 % levněji</span>.
                    Tato cena neexistuje nikde jinde a{" "}
                    <span className="text-[#f0ece6] font-normal">platí výhradně pro první 2 klienty</span>.
                    Zájem přesáhl naše očekávání — zbývají opravdu jen{" "}
                    <span className="text-[#c9a84c] font-medium">poslední 2 volná místa</span>.{" "}
                    <strong className="text-[#f0ece6] font-medium">Nezavírej tuto stránku</strong> —
                    jakmile místa obsadí někdo jiný, tato cena zmizí navždy.
                  </p>

                  {/* ── Spots bar ── */}
                  <div
                    className="flex items-center gap-4 p-4 mb-6 border border-white/[0.06]"
                    style={{ background: "rgba(255,255,255,0.025)" }}
                  >
                    {/* Visual dots */}
                    <div className="flex gap-[5px] shrink-0">
                      {[...Array(10)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-[9px] h-[9px] rounded-full"
                          style={
                            i < 8
                              ? { background: "rgba(239,68,68,0.5)", boxShadow: "0 0 6px rgba(239,68,68,0.25)" }
                              : { background: "#c9a84c", boxShadow: "0 0 10px rgba(201,168,76,0.7)" }
                          }
                          animate={
                            i >= 8
                              ? { opacity: [1, 0.55, 1], scale: [1, 1.2, 1] }
                              : {}
                          }
                          transition={{ duration: 1.6, repeat: Infinity, delay: (i - 8) * 0.4 }}
                        />
                      ))}
                    </div>
                    <div>
                      <p className="font-inter font-medium text-[12px] text-[#f0ece6] leading-tight">
                        8 z 10 míst již obsazeno
                      </p>
                      <p className="font-inter font-light text-[10px] text-[#6b5e50] mt-[2px] uppercase tracking-[0.1em]">
                        Zbývají pouze <span className="text-[#c9a84c]">2 poslední místa</span> — čas běží
                      </p>
                    </div>
                  </div>

                  {/* ── CTA Buttons ── */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-5">
                    <motion.button
                      onClick={handleCTA}
                      className="flex-1 font-inter font-semibold text-[12px] tracking-[0.12em] uppercase text-[#080808] px-6 py-[15px] transition-all duration-300 text-center"
                      style={{
                        background: "linear-gradient(90deg, #b8943e, #f0d070, #c9a84c)",
                        backgroundSize: "200%",
                        boxShadow: "0 0 40px rgba(201,168,76,0.45), 0 4px 20px rgba(0,0,0,0.4)",
                      }}
                      whileHover={{ scale: 1.02, boxShadow: "0 0 55px rgba(201,168,76,0.6), 0 6px 25px rgba(0,0,0,0.5)" }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Nezávazná konzultace zdarma →
                    </motion.button>
                    <motion.button
                      onClick={handleCTA}
                      className="flex-1 font-inter font-medium text-[12px] tracking-[0.12em] uppercase text-[#c9a84c] px-6 py-[13px] border border-[#c9a84c]/35 hover:border-[#c9a84c]/65 hover:bg-[#c9a84c]/6 transition-all duration-300 text-center"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Začněme →
                    </motion.button>
                  </div>

                  {/* ── Warning nudge ── */}
                  <motion.p
                    className="font-inter text-[11px] leading-[1.7] text-center"
                    style={{ color: "rgba(201,168,76,0.55)" }}
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    ⚠ Nezavírej tuto nabídku — jakmile obsadíme poslední 2 místa,<br className="hidden sm:block" />
                    {" "}cena se vrátí na plnou výši a tato příležitost zmizí.
                  </motion.p>

                  {/* Fine print */}
                  <p className="font-inter text-[9.5px] text-[#3d3830] tracking-[0.1em] uppercase text-center mt-3">
                    Bez závazků · Odpovídám do 24 h · Platí pro první 2 weby
                  </p>
                </div>

                {/* Bottom shimmer */}
                <div
                  className="h-[2px] w-full"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }}
                />
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
