"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stagger, fadeIn } from "@/lib/animations";
import { CTAButton } from "@/components/CTAButton";

const navLinks = [
  { label: "O mně",     href: "#o-mne" },
  { label: "Služby",    href: "#sluzby" },
  { label: "Portfolio",  href: "#portfolio" },
  { label: "Reference",  href: "#reference" },
  { label: "Ceník",      href: "#cenik" },
  { label: "Kontakt",   href: "#kontakt" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 300);
  };

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "backdrop-blur-xl bg-[#080808]/90 border-b border-white/[0.05]" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="flex flex-col leading-none group" aria-label="VIZEON">
            <span className="font-cormorant font-light text-[22px] tracking-widest text-[#f0ece6] group-hover:text-[#c9a84c] transition-colors duration-300">VIZEON</span>
            <span className="font-inter font-light text-[9px] uppercase tracking-[0.25em] text-[#8a8070]">Web. Design. Výsledky.</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Hlavní navigace">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={(e) => { e.preventDefault(); go(l.href); }}
                className="font-inter font-normal text-[12px] tracking-[0.08em] text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300 uppercase">
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <CTAButton className="hidden md:inline-flex font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#c9a84c] border border-[#c9a84c]/50 px-5 py-2.5 hover:bg-[#c9a84c] hover:text-[#080808] transition-all duration-300">
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
            className="fixed inset-0 z-40 bg-[#080808] flex flex-col items-center justify-center md:hidden"
          >
            <motion.nav variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-8">
              {navLinks.map((l) => (
                <motion.a key={l.href} href={l.href} variants={fadeIn}
                  onClick={(e) => { e.preventDefault(); go(l.href); }}
                  className="font-cormorant font-light text-5xl text-[#f0ece6] hover:text-[#c9a84c] transition-colors duration-300">
                  {l.label}
                </motion.a>
              ))}
              <motion.div variants={fadeIn} className="mt-6">
                <CTAButton className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#c9a84c] border border-[#c9a84c]/50 px-8 py-3 hover:bg-[#c9a84c] hover:text-[#080808] transition-all duration-300">
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
