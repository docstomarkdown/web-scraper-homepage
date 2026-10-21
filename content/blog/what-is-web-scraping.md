---
title: "What Is Web Scraping? A Plain-Language Explainer with Examples"
description: "Web scraping is collecting data from web pages into a structured file, such as a spreadsheet, instead of copying it by hand. What it is, how it works, what it's used for, what it isn't, and when it's allowed."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Explainers
tags: [web scraping, basics, no code]
---

Web scraping is collecting information from web pages into a structured form you can work with, usually a spreadsheet or a database, using software instead of copy and paste. A page shows you twenty hotels with prices; a scraper reads the page and gives you a table with a Hotel and a Price column. That's the whole idea. The rest is how, how much, and when you're allowed to.

## How web scraping works

A program loads a page, finds the repeating parts, reads the pieces it wants, and writes them as rows and columns.

Every list on the web has a structure, even when you can't see it. Each product card holds a name, a price and a link in the same places; each search result holds a title, a snippet and a link. A scraper uses that repetition:

1. It loads the page, the way your browser does.
2. It finds the repeating items, such as the product cards.
3. From each item it reads the parts you want: the name, the price, the link.
4. It writes one row per item and, if the list continues, moves to the next page and repeats.

The output is a table. Twenty products become twenty rows; a thousand become a thousand. The data was always on the page; scraping changes the form, not the content.

## Three ways people scrape

By writing code, by using a visual tool, or by using a browser extension that works on the page you're looking at.

| Way | How it feels | Good for | The cost |
|---|---|---|---|
| Code (Python, JavaScript) | You write a script that fetches pages and picks elements out | Developers, recurring crawls, custom logic | Setup, maintenance when the site changes, getting blocked |
| Visual scraping tools | You build a template of selectors by clicking elements, then run it locally or in the cloud | People who collect the same site repeatedly | Learning the tool, fixing templates when layouts change |
| Browser extensions | You open the page and the extension reads the list in front of you, or you describe what you want | Anyone with a page and a spreadsheet in mind | Runs while your browser is open; one site at a time |

Web Scraper Pro is the third kind. It finds the list on the page, names the columns, follows the next pages, and exports to Excel, CSV, JSON or Google Sheets; or you type what you want in plain words. Nothing is uploaded, because the reading happens in your browser.

## What people scrape, with examples

Lists that someone needs as a table: businesses, products, listings, jobs, papers, reviews.

- **Lead lists.** A search on Maps for dentists in a city, turned into rows with name, phone, website and address, plus the email from each business's own site. See [lead generation](/use-cases/lead-generation).
- **Prices and products.** A competitor's category on Amazon or an independent store, with price, rating and review count, for a comparison sheet. See [e-commerce research](/use-cases/ecommerce).
- **Property listings.** Every home for sale in a zip code, with price, beds, baths and size, refreshed weekly. See [real estate](/use-cases/real-estate).
- **Research.** Scholar search results into a citation table, or the clean text of thirty pages for a report. See [research and AI datasets](/use-cases/research).
- **Job postings.** A company's careers page as a list of roles with location and link.
- **Reviews.** A product's reviews across every page, to read the complaints first.

## What web scraping is not

It isn't hacking, it isn't an API, and it isn't a way around a login.

- **Not hacking.** Scraping reads what a page already shows to any visitor. Getting past a password, a paywall or a bot check is a different act, and the law treats it differently.
- **Not an API.** An API is a door the site built for programs, with its own rules and limits. Scraping reads the human-facing page. When a site offers an API that returns what you need, it's usually the better route.
- **Not copying a site.** Collecting facts for analysis is one thing; republishing someone's text, photos or reviews is another, and copyright applies to the second.

## Is web scraping legal?

Collecting public data for your own use is lawful in most places; the site's terms, personal data and what you do with the data decide the rest.

Two US decisions, *Van Buren* (2021) and *hiQ v. LinkedIn* (2022), established that reading public pages isn't a computer crime. Terms of service can still make scraping a breach of contract when you've agreed to them, privacy law applies to data about people wherever they live, and copyright protects writing and images. Our [guide to the law](/web-scraping-legal) covers each with sources; it's general information, not legal advice.

## Scraping and "data scraping": the same thing?

Mostly. "Data scraping" is the wider term; web scraping is data scraping from web pages.

Data scraping also covers pulling text out of PDFs, reading screens of old software, or extracting values from documents. When people search "data scraping vs web scraping", the practical answer is that the web is where almost all of it happens now, and the tools above are web tools.

## Where to start

With a page you already have open and a question you'd answer with a spreadsheet.

Pick a real list you'd otherwise copy by hand, open it in Chrome, and try the no-code route first; the [any-website guide](/guides/scrape-data-from-any-website-to-excel) takes about five minutes. If the job turns out to need a nightly crawl or an API, you'll know what the data looks like before you build anything.
