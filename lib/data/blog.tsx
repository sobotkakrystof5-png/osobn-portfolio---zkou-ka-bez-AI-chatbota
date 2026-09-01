import type { ReactNode } from "react";
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
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function getSortedPosts(): BlogPost[] {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}
