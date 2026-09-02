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
      subhead="Web pro kováře potřebuje jinou práci s fotkami než běžná firemní prezentace. Umělecké kovářství se prodává detailem, strukturou kovu, tepanými prvky i ruční prací, kterou fotka z mobilu často nedokáže vystihnout."
      bullets={[
        {
          title: "Velkoformátová galerie s detaily",
          text: "Prostor pro fotky v plné kvalitě, které ukážou strukturu kovu a ruční práci zblízka. Žádné zmenšené náhledy, kde detail zanikne.",
        },
        {
          title: "Zakázková práce jako hlavní nabídka",
          text: "Brány, mříže, schodišťová zábradlí i umělecké objekty na míru. Web to prezentuje jako zakázku, ne jako katalogové zboží.",
        },
        {
          title: "Poptávkový formulář pro individuální návrh",
          text: "Zákazník rovnou popíše, co potřebuje (rozměr, styl, umístění), a vy dostanete poptávku se vším podstatným.",
        },
      ]}
      cenikLead="U kovářské prezentace se nejvíc osvědčí Promo Page s důrazem na fotogalerii, od 9 999 Kč, hotovo do 10 pracovních dní."
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
      caseExampleText="Zákazník osloví přes poptávkový formulář s popisem stylu (rustikální, moderní) a orientačním rozměrem vjezdu. Vy mu na základě podobných realizací z galerie připravíte první návrh ještě před osobní schůzkou — u zakázkové kovářské práce totiž vizuální shoda ve stylu rozhoduje víc než cena."
      processSteps={[
        {
          title: "Poptávka se stylem a rozměrem",
          text: "Zákazník popíše představu a přiloží inspiraci, ať víte, jakým směrem návrh vést.",
        },
        {
          title: "Návrh a konzultace",
          text: "Na základě galerie a poptávky navrhnete provedení, detaily doladíte na schůzce nebo na dálku.",
        },
        {
          title: "Kovářská práce a instalace",
          text: "Po odsouhlasení kus vyrobíte a nainstalujete, fotky z procesu i hotového díla doplníte do galerie.",
        },
      ]}
      faqs={[
        {
          q: "Zvládne web dobře zobrazit fotky ve vysokém rozlišení, aniž by se zpomalil?",
          a: "Ano, fotky optimalizuji tak, aby se načítaly rychle i na mobilu, ale detail práce zůstal čitelný. Rychlost webu totiž vaše zakázky neprodá o nic míň než kvalitní fotka.",
        },
        {
          q: "Dá se galerie řadit podle typu výrobku, třeba brány nebo mříže zvlášť?",
          a: "Ano, kategorie v galerii nastavím podle toho, jak dělíte nabídku vy, ať zákazník rychle najde podobnou realizaci.",
        },
        {
          q: "Zvládne web ukázat i proces výroby, ne jen hotový výsledek?",
          a: "Ano, krátká sekce nebo pár fotek z procesu — kování, svařování, broušení — u umělecké práce často přesvědčí víc než jen finální snímek.",
        },
      ]}
      relatedSlugs={["web-pro-zamecniky", "web-pro-rezbare", "web-pro-truhlare"]}
    />
  );
}
