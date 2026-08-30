import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/layout/ClosingCTA";

export function generateMetadata(): Metadata {
  return {
    title: "Jak probíhá tvorba webu pro živnostníky",
    description:
      "Krok za krokem, jak probíhá tvorba webu na míru pro živnostníky a malé firmy. Konzultace, návrh, tvorba a předání do 10 dní, bez šablon. Weby pro řemeslníky, kadeřnictví, účetní i masérky.",
    alternates: { canonical: "https://vizeon.cz/tvorba-webu-pro-zivnostniky" },
    openGraph: {
      title: "Jak probíhá tvorba webu pro živnostníky | VIZEON",
      description:
        "Konzultace, návrh, tvorba, předání. Takhle vzniká web na míru pro živnostníka, krok za krokem, bez šablon, do 10 dní.",
      url: "https://vizeon.cz/tvorba-webu-pro-zivnostniky",
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
          name: "Tvorba webu pro živnostníky",
          item: "https://vizeon.cz/tvorba-webu-pro-zivnostniky",
        },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Vyplatí se web, i když mám jen pár desítek zákazníků měsíčně?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano, právě u malého počtu zákazníků měsíčně se každá ztracená poptávka počítá. I jednoduchá Online Vizitka nahradí klasickou vizitku i profil na sociálních sítích a působí důvěryhodněji než odkaz jen na Facebook.",
          },
        },
        {
          "@type": "Question",
          name: "Čím se web na míru liší od webu ze stavebnice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stavebnice vám dá hotové bloky, které jen poskládáte. Web na míru navrhuji a kóduji přesně pro váš obor. Znamená to jinou rychlost načítání, jiné možnosti designu a žádný pocit, že jste stejný web už viděli u konkurence.",
          },
        },
        {
          "@type": "Question",
          name: "Zvládnu si web po předání spravovat sám?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano. Dostanete přístupy a krátký návod na běžné úpravy, jako jsou texty, ceník nebo fotky. Pokud na to nemáte čas, nabízím i měsíční správu webu za 999 Kč/měsíc.",
          },
        },
        {
          "@type": "Question",
          name: "Co když nevím, jaké texty a fotky na web dát?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "To řešíme společně během konzultace a návrhu. Pomůžu vám vybrat, co má na webu být, i jak to napsat tak, aby to zákazníka přesvědčilo, ne jen informovalo.",
          },
        },
      ],
    },
  ],
};

const obory = [
  {
    title: "Řemeslníci a stavební řemesla",
    text: (
      <>
        Truhláři, elektrikáři nebo zedníci potřebují hlavně galerii realizací a rychlý kontaktní
        formulář. Zákazník chce vidět, co umíte, a hned poslat poptávku, ne procházet pět
        podstránek. Podrobně popisuju, jak řeším{" "}
        <Link href="/web-pro-remeslniky" className="text-[#c9a84c] hover:underline">
          web pro řemeslníky
        </Link>
        , na samostatné stránce.
      </>
    ),
  },
  {
    title: "Kadeřnictví a kosmetické služby",
    text: (
      <>
        U kadeřnictví a kosmetických salonů rozhoduje online rezervace bez telefonování, aktuální
        ceník a fotky prostoru. Web propojím i s rezervačním systémem, ať klientky objednáte i
        mimo otvírací dobu. Jak přesně vypadá{" "}
        <Link href="/web-pro-kadernictvi" className="text-[#c9a84c] hover:underline">
          rezervační systém pro kadeřnictví
        </Link>
        , najdete na samostatné stránce.
      </>
    ),
  },
  {
    title: "Účetní a poradenské služby",
    text: (
      <>
        Účetní a daňoví poradci potřebují hlavně důvěru, totiž jasný přehled služeb, reference a
        srozumitelné vysvětlení, co přesně řešíte. Web bez zbytečných efektů, který působí
        odborně a seriózně. Detailně jsem to rozepsal na stránce o tom, jak stavím{" "}
        <Link href="/web-pro-ucetni" className="text-[#c9a84c] hover:underline">
          web pro účetní kancelář
        </Link>
        .
      </>
    ),
  },
  {
    title: "Masérské a wellness služby",
    text: (
      <>
        Maséři a wellness studia těží z klidného designu, ceníku balíčků a rezervačního kalendáře
        přímo na webu. Klient si vybere termín, aniž by musel psát zprávu a čekat na odpověď. Jak
        přesně takový{" "}
        <Link href="/web-pro-masery-a-wellness" className="text-[#c9a84c] hover:underline">
          web pro maséry
        </Link>{" "}
        stavím, najdete na samostatné stránce.
      </>
    ),
  },
];

const faqs = [
  {
    q: "Vyplatí se web, i když mám jen pár desítek zákazníků měsíčně?",
    a: "Ano, právě u malého počtu zákazníků měsíčně se každá ztracená poptávka počítá. I jednoduchá Online Vizitka nahradí klasickou vizitku i profil na sociálních sítích a působí důvěryhodněji než odkaz jen na Facebook.",
  },
  {
    q: "Čím se web na míru liší od webu ze stavebnice?",
    a: "Stavebnice vám dá hotové bloky, které jen poskládáte. Web na míru navrhuji a kóduji přesně pro váš obor. Znamená to jinou rychlost načítání, jiné možnosti designu a žádný pocit, že jste stejný web už viděli u konkurence.",
  },
  {
    q: "Zvládnu si web po předání spravovat sám?",
    a: "Ano. Dostanete přístupy a krátký návod na běžné úpravy, jako jsou texty, ceník nebo fotky. Pokud na to nemáte čas, nabízím i měsíční správu webu za 999 Kč/měsíc.",
  },
  {
    q: "Co když nevím, jaké texty a fotky na web dát?",
    a: "To řešíme společně během konzultace a návrhu. Pomůžu vám vybrat, co má na webu být, i jak to napsat tak, aby to zákazníka přesvědčilo, ne jen informovalo.",
  },
];

export default function TvorbaWebuProZivnostnikyPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Minimal header */}
      <header className="border-b border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
          <Link href="/" className="flex flex-col leading-none group" aria-label="VIZEON — zpět na úvodní stránku">
            <span className="font-cormorant font-light text-[22px] tracking-widest text-[#f0ece6] group-hover:text-[#c9a84c] transition-colors duration-300">
              VIZEON
            </span>
            <span className="font-inter font-light text-[9px] uppercase tracking-[0.25em] text-[#3d3830]">
              Web. Design. Výsledky.
            </span>
          </Link>
          <Link
            href="/"
            className="font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300"
          >
            ← Zpět na web
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Web na míru pro živnostníky
        </p>
        <h1 className="font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-6 max-w-2xl">
          Tvorba webu pro živnostníky, který vám přivádí zákazníky
        </h1>
        <p className="font-inter font-light text-[16px] md:text-[18px] leading-[1.85] text-[#8a8070] max-w-2xl mb-16">
          Řada živnostníků v Česku podniká bez webu, nebo s webem, který si před lety poskládali
          ve stavebnici a od té doby se ho nikdo nedotkl. Zákazník mezitím hledá řemeslníka,
          kadeřnici nebo účetní na mobilu, porovná tři nabídky za minutu a vybere tu, která
          působí nejdůvěryhodněji. Přesně na tuhle situaci reaguje web na míru pro živnostníky.
          Dělám ho rychle a srozumitelně, bez šablon, které vypadají jako stovky jiných stránek.
        </p>

        <div className="space-y-14 font-inter font-light text-[15px] text-[#8a8070] leading-[1.85]">
          {/* Šablona vs. na míru */}
          <section aria-labelledby="sablona">
            <h2 id="sablona" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Proč šablona nestačí a co znamená web na míru
            </h2>
            <p>
              Stavebnice webů jsou fajn na rychlý web pro koníček. Pro živnostníka, kterému web
              přivádí reálné poptávky, ale často znamenají kompromis, totiž pomalejší načítání,
              omezené možnosti designu a stránku, která připomíná desítky konkurenčních webů
              poskládaných ze stejných bloků. Tvorba webu na míru znamená, že každou stránku
              navrhuji a kóduji sám, konkrétně pro váš obor a vaše zákazníky, ne pro univerzální
              šablonu.
            </p>
            <p className="mt-4">
              Výsledkem je web, který se načítá rychle, dobře vypadá na mobilu (odkud přichází
              většina poptávek) a vede návštěvníka jasnou cestou k objednávce nebo telefonátu. A
              protože komunikujete přímo se mnou, žádný požadavek se neztratí mezi projektovým
              manažerem a grafikem, kterého nikdy neuvidíte.
            </p>
          </section>

          {/* Proces */}
          <section aria-labelledby="proces">
            <h2 id="proces" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Jak probíhá tvorba webu pro živnostníky
            </h2>
            <p className="mb-5">
              Proces je stejný pro každého klienta, ať děláte kuchyně na míru nebo vedete
              účetnictví. Mění se jen obsah a rozsah:
            </p>
            <ol className="space-y-3 list-decimal list-inside">
              <li><span className="text-[#f0ece6]">Konzultace zdarma</span> — probereme, co má web umět a kolik poptávek měsíčně chcete získat.</li>
              <li><span className="text-[#f0ece6]">Návrh</span> — dostanete vizuální koncept na míru vašemu oboru, ne šablonu z katalogu.</li>
              <li><span className="text-[#f0ece6]">Zpětná vazba a úpravy</span> — připomínky řešíme průběžně, nic se neschvaluje bez vás.</li>
              <li><span className="text-[#f0ece6]">Tvorba</span> — píšu kód, ladím rychlost načítání a mobilní zobrazení.</li>
              <li><span className="text-[#f0ece6]">Předání</span> — dostanete přístupy, krátký návod a web je online.</li>
            </ol>
            <p className="mt-5">
              Rozsah určuje i termín: Online Vizitka je hotová do 5 pracovních dní, Promo Page do
              10 dní, Pro Web s více podstránkami do 3 týdnů. Termín znáte dopředu. Žádná
              překvapení uprostřed projektu.
            </p>
          </section>

          {/* Obory */}
          <section aria-labelledby="obory">
            <h2 id="obory" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Web na míru podle vašeho oboru
            </h2>
            <div className="space-y-6">
              {obory.map((o) => (
                <div key={o.title} className="border-l border-white/[0.06] pl-5">
                  <h3 className="font-inter font-medium text-[14px] text-[#f0ece6] mb-1.5 tracking-[0.01em]">
                    {o.title}
                  </h3>
                  <p>{o.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Ceník */}
          <section aria-labelledby="cena">
            <h2 id="cena" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Kolik stojí web pro živnostníka
            </h2>
            <p>
              Cena se odvíjí od rozsahu, ne od toho, jak dobře umíte vyjednávat. Ceník je
              veřejný a stejný pro každého. Jednostránková Online Vizitka začíná na 7 499 Kč,
              Promo Page (landing page) na 9 999 Kč a Pro Web s více podstránkami na 14 999 Kč.
              Přesný aktuální ceník i to, co je v ceně zahrnuté, najdete{" "}
              <Link href="/cena-tvorby-webu" className="text-[#c9a84c] hover:underline">
                v ceníku
              </Link>
              .
            </p>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-zivnostnici">
            <h2 id="faq-zivnostnici" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-6">
              Časté otázky o tvorbě webu pro živnostníky
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
          heading="Chcete web, který přivádí zákazníky, ne jen existuje?"
          subheading="Nezávazná konzultace zdarma. Probereme váš obor a co váš web potřebuje."
        />

        {/* Back link */}
        <div className="mt-14">
          <Link
            href="/"
            className="font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300"
          >
            ← Zpět na hlavní stránku
          </Link>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter font-light text-[12px] text-[#3d3830]">
            © 2026 VIZEON. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/gdpr"
              className="font-inter font-light text-[12px] text-[#3d3830] hover:text-[#8a8070] transition-colors duration-300"
            >
              Ochrana osobních údajů
            </Link>
            <span className="font-inter font-light text-[12px] text-[#2a2520]" aria-hidden="true">·</span>
            <Link
              href="/podminky"
              className="font-inter font-light text-[12px] text-[#3d3830] hover:text-[#8a8070] transition-colors duration-300"
            >
              Obchodní podmínky
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
