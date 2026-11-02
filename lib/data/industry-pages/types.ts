import type { LucideIcon } from "lucide-react";

// Obsah oborových stránek (app/web-pro-*). Každý obor je jeden záznam,
// stránku z něj skládá components/industry/IndustryLanding.tsx. Texty jsou
// v „my“ a záměrně krátké (jedna věta na položku), delší obsah nesou FAQ.

/** Co ukázkový web v telefonu v hero umí. Podle hlavní konverze oboru. */
export type SceneVariant = "call" | "booking" | "gallery" | "beforeAfter" | "form";

export type IndustryScene = {
  variant: SceneVariant;
  /** Co zákazník píše do vyhledávače, první krok animace. */
  query: string;
  /** Ukázkový název firmy v telefonu. Vymyšlený, v telefonu je štítek „Ukázka“. */
  brand: string;
  /** Řádek pod názvem: obor a lokalita. */
  headline: string;
  /** Tři štítky služeb na ukázkovém webu. */
  chips: string[];
  /** Hlavní tlačítko ukázkového webu. */
  action: string;
  /** booking: volné časy (zvýrazní se ten z `action`). */
  slots?: string[];
  /** form: vyplněná pole poptávky. */
  fields?: { label: string; value: string }[];
  /** gallery: popisky dlaždic galerie (6). */
  tiles?: string[];
  /** gallery a beforeAfter: tóny dlaždic, u před a po [před, po]. */
  tones?: string[];
  /** Oznámení, které na konci přijde majiteli. */
  notify: { title: string; text: string };
};

export type IndustryFeature = { icon: LucideIcon; title: string; text: string };

export type IndustryFaq = { q: string; a: string };

export type IndustryPage = {
  /** Cesta bez lomítka, např. "web-pro-elektrikare". */
  slug: string;
  /** Krátký název do drobečkové navigace, např. "Elektrikáři". */
  name: string;
  /** Pro koho je web, ve 4. pádě: „Web pro elektrikáře“. */
  forWhom: string;
  meta: { title: string; description: string };
  /** schema.org Service.serviceType. */
  serviceType: string;
  /** H1 ve dvou řádcích, druhý zlatě. První nese klíčové slovo. */
  h1: { lead: string; accent: string };
  intro: string;
  scene: IndustryScene;
  /** Nadpis srovnání dnes × s webem. Výchozí „Kde dnes přicházíte o zakázky“. */
  shiftsHeading?: string;
  shifts: { pain: string; fix: string }[];
  features: IndustryFeature[];
  /** Fráze, které zákazníci oboru píšou do vyhledávače. */
  searches: string[];
  /** Doporučená varianta webu a proč. */
  plan: { name: "Promo Page" | "Pro Web"; reason: string };
  /** Projekt z portfolia: z oboru („same“), nebo z příbuzného („related“). */
  project: { slug: string; fit: "same" | "related" };
  faqs: IndustryFaq[];
  related: string[];
  /** Navazující služby a články, interní prolinkování. */
  links?: { label: string; href: string }[];
  /** Rozcestník řemesel (jen /web-pro-remeslniky). */
  crafts?: { name: string; text: string; anchor: string; href: string }[];
};
