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
        title: "AI Chat: Collect Web Data in Plain Words | Web Scraper Pro",
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
            { name: "Find businesses", example: "Find plumbers in Denver", description: "Searches Maps and collects 50 businesses, or up to 200 if you ask." },
            { name: "Collect this map", example: "Collect the first 20", description: "Collects the Maps results you're already looking at." },
            { name: "Collect a list", example: "Collect the products on this page", description: "Products, listings or results on this page, with named columns." },
            { name: "Copy a Shopify store", example: "Every product, one row per size", description: "The whole catalog or one collection, not just what's on screen." },
            { name: "Get product details", example: "Collect this product", description: "Everything on the product page you're on, except reviews." },
            { name: "Find contact details", example: "Find contact emails on this site", description: "Emails, phone numbers and social links on this page." },
            { name: "Get the page text", example: "Collect the page text", description: "Readable text, plus the title, author and date." },
            { name: "Export a file", example: "Only name and phone, as CSV", description: "CSV, Excel or JSON, with just the columns you name." },
        ],
    },
    steps: {
        heading: "Three steps, no commands",
        items: [
            { title: "Type your request", body: "Open the side panel and type, or tap a suggested prompt for the page you're on." },
            { title: "Watch it collect", body: "Chat runs the job in your browser and shows how many rows it found." },
            { title: "Ask for the file", body: "Say the format and columns you want. Every result is also saved in History." },
        ],
    },
    sections: [
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
            "Chat collects the page you're on. To follow every page of results, use Collect in the side panel.",
            "Chat doesn't collect reviews or add emails to a Maps list. Use Collect reviews, or Collect contacts on the Bulk page.",
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
            a: "Not yet. Chat collects the list on the page you're on. To follow every page, click Collect in the side panel.",
        },
        {
            q: "Which file formats can chat export?",
            a: "CSV, Excel (.xlsx) and JSON. For Google Sheets, export from History or the Data Viewer.",
        },
        {
            q: "Is chat part of the plan?",
            a: "Yes. There's one plan, Pro, and it includes every feature.",
        },
    ],
    related: ["maps-leads", "shopify-scraper", "list-scraper", "export-to-google-sheets", "mcp"],
};
