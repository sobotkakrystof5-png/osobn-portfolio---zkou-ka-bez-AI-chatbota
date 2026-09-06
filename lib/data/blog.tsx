import type { ReactNode } from "react";
import Link from "next/link";
import { t } from "@/lib/ui";
import { PricingHighlight } from "@/components/blog/PricingHighlight";

// Zdroj pravdy pro blog. Nový článek = nový záznam sem (metadata + `content`)
// + vlastní route `app/blog/[slug]/page.tsx` číst nebude — ten čte odsud podle
// slugu, takže stačí přidat objekt do `posts` a přidat řádek do `app/sitemap.ts`.

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  /** ISO datum "YYYY-MM-DD" */
  date: string;
  category: string;
  readingMinutes: number;
  content: ReactNode;
};

export const posts: BlogPost[] = [
  {
    slug: "kolik-stoji-tvorba-webu-2026",
    title: "Kolik stojí tvorba webových stránek v roce 2026?",
    description:
      "Kolik stojí web v roce 2026? Rozebíráme, co cenu nejvíc ovlivňuje — rozsah projektu, SEO, responzivitu a obsah — a ukazujeme aktuální ceník VIZEON od 4 999 Kč.",
    excerpt:
      "Cena webu v roce 2026 se pohybuje od pár tisíc za šablonu až po desítky tisíc za web na míru. Rozebíráme, co ji nejvíc ovlivňuje — a kolik si účtuje VIZEON.",
    date: "2026-09-01",
    category: "Ceny webu",
    readingMinutes: 5,
    content: (
      <>
        <p className={t.body}>
          Cena za tvorbu webu se v roce 2026 pohybuje v širokém rozmezí a záleží na
          tom, co od stránek očekáváte. Jednoduchý prezentační web postavený na
          šabloně vyjde na několik tisíc korun, zatímco moderní web na míru s
          vlastním designem, funkcemi na zakázku a propracovanou SEO optimalizací se
          může vyšplhat na desítky tisíc i více.
        </p>

        <h2 className={t.articleH2}>Co cenu ovlivňuje nejvíc</h2>
        <p className={t.body}>
          Cenu nejvíc ovlivňuje rozsah projektu – tedy počet podstránek, jazykové
          mutace nebo e-shopová funkčnost – a také to, zda si zvolíte hotovou
          šablonu, nebo grafiku šitou na míru. Zásadní roli hraje i SEO
          optimalizace, kterou je potřeba promyslet už od začátku, protože zpětně se
          do hotového webu zabudovává mnohem hůř. Nezanedbatelnou položkou je také
          responzivita, bez které dnes moderní web nemůže fungovat, ať už jde o
          mobil, tablet nebo desktop. A konečně cenu zvedá i kvalitní obsah – texty a
          fotografie sice nejsou zadarmo, ale právě ony rozhodují o tom, jestli
          návštěvník na stránkách zůstane, nebo odejde ke konkurenci.
        </p>

        <h2 className={t.articleH2}>Proč se kvalitní web vyplatí</h2>
        <p className={t.body}>
          Kvalitní tvorba webu ale není jen o vzhledu. Dobře postavený a SEO
          optimalizovaný web dlouhodobě přivádí zákazníky přímo z vyhledávání, aniž
          by firma musela platit za reklamu, a zároveň působí důvěryhodně a
          zlepšuje vnímání celé značky. Tímto přístupem se zabývá i startup VIZEON,
          který staví weby na míru s důrazem na výsledek a transparentní ceny bez
          skrytých poplatků.
        </p>

        <h2 className={t.articleH2}>Šablona, nebo web na míru</h2>
        <p className={t.body}>
          Na trhu narazíte na dva zásadně odlišné přístupy k tvorbě webu. Hotová
          šablona, kterou jen upravíte podle firmy, dává smysl tam, kde stačí
          rychle informovat o existenci firmy – typicky u jednoduché vizitky nebo
          stránky "již brzy". Jakmile ale má web aktivně přivádět poptávky, limity
          šablony se rychle projeví: omezená struktura, pomalejší načítání kvůli
          nadbytečnému kódu a horší možnost přizpůsobit stránku přesně tomu, jak se
          u vás zákazníci rozhodují. Na co se přitom zaměřit, popisujeme v článku{" "}
          <Link href="/blog/jak-poznat-kvalitni-web-pro-remeslnika" className={t.link}>
            Jak poznat kvalitní web pro řemeslníka
          </Link>{" "}
          – většina bodů platí i mimo řemeslné obory.
        </p>

        <h2 className={t.articleH2}>Kolik stojí web u VIZEON</h2>
        <p className={t.body}>
          Podle veřejného ceníku VIZEONu se cena odvíjí od rozsahu projektu. Kdo
          potřebuje web s více podstránkami, pokročilými animacemi a systémy na
          míru, sáhne po variantě Pro Web. K dispozici je i měsíční správa webu Web
          Care, která zahrnuje aktualizace, bezpečnost a obsah. SEO služby – ať už
          jde o audit, lokální, obsahové nebo technické SEO – VIZEON řeší
          individuálně podle rozsahu webu.
        </p>
        <p className={t.body}>
          Nejjednodušší a cenově nejdostupnější je Micro Page – řeší jeden
          konkrétní účel, ať je to stránka "již brzy", link-in-bio nebo
          přesměrování. Kdo potřebuje jen důstojně informovat o existenci firmy,
          jménu a kontaktu bez prodejního tlaku, sáhne po Online Vizitce. Promo
          Page je landing page postavená kolem jedné konverze – poptávky nebo
          objednávky. A Pro Web dává smysl tam, kde web řeší víc podstránek
          najednou, pokročilejší animace nebo systém na míru, třeba rezervace.
        </p>

        <PricingHighlight />

        <h2 className={t.articleH2}>Co se do ceny nepočítá</h2>
        <p className={t.body}>
          Doménu a hosting obvykle zajišťuje registrátor domény nebo poskytovatel
          hostingu jako samostatnou položku mimo cenu webu samotného. Podobně to platí u SEO
          služeb: audit, lokální, obsahové i technické SEO se řeší individuálně
          podle rozsahu webu a konkrétního zadání, protože rozsah práce se liší
          projekt od projektu natolik, že paušální cena by byla zavádějící. Počítejte
          proto s tím, že cena webu a cena SEO práce jsou dvě oddělené položky,
          které se dají řešit i postupně – nejdřív web, SEO třeba až po spuštění.
        </p>

        <h2 className={t.articleH2}>Kolik trvá tvorba webu</h2>
        <p className={t.body}>
          Termín dodání se odvíjí od rozsahu podobně jako cena. Jednodušší weby,
          jako je Online Vizitka, bývají hotové v řádu jednotek pracovních dní, u
          rozsáhlejších projektů s vlastním systémem nebo pokročilejší
          funkcionalitou počítejte obvykle s termínem do tří týdnů. Konkrétní
          termín by měl být součástí nabídky od začátku, aby se v průběhu prací
          neposouval bez vysvětlení.
        </p>

        <h2 className={t.articleH2}>Jak si připravit zadání pro přesnější nabídku</h2>
        <p className={t.body}>
          Přesnost nabídky, kterou od dodavatele dostanete, závisí hlavně na tom, jak
          konkrétní zadání mu dáte. Sepište si předem, kolik podstránek reálně
          potřebujete, jestli chcete vlastní texty a fotografie nebo je má zajistit
          dodavatel, a jestli počítáte i se SEO, nebo zatím jen se samotným webem.
          Nejasné zadání typu "udělejte mi hezký web" vede k nabídkám, které se od
          sebe liší o desítky tisíc korun a nejdou mezi sebou vůbec porovnat.
        </p>

        <h2 className={t.articleH2}>Na co se zeptat, než podepíšete</h2>
        <p className={t.body}>
          Kromě samotné ceny se vyplatí zeptat, kolik kol úprav je v ceně
          zahrnutých, jestli po dokončení dostanete přístupy ke správě obsahu a
          zda vám patří doména a obsah webu, nebo zůstávají u dodavatele. Tahle
          otázka rozhoduje o tom, jak snadno – a levně – budete moct web v
          budoucnu upravit nebo přejít k jinému dodavateli.
        </p>

        <p className={t.body}>
          Než se proto pustíte do výběru dodavatele, vyplatí se předem ujasnit
          rozpočet i cíle – ušetří to nejen peníze, ale hlavně čas.
        </p>
      </>
    ),
  },
  {
    slug: "jak-poznat-kvalitni-web-pro-remeslnika",
    title: "Jak poznat kvalitní web pro řemeslníka",
    description:
      "Na co se ptát dodavatele webu, než truhláři, zámečníkovi nebo instalatérovi zaplatíte za web na míru. Galerie realizací, rychlost poptávky, mobilní zobrazení a na co si dát pozor.",
    excerpt:
      "Řemeslníci často dostanou nabídku hezky vypadajícího webu, který jim ale nepřivede jedinou poptávku. Rozebíráme, podle čeho kvalitní web pro řemeslníka poznáte předem.",
    date: "2026-09-02",
    category: "Weby pro řemeslníky",
    readingMinutes: 5,
    content: (
      <>
        <p className={t.body}>
          Řemeslníci si často web pořizují jednorázově, bez zkušenosti s tím, na co se ptát, a
          rozhodují se hlavně podle ceny nebo podle toho, jak nabízený vzhled zapůsobí na první
          pohled. Jenže hezký vzhled a web, který skutečně přivádí poptávky, jsou dvě různé věci.
          Než dodavateli zaplatíte, vyplatí se ověřit pár konkrétních věcí.
        </p>

        <h2 className={t.articleH2}>Galerie realizací, ne jen fotka dílny</h2>
        <p className={t.body}>
          Zákazník, který hledá truhláře na kuchyňskou linku nebo zámečníka na mříž, se rozhoduje
          především podle toho, jestli jste už dělali podobnou zakázku. Web bez prostoru na galerii
          realizací, nebo s galerií schovanou na třetí podstránce, tuhle nejsilnější kartu
          nevyužívá. Ptejte se, jak bude galerie strukturovaná a jak snadno si do ní budete moct
          sami přidávat nové fotky.
        </p>

        <h2 className={t.articleH2}>Rychlá cesta k poptávce</h2>
        <p className={t.body}>
          Řemeslníci dostávají poptávky mezi zakázkami, často z mobilu, o víkendu. Pokud web
          nemá jasné tlačítko k poptávce nebo kontakt na dosah jednoho kliknutí, zákazník napíše
          radši konkurenci. Dobrý web pro řemeslníka řeší poptávkový formulář jako prioritu, ne
          jako doplněk v patičce.
        </p>

        <h2 className={t.articleH2}>Kolik by měl web pro řemeslníka stát</h2>
        <p className={t.body}>
          Cena se u řemeslníků obvykle odvíjí od toho, kolik podstránek a jak
          rozsáhlou galerii web potřebuje. Pro jednoho řemeslníka s galerií
          realizací a poptávkovým formulářem často stačí Online Vizitka od 7 499
          Kč, u rozsáhlejší prezentace s víc podstránkami nebo přehledem několika
          řemesel najednou se hodí Promo Page od 9 999 Kč nebo Pro Web od 14 999
          Kč. Kompletní a aktuální ceník najdete na{" "}
          <Link href="/cena-tvorby-webu" className={t.link}>
            stránce s ceníkem
          </Link>
          , podrobnější rozbor toho, co cenu webu obecně ovlivňuje, pak v článku{" "}
          <Link href="/blog/kolik-stoji-tvorba-webu-2026" className={t.link}>
            Kolik stojí tvorba webových stránek v roce 2026
          </Link>
          .
        </p>

        <h2 className={t.articleH2}>Jak dlouho má tvorba trvat</h2>
        <p className={t.body}>
          Řemeslníci obvykle nemůžou čekat na web měsíce – poptávky přicházejí
          denně a konkurence nespí. Online Vizitka s galerií bývá hotová do 5
          pracovních dní, Promo Page do 10 dní. Pokud vám dodavatel nedokáže
          termín odhadnout ani orientačně, nebo mluví jen o "pár týdnech" bez
          konkrétnějšího čísla, je to důvod ptát se dál.
        </p>

        <h2 className={t.articleH2}>Proč se vyplatí být opatrný u extrémně nízkých nabídek</h2>
        <p className={t.body}>
          Extrémně nízká cena bývá spíš varovný signál než výhoda. Nejčastěji za
          ní stojí jedna z několika věcí: web postavený na univerzální šabloně
          beze změn, žádné kolo úprav v ceně, dodavatel, který po předání přestane
          komunikovat, nebo přístupy a doména, které si dodavatel ponechává, takže
          na něm zůstáváte dál závislí. Levný web není automaticky špatný web, ale
          je potřeba mnohem pečlivěji zjistit, co přesně cena obsahuje.
        </p>

        <h2 className={t.articleH2}>Co byste měli dostat při předání webu</h2>
        <p className={t.body}>
          Solidní dodavatel předá nejen hotový web, ale i přístupy do administrace,
          návod, jak si sami přidávat fotky do galerie, a informaci, kam se obrátit,
          když bude po spuštění potřeba drobná úprava. Pokud vám dodavatel nedá
          přístupy vůbec, nebo je podmíní měsíční platbou navíc, není to nutně
          problém – ale mělo by to zaznít předem, ideálně ještě před podpisem.
        </p>

        <h2 className={t.articleH2}>Kdy dává smysl měsíční správa webu</h2>
        <p className={t.body}>
          U jednoduché vizitky, kterou aktualizujete jednou za čas sami, měsíční
          správu obvykle nepotřebujete. Vyplatí se tam, kde web běžně upravujete –
          přidáváte fotky nových realizací, měníte ceník nebo chcete jistotu, že
          web zůstane zabezpečený a aktuální i bez toho, abyste to sami hlídali.
          U VIZEONu tuhle variantu řeší Web Care.
        </p>

        <h2 className={t.articleH2}>Mobilní zobrazení není bonus, je základ</h2>
        <p className={t.body}>
          Většina návštěv webů pro řemeslníky přichází z mobilu — na stavbě, v autě mezi
          zakázkami. Web, který na mobilu působí stísněně nebo se pomalu načítá kvůli
          neoptimalizovaným fotkám, ztrácí poptávky dřív, než si ho stihne zákazník pořádně
          prohlédnout.
        </p>

        <h2 className={t.articleH2}>Základní SEO by měl mít web hned od spuštění</h2>
        <p className={t.body}>
          Vyplněný název a popisek stránky, rychlé načítání a strukturovaná data pro vyhledávače
          se do hotového webu zpětně zabudovávají mnohem hůř než od začátku. Víc o tom, co
          technické SEO obnáší, najdete na stránce{" "}
          <Link href="/sluzby/seo-optimalizace/technicke-seo" className={t.link}>
            technické SEO
          </Link>
          . Pokud navíc chcete, aby vás našli i zákazníci z okolí, řeší se to jako{" "}
          <Link href="/sluzby/seo-optimalizace/lokalni-seo" className={t.link}>
            lokální SEO
          </Link>
          .
        </p>

        <h2 className={t.articleH2}>Reference, které něco dokazují</h2>
        <p className={t.body}>
          Vedle galerie realizací se vyplatí zeptat i na reference od konkrétních
          klientů – jméno, obor a případně odkaz na jejich vlastní web. Anonymní
          hodnocení bez ověřitelné vazby na skutečnou firmu má menší váhu než pár
          jmenovitých referencí, u kterých si zákazník může sám dohledat, jak
          výsledná práce v provozu skutečně vypadá. Pár ukázek realizací najdete
          na stránce{" "}
          <Link href="/ukazky-webu" className={t.link}>
            Ukázky webů a reference od klientů
          </Link>
          .
        </p>

        <h2 className={t.articleH2}>Na co si dát pozor u nabídek</h2>
        <p className={t.body}>
          Pozor na nejasně popsaný rozsah (kolik podstránek, kolik kol úprav je v ceně), na to,
          jestli po dokončení dostanete přístupy ke správě obsahu, a na to, zda vám patří doména a
          obsah webu, nebo zůstávají u dodavatele. Srozumitelný ceník bez skrytých poplatků je
          dobré znamení — příklad najdete na{" "}
          <Link href="/cena-tvorby-webu" className={t.link}>
            stránce s ceníkem
          </Link>{" "}
          nebo přímo na{" "}
          <Link href="/web-pro-remeslniky" className={t.link}>
            stránce o tvorbě webu pro řemeslníky
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    slug: "lokalni-seo-pro-zivnostniky-v-cr",
    title: "Lokální SEO pro živnostníky v ČR",
    description:
      "Co lokální SEO pro živnostníky a malé firmy v Česku znamená, proč nestačí jen Google a jak nastavit Google Business Profile, Firmy.cz a konzistentní NAP údaje.",
    excerpt:
      "Živnostník s webem, ale bez lokálního SEO, přichází o poptávky od lidí z vlastního okolí. Vysvětlujeme, z čeho se lokální SEO v Česku skládá a kde s ním začít.",
    date: "2026-09-02",
    category: "Lokální SEO",
    readingMinutes: 5,
    content: (
      <>
        <p className={t.body}>
          Živnostník nebo malá firma se zákazníky z okolí — řemeslník, kadeřnictví, masér, účetní
          kancelář — má u lokálního SEO jednu výhodu: nemusí soutěžit s celým internetem, jen s
          firmami ve stejném regionu. Přesto ho spousta menších podniků řeší jen náhodou, nebo
          vůbec.
        </p>

        <h2 className={t.articleH2}>Google Business Profile jako základ</h2>
        <p className={t.body}>
          Bezplatný profil na Googlu, díky kterému se firma zobrazí na Google Maps a v mapovém
          výřezu výsledků vyhledávání. Rozhoduje tu správně zvolená kategorie, kompletní
          otevírací doba, fotky a konzistentní kontaktní údaje.
        </p>

        <h2 className={t.articleH2}>V Česku nestačí jen Google</h2>
        <p className={t.body}>
          Seznam má vlastní fulltextový vyhledávač i vlastní mapy, nezávislé na Googlu, a pořád
          si drží významnou část tuzemského trhu. Firma bez profilu na Firmy.cz přichází o
          poptávky, které Seznam zobrazí jinak než Google. Rozdíly mezi oběma platformami
          rozebíráme v článku{" "}
          <Link href="/blog/google-business-profile-vs-firmy-cz" className={t.link}>
            Google Business Profile vs. Firmy.cz
          </Link>
          .
        </p>

        <h2 className={t.articleH2}>NAP konzistence napříč webem i profily</h2>
        <p className={t.body}>
          Jméno firmy, adresa a telefon (NAP) by měly být na webu, Google Business Profile i
          Firmy.cz napsané úplně stejně. Nekonzistentní údaje matou vyhledávače i zákazníky a
          oslabují signál, že jde o důvěryhodnou, aktivně vedenou firmu.
        </p>

        <h2 className={t.articleH2}>Fotky v profilu nejsou jen doplněk</h2>
        <p className={t.body}>
          Profily s dostatkem aktuálních a kvalitních fotek – exteriéru, interiéru,
          hotové práce – dostávají obvykle víc pozornosti než profil s jednou
          rozmazanou fotkou z mobilu. U řemeslníků a služeb, kde zákazník rozhoduje
          podle vzhledu výsledku, funguje fotka v profilu podobně jako galerie
          realizací na webu: je to první věc, podle které se potenciální zákazník
          rozhoduje, jestli klikne dál.
        </p>

        <h2 className={t.articleH2}>Recenze jako nejsilnější signál</h2>
        <p className={t.body}>
          Počet a čerstvost recenzí patří mezi nejsilnější faktory, podle kterých se firmy v
          mapovém výřezu řadí. Nejjednodušší způsob, jak recenze získat, je požádat o ně
          spokojeného zákazníka krátce po dokončení zakázky, dokud je zážitek čerstvý.
        </p>

        <h2 className={t.articleH2}>Odpovídejte na recenze, i na ty negativní</h2>
        <p className={t.body}>
          Odpověď na recenzi – pozitivní i negativní – ukazuje ostatním zákazníkům i
          vyhledávačům, že profil někdo aktivně spravuje. U negativní recenze se vyplatí
          reagovat věcně, bez emocí a případně nabídnout řešení mimo veřejnou diskuzi.
          Nezodpovězená negativní recenze bez jakéhokoli kontextu obvykle působí hůř než
          recenze samotná.
        </p>

        <h2 className={t.articleH2}>Kategorie a otevírací doba rozhodují víc, než se zdá</h2>
        <p className={t.body}>
          Google Business Profile i Firmy.cz umožňují zvolit hlavní i doplňkové kategorie,
          a právě podle nich vyhledávač pozná, na jaké dotazy se má profil zobrazovat.
          Špatně zvolená nebo příliš obecná kategorie znamená, že se firma nezobrazí přesně
          tam, kde by ji zákazník hledal. Stejně tak neaktuální otevírací doba patří mezi
          nejčastější důvody, proč zákazník dorazí na zavřeno a příště zkusí konkurenci.
        </p>

        <h2 className={t.articleH2}>Příspěvky a Q&A v profilu</h2>
        <p className={t.body}>
          Google Business Profile umožňuje kromě základních údajů přidávat krátké
          příspěvky – novinky, akce, sezónní nabídku – a odpovídat na dotazy v sekci
          Q&A. Aktivně vedený profil s pravidelnými příspěvky obvykle působí
          důvěryhodněji než profil, který od založení nikdo neotevřel.
        </p>

        <h2 className={t.articleH2}>Citace v dalších katalozích a mapách</h2>
        <p className={t.body}>
          Kromě Google Business Profile a Firmy.cz se vyplatí mít firmu založenou i
          v dalších relevantních katalozích, třeba v oborových katalozích pro váš
          obor nebo na sociálních sítích, kde firmu provozujete. Každá taková citace se stejnými NAP údaji
          posiluje signál, že jde o skutečně existující a aktivně vedenou firmu – čím víc
          nekonzistentních verzí adresy nebo telefonu je po internetu rozeseto, tím hůř.
        </p>

        <h2 className={t.articleH2}>Živnostník bez kamenné provozovny</h2>
        <p className={t.body}>
          Pokud jezdíte za zákazníkem – elektrikář, instalatér, úklidová firma – profil
          se nastavuje jako služba s definovanou oblastí působnosti místo pobočky s
          veřejnou adresou. Rozsah oblasti je potřeba nastavit realisticky: příliš široký
          okruh rozmělní relevanci profilu pro konkrétní lokalitu, příliš úzký zase
          zbytečně omezí, kdo vás vůbec najde. Víc o tom, jak takový web pro řemeslníky
          stavím, najdete na stránce{" "}
          <Link href="/web-pro-remeslniky" className={t.link}>
            web pro řemeslníky
          </Link>
          .
        </p>

        <h2 className={t.articleH2}>Proč lokální SEO potřebuje i dobrý web</h2>
        <p className={t.body}>
          Profil na Google Business Profile a Firmy.cz přivede zákazníka k rozhodnutí
          kliknout, ale samotné rozhodnutí objednat obvykle padne až na webu – proto
          se nevyplatí řešit lokální SEO bez toho, aby web samotný fungoval a rychle
          se načítal. Jak spolu obě věci souvisí a na co se u dodavatele webu
          zeptat, rozebíráme v článku{" "}
          <Link href="/blog/jak-poznat-kvalitni-web-pro-remeslnika" className={t.link}>
            Jak poznat kvalitní web pro řemeslníka
          </Link>
          .
        </p>

        <h2 className={t.articleH2}>Jak sledovat, jestli lokální SEO funguje</h2>
        <p className={t.body}>
          Google Business Profile i Firmy.cz nabízí přehled statistik – kolikrát se
          profil zobrazil, kolik lidí kliklo na web, zavolalo nebo si nechalo
          zobrazit trasu. Sledování těchto čísel v čase je nejjednodušší způsob, jak
          poznat, jestli optimalizace přináší reálný efekt, a ne se spoléhat jen na
          dojem.
        </p>

        <h2 className={t.articleH2}>Jak dlouho to trvá</h2>
        <p className={t.body}>
          Základní nastavení profilů je hotové rychle, ale reálný posun v pozicích a v počtu
          recenzí se projeví v řádu týdnů až měsíců — je to postupná práce, ne jednorázový zásah.
          Kompletní rozpis, co všechno lokální SEO zahrnuje, najdete na stránce{" "}
          <Link href="/sluzby/seo-optimalizace/lokalni-seo" className={t.link}>
            lokální SEO
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    slug: "google-business-profile-vs-firmy-cz",
    title: "Google Business Profile vs Firmy.cz — co nastavit jako první",
    description:
      "Google Business Profile a Firmy.cz na Seznamu řeší podobnou věc na dvou různých vyhledávačích. Vysvětlujeme rozdíly a v jakém pořadí je jako živnostník nastavit.",
    excerpt:
      "Dva bezplatné firemní profily, dva různé vyhledávače. Rozebíráme, čím se Google Business Profile a Firmy.cz liší a co nastavit jako první, když máte čas jen na jedno.",
    date: "2026-09-02",
    category: "Lokální SEO",
    readingMinutes: 5,
    content: (
      <>
        <p className={t.body}>
          Google Business Profile a Firmy.cz na Seznamu dělají na první pohled to samé — bezplatný
          firemní profil s adresou, telefonem a otevírací dobou, propojený s mapami. V čem se ale
          liší, a kde má smysl začít, když máte čas nastavit zatím jen jedno?
        </p>

        <h2 className={t.articleH2}>Google Business Profile — co řeší</h2>
        <p className={t.body}>
          Profil, díky kterému se firma objeví na Google Maps a v mapovém výřezu výsledků na
          Googlu — tedy tam, kde dnes hledá naprostá většina lidí, kteří googlí "truhlář poblíž"
          nebo podobný dotaz. Zahrnuje kategorii, fotky, popis, otevírací dobu a recenze.
        </p>

        <h2 className={t.articleH2}>Firmy.cz — co řeší</h2>
        <p className={t.body}>
          Obdoba Google Business Profile, ale pro Seznam — vlastní fulltextový vyhledávač s
          vlastním algoritmem, nezávislý na Googlu. Firmy.cz se propisuje i do Seznam Map. V Česku
          si Seznam pořád drží významnou část vyhledávání, hlavně u starší nebo lokálně zaměřené
          klientely.
        </p>

        <h2 className={t.articleH2}>Jak se profily liší ve správě</h2>
        <p className={t.body}>
          Google Business Profile se spravuje přes vlastní aplikaci nebo webové
          rozhraní napojené na Google účet, a změny – třeba úprava otevírací doby –
          se do vyhledávání promítnou obvykle rychle. Firmy.cz funguje obdobně přes
          účet na Seznamu, ale jde o samostatný systém s vlastním schvalovacím
          procesem u některých úprav. Nejde tedy o dvě jména jednoho rozhraní, ale
          o dvě nezávislé platformy, které je potřeba spravovat zvlášť.
        </p>

        <h2 className={t.articleH2}>Seznam Mapy a Google Maps</h2>
        <p className={t.body}>
          Stejně jako se Google Business Profile propisuje do Google Maps, Firmy.cz
          se propisuje do Seznam Map – druhé nejpoužívanější mapové služby v Česku.
          Firma, která má vyplněný jen jeden z profilů, tak chybí v jedné ze dvou
          map, které lidé při hledání služeb v okolí běžně otevírají.
        </p>

        <h2 className={t.articleH2}>Recenze se nepřenášejí mezi platformami</h2>
        <p className={t.body}>
          Recenze na Google Business Profile a recenze na Firmy.cz jsou dvě oddělené
          sady hodnocení. Spokojený zákazník, který vám dal pět hvězd na Googlu, se
          na Seznamu nijak neprojeví, dokud ho nepožádáte o recenzi i tam. Firma,
          která si vybudovala silné hodnocení jen na jedné platformě, tak na druhé
          může působit jako nová nebo neprověřená, i když ve skutečnosti dlouhodobě
          funguje.
        </p>

        <h2 className={t.articleH2}>Co nastavit jako první</h2>
        <p className={t.body}>
          Pokud musíte vybrat jen jedno, začněte Google Business Profile — Google má v Česku větší
          podíl na vyhledávání obecně. Firmy.cz by ale nemělo zůstat pozadu o víc než pár týdnů:
          jde o krátké nastavení a bez něj přicházíte o poptávky, které Seznam ukáže jinak než
          Google.
        </p>

        <h2 className={t.articleH2}>Který profil zákazníci vnímají důvěryhodněji</h2>
        <p className={t.body}>
          Ani jeden profil sám o sobě není důvěryhodnější – roli hraje hlavně to, jak
          kompletní a aktuální je. Prázdný nebo dlouho neaktualizovaný profil na
          kterékoli platformě působí hůř než profil na té "méně důležité" platformě,
          který je vyplněný pořádně, s fotkami a odpověďmi na recenze.
        </p>

        <h2 className={t.articleH2}>Co dělat, když firma působí ve víc městech</h2>
        <p className={t.body}>
          Pokud firma působí ve víc lokalitách, obě platformy umožňují založit
          samostatný profil pro každou pobočku nebo oblast působnosti. Duplikovat
          jeden profil pro víc měst není řešení – vyhledávač pak neví, kterou
          lokalitu má zobrazit, a relevance profilu pro konkrétní město klesá.
        </p>

        <h2 className={t.articleH2}>Kolik času správa obou profilů zabere</h2>
        <p className={t.body}>
          Založení obou profilů je u jednoduché živnosti bez víc poboček otázka
          jednoho odpoledne. Průběžná správa – reakce na recenze, aktualizace fotek
          a otevírací doby – zabere řádově pár minut týdně, pokud si na ni uděláte
          pravidelný čas, místo abyste ji řešili nárazově jednou za půl roku.
        </p>

        <h2 className={t.articleH2}>Odkaz na web patří do obou profilů</h2>
        <p className={t.body}>
          Oba profily umožňují přidat odkaz na web – nevynechávejte ho ani na
          jednom z nich. Je to nejpřímější cesta, jak profil, který zákazníka
          zaujme, propojit s webem, kde padne finální rozhodnutí objednat nebo
          poptat.
        </p>

        <h2 className={t.articleH2}>Jak poznat, že profil není správně nastavený</h2>
        <p className={t.body}>
          Nejjistější signál je nesoulad: jiná adresa nebo telefon na webu než v
          profilu, zavřená provozovna podle otevírací doby v době, kdy ve
          skutečnosti fungujete, nebo dlouho nezodpovězené recenze. Tyhle drobnosti
          samy o sobě web nepotopí, ale u zákazníka, který porovnává víc firem
          najednou, rozhodují o tom, komu nakonec zavolá.
        </p>

        <h2 className={t.articleH2}>Typické chyby při zakládání profilu</h2>
        <p className={t.body}>
          Nejčastější chybou je duplicitní profil – firma vznikne na platformě
          automaticky, třeba z veřejného rejstříku, a majitel si založí druhý,
          aniž by ten první převzal nebo nechal sloučit. Vyhledávač pak neví,
          který profil je aktuální, a rozmělňuje mezi nimi recenze i signály
          relevance. Další časté chyby jsou nepřevzatý (neověřený) profil, který
          může upravovat kdokoli, špatně zvolená kategorie a zapomenutá aktualizace
          při stěhování provozovny nebo změně telefonu.
        </p>

        <h2 className={t.articleH2}>Stejné údaje na obou profilech</h2>
        <p className={t.body}>
          Jméno firmy, adresu a telefon vyplňte na obou profilech i na webu identicky. Rozdílné
          formátování (třeba jiná zkratka ulice nebo staré telefonní číslo) oslabuje důvěryhodnost
          v očích obou vyhledávačů. Kompletní přehled, jak lokální SEO v Česku poskládat
          dohromady, najdete v článku{" "}
          <Link href="/blog/lokalni-seo-pro-zivnostniky-v-cr" className={t.link}>
            Lokální SEO pro živnostníky v ČR
          </Link>{" "}
          nebo na stránce{" "}
          <Link href="/sluzby/seo-optimalizace/lokalni-seo" className={t.link}>
            lokální SEO
          </Link>
          .
        </p>
      </>
    ),
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getSortedPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
