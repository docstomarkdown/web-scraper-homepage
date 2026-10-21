---
title: "AI Web Scraping Explained: Chat, Agents, MCP and Code"
description: "AI web scraping means four different things. Which one you need if you want a list in a spreadsheet, what the AI sees in each, and where each one breaks."
status: draft
date: 2026-10-21
updated: 2026-10-21
author: vikram
category: Explainers
tags: [ai, chatgpt, claude, mcp, agents]
---

If you want a list in a spreadsheet, you want the first kind: an extension you type a sentence to, which copies the page in your own browser. The other three kinds, an AI agent that drives a browser, an MCP tool an assistant can call, and a coding assistant that writes a script, are for tasks with judgment in them, for people who live inside an assistant, and for developers. This post explains all four in plain words, shows the same job through the first one, and says what the AI sees in each case.

## The one-minute version

Four things are sold as "AI web scraping". They differ in who does the reading and where the values come from.

| Kind | You | The AI | Values come from |
|---|---|---|---|
| Chat extension | Type a sentence on a page you have open | Works out which job to run | The page, copied by the extension |
| Browser agent | Describe a task | Looks at the page and clicks, step by step | The AI's reading of the page |
| MCP tool | Ask inside Claude or another assistant | Calls a scraper as a tool | The tool, copied |
| Code assistant | Ask for a script, then run it | Writes the script | The script, copied |

If you've never used any of them and have a page open now, start with the first row. The rest of this post explains why.

## Kind 1: a chat extension that collects in your browser

You type what you want; the AI reads the request; the extension reads the page.

This is how Web Scraper Pro's Chat tab works. The side panel is the extension's own window, which opens on the right of your browser next to the page. In its Chat tab you type `find dentists in Austin` or `collect the products on this page`.

The AI decides which job that is: a Google Maps search, a list on the page, a product's details, contact details from a website, or the page's text. The extension then does the collecting from the page in your Chrome window.

What the AI sees: your typed words and the kind of page you're on. It never sees the page's content, so it can't mistype a phone number, because it never reads one. Every value in your table was copied from the page.

Good for: anyone with a page open and a spreadsheet in mind. There's nothing to install beyond the extension, which is free with no paid plan, and the output is a table with named columns. Limits: it runs while your browser is open, and it collects what you can see on the page.

## Kind 2: an AI agent that drives a browser

The AI looks at the page, decides what to click, reads the result, and repeats.

Projects such as Browser Use, and the agent modes inside ChatGPT and other assistants, hand a browser to the AI. "An agent that drives a browser" means the AI is the one clicking and scrolling, one decision at a time, the way a person would. Ask it to collect fifty listings and it will try, reading each screen and choosing the next move.

What the AI sees: everything on every page it visits, including any personal details on them. Good for: tasks with judgment in them, such as filling in a form, comparing two listings, or finding one fact spread across several pages. Limits: slow, because each step is a request to the AI; expensive at volume for the same reason; and the values pass through the AI's reading, so a long list comes back with skipped rows and altered digits.

A worked example of the difference: 200 businesses with phone numbers. A chat extension copies 200 phone numbers in about fifteen minutes. An agent reads 200 cards and types what it believes it saw, over an hour or more, and you have to check the digits afterwards.

## Kind 3: an MCP tool an assistant can call

The assistant stays in its own window and calls a scraper as a tool; the scraper hands back rows.

MCP stands for Model Context Protocol. It's an open standard that lets an AI assistant such as Claude use outside tools, the way a phone app can use your camera. A scraping MCP tool offers jobs such as "collect these addresses" or "search Google Maps for dentists in Austin"; the assistant calls the job and gets a table back, which it can then summarise, filter or pass to another tool.

What the AI sees: the rows the tool returns, inside your conversation. Good for: people who already work inside an assistant and want data to arrive there, and for chaining steps, such as "collect the catalog, then flag everything under $20".

Limits: you need an assistant that supports MCP and a tool connected to it. Web Scraper Pro's MCP connection is coming; the [MCP page](/mcp) describes what's planned and says plainly that it isn't shipped yet.

## Kind 4: a coding assistant that writes the scraper

Claude Code, ChatGPT or Copilot writes a Python or JavaScript script; you run it and you own it.

A coding assistant is an AI that writes computer code for you. Ask it for "a script that collects product name, price and link from this page", paste the page's HTML (the text behind the page, which you can copy from your browser), and you'll get a script, usually a working one for a plain page. Searches for "web scraping with Claude Code" are growing because the scripts are good and the fix loop is quick: run it, paste the error, get a fix.

What the AI sees: the HTML you paste and the code. Good for: developers, crawls that run every night with rules of your own, and sites where you need something no extension offers.

Limits: a script fetches the page without a browser, so a list that the site draws with JavaScript after loading comes back empty unless you add a headless browser, which is a real browser running invisibly under the script's control. Sign-ins and bot checks stop a script, and every site redesign is yours to fix. Our [ChatGPT guide](/guides/scrape-a-website-with-chatgpt) shows the paste route and the script route side by side.

## The same job through kind 1, step by step

Fifty dentists in Austin with their emails, in the chat extension. Real timings from the released extension; the business names below are made up.

1. Open a new tab, click the Web Scraper Pro icon, and open the **Chat** tab.
2. Type `Find dentists in Austin` and press Enter. A card asks how many businesses: 20, 50, 100 or 200, with a box to type another number. Pick **50** and click **Start**.
3. Google Maps opens in a tab. The extension reads each business, then its website for emails, for about four minutes. The run line counts up: `32 of 50 · 18 with emails`.
4. Click **View results**. The table has Business Name, Category, Rating, Review Count, Address, Operating Hours, Phone, Website and Map URL, then Emails, Website phones, Faxes and a column for each social network found.
5. Type `Only name, phone, email and website, rows with an email`. The table narrows to match. Click **Export as** and choose **Microsoft Excel** or **Google Sheets**.

| Business Name | Phone | Emails | Website |
|---|---|---|---|
| Bright Smile Dental | (555) 010-2231 | hello@brightsmile.example | brightsmile.example |
| Lakeside Family Dentistry | (555) 010-4410 | info@lakesidefd.example | lakesidefd.example |
| Northside Orthodontics | (555) 010-7782 | | northsideortho.example |

What the AI saw: the two sentences you typed and the fact that you were on an ordinary page. What it didn't see: any of the fifty businesses. The [emails from Google Maps guide](/guides/get-maps-leads-with-emails) has a screenshot of each step.

## What each kind costs, and what it can reach

Two things decide most choices: how long 200 rows take, and whether the tool can see the page at all.

| | Chat extension | Browser agent | MCP tool | Code assistant |
|---|---|---|---|---|
| 200 rows | About fifteen minutes with emails | An hour or more | Minutes | Seconds, once the script works |
| Setup | Install the extension | Install and connect the agent | Connect the tool to your assistant | Write and run code |
| Pages you're signed in to | Yes, it's your browser | Yes, in its browser | Depends on the tool | No |
| Pages drawn by JavaScript | Yes | Yes | Depends on the tool | Only with a headless browser |
| Price | Free, no paid plan | Usually per step or per month | Depends on the tool | The assistant's subscription |
| Who checks the values | Nobody needs to; they're copied | You, digit by digit | Nobody needs to | You, on the first run |

## Which one you need

Start with the kind that copies values and needs no setup. Move to an agent or to code when the job needs judgment or rules of your own.

- A lead list, a catalog, a set of listings or a results page: the chat extension. Ask, check the rows, export.
- A task such as "find the cheapest listing that allows pets and message the agent": a browser agent, and the time it takes.
- Data that should land in Claude or another assistant as part of a longer conversation: an MCP tool, once yours supports it.
- A nightly crawl with rules of your own: code, written with an assistant and run by you or a scheduler.

## How to tell which kind a tool is

Three questions sort any product that calls itself AI web scraping.

- **Where does it run?** In your browser as an extension, in a browser the AI controls, on the company's servers, or as code on your machine. The answer tells you whether it can see pages you're signed in to.
- **Who reads the values?** If the AI reads the page and types what it saw, you'll be checking digits. If software copies the page, you won't.
- **What does it send away?** Your sentence only, the whole page, or nothing. Read the privacy policy for the one line that says which.

A product that won't answer the second question plainly is usually an agent, and the checking is yours.

## Questions people ask

**Does the AI see my data?** In a chat extension, no: it sees your sentence and the kind of page. In a browser agent, yes, every page it visits.

With an MCP tool, the AI sees the rows the tool returns; with a coding assistant, it sees the HTML you paste.

**Can an AI scraper get past a sign-in or a verification page?** No kind should, and the honest ones say so. An extension reads pages you've signed in to yourself; an agent uses its own browser; none of them should solve a verification for you.

**Is an AI scraper more accurate than a normal one?** Only if the values are copied rather than read. The AI's job is understanding your request; the copying is ordinary software, and it's exact.

**Which one is free?** The chat extension described here is free with no paid plan. Agents and MCP tools are usually priced per step, per page or per month; a coding assistant costs its subscription.

**Will AI replace the extension?** The extension is the AI, in the sense that matters: you type a sentence and get a table. What the other kinds add is judgment or code, which a lead list doesn't need.

## What this means for you

- If your goal is a spreadsheet, the AI's job is to understand your sentence, not to read the page. Pick a tool where the values are copied, and skip the checking.
- Agents and code are not better versions of the extension. They're different tools for different jobs, and they cost time or money per page.
- An AI tool doesn't change what you're allowed to collect. Public pages, your own research, no personal profiles, and the site's terms still apply; the [legal guide](/web-scraping-legal) covers them.

## Sources

- Model Context Protocol, the open standard for tools an assistant can call: [modelcontextprotocol.io](https://modelcontextprotocol.io)
- Browser Use, an open-source browser agent: [github.com/browser-use](https://github.com/browser-use/browser-use)
- Web Scraper Pro's chat: what it sends and keeps, on the [AI chat page](/ai-chat), checked against release 1.3.0.
