# Performance / Core Web Vitals Audit — vizeon.cz

> **LAB-ONLY ESTIMATES.** No Google API credentials are configured (`google_auth.py --check`
> confirms tier -1, PageSpeed Insights v5 and CrUX API both `[MISSING]`), so no field (CrUX,
> 75th-percentile real-user) data exists for this domain. All metrics below come from local
> **Lighthouse 13.4.1** runs (Node v24.15, headless Chromium, default mobile emulation +
> simulated throttling) against the live production site. Lighthouse 13 uses **insight-based**
> performance audits (no more `first-meaningful-paint`/legacy audit names); the `pwa` category no
> longer exists and was not requested. Treat all pass/fail calls here as directional lab signals,
> not confirmed Core Web Vitals ranking status — re-verify against CrUX/PSI once the domain has a
> Google API key configured or accrues enough Chrome UX Report traffic.

## Pages tested

| Page | Role |
|---|---|
| `https://vizeon.cz/` | Homepage |
| `https://vizeon.cz/web-pro-elektrikare` | `/web-pro-*` service landing page |
| `https://vizeon.cz/blog/kolik-stoji-tvorba-webu-2026` | Blog article |

## Headline lab metrics (mobile, Lighthouse 13.4.1, performance category only)

| Metric | Homepage | /web-pro-elektrikare | Blog article | Good threshold |
|---|---|---|---|---|
| Lighthouse Performance score | **59/100** | 86/100 | 80/100 | — |
| LCP | **5.9 s (Poor)** | 3.5 s (Needs Improvement) | 4.0 s (borderline Poor) | ≤2.5 s |
| CLS | 0.00001 (Good) | 0 (Good) | 0 (Good) | ≤0.1 |
| TBT (INP proxy) | 370 ms (Needs Improvement) | 147 ms (Good) | 163 ms (Good) | — |
| Max Potential FID (legacy proxy, lab-only) | 430 ms | 174 ms | 177 ms | — |
| FCP | 3.2 s | 1.4 s | 1.7 s | — |
| TTI | 9.9 s | 8.4 s | 9.6 s | — |
| Server response (TTFB) | 409 ms | 236 ms | 140 ms | — |

Note: INP itself cannot be measured in a lab run (it requires a real user interaction). Total
Blocking Time and Max Potential FID are used here only as **lab proxies** for interactivity risk,
per standard Lighthouse guidance — do not report these as INP.

---

## Finding 1 — Homepage LCP is in the "Poor" range, driven by a large blocking JS chunk

**Severity:** Critical

**Evidence:**
- Lighthouse lab run: homepage LCP = **5.9 s** (`>4.0s` = Poor bucket), Performance score 59/100.
- LCP element is a **text node**, not an image: `main#main-content > section#hero > div.relative > h2.font-cormorant` (homepage has zero `<img>`/raster image requests in `resource-summary` — it's a text-only hero).
- `lcp-breakdown-insight`: Time to First Byte 802 ms + Element Render Delay 1,260 ms reported as named subparts; the remaining gap to the 5.9 s total metric is consistent with main-thread contention shown in `mainthread-work-breakdown`: Script Evaluation 881 ms, Script Parse/Compile 241 ms occurring before paint.
- `unused-javascript` flags a single chunk `_next/static/chunks/0tvp1gn28not7.js` at **497 KB transferred, 320 KB (64%) unused** on the homepage — this is the single largest contributor to blocking main-thread work ahead of the hero paint.
- `network-dependency-tree-insight`: longest critical-path chain measured at 1,270 ms, driven by two render-blocking CSS chunks loaded in the document head.

**Recommendation:**
1. Identify what's inside `0tvp1gn28not7.js` (bundle analyzer / `next build` stats) and move anything not needed for the hero/above-the-fold render into a `next/dynamic` import with `ssr: false` and lazy-loading (e.g., chat widget, carousel/animation libraries, below-fold interactive sections).
2. Preload/prioritize only the CSS and JS the hero actually needs; defer everything else until after first paint.
3. Re-run Lighthouse after splitting to confirm LCP drops toward the ≤2.5 s "Good" threshold — expected impact: largest single win available on this site (potentially 2-3+ s off LCP).

---

## Finding 2 — Site-wide oversized shared JS bundle, 30-82% unused per page

**Severity:** High

**Evidence:**
- `unused-javascript` estimated savings are consistent and large across **all three** tested templates: Homepage 531 KiB, `/web-pro-elektrikare` 559 KiB, blog article 548 KiB — indicating this is a shared/global bundle problem, not a page-specific one.
- Same dominant chunk (`0tvp1gn28not7.js` family) appears on every page at ~470-500 KB transferred with 64-82% flagged unused depending on route.
- Third-party GTM script (`googletagmanager.com/gtag/js`) adds another 174 KB with 43-53% unused on every page (not fixable directly, but a known fixed cost worth measuring against value).
- Source check: 23 client components (`"use client"`) in `app/`+`components/` — a reasonable count, but confirms a non-trivial amount of client-side JS is shipped by default rather than being route-scoped.

**Recommendation:**
1. Run `next build` with the bundle analyzer to attribute the ~500 KB chunk to specific modules/components.
2. Convert non-critical, below-the-fold, or interaction-only components to `next/dynamic` lazy imports so they don't ship in the initial route bundle.
3. Audit whether the same heavy bundle is genuinely needed on the blog and service-landing templates, or whether it's a homepage-only dependency being bundled globally.

---

## Finding 3 — Render-blocking CSS delays first paint on every page

**Severity:** Medium

**Evidence:**
- `render-blocking-insight` flags two Next.js CSS chunks (~14 KB + ~12.7 KB) as render-blocking on **all three** tested URLs, each contributing ~150 ms of estimated blocking time (homepage: 150 ms/chunk; `/web-pro-elektrikare`: same two files; blog: same two files).
- These two CSS files form the longest link in the critical request chain (`network-dependency-tree-insight`), measured at 1.27 s under Lighthouse's simulated network throttling on the homepage.

**Recommendation:** Inline critical above-the-fold CSS for the hero/first viewport and defer/async-load the remainder; consider further splitting the global CSS chunk so route-specific pages don't wait on styles they don't use.

---

## Finding 4 — Non-composited CSS animations risk main-thread jank

**Severity:** Medium

**Evidence:**
- `non-composited-animations` audit flags a repeated `.text-shimmer` effect (hero heading, testimonials section, contact section — multiple `<span>` instances) animating `background-position-x`, which Chrome cannot run on the compositor thread ("Unsupported CSS Property: background-position-x").
- The homepage hero CTA (`button.glow-pulse`, "NEZÁVAZNÁ KONZULTACE ZDARMA →") animates `box-shadow`, also compositor-unsupported.
- Both force main-thread paint work on every animation frame, adding to the interactivity risk already visible in the homepage's elevated TBT (370 ms) and Max Potential FID (430 ms).

**Recommendation:** Re-implement the shimmer effect with a `transform`/`opacity`-driven approach (e.g., animating a masked gradient layer via `transform: translateX`) and replace the pulsing `box-shadow` with a `transform`/`opacity` glow or a pre-rendered layered background — both are GPU-compositable and won't block the main thread.

---

## Finding 5 — Homepage interactivity risk (INP proxy) is borderline; other templates are fine

**Severity:** Medium

**Evidence:**
- Homepage: TBT 370 ms, Max Potential FID 430 ms — both in "Needs Improvement" territory (INP itself needs a real 75th-percentile field sample to confirm, which is unavailable — see disclaimer).
- `/web-pro-elektrikare` (147 ms TBT) and the blog article (163 ms TBT) are comfortably in "Good" lab territory.
- Root cause overlaps with Finding 1/2: the ~500 KB JS chunk's Script Evaluation time (881 ms in `mainthread-work-breakdown`) is concentrated on the homepage load.

**Recommendation:** Same as Findings 1-2 — code-split and lazy-load non-critical JS; break remaining long tasks into <50 ms chunks; defer non-essential init work with `requestIdleCallback`/`scheduler.yield`.

---

## Finding 6 — CLS is excellent across all templates (pass)

**Severity:** Info / Pass

**Evidence:** CLS measured at ~0.00001 (homepage) and 0 (service page, blog article) — all comfortably under the ≤0.1 "Good" threshold. `cls-culprits-insight` reports no meaningful shift contributors. Source check confirms `next/image` is used for the handful of raster images in the codebase (3 files reference it; no bare `<img>` tags found outside `next/image` usage) and fonts are loaded via `next/font/google` (self-hosted, avoids FOIT/FOUT layout jumps and passed the `font-display-insight` audit with zero flagged files) — both good practices that should be preserved as new pages/templates are added.

**Recommendation:** No action required. Maintain `next/image` + `next/font` discipline going forward; this is the one CWV pillar already solidly in "Good" territory lab-side.

---

## Summary

The site's structural fundamentals are sound (next/image, next/font/google, low DOM sizes of 127-472 elements, near-zero CLS, fast TTFB of 140-409 ms on Vercel fra1). The dominant, recurring problem is **JavaScript weight**: one oversized shared chunk (~500 KB, 30-82% unused depending on route) that both delays the homepage's text-based LCP well past the "Poor" threshold and pushes homepage interactivity metrics (TBT/Max Potential FID) into "Needs Improvement." The two `/web-pro-*` and blog templates tested are meaningfully lighter and closer to passing thresholds, so this is fixable without a redesign — it is a bundling/code-splitting problem concentrated on (but not exclusive to) the homepage.

**Priority order:** (1) split/lazy-load the ~500 KB shared JS chunk, especially on the homepage — highest LCP + INP-proxy impact; (2) defer the two render-blocking CSS chunks; (3) fix the two non-composited animation patterns (shimmer text, glow-pulse button) to remove main-thread paint pressure.

SCORE: 60
