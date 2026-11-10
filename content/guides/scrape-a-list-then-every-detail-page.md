---
title: "How To Scrape a List and Then Every Detail Page"
description: "Collect a list page with its links, then what each linked page holds: its text, the site's contact details, or a product's full details."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: bulk-scraper
sites: []
video: ""
campaign: guide-scrape-a-list-then-every-detail-page
# Facts checked against chrome-extension-source on 2026-11-10:
# Choose from lists we found, Choose an item on the page, Collect more pages, Stop after: components/scraper/ListTab.tsx
# Bulk scrape menu with Collect contacts and Collect page text: entrypoints/sidepanel/main.tsx
# Use saved data, Reuse URLs from a saved table, Choose a saved table, Continue, Review sites, Continue to site configuration, Clean page text, Page details, Start collecting, Waiting for you, Collection results, View merged table: entrypoints/bulk/main.tsx
# Email addresses, Phone numbers, Social media links options: entrypoints/bulk/ContactOptions.tsx
# Bulk works through the sites and their addresses in order: lib/bulk/useBulkRunner.ts
# Page text columns Source URL, Page title, Description, Page text, Word count, Author, Publish date: lib/content/pageTextExtraction.ts
# Contact rows: Website, Email count, Emails, Phone count, Phones, Faxes, social platform columns: lib/utils/data-processing.ts, DECISIONS.md D-021
# Bulk modes are list, Google Maps, Scholar, contacts and page text; no product-page fields in bulk: lib/bulk/executors/
# Microsoft Word export for page-text collections, Copy text: entrypoints/dataviewer/main.tsx
# Properties tab Collect details on this page, View all reviews, Collect reviews: components/scraper/PropertiesTab.tsx
faq:
  - q: "How do I scrape a list page and then each item's page?"
    a: "Collect the list with the List tab, and check it has a column of links. Then click the Bulk scrape icon, choose Collect page text or Collect contacts, pick Use saved data on the Upload step, and choose that link column. The linked pages are read in turn, and View merged table puts them in one table."
  - q: "Do I have to paste the links by hand?"
    a: "No. Use saved data takes the addresses from a column of a table you collected earlier."
  - q: "Can a bulk run read each product's price and seller?"
    a: "Not in 1.3.0. A bulk run collects lists, Google Maps searches, Google Scholar results, contact details and page text. For a product page's fields, open the product and use the Properties tab, one page at a time."
  - q: "What does the merged table contain?"
    a: "One row per linked page with that run's columns. A page-text run gives Page title, Description, Author, Publish date, Word count and Page text, plus a Source URL column that says which page each row came from."
  - q: "Does the bulk page need to stay open?"
    a: "Yes. The bulk page reads the addresses in your own browser, so keep its tab open until it finishes."
  - q: "Can I do this on any website?"
    a: "On sites where the list links to a page per item and those pages open without a check you can't complete. The first collection needs a link column; the second reads each linked page's text or contact details."
---

Many lists link to a page per item, and that page holds what the list leaves out: the full text, the contact details, a product's full details. Web Scraper Pro collects the list and its links first, then reads the linked pages in a bulk run for their text or contact details. For products, you open each product page and use the **Properties** tab.

This guide walks through a list of articles and shows where products and directories differ.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A list page where each item links to its own page: a news section, a blog index, a directory, a job board or a store category.

## What You Get

You get two tables. The first has one row per item in the list, including a column of links. The second has one row per linked page, with what the bulk run collected and the page's address.

## Which Second Run to Pick

The second run depends on what the linked pages hold. Pick the row that matches, then follow the steps.

| The linked pages are | Second run | What each row gets |
|---|---|---|
| Articles, posts, help pages | **Bulk scrape** > **Collect page text** | Page title, description, author, publish date, word count, page text |
| Business or company sites | **Bulk scrape** > **Collect contacts** | Emails, phone numbers and social links from each site |
| Product pages | **Properties** tab, one page at a time | The product's details, images and reviews, where the page shows them |

A bulk run doesn't read a product page's fields in 1.3.0, so for products the second step is the Properties tab on each product you care about.

## Step 1 — Collecting the List

Open the list page in Chrome and open the side panel's **List** tab. Under **Choose from lists we found**, pick the card for the list, choose **Collect more pages** if the list continues, set **Stop after**, and click the collect button.

![](visual:ext/list-tab-detected)

The results open in a new tab with one row per item. Check that one column holds each item's address. Its name comes from the page, or from a ready-made setup on the sites that have one.

## Step 2 — Opening Bulk Scrape for the Second Run

Click the **Bulk scrape** icon at the top of the side panel and choose **Collect page text** for articles, or **Collect contacts** for business sites. A bulk page opens in a new tab on its **Upload** step.

![](visual:ext/bulk-menu)

The second run starts from the table you saved in the first, so there is nothing to paste.

## Step 3 — Choosing the Saved Link Column

On the **Upload** step, click **Use saved data**. The step reads **Reuse URLs from a saved table**, and a **Choose a saved table** card lists your collections. Pick the table from Step 1, then its link column, and click **Continue**.

![](visual:ext/bulk-use-saved-data)

## Step 4 — Setting Up the Run

For page text, choose **Clean page text**, **Page details** or both, and click **Start collecting**. For contacts, the **Review sites** step groups the addresses by site. Click **Continue to site configuration**, leave **Email addresses**, **Phone numbers** and **Social media links** on, and click **Start collecting**.

![](visual:ext/bulk-detect)

## Step 5 — Watching the Run

The bulk page opens the addresses in turn in its own browser view and counts the rows as they come in. Keep its tab open until it finishes.

![](visual:ext/bulk-run)

If a site asks you to verify, the run shows **Waiting for you**. Complete the check in the page, and the run carries on.

## Step 6 — Merging and Exporting

When it finishes, the **Collection results** page lists the run. Click **View merged table** for one table with every page's row and a **Source URL** column. Click **Export as** for **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**; page-text collections also offer **Microsoft Word**.

![](visual:ext/bulk-overview)

Here is the shape of a page-text run after export. The articles, authors and addresses are made up.

Sample data:

| Source URL | Page title | Author | Publish date | Word count |
|---|---|---|---|---|
| `https://news.example/sample-bridge` | Sample Article About a Bridge | Sample Writer | 2026-10-14 | 840 |
| `https://news.example/sample-ferry` | Sample Article About a Ferry | Sample Reporter | 2026-10-13 | 610 |
| `https://news.example/sample-budget` | Sample Article About a Budget | Sample Writer | 2026-10-12 | 1120 |

## Products: One Page at a Time

For a store category, the first collection already gives you one row per product, with the details the cards show and the link. For a product's full details, open it in Chrome, open the **Properties** tab, and click **Collect details on this page**. Where the product page has reviews, **View all reviews** and then **Collect reviews** gathers them.

Each product is saved as its own collection in History. Repeat it on the products that matter; a bulk run over product links isn't available in 1.3.0.

## When It Goes Wrong

**The first table has no link column.** The list's cards didn't carry a link the extension could read. Click **Choose an item on the page** and click the item's title, which is often the link, then collect again.

**Use saved data doesn't offer the table.** The collection from Step 1 must finish and be saved first. Open History to check it's there, then return to the Upload step.

**Some pages came back empty.** A page that showed a verification or a sign-in gives nothing. Open one in your browser, complete the check, and run those addresses again.

**The text includes a menu or a cookie banner.** A site can mark its menus as content. Delete those lines after export, or copy the text you need from that row with **Copy text**.

## Conclusion

You collected a list and then the pages it links to: the text of each article or the contact details of each site in one merged table, and a product's full details from the Properties tab. For more on runs over many addresses, see the [bulk scraper page](/bulk-scraper). For page text on its own, see the [page text page](/page-text).
