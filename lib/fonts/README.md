# Fonty pro OG obrázky

Statické TTF řezy jen pro generování náhledových obrázků pro sdílení
(`lib/ogImage.tsx`). Web sám je nepoužívá — ten si Cormorant a Inter tahá přes
`next/font/google` v `app/layout.tsx`.

Proč tu leží jako soubory: `next/og` (satori) neumí woff2 ani `next/font`,
potřebuje syrová data TTF. Stahovat je při buildu ze sítě by znamenalo, že
build spadne, až bude Google Fonts nedostupné.

| Soubor | Řez | Zdroj |
|---|---|---|
| `CormorantGaramond-Light.ttf` | Cormorant Garamond 300 | Google Fonts (v21) |
| `Inter-Regular.ttf` | Inter 400 | Google Fonts (v20) |

Obě rodiny jsou pod **SIL Open Font License 1.1**
(<https://openfontlicense.org>), která vložení do webového projektu a jeho
distribuci dovoluje. Soubory jsou nezměněné originály z `fonts.gstatic.com`.

Při aktualizaci stáhni znovu z Google Fonts CSS API s `format('truetype')` —
ne woff2 — a nech názvy souborů stejné.
