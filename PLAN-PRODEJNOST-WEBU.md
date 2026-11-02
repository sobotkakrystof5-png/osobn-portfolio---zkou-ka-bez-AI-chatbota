# Plán: prodejnost webu (konzultace 11/2026)

Zdroj: poznámky z eventu, kde se web 2. 11. 2026 konzultoval s expertem na design
a prodejnost webu. Cílem je, aby web víc prodával.

## Hotovo (2. 11. 2026)

- **Lišta:** 6 položek a tlačítko (Služby ▾, ZakazIQ, Projekty, Ceník, O nás, Kontakt).
  Automatizace je v nabídce Služby. Jak to probíhá, Obory, Blog a FAQ jsou v patičce.
  Desktopová lišta je vidět od 1024 px (dřív až od 1280 px).
- **Kontrast:** vedlejší text `#c3bbad` (token `text-text-secondary`), drobné popisky
  `#a39a8b` (`text-text-muted`), Inter v řezu normal místo light. Platí pro celý web
  kromě adminu a e-mailů. Písmo `t.body`/`t.lead`/`t.h3` o 1–2 px větší (2. 11. 2026, čitelnost pro starší).
- **Konzultace zdarma** vede na kontaktní formulář: na homepage a /kontakt sjede
  k sekci `#kontakt`, jinde otevře /kontakt. Rezervační okno, `BookingContext`,
  `/api/booking` a `lib/booking-config.ts` jsou smazané.
- **Homepage:** hero (title, H1 a odstavec beze změny), druhé tlačítko „Ukázky webů",
  logo VIZEON × ALTENO zůstává, 3 odznaky jsou pryč. Pod hero pruh 10+ / 100 % / 24 h,
  interaktivní rámečky „Víc než web" (automatizace a ZakazIQ), reference jako
  nekonečný carousel s náhledy webů (bez hvězdiček a fotek klientů), 4 kroky
  spolupráce, blok „Kdo za tím stojí" a kontakt. Sekce HomeExplore, AltenoBand
  a StatementBlock jsou smazané.
- **/spoluprace:** stejné 4 kroky, podrobněji rozepsané, metadata upravená.
- **Tón „my"** na homepage a ve společných částech (patička, kontakt, štítek
  „Připravujeme").
- **Služby a ceník v jedné sekci:** /sluzby je dashboard (kategorie vlevo, panel
  s ceníkem vpravo, kotvy `/sluzby#weby` apod.), komponenty v `components/services/`.
  Služby (`lib/data/services.tsx`) berou ceny z `lib/data/pricing.ts` přes pole
  `pricing`. /cena-tvorby-webu zůstává jako SEO stránka o ceně webu (jen ceník
  webů). Na homepage je pod pruhem důvěry dashboard nabídky (`OfferDashboard`,
  9 dlaždic s cenou „od“). Staré `Services.tsx` a `Pricing.tsx` jsou smazané.

- **Druhé kolo (2. 11. 2026):** čísla v pruhu pod hero naběhnou od nuly (Inter,
  tabulkové číslice), reference „Co o nás říkají klienti", lišta v pořadí Weby,
  E-shopy, Automatizace. Dashboard nabídky na homepage má jen 5 služeb (weby,
  e-shopy, automatizace, webové aplikace, rezervační systémy) a žádné ceny; grafika,
  SEO, technické služby a ZakazIQ v něm nejsou. Stránka Weby
  (/sluzby/tvorba-webovych-stranek) ukazuje 3 varianty jako karty
  (`components/services/WebPackages.tsx`). Balíčky Online Vizitka a Web Care jsou
  zrušené v ceníku i ve všech textech (oborové stránky doporučují Promo Page
  od 9 999 Kč a Pro Web od 14 999 Kč).
- **Naše hodnoty (2. 11. 2026):** na homepage mezi referencemi a kroky spolupráce
  je sekce s mottem „Náš zákazník, náš pán.“ pojatá jako závazek: pečeť s korunou
  a motto vlevo (sticky), vpravo listina „Náš závazek vám“ se sloupci Slib a Čin
  (4 sliby s fajfkami), podpis zakladatele a razítko 100 % spokojenost. Komponenta
  `components/OurValues.tsx`. Až bude sken skutečného podpisu, může nahradit
  ozdobnou linku pod jménem.

- **Oborové stránky (2. 11. 2026):** všech 19 stránek `/web-pro-*` jede na jedné
  šabloně `components/industry/IndustryLanding.tsx` s plným Navbarem a patičkou,
  obsah je v `lib/data/industry-pages/` (v „my“, krátké věty). Hero má telefon
  „cesta zákazníka“ (hledá → najde web oboru → klikne → přijde poptávka) v pěti
  podobách podle oboru, dál srovnání Dnes × S webem od nás, bento funkcí,
  našeptávač s hledanými frázemi, reálný projekt z oboru, Promo Page × Pro Web
  s doporučením, postup, FAQ a odkazy na všechny obory. SEO: title „Webové
  stránky pro …“, H1 „Web pro …“, H2 „Kolik stojí web pro …“, JSON-LD
  BreadcrumbList + Service s cenami + FAQPage. `MicroServicePage` smazaná.
  Hledané fráze jsou odhad, objemy ověřit v Collabimu.

- **Automatizace (2. 11. 2026):** hub /automatizace přepsaný ve stylu stránky E-shopy
  (`components/services/automation/`): hero s poptávkou, která se vyřídí sama, cena
  od 4 999 Kč nahoře, přepínač Ručně × S automatizací, výběr „Co vás zdržuje nejvíc?“
  s doporučenou službou a odkazem na podstránku, cena s faktory, průběh ve 4 krocích
  (sdílený `LaunchTimeline`), pás „Dvě značky. Jeden partner.“ s balíčky web +
  automatizace, FAQ a mobilní lišta s cenou. Hub i 4 podstránky `/automatizace/*`
  jsou v „my“, odkaz na ceník vede na /sluzby#automatizace. Balíčky web + automatizace
  pořád nemají cenu.
- **Podstránky automatizací (2. 11. 2026):** hero ve 2 sloupcích, vpravo vlastní 3D scéna
  každé služby (`components/automation/scenes3d/`, izometrické SVG bez WebGL, rám
  `SceneFrame` s větou ke každé fázi): AI agent (jádro, zdroje dat, pravidla, rozhodnutí
  sám × člověk), procesy (pás s AI čtečkou faktur → účetnictví a tabulka, nesrovnalost ke
  schválení), chatbot (kartotéka podkladů → odpověď se zdrojem), voice (telefon,
  ekvalizér, záměr, 3D kalendář, SMS). Fáze jde vybrat ručně, myš scénu naklápí, mimo
  obrazovku se smyčky zastaví. Ikony karet „Jak to funguje“ jsou v `process-config.ts`. Sekce na plnou
  šířku se společnou hlavičkou `components/services/SectionHead.tsx` (i na hubu a E-shopech),
  na kartách jen první věta (`firstSentence` v `lib/utils.ts`), FAQ jako akordeon.
  Na 390 px ověřeno přes Playwright (`playwright-core` + systémový Chrome), nic nepřetéká.

## Zbývá

1. Přepsat podstránky do „my": podstránky služeb (/sluzby/*), FAQ
   (oborové stránky hotové). Přehled /sluzby, /cena-tvorby-webu a data
   služeb a ceníku už jsou v „my". Blog a /o-mne můžou zůstat v první osobě.
2. Přepsat /zakaziq. Dnes popisuje komunikační portál k projektu, nová nabídka je
   systém na řízení podnikání klienta (klienti, zakázky, finance, vlastní úpravy,
   přístup na doživotí).
3. Napojit kontaktní formulář na ZakazIQ. Rezervační okno posílalo poptávky do
   Supabase a ZakazIQ, formulář je teď posílá jen e-mailem.
4. Doplnit screenshoty ZakazIQ do panelů v sekci „Víc než web"
   (`components/MoreThanWeb.tsx`).
5. Vymezit „na doživotí" v obchodních podmínkách.
6. Ověřit, že „10+ spokojených klientů" odpovídá skutečnosti (portfolio má
   10 projektů včetně ALTENO).
7. Průvodce „Nevíte, co chcete?" s kuponem na míru (odloženo).
8. Projít homepage na mobilu (390 px). Okno prohlížeče se zmenšit nedá, jde to
   ale přes Playwright (`playwright-core` + systémový Chrome) s viewportem 390 px.
9. Drobné písmo 9–12 px mimo homepage se jen zesvětlilo, nezvětšovalo.

## Poznámky

- Lokální `next build` (Turbopack) padá při načítání Google fontů
  (`next/font/google queries have exactly one entry`), nejspíš kvůli mezerám
  a diakritice v cestě k projektu. Fontů se změny netýkaly. `next build --webpack`
  projde.
- `components/Testimonials.tsx` a `components/FirstClientModal.tsx` nikde nejsou
  importované (mrtvý kód).
- Tabulky `bookings` a `available_slots` v Supabase i admin k nim zůstaly.
