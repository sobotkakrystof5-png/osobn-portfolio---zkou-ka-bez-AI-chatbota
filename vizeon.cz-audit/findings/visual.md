# Visual / Mobile-Rendering Audit — vizeon.cz

Pages tested: homepage (`/`), `/web-pro-truhlare`, `/kontakt`
Viewports: Desktop 1920x1080, Mobile 375x812 (iPhone)
Screenshots: `vizeon.cz-audit/screenshots/`

---

## Finding 1: Mobile homepage above-the-fold shows only a splash/intro animation — no H1, no CTA, no nav

**Severity:** High

**Evidence:** `homepage-mobile.png` (reproduced consistently across 3 independent captures — see also the retest frames, all showing identical behavior). On the 375x812 mobile viewport, the entire visible screen on load is taken up by a centered "VIZEON" wordmark, the tagline "WEB. DESIGN. VÝSLEDKY.", and a small animated badge cycling through trust markers ("PRECIZNÍ PRÁCE" / "KVALITNÍ PROVEDENÍ" / "FLEXIBILNÍ PŘÍSTUP") with a blinking cursor. There is no headline, no value proposition, no CTA button, and no navigation/hamburger menu visible anywhere in this state. Compare with `homepage-desktop.png`, captured at the same point in the load sequence, which renders the full hero (H1 "Web pro firmu, který spojuje moderní design a SEO optimalizaci", subcopy, two CTAs "NEZÁVAZNÁ KONZULTACE ZDARMA" / "ZOBRAZIT SLUŽBY", trust badges, and full nav) with no splash at all — confirmed with 2 additional desktop retries (`retry-desktop-1.png`, `retry-desktop-2.png`), both resolving straight to the real hero. Only in `homepage-mobile-full.png` (full-page capture, which runs long enough for the animation to resolve) does the actual H1/CTA content appear, indicating the splash is real content-blocking, not a screenshot artifact.

**Recommendation:** This is a strong mobile-only regression risk: mobile users' first paint is a decorative logo screen with zero information scent and no way to interact (no nav) until the animation completes. On slower phones/networks this could last multiple seconds, directly hurting bounce rate, perceived LCP, and Core Web Vitals (both real and lab-measured). Either remove the full-viewport splash on mobile entirely, cap it to a much shorter duration (under ~800ms) with reduced-motion/skip support, or restructure it so the H1 and primary CTA render immediately underneath/before the animation layer rather than being gated behind it. At minimum, ensure `prefers-reduced-motion` skips the intro and that the nav/hamburger remains accessible during the animation.

---

## Finding 2: Cookie-consent banner overlaps primary content and the main form CTA on mobile

**Severity:** Medium

**Evidence:** `kontakt-mobile.png` — the fixed-position cookie banner ("Tento web používá cookies...") sits directly on top of the "ODESLAT ZPRÁVU →" submit button, and its "PŘIJMOUT" / "ODMÍTNOUT" buttons are clipped at the bottom viewport edge (only partially visible/reachable without scrolling). The same overlap pattern shows on `web-pro-truhlare-mobile.png`, where the banner covers body copy ("Detailní záběry spojů a povrchové úpravy...") and a heading ("Rychlá poptávka s nahráním inspirace"), and on `web-pro-truhlare-desktop.png`/`kontakt-desktop.png`, where it overlaps the bottom of in-page content (list items, headings) rather than being an isolated bar below the fold.

**Recommendation:** On mobile especially, the contact form's primary CTA button should never be visually obstructed by the cookie banner at first paint — this creates a first-impression "broken layout" look and forces an extra interaction (dismiss cookies) before the user can even see the submit button clearly. Reduce the banner's height/padding on small viewports, ensure it never fully overlaps interactive elements (add bottom padding/safe-area to the page container equal to banner height, or make the banner a slim single-line bar on mobile), and confirm both "Přijmout"/"Odmítnout" buttons are always fully visible without scrolling.

---

## Finding 3: Rotating trust-badge text renders without Czech diacritics in some intermediate frames

**Severity:** Low

**Evidence:** Across 3 mobile retest captures of the same splash badge, two frames (`retry-1.png`, and the equivalent frame in `homepage-mobile.png`/`retry-3.png`) show the fully-typed text as **"FLEXIBILNÍ PŘÍSTUP"** (correct diacritics), while one frame (`retry-1.png`) shows the identical, fully-typed string rendered as **"FLEXIBILNI PRISTUP"** (missing í/ř accents) with the badge otherwise pixel-identical. This suggests either a fallback-font swap before the intended typeface is applied, or a text-effect intermediate state that momentarily drops diacritics — either way it is inconsistent across loads.

**Recommendation:** Verify `font-display` strategy and preloading for the custom typefaces (Cormorant Garamond/Inter) used in this animated badge specifically, and check whether the rotating-text component does any string transformation (e.g., a scramble/decode effect) that temporarily strips accented characters. Confirm the final, settled state always renders correct Czech diacritics, since incorrect text — even briefly — undermines trust on a copy-sensitive value-prop element.

---

## Finding 4: Mobile navigation/CTA hierarchy on secondary pages is otherwise solid

**Severity:** Informational (positive finding)

**Evidence:** `kontakt-desktop.png` / `kontakt-mobile.png` and `web-pro-truhlare-desktop.png` / `web-pro-truhlare-mobile.png` show the H1 ("Pojďme na to." / "Web pro truhláře, který ukáže kvalitu zpracování") and lead copy visible immediately above the fold on both viewports, with no splash gating on these interior pages. Mobile nav correctly collapses to a hamburger icon (top right, `kontakt-mobile.png`) with adequate tap-target sizing. Dark theme contrast (near-black `#080808` background, off-white body text, `#c9a84c`-gold accents) reads cleanly at both viewport sizes, and no horizontal scroll or text-overflow was observed in any of the 6 static captures.

**Recommendation:** No action needed here; use this as the reference behavior when fixing the homepage splash in Finding 1 — the homepage hero should render as directly and immediately as these interior pages do.

---

## Summary

The interior pages (`/kontakt`, `/web-pro-truhlare`) render cleanly and immediately on both desktop and mobile with no above-the-fold issues beyond the cookie-banner overlap. The homepage, however, has a significant mobile-specific defect: the intro/splash animation consistently and reproducibly blocks the H1, CTA, and navigation on the 375x812 viewport while desktop resolves to full content at the same load stage — this is the dominant issue in this audit and should be prioritized first.

SCORE: 62
