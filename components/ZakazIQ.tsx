"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MessageCircle, Star, CalendarCheck, LayoutDashboard } from "lucide-react";
import { fadeUp, stagger, cardEntrance, staggerDramatic, viewport } from "@/lib/animations";
import { CTAButton } from "@/components/CTAButton";

const features = [
  {
    icon: MessageCircle,
    title: "Komunikace o projektu",
    description: "Společný prostor, kde se bavíme o každém detailu vašeho projektu. Žádné ztracené emaily — vše na jednom místě.",
  },
  {
    icon: Star,
    title: "Zpětná vazba",
    description: "Klient mi může kdykoliv poslat připomínky, nápady nebo změny. Jednoduše, přímo a bez zbytečného zdržení.",
  },
  {
    icon: CalendarCheck,
    title: "Konzultace na jedno kliknutí",
    description: "Chcete prodiskutovat zlepšení projektu? Konzultaci si domluvíte přímo v systému — bez volání, bez čekání.",
  },
  {
    icon: LayoutDashboard,
    title: "Přehled pro obě strany",
    description: "Vy vidíte stav svého projektu. Já mám přehled o všech klientech a projektech. Pořádek, který šetří čas.",
  },
];

function ZakazIQLogo({ size = "default" }: { size?: "default" | "hero" }) {
  const svgSize = size === "hero" ? 96 : 44;
  const rx = size === "hero" ? 20 : 10;
  const scale = svgSize / 44;
  return (
    <div className={size === "hero" ? "flex flex-col items-center gap-5" : "flex items-center gap-3"} aria-label="ZakazIQ logo">
      <svg
        width={svgSize}
        height={svgSize}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        style={size === "hero" ? { filter: "drop-shadow(0 0 32px rgba(30,58,110,0.7))" } : undefined}
      >
        <rect width="44" height="44" rx={rx / scale} fill="#1e3a6e" />
        <rect x="10" y="10" width="10" height="10" rx="2" fill="white" />
        <rect x="24" y="10" width="10" height="10" rx="2" fill="white" />
        <rect x="10" y="24" width="10" height="10" rx="2" fill="white" />
        <rect x="24" y="24" width="10" height="10" rx="2" fill="white" />
      </svg>
      <span
        className={
          size === "hero"
            ? "font-inter font-semibold tracking-tight text-[#f0ece6] text-[52px] md:text-[72px] lg:text-[88px] leading-none"
            : "font-inter font-semibold text-[22px] tracking-tight text-[#f0ece6]"
        }
      >
        ZakazIQ
      </span>
    </div>
  );
}

export default function ZakazIQ() {
  return (
    <section id="zakaziq" className="py-28 md:py-40 bg-[#080808] relative overflow-hidden" aria-label="ZakazIQ">
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-[20%] w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(30,58,110,0.12), transparent 65%)", filter: "blur(100px)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-[10%] w-[500px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.04), transparent 65%)", filter: "blur(90px)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* Header — logo jako hlavní dominanta */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="flex flex-col items-center text-center mb-6"
        >
          <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-10">
            — Systém pro klienty
          </p>

          {/* Hlavní logo */}
          <div className="relative mb-10">
            {/* Ambient glow za logem */}
            <div
              className="absolute inset-0 -m-12 rounded-full pointer-events-none"
              style={{ background: "radial-gradient(circle, rgba(30,58,110,0.25), transparent 70%)", filter: "blur(40px)" }}
              aria-hidden="true"
            />
            <ZakazIQLogo size="hero" />
          </div>

          <p className="font-inter font-light text-[13px] uppercase tracking-[0.25em] text-[#8a8070] mb-2">
            Komunikační a rezervační systém
          </p>
        </motion.div>

        {/* 3 velká hesla + preview */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-20 mb-16">

          {/* Levý sloupec — hesla + popis */}
          <div className="flex-1 min-w-0">
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}>
              {[
                { text: "Komunikujete přímo.", accent: false },
                { text: "Sdílíte zpětnou vazbu.", accent: false },
                { text: "Máte přehled.", accent: true },
              ].map((line, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  className="flex items-baseline gap-5 border-b border-white/[0.04] py-5 first:pt-0 last:border-b-0 group"
                >
                  <span className="font-cormorant font-light text-[11px] tracking-[0.2em] text-[#c9a84c]/40 w-6 shrink-0 select-none" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h2
                    className={`font-cormorant font-light text-[42px] md:text-[64px] lg:text-[78px] leading-[1.0] tracking-tight ${
                      line.accent ? "text-shimmer" : "text-[#f0ece6]"
                    } group-hover:translate-x-2 transition-transform duration-500`}
                  >
                    {line.text}
                  </h2>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="font-inter font-normal text-[18px] md:text-[22px] text-[#e8e3dc] leading-[1.75] mt-10"
            >
              ZakazIQ je komunikační a rezervační systém, který přiřazuji každému svému klientovi. Po objednání konzultace přes VIZEON se automaticky dostanete do systému — a odtud probíhá veškerá spolupráce.
            </motion.p>
          </div>

          {/* Pravý sloupec — preview screenshot */}
          <motion.div
            variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
            className="w-full lg:w-[400px] xl:w-[460px] shrink-0 self-center flex flex-col items-center gap-4"
          >
            <div
              className="relative w-full rounded-[32px] overflow-hidden border border-white/[0.08]"
              style={{
                boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 80px rgba(30,58,110,0.3), inset 0 1px 0 rgba(255,255,255,0.07)"
              }}
            >
              <Image
                src="/zakaziq-preview.png"
                alt="Ukázka klientského prostředí ZakazIQ"
                width={460}
                height={860}
                className="w-full h-auto object-cover"
              />
            </div>
            <p className="font-inter font-light text-[11px] text-[#8a8070] tracking-[0.06em] text-center uppercase">
              Ukázka vašeho klientského prostředí
            </p>
          </motion.div>

        </div>

        {/* Feature cards */}
        <motion.div
          variants={staggerDramatic} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-16"
        >
          {features.map((f, i) => (
            <motion.div key={i} variants={cardEntrance} whileHover={{ y: -6 }} transition={{ type: "spring", stiffness: 320, damping: 26 }}>
              <div className="group relative glass-panel glass-panel-hover p-7 h-full overflow-hidden">
                {/* Top shimmer */}
                <div className="card-shimmer-line absolute top-0 left-0 right-0 h-[1px] pointer-events-none" aria-hidden="true" />

                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "radial-gradient(ellipse at 10% 0%, rgba(30,58,110,0.1), transparent 60%)" }}
                  aria-hidden="true"
                />

                {/* Left accent */}
                <div
                  className="absolute left-0 top-8 bottom-8 w-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: "linear-gradient(to bottom, transparent, rgba(30,58,110,0.6), transparent)" }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div className="relative w-10 h-10 border border-[rgba(30,58,110,0.4)] flex items-center justify-center mb-6 group-hover:border-[rgba(30,58,110,0.8)] transition-all duration-300 z-10">
                  <f.icon size={17} className="text-[#4a7fd4] group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "rgba(30,58,110,0.08)" }}
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-cormorant font-light text-[22px] md:text-[24px] text-[#f0ece6] mb-3 leading-tight relative z-10">
                  {f.title}
                </h3>
                <p className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.75] relative z-10">
                  {f.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Flow — jak to funguje */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="glass-panel p-8 md:p-10 relative overflow-hidden"
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "linear-gradient(135deg, rgba(30,58,110,0.06) 0%, transparent 60%)" }}
            aria-hidden="true"
          />

          <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#4a7fd4] mb-6 relative z-10">
            — Jak to funguje
          </p>

          <motion.div
            variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
            className="grid grid-cols-1 md:grid-cols-4 gap-0 relative z-10"
          >
            {[
              { step: "01", label: "Objednáte konzultaci", sub: "Zdarma přes VIZEON" },
              { step: "02", label: "Přiřazení do ZakazIQ", sub: "Automaticky, okamžitě" },
              { step: "03", label: "Komunikace & zpětná vazba", sub: "Přímo v systému" },
              { step: "04", label: "Dokončení projektu", sub: "S přehledem na obou stranách" },
            ].map((item, i, arr) => (
              <motion.div key={i} variants={fadeUp} className="flex md:flex-col items-start md:items-start gap-4 md:gap-0 relative">
                {/* Connector line (desktop) */}
                {i < arr.length - 1 && (
                  <div
                    className="hidden md:block absolute top-[14px] left-[calc(50%+20px)] right-0 h-[1px]"
                    style={{ background: "linear-gradient(to right, rgba(74,127,212,0.3), rgba(74,127,212,0.05))" }}
                    aria-hidden="true"
                  />
                )}

                <div className="flex items-center gap-3 md:mb-4">
                  <span className="font-cormorant font-light text-[32px] md:text-[40px] text-[#1e3a6e]/60 leading-none select-none" aria-hidden="true">
                    {item.step}
                  </span>
                  <div className="w-2 h-2 rounded-full bg-[#4a7fd4]/40 md:hidden shrink-0" aria-hidden="true" />
                </div>

                <div className="md:mt-0">
                  <p className="font-inter font-medium text-[13px] text-[#f0ece6] mb-1 leading-tight">
                    {item.label}
                  </p>
                  <p className="font-inter font-light text-[11px] text-[#8a8070] tracking-[0.03em]">
                    {item.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
          className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-5"
        >
          <CTAButton className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#c9a84c] border border-[#c9a84c]/50 px-7 py-3 hover:bg-[#c9a84c] hover:text-[#080808] transition-all duration-300">
            Konzultace zdarma → ZakazIQ
          </CTAButton>
          <p className="font-inter font-light text-[12px] text-[#8a8070]">
            Po objednání vás automaticky přidám do systému ZakazIQ.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
