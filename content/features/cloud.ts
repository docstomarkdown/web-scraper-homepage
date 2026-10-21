import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Coming soon: nothing here ships in the extension yet. The cloud worker exists (webscraper-pro-cloud-worker) and the
// extension's cloud controls are behind the cloudLaunched flag (config/buildFeatures.ts). Keep every claim in the future
// tense and within docs/personas.md "Cloud (when it launches)": up to 200 URLs per batch, results as CSV, JSON or Excel,
// daily or weekly schedules, a REST API with a key. No screenshots, PDFs or cloud Sheets export until verified.
//
// Title and headings are worded the way a person asks ("scheduled web scraping", "run a scraper without my computer
// on"); the search data for cloud runs is thin (youtube-research/AUTOSUGGEST.md). Owner instruction 2026-10-21:
// titles start with "How to" and say what a user would search. Copy rules: docs/writing-style.md §11.

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
    limits: {
        heading: "Good to know",
        items: [
            "Everything on this page is planned, not released. The extension does every job in your browser today.",
            "Sites that need you to be signed in will still need the extension, which works on the pages you can see.",
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
            q: "Will there be an API?",
            a: "Yes, a REST API with an API key. You send URLs and get the results back as JSON, from any language.",
        },
        {
            q: "Will I need an account?",
            a: "For the cloud dashboard, a Google sign-in. The extension stays account-free.",
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
