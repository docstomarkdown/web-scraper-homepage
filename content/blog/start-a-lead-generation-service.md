---
title: "How To Start a Lead Generation Service with Web Scraping"
description: "A lead list is a product you can sell this week: one business type, one city, a clean sheet with contacts. How to pick the market, build, price and repeat it."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Playbooks
tags: [lead generation, agency, freelance, maps leads]
---

A lead generation service sells lists of businesses that match a client's customer, with a way to reach each one. The product is a spreadsheet; the work is choosing the market, collecting the businesses with their contact details, cleaning the list and delivering it on time. Web Scraper Pro, a free Chrome extension, does the collecting in minutes, which turns a day of copying into a service you can run several times a day. This playbook goes from the first list to the tenth client.

## Who buys lead lists

Businesses that sell to other local businesses, and the agencies that market for them.

- A software company selling to dentists wants every dentist in the cities it covers.
- A commercial cleaning company wants offices and clinics within its radius.
- A marketing agency wants restaurants without a website, because those are its customers.
- A recruiter wants companies hiring for a role, from their careers pages.

Each buys the same thing: rows with a name, a phone, a website and, where it exists, an email, for their kind of business in their area, delivered this week. They pay for time saved and for a list that's clean.

## Step 1: pick a market you can describe in one search

A business type plus a place is a search, and a search is a list.

"Dentists in Austin" is a product. "Companies that might need marketing" is not. Start with business types that are visible on Google Maps and in directories: trades, clinics, restaurants, gyms, salons, agencies, schools, property managers. A good first market has several hundred businesses per city, buyers who already pay for leads, and public websites, because that's where the emails come from.

## Step 2: build the first list

One Google Maps search, with contact details on, gives you the list with emails in the same run.

Click the Web Scraper Pro icon in Chrome. The side panel opens on the right; open its **Chat** tab, the one where you type what you want. Type `Find dentists in Austin`, pick how many on the card (up to 200 per run) and click **Start**. The extension collects every business with its phone, website, rating and address, and while it runs it reads each business's own website for emails, website phone numbers and social links.

| Run | Time |
|---|---|
| 50 businesses with emails | about four minutes |
| 200 businesses with emails | about fifteen minutes |
| Either, without emails | a minute or two |

For a bigger area, run a search per neighbourhood or zip code; chat offers to combine the conversation's searches into one table. If a client prefers a directory, Yellow Pages and similar sites collect the same way. To add emails to a list that has none, run the extension a second time over its websites: **Bulk scrape** → **Collect contacts** → **Use saved data**, pick the table and its Website column. The [emails from Google Maps guide](/guides/get-maps-leads-with-emails) shows each click.

## Step 3: clean it to the client's spec

Fewer columns, no repeats, and only rows the client can act on.

On the results page, keep the columns the client asked for and drop the rest; rename headers to their wording. Click **Filter rows** to keep rows with a phone or an email, depending on the campaign. Repeated businesses are left out on their own. Then click **Export as** and choose Excel, or Google Sheets for a link you can share.

Two things a list should state plainly: the date it was collected, and that the emails are the ones the businesses publish. Many small businesses don't publish one; a list where a third of the rows have no email is normal, and a client told that up front trusts the rows that do.

## Step 4: price the delivery

Price by the list, not by the hour, and anchor on what the client would pay a data vendor.

| Offer | What the client gets | How you deliver |
|---|---|---|
| One-off list | One business type, one area, up to a few hundred rows with contact details | One or two runs, cleaned, same day |
| Multi-city pack | The same business type across five to ten cities | A run per city, combined into one sheet |
| Monthly refresh | The list rerun each month with new businesses flagged | Rerun the searches; compare the website column with last month's |
| Adding contacts to their list | The client's own list of websites, with emails and social links added | Bulk scrape → Collect contacts over their sheet |

Set a floor that covers your time with a margin, then raise it as the delivery proves clean. Freelance marketplaces are full of data-collection orders; the ones that win repeat work promise a format and a date and hit both. The extension itself is free, with no paid plan, so the price is for your work, not your tools.

## Step 5: make it repeatable

A search list, a template sheet and a delivery note, reused for every order.

- **A search list.** Business type and city combinations you've run, with the row counts you got. New orders become lookups.
- **A template sheet.** The client's columns in the client's order, with a Collected-on column and a note on email coverage.
- **A delivery note.** What's included, where the data came from, what the client may do with it, and a line asking them to honour requests to stop.
- **History.** Every collection stays in the extension's History, so a refresh is a rerun, not a redo.

## A first order, end to end

The client is a dental software company. The brief: every dentist in Austin, Dallas and Houston with phone, website and email, in one sheet, by Friday.

| Step | What you do | Time |
|---|---|---|
| 1 | In the Chat tab: `Find dentists in Austin`, pick **100**, click **Start** | about eight minutes with emails |
| 2 | The same for Dallas, then Houston, each in its own tab | about eight minutes each |
| 3 | Chat offers to combine the three searches; accept, and the new table has a column saying which search each row came from | one minute |
| 4 | On the results page, type in chat: `Only name, phone, email, website and city, rows with a phone` | one minute |
| 5 | **Export as** → **Google Sheets**, share the link | one minute |

Around 300 rows in under half an hour of runs, most of it unattended. Rows without an email keep their phone and website; tell the client that up front.

The delivery note, which you'll reuse for every order:

```
Dentists in Austin, Dallas and Houston: 294 businesses.
Collected on 21 October 2026 from Google Maps listings and each business's own website.
Columns: Business Name, Phone, Email, Website, City.
Emails are the ones the businesses publish; 61% of rows have one.
Please honour requests to stop and the anti-spam rules where you send.
```

The 61% is this order's figure, not a promise. Put each order's own number in its note.

## Is selling these lists legal where I live?

For business listings and published business contacts, usually yes; the rules are about what the client does next.

A lead service lives on trust, so hold three lines. Collect businesses and their published contact details, not people's personal profiles. Tell clients what the data is (what businesses publish) and when it was collected. Remind them that outreach has rules: anti-spam law where they send, and privacy law where the businesses are, with stricter rules in Europe and a few other places. Don't sell lists from sites that need a sign-in or forbid collection in their terms. The [plain-words guide to web scraping and the law](/web-scraping-legal) explains which rules apply and links the sources; it isn't legal advice, and a service that sells data should read it and, for a first contract, ask a lawyer.

## What this means for you

- **The product is the sheet, and the sheet takes minutes.** Your value is choosing the market, cleaning the rows and delivering on time, not the collecting.
- **Honesty is the pitch.** The collected-on date and the email coverage, stated up front, are what make a client order again.
- **Repeat work comes from a template.** The same columns, the same note and a rerun from History turn one order into a monthly line.

## Delivering a monthly refresh

The refresh is a rerun from History plus one comparison, and it's the order that repeats.

1. Open the side panel's **History** and find last month's table for the client. Note its row count and date.
2. Run the same searches again: the same business type, the same cities, the same count on the card. Chat combines them as before.
3. Export both tables and compare the Website column, because website addresses change less than business names. A row in this month's table with a website that wasn't in last month's is a new business.
4. Deliver two sheets: the full refreshed list, and the new businesses on their own. The second sheet is the one clients call about, because nobody else has reached those businesses yet.
5. Update the delivery note with this month's date, row count and email coverage.

A refresh for three cities takes the same half hour of runs as the first order, most of it unattended, which is what makes it a monthly line rather than a monthly chore.

## Mistakes that lose the second order

Five things that turn a good first delivery into a last one.

- **One broad search for a big city.** Google Maps returns a limited set per search. "Dentists in Houston" is a sample; dentists by neighbourhood or zip code is the list. Run several and combine them.
- **Promising emails for every row.** Many businesses publish none. State the coverage, and the client trusts the rows that have one.
- **Skipping the first-page check.** Before a long run, look at the first twenty rows. A wrong list picked on the page costs you an afternoon.
- **Selling what a site forbids.** A directory behind a sign-in, or one whose terms forbid collection, isn't a product. There are enough public sources.
- **No date on the sheet.** A list without a collected-on date is a list the client can't judge. Put the date in the file name and in a column.

## What you need besides the extension

A short kit, most of it free.

| Tool | What it's for | Cost |
|---|---|---|
| Web Scraper Pro | Collecting the businesses and their contact details | Free, no paid plan |
| A spreadsheet | Combining runs, removing repeats, the client's column order | Google Sheets is free; Excel if the client wants a file |
| An email verification service | Checking that published addresses still accept mail before a campaign | Paid per thousand; only for clients who send at volume |
| A delivery note template | Date, sources, coverage, the rules; reused every order | A text file |

## The first week

One business type, three cities, one sample sent to ten prospects.

Build a sample list for a line of work you understand. Send the first twenty rows free to ten businesses that sell to that line, with a line saying the full list is ready. One reply is a client; two is a service. From there, the extension is the quick part. The [lead generation use case](/use-cases/lead-generation) walks the whole job.
