---
title: "Web Scraping with Claude Code: What It's Good For"
description: "Claude Code writes scrapers fast, which suits a developer with a recurring crawl. For a list you need today, a free extension skips the script entirely."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Explainers
tags: [claude code, ai, python, chrome extension]
---

Claude Code is a strong way to write a web scraper: describe the page, paste its HTML, and you get a working Python script in minutes with a quick loop for fixing it. It's the right route when you're a developer and the crawl will run again with rules of your own. It's the slow route when you need a list in a spreadsheet today, because the script has to be written, run and kept working, and it can't see pages that need a real browser or a sign-in.

**Not a developer?** Skip to [Route 2](#route-2-the-extension). It's the same job as a typed sentence, and it's free with no paid plan.

## Words used on this page

- **Claude Code** is Anthropic's coding assistant: an AI that writes and runs computer code on your machine from a conversation in your terminal.
- **A script** is a small program. A scraping script fetches web pages and pulls values out of them.
- **A selector** is the address of one piece of a page, such as "the price inside each product card". Scripts need one per column.
- **A headless browser** is a real browser running invisibly under a script's control, so the script can see pages that only draw their content after loading. Playwright and Selenium are the two common tools for driving one.
- **A regex** is a pattern for finding text, such as "anything that looks like an email address".

## The job

Every business from a Google Maps search for plumbers in Denver, with phone, website and the email from each business's own site, in Excel.

It's the most searched scraping job on YouTube, and the one where the two routes differ most.

## Route 1: Claude Code writes the scraper

A script in minutes, then the real work.

A prompt like this gets a start:

```
Write a Python script that takes a Google Maps search URL for "plumbers in Denver", collects each business's name, rating, phone and website, then visits each website and finds email addresses on it and its contact page. Save everything as an Excel file.
```

Claude Code will produce something sensible: a headless browser to load Google Maps, a scroll routine to load the results, a selector for each card, a second pass over the websites with an email regex, and a spreadsheet writer. For a developer, that's a good first draft.

Then the fix loop starts. Each of these is one round of "run it, paste the error, apply the fix":

1. **The list comes back empty.** Google Maps draws its results with JavaScript and only shows cards as the list scrolls, so the script needs the headless browser and the scroll routine to work together. Claude Code adds them when you paste the empty output.
2. **A verification page appears after a few dozen businesses.** Google Maps slows automated browsers and then asks "are you a person?". Slowing the script helps; it doesn't make the check go away, because the script can't answer it.
3. **The emails are patchy.** Every business website is different. The regex finds addresses written as "hello [at] example.com", addresses shown as images, and none at all, and some sites refuse headless browsers outright.
4. **Next month it breaks.** A Google Maps layout change moves a selector, and you're back at step 1.

None of this is a mark against Claude Code. It's the cost of any script: it reads the page without a person, and the page can tell.

## Route 2: the extension

The same request as a sentence, run in your own browser, with the emails read in the same run.

1. Open Chrome and click the Web Scraper Pro icon. The side panel opens on the right of the page; open its **Chat** tab.
2. Type `Find plumbers in Denver` and press Enter. A card asks how many businesses: 20, 50, 100 or 200, with a box to type another number. Click **Start**.
3. Google Maps opens in a tab. The extension scrolls the results and opens each place for its phone, website, address and hours. Because the run happens in your browser, Google Maps sees you browsing, not a script.
4. While it collects, it reads each business's website and one linked Contact page, and adds Emails, Website phones and social links to the row.
5. When it's done, click **Export as** and choose **Microsoft Excel**.

Fifty businesses with emails take about four minutes; 200 take about fifteen. The [emails from Google Maps guide](/guides/get-maps-leads-with-emails) has a screenshot of each step.

| Business Name | Phone | Emails | Website |
|---|---|---|---|
| Sample Plumbing Co. | (555) 010-2231 | hello@sampleplumbing.example | sampleplumbing.example |
| Riverside Pipe & Drain | (555) 010-4410 | info@riversidepipe.example | riversidepipe.example |
| Quick Fix Plumbing | (555) 010-9043 | | |

The names and numbers are made up; the columns are what a real run gives you.

## Side by side

| | Claude Code script | Web Scraper Pro |
|---|---|---|
| Time to first rows | 10 to 60 minutes, depending on the fixes | About 4 minutes for 50 businesses |
| Pages drawn by JavaScript | With a headless browser added | Yes, it's your browser |
| Verification pages | Stop the script; you slow it down or give up | The run stops and asks you to complete the check in the tab, then carries on |
| Emails from each website | A second pass you write and tune | Same run, built in |
| When Google Maps changes its layout | Fix the selectors | Nothing to do; the setup updates on its own |
| Rules of your own (score leads, merge with another list) | Anything you can code | Rename, filter, sort and export; the rest in your sheet |
| Runs without you on a schedule | Yes, with a scheduler you set up | Coming with the cloud |
| Price | Your Claude subscription | Free, no paid plan |
| Who it's for | A developer who'll run this again | Anyone who needs the list today |

## When Claude Code is the right choice

When you're a developer, the crawl repeats, and the logic is yours.

- You'll run the same collection every week and want it on a server, not in a browser.
- The job joins several sources, or applies rules a spreadsheet filter can't express.
- The site has an API, a door the site built for programs, and the "scraper" is really a client for it.
- You want the code, because the code is the product.

In those cases, write it with Claude Code and keep it. Use the extension to look at the data first: knowing what the rows look like makes the script better.

## The two together

Collect with the extension, process with the code.

A pattern that works: the extension does the browsing, because browsers are what sites expect, and exports a CSV, a plain spreadsheet file any tool opens. A script Claude Code wrote then does the enrichment, the scoring and the upload to your sales tool. Each tool does the part it's good at.

When Web Scraper Pro's MCP connection ships, Claude will be able to call the collector directly from the conversation. The [MCP page](/mcp) says what's planned and that it isn't shipped yet.

## What a good prompt includes

The script is only as good as the description of the page, so give Claude Code the page, not a guess about it.

- **The HTML of one list page**, copied from your browser (right-click the page, View page source, copy). Claude Code finds the selectors from it instead of inventing them.
- **The exact columns you want**, named: Business Name, Phone, Website, Email. Vague prompts produce vague tables.
- **How the list continues**: a Next button, a Load more button, or scrolling. The scroll routine is the part most first drafts miss.
- **What to do when a value is missing**: leave the cell empty, never guess. Say it, or the script may fill gaps with the wrong field.
- **The output file and format**: an Excel file with one row per business, saved next to the script.

With those five things, the first draft usually runs. Without the HTML, expect three or four rounds of fixes before it does.

## Three jobs where the script wins outright

Not every job is a lead list. These are the ones to script.

1. **A nightly price check across 2,000 product pages** with rules for which changes matter. The extension collects a snapshot today; the script runs every night and only tells you about the changes you defined.
2. **Joining a scrape with your own data**, such as matching collected businesses against a list of existing customers and dropping the overlap. That's a few lines of code and a long afternoon in a spreadsheet.
3. **A site with a documented API.** When the site hands out the data through an API, a client written by Claude Code is faster, cleaner and within the site's own rules.

## Questions people ask

**Can Claude Code scrape Google Maps?** It can write a script that tries, and the script will work until Google Maps shows a verification page, which it does after a few dozen businesses from an automated browser. The extension avoids that because the run happens in your own browser.

**Is it legal to scrape with Claude Code?** The same as with any tool: public pages, your own research, no personal profiles, and the site's terms. The tool doesn't change the rules; the [legal guide](/web-scraping-legal) covers them.

**Do I need to know Python?** To fix a script when it breaks, yes, at least enough to read the error and paste it back. If that sounds like a job you don't want, the extension is the route; it has no code at all.

**Which is cheaper?** The extension is free with no paid plan. Claude Code needs a Claude subscription, and the scripts it writes are yours to run anywhere.

**Can the two share data?** Yes. Export from the extension as CSV and point the script at the file; or, once the MCP connection ships, let Claude call the collector directly.

## What this means for you

- If you don't write code, the extension is the whole answer: type the sentence, check the rows, export. Nothing in Route 1 applies to you.
- If you do write code, let the extension show you the data before you script it, and let the script do the parts a spreadsheet can't.
- The same rules apply to both routes: public pages, your own research, no personal profiles, and the site's terms. The [legal guide](/web-scraping-legal) has the cases.
