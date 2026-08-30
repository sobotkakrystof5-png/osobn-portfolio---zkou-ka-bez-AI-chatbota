import type { ReactNode } from "react";

// Zdroj pravdy pro blog. Nový článek = nový záznam sem (metadata + `content`)
// + vlastní route `app/blog/[slug]/page.tsx` číst nebude — ten čte odsud podle
// slugu, takže stačí přidat objekt do `posts` a přidat řádek do `app/sitemap.ts`.

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** ISO datum "YYYY-MM-DD" */
  date: string;
  category: string;
  readingMinutes: number;
  content: ReactNode;
};

export const posts: BlogPost[] = [];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getSortedPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
