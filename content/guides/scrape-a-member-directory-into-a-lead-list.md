---
title: "How To Scrape a Member or Vendor Directory into a Lead List"
description: "Turn an association, chamber, exhibitor or vendor directory into a spreadsheet of firms with websites, then add their emails, in two runs. No code."
status: draft
date: 2026-10-28
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-a-member-directory-into-a-lead-list
# Facts checked against chrome-extension-source on 2026-11-10: on a site with no setup, lists are found by the generic list search (including standard lists and table rows) and columns are named from the page: lib/content/scanForListsCore.ts (Strategy 2: ul, ol, role=list, table tbody), DECISIONS.md D-018, D-019
# Facts checked against chrome-extension-source on 2026-11-10: "Choose from lists we found", "Choose an item on the page", "Rescan page", "Collect more pages", Next page / Load more / Auto scroll, "Stop after" 5/10/20/All pages/Custom, "Collect from N pages", "Collect to end": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: "Add contact details" on the results page is enabled only when the collected data has a column named Website; renaming a header on the results page changes its label, not the collected column: DECISIONS.md D-024, entrypoints/dataviewer/AddWebsiteContactsButton.tsx (namedWebsiteColumn on item.data), entrypoints/dataviewer/main.tsx (handleHeaderEdit sets columnRenames)
# Facts checked against chrome-extension-source on 2026-11-10: Add contact details reads each website and its Contact or About page and adds Emails, Website phones, Faxes and one column per social network to the same rows: lib/contactEnrichment/addWebsiteContacts.ts, lib/contactEnrichment/websiteContacts.ts, lib/utils/data-processing.ts (websiteContactCells)
# Facts checked against chrome-extension-source on 2026-11-10: Bulk Collect contacts with "Use saved data" gives a separate table, one row per website (Website, Email count, Emails, Phone count, Phones, Social count, networks): entrypoints/bulk/main.tsx, lib/utils/data-processing.ts (arrangeContactDetailsRows), DECISIONS.md D-021
# Facts checked against chrome-extension-source on 2026-11-10: Bulk list mode collects every list it detects on each page unless "Custom area" is chosen (used on every URL for that site); "View merged table" appears only when the run covers more than one site: entrypoints/bulk/main.tsx, lib/content/bulkListExtraction.ts
# Facts checked against chrome-extension-source on 2026-11-10: Bulk has no product- or profile-fields mode; "Collect page text" gives Page title, Description, Page text, Word count, Author, Publish date: products/web-scraper-pro.md (lib/bulk/executors/), lib/content/pageTextExtraction.ts
faq:
  - q: "Does it work on any member directory?"
    a: "It works on directories that show their members as a list on the page. The List tab looks for lists on any site and names the columns from the page; if it doesn't find the members as one list, choose Choose an item on the page and click one member."
  - q: "What if the directory needs a sign-in?"
    a: "Sign in yourself, in the tab, and the extension reads what you can see. It never signs in for you. A members-only directory comes with terms you agreed to when you joined; read them before you collect."
  - q: "How do I get emails for the members?"
    a: "Most directories show a website rather than an email. Collect the list, then run Bulk scrape → Collect contacts with Use saved data over the website column. Each firm's own site is read for its emails."
  - q: "The directory is one letter or one page per category. Do I have to collect each one?"
    a: "Collect each page in turn, or paste the page addresses into Bulk scrape, choose the member list once with Custom area, and let one run collect them all."
  - q: "Can I collect the member's own page for more details?"
    a: "The list gives what the card shows. For each member's profile page, paste the profile links into Bulk scrape → Collect page text for the readable text. Bulk runs don't collect a profile's fields as named columns."
  - q: "Is it legal to scrape a member directory?"
    a: "A public directory lists businesses that chose to be listed, and the extension reads it in your browser at a person's pace. The body's terms, and anti-spam law where you send, decide what you may do next; a members-only directory's terms bind you as a member. Read the plain-words explainer on web scraping and the law first. It isn't legal advice."
---

Trade associations, chambers of commerce, trade shows and marketplaces all publish directories of their members, exhibitors or vendors. Those directories are precise lead lists: every firm on them belongs to the profession you sell to.

Web Scraper Pro, a free Chrome extension, turns such a directory into a spreadsheet without a ready-made setup. It looks for the list on the page and names the columns from what the page shows. In this guide you collect a member directory across its pages, then add each member's emails from its own website.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A directory open in Chrome: an association's member list, a chamber's business directory, a trade show's exhibitor list, or a vendor directory. If it needs a sign-in, sign in first.

## Does a Member Directory Allow Scraping?

A public directory lists businesses that chose to be found, and this guide reads it in your own browser, at a person's pace, for your own prospecting. A members-only directory comes with terms you agreed to when you joined, and some forbid using the list for marketing.

Check the body's terms, keep what you collect to the firms' published details, and read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

Directories differ, so the columns are named from the page. A member card often shows these details, and each one the page shows becomes a column. Sample data: the firm is made up.

| Detail | Example |
|---|---|
| Name | Sample Plumbing Co. |
| Category or specialty | Residential plumbing |
| City | Springfield |
| Phone | (555) 010-2231 |
| Website | sampleplumbing.example |
| Profile link | directory.example/members/sample-plumbing |

A card that shows no website leaves the cell empty. The second run below adds each firm's emails, phones and social links from its own site.

## Step 1 — Opening the Directory and Finding the List

In this step you find the members' list in the side panel. Go to the directory page and set its own filters first, such as a region or a category, because the extension collects what the page shows. Click the Web Scraper Pro icon to open the side panel and open the **List** tab.

Under **Choose from lists we found**, each list on the page shows as a card with its count. Hover a card and its list is outlined on the page. Directories also hold menus, sponsor strips and letter links, which can show as other cards; pick the card whose count matches the members you can see.

![](visual:ext/list-tab-members-directory)

If no card is the members, click **Choose an item on the page** and click one member; similar entries are picked with it. The list is chosen; the next step collects every page of it.

## Step 2 — Collecting Every Page

Under **How much to collect**, choose **Collect more pages**, then tell the extension how the directory continues. If the panel finds the next-page link, it shows **Next button ready**; otherwise choose **Next page**, **Load more** or **Auto scroll** to match what the directory does.

![](visual:ext/list-tab-more-pages)

Set **Stop after** to the pages you want, or **All pages**, and click **Collect from N pages**. For **Auto scroll**, the button reads **Collect to end**. Click **Stop** if you have enough; the rows so far are kept.

A directory split by letter, A to Z, or by category, has no next-page link across the split. Collect each letter in turn, or paste the letter pages' addresses into **Bulk scrape**. On its **Configure** step, choose **Custom area** and click the member list, because by default a bulk run collects every list it finds on each page. The [bulk scraper page](/bulk-scraper) shows that run.

## Step 3 — Checking the Columns

On the results page, hover a header and click the pencil to rename a column, or the trash icon to remove one. Find the column that holds each firm's website; the next step reads it.

![](visual:ext/results-rename-column)

A member card that shows a phone but no website keeps the phone. That firm gets no email in the next step, because there's no site to read.

## Step 4 — Adding Each Member's Emails

In this step each firm's own website is read for its contact details. Click the **Bulk scrape** icon at the top of the side panel and choose **Collect contacts**. On the **Upload** step, click **Use saved data**, pick this directory's table under **Choose a saved table**, and pick its website column.

Click **Continue**, check the sites on **Review sites**, and click **Continue to site configuration**. **Email addresses**, **Phone numbers** and **Social media links** are ticked for every site. Click **Start collecting**.

![](visual:ext/results-add-contacts)

The result is a separate table with one row per website: Website, Email count, Emails, Phone count, Phones, Social count and one column per social network found. It joins to the directory table on the website. Firms that publish no email keep their row with an email count of 0.

**Note:** the results page also has **Add contact details**, which adds the emails to the directory's own rows. It is enabled only when the collected table has a column named Website. Renaming a header changes its label, not the collected column, so on most directories use the Bulk route above.

## Step 5 — Filtering and Exporting

Click **Filter rows** to keep the rows you can act on, such as rows with an email for a campaign. Remove the columns you won't use, click **Export as**, and choose **Microsoft Excel** or **CSV**. Both runs stay in **History**, so next quarter's run of the same directory can be compared with this one by website.

![](visual:ext/results-export-menu)

After export the contacts sheet looks like this. Sample data: the firms are made up.

| Website | Email count | Emails | Phones |
|---|---|---|---|
| sampleplumbing.example | 1 | hello@sampleplumbing.example | (555) 010-2231 |
| riversidepipe.example | 0 | | (555) 010-4410 |
| quickfixplumbing.example | 1 | info@quickfixplumbing.example | (555) 010-7782 |

## Three Directories, Three Shapes

| Directory | Where the list often is | What to do |
|---|---|---|
| An association's member list | One list, sometimes split by letter or region | Collect each split, or paste the split pages into Bulk scrape with **Custom area** |
| A chamber of commerce | A category list with a next-page link | **Collect more pages** with **Next page** |
| A trade show's exhibitor list | A long page that loads as you scroll, or a search | **Auto scroll** to the end; use the show's own filters first to narrow it |

## When It Goes Wrong

**The List tab found the letter links or the sidebar.** Pick the card whose count matches the members on screen, or click **Choose an item on the page** and click one member.

**Only the first page came back.** Choose **Collect more pages** before you click Collect. On an A to Z directory, collect each letter or use Bulk scrape.

**Add contact details is disabled.** The collected table has no column named Website. Use **Bulk scrape** > **Collect contacts** with **Use saved data**, as Step 4 describes.

**Most rows have no email.** The firms publish none, or the directory lists a profile page rather than the firm's own site. Check a few sites by hand; a missing email is a fact about the site.

**The directory asked me to sign in.** Sign in yourself, in the tab, and collect again. The extension reads what you can see and never signs in for you.

## Conclusion

You collected a member directory across its pages, added each firm's emails and social links from its own website, and exported the rows you can use. The same steps apply to a chamber directory, an exhibitor list or a vendor marketplace, with the columns named from each page.

For the lead-list workflow end to end, see the [lead generation page](/use-cases/lead-generation). For emails from a list you already have, see How To Extract Emails from a List of Websites in Bulk. The [emails and contacts page](/email-extractor#rules) has the rules on using the addresses.
