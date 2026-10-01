"use client";

// Interaktivní scéna "Provoz" pro /automatizace/ai-agenti.
//
// Port z alteno (components/services/ServiceConsole.tsx). Chování,
// časování i pořadí fází beze změny; mění se jen vzhled (paleta VIZEON,
// hranatější povrchy, Inter místo mono písma) a to, co nutně vyžaduje
// Tailwind 3 (`transition-[opacity,transform]`). Analytika jde přes
// useTrackClick (VIZEON nemá globální `track`).
//
// Vznikla 2026-09-15. Majitel vybral tenhle směr z návrhu tří variant:
// služba se nemá popisovat textem, má se ukázat v chodu. Konzole stojí
// v perspektivě, případ z levé fronty vletí do jádra, jádro nahlas řekne,
// co s ním dělá, a vpravo vypadne hotová akce.
//
// PROČ JE TO KLIENTSKÁ KOMPONENTA A ZBYTEK STRÁNKY NE: interakce je celý
// smysl scény, ale text okolo (H1, sekce, JSON-LD) zůstává serverový.
// Komponenta je ostrůvek, ne převod celé stránky na klienta — indexace
// obsahu se tím nemění.
//
// PRAVIDLA POHYBU (claude.md, sekce 5) jsou tady dodržená takto:
//  • Žádná smyčka na pozadí. Scéna se jednou přehraje, až ji uvidí
//    IntersectionObserver (`disconnect()` hned po prvním protnutí, stejný
//    vzor jako count-up v StatsBar), pak stojí a čeká na kliknutí.
//  • Rotující oblouk v jádře a blikající kurzor běží JEN po dobu
//    zpracování, ne trvale — třída se přidává podle stavu, ne natvrdo.
//  • Animují se výhradně `transform`/`translate` a `opacity`. Žádná
//    layoutová vlastnost, takže se nic nepočítá na hlavním vlákně.
//  • `prefers-reduced-motion` scénu nezastaví, ale přeskočí: případ se
//    rovnou vykreslí dokončený. Do bloku v globals.css nic nepřibývá —
//    obě animace jsou gatované v JS a bez pohybu se vůbec nevykreslí.
//
// PROČ PAKET NESEDÍ UVNITŘ KONZOLE: `.machine` má `preserve-3d`
// a rotaci, takže by se souřadnice spočítané z `getBoundingClientRect`
// promítly ještě jednou skrz perspektivu a paket by jádro minul. Letí
// proto v neztransformovaném kořeni scény, nad konzolí.

import { useCallback, useRef, useState } from "react";
import type { ConsoleDemo } from "@/lib/data/automation-demos";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
// Mapa se 2026-09-16 přestěhovala do sdíleného souboru — druhá scéna
// (ServiceChat) potřebuje tytéž glyfy a dvě kopie by se rozešly.
import { DEMO_ICONS } from "@/components/automation/demo-icons";
import { usePathname } from "next/navigation";
import { useTrackClick } from "@/hooks/useAnalytics";
// Časovače, přelet paketu, vypisování textu a jednorázové spuštění se
// 2026-09-16 přestěhovaly do sdílené kostry (třetí scéna, řetěz). Konzole
// z nich odešla beze změny chování — liší se jen tím, že paket vyletí
// z pravé hrany tlačítka, ne z jeho středu.
import {
  useSceneAutoplay,
  useSceneScript,
} from "@/components/automation/useSceneScript";

// Rychlosti na jednom místě, ať se dají ladit bez lovení v těle funkce.
const FLIGHT_MS = 620;
const STEP_GAP_MS = 260;
const AUTOPLAY_DELAY_MS = 420;

type Phase = "idle" | "working" | "done";

export default function ServiceConsole({ demo }: { demo: ConsoleDemo }) {
  const reduceMotion = usePrefersReducedMotion();
  const trackClick = useTrackClick(usePathname() ?? "");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  const [visibleSteps, setVisibleSteps] = useState(0);
  const [resultShown, setResultShown] = useState(false);

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const packetRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const caseRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const { after, clearTimers, flyPacket, typeOut } = useSceneScript(
    sceneRef,
    packetRef
  );

  const activeCase = activeIndex === null ? null : demo.cases[activeIndex];
  const isWorking = phase === "working";

  const play = useCallback(
    (index: number) => {
      clearTimers();

      const item = demo.cases[index];
      if (!item) return;

      setActiveIndex(index);
      setVisibleSteps(0);
      setResultShown(false);

      // Bez pohybu nemá smysl nic odkrývat postupně — případ se ukáže
      // rovnou hotový. Informace je stejná, jen se k ní nedochází.
      if (reduceMotion) {
        setPhase("done");
        setTyped(item.say);
        setVisibleSteps(item.steps.length);
        setResultShown(true);
        return;
      }

      setPhase("working");
      setTyped("");

      // Paket vyletí z pravé hrany tlačítka ve frontě — vypadá to, že
      // případ z fronty odchází, ne že se rodí uprostřed dlaždice.
      flyPacket(
        caseRefs.current[index],
        ringRef.current,
        () => {
          typeOut(item.say, setTyped, () => {
            item.steps.forEach((_, i) => {
              after(() => setVisibleSteps(i + 1), STEP_GAP_MS * i);
            });

            after(() => {
              setResultShown(true);
              setPhase("done");
            }, STEP_GAP_MS * item.steps.length + STEP_GAP_MS);
          });
        },
        { durationMs: FLIGHT_MS, fromAnchor: "right" }
      );
    },
    [after, clearTimers, demo.cases, flyPacket, reduceMotion, typeOut]
  );

  const playFirst = useCallback(() => play(0), [play]);

  useSceneAutoplay({
    sceneRef,
    play: playFirst,
    after,
    reduceMotion,
    delayMs: AUTOPLAY_DELAY_MS,
  });

  const ActiveIcon = activeCase ? DEMO_ICONS[activeCase.icon] : null;

  return (
    <div ref={sceneRef} className="relative pt-8 sm:pt-10">
      {/* Plovoucí štítek. Na desktopu visí nad konzolí v prostoru
          (translateZ), na mobilu je z něj obyčejný chip v toku — 3D se
          tam vypíná celé, viz níž. */}
      <span className="absolute right-0 top-0 z-10 rounded-sm border border-accent/35 bg-[#080808]/85 px-3 py-1.5 font-inter uppercase tracking-[0.1em] text-xs text-accent shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)] md:[transform:translateZ(96px)_rotate(-1.5deg)]">
        {demo.badge}
      </span>

      <div className="group md:[perspective:1500px] md:[perspective-origin:50%_40%]">
        <div className="relative transition-[transform] duration-500 md:[transform-style:preserve-3d] md:[transform:rotateY(-13deg)_rotateX(5deg)] md:group-hover:[transform:rotateY(-6deg)_rotateX(2.5deg)]">
          {/* Mřížka v pozadí dělá hloubku bez obrázku. Maska ji nechá
              zmizet k okrajům, aby nekončila useknutou hranou. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-3 -inset-y-6 hidden rounded-sm md:block md:[transform:translateZ(-90px)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(184,176,162,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(184,176,162,0.05) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
              // Maska pracuje s alfa kanálem, ne s barvou — krycí stop se
              // nikdy nevykreslí a není to prvek palety. Zapsaný přes rgba
              // právě proto, aby bylo z kódu vidět, že jde o krytí, a aby
              // se to nepletlo s barvou z DESIGN.md.
              maskImage:
                "radial-gradient(70% 70% at 50% 45%, rgba(0,0,0,1) 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(70% 70% at 50% 45%, rgba(0,0,0,1) 30%, transparent 100%)",
            }}
          />

          <div className="relative grid gap-3 md:gap-5 md:[transform-style:preserve-3d] md:grid-cols-[minmax(0,0.92fr)_minmax(0,1.18fr)_minmax(0,0.92fr)]">
            {/* ---------- vstup: fronta případů ---------- */}
            <div className="min-w-0">
              <p className="mb-2.5 font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                {demo.labels.input}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-1 md:flex-col md:overflow-visible md:pb-0">
                {demo.cases.map((item, i) => {
                  const Icon = DEMO_ICONS[item.icon];
                  const selected = i === activeIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      ref={(el) => {
                        caseRefs.current[i] = el;
                      }}
                      aria-pressed={selected}
                      onClick={() => {
                        play(i);
                        // Jen klik návštěvníka, ne autoplay první scény.
                        trackClick("demo_scene_played", demo.kind, item.id);
                      }}
                      className={`flex min-w-[11rem] shrink-0 items-start gap-2.5 rounded-sm border p-3 text-left text-sm leading-snug transition-colors md:min-w-0 ${
                        selected
                          ? "border-accent/55 bg-accent/10"
                          : "border-white/[0.08] bg-[#0e0e0e]/85 hover:border-white/[0.12]"
                      }`}
                    >
                      <Icon
                        aria-hidden
                        className={`mt-0.5 h-[17px] w-[17px] shrink-0 transition-colors ${
                          selected ? "text-accent" : "text-[#6f665a]"
                        }`}
                      />
                      <span>
                        <span className="block font-medium text-[#f0ece6]">
                          {item.title}
                        </span>
                        <span className="text-xs text-[#8a8070]">
                          {item.note}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---------- jádro, které mluví ---------- */}
            <div className="flex min-w-0 flex-col md:[transform:translateZ(46px)]">
              <div className="flex flex-1 flex-col gap-3.5 rounded-sm border border-accent/30 bg-[#0e0e0e]/95 p-4 shadow-[0_24px_60px_-30px_rgba(201,168,76,0.55)]">
                <div className="flex items-center gap-2.5">
                  <div ref={ringRef} className="relative h-[38px] w-[38px] shrink-0">
                    <span
                      aria-hidden
                      className={`absolute -inset-2 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.34),transparent_68%)] transition-opacity duration-500 ${
                        isWorking ? "opacity-100" : "opacity-0"
                      }`}
                    />
                    <svg
                      viewBox="0 0 40 40"
                      fill="none"
                      aria-hidden
                      className="relative h-full w-full"
                    >
                      <circle cx="20" cy="20" r="15" stroke="#161616" strokeWidth="2" />
                      <g
                        className={isWorking ? "animate-spin" : undefined}
                        style={{ transformOrigin: "center", transformBox: "fill-box" }}
                      >
                        <circle
                          cx="20"
                          cy="20"
                          r="15"
                          stroke="#c9a84c"
                          strokeWidth="2"
                          strokeDasharray="26 68"
                          strokeLinecap="round"
                          opacity={isWorking ? 1 : 0.35}
                        />
                      </g>
                      <path
                        d="M20 13.2 26 16.6v6.8L20 26.8 14 23.4v-6.8z"
                        stroke="#c9a84c"
                        strokeWidth="1.6"
                      />
                      <circle cx="20" cy="20" r="2.4" fill="#c9a84c" />
                    </svg>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-[#f0ece6]">{demo.actor}</p>
                    <p
                      className={`font-inter text-xs uppercase tracking-wide ${
                        isWorking ? "text-accent" : "text-[#8a8070]"
                      }`}
                    >
                      {phase === "idle"
                        ? "čeká na případ"
                        : isWorking
                          ? "zpracovávám"
                          : "hotovo"}
                    </p>
                  </div>
                </div>

                {/* Replika stroje. Schválně bez aria-live: vypisování po
                    znacích by odečítač zahltilo. Hotovou větu si uživatel
                    přečte normální navigací, výsledek níž hlásí role. */}
                <p className="min-h-[3.2em] border-l-2 border-accent/50 pl-3 text-base leading-snug text-[#f0ece6]">
                  {activeCase ? typed : demo.idleSay}
                  {isWorking ? (
                    <span
                      aria-hidden
                      className="ml-0.5 inline-block h-[1.05em] w-[7px] animate-pulse bg-accent align-[-2px]"
                    />
                  ) : null}
                </p>

                <ul className="mt-auto flex flex-col gap-1.5">
                  {activeCase?.steps.map((step, i) => {
                    const StepIcon = DEMO_ICONS[step.icon];
                    const shown = i < visibleSteps;

                    return (
                      <li
                        key={`${activeCase.id}-${step.tool}-${i}`}
                        className={`flex items-center gap-2.5 font-inter uppercase tracking-[0.1em] text-xs transition-[opacity,transform] duration-300 ${
                          shown
                            ? "translate-y-0 text-[#8a8070] opacity-100"
                            : "translate-y-1 text-[#8a8070] opacity-0"
                        }`}
                      >
                        <StepIcon
                          aria-hidden
                          className="h-[13px] w-[13px] shrink-0 text-accent"
                        />
                        <span className="text-[#b8b0a2]">{step.tool}</span>
                        <span>{step.text}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>

            {/* ---------- výstup ---------- */}
            <div className="flex min-w-0 flex-col">
              <p className="mb-2.5 font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                {demo.labels.output}
              </p>
              <div className="flex flex-1 flex-col gap-2.5 rounded-sm border border-white/[0.08] bg-[#0e0e0e]/85 p-3.5 md:[transform:translateZ(18px)]">
                <p className="font-inter text-xs uppercase tracking-[0.14em] text-[#8a8070]">
                  Výsledek
                </p>
                <div
                  role="status"
                  className={`flex flex-1 flex-col gap-2.5 transition-[opacity,transform] duration-500 ${
                    resultShown ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                  }`}
                >
                  {activeCase ? (
                    <>
                      <p className="text-base font-medium leading-snug text-[#f0ece6]">
                        {activeCase.result.title}
                      </p>
                      <p className="text-sm leading-relaxed text-[#8a8070]">
                        {activeCase.result.text}
                      </p>
                      <div className="mt-auto flex flex-wrap gap-1.5">
                        {activeCase.result.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-accent/25 bg-accent/10 px-1.5 py-0.5 font-inter uppercase tracking-[0.1em] text-xs text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
                {activeCase ? null : (
                  <p className="text-sm text-[#8a8070]">zatím nic</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paket letí v kořeni scény, mimo 3D vrstvu — viz hlavička. */}
      <div
        ref={packetRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 grid h-[26px] w-[26px] place-items-center rounded-sm border border-accent/60 bg-accent/15 text-accent opacity-0 [will-change:transform]"
      >
        {ActiveIcon ? <ActiveIcon aria-hidden className="h-3.5 w-3.5" /> : null}
      </div>
    </div>
  );
}
