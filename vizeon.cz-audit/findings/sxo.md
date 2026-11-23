# SXO audit vizeon.cz (Search Experience Optimization)

Datum: 21. 11. 2026. Skóre níže je **SXO Gap Score** (shoda stránky s tím, co SERP odměňuje; 100 = ideál), nikoli SEO Health Score. Tento soubor nahrazuje starší verzi (v angličtině, popisovala starší stav webu); ta zůstává v git historii.

## Metodika a limity (číst jako první)

- Stránky: z předaného crawlu (`pages.json` + `.txt`/`.html`, raw HTML; web je statický Next.js, takže raw = to, co vidí Googlebot). Žádné další fetchování webu.
- SERP: 8 dotazů přes nástroj WebSearch: „tvorba webových stránek", „web pro živnostníky", „kolik stojí tvorba webu 2026", „cena tvorby webu", „web pro řemeslníky tvorba webových stránek", „web pro instalatéry", „seo optimalizace cena", „AI agent pro firmu automatizace".
- **Co WebSearch není:** živý český Google. Nevrací pořadí, PAA, AI Overview, reklamy, lokální balíček ani featured snippets, a seznam obsahuje šum (diplomky z theses.cz, slovinské/polské weby). Uvádím jen to, co se v seznamech reálně objevilo; **pozice VIZEON ani konkurentů nejsou ověřené** a „dominantní typ" je odhad z ~15-20 výsledků na dotaz, ne měření.
- **Výsledky jsou citlivé na formulaci dotazu:** starší audit na stejném webu pro „tvorba webových stránek na míru pro firmy" a „web pro truhláře" viděl agenturní service pages (antee.cz, fg.cz, devboys.cz/weby-pro-remeslniky apod.), kdežto holé „tvorba webových stránek" teď vrátilo hlavně návody/DIY. Pro skutečné rozhodnutí je potřeba Search Console (dotazy, které web už dostávají) + ruční kontrola cs-CZ SERP a Seznam.cz.
- Nezkoušeno: „seo optimalizace pro živnostníky" (limit 8 dotazů), Seznam.cz, mobilní SERP, reálný rendering nad ohybem (screenshoty), provoz a CTR.
- Telefon: na webu je skrytý za tlačítkem „Zobrazit telefon" (v HTML není číslo ani `tel:` odkaz; `+420 123 456 789` ve zdroji je jen placeholder formuláře). Funkčnost po kliknutí jsem neověřoval.

## Hlavní zjištění (podle závažnosti)

| # | Závažnost | Zjištění |
|---|---|---|
| 1 | VYSOKÁ | **Cenový záměr je rozdělen mezi 4 stránky** (blog `/blog/kolik-stoji-tvorba-webu-2026`, `/cena-tvorby-webu`, `/sluzby`, `/sluzby/tvorba-webovych-stranek`) a dvě z nich (blog + ceník) cílí na stejný záměr, vzájemně se prolinkují a opakují stejné tři ceny. Riziko kanibalizace; a hlavně ani jedna nenabízí to, co SERP u „kolik stojí / cena webu" ukazuje (tržní přehled s čísly, srovnání stavebnice/šablona/freelancer/agentura). |
| 2 | VYSOKÁ | **Stránka SEO nemá žádnou cenu** (`/sluzby/seo-optimalizace`: „Přesné ceny neuvádím paušálně… individuální"), zatímco v SERP pro „seo optimalizace cena" byly české články s čísly (loudavymkrokem.cz: audit 5-50 tis. Kč, specialista 20-70 tis. Kč měsíčně; mediaguru.cz „Kolik stojí SEO"). Uživatel s cenovým záměrem odchází; blog navíc říká, že SEO je „individuálně". |
| 3 | STŘEDNĚ-VYSOKÁ | **Persona 1 (řemeslník 45+) nevidí telefon.** Číslo je za klikem, v HTML žádný `tel:`. Nika-stránky přitom slibují „Číslo i tlačítko volání na každé obrazovce" (instalatéři) a vlastní web předvádí opak. |
| 4 | STŘEDNĚ | **Homepage není vhodný cíl pro „tvorba webových stránek".** Title „Weby a e-shopy na míru pro firmy a živnostníky", H1 „Weby a e-shopy, které spojují moderní design, SEO a automatizaci procesů" je abstraktní, bez ceny a telefonu, s 9 službami najednou (weby, e-shopy, AI, SEO, sociální sítě, Google/Meta reklamy, aplikace, rezervace). Frázi lépe zastupuje `/sluzby/tvorba-webovych-stranek` (cena v title i meta). |
| 5 | STŘEDNĚ | **Nikové stránky jsou šablonovité.** `/web-pro-instalatery` sdílí s `/web-pro-zamecniky` a `/web-pro-elektrikare` ~44 % vět a s `/web-pro-remeslniky` ~43 %; stejná kostra H2. Jako důkaz slouží prakticky všude Zámečnictví MB; kadeřnictví ukazuje „Masáže Tomáš Kestner" (masér, ne kadeřnice). Riziko duplicity a slabá důvěra (instalatér chce vidět instalatéra). |
| 6 | STŘEDNĚ | **Automatizace: špatná vstupní stránka pro „AI agent pro firmu".** `/automatizace` je zacílená na „majitele webu" (title „Automatizace a AI pro majitele webu"), query míří na firmy. Lépe sedí `/automatizace/ai-agenti` („AI agenti na míru pro firmy"). Dvojí značka VIZEON × ALTENO, kalkulačka mimo web, žádná viditelná případová studie z automatizace. |
| 7 | NÍZKÁ-STŘ. | `/tvorba-webu-pro-zivnostniky` má title „Jak probíhá tvorba webu pro živnostníky" (procesní), ale je to rozcestník oborů + ceny; v title chybí cena, žádné obrázky (0), chybí odpověď na to, co SERP „web pro živnostníky" ukázal (zdarma/levně, povinné údaje na webu OSVČ). |
| 8 | NÍZKÁ | Nekonzistentní názvosloví: blog zmiňuje „Online Vizitku" a „Web Care", ceník má Micro Page/Promo Page/Pro Web a „Správa webu od 480 Kč". Home: 7/7 obrázků referencí s prázdným `alt`; 18 FAQ otázek na jedné stránce (FAQ rich results Google od 2023 omezil na úřední/zdravotní weby, přínos je jen sémantický). Tvrzení „10+ klientů / 100 % spokojenost" je neověřitelné. |
| + | POZITIVA | Veřejné ceny a doby dodání (v title nik „od 9 999 Kč"), Service/Offer/PriceSpecification a BreadcrumbList schema na nikách, BlogPosting s datem (1. 9. 2026), reference s odkazy na živé weby klientů, jasné CTA „Konzultace zdarma". |

## Analýza po dvojicích stránka ↔ dotaz

Persony: P1 = řemeslník 45+, P2 = majitel salonu (ceny + rezervace), P3 = manažér malé firmy (automatizace). Skóre persony = Relevance / Jasnost / Důvěra / Akce (po 25, celkem 100). Jde o odborný odhad ze zdrojového textu, ne o měření.

### 1) `/` ↔ „tvorba webových stránek" / „tvorba webu pro živnostníky"

- **SERP (pozorováno):** návody a vzdělávací obsah: websiteplanet.com/cs/blog/tvorba-webovych-stranek, shopify.com/cz průvodci, novinky.cz o nástrojích, clickup, mnoho PDF/diplomek (theses.cz, dspace), reference na nejremeslnici.cz. **Dominantní typ: informační návod / DIY nástroje.** Agenturní homepage jsem v tomto seznamu nepozoroval (starší audit s dotazem „…na míru pro firmy" je viděl).
- **Typ cílové stránky:** homepage agentury (rozcestník).
- **Mismatch: VYSOKÝ pro generický dotaz** (informační/DIY vs. prodejní rozcestník), **STŘEDNÍ pro „tvorba webu pro živnostníky"** (typ přijatelný, H1 ale neříká „pro živnostníky" ani „tvorba webu").
- **Co chybí nad ohybem:** srozumitelný H1 (co a pro koho), cena a doba dodání, viditelný telefon / klik na volání, jeden vizuální důkaz (screenshot reálného webu). Dnes: abstraktní H1, „Nezávazná konzultace zdarma", čísla „10+ klientů / 100 %".
- **SXO Gap Score: 59/100** (typ 8/15, hloubka 11/15, UX 10/15, schema 10/15, média 6/15, autorita 8/15, aktuálnost 6/10).
- **Persony:** P1 15/14/13/12 = **54** (9 služeb, „AI", skrytý telefon); P2 17/14/14/15 = **60**; P3 14/12/10/15 = **51** (slib „AI a automatizace" bez důkazů).
- **Změny:** H1/title „Tvorba webu pro živnostníky a malé firmy od 4 999 Kč"; nad ohyb cena + `tel:` + screenshot reference; služby seskupit na 3 hlavní (weby, automatizace, SEO), zbytek pod „další služby"; frázi „tvorba webových stránek" posílit interními odkazy s tímto anchorem na `/sluzby/tvorba-webovych-stranek`; alt texty u 7 referencí.

### 2) `/tvorba-webu-pro-zivnostniky` ↔ „web pro živnostníky"

- **SERP (pozorováno):** smíšený záměr. KB „Digitální dílna" (WebNávrhář, web zdarma a rychle), články „web zdarma" (pruvodcepodnikanim.cz, finance.cz), **právní povinnosti** (businessinfo.cz, idoklad.cz „povinné údaje na webu"), fórum podnikatel.cz freelancer vs. agentura, nejremeslnici.cz, jedna agenturní nabídka „do 14 dnů od 9 999 Kč". **Dominantní typ: informační rady (zdarma/povinnosti) + levné produktové nabídky.**
- **Typ cílové stránky:** hub oborů s popisem procesu.
- **Mismatch: STŘEDNÍ.** Komerční typ je v SERP zastoupen, ale stránka odpovídá jen „jak to probíhá", ne na „zdarma, nebo za peníze?" a „co musí web OSVČ obsahovat".
- **SXO Gap Score: 57/100** (11/10/9/11/2/8/6; 0 obrázků).
- **Persony:** P1 18/16/14/12 = **60**; P2 17/15/14/12 = **58** (kadeřnictví jen odkaz, bez ceny rezervace).
- **Změny:** title „Web pro živnostníky od 4 999 Kč, hotový do 10 dní"; sekce „Web zdarma vs. na míru: kdy co stačí" a „Co musí web OSVČ povinně obsahovat" (úhel, který SERP odměňuje); 3-4 miniatury reálných webů z `/ukazky-webu`; srovnání tří balíčků přímo na stránce.

### 3) `/cena-tvorby-webu` ↔ „cena tvorby webu" / „kolik stojí web"

- **SERP (pozorováno):** shopify.com/cz „cena webových stránek", websiteplanet „kolik stojí web v roce" (aktualizováno 2026), hostinger/hostragons ceny, stavebnice, nejremeslnici reference, startitup.sk. **Dominantní typ: blogový průvodce cenou, často od platforem a hostingů (DIY srovnání).** Samostatný ceník agentury v seznamech nebyl.
- **Typ cílové stránky:** ceník služby (transakční).
- **Mismatch: STŘEDNÍ.** Hledající „cena tvorby webu" je ve fázi „kolik to obvykle stojí", ne „kolik chce VIZEON"; ceník (612 slov, 3 ceny „od") nemá tržní měřítko, tabulku faktorů, srovnání stavebnice/šablona/freelancer/agentura ani celkový roční náklad (web + doména + hosting + správa).
- **SXO Gap Score: 55/100** (10/8/10/12/2/7/6).
- **Persony:** P1 17/17/15/14 = **63**; P2 16/15/13/12 = **56** (cena rezervace není rozepsaná, hosting/doména „není v ceně" bez částky).
- **Změny:** „Kolik to bude celkem za rok" (web + doména + hosting + správa od 480 Kč/měs.); tabulka „stavebnice / šablona / VIZEON / agentura" (rozmezí doplní majitel, neodhaduji za něj); ceny podle oboru (kadeřnictví → Pro Web 14 999); title „Ceník webů od 4 999 Kč". Viz kanibalizace.

### 4) `/blog/kolik-stoji-tvorba-webu-2026` ↔ „kolik stojí tvorba webu 2026" + kanibalizace s `/cena-tvorby-webu`

- **SERP (pozorováno):** websiteplanet (CS, 2026), fakturoid, shopify.com/cz, hostinger (EN „How much does it cost to build a website in 2026"), lupa.cz. **Dominantní typ: blogový průvodce s rozmezími.** Rok „2026" v dotazu potvrzuje, že čerstvost je signál.
- **Typ cílové stránky:** blogový článek (správný typ) s `BlogPosting`, 1. 9. 2026.
- **Mismatch: NÍZKÝ typově, obsahově slabý.** 983 slov, „od pár tisíc za šablonu po desítky tisíc" bez konkrétních rozmezí; velká část o produktech VIZEON a „startupu VIZEON"; „Online Vizitka" a „Web Care" nejsou v ceníku. Konkurenti dávají čísla.
- **Kanibalizace:** blog a ceník se navzájem odkazují, mají stejné 3 ceny a překrývají tituly („Kolik stojí tvorba webových stránek v roce 2026?" vs. „Cena tvorby webu na míru"). Je to **riziko, nikoli změřený stav** (bez Search Console nelze říct, která stránka se zobrazuje).
- **SXO Gap Score: 56/100** (12/9/8/11/2/6/8).
- **Persony:** P1 15/14/12/10 = **51**; P2 16/14/13/12 = **55**.
- **Změny (rozdělit role):**
  - **Blog = „kolik stojí web v ČR 2026":** tržní rozmezí, tabulka faktorů, příklady podle oboru, checklist před objednávkou; VIZEON jako jedna varianta s odkazem na ceník; autor se jménem a rolí, „aktualizováno"; opravit názvy produktů podle ceníku.
  - **`/cena-tvorby-webu` = „ceník VIZEON":** title/H1 „Ceník webů od 4 999 Kč", obecné vysvětlování přesunout do blogu.
  - Anchory: blog → ceník „ceník VIZEON", ceník → blog „kolik stojí web na trhu". Nepřidávat třetí cenovou stránku.

### 5) `/web-pro-remeslniky` a `/web-pro-instalatery` ↔ „web pro řemeslníky" / „web pro instalatéry"

- **SERP (pozorováno):** „web pro řemeslníky": hostinger.com/cz šablony pro řemeslníky a truhlářství, nicepage šablony, nejremeslnici.cz reference. „web pro instalatéry": nicepage šablony, nejremeslnici.cz kategorie, loxone článek o responzivitě, seznam agentur (czechtrade). **Dominantní typ: galerie šablon (produktový/DIY výpis) + portály s referencemi.** Agenturní nikovou stránku jsem v těchto seznamech neviděl (starší audit ano, viz limity).
- **Typ cílových stránek:** nikový komerční landing (cena v title, mock SERP, funkce, reference, FAQ, Service/Offer schema).
- **Mismatch: NÍZKÝ / SHODA.** Nejlepší stránky na webu; záměr „hotový web pro mé řemeslo" vs. šablona ve stavebnici: VIZEON odpovídá cenou a termínem.
- **SXO Gap Score:** `/web-pro-remeslniky` **75/100** (13/12/12/13/9/10/6); `/web-pro-instalatery` **69/100** (12/11/12/13/8/7/6; reference je zámečník, ne instalatér).
- **Persony (P1):** řemeslníci 21/20/17/17 = **75**; instalatéři 21/19/15/17 = **72**. Chybí viditelné číslo, jen jedna reference, žádná tvář „kdo mi to udělá".
- **Změny:** viditelný telefon + `tel:` v hlavičce, hero a sticky „Zavolat" na mobilu; 3 reference místo 1 (Petráň, Varchol malíř, Likvidace eternitu už jsou v `/ukazky-webu`); unikátní obsah per obor (typické dotazy zákazníků, ceník úkonů, regionální příklady) místo ~44 % společných vět; věta „kdo web dělá" s fotkou a jménem.

### 6) `/sluzby/seo-optimalizace` ↔ „seo optimalizace pro živnostníky" / „seo optimalizace cena"

- **SERP „seo optimalizace cena" (pozorováno):** loudavymkrokem.cz „Kolik stojí SEO", mediaguru.cz „Kolik stojí SEO", fakturoid.cz „Jak dělat SEO v roce 2026", kb.cz „Co je SEO", businessinfo.cz, SI/PL/SK cenové články. **Dominantní typ: blogový průvodce cenou s čísly.** „SEO pro živnostníky" jsem nehledal.
- **Typ cílové stránky:** servisní landing bez cen (701 slov, FAQPage + Service).
- **Mismatch: STŘEDNĚ-VYSOKÝ.** Query obsahuje „cena", SERP odpovídá čísly, stránka je záměrně nemá.
- **SXO Gap Score: 47/100** (8/8/8/11/2/5/5).
- **Persony:** P2 14/13/11/10 = **48** (nezná „obsahové/technické SEO", chce „být vidět v okolí"); P1 12/12/10/9 = **43**.
- **Změny:** cena „od" aspoň pro audit a balíček lokálního SEO (Google Business Profile + Firmy.cz) pro živnostníky; benchmark „agentury běžně X, u nás Y" (hodnoty doplní majitel); sekce v řeči zákazníka („Jak se dostat do mapy, když hledají kadeřnictví poblíž"); případová studie nebo „před/po" pozic; propojit na `/sluzby/seo-optimalizace/lokalni-seo` jako hlavní vstup pro živnostníky.

### 7) `/automatizace` ↔ „automatizace pro firmy AI" / „AI agent pro firmu"

- **SERP (pozorováno):** microsoft.com/cs-cz Copilot (AI agenti a byznys), clickup.com/cs blogy („AI agenti pro malé podniky"), techsy.io průvodce, flowhunt.io, businessinfo.cz, PDF apertia.ai. **Dominantní typ: edukační průvodce od velkých dodavatelů a SaaS.** Lokální dodavatelé zakázkových služeb viditelní nebyli.
- **Typ cílové stránky:** servisní landing s interaktivními ukázkami, cena od 4 999 Kč za automatizaci, 14 dní podpory.
- **Mismatch: STŘEDNÍ** (informační záměr vs. prodejní landing; u komerčního „zakázková automatizace" by typ seděl). Title „…pro majitele webu" zužuje cílovku; `/automatizace/ai-agenti` je lepší vstup pro „AI agent pro firmu".
- **SXO Gap Score: 57/100** (9/10/10/12/5/5/6).
- **Persona P3:** 15/15/10/15 = **55**. Slabé: žádná případová studie, dvě značky, kalkulačka na jiné doméně, „Voice agenti: připravujeme", data/GDPR jen jedna FAQ věta.
- **Změny:** jedna případová studie s čísly (ušetřené hodiny, doba odpovědi); „Co AI agent dělá a nedělá" nahoře (SERP odměňuje vysvětlení); seznam integrací (CRM, e-mail, účetnictví) + GDPR; title „Automatizace a AI agenti pro firmy"; anchor „AI agent pro firmu" na `/automatizace/ai-agenti`; jasně říct, kdo je smluvní strana (VIZEON, nebo ALTENO).

### Doplněk: `/web-pro-kadernictvi` (P2)

Title „Webové stránky pro kadeřnictví s rezervací" sedí na záměr. Doporučený Pro Web 14 999 Kč (rezervace), Promo Page 9 999 Kč při externím systému. Chybí demo kalendáře, cena rezervace jako položka, reference z kadeřnictví (použit masér). P2: 22/20/16/18 = **76**. Změna: živé demo, jasná cena rezervace, reference salonu.

## Souhrn persón

| Persona | Průměr | Nejslabší bod | Priorita |
|---|---|---|---|
| P3 manažér automatizace | ~53 | žádná case study, dvě značky, GDPR | case study, integrace + GDPR nahoře |
| P2 salon | ~59 | cena rezervace, SEO bez ceny, žádné demo | cena rezervace, demo, SEO s cenou |
| P1 řemeslník 45+ | ~62 | skrytý telefon, jedna reference | viditelný telefon, 3 reference z oboru |

## Akční plán

1. (VYSOKÁ) Rozdělit role blog vs. ceník a doplnit tržní čísla do blogu.
2. (VYSOKÁ) Ceny „od" do SEO stránky a lokálního SEO pro živnostníky.
3. (STŘ-VYS) Viditelný telefon + `tel:` v hlavičce, hero nik a patičce; sticky „Zavolat" na mobilu.
4. (STŘ) Home: H1/title „Tvorba webu pro živnostníky…", cena a telefon nad ohybem, 9 služeb na 3 hlavní; „tvorba webových stránek" posílit na `/sluzby/tvorba-webovych-stranek`.
5. (STŘ) Zunikátnit nikové stránky (≥ 60 % unikátního textu, reference z oboru).
6. (STŘ) Automatizace: nový title, case study, GDPR/integrace, interní linky na `/automatizace/ai-agenti`.
7. (NÍZ) Sjednotit názvosloví produktů, `alt` u referencí na home.

Související: E-E-A-T (autor, ověřitelnost tvrzení) `/seo content`; schema (telefon v ProfessionalService, Review) `/seo schema`; lokální záměr nik `/seo local`. Generovat PDF report? Použijte `/seo google report`.
