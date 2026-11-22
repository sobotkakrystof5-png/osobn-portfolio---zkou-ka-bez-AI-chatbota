"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowDown, ArrowRight, Check, RotateCcw } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { ZakazIqMark } from "@/components/zakaziq/ZakazIqMark";
import { sampleLabel, zq } from "@/components/zakaziq/dilky";
import { cn } from "@/lib/utils";

// Dvě strany jedné zakázky v ZakazIQ: vlevo náš admin, vpravo klientský
// prostor. Hlášení hotové práce vzniká jako koncept a do prostoru jde až po
// schválení jedním klikem (ProjectIQ docs/klientsky-prostor/PLAN.md, tok 1).
// Po dojetí do výřezu se schválí jednou samo, pak to ovládá tlačítko.
// Bez smyčky. Jména a čísla jsou vymyšlená, okna nesou „Ukázka".

const REPORT = "Úvodní stránka a kontaktní formulář jsou hotové.";
const AUTOPLAY_MS = 2200;

const PROJECTS = [
  { name: "Kadeřnictví Lenka", kind: "Web · Tvorba", progress: 60, active: true },
  { name: "Autoservis Dvořák", kind: "E-shop · Návrh", progress: 30 },
  { name: "Studna Hora", kind: "Web · Hotovo", progress: 100 },
];

const focus =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8aaee3] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c1a36]";
const label = "text-[11px] font-medium uppercase tracking-[0.12em] text-[#b8ceef]";

function WindowHead({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className={cn("flex items-center gap-2.5 border-b px-4 py-2.5", zq.line)}>
      <ZakazIqMark size="sm" />
      <div className="min-w-0 leading-tight">
        <p className="truncate text-[13px] font-semibold">{title}</p>
        {sub && <p className={cn("truncate text-[11px]", zq.quiet)}>{sub}</p>}
      </div>
      <span className={cn("ml-auto shrink-0", sampleLabel)}>Ukázka</span>
    </div>
  );
}

export function ZakazIqTeamDemo({ className }: { className?: string }) {
  const [sent, setSent] = useState(false);
  const touched = useRef(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!inView || reduced) return;
    const id = window.setTimeout(() => !touched.current && setSent(true), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [inView, reduced]);

  const toggle = (next: boolean) => {
    touched.current = true;
    setSent(next);
  };

  return (
    <div ref={ref} className={cn("font-inter", className)}>
      <div className="grid grid-cols-1 items-stretch gap-3 xl:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)]">
        {/* ─── Admin ─── */}
        <div className={cn(zq.frame, "overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]")}>
          <WindowHead title="Admin · Zakázky" sub="Náš pohled" />
          <div className={cn("flex flex-col gap-3 p-4", zq.surface)}>
            <ul className="space-y-1.5">
              {PROJECTS.map((p) => (
                <li
                  key={p.name}
                  className={cn(
                    "rounded-[12px] px-3 py-2",
                    p.active ? "border border-[#2b57a8] bg-[#1b3868]/60" : "border border-transparent"
                  )}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="truncate text-[13px] font-medium">{p.name}</p>
                    <p className={cn("shrink-0 text-[11px]", zq.data, zq.quiet)}>{p.progress} %</p>
                  </div>
                  <p className={cn("text-[11px]", zq.quiet)}>{p.kind}</p>
                  <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-[#1b3868]">
                    <div className="h-full rounded-full bg-[#8aaee3]" style={{ width: `${p.progress}%` }} />
                  </div>
                </li>
              ))}
            </ul>

            <div className={cn("rounded-[16px] border border-dashed p-3", sent ? "border-[#2b57a8]" : "border-[#8aaee3]/70")}>
              <p className={label}>{sent ? "Hlášení odesláno" : "Hlášení práce · koncept"}</p>
              <p className="mt-1.5 text-[13px] leading-snug">{REPORT}</p>
              <div className="mt-3 min-h-11">
                {sent ? (
                  <p className="flex min-h-11 items-center gap-1.5 text-[13px] text-[#8aaee3]">
                    <Check size={15} strokeWidth={2} aria-hidden="true" /> Klient to vidí v prostoru
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={() => toggle(true)}
                    className={cn(zq.primary, "inline-flex min-h-11 items-center px-4 text-[13px] transition-colors hover:bg-[#1b3868]", focus)}
                  >
                    Schválit a poslat
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Spojnice: jeden klik v adminu = novinka u klienta */}
        <div aria-hidden="true" className="flex items-center justify-center">
          <span
            className={cn(
              "grid h-10 w-10 place-items-center rounded-full border transition-colors duration-500",
              sent ? "border-[#8aaee3] bg-[#23478b] text-white" : "border-[#1b3868] bg-[#0c1a36] text-[#b8ceef]"
            )}
          >
            <ArrowDown size={17} className="xl:hidden" />
            <ArrowRight size={17} className="hidden xl:block" />
          </span>
        </div>

        {/* ─── Klientský prostor ─── */}
        <div className={cn(zq.frame, "overflow-hidden shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]")}>
          <WindowHead title="Klientský prostor" sub="Kadeřnictví Lenka" />
          <div className={cn("flex flex-col gap-3 p-4", zq.surface)}>
            <div>
              <div className="flex items-baseline justify-between">
                <p className={label}>Etapy</p>
                <p className={cn("text-[12px] font-semibold", zq.data, zq.link)}>60 %</p>
              </div>
              <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[#1b3868]">
                <div className="h-full w-[60%] rounded-full bg-[#8aaee3]" />
              </div>
            </div>

            <div>
              <p className={label}>Co je nového</p>
              <ul className="mt-2 space-y-1.5">
                {/* Nová položka vyjede z nulové výšky (grid 0fr → 1fr), bez měření DOM */}
                <li
                  aria-hidden={!sent}
                  className="grid transition-[grid-template-rows,opacity] duration-500 ease-out"
                  style={{ gridTemplateRows: sent ? "1fr" : "0fr", opacity: sent ? 1 : 0 }}
                >
                  <div className="overflow-hidden">
                    <div className="rounded-[12px] border border-[#8aaee3]/60 bg-[#23478b]/40 px-3 py-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className="rounded-full bg-[#8aaee3] px-2 py-px text-[10px] font-semibold uppercase tracking-[0.08em] text-[#0c1a36]">
                          Nové
                        </span>
                        <span className={cn("text-[11px]", zq.data, zq.quiet)}>teď</span>
                      </div>
                      <p className="mt-1 text-[13px] leading-snug">{REPORT}</p>
                    </div>
                  </div>
                </li>
                {[
                  ["Návrh webu schválený", "včera"],
                  ["Texty úvodní stránky přijaté", "po"],
                ].map(([text, when]) => (
                  <li key={text} className={cn("flex items-center justify-between gap-2 rounded-[12px] px-3 py-2", zq.soft)}>
                    <span className="truncate text-[13px]">{text}</span>
                    <span className={cn("shrink-0 text-[11px]", zq.data, zq.quiet)}>{when}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={cn("flex items-center gap-3 rounded-[14px] border p-2.5", zq.line)}>
              <div className="min-w-0 flex-1">
                <p className={label}>Čeká na vás</p>
                <p className="truncate text-[13px]">Pošlete fotky provozovny</p>
              </div>
              <span className={cn(zq.outline, "inline-flex min-h-9 shrink-0 items-center px-3 text-[12px]")}>Mám hotovo</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 flex min-h-11 flex-wrap items-center justify-between gap-x-4 gap-y-2 px-1">
        <p role="status" className="text-[13px] text-text-secondary">
          {sent ? "Jeden klik v adminu, klient to hned vidí." : "Fiktivní data. Zkuste schválit hlášení."}
        </p>
        {sent && (
          <button
            type="button"
            onClick={() => toggle(false)}
            className="inline-flex min-h-11 items-center gap-1.5 text-[13px] text-text-secondary underline decoration-white/20 underline-offset-4 hover:text-[#f0ece6]"
          >
            <RotateCcw size={13} aria-hidden="true" /> Znovu
          </button>
        )}
      </div>
    </div>
  );
}
