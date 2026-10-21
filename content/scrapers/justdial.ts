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
            { title: "Search Justdial", body: "Search for a service in a city and open the side panel's List tab." },
            { title: "Collect the pages", body: "Choose Collect more pages and Auto scroll or Next page, then Collect N items." },
            { title: "Export", body: "Keep the columns you want and export to Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Specific to Justdial",
        items: [
            "Justdial sometimes asks you to sign in or verify after many pages; do that in the tab and carry on.",
            "Listings given as the website for a business are directory pages, so contact details aren't read from them.",
        ],
    },
    screenshots: ["ext/list-tab-justdial"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["maps", "yellow-pages", "bbb"],
    faqs: [],
};
