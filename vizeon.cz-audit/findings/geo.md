# GEO / AI Search Readiness: vizeon.cz

Datum: 2026-11-21. Rozsah: přístup AI crawlerů, llms.txt, citovatelnost pasáží, SSR, entita a externí zmínky o značce. Nahrazuje starší verzi z 2026-09-05 (tehdy 57/100). Starý nález "odpovědi FAQ jen v JSON-LD" je opravený: odpovědi jsou nyní ve viditelném HTML.

## AI Search Readiness skóre: 60 / 100

| Dimenze | Váha | Skóre | Vážené |
|---|---|---|---|
| Citovatelnost | 25 % | 55 | 13,8 |
| Strukturální čitelnost | 20 % | 72 | 14,4 |
| Multimodální obsah | 15 % | 35 | 5,3 |
| Autorita a signály značky | 20 % | 38 | 7,6 |
| Technická dostupnost | 20 % | 92 | 18,4 |

Odhad podle platforem (kvalitativní, bez živého dotazování; DataForSEO nebylo k dispozici): Google AI Overviews 62, Bing Copilot 58, Perplexity 58, ChatGPT 50. ChatGPT je nejnižší, protože se opírá o externí zmínky o značce, kterých je málo.

## Přístup AI crawlerů

robots.txt: `User-Agent: * / Allow: / / Disallow: /api/` plus odkaz na sitemap. Žádná pravidla pro konkrétní boty, všichni tedy mají přístup. Test přes curl na homepage s UA jednotlivých botů: všechny vrátily HTTP 200 a stejnou velikost těla (203 669 B), takže Vercel ani middleware nic nefiltruje.

| Crawler | robots.txt | Skutečný test (curl UA) |
|---|---|---|
| GPTBot | povolen | 200, 203 669 B |
| OAI-SearchBot | povolen | 200, 203 669 B |
| ChatGPT-User | povolen | 200, 203 669 B |
| ClaudeBot | povolen | 200, 203 669 B |
| Claude-SearchBot | povolen | 200, 203 669 B |
| PerplexityBot | povolen | 200, 203 669 B |
| Google-Extended | povolen | 200 (jen robots token, bez vlastního UA) |
| Applebot-Extended | povolen | 200 (jen robots token) |
| CCBot | povolen | 200, 203 669 B |
| Bytespider | povolen | 200, 203 669 B |

Poznámka: test s falešným UA z jedné IP neověří WAF pravidla vázaná na ověřené IP rozsahy botů. Ve Vercel Firewallu (dashboard, ne repo) stojí za to jednou zkontrolovat, že není zapnutý managed rule pro AI boty.

## Co funguje

- Plný SSR: v surovém HTML je celý obsah (homepage 1 402 slov, ceník, FAQ, blog). Nic nezávisí na JS.
- Značka v surovém HTML: VIZEON je prostý text uvnitř stylovaného spanu, ALTENO má `<span class="sr-only">ALTENO</span>` vedle SVG wordmarku. AI parsery značku vidí, pravidlo o logu GEO nekazí.
- Konkrétní čísla: Micro Page od 4 999 Kč, Promo Page od 9 999 Kč, Pro Web od 14 999 Kč, e-shop od 29 990 Kč, správa webu od 480 Kč/měs., termíny 2 / 10 pracovních dní / 3 týdny, záloha 30/70 %.
- Otázkové H2/H3 a FAQPage JSON-LD na většině podstránek; Service + Offer + PriceSpecification na oborových stránkách.
- Blog: BlogPosting s autorem a vydavatelem, 4 články.
- Čistá sitemap, kanonické URL, jednojazyčný web (cs).
- Firmy.cz profil existuje a Seznam ho zobrazuje u dotazu "VIZEON" i "vizeon.cz".

## Nálezy

### 1. [Medium] Nekonzistentní entita (kdo je VIZEON)
- Evidence: /cena-tvorby-webu říká "nejsme agentura, děláme sami", blog říká "startup VIZEON" ve třetí osobě a zároveň "jak přemýšlím" v první, homepage "stavím", patička "Tvoříme". Firmy.cz popisuje VIZEON jako "digitální agenturu" v kategorii "Vývoj softwaru na zakázku". /o-mne: "Nabíráme první lidi". Počty: "10+ spokojených klientů" na homepage vs. "15+ dokončených projektů" v /o-mne.
- Dopad: LLM skládají popis firmy z více zdrojů; rozpor (osoba / agentura / startup, 10 vs. 15) snižuje jistotu citace a vede k nepřesným shrnutím.
- Fix: zvolit jedno vyprávění (např. "VIZEON je jednočlenné české webové studio ...") a sjednotit web, blog, JSON-LD i Firmy.cz. Čísla držet na jednom místě v `lib/data/*`. Soubory: `app/page.tsx`, `app/blog/[slug]`, `app/o-mne/page.tsx`.

### 2. [Medium] Strukturovaná data entity jsou chudá
- Evidence: `app/layout.tsx` (od ř. 134) má ProfessionalService i Organization se stejným `@id` (`#organization`), `logo` ukazuje na `favicon.ico` (32x32, v kódu je TODO), `sameAs` jen Instagram. Chybí `address`, `telephone`, `taxID` (IČO 29977231 je jen v patičce `components/Footer.tsx`), `founder` (Person), `foundingDate`, `knowsAbout`. Firmy.cz uvádí adresu v Dobšíně, která není nikde na webu. Autor blogu je Person jen se jménem "Kryštof", bez příjmení, `url` a `sameAs`. U článků chybí `dateModified`.
- Fix: v `app/layout.tsx` sloučit do jednoho uzlu (`["Organization","ProfessionalService"]`), přidat adresu shodnou s Firmy.cz, `taxID`, `founder` s plným jménem a `sameAs` (Firmy.cz, LinkedIn, GBP po založení), skutečné logo ≥112 px. U blogu doplnit příjmení autora, odkaz na profil a `dateModified`.

### 3. [Medium] Stránka o zakladateli je skrytá před vyhledávači
- Evidence: `/o-mne` má `noindex` a není v sitemap (commit 023c745). Je to jediné místo s příběhem a expertízou autora; Seznam stále ukazuje starší verzi ("O mně — jeden člověk místo agentury"). Reference na homepage nemají Review markup.
- Dopad: AI nemá indexovatelný zdroj pro "kdo za tím stojí", což je klíčové pro E-E-A-T a pro odlišení od jiných "Vizeon".
- Fix: buď odstranit noindex, nebo vytvořit stručnou indexovatelnou stránku "O studiu / autor" (kdo, odkud, od kdy, IČO, adresa, kontakt, reference) a odkázat na ni z autora blogu a JSON-LD.

### 4. [Medium] Pasáže jsou krátké a málo samostatné, chybí definiční věta a tabulka
- Evidence: odstavce na /cena-tvorby-webu mají 20 až 56 slov, na blogu 22 až 99, na oborových 16 až 68; žádný v pásmu 134 až 167 slov. Hero homepage neobsahuje samostatnou větu "VIZEON je ..." (říká "stavím"). Odpovědi FAQ mají 15 až 45 slov (jsou ale přímé a samostatné, to je dobře). Na webu je 0 `<table>`: ceník je v kartách, takže srovnání balíčků není strojově čitelné jako tabulka.
- Fix: na /cena-tvorby-webu, /tvorba-webu-pro-zivnostniky a /blog/kolik-stoji-tvorba-webu-2026 přidat úvodní blok 50 až 60 slov s přímou odpovědí ("Web na míru pro živnostníka stojí od 4 999 Kč ...") a v 2 až 3 sekcích delší samostatný odstavec kolem 130 až 160 slov. Přidat sémantickou tabulku balíčků (cena, rozsah, termín, pro koho). Přidat na homepage definiční větu o VIZEON.

### 5. [Medium] Prakticky žádný externí otisk značky
- Evidence (krátké hledání, Seznam; Google vyžadoval consent, Bing vrátil nerelevantní výsledky): nalezen jen Firmy.cz profil (0 recenzí) a vlastní web, Instagram je jen v JSON-LD. Žádný LinkedIn, YouTube, Reddit, Wikipedia/Wikidata, Google Business Profile, recenze ani zmínky v adresářích. Nejednoznačnost názvu je nízká: `vizeon.us` je nesouvisející anglická firma, česká entita se ale jednoznačně identifikuje přes "vizeon.cz" a Firmy.cz. YouTube (v GEO nejsilnější korelace) úplně chybí.
- Fix (podle dopadu): 1) založit Google Business Profile a doplnit do `sameAs` (v kódu je TODO); 2) kompletně vyplnit Firmy.cz (web, popis shodný s webem, adresa na webu) a získat první recenze od klientů z referencí; 3) LinkedIn stránka firmy a profil zakladatele; 4) 1 až 2 krátká YouTube videa (ukázka webu, "kolik stojí web"); 5) zmínky v oborových adresářích a poctivé odpovědi na Reddit/Seznam Q&A. Wikidata až při dostatečné notabilitě.

### 6. [Low] llms.txt chybí (404, stejně llms-full.txt a ai.txt)
- Poctivé zhodnocení: Google llms.txt ignoruje a žádná velká platforma veřejně nepotvrdila, že ho při citování používá. Přímý dopad na viditelnost je zanedbatelný. Je to ale levné (cca 15 minut, statický `public/llms.txt`) a funguje jako kontrola konzistence entity. Nepřeceňovat a nenahrazovat tím nálezy 1 až 5.
- Návrh (před nasazením ověřit, zda chce zakladatel uvádět jméno provozovatele):

```
# VIZEON

> VIZEON je jednočlenné české webové studio pro živnostníky a malé firmy: weby na míru, e-shopy, SEO a (přes sesterskou značku ALTENO) automatizace a AI agenti. Ceny jsou veřejné, komunikace probíhá přímo s autorem.

Provozovatel: Kryštof Sobotka, IČO 29977231. Kontakt: info@vizeon.cz. Jazyk: čeština.

## Ceny a služby
- [Ceník webů](https://vizeon.cz/cena-tvorby-webu): Micro Page od 4 999 Kč, Promo Page od 9 999 Kč, Pro Web od 14 999 Kč
- [Služby a ceník](https://vizeon.cz/sluzby): weby, e-shopy (od 29 990 Kč), SEO, správa webu (od 480 Kč/měs.)
- [Tvorba webu pro živnostníky](https://vizeon.cz/tvorba-webu-pro-zivnostniky)
- [Automatizace a AI](https://vizeon.cz/automatizace): AI agenti, chatboti, voice agenti (ALTENO)
- [ZakazIQ](https://vizeon.cz/zakaziq): rezervační systém

## Znalosti
- [Často kladené otázky](https://vizeon.cz/faq)
- [Kolik stojí tvorba webu v roce 2026](https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026)
- [Google Business Profile vs Firmy.cz](https://vizeon.cz/blog/google-business-profile-vs-firmy-cz)
- [Lokální SEO pro živnostníky v ČR](https://vizeon.cz/blog/lokalni-seo-pro-zivnostniky-v-cr)

## Reference
- [Ukázky webů](https://vizeon.cz/ukazky-webu)
```

### 7. [Low] Tenký blog bez citovaných zdrojů, telefon za tlačítkem
- Evidence: 4 články, žádná tabulka, tvrzení o cenách a vlivu rychlosti bez atribuce zdroje; telefon není v surovém HTML (žádný `tel:`, je za "Zobrazit telefon").
- Fix: u klíčových tvrzení uvést zdroj a rok; přidat články na dotazy "kolik stojí...", "jak dlouho trvá...", "web vs. šablona" a aktualizovat s `dateModified`.

## Top 5 kroků podle dopadu

| # | Krok | Pracnost |
|---|---|---|
| 1 | Sjednotit entitu (osoba / agentura / startup, čísla) + upravit JSON-LD (adresa, IČO, founder, logo, jeden uzel) | 2 až 3 h |
| 2 | Úvodní bloky s přímou odpovědí, definiční věta a tabulka balíčků na /cena-tvorby-webu a v blogu | 2 až 4 h |
| 3 | Google Business Profile, dokončení Firmy.cz, LinkedIn, první recenze, `sameAs` | 3 až 5 h rozloženě |
| 4 | Indexovatelná stránka o autorovi / studiu, autor blogu s příjmením a `dateModified` | 1 až 2 h |
| 5 | 1 až 2 YouTube videa a další cenové články; llms.txt jako bonus (15 min) | 1 až 2 dny |
