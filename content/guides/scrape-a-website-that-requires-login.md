---
title: "How To Scrape a Website That Requires Login, No Code"
description: "Collect a list from a members-only directory, your own account pages or an MLS: sign in as usual, open the page, click Collect. It reads what you can see."
status: draft
date: 2026-10-21
updated: 2026-10-21
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-a-website-that-requires-login
faq:
  - q: "How do I scrape a website that requires login without code?"
    a: "Sign in to the site in Chrome the way you always do, open the page with the list, and click Collect in the Web Scraper Pro side panel. The extension runs in your browser, so it sees the page as you see it."
  - q: "Does the extension need my password?"
    a: "No. You never type a password into the extension and it never signs in for you. It reads the page that is already open in your signed-in browser."
  - q: "Can I scrape data from a website with login to Excel?"
    a: "Yes. After the list is collected, click Export as and choose Microsoft Excel, CSV, JSON or Google Sheets."
  - q: "Does it work on LinkedIn, Facebook or Instagram?"
    a: "No. Those sites' terms forbid automated collection and they actively block it, so Web Scraper Pro doesn't support them. Member directories, portals, your own account pages and listing services such as an MLS are what this guide is for."
  - q: "Can it get past a paywall?"
    a: "No. It collects the text and lists a page shows you. If you can't see the content, neither can the extension."
  - q: "Is it legal to scrape a site I'm signed in to?"
    a: "Your own account data is yours to export. For a members-only site, its terms decide what you may do with the data; read them before you share or sell anything. This isn't legal advice."
  - q: "Will the site ban my account for this?"
    a: "It runs in your own browser at a person's pace, reads the pages you open, and never signs in for you, so to the site it looks like you browsing. Keep runs small and stop if the site shows a verification page or asks you to slow down. The site's own terms decide what you may do with the data."
---

<!--
Facts to confirm with a verified run on 1.3.0 before this leaves draft:
- The List tab detects lists on a signed-in page the same way as on a public page (list-scraper facts, 2026-10-20).
- "The page needs a sign-in. Sign in as you normally would, then collect" is already in the any-website guide.
- The extension stores no site credentials and never signs in (docs/personas.md: no account, runs in the user's browser).
- A new capture is needed for the signed-in member directory example: ext/list-tab-members-directory.
-->

Web Scraper Pro runs inside your own Chrome window, so a page you're signed in to is collected like any other page. You sign in the way you always do, open the list, and click **Collect**; there are no cookies to export and no password to type anywhere. This guide collects a members-only directory into a spreadsheet, and the same steps work for your own account pages, a client portal or a property listing service.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later).
- An account on the site, and the page with the list open after you sign in: a member directory, an order history, a supplier portal, or an MLS search.

## Is It Allowed To Scrape a Site You're Signed In To?

Data in your own account, such as your orders or your saved searches, is yours to export. For a members-only site, its terms decide what you may do with what you collect, and many allow personal use but not resale; read them before you share a list. Our page [Is web scraping legal?](/web-scraping-legal) explains the main rules in plain words.

## What You Get

A member directory becomes one row per member, with the columns the page shows. On a site without a ready-made setup, the names come from the page's own labels, and you can rename them on the results page.

| Column | Example |
|---|---|
| Name | Sample Plumbing Co. |
| Member since | 2021 |
| City | Springfield |
| Phone | (555) 010-2231 |
| Website | sampleplumbing.example |
| Profile link | members.example/profile/1 |

## Step 1 — Signing In and Opening the List

In Chrome, sign in to the site as you normally would. Then open the page with the list you want, such as the directory's search results or your account's order history. The extension only reads a page that is open, so this is the page it will collect.

If the site asks for a verification code, complete it before you go on. The extension never completes a check for you.

## Step 2 — Opening the List Tab

Click the Web Scraper Pro icon and open the **List** tab. Under **Choose from lists we found**, each list on the page shows as a card with how many items are on this page. Hover a card and the list it means is outlined on the page.

![](visual:ext/list-tab-members-directory)

If the first card isn't the list you want, pick the card whose count matches. If none matches, click **Choose an item on the page** and click one member; every similar item is picked with it.

## Step 3 — Collecting Every Page

Choose **Collect more pages**. The panel works out how the list moves on and shows **Next page**, **Load more** or **Auto scroll**; confirm it or pick the right one. Under **Stop after**, set how many pages, then click **Collect from 5 pages** (or the number you set).

![](visual:ext/list-tab-more-pages)

Keep the tab in front while it runs. The tab title counts the rows as they come in, and **Stop** keeps what has been collected so far.

## Step 4 — Checking the Columns

The results page opens with one row per member. Hover a column header to rename it with the pencil or remove it with the trash icon. Mostly empty columns are hidden on their own; click **Columns** to show any you need.

![](visual:ext/results-arranged)

## Step 5 — Exporting

Click **Export as** and choose **Microsoft Excel**, **CSV**, **JSON** or **Google Sheets**. The collection stays in History, so you can export it again later.

![](visual:ext/results-export-menu)

After export, the sheet looks like this. The members are made up.

| Name | Member since | City | Phone | Website |
|---|---|---|---|---|
| Sample Plumbing Co. | 2021 | Springfield | (555) 010-2231 | sampleplumbing.example |
| Riverside Pipe & Drain | 2019 | Springfield | (555) 010-4410 | riversidepipe.example |
| Northside Plumbers | 2023 | Springfield | (555) 010-7782 | |

## When It Goes Wrong

**The List tab found nothing, or found the sign-in form.** The page you're on isn't the list. Sign in, open the directory or search results, and click **Rescan** in the List tab.

**The run stopped and the page shows a sign-in screen.** The site ended your session. Sign in again in the same tab and start the collection again; what was collected is kept in History.

**The site showed a verification page.** Complete it in the tab and collect again. The extension never completes a check for you.

**The columns have odd names.** On a site without a ready-made setup, names come from the page's own labels. Rename them once on the results page; the export uses your names.

## Conclusion

You collected a list from a page that only your signed-in browser can see, without exporting cookies or typing a password anywhere. The same steps work for your own account pages and for listing services such as an MLS. For a list that spans many pages on any site, see How To Scrape Every Page of a List, Not Only the First.
