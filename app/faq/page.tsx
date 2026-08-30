import type { Metadata } from "next";
import Link from "next/link";
import FAQ from "@/components/FAQ";
import { PageShell } from "@/components/layout/PageShell";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { faqs } from "@/lib/data/faq";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Časté dotazy — odpovědi na vaše otázky",
    description:
      "Odpovědi na nejčastější otázky o tvorbě webu na míru, třeba na délku realizace, průběh spolupráce, cenu nebo správu webu po předání.",
    alternates: { canonical: "https://vizeon.cz/faq" },
    openGraph: {
      title: "Časté dotazy — odpovědi na vaše otázky | VIZEON",
      description:
        "Délka realizace, průběh spolupráce, cena, správa webu po předání a další časté otázky o tvorbě webu na míru.",
      url: "https://vizeon.cz/faq",
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
        { "@type": "ListItem", position: 2, name: "Časté dotazy", item: "https://vizeon.cz/faq" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ],
};

export default function FaqPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/faq" />
      <FAQ />

      <div className={cn(t.container.page, "pb-16 md:pb-24")}>
        <ClosingCTA
          heading="Nenašli jste odpověď na svou otázku?"
          subheading="Napište mi, probereme vše osobně. Konzultace je vždy nezávazná a zdarma."
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
