import type { Metadata } from "next";
import AboutHero from "@/components/about/AboutHero";
import JourneyPath from "@/components/about/JourneyPath";
import AboutFinale from "@/components/about/AboutFinale";
import { PageShell } from "@/components/layout/PageShell";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// Celá stránka je jeden příběh: kdo (úvod s 3D fotkou), kudy vedla cesta
// (čára milníků kreslená scrollem) a kam míříme dál (závěr se dvěma výzvami).
export function generateMetadata(): Metadata {
  return {
    title: "O nás — od prvního kódu k vlastní firmě",
    description:
      "Kryštof Sobotka, zakladatel VIZEON a ALTENO. Programuje od 14 let, studuje v Německu a od května 2026 dokončil přes 15 projektů. Teď staví tým.",
    alternates: { canonical: "https://vizeon.cz/o-mne" },
    openGraph: {
      title: "O nás — od prvního kódu k vlastní firmě | VIZEON",
      description: "Kryštof Sobotka, zakladatel VIZEON a ALTENO. Od prvního kódu ve 14 letech ke dvěma značkám a prvnímu týmu.",
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
        { "@type": "ListItem", position: 2, name: "O nás", item: "https://vizeon.cz/o-mne" },
      ],
    },
  ],
};

export default function OMnePage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/o-mne" />
      <AboutHero />
      <JourneyPath />
      <AboutFinale />
    </PageShell>
  );
}
