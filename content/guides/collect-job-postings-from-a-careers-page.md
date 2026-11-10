---
title: "How To Scrape Job Listings from Any Company Career Page"
description: "Turn a company's careers page or a job board search into a spreadsheet of roles, with the details the page lists and a link to each role, across every page."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-collect-job-postings-from-a-careers-page
# Facts checked against chrome-extension-source on 2026-11-10:
# Careers pages have no setup (none in configs-prod/), so columns are described as named from the page and the List tab steps are conditional
# List 1, Choose from lists we found, Choose an item on the page, Collect more pages, Next page / Load more / Auto scroll, Next button ready, Load more button ready, Auto scroll detected, Stop after, Collect from 5 pages, Collect (5 loads), Collect N items: components/scraper/ListTab.tsx
# Hide mostly empty columns on by default, Columns panel on the results page, Edit column name: lib/preferences/resultPreferences.ts, entrypoints/dataviewer/main.tsx
# Bulk scrape > Collect page text, Paste URLs, Use saved data, Continue, Start collecting, View merged table, Word count: entrypoints/sidepanel/main.tsx, entrypoints/bulk/main.tsx, lib/content/pageTextExtraction.ts
# Properties tab Collect page text for one page: components/scraper/PropertiesQuickActionButtons.tsx
# History keeps each collection with its date: lib/db/historyService.ts
# Scheduled runs are coming soon, not available: thinksolv-writing-system/products/web-scraper-pro.md (cloudLaunched: false)
faq:
  - q: "Does it work on any company's careers page?"
    a: "It works on careers pages that show the roles as a list in the page, and it reads what you can see in your own browser. The List tab looks for the list; if it picks the wrong one or finds none, click Choose an item on the page and click one role."
  - q: "Can it collect from Indeed?"
    a: "Indeed's results are a list like any other, so the List tab can collect what the page shows. It has no ready-made setup, so check the columns on the first page; see the Indeed guide for the steps."
  - q: "Can I get the full job description for each role?"
    a: "The list gives what the page lists for each role and its link. Open a posting and click Collect page text in the Properties tab for one description, or use Bulk scrape > Collect page text on the links for all of them at once."
  - q: "Can I track new postings every week?"
    a: "Collect the same page again; each collection is saved in History with its date, and the posting link matches rows across collections. Scheduled runs are coming soon."
  - q: "Does it collect candidates or recruiters?"
    a: "No. This guide collects the roles a page lists. Job postings are about jobs, not people, and the extension isn't built to collect profiles."
---

Open the careers page, pick the list of roles in the side panel, and click Collect. Web Scraper Pro looks for the list on the page itself, so the same steps apply to a hosted job board and a company's own site. Each role arrives as a row with the details the page lists and the link to the posting.

## Prerequisites

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A careers page or a job board search with the filters you want set: location, department, keyword.

## Step 1 — Opening the Careers Page

Go to the page that lists the roles. On a company site it's often under Careers or Jobs; on a hosted board it's the company's page on that board. Apply the filters first, because the extension collects what the page shows.

## Step 2 — Picking the List

Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, each list shows as a card such as **List 1**, with the number of items on this page. Hover a card and its items are outlined on the page.

![](visual:ext/list-tab-careers)

A careers page can hold other lists too, such as departments or office locations. Pick the card whose count matches the number of roles you see.

If no card outlines the roles, click **Choose an item on the page** and click one posting; the similar postings are picked with it.

## Step 3 — Collecting Every Page

If the roles continue on more pages, or behind a **Load more** button, choose **Collect more pages**. When the extension finds the way on, it shows **Next button ready**, **Load more button ready** or **Auto scroll detected**.

If it shows none of these, choose **Next page**, **Load more** or **Auto scroll** to match the page, and click the page's own button when the panel asks. Set **Stop after** and click the collect button, such as **Collect from 5 pages** or **Collect (5 loads)**.

![](visual:ext/list-tab-more-pages)

For a single page, leave **This page only** selected and click the **Collect** button with the item count.

## Step 4 — Reading the Results

The results open in a new tab, with one row per role. Careers pages have no ready-made setup, so the columns are named from the page. They hold whatever each role shows, such as a title, location, team, job type, posting date and the link.

A detail the page doesn't show doesn't appear. Hover a header and click **Edit column name** to rename it, for example to Role. Columns filled for fewer than a third of the rows are hidden to start with; click **Columns** to show them.

## Step 5 — Adding the Job Descriptions

For the full text of each posting, use **Bulk scrape** > **Collect page text** in the side panel. Choose **Use saved data** and pick this collection's link column, or choose **Paste URLs** and paste the links. Click **Continue**, then **Start collecting**.

Each posting becomes a row with its text and a word count, and **View merged table** puts them together. For one posting, open it and click **Collect page text** in the **Properties** tab.

## Step 6 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Collect the same page next week and compare on the posting link to see what's new.

![](visual:ext/results-export-menu)

Here is the shape of a few rows after renaming. The column names are ones you choose, and the roles and links are made up.

Sample data:

| Role | Location | Team | Link |
|---|---|---|---|
| Sample Support Engineer | Example City | Support | `https://careers.example/jobs/101` |
| Sample Product Designer | Remote | Design | `https://careers.example/jobs/102` |
| Sample Sales Associate | Example Town | Sales | `https://careers.example/jobs/103` |

## When It Goes Wrong

**The List tab found the departments list, not the roles.** Pick the card whose count matches the number of postings, or click **Choose an item on the page** and click one role.

**The roles load as I scroll, with no Next button.** Choose **Collect more pages** and then **Auto scroll**; the extension scrolls and collects as new roles load.

**The board needs a sign-in.** Sign in as you normally would, then collect; the extension reads what you can see in your own browser. Check the board's terms before you collect.

## Conclusion

You collected a careers page into a spreadsheet of roles with links, and optionally their full descriptions. For a job board search, see [How To Scrape Indeed Job Postings into a Spreadsheet](/guides/scrape-indeed-job-postings). The roles are the data; the people applying for them are not.
