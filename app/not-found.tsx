import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Stránka nenalezena",
  description: "Tato stránka neexistuje.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#080808] flex flex-col items-center justify-center px-6 text-center relative overflow-hidden">
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,168,76,0.05), transparent 70%)" }}
        aria-hidden="true"
      />

      <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-6 relative">
        — Chyba 404
      </p>
      <h1 className="font-cormorant font-light text-[100px] md:text-[160px] leading-none text-[#f0ece6] mb-4 relative" style={{ opacity: 0.12 }}>
        404
      </h1>
      <h2 className="font-cormorant font-light text-[32px] md:text-[48px] leading-[1.1] text-[#f0ece6] mb-4 relative -mt-8 md:-mt-12">
        Stránka nenalezena.
      </h2>
      <p className="font-inter font-light text-[15px] text-[#8a8070] mb-10 max-w-sm relative leading-[1.75]">
        Tato stránka neexistuje nebo byla přesunuta.
      </p>
      <Link
        href="/"
        className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300 relative"
      >
        ← Zpět na hlavní stránku
      </Link>
    </div>
  );
}
