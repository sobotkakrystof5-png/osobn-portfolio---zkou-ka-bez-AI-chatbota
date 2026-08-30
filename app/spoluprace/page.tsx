import type { Metadata } from "next";
import Link from "next/link";
import HowItWorks from "@/components/HowItWorks";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Jak probíhá spolupráce — 7 kroků od nápadu ke spuštění",
    description:
      "Sedm kroků od první konzultace po bezpečné předání webu. Víte přesně, co se děje a kdy. Žádné černé skříňky, žádné čekání bez informací.",
    alternates: { canonical: "https://vizeon.cz/spoluprace" },
    openGraph: {
      title: "Jak probíhá spolupráce | VIZEON",
      description: "Sedm kroků od nápadu ke spuštění zahrnuje první konzultaci, návrh, tvorbu i bezpečné předání webu.",
      url: "https://vizeon.cz/spoluprace",
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
        { "@type": "ListItem", position: 2, name: "Spolupráce", item: "https://vizeon.cz/spoluprace" },
      ],
    },
  ],
};

export default function SpolupracePage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/spoluprace" />
      <HowItWorks />

      <div className={cn(t.container.page, "pb-16 md:pb-24")}>
        <ClosingCTA
          heading="Připraveni začít?"
          subheading="Nezávazná konzultace zdarma, první krok ke spuštění vašeho webu."
        />

        <div className="mt-14">
          <Link href="/" className={t.backLink}>
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
