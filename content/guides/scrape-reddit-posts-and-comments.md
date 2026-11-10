---
title: "How To Scrape Reddit Posts and Comments into a Spreadsheet"
description: "Collect the posts in a subreddit or a Reddit search, then the comments on a post, into Excel, one row each, with no code and no API key."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-reddit-posts-and-comments
# Facts checked against chrome-extension-source on 2026-11-10: Reddit has no setup (no file in configs-prod), so lists are found by the generic list search and columns are named from the page: configs-prod/, lib/content/scanForListsCore.ts
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page" (similar items picked with it), "Rescan page", "How much to collect", "Collect more pages", Next page / Load more / Auto scroll, "Auto scroll detected", "Load more button ready", "Collect to end", "Collect (to end)": components/scraper/ListTab.tsx, lib/tools/helpTopics.json
# Facts checked against chrome-extension-source on 2026-11-10: the extension reads the page in the person's own browser and doesn't sign in for them: products/web-scraper-pro.md (runs in Chrome, reads pages they're signed in to)
# Facts checked against chrome-extension-source on 2026-11-10: "Filter rows" on the results page; Export as Google Sheets, Microsoft Excel, CSV, JSON: lib/tools/helpTopics.json
faq:
  - q: "How do I scrape Reddit without the API?"
    a: "Open the subreddit or search in Chrome, open the Web Scraper Pro side panel's List tab, pick the posts list, choose Collect more pages with Auto scroll, and click Collect to end. It reads the page you can see; there is no API key and no account."
  - q: "Can I get the comments too?"
    a: "Yes, one post at a time. Open the post, pick the comments in the List tab, and collect."
  - q: "Which columns do I get?"
    a: "Reddit has no ready-made setup, so the columns are named from the page, and they can differ between Reddit's layouts. Check them on a short first run and rename any column on the results page."
  - q: "How many posts can I collect?"
    a: "As far as the page scrolls. A busy subreddit keeps loading older posts, so click Stop when you have enough; the rows so far are kept."
  - q: "Can I search Reddit for a keyword and export the results?"
    a: "Yes. Run the search on Reddit, sort it the way you want, and collect the results list the same way as a subreddit."
  - q: "Does it use Reddit's .json addresses?"
    a: "No. The extension reads the page you can see in your own browser, not Reddit's .json addresses or its API, so it doesn't depend on either."
  - q: "Is scraping Reddit allowed?"
    a: "Reddit's terms restrict automated collection. You collect public posts in your own browser, at a person's pace, for your own research. Read our plain-words explainer on web scraping and the law first; it isn't legal advice."
  - q: "Will Reddit ban my account?"
    a: "You read public pages in your own browser, at a person's pace, without posting. If loading slows during a long scroll, click Stop and keep what you have. Keep it to your own research and don't republish people's posts."
---

Web Scraper Pro turns a subreddit, a Reddit search or a post's comment thread into a spreadsheet, one row per post or comment. You pick the list on the page and let the run scroll. There is no API key and no account, because the extension reads the page you have open.

## Does Reddit Allow Scraping?

Reddit's terms restrict automated collection, and its official API is the route it offers to developers. This guide reads the public page you have open, in your own browser, at the pace a person scrolls, for your own research.

Keep it to public communities, don't republish people's posts, and read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## Why It Doesn't Depend on Reddit's .json Addresses

Many scripts and scrapers read Reddit through its `.json` page addresses or its API. Web Scraper Pro uses neither. It reads the page you can see in your own browser, so the steps below work on whatever Reddit shows you.

The same applies the other way: anything Reddit shows only after a sign-in or a verification stays out of reach until you complete it yourself. The extension never signs in for you.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A subreddit, a Reddit search, or a post whose comments you want, open in Chrome.

## What You Get

Reddit has no ready-made setup in the extension, so the columns are named from the page. A post usually shows these details, and each one the page shows becomes a column. Sample data: the titles and names are made up.

| Detail | Example |
|---|---|
| Title | Which lead list tool do you use for local businesses? |
| Subreddit | r/sample_community |
| Author | u/sample_user |
| Score | 142 |
| Comments | 37 |
| Posted | 3 days ago |
| Link | reddit.com/r/sample_community/comments/… |

A comment thread usually shows the author, the comment text, its score and its date. Check the columns on a short first run, and rename them on the results page.

## Step 1 — Opening the Posts You Want

In this step you set up the list the extension will read. In Chrome, go to the subreddit, or search Reddit for your keyword and press <kbd>Enter</kbd>. Sort the list the way you want the sheet, such as newest first or top posts in a time range; the extension collects what the page shows.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with how many items are on this page. Hover a card and its list is outlined on the page.

![](visual:ext/list-tab-detected)

Pick the card whose count matches the posts you can see. If no card is the posts, click **Choose an item on the page** and click one post; similar posts are picked with it. You have picked the feed; next you let it scroll.

## Step 2 — Letting the Feed Scroll

Under **How much to collect**, choose **Collect more pages**. A Reddit feed has no page numbers; it loads older posts as you scroll. If the panel doesn't show **Auto scroll detected**, choose **Auto scroll**. Click **Collect to end**.

![](visual:ext/list-tab-more-pages)

The run scrolls the page and adds posts as they load. A busy subreddit keeps loading for a long time, so click **Stop** when you have enough; the rows so far are kept.

## Step 3 — Reviewing the Posts

The results page opens with one row per post. Check the column names first, because they come from the page.

Hover a column header to rename it with the pencil or remove it with the trash icon. Click **Filter rows** to keep the posts that mention a word you care about, or type in the side panel's chat with the results tab in front:

```
Only title, score, comments and link, sorted by comments
```

![](visual:ext/results-arranged)

A keyword match is a signal, not a lead or a verdict. Read the posts that matter before you act on the sheet; the link column takes you back to each one.

## Step 4 — Collecting the Comments on a Post

In this step you collect one thread. Open a post, then click **Rescan page** at the top of the **List** tab. Look for a card whose count matches the comments you can see, or click **Choose an item on the page** and click one comment.

Choose **Collect more pages** and tell the extension how the thread continues. If more comments load as you scroll, choose **Auto scroll** and click **Collect to end**. If the thread shows a button to load more comments, choose **Load more**, click that button when the panel asks, and click **Collect (to end)**.

![](visual:ext/list-tab-pagination-choice)

Each comment becomes a row. Replies that are folded on the page stay out until you open them, so check a short run before a long thread.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Both collections stay in History.

![](visual:ext/results-export-menu)

After export the posts sheet looks like this, with your own column names. Sample data: the titles and links are made up.

| Title | Subreddit | Score | Comments | Posted | Link |
|---|---|---|---|---|---|
| Which lead list tool do you use for local businesses? | r/sample_community | 142 | 37 | 3 days ago | reddit.com/r/sample_community/comments/a1 |
| How do you find suppliers for a new shop? | r/example_business | 58 | 21 | 5 days ago | reddit.com/r/example_business/comments/b2 |
| Cold email reply rates this year | r/sample_community | 310 | 88 | 1 week ago | reddit.com/r/sample_community/comments/c3 |

## When It Goes Wrong

**The run never ends.** Reddit keeps loading older posts. Click **Stop** when you have enough, or sort by top posts in a time range to shorten the feed.

**The List tab found the sidebar.** Pages also hold community lists and promoted posts. Pick the card whose count matches the posts on screen, or click **Choose an item on the page** and click one post.

**Comments are missing from a long thread.** Deep replies sit behind "more replies" links. Collect what loads, then open those links on the page, click **Rescan page**, and collect again.

**Reddit asked you to verify or sign in.** Complete the check in the tab yourself, click **Rescan page**, and collect again. Collect in smaller runs afterwards.

## Conclusion

You collected the posts in a subreddit or search, and the comments on a post, into spreadsheets you can sort and filter. For the same kind of thread on YouTube, see How To Scrape YouTube Comments into a Spreadsheet. For more on picking lists and following them across pages, see the [list scraper page](/list-scraper).
