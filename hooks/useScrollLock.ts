"use client";

import { useEffect } from "react";

// Module-level counter — sdílený napříč všemi instancemi hooku (víc
// modalů/menu může být "zamčených" zároveň), overflow/overlay třída se
// tak zruší až po odemčení úplně posledního z nich.
let lockCount = 0;

function lock() {
  lockCount += 1;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
    document.body.classList.add("overlay-open");
  }
}

function unlock() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) {
    document.body.style.overflow = "";
    document.body.classList.remove("overlay-open");
  }
}

// Zamkne scroll stránky a schová plovoucí chat bublinu (viz
// body.overlay-open v app/globals.css), dokud je `active` true.
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return;
    lock();
    return () => unlock();
  }, [active]);
}
