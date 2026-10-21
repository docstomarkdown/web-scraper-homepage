import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Maria, real estate professional or investor (docs/personas.md). Facts checked against release 1.3.0 on
// 2026-10-21: the zillow.com, rightmove.co.uk, redfin.com, zoopla.co.uk and propertyfinder.ae packs in configs-prod/ and
// their column mappings; results page filters and exports (entrypoints/dataviewer/). Never imply days on market, price
// history, agent contact details or MLS data: none of them come from a results card. Draft until the screenshots exist.

export const realEstate: UseCasePageContent = {
    page: getPage("real-estate", "use-case"),
    meta: {
        title: "Real Estate: Every Listing in an Area, in a Spreadsheet",
        description: "Export homes for sale or rent from Zillow, Rightmove, Redfin, Zoopla and Property Finder into one sheet: price, address, beds, baths, size, type and link, for every page of results, every week.",
    },
    h1: "Every listing in an area, in a spreadsheet",
    intro: "Search a zip code or an area on your listing site, click once, and get one row per home with price, address, beds, baths, size and link, across every page of results. Run it again next week and compare.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The area's inventory, without copying it by hand",
        paragraphs: [
            "You're sizing up a new area, keeping a weekly list of new listings or rentals, or pulling the comparables for a report, and the data services are priced for big firms. The listings are all on the public sites; they're just spread over twenty pages of cards.",
            "Web Scraper Pro turns a search on Zillow, Rightmove, Redfin, Zoopla or Property Finder into one table with the same columns every time, in your own browser. Next week's run is the same click, and History keeps both so you can see what changed.",
        ],
    },
    workflow: {
        heading: "From a search to this week's sheet",
        steps: [
            { title: "Search the area with your filters", body: "On the listing site, search the zip code, town or drawn area and set the filters: price, beds, home type, for sale or for rent. The extension collects what the list shows, so the filters do the narrowing.", feature: "list-scraper" },
            { title: "Collect every page", body: "Open the side panel's List tab, pick the results list, choose Collect more pages and Next page, set Stop after, and click Collect from N pages. One row per home arrives with Address, Price, Beds, Baths, Sq Ft and the link as named columns.", feature: "list-scraper", screenshot: "ext/results-zillow" },
            { title: "Keep what the report needs", body: "On the results page, remove the columns you don't want and filter rows, such as 3+ beds under $400,000. Or type it in the Chat tab with the results tab in front: \"only address, price, beds, baths and sq ft, under 400000, sorted by price\".", feature: "export-to-google-sheets", screenshot: "ext/results-arranged" },
            { title: "Export", body: "Export as Google Sheets for a shared sheet, Excel for a report, or CSV for your own tools. Prices and sizes are saved as numbers, so price per square foot is one formula away.", feature: "export-to-google-sheets", screenshot: "ext/results-export-menu" },
            { title: "Repeat next week", body: "Run the same search again. Each collection is saved in History with its date; the Zillow Property ID or the listing link lets you match rows and spot the new and the reduced ones.", feature: "export-to-google-sheets" },
        ],
    },
    sample: {
        caption: "Three rows from a zip-code search. Addresses, prices and brokers are made up.",
        columns: ["Address", "Price", "Beds", "Baths", "Sq Ft", "Listing Type", "Listed By"],
        rows: [
            ["101 Main St, Springfield, IL 62701", "325,000", "3", "2", "1,640", "House for sale", "Riverside Realty"],
            ["42 Lake Rd, Springfield, IL 62704", "289,900", "2", "2", "1,210", "Condo for sale", "Northgate Homes"],
            ["7 Oak Ave, Springfield, IL 62702", "1,450", "2", "1", "980", "Apartment for rent", "Harbor Property Mgmt"],
        ],
    },
    sites: [{ name: "Zillow", page: "zillow" }, { name: "Rightmove", page: "rightmove" }, { name: "Redfin" }, { name: "Zoopla" }, { name: "Property Finder" }, { name: "Any listing site with a results list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Give you days on market, price history or the listing agent's phone number. A results card doesn't show them, so they aren't collected; some are on the listing page, which the Properties tab reads one home at a time.",
            "Reach private MLS data. It collects what the public site shows you, or what you can see once you're signed in to a site that lets you export.",
            "Watch an area and email you the new listings. Scheduled runs are coming with the cloud; today you run it when you want fresh rows.",
            "Settle whether you may reuse the data. Listing sites' terms restrict automated collection; collect for your own research and check them first.",
        ],
    },
    guides: ["export-zillow-listings-to-excel", "collect-every-page-of-results", "scrape-data-from-any-website-to-excel"],
    faqs: [
        { q: "Which listing sites have a ready-made setup?", a: "Zillow, Rightmove, Redfin, Zoopla and Property Finder come with named columns. On other sites the results list is detected on the page and the columns are named from its labels." },
        { q: "How many listings can one search give me?", a: "As many as the site shows: Zillow lists up to 20 pages, about 800 homes; Rightmove up to 42 pages. For more, split the search by zip code or price band and collect each." },
        { q: "Can I get rentals?", a: "Yes. Switch the search to rentals and the same columns fill in, with the monthly rent in the Price column." },
        { q: "Does it work on a site I sign in to, like an MLS?", a: "It can read what you see once you're signed in, because it runs in your own browser. Whether you may export it is set by that system's rules; check them first." },
    ],
};
