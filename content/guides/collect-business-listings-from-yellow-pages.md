---
title: "How To Scrape Yellow Pages into Excel"
description: "Turn a Yellow Pages search into a spreadsheet with phone, address, rating, years in business and website, across every page of results, then add each business's emails in a second run."
status: draft
date: 2026-10-20
updated: 2026-10-21
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

Search Yellow Pages for a category in a city, and Web Scraper Pro collects every page of results into a spreadsheet: phone, address, rating, years in business and website. A second run adds each business's emails. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Does Yellow Pages Allow Scraping?

Yellow Pages' terms restrict automated collection, and the listings are public business details. This guide reads the results page you have open, in your own browser, at a person's pace, for your own prospecting or research; anti-spam law decides how you may contact the businesses. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).

## Step 1 — Searching Yellow Pages

Search for a category in a city on yellowpages.com and open the side panel's **List** tab. The listings appear under **Choose from lists we found**.

![](visual:ext/list-tab-yellowpages)

## Step 2 — Collecting every page

Choose **Collect more pages**, then **Next page**, and set how many pages under **Stop after**. Click **Collect from 5 pages**. Keep the tab in front while it pages through.

![](visual:ext/list-tab-more-pages)

## Step 3 — Adding contact details

Click the **Bulk scrape** icon at the top of the side panel and choose **Collect contacts**. On the upload step pick **Use saved data** and choose this Yellow Pages collection; its Website column becomes the list of sites to read. Each business's website is read for emails, phone numbers and social links.

![](visual:ext/bulk-menu)

## Step 4 — Exporting

Click **Export as** and choose Excel.

![](visual:ext/results-export-menu)

## When it goes wrong

**The results include ads.** Yellow Pages mixes sponsored listings into results. They're marked Sponsored; filter them out on the results page, or turn on Skip sponsored products in Settings → Results.

**Add contact details is greyed out.** The Yellow Pages table stores the website under a different column key, so the button doesn't see it. Use Bulk scrape → Collect contacts → Use saved data and pick this collection; the emails fill in the same way.

**The run stopped after a few pages.** Yellow Pages asked for a verification, or the tab was in the background. Complete the check, keep the tab in front, click Rescan, and collect again from the page you're on.

## Conclusion

You scraped a directory search with every page and its contact details into Excel. The same steps work on Justdial and BBB.
