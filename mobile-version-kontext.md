# Kompletní analýza mobilní verze — VIZEON (repo `osobn-portfolio---zkou-ka-bez-AI-chatbota`)

## Metodika

Toto není jen čtení kódu od oka. Postup byl:

1. Stažení repozitáře (Next.js 16 / React 18 / Tailwind / Framer Motion).
2. `npm install` + spuštění reálného `next dev` serveru.
3. Automatizované procházení webu přes **Playwright + headless Chromium** na mobilních viewportech (320×568 „iPhone SE", 375×667, 390×844 „iPhone 14", 360×800 „Android"), včetně skutečného scrollování na jednotlivé sekce, otevření mobilního hamburger menu a otevření rezervačního (Booking) modalu.
4. Screenshoty z těchto reálných stavů — takže nálezy níže označené jako „potvrzeno screenshotem" nejsou dohady, ale doložená fakta z běžícího webu.
5. Ruční review zdrojového kódu (`components/*.tsx`, `app/globals.css`, `tailwind.config.ts`) pro nálezy, které se neprojeví na jednom screenshotu, ale jsou reálným rizikem (race conditions, chybějící scroll lock apod.).

Tech stack: Next.js 16 (App Router), React 18, Tailwind CSS, Framer Motion, react-hook-form + zod, Supabase (rezervace), n8n chat widget (`@n8n/chat`), react-hot-toast.

---

## 🔴 KRITICKÉ NÁLEZY — potvrzené screenshoty z reálného běhu webu

### 1. Cookie lišta na plovoucí bublina chatu se fyzicky překrývají

Na běžném telefonu (320–390 px šířky) leží `CookieBanner` (fixní pruh přes celou šířku dole) a plovoucí bublina n8n chat widgetu (fixní kruh vpravo dole) **přesně na sobě**. Bublina chatu částečně zakrývá tlačítko „PŘIJMOUT" cookie lišty.

**Příčina v kódu:** `CookieBanner.tsx` má `fixed bottom-0 left-0 right-0 z-50` přes celou šířku obrazovky. `n8n-chat-theme.css` nastavuje `--chat--window--bottom: 1.5rem; --chat--window--right: 1.5rem;` bez ohledu na to, jestli je cookie lišta zrovna zobrazená. Nikde v kódu není žádná koordinace mezi těmito dvěma nezávislými fixními prvky.

**Dopad:** Uživatel může omylem místo „Přijmout" trefit chat bublinu, nebo naopak nemůže otevřít chat, protože je částečně pod lištou. Vypadá to jako rozbitý web hned na první obrazovce.

### 2. Fullscreen mobilní menu je vizuálně „pod" cookie lištou a chat bublinou

Po otevření hamburger menu (fullscreen overlay přes celou obrazovku) **cookie lišta a chat bublina zůstávají viditelné navrch** a překrývají poslední položku menu („Kontakt") i sousední odkazy („Ceník", „ZakazIQ").

**Příčina v kódu:** Mobilní menu v `Navbar.tsx` má `z-40`, zatímco `CookieBanner` i chat widget běží s `z-50` (respektive n8n chat má svůj vlastní, typicky velmi vysoký z-index mimo React strom Next.js aplikace). Fullscreen overlay tedy není skutečně nejvyšší vrstva, i když vizuálně a funkčně by měl být.

**Dopad:** Odkaz „Kontakt" je na malých telefonech prakticky nedosažitelný, dokud uživatel neodklikne cookie lištu.

### 3. První položka menu se překrývá s logem v hlavičce

V otevřeném menu se text první položky („O mně", vykreslený velkým `font-cormorant` řezem) vizuálně protíná s logem „VIZEON" a podtitulkem „WEB. DESIGN. VÝSLEDKY." v headeru nad ním.

**Příčina v kódu:** Header (`position: fixed`, výška `h-16`/`h-20`) a fullscreen menu overlay nejsou navzájem odsazené — menu začíná hned od `top: 0` a první `flex` položka se počítá do vertikálního centrování bez rezervy na výšku headeru.

### 4. Tlačítko „Pokračovat →" v rezervačním (Booking) modalu je částečně schované pod chat bublinou

Otevřeme-li přes CTA „Nezávazná konzultace zdarma" rezervační modal (krok 1 – výběr služby), tlačítko pro pokračování na dalším kroku je vpravo dole **částečně překryté** plovoucí bublinou chatu.

**Příčina v kódu:** `BookingModal.tsx` má overlay `z-50`. Chat widget (`@n8n/chat`) se ale nerenderuje uvnitř téhož stackování — vykresluje se do vlastního kontejneru mimo React strom stránky s vlastním (velmi vysokým) z-indexem, takže „vyhraje" nad jakýmkoli modalem na webu, i těmi, které mají být plně modální.

**Dopad:** Reálné riziko, že si uživatel na mobilu nedokáže dokončit objednávku/poptávku — přesně to tlačítko, které má vést ke konverzi, je nejohroženější.

### 5. Karty v sekci Portfolio: text vjíždí pod badge, obsah přetéká přes pevnou výšku karty

Na mobilu mají karty projektů (`Portfolio.tsx`) pevnou výšku `h-[240px]`. Popisek projektu (u některých projektů dost dlouhý — např. „Firemní web pro zakázkovou kovovýrobu pod vedením pana Schovánka — zámečnictví, svařování a broušení s 40letou rodinnou zkušeností...") je ukotvený k dolnímu okraji karty (`absolute bottom-0`) a badge „SKUTEČNÝ KLIENT"/„UKÁZKOVÝ PROJEKT" je ukotvený k hornímu pravému rohu (`absolute top-4 right-4`). Když je popisek dost dlouhý, **text popisku vizuálně naběhne přímo pod/do badge** — na screenshotu je jasně vidět věta „Firemní web pro zakázk..." mizející pod obdélníkem s nápisem „SKUTEČNÝ KLIENT".

**Příčina v kódu:** Fixní `h-[240px]` bez `min-height`/flex-based rozvržení, které by reagovalo na skutečnou délku textu; dvě absolutně pozicované vrstvy (badge nahoře, textový blok zdola) bez vzájemné kolizní kontroly.

**Dopad:** Na užších telefonech je nejdelší popisek (projekt EstatIQ) prakticky nečitelný/přeložený přes badge nebo je oříznutý přetečením mimo `overflow-hidden` kartu.

---

## 🟠 DALŠÍ REÁLNÁ RIZIKA — z code review (nemusí být na každém telefonu vidět stejně silně, ale jsou to skutečné chyby)

### 6. `FirstClientModal.tsx` nezamyká scroll pozadí
Na rozdíl od `BookingModal.tsx` a mobilního menu (`Navbar.tsx`), které mají:
```js
document.body.style.overflow = isOpen ? 'hidden' : '';
```
tento modal (otevírá se z tlačítka „Pojďme do toho společně →" v sekci Reference) **tento zámek vůbec nemá**. Na mobilu tak lze prstem odscrollovat stránku pod poloprůhledným pozadím modalu, zatímco modal zůstává na místě — nepříjemný, "rozbitý" pocit.

### 7. Tři nezávislé komponenty si přepisují `document.body.style.overflow` bez koordinace
`IntroAnimation.tsx`, `Navbar.tsx` a `BookingModal.tsx` každá zvlášť nastavují a mažou `overflow` na `<body>`. Pokud by se v edge-case časování dvě z nich potkaly (např. uzavření úvodní animace přesně v okamžiku, kdy je otevřený booking modal po rychlém prokliku z jiné stránky), jedna komponenta při unmountu vrátí `overflow: ''`, i když druhá ještě „drží" scroll zamčený. Chybí sdílený počítadlo/lock (typicky `body-scroll-lock` knihovna nebo globální kontext).

### 8. `max-h-[90vh]` v modalech nepočítá s mobilní klávesnicí ani dynamickou výškou prohlížeče
`BookingModal.tsx` i `FirstClientModal.tsx` používají `max-h-[90vh]`. Na mobilních prohlížečích (zejména iOS Safari) se skutečná výška viewportu mění při zobrazení/skrytí adresního řádku a při vysunutí klávesnice — `vh` jednotka tohle neřeší, `dvh`/`svh` ano. Při psaní do posledních polí formuláře (např. datum/čas v kroku 3) hrozí, že spodek formuláře zůstane pod klávesnicí.

### 9. `StepIndicator` (4 kroky v Booking modalu) je na hraně šířky pro velmi úzké telefony
4 kolečka + spojovací linky (`w-10` = 40px každá) + popisky pod kolečky (`Služba`, `Kontakt`, `Termín`, `Souhrn`) — na 320–360px širokém displeji (staré/levnější telefony) je to těsné; při jiném jazyce/delším labelu by mohlo dojít ke kolizi popisků sousedních kroků.

### 10. Nekonzistentní přístup k „mobil = fullscreen"
n8n chat widget má vlastní pravidlo `@media (max-width: 480px)`, které ho udělá fullscreen (`100vw`/`100dvh`, bez zaoblení) — správný mobile-first přístup. `BookingModal` a `FirstClientModal` ale na mobilu zůstávají jako „vycentrovaná karta s paddingem" (`p-4`, `rounded-2xl`), což na malém displeji zbytečně ukrajuje z už tak omezeného prostoru a působí nekonzistentně vůči chatu.

### 11. Nativní `alert()` v kontaktním formuláři
`Contact.tsx` při chybě odeslání používá prohlížečový `alert()`. Zbytek webu (booking) používá `react-hot-toast`, který je na webu už nastavený a stylovaný. Nativní alert na mobilu vypadá cize, blokuje UI a nejde ho nijak stylovat.

### 12. Jen dva breakpointy pro celý mobilní rozsah
V celém webu se prakticky používá jen výchozí (`<768px`) a `md:` (`≥768px`). „Mobil" tak pokrývá vše od 320px do 767px bez jemnějšího odstupňování (`sm:`, případně vlastní `xs:`). Co vypadá dobře na iPhonu 14 (390px), může být zbytečně nahuštěné na starším/menším telefonu (320–360px) — přesně to se projevilo u karet portfolia a step indikátoru výše.

---

## 🟢 Co naopak funguje dobře

- Mobilní hamburger menu samo o sobě správně zamyká scroll pozadí a má funkční fullscreen overlay s animací.
- n8n chat widget má už hotové mobilní `@media` pravidlo pro fullscreen režim — správný vzor, který by měly přebrat i ostatní modaly.
- `overflow-x: hidden` na `<body>` jako pojistka proti horizontálnímu scrollování funguje, žádný horizontální „jitter" nebyl při testu pozorován.
- Gridy služeb, ceníku a portfolia správně padají do jednoho sloupce na mobilu (`grid-cols-1` → `md:grid-cols-…`).
- Responzivní typografie přes `clamp()`/breakpointové `text-[…px]` třídy je poměrně důsledná.
- SEO/structured data (JSON-LD), meta tagy a accessibility základy (skip-to-content link, `aria-label`, focus states) jsou na úrovni, kterou hodně portfolio webů nemá.

---

## Priorita oprav

| # | Nález | Priorita | Proč |
|---|---|---|---|
| 1 | Cookie lišta vs. chat bublina překryv | **P0** | Viditelné hned na první obrazovce, matoucí, snadno opravitelné |
| 4 | Chat bublina překrývá CTA v Booking modalu | **P0** | Přímo ohrožuje konverze/poptávky |
| 2+3 | Mobilní menu pod cookie/chat, překryv s headerem | **P0** | Znepřístupňuje navigaci |
| 5 | Portfolio karty — text pod badge | **P0** | Vypadá jako rozbitý web, poškozuje důvěryhodnost portfolia |
| 6 | Chybějící scroll lock ve FirstClientModal | P1 | Nekonzistentní chování, matoucí scroll |
| 8 | `vh` místo `dvh`/klávesnice v modalech | P1 | Ovlivňuje dokončení formulářů na iOS |
| 10 | Nekonzistentní modal styl (karta vs. fullscreen) | P1 | UX konzistence |
| 7 | Race condition u `body.overflow` | P2 | Edge-case, ale reálné riziko |
| 9 | Step indicator na úzkých telefonech | P2 | Vizuální těsnost, ne úplné rozbití |
| 11 | `alert()` v Contact | P2 | Kosmetika/konzistence |
| 12 | Chybí jemnější breakpointy | P2 | Systémová věc, řeší se průběžně s ostatním |

---

*Pokračování: soubor `02-prompt-pro-claude-code.md` obsahuje kompletní, rovnou použitelný prompt pro Claude Code, který na základě těchto nálezů provede kompletní redesign mobilní funkčnosti a přívětivosti webu.*