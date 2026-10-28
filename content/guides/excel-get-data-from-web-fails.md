---
title: "Excel Get Data from Web Shows No Table? Do This Instead"
description: "Why Power Query's From Web finds no table on a scripted page, three fixes that sometimes work, and the browser route that exports the page to Excel."
status: draft
date: 2026-10-28
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-excel-get-data-from-web-fails
faq:
  - q: "Why does Excel's Get Data from Web show no tables?"
    a: "Power Query fetches the page's raw HTML without running its scripts. On most stores, directories and listing sites the list is drawn by JavaScript after the page loads, so the fetched HTML holds an empty shell and the Navigator shows only Document, or tables that aren't the list."
  - q: "Can I make Power Query see a JavaScript page?"
    a: "Sometimes, if the page loads its data from an address you can find in the browser's developer tools and that address returns JSON or HTML without a sign-in. That takes some technical work and breaks when the site changes. For most people the browser route is quicker."
  - q: "What about the Add table using examples option?"
    a: "It helps when the data is in the HTML but not in a table tag: you type a couple of example values and Power Query infers the rest. It can't help when the values aren't in the HTML at all, which is the JavaScript case."
  - q: "Does the extension route refresh like a Power Query query?"
    a: "Not on its own. You run the collection again when you want fresh rows, and History keeps every run with its date; scheduled runs are coming with the cloud. Power Query's Refresh is the one thing it does better, when it works at all on the page."
  - q: "Can I get the data into Google Sheets instead?"
    a: "Yes. The results page exports to Google Sheets after a Google sign-in, or to CSV, which Sheets imports. Sheets' own IMPORTHTML has the same blind spot as Power Query on JavaScript pages."
---

<!--
Written 2026-10-28. The Power Query facts (Data → Get Data → From Other Sources → From Web; the Navigator; Document
versus table entries; Add table using examples; Web.Page versus Web.Contents; Refresh) are from Excel 365 as of writing;
re-check the menu paths on the version used for the screenshots. The extension facts are the list-scraper page's:
detection, Collect more pages, Save prices as numbers, Export as Microsoft Excel. Capture ids are requests for the visuals
library. Title targets "excel get data from web not working" and the Power Query searches in youtube-research (B72).
-->

You opened **Data → Get Data → From Web** in Excel, pasted a page's address, and the Navigator showed **Document** and nothing else, or a table that isn't the one on your screen. It's the most common dead end in Power Query, and it isn't your fault. Power Query fetches the page's raw HTML without running the page's scripts, and most stores, directories and listing sites draw their lists with scripts after the page loads. This guide explains what Power Query sees, gives the three fixes that sometimes work, and then shows the route that reads the page as your browser shows it and exports to Excel. By the end you have the table in Excel either way. Tested on version 1.3.0 of the extension.

## Prerequisites

- Microsoft Excel with Power Query (Excel 2016 or later, or Excel 365) for the first half.
- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later) for the second. The [extension beginner guide](/guides/use-a-web-scraper-chrome-extension) covers the install.
- The page with the list open in your browser, so you can compare what you see with what Excel found.

## Why Power Query Can't See the Table

**From Web** asks for the page the way a program does: it downloads the HTML once and reads it. If the table is written into that HTML, the Navigator lists it and the query works, and keeps working when you click Refresh. That's the case for a league table, an exchange-rate table, a Wikipedia page.

A store category, a directory search, a job board or a listings page is different. The HTML Excel downloads is a shell; the page's scripts then fetch the products or listings and draw them in your browser. Excel never runs those scripts, so the Navigator shows **Document**, perhaps a menu or a footer read as a table, and none of the rows you can see. A page behind a sign-in fails the same way, because Excel has none of your cookies, and a page that checks visitors may send Excel an error page.

That's the whole diagnosis. If your page is one of those, no setting in the dialog will change what Excel downloads.

## Three Fixes That Sometimes Work in Power Query

**1. Look again in the Navigator.** Tick **Select multiple items** and look through every entry; a site sometimes writes the list as a table with an unhelpful name. If one entry has the right number of rows, you're done.

**2. Add table using examples.** At the bottom of the Navigator, click **Add table using examples** and type the first two values of the column you want from the page. Power Query tries to infer the rest from the HTML. It works when the values are in the HTML but not in a table tag, and not at all when they aren't there.

**3. Find the address the page itself calls.** In Chrome, press `F12`, open the **Network** tab, filter by **Fetch/XHR**, and reload the page. If a request returns the list as JSON or HTML without a sign-in, that address can go into **From Web** and Power Query can parse it. This is the technical route: the address often carries a key or expires, pages past the first need their own address, and a site change breaks it. Worth it for a page you'll refresh every week; not for a list you need today.

If none of the three gets you the rows, the page needs a browser, and the rest of this guide is the browser route.

## Step 1 — Opening the Page and Finding the List in Chrome

Open the page in Chrome, where the list is already drawn, and click the Web Scraper Pro icon. The side panel opens on the right. Open its **List** tab; under **Choose from lists we found**, each list on the page shows as a card with how many items it has, such as **List 1, 24 items**. Hover a card to see which list on the page it means.

![](visual:ext/list-tab-detected)

Because it reads the page as your browser shows it, the list Excel couldn't see is there. If the first card is the menu, pick the card whose count matches the rows on screen, or click **Choose an item on the page** and click one row.

## Step 2 — Collecting Every Page

For this page only, click **Collect N items**. For the whole list, choose **Collect more pages**; the extension finds how the list continues (**Next page**, **Load more** or **Auto scroll**), you set **Stop after**, and you click **Collect from N pages**. Keep the tab in front while it runs.

![](visual:ext/list-tab-more-pages)

The results page opens with one row per item and columns named from the page, or from a ready-made setup on popular sites. Prices, ratings and counts are saved as numbers, which is the other thing Power Query users spend time fixing.

## Step 3 — Exporting to Excel

On the results page, hover a header to rename a column with the pencil or remove it with the trash icon, then click **Export as** and choose **Microsoft Excel**. The `.xlsx` file downloads with your column names and numbers as numbers, ready to open, pivot and chart. **CSV**, **JSON** and **Google Sheets** are there too.

![](visual:ext/results-export-menu)

To refresh, run the collection again from the same page when you want fresh rows; each run is saved in **History** with its date. For a weekly comparison, keep a Collected-on column and match rows on the link column, as the [Excel clean-up guide](/guides/clean-scraped-data-in-excel) shows.

After export the sheet looks like this. Sample data; the products and prices are made up.

| Product Name | Price | Rating | Review Count | Product URL |
|---|---|---|---|---|
| Trail Runner 2 Shoes | 89.00 | 4.6 | 1,204 | example.com/p/trail-runner-2 |
| Ridge Hiking Boots | 129.00 | 4.8 | 532 | example.com/p/ridge-boots |
| Summit Rain Jacket | 74.50 | 4.3 | 318 | example.com/p/summit-jacket |

## Power Query or the Extension: Which for Which Page

| | Power Query, From Web | Web Scraper Pro |
|---|---|---|
| A plain HTML table on a public page | Yes, and it refreshes with one click | Yes |
| A list drawn by JavaScript | No; the Navigator shows Document | Yes, it's your browser |
| Every page of results | One query per page, or a function you write | Built in: Next page, Load more, Auto scroll |
| A page you're signed in to | No | Yes, once you've signed in |
| Numbers as numbers | After you change the column types | On export |
| Refreshing later | Click Refresh | Run it again; History keeps each run |
| Price | Part of Excel | Free, no paid plan |

Keep Power Query for the public tables it handles, because its Refresh is a real advantage there. Use the extension for everything that looks like a real list on a modern site.

## When It Goes Wrong

**Excel says "We couldn't find any data" or shows only Document.** The list is drawn by scripts. Use the browser route; nothing in the dialog changes what Excel downloads.

**Excel got a table, but with a few rows and no prices.** It read a sidebar, a footer or a "related items" strip as the table. Check the row count against the page; if it's wrong, use the browser route.

**The extension found the list, but only the first page came back.** Choose **Collect more pages** before you click Collect, and keep the tab in front.

**The prices in the exported file are text.** The collection was saved with **Save prices, ratings and counts as numbers** off in Settings → Results. Turn it on and collect again, or use `VALUE` in Excel as the clean-up guide shows.

## Conclusion

You now know why Excel's Get Data from Web shows no table on a scripted page, and the three Power Query fixes worth trying. You also have the browser route, which reads the page as you see it and hands you an Excel file with named columns and numeric prices. For a plain table that does work in Power Query but breaks when pasted, see How To Copy a Table from a Website into Google Sheets. For the full set of options on the results page before export, see [how to get data from a website into Google Sheets or Excel](/export-to-google-sheets).
