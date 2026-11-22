"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { ZakazIqMark } from "@/components/zakaziq/ZakazIqMark";
import { ZAKAZIQ_PRICE } from "@/lib/data/zakaziq";
import { cn } from "@/lib/utils";

// Plovoucí výzva v části „ZakazIQ pro firmy" na /zakaziq. Ukáže se, jen
// když čtenář prochází část 2 a zrovna nevidí její úvod ani závěrečnou
// výzvu (tam je tlačítko na očích). Na telefonu lišta dole přes celou
// šířku, na počítači pilulka vpravo dole. Vrstva pod cookie lištou
// (--z-sticky-cta), aby ji nepřekryla. Skrytá lišta je `invisible`, takže
// vypadne i z pořadí tabulátoru a z čtečky obrazovky.

const WATCH = {
  section: "pro-firmy",
  hidden: ["pro-firmy-hero", "zakaziq-final-cta"],
};

export function ZakazIqStickyCta() {
  const [inSection, setInSection] = useState(false);
  const [blocked, setBlocked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const section = document.getElementById(WATCH.section);
    if (!section) return;
    const sectionObserver = new IntersectionObserver(([entry]) => setInSection(entry.isIntersecting), {
      rootMargin: "0px 0px -40% 0px",
    });
    sectionObserver.observe(section);

    const blockObserver = new IntersectionObserver((entries) => {
      setBlocked((prev) => {
        const next = { ...prev };
        for (const e of entries) next[e.target.id] = e.isIntersecting;
        return next;
      });
    });
    for (const id of WATCH.hidden) {
      const el = document.getElementById(id);
      if (el) blockObserver.observe(el);
    }
    return () => {
      sectionObserver.disconnect();
      blockObserver.disconnect();
    };
  }, []);

  const visible = inSection && !Object.values(blocked).some(Boolean);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-[var(--z-sticky-cta)] transition-[opacity,transform,visibility] duration-300 ease-out motion-reduce:transition-none sm:inset-x-auto sm:bottom-6 sm:right-6",
        visible ? "visible translate-y-0 opacity-100" : "invisible pointer-events-none translate-y-4 opacity-0"
      )}
    >
      <div className="flex items-center gap-3 rounded-full border border-[#2b57a8] bg-[#0c1a36]/95 py-2 pl-3 pr-2 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.9)] backdrop-blur-md">
        <ZakazIqMark size="sm" />
        <p className="min-w-0 flex-1 font-inter text-[13px] leading-tight text-[#dce7f7] sm:flex-none">
          <span className="block font-semibold text-white">ZakazIQ</span>
          <span className="block text-[#b8ceef]">
            14 dní zdarma<span className="hidden sm:inline">, pak {ZAKAZIQ_PRICE} Kč/měs.</span>
          </span>
        </p>
        <CTAButton className="inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full bg-white px-4 font-inter text-[14px] font-semibold text-[#0c1a36] transition-colors hover:bg-[#dce7f7]">
          Vyzkoušet
          <ArrowRight size={15} strokeWidth={2.2} aria-hidden="true" />
        </CTAButton>
      </div>
    </div>
  );
}
