import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the rightmove.co.uk pack in configs-prod/ (property cards by
// data-testid, Next page handled) and its column mapping in site-column-mappings/ (Address, Price, Price Qualifier,
// Property Type, Bedrooms, Bathrooms, Description, Added / Reduced, Featured, Tags, Listing Highlight, Marketed By, Agent
// Name, Agent Phone, Agent URL, Property URL, Image URL). Draft until a real run's screenshots are in the visuals library.

export const rightmove: ScraperPageContent = {
    slug: "rightmove",
    category: "real-estate",
    site: { name: "Rightmove", url: "https://www.rightmove.co.uk" },
    meta: {
        title: "Rightmove Scraper: Every Listing in an Area to a Spreadsheet",
        description: "Collect a Rightmove search into a spreadsheet: address, price, property type, bedrooms, bathrooms, the agent and the link, across every page of results, with no code.",
    },
    h1: "Export every Rightmove listing in an area",
    intro: "Search an area on Rightmove, for sale or to rent, pick the results in the side panel, and get one row per property with named columns, across every page. Run it again next week for the new ones.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for two-bedroom flats, after export. Addresses, prices and agents are made up.",
        columns: ["Address", "Price", "Property Type", "Bedrooms", "Bathrooms", "Added / Reduced", "Marketed By", "Agent Phone"],
        rows: [
            ["Harbour Road, Riverside", "£325,000", "Flat", "2", "1", "Added on 18/10/2026", "Riverside Homes, Riverside", "01555 010 221"],
            ["Elm Street, Northgate", "£299,950", "Apartment", "2", "2", "Reduced on 15/10/2026", "Northgate Estates", "01555 019 880"],
            ["Marina Way, Harborview", "£1,450 pcm", "Flat", "2", "1", "Added yesterday", "Harbour Lettings", "01555 014 221"],
        ],
    },
    fields: {
        heading: "Seventeen columns from each property card",
        intro: "The columns come from the Rightmove setup, so they're the same for sales and lettings. A column stays empty when the card doesn't show it.",
        items: [
            { name: "Address and Property URL", description: "The listing's address line and the link to its page." },
            { name: "Price and Price Qualifier", description: "The asking price or monthly rent, and qualifiers such as Offers over or Guide price." },
            { name: "Property Type, Bedrooms, Bathrooms", description: "Flat, house, bungalow and so on, with the room counts as numbers." },
            { name: "Description and Listing Highlight", description: "The card's summary text and any highlighted line." },
            { name: "Added / Reduced", description: "When the listing was added or its price reduced, as Rightmove shows it." },
            { name: "Featured and Tags", description: "Whether the card is a featured listing, and labels such as New home or Retirement." },
            { name: "Marketed By, Agent Name, Agent Phone, Agent URL", description: "The branch marketing it, with its phone number and page." },
            { name: "Image URL", description: "The card's main photo." },
        ],
    },
    steps: {
        heading: "Search, pick, collect",
        items: [
            { title: "Search on Rightmove", body: "Search the area with the filters you want: price, bedrooms, property type, added since. The extension collects what the page shows." },
            { title: "Pick the list and the pages", body: "Open the side panel's List tab, choose the results list, then Collect more pages. The Next button is found on its own; set Stop after and click Collect from N pages." },
            { title: "Review and export", body: "Rename or remove columns, filter rows, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Rightmove specifics",
        items: [
            "Sales and lettings use the same columns; rents come through as shown, such as £1,450 pcm.",
            "Rightmove shows up to 42 pages per search. For a large area, split the search by price band or property type.",
            "The listing page holds more than the card: floor area, council tax band, the full description. Open a listing and use the Properties tab for those.",
            "Days on market and price history aren't on the card, so they aren't collected.",
            "Rightmove's terms restrict automated collection of its data. Collect for your own research and check the terms before reusing anything.",
        ],
    },
    screenshots: ["ext/results-rightmove"],
    feature: "list-scraper",
    guide: "export-zillow-listings-to-excel",
    useCase: "real-estate",
    related: ["zillow"],
    faqs: [
        { q: "Does it collect rentals as well as sales?", a: "Yes. A lettings search gives the same columns, with the monthly rent in Price." },
        { q: "Can I get the floor area and council tax band?", a: "Not from the results page; they're on each listing's own page. Open a listing and click Collect details on this page in the Properties tab." },
        { q: "Can I run the same search every week?", a: "Yes, by running it again: every collection is saved in History with its date, so two exports side by side show what's new. Scheduled runs are coming with the cloud." },
        { q: "Does it work on Zoopla and OnTheMarket too?", a: "Zoopla has a ready-made setup; see the real-estate sites list. Other property sites are detected on the page, with columns named from the page's own labels." },
    ],
};
