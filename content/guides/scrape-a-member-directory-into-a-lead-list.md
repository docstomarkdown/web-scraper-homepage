---
title: "How To Scrape a Member or Vendor Directory into a Lead List"
description: "Turn an association, chamber, exhibitor or vendor directory into a spreadsheet of firms with websites, then add their emails, in two runs. No code."
status: draft
date: 2026-10-28
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: list-scraper
sites: []
video: ""
campaign: guide-scrape-a-member-directory-into-a-lead-list
faq:
  - q: "Does it work on any member directory?"
    a: "On any directory that shows its members as a list on the page, which is most of them: association member lists, chamber directories, exhibitor lists, supplier and vendor directories, franchise locators. The List tab finds the list and names the columns from the page; no ready-made setup is needed."
  - q: "What if the directory needs a sign-in?"
    a: "Sign in yourself, in the tab, and the extension reads what you can see. It never signs in for you. A members-only directory comes with terms you agreed to when you joined; read them before you collect."
  - q: "How do I get emails for the members?"
    a: "Most directories show a website rather than an email. Collect the list, then run Bulk scrape → Collect contacts with Use saved data over the website column, or click Add contact details on the results page when the column is named Website. Each firm's own site is read for its emails."
  - q: "The directory is one letter or one page per category. Do I have to collect each one?"
    a: "Collect each page in turn and combine them, or paste the page addresses into Bulk scrape and let one run collect them all into a merged table with a Source URL column."
  - q: "Can I collect the member's own page for more details?"
    a: "The list gives what the card shows. For each member's profile page, paste the profile links into Bulk scrape → Collect page text for the readable text, or open a profile and use the Properties tab. Bulk runs don't collect a profile's fields as named columns."
  - q: "Is it legal to scrape a member directory?"
    a: "A public directory lists businesses that chose to be listed, and the extension reads it in your browser at a person's pace. The body's terms, and anti-spam law where you send, decide what you may do next; a members-only directory's terms bind you as a member. Read the plain-words explainer on web scraping and the law first. It isn't legal advice."
---

<!--
Draft until a real run on 1.3.0 confirms the generic flow on two or three real directories (an association, a chamber,
an exhibitor list): list detection on member cards and on plain table rows, the page-given column names, which paging the
directories use (Next page is the common one; A to Z pages need Bulk), and Use saved data over a website column whose name
isn't Website. Facts used: list detection and column naming (DECISIONS.md D-018, D-019); Add contact details needs a
column named Website (D-024); Bulk Collect contacts with Use saved data; Bulk has no profile-fields mode. Capture id
ext/list-tab-members-directory is already requested by the lead-generation page. Title targets "scrape a member directory"
(competitor corpus, 2026-10-28).
-->

Trade associations, chambers of commerce, trade shows and marketplaces all publish directories of their members, exhibitors or vendors. Those directories are the most precise lead lists there are: every firm on them belongs to the profession you sell to. Web Scraper Pro, a free Chrome extension, turns any such directory into a spreadsheet without a ready-made setup. It finds the list on the page and names the columns from what the page shows. In this guide you collect a member directory across its pages, then add each member's emails from its own website. Tested on version 1.3.0.

## Prerequisites

To follow this tutorial, you need:

- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later).
- A directory open in Chrome: an association's member list, a chamber's business directory, a trade show's exhibitor list, or a vendor directory. If it needs a sign-in, sign in first.

## Does a Member Directory Allow Scraping?

A public directory lists businesses that chose to be found, and this guide reads it in your own browser, at a person's pace, for your own prospecting. A members-only directory comes with terms you agreed to when you joined, and some forbid using the list for marketing. Check the body's terms, keep what you collect to the firms' published details, and read [Is web scraping legal?](/web-scraping-legal) first. It isn't legal advice.

## What You Get

Directories differ, so the columns come from the page. A typical member card gives you:

| Column | Example |
|---|---|
| Name | Sample Plumbing Co. |
| Category or Specialty | Residential plumbing |
| City | Springfield, IL |
| Phone | (555) 010-2231 |
| Website | sampleplumbing.example |
| Profile URL | directory.example/members/sample-plumbing |

A card that shows no website leaves the cell empty. The second run below adds Emails, Website phones and the social links from each firm's own site.

## Step 1 — Opening the Directory and Finding the List

Go to the directory page and set its own filters first, such as a region or a category, because the extension collects what the page shows. Click the Web Scraper Pro icon to open the side panel and open the **List** tab.

Under **Choose from lists we found**, the members show as a card with a count, such as **List 1, 25 items**. Hover it and the members are outlined on the page. Directories also hold menus, sponsor strips and letter links, which show as other cards; pick the card whose count matches the members you can see.

![](visual:ext/list-tab-members-directory)

If no card is the members, click **Choose an item on the page** and click one member; every similar entry is picked with it. A directory laid out as a plain table works the same way, one row per table row. The list is chosen; the next step collects every page of it.

## Step 2 — Collecting Every Page

Choose **Collect more pages**. Most directories continue with a **Next page** link or page numbers, and the panel says so; a few load more as you scroll, which shows as **Auto scroll**. Set **Stop after** to the pages you want, or **All pages**, and click **Collect from N pages**.

![](visual:ext/list-tab-more-pages)

The results page opens and fills in page by page. Keep the tab in front, and click **Stop** if you have enough; the rows so far are kept.

A directory split by letter, A to Z, or by category, has no Next link across the split. Collect each letter in turn, or paste the letter pages' addresses into **Bulk scrape**. Choose **Bulk scrape**, confirm the list once, and the run collects them into one merged table with a Source URL column. The [list of URLs guide](/guides/collect-from-a-list-of-urls-in-one-run) shows that run.

## Step 3 — Checking the Columns

On the results page, hover a header and click the pencil to rename a column, or the trash icon to remove one. Name the column that holds each firm's site **Website**, exactly, if it isn't already; the next step looks for that name.

![](visual:ext/results-rename-column)

Mostly empty columns are hidden on their own; click **Columns** to see them. A member card that shows a phone but no website keeps the phone; that firm gets no email in the next step, because there's no site to read.

## Step 4 — Adding Each Member's Emails

With the table named and a **Website** column in place, click **Add contact details** at the top of the results page. Each firm's website and its Contact or About page are read, and Emails, Website phones, Faxes and one column per social network fill in on the same rows. About four minutes per 50 websites.

![](visual:ext/results-add-contacts)

If the button is disabled, the table has no column named Website. Rename it, or open **Bulk scrape → Collect contacts**, click **Use saved data**, pick this table and its website column, and start the run. The result is a separate table with one row per site, which joins to this one on the website. Firms that publish no email keep their row with an empty cell.

## Step 5 — Filtering and Exporting

Click **Filter rows** to keep the rows you can act on: Emails not empty for a campaign, or Phone not empty for calls. Remove the columns you won't use, click **Export as**, and choose **Microsoft Excel** or **CSV**. The run stays in **History**, so next quarter's run of the same directory can be compared with this one on Website.

![](visual:ext/results-export-menu)

After export the sheet looks like this. Sample data; the firms are made up.

| Name | City | Phone | Website | Emails |
|---|---|---|---|---|
| Sample Plumbing Co. | Springfield, IL | (555) 010-2231 | sampleplumbing.example | hello@sampleplumbing.example |
| Riverside Pipe & Drain | Springfield, IL | (555) 010-4410 | riversidepipe.example | |
| Quick Fix Plumbing | Chatham, IL | (555) 010-7782 | quickfixplumbing.example | info@quickfixplumbing.example |

## Three Directories, Three Shapes

| Directory | Where the list is | What changes |
|---|---|---|
| An association's member list | One list, often split by letter or region | Collect each split, or paste the split pages into Bulk scrape |
| A chamber of commerce | A category list with a Next link | Collect more pages; the category becomes a column you can filter |
| A trade show's exhibitor list | A long page that loads as you scroll, or a search | Auto scroll to the end; search the show's own filters first to narrow it |

## When It Goes Wrong

**The List tab found the letter links or the sidebar.** Pick the card whose count matches the members on screen, or click **Choose an item on the page** and click one member.

**Only the first page came back.** Choose **Collect more pages** before you click Collect. On an A to Z directory, collect each letter or use Bulk scrape.

**Add contact details is greyed out.** The table has no column named Website. Rename the column that holds the sites to Website and reload the results page.

**Most rows have no email.** The firms publish none, or the directory lists a profile page rather than the firm's own site. Check a few sites by hand; a missing email is a fact about the site.

**The directory asked me to sign in.** Sign in yourself, in the tab, and collect again. The extension reads what you can see and never signs in for you.

## Conclusion

You collected a member directory across every page into named columns, added each firm's emails and social links from its own website, and exported the rows you can use. The same steps work on a chamber directory, an exhibitor list or a vendor marketplace, because none of them needs a ready-made setup. For the lead-list workflow end to end, see the [lead generation page](/use-cases/lead-generation). For emails from a list you already have, see How To Extract Emails from a List of Websites in Bulk. The [emails and contacts page](/email-extractor#rules) has the rules on using the addresses.
