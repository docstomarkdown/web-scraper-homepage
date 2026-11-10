---
title: "AI Web Scraping Explained: Chat, Agents, MCP and Code"
description: "AI web scraping means 4 different things. Which one you need for a list in a spreadsheet, what the AI gets in each, and where each one breaks."
status: draft
date: 2026-10-21
updated: 2026-11-10
author: vikram
category: Explainers
tags: [ai, chatgpt, claude, mcp, agents]
# Facts checked against chrome-extension-source on 2026-11-10: chat sends your recent messages and the kind of page (worked out locally) and gets back tool calls, never data; collected rows aren't sent: lib/chat/chatClient.ts, lib/chat/runChatTurn.ts (toRequestMessages)
# Facts checked against chrome-extension-source on 2026-11-10: messages and the page's web address are recorded to improve chat; rows stay in the browser unless exported: lib/tools/helpTopics.json (data_privacy)
# Facts checked against chrome-extension-source on 2026-11-10: "collect every page" / "collect 200" in chat, rows open on a results page and are saved to History: lib/tools/helpTopics.json (collect_list, more_pages)
# Facts checked against chrome-extension-source on 2026-11-10: asking for only some columns ("download just the name and phone as CSV"), Export as Google Sheets, Microsoft Excel, CSV, JSON: lib/tools/helpTopics.json (edit_columns, download_file)
# Facts checked against chrome-extension-source on 2026-11-10: "Choose an item on the page" fallback: components/scraper/ListTab.tsx
# Facts checked against chrome-extension-source on 2026-11-10: MCP and Browser Relay not in the build: cloudLaunched false in config/products.mjs
# Outside facts checked on 2026-11-10: MCP definition: modelcontextprotocol.io; Browser Use is an open-source (MIT) Python library for AI browser agents: github.com/browser-use/browser-use; ChatGPT agent uses screenshots of a virtual browser and can click, fill out forms and navigate: help.openai.com/en/articles/11752874-chatgpt-agent
---

If you want a list in a spreadsheet, you want the first kind: an extension you type a sentence to, which copies the page in your own browser. The other 3 kinds, an AI agent that drives a browser, an MCP tool an assistant can call, and a coding assistant that writes a script, suit tasks with judgment in them, people who work inside an assistant, and developers. This post explains all 4 in plain words, walks through one job with the first kind, and says what the AI gets in each case.

## The One-Minute Version

Four things are sold as "AI web scraping". They differ in who does the reading and where the values come from.

| Kind | You | The AI | Values come from |
|---|---|---|---|
| Chat extension | Type a sentence on a page you have open | Works out which job to run | The page, copied by the extension |
| Browser agent | Describe a task | Looks at the page and clicks, step by step | The AI's reading of the page |
| MCP tool | Ask inside Claude or another assistant | Calls a scraper as a tool | The tool, copied |
| Code assistant | Ask for a script, then run it | Writes the script | The script, copied |

If you've never used any of them and have a page open now, start with the first row. The rest of this post explains why.

## Kind 1: A Chat Extension That Collects in Your Browser

You type what you want; the AI works out the job; the extension reads the page.

This is how Web Scraper Pro's chat works. The side panel is the extension's own window, which opens beside the page. In its chat you type `collect every page of this list` or `collect the products on this page`.

The AI decides which job that is: a list on the page, a product's details, contact details from a website, or the page's text. The extension then collects from the page in your Chrome window and puts the rows in a table.

What the AI gets: your recent messages and the kind of page you're on, worked out in your browser. It answers with which job to run, never with data, so every value in your table was copied from the page. The rows you collect aren't sent to it; we do record your messages and the page's web address to improve chat.

Good for: anyone with a page open and a spreadsheet in mind. The extension is free, with no paid plan, and the output is a table with named columns. Limits: it runs while your browser is open, and chat has a daily message limit.

## Kind 2: An AI Agent That Drives a Browser

The AI looks at the page, decides what to click, reads the result, and repeats.

Projects such as [Browser Use](https://github.com/browser-use/browser-use), an open-source library for AI browser agents, and [ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent) hand a browser to the AI. OpenAI's help page says ChatGPT agent uses screenshots of its virtual browser to see pages, and can click buttons, fill out forms and navigate. The AI does the clicking, one decision at a time.

What the AI gets: what's on every page it visits, including any personal details on them. Good for: tasks with judgment in them, such as filling in a form, comparing 2 listings, or finding one fact spread across several pages.

Limits: each step is a request to the AI, so long lists take many steps. The values pass through the AI's reading of the page, so check them against the source before you rely on them.

## Kind 3: An MCP Tool an Assistant Can Call

The assistant stays in its own window and calls a scraper as a tool; the scraper hands back rows.

MCP stands for Model Context Protocol. Its own site calls it an open-source standard for connecting AI applications such as Claude or ChatGPT to outside tools and data. A scraping MCP tool offers jobs such as "collect these addresses"; the assistant calls the job and gets a table back, which it can then summarize, filter or pass on.

What the AI gets: the rows the tool returns, inside your conversation. Good for: people who already work inside an assistant and want data to arrive there, and for chaining steps, such as "collect the catalog, then flag everything under $20".

Limits: you need an assistant that supports MCP and a tool connected to it. Web Scraper Pro's MCP connection is coming soon; the [MCP page](/mcp) describes what's planned.

## Kind 4: A Coding Assistant That Writes the Scraper

Claude Code, ChatGPT or GitHub Copilot writes a Python or JavaScript script; you run it and you own it.

A coding assistant is an AI that writes computer code for you. Ask it for "a script that collects product name, price and link from this page" and paste the page's HTML (the text behind the page, which your browser can show you). You get a script back, and when it fails you paste the error and ask for a fix.

What the AI gets: the HTML you paste and the code. Good for: developers, crawls that run every night with rules of your own, and sites where you need something no extension offers.

Limits: a script fetches the page without a browser, so a list that the site draws with JavaScript after loading comes back empty unless you add a headless browser. A headless browser is a real browser running out of sight under the script's control. Sign-ins and verification checks stop a script, and every site redesign is yours to fix. Our [ChatGPT guide](/guides/scrape-a-website-with-chatgpt) shows the paste route and the script route side by side.

## The Same Job Through Kind 1, Step by Step

A product list that runs over several pages, collected through chat. The steps come from the extension's own help; the rows below are sample data.

1. Open the page with the list, click the Web Scraper Pro icon, and open the chat in the side panel.
2. Type `collect every page of this list` and press <kbd>Enter</kbd>. The extension goes through the next pages until the list ends; to cap it, type a number instead, such as `collect 200`. Press **Stop** at any time to keep what you have.
3. The rows open on a results page and are saved to History. The columns are named from the page.
4. Type `download the name and price as CSV`, or click **Export as** and choose **Google Sheets**, **Microsoft Excel**, **CSV** or **JSON**.

If chat picks the wrong list, open the **List** tab, choose **Choose an item on the page**, and click one product. Similar items are picked with it.

Sample data:

| Name | Price | Link |
|---|---|---|
| Sample Desk Lamp | $24.00 | shop.example/desk-lamp |
| Sample Wall Clock | $18.50 | shop.example/wall-clock |
| . . . | . . . | . . . |

What the AI got: the sentences you typed and the kind of page you were on. What it didn't get: the rows. The [AI chat page](/ai-chat) explains what chat sends and keeps.

## What Each Kind Needs, and What It Can Reach

Two things decide most choices: what you have to set up, and whether the tool can see the page at all.

| | Chat extension | Browser agent | MCP tool | Code assistant |
|---|---|---|---|---|
| Setup | Install the extension | Install or open the agent | Connect the tool to your assistant | Write and run code |
| Pages you're signed in to | Yes, it's your browser | Depends on the agent | Depends on the tool | No |
| Pages drawn by JavaScript | Yes | Yes | Depends on the tool | Only with a headless browser |
| Price | Free, with no paid plan | See each product's pricing | See each tool's pricing | The assistant's subscription |
| Who checks the values | Copied from the page; spot-check the columns | You, against the source | Copied by the tool | You, on the first run |

## Which One You Need

Start with the kind that copies values and needs no setup. Move to an agent or to code when the job needs judgment or rules of your own.

- A catalog, a set of listings or a results page: the chat extension. Ask, check the rows, export.
- A task such as "find the cheapest listing that allows pets and message the agent": a browser agent, with time for its steps.
- Data that should land in Claude or another assistant as part of a longer conversation: an MCP tool, once yours supports it.
- A nightly crawl with rules of your own: code, written with an assistant and run by you or a scheduler.

For a lead list from Google Maps, our separate extension, [Maps Scraper Pro](https://mapsscraper.pro), is built for that job.

## How to Tell Which Kind a Tool Is

Three questions sort any product that calls itself AI web scraping.

- **Where does it run?** In your browser as an extension, in a browser the AI controls, on the company's servers, or as code on your machine. The answer tells you whether it can see pages you're signed in to.
- **Who reads the values?** If the AI reads the page and types what it saw, you'll be checking them. If software copies the page, the values are the page's own.
- **What does it send away?** Your sentence only, the whole page, or nothing. The privacy policy says which.

## Questions People Ask

**Does the AI see my data?** In Web Scraper Pro's chat, the AI gets your messages and the kind of page you're on; the rows you collect aren't sent to it. A browser agent gets every page it visits.

With an MCP tool, the AI gets the rows the tool returns; with a coding assistant, it gets the HTML you paste.

**Can an AI scraper get past a sign-in or a verification page?** None of them should. An extension reads pages you've signed in to yourself, and if a verification page appears, you complete it in the tab.

**Is an AI scraper more accurate than a normal one?** Only if the values are copied rather than read. In a chat extension, the AI's job is understanding your request; the copying is ordinary software.

**Which one is free?** Web Scraper Pro is free, with no paid plan. Agents and MCP tools have their own pricing; a coding assistant costs its subscription.

## What This Means for You

- If your goal is a spreadsheet, the AI's job is to understand your sentence, not to read the page. Pick a tool where the values are copied.
- Agents and code are different tools for different jobs, not better versions of an extension.
- An AI tool doesn't change what you're allowed to collect. The site's terms and the rules on personal data still apply; the [legal guide](/web-scraping-legal) covers them.

## Sources

- Model Context Protocol, the open standard for tools an assistant can call: [modelcontextprotocol.io](https://modelcontextprotocol.io), read 10 November 2026.
- Browser Use, an open-source library for AI browser agents: [github.com/browser-use](https://github.com/browser-use/browser-use), read 10 November 2026.
- ChatGPT agent, OpenAI's help page: [help.openai.com](https://help.openai.com/en/articles/11752874-chatgpt-agent), read 10 November 2026.
- What Web Scraper Pro's chat sends and keeps: the [AI chat page](/ai-chat).
