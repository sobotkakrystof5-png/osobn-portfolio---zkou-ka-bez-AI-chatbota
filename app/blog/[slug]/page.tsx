import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getPostBySlug, getSortedPosts } from "@/lib/data/blog";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return getSortedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://vizeon.cz/blog/${post.slug}` },
    openGraph: {
      title: `${post.title} | VIZEON`,
      description: post.description,
      url: `https://vizeon.cz/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://vizeon.cz/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: `https://vizeon.cz/blog/${post.slug}` },
        ],
      },
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `https://vizeon.cz/blog/${post.slug}`,
        author: { "@type": "Person", name: "Kryštof Sobotka" },
        publisher: { "@type": "Organization", name: "VIZEON", url: "https://vizeon.cz" },
      },
    ],
  };

  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page={`/blog/${post.slug}`} />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow={post.category}
          h1={post.title}
          lead={post.excerpt}
        />

        <p className="font-inter font-medium text-[11px] uppercase tracking-[0.15em] text-[#8a8070] -mt-10 mb-14">
          {new Date(post.date).toLocaleDateString("cs-CZ")} · {post.readingMinutes} min čtení
        </p>

        <article className="space-y-6">{post.content}</article>

        <ClosingCTA
          heading="Líbí se vám, jak přemýšlím o webech?"
          subheading="Nezávazná konzultace zdarma. Probereme váš byznys a doporučím, co dává smysl."
        />

        <div className="mt-14">
          <Link href="/blog" className={t.backLink}>← Zpět na blog</Link>
        </div>
      </div>
    </PageShell>
  );
}
