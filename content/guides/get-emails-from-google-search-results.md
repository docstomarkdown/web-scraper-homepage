---
title: "How To Get Emails from Google Search Results"
description: "Collect a Google search into a list of websites, then read each site for emails, phones and social links, in two runs of a free Chrome extension."
status: draft
date: 2026-10-28
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: email-extractor
sites: []
video: ""
campaign: guide-get-emails-from-google-search-results
faq:
  - q: "Can I extract emails directly from Google search results?"
    a: "Not from the results page itself; Google shows titles, links and snippets, not addresses. The route is two runs: collect the results into a table of links, then read each linked website for its emails. Both runs happen in your own browser."
  - q: "How many results can I collect per search?"
    a: "Three to five pages, about 30 to 50 results, is the sensible run. Google shows a verification page when many result pages load quickly; complete it in the tab and collect fewer pages afterwards."
  - q: "Why do some rows have no email?"
    a: "The site publishes none, shows it as an image or behind a contact form, or the page in the results isn't the business's own site (a directory, a social profile, a news article). Those rows keep their link and phone where one was found."
  - q: "Can I do this for a list of keywords?"
    a: "Yes. Build one search address per keyword, paste them into Bulk scrape, and collect three pages each into one merged table with a Source URL column. Then run Collect contacts over the merged table's Link column."
  - q: "Is it allowed?"
    a: "Google's terms restrict automated access to its search, and emails are personal data in many countries. Keep the search runs small, in your own browser, and use the addresses for business outreach within the anti-spam rules where you send. The explainer on web scraping and the law has the sources; it isn't legal advice."
  - q: "Does it verify the emails?"
    a: "No. It collects what each site publishes. Run the list through an email checker before a campaign; a bounce-heavy send gets your domain blocked."
---

<!--
Draft until a real run on 1.3.0 confirms both halves (2026-10-28): (1) the Google results list as the Google results
guide describes it (the organic results card, the Next link, the verification threshold after a few pages), which that
guide also still needs; (2) Bulk scrape → Collect contacts → Use saved data over the results table's Link column, where the
Link column holds the result pages' addresses rather than the sites' home pages; confirm that a deep link (an article or
a product page) still gets its site's Contact or About page read, or whether the home page should be used. Replace the
sample tables after the run. Title targets "how to get emails from google search results" (youtube-research
SEARCH_QUERIES, 2026-10-28). The Google results guide owns the results run; this guide owns the two-run email workflow.
-->

Google search results don't show email addresses, but every result links to a website that may. Web Scraper Pro, a free Chrome extension, does the job in two runs. First it collects the search results into a table with each result's link. Then it reads each linked site for its emails, phone numbers and social links and writes them into the same table. In this guide you collect a search for a business type in a town, add the emails, and export a sheet ready for outreach. Tested on version 1.3.0.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A search that returns businesses' own websites, such as `wedding photographers springfield` or `accounting firms near springfield`. Searches that return directories and social profiles give fewer emails, because those pages aren't the businesses' own.

## Does Google Allow Scraping Its Results?

Google's terms restrict automated access to its search, and it shows a verification page when many result pages load quickly. This guide reads the results page you can see, in your own browser, a few pages at a time, and then reads each business's own site the way a visitor would. The emails you collect are personal data in many countries; the anti-spam rules where you send decide how you may use them. Read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

The first run gives you the search results; the second adds the contact columns to the same rows:

| Column | From | Example |
|---|---|---|
| Title | The search results | Springfield Wedding Photography: Sample Studio |
| Link | The search results | https://samplestudio.example |
| Snippet | The search results | Natural, relaxed wedding photography in Springfield… |
| Emails | The site | hello@samplestudio.example |
| Website phones | The site | (555) 010-2231 |
| LinkedIn, Instagram, Facebook… | The site | One column per network found |

A site that publishes no email keeps its row with an empty Emails cell. Nothing is guessed.

## Step 1 — Collecting the Search Results

In Chrome, search Google for your phrase. Set the country and language in Google's own settings first; the extension collects what the page shows.

Click the Web Scraper Pro icon to open the side panel and open the **List** tab. Under **Choose from lists we found**, the organic results are the card whose count matches the results you can see, usually 10. Ads, the People also ask box and video strips are separate cards; hover a card and its list is outlined on the page.

![](visual:ext/list-tab-detected)

Choose **Collect more pages**; Google continues by a **Next** link, so the panel shows **Next button ready**. Set **Stop after** to 3 to 5 pages and click **Collect from N pages**. Keep the tab in front. The results page opens with one row per result: Title, Link, Site and Snippet.

![](visual:ext/results-arranged)

If Google shows a verification page, complete it in the tab, click **Rescan page**, and collect again from the page you're on. The [Google search results guide](/guides/scrape-google-search-results) covers the results run in more depth; this one carries on to the emails.

## Step 2 — Starting a Contacts Run over the Links

Now each link becomes a site to read. Click the **Bulk scrape** icon at the top of the side panel and choose **Collect contacts**. A bulk page opens in a new tab.

On the **Upload** step, click **Use saved data**. The step now reads **Reuse URLs from a saved table**; under **Choose a saved table**, pick the search you collected a moment ago, then pick its **Link** column. A chip reads **N valid URLs detected**. Click **Continue →**.

![](visual:ext/bulk-use-saved-data)

The **Review sites** step groups the links by site. Remove the ones that aren't businesses' own sites: directories, social profiles, news articles and marketplaces give you the directory's contact details, not the business's. Click **Continue to site configuration →**.

## Step 3 — Choosing What To Collect and Running

On the **Configure** step, **Email addresses**, **Phone numbers** and **Social media links** are ticked; untick any you don't need. One linked Contact or About page per site is read as well. Click **Start collecting →**.

![](visual:ext/bulk-contacts-config)

Sites load one after another in the embedded browser on the right. Each takes a few seconds to about half a minute; a site that doesn't load within 30 seconds is skipped and keeps its row with counts of 0. If a site shows a verification page, the run pauses with **Waiting for you**; complete it and the run carries on.

![](visual:ext/bulk-run)

When it finishes, **View merged table** opens one row per site: Website, Email count, Emails, Phone count, Phones, Social count, and one column per social network found. You now have the contact details; the last step tidies and exports them.

## Step 4 — Keeping the Rows You Can Use, and Exporting

On the results page, click **Filter rows** and keep rows where **Email count** is more than 0. Rename **Website** to match your sheet, remove the columns you won't use, and click **Export as**, then **Microsoft Excel** or **CSV**.

![](visual:ext/results-export-menu)

The Website column matches the Link column of the search table, so a lookup in your sheet puts the Title and Snippet beside each email. Both tables stay in History.

After export the sheet looks like this. Sample data; the businesses are made up.

| Website | Emails | Website phones | Instagram |
|---|---|---|---|
| samplestudio.example | hello@samplestudio.example | (555) 010-2231 | instagram.com/samplestudio |
| riverlightphoto.example | | (555) 010-4410 | |
| northsideweddings.example | info@northsideweddings.example \| bookings@northsideweddings.example | (555) 010-7782 | instagram.com/northsideweddings |

## Doing It for a List of Keywords

For ten towns or ten trades, build one search address per keyword in a spreadsheet, such as `https://www.google.com/search?q=wedding+photographers+springfield`, with `+` for spaces. Paste the list into **Bulk scrape**, choose **Bulk scrape**, confirm the results list once for Google, set the page limit to 3, and start. **View merged table** holds every search with a **Source URL** column that says which keyword each row came from. Then run Step 2 over that merged table's Link column. Give Google breaks between batches rather than hundreds of searches at once.

## When It Goes Wrong

**Google showed a verification page.** Complete the check in the tab, click **Rescan page**, and collect again. Afterwards collect fewer pages per keyword and leave time between runs.

**Most rows have no email.** The search returned directories, profiles and articles rather than businesses' own sites. Change the search, such as adding the trade and the town, and remove the directory rows on the Review sites step.

**Email count is 0 on a site that has an email.** The address is an image, a form, or on a page that isn't linked as Contact or About. Paste that page's address into a bulk run on its own.

**The link goes to an article, not the business's home page.** The site's Contact or About page is still read when the article links to it. If a site's row stays empty, run its home page address on its own.

## Conclusion

You turned a Google search into a list of websites, read each one for its emails, phone numbers and social links, and exported the rows you can use. The same two runs work from any list of links: a directory, a member list, a sheet a client sent. For the rules on using the addresses, read the [emails and contacts page](/email-extractor#rules). For the rest of the contact run's options, see How To Extract Emails from a List of Websites in Bulk. The [lead generation page](/use-cases/lead-generation) has the lead-list workflow end to end.
