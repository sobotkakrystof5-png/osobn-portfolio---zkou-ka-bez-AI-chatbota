import type { Metadata } from "next";
import ZakazIQ from "@/components/ZakazIQ";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { ZAKAZIQ_FAQ, ZAKAZIQ_PRICE, ZAKAZIQ_URL } from "@/lib/data/zakaziq";

const DESCRIPTION =
  "ZakazIQ je náš vlastní systém. Klienti VIZEON v něm mají klientský prostor k projektu: zprávy, etapy, faktury a konzultace na jednom místě. Malým firmám slouží jako aplikace na poptávky, kalendář, zákazníky, zakázky a faktury za 249 Kč měsíčně.";

export function generateMetadata(): Metadata {
  return {
    title: "ZakazIQ — klientský prostor a aplikace pro malé firmy",
    description: DESCRIPTION,
    alternates: { canonical: "https://vizeon.cz/zakaziq" },
    openGraph: {
      title: "ZakazIQ — rychlejší projekty, spokojenější klienti | VIZEON",
      description:
        "Klientský prostor ke každé zakázce a aplikace pro malé firmy: poptávky, kalendář, zákazníci, zakázky a faktury za 249 Kč měsíčně.",
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
    {
      "@type": "SoftwareApplication",
      name: "ZakazIQ",
      url: ZAKAZIQ_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      inLanguage: "cs",
      description: DESCRIPTION,
      creator: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      offers: {
        "@type": "Offer",
        price: String(ZAKAZIQ_PRICE),
        priceCurrency: "CZK",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price: String(ZAKAZIQ_PRICE),
          priceCurrency: "CZK",
          unitText: "měsíc",
          billingDuration: "P1M",
        },
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: ZAKAZIQ_FAQ.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
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
