import Image from "next/image";
import Link from "next/link";
import { Vizeon } from "@/components/brand/BrandName";
import { cn } from "@/lib/utils";

// Byline pod nadpisem článku: autor (Kryštof, zakladatel) s odkazem na blok
// „S kým mluvíte“ na /kontakt, datum vydání, případně poslední aktualizace a
// doba čtení. Dřív tu byl jen vydavatel VIZEON a článek působil bez autora,
// což audit E-E-A-T hodnotil jako nulovou osobní autoritu. Datum aktualizace
// se ukazuje jen tehdy, když se obsah článku opravdu změnil (pole `updated`).

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function ArticleMeta({
  date,
  updated,
  readingMinutes,
  className,
}: {
  date: string;
  updated?: string;
  readingMinutes: number;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-3 py-5 border-y border-white/[0.06] mb-14",
        className
      )}
    >
      <Link href="/kontakt#s-kym-mluvite" className="group flex items-center gap-3" rel="author">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full border border-[#c9a84c]/40">
          <Image src="/avatar.jpg" alt="" fill sizes="40px" className="object-cover object-top" />
        </span>
        <span className="flex flex-col gap-1 leading-none">
          <span className="font-inter font-medium text-[14px] text-[#f0ece6] group-hover:text-[#c9a84c] transition-colors duration-300">
            Kryštof
          </span>
          <span className="font-inter font-normal text-[12px] text-text-secondary">
            zakladatel <Vizeon />
          </span>
        </span>
      </Link>

      <span className="hidden xs:block h-8 w-px bg-white/10" aria-hidden="true" />

      {/* Na mobilu každý údaj na vlastním řádku: dlouhý verzálkový řádek se po
          výměně písma Inter za náhradní zalamoval jinak a stránka poskočila
          (CLS 0,1 při šířce 390 px). Krátké řádky se zalomí vždycky stejně. */}
      <p className="flex flex-col gap-1 font-inter font-medium text-[12px] uppercase tracking-[0.15em] text-text-secondary sm:flex-row sm:flex-wrap sm:gap-0">
        <time dateTime={date} className="whitespace-nowrap">Vydáno {formatDate(date)}</time>
        {updated && updated !== date && (
          <span className="whitespace-nowrap">
            <span className="mx-1.5 hidden text-white/20 sm:inline">·</span>
            <time dateTime={updated}>Aktualizováno {formatDate(updated)}</time>
          </span>
        )}
        <span className="whitespace-nowrap">
          <span className="mx-1.5 hidden text-white/20 sm:inline">·</span>
          {readingMinutes} min čtení
        </span>
      </p>
    </div>
  );
}
