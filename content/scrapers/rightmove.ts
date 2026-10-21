import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the rightmove.co.uk pack in configs-prod/ (property cards by
// data-testid, Next page handled) and its column mapping in site-column-mappings/ (Address, Price, Price Qualifier,
// Property Type, Bedrooms, Bathrooms, Description, Added / Reduced, Featured, Tags, Listing Highlight, Marketed By, Agent
// Name, Agent Phone, Agent URL, Property URL, Image URL). Draft until a real run's screenshots are in the visuals library.
// Title and headings target search phrases ("scrape rightmove", "rightmove listings to excel"), 2026-10-21.

export const rightmove: ScraperPageContent = {
    slug: "rightmove",
    category: "real-estate",
    site: { name: "Rightmove", url: "https://www.rightmove.co.uk" },
    meta: {
        title: "How to Scrape Rightmove Listings into a Spreadsheet, Free",
        description: "Search an area on Rightmove and get every property as a row: address, price, type, bedrooms, bathrooms, the agent and its phone, across every page. Free, no code.",
    },
    h1: "How to scrape Rightmove listings into a spreadsheet",
    intro: "Search an area on Rightmove, for sale or to rent. Pick the results in the side panel and get one row per property, across every page. Free Chrome extension, no code.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for two-bedroom flats, after export. Addresses, prices and agents are made up.",
        columns: ["Address", "Price", "Property Type", "Bedrooms", "Agent Phone"],
        rows: [
            ["Harbour Road, Riverside", "£325,000", "Flat", "2", "01555 010 221"],
            ["Elm Street, Northgate", "£299,950", "Apartment", "2", "01555 019 880"],
            ["Marina Way, Harborview", "£1,450 pcm", "Flat", "2", "01555 014 221"],
        ],
    },
    fields: {
        heading: "What you get for every property",
        intro: "The columns are the same for sales and lettings, and a column stays empty when the card doesn't show it.",
        items: [
            { name: "Address and Property URL", description: "The address line and the link to the listing." },
            { name: "Price and Price Qualifier", description: "The asking price or monthly rent, and wording such as Offers over or Guide price." },
            { name: "Property Type, Bedrooms, Bathrooms", description: "Flat, house, bungalow and so on, with room counts as numbers." },
            { name: "Description and Listing Highlight", description: "The card's summary text and any highlighted line." },
            { name: "Added / Reduced", description: "When the listing was added or reduced, as Rightmove shows it." },
            { name: "Featured and Tags", description: "Whether the card is featured, and labels such as New home or Retirement." },
            { name: "Marketed By, Agent Name, Agent Phone, Agent URL", description: "The branch marketing it, with its phone number and page." },
            { name: "Image URL", description: "The card's main photo." },
        ],
    },
    steps: {
        heading: "How to scrape Rightmove in three steps",
        items: [
            {
                title: "Search on Rightmove",
                body: "Search the area with the filters you want: price, bedrooms, property type, added since. The extension collects what the page shows.",
                points: ["Example: two-bedroom flats in one town, for sale or to rent.", "Rightmove shows up to 42 pages per search."],
            },
            {
                title: "Pick the list and the pages",
                body: "Click the Web Scraper Pro icon and open the List tab. Choose the results list, then Collect more pages. The Next button is found on its own; set Stop after and click Collect.",
                points: ["Set Stop after to the number of pages you want. Five pages is a good first run."],
            },
            {
                title: "Review and export",
                body: "Rename or remove columns and filter rows. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only address, price, bedrooms and property type, sorted by price."],
            },
        ],
    },
    notes: {
        heading: "Good to know about Rightmove",
        items: [
            "Sales and lettings use the same columns. Rents come through as shown, such as £1,450 pcm.",
            "Rightmove shows up to 42 pages per search. For a large area, split the search by price band or property type.",
            "The listing page holds more than the card: floor area, council tax band, the full description. Open a listing and use the Properties tab for those.",
            "Days on market and price history aren't on the card, so they aren't collected.",
            "Rightmove's terms restrict automated collection of its data. Collect for your own research and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [
        { column: "Price Qualifier", when: "No Offers over, Guide price or similar wording." },
        { column: "Added / Reduced", when: "The card shows no date line." },
        { column: "Featured, Tags", when: "No featured flag or labels such as New home." },
        { column: "Agent Phone", when: "The branch shows no phone on the card." },
        { column: "Bathrooms", when: "Not stated on the listing." },
    ],
    pushback: [
        "If Rightmove shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again. What was collected is kept.",
        "After many pages, Rightmove may show fewer results or an error page. Collect in smaller runs and come back later. History keeps each run.",
        "When Rightmove changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    screenshots: ["ext/results-rightmove"],
    feature: "list-scraper",
    guide: "export-zillow-listings-to-excel",
    useCase: "real-estate",
    related: ["zillow"],
    faqs: [
        { q: "Is this Rightmove scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Does it collect rentals as well as sales?", a: "Yes. A lettings search gives the same columns, with the monthly rent in Price." },
        { q: "Can I get the floor area and council tax band?", a: "Not from the results page; they're on each listing's own page. Open a listing and click Collect details on this page in the Properties tab." },
        { q: "Does it collect the agent's phone number?", a: "Yes. The branch's phone number and page are on the card, so Agent Phone and Agent URL fill in for most listings." },
        { q: "Can I run the same Rightmove search every week?", a: "Yes, by running it again. Every collection is saved in History with its date, so two exports side by side show what's new. Scheduled runs are coming with the cloud." },
        { q: "Does it work on Zoopla and OnTheMarket too?", a: "Zoopla has a ready-made setup; see the real-estate sites list. Other property sites are detected on the page, with columns named from the page's own labels." },
        { q: "Is scraping Rightmove allowed?", a: "Rightmove's terms restrict automated collection of its data. Collect what you can see, for your own research, and read the terms before reusing anything. This isn't legal advice." },
    ],
};
