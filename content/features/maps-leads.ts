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

export const mapsLeads: FeaturePageContent = {
    page: getPage("maps-leads"),
    meta: {
        title: "Maps Scraper for Local Business Leads",
        description:
            "Collect every business from a Maps search into a spreadsheet: name, phone, website, address, hours and rating, plus the emails and social links from each business's own website, in the same run.",
    },
    eyebrow: "Maps leads",
    h1: "Turn a Maps search into a list of local business leads",
    intro:
        "Search Maps for a type of business in a place, click once, and get every result as a row with its phone number, website, address, opening hours and rating. Export it to Google Sheets, Excel or CSV.",
    lastUpdated: "2026-10-20",
    hero: "ext/results-maps-with-contacts",
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
        heading: "Eight columns for every place, plus its contact details",
        intro: "Each business in the search results becomes one row. A column stays empty when the place doesn't list that detail on Maps. With contact details on, the run adds Emails, Website phones, Faxes and one column per social network, read from each business's own website.",
        items: [
            { name: "Business Name", description: "The name as it appears on Maps." },
            { name: "Rating", description: "The average star rating, as a number you can sort by." },
            { name: "Review Count", description: "How many reviews the place has, useful for spotting established businesses." },
            { name: "Address", description: "The full street address shown on the place's listing." },
            { name: "Operating Hours", description: "The opening hours shown on the listing." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Website", description: "The business's own website. With contact details on, it's read in the same run for emails, phone numbers and social links." },
            { name: "Map URL", description: "A link back to the place on Maps, so you can check any row." },
        ],
    },
    steps: {
        heading: "From search to spreadsheet in three steps",
        intro: "Everything runs in your own Chrome window. There's no API key to set up.",
        items: [
            {
                title: "Search Maps",
                points: ["Example: dentists in Austin.", "Or type it in the Chat tab: Find dentists in Austin. A card asks how many to collect: 20, 50, 100 or 200."],
                body: "Open Maps in Chrome and search for a type of business in a place, such as \"plumbers in Springfield\". Then open the Web Scraper Pro side panel.",
            },
            {
                title: "Click Collect places from this map",
                points: ["Keep the tab in front. The tab's title counts the businesses as they come in.", "With emails on, 50 businesses take about four minutes and 200 about fifteen. Without emails it's a minute or two."],
                body: "The extension scrolls through the results and opens each place to read its phone number, website, address and hours. Leave \"Also collect contact details from each business's website\" ticked and it reads each website too, adding emails, phone numbers and social links to the same row. The table fills in as it goes; click Stop at any time to keep what it has so far. In chat, type \"Find plumbers in Springfield\" instead: a card asks how many to collect and whether to add contact details.",
            },
            {
                title: "Export your list",
                points: ["Example to type in the chat with the results tab in front: Only name, phone, website and rating, sorted by rating."],
                screenshot: "ext/results-export-menu",
                body: "Your list is saved in History. Open it in the Data Viewer to hide columns or remove rows, then export to Google Sheets, Excel, CSV or JSON.",
            },
        ],
    },
    sections: [
        {
            id: "settings",
            eyebrow: "Settings that change the result",
            heading: "Four settings decide what a Maps run gives you",
            paragraphs: ["All of them sit under Settings → Results → Finding businesses in the side panel. The defaults suit a lead list; change them when the job is different."],
            points: ["Add emails from their websites: on. Each business's website and one linked Contact or About page are read during the run. Turn it off for a quick list of names and phones.", "Businesses per chat search: the number the card remembered. Change it here when you want a different default.", "Sort businesses: Best rated first, which counts how many reviews back the stars, so 4.8 from 1,200 reviews comes before 5.0 from 3. Or Most reviewed.", "Skip businesses you can't reach: leaves out rows with no phone, email or website. Off by default, so you decide on the results page.", "Remove duplicates: on. A business that appears twice in the results is kept once."],
        },
        {
            id: "pushback",
            eyebrow: "When Maps pushes back",
            heading: "What happens when Maps slows down or asks a question",
            paragraphs: ["A Maps run opens each business in turn and paces itself unevenly, like a person browsing. When Maps stops answering, the run slows down rather than being cut off."],
            points: ["If Maps shows a verification page, the run stops and the panel says so. Complete the check in the tab and start the search again; what was collected is kept.", "One search returns at most 200 businesses. For a big city, search by neighbourhood or zip code and let chat combine the searches into one table.", "Businesses without a website keep their phone and address; the email columns stay empty for them."],
        },
        {
            id: "add-emails",
            screenshot: "ext/results-add-contacts",
            eyebrow: "Emails in the same run",
            heading: "Emails and social links from each business's website",
            paragraphs: [
                "Maps doesn't show email addresses, so Web Scraper Pro reads each business's own website and its Contact or About page in the background while the run goes on, and adds what it finds to the business's row. Nothing opens in a new tab, and you see the count of businesses with an email as it runs.",
                "Collected a list earlier without contact details? Open it from History and click Add contact details on the results page. Any saved table with a Website column works, not only Maps lists.",
            ],
            points: [
                "Email addresses, phone numbers and fax numbers found on each website, in their own columns",
                "Social profile links, one column each: LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest and more",
                "Only businesses that publish an email on their website get one; the phone and website columns still fill from Maps",
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
            "Collection runs in your browser and opens each place in turn. With contact details on, 20 businesses take about a minute and a half and 200 about 15 minutes; without, under a minute and about 4. Keep the tab open until it finishes.",
            "In chat, one search collects up to 200 businesses. The side panel keeps going until Maps reaches the end of its results.",
            "Businesses are saved best rated first, and a business that appears twice while the list scrolls is kept once. Both are settings you can change.",
            "Before you contact businesses from your list, check the rules that apply where you are, such as anti-spam and privacy laws.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            {
                title: "Prospect lists for sales and agencies",
                body: "Build a list of businesses by type and city, with phone numbers and websites, ready for your sales tool or a calling sheet.",
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
            a: "Yes, in the same run. Maps doesn't list emails, so Web Scraper Pro reads each business's website and contact page while it collects, and adds the emails, phone numbers and social profiles it finds to that business's row. Leave contact details on when you start. Many small businesses don't publish an email, so some rows will have the phone and website only.",
        },
        {
            q: "How many businesses can I collect from one search?",
            a: "From the side panel, as many as Maps shows for that search: it keeps scrolling until Maps reaches the end of its results, or until you click Stop. In chat, up to 200 per search. For more businesses, split a big area into smaller searches and run them in bulk.",
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
        {
            q: "Why does the run slow down near the end?",
            a: "Maps answers more slowly after many businesses are opened in a row, and the run slows with it instead of being blocked. A 200-business run with emails takes about fifteen minutes.",
        },
        {
            q: "Can I find businesses that have no website?",
            a: "Yes. On the results page, click Filter rows and keep rows where Website is empty. For an agency that builds websites, that filter is the lead list.",
        },
    ],
    related: ["ai-chat", "email-extractor", "bulk-scraper", "export-to-google-sheets", "list-scraper"],
};
