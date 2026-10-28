---
title: "How To Compare Prices Across Stores in One Run"
description: "Search the same product on Amazon, eBay, Walmart, Etsy or any store, paste the search pages into Bulk scrape, and get every store's prices in one merged table. Free, no code."
status: draft
date: 2026-10-21
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: bulk-scraper
sites: [amazon, ebay, walmart, etsy]
video: ""
campaign: guide-compare-prices-across-stores-in-one-run
faq:
  - q: "How do I compare prices across different websites?"
    a: "Search the product on each store, copy the search page addresses, paste them into Bulk scrape, and click Start collecting. Each store's results become a table, and View merged table puts them together with a Source URL column that says which store each row came from."
  - q: "Which stores get named columns?"
    a: "Amazon, eBay, Walmart and Etsy have ready-made setups, so their columns come out as Product Name, Price, Rating and so on. On other stores the list is detected on the page and the columns carry the page's own labels."
  - q: "Can I paste product page addresses instead of search pages?"
    a: "Not for prices. A bulk run collects lists, Google Maps searches, contact details and page text; it doesn't read a product page's fields yet. For one product's details, open it and use the Properties tab."
  - q: "Can it check the prices every day on its own?"
    a: "Not today. A run happens in your open browser, so you start it when you want fresh numbers, and each run is saved in History with its date. Scheduled runs are coming with the cloud."
  - q: "How many pages of each store's results does it collect?"
    a: "As many as you set on the Configure step for that store. For a price check, the first page or two is usually enough; for a whole category, set a higher limit or All pages."
  - q: "Does it tell me whether the product is in stock?"
    a: "When the store's card says so. Amazon's Stock column, a WooCommerce shop's Stock column and any page-labelled Availability column carry what the card shows; an empty cell means the card said nothing. For the exact state, open the product and use the Properties tab, whose Availability field reads the product page."
  - q: "Can I compare this week's prices with last week's?"
    a: "Export each run with the date in the file name. The Product URL column is the same in every run, so you can match rows between the two files in your spreadsheet."
---

<!--
Draft until these are checked in a real run on 1.3.0 and the screenshots exist:
- The Review sites step labels a store search page as a list page and the Configure card offers the list, Next page and Stop after (bulk-scraper facts).
- The merged table shows every store's columns side by side with Source URL (bulk-scraper facts, "What it doesn't do").
- Capture ids used below: ext/bulk-products-config (the Configure step with three store search pages) and ext/results-bulk-products (the merged table), re-described in the manifest as store search pages.
-->

You want the same product's price on several stores side by side, without opening each store and copying by hand. Web Scraper Pro's Bulk scrape collects each store's search results as a list and merges them into one table with a price and a store per row, in your own browser. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- The product or category searched on each store you want to compare, with the search page addresses copied from the address bar.

## Does a Store Allow This?

You collect the search results a store shows to any visitor, in your own browser, at a person's pace. Most stores' terms restrict automated collection, so collect for your own research and check the terms before reusing anything. Our page [Is web scraping legal?](/web-scraping-legal) explains the rules in plain words; it isn't legal advice.

## What You Get

One table per store, and a merged table with every store's rows. Stores with a ready-made setup give named columns; the rest carry the page's own labels.

| Column | Example |
|---|---|
| Product Name | Trail Runner 2 Men's Shoes, Black |
| Price | 89.00 |
| Rating | 4.6 |
| Review Count | 212 |
| Product URL | storeone.example/trail-runner-2 |
| Source URL | storeone.example/s?k=trail+runner+2 |

## Step 1 — Running the Search on Each Store

Search the product on each store as you normally would, and apply the filters you want: new only, free shipping, a price range. The extension collects what the page shows, so the filters shape the list.

Copy each search page's address from the address bar into a text file, one per line. Three or four stores is a normal run.

## Step 2 — Opening Bulk Scrape with the Search Pages

Click the Web Scraper Pro icon, then the **Bulk scrape** icon at the top of the side panel, and choose **Bulk scrape**. A bulk page opens in a new tab on its **Upload** step.

Drop your file onto the page, or choose **Paste URLs** and paste the addresses. A chip reads **N valid URLs detected**. Click **Continue →**.

![](visual:ext/bulk-upload)

## Step 3 — Reviewing the Stores

The **Review sites** step groups the addresses by store and says what each one is. A search page is a list page. Drag the stores into the order you want, remove any you don't, and click **Continue to site configuration →**.

![](visual:ext/bulk-detect)

## Step 4 — Setting Up Each Store

The **Configure** step shows one card per store. For each, confirm the list it found, and choose **Next page** with a page limit if you want more than the first page of results. One or two pages is enough for a price check.

![](visual:ext/bulk-products-config)

Click **Start collecting →**. Stores load one after another in the embedded browser on the right, while the cards on the left count rows. **Stop** keeps everything collected so far.

## Step 5 — Reading the Merged Table

When the run finishes, the **Collection results** page lists each store with its row count. Click **View merged table** for one table with every store's results and a **Source URL** column that says which store each row came from.

![](visual:ext/results-bulk-products)

Each store's columns sit side by side, so a Walmart row has empty cells under Etsy's Shop Name. Hide the columns you don't need, or type in the side panel's chat with the results tab in front:

```
Only product name, price, rating and source URL, sorted by price
```

## Adding a Stock Column

A price is only useful when the item can be bought, so check what each store's card says about stock before you compare. Stores with a ready-made setup carry it as a named column when the card shows it: Amazon's **Stock** holds the "Only 3 left" or "Currently unavailable" line, Walmart's cards show it in their badges, and a WooCommerce shop's **Stock** column holds its out-of-stock note. On a store without a setup, the column carries the page's own label, such as **Availability** or **In stock**, and only when the card shows one.

An empty stock cell means the card said nothing, not that the item is available. For the exact state, open that product and click **Collect details on this page** in the **Properties** tab; **Availability** is one of its fifteen fields. On the merged table, click **Filter rows** to hide rows whose stock column says unavailable, so the comparison holds only prices you can act on.

Shopify stores are the exception: they don't go through a bulk run, and their store export carries **Available** as yes or no per variant, never a count, because stores don't publish one.

## Step 6 — Exporting and Comparing Runs

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Prices are saved as numbers, so the sheet sorts and compares them without clean-up. Name the file with the date.

Run the same list again next week. The Product URL column is the same in both files, so matching rows between them in your spreadsheet shows every price that moved. Runs that happen on their own, daily or weekly, are coming with the cloud.

![](visual:ext/results-export-menu)

The merged table after export looks like this. Sample data: the products, stores and prices are made up.

| Product Name | Price | Rating | Stock | Product URL | Source URL |
|---|---|---|---|---|---|
| Trail Runner 2 Men's Shoes | 89.00 | 4.6 | Only 3 left | storeone.example/trail-runner-2 | storeone.example/s?k=trail+runner+2 |
| Trail Runner 2 Men's Shoes | 94.50 | 4.5 | | storetwo.example/p/trail-runner-2 | storetwo.example/search?q=trail+runner+2 |
| Trail Runner 2 Men's Shoes, 2 pack | 169.00 | 4.4 | In stock | storethree.example/listing/88120 | storethree.example/search?q=trail+runner+2 |

## When It Goes Wrong

**A store's rows are the wrong list.** The card picked a row of sponsored or related items. On the Configure step, pick the list whose count matches the results, or choose an item on the page.

**A price shows as a range.** Listings with variations show a range on the card, and the extension keeps what the card shows. Open that listing and use the Properties tab for one variation's price.

**A store shows Waiting for you.** It asked for a verification. Complete it in the embedded browser and the run carries on.

**The run didn't finish.** The tab was closed or the computer slept. A bulk run needs the tab open; what was collected before is in History.

## Conclusion

You collected the same search from several stores in one run and exported one table of prices you can compare store by store, and week by week. For every product in one store's search or category, see How To Scrape Amazon Product Listings into Excel. For a product's full details and reviews, see How To Scrape Amazon Reviews into Excel, Free.
