"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

// Izometrická výbava 3D scén podstránek automatizace. Svět: x a y leží na
// podlaze, z míří nahoru. Promítá se do SVG (bez WebGL), takže se scéna
// škáluje s šířkou a nic se nestahuje. Kreslí se odzadu dopředu: co má
// menší x + y, kreslí se dřív.

export type Vec = [number, number];

export const iso = (x: number, y: number, z = 0): Vec => [(x - y) * 0.866, (x + y) * 0.5 - z];

export const path = (points: Vec[]) =>
  `M${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(" L")} Z`;

/** Položí 2D kresbu na podlahu (u podél x, v podél y). */
export const FLOOR = "matrix(0.866 0.5 -0.866 0.5 0 0)";
export const at = (x: number, y: number, z = 0) => {
  const [sx, sy] = iso(x, y, z);
  return `translate(${sx.toFixed(1)} ${sy.toFixed(1)})`;
};
/** Stěna čelem k +y (vlevo vpředu): u doprava podél x, v dolů. Počátek = levý horní roh. */
export const wallY = (x: number, y: number, z: number) => {
  const [sx, sy] = iso(x, y, z);
  return `matrix(0.866 0.5 0 1 ${sx.toFixed(1)} ${sy.toFixed(1)})`;
};
/** Stěna čelem k +x (vpravo vpředu): u doprava podél −y, v dolů. */
export const wallX = (x: number, y: number, z: number) => {
  const [sx, sy] = iso(x, y, z);
  return `matrix(0.866 -0.5 0 1 ${sx.toFixed(1)} ${sy.toFixed(1)})`;
};

export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export type Tone = { top: string; left: string; right: string; edge: string };

export const TONE = {
  dark: { top: "#191919", left: "#0d0d0d", right: "#131313", edge: "rgba(201,168,76,0.24)" },
  raised: { top: "#202020", left: "#111111", right: "#171717", edge: "rgba(201,168,76,0.32)" },
  soft: { top: "#221d12", left: "#110e08", right: "#19150d", edge: "rgba(201,168,76,0.6)" },
  gold: { top: "#d6b45c", left: "#6f5a28", right: "#9c813e", edge: "#e8cd80" },
  paper: { top: "#f0ece6", left: "#8f887d", right: "#bdb6aa", edge: "#fffaf2" },
  warn: { top: "#3a2a14", left: "#1c1409", right: "#2a1e0e", edge: "#e0a54a" },
} satisfies Record<string, Tone>;

export function boxFaces(x: number, y: number, w: number, d: number, h: number, z = 0) {
  const x1 = x + w;
  const y1 = y + d;
  const zt = z + h;
  return {
    top: path([iso(x, y, zt), iso(x1, y, zt), iso(x1, y1, zt), iso(x, y1, zt)]),
    left: path([iso(x, y1, zt), iso(x1, y1, zt), iso(x1, y1, z), iso(x, y1, z)]),
    right: path([iso(x1, y, zt), iso(x1, y1, zt), iso(x1, y1, z), iso(x1, y, z)]),
  };
}

/** Kvádr s rohem v (x, y, z), rozměry w × d × h. Barvy se mění plynule. */
export function Box({
  x,
  y,
  z = 0,
  w,
  d,
  h,
  tone = TONE.dark,
  strokeWidth = 1,
  instant = false,
}: {
  x: number;
  y: number;
  z?: number;
  w: number;
  d: number;
  h: number;
  tone?: Tone;
  strokeWidth?: number;
  instant?: boolean;
}) {
  const faces = boxFaces(x, y, w, d, h, z);
  const transition = { duration: instant ? 0 : 0.5 };
  return (
    <g strokeLinejoin="round" strokeWidth={strokeWidth}>
      <motion.path d={faces.left} initial={false} animate={{ fill: tone.left, stroke: tone.edge }} transition={transition} />
      <motion.path d={faces.right} initial={false} animate={{ fill: tone.right, stroke: tone.edge }} transition={transition} />
      <motion.path d={faces.top} initial={false} animate={{ fill: tone.top, stroke: tone.edge }} transition={transition} />
    </g>
  );
}

/** Podlaha s izometrickou mřížkou, k okrajům mizí (maska z SceneFrame). */
export function Floor({ from, to, step = 40 }: { from: number; to: number; step?: number }) {
  const lines: ReactNode[] = [];
  for (let v = from; v <= to; v += step) {
    const [ax, ay] = iso(v, from);
    const [bx, by] = iso(v, to);
    const [cx, cy] = iso(from, v);
    const [dx, dy] = iso(to, v);
    lines.push(<line key={`a${v}`} x1={ax} y1={ay} x2={bx} y2={by} />, <line key={`b${v}`} x1={cx} y1={cy} x2={dx} y2={dy} />);
  }
  return (
    <g mask="url(#s3d-fade)" stroke="#ffffff" strokeOpacity="0.055" strokeWidth={1}>
      {lines}
    </g>
  );
}

/** Kruh ležící na podlaze (nebo ve výšce z), volitelně pulzuje. */
export function FloorRing({ x, y, z = 0, r, pulse = false, show = true, dashed = false }: { x: number; y: number; z?: number; r: number; pulse?: boolean; show?: boolean; dashed?: boolean }) {
  return (
    <g transform={`${at(x, y, z)} ${FLOOR}`}>
      <motion.circle
        r={r}
        fill="none"
        stroke="#c9a84c"
        strokeWidth={1.2}
        strokeDasharray={dashed ? "3 7" : undefined}
        initial={false}
        animate={{ opacity: show ? 0.5 : 0 }}
        transition={{ duration: 0.4 }}
      />
      {pulse && show ? (
        <motion.circle
          fill="none"
          stroke="#c9a84c"
          strokeWidth={1.2}
          initial={{ r, opacity: 0.8 }}
          animate={{ r: r * 1.9, opacity: 0 }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
        />
      ) : null}
    </g>
  );
}

/** Záře na podlaze pod aktivním objektem. */
export function Glow({ x, y, z = 0, r, show }: { x: number; y: number; z?: number; r: number; show: boolean }) {
  return (
    <g transform={`${at(x, y, z)} ${FLOOR}`}>
      <motion.circle r={r} fill="url(#s3d-glow)" initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.5 }} />
    </g>
  );
}

type TagVariant = "dark" | "gold" | "paper" | "warn";

const TAG_STYLE: Record<TagVariant, { fill: string; stroke: string; text: string; icon: string }> = {
  dark: { fill: "#0f0e0b", stroke: "rgba(201,168,76,0.45)", text: "#f0ece6", icon: "#c9a84c" },
  gold: { fill: "#c9a84c", stroke: "#e8cd80", text: "#080808", icon: "#080808" },
  paper: { fill: "#f0ece6", stroke: "#ffffff", text: "#141414", icon: "#8a6f2c" },
  warn: { fill: "#24190b", stroke: "#e0a54a", text: "#f3d6a6", icon: "#e0a54a" },
};

// Šířka textu v Interu odhadem (SVG text nejde změřit před vykreslením).
const textWidth = (text: string, size: number) => text.length * size * 0.56;

/**
 * Štítek „ve vzduchu“ (nezkosený, ať se dobře čte), ukotvený k bodu scény.
 * `anchor` = spodní střed štítku. Objeví se a zmizí podle `show`.
 */
export function Tag({
  x,
  y,
  z = 0,
  label,
  sub,
  icon: Icon,
  variant = "dark",
  show,
  size = 12.5,
  dx = 0,
  instant = false,
  stem = false,
}: {
  x: number;
  y: number;
  z?: number;
  label: string;
  sub?: string;
  icon?: LucideIcon;
  variant?: TagVariant;
  show: boolean;
  size?: number;
  dx?: number;
  instant?: boolean;
  stem?: boolean;
}) {
  const style = TAG_STYLE[variant];
  const [sx, sy] = iso(x, y, z);
  const iconSpace = Icon ? size + 8 : 0;
  const subSize = size * 0.82;
  const width = Math.max(textWidth(label, size), sub ? textWidth(sub, subSize) : 0) + iconSpace + 22;
  const height = sub ? size * 2.9 + 6 : size * 2.1 + 4;
  const left = -width / 2 + dx;
  const top = -height - (stem ? 14 : 0);

  return (
    <g transform={`translate(${sx.toFixed(1)} ${sy.toFixed(1)})`} pointerEvents="none">
    <motion.g
      initial={false}
      animate={{ opacity: show ? 1 : 0, y: show ? 0 : 10 }}
      transition={{ duration: instant ? 0 : 0.4, ease: EASE }}
    >
      {stem ? <line x1={dx} y1={-14} x2={0} y2={0} stroke={style.stroke} strokeWidth={1} /> : null}
      <rect x={left} y={top} width={width} height={height} rx={2} fill={style.fill} stroke={style.stroke} strokeWidth={1} />
      {Icon ? <Icon x={left + 11} y={top + (sub ? height / 2 - size / 2 : (height - size) / 2)} width={size} height={size} strokeWidth={2} color={style.icon} /> : null}
      <text
        x={left + 11 + iconSpace}
        y={sub ? top + size + 6 : top + height / 2}
        dominantBaseline={sub ? "auto" : "central"}
        fontSize={size}
        fontWeight={500}
        fill={style.text}
        className="font-inter"
      >
        {label}
      </text>
      {sub ? (
        <text x={left + 11 + iconSpace} y={top + size * 2.35 + 6} fontSize={subSize} fill={style.text} opacity={0.72} className="font-inter">
          {sub}
        </text>
      ) : null}
    </motion.g>
    </g>
  );
}

/** Tečky, které tečou z bodu do bodu (v obrazovkových souřadnicích). */
export function Stream({ from, to, active, count = 3, duration = 1.1, delay = 0, r = 2.6 }: { from: Vec; to: Vec; active: boolean; count?: number; duration?: number; delay?: number; r?: number }) {
  if (!active) return null;
  return (
    <g>
      {Array.from({ length: count }, (_, i) => (
        <motion.circle
          key={i}
          r={r}
          fill="#e8cd80"
          initial={{ cx: from[0], cy: from[1], opacity: 0 }}
          animate={{ cx: [from[0], to[0]], cy: [from[1], to[1]], opacity: [0, 1, 1, 0] }}
          transition={{ duration, delay: delay + (i * duration) / count, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </g>
  );
}

/** Spojnice na podlaze mezi dvěma body světa (z = 0), čárkovaná, může „téct“. */
export function FloorLine({ a, b, lit, flow = true, reduced }: { a: Vec; b: Vec; lit: boolean; flow?: boolean; reduced: boolean }) {
  const [ax, ay] = iso(a[0], a[1]);
  const [bx, by] = iso(b[0], b[1]);
  return (
    <motion.line
      x1={ax}
      y1={ay}
      x2={bx}
      y2={by}
      stroke="#c9a84c"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeDasharray="3 8"
      initial={false}
      animate={{ strokeOpacity: lit ? 0.95 : 0.22, strokeDashoffset: flow && !reduced ? [0, -22] : 0 }}
      transition={{ strokeOpacity: { duration: 0.4 }, strokeDashoffset: { duration: 1, repeat: Infinity, ease: "linear" } }}
    />
  );
}

/** Ikona stojící zpříma nad bodem scény (čitelnější než ikona ležící na víku). */
export function Glyph({ x, y, z, icon: Icon, size = 26, color = "#c9a84c" }: { x: number; y: number; z: number; icon: LucideIcon; size?: number; color?: string }) {
  return (
    <g transform={at(x, y, z)}>
      <Icon x={-size / 2} y={-size / 2} width={size} height={size} strokeWidth={1.6} color={color} />
    </g>
  );
}
