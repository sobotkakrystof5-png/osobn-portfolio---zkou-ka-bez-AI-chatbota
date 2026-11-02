import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { projects, projectGroups, projectScreens } from "@/lib/data/portfolio";
import { testimonials } from "@/lib/data/testimonials";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { brandText } from "@/components/brand/BrandName";
import { ProjectStage } from "@/components/portfolio/ProjectStage";
import { ScrollScreen } from "@/components/portfolio/ScrollScreen";
import { IPhone } from "@/components/portfolio/Devices";

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

const sectionLabel = "font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4";
const sectionTitle = "font-cormorant font-light text-[32px] md:text-[44px] leading-[1.08] text-[#f0ece6]";

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const screens = projectScreens(project);
  const quote = testimonials.find((q) => q.url === project.url);
  const prev = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const host = new URL(project.url).host.replace(/^www\./, "");

  const facts = [
    { label: "Obor", value: project.category },
    { label: "Typ", value: project.kind },
    { label: "Technologie", value: project.stack.join(", ") },
    { label: "Kategorie", value: projectGroups.find((g) => g.id === project.group)?.label },
  ];

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

      <article className="pb-20 md:pb-28">
        {/* Úvod: název vlevo, fakta a odkaz na web vpravo */}
        <div className={cn(t.container.wide, "pt-14 md:pt-20")}>
          <Link href="/ukazky-webu" className={t.backLink}>← Všechny projekty</Link>

          <header className="mt-10 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
            <div className="lg:col-span-7">
              <p className={t.eyebrow}>— {project.kind}</p>
              <h1 className="mt-4 mb-5 font-cormorant font-light text-[44px] md:text-[72px] leading-[1.02] text-[#f0ece6]">
                {brandText(project.title, "cormorant")}
              </h1>
              <p className="max-w-xl font-inter font-normal text-[17px] md:text-[19px] leading-[1.65] text-text-secondary">
                {project.tagline}
              </p>
            </div>

            <div className="lg:col-span-5">
              <dl className="grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07]">
                {facts.map((f) => (
                  <div key={f.label} className="bg-[#080808] p-4 md:p-5">
                    <dt className="mb-1.5 font-inter font-medium text-[10px] uppercase tracking-[0.16em] text-text-muted">{f.label}</dt>
                    <dd className="font-inter text-[14px] leading-[1.45] text-[#f0ece6]">{f.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#c9a84c] px-6 py-3.5 font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]"
                >
                  Navštívit web <ArrowUpRight size={14} aria-hidden="true" />
                </a>
                <span className="font-inter text-[13px] text-text-muted">{host}</span>
              </div>
            </div>
          </header>
        </div>

        {/* MacBook, ve kterém jde projet celý web, a iPhone */}
        <div className={cn(t.container.wide, "mt-12 md:mt-16")}>
          <ProjectStage
            project={project}
            screens={screens}
            variant="hero"
            priority
            desktopScreen={
              screens.full && (
                <ScrollScreen
                  fold={screens.desktop}
                  full={screens.full}
                  alt={project.alt}
                  sizes="(min-width: 1280px) 900px, 85vw"
                />
              )
            }
          />
          {screens.full && (
            <p className="mt-4 font-inter text-[12px] text-text-muted">
              Najeďte myší na obrazovku (v mobilu na ni klepněte) a web se sám projede až dolů.
            </p>
          )}
        </div>

        {/* O projektu a co jsme vytvořili */}
        <section className={cn(t.container.wide, "mt-24 md:mt-32 grid gap-12 lg:grid-cols-12 lg:gap-14")}>
          <div className="lg:col-span-5">
            <p className={sectionLabel}>— O projektu</p>
            <h2 className={cn(sectionTitle, "mb-6")}>Zadání a cíl</h2>
            <p className="font-inter text-[16px] leading-[1.8] text-text-secondary">{project.description}</p>
          </div>
          <div className="lg:col-span-7">
            <p className={sectionLabel}>— Co jsme vytvořili</p>
            <ul className="grid gap-px border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2">
              {project.highlights.map((h, i) => (
                <li key={h} className="flex flex-col gap-5 bg-[#080808] p-6 md:p-7">
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#c9a84c]/40 text-[#c9a84c]">
                      <Check size={16} aria-hidden="true" />
                    </span>
                    <span className="font-inter text-[11px] tracking-[0.14em] text-white/25">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <p className="font-inter text-[15px] leading-[1.6] text-[#e6e0d6]">{h}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Mobilní verze ve třech telefonech */}
        {screens.mobile.length > 1 && (
          <section className={cn(t.container.wide, "mt-24 md:mt-32")}>
            <div className="mb-12 md:mb-16 text-center">
              <p className={sectionLabel}>— Mobilní verze</p>
              <h2 className={sectionTitle}>Stejně dobře i v telefonu.</h2>
            </div>
            <div className="relative overflow-hidden border border-white/[0.07] bg-[#0c0c0c] pt-14 pb-12 md:px-12 md:pt-24 md:pb-16">
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse 55% 60% at 50% 55%, ${project.accent}40 0%, transparent 72%)` }}
                aria-hidden="true"
              />
              <div className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto px-[20vw] pb-2 md:mx-auto md:max-w-4xl md:justify-center md:gap-10 md:overflow-visible md:px-0">
                {screens.mobile.map((src, i) => (
                  <IPhone
                    key={src}
                    src={src}
                    alt={`${project.title}: mobilní verze, obrazovka ${i + 1}`}
                    sizes="(min-width: 768px) 260px, 60vw"
                    className={cn("w-[60vw] max-w-[270px] shrink-0 snap-center md:w-1/3", i === 1 && "md:-translate-y-10")}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Reference klienta */}
        {quote && (
          <section className={cn(t.container.page, "mt-24 md:mt-32 text-center")}>
            <p className={sectionLabel}>— Slovo klienta</p>
            <blockquote className="font-cormorant font-light italic text-[24px] md:text-[32px] leading-[1.4] text-[#f0ece6]">
              <span className="text-[#c9a84c]">„</span>
              {brandText(quote.quote, "cormorant")}
              <span className="text-[#c9a84c]">“</span>
            </blockquote>
            <p className="mt-6 font-inter text-[12px] uppercase tracking-[0.14em] text-text-muted">
              {quote.name} <span className="mx-2 text-white/20">/</span> {quote.urlLabel}
            </p>
          </section>
        )}

        {project.internalLink && (
          <div className={cn(t.container.page, "mt-20 md:mt-24")}>
            <Link
              href={project.internalLink.href}
              className="group flex items-center justify-between gap-6 border border-[#c9a84c]/25 p-6 md:p-7 transition-colors duration-300 hover:border-[#c9a84c]/60"
            >
              <span className="font-cormorant font-light text-[22px] md:text-[26px] text-[#f0ece6]">{project.internalLink.text}</span>
              <ArrowRight size={18} className="shrink-0 text-[#c9a84c] transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        )}

        {/* Předchozí a další projekt */}
        <nav
          aria-label="Další projekty"
          className={cn(t.container.wide, "mt-24 md:mt-32")}
        >
          <div className="grid gap-px border border-white/[0.07] bg-white/[0.07] md:grid-cols-2">
            {[
              { p: prev, label: "Předchozí projekt", next: false },
              { p: next, label: "Další projekt", next: true },
            ].map(({ p, label, next: isNext }) => (
              <Link
                key={label}
                href={`/ukazky-webu/${p.slug}`}
                className={cn(
                  "group flex flex-col gap-3 bg-[#080808] p-7 md:p-10 transition-colors duration-300 hover:bg-[#0f0f0f]",
                  isNext && "md:items-end md:text-right",
                )}
              >
                <span className={cn("flex items-center gap-2 font-inter font-medium text-[11px] uppercase tracking-[0.16em] text-[#c9a84c]", isNext && "flex-row-reverse")}>
                  {isNext ? <ArrowRight size={14} aria-hidden="true" /> : <ArrowLeft size={14} aria-hidden="true" />}
                  {label}
                </span>
                <span className="font-cormorant font-light text-[30px] md:text-[40px] leading-[1.05] text-[#f0ece6] transition-colors duration-300 group-hover:text-[#c9a84c]">
                  {brandText(p.title, "cormorant")}
                </span>
                <span className="font-inter text-[13px] text-text-muted">{p.kind} / {p.category}</span>
              </Link>
            ))}
          </div>
        </nav>

        <div className={t.container.page}>
          <ClosingCTA
            heading="Líbí se vám tenhle styl?"
            subheading="Nezávazná konzultace zdarma. Probereme váš byznys a doporučíme, co dává smysl."
          />
        </div>
      </article>
    </PageShell>
  );
}
