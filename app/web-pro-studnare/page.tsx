import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro studnaře na míru",
    description:
      "Tvorba webu pro studnařskou firmu na míru — důvěra, reference a oblast působnosti na první pohled, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-studnare" },
    openGraph: {
      title: "Web pro studnaře na míru | VIZEON",
      description: "Studnařství web na míru — výsledek práce je pod zemí, důvěru proto musí budovat web.",
      url: "https://vizeon.cz/web-pro-studnare",
      type: "website",
    },
  };
}

export default function WebProStudnarePage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro studnaře"
      h1="Web na míru pro studnaře"
      subhead="Web pro studnaře musí hlavně budovat důvěru dřív, než zákazník podepíše smlouvu — vrtání studny je investice v řádu desítek tisíc a výsledek nikdo předem nevidí, je pod zemí."
      bullets={[
        {
          title: "Reference a roky zkušeností na první pohled",
          text: "Kolik studní jste vyvrtali, jak dlouho firma působí, případně reference přímo od zákazníků — u neviditelné práce je to hlavní důkaz kvality.",
        },
        {
          title: "Oblast působnosti",
          text: "Jasně napsaný kraj nebo okruh kilometrů, kam dojíždíte — ušetří vám poptávky odjinud, které stejně nemůžete realizovat.",
        },
        {
          title: "Vysvětlení postupu jednoduchým jazykem",
          text: "Stručně, jak vrtání probíhá a co zákazník může čekat — bez odborného žargonu, který spíš odradí, než přesvědčí.",
        },
      ]}
      cenikLead="Studnařské firmě obvykle stačí Online Vizitka s referencemi a oblastí působnosti — od 7 499 Kč, hotovo do 5 pracovních dní."
      slug="web-pro-studnare"
      serviceType="Tvorba webu pro studnaře"
      caseExampleTitle="Příklad zakázky: vrtaná studna pro rodinný dům"
      caseExampleText="Zákazník řeší zásobování vodou u nového pozemku a hledá firmu s prokazatelnou praxí v jeho kraji — na webu vidí oblast působnosti, roky zkušeností a jednoduše popsaný postup vrtání. Protože výsledek práce je pod zemí a nejde ho předem zkontrolovat, důvěra tu rozhoduje víc než cena."
      processSteps={[
        {
          title: "Poptávka s lokalitou",
          text: "Zákazník přes formulář uvede lokalitu pozemku a orientační požadavky na vydatnost vody.",
        },
        {
          title: "Průzkum a nacenění",
          text: "Podle lokality a geologických podmínek připravíte nabídku a termín vrtání.",
        },
        {
          title: "Vrtání a předání",
          text: "Po dokončení předáte dokumentaci a zákazník ví, co má od studny čekat.",
        },
      ]}
      faqs={[
        {
          q: "Jak na webu nejlíp ukázat důvěryhodnost, když nemám žádné psané reference?",
          a: "I pár vět od spokojených zákazníků, které posbíráme telefonicky nebo přes SMS, na webu udělá rozdíl. Poradím, jak si je nenásilně vyžádat po dokončení zakázky.",
        },
        {
          q: "Dá se na web přidat mapa nebo popis oblasti, kam dojíždíte?",
          a: "Ano, jasně vymezená oblast působnosti (kraj nebo okruh kilometrů) na webu ušetří poptávky odjinud, které stejně nemůžete realizovat.",
        },
        {
          q: "Jak na webu vysvětlit odborný postup, aniž by to znělo jako reklama?",
          a: "Stručný, věcný popis kroků — průzkum, vrtání, zapažení, testování vydatnosti — působí důvěryhodněji než obecná prodejní fráze, a přesně takhle texty společně nastavíme.",
        },
      ]}
      relatedSlugs={["web-pro-instalatery", "web-pro-sanace", "web-pro-remeslniky"]}
    />
  );
}
