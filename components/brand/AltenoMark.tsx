import { cn } from "@/lib/utils";

// TODO(ALTENO-LOGO): Dočasný textový wordmark. Repo ALTENO nebylo při psaní
// dostupné, takže tady není originální SVG z hlavičky alteno.cz (lomítko +
// wordmark). Až bude zdrojové SVG po ruce, nahraď jen vnitřek téhle
// komponenty — použití na webu (velikosti, aria-label) zůstane beze změny.

const SIZES = {
  sm: { wordmark: "text-[13px] tracking-[0.22em]", slash: "text-[15px]" },
  md: { wordmark: "text-[16px] tracking-[0.24em]", slash: "text-[19px]" },
  lg: { wordmark: "text-[22px] md:text-[26px] tracking-[0.24em]", slash: "text-[26px] md:text-[30px]" },
} as const;

export function AltenoMark({
  size = "md",
  className,
  tone = "accent",
}: {
  size?: keyof typeof SIZES;
  className?: string;
  /** "accent" = zlatý wordmark, "light" = světlý text se zlatým lomítkem. */
  tone?: "accent" | "light";
}) {
  const s = SIZES[size];

  return (
    <span
      role="img"
      aria-label="ALTENO"
      className={cn("inline-flex items-baseline gap-[0.35em] leading-none", className)}
    >
      <span className={cn("font-cormorant font-light text-[#c9a84c]", s.slash)} aria-hidden="true">
        /
      </span>
      <span
        className={cn(
          "font-inter font-medium uppercase",
          s.wordmark,
          tone === "accent" ? "text-[#c9a84c]" : "text-[#f0ece6]",
        )}
        aria-hidden="true"
      >
        ALTENO
      </span>
    </span>
  );
}

/** Lockup „VIZEON × ALTENO" — používá se v pruhu na homepage a na /automatizace. */
export function BrandLockup({
  size = "md",
  className,
  altenoHref,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  /** Když je zadaný, je logo ALTENO klikací (externí odkaz). */
  altenoHref?: string;
}) {
  const s = SIZES[size];

  return (
    <span className={cn("inline-flex items-baseline gap-[0.6em] leading-none", className)}>
      <span
        className={cn("font-cormorant font-light uppercase text-[#f0ece6]", s.wordmark)}
        role="img"
        aria-label="VIZEON"
      >
        <span aria-hidden="true">VIZEON</span>
      </span>
      <span className="font-inter font-light text-[#8a8070] text-[0.7em]" aria-hidden="true">
        ×
      </span>
      {altenoHref ? (
        <a
          href={altenoHref}
          target="_blank"
          rel="noopener"
          className="transition-opacity duration-300 hover:opacity-70"
        >
          <AltenoMark size={size} />
        </a>
      ) : (
        <AltenoMark size={size} />
      )}
    </span>
  );
}
