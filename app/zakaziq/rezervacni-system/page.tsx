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
    title: "Rezervační systém — konzultace na jedno kliknutí v ZakazIQ",
    description:
      "Rezervační systém ZakazIQ — domluvte si konzultaci s VIZEON přímo v klientském portálu, bez volání a čekání na odpověď.",
    alternates: { canonical: "https://vizeon.cz/zakaziq/rezervacni-system" },
    openGraph: {
      title: "Rezervační systém ZakazIQ | VIZEON",
      description: "Konzultaci s VIZEON si domluvíte přímo v systému, bez volání a čekání.",
      url: "https://vizeon.cz/zakaziq/rezervacni-system",
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
        { "@type": "ListItem", position: 2, name: "ZakazIQ", item: "https://vizeon.cz/zakaziq" },
        { "@type": "ListItem", position: 3, name: "Rezervační systém", item: "https://vizeon.cz/zakaziq/rezervacni-system" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Rezervační systém",
      name: "Rezervační systém ZakazIQ",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/zakaziq/rezervacni-system",
      description: "Rezervační funkce klientského portálu ZakazIQ pro domlouvání konzultací bez telefonování.",
    },
  ],
};

export default function RezervacniSystemPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/zakaziq/rezervacni-system" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Rezervační systém"
          h1="Rezervační systém, díky kterému si konzultaci domluvíte sami"
          lead="ZakazIQ v sobě má vlastní rezervační funkci — jakmile jste v systému, další konzultaci s VIZEON si domluvíte na pár kliknutí, bez telefonátu a bez čekání, až se ozvu zpátky."
        />

        <div className="space-y-14">
          <section aria-labelledby="jak">
            <h2 id="jak" className={cn(t.h2Page, "mb-4")}>Jak rezervace v ZakazIQ funguje</h2>
            <p className={t.body}>
              Po první konzultaci vás přiřadím do systému ZakazIQ. Odtud si další konzultaci
              domluvíte sami — vyberete si volný termín přímo v systému, ne přes e-mail nebo telefon.
              Víc o tom, jak celý klientský portál funguje, najdete na stránce{" "}
              <Link href="/zakaziq" className={t.link}>ZakazIQ</Link>.
            </p>
          </section>

          <section aria-labelledby="pro-klienty">
            <h2 id="pro-klienty" className={cn(t.h2Page, "mb-4")}>Rezervační systém i pro váš vlastní web</h2>
            <p className={t.body}>
              Kromě rezervací v ZakazIQ stavím rezervační systémy i přímo do webů klientů — třeba pro{" "}
              <Link href="/web-pro-kadernictvi" className={t.link}>kadeřnictví</Link>,{" "}
              <Link href="/web-pro-masery-a-wellness" className={t.link}>masérky a wellness</Link>{" "}
              nebo{" "}
              <Link href="/web-pro-fitness-trenery" className={t.link}>fitness trenéry</Link>, ať se
              i vaši vlastní zákazníci objednávají sami. Přehled řešení najdete na stránce{" "}
              <Link href="/sluzby/systemy-na-miru" className={t.link}>systémy na míru</Link>.
            </p>
          </section>

          <section aria-labelledby="faq-rezervace">
            <h2 id="faq-rezervace" className={cn(t.h2Page, "mb-6")}>Časté otázky</h2>
            <div className="space-y-6">
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Musím se do ZakazIQ registrovat zvlášť?</h3>
                <p className={t.body}>Ne, po objednání první konzultace přes VIZEON vás do systému přiřadím automaticky. Nic navíc řešit nemusíte.</p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Je rezervační systém v ZakazIQ to samé, co rezervační systém pro můj web?</h3>
                <p className={t.body}>Ne, jde o dvě různé věci. ZakazIQ slouží k domlouvání konzultací mezi vámi a mnou. Rezervační systém pro váš web řeším samostatně, jako webovou aplikaci na míru pro vaše vlastní zákazníky.</p>
              </div>
            </div>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete rezervační systém i pro vlastní zákazníky?"
          subheading="Nezávazná konzultace zdarma — probereme, jaké řešení sedí vašemu oboru."
        />

        <div className="mt-14">
          <Link href="/zakaziq" className={t.backLink}>← Zpět na ZakazIQ</Link>
        </div>
      </div>
    </PageShell>
  );
}
