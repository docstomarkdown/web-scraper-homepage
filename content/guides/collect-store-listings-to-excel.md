---
title: "How To Collect eBay, Etsy or Walmart Listings to Excel with Web Scraper Pro"
description: "Turn a search on eBay, Etsy or Walmart into a spreadsheet with product name, price, seller or shop, rating and link, across every page of results, with no code. The same three clicks on each store."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
feature: list-scraper
sites: [ebay, etsy, walmart]
video: ""
campaign: guide-collect-store-listings-to-excel
faq:
  - q: "How do I scrape eBay listings without getting blocked?"
    a: "Collect from the page in your own browser, as this guide does; eBay sees you browsing. Keep runs to a search at a time, and if eBay shows a check, complete it in the tab and continue."
  - q: "Can I get Etsy product listings into a spreadsheet?"
    a: "Yes. Search on Etsy, pick the results in the side panel, set how many pages, and collect. The columns include shop name, shop rating, price, discount and badges."
  - q: "Does it work on Walmart?"
    a: "Yes. A Walmart search gives product name, price, original price, savings, rating, review count, delivery options and link, with sponsored rows labelled."
  - q: "What about AliExpress, Temu or Alibaba?"
    a: "They have no ready-made setup, so the List tab detects the list and names the columns from the page; check the columns on the first page before a long run."
  - q: "Can I collect each product's full details?"
    a: "Yes, one product at a time: open the product page and use the Properties tab, which reads the standard fields and the reviews across their pages."
---

Turn a search on eBay, Etsy or Walmart into a spreadsheet with product name, price, seller or shop, rating and link, across every page of results. All three stores have a ready-made setup in Web Scraper Pro, so the columns come out named and the Next button is handled; the clicks are the same on each. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A search or category page on eBay, Etsy or Walmart, with your filters set.

## Step 1 — Running the search

Search on the store as you normally would and apply the filters you want: price range, condition, Buy It Now, free shipping, ships from. The extension collects what the page shows, so the filters shape the list.

## Step 2 — Picking the list in the side panel

Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, the results show as **List 1** with the number of items on this page. Hover the card and the results are outlined on the page.

Store pages often hold other lists, such as a row of sponsored items or "related searches". If the first card isn't the results, pick the card whose count matches, or click **Choose an item on the page** and click one listing.

## Step 3 — Collecting every page

Choose **Collect more pages**. The Next button is found on its own, so the panel shows **Next button ready**. Under **Stop after**, pick how many pages, and click **Collect from 5 pages** (or the count you set). Keep the tab in front; the tab title counts the items as they come in.

![](visual:ext/list-tab-more-pages)

## Step 4 — Reading the results

The results page opens with one row per listing. The columns come from each store's setup:

| Store | Columns |
|---|---|
| eBay | Product Name, Price, Price With Coupon, Shipping, Condition, Purchase Format, Bids, Time Left, Auction Ends, Sold, Watchers, Seller, Seller Feedback Count, Seller Positive Feedback, Item Location, Returns, Rating, Rating Count, Stock, Item ID, Product URL, Image URL |
| Etsy | Product Name, Price, Original Price, Discount, Shop Name, Shop Rating, Shop Review Count, Delivery, Badges, Sponsored, Item Type, Stock, Listing ID, Shop ID, Product URL, Image URL |
| Walmart | Product Name, Price, Original Price, Savings, Extra Savings, Options Price Range, Rating, Review Count, Delivery, Pickup, Shipping, Sizes, Badge, Sponsored, Product URL, Image URL |

A column the search never shows stays out of the table; prices, ratings and counts are saved as numbers. Sponsored rows carry a **Sponsored** label, and Settings → Results → **Skip sponsored products** leaves them out.

![](visual:ext/results-ebay)

## Step 5 — Keeping what you need

Hover a column header to rename it with the pencil or remove it with the trash icon. Click **Filter rows** to keep rows by a value, or, with the results tab in front, type in the side panel's chat:

```
Only name, price, seller and rating, sorted by price
```

## Step 6 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Run the same search next week and compare on Product URL or Item ID to see what changed.

![](visual:ext/results-export-menu)

## Conclusion

You collected a store search into a spreadsheet with named columns across every page. To do the same for several searches or several stores, paste the search addresses into Bulk scrape and each is collected in turn with its own setup. For one listing's full details and reviews, open it and use the product details feature.
