# Site structure

This is the plan for every section of webscraper.pro beyond the homepage: which pages exist, what
each one is for, and in what order to build them. Quality rules are in `docs/content-standards.md`,
writing rules in `docs/writing-style.md`, and product facts in `docs/personas.md`.

**Status key:**

| Status | Meaning |
|---|---|
| ✅ live | Built and published |
| 🟢 ready | The feature is in the released extension, so the page can be built now |
| ⚪ later | Needs something that doesn't exist yet (a price, a verified cloud, test results) |

## 0. How pages are added (built to grow)

- **One registry:** `config/pages.ts` lists every feature, use-case and scraper page, with a `status`
  (`live`, `soon`, `hold`, `planned`). The header's Product menu, the footer, `app/sitemap.ts` and
  "Related" links are all built from it. Only `live` and `soon` pages are shown or linked anywhere.
- **Local preview:** on `next dev`, the menus also show unbuilt pages, greyed out with their status, so
  the whole structure can be reviewed. Production builds never show them (`showPlannedPages`).
- **Templates, not one-off pages:** a feature page is a content file (`content/features/<slug>.ts`,
  typed by `FeaturePageContent`) rendered by `components/pages/FeaturePage.tsx`, plus a 3-line route
  in `app/(main)/<slug>/page.tsx`. The use-case and scraper templates follow the same pattern.
- **Adding a feature:** add or flip its registry entry, write its content file (with the source-code
  references its facts were checked against), add the route, and link it from at least one existing
  page.
- **URLs describe what a feature does**, never where it runs, so a feature that later gains a cloud
  mode keeps its URL and gets a new section. Don't rename a published URL. If one has to move, 301
  it and update the internal links.

## 1. Navigation

| Menu | Holds |
|---|---|
| **Product** | The feature pages (§2) and the Cloud page |
| **Use cases** | The use-case pages (§3) |
| **Sites** | The `/scrapers` directory (§4). The menu says "Sites" because "scrapers" is jargon; the URL keeps the search term. |
| **Resources** | Guides, developer docs, blog, comparisons, what's new, "Is web scraping legal?", your data and privacy, seller calculators, support |
| **Pricing** | The pricing page |
| **Add to Chrome** | The CTA button |

The footer repeats every hub. Every page links back to its hub (see `content-standards.md` §5).

## 2. Product pages: one page per feature

Template: **feature page**. It covers:
- What it does, in one sentence.
- A screenshot or short loop.
- The fields it returns, as a table.
- A sample output table.
- How it works, in 3 steps.
- Limits.
- 2–3 use cases, each linking to its use-case page.
- An FAQ.
- A link to the matching guide.

| Page | URL | Feature (extension) | Status |
|---|---|---|---|
| Lists from any website | `/list-scraper` | Auto-detects lists; collects every page of results, load-more, infinite scroll | 🟢 |
| Google Maps leads | `/maps-leads` | Collects places from Google Maps and Bing Maps, up to a chosen count | ✅ |
| Emails and contacts | `/email-extractor` | Emails, phones and social links from a page or many sites; optional deep scan of the Contact/About page | 🟢 |
| Bulk URLs | `/bulk-scraper` | Paste or upload URLs, or reuse a saved table; list, maps, contacts or text mode per site | 🟢 |
| Product details and reviews | `/product-scraper` | One product page's details, variants, images and videos; all reviews across pages | 🟢 |
| Page text for AI | `/page-text` | Clean page text plus title, description, author and date; Word export | 🟢 |
| Image downloader | `/image-downloader` | Finds a page's images and downloads them as a ZIP | 🟢 |
| Data Viewer and exports | `/export-to-google-sheets` | Edit, filter and sort; export to Google Sheets, Excel, CSV or JSON | 🟢 |
| Shopify store export | `/shopify-scraper` | Full catalog, variants, images, Shopify import CSV | 🟢 |
| Chat | `/ai-chat` | Ask for data in plain words; runs the same collectors locally | 🟢 |
| MCP and AI agents | `/mcp` | Browser Relay tools; cloud MCP tools come later | 🟢 |
| Cloud | `/cloud` | Cloud runs, 200-URL batches, scheduling, REST API | ⚪ (a "coming soon" page is fine now) |

## 3. Use-case pages: one per job

Template: **use-case page**. It covers:
- The job, in the reader's own words.
- The workflow from start to finish, across the features it uses.
- Which sites.
- A sample output table.
- What it can't do.
- Links to the feature and scraper pages involved.
- An FAQ.

Each page's persona is from `docs/personas.md`.

| Page | URL | Persona | Features involved | Status |
|---|---|---|---|---|
| Lead generation | `/use-cases/lead-generation` | Arjun | Google Maps leads, then contacts on those websites, bulk runs, directories (Yelp, YellowPages, BBB, Manta, Clutch…) | 🟡 drafted 2026-10-21 |
| Real estate | `/use-cases/real-estate` | Maria | Listings from Zillow, Redfin, Realtor, Rightmove, Zoopla, Property Finder | 🟡 drafted 2026-10-21 |
| E-commerce and price research | `/use-cases/ecommerce` | Priya | Marketplace lists, product details, reviews, bulk | 🟡 drafted 2026-10-21 (no scheduled price checks until cloud) |
| Freelance data work | `/use-cases/freelance-data-work` | Rina | Lists from any website, contacts, bulk runs, column clean-up, exports | 🟡 drafted 2026-10-21 |
| Reviews and reputation | `/use-cases/reviews` | Priya, Wei | Dropped 2026-10-21: Google Maps returns no review text, G2's review flow is unverified, and product reviews are covered on the product details page. Revisit when a review site has a verified run. | ⬜ dropped |
| Job postings | `/use-cases/job-postings` | Sam | Dropped 2026-10-21: Monster's pack is generic and no job board has a verified setup, so the page would say nothing site-specific. Revisit with a verified board. | ⬜ dropped |
| Research and AI datasets | `/use-cases/research` | Wei | Scholar, page text, any list | 🟡 drafted 2026-10-21 |
| Travel and hospitality | `/use-cases/travel` | — | Booking, Hotels, Tripadvisor | 🟡 drafted 2026-10-21 |
| Shopify agencies and dropshipping | `/use-cases/shopify` | Kai | Shopify export, import CSV | 🟡 drafted 2026-10-21 |

The hub at `/use-cases` lists them all.

## 4. Scrapers directory and per-site pages

- `/scrapers` is the hub. It's grouped by category, as in the homepage `Sites.tsx`, and becomes the
  shared data source for both.
- `/scrapers/<site>` gets a page **only for sites with a tuned, verified setup** (see
  `content-standards.md` §3, scaled content abuse).
- **Template:**
  - What you get from this site.
  - The real fields.
  - A sample data table.
  - 3–4 steps.
  - Site-specific notes (sign-in, paging, limits).
  - A screenshot from a real run.
  - A "Last verified" date.
  - Related scrapers.
  - A link to the use-case page.
- Build the first batch around lead-gen and real-estate sites. Add more only after the previous
  batch has been reviewed by hand.
- Status: 🟢 once each site's setup is re-verified on the released extension.

## 5. Resources

| Section | URL | What | Status |
|---|---|---|---|
| Guides | `/guides/<slug>` | DigitalOcean-style tutorials, one per task ("How To Build a Lead List of Plumbers from Google Maps"). Each feature and use-case page links to at least one. | 🟢 |
| Blog | `/blog/<slug>` | News, explainers, comparisons. Posts live under `/blog/<slug>`; the first post (1.3.0 release) is up. | ✅ 2026-10-21 |
| Compare | `/compare/<slug>` | One page per competitor ("Web Scraper Pro vs X"), fair and dated. The list of competitors lives outside this repo. First page: webscraper.io. | ✅ 2026-10-21 |
| Free tools | `/tools` | The existing e-commerce calculators. Add scraping-related tools over time. | ✅ |
| What's new (changelog) | `/changelog` | One entry per release, from DECISIONS.md | ✅ 2026-10-21 |
| Is web scraping legal? | `/web-scraping-legal` | Neutral and sourced, "not legal advice" | ✅ 2026-10-21 |
| Developer docs | `/docs` | Dropped from the registry 2026-10-21 until the cloud launch; `/mcp` and `/cloud` carry the coming-soon story. | ⬜ with cloud |

## 6. Company and trust

| Page | URL | Status |
|---|---|---|
| Pricing | `/pricing` | ⚪ Waiting on billing. Hidden until then: no nav, footer or homepage section, and `/pricing` redirects to the homepage. |
| Privacy and your data | `/privacy` | Dropped 2026-10-21: the privacy policy and the "What chat sends to our servers" section on `/ai-chat` cover it; a second page would duplicate both. | ⬜ dropped |
| About | `/about` | 🟢 |
| Get help (support form) | `/support` | ✅ In the top bar and footer. Files a private ticket in the admin app's support inbox; the extension's Support links open it filled in. Replaced the contact page on 2026-10-01: `/contact` redirects here. |
| Terms, Privacy policy | `/terms-of-service`, `/privacy-policy` | ✅ |

## 7. Build order

1. Nav and footer for the new menus, plus the **feature page template**, starting with Google Maps leads.
2. The other 🟢 feature pages.
3. The use-case template and the 🟢 use-case pages.
4. The `/scrapers` hub, a shared sites data file, and the first per-site pages.
5. Guides (one for each feature and use-case page), the changelog, and the legal explainer.
6. Compare pages.
