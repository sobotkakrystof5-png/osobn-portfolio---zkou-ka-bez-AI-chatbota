# VIZEON × Schovinox — redesign homepage a portfolia

> **Pracovní dokument.** Rozdělený na fáze tak, aby šlo pracovat napříč více sessions bez ztráty kontextu.
> Fáze nesdílejí soubory → lze je dělat v libovolném pořadí, klidně paralelně. Web je funkční po každém kroku.

---

## Princip

Zdrojem vzoru je referenční web **Schovinox** (`gh repo clone sobotkakrystof5-png/Schovinox`, naklonovaný a prostudovaný do detailu — Next.js 14 App Router, Framer Motion, Tailwind). Přebírá se **jen struktura a animační mechanismy**, ne vizuál.

- **Vizuál VIZEONu se nemění** — tmavě-zlatá paleta (`#080808`/`#0e0e0e`, gold `#c9a84c`, off-white `#f0ece6`, muted `#8a8070`), Cormorant Garamond + Inter, `glass-panel`/`glass-panel-hover`. Nic z toho se nepředělává.
- Animační vzory se **reużívají ze stávajícího `lib/animations.ts`** (`fadeUp`, `cardEntrance`, `staggerDramatic`, `viewport`), ne kopírují ze Schovinoxu jako nová abstrakce (Schovinoxí `Reveal` je funkčně identický s tím, co už VIZEON má).
- **Nedělá se:** `/reference/[slug]` detailní stránky projektů (zamítnuto — Portfolio dál odkazuje přímo na živé weby klientů), obrázkový bento grid pro `HomeExplore` (zamítnuto — karty zůstávají textové), retrofit motivu velkého čísla mimo novou statement sekci.

Všechna rozhodnutí v tomto dokumentu byla probrána a odsouhlasena s uživatelem přímo v konverzaci — nic není odhadováno.

---

## Rozsah — 4 nezávislé fáze

| Fáze | Cíl | Vlastní soubory | Závisí na |
|---|---|---|---|
| **A** | Page-transition při navigaci | `app/template.tsx` (nový) | — |
| **B** | 3 nové homepage sekce (StatBar, TestimonialCarousel, StatementBlock) | `app/page.tsx`, `lib/data/testimonials.ts`, `components/StatBar.tsx`, `components/TestimonialCarousel.tsx`, `components/StatementBlock.tsx` (nové) | — |
| **C** | HomeExplore → asymetrický grid | `components/HomeExplore.tsx` | — |
| **D** | Portfolio → reflow na grid | `components/Portfolio.tsx` | — |

Žádné dvě fáze nesahají do stejného souboru → nulové riziko konfliktu, klidně souběžně ve více sessions.

---

## FÁZE A — Page-transition

**Cíl:** jemný fade při každé navigaci mezi stránkami, napříč celým webem (`/`, `/o-mne`, `/sluzby`, `/reference`, `/cenik`, `/zakaziq`, `/kontakt`, i `/web-pro-*` a `/admin`, protože `app/template.tsx` je root-level Next.js konvence).

### ⚠️ Kritické zjištění — proč NE fade+slide jako Schovinox

Schovinox má `app/template.tsx`:
```tsx
initial={{opacity:0,y:12}} → animate={{opacity:1,y:0}}
```
To funguje tam, protože Schovinoxí `Header` (fixní navbar) žije v root `app/layout.tsx` **mimo** `{children}`. **VIZEON to má jinak** — `Navbar` (`fixed top-0 left-0 right-0 z-[var(--z-header)]`) se renderuje **uvnitř** `{children}` na každé stránce (přímo v `app/page.tsx`, přes `PageShell` na podstránkách). Ověřeno v `app/layout.tsx` — žádný `Header`/`Footer` mimo `{children}`.

Důsledek: jakýkoli `transform` (i `translateY(0px)`, které Framer Motion nechává v DOM po doběhnutí animace) na obalovém elementu vytváří nový *containing block* pro `position: fixed` potomky. `Navbar` by se přestal chovat jako fixní vůči viewportu a při scrollu by "ujížděl" pryč. Řešení: **jen `opacity`, žádný `y`/`x`/`scale`** — opacity containing block nevytváří.

### Kroky

1. Nový `app/template.tsx`:
   ```tsx
   "use client";
   import { motion } from "framer-motion";

   export default function Template({ children }: { children: React.ReactNode }) {
     return (
       <motion.div
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
       >
         {children}
       </motion.div>
     );
   }
   ```

### Hotovo když

`npm run build` projde. Proklikat `/` → `/o-mne` → `/reference` → `/kontakt` → zpět na `/`; po **každém** přechodu ihned scrollnout — `Navbar` musí zůstat přilepený nahoře (ne "ujíždět" s obsahem). Zkontrolovat i `/web-pro-remeslniky` a `/admin` (template.tsx je root-level, dopadá na všechno). Čerstvá session (vyčištěný `sessionStorage`) — `IntroAnimation` na homepage pořád přehraje a scroll-lock funguje.

---

## FÁZE B — Nové homepage sekce

**Cíl:** mezi `<SocialProof/>` a `<HomeExplore/>` v `app/page.tsx:31-36` přidat tři sekce v pořadí **StatBar → TestimonialCarousel → StatementBlock**.

Nová skladba homepage:
```
Hero → SocialProof → StatBar → TestimonialCarousel → StatementBlock → HomeExplore → Contact
```

Rationale pořadí: nejdřív konkrétní čísla (StatBar), pak sociální důkaz v hlasu klientů (Carousel), pak abstraktní hodnotové prohlášení (StatementBlock) jako emoční přechod před `HomeExplore` ("Co všechno najdete").

### B1 — `components/StatBar.tsx` (nový)

Modelováno na Schovinoxím `components/ui/StatNumber.tsx` (přečteno 1:1 — imperativní `animate()` + `useInView`, ne `Variants`). VIZEON verze používá existující `viewport` z `lib/animations.ts` místo Schovinoxího vlastního `{once:true, margin:"-80px"}`, ať count-up spouští ve stejném scroll bodě jako zbytek homepage.

```tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, animate, useInView } from "framer-motion";
import { staggerDramatic, cardEntrance, viewport } from "@/lib/animations";

// PLACEHOLDER — reálná čísla dodá uživatel, needeployovat bez náhrady.
// "24h reakce" se tematicky překrývá se SocialProof ("Odpovídám do 24 hodin") —
// při finalizaci zvážit jinou metriku (roky online, počet oborů apod.).
const STATS = [
  { value: 24, suffix: "+", label: "projektů" },
  { value: 3, suffix: "", label: "roky zkušeností" },
  { value: 24, suffix: "h", label: "reakce" },
  { value: 100, suffix: "%", label: "spokojenost" },
];

function StatCount({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, viewport);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-cormorant font-light text-[40px] md:text-[52px] text-[#c9a84c] leading-none">
        {display}{suffix}
      </div>
      <div className="mt-2 font-inter font-light text-[13px] text-[#8a8070]">{label}</div>
    </div>
  );
}

export default function StatBar() {
  return (
    <section aria-label="Čísla" className="py-16 md:py-20 bg-[#080808]">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          variants={staggerDramatic} initial="hidden" whileInView="visible" viewport={viewport}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {STATS.map((s, i) => (
            <motion.div key={i} variants={cardEntrance}>
              <StatCount {...s} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
```

⚠️ **Karty musí mít flexibilní výšku** (žádné `h-[...]`) — `mobile-version-kontext.md` dokumentuje přesně tuhle třídu bugu u `Portfolio.tsx` (text přetéká z fixní výšky karty). Neopakovat.

### B2 — `lib/data/testimonials.ts` — přidat `carouselTestimonials`

⚠️ **Nesahat na existující `testimonials` export.** Používá ho i `app/reference/page.tsx:8,38` — jak pro grid, tak pro `Review` JSON-LD. Placeholder přidaný přímo do `testimonials` by okamžitě unikl na živou `/reference` stránku i do její structured data.

```ts
// (existující testimonials[] beze změny, viz výše v souboru)

// PLACEHOLDER — nahradit reálnou referencí před nasazením do produkce.
// Používá se JEN v TestimonialCarousel na homepage, ne na /reference.
export const carouselTestimonials: Testimonial[] = [
  ...testimonials,
  {
    quote: "PLACEHOLDER — sem přijde reálná reference třetího klienta.",
    name: "Placeholder klient (nahradit)",
    url: "https://vizeon.cz",
    urlLabel: "nahradit reálným odkazem",
  },
];
```

Uživatel potvrdil, že reálně existují 3 reference (2 jsou v datech, 3. zatím nedodal) — až ji pošle, nahradit placeholder záznam a `carouselTestimonials` zjednodušit zpátky na přímý re-export `testimonials`, pokud nebude potřeba žádný rozdíl.

### B3 — `components/TestimonialCarousel.tsx` (nový)

`embla-carousel-react` + `embla-carousel-autoplay` jsou v `package.json` už nainstalované, ale nikde nepoužité. API ověřeno přímo v `node_modules/embla-carousel-autoplay/index.d.ts` (ne odhadováno): default export `Autoplay(options)`, `AutoplayOptionsType` = `delay`, `jump`, `playOnInit`, `stopOnFocusIn`, `stopOnInteraction`, `stopOnMouseEnter`, `stopOnLastSnap`, `rootNode`.

**Nepoužívat** `components/ui/carousel.tsx` — mrtvé shadcn scaffolding (grep = 0 produkčních použití, stejně jako `components/ui/button.tsx`, který importuje jen ono samo), jiná stylová vrstva (CVA/CSS-variable) než zbytek webu. Místo toho `useEmblaCarousel` napřímo, ve stylu jednosouborových sekcí (`SocialProof.tsx`, `HomeExplore.tsx`).

```tsx
"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TestimonialCard } from "@/components/TestimonialCard";
import { carouselTestimonials } from "@/lib/data/testimonials";

export default function TestimonialCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true })]
  );
  const [selected, setSelected] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", () => setSelected(emblaApi.selectedScrollSnap()));
  }, [emblaApi]);

  return (
    <section aria-label="Reference klientů" className="py-20 md:py-28 bg-[#0e0e0e]">
      <div className="max-w-3xl mx-auto px-6 md:px-12">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {carouselTestimonials.map((t, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 px-1">
                <TestimonialCard {...t} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8">
          <button onClick={scrollPrev} aria-label="Předchozí reference" className="text-[#c9a84c] hover:text-[#d4b968] transition-colors">
            <ChevronLeft size={20} />
          </button>
          <div className="flex gap-2">
            {carouselTestimonials.map((_, i) => (
              <button key={i} onClick={() => emblaApi?.scrollTo(i)} aria-label={`Reference ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${i === selected ? "bg-[#c9a84c]" : "bg-[#c9a84c]/20"}`} />
            ))}
          </div>
          <button onClick={scrollNext} aria-label="Další reference" className="text-[#c9a84c] hover:text-[#d4b968] transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
```

Poznámka: `TestimonialCard` je dnes `export function TestimonialCard(...)` (pojmenovaný export, ne default) — import podle toho.

### B4 — `components/StatementBlock.tsx` (nový)

Schovinoxí Mission blok (velké blednoucí "01" + jedna věta), restylovaný do VIZEON palety. Žádná nová "Reveal" wrapper komponenta — reuse `fadeUp` + `viewport` z `lib/animations.ts`, přesně jak `SocialProof.tsx`/`HomeExplore.tsx` už dělají.

Finální text (odsouhlaseno s uživatelem, vychází z hlasu Hero/About — "Nejsem agentura. Jsem člověk, který to udělá." / "Jeden kontakt. Žádné přehazování. Výsledky." — ale odlišný, ať se nepřekrývá s `/o-mne`):

```tsx
"use client";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/animations";

const STATEMENT =
  "Nejsem tým, který se rok co rok mění. Jsem jeden člověk, který za svou prací stojí jménem — a proto na ní záleží stejně jako vám.";

export default function StatementBlock() {
  return (
    <section className="py-20 md:py-28 bg-[#0e0e0e]" aria-label="Přístup ke tvorbě webů">
      <div className="max-w-5xl mx-auto px-6 md:px-12 grid md:grid-cols-12 gap-8">
        <div className="md:col-span-2">
          <span className="font-cormorant font-light text-6xl text-[#c9a84c]/10 select-none" aria-hidden="true">01</span>
        </div>
        <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={viewport} className="md:col-span-8 md:col-start-4">
          <p className="font-cormorant font-light text-[26px] md:text-[34px] leading-[1.25] text-[#f0ece6]">
            {STATEMENT}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
```

Motiv velkého čísla "01" se používá **jen tady** — neretrofitovat do jiných sekcí (odsouhlaseno s uživatelem).

### B5 — `app/page.tsx`

Importy + vložení mezi `<SocialProof/>` a `<HomeExplore/>`:
```tsx
import StatBar from "@/components/StatBar";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import StatementBlock from "@/components/StatementBlock";
// ...
<Hero />
<SocialProof />
<StatBar />
<TestimonialCarousel />
<StatementBlock />
<HomeExplore />
<Contact headingLevel="h2" />
```

### Hotovo když

Desktop (~1440px) a mobil (375px, 320px): StatBar počítá nahoru jen jednou při scrollu, carousel autoplayuje a pauzne při hoveru/focusu, šipky/tečky fungují, žádný horizontální scroll stránky. `/reference` má pořád přesně 2 reference v gridu i v JSON-LD (view source) — žádný leak placeholderu z `carouselTestimonials`.

---

## FÁZE C — HomeExplore: asymetrické rozložení

**Cíl:** `components/HomeExplore.tsx` — karty zůstávají **textové/glass-panel** (žádné fotky, to bylo explicitně zamítnuto), ale grid z uniformního `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (dnešní `HomeExplore.tsx:88`) se přestaví na **asymetrický** (různé card-spany), inspirovaný Schovinoxím bento teaser gridem (`app/page.tsx:166` ve Schovinoxu — `md:col-span-7`/`md:col-span-5` střídavě), jen bez obrázků.

### Návrh vážení (doladit vizuálně, není finální)

5 karet dnes: O mně, Služby, Reference, Ceník, ZakazIQ. Služby a Reference jsou jádro nabídky → větší span; O mně střední; Ceník a ZakazIQ menší.

```tsx
<motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={viewport}
  className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
  {/* O mně — md:col-span-5 */}
  {/* Služby — md:col-span-7 */}
  {/* Reference — md:col-span-7 */}
  {/* Ceník — md:col-span-5 (nebo 6/6 se ZakazIQ, doladit) */}
  {/* ZakazIQ — md:col-span-5 */}
</motion.div>
```

Konkrétní `col-span` hodnoty a řádkování doladit přímo v prohlížeči (dev server), ne jen podle čísel — 5 karet do 12-column gridu nesedí na čisté dvojice, potřeba zkusit 2-3 rozložení a vybrat vizuálně.

### Hotovo když

Grid je viditelně asymetrický (ne uniformní 3 stejné karty), žádná karta nemá oříznutý/přetékající text na žádné šířce, `whileHover={{y:-6}}` a `card-shimmer-line` z `globals.css` fungují beze změny.

---

## FÁZE D — Portfolio: reflow na grid

**Cíl:** `components/Portfolio.tsx` (renderuje se na `/reference`) — dnes vertikální seznam (`space-y-5`, `Portfolio.tsx:27`) full-bleed karet s `md:absolute md:inset-0` obrázkem přes celou šířku řádku. Přeskládat na **grid**, po vzoru Schovinoxí `/projekty` (`components/sections/ProjectsGrid.tsx` ve sklonovaném repu: `grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3`, `Reveal` s `delay={(i % 3) * 0.06}`).

**Zůstává beze změny:** odkazy dál vedou přímo na živé weby klientů (`target="_blank"`), **žádné** interní detail stránky (`/reference/[slug]`) — to bylo explicitně zamítnuto uživatelem, mimo rozsah.

### Co se mění vs. dnešní `Portfolio.tsx`

- Kontejner: `space-y-5` → `grid grid-cols-1 md:grid-cols-2 gap-6` (5 projektů z `lib/data/portfolio.ts` — 2 sloupce dají 2+2+1, přirozené; zvážit `lg:grid-cols-3` pokud se karty zmenšením obsahu vejdou čitelně, doladit vizuálně).
- Karta: dnešní `md:absolute md:inset-0` full-bleed obrázek + `md:h-[560px]` byl navržený pro celoširoké řádky — v užším grid sloupci potřebuje jiný aspect ratio (např. `aspect-[4/5]` obrázek nahoře + text pod ním, blíž k tomu, jak to řeší Schovinoxí `ProjectCard`, ale ve VIZEON stylu: gradient, zlatá linka při hoveru, velké blednoucí `p.number`, badge, `Zobrazit web →` CTA — všechno zůstává, jen přepočítané rozměry).
- Line-clamp popisku (`Portfolio.tsx:55`) bude pravděpodobně potřeba i na desktopu (dnes `md:[-webkit-line-clamp:unset]`), protože grid sloupce jsou užší než dřívější full-width řádky.

### Hotovo když

Grid layout na `/reference` funguje na všech šířkách (375px–1440px+) bez přetékání textu přes badge nebo mimo kartu (stejná třída bugu jako `mobile-version-kontext.md` dokumentuje u dnešního Portfolia — ověřit, že se nevrátila). Všech 5 karet klikatelných, odkazy nezměněné, `p.internalLink` (u Schovinoxu je to odkaz na `/web-pro-remeslniky`) pořád funguje pod kartou.

---

## Ověření (po každé fázi)

```bash
npm run build   # typy
npm run lint
npm run dev     # proklik
```

Ručně, napříč fázemi:
- Desktop (~1440px) i mobil (375px, 320px) pro každou dotčenou sekci/stránku.
- Navigace `/` → `/o-mne` → `/reference` → `/kontakt` → zpět — Navbar zůstává přilepený nahoře (regresní test na Fázi A).
- `/reference` — přesně 2 reference v gridu i JSON-LD po Fázi B; grid layout Portfolia bez přetékání po Fázi D.
- Žádná z nových komponent nepřidává nový `fixed`/`sticky` prvek — z-index škála v `app/globals.css` se nemění.

---

## Otevřené položky (mimo scope teď, doplnit až budou k dispozici)

| Co | Kde | Status |
|---|---|---|
| Reálná čísla pro StatBar (projekty, roky, reakce, spokojenost) | `components/StatBar.tsx` — `STATS` konstanta | **PLACEHOLDER**, čeká na uživatele |
| 3. reference (citát, jméno, odkaz) | `lib/data/testimonials.ts` — `carouselTestimonials` | **PLACEHOLDER**, uživatel potvrdil že reálně existuje, zatím nedodána |
| Finální `col-span` rozložení HomeExplore (Fáze C) | `components/HomeExplore.tsx` | k doladění vizuálně při implementaci |
| Grid sloupce/aspect ratio Portfolia (Fáze D) | `components/Portfolio.tsx` | k doladění vizuálně při implementaci |

## Stav fází

| Fáze | Stav |
|---|---|
| A — Page-transition | ✅ Hotovo (build OK, všechny stránky 200; manuální ověření Navbaru při scrollu zbývá) |
| B — Nové homepage sekce | ✅ Hotovo (build OK, sekce renderují v pořadí StatBar→Carousel→StatementBlock, /reference stále 2× Review v JSON-LD; vizuální ověření responzivity a count-up/autoplay zbývá) |
| C — HomeExplore asymetrický grid | ✅ Hotovo (build OK; layout O mně 5 + Služby 7 / Reference 12 / Ceník 6 + ZakazIQ 6 — čistě dělí 12 sloupců, žádná mezera; vizuální doladění v prohlížeči přes šířky zbývá) |
| D — Portfolio grid | ⬜ Nezahájeno (implementace vrácena zpět na žádost uživatele) |
