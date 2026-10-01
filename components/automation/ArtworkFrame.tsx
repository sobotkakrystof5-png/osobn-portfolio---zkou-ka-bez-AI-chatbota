import type { ReactNode } from "react";

// Port z alteno (components/motion/ArtworkFrame.tsx), barvy přemapované do
// palety VIZEON (tyrkys → zlatá `accent`, máta → `accent-hover`, studené
// šedé → teplé). Tvar, mřížka a logika vrstev beze změny.
//
// Společný podklad celoplošných grafik v hlavičkách karet: jemná mřížka,
// zlatá záře a rohové značky. Používají ho náhledy karet na hubu
// (ServiceArtwork.tsx) a příklady využití na /automatizace/[slug]
// (UseCaseArtwork.tsx). Dvě kopie téhož podkladu by se dřív nebo později
// rozešly.
//
// Paleta nepřidává ani jednu barvu mimo tokeny: zlatá jako hlavní linka,
// světle zlatá jen jako druhý dojezd gradientu a výplň teček, podklad
// teplá tmavá škála VIZEON.
//
// Bez JS a bez smyčkové animace (claude.md §5): scéna je statické SVG,
// mění se jen průhlednost druhé vrstvy záře při najetí na kartu, a to CSS
// přechodem na `opacity`. Karta proto musí nést třídu `group`.
//
// POZOR na `id` gradientů: jsou odvozené od volajícího, ne náhodné,
// protože komponenta běží na serveru (useId by z ní udělal klientskou).
// Platí předpoklad, že jeden `id` se na jedné stránce vykreslí jednou.

export const GOLD = "#c9a84c";
export const GOLD_LIGHT = "#d4b968";
/**
 * Výplň uzlů ve scéně. Neprůhledná, aby uzel překryl mřížku, a o chlup
 * světlejší než podklad rámu (`#0e0e0e`), stejně jako v předloze.
 */
export const NODE_FILL = "#111111";

type ArtworkFrameProps = {
  id: string;
  children?: ReactNode;
  /**
   * Rohové značky. Vypínají se jen tam, kde se podklad roztahuje přes
   * výrazně širší plochu než 2:1 (pás v UseCaseArtwork) — `slice` by je
   * tam ořízl napůl.
   */
  corners?: boolean;
};

export default function ArtworkFrame({
  id,
  children,
  corners = true,
}: ArtworkFrameProps) {
  return (
    <svg
      viewBox="0 0 320 160"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        {/* `userSpaceOnUse` je tu nutnost, ne preference: ve výchozím
            `objectBoundingBox` má svislá čára (sloupec vlny, linka
            v mikrofonu) nulovou šířku boxu, gradient je tím degenerovaný
            a prohlížeč prvek nevykreslí vůbec. Navíc díky tomu přechod
            běží přes celou scénu, ne zvlášť uvnitř každého tvaru. */}
        <linearGradient
          id={`${id}-line`}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="320"
          y2="160"
        >
          <stop offset="0%" stopColor={GOLD} />
          <stop offset="100%" stopColor={GOLD_LIGHT} />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="50%" cy="46%" r="58%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.20" />
          <stop offset="55%" stopColor={GOLD} stopOpacity="0.05" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
        <pattern
          id={`${id}-grid`}
          width="16"
          height="16"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M16 0H0v16"
            fill="none"
            stroke="#e0dbd2"
            strokeOpacity="0.05"
            strokeWidth="1"
          />
        </pattern>
      </defs>

      <rect width="320" height="160" fill="#0e0e0e" />
      <rect width="320" height="160" fill={`url(#${id}-grid)`} />
      <rect width="320" height="160" fill={`url(#${id}-glow)`} />
      {/* Druhá vrstva záře se přidá až při najetí — karta tím ožije,
          ale nic se nehýbe v nekonečné smyčce. */}
      <rect
        width="320"
        height="160"
        fill={`url(#${id}-glow)`}
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      {children ? (
        <g
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        >
          {children}
        </g>
      ) : null}

      {/* Rohové značky — stejný technický rukopis jako mono číslování
          karet a desky spojů v ToolBoard. Sedí schválně až na 22/138,
          ne u samé hrany: karta je širší než poměr 2:1 viewBoxu, takže
          `slice` ořízne scénu shora a zdola a značka u hrany by se
          useknula napůl. Stejný důvod, proč každý motiv drží uvnitř
          pásu y 24–136. */}
      {corners ? (
        <path
          d="M22 36V22h14M298 124v14h-14"
          fill="none"
          stroke={GOLD}
          strokeOpacity="0.3"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}
