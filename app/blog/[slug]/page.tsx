import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { AnswerBox, ArticleFaq, AuthorNote, RelatedPosts, Takeaways } from "@/components/blog/ArticleParts";
import { brandText } from "@/components/brand/BrandName";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { getAllSlugs, getPostBySlug, getRelatedPosts, isLive } from "@/lib/blog";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

const BASE = "https://vizeon.cz";

// Stránky všech článků (i naplánovaných) vznikají při buildu. Naplánovaný je
// do publishAt 404 a obnova ho pak přepne na článek.
export const dynamicParams = false;
// Obnova každých 5 minut: naplánovaný článek se ukáže nejpozději pár minut po
// svém publishAt, i když GitHub cron (blog-publish.yml) nasazení zpozdí.
export const revalidate = 300;

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  const url = `${BASE}/blog/${post.slug}`;

  return {
    title: post.seoTitle ?? post.title,
    description: post.description,
    keywords: [post.keyword, ...post.secondaryKeywords],
    alternates: {
      canonical: url,
      types: {
        "application/rss+xml": `${BASE}/blog/rss.xml`,
        "text/markdown": `${url}.md`,
      },
    },
    openGraph: {
      title: `${post.title} | VIZEON`,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.category,
      tags: [post.keyword, ...post.secondaryKeywords],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${BASE}/blog/${post.slug}`;
  const related = getRelatedPosts(post);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domů", item: BASE },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.updated ?? post.date,
        url,
        mainEntityOfPage: url,
        inLanguage: "cs-CZ",
        articleSection: post.category,
        keywords: [post.keyword, ...post.secondaryKeywords].join(", "),
        wordCount: post.wordCount,
        image: `${url}/opengraph-image`,
        ...(post.answer && { abstract: post.answer }),
        author: {
          "@type": "Person",
          name: "Kryštof",
          jobTitle: "Zakladatel VIZEON a ALTENO",
          url: `${BASE}/o-mne`,
          worksFor: { "@id": `${BASE}/#organization` },
        },
        publisher: { "@id": `${BASE}/#organization` },
      },
      ...(post.faq.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: post.faq.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page={`/blog/${post.slug}`} />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        {!isLive(post) && (
          <p className="mb-6 inline-block border border-[#c9a84c]/40 px-3 py-1.5 font-inter text-[11px] uppercase tracking-[0.15em] text-[#c9a84c]">
            Náhled, vyjde {new Date(post.publishAt!).toLocaleString("cs-CZ", { timeZone: "Europe/Prague" })}
          </p>
        )}

        <PageHeader
          eyebrow={post.category}
          h1={brandText(post.title, "cormorant")}
          lead={brandText(post.excerpt)}
        />

        <ArticleMeta
          date={post.date}
          updated={post.updated}
          readingMinutes={post.readingMinutes}
          className="-mt-6"
        />

        {post.answer && <AnswerBox answer={post.answer} />}
        {post.takeaways.length > 0 && <Takeaways items={post.takeaways} />}

        <article className="space-y-6">
          <ArticleBody source={post.body} />
        </article>

        {post.faq.length > 0 && <ArticleFaq items={post.faq} />}

        <AuthorNote />

        <ClosingCTA
          heading="Líbí se vám, jak přemýšlím o webech?"
          subheading="Ozveme se do hodiny, probereme váš byznys a doporučíme, co dává smysl."
          interest={post.interest}
          location="blog_clanek"
        />

        <RelatedPosts posts={related} />

        <div className="mt-14">
          <Link href="/blog" className={t.backLink}>← Zpět na blog</Link>
        </div>
      </div>
    </PageShell>
  );
}
