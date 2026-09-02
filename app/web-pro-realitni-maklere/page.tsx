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
      subhead="Web pro realitního makléře funguje jinak než firemní prezentace — klient si nekupuje jen nemovitost, ale hlavně důvěru v konkrétního člověka. Proto stavím web kolem osobní značky, ne kolem loga kanceláře."
      bullets={[
        {
          title: "Osobní prezentace a reference",
          text: "Váš přístup, specializace na lokalitu nebo typ nemovitosti a reference od klientů na jednom místě.",
        },
        {
          title: "Přehled aktuálních nabídek",
          text: "Prostor pro nemovitosti v prodeji, propojitelný s realitními portály, kam patří detailní parametry.",
        },
        {
          title: "Rychlý kontakt na poptávku",
          text: "Formulář pro poptávku nemovitosti nebo nezávaznou konzultaci prodeje, bez zbytečných kroků.",
        },
      ]}
      cenikLead="Pro osobní prezentaci makléře obvykle stačí Online Vizitka od 7 499 Kč, u prezentace s přehledem nabídek se hodí Promo Page od 9 999 Kč."
      slug="web-pro-realitni-maklere"
      serviceType="Tvorba webu pro realitní makléře"
      caseExampleTitle="Příklad zakázky: prodej rodinného domu"
      caseExampleText="Prodávající hledá makléře a porovnává osobní weby víc než anonymní realitní kanceláře — chce vědět, s kým bude jednat. Na vašem webu uvidí specializaci na danou lokalitu, reference od předchozích klientů a aktuální nabídky, a přes formulář poptá nezávaznou konzultaci prodeje."
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
          title: "Zveřejnění nabídky",
          text: "Po podpisu zprostředkovatelské smlouvy nemovitost přidáte do přehledu aktuálních nabídek na webu.",
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
          a: "Osobní příběh, reference od klientů a jasně popsaná specializace na webu často přesvědčí víc než logo velké kanceláře — lidem záleží na tom, s kým budou jednat.",
        },
      ]}
      relatedSlugs={["web-pro-ucetni", "web-pro-fotografy", "web-pro-kadernictvi"]}
      hubHref="/"
      hubLabel="← Zpět na hlavní stránku"
    />
  );
}
