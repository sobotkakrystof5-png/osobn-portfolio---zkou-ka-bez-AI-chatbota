"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Check, MousePointerClick } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { zq } from "@/components/zakaziq/dilky";
import { cn } from "@/lib/utils";

// Rezervace na autopilotu: co se v ZakazIQ stane s jednou poptávkou. Řádky
// odpovídají e-mailům v ProjectIQ lib/ws/email/catalog.ts (request_received
// hned po odeslání, booking_confirmed po potvrzení, reminder den předem
// ráno, thank_you po zaplacené návštěvě). Člověk jen potvrdí termín.
// Řádky naskočí jednou po dojetí do výřezu, bez smyčky. S omezeným pohybem
// jsou vidět hned. Výřez je dekorativní (aria-hidden), význam nese karta.

type Kind = "request" | "click" | "auto";

const EVENTS: { time: string; title: string; kind: Kind }[] = [
  { time: "Po 10:40", title: "Nová poptávka z webu", kind: "request" },
  { time: "Po 10:40", title: "Zákazník dostal potvrzení přijetí", kind: "auto" },
  { time: "Po 10:52", title: "Termín potvrzený jedním klikem", kind: "click" },
  { time: "St ráno", title: "Připomínka den před termínem", kind: "auto" },
  { time: "Čt 15:10", title: "Poděkování po návštěvě", kind: "auto" },
];

const STEP_MS = 650;

const DOT: Record<Kind, string> = {
  request: "border-[1.5px] border-dashed border-[#e19a2c] bg-[#3a2a0f] text-[#ffd696]",
  click: "bg-[#23478b] text-white",
  auto: "border border-[#2b57a8] bg-[#132850] text-[#8aaee3]",
};

export function ZakazIqAutopilotFeed() {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduced = usePrefersReducedMotion();
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (!inView || reduced || shown >= EVENTS.length) return;
    const id = window.setTimeout(() => setShown((n) => n + 1), STEP_MS);
    return () => window.clearTimeout(id);
  }, [inView, reduced, shown]);

  const visible = reduced ? EVENTS.length : shown;
  const done = visible >= EVENTS.length;

  return (
    <>
      <ol ref={ref} className="relative space-y-2.5">
        <span aria-hidden="true" className="absolute bottom-3 left-[13px] top-3 w-px bg-[#1b3868]" />
        {EVENTS.map((e, i) => (
          <li
            key={e.title}
            className={cn(
              "relative flex items-center gap-3 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none",
              i < visible ? "translate-y-0 opacity-100" : "translate-y-1.5 opacity-0"
            )}
          >
            <span className={cn("grid h-7 w-7 shrink-0 place-items-center rounded-full", DOT[e.kind])}>
              {e.kind === "click" ? (
                <MousePointerClick size={13} strokeWidth={2} />
              ) : e.kind === "auto" ? (
                <Check size={13} strokeWidth={2.4} />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-[#e19a2c]" />
              )}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-medium leading-snug">{e.title}</span>
              <span className={cn("block text-[11px]", zq.data, zq.quiet)}>{e.time}</span>
            </span>
            {e.kind === "auto" && (
              <span className="shrink-0 rounded-full bg-[#1b3868] px-2 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-[#b8ceef]">
                samo
              </span>
            )}
          </li>
        ))}
      </ol>
      <p
        className={cn(
          "mt-4 border-t pt-3 text-[12px] transition-opacity duration-500 motion-reduce:transition-none",
          zq.line,
          zq.quiet,
          done ? "opacity-100" : "opacity-0"
        )}
      >
        Kliknuto jednou. Zbytek zařídil systém.
      </p>
    </>
  );
}
