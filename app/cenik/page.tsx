import type { Metadata } from "next";
import Link from "next/link";
import Pricing from "@/components/Pricing";
import { PillarHeader, PillarFooter } from "@/components/pillar/PillarChrome";

export function generateMetadata(): Metadata {
  return {
    title: "Cena tvorby webu na míru | VIZEON",
    description:
      "Cena tvorby webu na míru pro živnostníky — transparentní ceník od 4 999 Kč, hotovo do 3 týdnů. Weby, grafika i správa sítí.",
    alternates: { canonical: "https://vizeon.cz/cenik" },
    openGraph: {
      title: "Ceník — cena tvorby webu na míru | VIZEON",
      description: "Kolik stojí web pro živnostníka? Přehledný ceník bez skrytých poplatků.",
      url: "https://vizeon.cz/cenik",
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
        { "@type": "ListItem", position: 2, name: "Ceník", item: "https://vizeon.cz/cenik" },
      ],
    },
  ],
};

export default function CenikPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PillarHeader />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pt-16 md:pt-24">
        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Transparentní ceník
        </p>
        <h1 className="font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl">
          Cena tvorby webu na míru
        </h1>
        <p className="font-inter font-light text-[16px] md:text-[18px] leading-[1.85] text-[#8a8070] max-w-2xl">
          Kolik stojí web pro živnostníka, se dozvíte hned bez vyplňování formuláře — ceník je
          veřejný a stejný pro každého klienta, cena se odvíjí jen od rozsahu práce. Níže najdete
          jednotlivé služby i výhodné bundly, přesně ty samé, které používám v nabídkách. Pokud
          řešíte konkrétní obor, mrkněte i na{" "}
          <Link href="/tvorba-webu-pro-zivnostniky" className="text-[#c9a84c] hover:underline">
            tvorbu webu pro živnostníky
          </Link>{" "}
          obecně.
        </p>
      </div>

      <Pricing />

      <div className="max-w-4xl mx-auto px-6 md:px-12 pb-16 md:pb-24 -mt-16">
        <Link
          href="/"
          className="font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300"
        >
          ← Zpět na hlavní stránku
        </Link>
      </div>

      <PillarFooter />
    </div>
  );
}
