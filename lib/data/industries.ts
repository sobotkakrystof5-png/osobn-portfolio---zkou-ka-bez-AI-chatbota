// Jediný zdroj pravdy pro cross-linking mezi oborovými stránkami (web-pro-*).
// Používá ho RelatedIndustries (blok "Podobné obory" na dně každé stránky).

export type Industry = {
  /** Cesta stránky bez lomítka, např. "web-pro-zamecniky". */
  slug: string;
  /** Krátký název pro cross-linky, např. "Zámečníci". */
  name: string;
};

export const INDUSTRIES: Industry[] = [
  { slug: "web-pro-remeslniky", name: "Řemeslníci" },
  { slug: "web-pro-zamecniky", name: "Zámečníci" },
  { slug: "web-pro-kovare", name: "Kováři" },
  { slug: "web-pro-rezbare", name: "Řezbáři" },
  { slug: "web-pro-studnare", name: "Studnaři" },
  { slug: "web-pro-malire", name: "Malíři pokojů" },
  { slug: "web-pro-sanace", name: "Sanační firmy" },
  { slug: "web-pro-truhlare", name: "Truhláři a tesaři" },
  { slug: "web-pro-zahradniky", name: "Zahradníci" },
  { slug: "web-pro-instalatery", name: "Instalatéři" },
  { slug: "web-pro-elektrikare", name: "Elektrikáři" },
  { slug: "web-pro-kadernictvi", name: "Kadeřnictví" },
  { slug: "web-pro-masery-a-wellness", name: "Masérky a wellness" },
  { slug: "web-pro-kosmeticky", name: "Kosmetičky" },
  { slug: "web-pro-fitness-trenery", name: "Fitness trenéři" },
  { slug: "web-pro-ucetni", name: "Účetní" },
  { slug: "web-pro-realitni-maklere", name: "Realitní makléři" },
  { slug: "web-pro-fotografy", name: "Fotografové" },
  { slug: "web-pro-autoservisy", name: "Autoservisy" },
];

export function getIndustryBySlug(slug: string): Industry | undefined {
  return INDUSTRIES.find((i) => i.slug === slug);
}
