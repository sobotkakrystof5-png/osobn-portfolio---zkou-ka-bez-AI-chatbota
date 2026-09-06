# SXO Audit — vizeon.cz

Method: pages fetched via `render_page.py --mode auto` (homepage, `/web-pro-truhlare`, `/cena-tvorby-webu`, `/sluzby/seo-optimalizace`; `/web-pro-truhlare` also re-rendered with `--mode always`/Playwright to rule out JS-injected media), parsed via `parse_html.py`. SERP backwards-analysis via WebSearch for 4 representative queries covering the four page clusters named in the brief. Site is static-rendered Next.js (`is_spa=False`, `content` == `raw_content` on every page checked) so the raw-fetch data below is what Google's crawler also sees — no rendering-gap risk.

---

## SERP Landscape (backwards analysis)

| Keyword cluster | Target page | Dominant SERP page type (taxonomy) | Consensus | Depth/format norm |
|---|---|---|---|---|
| "tvorba webových stránek na míru pro firmy" | Homepage | **Service Page** (antee.cz, fg.cz, pajskr.cz, webmorava.cz — agency pages with years-in-business, niche specialization call-outs) | ~90% | Established-authority framing ("27 let", "od 2004") |
| "web pro truhláře / tvorba webu" | `/web-pro-truhlare` (+17 sibling `/web-pro-*`) | **Local/Service Page** — direct niche competitors devboys.cz/weby-pro-remeslniky, tvorba-webu.eu/web-pro-remeslniky, kdomiudelaweb.cz build the *identical* "web for craftsmen" page type | ~65-70% (rest generic tool-listicle blogs, low relevance) | Portfolio gallery is explicitly called "the most important part" by a direct competitor; GBP/Maps integration; starting price shown (6 990 Kč) |
| "kolik stojí tvorba webových stránek cena" | `/cena-tvorby-webu` | **Informational pricing guide** (long-form, multi-factor cost tables: page count, freelancer vs. agency, features) | ~60-70% | Deep guides citing full ranges: freelancer 10–45k Kč, agency 50k+ Kč, corporate 100–300k Kč |
| "SEO optimalizace webu cena Google Seznam" | `/sluzby/seo-optimalizace` | Mixed **Service Page** + dedicated **pricing/FAQ pages** (321seo.cz FAQ, dejtonaweb.cz/seo/cena, iuntsevich.cz "od 6 500 Kč") | ~50/50 | Explicit tiered pricing + FAQ schema is the norm |

---

## Findings

### 1. `/web-pro-truhlare` (and by extension the ~17 sibling `/web-pro-*` trade pages) is a content-marketing description of a good craftsman website, not an actual example of one
**Severity: CRITICAL**
**Evidence:** SERP-winning niche competitors (devboys.cz, tvorba-webu.eu/web-pro-remeslniky, kdomiudelaweb.cz) center the page on an actual portfolio gallery and local trust signals. VIZEON's page instead *talks about* a gallery in prose ("Galerie realizací podle typu zakázky", "Detail zpracování na fotkách") but contains **zero `<img>` tags** — confirmed with both the raw fetch and a forced Playwright render (`render_ms 2871`, `is_spa: false`, no `<img>`, no `<picture>`, no `background-image`, no `srcset` anywhere in the DOM). For a page whose entire value proposition is "a website that shows the quality of your work," showing no visuals at all is a direct contradiction of its own H1 ("Web pro truhláře, který **ukáže** kvalitu zpracování").
**Recommendation:** Build the actual demo/portfolio module described in the copy — real or representative project photos in a gallery, before treating this as a finished landing page. Until then this page functions as a blog explainer, not the Service/Local page Google rewards for this query cluster.

### 2. No conversion mechanism on the trade pages — no phone, no WhatsApp, no email, no form, no site navigation
**Severity: CRITICAL**
**Evidence:** `/web-pro-truhlare` has **no `<nav>` element and no `<form>` element** at all (confirmed via grep on rendered HTML). `grep -o 'href="tel:'`, `'mailto:'`, `'wa.me'` all return zero matches — the same searches on the homepage and `/sluzby/seo-optimalizace` correctly return `tel:+420604837333` and `mailto:info@vizeon.cz`. The trade page's only 3 internal links are: home, `/cena-tvorby-webu` ("Podívat se na ceník"), and two sibling trade pages. There is no path from this page to `/kontakt`, and no way to call, WhatsApp, or email directly from the page itself.
**Recommendation:** Add a persistent header/footer (with phone + WhatsApp + `/kontakt` link) to the `/web-pro-*` template, or at minimum a dedicated "Nezávazná poptávka" CTA block with tel:/WhatsApp links matching the rest of the site.

### 3. Price positioning ("od 4 999 Kč") sits far below the SERP-consensus range and creates a trust barrier for the firm-owner comparison persona
**Severity: MEDIUM**
**Evidence:** SERP research for "kolik stojí tvorba webu" surfaces a consistent market range: freelancer 10 000–45 000 Kč, agency-built sites 50 000 Kč+, corporate multi-page sites 100 000–300 000 Kč. VIZEON's homepage meta description and `/cena-tvorby-webu` H1 lead with "od 4 999 Kč" — roughly half the low end of even the freelancer range cited across ranking pages. `/cena-tvorby-webu` is also thin (374 words, 0 images, no H2s — only H3s) versus the multi-factor cost-breakdown tables that dominate the SERP for this query.
**Recommendation:** Either justify the low anchor price explicitly against the market range (e.g., "proč je náš web levnější — bez agenturní režie") or add a "what's included at each price tier" comparison table matching the depth of ranking pricing guides, so it reads as transparent rather than suspiciously cheap.

### 4. `/sluzby/seo-optimalizace` is thin relative to what ranks for its own keyword
**Severity: HIGH**
**Evidence:** Page is 193 words total across 5 H2 sections (~38 words/section), zero H3 subheadings, zero images. Competing pages for "SEO optimalizace webu cena" (321seo.cz FAQ, dejtonaweb.cz/seo/cena, iuntsevich.cz) use explicit tiered pricing tables and FAQPage schema to answer the cost question directly. VIZEON's page does have `Service` and `BreadcrumbList` schema but no `FAQPage`, despite having an H2 titled "Kolik stojí SEO optimalizace" that is exactly the kind of question FAQ schema is built for.
**Recommendation:** Expand each of the 5 sections (audit, local SEO, content SEO, technical SEO, pricing) to genuine depth and add `FAQPage` schema around the pricing question, mirroring what `/web-pro-truhlare` already does correctly.

### 5. Primary H1 text is rendered without word spaces (technical/accessibility defect, homepage)
**Severity: LOW**
**Evidence:** Parsed H1 on the homepage: `"Webprofirmu,kterýspojujemodernídesignaSEOoptimalizaci"` — words concatenated with no whitespace, from `parse_html.py`'s `get_text(strip=True)` on what is almost certainly a per-word animated `<span>` reveal component with no textual space between spans. This degrades screen-reader output and any tooling (including Google's own text extraction) that relies on `get_text()`-style parsing of the primary heading.
**Recommendation:** Insert a literal space or `&nbsp;` between word-wrapping spans in the animated H1 component so plain-text extraction reads correctly.

### 6. Generic ProfessionalService/Organization/WebSite schema is identical across every page sampled — no page-specific differentiation on 2 of 4 pages
**Severity: MEDIUM**
**Evidence:** All 4 pages checked carry the same global `ProfessionalService`, `Organization`, `WebSite` blocks. `/web-pro-truhlare` correctly layers on `Service`, `BreadcrumbList`, and `FAQPage` schema for its specific content. `/cena-tvorby-webu` adds only `BreadcrumbList` (no `Service` or pricing-relevant schema despite being a pricing page). `/sluzby/seo-optimalizace` adds `Service` and `BreadcrumbList` but no `FAQPage`.
**Recommendation:** Apply the `/web-pro-truhlare` schema pattern (Service + FAQPage) consistently to `/cena-tvorby-webu` and `/sluzby/seo-optimalizace`.

---

## User Stories (derived from SERP signals)

1. As a **truhlář (craftsman) researching "web pro truhláře"**, I want to see an actual example of a finished, photo-rich craftsman website, because I only trust what I can see with my own eyes, but I'm blocked by a page with **zero images** that only describes what a gallery *should* look like. *(Source: competitor devboys.cz/tvorba-webu.eu make the portfolio gallery the page's centerpiece; VIZEON's page has no `<img>` tags.)*

2. As the same craftsman, ready to inquire after reading the FAQ, I want to call or WhatsApp immediately from my phone while on a job site, because I don't have time to hunt for a contact page, but I'm blocked by a page with **no nav, no tel:/wa.me link, and no form**. *(Source: grep confirms zero tel/mailto/form/nav elements on `/web-pro-truhlare` vs. present on home and seo pages.)*

3. As a **small-firm owner comparing agencies** (decision stage), I want to sanity-check the price against what I know the market charges, because I don't want to pick an underqualified vendor, but I'm blocked by an "od 4 999 Kč" anchor that reads as roughly half the low end of the freelancer range cited across ranking pricing guides. *(Source: SERP consensus range 10–45k Kč freelancer / 50k+ Kč agency vs. VIZEON's stated price.)*

4. As a **business owner researching "kolik stojí SEO optimalizace"**, I want a clear price breakdown by scope (audit vs. ongoing), because that's how every competing page frames it, but I'm blocked by a single 193-word page with one shallow H2 on pricing and no FAQPage schema to make that answer snippet-eligible. *(Source: 321seo.cz/dejtonaweb.cz FAQ+pricing pages dominate this query.)*

---

## Gap Analysis — SXO Gap Score (0-100, separate from SEO Health Score)

Scored primarily against `/web-pro-truhlare` as the representative sample for the 18-page trade cluster (the largest single page-type footprint on the site), with deltas noted for the other 3 pages.

| Dimension | Score | Evidence |
|---|---|---|
| Page Type (0-15) | 3/15 | Reads as informational/blog explainer where SERP rewards Local/Service page with live portfolio + contact path |
| Content Depth (0-15) | 7/15 | 350 words on trade page is adequate length but zero visual proof; `/sluzby/seo-optimalizace` at 193 words is thinner still |
| UX Signals (0-15) | 2/15 | No nav, no CTA except a pricing link, no form, no tel/WhatsApp on trade page |
| Schema (0-15) | 11/15 | Service + FAQPage present on trade page (good); missing on cena/seo pages |
| Media (0-15) | 0/15 | Confirmed zero images site-wide across all 4 sampled pages, even after forced JS render |
| Authority (0-15) | 5/15 | No named case study, no client name/photo tied to trade-specific FAQ answers; homepage does have a testimonials section |
| Freshness (0-10) | 5/10 | No visible dateModified/last-updated signal on service pages; not independently verifiable from static HTML alone |
| **Total** | **33/100** | |

---

## Persona Scores

| Persona | Journey stage | Relevance | Clarity | Trust | Action | Total | Rating |
|---|---|---|---|---|---|---|---|
| Truhlář searching "web pro truhláře" + cena | Awareness→Consideration | 15/25 | 14/25 | 10/25 | 8/25 | 47/100 | Needs Work |
| Small-firm owner comparing agencies | Consideration→Decision | 18/25 | 18/25 | 12/25 | 18/25 | 66/100 | Good |
| Budget researcher ("kolik stojí web") | Awareness | 18/25 | 14/25 | 10/25 | 16/25 | 58/100 | Needs Work |
| Existing site owner researching SEO cena | Consideration | 18/25 | 10/25 | 8/25 | 16/25 | 52/100 | Needs Work |

**Weakest persona: Truhlář (craftsman), 47/100.** Top issue: page promises visual proof of craftsmanship and instant contact, delivers neither. Fix: add real portfolio images + tel/WhatsApp CTA directly on the page (see Findings 1–2).

---

## Priority Actions

1. Fix Finding 2 (add nav/contact path to all `/web-pro-*` pages) — zero-cost, highest-leverage conversion fix.
2. Fix Finding 1 (add real portfolio imagery to `/web-pro-truhlare` and roll out to sibling trade pages) — addresses the CRITICAL page-type mismatch.
3. Address Finding 3 (price-vs-market trust gap) for the firm-owner and budget personas.
4. Expand `/sluzby/seo-optimalizace` depth + add FAQPage schema (Finding 4/6).
5. Fix H1 spacing defect (Finding 5) — low effort, low risk.

## Cross-Skill Recommendations

- Missing schema on `/cena-tvorby-webu` and `/sluzby/seo-optimalizace` → `/seo schema`
- Thin content on `/sluzby/seo-optimalizace` and the `/web-pro-*` cluster → `/seo page` / `/seo content`
- No physical address / pure remote service model with local-intent competitors in the SERP → `/seo local` to evaluate whether service-area schema or GBP presence could substitute for the missing NAP signals

## Limitations

- Only 4 of the ~24 named target pages were fetched/parsed directly (homepage, `/web-pro-truhlare`, `/cena-tvorby-webu`, `/sluzby/seo-optimalizace`); the other 17 `/web-pro-*` trade pages and the 4 blog articles were not individually fetched — findings on the trade-page template (Findings 1, 2) are inferred to generalize across siblings based on shared template structure but were not verified page-by-page.
- SERP analysis used WebSearch (not DataForSEO), which does not expose PAA boxes, ad copy, or featured-snippet formatting directly — page-type consensus and pricing benchmarks were inferred from ranking page content rather than live SERP feature capture.
- No Google Search Console / analytics data available — cannot confirm actual current rankings or click-through behavior, only structural/content alignment vs. what ranks.
- Freshness dimension could not be verified against actual last-modified dates (no `dateModified` schema exposed on sampled pages).

SCORE: 33
