"use client";

// Port z alteno (components/motion/usePrefersReducedMotion.ts), beze změny.

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mediaQueryList = window.matchMedia(QUERY);
  mediaQueryList.addEventListener("change", callback);
  return () => mediaQueryList.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

// motion/react's own useReducedMotion() reads matchMedia synchronously on
// the client's first render, which mismatches the server-rendered markup
// for any of these primitives that aren't behind a ssr:false dynamic import
// (AnimatedSection/GlowCard, unlike FlowDiagram, are server-rendered
// directly). useSyncExternalStore's getServerSnapshot guarantees
// the first client render matches the server (assumes motion enabled), then
// safely re-syncs to the real value right after hydration.
export function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
