import { REMESLA } from "./remesla";
import { SLUZBY } from "./sluzby";
import type { IndustryPage } from "./types";

export type { IndustryPage, IndustryScene, SceneVariant } from "./types";

export const INDUSTRY_PAGES: IndustryPage[] = [...REMESLA, ...SLUZBY];

export function getIndustryPage(slug: string): IndustryPage {
  const page = INDUSTRY_PAGES.find((p) => p.slug === slug);
  if (!page) throw new Error(`Oborová stránka ${slug} chybí v lib/data/industry-pages.`);
  return page;
}
