"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, revealInstant, viewport } from "@/lib/animations";

// Odhalení sekce při scrollu na /automatizace/[slug]. Stránka je serverová
// komponenta, tohle je jediný klientský obal kolem jejích sekcí, aby text
// zůstal v serverovém HTML (SEO) a jen se při vstupu do výřezu vysunul.
// Hero a scéna se do Reveal nebalí.
//
// REDUCED MOTION A HYDRATACE: na serveru `useReducedMotion()` vrací null,
// takže SSR HTML vždy nese počáteční stav `fadeUp` (opacity 0). Kdyby klient
// při reduced motion animaci vypnul (`initial={false}` bez `whileInView`),
// nikdo by ten inline `opacity: 0` z SSR nepřepsal a sekce by zůstala
// neviditelná. Props `initial`/`whileInView` jsou proto vždy stejné a pod
// reduced motion se mění jen varianty: bez posunu a s nulovou délkou, obsah
// se při vstupu do výřezu rovnou ukáže (`revealInstant` v lib/animations.ts).

export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div
      variants={reduced ? revealInstant : fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </motion.div>
  );
}
