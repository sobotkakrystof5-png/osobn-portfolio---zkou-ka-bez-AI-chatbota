"use client";

import { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useScrollLock } from "@/hooks/useScrollLock";

interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
  maxWidthClassName?: string;
}

// Sdílený "shell" pro BookingModal a FirstClientModal — backdrop, scroll
// lock (viz hooks/useScrollLock), close tlačítko a jeden zdroj pravdy pro
// to, jak modal vypadá na mobilu (fullscreen, 100dvh) vs. na desktopu
// (vycentrovaná karta, max-h-[90dvh]).
export function MobileModal({
  isOpen,
  onClose,
  children,
  ariaLabel,
  maxWidthClassName = "max-w-2xl",
}: MobileModalProps) {
  useScrollLock(isOpen);

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[var(--z-modal-backdrop)] bg-black/80 backdrop-blur-sm flex items-center justify-center sm:p-4"
          onClick={(e) => e.target === e.currentTarget && onClose()}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`relative z-[var(--z-modal)] bg-[#0a0a0a] border-0 sm:border border-white/10 w-full h-[100dvh] sm:h-auto modal-max-h rounded-none sm:rounded-2xl overflow-y-auto ${maxWidthClassName}`}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-lg border border-white/10 text-white/50 hover:border-white/30 hover:text-white transition-colors"
              aria-label="Zavřít"
            >
              <X size={15} />
            </button>

            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
