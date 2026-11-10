---
title: "How To Copy a Table from a Website into Google Sheets"
description: "Copy a table from any web page into Excel or Google Sheets with the columns intact, including tables that break when pasted and tables that span pages."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: export-to-google-sheets
sites: []
video: ""
campaign: guide-copy-a-table-from-a-website
# Facts checked against chrome-extension-source on 2026-11-10:
# A table body's rows are one of the list shapes the List tab looks for (tbody > tr): lib/content/scanForListsCore.ts (Strategy 2), DECISIONS.md D-048
# Choose from lists we found, List N with items on this page, Choose an item on the page, This page only, Collect more pages, Next page / Load more / Auto scroll, Stop after, Collect from 5 pages: components/scraper/ListTab.tsx
# The results page sorts a column as numbers when its cells read as numbers: lib/utils/sortValues.ts
# Files write columns recognised as prices, ratings or review counts as numbers (Settings > Save prices, ratings and counts as numbers, on by default): DECISIONS.md D-033, lib/utils/fileNumbers.ts, components/scraper/ResultsSettingsCards.tsx
# Edit column name on header hover: entrypoints/dataviewer/main.tsx
# Export as Google Sheets: new sheet in the signed-in Chrome account after a one-time Google sign-in, sees only files it created (drive.file); consent screen in production: thinksolv-writing-system/products/web-scraper-pro.md
# IMPORTHTML imports a table or list from a page's address: Google Docs Editors Help, support.google.com/docs/answer/3093339 (read 2026-11-10)
faq:
  - q: "How do I copy a table from a website to Google Sheets?"
    a: "Open the page, open the Web Scraper Pro side panel's List tab, pick the table, click Collect, then Export as > Google Sheets. A new sheet opens with one column for each column the extension read."
  - q: "Why does the table break when I paste it?"
    a: "Copying takes the text as the page lays it out, so merged cells, line breaks inside cells and hidden rows can land in the wrong places. Collecting reads each row of the table as one row of data."
  - q: "Can Google Sheets import a table from a website on its own?"
    a: "Google Sheets has an IMPORTHTML function that imports a table or list from a page's address. If it returns nothing or the wrong rows, the table may be built by the page's scripts, split over pages, or behind a sign-in; the extension reads the page as your browser shows it."
  - q: "Can I get a table that spans several pages?"
    a: "Yes. Choose Collect more pages, confirm Next page, Load more or Auto scroll, set how many pages, and every page's rows land in one table."
  - q: "Does it keep the numbers as numbers?"
    a: "The results page sorts a column as numbers when its cells read as numbers. In exported files, columns the extension recognises as prices, ratings or review counts are written as numbers; other columns keep the text the page shows."
  - q: "Can I export to Excel instead?"
    a: "Yes. Export as offers Microsoft Excel, CSV and JSON next to Google Sheets. Excel, CSV and JSON need no sign-in."
---

Copying a table from a web page and pasting it into a spreadsheet works until it doesn't: merged cells shift columns, line breaks split rows, and a table built by the page's scripts can paste as a blank. Web Scraper Pro reads the table in your browser row by row and sends it to Google Sheets or Excel. In this guide you copy a table from a page into a sheet, including a table that continues over several pages.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A page with a table: a league table, a price list, a specification sheet, a list of rates.
- For Google Sheets export, a Google account. Excel, CSV and JSON need no sign-in.

## When Google Sheets' Own Import Works, and When It Doesn't

Google Sheets has an [IMPORTHTML function](https://support.google.com/docs/answer/3093339) that imports a table or list from a page's address. For a single table that is part of the page, it can be the quickest route. Excel's Power Query does a similar job, as [the Get Data from Web guide](/guides/excel-get-data-from-web-fails) explains.

If the function returns nothing or the wrong rows, the table may be built by the page's scripts after it loads, split over several pages, or on a page you have to sign in to see. The extension reads the page as your browser shows it, so it can collect in those cases too.

## What You Get

You get one row for each row of the table. The columns are named from the page, and you can rename any of them before you export.

## Step 1 — Opening the List Tab on the Page

Go to the page with the table and open the side panel's **List** tab. Under **Choose from lists we found**, each list shows as a card such as **List 1**, with the number of items on this page. Hover a card and its items are outlined on the page.

![](visual:ext/list-tab-table)

A page can hold more than one table, plus a menu or a sidebar that looks like a list. Pick the card whose count matches the rows of the table you want. If none matches, click **Choose an item on the page** and click one row of the table.

## Step 2 — Collecting the Rows

For a table on one page, leave **This page only** selected and click the **Collect** button with the item count. For a table that continues over pages, choose **Collect more pages**, confirm **Next page**, **Load more** or **Auto scroll**, set **Stop after**, and click **Collect from 5 pages** (or the number you set).

![](visual:ext/list-tab-more-pages)

When collection finishes, the results open in a new tab with one row for each table row.

## Step 3 — Checking the Columns

Check that each column holds what you expect before you export. If a column has an unclear name, hover its header and click **Edit column name**. A column whose cells read as numbers sorts as numbers on the results page, so a `Points` column sorts as 26, 24, 19 and not as text.

![](visual:ext/results-arranged)

## Step 4 — Exporting to Google Sheets or Excel

Click **Export as** and choose **Google Sheets**. The first time, Google asks you to sign in and allow Web Scraper Pro to create files in your Drive; it can see only the sheets it creates. A new sheet is made in the Google account Chrome is signed in with.

![](visual:ext/results-export-menu)

For a file instead, choose **Microsoft Excel**, **CSV** or **JSON**; none of them needs a sign-in. The collection stays in History, so you can export it again in another format later.

Here is the shape of a few rows after export, with the columns renamed. The teams are made up.

Sample data:

| Team | Played | Won | Drawn | Lost | Points |
|---|---|---|---|---|---|
| Sample Rovers | 12 | 8 | 2 | 2 | 26 |
| Sample United | 12 | 7 | 3 | 2 | 24 |
| Sample Athletic | 12 | 5 | 4 | 3 | 19 |

## When It Goes Wrong

**The List tab shows the menu, not the table.** Pages hold several lists. Pick the card whose count matches the table's rows, or click **Choose an item on the page** and click one table row.

**Two columns were merged into one.** A table with cells that span columns is read as the page lays it out. Rename the combined column, or split it in the sheet after export.

**The table is blank until I scroll.** The page loads rows as you scroll. Choose **Collect more pages** with **Auto scroll**, and the extension scrolls and collects as new rows load.

**Google Sheets asked me to sign in.** That's the one-time permission to create sheets in your Drive. Excel, CSV and JSON exports need no sign-in.

**The numbers are text in my file.** Files write columns the extension recognises as prices, ratings or review counts as numbers, while **Save prices, ratings and counts as numbers** is on in Settings. For other columns, convert them in the sheet with the `VALUE()` function.

## Conclusion

You copied a table from a web page into a sheet with its columns intact, and you know when Google Sheets' own import is enough and when it isn't. For a list of cards rather than a table, see How To Scrape Data from Any Website into Excel, No Code. For what you can do with the rows before export, see How to get data from a website into Google Sheets or Excel.
