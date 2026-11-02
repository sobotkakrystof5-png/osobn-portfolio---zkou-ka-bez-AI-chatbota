"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { EASE, iso } from "@/components/automation/scenes3d/iso";

// Karta „ve vzduchu“ s nadpisem a řádky s fajfkou (pravidla, záznam,
// vytažené údaje). Ukotvená spodním středem k bodu scény, nezkosená, ať se
// dobře čte. Řádky se odškrtávají postupně, `match` řádek zezlátne.
export type RuleRow = { text: string; on: boolean; match?: boolean; warn?: boolean };

const SIZE = 12;

export function RuleCard({
  x,
  y,
  z = 0,
  show,
  title,
  icon: Icon,
  rows,
  instant = false,
  dx = 0,
}: {
  x: number;
  y: number;
  z?: number;
  show: boolean;
  title: string;
  icon: LucideIcon;
  rows: RuleRow[];
  instant?: boolean;
  dx?: number;
}) {
  const [sx, sy] = iso(x, y, z);
  const longest = Math.max(title.length, ...rows.map((row) => row.text.length));
  const width = longest * SIZE * 0.56 + 52;
  const rowH = 23;
  const height = 34 + rows.length * rowH + 6;
  const left = -width / 2 + dx;
  const top = -height;

  return (
    <g transform={`translate(${sx.toFixed(1)} ${sy.toFixed(1)})`} pointerEvents="none">
      <motion.g
        initial={false}
        animate={{ opacity: show ? 1 : 0, y: show ? 0 : 12 }}
        transition={{ duration: instant ? 0 : 0.45, ease: EASE }}
      >
        <rect x={left} y={top} width={width} height={height} rx={2} fill="#0f0e0b" stroke="rgba(201,168,76,0.5)" />
        <rect x={left} y={top} width={width} height={2} fill="#c9a84c" />
        <Icon x={left + 12} y={top + 11} width={13} height={13} strokeWidth={2} color="#c9a84c" />
        <text x={left + 32} y={top + 18} dominantBaseline="central" fontSize={11} fontWeight={500} letterSpacing="1.4" fill="#a39a8b" className="font-inter">
          {title.toUpperCase()}
        </text>
        {rows.map((row, index) => {
          const rowTop = top + 34 + index * rowH;
          const color = row.warn ? "#e0a54a" : "#c9a84c";
          return (
            <g key={row.text}>
              {row.match ? (
                <motion.rect
                  x={left + 6}
                  y={rowTop - 2}
                  width={width - 12}
                  height={rowH - 2}
                  fill={row.warn ? "rgba(224,165,74,0.16)" : "rgba(201,168,76,0.18)"}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : null}
              <motion.g
                initial={false}
                animate={{ opacity: show && row.on ? 1 : 0.15, scale: show && row.on ? 1 : 0.6 }}
                transition={{ duration: instant ? 0 : 0.3, delay: instant || !show ? 0 : 0.25 + index * 0.35 }}
              >
                <circle cx={left + 18.5} cy={rowTop + rowH / 2 - 1} r={7} fill={color} />
                <Check x={left + 14} y={rowTop + rowH / 2 - 5.5} width={9} height={9} strokeWidth={3.4} color="#080808" />
              </motion.g>
              <text x={left + 32} y={rowTop + rowH / 2 - 1} dominantBaseline="central" fontSize={SIZE} fill={row.match ? "#f0ece6" : "#c3bbad"} className="font-inter">
                {row.text}
              </text>
            </g>
          );
        })}
      </motion.g>
    </g>
  );
}
