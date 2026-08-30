import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "SEO optimalizace webu — audit, lokální, obsahové i technické SEO",
    description:
      "SEO optimalizace webu pro Google i Seznam. Audit, lokální SEO přes Google Business Profile a Firmy.cz, obsahová strategie a technické SEO na jednom místě.",
    alternates: { canonical: "https://vizeon.cz/sluzby/seo-optimalizace" },
    openGraph: {
      title: "SEO optimalizace webu | VIZEON",
      description: "SEO optimalizace pro Google i Seznam — audit, lokální SEO, obsahová strategie a technické SEO.",
      url: "https://vizeon.cz/sluzby/seo-optimalizace",
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
        { "@type": "ListItem", position: 2, name: "Služby", item: "https://vizeon.cz/sluzby" },
        { "@type": "ListItem", position: 3, name: "SEO optimalizace", item: "https://vizeon.cz/sluzby/seo-optimalizace" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "SEO optimalizace webu",
      name: "SEO optimalizace webu",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/seo-optimalizace",
      description:
        "SEO optimalizace webu pro Google i Seznam — audit, lokální SEO, obsahová strategie a technické SEO.",
    },
  ],
};

const pilire = [
  {
    title: "SEO audit webu",
    text: "Zjistím, kde web ztrácí pozice i poptávky — technické chyby, chybějící klíčová slova, srovnání s konkurencí.",
    href: "/sluzby/seo-optimalizace/audit",
  },
  {
    title: "Lokální SEO",
    text: "Nastavím Google Business Profile i Firmy.cz, ať vás lidé z okolí najdou na Googlu i na Seznamu.",
    href: "/sluzby/seo-optimalizace/lokalni-seo",
  },
  {
    title: "Obsahové SEO",
    text: "Klíčová slova a obsahová strategie, díky které web dlouhodobě roste v přirozeném vyhledávání.",
    href: "/sluzby/seo-optimalizace/obsahove-seo",
  },
  {
    title: "Technické SEO",
    text: "Rychlost, strukturovaná data a indexovatelnost — základ, bez kterého žádné SEO nefunguje.",
    href: "/sluzby/seo-optimalizace/technicke-seo",
  },
];

export default function SeoOptimalizacePage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/seo-optimalizace" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="SEO optimalizace"
          h1="SEO optimalizace, po které vás najdou na Googlu i Seznamu"
          lead="V Česku nestačí optimalizovat jen pro Google — Seznam má vlastní fulltextový vyhledávač a spoustu lidí, kteří ho pořád používají. SEO řeším pro oba, ne jen pro jeden z nich."
        />

        <div className="space-y-6 mb-14">
          {pilire.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group block border border-white/[0.06] hover:border-[rgba(201,168,76,0.3)] p-6 md:p-7 transition-colors duration-300"
            >
              <h2 className={cn(t.h3, "text-[16px] mb-2 group-hover:text-[#c9a84c] transition-colors duration-300")}>
                {p.title}
              </h2>
              <p className={cn(t.body, "mb-3")}>{p.text}</p>
              <span className="font-inter font-light text-[11px] tracking-[0.08em] uppercase text-[#c9a84c]/70 group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300 inline-block">
                Zjistit víc →
              </span>
            </Link>
          ))}
        </div>

        <section aria-labelledby="cena">
          <h2 id="cena" className={cn(t.h2Page, "mb-4")}>Kolik stojí SEO optimalizace</h2>
          <p className={t.body}>
            Cena se odvíjí od rozsahu webu a toho, jestli řešíte audit, lokální SEO, obsahovou
            strategii nebo technickou optimalizaci — případně kombinaci víc služeb najednou.
            Kompletní ceník najdete na{" "}
            <Link href="/cena-tvorby-webu" className={t.link}>samostatné stránce s ceníkem</Link>.
          </p>
        </section>

        <ClosingCTA
          heading="Chcete vědět, kde vás na Googlu i Seznamu hledají a nenajdou?"
          subheading="Nezávazná konzultace zdarma — probereme, která část SEO má u vás nejvyšší prioritu."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
