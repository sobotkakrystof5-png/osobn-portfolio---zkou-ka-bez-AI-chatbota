"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { NAV_LINKS } from "@/lib/nav";

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

function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12.004 2c-5.514 0-9.998 4.484-9.998 9.998 0 1.762.462 3.484 1.34 5.002L2 22l5.117-1.342a9.958 9.958 0 0 0 4.887 1.245h.004c5.514 0 9.998-4.484 9.998-9.998C21.996 6.484 17.518 2 12.004 2zm0 18.184h-.003a8.19 8.19 0 0 1-4.174-1.144l-.3-.178-3.037.797.81-2.961-.195-.304a8.166 8.166 0 0 1-1.256-4.396c0-4.518 3.677-8.194 8.196-8.194 2.189 0 4.247.853 5.795 2.402a8.14 8.14 0 0 1 2.399 5.796c-.001 4.518-3.678 8.182-8.235 8.182z" />
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
                Web. Design. Výsledky.
              </span>
            </Link>
            <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.7] max-w-xs mt-4">
              Tvořím webové stránky a grafiku na míru, které mají smysl pro váš byznys. Jeden člověk, přímá komunikace a důraz na výsledek.
            </p>
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
              <a href="tel:+420604837333" className="flex items-center gap-2 group" aria-label="Zavolat +420 604 837 333">
                <Phone size={13} className="text-[#c9a84c] shrink-0" />
                <span className="font-inter font-light text-[13px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300">
                  +420 604 837 333
                </span>
                <span className="font-inter font-light text-[10px] tracking-[0.08em] uppercase text-[#c9a84c]/0 group-hover:text-[#c9a84c]/70 transition-all duration-300">
                  · zavolat
                </span>
              </a>
              <a
                href="https://wa.me/420604837333"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group"
                aria-label="WhatsApp"
              >
                <WhatsAppIcon size={13} />
                <span className="font-inter font-light text-[13px] text-[#8a8070] group-hover:text-[#f0ece6] transition-colors duration-300">
                  WhatsApp
                </span>
              </a>
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
      </div>
    </footer>
  );
}
