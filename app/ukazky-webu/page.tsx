import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";

export function generateMetadata(): Metadata {
  return {
    title: "Ukázky webů a reference od klientů",
    description:
      "Ukázky webů pro živnostníky a malé firmy, které jsme vytvořili, na počítači i v mobilu. Skutečné projekty, skutečné výsledky a upřímné reference od klientů.",
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

      <div className={t.container.page}>
        <div className="pb-20 md:pb-28">
          <ClosingCTA
            heading="Chcete být další v řadě?"
            subheading="Nezávazná konzultace zdarma. Probereme váš byznys a doporučíme, co dává smysl."
          />
        </div>
      </div>
    </PageShell>
  );
}
