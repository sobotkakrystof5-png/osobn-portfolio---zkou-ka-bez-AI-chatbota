import { getAllSlugs, getPostBySlug } from "@/lib/blog";
import { postToMarkdown } from "@/lib/blog-markdown";

// Markdown verze článku pro AI agenty a modely. Veřejná adresa je
// /blog/<slug>.md (přepis v next.config.mjs), stránka ji ohlašuje přes
// <link rel="alternate" type="text/markdown">. Do indexu nepatří, kanonická
// je HTML verze.

export const dynamic = "force-static";
export const dynamicParams = false;
// Obnova každých 5 minut: naplánovaný článek se ukáže nejpozději pár minut po
// svém publishAt, i když GitHub cron (blog-publish.yml) nasazení zpozdí.
export const revalidate = 300;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
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
