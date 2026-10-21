---
title: "How To Get Emails from a List of Websites with Web Scraper Pro"
description: "Turn a list of website addresses into a sheet with each site's emails, phone numbers and social links, in one bulk run."
status: draft
date: 2026-10-20
updated: 2026-10-20
version: "1.3.0"
author: vikram
feature: bulk-scraper
sites: []
video: ""
campaign: yt-b2-05-how-to-get-emails-from-a-list-of-websites-to-excel-no-code
faq:
  - q: "Can I use a list I collected earlier?"
    a: "Yes. Choose **Reuse URLs from a saved table**, pick the collection, then its website column. Or open that table and click **Add contact details** on its results page."
---

Turn a list of website addresses into a sheet with each site's emails, phone numbers and social links, in one bulk run. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A list of website addresses, one per line, in a text or CSV file or ready to paste.

## Step 1 — Opening a bulk contacts run

Click the **Bulk scrape** icon (the layers icon at the top of the side panel) and choose **Collect contacts**.

![](visual:ext/bulk-menu)

## Step 2 — Adding the addresses

Upload the CSV or TXT file, or choose **Paste URLs** and paste the list. Click **Continue →**, check the sites it found, and click **Continue to site configuration →**.

![](visual:ext/bulk-upload)

## Step 3 — Choosing what to collect

**Email addresses**, **Phone numbers** and **Social media links** are on for every site; untick what you don't need, for all sites at once or per site. One linked Contact or About page is always read as well.

![](visual:ext/bulk-contacts-config)

## Step 4 — Running

Click **Start collecting →**. Sites load one after another in the embedded browser while the counters fill in. **Stop** keeps what it has.

![](visual:ext/bulk-run)

## Step 5 — Exporting

When it finishes, the **Collection results** page lists each site. Click **View merged table**, then **Export as** → **Microsoft Excel**.

![](visual:ext/bulk-overview)

## When it goes wrong

**A site shows Waiting for you.** It asked for a verification. Complete it in the embedded browser on the right and the run carries on.

**The run skipped a site.** Its pages timed out or refused to load. Its rows so far are kept; open the site in a normal tab to see what it shows, then add it to a new run.

**The merged table has the same business twice.** Two addresses from the same site were in the list. Remove duplicates keeps one copy per result, but two different pages of one site are two results; dedupe on the Website column in your sheet.

**Nothing happens when I click Start collecting.** Every site needs at least one contact type ticked. The Configure step shows Choose at least one contact type for this site under the card that has none.

## Conclusion

A list of websites became a sheet of contact details, one row per site, without opening any of them yourself.
