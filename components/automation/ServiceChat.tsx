"use client";

// Interaktivní scéna "Odpověď se zdrojem" pro /automatizace/chatboti-rag.
//
// Port z alteno (components/services/ServiceChat.tsx, vznikla 2026-09-16
// jako druhá scéna po pilotu ServiceConsole). Chování, časování i pořadí
// fází beze změny; mění se jen vzhled (paleta VIZEON, hranatější povrchy,
// Inter místo mono písma) a to, co nutně vyžaduje Tailwind 3
// (`transition-[opacity,transform]`, `duration-[400ms]`). Analytika jde
// přes useTrackClick (VIZEON nemá globální `track`).
//
// CO SCÉNA PRODÁVÁ: ne to, že chatbot umí odpovědět — to umí kdokoli
// a návštěvník to zná z ChatGPT. Prodává, že je VIDĚT, ze kterého
// podkladu odpověď vznikla. Proto stojí widget vedle panelu znalostní
// báze, proto se při odpovědi rozsvítí právě jeden podklad se
// zvýrazněnou pasáží a proto pod odpovědí visí citace zdroje. Kdyby se
// měl z komponenty něco škrtat, tohle je poslední věc, co smí zmizet.
//
// PROČ JE PODKLADEM ZNALOSTNÍ BÁZE A NE WEB KLIENTA: brief mluví
// o „konkrétním podkladu" pod widgetem, ale zároveň zakazuje vymyšlený
// web smyšlené firmy s vymyšleným logem (claude.md, „Co se nikdy
// nedělá"). Drátěný model cizí stránky by navíc byl kulisa bez sdělení.
// Panel podkladů je oboje: je to konkrétní pozadí a zároveň je to přesně
// to, čím se RAG liší. Dokumenty v něm jsou modelové a obecné (obchodní
// podmínky, expedice, manuál), žádná značka.
//
// PRAVIDLA POHYBU (claude.md, sekce 5), stejně jako u konzole:
//  • Žádná smyčka na pozadí. Scéna se přehraje jednou, až ji uvidí
//    IntersectionObserver (`disconnect()` po prvním protnutí), pak čeká
//    na kliknutí.
//  • Tři tečky „píše" a blikající kurzor běží JEN po dobu hledání
//    a psaní, ne trvale — gatuje je stav, ne natvrdo zapsaná třída.
//  • Animuje se výhradně `transform` a `opacity`, plus `color`
//    u zvýraznění pasáže. Žádná layoutová vlastnost.
//  • `prefers-reduced-motion` scénu nezastaví, ale přeskočí: odpověď,
//    rozsvícený podklad i citace se vykreslí rovnou hotové.
//
// PROČ PAKET NESEDÍ UVNITŘ SCÉNY: vrstva s widgetem má `preserve-3d`
// a rotaci, takže by se souřadnice z `getBoundingClientRect` promítly
// ještě jednou skrz perspektivu a paket by cíl minul. Letí proto
// v neztransformovaném kořeni, nad scénou. Stejná past jako u pilotu.

import { useCallback, useRef, useState } from "react";
import type { ChatDemo, DemoIcon } from "@/lib/data/automation-demos";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { DEMO_ICONS } from "@/components/automation/demo-icons";
import { usePathname } from "next/navigation";
import { useTrackClick } from "@/hooks/useAnalytics";
import { PersonIcon, SendIcon } from "@/components/automation/process-icons";
// Časovače, přelet paketu, vypisování textu a jednorázové spuštění se
// 2026-09-16 přestěhovaly do sdílené kostry (třetí scéna, řetěz). Chat
// z nich odešel beze změny chování.
import {
  useSceneAutoplay,
  useSceneScript,
} from "@/components/automation/useSceneScript";

// Rychlosti na jednom místě, ať se dají ladit bez lovení v těle funkce.
const ASK_DELAY_MS = 300;
const SEARCH_DWELL_MS = 460;
const CITE_DELAY_MS = 240;
const AUTOPLAY_DELAY_MS = 420;

type Phase = "idle" | "asking" | "searching" | "answering" | "done";

export default function ServiceChat({ demo }: { demo: ChatDemo }) {
  const reduceMotion = usePrefersReducedMotion();
  const trackClick = useTrackClick(usePathname() ?? "");

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState("");
  /** Podklad, ve kterém se odpověď našla. Null i tehdy, když se nenašlo nic. */
  const [litId, setLitId] = useState<string | null>(null);
  /** Hledání doběhlo bez nálezu. Vlastní stav, ne jen `litId === null`. */
  const [missed, setMissed] = useState(false);
  const [citeShown, setCiteShown] = useState(false);
  const [packetIcon, setPacketIcon] = useState<DemoIcon>("search");

  const sceneRef = useRef<HTMLDivElement | null>(null);
  const packetRef = useRef<HTMLDivElement | null>(null);
  const askRef = useRef<HTMLDivElement | null>(null);
  const replyRef = useRef<HTMLDivElement | null>(null);
  const baseRef = useRef<HTMLDivElement | null>(null);
  const sourceRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const { after, clearTimers, flyPacket, typeOut } = useSceneScript(
    sceneRef,
    packetRef
  );

  const activeTurn = activeIndex === null ? null : demo.turns[activeIndex];
  const activeSource = activeTurn?.sourceId
    ? demo.sources.find((source) => source.id === activeTurn.sourceId)
    : undefined;

  const isSearching = phase === "searching";
  const isAnswering = phase === "answering";

  const play = useCallback(
    (index: number) => {
      clearTimers();

      const turn = demo.turns[index];
      if (!turn) return;

      setActiveIndex(index);
      setTyped("");
      setLitId(null);
      setMissed(false);
      setCiteShown(false);

      // Bez pohybu nemá smysl nic odkrývat postupně — odpověď, rozsvícený
      // podklad i citace se ukážou rovnou. Informace je stejná, jen se
      // k ní nedochází.
      if (reduceMotion) {
        setPhase("done");
        setTyped(turn.answer);
        setLitId(turn.sourceId);
        setMissed(turn.sourceId === null);
        setCiteShown(true);
        return;
      }

      setPhase("asking");
      setPacketIcon("search");

      after(() => {
        setPhase("searching");

        const target = turn.sourceId
          ? sourceRefs.current[turn.sourceId]
          : baseRef.current;

        // Tam: dotaz letí do báze. Zpátky: nese buď nalezenou pasáž
        // (glyf podkladu), nebo přiznání, že nic nenašel (praporek).
        flyPacket(askRef.current, target, () => {
          if (turn.sourceId) {
            setLitId(turn.sourceId);
            const source = demo.sources.find((s) => s.id === turn.sourceId);
            setPacketIcon(source ? source.icon : "document");
          } else {
            setMissed(true);
            setPacketIcon("flag");
          }

          after(() => {
            flyPacket(target, replyRef.current, () => {
              setPhase("answering");

              typeOut(turn.answer, setTyped, () => {
                after(() => {
                  setCiteShown(true);
                  setPhase("done");
                }, CITE_DELAY_MS);
              });
            });
          }, SEARCH_DWELL_MS);
        });
      }, ASK_DELAY_MS);
    },
    [
      after,
      clearTimers,
      demo.sources,
      demo.turns,
      flyPacket,
      reduceMotion,
      typeOut,
    ]
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

  const status = isSearching
    ? demo.labels.searching
    : isAnswering
      ? "odpovídám"
      : phase === "done"
        ? "hotovo"
        : "čeká na dotaz";

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
              s konzolí schválně — scény mají působit jako jeden web. */}
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

          <div className="relative grid gap-3 md:gap-5 md:[transform-style:preserve-3d] md:grid-cols-[minmax(0,1.12fr)_minmax(0,0.88fr)]">
            {/* ---------- chat widget ---------- */}
            {/* `min-w-0` na položce gridu zůstává i po přechodu chipů na
                zalamování. Bez něj si sloupec vynutí min-content šířku
                podle nejdelší nezalomitelné věty a odsune scénu mimo
                obrazovku — na desktopu se to neprojeví, na mobilu ano
                (past z pilotu, sluzby-sceny-prompt.md §5). */}
            <div className="flex min-w-0 flex-col md:[transform:translateZ(46px)]">
              <div className="flex flex-col gap-3 rounded-sm border border-accent/30 bg-[#0e0e0e]/95 p-4 shadow-[0_24px_60px_-30px_rgba(201,168,76,0.55)]">
                <div className="flex items-center gap-2.5 border-b border-white/[0.08] pb-3">
                  <span
                    aria-hidden
                    className="grid h-[34px] w-[34px] shrink-0 place-items-center rounded-full border border-accent/40 bg-accent/10 text-accent"
                  >
                    <DEMO_ICONS.chat aria-hidden className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-medium text-[#f0ece6]">
                      {demo.actor}
                    </p>
                    <p
                      className={`font-inter text-xs uppercase tracking-wide ${
                        isSearching || isAnswering
                          ? "text-accent"
                          : "text-[#8a8070]"
                      }`}
                    >
                      {status}
                    </p>
                  </div>
                </div>

                {/* Přepis. `justify-end` drží repliky u spodní hrany jako
                    v opravdovém widgetu, `min-h` rezervuje místo dopředu,
                    aby karta při odpovídání neměnila výšku (layoutová
                    vlastnost se neanimuje, claude.md sekce 5). */}
                <div className="flex min-h-[13.5rem] flex-col justify-end gap-2.5">
                  {activeTurn ? (
                    <>
                      <div
                        ref={askRef}
                        className={`max-w-[85%] self-end rounded-sm rounded-br-sm border border-accent/45 bg-accent/10 px-3.5 py-2.5 text-sm leading-snug text-[#f0ece6] transition-[opacity,transform] duration-300 ${
                          phase === "idle"
                            ? "translate-y-1 opacity-0"
                            : "translate-y-0 opacity-100"
                        }`}
                      >
                        {activeTurn.question}
                      </div>

                      <div
                        ref={replyRef}
                        className="max-w-[92%] self-start rounded-sm rounded-bl-sm border border-white/[0.12] bg-[#161616]/80 px-3.5 py-2.5 text-sm leading-snug text-[#f0ece6]"
                      >
                        {isSearching ? (
                          <span
                            aria-hidden
                            className="flex items-center gap-1 py-0.5"
                          >
                            {[0, 1, 2].map((dot) => (
                              <span
                                key={dot}
                                className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent"
                                style={{ animationDelay: `${dot * 160}ms` }}
                              />
                            ))}
                          </span>
                        ) : (
                          <>
                            {typed}
                            {isAnswering ? (
                              <span
                                aria-hidden
                                className="ml-0.5 inline-block h-[1.05em] w-[7px] animate-pulse bg-accent align-[-2px]"
                              />
                            ) : null}
                          </>
                        )}
                      </div>

                      {/* Citace zdroje. Tohle je celé sdělení scény —
                          odpověď má viditelně napsáno, ze kterého
                          podkladu vznikla. Když podklad není, na jeho
                          místě stojí přiznané předání člověku, ne mlčení. */}
                      <div
                        role="status"
                        className={`self-start transition-[opacity,transform] duration-[400ms] ${
                          citeShown
                            ? "translate-y-0 opacity-100"
                            : "translate-y-1 opacity-0"
                        }`}
                      >
                        {activeSource ? (
                          <span className="inline-flex items-center gap-1.5 rounded-sm border border-accent/30 bg-accent/10 px-2 py-1 font-inter uppercase tracking-[0.1em] text-xs text-accent">
                            <DEMO_ICONS.document
                              aria-hidden
                              className="h-3 w-3 shrink-0"
                            />
                            {demo.labels.source}: {activeSource.title}
                          </span>
                        ) : null}
                        {activeTurn.handoff ? (
                          <span className="inline-flex items-center gap-1.5 rounded-sm border border-white/[0.12] bg-[#161616]/70 px-2 py-1 font-inter uppercase tracking-[0.1em] text-xs text-[#8a8070]">
                            <PersonIcon
                              aria-hidden
                              className="h-3 w-3 shrink-0 text-accent"
                            />
                            {activeTurn.handoff}
                          </span>
                        ) : null}
                      </div>
                    </>
                  ) : (
                    <div className="max-w-[92%] self-start rounded-sm rounded-bl-sm border border-white/[0.12] bg-[#161616]/80 px-3.5 py-2.5 text-sm leading-snug text-[#f0ece6]">
                      {demo.idleSay}
                    </div>
                  )}
                </div>

                <div className="border-t border-white/[0.08] pt-3">
                  <p className="mb-2 font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                    {demo.labels.picker}
                  </p>
                  {/* Zalamování, ne vodorovný scroll. Třetí dotaz je ten,
                      na který chatbot NEZNÁ odpověď — obchodně
                      nejdůležitější moment scény. Ve scrollovací řadě byl
                      na 768 i 1440 px schovaný za okrajem a návštěvník ho
                      nikdy neviděl. */}
                  <div className="flex flex-wrap gap-2">
                    {demo.turns.map((turn, i) => {
                      const selected = i === activeIndex;

                      return (
                        <button
                          key={turn.id}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => {
                        play(i);
                        // Jen klik návštěvníka, ne autoplay první scény.
                        trackClick("demo_scene_played", demo.kind, turn.id);
                      }}
                          className={`rounded-full border px-3 py-1.5 text-left text-xs leading-snug transition-colors ${
                            selected
                              ? "border-accent/55 bg-accent/10 text-[#f0ece6]"
                              : "border-white/[0.08] bg-[#0e0e0e]/85 text-[#8a8070] hover:border-white/[0.12] hover:text-[#f0ece6]"
                          }`}
                        >
                          {turn.question}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dekorace, ne formulář. Widget by bez psacího řádku
                    nevypadal jako widget, ale skutečné pole by bylo mrtvé
                    ovládání v cestě klávesnice — proto `aria-hidden` a div,
                    ne `<input>`. */}
                <div
                  aria-hidden
                  className="flex items-center gap-2 rounded-sm border border-white/[0.08] bg-[#080808]/60 px-3 py-2"
                >
                  <span className="flex-1 truncate text-sm text-[#8a8070]">
                    Napište zprávu…
                  </span>
                  <SendIcon className="h-4 w-4 shrink-0 text-[#6f665a]" />
                </div>
              </div>
            </div>

            {/* ---------- znalostní báze ---------- */}
            <div
              ref={baseRef}
              className="flex min-w-0 flex-col md:[transform:translateZ(14px)]"
            >
              <div className="mb-2.5 flex items-baseline justify-between gap-2">
                <p className="font-inter text-xs uppercase tracking-[0.15em] text-[#8a8070]">
                  {demo.labels.base}
                </p>
                <p
                  className={`font-inter uppercase tracking-[0.1em] text-xs transition-colors ${
                    missed
                      ? "text-[#8a8070]"
                      : isSearching
                        ? "text-accent"
                        : "text-transparent"
                  }`}
                >
                  {missed ? demo.labels.notFound : demo.labels.searching}
                </p>
              </div>

              <div className="flex flex-1 flex-col gap-2.5">
                {demo.sources.map((source) => {
                  const SourceIcon = DEMO_ICONS[source.icon];
                  const lit = source.id === litId;

                  return (
                    <div
                      key={source.id}
                      ref={(el) => {
                        sourceRefs.current[source.id] = el;
                      }}
                      className={`min-w-0 rounded-sm border p-3 transition-colors duration-300 ${
                        lit
                          ? "border-accent/55 bg-accent/[0.07]"
                          : "border-white/[0.08] bg-[#0e0e0e]/85"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <SourceIcon
                          aria-hidden
                          className={`h-[15px] w-[15px] shrink-0 transition-colors ${
                            lit ? "text-accent" : "text-[#6f665a]"
                          }`}
                        />
                        <span className="min-w-0 flex-1 truncate text-sm font-medium text-[#f0ece6]">
                          {source.title}
                        </span>
                        <span className="shrink-0 font-inter uppercase tracking-[0.1em] text-xs text-[#8a8070]">
                          {source.note}
                        </span>
                      </div>

                      {/* Pasáž je v DOM pořád, mění se jen barva —
                          kdyby se odkrývala, měnila by se výška karty
                          a to už je layoutová animace. Zvýrazněná pasáž
                          je důkaz, že odpověď vznikla z podkladu. */}
                      <p
                        className={`mt-2 text-xs leading-relaxed transition-colors duration-300 ${
                          lit
                            ? "rounded-sm bg-accent/10 px-1.5 py-1 text-[#e0dbd2]"
                            : "px-1.5 py-1 text-[#8a8070]"
                        }`}
                      >
                        {source.passage}
                      </p>
                    </div>
                  );
                })}
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
