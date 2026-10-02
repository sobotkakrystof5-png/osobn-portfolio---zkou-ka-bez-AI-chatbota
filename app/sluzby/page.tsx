import type { Metadata } from "next";
import Link from "next/link";
import Services from "@/components/Services";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Služby — weby, e-shopy, automatizace a AI",
    description:
      "Nabízím živnostníkům a firmám weby a e-shopy na míru, automatizaci a AI, webové aplikace a SaaS, rezervační systémy, grafický design i technické služby.",
    alternates: { canonical: "https://vizeon.cz/sluzby" },
    openGraph: {
      title: "Služby — weby, e-shopy, automatizace a AI | VIZEON",
      description:
        "Weby, e-shopy, automatizace a AI, webové aplikace, systémy na míru, grafika i technické služby najdete na jednom místě, s jedním kontaktem.",
      url: "https://vizeon.cz/sluzby",
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
      ],
    },
  ],
};

export default function SluzbyPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby" />
      <Services />

      <div className={cn(t.container.page, "pb-16 md:pb-24")}>
        <ClosingCTA
          heading="Nevíte, kterou službu potřebujete?"
          subheading="Nezávazná konzultace zdarma. Probereme váš byznys a doporučím, co dává smysl."
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
