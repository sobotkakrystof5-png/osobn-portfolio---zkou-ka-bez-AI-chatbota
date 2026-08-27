import type { Metadata } from "next";
import Link from "next/link";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro zámečníky na míru | VIZEON",
    description:
      "Tvorba webu pro zámečníky a zámečnictví na míru — galerie realizací, rychlý kontakt na poptávku, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-zamecniky" },
    openGraph: {
      title: "Web pro zámečníky na míru | VIZEON",
      description: "Prezentace zámečnické firmy online — galerie realizací a rychlá poptávka, bez šablon.",
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
      subhead="Web pro zámečníky musí hlavně rychle ukázat, co umíte, a nabídnout kontakt, který zvedne telefon i mimo pracovní dobu — zámečnictví se totiž často řeší narychlo: vypadlý zámek, vloupání, poškozené dveře."
      bullets={[
        {
          title: "Galerie realizací",
          text: "Fotky hotových zakázek — mříže, kované brány, bezpečnostní dveře, otevírání zámků. Zákazník si tak ověří vaši práci dřív, než zavolá.",
        },
        {
          title: "Rychlý kontakt na poptávku",
          text: "Telefonní číslo viditelné hned v hlavičce a jednoduchý formulář — u havarijních zakázek rozhoduje, jak rychle vás zákazník najde a osloví.",
        },
        {
          title: "Přehled služeb podle oboru",
          text: "Odemykání, výroba na míru, servis a montáž zvlášť — zákazník hned vidí, jestli řešíte přesně jeho problém.",
        },
      ]}
      cenikLead="Pro zámečnickou firmu se nejčastěji hodí Online Vizitka nebo Promo Page s galerií realizací — od 7 499 Kč, hotovo do 10 pracovních dní."
      portfolioNote={
        <>
          Podobnou zakázku jsem už dělal — web pro{" "}
          <Link href="/#portfolio" className="text-[#c9a84c] hover:underline">
            Schovinox
          </Link>
          , rodinnou zámečnickou a kovovýrobní firmu se 40letou tradicí.
        </>
      }
      faqs={[
        {
          q: "Dá se na web přidat i nonstop kontakt pro havarijní zásahy?",
          a: "Ano — telefonní číslo a poznámku o dostupnosti mimo pracovní dobu vám dám hned do hlavičky webu, ať ho zákazník nemusí hledat.",
        },
      ]}
    />
  );
}
