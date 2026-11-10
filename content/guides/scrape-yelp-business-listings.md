---
title: "How To Scrape Yelp Business Listings into Excel"
description: "Turn a Yelp search into a spreadsheet of businesses with rating, review count, categories, neighborhood and link, across every page of results."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-yelp-business-listings
# Facts checked against chrome-extension-source on 2026-11-10: Yelp has a setup for search results on yelp.com, yelp.ca and yelp.co.uk: one row per [data-testid="serp-ia-card"], next page by "a.next-link": configs-prod/yelp.json (same in public/site-sitemaps)
# Facts checked against chrome-extension-source on 2026-11-10: Yelp columns Business Name, Business URL, Image Preview, Image URL, Rank, Rating, Review Count, Categories, Neighborhood, Price Level, Open Status, Highlights, Review Snippet / Ad Text, Sponsored; no phone or website column: configs-prod/site-column-mappings/yelp.com.json, lib/platform/hooks/yelp.ts
# Facts checked against chrome-extension-source on 2026-11-10: sponsored cards get Sponsored "Yes" and no Rank (only organic results are numbered): lib/platform/hooks/yelp.ts
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page", "Rescan page", "Collect more pages", "Next button ready", "Change", "Stop after" 5/10/20/All pages/Custom (default 5), "Collect from N pages": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: files write Rating and Review Count as numbers (Settings > Results, on by default): DECISIONS.md D-033, lib/utils/fileNumbers.ts
# Facts checked against chrome-extension-source on 2026-11-10: a contacts run reads the address given plus one same-site Contact or About page, so a Yelp business page gives Yelp's page, not the business's site: lib/content/contactExtraction.ts (findDeepScanUrl)
# Facts checked against chrome-extension-source on 2026-11-10: Google Maps searches can add emails from each business's website in the same run: products/web-scraper-pro.md (D-022, D-024, D-026)
faq:
  - q: "Is there a free Yelp scraper?"
    a: "Web Scraper Pro is free, with no paid plan and no account to create. Open a Yelp search in Chrome, pick the list in the side panel, and collect every page of results."
  - q: "Does Yelp allow scraping?"
    a: "Yelp's terms restrict automated collection, and the extension collects only what the page shows you, at a person's pace. Collect for your own research or prospecting, keep it to public listings, and read the terms before reusing anything. See our plain-words explainer on web scraping and the law."
  - q: "Which columns do I get from Yelp?"
    a: "The extension has a ready-made Yelp setup for search results: Business Name, Business URL, Rank, Rating, Review Count, Categories, Neighborhood, Price Level, Open Status, Highlights, Review Snippet / Ad Text, Sponsored, and the image. A column stays out when no card on the page shows it."
  - q: "Can I get phone numbers and emails for the businesses on Yelp?"
    a: "Not from the search results: Yelp's result cards show neither the phone nor the website, so the setup has no column for them. For a lead list with websites and emails, a Google Maps search is the better source."
  - q: "Can I scrape Yelp reviews with this?"
    a: "This guide collects the search results, one row per business, with a review snippet. The Yelp setup covers search results only, so on a business's own page the columns are named from the page; check a small run first."
  - q: "Are sponsored results marked?"
    a: "Yes. The Sponsored column reads Yes on sponsored cards, and those cards have no Rank. Filter them out on the results page."
---

Search Yelp for a category in a city, and Web Scraper Pro collects every page of results into one spreadsheet. The extension's Yelp setup names the columns for you: business name, rank, rating, review count, categories, neighborhood, price level and the business's Yelp link. The sheet is ready for market research or a first list of prospects.

## Does Yelp Allow Scraping?

Yelp's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser, at a person's pace. Collect for your own research or prospecting, keep it to public business listings, and read [Is web scraping legal?](/web-scraping-legal) before reusing anything; it isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A Yelp search, on yelp.com, yelp.ca or yelp.co.uk, with the filters you want set: category, city or neighborhood, open now, price.

## What You Get

Each business in the results becomes one row. The column names come from the extension's Yelp setup, so they are the same on every search. Sample data: the business is made up.

| Column | Example |
|---|---|
| Business Name | Sample Plumbing Co. |
| Business URL | yelp.example/biz/sample-plumbing-co |
| Rank | 1 |
| Rating | 4.5 |
| Review Count | 212 |
| Categories | Plumbing, Water Heater Installation |
| Neighborhood | Downtown |
| Price Level | $$ |
| Open Status | Open until 6:00 PM |
| Highlights | Locally owned |
| Review Snippet / Ad Text | Fixed our leak the same day… |
| Sponsored | Yes on sponsored cards, otherwise empty |
| Image Preview, Image URL | The business's photo and its address |

A column stays out when no card on the page shows that detail. Yelp's result cards don't show a phone number or website, so the setup has no column for them.

## Step 1 — Running the Search on Yelp

In this step you set up the search, because the extension collects what the page shows. Go to Yelp, search for a category in a city, such as plumbers in Springfield, and apply the filters you want.

Narrow the search now rather than later, with a precise category or a smaller area. With the results on screen, you're ready to pick the list.

## Step 2 — Picking the List in the Side Panel

Here you tell the extension which list on the page to collect. Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, each list shows as a card with the number of items on this page.

![](visual:ext/list-tab-detected)

Hover a card and its list is outlined on the page. Pick the card whose count matches the businesses in the results.

If no card is the results, click **Choose an item on the page** and click one business; similar ones are picked with it. The list is chosen, so next you say how far to go.

## Step 3 — Collecting Every Page

This step follows the results across pages. Under **How much to collect**, choose **Collect more pages**. The Yelp setup knows Yelp's next-page link, so the panel shows **Next button ready** when it finds it; if it picked the wrong control, click **Change** and click Yelp's own next-page link.

Under **Stop after**, keep **5 pages**, pick another count, or choose **All pages** for the whole search. Click **Collect from N pages**.

![](visual:ext/list-tab-more-pages)

If Yelp shows a verification page, complete the check in the tab, click **Rescan page** at the top of the List tab, and collect again from the page you're on. When the run finishes, the results page opens.

## Step 4 — Reviewing the Table

Now you check what came back. The results page shows one row per business, in the order Yelp shows them.

![](visual:ext/results-yelp)

Sponsored cards read Yes in the Sponsored column and have no Rank. Click **Filter rows** to leave them out. Hover any header to rename it with the pencil.

The table is clean, so the next step exports it.

## Step 5 — Exporting to Excel

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. With the default setting, files write Rating and Review Count as numbers, so your sheet can sort and average them. The collection stays in History.

![](visual:ext/results-export-menu)

The export holds the rows and columns shown. Here is what a few rows look like. Sample data: the businesses and numbers are made up.

| Business Name | Rank | Rating | Review Count | Categories | Neighborhood |
|---|---|---|---|---|---|
| Sample Plumbing Co. | 1 | 4.5 | 212 | Plumbing | Downtown |
| Example Pipe & Drain | 2 | 4.2 | 87 | Plumbing, Drain Cleaning | Riverside |
| Test Northside Plumbers | 3 | 4.8 | 1034 | Plumbing, Water Heaters | Northside |

## Adding Phones and Emails

Yelp's search results don't carry each business's phone or website, and an email comes only from the business's own website. A contacts run over the Business URL column would read Yelp's pages, not the businesses' sites, so it isn't the route here.

For a lead list with websites and emails, a Google Maps search of the same category and city gives each business's website and phone, and the extension can read each website's emails in the same run. Those how-tos live on [mapsscraper.pro](https://mapsscraper.pro).

## When It Goes Wrong

**The run stopped after a few pages.** Yelp may have asked for a verification. Complete the check in the tab, click **Rescan page**, and collect again from the page you're on. History keeps the first run.

**Only the first page came back.** **This page only** collects one page. Choose **Collect more pages** and set **Stop after** before you click Collect.

**The List tab found the wrong list.** Pick the card whose count matches the businesses in the results, or click **Choose an item on the page** and click one business.

**A business has no Rank.** It's a sponsored card; its Sponsored column reads Yes.

## Conclusion

You collected a Yelp search into a spreadsheet with every page of results, with ratings, review counts and categories in named columns. The same steps work on other directories with a ready-made setup; see [the Yellow Pages page](/scrapers/yellow-pages). The [lead generation page](/use-cases/lead-generation) has the whole workflow from search to outreach.
