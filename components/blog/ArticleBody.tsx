import type { ComponentProps } from "react";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { PricingHighlight } from "@/components/blog/PricingHighlight";
import { Alteno, Vizeon } from "@/components/brand/BrandName";
import { remarkBrand } from "@/lib/remark-brand";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Tělo článku z MDX. Markdown prvky dostanou styly webu, VIZEON a ALTENO
// v textu sází remarkBrand jako logo. V článku smí být jen komponenty
// z `components` níže (hlídá to npm run blog:check). JS výrazy {…}
// next-mdx-remote v6 blokuje.

function A({ href = "", children }: ComponentProps<"a">) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={t.link}>
        {children}
      </Link>
    );
  }
  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={t.link}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
    </a>
  );
}

const components = {
  h2: (p: ComponentProps<"h2">) => <h2 className={t.articleH2} {...p} />,
  h3: (p: ComponentProps<"h3">) => <h3 className={cn(t.h3, "pt-2")} {...p} />,
  p: (p: ComponentProps<"p">) => <p className={t.body} {...p} />,
  a: A,
  ul: (p: ComponentProps<"ul">) => (
    <ul className={cn(t.body, "list-disc space-y-2 pl-6 marker:text-[#c9a84c]")} {...p} />
  ),
  ol: (p: ComponentProps<"ol">) => (
    <ol className={cn(t.body, "list-decimal space-y-2 pl-6 marker:text-[#c9a84c]")} {...p} />
  ),
  li: (p: ComponentProps<"li">) => <li className="pl-1" {...p} />,
  strong: (p: ComponentProps<"strong">) => <strong className="font-medium text-[#f0ece6]" {...p} />,
  blockquote: (p: ComponentProps<"blockquote">) => (
    <blockquote className="border-l-2 border-[#c9a84c]/50 pl-5 [&>p]:text-[#f0ece6]" {...p} />
  ),
  table: (p: ComponentProps<"table">) => (
    <div className="-mx-4 overflow-x-auto px-4">
      <table className="w-full min-w-[520px] border-collapse font-inter text-[14px] md:text-[15px]" {...p} />
    </div>
  ),
  th: (p: ComponentProps<"th">) => (
    <th className="border-b border-white/10 py-3 pr-4 text-left align-bottom font-medium text-[#f0ece6]" {...p} />
  ),
  td: (p: ComponentProps<"td">) => (
    <td className="border-b border-white/[0.06] py-3 pr-4 align-top text-text-secondary" {...p} />
  ),
  Vizeon,
  Alteno,
  PricingHighlight,
};

/** Názvy komponent povolených v článcích (čte i scripts/blog-check.mjs). */
export const ARTICLE_COMPONENTS = ["Vizeon", "Alteno", "PricingHighlight"] as const;

export function ArticleBody({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{ mdxOptions: { remarkPlugins: [remarkGfm, remarkBrand] } }}
    />
  );
}
