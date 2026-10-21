---
title: "How To Scrape YouTube Comments into a Spreadsheet"
description: "Collect every comment under a YouTube video into Excel, with the author, text, likes and date, as far as the page scrolls, with no code and no API key."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: [youtube]
video: ""
campaign: guide-scrape-youtube-comments
faq:
  - q: "How do I scrape YouTube comments without the API?"
    a: "Open the video in Chrome, scroll to the comments, open the Web Scraper Pro side panel's List tab, pick the comments list, choose Collect more pages with Auto scroll, and click Collect to end. No API key, no quota, no account."
  - q: "Which columns do I get?"
    a: "Comments aren't part of the YouTube setup, so the columns come from the page: author, comment text, likes and date. Check them on a small run first and rename any column on the results page."
  - q: "Does it collect replies?"
    a: "Replies load when you click the Replies link under a comment. Open the ones you want on the page, click Rescan, and collect; they become rows beside the comments."
  - q: "Can I collect the comments of many videos at once?"
    a: "Yes. Paste the video addresses into Bulk scrape and each video is collected in turn with the same list setup."
  - q: "Can I get the commenters' emails?"
    a: "No. YouTube doesn't show emails, and the extension never reads a channel's About page behind its verification."
  - q: "Is scraping YouTube comments allowed?"
    a: "YouTube's terms restrict automated collection. You collect public comments in your own browser, at a person's pace, for your own research. Read our plain-words explainer on web scraping and the law first; it isn't legal advice."
  - q: "Will YouTube ban my channel or account?"
    a: "The extension reads the comments on a public video in your own browser and never posts, signs in or touches your channel. YouTube may load comments more slowly after a long scroll; click Stop and keep what you have. Keep it to your own research."
---

<!--
Draft until a real run on 1.3.0 confirms: (1) the comment list on a watch page is detected by the List tab
once the comments have loaded (the YouTube pack covers video lists only; comments are a generic list and must
never be described as named columns, per content/scrapers/youtube.ts); (2) Auto scroll is detected on the
comment section; (3) the page-given column names (author, text, likes, date); (4) whether replies that were
expanded on the page come through as rows. Replace the sample table after the run. Title targets the YouTube
comments cluster ("youtube comments scraper", 189 views/mo; "how to scrape emails from youtube" 516/mo is the
neighbouring phrase and is answered "no" in the FAQ), 2026-10-21.
-->

Web Scraper Pro turns the comments under a YouTube video into a spreadsheet, with the author, text, likes and date in their own columns. You scroll to the comments, pick the list, and let the run scroll to the end; there is no API key and no quota. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- The YouTube video whose comments you want, open in Chrome.

## Does YouTube Allow Scraping?

YouTube's terms restrict automated collection, and its Data API is the route it offers developers, with a daily quota. This guide reads the public page you have open, in your own browser, at the pace a person scrolls, for your own research.

Keep it to public videos, don't republish people's comments, and read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

The YouTube setup in the extension covers video lists, not comments. Comments are detected like any other list, so the columns are named from the page:

| Column | Example |
|---|---|
| Author | @sample_viewer |
| Comment | The step at 4:10 fixed it for me, thanks. |
| Likes | 23 |
| Posted | 2 weeks ago |

Check the columns on a small run before a long one, and rename any of them on the results page.

## Step 1 — Opening the Video and Loading the Comments

In Chrome, open the video and scroll down until the comments appear; YouTube loads them only when they come into view. Under the comment count, open the **Sort by** menu and choose **Newest first** if you want the latest reactions rather than the most liked.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. If you opened the panel before the comments loaded, click **Rescan**. Under **Choose from lists we found**, the comments show as a card whose count matches the comments you can see, usually 20.

![](visual:ext/list-tab-detected)

If a different list shows first, such as the recommended videos on the right, pick the comments card, or click **Choose an item on the page** and click one comment. You have picked the list; next you let it scroll.

## Step 2 — Letting the Comments Scroll

Choose **Collect more pages**. YouTube loads more comments as you scroll, so the panel shows **Auto scroll detected**. Click **Collect to end**.

![](visual:ext/list-tab-more-pages)

The run scrolls the page and adds comments as they load. A video with thousands of comments takes a while; click **Stop** at any time to keep what it has. Keep the tab in front, because paging slows down in a background tab.

## Step 3 — Adding Replies

Replies sit folded under each comment behind a **Replies** link, and the run collects only what the page shows. Open the reply threads you want by clicking those links on the page, then click **Rescan** in the List tab and collect again. The replies come through as rows in the order they appear.

For most research, top-level comments are enough. Skip this step unless the replies are the point.

## Step 4 — Reviewing the Table

The results page opens with one row per comment and the total in a chip at the top. Hover a column header to rename it with the pencil or remove it with the trash icon. Click **Filter rows** to keep comments with more than 10 likes, or type in the side panel's chat with the results tab in front:

```
Only author, comment and likes, sorted by likes
```

![](visual:ext/results-arranged)

Search the Comment column in your sheet afterwards for the words you care about: a product name, "price", "doesn't work". That is where the themes are.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Likes are saved as numbers. The collection stays in History.

![](visual:ext/results-export-menu)

After export the sheet looks like this. Sample data; the names and comments are made up.

| Author | Comment | Likes | Posted |
|---|---|---|---|
| @sample_viewer | The step at 4:10 fixed it for me, thanks. | 23 | 2 weeks ago |
| @another_viewer | Does this work on the free plan? | 8 | 2 weeks ago |
| @third_viewer | Audio is too quiet in the second half. | 41 | 3 weeks ago |

For the comments on many videos, paste the video addresses into **Bulk scrape**; each video is collected in turn with the same list setup, and **View merged table** puts them in one table with a Source URL column.

## When It Goes Wrong

**The run never ends.** A busy video keeps loading comments. Click Stop when you have enough; the rows so far are kept.

**The List tab doesn't show the comments.** They load only after you scroll to them. Scroll down until they appear, then click Rescan.

**Replies are missing.** They stay folded until you open them on the page. Click the Replies links you want, click Rescan, and collect again.

**Comments are turned off on the video.** There is nothing to collect. The video list on the channel still works; see How To Export YouTube Search Results to Excel.

## Conclusion

You collected the comments under a video into a spreadsheet you can sort by likes and search by word. For the videos themselves, with views, dates and durations, see the YouTube site page, which has a ready-made setup. For the same kind of thread on Reddit, see How To Scrape Reddit Posts and Comments into a Spreadsheet.
