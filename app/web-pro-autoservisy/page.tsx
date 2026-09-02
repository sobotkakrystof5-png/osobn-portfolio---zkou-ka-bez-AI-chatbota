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
      caseExampleTitle="Příklad zakázky: přezutí pneu v sezóně"
      caseExampleText="Na začátku sezóny přezouvání zákazník hledá servis s volným termínem — na webu vidí přehled služeb, orientační ceník a rovnou přes formulář zadá typ vozu a požadovanou službu. V období, kdy telefonní linky přetěžují, tohle rozhoduje o tom, jestli si termín stihne zamluvit u vás, nebo zavolá jinam."
      processSteps={[
        {
          title: "Objednávka termínu",
          text: "Zákazník přes web zadá typ vozu, službu a preferovaný termín.",
        },
        {
          title: "Potvrzení a příjem vozu",
          text: "Termín potvrdíte, vůz přijmete a domluvíte rozsah práce.",
        },
        {
          title: "Servis a předání",
          text: "Práci dokončíte a vůz předáte, orientační ceny na webu snížily počet dotazů předem.",
        },
      ]}
      faqs={[
        {
          q: "Dá se na web přidat objednávkový systém na přezutí pneu?",
          a: "Ano, v sezóně přezouvání se objednávkový kalendář hodí obzvlášť, aby se linky nezahltily. Vyřešíme ho jako webovou aplikaci na míru.",
        },
        {
          q: "Zvládne formulář rozlišit typ vozu a požadovanou službu?",
          a: "Ano, formulář nastavím tak, aby zákazník vybral typ vozu, službu a preferovaný termín, ať máte rovnou informace potřebné k naplánování.",
        },
        {
          q: "Dá se na web přidat i připomínka blížící se STK nebo výměny oleje?",
          a: "Ano, takovou připomínku lze zabudovat jako součást webové aplikace na míru, případně napojenou na e-mail nebo SMS.",
        },
      ]}
      relatedSlugs={["web-pro-instalatery", "web-pro-elektrikare", "web-pro-zamecniky"]}
      hubHref="/"
      hubLabel="← Zpět na hlavní stránku"
    />
  );
}
