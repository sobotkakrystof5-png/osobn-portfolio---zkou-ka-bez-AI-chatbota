import type { BlogPost } from "@/lib/blog";
import { PRICING_CATEGORIES } from "@/lib/data/pricing";

// Čistý Markdown článku pro AI agenty a modely: /blog/<slug>.md a /llms-full.txt.
// Komponenty z MDX se nahradí textem, relativní odkazy absolutními.

const BASE = "https://vizeon.cz";

function pricingMarkdown(): string {
  const web = PRICING_CATEGORIES.find((c) => c.category === "Weby")?.items ?? [];
  return web.map((i) => `- ${i.name}${i.subtitle ? ` (${i.subtitle})` : ""}: ${i.price}`).join("\n");
}

export function postToMarkdown(post: BlogPost): string {
  const url = `${BASE}/blog/${post.slug}`;
  const body = post.body
    .replace(/<PricingHighlight\s*\/>/g, pricingMarkdown())
    .replace(/<(Vizeon|Alteno)[^>]*\/>/g, (_, n: string) => n.toUpperCase())
    .replace(/\]\((\/[^)]*)\)/g, `](${BASE}$1)`);

  const meta = [
    "Autor: Kryštof, zakladatel VIZEON",
    `Vydáno: ${post.date}`,
    post.updated && `Aktualizováno: ${post.updated}`,
    `Kategorie: ${post.category}`,
  ]
    .filter(Boolean)
    .join(" · ");

  return [
    `# ${post.title}`,
    `> ${post.excerpt}`,
    meta,
    post.answer && `**Stručná odpověď:** ${post.answer}`,
    post.takeaways.length > 0 && ["## V kostce", ...post.takeaways.map((t) => `- ${t}`)].join("\n"),
    body,
    post.faq.length > 0 &&
      ["## Časté otázky", ...post.faq.map((f) => `### ${f.q}\n\n${f.a}`)].join("\n\n"),
    `Zdroj: ${url}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}
