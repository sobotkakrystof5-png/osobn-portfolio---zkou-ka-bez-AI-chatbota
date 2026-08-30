import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getSortedPosts } from "@/lib/data/blog";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Blog — tvorba webů, SEO a online prezentace",
    description:
      "Články o tvorbě webů na míru, SEO optimalizaci a online prezentaci pro živnostníky a malé firmy v ČR.",
    alternates: { canonical: "https://vizeon.cz/blog" },
    openGraph: {
      title: "Blog — tvorba webů, SEO a online prezentace | VIZEON",
      description:
        "Články o tvorbě webů na míru, SEO optimalizaci a online prezentaci pro živnostníky a malé firmy.",
      url: "https://vizeon.cz/blog",
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
        { "@type": "ListItem", position: 2, name: "Blog", item: "https://vizeon.cz/blog" },
      ],
    },
  ],
};

export default function BlogPage() {
  const posts = getSortedPosts();

  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/blog" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader eyebrow="Blog" h1="Blog" />

        {posts.length === 0 ? (
          <p className={t.body}>Tato sekce se připravuje.</p>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block border border-white/[0.06] p-6 hover:border-[rgba(201,168,76,0.4)] transition-colors duration-300"
              >
                <p className="font-inter font-medium text-[11px] uppercase tracking-[0.15em] text-[#c9a84c] mb-3">
                  {post.category} · {new Date(post.date).toLocaleDateString("cs-CZ")} · {post.readingMinutes} min čtení
                </p>
                <h2 className={cn(t.h2Page, "mb-2 text-[22px] md:text-[28px]")}>{post.title}</h2>
                <p className={cn(t.body, "mb-3")}>{post.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 font-inter font-medium text-[12px] tracking-[0.08em] uppercase text-[#8a8070] group-hover:text-[#c9a84c] transition-colors duration-300">
                  Číst článek <ArrowUpRight size={13} aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        )}

        <div className="mt-14">
          <Link href="/" className={t.backLink}>
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
