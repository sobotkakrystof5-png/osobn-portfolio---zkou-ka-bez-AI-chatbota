import { CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { ZakazIqMark } from "@/components/zakaziq/ZakazIqMark";

// Karta zakázky ze ZakazIQ překreslená do palety VIZEON. Port z alteno
// (components/zakaziq/ZakazIqMockup.tsx), tyrkysová vyměněná za zlatou.
// Nahrazuje světlý screenshot public/zakaziq-preview.png, který na tmavém
// webu působil jako cizí těleso a na mobilu se dal jen zmenšit.
//
// role="img": karta vypadá jako formulář, ale nic neodesílá. Odečítač tak
// přečte jen popis z ALT, ne deset čísel stupnice a tlačítka bez funkce.
// Stupnice hodnocení schválně nemá vybranou známku: předvyplněná devítka
// by byla hodnocení vlastní práce.

const ALT =
  "Ukázka karty zakázky v systému ZakazIQ: stav projektu, průběh, pole pro zpětnou vazbu a objednání konzultace.";
const PROGRESS = 60;
const SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const label = "font-inter text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted";

export function ZakazIqMockup({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label={ALT}
      className={cn(
        "overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0c0c0c] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]",
        className
      )}
    >
      {/* Lišta okna, na mobilu by jen ubírala výšku */}
      <div className="hidden items-center gap-2 border-b border-white/[0.06] bg-white/[0.03] px-4 py-2.5 sm:flex">
        <span className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
        </span>
        <span className="ml-1 font-inter text-[12px] text-text-muted">Klientský portál</span>
      </div>

      {/* Hlavička zakázky, tmavě modrá jako ve skutečném rozhraní */}
      <div className="border-b border-white/[0.06] bg-[linear-gradient(135deg,#16233a_0%,#0f1726_100%)] px-5 py-5 sm:px-6">
        <div className="flex items-start justify-between gap-4">
          <p className={label}>Projekt pro</p>
          <span className="flex shrink-0 items-center gap-1.5 font-inter text-[12px]">
            <span className="rounded-full border border-white/15 px-2.5 py-0.5 text-text-muted">Ukázka</span>
            <span className="rounded-full border border-[#c9a84c]/45 bg-[#c9a84c]/10 px-2.5 py-0.5 font-medium text-[#c9a84c]">
              V řešení
            </span>
          </span>
        </div>
        <p className="mt-1.5 font-inter text-[22px] font-semibold tracking-tight text-[#f0ece6] sm:text-[26px]">
          Vlastní provoz
        </p>
        <p className="mt-1 truncate font-inter text-[14px] text-text-secondary">
          Firemní prezentace pro obchodní jednání
        </p>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <div className="flex items-baseline justify-between">
          <p className={label}>Proces projektu</p>
          <p className="font-inter text-[14px] font-semibold tabular-nums text-[#c9a84c]">{PROGRESS} %</p>
        </div>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#c9a84c] to-[#e6cf8a]"
            style={{ width: `${PROGRESS}%` }}
          />
        </div>
        <p className="mt-2.5 font-inter text-[12px] text-text-muted">Aktualizováno před 2 hodinami</p>

        <div className="my-5 h-px bg-white/[0.06]" />

        <p className={label}>Vaše hodnocení</p>
        <div className="mt-2.5 grid grid-cols-10 gap-1 sm:gap-1.5">
          {SCALE.map((n) => (
            <span
              key={n}
              className="flex h-7 items-center justify-center rounded-md border border-white/[0.08] bg-white/[0.03] font-inter text-[12px] tabular-nums text-text-muted sm:h-8"
            >
              {n}
            </span>
          ))}
        </div>
        <div className="mt-1.5 flex justify-between font-inter text-[12px] text-text-muted">
          <span>Nejhorší</span>
          <span>Nejlepší</span>
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.08] bg-white/[0.02] px-3.5 py-3 font-inter text-[14px] text-text-muted">
          Vyjádřete se k dosavadní práci… (nepovinné)
        </div>

        {/* Tlačítka ukázky jsou tlumená, aby nevypadala jako skutečná výzva */}
        <div className="mt-4 flex select-none items-center justify-center rounded-lg border border-white/[0.12] bg-white/[0.04] px-4 py-2.5 font-inter text-[14px] font-medium text-text-secondary">
          Odeslat hodnocení
        </div>
        <div className="mt-2.5 flex select-none items-center justify-center gap-2 rounded-lg border border-white/[0.08] px-4 py-2.5 font-inter text-[14px] font-medium text-text-secondary">
          <CalendarCheck size={15} strokeWidth={1.5} className="text-text-muted" aria-hidden="true" />
          Konzultace o aktuálním stavu projektu
        </div>
      </div>

      <div className="flex items-center justify-center gap-2.5 border-t border-white/[0.06] bg-white/[0.03] px-5 py-3">
        <ZakazIqMark size="sm" />
        <span className="leading-tight">
          <span className="block font-inter text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
            Powered by
          </span>
          <span className="block font-inter text-[14px] font-semibold text-[#5c8dd3]">ZakazIQ</span>
        </span>
      </div>
    </div>
  );
}
