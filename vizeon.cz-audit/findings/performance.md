# Výkon a Core Web Vitals: vizeon.cz

Datum auditu: 2026-11-21

## Stav měření (důležité)

**PageSpeed Insights se nepodařilo získat.** Všech 6 plánovaných běhů (5x mobil, 1x desktop) selhalo, protože bezklíčové PSI API v5 vrací opakovaně `429 Quota exceeded ... Queries per day` (sdílená denní kvóta projektu bez API klíče; zkoušeno 4x, i po čekání). Uložená odpověď `.../scratchpad/psi/home_m.json` obsahuje jen chybu. Lokální Lighthouse přes `npx` byl zablokován oprávněním a nebyl obcházen. Skript `claude-seo` hlásí nenastavený runtime.

Důsledek:
- **Žádná nová labová čísla (LCP, CLS, TBT, FCP, SI) ani LCP element z PSI nejsou.** Nic neodhaduji.
- **CrUX polní data (`loadingExperience`, `originLoadingExperience`) nejsou k dispozici**: PSI neodpovědělo, takže není známo, zda origin má dost provozu. Předchozí verze auditu uváděla, že CrUX/PSI nebyly nakonfigurované.
- Skóre níže je **kvalitativní, ze statické analýzy** (crawl, hlavičky, zdroják), ne naměřené.

Starší labová data (Lighthouse 13.4.1, mobil, předchozí verze tohoto auditu, před pozdějšími úpravami hero, dynamic importů a GA): homepage 59/100 (LCP 5,9 s, TBT 370 ms, CLS ~0), /web-pro-elektrikare 86 (LCP 3,5 s), blog 80 (LCP 4,0 s). Od té doby se v kódu změnilo hero (CSS `.hero-in`, `template.tsx` bez počáteční průhlednosti, GA `lazyOnload`, `next/dynamic`), takže jde jen o orientační údaje; nutné přeměřit.

## Skóre (nenaměřené, kvalitativní)

| Oblast | Skóre | Poznámka |
|---|---|---|
| Performance (CWV) | **70/100** (odhad ze statiky, ne měření) | Ověřit PSI s API klíčem nebo lokálním Lighthouse |
| Obrázky | **72/100** | Crawl: 148 `<img>`, 76 % s alt, 81 % přes next/image (AVIF/WebP), ale 17 MB zdrojů a nekomprimované `-full.jpg` |

## Metriky podle URL

| URL | Lab (PSI) | Field (CrUX) | HTML kB raw / brotli | TTFB (curl) |
|---|---|---|---|---|
| / (mobil) | selhalo (429) | neznámé | 198,9 / 28,4 | 0,27 s |
| /web-pro-remeslniky (mobil) | selhalo (429) | neznámé | 249,2 / 32,6 | 0,26 s |
| /sluzby (mobil) | selhalo (429) | neznámé | 125,0 / 17,8 | 0,23 s |
| /ukazky-webu (mobil) | selhalo (429) | neznámé | 140,6 / 16,3 | 0,28 s |
| /blog/kolik-stoji-tvorba-webu-2026 (mobil) | selhalo (429) | neznámé | 74,4 / 15,5 | 0,25 s |
| / (desktop) | selhalo (429) | neznámé | | |

TTFB je jedno měření z mé lokality, `x-vercel-cache: HIT`, region fra1. Crawl `ms`: většina 200 až 450 ms; outliery /blog/kolik-stoji-tvorba-webu-2026 1010 ms, /web-pro-kosmeticky 1318 ms, /sluzby/seo-optimalizace/lokalni-seo 603 ms (pravděpodobně studený start, ověřit opakováním).

## Laboratorní měření (doplněno po selhání PSI)

PageSpeed Insights vracelo `429 Quota exceeded`, proto jsem výkon změřil lokálně. Použil jsem headless Chrome (Playwright) s profilem podobným mobilnímu Lighthouse: Slow 4G (150 ms RTT, 1,6 Mb/s), 4× zpomalené CPU, 412×823 a studenou cache, 2 běhy na URL. Lighthouse počítá jinak (simulované škrcení), takže čísla ber jako orientační. INP v laboratoři změřit nejde.

| URL (mobil) | FCP | LCP | CLS | TBT | Přeneseno / z toho JS | LCP prvek |
|---|---|---|---|---|---|---|
| / | 1,5–2,5 s | 1,5–2,5 s | 0 | 257–375 ms | 759 / 414 kB | podtitulek hero (`components/Hero.tsx`) |
| /web-pro-remeslniky | 1,5–3,2 s | 1,5–3,2 s | 0 | 198–361 ms | 720 / 400 kB | úvodní odstavec |
| /sluzby | 1,3 s | 1,3 s | 0,008 | 180–195 ms | 762 / 410 kB | úvodní odstavec |
| /ukazky-webu | 1,4–1,7 s | **4,5–5,4 s** | 0 | 191–206 ms | 752 / 407 kB | screenshot projektu přes `/_next/image` (`/portfolio/s…`) |
| /blog/kolik-stoji-tvorba-webu-2026 | 1,3–2,4 s | 1,3–2,4 s | 0 | 173–188 ms | 647 / 369 kB | úvodní odstavec |

Výkyvy mezi běhy (FCP 1,5 vs. 2,5 s) dělá TTFB, které občas skočí na 1,0–1,4 s (studený start funkce nebo cache miss na edge). Raw data: `scratchpad/lab.jsonl` (mimo repo).

**Shrnutí:** Oproti září (LCP 5,9 s) je homepage výrazně lepší, LCP je teď text. Jedinou stránkou s LCP v pásmu „Poor“ je /ukazky-webu. TBT je na homepage a oborových stránkách hraniční (cíl je pod 200 ms) a na každé stránce se stahuje kolem 400 kB JS.

## Nálezy

### 1. [Low, sníženo z High] HTML s `Cache-Control: public, max-age=0, must-revalidate` na všech 66 stránkách
Pozn. hlavního auditu: stránky jsou předrenderované (`x-nextjs-prerender: 1`) a Vercel je servíruje z edge cache (`x-vercel-cache: HIT`). `max-age=0` platí jen pro cache prohlížeče, což je u HTML běžné a správné. Opravdový problém jsou občasné studené odpovědi s TTFB 1–1,4 s (viz tabulka), ne tahle hlavička.
Evidence: crawl, všechny stránky; TTFB 230 až 420 ms i při HIT (cíl pod 200 ms).
Fix: ověřit ISR/`revalidate` a `s-maxage` + `stale-while-revalidate`; hlavičky přes `headers()` v `next.config.mjs` (u statických stránek na Vercelu ověřit po nasazení).

### 2. [High] /ukazky-webu: LCP 4,5–5,4 s (Poor), na ostatních stránkách 1,3–3,2 s
Doplněno měřením: LCP prvek je screenshot projektu přes `/_next/image`. První projekt má `priority` (`components/Portfolio.tsx:112`), přesto se LCP ukáže pozdě. Ověř, jestli je LCP prvek opravdu ten s `priority`, a zmenši `sizes`/kvalitu desktopového screenu v `components/portfolio/ProjectStage.tsx:66`.

### 2b. [Medium] TBT na homepage 257–375 ms, rizika v hero
Evidence: dřívější LCP 5,9 s, TBT 370 ms; LCP element je text (H1/H2 v `components/Hero.tsx`), hero na CSS `.hero-in` (`app/globals.css`). Po hydrataci běží canvas s 35 až 70 částicemi v `requestAnimationFrame` a dva nekonečné framer-motion orby; na desktopu `components/IntroAnimation.tsx`.
Fix: přeměřit; při TBT nad 200 ms spouštět canvas v `requestIdleCallback` a orby převést na CSS `@keyframes` (`components/Hero.tsx`).

### 3. [Medium] Velká sdílená JS vrstva (13 až 17 async skriptů na každé stránce)
Evidence: crawl `scripts`: 13 až 15 chunků všude, 17 na homepage; dřívější audit uváděl chunk 497 kB (320 kB nevyužito). framer-motion je v klientském `app/template.tsx` (každá stránka) i v `Hero.tsx`.
Fix: v `app/template.tsx` nahradit `motion.div` CSS přechodem, jinde `LazyMotion` + `m`; změřit `@next/bundle-analyzer`.

### 4. [Medium] Inline RSC payload tvoří téměř polovinu HTML u /web-pro-* (~220 až 250 kB raw)
Evidence: v `/web-pro-remeslniky` 37 inline `self.__next_f.push` skriptů = 119 kB z 253 kB (47 %); viditelné HTML bez skriptů a SVG 78 kB (43 kB z toho třídy Tailwindu); 116 inline SVG ikon (lucide) = 49 kB. Není to duplicitní datový blok: každá sekce je v HTML a zároveň v RSC, protože prochází klientskými wrappery (`$L35/$L36`, pravděpodobně Reveal) přijímajícími celé podstromy jako `children`. Po brotli jen 32,6 kB, dopad je tedy hlavně na parsování a hydrataci, ne na síť. Homepage (199 kB) a /automatizace/* (~200 až 220 kB) mají stejný vzorec; /sluzby/* (~60 kB) wrappery nemají.
Fix: omezit klientské wrappery kolem celých sekcí (reveal přes CSS nebo malý IntersectionObserver na listech), `app/web-pro-*/page.tsx` a komponenta Reveal v `components/`.

### 5. [Medium] Těžké screenshoty `*-desktop-full.jpg` mimo next/image
Evidence: `/web-pro-remeslniky` načítá `/portfolio/screens/zamecnictvi-mb-desktop-full.jpg` 1800x7429, 537 kB, přímý `<img loading="lazy">` s `alt=""`; `public/portfolio/screens` = 17 MB, největší `u-cerhu-desktop-full.jpg` 1,68 MB, `likvidace-eternitu-litomerice-desktop-full.jpg` 1,59 MB. Bez AVIF/WebP.
Fix: převést na AVIF/WebP (cca -60 %) nebo `next/image` s `sizes` (`app/ukazky-webu/[slug]/page.tsx`, stránky `/web-pro-*`).

### 6. [Low] Rozměry a priorita obrázků
Evidence: width/height v HTML má 28 ze 148 `<img>` (jen přímé `-full.jpg`); 120 `next/image` používá `fill` (rozměry z kontejneru, dřívější lab CLS ~0). Žádný obrázek nemá `fetchpriority`; hero obrázky na /web-pro-*, /ukazky-webu, /o-mne mají `<link rel=preload as=image>` a nejsou lazy (správně). Homepage nemá žádný LCP obrázek.
Fix: ověřit `fetchpriority="high"` u prvního hero obrázku (`priority` v `next/image`).

### 7. [Low] Prázdný alt u 35 ze 148 obrázků (24 %)
Evidence: homepage všech 7 karet portfolia (`/portfolio/*.jpg`, lazy) s `alt=""`, dále `-full.jpg`. Prázdný alt je legitimní jen u dekorace.
Fix: smysluplný alt (`components/ReferencesSection.tsx`, `components/Portfolio.tsx`), pokud karty nesou obsah.

### 8. [Low] Třetí strany a fonty jsou ošetřené
Evidence: GA přes `next/script` `lazyOnload` (`app/layout.tsx`); `components/N8nChatWidget.tsx` v této větvi neexistuje (zmínka jen v komentáři v `layout.tsx`), chat widget v crawlu nepozorován jako skript; 4 preloadované woff2 s `display: swap` (Cormorant 300/400, Inter variabilní).
Fix: ponechat, ověřit INP v poli po sběru dat.

## Doporučené kroky
1. Přeměřit PSI/Lighthouse s API klíčem (nebo lokálně): LCP element, TBT, CrUX.
2. Nálezy 3 a 2 (JS, hero animace): největší očekávaný dopad na mobilní TBT/LCP.
3. Cache-Control a TTFB (nález 1).
4. Obrázky `-full.jpg` a alt (nálezy 5, 7).
