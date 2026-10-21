import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Columns: chrome-extension-source/configs-prod (google-maps pack `columns`)
// - Side panel button "Collect places from this map", the "Also collect contact details from each business's
//   website" checkbox, and Stop: components/scraper/ListTab.tsx
// - Contact details added to each row in the same run (on by default): lib/contactEnrichment/,
//   DECISIONS.md D-022/D-023; the results page's "Add contact details" button: D-024
// - Chat's count card (20/50/100/200, up to 200) and contact-details choice: lib/tools/maps.ts, D-026
// - Best rated first, repeats left out, numbers as numbers: DECISIONS.md D-031, D-032, D-033
// - Bulk maps mode with saved tables: entrypoints/bulk/main.tsx, lib/bulk/executors/mapBulkExecutor.ts
// Re-check these before changing claims (docs/personas.md, "Product facts checked").
//
// Title and headings target what people type into Google ("how to scrape google maps", "google maps scraper
// chrome extension free", "how to extract emails from google maps"): youtube-research/AUTOSUGGEST.md and
// SEARCH_QUERIES.md in the strategy repo. Owner instruction 2026-10-21: titles start with "How to" and say
// what a user would search. Copy rules: docs/writing-style.md §11 (short paragraphs, plain words).

export const mapsLeads: FeaturePageContent = {
    page: getPage("maps-leads"),
    meta: {
        title: "How to Scrape Google Maps for Business Leads: Free Chrome Extension",
        description:
            "Search Google Maps, click once, and get every business as a row with its phone, website, address, rating and the emails from its own site. Free Chrome extension, no code, no API key.",
    },
    eyebrow: "Google Maps scraper",
    h1: "How to scrape Google Maps for business leads",
    intro:
        "Search Google Maps for a type of business in a city. Click once. Every result becomes a row with its phone number, website, address, rating and the emails from its own site. Free Chrome extension, no code, no API key.",
    lastUpdated: "2026-10-20",
    hero: "ext/results-maps-with-contacts",
    sample: {
        caption: "A search for plumbers, after export. Names, numbers and addresses are made up.",
        columns: ["Business Name", "Rating", "Phone", "Website", "Email"],
        rows: [
            ["Sample Plumbing Co.", "4.8", "(555) 010-2231", "sampleplumbing.example.com", "hello@sampleplumbing.example.com"],
            ["Riverside Pipe & Drain", "4.6", "(555) 010-4410", "riversidepipe.example.com", "info@riversidepipe.example.com"],
            ["Northside Plumbers", "4.9", "(555) 010-7782", "northsideplumbers.example.com", ""],
            ["Quick Fix Plumbing", "4.3", "(555) 010-9043", "", ""],
        ],
    },
    steps: {
        heading: "How to scrape Google Maps in three steps",
        intro: "Everything runs in your own Chrome window. You don't sign in to anything, and there is no API key to set up.",
        items: [
            {
                title: "Search Google Maps",
                body: "Open Google Maps in Chrome. Search for a type of business in a place, such as dentists in Austin. Then click the Web Scraper Pro icon to open the side panel.",
                points: [
                    "Or type it in the Chat tab: Find dentists in Austin.",
                    "Chat asks how many you want: 20, 50, 100 or 200.",
                ],
            },
            {
                title: "Click Collect places from this map",
                body: "The extension scrolls through the results and opens each place to read its details. Leave \"Also collect contact details from each business's website\" ticked and it reads each website too, for emails and social links.",
                points: [
                    "Keep the tab in front. The tab's title counts the businesses as they come in.",
                    "50 businesses with emails take about four minutes. 200 take about fifteen.",
                    "Click Stop at any time. What's collected so far is kept.",
                ],
            },
            {
                title: "Export your list",
                body: "The results open in a table. Hide the columns you don't need, then click Export as and choose Google Sheets, Excel, CSV or JSON. The list is saved in History too.",
                points: ["Or type in chat with the results tab in front: Only name, phone, website and rating, sorted by rating."],
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    fields: {
        heading: "What you get for every business",
        intro: "Each business in the search becomes one row. A column stays empty when the place doesn't list that detail on Google Maps.",
        items: [
            { name: "Business Name", description: "The name as it appears on Google Maps." },
            { name: "Rating", description: "The star rating, saved as a number so you can sort by it." },
            { name: "Review Count", description: "How many reviews the place has. A quick sign of an established business." },
            { name: "Address", description: "The full street address." },
            { name: "Operating Hours", description: "The opening hours shown on the listing." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Website", description: "The business's own website." },
            { name: "Map URL", description: "A link back to the place on Google Maps, so you can check any row." },
            { name: "Emails", description: "Email addresses found on the business's website and its Contact or About page. Collected in the same run." },
            { name: "Social links", description: "One column per network found on the website: LinkedIn, Instagram, Facebook, X, YouTube, TikTok and more." },
        ],
    },
    sections: [
        {
            id: "add-emails",
            screenshot: "ext/results-add-contacts",
            eyebrow: "Emails",
            heading: "How to get emails from Google Maps",
            paragraphs: [
                "Google Maps doesn't show email addresses. Web Scraper Pro reads each business's own website and its Contact or About page while the run goes on, and adds the emails it finds to that business's row.",
                "Already have a list without emails? Open it from History and click Add contact details. Any saved table with a Website column works, not only Google Maps lists.",
            ],
            points: [
                "Emails, phone numbers and fax numbers from each website, in their own columns.",
                "Social profile links, one column each.",
                "Only businesses that publish an email get one. Their phone and website still fill from Google Maps.",
            ],
        },
        {
            id: "many-searches",
            eyebrow: "Bulk runs",
            heading: "How to scrape many Google Maps searches in one run",
            paragraphs: [
                "Need plumbers in ten towns, or ten kinds of business in one city? Paste the Google Maps search links into the Bulk page, or upload them as a CSV or TXT file. Each search runs in turn and the results are saved.",
                "Google Maps shows a limited number of results per search. For a big city, search by neighbourhood or zip code, run them in bulk, and ask chat to combine the tables into one.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Four settings that change the result",
            paragraphs: ["They sit under Settings → Results → Finding businesses in the side panel. The defaults suit a lead list."],
            points: [
                "Add emails from their websites: on. Turn it off for a quick list of names and phones.",
                "Businesses per chat search: the number the card remembered last time.",
                "Sort businesses: best rated first. Change it to keep the order Google Maps shows.",
                "Skip repeated businesses: on. A place that appears twice while the list scrolls is kept once.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When Google Maps pushes back",
            heading: "What happens when Google Maps slows down or asks a question",
            paragraphs: ["A run opens each business in turn and paces itself like a person browsing. When Google Maps answers more slowly, the run slows down with it instead of being cut off."],
            points: [
                "If Google Maps shows a verification page, the run stops and the panel says so. Complete the check in the tab and start again. What was collected is kept.",
                "One search returns at most 200 businesses in chat. From the side panel it keeps going until Google Maps reaches the end of its results.",
                "A business's own website that doesn't load is skipped. Its row keeps the phone and website from Google Maps.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It collects what Google Maps shows publicly for each place. It doesn't sign in to anything or reveal hidden details.",
            "Collection runs in your browser. Keep the tab open until it finishes.",
            "Many small businesses publish no email. Those rows keep their phone and website.",
            "Before you contact businesses from your list, check the rules that apply where you are, such as anti-spam and privacy laws.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Prospect lists for sales and agencies", body: "A list of businesses by type and city, with phone numbers, websites and emails, ready for a calling sheet or your sales tool." },
            { title: "Finding businesses to help", body: "Sort by rating or review count, or filter for places with no website, to find businesses that could use your service." },
            { title: "Local market research", body: "Count the competitors in an area, compare their ratings and review counts, and see their opening hours side by side." },
            { title: "Finding partners and suppliers", body: "Every supplier, wholesaler or service provider in a region in one list you can compare and share." },
        ],
    },
    faqs: [
        {
            q: "Is this Google Maps scraper free?",
            a: "Yes. Web Scraper Pro is free to install and use today, with every feature included and no account to create. That includes Google Maps searches, emails from websites, bulk runs and every export format.",
        },
        {
            q: "Do I need a Google Maps API key?",
            a: "No. The extension works on the Google Maps website in your own browser. There is no API key to set up and no Web Scraper Pro account to create.",
        },
        {
            q: "How many businesses can I get from one search?",
            a: "From the side panel, as many as Google Maps shows for that search. It keeps scrolling until Google Maps reaches the end, or until you click Stop. In chat, up to 200 per search. For more, split a big area into smaller searches and run them in bulk.",
        },
        {
            q: "Can I get emails from Google Maps?",
            a: "Yes, in the same run. Google Maps doesn't list emails, so the extension reads each business's website and contact page while it collects, and adds the emails, phone numbers and social profiles it finds. Businesses that don't publish an email still come back with their phone and website.",
        },
        {
            q: "Does it add the same business twice?",
            a: "No. Places are matched by their map link, so a business that appears again while the list scrolls is added once.",
        },
        {
            q: "Which formats can I export to?",
            a: "Google Sheets, Microsoft Excel, CSV and JSON. CSV opens in any spreadsheet and most sales and email tools.",
        },
        {
            q: "Can I find businesses that have no website?",
            a: "Yes. On the results page, click Filter rows and keep the rows where Website is empty. For an agency that builds websites, that filter is the lead list.",
        },
        {
            q: "Is scraping Google Maps allowed?",
            a: "You collect what Google Maps shows publicly, in your own browser, at a person's pace. Google's terms restrict automated collection, and anti-spam and privacy laws apply to how you contact people. Collect for your own use, keep it to public business listings, and read our plain-words explainer on web scraping and the law. It isn't legal advice.",
        },
        {
            q: "Why does the run slow down near the end?",
            a: "Google Maps answers more slowly after many businesses are opened in a row, and the run slows with it instead of being blocked. A 200-business run with emails takes about fifteen minutes.",
        },
    ],
    related: ["ai-chat", "email-extractor", "bulk-scraper", "export-to-google-sheets", "list-scraper"],
};
