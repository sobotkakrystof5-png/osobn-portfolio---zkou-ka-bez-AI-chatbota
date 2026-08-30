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
    title: "Tvorba webových stránek na míru — vizitka, promo stránka i plnohodnotný web",
    description:
      "Tvorba webových stránek na míru pro živnostníky a malé firmy, od jednoduché online vizitky po plnohodnotný web se systémy na míru. Ceník, proces i to, co web obsahuje.",
    alternates: { canonical: "https://vizeon.cz/sluzby/tvorba-webovych-stranek" },
    openGraph: {
      title: "Tvorba webových stránek na míru | VIZEON",
      description: "Od jednoduché vizitky po plnohodnotný web na míru, bez šablon a s jasným ceníkem.",
      url: "https://vizeon.cz/sluzby/tvorba-webovych-stranek",
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
        { "@type": "ListItem", position: 3, name: "Tvorba webových stránek", item: "https://vizeon.cz/sluzby/tvorba-webovych-stranek" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba webových stránek na míru",
      name: "Tvorba webových stránek na míru",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/tvorba-webovych-stranek",
      description:
        "Weby na míru pro živnostníky a malé firmy, ať už jde o online vizitku, promo stránku nebo vícestránkový web se systémy na míru.",
    },
  ],
};

const packages = [
  { name: "Micro Page", price: "od 4 999 Kč", desc: "Jedna stránka na jeden účel, ať je to coming soon, link-in-bio nebo redirect." },
  { name: "Online Vizitka", price: "od 7 499 Kč", desc: "Jméno, logo, kontakt a krátké představení firmy pro snadnou dohledatelnost." },
  { name: "Promo Page", price: "od 9 999 Kč", desc: "Landing page zaměřená na jednu konverzi, poptávku nebo objednávku." },
  { name: "Pro Web", price: "od 14 999 Kč", desc: "Vícestránkový web s pokročilými animacemi a systémy na míru." },
  { name: "Web Care", price: "999 Kč/měs", desc: "Průběžná správa, aktualizace a bezpečnost hotového webu." },
];

const obsahuje = [
  { h: "Design na míru vašemu oboru", p: "Žádná univerzální šablona. Vzhled i struktura vychází z toho, jak zákazníci ve vašem oboru skutečně hledají a rozhodují se." },
  { h: "Mobilní zobrazení na prvním místě", p: "Většina návštěvníků přijde z mobilu, a proto web odpovídá rychlostí načítání i ovládáním." },
  { h: "Jasná cesta k poptávce", p: "Tlačítka a formuláře tam, kde je zákazník skutečně potřebuje, ne schované na páté podstránce." },
  { h: "SEO základ", p: "Správná struktura nadpisů, meta popisky a rychlost načítání, ať vás Google i Seznam umí najít." },
];

export default function TvorbaWebovychStranekPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/tvorba-webovych-stranek" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Tvorba webových stránek na míru"
          h1="Web, který přivádí zákazníky, ne jen existuje"
          lead={
            <>
              Ať potřebujete jednoduchou online vizitku, prodejní landing page nebo vícestránkový
              web se systémy na míru, každý pixel ladím ručně podle vašeho oboru. Tvoříte firemní
              web? Podívejte se na{" "}
              <Link href="/sluzby/tvorba-webu-pro-firmy" className={t.link}>
                tvorbu webu pro firmy
              </Link>
              . Podrobný postup pro živnostníky najdete na stránce{" "}
              <Link href="/tvorba-webu-pro-zivnostniky" className={t.link}>
                tvorba webu pro živnostníky
              </Link>
              .
            </>
          }
        />

        <div className="space-y-14">
          <section aria-labelledby="obsahuje">
            <h2 id="obsahuje" className={cn(t.h2Page, "mb-6")}>Co web obsahuje</h2>
            <div className="space-y-6">
              {obsahuje.map((o) => (
                <div key={o.h} className="border-l border-white/[0.06] pl-5">
                  <h3 className={cn(t.h3, "mb-1.5")}>{o.h}</h3>
                  <p className={t.body}>{o.p}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="varianty">
            <h2 id="varianty" className={cn(t.h2Page, "mb-6")}>Varianty a ceny</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {packages.map((p) => (
                <div key={p.name} className="border border-white/[0.06] p-5">
                  <div className="flex items-baseline justify-between gap-3 mb-1.5">
                    <h3 className={t.h3}>{p.name}</h3>
                    <span className="font-cormorant text-[20px] text-[#c9a84c] whitespace-nowrap">{p.price}</span>
                  </div>
                  <p className={t.body}>{p.desc}</p>
                </div>
              ))}
            </div>
            <p className={cn(t.body, "mt-6")}>
              Kompletní a aktuální ceník včetně toho, co je v ceně, najdete na{" "}
              <Link href="/cena-tvorby-webu" className={t.link}>samostatné stránce s ceníkem</Link>.
            </p>
          </section>

          <section aria-labelledby="obor">
            <h2 id="obor" className={cn(t.h2Page, "mb-4")}>Podle oboru</h2>
            <p className={t.body}>
              Některým oborům věnuju samostatné stránky s konkrétními příklady, třeba{" "}
              <Link href="/web-pro-remeslniky" className={t.link}>web pro řemeslníky</Link>,{" "}
              <Link href="/web-pro-kadernictvi" className={t.link}>kadeřnictví</Link>,{" "}
              <Link href="/web-pro-ucetni" className={t.link}>účetní kancelář</Link>{" "}
              nebo{" "}
              <Link href="/web-pro-masery-a-wellness" className={t.link}>maséry a wellness</Link>.
              Pokud váš obor mezi nimi chybí, princip zůstává stejný. Web navrhnu podle toho, jak
              u vás skutečně vznikají zakázky.
            </p>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete web na míru vašemu oboru?"
          subheading="Nezávazná konzultace zdarma. Probereme rozsah a doporučím variantu, která dává smysl."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
