# Technical SEO Audit — vizeon.cz

Audit date: 2026-09-05. Live production checks (curl, header inspection, `sitemap_discovery.py`,
`render_page.py` in `auto` and forced `always` Playwright modes) plus source review of the local
repo (`/Users/krystofsobotka/Desktop/VIZEON /vizeon`: `next.config.mjs`, `vercel.json`,
`middleware.ts`, `components/Portfolio.tsx`, `components/Hero.tsx`).

Sample crawled beyond the homepage: `/web-pro-remeslniky`, `/web-pro-kadernictvi`,
`/web-pro-ucetni` (rendered + text-compared), plus lightweight metadata fetch of **all 48**
sitemap URLs (title, meta description length, robots meta, canonical, H1 count, JSON-LD types) —
including `/sluzby`, `/sluzby/seo-optimalizace/technicke-seo`, `/blog`,
`/blog/kolik-stoji-tvorba-webu-2026`, `/kontakt`, `/cena-tvorby-webu`, `/gdpr`, `/podminky`, and
all remaining `web-pro-*` pages. `/ukazky-webu` was additionally forced through a real Playwright
render to check post-JS image output.

The prior note claiming "no noindex/technical blockers" is **re-verified as accurate** for the
indexable page set — but two real, previously-unflagged issues were found (www duplicate host,
noindexed pages still listed in the sitemap), documented below.

---

## Crawlability — PASS (minor issue)

### Finding: robots.txt and sitemap are valid and correctly linked
- **Severity:** Info
- **Evidence:** `sitemap_discovery.py --json` confirms the robots.txt-declared sitemap
  (`https://vizeon.cz/sitemap.xml`) returns HTTP 200, `kind: urlset`, `valid: true` — this is a
  genuine passing result, not a stale declaration. `robots.txt` is `User-Agent: *` / `Allow: /` /
  `Disallow: /api/` only; no accidental blanket disallow. Common fallback sitemap paths
  (`/sitemap_index.xml`, `/sitemap-index.xml`, `/wp-sitemap.xml`) correctly 404, confirming a
  single canonical sitemap.
- **Recommendation:** None required. `/api/` disallow is appropriate (no page content lives
  there).

### Finding: JS rendering is not required for content — SSR/SSG confirmed sitewide
- **Severity:** Info
- **Evidence:** `is_spa: False` on every page checked (homepage, 3× `web-pro-*`, `/ukazky-webu`).
  All sampled responses carry `x-nextjs-prerender: 1` and serve full title/meta/H1/body text/
  JSON-LD in the raw (non-JS-executed) HTML. This is a Next.js App Router site using static
  generation/ISR, which is optimal for crawl reliability.
- **Recommendation:** None required.

### Finding: `noindex` legal pages (`/gdpr`, `/podminky`) are still listed in `sitemap.xml`
- **Severity:** Medium
- **Evidence:** Both pages correctly serve `<meta name="robots" content="noindex, nofollow">`
  (good — legal boilerplate shouldn't be indexed), but both `https://vizeon.cz/gdpr` and
  `https://vizeon.cz/podminky` are present in `sitemap.xml` with `lastmod`/`priority` entries.
  Google explicitly recommends excluding noindex'd URLs from sitemaps; the mismatch sends a
  contradictory crawl signal and wastes a sliver of crawl budget on a 48-URL sitemap.
- **Recommendation:** Remove `/gdpr` and `/podminky` from the sitemap generator (check
  `app/sitemap.ts`/equivalent — likely enumerates all routes without filtering by robots meta).

---

## Indexability — WARN

### Finding: `www.vizeon.cz` serves a full duplicate 200 response instead of redirecting (config drift)
- **Severity:** High
- **Evidence:** `vercel.json` (committed 2026-07-09, commit `1b96021 "seo: add canonical URL + www
  redirect"`) defines a redirect rule for host `www.vizeon.cz` → `https://vizeon.cz` (permanent).
  `middleware.ts` even comments: *"www.vizeon.cz se přesměrovává na apex ve vercel.json, takže sem
  by Origin: https://www.vizeon.cz neměl nikdy dorazit."* However, live production behavior
  contradicts this: `curl -I https://www.vizeon.cz/` returns **HTTP 200** with the full homepage
  (identical `content-length` region, same title/body), **not a 301/308**. The page does carry a
  correct self-canonical pointing to the non-www apex (`<link rel="canonical"
  href="https://vizeon.cz">`), which limits (but doesn't eliminate) duplicate-indexing risk —
  Google may still crawl both hosts, split any external links/signals pointing at www, and per
  the skill's JS-SEO guidance a canonical-only fix is weaker than an actual redirect. This is a
  live discrepancy between documented/intended config and shipped behavior, most likely because
  the `www` hostname is attached to the Vercel project as a serving domain (not purely a redirect
  target) in the dashboard, which overrides `vercel.json`'s redirect rule.
- **Recommendation:** In the Vercel dashboard (Project → Settings → Domains), confirm
  `www.vizeon.cz` is configured as a **Redirect** to the apex domain, not as a second production
  alias. Verify with `curl -I https://www.vizeon.cz/` after the change — expect a `308` to
  `https://vizeon.cz/`. This is a config/dashboard fix, not a code fix.

### Finding: `/web-pro-*` template pages (19 pages) — genuinely differentiated, low duplicate-content risk, but template-pattern is worth monitoring
- **Severity:** Low (informational)
- **Evidence:** All 19 `web-pro-*` pages (`web-pro-remeslniky`, `web-pro-kadernictvi`,
  `web-pro-ucetni`, `web-pro-masery-a-wellness`, `web-pro-zamecniky`, `web-pro-kovare`,
  `web-pro-rezbare`, `web-pro-studnare`, `web-pro-malire`, `web-pro-sanace`, `web-pro-truhlare`,
  `web-pro-zahradniky`, `web-pro-instalatery`, `web-pro-elektrikare`, `web-pro-fotografy`,
  `web-pro-kosmeticky`, `web-pro-fitness-trenery`, `web-pro-realitni-maklere`,
  `web-pro-autoservisy`) have unique, self-referencing canonicals, unique titles, unique single
  H1s, and unique meta descriptions (verified across all 19 in the bulk metadata pull — zero
  duplicate titles across all 48 sitemap URLs). A 3-page deep text comparison
  (`web-pro-remeslniky` vs `web-pro-kadernictvi` vs `web-pro-ucetni`) shows genuinely distinct body
  copy (`difflib` similarity ratios of 0.036–0.184, i.e. low overlap), word counts 497–588 —
  comfortably above thin-content thresholds. Structurally, however, all pages share the same
  section layout and repeat the same `Answer`/`FAQPage`/`Question`/`Service` JSON-LD shape with
  reworded content, which is a template pattern that can read as programmatic/doorway-adjacent at
  scale if it grows further without added differentiation.
- **Recommendation:** No urgent action — content quality currently clears the bar. As the template
  is reused for more trades, keep adding trade-specific proof (real project photos, trade-specific
  FAQs, distinct testimonials) rather than only swapping nouns, to keep differentiation ahead of
  page count.

### Finding: Canonical tags are self-referencing and consistent across all sampled page types
- **Severity:** Info
- **Evidence:** All 48 sitemap URLs return a self-referencing `<link rel="canonical">` matching
  their own URL (verified in bulk). No `www` vs non-www conflict *within* the canonical tags
  themselves (see www finding above for the underlying host-level issue).
- **Recommendation:** None required.

---

## Security — WARN

### Finding: No Content-Security-Policy header
- **Severity:** Medium
- **Evidence:** `next.config.mjs` → `headers()` sets `X-Frame-Options: DENY`,
  `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`,
  `Permissions-Policy`, and HSTS — but no `Content-Security-Policy` header. Confirmed absent in
  live responses on homepage, `/robots.txt`, `/blog/kolik-stoji-tvorba-webu-2026`,
  `/sluzby/seo-optimalizace/technicke-seo`, and `/web-pro-kovare` alike (checked via `curl -D -`).
  No CSP is defined anywhere in `next.config.mjs`, `vercel.json`, or `middleware.ts`.
- **Recommendation:** Add a CSP header (even a moderately permissive `default-src 'self'` with
  explicit allowances for the GTM/analytics and font-loading origins already in use) via the same
  `headers()` block in `next.config.mjs`. `X-Frame-Options: DENY` already blocks framing, so this
  is a defense-in-depth hardening item, not an active exploit — reflected in Medium, not
  Critical/High.

### Finding: HTTPS + HSTS correctly enforced and consistent across page types
- **Severity:** Info (pass)
- **Evidence:** `http://vizeon.cz` → `308` to `https://vizeon.cz/`. HSTS
  (`max-age=63072000; includeSubDomains; preload`) present identically on homepage, robots.txt,
  blog article, sluzby sub-page, and web-pro page. No mixed-content indicators in sampled HTML.
- **Recommendation:** None required. (Confirm actual HSTS-preload-list submission status
  separately if not already done — the header alone doesn't guarantee list inclusion.)

---

## URL Structure — PASS (one shared issue with Indexability)

### Finding: Clean, hyphenated, hierarchical URLs; single-hop redirects only
- **Severity:** Info
- **Evidence:** All sitemap URLs are lowercase, hyphenated, descriptive, and reflect logical
  nesting (`/sluzby/seo-optimalizace/technicke-seo`). Trailing-slash requests 1-hop-redirect to
  the canonical no-trailing-slash form (`/kontakt/` → `308` → `/kontakt`), matching
  `vercel.json`'s `"trailingSlash": false`. No redirect chains observed (max 1 hop in all tests).
  All URLs are well under the 100-character flag threshold.
- **Recommendation:** None required. The one real URL-structure defect is the www-host issue
  already logged under Indexability (High) — not duplicated here.

---

## Mobile — PASS (surface-level)

### Finding: Viewport meta tag present and correct; deeper mobile QA not performed
- **Severity:** Low (informational)
- **Evidence:** `<meta name="viewport" content="width=device-width, initial-scale=1">` present on
  all sampled pages. Tailwind-based responsive classes observed throughout components
  (`Portfolio.tsx`, `Hero.tsx`). Touch-target sizing and font-size-at-rest could not be fully
  verified from static HTML/CSS inspection alone (would need a rendered viewport screenshot pass).
- **Recommendation:** Run a Lighthouse mobile pass (or the `agent_ux_check.py` / Playwright
  screenshot tooling) as a follow-up to confirm 48×48px touch targets and 16px base font in
  practice, particularly on the dense `web-pro-*` template cards and the sticky contact CTA.

---

## Core Web Vitals — WARN

### Finding: Hero H1 (likely LCP element) is JS-gated via framer-motion `initial="hidden"`
- **Severity:** Medium-High
- **Evidence:** `components/Hero.tsx` renders the homepage's primary heading as
  `<motion.h1 variants={staggerFast} initial="hidden" animate="visible" ...>`, and the H2/CTA
  block below it use the same `initial="hidden" animate="visible"` pattern with staggered delays
  (0.8s/1.0s/1.2s). This means the largest above-the-fold text content starts at `opacity: 0`
  (framer-motion's hidden variant) in the DOM and only becomes visually painted once
  React hydrates and framer-motion's animation runs. 14 components sitewide use
  `whileInView`/`animate` fade patterns (`grep` count). Text is present in raw HTML (good for
  crawling/indexing), but the *visual paint* of the LCP candidate is dependent on JS
  execution + hydration timing rather than pure CSS/SSR paint, which directly risks pushing LCP
  (and, via staggered delays, INP-adjacent perceived interactivity) into the "Needs Improvement"
  range on slower devices/connections — exactly the kind of source-level CWV risk this audit is
  meant to catch without lab data.
- **Recommendation:** For the hero H1/H2 specifically, either remove the JS-dependent fade-in
  entirely (render at full opacity by default) or implement it as a CSS-only animation
  (`@keyframes` + `animation-fill-mode`) that doesn't require JS/hydration to reach the final
  visible state. Reserve framer-motion `whileInView` reveals for below-the-fold, non-LCP content
  where the delay doesn't matter.

### Finding: Fonts preloaded, scripts async — no other obvious render-blocking issues
- **Severity:** Info
- **Evidence:** Homepage `<head>` preloads 4 woff2 font files and loads all `_next/static/chunks/*`
  scripts with `async`; GTM is preload-hinted. No large inline `<script>`/`<style>` blocks
  observed in the sampled HTML.
- **Recommendation:** None required beyond the hero-animation fix above.

---

## Structured Data — PASS

### Finding: JSON-LD present and type-appropriate across all page templates
- **Severity:** Info
- **Evidence:** Bulk scan of all 48 URLs' `@type` values shows consistent, appropriate coverage:
  `Organization` + `ProfessionalService` + `WebSite` + `Country` sitewide; `BreadcrumbList`/
  `ListItem` on all interior pages; `FAQPage`/`Question`/`Answer` on FAQ-bearing pages (all
  `web-pro-*`, `/faq`, several `/sluzby/*`); `Service` on service-type pages; `BlogPosting` +
  `Person` on all 4 blog articles. No missing structured data on templates that should have it.
- **Recommendation:** Spot-validate a couple of `FAQPage` and `BlogPosting` instances in Google's
  Rich Results Test for field-level completeness (e.g. `datePublished`, `author.url`) — not done
  in this pass since it requires the live validator API; defer to the `seo-schema` skill for a
  deeper pass if warranted.

---

## JavaScript Rendering — WARN

### Finding: Portfolio/reference images render only client-side — zero `<img>` tags in raw HTML on the page whose entire purpose is showing visual proof
- **Severity:** Medium
- **Evidence:** Raw HTML (`curl`, no JS) for homepage, all 3 sampled `web-pro-*` pages, and
  `/ukazky-webu` (the portfolio/reference showcase page) contains **zero** `<img>`, `<picture>`,
  or CSS `background-image` occurrences. `components/Portfolio.tsx` is a `"use client"` component
  using `next/image` inside framer-motion `whileInView` wrappers; forcing a real Playwright render
  (`render_page.py --mode always`) confirms images *do* appear post-JS with good, descriptive,
  unique `alt` text (e.g. `"Firemní web pro kovovýrobu Schovinox — zámečnictví a svařování"`) via
  `next/image` (`data-nimg="fill"`). So alt-text quality is good, but it only exists after
  JS execution — non-JS-executing crawlers/bots (some AI crawlers, social unfurlers, Bing's
  simpler fetch path) and Google Images' primary discovery signal see no image content or alt
  text at all on the very page meant to sell visual work.
- **Recommendation:** Server-render at least the first 1-2 portfolio images (drop `"use client"`
  for the image markup itself, or move the `Image` components out of the client-only wrapper and
  keep only the hover/motion effects client-side) so image content and alt text exist in the
  initial HTML. Consider an image sitemap entry for `/ukazky-webu` assets as a supplementary fix.

---

## IndexNow Protocol — FAIL (not implemented)

### Finding: No IndexNow support detected
- **Severity:** Low
- **Evidence:** No IndexNow key file in `public/`, no reference to `indexnow` in the codebase
  (`app/`, `lib/`), and no IndexNow submission call found in build/deploy scripts.
- **Recommendation:** Implement IndexNow (a simple key file + a POST-on-publish call, or a
  ready-made Vercel-compatible package) to get faster indexing from Bing/Yandex/Naver on new/
  updated pages — cheap to add given the site already has a clear content-update cadence (new
  blog posts, new `web-pro-*` pages added 2026-09-02 per sitemap `lastmod`).

---

## On-Page & Images (secondary section)

### Finding: Title tags — unique across all 48 pages, a few risk SERP truncation
- **Severity:** Low
- **Evidence:** Zero duplicate `<title>` values across the full 48-URL sitemap set (checked
  programmatically). A handful exceed ~60-70 characters and risk truncation in Google's SERP
  (~575-600px pixel width, roughly 60 chars for typical characters):
  `/sluzby/tvorba-webovych-stranek` (84 chars), `/spoluprace` (63), `/sluzby/seo-optimalizace`
  (73), `/sluzby/seo-optimalizace/technicke-seo` (71). Most other titles are well-sized (31-59
  chars).
- **Recommendation:** Trim the 4 longest titles to ≤60 characters, front-loading the primary
  keyword; not urgent since the pixel cutoff mainly clips the trailing "| VIZEON" brand suffix.

### Finding: Meta descriptions — present and unique everywhere, a few over/under ideal length
- **Severity:** Low
- **Evidence:** Every one of the 48 pages has a non-empty, page-specific meta description
  (measured length in bulk scan). A few run past ~160 characters and will truncate in SERP:
  `/zakaziq` (201 chars), `/sluzby/tvorba-webovych-stranek` (167),
  `/blog/google-business-profile-vs-firmy-cz` (161), `/ukazky-webu` (169). Several `web-pro-*`
  pages run short (93-110 chars: `web-pro-kosmeticky`, `web-pro-fitness-trenery`,
  `web-pro-zahradniky`, `web-pro-instalatery`) — not wrong, just under-using the available SERP
  real estate.
- **Recommendation:** Trim the 4 over-length descriptions to ≤155-160 chars; optionally pad the
  shortest `web-pro-*` descriptions toward 140-155 chars with a concrete benefit/CTA.

### Finding: Heading structure — exactly one H1 per page, sitewide
- **Severity:** Info (pass)
- **Evidence:** H1 count = 1 on every one of the 48 sampled pages, including the homepage,
  `/ukazky-webu`, and all `web-pro-*`/`/sluzby/*`/blog pages. No multi-H1 or missing-H1 pages
  found. `components/Portfolio.tsx` happens to render its own `<motion.h1>` — verified it is only
  imported by `app/ukazky-webu/page.tsx` (no other route imports it), so no duplicate-H1 risk
  today, but worth a note if that component is ever reused as a homepage section.
- **Recommendation:** None required now; if `Portfolio.tsx` is ever embedded elsewhere, downgrade
  its internal heading to `<h2>` first.

### Finding: Portfolio image alt text is good in quality but JS-dependent in presence (cross-ref JS Rendering section above)
- **Severity:** Medium (same finding as above, tracked once)
- **Evidence:** See "JavaScript Rendering" section — alt text itself is descriptive and
  unique per image once rendered; the defect is presence timing, not quality.
- **Recommendation:** See recommendation above (SSR the image markup).

### Finding: Oversized original image assets in `/public`
- **Severity:** Medium
- **Evidence:** `next.config.mjs` correctly configures `next/image` (`avif`/`webp` formats,
  device/image size arrays, 30-day CDN cache), which mitigates delivery size — but several source
  originals feeding that pipeline are large: `public/portfolio/kavarna.jpg` (4.8MB),
  `public/portfolio/aufgehts.jpg` (1.5MB), `public/portfolio/ucerhu.jpg` (1.4MB). Large originals
  increase build/regeneration cost and raise the risk of an oversized image being served if any
  code path bypasses `next/image` sizing.
- **Recommendation:** Pre-compress source images (target <500KB per original, e.g. via `sharp`/
  `squoosh` before committing) so the optimization pipeline has better inputs; not urgent since
  `next/image` is already in place and doing most of the work.

---

## Category Breakdown

| Category | Status | Score |
|----------|--------|-------|
| Crawlability | pass | 90/100 |
| Indexability | warn | 75/100 |
| Security | warn | 78/100 |
| URL Structure | pass | 92/100 |
| Mobile | pass | 85/100 |
| Core Web Vitals | warn | 65/100 |
| Structured Data | pass | 90/100 |
| JS Rendering | warn | 70/100 |
| IndexNow | fail | 40/100 |
| On-Page & Images (secondary) | warn | 78/100 |

## Priority Summary

**Critical:** none.

**High:**
- `www.vizeon.cz` serves duplicate 200 content instead of redirecting despite `vercel.json`
  defining the redirect (Indexability).

**Medium:**
- No Content-Security-Policy header (Security).
- Hero H1/H2 visually gated behind framer-motion JS/hydration (Core Web Vitals).
- Portfolio/reference images entirely client-rendered, absent from raw HTML on `/ukazky-webu`
  (JS Rendering / On-Page & Images).
- `noindex` pages (`/gdpr`, `/podminky`) still listed in `sitemap.xml` (Crawlability).
- Oversized original image assets in `/public` (On-Page & Images).

**Low:**
- IndexNow not implemented.
- A handful of titles/meta descriptions run long or short of ideal SERP length.
- `web-pro-*` template pattern worth monitoring for differentiation as it scales (currently fine).

SCORE: 76
