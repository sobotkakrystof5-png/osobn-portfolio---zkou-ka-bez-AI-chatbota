"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollLock } from "@/hooks/useScrollLock";

const LETTERS = ["V", "I", "Z", "E", "O", "N"];
const WORDS   = ["Web.", "Design.", "Výsledky."];

export default function IntroAnimation() {
  const [visible, setVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  // Session už intro viděla — nezobrazuj vůbec (na rozdíl od `visible` toto
  // NESMÍ vynutit "return null" hned, dokud neproběhne exit animace, jinak
  // AnimatePresence nestihne přehrát exit a onExitComplete nikdy nespustí).
  const [skip, setSkip] = useState(false);
  // Zamčeno od mountu do dokončení exit animace (ne jen do `visible=false`),
  // ať uživatel nemůže scrollovat stránku pod ještě odjíždějícím intrem.
  const [locked, setLocked] = useState(true);

  useScrollLock(locked);

  useEffect(() => {
    // Hydration guard
    setMounted(true);

    // Jednou za session — pokud už uživatel viděl intro, přeskoč
    if (typeof window !== "undefined" && sessionStorage.getItem("vizeon_intro")) {
      setSkip(true);
      setLocked(false);
      return;
    }

    const timer = setTimeout(() => setVisible(false), 2000);

    // Escape přeskočí animaci okamžitě — zlepšuje INP pro netrpělivé uživatele
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setVisible(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleSkip = () => setVisible(false);

  const handleExitComplete = () => {
    setLocked(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("vizeon_intro", "1");
    }
  };

  // Nezobrazuj na serveru ani když session intro už viděla. Když `visible`
  // spadne na false, AnimatePresence níže musí zůstat vyrenderovaná, ať
  // stihne přehrát exit animaci a zavolat onExitComplete.
  if (!mounted || skip) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {visible && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[200] bg-[#080808] flex flex-col items-center justify-center select-none cursor-pointer"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
          onClick={handleSkip}
          role="button"
          tabIndex={0}
          aria-label="Přeskočit úvodní animaci"
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && handleSkip()}
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
                  duration: 0.52,
                  delay: i * 0.056,
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
            transition={{ duration: 0.67, delay: 0.41, ease: [0.22, 1, 0.36, 1] }}
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
                  duration: 0.41,
                  delay: 0.37 + i * 0.074,
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
            transition={{ delay: 0.74, duration: 0.37 }}
          >
            <div className="w-[1px] h-6 bg-[#2a2520] overflow-hidden relative">
              <motion.div
                className="absolute top-0 left-0 w-full bg-[#c9a84c]"
                initial={{ height: "0%" }}
                animate={{ height: "100%" }}
                transition={{ duration: 1.11, delay: 0.74, ease: "linear" }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
