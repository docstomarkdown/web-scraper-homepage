---
title: "How To Collect Yellow Pages Listings with Web Scraper Pro"
description: "Collect a Yellow Pages search into a spreadsheet with phone, address, rating, years in business and website, across every page."
status: draft
date: 2026-10-20
updated: 2026-10-20
version: "1.3.0"
author: vikram
feature: list-scraper
sites: [yellow-pages]
video: ""
campaign: yt-b3-yellow-pages
faq:
  - q: "Why are some rows marked sponsored?"
    a: "Yellow Pages mixes sponsored listings into the results. They're marked, and Settings → Results can skip them."
---

Collect a Yellow Pages search into a spreadsheet with phone, address, rating, years in business and website, across every page. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).

## Step 1 — Searching Yellow Pages

Search for a category in a city on yellowpages.com and open the side panel's **List** tab. The listings appear under **Choose from lists we found**.

![](visual:ext/list-tab-yellowpages)

## Step 2 — Collecting every page

Choose **Collect more pages**, then **Next page**, and set how many pages under **Stop after**. Click **Collect from 5 pages**. Keep the tab in front while it pages through.

![](visual:ext/list-tab-more-pages)

## Step 3 — Adding contact details

Click the **Bulk scrape** icon at the top of the side panel and choose **Collect contacts**. On the upload step pick **Use saved data** and choose this Yellow Pages collection, so its Website column becomes the list of sites to read. Each business's website is read for emails, phone numbers and social links.

![](visual:ext/bulk-menu)

## Step 4 — Exporting

Click **Export as** and choose Excel.

![](visual:ext/results-export-menu)

## Conclusion

You collected a directory search with every page and its contact details. The same steps work on Justdial and BBB.
