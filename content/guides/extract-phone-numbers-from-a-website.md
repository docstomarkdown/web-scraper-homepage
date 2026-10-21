---
title: "How To Scrape Phone Numbers from a Website"
description: "Collect every phone number a web page publishes, with faxes in their own column, and export them to Excel in one click. Works on contact pages and directory listings."
status: draft
date: 2026-10-20
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: email-extractor
sites: []
video: ""
campaign: yt-b2-06-how-to-extract-phone-numbers-from-a-website-to-excel-no-code
faq:
  - q: "Can I do this for many pages?"
    a: "Yes. Click the **Bulk scrape** icon, choose **Collect contacts**, and paste the page addresses. See How To Extract Emails from a List of Websites in Bulk."
---

Open a page that shows phone numbers and click **Collect contacts**. Web Scraper Pro puts every number the page publishes into a row, with faxes in their own column, ready for Excel. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).

## Step 1 — Opening the page

Go to a page that shows phone numbers: a business's contact page or a directory listing.

![](visual:ext/site-contact-page)

## Step 2 — Collecting

In the **Chat** tab, type `Find the phone numbers on this page`. Or click **Collect contacts** on the **Properties** tab.

![](visual:ext/properties-collect-contacts)

## Step 3 — Reading the result

One row for the site, with Phone count, Phones and Faxes. Any emails and social links found sit in the same row.

![](visual:ext/results-contacts-one-site)

## Step 4 — Exporting

Click **Export as** and choose Excel.

![](visual:ext/results-export-menu)

## When it goes wrong

**The number is shown on the page but not in the row.** It's an image, or drawn by a script after the page loads. Scroll to it so it's on the page, then collect again. Images can't be read.

**The row shows a fax under Phones.** Fax numbers go to their own Faxes column. A number in Phones is one the site labelled as a phone; check the site's own label.

**I want numbers from many sites.** Paste the addresses into Bulk scrape → Collect contacts with Phone numbers ticked. The steps are the same as in How To Extract Emails from a List of Websites in Bulk.

## Conclusion

You pulled a page's phone numbers into a sheet. The same run finds emails and social links, so one collection covers every way to reach the business.
