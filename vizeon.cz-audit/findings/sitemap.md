# Audit sitemapy: vizeon.cz

Zdroj: živá `https://vizeon.cz/sitemap.xml` (HTTP 200, 9,7 KB, 63 URL, 63 unikátních), crawl `pages.json` (67 stránek), `app/sitemap.ts`, git log. Datum auditu 2026-11-21.

## Co funguje

- XML je validní, správný namespace sitemaps.org, 63 URL << limit 50 000 / 50 MB. Sitemap index není potřeba.
- Všech 63 URL vrací 200, bez redirectů, `meta_robots: index, follow`, canonical = self (žádný mismatch).
- Žádný duplicitní `<loc>`, vše na jednom hostu (`https://vizeon.cz`, https, bez www).
- Noindex stránky `/o-mne`, `/gdpr`, `/podminky` (crawl: `noindex`) správně v sitemapě nejsou. `/admin*`, `/api/*` také ne. Komentář v kódu (`app/sitemap.ts:300-302`) to dokumentuje.
- `robots.txt` obsahuje `Sitemap: https://vizeon.cz/sitemap.xml` (generuje `app/robots.ts:12`), robots nic z uvedených URL neblokuje (`Disallow: /api/` jen).
- Pokrytí: každá crawlnutá indexovatelná stránka je v sitemapě (rozdíl crawl minus sitemap = jen 3 noindex stránky). Žádné "extra" 404/redirect URL v sitemapě.
- Formát lastmod je validní W3C datum (YYYY-MM-DD), lastmod není `new Date()` (komentář `app/sitemap.ts:6-7`), tedy nemění se při každém requestu.
- Programmatická sada `web-pro-*`: 19 stránek (4 v hubu s prio 0.8 + 15 s prio 0.6), všechny v sitemapě, všechny crawlnuté jako 200/index/self-canonical. Každá má 21-34 interních odkazů (cross-linking z `lib/data/industries.ts`), takže žádná není osiřelá. 19 unikátních title i meta description, 979-1178 slov na stránku, 27 JSON-LD uzlů, vlastní obrázky.

## Nálezy

### [Střední] Zastaralý a zavádějící lastmod u klíčových stránek
Ruční lastmod výrazně zaostává za skutečnými změnami (git `log -1 --format=%cs` na soubory stránek):

| URL | lastmod v sitemapě | poslední změna v gitu | řádek |
|---|---|---|---|
| `/` | 2026-07-09 | 2026-11-03 (redesign 11-02) | `app/sitemap.ts:29` |
| `/tvorba-webu-pro-zivnostniky` | 2026-07-09 | 2026-11-02 | `:36` |
| `/cena-tvorby-webu` | 2026-08-27 (`launchDate`) | 2026-11-02 | `:10`, `:65` |
| `/sluzby` | 2026-08-29 | 2026-11-03 | `:71` |
| `/spoluprace` | 2026-08-29 | 2026-11-02 | `:77` |
| `/kontakt` | 2026-08-28 | 2026-11-03 | `:174` |
| `/zakaziq` | 2026-08-28 | 2026-11-03 | `:180` |
| `/blog` | 2026-09-02 | 2026-11-04 | `:192` |
| `/faq` | 2026-08-29 | 2026-08-30 (data `faq.ts` 11-02) | `:199` |
| `/automatizace` + 4 podstránky | 2026-10-01 | 2026-11-02 | `:161`, `:168` |
| `/sluzby/tvorba-webovych-stranek`, `/tvorba-webu-pro-firmy`, `/seo-optimalizace`, `/technicke-sluzby` | 2026-08-30 | 2026-11-02 | `:83,95,101,149` |
| `/sluzby/tvorba-e-shopu` | 2026-11-02 | 2026-11-03 | `:89` |
| `/sluzby/ai-chatbot` | 2026-08-29 | 2026-10-02 | `:131` |
| `/sluzby/graficke-designy` | 2026-08-29 | 2026-09-26 | `:143` |
| `/zakaziq/rezervacni-system` | 2026-08-30 | 2026-10-02 | `:186` |

Dopad: homepage s lastmod 4 měsíce starším než redesign nedostane signál k recrawlu; Google si navíc zvyká lastmod ignorovat, pokud je nespolehlivý. Pozn.: část commitů 11-02/11-03 je plošný redesign, takže u některých stránek jde o významnou změnu, u jiných jen o kosmetiku. Přesto je homepage, ceník, služby a kontakt zjevně obsahově změněný.

Fix: aktualizovat data na reálné (homepage, tvorba-webu-pro-zivnostniky, cena, sluzby, spoluprace, kontakt, zakaziq, blog, automatizace ~ 2026-11-02/03/04) a při každé obsahové změně datum posouvat. Dlouhodobě generovat z gitu při buildu (např. skript `git log -1 --format=%cs -- <soubor>` do JSON mapy) nebo držet `lastModified` přímo v datech stránky, aby nešlo zapomenout.

### [Střední] Projekty v /ukazky-webu mají jedno společné lastmod starší než samotné projekty
`app/sitemap.ts:21` dává všem 11 projektům `2026-09-06`. Projekty ale přibyly později: Studnářství Petráň 2026-10-11, Zámečnictví MB / Prvotka 2026-10-09, Likvidace eternitu 2026-11-07 (commit `2200929`). Pro URL `/ukazky-webu/likvidace-eternitu-litomerice` je lastmod datum před existencí stránky, a `/ukazky-webu` (`:206`, 09-06) neodráží přidání projektů (`lib/data/portfolio.ts` 11-07).
Fix: přidat do `lib/data/portfolio.ts` pole `updated`/`date` na projekt a použít `p.updated`; hub `/ukazky-webu` = max z nich.

### [Nízká] Blog: lastmod = datum publikace
`app/sitemap.ts:14` používá `post.date` (2026-09-01/09-02). Šablona `blog/[slug]` a `blog.tsx` se po publikaci upravovaly (11-02, 11-04, redesign), ale obsah článků pravděpodobně ne, takže datum je pravdivé. Při reálné editaci článku přidat `updated` pole a použít `post.updated ?? post.date`. Hub `/blog` (`:192`) má weekly, ale lastmod 09-02 a nové články od té doby nepřibyly: weekly je nepravdivé (viz níže).

### [Nízká] Hromadně shodné lastmod u sady web-pro-*
Všech 19 oborových stránek má `2026-11-02` (`app/sitemap.ts:41-299`). Je to pravdivé (vznikly v jedné dávce redesignu, nejsou thin/duplicitní), takže pro quality gate sitemapy to není vada, ale ztrácí se diferenciace signálu. Neuvádět novější datum, dokud se obsah neupraví. Poznámka: sada 19 stránek je pod hranicí 30 (varování) i 50 (hard stop) pro lokační/programatické stránky, gate je splněn; při dalším růstu nad 30 ověřit min. 60 % unikátního obsahu (aktuálně 979-1178 slov, unikátní title/description).

### [Nízká] Ruční seznam web-pro-* v sitemapě může driftovat od `lib/data/industries.ts`
`app/sitemap.ts:39-299` má 19 oborů zadaných ručně; `lib/data/industries.ts:12-30` je jediný zdroj pravdy pro cross-linking (stejných 19 slugů). Dnes souhlasí 1:1, ale přidání oboru na jednom místě povede k nekonzistenci (stránka bez sitemapy nebo opak).
Fix: v `sitemap.ts` generovat z `industries.ts` (`industries.map(i => ({ url: `${base}/${i.slug}`, ... }))`), jako už se dělá u blogu, projektů a automatizace.

### [Nízká] Slabě prolinkované URL v sitemapě
Crawl `inlinks_count`: `/sluzby/ai-chatbot` 1, `/zakaziq/rezervacni-system` 1, `/sluzby/tvorba-webu-pro-firmy` 2, `/sluzby/graficke-designy` 2, `/sluzby/technicke-sluzby` 2, `/sluzby/seo-optimalizace/audit` 3. Nejsou osiřelé, ale držet je v sitemapě s prio 0.7 při 1 interním odkazu je nesoulad. Doporučení: přidat odkazy z `/sluzby` a z relevantních stránek (interní prolinkování, mimo lane sitemapy).

### [Info] changefreq a priority
Všech 63 URL má `<changefreq>` a `<priority>` (`app/sitemap.ts`, každý blok). Google obojí ignoruje. Navíc jsou nepravdivé: `/blog` weekly (`:193`) bez změn od 09-02, ostatní monthly pro stránky měněné jednou za měsíce. Žádná škoda, ale zbytečných ~6 KB. Fix: odstranit `changeFrequency` a `priority` ze všech položek (Next.js je vynechá).

### [Info] Homepage `<loc>https://vizeon.cz` bez lomítka
`app/sitemap.ts:28` (`url: base`). Pro root path je tvar bez lomítka ekvivalentní s `https://vizeon.cz/` (prohlížeč/crawler stejně posílá `/`), crawl neukázal redirect a canonical homepage je rovněž `https://vizeon.cz`. Konzistentní, bez nálezu. (Crawler označil homepage `in_sitemap: False` jen kvůli porovnání řetězců, není to chyba webu.)

### [Info] Image sitemap
Portfolio má 11 projektů, na detailech 84 obrázků (screenshoty z `/portfolio/screens/*.jpg`, v HTML přes `/_next/image`). Image sitemap (`<image:image>` v `sitemap.ts`) není nutná: Google obrázky objevuje z HTML, mají alt texty. Přínos nízký, volitelné pro Google Images; Next.js `MetadataRoute.Sitemap` podporuje `images: [...]` na položce. Sitemap index také ne (63 URL).

### [Info] Další pozorování mimo sitemapu (pro ostatní lane)
- `/sluzby/` s lomítkem vrací 308 na `/sluzby` (správně, trailing slash sjednocen); sitemapa používá tvar bez lomítka, konzistentní.
- `/o-mne` má `noindex, follow` ale 64 interních odkazů, což je v pořádku; `/gdpr`, `/podminky` `noindex, nofollow`.

## Souhrn priorit

1. Opravit lastmod u homepage, hubů a služeb (stř.).
2. Per-projekt datum v `portfolio.ts` (stř.).
3. Generovat web-pro-* z `industries.ts` (níz.).
4. Odstranit changefreq/priority (info).
