import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Obchodní podmínky",
  description:
    "Obchodní podmínky poskytování webových a grafických služeb — VIZEON, Kryštof Sobotka. Platnost od 1. 1. 2026.",
  robots: { index: false, follow: false },
};

export default function PodminkyPage() {
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
          Obchodní podmínky
        </h1>
        <p className="font-inter font-light text-[13px] text-[#3d3830] mb-14">
          Platnost od 1. 1. 2026 · Tyto obchodní podmínky upravují vztahy mezi poskytovatelem a klientem.
        </p>

        <div className="space-y-12 font-inter font-light text-[14px] text-[#8a8070] leading-[1.85]">

          {/* Section 1 */}
          <section aria-labelledby="poskytovatel">
            <h2 id="poskytovatel" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              1. Identifikace poskytovatele
            </h2>
            <p>
              Poskytovatelem služeb ve smyslu těchto obchodních podmínek je:
            </p>
            <ul className="mt-4 space-y-1 pl-4 border-l border-white/[0.06]">
              <li><span className="text-[#f0ece6]">Jméno:</span> Kryštof Sobotka</li>
              <li><span className="text-[#f0ece6]">Obchodní název:</span> VIZEON</li>
              <li>
                <span className="text-[#f0ece6]">E-mail: </span>
                <a href="mailto:sobotkakrystof5@gmail.com" className="text-[#c9a84c] hover:underline">
                  sobotkakrystof5@gmail.com
                </a>
              </li>
              <li>
                <span className="text-[#f0ece6]">Telefon: </span>
                <a href="tel:+420604837333" className="hover:text-[#f0ece6] transition-colors">
                  +420 604 837 333
                </a>
              </li>
              <li>
                <span className="text-[#f0ece6]">Web: </span>
                <a href="https://vizeon.cz" className="text-[#c9a84c] hover:underline">
                  vizeon.cz
                </a>
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section aria-labelledby="predmet">
            <h2 id="predmet" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              2. Předmět smlouvy a rozsah služeb
            </h2>
            <p>
              Poskytovatel nabízí a poskytuje následující služby (dále jen
              „Služby"):
            </p>
            <ul className="mt-4 space-y-2 list-disc list-inside">
              <li>Tvorba webových stránek a webových aplikací na míru</li>
              <li>Grafický design (vizuální identity, bannery, tiskové materiály)</li>
              <li>Tvorba prezentací a firemních materiálů</li>
              <li>Správa sociálních sítí a tvorba obsahu</li>
              <li>Konzultace v oblasti online marketingu a digitální přítomnosti</li>
            </ul>
            <p className="mt-4">
              Přesný rozsah, specifikace a cena konkrétní zakázky jsou vždy
              sjednány individuálně v rámci nabídky.
            </p>
          </section>

          {/* Section 3 */}
          <section aria-labelledby="vznik-smlouvy">
            <h2 id="vznik-smlouvy" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              3. Vznik smluvního vztahu
            </h2>
            <p>
              Smluvní vztah mezi poskytovatelem a klientem vzniká:
            </p>
            <ol className="mt-4 space-y-2 list-decimal list-inside">
              <li>Klient odešle poptávku prostřednictvím kontaktního formuláře nebo e-mailem.</li>
              <li>Poskytovatel zpracuje nabídku a zašle ji klientovi e-mailem.</li>
              <li>
                Smlouva je uzavřena <span className="text-[#f0ece6]">písemným (e-mailovým) potvrzením
                nabídky klientem</span> a úhradou zálohy dle čl. 4.
              </li>
            </ol>
            <p className="mt-4">
              Nabídka je závazná po dobu 14 dní od jejího odeslání, není-li
              dohodnuto jinak.
            </p>
          </section>

          {/* Section 4 */}
          <section aria-labelledby="platebni">
            <h2 id="platebni" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              4. Platební podmínky
            </h2>
            <p>Cena za Služby je splatná ve dvou splátkách:</p>
            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>
                <span className="text-[#f0ece6]">Záloha 30 %</span> z celkové ceny zakázky — splatná
                před zahájením prací, na základě zálohové faktury. Zahájení
                prací je podmíněno připsáním zálohy na účet poskytovatele.
              </li>
              <li>
                <span className="text-[#f0ece6]">Doplatek 70 %</span> z celkové ceny zakázky — splatný
                po dokončení a předání díla klientovi, na základě konečné
                faktury. Splatnost faktury je 14 dnů.
              </li>
            </ul>
            <p className="mt-4">
              Platba probíhá bankovním převodem na účet poskytovatele. Fakturační
              údaje jsou uvedeny na příslušném daňovém dokladu.
            </p>
            <p className="mt-4">
              V případě prodlení klienta s úhradou je poskytovatel oprávněn
              pozastavit práce nebo přístup k předanému dílu do úplného
              zaplacení.
            </p>
          </section>

          {/* Section 5 */}
          <section aria-labelledby="terminy">
            <h2 id="terminy" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              5. Termíny dodání
            </h2>
            <p>
              Orientační termíny dodání jsou uvedeny v ceníku na webu.
              Závazný termín dodání je vždy stanoven individuálně v objednávce
              nebo v e-mailové dohodě mezi stranami.
            </p>
            <p className="mt-4">
              Termín dodání se automaticky prodlužuje o dobu, po kterou klient
              neposkytuje součinnost (materiály, texty, logo, fotografie,
              zpětnou vazbu k návrhům). Poskytovatel klienta na prodlení
              upozorní e-mailem.
            </p>
          </section>

          {/* Section 6 */}
          <section aria-labelledby="autorska-prava">
            <h2 id="autorska-prava" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              6. Autorská práva a licence
            </h2>
            <p>
              Veškerá díla vytvořená poskytovatelem jsou chráněna autorským
              zákonem (zákon č. 121/2000 Sb.).
            </p>
            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>
                Po úplném zaplacení sjednané ceny poskytuje poskytovatel
                klientovi <span className="text-[#f0ece6]">nevýhradní licenci</span> k užívání výsledného
                díla (webové stránky, grafika, prezentace) pro účely
                dohodnuté v objednávce.
              </li>
              <li>
                <span className="text-[#f0ece6]">Zdrojový kód webové aplikace</span> zůstává ve vlastnictví
                poskytovatele, pokud není písemně dohodnut jeho převod na
                klienta. Klient obdrží přístup k hostovanému řešení.
              </li>
              <li>
                Klient není oprávněn postoupit licenci třetím osobám bez
                předchozího písemného souhlasu poskytovatele.
              </li>
              <li>
                Poskytovatel si vyhrazuje právo uvést dokončenou zakázku ve
                svém portfoliu a v marketingových materiálech, pokud klient
                výslovně nevznese písemnou námitku.
              </li>
            </ul>
          </section>

          {/* Section 7 */}
          <section aria-labelledby="reklamace">
            <h2 id="reklamace" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              7. Reklamace a záruky
            </h2>
            <p>
              Poskytovatel usiluje o maximální spokojenost klienta a zavazuje se:
            </p>
            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>
                V průběhu projektu provádět <span className="text-[#f0ece6]">opravy a úpravy do spokojenosti
                klienta</span> v rozsahu, který je v souladu s dohodnutou specifikací.
              </li>
              <li>
                Po předání díla poskytovat <span className="text-[#f0ece6]">14denní záruční lhůtu</span> na
                technické chyby a závady vzniklé na straně poskytovatele.
                Záruční opravy jsou bezplatné.
              </li>
            </ul>
            <p className="mt-4">
              Záruka se nevztahuje na závady způsobené nevhodným zacházením
              klienta, úpravami provedenými třetí stranou, nebo v důsledku
              aktualizací externích platforem (CMS, pluginy, hosting).
            </p>
            <p className="mt-4">
              Reklamaci uplatňujte e-mailem na{" "}
              <a href="mailto:sobotkakrystof5@gmail.com" className="text-[#c9a84c] hover:underline">
                sobotkakrystof5@gmail.com
              </a>{" "}
              s popisem závady. Poskytovatel reklamaci vyřídí do 30 pracovních
              dnů od jejího přijetí.
            </p>
          </section>

          {/* Section 8 */}
          <section aria-labelledby="odstoupeni">
            <h2 id="odstoupeni" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              8. Odstoupení od smlouvy
            </h2>
            <p>
              Kterákoli ze stran může od smlouvy odstoupit písemně (e-mailem)
              za následujících podmínek:
            </p>
            <ul className="mt-4 space-y-3 list-disc list-inside">
              <li>
                <span className="text-[#f0ece6]">Klient:</span> Pokud jsou zahájeny práce (tj. byla
                zaplacena záloha a poskytovatel začal pracovat na zakázce),
                záloha je <span className="text-[#f0ece6]">nevratná</span> a klient není oprávněn ji
                požadovat zpět. Hradí tím odvedenou práci.
              </li>
              <li>
                <span className="text-[#f0ece6]">Klient před zahájením prací:</span> Pokud klient odstoupí
                ještě před zahájením prací, záloha mu bude vrácena v plné výši
                do 14 dnů.
              </li>
              <li>
                <span className="text-[#f0ece6]">Poskytovatel:</span> Poskytovatel je oprávněn odstoupit
                od smlouvy v případě závažného porušení povinností klientem
                (např. opakované neposkytnutí součinnosti, prodlení s platbou
                delší než 30 dní). V takovém případě vyúčtuje poměrnou část
                ceny odpovídající odvedené práci.
              </li>
            </ul>
          </section>

          {/* Section 9 */}
          <section aria-labelledby="spory">
            <h2 id="spory" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              9. Řešení sporů
            </h2>
            <p>
              Smluvní strany se zavazují řešit případné spory přednostně
              smírnou cestou — přímým jednáním nebo mimosoudní mediací.
            </p>
            <p className="mt-4">
              Pokud nedojde k dohodě, je pro řešení sporů příslušný obecný
              soud poskytovatele dle jeho aktuálního sídla. Rozhodné právo
              je právo České republiky.
            </p>
          </section>

          {/* Section 10 */}
          <section aria-labelledby="zaverecna">
            <h2 id="zaverecna" className="font-cormorant font-light text-[24px] md:text-[32px] text-[#f0ece6] mb-4">
              10. Závěrečná ustanovení
            </h2>
            <p>
              Tyto obchodní podmínky nabývají platnosti a účinnosti dne
              <span className="text-[#f0ece6]"> 1. 1. 2026</span>.
            </p>
            <p className="mt-4">
              Poskytovatel si vyhrazuje právo tyto podmínky jednostranně
              měnit. Změna nabývá účinnosti zveřejněním nové verze na webu.
              Na zakázky uzavřené před účinností změny se vztahuje předchozí
              znění podmínek.
            </p>
            <p className="mt-4">
              Pokud je nebo se stane jakékoli ustanovení těchto podmínek
              neplatným, neúčinným nebo nevymahatelným, není tím dotčena
              platnost ostatních ustanovení.
            </p>
            <p className="mt-4">
              Tyto obchodní podmínky doplňují, nikoliv nahrazují, individuální
              podmínky sjednané v konkrétní objednávce nebo smlouvě.
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
              className="font-inter font-light text-[12px] text-[#3d3830] hover:text-[#8a8070] transition-colors duration-300"
            >
              Ochrana osobních údajů
            </Link>
            <span className="font-inter font-light text-[12px] text-[#2a2520]" aria-hidden="true">·</span>
            <Link
              href="/podminky"
              className="font-inter font-light text-[12px] text-[#c9a84c]"
              aria-current="page"
            >
              Obchodní podmínky
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
