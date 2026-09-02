import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro řezbáře na míru",
    description:
      "Tvorba webu pro řezbáře na míru — prezentace řezbářských prací online s galerií a poptávkou na zakázku, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-rezbare" },
    openGraph: {
      title: "Web pro řezbáře na míru | VIZEON",
      description: "Řezbářství web na míru — prezentace originálních prací, ne katalog s cenovkami.",
      url: "https://vizeon.cz/web-pro-rezbare",
      type: "website",
    },
  };
}

export default function WebProRezbarePage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro řezbáře"
      h1="Web na míru pro řezbáře"
      subhead="Každá řezbářská práce je originál, takže web pro řezbáře nemá prodávat jako e-shop s cenovkami — má vyprávět, kdo řezbu vytvořil a proč je jedinečná, a pak nechat zákazníka poptat vlastní zakázku."
      bullets={[
        {
          title: "Galerie řazená podle stylu nebo materiálu",
          text: "Sochy, reliéfy, betlémy nebo užitné předměty — přehledné rozdělení pomůže zákazníkovi najít styl, který hledá, mnohem rychleji než jedna dlouhá fotogalerie.",
        },
        {
          title: "Prostor pro příběh každé práce",
          text: "Krátký popis u realizace — materiál, inspirace, doba práce. U ruční tvorby rozhoduje příběh skoro stejně jako fotka.",
        },
        {
          title: "Poptávka na zakázku podle inspirace",
          text: "Formulář, kam zákazník nahraje inspirační fotku nebo popíše představu — místo obecného 'napište nám' e-mailu.",
        },
      ]}
      cenikLead="Pro řezbářskou prezentaci s galerií realizací se nejčastěji hodí Online Vizitka nebo Promo Page — od 7 499 Kč, hotovo do 10 pracovních dní."
      slug="web-pro-rezbare"
      serviceType="Tvorba webu pro řezbáře"
      caseExampleTitle="Příklad zakázky: řezbovaný betlém na objednávku"
      caseExampleText="Zákazník si v galerii prohlédne hotové betlémy podle stylu a přes formulář popíše, jakou variantu a velikost by chtěl, případně přiloží inspirační fotku. U řezbářské práce rozhoduje hlavně to, jestli vám zákazník věří styl — proto galerie a příběh za každou prací dělají větší část prodejní práce než cena."
      processSteps={[
        {
          title: "Výběr stylu v galerii",
          text: "Zákazník si podle fotek vybere styl a materiál, který se mu líbí.",
        },
        {
          title: "Poptávka s představou",
          text: "Přes formulář popíše velikost, motiv, nebo rovnou přiloží inspiraci.",
        },
        {
          title: "Tvorba a předání",
          text: "Zakázku vyřežete a hotovou práci s krátkým příběhem přidáte zpět do galerie.",
        },
      ]}
      faqs={[
        {
          q: "Můžu si obsah galerie po spuštění webu doplňovat sám?",
          a: "Ano, dostanete přístupy a krátký návod, jak přidávat nové realizace — nemusíte kvůli každé fotce psát mně.",
        },
        {
          q: "Dá se ke každé fotce v galerii přidat i krátký popis, třeba materiál nebo dobu práce?",
          a: "Ano, u řezbářské práce se krátký příběh k realizaci vyplatí — ukazuje řemeslnou hodnotu, kterou samotná fotka nepředá.",
        },
        {
          q: "Jak velkou galerii web unese, když mám desítky realizací?",
          a: "Klidně desítky i stovky fotek rozdělených do kategorií, galerii navrhnu tak, aby se i s větším počtem fotek rychle načítala.",
        },
      ]}
      relatedSlugs={["web-pro-truhlare", "web-pro-kovare", "web-pro-remeslniky"]}
    />
  );
}
