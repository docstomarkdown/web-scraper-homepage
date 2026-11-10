---
title: "How To Scrape a Website with Claude: Four Ways Compared"
description: "What the Claude app, Claude in Chrome, Cowork and Claude Code each offer for collecting web data, per Anthropic's help, and a fifth option in Chrome."
status: draft
date: 2026-10-28
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: ai-chat
sites: []
video: ""
campaign: guide-scrape-a-website-with-claude
# Claude facts from Anthropic's help pages and docs, read 2026-11-10 (the pages show relative dates only):
# Web search: Claude searches the web, and with web search on it can retrieve content from specific URLs; every response includes citations; counts toward usage limits: support.claude.com/en/articles/10684626-enable-and-use-web-search
# Claude in Chrome: a browser extension that lets Claude read, click and navigate websites; paid plans (Pro, Max, Ultra, Team, Enterprise); not supported on other Chromium browsers or mobile: support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome
# Cowork: multi-step tasks on paid plans (Pro, Max, Ultra, Team, Enterprise); reads and writes files only in folders you connect: support.claude.com/en/articles/13345190-get-started-with-claude-cowork
# Cowork built-in browser: opens sites, reads pages, clicks, types and fills forms; Claude Desktop for macOS, Windows, Linux (beta); separate from your own browser; saved logins only if you import them, site by site; prompt-injection warning; advises against sensitive tasks: support.claude.com/en/articles/16607400-use-the-built-in-browser-in-claude-cowork
# Claude Code: an agentic coding tool that reads your codebase, edits files, runs commands; terminal, IDE, desktop app and browser: code.claude.com/docs/en/overview
# Facts checked against chrome-extension-source on 2026-11-10:
# Chat collects a list on the open page; cards under the result offer Collect every page and Add emails and social links: lib/tools/listFollowUps.ts, DECISIONS.md D-024, D-027
# Messages go to our servers so chat can work; collected rows don't: lib/chat/chatClient.ts; daily message limit: lib/chat/chatErrors.ts
# Reviews are collected in the Properties tab (Collect reviews), not by chat: components/scraper/PropertiesTab.tsx, lib/tools/capabilityTools.ts
# No Claude, MCP or other AI-agent connection in 1.3.0 (cloudLaunched: false); /mcp is coming soon: thinksolv-writing-system/products/web-scraper-pro.md, config/pages.ts
faq:
  - q: "Can the Claude app scrape a website by itself?"
    a: "It can turn text you paste into a table, and with web search on it can search the web and read a page whose address you give it, with citations. Anthropic's help pages describe these features; none of them is a dedicated scraper, so check the values against the page."
  - q: "What can Claude in Chrome and Cowork do?"
    a: "Per Anthropic's help pages, Claude in Chrome lets Claude read, click and navigate websites in Chrome, and Cowork's built-in browser opens sites, reads pages, clicks, types and fills forms in a browser separate from yours. Both are on paid plans."
  - q: "Is Claude Code better for scraping than the Claude app?"
    a: "Claude Code is a coding tool: it writes and runs code. For someone who runs code and has a job that repeats, it can write a scraper you keep. For a list you need today on one page, the other routes are shorter."
  - q: "Can I connect Claude to Web Scraper Pro?"
    a: "Not yet. Connecting Claude and other MCP clients to the extension is coming soon and isn't available in the current version; the MCP page says what's planned. Today the extension's own chat takes the same kind of request inside Chrome."
  - q: "Why does the table Claude gives me have wrong values?"
    a: "When Claude writes a table from text, the model writes each value. Check a sample against the page, paste fewer rows at a time, or use a tool that reads the values from the page."
  - q: "Which route should I pick?"
    a: "A short list you need once: paste it into the Claude app. A task with clicks and forms on a site: Claude in Chrome or Cowork's browser. A crawl that repeats, if you run code: Claude Code. A list on the page you have open, where each value should be what the page shows: the extension's chat."
---

Claude can help you collect data from a website in four ways: the Claude app with pasted text or web search, Claude in Chrome, Cowork with its built-in browser, and Claude Code. This guide describes each route as Anthropic's help pages did on 10 November 2026, where each one fits, and a fifth option: Web Scraper Pro, our Chrome extension, which reads the rows from the page itself.

## Prerequisites

- A Claude account for the first four routes. Claude in Chrome and Cowork need a paid plan, per Anthropic's help pages.
- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later) for the last route.
- A page you're allowed to collect from. Check the site's terms first, and read [Is web scraping legal?](/web-scraping-legal); it isn't legal advice.

## Route 1 — Asking the Claude App

**What works:** a short list from a page you paste, or from a page Claude reads for you. Select the page's text, copy it, and paste it with a request:

```
Turn this into a table with the columns Name, Price and Rating. Keep every row and don't change any value.
```

Anthropic's [web search article](https://support.claude.com/en/articles/10684626-enable-and-use-web-search) says that with web search on, Claude can also retrieve content from a page when you give it the address, and every response includes citations.

**What to watch:**

- **The model writes the values.** The table is written from the text Claude read, not copied cell by cell. Check prices, phone numbers and counts against the page.
- **One page per request.** Page 2 of the results means another paste or another address.
- **Usage.** The same article says web search and web fetch count toward your usage limits.

## Route 2 — Claude in Chrome

**What works:** a task in your own Chrome that needs clicks. Anthropic's [Claude in Chrome article](https://support.claude.com/en/articles/12012173-get-started-with-claude-in-chrome) describes it as a browser extension that lets Claude read, click and navigate websites alongside you, on paid plans.

**What to watch:** the article says it's not supported on other Chromium-based browsers or mobile, and that it's still risky even with safety classifiers. Read Anthropic's safety guidance before you use it, and check the values it writes against the page.

## Route 3 — Letting Cowork Browse

**What works:** a multi-step task with files. Cowork runs tasks on paid plans and reads and writes files only in folders you connect, per Anthropic's [Cowork article](https://support.claude.com/en/articles/13345190-get-started-with-claude-cowork). Its [built-in browser](https://support.claude.com/en/articles/16607400-use-the-built-in-browser-in-claude-cowork) opens sites, reads pages, clicks, types and fills forms, in Claude Desktop for macOS, Windows and Linux (beta).

You could ask it plainly:

```
Open this page, collect every business on it into a CSV with Name, Phone and Website, click Next until the last page, and save the file as leads.csv.
```

**What to watch:**

- **A browser separate from yours.** Anthropic says Claude doesn't see your saved logins unless you choose to import them, site by site.
- **Prompt injection.** The same article warns that any AI agent acting in a browser can be targeted by prompt injection, and advises against sensitive tasks such as financial accounts or other people's personal data.
- **The values still pass through the model.** Cowork writes the file from what it read. Check a sample.

## Route 4 — Asking Claude Code to Write a Scraper

**What works:** a repeatable script for someone who runs code. Anthropic's [Claude Code overview](https://code.claude.com/docs/en/overview) describes an agentic coding tool that reads your codebase, edits files and runs commands. Describe the page, paste the HTML of one list page, and ask for a script that writes a spreadsheet.

**What to watch:** a script reads the page the way it's written to. A page that draws its list with scripts after it loads, a list over many pages, a sign-in or a site redesign each needs more code.

## Route 5 — Asking Web Scraper Pro

**What works:** a list on a page you have open, collected in your own Chrome. Open the page, open the side panel's **Chat** tab and type:

```
Collect every listing on this page
```

![](visual:ext/panel-chat-empty)

The extension finds the list on the page and reads each item into columns, so each value is what the page shows. Your messages go to our servers so chat can work; the collected rows don't. When the list continues, a card under the result offers **Collect every page**, and when the rows have websites, another offers **Add emails and social links**.

![](visual:ext/chat-collect-every-page)

Then ask for the file:

```
Excel with name, phone and website
```

![](visual:ext/results-export-menu)

Because it runs in your own Chrome, it reads pages you're signed in to. Chat has a daily message limit; the **List** tab does the same job by clicking, without using it.

## Side by Side

| | The Claude app | Claude in Chrome | Cowork's browser | Claude Code | Web Scraper Pro chat |
|---|---|---|---|---|---|
| Setup | None | The extension, a paid plan | Claude Desktop, a paid plan | A terminal or the desktop app | Install the extension |
| Where values come from | The model writes them | The model, from the page it read | The model, from the page it read | The script, when it works | The page, read by the extension |
| Pages you're signed in to | Only what you paste | Works in your Chrome | Logins you import or enter | Extra code | Yes, in your own Chrome |
| Best for | A short list, once | A task with clicks in Chrome | A multi-step task with files | A repeatable job for a developer | A list on the page you have open |

## Connecting Claude to the Extension

Not yet. A connection that lets Claude or another agent run the extension's collectors is coming soon and isn't available in the current version. The [MCP and AI agents page](/mcp) says what's planned; until then, the extension's chat is the route, and it needs no connection.

## What Web Scraper Pro Won't Do Either

- It collects what the page shows you. A site that needs a sign-in still needs you to sign in.
- Chat doesn't collect reviews; use **Collect reviews** in the **Properties** tab on a product page.
- It doesn't get past a verification page; you complete it in the tab.
- Collecting personal data, or data a site's terms forbid, is your decision and your responsibility, whatever tool you use.

## When It Goes Wrong

**The app's table has rows missing.** The model wrote the table from the text it read. Paste fewer rows at a time, or use a tool that reads the values from the page.

**A browser agent stopped on a check.** The site asked it to prove it's a person. Complete the check yourself, or open the page in your own Chrome and collect it with the extension.

**Claude Code's script returns nothing.** The page may draw its list with scripts after it loads. Ask for a version that uses a browser automation library, or collect the page with the extension.

**Chat collected the wrong list.** Say which one in plain words, such as "the main results, not the sidebar", or switch to the **List** tab and click **Choose an item on the page**.

## Conclusion

Claude tidies a short list you paste, reads pages with citations, works on websites through Claude in Chrome and Cowork's browser, and writes scripts in Claude Code. For a list on a page you have open, where each value should be what the page shows, Web Scraper Pro's chat takes the same sentence and reads the rows from the page.

For the same comparison on ChatGPT, see [How To Scrape a Website with ChatGPT](/guides/scrape-a-website-with-chatgpt). For more on the extension's chat, see the [AI chat page](/ai-chat).
