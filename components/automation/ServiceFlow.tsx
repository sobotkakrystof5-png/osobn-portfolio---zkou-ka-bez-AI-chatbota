"use client";

// Interaktivní scéna "Propojení systémů" pro /automatizace/automatizace-procesu.
//
// Port z alteno (components/services/ServiceFlow.tsx, vznikla 2026-09-16
// jako třetí scéna). Chování, časování i pořadí fází beze změny; mění se
// jen vzhled (paleta VIZEON, hranatější povrchy, Inter místo mono písma)
// a to, co nutně vyžaduje Tailwind 3 (`transition-[opacity,transform]`).
// Analytika jde přes useTrackClick (VIZEON nemá globální `track`).
//
// CO SCÉNA PRODÁVÁ: ne to, že umíme něco spustit — u automatizace to
// návštěvník bere jako samozřejmost. Prodává, že na KRAJÍCH ŘETĚZU STOJÍ
// SYSTÉMY, KTERÉ UŽ MÁ. Jeho e-shop, jeho schránka, jeho účetnictví,
// s vlastními logy. Uprostřed mezi ně přibude naše vrstva a něco tudy
// reálně proteče. Kdyby se mělo z komponenty něco škrtat, rozdíl mezi
// značkovými uzly na krajích a neznačkovými uprostřed je poslední věc,
// co smí zmizet — je to celý argument „nemusíte nic měnit".
//
// PROČ ŘETĚZ A NE SLOUPCE JAKO U KONZOLE: služba má v lib/data/automation-pages.ts
// čtyři kroky, ne tři, a jsou to kroky toku, ne role. Trojice sloupců by
// z toho udělala jinou informaci, než jakou popisuje číslovaný seznam pod
// scénou. `captions` v datech jsou proto doslova `how` z lib/data/automation-pages.ts.
//
// PROČ TU NENÍ LOGO n8n ANI PYTHONU, i když se ve scéně jmenují: jsou to
// `automationTools` (vlastní dílna, čím to stavíme), ne `connectedTools`
// (co propojujeme klientovi). Logo v řetězu integrací by z dílny udělalo
// nabídku integrací — sluzby-sceny-prompt.md §3b, Past 1. Stojí proto
// jako text uvnitř našeho uzlu, vizuálně odlišeného od značkových.
//
// PROČ SE NESTAVĚLO NA FlowDiagram.tsx (komponenta v alteno): ten kreslí
// spojnici přes GSAP ScrollTrigger + MotionPathPlugin a pulzy má na
// `repeat: -1`, tedy v nekonečné smyčce. Obojí je proti pravidlům pohybu
// (claude.md, sekce 5) a `gsap` je navíc identifikovaný zdroj janku, který
// má Session 5 řešit. Zapojený je jen v /design-preview a scénář má
// zadrátovaný přímo v SVG. Třetí paralelní way kreslení spojnice tím
// nevzniká — scéna pokračuje ve vzoru paketu z konzole a chatu.
//
// PRAVIDLA POHYBU (claude.md, sekce 5), stejně jako u obou starších scén:
//  • Žádná smyčka na pozadí. Scéna se přehraje jednou, až ji uvidí
//    IntersectionObserver, pak čeká na kliknutí.
//  • Záře u právě pracujícího uzlu je gatovaná stavem, ne natvrdo třídou.
//  • Animuje se výhradně `transform` (přelet paketu, naplnění spojnice
//    přes `scale`) a `opacity`/`color`. Žádná layoutová vlastnost —
//    spojnice se proto neroztahuje šířkou, ale škáluje.
//  • `prefers-reduced-motion` scénu nezastaví, ale přeskočí: celý řetěz,
//    log i výsledek se vykreslí rovnou hotové.

import { useCallback, useRef, useState } from "react";
import type { DemoIcon, FlowDemo, FlowNode } from "@/lib/data/automation-demos";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { DEMO_ICONS } from "@/components/automation/demo-icons";
import { usePathname } from "next/navigation";
import { useTrackClick } from "@/hooks/useAnalytics";
import { DEMO_TOOLS } from "@/components/automation/demo-tools";
import { PersonIcon } from "@/components/automation/process-icons";
import {
  useSceneAutoplay,
  useSceneScript,
} from "@/components/automation/useSceneScript";

// Rychlosti na jednom místě, ať se dají ladit bez lovení v těle funkce.
const FLIGHT_MS = 460;
const HOP_DWELL_MS = 240;
const START_DELAY_MS = 260;
const RESULT_DELAY_MS = 300;
const AUTOPLAY_DELAY_MS = 420;

/** Uzlů je vždy právě tolik, kolik má `how` kroků. Vynuceno i typem dat. */
const LAST_STEP = 3;

export default function ServiceFlow({ demo }: { demo: FlowDemo }) {
  const reduceMotion = usePrefersReducedMotion();
  const trackClick = useTrackClick(usePathname() ?? "");

  const [activeRun, setActiveRun] = useState<number | null>(null);
  /** Kolik uzlů už řetěz prošel. Řídí uzly, spojnice i řádky logu naráz. */
  const [visibleSteps, setVisibleSteps] = useState(0);
  /** Uzel, ve kterém se právě pracuje. Null, když se nikde nepracuje. */
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [resultShown, setResultShown] = useState(false);
  const [packetIcon, setPacketIcon] = useState<DemoIcon>("document");

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const packetRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);

  const { after, clearTimers, flyPacket } = useSceneScript(sceneRef, packetRef);

  const run = activeRun === null ? null : demo.runs[activeRun];
  const isRunning = activeStep !== null;

  const play = useCallback(
    (index: number) => {
      clearTimers();

      const item = demo.runs[index];
      if (!item) return;

      setActiveRun(index);
      setResultShown(false);

      // Bez pohybu nemá smysl nic odkrývat postupně — řetěz se ukáže
      // rovnou projitý. Informace je stejná, jen se k ní nedochází.
      if (reduceMotion) {
        setVisibleSteps(item.steps.length);
        setActiveStep(null);
        setResultShown(true);
        return;
      }

      // První uzel se rozsvítí hned: vstup na scénu dorazil tím, že si ho
      // návštěvník vybral. Teprve pak se začne putovat.
      setActiveStep(0);
      setVisibleSteps(1);

      // Skok mezi dvěma sousedními uzly. Paket nese glyf toho, co z uzlu
      // odchází, ne toho, kam míří — je to zásilka, ne cedule s adresou.
      const hop = (from: number) => {
        if (from >= LAST_STEP) {
          after(() => {
            setActiveStep(null);
            setResultShown(true);
          }, RESULT_DELAY_MS);
          return;
        }

        setPacketIcon(item.steps[from].log.icon);

        flyPacket(
          nodeRefs.current[from],
          nodeRefs.current[from + 1],
          () => {
            setActiveStep(from + 1);
            setVisibleSteps(from + 2);
            after(() => hop(from + 1), HOP_DWELL_MS);
          },
          { durationMs: FLIGHT_MS }
        );
      };

      after(() => hop(0), START_DELAY_MS);
    },
    [after, clearTimers, demo.runs, flyPacket, reduceMotion]
  );

  const playFirst = useCallback(() => play(0), [play]);

  useSceneAutoplay({
    sceneRef,
    play: playFirst,
    after,
    reduceMotion,
    delayMs: AUTOPLAY_DELAY_MS,
  });

  const PacketIcon = DEMO_ICONS[packetIcon];

  const status = isRunning
    ? "zpracovávám"
    : resultShown
      ? "hotovo"
      : "čeká na vstup";

  /** Uzel je „prošlý" od chvíle, kdy do něj paket dorazil. */
  const reached = (index: number) => index < visibleSteps;

  /** Uzly 2 a 3 (indexy 1 a 2) stojí uvnitř rámu „naše vrstva". */
  const insideOurLayer = (index: number) => index === 1 || index === 2;

  const nodeAt = (index: number) =>
    run ? (
      <FlowNodeCard
        node={run.steps[index].node}
        caption={demo.captions[index]}
        index={index}
        reached={reached(index)}
        active={activeStep === index}
        insideOurLayer={insideOurLayer(index)}
        nodeRef={(el) => {
          nodeRefs.current[index] = el;
        }}
      />
    ) : (
      // Než návštěvník cokoli vybere, drží řetěz tvar podle prvního
      // průběhu. Bez toho by scéna při prvním protnutí poskočila z prázdna
      // do plné mřížky a posunula obsah pod sebou.
      <FlowNodeCard
        node={demo.runs[0].steps[index].node}
        caption={demo.captions[index]}
        index={index}
        reached={false}
        active={false}
        insideOurLayer={insideOurLayer(index)}
        nodeRef={(el) => {
          nodeRefs.current[index] = el;
        }}
      />
    );

  return (
    <div ref={sceneRef} className="relative pt-8 sm:pt-10">
      {/* Plovoucí štítek. Na desktopu visí nad scénou v prostoru
          (translateZ), na mobilu je z něj obyčejný chip v toku — 3D se
          tam vypíná celé, viz níž. */}
      <span className="absolute right-0 top-0 z-10 rounded-sm border border-accent/35 bg-[#080808]/85 px-3 py-1.5 font-inter uppercase tracking-[0.1em] text-xs text-accent shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)] md:[transform:translateZ(96px)_rotate(-1.5deg)]">
        {demo.badge}
      </span>

      <div className="group md:[perspective:1500px] md:[perspective-origin:50%_40%]">
        <div className="relative transition-[transform] duration-500 md:[transform-style:preserve-3d] md:[transform:rotateY(-13deg)_rotateX(5deg)] md:group-hover:[transform:rotateY(-6deg)_rotateX(2.5deg)]">
          {/* Mřížka v pozadí dělá hloubku bez obrázku. Maska ji nechá
              zmizet k okrajům, aby nekončila useknutou hranou. Shodná
              s konzolí a chatem schválně — scény mají působit jako jeden
              web, ne jako tři nápady. */}
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-3 -inset-y-6 hidden rounded-sm md:block md:[transform:translateZ(-90px)]"
            style={{
              backgroundImage:
                "linear-gradient(to right, rgba(184,176,162,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(184,176,162,0.05) 1px, transparent 1px)",
              backgroundSize: "34px 34px",
              // Maska pracuje s alfa kanálem, ne s barvou — krycí stop se
              // nikdy nevykreslí a není to prvek palety.
              maskImage:
                "radial-gradient(70% 70% at 50% 45%, rgba(0,0,0,1) 30%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(70% 70% at 50% 45%, rgba(0,0,0,1) 30%, transparent 100%)",
            }}
          />

          <div className="relative flex flex-col gap-4 md:gap-5 md:[transform-style:preserve-3d]">
            {/* ---------- výběr vstupu ---------- */}
            {/* Zalamování, ne vodorovný scroll. Ve scrollovací řadě byl
                u chatu třetí případ schovaný za okrajem a návštěvník ho
                nikdy neviděl — tady je třetí průběh ten, který končí
                u člověka, tedy obchodně nejdůležitější. */}
            <div className="min-w-0">
              <p className="mb-2 font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                {demo.labels.picker}
              </p>
              <div className="flex flex-wrap gap-2">
                {demo.runs.map((item, i) => {
                  const Icon = DEMO_ICONS[item.icon];
                  const selected = i === activeRun;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        play(i);
                        // Jen klik návštěvníka, ne autoplay první scény.
                        trackClick("demo_scene_played", demo.kind, item.id);
                      }}
                      className={`flex min-w-0 items-start gap-2.5 rounded-sm border p-3 text-left text-sm leading-snug transition-colors ${
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
                      <span className="min-w-0">
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

            {/* ---------- řetěz ---------- */}
            {/* `min-w-0` na položkách řetězu: uvnitř jsou nezalomitelné
                názvy značek a bez něj si sloupec vynutí min-content šířku
                a odsune celou scénu mimo obrazovku. Na desktopu se to
                neprojeví, na mobilu ano (past z pilotu, §5 briefu). */}
            <div className="flex min-w-0 flex-col md:flex-row md:items-stretch">
              {nodeAt(0)}

              <FlowLink filled={visibleSteps > 1} />

              {/* Uzly, které staví ALTENO, jsou schválně v jednom rámu
                  a bez značky. Řetěz tím říká „vaše systémy zůstávají,
                  mezi ně přijde tohle". Bez toho rámu je to jen čtyři
                  krabičky vedle sebe a argument se ztratí. */}
              <div className="relative min-w-0 rounded-sm border border-dashed border-accent/35 bg-accent/[0.04] p-3 pt-5 md:flex-[2.1] md:[transform:translateZ(38px)]">
                <span className="absolute left-3 top-0 -translate-y-1/2 rounded-sm border border-accent/35 bg-[#080808] px-2 py-0.5 font-inter text-xs uppercase tracking-[0.15em] text-accent">
                  {demo.labels.ours}
                </span>
                <div className="flex min-w-0 flex-col md:flex-row md:items-stretch">
                  {nodeAt(1)}
                  <FlowLink filled={visibleSteps > 2} />
                  {nodeAt(2)}
                </div>
              </div>

              <FlowLink filled={visibleSteps > 3} />

              {nodeAt(3)}
            </div>

            {/* ---------- log a výsledek ---------- */}
            <div className="grid min-w-0 gap-3 md:grid-cols-2 md:gap-5">
              <div className="min-w-0">
                {/* Stav stojí hned za popiskem, ne u pravého okraje
                    sloupce. U okraje seděl těsně vedle popisku sousedního
                    panelu a obojí se četlo jako jeden řádek. */}
                <p className="mb-2 flex items-baseline gap-2 font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                  {demo.labels.log}
                  <span
                    className={`transition-colors ${
                      isRunning ? "text-accent" : "text-[#8a8070]"
                    }`}
                  >
                    · {status}
                  </span>
                </p>

                {/* `min-h` rezervuje místo dopředu, aby panel při
                    odkrývání řádků neměnil výšku — výška je layoutová
                    vlastnost a ta se neanimuje (claude.md, sekce 5). */}
                <ul className="flex min-h-[7.5rem] flex-col gap-1.5 rounded-sm border border-white/[0.08] bg-[#0e0e0e]/85 p-3.5">
                  {(run ?? demo.runs[0]).steps.map((step, i) => {
                    const StepIcon = DEMO_ICONS[step.log.icon];
                    const shown = run !== null && reached(i);

                    return (
                      <li
                        key={step.id}
                        className={`flex items-start gap-2.5 font-inter uppercase tracking-[0.1em] text-xs transition-[opacity,transform] duration-300 ${
                          shown
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }`}
                      >
                        {/* `items-start` + odsazení glyfu: delší řádek se
                            na užší šířce zalomí a při centrování by popisek
                            nástroje plaval proti dvěma řádkům textu. */}
                        <StepIcon
                          aria-hidden
                          className="mt-[3px] h-[13px] w-[13px] shrink-0 text-accent"
                        />
                        <span className="shrink-0 text-[#b8b0a2]">
                          {step.log.tool}
                        </span>
                        <span className="min-w-0 text-[#8a8070]">
                          {step.log.text}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="flex min-w-0 flex-col">
                <p className="mb-2 font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                  {demo.labels.result}
                </p>
                <div className="flex flex-1 flex-col gap-2.5 rounded-sm border border-white/[0.08] bg-[#0e0e0e]/85 p-3.5 md:[transform:translateZ(16px)]">
                  {run ? (
                    <div
                      role="status"
                      className={`flex flex-1 flex-col gap-2.5 transition-[opacity,transform] duration-500 ${
                        resultShown
                          ? "translate-y-0 opacity-100"
                          : "translate-y-2 opacity-0"
                      }`}
                    >
                      <p className="text-base font-medium leading-snug text-[#f0ece6]">
                        {run.result.title}
                      </p>
                      <p className="text-sm leading-relaxed text-[#8a8070]">
                        {run.result.text}
                      </p>

                      {/* Přiznané předání člověku. Stejná role jako
                          `handoff` u chatu a případ „Dotaz mimo pravidla"
                          u konzole — bez něj řetěz slibuje automatizaci,
                          která zvládne všechno sama. */}
                      {run.handoff ? (
                        <span className="inline-flex items-start gap-1.5 rounded-sm border border-white/[0.12] bg-[#161616]/70 px-2 py-1 font-inter uppercase tracking-[0.1em] text-xs leading-snug text-[#8a8070]">
                          <PersonIcon
                            aria-hidden
                            className="mt-px h-3 w-3 shrink-0 text-accent"
                          />
                          {run.handoff}
                        </span>
                      ) : null}

                      <div className="mt-auto flex flex-wrap gap-1.5 pt-1">
                        {run.result.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-sm border border-accent/25 bg-accent/10 px-1.5 py-0.5 font-inter uppercase tracking-[0.1em] text-xs text-accent"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm leading-relaxed text-[#8a8070]">
                      {demo.idleSay}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Paket letí v kořeni scény, mimo 3D vrstvu — jinak by se souřadnice
          z `getBoundingClientRect` promítly ještě jednou skrz perspektivu
          a paket by uzel minul. Viz hlavička useSceneScript.ts. */}
      <div
        ref={packetRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-20 grid h-[26px] w-[26px] place-items-center rounded-sm border border-accent/60 bg-accent/15 text-accent opacity-0 [will-change:transform]"
      >
        <PacketIcon aria-hidden className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

/**
 * Spojnice mezi dvěma uzly. Na mobilu svislá, na desktopu vodorovná.
 *
 * Naplnění jede přes `scale`, ne přes šířku: šířka je layoutová vlastnost
 * a přepočítávala by se každý snímek na hlavním vlákně. Osa se přepíná
 * podle breakpointu — svisle `scale-y`, vodorovně `scale-x`, druhá osa
 * zůstává na 1.
 */
function FlowLink({ filled }: { filled: boolean }) {
  return (
    <span
      aria-hidden
      className="relative mx-auto my-1 block h-5 w-px shrink-0 self-center overflow-hidden bg-[#161616] md:mx-0 md:my-0 md:h-px md:w-10"
    >
      <span
        className={`absolute inset-0 block origin-top bg-accent transition-transform duration-500 md:origin-left ${
          filled
            ? "scale-y-100 md:scale-x-100"
            : "scale-y-0 md:scale-y-100 md:scale-x-0"
        }`}
      />
    </span>
  );
}

/**
 * Barva uzlu podle toho, čí je.
 *
 * TOHLE JE TO MÍSTO, KDE SCÉNA DRŽÍ PALETU (claude.md, sekce 5:
 * „accent se nesmí použít plošně/dekorativně"). První verze
 * rozsvěcela tyrkysově všechny čtyři uzly a po dojetí řetězu byla celá
 * scéna jednobarevná — akcent tím přestal cokoli znamenat.
 *
 * Teď je tyrkysová vyhrazená NAŠÍ VRSTVĚ. Systémy zákazníka zůstávají
 * v zinkové škále a průchod na nich pozná po zesvětlení. Není to jen
 * úklid barev: řetěz tím říká „vaše systémy zůstávají, jak jsou, tyrkysové
 * je jen to, co mezi ně přidáme" — a to je argument téhle služby.
 *
 * Ve VIZEON platí totéž se zlatou (`accent`) místo tyrkysové a teplou
 * šedou místo zinkové škály.
 */
function nodeTone(node: FlowNode, reached: boolean) {
  if (node.kind === "core") {
    return reached
      ? "border-accent/55 bg-accent/[0.07]"
      : "border-white/[0.08] bg-[#0e0e0e]/85";
  }

  return reached
    ? "border-white/[0.12] bg-[#161616]/70"
    : "border-white/[0.08] bg-[#0e0e0e]/85";
}

/**
 * Jeden uzel řetězu.
 *
 * Dva tvary a ten rozdíl je celé sdělení scény: `tool` je systém
 * zákazníka (oficiální logo značky), `core` je vrstva, kterou staví
 * ALTENO (vlastní glyf, žádná značka). Vizuálně se nesmí srovnat.
 */
function FlowNodeCard({
  node,
  caption,
  index,
  reached,
  active,
  insideOurLayer,
  nodeRef,
}: {
  node: FlowNode;
  caption: string;
  index: number;
  reached: boolean;
  active: boolean;
  /**
   * Uzly uvnitř rámu „naše vrstva" jsou odsazené jeho vnitřním okrajem.
   * Uzly mimo něj si stejné odsazení musí přidat samy, jinak by popisky
   * kroků seděly na třech různých výškách a řetěz by působil rozsypaně.
   */
  insideOurLayer: boolean;
  nodeRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      className={`flex min-w-0 flex-col md:flex-1 ${
        insideOurLayer ? "" : "md:pt-5"
      }`}
    >
      {/* Číslo kroku váže uzel na číslovaný seznam „Jak to funguje" pod
          scénou. Scéna ukazuje tok obrazem, seznam ho popisuje slovy —
          bez čísla by si je návštěvník musel spárovat sám. */}
      <p className="mb-1.5 flex items-baseline gap-1.5 font-inter text-xs uppercase tracking-[0.15em] md:min-h-[2.8rem]">
        <span
          className={`shrink-0 transition-colors ${
            reached ? "text-accent" : "text-[#8a8070]"
          }`}
        >
          {index + 1}
        </span>
        <span className="min-w-0 text-[#8a8070]">{caption}</span>
      </p>

      <div
        ref={nodeRef}
        className={`relative flex min-w-0 flex-1 items-center gap-3 rounded-sm border px-3 py-2.5 text-left transition-colors duration-300 md:flex-col md:justify-center md:gap-2 md:p-3 md:text-center ${
          nodeTone(node, reached)
        }`}
      >
        {/* Záře jen po dobu, kdy se v uzlu opravdu pracuje. Gatovaná
            stavem, ne natvrdo třídou — nic tu nepulzuje na pozadí. */}
        <span
          aria-hidden
          className={`pointer-events-none absolute -inset-1 rounded-sm bg-[radial-gradient(circle,rgba(201,168,76,0.22),transparent_70%)] transition-opacity duration-500 ${
            active ? "opacity-100" : "opacity-0"
          }`}
        />

        {node.kind === "tool" ? (
          <ToolMarks tools={node.tools} reached={reached} />
        ) : (
          <CoreMark icon={node.icon} label={node.label} />
        )}
      </div>
    </div>
  );
}

/**
 * Loga systémů zákazníka. Jen oficiální tvary z `simple-icons`, případně
 * z FA brands — nikdy kreslená náhrada (claude.md, „Vytvářet fiktivní
 * loga…"). Nástroj, který v DEMO_TOOLS není, se prostě nevykreslí; radši
 * chybějící logo než podstrčená cizí značka.
 */
function ToolMarks({ tools, reached }: { tools: string[]; reached: boolean }) {
  const marks = tools
    .map((slug) => DEMO_TOOLS[slug])
    .filter((tool) => Boolean(tool));

  return (
    <>
      <span className="relative flex items-center gap-2.5">
        {marks.map((tool) => (
          <svg
            key={tool.name}
            viewBox={tool.viewBox ?? "0 0 24 24"}
            aria-hidden
            className={`h-5 w-5 shrink-0 transition-colors ${
              reached ? "fill-[#e0dbd2]" : "fill-[#6f665a]"
            }`}
          >
            <path d={tool.path} />
          </svg>
        ))}
      </span>
      <span className="relative min-w-0 text-xs font-medium leading-tight text-[#f0ece6]">
        {marks.map((tool) => tool.name).join(" + ")}
      </span>
    </>
  );
}

/** Naše vrstva. Vlastní glyf, žádná značka — viz hlavička souboru. */
function CoreMark({ icon, label }: { icon: DemoIcon; label: string }) {
  const Icon = DEMO_ICONS[icon];

  return (
    <>
      <span className="relative grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10">
        <Icon aria-hidden className="h-4 w-4 text-accent" />
      </span>
      <span className="relative min-w-0 text-xs font-medium leading-tight text-[#f0ece6]">
        {label}
      </span>
    </>
  );
}
