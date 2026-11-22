import { getPostBySlug, getSortedPosts } from "@/lib/blog";
import { postToMarkdown } from "@/lib/blog-markdown";

// Markdown verze článku pro AI agenty a modely. Veřejná adresa je
// /blog/<slug>.md (přepis v next.config.mjs), stránka ji ohlašuje přes
// <link rel="alternate" type="text/markdown">. Do indexu nepatří, kanonická
// je HTML verze.

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getSortedPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return new Response("Článek nenalezen", { status: 404 });

  return new Response(postToMarkdown(post), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "X-Robots-Tag": "noindex",
      Link: `<https://vizeon.cz/blog/${post.slug}>; rel="canonical"`,
    },
  });
}
