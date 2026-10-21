---
title: "How To Scrape a Website with ChatGPT, and What It Can't Do"
description: "ChatGPT can turn a page you paste into a table, and it can write a scraper for you. It can't page through a site, sign in, or guarantee the numbers it returns. Here's what works, what doesn't, and the one-sentence alternative."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: ai-chat
sites: []
video: ""
campaign: guide-scrape-a-website-with-chatgpt
faq:
  - q: "Can ChatGPT scrape a website by itself?"
    a: "It can read a page you paste or, with browsing, fetch a page's text and pull a short list out of it. It can't follow every page of results, open each item for details, or read pages behind a sign-in, and it can mistype values when the list is long."
  - q: "Is the code ChatGPT writes safe to run?"
    a: "Read it first and run it only on sites you're allowed to collect from. It usually works on simple pages and breaks on pages that load their content with JavaScript or change their layout."
  - q: "Why does the table have wrong numbers?"
    a: "A language model rewrites text rather than copying it, so long lists get skipped rows and altered digits. Check a sample against the page before you rely on it."
  - q: "What does Web Scraper Pro do differently?"
    a: "The AI only reads your request. The rows come from the page itself, in your browser, so every value is what the page shows, and it can follow every page and open each item."
  - q: "Can ChatGPT do web scraping with a prompt?"
    a: "A prompt gets you a table from text you paste, or a script to run yourself. Neither pages through a site or opens each item, and the pasted route rewrites values. The prompts above show both."
  - q: "Is Claude any different for web scraping?"
    a: "Claude has the same two routes and the same limits: it reads what you paste or fetches a page's text, and it can write a script. The gap is the same one: a model generates text; it doesn't copy a page's values."
  - q: "What about ChatGPT's browsing or agent mode?"
    a: "Browsing fetches a page's text, which is enough for a short public list and not for a paged catalog or a signed-in page. Values still pass through the model, so check them."
---

ChatGPT can help you collect data from a website in two ways: turn text you paste into a table, or write a script you run yourself. Neither one pages through a site, opens each item, or works where you're signed in, and the table route rewrites values instead of copying them. This guide shows both routes honestly, where each breaks, and the one-sentence alternative in Web Scraper Pro, tested on version 1.3.0.

## Prerequisites

- A ChatGPT account for the first two routes.
- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later) for the last one.
- A page you're allowed to collect from. Public listings are generally fine; check the site's terms first.

## Route 1 — Pasting a page into ChatGPT

**What works:** a short list, when you only need it once. Select the page's text, copy it, and paste it with a request:

```
Turn this into a table with columns Name, Price and Rating. Keep every row.
```

ChatGPT returns a table you can copy into a spreadsheet. For twenty rows this takes a minute and is usually right.

**Where it breaks:**

- **Long lists.** The paste hits the message limit, and past a few dozen rows the model starts skipping rows or merging two into one.
- **Numbers.** A model generates text; it doesn't copy. Prices, phone numbers and counts come back changed often enough that you have to check them.
- **One page.** Page 2 means another paste. A list of 30 pages means 30 pastes.
- **Details inside each item.** The listing shows the name and price; the phone number is on each item's own page, which the paste never includes.

## Route 2 — Asking ChatGPT to write a scraper

**What works:** a simple public page whose content is in the HTML. Ask for a script:

```
Write a Python script that collects the product name, price and link from this page's HTML and saves them as CSV.
```

Paste the page's HTML (right-click the page and choose View page source, then copy) so the script matches the real structure. Run it on your computer.

**Where it breaks:**

- **JavaScript pages.** Many stores and directories draw the list after the page loads. The script sees an empty page.
- **More pages.** The script handles the first page unless you describe the site's next-page mechanism exactly, and infinite scroll needs a real browser.
- **Sign-in and blocks.** The script has no cookies, so member pages are closed to it, and sites that check for bots stop it.
- **Layout changes.** The script matches today's class names. When the site redesigns, it returns nothing, and you're back to ChatGPT.
- **Setup.** Python, packages, a terminal. Fine for a developer; a detour for everyone else.

## Route 3 — Asking Web Scraper Pro

**What works:** the same request, run in your own browser, with the values copied from the page rather than rewritten. Open the page, open the side panel's **Chat** tab and type:

```
Collect the products on this page
```

![](visual:ext/panel-chat-empty)

The AI reads only your request. The extension finds the list on the page, reads each item into named columns, and shows the rows on a results page. When the list continues, a **What next** card offers **Collect every page**. When the rows have websites, it offers to add each site's emails and social links.

![](visual:ext/chat-collect-every-page)

Then ask for the file:

```
Excel with name, price and the product link
```

![](visual:ext/results-export-menu)

Because it runs in your Chrome window, it reads pages you're signed in to, and a site sees an ordinary visit from you.

## Side by side

| | Paste into ChatGPT | ChatGPT writes a script | Ask Web Scraper Pro |
|---|---|---|---|
| Setup | None | Python and packages | Install the extension |
| Values | Rewritten by the model; check them | Copied, when the script works | Copied from the page |
| Every page of results | One paste per page | Only if you describe the site's paging | Built in: Next page, Load more, Auto scroll |
| Each item's own page | No | Extra code | Built in for product details |
| JavaScript-drawn pages | Yes, you see them | Usually no | Yes, it's your browser |
| Pages you're signed in to | Yes, by pasting | No | Yes |
| When the site changes | Nothing to fix | Script breaks | The list is found again |
| Best for | A short list, once | A developer, a simple site | Anyone, any list, repeated |

## What Web Scraper Pro won't do either

- It collects what the page shows you. A site that needs a sign-in still needs you to sign in.
- It doesn't collect reviews from chat; use **Collect reviews** in the side panel.
- A Maps search stops at 200 businesses per run. Split big jobs into smaller searches.
- Collecting personal data, or data a site's terms forbid, is on you, whatever tool you use.

## When it goes wrong

**The script returns an empty list.** The page draws its list with JavaScript, so a plain fetch sees nothing. Ask for a version that uses Playwright or Selenium, or collect the page with the extension instead.

**The pasted table has wrong numbers.** A model rewrites text rather than copying it. Check a sample against the page; for long lists, use a tool that copies values from the page.

**The site blocked the script.** Scripts without a real browser are easy to spot. Slow it down, or run the collection in your own browser, where the site sees an ordinary visit.

## Conclusion

ChatGPT is a good way to tidy a short list you've pasted, and a fair way to get a starter script if you're a developer. For a list that spans pages, lives behind a sign-in, or has to be right to the digit, ask Web Scraper Pro instead; the request is the same sentence, and the rows come from the page. See How To Scrape a Website by Asking for the full walkthrough.
