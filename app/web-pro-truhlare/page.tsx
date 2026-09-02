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
      subhead="Web pro truhláře a tesaře musí hlavně přesvědčit, že zvládnete přesně tu zakázku, o kterou se klient zajímá — kuchyňskou linku, vestavěnou skříň nebo krovovou konstrukci. Nejrychleji to ukáže galerie hotové práce."
      bullets={[
        {
          title: "Galerie realizací podle typu zakázky",
          text: "Kuchyně, nábytek na míru, tesařské práce zvlášť, ať klient hned najde, co hledá.",
        },
        {
          title: "Detail zpracování na fotkách",
          text: "Detailní záběry spojů a povrchové úpravy, které ukážou preciznost práce lépe než popis.",
        },
        {
          title: "Rychlá poptávka s nahráním inspirace",
          text: "Formulář, kam klient rovnou přiloží fotku inspirace nebo prostoru, ať zakázku popíšete přesně.",
        },
      ]}
      cenikLead="Pro truhláře s galerií realizací obvykle stačí Online Vizitka od 7 499 Kč, u rozsáhlejší prezentace víc kategorií práce se hodí Promo Page od 9 999 Kč."
      slug="web-pro-truhlare"
      serviceType="Tvorba webu pro truhláře"
      caseExampleTitle="Příklad zakázky: kuchyňská linka na míru"
      caseExampleText="Klient poptává kuchyňskou linku přes formulář na webu, přiloží fotku prostoru a orientační rozměry. Ještě před první schůzkou mu můžete poslat pár návrhů z galerie v podobném stylu — klient tak vidí, co může čekat, a spolupráce se rychleji posune k závazné nabídce."
      processHeading="Jak obvykle probíhá zakázka"
      processSteps={[
        {
          title: "Poptávka s fotkou prostoru",
          text: "Klient přes web pošle rozměry a fotku místnosti, ať víte, o jak velkou zakázku jde, ještě než vyrazíte na zaměření.",
        },
        {
          title: "Zaměření a návrh",
          text: "Na místě doladíte přesné rozměry a materiál, klientovi ukážete podobné realizace z galerie webu.",
        },
        {
          title: "Výroba a montáž",
          text: "Po odsouhlasení návrhu kus vyrobíte a namontujete, fotku hotové práce přidáte zpět do galerie pro další poptávky.",
        },
      ]}
      faqs={[
        {
          q: "Musím mít profesionální fotky realizací?",
          a: "Ne, stačí ostré fotky z mobilu při dobrém světle. Poradím, jak je nafotit, ať na webu vypadají dobře.",
        },
        {
          q: "Dá se poptávkový formulář přizpůsobit typu zakázky?",
          a: "Ano, formulář nastavím tak, aby se pole měnila podle vybraného typu zakázky — u kuchyně se zeptá na rozměry a spotřebiče, u tesařiny třeba na typ konstrukce.",
        },
        {
          q: "Jak často mám galerii realizací aktualizovat?",
          a: "Ideálně po každé větší zakázce přidat pár fotek. Čerstvé realizace působí důvěryhodněji a jsou i signál pro Google, že se web mění.",
        },
      ]}
      relatedSlugs={["web-pro-rezbare", "web-pro-zamecniky", "web-pro-remeslniky"]}
    />
  );
}
