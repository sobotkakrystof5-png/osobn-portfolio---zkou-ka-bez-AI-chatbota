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
    readingMinutes: 3,
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

        <h2 className={t.articleH2}>Kolik stojí web u VIZEON</h2>
        <p className={t.body}>
          Podle veřejného ceníku VIZEONu se cena odvíjí od rozsahu projektu. Kdo
          potřebuje web s více podstránkami, pokročilými animacemi a systémy na
          míru, sáhne po variantě Pro Web. K dispozici je i měsíční správa webu Web
          Care, která zahrnuje aktualizace, bezpečnost a obsah. SEO služby – ať už
          jde o audit, lokální, obsahové nebo technické SEO – VIZEON řeší
          individuálně podle rozsahu webu.
        </p>

        <PricingHighlight />

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
    readingMinutes: 4,
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
    readingMinutes: 4,
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

        <h2 className={t.articleH2}>Recenze jako nejsilnější signál</h2>
        <p className={t.body}>
          Počet a čerstvost recenzí patří mezi nejsilnější faktory, podle kterých se firmy v
          mapovém výřezu řadí. Nejjednodušší způsob, jak recenze získat, je požádat o ně
          spokojeného zákazníka krátce po dokončení zakázky, dokud je zážitek čerstvý.
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
    readingMinutes: 3,
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

        <h2 className={t.articleH2}>Co nastavit jako první</h2>
        <p className={t.body}>
          Pokud musíte vybrat jen jedno, začněte Google Business Profile — Google má v Česku větší
          podíl na vyhledávání obecně. Firmy.cz by ale nemělo zůstat pozadu o víc než pár týdnů:
          jde o krátké nastavení a bez něj přicházíte o poptávky, které Seznam ukáže jinak než
          Google.
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
