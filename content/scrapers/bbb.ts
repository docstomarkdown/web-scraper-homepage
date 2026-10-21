import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: bbb.org pack columns (Business Name, BBB Profile URL, Categories,
// BBB Rating, Accredited, Phone, Address) in configs-prod/. Draft until a real run's screenshots and date exist.
// 2026-10-21: title targets the search phrase ("how to scrape bbb"); the site says "Google Maps".

export const bbb: ScraperPageContent = {
    slug: "bbb",
    category: "maps-and-directories",
    site: { name: "BBB", url: "https://www.bbb.org" },
    meta: {
        title: "How to Scrape BBB Accredited Business Listings to a Spreadsheet",
        description: "Turn a Better Business Bureau search into a spreadsheet: business name, categories, BBB rating, accreditation, phone and address for every listing. Free Chrome extension, no code.",
    },
    h1: "How to scrape BBB accredited business listings to a spreadsheet",
    intro: "Search the Better Business Bureau directory for a category in an area and get every listing as a row. The BBB rating and accreditation come as columns you can filter by.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for roofing contractors, after export. Businesses are made up.",
        columns: ["Business Name", "BBB Rating", "Accredited", "Phone", "Address"],
        rows: [
            ["Summit Roofing LLC", "A+", "Yes", "(555) 010-3301", "12 Ridge Rd, Springfield, IL"],
            ["Valley Roof Repair", "A", "", "(555) 010-3345", "88 Valley St, Springfield, IL"],
            ["Prairie Gutter & Roof", "B+", "Yes", "(555) 010-3390", "4 Prairie Ln, Springfield, IL"],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "Seven columns, as BBB lists them.",
        items: [
            { name: "Business Name", description: "The name on the listing." },
            { name: "BBB Profile URL", description: "A link to the BBB profile." },
            { name: "Categories", description: "The business categories on the listing." },
            { name: "BBB Rating", description: "The bureau's letter grade, as shown." },
            { name: "Accredited", description: "Filled for accredited businesses, blank for the rest." },
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
                body: "Export to Excel, CSV, JSON or Google Sheets. For emails, add each business's website first, then run Bulk scrape → Collect contacts with Use saved data.",
                points: ["The listing cards don't show websites. Open a business's BBB profile, or its Google Maps listing, for the site."],
            },
        ],
    },
    notes: {
        heading: "Specific to BBB",
        items: [
            "The listing cards don't show websites. Open each business's BBB profile for that, or use its Google Maps listing to get the site and contact details.",
            "BBB ratings are the bureau's grades, collected as shown. Web Scraper Pro doesn't verify them.",
            "Accredited is filled for accredited businesses and left blank for the rest, not set to No.",
        ],
    },
    emptyWhen: [
        { column: "BBB Rating", when: "The business isn't rated by BBB." },
        { column: "Accredited", when: "Shown only for accredited businesses. Others are blank, not No." },
        { column: "Phone, Address", when: "The listing card doesn't show them. The business's BBB page may." },
    ],
    pushback: [
        "If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again.",
        "A site that slows down when many pages load fast shows fewer results or an error page. Collect in smaller runs and come back later. History keeps each run.",
        "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    screenshots: ["ext/list-tab-bbb"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["maps", "yellow-pages", "justdial"],
    faqs: [
        { q: "Is this BBB scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Does Accredited mean BBB-approved?", a: "It means the business pays for BBB accreditation and meets its standards. The column is filled for accredited businesses and blank for the rest." },
        { q: "Can I get only accredited businesses?", a: "Yes. Filter to Accredited on BBB before collecting, or collect everything and keep the rows where Accredited is filled with Filter rows." },
        { q: "Can I get websites and emails?", a: "Not from the listing cards; they don't show websites. Open the business's BBB profile or its Google Maps listing for the site, then run Collect contacts over the websites." },
        { q: "Can I get the full profile for each business?", a: "The results card gives the summary. Open a profile and use the Properties tab for the details on that page." },
        { q: "Can I export to Excel or Google Sheets?", a: "Yes. Export as offers Excel, CSV, JSON and Google Sheets." },
    ],
};
