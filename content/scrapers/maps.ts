import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: Maps columns (Business Name, Category, Rating, Review Count, Address,
// Operating Hours, Phone, Website, Map URL) from the google-maps pack in configs-prod/; contact columns added in the same
// run (DECISIONS.md D-022); chat count card up to 200 (D-026); best rated first and repeats left out (D-031, D-032).
// Draft until a real run's screenshots are in the visuals library and lastVerified is set from that run.

export const maps: ScraperPageContent = {
    slug: "maps",
    category: "maps-and-directories",
    site: { name: "Maps", url: "https://www.google.com/maps" },
    meta: {
        title: "Maps Scraper: Every Business from a Search, with Contact Details",
        description: "Collect the businesses in a Maps search into a spreadsheet: name, category, rating, reviews, address, hours, phone and website, plus emails and social links from each site.",
    },
    h1: "Collect every business from a Maps search",
    intro: "Search for a type of business in a place, click once, and get each result as a row, with the emails and social links from its own website added in the same run.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for dentists, after export. Names, numbers and addresses are made up.",
        columns: ["Business Name", "Category", "Rating", "Review Count", "Address", "Phone", "Website", "Emails"],
        rows: [
            ["Bright Smile Dental", "Dentist", "4.8", "212", "101 Main St, Springfield", "(555) 010-2231", "brightsmile.example", "hello@brightsmile.example"],
            ["Lakeside Family Dentistry", "Dentist", "4.6", "87", "42 Lake Rd, Springfield", "(555) 010-4410", "lakesidefd.example", ""],
            ["Northside Orthodontics", "Orthodontist", "4.9", "1,034", "7 Oak Ave, Springfield", "(555) 010-7782", "northsideortho.example", "info@northsideortho.example"],
        ],
    },
    fields: {
        heading: "Nine columns from Maps, plus contact details",
        intro: "A column stays empty when the place doesn't list that detail.",
        items: [
            { name: "Business Name and Category", description: "The name and the business type Maps shows for it." },
            { name: "Rating and Review Count", description: "The star rating and how many reviews, as numbers you can sort by." },
            { name: "Address and Operating Hours", description: "The full address and the opening hours on the listing." },
            { name: "Phone and Website", description: "The listed phone number and the business's own site." },
            { name: "Map URL", description: "A link back to the place, to check any row." },
            { name: "Emails, Website phones, Faxes, social links", description: "Read from the business's website and contact page during the run, when contact details are on." },
        ],
    },
    steps: {
        heading: "From search to spreadsheet",
        items: [
            { title: "Search Maps", body: "Search for a type of business in a place, such as \"dentists in Springfield\", and open the side panel's List tab." },
            { title: "Click Collect places from this map", body: "Leave Also collect contact details from each business's website ticked. The table fills in as it scrolls; Stop keeps what it has. In chat, type the search instead and pick how many on the card." },
            { title: "Export", body: "Open the results, keep the columns you want, and export to Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Specific to Maps",
        items: [
            "Maps shows a limited number of results per search. Search smaller areas or narrower categories and run them together in Bulk.",
            "In chat, one search collects up to 200 businesses; the side panel keeps going until Maps reaches the end.",
            "Businesses are saved best rated first, and a place that appears twice is kept once. Both can be changed in Settings → Results.",
            "Many small businesses publish no email. Those rows keep their phone and website.",
            "It collects what Maps shows publicly. It doesn't sign in or reveal hidden details.",
        ],
    },
    screenshots: ["ext/list-tab-maps-collect", "ext/results-maps-with-contacts"],
    feature: "maps-leads",
    guide: "get-local-business-leads-from-maps",
    useCase: "lead-generation",
    related: ["yellow-pages", "justdial", "bbb"],
    faqs: [
        { q: "Do I need a Maps API key?", a: "No. It works on the Maps website in your own browser." },
        { q: "Can I get reviews as well?", a: "The rating and review count, yes. Review text isn't collected from Maps." },
    ],
};
