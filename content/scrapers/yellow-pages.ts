import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: yellowpages.com pack columns (Business Name, Profile URL, Categories,
// Phone, Address, City, State, ZIP, Rating, Review Count, Years in Business, Website, Description) in configs-prod/.
// Draft until a real run's screenshots and verified date exist.
// 2026-10-21: title targets the search phrase ("how to scrape yellow pages", "yellow pages scraper chrome extension");
// the site says "Google Maps". The guide owns "How To Scrape Yellow Pages into Excel"; this page owns the column phrase.
// 2026-10-21 (later): deepened. Verify before publishing: listings per page on yellowpages.com (written as "about 30"),
// how many pages a search offers, and the time per page in the worked example.

export const yellowPages: ScraperPageContent = {
    slug: "yellow-pages",
    category: "business-directories",
    site: { name: "Yellow Pages", url: "https://www.yellowpages.com" },
    meta: {
        title: "How to Scrape Yellow Pages Listings with Phone and Website",
        description: "Turn a Yellow Pages search into a spreadsheet: business name, categories, phone, address, rating, years in business and website, across every page of results. Free Chrome extension, no code.",
    },
    h1: "How to scrape Yellow Pages listings with phone, address and website",
    intro: "Search Yellow Pages for a category in a city and get every listing as a row. Phone, address, rating, years in business and website come in named columns, page after page.",
    allowed: "Yellow Pages' terms restrict automated collection, and the listings are public business details. This page reads the results you have open, in your own browser, at a person's pace, for your own prospecting or research; anti-spam law decides how you may contact the businesses. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
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
                body: "Export as gives Excel, CSV, JSON or Google Sheets. For emails and social links, click Add contact details on the results page; each website in the table is read for emails, phones and social links.",
                points: ["The button is enabled because Yellow Pages tables have a Website column. Bulk scrape → Collect contacts → Use saved data does the same from the Bulk page."],
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
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three searches worth running",
            paragraphs: [
                "Yellow Pages is a category plus a city or a zip code. It lists businesses that other directories and map services miss, which is why agencies run more than one source and compare.",
                "Years in Business is the column you won't get anywhere else. It separates a twenty-year firm from one that opened last spring.",
            ],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["plumbers, Springfield, IL", "Trades with phone, address and years in business, ready for a calling sheet", "Business Name, Phone, Years in Business, Website"],
                    ["accountants, 78701", "A zip code narrows a big city to one district, and ZIP comes as its own column", "Business Name, Phone, ZIP, Rating"],
                    ["dentists, Austin, TX", "Businesses with a website get emails in a second run; those without are web-design leads", "Business Name, Website, Review Count, Categories"],
                ],
                caption: "Yellow Pages search terms are categories, so \"plumbers\" finds more than \"plumbing repair\".",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Ten pages of plumbers, then their emails",
            paragraphs: ["A Yellow Pages run is two short runs: the listings, then the emails from their websites. Here is the whole thing on version 1.3.0; page counts and timings are what the search showed on the day."],
            steps: [
                { title: "Search plumbers in Springfield, IL.", body: "The first page shows about 30 listings. Open the List tab; the listings appear as List 1 with that count." },
                { title: "Choose Collect more pages, then Next page.", body: "The panel finds the Next link on its own. Set Stop after to 10 pages and click Collect from 10 pages." },
                { title: "Wait a minute or two.", body: "The tab pages through, and the title counts the rows. Sponsored rows arrive marked; turn on Skip sponsored products beforehand if you don't want them." },
                { title: "Run Bulk scrape → Collect contacts.", body: "Choose Use saved data, pick this collection and its Website column, and click Start collecting. Rows with a website get Emails, Website phones and social columns." },
                { title: "Export the merged table.", body: "Export as → Excel. Compare on Profile URL when you run it again." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: ["Four moves on the results page turn a directory dump into a list you can call."],
            points: [
                "Keep the established firms: click the Years in Business header to sort, then Filter rows to keep 10 or more. Those are the businesses with budgets.",
                "Find the ones without a website: Filter rows, Website is empty. For a web-design or marketing pitch, that's the list.",
                "Drop the paid rows: Filter rows on the Sponsored label, or turn on Skip sponsored products in Settings → Results before the run.",
                "Compare with a Google Maps list: export both and match on Phone; businesses on one list and not the other are the ones competitors miss. For the Maps list, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only.",
            ],
        },
        {
            id: "caps",
            eyebrow: "Limits",
            heading: "What Yellow Pages shows, and what it doesn't",
            paragraphs: ["The listing cards carry the phone, address and years in business, which is more than most directories show without a click. Emails are never on the card, and ratings are Yellow Pages' own, not Google's."],
            table: {
                columns: ["What", "On Yellow Pages", "In your table"],
                rows: [
                    ["Listings per page", "About 30, with Next links", "All of them, for as many pages as you set"],
                    ["Sponsored listings", "Mixed into the results", "Kept and marked Sponsored, or skipped by a setting"],
                    ["Emails", "Not on the card", "Added in a second run over the Website column"],
                    ["Reviews", "A rating and a count on the card", "Rating and Review Count; review text isn't collected"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with Yellow Pages' own tools",
            paragraphs: [
                "Yellow Pages has no export. The site is built to be read one page at a time, so the choice is between copying rows and collecting them.",
                "Collecting wins on anything over a page. The one advantage of reading by hand is seeing the profile page, which the Profile URL column gives you back on any row.",
            ],
            table: {
                columns: ["", "Copying by hand", "With the extension"],
                rows: [
                    ["10 pages of listings", "An hour or more", "A minute or two"],
                    ["Emails for the ones with websites", "A day of opening sites", "One bulk run, a few seconds per site"],
                    ["Split address into City, State, ZIP", "Manual, later, in the sheet", "Already separate columns"],
                ],
                caption: "Hand timings are a rough estimate for one person copying rows into a sheet.",
            },
        },
    ],
    screenshots: ["ext/list-tab-yellowpages", "ext/results-yellowpages"],
    feature: "list-scraper",
    guide: "collect-business-listings-from-yellow-pages",
    useCase: "lead-generation",
    related: ["justdial", "bbb"],
    faqs: [
        { q: "Is this Yellow Pages scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "Can I get emails for the businesses?", a: "Yes, in a second step. Click Add contact details on the results page, or open Bulk scrape → Collect contacts and choose Use saved data. Each website is read for emails, phones and social links." },
        { q: "How many pages can I scrape at once?", a: "As many as you set under Stop after. Keep the tab in front, and click Stop if you have enough; the rows so far are kept." },
        { q: "Does it work on other countries' Yellow Pages?", a: "The ready-made setup is for yellowpages.com. Other directories are detected as lists, with columns named from the page." },
        { q: "Why are there sponsored rows?", a: "Yellow Pages mixes paid listings into results. They're kept and marked Sponsored so you can filter them, or turn on Skip sponsored products to leave them out." },
        { q: "Can I export to Google Sheets?", a: "Yes. Export as offers Google Sheets, Excel, CSV and JSON." },
        { q: "Can I scrape Yellow Pages by zip code?", a: "Yes. Search the category with a zip code instead of a city. ZIP also comes as its own column, so a city-wide run can be filtered by zip afterwards." },
        { q: "Which directory should I start with?", a: "Yellow Pages for US trades and the Years in Business column; BBB for the bureau's grade and accreditation; Justdial for India. Run two and match on Phone to find the businesses only one of them lists." },
        { q: "Is scraping Yellow Pages allowed?", a: "You collect public listings in your own browser, at a person's pace. The site's terms and anti-spam laws decide what you can do with them; our explainer at /web-scraping-legal covers the rules in plain words. It isn't legal advice." },
    ],
};
