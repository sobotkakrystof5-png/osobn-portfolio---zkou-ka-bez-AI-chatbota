import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro malíře pokojů na míru",
    description:
      "Tvorba webu pro malířskou a natěračskou firmu na míru — fotky před/po a rychlá poptávka, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-malire" },
    openGraph: {
      title: "Web pro malíře pokojů na míru | VIZEON",
      description: "Web na míru pro malířské a natěračské práce — vizuální důkaz proměny prostoru.",
      url: "https://vizeon.cz/web-pro-malire",
      type: "website",
    },
  };
}

export default function WebProMalirePage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro malíře pokojů"
      h1="Web na míru pro malíře pokojů"
      subhead="Web pro malíře pokojů stavím kolem srovnání před/po, ne kolem dlouhého popisu služeb — u malířských a natěračských prací totiž lidi nejvíc přesvědčí vidět rozdíl na vlastní oči."
      bullets={[
        {
          title: "Fotky před a po vedle sebe",
          text: "Nejsilnější argument, jaký malířská firma má — návštěvník okamžitě vidí, jaký rozdíl vaše práce dělá.",
        },
        {
          title: "Přehled prováděných prací",
          text: "Malování, štukování, tapetování, nátěry — krátce a jasně, ať zákazník hned pozná, jestli řešíte přesně jeho zakázku.",
        },
        {
          title: "Rychlá poptávka s fotkou prostoru",
          text: "Formulář, kam zákazník nahraje fotku místnosti — usnadní vám odhad rozsahu práce ještě před první schůzkou.",
        },
      ]}
      cenikLead="Pro malířskou firmu se nejvíc hodí Online Vizitka s galerií před/po — od 7 499 Kč, hotovo do 5 pracovních dní."
      slug="web-pro-malire"
      serviceType="Tvorba webu pro malíře pokojů"
      faqs={[
        {
          q: "Kolik fotek před/po je potřeba na spuštění webu?",
          a: "Stačí 4 až 6 kvalitních párů fotek. Zbytek galerie můžete průběžně doplňovat po dalších zakázkách — ukážu vám jak.",
        },
      ]}
    />
  );
}
