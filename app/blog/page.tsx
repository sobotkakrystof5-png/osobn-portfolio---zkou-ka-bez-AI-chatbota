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
          <div className="grid gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group glass-panel glass-panel-hover flex flex-col p-6 md:p-8"
              >
                <p className="font-inter font-medium text-[11px] uppercase tracking-[0.15em] text-[#c9a84c] mb-4">
                  {post.category}
                </p>
                <h2 className={cn(t.h2Page, "mb-3 text-[22px] md:text-[26px] leading-snug")}>
                  {post.title}
                </h2>
                <p className={cn(t.body, "mb-6 flex-1")}>{post.excerpt}</p>

                <div className="flex items-center justify-between gap-4 pt-5 border-t border-white/[0.06]">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[#c9a84c]/40 font-cormorant font-light text-[12px] text-[#c9a84c]">
                      V
                    </span>
                    <span className="font-inter font-medium text-[10px] uppercase tracking-[0.12em] text-[#8a8070]">
                      VIZEON <span className="mx-1 text-white/20">·</span>
                      {new Date(post.date).toLocaleDateString("cs-CZ")}
                      <span className="mx-1 text-white/20">·</span>
                      {post.readingMinutes} min
                    </span>
                  </div>
                  <span className="inline-flex shrink-0 items-center gap-1.5 font-inter font-medium text-[12px] tracking-[0.08em] uppercase text-[#8a8070] group-hover:text-[#c9a84c] transition-colors duration-300">
                    Číst <ArrowUpRight size={13} aria-hidden="true" />
                  </span>
                </div>
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
