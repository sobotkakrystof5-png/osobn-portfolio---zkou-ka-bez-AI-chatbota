import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ochrana osobních údajů (GDPR)",
  description:
    "Informace o zpracování osobních údajů ve smyslu nařízení GDPR a zákona č. 110/2019 Sb. — VIZEON, Kryštof Sobotka.",
  robots: { index: false, follow: false },
};

export default function GdprPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#f0ece6]">
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

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 md:px-12 py-16 md:py-24">
        {/* Page label */}
        <p className="font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c] mb-4">
          — Právní dokumenty
        </p>
        <h1 className="font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6] mb-3">
          Ochrana osobních údajů
        </h1>
        <p className="font-inter font-light text-[13px] text-[#3d3830] mb-14">
          Platnost od 1. 1. 2026 · Ve smyslu nařízení EU 2016/679 (GDPR) a zákona č. 110/2019 Sb.
        </p>

        <div className="space-y-12 font-inter font-light text-[14px] text-[#8a8070] leading-[1.85]">

          {/* Section 1 */}
          <section aria-labelledby="spravce">
            <h2 id="spravce" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              1. Správce osobních údajů
            </h2>
            <p>
              Správcem osobních údajů je fyzická osoba:
            </p>
            <ul className="mt-4 space-y-1 pl-4 border-l border-white/[0.06]">
              <li><span className="text-[#f0ece6]">Jméno:</span> Kryštof Sobotka</li>
              <li><span className="text-[#f0ece6]">Obchodní název:</span> VIZEON</li>
              <li>
                <span className="text-[#f0ece6]">E-mail: </span>
                <a href="mailto:info@vizeon.cz" className="text-[#c9a84c] hover:underline">
                  info@vizeon.cz
                </a>
              </li>
              <li>
                <span className="text-[#f0ece6]">Telefon: </span>
                <a href="tel:+420604837333" className="hover:text-[#f0ece6] transition-colors">
                  +420 604 837 333
                </a>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="jake-udaje">
            <h2 id="jake-udaje" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              2. Jaké osobní údaje zpracováváme
            </h2>
            <p>
              Prostřednictvím kontaktního formuláře na tomto webu zpracováváme
              výhradně následující osobní údaje, které nám sami poskytnete:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>Jméno a příjmení</li>
              <li>E-mailová adresa</li>
              <li>Telefonní číslo</li>
              <li>Obsah zprávy (popis poptávky)</li>
            </ul>
            <p className="mt-4">
              Neprovádíme automatizované profilování ani scoring. Nesbíráme
              citlivé osobní údaje ve smyslu čl. 9 GDPR.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="ucel">
            <h2 id="ucel" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              3. Účel zpracování
            </h2>
            <p>
              Vaše osobní údaje zpracováváme výhradně za účelem:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>Odpovězení na vaši poptávku nebo dotaz</li>
              <li>Komunikace a jednání před případným uzavřením smlouvy</li>
              <li>Plnění smluvních povinností po uzavření smlouvy</li>
            </ul>
            <p className="mt-4">
              Vaše údaje nepoužíváme k marketingovým účelům ani je neprodáváme
              třetím stranám.
            </p>
          </section>

          {/* Section 4 */}
          <section aria-labelledby="pravni-zaklad">
            <h2 id="pravni-zaklad" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              4. Právní základ zpracování
            </h2>
            <p>
              Zpracování vašich osobních údajů je opřeno o tyto právní základy:
            </p>
            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>
                <span className="text-[#f0ece6]">Čl. 6 odst. 1 písm. b) GDPR</span> — zpracování nezbytné
                pro plnění smlouvy nebo pro provedení opatření přijatých před
                uzavřením smlouvy na žádost subjektu údajů.
              </li>
              <li>
                <span className="text-[#f0ece6]">Čl. 6 odst. 1 písm. f) GDPR</span> — oprávněný zájem
                správce spočívající v evidenci obchodní komunikace pro případ
                řešení případných sporů.
              </li>
            </ul>
          </section>

          {/* Section 5 */}
          <section aria-labelledby="doba-uchovani">
            <h2 id="doba-uchovani" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              5. Doba uchování osobních údajů
            </h2>
            <p>
              Osobní údaje uchováváme po dobu nezbytně nutnou:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>Po dobu trvání smluvního vztahu (projekt/spolupráce)</li>
              <li>
                Po jejím ukončení pak dalších <span className="text-[#f0ece6]">3 roky</span> z důvodu
                obecné promlčecí lhůty dle § 629 občanského zákoníku
              </li>
            </ul>
            <p className="mt-4">
              Pokud k uzavření smlouvy nedojde, uchováváme kontaktní údaje
              maximálně 6 měsíců od přijetí poptávky.
            </p>
          </section>

          {/* Section 6 */}
          <section aria-labelledby="prijemci">
            <h2 id="prijemci" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              6. Příjemci osobních údajů
            </h2>
            <p>
              Vaše osobní údaje nepředáváme žádným třetím stranám mimo
              poskytovatelů nezbytné technické infrastruktury:
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>
                <span className="text-[#f0ece6]">Resend</span> — e-mailová platforma pro doručení notifikací
                (zpracovatel, se kterým je uzavřena DPA)
              </li>
              <li>
                <span className="text-[#f0ece6]">Vercel</span> — hosting webu; data zpracovávána v rámci EU
                nebo v zemích se standardními smluvními doložkami
              </li>
            </ul>
            <p className="mt-4">
              Osobní údaje nepředáváme do třetích zemí mimo EU/EEA, s výjimkou
              případů zajištěných standardními smluvními doložkami EU.
            </p>
          </section>

          {/* Section 7 */}
          <section aria-labelledby="prava">
            <h2 id="prava" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              7. Vaše práva jakožto subjektu údajů
            </h2>
            <p>V souladu s GDPR máte vůči nám následující práva:</p>
            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>
                <span className="text-[#f0ece6]">Právo na přístup (čl. 15)</span> — požádat o potvrzení,
                zda zpracováváme vaše osobní údaje, a obdržet jejich kopii.
              </li>
              <li>
                <span className="text-[#f0ece6]">Právo na opravu (čl. 16)</span> — požádat o opravu
                nepřesných nebo doplnění neúplných osobních údajů.
              </li>
              <li>
                <span className="text-[#f0ece6]">Právo na výmaz / „být zapomenut" (čl. 17)</span> —
                požádat o smazání osobních údajů za podmínek stanovených GDPR.
              </li>
              <li>
                <span className="text-[#f0ece6]">Právo na omezení zpracování (čl. 18)</span> —
                požádat o dočasné omezení zpracování vašich údajů.
              </li>
              <li>
                <span className="text-[#f0ece6]">Právo na přenositelnost (čl. 20)</span> — obdržet
                osobní údaje v strojově čitelném formátu.
              </li>
              <li>
                <span className="text-[#f0ece6]">Právo vznést námitku (čl. 21)</span> — vznést námitku
                proti zpracování na základě oprávněného zájmu.
              </li>
              <li>
                <span className="text-[#f0ece6]">Právo podat stížnost u ÚOOÚ</span> — máte právo podat
                stížnost u dozorového orgánu: Úřad pro ochranu osobních údajů,
                Pplk. Sochora 27, 170 00 Praha 7,{" "}
                <a
                  href="https://www.uoou.cz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#c9a84c] hover:underline"
                >
                  www.uoou.cz
                </a>
                .
              </li>
            </ul>
          </section>

          {/* Section 8 */}
          <section aria-labelledby="kontakt-prava">
            <h2 id="kontakt-prava" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              8. Jak uplatnit svá práva
            </h2>
            <p>
              Veškerá práva a žádosti týkající se zpracování vašich osobních
              údajů uplatňujte na:
            </p>
            <div className="mt-4 p-5 bg-[#111111] border border-white/[0.05]">
              <p>
                <span className="text-[#f0ece6]">E-mail: </span>
                <a
                  href="mailto:info@vizeon.cz"
                  className="text-[#c9a84c] hover:underline"
                >
                  info@vizeon.cz
                </a>
              </p>
              <p className="mt-2">
                Na vaši žádost odpovíme bez zbytečného odkladu, nejpozději
                do <span className="text-[#f0ece6]">30 dnů</span> od jejího obdržení. Lhůtu lze ve
                výjimečných případech prodloužit o dalších 60 dnů, o čemž vás
                budeme informovat.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section aria-labelledby="cookies">
            <h2 id="cookies" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              9. Cookies a analytika
            </h2>
            <p>
              Tento web může používat technické cookies nezbytné pro svůj provoz.
              Souhlas s nepovinnými cookies vyžadujeme prostřednictvím cookie
              banneru při první návštěvě. Analytická data zpracováváme pouze
              v anonymizované podobě.
            </p>
          </section>

          {/* Section 10 */}
          <section aria-labelledby="zmeny">
            <h2 id="zmeny" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              10. Změny dokumentu
            </h2>
            <p>
              Vyhrazujeme si právo tento dokument aktualizovat. O podstatných
              změnách vás budeme informovat prostřednictvím oznámení na webu.
              Aktuální verze je vždy dostupná na adrese{" "}
              <a href="/gdpr" className="text-[#c9a84c] hover:underline">
                vizeon.cz/gdpr
              </a>
              .
            </p>
          </section>

        </div>

        {/* Back link */}
        <div className="mt-16 pt-8 border-t border-white/[0.05]">
          <Link
            href="/"
            className="font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300"
          >
            ← Zpět na úvodní stránku
          </Link>
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-white/[0.05]">
        <div className="max-w-4xl mx-auto px-6 md:px-12 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter font-light text-[12px] text-[#3d3830]">
            © 2026 VIZEON — Kryštof Sobotka. Všechna práva vyhrazena.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/gdpr"
              className="font-inter font-light text-[12px] text-[#c9a84c]"
              aria-current="page"
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
