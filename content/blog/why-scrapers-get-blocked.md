---
title: "Why Websites Block Scrapers (and Why Extensions Aren't)"
description: "Sites block traffic that doesn't look like a person. What the defences are, why your own Chrome window passes them, and whether your account is at risk."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Explainers
tags: [blocking, bot detection, browser extension]
---

Websites block scrapers to protect their servers, their data and their users, and they do it by spotting traffic that doesn't look like a person: hundreds of pages a minute, requests from a data centre, no real browser behind them. A browser extension that reads the page open in your own Chrome window produces the traffic of one person browsing, which is why it mostly works where scripts get blocked. This post explains the defences, the honest limits, answers "will my account be closed?", and names the two lines no tool should cross.

## Words used on this page

- **A script** is a small program that fetches pages on its own, without a browser or a person.
- **A data centre** is a building full of servers. Cloud services run there, and a site can tell when a request comes from one.
- **A rate limit** is a cap a site puts on how many pages one visitor may load in a minute.
- **A browser fingerprint** is the set of small details a real browser sends with every request: its name, screen size, fonts, language. A script sends few or none.
- **A proxy** is another computer that makes requests for you, so the site sees its address instead of yours. Tools that "rotate identities" switch between many proxies to hide that one visitor is behind them all.

## What a site is protecting

Its servers, its data, and the promises it made to its users.

- **Servers.** A script that loads ten pages a second costs the site money and can slow it for everyone. Rate limits exist for this before anything else.
- **Data.** A site's listings, prices or reviews are its product. Terms of service usually forbid automated collection, and the site enforces them with software because it can't enforce them one visitor at a time.
- **Users.** A site that shows personal details behind a sign-in promised those users it would stay there. Sign-in walls are the enforcement.

None of this is aimed at a person who copies twenty rows. It's aimed at volume and at automation that pretends to be a person.

## How blocking works

Five signals, from the obvious to the subtle. Any one of them is enough to stop a script.

| Signal | What the site sees | What happens |
|---|---|---|
| Rate | Too many pages too fast from one address | Slowed, then refused |
| Origin | Requests from a data centre's address range | Refused or challenged |
| Browser fingerprint | No real browser: missing details, no JavaScript run, no fonts, no screen | Challenged, or served an empty page |
| Behaviour | No mouse, no scroll, identical timing between pages | A verification page |
| Account | Many pages while signed in, or a pattern the account never showed before | The account is limited or closed |

The challenge you'll have seen is the verification page: a box to tick, a puzzle, or "unusual traffic from your network". It's the site asking "is there a person here?".

## Why a browser extension usually passes

Because there is a person there.

A tool like Web Scraper Pro doesn't send its own requests. It reads the page your browser already loaded, in your Chrome window, with your cookies, your screen and your pace.

To the site, the Google Maps search you collected looks like you searching Google Maps, because it was. The extension adds the reading, not the traffic.

Three things follow from that:

- **It works where scripts don't.** Pages drawn by JavaScript, pages you're signed in to, sites that refuse data-centre traffic: your browser can see them, so the extension can read them.
- **It goes at a person's pace.** A Google Maps run opens each business in turn, with gaps of about one to two seconds, and slows down further when Google Maps answers slowly instead of hammering the site. Bulk runs load one site after another in an embedded browser, never fifty at once.
- **It stops at a verification.** When a site shows a check, the extension stops and asks you to complete it in the tab. It never solves one for you, and it never pretends to be a different visitor. There's no proxy mode, and that's deliberate.

## Will my own account be closed?

Not for reading pages in your own browser at a person's pace, which is all the extension does. The risk comes from volume and from automation that acts on your behalf.

The extension never signs in for you, never posts, never messages, and never changes anything on a site. It reads what's on the screen.

Sites close accounts for sending messages in bulk, scraping other members' private details, or loading thousands of pages an hour. None of those is something the extension does, and the first two are things you shouldn't do with any tool.

Keep runs to a search at a time, complete a verification when one appears, and stop if a site tells you to slow down. Then your account looks like what it is: you, browsing.

## The honest limits

Fewer blocks, not zero, and no way past a wall you shouldn't be behind.

- **Volume still matters.** Load two hundred Google Scholar pages in a sitting and Scholar may ask you to verify. Collect in reasonable runs and spread big jobs over days.
- **Some sites rate-limit everyone.** Large stores slow accounts that page through hundreds of listings quickly, whoever is doing it. Narrow the search instead of forcing through it.
- **A sign-in wall stays a wall.** The extension reads what you can see once you're signed in, under that account's terms. It doesn't create accounts, share them, or read what the site hides from you.
- **A blocked page is a blocked page.** If a site has decided your address or account should see nothing, the extension sees nothing too.

## The two lines

Don't defeat a barrier, and don't take what you had to break in to see.

Reading a public page is lawful in most places. Getting past a password, a paywall or a bot check to read it is where the law, and most sites' terms, turn against you; our [guide to the law](/web-scraping-legal) covers the cases. A tool that offers to solve verifications, rotate identities or hide where you are is a tool for crossing those lines, and the question "will it get blocked?" becomes "should it?".

## What a block looks like in practice, and the recovery

A concrete case: collecting 20 pages of a Zillow zip-code search. Around page 12, Zillow shows a "press and hold" check instead of the next page.

1. The extension stops and the panel says the site is showing a verification page. The 11 pages already collected, about 440 homes, are saved in History, where every table you've collected is kept.
2. You press and hold in the Zillow tab, exactly as a visitor would. Zillow lets the page through.
3. In the **List** tab you click **Rescan**, choose **Collect more pages** again, and collect from the page you're on. The new rows arrive as a second table; the Zillow property id in both lets you put them together.

Total cost of the block: one click and about a minute. The alternative, a script that solves the check or switches address, is what Zillow's terms and the law object to.

For scale: a Google Maps run with emails reads one business's website roughly every five seconds, so 50 businesses take about four minutes and 200 about fifteen. That pace is deliberate, and it's why those runs rarely see a check at all.

## What to do when you are blocked

Slow down, narrow the job, complete the check yourself, or accept the no.

1. **Complete the verification in the tab**, then rescan and carry on. Most checks pass once.
2. **Narrow the search.** A zip code instead of a city; a category instead of the whole store. Fewer pages, fewer flags.
3. **Spread it out.** Collect the rest tomorrow. History keeps today's rows.
4. **Use the site's own export** if it offers one. Many directories and dashboards do, and it's the cleanest route.
5. **Stop.** If a site has made clear it doesn't want collection, the data isn't worth an account or a letter.

## Questions people ask

**Does the extension use proxies or change my address?** No. It reads the page in your own browser under your own address. There's no setting for anything else, on purpose.

**Why did I get a verification page when I was only on page 12?** Because 12 pages in a few minutes is more than most visitors read, and the site asked whether a person was there. Press and hold, tick the box or solve the puzzle, then carry on.

**Can I scrape a site that says "no bots" in its terms?** The terms decide what the site may object to, and the law decides what you may do; the [legal guide](/web-scraping-legal) covers both. Reading public pages for your own research is lawful in most places. Republishing the data or mailing the people on it is where the rules bite.

**What's robots.txt?** A file a site publishes to say which parts crawlers may visit. It's written for search engines, but it's also the plainest statement of what the site minds; if a section is marked off, treat it as closed.

**Will a VPN help?** It changes your address, which is what the "rotate identities" tools do, and it moves you from "visitor" to "someone hiding". Narrow the job and slow down instead.

**What happens to a run that gets blocked halfway?** Everything collected so far is saved in History. Complete the check, rescan, and collect the rest; the link or id column lets you join the two tables.

## What this means for you

- Blocking is aimed at scripts and volume, not at a person reading pages. Collect in your own browser, at a human pace, and most of it never applies to you.
- Your account is safe as long as the tool only reads. The extension never signs in, posts or messages for you; keep it that way with any tool you pick.
- A verification page is a question, not a punishment. Answer it in the tab, carry on, and keep runs small enough that it rarely asks.

## Sources

- Robots Exclusion Protocol, RFC 9309 (2022), the standard for the robots.txt file sites use to say what may be crawled: [rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9309)
- *hiQ Labs v. LinkedIn*, 9th Cir. 2022, on scraping public pages: [ca9.uscourts.gov](https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf)
- Web Scraper Pro's own behaviour on verifications and pacing: the [Google Maps leads](/maps-leads) and [bulk runs](/bulk-scraper) pages, checked against release 1.3.0.
