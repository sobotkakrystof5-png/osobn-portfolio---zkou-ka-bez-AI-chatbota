"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, CreditCard, Package, PackageCheck, ReceiptText, Repeat, ShoppingCart, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// „Jak to funguje“ jako cesta jedné objednávky od košíku po návrat zákazníka.
// Na desktopu stojí vpravo přilepená scéna: balíček jede po trati zastávek
// a pod ní se ukazuje, co se na zastávce právě děje. Aktivní je krok, který
// při scrollu protne střed okna. Na mobilu má každý krok scénu přímo u sebe.
// Údaje ve scénách jsou ukázkové (objednávka, ceny dopravy).
type Step = {
  icon: LucideIcon;
  station: string;
  title: string;
  text: string;
  we: string[];
  scene: { title: string; rows: [string, string][]; footer: string };
};

const STEPS: Step[] = [
  {
    icon: ShoppingCart,
    station: "Nákup",
    title: "Zákazník nakoupí",
    text: "E-shop, ve kterém se dobře nakupuje, hlavně na mobilu. Rychlý, přehledný a s košíkem bez zbytečných kroků.",
    we: ["Design na míru", "Produkty a kategorie", "Košík a pokladna"],
    scene: {
      title: "Košík",
      rows: [["Lněná zástěra", "1 290 Kč"], ["Doprava · Zásilkovna", "79 Kč"], ["Celkem", "1 369 Kč"]],
      footer: "Objednat a zaplatit",
    },
  },
  {
    icon: CreditCard,
    station: "Platba",
    title: "Zaplatí, jak mu to vyhovuje",
    text: "Kartou, převodem nebo na dobírku, rovnou v objednávce. Peníze odcházejí na váš účet.",
    we: ["Platební brána", "Karta i převod", "Dobírka"],
    scene: {
      title: "Platba",
      rows: [["Platební karta", "vybráno"], ["Ověření platby", "v pořádku"], ["Částka", "1 369 Kč"]],
      footer: "Zaplaceno",
    },
  },
  {
    icon: ReceiptText,
    station: "Zpracování",
    title: "Objednávka se zpracuje sama",
    text: "Zákazník dostane potvrzení, vy fakturu a přehled objednávek. Nic se nepřepisuje ručně.",
    we: ["Automatické e-maily", "Faktury", "Přehled objednávek"],
    scene: {
      title: "Objednávka #1043",
      rows: [["Potvrzení zákazníkovi", "odesláno"], ["Faktura", "vystavena"], ["Sklad", "upozorněn"]],
      footer: "Připraveno k odeslání",
    },
  },
  {
    icon: PackageCheck,
    station: "Sklad",
    title: "Zboží se zabalí",
    text: "Balíte sami, nebo objednávka rovnou odejde do balicího skladu, který zboží vychystá a zabalí za vás.",
    we: ["Skladové zásoby", "Balicí sklad", "Tisk štítků"],
    scene: {
      title: "Sklad",
      rows: [["Vychystáno", "1 ks"], ["Zabaleno", "hotovo"], ["Štítek dopravce", "vytištěn"]],
      footer: "Předáno dopravci",
    },
  },
  {
    icon: Truck,
    station: "Doprava",
    title: "Dopravce doručí",
    text: "Zásilkovna, Balíkovna, PPL nebo DPD. Zákazník si v pokladně vybere a pak sleduje, kde je jeho balík.",
    we: ["Dopravci a výdejní místa", "Ceny dopravy", "Sledování zásilek"],
    scene: {
      title: "Zásilka",
      rows: [["Převzato dopravcem", "dnes"], ["Zákazník dostal odkaz", "ke sledování"], ["Výdejní místo", "zítra"]],
      footer: "Doručeno",
    },
  },
  {
    icon: Repeat,
    station: "Návrat",
    title: "Zákazník se vrátí",
    text: "Reklama a e-maily přivedou nové zákazníky i ty, kteří už u vás nakoupili.",
    we: ["Google a Meta reklamy", "Remarketing", "Měření prodejů"],
    scene: {
      title: "Další nákup",
      rows: [["Reklama na Instagramu", "zobrazena"], ["Návrat do e-shopu", "z reklamy"], ["Druhá objednávka", "1 290 Kč"]],
      footer: "Věrný zákazník",
    },
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Karta s tím, co se na zastávce děje: tři řádky se postupně odškrtnou. */
function SceneCard({ step, reduced }: { step: Step; reduced: boolean }) {
  const Icon = step.icon;
  return (
    <div className="border border-[#c9a84c]/25 bg-[#0b0b0b]">
      <div className="flex items-center gap-3 border-b border-white/[0.06] px-5 py-4">
        <span className="flex h-8 w-8 items-center justify-center border border-[#c9a84c]/35 bg-[#c9a84c]/[0.08]">
          <Icon size={15} strokeWidth={1.5} className="text-[#c9a84c]" />
        </span>
        <span className="font-inter text-[14px] font-medium text-[#f0ece6]">{step.scene.title}</span>
      </div>
      <ul className="px-5 py-3">
        {step.scene.rows.map(([label, value], index) => (
          <motion.li
            key={label}
            initial={reduced ? false : { opacity: 0, x: 14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45, delay: reduced ? 0 : 0.15 + index * 0.22, ease: EASE }}
            className="flex items-center justify-between gap-4 border-b border-white/[0.04] py-3 last:border-0"
          >
            <span className="flex items-center gap-3 font-inter text-[14px] text-[#f0ece6]">
              <motion.span
                initial={reduced ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.35, delay: reduced ? 0 : 0.35 + index * 0.22, ease: EASE }}
                className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a84c]"
              >
                <Check size={11} strokeWidth={3} className="text-[#080808]" />
              </motion.span>
              {label}
            </span>
            <span className="font-inter text-[13px] tabular-nums text-text-secondary">{value}</span>
          </motion.li>
        ))}
      </ul>
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: reduced ? 0 : 0.9 }}
        className="bg-[#c9a84c] px-5 py-3.5 text-center font-inter text-[13px] font-medium uppercase tracking-[0.1em] text-[#080808]"
      >
        {step.scene.footer}
      </motion.div>
    </div>
  );
}

export function OrderJourney() {
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Aktivní je krok, který protíná pruh uprostřed okna.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = stepRefs.current.indexOf(entry.target as HTMLLIElement);
          if (index >= 0) setActive(index);
        }
      },
      { rootMargin: "-48% 0px -48% 0px" }
    );
    stepRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const goTo = (index: number) => {
    stepRefs.current[index]?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
  };

  const progress = active / (STEPS.length - 1);

  return (
    <div className="grid gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
      <ol className="relative">
        {/* Osa za kroužky kroků (na desktopu od prvního po poslední střed). */}
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-[21.5px] top-[22px] w-px bg-white/[0.08] lg:bottom-[32vh] lg:top-[32vh]"
        />
        {STEPS.map((step, index) => {
          const Icon = step.icon;
          const isActive = index === active;
          return (
            <li
              key={step.title}
              ref={(element) => {
                stepRefs.current[index] = element;
              }}
              className={cn(
                "relative flex flex-col justify-center pb-14 pl-16 last:pb-0 lg:min-h-[64vh] lg:pb-0",
                "transition-opacity duration-500",
                isActive ? "lg:opacity-100" : "lg:opacity-[0.35]"
              )}
            >
              {/* Kroužek kroku na ose, rozsvícený po aktivní krok. */}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border transition-colors duration-500 lg:top-1/2 lg:-translate-y-1/2",
                  isActive || index < active
                    ? "border-[#c9a84c] bg-[#c9a84c] text-[#080808]"
                    : "border-white/15 bg-[#080808] text-text-muted"
                )}
              >
                <Icon size={18} strokeWidth={1.5} />
              </span>

              <h3 className="font-cormorant font-light text-[30px] leading-[1.1] text-[#f0ece6] md:text-[36px]">{step.title}</h3>
              <p className="mt-3 max-w-md font-inter text-[16px] leading-[1.75] text-text-secondary md:text-[17px]">{step.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Co nastavíme">
                {step.we.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-1.5 border border-[#c9a84c]/25 bg-[#c9a84c]/[0.06] px-3 py-1.5 font-inter text-[13px] text-[#f0ece6]"
                  >
                    <Check size={12} strokeWidth={2.5} className="text-[#c9a84c]" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Na mobilu a tabletu scéna přímo u kroku. Řádky bez vlastní
                  animace (reduced), vjíždí celá karta, až na ni uživatel dojede. */}
              <motion.div
                aria-hidden="true"
                className="mt-7 max-w-md lg:hidden"
                initial={reduced ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <SceneCard step={step} reduced />
              </motion.div>
            </li>
          );
        })}
      </ol>

      {/* Desktop: přilepená scéna s tratí zastávek. */}
      <div className="hidden lg:block">
        <div className="sticky top-[calc(50vh-250px)]">
          <div className="relative px-2 pb-10 pt-20">
            {/* Trať: šedá dráha, zlatá výplň po aktivní zastávku, balíček jede. */}
            <div className="relative mx-[22px] h-px bg-white/10">
              <motion.div
                className="absolute inset-y-0 left-0 origin-left bg-[#c9a84c]"
                style={{ width: "100%" }}
                initial={false}
                animate={{ scaleX: progress }}
                transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
              />
              <motion.span
                aria-hidden="true"
                className="absolute -top-[64px] flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-[#c9a84c] shadow-[0_0_30px_rgba(201,168,76,0.55)]"
                initial={false}
                animate={{ left: `${progress * 100}%` }}
                transition={{ duration: reduced ? 0 : 0.7, ease: EASE }}
              >
                <Package size={16} strokeWidth={2} className="text-[#080808]" />
              </motion.span>
            </div>

            <div className="relative mt-[-22px] flex justify-between">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const reached = index <= active;
                return (
                  <button
                    key={step.station}
                    type="button"
                    onClick={() => goTo(index)}
                    aria-label={`Ukázat krok: ${step.title}`}
                    aria-current={index === active ? "step" : undefined}
                    className="group flex w-11 flex-col items-center gap-2 focus-visible:outline-none"
                  >
                    <span
                      className={cn(
                        "flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 group-hover:border-[#c9a84c] group-focus-visible:ring-2 group-focus-visible:ring-[#c9a84c]/60",
                        reached ? "border-[#c9a84c] bg-[#14110a] text-[#c9a84c]" : "border-white/15 bg-[#080808] text-text-muted"
                      )}
                    >
                      <Icon size={17} strokeWidth={1.5} />
                    </span>
                    <span
                      className={cn(
                        "whitespace-nowrap font-inter text-[13px] transition-colors duration-500",
                        index === active ? "text-[#f0ece6]" : "text-text-muted"
                      )}
                    >
                      {step.station}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div aria-hidden="true" className="relative min-h-[300px]">
            <span className="pointer-events-none absolute inset-x-10 inset-y-6 rounded-full bg-[#c9a84c]/[0.08] blur-3xl" />
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className="relative"
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <SceneCard step={STEPS[active]} reduced={reduced} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
