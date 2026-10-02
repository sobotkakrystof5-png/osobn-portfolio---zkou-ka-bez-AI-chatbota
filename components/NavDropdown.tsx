"use client";

import { Fragment, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { altenoUrl } from "@/lib/alteno";
import { cn } from "@/lib/utils";
import type { NavGroup } from "@/lib/nav";
import { Alteno } from "@/components/brand/BrandName";

// Rozbalovátko v liště. Port `NavDropdown` z alteno
// (components/layout/Navbar.tsx), chování převzaté beze změny, jen vzhled
// VIZEON a jedna odchylka (níž).
//
// Je to vzor „disclosure navigation" z WAI-ARIA APG, ne `role="menu"`.
// Menu role patří k nabídkám aplikace; u navigace webu nutí čtečku do
// režimu, kde nefunguje běžný Tab mezi odkazy. Tady:
//  • tlačítko s `aria-expanded` a `aria-controls`, Enter/mezerník přepíná,
//  • odkazy v panelu jsou obyčejné odkazy v pořadí Tabu,
//  • Escape zavře a vrátí focus na tlačítko,
//  • klik mimo nebo odchod focusu ze skupiny panel zavře,
//  • myš: najetí otevírá, odjetí zavírá se zpožděním. Jen pro
//    `pointerType === "mouse"`: dotyk posílá emulované najetí těsně před
//    klikem a menu by se otevřelo a hned zase zavřelo.
//
// Panel je v serverovém HTML (skrytý atributem `hidden`), takže odkazy
// z rozbalovátka vidí i vyhledávač bez JavaScriptu.
//
// ODCHYLKA OD ALTENO: spouštěč je dvojice. Text je `Link` na `href` skupiny
// (/automatizace, /blog zůstávají prokliknutelné jako dřív), chevron vedle
// je tlačítko, které panel přepíná. Klávesnice má tedy dva tab-stopy.

// Zpoždění, než se panel po opuštění myší zavře. Pokrývá šikmý přejezd
// kurzoru mimo lištu a panel. 150 ms je krátké dost, aby to nepůsobilo
// jako prodleva, a dost dlouhé na běžný přejezd myší.
const CLOSE_DELAY_MS = 150;

/**
 * Úvodní blok skupiny s `intro: true` (Automatizace): lockup ALTENO × VIZEON
 * a jedna věta. Sdílí ho panel v liště i mobilní menu (Navbar.tsx).
 */
export function NavIntro({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-2.5 normal-case tracking-normal", className)}>
      <BrandLockup size="sm" altenoHref={altenoUrl("/", "nav-dropdown")} />
      <p className="font-inter font-light text-[12px] leading-[1.6] text-[#8a8070] whitespace-nowrap">
        Automatizace a AI ve spolupráci s <Alteno />.
      </p>
    </div>
  );
}

export default function NavDropdown({ label, href, items, intro }: NavGroup) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const pathname = usePathname();
  // Skutečná myš vždy pošle `pointerenter` těsně PŘED `click`, jde tedy
  // poznat, že tenhle konkrétní klik otevřel už hover, ne klik sám. Bez
  // toho by onClick hned po otevření hoverem panel přepnul zpátky zavřený.
  const openedByHover = useRef(false);

  function clearCloseTimer() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }

  function onPointerEnter(event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    clearCloseTimer();
    openedByHover.current = true;
    setOpen(true);
  }

  function onPointerLeave(event: React.PointerEvent) {
    if (event.pointerType !== "mouse") return;
    openedByHover.current = false;
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), CLOSE_DELAY_MS);
  }

  // Po přechodu na jinou stránku (i zpět v historii) panel nesmí zůstat
  // viset otevřený. Stav se srovná během renderu, ne v efektu, viz
  // „storing information from previous renders" v dokumentaci Reactu.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        openedByHover.current = false;
        setOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      // I kdyby myš pořád stála nad spouštěčem, zavření nesmí nechat
      // `openedByHover` nastavené, jinak by další klik považoval sám sebe
      // za pokračování zrušeného hoveru a panel by se neotevřel.
      openedByHover.current = false;
      setOpen(false);
      // Focus vracet jen z rozbalovátka. Kdyby byl jinde (panel otevřený
      // myší), Escape ho nemá přetahovat do navigace.
      if (rootRef.current?.contains(document.activeElement)) {
        triggerRef.current?.focus();
      }
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => clearCloseTimer, []);

  return (
    <div
      ref={rootRef}
      className="relative flex items-center gap-1"
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <Link
        href={href}
        onClick={() => setOpen(false)}
        className={`font-inter font-normal text-[12px] tracking-[0.08em] hover:text-[#f0ece6] transition-colors duration-300 uppercase whitespace-nowrap ${
          open ? "text-[#f0ece6]" : "text-[#8a8070]"
        }`}
      >
        {label}
      </Link>
      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Podnabídka ${label}`}
        onClick={(event) => {
          clearCloseTimer();
          // Myš, která panel právě otevřela najetím, klik jen spotřebuje
          // (nezavírá), viz `openedByHover` výš. Klávesnice (Enter/mezerník
          // pošle `click` s `detail === 0`) a dotyk přepínají normálně.
          if (event.detail !== 0 && openedByHover.current) {
            openedByHover.current = false;
            return;
          }
          setOpen((value) => !value);
        }}
        className={`flex items-center justify-center hover:text-[#f0ece6] transition-colors duration-300 ${
          open ? "text-[#f0ece6]" : "text-[#8a8070]"
        }`}
      >
        <ChevronDown
          aria-hidden
          strokeWidth={1.5}
          className={`h-3.5 w-3.5 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {/* `pt-2.5` místo odsazení panelu: mezera pod popiskem je součást
          tohohle prvku, takže přejezd myší z popisku do panelu nevyvolá
          odjetí. */}
      <div id={panelId} hidden={!open} className="absolute left-0 top-full z-50 pt-2.5">
        <ul className="min-w-64 animate-nav-panel-in bg-[#0e0e0e] border border-white/[0.06] p-1.5 text-left shadow-lg shadow-black/40">
          {intro ? (
            <>
              {/* Klik na VIZEON v lockupu (interní odkaz na /) panel zavře
                  stejně jako položky. Odkaz ALTENO otevírá novou kartu. */}
              <li
                className="px-3 pt-2.5 pb-2.5"
                onClick={(event) => {
                  if ((event.target as Element).closest("a[href^='/']")) setOpen(false);
                }}
              >
                <NavIntro />
              </li>
              <li aria-hidden className="-mx-1.5 my-1.5 h-px bg-white/[0.06]" />
            </>
          ) : null}
          {items.map((item) => (
            <Fragment key={`${item.href}-${item.label}`}>
              <li>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 font-inter font-normal text-[12px] uppercase tracking-[0.08em] whitespace-nowrap text-[#8a8070] transition-colors duration-300 hover:text-[#f0ece6] hover:bg-white/[0.04] focus-visible:text-[#f0ece6] focus-visible:bg-white/[0.04]"
                >
                  {item.label}
                  {item.comingSoon ? (
                    <span className="border border-accent/40 text-accent text-[10px] uppercase px-1.5 py-0.5 leading-none tracking-[0.08em]">
                      Připravuji
                    </span>
                  ) : null}
                </Link>
              </li>
              {item.separatorAfter ? (
                <li aria-hidden className="-mx-1.5 my-1.5 h-px bg-white/[0.06]" />
              ) : null}
            </Fragment>
          ))}
        </ul>
      </div>
    </div>
  );
}
