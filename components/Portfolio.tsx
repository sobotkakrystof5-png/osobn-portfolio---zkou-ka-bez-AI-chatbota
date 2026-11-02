"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { fadeUp, viewport } from "@/lib/animations";
import { projects, projectGroups, projectScreens, type Project, type ProjectGroup } from "@/lib/data/portfolio";
import { testimonials } from "@/lib/data/testimonials";
import { brandText } from "@/components/brand/BrandName";
import { ProjectStage } from "@/components/portfolio/ProjectStage";
import { CursorStage } from "@/components/portfolio/CursorStage";
import { cn } from "@/lib/utils";

const quoteByUrl = new Map(testimonials.map((t) => [t.url, t]));

type Row = { feature: Project } | { pair: [Project, Project] };

// Rytmus přehledu: velký projekt přes celou šířku, pak dvě dvojice, a znovu.
// Když na konci zbude lichý projekt, dostane také celou šířku.
function toRows(list: Project[]): Row[] {
  const rows: Row[] = [];
  let i = 0;
  while (i < list.length) {
    if (i % 5 !== 0 && i + 1 < list.length) {
      rows.push({ pair: [list[i], list[i + 1]] });
      i += 2;
    } else {
      rows.push({ feature: list[i] });
      i += 1;
    }
  }
  return rows;
}

const num = (i: number) => String(i + 1).padStart(2, "0");

function Meta({ index, project }: { index: number; project: Project }) {
  return (
    <p className="font-inter font-medium text-[11px] uppercase tracking-[0.16em] text-text-muted">
      <span className="text-[#c9a84c]">{num(index)}</span>
      <span className="hidden sm:inline">
        <span className="mx-2.5 text-white/20">/</span>
        {project.kind}
      </span>
      <span className="mx-2.5 text-white/20">/</span>
      {project.category}
    </p>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <p className="font-inter font-normal text-[14px] leading-[1.7] text-text-secondary">
      {tags.map((tag, i) => (
        <Fragment key={tag}>
          {i > 0 && <span className="mx-2.5 text-[#c9a84c]/70" aria-hidden="true">//</span>}
          {tag}
        </Fragment>
      ))}
    </p>
  );
}

// Scéna je jen zvětšená klikací plocha k odkazu v nadpisu, proto je mimo pořadí tabulátoru.
function StageLink({ project, variant }: { project: Project; variant: "card" | "feature" }) {
  return (
    <Link href={`/ukazky-webu/${project.slug}`} tabIndex={-1} aria-hidden="true" className="block">
      <CursorStage label="Detail">
        <ProjectStage project={project} screens={projectScreens(project)} variant={variant} />
      </CursorStage>
    </Link>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const href = `/ukazky-webu/${project.slug}`;
  return (
    <article className="group">
      <StageLink project={project} variant="card" />
      <div className="mt-6 flex items-start justify-between gap-6">
        <div className="min-w-0">
          <Meta index={index} project={project} />
          <h3 className="mt-3 mb-2.5 font-cormorant font-light text-[30px] md:text-[36px] leading-[1.05] text-[#f0ece6]">
            <Link href={href} className="transition-colors duration-300 hover:text-[#c9a84c]">
              {brandText(project.title, "cormorant")}
            </Link>
          </h3>
          <Tags tags={project.tags} />
        </div>
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="mt-1 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 text-[#f0ece6] transition-all duration-500 group-hover:border-[#c9a84c] group-hover:bg-[#c9a84c] group-hover:text-[#080808]"
        >
          <ArrowUpRight size={20} strokeWidth={1.5} className="transition-transform duration-500 group-hover:rotate-45" />
        </Link>
      </div>
    </article>
  );
}

function ProjectFeature({ project, index, flip }: { project: Project; index: number; flip: boolean }) {
  const href = `/ukazky-webu/${project.slug}`;
  const quote = quoteByUrl.get(project.url);
  return (
    <article className="group grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className={cn("lg:col-span-8", flip && "lg:order-2")}>
        <StageLink project={project} variant="feature" />
      </div>
      <div className="lg:col-span-4">
        <Meta index={index} project={project} />
        <h3 className="mt-4 mb-4 font-cormorant font-light text-[38px] md:text-[52px] leading-[1.02] text-[#f0ece6]">
          <Link href={href} className="transition-colors duration-300 hover:text-[#c9a84c]">
            {brandText(project.title, "cormorant")}
          </Link>
        </h3>
        <p className="mb-6 font-inter font-normal text-[16px] leading-[1.7] text-text-secondary">{project.tagline}</p>
        <ul className="mb-8 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="border border-white/10 px-3 py-1.5 font-inter text-[12px] text-[#c8c0b4]">
              {tag}
            </li>
          ))}
        </ul>
        {quote && (
          <figure className="mb-8">
            <blockquote className="font-cormorant font-light italic text-[19px] leading-[1.45] text-[#d8d0c2] line-clamp-3">
              <span className="mr-0.5 text-[#c9a84c]">„</span>
              {brandText(quote.excerpt ?? quote.quote, "cormorant")}
              <span className="text-[#c9a84c]">“</span>
            </blockquote>
            <figcaption className="mt-2.5 font-inter text-[12px] uppercase tracking-[0.12em] text-text-muted">
              {quote.name}
            </figcaption>
          </figure>
        )}
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link
            href={href}
            className="inline-flex items-center gap-2 bg-[#c9a84c] px-6 py-3.5 font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-[#080808] transition-colors duration-300 hover:bg-[#d4b968]"
          >
            Detail projektu <ArrowRight size={14} aria-hidden="true" />
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border-b border-white/20 pb-1 font-inter font-medium text-[12px] uppercase tracking-[0.1em] text-[#f0ece6] transition-colors duration-300 hover:border-[#c9a84c] hover:text-[#c9a84c]"
          >
            Navštívit web <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Portfolio() {
  const [group, setGroup] = useState<ProjectGroup | "vse">("vse");
  const list = group === "vse" ? projects : projects.filter((p) => p.group === group);
  const filters = [
    { id: "vse" as const, label: "Vše", count: projects.length },
    ...projectGroups.map((g) => ({ ...g, count: projects.filter((p) => p.group === g.id).length })),
  ];

  let index = 0;
  let featureCount = 0;

  return (
    <section id="portfolio" className="pt-16 md:pt-24 pb-24 md:pb-32 bg-[#080808]" aria-label="Projekty">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">
          <div className="mb-10 md:mb-12">
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
              — Projekty
            </motion.p>
            <motion.h1 variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="font-cormorant font-light text-[40px] md:text-[64px] leading-[1.05] text-[#f0ece6] mb-5">
              Výsledky mluví za vše.
            </motion.h1>
            <motion.p variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
              className="font-inter font-normal text-[16px] md:text-[18px] text-text-secondary leading-[1.7] max-w-2xl">
              Skutečné weby našich klientů i vlastní produkty. Na počítači i v mobilu, s detailem každého projektu.
            </motion.p>
          </div>

          <div role="group" aria-label="Filtrovat projekty" className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
            <div className="flex w-max gap-px border border-white/[0.07] bg-white/[0.07]">
              {filters.map((f) => {
                const active = f.id === group;
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setGroup(f.id)}
                    className={cn(
                      "flex items-center gap-2.5 whitespace-nowrap px-4 py-3 font-inter font-medium text-[12px] uppercase tracking-[0.1em] transition-colors duration-300",
                      active ? "bg-[#151515] text-[#f0ece6]" : "bg-[#080808] text-text-muted hover:text-[#f0ece6]",
                    )}
                  >
                    {f.label}
                    <span className={cn("text-[11px]", active ? "text-[#c9a84c]" : "text-white/30")}>{f.count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <motion.div
          key={group}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-20 md:gap-28"
        >
          {toRows(list).map((row) => {
            if ("feature" in row) {
              const i = index++;
              const flip = featureCount++ % 2 === 1;
              return (
                <motion.div key={row.feature.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}>
                  <ProjectFeature project={row.feature} index={i} flip={flip} />
                </motion.div>
              );
            }
            const [a, b] = row.pair;
            const ia = index++;
            const ib = index++;
            return (
              <motion.div key={a.slug} variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport}
                className="grid gap-20 md:grid-cols-2 md:gap-8 lg:gap-10">
                <ProjectCard project={a} index={ia} />
                <ProjectCard project={b} index={ib} />
              </motion.div>
            );
          })}
        </motion.div>

        <p className="font-inter font-normal text-[12px] text-[#5c574c] text-center mt-20">
          Portfolio zahrnuje weby skutečných klientů i ukázkové projekty pro demonstraci designového stylu.
        </p>
      </div>
    </section>
  );
}
