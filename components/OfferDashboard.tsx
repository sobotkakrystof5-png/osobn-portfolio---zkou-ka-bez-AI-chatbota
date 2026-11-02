"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SERVICE_CATEGORIES, type ServiceCategory } from "@/lib/data/services";
import { ServiceBadge } from "@/components/services/PriceTable";
import { fadeUp, viewport } from "@/lib/animations";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Dashboard nabídky na homepage: to, co skutečně děláme, jako dlaždice
// oddělené vlasovými linkami (mezera 1 px nad šedým pozadím mřížky). Ceny
// tu záměrně nejsou, ty jsou v přehledu Služby a ceník (/sluzby). Pořadí
// drží lištu (Weby, E-shopy, Automatizace), za automatizací marketing
// (SEO, sociální sítě, Google a Meta reklamy). Grafika, technické služby
// a ZakazIQ (to není služba, ale náš systém, viz „Víc než web“) sem nepatří.
type Tile = {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  points: string;
  badge?: string;
  href: string;
};

// Dlaždice může přepsat texty služby z lib/data/services.tsx: na homepage
// mluvíme o rezervačních systémech, na /sluzby jde o širší systémy na míru.
const OFFER: { id: string; override?: Partial<Pick<Tile, "title" | "short" | "points">> }[] = [
  { id: "weby" },
  { id: "e-shopy" },
  { id: "automatizace", override: { points: "AI agenti · Procesy · Chatboti" } },
  { id: "seo", override: { points: "Lokální SEO · Obsah · Technické SEO" } },
  { id: "socialni-site" },
  { id: "google-reklamy" },
  { id: "meta-reklamy" },
  { id: "aplikace", override: { title: "Webové aplikace" } },
  {
    id: "systemy",
    override: {
      title: "Rezervační systémy",
      short: "Online rezervace termínů bez zbytečného telefonování.",
      points: "Online rezervace · Kalendář termínů",
    },
  },
];

const byId = new Map<string, ServiceCategory>(SERVICE_CATEGORIES.map((service) => [service.id, service]));

const TILES: Tile[] = OFFER.flatMap(({ id, override }) => {
  const service = byId.get(id);
  if (!service) return [];
  return [
    {
      id,
      icon: service.icon,
      title: service.title,
      short: service.short,
      points: service.subtitle,
      badge: service.badge,
      href: service.href ?? `/sluzby#${id}`,
      ...override,
    },
  ];
});

// Na desktopu řady po 3 dlaždicích (mřížka o 6 sloupcích), neúplná poslední
// řada se roztáhne. Na tabletu 2 sloupce, lichá poslední dlaždice přes celou šířku.
function tileSpan(index: number) {
  const rest = TILES.length % 3;
  const inLastRow = rest > 0 && index >= TILES.length - rest;
  return cn(
    inLastRow ? (rest === 2 ? "lg:col-span-3" : "lg:col-span-6") : "lg:col-span-2",
    index === TILES.length - 1 && TILES.length % 2 === 1 && "sm:col-span-2"
  );
}

export default function OfferDashboard() {
  return (
    <section id="nabidka" className="py-24 md:py-32 bg-[#080808]" aria-labelledby="nabidka-nadpis">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className={cn(t.eyebrow, "mb-4")}>
          — Co nabízíme
        </motion.p>
        <motion.h2
          id="nabidka-nadpis"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="font-cormorant font-light text-[32px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl"
        >
          Všechno pro váš byznys na jednom místě.
        </motion.h2>
        <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className={cn(t.lead, "max-w-2xl mb-12 md:mb-14")}>
          Od webu a e-shopu přes automatizaci, SEO a reklamu až po webové aplikace a rezervační systémy. Všechno děláme na míru vašemu byznysu.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="border border-white/[0.07]">
          <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] bg-[#0b0b0b] px-5 py-4 md:px-6">
            <p className="font-inter font-medium text-[11px] uppercase tracking-[0.14em] text-text-muted">
              Nabídka <span className="text-text-muted/60">·</span> {TILES.length} služeb
            </p>
            <Link
              href="/sluzby"
              className="inline-flex items-center gap-2 font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-300"
            >
              Služby a ceník <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          <ul className="grid gap-px bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-6">
            {TILES.map((tile, index) => (
              <li key={tile.id} className={cn("flex", tileSpan(index))}>
                <Link
                  href={tile.href}
                  className="group flex w-full flex-col bg-[#080808] p-6 md:p-7 transition-colors duration-300 hover:bg-[#0f0f0f]"
                >
                  <div className="mb-6 flex items-start justify-between gap-4">
                    <span
                      className="flex h-10 w-10 items-center justify-center border border-[#c9a84c]/30 transition-colors duration-300 group-hover:border-[#c9a84c]/70"
                      aria-hidden="true"
                    >
                      <tile.icon size={17} strokeWidth={1.5} className="text-[#c9a84c]" />
                    </span>
                    {tile.badge && <ServiceBadge badge={tile.badge} />}
                  </div>
                  <h3 className="mb-2 font-inter font-medium text-[16px] text-[#f0ece6]">{tile.title}</h3>
                  <p className="font-inter font-normal text-[14px] leading-[1.65] text-text-secondary">{tile.short}</p>
                  <div className="mt-auto flex items-end justify-between gap-4 pt-8">
                    <p className="font-inter font-medium text-[11px] uppercase tracking-[0.12em] leading-[1.7] text-text-muted">{tile.points}</p>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="shrink-0 text-text-muted transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#c9a84c]"
                    />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
