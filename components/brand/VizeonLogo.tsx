import { cn } from "@/lib/utils";

// Wordmark VIZEON pro lockup ALTENO × VIZEON. Stejný zápis jako logo v liště
// (Navbar.tsx): Cormorant light, verzálky, široký prostrk, krémová. Velikost
// se dědí z `font-size` rodiče (nebo z `className`), takže BrandLockup
// řídí obě loga jedním číslem.
//
// Bitmapové kulaté logo (alteno public/vizeon-logo.png) se sem záměrně
// nepoužívá: do vodorovného lockupu se nehodí a nese ještě starý claim.

/** Výška verzálek Cormorant Garamond 300 v em (změřeno canvasem v prohlížeči, S7). */
export const VIZEON_CAP_HEIGHT_EM = 0.625;

export default function VizeonLogo({
  className,
  withClaim = false,
}: {
  className?: string;
  /** Tenká zlatá linka a claim pod slovem. Jen pro velkou velikost. */
  withClaim?: boolean;
}) {
  return (
    <span className={cn("inline-flex flex-col items-start leading-none", className)}>
      {/* `-mr-[0.2em]` vrací prostrk za posledním písmenem, aby linka
          pod slovem a mezera ke „×" měřily od „N", ne od prázdna. */}
      <span className="font-cormorant font-light uppercase tracking-[0.2em] -mr-[0.2em] text-[#f0ece6] transition-colors duration-300 group-hover/vizeon:text-[#c9a84c]">
        VIZEON
      </span>
      {withClaim ? (
        <>
          <span aria-hidden="true" className="mt-[0.3em] h-px w-full bg-[#c9a84c]/50" />
          <span className="mt-[0.35em] font-inter font-light text-[9px] uppercase tracking-[0.12em] md:tracking-[0.25em] text-[#8a8070] whitespace-nowrap">
            Vize. Vývoj. Výsledky.
          </span>
        </>
      ) : null}
    </span>
  );
}
