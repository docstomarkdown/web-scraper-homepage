---
title: "Web Scraping with Claude Code: What It Does Well, and When an Extension Is the Faster Route"
description: "Claude Code writes working scrapers fast, and that's the right tool for a developer with a recurring crawl. For a lead list, a catalog or a results page you need today, a browser extension skips the script entirely. A fair look at both, with the prompts."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Explainers
tags: [claude code, ai, python, chrome extension]
---

Claude Code is a strong way to write a web scraper: describe the page, paste its HTML, and you get a Python or JavaScript script in a minute, with a tight loop for fixing it. It's the right route when you're a developer and the crawl will run again with rules of your own. It's the slow route when you need a list in a spreadsheet now, because the script has to be written, run and maintained, and it can't see pages that need a browser or a sign-in. Here is what each route looks like on the same job.

## The job

Every business from a Maps search for plumbers in Denver, with phone, website and the email from each business's site, in Excel.

It's the most searched scraping job on YouTube, and the one where the two routes differ most.

## Route 1: Claude Code writes the scraper

A script in minutes, then the real work.

A prompt like this gets a start:

```
Write a Python script that takes a Maps search URL for "plumbers in Denver", collects each business's name, rating, phone and website, then visits each website and finds email addresses on it and its contact page. Save everything as an Excel file.
```

Claude Code will produce something sensible: a headless browser to load Maps, scrolling to load results, a selector for each card, a second pass over the websites with a regex for emails, and a spreadsheet writer. For a developer, that's a good first draft.

Then the loop starts:

- Maps draws its results with JavaScript and shows cards only as the list scrolls, so the script needs a real browser (Playwright or Selenium) and a scroll routine. Claude Code will add it when you paste the empty output.
- Maps rate-limits automated browsers quickly; after a few dozen businesses you'll see a verification page, and the script stops. Slowing it down helps; it doesn't make the problem go away.
- Each business's website is different. The email regex finds obfuscated addresses, image-only addresses and none at all, and some sites block headless browsers outright.
- Next month, a Maps layout change breaks a selector, and you're back in the loop.

None of this is a mark against Claude Code. It's the cost of a script: it sees the page without a person, and the page knows.

## Route 2: the extension

The same request as a sentence, run in your own browser, with the emails read in the same run.

Open Chrome, open the Web Scraper Pro side panel, and type:

```
Find plumbers in Denver
```

A card asks how many businesses (20, 50, 100 or 200); click **Start**. Maps opens in a tab and the extension scrolls the results and opens each place for its phone, website, address and hours. Because the run happens in your browser, Maps sees you browsing, not a script. While it collects, it reads each business's website and one linked Contact page, and adds Emails, Website phones and social links to the row. When it's done, **Export as** → **Microsoft Excel**.

Fifty businesses with emails take about four minutes. The [full guide](/guides/get-maps-leads-with-emails) has a screenshot of each step.

## Side by side

| | Claude Code script | Web Scraper Pro |
|---|---|---|
| Time to first rows | 10 to 60 minutes, depending on the fixes | 4 minutes for 50 businesses |
| Sees JavaScript-drawn pages | With a headless browser added | Yes, it's your browser |
| Rate limits and verifications | Hits them as a script; you slow it down or stop | Paces itself; stops at a verification for you to complete |
| Emails from each website | A second pass you write and tune | Same run, built in |
| When Maps changes its layout | Fix the selectors | Nothing to do; the setup updates on its own |
| Custom logic (score leads, merge with a CRM export) | Anything you can code | Rename, filter, sort and export; the rest in your sheet |
| Runs unattended on a schedule | Yes, with a scheduler you set up | Coming with the cloud |
| Who it's for | A developer who'll run this again | Anyone who needs the list today |

## When Claude Code is the right choice

When you're a developer, the crawl repeats, and the logic is yours.

- You'll run the same collection every week and want it on a server, not in a browser.
- The job joins several sources, or applies rules a spreadsheet filter can't express.
- The site has an API, and the "scraper" is really a client for it.
- You want the code, because the code is the product.

In those cases, write it with Claude Code and keep it. Use an extension to look at the data first; knowing what the rows look like makes the script better.

## The two together

Collect with the extension, process with the code.

A quiet pattern that works: the extension does the browsing, because browsers are what sites expect, and exports a CSV; a script Claude Code wrote does the enrichment, the scoring and the upload to your sales tool. Each tool does the part it's good at, and neither has to fight the other's weak spot. When Web Scraper Pro's MCP connection ships, Claude will be able to call the collector directly from the conversation; the [MCP page](/mcp) says what's planned.

The same rules apply to both routes: public pages, your own research, no personal profiles, and the site's terms. The [legal guide](/web-scraping-legal) has the cases.
