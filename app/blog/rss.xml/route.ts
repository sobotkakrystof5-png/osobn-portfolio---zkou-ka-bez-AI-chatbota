import { getSortedPosts } from "@/lib/blog";

// RSS blogu: /blog/rss.xml. Google ho bere jako sitemapu (zadat v Search
// Console vedle sitemap.xml), čtečky a AI nástroje z něj poznají nové články.
// lastBuildDate = datum nejnovějšího článku, ne new Date(), aby se feed
// neměnil při každém buildu.

export const dynamic = "force-static";

const BASE = "https://vizeon.cz";

function esc(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function rfc822(isoDate: string) {
  return new Date(`${isoDate}T12:00:00Z`).toUTCString();
}

export function GET() {
  const posts = getSortedPosts();

  const items = posts
    .map((p) => {
      const url = `${BASE}/blog/${p.slug}`;
      return [
        "    <item>",
        `      <title>${esc(p.title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${rfc822(p.date)}</pubDate>`,
        `      <category>${esc(p.category)}</category>`,
        `      <description>${esc(p.excerpt)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Blog | VIZEON</title>
    <link>${BASE}/blog</link>
    <atom:link href="${BASE}/blog/rss.xml" rel="self" type="application/rss+xml" />
    <description>Články o tvorbě webů, cenách, SEO a automatizaci pro firmy a živnostníky.</description>
    <language>cs</language>
${posts[0] ? `    <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>\n` : ""}${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
