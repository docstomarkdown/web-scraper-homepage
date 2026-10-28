import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the ebay.com pack in configs-prod/ (search and browse cards, Next page)
// and its column mapping (Product Name, Price, Price With Coupon, Shipping, Condition, Purchase Format, Bids, Time Left,
// Auction Ends, Sold, Watchers, Seller, Seller Feedback Count, Seller Positive Feedback, Item Location, Returns, Rating,
// Rating Count, Stock, Promotion, Listing Badge, Specifications, Other Info, Item ID, Product URL, Image URL).
// Results page: Filter rows, pencil rename, trash remove, Hide mostly empty columns, Export as; product pages via the
// Properties tab (content/features/list-scraper.ts, product-scraper.ts).
// Draft until a real run's screenshots are in the visuals library.
// Verify in that run: how many listings one search page shows, the row figures in the worked example (illustrative until
// measured), whether eBay caps a search's pages (written as "about"), and that .co.uk/.de/.com.au are detected without
// the named setup.
// Title targets search phrases (2026-10-21): "how to scrape ebay product data", "scrape ebay listings"; the seller and
// sold columns are what sets this setup apart. Shortened to 56 characters.

export const ebay: ScraperPageContent = {
    slug: "ebay",
    category: "online-stores",
    site: { name: "eBay", url: "https://www.ebay.com" },
    meta: {
        title: "How to Scrape eBay Listings into Excel, with Sold Counts",
        description: "Run a search on eBay and get every listing as a row: price, shipping, condition, auction or Buy It Now, bids, sold count, seller and feedback, across every page. Free Chrome extension, no code.",
    },
    h1: "How to scrape eBay listings into Excel, with sold counts and sellers",
    intro: "Run a search on eBay, pick the list in the side panel, and set how many pages. You get one row per listing with price, condition, seller, bids and sold count as named columns. Sort a whole category by price or by what sells.",
    allowed: "eBay's user agreement restricts automated collection, and it shows a verification page when many result pages load quickly. This page reads the search results you have open, in your own browser, at a person's pace, for your own price research; listing photos and text belong to the sellers. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
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
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three eBay searches worth running",
            paragraphs: [
                "eBay's filters do the narrowing, so the search you set up is most of the work. These three cover the common reasons people collect eBay listings, and each needs a handful of the twenty-six columns.",
                "Set Sold items, Buy It Now or Auction on eBay before collecting. The Purchase Format column tells the rows apart afterwards, but a filtered search gives a cleaner sheet from the start.",
            ],
            table: {
                columns: ["Search", "Why run it", "Columns to keep"],
                rows: [
                    ["Your product's keyword, filtered to Sold items", "Price a lot or an item from what has sold, not from asking prices", "Product Name, Price, Condition, Auction Ends, Seller"],
                    ["A category, filtered to Buy It Now and sorted by Best Match", "See the asking prices, the sellers and who has volume", "Product Name, Price, Shipping, Sold, Seller, Seller Feedback Count"],
                    ["A seller's items page", "Size up one competitor's whole shop and what moves", "Product Name, Price, Sold, Watchers, Listing Badge"],
                ],
                caption: "Three searches and what to keep from each. The Sold column is the \"N sold\" line on the card.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "A worked example: pricing a lot of vintage cameras",
            paragraphs: [
                "Here is a run from start to finish, with made-up but typical numbers. The figures show the shape of a run; your counts depend on the search.",
            ],
            steps: [
                { title: "Search.", body: "Type vintage film camera on ebay.com, open the filters and tick Sold items. The results now show sold prices with the sale dates." },
                { title: "Pick the list.", body: "Open the List tab. Under Choose from lists we found, the results show as the first card with the number of listings on this page. Hover it and the listings are outlined." },
                { title: "Set the pages.", body: "Choose Collect more pages. The panel reads Next button ready. Set Stop after to 10 pages and click Collect from 10 pages." },
                { title: "Watch the tab title.", body: "The count climbs page by page. Ten pages of sold listings give a few hundred rows, each with a sold price and a sale date where eBay shows one." },
                { title: "Open the results.", body: "Sort by Price. The spread between the lowest and the median sold price is the number you came for. Columns eBay never filled, such as Bids on Buy It Now sales, are hidden, not deleted." },
                { title: "Export.", body: "Click Export as and choose Excel. Prices and counts are numbers, so a median or an average is one formula away." },
            ],
        },
        {
            id: "what-to-do",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: [
                "The results page is a small spreadsheet of its own. Most people do one of these before exporting.",
            ],
            points: [
                "Separate auctions from fixed price: click Filter rows and keep rows where Purchase Format is Buy It Now, or sort by Bids to see which auctions have interest.",
                "Find what sells: sort by Sold, high to low. Then look at Seller and Seller Feedback Count to see whether one shop owns the category.",
                "Hide what you don't need: hover a header and click the trash icon, or rename a column with the pencil. Specifications and Other Info are the long ones.",
                "Run it again next week: collect the same search and compare the two exports on Item ID. New listings, sold-outs and price changes show up in a lookup.",
                "Go deeper on one listing: open it and click Collect details on this page in the Properties tab for the standard fields of that listing.",
            ],
        },
        {
            id: "what-ebay-shows",
            eyebrow: "Limits",
            heading: "What an eBay search shows, and what it doesn't",
            paragraphs: [
                "The extension collects what the search card shows. eBay puts a lot on the card, which is why this setup has twenty-six columns, but a few things live only on the listing page.",
                "A listing with variations shows a price range on the card, and the extension keeps what the card shows. Open the listing and use the Properties tab for one variation's price.",
            ],
            points: [
                "Pages: eBay decides how many pages a search runs to, and a very long sold history is cut off by eBay itself. Narrower searches reach more listings.",
                "Sponsored rows: kept and labelled, or skipped when Settings → Results → Skip sponsored products is on.",
                "Shipping and prices: what eBay shows for your location and currency. Set them on eBay before collecting.",
                "Country sites: ebay.co.uk, ebay.de and ebay.com.au are detected as lists without the named setup, so their column names come from the page. Check the first page before a long run.",
                "Seller details: name, feedback count and positive-feedback percentage come from the card. The seller's full profile is on their page.",
            ],
        },
        {
            id: "compared",
            eyebrow: "Other ways",
            heading: "Compared with eBay's own tools and copying by hand",
            paragraphs: [
                "For a search you can see, the extension is the quickest route to a sheet. eBay's seller tools report on your own listings, and copying cards by hand loses the sold counts and prices as numbers.",
            ],
            table: {
                columns: ["Method", "What you get", "Where it falls short"],
                rows: [
                    ["This extension", "Every page of the search as named columns, including Sold and Seller, in your own browser, free", "A verification page stops the run until you complete it; variations show as a range"],
                    ["eBay's seller tools", "Sales and traffic for your own listings", "Nothing about other sellers' prices, sold counts or feedback"],
                    ["Copying by hand", "Whatever you have the patience for", "\"12 sold\" pastes as text, auctions and fixed price mix, and a second run next week starts from zero"],
                ],
            },
        },
    ],
    screenshots: ["ext/results-ebay"],
    feature: "list-scraper",
    guide: "collect-store-listings-to-excel",
    useCase: "ecommerce",
    related: ["etsy", "walmart", "amazon"],
    faqs: [
        { q: "Is this eBay scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "How do I scrape eBay listings without code?", a: "Run the search, open the List tab, pick the results list, choose Collect more pages and set Stop after. The eBay setup names the columns, so the sheet is ready to sort by Sold or Price." },
        { q: "Can I scrape eBay sold listings for pricing?", a: "Yes. Filter the search to Sold items on eBay, then collect. The Price column holds the sold prices, and Auction Ends the sale dates where shown." },
        { q: "Can I scrape a seller's whole eBay store?", a: "Yes. A seller's items page is a list like any other. Pick it in the List tab and collect every page." },
        { q: "Why is the price a range on some rows?", a: "Listings with variations show a range on the card, and the extension keeps what the card shows. Open the listing and use the Properties tab for one variation's price." },
        { q: "Why do some rows have no bids or time left?", a: "Those listings are Buy It Now. Bids, Time Left and Auction Ends fill in for auctions only." },
        { q: "Can I scrape several eBay searches at once?", a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings. View merged table puts them in one sheet." },
        { q: "Will eBay block me?", a: "The run happens in your own browser at a person's pace, so eBay sees you browsing. If it shows a check, complete it in the tab and carry on." },
        { q: "Is scraping eBay allowed?", a: "eBay's terms restrict automated collection, and listing photos and text belong to their sellers. Collect for your own research, such as pricing a lot, keep it to what the public page shows, and read our plain-words explainer on web scraping and the law at /web-scraping-legal. It isn't legal advice." },
    ],
};
