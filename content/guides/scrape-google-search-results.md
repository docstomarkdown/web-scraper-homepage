---
title: "How To Scrape Google Search Results into a Spreadsheet"
description: "Turn a Google search into a spreadsheet with the title, link and snippet of each result across a few pages, with no code. One keyword or a list."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-google-search-results
# Facts checked against chrome-extension-source on 2026-11-10: Google Search has no setup (no file in configs-prod), so lists are found by the generic list search and columns are named from the page: configs-prod/, lib/content/scanForListsCore.ts
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page", "Rescan page", "How much to collect", "Collect more pages", "Next page", "Next button ready", "Change", "Stop after" 5/10/20/All pages/Custom (default 5), "Collect from N pages": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: Bulk scrape menu items "Bulk scrape", "Collect contacts", "Collect page text"; steps "Continue", "Review sites", "Continue to site configuration", "Start collecting": entrypoints/sidepanel/main.tsx, entrypoints/bulk/main.tsx
# Facts checked against chrome-extension-source on 2026-11-10: Bulk list mode collects every list it detects on each page unless you choose "Custom area" (used on every URL for the site); without "Add pagination" it "stops after the first page"; with pagination it runs until the end: entrypoints/bulk/main.tsx, lib/content/bulkListExtraction.ts (untilEnd: true)
# Facts checked against chrome-extension-source on 2026-11-10: "View merged table" appears only when a bulk run covers more than one site, so many Google searches stay one site's table: entrypoints/bulk/main.tsx (canMergeSites)
# Facts checked against chrome-extension-source on 2026-11-10: Export as Google Sheets, Microsoft Excel, CSV, JSON; History keeps each collection: lib/tools/helpTopics.json
faq:
  - q: "How do I export Google search results to Excel?"
    a: "Run the search in Chrome, open the Web Scraper Pro side panel's List tab, pick the results list, choose Collect more pages, set Stop after, and click Collect. Then click Export as and choose Microsoft Excel."
  - q: "How do I get the position of each result?"
    a: "Rows come out in the order the page shows the results, so the row number within each search is the position. Add a column in your sheet that numbers the rows."
  - q: "Can I collect results for a list of keywords?"
    a: "Yes. Build one search address per keyword, paste them into Bulk scrape, choose the results area once with Custom area, and each search is collected in turn."
  - q: "How many pages can I collect?"
    a: "Set it under Stop after. Google may show a verification page when many result pages load quickly, so keep runs short and come back later for more."
  - q: "Does it include ads and the People also ask box?"
    a: "The run collects the list you pick. Ads and other boxes on the page can show as separate lists; pick the plain results, or collect a box on its own if you want it."
  - q: "Is scraping Google search results allowed?"
    a: "Google's terms restrict automated access to its search. You collect the page you can see, in your own browser, a few pages at a time, for your own research. Read our plain-words explainer on web scraping and the law first; it isn't legal advice."
  - q: "Will Google block me or ban my account?"
    a: "Google may slow down or show a verification page after many result pages in a row. Keep runs short, wait between runs, and complete the check in the tab if one appears."
---

Web Scraper Pro turns a Google search into a spreadsheet with the title, link and snippet of each result, in the order Google shows them. You pick the results list, set a few pages, and click once. For a list of keywords, Bulk scrape runs each search in turn.

## Does Google Allow Scraping Its Results?

Google's terms restrict automated access to its search, and it may show a verification page when many result pages load quickly. This guide reads the page you can see, in your own browser, a few pages at a time, for your own research.

Keep runs small and read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- The keyword, or list of keywords, you want results for.

## What You Get

Google Search has no ready-made setup in the extension, so the columns are named from the page. A result usually shows these details, and each one becomes a column. Sample data: the result is made up.

| Detail | Example |
|---|---|
| Title | Sample Plumbing Co. in Springfield |
| Link | https://sampleplumbing.example |
| Site | sampleplumbing.example |
| Snippet | Repairs and installs in Springfield. Call (555) 010-2231… |

The row order is the position. Column names can differ between result layouts; check them on a first page and rename them on the results page.

## Step 1 — Running the Search

In this step you get the results onto the page and find their list. In Chrome, search Google for your keyword. Set the country, language and time range in Google's own tools first; the extension collects what the page shows.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with how many items are on this page. Hover a card and the list it means is outlined on the page.

![](visual:ext/list-tab-detected)

Pick the card whose count matches the plain results you can see. Ads, question boxes and video strips can show as other cards. If no card is the results, click **Choose an item on the page** and click one result; similar results are picked with it.

## Step 2 — Collecting a Few Pages

Under **How much to collect**, choose **Collect more pages**. If the panel finds Google's next-page link, it shows **Next button ready**. If it asks instead, choose **Next page**; if it picked the wrong link, click **Change** and click Google's next-page link yourself.

![](visual:ext/list-tab-pagination-choice)

Under **Stop after**, keep **5 pages**, or choose **Custom** and type a smaller number. A short run is less likely to meet Google's verification page.

![](visual:ext/list-tab-more-pages)

Click **Collect from N pages**, where N is the number you set. The run moves through the pages; next, you check the table it produces.

## Step 3 — Reviewing the Table

The results page opens with one row per result, in page order. Hover a column header to rename it with the pencil or remove it with the trash icon. Or, with the results tab in front, type in the side panel's chat:

```
Only title, link and snippet
```

![](visual:ext/results-arranged)

Add a position column in your sheet afterwards by numbering the rows; the order is the order Google showed them.

## Step 4 — Collecting a List of Keywords

For several keywords, build one search address per keyword. Use this address, replacing `your_keyword` with each phrase and using `+` for spaces:

```
https://www.google.com/search?q=your_keyword
```

Click the **Bulk scrape** icon at the top of the side panel and choose **Bulk scrape**. Paste the list on the **Upload** step and click **Continue**. On **Review sites**, every search shows under one site, google.com; click **Continue to site configuration**.

Under **Source list**, the default collects every list the extension finds on each page, which on Google can include ads and question boxes. Choose **Custom area** and click the results on the page shown, so only that area is collected on every search.

Leave pagination off: without **Add pagination**, each search stops after its first page, which keeps the run short. Click **Start collecting**, and each search is collected in turn. Give Google breaks between batches of keywords rather than hundreds at once.

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The collection stays in History, so next month's run can be compared with this one by link.

![](visual:ext/results-export-menu)

After export the sheet looks like this, with your own column names. Sample data: the titles and links are made up.

| Title | Link | Site | Snippet |
|---|---|---|---|
| Best plumbers in Springfield, rated | https://directory.example/plumbers | directory.example | Compare plumbers by rating, price and… |
| Springfield plumbing: emergency and repairs | https://sampleplumbing.example | sampleplumbing.example | Open 24 hours. Call (555) 010-2231… |
| Plumbers near me | https://listings.example/springfield | listings.example | Find a licensed plumber in Springfield… |

## When It Goes Wrong

**Google showed a verification page.** Complete the check in the tab, click **Rescan page** at the top of the List tab, and collect again from the page you're on. Afterwards collect fewer pages per keyword and leave time between runs.

**The List tab found the ads or a video box.** Pick the card whose count matches the plain results, or click **Choose an item on the page** and click one plain result.

**The Next button wasn't found.** Click **Change** and click Google's own next-page link, or the next page number, at the bottom of the page.

**The columns have odd names.** They come from Google's page. Hover a header and click the pencil to rename it; the export uses your names.

## Conclusion

You collected a Google search into a spreadsheet with the title, link and snippet of each result, and the same for a list of keywords. For the sites in your link column, [How To Get Emails from Google Search Results](/guides/get-emails-from-google-search-results) reads each one for its emails, phones and social links. For what people type into Google in the first place, use Google's own autocomplete and Trends; the extension collects pages, not search volumes.
