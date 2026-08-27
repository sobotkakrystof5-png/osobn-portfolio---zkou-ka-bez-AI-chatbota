import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { PillarHeader, PillarFooter } from "@/components/pillar/PillarChrome";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro řemeslníky na míru",
    description:
      "Tvorba webu pro řemeslníky na míru — galerie realizací, rychlá poptávka, hotovo do 10 dní. Truhláři, elektrikáři, zedníci i další řemesla.",
    alternates: { canonical: "https://vizeon.cz/web-pro-remeslniky" },
    openGraph: {
      title: "Web pro řemeslníky na míru | VIZEON",
      description:
        "Web na míru pro řemeslníky — prezentace realizací online, rychlá poptávka, žádná šablona.",
      url: "https://vizeon.cz/web-pro-remeslniky",
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
          name: "Web pro řemeslníky",
          item: "https://vizeon.cz/web-pro-remeslniky",
        },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba webu pro řemeslníky",
      name: "Web na míru pro řemeslníky",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/web-pro-remeslniky",
      description:
        "Tvorba webu na míru pro řemeslníky a stavební řemesla — galerie realizací, rychlý poptávkový formulář a mobilní zobrazení.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak velkou galerii realizací web unese?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Klidně desítky fotek rozdělených do kategorií podle typu zakázky — galerii navrhnu tak, ať se rychle načítá i s velkým počtem fotek a zákazník se v ní snadno zorientuje.",
          },
        },
        {
          "@type": "Question",
          name: "Musím mít profesionální fotky realizací?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ne. Stačí ostré fotky z mobilu při dobrém světle. Poradím, jak je nafotit, ať na webu vypadají dobře, a případně je před nasazením upravím.",
          },
        },
        {
          "@type": "Question",
          name: "Řeším víc řemesel najednou — dá se to na jeden web?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, běžně se to řeší přehledem služeb rozděleným podle řemesla, ať zákazník hned vidí, co přesně nabízíte. U specializovaných oborů (zámečnictví, kovářství a další) mám i samostatné vzorové stránky.",
          },
        },
        {
          "@type": "Question",
          name: "Jak dlouho trvá tvorba webu s galerií realizací?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Online Vizitka s galerií je hotová do 5 pracovních dní, Promo Page do 10 dní. Termín znáte předem, ať můžete plánovat.",
          },
        },
      ],
    },
  ],
};

const remeslaTiles = [
  { name: "Zámečnictví", text: "Galerie realizací a rychlý kontakt na havarijní poptávky.", anchor: "web pro zámečníky", href: "/web-pro-zamecniky" },
  { name: "Kovářství", text: "Velkoformátové fotky pro umělecké kovářství a zakázkovou výrobu.", anchor: "web pro kováře", href: "/web-pro-kovare" },
  { name: "Řezbářství", text: "Prezentace originálních prací s příběhem každé realizace.", anchor: "web pro řezbáře", href: "/web-pro-rezbare" },
  { name: "Studnařství", text: "Důvěra a reference tam, kde výsledek práce nejde vidět.", anchor: "web pro studnaře", href: "/web-pro-studnare" },
  { name: "Malířství a natěračství", text: "Fotky před/po jako hlavní argument pro zákazníka.", anchor: "web pro malíře pokojů", href: "/web-pro-malire" },
  { name: "Sanace", text: "Srozumitelné vysvětlení postupu prací u vlhkého zdiva.", anchor: "web pro sanační firmy", href: "/web-pro-sanace" },
];

const faqs = [
  {
    q: "Jak velkou galerii realizací web unese?",
    a: "Klidně desítky fotek rozdělených do kategorií podle typu zakázky — galerii navrhnu tak, ať se rychle načítá i s velkým počtem fotek a zákazník se v ní snadno zorientuje.",
  },
  {
    q: "Musím mít profesionální fotky realizací?",
    a: "Ne. Stačí ostré fotky z mobilu při dobrém světle. Poradím, jak je nafotit, ať na webu vypadají dobře, a případně je před nasazením upravím.",
  },
  {
    q: "Řeším víc řemesel najednou — dá se to na jeden web?",
    a: "Ano, běžně se to řeší přehledem služeb rozděleným podle řemesla, ať zákazník hned vidí, co přesně nabízíte. U specializovaných oborů mám i samostatné vzorové stránky — viz sekce níže.",
  },
  {
    q: "Jak dlouho trvá tvorba webu s galerií realizací?",
    a: "Online Vizitka s galerií je hotová do 5 pracovních dní, Promo Page do 10 dní. Termín znáte předem, ať můžete plánovat.",
  },
];

export default function WebProRemeslnikyPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PillarHeader />

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Web na míru pro řemeslníky
        </p>
        <h1 className="font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl">
          Web pro řemeslníky, který ukáže vaši práci — ne jen kontakt
        </h1>
        <p className="font-inter font-light text-[16px] md:text-[18px] leading-[1.85] text-[#8a8070] max-w-2xl mb-16">
          Web pro řemeslníky musí hlavně dokázat, že svou práci umíte — a to nejrychleji ukáže
          fotka hotové zakázky, ne odstavec textu o spolehlivosti. Proto ho stavím kolem galerie
          realizací a rychlé cesty k poptávce, ne kolem obecného firemního popisu. Víc o tom, jak
          obecně řeším{" "}
          <Link href="/tvorba-webu-pro-zivnostniky" className="text-[#c9a84c] hover:underline">
            tvorbu webu na míru pro živnostníky
          </Link>
          , najdete na samostatné stránce.
        </p>

        <div className="space-y-14 font-inter font-light text-[15px] text-[#8a8070] leading-[1.85]">
          {/* Proč obor potřebuje specifické řešení */}
          <section aria-labelledby="proc">
            <h2 id="proc" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Proč běžná firemní šablona řemeslníkům nestačí
            </h2>
            <p>
              Většina webových šablon počítá s textem — sekcemi "o nás", "naše hodnoty",
              odstavcem o kvalitě. Zákazník, který hledá truhláře na kuchyňskou linku nebo
              elektrikáře na rekonstrukci, ale nechce číst o hodnotách. Chce vidět, jestli jste už
              dělali podobnou zakázku, a jak vypadala. Bez galerie realizací se stavíte do stejné
              pozice jako kdokoli jiný na první stránce Googlu.
            </p>
            <p className="mt-4">
              Druhý problém je rychlost poptávky. Řemeslník často dostává poptávky mezi zakázkami,
              z mobilu, o víkendu. Pokud web nemá jasné tlačítko "poptat" a kontakt na dosah jednoho
              kliknutí, zákazník napíše radši konkurenci, u které to jde rychleji.
            </p>
          </section>

          {/* Jak probíhá spolupráce */}
          <section aria-labelledby="proces">
            <h2 id="proces" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Jak probíhá spolupráce
            </h2>
            <p className="mb-5">
              Zkrácená verze procesu — celý postup krok za krokem najdete na stránce{" "}
              <Link href="/tvorba-webu-pro-zivnostniky#proces" className="text-[#c9a84c] hover:underline">
                tvorba webu pro živnostníky
              </Link>
              :
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              <li><span className="text-[#f0ece6]">Konzultace zdarma</span> — probereme, které realizace na web patří a co má poptávkový formulář zjišťovat.</li>
              <li><span className="text-[#f0ece6]">Návrh a tvorba</span> — navrhnu strukturu galerie a stránky služeb, pak web postavím.</li>
              <li><span className="text-[#f0ece6]">Předání</span> — dostanete přístupy a návod, jak si galerii sami doplňovat o nové zakázky.</li>
            </ol>
          </section>

          {/* Co web pro řemeslníky obsahuje */}
          <section aria-labelledby="obsahuje">
            <h2 id="obsahuje" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Co web pro řemeslníky obsahuje
            </h2>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Galerie realizací</h3>
                <p>Fotky hotových zakázek rozdělené podle typu práce, ať zákazník rychle najde, co ho zajímá.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Rychlý poptávkový formulář</h3>
                <p>Pár polí místo dlouhého kontaktního formuláře — čím míň kliků k odeslání, tím víc poptávek dorazí.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Přehled řemesel a služeb</h3>
                <p>Jasně oddělené obory, pokud jich řešíte víc najednou — zákazník hned pozná, jestli u vás najde, co potřebuje.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Mobilní zobrazení na prvním místě</h3>
                <p>Většina poptávek přichází z mobilu na stavbě nebo mezi zakázkami — web tomu odpovídá rychlostí i ovládáním.</p>
              </div>
            </div>
          </section>

          {/* Podle řemesla */}
          <section aria-labelledby="podle-remesla">
            <h2 id="podle-remesla" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-3">
              Podle řemesla
            </h2>
            <p className="mb-6">
              Některá řemesla mají specifické potřeby natolik odlišné, že jim věnuju samostatnou
              stránku:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {remeslaTiles.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  className="group border border-white/[0.06] hover:border-[rgba(201,168,76,0.3)] p-5 transition-colors duration-300 block"
                >
                  <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 group-hover:text-[#c9a84c] transition-colors duration-300">
                    {t.name}
                  </h3>
                  <p className="text-[13px] text-[#8a8070] mb-3">{t.text}</p>
                  <span className="font-inter font-light text-[11px] tracking-[0.08em] uppercase text-[#c9a84c]/70 group-hover:text-[#c9a84c] group-hover:translate-x-1 transition-all duration-300 inline-block">
                    {t.anchor} →
                  </span>
                </Link>
              ))}
            </div>
          </section>

          {/* Ceník */}
          <section aria-labelledby="cena">
            <h2 id="cena" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Kolik stojí web pro řemeslníka
            </h2>
            <p>
              Pro jednoho řemeslníka s galerií realizací obvykle stačí Online Vizitka od 7 499 Kč,
              u rozsáhlejší prezentace s víc podstránkami se hodí Promo Page od 9 999 Kč nebo Pro
              Web od 14 999 Kč. Kompletní a aktuální ceník najdete na{" "}
              <Link href="/cenik" className="text-[#c9a84c] hover:underline">
                samostatné stránce s ceníkem
              </Link>
              .
            </p>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-remeslnici">
            <h2 id="faq-remeslnici" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Časté otázky o webu pro řemeslníky
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

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-white/[0.05] text-center">
          <p className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-2">
            Chcete web, který vaše realizace ukáže tak, jak si zaslouží?
          </p>
          <p className="font-inter font-light text-[13px] text-[#8a8070] mb-8">
            Nezávazná konzultace zdarma — probereme, jak by měla vypadat galerie i poptávkový formulář pro váš obor.
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
