import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro zahradníky na míru",
    description:
      "Tvorba webu pro zahradníky a úpravy zahrad na míru, galerie proměn před/po, rychlá poptávka, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-zahradniky" },
    openGraph: {
      title: "Web pro zahradníky na míru | VIZEON",
      description: "Web postavený kolem fotek před/po — nejsilnějšího argumentu u zahradních úprav.",
      url: "https://vizeon.cz/web-pro-zahradniky",
      type: "website",
    },
  };
}

export default function WebProZahradnikyPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro zahradníky"
      h1="Web pro zahradníky, kde fotky před/po prodávají samy"
      subhead="Web pro zahradníky a úpravy zahrad stavím kolem srovnání před/po — je to nejsilnější argument, který zákazníka přesvědčí rychleji než jakýkoli popis prací."
      bullets={[
        {
          title: "Galerie před/po",
          text: "Srovnávací fotky proměny zahrady na jednom místě, řazené podle typu úpravy.",
        },
        {
          title: "Přehled služeb podle sezóny",
          text: "Zakládání trávníků, údržba, návrhy zahrad zvlášť, ať zákazník hned pozná, co aktuálně potřebuje.",
        },
        {
          title: "Rychlá poptávka s adresou pozemku",
          text: "Jednoduchý formulář, kam zákazník rovnou napíše rozlohu a typ úpravy, ať víte, o jakou zakázku jde.",
        },
      ]}
      cenikLead="Pro prezentaci s galerií před/po obvykle stačí Online Vizitka od 7 499 Kč, u rozsáhlejší nabídky služeb se hodí Promo Page od 9 999 Kč."
      slug="web-pro-zahradniky"
      serviceType="Tvorba webu pro zahradníky"
      faqs={[
        {
          q: "Dá se web přizpůsobit sezónnosti poptávek?",
          a: "Ano, aktuální nabídku (třeba jarní úpravy nebo podzimní úklid) můžete sami měnit podle sezóny, ukážu vám jak.",
        },
      ]}
      relatedSlugs={["web-pro-malire", "web-pro-sanace", "web-pro-remeslniky"]}
    />
  );
}
