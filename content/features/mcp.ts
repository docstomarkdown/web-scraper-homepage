import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Coming soon: in release 1.3.0 the Browser Relay (the extension's MCP connection) is behind the cloudLaunched flag and
// doesn't run (config/buildFeatures.ts, lib/relay/). The cloud MCP server exists in webscraper-pro-cloud-worker
// (src/mcp/server.ts: scrape_url, scrape_urls, get_scrape_result) but ships with the cloud. Keep every claim future tense.
// Facts beyond the file: docs/personas.md "Developer access" and "Cloud is coming soon" (one API key shared by the
// extension's cloud connection and MCP access; browser-relay tools use the page open in the user's extension;
// Shopify phase 3 "chat tool and relay" is built but the relay is off behind the flag).
//
// Title and headings are worded the way a person asks ("ai web scraper mcp", "google maps scraper mcp"); the search
// data for MCP is thin (youtube-research/AUTOSUGGEST.md). Owner instruction 2026-10-21: titles start with "How to"
// and say what a user would search. Copy rules: docs/writing-style.md §11.
// Deepened 2026-10-21 (owner: pages too thin): what the first release will do, what stays in the extension, how
// you'll set it up, questions before launch. Nothing promised beyond the sources above.

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
    sections: [
        {
            id: "first-release",
            eyebrow: "What's in the first release",
            heading: "What the first release will do, and what it won't",
            paragraphs: [
                "Two kinds of tool are planned, and they differ in where the work happens. One uses the page open in your browser, through the extension. The other sends addresses to our servers and ships with cloud runs.",
            ],
            table: {
                columns: ["Tool", "How it will work", "Status"],
                rows: [
                    ["Collect from the open page", "The agent asks the extension for the page you have open: its list, contacts, page text, product details or Shopify catalog. Runs in your browser, so signed-in pages work.", "Planned; the switch exists in the extension but stays off until release"],
                    ["scrape_url, scrape_urls", "The agent sends one address or a list to the cloud, where the pages are collected without a browser.", "Planned; ships with cloud runs"],
                    ["get_scrape_result", "The agent fetches the finished table for a cloud job.", "Planned; ships with cloud runs"],
                    ["Per-site tools", "Named tools for Google Maps, Amazon and so on.", "Not planned for the first release; the generic tools cover them"],
                ],
                caption: "Tool names as they appear in the cloud server's code today; they may change before release.",
            },
        },
        {
            id: "in-the-extension",
            eyebrow: "What you can do today",
            heading: "What stays in the extension, with or without an agent",
            paragraphs: [
                "The extension's own chat already collects data by asking: type what you want in the Chat tab and the right collector runs on the page you're on. That's the same idea as MCP, without an outside client, and it works today.",
                "The extension stays free, and the browser connection will be a switch inside it, not a separate product. An agent that uses your browser can only see the pages you open, and only while the switch is on.",
            ],
            points: [
                "Chat in the side panel: collect a list, a Google Maps search, a product's details, contacts or page text, by asking.",
                "Everything the agent could collect from your browser, you can collect yourself today from the same page.",
                "Sign-in-walled social networks stay out of reach, with or without an agent.",
            ],
        },
        {
            id: "chat-vs-mcp",
            eyebrow: "Today and later",
            heading: "Chat today, MCP later: what changes",
            paragraphs: [
                "If the job is a page you have open and a table you want back, the chat in the side panel does it now. MCP is for the case where the collecting is one step inside something bigger that an agent runs for you.",
            ],
            table: {
                columns: ["", "Chat in the extension today", "MCP, when it ships"],
                rows: [
                    ["Who asks", "You, in the Chat tab", "An agent in Claude or another MCP client, on your behalf"],
                    ["What it can collect", "The page you're on: a list, a Google Maps search, a product, contacts, page text, a Shopify catalog", "The same from your open page, plus URL lists through the cloud"],
                    ["Where the table goes", "The results page, History and your exports", "Back to the agent, which can write, compare or file it"],
                    ["What's needed", "The extension", "A server entry in your client; the browser switch on; an API key for the cloud tools"],
                    ["Available", "Now", "With the cloud release"],
                ],
            },
        },
        {
            id: "setup",
            eyebrow: "Setting up",
            heading: "How you'll set it up",
            paragraphs: ["Three parts, and only the first two touch your machine. None of them is available yet."],
            steps: [
                { title: "Add the server to your client.", body: "One server entry in Claude's settings or any other MCP client. The client lists the tools it can call." },
                { title: "Turn on the browser connection in the extension's settings.", body: "Only when you want an agent to use the page you have open. Turn it off again when you're done." },
                { title: "Use one API key for the cloud tools.", body: "The same key the cloud dashboard and the REST API will use, so an agent that sends a URL list is tied to your account." },
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Everything on this page is planned, not released. The extension's own chat collects data by asking today, without an external agent.",
            "No LinkedIn or other sign-in-walled social networks, with or without an agent.",
            "The agent gets the table the tool returns. What it does with it is up to the agent and the client you chose.",
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
            q: "What's the difference between the chat in the extension and MCP?",
            a: "Chat is built in: you ask, the extension collects. MCP lets a client outside the extension, such as Claude on your desktop, call the same collectors as part of a longer task.",
        },
        {
            q: "Will the agent see my browser?",
            a: "Only the pages you open, and only while the browser connection is turned on in the extension's settings. It's off by default.",
        },
        {
            q: "Will I need an API key?",
            a: "For the cloud tools, yes: the same key the cloud dashboard and the REST API will use. The browser connection is a switch in the extension's settings.",
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
