"use client";

import { motion } from "framer-motion";
import { Bot, FileText, FolderOpen, MessageCircle, Moon, UserRound } from "lucide-react";
import { SceneFrame, type ScenePhase } from "@/components/automation/scenes3d/SceneFrame";
import { Box, EASE, Floor, Glow, Stream, Tag, TONE, iso, wallY } from "@/components/automation/scenes3d/iso";

// Chatbot s RAG: vlevo kartotéka vašich podkladů, vpravo web s chatem.
// Zákazník se zeptá, chatbot projde kartotéku, správný dokument se vysune
// a odpověď přijde i se zdrojem. Liché cykly se ptají na jinou věc a odpověď
// je v jiném dokumentu: klient vidí, že chatbot čte jeho podklady.

const PHASES: ScenePhase[] = [
  { caption: (c) => (c % 2 ? "Jiný zákazník se ptá, kolik stojí doprava na Slovensko." : "Zákazník se na webu zeptá, do kdy může vrátit zboží."), ms: 2100 },
  { caption: "Chatbot projde vaše podklady: podmínky, ceník i návody.", ms: 2200 },
  { caption: (c) => (c % 2 ? "Odpověď najde v ceníku dopravy." : "Správnou pasáž najde v obchodních podmínkách."), ms: 2000 },
  { caption: "Odpoví vlastními slovy a přidá zdroj, odkud odpověď má.", ms: 2800 },
  { caption: "Odpovídá i v noci a o víkendu. Složitý dotaz předá vám.", ms: 2200 },
];

const CABINET = { x: -215, y: -140, w: 100, d: 150, h: 26 };
const CARD_W = 80;
const CARD_H = 44;
const CARDS = [0, 1, 2, 3, 4, 5].map((k) => -128 + k * 26);
const LIFT = 40;
const MONITOR = { x: 40, y: 26, w: 150, d: 6, z: 30, h: 110 };

// Bod v obrazovce → světový bod na rovině y = 0 (pro štítky „ve vzduchu“).
const screenPoint = (sx: number, sy: number): [number, number, number] => {
  const x = sx / 0.866;
  return [x, 0, x * 0.5 - sy];
};

export function KnowledgeScene() {
  return (
    <SceneFrame
      phases={PHASES}
      chip={{ icon: MessageCircle, label: "Chatbot na webu" }}
      viewBox="-210 -262 480 370"
      label="Ukázka: zákazník se zeptá, chatbot najde odpověď ve vašich podkladech a odpoví i se zdrojem"
    >
      {({ phase, cycle, reduced }) => {
        const shipping = cycle % 2 === 1;
        const found = shipping ? 4 : 2;
        const instant = reduced || phase === -1;
        const lifted = phase === 2 || phase === 3;
        const foundTop = iso(CABINET.x + 10 + CARD_W / 2, CARDS[found], CABINET.h + CARD_H + (lifted ? LIFT : 0));
        const chatCorner = iso(MONITOR.x + MONITOR.w - 20, MONITOR.y + MONITOR.d, MONITOR.z + 40);

        return (
          <g>
            <Floor from={-240} to={240} />

            {/* Kartotéka podkladů. */}
            <Glow x={CABINET.x + 50} y={CABINET.y + 75} r={110} show={phase === 1 || lifted} />
            <Box x={CABINET.x} y={CABINET.y} w={CABINET.w} d={CABINET.d} h={CABINET.h} tone={phase === 1 ? TONE.soft : TONE.raised} instant={instant} />
            {CARDS.map((y, k) => {
              const isFound = k === found;
              const up = isFound && lifted;
              return (
                <motion.g
                  key={y}
                  initial={false}
                  animate={{ y: up ? -LIFT : 0 }}
                  transition={{ duration: instant ? 0 : 0.6, ease: EASE }}
                >
                  <g transform={wallY(CABINET.x + 10, y, CABINET.h + CARD_H)}>
                    <rect x={6} y={-7} width={22} height={7} fill={up ? "#c9a84c" : "#1d1d1d"} stroke="rgba(201,168,76,0.4)" strokeWidth={0.8} />
                    <motion.rect
                      width={CARD_W}
                      height={CARD_H}
                      initial={false}
                      animate={{
                        fill: up ? "#f0ece6" : "#161616",
                        stroke: phase === 1 && !reduced ? ["rgba(201,168,76,0.3)", "#e8cd80", "rgba(201,168,76,0.3)"] : up ? "#fffaf2" : "rgba(201,168,76,0.3)",
                      }}
                      transition={{
                        fill: { duration: instant ? 0 : 0.4 },
                        stroke: phase === 1 ? { duration: 0.5, delay: k * 0.22, repeat: 1 } : { duration: 0.3 },
                      }}
                      strokeWidth={1}
                    />
                    {[10, 18, 26, 34].map((v, i) => (
                      <rect key={v} x={8} y={v} width={i === 3 ? 34 : 60} height={2.5} fill={up ? "#8f887d" : "rgba(255,255,255,0.12)"} />
                    ))}
                  </g>
                </motion.g>
              );
            })}
            <Tag x={CABINET.x + 50} y={CABINET.y + CABINET.d} z={8} label="Vaše podklady" icon={FolderOpen} show={!lifted} size={11.5} instant={instant} dx={34} />
            <Tag
              x={CABINET.x + 10 + CARD_W / 2}
              y={CARDS[found]}
              z={CABINET.h + CARD_H + LIFT + 8}
              label={shipping ? "Ceník dopravy" : "Obchodní podmínky, čl. 6"}
              icon={FileText}
              variant="gold"
              show={lifted}
              instant={instant}
            />

            {/* Web s chatem: stojan, monitor a obrazovka s chatovým oknem. */}
            <Box x={80} y={14} w={70} d={34} h={6} tone={TONE.raised} />
            <Box x={108} y={22} w={14} d={8} z={6} h={24} tone={TONE.raised} />
            <Glow x={MONITOR.x + 75} y={MONITOR.y + 30} r={110} show={phase === 0 || phase === 3} />
            <Box x={MONITOR.x} y={MONITOR.y} z={MONITOR.z} w={MONITOR.w} d={MONITOR.d} h={MONITOR.h} tone={TONE.raised} />
            <g transform={wallY(MONITOR.x + 4, MONITOR.y + MONITOR.d, MONITOR.z + MONITOR.h - 4)}>
              <rect width={142} height={102} fill="#0b0b0b" />
              <rect width={142} height={10} fill="#151515" />
              {[5, 11, 17].map((cx) => (
                <circle key={cx} cx={cx} cy={5} r={1.8} fill="rgba(255,255,255,0.25)" />
              ))}
              <rect x={10} y={18} width={52} height={6} fill="rgba(240,236,230,0.5)" />
              <rect x={10} y={30} width={70} height={3} fill="rgba(255,255,255,0.14)" />
              <rect x={10} y={37} width={60} height={3} fill="rgba(255,255,255,0.14)" />
              <rect x={10} y={48} width={30} height={10} fill="#c9a84c" opacity={0.8} />
              {/* Chatové okno v rohu stránky. */}
              <motion.g initial={false} animate={{ opacity: phase >= 0 ? 1 : 0.4 }}>
                <rect x={86} y={34} width={50} height={62} fill="#141310" stroke="#c9a84c" strokeOpacity={0.6} strokeWidth={0.8} />
                <rect x={86} y={34} width={50} height={8} fill="#c9a84c" opacity={0.85} />
                <motion.rect x={104} y={47} width={28} height={8} rx={1} fill="#f0ece6" initial={false} animate={{ opacity: phase >= 0 ? 1 : 0 }} />
                <motion.rect x={90} y={60} width={34} height={14} rx={1} fill="#2a2416" stroke="#c9a84c" strokeOpacity={0.5} strokeWidth={0.6} initial={false} animate={{ opacity: phase >= 3 ? 1 : 0 }} />
                {phase === 1 || phase === 2 ? (
                  <g>
                    {[94, 99, 104].map((cx, i) => (
                      <motion.circle key={cx} cx={cx} cy={66} r={1.6} fill="#c9a84c" animate={reduced ? undefined : { opacity: [0.2, 1, 0.2] }} transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity }} />
                    ))}
                  </g>
                ) : null}
              </motion.g>
            </g>

            <Stream from={chatCorner} to={iso(CABINET.x + 50, CABINET.y + 75, CABINET.h + 30)} active={phase === 1 && !reduced} count={4} duration={1} />
            <Stream from={foundTop} to={chatCorner} active={phase === 3 && !reduced} count={4} duration={1.1} />

            {/* Bubliny chatu ve vzduchu nad monitorem. */}
            <Tag
              {...pick(screenPoint(140, -176))}
              label={shipping ? "Doprava na Slovensko?" : "Do kdy můžu vrátit zboží?"}
              icon={UserRound}
              variant="paper"
              show={phase >= 0 && phase <= 3}
              instant={instant}
            />
            <Tag
              {...pick(screenPoint(140, -122))}
              label={shipping ? "Na Slovensko vozíme za 149 Kč." : "Zboží můžete vrátit do 30 dnů."}
              sub={shipping ? "Zdroj: Ceník dopravy" : "Zdroj: Obchodní podmínky, čl. 6"}
              icon={Bot}
              show={phase === 3}
              instant={instant}
            />
            <Tag {...pick(screenPoint(140, -176))} label="Odpovídá i v noci a o víkendu" icon={Moon} show={phase === 4} instant={instant} />
            <Tag {...pick(screenPoint(140, -130))} label="Složitý dotaz předá vám" icon={UserRound} variant="gold" show={phase === 4} instant={instant} />
          </g>
        );
      }}
    </SceneFrame>
  );
}

function pick([x, y, z]: [number, number, number]) {
  return { x, y, z };
}
