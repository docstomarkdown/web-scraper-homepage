---
title: "How To Get Prices from a List of Product URLs in One Run"
description: "Paste product page addresses from any stores into Bulk scrape and get one row per product with title, price, rating and seller in one table. Free, no code."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: bulk-scraper
sites: []
video: ""
campaign: guide-get-prices-from-a-list-of-product-urls
faq:
  - q: "How do I get prices from a list of product URLs?"
    a: "Click the Bulk scrape icon in the side panel, paste the product addresses or upload a CSV, and click Start collecting. Each product page's details are read in turn, and the merged table has one row per product with its price."
  - q: "Can the products be from different stores?"
    a: "Yes. Every product page is read into the same standard fields, such as Title, Current Price, MRP, Rating and Seller, so products from Amazon, Walmart and an independent store line up in one table."
  - q: "Can it check the prices every day on its own?"
    a: "Not today. A run happens in your open browser, so you start it when you want fresh numbers, and each run is saved in History with its date. Scheduled runs are coming with the cloud."
  - q: "How many product URLs can I add?"
    a: "There's no fixed limit on the list. Pages are read one at a time, so the practical limit is how long you want the run to take; a few hundred is normal."
  - q: "Does it get each product's reviews too?"
    a: "Not in a bulk run. Reviews are collected one product at a time from the product page, with the Properties tab."
  - q: "Can I compare this week's prices with last week's?"
    a: "Export each run with the date in the file name. The Product URL column is the same in every run, so you can match rows between the two files in your spreadsheet."
---

<!--
Draft until these are checked in a real run on 1.3.0 and the screenshots exist:
- How the Review sites step labels a product page (the bulk facts list "a list page, a Google Maps search, a Scholar search, or a plain page"; the product-scraper facts say product addresses pasted into Bulk scrape are read as product details). Confirm the label and the Configure card for product pages.
- The exact fields in the merged table for product pages (the product-scraper facts list 15 standard fields).
- New capture ids used below: ext/bulk-products-config, ext/results-bulk-products.
-->

You have a list of product pages, from one store or several, and you want their prices side by side without opening each one. Web Scraper Pro's Bulk scrape reads every product page in turn and gives you one table with title, current price, list price, rating and seller per row, in your own browser. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A list of product page addresses, one per line, in a CSV or TXT file or ready to paste. They can come from different stores.

## Does a Store Allow This?

You read product pages the store shows to any visitor, in your own browser, one at a time. Most stores' terms restrict automated collection, and the product text and images are theirs, so collect for your own research and check the terms before reusing anything. Our page [Is web scraping legal?](/web-scraping-legal) explains the rules in plain words; it isn't legal advice.

## What You Get

Each product page becomes one row, and every page is read into the same fields, whatever the store.

| Column | Example |
|---|---|
| Title | Trail Runner 2 Men's Shoes, Black |
| Current Price | 89.00 |
| MRP | 110.00 |
| Discount | 19 |
| Rating | 4.6 |
| Seller | Trail Gear Co. |
| Availability | In stock |
| Source URL | store.example/trail-runner-2 |

## Step 1 — Opening Bulk Scrape with the Product Addresses

Click the Web Scraper Pro icon, then the **Bulk scrape** icon at the top of the side panel, and choose **Bulk scrape**. A bulk page opens in a new tab on its **Upload** step.

Drop your CSV or TXT file onto the page, or choose **Paste URLs** and paste the addresses, one per line. A chip reads **N valid URLs detected**. Click **Continue →**.

![](visual:ext/bulk-upload)

A list you collected earlier works as the input too: choose **Use saved data** and pick the Product URL column of an Amazon search or a category you collected before. Next, the extension checks what each address is.

## Step 2 — Reviewing the Sites

The **Review sites** step groups the addresses by store and says what each one is. Product pages are read as product details, so a page from Amazon, one from Walmart and one from an independent store each get the same treatment.

Drag the stores into the order you want, remove any you don't, and click **Continue to site configuration →**.

![](visual:ext/bulk-detect)

## Step 3 — Setting Up Each Store

The **Configure** step shows one card per store. For product pages there's nothing to pick: the standard fields are read from each page. Click **Start collecting →**.

![](visual:ext/bulk-products-config)

Pages load one after another in the embedded browser on the right, while the cards on the left count rows. The run goes one page at a time on purpose, so each store sees an ordinary visitor. **Stop** keeps everything collected so far.

## Step 4 — Reading the Merged Table

When the run finishes, the **Collection results** page lists each store with its row count. Click **View merged table** for one table with every product, and a **Source URL** column that says which page each row came from.

![](visual:ext/results-bulk-products)

With the results tab in front, type in the side panel's chat to keep what you need:

```
Only title, current price, MRP, seller and source URL, sorted by current price
```

## Step 5 — Exporting and Comparing Runs

Click **Export as** and choose **Microsoft Excel**, **CSV** or **JSON**. Prices are saved as numbers, so the sheet sorts and compares them without clean-up. Name the file with the date.

Run the same list again next week. The Source URL column is the same in both files, so matching rows between them in your spreadsheet shows every price that moved. Runs that happen on their own, daily or weekly, are coming with the cloud.

![](visual:ext/results-export-menu)

The merged table after export looks like this. Sample data: the products, stores and prices are made up.

| Title | Current Price | MRP | Rating | Seller | Source URL |
|---|---|---|---|---|---|
| Trail Runner 2 Men's Shoes | 89.00 | 110.00 | 4.6 | Trail Gear Co. | storeone.example/trail-runner-2 |
| Trail Runner 2 Men's Shoes | 94.50 | 110.00 | 4.5 | Summit Outfitters | storetwo.example/p/trail-runner-2 |
| Ridge Hiking Boots | 129.00 | | 4.8 | Trail Gear Co. | storeone.example/ridge-boots |

## When It Goes Wrong

**A price is empty.** The page shows a price only after a size or colour is chosen, or only to signed-in shoppers. Open that product in a tab, pick the variant or sign in, and collect it on its own with the Properties tab.

**A store shows Waiting for you.** It asked for a verification. Complete it in the embedded browser and the run carries on.

**The columns differ between stores.** Every page is read into the same standard fields, but a store with a built-in profile adds extras of its own. Hide the columns you don't need, or open one store's table with **View** for a clean set.

**The run didn't finish.** The tab was closed or the computer slept. A bulk run needs the tab open; what was collected before is in History.

## Conclusion

You read a list of product pages in one run and exported one table of prices you can compare store by store, and week by week. For every product in a search or category rather than a hand-picked list, see How To Scrape Amazon Product Listings into Excel. For a product's reviews, see How To Scrape Amazon Reviews into Excel, Free.
