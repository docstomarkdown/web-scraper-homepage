---
title: "How To Scrape a Website with ChatGPT: Four Ways Compared"
description: "ChatGPT can turn pasted text into a table, search the web, browse for you or write a scraper. What each route does, per OpenAI's help, and a fifth option."
status: draft
date: 2026-10-21
updated: 2026-11-10
version: "1.3.0"
author: vikram
feature: ai-chat
sites: []
video: ""
campaign: guide-scrape-a-website-with-chatgpt
# ChatGPT facts from OpenAI's Help Center, read 2026-11-10 (the pages show relative dates only):
# ChatGPT search: answers with current information and links to sources; Free, Go, Plus, Pro, Business, Enterprise, Edu; results and citations "can be incomplete, outdated, or incorrect": help.openai.com/en/articles/9237897-chatgpt-search
# Cloud browser: ChatGPT Work's own browser on a separate computer in the cloud; paid plans in supported regions, excluding Free and Go; can work on sites where you sign in, through a secure form; keeps its own cookies and sessions, separate from your device's browser; some sites restrict automated browser agents: help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt
# Built-in browser in the ChatGPT desktop app (macOS, Windows) uses its own browser state; for a task that needs your Chrome profile or signed-in session, OpenAI points to the ChatGPT browser extension: help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app
# ChatGPT agent is no longer available (replaced by the above): help.openai.com/en/articles/11752874-chatgpt-agent
# Facts checked against chrome-extension-source on 2026-11-10:
# Chat collects a list on the open page; cards under the result offer Collect every page and Add emails and social links: lib/tools/listFollowUps.ts, DECISIONS.md D-024, D-027
# Messages go to our servers so chat can work; collected rows don't: lib/chat/chatClient.ts; daily message limit: lib/chat/chatErrors.ts
# Reviews are collected in the Properties tab (Collect reviews), not by chat: components/scraper/PropertiesTab.tsx, lib/tools/capabilityTools.ts
# No ChatGPT or other AI-agent connection to the extension in 1.3.0 (cloudLaunched: false): thinksolv-writing-system/products/web-scraper-pro.md
faq:
  - q: "Can ChatGPT scrape a website by itself?"
    a: "It can turn text you paste into a table, search the web and link its sources, and, on paid plans, use a browser to work on websites for you. OpenAI's help pages describe what each of these does; none of them is a dedicated scraper, so check the values against the page."
  - q: "Is the code ChatGPT writes safe to run?"
    a: "Read it first, and run it only on sites you're allowed to collect from. A script reads pages the way you write it to, so test it on one page before you rely on it."
  - q: "Why does the table have wrong values?"
    a: "When ChatGPT writes a table from text, the model writes each value. OpenAI's own help notes that search results and citations can be incomplete, outdated or incorrect. Check a sample against the page before you rely on it."
  - q: "What does Web Scraper Pro do differently?"
    a: "The extension's code reads the rows from the page in your own Chrome, so each value is what the page shows. Your chat messages go to our servers so chat can work; the collected rows don't."
  - q: "Can I connect ChatGPT to Web Scraper Pro?"
    a: "No. A connection for AI agents isn't available in the current version. The extension's own chat takes the same kind of request inside Chrome."
  - q: "Is Claude any different for web scraping?"
    a: "Claude has similar routes, and Anthropic's help pages describe them. See How To Scrape a Website with Claude for the same comparison."
---

ChatGPT can help you scrape a website in four ways: turn text you paste into a table, search the web, work on a website in a browser, or write a script you run yourself. This guide describes each route as OpenAI's help pages did on 10 November 2026, where each one fits, and a fifth option: Web Scraper Pro, our Chrome extension, which reads the rows from the page itself.

## Prerequisites

- A ChatGPT account for the first four routes. Some features need a paid plan; OpenAI's help pages list which.
- Google Chrome with [Web Scraper Pro](/) installed (version 1.3.0 or later) for the last one.
- A page you're allowed to collect from. Check the site's terms first, and read [Is web scraping legal?](/web-scraping-legal); it isn't legal advice.

## Route 1 — Pasting a Page into ChatGPT

**What works:** a short list you need once. Select the page's text, copy it, and paste it with a request:

```
Turn this into a table with columns Name, Price and Rating. Keep every row and don't change any value.
```

ChatGPT returns a table you can copy into a spreadsheet, or a CSV if you ask for one.

**What to watch:**

- **The model writes the values.** The table is written from the text you pasted, not copied cell by cell. Check prices, phone numbers and counts against the page.
- **One paste per page.** Page 2 of the results means another copy and paste.
- **Details inside each item.** A listing shows the name and price; anything on each item's own page isn't in the paste.

## Route 2 — Asking ChatGPT to Search the Web

**What works:** a question whose answer is spread across public pages. OpenAI's [ChatGPT search article](https://help.openai.com/en/articles/9237897-chatgpt-search) says ChatGPT can search the web for current information and link to its sources, on free and paid plans.

**What to watch:** the same article says results and citations "can be incomplete, outdated, or incorrect," so open the sources it links before you use a value.

## Route 3 — Letting ChatGPT Use a Browser

**What works:** a task on a website that needs clicking or signing in. OpenAI describes three browsers:

- **Cloud browser.** ChatGPT Work's own browser on a separate computer in the cloud, on paid plans other than Free and Go, in supported regions. OpenAI's [cloud browser article](https://help.openai.com/en/articles/20001280-using-cloud-browser-in-chatgpt) says it can work on sites where you sign in, through a secure form, and that it keeps its own cookies and sessions.
- **Built-in browser.** A browser inside the ChatGPT desktop app for macOS and Windows, with its own browser state, per OpenAI's [built-in browser article](https://help.openai.com/en/articles/20001277-using-the-built-in-browser-in-the-chatgpt-desktop-app).
- **ChatGPT browser extension.** The same article points to it for tasks that need your Chrome profile or signed-in session.

**What to watch:** OpenAI notes that some sites restrict automated browser agents, and each site decides whether to allow them. The values in what ChatGPT writes back still come from the model reading the page, so check a sample.

## Route 4 — Asking ChatGPT to Write a Scraper

**What works:** a repeatable job for someone who runs code. Ask for a script, and paste the HTML of one list page so it matches the real structure:

```
Write a Python script that collects the product name, price and link from this page's HTML and saves them as CSV.
```

**What to watch:** a script reads the page the way it's written to. A page that draws its list with scripts after it loads, a list over many pages, a sign-in or a site redesign each needs more code. You also need Python and a terminal.

## Route 5 — Asking Web Scraper Pro

**What works:** a list on a page you have open, collected in your own Chrome. Open the page, open the side panel's **Chat** tab and type:

```
Collect the products on this page
```

![](visual:ext/panel-chat-empty)

The extension finds the list on the page and reads each item into columns, so each value is what the page shows. Your messages go to our servers so chat can work; the collected rows don't. When the list continues, a card under the result offers **Collect every page**, and when the rows have websites, another offers **Add emails and social links**.

![](visual:ext/chat-collect-every-page)

Then ask for the file:

```
Excel with name, price and the product link
```

![](visual:ext/results-export-menu)

Because it runs in your own Chrome, it reads pages you're signed in to. Chat has a daily message limit; the **List** tab does the same job by clicking, without using it.

There is no connection between ChatGPT and Web Scraper Pro in the current version.

## Side by Side

| | Paste into ChatGPT | ChatGPT search | ChatGPT with a browser | ChatGPT writes a script | Web Scraper Pro chat |
|---|---|---|---|---|---|
| Setup | None | None | A paid plan for cloud browser | Python and a terminal | Install the extension |
| Where values come from | The model writes them | The model, with linked sources | The model, from the page it read | The script, when it works | The page, read by the extension |
| Pages you're signed in to | Only what you paste | No sign-in described | Yes, per OpenAI's help | Extra code | Yes, in your own Chrome |
| Best for | A short list, once | A question across public pages | A task with clicks and forms | A repeatable job for a developer | A list on the page you have open |

## What Web Scraper Pro Won't Do Either

- It collects what the page shows you. A site that needs a sign-in still needs you to sign in.
- Chat doesn't collect reviews; use **Collect reviews** in the **Properties** tab on a product page.
- It doesn't get past a verification page; you complete it in the tab.
- Collecting personal data, or data a site's terms forbid, is your decision and your responsibility, whatever tool you use.

## When It Goes Wrong

**The script returns an empty list.** The page may draw its list with scripts after it loads, so the downloaded HTML doesn't hold it. Ask for a version that uses a browser automation library, or collect the page with the extension.

**The pasted table has wrong values.** The model wrote the table. Check a sample against the page, paste fewer rows at a time, or use a tool that reads the values from the page.

**A site blocked ChatGPT's browser.** OpenAI notes that some sites restrict automated browser agents. Open the page in your own Chrome and collect it there.

## Conclusion

ChatGPT tidies a short list you paste, searches public pages with sources, works on websites in its own browsers, and writes starter scripts. For a list on a page you have open, where each value should be what the page shows, Web Scraper Pro's chat takes the same sentence and reads the rows from the page.

For the same comparison on Claude, see [How To Scrape a Website with Claude](/guides/scrape-a-website-with-claude). For more on the extension's chat, see the [AI chat page](/ai-chat).
