"use client";

import { motion } from "framer-motion";
import { Calculator, Check, FileText, Inbox, ScanText, Table2, TriangleAlert, UserRound, Workflow } from "lucide-react";
import { SceneFrame, type ScenePhase } from "@/components/automation/scenes3d/SceneFrame";
import { Box, EASE, FLOOR, Floor, Glow, Stream, Tag, TONE, at, boxFaces, iso, wallX } from "@/components/automation/scenes3d/iso";

// Automatizace procesů jako linka: faktura přijde do schránky, pás ji
// doveze pod AI čtečku, z faktury vyskočí údaje a odletí do účetnictví
// a tabulky. V lichých cyklech částka nesedí s objednávkou a faktura místo
// toho sjede ke schválení člověku. Údaje jsou ukázkové.

const PHASES: ScenePhase[] = [
  { caption: "Do schránky přijde faktura v PDF.", ms: 1900 },
  { caption: "Pás ji doveze ke čtečce. AI ji přečte podle významu, ne podle šablony.", ms: 2400 },
  {
    caption: (c) => (c % 2 ? "Vytáhne z ní údaje a zjistí, že částka nesedí s objednávkou." : "Vytáhne z ní údaje: dodavatele, částku a splatnost."),
    ms: 2400,
  },
  {
    caption: (c) => (c % 2 ? "Fakturu pošle ke schválení konkrétnímu člověku." : "Údaje zapíše do účetnictví i do tabulky. Bez přepisování."),
    ms: 2300,
  },
  { caption: (c) => (c % 2 ? "Vy jen schválíte, zbytek proběhne sám." : "Hotovo. Může přijít další doklad."), ms: 1800 },
];

const BELT = { x: -200, y: -20, w: 400, d: 40, h: 14 };
const SCAN_X = -27;
const ACCOUNTING = { x: 100, y: -150, s: 52, h: 58 };
const SHEET = { x: 0, y: -178, s: 52, h: 58 };
const TRAY = { x: 118, y: 66, w: 64, d: 58, h: 10 };
const DOC = boxFaces(-15, -19, 30, 38, 3);

export function PipelineScene() {
  return (
    <SceneFrame
      phases={PHASES}
      chip={{ icon: Workflow, label: "Automatizace v provozu" }}
      viewBox="-265 -205 545 370"
      label="Ukázka: faktura projede AI čtečkou, údaje se zapíšou do účetnictví a tabulky, nesrovnalost jde ke schválení člověku"
    >
      {({ phase, cycle, reduced }) => {
        const mismatch = cycle % 2 === 1;
        const instant = reduced || phase === -1;
        const docWorld: [number, number, number] =
          phase === -1
            ? [-236, 0, 130]
            : phase === 0
              ? [-236, 0, 26]
              : phase === 1
                ? [SCAN_X, 0, BELT.h]
                : phase === 2
                  ? [60, 0, BELT.h]
                  : mismatch
                    ? [TRAY.x + TRAY.w / 2, TRAY.y + TRAY.d / 2, TRAY.h]
                    : [178, 0, BELT.h];
        const [docX, docY] = iso(...docWorld);
        const docDuration = instant ? 0 : phase === 1 ? 1.5 : phase === 0 ? 0.6 : 1;
        const scanning = phase === 1;
        const writing = phase >= 3 && !mismatch;
        const chipBase = iso(60, 0, 64);

        return (
          <g>
            <Floor from={-260} to={240} />

            {/* Cílové systémy za pásem. */}
            {[
              { box: SHEET, label: "Tabulka", icon: Table2 },
              { box: ACCOUNTING, label: "Účetnictví", icon: Calculator },
            ].map(({ box, label, icon }) => (
              <g key={label}>
                <Glow x={box.x + box.s / 2} y={box.y + box.s / 2} r={60} show={writing} />
                <Box x={box.x} y={box.y} w={box.s} d={box.s} h={box.h} tone={writing ? TONE.soft : TONE.dark} instant={instant} />
                {/* Po zápisu se popisek změní na potvrzení. */}
                <Tag
                  x={box.x + box.s / 2}
                  y={box.y + box.s / 2}
                  z={box.h + 6}
                  label={phase === 4 && !mismatch ? (box === ACCOUNTING ? "Zaúčtováno" : "Zapsáno") : label}
                  icon={phase === 4 && !mismatch ? Check : icon}
                  variant={writing ? "gold" : "dark"}
                  show
                  size={11.5}
                  instant={instant}
                />
                <Stream from={chipBase} to={iso(box.x + box.s / 2, box.y + box.s / 2, box.h)} active={phase === 3 && !mismatch && !reduced} count={4} duration={1.1} />
              </g>
            ))}

            {/* Schránka na začátku linky. */}
            <Box x={-262} y={-28} w={52} d={56} h={26} tone={phase === 0 ? TONE.soft : TONE.raised} instant={instant} />
            <Tag x={-236} y={0} z={34} label="Schránka" icon={Inbox} show={phase === -1 || phase >= 1} size={11.5} instant={instant} dx={-18} />

            {/* Zadní sloup čtečky (za pásem), pás s jedoucími příčkami. */}
            <Box x={-40} y={-52} w={26} d={16} h={100} tone={TONE.raised} />
            <Box x={BELT.x} y={BELT.y} w={BELT.w} d={BELT.d} h={BELT.h} tone={TONE.raised} />
            <g transform={`${at(0, 0, BELT.h)} ${FLOOR}`}>
              <clipPath id="s3d-belt" clipPathUnits="userSpaceOnUse">
                <rect x={BELT.x} y={BELT.y + 3} width={BELT.w} height={BELT.d - 6} />
              </clipPath>
              <g clipPath="url(#s3d-belt)">
                <motion.g
                  initial={false}
                  animate={{ x: reduced ? 0 : [0, 24] }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
                >
                  {Array.from({ length: 19 }, (_, i) => BELT.x - 24 + i * 24).map((x) => (
                    <line key={x} x1={x} y1={BELT.y} x2={x} y2={BELT.y + BELT.d} stroke="#c9a84c" strokeOpacity={0.22} strokeWidth={2} />
                  ))}
                </motion.g>
              </g>
            </g>

            {/* Plocha ke schválení před koncem pásu (před fakturou, ta na ni sjede). */}
            <Glow x={TRAY.x + TRAY.w / 2} y={TRAY.y + TRAY.d / 2} r={70} show={phase >= 3 && mismatch} />
            <Box x={TRAY.x} y={TRAY.y} w={TRAY.w} d={TRAY.d} h={TRAY.h} tone={phase >= 3 && mismatch ? TONE.warn : TONE.dark} instant={instant} />

            {/* Faktura. */}
            <motion.g
              initial={false}
              animate={{ x: docX, y: docY, opacity: phase === -1 ? 0 : 1 }}
              transition={{ duration: docDuration, ease: phase === 1 ? "easeInOut" : EASE }}
            >
              <path d={DOC.left} fill="#8f887d" />
              <path d={DOC.right} fill="#bdb6aa" />
              <path d={DOC.top} fill="#f0ece6" stroke="#fffaf2" strokeWidth={0.8} />
              <g transform={`${at(0, 0, 3)} ${FLOOR}`}>
                <rect x={-11} y={-14} width={12} height={4} fill="#c9a84c" />
                {[-6, -1, 4, 9].map((y, i) => (
                  <rect key={y} x={-11} y={y} width={i === 3 ? 12 : 22} height={2} fill="#8f887d" />
                ))}
              </g>
              <Tag x={0} y={0} z={12} label="Faktura_1042.pdf" icon={FileText} show={phase === 0} instant={instant} dx={48} />
            </motion.g>

            {/* Laserová rovina čtečky a skenovací linka. */}
            <g transform={wallX(SCAN_X, 36, 100)}>
              <motion.rect
                width={88}
                height={86}
                fill="url(#s3d-beam)"
                initial={false}
                animate={{ opacity: scanning ? 0.9 : 0 }}
                transition={{ duration: 0.3 }}
              />
              {scanning && !reduced ? (
                <motion.rect
                  width={88}
                  height={2}
                  fill="#f5dc93"
                  initial={{ y: 0 }}
                  animate={{ y: [0, 84, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                />
              ) : null}
            </g>

            {/* Přední sloup a horní nosník čtečky. */}
            <Box x={-40} y={36} w={26} d={16} h={100} tone={TONE.raised} />
            <Box x={-40} y={-52} z={100} w={26} d={104} h={14} tone={scanning ? TONE.gold : TONE.soft} instant={instant} />
            <Tag x={SCAN_X} y={0} z={122} label="AI čtečka" icon={ScanText} variant={scanning ? "gold" : "dark"} show size={11.5} instant={instant} />

            {/* Vytažené údaje nad fakturou. */}
            {[
              { z: 30, label: "Dodavatel: Malina s.r.o.", warn: false },
              { z: 64, label: mismatch ? "Částka nesedí s objednávkou" : "Částka: 12 400 Kč", warn: mismatch },
              { z: 98, label: "Splatnost: 14. 11.", warn: false },
            ].map((chip, index) => (
              <Tag
                key={chip.z}
                x={60}
                y={0}
                z={chip.z}
                label={chip.label}
                icon={chip.warn ? TriangleAlert : Check}
                variant={chip.warn ? "warn" : "dark"}
                show={phase === 2}
                instant={instant}
                dx={index === 1 ? -24 : -36}
              />
            ))}

            <Tag
              x={TRAY.x + TRAY.w / 2}
              y={TRAY.y + TRAY.d / 2}
              z={TRAY.h + 16}
              label="Ke schválení"
              sub={phase >= 3 && mismatch ? "Jana, účetní" : undefined}
              icon={UserRound}
              variant={phase >= 3 && mismatch ? "warn" : "dark"}
              size={phase >= 3 && mismatch ? 12.5 : 11.5}
              show
              instant={instant}
            />
          </g>
        );
      }}
    </SceneFrame>
  );
}
