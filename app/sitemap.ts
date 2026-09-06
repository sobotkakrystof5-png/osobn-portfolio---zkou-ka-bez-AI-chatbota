import { MetadataRoute } from "next";
import { getSortedPosts } from "@/lib/data/blog";
import { projects } from "@/lib/data/portfolio";

// lastModified je zadané ručně (ne new Date()), aby se neměnilo při každém
// requestu — při publikaci obsahové změny na dané stránce datum aktualizuj.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vizeon.cz";
  const launchDate = "2026-08-27";

  const blogPosts: MetadataRoute.Sitemap = getSortedPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${base}/ukazky-webu/${p.slug}`,
    lastModified: "2026-09-06",
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [
    {
      url: base,
      lastModified: "2026-07-09",
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${base}/tvorba-webu-pro-zivnostniky`,
      lastModified: "2026-07-09",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/web-pro-remeslniky`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/web-pro-kadernictvi`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/web-pro-ucetni`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/web-pro-masery-a-wellness`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/cena-tvorby-webu`,
      lastModified: launchDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${base}/o-mne`,
      lastModified: "2026-08-28",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/sluzby`,
      lastModified: "2026-08-29",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/spoluprace`,
      lastModified: "2026-08-29",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/sluzby/tvorba-webovych-stranek`,
      lastModified: "2026-08-30",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/sluzby/tvorba-webu-pro-firmy`,
      lastModified: "2026-08-30",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/sluzby/seo-optimalizace`,
      lastModified: "2026-08-30",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/sluzby/seo-optimalizace/audit`,
      lastModified: "2026-08-30",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/sluzby/seo-optimalizace/lokalni-seo`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/sluzby/seo-optimalizace/obsahove-seo`,
      lastModified: "2026-08-30",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/sluzby/seo-optimalizace/technicke-seo`,
      lastModified: "2026-08-30",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/sluzby/ai-chatbot`,
      lastModified: "2026-08-29",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/sluzby/systemy-na-miru`,
      lastModified: "2026-08-29",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/sluzby/graficke-designy`,
      lastModified: "2026-08-29",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/sluzby/technicke-sluzby`,
      lastModified: "2026-08-29",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${base}/kontakt`,
      lastModified: "2026-08-28",
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${base}/zakaziq`,
      lastModified: "2026-08-28",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/zakaziq/rezervacni-system`,
      lastModified: "2026-08-30",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/blog`,
      lastModified: "2026-09-02",
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...blogPosts,
    {
      url: `${base}/faq`,
      lastModified: "2026-08-29",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/ukazky-webu`,
      lastModified: "2026-09-06",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...projectPages,
    {
      url: `${base}/web-pro-zamecniky`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-kovare`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-rezbare`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-studnare`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-malire`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-sanace`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-truhlare`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-zahradniky`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-instalatery`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-elektrikare`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-fotografy`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-kosmeticky`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-fitness-trenery`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-realitni-maklere`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/web-pro-autoservisy`,
      lastModified: "2026-09-02",
      changeFrequency: "monthly",
      priority: 0.6,
    },
    // /gdpr a /podminky mají noindex (viz jejich metadata) — záměrně vynechány
    // ze sitemapy, ať Google nedostává protichůdný signál (noindex + sitemap
    // listing). Stejný vzor jako /admin a /admin-setup.
  ];
}
