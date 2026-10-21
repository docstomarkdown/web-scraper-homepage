import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against chrome-extension-source (branch test-branch-1, the release branch) on 2026-09-25:
// - Tools and what each does: lib/tools/{index,capabilityTools,maps,shopify,exportDataset}.ts
//   collect_list / collect_contacts / collect_page_text / collect_product_details are single-page
//   (no pagination is sent). search_maps: 50 by default, up to 200. export_dataset: csv, json, xlsx,
//   with columns named in the user's own words.
// - Suggested prompts per page type: lib/chat/suggestions.json
// - One chat per tab with a switcher: components/chat/ChatSwitcher.tsx, chatSessions.ts
// - collect_product_details runs the same pdpAutoExtract as the side panel, with includeReviews: false
//   (lib/relay/capabilities.ts)
// - What reaches the server: lib/chat/chatClient.ts (messages + page kind, not the URL);
//   analytics `chat_command` records the prompt, page URL and tool args (lib/analytics/events.ts)
// - First use sets up a cloud key automatically, with the Chrome profile email if available:
//   lib/config/autoProvision.ts
// - Daily message limit enforced by the server (webscraper-pro-cloud-worker/src/chat.ts)
// Title and headings target what people type into Google ("ai web scraper", "scrape any website with ai",
// "how to scrape websites with chatgpt"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md in the
// strategy repo. Owner instruction 2026-10-21: titles start with "How to" and say what a user would search.

export const aiChat: FeaturePageContent = {
    page: getPage("ai-chat"),
    meta: {
        title: "How to Scrape Any Website with AI: Free Chrome Extension",
        description:
            "Type what you need, such as \"find plumbers in Denver\" or \"collect the products on this page\", and get a spreadsheet back. The AI reads your request; the rows come from the page, in your browser. Free, no code.",
    },
    eyebrow: "AI web scraper",
    h1: "How to scrape any website with AI by asking for the data",
    intro:
        "Type what you need in plain words, such as \"collect the products on this page\". Web Scraper Pro collects it in your browser and hands you the file. Free Chrome extension, no code, no account.",
    lastUpdated: "2026-09-25",
    fields: {
        eyebrow: "What you can ask",
        heading: "Eight things you can ask for",
        intro: "Say it the way you'd ask a colleague. Chat picks the right tool and runs it on the page you're on.",
        items: [
            { name: "Find businesses", example: "Find plumbers in Denver", description: "Searches Google Maps and collects 20 businesses, or up to 200 if you ask." },
            { name: "Collect this map", example: "Collect the first 20", description: "Collects the Google Maps results you're already looking at." },
            { name: "Collect a list", example: "Collect the products on this page", description: "Products, listings or results on this page, with named columns." },
            { name: "Copy a Shopify store", example: "Every product, one row per size", description: "The whole catalog or one collection, not only what's on screen." },
            { name: "Get product details", example: "Collect this product", description: "Everything on the product page you're on, except reviews." },
            { name: "Find contact details", example: "Find contact emails on this site", description: "Emails, phone numbers and social links on this page." },
            { name: "Get the page text", example: "Collect the page text", description: "The readable text, plus the title, author and date." },
            { name: "Export a file", example: "Only name and phone, as CSV", description: "CSV, Excel or JSON, with only the columns you name." },
        ],
    },
    steps: {
        heading: "How to scrape a website with AI in three steps",
        intro: "No commands to learn. You type, it collects, you ask for the file.",
        items: [
            {
                title: "Type your request",
                body: "Open the side panel and type what you want, or click one of the idea cards for the page you're on. On a Google Maps search, a card asks how many businesses to collect.",
                points: [
                    "Examples: Find dentists in Austin · Collect the products on this page · Find contact emails on this site.",
                    "The count card offers 20, 50, 100 or 200 and remembers your answer.",
                ],
                screenshot: "ext/panel-chat-empty",
            },
            {
                title: "Watch it collect",
                body: "Chat runs the job in your browser and counts the rows as they arrive. The Send button becomes a Stop button while it works.",
                points: [
                    "Esc stops a run too. What's collected so far is kept.",
                    "When a list continues on more pages, a What next card offers Collect every page.",
                ],
                screenshot: "ext/chat-maps-progress",
            },
            {
                title: "Ask for the file",
                body: "Say the format and the columns you want. Every result is also saved in History, and download buttons sit under the result card.",
                points: [
                    "Example: Only name and phone, as CSV.",
                    "Buttons for Google Sheets, Excel, CSV and JSON. View results opens the table.",
                ],
                screenshot: "ext/chat-maps-result-card",
            },
        ],
    },
    sections: [
        {
            id: "your-data",
            eyebrow: "Your data",
            heading: "What the AI sees, and what it doesn't",
            paragraphs: [
                "The AI reads your request and the kind of page you're on, then decides which tool to run. The page itself isn't sent to it. The rows are copied from the page in your browser, so every value is real, not generated.",
                "Your results stay in your browser until you export them. We record your messages and the page's web address to improve chat.",
            ],
        },
        {
            id: "one-chat-per-tab",
            eyebrow: "Several jobs at once",
            heading: "A separate chat for each tab",
            paragraphs: [
                "Collect Google Maps leads in one tab and a product list in another. Each tab keeps its own conversation, and you switch between them from the chat bar.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Three settings chat follows",
            paragraphs: ["They sit under Settings → Results. Words in your request override them for one run."],
            points: [
                "Businesses per chat search: the count the card remembered. Say a number in the request to change it once.",
                "Add emails from their websites: on. Say \"no emails\" in a Google Maps request to skip them once.",
                "Suggested format: the download format shown first under a result card.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When something stops the run",
            heading: "Limits, verifications and offline",
            paragraphs: ["Chat needs an internet connection to understand a request. The collecting still happens in your browser."],
            points: [
                "Chat has a daily message limit. When it's reached, the List and Properties tabs still collect without chat.",
                "If a site shows a verification page during a run, the run stops. Complete the check in the tab and ask again.",
                "If chat picks the wrong list, say which one (\"the main results, not the sidebar\"), or use Choose an item on the page in the List tab.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Chat collects the page you're on. When a list goes on over more pages, it offers Collect every page.",
            "Chat doesn't collect reviews. Use Collect reviews in the side panel.",
            "A Google Maps search collects up to 200 businesses, with emails from each business's website on by default.",
            "Chat has a daily message limit and needs an internet connection.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "A lead list in two sentences", body: "\"Find roofers in Phoenix\", then \"Excel with name, phone and website\"." },
            { title: "Data without learning a tool", body: "Describe what you want instead of hunting for buttons." },
            { title: "The exact columns a client asked for", body: "Name them when you export, and skip the spreadsheet clean-up." },
        ],
    },
    faqs: [
        {
            q: "Is this an AI web scraper?",
            a: "Yes, in the useful sense. The AI reads your request and decides what to collect. The rows come from the page itself, in your browser, so every value is copied from the page, not generated.",
        },
        {
            q: "Can I scrape a website with ChatGPT or Claude instead?",
            a: "You can paste a page into ChatGPT and get a table, but it can't page through a site, sign in, or guarantee the numbers. Chat is built into the extension, so you don't need either. Connecting Claude and other MCP clients to collect through your browser is coming soon.",
        },
        {
            q: "Do I need an account or an API key?",
            a: "No. The first time you use chat, the extension connects to our servers on its own, using your Chrome profile's email if there is one.",
        },
        {
            q: "Is chat free?",
            a: "Yes. Chat is free to use today, like every other feature, with a fair-use limit so it stays available to everyone. There's no account to create.",
        },
        {
            q: "Can chat collect every page of results?",
            a: "Yes. Chat collects the page you're on first, and when the list goes on, it offers Collect every page. Or ask up front: \"collect every page of this list\". Stop keeps what it has.",
        },
        {
            q: "Which file formats can chat export?",
            a: "CSV, Excel and JSON straight from chat. For Google Sheets, export from History or the results page.",
        },
        {
            q: "Can I use chat on a page I'm signed in to?",
            a: "Yes. Chat collects the page as you see it in your browser, including pages behind your own sign-in. It never signs in for you.",
        },
        {
            q: "What happens when I reach the daily message limit?",
            a: "Chat answers again the next day. Until then, the List tab, the Properties tab and Bulk scrape work without chat.",
        },
    ],
    related: ["maps-leads", "shopify-scraper", "list-scraper", "export-to-google-sheets", "mcp"],
};
