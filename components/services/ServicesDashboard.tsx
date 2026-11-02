"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { SERVICE_CATEGORIES } from "@/lib/data/services";
import { startingPrice } from "@/lib/data/pricing";
import { PriceTable, ServiceBadge, TableHead } from "@/components/services/PriceTable";
import { CTAButton } from "@/components/CTAButton";
import { altenoUrl } from "@/lib/alteno";
import { Alteno, brandText } from "@/components/brand/BrandName";
import { fadeUp, viewport } from "@/lib/animations";
import { cn } from "@/lib/utils";

// Služby a ceník jako dashboard: vlevo kategorie (na mobilu vodorovný pruh),
// vpravo panel vybrané služby s ceníkem. Vzor Tabs z WAI-ARIA APG jako
// v MoreThanWeb: šipky přepínají, Home/End skáčou na kraj. Neaktivní panely
// jsou `hidden`, jejich text ale zůstává v HTML pro vyhledávače.
// Kotva v URL (/sluzby#seo) otevře rovnou daný panel, dlaždice na homepage
// na ni odkazují.

const TERMS = ["Konzultace zdarma", "Záloha 30 %, doplatek 70 %", "Stejný ceník pro všechny"];

const ARROW_STEP: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };

export default function ServicesDashboard() {
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const frameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = SERVICE_CATEGORIES.findIndex((s) => s.id === window.location.hash.slice(1));
    if (index < 0) return;
    setActive(index);
    tabRefs.current[index]?.scrollIntoView({ block: "nearest", inline: "center" });
    frameRef.current?.scrollIntoView({ block: "start" });
  }, []);

  function select(index: number) {
    setActive(index);
    window.history.replaceState(null, "", `#${SERVICE_CATEGORIES[index].id}`);
  }

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const count = SERVICE_CATEGORIES.length;
    let next: number | null = null;
    if (event.key in ARROW_STEP) next = (index + ARROW_STEP[event.key] + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    if (next === null) return;
    event.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <motion.div
      ref={frameRef}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={cn(
        "scroll-mt-24 md:scroll-mt-28 grid border border-white/[0.07] bg-[#0b0b0b]",
        "[grid-template-areas:'nav'_'panel'_'terms']",
        "lg:grid-cols-[19rem_minmax(0,1fr)] lg:grid-rows-[1fr_auto] lg:[grid-template-areas:'nav_panel'_'terms_panel']"
      )}
    >
      {/* Kategorie. U dlouhých panelů zůstává nabídka na desktopu v záběru. */}
      <div className="[grid-area:nav] min-w-0 border-b border-white/[0.07] lg:border-b-0 lg:border-r">
        <div className="lg:sticky lg:top-24">
          <p className="hidden lg:block px-6 pt-6 pb-3 font-inter font-medium text-[11px] uppercase tracking-[0.14em] text-text-muted">
            Kategorie
          </p>
          <div
            role="tablist"
            aria-label="Služby"
            aria-orientation="vertical"
            className="flex gap-1 overflow-x-auto p-2 [scrollbar-width:none] lg:flex-col lg:overflow-visible lg:px-3 lg:pt-0 lg:pb-4"
          >
            {SERVICE_CATEGORIES.map((service, index) => {
              const selected = index === active;
              const price = service.pricing ? startingPrice(service.pricing) : null;
              return (
                <button
                  key={service.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`sluzba-tab-${service.id}`}
                  aria-selected={selected}
                  aria-controls={`sluzba-panel-${service.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => select(index)}
                  onKeyDown={(event) => onKeyDown(event, index)}
                  className={cn(
                    "group relative flex shrink-0 items-center gap-3 px-3 py-2.5 text-left transition-colors duration-200 lg:py-3",
                    selected ? "bg-white/[0.05] text-[#f0ece6]" : "text-text-secondary hover:bg-white/[0.025] hover:text-[#f0ece6]"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 left-3 right-3 h-[2px] bg-[#c9a84c] transition-opacity duration-200 lg:inset-y-2 lg:left-0 lg:right-auto lg:h-auto lg:w-[2px]",
                      selected ? "opacity-100" : "opacity-0"
                    )}
                  />
                  <service.icon
                    size={16}
                    strokeWidth={1.5}
                    aria-hidden="true"
                    className={cn("shrink-0 transition-colors duration-200", selected ? "text-[#c9a84c]" : "text-text-muted group-hover:text-[#c9a84c]")}
                  />
                  <span className="font-inter font-normal text-[14px] whitespace-nowrap">{service.label}</span>
                  <span className="ml-auto hidden pl-3 font-inter font-normal text-[12px] text-text-muted whitespace-nowrap lg:block">
                    {price ?? "Na míru"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Podmínky: na desktopu pata postranního sloupce, na mobilu pod panelem. */}
      <ul className="[grid-area:terms] flex flex-wrap gap-x-6 gap-y-2.5 border-t border-white/[0.07] px-6 py-5 lg:flex-col lg:border-r">
        {TERMS.map((term) => (
          <li key={term} className="flex items-center gap-2.5 font-inter font-normal text-[12px] text-text-secondary">
            <Check size={13} strokeWidth={2} className="shrink-0 text-[#c9a84c]" aria-hidden="true" />
            {term}
          </li>
        ))}
      </ul>

      {/* Panely */}
      <div className="[grid-area:panel] min-w-0">
        {SERVICE_CATEGORIES.map((service, index) => {
          const selected = index === active;
          return (
            <motion.div
              key={service.id}
              role="tabpanel"
              id={`sluzba-panel-${service.id}`}
              aria-labelledby={`sluzba-tab-${service.id}`}
              hidden={!selected}
              initial={false}
              animate={selected ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="px-5 py-7 sm:p-6 md:p-10"
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-[#c9a84c]/40" aria-hidden="true">
                    <service.icon size={19} strokeWidth={1.25} className="text-[#c9a84c]" />
                  </span>
                  <div>
                    <h2 className="font-cormorant font-light text-[28px] md:text-[34px] leading-[1.1] text-[#f0ece6]">{service.title}</h2>
                    <p className="mt-1 font-inter font-normal text-[13px] text-text-muted">{service.subtitle}</p>
                  </div>
                </div>
                {service.badge && (
                  <span className="hidden sm:inline-flex">
                    <ServiceBadge badge={service.badge} />
                  </span>
                )}
              </div>

              <p className="mb-8 max-w-2xl font-inter font-normal text-[15px] leading-[1.8] text-text-secondary">
                {typeof service.description === "string" ? brandText(service.description) : service.description}
              </p>

              {service.pricing && <PriceTable categories={service.pricing} />}

              {service.includes && (
                <div className="border border-white/[0.07]">
                  <TableHead left="Co zahrnuje" right="Cena" />
                  <ul className="grid gap-x-6 gap-y-3 px-4 py-5 sm:grid-cols-2 sm:px-5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-center gap-2.5 font-inter font-normal text-[14px] text-[#f0ece6]">
                        <Check size={14} strokeWidth={1.75} className="shrink-0 text-[#c9a84c]" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col gap-3 border-t border-white/[0.05] px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:gap-5 sm:px-5">
                    <p className="font-inter font-normal text-[13px] leading-[1.65] text-text-secondary">
                      Cenu určuje rozsah. Nabídku dostanete po konzultaci zdarma.
                    </p>
                    <p className="shrink-0 font-cormorant font-normal text-[22px] md:text-[24px] leading-none text-[#f0ece6]">
                      Na míru
                    </p>
                  </div>
                </div>
              )}

              {service.id === "automatizace" && (
                <p className="mt-5 max-w-2xl font-inter font-normal text-[13px] leading-[1.8] text-text-secondary">
                  Automatizace má pevnou cenu předem, u AI agentů a chatbotů záleží na rozsahu. Kolik vám
                  rutina bere času, spočítáte v{" "}
                  <a
                    href={altenoUrl("/cenik#kalkulacka", "sluzby")}
                    target="_blank"
                    rel="noopener"
                    className="text-[#c9a84c] hover:underline"
                  >
                    kalkulačce na <Alteno /> ↗
                  </a>
                  .
                </p>
              )}

              {service.links && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {service.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="font-inter font-normal text-[12px] text-text-secondary border border-white/[0.08] px-3 py-1.5 hover:text-[#f0ece6] hover:border-[#c9a84c]/40 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/[0.07] pt-6">
                <CTAButton className="font-inter font-medium text-[12px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3 hover:bg-[#d4b968] transition-colors duration-300">
                  Nezávazná poptávka
                </CTAButton>
                {service.href && (
                  <Link
                    href={service.href}
                    className="inline-flex items-center gap-2 font-inter font-medium text-[12px] tracking-[0.1em] uppercase text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-300"
                  >
                    Detail služby <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
