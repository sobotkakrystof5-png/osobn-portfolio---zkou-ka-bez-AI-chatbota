import Link from "next/link";
import { ArrowRight, CalendarCheck, Database, LayoutDashboard, MessageCircle, MonitorSmartphone, Star, Workflow } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { CTAButton } from "@/components/CTAButton";
import { Reveal } from "@/components/automation/Reveal";
import { Alteno, Vizeon } from "@/components/brand/BrandName";
import { ZakazIqMark, zakaziqWordmark } from "@/components/zakaziq/ZakazIqMark";
import { ZakazIqMockup } from "@/components/zakaziq/ZakazIqMockup";
import { ZakazIqSteps } from "@/components/zakaziq/ZakazIqSteps";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Stránka /zakaziq ve stejném rozvržení jako na webu ALTENO (alteno-ref
// app/zakaziq/page.tsx): vlevo produkt a co umí, vpravo nakloněná ukázka
// rozhraní, pod tím kroky, technická architektura a proč vlastní produkt.
// Barvy a písma podle VIZEON (zlatá, Cormorant v nadpisech sekcí).

const FEATURES: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessageCircle,
    title: "Komunikace o projektu",
    text: "Zadání, podklady i změny zůstávají na jedné kartě. Žádné dohledávání v e-mailech.",
  },
  {
    icon: Star,
    title: "Zpětná vazba",
    text: "Připomínku nebo hodnocení nám pošlete přímo v systému, bez zdržení.",
  },
  {
    icon: CalendarCheck,
    title: "Konzultace na jedno kliknutí",
    text: "Termín schůzky si vyberete sami. Systém hned zablokuje kalendář a pošle potvrzení.",
  },
  {
    icon: LayoutDashboard,
    title: "Přehled pro obě strany",
    text: "Vy vidíte stav své zakázky. My máme přehled o všech projektech najednou.",
  },
];

const STEPS = [
  {
    title: "Objednáte konzultaci",
    detail: (
      <>
        Zdarma přes <Vizeon />
      </>
    ),
  },
  { title: "Přiřazení do ZakazIQ", detail: "Automaticky, hned po konzultaci" },
  { title: "Komunikace a zpětná vazba", detail: "Přímo v systému" },
  { title: "Dokončení projektu", detail: "S přehledem na obou stranách" },
];

const STACK: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Workflow,
    title: "n8n Workflow Engine",
    text: "Řídí veškerou automatickou logiku, od odesílání e-mailů a SMS po synchronizaci kalendářů a zpracování webhooků.",
  },
  {
    icon: Database,
    title: "Neon PostgreSQL & Drizzle",
    text: "Bezpečně ukládá data, historii zakázek, stavy i hodnocení s okamžitou odezvou.",
  },
  {
    icon: MonitorSmartphone,
    title: "Next.js & React 19",
    text: "Rychlé klientské rozhraní, které funguje stejně dobře na mobilu i na počítači.",
  },
];

const h2 = "font-cormorant font-light text-[34px] leading-[1.08] text-[#f0ece6] md:text-[46px]";
const pad = (n: number) => String(n).padStart(2, "0");

export default function ZakazIQ() {
  return (
    <section id="zakaziq" aria-labelledby="zakaziq-h1" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute -right-[15%] top-[-5%] h-[680px] w-[680px] rounded-full bg-[#c9a84c]/[0.06] blur-[120px]"
        aria-hidden="true"
      />

      <div className={cn(t.container.wide, "relative pb-24 pt-28 md:pb-36 md:pt-36")}>
        <Link href="/" className={t.backLink}>
          ← Zpět na hlavní stránku
        </Link>

        {/* ─── Hero: produkt vlevo, běžící rozhraní vpravo ─── */}
        <div className="mt-10 grid grid-cols-1 gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <span className="inline-flex items-center border border-[#c9a84c]/35 bg-[#c9a84c]/[0.06] px-3.5 py-1.5 font-inter text-[11px] font-medium uppercase tracking-[0.2em] text-[#c9a84c]">
              Vlastní produkt
            </span>

            <div className="mt-6 flex items-center gap-4">
              <ZakazIqMark />
              <h1
                id="zakaziq-h1"
                className={cn("pb-1 font-inter text-[44px] font-semibold leading-none tracking-tight sm:text-[56px]", zakaziqWordmark)}
              >
                ZakazIQ
              </h1>
            </div>
            <p className="mt-4 font-inter text-[12px] font-medium uppercase tracking-[0.22em] text-text-muted">
              Komunikační a rezervační systém
            </p>

            <p className={cn(t.lead, "mt-6 max-w-xl text-[#d6cebf]")}>
              Systém, který jsme si postavili pro vlastní provoz. Řídí komunikaci, rezervace termínů i sběr zpětné
              vazby bez jediného zbytečného e-mailu.
            </p>

            {/* Vlastnosti jako číslovaný seznam, ne nadpisy: osnovu nesou H2 sekcí níž */}
            <ul className="mt-9 border-t border-white/[0.08]">
              {FEATURES.map((f, i) => (
                <li key={f.title} className="flex items-start gap-4 border-b border-white/[0.08] py-4">
                  <span aria-hidden="true" className="mt-0.5 font-inter text-[12px] tabular-nums text-text-muted">
                    {pad(i + 1)}
                  </span>
                  <f.icon size={19} strokeWidth={1.5} className="mt-0.5 shrink-0 text-[#c9a84c]" aria-hidden="true" />
                  <div>
                    <p className="font-inter text-[16px] font-medium text-[#f0ece6]">{f.title}</p>
                    <p className="mt-0.5 font-inter text-[15px] leading-[1.6] text-text-secondary">{f.text}</p>
                  </div>
                </li>
              ))}
            </ul>

            <CTAButton className="glow-pulse mt-9 inline-flex items-center justify-center gap-2 bg-[#c9a84c] px-8 py-4 font-inter text-[14px] font-semibold uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968] active:scale-[0.98]">
              Chci podobný systém pro svou firmu
              <ArrowRight size={16} strokeWidth={2.2} aria-hidden="true" />
            </CTAButton>
            <p className="mt-4 max-w-md font-inter text-[13px] leading-[1.6] text-text-muted">
              Žádná vymyšlená reference. ZakazIQ je systém, ve kterém s klienty skutečně pracujeme.
            </p>
          </Reveal>

          {/* Náklon v perspektivě jen od lg, na mobilu karta stojí zpříma */}
          <Reveal className="relative isolate lg:col-span-6">
            <div aria-hidden="true" className="absolute -inset-8 -z-10 bg-[#c9a84c]/[0.07] blur-3xl" />
            <div className="lg:[transform:perspective(1600px)_rotateY(-7deg)_rotateX(2deg)]">
              <ZakazIqMockup />
            </div>
          </Reveal>
        </div>

        {/* ─── Jak to funguje ─── */}
        <Reveal className="glass-panel mt-24 p-7 md:mt-32 md:p-10">
          <h2 className={h2}>Jak to funguje</h2>
          <p className={cn(t.body, "mt-3")}>Od objednávky po dokončení běží vše na jednom místě.</p>
          <ZakazIqSteps steps={STEPS} />
        </Reveal>

        {/* ─── Technická architektura ─── */}
        <Reveal className="mt-24 md:mt-32">
          <h2 className={h2}>Technická architektura</h2>
          <p className={cn(t.body, "mt-3")}>Žádné krabicové řešení. Tři vrstvy, každá dělá jednu věc.</p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {STACK.map((s, i) => (
              <div key={s.title} className="glass-panel glass-panel-hover flex flex-col p-7">
                <div className="flex items-start justify-between">
                  <span aria-hidden="true" className="font-cormorant text-[32px] font-light leading-none lining-nums text-[#c9a84c]">
                    {pad(i + 1)}
                  </span>
                  <s.icon size={22} strokeWidth={1.25} className="text-[#c9a84c]/60" aria-hidden="true" />
                </div>
                <h3 className="mt-6 font-inter text-[17px] font-medium text-[#f0ece6]">{s.title}</h3>
                <p className="mt-2 font-inter text-[15px] leading-[1.7] text-text-secondary">{s.text}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* ─── Proč vlastní produkt ─── */}
        <Reveal className="glass-panel mt-24 p-8 md:mt-32 md:p-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <h2 className={h2}>Proč vlastní produkt, ne reference</h2>
              <p className="mt-4 font-inter text-[14px] text-text-muted">
                — <Vizeon />
              </p>
              <CTAButton className="mt-7 inline-flex items-center gap-2 border border-[#c9a84c]/50 px-7 py-3.5 font-inter text-[13px] font-medium uppercase tracking-[0.1em] text-[#c9a84c] transition-colors duration-300 hover:bg-[#c9a84c] hover:text-[#080808]">
                Nezávazná konzultace
                <ArrowRight size={15} aria-hidden="true" />
              </CTAButton>
            </div>
            <div className="space-y-5 lg:col-span-7">
              <p className={cn(t.body, "text-[#d6cebf]")}>
                ZakazIQ je naše vlastní dílo. Postavili jsme si ho pro vlastní provoz, protože jsme nechtěli ztrácet čas
                ručním domlouváním termínů a nekonečnými e-maily.
              </p>
              <p className={t.body}>
                Systém používají obě naše značky. Ať řešíte web pod značkou <Vizeon />, nebo{" "}
                <Link href="/automatizace" className={t.link}>
                  automatizaci pod značkou <Alteno />
                </Link>
                , stav zakázky vidíte na jednom místě.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
