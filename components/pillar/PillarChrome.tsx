import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

// Sdílená hlavička/patička pro samostatné oborové stránky — kopíruje
// strukturu a styl z app/tvorba-webu-pro-zivnostniky/page.tsx, ať nové
// stránky vizuálně a strukturně navazují na referenční vzor.

export function PillarHeader() {
  return (
    <header className="border-b border-white/[0.05]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="flex flex-col leading-none group" aria-label="VIZEON — zpět na úvodní stránku">
          <span className="font-cormorant font-light text-[22px] tracking-widest text-[#f0ece6] group-hover:text-[#c9a84c] transition-colors duration-300">
            VIZEON
          </span>
          <span className="font-inter font-light text-[9px] uppercase tracking-[0.25em] text-[#3d3830]">
            Web. Design. Výsledky.
          </span>
        </Link>
        <Link
          href="/"
          className="font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300"
        >
          ← Zpět na web
        </Link>
      </div>
    </header>
  );
}

export function PillarFooter() {
  return (
    <footer className="border-t border-white/[0.05]">
      <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-inter font-light text-[12px] text-[#3d3830]">
          © 2026 VIZEON. Všechna práva vyhrazena.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/gdpr"
            className="font-inter font-light text-[12px] text-[#3d3830] hover:text-[#8a8070] transition-colors duration-300"
          >
            Ochrana osobních údajů
          </Link>
          <span className="font-inter font-light text-[12px] text-[#2a2520]" aria-hidden="true">·</span>
          <Link
            href="/podminky"
            className="font-inter font-light text-[12px] text-[#3d3830] hover:text-[#8a8070] transition-colors duration-300"
          >
            Obchodní podmínky
          </Link>
        </div>
      </div>
    </footer>
  );
}

export function PillarCTA({
  heading,
  subheading,
  buttonLabel = "Nezávazná konzultace zdarma →",
}: {
  heading: string;
  subheading: string;
  buttonLabel?: string;
}) {
  return (
    <div className="mt-16 pt-10 border-t border-white/[0.05] text-center">
      <p className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-2">
        {heading}
      </p>
      <p className="font-inter font-light text-[13px] text-[#8a8070] mb-8">{subheading}</p>
      <CTAButton className="inline-flex font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300">
        {buttonLabel}
      </CTAButton>
    </div>
  );
}
