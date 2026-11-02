import { CalendarCheck, Check, Clock, KeyRound, MessagesSquare, PenLine, Receipt } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Garance u každého webu jako výrazný pás přes celou šířku stránky: vlastní
// pozadí se zlatou září, pečeť s fajfkou, velký nadpis a CTA. Stojí hned
// pod variantami a cenou, kde se klient rozhoduje, ať ji nepřehlédne.
// Jen sliby, které web už dává jinde (ceník, FAQ, pruh důvěry na homepage),
// ať se nerozcházejí.
const GUARANTEES = [
  { icon: Receipt, title: "Cena předem", text: "Znáte ji před začátkem a bez vašeho souhlasu se nezmění." },
  { icon: CalendarCheck, title: "Termín předem", text: "Víte přesně, kdy bude web hotový." },
  { icon: PenLine, title: "Ladíme do schválení", text: "Web spustíme, až když je podle vás." },
  { icon: Clock, title: "Odpověď do 24 hodin", text: "Na každý dotaz, i po spuštění webu." },
  { icon: KeyRound, title: "Web je váš", text: "Doména, hosting i přístupy patří vám." },
  { icon: MessagesSquare, title: "Bez prostředníků", text: "Mluvíte přímo s tím, kdo web staví." },
];

// Pečeť: v kruhu stojí motto (záměrně bez otáčení), uprostřed velká fajfka.
// Na stránce je jen jednou, id cesty může být pevné.
function GuaranteeSeal({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      <defs>
        <path id="garance-pecet-kruh" d="M100,100 m-79,0 a79,79 0 1,1 158,0 a79,79 0 1,1 -158,0" />
      </defs>
      <circle cx="100" cy="100" r="97" stroke="#c9a84c" strokeOpacity="0.35" />
      <circle cx="100" cy="100" r="64" stroke="#c9a84c" strokeOpacity="0.5" />
      <circle cx="100" cy="100" r="58" fill="#c9a84c" fillOpacity="0.1" />
      <text fill="#c9a84c" fontSize="12" fontWeight="500" className="font-inter uppercase">
        <textPath href="#garance-pecet-kruh" textLength="490" lengthAdjust="spacing">
          Náš zákazník, náš pán · Garance výsledku ·
        </textPath>
      </text>
      <path d="M76 101 L93 118 L125 84" stroke="#c9a84c" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WebGuaranteeBand() {
  return (
    <section aria-labelledby="garance" className="relative overflow-hidden border-y border-[#c9a84c]/25 bg-[#0b0906] py-20 md:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_75%_at_12%_45%,rgba(201,168,76,0.16),transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a84c]/80 to-transparent"
      />

      <div className={cn(t.container.wide, "relative grid items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20")}>
        <div>
          <GuaranteeSeal className="mb-10 w-[128px] md:w-[156px]" />
          <p className={cn(t.eyebrow, "mb-4")}>— Co vám garantujeme</p>
          <h2 id="garance" className="font-cormorant font-light text-[40px] leading-[1.05] text-[#f0ece6] md:text-[60px]">
            Platíte za <span className="text-gleam">výsledek,</span> ne za hodiny.
          </h2>
          <p className={cn(t.lead, "mt-6 max-w-md")}>
            Na projektu pracujeme do vaší úplné spokojenosti. Spokojenost zákazníků je pro nás zásadní.
          </p>
          <CTAButton className="mt-9 inline-flex bg-[#c9a84c] px-8 py-4 shadow-[0_0_44px_-8px_rgba(201,168,76,0.6)] font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#080808] transition-all duration-300 hover:bg-[#d4b968]">
            Nezávazná konzultace zdarma →
          </CTAButton>
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {GUARANTEES.map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="border border-[#c9a84c]/20 bg-[#080808]/70 p-6 transition-colors duration-300 hover:border-[#c9a84c]/50"
            >
              {/* Ikona tématu, na rohu plná zlatá fajfka jako odznak ověření. */}
              <span className="relative mb-5 flex h-12 w-12 items-center justify-center border border-[#c9a84c]/40 bg-[#100e09]" aria-hidden="true">
                <Icon size={20} strokeWidth={1.25} className="text-[#c9a84c]" />
                <span className="absolute -right-2.5 -top-2.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#c9a84c] ring-4 ring-[#0b0906]">
                  <Check size={13} strokeWidth={3} className="text-[#080808]" />
                </span>
              </span>
              <h3 className="font-inter font-medium text-[17px] text-[#f0ece6]">{title}</h3>
              <p className="mt-2 font-inter font-normal text-[14px] leading-[1.65] text-text-secondary">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
