# GEO / AI Search Readiness Audit — vizeon.cz

Date: 2026-09-05
Scope: robots.txt / AI crawler access, llms.txt, passage-level citability (home, /faq, blog articles), authority signals, technical accessibility (SSR/CSR), brand-mention outlook.
Context: domain registered 2026-05-26 (~14 weeks old), effectively zero backlinks/citations, Czech-language "tvorba webu" niche (competitive).

---

## 1. AI crawlers are explicitly allowed — no robots.txt or header-level blocks

**Severity:** Info (positive finding)

**Evidence:**
- Live `https://vizeon.cz/robots.txt` (verified via direct fetch, HTTP 200):
  ```
  User-Agent: *
  Allow: /
  Disallow: /api/

  Sitemap: https://vizeon.cz/sitemap.xml
  ```
  Generated from `app/robots.ts` — a single wildcard `*` rule, no crawler-specific `Disallow` entries. This implicitly allows GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, anthropic-ai, cohere-ai, Bytespider — everything.
- Homepage response: `meta name="robots" content="index, follow"`, `meta name="googlebot" content="max-image..."` — no `noindex`/`nosnippet`/`max-snippet:0` restricting AI Overviews or snippet-based citation.
- No `X-Robots-Tag` header on homepage or blog pages (checked response headers).
- `middleware.ts` and `next.config.mjs` contain no user-agent filtering, bot-blocking, or Cloudflare-style challenge logic that would 403 known AI crawler UAs.
- `X-Nextjs-Prerender: 1` on homepage confirms content is statically prerendered/SSR — no JS execution needed to see it.

**Recommendation:** No action required for crawl access. Optional: if the site ever wants to permit AI **search/citation** crawlers but opt out of **training**, add explicit `Disallow` rules for `CCBot`, `anthropic-ai`, `cohere-ai`, `Bytespider` while keeping wildcard `Allow` (or explicit allows) for `GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`, `Google-Extended`. This is a policy choice, not a fix — current config already favors maximum visibility, which is the right default for a 14-week-old domain trying to get indexed/cited anywhere.

---

## 2. `/llms.txt` is missing (confirmed 404, correctly served)

**Severity:** Low

**Evidence:** Live fetch of `https://vizeon.cz/llms.txt` returns HTTP 404 with Next.js's custom not-found page (`meta name="robots" content="noindex"`, title "Stránka nenalezena | VIZEON"). No file exists at `public/llms.txt` or via a route handler in the repo.

**Recommendation:** Low priority. Per current primary-source guidance (Google's AI optimization docs, 2026), `llms.txt` is explicitly **not used by Google Search** and has no measured ranking/citation effect for major engines (confirmed by independent server-log audits). It may be read by some non-Google AI agents/crawlers as a convenience index. Given the domain's near-zero authority right now, this is not a lever worth spending effort on before the higher-impact items below — treat as a same-day, near-zero-effort add only if/when doing other root-file maintenance:
```
# VIZEON
> Tvorba webu na míru pro firmy a živnostníky v ČR — moderní design, SEO optimalizace, transparentní ceník.

## Hlavní stránky
- [Domů](https://vizeon.cz/): Přehled služeb a přístupu
- [Ceník tvorby webu](https://vizeon.cz/cena-tvorby-webu): Transparentní ceny (Micro Page, Online Vizitka, Promo Page, Pro Web, Web Care)
- [FAQ](https://vizeon.cz/faq): Odpovědi na časté dotazy
- [Blog](https://vizeon.cz/blog): Články o tvorbě webu a SEO
- [O mně](https://vizeon.cz/o-mne): Autor a přístup k práci
- [Kontakt](https://vizeon.cz/kontakt): Kontaktní údaje
```
Do not present this as a citation-ranking fix in any client-facing summary — it is hygiene, not growth.

---

## 3. FAQ page: only 1 of 9 answers exists as visible/extractable body text — the rest live only inside JSON-LD

**Severity:** High

**Evidence:**
- `components/FAQ.tsx` is a client component (`"use client"`) built as an accordion with React state: `const [openIndex, setOpenIndex] = useState<number | null>(0)`. Each answer paragraph is gated by `{isOpen && (<motion.div>...<p>{faq.answer}</p>...</motion.div>)}` — a **conditional React render**, not a CSS-hidden element. Only the first FAQ item (`openIndex === 0`) renders its `<p>` answer into the DOM/HTML at all; the other 8 answer paragraphs are simply absent from the markup until a user clicks.
- Verified directly against the live SSR HTML (`https://vizeon.cz/faq`, raw fetch, no JS execution): all 9 question strings appear in the HTML (they're always-visible button labels), but of the 9 answer strings, only the first ("Záleží na rozsahu. Micro Page do 2 pracovních dní...") appears **outside** `<script>` tags. The remaining 8 answers (e.g. "Konzultace → Návrh → Vaše zpětná vazba...", "Nástroje AI používám jako pomocníka...", "Design, kód, mobilní verze, základní SEO...") appear **only inside** the `FAQPage` JSON-LD `<script type="application/ld+json">` block, never in the readable page body.
- Consistent with this: trafilatura's boilerplate-stripped `extracted_text` for `/faq` is only 329 characters / ~40 words — a single Q&A pair — versus the full 9-item FAQ content that exists in the data layer (`lib/data/faq.ts`).
- The `FAQPage` schema itself is well-formed and complete (all 9 Q&A pairs, correct `@type: Question`/`Answer` structure) — this is a genuine asset, but schema-only content is a second-class citation source compared to readable prose for most AI-search passage-extraction pipelines (which largely mirror readability/boilerplate-stripping algorithms, not schema parsers).

**Recommendation:** Render all FAQ answers into the DOM by default (e.g., all `<p>` answer elements always present, with CSS `max-height`/`overflow-hidden` + `aria-hidden` toggling for the accordion visual effect, rather than a JS-conditional render). This is the single highest-leverage citability fix on the site: it takes a page that already has correct FAQPage schema and makes 8 additional self-contained, question-based answer blocks (several already close to good citation length once combined with the question) actually extractable by any crawler or algorithm that reads visible text rather than parsing JSON-LD. Effort: small (a few hours — swap the conditional render for a CSS-based collapse in `components/FAQ.tsx`).

---

## 4. Blog articles are well-structured for citability, with genuine authority signals — but only 4 articles exist and none carry a `dateModified`/freshness signal

**Severity:** Medium

**Evidence:**
- Checked two live articles (`/blog/kolik-stoji-tvorba-webu-2026`, `/blog/lokalni-seo-pro-zivnostniky-v-cr`): both are plain SSR HTML (`is_spa: false`, `mode_used: raw`, HTTP 200), fully readable without JS.
- Both open with a direct, self-contained answer in the first 1-3 sentences (e.g. "Cena za tvorbu webu se v roce 2026 pohybuje v širokém rozmezí a záleží na tom, co od stránek očekáváte...").
- Both use short, statement-style H2 sections ("Co cenu ovlivňuje nejvíc", "Proč se kvalitní web vyplatí", "Google Business Profile jako základ", "V Česku nestačí jen Google") — good structural readability, though **none are phrased as questions**, which is a missed match against how AI search rephrases user queries.
- Section lengths run ~60-120 words per block — under the 134-167 word optimal-citation window identified in citation studies; sections are citable but slightly short/thin rather than being full self-contained passages.
- Real `Article` JSON-LD present with `datePublished` (`2026-09-01`, `2026-09-02`), `author: {"@type":"Person","name":"Kryštof Sobotka"}`, `publisher: {"@type":"Organization","name":"VIZEON"}` — genuine named authorship, not anonymous.
- Visible (non-schema) byline confirmed in `components/blog/ArticleMeta.tsx`: renders a "VIZEON" logo link to homepage, "Vydavatel" label, and "Vydáno [den. měsíc rok] · N min čtení" — real E-E-A-T signal a reader (and a boilerplate-stripping crawler) actually sees, not just schema noise.
- No `dateModified` field anywhere in the Article schema. All 4 posts are brand-new (published 2026-09-01/02, per `lib/data/blog.tsx`), so recency is currently a strength by default — but there's no mechanism yet to signal updates once the 3-month "freshness" window (cited as ~3x citation-likelihood advantage in the skill's reference data) starts closing.
- Only 4 blog posts exist total: `kolik-stoji-tvorba-webu-2026`, `jak-poznat-kvalitni-web-pro-remeslnika`, `lokalni-seo-pro-zivnostniky-v-cr`, `google-business-profile-vs-firmy-cz`. Thin content depth limits the number of distinct queries the site can realistically get cited for right now.

**Recommendation:**
1. Rephrase a subset of H2s as questions where it fits naturally ("Co cenu tvorby webu nejvíc ovlivňuje?" instead of "Co cenu ovlivňuje nejvíc") — low effort, do on next content pass.
2. Add `dateModified` to the `Article` schema and wire it to actually update on edits (even minor ones) — sets up the freshness-refresh cadence before it becomes a problem in 3 months. Small effort.
3. Treat 4 articles as a start, not a library — plan a steady publishing cadence (per existing blog conventions already in project memory) rather than a one-time burst, since AI citation pools reward breadth of self-contained answer pages over a single strong page.

---

## 5. Brand-mention / off-site authority signals are effectively zero — expected and unavoidable at this stage, not a bug to "fix"

**Severity:** Info / expectation-setting

**Evidence:**
- Domain registered 2026-05-26 — approximately 14 weeks old at time of audit.
- No prior backlink or citation history available; a brand this young has had no realistic window to accumulate Wikipedia presence, Reddit discussion, YouTube mentions, or LinkedIn company-page authority — the signals shown in the skill's own correlation table (YouTube ~0.737, Reddit high, Wikipedia high, Domain Rating only ~0.266) as the strongest predictors of AI-citation likelihood.
- Domain Rating (backlinks) is the *weakest* of these correlated signals anyway, and it's also the one hardest to fake/rush — so its absence here matters less than the complete absence of brand mentions on Reddit/YouTube, which compound over time and can't be bought.
- "Kryštof Sobotka" / "VIZEON" as an entity has no independent third-party presence yet (no Wikipedia/Wikidata entry, no evidence found of Reddit or YouTube mentions, LinkedIn presence not verified in this audit).

**Recommendation (expectations, not a fix):**
- Do not promise near-term AI Overview / ChatGPT / Perplexity citations for competitive "tvorba webu" queries — with zero brand mentions and a 14-week-old domain in a saturated Czech niche, realistic expectation is **no measurable AI-citation visibility for at least 6-12 months**, even with the on-page fixes above in place. On-page GEO work (items 1-4) is necessary but not sufficient; it makes the site *citable* once it has authority, it does not manufacture authority.
- The highest-leverage moves available to a young single-operator brand are off-site, not on-page: get "VIZEON" or "Kryštof Sobotka" mentioned by name on Reddit (e.g. r/czech, r/CzechRepublic freelance/business threads, answering real questions honestly rather than dropping links) and build even a small YouTube presence (process videos, client walk-throughs) — these correlate far more strongly with AI citation than any technical GEO fix, per the skill's own cited data (Ahrefs 75k-brand study).
- Treat this as a 6-12 month build, run in parallel with the on-page fixes, not a switch that gets flipped by fixing the FAQ page.

---

## Platform-specific outlook (qualitative, no live query-testing performed — DataForSEO MCP tools were not available in this session)

| Platform | Outlook | Why |
|---|---|---|
| Google AI Overviews | Low near-term | Requires ranking well in classic Search first; brand-new domain has no ranking history yet |
| Google AI Mode | Low near-term, slightly better mid-term | Broader citation pool than AIO and rewards freshness/entity authority more than raw position — the new blog content is a better fit here once indexed and aged |
| ChatGPT (web search) | Very low near-term | Heavily weighted toward Wikipedia (47.9%) and Reddit (11.3%) mentions per skill reference data — neither exists yet for this brand |
| Perplexity | Very low near-term | Weighted toward Reddit (46.7%) and Wikipedia — same gap as ChatGPT |
| Bing Copilot | Low near-term | Depends on Bing index maturity; also benefits from IndexNow submission once content volume grows |

---

## GEO Health Score

| Dimension | Weight | Score (0-100) | Weighted |
|---|---|---|---|
| Citability | 25% | 55 | 13.75 |
| Structural Readability | 20% | 70 | 14.0 |
| Multi-Modal Content | 15% | 40 | 6.0 |
| Authority & Brand Signals | 20% | 25 | 5.0 |
| Technical Accessibility | 20% | 90 | 18.0 |

**Rationale for sub-scores:**
- **Citability (55/100):** Blog articles open with direct answers and are self-contained; FAQ content is severely undercut by the 8-of-9-answers-hidden issue (finding #3). Section lengths are shorter than the 134-167 word optimum.
- **Structural Readability (70/100):** Clean H1→H2 hierarchy, short paragraphs, real FAQPage/Article schema, price table on blog. Docked for statement-style (not question-style) H2s and thin FAQ page-level heading structure.
- **Multi-Modal Content (40/100):** Text-first site; no evidence of embedded video, infographics, or interactive calculators found in the pages checked (only static images/OG images). Pricing table on the pricing blog post is a positive multi-modal-adjacent element.
- **Authority & Brand Signals (25/100):** Named author + publisher schema and visible byline are genuine positives (this would score near-zero without them), but zero external brand-mention footprint (Wikipedia/Reddit/YouTube/LinkedIn) and a 14-week-old domain cap this dimension hard regardless of on-page work.
- **Technical Accessibility (90/100):** Fully SSR/prerendered, robots.txt open to all AI crawlers, no meta-robots or header-level blocks, no bot-filtering middleware. Only deduction: llms.txt absent (low-weight per current Google guidance) and the FAQ accordion's JS-gated rendering is a technical accessibility issue in addition to a citability one.

**Weighted total ≈ 56.75, rounded to 57.**

SCORE: 57
