"use client";

// Interaktivní scéna "Telefon" pro /automatizace/voice-agenti.
//
// Port z alteno (components/services/ServicePhone.tsx, vznikla 2026-09-16).
// Chování, časování i pořadí fází beze změny; mění se jen vzhled (paleta
// VIZEON, hranatější povrchy, Inter místo mono písma) a to, co nutně
// vyžaduje Tailwind 3 (`transition-[opacity,transform]`,
// `duration-[400ms]`). Analytika jde přes useTrackClick (VIZEON nemá
// globální `track`).
//
// PROČ JE CELÁ V BUDOUCÍM ČASE: služba má `comingSoon: true`. Vyleštěná
// scéna v přítomném čase by z ní udělala hotovou nabídku, i když vedle
// ní visí štítek „Připravujeme" — přesně to, čemu ten příznak má
// bránit. Majitel 2026-09-16 rozhodl variantu (a) z §6 briefu: scéna se
// postaví, ale mluví o tom, jak to BUDE fungovat. Nese to `badge`,
// `idleSay` a texty výsledků v lib/service-demos.ts, ne komponenta —
// takže přepis rámce na přítomný čas je obchodní změna, ne úprava copy.
//
// CO SCÉNA PRODÁVÁ: ne to, že stroj umí mluvit. Prodává, že hovor má
// konec — rozpoznaný záměr, dotažený případ nebo přiznané přepojení,
// a záznam, na který jde navázat. Proto stojí vedle telefonu přepis
// a panel výsledku, a proto třetí hovor agent nedotáhne sám.
//
// ŽÁDNÝ SKUTEČNÝ ZVUK. Křivka je scénář, ne analýza audia. Autoplay se
// zvukem je navíc v prohlížečích blokovaný bez gesta uživatele, takže by
// scéna na většině návštěv stejně jen mlčela.
//
// PRAVIDLA POHYBU (claude.md, sekce 5), stejně jako u zbylých tří scén:
//  • Žádná smyčka na pozadí. Scéna se přehraje jednou, až ji uvidí
//    IntersectionObserver (`disconnect()` po prvním protnutí), pak čeká
//    na kliknutí.
//  • Křivka hlasu a prstenec zvonění běží JEN po dobu repliky, resp.
//    zvonění — gatuje je stav, ne natvrdo zapsaná třída.
//  • Animuje se výhradně `transform` a `opacity`. Sloupečky křivky mají
//    pevnou výšku a mění `scaleY`; animovat `height` by znamenalo
//    šestnáct layoutových přepočtů na snímek.
//  • `prefers-reduced-motion` scénu nezastaví, ale přeskočí: přepis,
//    záměr i výsledek se vykreslí rovnou hotové.
//
// PROČ PAKET NESEDÍ UVNITŘ SCÉNY: vrstva s telefonem má `preserve-3d`
// a rotaci, takže by se souřadnice z `getBoundingClientRect` promítly
// ještě jednou skrz perspektivu a paket by cíl minul. Letí proto
// v neztransformovaném kořeni, nad scénou. Stejná past jako u pilotu.

import { useCallback, useRef, useState } from "react";
import type { DemoIcon, PhoneDemo } from "@/lib/data/automation-demos";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { DEMO_ICONS } from "@/components/automation/demo-icons";
import { usePathname } from "next/navigation";
import { useTrackClick } from "@/hooks/useAnalytics";
import { PersonIcon, PhoneIcon } from "@/components/automation/process-icons";
import {
  useSceneAutoplay,
  useSceneScript,
} from "@/components/automation/useSceneScript";

// Rychlosti na jednom místě, ať se dají ladit bez lovení v těle funkce.
const RING_DWELL_MS = 620;
const ANSWER_MS = 420;
const INTENT_DELAY_MS = 260;
const LINE_GAP_MS = 320;
const RESULT_DELAY_MS = 300;
const AUTOPLAY_DELAY_MS = 420;

/**
 * Výšky sloupečků křivky v pixelech. Pevné pole, ne `Math.random()` —
 * náhoda by při serverovém renderu vyšla jinak než v prohlížeči
 * a hydratace by ohlásila neshodu. Tvar je schválně nesymetrický, aby
 * křivka vypadala jako řeč, ne jako ekvalizér.
 */
const WAVE_BARS = [
  10, 16, 24, 14, 30, 20, 36, 26, 18, 32, 22, 38, 16, 28, 12, 20,
] as const;

/** Klidová výška křivky mimo repliku. Čára, ne tlumená animace. */
const WAVE_IDLE_SCALE = "scaleY(0.18)";

type Phase = "idle" | "ringing" | "answering" | "talking" | "done";

export default function ServicePhone({ demo }: { demo: PhoneDemo }) {
  const reduceMotion = usePrefersReducedMotion();
  const trackClick = useTrackClick(usePathname() ?? "");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  /** Index právě vyslovované repliky. -1 = ještě nikdo nemluvil. */
  const [spoken, setSpoken] = useState(-1);
  const [typed, setTyped] = useState("");
  /**
   * Kdo zrovna mluví. Null i během hovoru — mezi replikami je ticho
   * a křivka se v něm musí uklidnit, jinak by tvrdila, že mluví oba
   * naráz.
   */
  const [speaker, setSpeaker] = useState<"caller" | "agent" | null>(null);
  const [intentShown, setIntentShown] = useState(false);
  const [resultShown, setResultShown] = useState(false);
  const [packetIcon, setPacketIcon] = useState<DemoIcon>("phone");

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const packetRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);
  const pickerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const { after, clearTimers, flyPacket, typeOut } = useSceneScript(
    sceneRef,
    packetRef
  );

  const activeCall = activeIndex === null ? null : demo.calls[activeIndex];

  const isRinging = phase === "ringing";
  const isTalking = phase === "talking";
  /**
   * Hovor právě běží. Ne totéž co „něco je vybráno": po dopsání
   * výsledku hovor skončil a displej to musí dát najevo, jinak scéna
   * zůstane viset ve stavu „mluvíme", i když vedle svítí „hotovo".
   * Shodné s chováním stavového řádku ve scéně chatbota.
   */
  const callLive =
    phase === "ringing" || phase === "answering" || phase === "talking";

  const play = useCallback(
    (index: number) => {
      clearTimers();

      const call = demo.calls[index];
      if (!call) return;

      setActiveIndex(index);
      setTyped("");
      setSpoken(-1);
      setSpeaker(null);
      setIntentShown(false);
      setResultShown(false);
      setPacketIcon("phone");

      // Bez pohybu nemá smysl nic odkrývat postupně — přepis, záměr
      // i výsledek se ukážou rovnou. Informace je stejná, jen se k ní
      // nedochází.
      if (reduceMotion) {
        setPhase("done");
        setSpoken(call.lines.length - 1);
        setTyped(call.lines[call.lines.length - 1]?.text ?? "");
        setIntentShown(true);
        setResultShown(true);
        return;
      }

      // Konec hovoru: záznam odletí z telefonu do panelu výsledku. Je to
      // čtvrtý krok `how` („Zápis a návaznost") ukázaný pohybem — hovor
      // něco zanechá, nezmizí položením sluchátka.
      const finish = () => {
        setSpeaker(null);
        setPacketIcon(call.handoff ? "person" : call.icon);

        after(() => {
          flyPacket(phoneRef.current, resultRef.current, () => {
            setResultShown(true);
            setPhase("done");
          });
        }, RESULT_DELAY_MS);
      };

      // Repliky jdou po sobě, ne najednou: přepis má působit jako živý
      // záznam hovoru. Rekurze přes `after` místo pole časovačů, aby se
      // délka psaní nemusela dopředu odhadovat.
      const speakLine = (lineIndex: number) => {
        const line = call.lines[lineIndex];
        if (!line) {
          finish();
          return;
        }

        setSpoken(lineIndex);
        setSpeaker(line.from);
        setTyped("");

        typeOut(line.text, setTyped, () => {
          setSpeaker(null);

          // Záměr se rozsvítí až po první replice volajícího — tedy
          // v ten moment, kdy by ho poznal i člověk u telefonu. Dřív by
          // scéna tvrdila, že agent ví, o co jde, ještě než to zaznělo.
          if (lineIndex === 0) {
            after(() => setIntentShown(true), INTENT_DELAY_MS);
          }

          after(() => speakLine(lineIndex + 1), LINE_GAP_MS);
        });
      };

      setPhase("ringing");

      // Hovor přiletí z tlačítka do telefonu. Tentýž vzor jako případ
      // vjíždějící do konzole — scény mají působit jako jeden web.
      flyPacket(pickerRefs.current[call.id], phoneRef.current, () => {
        after(() => {
          setPhase("answering");

          after(() => {
            setPhase("talking");
            speakLine(0);
          }, ANSWER_MS);
        }, RING_DWELL_MS);
      });
    },
    [after, clearTimers, demo.calls, flyPacket, reduceMotion, typeOut]
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

  const status = isRinging
    ? demo.labels.ringing
    : phase === "answering"
      ? demo.labels.answering
      : isTalking
        ? demo.labels.talking
        : phase === "done"
          ? "hotovo"
          : "čeká na hovor";

  return (
    <div ref={sceneRef} className="relative pt-8 sm:pt-10">
      {/* Plovoucí štítek. Nese budoucí čas celé scény, viz hlavička. Na
          desktopu visí nad scénou v prostoru (translateZ), na mobilu je
          z něj obyčejný chip v toku — 3D se tam vypíná celé. */}
      <span className="absolute right-0 top-0 z-10 rounded-sm border border-accent/35 bg-[#080808]/85 px-3 py-1.5 font-inter uppercase tracking-[0.1em] text-xs text-accent shadow-[0_18px_40px_-22px_rgba(0,0,0,0.55)] md:[transform:translateZ(96px)_rotate(-1.5deg)]">
        {demo.badge}
      </span>

      <div className="group md:[perspective:1500px] md:[perspective-origin:50%_40%]">
        <div className="relative transition-[transform] duration-500 md:[transform-style:preserve-3d] md:[transform:rotateY(-13deg)_rotateX(5deg)] md:group-hover:[transform:rotateY(-6deg)_rotateX(2.5deg)]">
          {/* Mřížka v pozadí dělá hloubku bez obrázku. Shodná s konzolí,
              chatem i řetězem schválně — čtyři scény mají působit jako
              jeden systém, ne jako čtyři nápady. */}
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

          <div className="relative grid gap-3 md:gap-5 md:[transform-style:preserve-3d] md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]">
            {/* ---------- telefon a výběr hovoru ---------- */}
            {/* `min-w-0` na položce gridu je povinnost, ne opatrnost: bez
                něj si sloupec vynutí min-content šířku podle nejdelšího
                nezalomitelného textu a odsune scénu mimo obrazovku. Na
                desktopu se to neprojeví, na mobilu ano (past z pilotu,
                sluzby-sceny-prompt.md §5). */}
            <div className="flex min-w-0 flex-col gap-3 md:[transform:translateZ(52px)]">
              <div
                ref={phoneRef}
                className="mx-auto w-full max-w-[16rem] rounded-[2rem] border border-accent/30 bg-[#0e0e0e]/95 p-3 shadow-[0_28px_70px_-32px_rgba(201,168,76,0.6)]"
              >
                {/* Sluchátko nahoře. Dekorace, která z karty dělá
                    telefon — proto aria-hidden. */}
                <div
                  aria-hidden
                  className="mx-auto mb-3 h-1 w-12 rounded-full bg-[#3d3830]"
                />

                <div className="rounded-[1.5rem] border border-white/[0.08] bg-[#080808]/70 px-4 py-5">
                  <p
                    className={`text-center font-inter text-xs uppercase tracking-wide transition-colors ${
                      callLive ? "text-accent" : "text-[#8a8070]"
                    }`}
                  >
                    {status}
                  </p>

                  {/* Stav volajícího čísla, nikdy číslo samotné — viz
                      komentář u typu PhoneCall v lib/service-demos.ts. */}
                  <p className="mt-1 text-center text-sm font-medium text-[#f0ece6]">
                    {activeCall ? activeCall.caller : "—"}
                  </p>

                  <div className="relative mx-auto mt-5 grid h-16 w-16 place-items-center">
                    {/* Prstenec zvonění. Běží jen ve fázi „ringing",
                        pak zmizí — gatovaný stavem, ne třídou. */}
                    {isRinging ? (
                      <span
                        aria-hidden
                        className="absolute inset-0 animate-ping rounded-full border border-accent/50"
                      />
                    ) : null}
                    <span
                      aria-hidden
                      className={`relative grid h-16 w-16 place-items-center rounded-full border transition-colors duration-300 ${
                        callLive
                          ? "border-accent/45 bg-accent/10 text-accent"
                          : "border-white/[0.08] bg-[#0e0e0e] text-[#8a8070]"
                      }`}
                    >
                      <PhoneIcon aria-hidden className="h-6 w-6" />
                    </span>
                  </div>

                  {/* Křivka hlasu. Scénář, ne analýza audia (viz
                      hlavička). Barva říká, kdo mluví: tyrkysová agent,
                      zinc volající. Sloupečky mají pevnou výšku a mění
                      jen `scaleY` — animovat `height` by byl layoutový
                      přepočet každý snímek. */}
                  <div
                    aria-hidden
                    className="mt-5 flex h-10 items-center justify-center gap-[3px]"
                  >
                    {WAVE_BARS.map((barHeight, i) => (
                      <span
                        key={i}
                        className={`w-[3px] origin-center rounded-full transition-colors duration-300 ${
                          speaker ? "animate-voice-wave" : ""
                        } ${
                          speaker === "agent"
                            ? "bg-accent"
                            : speaker === "caller"
                              ? "bg-[#8a8070]"
                              : "bg-[#3d3830]"
                        }`}
                        style={{
                          height: `${barHeight}px`,
                          // Bez inline transformu by klidná křivka stála
                          // v plné výšce. Tailwind `scale-y-*` se sem
                          // dát NESMÍ: v Tailwind v4 je to samostatná
                          // vlastnost, která by se s `scaleY` z animace
                          // složila, ne přepsala (claude.md §5).
                          transform: speaker ? undefined : WAVE_IDLE_SCALE,
                          // Posun fáze a různá délka po sloupečcích. Bez
                          // nich by celá křivka skákala v celku.
                          animationDelay: `${(i % 6) * 70}ms`,
                          animationDuration: `${760 + (i % 4) * 90}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="mb-2 font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                  {demo.labels.picker}
                </p>
                {/* Zalamování, ne vodorovný scroll. Třetí hovor je ten,
                    který agent NEDOTÁHNE sám — obchodně nejdůležitější
                    moment scény. Ve scrollovací řadě by ho návštěvník
                    nikdy neviděl (poučení z chatu). */}
                <div className="flex flex-wrap gap-2">
                  {demo.calls.map((call, i) => {
                    const selected = i === activeIndex;
                    const CallIcon = DEMO_ICONS[call.icon];

                    return (
                      <button
                        key={call.id}
                        type="button"
                        ref={(el) => {
                          pickerRefs.current[call.id] = el;
                        }}
                        aria-pressed={selected}
                        onClick={() => {
                          play(i);
                          // Jen klik návštěvníka, ne autoplay první scény.
                          trackClick("demo_scene_played", demo.kind, call.id);
                        }}
                        className={`flex min-w-0 items-center gap-2 rounded-sm border px-3 py-2 text-left transition-colors ${
                          selected
                            ? "border-accent/55 bg-accent/10"
                            : "border-white/[0.08] bg-[#0e0e0e]/85 hover:border-white/[0.12]"
                        }`}
                      >
                        <CallIcon
                          aria-hidden
                          className={`h-4 w-4 shrink-0 ${
                            selected ? "text-accent" : "text-[#6f665a]"
                          }`}
                        />
                        <span className="min-w-0">
                          <span
                            className={`block text-xs font-medium leading-snug ${
                              selected ? "text-[#f0ece6]" : "text-[#8a8070]"
                            }`}
                          >
                            {call.title}
                          </span>
                          <span className="block font-inter uppercase tracking-[0.1em] text-xs leading-snug text-[#8a8070]">
                            {call.note}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* ---------- přepis a výsledek ---------- */}
            <div className="flex min-w-0 flex-col gap-3 md:[transform:translateZ(16px)]">
              {/* Rozpoznaný záměr = druhý krok `how`. Řádek drží výšku
                  i prázdný, aby se scéna při rozsvícení štítku nehýbala. */}
              <div className="flex min-h-[1.75rem] items-center gap-2">
                <p className="font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                  {demo.labels.intent}
                </p>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-sm border border-accent/30 bg-accent/10 px-2 py-1 font-inter uppercase tracking-[0.1em] text-xs text-accent transition-[opacity,transform] duration-300 ${
                    intentShown && activeCall
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0"
                  }`}
                >
                  <DEMO_ICONS.spark aria-hidden className="h-3 w-3 shrink-0" />
                  {activeCall ? activeCall.intent : "—"}
                </span>
              </div>

              <div className="flex min-w-0 flex-1 flex-col rounded-sm border border-white/[0.08] bg-[#0e0e0e]/85 p-4">
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.08] pb-3">
                  <p className="text-sm font-medium text-[#f0ece6]">
                    {demo.labels.transcript}
                  </p>
                  <p className="font-inter uppercase tracking-[0.1em] text-xs text-[#8a8070]">
                    {demo.actor}
                  </p>
                </div>

                {/* `min-h` rezervuje místo dopředu, aby karta při
                    naskakování replik neměnila výšku — layoutová
                    vlastnost se neanimuje (claude.md §5). */}
                <div className="mt-3 flex min-h-[11.5rem] flex-col gap-2.5">
                  {activeCall ? (
                    <>
                      {activeCall.lines.slice(0, spoken + 1).map((line, i) => {
                        const current = i === spoken;
                        const isAgent = line.from === "agent";

                        return (
                          <div
                            key={line.id}
                            className={`max-w-[88%] rounded-sm border px-3.5 py-2.5 text-sm leading-snug text-[#f0ece6] ${
                              isAgent
                                ? "self-start rounded-bl-sm border-accent/40 bg-accent/[0.08]"
                                : "self-end rounded-br-sm border-white/[0.12] bg-[#161616]/80"
                            }`}
                          >
                            <span className="mb-0.5 block font-inter text-xs uppercase tracking-[0.12em] text-[#8a8070]">
                              {isAgent ? demo.actor : "Volající"}
                            </span>
                            {current ? typed : line.text}
                            {current && speaker ? (
                              <span
                                aria-hidden
                                className="ml-0.5 inline-block h-[1.05em] w-[7px] animate-pulse bg-accent align-[-2px]"
                              />
                            ) : null}
                          </div>
                        );
                      })}

                      {/* Přiznané předání člověku. U hovoru, který agent
                          nedotáhne, je to ta nejdůležitější věta scény —
                          bez ní by scéna slibovala linku, co zvládne
                          všechno. */}
                      {activeCall.handoff ? (
                        <span
                          role="status"
                          className={`inline-flex items-center gap-1.5 self-start rounded-sm border border-white/[0.12] bg-[#161616]/70 px-2 py-1 font-inter uppercase tracking-[0.1em] text-xs text-[#8a8070] transition-[opacity,transform] duration-300 ${
                            resultShown
                              ? "translate-y-0 opacity-100"
                              : "translate-y-1 opacity-0"
                          }`}
                        >
                          <PersonIcon
                            aria-hidden
                            className="h-3 w-3 shrink-0 text-accent"
                          />
                          {activeCall.handoff}
                        </span>
                      ) : null}
                    </>
                  ) : (
                    <p className="text-sm leading-relaxed text-[#8a8070]">
                      {demo.idleSay}
                    </p>
                  )}
                </div>
              </div>

              {/* Výsledek = čtvrtý krok `how`. Cíl přeletu na konci
                  hovoru, proto vlastní ref. */}
              <div
                ref={resultRef}
                className={`min-w-0 rounded-sm border p-4 transition-colors duration-300 ${
                  resultShown
                    ? "border-accent/45 bg-accent/[0.06]"
                    : "border-white/[0.08] bg-[#0e0e0e]/85"
                }`}
              >
                <p className="font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                  {demo.labels.result}
                </p>

                <div
                  role="status"
                  className={`transition-[opacity,transform] duration-[400ms] ${
                    resultShown && activeCall
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-0"
                  }`}
                >
                  <p className="mt-2 text-sm font-medium text-[#f0ece6]">
                    {activeCall ? activeCall.result.title : "—"}
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#8a8070]">
                    {activeCall ? activeCall.result.text : ""}
                  </p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {activeCall?.result.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-sm border border-white/[0.08] bg-[#080808]/60 px-2 py-0.5 font-inter uppercase tracking-[0.1em] text-xs text-[#8a8070]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
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
        <PacketIcon aria-hidden className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}
