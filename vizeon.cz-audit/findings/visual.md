# Vizuál a mobil: vizeon.cz

Audit 21. 11. 2026, vestavěný prohlížeč (Chromium), viewporty 1440×900, 800×600 a 375×812 (mobilní emulace).

**Omezení měření:** panel prohlížeče byl během testu skrytý, takže stránka běžela jako tab na pozadí a časování animací i naměřené LCP (4,5 s na homepage při TTFB 39 ms) nejsou spolehlivé. Výkonová čísla ber z `performance.md` (PageSpeed Insights). Screenshoty se do složky `screenshots/` neukládaly, nástroj je vrací jen do konverzace.

## Co funguje

- Na 375 px žádný vodorovný posun (`scrollWidth` = 375). Prvky, které přesahují, jsou karty karuselu uvnitř kontejneru s `overflow: hidden`.
- Viewport meta je v pořádku: `width=device-width, initial-scale=1`.
- H1 je na mobilu nahoře v prvním výřezu (top 139 px), na desktopu je hero s H1 a dvěma CTA celé nad ohybem.
- Na desktopu má hlavička trvale viditelné CTA „Konzultace zdarma“.
- Úvodní intro se na mobilu (< 768 px), při `prefers-reduced-motion` a při druhé návštěvě v session nepouští (`components/IntroAnimation.tsx:37-50`). Nález z auditu ze září je tedy opravený.
- Vstup hero textu běží v CSS (`.hero-in`, start z opacity 0.01), ne přes JS, takže LCP nečeká na hydrataci (`app/globals.css:390`).
- Oborové stránky (např. /web-pro-remeslniky) mají nad ohybem H1, cenu „od 9 999 Kč“, CTA a mockup telefonu.

## Nálezy

### [Info] Telefon není v HTML ani jako odkaz `tel:` na žádné ze 67 stránek (vědomé rozhodnutí)
- **Důkaz:** 0 odkazů `tel:` v serverovém HTML. Číslo se ukáže až po kliknutí (`components/PhoneReveal.tsx:34`). Telefon byl z webu stažen záměrně (commit c63dfa7).
- **Trade-off:** Pro personu „řemeslník 45+“ znamená volání krok navíc a NAP pro vyhledávače je pak neúplné. Rozhodnutí respektuji. Pokud se někdy vrátí, stačí odkaz `tel:` na /kontakt a v patičce a `telephone` ve schema.

### [Low] Malé dotykové cíle mimo běžný text
- **Důkaz (375 px):** „Automatizace →“ 94×15 px, „Celý postup“ 267×18, „Vše o webech →“ 124×18, domény projektů v kartách portfolia (např. `u-cerhu.cz`) 89×20, logo v hlavičce 83×18.
- **Oprava:** Samostatně stojícím odkazům dej `min-height: 24px`, ideálně 44 px (WCAG 2.5.8). Odkazy uvnitř věty jsou výjimka.

### [Low] 24 odstavců nebo položek seznamu má na mobilu písmo menší než 12 px
- **Oprava:** Projdi drobné štítky a popisky. Běžný text drž na 14 px a víc, popisky aspoň na 12 px.
