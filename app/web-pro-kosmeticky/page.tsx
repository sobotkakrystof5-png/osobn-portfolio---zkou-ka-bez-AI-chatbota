import type { Metadata } from "next";
import { MicroServicePage } from "@/components/pillar/MicroServicePage";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro kosmetičky na míru",
    description:
      "Tvorba webu pro kosmetický salon na míru, online rezervace, galerie proměn, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-kosmeticky" },
    openGraph: {
      title: "Web pro kosmetičky na míru | VIZEON",
      description: "Web s online rezervací, kde se klientka objedná na ošetření sama, bez volání.",
      url: "https://vizeon.cz/web-pro-kosmeticky",
      type: "website",
    },
  };
}

export default function WebProKosmetickyPage() {
  return (
    <MicroServicePage
      kicker="— Web na míru pro kosmetičky"
      h1="Web pro kosmetičky, kde se klientka objedná bez volání"
      subhead="Web pro kosmetický salon řeším podobně jako u kadeřnictví — s důrazem na online rezervaci a galerii, která ukáže výsledky ošetření dřív, než klientka napíše zprávu."
      bullets={[
        {
          title: "Online rezervační systém",
          text: "Klientka si vybere ošetření a termín sama, i večer nebo o víkendu, bez telefonátu.",
        },
        {
          title: "Galerie proměn a ošetření",
          text: "Fotky před/po a ukázky práce budují důvěru rychleji než jakýkoli popis v textu.",
        },
        {
          title: "Přehled ošetření a ceník",
          text: "Jasně rozdělené kategorie (pleť, nehty, řasy) s orientační cenou, ať klientka ví, co si objednává.",
        },
      ]}
      cenikLead="Prezentace s galerií a ceníkem obvykle vychází jako Online Vizitka od 7 499 Kč nebo Promo Page od 9 999 Kč, rezervační systém se řeší jako webová aplikace zvlášť."
      slug="web-pro-kosmeticky"
      serviceType="Tvorba webu pro kosmetičky"
      faqs={[
        {
          q: "Dá se na web přidat prodej dárkových poukazů?",
          a: "Ano, dárkové poukazy patří mezi žádané doplňky i u kosmetických studií, vyřešíme je jako součást webové aplikace na míru.",
        },
      ]}
      relatedSlugs={["web-pro-kadernictvi", "web-pro-masery-a-wellness", "web-pro-fitness-trenery"]}
      hubHref="/"
      hubLabel="← Zpět na hlavní stránku"
    />
  );
}
