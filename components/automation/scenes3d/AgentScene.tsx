"use client";

import { motion } from "framer-motion";
import { Bot, Check, FileText, Mail, ShieldCheck, TriangleAlert, UserRound, Users } from "lucide-react";
import { SceneFrame, type ScenePhase } from "@/components/automation/scenes3d/SceneFrame";
import { Box, EASE, FLOOR, Floor, FloorLine, Glow, Stream, Tag, TONE, at, boxFaces, iso } from "@/components/automation/scenes3d/iso";
import { RuleCard } from "@/components/automation/scenes3d/RuleCard";

// AI agent: uprostřed jádro (zářící koule na podstavci), za ním zdroje dat
// (CRM, e-maily, dokumenty). Přijde případ, agent si natáhne kontext,
// projde pravidla majitele a rozhodne. Liché cykly vyřídí sám, sudé předá
// člověku: klient tak vidí, že se agent ptá jen tam, kde má.

const PHASES: ScenePhase[] = [
  { caption: (c) => (c % 2 ? "Přijde stížnost: zákazník je nespokojený s dodávkou." : "Přijde nový případ: zákazníkovi nesedí faktura."), ms: 2000 },
  { caption: "Agent si dohledá kontext: zákazníka v CRM, e-maily i objednávku.", ms: 2400 },
  { caption: "Projde vaše pravidla, co smí vyřídit sám.", ms: 2300 },
  { caption: "Rozhodne, co udělá dál.", ms: 1700 },
  { caption: (c) => (c % 2 ? "Stížnost předá vám, i se shrnutím celé situace." : "Běžný případ vyřídí sám: opraví fakturu a odpoví zákazníkovi."), ms: 2400 },
  { caption: "Zapíše, co udělal a proč. Všechno je dohledatelné.", ms: 2200 },
];

const ORB: [number, number, number] = [0, 0, 74];
const PAD_A = { x: 150, y: 22, w: 70, d: 70 };
const PAD_B = { x: 22, y: 150, w: 70, d: 70 };
const padCenter = (p: typeof PAD_A, z = 0) => iso(p.x + p.w / 2, p.y + p.d / 2, z);

const TOWERS = [
  { key: "crm", x: -212, y: -32, h: 62, label: "CRM", icon: Users },
  { key: "mail", x: -160, y: -160, h: 74, label: "E-maily", icon: Mail },
  { key: "docs", x: -32, y: -212, h: 62, label: "Dokumenty", icon: FileText },
];
const TOWER = 50;

const CARD = boxFaces(-20, -15, 40, 30, 4);

export function AgentScene() {
  return (
    <SceneFrame
      phases={PHASES}
      chip={{ icon: Bot, label: "AI agent v práci" }}
      viewBox="-240 -262 520 430"
      label="Ukázka: AI agent dostane případ, dohledá kontext, projde pravidla a rozhodne, jestli ho vyřídí sám, nebo předá člověku"
    >
      {({ phase, cycle, reduced }) => {
        const complaint = cycle % 2 === 1;
        const pad = complaint ? PAD_B : PAD_A;
        const instant = reduced || phase === -1;
        const orbScreen = iso(...ORB);
        const [cardX, cardY] =
          phase === -1 ? iso(-230, 160, 170) : phase >= 4 ? padCenter(pad, 10) : iso(0, 0, 132);

        return (
          <g>
            <Floor from={-240} to={260} />

            {/* Rozcestí k výsledkům. */}
            <FloorLine a={[0, 0]} b={[PAD_A.x + 35, PAD_A.y + 35]} lit={phase === 3 || (phase >= 4 && !complaint)} reduced={reduced} />
            <FloorLine a={[0, 0]} b={[PAD_B.x + 35, PAD_B.y + 35]} lit={phase === 3 || (phase >= 4 && complaint)} reduced={reduced} />

            {[PAD_A, PAD_B].map((p) => {
              const chosen = p === pad && phase >= 4;
              const [cx, cy] = padCenter(p);
              return (
                <g key={p.x}>
                  <Glow x={p.x + 35} y={p.y + 35} r={70} show={chosen} />
                  <Box x={p.x} y={p.y} w={p.w} d={p.d} h={8} tone={chosen ? TONE.gold : TONE.dark} instant={instant} />
                  <g transform={`translate(${cx} ${cy - 8}) ${FLOOR}`} opacity={chosen ? 0 : 0.7}>
                    <rect x={-22} y={-22} width={44} height={44} fill="none" stroke="#c9a84c" strokeOpacity={0.35} strokeDasharray="3 5" />
                  </g>
                </g>
              );
            })}

            {/* Zdroje dat za agentem. */}
            {TOWERS.map((tower) => {
              const active = phase === 1;
              return (
                <g key={tower.key}>
                  <Glow x={tower.x + TOWER / 2} y={tower.y + TOWER / 2} r={52} show={active} />
                  {tower.key === "docs" ? (
                    [0, 1, 2, 3].map((i) => (
                      <Box key={i} x={tower.x} y={tower.y} z={i * 16} w={TOWER} d={TOWER} h={10} tone={active ? TONE.soft : TONE.dark} instant={instant} />
                    ))
                  ) : (
                    <Box x={tower.x} y={tower.y} w={TOWER} d={TOWER} h={tower.h} tone={active ? TONE.soft : TONE.dark} instant={instant} />
                  )}
                  {/* Popisek se rozsvítí, když agent zdroj používá. */}
                  <Tag
                    x={tower.x + TOWER / 2}
                    y={tower.y + TOWER / 2}
                    z={tower.h + 6}
                    label={tower.label}
                    icon={tower.icon}
                    variant={active ? "gold" : "dark"}
                    show={reduced || phase === 1 || (tower.key === "crm" && phase === 5)}
                    size={11.5}
                    instant={instant}
                  />
                  <Stream
                    from={iso(tower.x + TOWER / 2, tower.y + TOWER / 2, tower.h)}
                    to={orbScreen}
                    active={active && !reduced}
                    delay={TOWERS.indexOf(tower) * 0.2}
                  />
                </g>
              );
            })}

            {/* Podstavec a jádro agenta. */}
            <Glow x={0} y={0} r={110} show={phase >= 1 && phase <= 3} />
            <Box x={-46} y={-46} w={92} d={92} h={18} tone={TONE.raised} />
            <Box x={-32} y={-32} z={18} w={64} d={64} h={12} tone={phase === 3 ? TONE.gold : TONE.soft} instant={instant} />

            <g transform={`${at(...ORB)}`}>
              <motion.circle
                r={58}
                fill="url(#s3d-glow)"
                initial={false}
                animate={{ opacity: phase >= 1 && phase <= 3 ? 1 : 0.45, scale: phase === 3 && !reduced ? [1, 1.15, 1] : 1 }}
                transition={{ duration: 1, repeat: phase === 3 && !reduced ? Infinity : 0 }}
              />
              <motion.circle
                r={28}
                fill="url(#s3d-orb)"
                initial={false}
                animate={{ scale: phase === 3 && !reduced ? [1, 1.06, 1] : 1 }}
                transition={{ duration: 0.8, repeat: phase === 3 && !reduced ? Infinity : 0 }}
              />
              <ellipse cx={-8} cy={-10} rx={9} ry={5} fill="#fff" opacity={0.35} />
            </g>
            {/* Oběžná dráha kolem koule, ležící ve vodorovné rovině. */}
            <g transform={`${at(...ORB)} ${FLOOR}`}>
              <motion.g
                initial={false}
                animate={{ rotate: reduced ? 0 : 360 }}
                transition={{ duration: phase >= 1 && phase <= 3 ? 5 : 14, repeat: Infinity, ease: "linear" }}
              >
                <circle r={56} fill="none" stroke="#c9a84c" strokeOpacity={0.5} strokeWidth={1.2} strokeDasharray="2 10" />
                <circle cx={56} r={4} fill="#e8cd80" />
              </motion.g>
            </g>
            <Tag x={-46} y={46} z={30} label="AI agent" icon={Bot} show size={11.5} instant />

            <RuleCard
              x={150}
              y={-60}
              z={62}
              dx={-52}
              show={phase === 2 || phase === 3}
              title="Vaše pravidla"
              icon={ShieldCheck}
              rows={[
                // Odškrtne se jen pravidlo, které na případ platí.
                { text: "Opravy do 5 000 Kč: sám", on: !complaint, match: phase === 3 && !complaint },
                { text: "Stížnost: předat vám", on: complaint, match: phase === 3 && complaint },
              ]}
              instant={instant}
            />

            {/* Případ: přiletí nad agenta, pak odletí na zvolený výsledek. */}
            <motion.g
              initial={false}
              animate={{ x: cardX, y: cardY, opacity: phase === -1 ? 0 : 1 }}
              transition={{ duration: instant ? 0 : phase >= 4 ? 0.9 : 0.8, ease: EASE }}
            >
              <path d={CARD.left} fill="#8f887d" />
              <path d={CARD.right} fill="#bdb6aa" />
              <path d={CARD.top} fill="#f0ece6" stroke="#fffaf2" strokeWidth={0.8} />
              <g transform={`${at(0, 0, 4)} ${FLOOR}`}>
                <rect x={-14} y={-9} width={16} height={3} fill={complaint ? "#e0a54a" : "#c9a84c"} />
                <rect x={-14} y={-2} width={26} height={2} fill="#8f887d" />
                <rect x={-14} y={3} width={22} height={2} fill="#8f887d" />
              </g>
              <Tag
                x={0}
                y={0}
                z={14}
                label={complaint ? "Stížnost na dodávku" : "Faktura nesedí o 240 Kč"}
                sub="E-mail od zákazníka"
                icon={complaint ? TriangleAlert : FileText}
                variant={complaint ? "warn" : "dark"}
                show={phase === 0}
                instant={instant}
              />
            </motion.g>

            {/* Obě možnosti při rozhodování, pak jen ta zvolená. */}
            {[
              { p: PAD_A, label: "Vyřídit sám", icon: Check, pick: !complaint },
              { p: PAD_B, label: "Předat vám", icon: UserRound, pick: complaint },
            ].map((option) => (
              <Tag
                key={option.label}
                x={option.p.x + 35}
                y={option.p.y + 35}
                z={30}
                label={option.label}
                icon={option.icon}
                variant={option.pick && phase >= 4 ? "gold" : "dark"}
                show={phase === 3 || (option.pick && phase === 4)}
                instant={instant}
              />
            ))}

            <RuleCard
              x={pad.x + 35}
              y={pad.y + 35}
              z={20}
              dx={complaint ? -72 : 72}
              show={phase === 5}
              title="Záznam"
              icon={Check}
              rows={
                complaint
                  ? [
                      { text: "Shrnutí poslané vám", on: true },
                      { text: "Zákazník ví, co dál", on: true },
                      { text: "Zapsáno do CRM", on: true },
                    ]
                  : [
                      { text: "Faktura opravená", on: true },
                      { text: "Odpověď odeslaná", on: true },
                      { text: "Zapsáno do CRM", on: true },
                    ]
              }
              instant={instant}
            />
            <Stream
              from={padCenter(pad, 10)}
              to={iso(TOWERS[0].x + TOWER / 2, TOWERS[0].y + TOWER / 2, TOWERS[0].h)}
              active={phase === 5 && !reduced}
              count={4}
              duration={1.3}
            />
          </g>
        );
      }}
    </SceneFrame>
  );
}
