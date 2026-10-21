---
title: "How To Scrape Google Search Results into a Spreadsheet"
description: "Turn a Google search into a spreadsheet with the position, title, link and snippet of each result across a few pages, with no code. One keyword or a list."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-google-search-results
faq:
  - q: "How do I export Google search results to Excel?"
    a: "Run the search in Chrome, open the Web Scraper Pro side panel's List tab, pick the results list, choose Collect more pages, set Stop after, and click Collect. Then click Export as and choose Microsoft Excel."
  - q: "How do I get the position of each result?"
    a: "Rows come out in page order, so the row number is the position. Add a column in your sheet with the row numbers, or sort by the Source URL column when you collected several keywords."
  - q: "Can I collect results for a list of keywords?"
    a: "Yes. Build one search address per keyword, paste them into Bulk scrape, and each search is collected in turn. View merged table puts them together with a Source URL column that tells you which keyword each row came from."
  - q: "How many pages can I collect?"
    a: "A few per run. Google shows a verification page when it sees many pages loaded quickly, so collect 3 to 5 pages per keyword and come back later for more."
  - q: "Does it include ads and the People also ask box?"
    a: "The run collects the list you pick. Ads and other boxes are separate lists on the page; pick the organic results card, or collect a box on its own if you want it."
  - q: "Is scraping Google search results allowed?"
    a: "Google's terms restrict automated access to its search. You collect the page you can see, in your own browser, a few pages at a time, for your own research. Read our plain-words explainer on web scraping and the law first; it isn't legal advice."
---

<!--
Draft until a real run on 1.3.0 confirms: (1) the List tab detects the organic results on google.com as one
list, separate from ads, "People also ask" and video carousels; (2) the page moves on by Next page (the
"Next" link or numbered pages at the bottom); (3) the page-given column names (title, link, snippet, site);
(4) after how many pages Google shows its verification. No pack exists for Google Search; everything below
uses the generic List tab flow from content/features/list-scraper.ts. Replace the sample table after the
run. Title targets "scrape google search results" (74 views/mo; SERP 189/mo), 2026-10-21.
-->

Web Scraper Pro turns a Google search into a spreadsheet with the position, title, link and snippet of each result. You pick the results list, set a few pages, and click once; for a list of keywords, Bulk scrape runs each search in turn. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- The keyword, or list of keywords, you want results for.

## Does Google Allow Scraping Its Results?

Google's terms restrict automated access to its search, and it shows a verification page when it sees many result pages loaded quickly. This guide reads the page you can see, in your own browser, a few pages at a time, for your own research.

Keep runs small and read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

Google has no ready-made setup in the extension, so the columns are named from the page:

| Column | Example |
|---|---|
| Title | How to scrape Google Maps for business leads |
| Link | https://www.webscraper.pro/maps-leads |
| Site | webscraper.pro |
| Snippet | Search Google Maps for a type of business in a city. Click once… |

The row number is the position. Column names differ a little between result layouts; rename them on the results page.

## Step 1 — Running the Search

In Chrome, search Google for your keyword. Set the country, language and time range in Google's own tools first; the extension collects what the page shows, so those settings decide the results.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with how many items are on this page. The organic results are the card whose count matches the results you can see, usually 10.

![](visual:ext/list-tab-detected)

Ads, the People also ask box and video carousels are separate lists. Hover a card and the list it means is outlined on the page, so you can tell them apart. If no card is the results, click **Choose an item on the page** and click one result.

## Step 2 — Collecting a Few Pages

Choose **Collect more pages**. Google moves on by a **Next** link at the bottom, so the panel shows **Next button ready**. If it asks instead, choose **Next page**; if it picked the wrong link, click **Change** and click Google's Next link yourself.

![](visual:ext/list-tab-pagination-choice)

Under **Stop after**, pick **5 pages** or type a smaller number under **Custom**. Three to five pages is the sensible run: that is the first 30 to 50 results, and it stays under the point where Google asks you to verify.

![](visual:ext/list-tab-more-pages)

Click **Collect from 5 pages**. Keep the tab in front; the tab's title counts the results as they come in.

## Step 3 — Reviewing the Table

The results page opens with one row per result, in page order, with the total in a chip at the top. Hover a column header to rename it with the pencil or remove it with the trash icon. Or, with the results tab in front, type in the side panel's chat:

```
Only title, link and snippet
```

![](visual:ext/results-arranged)

Add a position column in your sheet afterwards by numbering the rows; the order is the order Google showed them.

## Step 4 — Collecting a List of Keywords

For several keywords, build one search address per keyword, such as `https://www.google.com/search?q=your_keyword`, replacing `your_keyword` with each phrase and `+` for spaces. Paste the list into **Bulk scrape**, choose **Bulk scrape**, and click **Continue →**; Google shows as one site, and the list setup you confirm applies to every search.

Set the page limit for the site to 3 and click **Start collecting →**. Each search is collected in turn, and **View merged table** puts them together with a **Source URL** column, which tells you the keyword behind each row. Give the run breaks between batches of keywords rather than hundreds at once.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The collection stays in History, so next month's run can be compared with this one by link.

![](visual:ext/results-export-menu)

After export the sheet looks like this. Sample data; the titles and links are made up.

| Title | Link | Site | Snippet |
|---|---|---|---|
| Best plumbers in Springfield, rated | https://example.com/plumbers | example.com | Compare 24 plumbers by rating, price and… |
| Springfield plumbing: emergency and repairs | https://sampleplumbing.example.com | sampleplumbing.example.com | Open 24 hours. Call (555) 010-2231… |
| Plumbers near me | https://directory.example.com/springfield | directory.example.com | Find a licensed plumber in Springfield… |

## When It Goes Wrong

**Google showed a verification page.** Complete the check in the tab, click **Rescan**, and collect again from the page you are on. Afterwards collect fewer pages per keyword and leave time between runs.

**The List tab found the ads or a video box.** Pick the card whose count matches the organic results, or click Choose an item on the page and click one plain result.

**The Next button wasn't found.** Click Change and click Google's own Next link, or the next page number, at the bottom of the page.

**The columns have odd names.** They come from Google's page labels. Hover a header and click the pencil to rename it; the export uses your names.

## Conclusion

You collected a Google search into a spreadsheet with the position, title, link and snippet of each result, and the same for a list of keywords in one run. For the sites in your Link column, How To Scrape Emails from a Website into Excel shows how to get their contact details. For what people type into Google in the first place, use Google's own autocomplete and Trends; the extension collects pages, not search volumes.
