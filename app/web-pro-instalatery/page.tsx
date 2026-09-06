import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro instalatéry na míru",
    description:
      "Tvorba webu pro instalatéry na míru, nonstop kontakt na havárie, přehled specializací, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-instalatery" },
    openGraph: {
      title: "Web pro instalatéry na míru | VIZEON",
      description: "Web, který zvedne poptávku i o víkendu — rychlý kontakt na havarijní zásahy.",
      url: "https://vizeon.cz/web-pro-instalatery",
      type: "website",
    },
  };
}

export default function WebProInstalateryPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro instalatéry"
      h1="Web pro instalatéry, který zvedne poptávku i o víkendu"
      subhead="Web pro instalatéry řeším s důrazem na rychlost kontaktu. Havárie vody nebo výpadek topení v zimě nečekají na pracovní dobu a zákazník osloví toho, koho najde a osloví nejrychleji. Zároveň musí web ukázat, že zvládnete i naplánovanou zakázku, třeba rekonstrukci koupelny nebo výměnu kotle, kde rozhoduje spíš odbornost než rychlost."
      bullets={[
        {
          title: "Nonstop kontakt na havárie",
          text: "Telefonní číslo a poznámka o dostupnosti přímo v hlavičce webu, ať vás zákazník při prasklém potrubí nebo výpadku topení v zimě nemusí hledat mezi konkurencí. Na mobilu se číslo mění na klikací tlačítko.",
        },
        {
          title: "Přehled specializací",
          text: "Rozvody vody, topení, odpady a montáž kotlů zvlášť, ať zákazník hned pozná, jestli řešíte přesně jeho problém, nebo jestli u vás vyřídí i tlakovou zkoušku před kolaudací nového bytu.",
        },
        {
          title: "Oprávnění a odbornost na plyn",
          text: "Pokud pracujete s plynovými spotřebiči, patří oprávnění a rozsah prací na web vedle přehledu služeb. Zákazník se tak ujistí, že montáž nebo servis kotle svěří odborníkovi s platným oprávněním, ne někomu bez kvalifikace.",
        },
        {
          title: "Rychlý poptávkový formulář",
          text: "Pár polí místo dlouhého kontaktního formuláře, adresa, popis problému a naléhavost, ať poptávka dorazí co nejrychleji a vy víte, jestli jde o havárii nebo plánovanou zakázku, kterou lze zařadit do kalendáře.",
        },
      ]}
      cenikLead="Pro instalatérskou firmu obvykle stačí Online Vizitka od 7 499 Kč s přehledem služeb a rychlým kontaktem, hotovo do 5 pracovních dní. Rozsáhlejší prezentace se specializacemi zvlášť se hodí jako Promo Page od 9 999 Kč. Web je vždy responzivní, ať zákazník s havárií nemusí zvětšovat text na mobilu."
      slug="web-pro-instalatery"
      serviceType="Tvorba webu pro instalatéry"
      caseExampleTitle="Příklad zakázky: prasklé potrubí o víkendu"
      caseExampleText="Zákazník řeší únik vody v sobotu večer, na mobilu najde váš web, vidí telefon v hlavičce a poznámku o dostupnosti mimo pracovní dobu a rovnou volá. Ještě než dorazíte na místo, mu přes telefon poradíte, kde najde hlavní uzávěr vody, ať se škoda alespoň částečně omezí a nezaplaví se i sousední byt. U neurgentních zakázek, třeba plánované rekonstrukce koupelny nebo výměny starého kotle za kondenzační, zákazník místo volání raději vyplní formulář s popisem a fotkou stávajícího stavu, ať máte při zpětném kontaktu hned představu o rozsahu práce a připravíte orientační nabídku ještě před osobní prohlídkou. U výměny kotle se navíc zeptáte, jestli počítá i s revizí spalinové cesty, kterou je potřeba řešit zvlášť."
      processSteps={[
        {
          title: "Rychlý kontakt",
          text: "Havárie řeší zákazník telefonem přímo z hlavičky webu, běžné a plánované poptávky přes formulář s popisem a fotkou stávajícího stavu.",
        },
        {
          title: "Diagnóza",
          text: "Podle popisu, fotky nebo telefonického rozhovoru odhadnete rozsah práce a domluvíte výjezd, u havárií co nejdřív, u plánovaných zakázek pevný termín podle vaší kapacity.",
        },
        {
          title: "Oprava nebo realizace",
          text: "Práci dokončíte na místě, u větších zakázek jako rozvody nebo kotelna domluvíte harmonogram a postup po etapách, ať zákazník ví, kdy bude bez vody nebo topení.",
        },
        {
          title: "Předání a servisní doporučení",
          text: "Po dokončení předáte doklady k novým spotřebičům a doporučíte, kdy je potřeba další servis nebo revize, třeba roční kontrola kotle nebo revize spalinové cesty.",
        },
      ]}
      faqs={[
        {
          q: "Dá se na web přidat nonstop pohotovostní linka?",
          a: "Ano, telefonní číslo i poznámku o dostupnosti mimo pracovní dobu vám dám hned do hlavičky webu, ať ho zákazník při havárii nemusí hledat v poptávkovém formuláři.",
        },
        {
          q: "Dá se do formuláře přidat pole na adresu a naléhavost zakázky?",
          a: "Ano, formulář rozšíříme o adresu, popis problému a stupeň naléhavosti, ať víte, kterou poptávku řešit přednostně a kterou naplánovat na volný termín v kalendáři.",
        },
        {
          q: "Jak zákazníkovi ukázat, že jedete i mimo běžnou otevírací dobu?",
          a: "Přímo do hlavičky nebo k telefonnímu číslu dáme jasnou poznámku o pohotovostní dostupnosti a případném příplatku za servis mimo pracovní dobu, ať to zákazník vidí na první pohled.",
        },
        {
          q: "Mám oprávnění pracovat s plynovými spotřebiči, jak to zdůraznit na webu?",
          a: "Krátká zmínka o oprávnění a rozsahu prací s plynem patří do přehledu služeb. U montáže a servisu kotlů tak zákazníkovi nahradí to, co by jinak zjišťoval telefonátem.",
        },
        {
          q: "Dá se na web přidat i ceník běžných úkonů, třeba výměny baterie nebo bojleru?",
          a: "Ano, orientační ceník drobných a středních úkonů snižuje počet dotazů na cenu předem a zákazník si sám udělá představu, jestli jde o rychlou opravu, nebo větší zakázku.",
        },
        {
          q: "Poskytujete na provedené instalatérské práce záruku?",
          a: "Pokud na práci záruku dáváte, krátká zmínka o její délce patří k přehledu služeb, hlavně u rozsáhlejších zakázek jako rozvody nebo montáž kotle zákazníky délka záruky zajímá.",
        },
      ]}
      relatedSlugs={["web-pro-elektrikare", "web-pro-studnare", "web-pro-remeslniky", "web-pro-autoservisy"]}
    />
  );
}
