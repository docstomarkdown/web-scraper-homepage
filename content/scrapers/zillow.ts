import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the zillow.com pack in configs-prod/ (search-result cards; the hook in
// lib/platform/hooks/zillow.ts scrolls the list panel so every card renders before collecting) and its column mapping
// (Address, Price, Beds, Baths, Sq Ft, Lot Size, Listing Type, Listed By, Badges, Property URL, Zillow Property ID, Image
// URL; agent-directory columns on agent pages). Paging on Zillow uses the generic Next-page detection, not the pack:
// verify on a real run before publishing and adjust step 2 if the Next arrow needs pointing at. Draft until then.
// Title and headings target search phrases ("how to scrape zillow data", "scrape zillow listings"), 2026-10-21.

// Verify on a real run before publishing (added with the deeper sections, 2026-10-21): rows per zip-code page (about 40 per page is assumed in the worked example), run time for 5 pages, and whether a bulk run over Property URL reads a listing page's price history.

// Verify on a real run: the agent directory's columns (configs-prod/site-column-mappings/zillow.com.json names Agent Name,
// Brokerage, Rating, Review Count, Price Range and Sales Last 12 Months) before the "Agent and owner contact fields" section publishes.

export const zillow: ScraperPageContent = {
    slug: "zillow",
    category: "real-estate",
    site: { name: "Zillow", url: "https://www.zillow.com" },
    meta: {
        title: "How to Scrape Zillow Listings to Excel, Free, No Code",
        description: "Search a city or zip code on Zillow and get every listing as a row: address, price, beds, baths, square feet, who listed it and the link, across every page. Free, no code.",
    },
    h1: "How to scrape Zillow listings to Excel",
    intro: "Search a city or zip code on Zillow, for sale or for rent. Pick the results in the side panel and get one row per home, across every page. Free Chrome extension, no code.",
    allowed: "Zillow's terms restrict automated collection, and listing data belongs to Zillow and the agents and MLSs that supply it. This page reads the search results you have open, in your own browser, at a person's pace, for your own area research; don't republish the listings. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for homes in one zip code, after export. Addresses, prices and brokers are made up.",
        columns: ["Address", "Price", "Beds", "Baths", "Sq Ft"],
        rows: [
            ["101 Main St, Springfield, IL 62701", "$325,000", "3", "2", "1,640"],
            ["42 Lake Rd, Springfield, IL 62704", "$289,900", "2", "2", "1,210"],
            ["7 Oak Ave, Springfield, IL 62702", "$1,450/mo", "2", "1", "980"],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "The columns are the same for sales and rentals, and a column stays empty when the card doesn't show it.",
        items: [
            { name: "Address and Property URL", description: "The full address and the link to the listing." },
            { name: "Price", description: "The asking price, or the monthly rent, as a number." },
            { name: "Beds, Baths, Sq Ft, Lot Size", description: "Room counts, living area and lot size, as numbers." },
            { name: "Listing Type", description: "House for sale, Condo for sale, Apartment for rent and so on." },
            { name: "Listed By", description: "The brokerage or agent on the card." },
            { name: "Badges", description: "Labels such as New, Price cut, Open house or 3D tour." },
            { name: "Zillow Property ID and Image URL", description: "Zillow's id for the home, for matching runs week to week, and the main photo." },
        ],
    },
    steps: {
        heading: "How to scrape Zillow in three steps",
        items: [
            {
                title: "Search on Zillow",
                body: "Search the city, zip code or drawn area with the filters you want: price, beds, home type, for sale or for rent. The extension collects what the list shows.",
                points: ["Example: one zip code, for sale, with your price and beds filters.", "Zillow shows at most 20 pages, about 800 homes, per search."],
            },
            {
                title: "Pick the list and the pages",
                body: "Click the Web Scraper Pro icon and open the List tab. Choose the results list; the extension scrolls Zillow's list panel so every card loads. Choose Collect more pages and Next page, set Stop after, and click Collect.",
                points: ["If the Next arrow isn't found, click Change and click the arrow yourself."],
            },
            {
                title: "Review and export",
                body: "Rename or remove columns and filter rows. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only address, price, beds, baths and sq ft, under 400000, sorted by price."],
            },
        ],
    },
    notes: {
        heading: "Good to know about Zillow",
        items: [
            "Zillow shows at most 20 pages, about 800 homes, per search. For a large city, search by zip code or price band.",
            "Sales and rentals use the same columns. Rents come through as shown, such as $1,450/mo.",
            "Days on market, price history and the agent's contact details aren't on the card. Open a listing and use the Properties tab for what its page shows.",
            "Zillow sometimes asks you to confirm you're human. Do it in the tab and start the collection again.",
            "Zillow's terms restrict automated collection and reuse of its data. Collect for your own research and check the terms first.",
        ],
    },
    emptyWhen: [
        { column: "Lot Size", when: "The card doesn't show it. Common for condos and apartments." },
        { column: "Sq Ft", when: "Not stated on the listing." },
        { column: "Badges", when: "No New, Price cut, Open house or 3D tour label." },
        { column: "Listed By", when: "The card shows no brokerage line." },
        { column: "Beds, Baths", when: "Land listings and some rentals leave them blank." },
    ],
    pushback: [
        "If Zillow shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again. What was collected is kept.",
        "After many pages, Zillow may show fewer results or an error page. Collect in smaller runs and come back later. History keeps each run.",
        "When Zillow changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three Zillow searches worth running",
            paragraphs: ["Each search below is one run of a few minutes. Set the filters on Zillow first, because the extension collects what the list shows."],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["One zip code, for sale, your price band", "The buyer's shortlist, or an agent's weekly new-listings sheet.", "Address, Price, Beds, Baths, Sq Ft, Badges, Property URL"],
                    ["A city, for rent, 2+ beds", "A landlord or investor comparing asking rents by neighbourhood.", "Address, Price, Beds, Sq Ft, Listed By, Property URL"],
                    ["One zip code, for sale, sorted by Newest", "Catching price cuts and new listings before the weekend.", "Address, Price, Badges, Listed By, Zillow Property ID"],
                ],
                caption: "Zillow shows at most 20 pages per search, so a zip code or a price band gives a complete list where a whole city doesn't.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "A zip code, for sale, under $400,000, start to finish",
            paragraphs: ["This is the run a first-time buyer or a solo agent does on a Saturday morning. The numbers are what the steps give you; the exact row count depends on the zip code."],
            steps: [
                { title: "Search.", body: "Type the zip code on Zillow, choose For sale, set Price to a maximum of $400,000 and Beds to 2+. The list panel shows the count at the top." },
                { title: "Pick the list.", body: "Open the List tab, choose the results list, and watch the extension scroll the list panel so every card renders." },
                { title: "Set the pages.", body: "Choose Collect more pages and Next page, set Stop after to All pages, and click Collect. A zip code with 5 pages gives about 200 rows." },
                { title: "Trim and export.", body: "Hide Lot Size and Image URL, sort by Price, and click Export as, then Excel. Open it in a sheet with Address frozen as the first column." },
            ],
        },
        {
            id: "what-to-do",
            eyebrow: "After the run",
            heading: "What to do with the Zillow table",
            paragraphs: ["The results page does the first pass, so the sheet you export is already the sheet you wanted."],
            points: [
                "Filter rows to keep homes under your budget, or with a Price cut badge, before you export.",
                "Click the Price header to sort, and the Sq Ft header to find the most space for the money.",
                "Run the same search next week and match on Zillow Property ID in your sheet: rows that are new are new listings, rows that vanished sold or went off market.",
                "Collect several zip codes in their own tabs and type in chat: Combine the lists in this conversation into one table.",
                "Export to Google Sheets to share the shortlist with a partner or a client.",
            ],
        },
        {
            id: "shows",
            eyebrow: "Limits",
            heading: "What Zillow shows, and what it doesn't",
            paragraphs: [
                "The card is the source. Price, beds, baths, square feet, lot size, listing type, the broker line and the badges are on it, so they come through. Days on market, price history, the agent's phone and the Zestimate are on the listing page, not the card.",
                "For those, open a listing and use the Properties tab, which reads what that page shows. For a full list of homes with their price history you'd open each listing in turn through a bulk run over the Property URL column.",
            ],
            table: {
                columns: ["You want", "Where it is", "How"],
                rows: [
                    ["Price, beds, baths, sq ft, badges", "The results card", "This page's steps"],
                    ["Days on market, price history, agent phone", "The listing page", "Properties tab on one listing, or a bulk run over Property URL"],
                    ["Agent name, brokerage, rating, sales", "Zillow's agent directory", "Open the directory and pick its list in the List tab"],
                    ["Every home in a city", "More than 20 pages", "Split by zip code or price band and combine in chat"],
                ],
            },
        },
        {
            id: "agents",
            eyebrow: "Contacts",
            heading: "Agent and owner contact fields",
            paragraphs: [
                "A results card names who listed the home in Listed By and shows no phone or email, so a list of homes never carries the agent's contact details. Zillow's agent directory is a list too, and its setup names Agent Name, Agent Profile URL, Agent Type, Brokerage, Rating, Review Count, Price Range and Sales Last 12 Months: open the directory for your area, pick its list in the List tab, and check the first page's columns before a long run.",
                "Owners' contact details aren't collected at all. A for-sale-by-owner card shows the same fields as any other, and the extension collects businesses' published details, not people's. For an agent's phone, open the profile and read what that page shows.",
            ],
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with Zillow's own saved searches",
            paragraphs: ["A Zillow saved search emails you new listings one at a time, which is fine for one buyer and useless for a sheet. The table below is the honest comparison for someone who wants every home in one place."],
            table: {
                columns: ["", "Saved search on Zillow", "Web Scraper Pro"],
                rows: [
                    ["What you get", "An email per new listing", "Every listing as a row, with the columns above"],
                    ["Sorting and filtering", "On Zillow, one search at a time", "In your sheet, across searches and weeks"],
                    ["Effort", "Set once, read emails", "A few clicks per run, a few minutes per search"],
                ],
            },
        },
    ],
    screenshots: ["ext/list-tab-zillow", "ext/results-zillow"],
    feature: "list-scraper",
    guide: "export-zillow-listings-to-excel",
    useCase: "real-estate",
    related: ["rightmove"],
    faqs: [
        { q: "Is this Zillow scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "How do I scrape Zillow listings without coding?", a: "Search on Zillow, open the side panel's List tab, pick the results list, choose Collect more pages and click Collect. The columns come out named, and Export as gives you Excel, CSV, JSON or Google Sheets." },
        { q: "Can I scrape Zillow rentals as well as homes for sale?", a: "Yes. Switch the search to For rent and the same columns fill in, with the monthly rent in Price." },
        { q: "Why does my export have fewer homes than Zillow says?", a: "Zillow's count covers the map area, but the list shows at most 20 pages. Narrow the search, or collect by zip code, to get every home." },
        { q: "Does it collect the agent's phone number?", a: "Not from the search results; the card shows who listed the home, not a phone. Zillow's agent directory pages collect agent name, brokerage, rating, review count and sales as a separate list." },
        { q: "Can I get the price history or days on market?", a: "Not from the results card. Open a listing and use the Properties tab for what its page shows, or run Bulk scrape over the Property URL column to open each listing in turn." },
        { q: "Can I run the same Zillow search every week?", a: "Yes, by running it again. Every collection is saved in History with its date, and Zillow Property ID is the same across runs, so two exports side by side show what's new. Scheduled runs are coming with the cloud." },
        { q: "Does it work on Redfin and Realtor.com too?", a: "They're detected as lists without a ready-made setup, so the columns are named from the page. Try a small run first and check the columns before a long one." },
        { q: "Is scraping Zillow allowed?", a: "Zillow's terms restrict automated collection and reuse of its data. Collect what you can see, for your own research, and read the terms before reusing anything. Our plain-words explainer on web scraping and the law covers the rest; it isn't legal advice." },
    ],
};
