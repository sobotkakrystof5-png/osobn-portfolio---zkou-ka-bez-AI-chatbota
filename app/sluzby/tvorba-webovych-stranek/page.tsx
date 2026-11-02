import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { ArrowUpRight } from "lucide-react";
import { WebPackages, WEB_PACKAGES } from "@/components/services/WebPackages";
import { WebComparison } from "@/components/services/WebComparison";
import { WebGuaranteeBand } from "@/components/services/WebGuarantees";
import { INDUSTRIES } from "@/lib/data/industries";
import { PRICE_BY_NAME } from "@/lib/data/pricing";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Tvorba webových stránek na míru: Micro Page, Promo Page i Pro Web",
    description:
      "Tvorba webových stránek na míru pro živnostníky a malé firmy. Tři varianty: Micro Page od 4 999 Kč, landing page Promo Page od 9 999 Kč a vícestránkový Pro Web od 14 999 Kč.",
    alternates: { canonical: "https://vizeon.cz/sluzby/tvorba-webovych-stranek" },
    openGraph: {
      title: "Tvorba webových stránek na míru | VIZEON",
      description: "Od stránky na jeden účel po vícestránkový web na míru, bez šablon a s jasným ceníkem.",
      url: "https://vizeon.cz/sluzby/tvorba-webovych-stranek",
      type: "website",
    },
  };
}

/** „od 9 999 Kč“ → 9999 pro strukturovaná data. */
function minPrice(price: string) {
  const match = price.match(/(\d[\d\s]*)\s*Kč/);
  return match ? Number(match[1].replace(/\s/g, "")) : undefined;
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
        { "@type": "ListItem", position: 2, name: "Služby", item: "https://vizeon.cz/sluzby" },
        { "@type": "ListItem", position: 3, name: "Tvorba webových stránek", item: "https://vizeon.cz/sluzby/tvorba-webovych-stranek" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba webových stránek na míru",
      name: "Tvorba webových stránek na míru",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/tvorba-webovych-stranek",
      description:
        "Weby na míru pro živnostníky a malé firmy: stránka na jeden účel, landing page nebo vícestránkový web se systémy na míru.",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Varianty webu",
        itemListElement: WEB_PACKAGES.map((pkg) => ({
          "@type": "Offer",
          name: pkg.name,
          description: pkg.desc,
          priceSpecification: {
            "@type": "PriceSpecification",
            minPrice: minPrice(PRICE_BY_NAME[pkg.name]),
            priceCurrency: "CZK",
          },
        })),
      },
    },
  ],
};

// Rozcestník oborů jako čipy místo odstavce s odkazy.
const OBORY = [
  { label: "Firmy", href: "/sluzby/tvorba-webu-pro-firmy" },
  { label: "Živnostníci", href: "/tvorba-webu-pro-zivnostniky" },
  ...INDUSTRIES.map((industry) => ({ label: industry.name, href: `/${industry.slug}` })),
];

const sectionHead = "mb-10 md:mb-12";

export default function TvorbaWebovychStranekPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/tvorba-webovych-stranek" />

      <div className={cn(t.container.wide, "pt-16 md:pt-24")}>
        <PageHeader
          eyebrow="Tvorba webových stránek na míru"
          h1={
            <>
              Nekupujete si web. Kupujete si <span className="text-shimmer">výsledky.</span>
            </>
          }
          lead="Web, který vám přivádí zákazníky, ne jen existuje. Na míru vašemu oboru, s cenou i termínem předem."
        />

        <section aria-labelledby="varianty">
          <h2 id="varianty" className={cn(t.h2Page, "mb-8")}>Tři varianty webu</h2>
          <WebPackages />
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className={t.body}>
              Co je v ceně a co ne, najdete v{" "}
              <Link href="/cena-tvorby-webu" className={t.link}>ceníku webů</Link>.
            </p>
            <Link
              href="/ukazky-webu"
              className="shrink-0 border border-white/10 px-8 py-4 text-center font-inter font-medium text-[13px] uppercase tracking-[0.1em] text-[#f0ece6] transition-all duration-300 hover:border-white/20 hover:bg-white/5"
            >
              Ukázky našich webů →
            </Link>
          </div>
        </section>
      </div>

      {/* Garance jako pás přes celou šířku hned pod cenami, ať ji nikdo nepřehlédne. */}
      <div className="mt-24 md:mt-32">
        <WebGuaranteeBand />
      </div>

      <div className={cn(t.container.wide, "pb-16 md:pb-24")}>
        <section aria-labelledby="srovnani" className="mt-24 md:mt-32">
          <div className={sectionHead}>
            <p className={cn(t.eyebrow, "mb-4")}>— Srovnání</p>
            <h2 id="srovnani" className={cn(t.h2Page, "max-w-2xl")}>Web sami s AI, nebo s námi?</h2>
            <p className={cn(t.lead, "mt-4 max-w-2xl")}>
              Web si dnes s AI poskládá skoro každý. Rozdíl je v tom, co pak dělá pro váš byznys.
            </p>
          </div>
          <WebComparison />
        </section>

        <section aria-labelledby="obor" className="mt-24 md:mt-32">
          <h2 id="obor" className={cn(t.h2Page, "mb-8")}>Weby podle oboru</h2>
          <ul className="flex flex-wrap gap-2">
            {OBORY.map((obor) => (
              <li key={obor.href}>
                <Link
                  href={obor.href}
                  className="group inline-flex items-center gap-1.5 border border-white/[0.08] px-3.5 py-2 font-inter font-normal text-[13px] text-text-secondary transition-colors duration-300 hover:border-[#c9a84c]/40 hover:text-[#f0ece6]"
                >
                  {obor.label}
                  <ArrowUpRight size={13} strokeWidth={1.5} aria-hidden="true" className="text-text-muted transition-colors duration-300 group-hover:text-[#c9a84c]" />
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <ClosingCTA
          heading="Chcete web, který vydělává?"
          subheading="Nezávazná konzultace zdarma. Probereme rozsah a doporučíme variantu, která dává smysl."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
