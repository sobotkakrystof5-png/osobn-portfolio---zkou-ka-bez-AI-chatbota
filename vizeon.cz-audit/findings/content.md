# Audit obsahu a on-page SEO: vizeon.cz

Datum: 2026-11-21. Podklady: crawl 67 URL (pages.json + .txt), vlastní výpočet podobnosti, zdrojáky (lib/data/industry-pages/*, components/industry/IndustryLanding.tsx). Starší verze tohoto souboru (zmiňovala 15 tenkých oborových stránek na ~340 slov) je zastaralá: oborové stránky mají dnes ~850-1000 slov a jednotnou šablonu.

## Skóre

| Oblast | Skóre |
|---|---|
| Content Quality | 66 / 100 |
| On-Page SEO | 68 / 100 |
| E-E-A-T (interní model skillu) | Experience 62, Expertise 58, Authoritativeness 40, Trustworthiness 72 (vážené ~58) |
| AI citation readiness | 55 / 100 |

## Co funguje

- Čitelná, konkrétní čeština s cenami a termíny přímo v textu (Micro Page od 4 999 Kč, Promo Page od 9 999 Kč, Pro Web od 14 999 Kč; 2 dny / 10 pracovních dní / 3 týdny). Tyto věty jsou samostatně citovatelné.
- Oborové stránky nejsou noun-swap: každá má vlastní scénu v telefonu, 3 "pain/fix" páry, 5 funkcí, sadu hledaných frází, doporučení varianty a 4 FAQ specifické pro obor (např. příplatek za noc u zámečníků).
- Trust signály: IČO 29977231 v patičce, e-mail, telefon za tlačítkem, GDPR a podmínky, reálné reference se jmény (Antoš, Varchol, Petráň), poctivé označení vymyšlených ukázkových značek štítkem "Ukázka".
- Titulky a H1 jsou unikátní na všech 67 URL (jediný "duplikát" je domovská stránka zachycená dvakrát jako / a bez lomítka). Canonical je všude self-referenční. Interní prolinkování oborových stránek je silné (každá má ~18-21 příchozích odkazů s popisným anchorem "Web pro zámečníky").
- Pravidla značky a strukturované FAQ jsou konzistentní; FAQ odpovědi jsou krátké a samostatné.

## Podobnost oborových stránek /web-pro-* (19 stránek)

Metoda: shingle Jaccard na slovech, vizuální text z .txt.

| Metrika | Hodnota |
|---|---|
| 5-gram Jaccard, celé .txt (vč. navigace/patičky), průměr párů | 0,37 (min 0,30 remeslniky-masery, max 0,51 kadernictvi-kosmeticky) |
| 4-gram Jaccard, jen hlavní obsah, průměr | 0,35 (min 0,29, max 0,48 kadernictvi-kosmeticky) |
| Podíl 4-gramů unikátních pro jednu stránku | 32-46 %, průměr 38,5 % (~330 slov z ~850) |
| Podíl 4-gramů sdílených s 10+ stránkami (šablona) | 42-55 %, průměr 51,6 % |
| Délka hlavního obsahu | 844-902 slov (hub remeslniky 1044) |

Nejpodobnější dvojice: kadeřnictví-kosmetičky (0,48), pak další páry z kategorie Krása a wellness a z řemesel (zámečníci/instalatéři/elektrikáři se stejným nonstop schématem).

Verdikt: nejde o near-duplicate (to by bylo >0,8) ani o klasický doorway (každá stránka cílí na reálný dotaz oboru, má vlastní odpovědi a nabídku). Riziko "scaled content" je střední: polovina textu je totožná šablona (hero scéna, "Vždy v ceně", ceník, proces, CTA, odkazy na další obory) a unikátní vrstva je tvořena krátkými větami v datových souborech. Chybí věc, kterou konkurent s šablonou nezíská: skutečný důkaz pro daný obor. Důkazový projekt je "same" jen u 4 stránek (remeslniky, zamecniky, studnare, malire, masery = 5 včetně hubu); u zbytku je "related" (rezbáři, truhláři, instalatéři, elektrikáři, autoservisy dostávají recenzi Zámečnictví MB; kosmetičky a kadeřnictví recenzi masér Kestner; fitness, makléři, fotografové téměř bez recenze: u fotografů, fitness a makléřů se žádné jméno klienta nezobrazuje). Deset z 19 stránek ukazuje stejné 1-3 reference.

## Cannibalizace (cena / tvorba webu)

Textová podobnost je nízká (4-gram Jaccard 0,01-0,13), takže jde o překryv záměru, ne o duplicitu.

| Stránka | Cílí na | Poznámka |
|---|---|---|
| /tvorba-webu-pro-zivnostniky | "tvorba webu pro živnostníky" | Title "Jak probíhá tvorba webu pro živnostníky" míří na proces, H1 na keyword; fungující hub pro obory |
| /sluzby/tvorba-webovych-stranek | "tvorba webových stránek" | H1 "Nekupujete si web. Kupujete si výsledky." keyword neobsahuje; jen 1 oborový hub |
| /sluzby/tvorba-webu-pro-firmy | "tvorba webu pro firmy" | 524 slov, jen 1 příchozí odkaz (z tvorba-webovych-stranek), v navigaci chybí |
| /cena-tvorby-webu | "cena tvorby webu" | Ceník + "proč levněji", dobrý, ale 612 slov a málo čísel nad rámec ceníku |
| /blog/kolik-stoji-tvorba-webu-2026 | "kolik stojí web 2026" | Stejný záměr jako cena-tvorby-webu, ale nedává žádná tržní čísla; 83 % obsahu opakuje ceník VIZEON |

Další rozptyl: otázka "Kolik stojí web" je i na domovské stránce, v /faq, na /sluzby a ve všech 19 oborových FAQ; téměř všude stejná odpověď. Není to přímo kanibalizace, ale nedává Googlu jasný signál, která stránka je hlavní pro cenový dotaz.

## Nálezy

### [High] Oborové stránky: ~50 % šablony, slabý oborový důkaz
Evidence viz tabulka výše (unikát 38 %, šablona 52 %, max podobnost 0,48). Reference je 10x stejná u 19 stránek, 3 stránky bez reference.
Fix: neprodlužovat text. Do `lib/data/industry-pages/*.ts` přidat ke každému oboru pole s unikátními fakty: 3-4 konkrétní čísla (typická cena zakázky v oboru, sezónnost, počet hledání, typické doby reakce), mini "před/po" nebo ukázka dotazu, vlastní ceník položek, 1 oborový checklist (např. povolení u studní, certifikace u zámečníků). Šablonové bloky ("Vždy v ceně", proces, CTA) zkrátit nebo sbalit do jednoho sdíleného komponentu, aby unikátní podíl vzrostl nad 60 %. Dvojice kadeřnictví/kosmetičky a zámečníci/instalatéři/elektrikáři rozlišit víc nebo sloučit pod hub, pokud se nenajde unikátní úhel. Zvážit noindex/sloučení u oborů bez dokončené reference, dokud není důkaz.

### [High] Nulová osobní autorita v obsahu: autor bez identity, /o-mne noindex
Blog: byline "V VIZEON, Vydavatel", v JSON-LD autor Person "Kryštof" bez příjmení, URL a odkazu na profil. /o-mne má `noindex, follow` (commit 023c745), takže tvůrce nemá indexovatelnou stránku autora. Žádný dateModified, všechny 4 články vyšly 1.-2. 9. 2026 a od té doby se neaktualizovaly.
Fix: odindexovat /o-mne nebo vytvořit indexovatelný autorský profil (celé jméno, role, zaměření, odkaz na LinkedIn/IČO) a odkazovat na něj z bylin; v BlogPosting doplnit `author.url`, `dateModified`. Ošetřit autorský text "V VIZEON Vydavatel" (v HTML to vypadá jako avatar + titulek).

### [High] Blog: obecný, bez čísel, bez zkušenosti, jen 4 články
Články mají ~920-980 slov (pod cílem 1 500 pro blog, ale to je jen orientační práh), nulové obrázky, žádná čísla a zdroje. Typické formulace: "významnou část vyhledávání", "obvykle rychle", "desítky tisíc i více". /blog/kolik-stoji-tvorba-webu-2026 neuvádí tržní rozpětí (šablona X Kč, agentura Y Kč), jen "od pár tisíc po desítky tisíc"; v třetí osobě propaguje "startup VIZEON". To jsou přesně značky obecného AI textu (obecné formulace, žádný vlastní vhled, žádná zkušenost).
Fix: ke každému článku přidat 1 vlastní data/zkušenost: reálné ceny z 15+ dokončených projektů, screenshot GBP/Firmy.cz nastavení, před/po z reference, podíl Seznamu s citovaným zdrojem (např. Similarweb/NetMonitor). Použít "já" a jméno autora. Cílit na 4-6 dalších témat (viz Medium níže), nepsat objem navíc.

### [High] Kanibalizace záměru "kolik stojí web": blog vs. /cena-tvorby-webu
Viz sekce Cannibalizace. Dvě stránky + 25 FAQ s týmž dotazem.
Fix: /cena-tvorby-webu = jediná kanonická odpověď (přidat tabulku "co ovlivňuje cenu" s rozpětím, příklady 3 reálných zakázek s finální cenou a rozsahem, srovnání šablona / freelancer / agentura). Blog předělat na srovnávací/informační článek s tržními čísly a jedním odkazem na ceník; z oborových FAQ odkazovat na /cena-tvorby-webu místo opakování odpovědi.

### [Medium] Kontakt: 159 slov a žádná důvěra mimo formulář
/kontakt: jen formulář, e-mail, "Zobrazit telefon", Instagram a "Odpovídáme do hodiny". Chybí fakturační údaje (IČO je jen v patičce), město/oblast působení, pracovní doba, odkaz na reference, jméno kontaktní osoby. U webu, který prodává důvěru, je to nejhubší místo.
Fix: v `app/kontakt/page.tsx` přidat blok "S kým mluvíte" (jméno, foto, 2 věty), IČO + sídlo, doba odezvy, 3 nejčastější dotazy, 1 reference. Nepotřebuje to víc než ~50 slov navíc.

### [Medium] Meta popisky ukázek webů: 200-285 znaků a 73 znaků
Příliš dlouhé (zkrácené v SERP): likvidace-eternitu 285, zamecnictvi-mb 252, studnarstvi-petran 249, schovinox 214, prvotka 214, alteno 205, malirske-prace 203, zakaziq 201, chatboti-rag 190. Příliš krátké: auf-gehts 73, blog 101, u-cerhu 104, gdpr 105. Meta je zkopírovaná z "Zadání a cíl" odstavce.
Fix: v `lib/data/portfolio.ts` přidat samostatné pole `metaDescription` (130-155 znaků, obor + výsledek + CTA). Auf Gehts: "Osobní web pro lektora němčiny: kurzy, přehled lekcí a formulář na první konzultaci. Ukázka od VIZEON."

### [Medium] Titulky přes 60 znaků
Delší než ~60: /sluzby/tvorba-webovych-stranek (74), /sluzby/seo-optimalizace (73), technicke-seo (71), audit (69), chatboti-rag (69), blog GBP (69), tvorba-e-shopu (67), zakaziq/rezervacni-system (67). Klíčová fráze je na začátku, takže jde o kosmetiku. Naopak /cena-tvorby-webu (33) a /podminky (26) jsou krátké a bez hodnoty: "Cena tvorby webu na míru od 4 999 Kč | VIZEON".
Fix: zkrátit na 50-58 znaků, např. "Tvorba webových stránek na míru od 4 999 Kč | VIZEON".

### [Medium] H1 a nadpisy bez klíčového tvaru
/sluzby/tvorba-webovych-stranek: H1 "Nekupujete si web. Kupujete si výsledky." bez fráze (keyword jen v title). Domovská stránka používá jako H2 celou větu z hero podnadpisu; "Náš zákazník, náš pán." je H2 bez významu pro vyhledávač. /tvorba-webu-pro-zivnostniky: H1 "Tvorba webu ... který" je gramaticky chybně (má být "která"), title říká "Jak probíhá", H1 slibuje jiný záměr. /blog, /sluzby/seo-optimalizace/* a /automatizace/* mají H1 jen o 1-3 slovech (např. "Blog", "AI agenti na míru").
Fix: H1 s klíčovým tvarem + podnadpis s hodnotou; opravit "která"; homepage podnadpis změnit na `<p>`.

### [Medium] Tenké služby (300-400 slov) bez hloubky strukturou
/sluzby/graficke-designy 302, sprava-webu 319, technicke-sluzby 316, systemy-na-miru 359, seo/technicke-seo 351, obsahove-seo 363, audit 386, ai-chatbot 441. Pro majitelovu preferenci krátkých stránek není problém délka, ale chybějící konkrétnost: audit neuvádí cenu ani ukázku reportu, technické SEO nemá seznam konkrétních kontrol, grafika nemá žádné příklady, jen ceny "od".
Fix: po stránce přidat (1) tabulku "co dostanete / cena / termín", (2) ukázku výstupu (screenshot reportu, vzorová vizitka), (3) 1 číselný příklad z reálné zakázky, (4) 2 FAQ s čísly. Bez navýšení počtu slov o více než ~100.

### [Medium] Osiřelé a podlinkované stránky
/sluzby/ai-chatbot a /zakaziq/rezervacni-system: 0 příchozích odkazů. /sluzby/tvorba-webu-pro-firmy a /sluzby/graficke-designy a /sluzby/technicke-sluzby: 1. /sluzby/seo-optimalizace/audit: 2. Blogové články: 3-5 (jen index + navzájem). Reference /ukazky-webu/*: 3-6.
Fix: odkazy z /sluzby, relevantních oborových stránek (kontextový odkaz "lokální SEO" z kadeřnictví, "chatbot" z makléřů) a ze souvisejících článků; blog propojit do oborových stránek (zámečníci -> jak poznat kvalitní web).

### [Medium] Reference bez měřitelného výsledku
Ukázky /ukazky-webu/* jsou ~270-390 slov: zadání, 4 body "Co jsme vytvořili", citát klienta. Chybí výsledek (počet poptávek, pozice, rychlost, čas dodání), datum spuštění, role klienta. Meta "Zadání a cíl" popisuje záměr, ne dopad. Homepage tvrdí "10+ spokojených klientů" a "100 % spokojenost", /o-mne "15+ dokončených projektů": nesouhlasící čísla bez vysvětlení (klienti vs. projekty) a "100 %" bez podkladu.
Fix: do `lib/data/portfolio.ts` přidat `result` (1 věta s číslem, i skromným: "první poptávka za 4 dny", "PageSpeed 98 mobil"), `launchDate`. Sjednotit tvrzení na homepage a /o-mne nebo je zdůvodnit.

### [Low] Hlas "já" vs. "my"
Homepage: "stavím", "komunikujete přímo se mnou"; /faq: "pracuješ s AI?" a "moje práce"; oborové stránky a ukázky: "děláme", "stavíme", "Náš zákazník, náš pán", "Co o nás říkají klienti". Pro jednoho člověka vyvolává pocit agentury a podkopává hlavní argument (přímá komunikace).
Fix: zvolit hlas "já" nebo "my" a držet ho v `lib/data/*` (poznámka v types.ts říká, že oborové texty jsou záměrně v "my"; to je třeba změnit).

### [Low] Nesoulad v údajích a drobnosti
Ukázka "U Cerhů" vs. "U Cerhu" (diakritika v titulku); nadpis "Odpověď do 24 hodin" (/sluzby) vs. "Odpovídáme do hodiny" (kontakt, FAQ). Většina oborových titulků má vzor "... od 9 999 Kč | VIZEON" - dobré pro CTR, ale kadeřnictví/ucetni/masery/kosmetičky/fitness/autoservisy cenu nemají, tedy nekonzistentní.
Fix: sjednotit lhůty odpovědi a ceny v titulcích.

## AI citation readiness (pasáže)

- Silné: FAQ odpovědi s čísly (ceny, termíny, 30/70 % záloha), tabulky ceníku, krátké samostatné věty. /cena-tvorby-webu a /sluzby/tvorba-webovych-stranek (srovnání "sami s AI vs. VIZEON") jsou dobře citovatelné.
- Slabé: blog (obecné věty bez čísel a zdrojů, nelze citovat), služby SEO (bez konkrétních kontrol), reference (bez výsledků), žádná externí citace u tvrzení o trhu (podíl Seznamu, vliv recenzí).
- Doporučení: každá stránka 1 "citovatelná" věta s číslem a zdrojem na začátku sekce; porovnávací tabulky (šablona / freelancer / agentura); datum poslední aktualizace viditelně na ceníku a blogu.

## Priorita

1. Autor + indexovatelný profil + dateModified (E-E-A-T, nízká práce).
2. Unikátní oborová data a reference pro /web-pro-* (snížit šablonu pod 40 %).
3. Cenový záměr: /cena-tvorby-webu jako jediný cíl, blog přepsat s tržními čísly.
4. Meta popisky ukázek, titulky, H1 (rychlé opravy v lib/data/portfolio.ts a page.tsx).
5. Kontakt, osiřelé stránky, měřitelné výsledky referencí.
