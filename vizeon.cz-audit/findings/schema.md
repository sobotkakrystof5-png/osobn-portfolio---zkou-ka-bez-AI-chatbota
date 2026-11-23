# Audit strukturovaných dat (JSON-LD): vizeon.cz

Datum: 2026-11-21. Vzorek: všech 67 URL z crawlu (parsováno `jsonld_raw`), šablony ověřeny ručně + zdrojové soubory.

## Skóre: 68 / 100

Technicky čisté (0 chyb parsování, všechny breadcrumby sedí, FAQ 1:1 s viditelným textem), ale entitní graf je slabý: organizace je zdvojená, ve všech Service/BlogPosting/CreativeWork je jen anonymní kopie poskytovatele bez `@id`, chybí NAP (adresa, telefon, IČO), logo je favicon 32x32 a autor blogu je jen křestní jméno.

## Detekce

| Šablona | Počet URL | Bloky |
|---|---|---|
| Globální graf v layoutu (všechny stránky) | 67 | ProfessionalService + Organization + WebSite |
| BreadcrumbList | 63 (ne na homepage, /gdpr, /podminky) | |
| FAQPage | 40 stránek, 176 otázek | home, /faq, /cena-tvorby-webu, /tvorba-webu-pro-zivnostniky, 19x /web-pro-*, /sluzby/tvorba-webu-pro-firmy, 5x SEO, /automatizace + 4 podstránky |
| Service (+Offer/PriceSpecification) | /sluzby/*, /web-pro-*, /automatizace/*, /zakaziq/rezervacni-system, /cena-tvorby-webu | |
| BlogPosting + Person | 4 články | |
| CreativeWork | 11x /ukazky-webu/* | |

Formát je JSON-LD s `https://schema.org`, absolutní URL, ISO data. Žádný Microdata/RDFa. Žádný zakázaný typ (HowTo, SpecialAnnouncement, CourseInfo...).

## Co funguje

- 0 chyb JSON (`jsonld_errors` prázdné na všech stránkách).
- Breadcrumby: poslední položka == URL stránky, `position` souvisle, všechny meziúrovně vrací 200 (ověřeno skriptem na všech 63 stránkách).
- FAQPage: všech 176 otázek i odpovědí je doslova ve viditelném HTML (generováno ze stejných dat, např. `lib/data/home-faq.ts`, `lib/data/automation.tsx`). Žádný nesoulad. Dle zadání: FAQ rich results Google nezobrazuje, ponecháno jako Info, žádná akce.
- Ceny v Offer (4 999 / 9 999 / 14 999 / 29 990 / 480 Kč, CZK) odpovídají textům v FAQ i na stránkách.
- WebSite s `inLanguage: cs-CZ` a `publisher` odkazem přes `@id` je správně.
- Reálné recenze se do schématu záměrně nepřidávají (správně; komentář v `app/layout.tsx` zakazuje fabrikovaná čísla).

## Nálezy

### [High] 1. Zdvojená entita se stejným `@id` a různými daty
Evidence: v každém layout grafu jsou dva uzly `"@id": "https://vizeon.cz/#organization"`: jeden `ProfessionalService` (email, description, serviceType, areaServed), druhý `Organization` (jen name, url, logo, sameAs). Parsery je sloučí, ale validátory a menší crawlery vidí duplicitu a konfliktní typy.
Fix: `app/layout.tsx` (řádky ~134-174): smazat uzel `Organization`, ProfessionalService nechat jako jedinou entitu (je podtyp Organization). Případně `"@type": ["ProfessionalService", "Organization"]`.

### [High] 2. `provider` / `publisher` / `creator` jsou anonymní kopie, ne odkaz na `@id`
Evidence: všechny Service (`provider: {"@type":"ProfessionalService","name":"VIZEON","url":...}`), BlogPosting (`publisher: {"@type":"Organization",...}`), CreativeWork (`creator`) vytvářejí nové uzly bez `@id`. Graf se tak nespojí s hlavní entitou a stránky tvrdí 3 různé "VIZEON" (ProfessionalService, Organization).
Fix: nahradit na všech místech `{ "@id": "https://vizeon.cz/#organization" }`. Soubory: `components/industry/IndustryLanding.tsx` (~l. 130), `app/sluzby/*/page.tsx`, `app/automatizace/page.tsx`, `app/automatizace/[slug]/page.tsx`, `app/zakaziq/rezervacni-system/page.tsx`, `app/cena-tvorby-webu/page.tsx`, `app/blog/[slug]/page.tsx` (l. 59), `app/ukazky-webu/[slug]/page.tsx` (l. 79). Doporučuji sdílenou konstantu `ORG_REF = { "@id": "https://vizeon.cz/#organization" }` v `lib/`.

### [High] 3. Chybí NAP: adresa, telefon, IČO
Evidence: ProfessionalService (LocalBusiness podtyp) má jen `email`. Chybí `address` (Google ho u LocalBusiness požaduje), `telephone`, `identifier`/`vatID`/`taxID`. IČO 29977231 je přitom viditelně v patičce (`components/Footer.tsx` l. 128). Telefon je záměrně skrytý (`PhoneReveal`, `/api/phone`), proto ho do JSON-LD nedávat, pokud ho nechcete zveřejnit.
Fix: do uzlu v `app/layout.tsx` doplnit minimálně:
```json
"address": { "@type": "PostalAddress", "addressLocality": "<město z OSVČ rejstříku>", "addressCountry": "CZ" },
"identifier": { "@type": "PropertyValue", "propertyID": "IČO", "value": "29977231" },
"founder": { "@id": "https://vizeon.cz/#founder" }
```
Poznámka: město/ulici doplňte jen pokud je veřejně uvedeno (sídlo OSVČ je veřejné v ARES). Nevymýšlet. Pro "service area" model ponechat `areaServed` a adresu zúžit na obec/region.

### [High] 4. Logo je `favicon.ico` 32x32
Evidence: `"logo": "https://vizeon.cz/favicon.ico"` ve všech 67 stránkách; v kódu je to sám TODO komentář (`app/layout.tsx` l. 139). Google vyžaduje logo min. 112x112 px ve formátu podporovaném Google Images (ICO mezi nimi není), jinak nebude brát logo pro Knowledge Panel.
Fix: vytvořit `public/logo.png` (min 512x512, čtverec, na neprůhledném nebo kontrastním pozadí, bez textu příliš blízko okraje) a nastavit
`"logo": { "@type": "ImageObject", "url": "https://vizeon.cz/logo.png", "width": 512, "height": 512 }`. Pozor: wordmark VIZEON je podle CLAUDE.md typografický (Cormorant light, krémová), export z `VizeonLogo`, nepřepisovat jinak.

### [Medium] 5. BlogPosting: slabý autor, chybí image, dateModified, mainEntityOfPage
Evidence (4 články): `author: {"@type":"Person","name":"Kryštof"}` (jen křestní jméno, bez url/@id), žádné `image`, `dateModified`, `mainEntityOfPage`; `datePublished` je jen datum "2026-09-01" (platné, ale lepší s časem a zónou). Všechny 3 články z 2026-09-02 mají shodné datum.
Fix: `app/blog/[slug]/page.tsx` (l. 52-60) a `lib/data/blog.tsx` (přidat `updated?: string`, `image?`):
```json
{
  "@type": "BlogPosting",
  "@id": "https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026#article",
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026" },
  "headline": "Kolik stojí tvorba webových stránek v roce 2026?",
  "description": "...",
  "image": ["https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026/opengraph-image"],
  "datePublished": "2026-09-01T09:00:00+02:00",
  "dateModified": "2026-09-01T09:00:00+02:00",
  "inLanguage": "cs-CZ",
  "author": { "@id": "https://vizeon.cz/#founder" },
  "publisher": { "@id": "https://vizeon.cz/#organization" }
}
```
Image: použijte reálnou URL OG obrázku (v repu je `app/blog/opengraph-image.tsx`; ověřte, že existuje i per-článek, jinak použít obecný). `dateModified` držet pravdivý (nepřepisovat bez změny obsahu).

### [Medium] 6. Chybí entita Person pro zakladatele
Evidence: typ Person existuje jen jako vložený autor blogu bez dalších vlastností. Přitom E-E-A-T je u jednoosobového studia hlavní signál (jméno Kryštof Sobotka je veřejně v `/gdpr` a `/podminky`, `/o-mne` je noindex).
Fix: přidat do layout grafu (nebo do blogových stránek):
```json
{
  "@type": "Person",
  "@id": "https://vizeon.cz/#founder",
  "name": "Kryštof Sobotka",
  "jobTitle": "Zakladatel",
  "worksFor": { "@id": "https://vizeon.cz/#organization" },
  "url": "https://vizeon.cz",
  "sameAs": ["<LinkedIn, pokud existuje>"]
}
```
Pozn.: `/o-mne` je noindex a mimo sitemap, proto jako `url` nepoužívat. Souhlas majitele s uvedením celého jména u autora (je již na GDPR stránce, takže pravděpodobně v pořádku).

### [Medium] 7. `sameAs` obsahuje jen Instagram
Evidence: jediná položka `https://www.instagram.com/vizeon_official/`. Kód má TODO na Google Business Profile.
Fix: po založení doplnit GBP, Firmy.cz profil, LinkedIn, případně Facebook. Jen reálné existující profily. Pro ALTENO (sesterská značka) použít `"subOrganization"` nebo `"brand"`, ne `sameAs`.

### [Medium] 8. /zakaziq nemá žádný entitní markup, jen breadcrumb
Evidence: `/zakaziq` má jen BreadcrumbList (`app/zakaziq/page.tsx`). `/zakaziq/rezervacni-system` má Service. Vlastní SaaS není popsán.
Fix: přidat `SoftwareApplication` (rich result vyžaduje i `offers` a rating/review, které nemáte, takže bude jen entitní signál):
```json
{
  "@type": "SoftwareApplication",
  "@id": "https://vizeon.cz/zakaziq#app",
  "name": "ZakazIQ",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "description": "Klientský portál a rezervační systém: komunikace, zpětná vazba a přehled o projektu.",
  "url": "https://vizeon.cz/zakaziq",
  "publisher": { "@id": "https://vizeon.cz/#organization" }
}
```
Pokud je portál jen pro klienty VIZEON a není produkt na prodej, Offer nepřidávat.

### [Low] 9. Service: Offer bez `price`, bez vazby na `@id`, UnitPriceSpecification bez kódu
Evidence: Offer používá `priceSpecification.minPrice` (validní podle schema.org, ale Google z toho nic nečte), `/sluzby/sprava-webu` má `unitText: "měsíc"`.
Fix: ponechat `minPrice`, přidat `"price"` jen u pevných cen (4 999 apod. jsou "od", takže minPrice je sémanticky správně). U správy webu `"unitCode": "MON"`. Služby doporučuji dát `"@id": "<url>#service"` a z hlavní entity odkazovat `hasOfferCatalog`/`makesOffer`. Service na web-pro-* je v pořádku.

### [Low] 10. Chybí Service/Webpage uzly na hubech, /kontakt bez ContactPage
Evidence: `/kontakt`, `/o-mne`, `/blog`, `/ukazky-webu`, `/sluzby` mají jen breadcrumb.
Fix: `/kontakt` jako `ContactPage` (mainEntity -> organizace), `/blog` jako `Blog`, `/ukazky-webu` jako `CollectionPage` s `ItemList` odkazů na projekty. Nízký dopad na výsledky vyhledávání, pomáhá AI parsingu.

### [Low] 11. CreativeWork na portfoliu
Evidence: 11 projektů má `CreativeWork` s `creator` a `image`, bez `datePublished`, `about`, `mainEntityOfPage`.
Fix: `mainEntityOfPage` + `creator` jako `@id`, případně `WebSite` jako konkrétnější typ (`"@type": "WebSite"`, `url` klientského webu) nebo `about`. Bez Review (klientské citace jsou self-served, nepřidávat AggregateRating).

### [Info] 12. FAQPage
40 stránek, žádný nesoulad s viditelným textem. Rich result žádný (od 7. 5. 2026 pro všechny weby). Neodstraňovat kvůli riziku, ale neinvestovat čas do rozšiřování. Pokud vzniknou skutečné uživatelské Q&A, použít QAPage.

### [Info] 13. Další pozorování
- `WebSite` nemá `potentialAction` SearchAction (web nemá vyhledávání, správně).
- Dva URL tvary homepage v crawlu (`/` a bez lomítka) jsou jen artefakt crawlu, `canonical` je `https://vizeon.cz`, shodné s `@id`/`url`.
- Žádný Review/AggregateRating: správně, nepřidávat. Recenze na webu jsou vlastní citace klientů a Google je pro self-serving LocalBusiness/Organization stejně nepovolí jako hvězdičky.

## Priorita oprav
1. Slít duplicitní Organization, `provider/publisher/creator` přes `@id` (nálezy 1, 2): jedna sdílená konstanta, 1 hodina práce.
2. Logo PNG >= 512 px + adresa + IČO (3, 4).
3. Person zakladatele + BlogPosting vylepšení (5, 6).
4. sameAs po založení GBP/Firmy.cz (7), SoftwareApplication pro ZakazIQ (8).

## Zdrojové soubory
- `app/layout.tsx` (globální graf, l. 130-184)
- `components/layout/PageShell.tsx` (vkládání jsonLd)
- `components/industry/IndustryLanding.tsx` (Service + FAQ pro /web-pro-*)
- `app/blog/[slug]/page.tsx`, `lib/data/blog.tsx`
- `app/ukazky-webu/[slug]/page.tsx`
- `app/zakaziq/page.tsx`, `app/zakaziq/rezervacni-system/page.tsx`
