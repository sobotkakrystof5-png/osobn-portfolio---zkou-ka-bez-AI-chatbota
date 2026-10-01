import Link from "next/link";
import AltenoLogo, { ALTENO_BELOW_BASELINE } from "@/components/brand/AltenoLogo";
import VizeonLogo, { VIZEON_CAP_HEIGHT_EM } from "@/components/brand/VizeonLogo";
import { cn } from "@/lib/utils";

// Lockup „ALTENO × VIZEON": oba plné wordmarky, ALTENO v barvách svého loga,
// VIZEON krémový. Jediná komponenta pro všech pět míst spolubrandingu
// (Hero, AltenoBand, panel Automatizace v liště, Footer, /automatizace).
//
// OPTICKÁ VÝŠKA A ÚČAŘÍ: celý lockup se řídí jedním `font-size` (SIZES).
// VIZEON je text, takže jeho verzálky měří VIZEON_CAP_HEIGHT_EM. ALTENO je
// SVG, jehož verzálky zabírají 104,54/126 výšky, takže SVG dostane výšku,
// při které verzálky obou slov měří stejně. Řádek je `items-baseline`:
// u textu je to skutečné účaří, u SVG spodní hrana. Spodní hranu SVG proto
// posouváme dolů o kus pod účařím loga (`top`, bez vlivu na layout), aby
// paty písmen ALTENO seděly na účaří VIZEONU.

const ALTENO_HEIGHT_EM = VIZEON_CAP_HEIGHT_EM / (104.54 / 126);
const ALTENO_STYLE = {
  height: `${ALTENO_HEIGHT_EM}em`,
  position: "relative",
  top: `${ALTENO_HEIGHT_EM * ALTENO_BELOW_BASELINE}em`,
} as const;

// Velikost písma VIZEONU; SVG ALTENO pak vychází ~14 / 20 / 28 px vysoké.
const SIZES = {
  sm: "text-[18px]",
  md: "text-[26px]",
  // Na mobilu by lg (~450 px) přeteklo 390px displej, proto do md jen md.
  lg: "text-[26px] md:text-[37px]",
} as const;

export function BrandLockup({
  size = "md",
  className,
  altenoHref,
  withClaim = false,
}: {
  size?: keyof typeof SIZES;
  className?: string;
  /** Když je zadaný, logo ALTENO je externí odkaz (vždy přes altenoUrl). */
  altenoHref?: string;
  /** Claim pod VIZEONEM, jen pro `size="lg"`. */
  withClaim?: boolean;
}) {
  const alteno = <AltenoLogo className="w-auto" style={ALTENO_STYLE} />;

  return (
    <span
      role="group"
      aria-label="ALTENO ve spolupráci s VIZEON"
      className={cn("inline-flex items-baseline leading-none", SIZES[size], className)}
    >
      {altenoHref ? (
        <a
          href={altenoHref}
          target="_blank"
          rel="noopener"
          aria-label="ALTENO (otevře alteno.cz)"
          className="flex transition-opacity duration-300 hover:opacity-75"
        >
          {alteno}
        </a>
      ) : (
        <span role="img" aria-label="ALTENO" className="flex">
          {alteno}
        </span>
      )}
      {/* `-top` zvedá „×" z účaří na střed výšky verzálek obou slov. */}
      <span aria-hidden="true" className="relative -top-[0.3em] mx-[0.45em] font-inter font-light text-[0.6em] text-[#8a8070]">
        ×
      </span>
      <Link href="/" aria-label="VIZEON" className="group/vizeon flex">
        <VizeonLogo withClaim={withClaim && size === "lg"} />
      </Link>
    </span>
  );
}
