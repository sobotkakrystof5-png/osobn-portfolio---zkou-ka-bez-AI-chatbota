import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import SocialProof from "@/components/SocialProof";
import HeroA from "@/components/hero-mockups/HeroA";
import HeroB from "@/components/hero-mockups/HeroB";
import HeroC from "@/components/hero-mockups/HeroC";
import { cn } from "@/lib/utils";

// Dočasné náhledy tří směrů hero sekce homepage. Neindexovat; po výběru
// směru celou složku app/navrh-hero i components/hero-mockups smazat.
export const metadata: Metadata = {
  title: "Návrh hero sekce",
  robots: { index: false, follow: false },
};

const VARIANTS = {
  a: { Hero: HeroA, name: "A · Živý provoz" },
  b: { Hero: HeroB, name: "B · Hotová práce" },
  c: { Hero: HeroC, name: "C · Výsledek, ne web" },
} as const;

type Key = keyof typeof VARIANTS;

export function generateStaticParams() {
  return Object.keys(VARIANTS).map((varianta) => ({ varianta }));
}

export default async function NavrhHeroPage({ params }: { params: Promise<{ varianta: string }> }) {
  const { varianta } = await params;
  if (!(varianta in VARIANTS)) notFound();
  const { Hero } = VARIANTS[varianta as Key];

  return (
    <>
      <Navbar />
      <main id="main-content">
        <Hero />
        <SocialProof />
      </main>
      {/* Přepínač návrhů, jen pro porovnání, není součást designu. */}
      <nav
        aria-label="Přepnout návrh"
        data-mockup-switcher
        className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 bg-[#161616] p-1 font-inter text-[13px] shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
      >
        {(Object.keys(VARIANTS) as Key[]).map((key) => (
          <Link
            key={key}
            href={`/navrh-hero/${key}`}
            aria-current={key === varianta ? "page" : undefined}
            className={cn(
              "px-4 py-2 transition-colors",
              key === varianta ? "bg-[#c9a84c] text-[#080808]" : "text-text-secondary hover:text-[#f0ece6]"
            )}
          >
            {VARIANTS[key].name}
          </Link>
        ))}
      </nav>
    </>
  );
}
