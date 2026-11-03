"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/CTAButton";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { projects } from "@/lib/data/portfolio";
import { cn } from "@/lib/utils";

// Sdílené kusy tří návrhů hero sekce homepage (/navrh-hero/a|b|c). Po výběru
// směru se vítězná varianta přesune do components/Hero.tsx a tahle složka zmizí.

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Vstup prvku hero sekce: vyjede o 24 px a zprůhlední se, se zpožděním.
// S prefers-reduced-motion se o pohyb stará MotionConfig ve variantě.
export function rise(delay: number) {
  return {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: EASE },
  };
}

// Text odstavce pod H1 zůstává beze změny (rozhodnutí z 2. 11. 2026).
export const HERO_LEAD =
  "Pro živnostníky a malé i střední firmy stavím komplexní řešení na míru: weby a e-shopy, automatizaci procesů a AI chatboty. Komunikujete přímo se mnou, od první konzultace až po spuštění.";

// Původní H1 beze změny textu, jen jinak vysázené: „Weby a e-shopy,“ nese
// váhu ve velkém stupni, zbytek věty je druhý stupeň pod ním.
export function SplitHeadline({ size }: { size: "half" | "wide" }) {
  return (
    <h1 className="font-cormorant font-light text-[#f0ece6]">
      <motion.span
        {...rise(0.05)}
        className={cn(
          "block leading-[0.95] tracking-[-0.02em]",
          size === "half" ? "text-[52px] md:text-[80px] lg:text-[clamp(64px,6.4vw,92px)]" : "text-[clamp(56px,7.6vw,112px)]"
        )}
      >
        Weby a e-shopy,
      </motion.span>{" "}
      <motion.span {...rise(0.15)} className="mt-4 block text-[clamp(26px,2.5vw,36px)] leading-[1.18] md:mt-5">
        které spojují moderní design,
        <br className="hidden md:block" /> <span className="text-[#c9a84c]">SEO a automatizaci procesů.</span>
      </motion.span>
    </h1>
  );
}

export function HeroCtas({ className, secondary = true }: { className?: string; secondary?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-3 sm:flex-row", className)}>
      <CTAButton className="glow-pulse flex justify-center whitespace-nowrap bg-[#c9a84c] px-5 sm:px-8 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]">
        Nezávazná konzultace zdarma →
      </CTAButton>
      {secondary && (
      <Link
        href="/ukazky-webu"
        className="flex justify-center whitespace-nowrap border border-white/10 px-8 py-4 font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#f0ece6] transition-all duration-300 hover:border-white/20 hover:bg-white/5"
      >
        Ukázky webů
      </Link>
      )}
    </div>
  );
}

// Spolubranding ALTENO × VIZEON zůstává v hero ve všech variantách.
export function LockupLine({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-2", className)}>
      <BrandLockup size="sm" />
      <p className="font-inter text-[13px] text-text-secondary">
        Weby a automatizace pod jednou střechou ·{" "}
        <Link href="/automatizace" className="whitespace-nowrap text-[#c9a84c] hover:underline">
          Automatizace →
        </Link>
      </p>
    </div>
  );
}

// Skutečné weby z portfolia a jejich screenshoty (public/portfolio/screens).
export type Shot = {
  slug: string;
  title: string;
  kind: string;
  domain: string;
  desktop: string;
  mobile: string;
};

export const SHOTS: Shot[] = projects.map((project) => ({
  slug: project.slug,
  title: project.title,
  kind: project.kind,
  domain: project.url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""),
  desktop: `/portfolio/screens/${project.slug}-desktop.jpg`,
  mobile: `/portfolio/screens/${project.slug}-mobile-1.jpg`,
}));

export function shot(slug: string) {
  const found = SHOTS.find((item) => item.slug === slug);
  if (!found) throw new Error(`Projekt ${slug} není v lib/data/portfolio.ts`);
  return found;
}

// Lišta prohlížeče nad screenshotem: tři tečky a adresa (URL zůstává prostý text).
export function BrowserChrome({ domain }: { domain?: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-white/[0.06] px-3.5 py-2.5">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 rounded-full bg-white/[0.14]" />
        <span className="h-2 w-2 rounded-full bg-white/[0.14]" />
        <span className="h-2 w-2 rounded-full bg-white/[0.14]" />
      </span>
      {domain && (
        <span className="min-w-0 flex-1 truncate bg-white/[0.04] px-3 py-1 text-center font-inter text-[12px] text-text-muted">
          {domain}
        </span>
      )}
    </div>
  );
}
