KONTEXT
Web VIZEON (vizeon.cz, Next.js 16 App Router, Vercel) je nová doména
(registrace 26.5.2026, cca 14 týdnů stará). Technická indexovatelnost je
v pořádku — robots.txt, sitemap.xml, canonical tagy, JSON-LD, žádný noindex,
žádná Vercel deployment protection. Hlavní problémy:

1. Backlinkchecker ukazuje 0 — normální u nové domény, ale nic se
   aktivně nedělá pro budování odkazů/autority.
2. Google rating 0 — chybí napojení na Google Business Profile (žádný
   AggregateRating, žádný sameAs odkaz na Google Maps v JSON-LD).
3. ~19 "web-pro-X" mikro-stránek (web-pro-truhlare, web-pro-zamecniky,
   web-pro-kovare, web-pro-rezbare, web-pro-instalatery, web-pro-elektrikare,
   web-pro-fotografy, web-pro-kosmeticky, web-pro-fitness-trenery,
   web-pro-realitni-maklere, web-pro-autoservisy, web-pro-kadernictvi,
   web-pro-ucetni, web-pro-masery-a-wellness, web-pro-remeslniky,
   web-pro-zahradniky, web-pro-studnare, web-pro-malire, web-pro-sanace)
   jedou přes sdílenou komponentu components/pillar/MicroServicePage.tsx —
   liší se jen H1, podnadpisem, 3 bullet body a 1 FAQ (~100-150 unikátních
   slov na stránku). Google to u čerstvé domény bez autority často hodnotí
   jako tenký/near-duplicate obsah → pomalejší/žádná indexace.
4. Blog má jen 1 článek (lib/data/blog.tsx, slug
   "kolik-stoji-tvorba-webu-2026").

CÍL TÉTO SESSION
Udělat maximum, co jde vyřešit v kódu, aby web měl lepší šanci na rychlejší
a hlubší indexaci a silnější SEO signály. Věci mimo kód (Google Business
Profile, katalogy, Search Console UI kroky) NEDĚLEJ sám — jen mi na konci
vypiš přesný manuální checklist s konkrétními kroky.

DŮLEŽITÁ OMEZENÍ — NEPORUŠOVAT
- Nikdy nevymýšlej/nefabrikuj falešné recenze, testimonials, počty
  zákazníků ani jiná nepravdivá tvrzení. V historii projektu už jednou
  proběhlo "Legal compliance: remove fake testimonials" — musí to
  zůstat pravdivé nebo jasně označené jako demo/ukázka.
- Neměň fungující rezervační/kontaktní flow (BookingContext, API routes,
  middleware rate limiting) — pokud na něj sáhneš, nejdřív mi to popiš.
- Drž se existujících design tokenů a konvencí (barvy #080808/#c9a84c/
  #8a8070, fonty Cormorant Garamond + Inter, lib/ui.ts tokeny, komponenty
  v components/pillar/).
- U blogu dodržuj existující konvence (ArticleMeta komponenta, VIZEON
  byline+logo linkující na homepage, H1 s tématem, datum) — najdi je v
  existujícím článku a v lib/data/blog.tsx než začneš psát nový.
- Po každé větší dávce změn spusť `npm run build` a over, že prochází
  bez chyb (TypeScript i Next.js build).

ÚKOLY — SEŘAZENO PODLE DOPADU

1) ROZŠÍŘIT OBSAH MIKRO-STRÁNEK (web-pro-*) — nejvyšší priorita
   Pro každou z ~19 stránek v app/web-pro-*/page.tsx:
   - Přidej reálně unikátní obsah nad rámec šablony MicroServicePage:
     konkrétní příklad zakázky/scénář pro daný obor, 2-3 další FAQ
     (místo jen 1), případně krátkou sekci "Jak vypadá proces" specifickou
     pro dané řemeslo/obor.
   - Zvaž rozšíření components/pillar/MicroServicePage.tsx o volitelné
     nové sloty (např. `processSteps`, druhá FAQ), ale zpětně kompatibilně
     — stránky, které nový prop nevyplní, musí fungovat jako dřív.
   - Cíl: každá stránka by měla mít alespoň 300-400 slov reálně unikátního
     textu (ne jen přeskládaná synonyma), ne 100-150 jako teď.
   - Neduplikuj text mezi obory 1:1 — každý bullet/FAQ musí dávat smysl
     konkrétně pro dané řemeslo (truhlář ≠ zámečník ≠ kosmetička).
   - Pokud je u některých oborů opravdu málo co unikátního říct (např.
     velmi blízké obory jako kovář/zámečník/rezbář), zvaž radši SLOUČENÍ
     2-3 stránek do jedné silnější stránky s redirectem (301) místo
     udržování tenkého obsahu na všech — navrhni mi to, neprováděj bez
     potvrzení, protože to mění URL strukturu a sitemapu.

2) BLOG — publikační plán a alespoň 2-3 nové články
   - Napiš 2-3 nové blogové články (v češtině, VIZEON tón hlasu) na témata
     relevantní pro cílovku (živnostníci/malé firmy): např. "Jak poznat
     kvalitní web pro řemeslníka", "Lokální SEO pro živnostníky v ČR",
     "Google Business Profile vs Firmy.cz — co nastavit jako první".
   - Dodržuj strukturu a komponenty existujícího článku a
     lib/data/blog.tsx (přidej nové položky se slug/date/meta).
   - Aktualizuj app/sitemap.ts (lastModified) — pozor, sitemap už blog
     posty generuje automaticky přes getSortedPosts(), jen ověř, že nové
     články mají správné datum a nezapomeň na to needitovat ručně duplicitně.
   - Prolinkuj nové články z relevantních web-pro-X stránek a naopak
     (interní prolinkování = SEO signál i lepší crawl discovery).

3) STRUCTURED DATA — připravit na budoucí recenze, doplnit co chybí
   - V app/layout.tsx do JSON-LD grafu NEPŘIDÁVEJ AggregateRating/Review,
     dokud nejsou reálné recenze (viz omezení výše) — ale připrav strukturu
     v komentáři/TODO, kam se to doplní, až klient dodá první recenze
     (typicky poté, co založí Google Business Profile — viz manuální
     checklist níže).
   - Zkontroluj/doplň BreadcrumbList JSON-LD i na stránkách, které ho
     ještě nemají (sluzby/* podstránky, blog/[slug]).
   - Přidej `sameAs` placeholder komentář do Organization JSON-LD
     (app/layout.tsx) pro budoucí Google Business Profile / Maps URL,
     ať se na to nezapomene, až profil vznikne.

4) INTERNÍ PROLINKOVÁNÍ A CROSS-LINKY
   - Zkontroluj components/pillar/RelatedIndustries.tsx a relatedSlugs
     prop na všech web-pro-* stránkách — dopiš chybějící/logičtější
     propojení mezi příbuznými obory (dnes u některých chybí nebo jsou
     nahodilá).
   - Přidej odkazy z /sluzby/seo-optimalizace/lokalni-seo na relevantní
     web-pro-* stránky a naopak, kde dává smysl.

5) TECHNICKÝ AUDIT (rychlá kontrola, oprav co najdeš)
   - Projdi všechny app/*/page.tsx a over, že každá má vyplněné unique
     title + description v generateMetadata/metadata (ne kopie).
   - Zkontroluj alt texty u obrázků v public/portfolio a v komponentách
     — musí popisovat obsah obrázku, ne být prázdné nebo generické.
   - Ověř, že opengraph-image.tsx existuje a generuje smysluplný obrázek
     pro každou routu (už je založené pro většinu — jen spot-check).
   - Spusť `npm run build` a zkontroluj, že žádná stránka nekončí jako
     dynamic/error tam, kde má být statická (SSG) — ovlivňuje to crawl
     rychlost.

6) AKTUALIZOVAT SITEMAP DATA
   - V app/sitemap.ts nastav lastModified na dnešní datum u všech
     stránek, které v této session skutečně změníš (ne plošně u všech —
     jen u těch, kde se obsah reálně mění), podle existující konvence
     v komentáři souboru.

NA KONCI SESSION MI VYPIŠ
A) Shrnutí co bylo změněno (soubory + krátký popis).
B) Manuální checklist mimo kód, přesně a akčně, v tomto pořadí:
   1. Google Search Console — ověřit vlastnictví (soubor
      google54d31ac582d87a3f.html už je nahraný), odeslat sitemap.xml,
      přes URL Inspection ručně požádat o indexaci homepage, /sluzby,
      /ukazky-webu, /cena-tvorby-webu a nově přidaných blog článků.
   2. Google Business Profile — založit, vyplnit kategorii "Tvorba
      webových stránek" / "Grafické studio", adresu/oblast působení,
      telefon +420604837333, web vizeon.cz, nahrát fotky, propojit s
      profilem na Facebooku/Instagramu. Po prvních zakázkách požádat
      klienty o recenzi.
   3. Registrace do českých katalogů: Firmy.cz, Zlaté stránky,
      Kompas.cz — vyplnit stejné NAP údaje (Name/Address/Phone) jako
      v Google Business Profile kvůli konzistenci.
   4. Jakmile bude Google Business Profile s recenzemi, vrátit se k
      bodu 3 výše (AggregateRating v JSON-LD) a doplnit real data.
   5. Sdílet nové blog články a stránky na FB/IG VIZEON profilech —
      první externí signály a možný zdroj prvních backlinků.
