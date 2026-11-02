"use client";

import { motion } from "framer-motion";
import { AudioLines, CalendarDays, Check, MessageSquareText, NotebookPen, PhoneIncoming, Target } from "lucide-react";
import { SceneFrame, type ScenePhase } from "@/components/automation/scenes3d/SceneFrame";
import { Box, EASE, FLOOR, Floor, Glow, Stream, Tag, TONE, at, boxFaces, iso, wallY } from "@/components/automation/scenes3d/iso";

// Voice agent: zazvoní telefon, agent hovor zvedne, ekvalizér ukazuje, že
// poslouchá, nad ním se objeví přepis a rozpoznaný záměr. V 3D kalendáři
// se zvedne volný termín a zákazníkovi odejde SMS s potvrzením. Služba se
// teprve připravuje, proto dokonavá slovesa (= budoucí čas) v popiscích.

const PHASES: ScenePhase[] = [
  { caption: "Zazvoní telefon a agent hovor zvedne.", ms: 2000 },
  { caption: "Poslouchá a rozumí, co zákazník chce.", ms: 2500 },
  { caption: "Pozná záměr: objednání termínu.", ms: 1800 },
  { caption: "V kalendáři najde volný termín a domluví ho.", ms: 2400 },
  { caption: "Hovor zapíše a zákazníkovi pošle SMS s potvrzením.", ms: 2400 },
];

const PHONE = { x: -150, y: -22, w: 52, d: 12, z: 10, h: 104 };
const EQ = { x: -50, y: -78, w: 124, d: 40 };
const BARS = Array.from({ length: 9 }, (_, i) => EQ.x + 8 + i * 12.6);
// Výšky sloupců ekvalizéru během řeči (smyčka), každý sloupec posunutý.
const SPEECH = [10, 34, 18, 46, 24, 38, 12, 30, 20];

const CAL = { x: 40, y: 28, s: 26, gap: 7, cols: 5, rows: 3 };
const DAYS = ["Po", "Út", "St", "Čt", "Pá"];
const BUSY = new Set(["0-0", "0-2", "1-0", "2-1", "3-0", "3-2", "4-1", "2-2"]);
const PICK = { col: 1, row: 1 };
const tile = (col: number, row: number) => ({ x: CAL.x + col * (CAL.s + CAL.gap), y: CAL.y + row * (CAL.s + CAL.gap) });

function Bar({ x, index, talking, reduced }: { x: number; index: number; talking: boolean; reduced: boolean }) {
  const heights = talking && !reduced ? [6, SPEECH[index], 8, SPEECH[(index + 3) % 9], 6] : [6, 6];
  const frames = heights.map((h) => boxFaces(x, EQ.y + 13, 7, 14, h, 8));
  const transition = talking && !reduced ? { duration: 1.1, repeat: Infinity, delay: index * 0.07, ease: "easeInOut" as const } : { duration: 0.3 };
  return (
    <g strokeWidth={0.8}>
      <motion.path initial={false} animate={{ d: frames.map((f) => f.left) }} transition={transition} fill="#6f5a28" stroke="#e8cd80" />
      <motion.path initial={false} animate={{ d: frames.map((f) => f.right) }} transition={transition} fill="#9c813e" stroke="#e8cd80" />
      <motion.path initial={false} animate={{ d: frames.map((f) => f.top) }} transition={transition} fill="#d6b45c" stroke="#e8cd80" />
    </g>
  );
}

export function VoiceScene() {
  return (
    <SceneFrame
      phases={PHASES}
      chip={{ icon: PhoneIncoming, label: "Hovor vyřizuje AI" }}
      viewBox="-215 -250 455 425"
      label="Ukázka: voice agent zvedne hovor, pochopí, že zákazník chce termín, najde ho v kalendáři a pošle SMS s potvrzením"
    >
      {({ phase, reduced }) => {
        const instant = reduced || phase === -1;
        const ringing = phase === 0;
        const inCall = phase >= 1;
        const talking = phase === 1;
        const booked = phase >= 3;
        const phoneTop = iso(PHONE.x + PHONE.w / 2, PHONE.y + PHONE.d / 2, PHONE.z + PHONE.h);
        const pick = tile(PICK.col, PICK.row);
        const pickTop = iso(pick.x + CAL.s / 2, pick.y + CAL.s / 2, booked ? 24 : 4);
        const eqTop = iso(EQ.x + EQ.w / 2, EQ.y + EQ.d / 2, 40);

        return (
          <g>
            <Floor from={-240} to={240} />

            {/* Ekvalizér řeči za telefonem. */}
            <Glow x={EQ.x + EQ.w / 2} y={EQ.y + EQ.d / 2} r={90} show={talking} />
            <Box x={EQ.x} y={EQ.y} w={EQ.w} d={EQ.d} h={8} tone={talking ? TONE.soft : TONE.dark} instant={instant} />
            {BARS.map((x, i) => (
              <Bar key={x} x={x} index={i} talking={talking} reduced={reduced} />
            ))}
            <Tag x={EQ.x + EQ.w / 2} y={EQ.y + EQ.d / 2} z={14} label="Poslouchá" icon={AudioLines} show={phase <= 0} size={11.5} instant={instant} dx={70} />

            {/* Telefon v doku. */}
            <Box x={-172} y={-42} w={96} d={54} h={10} tone={TONE.raised} />
            <Glow x={PHONE.x + 26} y={PHONE.y + 6} r={90} show={ringing || phase === 4} />
            <Box x={PHONE.x} y={PHONE.y} z={PHONE.z} w={PHONE.w} d={PHONE.d} h={PHONE.h} tone={ringing ? TONE.soft : TONE.raised} instant={instant} />
            <g transform={wallY(PHONE.x + 3, PHONE.y + PHONE.d, PHONE.z + PHONE.h - 3)}>
              <rect width={46} height={98} rx={3} fill="#0a0a0a" />
              <circle cx={23} cy={26} r={9} fill="#1f1b12" stroke="#c9a84c" strokeWidth={1} />
              <rect x={11} y={42} width={24} height={3} fill="rgba(240,236,230,0.6)" />
              <rect x={15} y={49} width={16} height={2} fill="rgba(255,255,255,0.2)" />
              {inCall ? (
                <g>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.rect
                      key={i}
                      x={12 + i * 5}
                      width={3}
                      fill="#c9a84c"
                      initial={false}
                      animate={talking && !reduced ? { height: [3, 12, 5, 9, 3], y: [64, 58, 62, 60, 64] } : { height: 4, y: 63 }}
                      transition={{ duration: 0.9, repeat: talking && !reduced ? Infinity : 0, delay: i * 0.1 }}
                    />
                  ))}
                  <circle cx={23} cy={84} r={6} fill="#7a2b22" />
                </g>
              ) : (
                <g>
                  <circle cx={12} cy={84} r={6} fill="#3a3a3a" />
                  <motion.circle
                    cx={34}
                    cy={84}
                    r={6}
                    fill="#c9a84c"
                    initial={false}
                    animate={ringing && !reduced ? { scale: [1, 1.25, 1] } : { scale: 1 }}
                    transition={{ duration: 0.7, repeat: ringing && !reduced ? Infinity : 0 }}
                  />
                </g>
              )}
            </g>
            {/* Vlny zvonění kolem telefonu. */}
            {ringing && !reduced
              ? [0, 1, 2].map((i) => (
                  <motion.circle
                    key={i}
                    cx={phoneTop[0]}
                    cy={phoneTop[1] + 30}
                    fill="none"
                    stroke="#c9a84c"
                    strokeWidth={1.4}
                    initial={{ r: 30, opacity: 0.7 }}
                    animate={{ r: 92, opacity: 0 }}
                    transition={{ duration: 1.6, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }}
                  />
                ))
              : null}
            <Tag x={PHONE.x + 26} y={PHONE.y + 6} z={PHONE.z + PHONE.h + 10} label="Příchozí hovor" sub="+420 7•• ••• 214" icon={PhoneIncoming} variant="gold" show={ringing} instant={instant} />

            {/* Přepis a rozpoznaný záměr nad ekvalizérem. */}
            <Tag x={EQ.x + EQ.w / 2} y={EQ.y + EQ.d / 2} z={56} label="„Chtěl bych se objednat" sub="na úterý dopoledne.“" icon={MessageSquareText} variant="paper" show={phase === 1 || phase === 2} instant={instant} dx={30} />
            <Tag x={EQ.x + EQ.w / 2} y={EQ.y + EQ.d / 2} z={112} label="Záměr: objednání termínu" icon={Target} variant="gold" show={phase === 2 || phase === 3} instant={instant} dx={30} />

            {/* Kalendář na podlaze: obsazené termíny stojí, volné leží. */}
            <Glow x={pick.x + CAL.s / 2} y={pick.y + CAL.s / 2} r={60} show={booked} />
            {Array.from({ length: CAL.cols * CAL.rows }, (_, i) => {
              const col = i % CAL.cols;
              const row = Math.floor(i / CAL.cols);
              return { col, row };
            })
              .sort((a, b) => a.col + a.row - (b.col + b.row))
              .map(({ col, row }) => {
                const { x, y } = tile(col, row);
                const busy = BUSY.has(`${col}-${row}`);
                const chosen = col === PICK.col && row === PICK.row;
                if (chosen) {
                  return (
                    <motion.g key={`${col}-${row}`} initial={false} animate={{ y: booked ? -20 : 0 }} transition={{ duration: instant ? 0 : 0.6, ease: EASE }}>
                      <Box x={x} y={y} w={CAL.s} d={CAL.s} h={4} tone={booked ? TONE.gold : TONE.soft} instant={instant} />
                    </motion.g>
                  );
                }
                return <Box key={`${col}-${row}`} x={x} y={y} w={CAL.s} d={CAL.s} h={busy ? 14 : 4} tone={busy ? TONE.raised : TONE.dark} />;
              })}
            {/* Dny po straně mřížky (kreslí se až po dlaždicích, ať je nezakryjí). */}
            <g transform={`${at(0, 0, 0)} ${FLOOR}`}>
              {DAYS.map((day, col) => (
                <text key={day} x={CAL.x + col * (CAL.s + CAL.gap) + CAL.s / 2} y={CAL.y + CAL.rows * (CAL.s + CAL.gap) + 6} textAnchor="middle" dominantBaseline="hanging" fontSize={12} fontWeight={500} fill={day === DAYS[PICK.col] && booked ? "#e8cd80" : "#a39a8b"} className="font-inter">
                  {day}
                </text>
              ))}
            </g>
            <Tag x={CAL.x + 150} y={CAL.y - 6} z={10} label="Kalendář" icon={CalendarDays} show={!booked} size={11.5} instant={instant} />
            <Tag x={pick.x + CAL.s / 2} y={pick.y + CAL.s / 2} z={30} label="Út 10:00" icon={Check} variant="gold" show={booked} instant={instant} />

            <Stream from={eqTop} to={pickTop} active={phase === 3 && !reduced} count={4} duration={1.1} />
            <Stream from={pickTop} to={phoneTop} active={phase === 4 && !reduced} count={4} duration={1.2} />

            {/* SMS a zápis po hovoru. */}
            <Tag x={PHONE.x + 26} y={PHONE.y + 6} z={PHONE.z + PHONE.h + 10} label="SMS: termín potvrzen" sub="Úterý 10:00" icon={MessageSquareText} variant="paper" show={phase === 4} instant={instant} dx={30} />
            <Tag x={EQ.x + EQ.w / 2} y={EQ.y + EQ.d / 2} z={56} label="Zapsáno do CRM" icon={NotebookPen} show={phase === 4} instant={instant} dx={60} />
          </g>
        );
      }}
    </SceneFrame>
  );
}
