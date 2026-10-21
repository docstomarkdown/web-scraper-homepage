---
title: "How To Scrape Amazon Best Sellers into a Spreadsheet"
description: "Turn an Amazon Best Sellers category into a spreadsheet with rank, name, price, rating, review count and link, across both pages of the top 100. No code, free."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: [amazon]
video: ""
campaign: guide-scrape-amazon-best-sellers
faq:
  - q: "How do I scrape Amazon Best Sellers without code?"
    a: "Open a Best Sellers category in Chrome, open the side panel's List tab, pick the product list, choose Collect more pages, and click Collect. Both pages of the top 100 come back as rows with rank, name, price, rating and review count."
  - q: "Why does my list stop at 30 products?"
    a: "A Best Sellers page shows 30 products and loads the other 20 as you scroll. Scroll to the bottom of the page before you collect, or choose Auto scroll, and all 50 on the page are picked up."
  - q: "Can I get the top 100, not only the top 50?"
    a: "Yes. The top 100 sits on two pages. Choose Collect more pages and set Stop after to 2 pages, and both are collected into one table."
  - q: "Can I track rank changes week by week?"
    a: "Collect the same category each week; every run is saved in History with its date. Export each one and compare the Rank column by ASIN or product link in your spreadsheet. Runs that happen on their own are coming with the cloud."
  - q: "Does it work on New Releases and Movers & Shakers?"
    a: "Yes. They're lists on the page like Best Sellers, so the same steps apply. The columns come from the page, so check the first run before a long one."
  - q: "Is scraping Amazon Best Sellers allowed?"
    a: "The ranking is public, but Amazon's terms restrict automated collection and the product images and text are Amazon's. Collect for your own research and read our explainer on web scraping and the law. It isn't legal advice."
---

<!--
Draft until these are checked in a real run on 1.3.0 and the screenshots exist:
- That the Amazon setup names the columns on Best Sellers pages the way it does on search pages, and whether Rank comes out as its own column. If not, the guide should say the columns come from the page.
- That a Best Sellers page shows 30 products and loads 20 more on scroll, and that the top 100 sits on two pages with a Next link the extension finds on its own.
- New capture ids used below: ext/list-tab-amazon-best-sellers, ext/results-amazon-best-sellers.
-->

Amazon's Best Sellers pages rank the top 100 products in every category and update through the day, but there's no download button. Web Scraper Pro collects the whole ranking from the page you have open, both pages of it, into a spreadsheet with rank, product name, price, rating, review count and link. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- An Amazon Best Sellers category page, on any of Amazon's country stores. From the Best Sellers home, click into the category you want, as deep as you need.

## Does Amazon Allow Scraping?

The ranking is public and you collect it from the page you can see, in your own browser, at a person's pace. Amazon's terms restrict automated collection, and the product images and text are Amazon's, so collect for your own research and check the terms before reusing anything. Our page [Is web scraping legal?](/web-scraping-legal) explains the rules in plain words; it isn't legal advice.

## What You Get

Each product in the ranking becomes one row.

| Column | Example |
|---|---|
| Rank | 7 |
| Product Name | Trail Runner 2 Men's Shoes |
| Price | 89.00 |
| Rating | 4.6 |
| Review Count | 1,204 |
| Product URL | amazon.com/dp/B0EXAMPLE1 |

## Step 1 — Opening the Best Sellers Category

Go to Amazon's Best Sellers and click into a category, such as Sports & Outdoors, then into a subcategory if you want a narrower ranking. The page shows the first 30 products, and 20 more load when you scroll to the bottom.

Scroll to the bottom once so all 50 are on the page. The extension collects what the page shows, so this scroll decides whether you get 30 rows or 50.

The category is open with its full first page loaded. Next, you pick the ranking in the side panel.

## Step 2 — Picking the Ranking in the Side Panel

Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, the ranking shows as **List 1** with the number of products on this page. Hover the card and the products are outlined on the page.

If the first card isn't the ranking, pick the card whose count matches. Or click **Choose an item on the page** and click one product; every similar one is picked with it.

![](visual:ext/list-tab-amazon-best-sellers)

The list is picked. Next, you tell the extension to follow the ranking onto its second page.

## Step 3 — Collecting Both Pages of the Top 100

Choose **Collect more pages**. The top 100 sits on two pages, and the Next link is found on its own, so the panel shows **Next button ready**. Under **Stop after**, set 2 pages, and click **Collect from 2 pages**.

Keep the tab in front while it runs. The tab title counts the products as they come in.

![](visual:ext/list-tab-more-pages)

| You want | Choose | Rows |
|---|---|---|
| The top 50 | **This page only**, after scrolling to the bottom | 50 |
| The top 100 | **Collect more pages**, Stop after 2 | 100 |

## Step 4 — Reading the Results

The results page opens with one row per product, ranked in the order Amazon shows them. The columns come from the Amazon setup: product name, link, ASIN, price, list price, rating, review count and badges, with prices and counts saved as numbers.

![](visual:ext/results-amazon-best-sellers)

Hover a column header to rename it with the pencil or remove it with the trash icon. Or type in the side panel's chat with the results tab in front:

```
Only rank, product name, price, rating and review count
```

## Step 5 — Exporting and Keeping a Weekly Snapshot

Click **Export as** and choose **Microsoft Excel**, **CSV** or **JSON**. Name the file with the date, such as `best-sellers-sports-2026-10-21.xlsx`.

Collect the same category next week and export again. Every run is saved in History with its date, so a product that climbs from 87 to 34 shows up when you compare the Rank column by ASIN in your spreadsheet.

![](visual:ext/results-export-menu)

The file after export looks like this. Sample data: the products and numbers are made up.

| Rank | Product Name | Price | Rating | Review Count |
|---|---|---|---|---|
| 1 | Trail Runner 2 Men's Shoes | 89.00 | 4.6 | 1,204 |
| 2 | Ridge Hiking Boots, Waterproof | 129.00 | 4.8 | 532 |
| 3 | Basecamp Socks, 3 pack | 18.00 | 4.7 | 2,045 |

## When It Goes Wrong

**Only 30 rows came back.** The page hadn't loaded its last 20 products. Scroll to the bottom before you collect, or choose **Auto scroll** under Collect more pages.

**The second page wasn't collected.** Choose **Collect more pages** and set **Stop after** to 2; **This page only** is the default.

**The rank isn't a column.** Rows arrive in the page's order, so the row number is the rank. Add a Rank column in your spreadsheet, or check the first run's columns before a long one.

**Amazon showed a verification page.** Complete it in the tab, click **Rescan**, and collect again.

## Conclusion

You collected a Best Sellers category into a spreadsheet, both pages of it, with a dated file you can compare against next week's. For the full details and reviews of any product on the list, see How To Scrape Amazon Reviews into Excel, Free. For a search instead of a ranking, see How To Scrape Amazon Product Listings into Excel.
