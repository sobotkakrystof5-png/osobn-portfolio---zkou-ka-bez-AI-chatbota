"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { viewport } from "@/lib/animations";

// Vstup částí sekce na oborových stránkách: nadpis, text, pak položky,
// postupně po ~80 ms, posun 24 px a průhlednost, jednou při vstupu do výřezu.
// Obsah zůstává v serverovém HTML (SEO), animuje se jen jeho zobrazení.
// Reduced motion: props `initial`/`whileInView` zůstávají (viz komentář
// v components/automation/Reveal.tsx), mění se jen varianty: obsah se ukáže hned.

const EASE = [0.22, 1, 0.36, 1] as const;

const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.04 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const instantGroup: Variants = { hidden: {}, visible: {} };

// Pod reduced motion stejný výchozí stav jako `item` (jinak nesedí SSR
// a hydratace), jen se obsah při vstupu do výřezu ukáže hned, bez cesty.
const instantItem: Variants = {
  hidden: item.hidden,
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ul" | "ol" | "section";
}) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];
  return (
    <Tag
      variants={reduced ? instantGroup : group}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "h2";
}) {
  const reduced = useReducedMotion() ?? false;
  const Tag = motion[as];
  return (
    <Tag variants={reduced ? instantItem : item} className={className}>
      {children}
    </Tag>
  );
}
