import type { Metadata } from "next";
import Link from "next/link";
import ServicesDashboard from "@/components/services/ServicesDashboard";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

// Služby a ceník v jedné sekci (11/2026). Dřív byly služby tady a ceník na
// /cena-tvorby-webu; ta zůstává jako stránka o ceně webu, ale v liště už
// je jen tahle.
export function generateMetadata(): Metadata {
  return {
    title: "Služby a ceník — weby, e-shopy, automatizace a AI",
    description:
      "Weby a e-shopy na míru, automatizace a AI, aplikace, systémy na míru, SEO, grafika i technické služby. Všechny služby i ceny přehledně na jednom místě.",
    alternates: { canonical: "https://vizeon.cz/sluzby" },
    openGraph: {
      title: "Služby a ceník | VIZEON",
      description:
        "Weby, e-shopy, automatizace a AI, aplikace, SEO, grafika i technické služby. Co pro vás uděláme a kolik to stojí, na jednom místě.",
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
        { "@type": "ListItem", position: 2, name: "Služby a ceník", item: "https://vizeon.cz/sluzby" },
      ],
    },
  ],
};

export default function SluzbyPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby" />

      <div className={cn(t.container.wide, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Služby a ceník"
          h1="Co pro vás uděláme a za kolik."
          lead={
            <>
              Všechny služby i ceny na jednom místě. Ceník je veřejný a stejný pro každého klienta,
              cena se odvíjí jen od rozsahu práce. Jak probíhá{" "}
              <Link href="/tvorba-webu-pro-zivnostniky" className={t.link}>
                tvorba webu pro živnostníky
              </Link>{" "}
              a co všechno cenu ovlivňuje, rozebíráme v článku{" "}
              <Link href="/blog/kolik-stoji-tvorba-webu-2026" className={t.link}>
                Kolik stojí tvorba webových stránek v roce 2026
              </Link>
              .
            </>
          }
        />

        <ServicesDashboard />

        <ClosingCTA
          heading="Nevíte, kterou službu potřebujete?"
          subheading="Nezávazná konzultace zdarma. Probereme váš byznys a doporučíme, co dává smysl."
        />
      </div>
    </PageShell>
  );
}
