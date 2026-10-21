import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Coming soon: nothing here ships in the extension yet. The cloud worker exists (webscraper-pro-cloud-worker) and the
// extension's cloud controls are behind the cloudLaunched flag (config/buildFeatures.ts). Keep every claim in the future
// tense and within docs/personas.md "Cloud (when it launches)": up to 200 URLs per batch, results as CSV, JSON or Excel,
// daily or weekly schedules, a REST API with a key, Google sign-in for the dashboard, the extension stays account-free.
// No screenshots, PDFs or cloud Sheets export until verified. Signed-in pages stay with the extension.
//
// Title and headings are worded the way a person asks ("scheduled web scraping", "run a scraper without my computer
// on"); the search data for cloud runs is thin (youtube-research/AUTOSUGGEST.md). Owner instruction 2026-10-21:
// titles start with "How to" and say what a user would search. Copy rules: docs/writing-style.md §11.
// Deepened 2026-10-21 (owner: pages too thin): what the first release will do, what stays in the extension, what a
// scheduled job will look like, questions before launch. Nothing promised beyond the facts above.

export const cloud: FeaturePageContent = {
    page: getPage("cloud"),
    meta: {
        title: "How to Run a Web Scraper on a Schedule, Without Your Browser",
        description:
            "Coming soon: paste a list of up to 200 URLs, run it on our servers, schedule it daily or weekly, and download the results as CSV, JSON or Excel.",
    },
    eyebrow: "Cloud runs",
    h1: "How to run a web scraper on a schedule in the cloud",
    intro:
        "Coming soon. Paste a list of pages, close your laptop, and download the results later. Run the same job every day or week, and reach it from your own code with a REST API.",
    lastUpdated: "2026-10-20",
    steps: {
        heading: "How it will work, in three steps",
        intro: "Nothing here is available in the extension today. The steps describe what's planned.",
        items: [
            {
                title: "Sign in to the cloud dashboard",
                body: "With a Google account. The extension itself stays account-free.",
            },
            {
                title: "Paste your URLs and choose a schedule",
                body: "Up to 200 addresses per batch, pasted or uploaded as a CSV. Run it once, daily or weekly.",
            },
            {
                title: "Download the results",
                body: "Each run is saved. Download it as CSV, JSON or Excel from the dashboard, or pull it through the API.",
            },
        ],
    },
    fields: {
        eyebrow: "What's planned",
        heading: "The same collection, on our servers",
        intro: "Details may change before release; nothing here is available in the extension today.",
        items: [
            { name: "Batches of up to 200 URLs", description: "Paste the list or upload a CSV, and every page is collected on our servers." },
            { name: "Daily or weekly schedules", description: "A job that runs on its own and gives you a fresh table each time." },
            { name: "Results as CSV, JSON or Excel", description: "Download each run's results from the dashboard, or fetch them from the API." },
            { name: "A REST API", description: "Send URLs with an API key and get the results back as JSON, from any language." },
        ],
    },
    sections: [
        {
            id: "first-release",
            eyebrow: "What's in the first release",
            heading: "What the first release will do, and what it won't",
            paragraphs: [
                "The first release is a smaller thing than the word cloud suggests: a place to paste a list of pages, a schedule, and a table to download. Here is what's planned, feature by feature, and what is on purpose left out.",
            ],
            table: {
                columns: ["Feature", "How it will work", "Status"],
                rows: [
                    ["Batch of up to 200 URLs", "Paste or upload a CSV; every page is collected on our servers, no browser needed.", "Planned for the first release"],
                    ["Daily or weekly schedule", "The same batch runs on its own and saves a fresh table each time.", "Planned for the first release"],
                    ["Results as CSV, JSON or Excel", "Download from the dashboard, or fetch through the API.", "Planned for the first release"],
                    ["REST API with an API key", "Send URLs, get JSON back; the same key the MCP tools will use.", "Planned for the first release"],
                    ["Google Sheets delivery, screenshots, PDFs", "Not in the first release.", "Not planned yet"],
                    ["Pages behind a sign-in", "Stay with the extension, which reads the pages you can see.", "Never in the cloud"],
                ],
            },
        },
        {
            id: "in-the-extension",
            eyebrow: "What you can do today",
            heading: "What stays in the extension",
            paragraphs: [
                "Everything on this site works in the extension today, in your browser, for free. The cloud adds two things the browser can't: running while your laptop is closed, and running on a schedule.",
                "Two jobs stay with the extension even after the cloud ships. Pages you have to sign in to, because the cloud never has your sign-in. And anything you want to watch as it runs, because the extension shows the rows arriving.",
            ],
            points: [
                "Bulk scrape already covers long lists today: paste up to the whole list, and each site is collected in turn in your open browser.",
                "A run you do today is saved in History; a cloud run will be saved in the dashboard.",
                "The extension stays account-free. The dashboard uses a Google sign-in.",
            ],
        },
        {
            id: "today-vs-cloud",
            eyebrow: "Today and later",
            heading: "Bulk scrape today, cloud runs later: what changes",
            paragraphs: [
                "Most of what a cloud run will do, Bulk scrape does today in your open browser. The difference is where it runs and whether it can repeat itself. If you only need a long list collected once, you don't have to wait.",
            ],
            table: {
                columns: ["", "Bulk scrape today", "Cloud runs, when they ship"],
                rows: [
                    ["Where it runs", "In your open Chrome window, one site at a time", "On our servers, laptop closed"],
                    ["How many addresses", "As many as the file holds, one run at a time", "Up to 200 per batch"],
                    ["Repeating", "You start each run", "Daily or weekly on a schedule"],
                    ["Signed-in pages", "Yes, the pages you can see", "No"],
                    ["Where results go", "History, then Excel, CSV, JSON or Google Sheets", "The dashboard, then CSV, JSON or Excel, or the API"],
                    ["Account", "None", "Google sign-in for the dashboard"],
                ],
            },
        },
        {
            id: "a-scheduled-job",
            eyebrow: "What it will look like",
            heading: "What a scheduled job will look like",
            paragraphs: ["A made-up example, in the future tense: a store owner who wants a competitor's prices every morning."],
            steps: [
                { title: "Paste the 120 product addresses into a batch.", body: "Or upload them as a CSV. The batch is saved under a name." },
                { title: "Set the schedule to daily.", body: "The batch runs on our servers each day without the laptop open." },
                { title: "Open the dashboard with coffee.", body: "The day's table is waiting: one row per product with its price. Download it as Excel, or let a script fetch it through the API and compare it with yesterday's." },
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Everything on this page is planned, not released. The extension does every job in your browser today.",
            "Sites that need you to be signed in will still need the extension, which works on the pages you can see.",
            "Nothing has been priced. The extension is free today, and this page will say so if the cloud is priced when it ships.",
        ],
    },
    useCases: {
        heading: "What it's for",
        items: [
            { title: "Price checks every morning", body: "The same competitor pages, collected daily, without opening Chrome." },
            { title: "New listings each week", body: "A listings search re-run weekly, with the results waiting in the dashboard." },
            { title: "Long lists overnight", body: "Hundreds of pages collected while your laptop is closed." },
        ],
    },
    faqs: [
        {
            q: "Can a web scraper run without my computer on?",
            a: "Not yet with Web Scraper Pro. Today every run happens in your open browser, and bulk runs cover long lists there. Cloud runs on our servers are coming.",
        },
        {
            q: "Can I schedule a scrape to run daily?",
            a: "That's what cloud runs are for: a job set to run daily or weekly, with a fresh table each time. It isn't released yet; for now you run it when you need fresh numbers.",
        },
        {
            q: "What does the 200-URL limit mean?",
            a: "One batch holds up to 200 addresses. A longer list is more than one batch. The limit is for the first release and may change.",
        },
        {
            q: "Will there be an API?",
            a: "Yes, a REST API with an API key. You send URLs and get the results back as JSON, from any language.",
        },
        {
            q: "Will I need an account?",
            a: "For the cloud dashboard, a Google sign-in. The extension stays account-free.",
        },
        {
            q: "Will the cloud collect pages I have to sign in to?",
            a: "No. The cloud never has your sign-in. Those pages stay with the extension, which reads what you can see in your own browser.",
        },
        {
            q: "Will it be free?",
            a: "The extension is free today, and nothing has been priced yet. This page will say so if that changes when cloud runs launch.",
        },
        {
            q: "When will cloud runs ship?",
            a: "No date yet, on purpose. This page describes what's planned; the changelog will carry the release when it's real, and until then nothing here is for sale.",
        },
    ],
    related: ["bulk-scraper", "mcp", "list-scraper", "export-to-google-sheets"],
};
