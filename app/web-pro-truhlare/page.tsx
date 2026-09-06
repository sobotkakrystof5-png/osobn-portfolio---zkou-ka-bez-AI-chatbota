import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro truhláře na míru",
    description:
      "Tvorba webu pro truhláře a tesaře na míru, galerie realizací podle typu zakázky, rychlá poptávka, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-truhlare" },
    openGraph: {
      title: "Web pro truhláře na míru | VIZEON",
      description: "Web, který ukáže preciznost zpracování — kuchyně, nábytek na míru i tesařské práce.",
      url: "https://vizeon.cz/web-pro-truhlare",
      type: "website",
    },
  };
}

export default function WebProTruhlarePage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro truhláře"
      h1="Web pro truhláře, který ukáže kvalitu zpracování"
      subhead="Web pro truhláře a tesaře musí hlavně přesvědčit, že zvládnete přesně tu zakázku, o kterou se klient zajímá, kuchyňskou linku, vestavěnou skříň nebo krovovou konstrukci. Nejrychleji to ukáže galerie hotové práce, druhotně pak přehled druhů dřeva a povrchových úprav, které nabízíte. Klient si totiž teprve po prohlédnutí realizací dokáže představit, jak by mohla vypadat jeho vlastní zakázka."
      bullets={[
        {
          title: "Galerie realizací podle typu zakázky",
          text: "Kuchyně, nábytek na míru, tesařské práce zvlášť, ať klient hned najde, co hledá, a nemusí procházet realizace, které se ho netýkají.",
        },
        {
          title: "Detail zpracování na fotkách",
          text: "Detailní záběry spojů, kování a povrchové úpravy, které ukážou preciznost práce lépe než jakýkoli popis textem. U truhlářiny se totiž kvalita pozná hlavně na detailu, ne na celkovém pohledu.",
        },
        {
          title: "Materiály a povrchové úpravy",
          text: "Krátký přehled druhů dřeva, dýhy nebo lamina, které zpracováváte, pomůže klientovi zorientovat se v možnostech ještě před poptávkou a lépe popsat, co si představuje, včetně orientační ceny podle zvoleného materiálu.",
        },
        {
          title: "Rychlá poptávka s nahráním inspirace",
          text: "Formulář, kam klient rovnou přiloží fotku inspirace nebo prostoru a orientační rozměry, ať zakázku popíšete přesně už při prvním kontaktu a nemusíte se doptávat dalšími zprávami.",
        },
      ]}
      cenikLead="Pro truhláře s galerií realizací obvykle stačí Online Vizitka od 7 499 Kč, u rozsáhlejší prezentace víc kategorií práce se hodí Promo Page od 9 999 Kč, hotovo do 10 pracovních dní. Fotky v galerii se vždy optimalizují, ať se web nezpomalí ani při větším počtu realizací."
      slug="web-pro-truhlare"
      serviceType="Tvorba webu pro truhláře"
      caseExampleTitle="Příklad zakázky: kuchyňská linka na míru"
      caseExampleText="Klient poptává kuchyňskou linku přes formulář na webu, přiloží fotku prostoru, orientační rozměry a napíše, jaké spotřebiče chce zabudovat. Ještě před první schůzkou mu můžete poslat pár návrhů z galerie v podobném stylu, klient tak vidí, co může čekat, a spolupráce se rychleji posune k závazné nabídce. Při zaměření na místě se pak řeší hlavně detaily, typ dvířek, úchytky, pracovní deska, protože hrubou představu o stylu a rozpočtu si klient udělal už na webu. To zkracuje celou fázi vyjednávání a šetří vám cesty za klienty, kteří by si nakonec vybrali úplně jiný styl. U větších zakázek, jako je kompletní kuchyně na míru, se navíc vyplatí rovnou na webu naznačit, kolik týdnů výroba i montáž zaberou, ať klient plánuje reálně."
      processHeading="Jak obvykle probíhá zakázka"
      processSteps={[
        {
          title: "Poptávka s fotkou prostoru",
          text: "Klient přes web pošle rozměry a fotku místnosti, ať víte, o jak velkou zakázku jde, ještě než vyrazíte na zaměření a připravíte si orientační materiál.",
        },
        {
          title: "Zaměření a návrh",
          text: "Na místě doladíte přesné rozměry a materiál, klientovi ukážete podobné realizace z galerie webu a domluvíte detaily provedení jako typ dvířek nebo úchytek.",
        },
        {
          title: "Výroba v dílně",
          text: "Kus vyrobíte podle odsouhlaseného návrhu, u větších zakázek (kuchyně, vestavěné skříně) klienta průběžně informujete o stavu výroby a případných změnách termínu.",
        },
        {
          title: "Montáž a předání",
          text: "Hotový kus namontujete na místě, doladíte drobné úpravy a fotku hotové práce přidáte zpět do galerie pro další poptávky.",
        },
      ]}
      faqs={[
        {
          q: "Musím mít profesionální fotky realizací?",
          a: "Ne, stačí ostré fotky z mobilu při dobrém světle. Poradím, jak je nafotit, ať na webu vypadají dobře.",
        },
        {
          q: "Dá se poptávkový formulář přizpůsobit typu zakázky?",
          a: "Ano, formulář nastavím tak, aby se pole měnila podle vybraného typu zakázky, u kuchyně se zeptá na rozměry a spotřebiče, u tesařiny třeba na typ konstrukce.",
        },
        {
          q: "Jak často mám galerii realizací aktualizovat?",
          a: "Ideálně po každé větší zakázce přidat pár fotek. Čerstvé realizace působí důvěryhodněji a jsou i signál pro Google, že se web mění.",
        },
        {
          q: "Dá se na web přidat přehled materiálů a povrchových úprav, které nabízím?",
          a: "Ano, krátký přehled dřevin, dýh nebo laminů s fotkou vzorku pomůže klientovi udělat si představu o možnostech ještě před tím, než napíše poptávku.",
        },
        {
          q: "Jak dlouho trvá výroba kuchyně nebo většího nábytku na míru?",
          a: "Podle rozsahu obvykle týdny až měsíc, na web doplníme orientační dobu výroby zvlášť pro menší kusy a zvlášť pro rozsáhlejší zakázky, ať klient ví, s čím počítat.",
        },
        {
          q: "Dá se na web přidat i informace o záruce na výrobky?",
          a: "Ano, krátká zmínka o záruční době a o tom, co dělat v případě reklamace, patří k důvěryhodné prezentaci a klienta ujistí ještě před podpisem zakázky.",
        },
      ]}
      relatedSlugs={["web-pro-rezbare", "web-pro-zamecniky", "web-pro-remeslniky"]}
    />
  );
}
