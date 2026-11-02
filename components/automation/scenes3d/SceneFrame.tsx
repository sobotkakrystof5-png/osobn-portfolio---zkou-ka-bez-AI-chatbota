"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";
import { AnimatePresence, motion, useInView, useSpring } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { EASE } from "@/components/automation/scenes3d/iso";
import { cn } from "@/lib/utils";

// Rám 3D scény: odpočítává fáze příběhu, vykreslí SVG se společnými
// přechody (záře, koule, maska podlahy), pod ním větu, co se právě děje,
// a ukazatel, kterým jde fázi vybrat ručně. Myš scénu lehce naklápí.
//
// Fáze −1 je krátký reset mezi cykly (scéna se vrátí na začátek, popisek
// zůstává). `cycle` počítá průchody, scény podle něj střídají varianty
// příběhu (třeba vyřízeno sám × předáno člověku).

export type ScenePhase = { caption: string | ((cycle: number) => string); ms: number };

export type SceneState = { phase: number; cycle: number; reduced: boolean };

export function SceneFrame({
  phases,
  chip,
  viewBox,
  label,
  children,
  className,
}: {
  phases: ScenePhase[];
  chip: { icon: LucideIcon; label: string };
  viewBox: string;
  label: string;
  children: (state: SceneState) => ReactNode;
  className?: string;
}) {
  const reduced = usePrefersReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-10% 0px" });
  const [phase, setPhase] = useState(-1);
  const [cycle, setCycle] = useState(0);
  const last = phases.length - 1;

  useEffect(() => {
    if (reduced) {
      // Bez animací stojí scéna v posledním stavu, fáze jdou přepínat ručně.
      setPhase((value) => (value === -1 ? last : value));
      return;
    }
    if (!inView) return;
    const delay = phase === -1 ? 450 : phases[phase].ms;
    const timer = window.setTimeout(() => {
      if (phase >= last) {
        setPhase(-1);
        setCycle((value) => value + 1);
      } else {
        setPhase(phase + 1);
      }
    }, delay);
    return () => window.clearTimeout(timer);
  }, [phase, inView, reduced, phases, last]);

  const tiltX = useSpring(0, { stiffness: 110, damping: 16 });
  const tiltY = useSpring(0, { stiffness: 110, damping: 16 });
  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduced || event.pointerType !== "mouse") return;
    const rect = event.currentTarget.getBoundingClientRect();
    tiltY.set(((event.clientX - rect.left) / rect.width - 0.5) * 10);
    tiltX.set(-((event.clientY - rect.top) / rect.height - 0.5) * 8);
  };
  const onPointerLeave = () => {
    tiltX.set(0);
    tiltY.set(0);
  };

  const shown = Math.max(phase, 0);
  const caption = phases[shown].caption;
  const text = typeof caption === "function" ? caption(cycle) : caption;
  const ChipIcon = chip.icon;
  const [vx, vy, vw, vh] = viewBox.split(" ").map(Number);

  return (
    <div ref={rootRef} className={cn("relative mx-auto w-full max-w-[580px]", className)}>
      <span aria-hidden="true" className="absolute inset-x-10 inset-y-16 rounded-full bg-[#c9a84c]/[0.1] blur-3xl" />

      <div aria-hidden="true" className="relative flex h-[42px] items-center justify-end gap-2.5">
        <span className="relative flex h-2 w-2">
          {!reduced ? <span className="absolute inset-0 animate-ping rounded-full bg-[#c9a84c]/60" /> : null}
          <span className="relative h-2 w-2 rounded-full bg-[#c9a84c]" />
        </span>
        <span className="flex items-center gap-2 border border-[#c9a84c]/35 bg-[#100e09] px-3 py-2 font-inter text-[13px] text-[#f0ece6]">
          <ChipIcon size={14} strokeWidth={1.75} className="text-[#c9a84c]" />
          {chip.label}
        </span>
      </div>

      <motion.div
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        style={{ rotateX: tiltX, rotateY: tiltY, transformPerspective: 1100 }}
        className="relative"
      >
        <svg viewBox={viewBox} role="img" aria-label={label} className="block h-auto w-full overflow-visible">
          <defs>
            <radialGradient id="s3d-glow">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.36" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="s3d-orb" cx="38%" cy="34%" r="70%">
              <stop offset="0%" stopColor="#fff4d1" />
              <stop offset="35%" stopColor="#e3c46f" />
              <stop offset="75%" stopColor="#8f7431" />
              <stop offset="100%" stopColor="#3a2f14" />
            </radialGradient>
            <linearGradient id="s3d-beam" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c9a84c" stopOpacity="0.55" />
              <stop offset="100%" stopColor="#c9a84c" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="s3d-fade-g" cx="50%" cy="55%" r="55%">
              <stop offset="0%" stopColor="#fff" stopOpacity="1" />
              <stop offset="100%" stopColor="#fff" stopOpacity="0" />
            </radialGradient>
            <mask id="s3d-fade">
              <rect x={vx} y={vy} width={vw} height={vh} fill="url(#s3d-fade-g)" />
            </mask>
          </defs>
          {/* Mimo obrazovku se nekonečné smyčky (tečky, pás, orbita) zastaví. */}
          {children({ phase, cycle, reduced: reduced || !inView })}
        </svg>
      </motion.div>

      <div className="relative mt-2 border border-white/[0.07] bg-[#0b0b0b]/85 px-5 py-4 backdrop-blur-sm">
        <div className="flex min-h-[44px] items-start justify-between gap-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p
              key={`${shown}-${text}`}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: EASE }}
              className="font-inter text-[15px] font-medium leading-snug text-[#f0ece6]"
              aria-live="polite"
            >
              {text}
            </motion.p>
          </AnimatePresence>
          <span className="shrink-0 pt-0.5 font-inter text-[12px] tabular-nums tracking-[0.1em] text-text-muted">
            {String(shown + 1).padStart(2, "0")} / {String(phases.length).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-3 flex gap-1.5">
          {phases.map((item, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setPhase(index)}
              aria-label={`Krok ${index + 1} z ${phases.length}`}
              aria-pressed={index === phase}
              className="group flex-1 py-2 focus-visible:outline-none"
            >
              <span className="relative block h-1 overflow-hidden bg-white/[0.08] group-focus-visible:ring-2 group-focus-visible:ring-[#c9a84c]/60">
                <motion.span
                  key={index === phase ? `on-${phase}-${cycle}` : "off"}
                  className="absolute inset-0 origin-left bg-[#c9a84c]"
                  initial={{ scaleX: index < phase || (index === phase && reduced) ? 1 : 0 }}
                  animate={{ scaleX: index <= phase ? 1 : 0 }}
                  transition={{ duration: index === phase && !reduced ? item.ms / 1000 : 0.25, ease: "linear" }}
                />
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
