import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Coming soon: nothing here ships in the extension yet. The cloud worker exists (webscraper-pro-cloud-worker) and the
// extension's cloud controls are behind the cloudLaunched flag (config/buildFeatures.ts). Keep every claim in the future
// tense and within docs/personas.md "Cloud (when it launches)": up to 200 URLs per batch, results as CSV, JSON or Excel,
// daily or weekly schedules, a REST API with a key. No screenshots, PDFs or cloud Sheets export until verified.

export const cloud: FeaturePageContent = {
    page: getPage("cloud"),
    meta: {
        title: "Cloud Runs: Scheduled Scraping Without Your Browser Open",
        description: "Coming soon: paste a list of up to 200 URLs, run it on our servers, schedule it daily or weekly, and download the results as CSV, JSON or Excel.",
    },
    eyebrow: "Cloud runs",
    h1: "Big jobs and scheduled runs, without keeping your browser open",
    intro: "Coming soon. Paste a list of pages, close your laptop, and download the results later. Run the same job every day or week, and reach it from your own code with a REST API.",
    lastUpdated: "2026-10-20",
    fields: {
        eyebrow: "What's planned",
        heading: "The same collection, on our servers",
        intro: "Details may change before release. Nothing here is available in the extension today.",
        items: [
            { name: "Batches of up to 200 URLs", description: "Paste the list or upload a CSV, and every page is collected on our servers." },
            { name: "Daily or weekly schedules", description: "Set a job to run on its own and get a fresh table each time, for price checks and new listings." },
            { name: "Results as CSV, JSON or Excel", description: "Download each run's results from the cloud dashboard, or fetch them from the API." },
            { name: "A REST API", description: "Send URLs with an API key and get the results back as JSON, from any language." },
        ],
    },
    steps: {
        heading: "How it will work",
        items: [
            { title: "Sign in to the cloud dashboard", body: "With a Google account. The extension itself stays account-free." },
            { title: "Paste your URLs and choose a schedule", body: "One-off, daily or weekly." },
            { title: "Download the results", body: "Each run is saved; download it as CSV, JSON or Excel, or pull it through the API." },
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
        { q: "When does it launch?", a: "It's in development. The extension's own bulk runs cover long lists today, in your browser." },
        { q: "Will it be part of the same plan?", a: "Yes. There's one plan, Pro, and cloud runs will be included when they launch." },
    ],
    related: ["bulk-scraper", "mcp", "list-scraper", "export-to-google-sheets"],
};
