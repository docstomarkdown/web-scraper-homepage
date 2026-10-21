import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the ebay.com pack in configs-prod/ (search and browse cards, Next page)
// and its column mapping (Product Name, Price, Price With Coupon, Shipping, Condition, Purchase Format, Bids, Time Left,
// Auction Ends, Sold, Watchers, Seller, Seller Feedback Count, Seller Positive Feedback, Item Location, Returns, Rating,
// Rating Count, Stock, Promotion, Listing Badge, Specifications, Other Info, Item ID, Product URL, Image URL).
// Draft until a real run's screenshots are in the visuals library.
// Title targets search phrases (2026-10-21): "how to scrape ebay product data", "scrape ebay listings"; the seller and
// sold columns are what sets this setup apart.

export const ebay: ScraperPageContent = {
    slug: "ebay",
    category: "online-stores",
    site: { name: "eBay", url: "https://www.ebay.com" },
    meta: {
        title: "How to Scrape eBay Listings to Excel, with Seller and Sold Counts",
        description: "Run a search on eBay and get every listing as a row: price, shipping, condition, auction or Buy It Now, bids, sold count, seller and feedback, across every page. Free Chrome extension, no code.",
    },
    h1: "How to scrape eBay listings to Excel, with seller and auction columns",
    intro: "Run a search on eBay, pick the list in the side panel, and set how many pages. You get one row per listing with price, condition, seller, bids and sold count as named columns. Sort a whole category by price or by what sells.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for vintage film cameras, after export. Listings and sellers are made up.",
        columns: ["Product Name", "Price", "Condition", "Sold", "Seller"],
        rows: [
            ["Ridge 35mm Rangefinder, serviced", "189.00", "Used", "12 sold", "harborcameras"],
            ["Summit SLR body with 50mm lens", "145.50", "Used", "", "northgate_photo"],
            ["Bluebird Instant Camera, boxed", "72.00", "Open box", "38 sold", "riversidegear"],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "Up to twenty-six columns come from the eBay setup. A column the search never shows stays out, and prices, bids and counts are saved as numbers.",
        items: [
            { name: "Product Name, Product URL, Item ID", description: "The title, the link and eBay's item number." },
            { name: "Price, Price With Coupon, Shipping", description: "The price, the price after a shown coupon, and the shipping line." },
            { name: "Condition, Purchase Format", description: "New, Used or Open box, and whether it's an auction, Buy It Now or best offer." },
            { name: "Bids, Time Left, Auction Ends", description: "For auctions: the bid count and when it ends." },
            { name: "Sold, Watchers, Stock", description: "The sold count, how many are watching, and stock notes when shown." },
            { name: "Seller, Seller Feedback Count, Seller Positive Feedback", description: "Who's selling, with their feedback count and percentage." },
            { name: "Item Location, Returns, Promotion, Listing Badge", description: "Where it ships from, the returns line, promotions and labels such as Top Rated." },
            { name: "Rating, Rating Count, Specifications, Other Info", description: "Product ratings where the card shows them, and the extra lines on the card." },
            { name: "Image URL", description: "The listing's main photo." },
        ],
    },
    steps: {
        heading: "How to scrape an eBay search in three steps",
        items: [
            {
                title: "Search on eBay",
                body: "Search and filter as you normally would: condition, Buy It Now or auction, price, item location. The extension collects what the page shows.",
                points: [
                    "Example: vintage film camera, filtered to Sold items to price a lot.",
                    "Sponsored rows are kept and marked. Settings → Results → Skip sponsored products leaves them out.",
                ],
            },
            {
                title: "Pick the list and the pages",
                body: "Open the side panel's List tab and choose the results list. Choose Collect more pages; the Next button is found on its own. Set Stop after and click Collect from 5 pages, or the number you set.",
                points: ["Keep the tab in front. The tab title counts the listings."],
            },
            {
                title: "Review and export",
                body: "Sort by Sold or Price and remove the columns you don't need. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only name, price, sold and seller, sorted by sold."],
            },
        ],
    },
    notes: {
        heading: "Good to know about eBay",
        items: [
            "The Sold column is the card's \"N sold\" line. It's the quickest sign of what moves.",
            "Auction rows carry Bids and Time Left; Buy It Now rows leave them empty. Filter on Purchase Format to separate them.",
            "eBay's country sites (.co.uk, .de, .com.au) are detected as lists without the named setup. Check their columns on the first page.",
            "eBay's terms restrict automated collection. Collect for your own research, such as pricing a lot, and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [
        { column: "Bids, Time Left, Auction Ends", when: "The listing is Buy It Now, not an auction." },
        { column: "Sold", when: "The listing shows no \"N sold\" line yet." },
        { column: "Watchers", when: "eBay shows watchers on some listings only." },
        { column: "Price With Coupon", when: "No coupon on the listing." },
        { column: "Rating, Rating Count", when: "Product ratings appear on catalogue-matched listings only." },
        { column: "Returns, Item Location", when: "Not shown on every card." },
    ],
    pushback: [
        "If eBay shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again. What was collected is kept.",
        "Loading many pages fast can bring fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.",
        "When eBay changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
        "Sold-items searches page like any other. A very long sold history is capped by eBay itself.",
    ],
    screenshots: ["ext/results-ebay"],
    feature: "list-scraper",
    guide: "collect-store-listings-to-excel",
    useCase: "ecommerce",
    related: ["etsy", "walmart", "amazon"],
    faqs: [
        { q: "Is this eBay scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Can I scrape eBay sold listings for pricing?", a: "Yes. Filter the search to Sold items on eBay, then collect. The Price column holds the sold prices, and Auction Ends the sale dates where shown." },
        { q: "Can I scrape a seller's whole eBay store?", a: "Yes. A seller's items page is a list like any other. Pick it in the List tab and collect every page." },
        { q: "Why is the price a range on some rows?", a: "Listings with variations show a range on the card, and the extension keeps what the card shows. Open the listing and use the Properties tab for one variation's price." },
        { q: "Why do some rows have no bids or time left?", a: "Those listings are Buy It Now. Bids, Time Left and Auction Ends fill in for auctions only." },
        { q: "Can I scrape several eBay searches at once?", a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings." },
        { q: "Will eBay block me?", a: "The run happens in your own browser at a person's pace, so eBay sees you browsing. If it shows a check, complete it in the tab and carry on." },
    ],
};
