---
title: "How To Scrape a Website by Asking with Web Scraper Pro"
description: "Type what you want in plain words, such as \"collect the products on this page\", and get a spreadsheet back. No selectors, no code, and the data never leaves your browser until you export it."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: ai-chat
sites: []
video: ""
campaign: guide-scrape-a-website-by-asking
faq:
  - q: "Does the page's content go to an AI service?"
    a: "No. Collecting happens in your browser. To understand your request, your recent messages and the kind of page you're on go to our servers; the rows you collect stay on your device until you export them."
  - q: "What can I ask for?"
    a: "The list on the page, every page of it, a product's details, the contact details on a site, the page's text, a Maps search, a Shopify store's catalog, and a file with the columns you name. Reviews are collected from the side panel's Collect reviews, not chat."
  - q: "Do I need an account or an API key?"
    a: "No. The first time you use chat, the extension connects to our servers on its own, using your Chrome profile's email if there is one."
  - q: "What happens when it gets the wrong list?"
    a: "Say which one: \"the main results, not the sidebar\". Or switch to the List tab, click Choose an item on the page, and click an item in the list you want."
  - q: "Can it collect a website's text, not a list?"
    a: "Yes. Type \"collect the page text\" and you get the readable text with the title, author and date, ready for a document or an AI tool."
  - q: "Does it work on a website that requires a login?"
    a: "Yes, on the pages you can see once you're signed in, because it runs in your own browser tab. It doesn't sign in for you."
  - q: "Can it collect the images on a page?"
    a: "Images come from the side panel's Images tab, not chat: Collect images from this page, then download a size group or all of them as a ZIP."
---

Type what you want in plain words and get a spreadsheet back. The Chat tab reads your request, runs the right job in your browser, and offers the next step when there is one, such as collecting every page or adding emails. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A page with a list: products, listings, search results or a directory.
- An internet connection. Chat needs our servers to understand the request; the collecting still happens in your browser.

## Step 1 — Opening the Chat tab on the page

Open the page you want to collect from, click the Web Scraper Pro icon in the toolbar, and open the **Chat** tab. The panel opens on **What do you want to collect?** with idea cards for the page you're on: on a normal page, the first card is **Collect the list on this page**.

![](visual:ext/panel-chat-empty)

## Step 2 — Asking for the list

Click the card, or type a request and press Enter:

```
Collect the products on this page
```

Say it the way you'd ask a colleague. Chat works out whether you mean a list, a product's details, contact details, page text or a Maps search, and runs that job. While it runs, a card in the thread shows the progress and the Send button turns into a round Stop button.

![](visual:ext/chat-collect-list-result)

When it finishes, the result card shows the row count, a preview of the first rows, **View results** and the download buttons **Sheets · Excel · CSV · JSON**.

## Step 3 — Collecting every page

Chat collects the page you're on first. When the list continues on more pages, a **What next** card offers **Collect every page**; click it and the run pages through the list and adds the rows to the same table. You can also ask for it up front:

```
Collect every page of this list
```

![](visual:ext/chat-collect-every-page)

Stop keeps what it has. For a list with hundreds of pages, the List tab's **Stop after** setting gives you finer control over how far to go.

## Step 4 — Shaping the table in words

With the results tab in front, tell chat which columns and rows you want:

```
Only name, price and rating, sorted by price
```

The results page keeps only those columns and sorts them. A request like `rows rated above 4` adds a filter chip to the toolbar; **Clear filters** brings every row back. These changes also shape the download.

![](visual:ext/results-arranged)

## Step 5 — Asking for the file

Ask for the format and columns in one line:

```
Excel with name, price and the product link
```

Chat exports what you named. You can also click **Export as** on the results page for **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Every collection is saved in History, so you can export it again later.

![](visual:ext/results-export-menu)

## What chat can also do

Each request runs one of these jobs. The wording is yours; these are examples.

| Ask for | Example | What you get |
|---|---|---|
| A Maps search | `Find plumbers in Denver` | Up to 200 businesses with phone, website, rating, address, and the emails from their websites |
| The map you're looking at | `Collect the first 20` | The Maps results already on screen |
| A product's details | `Collect this product` | Everything on the product page, except reviews |
| Contact details | `Find contact emails on this site` | Emails, phone numbers and social links from the page and its Contact page |
| A Shopify store | `Every product, one row per size` | The whole catalog, from the store's product feed |
| Page text | `Collect the page text` | The readable text with title, author and date |
| Many pages at once | Paste a list of addresses | Chat opens Bulk scrape with them filled in |

Each browser tab keeps its own chat, so a Maps search in one tab and a product list in another don't get mixed up.

## When it goes wrong

**Chat collected the wrong list.** Say which one: `the main results, not the sidebar`. Or open the List tab, click Choose an item on the page, and click one entry.

**Chat says it reached the daily limit.** Chat answers again the next day. The List and Properties tabs collect without chat in the meantime.

**The reply says it opened the last collection.** The results tab wasn't in front, so chat opened the newest collection and arranged that one. Bring the right results tab to the front and ask again.

**The download has the wrong columns.** Downloads match what the results page shows. Tidy the table first, or name the columns in the request: `Excel with name and phone`.

## Conclusion

You collected a list by describing it, followed the list across pages, shaped the columns and exported a file, all in plain words. When chat picks the wrong list, the List tab's **Choose an item on the page** is the quickest fix; see How To Scrape Data from Any Website to Excel for that route.
