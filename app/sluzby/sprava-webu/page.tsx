import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { MaintenanceComparison, MaintenancePlan } from "@/components/services/MaintenancePlan";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Měsíční správa webu od 480 Kč",
    description:
      "Měsíční správa webu od 480 Kč: hodina práce každý měsíc na úpravy obsahu, technické aktualizace, dohled nad bezpečností a rychlý zásah při výpadku.",
    alternates: { canonical: "https://vizeon.cz/sluzby/sprava-webu" },
    openGraph: {
      title: "Měsíční správa webu | VIZEON",
      description: "Hodina práce každý měsíc, aktualizace a zásah při výpadku za pevnou cenu od 480 Kč.",
      url: "https://vizeon.cz/sluzby/sprava-webu",
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
        { "@type": "ListItem", position: 3, name: "Správa webu", item: "https://vizeon.cz/sluzby/sprava-webu" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Správa webu",
      name: "Měsíční správa webu",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/sprava-webu",
      description:
        "Hodina práce každý měsíc na úpravy obsahu, technické aktualizace, dohled nad bezpečností a zásah při výpadku.",
      offers: {
        "@type": "Offer",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          minPrice: 480,
          priceCurrency: "CZK",
          unitText: "měsíc",
        },
      },
    },
  ],
};

export default function SpravaWebuPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/sprava-webu" />

      <div className={cn(t.container.wide, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Měsíční správa webu"
          h1={
            <>
              Web, o který se <span className="text-shimmer">nemusíte starat.</span>
            </>
          }
          lead="Každý měsíc hodina naší práce pro váš web. Úpravy, aktualizace i dohled za pevnou cenu."
        />

        <section aria-labelledby="tarif">
          <MaintenancePlan />
        </section>

        <section aria-labelledby="srovnani" className="mt-24 md:mt-32">
          <div className="mb-10 md:mb-12">
            <p className={cn(t.eyebrow, "mb-4")}>— Srovnání</p>
            <h2 id="srovnani" className={cn(t.h2Page, "max-w-2xl")}>Bez správy, nebo se správou?</h2>
          </div>
          <MaintenanceComparison />
        </section>

        <ClosingCTA
          heading="Chcete mít o web postaráno?"
          subheading="Napište nám, co na webu nejčastěji měníte, a domluvíme rozsah správy."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
