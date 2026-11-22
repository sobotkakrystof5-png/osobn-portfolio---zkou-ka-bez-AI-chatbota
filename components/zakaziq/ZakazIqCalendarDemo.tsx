"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Check, RotateCcw } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { ZakazIqMark } from "@/components/zakaziq/ZakazIqMark";
import { sampleLabel, zq } from "@/components/zakaziq/dilky";
import { cn } from "@/lib/utils";

// Hlavní obraz produktu podle DESIGN.md ZakazIQ: jedna poptávka v kalendáři,
// od čárkovaného přání po potvrzený termín. Vzor je živá ukázka z landing
// page zakaziq.cz (components/marketing/live-demo.tsx), tady zhuštěná do
// jednoho okna. Po dojetí do výřezu proběhne jednou sama, pak ji ovládají
// tlačítka. Žádná smyčka. Potvrzení termínu nezapisuje příjem ani razítko,
// to přijde až po zaplacení (PRODUCT.md), proto o tom ukázka mlčí.

const STEPS = ["Poptávka", "Detail", "Potvrzeno"] as const;
const DAYS = ["PO 5", "ÚT 6", "ST 7", "ČT 8", "PÁ 9"];
const HOURS = ["9:00", "10:00", "11:00", "12:00"];
const AUTOPLAY_MS = [2000, 2200];

type Slot = { day: number; top: number; height: number; title: string; time?: string; kind: "confirmed" | "block" };

// top/height v procentech výšky sloupce (4 hodiny, 1 h = 25 %)
const SLOTS: Slot[] = [
  { day: 0, top: 25, height: 37.5, title: "Hájek", time: "10:00", kind: "confirmed" },
  { day: 1, top: 50, height: 25, title: "Jana", time: "11:00", kind: "confirmed" },
  { day: 2, top: 75, height: 25, title: "Oběd", kind: "block" },
  { day: 3, top: 0, height: 25, title: "Marek", time: "9:00", kind: "confirmed" },
];

const focus = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8aaee3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1a36]";

export function ZakazIqCalendarDemo({ className }: { className?: string }) {
  const [step, setStep] = useState(0);
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    const first = window.setTimeout(() => !touched.current && setStep(1), AUTOPLAY_MS[0]);
    const second = window.setTimeout(() => !touched.current && setStep(2), AUTOPLAY_MS[0] + AUTOPLAY_MS[1]);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, [inView, reduced]);

  const go = (next: number) => {
    touched.current = true;
    setStep(next);
  };

  const confirmed = step === 2;

  return (
    <div ref={ref} className={cn(zq.frame, "overflow-hidden font-inter shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]", className)}>
      {/* Hlavička okna */}
      <div className={cn("flex items-center gap-3 border-b px-4 py-3 sm:px-5", zq.line)}>
        <ZakazIqMark size="sm" />
        <p className="text-[15px] font-semibold tracking-[-0.01em]">Kalendář</p>
        <span className={cn("ml-auto", sampleLabel)}>Ukázka</span>
      </div>

      <div className={cn(zq.surface)}>
        {/* Kroky ukázky */}
        <div className={cn("flex items-center justify-between gap-4 border-b px-4 sm:px-5", zq.line)}>
          <div role="group" aria-label="Kroky ukázky" className="flex gap-5">
            {STEPS.map((label, i) => (
              <button
                key={label}
                type="button"
                aria-pressed={i === step}
                onClick={() => go(i)}
                className={cn(
                  "min-h-11 border-b-2 text-[13px] font-semibold transition-colors duration-300",
                  i === step ? "border-[#8aaee3] text-[#eef2fb]" : "border-transparent text-[#b8ceef] hover:text-[#eef2fb]",
                  focus
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <span className={cn("hidden text-[12px] sm:block", zq.data, zq.quiet)}>5.–9. října</span>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_210px]">
          {/* Týden. Na telefonu jen pátek, jako v aplikaci. */}
          <div aria-hidden="true" className="min-w-0 p-4 sm:p-5">
            <div className="grid grid-cols-[40px_minmax(0,1fr)] sm:grid-cols-[40px_repeat(5,minmax(0,1fr))]">
              <span />
              {DAYS.map((day, i) => (
                <span key={day} className={cn("pb-2.5 text-center text-[11px]", zq.data, zq.quiet, i < 4 && "hidden sm:block")}>
                  {day}
                </span>
              ))}
              <div className="relative">
                {HOURS.map((hour, i) => (
                  <span key={hour} className={cn("absolute left-0 -translate-y-1/2 text-[10px]", zq.data, zq.quiet)} style={{ top: `${i * 25}%` }}>
                    {hour}
                  </span>
                ))}
              </div>
              {DAYS.map((day, d) => (
                <div key={day} className={cn("relative h-[190px] border-l lg:h-[250px]", zq.line, d < 4 && "hidden sm:block")}>
                  {HOURS.map((hour, i) => (
                    <span key={hour} className={cn("absolute inset-x-0 border-t", zq.line)} style={{ top: `${i * 25}%` }} />
                  ))}
                  {SLOTS.filter((s) => s.day === d).map((s) => (
                    <div
                      key={s.title}
                      className={cn(
                        "absolute inset-x-1 overflow-hidden rounded-[9px] px-2 py-1.5 text-[11px] leading-tight",
                        s.kind === "confirmed" ? zq.confirmed : zq.block
                      )}
                      style={{ top: `calc(${s.top}% + 2px)`, height: `calc(${s.height}% - 4px)` }}
                    >
                      {s.time && <span className={cn("block", zq.data)}>{s.time}</span>}
                      <span className="block truncate font-semibold">{s.title}</span>
                    </div>
                  ))}
                  {d === 4 && (
                    <div
                      className={cn(
                        "absolute inset-x-1 top-[2px] h-[calc(37.5%-4px)] overflow-hidden rounded-[9px] px-2 py-1.5 leading-tight transition-[background-color,border-color,color,box-shadow] duration-500",
                        confirmed ? zq.confirmed : zq.pending,
                        step === 1 && "ring-2 ring-[#e19a2c]/40 ring-offset-2 ring-offset-[#132850]"
                      )}
                    >
                      <span className={cn("flex items-center gap-1 text-[11px]", zq.data)}>
                        9:00 {confirmed && <Check size={12} strokeWidth={2} />}
                      </span>
                      <span className="block truncate text-[13px] font-semibold sm:text-[12px]">Tereza Malá</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Detail vedle kalendáře */}
          <div className={cn("flex flex-col gap-1 border-t p-4 sm:p-5 lg:border-l lg:border-t-0", zq.line, zq.soft)}>
            <p className={cn("text-[12px] font-semibold transition-colors duration-500", confirmed ? zq.link : "text-[#ffd696]")}>
              {confirmed ? "Potvrzený termín" : "Nová poptávka · z webu"}
            </p>
            <p className="mt-1.5 text-[18px] font-semibold tracking-[-0.02em]">Tereza Malá</p>
            <p className={cn("text-[14px]", zq.quiet)}>Barvení + střih</p>
            <p className={cn("mt-1 text-[12px]", zq.data, zq.quiet)}>pá 9. 10. · 9:00–10:30</p>

            <p className={cn("mt-3 flex min-h-5 items-center gap-1.5 text-[13px]", zq.quiet)}>
              {step === 1 && (
                <>
                  <Check size={15} aria-hidden="true" /> Termín je volný
                </>
              )}
              {confirmed && (
                <>
                  <Check size={15} aria-hidden="true" /> Zákaznice dostane e-mail
                </>
              )}
            </p>

            <div className="mt-3 lg:mt-auto">
              {confirmed ? (
                <button type="button" onClick={() => go(0)} className={cn(zq.outline, "inline-flex min-h-11 items-center gap-2 px-4 text-[13px]", focus)}>
                  <RotateCcw size={14} aria-hidden="true" /> Znovu od začátku
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => go(step + 1)}
                  className={cn(zq.primary, "inline-flex min-h-11 items-center px-5 text-[13px] transition-colors hover:bg-[#1b3868]", focus)}
                >
                  {step === 0 ? "Otevřít detail" : "Potvrdit termín"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <p role="status" className={cn("border-t px-4 py-2.5 text-[12px] sm:px-5", zq.line, zq.quiet)}>
        {confirmed ? "Hotovo. Z přání je domluvený termín." : "Fiktivní data. Klikněte si postup sami."}
      </p>
    </div>
  );
}
