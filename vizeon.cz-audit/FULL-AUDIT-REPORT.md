# SEO audit: vizeon.cz

**Datum:** 21. 11. 2026
**Rozsah:** 67 stránek (63 v sitemapě, 3 noindex, 1 duplicitní homepage), živá produkce a dohledání oprav ve zdrojovém kódu
**Typ webu:** Professional Service, studio pro weby, e-shopy, SEO a automatizace. Působí online po celé ČR a nemá kamennou provozovnu.
**Předchozí audit:** 5. 9. 2026, skóre 66/100 (starší verze souborů je v gitu)

## SEO Health Score: 71/100 (v září 66)

| Kategorie | Skóre | Září | Váha | Vážené |
|---|---|---|---|---|
| Technické SEO | 86 | 76 | 22 % | 18,9 |
| Kvalita obsahu | 66 | 44 | 23 % | 15,2 |
| On-page SEO | 68 | 78 | 20 % | 13,6 |
| Schema / strukturovaná data | 68 | 78 | 10 % | 6,8 |
| Výkon (CWV, laboratoř) | 72 | 60 | 10 % | 7,2 |
| Připravenost na AI vyhledávání | 60 | 57 | 10 % | 6,0 |
| Obrázky | 72 | 78 | 5 % | 3,6 |
| **Celkem** | | | | **71,3** |

Doplňkově, mimo vzorec: SXO (sedí stránky na záměr hledání a persony) 53–62/100.

**Jak číst srovnání se zářím:** Skóre dávali jiní hodnotitelé s jinými daty, takže pokles on-page a schema je hlavně přísnější hodnocení, ne zhoršení webu. Skutečné zlepšení je změřené:
- oborové stránky narostly z ~340 na ~1 000 slov a mají vlastní scénáře;
- FAQ je vidět v HTML, ne jen v JSON-LD;
- LCP homepage kleslo z 5,9 s na 1,5–2,5 s;
- intro se na mobilu nepouští;
- interní prolinkování oborových stránek funguje (18–34 odkazů na každou).

## Co funguje

- Všech 63 URL ze sitemapy vrací 200 a mají vlastní canonical. Nikde nejsou řetězce přesměrování ani duplicitní title nebo description, každá stránka má jeden H1. JSON-LD neobsahuje chyby.
- Obsah se renderuje na serveru a AI crawleři (GPTBot, ClaudeBot, PerplexityBot a další) dostávají stejné HTML jako prohlížeč. Vercel nic neblokuje.
- Bezpečnostní hlavičky jsou silné (HSTS preload, X-Frame-Options DENY, CSP s `frame-ancestors 'none'`) a 404 vrací skutečný stav 404.
- Text obsahuje konkrétní ceny a termíny (4 999 / 9 999 / 14 999 / 29 990 Kč, 10 pracovních dnů, záloha 30/70 %), takže je dobře citovatelný.
- Oborové stránky nejsou kopie s prohozeným slovem. Průměrná podobnost je 0,35 (4gramový Jaccard), nejvyšší dvojice 0,48.
- Na mobilu nikde nevzniká vodorovný posun, CLS je 0 a H1 je v prvním výřezu.

## Top 5 kritických problémů

1. **Značka nemá vnější otisk ani autoritu (Authoritativeness 38–40).** Existuje jen profil na Firmy.cz s 0 recenzemi a Instagram. Chybí Google Business Profile, LinkedIn a recenze. Popis se navíc rozchází: web říká „nejsme agentura“, Firmy.cz „digitální agentura“, blog „startup“.
2. **Oborové stránky jsou z poloviny šablona a mají stejné důkazy.** Unikátní je asi 38 % textu, sdílená šablona 52 %. Deset z 19 stránek ukazuje stejné 1–3 reference (Zámečnictví MB je na 8 z nich) a 3 stránky nemají žádného klienta. Hrozí, že je Google vyhodnotí jako hromadně generovaný obsah.
3. **Cenový záměr se tříští mezi několik stránek.** O „kolik stojí web“ soupeří /cena-tvorby-webu, blog /blog/kolik-stoji-tvorba-webu-2026, /sluzby a asi 25 FAQ. Žádná z nich nedává tržní čísla, která ukazují výsledky vyhledávání, a SEO stránka cenu nemá vůbec.
4. **Entitní graf ve schema je rozbitý.** `Organization` a `ProfessionalService` sdílejí `@id` `#organization` s rozdílnými daty. `provider`, `publisher` a `creator` jsou anonymní kopie bez `@id`. Logo je `favicon.ico` 32×32 px (Google chce aspoň 112 px) a chybí adresa i IČO, i když IČO je v patičce.
5. **Dvě osiřelé stránky a slabé LCP na /ukazky-webu.** Na /sluzby/ai-chatbot a /zakaziq/rezervacni-system neodkazuje žádná jiná stránka. /ukazky-webu má na mobilu LCP 4,5–5,4 s, jako jediná stránka v pásmu „Poor“.

## Top 5 rychlých výher

1. Odkázat osiřelé stránky z /sluzby, případně z /automatizace (15 min, `app/sluzby/page.tsx`).
2. Opravit schema v `app/layout.tsx`: smazat duplicitní uzel `Organization`, dát logo jako PNG 512 px, doplnit `identifier` s IČO a ve všech šablonách nahradit `provider` odkazem `{"@id":"https://vizeon.cz/#organization"}` (1–2 h).
3. Opravit gramatiku v H1 /tvorba-webu-pro-zivnostniky („který“ → „která“), zkrátit 8–12 titlů nad 60 znaků a doplnit portfoliu vlastní `metaDescription` (dnes 200–285 znaků, auf-gehts jen 73).
4. Odstranit `alternates.canonical` z `app/layout.tsx`. Dnes stránka 404, /admin a /admin-setup dědí canonical homepage.
5. Sjednotit čísla a popis: „10+ klientů“ na homepage proti „15+ projektů“ na /o-mne a odpověď „do 24 h“ proti „do 1 h“.

## Technické SEO (86)

Nálezy viz `findings/technical.md`:
- [High] Osiřelé stránky.
- [Medium] Canonical homepage v layoutu.
- [Medium] CSP s `unsafe-inline` a `unsafe-eval`.
- [Medium] Dlouhé title a description.
- [Low] Dva skoky z http://www, chybí manifest a security.txt, duplicitní robots meta na 404 a /navrh-hero.

Sitemap (`findings/sitemap.md`):
- [Medium] Zastaralé `lastmod`: homepage 2026-07-09 proti gitu 11-03 a všech 11 projektů má 09-06.
- [Low] Oborové URL jsou natvrdo a mohou se rozejít s `lib/data/industries.ts`.
- `changefreq` a `priority` Google ignoruje.

## Kvalita obsahu (66) a on-page (68)

E-E-A-T zhruba 58: zkušenost 62, odbornost 58, autorita 40, důvěryhodnost 72. Nálezy viz `findings/content.md`:
- [High] Šablona oborových stránek a sdílené reference.
- [High] Chybí identita autora (blog podepisuje „V VIZEON Vydavatel“, v JSON-LD je jen „Kryštof“).
- [High] Blog má 4 obecné články z 1. a 2. 9. bez čísel, zdrojů a obrázků.
- [High] Kanibalizace cenového dotazu.
- [Medium] /kontakt má 159 slov.
- [Medium] Servisní stránky mají 300–400 slov a chybí jim konkrétní data.
- [Medium] Slabé H1.
- [Medium] Portfolio nemá měřitelné výsledky.

## Schema (68)

Nálezy viz `findings/schema.md` (obsahuje opravené JSON-LD):
- [High] Duplicitní entita, anonymní `provider`, chybějící adresa a IČO, logo favicon.
- [Medium] BlogPosting nemá `image`, `dateModified` ani autora s URL.
- [Medium] Chybí `Person` zakladatele.
- [Medium] `sameAs` obsahuje jen Instagram.
- [Medium] /zakaziq nemá `SoftwareApplication`.

FAQ odpovídá viditelnému textu (176 otázek na 40 stránkách). Ceny v Offer sedí. Nikde nejsou vymyšlené recenze.

## Výkon (72) a obrázky (72)

Laboratorní měření mobilu (Slow 4G, 4× zpomalené CPU; PSI bylo nedostupné kvůli vyčerpané kvótě):

| Stránka | LCP | CLS | TBT | JS |
|---|---|---|---|---|
| / | 1,5–2,5 s | 0 | 257–375 ms | 414 kB |
| /web-pro-remeslniky | 1,5–3,2 s | 0 | 198–361 ms | 400 kB |
| /sluzby | 1,3 s | 0,008 | ~190 ms | 410 kB |
| /ukazky-webu | **4,5–5,4 s** | 0 | ~200 ms | 407 kB |
| blog | 1,3–2,4 s | 0 | ~180 ms | 369 kB |

Polní data z CrUX nejsou k dispozici (PSI neodpovědělo a Search Console není napojená).

Nálezy viz `findings/performance.md`:
- [High] LCP na /ukazky-webu.
- [Medium] TBT na homepage a ~400 kB JS na každé stránce (framer-motion v `app/template.tsx`).
- [Medium] RSC payload tvoří 47 % HTML oborových stránek.
- [Medium] Celostránkové screenshoty `*-desktop-full.jpg` mimo next/image (až 1,68 MB).
- [Low] 35 ze 148 obrázků má prázdný alt, včetně 7 karet portfolia na homepage.

## Připravenost na AI vyhledávání (60)

Nálezy viz `findings/geo.md` (obsahuje návrh llms.txt):
- Přístup crawlerů je bez problémů.
- [Medium] Nekonzistentní popis entity.
- [Medium] Stránka „kdo za tím stojí“ není indexovatelná.
- [Medium] Pasáže nemají ideální délku (žádná v pásmu 134–167 slov) a nikde není `<table>` (ceník je v kartách).
- [Medium] Značka nemá vnější otisk.
- [Low] Chybí llms.txt: levné doplnit, ale Google ho ignoruje.

## SXO

Nálezy viz `findings/sxo.md`:
- „Tvorba webových stránek“: ve výsledcích převládají návody a stavebnice, homepage s nimi nesedí.
- „Web pro řemeslníky/instalatéry“: sedí, jsou to nejlepší stránky webu (69–75/100).
- „SEO optimalizace cena“: výsledky chtějí čísla, stránka nabízí „individuálně“.
- WebSearch není živý český Google, takže pozice nejsou ověřené.

## Vizuál a mobil

Nálezy viz `findings/visual.md`: bez vodorovného posunu, H1 nad ohybem, intro opravené. [Low] Malé dotykové cíle a 24 textů menších než 12 px. Telefon není v HTML (vědomé rozhodnutí, viz trade-off v souboru).

## Respektovaná rozhodnutí vlastníka

Audit nedoporučuje měnit tato rozhodnutí. Uvádí jen jejich SEO cenu:
- web mluví v „my“;
- reference bez fotek a hvězdiček;
- telefon není na webu;
- /o-mne je noindex;
- na webu je jen křestní jméno „Kryštof“.

Pro E-E-A-T stačí doplnit autora (křestní jméno, krátké bio) na indexovatelné místo, třeba do patičky článků nebo na /kontakt, a `Person` do schema.

## Co audit nepokryl

- **Zpětné odkazy:** chybí API (Moz/Bing) i lokální runtime pro Common Crawl. `findings/backlinks.md` je ještě ze září.
- **Shlukování témat:** tento běh ho vynechal. `findings/cluster.md` je ze září.
- **Search Console, CrUX, GA4:** nejsou napojené, takže chybí data o skutečné indexaci, kliknutích a polním výkonu.
- **DataForSEO, Maps, lokální SEO:** MCP nepřipojeno. Lokální SEO navíc neplatí, web nemá provozovnu.
- **Screenshoty:** nástroj je neukládá do složky.
