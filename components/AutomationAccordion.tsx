"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cardEntrance, fadeUp, staggerDramatic, staggerFast, viewport } from "@/lib/animations";
import { AUTOMATION_SERVICES, type AutomationService, type AutomationServiceId } from "@/lib/data/automation";
import { altenoUrl, type AltenoCampaign } from "@/lib/alteno";
import { CTAButton } from "@/components/CTAButton";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

const IDS = AUTOMATION_SERVICES.map((s) => s.id);

function isServiceId(value: string): value is AutomationServiceId {
  return (IDS as string[]).includes(value);
}

// Bloky uvnitř rozbalené položky naskakují s krátkým odstupem. Jen transform a
// opacity — repo má audit, který právě kvůli výkonu zakazuje animovat
// box-shadow, rozměry nebo background-position (viz .text-shimmer v globals.css).
const contentItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

/** Protějšky pro prefers-reduced-motion: akordeon se jen přepne, nic nejede. */
const noStagger: Variants = { hidden: {}, visible: {} };
const noMotion: Variants = { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } };

/* ─── Plovoucí zlaté částice v pozadí ─────────────────
   Stejný princip jako v components/Services.tsx, jen menší hustota — sekce
   je vysoká a částice běží pořád. Při prefers-reduced-motion se nevykreslí. */
function FloatingParticles() {
  const particles = [
    { left: "8%", top: "14%", size: 2, dur: 5.5, delay: 0 },
    { left: "89%", top: "31%", size: 1.5, dur: 6.5, delay: 1.4 },
    { left: "46%", top: "74%", size: 2, dur: 4.8, delay: 0.6 },
    { left: "72%", top: "88%", size: 1, dur: 7, delay: 2.2 },
    { left: "22%", top: "58%", size: 1.5, dur: 6, delay: 1 },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#c9a84c]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size }}
          animate={{ y: [0, -20, 0], opacity: [0.08, 0.3, 0.08] }}
          transition={{ duration: p.dur, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}

function AccordionItem({
  service,
  index,
  isOpen,
  onOpen,
  onKeyNav,
  reduced,
}: {
  service: AutomationService;
  index: number;
  isOpen: boolean;
  onOpen: () => void;
  onKeyNav: (direction: -1 | 1) => void;
  reduced: boolean;
}) {
  const btnId = `automatizace-btn-${service.id}`;
  const panelId = `automatizace-panel-${service.id}`;
  const campaign = `automatizace-${service.id}` as AltenoCampaign;
  const hasHref = "href" in service.cta;
  const item = reduced ? noMotion : contentItem;
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    if (isOpen) el.removeAttribute("inert");
    else el.setAttribute("inert", "");
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      onKeyNav(1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      onKeyNav(-1);
    }
  };

  return (
    <motion.div
      variants={reduced ? noMotion : cardEntrance}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 320, damping: 26 }}
      id={service.id}
      className="scroll-mt-24 md:scroll-mt-28"
    >
      <div className="group relative glass-panel glass-panel-hover overflow-hidden">
        <div className="card-shimmer-line absolute top-0 left-0 right-0 h-[1px] pointer-events-none" aria-hidden="true" />

        {/* Hlavička — sbalený stav */}
        <h3 className="m-0">
          <button
            id={btnId}
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={onOpen}
            onKeyDown={handleKeyDown}
            data-accordion-header={index}
            className="w-full min-h-[64px] flex items-start sm:items-center gap-4 sm:gap-5 p-5 md:p-7 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#c9a84c] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0e0e0e]"
          >
            {/* Číslo — dekorativní, obsah nese title */}
            <span
              className="hidden sm:block font-cormorant font-light text-[34px] md:text-[42px] leading-none text-[#c9a84c]/25 group-hover:text-[#c9a84c]/45 transition-colors duration-500 shrink-0 w-[46px] md:w-[56px]"
              aria-hidden="true"
            >
              {service.number}
            </span>

            <span className="relative w-10 h-10 shrink-0 border border-[rgba(201,168,76,0.25)] flex items-center justify-center group-hover:border-[rgba(201,168,76,0.55)] transition-colors duration-300">
              <service.icon size={17} className="text-[#c9a84c]" aria-hidden="true" />
            </span>

            <span className="flex-1 min-w-0">
              <span className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1">
                <span className="font-cormorant font-light text-[21px] md:text-[26px] text-[#f0ece6] leading-tight">
                  {service.title}
                </span>
                {service.status === "preparing" && (
                  <span className="font-inter font-medium text-[10px] tracking-[0.1em] uppercase px-2.5 py-[3px] text-[#c9a84c] border border-[rgba(201,168,76,0.4)]">
                    Připravuji
                  </span>
                )}
              </span>
              <span className="block font-inter font-light text-[13px] md:text-[14px] text-[#8a8070] leading-[1.6]">
                {service.summary}
              </span>
            </span>

            <ChevronDown
              size={18}
              className={cn(
                "shrink-0 mt-1 sm:mt-0 text-[#c9a84c] transition-transform duration-300",
                isOpen && "rotate-180",
              )}
              aria-hidden="true"
            />
          </button>
        </h3>

        {/* Rozbalený obsah. Zůstává v DOM i sbalený (jen grid-template-rows
            0fr → 1fr), aby ho crawlery a AI enginy, které čtou vykreslený text,
            viděly celý — stejný princip jako components/FAQ.tsx. `inert` na
            sbaleném panelu jen zabrání tabování do neviditelných odkazů;
            nastavuje se přes ref, protože React 18 ho zná jako boolean atribut
            a v JSX ho zahodí. */}
        <div
          ref={panelRef}
          id={panelId}
          role="region"
          aria-labelledby={btnId}
          className={cn(
            "grid transition-[grid-template-rows] ease-out",
            reduced ? "duration-0" : "duration-300",
          )}
          style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
        >
          <div className="overflow-hidden">
            <motion.div
              variants={reduced ? noStagger : staggerFast}
              initial="hidden"
              animate={isOpen ? "visible" : "hidden"}
              className="px-5 md:px-7 pb-6 md:pb-8 pt-1 sm:pl-[86px] md:pl-[108px] space-y-6"
            >
              <motion.p variants={item} className={t.body}>
                {service.description}
              </motion.p>

              {service.scenarios.length > 0 && (
                <motion.div variants={item}>
                  <h4 className="font-inter font-medium text-[11px] uppercase tracking-[0.15em] text-[#3d3830] mb-4">
                    Jak to vypadá v praxi
                  </h4>
                  <div className="space-y-5">
                    {service.scenarios.map((sc) => (
                      <div key={sc.title} className="border-l border-[rgba(201,168,76,0.35)] pl-5">
                        <p className={cn(t.h3, "mb-1.5")}>{sc.title}</p>
                        <p className={t.body}>{sc.text}</p>
                      </div>
                    ))}
                  </div>
                  {service.scenariosNote && (
                    <p className="font-inter font-light text-[12px] text-[#3d3830] leading-[1.7] mt-4">
                      {service.scenariosNote}
                    </p>
                  )}
                </motion.div>
              )}

              <motion.div variants={item} className="flex flex-wrap gap-2">
                {service.chips.map((chip) => (
                  <span
                    key={chip}
                    className="font-inter font-light text-[11px] text-[#8a8070] border border-white/[0.07] px-2.5 py-1 bg-white/[0.015]"
                  >
                    {chip}
                  </span>
                ))}
              </motion.div>

              {service.priceNote && (
                <motion.p variants={item} className="font-inter font-light text-[13px] text-[#c9a84c]/80 leading-[1.75]">
                  {service.priceNote}
                </motion.p>
              )}

              {service.callout && (
                <motion.div variants={item} className="border border-[rgba(201,168,76,0.2)] p-4 md:p-5">
                  <p className={t.body}>{service.callout.text}</p>
                </motion.div>
              )}

              {service.relatedIndustries && (
                <motion.p variants={item} className="font-inter font-light text-[13px] text-[#8a8070] leading-[1.9]">
                  Hodí se pro:{" "}
                  {service.relatedIndustries.map((ind, i) => (
                    <span key={ind.href}>
                      {i > 0 && ", "}
                      <Link href={ind.href} className={t.link}>
                        {ind.label}
                      </Link>
                    </span>
                  ))}
                </motion.p>
              )}

              <motion.div variants={item} className="flex flex-col sm:flex-row gap-3 pt-1">
                {hasHref ? (
                  <Link
                    href={(service.cta as { href: string }).href}
                    className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3.5 hover:bg-[#d4b968] transition-colors duration-300 text-center"
                  >
                    {service.cta.label} →
                  </Link>
                ) : (
                  <CTAButton className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-3.5 hover:bg-[#d4b968] transition-colors duration-300 text-center">
                    {service.cta.label} →
                  </CTAButton>
                )}
                <a
                  href={altenoUrl(service.altenoPath, campaign)}
                  target="_blank"
                  rel="noopener"
                  className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#f0ece6] border border-white/10 px-6 py-3.5 hover:border-white/20 hover:bg-white/5 transition-colors duration-300 text-center"
                >
                  Detail služby na ALTENO ↗
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function AutomationAccordion() {
  const [openId, setOpenId] = useState<AutomationServiceId>(AUTOMATION_SERVICES[0].id);
  const reduced = useReducedMotion() ?? false;
  const listRef = useRef<HTMLDivElement>(null);

  // Deep linky: /automatizace#chatboti-rag otevře a doscrolluje správnou
  // položku, i po tvrdém obnovení. Odsazení pod fixní header (h-16 md:h-20)
  // řeší scroll-mt na samotné položce.
  const openFromHash = useCallback(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash || !isServiceId(hash)) return undefined;
    setOpenId(hash);

    const scrollToItem = (smooth: boolean) => {
      document.getElementById(hash)?.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
    };

    // Scrolluje se až po přechodu grid-template-rows (300 ms) — rozbalení cílové
    // a sbalení předchozí položky mění výšky nad cílem. Plynulý scroll si navíc
    // cílovou pozici spočítá na začátku animace, takže dosbalení, které mu
    // proběhne pod rukama, ho posune vedle. Druhý průchod tenhle zbytek dorovná.
    const timers = [
      window.setTimeout(() => scrollToItem(!reduced), reduced ? 0 : 380),
      window.setTimeout(() => {
        const el = document.getElementById(hash);
        if (!el) return;
        const offset = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
        if (Math.abs(el.getBoundingClientRect().top - offset) > 4) scrollToItem(false);
      }, reduced ? 60 : 1000),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [reduced]);

  useEffect(() => {
    const cleanup = openFromHash();
    const onHashChange = () => openFromHash();
    window.addEventListener("hashchange", onHashChange);
    return () => {
      cleanup?.();
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [openFromHash]);

  const handleOpen = (id: AutomationServiceId) => {
    setOpenId(id);
    // Hash se mění bez skoku stránky, ať jde odkaz na konkrétní službu sdílet.
    window.history.replaceState(null, "", `#${id}`);
  };

  const handleKeyNav = (from: number, direction: -1 | 1) => {
    const next = (from + direction + AUTOMATION_SERVICES.length) % AUTOMATION_SERVICES.length;
    const el = listRef.current?.querySelector<HTMLButtonElement>(`[data-accordion-header="${next}"]`);
    el?.focus();
  };

  return (
    <section
      id="sluzby-automatizace"
      className="py-20 md:py-28 bg-[#0e0e0e] relative overflow-hidden"
      aria-labelledby="automatizace-sluzby-nadpis"
    >
      {!reduced && <FloatingParticles />}

      <div
        className="absolute top-[-8%] left-[12%] w-[520px] h-[520px] rounded-full pointer-events-none glow-orb"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.05), transparent 70%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-[-8%] right-[8%] w-[440px] h-[440px] rounded-full pointer-events-none glow-orb"
        style={{ background: "radial-gradient(circle, rgba(201,168,76,0.035), transparent 70%)" }}
        aria-hidden="true"
      />

      <div className={cn(t.container.wide, "relative z-10")}>
        <motion.p
          variants={reduced ? noMotion : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className={cn(t.eyebrow, "mb-4")}
        >
          — Automatizace by ALTENO
        </motion.p>
        <motion.h2
          id="automatizace-sluzby-nadpis"
          variants={reduced ? noMotion : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className={cn(t.h2Page, "mb-6 max-w-2xl")}
        >
          Čtyři způsoby, jak vám ubrat rutinu
        </motion.h2>
        <motion.p
          variants={reduced ? noMotion : fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className={cn(t.lead, "max-w-2xl mb-12")}
        >
          Web přivádí zákazníky. Co se děje potom, tedy odpovědi, e-maily, doklady i telefony,
          jde z velké části zautomatizovat. Vyberte si, co vás zdržuje nejvíc. Zbytek probereme
          na konzultaci.
        </motion.p>

        <motion.div
          ref={listRef}
          variants={reduced ? noStagger : staggerDramatic}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="space-y-4 md:space-y-5 max-w-4xl"
        >
          {AUTOMATION_SERVICES.map((service, i) => (
            <AccordionItem
              key={service.id}
              service={service}
              index={i}
              isOpen={openId === service.id}
              onOpen={() => handleOpen(service.id)}
              onKeyNav={(direction) => handleKeyNav(i, direction)}
              reduced={reduced}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
