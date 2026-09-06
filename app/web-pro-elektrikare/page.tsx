import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro elektrikáře na míru",
    description:
      "Tvorba webu pro elektrikáře na míru, nonstop kontakt na havárie, přehled služeb a revizí, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-elektrikare" },
    openGraph: {
      title: "Web pro elektrikáře na míru | VIZEON",
      description: "Web, který ukáže odbornost i dostupnost — havarijní zásahy, revize i rekonstrukce.",
      url: "https://vizeon.cz/web-pro-elektrikare",
      type: "website",
    },
  };
}

export default function WebProElektrikarePage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro elektrikáře"
      h1="Web pro elektrikáře, který ukáže odbornost i dostupnost"
      subhead="Web pro elektrikáře musí kombinovat dvě věci najednou: rychlý kontakt na havarijní zásahy a jasný přehled toho, že děláte i revize a rekonstrukce podle platných norem. Zákazník řešící výpadek proudu hledá telefon, zákazník plánující rekonstrukci bytu nebo revizi před kolaudací chce vidět rozsah vaší odbornosti dřív, než vůbec zavolá. Rozdíl mezi těmito dvěma typy poptávek musí být na webu vidět už od prvního pohledu."
      bullets={[
        {
          title: "Nonstop kontakt na havárie",
          text: "Telefonní číslo viditelné hned v hlavičce, protože výpadek proudu, zkrat nebo jiskřící zásuvka nečekají na pracovní dobu. Na mobilu se číslo mění na klikací tlačítko, ať zákazník vytočí hovor jedním klepnutím, aniž by musel opisovat číslici po číslici.",
        },
        {
          title: "Přehled služeb a revizí",
          text: "Elektroinstalace, revize podle platných norem, rekonstrukce a čím dál častěji i fotovoltaika zvlášť, ať zákazník hned pozná, co přesně nabízíte a jestli u vás revizi bytu nebo firmy vůbec vyřídí. U revizí se hodí zmínit i typ nemovitostí, na které se obvykle zaměřujete.",
        },
        {
          title: "Odbornost a osvědčení na očích",
          text: "Kvalifikace podle vyhlášky 50/1978 Sb. a rozsah oprávnění patří na web stejně jako fotky realizací. U elektroinstalace totiž zákazník kvalitu práce neposoudí pohledem, musí věřit vaší odbornosti a osvědčení mu tuhle jistotu dají rychleji než popis zkušeností.",
        },
        {
          title: "Rychlá poptávka s popisem zakázky",
          text: "Jednoduchý formulář, kam zákazník napíše, o jakou práci jde a jak brzy ji potřebuje řešit, ať máte hned informace potřebné k odhadu rozsahu a termínu výjezdu. U revizí se navíc formulář zeptá na typ a stáří nemovitosti.",
        },
      ]}
      cenikLead="Pro elektrikářskou firmu obvykle stačí Online Vizitka od 7 499 Kč s přehledem služeb a revizí, hotovo do 5 pracovních dní. U rozsáhlejší nabídky (elektroinstalace, fotovoltaika, revize zvlášť) se hodí Promo Page od 9 999 Kč. Cena vždy zahrnuje i mobilní zobrazení, přes které dnes přichází většina havarijních poptávek."
      slug="web-pro-elektrikare"
      serviceType="Tvorba webu pro elektrikáře"
      caseExampleTitle="Příklad zakázky: revize elektroinstalace před prodejem bytu"
      caseExampleText="Zákazník potřebuje revizi elektroinstalace kvůli prodeji bytu a přes web hledá termín, který stihne do uzávěrky kupní smlouvy. Ve formuláři vybere typ revize, uvede adresu a termín, do kdy revizní zprávu potřebuje, případně přiloží fotku rozvaděče. Z fotky obvykle odhadnete přibližné stáří instalace a to, jestli revize proběhne bez komplikací, nebo bude potřeba navrhnout drobné opravy ještě před vydáním zprávy, třeba výměnu starého jističe. Vy mu obratem potvrdíte dostupnost a orientační rozsah podle stáří a typu nemovitosti. Rychlá odezva tu často rozhoduje víc než cena, protože termín tlačí kupující i realitní makléř a zpoždění o pár dní může posunout celý prodej. Po revizi předáte zákazníkovi revizní zprávu, kterou doloží kupujícímu nebo bance při hypotéce, a případně mu doporučíte, co stojí za to opravit ještě před dalším prodejem nebo pronájmem."
      processSteps={[
        {
          title: "Poptávka s typem zakázky",
          text: "Zákazník vybere, jestli jde o revizi, rekonstrukci nebo havárii, popíše termín a případně nahraje fotku rozvaděče nebo problému. Čím konkrétnější popis, tím přesnější odhad rozsahu práce dostane obratem.",
        },
        {
          title: "Nacenění nebo výjezd",
          text: "Podle typu zakázky domluvíte orientační cenu na dálku, u revizí a rekonstrukcí spíš termín výjezdu na místní ohledání, kde se doladí přesný rozsah a materiál.",
        },
        {
          title: "Realizace podle normy",
          text: "Práci provedete podle platných norem a bezpečnostních předpisů, u větších zakázek domluvíte postup a harmonogram předem, ať zákazník ví, kdy počítat s omezením dodávky proudu.",
        },
        {
          title: "Předání a revizní zpráva",
          text: "Po dokončení předáte zákazníkovi revizní zprávu nebo protokol, který může potřebovat pro kolaudaci, pojišťovnu nebo prodej nemovitosti, a doporučíte, kdy je vhodné revizi opakovat.",
        },
      ]}
      faqs={[
        {
          q: "Dá se na web přidat i objednávka revize?",
          a: "Ano, formulář na objednání revize nebo prohlídky zabuduji jako součást poptávkového formuláře, včetně výběru typu nemovitosti a termínu, do kdy revizní zprávu potřebujete.",
        },
        {
          q: "Dá se na web přidat rozlišení urgentní vs. plánovaná zakázka?",
          a: "Ano, formulář rozšíříme o výběr naléhavosti, ať poznáte na první pohled, kterou poptávku řešit přednostně, třeba výpadek proudu oproti revizi naplánované za měsíc dopředu.",
        },
        {
          q: "Jde na web přidat i ceník běžných revizí?",
          a: "Ano, orientační ceník podle typu nemovitosti nebo rozsahu revize snižuje počet dotazů typu „kolik to bude stát“ a zákazník poptávku odešle s reálnou představou o ceně i termínu.",
        },
        {
          q: "Mám oprávnění podle vyhlášky 50, jak to na webu ukázat?",
          a: "Krátká zmínka o kvalifikaci a rozsahu oprávnění patří přímo k přehledu služeb, případně jako samostatný odstavec o odbornosti. U elektroinstalace tak zákazníkovi nahradí to, co jinde dělá fotka hotové práce.",
        },
      ]}
      relatedSlugs={["web-pro-instalatery", "web-pro-zamecniky", "web-pro-remeslniky", "web-pro-autoservisy"]}
    />
  );
}
