import AltenoLogo, { ALTENO_BELOW_BASELINE } from "@/components/brand/AltenoLogo";
import VizeonLogo, { VIZEON_CAP_HEIGHT_EM } from "@/components/brand/VizeonLogo";
import { cn } from "@/lib/utils";

// Názvy značek v běžném textu (věta, nadpis, štítek). Pravidlo z CLAUDE.md:
// VIZEON i ALTENO se ve viditelném textu vždy sází ve stylu svého loga,
// nikdy jako obyčejné slovo. Velikost se dědí z okolního `font-size`
// a verzálky značky se srovnají s verzálkami okolního písma.
//
// `font` říká, jakým písmem je okolní text: Inter (běžný text, default)
// má verzálky 0,727 em, Cormorant (nadpisy) 0,625 em.

const CAP_EM = { inter: 0.727, cormorant: VIZEON_CAP_HEIGHT_EM } as const;

type Props = {
  font?: keyof typeof CAP_EM;
  className?: string;
};

export function Vizeon({ font = "inter", className }: Props) {
  return (
    <span
      className={cn("whitespace-nowrap", className)}
      style={{ fontSize: `${CAP_EM[font] / VIZEON_CAP_HEIGHT_EM}em` }}
    >
      <VizeonLogo />
    </span>
  );
}

export function Alteno({ font = "inter", className }: Props) {
  // Stejný výpočet jako v BrandLockup: SVG tak vysoké, aby verzálky ALTENO
  // měřily jako verzálky okolního textu, a posunuté pod účaří o patu loga.
  const height = CAP_EM[font] / (104.54 / 126);
  return (
    <span className={cn("whitespace-nowrap", className)}>
      <AltenoLogo
        className="inline-block w-auto"
        style={{
          height: `${height}em`,
          position: "relative",
          top: `${height * ALTENO_BELOW_BASELINE}em`,
        }}
      />
      <span className="sr-only">ALTENO</span>
    </span>
  );
}

/**
 * Pro texty uložené jako string (data, props): rozseká text a každý výskyt
 * VIZEON / ALTENO (bez ohledu na velikost písmen) nahradí komponentou výše.
 * URL a e-mailové adresy (vizeon.cz, www.alteno.cz/cenik, info@vizeon.cz)
 * nechává jako text: výskyt, za kterým následuje „.tld“, se nenahrazuje.
 * Metadata, JSON-LD, aria-label a alt dostávají string dál beze změny.
 */
export function brandText(text: string, font: Props["font"] = "inter") {
  return text.split(/\b(vizeon|alteno)\b(?!\.[a-z])/i).map((part, i) => {
    if (i % 2 === 0) return part;
    return part.toUpperCase() === "VIZEON" ? (
      <Vizeon key={i} font={font} />
    ) : (
      <Alteno key={i} font={font} />
    );
  });
}
