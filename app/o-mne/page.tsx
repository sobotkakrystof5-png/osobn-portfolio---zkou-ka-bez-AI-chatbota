import type { Metadata } from "next";
import Link from "next/link";
import About from "@/components/About";
import { PageShell } from "@/components/layout/PageShell";
import { CTAButton } from "@/components/CTAButton";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { altenoUrl } from "@/lib/alteno";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";
import { Alteno } from "@/components/brand/BrandName";

export function generateMetadata(): Metadata {
  return {
    title: "O mně — jeden člověk místo agentury",
    description:
      "Kryštof Sobotka, webdesignér na volné noze. Nejsem agentura, takže od první zprávy až po spuštění webu komunikujete přímo se mnou. Žádné přehazování na juniory.",
    alternates: { canonical: "https://vizeon.cz/o-mne" },
    openGraph: {
      title: "O mně — jeden člověk místo agentury | VIZEON",
      description:
        "Kryštof Sobotka, webdesignér na volné noze. Jeden kontakt od první zprávy až po spuštění webu.",
      url: "https://vizeon.cz/o-mne",
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
        { "@type": "ListItem", position: 2, name: "O mně", item: "https://vizeon.cz/o-mne" },
      ],
    },
  ],
};

export default function OMnePage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/o-mne" />
      <About />

      <div className={cn(t.container.page, "pb-16 md:pb-24")}>
        <section aria-labelledby="alteno" className="-mt-12 md:-mt-20 mb-14">
          <h2 id="alteno" className={cn(t.h2Page, "mb-4")}>
            Sesterská značka: <Alteno font="cormorant" />
          </h2>
          <p className={t.body}>
            Automatizaci firemních procesů a AI řeší sesterská značka{" "}
            <a
              href={altenoUrl("/", "o-mne")}
              target="_blank"
              rel="noopener"
              className={t.link}
            >
              <Alteno /> ↗
            </a>
            . Když si u mě necháte postavit web a zároveň řešíte, kolik času vám bere opakovaná práce kolem
            něj, probereme obojí najednou. Co všechno se dá automatizovat, popisuje stránka{" "}
            <Link href="/automatizace" className={t.link}>
              automatizace a AI
            </Link>
            .
          </p>
        </section>

        <div className="text-center">
          <CTAButton className="inline-flex font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300">
            Nezávazná konzultace zdarma →
          </CTAButton>
        </div>

        <div className="mt-14">
          <Link href="/" className={t.backLink}>
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
