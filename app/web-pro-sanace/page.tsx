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
      subhead="Web pro sanační firmy musí především srozumitelně vysvětlit, proč zeď vlhne a jak přesně to řešíte — sanace vlhkého zdiva je totiž pro většinu lidí neznámý obor plný odborných pojmů, a než zákazník zavolá, chce věci rozumět."
      bullets={[
        {
          title: "Vysvětlení příčiny problému",
          text: "Krátce a srozumitelně, proč zdivo vlhne (vzlínající vlhkost, kondenzace, špatná izolace) — zákazník tak lépe pozná svůj vlastní problém.",
        },
        {
          title: "Popis postupu prací krok za krokem",
          text: "Co sanace obnáší, jak dlouho trvá a co zákazníka čeká — méně obav znamená víc odeslaných poptávek.",
        },
        {
          title: "Fotky realizací a stavu před zásahem",
          text: "Vizuální důkaz rozsahu problému a výsledku práce buduje důvěru rychleji než jakýkoli popis.",
        },
      ]}
      cenikLead="Pro sanační firmu se nejčastěji hodí Promo Page vysvětlující postup prací — od 9 999 Kč, hotovo do 10 pracovních dní."
      slug="web-pro-sanace"
      serviceType="Tvorba webu pro sanační firmy"
      caseExampleTitle="Příklad zakázky: sanace vlhkého sklepa"
      caseExampleText="Majitel domu řeší vlhnoucí sklep a na webu nejdřív hledá vysvětlení, proč k tomu dochází — až poté, co pochopí příčinu (vzlínající vlhkost, špatná izolace), odešle poptávku s fotkou postiženého zdiva. Srozumitelné vysvětlení problému na webu tak často předchází samotné poptávce."
      processSteps={[
        {
          title: "Vysvětlení problému",
          text: "Zákazník si na webu ověří, jestli popis příčiny odpovídá jeho situaci.",
        },
        {
          title: "Poptávka s fotkou zdiva",
          text: "Přes formulář pošle fotky postiženého místa a stručný popis potíží.",
        },
        {
          title: "Diagnóza a sanace",
          text: "Na místě potvrdíte příčinu, navrhnete postup a po realizaci předáte popis provedených prací.",
        },
      ]}
      faqs={[
        {
          q: "Zvládne web srozumitelně vysvětlit i technicky náročnější postup?",
          a: "Ano — texty společně zjednodušíme tak, aby jim rozuměl i laik, ale zůstaly odborně přesné. To je ostatně základ toho, proč zákazník firmě uvěří.",
        },
        {
          q: "Dá se na web přidat jednoduchý přehled „poznejte příčinu vlhkosti“ pro zákazníky?",
          a: "Ano, krátký přehled typických příznaků podle příčiny (kondenzace, vzlínající vlhkost, srážková voda) pomůže zákazníkovi líp popsat problém už v poptávce.",
        },
        {
          q: "Jak texty o technickém postupu napsat, ať jim zákazník rozumí, ale nepůsobí to zjednodušeně?",
          a: "Postup vysvětlíme v jasných krocích s odbornými pojmy vysvětlenými v závorce — zůstane to přesné, ale srozumitelné i pro laika.",
        },
      ]}
      relatedSlugs={["web-pro-malire", "web-pro-studnare", "web-pro-remeslniky"]}
    />
  );
}
