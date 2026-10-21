---
title: "How To Scrape Every Page of a List, Not Only the First"
description: "Collect a whole list across numbered pages, Load more buttons or endless scrolling into one spreadsheet, with no code: pick the list, set how many pages, click once."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-collect-every-page-of-results
faq:
  - q: "How many pages can it collect?"
    a: "As many as you set under Stop after: 5, 10, 20, all pages, or a number you type. Load more runs 5, 10 or 15 times, or to the end. Big sites slow down accounts that load hundreds of pages quickly, so collect in runs of a few hundred rows."
  - q: "The Next button wasn't found. What now?"
    a: "Click Change next to Next button ready and click the site's next-page button yourself. The extension remembers it for the run."
  - q: "Can I do this from chat instead?"
    a: "Yes. Type `collect every page of this list` in the Chat tab, or accept the Collect every page card chat offers after collecting the first page."
  - q: "Will I get the same item twice?"
    a: "No. An item that shows up again on the next page, or in a carousel, is kept once."
  - q: "How do I scrape all pages of a website, not only one?"
    a: "Choose Collect more pages, confirm how the page moves on, set Stop after to All pages, and click Collect from all pages. For a site with several lists, run it once per list page."
  - q: "Does it handle pagination on any website?"
    a: "It handles the three ways a list continues: numbered pages or a Next link, a Load more button, and loading as you scroll. When it can't tell which, it asks, and you can point it at the Next button yourself."
  - q: "Can I collect multiple pages from different websites in one go?"
    a: "Paste the first-page addresses into Bulk scrape; each site is collected in turn with its own page settings, and View merged table puts the rows together."
---

Web Scraper Pro collects a whole list across numbered pages, Load more buttons or endless scrolling into one spreadsheet. You pick the list, say how many pages to go through, and click once; the run pages through on its own. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A page whose list continues: a store category with numbered pages, a directory with a Load more button, or a feed that loads as you scroll.

## Step 1 — Opening the List tab on the first page

Go to the first page of the list and open the side panel's **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with how many items are on this page, such as **List 1 · 24 items on this page**.

Hover a card and the list it means is outlined on the page. If none is the list you want, click **Choose an item on the page** and click one item; every similar item is picked with it.

![](visual:ext/list-tab-detected)

## Step 2 — Choosing to collect more pages

Pick the list. The panel shows **How much to collect** with two choices: **This page only**, selected by default, collects the items you can see, and **Collect more pages** follows the list across pages.

The extension looks at the page to work out how it moves on. When it finds a method, it goes straight to that setup; otherwise it asks you to choose between **Next page**, **Load more** and **Auto scroll**.

![](visual:ext/list-tab-pagination-choice)

| The page moves on by | Choose | What the run does |
|---|---|---|
| Numbered pages or a Next link | **Next page** | Clicks next, waits for the page, collects, repeats |
| A Load more or Show more button | **Load more** | Clicks the button, waits for new rows, repeats |
| Loading as you scroll | **Auto scroll** | Scrolls to the bottom until nothing new loads |

## Step 3 — Setting how far to go

For **Next page**, the panel shows **Next button ready** once it has found the button. Under **Stop after**, pick **5 pages**, **10 pages**, **20 pages**, **All pages**, or **Custom** for a number you type. Five pages is the default; change it in Settings → Results → Pages to go through.

For **Load more**, the choices are **5 loads**, **10 loads**, **15 loads** or **To end**. **Auto scroll** has no setting; it scrolls until the page stops loading.

![](visual:ext/list-tab-more-pages)

If the button it found is wrong, click **Change** and click the right button on the page yourself.

## Step 4 — Starting the run

Click the button at the bottom: **Collect from 5 pages**, **Collect from all pages**, **Collect (5 loads)** or **Collect to end**, depending on what you chose. Keep the tab in front while it runs. The tab's title shows the count as it goes, such as **Collecting 48**, and turns into a green **Collected 120** if you switch away before it finishes.

If you started on page 3, the panel says so and the run begins there. Click Stop at any time to keep what it has.

## Step 5 — Reviewing the table

The results page opens with every page's rows in one table. The chip at the top shows the total, such as **120 total**. Rows that appeared on more than one page are kept once.

![](visual:ext/results-many-pages)

Mostly empty columns are hidden to keep the table readable; click **Columns** to see them and show any you need. Hover a column header to rename it with the pencil or remove it with the trash icon.

## Step 6 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The file holds exactly the rows and columns shown, with prices and counts saved as numbers.

![](visual:ext/results-export-menu)

## When it goes wrong

**Next button ready never appears.** Click Change and click the site's own Next button; the extension remembers it for the run. If the page loads more as you scroll, choose Auto scroll instead.

**The run stopped before the last page.** The site rate-limited or showed a verification. Complete the check, click Rescan, and collect again from the page you're on; History keeps the first run.

**The same items appear twice.** Items repeated across pages are kept once on their own. If a site reorders results between pages, a few can slip through; use Remove duplicates in your sheet on the link column.

**Paging is slow.** Keep the tab in front; a background tab is throttled by Chrome. Each page waits for the site to load, so a slow site means a slow run.

## Conclusion

You collected a list that spans many pages into one table with a single click. For a list that runs across several sites, or the same category on several stores, paste the first-page addresses into Bulk scrape and each one is collected in turn. To ask for it in words instead of clicking, see How To Scrape a Website Without Coding, by Asking.
