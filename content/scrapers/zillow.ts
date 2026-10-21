import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the zillow.com pack in configs-prod/ (search-result cards; the hook in
// lib/platform/hooks/zillow.ts scrolls the list panel so every card renders before collecting) and its column mapping
// (Address, Price, Beds, Baths, Sq Ft, Lot Size, Listing Type, Listed By, Badges, Property URL, Zillow Property ID, Image
// URL; agent-directory columns on agent pages). Paging on Zillow uses the generic Next-page detection, not the pack:
// verify on a real run before publishing and adjust step 2 if the Next arrow needs pointing at. Draft until then.

export const zillow: ScraperPageContent = {
    slug: "zillow",
    category: "real-estate",
    site: { name: "Zillow", url: "https://www.zillow.com" },
    meta: {
        title: "Zillow Scraper: Export Every Listing in an Area to Excel",
        description: "Collect a Zillow search into a spreadsheet: address, price, beds, baths, square footage, lot size, listing type, who listed it and the link, across every page of results, with no code.",
    },
    h1: "Export every Zillow listing in an area",
    intro: "Search a city or zip code on Zillow, for sale or for rent, pick the results in the side panel, and get one row per home with named columns, across every page. Run it again next week for the new listings.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for homes in one zip code, after export. Addresses, prices and brokers are made up.",
        columns: ["Address", "Price", "Beds", "Baths", "Sq Ft", "Listing Type", "Listed By", "Badges"],
        rows: [
            ["101 Main St, Springfield, IL 62701", "$325,000", "3", "2", "1,640", "House for sale", "Riverside Realty", "Price cut"],
            ["42 Lake Rd, Springfield, IL 62704", "$289,900", "2", "2", "1,210", "Condo for sale", "Northgate Homes", "New"],
            ["7 Oak Ave, Springfield, IL 62702", "$1,450/mo", "2", "1", "980", "Apartment for rent", "Harbor Property Mgmt", ""],
        ],
    },
    fields: {
        heading: "Twelve columns from each listing card",
        intro: "The columns come from the Zillow setup, so they're the same for sales and rentals. A column stays empty when the card doesn't show it.",
        items: [
            { name: "Address and Property URL", description: "The full address and the link to the listing." },
            { name: "Price", description: "The asking price, or the monthly rent for rentals, saved as a number." },
            { name: "Beds, Baths, Sq Ft, Lot Size", description: "The room counts, the living area and the lot size the card shows, as numbers." },
            { name: "Listing Type", description: "House for sale, Condo for sale, Apartment for rent and so on." },
            { name: "Listed By", description: "The brokerage or agent on the card." },
            { name: "Badges", description: "Labels such as New, Price cut, Open house or 3D tour." },
            { name: "Zillow Property ID and Image URL", description: "Zillow's id for the home, handy for matching runs week to week, and the card's main photo." },
        ],
    },
    steps: {
        heading: "Search, pick, collect",
        items: [
            { title: "Search on Zillow", points: ["Example: one zip code, for sale, with your price and beds filters.", "Zillow shows at most 20 pages, about 800 homes, per search."], body: "Search the city, zip code or drawn area with the filters you want: price, beds, home type, for sale or for rent. The extension collects what the list shows." },
            { title: "Pick the list and the pages", points: ["The setup scrolls Zillow's list panel first so every card loads.", "Choose Collect more pages and Next page; if the Next arrow isn't found, click Change and click it yourself."], body: "Open the side panel's List tab and choose the results list; the extension scrolls Zillow's list panel so every card is loaded. Choose Collect more pages and Next page, set Stop after, and click Collect from N pages." },
            { title: "Review and export", points: ["Example to type with the results tab in front: Only address, price, beds, baths and sq ft, under 400000, sorted by price."], body: "Rename or remove columns, filter rows, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Zillow specifics",
        items: [
            "Zillow shows at most 20 pages, about 800 homes, per search. For a large city, search by zip code or price band and collect each.",
            "Sales and rentals use the same columns; rents come through as shown, such as $1,450/mo.",
            "Days on market, price history and the listing agent's contact details aren't on the card, so they aren't collected. The listing page holds some of them; open one and use the Properties tab.",
            "Zillow sometimes asks you to confirm you're human. Do it in the tab and start the collection again.",
            "Zillow's terms restrict automated collection and reuse of its data. Collect for your own research and check the terms before anything else.",
        ],
    },
    emptyWhen: [{"column": "Lot Size", "when": "The card doesn't show it, common for condos and apartments."}, {"column": "Sq Ft", "when": "Not stated on the listing."}, {"column": "Badges", "when": "No New, Price cut, Open house or 3D tour label."}, {"column": "Listed By", "when": "The card shows no brokerage line."}, {"column": "Beds, Baths", "when": "Land listings and some rentals leave them blank."}],
    pushback: ["If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again; what was collected is kept.", "A site that slows down for anyone loading many pages fast shows fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.", "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.", "Zillow often asks you to confirm you're human after many pages. Do it in the tab and start the collection again."],
    screenshots: ["ext/list-tab-zillow", "ext/results-zillow"],
    feature: "list-scraper",
    guide: "export-zillow-listings-to-excel",
    useCase: "real-estate",
    related: ["rightmove"],
    faqs: [
        { q: "Can I get rental listings as well as homes for sale?", a: "Yes. Switch the search to For rent and the same columns fill in, with the monthly rent in Price." },
        { q: "Why does my export have fewer homes than Zillow says?", a: "Zillow's count covers the map area, but the list shows at most 20 pages. Narrow the search, or collect by zip code, to get every home." },
        { q: "Does it collect the agent's phone number?", a: "Not from the search results; the card shows who listed the home, not a phone. Zillow's agent directory pages collect agent name, brokerage, rating, review count and sales, which is a separate list." },
        { q: "Can I get the price history?", a: "No. The results card doesn't show it, and the listing page's price history isn't part of the standard fields." },
        { q: "Why fewer rows than Zillow's count?", a: "Zillow's count covers the map area, but the list shows at most 20 pages. Narrow the search or collect by zip code." },
        { q: "Can I get the agent's phone number?", a: "Not from the results card. Zillow's agent directory pages collect agent name, brokerage, rating, review count and sales as a separate list." },
    ],
};
