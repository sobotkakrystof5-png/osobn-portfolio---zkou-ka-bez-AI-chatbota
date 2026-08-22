"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "vizeon-cookie-consent";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 2500);
      return () => clearTimeout(t);
    }
  }, []);

  // Dokud je lišta vidět, schovej plovoucí chat bublinu (viz
  // body.cookie-banner-visible v components/n8n-chat-theme.css), ať s ní
  // nekoliduje v pravém dolním rohu.
  useEffect(() => {
    document.body.classList.toggle("cookie-banner-visible", visible);
    return () => document.body.classList.remove("cookie-banner-visible");
  }, [visible]);

  const accept = () => { localStorage.setItem(STORAGE_KEY, "accepted"); setVisible(false); };
  const reject = () => { localStorage.setItem(STORAGE_KEY, "rejected"); setVisible(false); };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[var(--z-cookie-banner)] bg-[#111111] border-t border-white/[0.07]"
          role="dialog"
          aria-label="Nastavení cookies"
          aria-live="polite"
        >
          {/* Gold top accent line */}
          <div className="h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)" }} aria-hidden="true" />

          <div className="max-w-7xl mx-auto px-6 md:px-12 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.6] max-w-xl">
              Tento web používá cookies pro lepší uživatelský zážitek a analýzu návštěvnosti.{" "}
              <a href="/gdpr" className="text-[#c9a84c] hover:underline underline-offset-4 transition-all">
                Více informací
              </a>
            </p>
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={accept}
                className="font-inter font-medium text-[12px] tracking-[0.08em] uppercase text-[#080808] bg-[#c9a84c] px-5 py-2.5 hover:bg-[#d4b968] transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#c9a84c]/40 focus-visible:outline-none"
              >
                Přijmout
              </button>
              <button
                onClick={reject}
                className="font-inter font-medium text-[12px] tracking-[0.08em] uppercase text-[#8a8070] border border-white/[0.07] px-5 py-2.5 hover:border-white/20 hover:text-[#f0ece6] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-white/10 focus-visible:outline-none"
              >
                Odmítnout
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
