import type { ReactNode } from "react";
import { sampleLabel, zq, zqCard } from "@/components/zakaziq/dilky";
import { cn } from "@/lib/utils";

// Devět částí aplikace ZakazIQ Workspace (ProjectIQ components/marketing/
// content.ts → MODULES). Pět největších má zmenšený výřez rozhraní ve
// tmavých Dílkách, zbytek jen název a jeden řádek. Výřezy jsou dekorativní
// (aria-hidden), význam nese nadpis karty. Bez smyček a náhodných hodnot.

type Module = { title: string; text: string; preview?: ReactNode; span: string };

const pad = (n: number) => String(n).padStart(2, "0");

function Fragment({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("mt-6 rounded-[20px] border p-4", zq.line, "bg-[#0c1a36] text-[#eef2fb]", className)}>
      <p className={cn(sampleLabel, "mb-3")}>Ukázka</p>
      {children}
    </div>
  );
}

function RequestsPreview() {
  return (
    <Fragment>
      <div className={cn("rounded-[12px] p-3.5", zq.pending)}>
        <div className={cn("flex items-center justify-between text-[11px] font-medium uppercase tracking-[0.08em]", zq.data)}>
          <span>Nová poptávka</span>
          <span className="normal-case tracking-normal">dnes 10:40</span>
        </div>
        <p className="mt-1.5 text-[16px] font-semibold">Tereza Malá</p>
        <p className="text-[13px] opacity-80">Barvení + střih · z webu</p>
        <div className="mt-3 flex flex-wrap gap-2">
          <span className={cn(zq.primary, "inline-flex min-h-9 items-center px-3.5 text-[12px]")}>Potvrdit termín</span>
          <span className="inline-flex min-h-9 items-center rounded-full border border-[#e19a2c] px-3.5 text-[12px] font-medium">Jiný čas</span>
        </div>
      </div>
      {[
        ["Konzultace · středa 14:00", "Potvrzeno"],
        ["Výměna zámku · pondělí", "Vyřízeno"],
      ].map(([title, state]) => (
        <div key={title} className={cn("mt-2 flex items-center justify-between gap-3 rounded-[12px] px-3.5 py-2.5 text-[13px]", zq.surface)}>
          <span className="truncate">{title}</span>
          <span className={cn("shrink-0 rounded-full bg-[#1b3868] px-2.5 py-0.5 text-[11px]", zq.quiet)}>{state}</span>
        </div>
      ))}
    </Fragment>
  );
}

const WEEK = ["Po", "Út", "St", "Čt", "Pá"];
const HOURS = [9, 10, 11, 12, 13, 14];
const ROW = 26;
const WEEK_SLOTS = [
  { day: 0, from: 9, h: 2, kind: "confirmed", title: "Střih" },
  { day: 1, from: 12, h: 1, kind: "block", title: "Oběd" },
  { day: 2, from: 10, h: 1, kind: "pending", title: "Nová" },
  { day: 3, from: 11, h: 2, kind: "confirmed", title: "Barva" },
  { day: 4, from: 9, h: 1, kind: "confirmed", title: "Melír" },
  { day: 4, from: 13, h: 1, kind: "pending", title: "Nová" },
] as const;

function CalendarPreview() {
  return (
    <Fragment>
      <div className={cn("grid grid-cols-[24px_repeat(5,minmax(0,1fr))] pb-2 text-[11px] uppercase", zq.data, zq.quiet)}>
        <span />
        {WEEK.map((d) => (
          <span key={d} className="text-center">
            {d}
          </span>
        ))}
      </div>
      <div className="relative" style={{ height: HOURS.length * ROW }}>
        {HOURS.map((hour, i) => (
          <div key={hour} className={cn("absolute inset-x-0 flex border-t", zq.line)} style={{ top: i * ROW }}>
            <span className={cn("w-6 pt-0.5 text-[10px]", zq.data, zq.quiet)}>{hour}</span>
          </div>
        ))}
        <div className="absolute inset-y-0 left-6 right-0">
          {WEEK_SLOTS.map((s) => (
            <div
              key={`${s.day}-${s.from}`}
              className={cn(
                "absolute overflow-hidden rounded-[8px] px-1.5 py-1 text-[11px] font-semibold leading-tight",
                s.kind === "confirmed" ? zq.confirmed : s.kind === "pending" ? zq.pending : zq.block
              )}
              style={{
                left: `calc(${s.day} * 20% + 2px)`,
                width: "calc(20% - 4px)",
                top: (s.from - HOURS[0]) * ROW + 2,
                height: s.h * ROW - 4,
              }}
            >
              <span className="block truncate">{s.title}</span>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
}

function LoyaltyPreview() {
  return (
    <Fragment className="bg-transparent">
      <div className="rounded-[24px] bg-gradient-to-br from-[#2b57a8] to-[#1b3868] p-4 shadow-[0_20px_40px_-20px_rgba(12,26,54,0.9)]">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="truncate text-[12px] text-[#b8ceef]">Věrnostní karta</p>
            <p className="truncate text-[16px] font-semibold">Tereza Malá</p>
          </div>
          <p className={cn("shrink-0 text-[13px] text-[#b8ceef]", zq.data)}>
            <span className="text-white">7</span> / 10
          </p>
        </div>
        <div className="mt-4 grid grid-cols-5 gap-1.5">
          {Array.from({ length: 10 }, (_, i) => (
            <span
              key={i}
              className={cn("aspect-square rounded-[8px]", i < 7 ? "bg-white" : "border border-dashed border-white/35")}
            />
          ))}
        </div>
        <p className="mt-3 text-[12px] text-[#b8ceef]">Ještě 3 návštěvy a střih je zdarma</p>
      </div>
    </Fragment>
  );
}

const MONTHS = [
  ["kvě", 42],
  ["čvn", 58],
  ["čvc", 50],
  ["srp", 66],
  ["zář", 61],
  ["říj", 84],
] as const;

function IncomePreview() {
  return (
    <Fragment>
      <div className={cn("flex h-[120px] items-end gap-2 border-b", zq.line)}>
        {MONTHS.map(([m, h], i) => (
          <span
            key={m}
            className={cn("block flex-1 rounded-t-[6px]", i === MONTHS.length - 1 ? "bg-[#8aaee3]" : "bg-[#1b3868]")}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className={cn("mt-2 flex gap-2 text-[10px] uppercase", zq.data, zq.quiet)}>
        {MONTHS.map(([m]) => (
          <span key={m} className="flex-1 text-center">
            {m}
          </span>
        ))}
      </div>
    </Fragment>
  );
}

function InvoicePreview() {
  return (
    <Fragment>
      <div className={cn("flex items-center justify-between text-[11px] uppercase tracking-[0.06em]", zq.data, zq.quiet)}>
        <span>Faktura</span>
        <span className="normal-case">2026-000042</span>
      </div>
      <dl className="mt-3 space-y-1.5 text-[13px]">
        <div className="flex justify-between gap-3">
          <dt>Barvení</dt>
          <dd className={zq.data}>1 350 Kč</dd>
        </div>
        <div className="flex justify-between gap-3">
          <dt>Střih</dt>
          <dd className={zq.data}>500 Kč</dd>
        </div>
      </dl>
      <div className={cn("mt-3 flex items-center justify-between border-t pt-3", zq.line)}>
        <span className="rounded-full border border-[#ff8a80]/50 px-2.5 py-0.5 text-[11px] font-medium text-[#ff8a80]">Po splatnosti</span>
        <span className={cn("text-[16px] font-semibold", zq.data)}>1 850 Kč</span>
      </div>
    </Fragment>
  );
}

const MODULES: Module[] = [
  { title: "Poptávky", text: "Z webu, z odkazu i ručně. Potvrdíte jedním klikem.", preview: <RequestsPreview />, span: "lg:col-span-6" },
  { title: "Kalendář a rezervace", text: "Služby, směny pracovníků a blokace v jednom týdnu.", preview: <CalendarPreview />, span: "lg:col-span-6" },
  { title: "Věrnostní karty", text: "Razítka za návštěvy a odměna, když je karta plná.", preview: <LoyaltyPreview />, span: "md:col-span-1 lg:col-span-4" },
  { title: "Příjmy a výdaje", text: "Graf a přehled měsíce, jen z přijatých plateb.", preview: <IncomePreview />, span: "md:col-span-1 lg:col-span-4" },
  { title: "Faktury", text: "PDF s QR platbou a hlídání splatnosti.", preview: <InvoicePreview />, span: "md:col-span-2 lg:col-span-4" },
  { title: "Zákazníci", text: "Historie návštěv, poznámky a skupiny.", span: "lg:col-span-3" },
  { title: "Zakázky", text: "Vlastní stavy a kolonky podle oboru.", span: "lg:col-span-3" },
  { title: "Daně", text: "Orientační odhad a připomínka termínů.", span: "lg:col-span-3" },
  { title: "E-maily zákazníkům", text: "Potvrzení termínu i připomínka den předem.", span: "lg:col-span-3" },
];

export function ZakazIqModules() {
  return (
    <ul className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12">
      {MODULES.map((m, i) => (
        <li
          key={m.title}
          className={cn(
            zqCard, "flex flex-col p-6",
            m.preview ? "md:col-span-2" : "md:col-span-1",
            m.span
          )}
        >
          <div className="flex items-baseline gap-3">
            <span aria-hidden="true" className="font-cormorant text-[26px] font-light leading-none lining-nums text-[#8aaee3]">
              {pad(i + 1)}
            </span>
            <h3 className="font-inter text-[17px] font-medium text-[#f0ece6]">{m.title}</h3>
          </div>
          <p className="mt-2 font-inter text-[15px] leading-[1.6] text-text-secondary">{m.text}</p>
          {m.preview}
        </li>
      ))}
    </ul>
  );
}
