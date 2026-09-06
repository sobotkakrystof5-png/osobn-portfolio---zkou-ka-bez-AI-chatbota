import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { projects, badgeStyles } from "@/lib/data/portfolio";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — ukázka webu`,
    description: project.description,
    alternates: { canonical: `https://vizeon.cz/ukazky-webu/${project.slug}` },
    openGraph: {
      title: `${project.title} — ukázka webu | VIZEON`,
      description: project.description,
      url: `https://vizeon.cz/ukazky-webu/${project.slug}`,
      type: "website",
      images: [{ url: project.image }],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
          { "@type": "ListItem", position: 2, name: "Projekty", item: "https://vizeon.cz/ukazky-webu" },
          { "@type": "ListItem", position: 3, name: project.title, item: `https://vizeon.cz/ukazky-webu/${project.slug}` },
        ],
      },
      {
        "@type": "CreativeWork",
        name: project.title,
        description: project.description,
        url: `https://vizeon.cz/ukazky-webu/${project.slug}`,
        image: `https://vizeon.cz${project.image}`,
        creator: { "@type": "Organization", name: "VIZEON", url: "https://vizeon.cz" },
      },
    ],
  };

  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page={`/ukazky-webu/${project.slug}`} />

      <div className={cn(t.container.page, "pt-16 md:pt-24")}>
        <Link href="/ukazky-webu" className={t.backLink}>← Zpět na projekty</Link>
      </div>

      <article className="pb-20 md:pb-28">
        <div className={cn(t.container.page, "pt-8 md:pt-10")}>
          <p className={t.eyebrow}>— {project.category}</p>
          <h1 className={cn(t.h1, "mt-4 mb-8 max-w-3xl")}>{project.title}</h1>
        </div>

        <div className="relative w-full max-w-6xl mx-auto mb-12 md:mb-16 aspect-[16/10] md:aspect-[21/9] overflow-hidden border border-white/[0.08]">
          <Image
            src={project.image}
            alt={project.alt}
            fill
            className="object-cover object-center"
            sizes="(min-width: 1280px) 1152px, 100vw"
            priority
          />
        </div>

        <div className={cn(t.container.page, "grid md:grid-cols-3 gap-12 md:gap-16")}>
          <div className="md:col-span-2">
            <p className={t.lead}>{project.description}</p>

            <h2 className="font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#f0ece6] mt-10 mb-5">
              Co bylo vytvořeno
            </h2>
            <ul className="space-y-3.5">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-3">
                  <Check size={15} className="text-[#c9a84c] mt-[3px] shrink-0" aria-hidden="true" />
                  <span className={t.body}>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="md:col-span-1">
            <div className="border border-white/10 p-6 md:p-7">
              <p className="font-inter font-normal text-[11px] uppercase tracking-[0.15em] text-[#c9a84c] mb-3">
                Technologie
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.stack.map((s) => (
                  <span key={s} className="font-inter font-light text-[12px] text-[#c8c0b4] border border-white/10 px-3 py-1">
                    {s}
                  </span>
                ))}
              </div>

              <p className="font-inter font-light text-[12px] text-[#8a8070] mb-6">
                {badgeStyles[project.badgeType].label}
              </p>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-6 py-4 hover:bg-[#d4b968] transition-all duration-300"
              >
                Navštívit web <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>

            {project.internalLink && (
              <Link
                href={project.internalLink.href}
                className="block mt-6 border border-[#c9a84c]/20 p-5 hover:border-[#c9a84c]/40 transition-colors duration-300"
              >
                <p className="font-inter font-light text-[13px] text-[#8a8070] mb-1.5">
                  {project.internalLink.text}
                </p>
                <span className="font-inter font-medium text-[11px] uppercase tracking-[0.08em] text-[#c9a84c]">
                  Zjistit více →
                </span>
              </Link>
            )}
          </aside>
        </div>

        <div className={t.container.page}>
          <ClosingCTA
            heading="Líbí se vám tenhle styl?"
            subheading="Nezávazná konzultace zdarma. Probereme váš byznys a doporučím, co dává smysl."
          />
        </div>
      </article>
    </PageShell>
  );
}
