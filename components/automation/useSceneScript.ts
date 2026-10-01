"use client";

// Sdílená kostra interaktivních scén na podstránkách /automatizace/[slug].
// Port z alteno (components/services/useSceneScript.ts), beze změny chování;
// konstanty časování a komentáře k pastem jsou převzaté doslova.
//
// PROČ AŽ TEĎ: sluzby-sceny-prompt.md §2 říká „ne dřív než u druhé
// scény" — abstrahovat nad jedním příkladem vyrábí špatný tvar. Po
// konzoli (2026-09-15), chatu (2026-09-16) a řetězu (2026-09-16) je
// vidět, co je opravdu společné, a co jen vypadalo podobně.
//
// CO SDÍLENÉ JE (a je tady):
//  • účetnictví časovačů — všechny tři scény si držely stejné pole
//    `timers` + interval psaní a stejný úklid při odmountování,
//  • přelet paketu mezi dvěma prvky scény počítaný z reálných pozic,
//  • jednorázové spuštění přes IntersectionObserver s `disconnect()`,
//  • vypisování textu po znacích.
//
// CO SDÍLENÉ NENÍ (a schválně tu chybí): scénář sám. Konzole odkrývá
// kroky, chat hledá v podkladech, řetěz putuje po uzlech. Kdyby se sem
// vtáhl i děj, vznikl by konfigurovatelný stroj na scény, kde je
// levnější přidat pole než napsat pět řádků — přesně ta abstrakce, před
// kterou brief varuje.
//
// PROČ PAKET NESMÍ LEŽET V 3D VRSTVĚ: `flyPacket` počítá souřadnice
// z `getBoundingClientRect`, tedy z promítnuté pozice na obrazovce.
// Kdyby element paketu sám seděl uvnitř vrstvy s `preserve-3d`
// a rotací, promítly by se ty souřadnice ještě jednou skrz perspektivu
// a paket by cíl minul. Ve všech scénách proto letí v neztransformovaném
// kořeni. (Past z pilotu, sluzby-sceny-prompt.md §5.)

import { useCallback, useEffect, useRef, type RefObject } from "react";

/** Polovina hrany paketu (26 px). Paket se polohuje levým horním rohem. */
const PACKET_HALF = 13;
/**
 * Odsazení startu od pravé hrany zdroje pro `fromAnchor: "right"`.
 * Konzole nenechává paket vyletět ze středu tlačítka, ale z jeho pravého
 * okraje — vypadá to, že případ z fronty odchází, ne že se rodí uprostřed.
 */
const RIGHT_INSET = 34;
const DEFAULT_FLIGHT_MS = 520;
/** Náběh a doběh krytí paketu. Kratší než let, aby se stihl objevit. */
const FADE_MS = 200;
const TYPE_TICK_MS = 18;
const TYPE_CHARS_PER_TICK = 2;

export type FlightOptions = {
  /** Delka letu. Konzole má delší dráhu než chat, proto je to parametr. */
  durationMs?: number;
  /** Odkud paket vyletí: ze středu zdroje, nebo z jeho pravé hrany. */
  fromAnchor?: "center" | "right";
};

export type SceneScript = {
  /** setTimeout, který se sám zapíše do úklidu. */
  after: (fn: () => void, ms: number) => void;
  /** Zruší všechny naplánované kroky i rozepsaný text. */
  clearTimers: () => void;
  /** Přelet paketu mezi dvěma prvky scény. `done` se volá po dopadu. */
  flyPacket: (
    from: HTMLElement | null,
    to: HTMLElement | null,
    done: () => void,
    options?: FlightOptions
  ) => void;
  /** Vypíše text po znacích. `onText` dostává vždy celý dosavadní úsek. */
  typeOut: (
    text: string,
    onText: (value: string) => void,
    done: () => void
  ) => void;
};

export function useSceneScript(
  sceneRef: RefObject<HTMLElement | null>,
  packetRef: RefObject<HTMLElement | null>
): SceneScript {
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (typer.current) {
      clearInterval(typer.current);
      typer.current = null;
    }
  }, []);

  const after = useCallback((fn: () => void, ms: number) => {
    timers.current.push(setTimeout(fn, ms));
  }, []);

  // Scéna se může odmountovat uprostřed přehrávání (návštěvník odejde na
  // jinou podstránku). Bez tohohle by naplánované kroky sáhly na stav
  // odmountované komponenty.
  useEffect(() => clearTimers, [clearTimers]);

  const flyPacket = useCallback<SceneScript["flyPacket"]>(
    (from, to, done, options) => {
      const scene = sceneRef.current;
      const packet = packetRef.current;

      // Chybějící cíl není chyba scény — může se stát mezi překreslením
      // a doběhnutím časovače. Scénář jde dál, jen bez animace přeletu.
      if (!scene || !packet || !from || !to) {
        done();
        return;
      }

      const durationMs = options?.durationMs ?? DEFAULT_FLIGHT_MS;

      // Počítá se z reálných pozic, ne z pevných hodnot: scény mění
      // rozložení sloupců podle breakpointu a natvrdo zadaná dráha by
      // mimo desktop mířila vedle.
      const sceneBox = scene.getBoundingClientRect();
      const fromBox = from.getBoundingClientRect();
      const toBox = to.getBoundingClientRect();

      const startX =
        options?.fromAnchor === "right"
          ? fromBox.right - sceneBox.left - RIGHT_INSET
          : fromBox.left + fromBox.width / 2 - sceneBox.left - PACKET_HALF;
      const startY =
        fromBox.top + fromBox.height / 2 - sceneBox.top - PACKET_HALF;
      const endX = toBox.left + toBox.width / 2 - sceneBox.left - PACKET_HALF;
      const endY = toBox.top + toBox.height / 2 - sceneBox.top - PACKET_HALF;

      packet.style.transition = "none";
      packet.style.transform = `translate3d(${startX}px, ${startY}px, 0) scale(0.7)`;
      packet.style.opacity = "0";

      // VYNUCENÝ PŘEPOČET STYLU. Bez něj prohlížeč sloučí tenhle zápis
      // s tím z následujícího rámce do jediného stylu, přechod se pak
      // počítá od POSLEDNÍHO VYKRESLENÉHO stavu — a při prvním letu je
      // to `transform: none`, tedy levý horní roh scény. Paket do scény
      // viditelně „připlouval" odtamtud místo aby vyjel ze zdrojového
      // uzlu. Dva rámce níž to samy neošetří, protože mezi nimi žádné
      // vykreslení není. Jedno čtení layoutu na let je zanedbatelné.
      // (Nalezeno 2026-09-16 při Session B, projevovalo se ve všech
      // scénách, které tenhle hook používají.)
      void packet.offsetWidth;

      // Dva vnořené rámce schválně: první usadí výchozí pozici bez
      // přechodu, druhý teprve spustí let. V jednom rámci by prohlížeč
      // obojí složil do jednoho stavu a paket by se rovnou objevil v cíli.
      requestAnimationFrame(() => {
        packet.style.transition = `transform ${durationMs}ms cubic-bezier(0.45, 0, 0.2, 1), opacity ${FADE_MS}ms linear`;
        packet.style.transform = `translate3d(${startX}px, ${startY}px, 0) scale(1)`;
        packet.style.opacity = "1";

        requestAnimationFrame(() => {
          packet.style.transform = `translate3d(${endX}px, ${endY}px, 0) scale(0.45)`;
        });

        after(() => {
          packet.style.opacity = "0";
          done();
        }, durationMs);
      });
    },
    [after, packetRef, sceneRef]
  );

  const typeOut = useCallback<SceneScript["typeOut"]>((text, onText, done) => {
    let printed = 0;

    typer.current = setInterval(() => {
      printed += TYPE_CHARS_PER_TICK;
      onText(text.slice(0, printed));

      if (printed < text.length) return;

      if (typer.current) {
        clearInterval(typer.current);
        typer.current = null;
      }

      done();
    }, TYPE_TICK_MS);
  }, []);

  return { after, clearTimers, flyPacket, typeOut };
}

/**
 * Jednorázové spuštění scény, až ji návštěvník uvidí. Observer se hned
 * odpojí, takže při dalším scrollování nic nepřepočítává — stejný vzor
 * jako count-up ve StatsBar a povinnost z claude.md, sekce 5 („žádná
 * smyčka na pozadí").
 *
 * `after` se předává zvenčí, ne zakládá tady: scéna musí jít zrušit
 * jedním `clearTimers`, ať už čeká na autoplay nebo na krok scénáře.
 */
export function useSceneAutoplay({
  sceneRef,
  play,
  after,
  reduceMotion,
  delayMs,
}: {
  sceneRef: RefObject<HTMLElement | null>;
  play: () => void;
  after: SceneScript["after"];
  reduceMotion: boolean;
  delayMs: number;
}) {
  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.disconnect();
          // Bez pohybu nemá smysl čekat na nájezd — scéna se stejně
          // vykreslí rovnou hotová.
          after(play, reduceMotion ? 0 : delayMs);
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(scene);
    return () => observer.disconnect();
  }, [after, delayMs, play, reduceMotion, sceneRef]);
}
