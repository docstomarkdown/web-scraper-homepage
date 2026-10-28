---
title: "How To Use a Web Scraper Chrome Extension"
description: "Install a web scraper extension, collect a first table, follow every page of results and save it as Excel, click by click, on a free extension."
status: draft
date: 2026-10-28
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-use-a-web-scraper-chrome-extension
faq:
  - q: "How do I use a web scraper extension for the first time?"
    a: "Install it from the Chrome Web Store, open a page that shows a list, click the extension's icon to open its side panel, pick the list it found, and click Collect. The rows open in a table you can export to Excel. The whole first run takes about two minutes."
  - q: "Do I need to know how to code?"
    a: "No. There are no selectors, scripts or settings to write. You pick a list from the ones the extension found, or click one item on the page, and it names the columns from the page itself."
  - q: "Is a web scraper extension free?"
    a: "Web Scraper Pro is free, with every feature included, no paid plan and no account. Other extensions differ; many collect for free and charge for the download or the cloud. Check what the free tier lets you keep before you start a long run."
  - q: "Does it work on any website?"
    a: "On any page that shows a list: products, listings, search results, directory entries, posts. Popular sites come out with named columns; other sites get columns named from the page's own labels. Pages behind a sign-in work once you've signed in yourself."
  - q: "How do I get every page of results, not only the first?"
    a: "Before you click Collect, choose Collect more pages and confirm how the list continues: a Next page link, a Load more button or scrolling. Set Stop after to the pages you want and keep the tab in front while it runs."
  - q: "Is it safe to install?"
    a: "The extension runs in your own browser and keeps what it collects there until you export it. It never signs in for you or completes a verification. Read the privacy policy and the permissions the store shows before installing any extension, this one included."
  - q: "Will a website block me?"
    a: "Most sites see an ordinary visit from you, at a person's pace. A site that checks visitors may show a verification page; the run pauses, you complete the check in the tab, and it carries on. Keep runs to a few pages at a time on a busy site."
---

<!--
Facts to re-check on a fresh install of 1.3.0 before this leaves draft (2026-10-28): the Chrome Web Store button text and
the pin step in Chrome's toolbar; the side panel's first-open state (Chat tab or List tab first); the List tab labels
("Choose from lists we found", "Collect N items", "Collect more pages", "Next page" / "Load more" / "Auto scroll",
"Stop after" 5 / 10 / 20 / All pages, "Collect from N pages", "Choose an item on the page", "Rescan page"); the results
page labels (pencil to rename, trash to remove, "Columns", "Filter rows", "Export as" with Microsoft Excel, CSV, JSON,
Google Sheets); History. Capture ids are requests for the visuals library. Title targets "how to use web scraper" and
"chrome extension how to use" (youtube-research/AUTOSUGGEST.md, 2026-10-28).
-->

A web scraper Chrome extension turns the page you're looking at into a spreadsheet. Every product, listing or search result becomes a row with its own columns, and the file opens in Excel. This guide walks through a first run with Web Scraper Pro, which is free, from installing it to saving the file: one page first, then every page of the list. You'll finish with a spreadsheet on your computer and know how to do the same on any other site. Tested on version 1.3.0.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome, or another browser built on Chromium such as Microsoft Edge or Brave. Extensions from the Chrome Web Store install in all of them.
- A page that shows a list. A store's category page, a job board search, a directory of businesses or a list of events all work. Pick one you're allowed to collect from; the [plain-words guide to web scraping and the law](/web-scraping-legal) explains the rules, and it isn't legal advice.

## Does the Website Allow Scraping?

Most sites' terms restrict automated collection, and a few check visitors after many fast page loads. An extension reads the page you have open, in your own browser, at a person's pace, which keeps you within what you could do by hand. What you may do with the data afterwards is a separate question, and personal details have rules of their own. Read [Is web scraping legal?](/web-scraping-legal) before a big run. It isn't legal advice.

## Step 1 — Installing the Extension

Open the [Web Scraper Pro listing on the Chrome Web Store](/go/guide/use-a-web-scraper-chrome-extension) and click **Add to Chrome**. Chrome shows the permissions the extension asks for; click **Add extension**. There is no account to create and nothing to pay.

Click the puzzle-piece icon to the right of Chrome's address bar and pin Web Scraper Pro, so its icon stays in the toolbar. That icon opens the extension on any page.

![](visual:ext/panel-chat-empty)

You now have the extension installed and within reach. Next you open a page with a list and let the extension find it.

## Step 2 — Opening a Page and Finding the List

Go to a page that shows a list, such as a store's category page, and click the Web Scraper Pro icon. The side panel opens on the right of the browser, next to the page. Open its **List** tab.

Under **Choose from lists we found**, each list on the page shows as a card with how many items it has on this page, such as **List 1, 24 items**. Hover a card and the list it means is outlined on the page, so you can tell the products from the menu or the sidebar.

![](visual:ext/list-tab-detected)

If the list you want isn't among the cards, click **Choose an item on the page** and click one entry on the page. Every similar entry is picked with it. The list is chosen; the next step collects it.

## Step 3 — Collecting Your First Table

With the list picked, click **Collect N items**, where N is the count on the card. The results page opens in a new tab with one row per item and one column per detail the page shows: name, price, rating, link, and so on. The columns are named from the page's own labels, or from a ready-made setup on popular sites.

![](visual:ext/list-tab-pick-item)

Look at the rows before you go further. A detail the page doesn't show stays empty rather than being guessed. If a column has an odd name, hover its header and click the pencil to rename it; click the trash icon to remove a column you don't need. Mostly empty columns are hidden on their own; click **Columns** to see them.

That's a first table, from one page. The next step collects the whole list.

## Step 4 — Collecting Every Page of Results

Go back to the page and the List tab. This time, under the list you picked, choose **Collect more pages**. The extension works out how the list continues and says so: **Next page**, **Load more** or **Auto scroll**. If it can't tell, it asks you to click the control once.

Set **Stop after** to the number of pages you want: 5, 10, 20 or **All pages**; a scrolling list offers **To end**. Then click **Collect from N pages**.

![](visual:ext/list-tab-more-pages)

The table fills in page by page on the results page. Keep the tab in front while it runs; paging slows down in a background tab. Click **Stop** at any time and keep what has arrived.

![](visual:ext/results-many-pages)

Every page of the list is now in one table. The last step saves it.

## Step 5 — Saving the File

On the results page, click **Export as** and choose **Microsoft Excel**. The file downloads with the columns as you see them, including any renaming, and numbers saved as numbers so the sheet sorts and sums them. **CSV** and **JSON** are there too, and **Google Sheets** sends the table to a new sheet after a Google sign-in.

![](visual:ext/results-export-menu)

The collection also stays in **History**, so you can reopen it, filter it or export it again later without running the page again.

After export the file looks like this. Sample data; the products and prices are made up.

| Product Name | Price | Rating | Review Count | Product URL |
|---|---|---|---|---|
| Trail Runner 2 Shoes | 89.00 | 4.6 | 1,204 | example.com/p/trail-runner-2 |
| Ridge Hiking Boots | 129.00 | 4.8 | 532 | example.com/p/ridge-boots |
| Summit Rain Jacket | 74.50 | 4.3 | 318 | example.com/p/summit-jacket |

## Three Things To Try Next

- **Type instead of clicking.** Open the **Chat** tab and type `Collect every listing on this page`. The extension picks the list, pages through it and shows the same results page. Chat has a daily message limit; the List tab has none.
- **Add emails to a list of businesses.** When the rows have a Website column, click **Add contact details** on the results page, and each business's website is read for its emails, phones and social links. The [emails and contacts page](/email-extractor) explains what comes back.
- **Collect a product's details and reviews.** Open one product and use the **Properties** tab: fifteen named fields, then every review across its pages. The [product details page](/product-scraper) has the fields.

## When It Goes Wrong

**The side panel shows no lists.** The page may still be loading its list; wait a moment and click **Rescan page**. On a page with no repeating items, click **Choose an item on the page** and click one entry.

**Only the first page came back.** Choose **Collect more pages** before you click Collect, and set **Stop after**. In a background tab the run slows down; keep the tab in front.

**The site asked me to verify I'm human.** The run pauses. Complete the check in the tab yourself, click **Rescan page**, and collect again; what was collected is kept. The extension never completes a check for you.

**The columns have strange names.** On a site without a ready-made setup, names come from the page's own labels. Rename them once on the results page; the name is kept for the file.

## Conclusion

You installed a web scraper extension, collected a list from one page, followed it across every page, and saved the table as an Excel file. You wrote no code and set nothing up. The same five steps work on any site with a list. For the next jobs, see How To Scrape Data from Any Website into Excel, No Code for the full set of options on the results page. How To Scrape Every Page of a List, Not Only the First has the paging details. The [lists from any website page](/list-scraper) shows what the extension does on sites with a ready-made setup.
