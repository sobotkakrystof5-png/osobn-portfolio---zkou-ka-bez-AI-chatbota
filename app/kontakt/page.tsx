import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Kontakt — nezávazná konzultace zdarma",
    description:
      "Poptávka webu na míru pro živnostníky a malé firmy. Napište přes formulář, zavolejte nebo napište na WhatsApp. Odpovídám do 24 hodin, konzultace je vždy zdarma.",
    alternates: { canonical: "https://vizeon.cz/kontakt" },
    openGraph: {
      title: "Kontakt — nezávazná konzultace zdarma | VIZEON",
      description:
        "Poptávka webu na míru. Formulář, telefon nebo WhatsApp. Odpovídám do 24 hodin, konzultace je vždy zdarma.",
      url: "https://vizeon.cz/kontakt",
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
        { "@type": "ListItem", position: 2, name: "Kontakt", item: "https://vizeon.cz/kontakt" },
      ],
    },
  ],
};

export default function KontaktPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/kontakt" />
      <Contact />

      <div className={cn(t.container.page, "pb-16 md:pb-24")}>
        <Link href="/" className={t.backLink}>
          ← Zpět na hlavní stránku
        </Link>
      </div>
    </PageShell>
  );
}
