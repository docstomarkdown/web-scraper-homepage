---
title: "How To Scrape Trustpilot Reviews into a Spreadsheet"
description: "Collect every review on a company's Trustpilot page into Excel, with the star rating, title, text, date and reviewer, across every page, with no code."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-trustpilot-reviews
faq:
  - q: "How do I scrape Trustpilot reviews for free?"
    a: "Open the company's Trustpilot page in Chrome, open the Web Scraper Pro side panel's List tab, pick the reviews list, choose Collect more pages, and click Collect. The extension is free, with every feature included and no paid plan."
  - q: "Can I get all the reviews, not only the first page?"
    a: "Yes. Choose Collect more pages and set Stop after to All pages. The run clicks through the numbered pages and adds every review to one table."
  - q: "Which columns do I get?"
    a: "Trustpilot has no ready-made setup, so the columns come from the page: the reviewer's name, the star rating, the review title, the text, the date, and the reviewer's location when it is shown. Rename any column on the results page."
  - q: "Can I filter to one-star or five-star reviews only?"
    a: "Filter the reviews on Trustpilot first, using its star filter, and collect that page. Or collect everything and use Filter rows on the results page."
  - q: "Can I collect reviews for several companies at once?"
    a: "Yes. Paste the Trustpilot page addresses into Bulk scrape and each company is collected in turn, with the same page settings."
  - q: "Is scraping Trustpilot allowed?"
    a: "Trustpilot's terms restrict automated collection. You collect public reviews in your own browser at a person's pace, for your own research. Read our plain-words explainer on web scraping and the law before reusing anything; it isn't legal advice."
---

<!--
Draft until a real run on 1.3.0 confirms: (1) the List tab detects the review list on a trustpilot.com company
page and not the sidebar or "similar companies"; (2) the page moves on by numbered pages (Next page), not Load
more; (3) which columns come out and their page-given names (reviewer, stars, title, text, date, location);
(4) whether Trustpilot shows a verification after a long run. No pack exists for Trustpilot; everything below
uses the generic List tab flow from content/features/list-scraper.ts. Replace the sample table with real,
anonymised column names after the run. Title targets "scrape trustpilot reviews" (AUTOSUGGEST, 2026-10-21).
-->

Web Scraper Pro turns a company's Trustpilot page into a spreadsheet of reviews, with the star rating, title, text, date and reviewer in their own columns. You pick the reviews list, set how many pages to go through, and click once. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- The Trustpilot page of the company you want to study, such as `https://www.trustpilot.com/review/example.com`.

## Does Trustpilot Allow Scraping?

Trustpilot's terms restrict automated collection, and the reviews belong to the people who wrote them. Collecting public reviews in your own browser, at a person's pace, for your own analysis is the low-risk end of that; read [Is web scraping legal?](/web-scraping-legal) before reusing or republishing anything. It isn't legal advice.

## What You Get

Trustpilot has no ready-made setup in the extension, so the columns are named from the page's own labels. On a review page they look like this:

| Column | Example |
|---|---|
| Reviewer | Sam R. |
| Rating | 4 |
| Title | Fast delivery, slow refund |
| Review text | The parcel came in two days, but the refund took three weeks. |
| Date | 12 October 2026 |
| Location | GB |

Column names differ a little from page to page. Rename any of them on the results page before you export.

## Step 1 — Opening the Company's Review Page

In Chrome, go to the company's Trustpilot page and scroll down to the reviews. If you only want one star rating, use Trustpilot's own star filter first; the extension collects what the page shows.

Click the Web Scraper Pro icon to open the side panel, then open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with the number of items on this page. The reviews list is the card whose count matches the reviews you can see, usually 20.

![](visual:ext/list-tab-detected)

Hover a card and the list it means is outlined on the page. You have found the reviews list; next you tell the extension how far to go.

## Step 2 — Choosing to Collect Every Page

With the reviews card picked, the panel shows **How much to collect**. **This page only** collects the reviews you can see. Choose **Collect more pages** to follow the list across the numbered pages at the bottom of Trustpilot's review list.

![](visual:ext/list-tab-pagination-choice)

The extension looks at the page to work out how it moves on and shows **Next button ready** when it finds the Next link. If it asks instead, choose **Next page**. If it picked the wrong button, click **Change** and click Trustpilot's own next-page arrow.

## Step 3 — Setting How Many Pages

Under **Stop after**, pick **5 pages**, **10 pages**, **20 pages**, **All pages**, or **Custom** for a number you type. A company with 2,000 reviews has 100 pages; collect them in a few runs rather than one long one, because long runs are what make sites slow down and ask you to verify.

![](visual:ext/list-tab-more-pages)

Click **Collect from all pages** (or the count you set). Keep the tab in front; the tab's title counts the reviews as they come in. You have started the run, and the next step is reading the table it produces.

## Step 4 — Reviewing the Table

When the run finishes, the results page opens with one row per review and a chip with the total, such as **380 total**. Reviews that appeared on more than one page are kept once.

![](visual:ext/results-many-pages)

Hover a column header to rename it with the pencil or remove it with the trash icon. Click **Filter rows** to keep, say, only the rows where the rating is 1 or 2. Or, with the results tab in front, type in the side panel's chat:

```
Only rating, title, text and date, sorted by date
```

The chat arranges the table for you, and the arrangement is what you export next.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The file holds the rows and columns as shown, with the rating saved as a number so you can average it. The collection stays in History.

![](visual:ext/results-export-menu)

After export the sheet looks like this. Sample data; the names and text are made up.

| Reviewer | Rating | Title | Review text | Date |
|---|---|---|---|---|
| Sam R. | 4 | Fast delivery, slow refund | The parcel came in two days, but the refund took three weeks. | 12 October 2026 |
| Priya K. | 1 | Never arrived | Two emails, no reply, no parcel. | 9 October 2026 |
| Leo M. | 5 | Exactly as described | Second order, both fine. | 3 October 2026 |

## When It Goes Wrong

**The List tab found a different list.** A Trustpilot page also holds "similar companies" and category links. Pick the card whose count matches the reviews on screen, or click **Choose an item on the page** and click one review.

**Only the first page was collected.** This page only is the default. Choose Collect more pages, confirm Next page, and set Stop after.

**Trustpilot showed a verification page.** Complete the check in the tab, click **Rescan**, and collect again from the page you are on. Collect in smaller runs afterwards.

**The text column is cut short.** Some long reviews show a "Read more" link on the card. The extension collects what the card shows; open the review to read the rest.

## Conclusion

You collected a company's Trustpilot reviews into a spreadsheet with the rating as a number, ready to sort, filter and count. To do the same for several competitors, paste their Trustpilot addresses into Bulk scrape; see How To Scrape Data from a List of URLs in One Run. For reviews on a product page rather than a company page, open the product and use the Properties tab, described on the product details feature page.
