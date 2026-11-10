---
title: "How To Scrape Amazon Best Sellers into a Spreadsheet"
description: "Turn an Amazon Best Sellers category into a spreadsheet with rank, name, price, rating, review count and link, across every page of the ranking. No code."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: [amazon]
video: ""
campaign: guide-scrape-amazon-best-sellers
# Facts checked against chrome-extension-source on 2026-11-10: the Amazon setup names Best Sellers columns Rank (zg-bdg-text), Product Name (p13n-sc-truncate), Price (p13n-sc-price), Rating (a-icon-alt), Review Count (a-size-small), Product URL (a-link-normal), Product Reviews URL (a-link-normal_2), Image Preview, Image URL: configs-prod/site-column-mappings/amazon.com.json (same in public/site-sitemaps)
# Facts checked against chrome-extension-source on 2026-11-10: ASIN is a product-page column only, not a list column: configs-prod/site-column-mappings/amazon.com.json (pageType pdp)
# Facts checked against chrome-extension-source on 2026-11-10: the Amazon setup's next-page selectors include "ul.a-pagination li.a-last a"; whether a Best Sellers page matches is not confirmed by a run, so the guide gives the Change fallback: configs-prod/amazon.json
# Facts checked against chrome-extension-source on 2026-11-10: "How much to collect", "This page only", "Collect more pages", Next page / Load more / Auto scroll, "Next button ready", "Change", "Stop after" 5/10/20/All pages/Custom (default 5), "Collect from N pages", "Collect to end": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page", "Rescan page": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: files write Price, Rating and Review Count as numbers (Settings > Results, on by default): DECISIONS.md D-033, lib/utils/fileNumbers.ts
# Facts checked against chrome-extension-source on 2026-11-10: Export as offers Google Sheets, Microsoft Excel, CSV, JSON; History keeps each collection: lib/tools/helpTopics.json, lib/db/historyService.ts
faq:
  - q: "How do I scrape Amazon Best Sellers without code?"
    a: "Open a Best Sellers category in Chrome, open the side panel's List tab, pick the product list, choose Collect more pages, and click Collect. The rows come back with the Amazon setup's columns: Rank, Product Name, Price, Rating, Review Count and Product URL."
  - q: "Why did I get fewer products than the page lists?"
    a: "The extension collects what the page has loaded. If the page loads more products as you scroll, scroll to the bottom before you collect, or choose Auto scroll under Collect more pages."
  - q: "Can I get the whole ranking, not only the first page?"
    a: "Yes. Choose Collect more pages and set Stop after to the number of pages the ranking shows at the bottom, or All pages. Every page is collected into one table."
  - q: "Can I track rank changes week by week?"
    a: "Collect the same category each week; every collection is saved in History with its date. Export each one and compare the Rank column by Product URL in your spreadsheet. Runs that happen on their own are coming soon with the cloud."
  - q: "Does it work on New Releases and Movers & Shakers?"
    a: "Try the same steps there. The Amazon setup names the columns wherever the page uses the same layout as Best Sellers; where it doesn't, the columns are named from the page, so check them on a short first run."
  - q: "Is scraping Amazon Best Sellers allowed?"
    a: "The ranking is public, but Amazon's terms restrict automated collection and the product images and text are Amazon's. Collect for your own research and read our explainer on web scraping and the law. It isn't legal advice."
---

Amazon's Best Sellers pages rank the most popular products in every category, but there's no download button. Web Scraper Pro collects the ranking from the page you have open, every page of it, into a spreadsheet. The extension's Amazon setup names the columns for you: Rank, Product Name, Price, Rating, Review Count and Product URL.

## Does Amazon Allow Scraping?

The ranking is public and you collect it from the page you can see, in your own browser, at a person's pace. Amazon's terms restrict automated collection, and the product images and text are Amazon's, so collect for your own research and check the terms before reusing anything. Our page [Is web scraping legal?](/web-scraping-legal) explains the rules in plain words; it isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- An Amazon Best Sellers category page, on any of Amazon's country stores. From the Best Sellers home, click into the category you want, as deep as you need.

## What You Get

Each product in the ranking becomes one row. The column names come from the extension's Amazon setup, so they are the same on every Best Sellers category. Sample data: the product and numbers are made up.

| Column | Example |
|---|---|
| Rank | #7 |
| Product Name | Sample Trail Runner 2 Shoes |
| Price | 89.00 |
| Rating | 4.6 |
| Review Count | 1,204 |
| Product URL | amazon.example/dp/B0EXAMPLE1 |
| Product Reviews URL | amazon.example/product-reviews/B0EXAMPLE1 |
| Image Preview, Image URL | The product's picture and its address |

A column stays out when no product on the page shows that detail. The ASIN isn't a list column; it's part of each Product URL, after `/dp/`.

## Step 1 — Opening the Best Sellers Category

In this step you open the ranking and make sure the whole first page is loaded. Go to Amazon's Best Sellers and click into a category, then into a subcategory if you want a narrower ranking.

Scroll to the bottom of the page once. The extension collects what the page has loaded, and some Best Sellers pages load more products as you scroll.

The category is open with its first page loaded. Next, you pick the ranking in the side panel.

## Step 2 — Picking the Ranking in the Side Panel

Here you tell the extension which list on the page to collect. Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with the number of items on this page.

Hover a card and its list is outlined on the page. Pick the card whose count matches the products in the ranking.

![](visual:ext/list-tab-amazon-best-sellers)

If no card is the ranking, click **Choose an item on the page** and click one product; similar products are picked with it. The list is picked, so next you tell the extension to follow the ranking onto its next pages.

## Step 3 — Collecting Every Page of the Ranking

Under **How much to collect**, choose **Collect more pages**. The Amazon setup knows Amazon's Next page link, so the panel shows **Next button ready** when it finds it.

If the panel asks how the page continues instead, choose **Next page**. If it picked the wrong control, click **Change** and click the ranking's own next-page link at the bottom of the page.

![](visual:ext/list-tab-more-pages)

Under **Stop after**, choose **All pages**, or **Custom** and type the number of pages listed at the bottom of the ranking. Then click **Collect from N pages**.

| You want | Choose |
|---|---|
| The first page of the ranking | **This page only**, after scrolling to the bottom |
| The whole ranking | **Collect more pages**, then **Stop after** set to **All pages** |

## Step 4 — Reading the Results

The results page opens with one row per product, in the order Amazon shows them. The Rank column holds the rank badge shown on each product.

![](visual:ext/results-amazon-best-sellers)

Hover a column header to rename it with the pencil or remove it with the trash icon. Or type in the side panel's chat with the results tab in front:

```
Only rank, product name, price, rating and review count
```

The table now holds the columns you want. Next, you export it.

## Step 5 — Exporting and Keeping a Weekly Snapshot

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. With the default setting, files write Price, Rating and Review Count as numbers, so your sheet can sort and average them. Name the file with the date, such as `best-sellers-sports-2026-11-10.xlsx`.

![](visual:ext/results-export-menu)

Collect the same category next week and export again. Every collection is saved in History with its date, so you can compare the Rank column by Product URL in your spreadsheet.

The file after export looks like this. Sample data: the products and numbers are made up.

| Rank | Product Name | Price | Rating | Review Count |
|---|---|---|---|---|
| #1 | Sample Trail Runner 2 Shoes | 89.00 | 4.6 | 1204 |
| #2 | Sample Ridge Hiking Boots | 129.00 | 4.8 | 532 |
| #3 | Sample Basecamp Socks, 3 Pack | 18.00 | 4.7 | 2045 |

## When It Goes Wrong

**Fewer rows came back than the page lists.** The page hadn't loaded all its products. Scroll to the bottom before you collect, or choose **Auto scroll** under **Collect more pages**.

**Only the first page was collected.** **This page only** collects one page. Choose **Collect more pages** and set **Stop after** before you click Collect.

**The Next link wasn't found.** Click **Change** and click the ranking's own next-page link at the bottom of the page.

**Amazon showed a verification page.** Complete it in the tab, click **Rescan page** at the top of the List tab, and collect again from the page you're on.

## Conclusion

You collected a Best Sellers category into a spreadsheet, every page of it, with a dated file you can compare against next week's. For a search instead of a ranking, see the [Amazon scraper page](/scrapers/amazon). For the full details and reviews of one product on the list, open it and use the Properties tab, described on the [product details page](/product-scraper).
