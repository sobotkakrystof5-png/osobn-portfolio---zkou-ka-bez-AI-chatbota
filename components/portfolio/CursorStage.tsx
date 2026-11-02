"use client";

import { useState, type PointerEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Zlaté kolečko s popiskem, které nad scénou projektu nahrazuje kurzor myši.
// Na dotykových zařízeních se nezobrazuje (reaguje jen na pointerType mouse).
export function CursorStage({ label, children, className }: { label: string; children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 380, damping: 32, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 380, damping: 32, mass: 0.5 });
  const [visible, setVisible] = useState(false);

  const move = (e: PointerEvent<HTMLDivElement>, jump = false) => {
    if (e.pointerType !== "mouse") return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
    if (jump) {
      springX.jump(e.clientX - rect.left);
      springY.jump(e.clientY - rect.top);
    }
    setVisible(true);
  };

  return (
    <div
      className={cn("relative [@media(pointer:fine)]:cursor-none", className)}
      onPointerEnter={(e) => move(e, true)}
      onPointerMove={(e) => move(e)}
      onPointerLeave={() => setVisible(false)}
    >
      {children}
      <motion.span
        aria-hidden="true"
        style={{ x: springX, y: springY }}
        initial={false}
        animate={{ scale: visible ? 1 : 0.3, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute left-0 top-0 z-30 -ml-[46px] -mt-[46px] hidden h-[92px] w-[92px] flex-col items-center justify-center gap-0.5 rounded-full bg-[#c9a84c] text-[#080808] shadow-[0_10px_40px_-8px_rgba(201,168,76,0.6)] [@media(pointer:fine)]:flex"
      >
        <span className="font-inter font-medium text-[10px] uppercase tracking-[0.16em]">{label}</span>
        <ArrowUpRight size={15} strokeWidth={1.75} />
      </motion.span>
    </div>
  );
}
