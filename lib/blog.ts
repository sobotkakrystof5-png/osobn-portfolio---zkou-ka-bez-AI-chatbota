import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { InterestId } from "@/lib/lead";

// Zdroj pravdy pro blog: jeden článek = jeden soubor content/blog/<slug>.mdx
// (frontmatter + Markdown). Jak článek psát: .claude/skills/blog-clanek/SKILL.md,
// kontrola: `npm run blog:check`. Soubory začínající "_" (fronta témat) se ignorují.
// Sitemapa, RSS, llms.txt i Markdown verze pro agenty čtou odsud.

export type FaqItem = { q: string; a: string };

export type BlogPost = {
  slug: string;
  /** H1 článku. */
  title: string;
  /** Kratší <title> do výsledků hledání, když je H1 delší než ~50 znaků. */
  seoTitle?: string;
  description: string;
  excerpt: string;
  /** Hlavní klíčové slovo (jedno na článek, nesmí se opakovat). */
  keyword: string;
  secondaryKeywords: string[];
  /** Datum vydání "YYYY-MM-DD". */
  date: string;
  /** Datum poslední věcné úpravy "YYYY-MM-DD". */
  updated?: string;
  /** Okamžik vydání (ISO s posunem, 14:00 Praha). Do té doby je článek v produkci skrytý. */
  publishAt?: string;
  category: string;
  /** Předvybraný zájem ve formuláři po kliknutí na výzvu v článku. */
  interest?: InterestId;
  /** Prodejní stránka, na kterou článek vede (a která článek ukáže u sebe). */
  targetPage?: string;
  /** Přímá odpověď pod nadpisem (40–60 slov), pasáž pro AI Overviews a citace. */
  answer?: string;
  takeaways: string[];
  faq: FaqItem[];
  body: string;
  wordCount: number;
  readingMinutes: number;
};

const DIR = path.join(process.cwd(), "content", "blog");

/**
 * Naplánované články (publishAt v budoucnu) se v produkci neukazují. V náhledu
 * PR na Vercelu a lokálně ano, aby šel článek před vydáním zkontrolovat.
 */
export const SHOW_SCHEDULED = process.env.VERCEL_ENV !== "production";

function str(v: unknown): string | undefined {
  if (v instanceof Date) return v.toISOString();
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
}

function list(v: unknown): string[] {
  return Array.isArray(v) ? v.map(str).filter((s): s is string => Boolean(s)) : [];
}

export function countWords(text: string): number {
  return text
    .replace(/<[^>]+>/g, " ")
    .replace(/\]\([^)]*\)/g, "]")
    .replace(/[#*_>[\]|`]/g, " ")
    .split(/\s+/)
    .filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
}

function parse(file: string): BlogPost {
  const slug = file.replace(/\.mdx$/, "");
  const { data, content } = matter(fs.readFileSync(path.join(DIR, file), "utf8"));
  const faq: FaqItem[] = Array.isArray(data.faq)
    ? data.faq
        .map((f: { q?: unknown; a?: unknown }) => ({ q: str(f?.q) ?? "", a: str(f?.a) ?? "" }))
        .filter((f: FaqItem) => f.q && f.a)
    : [];
  const takeaways = list(data.takeaways);
  const answer = str(data.answer);
  const wordCount =
    countWords(content) +
    countWords([answer ?? "", ...takeaways, ...faq.flatMap((f) => [f.q, f.a])].join(" "));

  return {
    slug,
    title: str(data.title) ?? slug,
    seoTitle: str(data.seoTitle),
    description: str(data.description) ?? "",
    excerpt: str(data.excerpt) ?? "",
    keyword: str(data.keyword) ?? "",
    secondaryKeywords: list(data.secondaryKeywords),
    date: (str(data.date) ?? "").slice(0, 10),
    updated: str(data.updated)?.slice(0, 10),
    publishAt: str(data.publishAt),
    category: str(data.category) ?? "Blog",
    interest: str(data.interest) as InterestId | undefined,
    targetPage: str(data.targetPage),
    answer,
    takeaways,
    faq,
    body: content.trim(),
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 200)),
  };
}

let cache: BlogPost[] | null = null;

function loadAll(): BlogPost[] {
  // V dev se čte pokaždé znovu, ať je úprava článku hned vidět.
  if (cache && process.env.NODE_ENV === "production") return cache;
  cache = fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map(parse);
  return cache;
}

export function isLive(post: BlogPost, now = Date.now()): boolean {
  return !post.publishAt || Date.parse(post.publishAt) <= now;
}

const visible = (post: BlogPost) => SHOW_SCHEDULED || isLive(post);

/** Vydané články od nejnovějšího (v náhledech i naplánované). */
export function getSortedPosts(): BlogPost[] {
  return loadAll()
    .filter(visible)
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.slug.localeCompare(b.slug)));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return loadAll().find((p) => p.slug === slug && visible(p));
}

/**
 * Slugy všech článků včetně naplánovaných. Pro generateStaticParams: stránka
 * naplánovaného článku existuje od buildu (zatím jako 404) a po publishAt ji
 * obnova (revalidate) přepne na článek bez nového nasazení.
 */
export function getAllSlugs(): string[] {
  return loadAll().map((p) => p.slug);
}

/** Článek bez ohledu na datum vydání (OG obrázek se má vygenerovat se správným titulkem předem). */
export function getAnyPostBySlug(slug: string): BlogPost | undefined {
  return loadAll().find((p) => p.slug === slug);
}

/** Články, které vedou na danou stránku (např. "/web-pro-instalatery"). */
export function getPostsForPage(pagePath: string, limit = 3): BlogPost[] {
  return getSortedPosts()
    .filter((p) => p.targetPage === pagePath)
    .slice(0, limit);
}

/** Související články: stejná cílová stránka, pak stejná kategorie, pak nejnovější. */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const score = (p: BlogPost) =>
    (p.targetPage && p.targetPage === post.targetPage ? 2 : 0) + (p.category === post.category ? 1 : 0);
  return getSortedPosts()
    .filter((p) => p.slug !== post.slug)
    .map((p, i) => ({ p, s: score(p), i }))
    .sort((a, b) => b.s - a.s || a.i - b.i)
    .slice(0, limit)
    .map(({ p }) => p);
}
