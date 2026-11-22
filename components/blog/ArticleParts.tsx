import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Alteno, Vizeon, brandText } from "@/components/brand/BrandName";
import type { BlogPost, FaqItem } from "@/lib/blog";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Pevné části článku kolem těla z MDX. Pořadí v článku: stručná odpověď
// (citovatelná pasáž pro AI) → V kostce → tělo → časté otázky → autor →
// výzva → další články. Struktura je popsaná v .claude/skills/blog-clanek.

export function AnswerBox({ answer }: { answer: string }) {
  return (
    <aside aria-label="Stručná odpověď" className="glass-panel mb-10 p-5 md:p-7">
      <p className={cn(t.eyebrow, "mb-3")}>Stručná odpověď</p>
      <p className="font-inter text-[16px] leading-[1.75] text-[#f0ece6] md:text-[17px]">
        {brandText(answer)}
      </p>
    </aside>
  );
}

export function Takeaways({ items }: { items: string[] }) {
  return (
    <section aria-labelledby="v-kostce" className="mb-12">
      <h2 id="v-kostce" className={t.articleH2}>
        V kostce
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex gap-3">
            <Check size={17} className="mt-[7px] shrink-0 text-[#c9a84c]" aria-hidden="true" />
            <span className={t.body}>{brandText(item)}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ArticleFaq({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby="caste-otazky" className="mt-14">
      <h2 id="caste-otazky" className={t.articleH2}>
        Časté otázky
      </h2>
      <div className="mt-6 divide-y divide-white/[0.06] border-y border-white/[0.06]">
        {items.map((f) => (
          <div key={f.q} className="py-5">
            <h3 className={t.h3}>{brandText(f.q)}</h3>
            <p className={cn(t.body, "mt-2")}>{brandText(f.a)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Autor článku (E-E-A-T). Fakta jsou ze stránky /o-mne, nic navíc. */
export function AuthorNote() {
  return (
    <aside aria-label="Autor článku" className="glass-panel mt-14 flex items-start gap-4 p-5 md:p-6">
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#c9a84c]/40 font-cormorant text-[18px] font-light text-[#c9a84c]"
        aria-hidden="true"
      >
        K
      </span>
      <div>
        <p className="font-inter text-[14px] font-medium text-[#f0ece6]">
          Kryštof, zakladatel <Vizeon /> a <Alteno />
        </p>
        <p className="mt-1.5 font-inter text-[14px] leading-[1.7] text-text-secondary">
          Programuje od 14 let a od května 2026 dokončil přes 15 projektů.{" "}
          <Link href="/o-mne" className={t.link}>
            Víc o mně
          </Link>
        </p>
      </div>
    </aside>
  );
}

export function RelatedPosts({
  posts,
  heading = "Další články",
  id = "dalsi-clanky",
  className,
}: {
  posts: BlogPost[];
  heading?: string;
  id?: string;
  className?: string;
}) {
  if (posts.length === 0) return null;
  return (
    <section aria-labelledby={id} className={cn("mt-16", className)}>
      <h2 id={id} className={t.articleH2}>
        {heading}
      </h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/blog/${p.slug}`}
            className="group glass-panel glass-panel-hover flex flex-col p-5"
          >
            <span className="font-inter text-[10px] font-medium uppercase tracking-[0.15em] text-[#c9a84c]">
              {p.category}
            </span>
            <span className="mt-3 flex-1 font-cormorant text-[20px] font-light leading-snug text-[#f0ece6]">
              {brandText(p.title, "cormorant")}
            </span>
            <span className="mt-4 inline-flex items-center gap-1.5 font-inter text-[11px] font-medium uppercase tracking-[0.1em] text-text-secondary transition-colors duration-300 group-hover:text-[#c9a84c]">
              {p.readingMinutes} min čtení <ArrowUpRight size={12} aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
