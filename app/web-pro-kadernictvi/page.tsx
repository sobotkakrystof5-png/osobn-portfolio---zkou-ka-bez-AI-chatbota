import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";
import { PillarHeader, PillarFooter } from "@/components/pillar/PillarChrome";

export function generateMetadata(): Metadata {
  return {
    title: "Web pro kadeřnictví na míru | VIZEON",
    description:
      "Tvorba webu pro kadeřnictví na míru s online rezervací — bez telefonování, hotovo do 10 dní. Ceník i galerie na jednom místě.",
    alternates: { canonical: "https://vizeon.cz/web-pro-kadernictvi" },
    openGraph: {
      title: "Web pro kadeřnictví na míru | VIZEON",
      description:
        "Tvorba webu pro salon s online rezervací — klientky se objednají i mimo otvírací dobu.",
      url: "https://vizeon.cz/web-pro-kadernictvi",
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
          name: "Web pro kadeřnictví",
          item: "https://vizeon.cz/web-pro-kadernictvi",
        },
      ],
    },
    {
      "@type": "Service",
      serviceType: "Tvorba webu pro kadeřnictví",
      name: "Web na míru pro kadeřnictví s online rezervací",
      provider: { "@type": "ProfessionalService", name: "VIZEON", url: "https://vizeon.cz" },
      areaServed: { "@type": "Country", name: "Česká republika" },
      url: "https://vizeon.cz/web-pro-kadernictvi",
      description:
        "Tvorba webu na míru pro kadeřnictví a kosmetické salony — online rezervace, aktuální ceník a galerie prostoru.",
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Jak funguje propojení rezervačního systému s webem?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rezervační kalendář zabuduji přímo do webu nebo propojím s rezervačním systémem, který už používáte — klientka si termín vybere na pár kliknutí, bez telefonátu.",
          },
        },
        {
          "@type": "Question",
          name: "Zvládne systém poslat klientce připomínku termínu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, u většiny rezervačních řešení se dá zapnout automatická SMS nebo e-mailová připomínka — sníží počet zapomenutých termínů.",
          },
        },
        {
          "@type": "Question",
          name: "Kolik stojí web s rezervačním systémem navíc?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Rezervační systém je součástí webových aplikací, cena se odvíjí od zvoleného řešení — probereme to na konzultaci a dostanete přesnou nabídku.",
          },
        },
        {
          "@type": "Question",
          name: "Musím mít profesionální fotky salonu?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ne, stačí kvalitní fotky z mobilu při dobrém světle. Poradím, co a jak nafotit, ať prostor i práce na webu vyniknou.",
          },
        },
      ],
    },
  ],
};

const faqs = [
  {
    q: "Jak funguje propojení rezervačního systému s webem?",
    a: "Rezervační kalendář zabuduji přímo do webu nebo propojím s rezervačním systémem, který už používáte — klientka si termín vybere na pár kliknutí, bez telefonátu.",
  },
  {
    q: "Zvládne systém poslat klientce připomínku termínu?",
    a: "Ano, u většiny rezervačních řešení se dá zapnout automatická SMS nebo e-mailová připomínka — sníží počet zapomenutých termínů.",
  },
  {
    q: "Kolik stojí web s rezervačním systémem navíc?",
    a: "Rezervační systém je součástí webových aplikací, cena se odvíjí od zvoleného řešení — probereme to na konzultaci a dostanete přesnou nabídku.",
  },
  {
    q: "Musím mít profesionální fotky salonu?",
    a: "Ne, stačí kvalitní fotky z mobilu při dobrém světle. Poradím, co a jak nafotit, ať prostor i práce na webu vyniknou.",
  },
];

export default function WebProKadernictviPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PillarHeader />

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Web na míru pro kadeřnictví
        </p>
        <h1 className="font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl">
          Web pro kadeřnictví, kde se klientky objednají samy
        </h1>
        <p className="font-inter font-light text-[16px] md:text-[18px] leading-[1.85] text-[#8a8070] max-w-2xl mb-16">
          Web pro kadeřnictví řeším s důrazem na jednu věc: aby se klientka objednala sama, bez
          telefonátu. Kadeřnice mezi zákaznicemi u křesla těžko stíhá zvedat telefon, a klientka,
          která se nedovolá, často rezervaci prostě neřeší a objedná se jinam. Proto do webu
          zabuduju online rezervaci, aktuální ceník a fotky prostoru — vše, co klientka potřebuje
          k rozhodnutí.
        </p>

        <div className="space-y-14 font-inter font-light text-[15px] text-[#8a8070] leading-[1.85]">
          <section aria-labelledby="proc">
            <h2 id="proc" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Proč kadeřnictví potřebuje jiný web než firemní vizitku
            </h2>
            <p>
              Telefonování kvůli rezervacím stojí kadeřnictví reálný čas i klientky — během stříhání
              se na hovor nedá odpovědět a mnoho lidí radši objedná salon, kde to jde online, hned
              teď, večer nebo o víkendu. Klasický firemní web s textem "zavolejte nám" tenhle problém
              neřeší, jen ho přesouvá zpátky na telefon.
            </p>
            <p className="mt-4">
              Druhá věc je důvěra před první návštěvou. Klientka si chce před objednáním prohlédnout
              prostor salonu a orientačně vědět, kolik služba stojí — bez nutnosti psát zprávu a
              čekat na odpověď.
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
              <li><span className="text-[#f0ece6]">Konzultace zdarma</span> — probereme, jaký rezervační systém dává pro váš salon smysl.</li>
              <li><span className="text-[#f0ece6]">Návrh a tvorba</span> — navrhnu vizuál, propojím rezervaci a ceník do jednoho webu.</li>
              <li><span className="text-[#f0ece6]">Předání</span> — dostanete přístupy a návod, jak si sami měnit ceník a fotky.</li>
            </ol>
          </section>

          <section aria-labelledby="obsahuje">
            <h2 id="obsahuje" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Co web pro kadeřnictví obsahuje
            </h2>
            <div className="space-y-6">
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Online rezervační systém</h3>
                <p>Klientka si vybere termín a kadeřnici sama, i mimo otvírací dobu — bez telefonátu a čekání na odpověď.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Aktuální ceník služeb</h3>
                <p>Přehledný ceník přímo na webu — méně dotazů typu "kolik to stojí" a víc rovnou odeslaných rezervací.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Galerie prostoru a prací</h3>
                <p>Fotky salonu i vybraných účesů budují důvěru dřív, než klientka vůbec napíše zprávu.</p>
              </div>
              <div className="border-l border-white/[0.06] pl-5">
                <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">Mobilní zobrazení</h3>
                <p>Naprostá většina rezervací se řeší z mobilu — web tomu odpovídá rychlostí i přehledností.</p>
              </div>
            </div>
          </section>

          <section aria-labelledby="cena">
            <h2 id="cena" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Kolik stojí web pro kadeřnictví
            </h2>
            <p>
              Prezentace s ceníkem a galerií obvykle vychází jako Online Vizitka od 7 499 Kč nebo
              Promo Page od 9 999 Kč, samotný rezervační systém se řeší jako webová aplikace zvlášť.
              Kompletní ceník najdete na{" "}
              <Link href="/cenik" className="text-[#c9a84c] hover:underline">
                stránce s ceníkem
              </Link>
              .
            </p>
          </section>

          <section aria-labelledby="faq-kadernictvi">
            <h2 id="faq-kadernictvi" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Časté otázky o webu pro kadeřnictví
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
            Chcete, aby se klientky objednávaly samy?
          </p>
          <p className="font-inter font-light text-[13px] text-[#8a8070] mb-8">
            Nezávazná konzultace zdarma — probereme, jaký web a rezervační systém sedí vašemu salonu.
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
