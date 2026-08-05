// Generates new how-to pages from data/how-to/*.json, matching the exact
// hand-authored template (nav/footer/JSON-LD shape copied verbatim from
// when-to-trim-hedges.html). Never overwrites an existing page - only
// adds new slugs. Run: node scripts/generate-howto.mjs
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const dataDir = join(root, "data", "how-to");
const howToDir = join(root, "how-to");

const GA4 = "G-VLGN47T23T";
const SITE = "https://sandwichhedges.co.uk";
const TODAY = "2026-08-05";

function page(entry) {
  const url = `${SITE}/how-to/${entry.slug}.html`;
  const sectionsHtml = entry.sections
    .map((s) => `      <h2>${s.h2}</h2>\n${s.paras.map((p) => `      <p>${p}</p>`).join("\n\n")}`)
    .join("\n\n");
  const relatedHtml = entry.relatedGuides
    .map(
      (r) => `        <a class="howto-card" href="${r.href}">
          <span class="howto-tag">${r.tag}</span>
          <h3>${r.title}</h3>
          <p>${r.desc}</p>
          <span class="howto-read">Read the guide</span>
        </a>`
    )
    .join("\n\n");

  return `<!doctype html>
<html lang="en-GB">
<head>
<meta charset="utf-8" />
<meta name="google-site-verification" content="">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${entry.title} | Sandwich Hedges &amp; Tree Services</title>
<meta name="description" content="${entry.metaDescription}" />
<link rel="canonical" href="${url}" />
<meta property="og:type" content="article" />
<meta property="og:title" content="${entry.ogTitle}" />
<meta property="og:description" content="${entry.ogDescription}" />
<meta property="og:url" content="${url}" />
<meta property="og:image" content="${entry.heroImage}" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1" />
<meta name="theme-color" content="#14573a" />
<meta http-equiv="content-language" content="en-GB" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../assets/css/styles.css" />
<link rel="icon" type="image/svg+xml" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><circle cx='16' cy='16' r='16' fill='%2314573a'/><path d='M10 22c0-4 2-7 6-7s6 3 6 7' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/><circle cx='16' cy='11' r='3' fill='white'/></svg>" />

<script type="application/ld+json">
{"@context":"https://schema.org","@graph":[
{"@type":"Article","headline":"${entry.title}","description":"${entry.metaDescription}","author":{"@type":"Organization","name":"Sandwich Hedges & Tree Services"},"publisher":{"@id":"${SITE}/#business"},"image":"${entry.heroImage}","datePublished":"${TODAY}","dateModified":"${TODAY}","mainEntityOfPage":"${url}","inLanguage":"en-GB"},
{"@type":"BreadcrumbList","itemListElement":[
{"@type":"ListItem","position":1,"name":"Home","item":"${SITE}/"},
{"@type":"ListItem","position":2,"name":"How-To Guides","item":"${SITE}/how-to/"},
{"@type":"ListItem","position":3,"name":"${entry.h1}","item":"${url}"}]}
]}
</script>
<meta name="geo.region" content="GB-KEN" />
<meta name="geo.placename" content="Sandwich, Kent" />
<meta name="geo.position" content="51.2720;1.3403" />
<meta name="ICBM" content="51.2720, 1.3403" />
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${GA4}"></script>
<script>
window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${GA4}');
</script>
</head>
<body>

<header class="site-header">
  <div class="container">
    <nav class="nav" aria-label="Primary">
      <a class="brand" href="../index.html" aria-label="Sandwich Hedges & Tree Services, home">
        <span class="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 18c0-3 1.5-5 4-5"/><path d="M19 18c0-3-1.5-5-4-5"/><path d="M12 13V5"/><path d="M9 5c0-1.5 1.3-3 3-3s3 1.5 3 3"/><path d="M4 18h16"/></svg>
        </span>
        <span>Sandwich Hedges &amp; Tree Services<span class="brand-sub">Hedge care & tree work · East Kent</span></span>
      </a>
      <button class="nav-toggle" aria-expanded="false" aria-controls="primary-menu" aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></svg>
      </button>
      <ul class="nav-links" id="primary-menu">
        <li><a href="../index.html">Home</a></li>
        <li class="nav-dropdown"><button type="button">Services</button>
          <ul class="nav-dropdown-menu">
            <li><a href="../services/hedge-trimming.html">Hedge Trimming</a></li>
            <li><a href="../services/overgrown-hedge-rescue.html">Overgrown Hedge Rescue</a></li>
            <li><a href="../services/tree/">Tree Services</a></li>
          </ul></li>
        <li><a href="../areas/index.html">Areas</a></li>
        <li><a href="index.html" class="active">How-To Guides</a></li>
        <li><a href="../about.html">About</a></li>
        <li><a href="../contact.html">Contact</a></li>
        <li style="display:flex;align-items:center;"><span style="display:inline-block;background:var(--gold,#c9a961);color:#fff;padding:.15rem .5rem;border-radius:.25rem;font-size:.82rem;font-weight:600;">5% off for pensioners</span></li><li class="nav-cta"><a class="btn btn-primary" href="tel:+447449303889">Call 07449 303889</a></li>
      </ul>
    </nav>
  </div>
</header>

<main>

<section class="page-header">
  <div class="container">
    <nav class="breadcrumbs" aria-label="Breadcrumb">
      <a href="../index.html">Home</a> · <a href="index.html">How-To Guides</a> · <span>${entry.h1}</span>
    </nav>
    <span class="eyebrow">${entry.eyebrow}</span>
    <h1>${entry.h1}</h1>
    <p class="lede">${entry.lede}</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <article class="article">
      <div class="article-meta">
        <span>${entry.updatedLabel}</span>
        <span>By Richard &amp; the Sandwich Hedges &amp; Tree Services team</span>
      </div>

      <div class="article-hero">
        <img src="${entry.heroImage}" alt="${entry.heroAlt}" loading="eager" />
      </div>

${sectionsHtml}

      <div class="article-callout">
        <h4>${entry.calloutTitle}</h4>
        <p>${entry.calloutBody}</p>
      </div>

      <h2>Related guides</h2>
      <div class="howto-grid" style="margin-top:1.5rem;">
${relatedHtml}
      </div>

    </article>
  </div>
</section>

</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <div class="footer-brand">Sandwich Hedges &amp; Tree Services</div>
        <p class="footer-tagline">A proper haircut for your hedges. Sandwich, Deal and the villages of East Kent, trimmed by your neighbours.</p>
        <p class="footer-phone">📞 07449 303889</p>
        <p style="font-size:0.9rem; margin-top:0.25rem;">Receptionist · 07888 868590</p>
      </div>
      <div class="footer-col">
        <h4>Services</h4>
        <ul>
          <li><a href="../services/hedge-trimming.html">Hedge Trimming</a></li>
          <li><a href="../services/overgrown-hedge-rescue.html">Overgrown Hedge Rescue</a></li>
            <li><a href="../services/tree/">Tree Services</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Areas we cover</h4>
        <ul>
          <li><a href="../areas/sandwich.html">Sandwich</a></li>
          <li><a href="../areas/deal.html">Deal</a></li>
          <li><a href="../areas/worth.html">Worth</a></li>
          <li><a href="../areas/ash.html">Ash</a></li>
          <li><a href="../areas/woodnesborough.html">Woodnesborough</a></li>
          <li><a href="../areas/eastry.html">Eastry</a></li>
          <li><a href="../areas/sandwich-bay.html">Sandwich Bay</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <ul>
          <li><a href="../about.html">About Richard</a></li>
          <li><a href="index.html">How-to guides</a></li>
          <li><a href="../gallery.html">Gallery</a></li>
          <li><a href="../contact.html">Contact</a></li>
          <li><a href="mailto:hello@sandwichhedges.co.uk">Email us</a></li>
        </ul>
      </div>
    </div>
    <div class="footer-bottom">
      <span>© <span id="yr"></span> Sandwich Hedges &amp; Tree Services. All rights reserved.</span>
      <span>Sandwich · Kent · United Kingdom · <a href="../privacy.html">Privacy</a></span>
    </div>
  </div>
</footer>

<script src="../assets/js/main.js"></script>
<script>document.getElementById('yr').textContent = new Date().getFullYear();</script>
</body>
</html>
`;
}

function insertIndexCard(entry) {
  const indexPath = join(howToDir, "index.html");
  let html = readFileSync(indexPath, "utf8");
  if (html.includes(`href="${entry.slug}.html"`)) return;
  const crlf = html.includes("\r\n");
  let card = `      <a class="howto-card" href="${entry.slug}.html" data-howto-cat="${entry.filterCat}">
        <span class="howto-tag">${entry.filterTag}</span>
        <h3>${entry.h1}</h3>
        <p>${entry.lede}</p>
        <span class="howto-read">Read the guide</span>
      </a>

`;
  if (crlf) card = card.replace(/\r?\n/g, "\r\n");
  const marker = crlf
    ? "    </div>\r\n\r\n    <div class=\"article-callout\""
    : "    </div>\n\n    <div class=\"article-callout\"";
  if (!html.includes(marker)) throw new Error("howto-grid close marker shape changed, aborting rather than guessing");
  html = html.replace(marker, card + marker);
  writeFileSync(indexPath, html);
}

function updateSitemap(entry) {
  const sitemapPath = join(root, "sitemap.xml");
  let xml = readFileSync(sitemapPath, "utf8");
  const url = `${SITE}/how-to/${entry.slug}.html`;
  if (xml.includes(url)) return;
  const closeTag = xml.includes("\r\n</urlset>") ? "\r\n</urlset>" : "\n</urlset>";
  const eol = closeTag.startsWith("\r") ? "\r\n" : "\n";
  xml = xml.replace(closeTag, `${eol}  <url><loc>${url}</loc></url>` + closeTag);
  writeFileSync(sitemapPath, xml);
}

const dataFiles = readdirSync(dataDir).filter((f) => f.endsWith(".json"));
let created = 0;
for (const f of dataFiles) {
  const entry = JSON.parse(readFileSync(join(dataDir, f), "utf8"));
  const outPath = join(howToDir, `${entry.slug}.html`);
  if (existsSync(outPath)) {
    console.log(`skip (exists): ${entry.slug}`);
    continue;
  }
  const html = page(entry);
  const crlf = readFileSync(join(howToDir, "index.html"), "utf8").includes("\r\n");
  writeFileSync(outPath, crlf ? html.replace(/\r?\n/g, "\r\n") : html);
  insertIndexCard(entry);
  updateSitemap(entry);
  console.log(`created: ${entry.slug}`);
  created++;
}
console.log(`Done. ${created} new page(s).`);
