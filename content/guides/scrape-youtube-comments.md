---
title: "How To Scrape YouTube Comments into a Spreadsheet"
description: "Collect the comments under a YouTube video into Excel, with each comment in its own row, as far as the page scrolls, with no code and no API key."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: [youtube]
video: ""
campaign: guide-scrape-youtube-comments
# Facts checked against chrome-extension-source on 2026-11-10: the YouTube setup covers video lists on search results and the home feed (videos, playlists, Shorts), not comments: configs-prod/youtube.com.json, configs-prod/site-column-mappings/youtube.com.json, lib/platform/hooks/youtube.ts
# Facts checked against chrome-extension-source on 2026-11-10: when a setup's list selectors find a list on the page, the generic list search is skipped, so other lists (such as comments) may not get a card; the item picker still works: lib/content/scanForListsCore.ts (skipGenericStrategies)
# Facts checked against chrome-extension-source on 2026-11-10: the YouTube setup's paging mode is autoScroll: configs-prod/youtube.com.json
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page" (similar items picked with it), "Rescan page", "Collect more pages", Auto scroll, "Auto scroll detected", "Collect to end": components/scraper/ListTab.tsx, lib/tools/helpTopics.json
# Facts checked against chrome-extension-source on 2026-11-10: "Filter rows" on the results page; Export as Google Sheets, Microsoft Excel, CSV, JSON: lib/tools/helpTopics.json
faq:
  - q: "How do I scrape YouTube comments without the API?"
    a: "Open the video in Chrome, scroll to the comments, open the Web Scraper Pro side panel's List tab, and pick the comments: from the list cards, or with Choose an item on the page. Choose Collect more pages with Auto scroll and click Collect to end. No API key and no account."
  - q: "Which columns do I get?"
    a: "Comments aren't part of the extension's YouTube setup, so the columns are named from the page. Check them on a short first run and rename any column on the results page."
  - q: "Does it collect replies?"
    a: "It collects what the page shows. Replies stay folded until you open them on the page, so open the threads you want first, then collect. Check on a short run how they come through."
  - q: "Can I get the commenters' emails?"
    a: "No. YouTube doesn't show commenters' emails, and the extension collects only what the page shows."
  - q: "Is scraping YouTube comments allowed?"
    a: "YouTube's terms restrict automated collection. You collect public comments in your own browser, at a person's pace, for your own research. Read our plain-words explainer on web scraping and the law first; it isn't legal advice."
  - q: "Will YouTube ban my channel or account?"
    a: "The extension reads the comments on a public video in your own browser and never posts or touches your channel. If comments start loading slowly after a long scroll, click Stop and keep what you have. Keep it to your own research."
---

Web Scraper Pro turns the comments under a YouTube video into a spreadsheet, one row per comment. You scroll to the comments, pick them in the side panel, and let the run scroll to the end. There is no API key and no quota, because the extension reads the page you have open.

## Does YouTube Allow Scraping?

YouTube's terms restrict automated collection, and its Data API is the route it offers developers, with a daily quota. This guide reads the public page you have open, in your own browser, at the pace a person scrolls, for your own research.

Keep it to public videos, don't republish people's comments, and read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- The YouTube video whose comments you want, open in Chrome.

## What You Get

The extension's YouTube setup covers lists of videos, such as search results, not comments. Comments are collected like a list on any site, so the columns are named from the page.

A comment usually shows these details, and each one the page shows becomes a column. Sample data: the names and text are made up.

| Detail | Example |
|---|---|
| Author | @sample_viewer |
| Comment | The step at 4:10 fixed it for me, thanks. |
| Likes | 23 |
| Posted | 2 weeks ago |

Check the columns on a short run before a long one, and rename any of them on the results page.

## Step 1 — Opening the Video and Loading the Comments

In this step you get the comments onto the page. In Chrome, open the video and scroll down until the comments appear; YouTube loads them only when they come into view.

If you want the latest reactions rather than the top ones, change the comments' sort order to newest first using YouTube's sort menu above them. The extension collects in the order the page shows.

The comments are on the page. Next, you pick them in the side panel.

## Step 2 — Picking the Comments

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. If you opened the panel before the comments loaded, click **Rescan page** at the top of the List tab.

Under **Choose from lists we found**, look for a card whose count matches the comments you can see. Hover a card and its list is outlined on the page.

![](visual:ext/list-tab-detected)

The cards may show only the recommended videos, because the YouTube setup looks for video lists first. In that case, click **Choose an item on the page** and click one comment; similar comments are picked with it. You have picked the list; next you let it scroll.

## Step 3 — Letting the Comments Scroll

Under **How much to collect**, choose **Collect more pages**. YouTube loads more comments as you scroll, so choose **Auto scroll** if the panel doesn't show **Auto scroll detected** already. Click **Collect to end**.

![](visual:ext/list-tab-more-pages)

The run scrolls the page and adds comments as they load. A video with thousands of comments takes a while; click **Stop** at any time to keep what it has.

## Step 4 — Reviewing the Table

The results page opens with one row per comment. Check the column names first, because they come from the page.

Hover a column header to rename it with the pencil or remove it with the trash icon. Click **Filter rows** to keep the comments that mention a word you care about, or type in the side panel's chat with the results tab in front:

```
Only author, comment and likes, sorted by likes
```

![](visual:ext/results-arranged)

Search the comment column in your sheet afterwards for the words you care about: a product name, "price", "doesn't work". That is where the themes are.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The collection stays in History.

![](visual:ext/results-export-menu)

After export the sheet looks like this, with your own column names. Sample data: the names and comments are made up.

| Author | Comment | Likes | Posted |
|---|---|---|---|
| @sample_viewer | The step at 4:10 fixed it for me, thanks. | 23 | 2 weeks ago |
| @another_viewer | Is there a written version of this? | 8 | 2 weeks ago |
| @third_viewer | Audio is too quiet in the second half. | 41 | 3 weeks ago |

## When It Goes Wrong

**The run never ends.** A busy video keeps loading comments. Click **Stop** when you have enough; the rows so far are kept.

**The List tab doesn't show the comments.** They load only after you scroll to them, and the cards may show the recommended videos first. Scroll until the comments appear, click **Rescan page**, or click **Choose an item on the page** and click one comment.

**Replies are missing.** They stay folded until you open them on the page. Open the threads you want, click **Rescan page**, and collect again.

**Comments are turned off on the video.** There is nothing to collect. The video lists on YouTube still work; see the [YouTube scraper page](/scrapers/youtube).

## Conclusion

You collected the comments under a video into a spreadsheet you can sort and search by word. For the videos themselves, with views, dates and durations in named columns, see the [YouTube scraper page](/scrapers/youtube), which has a ready-made setup. For the same kind of thread on Reddit, see How To Scrape Reddit Posts and Comments into a Spreadsheet.
