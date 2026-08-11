# Agent / Contributor Notes

Ground rules for any future AI assistant or human contributor working on this site.

## Stack

- Plain HTML, one shared `assets/css/styles.css`, one `assets/js/main.js`. **No build step.**
- Deployed via GitHub Actions FTPS to Krystal shared hosting.
- Contact form posts to `https://formsubmit.co/sandwichhedges@gmail.com` (no API key, no server-side PHP on `main` — see Gotchas in the SKILL.md re: an unrelated in-flight worktree that adds PHP + Resend, not yet merged).

## Branding

- Palette: deep forest `#14573a`, sage `#8ea87f`, warm clay `#c2623a`, linen off-white.
- Font: DM Serif Display (headings/display) + Inter (body/UI), Google Fonts.
- Logo: circular tree/hedge-shape mark in forest green (inline SVG favicon data URI, and `.brand-mark` in the header).
- Sister site `sandwichlawnmowing.co.uk` — same family/van/phone, deliberately different palette (green/Plus Jakarta Sans/Fraunces vs this site's forest/sage/clay + DM Serif Display/Inter). Keep contact details consistent across both if a change touches both; do not clone the visual style.

## Writing style

- British English (colour, organisation, whilst). Postcode, pavement, tyre.
- Human tone — "people who cut hedges five days a week," not a national
  chain. Varied sentence length, plain words, occasional dry understatement
  ("No lofty horticultural prose").
- **No em-dashes.** Commas, full stops, colons or parentheses instead. Hyphens in compound words and en-dashes in ranges are fine.
- No corporate filler: utilise, leverage, seamlessly, best-in-class, synergy, robust, cutting-edge.
- Dates as "22 April 2026" or "late August".
- Kent-specific detail earns its place: coastal mild winters, named towns (Sandwich, Deal, Worth, Ash, Woodnesborough, Eastry, Sandwich Bay), locally common hedge species (privet, beech, leylandii, laurel, yew, box, hornbeam).

## SEO and AI search baked in

Every page must carry:

- Unique `<title>`, `<meta name="description">`, `<link rel="canonical">`.
- `<meta name="theme-color" content="#14573a">`.
- Open Graph + Twitter tags.
- `<html lang="en-GB">`.
- Geo meta (`geo.region=GB-KEN`, `geo.placename=Sandwich, Kent`, `geo.position`, `ICBM`) on every page.
- JSON-LD via the `@graph` pattern already established on this site:
  - Home: `LocalBusiness`/`Organization` + `WebSite` + `BreadcrumbList`.
  - Service/area pages: relevant type + `BreadcrumbList`, `FAQPage` where useful.
  - How-to: `Article` + `BreadcrumbList` (see `TEMPLATES/how-to.md` — this
    site uses `Article`, not `HowTo`, as its established schema type),
    `FAQPage` on procedural/calendar-style articles.
- `robots.txt` allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, CCBot, Applebot, Bingbot and similar AI crawlers. `robots.txt` intentionally disallows `/thanks.html` — do not "fix" that.
- `sitemap.xml` updated whenever a page is added or removed — this repo has no build step, nothing does this automatically.

## Images

- Primary image host is the existing Zyrosite CDN (`assets.zyrosite.com`) — reuse existing CDN URLs where the topic overlaps rather than hunting for new ones.
- Images are largely off-repo; a broken image is usually a CDN URL issue, not a missing file.

## How-to pattern

See `TEMPLATES/how-to.md` for the full nightly-routine contract. Summary for
any hand edit:

1. Page hero with eyebrow, `<h1>`, lede, article-meta ("Updated Month YYYY" +
   "By Richard & the Sandwich Hedges & Tree Services team").
2. The nesting-season / legal callout (`.article-callout--warn`) wherever
   timing is discussed — this site's equivalent of a safety box.
3. Month-by-month or numbered sections with short supporting paragraphs.
4. `.article-callout` CTA box back to `contact.html`.
5. A "Related guides" `.howto-grid` section with 2 cards.
6. The `<!-- BEGIN JET-RELATED-GUIDES -->` / `<!-- END JET-RELATED-GUIDES -->`
   block — 4 curated related-article links, kept current when new articles
   ship.
7. `Article` + `BreadcrumbList` JSON-LD (`@graph` pattern), `FAQPage` on
   procedural/calendar-style articles.
8. Correct `data-howto-cat` value(s) on the hub card so hub filtering keeps
   working — see the category list in `TEMPLATES/how-to.md` §7.

## Contact form rules

- Posts to FormSubmit.co (`sandwichhedges@gmail.com`), redirects to `thanks.html`.
- The `action` and `_next` redirect are hardcoded in `contact.html` — do not
  switch to Resend/PHP as part of unrelated content work; that migration (if
  it happens) is a separate, deliberate change — see the in-flight worktree
  noted in the SKILL.md.

## What not to do

- No frameworks (React, Vue, Tailwind, Next, etc.).
- No build step. No npm dependencies.
- No tracking scripts without asking first.
- No third-party chat widgets.
- Do not clone the look of sister sites (sandwichlawnmowing.co.uk is green/Plus Jakarta Sans/Fraunces; this one is forest/sage/clay + DM Serif Display/Inter).
- Do not add author bylines beyond the team-level attribution already in use.
- Do not enable HSTS in `.htaccess` (deliberately commented out) without Richard's explicit confirmation.
