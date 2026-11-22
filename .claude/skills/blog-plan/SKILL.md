---
name: blog-plan
description: Plánování článků na blog vizeon.cz s majitelem. Výzkum klíčových slov (Ahrefs MCP, Search Console, případně ruční čísla), kontrola záměru hledání a kanibalizace, návrh osnovy a zápis schválených témat s termíny (ne/st/pá 14:00) do content/blog/_fronta.json. Použij při „/blog-plan“, „naplánuj články“, „najdi témata na blog“ nebo když fronta schválených témat dochází.
---

# Plán článků na blog

Interaktivní krok s majitelem. Automat (`.github/workflows/blog-write.yml`)
píše jen témata, která tady majitel schválí. Ahrefs se volá jen odsud, ne
z GitHub Actions (Ahrefs nepovoluje volat své MCP ze skriptů).

## 1. Stav

```bash
npm run blog:queue -- list          # co je ve frontě
npm run blog:queue -- slots 9       # volné termíny (ne/st/pá 14:00)
grep -h '^keyword:' content/blog/*.mdx
```

Projdi i prodejní stránky (`lib/data/industries.ts`, `app/sitemap.ts`), na
která slova cílí. Článek nesmí cílit na slovo prodejní stránky
(„web pro instalatéry“ patří `/web-pro-instalatery`, článek bere třeba
„kolik stojí web pro instalatéra“ nebo „jak získat zakázky jako instalatér“).

## 2. Data

1. **Ahrefs MCP** (ověř přes ToolSearch „ahrefs“). Země `cz`. Pro každé
   semínko: přehled slova (hledanost, KD, traffic potential, parent topic),
   příbuzná slova a otázky, SERP overview první desítky. Pro vizeon.cz organická
   slova na pozicích 11–30 (nejrychlejší výhry). Šetři jednotky: víc slov
   v jednom dotazu, nejdřív přehled, detail jen u kandidátů. Tarif Lite má
   25 000 jednotek měsíčně a 10 řádků na dotaz.
2. **Search Console** (export od majitele nebo konektor): dotazy s
   impresemi a pozicí 8–30 a stránky, které klesají.
3. Bez Ahrefs: skill `seo-collabim-keyword-loop` (majitel ověří čísla
   v nástroji) a WebSearch pro formát výsledků.

České dotazy s malou hledaností (0–50) neber jako mrtvé. U služeb pro
živnostníky je to normální a takové slovo bývá nejsnáz k mání.

## 3. Výběr

- Záměr vede k penězům: informační nebo srovnávací dotaz, ze kterého je
  přirozený krok na prodejní stránku (`targetPage`) a poptávku.
- KD nízké (web je mladý), parent topic se nekryje s existující stránkou.
- Jedno hlavní slovo na článek, příbuzné varianty do `secondaryKeywords`.
- Formát podle první desítky výsledků (návod, srovnání, ceník, seznam).
  Když Google ukazuje jen prodejní stránky, článek nemá šanci, téma vyřaď.
- Střídej obory a služby, ať každý týden posílí jinou prodejní stránku.

## 4. Probrat s majitelem

Ukaž tabulku kandidátů: slovo, hledanost, KD, záměr, formát SERP,
`targetPage`, pracovní titulek. U vybraných navrhni osnovu (5–8 H2 jako
otázky), 3–5 FAQ, interní odkazy a fakta, ze kterých článek bude čerpat
(`content/blog/_fakta.md`, datové soubory). Nic nezapisuj jako schválené,
dokud to majitel neodsouhlasí.

## 5. Zápis

Schválená témata zapiš do `content/blog/_fronta.json` (pole viz existující
položky): `status: "schvaleno"`, `publishAt` z `npm run blog:queue -- slots`,
čísla z Ahrefs do `volume`, `kd`, `source` (s datem). Zamítnutá témata nech
se `status: "zamitnuto"`, ať se nenavrhují znovu. Pak `npm run blog:check`.

Automat píše vždy v úterý, čtvrtek a sobotu ráno témata, která vycházejí
v příštích 4 dnech, a otevře PR. Fronta by měla mít schválené termíny
aspoň na 2 týdny dopředu.
