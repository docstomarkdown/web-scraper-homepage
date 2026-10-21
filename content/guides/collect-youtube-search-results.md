---
title: "How To Collect YouTube Search Results to a Spreadsheet with Web Scraper Pro"
description: "Turn a YouTube search or a channel's Videos tab into a spreadsheet with title, channel, views, published date, duration and link, as far down as the page scrolls, with no code. Sort a whole topic by views."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
feature: list-scraper
sites: [youtube]
video: ""
campaign: guide-collect-youtube-search-results
faq:
  - q: "How do I scrape YouTube channel data without code?"
    a: "Open the channel's Videos tab, open the side panel's List tab, pick the list, choose Collect more pages, and let it scroll. Every public video arrives as a row with views, date and duration."
  - q: "Can I get the comments too?"
    a: "Not with the ready-made setup. A video's comment list is detected like any list, without named columns; try a small run first and check the columns."
  - q: "Can I get the channel's email?"
    a: "No. YouTube puts business emails behind a verification on the About page, and the extension never completes one for you. Many channels link their own website; collect contacts there instead."
  - q: "Why are the view counts rounded?"
    a: "They're what the card shows, such as 48K; the extension saves them as numbers. A video's own page shows the exact count, one video at a time through the Properties tab."
  - q: "Is collecting YouTube data allowed?"
    a: "YouTube's terms restrict automated collection. Collect what you need for your own research, keep it to public listings, and read the terms before reusing anything."
---

Turn a YouTube search or a channel's Videos tab into a spreadsheet with title, channel, views, published date, duration and link. YouTube has a ready-made setup in Web Scraper Pro, so the columns come out named, and the run scrolls the page for you because YouTube loads results as you scroll. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A YouTube search with its filters set, or a channel's Videos or Shorts tab.

## Step 1 — Running the search

Search for the topic and use YouTube's filters: upload date, type (video, channel, playlist), duration, sort order. The extension collects what the page shows, so the filters do the narrowing. For one channel, open the channel and its **Videos** tab.

## Step 2 — Picking the list

Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, the videos show as **List 1** with the number of cards on this page. Hover the card and the results are outlined on the page.

A search page also holds a row of Shorts and sometimes a channel card; if the first card isn't the main results, pick the card whose count matches, or click **Choose an item on the page** and click one video.

## Step 3 — Letting it scroll

Choose **Collect more pages**. YouTube has no Next button; it loads more as you scroll, so the panel shows **Auto scroll detected**. Click **Collect to end**. The run scrolls the page and collects until nothing new loads; click Stop at any time to keep what it has. A channel with thousands of videos takes a while.

![](visual:ext/list-tab-more-pages)

## Step 4 — Reading the results

The results page opens with one row per video. The columns come from the YouTube setup:

| Column | What it holds |
|---|---|
| Title, URL, Video ID | The video, its link and id |
| Channel, Channel URL, Verified Channel | Who published it, with the channel link and the verified mark |
| Views | The count the card shows, saved as a number |
| Published, Duration | The relative date and the length |
| Type, Badges | Video, Short, live or playlist, and labels such as New |
| Description, Chapters | The card's snippet and chapters where listed |
| Thumbnail URL | The thumbnail image |

![](visual:ext/results-youtube)

Search results mix videos, Shorts and playlists; filter the Type column to the kind you want.

## Step 5 — Sorting and trimming

Click the **Views** header to sort by views, or **Published** for the newest. Hover a header to remove columns you don't need with the trash icon. Or, with the results tab in front, type in the side panel's chat:

```
Only title, channel, views and url, sorted by views
```

## Step 6 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Views are numbers, so the sheet sorts and sums them without clean-up.

![](visual:ext/results-export-menu)

## When it goes wrong

**The run never ends.** Busy searches load results for a long time. Click Stop when you have enough; the rows so far are kept.

**View counts look wrong.** They're the rounded counts the card shows, such as 48K, saved as numbers. A video's own page shows the exact count.

**Shorts and playlists are mixed in.** Filter the Type column on the results page to keep videos only, or use YouTube's own Type filter before collecting.

## Conclusion

You collected a YouTube search or a channel's videos into a spreadsheet you can sort by views and date. To compare several topics, run a search per topic and ask chat to combine the conversation's lists into one table, or export each from History. For the channels' websites and contact details, collect from their own sites; see the research use case for the full workflow.
