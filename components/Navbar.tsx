"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { stagger, fadeIn } from "@/lib/animations";
import { CTAButton } from "@/components/CTAButton";
import { useScrollLock } from "@/hooks/useScrollLock";
import { NAV_LINKS } from "@/lib/nav";

const MotionLink = motion(Link);

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(menuOpen);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[var(--z-header)] transition-all duration-500 ${scrolled || menuOpen ? "backdrop-blur-xl bg-[#080808]/90 border-b border-white/[0.05]" : "bg-transparent"}`}>
        {/* h-16 md:h-20 beze změny oproti původní verzi — zvýšená výška
            přesahovala do "pt-16 md:pt-24" konvence, kterou používá ~15
            podstránek pro odsazení obsahu pod fixed headerem (viz jejich
            page.tsx), a na mobilu se s ní header překrýval. Vzdušnost
            navbaru řeší horizontální gapy a padding níž, ne výška. */}
        <div className="max-w-[92rem] mx-auto px-6 md:px-12 2xl:px-16 h-16 md:h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex flex-col leading-none group shrink-0" aria-label="VIZEON">
            <span className="font-cormorant font-light text-[22px] tracking-widest text-[#f0ece6] group-hover:text-[#c9a84c] transition-colors duration-300">VIZEON</span>
            <span className="font-inter font-light text-[9px] uppercase tracking-[0.25em] text-[#8a8070]">Web. Design. Výsledky.</span>
          </Link>

          {/* Desktop nav — whitespace-nowrap: bez toho se "O mně" (jediná
              položka se skutečnou mezerou v textu) v tísni s místem zalamovalo
              na dva řádky, zatímco jednoslovné položky (nezalomitelné) zůstaly
              vždy na jednom — flexbox "ukrádal" prostor právě jemu. lg:gap-6 a
              xl:gap-8 (1024-1279px bez CTA, a přesně 1280px kde se CTA nově
              objevuje) záměrně beze změny oproti původním hodnotám — to je
              nejtěsnější rozsah, viz vizeon.cz-audit. Prostor navíc
              ("vzdušnější" navigace) přidán jen tam, kde je ho jistě dost:
              md (bez CTA) a 2xl (1536px+, kde je místa nadbytek). */}
          <nav className="hidden md:flex items-center gap-5 lg:gap-6 xl:gap-8 2xl:gap-12" aria-label="Hlavní navigace">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href}
                className="font-inter font-normal text-[12px] tracking-[0.08em] text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300 uppercase whitespace-nowrap">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* CTA — schovaná mezi md-lg (768-1279px): s logem + 10 položkami
              navigace + CTA se tam už nevejde na jeden řádek bez zalamování/
              přetečení (viz audit). Od xl (1280px) je zpátky vidět. Plná
              zlatá výplň (místo dřívějšího obrysu — bez 1px borderu je i o
              chlup užší) + whitespace-nowrap, ať je to jasně hlavní CTA
              navbaru a text se nikdy nezalomí. Padding zvětšený jen mírně
              (px-5→px-6, py-2.5→py-3), ať se vejde i těsně nad 1280px. */}
          <CTAButton className="hidden xl:inline-flex shrink-0 whitespace-nowrap font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-all duration-300">
            Konzultace zdarma
          </CTAButton>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-[5px] p-2 -mr-2" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Zavřít" : "Menu"} aria-expanded={menuOpen}>
            <span className={`block w-6 h-[1px] bg-[#f0ece6] transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6px]" : ""}`} />
            <span className={`block w-6 h-[1px] bg-[#f0ece6] transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-6 h-[1px] bg-[#f0ece6] transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6px]" : ""}`} />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[var(--z-mobile-menu)] bg-[#080808] flex flex-col items-center justify-center overflow-y-auto pt-16 pb-10 md:hidden"
          >
            <motion.nav variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-5 xs:gap-8 my-auto py-6">
              {NAV_LINKS.map((l) => (
                <MotionLink key={l.href} href={l.href} variants={fadeIn}
                  onClick={() => setMenuOpen(false)}
                  className="font-cormorant font-light text-4xl xs:text-5xl text-[#f0ece6] hover:text-[#c9a84c] transition-colors duration-300">
                  {l.label}
                </MotionLink>
              ))}
              <motion.div variants={fadeIn} className="mt-4 xs:mt-6">
                <CTAButton className="whitespace-nowrap font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-3.5 hover:bg-[#d4b968] transition-all duration-300">
                  Konzultace zdarma
                </CTAButton>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
