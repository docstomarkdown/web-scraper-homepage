---
title: "Web Scraper Pro 1.3.0: Emails in the Same Google Maps Run"
description: "Version 1.3.0 reads each business's website during a Google Maps search, so emails, phones and social links land in the same table. Chat collects every page."
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Product updates
tags: [release, maps leads, chat, emails]
---

Version 1.3.0 of Web Scraper Pro is on the Chrome Web Store, and Chrome installs it for you: extensions update on their own within a day or so, and you can check your version under the extension's name at `chrome://extensions`. The headline change is one many of you asked for. A Google Maps search now comes back with each business's email, website phone numbers and social links, read from the business's own website during the same run. Chat learned three things too: collecting every page of a list, tidying the last collection in plain words, and combining several searches into one table.

## Emails in the same run

Search Google Maps as before, and the Emails column fills in while the businesses are collected, with no second step.

Google Maps itself never lists an email. Until now you collected the businesses, then ran a second job over their websites. In 1.3.0 the extension reads each business's website and one linked Contact or About page during the Google Maps run, and adds what it finds to that business's row:

| Column | What it holds |
|---|---|
| Emails | Every email found, the first shown with a "+N more" button for the rest |
| Website phones | Phone numbers from the site, next to the one Google Maps lists |
| Faxes | Fax numbers, in their own column |
| LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest | One column per network found |

Two honest notes. Many small businesses publish no email at all; those rows keep their phone and website from Google Maps and leave Emails empty. And reading each site takes time: 20 businesses with emails take about a minute and a half, 50 about four minutes, 200 about fifteen. It's on by default. To turn it off, open the side panel's Settings (the gear icon), then **Results**, and switch off **Add emails from their websites**, or add "no emails" to a chat request.

The same reader now works on any saved table with a Website column: open it from **History** and click **Add contact details** on its results page. The [emails and contacts page](/email-extractor) has the details. If Google Maps is the only site you collect from, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only, with its own guides for Maps lead lists.

## Try it in two minutes

1. Open a new tab and click the Web Scraper Pro icon next to the address bar. The side panel opens on the right of the browser.
2. Open the **Chat** tab, the one where you type what you want. Type `Find dentists in Austin`, pick **20** on the card that appears, and click **Start**.
3. A line in the chat counts the run: `12 of 20 · 5 with emails`. In about a minute and a half, click **View results** and scroll right to the Emails column.

If the Emails column is missing, **Add emails from their websites** is off in Settings → Results, or the request said "no emails".

## Chat does more of the job

Chat now collects every page, reshapes the last collection and merges searches, each from a card or a sentence.

- **Every page.** After collecting the page you're on, a "What next" card (the suggestions chat shows under a result) offers **Collect every page**. It runs the List tab's own paging, so Next page, Load more and endless scrolling all work.
- **Tidying.** With a results tab in front, say "only name, phone and rating, sorted by rating" and the table changes to match. The download matches what's shown.
- **Combining.** Searched three cities? A card combines the conversation's searches or lists into one new table.
- **One question, once.** Before a Google Maps search, a card asks how many businesses to collect: 20, 50, 100, 200 or a number you type. It remembers the answer; change it in Settings.

## Cleaner tables and files

Fewer repeats, better order, and numbers that behave in a spreadsheet.

- Repeated rows are left out by default. Sponsored rows and businesses without a website stay in unless you say otherwise.
- Google Maps leads are saved best rated first, which weighs the review count too, so 4.8 from 1,200 reviews comes before 5.0 from 3. Products keep the site's order. Both are a setting.
- Exports write prices, ratings and counts as numbers, so the sheet sorts and sums them. The format you used last comes first in the Export as menu.
- A collected cell that starts like a spreadsheet formula (an equals sign, for example) is written to Sheets and CSV as plain text, so nothing in a downloaded file can run on its own.

## Smaller things worth knowing

- Results tables order their columns by the kind of site when the site sets no order, and product pages on the big stores can carry site-specific fields.
- A Google Maps run paces itself unevenly and slows down when Google Maps stops answering, so a long run finishes instead of being cut off.
- Browser notifications are now optional: Chrome asks for that permission only when you turn notifications on in Settings.

## What this means for you

- **A lead list is one run now.** Search, and the emails come with it; the second pass over websites is gone.
- **You can run the whole job from chat.** Collect, collect every page, tidy and combine, in sentences.
- **Nothing to pay and nothing to set up.** The update arrives on its own, the extension stays free with no paid plan, and the new columns are on by default.

The full list is on the [What's new](/changelog) page. If something in 1.3.0 doesn't behave as described here, [contact the founder](/support) from the side panel; the message arrives with the page you were on.
