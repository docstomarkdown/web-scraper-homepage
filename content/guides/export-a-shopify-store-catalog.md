---
title: "How To Scrape Products from Any Shopify Store"
description: "Collect every product and variant from any public Shopify store, with prices, SKUs, tags and images, as a spreadsheet or a Shopify import CSV, in a couple of clicks."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: shopify-scraper
sites: []
video: ""
campaign: guide-export-a-shopify-store-catalog
faq:
  - q: "How do I scrape a Shopify store's products?"
    a: "Open the store in Chrome, open the side panel's List tab, and the Shopify store card appears with the product count. Choose All products or a collection, one row per product or per variant, and click Collect products."
  - q: "Does it work on any Shopify store?"
    a: "On most public ones. It reads the store's public product data, which every Shopify store publishes unless it's password-protected or has turned that data off. Those stores fall back to collecting the page's own list."
  - q: "Can I import the export into my own Shopify store?"
    a: "Yes. Download Shopify import CSV gives you the file in Shopify's product import layout. Import it into a test store first and review the products before a live store."
  - q: "Are the product images included?"
    a: "The image URLs are in the table. Download images saves the files as ZIP archives of up to 5,000 images, named by product handle if you turn that on."
  - q: "How do I know a store runs on Shopify?"
    a: "You don't need to check. When you open a Shopify store, the Shopify store card shows up in the List tab by itself."
  - q: "Can I collect several Shopify stores at once?"
    a: "One store at a time, each in a few clicks. The whole store or one collection per run; several stores run one after another."
---

Open the store in Chrome, open the side panel, and click Collect products on the Shopify store card. Web Scraper Pro reads the store's own product data, so every product and variant arrives with prices, SKUs, tags, descriptions and images, as a spreadsheet or a Shopify import CSV. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A public Shopify store. A store that asks for a password before showing products can't be read.
- The right to use the data. The products, images and text belong to the store; check its terms before reusing them.

## Step 1 — Opening the store and the store card

Go to any page of the store in Chrome and open the side panel's **List** tab. Because the site runs on Shopify, a **Shopify stores** card appears at the top with the store's product count, such as **All products (1,234)**.

![](visual:ext/shopify-store-card)

If no card appears, the store either isn't on Shopify or has turned off its public product data. The List tab still collects the page's own list in that case.

## Step 2 — Choosing what to collect

On the card, pick the scope and the row shape:

| Choice | Options | Pick this when |
|---|---|---|
| Scope | **All products** or one **Collection** | A collection is a store's own grouping, such as Jackets. One collection per run |
| Rows | **One row per product** or **One row per variant** | Per variant gives one row for each size and colour, with its own SKU, price and barcode. Pick it for imports and stock checks |

Two settings refine the run:

- **Include barcodes and image descriptions (slower)** reads each product in more detail.
- **Name images by product handle** names the downloaded image files after the product rather than the store's file names.

## Step 3 — Collecting

Click **Collect products**. The rows arrive from the store's product feed rather than from the page, so a thousand products take a minute or two, not an afternoon. Click **Stop** at any time and keep what it has.

## Step 4 — Reading the table

The results page opens with the catalog. The columns come from Shopify's own product data, so they are the same on every store:

| Group | Columns |
|---|---|
| Product | Title, Vendor, Type, Tags, Description, Handle, URL, Product ID, Published At |
| Prices and stock | Price, Compare At Price, Available, Variants |
| Per variant (with one row per variant) | Option 1 to 3 name and value, SKU, Barcode, Grams, Requires Shipping, Taxable, Variant Image, Variant ID |
| Images | Every image URL for the product |

![](visual:ext/results-shopify-variants)

## Step 5 — Exporting, importing and downloading images

Three downloads cover the three jobs:

1. **Export as** → **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets** for analysis, with prices as numbers.
2. **Download Shopify import CSV** for a file in Shopify's product import layout: handle, title, body, vendor, type, tags, each variant's options, SKU, price, inventory fields and image URLs. In your own store, use Products → Import, on a test store first.
3. **Download images** for the product images as ZIP files of up to 5,000 images each, named by product handle if you chose that.

![](visual:ext/results-export-menu)

## Or ask instead

In the **Chat** tab, `Collect all products from this store` runs the same collection. Add `every variant` or a collection's name to narrow it. After collecting a list on a Shopify store, chat offers **Collect the whole store** on its own.

## When it goes wrong

**No Shopify stores card appears.** The store isn't on Shopify, or it has turned off its public product data. The List tab still collects the page's own list, which is only what's on screen.

**Only a handful of products came back.** Use store product data is off in Settings → Shopify stores, so the page was collected instead of the feed. Turn it on and collect again.

**The import fails in Shopify.** Shopify's import has rules the source store may not follow: duplicate handles, missing options, image URLs it can't fetch. Import into a test store, read the error rows, fix them in the CSV, and import again.

**The image ZIP is huge.** ZIPs split at 5,000 files. A store with many images gives part-1, part-2 and so on; download them all.

## Conclusion

You exported a Shopify store's catalog with every variant and image, and you have a CSV a store can import. For competitor prices across several stores, run each store and compare the exports in one sheet. For a product page on a store that isn't on Shopify, use the product details feature instead.
