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
- [x] S2 Data + detail + Telefon
- [x] S3 Chat, Flow, Konzole
- [x] S4 Ilustrace + detail
- [x] S5 Hub, SEO, sitemap
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

### S2 (2026-10-01)
- Hotovo:
  - `lib/data/automation-pages.ts` (kopie `ALT/lib/services.ts`, strukturální změny skriptem): typy
    `BenefitArt`, `PainArt`, `Service` zachované; exporty `automationPages`, `getAutomationPage`.
    Slug `automatizace` → `automatizace-procesu`; pořadí **ai-agenti, automatizace-procesu,
    chatboti-rag, voice-agenti** (= pořadí ve VIZEON a v budoucím menu); `relatedArea` pryč z typu
    i dat; `relatedProKoho` → `relatedIndustries: {label, href}[]` (stejný tvar jako
    `lib/data/automation.tsx`), vypuštěny `e-shopy`, `vyrobni-firmy`; `relatedNastroje` →
    `tools: string[]` (neodkazované štítky vytažené z textu `whatWeConnect`: ai-agenti Claude,
    ChatGPT, n8n, Python, Docker; procesy n8n, Make, Python; chatboti Claude, ChatGPT; voice nic).
    Jediná pomlčka v textech (`seoTitle` Voice) → dvojtečka.
  - `lib/data/automation-demos.ts`: celá kopie `ALT/lib/service-demos.ts` (přepsal stub z S1), klíč
    `automatizace` → `"automatizace-procesu"`, komentáře přesměrované na cesty VIZEON. Texty beze změny
    (bez pomlček).
  - `components/automation/ServicePhone.tsx`: `cp` + skript barev + ruční úpravy: 5× duplicitní
    `uppercase`/`tracking` (ponecháno původní prostrkání předlohy), `transition-[opacity,translate]` →
    `[opacity,transform]` (3×), `duration-400` → `duration-[400ms]`, stín štítku `rgba(5,7,10)` →
    `rgba(0,0,0)`, importy, analytika `useTrackClick(usePathname())` →
    `trackClick("demo_scene_played", demo.kind, call.id)` (jen klik, ne autoplay, jako v předloze).
    Časování, fáze, waveform (pevné výšky), `min-h` rezervy, `flex-wrap`, reflow v enginu beze změny.
  - `app/automatizace/[slug]/page.tsx` (kostra): `generateStaticParams`, `generateMetadata` (title =
    `seoTitle`, šablona layoutu přidá „| VIZEON"; description = lead; absolutní canonical; openGraph),
    `notFound()`, `PageShell` s JSON-LD `BreadcrumbList` (Service + FAQPage až S4),
    `AnalyticsTracker`, hero bez reveal (zpět-odkaz, eyebrow „— Automatizace by ALTENO", štítek
    „Připravuji" u voice ve stylu z `AutomationAccordion`, H1 `t.h1`, lead `t.lead`), scéna
    `max-w-5xl` pod hlavičkou, `renderScene` jen s větví `phone` + `default: null` a `TODO(S3)`.
- Ověřeno:
  - Invarianty dat skriptem (`npx tsx` nad exporty): 4 služby, každá pain 4 / how 4 / benefits 5 /
    miniFaq 2–3 / useCases 3–4, 3 varianty scény, handoff/„mimo pravidla" v každé scéně, `caller`
    bez číslic, voice `comingSoon`, `FlowDemo.captions` = `how` titulky, žádná pomlčka ani cena.
  - `npx tsc --noEmit` 0 chyb; `npm run build` prošel, **120 stránek** (116 + 4 slugy).
  - Prohlížeč (Playwright, produkční `next start -p 3100`, Chromium):
    - Autoplay: při načtení mimo výřez (1440×380, 390×420) scéna stojí, po scrollu se sama spustí
      a přehraje 1. hovor. Na 1440×900 i 390×844 je scéna ve výřezu hned, takže se spustí rovnou.
    - Všechny 3 hovory na 1440 i 390 doběhnou (≈4,4–5,8 s), vlna běží jen během řeči a po hovoru
      stojí, 3. hovor ukáže chip předání (opacity 1).
    - Paket: odchylka dopadu od středu cíle 0,0–0,7 px; výjimka 12,4 px u prvního kliknutí na
      1440, kde najetí myší na scénu spouští `group-hover` změnu 3D náklonu (500 ms) a telefon se
      během letu posune. Paket i tak dopadne do telefonu; chování je shodné s předlohou.
    - 3D náklon: 1440 `matrix3d(...)`, 390 `none`. Horizontální scroll 0 px na 1440 i 390.
    - Reduced motion (1440 i 390): hned hotový stav, 0 letů paketu, vlna neběží, chip předání vidět.
    - Konzole: 0 chyb ve všech bězích.
    - Ostatní slugy 200 s H1 v SSR HTML a bez scény, neznámý slug 404, canonical absolutní.
  - Screenshoty: `<scratchpad>/pw/shots/phone-1440.png`, `phone-390.png` (+ `-reduced`).
- Neověřeno (a proč): šířky 768/1024/1280 jsem v S2 neprocházel (zadání chce 390 a 1440, plná matice
  je v S8). Klávesnice a fokus tlačítek hovorů zatím neověřeny (S8). Ověřováno jen v Chromiu.
- Odchylky od zadání a důvod:
  1. Název `automatizace-procesu` je „Automatizace procesů" (v alteno „Automatizace"): S6 generuje
     názvy položek dropdownu z `automationPages` a zadání tam chce „Automatizace procesů".
  2. `relatedIndustries` jsou objekty `{label, href}` (stejný tvar jako stávající
     `lib/data/automation.tsx`), ne holé URL, aby panel měl popisek čipu.
  3. Title stránky je `seoTitle` bez „| VIZEON" (zadání psalo `${seoTitle} | VIZEON`, ale layout
     přidává koncovku šablonou, vznikalo „| VIZEON | VIZEON").
- Nalezeno mimo rozsah S2 (pro S5): **hub `/automatizace` má titulek
  „Automatizace a AI pro majitele webu | VIZEON × ALTENO | VIZEON"** (dvojitá koncovka kvůli šabloně
  layoutu). Opravit v S5 při úpravách metadat hubu (např. `title: { absolute: … }`).
- Pro další session (S3):
  - Vzor pro scény je hotový `ServicePhone.tsx`: stejné kroky (cp → skript → duplicity
    uppercase/tracking → `transition-[opacity,translate]` → `[opacity,transform]` → `duration-400` →
    `duration-[400ms]` → importy → `track` → `useTrackClick(usePathname() ?? "")`).
  - Ověřovací skript Playwright je ve scratchpadu tohoto sezení (`pw/verify-phone.js`); v novém
    sezení je potřeba ho napsat znovu. Pozor na měření: po kliknutí počkat, až starý výsledek zmizí
    (přechod 400 ms), jinak se hlásí falešné „hotovo za 1 ms".
  - Na portu 3000 běží uživatelův `next dev`; ověřovat proti `next start -p 3100` po buildu, server
    před dalším buildem zastavit.
- Navržená commit zpráva: `feat(automatizace): data 4 služeb, kostra podstránky a scéna Telefon (voice-agenti)`

### S3 (2026-10-01)
- Hotovo:
  - `components/automation/ServiceChat.tsx` (chatboti-rag), `ServiceFlow.tsx` (automatizace-procesu),
    `ServiceConsole.tsx` (ai-agenti): `cp` z klonu → `remap-colors.pl` → stejné ruční kroky jako
    u Telefonu: 13× duplicitní `uppercase`/`tracking` po náhradě `font-mono` (ponecháno prostrkání
    předlohy), `transition-[opacity,translate]` → `[opacity,transform]` (Chat 2×, Flow 2×,
    Konzole 2×), `duration-400` → `duration-[400ms]` (Chat), stín štítku `rgba(5,7,10)` →
    `rgba(0,0,0)` (3×), malé štítky `rounded` → `rounded-sm` (Flow, Konzole), importy na
    `@/components/automation/*` a `@/lib/data/automation-demos`, `track(...)` →
    `trackClick("demo_scene_played", demo.kind, <id>)` (jen klik, ne autoplay). Hlavičky komentářů
    doplněné o původ portu, komentář `nodeTone()` o zlaté místo tyrkysové.
  - Časování beze změny (diff konstant proti klonu prázdný): Chat 300/460/240/420, Flow
    460/240/260/300/420, Konzole 620/260/420. Fáze, `missed`, rekurzivní `hop`, rám „Moje vrstva",
    `nodeTone()` (akcent jen `core`), `FlowLink` přes `scale`, `fromAnchor: "right"`, kroužek se
    `strokeDasharray="26 68"` a `animate-spin` jen při práci, fronta `overflow-x-auto` na mobilu,
    pasáž zdroje vždy v DOM, composer jako `aria-hidden` div: vše beze změny.
  - `app/automatizace/[slug]/page.tsx`: `renderScene` má všechny 4 větve a `default` zase přiřazuje
    do `never`. `TODO(S3)` pryč.
- Kontroly (§3.1/§3.2 grep, výsledek): `zinc-|brand-|font-mono` 0 výskytů; TW4 vzory
  (`transition-[…translate]`, `duration-400`, `rounded-xs…2xl`, `shadow-xs`, `outline-hidden`,
  `bg-linear`, `bg-(--`, `animate-in`, `translate-z/rotate-x/y/transform-3d`) 0 výskytů; holé
  `border` jen s barvou v obou větvích podmínky; React 19 konstrukce (`use(`, `useActionState`,
  `inert`, callback ref s cleanup) 0. `npx tsc --noEmit` 0 chyb. `npm run build` prošel, 120 stránek
  (jen stará hláška Cache-Control).
- Ověřeno v prohlížeči (Playwright, Chromium, `next start -p 3100`, skript `<scratchpad>/pw/verify-scenes.js`):
  - Autoplay: na 1440×380 a 390×420 (scéna mimo výřez / pod 35 %) se žádná scéna nespustí, po
    scrollu se spustí sama s 1. variantou. Na 1440×900 i 390×844 doběhne 1. varianta za 2,4–2,9 s.
  - Konzole (ai-agenti): všechny 3 případy doběhnou (fronta → let do jádra → psaní → kroky 4/3/3 →
    výsledek), „Dotaz mimo pravidla" končí „Předáno člověku". Paket dopadne do jádra (0–2 px).
  - Flow (automatizace-procesu): všechny 3 varianty, paket 3× uzel→uzel, každý dopad uvnitř uzlu
    (0–1 px), log 4 řádky. Po doběhu `tool:neutrál core:zlatý core:zlatý tool:neutrál`, během běhu
    se nikdy nerozsvítil zlatě `tool` uzel.
  - Chat (chatboti-rag): otázky 1 a 2 rozsvítí právě jeden zdroj (Obchodní podmínky, Doprava
    a expedice) a citace „Zdroj: …"; otázka 3 (`sourceId null`) letí do celého panelu, ukáže
    „v podkladech není", žádný zdroj nesvítí, chip „Předáno člověku…". Dopady uvnitř cíle (let
    zpět končí 24–35 px od středu široké bubliny odpovědi, ale uvnitř ní; shodné s enginem).
  - 3D náklon: 1440 ano, 390 `none`. Horizontální scroll 0 px na 1440 i 390 u všech tří.
  - Reduced motion (1440 i 390): výsledek hned (1–2 ms), 0 letů paketu, koncový stav včetně
    předání / „v podkladech není".
  - Konzole prohlížeče: 0 chyb, kromě jednoho běhu (chat 390 reduced), kde padly 3 síťové chyby
    `ERR_NETWORK_CHANGED / ERR_INTERNET_DISCONNECTED` (výpadek sítě stroje během testu, externí
    zdroje, ne kód scény).
  - Screenshoty: `<scratchpad>/pw/shots/{ai-agenti,automatizace-procesu,chatboti-rag}-{1440,390}[-reduced].png`.
- Neověřeno (a proč): šířky 768/1024/1280 a klávesnice/fokus tlačítek variant (plná matice je v S8).
  Jen Chromium.
- Odchylky od zadání a důvod: žádné věcné. Komentáře v kódu si ponechaly pomlčky z předlohy (jako
  u Telefonu v S2), pravidlo §2.3 se týká viditelných textů a ty pomlčky nemají.
- Postřeh pro majitele (beze změny kódu): logo Typeform ve Flow je drobné, protože ikona
  `simple-icons` je celý nápis vtěsnaný do čtverce 24×24. Je to stejný zdroj jako na alteno.cz,
  takže to není chyba portu. Případná úprava (např. širší `viewBox`/velikost jen pro Typeform) by
  byla vědomá odchylka od předlohy, rozhodne uživatel.
- Pro další session (S4):
  - S2 a S3 jsou zatím **nezacommitované** (viz git status). Před S4 je potřeba commit.
  - Skripty: `remap-colors.pl` a `pw/` jsou ve scratchpadu tohoto sezení
    (`/private/tmp/claude-501/-Users-krystofsobotka-Desktop-VIZEON--vizeon/feb152d3-1f7d-46a1-a075-76da68b7cf42/scratchpad/`);
    nové sezení si je může zkopírovat odtud (pokud scratchpad ještě existuje), jinak napsat znovu.
  - V S4 přibudou pod scénu sekce; scéna už má svůj `max-w-5xl` obal v `page.tsx`, nepřesouvat ho.
- Navržená commit zpráva: `feat(automatizace): scény Chat, Flow a Konzole na zbylých třech podstránkách`

### S4 (2026-10-01, stejné sezení jako S3 na pokyn uživatele „pokračuj")
- Hotovo:
  - `components/automation/PainArtwork.tsx`, `BenefitArtwork.tsx`, `UseCaseArtwork.tsx`: `cp` z klonu
    + `remap-colors.pl`. SVG cesty beze změny. Přemapované jen konstanty (`HI/MID/LOW/FILL` Pain →
    `#e0dbd2/#8a8070/#4a4339/#0e0e0e`; Benefit `T/M` → `GOLD/GOLD_LIGHT`, `DIM/FAINT` →
    `#4a4339/#3d3830`), pár tříd glyfů (`text-zinc-*` → hex, `text-brand-*` → `text-accent(-hover)`)
    a `rounded-xl` panelů → `rounded-sm`. Importy `TURQUOISE/MINT` → `GOLD/GOLD_LIGHT`, cesty na
    `@/components/automation/*`, `@/lib/data/automation-pages`, `@/lib/data/automation-demos`.
    Oba zůstávají serverové, `SCENES: Record<…>` zachované. Komentáře: hlavička o původu portu,
    zmínky `zinc-…` a „mátová" přepsané (grep čistý).
  - `components/automation/Reveal.tsx` (nový, klientský): framer-motion `fadeUp` + `viewport`
    kolem sekcí serverové stránky. Viz odchylka 2 (reduced motion).
  - `app/automatizace/[slug]/page.tsx` dokončená v pořadí §1.5: Co vás dnes zdržuje (karty `group`
    s PainArtwork) → Jak to funguje (`<ol>` s kolečky `-left-14`) → Pro koho / Co propojím (panely,
    `relatedIndustries` jako odkazové čipy, `tools` jako neodkazované štítky, prázdné pole = jen text)
    → Kde se to nejvíc vyplatí (`glass-panel` karty s `UseCaseArtwork`, lichá poslední přes
    `sm:col-span-2`) → Co získáte (bento `lg:grid-cols-6`, 5 přínosů, `01 / 05`) → Časté otázky
    (statické h3/p) → `ClosingCTA` („Zní to jako něco, co byste využili?") → odkaz na ceník
    a zpět na `/automatizace`. Hero a scéna bez reveal. JSON-LD `@graph`: BreadcrumbList, Service
    (provider jako na hubu), FAQPage z `miniFaq`.
  - `app/automatizace/[slug]/opengraph-image.tsx`: `buildOgImage(title, "ALTENO × VIZEON")`
    + `generateStaticParams` (vzor z `app/blog/[slug]`).
- Ověřeno:
  - `npx tsc --noEmit` 0 chyb; `npm run build` prošel, 124 stránek (+4 OG obrázky), jen stará
    hláška Cache-Control.
  - SSR (curl na `next start -p 3100`, bez JS): u všech 4 slugů je v HTML H1, lead a **všechny**
    texty pain/how/panelů/use cases/benefits/FAQ (0 chybějících); JSON-LD se parsuje
    (`BreadcrumbList, Service, FAQPage` + globální z layoutu), FAQ v JSON-LD = viditelný text 1:1;
    všech 24 interních odkazů na stránkách vrací 200.
  - OG obrázky 4× 200 `image/png`, `og:image` v meta; nejdelší titulek „Automatizace procesů" se vejde.
  - Prohlížeč (Playwright, `pw/verify-detail.js`), 1440/1024/390 + 390 reduced, všechny 4 slugy:
    Pain panely 0 zlatých prvků, Benefit panely 6 až 53 zlatých prvků; hover na kartu Pain spustí
    `pain-jolt`, hover na Benefit zvedne `.benefit-lift` o 4 px (pod reduced motion `none`);
    bento 1440 a 1024 = hlavní karta 4/6 s obrázkem vlevo + 1 + 3, 390 = jeden sloupec s obrázky
    nahoře; kolečka kroků na lince (střed 1 px), na 390 uvnitř obsahu kontejneru (25 vs 24 px);
    žádný prázdný panel ilustrace; horizontální scroll 0; konzole bez chyb. Po úpravě stránky
    znovu prošly scény chatu (1440/390, normál i reduced).
  - Screenshoty celých stránek: `<scratchpad>/pw/shots/detail-<slug>-<šířka>.png`.
- Neověřeno (a proč): šířka 768 a 1280, klávesnice a fokus (S8). Vizuálně jsem prošel jen
  výřezy chatboti-rag 1440 a voice-agenti 390, ostatní kombinace jen měřením skriptem. Jen Chromium.
- Odchylky od zadání a důvod:
  1. „Jak to funguje": seznam má `ml-4 sm:ml-0`. Bez toho kolečko na mobilu sahá 1rem do okraje
     kontejneru; zadání povolilo úpravu jen pro `<sm`, od `sm` je to 1:1 s předlohou.
  2. **`Reveal` pod reduced motion nepoužívá vzor z `AltenoBand.tsx`** (`initial={reduced ? false : …}`).
     Ten vzor je rozbitý: SSR vždy vyrenderuje `opacity: 0` (na serveru `useReducedMotion()` = null)
     a klient pod reduced motion animaci vypne, takže inline `opacity: 0` nikdo nepřepíše a obsah
     zůstane navždy neviditelný. Změřeno: první verze měla pod reduced motion 7 ze 7 sekcí skrytých.
     `Reveal` má proto vždy stejné `initial`/`whileInView` a pod reduced motion jen varianty bez
     posunu s nulovou délkou. Teď 0 skrytých sekcí.
  3. Karty Pain/Benefit/panely mají `bg-[#080808]` + `border-white/[0.06]` (alteno `zinc-950` podle
     tabulky §2.2), use cases `glass-panel` místo alteno `GlowCard`. Nadpisy sekcí `t.h2Page`, panely
     menší (`text-[24px] md:text-[28px]`), hlavní přínos Cormorant místo tučného Inter.
  4. Mezi CTA a odkazy chybí alteno věta „jak spolupráce probíhá" a odkaz na „oblast": zadání pro
     S4 chce jen odkaz na ceník a zpět na hub; `relatedArea` se ruší už v S2.
- **Nalezená chyba mimo rozsah (pro S5 a S7): `components/AltenoBand.tsx` (homepage) a
  `components/AutomationFAQ.tsx` (hub) mají stejný rozbitý reduced-motion vzor.** Ověřeno na
  homepage: pod `prefers-reduced-motion: reduce` má nadpis pásu ALTENO efektivní opacity 0
  (neviditelný), bez reduced motion 1. Oprava = stejný postup jako v `Reveal` (nebo rovnou použít
  `Reveal`). S5 opraví `AutomationFAQ`, S7 `AltenoBand` (obě sessions ty soubory stejně upravují).
- Souběžné změny v pracovním stromu, které **nejsou z této práce** (objevily se během sezení, 1 až 4
  řádky, nejspíš nový claim loga „Vize. Vývoj. Výsledky."): `PROMPT-AUTOMATIZACE-PODSTRANKY.md`,
  `app/gdpr`, `app/layout.tsx`, `app/page.tsx`, `app/podminky`, `app/tvorba-webu-pro-zivnostniky`,
  `components/Footer.tsx`, `Hero.tsx`, `IntroAnimation.tsx`, `Navbar.tsx`, `pillar/PillarChrome.tsx`,
  `mobile-version-kontext.md`. Do commitů automatizace je nepřidávat.
- Pro další session (S5):
  - Hub: náhledy karet z `ALT/components/motion/ServiceArtwork.tsx` (409 ř.), `id` parametrem.
    `UseCaseArtwork` ukazuje vzor dvou vrstev s `ArtworkFrame`.
  - Hub JSON-LD `hasOfferCatalog` dnes míří na `/automatizace#<id>`; přepsat na podstránky.
  - Opravit dvojitý titulek hubu (viz S2) a reduced-motion chybu v `AutomationFAQ.tsx` (výše).
  - Na sekce lze použít `components/automation/Reveal.tsx`.
- Navržená commit zpráva: `feat(automatizace): ilustrace a všechny sekce podstránek služeb (S4)`

### S5 (2026-10-01, stejné sezení jako S3 a S4)
- Hotovo:
  - `components/automation/ServiceArtwork.tsx`: `cp` z `ALT/components/motion/ServiceArtwork.tsx`,
    `TURQUOISE/MINT` → `GOLD/GOLD_LIGHT`, výplň uzlů `"#0b1215"` → `{NODE_FILL}` (v alteno je to
    přesně hodnota `NODE_FILL`), klíč mapy `automatizace` → `"automatizace-procesu"`, nový volitelný
    prop `id` (default `svc-<slug>`), hub ho předává explicitně. SVG cesty beze změny.
  - `app/automatizace/page.tsx`: místo `<AutomationAccordion />` grid 4 karet (`grid-cols-1
    sm:grid-cols-2`, `max-w-5xl`), celá karta je `Link` na `/automatizace/<slug>`, nahoře
    `ServiceArtwork` (`h-32 sm:h-36`), název jako h2, pořadí `01…04`, summary pod linkou,
    „Zjistit víc →", u voice štítek „Připravuji", `ai-agenti` zvýrazněná
    (`border-[rgba(201,168,76,0.2)]`), `group` + `card-shimmer-line`, hover zlatý rámeček a nadpis.
    Grid v `Reveal`. Ostatní sekce hubu beze změny. Import `AutomationAccordion` pryč (soubor
    zůstává do S8). Titulek `title: { absolute: … }`, takže už není dvojité „| VIZEON" (komentář
    o frázích ALTENO zachován). JSON-LD `hasOfferCatalog` URL → `/automatizace/<slug>`.
  - `lib/data/automation.tsx`: `AUTOMATION_SERVICES` bere `title`, `summary` a `status` z
    `automation-pages.ts` přes `fromPage(id)` (chybějící podstránka shodí build při načtení
    modulu). `priceNote`, `altenoPath`, `cta`, ikony a zbytek polí zůstaly. Komentář u `id`:
    slug podstránky + suffix UTM, ne kotva.
  - `app/sitemap.ts`: 4 položky z `automationPages` (`0.7`, `monthly`, `2026-10-01`), `/automatizace`
    ponecháno na `0.8`, jeho `lastModified` posunut na `2026-10-01` (obsah hubu se změnil, pravidlo
    v hlavičce souboru).
  - `app/automatizace/opengraph-image.tsx`: podtitulek „ALTENO × VIZEON" (stejně jako podstránky),
    alt „… | ALTENO × VIZEON".
  - **Oprava reduced motion** (nalezeno v S4): nová sdílená varianta `revealInstant` v
    `lib/animations.ts` (s komentářem proč), použitá v `components/automation/Reveal.tsx`
    a v `components/AutomationFAQ.tsx` (dřív pod reduced motion neviditelné FAQ hubu).
- Ověřeno (`next start -p 3100`, `pw/verify-hub.js`):
  - `npx tsc --noEmit` 0, `npm run build` prošel (124 stránek).
  - SSR hubu: `<title>` „Automatizace a AI pro majitele webu | VIZEON × ALTENO" (jednou), HTML
    obsahuje `href` na všechny 4 podstránky, žádný accordion; JSON-LD nabídky míří na 4 podstránky.
  - `/sitemap.xml` obsahuje všechny 4 nové URL (ověřeno na produkčním buildu, ne `npm run dev`).
  - Prohlížeč 1440/1024/390 + 390 reduced: 4 karty ve 2 sloupcích (390 v jednom), voice má
    „Připravuji", zvýrazněná karta má zlatý rámeček, hover: rámeček `0.06 → 0.45` zlatá, nadpis
    zlatý, shimmer linka `scaleX(1)`; klik na každou ze 4 karet vede na správnou podstránku
    se správným H1; po scrollu 0 skrytých karet ani položek FAQ i pod reduced motion;
    horizontální scroll 0; konzole bez chyb.
  - Screenshoty: `<scratchpad>/pw/shots/hub-grid-1440.png`, `hub-grid-390.png`.
- Neověřeno (a proč): 768/1280 a klávesnice (S8). Jen Chromium.
- Odchylky od zadání a důvod:
  1. Ikony služeb zůstaly v `automation.tsx` (lucide), `automation-pages.ts` žádné ikony nemá,
     takže „zdroj ikony" odtud převzít nejde. Hub je stejně nepoužívá (karty mají ServiceArtwork).
  2. Summary a názvy na hubu jsou teď z alteno dat (např. „Zastane celou agendu, ne jeden krok.
     Rozhoduje podle vašich dat a pravidel." místo dřívějšího „Zvládnou celou agendu, ne jen jeden
     krok.", „Automatizace procesů" místo „Automatizace"). Plyne to z bodu 3 zadání; stejné texty
     teď čte i JSON-LD hubu.
  3. Sitemap bere slugy z `automationPages` místo vypsaného pole (stejně jako blog a portfolio).
- Postřeh mimo rozsah: chat widget n8n (`components/N8nChatWidget.tsx`) po hydrataci vkládá
  `<h1>VIZEON</h1>` (hlavička okna chatu) na každou stránku webu, takže v DOM jsou dvě H1. V SSR
  HTML je H1 jen jeden. Řešení by bylo v konfiguraci/CSS widgetu, ne v automatizaci; rozhodne uživatel.
- Pro další session (S6): `lib/nav.ts`, `NavDropdown`. Položky dropdownu Automatizace lze generovat
  z `automationPages` (pořadí ai-agenti, automatizace-procesu, chatboti-rag, voice-agenti,
  `comingSoon` u voice). Souběžné změny uživatele v `components/Navbar.tsx`, `Footer.tsx` (nový
  claim) jsou v pracovním stromu nezacommitované, S6 na ně bude navazovat; před S6 je potřeba,
  aby je uživatel zacommitoval nebo potvrdil, že se s nimi má pracovat.
- Navržená commit zpráva: `feat(automatizace): hub jako přehled 4 služeb, JSON-LD a sitemap podstránek (S5)`
