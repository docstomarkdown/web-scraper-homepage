# Spam policy review (2026-11-10)

The production build crawled from `/` and the sitemap the way a search crawler reads it: 88 live pages, each page's
main text, titles, robots, schema, links and hidden text, then 6-word phrase overlap between pages. Judged against
Google's spam policies (scaled content abuse, doorway pages, thin content, hidden text, misleading pages, link spam,
structured data). The site is `noindex` today, so none of this costs anything yet; it's what to fix before that comes off.

## Status (2026-11-10, after the fixes; re-crawled: 88 pages, no link to a missing page)
- 1, the calculators: reworked (docs/CALCULATORS_PLAN_2026-11-10.md): 51 listed tools, every one correct, tested and
  sourced; still most of the site's pages, so whether they stay here remains the owner's call.
- 2: fixed. Templates and in-text links list only published guides in production (`getLinkableGuides`, `RichText`);
  `/tools` links `/product-scraper`. A use case's guide list no longer claims screenshots.
- 3: fixed. `/cloud` and `/mcp` are titled as coming soon, `noindex`, and out of the sitemap with every coming-soon page.
- 4: fixed. `/guides` and `/scrapers` are `noindex` while empty; `/blog` and its archives until they hold 3 posts, and the
  sitemap follows; the homepage links `/scrapers` once a site page is live.
- 5: fixed. `Reveal` and the hero slide without fading, so the text is visible in the server HTML. What remains at
  opacity 0 is the hero's chat demo rows (sample data) and the calculators' result panels.
- 6: fixed. "Free" stays in 2 titles (the homepage and the any-site page); the calculators wait on 1.

## To fix, most serious first

| # | Signal | Policy | What the crawl found | Fix |
|---|---|---|---|---|
| 1 | 61 seller calculators | Scaled content abuse; a site's focus | `/tools` is 61 of the 88 live pages (69%): marketplace fees, margins, stock, a time-zone planner. None is about collecting web data, and 61 titles follow one pattern ("ROI Calculator: Free Return on Investment"). Built in a batch in February. Each page's text is its own (11% shared), so this is volume and focus, not copying | The owner's call. Move them to their own site or subdomain, or `noindex` them, or keep only the few that serve the e-commerce use case. As they stand, the site reads as a calculator site with a scraper attached |
| 2 | Links to pages that don't exist | Quality; crawl waste | 7 live pages link to 22 pages that return 404 in production: 21 draft guides and `/use-cases/ecommerce`. `/list-scraper` alone has 13. Cause: `FeaturePage.tsx` and `ScraperPage.tsx` list guides with `getAllGuides()` (drafts included), and `/tools` links an unpublished use case | Use `getGuides()` (published only) in both templates, and link use cases through `publishedHref` |
| 3 | How-to pages for features that don't exist | Misleading, made for search | `/cloud` ("How to Run a Web Scraper on a Schedule, Without Your Browser", 1,310 words) and `/mcp` ("How to Connect Claude or ChatGPT to a Web Scraper with MCP", 1,383 words) answer those searches with a product that can't do it yet. Both say "Coming soon" on the first screen, which helps, but the titles and length are built to rank | Title them as what they are ("Cloud runs, coming soon"), cut each to a short note of what's planned, and `noindex` both until the feature ships |
| 4 | Empty and near-empty hubs | Thin content | `/guides` is 41 words ("The first guides are being written") because every guide is a draft; `/scrapers` is 104 words and none of the 12 site pages is live; `/blog`, `/blog/author/vikram` and `/blog/category/product-updates` show the same single post (52–67% overlap) | Don't list a hub until it has published pages (menu, footer, sitemap); `noindex` author and category archives until there are several posts |
| 5 | Text hidden until JavaScript runs | Hidden text | 75 of 88 pages send headings and paragraphs at `opacity: 0` in the server HTML (the `Reveal` entrance animation). A crawler that doesn't run scripts sees them hidden. mapsscraper.pro already fixed this: 0 of 38 | Render `Reveal` content visible on the server and animate only after hydration, as mapsscraper.pro does |
| 6 | "Free" in 70 of 88 titles | Keyword stuffing pattern | All 61 calculators, and 9 product pages ("…, Free, No Code"). True, but the same word in nearly every title reads as a pattern | Keep it where it is the search (the homepage, the any-site page); drop it from the others |

## Checked and clean
- No rating, review or FAQ structured data: only `Organization` and `WebSite`.
- No `display: none` or off-screen text; screen-reader-only text is about 10 words a page (captions, labels).
- No duplicate titles or descriptions; no page without links in.
- No near-duplicate pages: apart from the blog archives, no two pages share more than 9% of their phrases once the
  header and footer are set aside.
- Redirects are permanent and go where the old page's content went (the Google Maps pages to mapsscraper.pro).
- Links to mapsscraper.pro: 7 pages, in context, never site-wide. Competitor links on the comparisons point at their own pages.
- The Shopify timing claim ("finished in under ten seconds") traces to recorded runs in `SHOPIFY_MODE_PLAN.md`.
- The legal pages share 53–71% with mapsscraper.pro's. Normal for terms and privacy.
