import Link from "next/link";
import { Phone, Mail } from "lucide-react";

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

      {/* Trvalá kontaktní lišta — tyhle stránky dřív neměly žádnou cestu ke
          kontaktu (nav, formulář, tel/WhatsApp), viz SXO audit finding 2. */}
      <div className="border-t border-white/[0.04] bg-[#0c0c0c]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-2.5 flex flex-wrap items-center justify-center sm:justify-between gap-x-6 gap-y-1.5">
          <p className="hidden sm:block font-inter font-light text-[11px] text-[#5a5148] shrink-0">
            Nezávazná poptávka:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5">
            <a
              href="tel:+420604837333"
              className="flex items-center gap-1.5 font-inter font-medium text-[12px] text-[#f0ece6] hover:text-[#c9a84c] transition-colors duration-300"
              aria-label="Zavolat +420 604 837 333"
            >
              <Phone size={12} className="text-[#c9a84c] shrink-0" aria-hidden="true" />
              +420 604 837 333
            </a>
            <a
              href="https://wa.me/420604837333"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter font-medium text-[12px] text-[#8a8070] hover:text-[#c9a84c] transition-colors duration-300"
            >
              WhatsApp
            </a>
            <a
              href="mailto:info@vizeon.cz"
              className="hidden xs:flex items-center gap-1.5 font-inter font-light text-[12px] text-[#8a8070] hover:text-[#c9a84c] transition-colors duration-300"
            >
              <Mail size={12} className="text-[#c9a84c] shrink-0" aria-hidden="true" />
              info@vizeon.cz
            </a>
            <Link
              href="/kontakt"
              className="font-inter font-medium text-[11px] tracking-[0.08em] uppercase text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-300"
            >
              Kontaktní formulář →
            </Link>
          </div>
        </div>
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

// PillarCTA se přestěhovala do components/layout/ClosingCTA.tsx — používají ji
// i stránky mimo oborovou rodinu. Re-export drží zpětnou kompatibilitu importů.
export { ClosingCTA as PillarCTA } from "@/components/layout/ClosingCTA";
