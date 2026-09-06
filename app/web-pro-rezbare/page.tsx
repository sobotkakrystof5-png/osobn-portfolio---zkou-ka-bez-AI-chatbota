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
      subhead="Každá řezbářská práce je originál, a web pro řezbáře to musí ukázat na první pohled. Nejdůležitější je vyprávět, kdo řezbu vytvořil, z jakého materiálu a proč je jedinečná, a pak nechat zákazníka poptat vlastní zakázku podle vlastní představy. Zákazník totiž často neřeší standardní produkt, ale unikátní kus na míru konkrétnímu prostoru nebo příležitosti."
      bullets={[
        {
          title: "Galerie řazená podle stylu nebo materiálu",
          text: "Sochy, reliéfy, betlémy nebo užitné předměty, přehledné rozdělení pomůže zákazníkovi najít styl, který hledá, mnohem rychleji než jedna dlouhá fotogalerie bez kategorií.",
        },
        {
          title: "Prostor pro příběh každé práce",
          text: "Krátký popis u realizace, materiál, inspirace, doba práce. U ruční tvorby rozhoduje příběh skoro stejně jako fotka, protože ukazuje řemeslnou hodnotu za výsledkem a odlišuje vaši práci od sériově vyráběných dekorací.",
        },
        {
          title: "Materiál a technika zpracování",
          text: "Krátká poznámka u realizace, jestli jde o lipové dřevo, dub nebo jiný materiál a jestli je práce řezaná nožem nebo dlátem, dá zákazníkovi konkrétní představu o technice a odolnosti výsledku i o tom, proč se cena mezi pracemi liší.",
        },
        {
          title: "Poptávka na zakázku podle inspirace",
          text: "Formulář, kam zákazník nahraje inspirační fotku nebo popíše představu, místo obecného kontaktního e-mailu bez konkrétního zadání, se kterým by se pak muselo dál dolaďovat.",
        },
      ]}
      cenikLead="Pro řezbářskou prezentaci s galerií realizací se nejčastěji hodí Online Vizitka nebo Promo Page, od 7 499 Kč, hotovo do 10 pracovních dní. Při větším počtu kategorií (sochy, betlémy, užitné předměty) je vhodnější Promo Page od 9 999 Kč, včetně prostoru pro delší příběh u vybraných realizací."
      slug="web-pro-rezbare"
      serviceType="Tvorba webu pro řezbáře"
      caseExampleTitle="Příklad zakázky: řezbovaný betlém na objednávku"
      caseExampleText="Zákazník si v galerii prohlédne hotové betlémy podle stylu, třeba tradiční řezbu nebo zjednodušenou moderní variantu, a přes formulář popíše, jakou velikost a počet figur by chtěl, případně přiloží inspirační fotku nalezenou online. U řezbářské práce rozhoduje hlavně to, jestli zákazníkovi sedí váš styl. Galerie a krátký příběh za každou prací tak dělají větší část přesvědčování než samotná cena. Pokud jde o zakázku na míru, třeba figuru podle konkrétní fotografie nebo motivu, popíše to rovnou v poptávce, ať víte, s jak náročným zadáním pracujete ještě před tím, než se ozvete zpátky s orientační cenou a termínem dodání. U sezónních zakázek, jako jsou betlémy před Vánoci, se navíc vyplatí zákazníkovi rovnou napsat, do kdy je potřeba objednávku zadat, ať práci stihnete dokončit včas."
      processSteps={[
        {
          title: "Výběr stylu v galerii",
          text: "Zákazník si podle fotek vybere styl a materiál, který se mu líbí.",
        },
        {
          title: "Poptávka s představou",
          text: "Přes formulář popíše velikost, motiv, nebo rovnou přiloží inspiraci a orientační termín, do kdy práci potřebuje.",
        },
        {
          title: "Výběr materiálu a řezba",
          text: "Podle zadání zvolíte vhodné dřevo a techniku, samotná řezba u složitějších motivů zabere řadu hodin ruční práce rozložených do několika dní, případně týdnů u rozsáhlejších děl.",
        },
        {
          title: "Předání a dokumentace",
          text: "Hotovou práci předáte zákazníkovi a fotky i krátký příběh o vzniku přidáte zpět do galerie jako inspiraci pro další poptávky.",
        },
      ]}
      faqs={[
        {
          q: "Můžu si obsah galerie po spuštění webu doplňovat sám?",
          a: "Ano, dostanete přístupy a krátký návod, jak přidávat nové realizace, nemusíte kvůli každé fotce psát mně.",
        },
        {
          q: "Dá se ke každé fotce v galerii přidat i krátký popis, třeba materiál nebo dobu práce?",
          a: "Ano, u řezbářské práce se krátký příběh k realizaci vyplatí, ukazuje řemeslnou hodnotu, kterou samotná fotka nepředá.",
        },
        {
          q: "Jak velkou galerii web unese, když mám desítky realizací?",
          a: "Klidně desítky i stovky fotek rozdělených do kategorií, galerii navrhnu tak, aby se i s větším počtem fotek rychle načítala.",
        },
        {
          q: "Dá se na web napsat i informace o materiálu a technice, kterou používáte?",
          a: "Ano, krátká poznámka o druhu dřeva a technice zpracování u každé realizace pomůže zákazníkovi pochopit, proč se cena i doba dodání liší mezi jednotlivými pracemi.",
        },
        {
          q: "Jak dlouho trvá vyřezat zakázku na míru?",
          a: "Záleží na velikosti a náročnosti motivu, drobná práce zabere pár dní, složitější socha i několik týdnů. Na web doplníme orientační dobu podle typu zakázky, ať zákazník ví, co čekat.",
        },
        {
          q: "Dá se na web přidat i nabídka opravy nebo restaurování starších řezeb?",
          a: "Ano, pokud tuhle práci děláte, samostatná zmínka na webu pomůže odlišit ji od nové tvorby, restaurování často vyžaduje jiný přístup než řezba od základu.",
        },
      ]}
      relatedSlugs={["web-pro-truhlare", "web-pro-kovare", "web-pro-remeslniky"]}
    />
  );
}
