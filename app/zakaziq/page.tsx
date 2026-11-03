import type { Metadata } from "next";
import ZakazIQ from "@/components/ZakazIQ";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";

export function generateMetadata(): Metadata {
  return {
    title: "ZakazIQ — klientský portál pro vaše projekty",
    description:
      "ZakazIQ je komunikační a rezervační systém, který dostane každý klient VIZEON. Najdete v něm přímou komunikaci, zpětnou vazbu, konzultaci na jedno kliknutí a přehled o průběhu projektu na jednom místě.",
    alternates: { canonical: "https://vizeon.cz/zakaziq" },
    openGraph: {
      title: "ZakazIQ — klientský portál pro vaše projekty | VIZEON",
      description:
        "Komunikační a rezervační systém pro klienty VIZEON s přímou komunikací, zpětnou vazbou a přehledem o projektu na jednom místě.",
      url: "https://vizeon.cz/zakaziq",
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
        { "@type": "ListItem", position: 2, name: "ZakazIQ", item: "https://vizeon.cz/zakaziq" },
      ],
    },
  ],
};

export default function ZakazIQPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/zakaziq" />
      <ZakazIQ />
    </PageShell>
  );
}
