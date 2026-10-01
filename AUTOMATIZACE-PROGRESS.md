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
- [ ] S1 Základ portu
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
