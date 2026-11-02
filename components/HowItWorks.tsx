"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { MutableRefObject } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import type { MotionValue, Variants } from "framer-motion";
import { Phone, Ruler, Code2, Rocket, ArrowRight, Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { fadeUp, revealInstant, slideLeft, slideRight, viewport } from "@/lib/animations";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { CTAButton } from "@/components/CTAButton";
import { StepStage } from "@/components/how-it-works/StepScenes";
import type { SceneId } from "@/components/how-it-works/StepScenes";
import { cn } from "@/lib/utils";

// Spolupráce ve 4 krocích (dřív 7, zkráceno po konzultaci 11/2026) jako
// příběh na svislé ose. Zlatá výplň osy sleduje scroll, uzly se rozsvěcí,
// jak k nim osa dojde, a u každého kroku se přehraje mini scéna toho, co
// se v něm děje. Homepage ukazuje krátké popisy a odkaz na /spoluprace,
// kde jsou kroky rozepsané podrobněji.
type Step = {
  number: string;
  icon: LucideIcon;
  scene: SceneId;
  stage: string;
  tag: string;
  title: string;
  short: string;
  detail: string;
};

const steps: Step[] = [
  {
    number: "01",
    icon: Phone,
    scene: "konzultace",
    stage: "Hovor",
    tag: "Zdarma a bez závazků",
    title: "Konzultace zdarma",
    short: "Zavoláme si nebo si napíšeme a zjistíme, co váš podnik potřebuje.",
    detail: "Zavoláme si nebo si napíšeme, zdarma a bez závazků. Zeptáme se na vaše podnikání, zákazníky a cíle, abychom věděli, co má web umět.",
  },
  {
    number: "02",
    icon: Ruler,
    scene: "navrh",
    stage: "Návrh webu",
    tag: "Žádná šablona",
    title: "Návrh na míru",
    short: "Připravíme návrh přímo pro vás a společně ho doladíme.",
    detail: "Připravíme první vizuální návrh přímo pro vás, žádnou šablonu. Společně ho projdeme a upravíme všechno, co potřebujete. Bez vašeho souhlasu dál nejdeme.",
  },
  {
    number: "03",
    icon: Code2,
    scene: "tvorba",
    stage: "Vývoj · živý náhled",
    tag: "Vidíte to naživo",
    title: "Tvorba webu",
    short: "Web stavíme ručně a vy ho průběžně vidíte naživo.",
    detail: "Web stavíme ručně a s péčí o každý detail. Rozpracovanou verzi vám pošleme jako živý odkaz, takže vidíte všechno v reálném provozu. Stav projektu sledujete v ZakazIQ, kde si domluvíte i konzultaci.",
  },
  {
    number: "04",
    icon: Rocket,
    scene: "spusteni",
    stage: "Spuštění",
    tag: "Web je celý váš",
    title: "Spuštění a předání",
    short: "Doladíme detaily, web spustíme a předáme vám přístupy.",
    detail: "Doladíme poslední úpravy, dokud nejste spokojeni. Pak web spustíme a předáme vám přístupy, návod i podporu. Web je celý váš.",
  },
];

// Zastávky osy (4 kroky + cíl) jako podíl výšky kontejneru osy. Než se
// změří skutečné pozice uzlů, platí tenhle odhad.
const DEFAULT_STOPS = [0.08, 0.31, 0.54, 0.77, 0.97];
// Jak dlouho (v jednotkách průběhu osy) se krok rozsvěcí, než k němu osa dojde.
const FOCUS_SPAN = 0.09;
const LIT_SPAN = 0.012;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

// `revealInstant` z lib/animations nuluje jen `y`. Kroky ale vjíždějí ze
// stran (slideLeft/slideRight), takže bez pohybu je potřeba vynulovat i `x`.
const revealInstantX: Variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  visible: { opacity: 1, x: 0, y: 0, transition: { duration: 0 } },
};

// Pod reduced motion se do `style` dávají pevné hodnoty (1, 0), nikdy
// `undefined`: první render proběhne s pohybem (server neví o preferenci)
// a framer po odebrání motion value nechá v DOM poslední inline styl,
// takže by sekce zůstala ztlumená.

type Stops = MutableRefObject<number[]>;

export default function HowItWorks({ variant = "page" }: { variant?: "home" | "page" }) {
  const isHome = variant === "home";
  const Heading = isHome ? motion.h2 : motion.h1;
  const bg = isHome ? "bg-[#0e0e0e]" : "bg-[#080808]";
  const reduced = usePrefersReducedMotion();
  const reveal = reduced ? revealInstant : fadeUp;

  const timelineRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stops = useRef<number[]>(DEFAULT_STOPS);
  const [trackEnd, setTrackEnd] = useState(DEFAULT_STOPS[DEFAULT_STOPS.length - 1]);
  // `reached` se při scrollu zpět vrací (uzly zhasínají), `played` ne:
  // jednou přehraná scéna zůstává hotová.
  const [reached, setReached] = useState(0);
  const [played, setPlayed] = useState(0);

  // Průběh osy se měří k vodorovné lince v 60 % výšky okna: 0 je, když na
  // ni dorazí začátek osy, 1, když konec kontejneru. Špička výplně tak
  // vždycky sedí na té lince a uzel se rozsvítí, když ji protne.
  const { scrollYProgress } = useScroll({ target: timelineRef, offset: ["start 60%", "end 60%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.0005 });

  const sync = useCallback((value: number) => {
    const count = stops.current.filter((stop) => value >= stop - LIT_SPAN / 2).length;
    setReached(count);
    setPlayed((prev) => Math.max(prev, count));
  }, []);

  useMotionValueEvent(progress, "change", sync);

  useEffect(() => {
    const root = timelineRef.current;
    if (!root) return;

    const measure = () => {
      const box = root.getBoundingClientRect();
      if (!box.height) return;
      stops.current = DEFAULT_STOPS.map((fallback, i) => {
        const node = nodeRefs.current[i];
        if (!node) return fallback;
        const rect = node.getBoundingClientRect();
        return (rect.top + rect.height / 2 - box.top) / box.height;
      });
      setTrackEnd(stops.current[stops.current.length - 1]);
      sync(progress.get());
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    return () => observer.disconnect();
  }, [progress, sync]);

  // Osa končí v cíli, ne na spodní hraně kontejneru, proto se výplň
  // přepočítává na její skutečnou délku.
  const fill = useTransform(progress, (value) => clamp01(value / (stops.current[stops.current.length - 1] || 1)));
  const headTop = useTransform(fill, (value) => `${value * 100}%`);
  const headOpacity = useTransform(fill, [0, 0.01, 0.99, 1], [0, 1, 1, 0]);
  const finishLit = useTransform(progress, (value) => {
    const at = stops.current[stops.current.length - 1];
    return clamp01((value - at + LIT_SPAN) / LIT_SPAN);
  });

  return (
    <section id="jak-to-funguje" className={cn("overflow-x-clip py-24 md:py-36", bg)} aria-label="Jak to probíhá">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl md:mx-auto md:text-center">
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport}
            className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
            — Jak to probíhá
          </motion.p>
          <Heading variants={reveal} initial="hidden" whileInView="visible" viewport={viewport}
            className="font-cormorant font-light text-[36px] md:text-[60px] leading-[1.06] text-[#f0ece6] text-balance">
            Čtyři kroky od nápadu <em className="italic text-[#c9a84c]">ke&nbsp;spuštění.</em>
          </Heading>
          {/* Linku spouští obal: IntersectionObserver prvek se scaleX(0)
              nevidí, protože má nulovou šířku. */}
          <motion.div aria-hidden="true" initial="hidden" whileInView="visible" viewport={viewport} className="mt-7 h-[2px]">
            <motion.span
              className="block h-full w-20 origin-left bg-[#c9a84c] md:mx-auto md:origin-center"
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1, transition: reduced ? { duration: 0 } : { duration: 0.9, delay: 0.25, ease: EASE } },
              }}
            />
          </motion.div>
          <motion.p variants={reveal} initial="hidden" whileInView="visible" viewport={viewport}
            className="mt-7 font-inter font-normal text-[15px] md:text-[17px] text-text-secondary leading-[1.7] max-w-xl md:mx-auto">
            Od prvního hovoru po spuštěný web. Vždy víte, co se děje a kdy.
          </motion.p>
        </div>

        <div ref={timelineRef} className="relative mt-16 md:mt-24">
          {/* Osa: šedá dráha, zlatá výplň podle scrollu a zářící špička. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 left-5 w-px -translate-x-1/2 lg:left-1/2 [mask-image:linear-gradient(to_bottom,transparent,#000_96px)]"
            style={{ height: `${trackEnd * 100}%` }}
          >
            <div className="absolute inset-0 bg-white/[0.09]" />
            <motion.div
              className="absolute inset-0 origin-top bg-gradient-to-b from-[#c9a84c]/40 via-[#c9a84c] to-[#e6c977]"
              style={{ scaleY: reduced ? 1 : fill }}
            />
          </div>
          {!reduced ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-5 w-px -translate-x-1/2 lg:left-1/2"
              style={{ height: `${trackEnd * 100}%` }}
            >
              <motion.span
                className="absolute left-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f3dc95] shadow-[0_0_12px_4px_rgba(201,168,76,0.55),0_0_40px_10px_rgba(201,168,76,0.18)]"
                style={{ top: headTop, opacity: headOpacity }}
              />
            </div>
          ) : null}

          <ol className="relative space-y-20 md:space-y-28 lg:space-y-32">
            {steps.map((step, i) => (
              <StepRow
                key={step.number}
                step={step}
                index={i}
                isHome={isHome}
                bg={bg}
                progress={progress}
                stops={stops}
                reduced={reduced}
                active={reduced || reached > i}
                run={reduced || played > i}
                nodeRef={(el) => {
                  nodeRefs.current[i] = el;
                }}
              />
            ))}
          </ol>

          <div className="relative mt-20 grid grid-cols-[40px_1fr] gap-x-5 lg:mt-28 lg:flex lg:flex-col lg:items-center lg:text-center">
            <div className="flex justify-center">
              <FinishNode
                nodeRef={(el) => {
                  nodeRefs.current[steps.length] = el;
                }}
                lit={finishLit}
                active={reduced || reached > steps.length}
                reduced={reduced}
                bg={bg}
              />
            </div>
            <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={viewport} className="pt-1 lg:pt-0 lg:mt-8">
              <p className="font-cormorant font-light text-[32px] md:text-[44px] leading-[1.1] text-[#f0ece6]">
                A váš web <em className="italic text-[#c9a84c]">je online.</em>
              </p>
              <p className="mt-3 font-inter font-normal text-[15px] md:text-[16px] text-text-secondary leading-[1.7]">
                S přístupy, návodem i podporou. Web je celý váš.
              </p>
              {isHome ? (
                <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center lg:justify-center">
                  <CTAButton className="font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300 text-center">
                    Konzultace zdarma
                  </CTAButton>
                  <Link href="/spoluprace"
                    className="inline-flex items-center gap-2 font-inter font-medium text-[12px] tracking-[0.1em] uppercase text-[#c9a84c] hover:text-[#d4b968] transition-colors duration-300">
                    Celý postup <ArrowRight size={14} aria-hidden="true" />
                  </Link>
                </div>
              ) : null}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StepRow({
  step,
  index,
  isHome,
  bg,
  progress,
  stops,
  reduced,
  active,
  run,
  nodeRef,
}: {
  step: Step;
  index: number;
  isHome: boolean;
  bg: string;
  progress: MotionValue<number>;
  stops: Stops;
  reduced: boolean;
  active: boolean;
  run: boolean;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  // Na desktopu se strany střídají: sudé kroky mají text vlevo a scénu
  // vpravo, liché naopak. Na mobilu je osa vlevo a scéna pod textem.
  const flip = index % 2 === 1;

  // Krok se rozsvěcí, jak se k němu blíží špička osy (vratně, i při scrollu zpět).
  const focus = useTransform(progress, (value) => clamp01((value - (stops.current[index] ?? 0) + FOCUS_SPAN) / FOCUS_SPAN));
  const textOpacity = useTransform(focus, [0, 1], [0.38, 1]);
  const stageOpacity = useTransform(focus, [0, 1], [0.3, 1]);
  const stageScale = useTransform(focus, [0, 1], [0.95, 1]);
  const lit = useTransform(progress, (value) => clamp01((value - (stops.current[index] ?? 0) + LIT_SPAN) / LIT_SPAN));
  // Velké číslo za textem jede pomaleji než stránka (paralaxa).
  const numberY = useTransform(progress, (value) => (value - (stops.current[index] ?? 0)) * -240);

  const textVariants = reduced ? revealInstantX : flip ? slideRight : slideLeft;
  const stageVariants = reduced ? revealInstantX : flip ? slideLeft : slideRight;

  return (
    <li className="relative isolate grid grid-cols-[40px_1fr] gap-x-5 lg:grid-cols-[1fr_96px_1fr] lg:items-center lg:gap-x-10">
      <div className="col-start-1 row-start-1 row-span-2 flex justify-center pt-0.5 lg:col-start-2 lg:row-span-1 lg:pt-0">
        <StepNode nodeRef={nodeRef} lit={lit} active={active} reduced={reduced} bg={bg} />
      </div>

      <motion.div
        style={{ opacity: reduced ? 1 : textOpacity }}
        className={cn(
          "col-start-2 row-start-1",
          flip ? "lg:col-start-3 lg:text-left" : "lg:col-start-1 lg:text-right"
        )}
      >
        <motion.div variants={textVariants} initial="hidden" whileInView="visible" viewport={viewport} className="relative">
          {/* Velké číslo za textem, na vnější straně od osy. */}
          <motion.span
            aria-hidden="true"
            style={{ y: reduced ? 0 : numberY }}
            className={cn(
              "pointer-events-none absolute -top-16 right-0 -z-10 select-none font-cormorant font-light text-[110px] md:text-[150px] leading-none text-white/[0.04]",
              flip ? "lg:right-0" : "lg:left-0 lg:right-auto"
            )}
          >
            {step.number}
          </motion.span>
          <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-3">
            Krok {step.number} <span className="text-[#c9a84c]/50">·</span> {step.tag}
          </p>
          <h3 className="font-cormorant font-light text-[30px] md:text-[38px] leading-[1.1] text-[#f0ece6] mb-3">
            {step.title}
          </h3>
          <p className={cn(
            "font-inter font-normal text-[15px] md:text-[16px] text-text-secondary leading-[1.75] max-w-[440px]",
            !flip && "lg:ml-auto"
          )}>
            {isHome ? step.short : step.detail}
          </p>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity: reduced ? 1 : stageOpacity, scale: reduced ? 1 : stageScale }}
        className={cn(
          "col-start-2 row-start-2 mt-8 lg:row-start-1 lg:mt-0",
          flip ? "lg:col-start-1" : "lg:col-start-3"
        )}
      >
        <motion.div
          variants={stageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className={cn("relative flex", flip ? "lg:justify-end" : "lg:justify-start")}
        >
          <StepStage scene={step.scene} icon={step.icon} label={step.stage} run={run} instant={reduced} />
        </motion.div>
      </motion.div>
    </li>
  );
}

function StepNode({
  nodeRef,
  lit,
  active,
  reduced,
  bg,
}: {
  nodeRef: (el: HTMLDivElement | null) => void;
  lit: MotionValue<number>;
  active: boolean;
  reduced: boolean;
  bg: string;
}) {
  const dotScale = useTransform(lit, [0, 1], [0.4, 1]);

  return (
    <div ref={nodeRef} aria-hidden="true" className="relative h-10 w-10 shrink-0 lg:h-14 lg:w-14">
      <span className={cn("absolute inset-0 rounded-full border border-white/[0.14]", bg)} />
      <motion.span
        style={{ opacity: reduced ? 1 : lit }}
        className="absolute inset-0 rounded-full border-2 border-[#c9a84c] shadow-[0_0_28px_-2px_rgba(201,168,76,0.55),inset_0_0_12px_rgba(201,168,76,0.2)]"
      />
      <motion.span
        style={{ scale: reduced ? 1 : dotScale }}
        className={cn(
          "absolute inset-[31%] rounded-full transition-colors duration-500",
          active ? "bg-[#c9a84c]" : "bg-white/20"
        )}
      />
      {/* Jednorázová vlna ve chvíli, kdy osa uzel dosáhne. */}
      {active && !reduced ? (
        <motion.span
          className="absolute inset-0 rounded-full border border-[#c9a84c]"
          initial={{ scale: 1, opacity: 0.7 }}
          animate={{ scale: 2.2, opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      ) : null}
    </div>
  );
}

function FinishNode({
  nodeRef,
  lit,
  active,
  reduced,
  bg,
}: {
  nodeRef: (el: HTMLDivElement | null) => void;
  lit: MotionValue<number>;
  active: boolean;
  reduced: boolean;
  bg: string;
}) {
  const fillScale = useTransform(lit, [0, 1], [0.5, 1]);

  return (
    <div ref={nodeRef} aria-hidden="true" className="relative h-12 w-12 shrink-0 lg:h-16 lg:w-16">
      <span className={cn("absolute inset-0 rounded-full border border-white/[0.14]", bg)} />
      <motion.span
        style={{ opacity: reduced ? 1 : lit, scale: reduced ? 1 : fillScale }}
        className="absolute inset-0 rounded-full bg-[#c9a84c] shadow-[0_0_50px_-4px_rgba(201,168,76,0.7)]"
      />
      <span className={cn(
        "absolute inset-0 flex items-center justify-center transition-colors duration-500",
        active ? "text-[#080808]" : "text-white/30"
      )}>
        <Check size={20} strokeWidth={2.5} />
      </span>
      {active && !reduced
        ? [0, 1].map((ring) => (
            <motion.span
              key={ring}
              className="absolute inset-0 rounded-full border border-[#c9a84c]"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ scale: 2.8, opacity: 0 }}
              transition={{ duration: 1.4, delay: ring * 0.25, ease: "easeOut" }}
            />
          ))
        : null}
    </div>
  );
}
