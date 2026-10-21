import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Coming soon: in release 1.3.0 the Browser Relay (the extension's MCP connection) is behind the cloudLaunched flag and
// doesn't run (config/buildFeatures.ts, lib/relay/). The cloud MCP server exists in webscraper-pro-cloud-worker
// (src/mcp/server.ts: scrape_url, scrape_urls, get_scrape_result) but ships with the cloud. Keep every claim future tense.
//
// Title and headings are worded the way a person asks ("ai web scraper mcp", "google maps scraper mcp"); the search
// data for MCP is thin (youtube-research/AUTOSUGGEST.md). Owner instruction 2026-10-21: titles start with "How to"
// and say what a user would search. Copy rules: docs/writing-style.md §11.

export const mcp: FeaturePageContent = {
    page: getPage("mcp"),
    meta: {
        title: "How to Connect Claude or ChatGPT to a Web Scraper with MCP",
        description:
            "Coming soon: connect Claude or another MCP client to Web Scraper Pro, so an AI agent can collect lists, contacts and product details from pages in your browser or on our servers.",
    },
    eyebrow: "MCP and AI agents",
    h1: "How to connect Claude or ChatGPT to a web scraper with MCP",
    intro:
        "Coming soon. Claude and other MCP clients will be able to call Web Scraper Pro as a tool. Pages open in your browser go through the extension; lists of addresses go through the cloud.",
    lastUpdated: "2026-10-20",
    steps: {
        heading: "How it will work, in three steps",
        intro: "Nothing here is available in the extension today. The steps describe what's planned.",
        items: [
            {
                title: "Add the server to your MCP client",
                body: "One entry in Claude's settings, or in any other MCP client. The client then sees the collectors as tools it can call.",
            },
            {
                title: "Turn on the browser connection",
                body: "In the extension's settings, when you want an agent to use the page you have open. It stays off until you turn it on.",
                points: ["The agent only sees pages you open."],
            },
            {
                title: "Ask the agent",
                body: "Describe the job in plain words and the agent calls the right collector.",
                points: ["Example: Collect the products on this page and compare prices with last week."],
            },
        ],
    },
    fields: {
        eyebrow: "What's planned",
        heading: "The tools an agent will be able to call",
        intro: "Details may change before release; nothing here is available in the extension today.",
        items: [
            { name: "Collect from the open page", description: "The list, contacts, page text, product details or Shopify catalog of the page you have open, including pages you're signed in to." },
            { name: "Collect from a URL list", description: "scrape_url and scrape_urls send pages to the cloud; get_scrape_result fetches the table, with no browser needed." },
            { name: "Your permission, every time", description: "The browser connection is off until you turn it on, and the agent only sees pages you open." },
        ],
    },
    limits: {
        heading: "Good to know",
        items: [
            "Everything on this page is planned, not released. The extension's own chat collects data by asking today, without an external agent.",
            "No LinkedIn or other sign-in-walled social networks, with or without an agent.",
        ],
    },
    useCases: {
        heading: "What it's for",
        items: [
            { title: "Research agents", body: "An agent that gathers a competitor's catalog or a list of papers as part of a bigger task." },
            { title: "Lead-list automations", body: "An agent that searches Google Maps, collects the businesses and writes the first draft of an email." },
            { title: "Your own scripts", body: "Code that asks for a page's table through the same tools, without writing a scraper." },
        ],
    },
    faqs: [
        {
            q: "Can I scrape a website with Claude or ChatGPT today?",
            a: "Yes, inside the extension. The AI chat in the side panel collects data from the page you're on when you ask in plain words. MCP is for connecting an external agent, and that part is coming soon.",
        },
        {
            q: "What is MCP?",
            a: "The Model Context Protocol, a standard way for an AI client such as Claude to call outside tools. Web Scraper Pro will offer its collectors as those tools.",
        },
        {
            q: "Will the agent see my browser?",
            a: "Only the pages you open, and only while the browser connection is turned on in the extension's settings. It's off by default.",
        },
        {
            q: "Will it be free?",
            a: "The extension is free today, and nothing has been priced yet. This page will say so if that changes when MCP access launches.",
        },
        {
            q: "When will MCP and the browser connection ship?",
            a: "With the cloud release. There's no date on this page on purpose; the changelog will carry it when it's real, and this page will stop saying coming soon.",
        },
        {
            q: "Which MCP clients will work?",
            a: "Any client that follows the protocol. Claude is the one described here; the setup is one server entry in the client's settings.",
        },
    ],
    related: ["ai-chat", "cloud", "bulk-scraper"],
};
