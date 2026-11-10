---
title: "How To Scrape Indeed Job Postings into a Spreadsheet"
description: "Turn an Indeed search into a spreadsheet of roles, with the details each results card shows and a link to each posting, across every page, with no code."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-indeed-job-postings
# Facts checked against chrome-extension-source on 2026-11-10:
# Indeed has no setup (no indeed file in configs-prod/ or public/site-sitemaps/), so the page names no columns as fact and the List tab steps are written as conditional
# List 1, Choose from lists we found, Choose an item on the page, Collect more pages, Next page / Load more / Auto scroll, Next button ready, Select the "Next" button, Change, Stop after, 5/10/20/All pages, Collect from N pages, Stop and save, Rescan page: components/scraper/ListTab.tsx
# Results open in a new tab when collection ends: lib/background/viewerNavigation.ts
# Remove duplicates and Hide mostly empty columns are settings, on by default: components/scraper/ResultsSettingsCards.tsx, lib/preferences/resultPreferences.ts
# Mostly empty columns can be shown again on the results page: entrypoints/dataviewer/main.tsx
# Edit column name, Filter rows, chat filters ("Salary filled"): entrypoints/dataviewer/main.tsx, entrypoints/dataviewer/rowFilters.ts
# Bulk scrape menu > Collect page text, Use saved data, Continue, Clean text / Page details, Start collecting, Waiting for you, View merged table: entrypoints/sidepanel/main.tsx, entrypoints/bulk/main.tsx
# Page text rows carry a Word count: lib/content/pageTextExtraction.ts
# Export as Microsoft Excel, CSV, JSON, Google Sheets: entrypoints/dataviewer/main.tsx
faq:
  - q: "Does Indeed allow scraping?"
    a: "Indeed's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser. Collect the roles for your own research, keep it to public postings, and read the terms before reusing anything. Postings are about jobs, not people."
  - q: "Is there a free Indeed job scraper?"
    a: "Web Scraper Pro is free, with no paid plan and no account to create. Open an Indeed search in Chrome, pick the list in the side panel, and collect every page."
  - q: "Which columns do I get from Indeed?"
    a: "Indeed has no ready-made setup in the extension, so the columns are named from the page: whatever the results cards show, such as the title, company, location, pay where stated and the link. You can rename or remove any of them before you export."
  - q: "Can I get the full job description for each posting?"
    a: "The list gives what the results cards show and the link to each posting. Use Bulk scrape > Collect page text on the link column, and each posting becomes a row with its text and word count."
  - q: "Why did Indeed show a verification page?"
    a: "Indeed checks visitors from time to time. Complete the check in the tab yourself, click Rescan page in the List tab, and collect again from the page you're on. The extension doesn't get past these checks for you."
  - q: "Can I collect several Indeed searches at once?"
    a: "Bulk scrape takes a list of addresses and collects each in turn, and View merged table puts the rows together. Start with one search to check the columns before you add more."
  - q: "Does it collect candidates or recruiters?"
    a: "No. This guide collects the roles a search page lists. The extension isn't built to collect profiles, and this guide never asks you to."
---

Search Indeed for a role in a place, and Web Scraper Pro can collect every page of results into a spreadsheet, with one row per posting and the details each results card shows. You get a table you can sort and filter for salary research, hiring-market research or tracking who is hiring. The guide collects roles only, never people.

Indeed has no ready-made setup in the extension. The List tab looks for the postings itself, so this guide shows what to do when it finds them and what to do when it doesn't.

## Does Indeed Allow Scraping?

Indeed's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser. Collect the roles for your own research, keep it to public postings, and read [Is web scraping legal?](/web-scraping-legal) before reusing anything; it isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- An Indeed search with the filters you want set: job title or keyword, location, date posted, salary, remote.

## What You Get

Without a setup, the columns are named from the page: one column for each detail the results cards show. On a jobs board that is often the job title, the company, the location, the pay where the posting states one, and a link to the posting.

Check the columns on the results page before you rely on them. A detail the cards don't show doesn't appear, and you can rename or remove any column before you export.

## Step 1 — Running the Search on Indeed

In this step you shape the list, because the extension collects what the page shows. Go to indeed.com, enter a job title or keyword and a location, and apply the filters: date posted, salary, job type, remote.

Narrow the search before collecting. A broad keyword in a large city runs to many pages, and a smaller search is quicker to check. With the results on screen, you're ready to pick the list.

## Step 2 — Picking the List in the Side Panel

Here you tell the extension which list on the page to collect. Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, each list the extension found shows as a card such as **List 1**, with the number of items on this page.

![](visual:ext/list-tab-detected)

Hover a card and its items are outlined on the page. A search page also holds filters and related links, so pick the card whose count matches the number of postings you see.

If no card outlines the postings, click **Choose an item on the page** and click one posting; the similar postings are picked with it. With the list chosen, you say how far to go next.

## Step 3 — Collecting Every Page

This step follows the results across pages. Choose **Collect more pages**, and the side panel looks for the way to the next page. If it finds Indeed's next-page link, it shows **Next button ready**.

![](visual:ext/list-tab-pagination-choice)

If it doesn't, choose **Next page**. The panel asks you to select the Next button, so click Indeed's own next-page button at the bottom of the results. To pick a different button later, click **Change**.

Under **Stop after**, pick **5 pages**, **10 pages**, **20 pages** or **All pages**, and click the collect button, such as **Collect from 5 pages**. Keep the tab in front. The side panel counts the postings as they come in, and **Stop and save** keeps what it has at any time.

If Indeed shows a verification page, complete the check in the tab yourself, click **Rescan page** at the top of the List tab, and collect again from the page you're on. When collection finishes, the results open in a new tab.

## Step 4 — Reviewing the Table

Now you check the columns before using them. The results page shows one row per posting.

![](visual:ext/results-many-pages)

Two settings shape the table, and both are on unless you turned them off in Settings. **Remove duplicates** keeps one copy when the same result shows up twice, and **Hide mostly empty columns** hides columns filled for fewer than a third of the rows. The results page lets you show hidden columns again.

Hover a column header and click **Edit column name** to give it a clear name, such as Company or Salary. To keep only some rows, type a filter in the side panel's chat with the results tab in front, for example `Salary filled` or `Company contains Sample`. The next step is optional detail.

## Step 5 — Adding the Job Descriptions

For the full text of each posting, this step reads every posting page in one run. Click the **Bulk scrape** icon at the top of the side panel and choose **Collect page text**. On the upload step, choose **Use saved data**, pick this collection and the column that holds the posting links, then click **Continue**.

![](visual:ext/bulk-menu)

Choose **Clean page text**, **Page details** or both, and click **Start collecting**. Each posting becomes a row with its text and a word count, and **View merged table** puts them together.

If a posting page asks for a verification, the run shows **Waiting for you**. Complete the check in the page, and the run carries on. With the descriptions in, the last step is the export.

## Step 6 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The collection is saved in History, so you can run the same search next week and compare the link columns to see what's new.

![](visual:ext/results-export-menu)

Here is the shape of a few rows after you rename the columns in Step 4. The column names are examples you choose, and the companies, roles and figures are made up.

Sample data:

| Job Title | Company | Location | Salary | Link |
|---|---|---|---|---|
| Sample Support Specialist | Sample Software Co. | Example City (Remote) | $48,000 - $55,000 a year | `https://jobs.example/sample-1` |
| Sample Warehouse Associate | Sample Logistics Ltd. | Example City | $19 an hour | `https://jobs.example/sample-2` |
| Sample Marketing Coordinator | Sample Media Co. | Example City (Hybrid) | | `https://jobs.example/sample-3` |

## When It Goes Wrong

**Indeed showed a verification page.** Complete the check in the tab, click **Rescan page**, and collect again from the page you're on. If it keeps happening, collect fewer pages at a time.

**Next button ready never appears.** Choose **Next page** and click Indeed's own next-page button at the bottom of the results when the panel asks.

**The List tab found the related links, not the postings.** Pick the card whose count matches the number of postings on the page, or click **Choose an item on the page** and click one posting.

**The salary column is mostly empty.** Many postings don't state pay, and a column filled for fewer than a third of the rows may be hidden. Use Indeed's salary filter before collecting, or show the column again on the results page.

**The same posting appears twice.** Check that **Remove duplicates** is on in Settings. If Indeed reorders results between pages, a posting can appear on two pages with different details, so sort by the link column to spot it.

## Conclusion

You collected an Indeed search into a spreadsheet of roles with links, and optionally their descriptions, ready for salary research or a hiring report. For one company's openings rather than a board, see [How To Scrape Job Listings from Any Company Career Page](/guides/collect-job-postings-from-a-careers-page). The roles are the data; the people behind them are not.
