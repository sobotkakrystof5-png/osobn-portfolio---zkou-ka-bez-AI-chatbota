import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro kosmetičky na míru",
    description:
      "Tvorba webu pro kosmetický salon na míru, online rezervace, galerie proměn, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-kosmeticky" },
    openGraph: {
      title: "Web pro kosmetičky na míru | VIZEON",
      description: "Web s online rezervací, kde se klientka objedná na ošetření sama, bez volání.",
      url: "https://vizeon.cz/web-pro-kosmeticky",
      type: "website",
    },
  };
}

export default function WebProKosmetickyPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro kosmetičky"
      h1="Web pro kosmetičky, kde se klientka objedná bez volání"
      subhead="Web pro kosmetický salon řeším podobně jako u kadeřnictví, s důrazem na online rezervaci a galerii, která ukáže výsledky ošetření dřív, než klientka napíše zprávu. Rozdíl je v tom, že u kosmetiky klientka mnohem víc řeší i to, jaké produkty a postupy při ošetření používáte, hlavně pokud má citlivou pleť nebo předchozí špatnou zkušenost. Web proto musí kromě rezervace zvládnout i tenhle typ informace přehledně a bez zbytečného odborného žargonu."
      bullets={[
        {
          title: "Online rezervační systém",
          text: "Klientka si vybere ošetření a termín sama, i večer nebo o víkendu, bez telefonátu a čekání na odpověď, kalendář navíc hlídá potřebnou délku jednotlivých procedur.",
        },
        {
          title: "Galerie proměn a ošetření",
          text: "Fotky před a po a ukázky práce budují důvěru rychleji než jakýkoli popis v textu, hlavně u viditelných ošetření jako řasy, obočí nebo pleť.",
        },
        {
          title: "Přehled ošetření a ceník",
          text: "Jasně rozdělené kategorie (pleť, nehty, řasy) s orientační cenou a délkou trvání, ať klientka ví, co si objednává, a nemusí se ptát na cenu předem ani na to, kolik času má procedura zabrat.",
        },
        {
          title: "Informace o použitých přípravcích a hygieně",
          text: "Krátká zmínka o značkách kosmetiky, kterou používáte, a hygienických standardech salonu, patří k tomu, čím si klientka před první návštěvou ověřuje důvěryhodnost, zvlášť u ošetření pleti nebo řas.",
        },
      ]}
      cenikLead="Prezentace s galerií a ceníkem obvykle vychází jako Online Vizitka od 7 499 Kč nebo Promo Page od 9 999 Kč, hotovo do 10 pracovních dní. Rezervační systém se řeší jako webová aplikace zvlášť, podle toho, kolik procedur a kosmetiček najednou potřebujete spravovat. Web je vždy responzivní, protože klientky rezervaci nejčastěji řeší z mobilu večer po práci."
      slug="web-pro-kosmeticky"
      serviceType="Tvorba webu pro kosmetičky"
      caseExampleTitle="Příklad zakázky: první návštěva na kosmetické ošetření"
      caseExampleText="Klientka hledá kosmetický salon večer po práci, prohlédne si galerii proměn a ceník, a rovnou v rezervačním systému vybere volný termín na pleťové ošetření, bez zprávy a čekání na odpověď. Rozhodne se rychleji, když vidí přesnou cenu, fotky výsledků a konkrétní popis, co ošetření zahrnuje, mnohem rychleji než u obecného popisu „kosmetické služby“. Před první návštěvou si navíc často ověří, jaké přípravky salon používá, hlavně pokud má citlivou pleť nebo alergii, krátká zmínka o používaných značkách proto pomůže rozptýlit poslední pochybnosti před rezervací. Systém jí navíc den před termínem pošle připomínku, ať na ošetření nezapomene a vy nemusíte řešit prázdné termíny kvůli zapomenutým rezervacím."
      processSteps={[
        {
          title: "Výběr ošetření",
          text: "Klientka si v přehledu ošetření a galerii proměn vybere, o co má zájem.",
        },
        {
          title: "Rezervace termínu",
          text: "V kalendáři na webu vybere volný termín sama, i mimo otvírací dobu.",
        },
        {
          title: "Ošetření",
          text: "V domluveném termínu provedete ošetření, u první návštěvy obvykle s krátkou konzultací typu pleti a případných citlivostí nebo alergií.",
        },
        {
          title: "Další péče",
          text: "Po ošetření může klientka přes web rovnou rezervovat navazující termín nebo dokoupit dárkový poukaz pro někoho dalšího, případně permanentku na pravidelnou péči.",
        },
      ]}
      faqs={[
        {
          q: "Dá se na web přidat prodej dárkových poukazů?",
          a: "Ano, dárkové poukazy patří mezi žádané doplňky i u kosmetických studií, vyřešíme je jako součást webové aplikace na míru.",
        },
        {
          q: "Dá se rezervační systém propojit s připomínkou termínu SMS zprávou?",
          a: "Ano, u většiny rezervačních řešení jde zapnout automatickou SMS nebo e-mailovou připomínku, která sníží počet zapomenutých termínů.",
        },
        {
          q: "Jak na web přidat fotky před a po bez porušení soukromí klientek?",
          a: "Vždy jen s výslovným souhlasem klientky, ideálně bez viditelné tváře, pokud ji sama nechce ukázat. Poradím, jak souhlas jednoduše získat.",
        },
        {
          q: "Dá se na web přidat info o používaných značkách kosmetiky?",
          a: "Ano, krátký přehled značek nebo řad, se kterými pracujete, pomůže klientkám s citlivou pletí nebo alergiemi rozhodnout se ještě před rezervací.",
        },
        {
          q: "Dá se na web přidat i prodej permanentek na pravidelná ošetření?",
          a: "Ano, prodej permanentek nebo balíčků ošetření se dá zabudovat jako součást webové aplikace na míru, klientkám to navíc usnadní opakované rezervace.",
        },
        {
          q: "Jak dlouho dopředu má klientka rezervovat termín na oblíbené ošetření?",
          a: "Záleží na poptávce po konkrétní proceduře, u oblíbených termínů (večery, soboty) se hodí na webu zmínit, že se rezervace naplňují rychle, ať klientka nečeká na poslední chvíli.",
        },
      ]}
      relatedSlugs={["web-pro-kadernictvi", "web-pro-masery-a-wellness", "web-pro-fitness-trenery", "web-pro-fotografy"]}
    />
  );
}
