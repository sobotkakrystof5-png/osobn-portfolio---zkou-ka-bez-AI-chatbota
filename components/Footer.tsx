"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { NAV_LINKS, AUTOMATION_NAV_ITEMS } from "@/lib/nav";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { altenoUrl } from "@/lib/alteno";
import { Alteno, Vizeon } from "@/components/brand/BrandName";
import PhoneReveal from "@/components/PhoneReveal";

function FacebookIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer id="footer" className="bg-[#080808] border-t border-white/[0.05]" aria-label="Patička">
      {/* Top golden line */}
      <div className="h-[1px]" style={{ background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.3), transparent)" }} aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* Brand */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <Link
              href="/"
              className="group inline-flex flex-col leading-none mb-4"
              aria-label="VIZEON — přejít na začátek"
            >
              <span className="font-cormorant font-light text-[28px] text-[#f0ece6] tracking-[0.12em] group-hover:text-[#c9a84c] transition-colors duration-300">
                VIZEON
              </span>
              <span className="font-inter font-light text-[10px] uppercase tracking-[0.25em] text-[#8a8070] mt-0.5">
                Vize. Vývoj. Výsledky.
              </span>
            </Link>
            <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.7] max-w-xs mt-4">
              Tvořím webové stránky a grafiku na míru, které mají smysl pro váš byznys. Jeden člověk, přímá komunikace a důraz na výsledek.
            </p>

            {/* Rodina značek sedí pod Brand sloupcem, ne v navigaci —
                lib/nav.ts je sdílený s Navbarem, kde je na další položku
                natěsno (viz komentář o šířce v Navbar.tsx). */}
            <div className="mt-8 pt-6 border-t border-white/[0.05] max-w-xs">
              <p className="font-inter font-normal text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] mb-3">
                Rodina značek
              </p>
              <BrandLockup size="sm" altenoHref={altenoUrl("/", "footer")} className="mb-3" />
              <p className="font-inter font-light text-[12px] text-[#8a8070] leading-[1.7]">
                Weby dělám pod značkou <Vizeon />,{" "}
                <Link href="/automatizace" className="text-[#c9a84c] hover:underline">
                  automatizaci firemních procesů
                </Link>{" "}
                dodává sesterská značka <Alteno />.
              </p>
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <p className="font-inter font-normal text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] mb-5">Navigace</p>
            <nav className="flex flex-col gap-3" aria-label="Patičková navigace">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter font-light text-[13px] text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Podstránky Automatizace zvlášť: v NAV_LINKS je jen hub, lišta je
                má v rozbalovacím panelu, který patička nemá. */}
            <p className="font-inter font-normal text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] mt-10 mb-5">Automatizace</p>
            <ul className="flex flex-col gap-3">
              {AUTOMATION_NAV_ITEMS.map((item) => (
                <li key={item.href} className="flex">
                  <Link
                    href={item.href}
                    className="font-inter font-light text-[13px] text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300 w-fit flex items-center gap-2"
                  >
                    {item.label}
                    {item.comingSoon ? (
                      <span className="border border-accent/40 text-accent text-[9px] uppercase tracking-[0.08em] px-1.5 py-0.5 leading-none">
                        Připravuji
                      </span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
            <p className="font-inter font-normal text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] mb-5">Kontakt</p>
            <div className="flex flex-col gap-4">
              <a href="mailto:info@vizeon.cz" className="flex items-center gap-3 group" aria-label="Email">
                <Mail size={13} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-light text-[13px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300 break-all">
                  info@vizeon.cz
                </span>
              </a>
              <PhoneReveal />
              <a
                href="https://www.facebook.com/profile.php?id=100086439650056"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label="Facebook"
              >
                <FacebookIcon size={13} />
                <span className="font-inter font-light text-[13px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300">
                  Facebook
                </span>
              </a>
              <a
                href="https://www.instagram.com/vizeon_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label="Instagram"
              >
                <InstagramIcon size={13} />
                <span className="font-inter font-light text-[13px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300">
                  Instagram
                </span>
              </a>
              <p className="font-inter font-light text-[13px] text-[#8a8070]">
                IČO: 29977231
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.05] mb-8" aria-hidden="true" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter font-light text-[12px] text-[#3d3830]">
            © 2026 <Vizeon />. Všechna práva vyhrazena.
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
      </div>
    </footer>
  );
}
