---
title: "Excel Get Data from Web Shows No Table? Do This Instead"
description: "Why Excel's From Web can miss the list on a modern page, three Power Query fixes to try first, and the browser route that exports the page to Excel."
status: draft
date: 2026-10-28
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-excel-get-data-from-web-fails
# Power Query facts from Microsoft Learn, read 2026-11-10:
# From Web in Excel's Data ribbon; Navigator, Web View highlights each detected table; Add table using examples; sign-in types Anonymous, Windows, Basic, Web API, Organizational account: learn.microsoft.com/en-us/power-query/connectors/web/web (updated 2026-10-09)
# Excel generates Web.Page, built on Internet Explorer; Power BI Desktop generates Web.BrowserContents (WebView2); dynamic pages can give sporadic errors; Web.Contents is for JSON and other non-browser content: learn.microsoft.com/en-us/power-query/connectors/web/web-troubleshoot (updated 2026-07-31)
# Web.BrowserContents WaitFor option: learn.microsoft.com/en-us/powerquery-m/web-browsercontents
# Facts checked against chrome-extension-source on 2026-11-10:
# Choose from lists we found, List N with items on this page, Choose an item on the page, Collect more pages, Next page / Load more / Auto scroll, Stop after, Collect N items, Collect from N pages: components/scraper/ListTab.tsx
# Columns named from the page, or by a ready-made setup on supported sites: configs-prod/, configs-prod/site-column-mappings/
# Save prices, ratings and counts as numbers (on by default) writes columns recognised as prices, ratings or review counts as numbers in files: components/scraper/ResultsSettingsCards.tsx, lib/utils/fileNumbers.ts, DECISIONS.md D-033
# Edit column name, Export as Microsoft Excel / CSV / JSON / Google Sheets: entrypoints/dataviewer/main.tsx; History keeps each collection with its date: lib/db/historyService.ts
faq:
  - q: "Why does Excel's Get Data from Web show no tables?"
    a: "The Navigator lists the tables Power Query detects in the page. A list that the page draws as cards rather than as a table, a page that loads its rows after it opens, or a page that needs your sign-in can leave the list you want out of that list of tables."
  - q: "Can I make Power Query see a page that loads its rows with scripts?"
    a: "Sometimes. Microsoft documents a WaitFor option on Web.BrowserContents for pages that load content after they open, and Web.Contents can read a JSON address the page calls. Both take some technical work and can break when the site changes."
  - q: "What about the Add table using examples option?"
    a: "It's at the lower left of the Navigator. You type a few sample values of the data you want, and Power Query tries to find the rest in the page. It helps when the values are in the page but not in a table."
  - q: "Does the extension route refresh like a Power Query query?"
    a: "Not on its own. You collect again when you want fresh rows, and History keeps every collection with its date; scheduled runs are coming soon. Power Query's Refresh is the one thing it does better, on a page where the query works."
  - q: "Can I get the data into Google Sheets instead?"
    a: "Yes. The results page exports to Google Sheets after a one-time Google sign-in, or to CSV, which Sheets imports."
---

You opened **Data** > **From Web** in Excel, pasted a page's address, and the Navigator didn't show the list on your screen, or showed a table that isn't the one you wanted. Excel's From Web reads the page through its own browser engine and lists the tables it detects, and many modern pages draw their lists in ways that engine misses.

This guide explains what Power Query sees, gives three fixes worth trying first, and then shows the route that reads the page as your own browser shows it and exports to Excel. By the end you have the table in Excel either way.

## Prerequisites

- Microsoft Excel with Power Query (Excel 2016 or later, or Excel for Microsoft 365) for the first half.
- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later) for the second.
- The page with the list open in your browser, so you can compare what you see with what Excel found.

## Why Power Query Can't See the Table

When you use **From Web** in Excel, Power Query writes a query with the `Web.Page` function. Microsoft's [Web connector troubleshooting page](https://learn.microsoft.com/en-us/power-query/connectors/web/web-troubleshoot) says Excel generates `Web.Page`, which is built on Internet Explorer, while Power BI Desktop uses the newer `Web.BrowserContents`.

The Navigator then lists the tables it detects in that page. If the data is written as a table, it appears and the query keeps working when you click **Refresh**: a league table, an exchange-rate table, a Wikipedia list. A store category, a directory search or a job board often draws its results as cards instead, so no table holds them.

Two more cases fail. Microsoft notes that pages which load their content dynamically can give inconsistent results, because the content can still be changing when the connector reads it. And Power Query signs in only with the methods it offers, such as **Anonymous**, **Windows**, **Basic** and **Web API**, so it can't use the sign-in you have in Chrome.

## Three Fixes to Try in Power Query

**1. Look at the Web View.** In the Navigator, open the **Web View** tab. Microsoft's [Web connector page](https://learn.microsoft.com/en-us/power-query/connectors/web/web) says it shows the page and highlights each table Power Query detected. If your list is one of them, select it and load it.

**2. Add table using examples.** At the lower left of the Navigator, click **Add table using examples** and type sample values of the data you want, as on the page. Power Query tries to find the rest. It helps when the values are in the page but not in a table.

**3. Use the address the page calls.** In Chrome, press <kbd>F12</kbd>, open the **Network** tab, filter by **Fetch/XHR**, and reload the page. If a request returns the list as JSON without a sign-in, that address can go into **From Web**, which reads JSON with `Web.Contents`. This is the technical route: the address can carry a key or expire, and a site change breaks it.

For a page that loads slowly, Microsoft also documents a `WaitFor` option on [`Web.BrowserContents`](https://learn.microsoft.com/en-us/powerquery-m/web-browsercontents) that waits for the content before reading it. If none of these gets you the rows, the rest of this guide is the browser route.

## Step 1 — Opening the Page and Finding the List in Chrome

Open the page in Chrome, where the list is already drawn, and click the Web Scraper Pro icon to open the side panel. Open its **List** tab. Under **Choose from lists we found**, each list on the page shows as a card such as **List 1**, with the number of items on this page. Hover a card to see which list on the page it means.

![](visual:ext/list-tab-detected)

If no card matches the rows on screen, pick the card whose count is closest, or click **Choose an item on the page** and click one row. The similar rows are picked with it.

## Step 2 — Collecting Every Page

For this page only, leave **This page only** selected and click the **Collect** button with the item count. For the whole list, choose **Collect more pages**, confirm how the list continues (**Next page**, **Load more** or **Auto scroll**), set **Stop after**, and click the collect button. Keep the tab in front while it collects.

![](visual:ext/list-tab-more-pages)

When it finishes, the results open in a new tab with one row per item. The columns are named from the page, or by a ready-made setup on the sites that have one.

## Step 3 — Exporting to Excel

On the results page, hover a header and click **Edit column name** to rename a column, then click **Export as** and choose **Microsoft Excel**. **CSV**, **JSON** and **Google Sheets** are there too.

![](visual:ext/results-export-menu)

With **Save prices, ratings and counts as numbers** on in Settings, which is the default, columns the extension recognises as prices, ratings or review counts reach the file as numbers. Other columns keep the text the page shows.

To refresh, collect again from the same page when you want fresh rows; each collection is saved in **History** with its date. For a weekly comparison, match rows on the link column, as the [Excel clean-up guide](/guides/clean-scraped-data-in-excel) shows.

Here is the shape of a few rows after export. The products, prices and links are made up.

Sample data:

| Product Name | Price | Rating | Review Count | Product URL |
|---|---|---|---|---|
| Sample Trail Shoes | 89.00 | 4.6 | 1204 | `https://shop.example/p/101` |
| Sample Hiking Boots | 129.00 | 4.8 | 532 | `https://shop.example/p/102` |
| Sample Rain Jacket | 74.50 | 4.3 | 318 | `https://shop.example/p/103` |

## Power Query or the Extension: Which for Which Page

| | Excel's From Web | Web Scraper Pro |
|---|---|---|
| A table that is part of a public page | Yes, and it refreshes with one click | Yes |
| A list drawn as cards, not a table | Only if Add table using examples finds it | Yes, when the List tab finds it or you pick one item |
| Every page of results | One query per page, or a function you write | Next page, Load more, Auto scroll |
| A page you're signed in to in Chrome | Only with the sign-in methods Power Query offers | Yes, it reads your own browser |
| Numbers as numbers | After you change the column types | Prices, ratings and review counts, on export |
| Refreshing later | Click Refresh | Collect again; History keeps each collection |

Keep Power Query for the public tables it handles, because its Refresh is a real advantage there. Use the extension for lists that Power Query can't find.

## When It Goes Wrong

**The Navigator shows no table that matches the page.** The list is likely drawn as cards or loaded after the page opens. Try the Web View and Add table using examples, then use the browser route.

**Excel got a table, but with a few rows and no prices.** It read another table on the page. Check the row count against the page; if it's wrong, use the browser route.

**The extension found the list, but only the first page came back.** Choose **Collect more pages** before you click Collect, and keep the tab in front.

**The prices in the exported file are text.** Check that **Save prices, ratings and counts as numbers** is on in Settings, then export again. A price written as a range or with a comma for decimals stays text; convert it with `VALUE` in Excel, as the clean-up guide shows.

## Conclusion

You now know why Excel's From Web can miss the list on a modern page, and the three Power Query fixes worth trying. You also have the browser route, which reads the page as you see it and hands you an Excel file with named columns.

For a table that breaks when pasted, see [How To Copy a Table from a Website into Google Sheets](/guides/copy-a-table-from-a-website). For the full set of options on the results page before export, see [how to get data from a website into Google Sheets or Excel](/export-to-google-sheets).
