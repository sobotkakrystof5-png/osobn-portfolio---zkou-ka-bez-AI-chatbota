import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro autoservisy na míru",
    description:
      "Tvorba webu pro autoservisy a pneuservisy na míru, přehled služeb, rychlá objednávka termínu, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-autoservisy" },
    openGraph: {
      title: "Web pro autoservisy na míru | VIZEON",
      description: "Web, kde zákazník objedná termín sám, hlavně v sezóně přezouvání, kdy telefonní linky přetěžují.",
      url: "https://vizeon.cz/web-pro-autoservisy",
      type: "website",
    },
  };
}

export default function WebProAutoservisyPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro autoservisy"
      h1="Web pro autoservis, kde zákazník objedná termín sám"
      subhead="Web pro autoservis nebo pneuservis musí hlavně rychle ukázat nabízené služby a umožnit objednat termín bez telefonování, hlavně v sezóně přezouvání, kdy linky přetěžují a zákazníci hledají volný termín na poslední chvíli. Mimo sezónu zase rozhoduje spíš přehled specializací, třeba jestli řešíte i diagnostiku novějších vozů. Zákazník navíc často porovnává víc servisů najednou, takže rychlost odpovědi rozhoduje víc než u jiných oborů."
      bullets={[
        {
          title: "Přehled služeb a specializací",
          text: "Servis, diagnostika, pneuservis, případně příprava vozu na STK zvlášť, ať zákazník hned pozná, co u vás vyřídí a co si musí zajistit jinde. U diagnostiky se hodí zmínit, jaké značky nebo typy vozů obvykle řešíte.",
        },
        {
          title: "Rychlá objednávka termínu",
          text: "Jednoduchý formulář s typem vozu, požadovanou službou a preferovaným termínem místo telefonátu, který v sezóně stejně málokdo stihne vyřídit, obzvlášť během pracovní doby, kdy je zákazník sám v práci.",
        },
        {
          title: "Skladování a přezutí pneumatik",
          text: "Pokud nabízíte i uskladnění sezónních pneu, samostatná zmínka na webu ušetří spoustu telefonátů s dotazem, jestli tuhle službu vůbec děláte, za jakou cenu a jak funguje vyzvednutí.",
        },
        {
          title: "Aktuální ceník základních úkonů",
          text: "Orientační ceny běžných úkonů (výměna oleje, přezutí, diagnostika) přímo na webu snižují počet dotazů typu „kolik to bude stát“ a urychlují rozhodování zákazníka.",
        },
      ]}
      cenikLead="Pro autoservis obvykle stačí Online Vizitka od 7 499 Kč s přehledem služeb a rychlou objednávkou, hotovo do 5 pracovních dní. U rozsáhlejší nabídky (servis, pneuservis, diagnostika zvlášť) se hodí Promo Page od 9 999 Kč. Web je vždy responzivní, ať zákazník objedná termín i z mobilu na cestě do práce, a to i mimo otvírací dobu servisu."
      slug="web-pro-autoservisy"
      serviceType="Tvorba webu pro autoservisy"
      caseExampleTitle="Příklad zakázky: přezutí pneu v sezóně"
      caseExampleText="Na začátku sezóny přezouvání zákazník hledá servis s volným termínem, na webu vidí přehled služeb, orientační ceník a rovnou přes formulář zadá typ vozu, požadovanou službu a to, jestli má pneumatiky uskladněné u vás z minulé sezóny. V období, kdy telefonní linky přetěžují, tohle rozhoduje o tom, jestli si termín stihne zamluvit u vás, nebo zavolá jinam. Pokud při přezutí zjistíte, že pneumatiky jsou na hraně dezénu, doporučíte výměnu rovnou na místě, aby zákazník nemusel kvůli tomu přijíždět znovu. U vozu s najetými kilometry navíc můžete rovnou upozornit na blížící se výměnu oleje nebo jiný servisní úkon, který se z historie vozu dá odhadnout."
      processSteps={[
        {
          title: "Objednávka termínu",
          text: "Zákazník přes web zadá typ vozu, službu a preferovaný termín, případně poznámku k aktuálnímu stavu vozu.",
        },
        {
          title: "Potvrzení a příjem vozu",
          text: "Termín potvrdíte, vůz přijmete a domluvíte rozsah práce, případně doporučíte doplňkové úkony podle stavu vozu a najetých kilometrů.",
        },
        {
          title: "Servis",
          text: "Práci provedete v domluveném rozsahu, u zjištěných závad navíc zákazníka nejdřív kontaktujete s nabídkou opravy, než cokoliv navíc uděláte.",
        },
        {
          title: "Předání a doporučení",
          text: "Vůz předáte a doporučíte termín dalšího servisu nebo výměny, orientační ceny na webu už předem snížily počet dotazů na cenu.",
        },
      ]}
      faqs={[
        {
          q: "Dá se na web přidat objednávkový systém na přezutí pneu?",
          a: "Ano, v sezóně přezouvání se objednávkový kalendář hodí obzvlášť, aby se linky nezahltily. Vyřešíme ho jako webovou aplikaci na míru.",
        },
        {
          q: "Zvládne formulář rozlišit typ vozu a požadovanou službu?",
          a: "Ano, formulář nastavím tak, aby zákazník vybral typ vozu, službu a preferovaný termín, ať máte rovnou informace potřebné k naplánování.",
        },
        {
          q: "Dá se na web přidat i připomínka blížící se STK nebo výměny oleje?",
          a: "Ano, takovou připomínku lze zabudovat jako součást webové aplikace na míru, případně napojenou na e-mail nebo SMS.",
        },
        {
          q: "Dá se na web přidat i info o uskladnění sezónních pneumatik?",
          a: "Ano, pokud tuhle službu nabízíte, samostatná zmínka v přehledu služeb ušetří dotazy, jestli u vás pneumatiky vůbec můžete přes sezónu uskladnit.",
        },
        {
          q: "Dá se na web přidat i historie servisu pro stálé zákazníky?",
          a: "Ano, jednoduchý přehled minulých návštěv a provedených úkonů se dá zabudovat jako součást webové aplikace na míru, hodí se hlavně pro připomínky pravidelného servisu.",
        },
        {
          q: "Dá se na web přidat i informace o zapůjčení náhradního vozu na dobu opravy?",
          a: "Ano, pokud tuhle službu nabízíte, krátká zmínka v přehledu služeb pomůže zákazníkům s delší opravou rozhodnout se rychleji, protože řeší, jak se mezitím dostanou do práce.",
        },
      ]}
      relatedSlugs={["web-pro-instalatery", "web-pro-elektrikare", "web-pro-zamecniky"]}
    />
  );
}
