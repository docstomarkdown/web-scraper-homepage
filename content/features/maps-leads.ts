import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20, re-read 2026-10-21:
// - Columns: chrome-extension-source/public/site-sitemaps/map-leads/google-maps.json (Business Name, Category,
//   Rating, Review Count, Address, Operating Hours, Phone, Website, Map URL; repeats left out by Map URL)
// - Side panel button "Collect places from this map", the "Also collect contact details from each business's
//   website" checkbox, and Stop: components/scraper/ListTab.tsx
// - Contact details added to each row in the same run (on by default): lib/contactEnrichment/,
//   DECISIONS.md D-022/D-023; the results page's "Add contact details" / "Update contact details" button: D-024
// - Chat's count card (20 first, then 50/100/200, "Or type a number", button Start; the count is remembered):
//   lib/tools/maps.ts, D-026; "with emails" / "no emails" in the request overrides the setting once
// - Combine the N searches into one table (a card in chat; first column Location): D-029
// - Best rated first, repeats left out, numbers as numbers, "Only leads you can contact" (off): D-031, D-032, D-033
// - Pacing: uneven gaps of 0.6–1.7 s between opens; after two misses it waits 4, 8, 16, up to 30 s: D-034.
//   Measured 2026-10-20 on 20 dentists in Pune: 27–30 s without contact details, 73–79 s with them.
// - Bulk maps mode with saved tables: entrypoints/bulk/main.tsx, lib/bulk/executors/mapBulkExecutor.ts
// Verify before publishing: the 100-business timing ("about eight minutes" is interpolated from 50 ≈ 4 min and
// 200 ≈ 15 min); the number of results Google Maps shows per search ("about 120" is the common cap, not measured).
// Title and headings target what people type into Google ("how to scrape google maps", "google maps scraper
// chrome extension free", "how to extract emails from google maps"): youtube-research/AUTOSUGGEST.md and
// SEARCH_QUERIES.md in the strategy repo. Owner instruction 2026-10-21: titles start with "How to" and say
// what a user would search; this page owns "scrape Google Maps for business leads". Copy rules: docs/writing-style.md §11.

export const mapsLeads: FeaturePageContent = {
    page: getPage("maps-leads"),
    meta: {
        title: "How to Scrape Google Maps for Business Leads, Free",
        description:
            "Search Google Maps, click once, and get every business as a row with its phone, website, address, rating and the emails from its own site. Free Chrome extension, no code, no API key.",
    },
    eyebrow: "Google Maps scraper",
    h1: "How to scrape Google Maps for business leads",
    intro:
        "Search Google Maps for a type of business in a city. Click once. Every result becomes a row with its phone number, website, address, rating and the emails from its own site. Free Chrome extension, no code, no API key.",
    lastUpdated: "2026-10-21",
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
                    "Chat shows a card with 20, 50, 100 or 200, and a box to type any number up to 200. Click Start.",
                ],
            },
            {
                title: "Click Collect places from this map",
                body: "The extension scrolls through the results and opens each place to read its details. Leave \"Also collect contact details from each business's website\" ticked and it reads each website too, for emails and social links.",
                points: [
                    "Keep the tab in front. The tab's title counts the businesses as they come in.",
                    "20 businesses with emails take about a minute and a half. 50 take about four minutes, 200 about fifteen.",
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
            { name: "Category", description: "The business type Google Maps shows under the name, such as Dentist or Plumber." },
            { name: "Rating", description: "The star rating, saved as a number so you can sort by it." },
            { name: "Review Count", description: "How many reviews the place has. A quick sign of an established business." },
            { name: "Address", description: "The full street address." },
            { name: "Operating Hours", description: "The opening hours shown on the listing." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Website", description: "The business's own website." },
            { name: "Map URL", description: "A link back to the place on Google Maps, so you can check any row. It's also how a repeated place is recognised and kept once." },
            { name: "Emails", description: "Email addresses found on the business's website and its Contact or About page. Collected in the same run." },
            { name: "Website phones and faxes", description: "Numbers found on the website, next to the phone Google Maps lists, with a count for each." },
            { name: "Social links", description: "One column per network found on the website: LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest and more." },
        ],
    },
    sections: [
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Fifty dentists in Austin, with emails, in about four minutes",
            paragraphs: [
                "Here is a run from start to finish, with the numbers you'd see. The times come from measured runs on 1.3.0 and vary with your connection and how fast Google Maps answers.",
            ],
            steps: [
                { title: "Type the search.", body: "In the Chat tab, type Find dentists in Austin. A card appears with 20, 50, 100 and 200 and a box for any number. Choose 50 and click Start." },
                { title: "Watch the count.", body: "A Google Maps tab opens and scrolls the results. The progress line counts businesses, and then how many have an email so far. The first 20 arrive in about a minute and a half." },
                { title: "Read the table.", body: "After about four minutes, 50 rows open on the results page: name, category, rating, review count, address, hours, phone, website and map link, then Emails, Website phones, Faxes and a column per social network." },
                { title: "Expect gaps.", body: "In a run like this, a share of the businesses publish no email. Those rows keep the phone and website from Google Maps, and the Emails cell shows a faint dash." },
                { title: "Export.", body: "Click Export as and choose Excel. Ratings and review counts are numbers in the file, so you can sort by them straight away." },
            ],
            table: {
                columns: ["Businesses", "Without emails", "With emails"],
                rows: [
                    ["20", "about 30 seconds", "about a minute and a half"],
                    ["50", "about a minute", "about four minutes"],
                    ["200", "a few minutes", "about fifteen minutes"],
                ],
                caption: "Measured on 1.3.0 with a normal connection. A slow site or a slow Google Maps answer stretches these.",
            },
        },
        {
            id: "add-emails",
            screenshot: "ext/results-add-contacts",
            eyebrow: "Emails",
            heading: "How to get emails from Google Maps",
            paragraphs: [
                "Google Maps doesn't show email addresses. Web Scraper Pro reads each business's own website and its Contact or About page while the run goes on, and adds the emails it finds to that business's row.",
                "Already have a list without emails? Open it from History and click Add contact details. Any saved table with a Website column works, not only Google Maps lists, and the button reads Update contact details when the table already has them.",
            ],
            points: [
                "Emails, phone numbers and fax numbers from each website, in their own columns, with a count for each.",
                "Social profile links, one column each. A cell with several values shows the first and a +N more button; the file joins them with a bar.",
                "Only businesses that publish an email get one. Their phone and website still fill from Google Maps.",
            ],
        },
        {
            id: "what-to-do-with-the-table",
            eyebrow: "After the run",
            heading: "What you can do with the table before you export",
            paragraphs: [
                "The results page is a small spreadsheet of its own. Four moves cover most lead lists; each takes a click or one sentence in chat.",
            ],
            table: {
                columns: ["You want", "Do this", "Where"],
                rows: [
                    ["Only businesses with an email", "Click Filter rows and keep rows where Emails is not empty", "Results page"],
                    ["Businesses with no website, for a web-design pitch", "Filter rows where Website is empty", "Results page"],
                    ["The best-rated first, then only name, phone and website", "Type: Only name, phone, website and rating, sorted by rating", "Chat, with the results tab in front"],
                    ["Dentists in three cities as one list", "Run three searches in one conversation, then click Combine the 3 searches into one table on the last card", "Chat"],
                ],
                caption: "A combined table gets a Location column saying which search each row came from.",
            },
        },
        {
            id: "many-searches",
            eyebrow: "Bulk runs",
            heading: "How to scrape many Google Maps searches in one run",
            paragraphs: [
                "Need plumbers in ten towns, or ten kinds of business in one city? Paste the Google Maps search links into the Bulk page, or upload them as a CSV or TXT file. Each search runs in turn and the results are saved, with contact details read during the run as in the side panel.",
                "Google Maps shows a limited number of results per search, about 120 for a busy category. For a big city, search by neighbourhood or zip code, run them in bulk, and ask chat to combine the tables into one.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Five settings that change the result",
            paragraphs: ["They sit under Settings → Results in the side panel. The defaults suit a lead list; change one when the job is different."],
            table: {
                columns: ["Setting", "Default", "Change it when"],
                rows: [
                    ["Add emails from their websites", "On", "You want a quick list of names and phones and don't need emails. Saying \"no emails\" in a chat request skips them once."],
                    ["Businesses per chat search", "20 on the first card, then the number you picked last time", "You always want 100 or 200 and don't want to pick each time."],
                    ["Sort businesses", "Best rated first", "You want the order Google Maps shows, which is roughly by relevance to the search."],
                    ["Remove repeated rows", "On", "Never, for leads. A place that appears twice while the list scrolls is kept once."],
                    ["Only leads you can contact", "Off", "You want rows with no phone, email or website left out before you export."],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with doing it by hand, with code, or with a paid API",
            paragraphs: [
                "For a list you need this week, the extension is the shortest path: no setup, no account, and the emails come in the same run. A script wins when you need thousands of places every night, and a paid API wins when a program has to call it. Both wait for cloud runs here.",
            ],
            table: {
                columns: ["Method", "What you do", "Time for 100 businesses", "Where it breaks"],
                rows: [
                    ["Web Scraper Pro", "Search, click Collect, export", "About eight minutes with emails, in the background", "Google Maps shows about 120 results per search, so a big city needs several searches"],
                    ["Copy by hand", "Open each place, copy phone, website and address, then open each website for an email", "An afternoon", "Typos, missed rows, no emails without a second pass"],
                    ["A script", "Write and maintain code that drives a browser, then a second script for emails", "Minutes to run, hours to write and fix", "Breaks when Google Maps changes its page; blocked when it runs too fast"],
                    ["A paid API", "Sign up, pay per request, join two services for emails", "Minutes", "Costs per row; emails need a second product; terms limit reuse"],
                ],
            },
        },
        {
            id: "pushback",
            eyebrow: "When Google Maps pushes back",
            heading: "What happens when Google Maps slows down or asks a question",
            paragraphs: [
                "A run opens each business in turn with uneven gaps, like a person browsing. When Google Maps stops answering for two businesses in a row, the run waits 4 seconds, then 8, 16, up to 30, and goes back to normal pace once details load again.",
            ],
            points: [
                "If Google Maps shows a verification page, the run stops and the panel says so. Complete the check in the tab and start again. What was collected is kept.",
                "One search returns at most 200 businesses in chat. From the side panel it keeps going until Google Maps reaches the end of its results.",
                "A business's own website that doesn't load within 30 seconds is skipped. Its row keeps the phone and website from Google Maps.",
            ],
        },
        {
            id: "doesnt-do",
            eyebrow: "Limits",
            heading: "What it doesn't do",
            paragraphs: ["Six things people ask for that this feature doesn't do, so you know before you start."],
            points: [
                "It doesn't collect review text. Google Maps gives the star rating and the review count per place, and that's what you get.",
                "It doesn't sign in, solve a verification or get past a block. A page Google blocks stays blocked.",
                "It doesn't run while the tab is closed or the computer sleeps. Scheduled runs come with cloud runs, which are coming soon.",
                "It doesn't guess or verify emails. An address shown as an image, or hidden behind a contact form, isn't read.",
                "It doesn't return more than Google Maps shows. A search that stops at about 120 results stops there for everyone.",
                "It doesn't send email. Export the list to the tool you use, and follow the anti-spam and privacy rules where you are.",
            ],
        },
        {
            id: "goes-wrong",
            eyebrow: "Troubleshooting",
            heading: "When it goes wrong",
            paragraphs: ["The five things that stop a Google Maps run most often, and what to do."],
            points: [
                "The run stopped part way. Google Maps asked for a verification. Complete it in the tab, keep that tab in front, and start the search again; the rows so far are kept.",
                "The table has fewer businesses than you expected. Google Maps caps a search at about 120 results. Search a smaller area or a narrower category, then combine the searches in chat.",
                "Some rows have no email. The business publishes none, or only as an image or a form. The phone and website from Google Maps are still there.",
                "The run is slow. Google Maps answered slowly and the run waited rather than being cut off. A 200-business run with emails takes about fifteen minutes; without emails, a few minutes.",
                "The same business appears twice. Remove repeated rows is off in Settings → Results. Turn it on; it's on by default.",
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
            a: "From the side panel, as many as Google Maps shows for that search, which is about 120 for a busy category. In chat, up to 200 per search. For more, split a big area into smaller searches and combine them.",
        },
        {
            q: "Can I get emails from Google Maps?",
            a: "Yes, in the same run. Google Maps doesn't list emails, so the extension reads each business's website and contact page while it collects, and adds the emails, phone numbers and social profiles it finds. Businesses that don't publish an email still come back with their phone and website.",
        },
        {
            q: "How long does a run take?",
            a: "About a minute and a half for 20 businesses with emails, four minutes for 50, and fifteen for 200. Without emails, a 50-business run takes about a minute.",
        },
        {
            q: "Can I scrape Google Maps reviews?",
            a: "No. Google Maps leads give each place's star rating and review count, not the review text. For review text, collect from a review site such as Trustpilot with the List tab.",
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
    ],
    related: ["ai-chat", "email-extractor", "bulk-scraper", "export-to-google-sheets", "list-scraper"],
};
