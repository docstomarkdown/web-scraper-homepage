---
title: "How To Get Website Data into Google Sheets: Four Ways"
description: "A Sheets formula for a plain table, Power Query, an automation tool or a free extension: a one-line test to tell which your page needs, and where each stops."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Explainers
tags: [google sheets, excel, no code, importxml]
---

For a plain table on one public page, a Google Sheets formula does it in one cell. For a list that spans pages, loads as you scroll, or sits behind a sign-in, a formula can't see it, and you need a tool that reads the page in a browser. Here are the four routes people use, a one-line test to tell which one your page needs, and the point where each route stops.

## The one-line test

If the list has a Next button, a Load more button, or keeps adding items as you scroll, or you had to sign in to see it, skip to [Route 4](#route-4-a-browser-extension). A formula will never see that list.

If the page is a plain table that's all there when the page opens, such as a table of exchange rates or a league standings table, Route 1 will probably work. When in doubt, try Route 1 once; if the cell says `#N/A` or stays empty, it's Route 4.

## Route 1: IMPORTHTML and IMPORTXML in Google Sheets

The quickest route for a plain table or list on a public page, and the first to break.

Google Sheets has two formulas that fetch a page and read from it. `IMPORTHTML` takes a whole table or list from a page; `IMPORTXML` takes any piece you can name. Type this into a cell:

```
=IMPORTHTML("https://example.com/page", "table", 1)
```

That means: fetch this page, take the first table on it, and put it here. The sheet refreshes on its own, which makes this ideal for a public reference table that rarely changes. `IMPORTXML` works the same way but takes an XPath, a text address for a part of a page such as "every link inside the main column"; writing one takes some learning.

Where it breaks:

- **Pages drawn by JavaScript.** Most stores, directories and listing sites build the list after the page loads. The formula fetches the empty shell and returns nothing.
- **More than one page.** One formula, one web address. Thirty pages of results means thirty formulas, each with the next page's address.
- **Sign-ins and blocks.** The fetch comes from Google's servers, not your browser, so member pages are closed, and some sites refuse the request.
- **Changing layouts.** An XPath points at today's structure; a redesign empties the cells.

## Route 2: Power Query in Excel

Stronger than a Sheets formula for tables, with the same blind spot for JavaScript pages.

Power Query is the data tool built into Excel. **Get Data → From Web** fetches a page and lets you pick a table it found, then shape it: rename, filter, split columns, and refresh later with one click. For a public page with a real table, it's a good tool, and the refresh survives small changes.

Where it breaks: the same places. Lists drawn by JavaScript come back empty, every extra page of results means another query, and nothing behind a sign-in is reachable. Power Query also lives in Excel, so the data reaches Google Sheets by saving and importing a file.

## Route 3: an automation tool such as n8n or Make

The route for a scheduled pipeline that ends in a sheet, at the cost of building and maintaining it.

n8n, Make and Zapier are tools for wiring steps together: fetch a page, pull values out of it, append rows to a Google Sheet, every morning at six. People use n8n for exactly this, which is why "n8n" follows so many scraping searches.

Where it breaks: the fetch is still a plain request, so JavaScript pages need a rendering service added to the flow, each site needs its own extraction rules, and you own the whole pipeline when a site changes. Good when you have someone to build it and a need that repeats; heavy for a one-off list.

## Route 4: a browser extension

The route that reads the page as you see it, including JavaScript lists, every page of results, and pages you're signed in to.

A browser extension collects from the page already open in Chrome, so what you can see, it can read. Web Scraper Pro, which is free with no paid plan, finds the list on the page and names the columns, follows Next page, Load more and endless scrolling, and exports straight to a Google Sheet:

1. Open the page and click the Web Scraper Pro icon. The side panel opens on the right; open its **List** tab and pick the list it found.
2. Choose **Collect more pages**, set **Stop after** (5, 10, 20 or All pages), and click **Collect from N pages**.
3. The results page opens in a new tab. Click **Export as** and choose **Google Sheets**. A new sheet opens in your Google Drive. If Google refuses the sign-in or warns that the app isn't verified, the Sheets export isn't open to your account yet; choose **Microsoft Excel** or **CSV** and open the file in Sheets.

Or type it: `put this in Google Sheets` in the **Chat** tab does the same. The [any-website guide](/guides/scrape-data-from-any-website-to-excel) walks through it with screenshots, and the [table guide](/guides/copy-a-table-from-a-website) covers the plain-table case.

Where it breaks: it runs while your browser is open, and each run creates a new sheet rather than updating one on a schedule. Scheduled runs are coming with the cloud; today you rerun it when you want fresh rows, and History keeps every run.

## A worked example: one store category, four ways

The job: 5 pages of a store category, 24 products a page, into a sheet with Product Name, Price, Rating and Product URL. Times are for a first attempt by someone who knows each tool.

| Route | What you do | Rows you get | Time |
|---|---|---|---|
| Sheets formula | `=IMPORTHTML(…)` on the category address | 0; the store draws its list with JavaScript | 2 minutes to find out |
| Power Query | Get Data → From Web, pick a table | 0, same reason | 5 minutes |
| n8n | HTTP step, rendering service, extract step, Sheets step, loop over 5 pages | 120, after the flow is built | An hour the first time, then on schedule |
| Extension | List tab, Collect from 5 pages, Export as → Google Sheets | 120 | About 3 minutes |

The names and numbers are made up; the behaviour is what each tool does on a JavaScript-drawn store page.

## Side by side

| | Sheets formulas | Power Query | n8n / Make | Browser extension |
|---|---|---|---|---|
| Plain table, one page | Yes | Yes | Yes | Yes |
| List drawn by JavaScript | No | No | With a rendering service | Yes |
| Many pages of results | One formula per page | One query per page | Build a loop | Built in |
| Pages you're signed in to | No | No | No | Yes |
| Refreshes on its own | Yes | On click | On schedule | Rerun it; cloud coming |
| Setup | One formula | A few clicks | A workflow | None |
| Lands in Google Sheets | Directly | By export | Directly | Directly |
| Price | Free with Sheets | Part of Excel | Free tier, then monthly | Free, no paid plan |

## Which to pick

A formula for a public table that refreshes itself, an extension for everything that looks like a real list, and a pipeline only when the job must run without you.

If the data is a tidy table on a public page and you want it to update itself, start with `IMPORTHTML`. If it's products, listings, businesses or results that run across pages, or anything you had to sign in to see, open the page and collect it with the extension; you'll have the sheet before the formula route finds the first page. If a team needs the same sheet refreshed every morning with nobody watching, that's a pipeline today, or the cloud runs on the way.

## Keeping a sheet up to date without a pipeline

Rerun the collection and paste the new rows under the old ones; the link column tells you what changed.

1. Run the same collection again next week. It lands in History as a new table and, if you choose, a new Google Sheet.
2. Copy the new rows into your working sheet under the old ones, with the date in a column.
3. Sort by Product URL and the date. Two rows with the same URL and a different price are your price changes; a URL that appears once this week is new or gone.

Ten minutes a week covers most "I need this refreshed" jobs until the cloud runs arrive with a schedule.

## When a formula returns nothing

Three messages, three causes.

- **`#N/A` with "Imported content is empty".** The page draws its list with JavaScript after loading, or the table index is wrong. Try index 2 or 3; if still empty, it's Route 4.
- **`#N/A` with "Could not fetch URL".** The site refused Google's request or needs a sign-in. A formula can't get past either; Route 4 reads what your browser can see.
- **Rows, but the wrong ones.** The page has more than one table and you took the first. Count the tables on the page and change the index.

## Questions people ask

**Can Google Sheets pull data from a website on its own?** Yes, from a plain public table, with `IMPORTHTML`. Not from a list that loads as you scroll, has a Next button, or needs a sign-in.

**Is there a free way to get website data into Google Sheets?** Every route here has a free form: the formulas are part of Sheets, Power Query is part of Excel, n8n has a free tier, and the extension is free with no paid plan.

**Does the extension overwrite my sheet?** No. Each export creates a new sheet in your Google Drive. Copy rows into your working sheet when you want them there.

**What permission does the Google Sheets export need?** To create files in your Google Drive. It can see only the sheets it creates, not your other files; the [privacy policy](/privacy-policy) says so. If Google refuses the sign-in for your account, export to Excel or CSV and open the file in Sheets.

**Can I schedule it?** Not yet with the extension; rerun it when you want fresh rows. Scheduled runs are coming with the cloud. A formula refreshes itself; a pipeline runs on a timer you set up.

## What this means for you

- Run the one-line test first. A Next button, endless scrolling or a sign-in means the formula routes will return nothing, however well you write them.
- For a one-off list, the extension is the shortest path to a sheet, and it's free. Keep a formula for the rare table that should refresh on its own.
- Every route reads a public page the same way a visitor does. The site's terms and the rules on personal data still apply; the [legal guide](/web-scraping-legal) covers them.
