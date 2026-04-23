# Sandwich Hedges, sandwichhedges.co.uk

A plain-HTML, multi-page website for Sandwich Hedges, friendly, local hedge trimming for Sandwich, Deal, Worth, Ash, Woodnesborough, Eastry and Sandwich Bay in East Kent.

Sister site to [Sandwich Lawn Mowing](https://sandwichlawnmowing.co.uk/), same family, same van, same phone number.

## Stack

- Plain HTML + one shared CSS file (no build step)
- Shared stylesheet: `assets/css/styles.css`
- One JS file for mobile nav + how-to category filter: `assets/js/main.js`
- Images served from the existing Zyrosite CDN (shared with sister site)

## Design

Deliberately different look from the sister lawn site, same bones, different clothes:

- **Palette:** deep forest `#14573a`, sage `#8ea87f`, warm clay `#c2623a`, linen off-white
- **Typography:** DM Serif Display + Inter (vs. Fraunces + Plus Jakarta on the lawn site)
- **Accents:** clay-red highlights, circular badges, slightly earthier feel

## Structure

- `index.html`, home
- `about.html`, `contact.html`, `gallery.html`, `privacy.html`, `thanks.html`, `404.html`
- `services/`, 2 tightly-focused service pages (hedge trimming, overgrown hedge rescue), kept to 2 for SEO specialism
- `areas/`, 7 town landing pages + hub (Sandwich, Deal, Worth, Ash, Woodnesborough, Eastry, Sandwich Bay)
- `how-to/`, 8 guides + hub with category filtering (extensible, see below)
- `sitemap.xml`, `robots.txt`, SEO

## Adding a new how-to guide

The how-to hub is designed to scale:

1. Copy any existing guide in `how-to/` (e.g. `when-to-trim-hedges.html`) as a template
2. Change the title, description, canonical URL, body copy and JSON-LD
3. Open `how-to/index.html` and copy one of the `.howto-card` blocks
4. Update the `href`, title, excerpt and `howto-tag`
5. Set `data-howto-cat="category1,category2"` to decide which filter tabs show it
6. Add the new URL to `sitemap.xml`

Existing filter categories: `timing`, `species`, `conifers`, `restoration`, `wildlife`, `law`, `planting`, `diy`. Add new filters by duplicating a `.howto-filter` button in the hub.

## Contact details

- **Phone:** 07449 303889 (Richard)
- **Receptionist:** 07888 868590
- **Email:** hello@sandwichhedges.co.uk
- **WhatsApp:** wa.me/447449303889
- **Contact form:** `contact.html` POSTs to `/contact-submit.php`, which validates and sends the enquiry via the Resend API to `hello@sandwichhedges.co.uk`. Redirects to `/thanks.html` on success, or `/contact.html?status=invalid|error` on failure. All fields required; the form also captures whether the customer has WhatsApp.

### Form setup

1. Add `RESEND_API_KEY` to repo Settings → Secrets and variables → Actions. Use the same key as the sister `sandwichhandyman.co.uk` repo.
2. Deploy. The workflow writes `config/secrets.php` from the secret before FTPS-syncing to Krystal.
3. `config/` is protected by `.htaccess` so the secrets file is not web-accessible. `config/secrets.php` itself is git-ignored, the canonical copy lives only in GitHub Actions secrets.
4. Sender defaults to `Sandwich Hedges <onboarding@resend.dev>` until the domain is verified on Resend. Once `sandwichhedges.co.uk` is verified, update the `from` field in `contact-submit.php` to `hello@sandwichhedges.co.uk`.

## SEO / AI search

Every public page includes:

- Title, description, canonical, Open Graph, Twitter card
- Geo meta tags (Kent coordinates), theme colour, author
- JSON-LD structured data: `LocalBusiness`, `Service` / `HowTo` / `Article` / `FAQPage`, and `BreadcrumbList` throughout
- Homepage also includes `WebSite` with `SearchAction` and `Speakable` for voice assistants

AI crawlers (GPTBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, CCBot, Applebot, Bingbot, Amazonbot, DuckAssistBot, Meta-ExternalAgent and more) are explicitly allowed in `robots.txt`.

## Local preview

Open `index.html` directly in a browser, or run a static server from this folder:

```
python -m http.server 8000
```

Then visit `http://localhost:8000/`.

## Deployment

Intended to mirror the sister site: push to `main` triggers a GitHub Actions workflow that FTPSes the site to Krystal. Copy `.github/workflows/deploy.yml` from `sandwichlawnmowing.co.uk` and set the secrets:

- `FTPS_HOST`
- `FTPS_USER`
- `FTPS_PASSWORD`
- `FTPS_PORT`
- `FTPS_TARGET_DIR`

## Content tone

Content is written in British English to the humanisation guide, varied sentence length, honest phrasing, mild personality, and local references (streets, villages, landmarks). The aim is sound like the people on the van, not the website of a national chain.
