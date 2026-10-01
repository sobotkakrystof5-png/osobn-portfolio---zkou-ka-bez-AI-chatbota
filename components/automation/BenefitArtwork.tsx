import type { ReactNode } from "react";
import { GOLD_LIGHT, NODE_FILL, GOLD } from "@/components/automation/ArtworkFrame";
import {
  CalendarCheckIcon,
  FunnelIcon,
  GearIcon,
  MailIcon,
  PhoneIcon,
  SparkIcon,
} from "@/components/automation/process-icons";
import type { BenefitArt } from "@/lib/data/automation-pages";

// Port z alteno (components/services/BenefitArtwork.tsx). SVG cesty beze
// změny; tyrkys → zlatá (`GOLD`), máta → světlá zlatá (`GOLD_LIGHT`),
// studené šedé → teplé šedé VIZEON. Akcent zůstává jen na řešení.
//
// Ilustrace přínosů v sekci „Co získáte" na /automatizace/[slug] (2026-09-24,
// zadání majitele: každý přínos vlastní, originální obraz toho, o čem věta
// je, a sekce se má esteticky odlišit od zbytku stránky).
//
// ODLIŠENÍ JE ZÁMĚRNÉ A MÁ PRAVIDLA. Ostatní grafiky na podstránce
// (ArtworkFrame, UseCaseArtwork, ServiceArtwork) jsou technické schéma:
// obrysové linky na mřížce, tok zleva doprava. Tady je stav „po":
//  • žádná mřížka ani rohové značky — měkký zlatý dozvuk zdola (v alteno mátový)
//    (`.benefit-panel` v app/globals.css),
//  • tvary jsou vyplněné průsvitnou barvou, ne jen obrys,
//  • výsledek scény (to, co věta slibuje) je vždy v akcentu a nese třídu
//    `benefit-lift` — při najetí se zvedne, jinak stojí (claude.md §5:
//    žádná smyčka, pohyb jen na vyžádání, pod reduced-motion vypnutý).
//
// Obraz nesmí tvrdit víc než text: žádné číslo, žádná osa s hodnotou,
// žádné logo. Paleta jen tokeny + neutrální šedé.

const T = GOLD;
const M = GOLD_LIGHT;
const N = NODE_FILL;
/** Tmavá šedá — „stará cesta", to, co přínos odstraňuje. */
const DIM = "#4a4339";
/** Nejtmavší šedá — podkladové linky. */
const FAINT = "#3d3830";

// ---------------------------------------------------------------------------
// Primitiva
// ---------------------------------------------------------------------------

function Tick({ cx, cy, r = 10 }: { cx: number; cy: number; r?: number }) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill={M}
        fillOpacity={0.16}
        stroke={M}
        strokeWidth={1.75}
      />
      <path
        d={`M${cx - r * 0.42} ${cy + r * 0.02}l${r * 0.3} ${r * 0.32} ${r * 0.56} ${-r * 0.62}`}
        stroke={M}
        strokeWidth={2}
      />
    </g>
  );
}

/** Srpek měsíce otevřený doprava — „mimo pracovní dobu". */
function Moon({ cx, cy, r }: { cx: number; cy: number; r: number }) {
  const x = cx + r * 0.35;
  const top = cy - r * 0.94;
  const bottom = cy + r * 0.94;
  return (
    <path
      d={`M${x} ${top}A${r} ${r} 0 1 0 ${x} ${bottom}A${r} ${r} 0 0 1 ${x} ${top}Z`}
      fill={M}
      fillOpacity={0.14}
      stroke={M}
      strokeOpacity={0.8}
      strokeWidth={1.5}
    />
  );
}

function Twinkle({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const a = 4 * s;
  const b = 1 * s;
  return (
    <path
      d={`M${x} ${y - a}L${x + b} ${y - b}L${x + a} ${y}L${x + b} ${y + b}L${x} ${y + a}L${x - b} ${y + b}L${x - a} ${y}L${x - b} ${y - b}Z`}
      fill={M}
      fillOpacity={0.7}
    />
  );
}

function Person({
  cx,
  cy,
  color = T,
}: {
  cx: number;
  cy: number;
  color?: string;
}) {
  return (
    <g stroke={color} strokeWidth={1.75}>
      <circle cx={cx} cy={cy - 5} r={4.5} />
      <path d={`M${cx - 8} ${cy + 9}a8 7.5 0 0 1 16 0`} />
    </g>
  );
}

/** Měkká „obsahová" čára — text bez textu. */
function Bar({
  x,
  y,
  w,
  color = T,
  opacity = 0.22,
  width = 4,
}: {
  x: number;
  y: number;
  w: number;
  color?: string;
  opacity?: number;
  width?: number;
}) {
  return (
    <path
      d={`M${x} ${y}h${w}`}
      stroke={color}
      strokeOpacity={opacity}
      strokeWidth={width}
    />
  );
}

/**
 * Bublina zprávy s ocáskem. Ocásek je otevřená cesta: výplň ho uzavře,
 * obrys ne, takže mezi bublinou a ocáskem nevznikne čára.
 */
function Bubble({
  x,
  y,
  w,
  h,
  side,
  tone,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  side: "left" | "right";
  tone: "plain" | "mint";
}) {
  const stroke = tone === "mint" ? M : T;
  const strokeOpacity = tone === "mint" ? 1 : 0.45;
  const tail =
    side === "left"
      ? `M${x + 12} ${y + h - 1}L${x + 7} ${y + h + 7}L${x + 19} ${y + h - 1}`
      : `M${x + w - 12} ${y + h - 1}L${x + w - 7} ${y + h + 7}L${x + w - 19} ${y + h - 1}`;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={10}
        fill={N}
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth={1.75}
      />
      <path
        d={tail}
        fill={N}
        stroke={stroke}
        strokeOpacity={strokeOpacity}
        strokeWidth={1.75}
      />
      {tone === "mint" ? (
        <>
          <rect x={x} y={y} width={w} height={h} rx={10} fill={M} fillOpacity={0.12} />
          <path d={tail} fill={M} fillOpacity={0.12} />
        </>
      ) : null}
    </g>
  );
}

function Lift({ children }: { children: ReactNode }) {
  return <g className="benefit-lift">{children}</g>;
}

// ---------------------------------------------------------------------------
// AI agenti
// ---------------------------------------------------------------------------

// Noc, a fronta úkolů se dál odškrtává.
function AgendaBeziDal() {
  return (
    <>
      <Moon cx={46} cy={40} r={15} />
      <Twinkle x={24} y={68} />
      <Twinkle x={74} y={20} s={0.8} />
      <Twinkle x={214} y={30} />
      <Twinkle x={218} y={104} s={0.7} />
      <Lift>
        <rect
          x={84}
          y={24}
          width={112}
          height={94}
          rx={14}
          fill={N}
          stroke={T}
          strokeOpacity={0.55}
          strokeWidth={1.5}
        />
        <rect x={84} y={24} width={112} height={94} rx={14} fill={T} fillOpacity={0.05} />
        <Tick cx={104} cy={46} r={8} />
        <Bar x={120} y={46} w={54} opacity={0.3} />
        <Tick cx={104} cy={71} r={8} />
        <Bar x={120} y={71} w={40} opacity={0.3} />
        <circle cx={104} cy={96} r={8} stroke={T} strokeOpacity={0.3} strokeWidth={1.75} />
        <path d="M104 88a8 8 0 0 1 8 8" stroke={M} strokeWidth={2} />
        <Bar x={120} y={96} w={48} opacity={0.14} />
      </Lift>
    </>
  );
}

// Karta pravidel, rozhodovací uzel, a vybraná je jen jedna větev.
function VasePravidla() {
  const rows = [48, 70, 92];
  return (
    <>
      <rect
        x={22}
        y={28}
        width={74}
        height={84}
        rx={12}
        fill={N}
        stroke={T}
        strokeOpacity={0.5}
        strokeWidth={1.5}
      />
      {rows.map((y) => {
        const on = y === 48;
        return (
          <g key={y}>
            <rect
              x={32}
              y={y - 5}
              width={10}
              height={10}
              rx={3}
              fill={on ? M : "none"}
              fillOpacity={on ? 0.25 : undefined}
              stroke={on ? M : T}
              strokeOpacity={on ? 1 : 0.4}
              strokeWidth={1.4}
            />
            <Bar x={50} y={y} w={34} color={on ? M : T} opacity={on ? 0.5 : 0.2} />
          </g>
        );
      })}
      <path d="M96 48C108 48 108 70 118 70" stroke={M} strokeOpacity={0.7} strokeWidth={1.75} />
      <path
        d="M132 56L146 70L132 84L118 70Z"
        fill={N}
        stroke={T}
        strokeOpacity={0.75}
        strokeWidth={1.75}
      />
      <circle cx={132} cy={70} r={3} fill={M} />
      <path
        d="M146 70H194"
        stroke={DIM}
        strokeWidth={1.5}
        strokeDasharray="3 5"
      />
      <circle cx={202} cy={70} r={6} stroke={DIM} strokeWidth={1.5} />
      <path
        d="M146 70C166 70 170 102 194 102"
        stroke={DIM}
        strokeWidth={1.5}
        strokeDasharray="3 5"
      />
      <circle cx={202} cy={102} r={6} stroke={DIM} strokeWidth={1.5} />
      <Lift>
        <path d="M146 70C166 70 170 38 194 38" stroke={M} strokeWidth={2.25} />
        <Tick cx={205} cy={38} r={10} />
      </Lift>
    </>
  );
}

// Agend přibývá, člověk zůstává jeden.
function RustBezNabirani() {
  const columns = [0, 1, 2, 3];
  return (
    <>
      <circle
        cx={36}
        cy={92}
        r={20}
        fill={T}
        fillOpacity={0.08}
        stroke={T}
        strokeOpacity={0.4}
        strokeWidth={1.5}
      />
      <Person cx={36} cy={92} />
      <path d="M62 112H204" stroke={FAINT} strokeWidth={1.25} />
      {columns.map((k) =>
        Array.from({ length: k + 1 }, (_, j) => {
          const top = k === 3 && j === 3;
          if (top) return null;
          return (
            <rect
              key={`${k}-${j}`}
              x={70 + k * 32}
              y={110 - (j + 1) * 18}
              width={24}
              height={14}
              rx={4}
              fill={T}
              fillOpacity={0.08 + j * 0.05}
              stroke={T}
              strokeOpacity={0.5}
              strokeWidth={1.25}
            />
          );
        }),
      )}
      <Lift>
        <rect
          x={166}
          y={38}
          width={24}
          height={14}
          rx={4}
          fill={M}
          fillOpacity={0.3}
          stroke={M}
          strokeWidth={1.5}
        />
        <path d="M74 70Q130 58 178 24" stroke={M} strokeWidth={2} />
        <path d="M169 25L178 24L176 33" stroke={M} strokeWidth={2} />
      </Lift>
    </>
  );
}

// Časová osa kroků, lupa nad jedním z nich.
function Dohledatelnost() {
  const nodes = [32, 58, 84, 110];
  return (
    <>
      <path d="M44 26V114" stroke={FAINT} strokeWidth={1.5} />
      {nodes.map((y) => {
        const on = y === 84;
        return (
          <g key={y}>
            <circle
              cx={44}
              cy={y}
              r={4}
              fill={on ? M : N}
              stroke={on ? M : T}
              strokeOpacity={on ? 1 : 0.6}
              strokeWidth={1.5}
            />
            <rect
              x={58}
              y={y - 8}
              width={96}
              height={16}
              rx={8}
              fill={on ? M : T}
              fillOpacity={on ? 0.12 : 0.05}
              stroke={on ? M : T}
              strokeOpacity={on ? 0.7 : 0.28}
              strokeWidth={1.25}
            />
            <Bar x={68} y={y} w={on ? 52 : 40} color={on ? M : T} opacity={on ? 0.45 : 0.2} />
          </g>
        );
      })}
      <Lift>
        <circle
          cx={172}
          cy={78}
          r={24}
          fill={N}
          fillOpacity={0.88}
          stroke={T}
          strokeWidth={2}
        />
        <Bar x={158} y={72} w={26} color={M} opacity={0.75} />
        <Bar x={158} y={84} w={16} opacity={0.45} />
        <path d="M189 95L204 110" stroke={T} strokeWidth={5} />
      </Lift>
    </>
  );
}

// Řetěz kroků; přepne se jeden přepínač a změní se jen jeden článek.
function ZmenaPravidla() {
  const nodes = [36, 78, 162, 204];
  return (
    <>
      <path d="M36 94H204" stroke={FAINT} strokeWidth={1.5} />
      {nodes.map((x) => (
        <g key={x}>
          <circle cx={x} cy={94} r={10} fill={N} stroke={DIM} strokeWidth={1.5} />
          <circle cx={x} cy={94} r={2.5} fill={DIM} />
        </g>
      ))}
      <circle cx={120} cy={94} r={20} stroke={M} strokeOpacity={0.22} strokeWidth={1} />
      <circle
        cx={120}
        cy={94}
        r={13}
        fill={M}
        fillOpacity={0.2}
        stroke={M}
        strokeWidth={2}
      />
      <circle cx={120} cy={94} r={4} fill={M} />
      <path
        d="M120 50V78"
        stroke={M}
        strokeOpacity={0.6}
        strokeWidth={1.5}
        strokeDasharray="2 4"
      />
      <Lift>
        <rect
          x={98}
          y={26}
          width={44}
          height={22}
          rx={11}
          fill={M}
          fillOpacity={0.18}
          stroke={M}
          strokeWidth={1.75}
        />
        <circle cx={131} cy={37} r={7} fill={M} />
      </Lift>
    </>
  );
}

// ---------------------------------------------------------------------------
// Automatizace
// ---------------------------------------------------------------------------

// Pole dokladu samo doteče do tabulky.
function BezPrepisovani() {
  const rows = [44, 70, 96];
  const fields = [58, 76, 94];
  return (
    <>
      <rect
        x={22}
        y={26}
        width={58}
        height={88}
        rx={8}
        fill={N}
        stroke={T}
        strokeOpacity={0.5}
        strokeWidth={1.5}
      />
      <Bar x={32} y={40} w={24} opacity={0.35} />
      {fields.map((y) => (
        <rect
          key={y}
          x={32}
          y={y - 5}
          width={38}
          height={10}
          rx={3}
          fill={T}
          fillOpacity={0.08}
          stroke={T}
          strokeOpacity={0.35}
          strokeWidth={1.25}
        />
      ))}
      {fields.map((y, i) => (
        <g key={y}>
          <path
            d={`M80 ${y}C104 ${y} 108 ${rows[i]} 132 ${rows[i]}`}
            stroke={T}
            strokeOpacity={0.45}
            strokeWidth={1.5}
            strokeDasharray="2 5"
          />
          <circle cx={106} cy={(y + rows[i]) / 2} r={2.6} fill={M} />
        </g>
      ))}
      <Lift>
        <rect
          x={132}
          y={30}
          width={86}
          height={80}
          rx={10}
          fill={N}
          stroke={M}
          strokeOpacity={0.8}
          strokeWidth={1.75}
        />
        <rect x={132} y={30} width={86} height={80} rx={10} fill={M} fillOpacity={0.06} />
        <path d="M132 57H218M132 83H218" stroke={M} strokeOpacity={0.22} strokeWidth={1.25} />
        <path d="M161 30V110M190 30V110" stroke={M} strokeOpacity={0.18} strokeWidth={1.25} />
        {rows.map((y) => (
          <g key={y}>
            <Bar x={140} y={y} w={13} color={M} opacity={0.55} />
            <Bar x={169} y={y} w={13} color={M} opacity={0.55} />
            <Tick cx={204} cy={y} r={6} />
          </g>
        ))}
      </Lift>
    </>
  );
}

// Dotaz a odpověď, která přiletí dřív, než se čeká.
function OdpovedDriv() {
  return (
    <>
      <Bubble x={24} y={24} w={104} h={36} side="left" tone="plain" />
      <Bar x={36} y={37} w={60} opacity={0.25} />
      <Bar x={36} y={48} w={40} opacity={0.25} />
      <Lift>
        <path
          d="M74 84h18M64 94h28M78 104h14"
          stroke={M}
          strokeOpacity={0.55}
          strokeWidth={2}
        />
        <Bubble x={104} y={74} w={112} h={40} side="right" tone="mint" />
        <Bar x={116} y={88} w={70} color={M} opacity={0.55} />
        <Bar x={116} y={99} w={46} color={M} opacity={0.55} />
        <Tick cx={214} cy={74} r={8} />
      </Lift>
    </>
  );
}

// Řádek, který nesedí, se ozve hned.
function NesrovnalostHned() {
  const rows = [42, 62, 82, 102];
  return (
    <>
      <rect
        x={26}
        y={22}
        width={150}
        height={96}
        rx={12}
        fill={N}
        stroke={T}
        strokeOpacity={0.5}
        strokeWidth={1.5}
      />
      {rows.map((y) =>
        y === 62 ? (
          <g key={y}>
            <rect
              x={34}
              y={53}
              width={134}
              height={18}
              rx={6}
              fill={M}
              fillOpacity={0.1}
              stroke={M}
              strokeOpacity={0.55}
              strokeWidth={1.25}
            />
            <Bar x={42} y={62} w={56} color={M} opacity={0.5} />
            <Bar x={112} y={59} w={18} color={M} opacity={0.7} width={3} />
            <Bar x={136} y={65} w={22} color={M} opacity={0.7} width={3} />
          </g>
        ) : (
          <g key={y}>
            <Bar x={42} y={y} w={56} />
            <Bar x={112} y={y} w={46} />
          </g>
        ),
      )}
      <path d="M168 62H186" stroke={M} strokeWidth={1.75} />
      <Lift>
        <circle cx={198} cy={62} r={22} stroke={M} strokeOpacity={0.16} strokeWidth={1.25} />
        <circle cx={198} cy={62} r={15} stroke={M} strokeOpacity={0.35} strokeWidth={1.25} />
        <circle
          cx={198}
          cy={62}
          r={9}
          fill={M}
          fillOpacity={0.25}
          stroke={M}
          strokeWidth={1.75}
        />
        <path d="M198 57V63" stroke={M} strokeWidth={2} />
        <circle cx={198} cy={67} r={1.3} fill={M} />
      </Lift>
    </>
  );
}

// Měsíc za měsícem odejde obálka — i ten pod mrakem.
function PravidelneRozesilky() {
  const tiles = [0, 1, 2, 3, 4, 5];
  return (
    <>
      <path d="M26 106H210" stroke={FAINT} strokeWidth={1.25} />
      <path d="M205 102L211 106L205 110" stroke={FAINT} strokeWidth={1.25} />
      {tiles.map((i) => {
        const x = 26 + i * 32;
        const storm = i === 3;
        return (
          <g key={i}>
            <rect
              x={x}
              y={50}
              width={26}
              height={34}
              rx={7}
              fill={storm ? FAINT : N}
              fillOpacity={storm ? 0.35 : 1}
              stroke={storm ? DIM : T}
              strokeOpacity={storm ? 1 : 0.4}
              strokeWidth={1.4}
            />
            <circle cx={x + 13} cy={96} r={3} fill={M} fillOpacity={0.75} />
          </g>
        );
      })}
      <path
        d="M127 42a5 5 0 0 1 2-9.5a7 7 0 0 1 13 1a4.5 4.5 0 0 1 1 8.5Z"
        fill={N}
        stroke={DIM}
        strokeWidth={1.4}
      />
      <path d="M131 45l-2 4M139 45l-2 4" stroke={DIM} strokeWidth={1.4} />
      <Lift>
        {tiles.map((i) => {
          const x = 26 + i * 32;
          return (
            <g key={i}>
              <rect
                x={x + 5}
                y={61}
                width={16}
                height={12}
                rx={2}
                fill={M}
                fillOpacity={0.14}
                stroke={M}
                strokeWidth={1.4}
              />
              <path d={`M${x + 5} 62l8 6l8 -6`} stroke={M} strokeWidth={1.4} />
            </g>
          );
        })}
      </Lift>
    </>
  );
}

// Z několika nástrojů se vybere ten, který do případu přesně zapadne.
function SpravnyNastroj() {
  return (
    <>
      <circle cx={44} cy={34} r={13} fill={N} stroke={DIM} strokeWidth={1.5} />
      <GearIcon x={35} y={25} width={18} height={18} className="text-[#6f665a]" />
      <rect
        x={31}
        y={57}
        width={26}
        height={26}
        rx={7}
        stroke={DIM}
        strokeWidth={1.25}
        strokeDasharray="3 4"
      />
      <path
        d="M44 93L55 99.5V112.5L44 119L33 112.5V99.5Z"
        fill={N}
        stroke={DIM}
        strokeWidth={1.5}
      />
      <circle cx={44} cy={106} r={3} fill={DIM} />
      <path
        d="M60 66C88 36 118 38 144 58"
        stroke={M}
        strokeOpacity={0.6}
        strokeWidth={1.5}
        strokeDasharray="2 5"
      />
      <rect
        x={128}
        y={30}
        width={90}
        height={80}
        rx={14}
        fill={T}
        fillOpacity={0.05}
        stroke={T}
        strokeOpacity={0.45}
        strokeWidth={1.5}
      />
      <rect
        x={148}
        y={46}
        width={48}
        height={48}
        rx={13}
        stroke={M}
        strokeOpacity={0.3}
        strokeWidth={1}
      />
      <Lift>
        <rect
          x={152}
          y={50}
          width={40}
          height={40}
          rx={10}
          fill={M}
          fillOpacity={0.2}
          stroke={M}
          strokeWidth={2}
        />
        <path d="M166 62l-6 8l6 8M178 62l6 8l-6 8" stroke={M} strokeWidth={2} />
      </Lift>
    </>
  );
}

// ---------------------------------------------------------------------------
// Voice agenti
// ---------------------------------------------------------------------------

// V noci zvoní telefon — a ozve se hlas.
function OdezvaMimoDobu() {
  const waves: Array<[number, number, number, number, number]> = [
    // r, x, yTop, yBottom, opacity
    [40, 144.8, 51, 97, 0.9],
    [52, 154.6, 44.2, 103.8, 0.6],
    [64, 164.4, 37.3, 110.7, 0.3],
  ];
  return (
    <>
      <Moon cx={50} cy={38} r={14} />
      <Twinkle x={26} y={64} />
      <Twinkle x={78} y={20} s={0.8} />
      <Twinkle x={40} y={104} s={0.7} />
      <circle
        cx={112}
        cy={74}
        r={30}
        fill={T}
        fillOpacity={0.08}
        stroke={T}
        strokeOpacity={0.5}
        strokeWidth={1.5}
      />
      <PhoneIcon x={96} y={58} width={32} height={32} className="text-accent" />
      <Lift>
        {waves.map(([r, x, y1, y2, o]) => (
          <path
            key={r}
            d={`M${x} ${y1}A${r} ${r} 0 0 1 ${x} ${y2}`}
            stroke={M}
            strokeOpacity={o}
            strokeWidth={2}
          />
        ))}
      </Lift>
    </>
  );
}

// Hovory projdou sítem; k člověku dojde jen ten, který ho potřebuje.
function HovoryProCloveka() {
  const lines = [28, 49, 70, 91, 112];
  return (
    <>
      {lines.map((y) => (
        <g key={y}>
          <path
            d={`M22 ${y}C62 ${y} 70 70 96 70`}
            stroke={T}
            strokeOpacity={0.3}
            strokeWidth={1.5}
          />
          <circle cx={22} cy={y} r={3} fill={T} fillOpacity={0.6} />
        </g>
      ))}
      <circle
        cx={110}
        cy={70}
        r={14}
        fill={N}
        stroke={T}
        strokeOpacity={0.75}
        strokeWidth={1.75}
      />
      <FunnelIcon x={101} y={61} width={18} height={18} className="text-accent" />
      <path d="M124 70C150 70 150 102 170 102" stroke={T} strokeOpacity={0.4} strokeWidth={1.5} />
      <rect
        x={170}
        y={88}
        width={46}
        height={28}
        rx={8}
        fill={T}
        fillOpacity={0.08}
        stroke={T}
        strokeOpacity={0.4}
        strokeWidth={1.25}
      />
      <Tick cx={183} cy={102} r={6} />
      <Bar x={194} y={98} w={12} width={3} opacity={0.35} />
      <Bar x={194} y={106} w={8} width={3} opacity={0.35} />
      <Lift>
        <path d="M124 70C150 70 150 38 168 38" stroke={M} strokeWidth={2} />
        <circle cx={190} cy={38} r={27} stroke={M} strokeOpacity={0.18} strokeWidth={1} />
        <circle
          cx={190}
          cy={38}
          r={19}
          fill={M}
          fillOpacity={0.16}
          stroke={M}
          strokeWidth={1.75}
        />
        <Person cx={190} cy={38} color={M} />
      </Lift>
    </>
  );
}

// Přeškrtnuté přesýpací hodiny; telefon rovnou mluví.
function BezCekani() {
  const heights = [8, 16, 26, 18, 34, 22, 40, 24, 30, 16, 22, 12, 8];
  return (
    <>
      <path
        d="M31 22H49M31 56H49M33 22C33 34 47 42 47 56M47 22C47 34 33 42 33 56"
        stroke={DIM}
        strokeWidth={1.5}
      />
      <path d="M25 60L55 18" stroke={DIM} strokeWidth={1.75} />
      <circle
        cx={46}
        cy={94}
        r={17}
        fill={T}
        fillOpacity={0.1}
        stroke={T}
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />
      <PhoneIcon x={36} y={84} width={20} height={20} className="text-accent" />
      <path d="M63 94H88" stroke={M} strokeWidth={2} />
      <Lift>
        <rect
          x={88}
          y={62}
          width={128}
          height={64}
          rx={16}
          fill={M}
          fillOpacity={0.1}
          stroke={M}
          strokeWidth={1.75}
        />
        {heights.map((h, i) => (
          <path
            key={i}
            d={`M${100 + i * 9} ${94 - h / 2}V${94 + h / 2}`}
            stroke={M}
            strokeOpacity={0.8}
            strokeWidth={3}
          />
        ))}
      </Lift>
    </>
  );
}

// Hlas → přepis → e-mail a termín.
function ZaznamHovoru() {
  const heights = [10, 22, 14, 30, 18, 26, 12, 8];
  const lines = [46, 56, 66, 76, 86, 96];
  return (
    <>
      {heights.map((h, i) => (
        <path
          key={i}
          d={`M${24 + i * 7} ${70 - h / 2}V${70 + h / 2}`}
          stroke={T}
          strokeOpacity={0.6}
          strokeWidth={3}
        />
      ))}
      <path d="M82 70H96M91 65L96 70L91 75" stroke={T} strokeOpacity={0.5} strokeWidth={1.5} />
      <rect
        x={100}
        y={28}
        width={48}
        height={84}
        rx={8}
        fill={N}
        stroke={T}
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />
      {lines.map((y, i) => (
        <Bar key={y} x={110} y={y} w={i % 2 === 0 ? 28 : 20} width={3} opacity={0.3} />
      ))}
      <Lift>
        <path d="M148 58C166 58 168 40 182 40" stroke={M} strokeWidth={1.75} />
        <path d="M148 82C166 82 168 100 182 100" stroke={M} strokeWidth={1.75} />
        <circle
          cx={200}
          cy={40}
          r={17}
          fill={M}
          fillOpacity={0.14}
          stroke={M}
          strokeWidth={1.75}
        />
        <MailIcon x={190} y={30} width={20} height={20} className="text-accent-hover" />
        <circle
          cx={200}
          cy={100}
          r={17}
          fill={M}
          fillOpacity={0.14}
          stroke={M}
          strokeWidth={1.75}
        />
        <CalendarCheckIcon x={190} y={90} width={20} height={20} className="text-accent-hover" />
      </Lift>
    </>
  );
}

// Telefon a e-mail, dvě stejně silné cesty do jednoho zpracování.
function TelefonJakoEmail() {
  return (
    <>
      <circle
        cx={40}
        cy={36}
        r={17}
        fill={T}
        fillOpacity={0.1}
        stroke={T}
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />
      <PhoneIcon x={30} y={26} width={20} height={20} className="text-accent" />
      <circle
        cx={40}
        cy={104}
        r={17}
        fill={T}
        fillOpacity={0.1}
        stroke={T}
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />
      <MailIcon x={30} y={94} width={20} height={20} className="text-accent" />
      <path d="M33 66h14M33 74h14" stroke={M} strokeOpacity={0.75} strokeWidth={2} />
      <path
        d="M57 36C92 36 92 70 120 70M57 104C92 104 92 70 120 70"
        stroke={T}
        strokeOpacity={0.7}
        strokeWidth={2}
      />
      <circle cx={88} cy={50} r={2.6} fill={M} />
      <circle cx={88} cy={90} r={2.6} fill={M} />
      <rect
        x={120}
        y={54}
        width={32}
        height={32}
        rx={10}
        fill={N}
        stroke={T}
        strokeWidth={1.75}
      />
      <SparkIcon x={127} y={61} width={18} height={18} className="text-accent" />
      <Lift>
        <path d="M152 70H180" stroke={M} strokeWidth={2} />
        <Tick cx={196} cy={70} r={14} />
      </Lift>
    </>
  );
}

// ---------------------------------------------------------------------------
// Chatboti a RAG
// ---------------------------------------------------------------------------

// Okno chatu v noci: dotaz a hned pod ním odpověď.
function OdpovedVNoci() {
  return (
    <>
      <Twinkle x={22} y={40} />
      <Twinkle x={222} y={98} s={0.8} />
      <rect
        x={40}
        y={18}
        width={160}
        height={104}
        rx={14}
        fill={N}
        stroke={T}
        strokeOpacity={0.5}
        strokeWidth={1.5}
      />
      <path d="M40 36H200" stroke={T} strokeOpacity={0.22} strokeWidth={1.25} />
      <circle cx={52} cy={27} r={2} fill={T} fillOpacity={0.45} />
      <circle cx={60} cy={27} r={2} fill={T} fillOpacity={0.45} />
      <circle cx={68} cy={27} r={2} fill={T} fillOpacity={0.45} />
      <Moon cx={186} cy={27} r={6} />
      <rect
        x={52}
        y={46}
        width={78}
        height={22}
        rx={9}
        fill={T}
        fillOpacity={0.06}
        stroke={T}
        strokeOpacity={0.35}
        strokeWidth={1.25}
      />
      <Bar x={62} y={57} w={50} width={3.5} opacity={0.3} />
      <Lift>
        <rect
          x={92}
          y={78}
          width={96}
          height={32}
          rx={10}
          fill={M}
          fillOpacity={0.16}
          stroke={M}
          strokeWidth={1.75}
        />
        <Bar x={104} y={89} w={64} color={M} opacity={0.6} width={3.5} />
        <Bar x={104} y={99} w={40} color={M} opacity={0.6} width={3.5} />
      </Lift>
    </>
  );
}

// Sloupec vyřízených dotazů; jeden odbočí k člověku.
function DotazyProCloveka() {
  const rows = [33, 57, 81, 105];
  return (
    <>
      {rows.map((cy) => {
        const human = cy === 81;
        return (
          <g key={cy}>
            <rect
              x={26}
              y={cy - 9}
              width={104}
              height={18}
              rx={9}
              fill={human ? M : T}
              fillOpacity={human ? 0.12 : 0.06}
              stroke={human ? M : T}
              strokeOpacity={human ? 1 : 0.35}
              strokeWidth={1.4}
            />
            <Bar
              x={38}
              y={cy}
              w={human ? 64 : 56}
              width={3.5}
              color={human ? M : T}
              opacity={human ? 0.5 : 0.25}
            />
            {human ? null : <Tick cx={118} cy={cy} r={6} />}
          </g>
        );
      })}
      <Lift>
        <path d="M130 81C150 81 152 70 164 70" stroke={M} strokeWidth={2} />
        <path d="M158 65L165 70L158 75" stroke={M} strokeWidth={2} />
        <circle cx={192} cy={70} r={28} stroke={M} strokeOpacity={0.18} strokeWidth={1} />
        <circle
          cx={192}
          cy={70}
          r={20}
          fill={M}
          fillOpacity={0.14}
          stroke={M}
          strokeWidth={1.75}
        />
        <Person cx={192} cy={70} color={M} />
      </Lift>
    </>
  );
}

// Odpověď s odkazem na konkrétní pasáž ve vašich dokumentech.
function ZVasichPodkladu() {
  const lines = [62, 72, 82, 92, 102];
  return (
    <>
      <rect
        x={162}
        y={34}
        width={52}
        height={70}
        rx={7}
        fill={N}
        stroke={T}
        strokeOpacity={0.22}
        strokeWidth={1.25}
      />
      <rect
        x={155}
        y={41}
        width={52}
        height={70}
        rx={7}
        fill={N}
        stroke={T}
        strokeOpacity={0.35}
        strokeWidth={1.25}
      />
      <rect
        x={148}
        y={48}
        width={52}
        height={70}
        rx={7}
        fill={N}
        stroke={T}
        strokeOpacity={0.6}
        strokeWidth={1.5}
      />
      {lines.map((y) => (y === 82 ? null : <Bar key={y} x={157} y={y} w={32} width={3} />))}
      <Bubble x={22} y={28} w={108} h={40} side="left" tone="mint" />
      <Bar x={34} y={42} w={66} color={M} opacity={0.5} />
      <Bar x={34} y={53} w={46} color={M} opacity={0.5} />
      <circle cx={116} cy={53} r={5} fill={M} />
      <Lift>
        <path
          d="M121 53C140 53 140 82 152 82"
          stroke={M}
          strokeWidth={1.5}
          strokeDasharray="2 4"
        />
        <rect
          x={153}
          y={77}
          width={40}
          height={10}
          rx={3}
          fill={M}
          fillOpacity={0.28}
          stroke={M}
          strokeWidth={1.25}
        />
      </Lift>
    </>
  );
}

// Police plná dokumentů; lupa najde tu jednu pasáž.
function RozsahlaDokumentace() {
  const rows = [26, 60, 94];
  const cols = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      {rows.map((y) => (
        <g key={y}>
          <path d={`M22 ${y + 28}H214`} stroke={FAINT} strokeWidth={1.25} />
          {cols.map((i) => {
            const x = 28 + i * 23;
            return (
              <g key={i}>
                <rect
                  x={x}
                  y={y}
                  width={14}
                  height={26}
                  rx={3}
                  fill={T}
                  fillOpacity={0.06}
                  stroke={T}
                  strokeOpacity={0.3}
                  strokeWidth={1.2}
                />
                <path
                  d={`M${x + 4} ${y + 6}h6`}
                  stroke={T}
                  strokeOpacity={0.3}
                  strokeWidth={1.2}
                />
              </g>
            );
          })}
        </g>
      ))}
      <Lift>
        <circle
          cx={150}
          cy={73}
          r={22}
          fill={N}
          fillOpacity={0.6}
          stroke={T}
          strokeWidth={2}
        />
        <rect
          x={143}
          y={60}
          width={14}
          height={26}
          rx={3}
          fill={M}
          fillOpacity={0.3}
          stroke={M}
          strokeWidth={1.5}
        />
        <path d="M147 66h6" stroke={M} strokeWidth={1.5} />
        <path d="M166 89L182 105" stroke={T} strokeWidth={5} />
      </Lift>
    </>
  );
}

// Úprava v podkladu → obnova → nová odpověď.
function ZmenaPodkladu() {
  const lines = [44, 56, 68, 80, 92];
  return (
    <>
      <rect
        x={24}
        y={28}
        width={60}
        height={84}
        rx={8}
        fill={N}
        stroke={T}
        strokeOpacity={0.55}
        strokeWidth={1.5}
      />
      {lines.map((y) =>
        y === 68 ? (
          <Bar key={y} x={34} y={y} w={30} color={M} opacity={0.85} width={3} />
        ) : (
          <Bar key={y} x={34} y={y} w={40} width={3} opacity={0.25} />
        ),
      )}
      <path
        d="M68 78L90 56L96 62L74 84Z"
        fill={N}
        stroke={T}
        strokeOpacity={0.8}
        strokeWidth={1.5}
      />
      <path d="M68 78L64 88L74 84" stroke={T} strokeOpacity={0.8} strokeWidth={1.5} />
      <path
        d="M112 70A14 14 0 0 1 136 60M130.2 58.4L136 60L134.4 54.2"
        stroke={M}
        strokeOpacity={0.8}
        strokeWidth={2}
      />
      <path
        d="M140 70A14 14 0 0 1 116 80M121.8 81.6L116 80L117.6 85.8"
        stroke={M}
        strokeOpacity={0.8}
        strokeWidth={2}
      />
      <Lift>
        <Bubble x={152} y={48} w={66} h={40} side="left" tone="mint" />
        <Bar x={162} y={62} w={40} color={M} opacity={0.6} />
        <Bar x={162} y={73} w={26} color={M} opacity={0.6} />
      </Lift>
    </>
  );
}

// ---------------------------------------------------------------------------

// `Record<BenefitArt, …>` je povinná protistrana typu v lib/data/automation-pages.ts:
// přibude-li klíč, TypeScript ohlásí chybu tady, ne až prázdný panel na webu.
const SCENES: Record<BenefitArt, () => ReactNode> = {
  "agenda-bezi-dal": AgendaBeziDal,
  "vase-pravidla": VasePravidla,
  "rust-bez-nabirani": RustBezNabirani,
  dohledatelnost: Dohledatelnost,
  "zmena-pravidla": ZmenaPravidla,
  "bez-prepisovani": BezPrepisovani,
  "odpoved-driv": OdpovedDriv,
  "nesrovnalost-hned": NesrovnalostHned,
  "pravidelne-rozesilky": PravidelneRozesilky,
  "spravny-nastroj": SpravnyNastroj,
  "odezva-mimo-dobu": OdezvaMimoDobu,
  "hovory-pro-cloveka": HovoryProCloveka,
  "bez-cekani": BezCekani,
  "zaznam-hovoru": ZaznamHovoru,
  "telefon-jako-email": TelefonJakoEmail,
  "odpoved-v-noci": OdpovedVNoci,
  "dotazy-pro-cloveka": DotazyProCloveka,
  "z-vasich-podkladu": ZVasichPodkladu,
  "rozsahla-dokumentace": RozsahlaDokumentace,
  "zmena-podkladu": ZmenaPodkladu,
};

export default function BenefitArtwork({ art }: { art: BenefitArt }) {
  const Scene = SCENES[art];

  return (
    <div className="benefit-panel h-full w-full overflow-hidden rounded-sm">
      <svg
        viewBox="0 0 240 140"
        preserveAspectRatio="xMidYMid meet"
        className="h-full w-full"
        aria-hidden="true"
        focusable="false"
      >
        <ellipse cx={120} cy={128} rx={82} ry={5} fill={M} fillOpacity={0.07} />
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <Scene />
        </g>
      </svg>
    </div>
  );
}
