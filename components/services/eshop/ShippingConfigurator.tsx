"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, House, PackageCheck, Store, Truck, Warehouse } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { usePrefersReducedMotion } from "@/components/automation/usePrefersReducedMotion";
import { cn } from "@/lib/utils";

// Živá věc stránky E-shopy: klient si vybere dopravce a kdo balí a vpravo
// hned vidí, jak to uvidí jeho zákazník v pokladně a co se stane po
// objednávce. Ceny dopravy jsou ukázkové, pod pokladnou to stojí napsané.
type Carrier = { id: string; name: string; kind: string; price: number; icon: LucideIcon };

const CARRIERS: Carrier[] = [
  { id: "zasilkovna", name: "Zásilkovna", kind: "Výdejní místo nebo Z-BOX", price: 79, icon: Store },
  { id: "balikovna", name: "Balíkovna", kind: "Výdejní místo", price: 69, icon: Store },
  { id: "ppl", name: "PPL", kind: "Na adresu", price: 119, icon: Truck },
  { id: "dpd", name: "DPD", kind: "Na adresu", price: 129, icon: Truck },
  { id: "gls", name: "GLS", kind: "Na adresu", price: 115, icon: Truck },
  { id: "osobne", name: "Osobní odběr", kind: "Na vaší provozovně", price: 0, icon: House },
];

const PACKING = {
  self: {
    label: "Balíme sami",
    steps: ["Objednávka přijde k vám", "Zabalíte a vytisknete štítek", "Kurýr si balík vyzvedne"],
    note: "Štítky i předání dopravci nastavíme tak, aby vám balení zabralo minimum času.",
  },
  sklad: {
    label: "Balí za nás sklad",
    steps: ["Objednávka odejde do skladu", "Sklad vychystá a zabalí", "Kurýr vyzvedne ve skladu"],
    note: "Napojíme balicí sklad. Vy se staráte jen o zboží a zákazníky.",
  },
} as const;

type PackingId = keyof typeof PACKING;

const PRODUCT = { name: "Lněná zástěra", price: 1290 };
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const kc = (value: number) => (value === 0 ? "Zdarma" : `${value.toLocaleString("cs-CZ")} Kč`);

export function ShippingConfigurator() {
  const reduced = usePrefersReducedMotion();
  const [enabled, setEnabled] = useState<string[]>(["zasilkovna", "balikovna", "ppl"]);
  const [chosen, setChosen] = useState("zasilkovna");
  const [packing, setPacking] = useState<PackingId>("self");

  const offered = CARRIERS.filter((carrier) => enabled.includes(carrier.id));
  const selected = offered.find((carrier) => carrier.id === chosen) ?? offered[0];
  const total = PRODUCT.price + selected.price;

  const toggle = (id: string) => {
    if (!enabled.includes(id)) {
      setEnabled([...enabled, id]);
      return;
    }
    // Aspoň jeden dopravce v pokladně zůstat musí.
    if (enabled.length === 1) return;
    const next = enabled.filter((item) => item !== id);
    setEnabled(next);
    if (id === chosen) setChosen(next[0]);
  };

  const transition = { duration: reduced ? 0 : 0.35, ease: EASE };

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
      {/* Ovládání */}
      <div>
        <h3 className="font-inter text-[17px] font-medium text-[#f0ece6]">Které dopravce nabídnete?</h3>
        <ul className="mt-5 grid grid-cols-2 gap-2.5 sm:gap-3">
          {CARRIERS.map((carrier) => {
            const on = enabled.includes(carrier.id);
            return (
              <li key={carrier.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  onClick={() => toggle(carrier.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 border px-3 py-3.5 text-left sm:gap-3 sm:px-4 transition-all duration-300 active:scale-[0.98]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]/60",
                    on
                      ? "border-[#c9a84c]/60 bg-[#c9a84c]/[0.08]"
                      : "border-white/[0.08] bg-[#0b0b0b] hover:border-white/20"
                  )}
                >
                  <span
                    className={cn(
                      "flex h-6 w-6 shrink-0 items-center justify-center border transition-colors duration-300",
                      on ? "border-[#c9a84c] bg-[#c9a84c]" : "border-white/20"
                    )}
                    aria-hidden="true"
                  >
                    {on && <Check size={14} strokeWidth={3} className="text-[#080808]" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-inter text-[15px] text-[#f0ece6]">{carrier.name}</span>
                    <span className="block truncate font-inter text-[13px] text-text-muted">{carrier.kind}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <h3 className="mt-10 font-inter text-[17px] font-medium text-[#f0ece6]">Kdo bude balit?</h3>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {(Object.keys(PACKING) as PackingId[]).map((id) => {
            const on = packing === id;
            const Icon = id === "self" ? PackageCheck : Warehouse;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setPacking(id)}
                className={cn(
                  "flex flex-col items-start gap-3 border px-4 py-4 text-left transition-all duration-300 active:scale-[0.98]",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]/60",
                  on ? "border-[#c9a84c]/60 bg-[#c9a84c]/[0.08]" : "border-white/[0.08] bg-[#0b0b0b] hover:border-white/20"
                )}
              >
                <Icon size={20} strokeWidth={1.5} className={on ? "text-[#c9a84c]" : "text-text-muted"} aria-hidden="true" />
                <span className="font-inter text-[15px] text-[#f0ece6]">{PACKING[id].label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Náhled: pokladna e-shopu a co se stane po objednávce */}
      <div aria-live="polite">
        <div className="border border-[#c9a84c]/30 bg-[#0b0b0b] shadow-[0_0_80px_-30px_rgba(201,168,76,0.45)]">
          <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
            <span className="font-inter text-[14px] font-medium text-[#f0ece6]">Pokladna</span>
            <span className="flex gap-3 font-inter text-[12px] text-text-muted">
              <span>Košík</span>
              <span className="text-[#c9a84c]">Doprava</span>
              <span>Platba</span>
            </span>
          </div>

          <div className="flex items-center justify-between px-5 py-4">
            <span className="font-inter text-[14px] text-text-secondary">{PRODUCT.name}</span>
            <span className="font-inter text-[14px] tabular-nums text-[#f0ece6]">{kc(PRODUCT.price)}</span>
          </div>

          <fieldset className="border-t border-white/[0.06] px-5 py-4">
            <legend className="sr-only">Způsob dopravy v ukázkové pokladně</legend>
            <ul className="space-y-2">
              <AnimatePresence initial={false}>
                {offered.map((carrier) => {
                  const on = carrier.id === selected.id;
                  const Icon = carrier.icon;
                  return (
                    <motion.li
                      key={carrier.id}
                      layout={!reduced}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={transition}
                      className="overflow-hidden"
                    >
                      <label
                        className={cn(
                          "flex cursor-pointer items-center gap-3 border px-3.5 py-3 transition-colors duration-300",
                          "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#c9a84c]/60",
                          on ? "border-[#c9a84c]/60 bg-[#c9a84c]/[0.06]" : "border-white/[0.06] hover:border-white/15"
                        )}
                      >
                        <input
                          type="radio"
                          name="ukazka-doprava"
                          value={carrier.id}
                          checked={on}
                          onChange={() => setChosen(carrier.id)}
                          className="sr-only"
                        />
                        <span
                          aria-hidden="true"
                          className={cn(
                            "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border",
                            on ? "border-[#c9a84c]" : "border-white/25"
                          )}
                        >
                          {on && <span className="h-2 w-2 rounded-full bg-[#c9a84c]" />}
                        </span>
                        <Icon size={16} strokeWidth={1.5} className="shrink-0 text-text-muted" aria-hidden="true" />
                        <span className="min-w-0 flex-1">
                          <span className="block font-inter text-[14px] text-[#f0ece6]">{carrier.name}</span>
                          <span className="block truncate font-inter text-[12px] text-text-muted">{carrier.kind}</span>
                        </span>
                        <span className="font-inter text-[14px] tabular-nums text-[#f0ece6]">{kc(carrier.price)}</span>
                      </label>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </fieldset>

          <div className="space-y-2 border-t border-white/[0.06] px-5 py-4">
            <div className="flex justify-between font-inter text-[14px] text-text-secondary">
              <span>Doprava</span>
              <span className="tabular-nums">{kc(selected.price)}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="font-inter text-[14px] text-[#f0ece6]">Celkem</span>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={total}
                  initial={{ opacity: 0, y: reduced ? 0 : 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: reduced ? 0 : -8 }}
                  transition={{ duration: reduced ? 0 : 0.25 }}
                  className="font-cormorant text-[30px] leading-none lining-nums text-[#f0ece6]"
                >
                  {kc(total)}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div className="bg-[#c9a84c] px-5 py-3.5 text-center font-inter text-[13px] font-medium uppercase tracking-[0.1em] text-[#080808]">
            Pokračovat k platbě
          </div>
        </div>
        <p className="mt-3 font-inter text-[13px] text-text-muted">Ukázka. Ceny dopravy si v e-shopu nastavíte sami.</p>

        {/* Co se stane po objednávce, podle toho, kdo balí. */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={packing}
            initial={{ opacity: 0, y: reduced ? 0 : 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduced ? 0 : -8 }}
            transition={transition}
            className="mt-8"
          >
            <p className="font-inter text-[14px] font-medium text-[#f0ece6]">Po objednávce</p>
            <ol className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-stretch">
              {PACKING[packing].steps.map((step, index) => (
                <li key={step} className="flex items-center gap-2 sm:flex-1">
                  <span className="flex h-full flex-1 items-center border border-white/[0.08] bg-[#0b0b0b] px-3.5 py-3 font-inter text-[13px] leading-[1.45] text-[#f0ece6]">
                    {step}
                  </span>
                  {index < PACKING[packing].steps.length - 1 && (
                    <ArrowRight size={14} className="hidden shrink-0 text-[#c9a84c] sm:block" aria-hidden="true" />
                  )}
                </li>
              ))}
            </ol>
            <p className="mt-4 font-inter text-[14px] leading-[1.65] text-text-secondary">{PACKING[packing].note}</p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
