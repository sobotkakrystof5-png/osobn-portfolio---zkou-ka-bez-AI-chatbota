import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/layout/PageShell";
import { PageHeader } from "@/components/layout/PageHeader";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import AnalyticsTracker from "@/components/AnalyticsTracker";
import { t } from "@/lib/ui";
import { cn } from "@/lib/utils";

export function generateMetadata(): Metadata {
  return {
    title: "Tvorba webu pro firmy na míru",
    description:
      "Tvorba firemního webu na míru — víc podstránek, prezentace týmu a oddělení, struktura pro B2B rozhodování. Rozsah podle velikosti firmy.",
    alternates: { canonical: "https://vizeon.cz/sluzby/tvorba-webu-pro-firmy" },
    openGraph: {
      title: "Tvorba webu pro firmy na míru | VIZEON",
      description: "Firemní web, který působí důvěryhodně od první schůzky až po podpis smlouvy.",
      url: "https://vizeon.cz/sluzby/tvorba-webu-pro-firmy",
      type: "website",
    },
  };
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Domů", item: "https://vizeon.cz" },
        { "@type": "ListItem", position: 2, name: "Služby", item: "https://vizeon.cz/sluzby" },
        { "@type": "ListItem", position: 3, name: "Tvorba webu pro firmy", item: "https://vizeon.cz/sluzby/tvorba-webu-pro-firmy" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba webu pro firmy",
      name: "Tvorba webu pro firmy na míru",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/tvorba-webu-pro-firmy",
      description:
        "Tvorba firemního webu na míru s víc podstránkami, prezentací týmu a oddělení, strukturou pro B2B rozhodování.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Čím se web pro firmu liší od webu pro živnostníka?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Firemní web obvykle řeší víc cílových skupin najednou (klienty, partnery, případně uchazeče o práci), má víc podstránek a delší rozhodovací cyklus u návštěvníka. Struktura i obsah tomu odpovídají — víc prostoru pro tým, historii a reference.",
          },
        },
        {
          "@type": "Question",
          name: "Zvládnete web i pro firmu s víc pobočkami nebo odděleními?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, strukturu webu navrhnu tak, ať návštěvník rychle najde oddělení nebo pobočku, kterou hledá, i když jich je víc. Probereme to na konzultaci podle konkrétní organizace firmy.",
          },
        },
      ],
    },
  ],
};

export default function TvorbaWebuProFirmyPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/tvorba-webu-pro-firmy" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Tvorba webu pro firmy"
          h1="Web pro firmu, který působí důvěryhodně na první schůzce i naposled"
          lead={
            <>
              Firemní web řeším jinak než web pro jednotlivého živnostníka — obvykle jde o víc
              podstránek, prezentaci týmu nebo oddělení a strukturu, která dodá důvěryhodnost při
              jednání s klienty i partnery. Hledáte spíš rychlou vizitku pro sebe? Podívejte se na{" "}
              <Link href="/sluzby/tvorba-webovych-stranek" className={t.link}>
                tvorbu webových stránek na míru
              </Link>
              .
            </>
          }
        />

        <div className="space-y-14">
          <section aria-labelledby="proc">
            <h2 id="proc" className={cn(t.h2Page, "mb-4")}>Proč firemní web potřebuje jinou strukturu</h2>
            <p className={t.body}>
              U firmy web obvykle neřeší jeden rozhodovací moment jednoho člověka, ale víc lidí a
              víc kroků najednou — klienta, který si o firmě dělá obrázek před schůzkou, partnera,
              který ověřuje reference, případně uchazeče o práci. Delší rozhodovací cyklus znamená,
              že web musí sloužit i jako referenční materiál, ke kterému se návštěvník vrací, ne jen
              jako první kontakt.
            </p>
          </section>

          <section aria-labelledby="obsahuje">
            <h2 id="obsahuje" className={cn(t.h2Page, "mb-6")}>Co firemní web obsahuje</h2>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Přehled služeb podle cílové skupiny</h3>
                <p className={t.body}>Struktura služeb nebo oddělení rozdělená tak, aby v ní rychle našel cestu klient, dodavatel i partner — každý jinou.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Prezentace týmu a historie firmy</h3>
                <p className={t.body}>Konkrétní lidé a roky zkušeností budují u B2B rozhodování důvěru rychleji než obecné firemní fráze.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Reference a případové studie</h3>
                <p className={t.body}>Konkrétní realizace a spolupráce s jinými firmami — u firemního rozhodování často rozhoduje víc než cena.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Struktura pro víc oddělení nebo poboček</h3>
                <p className={t.body}>Navigace i kontaktní údaje uspořádané tak, ať návštěvník rychle najde přesně tu část firmy, kterou hledá.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="spoluprace">
            <h2 id="spoluprace" className={cn(t.h2Page, "mb-4")}>Jak probíhá spolupráce</h2>
            <p className={t.body}>
              Postup je stejný jako u ostatních projektů, jen s víc prostorem na sladění se všemi
              zúčastněnými stranami ve firmě. Kompletní sedmikrokový proces najdete na stránce{" "}
              <Link href="/spoluprace" className={t.link}>jak probíhá spolupráce</Link>.
            </p>
          </section>

          <section aria-labelledby="cena">
            <h2 id="cena" className={cn(t.h2Page, "mb-4")}>Kolik stojí web pro firmu</h2>
            <p className={t.body}>
              Pro firemní web s víc podstránkami se nejčastěji hodí Pro Web od 14 999 Kč, u rozsáhlejší
              struktury s víc odděleními cenu upřesníme podle rozsahu. Průběžnou správu pak řeší
              Web Care za 999 Kč/měsíc. Kompletní ceník najdete na{" "}
              <Link href="/cena-tvorby-webu" className={t.link}>samostatné stránce s ceníkem</Link>.
            </p>
          </section>

          <section aria-labelledby="faq-firmy">
            <h2 id="faq-firmy" className={cn(t.h2Page, "mb-6")}>Časté otázky o webu pro firmy</h2>
            <div className="space-y-6">
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Čím se web pro firmu liší od webu pro živnostníka?</h3>
                <p className={t.body}>Firemní web obvykle řeší víc cílových skupin najednou (klienty, partnery, případně uchazeče o práci), má víc podstránek a delší rozhodovací cyklus u návštěvníka. Struktura i obsah tomu odpovídají — víc prostoru pro tým, historii a reference.</p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Zvládnete web i pro firmu s víc pobočkami nebo odděleními?</h3>
                <p className={t.body}>Ano, strukturu webu navrhnu tak, ať návštěvník rychle najde oddělení nebo pobočku, kterou hledá, i když jich je víc. Probereme to na konzultaci podle konkrétní organizace firmy.</p>
              </div>
            </div>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete web, který firmě dodá důvěryhodnost při každém jednání?"
          subheading="Nezávazná konzultace zdarma — probereme strukturu firmy a co má web obsahovat."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
