import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against the released extension (v1.1.0) on 2026-09-25:
// - Columns: chrome-extension-source/public/site-sitemaps/map-leads/google-maps.json (`columns`)
// - Side panel button "Collect places from this map" + Stop: components/scraper/ListTab.tsx
// - Bulk maps mode and "Collect contacts" with saved tables + deep scan: entrypoints/bulk/main.tsx,
//   lib/bulk/executors/{mapBulkExecutor,contactBulkExecutor}.ts
// - Duplicates matched on the map link: `dedupeKeys: ["Map URL"]`
// Re-check these before changing claims (docs/personas.md, "Product facts checked").

export const mapsLeads: FeaturePageContent = {
    page: getPage("maps-leads"),
    meta: {
        title: "Maps Scraper for Local Business Leads | Web Scraper Pro",
        description:
            "Collect every business from a Maps search into a spreadsheet: name, phone, website, address, hours and rating. Then add emails from their websites.",
    },
    eyebrow: "Maps leads",
    h1: "Turn a Maps search into a list of local business leads",
    intro:
        "Search Maps for a type of business in a place, click once, and get every result as a row with its phone number, website, address, opening hours and rating. Export it to Google Sheets, Excel or CSV.",
    lastUpdated: "2026-09-25",
    sample: {
        caption: "A search for plumbers, as it looks after export. Names, numbers and links are made up.",
        columns: ["Business Name", "Rating", "Review Count", "Address", "Operating Hours", "Phone", "Website", "Map URL"],
        rows: [
            ["Sample Plumbing Co.", "4.8", "212", "101 Main St, Springfield", "Open 24 hours", "(555) 010-2231", "sampleplumbing.example.com", "maps.example.com/place/1"],
            ["Riverside Pipe & Drain", "4.6", "87", "42 River Rd, Springfield", "Mon–Fri 8 AM–6 PM", "(555) 010-4410", "riversidepipe.example.com", "maps.example.com/place/2"],
            ["Northside Plumbers", "4.9", "1,034", "7 Oak Ave, Springfield", "Mon–Sat 7 AM–7 PM", "(555) 010-7782", "northsideplumbers.example.com", "maps.example.com/place/3"],
            ["Quick Fix Plumbing", "4.3", "56", "300 Elm St, Springfield", "Open 24 hours", "(555) 010-9043", "", "maps.example.com/place/4"],
        ],
    },
    fields: {
        heading: "Eight columns for every place",
        intro: "Each business in the search results becomes one row. A column stays empty when the place doesn't list that detail on Maps.",
        items: [
            { name: "Business Name", description: "The name as it appears on Maps." },
            { name: "Rating", description: "The average star rating, as a number you can sort by." },
            { name: "Review Count", description: "How many reviews the place has, useful for spotting established businesses." },
            { name: "Address", description: "The full street address shown on the place's listing." },
            { name: "Operating Hours", description: "The opening hours shown on the listing." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Website", description: "The business's own website. You need this column to add emails in the next step." },
            { name: "Map URL", description: "A link back to the place on Maps, so you can check any row." },
        ],
    },
    steps: {
        heading: "From search to spreadsheet in three steps",
        intro: "Everything runs in your own Chrome window. There's no API key to set up.",
        items: [
            {
                title: "Search Maps",
                body: "Open Maps in Chrome and search for a type of business in a place, such as \"plumbers in Springfield\". Then open the Web Scraper Pro side panel.",
            },
            {
                title: "Click Collect places from this map",
                body: "The extension scrolls through the results and opens each place to read its phone number, website, address and hours. The table fills in as it goes. Click Stop at any time to keep what it has collected so far.",
            },
            {
                title: "Export your list",
                body: "Your list is saved in History. Open it in the Data Viewer to hide columns or remove rows, then export to Google Sheets, Excel, CSV or JSON.",
            },
        ],
    },
    sections: [
        {
            id: "add-emails",
            eyebrow: "Add emails",
            heading: "Add emails from each business's website",
            paragraphs: [
                "Maps doesn't show email addresses, so emails come from a second step. On the Bulk page, choose Collect contacts, then choose your Maps list as a saved table. Web Scraper Pro visits the website of each business on the list and collects the contact details it finds there.",
                "Turn on the deep scan to also check one linked Contact or About page on each site, where emails are often listed.",
            ],
            points: [
                "Email addresses and phone numbers found on each website",
                "Social profile links: LinkedIn, Instagram, Facebook, X, YouTube, TikTok and Pinterest",
                "Only businesses that publish an email on their website will have one",
            ],
        },
        {
            id: "many-searches",
            eyebrow: "Bulk runs",
            heading: "Collect many searches in one run",
            paragraphs: [
                "Need the same kind of business in ten towns, or ten kinds of business in one city? Paste the Maps search links into the Bulk page, or upload them as a CSV or TXT file. Web Scraper Pro runs each search in turn and saves the results, so you don't have to start every search by hand.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It collects what Maps shows publicly for each place. It doesn't sign in to anything or reveal hidden details.",
            "Maps shows a limited number of results for each search, so one broad search in a big city won't return every business. Search smaller areas or narrower categories, and run them together in bulk.",
            "Collection runs in your browser and opens each place in turn, so a long list takes a few minutes. Keep the tab open until it finishes.",
            "Before you contact businesses from your list, check the rules that apply where you are, such as anti-spam and privacy laws.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            {
                title: "Prospect lists for sales and agencies",
                body: "Build a list of businesses by niche and city, with phone numbers and websites, ready to import into a CRM or a calling sheet.",
            },
            {
                title: "Finding businesses to help",
                body: "Sort by rating or review count, or look for places with no website, to find businesses that could use your service.",
            },
            {
                title: "Local market research",
                body: "Count how many competitors are in an area, compare their ratings and review counts, and see their opening hours side by side.",
            },
            {
                title: "Finding partners and suppliers",
                body: "Collect every supplier, wholesaler or service provider in a region into one list you can compare and share with your team.",
            },
        ],
    },
    faqs: [
        {
            q: "Do I need a Maps API key or an account?",
            a: "No. Web Scraper Pro works on the Maps website in your own browser, so there's no API key to set up and no Web Scraper Pro account to create.",
        },
        {
            q: "Can I get emails for the businesses?",
            a: "Yes, in two steps. Maps doesn't list emails, so first collect the businesses from Maps. Then run Collect contacts on the Bulk page with your Maps list as the saved table, and it adds the emails, phone numbers and social profiles it finds on each business's website.",
        },
        {
            q: "How many businesses can I collect from one search?",
            a: "As many as Maps shows for that search. The extension keeps scrolling until Maps reaches the end of its results, or until you click Stop. For more businesses, split a big area into smaller searches and run them in bulk.",
        },
        {
            q: "Does it add the same business twice?",
            a: "No. Places are matched by their map link, so a business that appears again while the list scrolls is only added once.",
        },
        {
            q: "Which formats can I export to?",
            a: "Google Sheets, Microsoft Excel (.xlsx), CSV and JSON. CSV works with most CRMs and email tools.",
        },
        {
            q: "Is Maps leads part of the plan?",
            a: "Yes. There's one plan, Pro, and it includes every feature, including Maps leads, contact details, bulk runs and every export format.",
        },
    ],
    related: ["email-extractor", "bulk-scraper", "export-to-google-sheets", "list-scraper"],
};
