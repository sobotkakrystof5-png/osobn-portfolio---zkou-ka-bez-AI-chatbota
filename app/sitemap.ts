import { MetadataRoute } from "next";

// lastModified je zadané ručně (ne new Date()), aby se neměnilo při každém
// requestu — při publikaci obsahové změny na dané stránce datum aktualizuj.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://vizeon.cz";

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
      url: `${base}/gdpr`,
      lastModified: "2026-05-23",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/podminky`,
      lastModified: "2026-05-23",
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
