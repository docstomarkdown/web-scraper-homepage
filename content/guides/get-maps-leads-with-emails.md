---
title: "How To Get Maps Leads with Emails with Web Scraper Pro"
description: "Collect businesses from Maps with the emails, phone numbers and social links from their websites, in the same run or added to a list you already have."
status: draft
date: 2026-10-20
updated: 2026-10-20
version: "1.3.0"
author: vikram
feature: maps-leads
sites: [maps]
video: ""
campaign: yt-b2-02-how-to-get-google-maps-leads-with-emails-no-code
faq:
  - q: "Can I turn contact details off?"
    a: "Yes. Say no on the card, or untick the box on the List tab. The run is faster without them: about a minute for 20 businesses instead of a minute and a half."
  - q: "Are the emails verified?"
    a: "No. They're the addresses the websites publish. Verify them in your email tool before a campaign."
  - q: "Where do the emails come from?"
    a: "From each business's own website: the page Maps links to and one linked Contact or About page. Maps itself doesn't list emails, so a business without a website, or without a published email, gets none."
  - q: "Can I get emails for leads I collected with another tool?"
    a: "Yes, if the list has a Website column. Paste the websites into Bulk scrape → Collect contacts, or import the list and use Add contact details on its results page."
---

Collect businesses from Maps with the emails, phone numbers and social links from their websites, in the same run or added to a list you already have. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).

## Step 1 — Starting a Maps search with contact details on

In the **Chat** tab, type `Find plumbers in Denver`. On the card, choose **50** and click **Start**. Emails are on by default (Settings → Results → **Add emails from their websites**). The screenshots show dentists in Austin; use your own trade and city.

![](visual:ext/chat-maps-count-card)

## Step 2 — Reading the emails as they arrive

While the businesses are collected, each one's website and its Contact or About page are read in the background. The progress line shows how many have an email.

![](visual:ext/chat-maps-progress)

## Step 3 — Checking the contact columns

Open the results. Next to the Maps columns sit Emails, Website phones, Faxes and one column per social network. A cell with several values shows the first and a **+N more** button. Some businesses have no email; their phone and website still come from Maps.

![](visual:ext/results-maps-with-contacts)

## Step 4 — Adding contact details to an older list

Open a Maps list you collected earlier from the **History** tab and click **Add contact details** on the results page; it reads **Update contact details** if the table already has them. The same columns fill in. This works on any saved table with a Website column.

![](visual:ext/results-add-contacts)

## Step 5 — Exporting

Click **Export as** and choose Excel, CSV or JSON.

![](visual:ext/results-export-menu)

## When it goes wrong

**Emails came back empty for every row.** Add emails from their websites is off in Settings → Results, or the request contained "no emails". Turn the setting on, or run again without those words.

**The run is slow.** Reading each website adds a few seconds per business: 50 take about four minutes, 200 about fifteen. For a quick list of names and phones, say `no emails` and add the emails later with Add contact details.

**Add contact details is greyed out on a saved table.** The button needs a column whose name is exactly Website. Rename the website column to Website on the results page, or use Bulk scrape → Collect contacts → Use saved data.

**A business has an email on its site but the row is empty.** The address is shown as an image, behind a contact form, or on a page other than the home and Contact pages. Only text on those pages is read.

## Conclusion

You now have businesses and their contact details in one table, and you know how to add contact details to any list with a Website column.
