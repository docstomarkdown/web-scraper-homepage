---
title: "How To Scrape a Website with Claude, and What It Can't Do"
description: "What the Claude app, Cowork and Claude Code can each scrape, where each stops, and the one-sentence route in your own Chrome that copies values from the page."
status: draft
date: 2026-10-28
updated: 2026-10-28
version: "1.3.0"
author: vikram
feature: ai-chat
sites: []
video: ""
campaign: guide-scrape-a-website-with-claude
faq:
  - q: "Can the Claude app scrape a website by itself?"
    a: "It can read a page you paste or fetch a public page's text and pull a short list out of it. It can't follow every page of results, open each item for its details, or read pages behind your sign-in, and on a long list it skips rows and changes digits, because it writes text rather than copying it."
  - q: "What can Claude Cowork do that the app can't?"
    a: "Cowork has its own browser, so it can open a page, click Next, scroll and read the next page, and save what it found to a file in a folder you gave it. It does this one page at a time at a conversational pace, in a browser with none of your sign-ins, and the values still pass through the model."
  - q: "Is Claude Code better for scraping than the Claude app?"
    a: "For a developer with a job that repeats, yes: it writes a script you keep and run on a schedule. For a list you need today, it's the slow route, because the script has to be written, run and fixed, and it can't see pages that need a real browser or a sign-in."
  - q: "Can I connect Claude to Web Scraper Pro?"
    a: "Not yet. Connecting Claude and other MCP clients so they can run the extension's collectors through your browser is planned and isn't shipped; the MCP page says what's coming. Today the extension's own chat does the same job from a typed sentence."
  - q: "Why does the table Claude gives me have wrong numbers?"
    a: "A language model generates text rather than copying it. On a short list it's usually right; past a few dozen rows it skips rows, merges two, and alters prices and phone numbers. Check a sample against the page, or use a tool that copies values from the page."
  - q: "Which route should I pick?"
    a: "Twenty rows you need once: paste them into the Claude app. A few pages on a site you can't collect otherwise: Cowork. A crawl that repeats on a server: Claude Code. A list that spans pages, lives behind your sign-in, or has to be right to the digit: the extension's chat, which is free and runs in your own Chrome."
---

<!--
Facts to re-check before this leaves draft (2026-10-28):
- Claude app: web search and page fetch exist on claude.ai; pasted text and fetched text are rewritten by the model, not copied. Claude in Chrome (the extension) reads open tabs; mention stays to one sentence.
- Cowork: Anthropic's desktop agent; a built-in browser was announced on 26 August 2026 (claude.com/blog/cowork-built-in-browser); it is separate from the person's own browser, with no existing sign-ins or tabs; availability by plan has changed and should be read from Anthropic's page on the day of publishing, not stated here.
- Claude Code: as in /blog/web-scraping-with-claude-code. No change.
- MCP: not shipped; /mcp is "coming soon" (config/pages.ts). Keep it that way until the owner says otherwise.
- The extension's chat: collect_list with "every page" (DECISIONS.md D-027), "Add emails and social links" card when rows have a Website column, values copied from the page (Golden Rule 6: no page content reaches the model).
-->

Claude can help you scrape a website in three ways. The Claude app reads a page and gives you a table. Cowork, Anthropic's desktop agent, opens a page in its own browser and clicks through it. Claude Code writes a scraper you run yourself. Each is good at one kind of job and stops at a wall the others don't move either: paging through a site, your sign-ins, and copying values exactly. This guide shows the three routes, where each stops, and the one-sentence alternative in Web Scraper Pro's own chat, tested on version 1.3.0.

## Prerequisites

- A Claude account for the first three routes. The app is free to start; Cowork and the built-in browser come with paid plans, and Anthropic's own page says which on the day you read it.
- Google Chrome with Web Scraper Pro installed (version 1.3.0 or later) for the last route.
- A page you're allowed to collect from. Public listings are generally fine; check the site's terms first, and read [Is web scraping legal?](/web-scraping-legal). It isn't legal advice.

## Route 1 — Asking the Claude App

**What works:** a short list from a page you paste, or from a public page Claude fetches for you. Select the page's text, copy it, and paste it with a request:

```
Turn this into a table with the columns Name, Price and Rating. Keep every row and don't change any value.
```

Or give Claude the address and let it fetch the page. For a page with twenty rows this takes a minute and is usually right, and you can ask for the table as CSV to paste into a sheet. Claude in Chrome, Anthropic's browser extension, can read a tab you have open the same way, which saves the copying.

**Where it stops:**

- **Long lists.** Past a few dozen rows the model skips rows, merges two into one, and changes digits. It writes text; it doesn't copy cells.
- **One page.** A list over 30 pages is 30 requests, each with the next page's address. A fetched page shows only what loaded without a browser, which on most stores and directories is the empty shell.
- **Your sign-ins.** A fetch comes from Anthropic's servers, not your browser, so a members' page is closed to it.
- **Each item's own page.** The listing shows the name and price; the phone number is on each item's page, which the paste never includes.

## Route 2 — Letting Cowork Browse

**What works:** a few pages on a site you can't collect any other way. Cowork is Anthropic's desktop agent. You give it a folder to work in. Since August 2026 it has a browser of its own that opens beside the conversation, so it can open a page, read it, click Next, scroll and type into a search box. It saves what it finds to a file in that folder. Ask it plainly:

```
Open this page, collect every business on it into a CSV with Name, Phone and Website, click Next and keep going until the last page, then save the file as leads.csv.
```

Cowork will do it, page by page, and tell you what it did.

**Where it stops:**

- **Pace.** It reads and clicks at a conversational pace. Thirty pages is thirty rounds of reading and writing, and the run costs tokens the whole way.
- **The values still pass through the model.** Cowork reads a page and writes a file from what it read, so the same skipped rows and altered digits show up on long lists. Check a sample.
- **A browser with none of your sign-ins.** The built-in browser is separate from your Chrome: no existing tabs, no saved sessions. You can sign in to a site inside it, or move a sign-in across, and you should think twice before giving an agent a session on a site that matters.
- **Verification pages.** A site that checks for bots checks Cowork too. When one appears, you complete it; the agent shouldn't.
- **Instructions on the page.** Anthropic warns that an agent reading the web can meet text written to mislead it. Use it on sites you trust.

## Route 3 — Asking Claude Code to Write a Scraper

**What works:** a repeatable script for a developer. Describe the page, paste the HTML of one list page, and Claude Code writes a Python script that fetches the pages, pulls the columns and writes a spreadsheet. The [Claude Code post](/blog/web-scraping-with-claude-code) walks through one job, fix by fix.

**Where it stops:** the same places every script stops. Pages drawn by JavaScript need a headless browser added, the script has no sign-ins, and sites that check for bots stop it. A layout change next month sends you back to the first prompt. Fine when the crawl repeats and the logic is yours; a detour when you need a list today.

## Route 4 — Asking Web Scraper Pro

**What works:** the same request, in your own Chrome, with the values copied from the page rather than rewritten. Open the page, open the side panel's **Chat** tab and type:

```
Collect every listing on this page, all pages
```

![](visual:ext/panel-chat-empty)

The AI reads only your words and the kind of page you're on; the page itself is never sent to it. The extension finds the list on the page, names the columns from the page's own labels, and pages through the list the way the List tab does: Next page, Load more or scrolling. When the rows have a Website column, a card under the result offers **Add emails and social links**, and each row's site is read for its contact details.

![](visual:ext/chat-collect-every-page)

Then ask for the file:

```
Excel with name, phone and website
```

![](visual:ext/results-export-menu)

Because it runs in your Chrome window, it reads pages you're signed in to, and the site sees an ordinary visit from you, at a person's pace. Chat has a daily message limit; the List tab does the same job by clicking when you reach it.

## Side by Side

| | The Claude app | Cowork | Claude Code | Web Scraper Pro chat |
|---|---|---|---|---|
| Setup | None | A folder and a paid plan | Python and a terminal | Install the extension |
| Values | Rewritten by the model; check them | Rewritten by the model; check them | Copied, when the script works | Copied from the page |
| Every page of results | One request per page | Clicks Next, one page per round | Only if you describe the paging | Built in |
| Each item's own page | No | Yes, slowly | Extra code | Built in for product details; a bulk run for the rest |
| JavaScript-drawn pages | Only what you paste | Yes, it's a browser | With a headless browser | Yes, it's your browser |
| Pages you're signed in to | Only what you paste | After you sign in inside it | No | Yes |
| Verification pages | Not reached | You complete them | Stop the script | You complete them in the tab |
| When the site changes | Nothing to fix | Nothing to fix | The script breaks | The list is found again |
| Price | Free to start | A paid plan, plus tokens per run | Your subscription | Free, no paid plan |
| Best for | A short list, once | A few pages, nowhere else to get them | A developer, a repeating crawl | Anyone, any list, repeated |

## Connecting Claude to the Extension

Not yet. An MCP connection, so that Claude or another agent can run the extension's collectors through your own browser from a conversation, is planned and isn't shipped. The [MCP and AI agents page](/mcp) says what's coming and will say when it's live; until then, the extension's chat is the route, and it needs no connection at all.

## What Web Scraper Pro Won't Do Either

- It collects what the page shows you. A site that needs a sign-in still needs you to sign in.
- It doesn't collect reviews from chat; use **Collect reviews** in the side panel on a product page.
- It doesn't get past a verification page. The run stops, you complete the check, and it carries on.
- Collecting personal data, or data a site's terms forbid, is on you, whatever tool you use.

## When It Goes Wrong

**The app's table has rows missing.** The list was longer than the model handles well. Paste fewer rows at a time, or use a tool that copies values from the page.

**Cowork stopped on a check.** The site asked it to prove it's a person. Complete the check in Cowork's browser yourself and tell it to carry on, or collect the page in your own Chrome with the extension.

**Claude Code's script returns nothing.** The page draws its list with JavaScript, so a plain fetch sees an empty shell. Ask for a version that drives a headless browser, or open the page and collect it with the extension.

**Chat collected the wrong list.** Say which one in plain words, such as "the main results, not the sidebar", or switch to the List tab and click **Choose an item on the page**.

## Conclusion

Claude is good company for scraping: the app tidies a short list, Cowork reaches a few pages nowhere else can, and Claude Code writes a scraper a developer can keep. None of them copies a page's values the way your own browser can, and none pages through a site for free. For a list that spans pages, lives behind your sign-in, or has to be right to the digit, type the sentence into Web Scraper Pro's chat; the rows come from the page. See How To Scrape a Website Without Coding, by Asking for the full walkthrough. The same comparison on ChatGPT is How To Scrape a Website with ChatGPT, and What It Can't Do.
