import { Check, CheckCheck, CreditCard, FileText, LayoutGrid, MessageSquare, Video } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ZakazIqMark } from "@/components/zakaziq/ZakazIqMark";
import { sampleLabel, zq } from "@/components/zakaziq/dilky";
import { cn } from "@/lib/utils";

// Klientský prostor ZakazIQ tak, jak ho klient webu vidí během zakázky
// (ProjectIQ app/klient, KP11–KP17): „Čeká na vás" nahoře, etapy s procenty,
// zprávy s přečteno jako ve WhatsAppu, peníze a faktury s QR, konzultace
// z volných termínů přes Google Meet. Nahrazuje starou kartu zakázky se
// stupnicí hodnocení (hodnocení je dnes krátký dotazník po dokončení).
//
// role="img": vypadá to jako aplikace, ale nic se tu neovládá. Odečítač
// přečte jen popis. Jména, částky a časy jsou vymyšlené, karta nese „Ukázka".

const ALT =
  "Ukázka klientského prostoru ZakazIQ: úkol, který čeká na klienta, etapy projektu, zpráva od nás, platby a domluvená konzultace.";

const NAV: { icon: LucideIcon; label: string; badge?: number }[] = [
  { icon: LayoutGrid, label: "Přehled" },
  { icon: MessageSquare, label: "Zprávy", badge: 1 },
  { icon: FileText, label: "Projekt" },
  { icon: CreditCard, label: "Faktury" },
  { icon: Video, label: "Konzultace" },
];

const STAGES = [
  { label: "Zadání", done: true },
  { label: "Návrh", done: true },
  { label: "Tvorba", done: false, current: true },
  { label: "Spuštění", done: false },
];

const label = "font-inter text-[11px] font-medium uppercase tracking-[0.12em] text-[#b8ceef]";

export function ZakazIqPortalMockup({ className }: { className?: string }) {
  return (
    <div role="img" aria-label={ALT} className={cn(zq.frame, "overflow-hidden font-inter shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)]", className)}>
      <div className={cn("flex items-center gap-3 border-b px-4 py-3 sm:px-5", zq.line)}>
        <ZakazIqMark size="sm" />
        <div className="min-w-0 leading-tight">
          <p className="text-[14px] font-semibold">Klientský prostor</p>
          <p className={cn("truncate text-[12px]", zq.quiet)}>Nový web · Kadeřnictví Lenka</p>
        </div>
        <span className={cn("ml-auto", sampleLabel)}>Ukázka</span>
      </div>

      <div className="grid sm:grid-cols-[150px_minmax(0,1fr)]">
        {/* Levý panel jako ve Slacku; na telefonu by jen ubíral šířku */}
        <ul className={cn("hidden flex-col gap-1 border-r p-3 sm:flex", zq.line)}>
          {NAV.map((item, i) => (
            <li
              key={item.label}
              className={cn(
                "flex min-h-9 items-center gap-2.5 rounded-[12px] px-2.5 text-[13px]",
                i === 0 ? "bg-[#23478b] font-semibold text-white" : zq.quiet
              )}
            >
              <item.icon size={15} strokeWidth={1.75} aria-hidden="true" />
              {item.label}
              {item.badge && (
                <span className={cn("ml-auto grid h-5 min-w-5 place-items-center rounded-full bg-[#8aaee3] px-1 text-[11px] font-semibold text-[#0c1a36]", zq.data)}>
                  {item.badge}
                </span>
              )}
            </li>
          ))}
        </ul>

        <div className={cn("flex min-w-0 flex-col gap-4 p-4 sm:p-5", zq.surface)}>
          {/* Čeká na vás */}
          <div>
            <p className="text-[15px] font-semibold">
              Čeká na vás <span className={cn(zq.data, zq.quiet)}>1</span>
            </p>
            <div className={cn("mt-2 flex items-center gap-3 rounded-[16px] border p-3", zq.line, zq.soft)}>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium">Pošlete fotky provozovny</p>
                <p className={cn("text-[12px]", zq.quiet)}>Etapa Tvorba · do pátku</p>
              </div>
              <span className={cn(zq.primary, "inline-flex min-h-9 shrink-0 items-center px-3.5 text-[12px]")}>Mám hotovo</span>
            </div>
          </div>

          {/* Etapy */}
          <div>
            <div className="flex items-baseline justify-between">
              <p className={label}>Etapy</p>
              <p className={cn("text-[13px] font-semibold", zq.data, zq.link)}>60 %</p>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#1b3868]">
              <div className="h-full w-[60%] rounded-full bg-[#8aaee3]" />
            </div>
            <ol className="mt-2.5 grid grid-cols-4 gap-1.5">
              {STAGES.map((s) => (
                <li
                  key={s.label}
                  className={cn(
                    "flex min-w-0 items-center justify-center gap-1 rounded-full border px-1.5 py-1 text-[11px]",
                    s.current ? "border-[#8aaee3] text-[#eef2fb]" : s.done ? "border-[#1b3868] bg-[#1b3868] text-[#eef2fb]" : "border-[#1b3868] text-[#b8ceef]"
                  )}
                >
                  {s.done && <Check size={11} strokeWidth={2.25} aria-hidden="true" />}
                  <span className="truncate">{s.label}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Zpráva */}
          <div className="flex items-end gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#1b3868] text-[12px] font-semibold">K</span>
            <div className={cn("max-w-[85%] rounded-[16px] rounded-bl-[6px] border px-3 py-2", zq.line, zq.soft)}>
              <p className="text-[13px] leading-snug">Úvodní stránka je hotová. Mrkněte na živý odkaz a napište, co upravit.</p>
              <p className={cn("mt-1 flex items-center justify-end gap-1 text-[11px]", zq.data, zq.quiet)}>
                10:42 <CheckCheck size={13} className="text-[#8aaee3]" aria-hidden="true" />
              </p>
            </div>
          </div>

          {/* Peníze a konzultace */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className={cn("rounded-[16px] border p-3", zq.line)}>
              <p className={label}>Zbývá doplatit</p>
              <p className={cn("mt-1 text-[16px] font-semibold", zq.data)}>9 500 Kč</p>
              <p className={cn("text-[12px]", zq.quiet)}>Faktura s QR kódem</p>
            </div>
            <div className={cn("rounded-[16px] border p-3", zq.line)}>
              <p className={label}>Konzultace</p>
              <p className={cn("mt-1 text-[16px] font-semibold", zq.data)}>čt 14:00</p>
              <p className={cn("text-[12px]", zq.quiet)}>Google Meet · 30 min</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
