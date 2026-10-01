import type { ReactNode } from "react";
import { PhoneIcon } from "@/components/automation/process-icons";
import type { PainArt } from "@/lib/data/automation-pages";

// Port z alteno (components/services/PainArtwork.tsx). SVG cesty beze změny,
// přemapované jsou jen konstanty barev na teplé šedé VIZEON. Akcent tu
// schválně není (pravidlo před/po níže).
//
// Ilustrace bolestí v sekci „Co vás dnes zdržuje" na /automatizace/[slug]
// (2026-09-24, zadání majitele: výraznější grafika, ze které návštěvník do
// dvou vteřin pozná, o jaký problém jde, a sekce se má odlišit od ostatních).
//
// JAZYK STAVU „PŘED". Protějšek BenefitArtwork (stav „po", v alteno mátová, ve VIZEON zlatá):
//  • jen neutrální šedé — barva značky patří řešení, ne problému. Návštěvník,
//    který projede stránku, tak vidí šedé „před" a barevné „po" bez čtení;
//  • jedno velké světlé ohnisko problému (HI, silná linka), okolí
//    tlumené — oko ví, kam se podívat;
//  • šrafovaný podklad `.pain-panel` (app/globals.css) — „zaseknuto";
//  • ohnisko nese `pain-jolt`: při najetí jednou škubne (tření), jinak
//    stojí. Žádná smyčka, pod reduced-motion vypnuto (claude.md §5).
//
// Obraz nesmí přehánět text: žádné číslo, žádné logo, žádná cizí značka.

/** Nejsvětlejší šedá — ohnisko problému. */
const HI = "#e0dbd2";
/** Tlumená šedá (hlavní tlumený text VIZEON) — důležitý kontext. */
const MID = "#8a8070";
/** Tmavá šedá — pozadí scény, rutina. */
const LOW = "#4a4339";
/** Barva povrchu karet — výplň předmětů, aby překryly šrafování. */
const FILL = "#0e0e0e";

function Jolt({ children }: { children: ReactNode }) {
  return <g className="pain-jolt">{children}</g>;
}

function QMark({
  x,
  y,
  s = 1,
  color = HI,
}: {
  x: number;
  y: number;
  s?: number;
  color?: string;
}) {
  return (
    <g stroke={color} strokeWidth={2 * Math.min(s, 1.4)}>
      <path
        d={`M${x - 3.5 * s} ${y - 4 * s}a${3.5 * s} ${3.5 * s} 0 1 1 ${4.5 * s} ${3.4 * s}c${-1 * s} ${0.4 * s} ${-1 * s} ${1 * s} ${-1 * s} ${2.4 * s}`}
      />
      <circle cx={x} cy={y + 4.6 * s} r={0.6 * s} fill={color} />
    </g>
  );
}

function Person({
  cx,
  cy,
  r = 7,
  color = MID,
  width = 2,
}: {
  cx: number;
  cy: number;
  r?: number;
  color?: string;
  width?: number;
}) {
  return (
    <g stroke={color} strokeWidth={width}>
      <circle cx={cx} cy={cy} r={r} fill={FILL} />
      <path d={`M${cx - r * 2} ${cy + r * 3.4}a${r * 2} ${r * 1.7} 0 0 1 ${r * 4} 0`} />
    </g>
  );
}

function Crescent({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const x = cx + r * 0.35;
  return (
    <path
      d={`M${x} ${cy - r * 0.94}A${r} ${r} 0 1 0 ${x} ${cy + r * 0.94}A${r} ${r} 0 0 1 ${x} ${cy - r * 0.94}Z`}
      fill={FILL}
      stroke={MID}
      strokeWidth={1.75}
    />
  );
}

// ---------------------------------------------------------------------------
// AI agenti
// ---------------------------------------------------------------------------

// Rutina jede po kolejích, nestandardní případ narazí na závoru a čeká.
function ZaseknutyScenar() {
  return (
    <>
      <path d="M8 88H78" stroke={LOW} strokeWidth={2} />
      <path d="M90 88H112" stroke={LOW} strokeWidth={2} strokeDasharray="3 5" />
      <rect x={10} y={72} width={14} height={14} rx={3} fill={FILL} stroke={LOW} strokeWidth={1.75} />
      <rect x={28} y={72} width={14} height={14} rx={3} fill={FILL} stroke={LOW} strokeWidth={1.75} />
      <rect x={80} y={48} width={7} height={42} rx={3.5} fill={HI} />
      <Jolt>
        <path
          d="M52 72L58 67L62 72L70 69L68 77L72 83L64 84L59 89L55 82L48 80Z"
          fill={FILL}
          stroke={HI}
          strokeWidth={2.5}
        />
        <circle cx={60} cy={36} r={15} fill={FILL} stroke={HI} strokeWidth={2.5} />
        <path d="M55 29v14M65 29v14" stroke={HI} strokeWidth={3} />
      </Jolt>
    </>
  );
}

// Věž práce roste nad jednoho člověka.
function PracePribyva() {
  const wobble = [0, 3, -2, 4, -3, 5, -1, 6];
  return (
    <>
      <Person cx={24} cy={80} r={6} />
      <Jolt>
        {wobble.map((dx, i) => {
          const y = 100 - i * 11;
          const x = 48 + dx;
          const tilt = i === 7 ? -8 : i === 6 ? 5 : 0;
          return (
            <rect
              key={i}
              x={x}
              y={y}
              width={44}
              height={9}
              rx={2}
              fill={FILL}
              stroke={i >= 5 ? HI : LOW}
              strokeWidth={i >= 5 ? 2.25 : 1.75}
              transform={tilt ? `rotate(${tilt} ${x + 22} ${y + 4.5})` : undefined}
            />
          );
        })}
      </Jolt>
      <path d="M106 66V24M100 30L106 24L112 30" stroke={HI} strokeWidth={2.5} />
    </>
  );
}

// Nováček a nad ním samé otázky.
function NovyKolega() {
  const bubbles: Array<[number, number, string]> = [
    [24, 40, MID],
    [60, 24, HI],
    [96, 40, MID],
  ];
  return (
    <>
      <Person cx={60} cy={78} r={8} color={HI} width={2.5} />
      <Jolt>
        {bubbles.map(([cx, cy, color]) => (
          <g key={cx}>
            <circle cx={cx} cy={cy} r={14} fill={FILL} stroke={color} strokeWidth={2} />
            <QMark x={cx} y={cy - 1} s={1.3} color={color} />
          </g>
        ))}
      </Jolt>
    </>
  );
}

// Know-how v hlavách lidí, cesta do systému přerušená.
function ZnalostiVHlavach() {
  return (
    <>
      {[36, 84].map((cy) => (
        <g key={cy}>
          <circle cx={26} cy={cy} r={15} fill={FILL} stroke={MID} strokeWidth={2} />
          <circle cx={21} cy={cy - 3} r={2} fill={HI} />
          <circle cx={29} cy={cy + 1} r={2} fill={HI} />
          <circle cx={23} cy={cy + 6} r={2} fill={HI} />
        </g>
      ))}
      <path d="M41 38C52 44 56 54 60 58M41 82C52 76 56 66 60 62" stroke={LOW} strokeWidth={2} strokeDasharray="3 4" />
      <path d="M74 60H84" stroke={LOW} strokeWidth={2} strokeDasharray="3 4" />
      <path d="M84 38v44a12 5 0 0 0 24 0V38" fill={FILL} stroke={LOW} strokeWidth={2} />
      <ellipse cx={96} cy={38} rx={12} ry={5} fill={FILL} stroke={LOW} strokeWidth={2} />
      <path d="M84 53a12 5 0 0 0 24 0M84 68a12 5 0 0 0 24 0" stroke={LOW} strokeWidth={1.5} />
      <Jolt>
        <path d="M62 55l10 10M72 55l-10 10" stroke={HI} strokeWidth={3.5} />
      </Jolt>
    </>
  );
}

// ---------------------------------------------------------------------------
// Automatizace
// ---------------------------------------------------------------------------

// Tři cesty dokladů, na konci ruční přepisování na klávesnici.
function RucniPrepis() {
  const keys = [60, 68, 76, 84, 92, 100];
  return (
    <>
      <rect x={8} y={14} width={24} height={17} rx={2} fill={FILL} stroke={LOW} strokeWidth={1.75} />
      <path d="M8 15l12 8l12 -8" stroke={LOW} strokeWidth={1.75} />
      <path d="M8 54h24v12H8zM8 54l5-6h14l5 6" fill={FILL} stroke={LOW} strokeWidth={1.75} />
      <rect x={10} y={80} width={20} height={26} rx={2} fill={FILL} stroke={LOW} strokeWidth={1.75} />
      <path d="M14 88h12M14 94h12M14 100h8" stroke={LOW} strokeWidth={1.5} />
      <path
        d="M34 23C46 23 46 44 54 44M34 60H54M32 92C46 92 46 60 54 56"
        stroke={LOW}
        strokeWidth={1.5}
        strokeDasharray="2 4"
      />
      <rect x={56} y={24} width={56} height={40} rx={4} fill={FILL} stroke={HI} strokeWidth={2.5} />
      <path d="M84 64v8M74 72h20" stroke={MID} strokeWidth={2} />
      <path d="M64 38h20M64 48h12" stroke={LOW} strokeWidth={2.5} />
      <path d="M80 43v12" stroke={HI} strokeWidth={2} />
      <Jolt>
        <rect x={54} y={80} width={60} height={24} rx={4} fill={FILL} stroke={MID} strokeWidth={2} />
        {keys.map((x) => (
          <g key={x}>
            <rect x={x - 3} y={85} width={6} height={5} rx={1} fill={LOW} />
            <rect
              x={x - 3}
              y={94}
              width={6}
              height={5}
              rx={1}
              fill={x === 84 ? HI : LOW}
            />
          </g>
        ))}
      </Jolt>
    </>
  );
}

// Zájemce čeká dva dny, protože zrovna hoří něco jiného.
function PozdniOdpoved() {
  return (
    <>
      <rect x={8} y={12} width={50} height={26} rx={10} fill={FILL} stroke={LOW} strokeWidth={1.75} />
      <path d="M18 37l-4 8l10 -7" fill={FILL} stroke={LOW} strokeWidth={1.75} />
      <circle cx={24} cy={25} r={2.2} fill={LOW} />
      <circle cx={33} cy={25} r={2.2} fill={LOW} />
      <circle cx={42} cy={25} r={2.2} fill={LOW} />
      {[68, 88].map((x) => (
        <g key={x}>
          <rect x={x} y={14} width={16} height={16} rx={3} fill={FILL} stroke={MID} strokeWidth={1.75} />
          <path d={`M${x} 19h16`} stroke={MID} strokeWidth={1.5} />
        </g>
      ))}
      <rect x={50} y={80} width={50} height={30} rx={4} fill={FILL} stroke={MID} strokeWidth={2} />
      <path d="M58 92h34M58 100h22" stroke={LOW} strokeWidth={2} />
      <Jolt>
        <path
          d="M75 40C86 52 92 60 88 72C86 80 80 84 75 84C68 84 62 80 61 72C60 64 66 60 68 52C70 58 72 60 74 60C74 52 72 46 75 40Z"
          fill={FILL}
          stroke={HI}
          strokeWidth={2.5}
        />
        <path
          d="M75 62C80 66 81 72 78 76C76 78 72 78 71 75C70 71 73 68 75 62Z"
          fill={HI}
          fillOpacity={0.3}
          stroke={HI}
          strokeWidth={1.5}
        />
      </Jolt>
    </>
  );
}

// Přetékající přihrádka; horní doklad už padá přes okraj.
function LeziVeSchrance() {
  const wobble = [0, 4, -3, 5, -2];
  return (
    <>
      {wobble.map((dx, i) => {
        const y = 72 - i * 9;
        return (
          <rect
            key={i}
            x={32 + dx}
            y={y}
            width={56}
            height={8}
            rx={2}
            fill={FILL}
            stroke={MID}
            strokeWidth={1.75}
          />
        );
      })}
      <path d="M12 78h96l-8 28H20Z" fill={FILL} stroke={HI} strokeWidth={2.5} />
      <path d="M30 90h60" stroke={LOW} strokeWidth={2} />
      <Jolt>
        <rect
          x={48}
          y={24}
          width={56}
          height={9}
          rx={2}
          fill={FILL}
          stroke={HI}
          strokeWidth={2.25}
          transform="rotate(-12 76 28)"
        />
      </Jolt>
    </>
  );
}

// Hodiny bez volného času; obálka nikdy neodejde.
function NewsletterNezbyde() {
  return (
    <>
      <rect
        x={10}
        y={80}
        width={38}
        height={26}
        rx={3}
        fill={FILL}
        stroke={LOW}
        strokeWidth={2}
        strokeDasharray="4 4"
      />
      <path d="M10 81l19 13l19 -13" stroke={LOW} strokeWidth={2} strokeDasharray="4 4" />
      <path d="M54 93H72" stroke={LOW} strokeWidth={2} strokeDasharray="3 4" />
      <path d="M78 86v14" stroke={MID} strokeWidth={2.5} />
      <Jolt>
        <circle cx={74} cy={44} r={30} fill={FILL} stroke={HI} strokeWidth={2.5} />
        <path d="M74 44L74 14A30 30 0 1 1 66.2 15Z" fill={HI} fillOpacity={0.14} />
        <path d="M74 44V24M74 44L88 52" stroke={HI} strokeWidth={2.75} />
        <circle cx={74} cy={44} r={2.5} fill={HI} />
      </Jolt>
    </>
  );
}

// ---------------------------------------------------------------------------
// Voice agenti
// ---------------------------------------------------------------------------

// Noc, telefon drnčí, nikdo ho nezvedne.
function TelefonBezOdezvy() {
  return (
    <>
      <Crescent cx={98} cy={22} r={10} />
      {[48, 60, 72].map((x) => (
        <circle key={x} cx={x} cy={104} r={3} fill={LOW} />
      ))}
      <Jolt>
        <PhoneIcon x={36} y={36} width={48} height={48} className="text-[#e0dbd2]" />
        <path d="M26 48l-6 4l6 4l-6 4l6 4" stroke={HI} strokeWidth={2.25} />
        <path d="M94 48l6 4l-6 4l6 4l-6 4" stroke={HI} strokeWidth={2.25} />
      </Jolt>
    </>
  );
}

// Operátor ve smyčce stejných dotazů.
function StejneDotazy() {
  const bubbles: Array<[number, number]> = [
    [60, 22],
    [96.4, 85],
    [23.6, 85],
  ];
  return (
    <>
      <path d="M60 22A42 42 0 1 1 25 40" stroke={MID} strokeWidth={2} />
      <path d="M18.7 43.1L25 40L24.5 47" stroke={MID} strokeWidth={2} />
      <Person cx={60} cy={60} r={9} color={HI} width={2.5} />
      <path d="M48 58a12 12 0 0 1 24 0" stroke={HI} strokeWidth={2.5} />
      <path d="M72 62q0 8 -8 8" stroke={HI} strokeWidth={2} />
      <Jolt>
        {bubbles.map(([cx, cy]) => (
          <g key={cx}>
            <rect x={cx - 11} y={cy - 7} width={22} height={14} rx={5} fill={FILL} stroke={HI} strokeWidth={1.75} />
            <path d={`M${cx - 6} ${cy}h12`} stroke={MID} strokeWidth={2} />
          </g>
        ))}
      </Jolt>
    </>
  );
}

// Plný kalendář a přesýpací hodiny.
function CekaniNaTermin() {
  const cells: Array<[number, number]> = [];
  for (let r = 0; r < 3; r += 1) {
    for (let c = 0; c < 3; c += 1) cells.push([17 + c * 17, 44 + r * 14]);
  }
  return (
    <>
      <rect x={10} y={24} width={60} height={66} rx={6} fill={FILL} stroke={MID} strokeWidth={2} />
      <path d="M10 38h60M24 18v10M56 18v10" stroke={MID} strokeWidth={2} />
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={12} height={9} rx={2} fill={LOW} />
      ))}
      <Jolt>
        <path
          d="M80 30h28M80 98h28M83 30C83 50 92 58 94 64C92 70 83 78 83 98M105 30C105 50 96 58 94 64C96 70 105 78 105 98"
          stroke={HI}
          strokeWidth={2.5}
        />
        <path d="M86 36H102C100 46 96 52 94 56C92 52 88 46 86 36Z" fill={HI} fillOpacity={0.35} />
        <path d="M87 96Q94 86 101 96Z" fill={HI} fillOpacity={0.35} />
      </Jolt>
    </>
  );
}

// Večerní hovor zůstane bez odezvy, zájemce odejde ke konkurenci.
function ZajemceJinam() {
  return (
    <>
      <Crescent cx={46} cy={16} r={6} />
      <circle cx={24} cy={34} r={15} fill={FILL} stroke={LOW} strokeWidth={2} />
      <PhoneIcon x={14} y={24} width={20} height={20} className="text-[#4a4339]" />
      <path d="M30 50C36 62 40 68 42 72" stroke={LOW} strokeWidth={1.75} strokeDasharray="3 4" />
      <Person cx={46} cy={80} r={7} />
      <Jolt>
        <path d="M62 86C72 86 76 76 82 72" stroke={HI} strokeWidth={2.5} />
        <path d="M76 70L83 71.5L80 78" stroke={HI} strokeWidth={2.5} />
        <circle cx={98} cy={62} r={15} fill={FILL} stroke={HI} strokeWidth={2.5} />
        <PhoneIcon x={88} y={52} width={20} height={20} className="text-[#e0dbd2]" />
      </Jolt>
    </>
  );
}

// ---------------------------------------------------------------------------
// Chatboti a RAG
// ---------------------------------------------------------------------------

// Pět stejných otázek, jedna za druhou.
function StejneOtazky() {
  const stack = [0, 1, 2, 3, 4];
  return (
    <>
      <path d="M100 24a12 12 0 1 1 -12 12" stroke={MID} strokeWidth={2} />
      <path d="M95 18L100 24L94 29" stroke={MID} strokeWidth={2} />
      {stack.slice(0, 4).map((i) => {
        const x = 10 + i * 9;
        const y = 14 + i * 13;
        return (
          <g key={i}>
            <rect x={x} y={y} width={60} height={24} rx={8} fill={FILL} stroke={LOW} strokeWidth={1.75} />
            <QMark x={x + 12} y={y + 11} s={0.9} color={LOW} />
            <path d={`M${x + 22} ${y + 12}h28`} stroke={LOW} strokeWidth={2.5} />
          </g>
        );
      })}
      <Jolt>
        <rect x={46} y={66} width={64} height={28} rx={9} fill={FILL} stroke={HI} strokeWidth={2.5} />
        <path d="M56 93l-4 9l11 -8" fill={FILL} stroke={HI} strokeWidth={2.5} />
        <QMark x={60} y={79} s={1.1} />
        <path d="M72 80h28" stroke={HI} strokeWidth={3} />
      </Jolt>
    </>
  );
}

// Pátek → víkend → pondělí; otázka čeká přes celé tři dny.
function VikendCeka() {
  const days = [0, 1, 2, 3];
  return (
    <>
      {days.map((i) => {
        const weekend = i === 1 || i === 2;
        return (
          <rect
            key={i}
            x={10 + i * 26}
            y={56}
            width={22}
            height={50}
            rx={4}
            fill={weekend ? LOW : FILL}
            fillOpacity={weekend ? 0.35 : 1}
            stroke={weekend ? LOW : MID}
            strokeWidth={1.75}
          />
        );
      })}
      <rect
        x={84}
        y={16}
        width={28}
        height={22}
        rx={7}
        stroke={LOW}
        strokeWidth={1.75}
        strokeDasharray="3 4"
      />
      <path d="M22 81H94" stroke={HI} strokeWidth={2.5} strokeDasharray="4 6" />
      <path d="M90 75L97 81L90 87" stroke={HI} strokeWidth={2.5} />
      <Jolt>
        <rect x={8} y={16} width={28} height={22} rx={7} fill={FILL} stroke={HI} strokeWidth={2.25} />
        <path d="M16 37l-2 8l8 -7" fill={FILL} stroke={HI} strokeWidth={2.25} />
        <QMark x={22} y={26} s={0.9} />
        <Crescent cx={46} cy={20} r={6} />
      </Jolt>
    </>
  );
}

// Rozházené dokumenty a lupa, která nic nenašla.
function SchovanaOdpoved() {
  const docs: Array<[number, number, number]> = [
    [10, 62, -18],
    [38, 76, 10],
    [66, 64, -6],
    [86, 78, 16],
    [22, 24, 8],
    [74, 18, -12],
    [48, 10, 4],
  ];
  return (
    <>
      {docs.map(([x, y, a]) => (
        <g key={`${x}-${y}`} transform={`rotate(${a} ${x + 13} ${y + 17})`}>
          <rect x={x} y={y} width={26} height={34} rx={3} fill={FILL} stroke={LOW} strokeWidth={1.75} />
          <path d={`M${x + 5} ${y + 10}h16M${x + 5} ${y + 17}h12`} stroke={LOW} strokeWidth={1.5} />
        </g>
      ))}
      <Jolt>
        <circle cx={58} cy={56} r={21} fill={FILL} stroke={HI} strokeWidth={3} />
        <QMark x={58} y={54} s={1.7} />
        <path d="M73 71L92 90" stroke={HI} strokeWidth={5.5} />
      </Jolt>
    </>
  );
}

// Robot z krabice míří vedle terče.
function ChatbotZKrabice() {
  return (
    <>
      <rect x={16} y={48} width={28} height={22} rx={7} fill={FILL} stroke={MID} strokeWidth={2} />
      <circle cx={25} cy={59} r={2.5} fill={MID} />
      <circle cx={35} cy={59} r={2.5} fill={MID} />
      <path d="M30 48v-7" stroke={MID} strokeWidth={2} />
      <circle cx={30} cy={39} r={2.5} fill={MID} />
      <path d="M8 72h44v34H8Z" fill={FILL} stroke={MID} strokeWidth={2} />
      <path d="M8 72l-4-10M52 72l4-10" stroke={MID} strokeWidth={2} />
      <circle cx={90} cy={80} r={22} fill={FILL} stroke={HI} strokeWidth={2.5} />
      <circle cx={90} cy={80} r={14} stroke={MID} strokeWidth={2} />
      <circle cx={90} cy={80} r={5} fill={HI} />
      <Jolt>
        <path d="M54 44L102 28" stroke={HI} strokeWidth={2.5} />
        <path d="M95.2 26.5L102 28L97.3 33.2" stroke={HI} strokeWidth={2.5} />
        <path d="M54 44l-5 -4M54 44l-3 5" stroke={MID} strokeWidth={2} />
      </Jolt>
    </>
  );
}

// ---------------------------------------------------------------------------

// Povinná protistrana typu `PainArt` v lib/data/automation-pages.ts: nový klíč bez
// scény shodí build tady, ne prázdným panelem na webu.
const SCENES: Record<PainArt, () => ReactNode> = {
  "zaseknuty-scenar": ZaseknutyScenar,
  "prace-pribyva": PracePribyva,
  "novy-kolega": NovyKolega,
  "znalosti-v-hlavach": ZnalostiVHlavach,
  "rucni-prepis": RucniPrepis,
  "pozdni-odpoved": PozdniOdpoved,
  "lezi-ve-schrance": LeziVeSchrance,
  "newsletter-nezbyde": NewsletterNezbyde,
  "telefon-bez-odezvy": TelefonBezOdezvy,
  "stejne-dotazy": StejneDotazy,
  "cekani-na-termin": CekaniNaTermin,
  "zajemce-jinam": ZajemceJinam,
  "stejne-otazky": StejneOtazky,
  "vikend-ceka": VikendCeka,
  "schovana-odpoved": SchovanaOdpoved,
  "chatbot-z-krabice": ChatbotZKrabice,
};

export default function PainArtwork({ art }: { art: PainArt }) {
  const Scene = SCENES[art];

  return (
    <div className="pain-panel h-full w-full overflow-hidden rounded-sm">
      <svg
        viewBox="0 0 120 120"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <Scene />
        </g>
      </svg>
    </div>
  );
}
