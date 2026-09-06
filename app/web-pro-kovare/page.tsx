import type { Metadata } from "next";
import Link from "next/link";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro kováře na míru",
    description:
      "Tvorba webu pro uměleckého kováře na míru, velkoformátová galerie realizací a poptávkový formulář na zakázku, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-kovare" },
    openGraph: {
      title: "Web pro kováře na míru | VIZEON",
      description: "Kovářství web na míru, s prostorem pro fotky, které ukážou řemeslo v detailu, ne jen produkt.",
      url: "https://vizeon.cz/web-pro-kovare",
      type: "website",
    },
  };
}

export default function WebProKovarePage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro kováře"
      h1="Web na míru pro kováře"
      subhead="Web pro kováře potřebuje jinou práci s fotkami než běžná firemní prezentace. Umělecké kovářství se prodává detailem, strukturou kovu, tepanými prvky i ruční prací, kterou fotka z mobilu často nedokáže vystihnout. Zákazník navíc často řeší i citlivější zakázku, třeba opravu staršího plotu nebo vrat u památkově chráněné budovy, a chce vidět, že vaše práce obstojí i tam. Web proto musí unést velké fotky v plné kvalitě, ne jen zmenšené náhledy jako u běžného e-shopu."
      bullets={[
        {
          title: "Velkoformátová galerie s detaily",
          text: "Prostor pro fotky v plné kvalitě, které ukážou strukturu kovu a ruční práci zblízka. Žádné zmenšené náhledy, kde detail zanikne, ať už jde o tepaný prvek nebo svar.",
        },
        {
          title: "Zakázková práce jako hlavní nabídka",
          text: "Brány, mříže, schodišťová zábradlí i umělecké objekty na míru. Web to prezentuje jako individuální zakázku podle rozměru a stylu konkrétního prostoru, s cenou odvozenou od zadání, ne z fixního ceníku.",
        },
        {
          title: "Restaurování a citlivé zakázky",
          text: "Repase kovaných vrat, plotů nebo mříží u starších a památkově chráněných staveb je jiná disciplína než nová výroba. Web na ni může upozornit samostatně, ať vás najdou i zákazníci hledající přímo tuhle specializaci a nezajímavou nabídku od konkurence bez zkušenosti s historickými prvky.",
        },
        {
          title: "Poptávkový formulář pro individuální návrh",
          text: "Zákazník rovnou popíše, co potřebuje (rozměr, styl, umístění), případně přiloží inspirační fotku, a vy dostanete poptávku se vším podstatným ještě před první schůzkou nebo zaměřením na místě.",
        },
      ]}
      cenikLead="U kovářské prezentace se nejvíc osvědčí Promo Page s důrazem na fotogalerii, od 9 999 Kč, hotovo do 10 pracovních dní. Pro jednodušší prezentaci s menší galerií stačí i Online Vizitka od 7 499 Kč. Fotky se vždy optimalizují tak, aby zůstal viditelný detail práce, ale web se nezpomalil."
      slug="web-pro-kovare"
      serviceType="Tvorba webu pro kováře"
      portfolioNote={
        <>
          Kovovýrobu jsem řešil i pro{" "}
          <Link href="/ukazky-webu" className="text-[#c9a84c] hover:underline">
            Schovinox
          </Link>
          , zámečnickou a kovářskou firmu s 40letou rodinnou tradicí.
        </>
      }
      caseExampleTitle="Příklad zakázky: kovaná brána na míru"
      caseExampleText="Zákazník osloví přes poptávkový formulář s popisem stylu (rustikální, moderní, kovaná secese) a orientačním rozměrem vjezdu, případně přiloží fotku inspirace nalezenou online. Vy mu na základě podobných realizací z galerie připravíte první návrh ještě před osobní schůzkou, protože u zakázkové kovářské práce rozhoduje vizuální shoda ve stylu víc než cena. Na schůzce nebo při zaměření na místě doladíte přesný rozměr, materiál a způsob kotvení, u historických objektů i to, jestli je potřeba práci konzultovat s památkáři, což může termín realizace prodloužit o schvalovací proces. Po odsouhlasení návrhu výrobu zahájíte ve výhni a fotky z procesu, kování, svařování, broušení i patinování, se po dokončení dají přidat do galerie jako důkaz řemeslné práce, ne jen hotového výsledku."
      processSteps={[
        {
          title: "Poptávka se stylem a rozměrem",
          text: "Zákazník popíše představu, orientační rozměr a přiloží inspiraci, ať víte, jakým směrem návrh vést ještě před první schůzkou.",
        },
        {
          title: "Návrh a konzultace",
          text: "Na základě galerie a poptávky navrhnete provedení, detaily jako materiál, povrchovou úpravu nebo způsob kotvení doladíte na schůzce nebo na dálku.",
        },
        {
          title: "Kovářská práce",
          text: "Ve výhni kus vykováte a svaříte podle návrhu, u větších realizací (brány, zábradlí) postup rozdělíte na etapy a zákazníka průběžně informujete o stavu zakázky.",
        },
        {
          title: "Instalace a předání",
          text: "Hotové dílo nainstalujete na místě, včetně případné povrchové úpravy nebo patinování, a fotky z procesu i hotové práce doplníte do galerie pro další poptávky.",
        },
      ]}
      faqs={[
        {
          q: "Zvládne web dobře zobrazit fotky ve vysokém rozlišení, aniž by se zpomalil?",
          a: "Ano, fotky optimalizuji tak, aby se načítaly rychle i na mobilu, ale detail práce zůstal čitelný. Rychlost webu totiž vaše zakázky neprodá o nic míň než kvalitní fotka, spíš naopak, pomalý web zákazník opustí dřív, než galerii vůbec uvidí.",
        },
        {
          q: "Dá se galerie řadit podle typu výrobku, třeba brány nebo mříže zvlášť?",
          a: "Ano, kategorie v galerii nastavím podle toho, jak dělíte nabídku vy, ať zákazník rychle najde podobnou realizaci a nemusí procházet stovky fotek jiného typu výrobku.",
        },
        {
          q: "Zvládne web ukázat i proces výroby, ne jen hotový výsledek?",
          a: "Ano, krátká sekce nebo pár fotek z procesu, kování, svařování, broušení, u umělecké práce často přesvědčí víc než jen finální snímek, protože ukazuje ruční práci za výsledkem.",
        },
        {
          q: "Berete i zakázky na opravu nebo repasi starších kovaných prvků?",
          a: "Ano, oprava plotu, vrat nebo mříže u starší stavby je běžná zakázka. Na webu jí můžeme věnovat samostatnou zmínku nebo kategorii v galerii, ať vás najdou i zákazníci hledající přímo tuhle specializaci, ne jen novou výrobu.",
        },
      ]}
      relatedSlugs={["web-pro-zamecniky", "web-pro-rezbare", "web-pro-truhlare"]}
    />
  );
}
