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
      subhead="Web pro osobního trenéra řeším s důrazem na rezervaci tréninku a jasné představení vašeho stylu. Klient se rozhoduje hlavně podle toho, jestli mu sedí přístup a osobnost trenéra, teprve pak podle ceny. Proto web staví na fotkách z tréninků a konkrétním popisu specializace, ne na obecných frázích o zdravém životním stylu. Rezervační systém navíc musí fungovat bez nutnosti psát zprávy tam a zpátky, protože klient chce vidět rovnou volné termíny."
      bullets={[
        {
          title: "Rezervační kalendář na tréninky",
          text: "Klient si vybere termín sám, kalendář hlídá kapacitu i typ tréninku za vás, u skupinových lekcí i maximální počet účastníků, ať se lekce nepřeplní.",
        },
        {
          title: "Představení tréninkového stylu",
          text: "Specializace (síla, hubnutí, běh, rehabilitační trénink) a fotky z tréninků, které ukážou, jak práce s vámi vypadá a jakou atmosféru klient může čekat, klidně i krátké video z tréninku.",
        },
        {
          title: "Individuální plán vs. skupinové lekce",
          text: "Jasné rozlišení, jestli jde o individuální trénink na míru nebo skupinovou lekci s pevným rozvrhem, ať klient hned pozná, který formát mu vyhovuje a jaká je orientační cena.",
        },
        {
          title: "Ceník balíčků tréninků",
          text: "Přehledně seřazené jednotlivé lekce i balíčky permanentek, ať se klient rozhodne rychleji a nemusí se ptát na cenu předem. U balíčků se hodí rovnou napsat i jejich platnost a storno podmínky.",
        },
      ]}
      cenikLead="Pro prezentaci s rezervací obvykle stačí Online Vizitka od 7 499 Kč, u rozsáhlejší prezentace s víc specializacemi se hodí Promo Page od 9 999 Kč. Rezervační kalendář se řeší jako webová aplikace na míru podle toho, kolik klientů a lekcí najednou potřebujete spravovat."
      slug="web-pro-fitness-trenery"
      serviceType="Tvorba webu pro fitness trenéry"
      caseExampleTitle="Příklad zakázky: první trénink s novým klientem"
      caseExampleText="Zájemce o trénink si na webu přečte, na co se specializujete (síla, hubnutí, běh), prohlédne fotky z tréninků a rovnou v kalendáři zarezervuje úvodní konzultaci. Rozhoduje se hlavně podle toho, jestli mu sedí váš přístup, text a fotky o stylu tréninku proto hrají větší roli než samotný ceník. Na úvodní konzultaci proberete cíle, zdravotní omezení a časové možnosti klienta a domluvíte, jestli má smysl individuální trénink, nebo mu spíš vyhovuje skupinová lekce s pevným rozvrhem a nižší cenou za lekci. Podle toho pak klient v kalendáři rezervuje další lekce jednotlivě, nebo si rovnou koupí balíček s výhodnější cenou za trénink. Pokud klient řeší i změnu stravovacích návyků, můžete mu doporučit, na co si dát pozor, ale konkrétní jídelníček už spadá do samostatné, specializované služby."
      processSteps={[
        {
          title: "Seznámení se stylem",
          text: "Zájemce si podle textu a fotek ověří, jestli mu sedí váš přístup k tréninku a jaká je vaše specializace.",
        },
        {
          title: "Rezervace úvodní konzultace",
          text: "V kalendáři na webu vybere termín první schůzky sám, bez nutnosti psát zprávu a čekat na odpověď.",
        },
        {
          title: "Úvodní konzultace",
          text: "Proberete cíle, zdravotní omezení a časové možnosti klienta a domluvíte vhodný formát tréninku.",
        },
        {
          title: "Pravidelné tréninky",
          text: "Po úvodní konzultaci si další lekce nebo balíček rezervuje rovnou přes stejný kalendář, případně sleduje svůj pokrok, pokud ho na webu nabízíte.",
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
        {
          q: "Dá se na web přidat i krátký dotazník před první konzultací?",
          a: "Ano, krátký formulář s cíli a zdravotními omezeními klienta před první schůzkou ušetří čas na místě, protože základní informace už budete mít předem.",
        },
        {
          q: "Dá se na web přidat i sledování pokroku klienta, třeba váhy nebo výkonů?",
          a: "Ano, jednoduchý přehled pokroku v čase se dá zabudovat jako součást webové aplikace na míru, klientům to navíc pomáhá udržet motivaci mezi jednotlivými tréninky.",
        },
        {
          q: "Dá se na web přidat i storno podmínky pro zrušený trénink?",
          a: "Ano, jasně napsané podmínky (třeba zrušení nejpozději 24 hodin předem) patří k přehledu rezervace a předchází nedorozuměním, když klient na trénink nedorazí.",
        },
      ]}
      relatedSlugs={["web-pro-masery-a-wellness", "web-pro-kosmeticky", "web-pro-kadernictvi", "web-pro-fotografy"]}
    />
  );
}
