"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { FOOTER_LINKS, FOOTER_AUTOMATION_LINKS } from "@/lib/nav";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { altenoUrl } from "@/lib/alteno";
import { Alteno, Vizeon } from "@/components/brand/BrandName";
import PhoneReveal from "@/components/PhoneReveal";

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
              <span className="font-inter font-normal text-[10px] uppercase tracking-[0.25em] text-text-secondary mt-0.5">
                Vize. Vývoj. Výsledky.
              </span>
            </Link>
            <p className="font-inter font-normal text-[13px] text-text-secondary leading-[1.7] max-w-xs mt-4">
              Tvoříme webové stránky a grafiku na míru, které mají smysl pro váš byznys. Přímá komunikace a důraz na výsledek.
            </p>

            {/* Rodina značek sedí pod Brand sloupcem, ne v navigaci: lišta má
                nejvýš 7 prvků (viz lib/nav.ts). */}
            <div className="mt-8 pt-6 border-t border-white/[0.05] max-w-xs">
              <p className="font-inter font-normal text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] mb-3">
                Rodina značek
              </p>
              <BrandLockup size="sm" altenoHref={altenoUrl("/", "footer")} className="mb-3" />
              <p className="font-inter font-normal text-[12px] text-text-secondary leading-[1.7]">
                Weby děláme pod značkou <Vizeon />,{" "}
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
              {FOOTER_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-inter font-normal text-[13px] text-text-secondary hover:text-[#f0ece6] transition-colors duration-300 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Automatizace zvlášť: v liště je rozbalovací nabídka, kterou
                patička nemá, proto ji FOOTER_LINKS vynechává. */}
            <p className="font-inter font-normal text-[10px] uppercase tracking-[0.2em] text-[#c9a84c] mt-10 mb-5">Automatizace</p>
            <ul className="flex flex-col gap-3">
              {FOOTER_AUTOMATION_LINKS.map((item) => (
                <li key={item.href} className="flex">
                  <Link
                    href={item.href}
                    className="font-inter font-normal text-[13px] text-text-secondary hover:text-[#f0ece6] transition-colors duration-300 w-fit flex items-center gap-2"
                  >
                    {item.label}
                    {item.comingSoon ? (
                      <span className="border border-accent/40 text-accent text-[9px] uppercase tracking-[0.08em] px-1.5 py-0.5 leading-none">
                        Připravujeme
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
                <span className="font-inter font-normal text-[13px] text-text-secondary group-hover:text-[#f0ece6] transition-colors duration-300 break-all">
                  info@vizeon.cz
                </span>
              </a>
              <PhoneReveal />
              <a
                href="https://www.instagram.com/vizeon_official/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label="Instagram"
              >
                <InstagramIcon size={13} />
                <span className="font-inter font-normal text-[13px] text-text-secondary group-hover:text-[#f0ece6] transition-colors duration-300">
                  Instagram
                </span>
              </a>
              <p className="font-inter font-normal text-[13px] text-text-secondary">
                IČO: 29977231
              </p>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="h-[1px] bg-white/[0.05] mb-8" aria-hidden="true" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter font-normal text-[12px] text-text-muted">
            © 2026 <Vizeon />. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/gdpr"
              className="font-inter font-normal text-[12px] text-text-muted hover:text-text-secondary transition-colors duration-300"
            >
              Ochrana osobních údajů
            </Link>
            <span className="font-inter font-normal text-[12px] text-text-muted" aria-hidden="true">·</span>
            <Link
              href="/podminky"
              className="font-inter font-normal text-[12px] text-text-muted hover:text-text-secondary transition-colors duration-300"
            >
              Obchodní podmínky
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
