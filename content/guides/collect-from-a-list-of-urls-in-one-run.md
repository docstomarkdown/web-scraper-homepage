---
title: "How To Scrape Data from a List of URLs in One Run"
description: "Paste or upload a list of web pages, say what to collect from each site, and let Web Scraper Pro work through them one by one: category pages, Google Maps searches, contact details or page text, merged into one table."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
feature: bulk-scraper
sites: []
video: ""
campaign: guide-collect-from-a-list-of-urls-in-one-run
faq:
  - q: "How do I scrape data from multiple URLs at once?"
    a: "Click the Bulk scrape icon at the top of the side panel, paste the addresses or upload a file, set up each site once, and click Start collecting. The pages are collected one after another and merged into one table."
  - q: "How many addresses can I add?"
    a: "As many as the file holds; sites run one at a time, so a long list takes a while and the tab must stay open. Pages from the same site share one setup."
  - q: "Can I mix different sites in one list?"
    a: "Yes. The Review step groups the addresses by site, and each site gets its own setup: a list, a Google Maps search, contact details or page text."
  - q: "What happens if a site asks me to verify I'm human?"
    a: "The run pauses with Waiting for you. Complete the check in the embedded browser and the run carries on."
  - q: "Can it run while my computer is off?"
    a: "Not today; the run happens in your open browser. Scheduled cloud runs are coming."
---

Paste or upload a list of web pages, say what to collect from each site, and Web Scraper Pro works through them one by one. Each site gets its own table and a merged one holds everything. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A list of page addresses: category pages of a store, several Google Maps searches, a client's websites, or a reading list. One per line in a CSV or TXT file, or ready to paste.

## Step 1 — Opening Bulk scrape

Click the Web Scraper Pro icon, then the **Bulk scrape** icon (the layers icon at the top of the side panel). Choose what the run is for:

| Choice | Collects, from each address |
|---|---|
| **Bulk scrape** | The list on the page, or a Google Maps or Scholar search's results |
| **Collect contacts** | Emails, phone numbers and social links from the site |
| **Collect page text** | The readable text with title, author, date and word count |

A bulk page opens in a new tab. In the Chat tab, pasting several addresses offers the same thing with the list already filled in.

![](visual:ext/bulk-menu)

## Step 2 — Adding the addresses

On the **Upload** step, drop a CSV or TXT file onto the page, or choose **Paste URLs** and paste the list. Every address is picked up, one per row, and a chip reads **N valid URLs detected**. **Use saved data** takes the addresses from a column of a table you collected earlier, such as the Website column of a Google Maps list.

Click **Continue →**.

![](visual:ext/bulk-upload)

## Step 3 — Reviewing the sites

The **Review sites** step groups the addresses by site and says what each one is: a list page, a Google Maps search, a Scholar search, or a plain page. Drag the sites into the order you want, remove any you don't, and click **Continue to site configuration →**.

![](visual:ext/bulk-detect)

## Step 4 — Setting up each site

The **Configure** step shows one card per site. Pages from the same site share the setup:

- **For a list site**, confirm the list it found or pick an area on the page, and choose **Next page**, **Load more** or **Auto scroll** with a page limit if the list goes on.
- **For a Google Maps search**, contact details from each business's website are read during the run, as in the side panel.
- **For contacts**, Email addresses, Phone numbers and Social media links are on; untick what you don't need. One linked Contact or About page is always read as well.
- **For page text**, choose clean text, page details, or both.

Click **Start collecting →**.

![](visual:ext/bulk-contacts-config)

## Step 5 — Watching the run

Sites load one after another in the embedded browser on the right, while the cards on the left count rows and source URLs. The run goes one site at a time on purpose, to keep the load on each site light.

If a site shows a verification step, the run pauses with **Waiting for you**. Complete it in the embedded browser and it carries on. **Stop** keeps everything collected so far.

![](visual:ext/bulk-run)

## Step 6 — Reviewing and exporting

When it finishes, the **Collection results** page lists each site with its row count and a **View →** button. The box **One clean table, ready to use** offers **View merged table**, and the merged table carries a Source URL column, so every row traces back to its page.

Click **Export as** there for **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. Everything is also saved in History.

![](visual:ext/bulk-overview)

## When it goes wrong

**A site shows Waiting for you.** It asked for a verification. Complete it in the embedded browser and the run carries on.

**Continue stays greyed out on the Upload step.** No valid addresses were found. Each one needs to start with http or https, one per line; a chip reads N valid URLs detected when they're picked up.

**The merged table mixes columns from different sites.** Each site has its own columns, and the merged table shows all of them. Open a single site's table with View for one clean set, or hide the columns you don't need.

**The run didn't finish overnight.** The tab was closed or the computer slept. A bulk run needs the tab open; what was collected before is in History.

## Conclusion

You collected from a whole list of pages in one run, with one setup per site and one merged table at the end. For a store's catalog, Shopify stores are the exception: they export from the store's own page, not from a bulk run. For emails from a list of websites specifically, see How To Extract Emails from a List of Websites in Bulk.
