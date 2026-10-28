import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against chrome-extension-source (branch test-branch-1, the release branch) on 2026-09-25,
// re-read 2026-10-21 against DECISIONS.md D-025 to D-029 and lib/tools/maps.ts:
// - Tools and what each does: lib/tools/{index,capabilityTools,maps,shopify,exportDataset}.ts
//   collect_list / collect_contacts / collect_page_text / collect_product_details are single-page
//   (no pagination is sent). search_maps: the card starts on 20, offers 50, 100, 200 and "Or type a number",
//   up to 200; the count is remembered. export_dataset: csv, json, xlsx, with columns named in the user's words.
// - Suggested prompts per page type: lib/chat/suggestions.json ("Collect the list on this page", "Find contact
//   emails on this site", "Find dentists with emails near me", "Find HVAC contractors near me")
// - One chat per tab with a switcher: components/chat/ChatSwitcher.tsx, chatSessions.ts
// - A list collected in chat says when the page has more and offers Collect every page (D-025, D-027) and the
//   websites' contact details (D-025); "Combine the N searches into one table" card (D-029); chat tidies the
//   last collection from any tab, and its downloads are what the results page shows (D-028)
// - collect_product_details runs the same pdpAutoExtract as the side panel, with includeReviews: false
//   (lib/relay/capabilities.ts)
// - What reaches the server: lib/chat/chatClient.ts (messages + page kind, not the URL);
//   analytics `chat_command` records the prompt, page URL and tool args (lib/analytics/events.ts, D-036)
// - First use sets up a cloud key automatically, with the Chrome profile email if available:
//   lib/config/autoProvision.ts
// - Daily message limit enforced by the server (webscraper-pro-cloud-worker/src/usage-limits.ts)
// - A first Google Maps search with contact details returns in about a minute and a half (lib/tools/maps.ts
//   comment; D-034 measured 73–79 s for 20 dentists)
// Verify before publishing: the daily message limit's number isn't stated on purpose; the time for a 24-item list
// page ("under a minute") is not measured here.
// Title and headings target what people type into Google ("ai web scraper", "scrape any website with ai",
// "how to scrape websites with chatgpt"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md in the
// strategy repo. This page owns "scrape any website with AI"; the guide owns "scrape a website without coding, by asking".

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
    lastUpdated: "2026-10-21",
    fields: {
        eyebrow: "What you can ask",
        heading: "Eight things you can ask for",
        intro: "Say it the way you'd ask a colleague. Chat picks the right tool and runs it on the page you're on.",
        items: [
            { name: "Collect a list", example: "Collect the products on this page", description: "Products, listings or results on this page, with named columns." },
            { name: "Collect every page", example: "Collect every listing, all pages", description: "The list on this page, then Next page, Load more or scrolling until the list ends or your number is reached." },
            { name: "Find businesses", example: "Find plumbers in Denver", description: "Searches Google Maps and collects 20 businesses, or up to 200 if you ask, with their emails." },
            { name: "Copy a Shopify store", example: "Every product, one row per size", description: "The whole catalog or one collection, not only what's on screen." },
            { name: "Get product details", example: "Collect this product", description: "Everything on the product page you're on, except reviews." },
            { name: "Find contact details", example: "Find contact emails on this site", description: "Emails, phone numbers and social links on this page and its Contact page." },
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
                body: "Open the side panel and type what you want, or click one of the idea cards for the page you're on. Chat picks the tool from your words.",
                points: [
                    "Examples: Collect every plumber in this list · Collect the products on this page · Find contact emails on this site.",
                    "If it picks the wrong list, say which one in plain words, such as \"the main results, not the sidebar\".",
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
                screenshot: "ext/chat-collect-list-progress",
            },
            {
                title: "Ask for the file",
                body: "Say the format and the columns you want. Every result is also saved in History, and download buttons sit under the result card.",
                points: [
                    "Example: Only name and phone, as CSV.",
                    "The buttons under a card are the same as the results page: Google Sheets, Excel, CSV and JSON. View results opens the table.",
                ],
                screenshot: "ext/chat-collect-list-result",
            },
        ],
    },
    sections: [
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "From \"Collect every plumber in this list\" to an Excel file, in three sentences",
            paragraphs: ["Here is a whole chat on a Yellow Pages search for plumbers in Denver, with what appears after each line. The steps are as 1.3.0 shows them; the counts are an example, and yours will differ by directory and city."],
            steps: [
                { title: "You: Collect every plumber in this list.", body: "Chat collects the page, finds the directory's Next page link, and pages through the list the way the List tab does. The progress line counts the rows as they arrive." },
                { title: "Chat: done.", body: "A result card shows 96 rows with business name, phone, address, rating and website in named columns. Under it, a card offers Add emails and social links, because the rows have a Website column." },
                { title: "You: click Add emails and social links.", body: "Each business's website and one linked Contact or About page are read, and Emails, Website phones and one column per social network fill in on the same rows. A business that publishes no email keeps an empty cell." },
                { title: "You: Only name, phone, website and emails, sorted by rating.", body: "A new, tidied collection is saved with those columns, best rated first. The card under it has the download buttons." },
                { title: "You: As Excel.", body: "The file downloads with ratings as numbers. The same table sits in History and on the results page." },
            ],
        },
        {
            id: "what-to-do-with-the-table",
            eyebrow: "After the run",
            heading: "Four things to say once the rows are in",
            paragraphs: ["Chat tidies the last collection from any tab, so you can keep talking after the run without opening the results page."],
            table: {
                columns: ["You want", "Say", "What happens"],
                rows: [
                    ["Fewer columns", "Only name, phone and website", "A new table with those columns; the original stays in History"],
                    ["A different order", "Sorted by rating, highest first", "The rows are re-ordered and saved"],
                    ["The rest of the list", "Collect every page", "The List tab's own paged run continues from the page you're on"],
                    ["Emails for every row with a website", "Add emails and social links", "Each site is read and the contact columns fill in on the same rows"],
                ],
            },
        },
        {
            id: "your-data",
            eyebrow: "Your data",
            heading: "What the AI sees, and what it doesn't",
            paragraphs: [
                "The AI reads your request and the kind of page you're on, then decides which tool to run. The page itself isn't sent to it. The rows are copied from the page in your browser, so every value is real, not generated.",
                "Your results stay in your browser until you export them. We record your messages and the page's web address to improve chat; the privacy policy says exactly what is kept.",
            ],
        },
        {
            id: "one-chat-per-tab",
            eyebrow: "Several jobs at once",
            heading: "A separate chat for each tab",
            paragraphs: [
                "Collect a directory list in one tab and a product list in another. Each tab keeps its own conversation, and you switch between them from the chat bar.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Two settings chat follows",
            paragraphs: ["They sit under Settings → Results. Words in your request override them for one run."],
            table: {
                columns: ["Setting", "Default", "Change it when"],
                rows: [
                    ["Add emails from their websites", "On", "You want a fast list without emails; or say \"no emails\" in a request to skip them once"],
                    ["Suggested format", "The format you exported last", "You always want CSV for your email tool, say"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with pasting into ChatGPT, writing a script, or using an API",
            paragraphs: [
                "A chat assistant can turn one page you paste into a table, and it can write you a scraper. It can't page through a site, sign in, or guarantee that the numbers it returns are the ones on the page. Here the AI only decides what to run; the rows are copied from the page.",
            ],
            table: {
                columns: ["Method", "What you do", "Time for 100 rows", "Where it breaks"],
                rows: [
                    ["Web Scraper Pro chat", "Type one sentence, press Enter", "A minute or two; adding emails from each website takes longer, about four minutes per 50 sites", "Pages that need a sign-in you don't have; the daily message limit"],
                    ["Paste into a chat assistant", "Copy the page text, paste, ask for a table", "Minutes per page, by hand, for every page", "Pages too long to paste; numbers it changes or invents; no next page"],
                    ["Ask an assistant for a script", "Run and fix the code it writes", "Hours the first time", "Sites that render with JavaScript; blocks; every redesign"],
                    ["A paid API", "Sign up, pay per page", "Minutes", "Per-page costs; no view of your signed-in pages"],
                ],
            },
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
        {
            id: "doesnt-do",
            eyebrow: "Limits",
            heading: "What it doesn't do",
            paragraphs: ["Six things people ask chat for that it doesn't do, so the first run goes the way you expect."],
            points: [
                "It doesn't collect reviews. Use Collect reviews in the side panel on a product page.",
                "It doesn't make up rows or fill gaps. A detail the page doesn't show stays empty.",
                "It doesn't sign in, solve a verification or open a page you can't open yourself.",
                "It doesn't run while you're offline or when the daily message limit is reached; the side panel tabs still do.",
                "It doesn't open each row's own page after collecting a list. For details from those pages, paste the link column into Bulk scrape (lists, contacts or page text).",
                "It doesn't send the page to the AI. Your request and the kind of page go; the rows are read in your browser.",
            ],
        },
        {
            id: "goes-wrong",
            eyebrow: "Troubleshooting",
            heading: "When it goes wrong",
            paragraphs: ["Five things that trip a chat run, and the fix for each."],
            points: [
                "Chat collected the wrong list. Say which one in plain words, or switch to the List tab and click Choose an item on the page.",
                "Only one page was collected. Say \"collect every page\", or click Collect every page on the What next card.",
                "The run stopped with a verification. Complete it in the tab the run opened, keep that tab in front, and ask again; the rows so far are kept.",
                "Chat says the daily limit is reached. Use the List or Properties tab for the rest of the day; chat answers again tomorrow.",
                "The emails column is empty. The request said \"no emails\", or the setting is off. Say \"with emails\", or click Add contact details on the results page.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Chat collects the page you're on. When a list goes on over more pages, it offers Collect every page.",
            "Chat doesn't collect reviews. Use Collect reviews in the side panel.",
            "It also searches Google Maps, up to 200 businesses per request. For Maps-only lead lists, [Maps Scraper Pro's chat](https://mapsscraper.pro/chat) is the same engine, Maps only.",
            "Chat has a daily message limit and needs an internet connection.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "A lead list in two sentences", body: "\"Collect every roofer in this list\" on a directory search, then \"Add emails and social links\" from the card that follows." },
            { title: "Data without learning a tool", body: "Describe what you want instead of hunting for buttons." },
            { title: "The exact columns a client asked for", body: "Name them when you export, and skip the spreadsheet clean-up." },
            { title: "Several cities as one list", body: "Search each city in one conversation, then combine the searches into one table from the card." },
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
            a: "Yes. Chat is free, like every other feature, with a fair-use limit so it stays available to everyone. There's no account to create.",
        },
        {
            q: "Can chat collect every page of results?",
            a: "Yes. Chat collects the page you're on first, and when the list goes on, it offers Collect every page. Or ask up front: \"collect every page of this list\". Stop keeps what it has.",
        },
        {
            q: "Which file formats can chat export?",
            a: "CSV, Excel, JSON and Google Sheets, the same buttons the results page shows. Say the format in the request, such as \"as CSV\", or click a button under the result card.",
        },
        {
            q: "Can I use chat on a page I'm signed in to?",
            a: "Yes. Chat collects the page as you see it in your browser, including pages behind your own sign-in. It never signs in for you.",
        },
        {
            q: "Does the AI see my data?",
            a: "It sees your request and the kind of page you're on, not the page itself. The rows are read in your browser. We keep your messages and the page address to improve chat, as the privacy policy says.",
        },
        {
            q: "Can I combine several searches into one table?",
            a: "Yes. After two or more searches or lists of the same kind in one conversation, the last result card offers Combine the N searches into one table. The combined table gets a column saying where each row came from.",
        },
        {
            q: "Which model does the chat use, and does it matter?",
            a: "Chat sends your words, the kind of page you're on and the list of tools to our server, which asks a Claude model (Claude Haiku 5.5 on release 1.3.0; the server can change it without an extension update) to pick the tool and its settings. The model never sees the page or your rows and never writes them: the extension copies the values from the page. So the model decides what runs; it doesn't decide what the numbers are.",
        },
        {
            q: "What happens when I reach the daily message limit?",
            a: "Chat answers again the next day. Until then, the List tab, the Properties tab and Bulk scrape work without chat.",
        },
    ],
    related: ["list-scraper", "shopify-scraper", "email-extractor", "export-to-google-sheets", "mcp"],
};
