# Akční plán: vizeon.cz (audit 21. 11. 2026)

Priority: **Critical** blokuje indexaci (žádný takový nález není), **High** do týdne, **Medium** do měsíce, **Low** backlog.

## Převedeno na aktuální main (23. 11. 2026, necommitnuto)

Větev je přenesená z verze ze 7. 11. na `main` ed0f14a (blog v MDX, formulář, ZakazIQ). Článek o cenách je přepsaný v `content/blog/kolik-stoji-tvorba-webu-2026.mdx` (blog:check bez chyb), GA se načítá přes `loadGa()` v `lib/analytics.ts` vedle Clarity po souhlasu, `components/automation/Reveal` používá CSS reveal. Ověřeno buildem: 63 stránek bez chyb v titulcích, popisech, H1, canonical, OG a schema; LCP 1,2–1,7 s, TBT 46–142 ms, CLS ≤ 0,008.

## Stav druhého kola: cíl 90 ve všech oblastech (22. 11. 2026, necommitnuto)

Hotovo v kódu a ověřeno lokálním buildem (64 stránek: každá má jedno H1, titulek do 60 znaků, popis 110–160 znaků, JSON-LD bez chyby):
- **Schema:** `Person` `#founder` (jen „Kryštof“, `url` na /kontakt#s-kym-mluvite), u firmy `founder`, `knowsAbout`, `slogan`. BlogPosting má `@id`, `mainEntityOfPage`, `image` (vlastní OG obrázek článku), `dateModified`, autora přes `@id`. Nově `ContactPage`, `Blog`, `CollectionPage` s `ItemList` a `SoftwareApplication` pro ZakazIQ, u správy webu `unitCode: MON`.
- **Autor (13):** byline článku s avatarem a odkazem na blok „S kým mluvíte“ na /kontakt (zároveň 16: IČO, doba odpovědi, odkaz na reference).
- **GEO a cenový záměr (11):** definiční věta „VIZEON je české studio…“ v patičce každé stránky, přímá odpověď a skutečná `<table>` variant na /cena-tvorby-webu i v článku o cenách, viditelné datum platnosti ceníku. Článek o cenách přepsaný (pryč Online Vizitka, Web Care a „startup VIZEON“).
- **On-page:** H1 s hledanou frází na /blog, /sluzby/tvorba-webovych-stranek (motto zůstalo stejně velké), grafice a systémech. Podtitulek v hero je `<p>` místo `<h2>` (text beze změny). Zkrácených 12 popisů a titulek článku o GBP.
- **Výkon a obrázky:** celostránkové screenshoty jsou WebP (o 30–35 % menší) a stahují se až při záměru nebo v klidu po načtení. Lokální měření (Slow 4G, 4× CPU): LCP 1,2–1,5 s na všech měřených stránkách, TBT 167–242 ms, CLS 0–0,06 na šířkách 360–430 px. Úvod ceníku a řádek s daty v článku jsou upravené tak, aby se po načtení písma Inter nepřezalamovaly (předtím CLS 0,17 a 0,10).
- **Technické:** CSP bez `unsafe-eval` v produkci, jeden meta robots tag na 404.
- **TBT (22. 11.):** Google Analytics se načítá jen po „Přijmout“ v cookie liště (dřív vždy, i po „Odmítnout“, v rozporu s /gdpr bod 9) a až v klidu po načtení. Vlastní analytika zapisuje přes REST místo supabase-js (−59 kB gzip na každé veřejné stránce). Světla v hero, cookie lišta, přechod stránek, pruh čísel a patička jsou v CSS místo framer-motion, patička je serverová komponenta, částicový canvas startuje až po načtení. Lokálně (Slow 4G, 4× CPU) TBT homepage z 217–507 ms na medián ~110 ms, oborová stránka a ceník ~55 ms, JS homepage 402 → 336 kB.

Měření lokálního buildu 22. 11. 2026 (63 stránek ze sitemapy): titulky a popisy v limitu, canonical, jedno H1, OG obrázek a schema bez chyb na všech (OG doplněn i pro /spoluprace), žádná osiřelá stránka, 4 prázdné alt ze 124 (dekorativní avatar). Výkon na 7 klíčových stránkách: LCP 1,15–1,57 s, TBT 50–99 ms, CLS ≤ 0,008. Skóre podle stejných vah: technické 94, on-page 89, schema 90, výkon 94, obrázky 90, obsah 72, GEO 66, celkem 85 (z 71).

Odhad skóre po nasazení (vlastní odhad podle stejných kritérií, ne nový audit): technické ~92, on-page ~85, schema ~89, výkon ~93, obrázky ~88, kvalita obsahu ~70, GEO ~67, celkem ~83 (z 71). Pozor: GA teď počítá jen návštěvníky se souhlasem, čísla v GA proto klesnou; vlastní analytika v Supabase běží dál pro všechny.

Co brání 90 a nejde udělat v kódu:
- **Autorita značky (GEO 38):** Google Business Profile, stránka na LinkedIn, doplněný Firmy.cz se stejným popisem („studio“, ne „agentura“) a první recenze. Pak doplnit `sameAs`.
- **Video (GEO 35):** 1–2 krátká videa na YouTube (ukázka webu, kolik stojí web).
- **Obsah (66):** skutečná data od klientů. Výsledek u projektů (poptávky, rychlost, datum spuštění), reference z oboru pro oborové stránky a články s vlastními čísly.
- **Rozhodnutí majitele:** adresa na Firmy.cz vs. web, ceny SEO služeb „od“ místo „individuálně“.
- **Kód, další krok (volitelný):** sekce pod ohybem homepage (hodnoty, postup, FAQ, kontakt) jsou stále klientské s framer-motion; jejich převod na serverové komponenty s CSS by ubral zbytek hydratace (~120 ms dlouhé úlohy).

## Stav fáze 1 (21. 11. 2026, necommitnuto)

Hotovo a ověřeno lokálním buildem:
- **1:** odkazy na /sluzby/ai-chatbot, /zakaziq/rezervacni-system a /sluzby/tvorba-webu-pro-firmy (čipy na /sluzby a odstavec na /zakaziq).
- **2 a 3:** jeden uzel `#organization` s logem PNG 512 px (`app/logo.png/route.tsx`) a IČO. Všech 20 šablon odkazuje přes `ORG_REF` (`lib/schema.ts`).
- **4:** LCP /ukazky-webu se lokálně při mobilním škrcení zlepšilo ze 4,5–5,4 s na 1,3–1,4 s. První projekt už nečeká na hydrataci.
- **5:** canonical odstraněný z layoutu.
- **7:** 11 titlů zkrácených na 60 znaků nebo méně, `metaDescription` u 10 projektů.
- **8:** sitemapa s daty změn z gitu a oborovými URL z `INDUSTRIES`, bez `changefreq` a `priority` (63 URL, stejná sada jako produkce).
- **9:** alt u náhledů referencí.
- **10:** `llms.txt`, `security.txt` a `manifest.webmanifest`.

Nezměněno záměrně:
- **6:** H1 „Tvorba webu pro živnostníky, který…“ je správně, „který“ se vztahuje k „webu“. H1 „Nekupujete si web. Kupujete si výsledky.“ je copy rozhodnutí, ne technická oprava.
- **Prázdné alt u celostránkových screenshotů v ScrollScreen:** jsou to dekorativní duplikáty obrázku, který alt má.
- **„Odpověď do 24 hodin“ (správa webu, záruky):** je to lhůta podpory, ne první reakce na poptávku („do hodiny“), proto zůstává.

## Fáze 1: rychlé opravy v kódu (týden 1)

| # | Priorita | Úkol | Kde | Odhad |
|---|---|---|---|---|
| 1 | High | Odkázat /sluzby/ai-chatbot a /zakaziq/rezervacni-system, posílit /sluzby/tvorba-webu-pro-firmy, /graficke-designy a /technicke-sluzby | `app/sluzby/page.tsx`, `app/automatizace/page.tsx`, `app/zakaziq/page.tsx` | 30 min |
| 2 | High | Schema: jeden uzel `#organization` (smazat duplicitní `Organization`), logo jako PNG 512 px přes `ImageObject`, `identifier` s IČO, `address` (jen město, pokud je veřejné) | `app/layout.tsx` | 1 h |
| 3 | High | `provider`, `publisher` a `creator` nahradit odkazem `{"@id":"https://vizeon.cz/#organization"}` | IndustryLanding, `app/sluzby/*`, `app/automatizace/*`, `app/blog/[slug]`, `app/ukazky-webu/[slug]`, `app/cena-tvorby-webu` | 1 h |
| 4 | High | /ukazky-webu: ověřit LCP prvek a zmenšit `sizes`/kvalitu screenu prvního projektu, cíl LCP pod 2,5 s | `components/portfolio/ProjectStage.tsx:66`, `components/Portfolio.tsx:112` | 1 h |
| 5 | Medium | Odstranit `alternates.canonical` z layoutu (404 a /admin dědí canonical homepage) | `app/layout.tsx:102` | 10 min |
| 6 | Medium | H1 /tvorba-webu-pro-zivnostniky „který“ → „která“, H1 /sluzby/tvorba-webovych-stranek s klíčovou frází | příslušné `page.tsx` | 15 min |
| 7 | Medium | Titly zkrátit na 50–60 znaků (8–12 stránek), portfoliu dát vlastní `metaDescription` (120–155 znaků) | `metadata` stránek, `lib/data/portfolio.ts` | 1 h |
| 8 | Medium | Sitemap: `lastmod` brát z dat (datum projektu, článku, oboru), oborové URL generovat z `lib/data/industries.ts`, odstranit `changefreq` a `priority` | `app/sitemap.ts` | 45 min |
| 9 | Low | Alt u 7 karet portfolia na homepage a dalších 28 obrázků | `components/ReferencesSection.tsx` | 20 min |
| 10 | Low | `app/manifest.ts`, `public/.well-known/security.txt`, `public/llms.txt` (návrh v `findings/geo.md`) | `app/`, `public/` | 30 min |

## Fáze 2: obsah a konzistence (týdny 2–3)

| # | Priorita | Úkol | Kde |
|---|---|---|---|
| 11 | High | Cenový záměr: /cena-tvorby-webu je jediná kanonická odpověď na „kolik stojí web“ (tabulka balíčků, roční celkový náklad, srovnání se stavebnicí a agenturou). Blog přepsat na tržní přehled s odkazem na ceník. Ve FAQ místo opakování odkázat. | `app/cena-tvorby-webu`, `lib/data/blog*` |
| 12 | High | Oborové stránky: každé dát vlastní důkaz (reference z oboru, nebo aspoň ukázku s oborovými čísly). Sdílené bloky zkrátit, přidat oborový checklist a ceník. Stránky bez důkazu zvážit dočasně na noindex. | `lib/data/industry-pages/*.ts` |
| 13 | High | Autor: „Kryštof“ (jen křestní jméno, jak web používá od 4. 11.) s krátkým bio na indexovatelném místě (patička článku, /kontakt), `Person` `#founder` ve schema bez příjmení, `author.url` a `dateModified` v BlogPosting. /o-mne může zůstat noindex. | `app/blog/[slug]/page.tsx`, `lib/data/blog*`, `app/layout.tsx` |
| 14 | Medium | Sjednotit čísla a popis: počet klientů/projektů, doba odpovědi, „studio“ vs. „agentura“ vs. „startup“. Dokončit přechod podstránek na „my“ podle plánu redesignu. | celý web, Firmy.cz |
| 15 | Medium | /sluzby/seo-optimalizace a podstránky: ceny „od“ místo „individuálně“, ukázka výstupu, číselný příklad | `app/sluzby/seo-optimalizace/*` |
| 16 | Medium | /kontakt: blok „s kým mluvíte“, IČO, reference | `app/kontakt` |
| 17 | Medium | Portfolio: u projektů výsledek (čísla, pokud je klient dovolí) a datum spuštění | `lib/data/portfolio.ts` |

## Fáze 3: autorita a obsah (měsíc 2)

| # | Priorita | Úkol |
|---|---|---|
| 18 | High | Založit Google Business Profile (jako firma působící v oblasti, bez veřejné adresy), doplnit Firmy.cz a LinkedIn, sjednotit popis. Získávat recenze od klientů na GBP a Firmy.cz. Na webu je hvězdičkami nezobrazovat. Pak doplnit `sameAs`. |
| 19 | Medium | Blog: 1–2 články měsíčně s vlastními daty (skutečné ceny projektů, screenshoty, zdroje), cílené na dotazy, které ověříš v Collabimu |
| 20 | Medium | Výkon: framer-motion v `app/template.tsx` nahradit CSS přechodem, orby v hero převést na CSS, omezit klientské obaly kolem celých sekcí (RSC payload), `*-desktop-full.jpg` převést do AVIF/WebP |
| 21 | Medium | CSP bez `unsafe-eval` v produkci, zvážit nonce (`next.config.mjs`, `middleware.ts`) |

## Fáze 4: měření (průběžně)

| # | Úkol |
|---|---|
| 22 | Napojit Google Search Console a zjistit skutečné dotazy, pozice, indexaci a CTR. Bez toho jsou SXO a kanibalizace jen odhad. |
| 23 | Přeměřit PageSpeed Insights s API klíčem nebo Lighthouse, polní data CrUX sledovat, až bude dost provozu |
| 24 | Další audit po fázi 2, ideálně s `/seo setup` (PDF report, zpětné odkazy z Common Crawl) |
