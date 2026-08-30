import type { Metadata } from "next";
import Link from "next/link";
import Portfolio from "@/components/Portfolio";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Ukázky webů a reference od klientů",
    description:
      "Ukázky webů pro živnostníky a malé firmy, které jsem vytvořil, a upřímné reference od klientů. Žádné agenturní portfolio plné loga. Skutečné projekty, skutečné výsledky.",
    alternates: { canonical: "https://vizeon.cz/ukazky-webu" },
    openGraph: {
      title: "Ukázky webů a reference od klientů | VIZEON",
      description:
        "Ukázky webů pro živnostníky a malé firmy a upřímné reference od klientů.",
      url: "https://vizeon.cz/ukazky-webu",
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
        { "@type": "ListItem", position: 2, name: "Ukázky webů", item: "https://vizeon.cz/ukazky-webu" },
      ],
    },
  ],
};

export default function UkazkyWebuPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/ukazky-webu" />
      <Portfolio />

      <div className={cn(t.container.page, "pb-16 md:pb-24")}>
        <div className="mt-14">
          <Link href="/" className={t.backLink}>
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
