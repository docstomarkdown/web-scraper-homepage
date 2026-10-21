import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: yellowpages.com pack columns (Business Name, Profile URL, Categories,
// Phone, Address, City, State, ZIP, Rating, Review Count, Years in Business, Website, Description) in configs-prod/.
// Draft until a real run's screenshots and verified date exist.
// 2026-10-21: title targets the search phrase ("how to scrape yellow pages", "yellow pages scraper chrome extension");
// the site says "Google Maps".

export const yellowPages: ScraperPageContent = {
    slug: "yellow-pages",
    category: "maps-and-directories",
    site: { name: "Yellow Pages", url: "https://www.yellowpages.com" },
    meta: {
        title: "How to Scrape Yellow Pages Business Listings to Excel, Free",
        description: "Turn a Yellow Pages search into a spreadsheet: business name, categories, phone, address, rating, years in business and website, across every page of results. Free Chrome extension, no code.",
    },
    h1: "How to scrape Yellow Pages business listings to Excel",
    intro: "Search Yellow Pages for a category in a city and get every listing as a row. Phone, address, rating, years in business and website come in named columns, page after page.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for plumbers, after export. Businesses are made up.",
        columns: ["Business Name", "Phone", "City", "Rating", "Website"],
        rows: [
            ["Sample Plumbing Co.", "(555) 010-2231", "Springfield", "4.5", "sampleplumbing.example"],
            ["Riverside Pipe & Drain", "(555) 010-4410", "Springfield", "4.0", "riversidepipe.example"],
            ["Quick Fix Plumbing", "(555) 010-9043", "Springfield", "3.5", ""],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "Thirteen columns, as Yellow Pages lists them.",
        items: [
            { name: "Business Name", description: "The name on the listing." },
            { name: "Profile URL", description: "A link to the Yellow Pages profile." },
            { name: "Categories", description: "The categories the listing is filed under." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Address, City, State, ZIP", description: "The address, split into columns you can filter by." },
            { name: "Rating and Review Count", description: "The rating and the number of reviews." },
            { name: "Years in Business", description: "As shown on the listing. A quick sign of an established business." },
            { name: "Website", description: "The business's own site." },
            { name: "Description", description: "The listing's own description." },
        ],
    },
    steps: {
        heading: "How to scrape Yellow Pages in three steps",
        items: [
            {
                title: "Search Yellow Pages",
                body: "Search for a category in a city, such as dentists in Austin, TX. Then click the Web Scraper Pro icon and open the List tab. The listings appear under Choose from lists we found.",
                points: ["Sponsored rows are kept and marked Sponsored.", "Settings → Results → Skip sponsored products leaves them out."],
            },
            {
                title: "Collect the pages",
                body: "Choose Collect more pages, then Next page. Set Stop after to the number of pages you want and click Collect.",
                points: ["Keep the tab in front while it pages through.", "Click Stop at any time. What's collected is kept."],
            },
            {
                title: "Add emails, then export",
                body: "Export as gives Excel, CSV, JSON or Google Sheets. For emails and social links, run Bulk scrape → Collect contacts and choose Use saved data to read each website in the table.",
                points: ["The Add contact details button on the results page needs a Google Maps style Website column, so use Bulk scrape for Yellow Pages tables."],
            },
        ],
    },
    notes: {
        heading: "Specific to Yellow Pages",
        items: [
            "Results are paged. Set Next page and the page count before collecting, or Stop and save part-way.",
            "Sponsored listings appear in the results and are marked. Settings → Results can skip them.",
            "Keep the tab in front while it pages through. Paging slows down in a background tab.",
        ],
    },
    emptyWhen: [
        { column: "Website", when: "The listing has no website link." },
        { column: "Rating, Review Count", when: "The listing has no reviews on Yellow Pages." },
        { column: "Years in Business", when: "The business hasn't stated it." },
        { column: "Description", when: "The listing shows no snippet." },
    ],
    pushback: [
        "If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again.",
        "A site that slows down when many pages load fast shows fewer results or an error page. Collect in smaller runs and come back later. History keeps each run.",
        "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    screenshots: ["ext/list-tab-yellowpages", "ext/results-yellowpages"],
    feature: "list-scraper",
    guide: "collect-business-listings-from-yellow-pages",
    useCase: "lead-generation",
    related: ["maps", "justdial", "bbb"],
    faqs: [
        { q: "Is this Yellow Pages scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Can I get emails for the businesses?", a: "Yes, in a second step. Open Bulk scrape → Collect contacts, choose Use saved data, and pick this collection. Each website is read for emails, phones and social links." },
        { q: "How many pages can I scrape at once?", a: "As many as you set under Stop after. Keep the tab in front, and click Stop if you have enough; the rows so far are kept." },
        { q: "Does it work on other countries' Yellow Pages?", a: "The ready-made setup is for yellowpages.com. Other directories are detected as lists, with columns named from the page." },
        { q: "Why are there sponsored rows?", a: "Yellow Pages mixes paid listings into results. They're kept and marked Sponsored so you can filter them, or turn on Skip sponsored products to leave them out." },
        { q: "Can I export to Google Sheets?", a: "Yes. Export as offers Google Sheets, Excel, CSV and JSON." },
    ],
};
