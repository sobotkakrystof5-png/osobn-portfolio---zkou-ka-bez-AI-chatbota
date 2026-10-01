# Stav práce: Automatizace v navbaru + podstránky

Dokument zadání: PROMPT-AUTOMATIZACE-PODSTRANKY.md
Referenční klon: `~/alteno-ref` (= `/Users/krystofsobotka/alteno-ref`, HEAD `0cc5e19`, bez `node_modules`)
Větev: feat/automatizace-alteno

## Základní stav (S0)
- git: rozdělaná práce (18 upravených + nové soubory hubu a spolubrandingu) zacommitovaná,
  checkpoint commit: **ano, `7c490a9`** („feat(automatizace): rozpracovaný hub /automatizace a
  spolubranding ALTENO (checkpoint)"). Pracovní strom byl po commitu čistý.
- npm run build: **prošel** (Next 16.2, 116 statických stránek, kompilace ~5,5 s). Jediné hlášení je
  stávající `Warning: Custom Cache-Control headers detected…` (starý stav, nechat).
- npm run lint: **nepodporováno**. `next lint` v Next 16 neexistuje, příkaz skončí
  `Invalid project directory provided, no such directory: …/lint`. Lint se jako brána nepoužívá.
- npx tsc --noEmit: **0 chyb** (čistý základ, každá chyba v dalších sessions je nová).
- Analytika pro scény: **použije se `useTrackClick(page)`** z `hooks/useAnalytics.ts`, volané jako
  `trackClick("demo_scene_played", "<kind>", "<variantId>")` (zapíše `event_type: "click"`,
  `element: "demo_scene_played"`). **Nepoužívat `useAnalytics(page)`** uvnitř scény: při mountu
  posílá `page_view` a přidává scroll listener, takže by duplikoval událost stránky, kterou už posílá
  `AnalyticsTracker`. Žádný nový backend.
- Ověřené předpoklady §1.4: `app/web-pro-remeslniky`, `app/web-pro-ucetni`,
  `app/web-pro-realitni-maklere` existují; `tailwind.config.ts` má `accent` `#c9a84c`,
  `accent-hover` `#d4b968`, `accent-dim`.
- Inventura klonu (§1.5): **všechny počty řádků sedí přesně** s tabulkou (172, 583, 597, 786, 227,
  557, 474, 603, 370, 600, 1352, 129, 48, 64, 430, 130, 30, 562). Navíc: `AltenoWordmark.tsx` 127 ř.,
  `ServiceArtwork.tsx` 409 ř. (S5), `app/globals.css` 693 ř. V `public/` jsou `alteno-logo.png`,
  `alteno-logo-claim.png`, `vizeon-logo.png`.
- Přečteno: `ALT/claude.md` §5 (design + pohyb), `ALT/sluzby-sceny-prompt.md`,
  `ALT/podstranky-vizual-prompt.md`.

## Checklist
- [x] S0 Příprava
- [x] S1 Základ portu
- [ ] S2 Data + detail + Telefon
- [ ] S3 Chat, Flow, Konzole
- [ ] S4 Ilustrace + detail
- [ ] S5 Hub, SEO, sitemap
- [ ] S6 Navbar + dropdown
- [ ] S7 Co-branding
- [ ] S8 Napojení, úklid, QA

## Deník sessions
### S0 (2026-10-01)
- Hotovo: klon `~/alteno-ref`, checkpoint commit `7c490a9`, základní stav buildu/lintu/tsc,
  ověření předpokladů, inventura klonu, rozhodnutí o analytice, tento soubor. Kód aplikace beze změny.
- Neověřeno (a proč): nic z kritérií S0 nezůstalo neověřené.
- Odchylky od zadání a důvod: navíc zapsán základ `tsc --noEmit` (S1 ho vyžaduje jako bránu
  „žádné nové chyby").
- Pro další session (S1):
  - Klon **nemá `node_modules`**. Path řetězce 6 log pro `demo-tools.ts` získej bez instalace do
    projektu, např. ve scratchpadu: `npm pack simple-icons@16.27.0` a
    `npm pack @fortawesome/free-brands-svg-icons@7.3.1`, rozbalit a vyčíst `path` pro gmail, shopify,
    quickbooks, typeform, hubspot (simple-icons) a slack (FA brands). Verze odpovídají `ALT/package.json`.
  - Alteno pravidlo, které se hodí znát: „na jednom snímku scény svítí akcentem nejvýš dva prvky"
    (`ALT/podstranky-vizual-prompt.md` §3) a „CSS animace transform se nesmí kombinovat s
    `translate-*`/`scale-*`/`rotate-*` na stejném elementu".
- Navržená commit zpráva: `chore(automatizace): přidat AUTOMATIZACE-PROGRESS.md se základním stavem (S0)`

### S1 (2026-10-01)
- Hotovo:
  - `components/automation/` (nový): `useSceneScript.ts`, `usePrefersReducedMotion.ts`,
    `process-icons.tsx` (35 glyfů), `demo-icons.ts`, `ArtworkFrame.tsx` zkopírované přes `cp` z klonu,
    upravené jen importy a hlavičkové komentáře (původ portu). Konstanty enginu (`PACKET_HALF = 13`,
    `RIGHT_INSET = 34`, `DEFAULT_FLIGHT_MS = 520`, `FADE_MS = 200`, `TYPE_TICK_MS = 18`,
    `TYPE_CHARS_PER_TICK = 2`, `threshold: 0.35`), vynucený reflow i komentáře k pastem beze změny.
    Žádné React 19 konstrukce v nich nebyly (grep `use(`, `useActionState`, `inert`, callback ref).
  - `demo-tools.ts`: 6 path řetězců vygenerovaných skriptem z `simple-icons@16.27.0` (gmail, shopify,
    quickbooks, typeform, hubspot) a `@fortawesome/free-brands-svg-icons@7.3.1` (`faSlack`,
    `viewBox 0 0 448 512`), staženo `npm pack` do scratchpadu. Hlavička uvádí zdroj a licence
    (CC0 / CC BY 4.0). Typ `DemoTool` a `DEMO_TOOLS` se stejnými klíči. Žádná závislost nepřibyla.
  - `ArtworkFrame.tsx`: barvy přemapované skriptem, `TURQUOISE`/`MINT` → `GOLD`/`GOLD_LIGHT`,
    `gradientUnits="userSpaceOnUse"` zachováno.
  - `app/globals.css`: nová sekce `/* ─── Automatizace (port z alteno) ─── */` na konci:
    `@keyframes voice-wave` + `.animate-voice-wave`, `.benefit-panel` (zlatý dozvuk zdola),
    `.benefit-lift` + hover, `.pain-panel` (neutrální teplá šedá se šrafováním, bez akcentu),
    `@keyframes pain-jolt` + `.group:hover .pain-jolt`, `@keyframes nav-panel-in` a blok
    `@media (prefers-reduced-motion: reduce)`.
  - `tailwind.config.ts`: `extend.keyframes` + `extend.animation` pro `voice-wave` a `nav-panel-in`.
  - Skript přemapování barev: `<scratchpad>/remap-colors.pl` (mimo repo). `--check` = suchý běh.
    Mapuje `brand-turquoise/mint`, `zinc-*` utility (holé `border-zinc-900/800/700` → `white/[0.06/0.08/0.12]`,
    ostatní na hex s opacity suffixem), `font-mono` → `font-inter uppercase tracking-[0.1em]`
    (varuje při duplicitním `uppercase`/`tracking`), `rounded-(xs|md|lg|xl|2xl|3xl)` vč. rohových
    → `rounded-sm`, hex literály zinc/tyrkys/máta/tmavě zelené a `rgba()` zinc/tyrkys/máta.
    **Scratchpad patří tomuto sezení, další session si skript musí vytvořit znovu** (pravidla jsou
    výše a v §2.2; případně si ho uživatel může nechat zkopírovat jinam).
- Kontroly: `grep zinc-|brand-turquoise|brand-mint|font-mono` v nových souborech prázdný; grep
  pastí TW4 (§3.1) prázdný; `npx tsc --noEmit` exit 0 (zahrnuje všech 7 nových souborů);
  `npm run build` prošel (116 stránek, jen stará hláška Cache-Control).
- Neověřeno (a proč): nic se zatím nevykresluje (soubory nikdo neimportuje), takže vzhled
  `ArtworkFrame` a CSS panelů se ověří až v S4/S5 v prohlížeči. Třídy `animate-voice-wave` a
  `animate-nav-panel-in` Tailwind vygeneruje až při prvním použití (S2/S6).
- Odchylky od zadání a důvod:
  1. `lib/data/automation-demos.ts` vznikl už teď, **jen s typem `DemoIcon`** (doslovná kopie
     z `ALT/lib/service-demos.ts` ř. 26 až 44, `TODO(S2)`). Bez něj by `demo-icons.ts` neprošel `tsc`.
     S2 soubor celý přepíše kopií klonu.
  2. `NODE_FILL` je `#111111` (token `bg-card`), ne `#0e0e0e`: tabulka mapuje podklad rámu i výplň
     uzlu na `#0e0e0e`, takže by uzly splynuly s podkladem. V alteno je uzel o chlup světlejší než
     podklad, `#111111` ten vztah drží.
  3. `.benefit-panel`/`.pain-panel` používají `rgba()` místo alteno `color-mix(... var(--color-zinc-…))`
     (VIZEON nemá ty proměnné ani `color-mix` nikde jinde). Poměry průhledností převzaté 1:1.
- Pro další session (S2):
  - Importy: glyfy z `@/components/automation/process-icons`, ikony scén `DEMO_ICONS` z
    `@/components/automation/demo-icons`, loga `DEMO_TOOLS` z `@/components/automation/demo-tools`,
    engine z `@/components/automation/useSceneScript`, `usePrefersReducedMotion` ze stejné složky.
  - `ArtworkFrame` exportuje `GOLD`, `GOLD_LIGHT`, `NODE_FILL` (v S4 přejmenovat importy
    `TURQUOISE`/`MINT` v Pain/Benefit/UseCase).
  - Skript přemapování barev si vytvoř znovu ve svém scratchpadu (popis výše).
- Navržená commit zpráva: `feat(automatizace): základ portu scén z alteno (engine, glyfy, loga nástrojů, CSS)`
