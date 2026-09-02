import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro fotografy na míru",
    description:
      "Tvorba webu pro fotografy na míru, rychlé portfolio podle specializace, jednoduchá poptávka termínu, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-fotografy" },
    openGraph: {
      title: "Web pro fotografy na míru | VIZEON",
      description: "Portfolio, které prodá váš styl na první pohled, bez šablon a zbytečného textu.",
      url: "https://vizeon.cz/web-pro-fotografy",
      type: "website",
    },
  };
}

export default function WebProFotografyPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro fotografy"
      h1="Web pro fotografy, který prodá váš styl na první pohled"
      subhead="Web pro fotografy musí fungovat hlavně jako rychlé portfolio, ne jako firemní prezentace. Klient se rozhoduje podle stylu fotek, který uvidí za pár vteřin, ne podle odstavce textu o vaší filozofii."
      bullets={[
        {
          title: "Rychlé portfolio bez zbytečného textu",
          text: "Fotky načtené ve vysoké kvalitě, ale rychle, ať si klient prohlédne styl dřív, než zavře kartu.",
        },
        {
          title: "Přehled specializací",
          text: "Svatby, portréty, produktová fotografie zvlášť, ať klient hned pozná, jestli u vás najde přesně to, co hledá.",
        },
        {
          title: "Rychlá poptávka termínu",
          text: "Jednoduchý formulář s datem a typem focení místo dlouhého kontaktního formuláře.",
        },
      ]}
      cenikLead="Pro portfolio s galeriemi podle specializace obvykle stačí Online Vizitka od 7 499 Kč, u rozsáhlejší prezentace s víc kategoriemi se hodí Promo Page od 9 999 Kč."
      slug="web-pro-fotografy"
      serviceType="Tvorba webu pro fotografy"
      caseExampleTitle="Příklad zakázky: svatební fotografie"
      caseExampleText="Snoubenci procházejí portfolio podle specializace, najdou galerii svateb ve stylu, který se jim líbí, a přes formulář pošlou datum a místo konání. Protože termíny svateb se plánují měsíce dopředu, rychlá a přehledná odpověď na dostupnost často rozhoduje o tom, jestli si vyberou vás, nebo fotografa s rychlejším webem."
      processSteps={[
        {
          title: "Výběr podle portfolia",
          text: "Klient si podle stylu fotek v galerii vybere, jestli mu vaše práce sedí.",
        },
        {
          title: "Poptávka s termínem",
          text: "Přes formulář pošle datum, místo a typ focení.",
        },
        {
          title: "Focení a předání",
          text: "Po focení galerii doplníte o nové fotky, které slouží i jako reference pro další klienty.",
        },
      ]}
      faqs={[
        {
          q: "Zvládne web unést hodně fotek ve vysokém rozlišení?",
          a: "Ano, obrázky optimalizuji tak, aby se načítaly rychle i ve vysoké kvalitě — použiju moderní formáty a správné rozměry pro každé zařízení.",
        },
        {
          q: "Dá se portfolio rozdělit podle specializace, třeba svatby a portréty zvlášť?",
          a: "Ano, galerie se rozdělí do kategorií, ať klient hned najde styl focení, který ho zajímá, bez procházení všeho.",
        },
        {
          q: "Jak rychle se dá web po nové zakázce doplnit o čerstvé fotky?",
          a: "Dostanete jednoduchý přístup, kterým si galerii doplňujete sami, během pár minut, bez zásahu do kódu.",
        },
      ]}
      relatedSlugs={["web-pro-realitni-maklere", "web-pro-kosmeticky", "web-pro-zahradniky"]}
      hubHref="/"
      hubLabel="← Zpět na hlavní stránku"
    />
  );
}
