# Technické SEO: vizeon.cz

Datum auditu: 2026-11-21. Zdroj: produkční crawl (66 URL, 63 indexovatelných), `site-meta.json` (robots, sitemap, 404, redirect testy, hlavičky), bodové kontroly přes curl a revize zdrojáku (`next.config.mjs`, `vercel.json`, `middleware.ts`, `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`). Produkce je pravda, kód slouží jen k lokalizaci oprav.

## Skóre: 86 / 100

| Kategorie | Stav |
|---|---|
| Crawlability | Pass (robots.txt a sitemap v pořádku; 2 osiřelé stránky) |
| Indexability | Pass (kanonikály, noindex, duplicity v pořádku; drobnosti na 404/admin) |
| Security | Pass s výhradou (silné hlavičky, CSP má unsafe-inline/unsafe-eval) |
| URL struktura a redirecty | Pass (1 dvouhopová varianta) |
| Mobile | Pass (viewport, theme-color; chybí manifest) |
| JS rendering | Pass (obsah je v raw HTML, SSR/SSG) |
| Hreflang | N/A (jednojazyčný web, cs) |

## Co funguje

- Všech 63 indexovatelných URL vrací 200 bez řetězců, každá má vlastní self-canonical (bez lomítka, shodný tvar se sitemapou), `index, follow`, `lang="cs"`, žádné X-Robots-Tag.
- Sitemap obsahuje přesně 63 `<loc>`, což odpovídá počtu indexovatelných stránek; `/o-mne`, `/gdpr`, `/podminky` jsou správně mimo sitemapu a mají noindex. Žádný 4xx/5xx ani přesměrovaná URL v sitemapě, žádný odkaz na neexistující interní cíl.
- Kanonizace hostů a protokolu: `http://vizeon.cz` → 308 → https apex, `https://www` → 308 → apex, `/sluzby/` → 308 → `/sluzby`, `/index.html` → 308 → `/`. `/?utm_source=x` a `/?foo=bar` vrací 200, ale canonical zůstává `https://vizeon.cz` (ověřeno), takže parametry se konsolidují.
- Žádné duplicitní title ani meta description mezi 63 stránkami, jeden H1 na stránku, žádné chyby JSON-LD.
- Bezpečnostní hlavičky: HSTS 2 roky s preload, X-Frame-Options DENY + `frame-ancestors 'none'`, nosniff, Referrer-Policy, Permissions-Policy, CSP s `object-src 'none'`, `base-uri 'self'`, `upgrade-insecure-requests`. `X-Powered-By` vypnuto.
- 404 vrací skutečný status 404 (ne soft 404), včetně neexistujících cest typu `/llms.txt`.
- Obsah je v raw HTML (homepage 1402 slov, podstránky 270 až 1180 slov, prerender `X-Nextjs-Prerender: 1`), tedy žádná závislost na klientském renderu pro indexaci.
- Staré URL mají trvalé redirecty (`/cenik`, `/reference`, `/sluzby/tvorba-webu`, `/sluzby/systemy`) v `next.config.mjs`.

## Nálezy

### [High] Dvě stránky jsou osiřelé (nulové interní odkazy z jiných stránek)

- Evidence: po vyloučení self-linků nemá `https://vizeon.cz/sluzby/ai-chatbot` ani `https://vizeon.cz/zakaziq/rezervacni-system` žádný příchozí odkaz z žádné z 66 crawlovaných stránek. Existují jen v sitemapě. (Údaj `inlinks_count = 1` v crawlu je jejich vlastní odkaz na sebe.) Další slabé stránky, vždy jen 1 příchozí odkaz z jedné stránky: `/sluzby/tvorba-webu-pro-firmy` (jen z `/sluzby/tvorba-webovych-stranek`, anchor „Firmy“), `/sluzby/graficke-designy` a `/sluzby/technicke-sluzby` (jen z `/sluzby`, a to přes generické anchory „Detail služby …“).
- Dopad: Google je najde jen přes sitemapu, nedostanou téměř žádnou váhu a kontext z anchor textů. Obě osiřelé jsou komerční stránky (AI chatbot, rezervační systém).
- Fix:
  1. Odkaz na `/sluzby/ai-chatbot` přidat z `/automatizace`, `/automatizace/chatboti-rag`, `/sluzby` a do patičky nebo megamenu mezi služby.
  2. Odkaz na `/zakaziq/rezervacni-system` přidat z `/zakaziq`, `/sluzby/systemy-na-miru`, `/web-pro-kadernictvi`, `/web-pro-masery-a-wellness` a `/web-pro-kosmeticky` (obory, kde rezervace dává smysl).
  3. `/sluzby/tvorba-webu-pro-firmy` odkázat z `/sluzby`, `/cena-tvorby-webu` a z navigace. `/sluzby/graficke-designy` a `/sluzby/technicke-sluzby` odkázat z `/sluzby/tvorba-webovych-stranek`, `/sluzby/sprava-webu` a patičky s popisným anchorem místo „Detail služby“.
  - Soubory: navigace a patička v `components/` (seznam služeb), `app/sluzby/page.tsx`, `app/automatizace/page.tsx`, `app/zakaziq/page.tsx`, `lib/data/*` se seznamy služeb. V kódu se `ai-chatbot` mimo vlastní stránku objevuje jen v `app/sitemap.ts`.

### [Medium] 404, /admin a /admin-setup dědí canonical na homepage a OG metadata homepage

- Evidence: `https://vizeon.cz/neexistujici-stranka-404-test` (404) obsahuje `<link rel="canonical" href="https://vizeon.cz">`, og:title a og:url homepage. Totéž `/admin` a `/admin-setup` (200, noindex, nofollow). Příčina je `alternates: { canonical: "https://vizeon.cz" }` v `app/layout.tsx` řádek 102, které zdědí každá stránka bez vlastního canonical.
- Dopad: dnes neškodné, protože všechny indexovatelné stránky mají vlastní canonical. Je to ale past: každá budoucí stránka, na které se zapomene `alternates.canonical`, se tiše kanonizuje na homepage a vypadne z indexu.
- Fix: z `app/layout.tsx` canonical odstranit (ponechat `metadataBase`) a nastavit ho explicitně v každé indexovatelné stránce (u `blog/[slug]`, `ukazky-webu/[slug]` přes `generateMetadata`). Homepage `app/page.tsx` si canonical nastaví sama.

### [Medium] CSP povoluje 'unsafe-inline' a 'unsafe-eval' ve script-src

- Evidence: hlavička Content-Security-Policy na všech odpovědích, `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com`. Zdroj: `next.config.mjs` řádek 85.
- Dopad: efektivně neruší XSS ochranu skriptů. `unsafe-eval` není v produkčním Next.js potřeba (vyžaduje ho jen dev/HMR). Pro SEO okrajové, ale bezpečnostní audit ho označí.
- Fix: odstranit `'unsafe-eval'` z produkce (podmínit `isDev`, proměnná už v souboru existuje). `'unsafe-inline'` nahradit nonce-based CSP v `middleware.ts`; vyžaduje dynamický rendering, tedy ztrátu statického prerenderu, takže zvážit poměr přínos/výkon. Minimálně `unsafe-eval` pryč.

### [Medium] Tituly nad 60 znaků a popisy nad 160 znaků (riziko zkrácení ve SERP)

- Evidence: 12 titulků má 61 až 74 znaků, např. `/sluzby/tvorba-webovych-stranek` (74), `/sluzby/seo-optimalizace` (73), `/sluzby/seo-optimalizace/technicke-seo` (71), `/automatizace/chatboti-rag` (69), `/blog/google-business-profile-vs-firmy-cz` (69), `/sluzby/seo-optimalizace/audit` (69). 19 meta description má 161 až 285 znaků, nejhorší `/ukazky-webu/likvidace-eternitu-litomerice` (285), `/ukazky-webu/zamecnictvi-mb` (252), `/ukazky-webu/studnarstvi-petran` (249), `/zakaziq` (201), `/tvorba-webu-pro-zivnostniky` (188). Většina detailů v `/ukazky-webu/*` má 200+ znaků.
- Dopad: Google titulek a popis zkrátí nebo přepíše; klíčové slovo na konci titulku může zmizet.
- Fix: titulky do cca 60 znaků (klíčová fráze na začátek, ` | VIZEON` ponechat), popisy 120 až 155. U projektů generovat description z `lib/data/portfolio.ts` s oříznutím. Úprava v `metadata`/`generateMetadata` příslušných `app/**/page.tsx`.

### [Low] http://www.vizeon.cz má dva hopy

- Evidence: `http://www.vizeon.cz/` → 308 → `https://www.vizeon.cz/` → 308 → `https://vizeon.cz/` → 200. Ostatní varianty mají jeden hop.
- Fix: nízká priorita (vzácný vstup). Nastavit v Vercel Domains přesměrování `www.vizeon.cz` na apex přímo u domény; pravidla ve `vercel.json` ponechat jako pojistku.

### [Low] Sitemap: zastaralé lastmod a ignorované priority/changefreq

- Evidence: homepage a `/tvorba-webu-pro-zivnostniky` mají `lastmod 2026-07-09`, přitom homepage byla podle projektové paměti přepracována v 11/2026. `changefreq`/`priority` Google ignoruje. (Detail řeší sitemap specialista.)
- Fix: u změněných stránek aktualizovat `lastModified` v `app/sitemap.ts`; priority/changefreq lze odstranit.

### [Low] Duplicitní meta robots na 404 a noindex stránky linkované sitewide

- Evidence: 404 stránka i `/navrh-hero` (404) mají dva `<meta name="robots">` (`noindex` a `noindex, nofollow`); bez dopadu, Google vezme nejstriktnější. `/o-mne` (noindex, follow) a `/gdpr` + `/podminky` (noindex, nofollow) mají 64 až 67 příchozích odkazů z navigace/patičky.
- Fix: v `app/not-found.tsx` ponechat jednu robots direktivu. Pokud se `/o-mne` má časem indexovat, sundat noindex (commit 023c745) a přidat do `app/sitemap.ts`.

### [Low] Chybí manifest a security.txt, llms.txt neexistuje

- Evidence: `/manifest.webmanifest`, `/.well-known/security.txt`, `/llms.txt`, `/llms-full.txt` vracejí 404 (správný status). Favicon existuje.
- Fix: `app/manifest.ts` (name, icons, theme_color `#080808`); `public/.well-known/security.txt` s kontaktem; `llms.txt` řeší AI-search specialista (volitelné).

### [Low] Access-Control-Allow-Origin: * na prerenderovaných stránkách

- Evidence: všechny statické odpovědi včetně HTML mají `Access-Control-Allow-Origin: *` (výchozí chování Vercelu). Není to SEO problém.
- Fix: volitelně přepsat v `headers()` v `next.config.mjs`, jen po ověření, že ho nic nepotřebuje.

## Ověřeno bez nálezu

- Cache: HTML `public, max-age=0, must-revalidate` s `X-Vercel-Cache: HIT`, Age ~13,8 dne znamená stálý CDN prerender do dalšího deploye (nejde o chybu). Statika `/_next/static` a `/portfolio` má immutable 1 rok.
- Hreflang: žádný a není potřeba (jeden jazyk, `lang="cs"`, `og:locale cs_CZ`).
- robots.txt: `User-agent: *`, `Allow: /`, `Disallow: /api/`, odkaz na sitemapu; neblokuje CSS/JS. `/admin*` jsou noindex přes meta, ne přes robots (správně).
- Redirecty: žádné řetězce u indexovatelných URL, `trailingSlash: false` a `cleanUrls` konzistentní (`vercel.json`).
- Mobile: `<meta name="viewport" content="width=device-width, initial-scale=1">`, `theme-color #080808`; vizuální kontrola je mimo tento audit.
- CSP `connect-src`: n8n chat widget v produkčním HTML ani v `app/` není, takže nic neblokuje; po zapnutí widgetu je nutné přidat jeho doménu do `connect-src`.
- Playwright/`render_page.py` jsem nespouštěl: obsah je v raw HTML (SSR/SSG) a crawl obsahoval plné texty.
