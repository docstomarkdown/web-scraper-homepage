---
title: "Web Scraper Pro 1.3.0: Emails Arrive in the Same Maps Run"
description: "Version 1.3.0 reads each business's website while it collects a Maps search, so emails, phone numbers and social links land in the same table. Chat now collects every page, tidies the last collection and combines searches."
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Product updates
tags: [release, maps leads, chat, emails]
---

Version 1.3.0 of Web Scraper Pro is on the Chrome Web Store. The headline change is one many of you asked for: a Maps search now comes back with each business's email, website phone numbers and social links, read from the business's own website during the same run. Chat learned three things too: collecting every page of a list, tidying the last collection in plain words, and combining several searches into one table.

## Emails in the same run

Search Maps as before, and the Emails column fills in while the businesses are collected, with no second step.

Maps itself never lists an email. Until now you collected the businesses, then ran a second job over their websites. In 1.3.0 the extension reads each business's website and one linked Contact or About page during the Maps run, and adds what it finds to that business's row:

| Column | What it holds |
|---|---|
| Emails | Every email found, the first shown with a "+N more" button for the rest |
| Website phones | Phone numbers from the site, next to the one Maps lists |
| Faxes | Fax numbers, in their own column |
| LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest | One column per network found |

Two honest notes. Many small businesses publish no email at all; those rows keep their phone and website from Maps and leave Emails empty. And reading each site takes time: 20 businesses with emails take about a minute and a half, 200 about 15 minutes. It's on by default; turn it off in Settings → Results, or add "no emails" to a chat request.

The same reader now works on any saved table with a Website column: open it from History and click **Add contact details** on its results page. The [Maps leads page](/maps-leads) and the [emails and contacts page](/email-extractor) have the details.

## Chat does more of the job

Chat now collects every page, reshapes the last collection, and merges searches, each from a card or a sentence.

- **Every page.** After collecting the page you're on, a What next card offers **Collect every page**. It runs the List tab's own paging, so Next page, Load more and endless scrolling all work.
- **Tidying.** With a results tab in front, say "only name, phone and rating, sorted by rating" and the table changes to match. The download matches what's shown.
- **Combining.** Searched three cities? A card combines the conversation's searches or lists into one new table.
- **One question, once.** Before a Maps search, a card asks how many businesses to collect: 20, 50, 100, 200 or a number you type. It remembers the answer; change it in Settings.

## Cleaner tables and files

Fewer repeats, better order, and numbers that behave in a spreadsheet.

- Repeated rows are left out by default. Sponsored rows and businesses without a website stay in unless you say otherwise.
- Maps leads are saved best rated first, which weighs the review count too, so 4.8 from 1,200 reviews comes before 5.0 from 3. Products keep the site's order. Both are a setting.
- Exports write prices, ratings and counts as numbers, so the sheet sorts and sums them. The format you used last comes first in the Export as menu.
- Collected text that looks like a formula is written to Sheets and CSV as text, never run.

## Smaller things worth knowing

- Results tables order their columns by the kind of site when the site sets no order, and product pages on the big stores can carry site-specific fields.
- A Maps run paces itself unevenly and slows down when Maps stops answering, so a long run finishes instead of being cut off.
- Notifications are now an optional permission, asked for only when you turn them on.

The full list is on the [What's new](/changelog) page. If something in 1.3.0 doesn't behave as described here, [contact the founder](/support) from the side panel; the message arrives with the page you were on.
