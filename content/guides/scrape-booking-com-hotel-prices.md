---
title: "How To Scrape Booking.com Hotel Prices for Your Dates"
description: "Search a city and your dates on Booking.com and get every hotel as a row with its price, guest rating, review count and address, sorted in a spreadsheet."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-booking-com-hotel-prices
# Facts checked against chrome-extension-source on 2026-11-10:
# Booking.com has a setup (search results pages, one row per property card): configs-prod/booking.com.json (same as public/site-sitemaps/booking.com.json)
# Column names Hotel Name, Location / Address, Guest Rating, Rating Class, Reviews Count, Nightly Price: configs-prod/site-column-mappings/booking.com.json
# The setup sets no paging method, so the List tab's own Next page / Load more / Auto scroll detection applies: configs-prod/booking.com.json, components/scraper/ListTab.tsx
# List 1, Choose from lists we found, Choose an item on the page, Collect more pages, Load more button ready, Auto scroll detected, 5/10/15 loads, To end, Collect (10 loads), Collect to end, Stop and save, Rescan page: components/scraper/ListTab.tsx
# Results open in a new tab when collection ends: lib/background/viewerNavigation.ts
# Columns sort as numbers when the cells read as numbers: lib/utils/sortValues.ts
# Edit column name on header hover, Filter rows, chat filters such as "Guest Rating > 8": entrypoints/dataviewer/main.tsx, entrypoints/dataviewer/rowFilters.ts
# Export as Microsoft Excel, CSV, JSON, Google Sheets: entrypoints/dataviewer/main.tsx, lib/utils/export-utils.ts
faq:
  - q: "Is there a free Booking.com scraper?"
    a: "Web Scraper Pro is free, with no paid plan and no account to create. Search Booking.com in Chrome with your dates, pick the list in the side panel, and collect every page of hotels."
  - q: "Does Booking.com allow scraping?"
    a: "Booking.com's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser. Collect for your own trip planning or research, keep it to public listings, and read the terms before reusing anything."
  - q: "Why are the prices different from what I see later?"
    a: "Prices on Booking.com depend on the dates, the number of guests, the currency and sometimes a sign-in. The extension saves what the card showed at the moment you collected; change the dates and collect again to compare, and both collections stay in History."
  - q: "Which columns do I get from Booking.com?"
    a: "The Booking.com setup names Hotel Name, Location / Address, Guest Rating, Rating Class, Reviews Count and Nightly Price. Anything else a card shows, such as the hotel's link, comes in as a column named from the page."
  - q: "How many hotels can I collect from one search?"
    a: "As many as the results list shows. Choose Collect more pages, and the side panel shows how the results continue: a Next button, a Load more button or scrolling. For a big city, filter by district or price first."
  - q: "Can I compare the same hotels on Hotels.com?"
    a: "Yes. Hotels.com has a ready-made setup with price per night and total with taxes; see the Hotels.com page. Export both tables and match on the hotel name in your sheet."
---

Search a city and your dates on Booking.com, and Web Scraper Pro collects every hotel in the results into a spreadsheet: name, address, price, guest rating and review count. You get the whole city for your dates in one table you can sort by price or rating, instead of scrolling through cards.

Booking.com is one of the sites with a ready-made setup in the extension, so the main columns are named for you. This guide walks through each step on version 1.3.0.

## Does Booking.com Allow Scraping?

Booking.com's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser. Collect for your own trip planning or market research, keep it to public listings, and read [Is web scraping legal?](/web-scraping-legal) before reusing anything; it isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A Booking.com search with your check-in and check-out dates, number of guests and the filters you want: price, star rating, free cancellation, district.

## What You Get

The Booking.com setup reads each hotel card on a search results page and names these columns. A column the card doesn't show for your search stays empty, and nothing is guessed.

| Column | What it holds |
|---|---|
| Hotel Name | The property's name |
| Location / Address | The area or address the card shows |
| Guest Rating | The review score |
| Rating Class | The words beside the score, such as Very good |
| Reviews Count | The number of reviews |
| Nightly Price | The price the card shows for your search |

Other details on the card, such as the link to the hotel's page, come in as extra columns named from the page. You can rename or remove any of them before you export.

**Note:** The setup names the price column Nightly Price, but it holds whatever price the card shows. Check one card to see whether Booking.com shows the price per night or for the whole stay on your search, and rename the column to match.

## Step 1 — Searching with Your Dates

In this step you set the search, because every price on Booking.com depends on it. Go to booking.com, enter the city, your check-in and check-out dates and the number of guests, and apply the filters you want: price range, star rating, free cancellation, a district.

Set the currency you want in the site's header before collecting; the extension saves what the card shows. If you want member prices, sign in first, because the extension collects what you can see. With the results on screen, you're ready to pick the list.

## Step 2 — Picking the List in the Side Panel

Here you tell the extension which list on the page to collect. Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, each list shows as a card such as **List 1**, with the number of items on this page.

![](visual:ext/list-tab-detected)

Hover a card and its items are outlined on the page. The results page also holds filters and other links, so pick the card whose count matches the hotels you see.

If no card fits, click **Choose an item on the page** and click one hotel; the similar cards are picked with it. With the list chosen, you say how far to go next.

## Step 3 — Loading Every Hotel

This step follows the results past the first screen. Choose **Collect more pages**, and the side panel looks for how the results continue. When it finds the way, it shows **Next button ready**, **Load more button ready** or **Auto scroll detected**.

If it shows none of these, choose **Next page**, **Load more** or **Auto scroll** to match what you see at the bottom of the results, and click the site's button when the panel asks. For Load more, pick **5 loads**, **10 loads**, **15 loads** or **To end**; for Next page, pick how many pages; for Auto scroll there is nothing to set.

![](visual:ext/list-tab-more-pages)

Click the collect button, such as **Collect (10 loads)** or **Collect to end**, and keep the tab in front. The side panel counts the hotels as they come in, and **Stop and save** keeps what it has at any time. When it finishes, the results open in a new tab.

## Step 4 — Reviewing and Sorting the Table

Now you turn the cards into a comparison. The results page shows one row per hotel, and a column whose cells read as numbers sorts as numbers. Click the Nightly Price header to sort the city by price, or Guest Rating for the best rated.

![](visual:ext/results-booking)

Hover a column header and click **Edit column name** to rename it, for example Nightly Price to Price for stay. To keep only some hotels, type a filter in the side panel's chat with the results tab in front:

```
Guest Rating > 8
```

The chat keeps the rows that match, and you can sort and filter again before you export. The last step saves the table.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The collection is saved in History with its date, so you can change the dates on Booking.com, collect again, and compare the two tables.

![](visual:ext/results-export-menu)

Here is what a few rows look like after export. The hotels, addresses and prices are made up.

Sample data:

| Hotel Name | Location / Address | Guest Rating | Rating Class | Reviews Count | Nightly Price |
|---|---|---|---|---|---|
| Sample Harbor Hotel | Old Town, Example City | 8.8 | Excellent | 1,204 | 341 |
| Sample Northgate Inn | Station District, Example City | 8.2 | Very good | 532 | 251 |
| Sample Bluebird Rooms | City Centre, Example City | 9.1 | Wonderful | 318 | 432 |

## When It Goes Wrong

**The prices changed since I collected.** Booking.com reprices by date, guests, currency and sign-in. The table holds what the cards showed at that moment; collect again for current prices, and keep both collections in History.

**The collection never ends.** A big city has many hotels to load. Click **Stop and save** when you have enough, or filter by district or price before collecting.

**The List tab found the filters, not the hotels.** Pick the card whose count matches the number of hotels on the page, or click **Choose an item on the page** and click one hotel card.

**Booking.com showed a verification page.** Complete the check in the tab, click **Rescan page** at the top of the List tab, and collect again. History keeps anything you already collected.

**The price looks lower than the checkout total.** On some searches the card shows the price before taxes and fees. Open one hotel to see how the card price is built, and note it in your sheet.

## Conclusion

You collected every hotel in a Booking.com search for your dates into a spreadsheet you can sort by price and rating, and you can collect again for other dates and compare. For the same comparison on Hotels.com, with price per night and the total with taxes, see [How to scrape Hotels.com prices for your dates into a spreadsheet](/scrapers/hotels-com), and the travel use case for the whole workflow.
