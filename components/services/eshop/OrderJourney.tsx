"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimationFrame, useInView, useMotionValue } from "framer-motion";
import { Check, CreditCard, Package, PackageCheck, Pause, Play, ReceiptText, Repeat, ShoppingCart, Truck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// „Jak to funguje“ jako cesta jedné objednávky od košíku po návrat zákazníka,
// v jednom panelu: nahoře trať zastávek, pod ní co nastavíme a vpravo scéna,
// co se na zastávce právě děje. Balíček jede po trati plynule a stálou
// rychlostí, na každé zastávce se přepne obsah. Z Návratu se obloukem nad
// tratí vrátí na Nákup a jede dál, takže smyčka nikde nestojí ani neskáče.
// Klik na zastávku k ní balíček doveze a zastaví, tlačítko pod scénou
// smyčku pozastaví a znovu pustí. Čipy „co nastavíme“ nesou i to, co dřív
// měl hub platformy a konfigurátor dopravy.
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
    we: ["Design na míru", "Produkty a varianty", "Košík a pokladna", "Připomenutí opuštěného košíku"],
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
    text: "Kartou, převodem nebo na dobírku, rovnou v objednávce. Peníze jdou přímo na váš účet.",
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
    we: ["Automatické e-maily", "Faktury", "Napojení na fakturační systém", "Přehled objednávek"],
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
    we: ["Skladové zásoby", "Hlídání docházejícího zboží", "Balicí sklad", "Tisk štítků"],
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
    text: "Zásilkovna, Balíkovna, PPL, DPD, GLS i osobní odběr. Zákazník si v pokladně vybere a pak sleduje, kde je jeho balík.",
    we: ["Výdejní místa a Z-BOXy", "Ceny dopravy podle košíku", "Sledování zásilek"],
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
    we: ["Google a Meta reklamy", "Produktový feed", "Remarketing", "Měření prodejů"],
    scene: {
      title: "Další nákup",
      rows: [["Reklama na Instagramu", "zobrazena"], ["Návrat do e-shopu", "z reklamy"], ["Druhá objednávka", "1 290 Kč"]],
      footer: "Věrný zákazník",
    },
  },
];

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Časování smyčky: mezi zastávkami jede balíček STEP_MS, oblouk zpět trvá
// RETURN_MS (po tu dobu je vidět Návrat). Klik dojede za SEEK_MS.
const LAST = STEPS.length - 1;
const STEP_MS = 3500;
const FORWARD_MS = LAST * STEP_MS;
const RETURN_MS = 3500;
const CYCLE_MS = FORWARD_MS + RETURN_MS;
const SEEK_MS = 900;
const PACKAGE = 36;

const wrap = (time: number) => ((time % CYCLE_MS) + CYCLE_MS) % CYCLE_MS;
const easeInOut = (k: number) => (k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2);

type Frame = { x: number; lift: number; step: number; returning: boolean };

/** Kde je balíček v čase smyčky: x 0–1 po trati, lift 0–1 nad ní. */
function frameAt(time: number): Frame {
  if (time < FORWARD_MS) {
    const position = time / STEP_MS;
    return { x: position / LAST, lift: 0, step: Math.floor(position), returning: false };
  }
  // Oblouk po půlelipse. Úhel nabírá na krajích rychleji a nahoře zpomalí,
  // takže vzlet i přistání navazují na rychlost po trati.
  const tau = (time - FORWARD_MS) / RETURN_MS;
  const theta = Math.PI * (tau + Math.sin(2 * Math.PI * tau) / (4 * Math.PI));
  return { x: (1 + Math.cos(theta)) / 2, lift: Math.sin(theta), step: LAST, returning: true };
}

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
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const arcRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { margin: "-20% 0px" });

  const [active, setActive] = useState(0);
  const [reached, setReached] = useState(1);
  const [returning, setReturning] = useState(false);
  // null = klient ještě nerozhodl, pak platí výchozí stav (při omezeném
  // pohybu stojí smyčka, dokud ji klient sám nepustí).
  const [pausedByUser, setPausedByUser] = useState<boolean | null>(null);
  const paused = pausedByUser ?? reduced;
  const playing = !paused && inView;

  const time = useRef(0);
  const size = useRef({ width: 0, arc: 0 });
  const seek = useRef<{ from: number; to: number; start: number } | null>(null);
  const shown = useRef({ active: 0, reached: 1, returning: false });

  const packageX = useMotionValue(-PACKAGE / 2);
  const packageY = useMotionValue(0);
  const fill = useMotionValue(0);

  // Pohyb jde přes motion values (bez renderu), React se dozví jen o změně
  // zastávky, takže se renderuje párkrát za smyčku, ne v každém snímku.
  const draw = useCallback(
    (at: number) => {
      const frame = frameAt(at);
      packageX.set(frame.x * size.current.width - PACKAGE / 2);
      packageY.set(-frame.lift * size.current.arc);
      fill.set(frame.x);

      const last = shown.current;
      const reachedNow = frame.returning ? Math.floor(frame.x * LAST + 0.001) + 1 : frame.step + 1;
      if (!seek.current && frame.step !== last.active) {
        last.active = frame.step;
        setActive(frame.step);
      }
      if (reachedNow !== last.reached) {
        last.reached = reachedNow;
        setReached(reachedNow);
      }
      if (frame.returning !== last.returning) {
        last.returning = frame.returning;
        setReturning(frame.returning);
      }
    },
    [packageX, packageY, fill]
  );

  useEffect(() => {
    const measure = () => {
      size.current = { width: trackRef.current?.offsetWidth ?? 0, arc: arcRef.current?.offsetHeight ?? 0 };
      draw(time.current);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (arcRef.current) observer.observe(arcRef.current);
    return () => observer.disconnect();
  }, [draw]);

  useAnimationFrame((_, delta) => {
    if (seek.current) {
      const { from, to, start } = seek.current;
      const k = Math.min((performance.now() - start) / SEEK_MS, 1);
      if (k >= 1) seek.current = null;
      time.current = k >= 1 ? wrap(to) : wrap(from + (to - from) * easeInOut(k));
      draw(time.current);
      return;
    }
    if (!playing) return;
    // Po návratu do záložky přijde velký skok v čase, ten neposíláme dál.
    time.current = wrap(time.current + Math.min(delta, 100));
    draw(time.current);
  });

  // Klik: balíček dojede k zastávce kratší cestou (i obloukem) a zastaví.
  const choose = (index: number) => {
    setPausedByUser(true);
    shown.current.active = index;
    setActive(index);
    const target = index * STEP_MS;
    if (reduced) {
      time.current = target;
      draw(target);
      return;
    }
    const distance = wrap(target - time.current + CYCLE_MS / 2) - CYCLE_MS / 2;
    seek.current = { from: time.current, to: time.current + distance, start: performance.now() };
  };

  return (
    <div ref={rootRef}>
      <div className="relative pt-[104px] md:pt-[124px]">
        {/* Trať mezi středy první a poslední zastávky. Nad ní dráha balíčku
            a oblouk zpět; obojí se počítá od této linky. */}
        <div ref={trackRef} aria-hidden="true" className="relative mx-[22px] h-px bg-white/10">
          <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-[#c9a84c]" style={{ scaleX: fill }} />

          <div
            ref={arcRef}
            className={cn(
              "absolute inset-x-0 bottom-[46px] h-9 border border-b-0 border-dashed transition-colors duration-700 md:h-14",
              returning ? "border-[#c9a84c]/45" : "border-white/[0.09]"
            )}
            style={{ borderRadius: "50% 50% 0 0 / 100% 100% 0 0" }}
          />

          <motion.span
            className="absolute left-0 top-[-64px] flex h-9 w-9 items-center justify-center rounded-full bg-[#c9a84c] shadow-[0_0_30px_rgba(201,168,76,0.55)]"
            style={{ x: packageX, y: packageY }}
          >
            <Package size={16} strokeWidth={2} className="text-[#080808]" />
          </motion.span>
        </div>

        <div className="relative mt-[-22px] flex justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === active;
            return (
              <button
                key={step.station}
                type="button"
                onClick={() => choose(index)}
                aria-label={`Ukázat krok: ${step.title}`}
                aria-current={isActive ? "step" : undefined}
                aria-controls="cesta-objednavky-detail"
                className="group flex w-11 flex-col items-center gap-2 focus-visible:outline-none"
              >
                <span className="relative">
                  {/* Při příjezdu balíčku se od zastávky rozejde kruh. */}
                  {isActive && !reduced && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-[#c9a84c]"
                      initial={{ scale: 1, opacity: 0.7 }}
                      animate={{ scale: 1.9, opacity: 0 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  )}
                  <span
                    className={cn(
                      "relative flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-500 group-hover:border-[#c9a84c] group-focus-visible:ring-2 group-focus-visible:ring-[#c9a84c]/60",
                      isActive
                        ? "border-[#c9a84c] bg-[#c9a84c] text-[#080808] shadow-[0_0_30px_rgba(201,168,76,0.45)]"
                        : index < reached
                          ? "border-[#c9a84c] bg-[#14110a] text-[#c9a84c]"
                          : "border-white/15 bg-[#080808] text-text-muted"
                    )}
                  >
                    <Icon size={17} strokeWidth={1.5} />
                  </span>
                </span>
                <span
                  className={cn(
                    "hidden whitespace-nowrap font-inter text-[13px] transition-colors duration-500 sm:block",
                    isActive ? "text-[#f0ece6]" : "text-text-muted"
                  )}
                >
                  {step.station}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div id="cesta-objednavky-detail" className="mt-12 grid items-center gap-10 md:mt-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
        {/* Texty všech zastávek leží přes sebe ve stejné buňce: panel má výšku
            té nejdelší a při střídání pod ním nic neposkakuje. */}
        <div className="grid">
          {STEPS.map((step, index) => {
            const isActive = index === active;
            return (
              <motion.div
                key={step.title}
                aria-hidden={!isActive}
                className={cn("[grid-area:1/1]", !isActive && "pointer-events-none")}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0, y: isActive || reduced ? 0 : 10 }}
                transition={{ duration: reduced ? 0 : 0.5, delay: isActive && !reduced ? 0.2 : 0, ease: EASE }}
              >
                <p className="font-inter text-[12px] uppercase tracking-[0.14em] text-[#c9a84c] tabular-nums">
                  {String(index + 1).padStart(2, "0")} / {String(STEPS.length).padStart(2, "0")} · {step.station}
                </p>
                <h3 className="mt-3 font-cormorant font-light text-[32px] leading-[1.1] text-[#f0ece6] md:text-[40px]">{step.title}</h3>
                <p className="mt-3 max-w-lg font-inter text-[16px] leading-[1.7] text-text-secondary md:text-[17px]">{step.text}</p>
                <ul className="mt-6 flex flex-wrap gap-2" aria-label="Co nastavíme">
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
              </motion.div>
            );
          })}
        </div>

        <div className="relative">
          <span aria-hidden="true" className="pointer-events-none absolute inset-x-10 inset-y-6 rounded-full bg-[#c9a84c]/[0.08] blur-3xl" />
          <div aria-hidden="true" className="relative min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={reduced ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduced ? { opacity: 0, transition: { duration: 0 } } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <SceneCard step={STEPS[active]} reduced={reduced} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-4 flex justify-end">
            <button
              type="button"
              onClick={() => setPausedByUser(!paused)}
              className="flex items-center gap-2 font-inter text-[12px] uppercase tracking-[0.12em] text-text-muted transition-colors duration-300 hover:text-[#f0ece6] focus-visible:text-[#f0ece6] focus-visible:outline-none"
            >
              {paused ? <Play size={13} strokeWidth={1.75} aria-hidden="true" /> : <Pause size={13} strokeWidth={1.75} aria-hidden="true" />}
              {paused ? "Přehrát cestu" : "Pozastavit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
