---
title: "How To Save a Web Page as a Word Document with Its Text"
description: "Turn an article, a guide or a documentation page into clean text with its title, author and date, saved as a Word document or copied for an AI tool, in one click. Then do it for a whole reading list at once."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
feature: page-text
sites: []
video: ""
campaign: guide-save-a-pages-text-as-a-document
faq:
  - q: "How do I scrape a website for its text, not a list?"
    a: "Open the page, open the side panel's Properties tab, and click Collect page text. You get the readable text with the title, description, author, date and word count, without menus, ads or comments."
  - q: "What's left out?"
    a: "Navigation menus, ads, cookie banners, sidebars, comments and footers. The main article or body text is kept in reading order."
  - q: "Can I save it as a Word file?"
    a: "Yes. On the results page, Export as offers Microsoft Word for page-text collections, next to Excel, CSV, JSON and Google Sheets. Copy text puts the plain text on your clipboard."
  - q: "Can I collect the text of many pages at once?"
    a: "Yes. Paste the addresses into Bulk scrape → Collect page text; each page becomes a row with its text and details, merged into one table."
  - q: "Does it work behind a paywall or a login?"
    a: "It collects the text the page shows you. If you can read it in your browser, it can be collected; it doesn't sign in or get past a paywall for you."
---

Web Scraper Pro turns an article, a guide or a documentation page into clean text with its title, author and date, saved as a Word document or copied for an AI tool. The Properties tab does it in one click, and Bulk scrape does it for a whole reading list. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A page with an article or body text: a blog post, a help article, a documentation page, a news story.

## Step 1 — Opening the page and the Properties tab

Go to the page in Chrome. Click the Web Scraper Pro icon and open the **Properties** tab. On an article page it shows **Collect details on this page**, the button **Collect page text**, and **Collect contacts**.

![](visual:ext/properties-collect-contacts)

## Step 2 — Collecting the text

Click **Collect page text**. Or, in the **Chat** tab, type:

```
Collect the page text
```

The results page opens in **Document** layout with the text in reading order. Above it sit the page's details:

| Column | What it holds |
|---|---|
| Page title, Description | The page's title and its summary line, as the site set them |
| Author, Publish date | Who wrote it and when, where the page states them |
| Word count | The length of the text |
| Source URL | The page address, so the row traces back |
| Page text | The main text, without menus, ads, banners, sidebars or comments |

![](visual:ext/page-text-document)

Author and date are filled when the page states them in a form the extension recognises; some pages leave them blank.

## Step 3 — Saving it

Click **Export as** and choose **Microsoft Word** for a document, or **Copy text** to put the plain text on your clipboard for an AI tool or a note. **CSV**, **JSON**, **Excel** and **Google Sheets** are there too, with the details as columns. The collection stays in History.

![](visual:ext/results-export-menu)

## Step 4 — A whole reading list at once

For many pages, click the **Bulk scrape** icon at the top of the side panel and choose **Collect page text**. Paste the addresses or upload a CSV or TXT file, click **Continue →**, choose clean text, page details or both for each site, and click **Start collecting →**.

Each page becomes a row with its text and details. **View merged table** puts the whole list in one table, and **Export as** → **Microsoft Word** saves it as one document.

![](visual:ext/bulk-upload)

## When it goes wrong

**The text is cut off.** The page loads more as you scroll. Scroll to the end, wait, and collect again.

**Author and date are empty.** The page doesn't state them in a form the extension recognises. Fill them in on the results page by clicking the cell.

**The document includes a cookie banner or a menu.** Rare, but a site can mark its chrome as content. Delete the lines in Word, or use Copy text and paste into your editor.

## Conclusion

You saved a page's readable text with its title, author and date, as a document or as rows, and you can do the same for a reading list in one run. The text belongs to its publisher: keep it for reading, notes and analysis, and quote from the source. For the lists on a page rather than its text, see How To Scrape Data from Any Website into Excel, No Code to Excel.
