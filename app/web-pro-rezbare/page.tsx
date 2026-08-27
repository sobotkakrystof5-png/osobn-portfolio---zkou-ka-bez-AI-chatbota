import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro řezbáře na míru | VIZEON",
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
      faqs={[
        {
          q: "Můžu si obsah galerie po spuštění webu doplňovat sám?",
          a: "Ano, dostanete přístupy a krátký návod, jak přidávat nové realizace — nemusíte kvůli každé fotce psát mně.",
        },
      ]}
    />
  );
}
