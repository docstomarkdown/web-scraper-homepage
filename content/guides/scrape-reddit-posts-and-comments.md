---
title: "How To Scrape Reddit Posts and Comments into a Spreadsheet"
description: "Collect the posts in a subreddit or a Reddit search, then the comments on a post, into Excel with title, score, comments, date and link. No code, no API key."
status: draft
date: 2026-10-21
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-reddit-posts-and-comments
faq:
  - q: "How do I scrape Reddit without the API?"
    a: "Open the subreddit or search in Chrome, open the Web Scraper Pro side panel's List tab, pick the posts list, choose Collect more pages with Auto scroll, and click Collect to end. It reads the page you can see; there is no API key and no account."
  - q: "Can I get the comments too?"
    a: "Yes, one post at a time. Open the post, pick the comments list in the List tab, and collect. For many posts, paste their addresses into Bulk scrape."
  - q: "Which columns do I get?"
    a: "Reddit has no ready-made setup, so the columns come from the page: title, subreddit, author, score, comment count, date and link for posts; author, text, score and date for comments. Rename any column on the results page."
  - q: "How many posts can I collect?"
    a: "As far as the page scrolls. Reddit keeps loading older posts for a long time, so click Stop when you have enough; the rows so far are kept."
  - q: "Can I search Reddit for a keyword and export the results?"
    a: "Yes. Run the search on Reddit, sort it by New, and collect the results list. For several keywords, paste the search addresses into Bulk scrape."
  - q: "Does it still work after Reddit's 2026 JSON change?"
    a: "Yes. In late May 2026 Reddit stopped answering its .json page addresses for anyone not signed in, which broke tools built on them. The extension reads the page you can see in your own browser, not those addresses, so the steps in this guide are unchanged."
  - q: "Is scraping Reddit allowed?"
    a: "Reddit's terms restrict automated collection. You collect public posts in your own browser, at a person's pace, for your own research. Read our plain-words explainer on web scraping and the law first; it isn't legal advice."
  - q: "Will Reddit ban my account?"
    a: "You read public pages in your own browser, at a person's pace, without posting or signing in for the run. Reddit may slow a long scroll; click Stop and keep what you have. Keep it to your own research and don't republish people's posts."
---

<!--
Draft until a real run on 1.3.0 confirms: (1) the List tab detects the post feed on reddit.com (new design)
rather than the sidebar or the "popular communities" rail; (2) Auto scroll is detected on the feed; (3) the
comment list on a post page is detected, and whether it continues by Auto scroll or by a Load more button
("View more comments"); (4) the page-given column names for posts and comments. No pack exists for Reddit;
everything below uses the generic List tab flow from content/features/list-scraper.ts. Replace the sample
tables after the run. Title targets "how to scrape reddit" (SEARCH_QUERIES: 689 views/mo; 31 autosuggest
phrases, 2026-10-21).
-->

Web Scraper Pro turns a subreddit, a Reddit search or a post's comment thread into a spreadsheet, with the title, score, comment count, date and link in their own columns. You pick the list on the page and let the run scroll; there is no API key and no account. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Does Reddit Allow Scraping?

Reddit's terms restrict automated collection, and its official API is the route it offers to developers. This guide reads the public page you have open, in your own browser, at the pace a person scrolls, for your own research.

Keep it to public communities, don't republish people's posts, and read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What Still Works After Reddit's 2026 JSON Change

In late May 2026 Reddit stopped answering requests to its `.json` page addresses from anyone who isn't signed in, and the no-code scrapers and scripts built on those addresses stopped getting posts. This guide never used them. It reads the page you can see in your own browser, so every step below still works: the posts list, the comment thread, Auto scroll and Bulk scrape. What hasn't changed either: anything Reddit shows only after a sign-in or a verification stays out of reach, because the extension never signs in or completes a check for you.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A subreddit, a Reddit search, or a post whose comments you want, open in Chrome. Signing in to Reddit isn't needed for public communities.

## What You Get

Reddit has no ready-made setup in the extension, so the columns are named from the page. A post list gives you:

| Column | Example |
|---|---|
| Title | Which lead list tool do you use for local businesses? |
| Subreddit | r/sales |
| Author | u/sample_user |
| Score | 142 |
| Comments | 37 |
| Posted | 3 days ago |
| Link | reddit.com/r/sales/comments/… |

A comment thread gives you the author, the comment text, its score and its date. Column names differ a little between pages; rename them on the results page.

## Step 1 — Opening the Posts You Want

In Chrome, go to the subreddit, or search Reddit for your keyword and press `ENTER`. Sort the list the way you want the sheet: **New** for what people are asking now, **Top** with a time range for what resonated. The extension collects what the page shows, so the sort and filters do the narrowing.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with how many items are on this page. The posts are the card whose count matches the posts you can see.

![](visual:ext/list-tab-detected)

If no card is the posts, click **Choose an item on the page** and click one post; every similar post is picked with it. You have picked the feed; next you let it scroll.

## Step 2 — Letting the Feed Scroll

Choose **Collect more pages**. Reddit has no page numbers; it loads older posts as you scroll, so the panel shows **Auto scroll detected**. Click **Collect to end**.

![](visual:ext/list-tab-more-pages)

The run scrolls the page and adds posts as they load. A busy subreddit keeps loading for a long time, so click **Stop** when you have enough; the rows so far are kept. Keep the tab in front, because paging slows down in a background tab.

## Step 3 — Reviewing the Posts

The results page opens with one row per post and the total in a chip at the top. Hover a column header to rename it with the pencil or remove it with the trash icon. Click **Filter rows** to keep, say, posts with more than 20 comments, or type in the side panel's chat with the results tab in front:

```
Only title, score, comments and link, sorted by comments
```

![](visual:ext/results-arranged)

A keyword match is a signal, not a lead or a verdict. Read the posts that matter before you act on the sheet; the Link column takes you back to each one.

## Step 4 — Collecting the Comments on a Post

Open a post from the Link column. Back in the **List** tab, click **Rescan**; the comments show as a list with the number of comments you can see. Pick it, choose **Collect more pages**, and confirm how the thread continues: Reddit loads more comments as you scroll, and shows a **View more comments** button deep in long threads, so choose **Auto scroll**, or **Load more** if the panel asks and that is what you see.

![](visual:ext/list-tab-pagination-choice)

Click **Collect to end**. Each comment becomes a row with its author, text, score and date. Replies are rows too, in the order they appear on the page.

For the comments on many posts, paste the post addresses into **Bulk scrape**, choose **Bulk scrape**, and the posts are collected one after another with the same list setup.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Scores and comment counts are saved as numbers, so the sheet sorts them without clean-up. Both collections stay in History.

![](visual:ext/results-export-menu)

After export the posts sheet looks like this. Sample data; the titles and names are made up.

| Title | Subreddit | Score | Comments | Posted | Link |
|---|---|---|---|---|---|
| Which lead list tool do you use for local businesses? | r/sales | 142 | 37 | 3 days ago | reddit.com/r/sales/comments/a1 |
| Anyone tried scraping Google Maps for plumbers? | r/smallbusiness | 58 | 21 | 5 days ago | reddit.com/r/smallbusiness/comments/b2 |
| Cold email reply rates in 2026 | r/sales | 310 | 88 | 1 week ago | reddit.com/r/sales/comments/c3 |

## When It Goes Wrong

**The run never ends.** Reddit keeps loading older posts. Click Stop when you have enough, or sort by Top with a time range to shorten the feed.

**The List tab found the sidebar.** Pages also hold "popular communities" and promoted posts. Pick the card whose count matches the posts on screen, or click Choose an item on the page and click one post.

**Comments are missing from a long thread.** Deep replies sit behind "View more comments" and "N more replies" links. Collect what loads, then click those links on the page and click Rescan to collect the rest.

**Reddit asked you to verify or sign in.** Complete the check in the tab, click Rescan, and collect again. Collect in smaller runs afterwards; the extension never signs in for you.

## Conclusion

You collected the posts in a subreddit or search, and the comments on a post, into spreadsheets you can sort by score and comment count. To watch several subreddits or keywords at once, paste their addresses into Bulk scrape; see How To Scrape Data from a List of URLs in One Run. For the same kind of list on YouTube, see How To Scrape YouTube Comments into a Spreadsheet.
