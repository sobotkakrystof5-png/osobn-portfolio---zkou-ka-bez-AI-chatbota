import type { ReactNode } from "react";
import { ArrowDown, ArrowRight, BriefcaseBusiness, CalendarClock, Users, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ZakazIqAutopilotFeed } from "@/components/zakaziq/ZakazIqAutopilotFeed";
import { ZakazIqMark } from "@/components/zakaziq/ZakazIqMark";
import { sampleLabel, zq, zqCard } from "@/components/zakaziq/dilky";
import { ZAKAZIQ_PRICE } from "@/lib/data/zakaziq";
import { cn } from "@/lib/utils";

// Příběh ZakazIQ v bloku „Náš výsledek" na /zakaziq (zadání 22. 11. 2026):
// vzniklo z vlastního nápadu a vlastního chaosu, dnes ho dáváme klientům,
// nejdřív jako klientský prostor, potom jako SaaS. K tomu čtyři přehledy,
// odkud se bere +63 %, a řetěz web → systém → služba. Výřezy rozhraní jsou
// dekorativní (aria-hidden) a nesou „Ukázka", čísla v nich jsou vymyšlená.

const pad = (n: number) => String(n).padStart(2, "0");

/* ─────────────── Od chaosu k produktu ─────────────── */

const STAGES = [
  { title: "Vlastní chaos", text: "Poptávky v e-mailu, zakázky v hlavě, faktury v tabulce." },
  { title: "Vlastní nápad", text: "Postavili jsme si systém pro svůj provoz." },
  { title: "Pro naše klienty", text: "Jako klientský prostor ke každé zakázce.", href: "#klientsky-prostor" },
  { title: "Pro vaši firmu", text: `Jako aplikace za ${ZAKAZIQ_PRICE} Kč měsíčně.`, now: true },
];

/** Mřížka 3 × 3 dílků z loga: v první fázi rozházená, pak se plní a srovnává. */
function Glyph({ level }: { level: number }) {
  const chaos = level === 0;
  return (
    <span aria-hidden="true" className="grid w-max grid-cols-3 gap-1">
      {Array.from({ length: 9 }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-3.5 w-3.5 rounded-[4px]",
            chaos
              ? "border border-dashed border-white/25"
              : i < level * 3
                ? level === 3
                  ? "bg-white"
                  : "bg-[#3a6ec4]"
                : "border border-[#1b3868]"
          )}
          style={chaos ? { transform: `translate(${((i * 7) % 5) - 2}px, ${((i * 11) % 7) - 3}px) rotate(${((i * 29) % 50) - 25}deg)` } : undefined}
        />
      ))}
    </span>
  );
}

export function ZakazIqOrigin() {
  return (
    <ol className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-4">
      {STAGES.map((s, i) => (
        <li
          key={s.title}
          className={cn(
            "relative flex gap-5 rounded-[24px] border p-5 md:flex-col md:gap-0 md:p-6",
            i === 0 && "border-dashed border-white/15 bg-white/[0.02]",
            i > 0 && !s.now && "border-[#1b3868]/80 bg-[#0c1a36]/55",
            s.now && "border-[#3a6ec4] bg-[linear-gradient(160deg,#1b3868_0%,#0c1a36_75%)] shadow-[0_30px_80px_-40px_rgba(58,110,196,0.8)]"
          )}
        >
          <div className="flex shrink-0 items-start justify-between gap-3 pt-1 md:w-full md:pt-0">
            <Glyph level={i} />
            {s.now ? (
              <span className="absolute right-4 top-4 rounded-full bg-white px-2.5 py-0.5 font-inter text-[11px] font-semibold uppercase tracking-[0.1em] text-[#0c1a36] md:static">
                Dnes
              </span>
            ) : (
              <span aria-hidden="true" className="hidden font-cormorant text-[26px] font-light leading-none lining-nums text-[#8aaee3] md:inline">
                {pad(i + 1)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h3 className={cn("font-inter text-[17px] font-medium md:mt-6", i === 0 ? "text-text-secondary" : "text-white")}>{s.title}</h3>
            <p className="mt-1.5 font-inter text-[14px] leading-[1.55] text-[#b8ceef]">{s.text}</p>
            {s.href && (
              <a
                href={s.href}
                className="mt-1 inline-block min-h-11 content-center font-inter text-[13px] text-[#8aaee3] underline decoration-[#2b57a8] underline-offset-[5px] transition-colors hover:text-white md:mt-3"
              >
                Jak to vypadá
              </a>
            )}
          </div>
          {i < STAGES.length - 1 && (
            <span
              aria-hidden="true"
              className="absolute -right-[18px] top-9 z-10 hidden h-7 w-7 place-items-center rounded-full border border-[#1b3868] bg-[#080d18] text-[#8aaee3] md:grid"
            >
              <ArrowRight size={13} strokeWidth={2} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

/* ─────────────── Čtyři přehledy: odkud se bere +63 % ─────────────── */

function Preview({ children }: { children: ReactNode }) {
  return (
    <div aria-hidden="true" className={cn("mt-6 flex-1 rounded-[20px] border p-4 font-inter", zq.line, "bg-[#0c1a36] text-[#eef2fb]")}>
      <p className={cn(sampleLabel, "mb-3")}>Ukázka</p>
      {children}
    </div>
  );
}

function JobsPreview() {
  return (
    <Preview>
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Nové", value: 3, cls: zq.pending },
          { label: "V práci", value: 5, cls: "bg-[#1b3868] text-[#eef2fb]" },
          { label: "Hotovo", value: 12, cls: "bg-[#132850] text-[#b8ceef]" },
        ].map((c) => (
          <div key={c.label} className={cn("rounded-[12px] px-3 py-2.5", c.cls)}>
            <p className={cn("text-[20px] font-semibold leading-none", zq.data)}>{c.value}</p>
            <p className="mt-1.5 text-[11px] opacity-85">{c.label}</p>
          </div>
        ))}
      </div>
      {[
        ["Web · Kadeřnictví Lenka", "V práci"],
        ["E-shop · Autoservis Dvořák", "Návrh"],
      ].map(([name, state]) => (
        <div key={name} className={cn("mt-2 flex items-center justify-between gap-3 rounded-[12px] px-3.5 py-2.5 text-[13px]", zq.surface)}>
          <span className="truncate">{name}</span>
          <span className={cn("shrink-0 rounded-full bg-[#1b3868] px-2.5 py-0.5 text-[11px]", zq.quiet)}>{state}</span>
        </div>
      ))}
    </Preview>
  );
}

const MONTHS = [38, 52, 47, 61, 58, 80];

function MoneyPreview() {
  return (
    <Preview>
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className={cn("text-[11px] uppercase tracking-[0.08em]", zq.quiet)}>Listopad · přijato</p>
          <p className={cn("mt-1 text-[24px] font-semibold leading-none", zq.data)}>48 600 Kč</p>
        </div>
        <div className={cn("flex h-[58px] items-end gap-1.5 border-b", zq.line)}>
          {MONTHS.map((h, i) => (
            <span
              key={i}
              className={cn("block w-3.5 rounded-t-[4px]", i === MONTHS.length - 1 ? "bg-[#8aaee3]" : "bg-[#1b3868]")}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-2 text-[12px]">
        {[
          ["Čeká na zaplacení", "12 400 Kč"],
          ["Odhad daně", "Připravený"],
        ].map(([k, v]) => (
          <div key={k} className={cn("rounded-[12px] px-3 py-2.5", zq.surface)}>
            <dt className={zq.quiet}>{k}</dt>
            <dd className={cn("mt-0.5 font-semibold", zq.data)}>{v}</dd>
          </div>
        ))}
      </dl>
    </Preview>
  );
}

const CLIENTS = [
  { name: "Lenka Veselá", meta: "3 zakázky · klientský prostor", last: "18. 11." },
  { name: "Tomáš Dvořák", meta: "2 zakázky · faktura zaplacená", last: "12. 11." },
  { name: "Jan Hora", meta: "1 zakázka · web hotový", last: "4. 11." },
];

function ClientsPreview() {
  return (
    <Preview>
      <ul className="space-y-2">
        {CLIENTS.map((c) => (
          <li key={c.name} className={cn("flex items-center gap-3 rounded-[12px] px-3 py-2.5", zq.surface)}>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2b57a8] to-[#1b3868] text-[12px] font-semibold">
              {c.name
                .split(" ")
                .map((w) => w[0])
                .join("")}
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[13px] font-medium">{c.name}</span>
              <span className={cn("block truncate text-[11px]", zq.quiet)}>{c.meta}</span>
            </span>
            <span className={cn("shrink-0 text-[11px]", zq.data, zq.quiet)}>{c.last}</span>
          </li>
        ))}
      </ul>
    </Preview>
  );
}

function AutopilotPreview() {
  return (
    <Preview>
      <ZakazIqAutopilotFeed />
    </Preview>
  );
}

const OVERVIEWS: { icon: LucideIcon; title: string; text: string; preview: ReactNode }[] = [
  {
    icon: BriefcaseBusiness,
    title: "Přehled zakázek",
    text: "Každá zakázka má svůj stav. Na první pohled vidíme, co je nové, co běží a co je hotové.",
    preview: <JobsPreview />,
  },
  {
    icon: Wallet,
    title: "Přehled financí",
    text: "Příjmy, faktury a odhad daní bez tabulek. Víme, kolik přišlo a kolik ještě čeká.",
    preview: <MoneyPreview />,
  },
  {
    icon: Users,
    title: "Přehled klientů",
    text: "U každého klienta jeho zakázky, poznámky a historie. Nic nemusíme dohledávat.",
    preview: <ClientsPreview />,
  },
  {
    icon: CalendarClock,
    title: "Rezervace na autopilotu",
    text: "Termín potvrdíme jedním klikem. Potvrzení, připomínku i poděkování pošle systém sám.",
    preview: <AutopilotPreview />,
  },
];

export function ZakazIqOverviews() {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
      {OVERVIEWS.map((o) => (
        <li key={o.title} className={cn(zqCard, "flex flex-col p-6 md:p-7")}>
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-[12px] bg-gradient-to-br from-[#2b57a8] to-[#1b3868] text-white">
              <o.icon size={18} strokeWidth={1.75} aria-hidden="true" />
            </span>
            <h4 className="font-inter text-[18px] font-medium text-white">{o.title}</h4>
          </div>
          <p className="mt-3 font-inter text-[15px] leading-[1.6] text-text-secondary">{o.text}</p>
          <div className="flex flex-1 flex-col">{o.preview}</div>
        </li>
      ))}
    </ul>
  );
}

/* ─────────────── Web → systém → služba ─────────────── */

const FLOW_OUT = ["E-maily a připomínky odchází samy", "Klienti vidí svůj projekt", "Ráno přehled dne do e-mailu"];

function FlowArrow() {
  return (
    <span aria-hidden="true" className="grid place-items-center text-[#8aaee3]">
      <ArrowDown size={20} className="lg:hidden" />
      <ArrowRight size={20} className="hidden lg:block" />
    </span>
  );
}

function FlowNode({ step, title, children, strong }: { step: string; title: string; children: ReactNode; strong?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[20px] border p-5",
        strong ? "border-[#2b57a8] bg-[#132850]" : "border-[#1b3868] bg-[#0c1a36]/70"
      )}
    >
      <p className="font-inter text-[11px] uppercase tracking-[0.16em] text-[#8aaee3]">{step}</p>
      <p className="mt-1.5 font-inter text-[17px] font-medium text-white">{title}</p>
      <div className="mt-4">{children}</div>
    </div>
  );
}

export function ZakazIqFlow() {
  return (
    <div className="mt-8 grid grid-cols-1 items-stretch gap-3 lg:grid-cols-[minmax(0,1fr)_32px_minmax(0,1fr)_32px_minmax(0,1.25fr)]">
      <FlowNode step="01 · Web" title="Poptávky a rezervace">
        <div className="flex flex-wrap gap-2">
          {["vizeon.cz", "alteno.cz"].map((d) => (
            <span key={d} className={cn("rounded-full border border-[#1b3868] bg-[#0c1a36] px-3 py-1 text-[13px] text-[#dce7f7]", zq.data)}>
              {d}
            </span>
          ))}
        </div>
      </FlowNode>
      <FlowArrow />
      <FlowNode step="02 · Systém" title="Všechno na jednom místě" strong>
        <span className="flex items-center gap-2.5">
          <ZakazIqMark size="sm" />
          <span className="font-inter text-[15px] font-semibold text-white">ZakazIQ</span>
          <span className="font-inter text-[13px] text-[#b8ceef]">zakázky · peníze · klienti</span>
        </span>
      </FlowNode>
      <FlowArrow />
      <FlowNode step="03 · Služba" title="Automatizace a klienti">
        <ul className="space-y-1.5">
          {FLOW_OUT.map((f) => (
            <li key={f} className="flex items-center gap-2 font-inter text-[13px] text-[#dce7f7]">
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8aaee3]" />
              {f}
            </li>
          ))}
        </ul>
      </FlowNode>
    </div>
  );
}
