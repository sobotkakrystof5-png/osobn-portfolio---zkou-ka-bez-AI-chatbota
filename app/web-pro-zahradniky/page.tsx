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
      subhead="Web pro zahradníky a úpravy zahrad stavím kolem srovnání před a po, je to nejsilnější argument, který zákazníka přesvědčí rychleji než jakýkoli popis prací. Druhá důležitá věc je sezónnost, nabídka se v průběhu roku mění a web to musí umět odrážet, ať už jde o jarní zakládání trávníků, nebo podzimní úklid listí."
      bullets={[
        {
          title: "Galerie před a po",
          text: "Srovnávací fotky proměny zahrady na jednom místě, řazené podle typu úpravy, třeba trávník, výsadba nebo kompletní přestavba pozemku.",
        },
        {
          title: "Přehled služeb podle sezóny",
          text: "Zakládání trávníků, údržba, návrhy zahrad zvlášť, ať zákazník hned pozná, co aktuálně potřebuje, a co má naopak smysl řešit až v jiném ročním období, třeba výsadbu na podzim.",
        },
        {
          title: "Pravidelná údržba jako samostatná nabídka",
          text: "Kosení, stříhání keřů a zálivka na sezónní smlouvu jsou jiná zakázka než jednorázová realizace zahrady. Web to má nabízet odděleně, ať to zákazník nepřehlédne mezi jednorázovými pracemi a fotkami větších proměn.",
        },
        {
          title: "Rychlá poptávka s adresou pozemku",
          text: "Jednoduchý formulář, kam zákazník rovnou napíše rozlohu a typ úpravy, ať víte, o jakou zakázku jde ještě před první prohlídkou a nemusíte jezdit jen kvůli orientačnímu odhadu.",
        },
      ]}
      cenikLead="Pro prezentaci s galerií před a po obvykle stačí Online Vizitka od 7 499 Kč, u rozsáhlejší nabídky služeb (realizace i pravidelná údržba) se hodí Promo Page od 9 999 Kč. Aktuální sezónní nabídku si po spuštění webu měníte sami."
      slug="web-pro-zahradniky"
      serviceType="Tvorba webu pro zahradníky"
      caseExampleTitle="Příklad zakázky: kompletní úprava zahrady"
      caseExampleText="Zákazník řeší zanedbanou zahradu u nového bydlení, v galerii před a po najde podobně rozsáhlou proměnu a přes formulář pošle adresu pozemku, orientační rozlohu a představu, jestli chce spíš údržbovou zahradu nebo náročnější výsadbu. Rozhoduje se hlavně podle vizuálního výsledku předchozích realizací, fotky proto nesou většinu prodejní síly webu, popis služeb slouží spíš jako doplnění. Na prohlídce navíc zhodnotíte typ půdy a osvětlení pozemku, což ovlivní, jaké rostliny budou mít šanci se dobře ujmout, a případně doporučíte zavlažovací systém, pokud pozemek nemá přístup k pravidelné zálivce. Po realizaci mu často nabídnete i pravidelnou údržbu na sezónní smlouvu, protože zákazník, kterému jste zahradu založili, řeší dřív nebo později i to, kdo mu ji bude kosit a stříhat."
      processSteps={[
        {
          title: "Poptávka s adresou pozemku",
          text: "Zákazník přes formulář popíše rozlohu a typ úpravy, kterou potřebuje, případně přiloží fotku aktuálního stavu zahrady.",
        },
        {
          title: "Prohlídka a návrh",
          text: "Na místě zhodnotíte pozemek, půdu a světelné podmínky a navrhnete rozsah prací podle sezóny i rozpočtu zákazníka.",
        },
        {
          title: "Realizace",
          text: "Práce provedete v domluveném termínu, u výsadby podle vhodného ročního období, ať se rostliny dobře ujmou a nemusely se dosazovat.",
        },
        {
          title: "Dokumentace a nabídka údržby",
          text: "Po dokončení fotky před a po přidáte do galerie a zákazníkovi nabídnete navazující pravidelnou údržbu na sezónní smlouvu.",
        },
      ]}
      faqs={[
        {
          q: "Dá se web přizpůsobit sezónnosti poptávek?",
          a: "Ano, aktuální nabídku (třeba jarní úpravy nebo podzimní úklid) můžete sami měnit podle sezóny, ukážu vám jak.",
        },
        {
          q: "Dá se galerie před a po řadit podle typu úpravy?",
          a: "Ano, kategorie v galerii nastavím podle vaší nabídky (trávník, keře, celková proměna), ať zákazník rychle najde realizaci podobnou té svojí.",
        },
        {
          q: "Jak často je potřeba galerii aktualizovat, aby web působil aktivně?",
          a: "Stačí přidat pár fotek po větších zakázkách, ideálně v hlavní sezóně. Čerstvé realizace budí důvěru a jsou i signál pro Google, že web žije.",
        },
        {
          q: "Dá se na web přidat samostatná nabídka pravidelné údržby vedle jednorázových realizací?",
          a: "Ano, údržbu na sezónní smlouvu má smysl nabízet samostatně, ať ji zákazník nepřehlédne mezi fotkami větších realizací zahrad.",
        },
        {
          q: "Dá se na web přidat i info o vhodném ročním období pro jednotlivé práce?",
          a: "Ano, krátká poznámka u služby, třeba že výsadba dřevin se dělá na podzim a zakládání trávníku na jaře, pomůže zákazníkovi lépe naplánovat poptávku podle sezóny.",
        },
        {
          q: "Dá se na web přidat i závlahové systémy nebo automatická zálivka jako samostatná služba?",
          a: "Ano, pokud tuhle službu nabízíte, patří jako samostatná položka do přehledu, hodně zákazníků ji řeší až po založení zahrady jako doplněk k pravidelné údržbě.",
        },
        {
          q: "Dá se na web přidat i info o použitých rostlinách a jejich náročnosti na péči?",
          a: "Ano, krátká poznámka u realizace, jaké druhy jste vysadili a jak náročná je jejich údržba, pomůže zákazníkovi rozhodnout se mezi nižší a vyšší údržbou zahrady.",
        },
      ]}
      relatedSlugs={["web-pro-malire", "web-pro-sanace", "web-pro-remeslniky"]}
    />
  );
}
