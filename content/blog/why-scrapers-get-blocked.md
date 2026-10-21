---
title: "Why Websites Block Scrapers, and Why a Browser Extension Usually Isn't"
description: "Sites block scraping when traffic looks automated: too fast, from a server, without a real browser. What the defences are, why a tool that reads the page in your own Chrome window rarely trips them, and the lines you shouldn't cross either way."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Explainers
tags: [blocking, bot detection, browser extension]
---

**Answer:** websites block scrapers to protect their servers, their data and their terms, and they do it by spotting traffic that doesn't look like a person: hundreds of pages a minute, requests from a data centre, no real browser behind them. A browser extension that reads the page open in your own Chrome window produces the traffic of one person browsing, which is why it mostly works where scripts get blocked. This post explains the defences, the honest limits, and the two lines no tool should cross.

## What a site is protecting

**Answer:** its servers, its data, and the promises it made to its users.

- **Servers.** A script that loads ten pages a second costs the site real money and can slow it for everyone. Rate limits exist for this before anything else.
- **Data.** A site's listings, prices or reviews are its product. Terms of service usually forbid automated collection, and the site enforces them technically because it can't enforce them one visitor at a time.
- **Users.** A site that shows personal data behind a sign-in promised those users it would stay there. Login walls are the enforcement.

None of this is aimed at a person who copies twenty rows. It's aimed at volume and at automation that pretends to be a person.

## How blocking works

**Answer:** five signals, from the obvious to the subtle, each on its own enough to stop a script.

| Signal | What the site sees | What happens |
|---|---|---|
| Rate | Too many pages too fast from one address | Slowed, then refused |
| Origin | Requests from a cloud provider's address range | Refused or challenged |
| Browser fingerprint | No real browser: missing headers, no JavaScript run, no fonts, no screen | Challenged or served an empty page |
| Behaviour | No mouse, no scroll, identical timing between pages | A verification page |
| Account | Many pages while signed in, or a pattern the account never showed before | The account is limited or closed |

The challenge you'll have seen is the verification page: a box to tick, a puzzle, or "unusual traffic from your network". It's the site asking, "is there a person here?"

## Why a browser extension usually passes

**Answer:** because there is a person there.

A tool like Web Scraper Pro doesn't send its own requests. It reads the page your browser already loaded, in your Chrome window, with your cookies, your screen and your pace. To the site, the Maps search you collected looks like you searching Maps, because it was. The extension adds the reading, not the traffic.

Three things follow from that:

- **It works where scripts don't.** JavaScript-drawn pages, pages you're signed in to, sites that refuse data-centre traffic: your browser can see them, so the extension can read them.
- **It goes at a person's pace.** A Maps run opens each business in turn and slows down when Maps stops answering, instead of hammering the site until it's blocked. Bulk runs load one site after another in an embedded browser, not fifty at once.
- **It stops at a verification.** When a site shows a check, the extension stops and asks you to complete it in the tab. It never solves one for you, and it never pretends to be a different visitor.

## The honest limits

**Answer:** fewer blocks, not zero, and no way past a wall you shouldn't be behind.

- **Volume still matters.** Load two hundred Scholar pages in a sitting and Scholar may ask you to verify. Collect in reasonable runs and spread big jobs over time.
- **Some sites rate-limit everyone.** Large stores slow accounts that page through hundreds of listings quickly, whoever is doing it. Narrow the search instead of forcing through it.
- **A login wall stays a wall.** The extension reads what you can see once you're signed in, under that account's terms. It doesn't create accounts, share them, or read what the site hides from you.
- **A blocked page is a blocked page.** If a site has decided your address or account should see nothing, the extension sees nothing too. There is no proxy mode, and that's deliberate.

## The two lines

**Answer:** don't defeat a barrier, and don't take what you had to break in to see.

Reading a public page is lawful in most places; getting past a password, a paywall or a bot check to read it is where the law, and most sites' terms, turn against you. Our [guide to the law](/web-scraping-legal) covers the cases. A tool that offers to solve verifications, rotate identities or hide where you are is a tool for crossing those lines, and the answer to "will it get blocked?" becomes "should it?"

## What to do when you are blocked

**Answer:** slow down, narrow the job, complete the check yourself, or accept the no.

1. **Complete the verification in the tab**, then rescan and carry on. Most checks pass once.
2. **Narrow the search.** A zip code instead of a city; a category instead of the whole store. Fewer pages, fewer flags.
3. **Spread it out.** Collect the rest tomorrow. History keeps today's rows.
4. **Use the site's own export** if it offers one. Many directories and dashboards do, and it's the cleanest route.
5. **Stop.** If a site has made clear it doesn't want collection, the data isn't worth an account or a letter.

The point of running in your own browser is that you behave like a visitor, and visitors are welcome. Keep it that way and the blocking question mostly answers itself.
