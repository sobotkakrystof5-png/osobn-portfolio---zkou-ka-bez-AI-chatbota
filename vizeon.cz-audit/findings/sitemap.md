# Sitemap Audit — vizeon.cz/sitemap.xml

Audited: 2026-09-05
Source: live `https://vizeon.cz/sitemap.xml` (fetched, 48 `<loc>` entries, 7.3KB) cross-checked against
`app/sitemap.ts` (generator source of truth) and `app/**/page.tsx` route tree.

## Finding 1: Noindexed pages included in sitemap (gdpr, podminky)

**Severity:** High

**Evidence:**
- `app/gdpr/page.tsx:9` and `app/podminky/page.tsx:9` both set `robots: { index: false, follow: false }`.
- Confirmed rendered in production HTML: `curl -s https://vizeon.cz/gdpr` → `<meta name="robots" content="noindex, nofollow"/>` (same for `/podminky`).
- Both URLs are nonetheless present in `sitemap.xml` (`<lastmod>2026-05-23</lastmod>`, `priority` 0.3, `changefreq` yearly), sourced from `app/sitemap.ts` lines ~272-282.
- This is a direct contradiction: Google Search Console will report these as "Excluded by 'noindex' tag" under "Submitted URLs," which is a wasted/contradictory signal (not a ranking penalty, but a documented cleanliness issue and a common cause of confused audits/clients).

**Recommendation:** Remove `/gdpr` and `/podminky` from `app/sitemap.ts`. Sitemaps should only list indexable, canonical URLs. If they must appear (e.g. legal requirement to be linkable), leave them out of the sitemap regardless — sitemap inclusion is not required for crawlability, only for discovery priority, and these are already reachable via footer links.

## Finding 2: lastmod dates are manually curated but understate recency for gdpr/podminky

**Severity:** Low

**Evidence:**
- Code comment in `app/sitemap.ts:4-5` confirms dates are deliberately hand-set (not `new Date()`), which is correct practice per Google guidance (real change dates, not boilerplate).
- Spot-checked 24/48 URLs (50%) share `lastmod = 2026-09-02`, which matches an actual git commit (`745a1e9 feat(seo): rozšíření obsahu web-pro-* stránek...`, dated 2026-09-02) — plausible, not fabricated.
- However `/gdpr` (`git log` last touch: 2026-08-27) and `/podminky` (2026-08-30) both show `lastmod: 2026-05-23` in the sitemap — older than their actual last edit. Low-impact since these pages are noindexed anyway (see Finding 1), but if Finding 1 is left unfixed, fix this too.

**Recommendation:** Moot if Finding 1's fix (removal) is applied. Otherwise sync `lastmod` to the real last significant-content-change commit date.

## Finding 3: priority/changefreq tags present, no functional value

**Severity:** Info

**Evidence:** Every `<url>` entry carries `<changefreq>` and `<priority>` (e.g. home = 1.0, `/sluzby` = 0.9, `/gdpr` = 0.3). Google has explicitly stated both are ignored for ranking/crawl-scheduling purposes since ~2023.
- Notably, the two-tier priority split among `web-pro-*` pages (0.8 for the 4 longer "hub" pages — remeslniky/kadernictvi/ucetni/masery-a-wellness — vs 0.6 for the 15 shorter "micro" pages) reflects real content-depth differences and is a reasonable authoring signal for maintainers, but it has **zero effect on Google's crawling or indexing** of these pages.

**Recommendation:** Optional cleanup — can strip both tags with no ranking impact. If kept for internal/other-crawler use (Bing still partially honors them), no action needed. Not blocking.

## Finding 4: XML validity, size, and URL health — all pass

**Severity:** Pass (no action)

**Evidence:**
- `sitemap.xml` parses as well-formed XML (`xml.dom.minidom`), correct `urlset` namespace, single flat file (no index needed).
- 48 URLs total — far under the 50,000 URL / 50MB single-file limit.
- All 48 URLs checked via `curl -o /dev/null -w "%{http_code}"`: **48/48 return HTTP 200**, no 404s, no redirect chains (verified with `-L --max-redirs 5`; effective URL == submitted URL for every entry except the bare-apex homepage, which only gains a trailing slash, same resource).
- `robots.txt` (`app/robots.ts`) declares `Allow: /`, `Disallow: /api/`, and correctly points `Sitemap: https://vizeon.cz/sitemap.xml`. Skill's `sitemap_discovery.py` confirmed discovery via robots.txt works (`status_code: 200`, `kind: urlset`, `valid: true`) and found no orphaned secondary sitemaps (checked `sitemap_index.xml`, `sitemap-index.xml`, `wp-sitemap.xml` — all correctly 404, none expected).

**Recommendation:** None needed.

## Finding 5: No orphaned pages — app/ route tree matches sitemap 1:1 (with correct exclusions)

**Severity:** Pass (no action)

**Evidence:**
- Diffed all `app/**/page.tsx` routes against the 48 sitemap URLs.
- Every public, indexable route is present in the sitemap.
- `app/admin/page.tsx` and `app/admin-setup/` are correctly **excluded** from the sitemap — both carry `robots: { index: false, follow: false }` (admin via page metadata, admin-setup via `app/admin-setup/layout.tsx:5`). This is the correct pattern that `/gdpr` and `/podminky` should also follow (see Finding 1) but currently don't.
- `app/blog/[slug]/page.tsx` (dynamic route) is correctly represented via the `blogPosts` map in `app/sitemap.ts` sourced from `lib/data/blog.tsx` — 4 posts, 4 sitemap entries, verified matching slugs.

**Recommendation:** None needed. Use `/admin` and `/admin-setup` as the template for how `/gdpr` and `/podminky` should be handled (noindex + omit from sitemap, both).

## Finding 6: 19 `web-pro-*` niche pages — flat in sitemap, near-duplicate template risk (below hard thresholds, worth monitoring)

**Severity:** Warning (proactive, not yet breaching stated gates)

**Evidence:**
- These are **trade/niche pages** (kovář, zámečník, řezbář, studnař, malíř, sanace, truhlář, zahradník, instalatér, elektrikář, fotograf, kosmetička, fitness trenér, realitní makléř, autoservis — 15 pages) plus 4 longer "hub" pages (remeslníci, kadeřnictví, účetní, masáže/wellness) — **not literal city/location pages** (no `-praha`/`-brno` style pages found in `app/`), so the letter of the 30/50-page location-page gate does not technically trigger.
- All 15 micro-pages share one component, `components/pillar/MicroServicePage.tsx`, with identical section headers ("Co takový web potřebuje," "Časté otázky," identical CTA block) and identical structure (3 bullets, case-example, process steps, FAQ).
- Word counts for the 15 micro-pages range 418–509 words each (checked via `wc -w` on each `page.tsx`); the 4 hub pages run 1,135–1,543 words.
- Spot-checked content (kovář, full page read) is genuinely craft-specific prose (galerie realizací, kovaná brána, atd.), not a find-replace template — bullets/FAQ/case-example text differ meaningfully per trade, and `relatedSlugs` cross-links each micro-page to 2-3 sibling trades, which is a reasonable de-doorway-page mitigation.
- Sitemap itself provides no grouping (flat list, no `<sitemapindex>`, no path-based clustering) — but per Finding 3, sitemap priority/grouping has no Google ranking effect anyway; the structure that actually matters for topical-cluster signals is internal linking (hub page `/tvorba-webu-pro-zivnostniky` + `relatedSlugs` mesh), which does exist.

**Recommendation:**
1. No sitemap change needed for grouping — priority/order in the sitemap file doesn't influence Google's treatment either way.
2. The real lever is content uniqueness, which currently looks acceptable (craft-specific prose, not spun) but is thin (~450 words average) and 100% template-identical in structure across 15 pages — this is inside the pattern Google's doorway-page classifier watches for. Recommend: keep monitoring unique-content ratio as more trades are added; do not go past ~500-word thin template without adding at least one more genuinely unique block (e.g. trade-specific pricing note, real portfolio photo, or testimonial) per page.
3. **Explicit warning if scope grows:** if these 19 trade pages are ever multiplied by city (e.g. `web-pro-kovare-praha`, `web-pro-kovare-brno`), that recreates the classic location-page doorway pattern this skill's gate is designed to catch — do not do this without a hard content-uniqueness plan (60%+ unique per page) and explicit sign-off, per the 30+/50+ gates.

---

## Summary

| Check | Result |
|---|---|
| XML validity | Pass |
| Per-file limits (50k URLs / 50MB) | Pass (48 URLs, 7.3KB) |
| URL status codes (48/48 checked) | Pass — all 200 |
| Orphaned pages (app/ vs sitemap) | Pass — none found |
| Noindexed URLs in sitemap | **Fail — gdpr, podminky** |
| lastmod plausibility | Mostly pass, 2 stale dates (tied to Finding 1) |
| priority/changefreq | Present but inert (Info only) |
| Location/niche page quality gate | Below hard 30/50 thresholds; proactive monitoring recommended |

SCORE: 78
