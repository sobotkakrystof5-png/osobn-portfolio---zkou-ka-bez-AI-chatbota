# Backlink Profile Audit — vizeon.cz

**Domain age:** ~14 weeks (registered 2026-05-26). **Tier:** 0 (Common Crawl + verification
crawler only — `backlinks_auth.py --check` confirms no Moz/Bing/DataForSEO keys configured;
`cached_domains: 0`). No DA/PA/spam-score numbers are reported anywhere below because Tier 0 has
no source for them — inventing plausible-looking numbers would be worse than reporting nothing.

A near-zero backlink footprint is the **expected, normal state** for a domain this young. Nothing
below should be read as a crisis; it's a starting-line snapshot plus a plan.

---

## Finding 1: Domain not yet present in Common Crawl's web graph — expected, not a quality signal

**Severity:** Info (Pass — no action)

**Evidence:**
- `commoncrawl_graph.py vizeon.cz --json` (release `cc-main-2026-jan-feb-mar`) returns
  `in_crawl: false`, `in_rankings: false`, `pagerank: null`, `harmonic_centrality: null`, with note
  "Domain not found in Common Crawl data. It may be too new, too small, or not yet crawled."
  Source: Common Crawl web graph (domain-level, confidence: 0.50, freshness: quarterly release —
  https://commoncrawl.org/web-graphs).
- Per this skill's own validation rule, absence from Common Crawl must **not** be interpreted as
  "low authority" — CC's web graph is built from a fixed prior crawl snapshot and simply hasn't
  ingested this domain yet (registered 2026-05-26; the crawl feeding the current release predates
  that or never reached it).

**Recommendation:** No action. Re-run this check after the next quarterly CC release
(`--update` flag) once the site has a few more months and inbound links; do not treat today's
`null` as a baseline "authority score."

---

## Finding 2: Three real, live, dofollow backlinks already exist from delivered client sites

**Severity:** Pass (positive finding)

**Evidence:**
- `verify_backlinks.py --target https://vizeon.cz` checked the three sites tagged
  `badgeType: "client"` in `lib/data/portfolio.ts` (real delivered work, not demos):
  `schovinox.cz`, `u-cerhu.cz`, `masazekestner.cz`.
- All 3 returned HTTP 200 and contain a live, verified link to `vizeon.cz`:
  - schovinox.cz → anchor "Vizeon", `rel="noopener noreferrer"`
  - u-cerhu.cz → anchor "vizeon.cz", `rel="noopener noreferrer"`
  - masazekestner.cz → anchor "vizeon.cz", `rel="noopener"`
- None carry `rel="nofollow"` or `rel="sponsored"` — these are standard followed links passing
  whatever equity those domains eventually accrue.
- Source: Backlink Verification Crawler, direct HTTP fetch + HTML parse (confidence: 0.95 — this
  is a direct observation, not an inference).

**Recommendation:** None required — this is already working correctly (client footer/credit
links surviving intact). See Finding 4 for a minor future-proofing note on anchor text variety.

---

## Finding 3: Zero local business citations — no Google Business Profile, no Firmy.cz — the single biggest concrete gap

**Severity:** High (opportunity — this is the actionable core of the link-building plan, not a defect)

**Evidence:**
- Repo-wide search for any live GBP/Google Maps link (`g.page`, `maps.app.goo.gl`,
  `business.google.com`) returns zero hits outside of copy describing the *service* VIZEON sells
  to clients.
- `app/layout.tsx` lines 101–104 and 115–117 contain explicit, dated TODO comments deferring
  `aggregateRating` and a Google Maps URL in the `sameAs` array "až vznikne Google Business
  Profile" (once a GBP exists) — confirming this is a known, not-yet-done item, correctly not
  faked with placeholder data.
- VIZEON's own `/sluzby/seo-optimalizace/lokalni-seo` page and a blog post
  (`lib/data/blog.tsx`, "Google Business Profile vs Firmy.cz") sell exactly this setup to clients
  — the operator has not yet applied it to their own business.
- No `PostalAddress` in the `ProfessionalService` JSON-LD (`app/layout.tsx`) — only
  `telephone`/`email`/`areaServed`. This may be a deliberate privacy choice for a solo
  home-based freelancer (not flagging as an error), but it does mean city-level citations
  (GBP, Firmy.cz, directories) currently have nothing on-site to stay consistent with.

**Recommendation:** See "Off-Site (manual)" plan below — this is fundamentally an off-site
registration task, not a code fix.

---

## Finding 4: Anchor text on the only 3 known backlinks is 100% brand-name — fine now, worth diversifying as the link count grows

**Severity:** Low / Info

**Evidence:** All 3 verified anchors are the brand itself ("Vizeon" / "vizeon.cz" — see Finding 2).
At n=3 this is completely normal and not an over-optimization risk.

**Recommendation:** No urgent action. When asking future clients or directories for a link, it's
fine to keep most as brand anchors, but where the platform allows a short description (e.g. a
directory "specialization" field), use a natural phrase like "tvorba webových stránek" rather than
defaulting to "vizeon.cz" every time — keeps the profile natural rather than uniform.

---

## Finding 5: Site is fully crawlable — no technical blocker to future backlink/citation discovery

**Severity:** Pass

**Evidence:**
- Cross-referenced with `vizeon.cz-audit/findings/sitemap.md` (already audited in this run):
  `robots.txt` allows `/`, sitemap is valid XML with 48/48 URLs returning HTTP 200.
- `public/google54d31ac582d87a3f.html` confirms Google Search Console ownership is already
  verified for this property — a free, zero-setup channel for the user to check GSC's own
  **Links** report manually (that report isn't reachable through this skill's Tier 0 tools, since
  no API key is wired up for it, but the verification file proves the account access already
  exists).

**Recommendation:** No code action needed. Manual: periodically check Search Console → Links
(External links) as a free cross-check against this report — do this every few weeks, it costs
nothing and needs no new setup.

---

## Link-Building Starter Plan

Realistic for a solo Czech freelancer targeting local tradespeople (řemeslníci, kadeřnictví,
masáže/wellness, účetní, etc. — matches the `web-pro-*` pillar pages already on the site).

### On-Site (code) — things that belong in this repo, I can implement these

1. **Nothing is blocking backlinks on the technical side today** (Finding 5) — no code fix is
   required for crawlability itself.
2. **Optional: decide on and add a `PostalAddress` (at minimum city-level) to the
   `ProfessionalService` JSON-LD in `app/layout.tsx`**, once a decision is made on whether to
   publish one — needed for exact NAP (Name-Address-Phone) matching once GBP/Firmy.cz/directories
   are registered (Finding 3). This is a genuine on-site code change, but it depends on an
   off-site business decision (do you want a public address at all as a home-based freelancer?)
   — flagging, not doing this automatically.
3. **Add the GBP Google Maps URL to the `sameAs` array in `app/layout.tsx`** (the TODO already
   marks exactly where) — but only *after* the off-site GBP profile below is created. This is a
   one-line code change I can make on request once that URL exists; doing it now would mean
   linking to nothing.
4. Everything else in this plan is off-site by nature (registrations, outreach, profile setup) —
   the codebase itself has no other backlink-blocking gaps.

### Off-Site (manual) — the user handles these, not code

1. **Google Business Profile** (business.google.com) — free, ~15–20 min setup. This is the
   single highest-leverage item: a citation, a map pack presence, and a `sameAs` target for the
   schema TODO above. Category: web design / IT services, service-area business (no public
   address needed — GBP supports "I deliver to customers" without listing a home address).
2. **Firmy.cz** (Seznam's directory/business listing, free) — VIZEON's own blog post already
   explains why this matters for the Czech market specifically (Seznam has independent search
   share here). Same NAP details as GBP.
3. **Czech business/freelancer directories** — free or low-cost general listings that are
   normal, expected citations for a Czech IČO-holder, e.g. `firmy.cz`, `edb.cz`, `zlatestranky.cz`,
   `najisto.centrum.cz`. Low individual authority each, but cheap NAP-consistency wins; do a
   handful, not dozens — directory-stuffing has no upside once diminishing returns kick in.
4. **Chamber-of-commerce / trade-association style listings relevant to web dev freelancers** —
   e.g. Czech IT/freelancer associations or regional hospodářská komora listing if the user is a
   member (only worth doing if membership already exists or is being considered anyway — don't
   join purely for the link).
5. **Ask each of the 3 existing client sites** (schovinox.cz, u-cerhu.cz, masazekestner.cz) if the
   credit link can stay long-term and, where a client platform allows it, if a short line about
   the project could be added to the client's own testimonials/blog. These already link back
   (Finding 2) — this is about protecting/extending what's already there, not building it fresh.
6. **Guest posts / collabs with the trade niches VIZEON builds for** — e.g. a short guest
   article or interview on a tradesperson's association blog, a local business Facebook group
   post, or a joint case-study post co-published with a future client (with their permission) once
   there are 2-3 more delivered projects to reference. Don't cold-pitch generic "guest post" sites
   — Google treats those as a toxic-link pattern; stick to niches VIZEON actually serves.
7. **Every future delivered client site should carry a footer credit link back to vizeon.cz**
   (the existing 3 already do this correctly) — make this a standard line item in the delivery
   checklist/contract going forward, not an afterthought asked for later.
8. **Search Console → Links report** — check manually every few weeks (Finding 5); it's free and
   already unlocked, and will show any organic mentions this skill's Tier 0 tools can't discover
   on their own.

---

## What this report does not cover

- **E-E-A-T / content authority signals** (author bios, trust pages): see `/seo content
  vizeon.cz` instead of duplicating here.
- **Crawlability/technical SEO**: already covered in `vizeon.cz-audit/findings/sitemap.md` and
  `technical.md` from this same audit run; this report only cross-references those findings.
- **AI/GEO brand-mention footprint** (Wikipedia, Reddit, LLM citability): already assessed in
  `vizeon.cz-audit/findings/geo.md` (Finding 5 there, scored as part of that report's "Authority &
  Brand Signals" dimension) — not duplicated here to avoid double-counting the same zero-mentions
  fact under two different audit categories.

---

## Summary

| Check | Result | Source (confidence) |
|---|---|---|
| Common Crawl domain presence | Not yet crawled — expected for domain age | Common Crawl (0.50) |
| Known client-site backlinks (3 checked) | 3/3 verified, live, dofollow | Verify crawler (0.95) |
| Google Business Profile | Missing | Verify (0.95, absence confirmed via code search) |
| Firmy.cz / directories | Missing | Verify (0.95, absence confirmed via code search) |
| Anchor text diversity | 100% brand (n=3, non-issue at this volume) | Verify crawler (0.95) |
| Technical crawlability for future link/citation discovery | Pass | Cross-ref: sitemap.md |
| Toxic/spam links | None found (no Moz Spam Score available at Tier 0 — not assessed, not claimed clean at scale) | N/A — Tier 0 has no source |

**Backlink Health Score (confidence-weighted 7-factor rubric):** INSUFFICIENT DATA. At Tier 0,
0 of 7 weighted factors (referring domain count, domain quality distribution, anchor text
naturalness at scale, toxic link ratio, link velocity, follow/nofollow ratio at scale, geographic
relevance) have a real discovery data source — `verify_backlinks.py` only confirms 3
pre-identified URLs, it cannot discover the total referring-domain population. Per skill protocol,
no numeric authority score is fabricated here. Validated via
`validate_backlink_report.py` → status `PASS` (1 info note, 0 errors/warnings).

The `SCORE` below is **not** that weighted authority score — it is this audit category's
foundation-readiness grade: is the site technically able to earn and retain links, is what little
backlink footprint exists healthy, and how much of the actionable off-site work is still undone.
For a 14-week-old domain with zero red flags, 3/3 known links verified clean, and full
crawlability already confirmed, the main deduction is simply that citation-building (Finding 3)
hasn't started yet.

SCORE: 34
