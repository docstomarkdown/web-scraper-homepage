---
title: "How To Scrape Phone Numbers from a Website"
description: "Collect every phone number a web page publishes, with faxes in their own column, and export them to Excel. Works on contact pages and directories."
status: draft
date: 2026-10-20
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: email-extractor
sites: []
video: ""
campaign: yt-b2-06-how-to-extract-phone-numbers-from-a-website-to-excel-no-code
# Facts checked against chrome-extension-source on 2026-11-10:
# Collect contacts button on the Properties tab: components/scraper/PropertiesQuickActionButtons.tsx, components/scraper/usePropertiesQuickActions.ts
# Reads the page and one linked contact page; phones from page text and telephone links; faxes kept apart: lib/content/contactExtraction.ts, entrypoints/bulk/ContactOptions.tsx
# One row per website: Website, Email count, Emails, Phone count, Phones, Faxes, Social count, one column per social platform; several values joined with " | "; a kind found nowhere is left out: lib/utils/data-processing.ts (arrangeContactDetailsRows), DECISIONS.md D-021
# Bulk scrape menu > Collect contacts, Phone numbers option: entrypoints/sidepanel/main.tsx, entrypoints/bulk/ContactOptions.tsx
# Export as Microsoft Excel: entrypoints/dataviewer/main.tsx
faq:
  - q: "Can I do this for many pages?"
    a: "Yes. Click the Bulk scrape icon, choose Collect contacts, paste the page addresses, and keep Phone numbers ticked. Each website becomes one row."
  - q: "Does it check that the numbers work?"
    a: "No. It collects the numbers the page publishes, as written. Call or verify them before you rely on them."
---

Open a page that shows phone numbers and click **Collect contacts**. Web Scraper Pro puts the numbers the page publishes into one row for the website, with faxes in their own column, ready for Excel.

## Prerequisites

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).

## Step 1 — Opening the Page

Go to a page that shows phone numbers, such as a business's contact page or a directory listing.

![](visual:ext/site-contact-page)

## Step 2 — Collecting

Open the side panel's **Properties** tab and click **Collect contacts**. The extension reads the page's text and its telephone links, and it also reads one contact page the site links to.

![](visual:ext/properties-collect-contacts)

## Step 3 — Reading the Result

The result is one row for the website, with **Phone count**, **Phones** and **Faxes** columns. Several numbers share one cell, separated by a bar. Any emails and social links found sit in the same row, and a kind of detail the page doesn't publish gets no column.

![](visual:ext/results-contacts-one-site)

Here is the shape of the row. The website and numbers are made up.

Sample data:

| Website | Phone count | Phones | Faxes |
|---|---|---|---|
| `https://sampleplumbing.example` | 2 | (555) 010-2231 \| (555) 010-4410 | (555) 010-9900 |

## Step 4 — Exporting

Click **Export as** and choose **Microsoft Excel**. To split the numbers in one cell into their own columns, see [How To Clean Scraped Data in Excel](/guides/clean-scraped-data-in-excel).

![](visual:ext/results-export-menu)

## When It Goes Wrong

**The number is on the page but not in the row.** The number may be part of an image, which the extension can't read, or it may appear only after you click or scroll. Make the number visible on the page, then collect again.

**A number I expected under Phones is under Faxes.** The extension keeps numbers the page labels as fax in their own column. Check the label on the site.

**I want numbers from many sites.** Click the **Bulk scrape** icon, choose **Collect contacts**, paste the addresses, and keep **Phone numbers** ticked. The [email extractor page](/email-extractor) covers the same run for emails.

## Conclusion

You collected a page's phone numbers into a sheet. The same collection finds emails and social links, so one row covers the ways the page lists to reach the business.
