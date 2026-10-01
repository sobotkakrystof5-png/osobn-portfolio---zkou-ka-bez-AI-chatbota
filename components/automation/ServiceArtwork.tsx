import type { ReactNode } from "react";
import ArtworkFrame, {
  GOLD,
  GOLD_LIGHT,
  NODE_FILL,
} from "@/components/automation/ArtworkFrame";

// Port z alteno (components/motion/ServiceArtwork.tsx). SVG cesty beze
// změny; tyrkys → zlatá (`GOLD`), máta → světlá zlatá (`GOLD_LIGHT`), výplň
// uzlů přes `NODE_FILL` z ArtworkFrame. Klíč mapy `automatizace` →
// `automatizace-procesu` (slug VIZEON). `id` gradientů jde parametrem.
//
// Celoplošná grafika do hlavičky karty služby (v alteno homepage a hub
// /sluzby, ve VIZEON karty hubu /automatizace). Není to ikona ze
// sady v process-icons.tsx a schválně: tady nejde o glyf vedle nadpisu,
// ale o scénu, která má sama vysvětlit, co daná služba dělá — „vizuál
// nese myšlenku, text jen doplňuje" (claude.md, babička test 2.0).
// Proto i silnější stroke: 24px glyf zvětšený na 144px by měl rozpitou
// linku a rozpadl by se do zbytku sady.
//
// Akcent (v alteno tyrkysová, ve VIZEON zlatá) je tu na klíčovém prvku karty, která je celá odkaz — ne
// plošná dekorace.
//
// Podklad (mřížka, záře, rohové značky) a paleta žijí od 2026-09-23
// v ArtworkFrame.tsx, sdíleném s obory (/pro-koho) a příklady využití na
// podstránkách služeb. Pravidla o barvách, pohybu a `id` gradientů stojí
// tam. Tady platí navíc: `id` je odvozené od slugu, takže jedna služba se
// na jedné stránce smí vykreslit jednou — homepage i hub to splňují.

type SceneProps = { id: string };

// Uzel s obíhajícími satelity: agent stojí uprostřed a sám sahá do
// okolních systémů. Tečky na spojnicích jsou data na cestě.
function AgentScene({ id }: SceneProps) {
  const satellites: Array<[number, number]> = [
    [76, 44],
    [244, 40],
    [68, 118],
    [248, 116],
  ];

  return (
    <>
      <ellipse
        cx="160"
        cy="80"
        rx="104"
        ry="52"
        stroke={GOLD}
        strokeOpacity="0.2"
        strokeWidth="1.25"
        strokeDasharray="3 7"
      />
      <circle
        cx="160"
        cy="80"
        r="54"
        stroke={GOLD}
        strokeOpacity="0.12"
        strokeWidth="1.25"
      />

      <g stroke={GOLD} strokeOpacity="0.4" strokeWidth="1.5">
        <path d="M80 50Q110 60 136 68" />
        <path d="M240 46Q212 56 184 68" />
        <path d="M74 112Q106 104 136 94" />
        <path d="M242 110Q212 102 184 92" />
      </g>

      <g className="opacity-70 transition-opacity duration-500 group-hover:opacity-100">
        <circle cx="110" cy="59" r="2.6" fill={GOLD_LIGHT} />
        <circle cx="210" cy="57" r="2.6" fill={GOLD_LIGHT} />
        <circle cx="106" cy="103" r="2.6" fill={GOLD_LIGHT} />
        <circle cx="212" cy="101" r="2.6" fill={GOLD_LIGHT} />
      </g>

      {satellites.map(([cx, cy]) => (
        <g key={`${cx}-${cy}`}>
          <circle
            cx={cx}
            cy={cy}
            r="9"
            fill={NODE_FILL}
            stroke={GOLD}
            strokeOpacity="0.55"
            strokeWidth="1.5"
          />
          <circle cx={cx} cy={cy} r="2.8" fill={GOLD} fillOpacity="0.7" />
        </g>
      ))}

      <rect
        x="134"
        y="54"
        width="52"
        height="52"
        rx="17"
        fill={NODE_FILL}
        stroke={`url(#${id}-line)`}
        strokeWidth="2"
      />
      <path
        d="M160 66l4.2 11.8L176 82l-11.8 4.2L160 98l-4.2-11.8L144 82l11.8-4.2z"
        fill={`url(#${id}-line)`}
        fillOpacity="0.16"
        stroke={`url(#${id}-line)`}
        strokeWidth="2"
      />
    </>
  );
}

// Linka: doklad dovnitř, zpracování, větev na dvě souběžné akce,
// sloučení a hotový výstup. Pravoúhlé vedení s oblouky je vědomá
// citace toho, jak vypadá plátno n8n.
function PipelineScene({ id }: SceneProps) {
  return (
    <>
      <g stroke={GOLD} strokeOpacity="0.35" strokeWidth="1.5">
        <path d="M70 80h34" />
        <path d="M140 80h14q8 0 8-8V56q0-8 8-8h22" />
        <path d="M140 80h14q8 0 8 8v16q0 8 8 8h22" />
        <path d="M228 48h16q8 0 8 8v16q0 8 8 8h9" />
        <path d="M228 112h16q8 0 8-8V88q0-8 8-8h9" />
      </g>

      <g className="opacity-70 transition-opacity duration-500 group-hover:opacity-100">
        <circle cx="87" cy="80" r="2.6" fill={GOLD_LIGHT} />
        <circle cx="180" cy="48" r="2.6" fill={GOLD_LIGHT} />
        <circle cx="180" cy="112" r="2.6" fill={GOLD_LIGHT} />
      </g>

      {/* vstupní doklad */}
      <rect
        x="26"
        y="54"
        width="44"
        height="52"
        rx="9"
        fill={NODE_FILL}
        stroke={GOLD}
        strokeOpacity="0.6"
        strokeWidth="1.75"
      />
      <path
        d="M37 70h22M37 80h22M37 90h13"
        stroke={GOLD}
        strokeOpacity="0.5"
        strokeWidth="1.75"
      />

      {/* zpracování */}
      <rect
        x="104"
        y="62"
        width="36"
        height="36"
        rx="11"
        fill={NODE_FILL}
        stroke={`url(#${id}-line)`}
        strokeWidth="2"
      />
      <circle
        cx="122"
        cy="80"
        r="6.5"
        stroke={`url(#${id}-line)`}
        strokeWidth="2"
      />
      <path
        d="M122 68v3.5M122 88.5V92M110 80h3.5M130.5 80H134M113.6 71.6l2.5 2.5M127.9 85.9l2.5 2.5M130.4 71.6l-2.5 2.5M116.1 85.9l-2.5 2.5"
        stroke={`url(#${id}-line)`}
        strokeOpacity="0.8"
        strokeWidth="1.75"
      />

      {/* dvě souběžné akce */}
      <rect
        x="192"
        y="30"
        width="36"
        height="36"
        rx="11"
        fill={NODE_FILL}
        stroke={GOLD}
        strokeOpacity="0.65"
        strokeWidth="1.75"
      />
      <path
        d="M201 48.5l5.5 5.5L219 41"
        stroke={GOLD}
        strokeWidth="2.25"
      />
      <rect
        x="192"
        y="94"
        width="36"
        height="36"
        rx="11"
        fill={NODE_FILL}
        stroke={GOLD}
        strokeOpacity="0.65"
        strokeWidth="1.75"
      />
      <path
        d="M213 100l-9 13h6.5l-1.5 9 9-13h-6.5z"
        stroke={GOLD}
        strokeWidth="2"
      />

      {/* výstup */}
      <circle
        cx="284"
        cy="80"
        r="15"
        fill={NODE_FILL}
        stroke={`url(#${id}-line)`}
        strokeWidth="2"
      />
      <path
        d="M277 80.5l5 5 9.5-10.5"
        stroke={`url(#${id}-line)`}
        strokeWidth="2.25"
      />
    </>
  );
}

// Hlas: mikrofon, rozeznaná vlna a odbavený hovor. Vlna je kreslená
// z jednotlivých sloupců, ne jako jedna křivka — čte se to jako živý
// zvuk, ne jako graf.
function VoiceScene({ id }: SceneProps) {
  const bars = [10, 20, 34, 15, 44, 26, 52, 18, 40, 29, 48, 16, 30, 21, 12];

  return (
    <>
      <path
        d="M112 80h190"
        stroke={GOLD}
        strokeOpacity="0.12"
        strokeWidth="1.25"
        strokeDasharray="2 6"
      />

      {/* mikrofon */}
      <rect
        x="40"
        y="38"
        width="26"
        height="48"
        rx="13"
        fill={NODE_FILL}
        stroke={`url(#${id}-line)`}
        strokeWidth="2"
      />
      <path
        d="M53 50v14"
        stroke={`url(#${id}-line)`}
        strokeOpacity="0.6"
        strokeWidth="1.75"
      />
      <path
        d="M32 74a21 21 0 0 0 42 0"
        stroke={`url(#${id}-line)`}
        strokeWidth="2"
      />
      <path
        d="M53 95v13M42 108h22"
        stroke={GOLD}
        strokeOpacity="0.65"
        strokeWidth="2"
      />

      {/* šíření zvuku */}
      <g stroke={GOLD} strokeWidth="1.5">
        <path d="M82 60a26 26 0 0 1 0 40" strokeOpacity="0.35" />
        <path d="M94 48a42 42 0 0 1 0 64" strokeOpacity="0.18" />
      </g>

      {/* vlna */}
      <g strokeWidth="5" stroke={`url(#${id}-line)`}>
        {bars.map((h, i) => {
          const x = 118 + i * 12;
          return (
            <path
              key={x}
              d={`M${x} ${80 - h}v${h * 2}`}
              strokeOpacity={0.35 + (h / 52) * 0.55}
            />
          );
        })}
      </g>
    </>
  );
}

// RAG: dotaz se neptá modelu naslepo, ale sáhne do vlastních dokumentů.
// Proto tři vrstvy vedle sebe — podklady, vyhledání v nich, odpověď.
function KnowledgeScene({ id }: SceneProps) {
  const dots: Array<[number, number]> = [];
  for (let col = 0; col < 4; col += 1) {
    for (let row = 0; row < 4; row += 1) {
      dots.push([106 + col * 18, 50 + row * 20]);
    }
  }
  const hits = new Set(["124-70", "142-90", "160-50"]);

  return (
    <>
      {/* podklady */}
      <g fill={NODE_FILL} stroke={GOLD} strokeWidth="1.75">
        <rect
          x="24"
          y="48"
          width="42"
          height="56"
          rx="8"
          strokeOpacity="0.25"
          transform="rotate(-9 45 76)"
        />
        <rect
          x="28"
          y="46"
          width="42"
          height="56"
          rx="8"
          strokeOpacity="0.45"
          transform="rotate(-4 49 74)"
        />
        <rect
          x="32"
          y="44"
          width="42"
          height="56"
          rx="8"
          stroke={`url(#${id}-line)`}
        />
      </g>
      <path
        d="M41 60h24M41 70h24M41 80h24M41 90h14"
        stroke={GOLD}
        strokeOpacity="0.5"
        strokeWidth="1.75"
      />

      {/* vyhledání ve vlastních datech */}
      <path
        d="M78 72h20"
        stroke={GOLD}
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="2 5"
      />
      {dots.map(([cx, cy]) => {
        const hit = hits.has(`${cx}-${cy}`);
        return (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r={hit ? 4 : 2.4}
            fill={hit ? GOLD_LIGHT : GOLD}
            fillOpacity={hit ? 0.9 : 0.28}
          />
        );
      })}
      <path
        d="M124 70l18 20M124 70l36-20"
        stroke={GOLD_LIGHT}
        strokeOpacity="0.45"
        strokeWidth="1.5"
      />

      <path
        d="M176 76h16"
        stroke={GOLD}
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="2 5"
      />

      {/* odpověď */}
      <path
        d="M210 44h72a14 14 0 0 1 14 14v34a14 14 0 0 1-14 14h-58l-16 14 3-14h-1a14 14 0 0 1-14-14V58a14 14 0 0 1 14-14z"
        fill={NODE_FILL}
        stroke={`url(#${id}-line)`}
        strokeWidth="2"
      />
      <path
        d="M212 64h68M212 76h68M212 88h44"
        stroke={GOLD}
        strokeOpacity="0.5"
        strokeWidth="1.75"
      />
    </>
  );
}

const SCENES: Record<string, (props: SceneProps) => ReactNode> = {
  "ai-agenti": AgentScene,
  "automatizace-procesu": PipelineScene,
  "voice-agenti": VoiceScene,
  "chatboti-rag": KnowledgeScene,
};

export default function ServiceArtwork({
  slug,
  id = `svc-${slug}`,
}: {
  slug: string;
  /** Jedinečné na stránce, z něj se skládají `id` gradientů. */
  id?: string;
}) {
  // Neznámý slug (nová služba v lib/data/automation-pages.ts, na kterou se ještě
  // nekreslila scéna) dostane linku. Je to obecná scéna, ne zástupný
  // šedý obdélník — chybějící kus grafiky nemá být vidět na produkci.
  const Scene = SCENES[slug] ?? PipelineScene;

  return (
    <ArtworkFrame id={id}>
      <Scene id={id} />
    </ArtworkFrame>
  );
}
