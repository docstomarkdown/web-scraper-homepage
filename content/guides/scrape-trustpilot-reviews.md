---
title: "How To Scrape Trustpilot Reviews into a Spreadsheet"
description: "Collect the reviews on a company's Trustpilot page into Excel, with the rating, title, text, date and reviewer in columns, across its pages, with no code."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-trustpilot-reviews
# Facts checked against chrome-extension-source on 2026-11-10: the Trustpilot setup covers company search results only (cards with data-business-unit-card-link: Company Name, Trustpilot Profile URL, Website, TrustScore, Star Rating, Review Count, Address), not the reviews on a company page: configs-prod/trustpilot.com.json, configs-prod/site-column-mappings/trustpilot.com.json, lib/platform/hooks/trustpilot.ts
# Facts checked against chrome-extension-source on 2026-11-10: when a setup's list selectors match nothing on a page, the generic list detection runs and columns are named from the page: lib/content/scanForListsCore.ts (Strategy 0a, skipGenericStrategies)
# Facts checked against chrome-extension-source on 2026-11-10: "How much to collect", "This page only", "Collect more pages", Next page / Load more / Auto scroll, "Next button ready", "Change", "Stop after" 5/10/20/All pages/Custom, "Collect from N pages": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page", "Rescan page": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: "Filter rows" on the results page; Export as Google Sheets, Microsoft Excel, CSV, JSON: lib/tools/helpTopics.json, entrypoints/dataviewer/main.tsx
faq:
  - q: "How do I scrape Trustpilot reviews for free?"
    a: "Open the company's Trustpilot page in Chrome, open the Web Scraper Pro side panel's List tab, pick the reviews list, choose Collect more pages, and click Collect. The extension is free, with no paid plan."
  - q: "Can I get all the reviews, not only the first page?"
    a: "Yes. Choose Collect more pages and set Stop after to All pages. The run follows the next-page link and adds the reviews from each page to one table."
  - q: "Which columns do I get?"
    a: "The extension's Trustpilot setup covers company search results, not reviews, so on a review page the columns are named from the page. Expect the reviewer, rating, title, text and date where the page shows them, and rename any column on the results page."
  - q: "Can I filter to one-star or five-star reviews only?"
    a: "Filter the reviews on Trustpilot first, using its own star filter, and collect that page. Or collect everything and use Filter rows on the results page."
  - q: "Can I collect a list of companies from Trustpilot?"
    a: "Yes. On a Trustpilot company search, the extension's setup gives named columns: Company Name, Trustpilot Profile URL, Website, TrustScore, Star Rating, Review Count and Address."
  - q: "Is scraping Trustpilot allowed?"
    a: "Trustpilot's terms restrict automated collection. You collect public reviews in your own browser at a person's pace, for your own research. Read our plain-words explainer on web scraping and the law before reusing anything; it isn't legal advice."
---

Web Scraper Pro turns a company's Trustpilot page into a spreadsheet of reviews, one row per review. You pick the reviews list in the side panel, set how many pages to go through, and click once. The columns are named from the page, so the rating, title, text and date each get their own column where the page shows them.

## Does Trustpilot Allow Scraping?

Trustpilot's terms restrict automated collection, and the reviews belong to the people who wrote them. Collecting public reviews in your own browser, at a person's pace, for your own analysis is the low-risk end of that. Read [Is web scraping legal?](/web-scraping-legal) before reusing or republishing anything; it isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- The Trustpilot page of the company you want to study, such as `https://www.trustpilot.com/review/example.com`.

## What You Get

The extension has a ready-made Trustpilot setup, but it covers company search results, not the reviews on a company's page. On a review page the List tab works as it does on any site: it finds the list and names the columns from the page.

That means the column names aren't fixed. A review list usually holds these details, and each one the page shows becomes a column. Sample data: the reviewer and text are made up.

| Detail | Example |
|---|---|
| Reviewer | Sample Reviewer |
| Rating | 4 |
| Title | Fast delivery, slow refund |
| Review text | The parcel came in 2 days, but the refund took 3 weeks. |
| Date | 12 October 2026 |

Check the columns on a first page before a long run, and rename any of them on the results page before you export.

## Step 1 — Opening the Company's Review Page

In this step you open the reviews and find their list in the side panel. In Chrome, go to the company's Trustpilot page and scroll down to the reviews. If you only want one star rating, use Trustpilot's own star filter first; the extension collects what the page shows.

Click the Web Scraper Pro icon to open the side panel, then open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with the number of items on this page.

![](visual:ext/list-tab-detected)

Hover a card and the list it means is outlined on the page. Pick the card whose count matches the reviews you can see.

If no card is the reviews, click **Choose an item on the page** and click one review; similar reviews are picked with it. You have found the reviews list; next you tell the extension how far to go.

## Step 2 — Choosing to Collect More Pages

Under **How much to collect**, **This page only** collects the reviews you can see. Choose **Collect more pages** to follow the reviews onto Trustpilot's next pages.

![](visual:ext/list-tab-pagination-choice)

The extension looks at the page to work out how it moves on. If it finds the next-page link, the panel shows **Next button ready**. If it asks instead, choose **Next page**; if it picked the wrong control, click **Change** and click Trustpilot's own next-page link.

## Step 3 — Setting How Many Pages

Under **Stop after**, pick **5 pages**, **10 pages**, **20 pages**, **All pages**, or **Custom** for a number you type. For a company with thousands of reviews, collect in a few shorter runs rather than one long one.

![](visual:ext/list-tab-more-pages)

Click **Collect from N pages**, where N is the number you set. You have started the run, and the next step is reading the table it produces.

## Step 4 — Reviewing the Table

When the run finishes, the results page opens with one row per review. Check the column names first, because they come from the page.

![](visual:ext/results-many-pages)

Hover a column header to rename it with the pencil or remove it with the trash icon. Click **Filter rows** to keep only the rows you want, such as the low ratings. Or, with the results tab in front, type in the side panel's chat:

```
Only rating, title, text and date, sorted by date
```

The chat arranges the table for you, and the arrangement is what you export next.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The file holds the rows and columns as shown, and the collection stays in History.

![](visual:ext/results-export-menu)

After export the sheet looks like this, with your own column names. Sample data: the names and text are made up.

| Reviewer | Rating | Title | Review text | Date |
|---|---|---|---|---|
| Sample Reviewer | 4 | Fast delivery, slow refund | The parcel came in 2 days, but the refund took 3 weeks. | 12 October 2026 |
| Test Customer | 1 | Never arrived | Two emails, no reply, no parcel. | 9 October 2026 |
| Example Buyer | 5 | Exactly as described | Second order, both fine. | 3 October 2026 |

## When It Goes Wrong

**The List tab found a different list.** A Trustpilot page also holds other companies and category links. Pick the card whose count matches the reviews on screen, or click **Choose an item on the page** and click one review.

**Only the first page was collected.** **This page only** collects one page. Choose **Collect more pages**, confirm **Next page**, and set **Stop after**.

**Trustpilot showed a verification page.** Complete the check in the tab, click **Rescan page** at the top of the List tab, and collect again from the page you're on. Collect in smaller runs afterwards.

**The text column is cut short.** Some long reviews show only their first lines on the page. The extension collects what the page shows; open the review to read the rest.

## Conclusion

You collected a company's Trustpilot reviews into a spreadsheet, ready to sort, filter and count. To compare several companies, search for them on Trustpilot: the company search has a ready-made setup with TrustScore and Review Count columns. For reviews on a store's product page rather than a company page, open the product and use the Properties tab, described on the [product details page](/product-scraper).
