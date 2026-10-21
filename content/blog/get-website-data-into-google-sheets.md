---
title: "Four Ways To Get Data from a Website into Google Sheets (and When Each Breaks)"
description: "IMPORTHTML and IMPORTXML, Excel's Power Query, an automation tool like n8n, or a browser extension: what each one can pull from a web page into a sheet, where each stops working, and which fits a list that spans pages or sits behind a sign-in."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Explainers
tags: [google sheets, excel, no code, importxml]
---

For a plain HTML table on one public page, a Google Sheets formula does it in one cell. For a list that spans pages, loads as you scroll, or sits behind a sign-in, a formula can't see it, and you need a tool that reads the page in a browser. Here are the four routes people use, what each one handles, and the point where each one stops.

## Route 1: IMPORTHTML and IMPORTXML in Google Sheets

The quickest route for a simple table or list on a public page, and the first to break.

Google Sheets has formulas that fetch a page and read a table or a list from it:

```
=IMPORTHTML("https://example.com/page", "table", 1)
```

`IMPORTHTML` takes the first table (or list) on the page. `IMPORTXML` takes anything you can name with an XPath, such as every link in a section. The sheet refreshes on its own, which makes this ideal for a public reference table that rarely changes.

Where it breaks:

- **Pages drawn by JavaScript.** Most stores, directories and listing sites build the list after the page loads. The formula fetches the empty shell and returns nothing.
- **More than one page.** One formula, one URL. Thirty pages of results means thirty formulas, each with the next page's address.
- **Sign-ins and blocks.** The fetch comes from Google's servers, not your browser, so member pages are closed, and some sites refuse the request.
- **Changing layouts.** An XPath points at today's structure; a redesign empties the cells.

## Route 2: Power Query in Excel

Stronger than a Sheets formula for tables, with the same blind spot for JavaScript pages.

Excel's **Get Data → From Web** fetches a page and lets you pick a table it found, then shape it in Power Query: rename, filter, split columns, and refresh later with one click. For a public page with a real HTML table, it's a good tool, and the refresh survives small changes.

Where it breaks: the same places. JavaScript-rendered lists come back empty, pagination means building a parameterised query per page, and nothing behind a sign-in is reachable. Power Query also lives in Excel, so the sheet arrives in Google Sheets by export.

## Route 3: An automation tool such as n8n or Make

The route for a scheduled pipeline that ends in a sheet, at the cost of building and maintaining it.

n8n, Make and Zapier can fetch a page with an HTTP step, pull values out with an HTML-extract step, and append rows to Google Sheets, on a schedule. People use n8n for exactly this, which is why "n8n" follows so many scraping searches.

Where it breaks: the fetch is still a plain request, so JavaScript pages need a rendering service added to the flow, each site needs its own extraction rules, and you own the whole pipeline when a site changes. Good when you have a builder and a recurring need; heavy for a one-off list.

## Route 4: A browser extension

The route that reads the page as you see it, including JavaScript lists, every page of results, and pages you're signed in to.

A browser extension collects from the page already open in Chrome, so what you can see, it can read. Web Scraper Pro finds the list on the page and names the columns, follows Next page, Load more and endless scrolling, and exports straight to a Google Sheet:

1. Open the page and the side panel's **List** tab; pick the list it found.
2. Choose **Collect more pages**, set how many, and click **Collect from N pages**.
3. On the results page, click **Export as** → **Google Sheets**. A new sheet opens in a tab.

Or type it: `put this in Google Sheets` in the Chat tab does the same. The [any-website guide](/guides/scrape-data-from-any-website-to-excel) walks through it with screenshots.

Where it breaks: it runs while your browser is open, and each run creates a new sheet rather than updating one on a schedule. Scheduled runs are coming with the cloud; today you rerun it when you want fresh rows, and History keeps every run.

## Side by side

| | Sheets formulas | Power Query | n8n / Make | Browser extension |
|---|---|---|---|---|
| Plain HTML table, one page | Yes | Yes | Yes | Yes |
| JavaScript-drawn list | No | No | With a rendering service | Yes |
| Many pages of results | One formula per page | One query per page | Build a loop | Built in |
| Pages you're signed in to | No | No | No | Yes |
| Refreshes on its own | Yes | On click | On schedule | Rerun it; cloud coming |
| Setup | One formula | A few clicks | A workflow | None |
| Lands in Google Sheets | Directly | By export | Directly | Directly |

## Which to pick

A formula for a public table that refreshes, an extension for everything that looks like a real list, and a pipeline only when the job must run without you.

If the data is a tidy table on a public page and you want it to update itself, start with `IMPORTHTML`. If it's products, listings, businesses or results that run across pages, or anything you had to sign in to see, open the page and collect it with the extension; you'll have the sheet before the formula route finds the first page. If a team needs the same sheet refreshed every morning with nobody watching, that's a pipeline, or the cloud runs on the way.
