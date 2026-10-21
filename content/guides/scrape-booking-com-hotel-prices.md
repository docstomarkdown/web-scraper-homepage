---
title: "How To Scrape Booking.com Hotel Prices for Your Dates"
description: "Search a city and your dates on Booking.com and get every hotel as a row with price for the stay, guest rating, review count and link, sorted in a spreadsheet."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-booking-com-hotel-prices
faq:
  - q: "Is there a free Booking.com scraper?"
    a: "Web Scraper Pro is free to use today, with every feature included and no account to create. Search Booking.com in Chrome with your dates, pick the list in the side panel, and collect every page of hotels."
  - q: "Does Booking.com allow scraping?"
    a: "Booking.com's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser. Collect for your own trip planning or research, keep it to public listings, and read the terms before reusing anything."
  - q: "Why are the prices different from what I see later?"
    a: "Prices on Booking.com depend on the dates, the number of guests, the currency and sometimes a sign-in. The extension saves what the card showed at the moment you collected; change the dates and collect again to compare, and both runs stay in History."
  - q: "Which columns do I get from Booking.com?"
    a: "Booking.com has no verified setup in this guide yet, so the columns are named from what the results cards show: hotel name, price for the stay, guest rating and its label, review count, distance from the center, room type and the link. A column the card doesn't show stays out."
  - q: "How many hotels can I collect from one search?"
    a: "As many as the results list shows. Booking.com loads more hotels as you scroll or with a Load more button, so choose Collect more pages and set how far to go. For a big city, filter by district or price first."
  - q: "Can I compare the same hotels on Hotels.com?"
    a: "Yes. Hotels.com has a ready-made setup with price per night and total with taxes; see the Hotels.com page. Export both tables and match on the hotel name in your sheet."
---

<!-- Draft from the competitor-corpus candidates (2026-10-21). Booking.com has no verified run for this guide on 1.3.0. A verified
     run must confirm: whether a ready-made setup names the columns (the site is listed under Travel on the homepage) or the
     List tab names them from the cards; the column names (hotel name, price for the stay, guest rating, rating label, review
     count, distance, room type, link); whether results continue by Load more or by scrolling; whether taxes are included in
     the card price for the region tested; whether sponsored or "Genius" rows are marked. Update the sample table and the
     capture ids from that run. -->

Search a city and your dates on Booking.com, and Web Scraper Pro collects every hotel in the results into a spreadsheet: name, price for the stay, guest rating, review count, distance from the center and link. You get the whole city for your dates in one table you can sort by price or rating, instead of scrolling through cards. This guide shows each step on version 1.3.0.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A Booking.com search with your check-in and check-out dates, number of guests and the filters you want: price, star rating, free cancellation, district.

## Does Booking.com Allow Scraping?

Booking.com's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser, at a person's pace. Collect for your own trip planning or market research, keep it to public listings, and read [Is web scraping legal?](/web-scraping-legal) before reusing anything; it isn't legal advice.

## What You Get

The columns are named from what the results cards show for the dates you searched. A column the card doesn't show stays out, and nothing is guessed.

| Column | Example |
|---|---|
| Hotel Name | Harbor View Hotel |
| Price | 341 (for the stay) |
| Guest Rating | 8.8 |
| Rating Label | Excellent |
| Review Count | 1,204 |
| Distance | 0.6 km from center |
| Room Type | Double Room |
| Link | booking.com/hotel/… |

## Step 1 — Searching with Your Dates

In this step you set the search, because every price on Booking.com depends on it. Go to booking.com, enter the city, your check-in and check-out dates and the number of guests, and apply the filters you want: price range, star rating, free cancellation, a district.

Set the currency you want in the site's header before collecting; the extension saves what the card shows. If you want member prices, sign in first, because the extension collects what you can see. With the results on screen, you're ready to pick the list.

## Step 2 — Picking the List in the Side Panel

Here you tell the extension which list on the page to collect. Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, the hotels show as **List 1** with the number of hotels on this page.

![](visual:ext/list-tab-detected)

Hover the card and the hotel cards are outlined on the page. The results page also holds a list of filters and a row of popular areas, so if the first card isn't the hotels, pick the card whose count matches.

Or click **Choose an item on the page** and click one hotel; every similar card is picked with it. The list is chosen, so next you say how far to go.

## Step 3 — Loading Every Hotel

This step follows the results past the first screen. Choose **Collect more pages**; Booking.com adds hotels with a **Load more** button or as you scroll, so the panel shows **Load more button ready** or **Auto scroll detected**.

For Load more, pick **5 loads**, **10 loads**, **15 loads** or **To end**; for Auto scroll there is nothing to set.

![](visual:ext/list-tab-more-pages)

Click **Collect (10 loads)** or **Collect to end**, depending on what you chose, and keep the tab in front. The tab's title counts the hotels as they come in, and you can click Stop at any time to keep what it has. When it finishes, the results page opens.

## Step 4 — Reviewing and Sorting the Table

Now you turn the cards into a comparison. The results page shows one row per hotel, with prices, ratings and counts saved as numbers so they sort correctly. Click the Price header to sort the city by price, or Guest Rating for the best rated.

![](visual:ext/results-booking)

Hover a column header to rename it with the pencil, such as changing the site's label to Price for stay, or remove it with the trash icon. Click **Filter rows** to keep hotels above a rating or under a price. Or type in the side panel's chat with the results tab in front:

```
Only hotel name, guest rating and price, sorted by price
```

The table shows exactly what the cards showed for your dates. The last step saves it.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The collection is saved in History with its date, so change the dates on Booking.com, collect again, and compare the two tables side by side.

![](visual:ext/results-export-menu)

Here is what a few rows look like after export for a two-night search; the hotels and prices are made up.

Sample data:

| Hotel Name | Guest Rating | Review Count | Distance | Price |
|---|---|---|---|---|
| Harbor View Hotel | 8.8 | 1,204 | 0.6 km from center | 341 |
| Northgate Inn | 8.2 | 532 | 1.4 km from center | 251 |
| Bluebird Boutique Hotel | 9.1 | 318 | 0.3 km from center | 432 |

## When It Goes Wrong

**The prices changed since I collected.** Booking.com reprices by date, guests, currency and sign-in. The table holds what the cards showed at that moment; collect again for current prices, and keep both runs from History.

**The run never ends.** A big city loads hotels for a long time. Click Stop when you have enough, or filter by district or price before collecting; the rows so far are kept.

**The List tab found the filters, not the hotels.** Pick the card whose count matches the number of hotels on the page, or click **Choose an item on the page** and click one hotel card.

**Booking.com showed a verification page.** Complete the check in the tab, click **Rescan**, and collect again from where you are. History keeps the first run.

**The price looks lower than the checkout total.** Some regions show the price before taxes and fees on the card. Open one hotel to see how the card price is built, and note it in your sheet.

## Conclusion

You collected every hotel in a Booking.com search for your dates into a spreadsheet you can sort by price and rating, and you can rerun it for other dates and compare. For the same comparison on Hotels.com, with price per night and the total with taxes, see [How to scrape Hotels.com prices for your dates into a spreadsheet](/scrapers/hotels-com), and the travel use case for the whole workflow.
