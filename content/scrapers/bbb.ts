import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: bbb.org pack columns (Business Name, BBB Profile URL, Categories,
// BBB Rating, Accredited, Phone, Address) in configs-prod/. Draft until a real run's screenshots and date exist.

export const bbb: ScraperPageContent = {
    slug: "bbb",
    category: "maps-and-directories",
    site: { name: "BBB", url: "https://www.bbb.org" },
    meta: {
        title: "BBB Scraper: Accredited Business Listings to a Spreadsheet",
        description: "Collect Better Business Bureau search results into a spreadsheet: business name, categories, BBB rating, accreditation, phone and address.",
    },
    h1: "Collect BBB business listings into a spreadsheet",
    intro: "Search the Better Business Bureau directory for a category in an area and get every listing with its BBB rating and accreditation.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for roofing contractors, after export. Businesses are made up.",
        columns: ["Business Name", "Categories", "BBB Rating", "Accredited", "Phone", "Address"],
        rows: [
            ["Summit Roofing LLC", "Roofing Contractors", "A+", "Yes", "(555) 010-3301", "12 Ridge Rd, Springfield, IL"],
            ["Valley Roof Repair", "Roofing Contractors, Gutters", "A", "No", "(555) 010-3345", "88 Valley St, Springfield, IL"],
        ],
    },
    fields: {
        heading: "Seven columns, as BBB lists them",
        items: [
            { name: "Business Name and BBB Profile URL", description: "The name and a link to its BBB profile." },
            { name: "Categories", description: "The business categories on the listing." },
            { name: "BBB Rating and Accredited", description: "The letter grade and whether the business is BBB accredited." },
            { name: "Phone and Address", description: "The listed phone number and address." },
        ],
    },
    steps: {
        heading: "Three clicks",
        items: [
            { title: "Search BBB", points: ["Example: roofing contractors in Denver, CO.", "Filter to Accredited businesses on BBB first if the client wants only those."], body: "Search for a category near a place and open the side panel's List tab." },
            { title: "Collect the pages", points: ["Choose Collect more pages, then Next page; set Stop after and click Collect from 5 pages."], body: "Choose Collect more pages and Next page, then Collect N items." },
            { title: "Export", points: ["Export as gives Excel, CSV, JSON or Google Sheets. For emails, run Bulk scrape → Collect contacts over the website addresses with Use saved data."], body: "Export to Excel, CSV, JSON or Google Sheets, or add contact details from each business's website first." },
        ],
    },
    notes: {
        heading: "Specific to BBB",
        items: [
            "The listing itself doesn't show websites; open each business's BBB profile for that, or use its Maps listing to get the site and contact details.",
            "BBB ratings are the bureau's grades, collected as shown; they aren't verified by Web Scraper Pro.",
        ],
    },
    emptyWhen: [{"column": "BBB Rating", "when": "The business isn't rated by BBB."}, {"column": "Accredited", "when": "Shown only for accredited businesses; others are blank, not No."}, {"column": "Phone, Address", "when": "The profile card doesn't show them; the business's BBB page may."}],
    pushback: ["If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again; what was collected is kept.", "A site that slows down for anyone loading many pages fast shows fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.", "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page."],
    screenshots: ["ext/list-tab-bbb"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["maps", "yellow-pages", "justdial"],
    faqs: [
        { q: "Does Accredited mean BBB-approved?", a: "It means the business pays for BBB accreditation and meets its standards. The column is filled for accredited businesses and blank for the rest." },
        { q: "Can I get the full profile for each business?", a: "The results card gives the summary. Open a profile and use the Properties tab for the details on that page." },
    ],
};
