"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cn } from "@/lib/utils";

// Blok, který se ukáže při najetí do obrazovky (CSS, viz hooks/useReveal.ts).
// Malý klientský obal, ať okolní komponenta může zůstat serverová.
export function Reveal({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  /** Pořadí pro zpoždění 100 ms na položku. */
  index?: number;
}) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal-item", className)}
      style={index ? ({ "--reveal-i": index } as CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
