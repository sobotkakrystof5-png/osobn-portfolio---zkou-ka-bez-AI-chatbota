import Link from "next/link";
import { INDUSTRIES } from "@/lib/data/industries";

// Cross-link blok pro dno oborových stránek — část pillar-cluster prolinkování
// mezi příbuznými web-pro-* stránkami. Lehčí než remeslaTiles grid na
// web-pro-remeslniky, jen textové odkazy, ať tenké stránky nenabobtnají.

export function RelatedIndustries({ slugs }: { slugs: string[] }) {
  const industries = slugs
    .map((slug) => INDUSTRIES.find((i) => i.slug === slug))
    .filter((i): i is NonNullable<typeof i> => Boolean(i));

  if (industries.length === 0) return null;

  return (
    <div className="mb-14">
      <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
        Podobné obory
      </p>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        {industries.map((industry) => (
          <Link
            key={industry.slug}
            href={`/${industry.slug}`}
            className="font-inter font-light text-[13px] text-[#8a8070] hover:text-[#c9a84c] transition-colors duration-300"
          >
            {industry.name} →
          </Link>
        ))}
      </div>
    </div>
  );
}
