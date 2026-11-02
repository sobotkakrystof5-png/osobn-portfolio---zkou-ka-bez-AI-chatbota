"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { BatteryFull, Bell, Check, Menu, Phone, Search, Signal, Wifi } from "lucide-react";
import type { IndustryScene } from "@/lib/data/industry-pages";
import { cn } from "@/lib/utils";

// Hero oborové stránky: telefon, ve kterém se odehraje cesta zákazníka
// k zakázce. Hledá (píše dotaz do vyhledávače) → najde ukázkový web oboru →
// klikne na hlavní akci → majiteli přijde poptávka. Obsah scény je z dat
// oboru (lib/data/industry-pages), ukázkový web má podle oboru jednu z pěti
// podob (volání, rezervace, galerie, před a po, poptávka).
//
// Kroky se přehrávají samy, jen když je telefon ve výřezu a myš není nad ním.
// Pod telefonem jsou tlačítka kroků, dají se proklikat i klávesnicí. Pod
// reduced motion se nic nepřehrává samo a dotaz je rovnou celý napsaný.
// Obsah telefonu je ilustrace (aria-hidden), význam nese popisek pod ním.

const STAGES = ["Hledá", "Najde vás", "Klikne", "Poptá vás"] as const;
const DURATION = [4300, 2900, 3300, 4200];
const EASE = [0.22, 1, 0.36, 1] as const;

const CAPTION_CLICK: Record<IndustryScene["variant"], string> = {
  call: "Jedním klepnutím vám volá.",
  booking: "Vybere si volný termín a rezervuje.",
  gallery: "Prohlédne si realizace a chce podobnou.",
  beforeAfter: "Uvidí rozdíl a pošle poptávku s fotkou.",
  form: "Vyplní poptávku za půl minuty.",
};

const CONFIRM: Record<IndustryScene["variant"], string> = {
  call: "Hovor spojen",
  booking: "Rezervace potvrzena",
  gallery: "Poptávka odeslána",
  beforeAfter: "Poptávka odeslána",
  form: "Poptávka odeslána",
};

export function JourneyPhone({ scene, className }: { scene: IndustryScene; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const reduced = useReducedMotion() ?? false;
  const [hover, setHover] = useState(false);
  const [stage, setStage] = useState(0);
  const [typed, setTyped] = useState(scene.query.length);

  const playing = inView && !hover && !reduced;

  // Další krok po uplynutí délky toho současného.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => setStage((s) => (s + 1) % STAGES.length), DURATION[stage]);
    return () => window.clearTimeout(id);
  }, [stage, playing]);

  // Psaní dotazu do vyhledávače v prvním kroku.
  useEffect(() => {
    if (stage !== 0 || reduced) {
      setTyped(scene.query.length);
      return;
    }
    setTyped(0);
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setTyped(i);
      if (i >= scene.query.length) window.clearInterval(id);
    }, 48);
    return () => window.clearInterval(id);
  }, [stage, reduced, scene.query]);

  const caption = [
    `Zákazník hledá „${scene.query}“.`,
    "Najde váš web a hned ví, že je u vás správně.",
    CAPTION_CLICK[scene.variant],
    "Vám přijde nová zakázka, i když zrovna pracujete.",
  ][stage];

  return (
    <figure
      ref={ref}
      className={cn("relative mx-auto w-full max-w-[420px]", className)}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={() => setHover(false)}
    >
      {/* Měkké podsvícení za telefonem */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[70%] w-[90%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#c9a84c]/[0.13] blur-[70px]"
        aria-hidden="true"
      />

      <div className="relative mx-auto w-[248px] sm:w-[272px]" aria-hidden="true">
        <PhoneFrame>
          <StatusBar light={scene.variant === "call" && stage >= 2} />
          <AnimatePresence mode="wait" initial={false}>
            {stage === 0 ? (
              <SearchScreen key="search" scene={scene} typed={typed} />
            ) : (
              <SiteScreen key="site" scene={scene} stage={stage} />
            )}
          </AnimatePresence>
        </PhoneFrame>

        {/* Oznámení majiteli vyjede vedle telefonu, ne v něm: přijde vám, ne zákazníkovi. */}
        <AnimatePresence>
          {stage === 3 && (
            <motion.div
              key="notify"
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.35 }}
              className={cn("absolute -left-6 z-20 w-[230px] border border-[#c9a84c]/40 bg-[#14110b]/95 p-3.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.9)] sm:-left-24 sm:w-[250px]", scene.variant === "call" ? "bottom-[27%]" : "bottom-[10%]")}
            >
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center bg-[#c9a84c] text-[#080808]">
                  <Bell size={15} strokeWidth={2.2} />
                </span>
                <div className="min-w-0">
                  <p className="flex items-center justify-between gap-2 font-inter text-[11px] text-[#a39a8b]">
                    <span>Vám přišlo</span>
                    <span>teď</span>
                  </p>
                  <p className="mt-0.5 font-inter text-[13px] font-semibold leading-snug text-[#f6f2ea]">{scene.notify.title}</p>
                  <p className="mt-0.5 font-inter text-[12px] leading-snug text-[#d6cebf]">{scene.notify.text}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Kroky cesty: přehrávají se samy, dají se i proklikat. */}
      <div className="relative mt-8">
        <div role="group" aria-label="Cesta zákazníka k poptávce" className="grid grid-cols-4 gap-1.5">
          {STAGES.map((label, i) => {
            const active = i === stage;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={active}
                onClick={() => setStage(i)}
                className={cn(
                  "group relative overflow-hidden px-1 pb-2.5 pt-2 text-center font-inter text-[12px] transition-colors duration-300 sm:text-[13px]",
                  active ? "text-[#f0ece6]" : "text-text-muted hover:text-text-secondary"
                )}
              >
                {label}
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-white/[0.08]" aria-hidden="true" />
                <span
                  aria-hidden="true"
                  key={active && playing ? `run-${stage}` : `idle-${i}`}
                  className={cn(
                    "absolute inset-x-0 bottom-0 h-[2px] origin-left bg-[#c9a84c]",
                    i < stage ? "scale-x-100" : active ? (playing ? "animate-[journey-progress_linear_forwards]" : "scale-x-100") : "scale-x-0"
                  )}
                  style={active && playing ? { animationDuration: `${DURATION[i]}ms` } : undefined}
                />
              </button>
            );
          })}
        </div>
        <figcaption className="mt-4 min-h-[48px] text-center font-inter text-[15px] leading-relaxed text-text-secondary">
          {caption}
        </figcaption>
      </div>
    </figure>
  );
}

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative rounded-[46px] bg-[linear-gradient(145deg,#6f7075_0%,#2f3034_32%,#1f2023_70%,#55565b_100%)] p-[3px] shadow-[0_40px_90px_-30px_rgba(0,0,0,0.95)]">
      <div className="rounded-[43px] bg-black p-[9px]">
        <div className="relative aspect-[9/19] overflow-hidden rounded-[34px] bg-[#f5f0e8]">
          <div className="absolute left-1/2 top-[9px] z-30 h-[22px] w-[78px] -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar({ light }: { light: boolean }) {
  return (
    <div
      className={cn(
        "absolute inset-x-0 top-0 z-20 flex h-[40px] items-center justify-between px-6 pt-1 font-inter text-[11px] font-semibold transition-colors delay-1000 duration-500",
        light ? "text-white" : "text-[#1d1b18]"
      )}
    >
      <span>14:32</span>
      <span className="flex items-center gap-1">
        <Signal size={11} strokeWidth={2.5} />
        <Wifi size={11} strokeWidth={2.5} />
        <BatteryFull size={14} strokeWidth={2} />
      </span>
    </div>
  );
}

/* ─── Krok 1: vyhledávač ─────────────────────────────── */

function SearchScreen({ scene, typed }: { scene: IndustryScene; typed: number }) {
  const done = typed >= scene.query.length;
  const title = scene.headline.split(" · ")[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.35 }}
      className="absolute inset-0 bg-white px-4 pt-[52px]"
    >
      <div className="flex items-center gap-2 rounded-full border border-[#e3ddd3] bg-white px-3.5 py-2.5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.15)]">
        <Search size={13} className="shrink-0 text-[#8a8070]" />
        <span className="min-w-0 truncate font-inter text-[12px] text-[#1d1b18]">
          {scene.query.slice(0, typed)}
          {!done && <span className="ml-px inline-block h-[13px] w-px translate-y-[2px] animate-pulse bg-[#1d1b18]" />}
        </span>
      </div>

      <motion.div
        initial={false}
        animate={{ opacity: done ? 1 : 0, y: done ? 0 : 10 }}
        transition={{ duration: 0.45, ease: EASE, delay: done ? 0.15 : 0 }}
        className="mt-5 space-y-4"
      >
        <div className="relative -mx-2 border border-[#c9a84c]/60 bg-[#fbf7ee] p-2.5">
          <span className="absolute -top-2 right-2 bg-[#c9a84c] px-1.5 py-0.5 font-inter text-[8px] font-semibold uppercase tracking-[0.1em] text-[#1d1b18]">
            Ukázka
          </span>
          <p className="flex items-center gap-1.5 font-inter text-[10px] text-[#5d564b]">
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1d1b18] text-[8px] font-semibold text-[#c9a84c]">
              {scene.brand.charAt(0)}
            </span>
            {scene.brand}
          </p>
          <p className="mt-1.5 font-inter text-[13px] font-medium leading-snug text-[#1a4fb4]">
            {scene.brand}: {title}
          </p>
          <p className="mt-1 font-inter text-[10px] leading-snug text-[#5d564b]">{scene.chips.join(" · ")} · poptávka online</p>
        </div>
        {[
          ["Katalog firem v okolí", "Seznam kontaktů bez fotek a cen."],
          ["Profil na sociální síti", "Poslední příspěvek před dvěma lety."],
        ].map(([t, d]) => (
          <div key={t} className="opacity-45">
            <p className="font-inter text-[12px] text-[#1a4fb4]">{t}</p>
            <p className="mt-0.5 font-inter text-[10px] text-[#5d564b]">{d}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ─── Kroky 2–4: ukázkový web oboru ──────────────────── */

function SiteScreen({ scene, stage }: { scene: IndustryScene; stage: number }) {
  const clicked = stage >= 2;
  const sent = stage === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="absolute inset-0 flex flex-col bg-[#f5f0e8] pt-[40px]"
    >
      <div className="flex items-center justify-between border-b border-[#1d1b18]/[0.08] px-4 py-2.5">
        <span className="flex items-center gap-2">
          <span className="flex h-[22px] w-[22px] items-center justify-center bg-[#1d1b18] font-cormorant text-[13px] text-[#c9a84c]">
            {scene.brand.charAt(0)}
          </span>
          <span className="font-inter text-[11px] font-semibold text-[#1d1b18]">{scene.brand}</span>
        </span>
        <Menu size={15} className="text-[#1d1b18]" />
      </div>

      {/* Úvodní obrázek ukázkového webu: tón oboru, název a obor přes něj. */}
      <div className="relative mx-4 mt-3 h-[92px] shrink-0 overflow-hidden" style={{ background: tileBackground(bannerTone(scene)) }}>
        <div className="absolute inset-0 flex flex-col justify-end p-3">
          <p className="font-inter text-[8px] font-medium uppercase tracking-[0.14em] text-white/80">{scene.headline}</p>
          <p className="mt-1 font-cormorant text-[21px] leading-none text-white">{scene.brand}</p>
        </div>
      </div>

      <div className="px-4 pt-3">
        <div className="flex flex-wrap gap-1">
          {scene.chips.map((chip) => (
            <span key={chip} className="border border-[#1d1b18]/15 px-2 py-1 font-inter text-[9.5px] text-[#3a352e]">
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="relative min-h-0 flex-1 px-4 pt-3">
        <VariantBody scene={scene} clicked={clicked} />
      </div>

      <div className="relative px-4 pb-5 pt-3">
        <motion.div
          animate={clicked && !sent ? { scale: [1, 0.94, 1] } : { scale: 1 }}
          transition={{ duration: 0.4, delay: scene.variant === "form" ? 1.9 : scene.variant === "beforeAfter" ? 1.6 : 0.9 }}
          className="relative flex items-center justify-center gap-2 bg-[#1d1b18] py-3 font-inter text-[11.5px] font-semibold uppercase tracking-[0.08em] text-[#e7cd7c]"
        >
          {scene.variant === "call" && <Phone size={13} strokeWidth={2.4} />}
          {scene.action}
          {clicked && !sent && (
            <motion.span
              className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#c9a84c]"
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: [0, 0.9, 0], scale: [0.4, 1.8, 2.4] }}
              transition={{ duration: 0.8, delay: scene.variant === "form" ? 1.9 : scene.variant === "beforeAfter" ? 1.6 : 0.9 }}
            />
          )}
        </motion.div>
      </div>

      {/* Volání: obrazovka hovoru po klepnutí. */}
      <AnimatePresence>
        {scene.variant === "call" && clicked && (
          <motion.div
            key="calling"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: sent ? 0 : 1.3 }}
            className="absolute inset-0 z-10 flex flex-col items-center bg-[#1b1a18] pt-[96px] text-center"
          >
            <p className="font-inter text-[11px] text-[#a39a8b]">{sent ? "Spojeno · 00:12" : "Volání…"}</p>
            <p className="mt-2 px-6 font-cormorant text-[24px] leading-tight text-[#f6f2ea]">{scene.brand}</p>
            <span className="relative mt-auto mb-16 flex h-14 w-14 items-center justify-center rounded-full bg-[#3fae5a] text-white">
              {!sent && <span className="absolute inset-0 animate-ping rounded-full bg-[#3fae5a]/50" />}
              <Phone size={22} strokeWidth={2.2} className="relative" />
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Potvrzení pro zákazníka */}
      <AnimatePresence>
        {sent && scene.variant !== "call" && (
          <motion.div
            key="sent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 z-10 flex items-center justify-center bg-[#f5f0e8]/85 px-6"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="w-full border border-[#1d1b18]/10 bg-white px-4 py-6 text-center shadow-[0_18px_40px_-20px_rgba(0,0,0,0.35)]"
            >
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#c9a84c] text-[#1d1b18]">
                <Check size={22} strokeWidth={3} />
              </span>
              <p className="mt-3 font-inter text-[13px] font-semibold text-[#1d1b18]">{CONFIRM[scene.variant]}</p>
              <p className="mt-1 font-inter text-[10.5px] leading-snug text-[#5d564b]">Děkujeme, brzy se vám ozveme.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function VariantBody({ scene, clicked }: { scene: IndustryScene; clicked: boolean }) {
  switch (scene.variant) {
    case "call":
      return <CallBody scene={scene} />;
    case "booking":
      return <BookingBody scene={scene} clicked={clicked} />;
    case "gallery":
      return <GalleryBody scene={scene} clicked={clicked} />;
    case "beforeAfter":
      return <BeforeAfterBody scene={scene} clicked={clicked} />;
    case "form":
      return <FormBody scene={scene} clicked={clicked} />;
  }
}

function CallBody({ scene }: { scene: IndustryScene }) {
  return (
    <div>
      <p className="font-cormorant text-[21px] leading-[1.05] text-[#1d1b18]">Pomoc, když ji potřebujete.</p>
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {["Výjezd do 60 min", "Cena předem", "Záruka na práci", "Platba kartou"].map((item) => (
          <p key={item} className="flex items-center gap-1.5 bg-white px-2 py-2 font-inter text-[9.5px] text-[#3a352e]">
            <Check size={10} strokeWidth={3} className="shrink-0 text-[#9a7a2c]" />
            {item}
          </p>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 font-inter text-[10px] text-[#5d564b]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#3fae5a]/60" />
          <span className="relative h-2 w-2 rounded-full bg-[#3fae5a]" />
        </span>
        {scene.headline.split(" · ")[1] ?? "V okolí"} · teď k dispozici
      </p>
    </div>
  );
}

function BookingBody({ scene, clicked }: { scene: IndustryScene; clicked: boolean }) {
  const slots = scene.slots ?? [];
  const pick = slots.find((slot) => scene.action.includes(slot));
  const days = [
    ["Po", "12"],
    ["Út", "13"],
    ["St", "14"],
    ["Čt", "15"],
    ["Pá", "16"],
  ];

  return (
    <div>
      <p className="font-inter text-[10px] font-medium text-[#3a352e]">Vyberte termín</p>
      <div className="mt-2 grid grid-cols-5 gap-1">
        {days.map(([d, n], i) => (
          <span
            key={d}
            className={cn(
              "flex flex-col items-center py-1.5 font-inter text-[9px]",
              i === 4 ? "bg-[#1d1b18] text-[#e7cd7c]" : "bg-white text-[#5d564b]"
            )}
          >
            {d}
            <span className="text-[12px] font-semibold">{n}</span>
          </span>
        ))}
      </div>
      <div className="mt-2.5 grid grid-cols-3 gap-1.5">
        {slots.map((slot, i) => {
          const chosen = clicked && slot === pick;
          return (
            <motion.span
              key={slot}
              animate={chosen ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.4, delay: 0.35 }}
              className={cn(
                "py-2 text-center font-inter text-[10.5px] font-medium transition-colors duration-300",
                chosen
                  ? "bg-[#c9a84c] text-[#1d1b18] delay-300"
                  : i === 0 || i === 2
                    ? "bg-[#ebe4d8] text-[#a39a8b] line-through"
                    : "bg-white text-[#1d1b18]"
              )}
            >
              {slot}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

const DEFAULT_TONES = ["#6b5a48", "#4d5560", "#7a5a3a", "#3f4a52", "#857563", "#5b5248"];

function GalleryBody({ scene, clicked }: { scene: IndustryScene; clicked: boolean }) {
  const tiles = scene.tiles ?? [];
  const tones = scene.tones ?? DEFAULT_TONES;

  return (
    <div className="relative">
      <div className="grid grid-cols-3 gap-1">
        {tiles.slice(0, 6).map((label, i) => (
          <span
            key={label}
            className={cn("relative block overflow-hidden", i === 0 ? "col-span-2 row-span-2 aspect-square" : "aspect-square")}
            style={{ background: tileBackground(tones[i % tones.length]) }}
          >
            <span className="absolute bottom-1 left-1.5 font-inter text-[8px] font-medium text-white/85">{label}</span>
          </span>
        ))}
      </div>
      <AnimatePresence>
        {clicked && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0, scale: 0.6, x: "-18%", y: "-18%" }}
            animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.2 }}
            className="absolute inset-0 z-[1] flex flex-col justify-end p-2.5"
            style={{ background: tileBackground(tones[0]) }}
          >
            <p className="font-cormorant text-[19px] leading-none text-white">{tiles[0]}</p>
            <p className="mt-1 font-inter text-[9px] text-white/75">Realizace na míru · detail</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const BANNER_TONE: Record<IndustryScene["variant"], string> = {
  call: "#2f3a45",
  booking: "#7a5f55",
  gallery: "#5b4a3a",
  beforeAfter: "#5a5244",
  form: "#3f4a52",
};

function bannerTone(scene: IndustryScene) {
  return scene.variant === "gallery" && scene.tones ? scene.tones[3] : BANNER_TONE[scene.variant];
}

/** Dlaždice „fotky“: tón oboru s měkkým světlem shora a tmavší patou. */
function tileBackground(tone: string) {
  return `radial-gradient(120% 80% at 30% 15%, rgba(255,255,255,0.28), transparent 55%), linear-gradient(180deg, transparent 55%, rgba(0,0,0,0.45)), ${tone}`;
}

function BeforeAfterBody({ scene, clicked }: { scene: IndustryScene; clicked: boolean }) {
  const [before, after] = scene.tones ?? ["#4a4238", "#e6ddd0"];

  return (
    <div className="relative aspect-[4/3] overflow-hidden">
      {/* Po: čistý povrch */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(90% 70% at 70% 20%, rgba(255,255,255,0.35), transparent 60%), ${after}` }}
      />
      {/* Před: skvrny a šrafura, oříznuté posuvníkem */}
      <motion.div
        className="absolute inset-0"
        initial={false}
        animate={{ clipPath: clicked ? ["inset(0 50% 0 0)", "inset(0 92% 0 0)", "inset(0 18% 0 0)", "inset(0 50% 0 0)"] : "inset(0 50% 0 0)" }}
        transition={{ duration: 2.2, ease: "easeInOut", times: [0, 0.4, 0.75, 1] }}
        style={{
          background: `radial-gradient(30% 25% at 30% 70%, rgba(0,0,0,0.35), transparent 70%), radial-gradient(25% 20% at 65% 35%, rgba(0,0,0,0.28), transparent 70%), repeating-linear-gradient(135deg, rgba(255,255,255,0.05) 0 2px, transparent 2px 7px), ${before}`,
        }}
      />
      <motion.div
        className="absolute inset-y-0 w-[2px] bg-white shadow-[0_0_8px_rgba(0,0,0,0.4)]"
        initial={false}
        animate={{ left: clicked ? ["50%", "8%", "82%", "50%"] : "50%" }}
        transition={{ duration: 2.2, ease: "easeInOut", times: [0, 0.4, 0.75, 1] }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white font-inter text-[9px] font-semibold text-[#1d1b18]">
          ↔
        </span>
      </motion.div>
      <span className="absolute left-1.5 top-1.5 bg-black/55 px-1.5 py-0.5 font-inter text-[8.5px] font-medium text-white">Před</span>
      <span className="absolute right-1.5 top-1.5 bg-white/80 px-1.5 py-0.5 font-inter text-[8.5px] font-medium text-[#1d1b18]">Po</span>
    </div>
  );
}

function FormBody({ scene, clicked }: { scene: IndustryScene; clicked: boolean }) {
  return (
    <div className="space-y-2">
      <p className="font-inter text-[10px] font-medium text-[#3a352e]">Nezávazná poptávka</p>
      {(scene.fields ?? []).map((field, i) => (
        <div key={field.label}>
          <p className="font-inter text-[8.5px] uppercase tracking-[0.08em] text-[#8a8070]">{field.label}</p>
          <div className="mt-0.5 flex h-[26px] items-center overflow-hidden bg-white px-2 font-inter text-[10.5px] text-[#1d1b18]">
            {clicked ? (
              <motion.span
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{ duration: 0.45, delay: 0.25 + i * 0.5, ease: "linear" }}
                className="whitespace-nowrap"
              >
                {field.value}
              </motion.span>
            ) : (
              <span className="text-[#bdb4a5]">…</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
