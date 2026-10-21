---
title: "How To Scrape a List and Then Every Detail Page"
description: "Collect a list page with its links, then open every linked page in one bulk run and merge the details into one table: products, listings, members or articles."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: bulk-scraper
sites: []
video: ""
campaign: guide-scrape-a-list-then-every-detail-page
faq:
  - q: "How do I scrape a list page and then each item's page?"
    a: "Collect the list with the List tab, which saves a link column. Then click the Bulk scrape icon, choose Use saved data on the Upload step, pick that link column, and run. Every linked page is collected in turn into one merged table."
  - q: "Do I have to paste the links by hand?"
    a: "No. Use saved data takes the addresses straight from a column of a table you collected earlier."
  - q: "Does this work for products?"
    a: "Yes. For a store category, the first run gives one row per product and the second run reads each product page's details: price, list price, rating, seller, variant and images."
  - q: "What does the merged table contain?"
    a: "Every detail page's columns, plus a Source URL column that says which page each row came from. Each page is also saved as its own collection."
  - q: "How long does it take?"
    a: "Pages run one at a time, at a person's pace. A few hundred pages is a normal run; the tab needs to stay open until it finishes."
  - q: "Can I do this on any website?"
    a: "On any site where the list links to a page per item. The first run needs a link column; the second reads each linked page as the kind of page it is."
---

<!--
Facts to confirm with a verified run on 1.3.0 before this leaves draft:
- The List tab's link column name on a generic site (the ready-made packs name it Product URL, Listing link or similar).
- Bulk Upload step "Use saved data" picks a saved table and its address column (bulk-scraper facts, lib/bulk/dataSourceUrls.ts).
- A bulk run over product pages collects product details per page and merges them (product-scraper page claims this; confirm which Detect type product pages get and what the Configure step shows for them).
- New capture: ext/bulk-use-saved-data (the Upload step with a saved table and its link column chosen).
-->

Many lists link to a page per item, and the page holds the details the list leaves out: the full price with its list price, the seller, every image, the opening hours, the author. Web Scraper Pro gets both in two runs: the List tab collects the list with its links, and Bulk scrape opens every link and merges what it finds into one table. This guide walks through a store category, and the same two runs work for property listings, directories and article lists.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A list page where each item links to its own page: a store category, a directory, a job board or a list of articles.

## What You Get

Two tables. The first has one row per item in the list, with a link column. The second has one row per linked page, with that page's details and a Source URL column.

| Table | Column | Example |
|---|---|---|
| List | Product Name | Ridge Hiking Boots |
| List | Price | $129.00 |
| List | Product URL | store.example/boots/ridge |
| Details | Current Price, MRP, Discount | $129.00, $160.00, 19% |
| Details | Rating, Review Count | 4.8, 212 |
| Details | Seller | Sample Outdoor Store |
| Details | Image Gallery | 6 image addresses |
| Details | Source URL | store.example/boots/ridge |

## Step 1 — Collecting the List

Open the list page in Chrome and open the side panel's **List** tab. Under **Choose from lists we found**, pick the card for the list, choose **Collect more pages** if the list continues, set **Stop after**, and click **Collect**.

![](visual:ext/list-tab-detected)

The results page opens with one row per item. Check that a link column is there, such as `Product URL` or `Listing link`. On a site without a ready-made setup the column may carry the page's own label; what matters is that each cell holds the item's address.

## Step 2 — Opening Bulk Scrape

Click the **Bulk scrape** icon (the layers icon at the top of the side panel) and choose **Bulk scrape**. A bulk page opens in a new tab on its **Upload** step.

![](visual:ext/bulk-menu)

The second run starts from the table you saved in the first, so there is nothing to paste.

## Step 3 — Choosing the Saved Link Column

On the **Upload** step, click **Use saved data** and pick the table you collected in Step 1 with its link column. The chip reads **N valid URLs detected**, one per item in the list. Click **Continue →**.

![](visual:ext/bulk-use-saved-data)

## Step 4 — Reviewing the Pages

The **Review sites** step groups the addresses by site and says what each one is. Product pages from one store share one setup, so a list of 80 products is one site to set up, not 80. Click **Continue to site configuration →**, check the card, and click **Start collecting →**.

![](visual:ext/bulk-detect)

## Step 5 — Watching the Run

Pages load one after another in the embedded browser on the right, while the card on the left counts rows. The run goes one page at a time on purpose, so the site sees an ordinary visitor. If the site asks you to verify, the run pauses with **Waiting for you**; complete the check in the embedded browser and it carries on.

![](visual:ext/bulk-run)

## Step 6 — Merging and Exporting

When it finishes, the **Collection results** page lists the site with its row count. Click **View merged table** for one table with every page's details and a **Source URL** column. Click **Export as** for **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**.

![](visual:ext/bulk-overview)

After export, the merged table looks like this. The products are made up.

| Source URL | Title | Current Price | MRP | Rating | Seller |
|---|---|---|---|---|---|
| store.example/boots/ridge | Ridge Hiking Boots | $129.00 | $160.00 | 4.8 | Sample Outdoor Store |
| store.example/boots/scree | Scree Approach Boots | $149.00 | $149.00 | 4.5 | Sample Outdoor Store |
| store.example/boots/quick | Quick Trail Boots | $99.00 | $120.00 | 4.3 | Riverside Supply |

## When It Goes Wrong

**The first table has no link column.** The list's cards didn't carry a link the extension could read. Click **Choose an item on the page** and click the item's title, which is usually the link, then collect again.

**Use saved data doesn't offer the table.** The run from Step 1 must finish and be saved first. Open History to check it's there, then return to the Upload step.

**Some pages came back empty.** A page that showed a verification or a sign-in gives nothing. Open one in your browser, complete the check, and run those addresses again.

**The merged table mixes two layouts.** Items from different sites have different columns, and the merged table shows all of them. Open one site's table with **View** for a single clean set.

## Conclusion

You collected a list and then every page it links to, in two runs and one merged table. For product pages specifically, see How to scrape product data and reviews from Amazon and other stores. For a list of addresses you already have, see How To Scrape Data from a List of URLs in One Run.
