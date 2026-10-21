---
title: "How To Scrape Indeed Job Postings into a Spreadsheet"
description: "Turn an Indeed search into a spreadsheet of roles with title, company, location, salary where shown, posting date and link, across every page, with no code."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-indeed-job-postings
faq:
  - q: "Does Indeed allow scraping?"
    a: "Indeed's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser. Collect the roles for your own research, keep it to public postings, and read the terms before reusing anything. Postings are about jobs, not people."
  - q: "Is there a free Indeed job scraper?"
    a: "Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create. Open an Indeed search in Chrome, pick the list in the side panel, and collect every page."
  - q: "Which columns do I get from Indeed?"
    a: "Indeed has no ready-made setup yet, so the columns are named from what the results cards show: job title, company, location, salary where the posting states one, posting date and the link. A column the card doesn't show stays out."
  - q: "Can I get the full job description for each posting?"
    a: "The list gives the title, company and link. Paste the Link column into Bulk scrape → Collect page text and each posting becomes a row with its text and word count."
  - q: "Why did Indeed show a verification page?"
    a: "Indeed checks visitors now and then, and it does so more often after many pages in a row. Complete the check in the tab, click Rescan, and collect again from the page you're on. What was collected is kept."
  - q: "Can I collect several Indeed searches at once?"
    a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings; View merged table puts the rows together."
  - q: "Does it collect candidates or recruiters?"
    a: "No. It collects the roles a page lists. The extension isn't built to collect profiles, and this guide never asks you to."
  - q: "Will Indeed ban me for this?"
    a: "You're reading public job listings in your own browser at a person's pace, without signing in. Indeed sometimes shows a verification page; complete it in the tab and carry on. Keep runs to one search at a time."
---

<!-- Draft from the competitor-corpus candidates (2026-10-21). Indeed has no verified run on 1.3.0, and the content plan holds it
     until there is one. A verified run must confirm: the lists the List tab detects on an Indeed search page and which card is
     the results; the column names it produces (title, company, location, salary, posting date, link); whether the Next
     button is found on its own; how often Indeed's verification page appears during paging; whether sponsored postings are
     marked. Update the sample table and the capture ids from that run. -->

Search Indeed for a role in a place, and Web Scraper Pro collects every page of results into a spreadsheet: job title, company, location, salary where the posting states one, posting date and link. You get a table you can sort by company or pay, for salary research, hiring-market research or tracking who is hiring. This guide shows each step on version 1.3.0 and collects roles only, never people.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- An Indeed search with the filters you want set: job title or keyword, location, date posted, salary, remote.

## Does Indeed Allow Scraping?

Indeed's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser, at a person's pace. Collect the roles for your own research, keep it to public postings, and read [Is web scraping legal?](/web-scraping-legal) before reusing anything; it isn't legal advice.

## What You Get

Indeed has no ready-made setup yet, so the columns are named from what the results cards show. A column the card doesn't show stays out, and nothing is guessed.

| Column | Example |
|---|---|
| Job Title | Customer Support Specialist |
| Company | Sample Software Co. |
| Location | Springfield, IL (Remote) |
| Salary | $48,000 - $55,000 a year |
| Posted | 3 days ago |
| Job Type | Full-time |
| Link | indeed.com/viewjob?jk=… |

## Step 1 — Running the Search on Indeed

In this step you shape the list, because the extension collects what the page shows. Go to indeed.com, enter a job title or keyword and a location, and apply the filters: date posted, salary, job type, remote.

Narrow the search before collecting. A broad keyword in a large city runs to hundreds of pages, and Indeed checks visitors more often after many pages in a row. With the results on screen, you're ready to pick the list.

## Step 2 — Picking the List in the Side Panel

Here you tell the extension which list on the page to collect. Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, the postings show as **List 1** with the number of postings on this page.

![](visual:ext/list-tab-detected)

Hover the card and the postings are outlined on the page. Indeed pages also hold a list of related searches and a column of filters, so if the first card isn't the postings, pick the card whose count matches.

Or click **Choose an item on the page** and click one posting; every similar one is picked with it. The list is chosen, so next you say how far to go.

## Step 3 — Collecting Every Page

This step follows the results across pages. Choose **Collect more pages**. Indeed moves on with a Next link, so the panel shows **Next button ready**; if it doesn't, click **Change** and click Indeed's own next-page button.

![](visual:ext/list-tab-pagination-choice)

Under **Stop after**, pick how many pages, or **All pages** for the whole search, and click **Collect from 5 pages** (or the count you set). Keep the tab in front; the tab's title counts the postings as they come in.

If Indeed shows a verification page, the run stops and the panel says so. Complete the check in the tab, click **Rescan**, and collect again from the page you're on. When it finishes, the results page opens.

## Step 4 — Reviewing the Table

Now you check the columns before using them. The results page shows one row per posting, with the chip at the top giving the total, and rows that appeared on more than one page are kept once.

![](visual:ext/results-many-pages)

Hover a column header to rename it with the pencil, such as changing Indeed's label to Company, or remove it with the trash icon. Salary is filled only where the posting states one, because many don't.

Mostly empty columns are hidden on their own; click **Columns** to show them. Click **Filter rows** to keep one company, one location or only rows with a salary. The table is clean, so the next step is optional detail.

## Step 5 — Adding the Job Descriptions

For the full text of each posting, this step reads every posting page in one run. Click the **Bulk scrape** icon (the layers icon at the top of the side panel) and choose **Collect page text**. On the upload step, choose **Use saved data** and pick this collection and its Link column, then click **Continue →**.

![](visual:ext/bulk-menu)

Choose clean text, page details or both, and click **Start collecting →**. Each posting becomes a row with its title, text and word count, and **View merged table** puts them together.

If a posting page asks for a verification, the run pauses with **Waiting for you**; complete the check in the embedded browser and it carries on. With the descriptions in, the last step is the export.

## Step 6 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The collection is saved in History, so run the same search next week and compare on the Link column to see what's new.

![](visual:ext/results-export-menu)

Here is what a few rows look like after Step 4; the companies, roles and figures are made up.

Sample data:

| Job Title | Company | Location | Salary | Posted |
|---|---|---|---|---|
| Customer Support Specialist | Sample Software Co. | Springfield, IL (Remote) | $48,000 - $55,000 a year | 3 days ago |
| Warehouse Associate | Riverside Logistics | Springfield, IL | $19 an hour | 1 day ago |
| Marketing Coordinator | Northside Media | Springfield, IL (Hybrid) | | 5 days ago |

## When It Goes Wrong

**Indeed showed a verification page.** Complete the check in the tab, click **Rescan**, and collect again from the page you're on. What was collected is kept. If it keeps happening, collect fewer pages per run and leave a few minutes between runs.

**Next button ready never appears.** Click **Change** and click Indeed's own next-page button at the bottom of the results; the extension remembers it for the run.

**The List tab found the related searches, not the postings.** Pick the card whose count matches the number of postings on the page, or click **Choose an item on the page** and click one posting.

**The Salary column is mostly empty.** Many postings don't state pay. Use Indeed's salary filter before collecting, or filter rows on the results page to the ones that do.

**The same posting appears twice.** Postings repeated across pages are kept once on their own. If Indeed reorders results between pages, a few can slip through; use **Remove duplicates** on the Link column.

## Conclusion

You collected an Indeed search into a spreadsheet of roles with links, and optionally their descriptions, ready for salary research or a hiring report. For one company's openings rather than a board, see [How To Scrape Job Listings from Any Company Career Page](/guides/collect-job-postings-from-a-careers-page). The roles are the data; the people behind them are not.
