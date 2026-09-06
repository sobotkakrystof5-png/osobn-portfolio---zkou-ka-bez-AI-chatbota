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
      subhead="Web pro malíře pokojů stavím kolem srovnání před a po. U malířských a natěračských prací totiž lidi nejvíc přesvědčí vidět rozdíl na vlastní oči, mnohem víc než dlouhý popis technologie nebo výčet použitých barev. Druhá důležitá věc je rychlost poptávky, malíř často dostává poptávky mezi zakázkami a nemá čas na dlouhé telefonáty."
      bullets={[
        {
          title: "Fotky před a po vedle sebe",
          text: "Nejsilnější argument, jaký malířská firma má. Návštěvník okamžitě vidí, jaký rozdíl vaše práce dělá, a to rychleji než u jakéhokoli popisu textem nebo výčtu zkušeností.",
        },
        {
          title: "Přehled prováděných prací",
          text: "Malování, štukování, tapetování a nátěry, krátce a jasně, ať zákazník hned pozná, jestli řešíte přesně jeho zakázku, včetně případných fasádních nebo dekorativních technik, jako je stěrková omítka.",
        },
        {
          title: "Práce s barvami a povrchy",
          text: "Krátká zmínka o používaných materiálech, třeba prodyšné barvy do vlhčích místností nebo lazury na dřevěné obklady, ukáže zákazníkovi, že materiál volíte podle typu povrchu a účelu místnosti, ne podle nejlevnější varianty na trhu.",
        },
        {
          title: "Rychlá poptávka s fotkou prostoru",
          text: "Formulář, kam zákazník nahraje fotku místnosti a napíše orientační termín. Usnadní vám odhad rozsahu práce ještě před první schůzkou a ušetří cestu jen kvůli prohlídce.",
        },
      ]}
      cenikLead="Pro malířskou firmu se nejvíc hodí Online Vizitka s galerií před a po, od 7 499 Kč, hotovo do 5 pracovních dní. Při rozsáhlejší nabídce (fasády, dekorativní techniky) se hodí Promo Page od 9 999 Kč. Web je vždy responzivní, protože většina poptávek dnes přichází z mobilu."
      slug="web-pro-malire"
      serviceType="Tvorba webu pro malíře pokojů"
      caseExampleTitle="Příklad zakázky: malování bytu před nastěhováním"
      caseExampleText="Zákazník řeší vymalování bytu před nastěhováním a v galerii před a po hledá podobný rozsah práce, třeba celý byt nebo jen obývací pokoj a ložnici. Přes formulář nahraje fotku prostoru a napíše orientační termín stěhování, ať mu dokážete odhadnout rozsah práce ještě před první schůzkou. Pokud stěny potřebují víc než nátěr, třeba stržení staré tapety nebo opravu omítky, zmíní to rovnou v poptávce a vy připravíte nabídku, která počítá i s přípravnými pracemi. Termín se často odvíjí od data stěhování, které bývá pevně dané, takže rychlá odpověď na poptávku rozhoduje o tom, jestli zakázku stihnete zařadit do kalendáře. Po prohlídce navíc můžete doporučit, jestli má smysl vymalovat celý byt najednou, nebo stačí místnosti, které jsou nejvíc opotřebené."
      processSteps={[
        {
          title: "Poptávka s fotkou prostoru",
          text: "Zákazník přes formulář popíše rozsah práce, termín a přiloží fotku místnosti, případně informaci o stavu stěn.",
        },
        {
          title: "Odhad a termín",
          text: "Podle fotky a rozsahu domluvíte orientační cenu a volný termín, u větších zakázek i osobní prohlídku před závaznou nabídkou a přesným rozpisem prací.",
        },
        {
          title: "Příprava povrchu",
          text: "Před samotným malováním opravíte praskliny, přebrousíte nebo natáhnete štuk. Kvalita přípravy rozhoduje o výsledném vzhledu víc než samotný nátěr.",
        },
        {
          title: "Realizace a fotodokumentace",
          text: "Po dokončení práce přidáte fotky před a po do galerie, ať slouží jako argument pro další poptávky a zákazníkům podobného rozsahu zakázky.",
        },
      ]}
      faqs={[
        {
          q: "Kolik fotek před a po je potřeba na spuštění webu?",
          a: "Stačí 4 až 6 kvalitních párů fotek. Zbytek galerie můžete průběžně doplňovat po dalších zakázkách, ukážu vám jak, ať to zabere jen pár minut a nemusíte kvůli tomu volat mně.",
        },
        {
          q: "Dá se poptávkový formulář přizpůsobit typu práce?",
          a: "Ano, formulář rozšíříme o výběr typu práce (malování, štukování, tapetování), ať víte hned při poptávce, o jaký rozsah zakázky jde a kolik na ni potřebujete času.",
        },
        {
          q: "Jak nejlíp na webu ukázat rozdíl mezi malováním a kompletní rekonstrukcí povrchu?",
          a: "Krátký popis u každé služby s vlastní fotkou před a po pomůže zákazníkovi rychle poznat, jakou práci vlastně potřebuje, a ne si ji splést s levnějším úkonem.",
        },
        {
          q: "Dá se na web přidat info o používaných barvách a materiálech?",
          a: "Ano, krátký přehled používaných barev nebo technik, třeba prodyšné barvy do koupelen nebo lazury na dřevo, pomůže zákazníkovi pochopit, že materiál volíte podle konkrétního prostoru.",
        },
        {
          q: "Musí zákazník před malováním vyklidit celý byt?",
          a: "Ne vždy, nábytek a podlahu obvykle zakryjeme fólií přímo na místě. Úplné vyklizení místnosti se hodí spíš u větších oprav omítek nebo štukování, na webu to stojí za to rovnou vysvětlit.",
        },
        {
          q: "Poskytujete na malířské práce záruku?",
          a: "Pokud na práci záruku dáváte, krátká zmínka o její délce patří k přehledu služeb, u nátěrů a štukování zákazníky často zajímá, jak dlouho má povrch vydržet bez oprav.",
        },
      ]}
      relatedSlugs={["web-pro-sanace", "web-pro-zahradniky", "web-pro-remeslniky"]}
    />
  );
}
