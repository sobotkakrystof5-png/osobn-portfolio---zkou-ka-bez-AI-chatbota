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
      subhead="Web pro elektrikáře musí kombinovat dvě věci: rychlý kontakt na havarijní zásahy a jasný přehled toho, že děláte i revize a rekonstrukce podle norem."
      bullets={[
        {
          title: "Nonstop kontakt na havárie",
          text: "Telefonní číslo viditelné hned v hlavičce, protože výpadek proudu nebo zkrat nečeká na pracovní dobu.",
        },
        {
          title: "Přehled služeb a revizí",
          text: "Elektroinstalace, revize, rekonstrukce zvlášť, ať zákazník hned pozná, co přesně nabízíte.",
        },
        {
          title: "Rychlá poptávka s popisem zakázky",
          text: "Jednoduchý formulář, kam zákazník napíše, o jakou práci jde, ať máte hned potřebné informace.",
        },
      ]}
      cenikLead="Pro elektrikářskou firmu obvykle stačí Online Vizitka od 7 499 Kč s přehledem služeb, hotovo do 5 pracovních dní."
      slug="web-pro-elektrikare"
      serviceType="Tvorba webu pro elektrikáře"
      faqs={[
        {
          q: "Dá se na web přidat i objednávka revize?",
          a: "Ano, jednoduchý formulář na objednání revize nebo prohlídky vám do webu zabuduji jako součást poptávkového formuláře.",
        },
      ]}
      relatedSlugs={["web-pro-instalatery", "web-pro-zamecniky", "web-pro-remeslniky"]}
    />
  );
}
