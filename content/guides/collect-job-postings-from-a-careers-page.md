---
title: "How To Collect Job Postings from a Careers Page with Web Scraper Pro"
description: "Turn a company's careers page, or a job board's search, into a spreadsheet of roles with title, location, department and link, across every page, with no code. Roles only, never candidates."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-collect-job-postings-from-a-careers-page
faq:
  - q: "Does it work on any company's careers page?"
    a: "On any careers page that shows the roles as a list, which is nearly all of them, including the hosted ones (Greenhouse, Lever, Workday and similar). The List tab finds the list; if it picks the wrong one, click Choose an item on the page and click one role."
  - q: "Can it collect from Indeed or LinkedIn Jobs?"
    a: "Indeed's results are a list like any other, so the List tab collects what the page shows; it has no ready-made setup, so check the columns on the first page. LinkedIn needs a sign-in and forbids collection in its terms, so no."
  - q: "Can I get the full job description for each role?"
    a: "The list gives the title, location and link. Open a posting and use Collect page text in the Properties tab for its description, or paste the links into Bulk scrape → Collect page text for all of them at once."
  - q: "Can I track new postings every week?"
    a: "Run the same page again; each collection is saved in History with its date, and the posting link matches rows across runs. Scheduled runs are coming with the cloud."
  - q: "Does it collect candidates or recruiters?"
    a: "No. It collects the roles a page lists. Job postings are about jobs, not people, and the extension isn't built to collect profiles."
---

Turn a company's careers page, or a job board's search, into a spreadsheet of roles with title, location, department and link, across every page. Careers pages are lists, and the List tab finds them on the page without any setup, so the same steps work on a hosted board and a company's own site. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A careers page or a job board search with the filters you want set: location, department, keyword.

## Step 1 — Opening the careers page

Go to the page that lists the roles. On a company site it's usually Careers or Jobs; on a hosted board it's the company's page on that board. Apply the filters first, because the extension collects what the page shows.

## Step 2 — Picking the list

Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, the roles show as **List 1** with the number of postings on this page. Hover the card and the list is outlined on the page.

![](visual:ext/list-tab-careers)

Careers pages often hold other lists too, such as a row of departments or office locations. If the first card isn't the roles, pick the card whose count matches the number of postings, or click **Choose an item on the page** and click one posting; every similar posting is picked with it.

## Step 3 — Collecting every page

If the roles continue on more pages, or behind a **Load more** button, choose **Collect more pages**. The extension finds the Next button or the Load more button on its own and shows **Next button ready** or **Load more button ready**; set **Stop after** and click **Collect from 5 pages** or **Collect (5 loads)**. For a single page, **Collect N items** is enough.

![](visual:ext/list-tab-more-pages)

## Step 4 — Reading the results

The results page opens with one row per role. Because careers pages have no ready-made setup, the columns are named from the page's own labels, which usually means Title, Location, Department or Team, Type (full-time, contract), Posted and the link to the posting. A column the page doesn't show stays out.

Hover a header to rename it with the pencil, such as changing the site's label to Role, or remove one with the trash icon. Mostly empty columns are hidden on their own; click **Columns** to show them.

## Step 5 — Adding the job descriptions

For the full text of each posting, copy the link column into **Bulk scrape → Collect page text**: paste the links, click **Continue →**, then **Start collecting →**. Each posting becomes a row with its title, text and word count, and **View merged table** puts them together. Or open one posting and click **Collect page text** in the Properties tab.

## Step 6 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Run the same page next week and compare on the posting link to see what's new.

![](visual:ext/results-export-menu)

## Conclusion

You collected a careers page into a spreadsheet of roles with links, and optionally their full descriptions. For a list of companies to watch, paste their careers-page addresses into Bulk scrape and each is collected in turn. The roles are the data; the people applying for them are not, and the extension keeps it that way.
