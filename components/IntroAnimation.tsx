"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LETTERS = ["V", "I", "Z", "E", "O", "N"];
const WORDS   = ["Web.", "Design.", "Výsledky."];

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Hydration guard
    setMounted(true);

    // Jednou za session — pokud už uživatel viděl intro, přeskoč
    if (typeof window !== "undefined" && sessionStorage.getItem("vizeon_intro")) {
      setVisible(false);
      return;
    }

    // Zamkni scroll dokud intro běží
    document.body.style.overflow = "hidden";

    const timer = setTimeout(() => setVisible(false), 2700);
    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = "";
    if (typeof window !== "undefined") {
      sessionStorage.setItem("vizeon_intro", "1");
    }
  };

  // Nezobrazuj na serveru ani po skrytí
  if (!mounted || !visible) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] bg-[#080808] flex flex-col items-center justify-center select-none"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* ── Jemné zlaté světlo v pozadí ── */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.05) 0%, transparent 70%)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          />

          {/* ── Písmena VIZEON ── */}
          <div className="flex overflow-hidden">
            {LETTERS.map((letter, i) => (
              <motion.span
                key={letter + i}
                className="font-cormorant font-light text-[#f0ece6]"
                style={{
                  fontSize: "clamp(3.5rem, 11vw, 8.5rem)",
                  letterSpacing: "0.22em",
                  lineHeight: 1,
                }}
                initial={{ opacity: 0, y: 55 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.075,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* ── Zlatá linka ── */}
          <motion.div
            className="h-[1px] bg-gradient-to-r from-transparent via-[#c9a84c] to-transparent mt-5 mb-4"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "clamp(180px, 28vw, 380px)", opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* ── Tagline ── */}
          <div className="flex gap-[0.6em] overflow-hidden">
            {WORDS.map((word, i) => (
              <motion.span
                key={word}
                className="font-inter font-light uppercase text-[#6b5e50]"
                style={{
                  fontSize: "clamp(0.6rem, 1.4vw, 0.8rem)",
                  letterSpacing: "0.28em",
                }}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.55,
                  delay: 0.5 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* ── Jemný loading indikátor na dně ── */}
          <motion.div
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <div className="w-[1px] h-6 bg-[#2a2520] overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#c9a84c]"
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.5, delay: 1.0, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
