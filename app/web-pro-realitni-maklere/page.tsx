import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro realitní makléře na míru",
    description:
      "Tvorba webu pro realitní makléře na míru, osobní značka, přehled nabídek, rychlá poptávka, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-realitni-maklere" },
    openGraph: {
      title: "Web pro realitní makléře na míru | VIZEON",
      description: "Web, který buduje osobní značku a důvěru, na které je provizní práce postavená.",
      url: "https://vizeon.cz/web-pro-realitni-maklere",
      type: "website",
    },
  };
}

export default function WebProRealitniMaklerePage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro realitní makléře"
      h1="Web pro realitní makléře, který buduje osobní značku"
      subhead="Web pro realitního makléře funguje jinak než firemní prezentace. Klient si u prodeje nebo koupě nemovitosti kupuje hlavně důvěru v konkrétního člověka, proto stavím web kolem vaší osobní značky, specializace a referencí, ne kolem loga kanceláře, pod kterou pracujete. Prodej nemovitosti navíc trvá týdny až měsíce, web proto musí zájemce provést celým procesem, ne jen zprostředkovat první kontakt."
      bullets={[
        {
          title: "Osobní prezentace a reference",
          text: "Váš přístup, specializace na lokalitu nebo typ nemovitosti a reference od klientů na jednom místě, ať si zájemce udělá představu, s kým bude jednat ještě před první schůzkou.",
        },
        {
          title: "Přehled aktuálních nabídek",
          text: "Prostor pro nemovitosti v prodeji, propojitelný s realitními portály jako Sreality nebo Bezrealitky, kam patří detailní parametry, fotky a půdorys, pokud ho k nemovitosti máte.",
        },
        {
          title: "Vysvětlení procesu prodeje",
          text: "Stručný přehled, co prodej nebo koupi nemovitosti obnáší, včetně věcí jako energetický štítek (PENB), který je při prodeji nebo pronájmu ze zákona povinný, a jak dlouho celý proces obvykle trvá.",
        },
        {
          title: "Rychlý kontakt na poptávku",
          text: "Formulář pro poptávku konkrétní nemovitosti nebo nezávaznou konzultaci prodeje, bez zbytečných kroků navíc, ať zájemce neodejde k jinému inzerátu jen kvůli složitému formuláři.",
        },
      ]}
      cenikLead="Pro osobní prezentaci makléře obvykle stačí Online Vizitka od 7 499 Kč, u prezentace s přehledem nabídek se hodí Promo Page od 9 999 Kč, hotovo do 10 pracovních dní. Web je vždy responzivní, protože zájemci si nabídky často prohlížejí přímo na cestě na prohlídku."
      slug="web-pro-realitni-maklere"
      serviceType="Tvorba webu pro realitní makléře"
      caseExampleTitle="Příklad zakázky: prodej rodinného domu"
      caseExampleText="Prodávající hledá makléře a porovnává osobní weby víc než anonymní realitní kanceláře, chce vědět, s kým bude jednat a jak dobře zná lokalitu, kde dům stojí. Na vašem webu uvidí specializaci na danou oblast, reference od předchozích klientů a aktuální nabídky, a přes formulář poptá nezávaznou konzultaci prodeje. Na první schůzce proberete odhad ceny, potřebné dokumenty (výpis z katastru, energetický štítek) a to, jestli chce prodej řešit exkluzivně jen s vámi, nebo souběžně s víc makléři. Zmíníte i to, jak dlouho podobné nemovitosti v okolí obvykle zůstávají v nabídce, ať má prodávající reálné očekávání ohledně termínu prodeje. Po podpisu zprostředkovatelské smlouvy dům zveřejníte na webu i na realitních portálech a domluvíte harmonogram prohlídek, včetně toho, kdo bude na prohlídkách přítomen. Zájem z prohlídek pak průběžně vyhodnocujete s prodávajícím a případně upravíte cenu podle reakcí trhu."
      processSteps={[
        {
          title: "Seznámení s makléřem",
          text: "Zájemce si na webu ověří specializaci, reference a styl komunikace.",
        },
        {
          title: "Poptávka konzultace",
          text: "Přes formulář poptá nezávaznou konzultaci prodeje nebo koupě.",
        },
        {
          title: "Příprava k prodeji",
          text: "Domluvíte odhad ceny, potřebné dokumenty a podmínky spolupráce, obvykle formou zprostředkovatelské smlouvy.",
        },
        {
          title: "Zveřejnění a prohlídky",
          text: "Nemovitost přidáte do přehledu aktuálních nabídek na webu i na realitní portály a domluvíte harmonogram prohlídek se zájemci, ať se termíny zbytečně nekříží.",
        },
      ]}
      faqs={[
        {
          q: "Dá se web propojit s inzeráty na realitních portálech?",
          a: "Ano, aktuální nabídky můžeme na web napojit nebo je spravovat přímo, probereme na konzultaci, co dává pro váš provoz smysl.",
        },
        {
          q: "Dá se web propojit i s Facebookem nebo Instagramem, kde sdílím nabídky?",
          a: "Ano, prolinkování se sociálními sítěmi a přehled nabídek na jednom místě patří k základní výbavě makléřského webu.",
        },
        {
          q: "Jak na webu působit důvěryhodně bez velké realitní kanceláře v zádech?",
          a: "Osobní příběh, reference od klientů a jasně popsaná specializace na webu často přesvědčí víc než logo velké kanceláře, lidem záleží hlavně na tom, s kým budou jednat.",
        },
        {
          q: "Dá se na web přidat vysvětlení procesu prodeje pro klienty, kteří prodávají poprvé?",
          a: "Ano, stručný přehled kroků (odhad ceny, dokumenty, prohlídky, rezervační smlouva, převod) pomůže nezkušenému prodávajícímu pochopit, co ho čeká, a působí to důvěryhodně.",
        },
        {
          q: "Dá se na web přidat i online kalkulačka orientační ceny nemovitosti?",
          a: "Ano, jednoduchý odhad na základě lokality a velikosti se dá zabudovat jako součást webové aplikace na míru, funguje jako první krok, který zájemce přivede k plné konzultaci.",
        },
        {
          q: "Dá se na web přidat i sekce s tipy pro prodávající, kteří nemovitost prodávají poprvé?",
          a: "Ano, krátké články nebo tipy (jak připravit byt na prohlídku, jaké dokumenty připravit dopředu) budují důvěru a přivádí na web i zájemce, kteří zatím jen zjišťují informace.",
        },
      ]}
      relatedSlugs={["web-pro-ucetni", "web-pro-fotografy", "web-pro-kadernictvi"]}
    />
  );
}
