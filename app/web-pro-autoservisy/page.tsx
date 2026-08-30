import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro autoservisy na míru",
    description:
      "Tvorba webu pro autoservisy a pneuservisy na míru, přehled služeb, rychlá objednávka termínu, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-autoservisy" },
    openGraph: {
      title: "Web pro autoservisy na míru | VIZEON",
      description: "Web, kde zákazník objedná termín sám, hlavně v sezóně přezouvání, kdy telefonní linky přetěžují.",
      url: "https://vizeon.cz/web-pro-autoservisy",
      type: "website",
    },
  };
}

export default function WebProAutoservisyPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro autoservisy"
      h1="Web pro autoservis, kde zákazník objedná termín sám"
      subhead="Web pro autoservis nebo pneuservis musí hlavně rychle ukázat nabízené služby a umožnit objednat termín bez telefonování, hlavně v sezóně přezouvání, kdy linky přetěžují."
      bullets={[
        {
          title: "Přehled služeb a specializací",
          text: "Servis, diagnostika, pneuservis zvlášť, ať zákazník hned pozná, co u vás vyřídí.",
        },
        {
          title: "Rychlá objednávka termínu",
          text: "Jednoduchý formulář s typem vozu a požadovanou službou místo telefonátu.",
        },
        {
          title: "Aktuální ceník základních úkonů",
          text: "Orientační ceny běžných úkonů přímo na webu snižují počet dotazů typu „kolik to bude stát“.",
        },
      ]}
      cenikLead="Pro autoservis obvykle stačí Online Vizitka od 7 499 Kč s přehledem služeb a rychlou objednávkou, hotovo do 5 pracovních dní."
      slug="web-pro-autoservisy"
      serviceType="Tvorba webu pro autoservisy"
      faqs={[
        {
          q: "Dá se na web přidat objednávkový systém na přezutí pneu?",
          a: "Ano, v sezóně přezouvání se objednávkový kalendář hodí obzvlášť, aby se linky nezahltily. Vyřešíme ho jako webovou aplikaci na míru.",
        },
      ]}
      relatedSlugs={["web-pro-instalatery", "web-pro-elektrikare", "web-pro-fotografy"]}
      hubHref="/"
      hubLabel="← Zpět na hlavní stránku"
    />
  );
}
