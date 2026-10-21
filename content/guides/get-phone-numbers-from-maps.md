---
title: "How To Scrape Phone Numbers from Google Maps to Excel"
description: "Collect the businesses in a Google Maps search, keep only their names and phone numbers, and export a clean call list to Excel. One sentence in the chat does the filtering."
status: draft
date: 2026-10-20
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: maps-leads
sites: [maps]
video: ""
campaign: yt-b2-03-how-to-get-phone-numbers-from-google-maps-to-excel-1-click
faq:
  - q: "Where does the Website phones column come from?"
    a: "From each business's own website, read during the run when contact details are on. The Phone column is the number Google Maps lists."
---

Search Google Maps for a type of business in a city and Web Scraper Pro collects every result with its phone number. One sentence in the chat keeps only the names and numbers, ready to export to Excel. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).

## Step 1 — Searching

In the **Chat** tab, type `Find HVAC contractors in Houston`. Choose **50** on the card and click **Start**. Contact details stay on by default, so a Website phones column adds the numbers from each business's own site.

The screenshots show dentists in Austin; use your own trade and city.

![](visual:ext/chat-maps-count-card)

## Step 2 — Opening the results

Click **View results** on the result card. Each business is a row with its Phone from Google Maps and its Website phones from its site.

![](visual:ext/results-maps-with-contacts)

## Step 3 — Keeping only the phone columns

With the results tab in front, type this in the side panel's chat:

```
Only name, phone and website phones, rows with a phone
```

Rows without a phone number are hidden and the other columns disappear from view.

![](visual:ext/results-arranged)

## Step 4 — Exporting

Click **Export as** and choose Excel. The download matches what's shown.

![](visual:ext/results-export-menu)

## When it goes wrong

**Phone is empty for some rows.** The listing shows no phone on Google Maps. Website phones, read from the business's own site, often fills the gap; keep both columns.

**The chat filter hid too many rows.** `rows with a phone` keeps rows where the Phone column has a value. Say `rows with a phone or a website phone` to keep both, or click Clear filters and use Filter rows on the results page.

**The run stopped at a verification page.** Complete the check in the Google Maps tab and run the search again. What was collected is kept in History.

## Conclusion

You have a call list from a Google Maps search: names and phone numbers, nothing else. The same filter works on any collection: name the columns and the rows you want.
