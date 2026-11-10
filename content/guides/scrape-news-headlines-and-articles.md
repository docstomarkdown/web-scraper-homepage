---
title: "How To Scrape News Headlines and Articles into a Spreadsheet"
description: "Collect a news section's headlines with their links, then every article's text with its author, date and word count, one row per article, no code."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: page-text
sites: []
video: ""
campaign: guide-scrape-news-headlines-and-articles
# Facts checked against chrome-extension-source on 2026-11-10: news sites have no setup, so the headline list is found by the generic list search and its columns are named from the page: configs-prod/, lib/content/scanForListsCore.ts
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page", "Collect more pages", Next page / Load more / Auto scroll, "Stop after": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: Bulk scrape menu "Collect page text"; text mode steps are Upload ("Use saved data", "Reuse URLs from a saved table", "Choose a saved table", "N valid URLs detected", "Continue") and "Review sites" ("Start collecting"), with no Configure step: entrypoints/sidepanel/main.tsx, entrypoints/bulk/main.tsx
# Facts checked against chrome-extension-source on 2026-11-10: page-text columns Source URL, Page title, Description, Page text, Word count, Author, Publish date; clean page text and page details both on by default; navigation, ads, sharing controls and comments removed: lib/content/pageTextExtraction.ts, entrypoints/bulk/main.tsx
# Facts checked against chrome-extension-source on 2026-11-10: Export as offers Microsoft Word for page-text collections, the merged table included: entrypoints/dataviewer/main.tsx (isPageTextScrape, exportMenuOptions; siteType text maps to page-text)
# Facts checked against chrome-extension-source on 2026-11-10: "View merged table" appears only when the run covers more than one site; each site's card has View; "Waiting for you" on a verification page: entrypoints/bulk/main.tsx
# Facts checked against chrome-extension-source on 2026-11-10: results cells can be edited; "Copy text" on a text row: entrypoints/dataviewer/main.tsx (handleCellEdit)
faq:
  - q: "How do I scrape a news website without code?"
    a: "Open a section page, pick the headline list in the Web Scraper Pro side panel and click Collect. Then run Bulk scrape → Collect page text over the article links for each article's text, author and date."
  - q: "Can I get the full article text, not only the headline?"
    a: "Yes. The second run reads each article page and keeps the readable text, with navigation, ads, sharing controls and comments removed, plus its title, description, author, publish date and word count."
  - q: "Does it work behind a paywall?"
    a: "It collects the text the page shows you. If you're a subscriber and can read the article in Chrome, it's collected; it never gets past a paywall for you."
  - q: "How many articles can I collect?"
    a: "As many as the headline list holds, across as many pages as you set. Articles are read one after another, so a long list takes a while."
  - q: "Can I save the articles as a document instead?"
    a: "Yes. For a page-text collection, Export as offers Microsoft Word, so the whole reading list becomes one document."
  - q: "Is it allowed to scrape news articles?"
    a: "The articles belong to their publishers. Collecting them for your own reading, research or analysis is the common use; republishing them is a different matter, so check the site's terms. This isn't legal advice."
---

A news site's section page is a list of headlines, and each headline links to an article. Web Scraper Pro collects the two in two runs. The List tab turns the section page into rows with each headline and its link, and Bulk scrape reads every linked article for its text, author, publish date and word count. In this guide you build a sheet of one row per article from a section of a news site, ready for research notes or a media log.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A section or topic page on a news site, with a list of headlines. If the articles are behind a subscription, sign in first; the extension collects what you can see.

## Is It Allowed To Collect News Articles?

The articles belong to their publishers, and a site's terms decide what you may do with them. Collect for your own notes and analysis, keep the source address with each row, and quote from the source when you cite. Our page [Is web scraping legal?](/web-scraping-legal) covers the rules in plain words.

## What You Get

You get two tables: the headline list, and one row per article with its text. The headline table's columns are named from the section page, so they vary by site. The article table's columns are fixed. Sample data: the articles are made up.

| Table | Column | Example |
|---|---|---|
| Headlines | A headline column, named from the page | Council approves new river bridge |
| Headlines | A link column, named from the page | news.example/local/river-bridge |
| Articles | Source URL | news.example/local/river-bridge |
| Articles | Page title | Council approves new river bridge |
| Articles | Description | The vote clears the way for construction next year. |
| Articles | Author | Sample Reporter |
| Articles | Publish date | 2026-10-20 |
| Articles | Word count | 840 |
| Articles | Page text | The council voted on Tuesday to… |

## Step 1 — Collecting the Headlines

In this step you turn the section page into a table of links. Open the section page in Chrome and open the side panel's **List** tab. Under **Choose from lists we found**, pick the card whose count matches the stories on the page; hover a card to see its list outlined.

![](visual:ext/list-tab-news-headlines)

If no card is the headlines, click **Choose an item on the page** and click one headline. If the section continues over pages or loads more as you scroll, choose **Collect more pages**, confirm how it continues, set **Stop after**, and click Collect.

The results page opens with one row per headline. Check that a link column is there; that column feeds the second run.

## Step 2 — Opening Bulk Scrape for Page Text

Now you start the run that reads each article. Click the **Bulk scrape** icon at the top of the side panel and choose **Collect page text**. A bulk page opens in a new tab on its **Upload** step.

![](visual:ext/bulk-menu)

## Step 3 — Using the Saved Headline List

On the **Upload** step, click **Use saved data**; the step reads **Reuse URLs from a saved table**. Under **Choose a saved table**, pick the headline table from Step 1, then its link column. The chip reads **N valid URLs detected**. Click **Continue**.

![](visual:ext/bulk-upload)

On the **Review sites** step, check the list and remove any address that isn't an article. Click **Start collecting**. Each article gives both its clean page text and its page details: title, description, author and publish date.

## Step 4 — Watching the Articles Come In

Articles load one after another while the run counts rows. If a site shows a verification page, the run waits with **Waiting for you**; complete the check and it carries on.

![](visual:ext/bulk-run)

## Step 5 — Opening and Exporting the Table

When it finishes, click **View** on the site's card, or **View merged table** when the articles came from more than one site. Each article is one row with **Source URL**, **Page title**, **Description**, **Page text**, **Word count**, **Author** and **Publish date**.

Click **Export as** for **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**, or **Microsoft Word** to save every article's text as one document.

![](visual:ext/results-export-menu)

After export, the sheet looks like this. Sample data: the articles are made up.

| Page title | Author | Publish date | Word count | Source URL |
|---|---|---|---|---|
| Council approves new river bridge | Sample Reporter | 2026-10-20 | 840 | news.example/local/river-bridge |
| Library extends weekend hours | Test Writer | 2026-10-20 | 410 | news.example/local/library-hours |
| Market moves to the old square | Example Editor | 2026-10-19 | 620 | news.example/local/market-square |

## When It Goes Wrong

**The headline list has no link column.** The cards didn't carry a link the extension could read. Click **Choose an item on the page** and click one headline, then collect again.

**An article's text is cut off or blank.** The page showed a subscription wall or loads its text as you scroll. Open it in your browser, sign in or scroll to the end, and run that address again.

**Author or date is empty.** The page doesn't state them in a form the extension recognizes. Click the cell on the results page and type the value.

**The text includes a cookie banner.** A site can mark its banner as content. Delete the line in the sheet, or use **Copy text** on that row and paste it into your editor.

## Conclusion

You turned a news section into a sheet with one row per article, each with its text, author and date, and you can save the same run as one Word document. For a reading list of addresses you already have, see the [page text page](/page-text). For more on bulk runs, see the [bulk scraper page](/bulk-scraper).
