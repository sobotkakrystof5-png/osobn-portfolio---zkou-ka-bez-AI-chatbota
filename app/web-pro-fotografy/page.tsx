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
      faqs={[
        {
          q: "Zvládne web unést hodně fotek ve vysokém rozlišení?",
          a: "Ano, obrázky optimalizuji tak, aby se načítaly rychle i ve vysoké kvalitě — použiju moderní formáty a správné rozměry pro každé zařízení.",
        },
      ]}
      relatedSlugs={["web-pro-realitni-maklere", "web-pro-kosmeticky", "web-pro-autoservisy"]}
      hubHref="/"
      hubLabel="← Zpět na hlavní stránku"
    />
  );
}
