import type { Metadata } from "next";
import Link from "next/link";
import Contact from "@/components/Contact";
import { WhoYouTalkTo } from "@/components/contact/WhoYouTalkTo";
import { FOUNDER_REF, ORG_REF } from "@/lib/schema";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Kontakt — plán a cena vašeho webu",
    description:
      "Poptávka webu na míru pro živnostníky a malé firmy. Odpovídáme do hodiny a navrhneme dva termíny hovoru. Plán a cenu probereme zdarma.",
    alternates: { canonical: "https://vizeon.cz/kontakt" },
    openGraph: {
      title: "Kontakt — plán a cena vašeho webu | VIZEON",
      description:
        "Poptávka webu na míru. Odpovídáme do hodiny a navrhneme dva termíny hovoru. Plán a cena jsou zdarma.",
      url: "https://vizeon.cz/kontakt",
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ContactPage",
      "@id": "https://vizeon.cz/kontakt",
      url: "https://vizeon.cz/kontakt",
      name: "Kontakt",
      inLanguage: "cs-CZ",
      about: ORG_REF,
      mainEntity: FOUNDER_REF,
    },
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
        <WhoYouTalkTo />
        <Link href="/" className={cn(t.backLink, "mt-12 inline-block")}>
          ← Zpět na hlavní stránku
        </Link>
      </div>
    </PageShell>
  );
}
