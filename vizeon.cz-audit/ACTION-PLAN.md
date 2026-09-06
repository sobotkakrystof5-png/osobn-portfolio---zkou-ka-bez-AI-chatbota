# Action Plan — vizeon.cz SEO Audit (2026-09-05)

Ordered by real-world impact. Each item tags its source file(s). Items marked **[MANUAL]** are off-code tasks the user handles themselves, not something to implement automatically.

---

## Phase 1: Critical Fixes (this week)

1. **Add a conversion path to all 19 `/web-pro-*` pages** — `tel:+420604837333`, WhatsApp link, `mailto:info@vizeon.cz`, and a link to `/kontakt`, at minimum in a persistent header/footer on `components/pillar/MicroServicePage.tsx` (covers 15 pages) plus the 4 custom pages. Currently these pages have no nav, no form, no contact link at all.
   *Source: sxo.md Finding 2. Effort: small. Impact: highest-leverage conversion fix in this audit.*

2. **Fix `MicroServicePage.tsx`'s `hubHref` default** from `/web-pro-remeslniky` to `/tvorba-webu-pro-zivnostniky` (the real pillar), and remove the `"/"` (homepage) override on the 5 pages that currently skip the hub entirely (autoservisy, fotografy, fitness-trenery, realitni-maklere, kosmeticky).
   *Source: cluster.md Finding 1. Effort: small (one prop default + 5 overrides). Impact: fixes the backbone of today's "interní prolinkování" commit.*

3. **Split the ~500KB shared JS chunk** (`_next/static/chunks/0tvp1gn28not7.js`, 64-82% unused per route) — run `next build` with bundle analyzer, move non-critical/below-fold components (chat widget, carousel/animation libs) to `next/dynamic` lazy imports. This is the single largest lever on homepage LCP (5.9s → target ≤2.5s).
   *Source: performance.md Findings 1-2. Effort: medium. Impact: biggest performance win available.*

4. **Add real portfolio images to `/web-pro-truhlare`** (and roll the pattern out to sibling trade pages as time allows) — the page's own copy promises a gallery that doesn't exist anywhere in the DOM, even after JS execution.
   *Source: sxo.md Finding 1. Effort: medium (needs real/representative photos). Impact: fixes the page-type mismatch that's likely suppressing rankings for the whole trade-page cluster.*

---

## Phase 2: High-Impact Improvements (weeks 2-3)

5. **Switch the FAQ accordion (`components/FAQ.tsx`) from conditional React rendering to CSS-based collapse** so all 9 answers exist in the DOM by default (currently only 1 of 9 is rendered; the rest exist only inside JSON-LD). Highest-leverage GEO/citability fix in the whole audit.
   *Source: geo.md Finding 3. Effort: small (few hours).*

6. **Expand the pillar page (`app/tvorba-webu-pro-zivnostniky/page.tsx`)** to link out to all 19 trades, not just 4 — grouped by the existing cluster pattern (craft/trade, beauty/wellness, professional services, etc.).
   *Source: cluster.md Finding 2.*

7. **Fix `web-pro-autoservisy`'s orphan status** — add it to `relatedSlugs` on `web-pro-instalatery`/`web-pro-elektrikare` (reciprocal, since they already link out to it) and point its `hubHref` at the pillar.
   *Source: cluster.md Finding 3.*

8. **Investigate and fix the `www.vizeon.cz` non-redirect** — `vercel.json` defines a 301 to apex but live `curl -I https://www.vizeon.cz/` returns 200, not a redirect. Check Vercel dashboard → Project → Settings → Domains; `www` is likely attached as a second production alias rather than a redirect target. **This is a dashboard/config fix, not a code change.**
   *Source: technical.md, cross-confirmed by sitemap.md.*

9. **Remove `/gdpr` and `/podminky` from `app/sitemap.ts`** — both correctly serve `noindex` but remain listed, sending a contradictory signal. Use `/admin`/`/admin-setup` (already excluded correctly) as the template.
   *Source: sitemap.md Finding 1, technical.md.*

10. **Give the highest-intent trade pages a full rewrite** (same treatment already applied to kadeřnictví/masáže/účetní) — prioritize truhláři, zámečníci, elektrikáři, instalatéři. 15 of 18 pages are still at 323-345 words vs. the 800-word floor.
    *Source: content.md Finding 1.*

11. **Expand `/sluzby/seo-optimalizace`** (currently 193 words, 5 shallow H2s) and add `FAQPage` schema around its pricing question, mirroring what `/web-pro-truhlare` already does correctly.
    *Source: sxo.md Finding 4.*

---

## Phase 3: Content & Authority (month 2)

12. **Expand all 4 blog articles** toward genuine blog depth (currently 240-333 words vs. a 1,500-word target for the topics chosen) — or relabel them as "guides"/FAQ content if brevity is intentional.
    *Source: content.md Finding 2.*

13. **Name the founder on `/o-mne`** and match the blog byline UI to the schema's `author.name` (currently "Zakladatel VIZEON" with no name, while blog schema already says "Kryštof Sobotka"). Add concrete specifics: years building sites, technologies, project count.
    *Source: content.md Finding 5.*

14. **Verify testimonial authenticity/consent** for the 3 named homepage testimonials (Jiří Bartoň/u-cerhu.cz, Tomáš Kestner/masazekestner.cz, Dominik Schovánek/schovinox.cz) — format is already stronger than typical fake-review patterns (named, linked, real client domains), just confirm consent for the record. Consider rewording "100 % spokojenost" to clarify it's a revision-guarantee policy, not a satisfaction statistic.
    *Source: content.md Finding 4.*

15. **Schema cleanup** (all safe, no fabricated data): consolidate `Organization`/`ProfessionalService` into one linked `@id` node in `app/layout.tsx`; add `image`/`mainEntityOfPage`/`author.url` to the `BlogPosting` template using the already-existing per-post OG image; replace `Organization.logo` (currently the 32×32 favicon) with a real ≥112×112px square logo once a design asset exists.
    *Source: schema.md Findings 1-3.*

16. **Add Content-Security-Policy header** in `next.config.mjs` `headers()` — defense-in-depth, not an active exploit.
    *Source: technical.md.*

17. **Fix the homepage H1 word-spacing bug** — the animated per-word `<span>` reveal component concatenates words with no whitespace ("Webprofirmu,kterýspojuje..."), degrading screen-reader and text-extraction output.
    *Source: sxo.md Finding 5 (independently reproduced during audit setup).*

18. **Fix mobile homepage splash blocking H1/CTA/nav** — cap the intro animation to <800ms with `prefers-reduced-motion` support, or restructure so the hero renders immediately underneath/before the animation layer.
    *Source: visual.md Finding 1.*

19. **Fix cookie-banner overlap on mobile** — currently covers the `/kontakt` submit button and body copy on `/web-pro-truhlare`.
    *Source: visual.md Finding 2.*

20. **Re-title the homepage** to stop competing with `/sluzby/tvorba-webovych-stranek` and `/sluzby/tvorba-webu-pro-firmy` for the same primary keywords — let those two pages own their respective phrases.
    *Source: cluster.md Finding 6.*

21. **Add the missing reciprocal link** from `/cena-tvorby-webu` back to `/blog/kolik-stoji-tvorba-webu-2026` (currently one-way).
    *Source: cluster.md Finding 7.*

---

## Phase 4: Monitoring & Iteration (ongoing)

22. Rebalance internal links so no trade-page spoke depends on a single inbound path (8 spokes currently below the 3-link minimum) — see the link matrix in `findings/cluster.md`.
23. Fix render-blocking CSS and the two non-composited animations (shimmer text, glow-pulse button) — secondary performance items after the JS bundle split.
24. Trim the 4 over-long title tags / meta descriptions; pad the shortest `web-pro-*` meta descriptions.
25. Implement IndexNow (cheap, speeds up Bing/Yandex indexing given the site's active publishing cadence).
26. Monitor the `/web-pro-*` template pattern as it scales — currently genuinely differentiated (not duplicate), but don't multiply by city without a hard content-uniqueness plan (would recreate the doorway-page pattern).
27. Add `dateModified` to blog `Article` schema once posts actually get edited (don't fabricate it now).

---

## [MANUAL] Off-Site / Non-Code Checklist

These are explicitly **not** code changes — the user handles these directly:

1. **Google Business Profile** (business.google.com, free, ~15-20 min) — the single highest-leverage off-site item. Service-area business, no public address required.
2. **Firmy.cz** listing (Seznam) — same NAP details as GBP; matters specifically for the Czech market.
3. A handful of Czech business directories (firmy.cz, edb.cz, zlatestranky.cz, najisto.centrum.cz) — a few, not dozens.
4. Chamber-of-commerce/freelancer-association listing, only if membership already exists or is being considered anyway.
5. Confirm with the 3 existing linked clients (schovinox.cz, u-cerhu.cz, masazekestner.cz) that credit links can stay long-term; make footer credit links a standard line item in future delivery contracts.
6. Guest posts/collabs within the trade niches VIZEON actually serves (not generic guest-post sites).
7. Check Google Search Console → Links report every few weeks (already verified/unlocked, free).
8. Once GBP exists: add its Google Maps URL to the `sameAs` array in `app/layout.tsx` (the TODO comment already marks exactly where) — this is a one-line code change to make *after* the GBP profile is live, not before.
9. Decide whether to publish a city-level `PostalAddress` in the `ProfessionalService` schema (needed for exact NAP matching once GBP/directories exist) — a business decision, not a technical one.
10. Realistic expectation setting: no measurable AI-citation visibility (ChatGPT/Perplexity/AI Overviews) for 6-12 months regardless of on-page fixes — brand-mention building (Reddit, YouTube) matters more here than any technical GEO change at this domain age.

---

*Full findings and evidence for every item above: `findings/*.md`. Screenshots: `screenshots/`.*
