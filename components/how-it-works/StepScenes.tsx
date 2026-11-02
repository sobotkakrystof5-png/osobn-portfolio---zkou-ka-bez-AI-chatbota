"use client";

// Mini scény ke krokům v sekci „Jak to probíhá“ (components/HowItWorks.tsx).
// Každá scéna ukazuje, co se v daném kroku opravdu děje: hovor, návrh,
// stavba s živým náhledem, spuštění a předání.
//
// PRAVIDLA POHYBU (stejná jako u scén v components/automation):
//  • Žádná smyčka na pozadí. Scéna se přehraje jednou, když ji osa
//    „dosáhne“ (`run`), pak čeká na tlačítko „Přehrát znovu“.
//  • Animuje se jen transform, opacity a clip-path.
//  • Pod prefers-reduced-motion (`instant`) se scéna vykreslí rovnou hotová.
//
// Scény jsou čistě dekorativní (aria-hidden), obsah kroku nese text vedle nich.

import { useEffect, useRef, useState } from "react";
import type { ComponentType, PointerEvent, ReactNode } from "react";
import { motion, useSpring } from "framer-motion";
import { Check, Lock, Rocket, RotateCcw } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type SceneId = "konzultace" | "navrh" | "tvorba" | "spusteni";

type SceneProps = { run: boolean; instant: boolean };

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function tr(instant: boolean, duration = 0.5, delay = 0) {
  return instant ? { duration: 0 } : { duration, delay, ease: EASE };
}

/**
 * Scénář scény jako řada fází. `times` jsou milisekundy od spuštění, kdy
 * začíná fáze 1, 2, … Pole musí být konstanta mimo komponentu, jinak by se
 * efekt spouštěl při každém renderu.
 */
function usePhases(run: boolean, instant: boolean, times: readonly number[]) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (!run) return;
    if (instant) {
      setPhase(times.length);
      return;
    }
    const ids = times.map((ms, i) => setTimeout(() => setPhase(i + 1), ms));
    return () => ids.forEach(clearTimeout);
  }, [run, instant, times]);

  return phase;
}

function Appear({
  show,
  instant,
  delay = 0,
  y = 8,
  className,
  children,
}: {
  show: boolean;
  instant: boolean;
  delay?: number;
  y?: number;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={tr(instant, 0.5, show ? delay : 0)}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── 01 Konzultace: krátká konverzace, která končí domluveným hovorem ─── */

const CONSULT_TIMES = [250, 1000, 2200, 2900] as const;

function ConsultScene({ run, instant }: SceneProps) {
  const p = usePhases(run, instant, CONSULT_TIMES);

  return (
    <div className="flex h-full flex-col justify-center gap-2.5 px-4 py-4 font-inter">
      <Appear
        show={p >= 1}
        instant={instant}
        className="ml-auto max-w-[84%] rounded-[3px] border border-white/[0.07] bg-white/[0.06] px-3 py-2 text-[12px] leading-[1.5] text-[#f0ece6]/90"
      >
        Dobrý den, potřebuji nový web pro svou firmu. Jak začneme?
      </Appear>

      {/* „Píše…“ a odpověď sdílí jednu buňku, takže výška scény se nemění. */}
      <div className="grid">
        <Appear
          show={p === 2}
          instant={instant}
          className="col-start-1 row-start-1 flex w-fit items-center gap-1 self-start rounded-[3px] border border-[#c9a84c]/20 bg-[#c9a84c]/10 px-3 py-2.5"
        >
          {[0, 1, 2].map((dot) => (
            <motion.span
              key={dot}
              className="h-1.5 w-1.5 rounded-full bg-[#c9a84c]/80"
              animate={p === 2 && !instant ? { y: [0, -3, 0] } : { y: 0 }}
              transition={p === 2 && !instant ? { duration: 0.7, repeat: Infinity, delay: dot * 0.12 } : { duration: 0 }}
            />
          ))}
        </Appear>
        <Appear
          show={p >= 3}
          instant={instant}
          className="col-start-1 row-start-1 max-w-[88%] rounded-[3px] border border-[#c9a84c]/25 bg-[#c9a84c]/[0.12] px-3 py-2 text-[12px] leading-[1.5] text-[#f0ece6]"
        >
          Nejdřív si zavoláme. Zjistíme, co váš podnik potřebuje, a navrhneme řešení.
        </Appear>
      </div>

      <Appear
        show={p >= 4}
        instant={instant}
        className="mt-1 flex w-fit items-center gap-2 border border-[#c9a84c]/30 px-2.5 py-1.5"
      >
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#c9a84c] text-[#080808]">
          <Check size={10} strokeWidth={3} />
        </span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-[#f0ece6]/85">Hovor domluven · zdarma</span>
      </Appear>
    </div>
  );
}

/* ─── 02 Návrh: drátěný model se vybarví, klient ho připomínkuje a schválí ─── */

const DESIGN_TIMES = [200, 1400, 2200, 2900, 3600, 4300] as const;

const TONES = {
  cream: "bg-[#f0ece6]/80",
  muted: "bg-white/[0.13]",
  gold: "bg-[#c9a84c]",
  image: "border border-[#c9a84c]/25 bg-gradient-to-br from-[#c9a84c]/40 to-[#c9a84c]/[0.04]",
} as const;

const WIRE_BLOCKS: { id: string; className: string; tone: keyof typeof TONES }[] = [
  { id: "logo", className: "left-[5%] top-[7%] h-[6%] w-[14%]", tone: "cream" },
  { id: "nav-1", className: "left-[62%] top-[8%] h-[4%] w-[8%]", tone: "muted" },
  { id: "nav-2", className: "left-[73%] top-[8%] h-[4%] w-[8%]", tone: "muted" },
  { id: "nav-3", className: "left-[84%] top-[8%] h-[4%] w-[11%]", tone: "gold" },
  { id: "text", className: "left-[5%] top-[52%] h-[4%] w-[44%]", tone: "muted" },
  { id: "button", className: "left-[5%] top-[61%] h-[9%] w-[20%]", tone: "gold" },
  { id: "image", className: "left-[62%] top-[24%] h-[46%] w-[33%]", tone: "image" },
  { id: "card-1", className: "left-[5%] top-[78%] h-[15%] w-[27%]", tone: "muted" },
  { id: "card-2", className: "left-[36.5%] top-[78%] h-[15%] w-[27%]", tone: "muted" },
  { id: "card-3", className: "left-[68%] top-[78%] h-[15%] w-[27%]", tone: "muted" },
];

function WireBlock({
  className,
  tone,
  drawn,
  filled,
  delay,
  instant,
}: {
  className: string;
  tone: keyof typeof TONES;
  drawn: boolean;
  filled: boolean;
  delay: number;
  instant: boolean;
}) {
  return (
    <motion.div
      className={cn("absolute", className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={drawn ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={tr(instant, 0.45, delay)}
    >
      <motion.span
        className="absolute inset-0 border border-dashed border-white/25"
        animate={{ opacity: filled ? 0 : 1 }}
        transition={tr(instant, 0.4, delay * 0.6)}
      />
      <motion.span
        className={cn("absolute inset-0", TONES[tone])}
        initial={{ opacity: 0 }}
        animate={{ opacity: filled ? 1 : 0 }}
        transition={tr(instant, 0.5, delay * 0.6)}
      />
    </motion.div>
  );
}

function DesignScene({ run, instant }: SceneProps) {
  const p = usePhases(run, instant, DESIGN_TIMES);
  const drawn = p >= 1;
  const filled = p >= 2;

  return (
    <div className="relative h-full p-4 font-inter">
      <div className="relative h-full overflow-hidden border border-white/[0.07] bg-black/30">
        {WIRE_BLOCKS.map((block, i) => (
          <WireBlock key={block.id} {...block} drawn={drawn} filled={filled} delay={i * 0.07} instant={instant} />
        ))}

        {/* Nadpis zvlášť: na připomínku klienta se zvětší. */}
        <motion.div
          className="absolute left-[5%] top-[23%] h-[22%] w-[50%] origin-top-left"
          animate={{ scale: p >= 5 ? 1.1 : 1 }}
          transition={tr(instant, 0.6)}
        >
          <WireBlock className="left-0 top-0 h-[42%] w-full" tone="cream" drawn={drawn} filled={filled} delay={0.1} instant={instant} />
          <WireBlock className="left-0 top-[56%] h-[42%] w-[72%]" tone="cream" drawn={drawn} filled={filled} delay={0.16} instant={instant} />
        </motion.div>

        {/* Kurzor leží ve vrstvě přes celé plátno, takže posun v % je posun po plátně. */}
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ x: "78%", y: "92%", opacity: 0 }}
          animate={
            p >= 3
              ? { x: "44%", y: "30%", opacity: p >= 6 ? 0 : 1 }
              : { x: "78%", y: "92%", opacity: 0 }
          }
          transition={tr(instant, 0.9)}
        >
          <svg width="14" height="16" viewBox="0 0 14 16" className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
            <path d="M1 1l11.5 7.2-5.1 1.1L5 14.6z" fill="#f0ece6" stroke="#080808" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </motion.div>

        <Appear
          show={p >= 4 && p < 6}
          instant={instant}
          y={4}
          className="absolute left-[47%] top-[13%] border border-[#c9a84c]/40 bg-[#0e0e0e]/95 px-2 py-1 text-[10px] text-[#f0ece6]/90"
        >
          {p >= 5 ? "Takhle je to lepší ✓" : "Nadpis trochu větší?"}
        </Appear>

        <motion.div
          className="absolute right-[7%] top-[36%] flex items-center gap-1.5 border-2 border-[#c9a84c] bg-[#0e0e0e]/90 px-2.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[#c9a84c]"
          style={{ rotate: -6 }}
          initial={{ opacity: 0, scale: 1.6 }}
          animate={p >= 6 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.6 }}
          transition={instant ? { duration: 0 } : { type: "spring", stiffness: 420, damping: 18 }}
        >
          <Check size={11} strokeWidth={3} /> Schváleno
        </motion.div>
      </div>
    </div>
  );
}

/* ─── 03 Tvorba: kód se píše, živý náhled roste, ZakazIQ ukazuje stav ─── */

const BUILD_TIMES = [300, 950, 1600, 2250, 2900] as const;
const CODE_LINES = ["Uvod", "Sluzby", "Reference", "Kontakt"];
const BUILD_PROGRESS = [0.04, 0.25, 0.5, 0.75, 0.9];

function CodeLine({ n, show, typing, instant, children }: { n: number; show: boolean; typing: boolean; instant: boolean; children: ReactNode }) {
  return (
    <div className="flex items-center whitespace-nowrap">
      <span className="mr-2.5 w-3 select-none text-right text-white/20">{n}</span>
      <motion.span
        className="whitespace-pre"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: show ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)" }}
        transition={instant ? { duration: 0 } : { duration: 0.45, ease: "linear" }}
      >
        {children}
      </motion.span>
      {typing && !instant ? <span className="ml-px inline-block h-[11px] w-[5px] animate-pulse bg-[#c9a84c]" /> : null}
    </div>
  );
}

function BuildScene({ run, instant }: SceneProps) {
  const p = usePhases(run, instant, BUILD_TIMES);
  const pct = Math.round(BUILD_PROGRESS[Math.min(p, 4)] * 100);

  return (
    <div className="flex h-full flex-col gap-3 p-4 font-inter">
      <div className="grid min-h-0 flex-1 grid-cols-[1.15fr_1fr] gap-2.5">
        <div className="overflow-hidden border border-white/[0.07] bg-black/40 px-2 py-2 font-mono text-[10.5px] leading-[1.85] text-white/45">
          <CodeLine n={1} show={p >= 1} typing={false} instant={instant}>
            &lt;<span className="text-[#f0ece6]/80">Web</span>&gt;
          </CodeLine>
          {CODE_LINES.map((name, i) => (
            <CodeLine key={name} n={i + 2} show={p >= i + 1} typing={p === i + 1} instant={instant}>
              {"  "}&lt;<span className="text-[#c9a84c]">{name}</span> /&gt;
            </CodeLine>
          ))}
          <CodeLine n={6} show={p >= 1} typing={false} instant={instant}>
            &lt;/<span className="text-[#f0ece6]/80">Web</span>&gt;
          </CodeLine>
        </div>

        <div className="flex flex-col gap-1.5 overflow-hidden border border-white/[0.07] bg-[#0b0b0b] p-2">
          <div className="flex items-center justify-between">
            <span className="h-1 w-6 bg-white/25" />
            <span className="flex items-center gap-1 text-[8.5px] uppercase tracking-[0.14em] text-text-secondary">
              <span className={cn("h-1.5 w-1.5 rounded-full transition-colors duration-500", p >= 5 ? "bg-[#7fd1a1]" : "bg-white/20")} />
              živě
            </span>
          </div>
          <Appear show={p >= 1} instant={instant} y={6} className="h-10 border border-[#c9a84c]/20 bg-gradient-to-br from-[#c9a84c]/30 to-transparent p-1.5">
            <span className="block h-1.5 w-3/5 bg-[#f0ece6]/70" />
            <span className="mt-1 block h-1.5 w-2/5 bg-[#f0ece6]/40" />
          </Appear>
          <Appear show={p >= 2} instant={instant} y={6} className="grid h-[22px] grid-cols-3 gap-1">
            <span className="bg-white/10" />
            <span className="bg-white/10" />
            <span className="bg-white/10" />
          </Appear>
          <Appear show={p >= 3} instant={instant} y={6} className="h-3.5 bg-white/[0.07]" />
          <Appear show={p >= 4} instant={instant} y={6} className="h-3 w-1/2 bg-[#c9a84c]" />
        </div>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between text-[9.5px] uppercase tracking-[0.14em] text-text-secondary">
          <span>Stav projektu · ZakazIQ</span>
          <span className="font-mono tabular-nums text-[#c9a84c]">{pct} %</span>
        </div>
        <div className="h-[3px] w-full overflow-hidden bg-white/[0.07]">
          <motion.div
            className="h-full origin-left bg-gradient-to-r from-[#c9a84c]/50 to-[#c9a84c]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: BUILD_PROGRESS[Math.min(p, 4)] }}
            transition={tr(instant, 0.6)}
          />
        </div>
      </div>
    </div>
  );
}

/* ─── 04 Spuštění: web naběhne, jde online a klient dostane klíče ─── */

const LAUNCH_TIMES = [250, 1350, 1450, 2100] as const;
const HANDOVER = ["Přístupy", "Návod", "Podpora"];
const SPARKS = Array.from({ length: 12 }, (_, i) => {
  const angle = (i / 12) * Math.PI * 2;
  const distance = 34 + (i % 3) * 12;
  return { x: Math.cos(angle) * distance, y: Math.sin(angle) * distance };
});

function LaunchScene({ run, instant }: SceneProps) {
  const p = usePhases(run, instant, LAUNCH_TIMES);

  return (
    <div className="flex h-full flex-col gap-3 p-4 font-inter">
      <div className="relative min-h-0 flex-1 overflow-hidden border border-white/[0.07] bg-black/40">
        <div className="relative flex h-7 items-center gap-2 border-b border-white/[0.06] px-2.5">
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/15" />
          </span>
          <span className="ml-1 flex min-w-0 flex-1 items-center gap-1.5 bg-white/[0.05] px-2 py-0.5 font-mono text-[10px] text-[#f0ece6]/75">
            <Lock size={9} className="shrink-0 text-[#c9a84c]" />
            <span className="truncate">vase-firma.cz</span>
          </span>
          <span className="grid text-[9px] uppercase tracking-[0.14em]">
            <motion.span
              className="col-start-1 row-start-1 text-text-secondary"
              initial={{ opacity: 0 }}
              animate={{ opacity: p === 1 ? 1 : 0 }}
              transition={tr(instant, 0.3)}
            >
              Spouštím…
            </motion.span>
            <motion.span
              className="col-start-1 row-start-1 flex items-center gap-1 text-[#7fd1a1]"
              initial={{ opacity: 0 }}
              animate={{ opacity: p >= 2 ? 1 : 0 }}
              transition={tr(instant, 0.3)}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#7fd1a1]" /> Online
            </motion.span>
          </span>
          <motion.span
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#c9a84c]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: p >= 1 ? 1 : 0, opacity: p >= 2 ? 0 : 1 }}
            transition={instant ? { duration: 0 } : { scaleX: { duration: 1.05, ease: [0.4, 0, 0.2, 1] }, opacity: { duration: 0.4 } }}
          />
        </div>

        <div className="flex h-[calc(100%-28px)] items-center justify-between gap-3 px-4">
          <div className="flex flex-1 flex-col gap-2">
            <Appear show={p >= 2} instant={instant} className="h-1 w-8 bg-[#c9a84c]" />
            <Appear show={p >= 2} instant={instant} delay={0.06} className="h-2.5 w-[85%] bg-[#f0ece6]/80" />
            <Appear show={p >= 2} instant={instant} delay={0.12} className="h-2.5 w-[60%] bg-[#f0ece6]/50" />
            <Appear show={p >= 2} instant={instant} delay={0.18} className="mt-1 h-4 w-16 bg-[#c9a84c]" />
          </div>

          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
            {p >= 3 && !instant
              ? SPARKS.map((spark, i) => (
                  <motion.span
                    key={i}
                    className="absolute h-1 w-1 rounded-full bg-[#e6c977]"
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{ x: spark.x, y: spark.y, opacity: 0, scale: 0.3 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  />
                ))
              : null}
            <motion.span
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#c9a84c]/60 bg-[#c9a84c]/15 text-[#c9a84c] shadow-[0_0_30px_-4px_rgba(201,168,76,0.6)]"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={p >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.4 }}
              transition={instant ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 16 }}
            >
              <Rocket size={20} strokeWidth={1.5} />
            </motion.span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        {HANDOVER.map((item, i) => (
          <Appear
            key={item}
            show={p >= 4}
            instant={instant}
            delay={i * 0.12}
            className="flex flex-1 items-center justify-center gap-1.5 border border-[#c9a84c]/25 bg-[#c9a84c]/[0.07] py-1.5 text-[10.5px] text-[#f0ece6]/90"
          >
            <Check size={11} strokeWidth={2.5} className="text-[#c9a84c]" /> {item}
          </Appear>
        ))}
      </div>
    </div>
  );
}

const SCENES: Record<SceneId, ComponentType<SceneProps>> = {
  konzultace: ConsultScene,
  navrh: DesignScene,
  tvorba: BuildScene,
  spusteni: LaunchScene,
};

/**
 * Rámeček scény: lehký 3D náklon a zlaté světlo za kurzorem myši,
 * v hlavičce popisek kroku a tlačítko, které scénu přehraje znovu
 * (přemountuje ji přes `key`).
 */
export function StepStage({
  scene,
  icon: Icon,
  label,
  run,
  instant,
  className,
}: {
  scene: SceneId;
  icon: LucideIcon;
  label: string;
  run: boolean;
  instant: boolean;
  className?: string;
}) {
  const [round, setRound] = useState(0);
  const frameRef = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 20 });
  const Scene = SCENES[scene];

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const frame = frameRef.current;
    if (!frame) return;
    const box = frame.getBoundingClientRect();
    const px = (event.clientX - box.left) / box.width;
    const py = (event.clientY - box.top) / box.height;
    frame.style.setProperty("--mx", `${px * 100}%`);
    frame.style.setProperty("--my", `${py * 100}%`);
    if (instant) return;
    rotateY.set((px - 0.5) * 9);
    rotateX.set((0.5 - py) * 7);
  }

  function onPointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={frameRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={cn(
        "group/stage relative w-full max-w-[420px] overflow-hidden border border-white/[0.08] bg-[#121212]/85 shadow-[0_0_0_1px_rgba(201,168,76,0.05)_inset,0_30px_80px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md transition-colors duration-500 hover:border-[#c9a84c]/30",
        className
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/stage:opacity-100"
        style={{ background: "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(201,168,76,0.12), transparent 65%)" }}
      />

      <div className="relative flex h-9 items-center justify-between border-b border-white/[0.06] pl-3.5 pr-1.5">
        <span className="flex items-center gap-2 font-inter text-[10px] uppercase tracking-[0.18em] text-text-secondary">
          <Icon size={12} strokeWidth={1.6} className="text-[#c9a84c]" aria-hidden="true" />
          {label}
        </span>
        <button
          type="button"
          onClick={() => setRound((r) => r + 1)}
          disabled={!run}
          className="flex h-7 w-7 items-center justify-center text-text-secondary/70 transition-[color,opacity] duration-300 hover:text-[#c9a84c] focus-visible:text-[#c9a84c] focus-visible:outline focus-visible:outline-1 focus-visible:outline-[#c9a84c] disabled:opacity-0"
        >
          <RotateCcw size={12} aria-hidden="true" />
          <span className="sr-only">Přehrát ukázku kroku znovu</span>
        </button>
      </div>

      <div aria-hidden="true" className="relative h-[204px]">
        <Scene key={round} run={run} instant={instant} />
      </div>
    </motion.div>
  );
}
