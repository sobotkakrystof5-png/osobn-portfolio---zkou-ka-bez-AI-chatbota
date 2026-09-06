# Semantic Cluster & Content Architecture Audit — vizeon.cz

Scope: hub-and-spoke mapping of the 19 `web-pro-*` trade pages, cannibalization risk
across "tvorba webu" positioning pages, blog↔page internal-link verification, and
keyword cluster gap analysis. Based on direct source inspection (`app/`, `components/`,
`lib/data/`) rather than external SERP-overlap fetches — see note under Finding 6.

---

## Finding 1 — Spoke pages link back to a sibling spoke, not the intended pillar
**Severity: High**

`components/pillar/MicroServicePage.tsx` (used by 15 of the 19 `web-pro-*` pages) has
`hubHref = "/web-pro-remeslniky"` as its **default** prop, not
`/tvorba-webu-pro-zivnostniky`. Only 5 pages override it — and they override it to `"/"`
(homepage), not to the pillar either:

- Default → `/web-pro-remeslniky` (a sibling spoke): `elektrikare`, `instalatery`,
  `kovare`, `malire`, `rezbare`, `sanace`, `studnare`, `truhlare`, `zahradniky`,
  `zamecniky` (10 pages)
- Overridden → `/` (homepage): `autoservisy`, `fotografy`, `fitness-trenery`,
  `realitni-maklere`, `kosmeticky` (5 pages)
- Built outside `MicroServicePage` with a direct link to the real pillar:
  `kadernictvi`, `masery-a-wellness`, `ucetni`, `remeslniky` (4 pages)

Result: `web-pro-remeslniky` has accidentally become a second, unintended "hub" that
15 other spokes point back to, while the actual pillar (`/tvorba-webu-pro-zivnostniky`)
only receives a back-link from 4 of 19 spokes. This is architecturally the opposite of
hub-and-spoke — it's a spoke acting as a hub for other spokes, with the real pillar sitting
one hop further out.

**Recommendation:** Change the `MicroServicePage` default to
`hubHref="/tvorba-webu-pro-zivnostniky"` and remove the `"/"` overrides on the 5 pages
that currently skip the hub entirely. Keep a secondary contextual link to
`web-pro-remeslniky` inline in body copy for the trades that are genuinely
"řemeslo" (truhláři, zámečníci, kováři, řezbáři, malíři, sanace, zahradníci) if desired,
but the mandatory pillar back-link must go to the actual pillar.

---

## Finding 2 — Pillar page (`/tvorba-webu-pro-zivnostniky`) links to only 4 of 19 spokes
**Severity: High**

The pillar's "Web na míru podle vašeho oboru" section (`obory` array in
`app/tvorba-webu-pro-zivnostniky/page.tsx`) hard-codes exactly 4 categories, each
linking to one spoke: `web-pro-remeslniky`, `web-pro-kadernictvi`, `web-pro-ucetni`,
`web-pro-masery-a-wellness`. The other 15 spokes — `truhlare`, `zamecniky`, `kovare`,
`rezbare`, `instalatery`, `elektrikare`, `fotografy`, `kosmeticky`, `fitness-trenery`,
`realitni-maklere`, `autoservisy`, `zahradniky`, `studnare`, `malire`, `sanace` — are
never mentioned on the pillar page at all, despite the pillar's own meta description
claiming to cover "řemeslníky, kadeřnictví, účetní i masérky" as if that were the full
set. This violates the mandatory "pillar links to every spoke" rule from the hub-spoke
architecture and means most of the recently-expanded content (per the "interní
prolinkování" commit) is invisible from the one page designed to be its entry point.

**Recommendation:** Expand the `obory` section (or add a simple linked grid/index) on
the pillar so all 19 trades are reachable in one click, grouped by the existing spoke
clusters (see link matrix below).

---

## Finding 3 — `web-pro-autoservisy` is a true orphan page
**Severity: High**

`grep` across `app/`, `components/`, `lib/` for `web-pro-autoservisy` returns matches
only in `app/sitemap.ts`, `lib/data/industries.ts` (a data record, not a rendered link),
and the page's own metadata/self-canonical. **No other page on the site links to it** —
not the pillar, not `/sluzby`, not any of its own `relatedSlugs` targets
(`instalatery`, `elektrikare`, `zamecniky` link out from `autoservisy`, but none of them
link back to it), and its `hubHref` override sends its only structural back-link to `/`
instead of the pillar. The only path Google has to this URL is crawling `sitemap.xml`
directly.

**Recommendation:** Add `web-pro-autoservisy` to at least one `relatedSlugs` array on a
sibling trade page (e.g. add it to `web-pro-instalatery` and `web-pro-elektrikare`'s
related lists, since it's already listed as their outbound related industry — make it
reciprocal) and fix its `hubHref` to point to the pillar.

---

## Finding 4 — Multiple spokes fall below the 3-incoming-link minimum
**Severity: Medium**

Counting all contextual (non-nav, non-sitemap) inbound links site-wide:

| Spoke | Inbound contextual links | Status |
|---|---|---|
| `web-pro-autoservisy` | 0 | Orphan (Finding 3) |
| `web-pro-fotografy` | 1 (from `realitni-maklere` only) | Below minimum |
| `web-pro-malire` | 2 | Below minimum |
| `web-pro-zahradniky` | 2 | Below minimum |
| `web-pro-rezbare` | 2 | Below minimum |
| `web-pro-kovare` | 2 | Below minimum |
| `web-pro-realitni-maklere` | 2 | Below minimum |
| `web-pro-studnare` | 2 | Below minimum |
| `web-pro-truhlare` | 3 | At minimum |
| `web-pro-instalatery`, `elektrikare`, `kosmeticky`, `fitness-trenery`, `sanace` | 3–4 | OK |
| `web-pro-kadernictvi`, `web-pro-ucetni`, `web-pro-masery-a-wellness` | 4–5 (incl. pillar + `/sluzby` subpages) | OK |
| `web-pro-remeslniky` | 8+ (pillar, 4 `/sluzby` subpages, blog post, 8 spokes) | Over-linked relative to peers |

**Recommendation:** Rebalance — the `RelatedIndustries` cross-link groups were built as
isolated 3-page cliques (e.g. truhláři↔řezbáři↔kováři↔zámečníci forms a near-closed
loop that rarely reaches outward). Add 1 extra cross-link per under-linked page so no
spoke depends on a single inbound path, and reduce `web-pro-remeslniky`'s share since it
already exceeds the pillar's own inbound count.

---

## Finding 5 — No path to the trade cluster from global navigation or homepage
**Severity: Medium**

`lib/nav.ts` (single source for `Navbar`/`Footer`) contains no entry for
`/tvorba-webu-pro-zivnostniky` or any `web-pro-*` page — nav only exposes `/sluzby`,
`/cena-tvorby-webu`, `/o-mne`, `/spoluprace`, `/ukazky-webu`, `/zakaziq`, `/blog`,
`/faq`, `/kontakt`. The homepage (`app/page.tsx` → `Hero`, `HomeExplore`, etc.) does not
link to the pillar or any spoke either. This is acceptable for 19 individual trade pages
(a nav with 19 extra items would be unusable), but the **pillar** page — the one page
meant to aggregate them — should be reachable from primary navigation or the homepage.
Right now the entire 20-page trade cluster depends on `sitemap.xml` plus the thin
cross-link web documented above for discovery and link-equity flow.

**Recommendation:** Add `/tvorba-webu-pro-zivnostniky` to `NAV_LINKS` (e.g. under
"Služby" as a dropdown item, or replace/augment "Projekty") or link to it prominently
from `HomeExplore` on the homepage.

---

## Finding 6 — Cannibalization risk: three pages compete for "tvorba webových stránek" / "web pro firmu"
**Severity: Medium**

Note on method: classic SERP-overlap pairwise fetching (per `serp-overlap-methodology.md`)
compares top-10 organic results across the open web — it is only diagnostic once a
site is actually ranking. At ~14 weeks old with near-zero backlinks, vizeon.cz's pages
are not yet ranking distinctly enough for that comparison to be meaningful; on-page
primary-keyword collision is the more actionable signal at this stage, so that's what
this finding is based on.

- Homepage title: *"Tvorba webových stránek | Web pro firmu a SEO optimalizace webu – VIZEON"*
- `/sluzby/tvorba-webovych-stranek` title: *"Tvorba webových stránek na míru — vizitka, promo stránka i plnohodnotný web"*
- `/sluzby/tvorba-webu-pro-firmy` title: *"Tvorba webu pro firmy na míru"*

The homepage title tag independently stacks both of the other two pages' primary
phrases ("tvorba webových stránek" + "web pro firmu"), rather than differentiating as a
brand/navigational page. Google will have a hard time deciding which of the three to
rank for a bare "tvorba webových stránek" query, and internal link equity is split
between them with no clear signal of which is canonical for that phrase.
`/tvorba-webu-pro-zivnostniky` and `/sluzby` itself are fine — differentiated enough
(process-angle and hub-angle respectively).

**Recommendation:** Re-title the homepage around brand + differentiator (e.g. "VIZEON —
weby na míru pro živnostníky a malé firmy, které přivádí zákazníky") and let
`/sluzby/tvorba-webovych-stranek` own "tvorba webových stránek" and
`/sluzby/tvorba-webu-pro-firmy` own "web pro firmu" exclusively.

---

## Finding 7 — Blog↔page interlinking: real but inconsistent (partially confirms the recent commit)
**Severity: Medium**

Verified all 4 blog posts in `lib/data/blog.tsx`:

- `lokalni-seo-pro-zivnostniky-v-cr` ↔ `/sluzby/seo-optimalizace/lokalni-seo` ↔
  `google-business-profile-vs-firmy-cz`: **fully bidirectional**, a genuinely well-built
  mini-cluster (lokalni-seo page links to both posts; both posts link back to the
  lokalni-seo page and to each other).
- `jak-poznat-kvalitni-web-pro-remeslnika` ↔ `web-pro-remeslniky`: **bidirectional**
  (post links to the spoke; the spoke links back to the post). Good, but this article
  is only linked from `web-pro-remeslniky` — none of the other 18 trade pages reference
  it even though its advice (galerie realizací, rychlá poptávka, mobilní zobrazení)
  applies almost verbatim to `truhlare`, `zamecniky`, `kovare`, etc.
- `kolik-stoji-tvorba-webu-2026`: **near-orphan**. Its only outgoing link is to
  `/cena-tvorby-webu` (via the `PricingHighlight` component); `/cena-tvorby-webu` does
  **not** link back to it, and no other page (pillar, `/sluzby`, any `web-pro-*`) links
  to it. It's reachable only via the `/blog` index and `sitemap.xml`.

**Recommendation:** Add a `PricingHighlight`-adjacent or contextual link from
`/cena-tvorby-webu` back to `kolik-stoji-tvorba-webu-2026` (mandatory two-way link, easy
fix), and add "Víc o tom, jak poznat kvalitní web, najdete v článku [Jak poznat
kvalitní web pro řemeslníka]" as a `relatedSlugs`-style footer block to several trade
pages beyond just `web-pro-remeslniky`.

---

## Finding 8 — ZakazIQ "rezervační systém" vs. trade-page "rezervace" messaging
**Severity: Low**

`/zakaziq/rezervacni-system` (title: "Rezervační systém — konzultace na jedno kliknutí
v ZakazIQ") is VIZEON's own client-portal booking tool for scheduling consultations
with VIZEON, not a productized booking-system offering for tradespeople's end
customers. `web-pro-kadernictvi` and `web-pro-masery-a-wellness` also use "rezervace" /
"rezervační kalendář" language, but for a different intent (their clients' customers
booking appointments). Confirmed distinct by content and intent — low real
cannibalization risk — but the shared terminology with no cross-link or disambiguation
between the two could confuse a reader who lands on one expecting the other.

**Recommendation:** No structural change needed; consider a one-line disambiguation
note or just keep monitoring — not a priority fix.

---

## Internal Link Matrix — Hub & Spoke (current state)

Pillar: **`/tvorba-webu-pro-zivnostniky`**

| Spoke | Links to pillar? | Inbound contextual links (count) | `hubHref` target | Cluster (by `relatedSlugs`) |
|---|---|---|---|---|
| `web-pro-remeslniky` | Yes (direct) | 8+ | — (custom page) | Craft/trade hub-of-a-hub |
| `web-pro-kadernictvi` | Yes (`#proces` anchor) | 5 | — (custom page) | Beauty/wellness |
| `web-pro-ucetni` | Yes (`#proces` anchor) | 4 | — (custom page) | Services/professional |
| `web-pro-masery-a-wellness` | Yes (`#proces` anchor) | 4 | — (custom page) | Beauty/wellness |
| `web-pro-kosmeticky` | **No** | 4 | `/` (homepage) | Beauty/wellness |
| `web-pro-fitness-trenery` | **No** | 3 | `/` (homepage) | Beauty/wellness |
| `web-pro-elektrikare` | **No** | 3 | `/web-pro-remeslniky` | Trade/construction |
| `web-pro-instalatery` | **No** | 3 | `/web-pro-remeslniky` | Trade/construction |
| `web-pro-sanace` | **No** | 3 | `/web-pro-remeslniky` | Trade/construction |
| `web-pro-truhlare` | **No** | 3 | `/web-pro-remeslniky` | Woodworking |
| `web-pro-realitni-maklere` | **No** | 2 | `/` (homepage) | Property/professional |
| `web-pro-studnare` | **No** | 2 | `/web-pro-remeslniky` | Trade/construction |
| `web-pro-kovare` | **No** | 2 | `/web-pro-remeslniky` | Woodworking/metalwork |
| `web-pro-rezbare` | **No** | 2 | `/web-pro-remeslniky` | Woodworking |
| `web-pro-zahradniky` | **No** | 2 | `/web-pro-remeslniky` | Trade/exterior |
| `web-pro-malire` | **No** | 2 | `/web-pro-remeslniky` | Trade/exterior |
| `web-pro-zamecniky` | **No** | 7 | `/web-pro-remeslniky` | Metalwork |
| `web-pro-fotografy` | **No** | 1 | `/` (homepage) | Creative/visual |
| `web-pro-autoservisy` | **No** | 0 | `/` (homepage) | Trade/automotive |

**Mandatory-link compliance: 4/19 spokes link to the pillar (21%). Pillar links to
4/19 spokes (21%).** Target is 100%/100%.

---

## Keyword Cluster Gaps (prioritized for a 14-week-old, near-zero-backlink domain)

Given the domain's age and authority, head terms ("tvorba webu", "web pro firmy") are
not realistically winnable soon; the existing 19-trade model is the right shape but
under-linked (see above) rather than needing entirely new architecture. Gaps worth
adding, ordered by realistic low-competition long-tail opportunity:

1. **Per-trade pricing spokes** — "kolik stojí web pro truhláře / kadeřnictví /
   účetní" etc. Extends the existing (isolated) `kolik-stoji-tvorba-webu-2026` article
   into trade-specific long-tail with near-zero direct competition, and gives that
   orphaned article a natural reason to be cross-linked from every trade page.
2. **Per-trade local-SEO spokes** — "lokální SEO pro truhláře", "Google Business
   Profile pro kadeřnictví", etc. Directly extends the one well-built cluster on the
   site (`lokalni-seo` page + 2 blog posts), which is already proven low-competition
   territory for this domain and has real bidirectional linking to build on.
3. **New trade verticals with confirmed but moderate competition**: "web pro
   fyzioterapeuty" (confirmed real niche demand via search — Webwiz, Prosperující
   klinika, tvorba-webu-brno already compete, so position via a specific angle like
   "web pro fyzioterapeuty s objednávkovým systémem" rather than the bare term) and
   "web pro veterináře" — both adjacent to the existing wellness/services clusters and
   reuse the `masery-a-wellness`/`ucetni` content patterns.
4. **Missing adjacent trades with near-zero current coverage**: úklidové firmy,
   čalouníci/podlaháři, stavební firmy/zednictví (distinct commercial intent from the
   generic `web-pro-remeslniky`), kavárny/malé gastro provozovny. Each is long-tail,
   low-competition, and slots into the existing `relatedSlugs` cluster pattern.
5. **"Web na míru vs. šablona" per-trade comparison spokes** — the bare comparison
   term ("web na míru vs šablona") is already contested by established competitors
   (interval.cz, lesensky.cz, studioustal.cz and others), so avoid the head term; a
   trade-qualified variant ("web na míru nebo šablona pro truhláře/kadeřnictví") is
   genuinely uncontested and can live as a spoke under each existing trade page rather
   than a new standalone comparison page.

---

## Pre-Delivery Checklist Results

- [ ] No two posts share the same primary keyword — **FAIL**: homepage vs.
  `/sluzby/tvorba-webovych-stranek` (Finding 6)
- [ ] Every spoke has ≥3 incoming internal links — **FAIL**: 8 of 19 spokes below
  threshold (Finding 4), 1 orphan (Finding 3)
- [ ] Every spoke links to the pillar — **FAIL**: only 4/19 (Finding 1, 2)
- [ ] Pillar links to every spoke — **FAIL**: only 4/19 (Finding 2)
- [x] No orphan pages in the sitemap sense — all 19 spokes + pillar are in
  `app/sitemap.ts`, so crawl discovery via sitemap is intact even where in-content
  linking is not
- [x] Blog↔page linking exists and is bidirectional for 2 of 4 posts (Finding 7)

---

SCORE: 42
