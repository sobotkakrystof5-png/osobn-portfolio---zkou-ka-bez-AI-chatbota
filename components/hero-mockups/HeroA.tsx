"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { CalendarCheck, Inbox, MailCheck } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { cn } from "@/lib/utils";
import { BrowserChrome, EASE, HERO_LEAD, HeroCtas, LockupLine, SplitHeadline, rise, shot } from "./shared";

// Návrh A, „Živý provoz“: vlevo text, vpravo skutečný web klienta na
// počítači i v mobilu a přes něj karta s tím, co se mezitím děje za webem
// (poptávka, automatické potvrzení, termín v ZakazIQ). Stejný jazyk jako
// hero stránek E-shopy a Automatizace, jen tady drží celou nabídku najednou.
// Události jsou ukázkové a nejsou přiřazené ke konkrétnímu klientovi.

const PICKS = [
  { ...shot("studnarstvi-petran"), label: "Studnářství" },
  { ...shot("masaze-kestner"), label: "Masáže" },
  { ...shot("u-cerhu"), label: "Svatby" },
  { ...shot("zamecnictvi-mb"), label: "Zámečnictví" },
];

const EVENTS = [
  { icon: Inbox, title: "Nová poptávka z webu", sub: "Rekonstrukce koupelny · Jana N." },
  { icon: MailCheck, title: "Potvrzení odešlo zákazníkovi", sub: "Automaticky, do minuty" },
  { icon: CalendarCheck, title: "Termín zapsán do ZakazIQ", sub: "Čt 15:30 · obhlídka" },
];

const SLIDE_MS = 5600;

export default function HeroA() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [shown, setShown] = useState(0);

  // Po přepnutí webu naskočí události jedna po druhé, pak přijde další web.
  useEffect(() => {
    if (reduced) {
      setShown(EVENTS.length);
      return;
    }
    setShown(0);
    const timers = EVENTS.map((_, index) => window.setTimeout(() => setShown(index + 1), 900 + index * 1100));
    const next = window.setTimeout(() => setActive((value) => (value + 1) % PICKS.length), SLIDE_MS);
    return () => {
      timers.forEach(window.clearTimeout);
      window.clearTimeout(next);
    };
  }, [active, reduced]);

  const current = PICKS[active];

  return (
    <MotionConfig reducedMotion="user">
      <section id="hero" aria-label="Úvodní sekce" className="relative overflow-hidden bg-[#080808]">
        <div className="mx-auto flex max-w-7xl items-center px-6 pb-20 pt-28 md:px-12 md:pt-40 lg:min-h-[100svh] lg:pb-16 lg:pt-28">
          <div className="grid w-full grid-cols-[minmax(0,1fr)] items-center gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
            <div>
              <SplitHeadline size="half" />
              <motion.p {...rise(0.3)} className="mt-7 max-w-xl font-inter text-[17px] leading-[1.75] text-text-secondary md:text-[18px]">
                {HERO_LEAD}
              </motion.p>
              <motion.div {...rise(0.4)}>
                <HeroCtas className="mt-9" />
              </motion.div>
              <motion.div {...rise(0.5)}>
                <LockupLine className="mt-9" />
              </motion.div>
            </div>

            <motion.div {...rise(0.35)} className="relative md:mx-auto md:max-w-[640px] lg:max-w-none">
              {/* Počítač: skutečný web klienta. */}
              <div className="border border-white/[0.09] bg-[#0b0b0b]">
                <BrowserChrome domain={current.domain} />
                <div className="relative aspect-[3024/1964] overflow-hidden">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={current.slug}
                      className="absolute inset-0"
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: EASE }}
                    >
                      <Image
                        src={current.desktop}
                        alt={`Web ${current.title}, který jsme postavili`}
                        fill
                        priority={active === 0}
                        sizes="(min-width: 1024px) 560px, 100vw"
                        className="object-cover object-top"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Mobil: stejný web, přesahuje pravý okraj počítače. */}
              <div aria-hidden="true" className="absolute -right-3 top-[34%] hidden w-[124px] md:block xl:-right-8 xl:w-[148px]">
                <div className="rounded-[22px] border border-white/15 bg-[#0b0b0b] p-1.5 shadow-[0_30px_60px_-24px_rgba(0,0,0,0.95)]">
                  <div className="relative aspect-[1206/2622] overflow-hidden rounded-[16px]">
                    <AnimatePresence initial={false}>
                      <motion.div
                        key={current.slug}
                        className="absolute inset-0"
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                      >
                        <Image src={current.mobile} alt="" fill sizes="148px" className="object-cover object-top" />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Přepínač webů: popisek a průběh do dalšího. */}
              <div role="tablist" aria-label="Weby, které jsme postavili" className="mt-5 flex overflow-x-auto md:pr-[150px] xl:pr-[170px]">
                {PICKS.map((pick, index) => {
                  const isActive = index === active;
                  return (
                    <button
                      key={pick.slug}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(index)}
                      className="group flex min-w-[92px] flex-1 flex-col gap-2.5 pr-2 text-left"
                    >
                      <span
                        className={cn(
                          "font-inter text-[13px] transition-colors duration-300",
                          isActive ? "text-[#f0ece6]" : "text-text-muted group-hover:text-[#f0ece6]"
                        )}
                      >
                        {pick.label}
                      </span>
                      <span className="relative block h-[2px] w-full overflow-hidden bg-white/[0.08]">
                        {isActive && (
                          <motion.span
                            key={`${pick.slug}-${active}`}
                            className="absolute inset-0 origin-left bg-[#c9a84c]"
                            initial={{ scaleX: reduced ? 1 : 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: reduced ? 0 : SLIDE_MS / 1000, ease: "linear" }}
                          />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Mezitím za webem: karta přes levý dolní roh počítače. */}
              <div
                aria-hidden="true"
                className="relative mt-8 border border-[#c9a84c]/30 bg-[#0d0c09] md:absolute md:-left-10 md:bottom-[92px] md:mt-0 md:w-[300px] md:shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)]"
              >
                <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3">
                  <span className="font-inter text-[13px] text-[#f0ece6]">Mezitím na webu</span>
                  <span className="flex items-center gap-2 font-inter text-[12px] text-text-muted">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#c9a84c] opacity-60 motion-reduce:animate-none" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#c9a84c]" />
                    </span>
                    Ukázka
                  </span>
                </div>
                <ul className="px-4 py-2">
                  {EVENTS.map((event, index) => {
                    const visible = index < shown;
                    const Icon = event.icon;
                    return (
                      <motion.li
                        key={event.title}
                        initial={false}
                        animate={{ opacity: visible ? 1 : 0.18, y: visible ? 0 : 6 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="flex items-center gap-3 py-2.5"
                      >
                        <span
                          className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-500",
                            visible ? "bg-[#c9a84c] text-[#080808]" : "border border-white/15 text-text-muted"
                          )}
                        >
                          <Icon size={14} strokeWidth={2} />
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate font-inter text-[13.5px] text-[#f0ece6]">{event.title}</span>
                          <span className="block truncate font-inter text-[12px] text-text-muted">{event.sub}</span>
                        </span>
                      </motion.li>
                    );
                  })}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
