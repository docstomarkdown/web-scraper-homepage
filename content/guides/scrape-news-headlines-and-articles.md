---
title: "How To Scrape News Headlines and Articles into a Spreadsheet"
description: "Collect a news section's headlines with their links, then every article's full text with its author, date and word count, one row per article, no code."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: page-text
sites: []
video: ""
campaign: guide-scrape-news-headlines-and-articles
faq:
  - q: "How do I scrape a news website without code?"
    a: "Open a section page, pick the headline list in the Web Scraper Pro side panel and click Collect. Then run Bulk scrape → Collect page text over the article links for each article's text, author and date."
  - q: "Can I get the full article text, not only the headline?"
    a: "Yes. The second run reads each article page and keeps the readable text with its title, author, publish date and word count, without menus, ads or comments."
  - q: "Does it work behind a paywall?"
    a: "It collects the text the page shows you. If you're a subscriber and can read the article in Chrome, it's collected; it never gets past a paywall for you."
  - q: "How many articles can I collect?"
    a: "As many as the headline list holds, across as many pages as you set. Articles are read one at a time, so a few hundred is a normal run."
  - q: "Can I save the articles as a document instead?"
    a: "Yes. On the merged table, Export as offers Microsoft Word for page-text collections, so the whole reading list becomes one document."
  - q: "Is it allowed to scrape news articles?"
    a: "The articles belong to their publishers. Collecting them for your own reading, research or analysis is the normal use; republishing them is a different matter, so check the site's terms. This isn't legal advice."
---

<!--
Facts to confirm with a verified run on 1.3.0 before this leaves draft:
- A news section page's headline list is detected by the List tab with a link column (generic detection; column names from the page).
- Bulk → Collect page text with Use saved data over the saved list's link column (bulk-scraper facts; textBulkExecutor).
- Page-text columns: Source URL, Page title, Description, Page text, Word count, Author, Publish date (page-text facts).
- Word export on the merged page-text table (page-text facts: Word for page-text collections; confirm it's offered on the merged table too).
- New capture: ext/list-tab-news-headlines.
-->

A news site's section page is a list of headlines, and each headline links to an article. Web Scraper Pro collects the two in two runs: the List tab turns the section page into rows with headline, link and date, and Bulk scrape reads every linked article for its text, author, publish date and word count. In this guide you build a sheet of one row per article from a section of a news site, ready for research notes, a media log or an AI tool.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A section or topic page on a news site, with a list of headlines. If the articles are behind a subscription, sign in first; the extension collects what you can see.

## Is It Allowed To Collect News Articles?

The articles belong to their publishers, and most sites' terms allow reading and personal research but not republishing. Collect for your own notes and analysis, keep the source address with each row, and quote from the source when you cite. Our page [Is web scraping legal?](/web-scraping-legal) covers the rules in plain words.

## What You Get

Two tables: the headline list, and one row per article with its text.

| Table | Column | Example |
|---|---|---|
| Headlines | Headline | Council approves new river bridge |
| Headlines | Link | news.example/local/river-bridge |
| Headlines | Published | 2 hours ago |
| Articles | Page title | Council approves new river bridge |
| Articles | Author | J. Rivera |
| Articles | Publish date | 2026-10-20 |
| Articles | Word count | 840 |
| Articles | Page text | The council voted on Tuesday to… |
| Articles | Source URL | news.example/local/river-bridge |

## Step 1 — Collecting the Headlines

Open the section page in Chrome and open the side panel's **List** tab. Under **Choose from lists we found**, the headlines show as a card with the number of stories on the page; pick it. If the section continues over pages or loads more as you scroll, choose **Collect more pages**, confirm the method, set **Stop after**, and click **Collect**.

![](visual:ext/list-tab-news-headlines)

The results page opens with one row per headline. Check that a link column is there; that column feeds the second run.

## Step 2 — Opening Bulk Scrape for Page Text

Click the **Bulk scrape** icon (the layers icon at the top of the side panel) and choose **Collect page text**. A bulk page opens in a new tab on its **Upload** step.

![](visual:ext/bulk-menu)

## Step 3 — Using the Saved Headline List

On the **Upload** step, click **Use saved data**, pick the headline table from Step 1 and its link column. The chip reads **N valid URLs detected**. Click **Continue →**.

![](visual:ext/bulk-upload)

On the **Review sites** step, the articles from one site share one setup. Click **Continue to site configuration →**, choose clean text, page details or both, and click **Start collecting →**.

## Step 4 — Watching the Articles Come In

Articles load one after another in the embedded browser on the right, while the card on the left counts rows. The run goes one page at a time on purpose. If the site shows a verification or a subscription wall, the run pauses or skips that page; complete the check in the embedded browser and it carries on.

![](visual:ext/bulk-run)

## Step 5 — Merging and Exporting

When it finishes, click **View merged table**. Each article is one row with **Page title**, **Author**, **Publish date**, **Word count** and **Page text**, plus **Source URL**. Click **Export as** for **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**, or **Microsoft Word** to save every article's text as one document.

![](visual:ext/results-export-menu)

After export, the sheet looks like this. The articles are made up.

| Page title | Author | Publish date | Word count | Source URL |
|---|---|---|---|---|
| Council approves new river bridge | J. Rivera | 2026-10-20 | 840 | news.example/local/river-bridge |
| Library extends weekend hours | M. Chen | 2026-10-20 | 410 | news.example/local/library-hours |
| Market moves to the old square | A. Okafor | 2026-10-19 | 620 | news.example/local/market-square |

## When It Goes Wrong

**The headline list has no link column.** The cards didn't carry a link the extension could read. Click **Choose an item on the page** and click one headline, which is usually the link, then collect again.

**An article's text is cut off or blank.** The page showed a subscription wall or loaded the text as you scroll. Open it in your browser, sign in or scroll to the end, and run that address again.

**Author or date is empty.** The page doesn't state them in a form the extension recognises. Fill the cell by clicking it on the results page.

**The text includes a cookie banner.** Rare, but a site can mark its banner as content. Delete the line in the sheet, or use **Copy text** on that row and paste it into your editor.

## Conclusion

You turned a news section into a sheet with one row per article, each with its text, author and date, and you can save the same run as one Word document. For a single article, see How To Save a Web Page as a Word Document with Its Text. For a reading list of addresses you already have, see How To Scrape Data from a List of URLs in One Run.
