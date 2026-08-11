# Sandwich Hedges & Tree Services — how-to article template contract

Contract for every future `how-to/*.html` article shipped by the nightly SE-shape
content-ingestion routine on this repo.

Owner of the routine: Richard (his claude.ai/code account) — see `INGESTION.md`.
Owner of this contract: Jet (website fleet).

Version: 1.0 — 2026-08-11 (scaffolded direct from sandwichelectrical.co.uk's
contract, adapted for hedge care; no prior nightly pipeline existed on this site).

## Why this exists

This site had no nightly content pipeline before 2026-08-11 — every existing
`how-to/*.html` page (9 of them) was hand-authored, with a category-filter
system on the hub page (`data-howto-cat`). This contract exists so the new
routine ships articles that slot into that filter system correctly and match
the existing markup, and so future template changes are PR-able without
touching the routine's prompt on claude.ai/code.

If this file conflicts with the routine's prompt, this file wins — update the
prompt to match.

## Hard requirements (P1 — must be in every article)

### 1. Match the existing page anatomy exactly
Copy the head/body shape from an existing hand-authored article (e.g.
`how-to/when-to-trim-hedges.html`), not from a generic template. That means:
- `<title>` ending ` | Sandwich Hedges & Tree Services` (or similar Kent-suffixed form)
- `meta description`, `canonical`, OG (`og:type=article`, title, description,
  url, image), `twitter:card=summary_large_image`
- `theme-color` `#14573a`, geo meta block (`geo.region=GB-KEN`,
  `geo.placename=Sandwich, Kent`, `geo.position`, `ICBM`),
  `content-language=en-GB`
- Fonts: Inter + DM Serif Display (same `<link>` block as existing pages)
- Favicon: the inline SVG data URI already in use — do not invent a new one
- GA4 tag `G-VLGN47T23T` — same gtag snippet verbatim
- Full site nav (Home / Services dropdown incl. Tree Services / Areas /
  How-To Guides / About / Contact / pensioner-discount badge / Call CTA
  button)
- Full footer (Services / Areas we cover / Company columns) — identical to
  every other page, do not shorten it
- JSON-LD uses the `@graph` pattern (`Article` + `BreadcrumbList` in one
  `<script>` block) as seen in existing articles — follow that shape, not
  SE's two-separate-`<script>` pattern.
- `<script src="../assets/js/main.js">` at the bottom, year script

### 2. Article + BreadcrumbList JSON-LD (this site uses `Article`, not `HowTo`)
Existing articles on this site use `@type: "Article"` (with `headline`,
`author: Organization`, `publisher` reference, `datePublished`,
`dateModified`, `mainEntityOfPage`, `inLanguage`) inside an `@graph` alongside
`BreadcrumbList` — not the `HowTo` step-schema SE and the lawnmowing sister
site use. **Keep using `Article`, not `HowTo`, to match the established
pattern on this site** — do not introduce a schema-type mismatch against the
existing 9 articles.

Exception: if a specific article is genuinely a numbered step-by-step
procedure (e.g. `trim-a-hedge-straight.html`-style), a `HowTo` type is
acceptable for that article specifically, but the site's general convention
remains `Article`. When in doubt, match `when-to-trim-hedges.html`.

### 3. datePublished + dateModified
```json
"datePublished": "YYYY-MM-DD",  // first-ship date, never mutate
"dateModified":  "YYYY-MM-DD"   // any edit updates this
```
Already present on existing articles — keep it on every new one.

### 4. FAQPage schema on procedural / calendar-style articles
Articles that answer a clear recurring question (timing, species care,
legality) MUST include a `FAQPage` JSON-LD block with 3-5 Q&A. Good defaults:
- "When can I legally cut this hedge?" (nesting-season framing)
- "Can I do this myself or do I need a professional?"
- "What happens if I damage an active nest by accident?"
- Article-specific ("How tall can my hedge legally be?", "What tools do I need?")

### 5. Open Graph image
Every article needs a real `og:image` — reuse an existing Zyrosite CDN image
if the topic overlaps an existing article, or use a suitable generic hero if
nothing matches yet. Do not ship a text-only share card.

### 6. Safety box before + after practical steps
Hedge work carries real hazards distinct from lawn care — ladders, powered
cutting tools, and a genuine legal dimension. Every article involving
practical trimming/cutting work MUST include:
- **"Before you start" box** — PPE (eye protection from flying debris, ear
  defenders for petrol/electric trimmers, sturdy gloves), ladder safety
  (majority of garden accidents involve ladders — prefer a pole/long-reach
  trimmer over a ladder wherever the hedge height allows, always have someone
  footing a ladder if one must be used, never overreach sideways), electric
  trimmer cable awareness and RCD/circuit-breaker protection, check for wasp
  nests and brambles before starting.
- **The nesting-season callout** (this is this site's equivalent of SE's
  Part-P box) — **UK Wildlife and Countryside Act 1981**: it is an offence to
  damage or destroy an active bird's nest. Nesting season runs roughly
  **1 March to 31 August**. The safe cutting window for most hedges is
  **September to February**; a light summer trim is only acceptable if the
  hedge is checked and demonstrably empty first. Every article touching
  cutting/trimming timing MUST reference this, matching the framing already
  used in `when-to-trim-hedges.html`'s `.article-callout--warn` box.
- **Neighbour hedge-height law, where relevant** — the High Hedges legislation
  (Anti-social Behaviour Act 2003, Part 8) lets a council intervene on
  evergreen/semi-evergreen hedges over 2m blocking light/access if informal
  resolution with a neighbour fails. Reference `hedge-heights-neighbour-law.html`
  for the existing detailed treatment rather than duplicating the full legal
  detail inline — link to it.

### 7. Footer / hub link discipline
This site's footer does **not** carry a growing per-article how-to list (only
a single "How-to guides" link to the hub in the Company column) — unlike
sandwichelectrical's footer firehose, so there is nothing to cap there today.

Instead, the growth surface is:
- `how-to/index.html` — add the new card with the correct `data-howto-cat`
  value(s) so it appears under the right filter tab(s). Existing categories:
  `timing`, `species`, `conifers`, `restoration`, `wildlife`, `law`,
  `planting`, `diy`. Reuse an existing category before inventing a new one;
  if a genuinely new category is needed, add a matching `.howto-filter`
  button in the hub and note it here.
- The `<!-- BEGIN JET-RELATED-GUIDES -->` / `<!-- END JET-RELATED-GUIDES -->`
  block inside every *other* how-to article —4 curated related-article links,
  hand-picked for topical relevance. New articles should update the
  related-guides block of 2-4 existing articles they're genuinely relevant to.
- If the hub grid ever grows past ~40 cards, apply the same cap-and-prepend
  discipline SE uses (mark with `<!-- howto-hub-cap: 40 -->`). Not needed yet
  at 9 articles.

## Strong recommendations (P2 — should be in most articles)

### 8. Structural variation
Do not let every article follow the same skeleton (hero → intro → calendar/
steps → callout → related). Rotate:
- **Procedural (default, ~60%):** hero → intro → safety/nesting-law box →
  numbered steps or month-by-month sections → further-help callout → related
- **Comparison (~15%):** hero → intro → comparison table (e.g. hand shears vs
  petrol trimmer, DIY vs professional, hedge species X vs Y) → when to choose
  each → CTA
- **Decision tree (~10%):** hero → intro → flowchart-of-questions ("Is it
  March-August? → check for nests first. Empty? → light trim OK.") → outcome
  branches → CTA
- **Checklist-first (~15%):** hero → checklist summary box → intro → detail
  per checklist item → CTA

Never publish three articles in a row with the same macro-structure.

### 9. Video credit (if a video is embedded)
If the article embeds or references a YouTube video, credit the creator by
name/channel in a short paragraph and link to the original. Video should be
UK-relevant and show techniques appropriate to Kent hedge species and climate.

### 10. Kent specificity
Every article should reference Kent's actual conditions somewhere — mild
coastal winters extending the safe cutting window, common local hedge species
(privet, beech, leylandii, laurel, yew are already covered), named towns
(Sandwich, Deal, Worth, Ash, Woodnesborough, Eastry, Sandwich Bay) — this is
what makes the content genuinely local rather than generic hedge-care copy.

## Nice-to-haves (P3)

- Per-step `image` in schema where a `HowTo` type is used for a specific
  procedural article, or a top-level `ImageObject` on the hero otherwise.
- Reuse Zyrosite CDN assets where a matching image already exists.

## Non-goals

- No cookie banners.
- No `<script>` tags beyond `../assets/js/main.js` and the GA4 gtag snippet.
- No third-party embeds beyond a single YouTube iframe.
- No author bylines beyond "By Richard & the Sandwich Hedges & Tree Services
  team" — no individually-named authorship, no fake real-person schema.
- Do not silently switch existing articles' `Article` schema to `HowTo` as
  part of an unrelated edit — that's a deliberate, separate decision if ever
  made fleet-wide.

## Adopting this contract

The routine should read this file at the start of every run. New articles
must satisfy every P1 rule from first ship. The 9 existing hand-authored
articles are the reference implementation for exact markup shape — when in
doubt, copy `how-to/when-to-trim-hedges.html`'s structure rather than
inventing a new layout.
