---
title: "How To Scrape Yelp Business Listings into Excel"
description: "Turn a Yelp search into a spreadsheet of businesses with rating, review count, phone and address across every page, then add their emails in a second run."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-yelp-business-listings
faq:
  - q: "Is there a free Yelp scraper?"
    a: "Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create. Open a Yelp search in Chrome, pick the list in the side panel, and collect every page of results."
  - q: "Does Yelp allow scraping?"
    a: "Yelp's terms restrict automated collection, and the extension collects only what the page shows you, at a person's pace. Collect for your own research or prospecting, keep it to public listings, and read the terms before reusing anything. See our plain-words explainer on web scraping and the law."
  - q: "How many Yelp results can I collect from one search?"
    a: "Yelp stops showing results after about 24 pages, so one search gives you roughly 240 businesses at most. Search a narrower category or a smaller area and run each search in turn to get past the cap."
  - q: "Can I get emails for the businesses on Yelp?"
    a: "Yelp doesn't show email addresses. After the first run, start Bulk scrape → Collect contacts with Use saved data, and each business's own website is read for emails, phone numbers and social links."
  - q: "Can I scrape Yelp reviews with this?"
    a: "This guide collects the search results, one row per business. Reviews live on each business's own page; open one and the List tab detects the review list, so try a small run there first and check the columns."
  - q: "Which columns do I get from Yelp?"
    a: "Yelp has no ready-made setup yet, so the columns are named from what the results cards show: business name, rating, review count, category, neighborhood or address, phone and the link. A column the card doesn't show stays out."
---

<!-- Draft from the competitor-corpus candidates (2026-10-21). Yelp has no verified run on 1.3.0. A verified run must confirm:
     the lists the List tab detects on a Yelp search page and which card is the results; the column names it produces
     (name, rating, review count, category, address or neighborhood, phone, link); whether Yelp uses a Next link (expected)
     and the ~24-page cap; whether the Website column exists in the list rows (Yelp usually shows the website only on the
     business page) so that Collect contacts → Use saved data works from the list, or needs the business pages first;
     whether sponsored rows are marked. Update the sample table and the capture ids from that run. -->

Search Yelp for a category in a city, and Web Scraper Pro collects every page of results into one spreadsheet: business name, rating, review count, category, address, phone and link. A second run adds the emails from each business's own website, so the sheet is ready for prospecting or market research. This guide shows each step on version 1.3.0.

## Does Yelp Allow Scraping?

Yelp's terms restrict automated collection, and the extension collects only what the page shows you, in your own browser, at a person's pace. Collect for your own research or prospecting, keep it to public business listings, and read [Is web scraping legal?](/web-scraping-legal) before reusing anything; it isn't legal advice.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- A Yelp search with the filters you want set: category, city or neighborhood, open now, price.

## What You Get

Yelp has no ready-made setup yet, so the columns are named from what the results cards show. A column the card doesn't show stays out, and nothing is guessed.

| Column | Example |
|---|---|
| Business Name | Sample Plumbing Co. |
| Rating | 4.5 |
| Review Count | 212 |
| Category | Plumbing, Water Heater Installation |
| Neighborhood or Address | Downtown |
| Phone | (555) 010-2231 |
| Link | yelp.com/biz/sample-plumbing-co |
| Emails (second run) | hello@example.com |

## Step 1 — Running the Search on Yelp

In this step you set up the search, because the extension collects what the page shows. Go to yelp.com, search for a category in a city, such as plumbers in Springfield, and apply the filters you want.

Narrow the search now rather than later. Yelp stops showing results after about 24 pages, so a broad category in a big city won't give you every business; a narrower category or a smaller area will. With the results on screen, you're ready to pick the list.

## Step 2 — Picking the List in the Side Panel

Here you tell the extension which list on the page to collect. Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, the results show as **List 1** with the number of businesses on this page.

![](visual:ext/list-tab-detected)

Hover the card and the results are outlined on the page. Yelp pages also hold a row of sponsored results and a list of related categories, so if the first card isn't the results, pick the card whose count matches.

Or click **Choose an item on the page** and click one business; every similar one is picked with it. The list is chosen, so next you say how far to go.

## Step 3 — Collecting Every Page

This step follows the results across pages. Choose **Collect more pages**; Yelp moves on with a Next link, so the panel shows **Next button ready**.

Under **Stop after**, pick how many pages, or **All pages** for the whole search, and click **Collect from 5 pages** (or the count you set).

![](visual:ext/list-tab-more-pages)

Keep the tab in front while it runs; the tab's title counts the businesses as they come in. If Yelp shows a verification page, the run stops and the panel says so.

Complete the check in the tab, click **Rescan**, and collect again from the page you're on. When it finishes, the results page opens.

## Step 4 — Reviewing the Table

Now you check what came back before adding anything to it. The results page shows one row per business, with the chip at the top giving the total. Rows that appeared on more than one page are kept once.

![](visual:ext/results-yelp)

Hover a column header to rename it with the pencil, such as changing Yelp's label to Business Name, or remove it with the trash icon. Sponsored rows are marked when the page marks them; click **Filter rows** to leave them out.

Mostly empty columns are hidden on their own; click **Columns** to show them. The table is clean, so the next step adds what Yelp doesn't show.

## Step 5 — Adding Emails from Each Business's Website

Yelp doesn't show email addresses, so this step reads each business's own website. Click the **Bulk scrape** icon (the layers icon at the top of the side panel) and choose **Collect contacts**.

![](visual:ext/bulk-menu)

On the Upload step, choose **Use saved data**; the step reads **Reuse URLs from a saved table**. Under **Choose a saved table**, pick this Yelp collection, then its website column. Click **Continue →**, then **Continue to site configuration →**. **Email addresses**, **Phone numbers** and **Social media links** are on for every site; untick what you don't need.

![](visual:ext/bulk-contacts-config)

Click **Start collecting →**. Sites load one after another in the embedded browser while the counters fill in, and one linked Contact or About page per site is read as well.

Many small businesses publish no email; those rows keep their phone and website. The emails are in, so the last step is the export.

**Note:** if the list rows have no website column, the websites sit on each business's own page. Paste the Link column into **Bulk scrape → Bulk scrape** first to collect the business pages, then run Collect contacts on that table's website column.

## Step 6 — Exporting to Excel

Click **View merged table** on the **Collection results** page, then **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Both runs are saved in History, so you can come back to either.

![](visual:ext/results-export-menu)

The export holds exactly the rows and columns shown. Here is what a few rows look like after both runs; the businesses, numbers and addresses are made up.

Sample data:

| Business Name | Rating | Review Count | Phone | Website | Emails |
|---|---|---|---|---|---|
| Sample Plumbing Co. | 4.5 | 212 | (555) 010-2231 | sampleplumbing.example.com | hello@sampleplumbing.example.com |
| Riverside Pipe & Drain | 4.2 | 87 | (555) 010-4410 | riversidepipe.example.com | |
| Northside Plumbers | 4.8 | 1,034 | (555) 010-7782 | northsideplumbers.example.com | info@northsideplumbers.example.com |

## When It Goes Wrong

**The run stopped after a few pages.** Yelp asked for a verification, or the tab was in the background. Complete the check in the tab, keep the tab in front, click **Rescan**, and collect again from the page you're on. History keeps the first run.

**I only get about 240 businesses.** That is Yelp's cap of about 24 pages per search. Search a narrower category or one neighborhood at a time, and run each search in turn; **View merged table** in Bulk scrape puts them together.

**The List tab found the sponsored row, not the results.** Pick the card whose count matches the number of results on the page, or click **Choose an item on the page** and click one business in the main list.

**Collect contacts found no websites.** The list rows don't carry the website. Collect the business pages first through Bulk scrape, as the note in Step 5 describes, then run Collect contacts on that table.

**Some rows have no email.** The business publishes none on its website. Those rows keep the phone and address from Yelp.

## Conclusion

You collected a Yelp search into a spreadsheet with every page of results and each business's emails, ready for a call list or a market overview. The same steps work on other directories; see [How To Scrape Yellow Pages into Excel](/guides/collect-business-listings-from-yellow-pages) and the lead generation use case for the whole workflow from search to outreach.
