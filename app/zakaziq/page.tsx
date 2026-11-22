import type { Metadata } from "next";
import ZakazIQ from "@/components/ZakazIQ";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { ZAKAZIQ_FAQ, ZAKAZIQ_PRICE, ZAKAZIQ_URL } from "@/lib/data/zakaziq";

const DESCRIPTION =
  "ZakazIQ je náš vlastní systém pro malé firmy: poptávky z webu, kalendář a rezervace, zákazníci s věrnostními kartami, zakázky, faktury a odhad daní v jedné aplikaci za 249 Kč měsíčně. Klienti VIZEON v něm sledují svůj projekt.";

export function generateMetadata(): Metadata {
  return {
    title: "ZakazIQ — poptávky, kalendář a zákazníci v jedné aplikaci",
    description: DESCRIPTION,
    alternates: { canonical: "https://vizeon.cz/zakaziq" },
    openGraph: {
      title: "ZakazIQ — každá poptávka na svém místě | VIZEON",
      description:
        "Poptávky z webu, kalendář, zákazníci, zakázky, faktury a odhad daní v jedné aplikaci pro malé firmy. 249 Kč měsíčně.",
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
