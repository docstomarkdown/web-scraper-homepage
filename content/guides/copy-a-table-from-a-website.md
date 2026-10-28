---
title: "How To Copy a Table from a Website into Google Sheets"
description: "Copy a table from any web page into Excel or Google Sheets with the columns intact, including tables that break when pasted and tables that span pages."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: export-to-google-sheets
sites: []
video: ""
campaign: guide-copy-a-table-from-a-website
faq:
  - q: "How do I copy a table from a website to Google Sheets?"
    a: "Open the page, open the Web Scraper Pro side panel's List tab, pick the table, click Collect, then Export as → Google Sheets. A new sheet opens with one column per table column."
  - q: "Why does the table break when I paste it?"
    a: "Copying takes the text as the page lays it out, so merged cells, line breaks inside cells and hidden rows land in the wrong places. Collecting reads each cell as a value, so the columns line up."
  - q: "Can Google Sheets import a table from a website on its own?"
    a: "For a plain table on one page, yes, with its import functions. They fail on pages that build the table with JavaScript, on tables that span pages, and on pages you're signed in to. Collecting with the extension handles those."
  - q: "Can I get a table that spans several pages?"
    a: "Yes. Choose Collect more pages, confirm Next page, Load more or Auto scroll, set how many pages, and every page's rows land in one table."
  - q: "Does it keep the numbers as numbers?"
    a: "Yes. Prices, ratings and counts are saved as numbers, so the sheet sorts and sums them without clean-up."
  - q: "Can I export to Excel instead?"
    a: "Yes. Export as offers Microsoft Excel, CSV and JSON next to Google Sheets. Excel, CSV and JSON need no sign-in."
---

<!--
Facts to confirm with a verified run on 1.3.0 before this leaves draft:
- An HTML table is detected by the List tab as a list with one column per table column (list-scraper facts: generic detection, column names from the page's own labels).
- Google Sheets export needs a Google sign-in (drive.file scope); docs/personas.md asks to hold the Sheets claim until the OAuth consent screen is confirmed as published. Verify that status before this guide publishes (owner decision pending, 2026-10-28); the guide says what to do if Google refuses the sign-in.
- Save prices, ratings and counts as numbers: Settings → Results (DECISIONS.md D-033).
- New capture: ext/list-tab-table (the List tab with a page's table detected as a list).
-->

Copying a table from a web page and pasting it into a spreadsheet works until it doesn't: merged cells shift columns, line breaks split rows, and a table built by the page's scripts pastes as a blank. Web Scraper Pro reads the table cell by cell and sends it to Google Sheets or Excel with the columns intact. In this guide you copy a table from a page into a sheet, including a table that continues over several pages.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A page with a table: a league table, a price list, a specification sheet, a list of rates.
- For Google Sheets export, a Google account. Excel, CSV and JSON need no sign-in.

## When Google Sheets' Own Import Works, and When It Doesn't

Google Sheets can import a plain table from a page with its import functions, and for a single, static table that is the quickest route; Excel's Power Query does the same and fails in the same places, as [the Get Data from Web guide](/guides/excel-get-data-from-web-fails) explains. The functions fail in three cases: the table is built by the page's scripts after it loads, the table spans several pages, or the page is one you have to sign in to see. Collecting with the extension reads the page as your browser shows it, so all three work.

## What You Get

One row per table row, one column per table column, named after the table's headers.

| Column | Example |
|---|---|
| Team | Springfield Rovers |
| Played | 12 |
| Won | 8 |
| Points | 26 |

## Step 1 — Opening the List Tab on the Page

Go to the page with the table and open the side panel's **List** tab. Under **Choose from lists we found**, the table shows as a card with how many rows it has, such as **List 1, 20 items**. Hover the card and the table is outlined on the page.

![](visual:ext/list-tab-table)

A page can hold more than one table, plus a menu or a sidebar that looks like a list. Pick the card whose count matches the table you want. If none matches, click **Choose an item on the page** and click one row of the table.

## Step 2 — Collecting the Rows

For a table on one page, leave **This page only** selected and click **Collect**. For a table that continues over pages, choose **Collect more pages**, confirm **Next page**, **Load more** or **Auto scroll**, set **Stop after**, and click **Collect from 5 pages** (or the number you set).

![](visual:ext/list-tab-more-pages)

The results page opens with the rows in a table, with one column per table column.

## Step 3 — Checking the Columns

The column names come from the table's header row. If a header was empty or the page used an icon, hover the column and click the pencil to name it. Numbers are saved as numbers, so a `Points` column sorts as 26, 24, 19 and not as text.

![](visual:ext/results-arranged)

## Step 4 — Exporting to Google Sheets or Excel

Click **Export as** and choose **Google Sheets**. The first time, Google asks you to sign in and allow Web Scraper Pro to create files in your Drive; it can only see the files it creates. A new sheet opens in a tab with the table in it. If Google refuses the sign-in or warns that the app isn't verified, the Sheets export isn't open to your account yet: export to **Microsoft Excel** or **CSV** and open the file in Sheets.

![](visual:ext/results-export-menu)

For a file instead, choose **Microsoft Excel**, **CSV** or **JSON**; none of them needs a sign-in. The collection stays in History, so you can export it again in another format later.

After export, the sheet looks like this. The teams are made up.

| Team | Played | Won | Drawn | Lost | Points |
|---|---|---|---|---|---|
| Springfield Rovers | 12 | 8 | 2 | 2 | 26 |
| Riverside United | 12 | 7 | 3 | 2 | 24 |
| Northside Athletic | 12 | 5 | 4 | 3 | 19 |

## When It Goes Wrong

**The List tab shows the menu, not the table.** Pages hold several lists. Pick the card whose count matches the table's rows, or click **Choose an item on the page** and click one table row.

**Two columns were merged into one.** A table with cells that span columns is read as the page lays it out. Rename the combined column, or split it in the sheet after export.

**The table is blank until I scroll.** The page loads rows as you scroll. Choose **Collect more pages** with **Auto scroll**, and the run scrolls until nothing new loads.

**Google Sheets asked me to sign in.** That's the one-time permission to create files in your Drive. Excel, CSV and JSON exports need no sign-in.

**Google refused the sign-in.** The Sheets export isn't open to your account yet. Export to Excel or CSV and open the file in Sheets; the table is the same.

## Conclusion

You copied a table from a web page into a sheet with its columns intact, and you know when Google Sheets' own import is enough and when it isn't. For a list of cards rather than a table, see How To Scrape Data from Any Website into Excel, No Code. For what you can do with the rows before export, see How to get data from a website into Google Sheets or Excel.
