# Agent / Contributor Notes

## Analytics, fonts and cookies (do not undo)

- This site has NO Google Analytics, NO gtag or dataLayer snippet, NO Google Fonts links and NO cookie banner or cookie-consent script. They were removed deliberately on 8 October 2026. Do not add any of them back, on any page, template, generator or sample snippet, and do not add any other third-party script, font, image host or tracker.
- Visit counting is NordAnalytics (first-party, cookieless). Every page loads `<script src="/assets/js/analytics.js?v=20261008" defer></script>` as the last element before `</body>`. That one file adds the footer links ("How we count visits", "Don't count my visits") and loads the counter. Copy the head, the footer and that script line from an existing page unchanged. Every new page must include it (redirect stubs with a meta refresh excepted).
- Fonts are self-hosted: pages link `<link rel="stylesheet" href="/assets/fonts.css">` where a Google Fonts link used to be. Copy it from an existing page.
- Audits: do NOT flag the absence of Google Analytics, a GA4 ID, gtag, consent mode or a cookie banner, and do NOT restore any of them. Older reports and notes that mention GA4 are out of date. DO flag and remove any page containing googletagmanager.com, gtag(, dataLayer, fonts.googleapis.com, fonts.gstatic.com or cookie-consent, and flag any non-redirect page missing the analytics.js script line.
- `/privacy.html` carries the approved "Website statistics" section (id `website-statistics`). Keep its wording unchanged.

> PUBLIC-COPY RULE (Richard, 2026-10-05) - OVERRIDES any older instruction below:
> Never write NordSys or NordSys Limited on any public page, JSON-LD, meta, llms.txt or sitemap file.
> Never write owner, founder, owned-by, run-by or operated-by statements, a company-ownership footer, or a surname-plus-company line.
> Never write network wording: no "Part of the Sandwich Hedges network", no "sister sites", no "hedge ring", no footer cross-links to other sites.
> Footer is: site name, copyright year, Privacy and Sitemap links, contact only. Do not name or credit the business owner by full name.
> JSON-LD Article `author` is `{"@type": "Organization", "name": "<this site's name>"}` (same as the publisher), never a Person named Richard Lim; do not add a `founder` entry.
> Where older text below says to use a Person author "Richard Lim" or to credit "Run by Richard Lim", ignore it.
> Never claim tree felling, and never state insurance amounts ("Fully insured" alone is fine).
> Editorial links in body copy to a neighbouring town's site are fine if they do not describe a network or common ownership.

Ground rules for any future AI assistant or human contributor working on this site.

## Stack

- Plain HTML, one shared `assets/css/styles.css`, one `assets/js/main.js`. **No build step.**
- Deployed via GitHub Actions FTPS to Krystal shared hosting.
- Contact form posts to `https://formsubmit.co/sandwichhedges@gmail.com` (no API key, no server-side PHP on `main` - see Gotchas in the SKILL.md re: an unrelated in-flight worktree that adds PHP + Resend, not yet merged).

## Branding

- Palette: deep forest `#14573a`, sage `#8ea87f`, warm clay `#c2623a`, linen off-white.
- Font: DM Serif Display (headings/display) + Inter (body/UI), self-hosted fonts (/assets/fonts.css).
- Logo: circular tree/hedge-shape mark in forest green (inline SVG favicon data URI, and `.brand-mark` in the header).
- Sister site `sandwichlawnmowing.co.uk` - same family/van/phone, deliberately different palette (green/Plus Jakarta Sans/Fraunces vs this site's forest/sage/clay + DM Serif Display/Inter). Keep contact details consistent across both if a change touches both; do not clone the visual style.

## Writing style

- British English (colour, organisation, whilst). Postcode, pavement, tyre.
- Human tone - "people who cut hedges five days a week," not a national
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
  - How-to: `Article` + `BreadcrumbList` (see `TEMPLATES/how-to.md` - this
    site uses `Article`, not `HowTo`, as its established schema type),
    `FAQPage` on procedural/calendar-style articles.
- `robots.txt` allows GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, CCBot, Applebot, Bingbot and similar AI crawlers. `robots.txt` intentionally disallows `/thanks.html` - do not "fix" that.
- `sitemap.xml` updated whenever a page is added or removed - this repo has no build step, nothing does this automatically.

## Images

- Primary image host is the existing Zyrosite CDN (`assets.zyrosite.com`) - reuse existing CDN URLs where the topic overlaps rather than hunting for new ones.
- Images are largely off-repo; a broken image is usually a CDN URL issue, not a missing file.

## How-to pattern

See `TEMPLATES/how-to.md` for the full nightly-routine contract. Summary for
any hand edit:

1. Page hero with eyebrow, `<h1>`, lede, article-meta ("Updated Month YYYY" +
   "By Richard & the Sandwich Hedges & Tree Services team").
2. The nesting-season / legal callout (`.article-callout--warn`) wherever
   timing is discussed - this site's equivalent of a safety box.
3. Month-by-month or numbered sections with short supporting paragraphs.
4. `.article-callout` CTA box back to `contact.html`.
5. A "Related guides" `.howto-grid` section with 2 cards.
6. The `<!-- BEGIN JET-RELATED-GUIDES -->` / `<!-- END JET-RELATED-GUIDES -->`
   block - 4 curated related-article links, kept current when new articles
   ship.
7. `Article` + `BreadcrumbList` JSON-LD (`@graph` pattern), `FAQPage` on
   procedural/calendar-style articles.
8. Correct `data-howto-cat` value(s) on the hub card so hub filtering keeps
   working - see the category list in `TEMPLATES/how-to.md` §7.

## Contact form rules

- Posts to FormSubmit.co (`sandwichhedges@gmail.com`), redirects to `thanks.html`.
- The `action` and `_next` redirect are hardcoded in `contact.html` - do not
  switch to Resend/PHP as part of unrelated content work; that migration (if
  it happens) is a separate, deliberate change - see the in-flight worktree
  noted in the SKILL.md.

## What not to do

- No frameworks (React, Vue, Tailwind, Next, etc.).
- No build step. No npm dependencies.
- No tracking scripts without asking first.
- No third-party chat widgets.
- Do not clone the look of sister sites (sandwichlawnmowing.co.uk is green/Plus Jakarta Sans/Fraunces; this one is forest/sage/clay + DM Serif Display/Inter).
- Do not add author bylines beyond the team-level attribution already in use.
- Do not enable HSTS in `.htaccess` (deliberately commented out) without Richard's explicit confirmation.

## Source lines: no process wording (do not undo)

Published source credits must read like an honest reference list, never like a description of how the page was produced. Never write any of these on a public page: "egress", "proxy", "blocked", "generation environment", "INGESTION.md", "AGENTS.md", "web search", "cross-referenced via", "confirmed to exist via". If a source could not be opened, simply leave it out of the list or cite a source you did read. The only acceptable wording is plain, e.g. "checked against current sources". Audits must flag and rewrite any page that contains these phrases.
