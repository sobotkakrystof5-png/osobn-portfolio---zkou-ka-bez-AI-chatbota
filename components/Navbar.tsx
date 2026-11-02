"use client";

import { useState, useEffect, useId, useRef } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { stagger, fadeIn } from "@/lib/animations";
import { CTAButton } from "@/components/CTAButton";
import NavDropdown from "@/components/NavDropdown";
import { useScrollLock } from "@/hooks/useScrollLock";
import { NAV_STRUCTURE, isNavGroup, type NavGroup } from "@/lib/nav";

const MotionLink = motion(Link);

// Skupina v mobilním overlayi: řádek s odkazem na hub skupiny a vedle něj
// chevron, který pod ním rozbalí podstránky. Chevron stojí absolutně za
// textem, aby text zůstal na ose vystředěného menu jako ostatní položky.
// Stav je lokální: overlay se při zavření odpojí, takže se příště otevře
// zase sbalená.
function MobileNavGroup({ group, onNavigate }: { group: NavGroup; onNavigate: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const reduced = useReducedMotion() ?? false;

  return (
    <motion.div variants={fadeIn} className="flex flex-col items-center">
      <div className="relative">
        <Link href={group.href} onClick={onNavigate}
          className="font-cormorant font-light text-4xl xs:text-5xl text-[#f0ece6] hover:text-[#c9a84c] transition-colors duration-300">
          {group.label}
        </Link>
        {/* 44×44 px dotykový terč, ikona uprostřed. */}
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-label={`Podnabídka ${group.label}`}
          onClick={() => setExpanded((value) => !value)}
          className="absolute left-full top-1/2 -translate-y-1/2 ml-1 flex h-11 w-11 items-center justify-center text-text-secondary hover:text-[#c9a84c] transition-colors duration-300"
        >
          <ChevronDown aria-hidden strokeWidth={1.25}
            className={`h-6 w-6 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            id={listId}
            key="items"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0 } : { duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <ul className="flex flex-col items-center gap-1 pt-4">
              {group.items.map((item) => (
                <li key={`${item.href}-${item.label}`}>
                  <Link href={item.href} onClick={onNavigate}
                    className="flex min-h-11 items-center gap-2 font-inter font-normal text-[13px] uppercase tracking-[0.1em] text-text-secondary hover:text-[#f0ece6] transition-colors duration-300">
                    {item.label}
                    {item.comingSoon ? (
                      <span className="border border-accent/40 text-accent text-[10px] uppercase px-1.5 py-0.5 leading-none tracking-[0.08em]">
                        Připravujeme
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useScrollLock(menuOpen);

  // Escape zavře mobilní menu a vrátí focus na hamburger (jako alteno).
  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      setMenuOpen(false);
      toggleRef.current?.focus();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  // Overlay je jen pod xl. Když okno přes 1280 px přeroste (otočení tabletu),
  // overlay i hamburger zmizí, ale menuOpen by dál zamykal scroll.
  useEffect(() => {
    if (!menuOpen) return;
    const mq = window.matchMedia("(min-width: 1280px)");
    function onChange(event: MediaQueryListEvent) {
      if (event.matches) setMenuOpen(false);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [menuOpen]);

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
            <span className="font-inter font-normal text-[9px] uppercase tracking-[0.25em] text-text-secondary">Vize. Vývoj. Výsledky.</span>
          </Link>

          {/* Desktop nav od xl (1280 px), pod tím hamburger. Lišta má od
              11/2026 7 položek a CTA (lib/nav.ts: Weby, E-shopy,
              Automatizace…); s logem a CTA se do 1024 px nevejdou.
              whitespace-nowrap: položky se v tísni nesmí zalomit na dva
              řádky („O nás"). */}
          <nav className="hidden xl:flex items-center gap-6" aria-label="Hlavní navigace">
            {NAV_STRUCTURE.map((entry) =>
              isNavGroup(entry) ? (
                <NavDropdown key={entry.href} {...entry} />
              ) : (
                <Link key={entry.href} href={entry.href}
                  className="font-inter font-normal text-[12px] tracking-[0.08em] text-text-secondary hover:text-[#f0ece6] transition-colors duration-300 uppercase whitespace-nowrap">
                  {entry.label}
                </Link>
              )
            )}
          </nav>

          {/* CTA je od xl v liště, pod ním v hamburger menu. Plná zlatá výplň, ať je to jasně hlavní CTA lišty;
              whitespace-nowrap, ať se text nikdy nezalomí. */}
          <CTAButton className="hidden xl:inline-flex shrink-0 whitespace-nowrap font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-all duration-300">
            Konzultace zdarma
          </CTAButton>

          {/* Hamburger */}
          <button ref={toggleRef} className="xl:hidden flex flex-col gap-[5px] p-2 -mr-2" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Zavřít" : "Menu"} aria-expanded={menuOpen}>
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
            // Bez `justify-center`: svisle centruje `my-auto` na <nav>. Po
            // rozbalení skupiny je menu vyšší než displej a `justify-center`
            // by ho přetekl na obě strany, takže by horní položky nešly
            // doscrollovat. Auto okraje při přetečení spadnou na 0.
            className="fixed inset-0 z-[var(--z-mobile-menu)] bg-[#080808] flex flex-col items-center overflow-y-auto pt-16 pb-10 xl:hidden"
          >
            <motion.nav variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center gap-5 xs:gap-8 my-auto py-6">
              {NAV_STRUCTURE.map((entry) =>
                isNavGroup(entry) ? (
                  <MobileNavGroup key={entry.href} group={entry} onNavigate={() => setMenuOpen(false)} />
                ) : (
                  <MotionLink key={entry.href} href={entry.href} variants={fadeIn}
                    onClick={() => setMenuOpen(false)}
                    className="font-cormorant font-light text-4xl xs:text-5xl text-[#f0ece6] hover:text-[#c9a84c] transition-colors duration-300">
                    {entry.label}
                  </MotionLink>
                )
              )}
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
