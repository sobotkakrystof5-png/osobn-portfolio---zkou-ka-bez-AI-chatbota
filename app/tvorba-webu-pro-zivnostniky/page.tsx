import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/CTAButton";

export function generateMetadata(): Metadata {
  return {
    title: "Tvorba webu pro živnostníky na míru",
    description:
      "Tvorba webu na míru pro živnostníky a malé firmy — bez šablon, hotovo do 10 dní. Weby pro řemeslníky, kadeřnictví, účetní i masérky.",
    alternates: { canonical: "https://vizeon.cz/tvorba-webu-pro-zivnostniky" },
    openGraph: {
      title: "Tvorba webu pro živnostníky na míru | VIZEON",
      description:
        "Web na míru pro živnostníky a malé firmy — bez šablon, hotovo do 10 dní, transparentní ceník.",
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
            text: "Ano — právě u malého počtu zákazníků měsíčně se každá ztracená poptávka počítá. I jednoduchá Online Vizitka nahradí klasickou vizitku i profil na sociálních sítích a působí důvěryhodněji než odkaz jen na Facebook.",
          },
        },
        {
          "@type": "Question",
          name: "Čím se web na míru liší od webu ze stavebnice?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Stavebnice vám dá hotové bloky, které jen poskládáte. Web na míru navrhuji a kóduji přesně pro váš obor — jiná rychlost načítání, jiné možnosti designu a žádný pocit, že jste stejný web už viděli u konkurence.",
          },
        },
        {
          "@type": "Question",
          name: "Zvládnu si web po předání spravovat sám?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ano. Dostanete přístupy a krátký návod na běžné úpravy — texty, ceník, fotky. Pokud na to nemáte čas, nabízím i měsíční správu webu za 999 Kč/měsíc.",
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
    text: "Truhláři, elektrikáři nebo zedníci potřebují hlavně galerii realizací a rychlý kontaktní formulář — zákazník chce vidět, co umíte, a hned poslat poptávku, ne procházet pět podstránek.",
  },
  {
    title: "Kadeřnictví a kosmetické služby",
    text: "U kadeřnictví a kosmetických salonů rozhoduje online rezervace bez telefonování, aktuální ceník a fotky prostoru. Web propojím i s rezervačním systémem, ať klientky objednáte i mimo otvírací dobu.",
  },
  {
    title: "Účetní a poradenské služby",
    text: "Účetní a daňoví poradci potřebují hlavně důvěru — jasný přehled služeb, reference a srozumitelné vysvětlení, co přesně řešíte. Web bez zbytečných efektů, který působí odborně a seriózně.",
  },
  {
    title: "Masérské a wellness služby",
    text: "Maséři a wellness studia těží z klidného designu, ceníku balíčků a rezervačního kalendáře přímo na webu — klient si vybere termín, aniž by musel psát zprávu a čekat na odpověď.",
  },
];

const faqs = [
  {
    q: "Vyplatí se web, i když mám jen pár desítek zákazníků měsíčně?",
    a: "Ano — právě u malého počtu zákazníků měsíčně se každá ztracená poptávka počítá. I jednoduchá Online Vizitka nahradí klasickou vizitku i profil na sociálních sítích a působí důvěryhodněji než odkaz jen na Facebook.",
  },
  {
    q: "Čím se web na míru liší od webu ze stavebnice?",
    a: "Stavebnice vám dá hotové bloky, které jen poskládáte. Web na míru navrhuji a kóduji přesně pro váš obor — jiná rychlost načítání, jiné možnosti designu a žádný pocit, že jste stejný web už viděli u konkurence.",
  },
  {
    q: "Zvládnu si web po předání spravovat sám?",
    a: "Ano. Dostanete přístupy a krátký návod na běžné úpravy — texty, ceník, fotky. Pokud na to nemáte čas, nabízím i měsíční správu webu za 999 Kč/měsíc.",
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
          působí nejdůvěryhodněji. Web na míru pro živnostníky řeším přesně pro tuhle situaci —
          rychle, srozumitelně a bez šablon, které vypadají jako stovky jiných stránek.
        </p>

        <div className="space-y-14 font-inter font-light text-[15px] text-[#8a8070] leading-[1.85]">
          {/* Šablona vs. na míru */}
          <section aria-labelledby="sablona">
            <h2 id="sablona" className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-4">
              Proč šablona nestačí a co znamená web na míru
            </h2>
            <p>
              Stavebnice webů jsou fajn na rychlý web pro koníček. Pro živnostníka, kterému web
              přivádí reálné poptávky, ale často znamenají kompromis — pomalejší načítání,
              omezené možnosti designu a stránku, která připomíná desítky konkurenčních webů
              poskládaných ze stejných bloků. Tvorba webu na míru znamená, že každou stránku
              navrhuji a kóduji sám, konkrétně pro váš obor a vaše zákazníky — ne pro univerzální
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
              účetnictví — mění se jen obsah a rozsah:
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
              10 dní, Pro Web s více podstránkami do 3 týdnů. Termín znáte dopředu — žádná
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
              Cena se odvíjí od rozsahu, ne od toho, jak dobře umíte vyjednávat — ceník je
              veřejný a stejný pro každého. Jednostránková Online Vizitka začíná na 7 499 Kč,
              Promo Page (landing page) na 9 999 Kč a Pro Web s více podstránkami na 14 999 Kč.
              Přesný aktuální ceník i to, co je v ceně zahrnuté, najdete{" "}
              <Link href="/#cenik" className="text-[#c9a84c] hover:underline">
                na hlavní stránce
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

        {/* CTA */}
        <div className="mt-16 pt-10 border-t border-white/[0.05] text-center">
          <p className="font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6] mb-2">
            Chcete web, který přivádí zákazníky — ne jen existuje?
          </p>
          <p className="font-inter font-light text-[13px] text-[#8a8070] mb-8">
            Nezávazná konzultace zdarma — probereme váš obor a co váš web potřebuje.
          </p>
          <CTAButton className="inline-flex font-inter font-medium text-[13px] tracking-[0.1em] uppercase text-[#080808] bg-[#c9a84c] px-8 py-4 hover:bg-[#d4b968] transition-all duration-300">
            Nezávazná konzultace zdarma →
          </CTAButton>
        </div>

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
