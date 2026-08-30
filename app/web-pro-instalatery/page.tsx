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
      subhead="Web pro instalatéry řeším s důrazem na rychlost kontaktu — havárie vody nečeká na pracovní dobu, a zákazník osloví toho, koho najde a osloví nejrychleji."
      bullets={[
        {
          title: "Nonstop kontakt na havárie",
          text: "Telefonní číslo a poznámka o dostupnosti přímo v hlavičce webu, ať vás zákazník nemusí hledat.",
        },
        {
          title: "Přehled specializací",
          text: "Rozvody vody, topení, odpady zvlášť, ať zákazník hned pozná, jestli řešíte přesně jeho problém.",
        },
        {
          title: "Rychlý poptávkový formulář",
          text: "Pár polí místo dlouhého kontaktního formuláře, ať poptávka dorazí co nejrychleji.",
        },
      ]}
      cenikLead="Pro instalatérskou firmu obvykle stačí Online Vizitka od 7 499 Kč s přehledem služeb a rychlým kontaktem, hotovo do 5 pracovních dní."
      slug="web-pro-instalatery"
      serviceType="Tvorba webu pro instalatéry"
      faqs={[
        {
          q: "Dá se na web přidat nonstop pohotovostní linka?",
          a: "Ano, telefonní číslo i poznámku o dostupnosti mimo pracovní dobu vám dám hned do hlavičky webu.",
        },
      ]}
      relatedSlugs={["web-pro-elektrikare", "web-pro-studnare", "web-pro-remeslniky"]}
    />
  );
}
