# Migrace VIZEON: one-pager → vícestránkový web

> **Pracovní dokument.** Rozdělený na fáze tak, aby šlo pracovat paralelně ve víc sessions bez ztráty kontextu.
> Každá fáze je samostatně spustitelná i nasaditelná — web je funkční po každém kroku.

---

## Princip

**Veškerý obsah už existuje** jako sekce na home. Tohle **není psaní nového obsahu** — je to převod stávajících sekcí na samostatné URL.

- Struktura (pořadí sekcí, eyebrow + H1 + tělo + closing CTA) se přebírá ze `craftsman-site-layout.md`
- **Vizuál zůstává současný** — tmavě-zlatá paleta, Cormorant/Inter, glass-panel karty. Nic se nepředělává vizuálně.
- Nedělá se: `/portfolio/[slug]` detaily projektů, galerie, product-detail stránka

## Cílová struktura URL

| Route | Obsah (dnešní sekce) | Nav |
|---|---|---|
| `/` | Hero + SocialProof + **HomeExplore** (nový rozcestník) + Contact | — |
| `/o-mne` | `About` | O mně |
| `/sluzby` | `Services` + `HowItWorks` | Služby |
| `/reference` | `Portfolio` + `Testimonials` | Reference |
| `/cenik` | `Pricing` *(už existuje)* | Ceník |
| `/zakaziq` | `ZakazIQ` | ZakazIQ |
| `/kontakt` | `Contact` + `FAQ` | Kontakt |

Beze změny: `/gdpr`, `/podminky`, `/tvorba-webu-pro-zivnostniky`, 10× `/web-pro-*`, `/admin`, `/admin-setup`.

---

## Pravidla pro paralelní práci

**FÁZE 0 musí být hotová první** — všechno ostatní na ní staví.

Potom lze paralelně: **F1, F2, F3, F4, F5** (každá vlastní svoje soubory, nekolidují).
Potom sériově: **F6 → F7 → F8**.

### Vlastnictví souborů

| Soubor | Vlastní fáze | Pozn. |
|---|---|---|
| `lib/nav.ts`, `lib/ui.ts`, `components/layout/*` | **F0** | Po F0 už jen číst, needitovat |
| `app/layout.tsx` | **F0** (CookieBanner) + **F6** (FAQ JSON-LD) | Jediné dvě fáze, které sem sahají |
| `components/Navbar.tsx`, `components/Footer.tsx` | **F7** | Do té doby nikdo |
| `app/page.tsx` | **F8** | Do té doby nikdo |
| `app/sitemap.ts` | každá page fáze přidá svůj řádek | Append-only, konflikt triviální |
| `app/<route>/` + její sekční komponenta | ta konkrétní fáze | Viz níže |

---

## FÁZE 0 — Sdílený základ

**Cíl:** vytvořit stavební kameny, na kterých staví všechny stránky. Nic se vizuálně nemění.
**Závisí na:** ničem. **Blokuje:** všechno ostatní.

### Vlastní soubory
`lib/nav.ts`, `lib/ui.ts`, `components/layout/PageShell.tsx`, `components/layout/PageHeader.tsx`, `components/layout/ClosingCTA.tsx`, `app/layout.tsx`

### Kroky

**1. `lib/nav.ts`** — jeden zdroj navigace (dnes jsou dvě rozdílná hardcoded pole v Navbaru a Footeru):
```ts
export type NavLink = { label: string; href: string };
export const NAV_LINKS: NavLink[] = [
  { label: "O mně",     href: "/o-mne" },
  { label: "Služby",    href: "/sluzby" },
  { label: "Reference", href: "/reference" },
  { label: "Ceník",     href: "/cenik" },
  { label: "ZakazIQ",   href: "/zakaziq" },
  { label: "Kontakt",   href: "/kontakt" },
];
```

**2. `lib/ui.ts`** — mapa opakovaných class stringů. Dnes je trojice eyebrow/H1/lead **9× ručně opsaná**. Přesné hodnoty vytáhnout z `app/web-pro-remeslniky/page.tsx`:
```ts
export const t = {
  eyebrow:   "font-inter font-normal text-[11px] uppercase tracking-[0.2em] text-[#c9a84c]",
  h1:        "font-cormorant font-light text-[36px] md:text-[56px] leading-[1.1] text-[#f0ece6]",
  h2Page:    "font-cormorant font-light text-[26px] md:text-[36px] text-[#f0ece6]",
  lead:      "font-inter font-light text-[16px] md:text-[18px] leading-[1.85] text-[#8a8070]",
  body:      "font-inter font-light text-[15px] text-[#8a8070] leading-[1.85]",
  link:      "text-[#c9a84c] hover:underline",
  backLink:  "font-inter font-normal text-[12px] tracking-[0.08em] uppercase text-[#8a8070] hover:text-[#f0ece6] transition-colors duration-300",
  container: { page: "max-w-4xl mx-auto px-6 md:px-12", wide: "max-w-7xl mx-auto px-6 md:px-12" },
} as const;
```

**3. `components/layout/ClosingCTA.tsx`** — ⚠️ **nepiš novou komponentu.** `PillarCTA` v `components/pillar/PillarChrome.tsx:58` už přesně tohle dělá a **je nepoužitá** (grep = 1 hit, vlastní definice). Přesuň ji sem, rozšiř `heading`/`subheading` na `ReactNode`. Pak nahraď 5 inline kopií identického markupu: `tvorba-webu-pro-zivnostniky:293`, `web-pro-remeslniky:267`, `web-pro-kadernictvi:220`, `web-pro-ucetni:219`, `web-pro-masery-a-wellness:216`. Čistá deleta, nulová vizuální změna.

**4. `components/layout/PageHeader.tsx`** — `{ eyebrow, h1, lead?, align? }`. Eyebrow si sám přidává prefix `„— "`.

**5. `components/layout/PageShell.tsx`** — rám pro každou novou stránku:
```tsx
<div className="min-h-screen bg-[#080808] text-[#f0ece6]">
  {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />}
  <Navbar />
  <main id="main-content">{children}</main>
  <Footer />
</div>
```
Používá **`Navbar`/`Footer`**, ne `PillarChrome` — nové stránky jsou primární destinace, ne sekundární SEO landingy. `PillarChrome` zůstává jen pro `web-pro-*` rodinu.

**6. `app/layout.tsx`** — přesunout `<CookieBanner />` sem (vedle `<N8nChatWidget />`). Dnes je mountovaný **jen v `app/page.tsx`**, takže na nových stránkách by chyběl.

**7. Opravit 3 mrtvé cross-linky** (existují už dnes):
- `app/web-pro-zamecniky/page.tsx:46` — `/#portfolio` → `/reference`
- `app/web-pro-kovare/page.tsx:46` — `/#portfolio` → `/reference`
- `app/tvorba-webu-pro-zivnostniky/page.tsx:269` — `/#cenik` → `/cenik`, text „na hlavní stránce" → „v ceníku"

### Hotovo když
`npm run build` projde, web vypadá 1:1 stejně, cookie lišta funguje, `PillarCTA` už není nikde duplikovaná.

---

## FÁZE 1 — `/o-mne`

**Cíl:** `About` sekce jako samostatná stránka. **Závisí na:** F0.
**Vlastní:** `app/o-mne/`, `components/About.tsx`

1. `app/o-mne/page.tsx` — `PageShell` + `<About />` + `ClosingCTA`
2. `components/About.tsx` — `<h2>` → `<h1>` (třídy beze změny, čistě sémantika)
3. `app/o-mne/opengraph-image.tsx` — kopie `app/cenik/opengraph-image.tsx`
4. Řádek do `app/sitemap.ts`, priorita `0.6`
5. `<AnalyticsTracker page="/o-mne" />`

**SEO:** klíčová slova `Kryštof Sobotka`, `webdesignér na volné noze`, `nejsem agentura`. Title: `O mně — jeden člověk místo agentury`.

**Hotovo když:** `/o-mne` funguje přímou URL, má jeden `<h1>`, vlastní canonical.

---

## FÁZE 2 — `/sluzby`

**Cíl:** `Services` + `HowItWorks` jako jedna stránka. **Závisí na:** F0.
**Vlastní:** `app/sluzby/`, `components/Services.tsx`, `components/HowItWorks.tsx`

1. `app/sluzby/page.tsx` — `PageShell` + `<Services />` + `<HowItWorks />` + `ClosingCTA`
   („co nabízím" + „jak spolupráce probíhá" patří k sobě; `HowItWorks` je *procesní* timeline, ne firemní historie)
2. `components/Services.tsx`:
   - `<h2>` → `<h1>`
   - ⚠️ **`scrollToCenik` na ř. 10** — `document.querySelector("#cenik")` volá **všech 6 karet**. Po přesunu jsou mrtvé. → `const router = useRouter(); router.push("/cenik")`
3. `components/HowItWorks.tsx` — beze změny (zůstává `<h2>`, je to druhý nadpis na stránce)
4. `app/sluzby/opengraph-image.tsx` + sitemap `0.9` + `AnalyticsTracker`

**⚠️ SEO — nejrizikovější stránka:** `/sluzby` **nesmí** cílit „tvorba webů na míru" — to je klíčové slovo home (priorita 1.0, už rankuje). Cílit katalog + podceněné vertikály: `grafika`, `firemní prezentace`, `webové aplikace na míru`, `správa sociálních sítí`. Title: `Služby — weby, grafika, prezentace a správa sítí`.

**Hotovo když:** všech 6 karet naviguje na `/cenik`, ne mrtvý klik.

---

## FÁZE 3 — `/reference`

**Cíl:** `Portfolio` + `Testimonials` na jedné stránce — projekty i reference dohromady, ve stejném stylu jako dnes.
**Závisí na:** F0. **Vlastní:** `app/reference/`, `components/Portfolio.tsx`, `components/Testimonials.tsx`, `components/FirstClientModal.tsx`, `lib/data/portfolio.ts`, `lib/data/testimonials.ts`

1. `lib/data/portfolio.ts` — vytáhnout `projects` + `badgeStyles` z `Portfolio.tsx` (5 projektů, beze změny)
2. `lib/data/testimonials.ts` — vytáhnout 2 reference, které jsou dnes **natvrdo duplikované v JSX** (`Testimonials.tsx:60-98`), do pole
3. `components/TestimonialCard.tsx` — vytáhnout markup karty (bordered box se zlatou uvozovkou), ať není opsaný 2×
4. `app/reference/page.tsx` — `PageShell` + `<Portfolio />` + `<Testimonials />` + `ClosingCTA`
5. `components/Portfolio.tsx` — `<h2>` → `<h1>`; karty **dál odkazují na živé weby klientů** (`target="_blank"`), detailní stránky se nedělají. Smazat inline closing CTA na konci (ř. ~164–170) — přesouvá se do `ClosingCTA` na stránce.
6. `components/Testimonials.tsx` — `<h2>` → `<h2>` (druhý nadpis), načítat z `lib/data/testimonials.ts` přes `TestimonialCard`. Tlačítko + `FirstClientModal` zůstávají.
7. ⚠️ `components/FirstClientModal.tsx:116` — `querySelector("#kontakt")` → `router.push("/kontakt")`
8. `opengraph-image.tsx` + sitemap `0.8` + `AnalyticsTracker`

**SEO:** `ukázky webů pro živnostníky`, `reference`, `hodnocení klientů`. **Nepřidávat `AggregateRating` JSON-LD** — self-serving rating o vlastní firmě na vlastním webu je porušení Google policy (riziko manual action). Jen prosté `Review`.

**Hotovo když:** projekty i reference jsou na jedné stránce, jeden `<h1>`, `FirstClientModal` naviguje.

---

## FÁZE 4 — `/zakaziq`

**Cíl:** `ZakazIQ` jako samostatná stránka. **Závisí na:** F0.
**Vlastní:** `app/zakaziq/`, `components/ZakazIQ.tsx`

1. `app/zakaziq/page.tsx` — `PageShell` + `<ZakazIQ />`
2. `components/ZakazIQ.tsx` — `<h2>` → `<h1>`; jinak beze změny (má vlastní modrý brand `#1e3a6e`, vlastní logo komponentu, screenshot `zakaziq-preview.png`, 4 feature karty — obsahu má dost)
3. `opengraph-image.tsx` + sitemap `0.6` + `AnalyticsTracker`

**SEO:** vlastní produkt = vlastní entita, žádná kolize s ničím. Title: `ZakazIQ — klientský portál pro vaše projekty`.

**Hotovo když:** `/zakaziq` funguje, modrý brand se nebije se zlatým chrome.

---

## FÁZE 5 — `/kontakt`

**Cíl:** `Contact` + `FAQ` jako stránka. **Závisí na:** F0.
**Vlastní:** `app/kontakt/`, `components/Contact.tsx`, `components/FAQ.tsx`, `lib/data/faq.ts`

1. `lib/data/faq.ts` — vytáhnout `faqs` (8 položek). Dnes jsou **duplikované verbatim** v `FAQ.tsx` **a** v JSON-LD v `app/layout.tsx`.
2. `app/kontakt/page.tsx` — `PageShell` + `<Contact />` + `<FAQ />`
3. `components/Contact.tsx` — `<h2>` → `<h1>`
4. `components/FAQ.tsx` — načítat z `lib/data/faq.ts`, nadpis zůstává `<h2>`
5. JSON-LD stránky: `BreadcrumbList` + `FAQPage` generovaný z `faqs.map()` — jeden zdroj, nemůže se rozejít
6. `opengraph-image.tsx` + sitemap `0.9` + `AnalyticsTracker`

**SEO:** `kontakt VIZEON`, `poptávka webu`, `nezávazná konzultace zdarma`.

**Hotovo když:** FAQ se renderuje ze stejného pole, ze kterého se generuje JSON-LD.

---

## FÁZE 6 — `/cenik` upgrade + úklid JSON-LD

**Cíl:** srovnat existující stránku se zbytkem. **Závisí na:** F5 (kvůli `lib/data/faq.ts`).
**Vlastní:** `app/cenik/page.tsx`, `components/Pricing.tsx`, `app/layout.tsx`

1. `app/cenik/page.tsx` — `PillarHeader`/`PillarFooter` → `PageShell` (tedy plný `Navbar`/`Footer`)
2. ⚠️ **Duplicitní nadpis:** stránka renderuje eyebrow `„— Transparentní ceník"` + H1, a pak `<Pricing />` renderuje **ten samý eyebrow string znovu** + vlastní H2. → smazat interní hlavičku z `Pricing.tsx` (ř. ~320–343), silnější je ta na stránce (je keyword-aligned s `<title>`)
3. ⚠️ **`components/Pricing.tsx:481`** — „Napsat zprávu →" scrolluje na `#kontakt`, který na `/cenik` neexistuje. **Mrtvé CTA v produkci už dnes.** → `<Link href="/kontakt">`
4. `app/layout.tsx` — **vyjmout `FAQPage` z sitewide JSON-LD**, nechat jen `ProfessionalService`. Dnes root layout emituje FAQ na každé URL a zároveň ho emituje každá pillar page → **2 konkurenční `FAQPage` entity na 12 URL**.
5. Přetitulkovat `/tvorba-webu-pro-zivnostniky` na procesní úhel („Jak probíhá tvorba webu pro živnostníky") — dnes má **skoro identický title jako home** (priority 1.0 vs 0.8, kanibalizace).

**Hotovo když:** `/cenik` má jeden `<h1>`, „Napsat zprávu" naviguje, JSON-LD `FAQPage` existuje jen na `/kontakt`.

---

## FÁZE 7 — Přepnutí navigace

**Cíl:** Navbar a Footer používají skutečné routy. **Závisí na:** F1–F6 (všechny cíle musí existovat).
**Vlastní:** `components/Navbar.tsx`, `components/Footer.tsx`, `components/Hero.tsx`

1. Obě komponenty: smazat lokální `navLinks`, importovat `NAV_LINKS` z `lib/nav.ts`
2. ⚠️ **KRITICKÉ:** `Navbar.tsx:49` a `:79` mají `e.preventDefault()` na každém odkazu. **To zablokuje navigaci i po změně hrefů na routy.** Musí se smazat, nejen přepsat href. Totéž `Footer.tsx:76`.
3. Smazat `go()` / `handleClick()` scrollIntoView helpery
4. `<a>` → `<Link>`; logo → `<Link href="/">` (Next resetuje scroll sám, custom `scrollTo(0)` handler pryč)
5. Mobilní menu: `motion.div` obal zůstává, uvnitř plain `<Link>` s `onClick={() => setMenuOpen(false)}`, bez `setTimeout`
6. `components/Hero.tsx` — sekundární CTA `href="#sluzby"` + `go()` → `<Link href="/sluzby">`

**Hotovo když:** proklik celé navigace z každé stránky, desktop i mobil, žádné 404, mobilní menu se po kliku zavře.

---

## FÁZE 8 — Ořezání home

**Cíl:** home se stane rozcestníkem. **Závisí na:** F7 (aby obsah nebyl nikdy současně mimo home a bez odkazu).
**Vlastní:** `app/page.tsx`, `components/HomeExplore.tsx`

Nová skladba:
```
Hero → SocialProof → HomeExplore → Contact
```

1. `components/HomeExplore.tsx` — rozcestník („sitemap-as-cards" ze šablony): glass-panel karty na `/o-mne`, `/sluzby`, `/reference`, `/cenik`, `/zakaziq`. Nadpisy a popisky **vzít z existujících sekcí**, nic nového nepsat. Použít `.glass-panel .glass-panel-hover` z `globals.css`.
2. `app/page.tsx` — smazat importy `About`, `Services`, `HowItWorks`, `Portfolio`, `Pricing`, `Testimonials`, `ZakazIQ`, `FAQ`, `CookieBanner`
3. `Contact` na home **zůstává** — home si drží vlastní konverzní cestu nezávisle na `/kontakt`

**⚠️ SEO pojistka:** home dnes rankuje proto, že má všechen text. Po ořezu musí udržet **≥1200 slov** a exact-match fráze z vlastního `<title>`. Hero + SocialProof + HomeExplore + Contact to splní jen tak tak — **před nasazením zkontrolovat objem textu**. Zvlášť: **číslo „4 999 Kč" musí zůstat v těle stránky** (je v `description` v `app/page.tsx:22`; mismatch popisku a obsahu oslabuje snippet).

**Hotovo když:** home je rozcestník, žádná sekce není osiřelá, objem textu ověřen.

---

## FÁZE 9 — Úklid duplicit (volitelná, kdykoli po F6)

**Cíl:** doplatit technický dluh, který kód sám přiznává komentářem.
**Vlastní:** `lib/data/pricing.ts`, `lib/data/services.tsx`, `components/Pricing.tsx`, `components/FirstClientModal.tsx`, `components/BookingModal.tsx`, `components/Services.tsx`

1. **`lib/data/pricing.ts`** — ceny jsou dnes **3× ručně synchronizované**: `Pricing.tsx` (`services`/`bundles`), `FirstClientModal.tsx` (`services`, jiný tvar), `BookingModal.tsx` (`PRICES`, s komentářem *„shodné s Pricing.tsx / FirstClientModal.tsx"*). Sjednotit do `PRICING_ITEMS` + `BUNDLES` + `PRICE_BY_NAME`. `FirstClientModal` má záměrně užší výběr → zachovat přes flag `includeInQuickInquiry`, ne mazáním.
2. **`lib/data/services.tsx`** — pozor, `.tsx` ne `.ts`: 2 popisy služeb obsahují inline `<Link>`.
3. `lib/booking-config.ts` **nechat být** — je to funkční precedens, ne duplikace.

---

## Konvence pro každou novou routu

1. `generateMetadata()` s `title` (**bez** `| VIZEON` — template v root layoutu ho přidá), `description`, a **`alternates: { canonical }`**
   ⚠️ Canonical je **povinný**. Root layout má `alternates.canonical = "https://vizeon.cz"` a Next metadata dědí po segmentech — **stránka bez vlastního canonicalu zdědí ten domovský a sama se odindexuje.** Všech 15 existujících rout ho má; nejčastější způsob, jak přijít o novou stránku.
2. `app/<route>/opengraph-image.tsx` — kopie `app/cenik/opengraph-image.tsx`, volá `buildOgImage()` z `lib/ogImage.tsx`. Podtitul = **přesně 3 body oddělené ` · `** (konvence napříč všemi 13 existujícími).
3. Inline `BreadcrumbList` JSON-LD: `Domů` → stránka. Vždy první uzel v `@graph`, absolutní URL bez lomítka na konci.
4. Řádek v `app/sitemap.ts` — `lastModified` je **ručně psaný string**, ne `new Date()`.
5. `<AnalyticsTracker page="/route" />` — dnes běží **jen na home**, žádná z 15 rout netrackuje.
6. `<main id="main-content">` — skip-link v `app/layout.tsx:186` na něj míří, ale existuje **jen na home**. `PageShell` to opraví plošně.

## Ověření (po každé fázi)

```bash
npm run build   # typy + ověří, že žádná stránka nezdědila canonical home
npm run lint
npm run dev     # proklik
```

Ručně: proklikat všechny položky `NAV_LINKS` z **každé** stránky, desktop i mobil. Ověřit staré kotvy (`/#sluzby`, `/#o-mne`, `/#portfolio`, `/#reference`, `/#cenik`, `/#faq`, `/#zakaziq`) — musí přistát na `/` bez chyby (fragment je klientský, redirect není možný ani potřeba).

Nepřidávat žádný nový z-index — nové komponenty jsou statické, škála `--z-*` v `app/globals.css` se nemění.

---

## Přehled nalezených chyb (existují v produkci už dnes)

| # | Kde | Co | Fáze |
|---|---|---|---|
| 1 | `Pricing.tsx:481` | „Napsat zprávu →" na `/cenik` scrolluje na `#kontakt`, který tam není — **mrtvé CTA** | F6 |
| 2 | `app/layout.tsx:186` | skip-link míří na `#main-content`, existuje jen na home — rozbitá a11y na 14 routách | F0 |
| 3 | `app/layout.tsx` | `FAQPage` JSON-LD emitovaný sitewide **i** per-page → 2 konkurenční entity na 12 URL | F6 |
| 4 | `/` vs `/tvorba-webu-pro-zivnostniky` | skoro identické tituly, kanibalizace | F6 |
| 5 | `web-pro-zamecniky:46`, `web-pro-kovare:46`, `tvorba-webu:269` | mrtvé `/#portfolio` a `/#cenik` odkazy | F0 |
| 6 | `Services.tsx:10` | `scrollToCenik` — všech 6 karet bude po přesunu mrtvých | F2 |
| 7 | `FirstClientModal.tsx:116` | `querySelector("#kontakt")` | F3 |
| 8 | `app/page.tsx` | `CookieBanner` mountovaný jen na home | F0 |
| 9 | `PillarChrome.tsx:58` | `PillarCTA` napsaná a nepoužitá, 5× opsaná inline | F0 |
