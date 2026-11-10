import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against chrome-extension-source on 2026-11-10:
// - Columns: configs-prod/site-column-mappings/bbb.org.json (Business Name, BBB Profile URL, Logo Preview, Logo URL,
//   Categories, BBB Rating, BBB Accredited, Phone, Address, Service Area, Sponsored). BBB Accredited is "Yes" when the card
//   shows the accreditation seal and empty otherwise (lib/platform/hooks/bbb.ts).
// - Paging: configs-prod/bbb.org.json, Next page by nav.bds-pagination a[rel="next"].
// - Collecting count on a tab group: lib/background/scrapeTabIndicator.ts. Next button ready, Stop after, All pages:
//   components/scraper/ListTab.tsx. Bulk scrape → Collect contacts, Use saved data: entrypoints/bulk/main.tsx.
// - Not stated, because only a run could confirm them: listings per page, pages per search, run times.
// 2026-10-21: title targets the search phrase ("how to scrape bbb"); the site says "Google Maps".

export const bbb: ScraperPageContent = {
    slug: "bbb",
    category: "business-directories",
    site: { name: "BBB", url: "https://www.bbb.org" },
    meta: {
        title: "How to Scrape BBB Business Listings with Rating and Phone",
        description: "Turn a Better Business Bureau search into a spreadsheet: name, categories, BBB rating, accreditation, phone and address. Free Chrome extension, no code.",
    },
    h1: "How to scrape BBB business listings with rating, accreditation and phone",
    intro: "Search the Better Business Bureau directory for a category in an area and get every listing as a row. The BBB rating and accreditation come as columns you can filter by.",
    allowed: "BBB's terms restrict automated collection, and the listings are public business details with the bureau's own grades. This page reads the search results you have open, in your own browser, at a person's pace, for your own research or prospecting; anti-spam law decides how you may contact the businesses. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
    status: "draft",
    lastVerified: "2026-11-10",
    version: "1.3.0",
    sample: {
        caption: "A search for roofing contractors, after export. Businesses are made up.",
        columns: ["Business Name", "BBB Rating", "BBB Accredited", "Phone", "Address"],
        rows: [
            ["Summit Roofing LLC", "A+", "Yes", "(555) 010-3301", "12 Ridge Rd, Springfield, IL"],
            ["Valley Roof Repair", "A", "", "(555) 010-3345", "88 Valley St, Springfield, IL"],
            ["Prairie Gutter & Roof", "B+", "Yes", "(555) 010-3390", "4 Prairie Ln, Springfield, IL"],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "The BBB setup names these columns. Service Area, Logo URL and Sponsored also appear when the card shows them.",
        items: [
            { name: "Business Name", description: "The name on the listing." },
            { name: "BBB Profile URL", description: "A link to the BBB profile." },
            { name: "Categories", description: "The business categories on the listing." },
            { name: "BBB Rating", description: "The bureau's letter grade, as shown." },
            { name: "BBB Accredited", description: "Yes for accredited businesses, blank for the rest." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Address", description: "The listed address." },
        ],
    },
    steps: {
        heading: "How to scrape BBB listings in three steps",
        items: [
            {
                title: "Search BBB",
                body: "Search for a category near a place, such as roofing contractors in Denver, CO. Then click the Web Scraper Pro icon and open the List tab.",
                points: ["Filter to Accredited businesses on BBB first if you want only those."],
            },
            {
                title: "Collect the pages",
                body: "Choose Collect more pages, then Next page. Set Stop after to the number of pages you want and click Collect.",
                points: ["Keep the tab in front while it pages through.", "Click Stop at any time. What's collected is kept."],
            },
            {
                title: "Export",
                body: "Export to Excel, CSV, JSON or Google Sheets. For emails, paste the businesses' websites into Bulk scrape and choose Collect contacts.",
                points: ["The listing cards don't show websites. Open a business's BBB profile for the site, or match the table on Phone against a Yellow Pages run, which has a Website column."],
            },
        ],
    },
    notes: {
        heading: "Specific to BBB",
        items: [
            "The listing cards don't show websites. Open each business's BBB profile for that, or match on Phone against a directory run that has a Website column.",
            "BBB ratings are the bureau's grades, collected as shown. Web Scraper Pro doesn't verify them.",
            "BBB Accredited is Yes for accredited businesses and left blank for the rest, not set to No.",
        ],
    },
    emptyWhen: [
        { column: "BBB Rating", when: "The business isn't rated by BBB." },
        { column: "BBB Accredited", when: "Filled only for accredited businesses. Others are blank, not No." },
        { column: "Phone, Address", when: "The listing card doesn't show them. The business's BBB page may." },
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
                "A BBB search is a category plus a place, and the result carries two things no other directory gives you: the bureau's letter grade and whether the business pays for accreditation. Both come as columns.",
                "These three shapes cover common jobs. Change the trade and the place to yours.",
            ],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["roofing contractors in Denver, CO", "Home-services trades where a grade matters to the buyer and the seller", "Business Name, BBB Rating, BBB Accredited, Phone"],
                    ["moving companies in Phoenix, AZ", "A category with wide grade spread; the A+ list is the referral list", "Business Name, BBB Rating, Phone, Address"],
                    ["auto repair near 60614", "A zip code keeps the list to one part of a big city", "Business Name, BBB Rating, BBB Accredited, Address"],
                ],
                caption: "Filter to Accredited on BBB before collecting when accreditation is the whole point.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Every rated roofer in Denver, graded",
            paragraphs: ["BBB pages its results with a Next link, so a run is a page count and a click. Here is each step on one search; how many rows you get depends on the search."],
            steps: [
                { title: "Search roofing contractors in Denver, CO.", body: "Open the List tab. The listings appear as a card under Choose from lists we found, with the number on this page." },
                { title: "Choose Collect more pages, then Next page.", body: "The BBB setup knows where the Next link is, so the panel shows Next button ready. Set Stop after to All pages, or a number, and click Collect." },
                { title: "Keep the tab in front.", body: "The tab pages through, and its tab group, named Collecting, shows the count. Click Stop at any time; the rows so far are kept." },
                { title: "Sort by BBB Rating.", body: "Click the header. A+ rises to the top; unrated businesses show an empty cell, not a grade." },
                { title: "Add websites, then emails.", body: "The cards don't show websites. For the 20 you care about, open the BBB Profile URL and copy the website. Paste the websites into Bulk scrape and choose Collect contacts." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: ["Four moves on the results page turn a BBB run into a referral list, a prospect list or a market map."],
            points: [
                "The referral list: Filter rows, BBB Rating is A+ and BBB Accredited is Yes. Export it for a homeowner guide or a partner list.",
                "The prospect list for a reputation service: sort by BBB Rating ascending and keep the C and below rows. Those businesses have a problem you can help with.",
                "The market map: keep Categories and Address, export to Google Sheets, and count businesses per category per town with a pivot table.",
                "The cross-check: match the table on Phone against a Google Maps list of the same category; a BBB business with no Maps listing has a gap worth a call. For that list, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only.",
            ],
        },
        {
            id: "caps",
            eyebrow: "Limits",
            heading: "What BBB shows, and what it doesn't",
            paragraphs: ["BBB's search cards are short on purpose: a grade, a phone and an address. The rest lives on the profile page, which the run doesn't open."],
            table: {
                columns: ["What", "On BBB", "In your table"],
                rows: [
                    ["Listings", "A page at a time, with a Next link", "Every listing, for as many pages as you set"],
                    ["Website", "On the profile page only", "Not on the card; open the BBB Profile URL"],
                    ["Complaints and reviews", "On the profile page", "Not collected in a list run; use the Properties tab on one profile"],
                    ["Accreditation", "A seal on accredited cards", "BBB Accredited is Yes for those rows, blank for the rest"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with BBB's own search",
            paragraphs: [
                "BBB's search has filters for accreditation and rating but no export. For a list of ten, read the page; for a list of a hundred, collect it.",
                "The run keeps BBB's filters, because it collects whatever the search page shows. Apply them first, then collect, and the table is already narrowed.",
            ],
            table: {
                columns: ["", "BBB search by hand", "With the extension"],
                rows: [
                    ["Ten pages of listings", "Reading and retyping each row", "One run, with the pages set under Stop after"],
                    ["Grade and accreditation as columns", "Noted by hand", "BBB Rating and BBB Accredited, ready to filter"],
                    ["Websites and emails", "Profile by profile", "Still profile by profile for the website; emails in one bulk run after"],
                ],
            },
        },
    ],
    screenshots: ["ext/list-tab-bbb"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["yellow-pages", "justdial"],
    faqs: [
        { q: "Is this BBB scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "Does BBB Accredited mean BBB-approved?", a: "It means the business is accredited by BBB, which BBB grants to businesses that meet its standards. The column is Yes for accredited businesses and blank for the rest." },
        { q: "Can I get only accredited businesses?", a: "Yes. Filter to Accredited on BBB before collecting, or collect everything and use Filter rows to keep the rows where BBB Accredited is Yes." },
        { q: "Can I get websites and emails?", a: "Not from the listing cards; they don't show websites. Open the business's BBB profile for the site, then paste the websites into Bulk scrape and choose Collect contacts." },
        { q: "Can I get the full profile for each business?", a: "The results card gives the summary. Open a profile and use the Properties tab for the details on that page." },
        { q: "Can I export to Excel or Google Sheets?", a: "Yes. Export as offers Excel, CSV, JSON and Google Sheets." },
        { q: "Does it collect BBB complaints or reviews?", a: "No. Complaints and customer reviews are on each profile page, not on the search cards. For one business, open its profile and use the Properties tab." },
        { q: "Can I scrape BBB for several cities at once?", a: "Yes. Paste the search addresses, one per city, into Bulk scrape. Each is collected with the same page settings and View merged table joins them into one table." },
        { q: "Is scraping BBB allowed?", a: "You collect public listing cards in your own browser, at a person's pace. BBB's terms and anti-spam laws decide what you may do with the list; our explainer at /web-scraping-legal covers the rules in plain words. It isn't legal advice." },
    ],
};
