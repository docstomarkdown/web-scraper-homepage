import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: yellowpages.com pack columns (Business Name, Profile URL, Categories,
// Phone, Address, City, State, ZIP, Rating, Review Count, Years in Business, Website, Description) in configs-prod/.
// Draft until a real run's screenshots and verified date exist.

export const yellowPages: ScraperPageContent = {
    slug: "yellow-pages",
    category: "maps-and-directories",
    site: { name: "Yellow Pages", url: "https://www.yellowpages.com" },
    meta: {
        title: "Yellow Pages Scraper: Business Listings to a Spreadsheet",
        description: "Collect Yellow Pages search results into named columns: business name, categories, phone, address, rating, years in business and website, across every page.",
    },
    h1: "Collect Yellow Pages listings into a spreadsheet",
    intro: "Search Yellow Pages for a category in a city and get every listing as a row, with phone, address, rating, years in business and website, page after page.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for plumbers, after export. Businesses are made up.",
        columns: ["Business Name", "Categories", "Phone", "City", "State", "Rating", "Years in Business", "Website"],
        rows: [
            ["Sample Plumbing Co.", "Plumbers, Drain cleaning", "(555) 010-2231", "Springfield", "IL", "4.5", "12", "sampleplumbing.example"],
            ["Riverside Pipe & Drain", "Plumbers", "(555) 010-4410", "Springfield", "IL", "4.0", "8", "riversidepipe.example"],
            ["Quick Fix Plumbing", "Plumbers, Water heaters", "(555) 010-9043", "Springfield", "IL", "3.5", "3", ""],
        ],
    },
    fields: {
        heading: "Thirteen columns, as Yellow Pages lists them",
        items: [
            { name: "Business Name and Profile URL", description: "The name and a link to its Yellow Pages profile." },
            { name: "Categories", description: "The categories the listing is filed under." },
            { name: "Phone, Address, City, State, ZIP", description: "The listed phone number and address, split into columns you can filter by." },
            { name: "Rating and Review Count", description: "The listing's rating and number of reviews." },
            { name: "Years in Business", description: "As shown on the listing, useful for spotting established businesses." },
            { name: "Website and Description", description: "The business's own site, and its listing description." },
        ],
    },
    steps: {
        heading: "Three clicks",
        items: [
            { title: "Search Yellow Pages", points: ["Example: dentists in Austin, TX.", "Sponsored rows are kept and marked Sponsored; Settings → Results → Skip sponsored products leaves them out."], body: "Search for a category in a city and open the side panel's List tab. The listings appear under Choose from lists we found." },
            { title: "Collect the pages", points: ["Choose Collect more pages, then Next page; set Stop after and click Collect from 5 pages (or the number you set).", "Keep the tab in front while it pages through."], body: "Choose Collect more pages, Next page, and how many pages. Click Collect N items." },
            { title: "Add contact details, then export", points: ["The Add contact details button needs a Maps-style Website column, so on a Yellow Pages table use Bulk scrape → Collect contacts → Use saved data instead.", "Export as gives Excel, CSV, JSON or Google Sheets."], body: "On the results page, click Add contact details to add emails and social links from each website. Export to Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Specific to Yellow Pages",
        items: [
            "Results are paged; set Next page and the page count before collecting, or Stop and save part-way.",
            "Sponsored listings appear in the results and are marked; Settings → Results can skip them.",
            "Keep the tab in front while it pages through; paging slows down in a background tab.",
        ],
    },
    emptyWhen: [{"column": "Website", "when": "The listing has no website link."}, {"column": "Rating, Review Count", "when": "The listing has no reviews on Yellow Pages."}, {"column": "Years in Business", "when": "The business hasn't stated it."}, {"column": "Description", "when": "The listing shows no snippet."}],
    pushback: ["If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again; what was collected is kept.", "A site that slows down for anyone loading many pages fast shows fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.", "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page."],
    screenshots: ["ext/list-tab-yellowpages", "ext/results-yellowpages"],
    feature: "list-scraper",
    guide: "collect-business-listings-from-yellow-pages",
    useCase: "lead-generation",
    related: ["maps", "justdial", "bbb"],
    faqs: [
        { q: "Does it work on other countries' Yellow Pages?", a: "The ready-made setup is for yellowpages.com. Other directories are detected as lists, with columns named from the page." },
        { q: "Can I get emails for the businesses?", a: "Yes, in a second step: open Bulk scrape → Collect contacts, choose Use saved data, and pick this collection. Each website is read for emails, phones and social links." },
        { q: "Why are there sponsored rows?", a: "Yellow Pages mixes paid listings into results. They're kept and marked Sponsored so you can filter them; turn on Skip sponsored products to leave them out." },
    ],
};
