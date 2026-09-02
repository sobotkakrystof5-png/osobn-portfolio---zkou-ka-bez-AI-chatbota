import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/layout/ClosingCTA";
import { PillarHeader, PillarFooter } from "@/components/pillar/PillarChrome";
import { RelatedIndustries } from "@/components/pillar/RelatedIndustries";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro masérky na míru",
    description:
      "Tvorba webu pro maséry a wellness studia na míru, klidný design a rezervační kalendář, hotovo do 10 dní.",
    alternates: { canonical: "https://vizeon.cz/web-pro-masery-a-wellness" },
    openGraph: {
      title: "Web pro masérky na míru | VIZEON",
      description: "Web s rezervací pro maséra nebo wellness studio, kde klient najde klid, důvěru a termín na pár kliknutí.",
      url: "https://vizeon.cz/web-pro-masery-a-wellness",
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
          name: "Web pro masérky a wellness",
          item: "https://vizeon.cz/web-pro-masery-a-wellness",
        },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba webu pro maséry a wellness studia",
      name: "Web na míru pro maséry a wellness studia",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/web-pro-masery-a-wellness",
      description:
        "Tvorba webu na míru pro maséry a wellness studia, klidný design, rezervační kalendář a ceník balíčků.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Zvládne rezervační kalendář hlídat délku jednotlivých procedur?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, kalendář nastavím tak, aby počítal s různou délkou masáží a procedur a mezi termíny automaticky nechal potřebnou rezervu.",
          },
        },
        {
          "@type": "Question",
          name: "Dá se na web přidat prodej dárkových poukazů?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, dárkové poukazy patří mezi nejžádanější doplňky u masérů a wellness studií. Vyřešíme je jako součást webové aplikace na míru.",
          },
        },
        {
          "@type": "Question",
          name: "Jak má vypadat design, aby působil klidně a ne jako běžný firemní web?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Méně je víc. Tlumenější barvy, dostatek prostoru mezi prvky a fotky, které evokují klid, ne agresivní CTA tlačítka na každém rohu.",
          },
        },
        {
          "@type": "Question",
          name: "Co když klient potřebuje rezervaci zrušit nebo přeobjednat?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Do rezervačního systému se dá přidat i samoobslužné zrušení nebo přeobjednání termínu do stanoveného limitu. Ušetří to čas oběma stranám.",
          },
        },
      ],
    },
  ],
};

const faqs = [
  {
    q: "Zvládne rezervační kalendář hlídat délku jednotlivých procedur?",
    a: "Ano, kalendář nastavím tak, aby počítal s různou délkou masáží a procedur a mezi termíny automaticky nechal potřebnou rezervu.",
  },
  {
    q: "Dá se na web přidat prodej dárkových poukazů?",
    a: "Ano, dárkové poukazy patří mezi nejžádanější doplňky u masérů a wellness studií. Vyřešíme je jako součást webové aplikace na míru.",
  },
  {
    q: "Jak má vypadat design, aby působil klidně a ne jako běžný firemní web?",
    a: "Méně je víc. Tlumenější barvy, dostatek prostoru mezi prvky a fotky, které evokují klid, ne agresivní CTA tlačítka na každém rohu.",
  },
  {
    q: "Co když klient potřebuje rezervaci zrušit nebo přeobjednat?",
    a: "Do rezervačního systému se dá přidat i samoobslužné zrušení nebo přeobjednání termínu do stanoveného limitu. Ušetří to čas oběma stranám.",
  },
];

export default function WebProMaseryAWellnessPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PillarHeader />

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Web na míru pro maséry a wellness studia
        </p>
        <h1 className="font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl">
          Web pro masérky, který sám o sobě působí klidně
        </h1>
        <p className="font-inter font-light text-[16px] md:text-[18px] leading-[1.85] text-[#8a8070] max-w-2xl mb-16">
          Web pro masérky a wellness studia stavím na klidném designu a rezervačním kalendáři.
          Klient si masáž objednává i proto, aby si odpočinul, a stejný dojem má vyvolat i web, kde
          termín rezervuje. Vybere si čas sám, bez zprávy a čekání na odpověď.
        </p>

        <div className="space-y-14 font-inter font-light text-[15px] text-[#8a8070] leading-[1.85]">
          <section aria-labelledby="proc">
            <h2 id="proc" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Proč u masérů a wellness studií rozhoduje design a kalendář
            </h2>
            <p>
              Křiklavý web plný baneru a slev působí u masáží a wellness přesně opačně, než má.
              Místo klidu vyvolá stres už při prohlížení. Design proto musí vyvolat stejný pocit,
              jaký klient očekává od samotné procedury: klid, prostor, žádný spěch.
            </p>
            <p className="mt-4">
              Druhá věc je rezervace. Klient, který si chce dopřát masáž, nechce kvůli tomu psát
              zprávu a čekat, až se ozvete zpátky. Chce otevřít kalendář, vybrat volný termín a mít
              hotovo. Bez toho končí poptávka u konkurenčního studia, které rezervaci online nabízí.
            </p>
            <p className="mt-4">
              Masáže a wellness procedury si lidé obvykle vybírají podle blízkosti studia. Aby vás
              zákazníci z okolí vůbec našli, řeším to jako{" "}
              <Link href="/sluzby/seo-optimalizace/lokalni-seo" className="text-[#c9a84c] hover:underline">
                lokální SEO
              </Link>
              , tedy nastavení Google Business Profile i Firmy.cz na Seznamu.
            </p>
          </section>

          <section aria-labelledby="proces">
            <h2 id="proces" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Jak probíhá spolupráce
            </h2>
            <p className="mb-5">
              Tohle je zkrácená verze procesu. Kompletní postup najdete na stránce{" "}
              <Link href="/tvorba-webu-pro-zivnostniky#proces" className="text-[#c9a84c] hover:underline">
                tvorba webu pro živnostníky
              </Link>
              :
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              <li><span className="text-[#f0ece6]">Konzultace zdarma</span> — probereme délku procedur a to, jak má kalendář fungovat.</li>
              <li><span className="text-[#f0ece6]">Návrh a tvorba</span> — navrhnu klidný vizuál a zabuduju rezervační kalendář.</li>
              <li><span className="text-[#f0ece6]">Předání</span> — dostanete přístupy a návod, jak si sami spravovat ceník i termíny.</li>
            </ol>
          </section>

          <section aria-labelledby="obsahuje">
            <h2 id="obsahuje" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Co web pro maséry a wellness studia obsahuje
            </h2>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Rezervační kalendář</h3>
                <p>Klient si vybere termín a proceduru sám, kalendář hlídá délku i volné kapacity za vás.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Ceník balíčků procedur</h3>
                <p>Přehledně seřazené jednotlivé masáže i zvýhodněné balíčky. Klient se rozhoduje rychleji, když vidí přesnou cenu.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Klidný, nerušivý design</h3>
                <p>Tlumené barvy, dostatek prostoru a fotky prostoru namísto agresivních prodejních prvků.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Galerie prostoru studia</h3>
                <p>Fotky prostředí, kde procedura probíhá. Pro klienta jde často o rozhodující detail před první návštěvou.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="cena">
            <h2 id="cena" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Kolik stojí web pro maséry a wellness studia
            </h2>
            <p>
              Prezentace s ceníkem balíčků obvykle vychází jako Online Vizitka od 7 499 Kč nebo
              Promo Page od 9 999 Kč, rezervační kalendář se řeší jako webová aplikace na míru.
              Kompletní ceník najdete na{" "}
              <Link href="/cena-tvorby-webu" className="text-[#c9a84c] hover:underline">
                stránce s ceníkem
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="faq-masery">
            <h2 id="faq-masery" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Časté otázky o webu pro maséry a wellness studia
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

        <ClosingCTA
          heading="Chcete web, který klientům dodá klid ještě před první procedurou?"
          subheading="Nezávazná konzultace zdarma — probereme, jaký kalendář a design sedí vašemu studiu."
        />

        <RelatedIndustries slugs={["web-pro-fitness-trenery", "web-pro-kosmeticky", "web-pro-kadernictvi"]} />

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
