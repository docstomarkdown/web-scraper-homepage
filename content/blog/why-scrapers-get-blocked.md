---
title: "Why Websites Block Scrapers (and Why Extensions Aren't)"
description: "Sites block traffic that doesn't look like a person. What the defenses are, why your own Chrome window passes them, and whether your account is at risk."
status: draft
date: 2026-10-21
updated: 2026-11-10
author: vikram
category: Explainers
tags: [blocking, bot detection, browser extension]
# Facts checked against chrome-extension-source on 2026-11-10: Google Maps runs open businesses with uneven gaps of 0.6 to 1.7 seconds, wait 4s up to 30s after misses, change nothing else, and a page Google blocks stays blocked: DECISIONS.md D-034, lib/content/mapLeads/pacing.ts
# Facts checked against chrome-extension-source on 2026-11-10: bulk runs go through sites one after another in a browser inside the bulk page, and wait at a Google verification ("Complete the verification in the browser below. This URL will resume automatically."): lib/bulk/useBulkRunner.ts, entrypoints/bulk/main.tsx
# Facts checked against chrome-extension-source on 2026-11-10: List tab "Stop and save", chat Stop, and what was collected so far is kept: lib/tools/helpTopics.json (stop_collection); "Rescan page": components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: no proxy setting in the extension (proxy appears only in a cloud error comment): lib/cloud/submitCloudJob.ts
# Facts checked against chrome-extension-source on 2026-11-10: Zillow setup has a Zillow Property ID column: configs-prod/site-column-mappings/zillow.com.json
# Facts checked against chrome-extension-source on 2026-11-10: "Sites can slow down or block accounts that load many pages quickly, so split big jobs into smaller runs": lib/tools/helpTopics.json (safe_and_legal)
---

Websites block scrapers to protect their servers, their data and their users, and they do it by spotting traffic that doesn't look like a person: hundreds of pages a minute, requests from a data center, no real browser behind them. A browser extension that reads the page open in your own Chrome window produces the traffic of one person browsing, which is why it often works where scripts get blocked. This post explains the defenses, the limits, the question "will my account be closed?", and the 2 lines no tool should cross.

## Words used on this page

- **A script** is a small program that fetches pages on its own, without a browser or a person.
- **A data center** is a building full of servers. Cloud services run there, and a site can tell when a request comes from one.
- **A rate limit** is a cap a site puts on how many pages one visitor may load in a minute.
- **A browser fingerprint** is the set of small details a real browser sends with every request: its name, screen size, fonts, language. A script sends few or none.
- **A proxy** is another computer that makes requests for you, so the site sees its address instead of yours. Tools that "rotate identities" switch between many proxies to hide that one visitor is behind them all.

## What a site is protecting

Its servers, its data, and the promises it made to its users.

- **Servers.** A script that loads 10 pages a second costs the site money and can slow it for everyone. Rate limits exist for this before anything else.
- **Data.** A site's listings, prices or reviews are its product. Many sites' terms of service forbid automated collection, and the site enforces them with software because it can't enforce them one visitor at a time.
- **Users.** A site that shows personal details behind a sign-in promised those users it would stay there. Sign-in walls are the enforcement.

None of this is aimed at a person who copies 20 rows. It's aimed at volume and at automation that pretends to be a person.

## How blocking works

Five signals, from the plainest to the subtlest. Any one of them is enough to stop a script.

| Signal | What the site sees | What happens |
|---|---|---|
| Rate | Too many pages too fast from one address | Slowed, then refused |
| Origin | Requests from a data center's address range | Refused or challenged |
| Browser fingerprint | No real browser: missing details, no JavaScript run, no fonts, no screen | Challenged, or served an empty page |
| Behavior | No mouse, no scroll, identical timing between pages | A verification page |
| Account | Many pages while signed in, or a pattern the account never showed before | The account is limited or closed |

The challenge you'll have seen is the verification page: a box to tick, a puzzle, or "unusual traffic from your network". It's the site asking "is there a person here?".

## Why a browser extension often passes

Because there is a person there.

A tool like Web Scraper Pro doesn't send its own requests. It reads the page your browser already loaded, in your Chrome window, with your cookies, your screen and your pace.

To the site, the Google Maps search you collected looks like you searching Google Maps, because it was. The extension adds the reading, not the traffic.

Three things follow from that:

- **It works where scripts don't.** Pages drawn by JavaScript, pages you're signed in to, sites that refuse data-center traffic: your browser can see them, so the extension can read them.
- **It keeps a steady pace.** A Google Maps run opens each business in turn, with uneven gaps of 0.6 to 1.7 seconds. When details stop loading, it waits longer, from 4 seconds up to 30, until they load again. Bulk runs go through sites one after another, in a browser inside the bulk page.
- **It leaves verifications to you.** In a bulk run, when Google shows a verification, the run waits and asks you to complete it in the browser below, then resumes. The extension never solves a check for you, and it has no proxy setting, so it never appears as a different visitor.

## Will my own account be closed?

The risk comes from volume and from automation that acts on your behalf. Reading pages in your own browser in modest runs is what any visitor does.

The extension never signs in for you, never posts, never messages, and never changes anything on a site. It reads what's on the screen.

Sites close accounts for sending messages in bulk, collecting other members' private details, or loading pages far faster than a person would. The extension doesn't send messages, and the first two are things you shouldn't do with any tool.

Sites can still slow down or block accounts that load many pages quickly, so split big jobs into smaller runs. Complete a verification when one appears, and stop if a site tells you to slow down.

## The limits

Fewer blocks, not zero, and no way past a wall you shouldn't be behind.

- **Volume still matters.** Google Scholar can ask for a verification during a long bulk run, which is why the bulk page waits for you to complete it. Collect in smaller runs and spread big jobs over days.
- **Some sites rate-limit everyone.** A site can slow any account that pages through many listings quickly, whoever is doing it. Narrow the search instead of forcing through it.
- **A sign-in wall stays a wall.** The extension reads what you can see once you're signed in, under that account's terms. It doesn't create accounts, share them, or read what the site hides from you.
- **A blocked page is a blocked page.** If a site has decided your address or account should see nothing, the extension sees nothing too.

## The two lines

Don't defeat a barrier, and don't take what you had to break in to see.

Getting past a password, a paywall or a bot check to read it is where the law, and most sites' terms, turn against you; our [guide to the law](/web-scraping-legal) covers the cases. A tool that offers to solve verifications, rotate identities or hide where you are is a tool for crossing those lines, and the question "will it get blocked?" becomes "should it?".

## What a block looks like, and the recovery

Take a multi-page Zillow search collected from the List tab. If Zillow shows a verification check instead of the next page partway through, recover like this:

1. Click **Stop and save**. What was collected so far is kept in History, where every table you collect is saved.
2. Complete the check in the Zillow tab, as any visitor would.
3. In the **List** tab, click **Rescan page**, choose **Collect more pages** again, and collect from the page you're on. The new rows arrive as a second table; the **Zillow Property ID** column in both lets you put them together.

The alternative, a script that solves the check or switches address, is what sites' terms and the law object to.

## What to do when you are blocked

Slow down, narrow the job, complete the check yourself, or accept the no.

1. **Complete the verification in the tab**, then rescan and carry on.
2. **Narrow the search.** A zip code instead of a city; a category instead of the whole store. Fewer pages means fewer requests.
3. **Spread it out.** Collect the rest tomorrow. History keeps today's rows.
4. **Use the site's own export** if it offers one. It's the cleanest route.
5. **Stop.** If a site has made clear it doesn't want collection, the data isn't worth an account or a letter.

## Questions people ask

**Does the extension use proxies or change my address?** No. It reads the page in your own browser under your own address. There's no setting for anything else, on purpose.

**Why did I get a verification page partway through a list?** The site decided to ask whether a person was there, often after many pages in a short time. Complete the check in the tab, then carry on.

**Can I scrape a site that says "no bots" in its terms?** The terms decide what the site may object to, and the law decides what you may do; the [legal guide](/web-scraping-legal) covers both. Republishing the data or mailing the people on it is where the rules are strictest. This isn't legal advice.

**What's robots.txt?** A file a site publishes to say which parts crawlers may visit. It's written for search engines, but it's also the plainest statement of what the site minds; if a section is marked off, treat it as closed.

**Will a VPN help?** It changes your address, which is what the "rotate identities" tools do, and it moves you from "visitor" to "someone hiding". Narrow the job and slow down instead.

**What happens to a run that gets blocked halfway?** Stop it, and what was collected so far is kept in History. Complete the check, rescan, and collect the rest; a link or ID column lets you join the 2 tables.

## What this means for you

- Blocking is aimed at scripts and volume, not at a person reading pages. Collect in your own browser, in modest runs.
- Keep any tool to reading. The extension doesn't sign in, post or message for you; keep it that way with any tool you pick.
- A verification page is a question, not a punishment. Answer it in the tab, carry on, and keep runs small.

## Sources

- Robots Exclusion Protocol, RFC 9309 (2022), the standard for the robots.txt file sites use to say what may be crawled: [rfc-editor.org](https://www.rfc-editor.org/rfc/rfc9309)
- *hiQ Labs v. LinkedIn*, 9th Cir. 2022, on scraping public pages: [ca9.uscourts.gov](https://cdn.ca9.uscourts.gov/datastore/opinions/2022/04/18/17-16783.pdf)
- Web Scraper Pro's own behavior on verifications and pacing: the [bulk runs](/bulk-scraper) page and the [1.3.0 release note](/blog/web-scraper-pro-1-3-0-emails-in-the-same-maps-run).
