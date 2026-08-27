import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { PillarHeader, PillarFooter } from "@/components/pillar/PillarChrome";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro účetní na míru",
    description:
      "Tvorba webu pro účetní kancelář na míru — jasný přehled služeb a důvěryhodný dojem, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-ucetni" },
    openGraph: {
      title: "Web pro účetní na míru | VIZEON",
      description:
        "Tvorba webu pro účetní kancelář nebo finančního poradce — bez zbytečných efektů, s důrazem na důvěru.",
      url: "https://vizeon.cz/web-pro-ucetni",
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
        {
          "@type": "ListItem",
          position: 2,
          name: "Web pro účetní",
          item: "https://vizeon.cz/web-pro-ucetni",
        },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba webu pro účetní kanceláře",
      name: "Web na míru pro účetní a daňové poradce",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/web-pro-ucetni",
      description:
        "Tvorba webu na míru pro účetní kanceláře a finanční poradce — jasný přehled služeb, reference a důvěryhodný dojem.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Nebude web působit moc prodejně pro obor, jako je účetnictví?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ne, právě u účetních a poradenských služeb navrhuju web střízlivě — bez agresivních CTA a slevových bannerů. Důvěru buduje jasnost a přehlednost, ne prodejní tlak.",
          },
        },
        {
          "@type": "Question",
          name: "Jak na webu srozumitelně popsat, co všechno účetní kancelář dělá?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Společně rozdělíme služby do jasných kategorií (vedení účetnictví, mzdy, daňová přiznání, poradenství) a ke každé napíšeme pár vět tak, aby jim rozuměl i klient bez ekonomického vzdělání.",
          },
        },
        {
          "@type": "Question",
          name: "Dá se na web přidat kalkulačka nebo formulář pro nezávaznou poptávku?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, orientační kalkulačku ceny podle rozsahu účetnictví nebo jednoduchý poptávkový formulář vám do webu zabuduji jako webovou aplikaci na míru.",
          },
        },
        {
          "@type": "Question",
          name: "Zvládne web bezpečně přijímat citlivé dokumenty od klientů?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Pro sdílení citlivých dokladů doporučuju vždy zabezpečený nástroj k tomu určený (např. datovou schránku nebo šifrované úložiště), web slouží k prvnímu kontaktu a poptávce, ne k přenosu citlivých dat.",
          },
        },
      ],
    },
  ],
};

const faqs = [
  {
    q: "Nebude web působit moc prodejně pro obor, jako je účetnictví?",
    a: "Ne, právě u účetních a poradenských služeb navrhuju web střízlivě — bez agresivních CTA a slevových bannerů. Důvěru buduje jasnost a přehlednost, ne prodejní tlak.",
  },
  {
    q: "Jak na webu srozumitelně popsat, co všechno účetní kancelář dělá?",
    a: "Společně rozdělíme služby do jasných kategorií (vedení účetnictví, mzdy, daňová přiznání, poradenství) a ke každé napíšeme pár vět tak, aby jim rozuměl i klient bez ekonomického vzdělání.",
  },
  {
    q: "Dá se na web přidat kalkulačka nebo formulář pro nezávaznou poptávku?",
    a: "Ano, orientační kalkulačku ceny podle rozsahu účetnictví nebo jednoduchý poptávkový formulář vám do webu zabuduji jako webovou aplikaci na míru.",
  },
  {
    q: "Zvládne web bezpečně přijímat citlivé dokumenty od klientů?",
    a: "Pro sdílení citlivých dokladů doporučuju vždy zabezpečený nástroj k tomu určený (např. datovou schránku nebo šifrované úložiště), web slouží k prvnímu kontaktu a poptávce, ne k přenosu citlivých dat.",
  },
];

export default function WebProUcetniPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PillarHeader />

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Web na míru pro účetní
        </p>
        <h1 className="font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl">
          Web pro účetní, který na první pohled působí důvěryhodně
        </h1>
        <p className="font-inter font-light text-[16px] md:text-[18px] leading-[1.85] text-[#8a8070] max-w-2xl mb-16">
          Web pro účetní kancelář řeším bez zbytečných efektů a prodejního tlaku — u služby, které
          klient svěřuje čísla svého podnikání, rozhoduje hlavně seriózní dojem. Než zavolá, chce
          vědět, že má co do činění s odborníkem. Proto stavím jasný přehled služeb a informace,
          které rozhodnutí usnadní, ne zpomalí.
        </p>

        <div className="space-y-14 font-inter font-light text-[15px] text-[#8a8070] leading-[1.85]">
          <section aria-labelledby="proc">
            <h2 id="proc" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Proč u účetních rozhoduje hlavně důvěra
            </h2>
            <p>
              Účetnictví a daňové poradenství jsou služby, u kterých klient výsledek práce sám
              nezkontroluje — musí věřit, že to děláte správně. Web s neaktuálním designem nebo bez
              jasného vysvětlení, co přesně řešíte, tuhle důvěru nenabízí, i kdyby byla vaše práce
              bezchybná.
            </p>
            <p className="mt-4">
              Druhý problém je srozumitelnost. Klient, který sám účetnictví nerozumí, potřebuje
              vidět jasně pojmenované služby, ne odbornou terminologii bez vysvětlení — jinak
              napíše poptávku tam, kde tomu porozumí rychleji.
            </p>
          </section>

          <section aria-labelledby="proces">
            <h2 id="proces" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Jak probíhá spolupráce
            </h2>
            <p className="mb-5">
              Zkrácená verze procesu — celý postup najdete na stránce{" "}
              <Link href="/tvorba-webu-pro-zivnostniky#proces" className="text-[#c9a84c] hover:underline">
                tvorba webu pro živnostníky
              </Link>
              :
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              <li><span className="text-[#f0ece6]">Konzultace zdarma</span> — probereme rozsah vašich služeb a to, jak je srozumitelně pojmenovat.</li>
              <li><span className="text-[#f0ece6]">Návrh a tvorba</span> — navrhnu střízlivý, důvěryhodný design a strukturu webu.</li>
              <li><span className="text-[#f0ece6]">Předání</span> — dostanete přístupy a návod, jak si sami upravovat texty a ceník.</li>
            </ol>
          </section>

          <section aria-labelledby="obsahuje">
            <h2 id="obsahuje" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Co web pro účetní kancelář obsahuje
            </h2>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Jasný přehled služeb</h3>
                <p>Vedení účetnictví, mzdy, daňová přiznání i poradenství rozdělené srozumitelně, ať klient hned ví, co přesně řešíte.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Reference a zkušenosti</h3>
                <p>Roky praxe, obory, se kterými máte zkušenost, případně reference od klientů — hlavní stavební kámen důvěry u této služby.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Střízlivý, nerušivý design</h3>
                <p>Bez agresivních prodejních prvků — vzhled, který odpovídá seriózní finanční službě, ne e-shopové slevové akci.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Poptávkový formulář bez tlaku</h3>
                <p>Jednoduchý kontakt pro nezávaznou poptávku — klient se ozve, až bude sám chtít, ne pod tlakem vyskakovacích oken.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="cena">
            <h2 id="cena" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Kolik stojí web pro účetní kancelář
            </h2>
            <p>
              Pro účetní kancelář obvykle stačí Online Vizitka od 7 499 Kč s jasným přehledem
              služeb, u větší kanceláře s víc podstránkami se hodí Pro Web od 14 999 Kč. Kompletní
              a aktuální ceník najdete na{" "}
              <Link href="/cenik" className="text-[#c9a84c] hover:underline">
                stránce s ceníkem
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="faq-ucetni">
            <h2 id="faq-ucetni" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Časté otázky o webu pro účetní
            </h2>
            <div className="space-y-6">
              {faqs.map((f) => (
                <div key={f.q}>
                  <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5">{f.q}</h3>
                  <p>{f.a}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-16 pt-10 border-t border-white/[0.05] text-center">
          <p className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-2">
            Chcete web, který klientům dodá jistotu hned od první návštěvy?
          </p>
          <p className="font-inter font-light text-[13px] text-[#8a8070] mb-8">
            Nezávazná konzultace zdarma — probereme, jak přehledně popsat vaše služby.
          </p>
          <CTAButton className="inline-flex font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300">
            Nezávazná konzultace zdarma →
          </CTAButton>
        </div>

        <div className="mt-14">
          <Link
            href="/"
            className="font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300"
          >
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </main>

      <PillarFooter />
    </div>
  );
}
