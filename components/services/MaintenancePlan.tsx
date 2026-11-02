import {
  Check,
  Clock,
  Clock3,
  ImagePlus,
  LifeBuoy,
  Megaphone,
  MessagesSquare,
  PenLine,
  Quote,
  RefreshCw,
  ShieldCheck,
  Tag,
  X,
} from "lucide-react";
import { PriceLabel } from "@/components/PriceLabel";
import { CTAButton } from "@/components/CTAButton";

// Měsíční správa webu (/sluzby/sprava-webu): karta tarifu se zlatou září
// (vzor: zvýrazněná karta ve WebPackages), vedle ní příklady, co se vejde do
// hodiny práce, a pod tím srovnání bez správy × se správou. Sliby drží to, co
// web dává jinde (odpověď do 24 h, zásah při výpadku podle obchodních podmínek).
export const MAINTENANCE_PRICE = "od 480 Kč";

const INCLUDED = [
  { icon: Clock, title: "1 hodina práce každý měsíc", text: "Úpravy textů, fotek, ceníku i nové sekce." },
  { icon: RefreshCw, title: "Technické aktualizace", text: "Web zůstává rychlý a aktuální." },
  { icon: ShieldCheck, title: "Bezpečnost pod dohledem", text: "Hlídáme, ať je web v pořádku." },
  { icon: LifeBuoy, title: "Zásah při výpadku", text: "Když něco nejde, řešíme to hned." },
  { icon: MessagesSquare, title: "Odpověď do 24 hodin", text: "Na každý dotaz i požadavek." },
];

const HOUR_EXAMPLES = [
  { icon: ImagePlus, label: "Nové fotky do galerie" },
  { icon: Tag, label: "Úprava ceníku" },
  { icon: Quote, label: "Nová reference" },
  { icon: Megaphone, label: "Akce nebo novinka" },
  { icon: Clock3, label: "Změna otevírací doby" },
  { icon: PenLine, label: "Přepsání textů" },
];

const COMPARISON = [
  { topic: "Úpravy", without: "Každá drobnost je nová zakázka.", with: "Hodina práce měsíčně v ceně." },
  { topic: "Aktualizace", without: "Web stárne a nikdo ho nehlídá.", with: "Web držíme technicky aktuální." },
  { topic: "Výpadek", without: "Hledáte, kdo vám pomůže.", with: "Zasáhneme neprodleně." },
  { topic: "Náklady", without: "Nečekané faktury za zásahy.", with: `Pevná cena ${MAINTENANCE_PRICE} měsíčně.` },
];

export function MaintenancePlan() {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-14">
      {/* Karta tarifu */}
      <div className="relative border border-[#c9a84c]/45 bg-gradient-to-b from-[#17130a] via-[#0f0c07] to-[#0b0b0b] px-7 pb-9 pt-10 shadow-[0_0_80px_-22px_rgba(201,168,76,0.5)] md:px-10">
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-[#c9a84c]/30 via-[#e9cf7f] to-[#c9a84c]/30" />

        <p className="inline-block border border-[#c9a84c]/25 bg-[#c9a84c]/[0.07] px-3 py-1.5 font-inter font-medium text-[11px] uppercase tracking-[0.16em] text-[#c9a84c]">
          Měsíční paušál
        </p>
        <h2 id="tarif" className="mt-5 font-cormorant font-light text-[40px] leading-none text-[#f0ece6]">
          Správa webu
        </h2>
        <p className="mt-6 flex items-baseline gap-3">
          <span className="font-cormorant font-light text-[52px] leading-none lining-nums text-[#f0ece6]">
            <PriceLabel price={MAINTENANCE_PRICE} />
          </span>
          <span className="font-inter font-normal text-[14px] uppercase tracking-[0.12em] text-text-muted">/ měsíc</span>
        </p>

        <ul className="mt-9 space-y-5 border-t border-[#c9a84c]/15 pt-8">
          {INCLUDED.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4">
              <span className="relative flex h-10 w-10 shrink-0 items-center justify-center border border-[#c9a84c]/35 bg-[#100e09]" aria-hidden="true">
                <Icon size={18} strokeWidth={1.4} className="text-[#c9a84c]" />
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#c9a84c] ring-[3px] ring-[#120f08]">
                  <Check size={11} strokeWidth={3} className="text-[#080808]" />
                </span>
              </span>
              <div>
                <p className="font-inter font-medium text-[17px] text-[#f0ece6]">{title}</p>
                <p className="mt-0.5 font-inter font-normal text-[15px] text-text-secondary">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <CTAButton className="mt-10 flex w-full items-center justify-center bg-[#c9a84c] px-6 py-4 font-inter text-[13px] font-semibold uppercase tracking-[0.1em] text-[#080808] shadow-[0_0_44px_-8px_rgba(201,168,76,0.6)] transition-all duration-300 hover:bg-[#d4b968]">
          Chci správu webu →
        </CTAButton>
        <p className="mt-4 text-center font-inter font-normal text-[13px] text-text-muted">
          Potřebujete víc hodin? Rozsah domluvíme na míru.
        </p>
      </div>

      {/* Co se vejde do hodiny */}
      <div>
        <p className="mb-4 font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c]">— Příklady</p>
        <h2 className="font-cormorant font-light text-[30px] leading-tight text-[#f0ece6] md:text-[38px]">
          Co za hodinu stihneme
        </h2>
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:gap-4">
          {HOUR_EXAMPLES.map(({ icon: Icon, label }) => (
            <li
              key={label}
              className="flex flex-col gap-4 border border-white/[0.07] bg-[#0b0b0b] p-5 md:p-6 transition-colors duration-300 hover:border-[#c9a84c]/35"
            >
              <Icon size={22} strokeWidth={1.3} className="text-[#c9a84c]" aria-hidden="true" />
              <span className="font-inter font-normal text-[15px] leading-snug text-[#e6e0d6]">{label}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function MaintenanceComparison() {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div className="border border-white/[0.08] bg-white/[0.02] p-7 md:p-9">
        <p className="font-cormorant text-[30px] font-normal leading-none text-[#d8d1c5]">Bez správy</p>
        <ul className="mt-8 space-y-6">
          {COMPARISON.map((row) => (
            <li key={row.topic} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d9776a]/15 text-[#e48a7d] ring-1 ring-[#d9776a]/35" aria-hidden="true">
                <X size={16} strokeWidth={2.25} />
              </span>
              <div>
                <p className="font-inter font-medium text-[12px] uppercase tracking-[0.14em] text-text-muted">{row.topic}</p>
                <p className="mt-1 font-inter text-[17px] leading-[1.5] text-[#c9c1b3]">{row.without}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative border border-[#c9a84c]/45 bg-gradient-to-br from-[#17130a] to-[#0d0b07] p-7 shadow-[0_0_60px_-24px_rgba(201,168,76,0.6)] md:p-9">
        <p className="font-cormorant text-[30px] font-normal leading-none text-[#f0ece6]">
          Se <span className="text-gleam">správou</span>
        </p>
        <ul className="mt-8 space-y-6">
          {COMPARISON.map((row) => (
            <li key={row.topic} className="flex gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#c9a84c] shadow-[0_0_18px_-2px_rgba(201,168,76,0.75)]" aria-hidden="true">
                <Check size={17} strokeWidth={3} className="text-[#080808]" />
              </span>
              <div>
                <p className="font-inter font-medium text-[12px] uppercase tracking-[0.14em] text-[#c9a84c]">{row.topic}</p>
                <p className="mt-1 font-inter text-[17px] font-medium leading-[1.5] text-[#f6f2ea]">{row.with}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
