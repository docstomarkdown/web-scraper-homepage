---
title: "How To Scrape Products from Any Online Store"
description: "Any store's category page into a spreadsheet of products with price, old price, rating and link, across every page. WooCommerce and Shopify included."
status: draft
date: 2026-10-28
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-products-from-any-online-store
faq:
  - q: "Does it work on small independent stores, not only Amazon?"
    a: "Yes. On a store without a ready-made setup, the List tab finds the product grid on the category page and names the columns from the page's own labels: product name, price, old price where there's a sale, rating and link. WooCommerce product cards get named columns of their own."
  - q: "How do I scrape a WooCommerce store?"
    a: "Open a category page, pick the product list in the side panel, and collect every page. The extension reads WooCommerce's own product cards, so Product Name, Price, Original Price, Stock, Badge, Category and Product URL come out named; a sale shows the struck-through price in Original Price."
  - q: "Can I get every product in a store in one run?"
    a: "On a Shopify store, yes: the store card reads the whole catalog with variants and images. On other stores, collect each category page with Collect more pages, or paste the category addresses into Bulk scrape for one merged table."
  - q: "Does it get the product's description, variants and reviews?"
    a: "Not from the category page, which shows only what the card shows. Open one product and use the Properties tab: fifteen named fields, including description, variant, seller and images, then every review across its pages."
  - q: "Can I track a competitor's prices over time?"
    a: "Run the same category again when you want fresh numbers; each run is saved in History with its date, and Product URL matches rows across runs. Scheduled runs that happen on their own are coming with the cloud."
  - q: "Is it legal to scrape an online store?"
    a: "Store terms usually restrict automated collection, and product photos and text belong to the store. Collecting prices and names for your own research, in your own browser, at a person's pace, is the common case; read the plain-words explainer on web scraping and the law first. It isn't legal advice."
---

<!--
Facts to re-check on a real run of 1.3.0 before this leaves draft (2026-10-28):
- Generic category pages: list detection and column naming from the page's labels (DECISIONS.md D-018, D-019).
- WooCommerce: lib/platform/hooks/woocommerce.ts reads `li.product` cards (and WoodMart / Flatsome variants) into
  Product Name, Category, Price, Original Price (a sale's struck price), Stock, Badge, Product URL and Image preview.
  Confirm these names on a live WooCommerce store, and whether a store needs its own hook registered for the card reader
  to apply (the shared reader is registered per site today).
- Shopify: the store card, one row per product or variant, images and the import CSV (lib/platform/shopify/rows.ts).
- Product details: fifteen fields and reviews from the Properties tab (lib/pdp/constants.ts, reviewsExtraction.ts).
- Bulk scrape has no product-page mode; category pages only.
Title targets "scrape products from any e-commerce website" (youtube-research, 2026-10-28). The product-scraper page owns
"Amazon product data and reviews"; this guide owns the any-store category run.
-->

Every online store shows its products as a grid on a category page, and Web Scraper Pro turns that grid into a spreadsheet. You get one row per product with its name, price, old price, rating and link, across every page of the category. It works on the big marketplaces and on a shop you've never heard of. WooCommerce stores get their own named columns, and Shopify stores hand over their whole catalog in one go. In this guide you collect a category from an independent store, see what changes on WooCommerce and Shopify, and add one product's full details. Tested on version 1.3.0.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later). The [extension beginner guide](/guides/use-a-web-scraper-chrome-extension) covers the install.
- A store's category page open in Chrome: a brand's "All products", a marketplace search, or a collection on a small shop.

## Does an Online Store Allow Scraping?

Most stores' terms restrict automated collection, and product photos and descriptions belong to the store. This guide reads the category page you have open, in your own browser, at a person's pace, for price and range research; it doesn't copy the store's images or text into another shop. Read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

On a store without a ready-made setup, the columns are named from the page's own labels, so they vary a little by store. A typical category page gives you:

| Column | Example |
|---|---|
| Product Name | Ridge Hiking Boots |
| Price | 129.00 |
| Original Price | 159.00 |
| Rating | 4.8 |
| Review Count | 532 |
| Product URL | example-store.com/products/ridge-boots |
| Image URL | example-store.com/images/ridge-boots.jpg |

Prices, ratings and counts are saved as numbers, so the sheet sorts and sums them. A detail the card doesn't show, such as stock, stays empty rather than being guessed.

## Step 1 — Opening a Category Page

In Chrome, go to the store and open the category you want: a brand's full range, a department, or a filtered search. Set the store's own filters and sort order first, because the extension collects what the page shows, in the order it shows it.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. Under **Choose from lists we found**, the product grid shows as a card with its count, such as **List 1, 24 items**. Hover the card to see the grid outlined on the page.

![](visual:ext/list-tab-detected)

If the first card is the menu or a "you may also like" strip, pick the card whose count matches the products on screen, or click **Choose an item on the page** and click one product. The grid is chosen, and the next step collects every page of it.

## Step 2 — Collecting Every Page of the Category

Choose **Collect more pages**. The extension finds how the category continues and says so: **Next page** for numbered pages, **Load more** for a button, or **Auto scroll** for a grid that grows as you scroll. Set **Stop after** to the pages you want, or **All pages**, and click **Collect from N pages**.

![](visual:ext/list-tab-more-pages)

The results page opens in a new tab and fills in page by page. Keep the tab in front; a background tab pages slowly. Click **Stop** whenever you have enough, and the rows so far are kept.

![](visual:ext/results-many-pages)

The category is in one table. Before export, two things are worth a look: the column names and the sale prices, which the next step covers.

## Step 3 — Checking the Columns, and What Changes on WooCommerce

Hover a column header and click the pencil to rename it, or the trash icon to remove it. Mostly empty columns are hidden on their own; click **Columns** to show them. The name you give a column is kept for the file.

### On a WooCommerce Store

A great many independent shops run on WooCommerce, the store plugin for WordPress, and their product cards share one layout. The extension reads that layout directly, so the columns come out named without renaming:

| Column | What it holds |
|---|---|
| Product Name | The product's name |
| Category | The category shown on the card, when the theme shows one |
| Price | The current price; on a sale, the new price |
| Original Price | The struck-through price on a sale card, otherwise empty |
| Stock | An out-of-stock note, when the card shows one |
| Badge | A sale badge or similar label |
| Product URL and Image preview | The product's page and its picture |

A WooCommerce card prints the currency symbol separately from the amount. A generic reading of the same card can produce a column holding only the symbol; the WooCommerce reader puts the amount in Price. If you see a column of bare currency symbols on a store that looks like WooCommerce, the store's theme draws its cards differently. Rename or remove the column, and tell us the store so its cards can be added.

### On a Shopify Store

On a Shopify store you don't collect the category at all. The side panel shows a store card with the product count and collections. Click **Export catalog** and the whole store arrives, one row per product or per variant, straight from the store's own product data. The columns include SKU, price, compare-at price, stock status, images and tags. The [Shopify guide](/guides/export-a-shopify-store-catalog) walks through it. You don't need to check first; the card appears by itself on a Shopify store.

## Step 4 — Adding One Product's Full Details

A category card shows the headline facts. For one product's description, variants, seller and every review, open the product's page from the Product URL column. Open the **Properties** tab in the side panel and click **Collect details on this page**. Fifteen named fields fill in: title, brand, current price, list price, discount, rating, review count, availability, delivery, seller, selected variant, offers and the image gallery.

![](visual:ext/properties-product-fields)

For the reviews, click **View all reviews**, then **Collect reviews**; the extension pages through them until the end or until you stop it, and they land in their own table. Product pages aren't part of a bulk run, so this is one product at a time; the [product details page](/product-scraper) has the fields and the limits.

## Step 5 — Exporting, and Collecting Several Categories

Click **Export as** and choose **Microsoft Excel**, **CSV** or **JSON**. Google Sheets is there too, after a Google sign-in. The run stays in **History**, so next week's run of the same category can be compared with this one on Product URL.

![](visual:ext/results-export-menu)

For several categories of one store, paste their addresses into **Bulk scrape**, choose **Bulk scrape**, confirm the list once for the site, set the page limit, and click **Start collecting**. Each category is collected in turn and **View merged table** puts them together with a Source URL column saying which category each product came from. The [list of URLs guide](/guides/collect-from-a-list-of-urls-in-one-run) shows each step.

After export the sheet looks like this. Sample data; the products and prices are made up.

| Product Name | Price | Original Price | Rating | Product URL |
|---|---|---|---|---|
| Ridge Hiking Boots | 129.00 | 159.00 | 4.8 | example-store.com/products/ridge-boots |
| Trail Runner 2 Shoes | 89.00 | | 4.6 | example-store.com/products/trail-runner-2 |
| Summit Rain Jacket | 74.50 | 95.00 | 4.3 | example-store.com/products/summit-jacket |

## When It Goes Wrong

**The List tab found the menu or a recommendations strip.** Pick the card whose count matches the products on screen, or click **Choose an item on the page** and click one product.

**Only the first page came back.** Choose **Collect more pages** before you click Collect, and keep the tab in front. On a grid that grows as you scroll, choose **Auto scroll** and **To end**.

**The price column holds only a currency symbol.** The store's theme prints the symbol and the amount apart. On a WooCommerce store the card reader avoids this; on another theme, rename or remove the column and send us the store's address so its cards can be added.

**The store asked me to verify I'm human.** The run pauses. Complete the check in the tab, click **Rescan page**, and collect again; what was collected is kept.

**The store is on Shopify and the grid collected only what was on screen.** Use the store card instead: it reads the whole catalog, including products that never loaded on the page.

## Conclusion

You collected a store's category across every page into a spreadsheet with prices and links, saw what changes on WooCommerce and Shopify, and added one product's full details and reviews. To compare the same products across stores, see How To Compare Prices Across Stores in One Run. For a store's own catalog with variants and images, see How To Scrape Products from Any Shopify Store. The [e-commerce research page](/use-cases/ecommerce) has the whole workflow from category to price sheet.
