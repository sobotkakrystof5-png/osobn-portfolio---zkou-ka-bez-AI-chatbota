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
    title: "Lokální SEO — optimalizace pro Google i Seznam",
    description:
      "Lokální SEO pro Google Business Profile i Seznam Firmy.cz. V Česku nestačí optimalizovat jen pro Google — Seznam má vlastní vyhledávač.",
    alternates: { canonical: "https://vizeon.cz/sluzby/seo-optimalizace/lokalni-seo" },
    openGraph: {
      title: "Lokální SEO — Google i Seznam | VIZEON",
      description: "Optimalizace pro Google Business Profile i Seznam Firmy.cz, ať vás najdou lidé z okolí.",
      url: "https://vizeon.cz/sluzby/seo-optimalizace/lokalni-seo",
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
        { "@type": "ListItem", position: 4, name: "Lokální SEO", item: "https://vizeon.cz/sluzby/seo-optimalizace/lokalni-seo" },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Lokální SEO",
      name: "Lokální SEO pro Google i Seznam",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/sluzby/seo-optimalizace/lokalni-seo",
      description: "Optimalizace Google Business Profile a Seznam Firmy.cz, ať firmu najdou zákazníci z okolí na obou vyhledávačích.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Stačí optimalizace jen pro Google?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ne, v Česku ne. Seznam má vlastní fulltextový vyhledávač nezávislý na Googlu a pořád si drží významnou část trhu. Kdo optimalizuje jen pro Google, přichází o poptávky, které Seznam ukazuje jinak.",
          },
        },
        {
          "@type": "Question",
          name: "Jak dlouho trvá, než se lokální SEO projeví?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Základní nastavení profilů je hotové rychle, ale reálný posun v pozicích a počtu recenzí se obvykle projeví v řádu týdnů až měsíců — je to postupná práce, ne jednorázový zásah.",
          },
        },
      ],
    },
  ],
};

export default function LokalniSeoPage() {
  return (
    <PageShell jsonLd={jsonLd}>
      <AnalyticsTracker page="/sluzby/seo-optimalizace/lokalni-seo" />

      <div className={cn(t.container.page, "pt-16 md:pt-24 pb-16 md:pb-24")}>
        <PageHeader
          eyebrow="Lokální SEO"
          h1="Lokální SEO, díky kterému vás najdou lidé z okolí"
          lead="V Česku lokální SEO neznamená jen Google Maps. Seznam má vlastní vyhledávač i vlastní mapy, a spousta lidí ho pořád používá jako první volbu — proto řeším obojí, ne jen jedno z toho."
        />

        <div className="space-y-14">
          <section aria-labelledby="google">
            <h2 id="google" className={cn(t.h2Page, "mb-6")}>Google: Business Profile a Maps</h2>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Google Business Profile</h3>
                <p className={t.body}>Založení nebo optimalizace profilu — správná kategorie, fotky, popis a otevírací doba, ať profil působí důvěryhodně a úplně.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Signály pro Maps pack</h3>
                <p className={t.body}>Konzistentní jméno, adresa a telefon napříč webem i profilem (NAP konzistence) a práce s recenzemi — dvě věci, které nejvíc ovlivňují, jestli se zobrazíte v mapovém výřezu výsledků.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="seznam">
            <h2 id="seznam" className={cn(t.h2Page, "mb-6")}>Seznam: Firmy.cz a Seznam Mapy</h2>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Firmy.cz</h3>
                <p className={t.body}>Založení nebo optimalizace profilu na Firmy.cz — obdoba Google Business Profile, ale pro Seznam. Bez ní vás velká část tuzemských vyhledávání jednoduše nenajde.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Vlastní vyhledávač, ne jen kopie Googlu</h3>
                <p className={t.body}>Seznam má vlastní fulltextový vyhledávač i vlastní algoritmus hodnocení stránek — nezávislý na Googlu. Signály, které fungují na Googlu, se na Seznamu neprojeví automaticky stejně.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className={cn(t.h3, "mb-1.5")}>Seznam Mapy</h3>
                <p className={t.body}>Obdoba Google Maps s vlastní databází firem — profil na Firmy.cz se propisuje i sem.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="proc-obe">
            <h2 id="proc-obe" className={cn(t.h2Page, "mb-4")}>Proč řešit obojí</h2>
            <p className={t.body}>
              Seznam si v Česku pořád drží významnou část vyhledávání, hlavně u starší nebo lokálně
              zaměřené klientely. Optimalizace jen pro Google znamená přicházet o poptávky, které
              Google jednoduše neukáže tam, kde by je zákazník hledal.
            </p>
          </section>

          <section aria-labelledby="faq-lokalni">
            <h2 id="faq-lokalni" className={cn(t.h2Page, "mb-6")}>Časté otázky o lokálním SEO</h2>
            <div className="space-y-6">
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Stačí optimalizace jen pro Google?</h3>
                <p className={t.body}>Ne, v Česku ne. Seznam má vlastní fulltextový vyhledávač nezávislý na Googlu a pořád si drží významnou část trhu. Kdo optimalizuje jen pro Google, přichází o poptávky, které Seznam ukazuje jinak.</p>
              </div>
              <div>
                <h3 className={cn(t.h3, "mb-1.5")}>Jak dlouho trvá, než se lokální SEO projeví?</h3>
                <p className={t.body}>Základní nastavení profilů je hotové rychle, ale reálný posun v pozicích a počtu recenzí se obvykle projeví v řádu týdnů až měsíců — je to postupná práce, ne jednorázový zásah.</p>
              </div>
            </div>
          </section>
        </div>

        <ClosingCTA
          heading="Chcete, aby vás lidé z okolí našli na Googlu i Seznamu?"
          subheading="Nezávazná konzultace zdarma — probereme stav vašich profilů a co chybí."
        />

        <div className="mt-14">
          <Link href="/sluzby/seo-optimalizace" className={t.backLink}>← Zpět na SEO optimalizaci</Link>
        </div>
      </div>
    </PageShell>
  );
}
