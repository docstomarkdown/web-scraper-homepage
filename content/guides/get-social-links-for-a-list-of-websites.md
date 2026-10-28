---
title: "How To Get Social Media Links for a List of Websites"
description: "Paste a list of websites and get each one's LinkedIn, Instagram, Facebook, X, YouTube and TikTok links in their own columns, with emails alongside."
status: draft
date: 2026-10-28
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: email-extractor
sites: []
video: ""
campaign: guide-get-social-links-for-a-list-of-websites
faq:
  - q: "How do I find a company's social media profiles from its website?"
    a: "Open the site, open the side panel's Properties tab and click Collect contacts. The page and its Contact or About page are read for social links, emails and phone numbers, and each network found gets its own column. For a list of sites, run the same thing through Bulk scrape."
  - q: "Which networks does it find?"
    a: "LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest, Bluesky and Spotify, plus a Google Maps listing link when the site shows one. Each network found on any site in the run gets its own column; a network no site links to is left out."
  - q: "Does it find a person's profile, or the company's?"
    a: "It collects the links the website publishes, which are the company's own pages on each network. It doesn't search the networks, and it doesn't look for employees' profiles; LinkedIn and the other networks aren't collected from."
  - q: "Why is a company's Instagram missing when I know it has one?"
    a: "The site doesn't link to it, or links from a page other than the home, Contact or About page, or draws the icons in a way that hides the address. Open the site to check; a missing link is a fact about the site, not a guess."
  - q: "Can I add the links to a list I already collected?"
    a: "Yes. Any saved table with a Website column gets an Add contact details button on its results page, and chat offers Add emails and social links under a list whose rows have websites. The columns are added to the same rows."
  - q: "Is it legal to collect social links?"
    a: "A company's public profile links are published business details. How you use them is covered by each network's terms and the rules on contacting people; read the plain-words explainer on web scraping and the law first. It isn't legal advice."
---

<!--
Facts checked against release 1.3.0 on 2026-10-28: contact collection returns one row per website with Email count /
Emails, Phone count / Phones, Faxes, Social count and one column per social platform found in the run (DECISIONS.md
D-021; lib/utils/data-processing.ts arrangeContactDetailsRows); the platform list is lib/contact/socialProfiles.ts
(LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest, Bluesky, Spotify, Google Maps); Bulk scrape → Collect
contacts with Paste URLs, a file or Use saved data; Add contact details on a saved table with a Website column (D-024);
chat's "Add emails and social links" card (D-027). Draft until a real run's screenshots exist and the sample table is
replaced with the run's shape. Title targets "get social media links from a list of websites" (competitor corpus, 2026-10-28).
-->

Give Web Scraper Pro a list of company websites and it reads each one for its social profiles. The LinkedIn, Instagram, Facebook, X, YouTube and TikTok links land in their own columns, with the emails and phone numbers it finds on the way. One run, one row per company, ready for a prospect list, a partner sheet or a competitor audit. In this guide you paste a list of websites, run the contact collection, and export a sheet with one column per network. Tested on version 1.3.0.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A list of websites: a column in a spreadsheet, a CSV, or a table you collected earlier with a Website column. Ten to a few hundred is a normal run.

## Does This Break Any Rules?

A company's profile links are published business details, and the extension reads them from the company's own site in your browser, at a person's pace. What you may do next is governed by each network's terms and the rules on contacting people; it doesn't collect from the networks themselves. Read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

One row per website. A network gets a column only when at least one site in the run links to it, so a run's columns depend on the sites:

| Column | Example |
|---|---|
| Website | sampleplumbing.example |
| Email count, Emails | 1, hello@sampleplumbing.example |
| Phone count, Phones | 1, (555) 010-2231 |
| Social count | 3 |
| LinkedIn | linkedin.com/company/sample-plumbing |
| Instagram | instagram.com/sampleplumbing |
| Facebook | facebook.com/sampleplumbing |
| X, YouTube, TikTok, Pinterest, Bluesky, Spotify, Google Maps | One column each, when found |

Several links to one network sit in one cell, separated by a bar. A site with none keeps its row with counts of 0.

## Step 1 — Opening a Contacts Run

Click the Web Scraper Pro icon to open the side panel, then click the **Bulk scrape** icon at the top of the panel and choose **Collect contacts**. A bulk page opens in a new tab.

![](visual:ext/bulk-menu)

For a single company, skip the bulk page: open its site, open the **Properties** tab and click **Collect contacts**. The same columns come back for that one site. For a list, carry on.

## Step 2 — Adding the Websites

On the **Upload** step, add the sites one of three ways:

- Drop a CSV or TXT file onto the page, one address per line.
- Choose **Paste URLs** and paste the column from your spreadsheet.
- Click **Use saved data** and pick a table you collected earlier and its website column, such as a directory run's Website column.

A chip reads **N valid URLs detected**. Each address needs to start with http or https; a bare domain is picked up when the file or the paste includes the scheme. Click **Continue →**.

![](visual:ext/bulk-upload)

The **Review sites** step lists the sites. Remove any you don't want and click **Continue to site configuration →**.

## Step 3 — Choosing What To Collect

On the **Configure** step, **Social media links** is ticked, along with **Email addresses** and **Phone numbers**. Leave all three on for a complete contact sheet, or untick the two you don't need; the social columns come back either way. One linked Contact or About page per site is read as well as the page you gave, because that's where most sites keep their icons.

![](visual:ext/bulk-contacts-config)

Click **Start collecting →**.

## Step 4 — Running

Sites load one after another in the embedded browser on the right while the cards on the left count what's found. Each site takes a few seconds to about half a minute; forty sites take roughly a quarter of an hour, and you can do something else meanwhile. A site that doesn't load within 30 seconds is skipped and keeps its row with counts of 0. If a site shows a verification page, the run pauses with **Waiting for you**; complete it and the run carries on.

![](visual:ext/bulk-run)

When it finishes, click **View merged table**. The run is done; the next step shapes the table.

## Step 5 — Tidying and Exporting

On the results page, each network is its own column, so the table is ready to sort and filter:

- Click **Filter rows** to keep rows where **Social count** is more than 0, or where a particular column such as **LinkedIn** is not empty.
- Hover a header and click the pencil to rename a column to match your sheet; click the trash icon to remove the networks you don't need.
- Click **Export as** and choose **Microsoft Excel** or **CSV**. The Website column matches your original list, so a lookup puts the links beside each company.

![](visual:ext/results-export-menu)

After export the sheet looks like this. Sample data; the companies are made up.

| Website | Emails | LinkedIn | Instagram | Facebook |
|---|---|---|---|---|
| sampleplumbing.example | hello@sampleplumbing.example | linkedin.com/company/sample-plumbing | instagram.com/sampleplumbing | facebook.com/sampleplumbing |
| riversidepipe.example | | | instagram.com/riversidepipe | facebook.com/riversidepipe |
| quickfixplumbing.example | info@quickfixplumbing.example | linkedin.com/company/quick-fix-plumbing | | |

## Adding the Links to a List You Already Have

If the companies came from a directory run or any other collection with a **Website** column, you don't need to paste anything. Open the table from **History** and click **Add contact details** at the top of the results page; the social columns, emails and phones are added to the same rows. In chat, the card under a freshly collected list offers the same thing as **Add emails and social links**. The [emails and contacts page](/email-extractor) explains both.

## When It Goes Wrong

**A network is missing for a company you know is on it.** The site doesn't link to it from its home, Contact or About page. Open the site to check; the extension reports what the site publishes.

**A column is missing entirely.** No site in the run linked to that network, so the column was left out. It appears when a run includes a site that does.

**Continue stays greyed out on the Upload step.** No valid addresses were found. Each needs http or https at the start, one per line.

**A site was skipped.** It didn't load within 30 seconds, or it asked for a verification. Open it in a normal tab, then run it again on its own.

## Conclusion

You turned a list of websites into a sheet with one column per social network, with emails and phone numbers alongside, in one run. For the emails on their own, see How To Extract Emails from a List of Websites in Bulk. For building the list of companies in the first place, the [lead generation page](/use-cases/lead-generation) walks through directories, member lists and careers pages. The [emails and contacts page](/email-extractor#rules) has the rules on using what you collected.
