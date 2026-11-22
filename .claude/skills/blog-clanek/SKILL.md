---
name: blog-clanek
description: Napíše nebo aktualizuje článek na blog vizeon.cz (content/blog/*.mdx) podle schváleného tématu z fronty content/blog/_fronta.json. Pevná struktura pro SEO i GEO (přímá odpověď, V kostce, H2 jako otázky, FAQ, interní odkazy), jen ověřená fakta, pravidlo značek VIZEON/ALTENO. Použij vždy, když se píše, upravuje nebo kontroluje článek na blog, i když to spouští GitHub Actions (blog-write.yml).
---

# Článek na blog VIZEON

Článek má prodávat službu přes odpověď na otázku, kterou lidé opravdu hledají.
Píše se pro dva čtenáře: člověka, který se rozhoduje, a vyhledávač nebo AI,
které z článku citují. Obojímu pomáhá totéž: jasná odpověď hned na začátku,
konkrétní fakta, přehledná struktura.

## 1. Vstup

1. Téma vezmi z `content/blog/_fronta.json` (položka se `status: "schvaleno"`).
   Platí `slug`, `keyword`, `secondaryKeywords`, `targetPage`, `interest`,
   `publishAt`, `outline`, `faq`, `internalLinks`, `facts`, `notes`.
   Osnova je schválená, drž se jí. Odchylku zdůvodni v PR.
2. Přečti brief konkurence `workspace/serp/<slug>.md` (v GitHub Actions je
   workspace agentů naklonovaný do `./workspace`). Článek musí pokrýt vše, co
   má první trojka výsledků, a využít aspoň dvě mezery z briefu. Lokálně
   brief chybí, pak vycházej z osnovy ve frontě.
3. Přečti cílovou stránku (`targetPage`), ať článek neříká nic jiného než ona.
4. Přečti fakta: `content/blog/_fakta.md` a soubory, na které odkazuje.
5. Zkontroluj ostatní články (`grep -h '^keyword:' content/blog/*.mdx`), ať
   nový článek nekonkuruje existujícímu.

## 2. Fakta (nepřekročitelné)

- Čísla, ceny, termíny, reference a výsledky jen z `_fakta.md` a datových
  souborů webu. Žádné vymyšlené klienty, citace, statistiky ani „studie“.
- Cizí čísla (statistiky, podíly vyhledávačů, pravidla Googlu) jen s odkazem
  na zdroj, který jsi otevřel (WebSearch/WebFetch). Preferuj oficiální zdroje
  (Google Search Central, ČSÚ, dokumentace služby).
- Když fakt chybí, napiš obecněji, nebo to uveď v PR jako otázku pro majitele.

## 3. Soubor

`content/blog/<slug>.mdx`. Frontmatter (řetězce v uvozovkách):

```yaml
---
title: "H1 s hlavním klíčovým slovem, jak ho lidé píšou"
seoTitle: "Kratší titulek do Googlu (max 55 znaků), jen když je title delší"
description: "120–160 znaků, klíčové slovo + co čtenář získá."
excerpt: "1–2 věty pod nadpisem a na kartě blogu."
keyword: "hlavní klíčové slovo"
secondaryKeywords: ["varianta 1", "varianta 2"]
category: "Ceny webu"
date: "YYYY-MM-DD"            # den vydání podle publishAt (Praha)
publishAt: "YYYY-MM-DDT14:00:00+01:00"   # z fronty, beze změny
targetPage: "/cesta-prodejni-stranky"
interest: "web"               # proverka | web | eshop | automatizace | marketing | jine
answer: "Přímá odpověď na hlavní otázku, 40–60 slov, samostatně srozumitelná."
takeaways:
  - "3–5 bodů, každý jedna konkrétní informace, ideálně s číslem"
faq:
  - q: "Otázka, jak ji lidé píšou?"
    a: "Odpověď ve 2–3 větách."
---
```

`updated: "YYYY-MM-DD"` přidej jen při věcné aktualizaci staršího článku.

## 4. Struktura těla

- Bez nadpisu `#` (H1 je `title`). Začni odstavcem, který navazuje na `answer`
  a do 120 slov obsahuje klíčové slovo.
- 5–8 sekcí `##`, většina jako otázka. Každá sekce začíná odpovědí v 1–2
  větách, pak vysvětlení a příklad z oboru čtenáře.
- Aspoň jedna tabulka (srovnání, ceny, postup) nebo číslovaný postup, kde to
  dává smysl. Markdown tabulky fungují.
- V článku o cenách webu vlož `<PricingHighlight />` (živý ceník). Jiné
  komponenty ani HTML nepoužívej, výrazy `{…}` taky ne.
- Odkazy: 3–5 interních (`[text](/cesta)`), povinně `targetPage`, dál ceník
  nebo služba a 1–2 související články. Text odkazu popisuje cíl, ne „zde“.
  1–3 externí zdroje u převzatých faktů.
- Délka 900–1 600 slov. FAQ, V kostce a přímou odpověď vykreslí stránka sama
  z frontmatteru, do těla je nepiš.
- Výzvu k poptávce nepiš, stránka ji přidá sama podle `interest`.

## 5. Jazyk a styl

- Čeština, vykání čtenáři, za firmu „my“. Krátké odstavce (max ~4 věty,
  90 slov), střídej délku vět.
- Konkrétně: čísla, příklady z oboru, co přesně udělat. Žádné obecné rady.
- Bez frází typických pro AI („v dnešní době“, „nicméně“, „v neposlední
  řadě“, „je důležité poznamenat“, „hraje klíčovou roli“…), bez pomlček jako
  spojek, bez tučného uprostřed věty, bez trojic přívlastků. Při pochybnostech
  projdi text skillem `humanize-text-cs`.
- Značka: piš prosté **VIZEON** a **ALTENO** verzálkami, web je sám vysází
  jako logo. Nikdy je neskloňuj („pod značkou VIZEON“, ne „od VIZEONU“).
  Adresy (`vizeon.cz`, `info@vizeon.cz`) zůstávají malými písmeny.

## 6. Propojení

- Do 1–2 starších souvisejících článků doplň jednu přirozenou větu s odkazem
  na nový článek (jen když starší článek vychází dřív). `updated` kvůli tomu
  neměň.
- Prodejní stránka (`targetPage`) ukáže článek sama v bloku „Články k tématu“.
- Ve frontě změň status tématu na `"napsano"`.

## 7. Kontrola

Spusť `npm run blog:check` a oprav všechny chyby (E). Upozornění (W) oprav,
kde to jde. V Claude Code to po každé úpravě hlídá i hook. Měň jen soubory
v `content/blog/`.
