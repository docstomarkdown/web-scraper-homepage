import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: justdial.com pack columns (Business Name, URL, Rating, Rating Count,
// Address, Categories, Phone, Highlights, Services) in configs-prod/. Draft until a real run's screenshots and date exist.

export const justdial: ScraperPageContent = {
    slug: "justdial",
    category: "maps-and-directories",
    site: { name: "Justdial", url: "https://www.justdial.com" },
    meta: {
        title: "Justdial Scraper: Business Listings to Excel",
        description: "Collect Justdial search results into a spreadsheet: business name, rating, rating count, address, categories, phone, highlights and services, across every page.",
    },
    h1: "Collect Justdial listings into a spreadsheet",
    intro: "Search Justdial for a service in a city and get every listing as a row with its rating, address, phone and services.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for AC repair, after export. Businesses are made up.",
        columns: ["Business Name", "Rating", "Rating Count", "Address", "Categories", "Phone", "Services"],
        rows: [
            ["Cool Air Services", "4.4", "318", "RS Puram, Coimbatore", "AC Repair, AC Installation", "+91 55500 10001", "Split AC, Window AC"],
            ["Sri Comfort Cooling", "4.1", "92", "Gandhipuram, Coimbatore", "AC Repair", "+91 55500 10002", "Servicing, Gas refill"],
        ],
    },
    fields: {
        heading: "Nine columns, as Justdial lists them",
        items: [
            { name: "Business Name and URL", description: "The name and a link to its Justdial page." },
            { name: "Rating and Rating Count", description: "The rating and how many people rated it." },
            { name: "Address and Categories", description: "The area and the categories it's listed under." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Highlights and Services", description: "The highlights and services shown on the listing." },
        ],
    },
    steps: {
        heading: "Three clicks",
        items: [
            { title: "Search Justdial", points: ["Example: dentists in Chennai.", "Justdial may ask you to sign in or verify after a few pages; do it in the tab and collect again."], body: "Search for a service in a city and open the side panel's List tab." },
            { title: "Collect the pages", points: ["Choose Collect more pages, then Next page; set Stop after and click Collect from 5 pages."], body: "Choose Collect more pages and Auto scroll or Next page, then Collect N items." },
            { title: "Export", points: ["Export as gives Excel, CSV, JSON or Google Sheets. For emails, run Bulk scrape → Collect contacts over the Website column with Use saved data."], body: "Keep the columns you want and export to Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Specific to Justdial",
        items: [
            "Justdial sometimes asks you to sign in or verify after many pages; do that in the tab and carry on.",
            "Listings given as the website for a business are directory pages, so contact details aren't read from them.",
        ],
    },
    emptyWhen: [{"column": "Phone", "when": "Justdial hides some numbers behind a Show number button; only numbers shown on the card are collected."}, {"column": "Rating, Rating Count", "when": "The listing has no ratings yet."}, {"column": "Services, Highlights", "when": "The card lists none."}],
    pushback: ["If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again; what was collected is kept.", "A site that slows down for anyone loading many pages fast shows fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.", "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.", "Justdial shows some phone numbers only after a click or a sign-in; the extension collects what the card shows and never clicks through for you."],
    screenshots: ["ext/list-tab-justdial"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["maps", "yellow-pages", "bbb"],
    faqs: [
        { q: "Why are some phone numbers missing?", a: "Justdial shows some numbers only after a click or a sign-in. The extension collects the numbers shown on the card; it doesn't click through or sign in for you." },
        { q: "Does it work in every city?", a: "Yes. The setup reads the listing cards, which are the same across Justdial's cities and categories." },
    ],
};
