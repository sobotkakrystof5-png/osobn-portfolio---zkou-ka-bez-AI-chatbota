"use client";

import { useEffect, useRef } from "react";

/**
 * Náhrada framer-motion `whileInView` + `fadeUp` v CSS (app/globals.css,
 * `[data-reveal]` a `.reveal-item`). Na rozdíl od framer-motion server vykreslí
 * obsah viditelný: skryje se až po hydrataci, a jen když je pod ohybem, takže
 * nic, co už je na obrazovce, neblikne. Atribut se mění přímo na elementu,
 * bez React stavu a překreslení. Položky se zpožděním dostanou `--reveal-i`.
 */
export function useReveal<T extends HTMLElement>(margin = "-60px") {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    el.dataset.reveal = "hidden";
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.dataset.reveal = "shown";
        io.disconnect();
      },
      { rootMargin: `0px 0px ${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return ref;
}
