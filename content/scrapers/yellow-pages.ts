import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against chrome-extension-source on 2026-11-10:
// - Columns: configs-prod/site-column-mappings/yellowpages.com.json (Business Name, Business Profile URL, Rank, Categories,
//   Phone, Street Address, City, State, ZIP (one column), Service Area, Rating, Review Count, Open Status, Years in Business,
//   Years with Yellow Pages, Website, Description, Amenities, Other Locations, Coupon, Coupon URL, Sponsored, Image Preview,
//   Image URL). Sponsored is "Yes" on ad cards (lib/platform/hooks/yellowpages.ts).
// - configs-prod/yellowpages.com.json has no paging rule, so the Next step is written for both cases: Next button ready, or
//   the panel asks you to click Next (components/scraper/ListTab.tsx, startPaginationPicker).
// - Skip sponsored products applies to store sites only (lib/preferences/resultRows.ts: kind "products"), so this page
//   uses Filter rows (entrypoints/dataviewer/rowFilters.ts: is empty, contains) to drop ads.
// - Add contact details needs a Website column (entrypoints/dataviewer/AddWebsiteContactsButton.tsx); it adds Emails,
//   Website phones, Faxes and social columns (lib/utils/data-processing.ts). Bulk scrape → Collect contacts, Use saved data,
//   Start collecting: entrypoints/bulk/main.tsx.
// - Not stated, because only a run could confirm them: listings per page, pages per search, run times.
// 2026-10-21: title targets the search phrase ("how to scrape yellow pages", "yellow pages scraper chrome extension");
// the site says "Google Maps". The guide owns "How To Scrape Yellow Pages into Excel"; this page owns the column phrase.

export const yellowPages: ScraperPageContent = {
    slug: "yellow-pages",
    category: "business-directories",
    site: { name: "Yellow Pages", url: "https://www.yellowpages.com" },
    meta: {
        title: "How to Scrape Yellow Pages Listings with Phone and Website",
        description: "Turn a Yellow Pages search into a spreadsheet: name, categories, phone, address, rating, years in business and website. Free Chrome extension, no code.",
    },
    h1: "How to scrape Yellow Pages listings with phone, address and website",
    intro: "Search Yellow Pages for a category in a city and get every listing as a row. Phone, address, rating, years in business and website come in named columns, page after page.",
    allowed: "Yellow Pages' terms restrict automated collection, and the listings are public business details. This page reads the results you have open, in your own browser, at a person's pace, for your own prospecting or research; anti-spam law decides how you may contact the businesses. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
    status: "draft",
    lastVerified: "2026-11-10",
    version: "1.3.0",
    sample: {
        caption: "A search for plumbers, after export. Businesses are made up.",
        columns: ["Business Name", "Phone", "City, State, ZIP", "Rating", "Website"],
        rows: [
            ["Sample Plumbing Co.", "(555) 010-2231", "Springfield, IL 62701", "4.5", "sampleplumbing.example"],
            ["Riverside Pipe & Drain", "(555) 010-4410", "Springfield, IL 62704", "4.0", "riversidepipe.example"],
            ["Quick Fix Plumbing", "(555) 010-9043", "Springfield, IL 62702", "3.5", ""],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "The Yellow Pages setup names these columns. Rank, Service Area, Open Status, Years with Yellow Pages, Amenities, Coupon, Sponsored and Image URL also appear when the card shows them.",
        items: [
            { name: "Business Name", description: "The name on the listing." },
            { name: "Business Profile URL", description: "A link to the Yellow Pages profile." },
            { name: "Categories", description: "The categories the listing is filed under." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Street Address, City, State, ZIP", description: "The street line in one column, and the city, state and zip code together in the other." },
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
                points: ["Sponsored rows are kept, with Yes in the Sponsored column.", "To leave them out, use Filter rows on the results page: Sponsored is empty."],
            },
            {
                title: "Collect the pages",
                body: "Choose Collect more pages, then Next page. If the panel asks you to point at the Next button, click Next on the page. Set Stop after to the number of pages you want and click Collect.",
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
            "Sponsored listings appear in the results with Yes in the Sponsored column. Filter rows can leave them out.",
            "There is no Email column. Emails come from each business's website, in a second step over the Website column.",
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
                "A Yellow Pages search is a category plus a city or a zip code. Run it next to another directory and match on Phone to see which businesses only one of them lists.",
                "Years in Business is the column the other directory setups here don't have. It separates a 20-year firm from one that opened last spring.",
            ],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["plumbers, Springfield, IL", "Trades with phone, address and years in business, ready for a calling sheet", "Business Name, Phone, Years in Business, Website"],
                    ["accountants, 78701", "A zip code narrows a big city to one district", "Business Name, Phone, Street Address, Rating"],
                    ["dentists, Austin, TX", "Businesses with a website get emails in a second run; those without are web-design leads", "Business Name, Website, Review Count, Categories"],
                ],
                caption: "Yellow Pages search terms are categories, so \"plumbers\" finds more than \"plumbing repair\".",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Ten pages of plumbers, then their emails",
            paragraphs: ["A Yellow Pages run is two short runs: the listings, then the emails from their websites. Here is each step; how many rows you get depends on the search."],
            steps: [
                { title: "Search plumbers in Springfield, IL.", body: "Open the List tab. The listings appear as a card under Choose from lists we found, with the number on this page." },
                { title: "Choose Collect more pages, then Next page.", body: "If the panel shows Next button ready, go on. If it asks you to point at the Next button, click Next on the page. Set Stop after to 10 pages and click Collect from 10 pages." },
                { title: "Keep the tab in front.", body: "The tab pages through, and its tab group, named Collecting, shows the count. Sponsored rows arrive with Yes in the Sponsored column." },
                { title: "Run Bulk scrape → Collect contacts.", body: "Choose Use saved data, pick this collection and its Website column, and click Start collecting. Rows with a website get Emails, Website phones and social columns." },
                { title: "Export the table.", body: "Export as → Excel. Compare on Business Profile URL when you run it again." },
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
                "Drop the paid rows: Filter rows, Sponsored is empty.",
                "Compare with a Google Maps list: export both and match on Phone; businesses on one list and not the other are the ones competitors miss. For the Maps list, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only.",
            ],
        },
        {
            id: "caps",
            eyebrow: "Limits",
            heading: "What Yellow Pages shows, and what it doesn't",
            paragraphs: ["The listing cards carry the phone, address and years in business. Emails are never on the card, and ratings are Yellow Pages' own, not Google's."],
            table: {
                columns: ["What", "On Yellow Pages", "In your table"],
                rows: [
                    ["Listings", "A page at a time, with Next links", "Every listing, for as many pages as you set"],
                    ["Sponsored listings", "Mixed into the results", "Kept, with Yes in the Sponsored column; Filter rows drops them"],
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
                "Collecting wins on anything over a page. The one advantage of reading by hand is seeing the profile page, which the Business Profile URL column gives you back on any row.",
            ],
            table: {
                columns: ["", "Copying by hand", "With the extension"],
                rows: [
                    ["10 pages of listings", "Copying each row by hand", "One run, with the pages set under Stop after"],
                    ["Emails for the ones with websites", "Opening each site", "One run of Add contact details over the Website column"],
                    ["Street apart from city, state and zip", "Split later, in the sheet", "Two columns: Street Address and City, State, ZIP"],
                ],
            },
        },
    ],
    screenshots: ["ext/list-tab-yellowpages", "ext/results-yellowpages"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["justdial", "bbb"],
    faqs: [
        { q: "Is this Yellow Pages scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "Can I get emails for the businesses?", a: "Yes, in a second step. Click Add contact details on the results page, or open Bulk scrape → Collect contacts and choose Use saved data. Each website is read for emails, phones and social links." },
        { q: "How many pages can I scrape at once?", a: "As many as you set under Stop after. Keep the tab in front, and click Stop if you have enough; the rows so far are kept." },
        { q: "Does it work on other countries' Yellow Pages?", a: "The ready-made setup is for yellowpages.com. Other countries' directories have no setup. If the List tab finds the listings as a list, the columns are named from the page, so check them on the first page." },
        { q: "Why are there sponsored rows?", a: "Yellow Pages mixes paid listings into results. They're kept, with Yes in the Sponsored column, so Filter rows can leave them out." },
        { q: "Can I export to Google Sheets?", a: "Yes. Export as offers Google Sheets, Excel, CSV and JSON." },
        { q: "Can I scrape Yellow Pages by zip code?", a: "Yes. Search the category with a zip code instead of a city. The zip code is also in the City, State, ZIP column, so Filter rows with contains narrows a city-wide run to one zip afterwards." },
        { q: "Which directory should I start with?", a: "Yellow Pages for US trades and the Years in Business column; BBB for the bureau's grade and accreditation; Justdial for India. Run two and match on Phone to find the businesses only one of them lists." },
        { q: "Is scraping Yellow Pages allowed?", a: "You collect public listings in your own browser, at a person's pace. The site's terms and anti-spam laws decide what you can do with them; our explainer at /web-scraping-legal covers the rules in plain words. It isn't legal advice." },
    ],
};
