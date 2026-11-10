# Run sheet: what the 45 draft pages wait for (2026-11-10)

**Update, same day (owner's decision):** the drafts no longer wait for runs. 44 of them were reworked against the code
instead: every column, button and setting checked against `configs-prod` and the extension source (cited in each
file's facts comments), run figures and "tested on" lines removed, example tables labelled Sample data, and behaviour
on sites without a setup written conditionally with a fallback. They stay `status: draft` until the owner approves each
one. The runs below are now an upgrade: they add screenshots (already referenced, shown once taken) and, on site pages,
`lastRun`. `pull-prices-from-website-into-excel` is someone else's draft and wasn't touched.

Every draft on this site is already written. It stays a draft until a real run of the released extension (1.3.0 or
later) confirms what it says and supplies its screenshots. This sheet is the whole list, grouped into four sittings so
each site is opened once. Screenshots are taken into the library in
`chrome-extension-source/web_store_assets/visuals/` (`manifest.json`: id, scenario, alt text, caption; set
`status: done` and `capturedOn`, then run `sync.mjs`). Pages refer to captures by id and show them once synced.

**The drafts:** 22 guides, 4 blog posts, 12 site pages (`/scrapers/*`), 7 use cases. 42 of them use captures (49
distinct ids); 3 blog posts need only a review. The manifest has an entry for every id the pages use (`ext/list-tab-bbb`, `ext/list-tab-justdial` and
`ext/results-yellowpages` added 2026-11-10).

**Who runs them:** a person. The extension's side panel is part of Chrome's own window, which browser automation can't
reach, and Claude in Chrome can't open `chrome-extension://` pages (tried 2026-11-10).

## For every run, record
- The date, the extension version, the exact search or URL.
- Rows collected, pages followed, minutes taken, and the column names exactly as the results page shows them.
- Anything that differs from what the page says (a column missing, paging that didn't follow, a verification page). A
  page whose run disagrees is fixed or cut before it's published, never published as written.

## Sitting C — contacts, on the local fixtures (about 20 minutes, no outside site)
Serve the fixtures (`node web_store_assets/visuals/serve.mjs`) and follow scenarios C1–C7 in the manifest:
`site-contact-page`, `properties-collect-contacts`, `results-contacts-one-site`, `bulk-menu`, `bulk-upload`,
`bulk-contacts-config`, `bulk-run`, `bulk-overview`, then `bulk-detect` (B) from the same run.
**Unblocks (with A):** extract-phone-numbers-from-a-website; part of get-emails-from-google-search-results,
scrape-a-list-then-every-detail-page, scrape-indeed-job-postings, scrape-news-headlines-and-articles,
scrape-yelp-business-listings; use case research.

## Sitting A — chat and the results page (about 30 minutes)
Scenarios A1–A7 in the manifest. The ones draft pages use: `panel-chat-empty`, `results-arranged`,
`results-filtered-leads`, `results-add-contacts`, `results-export-menu`. A2–A4 are a Maps run ("Find dentists in
Austin", 50): they serve as the table the A5–A7 shots work on; webscraper.pro shows no Maps how-to.
**Unblocks (with B):** most guides and all use cases need one of these.

## Sitting B — lists on real sites (about 2 hours; the biggest)
Store category (books.toscrape.com or any store): `list-tab-detected`, `list-tab-more-pages`,
`list-tab-pagination-choice`, `results-many-pages`, `results-rename-column`, `chat-collect-every-page`.
Then one site each, 3 pages, results scrolled to the left edge, and **record the columns** for the site page's
`lastVerified`:

| Site | Captures | Site page it verifies |
|---|---|---|
| Yellow Pages, dentists in Austin, TX | `list-tab-yellowpages`, `results-yellowpages` | /scrapers/yellow-pages |
| BBB and Justdial, one category and city each | `list-tab-bbb`, `list-tab-justdial` | /scrapers/bbb, /scrapers/justdial |
| Amazon, "trail running shoes" | `list-tab-amazon`, `results-amazon` | /scrapers/amazon |
| eBay, Etsy, Walmart, one search each | `results-ebay`, `results-etsy`, `results-walmart` | their three pages |
| Zillow, one zip code, for sale | `list-tab-zillow`, `results-zillow` | /scrapers/zillow |
| Rightmove, two-bedroom flats | `results-rightmove` | /scrapers/rightmove |
| Hotels.com, two nights in a city | `results-hotels` | /scrapers/hotels-com |
| Scholar, any topic | `list-tab-scholar`, `results-scholar` | /scrapers/scholar |
| YouTube, a search to the end of the first scroll | `results-youtube` | /scrapers/youtube |
| A public Shopify store, per variant | `shopify-store-card`, `results-shopify-variants` | use case shopify |
| A careers page with a dozen roles | `list-tab-careers` | guide collect-job-postings |
| A documentation article | `page-text-document` | blog what-is-web-scraping |

## Sitting D — product pages and the guides that make claims about a site (about 1.5 hours)
Captures: `properties-product-fields`, `list-tab-amazon-best-sellers`, `results-amazon-best-sellers`,
`bulk-use-saved-data`, `list-tab-members-directory` (a directory behind a test sign-in), `list-tab-table`,
`list-tab-news-headlines`, `results-yelp`, `results-booking`.
Each of these guides lists in its front matter exactly what the run must confirm; check each point and note the answer:

| Guide | Confirm |
|---|---|
| scrape-google-search-results | Organic results detected as one list (not ads, "People also ask"); Next page follows; column names; after how many pages Google shows verification |
| get-emails-from-google-search-results | The above, then Bulk → Collect contacts over the Link column: does a deep link still get its site's Contact page read |
| scrape-reddit-posts-and-comments | Post feed detected (not the sidebar); auto scroll; comment list detected and how it continues; column names |
| scrape-trustpilot-reviews | Review list detected (not the sidebar); numbered pages; columns; any verification on a long run |
| scrape-youtube-comments | Comment list detected after load; auto scroll; columns; whether expanded replies come through |
| scrape-amazon-best-sellers | Named columns on Best Sellers pages and whether Rank is its own column; 30 + 20 on scroll; Next to page 2 |
| scrape-a-member-directory-into-a-lead-list | Detection on member cards and table rows on 2–3 real directories; paging used; Use saved data over a website column not named Website |

## After the runs
For each page whose run agrees: put the run's figures in (replacing sample tables where the page says so), set its
date (`lastVerified` on site pages), run the writing system's checks (`run_checks`), and send it to the Editor. It's
published (`status: published`) on the owner's approval there. Batches of about five, in the content plan's order:
lead generation (yellow-pages, bbb, justdial, yelp, member directory, use case lead-generation), then any site and
Excel, then stores and Shopify, then real estate, travel and research.

## No run needed
blog/ai-web-scraping-explained, blog/best-web-scraper-chrome-extensions, blog/why-scrapers-get-blocked: review and
publish. (The best-extensions round-up moves to /compare per `docs/site-structure.md`.)
