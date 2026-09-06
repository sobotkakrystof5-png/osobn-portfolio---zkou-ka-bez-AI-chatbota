# Content Quality Audit — vizeon.cz

Methodology: seo-content skill (Google Sept 2025 QRG framing). Assessed via live fetch
(`render_page.py`, mode=auto, raw HTML + trafilatura `extracted_text`) cross-checked against
local source (`app/web-pro-*/page.tsx`, `components/pillar/MicroServicePage.tsx`,
`lib/data/blog.tsx`, `components/blog/ArticleMeta.tsx`).

**Coverage note:** Homepage (full); 5 web-pro-* pages sampled — `web-pro-truhlare`,
`web-pro-fotografy`, `web-pro-sanace`, `web-pro-realitni-maklere` (all MicroServicePage template)
and `web-pro-ucetni` (custom full-length page) — plus source inspection of all 18 remaining
web-pro-* `page.tsx` files to classify template-vs-custom; all 4 blog articles (live fetch +
source); 12 `/sluzby` pages (live fetch, word count only — not deep-read); `/o-mne`, `/kontakt`,
`/podminky` for E-E-A-T/trust signals. This is sufficient to answer the differentiation question
with confidence; it is not an exhaustive read of every sluzby page's prose.

---

## Verdict: web-pro-* thin/duplicate content — PARTIALLY FIXED

Source inspection of all 19 pages shows only **3 of 18** industry pages
(`web-pro-kadernictvi`, `web-pro-masery-a-wellness`, `web-pro-ucetni`, 245–249 lines each) plus
the `web-pro-remeslniky` hub (300 lines) were rewritten as full custom pages with multiple
sections, internal links, and ~500–800+ words. The remaining **15 of 18** pages
(`truhlare`, `fotografy`, `sanace`, `realitni-maklere`, `autoservisy`, `elektrikare`,
`fitness-trenery`, `instalatery`, `kosmeticky`, `kovare`, `malire`, `rezbare`, `studnare`,
`zahradniky`, `zamecniky`) still render through the shared `MicroServicePage.tsx` template
and land at **323–345 live words** (confirmed via `extracted_text` on 4 of them).

The good news: the content added today to the template (`caseExampleText`, `processSteps`) is
**genuinely trade-specific**, not noun-swapped filler — e.g. truhláři get a kitchen-cabinet order
scenario, sanace gets rising damp/condensation diagnosis, realitní makléři get a house-sale
scenario referencing portál listings. This is real per-trade research, not mail-merge.

The bad news: it is still (a) far under the 800-word service-page floor, and (b) structurally
identical across all 15 — same section order (bullets → CTA → case example → process → FAQ →
related-industries), same word count band, and the same rhetorical device repeated verbatim in
kind across pages (see Finding 3). A quality rater or a competitor could still credibly call
these "thin, same-template" pages; they are measurably less thin than before, but not resolved.

---

## Findings

### Finding 1 — 15 of 18 web-pro-* pages remain under service-page word-count floor
**Severity:** High
**Evidence:** Live word counts (`extracted_text`): `web-pro-truhlare` 343, `web-pro-fotografy`
335, `web-pro-sanace` 345, `web-pro-realitni-maklere` 323 words. Source line counts confirm 14
more pages share the same 75–85-line `MicroServicePage` shape (vs. 245–300 lines for the 3 pages
that got a full rewrite + `web-pro-remeslniky`). All sit at roughly 40–45% of the 800-word service
page minimum in this skill's guidance. Google does not treat word count as a ranking factor
directly, but topical coverage this shallow (3 bullets, 1 case example, 3 process steps, 3 FAQs)
leaves real buyer questions unanswered (pricing ranges beyond one line, timeline specifics beyond
"do 10 dní", what happens if client is unhappy, portfolio proof beyond a single named reference).
**Recommendation:** Prioritize giving the highest-intent trades (řemeslníci sub-niches with real
search volume — truhláři, zámečníci, elektrikáři, instalatéři) the same full-page treatment
already applied to `ucetni`/`kadernictvi`/`masery-a-wellness`, rather than leaving 15 pages on the
thin template indefinitely.

### Finding 2 — Blog articles are 240–333 words, not the 1,500-word target for the format
**Severity:** High
**Evidence:** Live `extracted_text` word counts: `kolik-stoji-tvorba-webu-2026` 333,
`jak-poznat-kvalitni-web-pro-remeslnika` 332, `lokalni-seo-pro-zivnostniky-v-cr` 254,
`google-business-profile-vs-firmy-cz` 240. Source (`lib/data/blog.tsx`) confirms this isn't a
rendering artifact — each post is genuinely 4–5 short paragraphs under 2–3 H2s. Content itself is
accurate and Czech-market-specific (GBP vs. Firmy.cz distinction, NAP consistency, Seznam Mapy
relevance) — this is not hallucinated or generic filler, but it is closer to an extended FAQ
answer than a blog post. Topics like "Lokální SEO pro živnostníky v ČR" could easily sustain
1,500+ words (categories, review-response cadence, citations, GBP posts/Q&A, schema) but currently
cover five one-paragraph subheadings.
**Recommendation:** Either (a) expand each post materially with concrete detail/examples toward
the 1,500-word floor, or (b) if brevity is intentional, relabel these as "guides"/FAQ content
rather than "blog" in the site's own information architecture, since QRG readers and users alike
will judge a labeled blog post against blog-post depth expectations.

### Finding 3 — Repetitive "not X, but Y" rhetorical pattern used as a substitute for depth
**Severity:** Medium
**Evidence:** `grep` across the 5 sampled web-pro-* pages plus `web-pro-remeslniky` found the
contrastive construction ("ne jako…", ", ne …", "není jen…") **30 times**, e.g. "ne jako firemní
prezentace" (fotografy), "ne kolem dlouhého popisu služeb" (malíře), "ne katalog s cenovkami"
(řezbáři), "ne jen kontakt" (řemeslníci hub). Every page's subhead uses this exact device to imply
differentiation. This is a classic AI-writing tic (per this skill's "repetitive structure across
pages" risk marker) — it reads as insight but is actually a templated sentence shape reused with
swapped nouns, which is a more subtle version of the "duplicate content" problem than raw
copy-paste.
**Recommendation:** Vary sentence structure across pages; not every value proposition needs to be
phrased as a negation. Have a human editing pass specifically hunting this pattern before
publishing future micro-pages.

### Finding 4 — Named client testimonials on homepage need owner verification, not just praise
**Severity:** Medium (flag for verification, not a content defect per se)
**Evidence:** Homepage raw HTML (repeated 3x in a carousel, trafilatura correctly dedupes this in
`extracted_text`) shows 3 testimonials attributed to named individuals with linked client domains:
Jiří Bartoň (u-cerhu.cz), Tomáš Kestner (masazekestner.cz), Dominik Schovánek (schovinox.cz), each
displayed with "5,0" next to the name. This is a stronger evidentiary format than anonymous quotes
or "X spokojených klientů" counters (no aggregate-rating schema was found in `structured_data`,
so there's no schema-policy risk from unverified AggregateRating markup) — but per this audit's
constraint, **any testimonial/review content must be flagged for owner verification rather than
assumed genuine**. Confirm: (a) each named person consented to publishing their name + quote, (b)
the "5,0" figure isn't implied to be an aggregate/verified platform rating if it's actually just a
per-testimonial star display, (c) the homepage copy "100 % spokojenost" is a defensible claim
(guarantee of revisions until satisfied) rather than an implied satisfaction survey statistic.
**Recommendation:** No content change needed if testimonials are genuine and consented — just have
the owner confirm consent/authenticity for the record. Consider rewording "100 % spokojenost" to
make clear it describes a revision policy, not a measured satisfaction rate, to avoid an
unverifiable-sounding stat.

### Finding 5 — Founder is not named on the About page itself; credentials are generic
**Severity:** Medium
**Evidence:** `/o-mne` (228 raw words) refers to the founder only as "Zakladatel VIZEON" and
"mladý podnikatel studující v Německu" — no full name, no field of study, no years of experience,
no client/project count, no certifications. The legal name "Kryštof Sobotka" only appears on
`/podminky` (terms page) and in the blog's `BlogPosting` JSON-LD (`author: Kryštof Sobotka`) — it
is not surfaced in the visible UI on `/o-mne`, `/kontakt`, or the footer, and blog posts visibly
show only "VIZEON — Vydavatel" (`components/blog/ArticleMeta.tsx`) rather than the named author
that the same page's schema claims. This is a real Expertise/Authoritativeness gap: the site's
core pitch is "one person, not a faceless agency," but the About page anonymizes that person and
gives no concrete expertise markers a rater or an AI system could cite.
**Recommendation:** Put the founder's full name on `/o-mne` and in the blog byline UI (matching
the schema's `author.name`), and add concrete specifics — years building sites, technologies used,
number of live projects, what "studium v Německu" is actually in (field/university, if the owner
is comfortable disclosing it).

### Finding 6 — `/sluzby` pages are thin relative to the 800-word service-page floor
**Severity:** Medium
**Evidence:** Live word counts across 12 `/sluzby` pages ranged 161–401 words
(`graficke-designy` 161, `technicke-sluzby` 197, `seo-optimalizace/technicke-seo` 209,
`seo-optimalizace` 182, `seo-optimalizace/obsahove-seo` 229, `ai-chatbot` 258,
`systemy-na-miru` 222, `sluzby` hub 286, `tvorba-webovych-stranek` 288,
`seo-optimalizace/audit` 248, `tvorba-webu-pro-firmy` 401, `seo-optimalizace/lokalni-seo` 394 —
the two highest are still under half the 800-word floor). Cross-checked against raw HTML word
count (not just `extracted_text`) to rule out extraction undercounting — counts are consistent.
**Recommendation:** Same prescription as Finding 1: these are the pages most likely to compete for
commercial-intent keywords (e.g. "tvorba webových stránek", "technické SEO") and are currently the
shallowest pages on the domain for that intent tier.

### Finding 7 — Homepage's unique indexable text is thin once carousel duplication is removed
**Severity:** Low
**Evidence:** `extracted_text` for the homepage returns only 153 words because trafilatura
correctly deduplicates the testimonial carousel (which repeats the same 3 quotes 3x in the raw
DOM for an infinite-scroll effect). Manually reconstructing the unique content (hero, guarantee
bullets, 3 testimonials, motto, six one-line section teasers linking to O mně/Služby/Spolupráce/
Projekty/Ceník/ZakazIQ, contact form, footer) totals roughly 500–600 unique words — at, not
comfortably above, this skill's 500-word homepage floor. This is acceptable for a hub/nav-style
homepage whose job is routing to deeper pages, but it means AI crawlers or summarization tools
that respect deduplicated/boilerplate-stripped text will see very little standalone substance on
the homepage itself.
**Recommendation:** No urgent action; if homepage keyword competition requires more, add a short
"what we do differently" paragraph with concrete specifics rather than more teaser links.

### Finding 8 — AI-citation readiness: schema is solid, but there is little to cite
**Severity:** Low/Informational
**Evidence:** Positive: `Service` + `FAQPage` + `BreadcrumbList` JSON-LD present on web-pro-*
pages; `BlogPosting` + `BreadcrumbList` (with `author: Person` and `datePublished`) present on
blog posts, confirmed in both source and rendered `structured_data` output. Negative: with pages
this short, there are few standalone quotable facts/statistics an LLM would extract and cite
(no data points, no cited external sources, no named case studies with outcomes/numbers beyond
price tiers). The content is accurate and specific-to-trade but light on the kind of
citable, standalone facts (stats, named methodology, before/after specifics) that improve AI
Overview/answer-engine citation odds.
**Recommendation:** Once page depth is increased (Findings 1/2/6), prioritize adding genuinely
verifiable, specific facts (e.g., actual turnaround times per package, specific technical choices)
that read as quotable single sentences.

---

## E-E-A-T Breakdown (this skill's internal weighting model)

| Factor | Weight | Score /100 | Notes |
|---|---|---|---|
| Experience | 20% | 40 | Case-example scenarios per trade show applied understanding, but no first-hand "I built X for Y and the result was Z" narrative anywhere sampled; portfolio proof is a handful of named links, not case studies with outcomes. |
| Expertise | 25% | 45 | Trade-specific technical detail is genuinely present (rising damp causes, kitchen-order workflow, GBP vs Firmy.cz mechanics) — better than generic AI filler. Undermined by an anonymized About page with no named, credentialed expert front-and-center (Finding 5). |
| Authoritativeness | 25% | 35 | No external citations, backlinks-in, press mentions, or third-party recognition observed in sampled pages. IČO disclosed (good), but named founder not surfaced where a rater would look first (`/o-mne`). |
| Trustworthiness | 30% | 55 | Real contact channels (email, phone, WhatsApp), IČO in footer, terms/GDPR pages exist, no fabricated stats found, testimonials are named+linked (verification recommended, Finding 4) rather than anonymous. This is the strongest pillar. |

**Weighted E-E-A-T score: ≈ 45/100**

## AI Citation Readiness: 50/100
Schema markup (Service/FAQPage/BreadcrumbList/BlogPosting) is correctly implemented and a genuine
strength. Score is capped by shallow page depth (Findings 1, 2, 6) leaving little unique,
citation-worthy factual content per page.

## Content Depth / Word-Count Compliance: ~30/100
15/18 web-pro-* pages, all 4 blog posts, and most `/sluzby` pages sit well under this skill's
stated floors for their page type.

---

## Summary scoring rationale
Positives: schema implementation, genuine per-trade research (not mail-merge), transparent
contact/legal info, no fabricated statistics detected, testimonials use a verifiable (named+linked)
format. Negatives: majority of both the web-pro-* fleet and 100% of the blog remain well under
this skill's word-count floors; repetitive rhetorical templating across pages; founder
anonymized on the one page (`/o-mne`) meant to establish Expertise/Authoritativeness.

SCORE: 44
