import Image from "next/image";
import Link from "next/link";
import { Clock, FileText, LayoutGrid } from "lucide-react";
import { Vizeon } from "@/components/brand/BrandName";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Blok „S kým mluvíte“ na /kontakt. Je to indexovatelné místo, kde je autor
// blogu a zakladatel (Person #founder v layout JSON-LD má url sem), protože
// /o-mne je záměrně noindex. Jen křestní jméno, jak web používá všude.

const FACTS = [
  { icon: Clock, label: "Odpovídáme do hodiny", href: null },
  { icon: FileText, label: "IČO 29977231", href: null },
  { icon: LayoutGrid, label: "Ukázky webů a reference", href: "/ukazky-webu" },
] as const;

export function WhoYouTalkTo() {
  return (
    <section
      id="s-kym-mluvite"
      aria-labelledby="s-kym-mluvite-nadpis"
      className="scroll-mt-28 glass-panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8"
    >
      <span className="relative h-24 w-24 shrink-0 overflow-hidden rounded-full border border-[#c9a84c]/40">
        <Image
          src="/avatar.jpg"
          alt="Kryštof, zakladatel VIZEON, ilustrovaný avatar"
          fill
          sizes="96px"
          className="object-cover object-top"
        />
      </span>

      <div className="min-w-0">
        <p className={cn(t.eyebrow, "mb-2")}>— S kým mluvíte</p>
        <h2 id="s-kym-mluvite-nadpis" className={cn(t.h3, "text-[20px]")}>
          Kryštof, zakladatel <Vizeon />
        </h2>
        <p className={cn(t.body, "mt-2 max-w-xl text-[15px] md:text-[15px]")}>
          Konzultaci i celý projekt vede přímo zakladatel. Mezi vámi a tím, kdo web staví, není
          žádný obchodník.
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {FACTS.map(({ icon: Icon, label, href }) => (
            <li key={label} className="flex items-center gap-2 font-inter text-[13px] text-text-secondary">
              <Icon size={14} className="shrink-0 text-[#c9a84c]" aria-hidden="true" />
              {href ? (
                <Link href={href} className={t.link}>
                  {label}
                </Link>
              ) : (
                label
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
