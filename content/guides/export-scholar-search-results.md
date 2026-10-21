---
title: "How To Export Scholar Search Results with Web Scraper Pro"
description: "Turn a Scholar search into a citation spreadsheet with title, authors, publication, year, citation count and full-text link, across as many pages as you choose, with no code."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: [scholar]
video: ""
campaign: guide-export-scholar-search-results
faq:
  - q: "How do I export Scholar search results to Excel?"
    a: "Run the search, open the side panel's List tab, choose how many pages, and click Collect. Then Export as Microsoft Excel on the results page. The columns are named by the Scholar setup."
  - q: "Can I get the citation counts in the sheet?"
    a: "Yes. Cited By is a number column, so you can sort by it, and Cited By URL links to the citing papers."
  - q: "What happens when Scholar asks for a verification?"
    a: "The run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again from where you are. The extension never bypasses the check."
  - q: "Can I get the abstracts?"
    a: "No. The results page shows a snippet, not the abstract. Follow the Result URL or the Document URL for the full paper."
  - q: "Can I import the file into Zotero or Mendeley?"
    a: "Export as CSV and use your manager's CSV import, mapping Title, Authors, Publication and Year. For a BibTeX file, use Scholar's own export per paper."
---

Turn a Scholar search into a citation spreadsheet with title, authors, publication, year, citation count and full-text link, across as many pages as you choose. Scholar has a ready-made setup in Web Scraper Pro, so the panel recognises the page and offers the page limit up front. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A Scholar search with your filters set: year range, sort order, with or without citations and patents.

## Step 1 — Running the search on Scholar

Search for your topic and set the filters you'd use anyway, such as a year range. The extension collects the results as the page shows them, so the filters do the narrowing. Each Scholar page holds ten results.

## Step 2 — Choosing how many pages

Click the Web Scraper Pro icon and open the **List** tab. Scholar is recognised, and the panel reads **Collect this page, choose a page limit, or continue through every available Scholar page.** Under **Scholar pages to extract**, keep the default of 10, type a number, or choose every page. Click Collect.

![](visual:ext/list-tab-scholar)

Keep the tab in front. The extension moves through the pages with a pause between them, so 10 pages take under a minute.

## Step 3 — If Scholar asks for a verification

Loading many pages can make Scholar show a verification page. The panel says **Google Scholar is showing a verification or unusual-traffic page** and stops; what it has collected is kept. Complete the check in the tab, click **Rescan**, and collect again. The extension never bypasses the check.

## Step 4 — Reading the results

The results page opens with one row per result. The columns come from the Scholar setup:

| Column | What it holds |
|---|---|
| Rank, Title, Result URL | The result's position, title and the link Scholar points to |
| Authors, Author Profile URLs | The author line as Scholar shows it, and profile links where offered |
| Publication, Year, Publisher / Source | The venue, the year and the source site |
| Cited By, Cited By URL | The citation count as a number, and the citing papers |
| Versions, Versions URL, Related Articles URL | Scholar's other versions and related articles |
| Document URL, Document Type, Document Host Name | The full-text link, PDF or HTML, and its host |
| Result Type | Article, citation, book and the other kinds Scholar labels |

![](visual:ext/results-scholar)

## Step 5 — Sorting and trimming

Click the **Cited By** header to sort by citations, or **Year** for the newest. Hover a header to remove columns you don't need, such as the URL columns, with the trash icon. Or, with the results tab in front, type in the side panel's chat:

```
Only title, authors, year and cited by, sorted by cited by
```

## Step 6 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Cited By and Year are saved as numbers, so the sheet sorts them without clean-up.

![](visual:ext/results-export-menu)

## Conclusion

You exported a Scholar search into a citation spreadsheet with counts you can sort by and links to every full text. For the readable text of the papers' web pages, open each one and use Collect page text; see the research use case for the whole workflow from search to dataset.
