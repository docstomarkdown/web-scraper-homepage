import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Coming soon: in release 1.3.0 the Browser Relay (the extension's MCP connection) is behind the cloudLaunched flag and
// doesn't run (config/buildFeatures.ts, lib/relay/). The cloud MCP server exists in webscraper-pro-cloud-worker
// (src/mcp/server.ts: scrape_url, scrape_urls, get_scrape_result) but ships with the cloud. Keep every claim future tense.

export const mcp: FeaturePageContent = {
    page: getPage("mcp"),
    meta: {
        title: "MCP and AI Agents: Let Claude Collect Web Data",
        description: "Coming soon: connect Claude or another MCP client to Web Scraper Pro, so an agent can collect lists, contacts and product details from pages in your browser or on our servers.",
    },
    eyebrow: "MCP and AI agents",
    h1: "Plug Web Scraper Pro into your AI agent",
    intro: "Coming soon. Claude and other MCP clients will be able to call the same collectors as a tool: pages open in your browser through the extension, and lists of URLs through the cloud.",
    lastUpdated: "2026-10-20",
    fields: {
        eyebrow: "What's planned",
        heading: "Tools an agent can call",
        intro: "Details may change before release. Nothing here is available in the extension today.",
        items: [
            { name: "Collect from the open page", description: "An agent asks the extension for the list, contacts, page text, product details or Shopify catalog of the page you have open, including pages you're signed in to." },
            { name: "Collect from a URL list", description: "scrape_url and scrape_urls send pages to the cloud and get_scrape_result fetches the table, with no browser needed." },
            { name: "Your permission, every time", description: "The browser connection is off until you turn it on, and the agent only sees pages you open." },
        ],
    },
    steps: {
        heading: "How it will work",
        items: [
            { title: "Add the server to your MCP client", body: "One entry in Claude's settings, or any other MCP client." },
            { title: "Turn on the browser connection", body: "In the extension's settings, when you want an agent to use the page you're on." },
            { title: "Ask the agent", body: "\"Collect the products on this page and compare prices with last week.\"" },
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
            { title: "Lead-list automations", body: "An agent that searches Maps, collects the businesses and writes the first draft of an email." },
        ],
    },
    faqs: [
        { q: "Can I use the chat inside the extension today?", a: "Yes. The AI chat in the side panel collects data from the page you're on by asking in plain words. MCP is for connecting an external agent." },
        { q: "Will it be part of the same plan?", a: "Yes. There's one plan, Pro, and MCP access will be included when it launches." },
        {
            q: "When will MCP and the browser connection ship?",
            a: "With the cloud release. There's no date on this page on purpose; the changelog will carry it when it's real, and this page will stop saying coming soon.",
        },
    ],
    related: ["ai-chat", "cloud", "bulk-scraper"],
};
