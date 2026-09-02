import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro fitness trenéry na míru",
    description:
      "Tvorba webu pro osobní fitness trenéry na míru, rezervační kalendář na tréninky, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-fitness-trenery" },
    openGraph: {
      title: "Web pro fitness trenéry na míru | VIZEON",
      description: "Web, kde se klient přihlásí na trénink sám — bez zpráv a čekání na odpověď.",
      url: "https://vizeon.cz/web-pro-fitness-trenery",
      type: "website",
    },
  };
}

export default function WebProFitnessTreneryPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro fitness trenéry"
      h1="Web pro fitness trenéry, kde se klient přihlásí na trénink sám"
      subhead="Web pro osobního trenéra řeším s důrazem na rezervaci tréninku a jasné představení vašeho stylu — klient se rozhoduje podle toho, jestli mu sedí přístup, dřív než podle ceny."
      bullets={[
        {
          title: "Rezervační kalendář na tréninky",
          text: "Klient si vybere termín sám, kalendář hlídá kapacitu i typ tréninku za vás.",
        },
        {
          title: "Představení tréninkového stylu",
          text: "Specializace (síla, hubnutí, běh) a fotky z tréninků, které ukážou, jak práce s vámi vypadá.",
        },
        {
          title: "Ceník balíčků tréninků",
          text: "Přehledně seřazené jednotlivé lekce i balíčky, ať se klient rozhodne rychleji.",
        },
      ]}
      cenikLead="Pro prezentaci s rezervací obvykle stačí Online Vizitka od 7 499 Kč, rezervační kalendář se řeší jako webová aplikace na míru."
      slug="web-pro-fitness-trenery"
      serviceType="Tvorba webu pro fitness trenéry"
      caseExampleTitle="Příklad zakázky: první trénink s novým klientem"
      caseExampleText="Zájemce o trénink si na webu přečte, na co se specializujete (síla, hubnutí, běh), prohlédne fotky z tréninků a rovnou v kalendáři zarezervuje úvodní konzultaci. Rozhoduje se hlavně podle toho, jestli mu sedí váš přístup — proto text a fotky o stylu tréninku hrají větší roli než jen ceník."
      processSteps={[
        {
          title: "Seznámení se stylem",
          text: "Zájemce si podle textu a fotek ověří, jestli mu sedí váš přístup k tréninku.",
        },
        {
          title: "Rezervace úvodní konzultace",
          text: "V kalendáři na webu vybere termín první schůzky sám.",
        },
        {
          title: "Trénink a další lekce",
          text: "Po úvodní konzultaci si další lekce nebo balíček rezervuje rovnou přes stejný kalendář.",
        },
      ]}
      faqs={[
        {
          q: "Zvládne kalendář hlídat kapacitu skupinových lekcí?",
          a: "Ano, nastavím ho tak, aby počítal s maximálním počtem účastníků a po naplnění lekci automaticky uzavřel.",
        },
        {
          q: "Dá se v kalendáři rozlišit osobní trénink a skupinová lekce?",
          a: "Ano, kalendář nastavím tak, aby rozlišoval typ lekce i kapacitu, ať klient vidí jen skutečně volné termíny.",
        },
        {
          q: "Jde na web přidat i online tréninkové programy k prodeji?",
          a: "Ano, prodej online programů nebo permanentek se dá zabudovat jako součást webové aplikace na míru.",
        },
      ]}
      relatedSlugs={["web-pro-masery-a-wellness", "web-pro-kosmeticky", "web-pro-kadernictvi"]}
      hubHref="/"
      hubLabel="← Zpět na hlavní stránku"
    />
  );
}
