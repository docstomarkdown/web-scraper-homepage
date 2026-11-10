---
title: "What Is Web Scraping? A Plain-Language Guide with Examples"
description: "Web scraping is collecting data from web pages into a spreadsheet instead of copying by hand. How it works, a worked example, and when it's allowed."
status: draft
date: 2026-10-21
updated: 2026-11-10
author: vikram
category: Explainers
tags: [web scraping, basics, no code]
# Facts checked against chrome-extension-source on 2026-11-10: List tab cards "List 1", "N items on this page", hover outlines the list on the page: components/scraper/ListTab.tsx (handleListHover)
# Facts checked against chrome-extension-source on 2026-11-10: "Collect more pages", "Stop after" defaults to 5, button "Collect from 5 pages": components/scraper/ListTab.tsx (useState("5"))
# Facts checked against chrome-extension-source on 2026-11-10: rows open on a results page and are saved to History; Export as Google Sheets, Microsoft Excel, CSV, JSON: lib/tools/helpTopics.json (collect_list, download_file)
# Facts checked against chrome-extension-source on 2026-11-10: "Choose an item on the page" fallback: components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: History keeps 500 lists in the browser profile: lib/db/historyService.ts
# Facts checked against chrome-extension-source on 2026-11-10: chat sends your messages and the kind of page; collected rows aren't sent; messages and the page's web address are recorded to improve chat: lib/chat/chatClient.ts, lib/tools/helpTopics.json (data_privacy)
# Facts checked against chrome-extension-source on 2026-11-10: Google Sheets export makes a new sheet in the Google account Chrome is signed in with: products/web-scraper-pro.md (drive.file)
---

Web scraping is collecting information from web pages into a spreadsheet, using software instead of copy and paste. A page shows you 20 hotels with prices; a scraper reads the page and gives you a table with a Hotel column and a Price column.

That's the whole idea. The rest is how, how much, and when you're allowed to.

## How web scraping works

A program loads a page, finds the repeating parts, reads the pieces it wants, and writes them as rows and columns.

Every list on the web has a structure, even when you can't see it. Each product card holds a name, a price and a link in the same places; each search result holds a title, a snippet and a link. A scraper uses that repetition:

1. It loads the page, the way your browser does.
2. It finds the repeating items, such as the product cards.
3. From each item it reads the parts you want: the name, the price, the link.
4. It writes one row per item and, if the list continues, moves to the next page and repeats.

The output is a table: one row per item, however many items the list holds. The data was always on the page; scraping changes the form, not the content.

## Three ways people scrape

By writing code, by using a visual tool, or by using a browser extension that works on the page you're looking at.

| Way | How it feels | Good for | The cost |
|---|---|---|---|
| Code (Python, JavaScript) | You write a small program that fetches pages and picks values out | Developers, crawls that run every night, rules of your own | Setup, repairs when the site changes, getting blocked |
| Visual scraping tools | You click the parts of a page you want to save as a template, then run the template | People who collect the same site again and again | Learning the tool, fixing templates when layouts change |
| Browser extensions | You open the page and the extension reads the list in front of you, or you type what you want | Anyone with a page open and a spreadsheet in mind | Runs while your browser is open |

Web Scraper Pro is the third kind, and it's free with no paid plan. It finds the list on the page, names the columns, follows the next pages, and exports to Excel, CSV, JSON or Google Sheets. Or you type what you want in plain words.

The reading happens in your browser, and the rows you collect stay there unless you export them. If you use chat, your messages go to our servers so it can work out the job; the rows don't.

## What people scrape, with examples

Lists that someone needs as a table: businesses, products, listings, jobs, papers, reviews.

- **Lead lists.** A Google Maps search for dentists in a city, turned into rows with name, phone, website and address, plus any email published on each business's own site. See [lead generation](/use-cases/lead-generation).
- **Prices and products.** A competitor's category on Amazon or an independent store, with price, rating and review count, for a comparison sheet. See [e-commerce research](/use-cases/ecommerce).
- **Property listings.** The homes for sale in a zip code, with price, address, beds, baths and size. See [real estate](/use-cases/real-estate).
- **Research.** Google Scholar results into a citation table, or the text of 30 pages for a report. See [research](/use-cases/research).
- **Job postings.** A company's careers page as a list of roles with location and link.
- **Reviews.** A product's reviews across every page, to read the complaints first.

## A worked example

Collecting a store's category page into Excel with the extension, click by click.

1. Open the category page in Chrome and click the Web Scraper Pro icon. A panel opens on the right of the browser; this is the side panel.
2. Open its **List** tab. Each list it finds shows as a card, such as **List 1** with the number of items on this page. Hover a card and that list is outlined on the page; click the one with the products.
3. Choose **Collect more pages**, then **Next page**. Leave **Stop after** at 5 pages and click **Collect from 5 pages**.
4. The rows open on a results page, one row per product, and are saved to History. Click **Export as** and choose **Microsoft Excel**.

If the List tab doesn't find the products as one list, choose **Choose an item on the page** and click one product. Similar items are picked with it.

![](visual:ext/list-tab-detected)

What the sheet can look like. On a store without a ready-made setup, the columns are named from the page, so yours may differ.

Sample data:

| Name | Price | Rating | Link |
|---|---|---|---|
| Sample Trail Shoe | 89.00 | 4.6 | shop.example/trail-shoe |
| Sample Rain Jacket | 120.00 | 4.2 | shop.example/rain-jacket |
| . . . | . . . | . . . | . . . |

The [lists page](/list-scraper) shows each step.

## Where your data goes

Into your browser, then into the file you export. Nowhere else, unless you send it.

The table is kept in the extension's History, inside your Chrome profile, which holds your last 500 lists. Export to Excel or CSV saves a file on your computer. Export to Google Sheets creates a new sheet in the Google account Chrome is signed in with.

What you type in chat is sent to our servers so the AI can work out which job to run, along with the kind of page you're on; the rows you collect are not. We record your messages and the page's web address to improve chat. The [privacy policy](/privacy-policy) has the details.

## What web scraping is not

It isn't hacking, it isn't an API, and it isn't a way around a sign-in.

- **Not hacking.** Scraping reads what a page already shows to any visitor. Getting past a password, a paywall or a bot check is a different act, and the law treats it differently.
- **Not an API.** An API is a door a site builds for programs, with its own rules and limits. Scraping reads the human-facing page. When a site offers an API that returns what you need, that's usually the better route.
- **Not copying a site.** Collecting facts for analysis is one thing; republishing someone's text, photos or reviews is another, and copyright applies to the second.
- **Not a database.** A database is where a site keeps everything, including what it never shows. Scraping only ever sees the page.

## Is web scraping legal?

The answer depends on where you are, what you collect and what you do with it. The site's terms, personal data and copyright decide most cases.

Two US court decisions are the ones people cite. *Van Buren* (2021) held that the US computer-fraud law doesn't make it a crime to use information you're allowed to reach for a purpose the owner dislikes.

*hiQ v. LinkedIn* (2022) found that collecting publicly available pages likely isn't access "without authorization" under that law.

A site's terms of service can still make scraping a breach of contract, which means breaking an agreement you accepted, when you've signed in and agreed to them. Privacy law applies to data about people wherever they live, and copyright protects writing and images.

Our [guide to the law](/web-scraping-legal) covers each with sources. It's general information, not legal advice.

## Scraping and "data scraping": the same thing?

Mostly. "Data scraping" is the wider term; web scraping is data scraping from web pages.

Data scraping also covers pulling text out of PDFs, reading screens of old software, or extracting values from documents. The tools above are web tools, built for pages in a browser.

## Five mistakes first-timers make

Each one is avoidable once you know it.

1. **Collecting the wrong list.** A page often holds several: the results, a row of sponsored items, "people also viewed". Hover the card in the List tab and check the outline on the page before you click.
2. **Collecting one page and calling it done.** The List tab collects this page only until you choose **Collect more pages** and set how many.
3. **Running a large job first.** Collect one page, check the columns, then collect 50. A wrong column is quicker to fix on one page than on 50.
4. **Treating rounded numbers as exact.** A card that says 1.2K reviews is rounded by the site. The product's own page has the exact count.
5. **Reusing data without reading the rules.** A list for your own research is one thing; mailing everyone on it is another, and anti-spam law applies to the second.

## Questions people ask

**Do I need to know how to code?** No. The extension route in the worked example has no code; you click the list and export.

**Is web scraping free?** The extension is free with no paid plan. Code costs your time; visual tools and cloud services each list their own prices.

**Can I scrape a site I have to sign in to?** With an extension, yes, because it reads what your browser shows once you're signed in. The site's terms for that account decide what you may do with the data.

**Can it see data the site hides?** No. Scraping reads the page as a visitor sees it. Anything behind a paywall, a password or a verification check you haven't completed stays behind it.

**Is it the same as using an API?** No. An API is a door the site built for programs, while scraping reads the page made for people. When a site offers an API with what you need, use it.

**How many rows can I collect?** As many as the site shows. Many sites stop showing results after a set number of pages, so narrow the search and run it more than once.

## What this means for you

- If you've ever copied a list from a web page into a spreadsheet by hand, that job is scraping, and a free extension can do it for you.
- Start with a real list you'd otherwise copy, open it in Chrome, and try the no-code route first. The [lists page](/list-scraper) shows how.
- Keep to public pages and your own research, and read the site's rules before you reuse what you collected. If the job turns out to need a nightly crawl, you'll know what the data looks like before anyone builds anything.

## Sources

- *Van Buren v. United States*, US Supreme Court, 2021: [supremecourt.gov](https://www.supremecourt.gov/opinions/20pdf/19-783_k53l.pdf)
- *hiQ Labs v. LinkedIn*, 9th Cir. 2022: [ca9.uscourts.gov](https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf)
- Web Scraper Pro's data handling: the [privacy policy](/privacy-policy).
