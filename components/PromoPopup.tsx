"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";

export default function PromoPopup() {
  const [visible, setVisible]   = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [mounted, setMounted]   = useState(false);
  const [sparked, setSparked]   = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined" && sessionStorage.getItem("vizeon_promo_dismissed")) {
      setDismissed(true);
      return;
    }

    const hero = document.getElementById("hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setTimeout(() => { setVisible(true); setSparked(true); }, 600);
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
    if (typeof window !== "undefined") sessionStorage.setItem("vizeon_promo_dismissed", "1");
    setDismissed(true);
  }, []);

  if (!mounted || dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop blur / darkening overlay */}
          <motion.div
            key="promo-backdrop"
            className="fixed inset-0 z-[148] pointer-events-none"
            style={{ background: "radial-gradient(ellipse 50% 60% at 95% 90%, rgba(201,168,76,0.04) 0%, transparent 70%)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Popup card */}
          <motion.div
            key="promo-card"
            className="fixed bottom-5 right-5 z-[149] w-[340px] sm:w-[370px]"
            initial={{ opacity: 0, y: 90, scale: 0.88, rotateX: 6 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            exit={{ opacity: 0, y: 60, scale: 0.92 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            style={{ perspective: 800 }}
          >
            {/* Outer glow ring */}
            <motion.div
              className="absolute -inset-[1px] rounded-[2px] pointer-events-none"
              style={{ background: "linear-gradient(135deg, rgba(201,168,76,0.55) 0%, rgba(201,168,76,0.08) 50%, rgba(201,168,76,0.35) 100%)" }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Card body */}
            <div
              className="relative overflow-hidden bg-[#0a0906]"
              style={{ boxShadow: "0 0 80px rgba(201,168,76,0.18), 0 30px 80px rgba(0,0,0,0.85), inset 0 0 0 1px rgba(201,168,76,0.15)" }}
            >
              {/* Animated top bar */}
              <motion.div
                className="h-[3px] w-full"
                style={{ background: "linear-gradient(90deg, transparent, #c9a84c, #f0d080, #c9a84c, transparent)" }}
                animate={{ backgroundPosition: ["0% 0%", "200% 0%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              />

              {/* Background radial glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(201,168,76,0.07) 0%, transparent 65%)" }}
              />

              {/* Floating particles */}
              {sparked && [0,1,2,3,4].map(i => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-[#c9a84c] pointer-events-none"
                  style={{
                    width: 2 + (i % 3),
                    height: 2 + (i % 3),
                    left: `${15 + i * 17}%`,
                    top: `${20 + (i % 3) * 20}%`,
                    opacity: 0.15 + (i * 0.05),
                  }}
                  animate={{ y: [0, -12 - i * 3, 0], opacity: [0.1, 0.35, 0.1] }}
                  transition={{ duration: 3 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.4 }}
                />
              ))}

              {/* Close button */}
              <button
                onClick={handleClose}
                aria-label="Zavřít"
                className="absolute top-3 right-3 z-20 w-7 h-7 flex items-center justify-center rounded-full border border-white/10 text-[#6b5e50] hover:text-[#f0ece6] hover:border-white/25 hover:bg-white/5 transition-all duration-200 font-inter text-[12px]"
              >
                ✕
              </button>

              <div className="relative z-10 p-6 pt-5">

                {/* BADGE — urgency */}
                <motion.div
                  className="inline-flex items-center gap-2 mb-4"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25, duration: 0.5 }}
                >
                  <span
                    className="flex items-center gap-[6px] px-3 py-[5px] font-inter text-[9px] uppercase tracking-[0.22em] text-[#c9a84c] border border-[#c9a84c]/30"
                    style={{ background: "rgba(201,168,76,0.07)" }}
                  >
                    <motion.span
                      className="w-[6px] h-[6px] rounded-full bg-[#c9a84c]"
                      animate={{ opacity: [1, 0.2, 1], scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    />
                    Limitovaná nabídka · Jen 2 místa
                  </span>
                </motion.div>

                {/* MAIN NUMBER */}
                <motion.div
                  className="flex items-end gap-3 mb-3"
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.55, ease: [0.22,1,0.36,1] }}
                >
                  <span
                    className="font-cormorant font-semibold leading-none select-none"
                    style={{
                      fontSize: "clamp(4rem, 14vw, 5.5rem)",
                      background: "linear-gradient(135deg, #c9a84c 0%, #f0d080 45%, #c9a84c 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                      filter: "drop-shadow(0 0 20px rgba(201,168,76,0.4))",
                    }}
                  >
                    −50%
                  </span>
                  <span className="font-cormorant font-light text-[#f0ece6] text-[22px] leading-none mb-2">
                    cena webu
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h3
                  className="font-cormorant font-light text-[23px] leading-[1.25] text-[#f0ece6] mb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                >
                  Profesionální web za<br />
                  <span style={{ color: "#c9a84c" }}>poloviční cenu.</span>
                </motion.h3>

                {/* Body copy */}
                <motion.p
                  className="font-inter font-light text-[12.5px] leading-[1.75] text-[#6b5e50] mb-5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 }}
                >
                  Tato cena platí{" "}
                  <span className="text-[#f0ece6] font-normal">výhradně pro první 2 klienty</span>.
                  Zájem roste rychle — rezervujte si místo ještě dnes.
                </motion.p>

                {/* Slots visual */}
                <motion.div
                  className="flex items-center gap-3 p-3 mb-5 border border-white/[0.06]"
                  style={{ background: "rgba(255,255,255,0.02)" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <div className="flex gap-[6px]">
                    {/* Slot 1 — taken */}
                    <motion.div
                      className="w-[10px] h-[10px] rounded-full"
                      style={{ background: "rgba(239,68,68,0.55)", boxShadow: "0 0 8px rgba(239,68,68,0.3)" }}
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    {/* Slot 2 — available */}
                    <motion.div
                      className="w-[10px] h-[10px] rounded-full"
                      style={{ background: "#c9a84c", boxShadow: "0 0 10px rgba(201,168,76,0.6)" }}
                      animate={{ opacity: [1, 0.6, 1], scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
                    />
                    {/* Slot 3 — available */}
                    <motion.div
                      className="w-[10px] h-[10px] rounded-full"
                      style={{ background: "#c9a84c", boxShadow: "0 0 10px rgba(201,168,76,0.6)" }}
                      animate={{ opacity: [1, 0.6, 1], scale: [1, 1.15, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.7 }}
                    />
                  </div>
                  <div>
                    <span className="font-inter text-[10px] uppercase tracking-[0.12em] text-[#6b5e50]">
                      Zbývají{" "}
                      <span className="text-[#f0ece6] font-medium">2 volná místa</span>
                      {" "}z 3
                    </span>
                  </div>
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  className="flex flex-col gap-[10px]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <CTAButton
                    className="w-full font-inter font-medium text-[11px] tracking-[0.12em] uppercase text-[#080808] px-5 py-[13px] transition-all duration-300 text-center"
                    style={{
                      background: "linear-gradient(90deg, #c9a84c, #e0c06a, #c9a84c)",
                      backgroundSize: "200%",
                      boxShadow: "0 0 28px rgba(201,168,76,0.35)",
                    }}
                  >
                    Nezávazná konzultace zdarma →
                  </CTAButton>
                  <CTAButton
                    className="w-full font-inter font-medium text-[11px] tracking-[0.12em] uppercase text-[#c9a84c] px-5 py-[11px] border border-[#c9a84c]/25 hover:border-[#c9a84c]/55 hover:bg-[#c9a84c]/5 transition-all duration-300 text-center"
                  >
                    Začněme →
                  </CTAButton>
                </motion.div>

                {/* Fine print */}
                <motion.p
                  className="font-inter text-[9.5px] text-[#3d3830] tracking-[0.1em] uppercase text-center mt-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.85 }}
                >
                  Bez závazků · Odpovídám do 24 h
                </motion.p>
              </div>

              {/* Bottom shimmer line */}
              <div className="h-[1px] w-full" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.25), transparent)" }} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
