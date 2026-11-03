import { useId } from "react";
import { cn } from "@/lib/utils";

// Originální logo ZakazIQ, geometrie i barvy 1:1 z ZakazIQ/public/ikony/ikona.svg.
// Nepřebarvovat do palety VIZEON, je to vlastní značka produktu.
const SIZES = {
  sm: "h-7 w-7",
  lg: "h-12 w-12 sm:h-14 sm:w-14",
} as const;

export function ZakazIqMark({ size = "lg", className }: { size?: keyof typeof SIZES; className?: string }) {
  const gradientId = useId();
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("shrink-0", SIZES[size], className)}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2b57a8" />
          <stop offset="1" stopColor="#1b3868" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="17.92" fill={`url(#${gradientId})`} />
      <rect x="10" y="10" width="18" height="18" rx="5.04" fill="#fff" />
      <rect x="36" y="10" width="18" height="18" rx="5.04" fill="#fff" />
      <rect x="10" y="36" width="18" height="18" rx="5.04" fill="#fff" />
      <rect x="36" y="36" width="18" height="18" rx="5.04" fill="#fff" />
    </svg>
  );
}

// Nápis ZakazIQ v modré z loga (brand-400 → brand-500 ze ZakazIQ), na tmavém
// pozadí o stupeň světlejší než dlaždice, aby zůstal čitelný.
export const zakaziqWordmark =
  "bg-gradient-to-br from-[#5c8dd3] to-[#3a6ec4] bg-clip-text text-transparent";
