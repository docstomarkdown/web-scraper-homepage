---
title: "How To Scrape Amazon Product Listings into Excel"
description: "Turn an Amazon search or category into a spreadsheet with product name, price, rating, review count and link, across every page of results. No code, in your own Chrome window."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: [amazon]
video: ""
campaign: guide-collect-amazon-search-results
faq:
  - q: "How do I scrape Amazon product data without code?"
    a: "Open the search, pick the list in the side panel, set how many pages, and click Collect. The columns are named by the Amazon setup, so the file is ready to sort by price or rating."
  - q: "Can I collect Amazon product data with Python instead?"
    a: "You can, but Amazon changes its page layout often and blocks scripts that look automated. The extension reads the page in your own browser, so a layout change means a rescan, not a rewrite."
  - q: "Does it work on Amazon in other countries?"
    a: "Yes. The same setup covers Amazon's stores in 21 countries, including .co.uk, .de, .in, .ae and .ca."
  - q: "Can I get each product's full details and reviews?"
    a: "Yes, one product at a time: open the product page and use the Properties tab, which reads the standard fields and collects the reviews across their pages."
  - q: "Can I leave out sponsored products?"
    a: "Yes. Turn on Skip sponsored products in Settings → Results. It's off by default, and sponsored rows carry a Sponsored label so you can filter them later instead."
  - q: "Is scraping Amazon allowed?"
    a: "The product data on a search page is public, but Amazon's terms restrict automated collection, and reusing product images or text needs their permission. Collect what you need for your own research and check the terms before anything else."
---

Search Amazon, pick the results in the side panel, choose how many pages, and click Collect. Web Scraper Pro has a ready-made Amazon setup, so every product arrives as a row with its name, price, rating, review count and link, and the columns are named for you. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Does Amazon Allow Scraping?

Amazon's conditions of use restrict automated collection, and it shows a verification page when many result pages load quickly. This guide reads the search page you have open, in your own browser, at a person's pace, for your own research; keep runs small and don't republish Amazon's images or text. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- An Amazon search or category page, on any of Amazon's country stores.

## Step 1 — Running the search on Amazon

Search for the product type on Amazon as you normally would, such as `trail running shoes`. Apply any filters you want, such as a price range or Prime only. The extension collects what the page shows, so the filters shape the list.

## Step 2 — Picking the list in the side panel

Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, the search results show as **List 1** with the number of products on this page. Hover the card and the results are outlined on the page.

![](visual:ext/list-tab-amazon)

Amazon pages hold other lists too, such as a row of sponsored brands or "customers also bought". If the first card isn't the results, pick the card whose count matches. Or click **Choose an item on the page** and click one product.

## Step 3 — Collecting every page

Choose **Collect more pages**. The Next button is found on its own, so the panel shows **Next button ready**. Under **Stop after**, pick how many pages; a search usually has 7 to 20.

Click **Collect from 5 pages** (or the count you set). Keep the tab in front while it runs; the tab title counts the products as they come in.

![](visual:ext/list-tab-more-pages)

## Step 4 — Reading the results

The results page opens with one row per product. The columns come from the Amazon setup, so they're the same on every search:

| Column | What it holds |
|---|---|
| Product Name, Product URL, ASIN | The listing's title, its link and Amazon's product id |
| Brand | When the listing shows it |
| Price, Original Price, Discount Percentage | The current price, the struck-through price and the gap between them, saved as numbers |
| Coupon, Price With Coupon | When a coupon is shown |
| Rating, Review Count | The star rating and the number of ratings |
| Bought In Past Month | The "N+ bought in past month" line, when shown |
| Delivery Date, Stock | The delivery line and stock notes |
| Sponsored, Badge | Whether the row is an ad, and labels such as Best Seller or Amazon's Choice |
| Image URL | The listing's image |

A column the search never shows stays out of the table. Sponsored rows carry an amber **Sponsored** label.

![](visual:ext/results-amazon)

## Step 5 — Keeping what you need

Hover a column header to rename it with the pencil or remove it with the trash icon. Click **Filter rows** to keep rows by a value. Or type in the side panel's chat with the results tab in front:

```
Only name, price, rating and review count, rows rated above 4, sorted by price
```

## Step 6 — Exporting to Excel

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Prices, ratings and counts are saved as numbers, so the sheet sorts and sums them without clean-up.

![](visual:ext/results-export-menu)

## When it goes wrong

**The price is empty on some rows.** Listings with several sellers or variations show a range or no price on the search card. Open the listing for its price; the cell stays empty rather than guessing.

**Amazon showed a verification page.** Complete it in the tab, click Rescan, and collect again from the page you're on. Collect in smaller runs if it keeps happening.

**Sponsored rows are mixed in.** They carry a Sponsored label. Filter them out on the results page, or turn on Skip sponsored products in Settings → Results before collecting.

**Fewer pages than expected.** Amazon caps a search at 7 to 20 pages whatever the count it shows. Search narrower categories and combine them.

## Conclusion

You collected an Amazon search into a spreadsheet with named columns across every page. To do the same for a list of searches, paste their addresses into Bulk scrape and each one is collected in turn. For one product's full details and its reviews, open the product page and see the product details feature page.
