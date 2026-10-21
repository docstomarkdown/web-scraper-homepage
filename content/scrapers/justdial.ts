import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: justdial.com pack columns (Business Name, URL, Rating, Rating Count,
// Address, Categories, Phone, Highlights, Services) in configs-prod/. Draft until a real run's screenshots and date exist.
// 2026-10-21: title targets the search phrase ("extract business phone numbers from justdial"); the site says "Google Maps".

export const justdial: ScraperPageContent = {
    slug: "justdial",
    category: "maps-and-directories",
    site: { name: "Justdial", url: "https://www.justdial.com" },
    meta: {
        title: "How to Scrape Justdial Business Listings and Phone Numbers",
        description: "Turn a Justdial search into a spreadsheet: business name, rating, address, categories, phone, highlights and services for every listing, across every page. Free Chrome extension, no code.",
    },
    h1: "How to scrape Justdial business listings and phone numbers",
    intro: "Search Justdial for a service in a city and get every listing as a row. Rating, address, phone and services come in named columns, page after page.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for AC repair, after export. Businesses are made up.",
        columns: ["Business Name", "Rating", "Address", "Phone", "Services"],
        rows: [
            ["Cool Air Services", "4.4", "RS Puram, Coimbatore", "+91 55500 10001", "Split AC, Window AC"],
            ["Sri Comfort Cooling", "4.1", "Gandhipuram, Coimbatore", "+91 55500 10002", "Servicing, Gas refill"],
            ["Breeze Point AC Care", "3.9", "Saibaba Colony, Coimbatore", "", "Installation"],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "Nine columns, as Justdial lists them.",
        items: [
            { name: "Business Name", description: "The name on the listing." },
            { name: "URL", description: "A link to the Justdial page." },
            { name: "Rating and Rating Count", description: "The rating and how many people rated it." },
            { name: "Address", description: "The area and city." },
            { name: "Categories", description: "The categories it's listed under." },
            { name: "Phone", description: "The phone number shown on the card." },
            { name: "Highlights and Services", description: "The highlights and services shown on the listing." },
        ],
    },
    steps: {
        heading: "How to scrape Justdial in three steps",
        items: [
            {
                title: "Search Justdial",
                body: "Search for a service in a city, such as dentists in Chennai. Then click the Web Scraper Pro icon and open the List tab.",
                points: ["Justdial may ask you to sign in or verify after a few pages. Do it in the tab and collect again."],
            },
            {
                title: "Collect the pages",
                body: "Choose Collect more pages, then Auto scroll or Next page, whichever the panel found. Set Stop after and click Collect.",
                points: ["Keep the tab in front while it runs.", "Click Stop at any time. What's collected is kept."],
            },
            {
                title: "Export",
                body: "Keep the columns you want and export to Excel, CSV, JSON or Google Sheets. The list is saved in History too.",
                points: ["For emails, run Bulk scrape → Collect contacts over the Website column with Use saved data."],
            },
        ],
    },
    notes: {
        heading: "Specific to Justdial",
        items: [
            "Justdial sometimes asks you to sign in or verify after many pages. Do that in the tab and carry on.",
            "Some phone numbers show only after a click or a sign-in. The extension collects what the card shows and never clicks through for you.",
            "Listings given as the website for a business are directory pages, so contact details aren't read from them.",
        ],
    },
    emptyWhen: [
        { column: "Phone", when: "Justdial hides some numbers behind a Show number button. Only numbers shown on the card are collected." },
        { column: "Rating, Rating Count", when: "The listing has no ratings yet." },
        { column: "Services, Highlights", when: "The card lists none." },
    ],
    pushback: [
        "If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again.",
        "A site that slows down when many pages load fast shows fewer results or an error page. Collect in smaller runs and come back later. History keeps each run.",
        "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    screenshots: ["ext/list-tab-justdial"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["maps", "yellow-pages", "bbb"],
    faqs: [
        { q: "Is this Justdial scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Why are some phone numbers missing?", a: "Justdial shows some numbers only after a click or a sign-in. The extension collects the numbers shown on the card; it doesn't click through or sign in for you." },
        { q: "Can I get emails for the businesses?", a: "Where a listing has the business's own website, yes. Run Bulk scrape → Collect contacts with Use saved data over the table. Directory pages given as the website are skipped." },
        { q: "How many listings can I collect?", a: "As many pages as you set under Stop after. If Justdial asks you to verify, complete it in the tab and collect again; the rows so far are kept." },
        { q: "Does it work in every city?", a: "Yes. The setup reads the listing cards, which are the same across Justdial's cities and categories." },
        { q: "Can I export to Excel or Google Sheets?", a: "Yes. Export as offers Excel, CSV, JSON and Google Sheets." },
    ],
};
