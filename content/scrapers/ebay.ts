import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the ebay.com pack in configs-prod/ (search and browse cards, Next page)
// and its column mapping (Product Name, Price, Price With Coupon, Shipping, Condition, Purchase Format, Bids, Time Left,
// Auction Ends, Sold, Watchers, Seller, Seller Feedback Count, Seller Positive Feedback, Item Location, Returns, Rating,
// Rating Count, Stock, Promotion, Listing Badge, Specifications, Other Info, Item ID, Product URL, Image URL).
// Draft until a real run's screenshots are in the visuals library.

export const ebay: ScraperPageContent = {
    slug: "ebay",
    category: "online-stores",
    site: { name: "eBay", url: "https://www.ebay.com" },
    meta: {
        title: "eBay Scraper: Search Results to a Spreadsheet, with Seller and Auction Columns",
        description: "Collect an eBay search into a spreadsheet: product name, price, shipping, condition, auction or Buy It Now, bids, time left, sold count, seller and feedback, across every page, with no code.",
    },
    h1: "Collect eBay search results into a spreadsheet",
    intro: "Run a search on eBay, pick the list in the side panel, set how many pages, and get one row per listing with price, condition, seller, bids and sold counts as named columns. Sort a whole category by price or by what's selling.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for vintage film cameras, after export. Listings and sellers are made up.",
        columns: ["Product Name", "Price", "Shipping", "Condition", "Purchase Format", "Sold", "Seller", "Seller Positive Feedback"],
        rows: [
            ["Ridge 35mm Rangefinder, serviced", "189.00", "Free shipping", "Used", "Buy It Now", "12 sold", "harborcameras", "99.6%"],
            ["Summit SLR body with 50mm lens", "145.50", "+12.00", "Used", "Auction, 5 bids", "", "northgate_photo", "100%"],
            ["Bluebird Instant Camera, boxed", "72.00", "Free shipping", "Open box", "Buy It Now", "38 sold", "riversidegear", "98.9%"],
        ],
    },
    fields: {
        heading: "Up to twenty-six columns from each listing card",
        intro: "The columns come from the eBay setup. A column the search never shows stays out; prices, bids and counts are saved as numbers.",
        items: [
            { name: "Product Name, Product URL, Item ID", description: "The listing's title, link and eBay item number." },
            { name: "Price, Price With Coupon, Shipping", description: "The price, the price after a shown coupon, and the shipping line." },
            { name: "Condition, Purchase Format", description: "New, Used, Open box and so on, and whether it's an auction, Buy It Now or best offer." },
            { name: "Bids, Time Left, Auction Ends", description: "For auctions: the bid count and when it ends." },
            { name: "Sold, Watchers, Stock", description: "The sold count, how many are watching, and stock notes when shown." },
            { name: "Seller, Seller Feedback Count, Seller Positive Feedback", description: "Who's selling, with their feedback count and percentage." },
            { name: "Item Location, Returns, Promotion, Listing Badge", description: "Where it ships from, the returns line, promotions and labels such as Top Rated." },
            { name: "Rating, Rating Count, Specifications, Other Info", description: "Product ratings where the card shows them, and the extra lines on the card." },
            { name: "Image URL", description: "The listing's main photo." },
        ],
    },
    steps: {
        heading: "Search, pick, collect",
        items: [
            { title: "Search on eBay", points: ["Example: vintage film camera, filtered to Buy It Now or to Sold items for pricing.", "Sponsored rows are kept and marked; Settings → Results → Skip sponsored products leaves them out."], body: "Search and filter as you normally would: condition, Buy It Now or auction, price, item location. The extension collects what the page shows." },
            { title: "Pick the list and the pages", points: ["Set Stop after and click Collect from 5 pages (or the number you set). Keep the tab in front."], body: "Open the side panel's List tab, choose the results list, then Collect more pages. The Next button is found on its own; set Stop after and click Collect from N pages." },
            { title: "Review and export", points: ["Example to type with the results tab in front: Only name, price, sold and seller, sorted by sold."], body: "Sort by Sold or Price, remove columns you don't need, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "eBay specifics",
        items: [
            "The Sold column is the card's \"N sold\" line, which eBay shows on many listings; it's the quickest signal of what moves.",
            "Auction rows carry Bids and Time Left; Buy It Now rows leave them empty. Filter on Purchase Format to separate them.",
            "eBay's country sites (.co.uk, .de, .com.au) are detected as lists without the named setup, so check their columns on the first page.",
            "Sponsored listings are kept and labelled; turn on Skip sponsored products in Settings → Results to leave them out.",
            "eBay's terms restrict automated collection. Collect for your own research, such as pricing a lot or watching a category, and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [{"column": "Bids, Time Left, Auction Ends", "when": "The listing is Buy It Now, not an auction."}, {"column": "Sold", "when": "The listing shows no \"N sold\" line yet."}, {"column": "Watchers", "when": "eBay shows watchers on some listings only."}, {"column": "Price With Coupon", "when": "No coupon on the listing."}, {"column": "Rating, Rating Count", "when": "Product ratings appear only on catalogue-matched listings."}, {"column": "Returns, Item Location", "when": "Not shown on every card."}],
    pushback: ["If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again; what was collected is kept.", "A site that slows down for anyone loading many pages fast shows fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.", "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.", "Sold-items searches page like any other; a very long sold history is capped by eBay itself."],
    screenshots: ["ext/results-ebay"],
    feature: "list-scraper",
    guide: "collect-store-listings-to-excel",
    useCase: "ecommerce",
    related: ["etsy", "walmart", "amazon"],
    faqs: [
        { q: "Can I collect sold listings for pricing?", a: "Yes. Filter the search to Sold items on eBay, then collect; the Price column holds the sold prices, and Auction Ends the sale dates where shown." },
        { q: "Can I collect a seller's whole store?", a: "A seller's items page is a list like any other; pick it in the List tab and collect every page." },
        { q: "Why is the price a range on some rows?", a: "Listings with variations show a range on the card, and the extension keeps what the card shows. Open the listing and use the Properties tab for one variation's price." },
        { q: "Can I run several searches at once?", a: "Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings." },
        { q: "Why do some rows have no bids or time left?", a: "Those listings are Buy It Now. Bids, Time Left and Auction Ends fill in for auctions only; filter on Purchase Format to separate them." },
        { q: "Can I collect a seller's whole store?", a: "A seller's items page is a list like any other; pick it in the List tab and collect every page." },
    ],
};
