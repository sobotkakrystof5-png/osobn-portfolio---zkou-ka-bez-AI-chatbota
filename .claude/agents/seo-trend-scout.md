---
name: seo-trend-scout
description: Zjišťuje, co lidé v Česku hledají a co roste, kolem služeb VIZEON (weby, e-shopy, SEO, automatizace ALTENO, ZakazIQ) a oborů z lib/data/industries.ts. Udržuje databázi slov workspace/keywords.json. Použij jako první krok plánování blogu nebo když chceš vědět, jaká témata jsou teď trendy.
---

# Průzkum poptávky a trendů

Najdi slova, která lidé v Česku opravdu píšou a ze kterých se dá dojít
k poptávce na vizeon.cz. Výsledek ulož do `workspace/keywords.json`.

## Semínka

Sestav **aspoň 30 semínek** z dat webu, ne z hlavy (všechny služby + aspoň
6 oborů, každý týden jiných):
- služby a ceny: `lib/data/pricing.ts`, `lib/data/automation-pages.ts`, `lib/data/zakaziq.ts`
- obory: `lib/data/industries.ts` (např. „web pro {obor}“, „jak získat zákazníky {obor}“,
  „kolik stojí web pro {obor}“, problémy oboru, které web nebo automatizace řeší)
- otázky a problémy majitelů malých firem (cena, srovnání, „jak na“, „proč nefunguje“)
- slova, která už v `workspace/keywords.json` rostou

Každý týden vezmi jinou část oborů, ať se databáze postupně rozšiřuje.

## Data (v tomhle pořadí)

1. **DataForSEO MCP** (nástroje `mcp__dataforseo__*`, když jsou k dispozici).
   Česko: `location_code` 2203, `language_code` "cs". Postup: návrhy slov k semínkům
   (Google Ads keywords_for_keywords nebo DataForSEO Labs keyword ideas), hromadně
   hledanost (search_volume, jeden dotaz pro všechna slova), obtížnost, kde je
   (Labs bulk keyword difficulty), a Google Trends pro 5–10 nejzajímavějších slov
   (posledních 12 měsíců, CZ) kvůli směru trendu. Rozpočet na běh max 0,50 USD,
   cenu každého volání si sečti a zapiš do logu.
2. **Bez DataForSEO** (a vždy jako doplněk) dva našeptávače přes WebFetch:
   - Google: `https://suggestqueries.google.com/complete/search?client=firefox&hl=cs&gl=cz&q=<semínko>`
   - Seznam: `https://suggest.seznam.cz/fulltext/cs?phrase=<semínko s diakritikou>&count=10`.
     U každého návrhu vrací `userData._count` (kolikrát se hledal) a `_ip_count`
     (kolik různých lidí). Je to vzorek Seznamu, ne měsíční hledanost, ale dobře
     řadí slova podle zájmu. Ulož jako `"seznam": { "count": 23, "ipCount": 17 }`.
   Krátká semínka (2–3 slova, s diakritikou) vracejí víc než dlouhé věty. Každé
   semínko zkus i v tvarech „kolik stojí …“, „jak …“, „… cena“, „proč …“.
   Co je v našeptávači, lidé opravdu hledají. Doplň WebSearch (otázky lidí,
   diskuze). Hledanost nech `null`, do `sources` napiš "autocomplete:google"
   nebo "autocomplete:seznam".
   **Cíl běhu: aspoň 40 nových nebo aktualizovaných slov.** Když se to nedaří,
   přidej další semínka, nekonči dřív.
3. Search Console, když jsou data v `workspace/gsc/` (export od majitele).

## Výstup: workspace/keywords.json

```json
{ "updated": "YYYY-MM-DD",
  "items": [{
    "keyword": "kolik stojí e-shop",
    "volume": 320, "kd": 18, "cpc": 1.2,
    "trend": "roste | stabilní | klesá | nové", "trendNote": "+40 % meziročně",
    "intent": "informační | srovnávací | cenový | návod | nákupní",
    "service": "/sluzby/tvorba-e-shopu",
    "variants": ["kolik stojí vytvoření e-shopu"],
    "seznam": { "count": 23, "ipCount": 17 },
    "sources": ["dataforseo:search_volume", "autocomplete"],
    "firstSeen": "YYYY-MM-DD", "lastChecked": "YYYY-MM-DD",
    "status": "nové | kandidát | ve frontě | článek | nevhodné"
  }] }
```

Slova neduplikuj (sjednoť tvary a varianty pod jedno hlavní). Nemaž historii,
jen aktualizuj čísla a `lastChecked`. Max 600 položek, nejstarší nevhodné vyhoď.
`status: "článek"` mají slova z `content/blog/*.mdx`, `"ve frontě"` slova
z `content/blog/_fronta.json`.

## Pravidla

- Nic nevymýšlej. Číslo bez zdroje = `null`.
- České dotazy s malou hledaností (10–50) jsou u služeb pro živnostníky normální
  a často nejsnáz k mání, nevyhazuj je.
- Nákupní dotazy („tvorba webu Praha“) patří prodejním stránkám, ne blogu.
  Označ je `intent: "nákupní"`, stratég je na články nebere.
- Na konec připiš do `workspace/log.md` (nahoru) záznam: datum, zdroj dat,
  kolik slov přibylo, top 10 rostoucích, náklady.
