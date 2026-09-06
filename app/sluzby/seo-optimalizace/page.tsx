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
    title: "SEO optimalizace webu — audit, lokální, obsahové i technické SEO",
    description:
      "SEO optimalizace webu pro Google i Seznam. Audit, lokální SEO přes Google Business Profile a Firmy.cz, obsahová strategie a technické SEO na jednom místě.",
    alternates: { canonical: "https://vizeon.cz/sluzby/seo-optimalizace" },
    openGraph: {
      title: "SEO optimalizace webu | VIZEON",
      description: "SEO optimalizace pro Google i Seznam — audit, lokální SEO, obsahová strategie a technické SEO.",
      url: "https://vizeon.cz/sluzby/seo-optimalizace",
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
        { "@type": "ListItem", position: 3, name: "SEO optimalizace", item: "https://vizeon.cz/sluzby/seo-optimalizace" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "SEO optimalizace webu",
      name: "SEO optimalizace webu",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/seo-optimalizace",
      description:
        "SEO optimalizace webu pro Google i Seznam — audit, lokální SEO, obsahová strategie a technické SEO.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Platí se SEO jednorázově, nebo měsíčně?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Audit je jednorázová položka s pevně daným rozsahem. Lokální, obsahové a technické SEO obvykle funguje jako průběžná spolupráce, protože jde o dlouhodobou práci na pozicích, ne o jednorázový zásah.",
          },
        },
        {
          "@type": "Question",
          name: "Od čeho se odvíjí cena SEO optimalizace?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Hlavně od toho, jestli řešíte audit nebo dlouhodobou spolupráci, jak velký a složitý web máte, a jak konkurenceschopný je váš obor ve výsledcích vyhledávání.",
          },
        },
        {
          "@type": "Question",
          name: "V jakém pořadí SEO řešit, když chci víc služeb najednou?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Obvykle audit, pak technické SEO jako základ a až na něj obsahová strategie a lokální SEO. Nový obsah se hůř zaindexuje na webu, který má technické chyby.",
          },
        },
      ],
    },
  ],
};

const pilire = [
  {
    title: "SEO audit webu",
    text: "Zjistím, kde web ztrácí pozice i poptávky — technické chyby, chybějící klíčová slova, srovnání s konkurencí. Výstupem je přehledný report s doporučeními seřazenými podle dopadu, ne jen seznam problémů.",
    href: "/sluzby/seo-optimalizace/audit",
  },
  {
    title: "Lokální SEO",
    text: "Nastavím Google Business Profile i Firmy.cz, ať vás lidé z okolí najdou na Googlu i na Seznamu. Řeším i konzistenci údajů napříč weby a práci s recenzemi — to nejvíc rozhoduje o zobrazení v mapovém výřezu výsledků.",
    href: "/sluzby/seo-optimalizace/lokalni-seo",
  },
  {
    title: "Obsahové SEO",
    text: "Klíčová slova a obsahová strategie, díky které web dlouhodobě roste v přirozeném vyhledávání. Stránky navíc propojím tak, aby si navzájem posilovaly pozice, ne aby si konkurovaly o stejná klíčová slova.",
    href: "/sluzby/seo-optimalizace/obsahove-seo",
  },
  {
    title: "Technické SEO",
    text: "Rychlost, strukturovaná data a indexovatelnost — základ, bez kterého žádné SEO nefunguje. Bez rychlého a dobře indexovatelného webu se neprojeví ani sebelepší obsah nebo odkazy.",
    href: "/sluzby/seo-optimalizace/technicke-seo",
  },
];

export default function SeoOptimalizacePage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/seo-optimalizace" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="SEO optimalizace"
          h1="SEO optimalizace, po které vás najdou na Googlu i Seznamu"
          lead="V Česku nestačí optimalizovat jen pro Google — Seznam má vlastní fulltextový vyhledávač a spoustu lidí, kteří ho pořád používají. SEO řeším pro oba, ne jen pro jeden z nich."
        />

        <div className="space-y-6 mb-14">
          {pilire.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group block border border-white/[0.06] hover:border-[rgba(201,168,76,0.3)] p-6 md:p-7 transition-colors duration-300"
            >
              <h2 className={cn(t.h3, "text-[16px] mb-2 group-hover:text-[#c9a84c] transition-colors duration-300")}>
                {p.title}
              </h2>
              <p className={cn(t.body, "mb-3")}>{p.text}</p>
              <span className="font-inter font-light text-[11px] tracking-[0.08em] uppercase text-[#c9a84c]/70 group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300 inline-block">
                Zjistit víc →
              </span>
            </Link>
          ))}
        </div>

        <section aria-labelledby="poradi" className="mb-14">
          <h2 id="poradi" className={cn(t.h2Page, "mb-4")}>V jakém pořadí SEO řešit</h2>
          <p className={cn(t.body, "mb-6")}>
            Když neřešíte jen jednu položku, ale komplexní SEO, dává smysl postupovat v určitém
            pořadí — jinak riskujete, že investujete čas do obsahu, který kvůli technickým chybám
            nikdo nenajde.
          </p>
          <div className="space-y-6">
            <div className="border-l border-white/[0.06] pl-5">
              <h3 className={cn(t.h3, "mb-1.5")}>1. Audit jako výchozí bod</h3>
              <p className={t.body}>
                Audit ukáže, kde web nejvíc ztrácí, a podle toho se rozhodne, jestli má smysl
                začít technickým SEO, obsahem, nebo lokální optimalizací.
              </p>
            </div>
            <div className="border-l border-white/[0.06] pl-5">
              <h3 className={cn(t.h3, "mb-1.5")}>2. Technické SEO jako základ</h3>
              <p className={t.body}>
                Rychlost, indexovatelnost a strukturovaná data musí sedět dřív, než začnete
                investovat do obsahu — jinak ho vyhledávače nemusí ani pořádně zaindexovat.
              </p>
            </div>
            <div className="border-l border-white/[0.06] pl-5">
              <h3 className={cn(t.h3, "mb-1.5")}>3. Obsah a lokální SEO jako růst</h3>
              <p className={t.body}>
                Až základ sedí, obsahová strategie a lokální SEO přivádí dlouhodobý růst
                návštěvnosti a poptávek z okolí.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="cena" className="mb-14">
          <h2 id="cena" className={cn(t.h2Page, "mb-4")}>Kolik stojí SEO optimalizace</h2>
          <p className={cn(t.body, "mb-6")}>
            Cena se odvíjí od tří věcí: jestli řešíte jednorázový audit nebo průběžnou spolupráci,
            jak velký a složitý web máte, a jak konkurenceschopný je váš obor ve výsledcích
            vyhledávání.
          </p>
          <div className="space-y-6 mb-6">
            <div className="border-l border-white/[0.06] pl-5">
              <h3 className={cn(t.h3, "mb-1.5")}>Audit vs. průběžná práce</h3>
              <p className={t.body}>
                Audit je jednorázová položka s pevně daným rozsahem. Lokální, obsahové a technické
                SEO fungují spíš jako průběžná spolupráce — jde o dlouhodobou práci na pozicích, ne
                o jednorázový zásah.
              </p>
            </div>
            <div className="border-l border-white/[0.06] pl-5">
              <h3 className={cn(t.h3, "mb-1.5")}>Rozsah webu</h3>
              <p className={t.body}>
                Web o pěti stránkách se optimalizuje jinak než e-shop se stovkami produktů nebo web
                s vlastním blogem — čím víc obsahu a podstránek, tím víc práce audit i optimalizace
                zaberou.
              </p>
            </div>
            <div className="border-l border-white/[0.06] pl-5">
              <h3 className={cn(t.h3, "mb-1.5")}>Konkurenceschopnost oboru</h3>
              <p className={t.body}>
                V oborech, kde už na klíčová slova rankuje spousta zavedených webů, vyžaduje posun
                v pozicích víc obsahu i technické práce než v méně obsazené nice.
              </p>
            </div>
          </div>
          <p className={t.body}>
            Přesné ceny proto neuvádím paušálně — v ceníku jsou SEO služby označené jako
            individuální. Kompletní ceník najdete na{" "}
            <Link href="/cena-tvorby-webu" className={t.link}>samostatné stránce s ceníkem</Link>.
          </p>
        </section>

        <section aria-labelledby="faq-seo" className="mb-14">
          <h2 id="faq-seo" className={cn(t.h2Page, "mb-6")}>Časté otázky o ceně SEO</h2>
          <div className="space-y-6">
            <div>
              <h3 className={cn(t.h3, "mb-1.5")}>Platí se SEO jednorázově, nebo měsíčně?</h3>
              <p className={t.body}>
                Audit je jednorázová položka s pevně daným rozsahem. Lokální, obsahové a technické
                SEO obvykle funguje jako průběžná spolupráce, protože jde o dlouhodobou práci na
                pozicích, ne o jednorázový zásah.
              </p>
            </div>
            <div>
              <h3 className={cn(t.h3, "mb-1.5")}>Od čeho se odvíjí cena SEO optimalizace?</h3>
              <p className={t.body}>
                Hlavně od toho, jestli řešíte audit nebo dlouhodobou spolupráci, jak velký a
                složitý web máte, a jak konkurenceschopný je váš obor ve výsledcích vyhledávání.
              </p>
            </div>
            <div>
              <h3 className={cn(t.h3, "mb-1.5")}>
                V jakém pořadí SEO řešit, když chci víc služeb najednou?
              </h3>
              <p className={t.body}>
                Obvykle audit, pak technické SEO jako základ a až na něj obsahová strategie a
                lokální SEO. Nový obsah se hůř zaindexuje na webu, který má technické chyby.
              </p>
            </div>
          </div>
        </section>

        <ClosingCTA
          heading="Chcete vědět, kde vás na Googlu i Seznamu hledají a nenajdou?"
          subheading="Nezávazná konzultace zdarma — probereme, která část SEO má u vás nejvyšší prioritu."
        />

        <div className="mt-14">
          <Link href="/sluzby" className={t.backLink}>← Zpět na přehled služeb</Link>
        </div>
      </div>
    </PageShell>
  );
}
