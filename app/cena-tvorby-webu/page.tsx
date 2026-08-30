import type { Metadata } from "next";
import Link from "next/link";
import Pricing from "@/components/Pricing";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Cena tvorby webu na míru",
    description:
      "Cena tvorby webu na míru pro živnostníky, transparentní ceník od 4 999 Kč, hotovo do 3 týdnů. Weby, grafika i správa sítí.",
    alternates: { canonical: "https://vizeon.cz/cena-tvorby-webu" },
    openGraph: {
      title: "Ceník — cena tvorby webu na míru | VIZEON",
      description: "Kolik stojí web pro živnostníka? Přehledný ceník bez skrytých poplatků.",
      url: "https://vizeon.cz/cena-tvorby-webu",
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
        { "@type": "ListItem", position: 2, name: "Ceník", item: "https://vizeon.cz/cena-tvorby-webu" },
      ],
    },
  ],
};

export default function CenaTvorbyWebuPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/cena-tvorby-webu" />
      <Pricing />

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
