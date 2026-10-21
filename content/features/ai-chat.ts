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

export const aiChat: FeaturePageContent = {
    page: getPage("ai-chat"),
    meta: {
        title: "AI Chat: Collect Web Data in Plain Words",
        description:
            "Type what you need, like \"find plumbers in Denver\", and Web Scraper Pro collects it in your browser. Then ask for the file: CSV, Excel or JSON, with the columns you name.",
    },
    eyebrow: "AI chat",
    h1: "Ask for the data. Get a spreadsheet.",
    intro: "Type what you need in plain words. Web Scraper Pro collects it in your browser, ready to export.",
    lastUpdated: "2026-09-25",
    fields: {
        eyebrow: "What you can ask",
        heading: "Say it the way you'd ask a colleague",
        items: [
            { name: "Find businesses", example: "Find plumbers in Denver", description: "Searches Maps and collects 20 businesses, or up to 200 if you ask." },
            { name: "Collect this map", example: "Collect the first 20", description: "Collects the Maps results you're already looking at." },
            { name: "Collect a list", example: "Collect the products on this page", description: "Products, listings or results on this page, with named columns." },
            { name: "Copy a Shopify store", example: "Every product, one row per size", description: "The whole catalog or one collection, not only what's on screen." },
            { name: "Get product details", example: "Collect this product", description: "Everything on the product page you're on, except reviews." },
            { name: "Find contact details", example: "Find contact emails on this site", description: "Emails, phone numbers and social links on this page." },
            { name: "Get the page text", example: "Collect the page text", description: "Readable text, plus the title, author and date." },
            { name: "Export a file", example: "Only name and phone, as CSV", description: "CSV, Excel or JSON, with only the columns you name." },
        ],
    },
    steps: {
        heading: "Three steps, no commands",
        items: [
            { title: "Type your request",
            points: ["Examples: Find dentists in Austin · Collect the products on this page · Find contact emails on this site.", "On a Maps search, a card asks how many businesses to collect: 20, 50, 100 or 200. It remembers your answer."],
                screenshot: "ext/panel-chat-empty", body: "Open the side panel and type, or click one of the idea cards for the page you're on." },
            { title: "Watch it collect",
            points: ["The run line above the message box counts rows; the Send button becomes a Stop button, and Esc stops too.", "When a list continues on more pages, a What next card offers Collect every page."],
                screenshot: "ext/chat-maps-progress", body: "Chat runs the job in your browser and shows how many rows it found." },
            { title: "Ask for the file",
            points: ["Example: Only name and phone, as CSV.", "Download buttons for Sheets, Excel, CSV and JSON sit under the result card, and View results opens the table."],
                screenshot: "ext/chat-maps-result-card", body: "Say the format and columns you want. Every result is also saved in History." },
        ],
    },
    sections: [
        {
            id: "settings",
            eyebrow: "Settings that change the result",
            heading: "Three settings chat follows",
            paragraphs: ["They sit under Settings → Results, and words in your request override them for one run."],
            points: ["Businesses per chat search: the count the card remembered. Say a number in the request to change it for one search.", "Add emails from their websites: on. Say \"no emails\" in a Maps request to skip them once.", "Suggested format: the download format shown first under a result card."],
        },
        {
            id: "pushback",
            eyebrow: "When something stops the run",
            heading: "Limits, verifications and offline",
            paragraphs: ["Chat needs an internet connection to understand a request; the collecting still happens in your browser."],
            points: ["Chat has a daily message limit. When it's reached, the List and Properties tabs still collect without chat.", "If a site shows a verification page during a run, the run stops. Complete the check in the tab and ask again; what was collected is kept.", "If chat picks the wrong list, say which one (\"the main results, not the sidebar\"), or use Choose an item on the page in the List tab."],
        },
        {
            id: "one-chat-per-tab",
            eyebrow: "Several jobs at once",
            heading: "A separate chat for each tab",
            paragraphs: [
                "Collect Maps leads in one tab and a product list in another. Each tab keeps its own conversation, and you switch between them from the chat bar.",
            ],
        },
        {
            id: "your-data",
            eyebrow: "Your data",
            heading: "What chat sends to our servers",
            paragraphs: [
                "Collecting happens in your browser, and your results stay there until you export them.",
                "To understand your request, your recent messages and the kind of page you're on go to our AI model. We also record your messages and the page's web address to improve chat.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Chat collects the page you're on. When a list goes on over more pages, it offers Collect every page.",
            "Chat doesn't collect reviews. Use Collect reviews in the side panel.",
            "A Maps search collects up to 200 businesses. A card asks how many the first time; emails and social links from each business's website are on by default and can be turned off in Settings → Results.",
            "Chat has a daily message limit and needs an internet connection.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "A lead list in two sentences", body: "\"Find roofers in Phoenix\", then \"Excel with name, phone and website\"." },
            { title: "Data without learning a tool", body: "Describe what you want instead of hunting for buttons." },
            { title: "The exact columns a client asked for", body: "Name them when you export. No spreadsheet clean-up afterwards." },
        ],
    },
    faqs: [
        {
            q: "Do I need an account or an API key?",
            a: "No. The first time you use chat, the extension connects to our servers on its own, using your Chrome profile's email if there is one.",
        },
        {
            q: "Can chat collect every page of results?",
            a: "Yes. Chat collects the page you're on first, and when the list goes on, it offers Collect every page. Or ask for it up front: \"collect every page of this list\". Stop keeps what it has.",
        },
        {
            q: "Which file formats can chat export?",
            a: "CSV, Excel (.xlsx) and JSON. For Google Sheets, export from History or the Data Viewer.",
        },
        {
            q: "Is chat part of the plan?",
            a: "Yes. There's one plan, Pro, and it includes every feature.",
        },
        {
            q: "Is this an AI web scraper?",
            a: "The AI reads your request and decides what to collect; the rows come from the page itself, in your browser. So every value is copied from the page, not generated, and nothing on the page is sent to the AI.",
        },
        {
            q: "Does it work with ChatGPT or Claude?",
            a: "Chat is built into the extension, so you don't need either. Connecting Claude and other MCP clients to collect through your browser is coming soon.",
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
