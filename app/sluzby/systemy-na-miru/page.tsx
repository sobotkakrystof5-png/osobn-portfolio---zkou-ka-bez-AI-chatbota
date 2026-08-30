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
    title: "Systémy na míru — rezervace, kalkulačky a nástroje",
    description:
      "Rezervační systémy, kalkulačky a nástroje na míru pro živnostníky a malé firmy. Online rezervace bez telefonování, automatický výpočet ceny a vlastní dashboard.",
    alternates: { canonical: "https://vizeon.cz/sluzby/systemy-na-miru" },
    openGraph: {
      title: "Systémy na míru | VIZEON",
      description: "Rezervační systémy, kalkulačky a nástroje na míru vám ušetří zbytečné telefonování.",
      url: "https://vizeon.cz/sluzby/systemy-na-miru",
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
        { "@type": "ListItem", position: 3, name: "Systémy na míru", item: "https://vizeon.cz/sluzby/systemy-na-miru" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Webová aplikace na míru",
      name: "Systémy na míru",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/systemy-na-miru",
      description:
        "Rezervační systémy, kalkulačky a nástroje na míru napojené na web klienta.",
    },
  ],
};

const nabizim = [
  { name: "Rezervační systém", desc: "Zákazník si vybere volný termín a rovnou ho zarezervuje. Bez telefonátů a přeposílání zpráv." },
  { name: "Kalkulačka na míru", desc: "Automatický výpočet ceny nebo nabídky podle vstupů, které zadá zákazník." },
  { name: "Interaktivní formuláře", desc: "Sběr poptávek je chytřejší, protože se formulář přizpůsobí podle toho, co zákazník potřebuje." },
  { name: "Vlastní dashboard", desc: "Přehled objednávek, rezervací nebo dat na jednom místě, přístupný odkudkoli." },
];

export default function SystemyNaMiruPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/systemy-na-miru" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Systémy na míru"
          h1="Nástroje, které vám ušetří telefonáty a papírování"
          lead="Postavím vám rezervační systém, kalkulačku nebo vlastní dashboard přesně na míru tomu, jak u vás vznikají zakázky, ne obecné univerzální řešení."
        />

        <div className="space-y-14">
          <section aria-labelledby="nabizim">
            <h2 id="nabizim" className={cn(t.h2Page, "mb-6")}>Co nabízím</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {nabizim.map((n) => (
                <div key={n.name} className="border border-white/[0.06] p-5">
                  <h3 className={cn(t.h3, "mb-1.5")}>{n.name}</h3>
                  <p className={t.body}>{n.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="pro-koho">
            <h2 id="pro-koho" className={cn(t.h2Page, "mb-4")}>Pro koho se to hodí</h2>
            <p className={t.body}>
              Nejčastěji řeším rezervační systémy pro{" "}
              <Link href="/web-pro-kadernictvi" className={t.link}>kadeřnice</Link>{" "}
              a{" "}
              <Link href="/web-pro-masery-a-wellness" className={t.link}>masérky</Link>, kalkulačky
              pro{" "}
              <Link href="/web-pro-remeslniky" className={t.link}>řemeslníky</Link>, kteří počítají
              cenu podle rozsahu zakázky, a interní nástroje pro obory, kde je potřeba přehled nad
              víc zakázkami najednou, třeba pro{" "}
              <Link href="/web-pro-ucetni" className={t.link}>účetní kancelář</Link>.
            </p>
          </section>

          <section aria-labelledby="proces">
            <h2 id="proces" className={cn(t.h2Page, "mb-4")}>Jak probíhá spolupráce</h2>
            <ol className={cn(t.body, "space-y-3 list-decimal list-inside")}>
              <li><span className="text-[#f0ece6]">Konzultace zdarma</span>. Probereme, jak proces dnes funguje a co má systém automatizovat.</li>
              <li><span className="text-[#f0ece6]">Návrh a tvorba</span>. Navrhnu logiku nástroje a napojím ho na váš web.</li>
              <li><span className="text-[#f0ece6]">Předání a zaškolení</span>. Dostanete přístupy a stručný návod, jak systém spravovat.</li>
            </ol>
          </section>

          <section aria-labelledby="cena">
            <h2 id="cena" className={cn(t.h2Page, "mb-4")}>Cena</h2>
            <p className={t.body}>
              Cena systému na míru se odvíjí od rozsahu a složitosti logiky. Na konzultaci probereme
              zadání a pošlu konkrétní nabídku. Orientační ceny běžných webových balíčků, do kterých
              se systém často zapojuje, najdete na{" "}
              <Link href="/cena-tvorby-webu" className={t.link}>stránce s ceníkem</Link>.
            </p>
          </section>
        </div>

        <ClosingCTA
          heading="Máte proces, který zabírá zbytečně moc času?"
          subheading="Nezávazná konzultace zdarma. Probereme, jestli se to dá zautomatizovat."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
