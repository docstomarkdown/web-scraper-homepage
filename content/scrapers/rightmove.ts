import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the rightmove.co.uk pack in configs-prod/ (property cards by
// data-testid, Next page handled) and its column mapping in site-column-mappings/ (Address, Price, Price Qualifier,
// Property Type, Bedrooms, Bathrooms, Description, Added / Reduced, Featured, Tags, Listing Highlight, Marketed By, Agent
// Name, Agent Phone, Agent URL, Property URL, Image URL). Draft until a real run's screenshots are in the visuals library.
// Title and headings target search phrases ("scrape rightmove", "rightmove listings to excel"), 2026-10-21.

// Verify on a real run before publishing (added with the deeper sections, 2026-10-21): properties per page (about 24, so 5 pages is about 120, is assumed), and whether a bulk run over Property URL reads a listing page's floor area and council tax band.
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
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three Rightmove searches worth running",
            paragraphs: ["Each search is one run. Set the filters on Rightmove first, because the extension collects what the results page shows."],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["One town, for sale, 2 bedrooms, your price band", "A buyer's shortlist, or an agent's view of what the competition is marketing.", "Address, Price, Price Qualifier, Property Type, Agent Name, Property URL"],
                    ["One area, to rent, added in the last 7 days", "A landlord checking asking rents, or a relocating tenant.", "Address, Price, Bedrooms, Added / Reduced, Agent Phone, Property URL"],
                    ["A postcode district, for sale, sorted by Newest", "Reductions and new instructions before the weekend viewings.", "Address, Price, Added / Reduced, Tags, Marketed By"],
                ],
                caption: "Rightmove shows up to 42 pages per search. Split a city by price band or property type to stay under it.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "Two-bedroom flats in one town, start to finish",
            paragraphs: ["This is the run a buyer, a lettings negotiator or a surveyor does in a few minutes. The row count depends on the town."],
            steps: [
                { title: "Search.", body: "Type the town on Rightmove, choose For sale, set Property type to Flats and Bedrooms to 2, and set your price range." },
                { title: "Pick the list.", body: "Open the List tab and choose the results list. The Next button is found on its own." },
                { title: "Set the pages.", body: "Choose Collect more pages, set Stop after to 5 pages for a first run, and click Collect. Five pages is about 120 properties." },
                { title: "Trim and export.", body: "Hide Image URL and Description, sort by Price, and click Export as, then Excel. Keep Agent Phone if you'll be calling branches." },
            ],
        },
        {
            id: "what-to-do",
            eyebrow: "After the run",
            heading: "What to do with the Rightmove table",
            paragraphs: ["Do the first pass on the results page and the sheet you export is the sheet you wanted."],
            points: [
                "Filter rows on Added / Reduced to keep this week's listings, or on Tags to drop retirement and shared-ownership homes.",
                "Sort by Price, then look at Price Qualifier: Offers over and Guide price rows behave differently at viewing.",
                "Run the same search next week and match on Property URL: rows that are new are new instructions, rows that vanished were sold or withdrawn.",
                "Group by Marketed By in your sheet to see which branches hold the stock in that town.",
                "Export to Google Sheets to share the shortlist, or CSV for your own tools.",
            ],
        },
        {
            id: "shows",
            eyebrow: "Limits",
            heading: "What Rightmove shows, and what it doesn't",
            paragraphs: [
                "The results card carries the address line, price and qualifier, type, bedrooms, bathrooms, the summary, the added or reduced date, tags, and the branch with its phone. Floor area, council tax band, the full description, the floor plan and the EPC are on the listing page.",
                "For those, open a listing and click Collect details on this page in the Properties tab. To do it for every property in a search, run Bulk scrape over the Property URL column of your saved table.",
            ],
            table: {
                columns: ["You want", "Where it is", "How"],
                rows: [
                    ["Price, type, bedrooms, agent phone", "The results card", "This page's steps"],
                    ["Floor area, council tax band, full description", "The listing page", "Properties tab on one listing, or a bulk run over Property URL"],
                    ["Every property in a city", "More than 42 pages", "Split by price band or type and combine in chat"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with Rightmove's own alerts",
            paragraphs: ["A Rightmove alert emails you each new property, which suits one buyer and not a sheet. For a list you can sort, filter and compare week to week, the table is the honest comparison."],
            table: {
                columns: ["", "Rightmove alerts", "Web Scraper Pro"],
                rows: [
                    ["What you get", "An email per new property", "Every property as a row, with the columns above"],
                    ["Sorting and filtering", "On Rightmove, one search at a time", "In your sheet, across searches and weeks"],
                    ["Effort", "Set once, read emails", "A few clicks per run, a few minutes per search"],
                ],
            },
        },
    ],
    screenshots: ["ext/results-rightmove"],
    feature: "list-scraper",
    guide: "export-zillow-listings-to-excel",
    useCase: "real-estate",
    related: ["zillow"],
    faqs: [
        { q: "Is this Rightmove scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "How do I scrape Rightmove listings without coding?", a: "Search on Rightmove, open the side panel's List tab, pick the results list, choose Collect more pages and click Collect. The columns come out named, and Export as gives you Excel, CSV, JSON or Google Sheets." },
        { q: "Does it collect rentals as well as sales?", a: "Yes. A lettings search gives the same columns, with the monthly rent in Price." },
        { q: "Can I get the floor area and council tax band?", a: "Not from the results page; they're on each listing's own page. Open a listing and click Collect details on this page in the Properties tab, or run Bulk scrape over the Property URL column." },
        { q: "Does it collect the agent's phone number?", a: "Yes. The branch's phone number and page are on the card, so Agent Phone and Agent URL fill in for most listings." },
        { q: "Why does my export stop at 42 pages?", a: "Rightmove shows up to 42 pages per search. Split the search by price band or property type and combine the runs in chat." },
        { q: "Can I run the same Rightmove search every week?", a: "Yes, by running it again. Every collection is saved in History with its date, so two exports side by side show what's new. Scheduled runs are coming with the cloud." },
        { q: "Does it work on Zoopla and OnTheMarket too?", a: "Zoopla has a ready-made setup; see the real-estate sites list. Other property sites are detected on the page, with columns named from the page's own labels." },
        { q: "Is scraping Rightmove allowed?", a: "Rightmove's terms restrict automated collection of its data. Collect what you can see, for your own research, and read the terms before reusing anything. Our plain-words explainer on web scraping and the law covers the rest; it isn't legal advice." },
    ],
};
