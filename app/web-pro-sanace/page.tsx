import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro sanační firmy na míru",
    description:
      "Tvorba webu pro sanaci vlhkého zdiva na míru — srozumitelné vysvětlení postupu prací a důvěra, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-sanace" },
    openGraph: {
      title: "Web pro sanační firmy na míru | VIZEON",
      description: "Sanace staveb web na míru — vysvětlí problém i řešení dřív, než zákazník zavolá.",
      url: "https://vizeon.cz/web-pro-sanace",
      type: "website",
    },
  };
}

export default function WebProSanacePage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro sanační firmy"
      h1="Web na míru pro sanační firmy"
      subhead="Web pro sanační firmy musí především srozumitelně vysvětlit, proč zeď vlhne a jak přesně to řešíte. Sanace vlhkého zdiva je pro většinu lidí neznámý obor plný odborných pojmů, a než zákazník zavolá, chce věci rozumět a vědět, co ho čeká. Zároveň musí web působit odborně, protože zákazník řeší investici, jejíž výsledek je vidět až s odstupem času."
      bullets={[
        {
          title: "Vysvětlení příčiny problému",
          text: "Krátce a srozumitelně, proč zdivo vlhne, vzlínající vlhkost, kondenzace nebo špatná izolace, zákazník tak lépe pozná svůj vlastní problém ještě před poptávkou.",
        },
        {
          title: "Popis postupu prací krok za krokem",
          text: "Co sanace obnáší, jak dlouho trvá a co zákazníka čeká, včetně toho, jestli musí po dobu prací opustit místnost. Méně obav znamená víc odeslaných poptávek a míň zákazníků, kteří to odloží kvůli nejistotě.",
        },
        {
          title: "Metody sanace srozumitelně vysvětlené",
          text: "Injektáž zdiva, sanační omítky nebo drenáž kolem základů řešíte podle příčiny problému. Stručné vysvětlení, kdy se která metoda používá, pomůže zákazníkovi pochopit, proč navrhujete zrovna tenhle postup a ne levnější alternativu, kterou viděl jinde.",
        },
        {
          title: "Fotky realizací a stavu před zásahem",
          text: "Vizuální důkaz rozsahu problému a výsledku práce buduje důvěru rychleji než jakýkoli popis textem, hlavně u zakázek, kde je poškození vidět pouhým okem.",
        },
      ]}
      cenikLead="Pro sanační firmu se nejčastěji hodí Promo Page vysvětlující postup prací, od 9 999 Kč, hotovo do 10 pracovních dní. Jednodušší prezentace s kratším vysvětlením příčin vlhkosti vyjde jako Online Vizitka od 7 499 Kč. Texty vždy společně zjednodušíme, ať jim rozumí i laik, ale zůstanou odborně přesné."
      slug="web-pro-sanace"
      serviceType="Tvorba webu pro sanační firmy"
      caseExampleTitle="Příklad zakázky: sanace vlhkého sklepa"
      caseExampleText="Majitel domu řeší vlhnoucí a plesnivějící sklep a na webu nejdřív hledá vysvětlení, proč k tomu dochází. Přečte si rozdíl mezi vzlínající vlhkostí, kondenzací a špatně provedenou izolací základů a podle popsaných příznaků, třeba bílých výkvětů na zdi nebo odlupující se omítky, si udělá představu o vlastní příčině. Až poté, co problému rozumí, odešle poptávku s fotkami postiženého zdiva a stručným popisem, jak dlouho vlhkost pozoruje a jestli se zhoršuje v určitém ročním období. Srozumitelné vysvětlení problému na webu tak často předchází samotné poptávce a zároveň sníží počet dotazů na špatné řešení, třeba jen nátěr proti plísni tam, kde je potřeba zasáhnout přímo do zdiva. Na místě pak diagnózu potvrdíte a majiteli vysvětlíte, proč navrhovaná metoda sedí zrovna na jeho typ poškození, a ne obecně nabízené řešení, které viděl v reklamě."
      processSteps={[
        {
          title: "Vysvětlení problému",
          text: "Zákazník si na webu ověří, jestli popis příčiny odpovídá jeho situaci, a rozhodne se, jestli poptávku vůbec odešle.",
        },
        {
          title: "Poptávka s fotkou zdiva",
          text: "Přes formulář pošle fotky postiženého místa, stručný popis potíží a jak dlouho problém trvá, případně v jakém ročním období se zhoršuje.",
        },
        {
          title: "Diagnóza na místě",
          text: "Při prohlídce potvrdíte příčinu vlhkosti, případně změříte vlhkost zdiva přístrojem, a navrhnete odpovídající metodu sanace i orientační termín realizace.",
        },
        {
          title: "Realizace a předání",
          text: "Po provedení sanace předáte zákazníkovi popis provedených prací a doporučení, jak dál větrat nebo topit, ať se problém nevrátil.",
        },
      ]}
      faqs={[
        {
          q: "Zvládne web srozumitelně vysvětlit i technicky náročnější postup?",
          a: "Ano, texty společně zjednodušíme tak, aby jim rozuměl i laik, ale zůstaly odborně přesné. To je ostatně základ toho, proč zákazník firmě uvěří.",
        },
        {
          q: "Dá se na web přidat jednoduchý přehled „poznejte příčinu vlhkosti“ pro zákazníky?",
          a: "Ano, krátký přehled typických příznaků podle příčiny (kondenzace, vzlínající vlhkost, srážková voda) pomůže zákazníkovi líp popsat problém už v poptávce.",
        },
        {
          q: "Jak texty o technickém postupu napsat, ať jim zákazník rozumí, ale zůstanou odborně přesné?",
          a: "Postup vysvětlíme v jasných krocích s odbornými pojmy vysvětlenými v závorce, zůstane to přesné, ale srozumitelné i pro laika.",
        },
        {
          q: "Jak dlouho trvá, než je po sanaci vidět výsledek?",
          a: "Záleží na metodě a rozsahu poškození, u injektáže zdiva se zdivo vysušuje i několik měsíců. Na web doplníme reálný odhad, ať zákazník ví, co očekávat.",
        },
        {
          q: "Dá se na web přidat i doporučení, jak vlhkosti předcházet do budoucna?",
          a: "Ano, krátká sekce s doporučením k větrání, vytápění nebo údržbě drenáže po sanaci ukáže zákazníkovi, že vám záleží na trvalém výsledku, ne jen na dokončení zakázky.",
        },
        {
          q: "Poskytujete na provedenou sanaci nějakou záruku?",
          a: "Pokud na zakázky poskytujete záruku, krátká zmínka o její délce a podmínkách patří k důvěryhodné prezentaci a zákazníkovi pomůže rozhodnout se rychleji.",
        },
      ]}
      relatedSlugs={["web-pro-malire", "web-pro-studnare", "web-pro-remeslniky"]}
    />
  );
}
