# Full SEO Audit — vizeon.cz

**Audit date:** 2026-09-05
**Domain age:** ~14 weeks (registered 2026-05-26)
**Business type:** Solo freelance web-dev/SEO agency ("Professional Service"), remote-first — no physical storefront, contact via phone/WhatsApp/email
**Scope:** 48 pages (full sitemap), live production checks + local repo source review
**Method:** 10 parallel specialist audits (technical, content, schema, sitemap, performance, visual/mobile, GEO/AI search, SXO, internal-linking/cluster, backlinks) — full findings in `findings/*.md`

---

## Core SEO Health Score: 66/100

Weighted per the standard 7-category rubric (Technical 22%, Content 23%, On-Page 20%, Schema 10%, Performance 10%, AI Search Readiness 10%, Images 5%):

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO | 76 | 22% | 16.7 |
| Content Quality | 44 | 23% | 10.1 |
| On-Page SEO | 78 | 20% | 15.6 |
| Schema / Structured Data | 78 | 10% | 7.8 |
| Performance (CWV, lab-only) | 60 | 10% | 6.0 |
| AI Search Readiness (GEO) | 57 | 10% | 5.7 |
| Images | 78 | 5% | 3.9 |
| **Total** | | | **65.8 ≈ 66** |

**Important caveat:** this formula doesn't include two specialist audits that scored far lower and arguably matter more for actual business outcomes:

| Supplementary audit | Score | Why it's not in the formula |
|---|---|---|
| SXO / conversion readiness | **33/100** | Not part of the standard weighting, but measures whether pages actually convert visitors — the site's real job |
| Internal linking / cluster architecture | **42/100** | Measures link-equity flow, not on-page content itself |
| Sitemap hygiene | 78/100 | Narrow technical subset, mostly overlaps Technical |
| Visual / mobile rendering | 62/100 | UX-layer, partially overlaps Performance/Technical |
| Backlinks (foundation-readiness) | 34/100 | Expected for domain age; not a quality defect |

**Read the number as 66/100 on paper, but the two lowest-scoring, most business-relevant audits — SXO (33) and internal linking (42) — say the site's biggest problems aren't technical, they're that the highest-volume page type (`/web-pro-*`, 19 of 48 pages) can't convert a visitor once they arrive, and the internal link structure meant to connect them is largely broken.**

---

## Top 5 Findings (by real-world impact, not raw severity label)

1. **CRITICAL — The 19 `/web-pro-*` trade pages have zero images and no way to contact you.** They promise a "gallery that shows your work" and deliver none — confirmed even after forced JS rendering. There's no `tel:`, WhatsApp, email, or contact form anywhere on them, no site navigation either. A ready-to-buy visitor hits a dead end. *(SXO findings 1–2)*

2. **HIGH — Today's "internal prolinkování" commit is mostly broken.** The shared page template's default hub-link points to a sibling page instead of the intended pillar page; only 4 of 19 trade pages link to the real pillar, the pillar itself only links to 4 of 19 spokes, and `/web-pro-autoservisy` has zero inbound links from anywhere but the sitemap. *(Cluster findings 1–3)*

3. **CRITICAL — Homepage LCP is 5.9s (Poor), driven by one ~500KB JS chunk that's 64-82% unused.** This is a lab-only estimate (no CrUX data available yet) but the root cause is unambiguous and fixable without a redesign. *(Performance finding 1)*

4. **HIGH — FAQ page: 8 of 9 answers are invisible to any crawler that reads visible text**, including most AI-answer-engine pipelines — they exist only inside the JSON-LD, not the rendered page, because the accordion uses conditional React rendering instead of CSS collapse. *(GEO finding 3)*

5. **HIGH — Content expansion from today's commit is real but incomplete.** Only 3 of 18 trade pages + the hub got a genuine rewrite (500-800+ words); the other 15 are still 323-345 words on the shared template — differentiated (not spun/duplicate, confirmed via low word-overlap similarity) but thin relative to the 800-word service-page floor. *(Content finding 1, cross-verified by Technical)*

**Also worth knowing:** the homepage's mobile above-the-fold shows only a splash/logo animation with no H1/CTA/nav for several seconds (Visual finding 1); `www.vizeon.cz` still serves a duplicate 200 response instead of redirecting despite `vercel.json` defining the redirect — likely a Vercel dashboard domain-alias override, not a code bug (Technical + Sitemap); and the homepage H1 renders with no spaces between words due to an animated per-word span component (SXO finding 5, independently reproduced during initial audit setup).

---

## Category Summaries

### Technical SEO — 76/100
Crawlability, indexability, and structured data are fundamentally sound: robots.txt/sitemap valid, SSR/SSG confirmed sitewide (no JS-rendering risk for crawlers), zero duplicate titles across 48 pages, single H1 everywhere, no accidental noindex. Real issues: `www` host serving duplicate content instead of redirecting (High — dashboard fix, not code); no Content-Security-Policy header (Medium); hero heading visually gated behind JS/hydration before paint (Medium-High); portfolio images entirely client-rendered on `/ukazky-webu` (Medium); noindex'd `/gdpr`/`/podminky` still listed in sitemap (Medium); no IndexNow support (Low). Full detail: `findings/technical.md`.

### Content Quality — 44/100
**Verdict on the thin-content problem: partially fixed, not resolved.** 15 of 18 trade pages remain at 323-345 words (vs. 800-word floor) despite today's content-expansion commit; the 3 that were rewritten (kadeřnictví, masáže, účetní) prove the team can do it well when they invest the time. All 4 blog posts run 240-333 words against a 1,500-word target — accurate and Czech-market-specific, but reads as extended FAQ, not blog depth. A repetitive "not X, but Y" rhetorical construction appears 30x across sampled pages — a subtle AI-writing tic worth editing out. The founder is anonymized on `/o-mne` ("Zakladatel VIZEON," no name) despite the site's "one named person, not a faceless agency" pitch, and despite the real name appearing in blog schema. Three named, linked homepage testimonials are flagged for owner consent/authenticity verification — not assumed fake, format is stronger than typical fabricated-review patterns. Full detail: `findings/content.md`.

### Schema / Structured Data — 78/100
Better than initially assumed — all 19 trade pages and all 12 service pages carry appropriate `Service`/`BreadcrumbList`/`FAQPage` schema (generated via the shared component, easy to miss on a grep-only pass). Real gaps: `Organization.logo` points at a 32×32 favicon (needs ≥112×112px real asset — design task); `BlogPosting` missing `image`/`mainEntityOfPage` (can use the existing per-post OG image, zero new assets needed); `Organization`/`ProfessionalService` are disconnected nodes in the same graph (should share one `@id`). The missing `AggregateRating`/GBP `sameAs` is correctly deferred in code TODOs — not a defect, don't add until a real GBP exists. Note: Google retired FAQ rich results site-wide as of 2026-05-07, so the FAQPage markup (while correctly implemented) has no remaining SERP payoff — don't prioritize more FAQ schema work expecting a rich result. Full detail: `findings/schema.md`.

### Sitemap — 78/100
All 48 URLs return 200, valid XML, no orphaned pages. One real defect: `/gdpr` and `/podminky` correctly serve `noindex` but are still listed in the sitemap — a contradictory signal Google explicitly advises against. `/admin` and `/admin-setup` already do this correctly (noindex + omitted) — use them as the template for the fix. Full detail: `findings/sitemap.md`.

### Performance (lab-only, no CrUX yet) — 60/100
Structural fundamentals are good (next/image, next/font/google, near-zero CLS, fast TTFB 140-409ms). The dominant problem is JavaScript weight: one shared ~500KB chunk, 64-82% unused depending on route, concentrated on the homepage (LCP 5.9s Poor) but present sitewide. Two render-blocking CSS chunks add ~150ms each; two non-composited animations (shimmer text, glow-pulse button) risk main-thread jank. This is a code-splitting fix, not a redesign. Full detail: `findings/performance.md`.

### AI Search Readiness (GEO) — 57/100
Technical accessibility for AI crawlers is excellent (90/100) — nothing blocks GPTBot/ClaudeBot/PerplexityBot, content is fully SSR. The FAQ accordion bug (Finding 3 above) is the single highest-leverage fix available anywhere in this audit — hours of effort, unlocks 8 already-written, already-schema-marked answers. Blog articles have genuine authority signals (named author, visible byline, real Article schema) but sections run 60-120 words, under the 134-167 word citation-optimal window. Brand-mention/authority signals are near-zero, which is expected and unfixable on-page — realistic expectation is no measurable AI-citation visibility for 6-12 months regardless of on-page work; off-site brand-building (Reddit, YouTube) matters more here than any technical GEO fix. Full detail: `findings/geo.md`.

### Visual / Mobile Rendering — 62/100
Interior pages (`/kontakt`, `/web-pro-truhlare`) render cleanly and immediately on both viewports. The homepage has a mobile-specific regression: above-the-fold shows only a splash/logo animation with no H1, CTA, or nav for multiple seconds, reproduced consistently across captures — desktop shows the real hero at the same load point. Secondary: cookie-consent banner overlaps the contact form's submit button on mobile. Full detail: `findings/visual.md`.

### SXO / Conversion Readiness — 33/100 (lowest score in this audit)
The most consequential finding in this entire audit: the 19 `/web-pro-*` trade pages — the single largest page-type footprint on the site — read as content-marketing descriptions of a good craftsman website rather than actual examples of one. Zero images despite explicitly promising a gallery; zero conversion mechanism (no nav, no tel/WhatsApp/form). Weakest persona (a craftsman searching "web pro truhláře"): 47/100 — promised visual proof and instant contact, gets neither. Full detail: `findings/sxo.md`.

### Internal Linking / Content Architecture — 42/100
The recent "interní prolinkování" commit only partially delivered: a component default (`hubHref`) points at the wrong page, so most of the 19-page trade cluster doesn't actually connect to its intended pillar page in either direction. One page (`web-pro-autoservisy`) is a true orphan. This is the concrete, fixable reason the site's content architecture isn't yet functioning as the hub-and-spoke model it was clearly designed to be. Full detail: `findings/cluster.md`.

### Backlinks — 34/100 (foundation-readiness grade, not an authority score)
Expected zero-authority state for a 14-week-old domain — not a crisis. Genuinely positive: 3 real, verified, dofollow backlinks already exist from delivered client sites. The one concrete gap: zero local citations (no Google Business Profile, no Firmy.cz) despite VIZEON literally selling this exact service to clients. This is correctly identified as an off-site task, not a code fix. Full detail: `findings/backlinks.md`.

---

## What was verified as already correct (don't touch)

- robots.txt / sitemap.xml — valid, correctly linked, no accidental blocks
- SSR/SSG sitewide — no JS-rendering risk for any crawler
- HTTPS + HSTS enforced consistently
- Zero duplicate titles across 48 pages; single H1 everywhere
- `next/image` + `next/font/google` used correctly — near-zero CLS
- Schema coverage (Service/FAQPage/BreadcrumbList/BlogPosting) broader than initially assumed
- `AggregateRating`/GBP `sameAs` correctly deferred in code with TODO comments — no fabricated ratings
- 3 real client backlinks verified live and dofollow
- AI crawlers (GPTBot, ClaudeBot, PerplexityBot, etc.) fully allowed, no blocking anywhere

## Screenshots
Desktop + mobile captures for homepage, `/kontakt`, `/web-pro-truhlare`: `screenshots/` (9 files)

## Full specialist reports
`findings/technical.md` · `findings/content.md` · `findings/schema.md` · `findings/sitemap.md` · `findings/performance.md` · `findings/visual.md` · `findings/geo.md` · `findings/sxo.md` · `findings/cluster.md` · `findings/backlinks.md`

See `ACTION-PLAN.md` for prioritized next steps (code fixes vs. manual/off-site tasks).
