# PROMPT: Automatizace v navbaru + 4 podstránky z alteno.cz v designu VIZEON

> **Pro koho je tenhle dokument:** pro Claude Code v novém (čerstvém) sezení. Nemáš žádnou paměť
> z předchozí konverzace. Všechno, co potřebuješ vědět, je tady. Dokument je rozdělený na **9 sessions
> (S0 až S8)**. V jednom sezení děláš **jen jednu session**, dokončíš ji, ověříš, zapíšeš stav do
> `AUTOMATIZACE-PROGRESS.md` a skončíš. Další session začne nové sezení.
>
> Zdroj pravdy o tom, *co* se staví, je schválený plán
> `~/.claude/plans/hele-ale-ja-po-delegated-forest.md` (pokud existuje). Tenhle dokument je jeho
> provedení: přesné kroky, soubory a kritéria. Když se oba rozcházejí, platí **tenhle dokument**
> (je novější a opravuje dvě drobnosti, viz §2.4).

---

## 0. Jak s dokumentem pracovat

### 0.1 Zahájení každého sezení (vlož uživatel)

```
Přečti /Users/krystofsobotka/Desktop/VIZEON /vizeon/PROMPT-AUTOMATIZACE-PODSTRANKY.md
a AUTOMATIZACE-PROGRESS.md. Proveď Session <N> (a jen ji). Postupuj přesně podle jejích kroků,
na konci splň její „Hotovo když" a zapiš stav do AUTOMATIZACE-PROGRESS.md.
```

### 0.2 Co uděláš hned na začátku každé session (S1 až S8)

1. Přečti celý §1 až §4 tohoto dokumentu (kontext, pravidla, překladové tabulky) a **svou session**.
2. Přečti `AUTOMATIZACE-PROGRESS.md`. Ověř, že předchozí session je v něm označená jako hotová.
   Když ne, **zastav se a řekni to uživateli**, nepokračuj na cizím rozdělaném stavu.
3. `git status` a `git log --oneline -5`. Zjisti skutečný stav větve `feat/automatizace-alteno`.
4. Ověř, že referenční klon alteno existuje (§1.3). Když ne, naklonuj ho.
5. Teprve pak začni.

### 0.3 Jak session končí

1. Splnil jsi každý bod „Hotovo když"? Když ne, napiš přesně co chybí (nezamlčuj).
2. `npm run build` musí projít (viz §3.6, jak rozlišit starý a nový problém).
3. Doplň `AUTOMATIZACE-PROGRESS.md` (formát v §9).
4. **Necommituj sám.** Navrhni uživateli commit zprávu (česky, styl repa: `feat(automatizace): …`)
   a počkej, až řekne. Jedna session = jeden logický commit.
5. V závěrečné zprávě napiš: co je hotové, co jsi **neověřil** a proč, a co přesně dělá další session.

### 0.4 Zásady, které platí vždy

- **Nejdřív stav, pak akce.** Nic nepředpokládej, ověř čtením souborů.
- **Kopíruj, nepřepisuj.** Ported soubory jsou stovky až tisíce řádků. Dostaň je z klonu příkazem
  `cp`, pak je měň `sed`/`perl`/cílenými editacemi. Ručně přepsaný soubor 1352 ř. je chyba nejen
  v tokenech, ale i v přesnosti (SVG cesty).
- **Věrnost předloze má přednost před „vylepšením".** Uživatel chce identické animace, strukturu
  a chování. Neměň časování, pořadí fází ani logiku scén podle vlastního vkusu. Mění se **jen vzhled**
  (barvy, typografie, povrchy) a to, co nutně vyžaduje Tailwind 3 / React 18.
- **Když si nejsi jistý textem, cenou nebo obchodním tvrzením, zeptej se** (AskUserQuestion),
  nevymýšlej.
- **Reportuj poctivě.** Co jsi neotestoval v prohlížeči, to neříkej, že funguje.

---

## 1. Kontext projektu

### 1.1 Co se staví

V navbaru webu **VIZEON** (vizeon.cz, tvorba webů, Kryštof Sobotka) vznikne sekce **Automatizace**
s dropdownem a **4 plnohodnotnými podstránkami**, přenesenými z webu **alteno.cz** (sesterská značka
téhož člověka, AI automatizace). Z alteno se přenáší **struktura podstránky, interaktivní animace**
(zejména scéna „někdo volá někomu" u Voice agentů) **i chování dropdownu**. Vizuálně vše v designu VIZEON.

Navíc je potřeba, aby klientovi bylo **hned jasné, že jde o spolupráci dvou značek**: lockup
**ALTENO × VIZEON s oběma plnými logy** na homepage, v dropdownu Automatizace (úvodní blok), ve footeru
a na začátku sekce Automatizace.

### 1.2 Rozhodnutí uživatele (nepřehodnocuj)

1. **Navbar:** dropdown **Automatizace** se přidá jako samostatná položka. Aby se lišta vešla
   (10 položek je na hraně šířky 768 až 1279 px), **FAQ se sloučí pod Blog** do dropdownu. Výsledek
   zůstává **10 top-level položek**.
2. **Hub `/automatizace`** se stane přehledem 4 karet. Stávající accordion se **nahradí**. Staré kotvy
   (`/automatizace#ai-agenti` atd.) se přepíšou na nové podstránky.
3. **4 podstránky** = 4 služby z alteno: AI agenti, Automatizace, Chatboti a RAG, Voice agenti.
   (RAG je součást chatbotů, stejně jako na alteno.cz. Není to pátá stránka.)
4. **Loga:** oba celé wordmarky, pořadí **ALTENO × VIZEON**. Logo ALTENO v barvách svého loga (světlá
   písmena + tyrkysový akcent), aby bylo vidět, že jde o jinou značku. VIZEON zůstává krémový/zlatý.
5. **Úvodní „představovací" blok** nahoře v dropdownu Automatizace s lockupem a jednou větou.
   Hlavní logo v liště zůstává jen VIZEON (dvě plná loga se do lišty nevejdou).

### 1.3 Referenční repo (alteno)

- GitHub: `sobotkakrystof5-png/AI-automatizace-` (název repa končí pomlčkou).
- Naklonuj mimo projekt, např.: `gh repo clone sobotkakrystof5-png/AI-automatizace- ~/alteno-ref`
  (pokud už neexistuje, jen `git -C ~/alteno-ref pull`). **Nikdy v něm nic neměň.**
- V dalším textu `ALT` = kořen toho klonu.
- Před čtením kódu si přečti v klonu: `ALT/claude.md` (závazná pravidla té kódové báze, zejména §5
  pravidla pohybu), `ALT/podstranky-vizual-prompt.md` a `ALT/sluzby-sceny-prompt.md` (zadání scén,
  včetně „pastí"). Jsou to nejlepší vysvětlení, *proč* jsou scény napsané, jak jsou.

### 1.4 Stav VIZEON před začátkem (ověřeno při tvorbě dokumentu)

- Projekt: `/Users/krystofsobotka/Desktop/VIZEON /vizeon` (**v cestě je mezera, vždy cestu v uvozovkách**).
- Stack: Next.js 16.2 (App Router), React 18, **Tailwind 3.4.1**, framer-motion 12, lucide-react,
  Supabase (analytika), **žádný test runner**. `package.json` skript `lint` je `next lint`.
- Větev: `feat/automatizace-alteno`. Je na ní **nezacommitovaná rozdělaná práce** (hub `/automatizace` s
  accordionem, `AltenoBand`, `AltenoMark`, `lib/alteno.ts`, `lib/data/automation.tsx`, úpravy Hero,
  Footeru, Pricing atd.). **Nic z toho nevracej ani nemaž bez rozhodnutí uživatele.** Navazuješ na to.
- `lib/nav.ts`: plochý `NAV_LINKS` (10 položek), sdílený **Navbarem i Footerem**. Navbar je
  `components/Navbar.tsx` (104 ř., `h-16 md:h-20` **nesmí se změnit**, ~15 podstránek na tom staví
  odsazení `pt-16 md:pt-24`). Desktop je prostý `.map` odkazů, mobil fullscreen overlay
  (AnimatePresence + `stagger`/`fadeIn`). Žádný dropdown v kódu neexistuje.
- Design tokeny: `lib/ui.ts` (`t.eyebrow`, `t.h1`, `t.h2Page`, `t.lead`, `t.body`, `t.h3`, `t.link`,
  `t.backLink`, `t.container.page|wide`), `lib/animations.ts` (`fadeUp`, `fadeIn`, `stagger`,
  `cardEntrance`, `viewport`), `app/globals.css` (třídy `.glass-panel`, `.glass-panel-hover`,
  `.card-shimmer-line`, `.glow-orb`), `tailwind.config.ts` (barvy `accent`, `bg-*`, `text-*`).
- Stránkový rám: `components/layout/PageShell.tsx` (Navbar + `<main id="main-content">` + Footer +
  volitelný `jsonLd`), `PageHeader.tsx` (eyebrow `— …` + H1 + lead), `ClosingCTA.tsx`,
  `components/CTAButton.tsx` (otevírá booking modal, nemá vlastní styl).
- SEO: každá stránka exportuje `generateMetadata` s absolutním `canonical`; JSON-LD jako `@graph`
  (`BreadcrumbList` + `Service` + `FAQPage`), text FAQ v JSON-LD musí přesně odpovídat viditelnému;
  `app/sitemap.ts` je ručně psané pole s pevným `lastModified`; OG obrázky přes `lib/ogImage.tsx`
  (`buildOgImage(title, subtitle)`) a soubor `opengraph-image.tsx` v každé složce trasy.
- Analytika: `components/AnalyticsTracker.tsx` (`<AnalyticsTracker page="/cesta" />`), hook
  `hooks/useAnalytics.ts` zapisuje do Supabase. **Žádný globální `track()` jako v alteno.**
- Existující odkazy na kotvy `/automatizace#…`: `lib/data/services.tsx` (ř. ~51 a 129 až 132),
  `app/sluzby/ai-chatbot/page.tsx:115`, `app/web-pro-remeslniky/page.tsx:267`,
  `app/web-pro-ucetni/page.tsx:214`, `app/web-pro-realitni-maklere/page.tsx:49`,
  `components/AutomationAccordion.tsx` (deep linky). `components/Services.tsx` používá
  `AUTOMATION_HIGHLIGHT` z `lib/data/services.tsx`.
- Existující spolubranding: `components/brand/AltenoMark.tsx` (**dočasný textový** wordmark,
  `TODO(ALTENO-LOGO)`, exporty `AltenoMark`, `BrandLockup`), použitý v `components/AltenoBand.tsx`,
  `components/Footer.tsx` (blok „Rodina značek" ~ř. 64 až 95), `app/automatizace/page.tsx`.
  `components/Hero.tsx` ~ř. 126 až 133 má větu s odkazem `→ ALTENO`. `lib/alteno.ts` skládá odkazy
  na alteno.cz s UTM (`altenoUrl(path, campaign)`), ponech beze změny.
- `next.config.mjs` má redirecty (`/cenik` → `/cena-tvorby-webu` atd.), `middleware.ts` dělá rate
  limiting. Na tvoji práci nemají vliv, jen je nerozbij.

### 1.5 Stav alteno (co přesně se přenáší)

Stack alteno: Next 16.3, **React 19**, **Tailwind 4**, Geist fonty, zaoblené povrchy, tyrkys
`#2dd4bf`. Balíčky `motion` a `gsap` v něm jsou, ale **systém podstránek je vůbec nepoužívá**: všechno je
ručně psané (CSS transitions + `requestAnimationFrame` + `setTimeout`) nad sdíleným engine
`useSceneScript`. **Do VIZEON se nepřidává žádná animační knihovna.**

| Co | Zdroj v `ALT/` | ř. | Typ |
|---|---|---|---|
| Hub služeb | `app/sluzby/page.tsx` | 172 | server |
| Detail služby | `app/sluzby/[slug]/page.tsx` | 583 | server |
| Data služeb | `lib/services.ts` | 597 | data |
| Skripty scén | `lib/service-demos.ts` | 786 | data |
| Engine scén | `components/services/useSceneScript.ts` | 227 | client hook |
| Telefon | `components/services/ServicePhone.tsx` | 557 | client |
| Chat + RAG | `components/services/ServiceChat.tsx` | 474 | client |
| Flow | `components/services/ServiceFlow.tsx` | 603 | client |
| Konzole | `components/services/ServiceConsole.tsx` | 370 | client |
| Ilustrace „Co vás zdržuje" | `components/services/PainArtwork.tsx` | 600 | server |
| Ilustrace „Co získáte" | `components/services/BenefitArtwork.tsx` | 1352 | server |
| Use-case proužek | `components/services/UseCaseArtwork.tsx` | 129 | server |
| Ikony scén, loga nástrojů | `components/services/demo-icons.ts`, `demo-tools.ts` | 48, 64 | data |
| Glyfy | `components/motion/process-icons.tsx` | 430 | server |
| SVG rám | `components/motion/ArtworkFrame.tsx` | 130 | server |
| Reduced motion hook | `components/motion/usePrefersReducedMotion.ts` | 30 | client |
| Dropdown navbaru | `components/layout/Navbar.tsx` (`NavDropdown`) | ~150 z 562 | client |
| CSS | `app/globals.css` (`voice-wave`, `.benefit-*`, `.pain-*`, `[data-reveal]`) | | |
| Wordmark ALTENO | `components/brand/AltenoWordmark.tsx` | | SVG |

Pořadí sekcí detailu (zachovat): zpět-odkaz + badge „Připravuju" (jen voice) + **H1 + lead** →
**interaktivní scéna** → **„Co vás dnes zdržuje"** (4 karty s PainArtwork) → **„Jak to funguje"**
(číslovaný seznam) → dvojice panelů **„Pro koho to dává smysl"** / **„Co s tím propojím"** →
**„Kde se to nejvíc vyplatí"** (use cases) → **„Co získáte"** (bento, 5 přínosů) → **„Časté otázky"**
→ závěrečné CTA → křížové odkazy.
Scéna se vybírá podle `demo.kind` (`console`, `chat`, `flow`, `phone`), ne podle slugu, s
`never` guardem v `switch`.

---

## 2. Překlad do designu VIZEON

### 2.1 Princip

Mění se **vzhled**, ne chování. Alteno je tyrkysové, chladně šedé (zinc), Geist, zaoblené. VIZEON je
zlatý, teple tmavý, Cormorant + Inter, téměř hranatý (`--radius: 2px`).

### 2.2 Barvy (mapovací tabulka)

Nejdřív v ported souboru zjisti skutečné použití, pak teprve mapuj:
`grep -ohE "(zinc|brand)-[a-z0-9-]+(/[0-9.\[\]]+)?" soubor | sort | uniq -c | sort -rn`

| Alteno | VIZEON | Poznámka |
|---|---|---|
| `brand-turquoise` | `accent` (`#c9a84c`) | token **už v `tailwind.config.ts` existuje**, nezaváděj `gold`. `bg-accent/15`, `border-accent/40`, `text-accent` fungují i s opacity |
| `brand-mint` | `accent-hover` (`#d4b968`) | |
| `zinc-950` | `#080808` | `bg-[#080808]/70` (hex s lomítkem funguje v TW 3.4) |
| `zinc-900` | `#0e0e0e` | karty, povrchy |
| `zinc-800` | `#161616` (pozadí) / `white/[0.08]` (border) | |
| `zinc-700` | `#3d3830` (pozadí, text) / `white/[0.12]` (border) | |
| `zinc-600` | `#4a4339` | |
| `zinc-500` | `#6f665a` | |
| `zinc-400` | `#8a8070` | hlavní tlumený text VIZEON |
| `zinc-300` | `#b8b0a2` | |
| `zinc-200` | `#e0dbd2` | |
| `zinc-100`, `zinc-50` | `#f0ece6` | hlavní text VIZEON |
| `font-mono` | `font-inter` + `uppercase tracking-[0.1em]` | VIZEON nemá mono font |
| `rounded-xl`, `rounded-2xl`, `rounded-lg` | `rounded-sm` | výjimky: tělo telefonu (`rounded-[2rem]`, `rounded-[1.5rem]`), `rounded-full` |
| `rounded-md` u bublin (`rounded-bl-md`) | `rounded-bl-sm` | |

Pravidla: pro `bg-`, `text-`, `fill-`, `stroke-`, `from-`, `to-` používej hex (konvence VIZEON,
žádný kód nepoužívá pojmenované tokeny kromě `accent`). Pro `border-` a `divide-` raději `white/[alfa]`.
**SVG literály** v Pain/Benefit/ArtworkFrame (`#e4e4e7`, `#a1a1aa`, `#52525b`, `#18181b`, `#27272a`,
`#3f3f46`, `#2DD4BF`, `#6EE7B7`, `#0b1215`, `#080c10`, `rgba(212,212,216,…)`) přemapuj stejnou logikou
(studené šedé → teplé, tyrkys → `#c9a84c`, mint → `#d4b968`, tmavě zelené podklady → `#0e0e0e`).
**Významové pravidlo ilustrací zachovej:** „Co vás zdržuje" (Pain) je **bez akcentní barvy**
(jen neutrální), „Co získáte" (Benefit) má **akcent jen na řešení**. Kdyby po přemapování Pain
obsahoval zlatou, je to chyba.

Scénu s jedním akcentem (Flow): **zlatá je vyhrazena pro `core` uzly** (naše vrstva). Zákazníkovy
systémy se jen rozsvítí neutrálně. Nezlať všechno.

### 2.3 Typografie a povrchy

- Nadpisy sekcí přes `t.h2Page`, `t.h3`, `t.lead`, `t.body`, `t.eyebrow` z `lib/ui.ts`, kontejnery
  `t.container.page` / `t.container.wide`.
- Karty: `glass-panel` (+ `glass-panel-hover`, `card-shimmer-line` v `group`) nebo
  `border border-white/[0.06]`. Zvýrazněná karta: `border-[rgba(201,168,76,0.2)]`.
- Tlačítka: přesné class stringy z `components/AltenoBand.tsx` (primární zlaté, sekundární
  obrysové). `CTAButton` nemá styl, dej mu celý class string.
- Reveal na scrollu: framer-motion `fadeUp` + `viewport` z `lib/animations.ts` (jako
  `components/StatementBlock.tsx`), s ochranou `useReducedMotion()` jako v `AltenoBand.tsx`.
  **Nepřenášej** alteno `AnimatedSection` ani `[data-reveal]` CSS.
- Texty: jazyk čeština, ponech z alteno. **V nových i přenesených textech nepoužívej pomlčky
  (`—`, `–`) jako spojky** (v repu je na to pravidlo, viz skill `humanize-text-cs`). Nahraď čárkou,
  tečkou nebo závorkou. Číselné rozsahy (`5–21`) nech. Nové texty (hub, úvodní blok, věta u lockupu)
  projdi skillem `humanize-text-cs`.

### 2.4 Odchylky od schváleného plánu (vědomé)

1. Plán říká „přidat token `gold`". **Nepřidávej.** Existující `accent` je totéž a je
   v `tailwind.config.ts`. Jeden token místo dvou.
2. Plán říká „zkopírovat path ikon značek místo závislostí". Platí. U `demo-tools.ts` zkopíruj
   `path` řetězce 6 značek (Gmail, Shopify, QuickBooks, Typeform, HubSpot z `simple-icons`, Slack
   z Font Awesome brands) a do hlavičky souboru napiš zdroj a licenci (simple-icons CC0, Font Awesome
   brands CC BY 4.0). Nepřidávej závislosti `simple-icons` ani `@fortawesome/*`.

---

## 3. Technické pasti portu (přečti před každou session s přenosem kódu)

### 3.1 Tailwind 4 → 3 (nejčastější zdroj tichých chyb)

Po zkopírování souboru **vždy** projdi `grep` na tyto vzory a oprav:

- **`translate-*`, `scale-*`, `rotate-*`**: ve v4 samostatné CSS vlastnosti, ve v3 skládají
  `transform`. `transition-[opacity,translate]` → `transition-[opacity,transform]`. Když je na prvku
  zároveň `[transform:…]` (arbitrary) a `translate-*`, v3 se přebijí. Waveform používá inline
  `transform: scaleY()`, to zůstává.
- **Výchozí barva `border`**: v4 = `currentColor`, v3 = světle šedá. Každé „holé" `border` bez barvy
  dostane explicitní `border-white/[0.08]`.
- **Přejmenované stupnice** (v4 → v3): `rounded-xs`→`rounded-sm`, `rounded-sm`→`rounded`,
  `shadow-xs`→`shadow-sm`, `shadow-sm`→`shadow`, `blur-xs`→`blur-sm`, `outline-hidden`→
  `outline-none`, `ring` (v4 1px, v3 3px). Většinu ale stejně přemapuješ na `rounded-sm` (§2.2).
- **Nová v4 syntaxe**: `bg-linear-to-*`→`bg-gradient-to-*`, `bg-(--x)`→`bg-[var(--x)]`,
  `transform-3d`, `perspective-*`, `rotate-x-*`, `translate-z-*`→ arbitrary properties
  (`md:[transform-style:preserve-3d]`, `md:[perspective:1500px]`, `md:[transform:translateZ(46px)]`),
  `!` jako suffix important → prefix, `data-*` a `not-*`/`in-*`/`@container` varianty zkontroluj.
- **`animate-in fade-in-0 zoom-in-95 slide-in-from-top-1`** (tw-animate-css) v VIZEON **nejsou**
  → vlastní keyframe (S6).
- **`@theme` animace** (`animate-voice-wave`, `animate-flow-pulse`…) ve v3 definuješ v
  `tailwind.config.ts` (`extend.keyframes` + `extend.animation`) **a** ponech `@keyframes` v
  `globals.css` tam, kde tak alteno dělá.
- Arbitrary properties `md:[transform:translateZ(96px)_rotate(-1.5deg)]` a `[perspective-origin:50%_40%]`
  fungují i ve v3. Ověř v prohlížeči, ne jen buildem.
- Tailwind 3 skenuje třídy staticky: **nesestavuj názvy tříd z proměnných** (alteno to také nedělá,
  používá lookup mapy s literály). Ponech.

### 3.2 React 19 → 18

- Callback `ref` s návratovou cleanup funkcí: v React 18 se ignoruje a TypeScript protestuje. Převeď
  na `useEffect`.
- `useRef()` bez argumentu: v 18 OK, ale ať typy sedí (`useRef<T>(null)`).
- Atribut `inert` v JSX: React 18 ho zahodí. VIZEON to řeší nastavením přes ref (viz
  `components/AutomationAccordion.tsx` ~ř. 81). Použij stejný postup.
- `use()`, `useActionState`, `<form action>`, ref jako prop: nepoužívat.
- `params` jako `Promise` je v Next 16 stejné v obou: `const { slug } = await params;`.

### 3.3 Pravidla pohybu z alteno (závazná, zkopíruj záměr)

Z `ALT/claude.md` §5, citovaná v hlavičce každé scény:
- Animuje se **jen `transform`, `opacity`, `color`**. Nikdy `width/height/top/left/box-shadow/
  background-position` (v VIZEON navíc perf pravidlo: nikdy `background-position` ani `box-shadow`).
  Proto `min-h` rezervace místa a `scale` místo `width` u konektorů.
- **Žádné smyčky nad ohybem a na pozadí.** Jediné povolené smyčky jsou stavem řízené (zvonění,
  waveform jen když někdo mluví).
- **Reduced motion nikdy neschová obsah.** Vykreslí se **hotový koncový stav** (celý přepis, výsledek,
  rozsvícená cesta). Hook `usePrefersReducedMotion` musí mít `getServerSnapshot = () => false`
  (kvůli hydrataci).
- **Paket (`flyPacket`) musí ležet v netransformovaném kořeni scény**, mimo `preserve-3d` vrstvu.
  Jinak se souřadnice promítnou přes perspektivu a paket mine cíl. Nepřesouvej ho „pro pořádek".
- V `flyPacket` je nutný **vynucený reflow** (`void packet.offsetWidth`) mezi nastavením startu a
  přechodem. Bez něj paket poprvé přiletí z levého horního rohu. Nemaž.
- **Žádné `Math.random()` při renderu** (rozbije hydrataci). Výšky waveformu jsou pevné pole.
- 3D perspektiva jen od `md:`; na mobilu plochý sloupec.

### 3.4 Obsahová pravidla z alteno (zachovat, jsou to obchodní tvrzení)

- **Každá scéna ukazuje případ, který AI nezvládne** (`handoff` u chat/flow/phone, „mimo pravidla"
  u konzole). Nemaž ho.
- **Žádná vymyšlená loga, čísla ani telefonní čísla.** Volající je „Neznámé číslo" / „Číslo z evidence".
  Nástroj bez oficiálního loga se nekreslí (n8n a Python jsou ve Flow jen text v našem uzlu).
- **Voice agenti jsou `comingSoon`.** Nevypínej to, je to obchodní tvrzení majitele. Viditelný štítek
  ve VIZEON zní „Připravuji" (shodně s `lib/data/pricing.ts` a `lib/data/automation.tsx`).
- **Žádné ceny** na podstránkách (typ `Service` pole cena nemá). Cenu řeší odkaz na
  `/cena-tvorby-webu`. Hub si smí ponechat stávající `priceNote` z `lib/data/automation.tsx`.

### 3.5 Co nedělat

- Nepřidávej `gsap`, `motion`, Radix, `tw-animate-css`, `simple-icons`, `@fortawesome/*`.
- Nesahej na n8n/MCP workflow. Tohle **není práce na n8n**, skill `using-n8n-mcp-skills` neplatí.
- Neměň výšku navbaru `h-16 md:h-20`, z-index škálu v `:root`, `lib/alteno.ts`, `middleware.ts`,
  `env.local`.
- Neměň obsah klonu alteno. Nemaž `AutomationFAQ.tsx` ani `lib/data/automation.tsx` (používá je hub).
- Nevypínej `comingSoon`, nepřidávej ceny, nevymýšlej loga.

### 3.6 Ověřování a základní stav

- Příkazy vždy s cestou v uvozovkách: `cd "/Users/krystofsobotka/Desktop/VIZEON /vizeon"`.
- `npm run build` je hlavní brána (typy + statická generace). `npm run lint` je `next lint`,
  který Next 16 nemusí podporovat. **V S0 zjisti, co na čistém stavu projde a co padá**, a zapiš to do
  progress souboru. Později odlišuješ „starý problém" (nech) od „nový problém" (oprav).
- Prohlížeč: `npm run dev` (Turbopack, port 3000). Screenshoty a klikání přes Playwright
  (`npx -y playwright` v adresáři scratchpadu, ne v projektu) nebo přes skill `run`. **Když
  interaktivní ověření nejde provést, napiš to výslovně**, nevydávej build za důkaz animace.
- Šířky pro vizuální kontrolu: 390, 768, 1024, 1280, 1440 px.

---

## 4. Přehled sessions

| # | Název | Výstup | Viditelné v prohlížeči |
|---|---|---|---|
| S0 | Příprava a audit | klon, základní stav, progress soubor | ne |
| S1 | Základ portu | tokeny/CSS, hooky, engine, glyfy, ikony, loga nástrojů | ne |
| S2 | Data + detail (kostra) + **Telefon** | data 4 služeb a scén, stránka `[slug]`, scéna Voice | `/automatizace/voice-agenti` |
| S3 | Scény Chat, Flow, Konzole | zbylé 3 interaktivní scény | 3 další podstránky |
| S4 | Ilustrace + dokončení detailu | Pain, Benefit, UseCase, všechny sekce detailu | celé podstránky |
| S5 | Hub, SEO, sitemap | `/automatizace` jako přehled, JSON-LD, OG, sitemap | `/automatizace` |
| S6 | Navbar + dropdown | `NavDropdown`, `lib/nav.ts`, mobilní akordeon, footer navigace | celá lišta |
| S7 | Co-branding ALTENO × VIZEON | loga, lockup, nasazení na 5 míst | homepage, dropdown, footer |
| S8 | Napojení, úklid, QA | přepis kotev, smazání accordionu, plné QA, závěrečná zpráva | vše |

Pořadí je závazné: S2 potřebuje S1, S4 potřebuje S2, S7 potřebuje S6 (dropdown úvodní blok) atd.

---

## SESSION 0: Příprava a audit

**Cíl:** mít spolehlivý výchozí bod. Žádná změna kódu aplikace.

**Kroky**
1. Přečti §0 až §3. Přečti v klonu `ALT/claude.md` a oba `*-prompt.md` (§1.3).
2. Naklonuj `ALT` (§1.3), případně `git pull`.
3. `git status`, `git log --oneline -8`, `git branch --show-current` (očekáváš `feat/automatizace-alteno`).
   Vypiš uživateli, co je nezacommitované. **Zeptej se (AskUserQuestion), jestli chce před startem
   udělat checkpoint commit rozdělané práce**, aby šla práce na podstránkách odlišit v historii.
   Bez jeho souhlasu necommituj.
4. Základní stav: `npm run build` a `npm run lint`. Zapiš výsledky (prošlo/selhalo, první chyby).
5. Ověř předpoklady z §1.4, které jsou rizikové: existují `app/web-pro-remeslniky`, `app/web-pro-ucetni`,
   `app/web-pro-realitni-maklere`; `tailwind.config.ts` má barvu `accent`; co vrací `hooks/useAnalytics.ts`
   (zda exportuje jen `useAnalytics(page)` s vnitřním `track`; zapiš, zda jde použít pro událost
   `demo_scene_played`, jinak se tracking u scén vynechá, nezaváděj nový backend).
6. Inventura ported souborů: `wc -l` všech souborů z tabulky v §1.5 v klonu, porovnej s tabulkou.
   Když se počty liší o víc než ~10 %, klon se od doby psaní dokumentu změnil, zapiš to a přečti rozdíly.
7. Vytvoř `AUTOMATIZACE-PROGRESS.md` (šablona §9) s checklistem všech session a nahoře se základním
   stavem z bodů 3 až 6.

**Hotovo když:** progress soubor existuje, základní stav buildu a lintu je zapsaný, uživatel rozhodl o
checkpoint commitu, nic v aplikaci se nezměnilo.

---

## SESSION 1: Základ portu

**Cíl:** všechny sdílené stavební kameny, aby S2 až S4 mohly jen skládat. Nic se zatím nezobrazuje.

**Předpoklad:** S0 hotová.

**Kroky**
1. **Adresář** `components/automation/` (nový). Sem jde všechno ported.
2. **Engine a hooky** (kopie z `ALT/components/services/` a `ALT/components/motion/`):
   - `useSceneScript.ts` (227 ř.) → `components/automation/useSceneScript.ts`. Nech všechny konstanty
     (`PACKET_HALF = 13`, `RIGHT_INSET = 34`, `DEFAULT_FLIGHT_MS = 520`, `FADE_MS = 200`,
     `TYPE_TICK_MS = 18`, `TYPE_CHARS_PER_TICK = 2`, `threshold: 0.35`) a komentáře o pastech.
   - `usePrefersReducedMotion.ts` (30 ř.).
   - Oprav importy (`@/…` cesty) a případné React 19 konstrukce (§3.2).
3. **Glyfy:** `components/motion/process-icons.tsx` → `components/automation/process-icons.tsx`
   (430 ř., 35 ručně kreslených ikon; každá rozprostírá `{...props}` na `<svg>`, **nech**, Benefit je
   používá jako potomky SVG s `x/y/width/height`). Zkontroluj, zda VIZEON už podobný soubor nemá
   (nemá), aby nevznikl duplikát.
4. **Ikony scén:** `demo-icons.ts` (48 ř.) → mapa `DemoIcon` → komponenta (import z `process-icons`).
5. **Loga nástrojů:** `demo-tools.ts` (64 ř.) přepiš podle §2.4 bod 2: 6 `path` řetězců vlož přímo
   (vyčti je z `node_modules` klonu nebo z výpisu `simple-icons`/FA v klonu: `cd ALT && node -e "…"`).
   Typ `DemoTool` (`name`, `path`, `viewBox?`) a export `DEMO_TOOLS` zachovej, klíče `gmail`, `shopify`,
   `quickbooks`, `typeform`, `hubspot`, `slack`.
6. **ArtworkFrame:** `components/motion/ArtworkFrame.tsx` (130 ř.) → `components/automation/ArtworkFrame.tsx`.
   Přemapuj barvy (§2.2). Exportuje konstanty `TURQUOISE`, `MINT`, `NODE_FILL`: přejmenuj na
   `GOLD`, `GOLD_LIGHT`, `NODE_FILL` **a** oprav všechny budoucí importy (S4). `gradientUnits="userSpaceOnUse"`
   u gradientu čáry je povinné (komentář v souboru vysvětluje proč), nemaž.
7. **CSS do `app/globals.css`** (na konec, pod vlastní hlavičkou `/* ─── Automatizace (port z alteno) ─── */`):
   - `@keyframes voice-wave` (`0%,100% scaleY(0.2)`, `50% scaleY(1)`) a `.animate-voice-wave`
     (`900ms ease-in-out infinite`).
   - `.pain-panel`, `@keyframes pain-jolt`, `.group:hover .pain-jolt` (1× 0.45 s), `.benefit-panel`,
     `.benefit-lift` + hover (`translateY(-4px)`, 0.6 s). Zkopíruj z `ALT/app/globals.css` ř. ~446 až
     520 a **přemapuj barvy**: pain = neutrální teplá šedá se šrafováním, benefit = zlatý tint zespodu
     (`rgba(201,168,76,…)`).
   - Blok `@media (prefers-reduced-motion: reduce)` pro `.animate-voice-wave`, `.pain-jolt`, `.benefit-lift`.
   - **`@keyframes nav-panel-in`** (opacity 0→1, `translateY(-4px) scale(.98)`→none, 150 ms) pro dropdown (S6).
   - Plus `tailwind.config.ts`: `extend.keyframes` a `extend.animation` pro `voice-wave` a `nav-panel-in`
     (aby šly používat jako `animate-voice-wave`, `animate-nav-panel-in`).
8. **Skript přemapování barev** (jednorázový, **ve scratchpadu, ne v repu**): perl/node skript, který
   aplikuje tabulku §2.2 na zadaný soubor. Použiješ ho i v S2 až S4. Suchý běh (`--check`) nejdřív vypíše,
   co by změnil. Po běhu vždy `grep zinc-` a `grep brand-` (nesmí nic zbýt).

**Hotovo když**
- Všechny soubory z bodů 2 až 6 existují, **nemají `zinc-`, `brand-turquoise`, `brand-mint`, `font-mono`**.
- `npx tsc --noEmit` nemá nové chyby (soubory zatím nikdo neimportuje, takže typy musí sedět samy).
- `npm run build` prochází. `globals.css` a `tailwind.config.ts` obsahují nové keyframes.

---

## SESSION 2: Data + detail (kostra) + scéna Telefon

**Cíl:** první funkční podstránka `/automatizace/voice-agenti` s animací „někdo volá někomu". Je to
nejdůležitější scéna (uživatel ji výslovně chtěl) a zároveň test celého enginu.

**Předpoklad:** S1 hotová.

**Kroky**
1. **Data služeb** `lib/data/automation-pages.ts` ← `ALT/lib/services.ts` (597 ř.). Zachovej typy
   `BenefitArt`, `PainArt`, `Service` (včetně komentářů). Změny:
   - Slug `automatizace` → **`automatizace-procesu`** (shoduje se se stávajícím `AutomationServiceId`
     v `lib/data/automation.tsx`). Ostatní: `ai-agenti`, `chatboti-rag`, `voice-agenti` (`comingSoon: true`).
   - Pole `relatedArea` **odstraň** (VIZEON nemá „oblasti"), včetně sekce, která ho zobrazuje.
   - `whoItsFor.relatedProKoho` → přejmenuj na `relatedIndustries` a nahraď slugy cílovými URL podle
     tabulky: `sluzby-a-remesla` → `/web-pro-remeslniky` („Řemeslníci a služby"), `ucetni-a-financni-firmy`
     → `/web-pro-ucetni` („Účetní"), `realitni-kancelare` → `/web-pro-realitni-maklere` („Realitní makléři").
     `e-shopy` a `vyrobni-firmy` nemají ve VIZEON stránku, **vypusť**. Když služba nemá žádnou
     odpovídající, panel zobrazí jen text.
   - `whatWeConnect.relatedNastroje` → `tools: string[]` (jen **neodkazované** štítky názvů nástrojů,
     např. „n8n", „Python", „Claude"; VIZEON nemá `/nastroje`).
   - Texty: aplikuj §2.3 (pomlčky). Zmínky „ALTENO" v textu nech, je to sesterská značka.
   - Typ nemá pole `price` ani `href` **schválně**. Nepřidávej.
   - Exportuj `automationPages` (pole), `getAutomationPage(slug)`.
2. **Skripty scén** `lib/data/automation-demos.ts` ← `ALT/lib/service-demos.ts` (786 ř.). Zachovej typy
   (`ConsoleDemo`, `ChatDemo`, `FlowDemo`, `PhoneDemo`, `ServiceDemo`), `DemoIcon`, `getServiceDemo`.
   Přemapuj klíče slovníku na nové slugy (`automatizace` → `automatizace-procesu`). Texty nech, §2.3.
   **Ověř invarianty typy i ručně:** každá scéna má případ s `handoff`/„mimo pravidla"; `caller` u telefonu
   není číslo; `FlowRun.steps` mají přesně 4 kroky; `FlowDemo.captions` zrcadlí `how` z dat služby.
3. **Scéna Telefon** `components/automation/ServicePhone.tsx` ← `ALT/components/services/ServicePhone.tsx`
   (557 ř.). Spusť skript přemapování barev, pak ručně projdi §3.1 a §3.2. Zachovej **beze změny**:
   - konstanty časování `RING_DWELL_MS = 620`, `ANSWER_MS = 420`, `INTENT_DELAY_MS = 260`,
     `LINE_GAP_MS = 320`, `RESULT_DELAY_MS = 300`, `AUTOPLAY_DELAY_MS = 420`;
   - fáze `idle → ringing → answering → talking → done` a stav `spoken`, `typed`, `speaker`,
     `intentShown`, `resultShown`, `packetIcon`;
   - sekvenci `play`: `flyPacket(tlačítko hovoru → telefon)` → zvonění (`animate-ping` kroužek) →
     „agent zvedá" → přepis po řádcích (`typeOut`, rekurzivní `speakLine`) → chip rozpoznaného záměru po
     prvním řádku → `flyPacket(telefon → výsledek)` → výsledek + případný `handoff` chip;
   - waveform: 16 sloupců, **pevné** výšky `[10,16,24,14,30,20,36,26,18,32,22,38,16,28,12,20]`,
     `animate-voice-wave` jen když `speaker !== null`, barva podle mluvčího (agent = akcent, volající = neutrální
     světlá, ticho = tmavá), v klidu inline `transform: scaleY(0.18)`;
   - layout 2 sloupce `md:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)]`, výběr hovoru **zalomený**
     (`flex-wrap`), ne horizontální scroll (třetí hovor je ten s předáním člověku a nesmí se schovat);
   - rezervace místa (`min-h-[1.75rem]` u záměru, `min-h-[11.5rem]` u přepisu);
   - reduced motion: rovnou `phase = "done"`, plný přepis, bez letu a psaní.
   Tracking (`track("demo_scene_played", …)`): podle zjištění z S0 buď napoj na existující analytiku, nebo
   **odstraň volání** (bez dopadu na chování).
   Co se mění jen vzhledově: tělo telefonu `bg-[#0e0e0e]`/`border-accent/30`, zlatý glow, hranatější bubliny.
4. **Stránka** `app/automatizace/[slug]/page.tsx` (kostra, dokončí se v S4). Základ podle
   `ALT/app/sluzby/[slug]/page.tsx`, ale ve VIZEON rámu:
   - `export function generateStaticParams()` z `automationPages`; `generateMetadata` (title
     `${seoTitle} | VIZEON`, description = `lead`, `canonical: https://vizeon.cz/automatizace/${slug}`,
     `openGraph`); `notFound()` pro neznámý slug.
   - `<PageShell jsonLd={…}>` + `<AnalyticsTracker page={`/automatizace/${slug}`} />` + kontejner
     `cn(t.container.wide, "pt-16 md:pt-24 pb-16 md:pb-24")`. Pro scénu široký `max-w-5xl`, text `max-w-3xl`.
   - Hlavička: zpět-odkaz (`t.backLink`, „← Zpět na přehled automatizací" → `/automatizace`), u voice štítek
     „Připravuji", eyebrow `— Automatizace by ALTENO`, `<h1 className={t.h1}>`, lead (`t.lead`).
     **Hero se nebalí do fade-in** (H1 musí být v SSR HTML viditelný, LCP).
   - `renderScene(demo)` jako `switch (demo.kind)` s `never` guardem. V S2 je naimportovaná jen scéna Phone. Pro zbylé 3 dočasně `return null` **s `TODO(S3)`**
     a `never` guard nahraď `default`. V S3 se dopojí a guard se vrátí.
   - Scéna se renderuje hned pod hlavičkou (`mt-10 sm:mt-12`).
   - Ostatní sekce zatím vynech (S4).
5. Dočasně ověř, že `/automatizace/ai-agenti` atd. **nepadá** (vrací stránku s H1, bez scény).

**Hotovo když**
- `npm run build` projde, vygeneruje 4 slugy.
- `/automatizace/voice-agenti` v prohlížeči: scrollem do výřezu se scéna **sama spustí** (práh 35 %,
  jednou), kliknutí na každou ze 3 variant hovoru přehraje celou sekvenci (zvonění → přepis → waveform →
  záznam), třetí hovor ukáže předání člověku, paket **trefí** telefon a výsledek (na 1440 i 390 px),
  3D náklon jen od `md`, žádný horizontální scroll.
- Emulace `prefers-reduced-motion: reduce` → rovnou hotový stav.
- V `ServicePhone.tsx` žádné `zinc-`, `brand-`, `font-mono`.

---

## SESSION 3: Scény Chat, Flow, Konzole

**Cíl:** zbylé 3 interaktivní scény, každá na své podstránce.

**Předpoklad:** S2 hotová a prošla ověřením.

**Kroky**
Pro každou scénu: `cp` z klonu → skript přemapování barev → §3.1/§3.2 → dopojit v `renderScene`.

1. **`ServiceChat.tsx`** (474 ř.) pro `chatboti-rag`. Zachovat: fáze `idle|asking|searching|answering|done`;
   `ASK_DELAY_MS=300`, `SEARCH_DWELL_MS=460`, `CITE_DELAY_MS=240`, `AUTOPLAY_DELAY_MS=420`; tři tečky
   „píše" (`animate-pulse` se zpožděním `dot*160ms`); let paketu otázka → konkrétní zdroj (nebo celý panel
   znalostí, když `sourceId === null`) → zpět do odpovědi; `missed` jako samostatný boolean; odpověď psaná
   `typeOut` s kurzorem; citace a `handoff` chip; **text pasáže zdroje je vždy v DOM** (mění se jen barva,
   výška karty se neanimuje); falešný „composer" je `div`, ne `<input>`, `aria-hidden`.
2. **`ServiceFlow.tsx`** (603 ř.) pro `automatizace-procesu`. Zachovat: 4 uzly, `FLIGHT_MS=460`,
   `HOP_DWELL_MS=240`, `START_DELAY_MS=260`, `RESULT_DELAY_MS=300`; rekurzivní `hop(i)`; uzly 2 a 3 uvnitř
   **čárkovaného rámu „Moje vrstva"** se štítkem na hraně (celý argument scény: systémy zákazníka venku,
   naše vrstva mezi nimi); `nodeTone()`: akcent jen pro `core` uzly; loga značek z `DEMO_TOOLS` (chybějící
   slug = nekreslit); `FlowLink` plněný přes `scale` (ne `width`); před výběrem se vykreslí tvar první
   varianty nerozsvícený; log a výsledek.
3. **`ServiceConsole.tsx`** (370 ř.) pro `ai-agenti`. Zachovat: `FLIGHT_MS=620`, `STEP_GAP_MS=260`; let
   z **pravého okraje** tlačítka (`fromAnchor: "right"`); psaní „say" bez `aria-live`; kroky po jednom;
   jádro = SVG kroužek s rotujícím obloukem (`animate-spin`, `strokeDasharray="26 68"`) jen při práci;
   fronta vlevo (na mobilu `overflow-x-auto`, na desktopu sloupec), výsledek vpravo.
4. V `renderScene` doplň všechny 4 větve a vrať `never` guard do plné podoby.
5. Stejné kontroly jako v S2 (autoplay, všechny varianty, reduced motion, 390/1440 px).

**Hotovo když**
- Na `/automatizace/chatboti-rag` fungují všechny 3 otázky včetně té, co **není ve znalostech** (`sourceId null`
  → „nenalezeno" → předání člověku).
- Na `/automatizace/automatizace-procesu` paket proletí všemi 4 uzly pro každou ze 3 variant a rozsvítí
  nejdřív jen `core` uzly zlatě.
- Na `/automatizace/ai-agenti` fronta → psaní → kroky → výsledek, včetně případu „mimo pravidla".
- Build prochází, žádné `zinc-`/`brand-` v nových souborech, reduced motion ukazuje koncový stav.
- Tailwind 3 pasti (§3.1) prošly `grep` kontrolou a výsledek je zapsaný v progress souboru.

---

## SESSION 4: Ilustrace a dokončení detailu

**Cíl:** podstránky mají všechny sekce z alteno a vypadají celé.

**Předpoklad:** S3 hotová.

**Kroky**
1. **`PainArtwork.tsx`** (600 ř., 16 SVG scén) a **`BenefitArtwork.tsx`** (1352 ř., 20 SVG scén):
   `cp` + přemapování konstant barev na začátku souborů (`HI/MID/LOW/FILL` u Pain; `T/M/N/DIM/FAINT` u
   Benefit). **Nesahej na SVG cesty.** Pain musí zůstat bez akcentu, Benefit akcent jen na „řešení"
   (§2.2). Oba zůstávají **server komponenty** (bez `"use client"`). Import ikon z
   `components/automation/process-icons`. Mapa `SCENES: Record<PainArt|BenefitArt, …>` musí zůstat
   `Record` (nový klíč bez scény = chyba buildu, to je záměr). Importy `TURQUOISE/MINT` z ArtworkFrame
   přejmenuj (S1 bod 6).
2. **`UseCaseArtwork.tsx`** (129 ř.): dvě vrstvy (`ArtworkFrame` jako pozadí + SVG `viewBox 0 0 240 80` s motivem
   dokument → zpracování → hotovo). Přemapuj barvy (gradient tyrkys→mint → zlatá→světle zlatá).
   Gradientová `id` jsou v server komponentě předávána parametrem (`id={`uc-${slug}-${i}`}`), nepoužívej
   `useId()`.
3. **Dokončení `app/automatizace/[slug]/page.tsx`** podle pořadí v §1.5:
   - **„Co vás dnes zdržuje"** (`<ul>`, `lg:grid-cols-2`): horizontální karta, vlevo čtverec `w-28 sm:w-40`
     s `<PainArtwork art={item.art} />`, vpravo index `01…` a text. Karta má třídu `group` (kvůli `pain-jolt`
     na hover).
   - **„Jak to funguje"**: číslovaný `<ol>` s levým borderem a kroužky s číslem vlevo (na pozici `-left-14`
     jako v předloze; ověř, že na mobilu nevyleze mimo kontejner, jinak úprava jen pro `<sm`).
     Záložní `MiniProcessDiagram` se **nepřenáší** (u všech 4 služeb existuje scéna).
   - **Dva panely vedle sebe** (`lg:grid-cols-2`): „Pro koho to dává smysl" (text + odkazy
     `relatedIndustries` jako chipy, prázdné pole = jen text) a „Co s tím propojím" (text + neodkazované
     štítky `tools`).
   - **„Kde se to nejvíc vyplatí"**: karta na use case, `sm:grid-cols-2`, lichá poslední přes
     `sm:col-span-2`, nahoře `h-28` `UseCaseArtwork`.
   - **„Co získáte"**: bento `lg:grid-cols-6`; první přínos velký (`lg:col-span-4 lg:flex-row`, obrázek
     `lg:w-[58%]`), ostatní `lg:col-span-2` s obrázkem `h-40` nahoře; počítadlo `01 / 05`. Layout je
     **natvrdo pro přesně 5 přínosů** (komentář v předloze), u jiného počtu se rozpadne, datový soubor
     musí mít 5.
   - **„Časté otázky"**: `miniFaq` jako `h3`/`p` (statické, **ne** interaktivní accordion), shoda s JSON-LD.
   - **Závěrečné CTA**: `ClosingCTA` (heading „Zní to jako něco, co byste využili?"). Pod ním odkaz na
     `/cena-tvorby-webu` pro cenu a odkaz zpět na `/automatizace`.
   - Reveal na scrollu: framer-motion `fadeUp` + `viewport` s `useReducedMotion`. Hero a scéna **bez** reveal.
   - **JSON-LD** `@graph`: `BreadcrumbList` (Domů → Automatizace → služba), `Service`
     (provider ve stejném tvaru jako v `app/automatizace/page.tsx`), `FAQPage` z `miniFaq`.
4. **`opengraph-image.tsx`** pro `[slug]`: přes `buildOgImage(title, subtitle)`; title služby, subtitle
   „ALTENO × VIZEON". Ověř, že se titulek vejde.

**Hotovo když**
- Všechny 4 podstránky mají všechny sekce, žádný prázdný box, žádný rozbitý odkaz.
- Pain ilustrace jsou neutrální, Benefit mají zlatý akcent. Při najetí myší jemně „cuknou" / „nadskočí".
- Bento drží na 1440, 1024 i 390 px (na mobilu jeden sloupec, obrázky nahoře).
- `npm run build` projde, `view-source` podstránky obsahuje H1, lead, pain/benefit texty a FAQ
  (SEO: text není jen po hydrataci).
- JSON-LD je validní JSON, FAQ v něm odpovídá viditelnému textu 1:1.

---

## SESSION 5: Hub, SEO, sitemap

**Cíl:** `/automatizace` je přehled 4 služeb (karty), accordion je pryč ze stránky.

**Předpoklad:** S4 hotová.

**Kroky**
1. Přečti aktuální `app/automatizace/page.tsx` (227 ř.) a `ALT/app/sluzby/page.tsx` (172 ř.).
2. **Hub** (upravuj stávající soubor, zachovej co funguje): hero zůstává (eyebrow „— Automatizace by ALTENO", H1,
   lead, pilulka „Sesterská značka", dvě CTA). Místo `<AutomationAccordion />` vlož **grid 4 karet**
   (`grid-cols-1 sm:grid-cols-2`): karta = plnoformátový náhled nahoře (`h-32 sm:h-36`, `ArtworkFrame`-based
   scéna služby), název (`t.h3`/`h2`), jednověté `summary`, „Zjistit víc →", u voice štítek „Připravuji".
   Kartu `ai-agenti` ve stylu zvýrazněné (`border-[rgba(201,168,76,0.2)]`). Celá karta je odkaz na
   `/automatizace/<slug>`, `group`, `card-shimmer-line`, hover zlatý.
   - **Náhledové ilustrace karet** (`ALT/components/motion/ServiceArtwork.tsx`, 409 ř.: 4 scény Agent,
     Pipeline, Voice, Knowledge v `viewBox 0 0 320 160`): přenes jako `components/automation/ServiceArtwork.tsx`
     (barvy přemapovat, `id` předávej parametrem). Je to jediný zdroj náhledů karet.
   - Ponechej stávající sekce pod gridem: Balíčky, Rodina značek, Jak to probíhá, FAQ (`AutomationFAQ`),
     `ClosingCTA`, back-link. (Sekci „Rodina značek" převede S7 na nový lockup.)
   - Zrušit import `AutomationAccordion`.
3. **`lib/data/automation.tsx`**: ponech `AUTOMATION_BUNDLES`, `AUTOMATION_STEPS`, `AUTOMATION_FAQ`.
   `AUTOMATION_SERVICES` napoj na nová data: zdroj názvu, summary, ikony a stavu je `automation-pages.ts`,
   ponech `priceNote`, `altenoPath`, `cta` pro hub a JSON-LD. Pole `id`/kotvy zůstanou jen jako **suffix UTM
   kampaně** (`lib/alteno.ts`), **neodkazují už na kotvy**.
4. **JSON-LD hubu**: `hasOfferCatalog` → URL nabídek jsou `https://vizeon.cz/automatizace/<slug>` (dřív
   kotvy). Ostatní (Breadcrumb, FAQ) beze změny. `generateMetadata` hubu zachovej (komentář o tom, že se
   záměrně nevyhýbá hlavním frázím ALTENO, nemaž).
5. **`app/sitemap.ts`**: přidej 4 položky `/automatizace/<slug>` (priorita `0.7`, `changeFrequency` stejné
   jako u `/automatizace`, `lastModified` ve stejném formátu jako ostatní položky = datum dnešní session).
   `/automatizace` ponech (0.8).
6. `opengraph-image.tsx` hubu: titulek s „ALTENO × VIZEON".

**Hotovo když**
- `/automatizace` ukazuje 4 karty a každá vede na správnou podstránku (klikni na všechny).
- Na hubu není `AutomationAccordion` a nic ho neimportuje z hubu (soubor se maže až v S8).
- `view-source` hubu obsahuje odkazy na 4 podstránky. Sitemap obsahuje 4 nové URL
  (`npm run dev`, otevři `/sitemap.xml`).
- Build prochází.

---

## SESSION 6: Navbar s dropdownem

**Cíl:** sekce Automatizace v navbaru s dropdownem a (na mobilu) rozbalovací skupinou. **Nejrizikovější
session pro layout**, proto je samostatně.

**Předpoklad:** S5 hotová (cíle odkazů existují).

**Kroky**
1. **`lib/nav.ts`**: nová struktura při zachování jediného zdroje pravdy:
   ```ts
   export type NavLinkItem = { label: string; href: string; comingSoon?: boolean; separatorAfter?: boolean };
   export type NavGroup = { label: string; href: string; items: NavLinkItem[]; intro?: boolean };
   export type NavEntry = NavLinkItem | NavGroup;   // "items" in entry => skupina
   export const NAV_STRUCTURE: NavEntry[] = [ … ];
   ```
   Pořadí (10 top-level): **O mně, Služby, Automatizace▾, Obory, Spolupráce, Projekty, Ceník, ZakazIQ,
   Blog▾, Kontakt.**
   - `Automatizace▾` (`href: "/automatizace"`, `intro: true`): položky *Přehled automatizací*
     (`/automatizace`, `separatorAfter`), *AI agenti na míru* (`/automatizace/ai-agenti`), *Automatizace procesů*
     (`/automatizace/automatizace-procesu`), *Chatboti a RAG* (`/automatizace/chatboti-rag`), *Voice agenti*
     (`/automatizace/voice-agenti`, `comingSoon`). Názvy a pořadí generuj z `automationPages`, ať se
     nerozejdou (přehled přidáš ručně).
   - `Blog▾` (`href: "/blog"`): *Blog* (`/blog`), *FAQ* (`/faq`).
   - `FAQ` už není samostatná top-level položka.
   - **Footer** dál potřebuje plochý seznam: zachovej export `NAV_LINKS: NavLink[]` jako **odvozený**
     (top-level odkazy; pro skupinu Blog rozbal na *Blog* a *FAQ*, pro ostatní skupiny jen její `href`).
     Footer tak nepřijde o FAQ. Čtyři podstránky Automatizace přidá S6 do footeru zvlášť (bod 7).
2. **`components/NavDropdown.tsx`** (client), port `NavDropdown` z `ALT/components/layout/Navbar.tsx`
   (ř. ~132 až 316). Zachovat **chování přesně**:
   - Hover-intent: `onPointerEnter` otevře **jen pro `pointerType === "mouse"`**; `onPointerLeave` zavře po
     `CLOSE_DELAY_MS = 150` (pokryje diagonální přejezd kurzoru).
   - Klik na trigger: pokud `event.detail !== 0 && openedByHover.current`, klik se **spolkne** (neotevírá/nezavírá);
     klávesnice (`detail === 0`) přepíná normálně.
   - Escape (listener jen při otevřeném): zavře a vrátí fokus na trigger, **jen když je fokus uvnitř**.
   - Klik mimo (`pointerdown` na dokumentu) a `onBlur` skupiny (`relatedTarget` mimo) zavírají.
   - Zavření při změně `usePathname()` **během renderu** (`lastPathname` state), ne v efektu. Klik na položku
     také zavírá.
   - A11y: `<button aria-expanded aria-controls={useId()}>`, panel je obyčejný `<ul>` odkazů, **ne
     `role="menu"`**. Panel je v SSR HTML s atributem `hidden`, takže crawler vidí odkazy bez JS.
   - Pozicování: `absolute left-0 top-full z-50 pt-2.5` (mezera je **padding** pozicovače, ne margin, aby byla
     součástí hover cíle).
   - **Odchylka pro VIZEON:** trigger je **dvojice** `Link` (text, vede na `href` skupiny) + tlačítko s
     chevronem (přepíná). Tak je `/automatizace` a `/blog` prokliknutelné a klávesnice má dva tab-stopy.
   - Vzhled: panel `min-w-64 bg-[#0e0e0e] border border-white/[0.06] p-1.5 shadow-lg shadow-black/40`,
     vstup `animate-nav-panel-in` (S1). Položky Inter `text-[12px] uppercase tracking-[0.08em] text-[#8a8070]`,
     hover `text-[#f0ece6] bg-white/[0.04]`, `focus-visible` stejně. Oddělovač `separatorAfter`:
     `<li aria-hidden className="-mx-1.5 my-1.5 h-px bg-white/[0.06]" />`. Štítek `comingSoon`: pilulka
     „Připravuji" (`border border-accent/40 text-accent text-[10px] uppercase px-1.5 py-0.5`).
   - Chevron: `lucide-react` `ChevronDown`, `rotate-180` při otevření, `transition-transform`.
   - **Úvodní blok** (`intro: true`): nad seznamem `<li>` s místem pro komponentu (S7 vloží lockup + větu).
     V S6 vlož zatím **placeholder** `<IntroSlot />` se statickým textem „Automatizace a AI ve spolupráci s ALTENO"
     a komentářem `TODO(S7)`; struktura a výška panelu tak už sedí.
3. **`components/Navbar.tsx`**: desktop `.map(NAV_STRUCTURE)`: odkaz → stávající `Link` se stejnými
   třídami; skupina → `<NavDropdown>`. **Stávající třídy položek zachovej** (`font-inter font-normal
   text-[12px] tracking-[0.08em] text-[#8a8070] hover:text-[#f0ece6] … uppercase whitespace-nowrap`).
   `h-16 md:h-20` a mezery `gap-5 lg:gap-6 xl:gap-8 2xl:gap-12` **beze změny**. Chevron přidá ~14 px ke dvěma
   položkám: **změř** (viz ověření) a teprve když se nevejde, uber `gap` v pásmu `md` až `lg` (poslední možnost,
   zapiš a zdůvodni).
4. **Mobil** (overlay zůstává: `AnimatePresence`, `stagger`, `fadeIn`, Cormorant `text-4xl`): položka-skupina
   se stane **rozbalovací**: řádek s odkazem na hub + tlačítko (chevron, `aria-expanded`, cíl ≥ 44 px) rozbalí
   pod-položky (framer-motion `height: auto` + `opacity`, bez animování layout vlastností mimo to; u
   `prefers-reduced-motion` bez animace). Pod-položky menším písmem (Cormorant `text-2xl` nebo Inter),
   odsazené, `comingSoon` štítek. Kliknutí na odkaz zavře celé menu. Escape a zamykání scrollu zůstávají.
   Úvodní blok Automatizace nahoře ve skupině (placeholder do S7).
5. **Footer** (`components/Footer.tsx`): navigace čte odvozený `NAV_LINKS` (nemělo by se vizuálně změnit,
   jen Automatizace je navíc). Přidej pod navigaci **krátký seznam 4 podstránek** Automatizace (nadpis
   „Automatizace", stejné třídy odkazů jako `NAV_LINKS`). Blok „Rodina značek" zatím nech.

**Hotovo když**
- Desktop: hover na Automatizace otevře panel po najetí a zavře po 150 ms od opuštění; klik na text vede na
  `/automatizace`; klik na chevron přepíná; Tab projde text → chevron → položky; Escape vrátí fokus;
  klik mimo zavře; po navigaci se zavře. Totéž u Blog.
- **Lišta se vejde na jeden řádek** při 768, 900, 1024, 1180, 1280, 1440 px (změř `scrollWidth` vs
  `clientWidth` navu nebo screenshot), CTA se nepřekrývá s menu. Nic nepřeteče.
- Mobil (390 px): menu se otevře, skupiny se rozbalují, odkazy fungují, menu se po kliknutí zavře.
- Panel je v SSR HTML (`curl localhost:3000/ | grep "automatizace/ai-agenti"`).
- Build prochází. Footer má FAQ, Blog i nový seznam 4 podstránek.

---

## SESSION 7: Co-branding ALTENO × VIZEON

**Cíl:** klientovi je hned jasné, že jde o spolupráci. Oba plné wordmarky, jedna komponenta, pět míst.

**Předpoklad:** S6 hotová (úvodní blok dropdownu existuje jako placeholder).

**Kroky**
1. **`components/brand/AltenoLogo.tsx`**: `cp ALT/components/brand/AltenoWordmark.tsx`. **Cesty (`LETTERS`,
   `ACCENT`) nepřepisuj ani nepřekresluj** (jsou odvozené z `alteno-logo.png`, přesný tvar: „A" bez příčky,
   „E" s oddělenou horní čárkou, široké „O"). Barvy nahraď pevnými atributy místo tříd:
   písmena `fill="#F4F4F5"`, akcent `fill="#2DD4BF"`. Zachovej `viewBox="0 0 939 126"`, `fillRule="evenodd"`
   u písmen, props `className`, `title`, a variantu `AltenoInline` jen pokud ji použiješ (jinak vynech).
   Smaž komentáře o tokenech `zinc-100`/`brand-turquoise`, které ve VIZEON neplatí, ponech ty o tvaru.
2. **`components/brand/VizeonLogo.tsx`**: wordmark VIZEON shodný se stávajícím logem v `Navbar.tsx`:
   Cormorant light, `uppercase`, široký prostrk (`tracking-[0.2em]`), barva `#f0ece6`; volitelně
   (`withClaim`, jen velikost `lg`) pod ním **tenká zlatá linka** a claim „Vize. Vývoj. Výsledky."
   (Inter, 9px, uppercase, `text-[#8a8070]`). Zkopíruj `ALT/public/vizeon-logo.png` (kulaté logo,
   256×256) do `public/vizeon-logo.png`. Použij ho **jen** tam, kde je potřeba bitmapa (OG obrázek, případně
   JSON-LD `logo`/`image`, pokud taková vlastnost v repu už existuje). Ve vodorovném lockupu jej nepoužívej.
3. **Sladění optické výšky** obou log. ALTENO má výšku verzálek 104,54 / 126 výšky svého `viewBox`. Zvol výšky
   SVG `sm` ≈ 14 px, `md` ≈ 20 px, `lg` ≈ 28 px. Velikost písma `VizeonLogo` nastav tak, aby **výška verzálek
   Cormorantu** (~0,63 em) odpovídala verzálkám ALTENO (0,83 × výška SVG). Ověř **očima na screenshotu**, že
   obě slova sedí na stejné účaří a mají stejnou výšku, doladit.
4. **`BrandLockup`** (v `components/brand/AltenoMark.tsx` nebo nový `BrandLockup.tsx`; importy v repu
   dohledáš `grep -rn "BrandLockup\|AltenoMark" app components`): `ALTENO × VIZEON`, tedy
   `AltenoLogo`, tenký `×` (`font-inter font-light text-[#8a8070]`), `VizeonLogo`. Props: `size`
   (`sm|md|lg`), `className`, `altenoHref?` (logo ALTENO je `<a target="_blank" rel="noopener">` s
   `aria-label="ALTENO (otevře alteno.cz)"`), VIZEON vede na `/`. Celek `role="group"` s
   `aria-label="ALTENO ve spolupráci s VIZEON"`. Obě loga mají stejné `items-center` zarovnání.
   Textový `AltenoMark` nahraď `AltenoLogo` a odstraň (po `grep` všech použití: `Footer`, `AltenoBand`,
   `app/automatizace/page.tsx`). Smaž `TODO(ALTENO-LOGO)`.
5. **Nasazení na 5 míst** (vždy s `altenoUrl(…)` z `lib/alteno.ts`, kampaně už existují; přidej novou
   jen když žádná nesedí, a přidej ji do unionu `AltenoCampaign`):
   1. **Homepage Hero** (`components/Hero.tsx` ~ř. 126 až 133): nahraď větu `→ ALTENO` blokem pod hlavními CTA:
      `BrandLockup size="sm"` + krátký řádek „Weby a automatizace pod jednou střechou" + odkaz
      „Automatizace →" na `/automatizace`. Zachovej animaci `fadeIn` a pořadí `delay`. Lockup musí být
      **nad ohybem** na 1440×900 i 390×844.
   2. **`components/AltenoBand.tsx`**: velký lockup `size="lg"`, zbytek pruhu beze změny.
   3. **Dropdown Automatizace** (úvodní blok z S6): nahraď placeholder blokem: `BrandLockup size="sm"` +
      věta „Automatizace a AI ve spolupráci s ALTENO." (přes skill `humanize-text-cs`), blok je první v panelu,
      pod ním oddělovač a 4 služby. Na mobilu stejný blok v hlavičce rozbalené skupiny.
   4. **Footer**: blok „Rodina značek" (~ř. 64 až 95) přepiš na nový lockup `size="sm"` a krátký text
      (zachovej odkaz na `/automatizace`).
   5. **Sekce Automatizace**: `app/automatizace/page.tsx` nahoře **nad H1** velký lockup (`size="lg"`,
      `withClaim`), stávající „Rodina značek" sekci ponech a použij v ní nový lockup;
      `app/automatizace/[slug]/page.tsx` v hero menší lockup (`size="sm"`) jako řádek nad H1 (vedle
      eyebrowu, na mobilu pod ním). Hlavní heading hubu zůstává `<h1>` jednou na stránce.
6. **OG obrázky** automatizace: titulek obsahuje „ALTENO × VIZEON" (hub i `[slug]`), případně
   `vizeon-logo.png`, pokud `buildOgImage` snese obrázek. Jinak jen text, nepřepisuj `lib/ogImage.tsx`
   bez důvodu.

**Hotovo když**
- Lockup s oběma plnými logy je vidět a čitelný: Hero (nad ohybem), `AltenoBand`, otevřený dropdown
  (desktop i mobil), Footer, hub a hero každé podstránky.
- Logo ALTENO porovnané s `ALT/public/alteno-logo.png` **drží tvar** a barvy i v nejmenší velikosti; obě
  slova mají stejnou optickou výšku a účaří.
- Odkaz ALTENO míří na `https://www.alteno.cz/?utm_source=vizeon&utm_medium=cross-sell&utm_campaign=…`;
  na pozadí `#080808` i `#0e0e0e` je kontrast dostatečný.
- Žádný zbylý import `AltenoMark` (grep), build prochází.

---

## SESSION 8: Napojení, úklid, QA, závěrečná zpráva

**Cíl:** nic nevisí, nic nevede do prázdna, všechno je ověřené a zdokumentované.

**Předpoklad:** S0 až S7 hotové.

**Kroky**
1. **Přepis kotev** `/automatizace#<id>` → podstránky (mapování id → slug: `ai-agenti`→`ai-agenti`,
   `automatizace-procesu`→`automatizace-procesu`, `chatboti-rag`→`chatboti-rag`, `voice-agenti`→`voice-agenti`):
   `lib/data/services.tsx` (ř. ~51 a `AUTOMATION_HIGHLIGHT` chips ~129 až 132),
   `app/sluzby/ai-chatbot/page.tsx:115`, `app/web-pro-remeslniky/page.tsx:267`,
   `app/web-pro-ucetni/page.tsx:214`, `app/web-pro-realitni-maklere/page.tsx:49`. Zkontroluj, že odkazující
   věta stále dává smysl. Finální `grep -rn "automatizace#" app components lib` nesmí nic vrátit (kromě
   komentářů, které oprav).
2. **Úklid:** `grep -rn "AutomationAccordion" app components lib`. Když nic neimportuje,
   smaž `components/AutomationAccordion.tsx`. Smaž ostatní nepoužité soubory této práce (nepoužité
   exporty v `lib/data/automation.tsx`, pozůstatky `AltenoMark`). **Dotazem potvrď smazání** souborů,
   které nejsou výslovně v tomhle dokumentu. `AutomationFAQ` zůstává.
3. **Deep link staré kotvy (volitelné, malé):** pokud někdo ještě přijde na `/automatizace#ai-agenti`
   (starý odkaz, záložka), stačí krátký klientský efekt na hubu, který `location.hash` přesměruje na
   podstránku. Zeptej se uživatele, jestli to chce. Jinak vynech.
4. **QA matice** (vše zapiš do progress souboru jako tabulku ✔/✘/neověřeno):
   - Build: `npm run build`. Počet vygenerovaných stránek obsahuje 4 nové slugy. Lint: stejný výsledek jako
     základní stav ze S0 (nové chyby = oprav).
   - Každá ze 4 podstránek × (390, 768, 1024, 1280, 1440 px): scéna se spustí, všechny varianty, žádný
     horizontální scroll, žádné překrytí, bento a ilustrace drží.
   - `prefers-reduced-motion: reduce` na všech 4: hotový stav, žádný pohyb, žádná smyčka.
   - Klávesnice: Tab projde navbar i dropdown, tlačítka variant scén jsou fokusovatelná a mají viditelný
     fokus (`:focus-visible`), Enter/Space spouští.
   - Dropdown a mobilní menu: viz kritéria S6 (znovu, po všech pozdějších změnách).
   - Co-branding: viz kritéria S7 na všech 5 místech.
   - SEO: `view-source` každé podstránky (H1, lead, pain/benefit/FAQ text v HTML), canonical, title,
     description, JSON-LD parsuje, sitemap, `opengraph-image` se vykreslí (`/automatizace/ai-agenti/opengraph-image`).
   - Výkon: `npm run build` velikosti (First Load JS nových tras, zapiš), homepage se nezhoršila (Hero s
     lockupem), scény se nespouští mimo výřez.
   - Regrese: homepage, `/sluzby`, `/cena-tvorby-webu`, `/o-mne`, `/kontakt`, `/zakaziq`, jedna
     `web-pro-*` stránka: vizuálně nerozbité, navbar výška beze změny, odsazení `pt-16 md:pt-24` sedí.
   - Obsah: žádné ceny na podstránkách, voice má „Připravuji", žádné telefonní číslo ve scéně,
     každá scéna má případ s předáním člověku.
5. **Screenshoty** (Playwright, §3.6): hub, 4 podstránky (scéna ve 2 stavech), otevřený dropdown, mobilní
   menu, Hero, Footer. Ulož do scratchpadu, v závěrečné zprávě popiš, ne nahrávej do repa.
6. **Dokumentace:** v `AUTOMATIZACE-PROGRESS.md` shrň výsledek. Když má projekt paměťový systém
   (složka `memory/` nebo soubory podle skillu `project-memory-system`), zapiš do něj stručné rozhodnutí:
   „4 služby Automatizace jsou podstránky `/automatizace/<slug>`, data v `lib/data/automation-pages.ts`,
   scény v `components/automation/`, lockup ALTENO × VIZEON v `components/brand/`". Nepřidávej velké
   texty do `CLAUDE.md`.
7. **Otevřené TODO pro majitele** (vypiš, neřeš): `TODO(CENA-BALICKU)` v `lib/data/automation.tsx`,
   `TODO(CENA-RAG)` v `lib/data/pricing.ts`, případné chybějící ověření v prohlížeči.

**Hotovo když:** QA tabulka je vyplněná (u každého neověřeného políčka je důvod), `grep "automatizace#"`
je prázdný, smazané soubory jsou odsouhlasené, závěrečná zpráva uživateli obsahuje seznam změněných
souborů, co jsi **neověřil**, otevřená TODO a návrh commitů.

---

## 9. Soubor `AUTOMATIZACE-PROGRESS.md` (šablona pro S0)

```markdown
# Stav práce: Automatizace v navbaru + podstránky

Dokument zadání: PROMPT-AUTOMATIZACE-PODSTRANKY.md
Referenční klon: <cesta>
Větev: feat/automatizace-alteno

## Základní stav (S0)
- git: <čisté / co je rozpracované>, checkpoint commit: <ano/ne, hash>
- npm run build: <prošel/selhal + 1. chyba>
- npm run lint: <prošel/selhal/nepodporováno>
- Analytika pro scény: <použije se X / vynechá se>

## Checklist
- [ ] S0 Příprava
- [ ] S1 Základ portu
- [ ] S2 Data + detail + Telefon
- [ ] S3 Chat, Flow, Konzole
- [ ] S4 Ilustrace + detail
- [ ] S5 Hub, SEO, sitemap
- [ ] S6 Navbar + dropdown
- [ ] S7 Co-branding
- [ ] S8 Napojení, úklid, QA

## Deník sessions
### S<N> (datum)
- Hotovo:
- Neověřeno (a proč):
- Odchylky od zadání a důvod:
- Pro další session:
- Navržená commit zpráva:
```

---

## 10. Příloha A: Mapování dat

| Alteno slug | VIZEON slug | Scéna (`demo.kind`) | Hlavní komponenta | Stav |
|---|---|---|---|---|
| `ai-agenti` | `ai-agenti` | `console` | `ServiceConsole` | v nabídce |
| `automatizace` | `automatizace-procesu` | `flow` | `ServiceFlow` | v nabídce |
| `chatboti-rag` | `chatboti-rag` | `chat` | `ServiceChat` | v nabídce |
| `voice-agenti` | `voice-agenti` | `phone` | `ServicePhone` | `comingSoon` |

Počty obsahu na službu (v předloze, nesmí se měnit): `pain` 4, `how` 4, `benefits` **5**, `miniFaq` 2 až 3,
`useCases` 3 nebo 4 (u `chatboti-rag` 3 → poslední karta přes celou šířku). Varianty scén: console 3, chat 3
(třetí bez zdroje + handoff), flow 3 (každá přesně 4 kroky), phone 3 (třetí s handoff).

Odkazy oborů v `whoItsFor` (S2): `/web-pro-remeslniky` (z `sluzby-a-remesla`), `/web-pro-ucetni`
(z `ucetni-a-financni-firmy`), `/web-pro-realitni-maklere` (z `realitni-kancelare`). Ostatní vypustit.

## 11. Příloha B: Časování scén (nesmí se změnit)

| Scéna | Konstanty |
|---|---|
| Sdílené (`useSceneScript`) | let paketu 520 ms `cubic-bezier(0.45,0,0.2,1)`, fade 200 ms, psaní 2 znaky / 18 ms, autoplay `IntersectionObserver` práh 0.35, jednou |
| Telefon | ring 620, answer 420, intent 260, line gap 320, result 300, autoplay 420 |
| Chat | ask 300, search 460, cite 240, autoplay 420 |
| Flow | flight 460, hop dwell 240, start 260, result 300, autoplay 420 |
| Konzole | flight 620 (z pravého okraje), step gap 260, autoplay 420 |
| Dropdown | close delay 150 |

## 12. Příloha C: Rychlý seznam rizik

1. **Tailwind 3 vs 4** (§3.1): tichá rozbití (`translate-*`, holé `border`, přejmenované stupnice). Vždy grep.
2. **Paket mimo cíl**: paket uvnitř transformované vrstvy. Nesahat na strukturu kořene scény.
3. **Šířka navbaru** (768 až 1279 px): chevron navíc. Měřit, ne odhadovat.
4. **Pain se zlatou**: po přemapování barev musí Pain zůstat neutrální.
5. **Hydratace**: žádné `Math.random()`, `Date.now()` v renderu scén, pevné výšky waveformu.
6. **Komponenty přepsané ručně** místo kopie: chyby v SVG. Kopírovat `cp`.
7. **Kotvy**: zapomenutý odkaz na `/automatizace#…` vede na hub bez skoku. Finální grep v S8.
8. **Commit bez souhlasu**: necommitovat, jen navrhnout.
