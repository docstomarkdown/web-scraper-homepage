---
title: "How To Extract Leads from Google Maps to Excel"
description: "Type a business type and a city, and get every Google Maps result as a row with phone, website, rating and address, exported to Excel in one run. No code, no API key."
status: draft
date: 2026-10-20
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: maps-leads
sites: [maps]
video: ""
campaign: yt-b2-01-how-to-get-local-business-leads-from-google-maps
faq:
  - q: "How many businesses can one search return?"
    a: "Up to 200 in chat. For more, search smaller areas or narrower categories and run them together with Bulk runs."
  - q: "Why do some rows have no email?"
    a: "Emails come from each business's own website. A business that doesn't publish one gets its phone and website only."
  - q: "Is there a free way to try this?"
    a: "Install the extension from the Chrome Web Store and run a search. You see the rows before you export, so you know what you're getting."
  - q: "Can I get the business listings without code?"
    a: "Yes. Everything here is a sentence in the Chat tab or a click in the side panel. There's no API key, no script and no selector to set up."
  - q: "Can I collect reviews as well?"
    a: "Not from a Google Maps search. The run collects each business's details and contact details; review text isn't part of it."
---

Type a business type and a city into Web Scraper Pro's chat, and every Google Maps result becomes a row with its phone, website, rating and address. One click exports the list to Excel. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A type of business and a place, such as dentists in Austin.

## Step 1 — Opening the side panel

Open a new tab and click the Web Scraper Pro icon in the toolbar. Open the **Chat** tab. The panel opens on **What do you want to collect?** with idea cards for the page you're on.

![](visual:ext/panel-chat-empty)

## Step 2 — Asking for the businesses

Type `Find dentists in Austin` and press Enter. A card asks how many businesses to collect: 20, 50, 100 or 200, or a number you type. Choose **50** and click **Start**.

Emails and social links from each business's website are collected too. That's because **Add emails from their websites** is on by default in Settings → Results. Add `no emails` to the request to skip them.

![](visual:ext/chat-maps-count-card)

## Step 3 — Watching the run

Google Maps opens in a new tab. The extension scrolls the results and opens each place for its phone, website, address and hours. The progress line in the panel counts the businesses collected and how many have an email.

Click the round Stop button, or press Esc, at any time to keep what it has.

![](visual:ext/chat-maps-progress)

## Step 4 — Opening the results

When the run finishes, the result card shows the row count with **View results** and download buttons. Click **View results**. Each business is one row:

| Columns from Google Maps | Columns from each website |
|---|---|
| Business Name, Category, Rating, Review Count, Address, Operating Hours, Phone, Website, Map URL | Emails, Website phones, and one column per social network |

![](visual:ext/results-maps-with-contacts)

## Step 5 — Keeping the columns you need

With the results tab in front, type this in the side panel's chat:

```
Only name, phone, website and rating, sorted by rating
```

The table changes to match, and the download will too.

![](visual:ext/results-arranged)

## Step 6 — Exporting to Excel

Click **Export as** and choose **Microsoft Excel**. The file opens with one row per business. Ratings and review counts are saved as numbers, so the sheet sorts them without clean-up.

![](visual:ext/results-export-menu)

## When it goes wrong

**The count card never appeared.** It shows only until a count is remembered. Say the number in the request, such as `Find dentists in Austin, 100`, or change Businesses per chat search in Settings → Results.

**The run stopped part way.** Google Maps asked for a verification, or the tab went to the background. Complete the check in the Google Maps tab, keep that tab in front, and run the search again. The businesses already collected are in History.

**Most rows have no email.** Google Maps never lists emails. They come from each business's website, and many small businesses publish none. Rows without a website can't have an email.

**The table has fewer businesses than Google Maps shows.** Google Maps lists only so many results per search, usually around 120, whatever the count on screen. Search by neighbourhood or zip code and let chat combine the searches.

## Conclusion

You turned a Google Maps search into an Excel list with contact details in one run. To repeat it for several cities at once, see the bulk runs guide. To add emails to a list you collected earlier, see How To Extract Emails from Google Maps.
