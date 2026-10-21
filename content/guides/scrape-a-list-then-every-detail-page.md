---
title: "How To Scrape a List and Then Every Detail Page"
description: "Collect a list page with its links, then get what the linked pages hold: each page's text in one bulk run, contact details from each site, or a product's full details from the Properties tab."
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
    a: "Collect the list with the List tab, which saves a link column. Then click the Bulk scrape icon, choose Collect page text or Collect contacts, pick Use saved data on the Upload step, and choose that link column. Every linked page is read in turn into one merged table."
  - q: "Do I have to paste the links by hand?"
    a: "No. Use saved data takes the addresses straight from a column of a table you collected earlier."
  - q: "Can a bulk run read each product's price and seller?"
    a: "Not yet. A bulk run collects lists, Google Maps searches, contact details and page text. For a product page's fields, open the product and use the Properties tab, one page at a time."
  - q: "What does the merged table contain?"
    a: "One row per linked page with that run's columns, such as Page title, Author, Publish date and Page text, plus a Source URL column that says which page each row came from."
  - q: "How long does it take?"
    a: "Pages run one at a time, at a person's pace. A few hundred pages is a normal run; the tab needs to stay open until it finishes."
  - q: "Can I do this on any website?"
    a: "On any site where the list links to a page per item. The first run needs a link column; the second reads each linked page's text or contact details."
---

<!--
Facts to confirm with a verified run on 1.3.0 before this leaves draft:
- The List tab's link column name on a generic site (the ready-made packs name it Product URL, Listing link or similar).
- The Upload step's Use saved data tab shows the heading Reuse URLs from a saved table and a Choose a saved table card with the table's columns (entrypoints/bulk/main.tsx).
- A bulk run has list, Google Maps, Scholar, contacts and page-text modes only (lib/bulk/executors); this guide claims no product details from a bulk run.
- Capture: ext/bulk-use-saved-data (the Upload step with a saved table and its link column chosen).
-->

Many lists link to a page per item, and the page holds what the list leaves out: the full text, the contact details, the complete price and seller. Web Scraper Pro gets the list and its links in one run, then reads the linked pages in a second run for their text or contact details, or one at a time for a product's fields. This guide walks through a list of articles and shows where products and directories differ.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A list page where each item links to its own page: a news section, a blog index, a directory, a job board or a store category.

## What You Get

Two tables. The first has one row per item in the list, with a link column. The second has one row per linked page, with what the second run collected and a Source URL column.

| Table | Column | Example |
|---|---|---|
| List | Title | Why the harbour bridge closed for a week |
| List | Link | news.example/harbour-bridge-closure |
| Details (page text) | Page title, Author, Publish date | Why the harbour bridge closed…, A. Writer, 2026-10-14 |
| Details (page text) | Word count, Page text | 840, the article's text |
| Details (contacts) | Email addresses, Phone numbers | hello@firm.example, (555) 010-2231 |
| Details | Source URL | news.example/harbour-bridge-closure |

## Which Second Run to Pick

The second run depends on what the linked pages hold. Pick the row that matches, then follow the steps.

| The linked pages are | Second run | What each row gets |
|---|---|---|
| Articles, posts, help pages | Bulk scrape → **Collect page text** | Page title, description, author, date, word count, text |
| Business or company sites | Bulk scrape → **Collect contacts** | Emails, phone numbers, social links from each site |
| Product pages | **Properties** tab, one page at a time | Title, current price, list price, rating, seller, images, reviews |

A bulk run doesn't read a product page's fields yet, so for products the second step is the Properties tab on each product you care about. For a list of search pages rather than product pages, see How To Compare Prices Across Stores in One Run.

## Step 1 — Collecting the List

Open the list page in Chrome and open the side panel's **List** tab. Under **Choose from lists we found**, pick the card for the list, choose **Collect more pages** if the list continues, set **Stop after**, and click **Collect**.

![](visual:ext/list-tab-detected)

The results page opens with one row per item. Check that a link column is there, such as `Product URL`, `Listing link` or the page's own label. What matters is that each cell holds the item's address.

## Step 2 — Opening Bulk Scrape for the Second Run

Click the **Bulk scrape** icon (the layers icon at the top of the side panel) and choose **Collect page text** for articles, or **Collect contacts** for business sites. A bulk page opens in a new tab on its **Upload** step.

![](visual:ext/bulk-menu)

The second run starts from the table you saved in the first, so there is nothing to paste.

## Step 3 — Choosing the Saved Link Column

On the **Upload** step, click **Use saved data**. The step now reads **Reuse URLs from a saved table**, and a **Choose a saved table** card lists your collections. Pick the table from Step 1, then its link column. The chip reads **N valid URLs detected**, one per item in the list. Click **Continue →**.

![](visual:ext/bulk-use-saved-data)

## Step 4 — Setting Up the Run

For page text, choose **Clean page text**, **Page details** or both, and click **Start collecting →**. For contacts, the **Review sites** step groups the addresses by site; click **Continue to site configuration →**, leave **Email addresses**, **Phone numbers** and **Social media links** on, and click **Start collecting →**.

![](visual:ext/bulk-detect)

## Step 5 — Watching the Run

Pages load one after another in the embedded browser on the right, while the card on the left counts rows. The run goes one page at a time on purpose, so the site sees an ordinary visitor. If the site asks you to verify, the run pauses with **Waiting for you**; complete the check in the embedded browser and it carries on.

![](visual:ext/bulk-run)

## Step 6 — Merging and Exporting

When it finishes, the **Collection results** page lists the run with its row count. Click **View merged table** for one table with every page's row and a **Source URL** column. Click **Export as** for **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**; page-text runs also offer **Microsoft Word**.

![](visual:ext/bulk-overview)

After export, a page-text run looks like this. The articles are made up.

| Source URL | Page title | Author | Publish date | Word count |
|---|---|---|---|---|
| news.example/harbour-bridge-closure | Why the harbour bridge closed for a week | A. Writer | 2026-10-14 | 840 |
| news.example/new-ferry-timetable | The new ferry timetable, explained | B. Reporter | 2026-10-13 | 610 |
| news.example/council-budget-vote | Council passes the budget on a second vote | A. Writer | 2026-10-12 | 1,120 |

## Products: One Page at a Time

For a store category, the first run already gives you one row per product with name, price and link. For a product's full fields, open it in Chrome, open the **Properties** tab, and click **Collect details on this page**: title, current price, list price, discount, rating, seller, availability and the image gallery. **View all reviews**, then **Collect reviews**, gathers its reviews across their pages.

Each product is saved as its own collection in History. For every product in the list, repeat on the ones that matter; a bulk run over the product links isn't available yet.

## When It Goes Wrong

**The first table has no link column.** The list's cards didn't carry a link the extension could read. Click **Choose an item on the page** and click the item's title, which is usually the link, then collect again.

**Use saved data doesn't offer the table.** The run from Step 1 must finish and be saved first. Open History to check it's there, then return to the Upload step.

**Some pages came back empty.** A page that showed a verification or a sign-in gives nothing. Open one in your browser, complete the check, and run those addresses again.

**The text includes a menu or a cookie banner.** Rare, but a site can mark its chrome as content. Choose Clean page text and delete the lines in Word, or use Copy text on that row.

## Conclusion

You collected a list and then every page it links to: the text of each article or the contact details of each site in one merged table, and a product's full details from the Properties tab. For a list of addresses you already have, see How To Scrape Data from a List of URLs in One Run. For page text on its own, see How To Save a Web Page as a Word Document.
