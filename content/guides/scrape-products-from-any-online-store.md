---
title: "How To Scrape Products from Any Online Store"
description: "Turn a store's category page into a spreadsheet of products with name, price and link, across every page. Shopify stores hand over their whole catalog."
status: draft
date: 2026-10-28
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-products-from-any-online-store
# Facts checked against chrome-extension-source on 2026-11-10: on a store with no setup, lists are found by the generic list search and columns are named from the page; tables are ordered by a guessed category: lib/content/scanForListsCore.ts, DECISIONS.md D-018, D-019
# Facts checked against chrome-extension-source on 2026-11-10: the WooCommerce card reader (Product Name, Price, Original Price, Product URL…) is registered only for a few listed stores, not for every WooCommerce store: lib/platform/hooks/woocommerce.ts, carrimonline.ts, defarmer.ts, kolshzin.ts, superbhyper.ts
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page", "Rescan page", "Collect more pages", Next page / Load more / Auto scroll, "Stop after" 5/10/20/All pages/Custom, "Collect from N pages", "Collect to end", Load more "To end": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: files write columns named Price, Original Price, Rating or Review Count as numbers when they plainly are one (Settings > Results, on by default): DECISIONS.md D-033, lib/utils/fileNumbers.ts
# Facts checked against chrome-extension-source on 2026-11-10: Shopify store card "Shopify store" with product count, "Collect products", "One row per product" / "One row per variant", "Download images", "Download Shopify import CSV", "Collect from this page instead"; on by default: components/scraper/shopify/ShopifyStoreCard.tsx, lib/shopifyMode/settings.ts; columns and password-protected stores: products/web-scraper-pro.md (lib/platform/shopify/rows.ts)
# Facts checked against chrome-extension-source on 2026-11-10: Properties tab "Collect details on this page", 15 fields (Image Gallery, Title, Brand, Current Price, MRP, Discount, Rating, Review Count, Availability, Delivery Info, Seller, Selected Variant, Offers, Product URL, Reviews), "Collect reviews": lib/pdp/constants.ts, components/scraper/PropertiesTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: Bulk has no product-page mode; list mode collects every list it detects unless "Custom area" is chosen; without "Add pagination" it stops after the first page: products/web-scraper-pro.md (lib/bulk/executors/), entrypoints/bulk/main.tsx, lib/content/bulkListExtraction.ts
faq:
  - q: "Does it work on small independent stores, not only Amazon?"
    a: "The List tab looks for lists on any store. On a store without a ready-made setup, it names the columns from the page, so check them on a first page. If it doesn't find the products as one list, choose Choose an item on the page and click one product."
  - q: "How do I scrape a WooCommerce store?"
    a: "Like any other store: open a category page, pick the product list in the side panel, and collect every page. The columns are named from the page, so check them and rename any column before export."
  - q: "Can I get every product in a store in one run?"
    a: "On a public Shopify store, yes: the Shopify store card collects the whole catalog, one row per product or per variant. On other stores, collect each category page with Collect more pages, or paste the category addresses into Bulk scrape."
  - q: "Does it get the product's details, variants and reviews?"
    a: "Not from the category page, which shows only what the card shows. Open one product and use the Properties tab: it looks for 15 named fields, including brand, price, availability, seller, selected variant and the image gallery, and Collect reviews collects its reviews."
  - q: "Can I track a competitor's prices over time?"
    a: "Run the same category again when you want fresh numbers; each run is saved in History with its date, and the product link matches rows across runs. Scheduled runs are coming soon with the cloud."
  - q: "Is it legal to scrape an online store?"
    a: "Store terms often restrict automated collection, and product photos and text belong to the store. Collecting prices and names for your own research, in your own browser, at a person's pace, is the common case; read the plain-words explainer on web scraping and the law first. It isn't legal advice."
---

An online store shows its products as a grid on a category page, and Web Scraper Pro turns that grid into a spreadsheet. You get one row per product with what each card shows, such as the name, price and link, across every page of the category. It works on stores without a ready-made setup by naming the columns from the page.

Shopify stores hand over their whole catalog in one go. In this guide you collect a category from a store, see what changes on Shopify, and add one product's full details.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A store's category page open in Chrome: a brand's full range, a department, or a filtered search.

## Does an Online Store Allow Scraping?

Many stores' terms restrict automated collection, and product photos and descriptions belong to the store. This guide reads the category page you have open, in your own browser, at a person's pace, for price and range research; it doesn't copy the store's images or text into another shop. Read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

On a store without a ready-made setup, the columns are named from the page, so they vary by store. A product card often shows these details, and each one the page shows becomes a column. Sample data: the product is made up.

| Detail | Example |
|---|---|
| Product name | Sample Ridge Hiking Boots |
| Price | 129.00 |
| Original price, on a sale | 159.00 |
| Rating | 4.8 |
| Review count | 532 |
| Product link | example-store.example/products/ridge-boots |
| Image | example-store.example/images/ridge-boots.jpg |

A detail the card doesn't show, such as stock, stays out rather than being guessed. When a column ends up named Price, Original Price, Rating or Review Count, files write it as numbers, so your sheet can sort and sum it.

## Step 1 — Opening a Category Page

In this step you open the products and find their list. In Chrome, go to the store and open the category you want. Set the store's own filters and sort order first, because the extension collects what the page shows, in the order it shows it.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with the number of items on this page. Hover a card to see its list outlined on the page.

![](visual:ext/list-tab-detected)

Pick the card whose count matches the products on screen. If no card is the product grid, click **Choose an item on the page** and click one product; similar products are picked with it. The grid is chosen, and the next step collects every page of it.

## Step 2 — Collecting Every Page of the Category

Under **How much to collect**, choose **Collect more pages**, then match how the category continues: **Next page** for numbered pages, **Load more** for a button, or **Auto scroll** for a grid that grows as you scroll. The panel shows what it found, such as **Next button ready**.

![](visual:ext/list-tab-more-pages)

For **Next page**, set **Stop after** to the pages you want, or **All pages**, and click **Collect from N pages**. For **Auto scroll**, click **Collect to end**. Click **Stop** whenever you have enough, and the rows so far are kept.

![](visual:ext/results-many-pages)

The category is in one table. Before export, check the column names, which the next step covers.

## Step 3 — Checking the Columns, and What Changes on Shopify

Hover a column header and click the pencil to rename it, or the trash icon to remove it. The name you give a column is the one the file uses.

Some stores print the currency symbol apart from the amount, which can give a column holding only the symbol. Remove that column, and check that the amount is in the price column.

### On a Shopify Store

On a public Shopify store you don't need to collect the category at all. The side panel shows a **Shopify store** card with the store's product count. Choose **One row per product** or **One row per variant**, and click **Collect products**.

The whole catalog arrives from the store's own product data, with columns such as title, vendor, price, compare-at price, SKU, tags and images. When it's done, **Download Shopify import CSV** gives the same catalog as a Shopify import file. Password-protected stores aren't supported, and **Collect from this page instead** brings back the page's own list tools. The [Shopify scraper page](/shopify-scraper) has the details.

## Step 4 — Adding One Product's Full Details

A category card shows the headline facts. For one product's details, open the product's page from the link column. Open the **Properties** tab in the side panel and click **Collect details on this page**.

The Properties tab looks for 15 named fields: title, brand, current price, MRP, discount, rating, review count, availability, delivery info, seller, selected variant, offers, product URL, the image gallery and reviews. A field the page doesn't show stays empty.

![](visual:ext/properties-product-fields)

For the reviews, click **Collect reviews**; they land in their own table. Product pages aren't part of a bulk run, so this is one product at a time; the [product details page](/product-scraper) has the fields and the limits.

## Step 5 — Exporting, and Collecting Several Categories

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The run stays in **History**, so next week's run of the same category can be compared with this one by product link.

![](visual:ext/results-export-menu)

For several categories of one store, paste their addresses into **Bulk scrape** and choose **Bulk scrape**. On the **Configure** step, choose **Custom area** and click the product grid, because by default a bulk run collects every list it finds on each page. Click **Add pagination** if each category runs to more than one page, then **Start collecting**. The [bulk scraper page](/bulk-scraper) shows each step.

After export the sheet looks like this, with your own column names. Sample data: the products and prices are made up.

| Product name | Price | Original price | Rating | Product link |
|---|---|---|---|---|
| Sample Ridge Hiking Boots | 129.00 | 159.00 | 4.8 | example-store.example/products/ridge-boots |
| Sample Trail Runner 2 Shoes | 89.00 | | 4.6 | example-store.example/products/trail-runner-2 |
| Sample Summit Rain Jacket | 74.50 | 95.00 | 4.3 | example-store.example/products/summit-jacket |

## When It Goes Wrong

**The List tab found the menu or a recommendations strip.** Pick the card whose count matches the products on screen, or click **Choose an item on the page** and click one product.

**Only the first page came back.** Choose **Collect more pages** before you click Collect. On a grid that grows as you scroll, choose **Auto scroll** and click **Collect to end**.

**A column holds only a currency symbol.** The store prints the symbol and the amount apart. Remove the symbol column and check the price column.

**The store asked me to verify I'm human.** Complete the check in the tab, click **Rescan page** at the top of the List tab, and collect again from the page you're on.

**The store is on Shopify and the grid collected only what was on screen.** Use the **Shopify store** card instead: it reads the whole catalog, including products that never loaded on the page.

## Conclusion

You collected a store's category across every page into a spreadsheet with prices and links, saw what changes on Shopify, and added one product's full details and reviews. For a store's own catalog with variants and images, see the [Shopify scraper page](/shopify-scraper). The [e-commerce research page](/use-cases/ecommerce) has the whole workflow from category to price sheet.
