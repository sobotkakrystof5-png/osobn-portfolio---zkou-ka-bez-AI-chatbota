# Structured Data / Schema.org Audit — vizeon.cz

Scope: homepage, /kontakt, /web-pro-elektrikare (representative `/web-pro-*`, cross-checked against
all 19), /sluzby/tvorba-webovych-stranek (representative `/sluzby/*`, cross-checked against all 12),
/blog/kolik-stoji-tvorba-webu-2026 (only live post), /faq. Verified both against source
(`app/layout.tsx`, `components/layout/PageShell.tsx`, `components/pillar/MicroServicePage.tsx`, page
files) and live rendered HTML via `render_page.py --mode auto --json` (Next.js App Router — all JSON-LD
is server-rendered, no SPA hydration gap; raw and rendered output matched in every sample).

## Detection Summary

| Page type | Location in code | Types present |
|---|---|---|
| Homepage (global, all pages) | `app/layout.tsx` | `ProfessionalService`, `Organization`, `WebSite` (single `@graph`) |
| `/kontakt` | `app/kontakt/page.tsx` | `BreadcrumbList` |
| `/faq` | `app/faq/page.tsx` | `BreadcrumbList`, `FAQPage` (10 real Q&A pairs from `lib/data/faq.ts`) |
| `/web-pro-*` (19 pages) | 4 legacy inline (`web-pro-remeslniky`, `-kadernictvi`, `-masery-a-wellness`, `-ucetni`) + 15 via shared `components/pillar/MicroServicePage.tsx` | `BreadcrumbList`, `Service`, `FAQPage` — **consistently present on all 19**, confirmed live on a sample (`web-pro-elektrikare`) |
| `/sluzby/*` (12 pages) | Per-page inline `jsonLd` | `BreadcrumbList` + `Service` on all 11 leaf pages; `/sluzby` index has `BreadcrumbList` only (no `Service`, expected — it's a hub page) |
| `/blog/[slug]` (1 live post) | `app/blog/[slug]/page.tsx` | `BreadcrumbList`, `BlogPosting` (`author`: Person, `publisher`: Organization) |

Good news up front: coverage is broader and more consistent than the initial site-owner brief
suggested. All ~19 `/web-pro-*` trade pages do carry `Service` schema (via the shared
`MicroServicePage` component for 15 of them) — an earlier grep-only pass would have missed this
because the JSON-LD is generated inside the shared component, not inlined per-page file; live
rendering confirmed it's actually emitted.

---

## Findings

### 1. `ProfessionalService` and `Organization` are disconnected nodes in the same `@graph`
**Severity:** Medium

**Evidence** (`app/layout.tsx`, lines 80-129): the `@graph` contains a `ProfessionalService` node
with no `@id`, and a separate `Organization` node at `@id: "https://vizeon.cz/#organization"`. They
share a name but nothing links them — Google's disambiguation has no explicit signal that these
describe the same real-world entity, and `WebSite.publisher` only references the `Organization`
half (so `telephone`/`email`/`serviceType`, which live only on the unlinked `ProfessionalService`
node, aren't reachable from `WebSite`).

**Recommendation:** merge into a single node with a combined `@type` array and one `@id`, so every
other node (`WebSite.publisher`, future `Service.provider` on sub-pages) can point at one canonical
entity.

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://vizeon.cz/#organization",
      "name": "VIZEON",
      "url": "https://vizeon.cz",
      "telephone": "+420604837333",
      "email": "info@vizeon.cz",
      "logo": "https://vizeon.cz/logo.png",
      "areaServed": { "@type": "Country", "name": "Česká republika" },
      "description": "Tvorba webů na míru, AI chatboti, systémy na míru, grafický design a technické služby. Weby a grafika, které zvyšují tržby a konverze.",
      "serviceType": [
        "Tvorba webů na míru",
        "AI Chatbot",
        "Systémy na míru",
        "Grafický design",
        "Technické služby",
        "SEO optimalizace",
        "Zvýšení tržeb a konverzí"
      ],
      "sameAs": [
        "https://www.facebook.com/profile.php?id=100086439650056",
        "https://www.instagram.com/vizeon_official/"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://vizeon.cz/#website",
      "url": "https://vizeon.cz",
      "name": "VIZEON",
      "inLanguage": "cs-CZ",
      "publisher": { "@id": "https://vizeon.cz/#organization" }
    }
  ]
}
```

Non-breaking change — same fields, just consolidated. Leave the existing `aggregateRating`/GBP
`sameAs` TODO comments in place; do not fill them with placeholder or estimated values.

### 2. `Organization.logo` points to a 32×32 `.ico` favicon
**Severity:** Medium

**Evidence:** `app/layout.tsx` line 111: `logo: "https://vizeon.cz/favicon.ico"`. Checked the actual
file — `app/favicon.ico` is a multi-resolution icon topping out at 32×32px. Google's structured-data
guidelines for `Organization.logo` require a minimum of 112×112px, in JPG/PNG/WebP/GIF/BMP — `.ico`
is not on the accepted list and 32×32 is well under the minimum, so this field currently fails
Google's own logo requirement even though it validates as syntactically correct schema.

No square logo asset currently exists in `public/` (only `profil.jpg` and `zakaziq-preview.png`, and
the dynamic `app/opengraph-image.tsx` which renders at 1200×630, not square).

**Recommendation:** create a real square brand-mark image (min 512×512 PNG recommended) and host it
at, e.g., `/logo.png`, then point `logo` at that URL. This is a design-asset gap, not something to
fabricate in code — flagging so it goes on the site owner's action list alongside the GBP setup.

### 3. `BlogPosting` is missing `image`, `mainEntityOfPage`, and `author.url`
**Severity:** Medium

**Evidence** (`app/blog/[slug]/page.tsx` lines 41-62), confirmed live via rendered JSON-LD:
```json
{
  "@type": "BlogPosting",
  "headline": "Kolik stojí tvorba webových stránek v roce 2026?",
  "description": "...",
  "datePublished": "2026-09-01",
  "url": "https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026",
  "author": { "@type": "Person", "name": "Kryštof Sobotka" },
  "publisher": { "@type": "Organization", "name": "VIZEON", "url": "https://vizeon.cz" }
}
```
`image` is required by Google's Article guidelines for full rich-result eligibility (min 696px
wide). A real, article-specific image already exists and is rendered at a live URL —
`app/blog/[slug]/opengraph-image.tsx` generates a per-post 1200×630 OG image from the same
`post.title`/`post.category` data — so this can be added without fabricating any new asset.
`mainEntityOfPage` is a low-cost, no-fabrication addition (just repeats the canonical URL).
`author.url` linking to `/o-mne` (the real about page) is optional but reinforces the author entity
for E-E-A-T.

Do **not** add `dateModified` unless the site actually starts tracking real edit dates — the
`BlogPost` type in `lib/data/blog.tsx` only stores `date` (publish date); inventing a modified date
would violate the "no fabricated data" rule.

```json
{
  "@type": "BlogPosting",
  "headline": "Kolik stojí tvorba webových stránek v roce 2026?",
  "description": "Kolik stojí web v roce 2026? Rozebíráme, co cenu nejvíc ovlivňuje — rozsah projektu, SEO, responzivitu a obsah — a ukazujeme aktuální ceník VIZEON od 4 999 Kč.",
  "datePublished": "2026-09-01",
  "url": "https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026",
  "mainEntityOfPage": "https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026",
  "image": "https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026/opengraph-image",
  "author": { "@type": "Person", "name": "Kryštof Sobotka", "url": "https://vizeon.cz/o-mne" },
  "publisher": {
    "@type": "Organization",
    "name": "VIZEON",
    "url": "https://vizeon.cz",
    "logo": { "@type": "ImageObject", "url": "https://vizeon.cz/logo.png" }
  }
}
```
(`publisher.logo` depends on Finding 2 being fixed first — don't point it at the `.ico` favicon.)

Since this template lives in one file (`app/blog/[slug]/page.tsx`), the fix applies to every future
post automatically.

### 4. `FAQPage` present on `/faq` and all 19 `/web-pro-*` pages — no remaining Google SERP benefit
**Severity:** Info (downgraded from what would once have been Critical/positive)

**Evidence:** `FAQPage` is correctly implemented — real, on-page Q&A content, valid `Question`/
`Answer` structure, no spammy or duplicated content across pages. But Google retired FAQ rich
results for all sites as of May 7, 2026, which supersedes the earlier Aug 2023 gov/health-only
restriction. As of today (2026-09-05) this markup no longer produces any SERP feature for
`vizeon.cz`, regardless of correctness.

**Recommendation:** no urgent action — it's valid, harmless, and free (it's just JSON describing
content that's already visible on the page). Do not invest further effort adding more `FAQPage`
blocks expecting a rich result. Any benefit for AI answer engines / LLM-based search (GEO) surfacing
this Q&A content is unconfirmed and shouldn't be the basis for prioritizing new work here. If new
genuine user-submitted Q&A ever gets added (e.g., a public questions board), use `QAPage`, not
`FAQPage`, for that content.

### 5. `/sluzby` hub page has no `Service`/`ItemList` schema (expected, low priority)
**Severity:** Info

**Evidence:** `app/sluzby/page.tsx` only emits `BreadcrumbList`; the 11 child service pages it links
to (via the `<Services />` component) each already carry their own `Service` schema individually.

**Recommendation:** optional enhancement — an `ItemList` referencing the real child service URLs
would make the hub's structure more explicit to crawlers, but this is not required and the current
setup (breadcrumb only, children individually marked up) is valid. Only worth doing if convenient:

```json
{
  "@type": "ItemList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "item": "https://vizeon.cz/sluzby/tvorba-webovych-stranek" },
    { "@type": "ListItem", "position": 2, "item": "https://vizeon.cz/sluzby/tvorba-webu-pro-firmy" },
    { "@type": "ListItem", "position": 3, "item": "https://vizeon.cz/sluzby/ai-chatbot" },
    { "@type": "ListItem", "position": 4, "item": "https://vizeon.cz/sluzby/systemy-na-miru" },
    { "@type": "ListItem", "position": 5, "item": "https://vizeon.cz/sluzby/graficke-designy" },
    { "@type": "ListItem", "position": 6, "item": "https://vizeon.cz/sluzby/technicke-sluzby" },
    { "@type": "ListItem", "position": 7, "item": "https://vizeon.cz/sluzby/seo-optimalizace" }
  ]
}
```
(List trimmed to top-level `/sluzby/*` routes that exist in the repo; the `seo-optimalizace`
sub-pages — `audit`, `lokalni-seo`, `obsahove-seo`, `technicke-seo` — are already one level deeper
and reachable via that page's own breadcrumb.)

### 6. No `AggregateRating` / Google Business Profile `sameAs` — correctly deferred, not a code defect
**Severity:** Info (confirms existing owner-flagged gap, no new action)

**Evidence:** `app/layout.tsx` lines 101-104 and 115-117 already contain explicit `TODO` comments
stating these must only be added once a real GBP with real reviews exists, and must never use
fabricated numbers. This is correct practice and matches this audit's constraints — no `AggregateRating`,
review count, or GBP `sameAs` should be added until that out-of-code action item (creating and
verifying a Google Business Profile) is complete.

### 7. Validation pass — everything present is syntactically and structurally valid
**Severity:** Pass (no action)

Checked against the validation checklist for every block found:
- `@context` is `"https://schema.org"` (HTTPS) everywhere — pass.
- No deprecated types used (no `HowTo`, `SpecialAnnouncement`, `CourseInfo`, `EstimatedSalary`,
  `LearningVideo`) — pass.
- All `BreadcrumbList`/`ListItem` use absolute URLs and correct 1-indexed `position` — pass.
- `datePublished` on `BlogPosting` uses ISO 8601 (`YYYY-MM-DD`) — pass.
- No placeholder text (no `[Business Name]`-style stand-ins) anywhere — pass.
- `Service.provider`/`areaServed` correctly typed (`ProfessionalService`, `Country`) — pass.
- JSON-LD format used exclusively (no competing Microdata/RDFa found on any sampled page) — pass.

---

## Summary of Recommendations by Priority

1. **Medium** — Fix `Organization.logo` to a real ≥112×112px PNG/JPG/WebP (design task first,
   code change second).
2. **Medium** — Add `image`, `mainEntityOfPage`, `author.url` to the single `BlogPosting` template
   in `app/blog/[slug]/page.tsx` (uses the already-existing per-post OG image, no new asset needed).
3. **Medium** — Consolidate `Organization`/`ProfessionalService` into one linked `@id` node in
   `app/layout.tsx`.
4. **Info** — No action needed on `FAQPage` (already correct, just no SERP payoff anymore); don't
   prioritize more FAQ schema work.
5. **Info** — Optional `ItemList` on `/sluzby` hub.
6. **Info** — `AggregateRating`/GBP `sameAs` correctly deferred; revisit only once a real GBP exists.

SCORE: 78
