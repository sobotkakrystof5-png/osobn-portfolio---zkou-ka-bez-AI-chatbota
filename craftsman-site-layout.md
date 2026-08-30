# Craftsman Site Layout — Skill Export (Schovinox template)

## SKILL.md

```markdown
---
name: craftsman-site-layout
description: Reusable page-architecture/layout template extracted from the Schovinox reference site (a craftsman/manufacturer marketing site) — header/footer structure, section-by-section composition of every page type (home, services, about, projects, gallery, testimonials, pricing, contact, product detail), and recurring layout components (eyebrow labels, numbered index blocks, stats bar, alternating service blocks, timeline, card grids, CTA bands, pricing cards, forms with honeypot). Colors, fonts, and copy are intentionally excluded — only structure, hierarchy, and layout. Use whenever building a new site (especially craftsman/workshop/manufacturer/local trade or "one owner, real work, portfolio-driven" business) that should follow this proven structure, or when the user references "the Schovinox template/layout/skeleton". Also use to scaffold a multi-page marketing site with home, services, about, portfolio, and contact pages needing a solid default information architecture.
---

# Craftsman Site Layout (Schovinox template)

A content-agnostic, color-agnostic layout system extracted from analyzing `schovinox.vercel.app` (Zámečnictví/kovovýroba — a family metalworking workshop site). It captures **how the site is structured**, not what it says or what colors it uses. Use it as the skeleton for a new project; the user will supply their own palette, type, copywriting, and images.

## When to use this

- User wants a new marketing/portfolio site for a craft, trade, workshop, or small manufacturer business and wants a proven IA + layout, not a blank page.
- User explicitly references this template ("Schovinox layout", "stejná šablona jako minule", "ten skill co jsme dělali z rozvržení webu").
- User wants to scaffold pages (home, services, about, projects/portfolio, gallery, testimonials, pricing, contact) with consistent recurring components.

## How to use this skill

1. **Read `references/page-templates.md`** — full section-by-section breakdown of every page type (order, purpose of each block, what content slot goes where).
2. **Read `references/components.md`** — the recurring atomic layout patterns (eyebrow label, numbered index, card grid, CTA band, etc.) that get reused across multiple pages. These are the "design system of layout" — build them once, reuse everywhere.
3. **Use `assets/skeleton.html`** as a working, unstyled-but-structured starting point — real HTML/CSS with grayscale placeholder tokens (spacing/typography only, no brand colors) implementing the homepage plus every reusable component as commented sections. Copy the relevant blocks into the new project and restyle.
4. Before writing any page, ask the user (or infer from context) for: business type/name, page count needed (full 9-page IA or a trimmed subset), and whether it's a Next.js/React build or plain HTML — then adapt the skeleton's markup accordingly while **keeping the section order and hierarchy intact**.
5. Never carry over Schovinox's actual copy, photos, phone numbers, prices, or brand colors — those are placeholders only, to be replaced per project. Do carry over: section order, spacing rhythm, use of eyebrow labels, numbered indices, card/grid ratios, and the alternating-block pattern for services.

## Site-wide architecture

**Global container**: single centered content column with consistent horizontal padding/max-width across every page. Generous vertical whitespace between sections (this site reads as airy/minimal, not dense).

**Header** (same on every page):
- Logo/wordmark — far left
- Horizontal primary nav — center-right, one level, no dropdowns (8 items in the reference: story → services → flagship product → portfolio → testimonials → pricing → gallery → contact)
- One visually distinct primary CTA button (pill/rectangle, filled or outlined differently than nav links) — far right, always links to the contact/inquiry page
- No secondary utility bar, no search, no language switcher in the reference

**Footer** (same on every page), 3-column layout:
1. Brand mark + one-line mission/positioning sentence
2. "Sitemap" — plain link list mirroring the header nav
3. Contact block — phone / email / address as a stacked list
- Below the 3 columns: a thin bottom bar with social icon(s) left, copyright + legal/registration ID + "built by X" credit right

**Recurring page skeleton** (almost every interior page follows this exact 3-part shape):
1. **Page header**: small eyebrow/kicker word or phrase (page's category label) + one large H1 statement (short, declarative, 1–2 lines) — optionally + one supporting paragraph
2. **Body**: one or more of the reusable components (see `components.md`) — varies per page type
3. **Closing CTA band** (on conversion-relevant pages): centered short question (H2) + one supporting line + single button, right before the footer

## Page inventory & which components each uses

| Page | Key components used |
|---|---|
| Home | Full-bleed hero + eyebrow tags + H1 + 2 CTAs → Stats bar (4-col animated counters) → Numbered mission statement ("01" + paragraph) → "What you'll find" 4-card grid → Footer |
| Services (listing) | Page header → repeating alternating service blocks (image + numbered index "01/03" + label + H2 + paragraph + CTA link), last block variant has multiple sub-links instead of one CTA → Closing CTA band → Footer |
| About/Story | Page header → vertical numbered timeline (duration tag + H3 + paragraph, repeated) → portrait image + pull-quote + attribution → Footer |
| Projects/Portfolio | Page header → uniform image-card grid (image + "zoom" affordance + title + category tag, links to detail page) → Footer |
| Gallery | Page header → filter/category pill bar → dense uniform image grid (many items, each tagged by category) → Footer |
| Testimonials/References | Page header + short trust-framing paragraph → (existing testimonial cards, if any) → submission form (honeypot + name + optional company + text + optional photo upload + consent checkbox + submit) → Footer |
| Pricing | Page header + intro paragraph → 2–N pricing cards side by side (label + short description + big price/unit) → Closing CTA band → Footer |
| Contact | Page header → two-part layout: contact-info list (icon/label/value rows: phone, email, address, hours) + CTA button, alongside a map placeholder → full inquiry form (honeypot + name + email + phone + category select + message + consent + submit) → Footer |
| Product detail | Eyebrow + H1 + subhead + anchor CTA to pricing → image gallery/carousel with numbered thumbnails → "what is it" (image + paragraphs) → 3-item numbered feature list → "why it's different" section reusing the numbered-feature pattern for specs → pricing table grouped by series (each series = label + list of clickable size/price rows) → final CTA with button + phone → Footer |

See `references/page-templates.md` for the full detail on every page, and `references/components.md` for how to build each reusable block.

```

## references/components.md

```markdown
# Reusable layout components

These are the atomic building blocks that repeat across pages. Build each once as a component/partial and compose pages from them. No colors or copy specified here — only structure, order of elements, and relative sizing/hierarchy.

---

## 1. Eyebrow + H1 page header
Used at the top of **every interior page**.

- Small label line above the heading (single word or short phrase naming the page's category, e.g. category of the page). Visually small, spaced out from the H1.
- H1: short, declarative, 1–2 lines max. Largest text on the page.
- Optional: one supporting paragraph (1–2 sentences) directly under the H1, lighter weight than H1.

```
[eyebrow label]
# [H1 statement]
[optional supporting paragraph]
```

## 2. Full-bleed hero (homepage only)
- Full-width/full-bleed background image (or video) behind the content, dark enough for white/light text overlay.
- Eyebrow line: short list of category tags separated by a middle-dot ("·"), sitting above H1.
- H1: 2-line, large, bold statement — this is the single largest text element on the entire site.
- Supporting paragraph: 1–2 sentences.
- Two CTAs side by side: one primary (filled/solid button), one secondary (outline or text link with arrow).

## 3. Stats bar
- 4-column grid (collapses to 2×2 on mobile), directly below the hero.
- Each column: one large number (can be an animated count-up from 0) + one short label underneath describing what it counts.
- No icons, no borders between columns — pure whitespace separation.

## 4. Numbered intro / mission statement
- A large index number (e.g. "01") placed beside (or above, on mobile) a single paragraph of mission/positioning copy.
- Used as a transitional, breathing section between the stats bar and the main content grid — not a full section with its own heading, just number + paragraph.
- This same "large index number as a design device" motif reappears later in numbered feature lists and the services listing — treat it as a signature recurring device, not a one-off.

## 5. Card grid (content pillars / portfolio)
- Grid of cards, each identical in structure:
  - Image (top, fixed aspect ratio)
  - Title (below image)
  - One-line description
  - Whole card is a link to a detail/subpage
- On the homepage: 4 cards representing the site's main content pillars (about, services, flagship product, portfolio) — this doubles as a visual sitemap.
- On the portfolio/projects page: N cards (6–8), each with a small category tag instead of a description, plus a "zoom/enlarge" hover affordance since the image is the primary content.

## 6. Alternating service block (repeating "offer" pattern)
Used on the services listing page, once per service offered (3 in the reference).

- Image (large, on one side)
- Small numbered index in "current/total" format (e.g. "01/03") + a constant label word identifying the block type (e.g. "Service")
- H2: service name
- Paragraph: what it covers, how the process works
- CTA: single text/button link ("learn more") — OR, for a flagship/product-line service, a **short bullet list of links** to sub-products instead of one generic CTA (this variant signals "this offering has its own sub-catalog").
- Blocks stack vertically down the page; consider alternating image left/right per block for visual rhythm, though the reference stacks them uniformly.

## 7. Vertical numbered timeline (about/story page)
- Ordered list, each item:
  - Small tag (a duration or date, e.g. "14 let" / "Today") acting as the index marker instead of a plain number
  - H3: milestone title
  - Paragraph: milestone description
- Items read top-to-bottom in chronological order, each visually indented/marked as a list item (numbered or tagged, not bulleted).
- Followed by a **portrait + pull-quote** block: large photo + a single blockquote-style quote + an attribution line (name + role) underneath. This is the emotional/human close of the about page.

## 8. Filter/category pill bar (gallery page)
- Row of pill/tab buttons: "All" + one pill per category.
- Sits directly below the page header, above the grid.
- Selecting a pill filters the grid below (client-side).

## 9. Dense media grid (gallery page)
- Large uniform grid (e.g. 4 columns desktop) of many images, each internally tagged with a category (used by the filter bar above).
- No titles or captions on the grid itself — purely visual; captions/detail appear on click/lightbox only.

## 10. Testimonial submission form
- Short trust-building paragraph above the form explaining why testimonials are genuine/moderated.
- Form fields in order:
  1. Hidden honeypot field (spam trap, invisible to real users)
  2. Name (required)
  3. Company (optional)
  4. Testimonial text (required, multi-line)
  5. Photo upload (optional, with file-type/size hint text)
  6. Consent checkbox (required) — permission to publish name/text/photo
  7. Submit button
- If existing testimonials exist, they'd render as a card grid (quote + name + optional company/photo) above this form — the reference site currently has none live, but the layout should accommodate it.

## 11. Pricing cards
- 2 to N cards, side by side (stack on mobile).
- Each card: short label/heading, 1-line description, then a large price/value display (big number + unit, e.g. "rate / hour") — or a non-numeric value like "quoted individually" for custom/large-scope tiers.
- No feature-comparison checklists in the reference — kept deliberately simple/sparse, not a SaaS-style feature matrix.

## 12. Closing CTA band
Used at the bottom of conversion-relevant pages (services, pricing, product detail), right before the footer.

- Centered, short H2 phrased as a question ("Not sure where your job fits?")
- One supporting line
- Single button (links to contact)
- Visually set apart from the rest of the page (e.g. its own contained/banded section, more whitespace around it).

## 13. Contact page layout
- Two zones side by side (stack on mobile):
  - **Contact info list**: repeating rows of [icon/label] + value — phone, email, address, opening hours — followed by a single "Call now" style button.
  - **Map placeholder**: a map embed area.
- Below both: the **full inquiry form**:
  1. Honeypot field
  2. Name (required)
  3. Email (required)
  4. Phone (optional)
  5. Inquiry type — select/radio (required) — categories should mirror the services offered
  6. Message (required, multi-line)
  7. Consent checkbox (required)
  8. Submit button

## 14. Product detail page pattern (for a flagship product/product line)
- Eyebrow ("Own product" style label) + H1 + subhead paragraph + one anchor-link CTA scrolling down to the pricing section.
- Image gallery/carousel: numbered thumbnails (01, 02, 03…), with hint text that images are clickable/zoomable and arrow-navigable.
- "What is it" section: no eyebrow, H2 + one image + 1–2 paragraphs of descriptive copy.
- **3-item numbered feature list** (reuses the numbered-index motif from component #4/#6): each item = 2-digit index + H3 + short paragraph, laid out as 3 columns or 3 stacked rows.
- "Why it's different" section: eyebrow + H2 + intro paragraph, then a **second numbered/labeled list** of specs — same visual pattern as the feature list above but framed around technical differentiators (material, finish, process) rather than benefits. Treat these two lists as the same component reused with different content framing.
- Pricing table: grouped by series/variant (H3 per group), each group listing its size/variant options as clickable rows showing [dimension/variant] + [price] — clicking opens a pre-filled order action (e.g. mailto with subject/body prefilled).
- Final CTA: one prominent button + a direct phone link next to it.

---

## Cross-cutting notes

- **Numbered-index motif**: the single strongest recurring visual device across this whole site — large index numbers ("01", "02/03") are used at least 5 different times (mission statement, service blocks, timeline, feature lists, spec lists). Treat it as the site's signature layout device, not decoration to skip.
- **Eyebrow labels**: every page and most major sections use a small label word above the heading. Keep this consistent site-wide.
- **CTA hierarchy**: exactly one primary filled-button style + one secondary (outline/text) style, used consistently — never more than 2 button visual styles on a page.
- **Whitespace over borders/cards-with-shadows**: sections are separated by vertical spacing and typography scale, not boxes, dividers, or drop shadows.
- **Forms always start with a honeypot field** and always end with a required consent checkbox before submit — carry this pattern into any new form on the new site (GDPR-style consent + basic spam protection).

```

## references/page-templates.md

```markdown
# Page-by-page templates

Full composition of every page type observed on the reference site. Each is a straight top-to-bottom list of sections in order. Component names refer to `components.md`. Content in [brackets] is a placeholder slot — fill with the new project's own content, never the reference site's.

---

## 1. Home

1. Header (site-wide, see SKILL.md)
2. **Full-bleed hero** (`components.md #2`): background photo, eyebrow tag list, H1 (core value proposition, 2 lines), supporting paragraph, 2 CTAs (primary = "make an inquiry", secondary = "see the work/portfolio")
3. **Stats bar** (`#3`): 4 counters — e.g. [years of experience], [completed projects], [% satisfied customers], [years under this brand name]
4. **Numbered mission statement** (`#4`): "01" + one paragraph explaining the brand's positioning/philosophy
5. Section heading ("What you'll find here" style) + subheading
6. **4-card grid** (`#5`): links to → About/Story, Services, Flagship product, Portfolio/Projects
7. Footer (site-wide)

## 2. Services (listing)

1. Header
2. Page header (`#1`): eyebrow "Services" + H1 statement about the range of offerings
3. **Alternating service block** (`#6`) × N — once per service. Last block = flagship/product-line variant with a sub-link bullet list instead of single CTA.
4. **Closing CTA band** (`#12`): "Not sure where your job fits?" style question → button to contact
5. Footer

## 3. About / Story

1. Header
2. Page header (`#1`): eyebrow "About" + H1 (e.g. a generational/legacy statement)
3. **Vertical numbered timeline** (`#7`): 4–6 milestones, each tagged with a duration/date, H3 title, paragraph
4. Portrait + pull-quote block: large photo, blockquote, attribution (name + role)
5. Footer

## 4. Projects / Portfolio (listing)

1. Header
2. Page header (`#1`): eyebrow "Portfolio/Realizations" + H1 stating volume/pride in work
3. **Card grid** (`#5`, portfolio variant): 6–8 cards, image + zoom affordance + title + category tag, each linking to its own detail page
4. Footer

*(Each card links to a **project detail page** — not fully captured in the reference crawl, but should follow the general pattern: hero image, project title, category, then a photo gallery + short case description. Build this as a simple image-gallery + description page reusing the product-detail gallery pattern at a lighter weight.)*

## 5. Gallery

1. Header
2. Page header (`#1`): eyebrow "Gallery" + H1
3. **Filter pill bar** (`#8`): "All" + category pills
4. **Dense media grid** (`#9`): large uniform grid of many images, category-tagged for filtering, opens lightbox on click
5. Footer

## 6. Testimonials / References

1. Header
2. Page header (`#1`): eyebrow "References" + H1 + one short trust-framing paragraph (e.g. "these are real, unedited")
3. (If testimonials exist: card grid of quotes — quote text + name + optional company/photo)
4. Section heading ("Did we work with you?" style) + short instruction paragraph
5. **Testimonial submission form** (`#10`)
6. Footer

## 7. Pricing

1. Header
2. Page header (`#1`): eyebrow "Pricing" + H1 + intro paragraph explaining the pricing philosophy (e.g. flat rate + custom quotes for large jobs)
3. **Pricing cards** (`#11`) × 2+: e.g. one flat hourly-rate card, one "quoted individually for large projects" card
4. **Closing CTA band** (`#12`): "Want an exact price for your job?" → button
5. Footer

## 8. Contact

1. Header
2. Page header (`#1`): eyebrow "Contact" + H1 (e.g. "Ask, no obligation")
3. **Contact info list** (`#13` left/top half): phone, email, address, opening hours rows + "Call now" button
4. Map placeholder (right/bottom half, alongside the info list)
5. Section heading ("Send an inquiry" style)
6. **Full inquiry form** (`#13` bottom): honeypot, name, email, phone, inquiry-type select, message, consent, submit
7. Footer

## 9. Product detail (flagship product / product line)

1. Header
2. Eyebrow ("Own product") + H1 (product name + short claim) + subhead + anchor CTA down to pricing
3. **Image gallery/carousel** (`#14`): numbered thumbnails, zoomable, arrow-navigable, with hint caption
4. Primary CTA repeated here too (e.g. "order" mailto action)
5. Section heading ("What it is") + image + 1–2 descriptive paragraphs
6. **3-item numbered feature list** (`#14`): index + H3 + paragraph × 3 (benefit-framed)
7. Section heading ("Why it's different") + eyebrow + intro paragraph
8. **Numbered/labeled spec list** (`#14`, reused): index/label + H3 + paragraph × 3 (technical/material-framed)
9. Section heading ("Pricing") + intro/legal note paragraph (e.g. "prices include tax, custom sizes quoted separately")
10. **Grouped pricing table** (`#14`): repeated per series — H3 series label + list of clickable [size/variant — price] rows
11. Final CTA: button + direct phone link, no card needed, simple centered close
12. Footer

---

## Notes on adapting page count

Not every project needs all 9 page types. Common trims:
- **Small business, single service**: merge Services into Home as a section; drop the dedicated Product-detail page pattern unless there's a real flagship product.
- **No physical portfolio to show yet**: drop Projects/Gallery, keep Testimonials + Contact + Services + About.
- **No fixed pricing (quote-only business)**: replace the Pricing page with a single line in the Services page's closing CTA band instead of a dedicated page.

Whatever subset is used, keep the **header/footer**, the **eyebrow+H1 page-header pattern**, and the **closing CTA band on conversion pages** — these three are the structural backbone that makes the whole site feel like one coherent system.

```

## assets/skeleton.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Layout skeleton — replace all content, colors, and copy</title>
<style>
  /*
    STRUCTURE-ONLY SKELETON.
    Colors below are neutral grayscale PLACEHOLDERS ONLY — replace --bg, --fg,
    --muted, --accent, --accent-fg with the real project's palette.
    Fonts are system-default placeholders — replace --font-heading / --font-body.
    Everything else (spacing scale, grid ratios, section order) is the part
    worth keeping from the reference site.
  */
  :root{
    --bg:#ffffff; --fg:#111111; --muted:#666666; --line:#e5e5e5;
    --accent:#111111; --accent-fg:#ffffff;
    --font-heading: system-ui, sans-serif;
    --font-body: system-ui, sans-serif;
    --container: 1200px;
    --pad: 24px;
    --space-xs: 8px; --space-sm: 16px; --space-md: 32px;
    --space-lg: 64px; --space-xl: 120px;
  }
  *{box-sizing:border-box;}
  body{margin:0; font-family:var(--font-body); color:var(--fg); background:var(--bg); line-height:1.5;}
  h1,h2,h3{font-family:var(--font-heading); margin:0 0 var(--space-sm); line-height:1.15;}
  h1{font-size:clamp(2rem,5vw,3.5rem);}
  h2{font-size:clamp(1.5rem,3vw,2.25rem);}
  h3{font-size:1.1rem;}
  p{margin:0 0 var(--space-sm); color:var(--muted);}
  a{color:inherit;}
  .container{max-width:var(--container); margin:0 auto; padding:0 var(--pad);}
  .section{padding:var(--space-xl) 0;}
  .eyebrow{display:block; font-size:.8rem; letter-spacing:.12em; text-transform:uppercase; color:var(--muted); margin-bottom:var(--space-xs);}
  .btn{display:inline-block; padding:14px 28px; border-radius:4px; font-weight:600; text-decoration:none; border:1px solid var(--fg);}
  .btn-primary{background:var(--accent); color:var(--accent-fg); border-color:var(--accent);}
  .btn-secondary{background:transparent; color:var(--fg);}
  .cta-row{display:flex; gap:var(--space-sm); flex-wrap:wrap;}

  /* ---------- HEADER ---------- */
  header.site{display:flex; align-items:center; justify-content:space-between; padding:var(--space-sm) var(--pad); border-bottom:1px solid var(--line);}
  header.site nav{display:flex; gap:var(--space-md); flex-wrap:wrap;}
  header.site nav a{text-decoration:none; font-size:.95rem;}

  /* ---------- HERO (home only) ---------- */
  .hero{position:relative; min-height:80vh; display:flex; align-items:flex-end; background:#333 center/cover no-repeat; color:#fff;}
  .hero::after{content:""; position:absolute; inset:0; background:linear-gradient(0deg, rgba(0,0,0,.55), rgba(0,0,0,.1)); }
  .hero .container{position:relative; z-index:1; padding-bottom:var(--space-xl);}
  .hero .eyebrow{color:#eee;}
  .hero h1{color:#fff;}
  .hero p{color:#eee; max-width:640px;}

  /* ---------- STATS BAR ---------- */
  .stats{display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-md); text-align:center;}
  .stats .num{font-size:clamp(2rem,4vw,3rem); font-weight:700; display:block;}
  .stats .label{color:var(--muted); font-size:.85rem;}

  /* ---------- NUMBERED INTRO ---------- */
  .numbered-intro{display:flex; gap:var(--space-md); align-items:flex-start;}
  .numbered-intro .index{font-size:2.5rem; font-weight:700; color:var(--muted); flex-shrink:0;}

  /* ---------- CARD GRID ---------- */
  .card-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:var(--space-md);}
  .card-grid.cols-3{grid-template-columns:repeat(3,1fr);}
  .card{display:block; text-decoration:none; color:inherit;}
  .card .img{aspect-ratio:4/3; background:#ddd; margin-bottom:var(--space-xs);}
  .card h3{margin-bottom:4px;}
  .card .tag{font-size:.75rem; text-transform:uppercase; color:var(--muted); letter-spacing:.08em;}

  /* ---------- ALTERNATING SERVICE BLOCK ---------- */
  .service-block{display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg); align-items:center; padding:var(--space-lg) 0; border-top:1px solid var(--line);}
  .service-block .img{aspect-ratio:4/3; background:#ddd;}
  .service-block .index{font-size:.8rem; color:var(--muted); letter-spacing:.08em; text-transform:uppercase;}
  .service-block.flip .img{order:2;}

  /* ---------- TIMELINE ---------- */
  .timeline{list-style:none; margin:0; padding:0; border-left:2px solid var(--line);}
  .timeline li{padding:0 0 var(--space-lg) var(--space-md); position:relative;}
  .timeline .tag{display:inline-block; font-size:.8rem; font-weight:700; color:var(--muted); margin-bottom:4px;}

  .quote-block{display:grid; grid-template-columns:1fr 1.2fr; gap:var(--space-lg); align-items:center;}
  .quote-block .img{aspect-ratio:1/1; background:#ddd;}
  .quote-block blockquote{font-size:1.5rem; font-style:italic; margin:0 0 var(--space-sm);}

  /* ---------- FILTER PILLS ---------- */
  .pills{display:flex; gap:var(--space-xs); flex-wrap:wrap; margin-bottom:var(--space-md);}
  .pill{padding:8px 16px; border:1px solid var(--line); border-radius:999px; font-size:.85rem; cursor:pointer;}
  .pill.active{background:var(--fg); color:var(--bg); border-color:var(--fg);}

  /* ---------- DENSE MEDIA GRID ---------- */
  .media-grid{display:grid; grid-template-columns:repeat(4,1fr); gap:8px;}
  .media-grid .img{aspect-ratio:1/1; background:#ddd;}

  /* ---------- FORM ---------- */
  form.pattern{max-width:640px;}
  form.pattern .honeypot{position:absolute; left:-9999px; opacity:0;}
  form.pattern label{display:block; font-size:.85rem; margin-bottom:4px; font-weight:600;}
  form.pattern .field{margin-bottom:var(--space-sm);}
  form.pattern input, form.pattern select, form.pattern textarea{width:100%; padding:12px; border:1px solid var(--line); border-radius:4px; font-family:inherit;}
  form.pattern .consent{display:flex; gap:8px; align-items:flex-start; font-size:.85rem; color:var(--muted);}

  /* ---------- PRICING CARDS ---------- */
  .pricing-cards{display:grid; grid-template-columns:repeat(2,1fr); gap:var(--space-md);}
  .pricing-card{border:1px solid var(--line); border-radius:8px; padding:var(--space-md);}
  .pricing-card .price{font-size:2rem; font-weight:700; margin-top:var(--space-sm);}

  /* ---------- CTA BAND ---------- */
  .cta-band{text-align:center; padding:var(--space-xl) 0; border-top:1px solid var(--line); border-bottom:1px solid var(--line);}
  .cta-band h2{margin-bottom:4px;}

  /* ---------- CONTACT LAYOUT ---------- */
  .contact-grid{display:grid; grid-template-columns:1fr 1fr; gap:var(--space-lg);}
  .contact-list{list-style:none; margin:0 0 var(--space-md); padding:0;}
  .contact-list li{padding:var(--space-xs) 0; border-bottom:1px solid var(--line);}
  .contact-list .label{font-size:.8rem; color:var(--muted); text-transform:uppercase; letter-spacing:.08em; display:block;}
  .map-placeholder{background:#ddd; min-height:320px; display:flex; align-items:center; justify-content:center; color:var(--muted);}

  /* ---------- NUMBERED FEATURE LIST (reused for feature + spec lists) ---------- */
  .feature-list{display:grid; grid-template-columns:repeat(3,1fr); gap:var(--space-md);}
  .feature-list .index{font-size:1.5rem; font-weight:700; color:var(--muted); margin-bottom:4px;}

  /* ---------- PRODUCT GALLERY ---------- */
  .gallery-hero .img{aspect-ratio:16/9; background:#ddd;}
  .thumb-row{display:flex; gap:8px; margin-top:var(--space-xs);}
  .thumb-row span{width:32px; height:32px; border:1px solid var(--line); display:flex; align-items:center; justify-content:center; font-size:.75rem;}

  /* ---------- GROUPED PRICING TABLE ---------- */
  .price-group h3{margin-bottom:var(--space-xs);}
  .price-rows{list-style:none; margin:0 0 var(--space-md); padding:0;}
  .price-rows li{display:flex; justify-content:space-between; padding:12px 0; border-bottom:1px solid var(--line); text-decoration:none; color:inherit;}

  /* ---------- FOOTER ---------- */
  footer.site{border-top:1px solid var(--line); padding:var(--space-lg) 0 var(--space-md);}
  .footer-grid{display:grid; grid-template-columns:1.5fr 1fr 1fr; gap:var(--space-lg); margin-bottom:var(--space-lg);}
  .footer-grid h4{font-size:.8rem; text-transform:uppercase; letter-spacing:.08em; color:var(--muted); margin-bottom:var(--space-sm);}
  .footer-grid ul{list-style:none; margin:0; padding:0;}
  .footer-grid li{margin-bottom:8px;}
  .footer-bottom{display:flex; justify-content:space-between; align-items:center; padding-top:var(--space-md); border-top:1px solid var(--line); font-size:.8rem; color:var(--muted); flex-wrap:wrap; gap:8px;}

  @media (max-width: 800px){
    .stats, .card-grid, .card-grid.cols-3, .media-grid, .feature-list, .pricing-cards, .footer-grid{grid-template-columns:repeat(2,1fr);}
    .service-block, .quote-block, .contact-grid{grid-template-columns:1fr;}
  }
</style>
</head>
<body>

<!-- ============ HEADER (site-wide) ============ -->
<header class="site">
  <a href="#" style="font-weight:700; letter-spacing:.05em;">[LOGO]</a>
  <nav>
    <a href="#">[About]</a>
    <a href="#">[Services]</a>
    <a href="#">[Flagship product]</a>
    <a href="#">[Portfolio]</a>
    <a href="#">[Testimonials]</a>
    <a href="#">[Pricing]</a>
    <a href="#">[Gallery]</a>
    <a href="#">[Contact]</a>
  </nav>
  <a href="#" class="btn btn-primary">[Primary CTA]</a>
</header>

<!-- ============ HOME: HERO ============ -->
<section class="hero">
  <div class="container">
    <span class="eyebrow">[Tag] · [Tag] · [Tag]</span>
    <h1>[Two line hero statement<br>goes here]</h1>
    <p>[One to two sentence supporting statement about the value proposition.]</p>
    <div class="cta-row">
      <a href="#" class="btn" style="background:#fff;color:#111;">[Primary CTA]</a>
      <a href="#" class="btn" style="border-color:#fff;color:#fff;">[Secondary CTA]</a>
    </div>
  </div>
</section>

<!-- ============ HOME: STATS BAR ============ -->
<section class="section container">
  <div class="stats">
    <div><span class="num">[0]</span><span class="label">[stat label]</span></div>
    <div><span class="num">[0+]</span><span class="label">[stat label]</span></div>
    <div><span class="num">[0%]</span><span class="label">[stat label]</span></div>
    <div><span class="num">[0]</span><span class="label">[stat label]</span></div>
  </div>
</section>

<!-- ============ HOME: NUMBERED INTRO ============ -->
<section class="section container">
  <div class="numbered-intro">
    <span class="index">01</span>
    <p style="font-size:1.15rem; color:var(--fg); margin:0;">[One paragraph mission/positioning statement.]</p>
  </div>
</section>

<!-- ============ HOME: CARD GRID (sitemap-as-cards) ============ -->
<section class="section container">
  <h2>[What you'll find]</h2>
  <p style="max-width:480px;">[Short subheading.]</p>
  <div class="card-grid">
    <a class="card" href="#"><div class="img"></div><h3>[Card title]</h3><p>[One-line description.]</p></a>
    <a class="card" href="#"><div class="img"></div><h3>[Card title]</h3><p>[One-line description.]</p></a>
    <a class="card" href="#"><div class="img"></div><h3>[Card title]</h3><p>[One-line description.]</p></a>
    <a class="card" href="#"><div class="img"></div><h3>[Card title]</h3><p>[One-line description.]</p></a>
  </div>
</section>

<!-- ============ INTERIOR PAGE HEADER (reuse on every interior page) ============ -->
<section class="section container" style="padding-bottom:0;">
  <span class="eyebrow">[Page eyebrow]</span>
  <h1>[Page H1 statement]</h1>
  <p style="max-width:600px;">[Optional supporting paragraph.]</p>
</section>

<!-- ============ SERVICES: ALTERNATING BLOCKS ============ -->
<section class="container">
  <div class="service-block">
    <div class="img"></div>
    <div>
      <span class="index">01/03 · Service</span>
      <h2>[Service name]</h2>
      <p>[What it covers, how the process works.]</p>
      <a href="#" class="btn btn-secondary">[Learn more]</a>
    </div>
  </div>
  <div class="service-block flip">
    <div class="img"></div>
    <div>
      <span class="index">02/03 · Service</span>
      <h2>[Service name]</h2>
      <p>[What it covers, how the process works.]</p>
      <a href="#" class="btn btn-secondary">[Learn more]</a>
    </div>
  </div>
  <div class="service-block">
    <div class="img"></div>
    <div>
      <span class="index">03/03 · Service</span>
      <h2>[Flagship product line]</h2>
      <p>[What it covers.]</p>
      <ul>
        <li><a href="#">[Sub-product link 1]</a></li>
        <li><a href="#">[Sub-product link 2]</a></li>
        <li><a href="#">[Sub-product link 3 — coming soon]</a></li>
      </ul>
    </div>
  </div>
</section>

<!-- ============ CLOSING CTA BAND (reuse on services/pricing/product pages) ============ -->
<section class="cta-band container">
  <h2>[Not sure where your job fits?]</h2>
  <p>[Short supporting line.]</p>
  <a href="#" class="btn btn-primary">[CTA]</a>
</section>

<!-- ============ ABOUT: TIMELINE ============ -->
<section class="section container">
  <ol class="timeline">
    <li><span class="tag">[14 years]</span><h3>[Milestone title]</h3><p>[Milestone description.]</p></li>
    <li><span class="tag">[4 years]</span><h3>[Milestone title]</h3><p>[Milestone description.]</p></li>
    <li><span class="tag">[Today]</span><h3>[Milestone title]</h3><p>[Milestone description.]</p></li>
  </ol>
</section>

<!-- ============ ABOUT: PORTRAIT + QUOTE ============ -->
<section class="section container">
  <div class="quote-block">
    <div class="img"></div>
    <div>
      <blockquote>"[Pull quote from the founder/owner.]"</blockquote>
      <p>— [Name, role]</p>
    </div>
  </div>
</section>

<!-- ============ PORTFOLIO: CARD GRID ============ -->
<section class="section container">
  <div class="card-grid cols-3">
    <a class="card" href="#"><div class="img"></div><h3>[Project title]</h3><span class="tag">[Category]</span></a>
    <a class="card" href="#"><div class="img"></div><h3>[Project title]</h3><span class="tag">[Category]</span></a>
    <a class="card" href="#"><div class="img"></div><h3>[Project title]</h3><span class="tag">[Category]</span></a>
  </div>
</section>

<!-- ============ GALLERY: FILTER + DENSE GRID ============ -->
<section class="section container">
  <div class="pills">
    <span class="pill active">[All]</span>
    <span class="pill">[Category 1]</span>
    <span class="pill">[Category 2]</span>
    <span class="pill">[Category 3]</span>
  </div>
  <div class="media-grid">
    <div class="img"></div><div class="img"></div><div class="img"></div><div class="img"></div>
    <div class="img"></div><div class="img"></div><div class="img"></div><div class="img"></div>
  </div>
</section>

<!-- ============ TESTIMONIALS: SUBMISSION FORM ============ -->
<section class="section container">
  <h2>[Did we work with you?]</h2>
  <p>[Short instruction line.]</p>
  <form class="pattern">
    <input class="honeypot" type="text" tabindex="-1" autocomplete="off">
    <div class="field"><label>[Name] *</label><input type="text"></div>
    <div class="field"><label>[Company (optional)]</label><input type="text"></div>
    <div class="field"><label>[Your experience] *</label><textarea rows="4"></textarea></div>
    <div class="field"><label>[Photo (optional)]</label><input type="file"></div>
    <div class="field consent"><input type="checkbox"><span>[I agree my name/text/photo may be published.] *</span></div>
    <button class="btn btn-primary" type="submit">[Submit]</button>
  </form>
</section>

<!-- ============ PRICING: CARDS ============ -->
<section class="section container">
  <div class="pricing-cards">
    <div class="pricing-card">
      <h3>[Flat-rate tier]</h3>
      <p>[Description.]</p>
      <div class="price">[550] <small style="font-size:1rem; font-weight:400;">/ [unit]</small></div>
    </div>
    <div class="pricing-card">
      <h3>[Custom/large-scope tier]</h3>
      <p>[Description.]</p>
      <div class="price">[Quoted individually]</div>
    </div>
  </div>
</section>

<!-- ============ CONTACT: INFO + MAP + FORM ============ -->
<section class="section container">
  <div class="contact-grid">
    <div>
      <ul class="contact-list">
        <li><span class="label">[Phone]</span>[value]</li>
        <li><span class="label">[Email]</span>[value]</li>
        <li><span class="label">[Address]</span>[value]</li>
        <li><span class="label">[Hours]</span>[value]</li>
      </ul>
      <a href="#" class="btn btn-primary">[Call now]</a>
    </div>
    <div class="map-placeholder">[Map embed]</div>
  </div>
</section>
<section class="section container">
  <h2>[Send an inquiry]</h2>
  <form class="pattern">
    <input class="honeypot" type="text" tabindex="-1" autocomplete="off">
    <div class="field"><label>[Name] *</label><input type="text"></div>
    <div class="field"><label>[Email] *</label><input type="email"></div>
    <div class="field"><label>[Phone]</label><input type="tel"></div>
    <div class="field"><label>[Inquiry type] *</label>
      <select><option>[Type 1]</option><option>[Type 2]</option><option>[Other]</option></select>
    </div>
    <div class="field"><label>[Message] *</label><textarea rows="5"></textarea></div>
    <div class="field consent"><input type="checkbox"><span>[I agree to processing of my personal data.] *</span></div>
    <button class="btn btn-primary" type="submit">[Send inquiry]</button>
  </form>
</section>

<!-- ============ PRODUCT DETAIL ============ -->
<section class="section container gallery-hero">
  <span class="eyebrow">[Own product]</span>
  <h1>[Product name / headline claim]</h1>
  <p style="max-width:560px;">[Subhead sentence.]</p>
  <a href="#cenik" class="btn btn-secondary">[Jump to pricing]</a>
  <div class="img" style="margin-top:var(--space-md);"></div>
  <div class="thumb-row">
    <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span>
  </div>
</section>

<section class="section container">
  <h2>[What it is]</h2>
  <div class="img" style="aspect-ratio:16/9; margin-bottom:var(--space-sm);"></div>
  <p>[Descriptive paragraph.]</p>
  <p>[Second descriptive paragraph.]</p>
</section>

<section class="section container">
  <div class="feature-list">
    <div><span class="index">01</span><h3>[Feature title]</h3><p>[Short paragraph.]</p></div>
    <div><span class="index">02</span><h3>[Feature title]</h3><p>[Short paragraph.]</p></div>
    <div><span class="index">03</span><h3>[Feature title]</h3><p>[Short paragraph.]</p></div>
  </div>
</section>

<section class="section container">
  <span class="eyebrow">[Why it's different]</span>
  <h2>[Section heading]</h2>
  <p style="max-width:600px;">[Intro paragraph.]</p>
  <div class="feature-list">
    <div><span class="index">[Material]</span><h3>[Spec title]</h3><p>[Short paragraph.]</p></div>
    <div><span class="index">[Finish]</span><h3>[Spec title]</h3><p>[Short paragraph.]</p></div>
    <div><span class="index">[Welds]</span><h3>[Spec title]</h3><p>[Short paragraph.]</p></div>
  </div>
</section>

<section class="section container" id="cenik">
  <span class="eyebrow">[Pricing]</span>
  <h2>[Prices by size]</h2>
  <p style="max-width:600px;">[Legal/scope note about the prices below.]</p>
  <div class="price-group">
    <h3>[Series A]</h3>
    <ul class="price-rows">
      <li><a href="#"><span>[Size 1]</span><span>[Price]</span></a></li>
      <li><a href="#"><span>[Size 2]</span><span>[Price]</span></a></li>
    </ul>
  </div>
  <div class="price-group">
    <h3>[Series B]</h3>
    <ul class="price-rows">
      <li><a href="#"><span>[Size 1]</span><span>[Price]</span></a></li>
      <li><a href="#"><span>[Size 2]</span><span>[Price]</span></a></li>
    </ul>
  </div>
</section>

<section class="cta-band container">
  <a href="#" class="btn btn-primary">[I'm interested]</a>
  <a href="#" style="margin-left:var(--space-sm);">[Phone number]</a>
</section>

<!-- ============ FOOTER (site-wide) ============ -->
<footer class="site container">
  <div class="footer-grid">
    <div>
      <h4>[LOGO]</h4>
      <p>[One-line brand/mission sentence.]</p>
    </div>
    <div>
      <h4>[Sitemap]</h4>
      <ul>
        <li><a href="#">[About]</a></li>
        <li><a href="#">[Services]</a></li>
        <li><a href="#">[Flagship product]</a></li>
        <li><a href="#">[Portfolio]</a></li>
        <li><a href="#">[Testimonials]</a></li>
        <li><a href="#">[Pricing]</a></li>
        <li><a href="#">[Gallery]</a></li>
        <li><a href="#">[Contact]</a></li>
      </ul>
    </div>
    <div>
      <h4>[Contact]</h4>
      <ul>
        <li>[Phone]</li>
        <li>[Email]</li>
        <li>[Address]</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>[Social icon]</span>
    <span>© [Year] [Brand]. [Legal ID] · Built by [Credit]</span>
  </div>
</footer>

</body>
</html>