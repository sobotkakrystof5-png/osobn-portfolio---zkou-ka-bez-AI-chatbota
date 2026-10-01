import { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 45 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// Dramatičtější stagger pro WOW efekt
export const staggerDramatic: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.05 } },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: -45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: 45 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

// Dramatický vstup karet — scale + y + fade
export const cardEntrance: Variants = {
  hidden: { opacity: 0, y: 55, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

/** Viewport config */
export const viewport = { once: true, margin: "-60px" } as const;

/**
 * Náhrada `fadeUp` pod prefers-reduced-motion: bez posunu, s nulovou délkou.
 *
 * Proč ne `initial={reduced ? false : "hidden"}`: na serveru vrací
 * `useReducedMotion()` null, takže SSR HTML vždy nese `opacity: 0`. Kdyby klient
 * pod reduced motion animaci vypnul, nikdo by ten inline styl nepřepsal a obsah
 * by zůstal neviditelný. Props `initial`/`whileInView` proto nechte stejné
 * a vyměňte jen varianty: `variants={reduced ? revealInstant : fadeUp}`.
 */
export const revealInstant: Variants = {
  hidden: { opacity: 0, y: 0 },
  visible: { opacity: 1, y: 0, transition: { duration: 0 } },
};
