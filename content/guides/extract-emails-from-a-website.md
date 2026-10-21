---
title: "How To Extract Emails from a Website with Web Scraper Pro"
description: "Collect the email addresses, phone numbers and social links a website publishes, from its contact page, in one click."
status: draft
date: 2026-10-20
updated: 2026-10-20
version: "1.3.0"
author: vikram
feature: email-extractor
sites: []
video: ""
campaign: yt-b2-04-how-to-extract-emails-from-a-website-1-click-no-code
faq:
  - q: "The site shows an email but it wasn't collected. Why?"
    a: "Addresses shown as images, or hidden behind a contact form, can't be read. Everything written as text on the page or its contact page is."
  - q: "Can it extract every email address on a domain?"
    a: "It reads the page you're on and one linked Contact or About page. For a whole site, paste its main pages into Bulk scrape → Collect contacts; each page becomes a row, and the merged table holds every email found."
  - q: "Does it work on any website?"
    a: "On any page your browser can show, including pages you're signed in to. Sites that draw their content with JavaScript are fine, because it reads the page as you see it."
  - q: "Is there a free online version?"
    a: "It's a Chrome extension, so the collecting happens in your browser with nothing uploaded. Install it from the Chrome Web Store to try it on a page."
---

Collect the email addresses, phone numbers and social links a website publishes, from its contact page, in one click. This guide shows each step on version 1.3.0, with a screenshot of what you should see.

## Prerequisites

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A business website with a Contact or About page.

## Step 1 — Opening the site

Go to the website in Chrome. Its Contact page is the best place to start, but any page works.

![](visual:ext/site-contact-page)

## Step 2 — Collecting the contact details

Open the side panel's **Properties** tab and click **Collect contacts**. Or, in the **Chat** tab, type `Find contact emails on this site`. The deep scan also reads one linked Contact or About page.

![](visual:ext/properties-collect-contacts)

## Step 3 — Reading the result

The results page shows one row for the site: Website, Email count, Emails, Phone count, Phones, Faxes, Social count and one column per social network. Several values in a cell are separated by a bar.

![](visual:ext/results-contacts-one-site)

## Step 4 — Exporting

Click **Export as** and choose Excel, CSV or JSON. For many sites at once, use **Bulk scrape** → **Collect contacts**, which gives one merged table.

![](visual:ext/results-export-menu)

## When it goes wrong

**No email was found on a site that clearly has one.** The address is an image, sits behind a contact form, or is on a page the extension didn't open. It reads the page you're on plus one linked Contact or About page; open the page that shows the address and collect there.

**The row has a phone but no email.** Many businesses publish a phone and no email. The extension never guesses an address; an empty cell means none was published as text.

**Collect contacts isn't on the Properties tab.** On a listing page the Properties tab shows Select a product on the page instead. Open a normal page, such as the site's Contact page, and the button appears.

## Conclusion

You collected a site's public contact details in one click. For a list of sites, see How To Get Emails from a List of Websites.
