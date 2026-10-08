# Sandwich Hedges nightly ingestion - architecture and operational reference

## Analytics, fonts and cookies (do not undo)

- This site has NO Google Analytics, NO gtag or dataLayer snippet, NO Google Fonts links and NO cookie banner or cookie-consent script. They were removed deliberately on 8 October 2026. Do not add any of them back, on any page, template, generator or sample snippet, and do not add any other third-party script, font, image host or tracker.
- Visit counting is NordAnalytics (first-party, cookieless). Every page loads `<script src="/assets/js/analytics.js?v=20261008" defer></script>` as the last element before `</body>`. That one file adds the footer links ("How we count visits", "Don't count my visits") and loads the counter. Copy the head, the footer and that script line from an existing page unchanged. Every new page must include it (redirect stubs with a meta refresh excepted).
- Fonts are self-hosted: pages link `<link rel="stylesheet" href="/assets/fonts.css">` where a Google Fonts link used to be. Copy it from an existing page.
- Audits: do NOT flag the absence of Google Analytics, a GA4 ID, gtag, consent mode or a cookie banner, and do NOT restore any of them. Older reports and notes that mention GA4 are out of date. DO flag and remove any page containing googletagmanager.com, gtag(, dataLayer, fonts.googleapis.com, fonts.gstatic.com or cookie-consent, and flag any non-redirect page missing the analytics.js script line.
- `/privacy.html` carries the approved "Website statistics" section (id `website-statistics`). Keep its wording unchanged.

**Site:** sandwichhedges.co.uk
**Pipeline shape:** SE-shape - Anthropic cloud routine (claude.ai/code scheduled agent)
**Owner:** Richard (claude.ai/code account holder)
**Scaffolded:** 2026-08-11 by Jet, per Richard's "just make it the same [as sandwichelectrical]" instruction.

## What this pipeline is

An Anthropic-hosted scheduled Claude Code routine that runs nightly on
Anthropic's cloud infrastructure. Each run: discovers an uncovered Kent
hedge-care topic + a suitable UK YouTube video (or other web source),
generates a full how-to article matching the site's existing hand-authored
template, commits it to this repo, and pushes to `main`. The repo's own
`.github/workflows/deploy.yml` GH Action then FTPS-deploys to Krystal.

This repo had **no** content pipeline before 2026-08-11 - every existing
`how-to/*.html` article (9 of them) was hand-authored, with a client-side
category filter on the hub page (`data-howto-cat` + `.howto-filter` buttons,
driven by `assets/js/main.js`).

**This file documents the pipeline shape. The routine itself (cron, prompt,
schedule) is created and owned separately on Richard's claude.ai/code
account - that setup is out of scope for this scaffolding commit.**

## How it works - end-to-end flow (per the SE-shape pattern)

### Stage 1 - trigger
- Scheduled cron on Richard's claude.ai/code account fires the routine.
- The routine spins up a fresh Claude Code session on Anthropic's infra.

### Stage 2 - topic discovery (in-session)
- Session reads the existing `how-to/` folder to identify covered vs
  uncovered topics against the category list in `config/ingestion.json`.
- Uses web search / WebFetch to find a UK hedge-care/gardening YouTube video
  (or written source) on a plausible uncovered topic.
- Constraints: UK-based creator/source, region UK, qualifying content type
  (not shorts, not compilations). Like-count / subscriber-count used as an
  authority heuristic since the YouTube Data API isn't used (egress to
  youtube.com is often blocked from Anthropic infra - falls back to
  channel-authority heuristic via web search, same as SE).

### Stage 3 - verification
- Session confirms the source and creator/channel exist and are UK-relevant
  via web search cross-references.
- Records a note about verifiability in the run report.

### Stage 4 - article generation
- Session writes a full HTML article per `TEMPLATES/how-to.md` - the
  authoritative contract for this repo. Key shape: hero + lede, the
  nesting-season / legal callout (`.article-callout--warn`) wherever timing
  is discussed, month-by-month or numbered sections, a further-help callout,
  related-guides links, `Article` + `BreadcrumbList` JSON-LD via the `@graph`
  pattern (+ `FAQPage` on procedural/calendar-style articles),
  dateModified/datePublished, og:image, correct `data-howto-cat` value(s).
- Rotates macro-structure per the P2 rules in the template contract
  (procedural/comparison/decision-tree/checklist-first) to avoid
  fingerprintably identical articles.

### Stage 5 - site updates
- Session updates `how-to/index.html` (adds the new card under the correct
  `data-howto-cat` filter tab(s)).
- Updates the `<!-- BEGIN JET-RELATED-GUIDES -->` block on 2-4 existing
  articles genuinely relevant to the new one.
- Adds the new URL to `sitemap.xml`.
- (This site's footer does not carry a growing per-article list, unlike
  sandwichelectrical - nothing to cap there. See `TEMPLATES/how-to.md` §7.)

### Stage 6 - self-audit report
- Session writes `reports/YYYY-MM-DD-content.md` documenting: URLs shipped,
  sources used, creator/authority verification, topic-gap check evidence,
  Kent-specificity notes, files modified.

### Stage 7 - commit + push
- Session commits with a `Nightly: add N how-to articles (D Month YYYY)`
  message body listing the shipped articles.
- Includes a `Claude-Session:` trailer for provenance (per SE convention).
- Pushes to `main`.

### Stage 8 - deploy
- Repo's `.github/workflows/deploy.yml` fires on push, FTPS-uploads changed
  files to Krystal. No changes needed to this workflow.

## Morning audit (second scheduled run)

A second nightly/morning routine audits the full site: category-filter
integrity (`data-howto-cat` values against `how-to/index.html`'s
`.howto-filter` buttons), broken links, dead video embeds, SEO completeness
(title/description/canonical/OG/JSON-LD present on every page), and general
relevance. Writes `reports/YYYY-MM-DD-audit.md`.

## Configuration surface

Most config lives inside the routine's prompt on Richard's claude.ai/code
account (opaque from this repo), except the two disciplines every SE-shape
routine adopts:

| What | Where |
|---|---|
| Discovery + verification prompt | Routine prompt on claude.ai/code (opaque from repo) |
| Article template rules | `TEMPLATES/how-to.md` - routine should read at run start |
| Category list, cadence, schedule | `config/ingestion.json` |
| Site palette + brand voice | `AGENTS.md` + rendered examples in `how-to/` |
| Deploy target | `.github/workflows/deploy.yml` + FTPS repo secrets |
| Cron schedule | claude.ai/code routine schedule |

## Cost model

- **Claude usage:** counts against Richard's claude.ai/code allowance.
- **Web search / WebFetch:** included in claude.ai/code.
- **YouTube:** used only via WebFetch (no Data API key). Egress-proxy 403 is
  common - routine falls back to channel-authority heuristic.
- **FTPS / hosting:** covered by Krystal LiteSpeed hosting plan.

No YouTube Data API quota to babysit. No local infrastructure dependency.

## Failure modes and resilience

| Symptom | Root cause | Resilience |
|---|---|---|
| YouTube egress blocked (HTTP 403) | Anthropic infra egress policy on youtube.com | Routine falls back to channel-authority heuristic via web search - documented in every run report |
| Fewer than 3 articles shipped | Third topic candidate not verifiable within session | Routine ships what it can verify, reports the shortfall |
| Anthropic infra outage | Anthropic side | Manual re-run via routine dashboard, or wait for next scheduled run |
| New article breaks hub category filter | Missing/invalid `data-howto-cat` value | Morning audit checks this; fix is a one-line attribute edit |

## Ownership

- **Routine config (prompt, cron, model):** Richard (his claude.ai/code account)
- **Template contract file:** Jet (site fleet lane) - PRs land in this repo
- **Site content review / audits:** Jet
- **Infra (deploy pipeline, hosting):** Webster
- **Owner-of-record for the site:** Richard

## Related files

- Site repo: `E:/Ai/Codex/sandwichhedges.co.uk/`
- Template contract: `TEMPLATES/how-to.md`
- Config: `config/ingestion.json`
- Fleet ingestion pattern comparison: `E:/Ai/Codex/ClaudeAgent/claudejet/docs/content-ingestion-patterns.md`
- SE-shape reference implementation: `E:/Ai/Codex/sandwichelectrical.co.uk/INGESTION.md`
- Sister site's pipeline (same shape, adapted for lawn care): `E:/Ai/Codex/sandwichlawnmowing.co.uk/INGESTION.md`
- Nightly self-audits (once live): `reports/YYYY-MM-DD-content.md` / `reports/YYYY-MM-DD-audit.md` in this repo
