"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CalendarCheck, Globe, MessageSquareText, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { Alteno, Vizeon } from "@/components/brand/BrandName";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { altenoUrl } from "@/lib/alteno";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Pás přes celou šířku (stejná výbava jako EshopAdsBand): web stavíme pod
// značkou VIZEON, automatizaci pod ALTENO, pro klienta je to jeden partner.
// Vpravo tři balíčky „web + automatizace“ pro ty, kdo web teprve řeší.
// Balíčky zatím nemají cenu (TODO majitele), proto žádná částka.
type Bundle = { icon: LucideIcon; title: string; text: string };

const BUNDLES: Bundle[] = [
  { icon: MessageSquareText, title: "Web + chatbot", text: "Chatbot odpovídá z obsahu webu. Plánujeme je spolu." },
  { icon: Workflow, title: "Web + automatizace poptávek", text: "Formulář, potvrzení, zápis do tabulky a upozornění pro vás." },
  { icon: CalendarCheck, title: "Web + rezervace a připomínky", text: "Online termíny a připomínky. Méně telefonování." },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function TwoBrandsBand() {
  const reduced = usePrefersReducedMotion();

  return (
    <section aria-labelledby="dve-znacky" className="relative overflow-hidden border-y border-[#c9a84c]/25 bg-[#0b0906] py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_75%_at_88%_50%,rgba(201,168,76,0.14),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/80 to-transparent"
      />

      <div className={cn(t.container.wide, "relative grid items-center gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20")}>
        <div>
          <BrandLockup size="md" altenoHref={altenoUrl("/", "automatizace-rodina")} className="mb-8" />
          <h2 id="dve-znacky" className="font-cormorant font-light text-[40px] leading-[1.05] text-[#f0ece6] md:text-[60px]">
            Dvě značky. <span className="text-gleam">Jeden</span> partner.
          </h2>
          <p className={cn(t.lead, "mt-6 max-w-md")}>
            Web stavíme pod značkou <Vizeon />, automatizaci pod sesterskou značkou <Alteno />. Jedna
            komunikace a nic se nepřehazuje mezi dodavateli.
          </p>
          <div className="mt-9 flex flex-col items-start gap-5">
            <CTAButton className="inline-flex justify-center bg-[#c9a84c] px-8 py-4 shadow-[0_0_44px_-8px_rgba(201,168,76,0.6)] font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-all duration-300 hover:bg-[#d4b968]">
              Probrat web i automatizaci →
            </CTAButton>
            <Link href="/ukazky-webu/alteno" className="font-inter text-[14px] text-text-secondary transition-colors duration-300 hover:text-[#c9a84c]">
              Web, který jsme postavili pro <Alteno /> →
            </Link>
          </div>
        </div>

        <div>
          <p className="mb-5 font-inter text-[12px] uppercase tracking-[0.14em] text-[#c9a84c]">Když web teprve vzniká</p>
          <ul className="space-y-4">
            {BUNDLES.map((bundle, index) => {
              const Icon = bundle.icon;
              return (
                <motion.li
                  key={bundle.title}
                  initial={{ opacity: 0, x: reduced ? 0 : 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : index * 0.12, ease: EASE }}
                  className="group flex items-center gap-5 border border-[#c9a84c]/20 bg-[#080808]/70 p-5 transition-[border-color,box-shadow] duration-500 hover:border-[#c9a84c]/45 hover:shadow-[0_0_50px_-22px_rgba(201,168,76,0.45)] md:p-6"
                >
                  {/* Web a automatizace: dva kroužky a mezi nimi teče tečka. */}
                  <div className="relative flex shrink-0 items-center" aria-hidden="true">
                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#0e0e0e] text-text-secondary">
                      <Globe size={18} strokeWidth={1.4} />
                    </span>
                    <span className="relative h-px w-7 bg-[#c9a84c]/30">
                      {!reduced && (
                        <motion.span
                          className="absolute -top-[2px] left-0 h-[5px] w-[5px] rounded-full bg-[#c9a84c]"
                          animate={{ x: [0, 23], opacity: [0, 1, 0] }}
                          transition={{ duration: 1.6, delay: index * 0.4, repeat: Infinity, repeatDelay: 0.8, ease: "easeInOut" }}
                        />
                      )}
                    </span>
                    <span className="relative z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#c9a84c] bg-[#c9a84c] text-[#080808] shadow-[0_0_24px_rgba(201,168,76,0.4)]">
                      <Icon size={18} strokeWidth={1.6} />
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-inter text-[17px] font-medium text-[#f0ece6]">{bundle.title}</h3>
                    <p className="mt-1 font-inter text-[15px] leading-[1.55] text-text-secondary">{bundle.text}</p>
                  </div>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
