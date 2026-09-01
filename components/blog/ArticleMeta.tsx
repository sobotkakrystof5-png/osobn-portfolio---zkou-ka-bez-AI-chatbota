import Link from "next/link";
import { cn } from "@/lib/utils";

// Byline pod nadpisem článku: VIZEON značka (odkaz na hlavní stránku) + datum
// vydání + doba čtení. Vydavatel je vždy VIZEON — jednotné pro každý článek.

export function ArticleMeta({
  date,
  readingMinutes,
  className,
}: {
  date: string;
  readingMinutes: number;
  className?: string;
}) {
  const formatted = new Date(date).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-5 gap-y-3 py-5 border-y border-white/[0.06] mb-14",
        className
      )}
    >
      <Link
        href="/"
        className="group flex items-center gap-3"
        aria-label="VIZEON — přejít na hlavní stránku"
      >
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c9a84c]/40 font-cormorant font-light text-[17px] text-[#c9a84c] transition-colors duration-300 group-hover:bg-[#c9a84c] group-hover:text-[#080808]">
          V
        </span>
        <span className="flex flex-col leading-none">
          <span className="font-cormorant font-light text-[16px] tracking-[0.04em] text-[#f0ece6] group-hover:text-[#c9a84c] transition-colors duration-300">
            VIZEON
          </span>
          <span className="font-inter font-light text-[9px] uppercase tracking-[0.22em] text-[#8a8070]">
            Vydavatel
          </span>
        </span>
      </Link>

      <span className="hidden xs:block h-8 w-px bg-white/10" aria-hidden="true" />

      <p className="font-inter font-medium text-[11px] uppercase tracking-[0.15em] text-[#8a8070]">
        Vydáno {formatted} <span className="mx-1.5 text-white/20">·</span> {readingMinutes} min čtení
      </p>
    </div>
  );
}
