---
title: "How To Get Emails from Google Search Results"
description: "Collect a Google search into a list of websites, then read each site for emails, phones and social links, in two runs of a free Chrome extension."
status: draft
date: 2026-10-28
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: email-extractor
sites: []
video: ""
campaign: guide-get-emails-from-google-search-results
# Facts checked against chrome-extension-source on 2026-11-10: Google Search has no setup (no file in configs-prod); the results run uses the generic List tab flow and columns named from the page: configs-prod/, lib/content/scanForListsCore.ts
# Facts checked against chrome-extension-source on 2026-11-10: Bulk scrape menu "Collect contacts"; steps Upload ("Use saved data", "Reuse URLs from a saved table", "Choose a saved table", "N valid URLs detected", "Continue"), "Review sites", "Continue to site configuration", Configure ("Email addresses", "Phone numbers", "Social media links"), "Start collecting", "Waiting for you", "View merged table": entrypoints/sidepanel/main.tsx, entrypoints/bulk/main.tsx, entrypoints/bulk/ContactOptions.tsx, entrypoints/bulk/bulkSites.ts (all three on by default)
# Facts checked against chrome-extension-source on 2026-11-10: a contacts run reads the address given plus one same-site page it links to that looks like a Contact or About page: lib/bulk/executors/contactBulkExecutor.ts, lib/content/contactExtraction.ts (findDeepScanUrl)
# Facts checked against chrome-extension-source on 2026-11-10: contact results are one row per website: Website (the address given), Email count, Emails, Phone count, Phones, Faxes, Social count, one column per social network; a kind found on no site is left out; a site with nothing keeps its row with counts of 0; several values joined with " | ": lib/utils/data-processing.ts (arrangeContactDetailsRows), DECISIONS.md D-021
# Facts checked against chrome-extension-source on 2026-11-10: emails are checked for shape, not for a working mailbox: products/web-scraper-pro.md (lib/contactEnrichment/)
# Facts checked against chrome-extension-source on 2026-11-10: "View merged table" appears when a bulk run covers more than one site: entrypoints/bulk/main.tsx (canMergeSites)
faq:
  - q: "Can I extract emails directly from Google search results?"
    a: "Not from the results page itself; Google shows titles, links and snippets, not addresses. The route is two runs: collect the results into a table of links, then read each linked website for its emails. Both runs happen in your own browser."
  - q: "How many results can I collect per search?"
    a: "As many pages as you set under Stop after. Google may show a verification page when many result pages load quickly, so keep runs short; complete any check in the tab and collect fewer pages afterwards."
  - q: "Why do some rows have no email?"
    a: "The site publishes none, shows it as an image or behind a contact form, or the result isn't the business's own site (a directory, a social profile, a news article). Those rows keep their row with an email count of 0."
  - q: "Can I do this for a list of keywords?"
    a: "Yes. Collect each search, or run the searches through Bulk scrape as the Google search results guide shows. Then run Collect contacts over the saved table's link column."
  - q: "Is it allowed?"
    a: "Google's terms restrict automated access to its search, and emails are personal data in many countries. Keep the search runs small, in your own browser, and use the addresses for business outreach within the anti-spam rules where you send. The explainer on web scraping and the law has the sources; it isn't legal advice."
  - q: "Does it verify the emails?"
    a: "No. It collects what each site publishes and checks only that each one looks like an email address. Run the list through an email checker before a campaign; a bounce-heavy send can get your domain blocked."
---

Google search results don't show email addresses, but every result links to a website that may. Web Scraper Pro, a free Chrome extension, does the job in two runs. First it collects the search results into a table with each result's link. Then it reads each linked site for its emails, phone numbers and social links. In this guide you collect a search for a business type in a town, add the emails, and export a sheet ready for outreach.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A search that returns businesses' own websites, such as `wedding photographers springfield` or `accounting firms near springfield`. Searches that return directories and social profiles give fewer emails, because those pages aren't the businesses' own.

## Does Google Allow Scraping Its Results?

Google's terms restrict automated access to its search, and it may show a verification page when many result pages load quickly. This guide reads the results page you can see, in your own browser, a few pages at a time, and then reads each business's own site the way a visitor would.

The emails you collect are personal data in many countries; the anti-spam rules where you send decide how you may use them. Read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

You get two tables. The first run gives you the search results, with columns named from Google's page, such as a title, a link and a snippet. The second run gives one row per website with these columns:

| Column | What it holds | Example |
|---|---|---|
| Website | The link you gave it | https://samplestudio.example |
| Email count, Emails | How many emails, and the emails | 1, hello@samplestudio.example |
| Phone count, Phones | How many phone numbers, and the numbers | 1, (555) 010-2231 |
| Social count | How many social links | 2 |
| Instagram, Facebook, LinkedIn… | One column per network found | instagram.com/samplestudio |

A kind of detail found on no site is left out of the table. A site that publishes no email keeps its row with an email count of 0. Nothing is guessed.

## Step 1 — Collecting the Search Results

In this step you turn the search into a table of links. In Chrome, search Google for your phrase. Set the country and language in Google's own settings first; the extension collects what the page shows.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. Under **Choose from lists we found**, pick the card whose count matches the plain results you can see. Ads and question boxes can show as other cards; hover a card and its list is outlined on the page.

![](visual:ext/list-tab-detected)

Choose **Collect more pages**. If the panel shows **Next button ready**, it found Google's next-page link; if not, choose **Next page** and click the link yourself. Set **Stop after** to a few pages and click **Collect from N pages**.

![](visual:ext/results-arranged)

The results page opens with one row per result. If Google shows a verification page, complete it in the tab, click **Rescan page** at the top of the List tab, and collect again from the page you're on. The [Google search results guide](/guides/scrape-google-search-results) covers this run in more depth; this one carries on to the emails.

## Step 2 — Starting a Contacts Run over the Links

Now each link becomes a site to read. Click the **Bulk scrape** icon at the top of the side panel and choose **Collect contacts**. A bulk page opens in a new tab.

On the **Upload** step, click **Use saved data**. The step now reads **Reuse URLs from a saved table**. Under **Choose a saved table**, pick the search you collected a moment ago, then pick its link column. A chip reads **N valid URLs detected**. Click **Continue**.

![](visual:ext/bulk-use-saved-data)

The **Review sites** step groups the links by site. Remove the ones that aren't businesses' own sites: directories, social profiles, news articles and marketplaces give you the directory's contact details, not the business's. Click **Continue to site configuration**.

## Step 3 — Choosing What To Collect and Running

On the **Configure** step, **Email addresses**, **Phone numbers** and **Social media links** are ticked for every site; untick any you don't need. Click **Start collecting**.

![](visual:ext/bulk-contacts-config)

Sites load one after another. For each, the run reads the page you gave it and one page on the same site that it links to and that looks like a Contact or About page. If a site shows a verification page, the run waits with **Waiting for you**; complete the check and the run carries on.

![](visual:ext/bulk-run)

When it finishes, click **View merged table** for one row per site. You now have the contact details; the last step tidies and exports them.

## Step 4 — Keeping the Rows You Can Use, and Exporting

On the results page, click **Filter rows** to keep the rows with an email. Remove the columns you won't use, click **Export as**, then choose **Microsoft Excel** or **CSV**.

![](visual:ext/results-export-menu)

The Website column holds the same links as the link column of the search table, so a lookup in your sheet puts each result's title and snippet beside its emails. Both tables stay in History.

After export the sheet looks like this. Sample data: the businesses are made up.

| Website | Email count | Emails | Phones | Instagram |
|---|---|---|---|---|
| https://samplestudio.example | 1 | hello@samplestudio.example | (555) 010-2231 | instagram.com/samplestudio |
| https://riverlightphoto.example | 0 | | (555) 010-4410 | |
| https://northsideweddings.example | 2 | info@northsideweddings.example \| bookings@northsideweddings.example | (555) 010-7782 | instagram.com/northsideweddings |

## Doing It for a List of Keywords

For ten towns or ten trades, collect each search in turn, or run them together with Bulk scrape as the [Google search results guide](/guides/scrape-google-search-results) shows. Then run Steps 2 to 4 over the saved table's link column. Give Google breaks between batches rather than hundreds of searches at once.

## When It Goes Wrong

**Google showed a verification page.** Complete the check in the tab, click **Rescan page**, and collect again. Afterwards collect fewer pages per keyword and leave time between runs.

**Most rows have no email.** The search returned directories, profiles and articles rather than businesses' own sites. Change the search, such as adding the trade and the town, and remove the directory rows on the Review sites step.

**Email count is 0 on a site that has an email.** The address is an image, a form, or on a page the given page doesn't link to as a Contact or About page. Paste that site's contact page address into a contacts run on its own.

**The link goes to an article, not the business's home page.** The run reads the article and a Contact or About page only if the article links to one. If a site's row stays empty, run its home page address on its own.

## Conclusion

You turned a Google search into a list of websites, read each one for its emails, phone numbers and social links, and exported the rows you can use. The same two runs work from any list of links: a directory, a member list, a sheet a client sent.

For the rules on using the addresses, read the [emails and contacts page](/email-extractor#rules). For the rest of the contact run's options, see How To Extract Emails from a List of Websites in Bulk. The [lead generation page](/use-cases/lead-generation) has the lead-list workflow end to end.
