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
      subhead="Web pro studnaře musí hlavně budovat důvěru dřív, než zákazník podepíše smlouvu. Vrtání studny je investice v řádu desítek tisíc a výsledek, tedy vydatnost a kvalita vody, nikdo předem nevidí, protože je pod zemí. Zákazník se proto rozhoduje hlavně podle zkušeností firmy a znalosti místní geologie, ne podle nejnižší ceny."
      bullets={[
        {
          title: "Reference a roky zkušeností na první pohled",
          text: "Kolik studní jste vyvrtali, jak dlouho firma působí, případně reference přímo od zákazníků. U neviditelné práce je to hlavní důkaz kvality, který zákazník má k dispozici před podpisem smlouvy.",
        },
        {
          title: "Oblast působnosti",
          text: "Jasně napsaný kraj nebo okruh kilometrů, kam dojíždíte. Ušetří vám poptávky odjinud, které stejně nemůžete realizovat kvůli vzdálenosti nebo neznalosti místní geologie a hladiny podzemní vody.",
        },
        {
          title: "Vysvětlení typů studní a povolení",
          text: "Rozdíl mezi vrtanou a kopanou studnou a stručná zmínka, že vrtání obvykle vyžaduje ohlášení nebo povolení vodoprávního úřadu, ukáže zákazníkovi, že vedle vrtání zvládnete i administrativní stránku zakázky.",
        },
        {
          title: "Vysvětlení postupu jednoduchým jazykem",
          text: "Stručně, jak vrtání probíhá a co zákazník může čekat, bez odborného žargonu, který spíš odradí, než přesvědčí, ale s dostatkem konkrétních detailů, aby to nepůsobilo povrchně.",
        },
      ]}
      cenikLead="Studnařské firmě obvykle stačí Online Vizitka s referencemi a oblastí působnosti, od 7 499 Kč, hotovo do 5 pracovních dní. Při rozsáhlejší prezentaci s vysvětlením postupu a povolení se hodí Promo Page od 9 999 Kč. Web je vždy responzivní, protože zákazníci ho často procházejí přímo na pozemku."
      slug="web-pro-studnare"
      serviceType="Tvorba webu pro studnaře"
      caseExampleTitle="Příklad zakázky: vrtaná studna pro rodinný dům"
      caseExampleText="Zákazník řeší zásobování vodou u nového pozemku a hledá firmu s prokazatelnou praxí v jeho kraji. Na webu vidí oblast působnosti, roky zkušeností a jednoduše popsaný postup vrtání, případně i zmínku o tom, že vyřídíte ohlášení na vodoprávním úřadě za něj. Přes formulář uvede lokalitu pozemku, orientační hloubku podzemní vody v okolí, pokud ji zná, a to, zda studnu potřebuje jako hlavní nebo záložní zdroj. Protože výsledek práce, tedy vydatnost a kvalita pramene, je pod zemí a nejde ho předem zkontrolovat, důvěra v ověřenou firmu tu rozhoduje víc než cena. Po vyvrtání a zapažení studny navíc doporučíte rozbor vody, ať zákazník ví, jestli je voda vhodná k pití bez dalších úprav."
      processSteps={[
        {
          title: "Poptávka s lokalitou",
          text: "Zákazník přes formulář uvede lokalitu pozemku, orientační požadavky na vydatnost vody a to, k čemu bude studna sloužit.",
        },
        {
          title: "Hydrogeologický průzkum a nacenění",
          text: "Podle lokality a místních geologických podmínek odhadnete hloubku vrtu a připravíte nabídku i orientační termín, případně doporučíte doplňkový hydrogeologický posudek.",
        },
        {
          title: "Vrtání a zapažení",
          text: "Na místě provedete vrtání, zapažení a instalaci čerpací techniky, u nových studní obvykle následuje i rozbor kvality vody.",
        },
        {
          title: "Předání a dokumentace",
          text: "Po dokončení předáte dokumentaci k vrtu a případný rozbor vody, zákazník tak ví přesně, co od studny čekat.",
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
          a: "Stručný, věcný popis kroků, průzkum, vrtání, zapažení, testování vydatnosti, působí důvěryhodněji než obecná prodejní fráze, a přesně takhle texty společně nastavíme.",
        },
        {
          q: "Řešíte za zákazníka i povolení na vodoprávním úřadě?",
          a: "Pokud tuhle službu nabízíte, patří krátká zmínka o vyřízení ohlášení nebo povolení přímo k přehledu služeb, ať zákazník ví, že se nemusí s úřadem trápit sám.",
        },
        {
          q: "Dá se na web přidat i info o rozboru vody po dokončení studny?",
          a: "Ano, zmínka o tom, že po vyvrtání doporučujete nebo zajišťujete rozbor kvality vody, patří k přehledu služeb a ukazuje zákazníkovi, že zakázka nekončí u samotného vrtání.",
        },
        {
          q: "Dá se na web přidat i servis nebo čištění starších studní?",
          a: "Ano, pokud tuhle službu nabízíte, patří jako samostatná položka vedle nové výstavby, hodně poptávek totiž řeší spíš pokles vydatnosti staré studny než vrtání nové.",
        },
      ]}
      relatedSlugs={["web-pro-instalatery", "web-pro-sanace", "web-pro-remeslniky"]}
    />
  );
}
