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
      faqs={[
        {
          q: "Zvládne web srozumitelně vysvětlit i technicky náročnější postup?",
          a: "Ano — texty společně zjednodušíme tak, aby jim rozuměl i laik, ale zůstaly odborně přesné. To je ostatně základ toho, proč zákazník firmě uvěří.",
        },
      ]}
    />
  );
}
