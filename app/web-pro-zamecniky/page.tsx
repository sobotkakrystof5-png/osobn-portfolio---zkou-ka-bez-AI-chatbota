import type { Metadata } from "next";
import Link from "next/link";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro zámečníky na míru",
    description:
      "Tvorba webu pro zámečníky a zámečnictví na míru, galerie realizací, rychlý kontakt na poptávku, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-zamecniky" },
    openGraph: {
      title: "Web pro zámečníky na míru | VIZEON",
      description: "Prezentace zámečnické firmy online, galerie realizací a rychlá poptávka, bez šablon.",
      url: "https://vizeon.cz/web-pro-zamecniky",
      type: "website",
    },
  };
}

export default function WebProZamecnikyPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro zámečníky"
      h1="Web na míru pro zámečníky"
      subhead="Web pro zámečníky musí hlavně rychle ukázat, co umíte, a nabídnout kontakt, který zvedne telefon i mimo pracovní dobu. Zámečnictví se totiž často řeší narychlo, ať už jde o vypadlý zámek, vloupání nebo poškozené dveře, a zákazník osloví toho, koho najde nejrychleji. Zároveň web musí ukázat, že zvládnete i plánovanou zakázku, třeba výrobu mříže nebo kované brány na míru."
      bullets={[
        {
          title: "Galerie realizací",
          text: "Fotky hotových zakázek, jako mříže, kované brány, bezpečnostní dveře nebo otevírání zámků. Zákazník si tak ověří vaši práci dřív, než zavolá, hlavně u dražších zakázek na míru.",
        },
        {
          title: "Rychlý kontakt na poptávku",
          text: "Telefonní číslo viditelné hned v hlavičce a jednoduchý formulář. U havarijních zakázek rozhoduje hlavně to, jak rychle vás zákazník na webu najde a osloví.",
        },
        {
          title: "Přehled služeb podle oboru",
          text: "Odemykání, výroba na míru, servis a montáž zvlášť. Zákazník hned vidí, jestli řešíte přesně jeho problém, nebo jestli u vás vyřídí i výměnu bezpečnostní vložky nebo trezoru.",
        },
        {
          title: "Bezpečnostní systémy a certifikace",
          text: "Pokud nabízíte certifikované bezpečnostní vložky nebo systémy generálního klíče, krátká zmínka na webu ukáže zákazníkovi, že vedle běžné opravy zámku řešíte i vyšší třídu zabezpečení.",
        },
      ]}
      cenikLead="Pro zámečnickou firmu se nejčastěji hodí Online Vizitka nebo Promo Page s galerií realizací, od 7 499 Kč, hotovo do 10 pracovních dní. U rozsáhlejší nabídky (zámečnictví, kovovýroba, bezpečnostní systémy) je vhodnější Promo Page od 9 999 Kč. Web je vždy responzivní, ať zákazník s havárií zavolá přímo z mobilu bez zdlouhavého hledání kontaktu."
      slug="web-pro-zamecniky"
      serviceType="Tvorba webu pro zámečníky"
      portfolioNote={
        <>
          Podobnou zakázku jsem už dělal, web pro{" "}
          <Link href="/ukazky-webu" className="text-[#c9a84c] hover:underline">
            Schovinox
          </Link>
          , rodinnou zámečnickou a kovovýrobní firmu se 40letou tradicí.
        </>
      }
      caseExampleTitle="Příklad zakázky: vypadlý zámek u dveří"
      caseExampleText="Zákazník řeší vypadlý zámek v sobotu večer, na mobilu najde váš web, uvidí telefon v hlavičce a zavolá rovnou, protože v tu chvíli řeší jediné: dostat se domů co nejdřív. U méně urgentních zakázek, třeba výroby mříže nebo montáže bezpečnostních dveří, místo volání raději vyplní formulář s fotkou dveří nebo prostoru a popisem, ať máte při zpětném kontaktu rovnou představu o rozsahu práce a materiálu. Havarijní zakázky se tak řeší během hodin, plánované realizace na míru v řádu dnů až týdnů podle rozsahu výroby. U výroby na míru navíc zákazníkovi před realizací ukážete podobné kusy z galerie, ať má jistotu, že styl i provedení odpovídá tomu, co si představuje."
      processSteps={[
        {
          title: "Rychlý kontakt",
          text: "Havarijní případy řeší zákazník telefonem přímo z hlavičky webu, běžné poptávky přes formulář s fotkou.",
        },
        {
          title: "Diagnóza a nacenění",
          text: "Podle popisu nebo fotky odhadnete rozsah práce a domluvíte výjezd nebo termín zaměření, u havárií co nejdřív, u zakázkové výroby v řádu dnů.",
        },
        {
          title: "Realizace",
          text: "Opravu, montáž nebo výrobu na míru dokončíte na místě, u výroby (mříže, brány) domluvíte i termín instalace hotového kusu a případnou povrchovou úpravu.",
        },
        {
          title: "Předání a doporučení",
          text: "Po předání zakázky doporučíte, jak se o zámek nebo mříž starat, hotovou práci pak můžete přidat do galerie webu.",
        },
      ]}
      faqs={[
        {
          q: "Dá se na web přidat i nonstop kontakt pro havarijní zásahy?",
          a: "Ano, telefonní číslo a poznámku o dostupnosti mimo pracovní dobu vám dám hned do hlavičky webu, ať ho zákazník nemusí hledat.",
        },
        {
          q: "Jde nastavit, aby telefonní číslo v hlavičce fungovalo jako tlačítko na mobilu?",
          a: "Ano, na mobilu se číslo automaticky mění na klikací tlačítko, zákazník tak vytočí číslo jedním klepnutím bez přepisování.",
        },
        {
          q: "Dá se na web přidat info o příplatku za servis mimo pracovní dobu?",
          a: "Ano, do hlavičky nebo přímo k ceníku dáme jasnou poznámku o dostupnosti a případném příplatku za servis mimo pracovní dobu.",
        },
        {
          q: "Dá se na web přidat i nabídka certifikovaných bezpečnostních vložek nebo systémů generálního klíče?",
          a: "Ano, tuhle vyšší třídu zabezpečení má smysl uvést jako samostatnou položku v přehledu služeb, ať ji zákazník nepřehlédne mezi běžnými opravami.",
        },
        {
          q: "Dá se na web přidat i orientační ceník běžných úkonů, třeba odemčení zámku?",
          a: "Ano, orientační ceny nejběžnějších úkonů na webu snižují počet dotazů na cenu předem, u havarijních zásahů se navíc hodí rovnou zmínit případný příplatek mimo pracovní dobu.",
        },
        {
          q: "Dá se na web přidat i galerie kovovýroby, ne jen zámečnických prací?",
          a: "Ano, pokud kovovýrobu děláte vedle zámečnictví, samostatná kategorie v galerii pomůže zákazníkům najít přesně ten typ realizace, který hledají, ať jde o mříže, brány nebo zábradlí.",
        },
      ]}
      relatedSlugs={["web-pro-kovare", "web-pro-truhlare", "web-pro-elektrikare", "web-pro-autoservisy"]}
    />
  );
}
