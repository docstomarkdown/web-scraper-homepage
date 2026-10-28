---
title: "How To Build a Lead List Without Buying Data"
description: "Business directories, member lists, careers pages and review sites already list the businesses you want. One afternoon turns them into a sheet with phones and emails."
status: draft
date: 2026-10-21
updated: 2026-10-28
author: vikram
category: Playbooks
tags: [lead generation, directories, no code]
---

You can build a lead list of local businesses in an afternoon without paying a data vendor, because the businesses are already listed in public places. Business directories, trade association member lists, company careers pages and the review sites of your line of work each hold part of the list, and Web Scraper Pro, a free Chrome extension, turns what they show into a spreadsheet with phones, websites and emails. This playbook starts with the first click, then walks the five sources, the gaps each one leaves, and the rules for using the list.

## Start with one directory search

The first list is one Yellow Pages search, and it takes a few minutes.

1. Install Web Scraper Pro in Chrome. It's free, with no paid plan and no account.
2. Search Yellow Pages for `plumbers` in `Denver, CO`. Click the extension's icon; the side panel opens on the right of the browser. Open the **List** tab, and the listings show under **Choose from lists we found**.
3. Choose **Collect more pages**, confirm **Next page**, set **Stop after** to **4**, and click **Collect**. About 120 businesses arrive with name, phone, address, rating, years in business and website in named columns.
4. Click **View results**, then **Add contact details** at the top of the results page. In about ten minutes each business's own website has been read, and an Emails column holds the addresses the businesses publish.

That's a lead list. Everything below is about making it bigger, matching it to your buyer, and keeping it honest.

## Why build instead of buy

A list you build is today's listings for exactly the businesses you sell to, at no cost per row.

Vendor lists are broad and they age from the day they're compiled. A list you build is fresh on the day you collect it, and you can rebuild it next month for free. Vendors do hold things public pages don't, such as a decision-maker's name or a direct line. For local and small-business outreach that rarely matters, because the business's own phone and email are the contact.

| | A bought list | A list you build |
|---|---|---|
| Freshness | Compiled months ago | Collected today, with the date on every row |
| Fit | A category, as the vendor defines it | Your search: a business type in a place |
| Cost | Per record, or a subscription | Your time: an afternoon for a city |
| Decision-maker names | Sometimes | No; the business is the contact |
| Emails | Often "verified" for a fee | The ones the business publishes |

## Source 1: business directories

Yellow Pages, Yelp, Justdial, BBB and their regional equivalents: a category plus a place, with phone, address and often a website.

Directories list businesses by category and place, and some add years in business or accreditation. Web Scraper Pro has ready-made columns for [Yellow Pages](/scrapers/yellow-pages), [Justdial](/scrapers/justdial) and [BBB](/scrapers/bbb). On Yelp or any other directory with a list, the **List** tab finds the list on the page and names the columns from what the cards show. Set **Stop after** to the pages you want, and every page lands in one table.

| Fact | What to expect |
|---|---|
| Listings per page | About 30 on Yellow Pages, about 10 on Yelp; set Stop after to the pages you want |
| Websites | Yellow Pages and Yelp show them on most cards; BBB shows them on the profile page only |
| Emails | Never on the directory; read from each business's website in the next step |
| Sponsored rows | Marked, so you can filter them out |

To add emails, click **Add contact details** on the results page when the table has a Website column (Yellow Pages tables do). For a table whose website column has another name, click **Bulk scrape** at the top of the side panel, choose **Collect contacts**, click **Use saved data**, pick the table and its website column, and click **Start collecting**. Either way, each website is read in turn and its emails, phone numbers and social links become new columns on the same rows.

What you get: a complete local list with phones and most websites, and emails for the businesses that publish one. What you won't: an email for every business.

## Source 2: Google Maps

Web Scraper Pro collects from Google Maps too, and for Maps-only lists there's a site that covers nothing else.

A Google Maps search for a business type in a city returns every business with phone, website, rating and address, and the extension reads each business's website for emails in the same run. If Google Maps is your only source, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only, with its own guides for city-by-city lead lists, emails and phone numbers. The rest of this playbook stays with the sources that aren't a map.

## Source 3: association and chamber member lists

The best lists for a profession, published by the bodies that represent it.

Trade associations, licensing boards, chambers of commerce and franchise locators publish member directories: name, firm, city, often a website. They're narrower than a general directory and far more precise about who belongs to the profession. Most are a list on a page, which the List tab collects across every page. A few need a sign-in; those come with terms you should read first, and the extension never signs in for you.

What you get: the right businesses, verified by the body. What you won't: phones and emails on many of them, which the second run over their websites adds.

## Source 4: careers pages and job boards

A company that's hiring is a company that's spending, and its careers page says so.

If your customer is "companies hiring sales reps" or "clinics adding staff", job boards and company careers pages are the list. A careers page is a list of roles with location and link. Collect it with the List tab, then collect contact details from the company's own site. Job postings are about jobs, not people: the extension collects roles, never candidate profiles. The [careers page guide](/guides/collect-job-postings-from-a-careers-page) shows each step.

## Source 5: review and listing sites for your line of work

The sites your buyers use to be found: software on G2 and Capterra, hotels on Booking.com, products on Amazon.

Every line of work has its own directory: software vendors on review sites, hotels on booking sites, stores on Shopify, sellers on marketplaces. Each is a list with a name and a link, and the link leads to a website with contact details. Web Scraper Pro's ready-made columns cover the big ones, and the [sites list](/scrapers) shows which; the rest are detected as lists on the page.

## One afternoon, one line of work: what the list looks like

Say the target is plumbers in Denver. Here are the four sources in order, with what each one adds. The counts are what a typical run returns, not a promise.

| Source | What you type or open | Rows | What the rows carry |
|---|---|---|---|
| Yellow Pages | the plumbers category for Denver, four pages | about 30 per page | name, phone, address, website, rating, years in business; emails and social links after Add contact details |
| Yelp | the same search, as many pages as it shows | about 10 per page | name, rating, review count, phone, website; emails after a second run |
| The plumbers' trade association | its member directory | one page per letter or city | firm, city, website |
| Careers pages | a plumbing company's jobs page | one per company | roles, which tell you who's growing |

Put the tables in one sheet, remove businesses that appear twice by comparing their website addresses, and the result for a mid-size city is a few hundred businesses, with emails on the ones that publish one. Compared with a vendor list: narrower, fresher, and with a Collected-on date on every row.

## Putting the list together

One sheet, one row per business, one column saying when it was collected.

1. Collect each source into its own table. The extension keeps every run in **History**, so nothing is lost.
2. Export each table to Excel or CSV and paste them into one sheet.
3. Where two sources list the same business, keep one row. The website address is the easiest thing to match on, because the business name is often written two ways.
4. Keep the columns you'll use: name, phone, website, email, city, source, collected on.
5. Note the email coverage honestly. Many local businesses publish no email, so a list where a third of the rows have none is normal.
6. Rebuild monthly. The rows that are new since last month are often the best outreach of all, because nobody else has called them yet.

## Am I allowed to email the businesses on the list?

Usually yes for business addresses, within the anti-spam rules where you send and where they are.

A list is permission to contact a business, not to spam it. In most countries, business-to-business email to a published address is allowed when you identify yourself, say what you're offering and honour a request to stop; some countries ask for consent first. The [plain-words guide to web scraping and the law](/web-scraping-legal) explains which rules apply and links the sources. It isn't legal advice. If you send at volume, run the emails through a verification tool first, because the extension collects what the business publishes and doesn't check that the address still works.

## What a built list won't give you

Names of decision-makers, verified emails, and anything behind a sign-in.

Public listings name the business, not the owner; for that you read the About page or ask. Emails are the ones the business publishes, unverified. Member directories and social networks behind a sign-in are off the table, by their terms and by ours: the extension reads pages you can see and never gets past a sign-in or a verification page for you.

## What this means for you

- **The first list costs you fifteen minutes, not a budget.** One directory search with a hundred businesses is a real list with phones and emails. Try that before deciding whether a vendor's list was ever the right buy.
- **Stack sources for coverage, then remove the repeats.** A directory for breadth, a member list for precision, a careers page for timing.
- **Label the list honestly and keep the rules.** The collected-on date, the email coverage, and the anti-spam law where you send are what make a list you'd put your name to.

The [Yellow Pages guide](/guides/collect-business-listings-from-yellow-pages) takes you from the first search to the Excel file, click by click, and the [lead generation page](/use-cases/lead-generation) has the whole workflow with its numbers.
