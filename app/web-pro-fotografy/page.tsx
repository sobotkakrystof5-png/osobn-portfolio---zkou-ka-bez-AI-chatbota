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
      subhead="Web pro fotografy musí fungovat hlavně jako rychlé portfolio. Klient se rozhoduje podle stylu fotek, který uvidí za pár vteřin, mnohem víc než podle odstavce textu o vaší filozofii nebo vybavení, které používáte. Zároveň musí web unést velké množství fotek ve vysoké kvalitě, aniž by se zpomalil."
      bullets={[
        {
          title: "Rychlé portfolio bez zbytečného textu",
          text: "Fotky načtené ve vysoké kvalitě, ale rychle, ať si klient prohlédne styl dřív, než zavře kartu a odejde ke konkurenci s rychlejším webem.",
        },
        {
          title: "Přehled specializací",
          text: "Svatby, portréty, rodinné focení nebo produktová fotografie zvlášť, ať klient hned pozná, jestli u vás najde přesně to, co hledá, a nemusí procházet celé portfolio.",
        },
        {
          title: "Předání fotek klientovi",
          text: "Krátké vysvětlení, jak a kdy klient dostane hotové fotky, online galerii ke stažení, počet upravených snímků nebo možnost tisku, patří k základní výbavě webu, hlavně u klientů, kteří fotografa najímají poprvé.",
        },
        {
          title: "Rychlá poptávka termínu",
          text: "Jednoduchý formulář s datem, místem a typem focení místo dlouhého kontaktního formuláře, ať poptávka dorazí se všemi podstatnými informacemi a vy hned poznáte, jestli máte v ten den volno.",
        },
      ]}
      cenikLead="Pro portfolio s galeriemi podle specializace obvykle stačí Online Vizitka od 7 499 Kč, u rozsáhlejší prezentace s víc kategoriemi se hodí Promo Page od 9 999 Kč. Fotky se vždy optimalizují na rychlé načítání bez ztráty kvality."
      slug="web-pro-fotografy"
      serviceType="Tvorba webu pro fotografy"
      caseExampleTitle="Příklad zakázky: svatební fotografie"
      caseExampleText="Snoubenci procházejí portfolio podle specializace, najdou galerii svateb ve stylu, který se jim líbí, třeba reportážní nebo klasický aranžovaný styl, a přes formulář pošlou datum a místo konání. Protože termíny svateb se plánují měsíce dopředu, rychlá a přehledná odpověď na dostupnost často rozhoduje o tom, jestli si vyberou vás, nebo fotografa s rychlejším webem. Po potvrzení termínu následuje krátká konzultace, kolik hodin focení klienti chtějí a jestli řeší i svatební den od přípravy po večerní zábavu, nebo jen samotný obřad a focení novomanželů. Pokud snoubenci chtějí i předsvatební focení (save the date), domluvíte ho jako samostatnou zakázku v týdnech před svatbou. Po focení klienti čekají na hotovou galerii, jasně napsaná lhůta dodání (třeba do čtyř týdnů) na webu předchází nejistým dotazům, kdy fotky dostanou, a působí to profesionálněji než odpověď „ozvu se, až budu mít hotovo“."
      processSteps={[
        {
          title: "Výběr podle portfolia",
          text: "Klient si podle stylu fotek v galerii vybere, jestli mu vaše práce sedí, a rovnou vidí, jestli máte volný termín.",
        },
        {
          title: "Poptávka s termínem",
          text: "Přes formulář pošle datum, místo a typ focení, případně počet hodin nebo rozsah, který potřebuje, a preferovaný styl fotek.",
        },
        {
          title: "Focení",
          text: "V domluvený termín provedete focení podle odsouhlaseného rozsahu a stylu.",
        },
        {
          title: "Výběr, úprava a předání",
          text: "Fotky vyberete a upravíte, hotovou galerii předáte klientovi ve slíbené lhůtě a nové snímky doplníte i do portfolia jako referenci pro další zájemce o podobný styl.",
        },
      ]}
      faqs={[
        {
          q: "Zvládne web unést hodně fotek ve vysokém rozlišení?",
          a: "Ano, obrázky optimalizuji tak, aby se načítaly rychle i ve vysoké kvalitě, použiju moderní formáty a správné rozměry pro každé zařízení.",
        },
        {
          q: "Dá se portfolio rozdělit podle specializace, třeba svatby a portréty zvlášť?",
          a: "Ano, galerie se rozdělí do kategorií, ať klient hned najde styl focení, který ho zajímá, bez procházení všeho.",
        },
        {
          q: "Jak rychle se dá web po nové zakázce doplnit o čerstvé fotky?",
          a: "Dostanete jednoduchý přístup, kterým si galerii doplňujete sami, během pár minut, bez zásahu do kódu.",
        },
        {
          q: "Dá se na web přidat info o lhůtě dodání hotových fotek?",
          a: "Ano, jasně napsaná lhůta dodání podle typu zakázky (portrét, svatba) sníží počet dotazů, kdy klient galerii dostane, a působí to profesionálněji než neurčité „brzy“.",
        },
        {
          q: "Dá se klientům předávat fotky přes vlastní online galerii na webu?",
          a: "Ano, soukromá galerie s heslem nebo unikátním odkazem se dá zabudovat jako součást webové aplikace na míru, klient si tak fotky stáhne bez nutnosti řešit e-mailové přílohy.",
        },
        {
          q: "Dá se na web přidat i objednávka tisku fotek nebo fotoknihy?",
          a: "Ano, pokud tuhle službu nabízíte, prodej tisků nebo fotoknih se dá zabudovat jako součást webové aplikace na míru, u svateb a rodinného focení jde o žádaný doplněk.",
        },
      ]}
      relatedSlugs={["web-pro-realitni-maklere", "web-pro-kosmeticky", "web-pro-zahradniky"]}
    />
  );
}
