import { MetadataRoute } from "next";
import { getSortedPosts } from "@/lib/blog";
import { projects } from "@/lib/data/portfolio";
import { automationPages } from "@/lib/data/automation-pages";
import { INDUSTRIES } from "@/lib/data/industries";

// lastmod = datum poslední obsahové změny stránky (YYYY-MM-DD), ne datum
// buildu. Google ho bere vážně jen tehdy, když sedí, takže ho při každé
// obsahové změně stránky posuň. Při psaní data stačí
// `git log -1 --format=%cs -- <soubory stránky>`.
// changefreq a priority tu záměrně nejsou: Google je ignoruje.

// Obnova každých 5 minut: naplánovaný článek se ukáže nejpozději pár minut po
// svém publishAt, i když GitHub cron (blog-publish.yml) nasazení zpozdí.
export const revalidate = 300;

const BASE = "https://vizeon.cz";

/** Šablona detailu projektu (/ukazky-webu/<slug>) se naposledy měnila tehdy. */
const PORTFOLIO_TEMPLATE_UPDATED = "2026-11-22";
/** Oborové stránky (/web-pro-*) sdílejí šablonu components/industry a data v lib/data/industry-pages. */
const INDUSTRY_PAGES_UPDATED = "2026-11-22";
/** Podstránky automatizace (/automatizace/<slug>) z lib/data/automation-pages.ts. */
const AUTOMATION_PAGES_UPDATED = "2026-11-22";

const STATIC_PAGES: { path: string; updated: string }[] = [
  { path: "", updated: "2026-11-22" },
  { path: "/tvorba-webu-pro-zivnostniky", updated: "2026-11-22" },
  { path: "/cena-tvorby-webu", updated: "2026-11-23" },
  { path: "/sluzby", updated: "2026-11-22" },
  { path: "/spoluprace", updated: "2026-11-22" },
  { path: "/sluzby/tvorba-webovych-stranek", updated: "2026-11-23" },
  { path: "/sluzby/tvorba-e-shopu", updated: "2026-11-22" },
  { path: "/sluzby/tvorba-webu-pro-firmy", updated: "2026-11-22" },
  { path: "/sluzby/seo-optimalizace", updated: "2026-11-22" },
  { path: "/sluzby/seo-optimalizace/audit", updated: "2026-11-22" },
  { path: "/sluzby/seo-optimalizace/lokalni-seo", updated: "2026-11-22" },
  { path: "/sluzby/seo-optimalizace/obsahove-seo", updated: "2026-11-22" },
  { path: "/sluzby/seo-optimalizace/technicke-seo", updated: "2026-11-22" },
  { path: "/sluzby/ai-chatbot", updated: "2026-11-22" },
  { path: "/sluzby/systemy-na-miru", updated: "2026-11-23" },
  { path: "/sluzby/graficke-designy", updated: "2026-11-23" },
  { path: "/sluzby/technicke-sluzby", updated: "2026-11-22" },
  { path: "/sluzby/sprava-webu", updated: "2026-11-22" },
  { path: "/automatizace", updated: "2026-11-22" },
  { path: "/kontakt", updated: "2026-11-23" },
  { path: "/zakaziq", updated: "2026-11-22" },
  { path: "/zakaziq/rezervacni-system", updated: "2026-11-22" },
  { path: "/blog", updated: "2026-11-23" },
  { path: "/faq", updated: "2026-11-22" },
  { path: "/ukazky-webu", updated: "2026-11-22" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...STATIC_PAGES.map(({ path, updated }) => ({ url: `${BASE}${path}`, lastModified: updated })),
    ...INDUSTRIES.map((industry) => ({
      url: `${BASE}/${industry.slug}`,
      lastModified: INDUSTRY_PAGES_UPDATED,
    })),
    ...automationPages.map((page) => ({
      url: `${BASE}/automatizace/${page.slug}`,
      lastModified: AUTOMATION_PAGES_UPDATED,
    })),
    ...getSortedPosts().map((post) => ({
      url: `${BASE}/blog/${post.slug}`,
      lastModified: post.updated ?? post.date,
    })),
    ...projects.map((project) => ({
      url: `${BASE}/ukazky-webu/${project.slug}`,
      lastModified: project.updated ?? PORTFOLIO_TEMPLATE_UPDATED,
    })),
  ];
}
