---
title: "How To Scrape Data from Any Website into Excel, No Code"
description: "Turn any list on a web page, such as products, listings or search results, into an Excel file by clicking Collect. No code, no selectors, every page of the list."
status: draft
date: 2026-10-20
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: yt-006-scrape-data-from-website-no-code
faq:
  - q: "Does it work on sites I sign in to?"
    a: "Yes, on what you can see once signed in. It doesn't sign in for you."
  - q: "Can I ask instead of clicking?"
    a: "Yes. In the Chat tab, type `Collect the list on this page`; when the list has more pages, chat offers **Collect every page**."
  - q: "Can I send the data to Google Sheets instead of Excel?"
    a: "Yes. On the results page, click Export as and choose Google Sheets; a new sheet opens in a tab. Or in the Chat tab, type \"put this in Google Sheets\"."
  - q: "Can it extract the data automatically, on a schedule?"
    a: "Not yet. Today you run it when you need fresh numbers, and each run saves a new table in History to compare. Scheduled runs are coming with the cloud."
  - q: "Does it work on a website that needs a login?"
    a: "Yes, on what you can see once you're signed in, because it runs in your own browser tab. It doesn't sign in for you."
  - q: "Is this the same as copying a table into Excel?"
    a: "Copying gets you one screen of one page. This follows every page of the list, opens nothing by hand, and names the columns, so the file is ready to sort and filter."
---

Any list on a web page, such as products, listings or search results, becomes an Excel file when you click Collect in Web Scraper Pro. There is no code and nothing to set up, and the run follows every page of the list. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A page with a list: a store category, a directory or a job board.

## Step 1 — Opening the List tab

Go to the page and open the side panel's **List** tab. Under **Choose from lists we found**, each list on the page shows how many items it has.

![](visual:ext/list-tab-detected)

## Step 2 — Picking the right list

If the list you want isn't the first one, pick it from the choices. If none matches, click **Choose an item on the page** and click one item; similar items are picked with it.

![](visual:ext/list-tab-pick-item)

## Step 3 — Collecting every page

Choose **Collect more pages** and the way the page moves on: **Next page**, **Load more** or **Auto scroll**. Set **Stop after** (5 pages by default), then click **Collect from 5 pages**.

![](visual:ext/list-tab-more-pages)

## Step 4 — Cleaning the columns

On the results page, hover a column header to rename it with the pencil or remove it with the trash icon. Mostly empty columns are hidden on their own; click **Columns** to see them and show any you need.

![](visual:ext/results-rename-column)

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**. **CSV**, **JSON** and **Google Sheets** are there too.

![](visual:ext/results-export-menu)

## When it goes wrong

**The List tab found the wrong list.** Pages hold several lists: results, a sidebar, a row of recommendations. Pick the card whose count matches, or click Choose an item on the page and click one entry of the list you want.

**The columns have odd names.** On a site without a ready-made setup, names come from the page's own labels. Hover a header and click the pencil to rename it; the export uses your names.

**Only the first page was collected.** This page only is the default. Choose Collect more pages, confirm Next page, Load more or Auto scroll, and set Stop after.

**The page needs a sign-in.** Sign in as you normally would, then collect; the extension reads what you can see. It never signs in for you.

## Conclusion

You turned a list on a web page into a spreadsheet without writing anything. For many pages at once, see Bulk runs.
