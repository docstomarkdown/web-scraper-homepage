import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the walmart.com pack in configs-prod/ (product cards by item id, Next
// page) and its column mapping (Product Name, Price, Original Price, Savings, Extra Savings, Save With, Options Price Range,
// Rating, Review Count, Delivery, Pickup, Shipping, Sizes, Badge, Sponsored, Product URL, Image URL). Results page: Filter
// rows, pencil rename, trash remove, Hide mostly empty columns, Export as; product pages via the Properties tab, reviews
// via View all reviews (content/features/list-scraper.ts, product-scraper.ts). Draft until a real run's screenshots are in
// the visuals library.
// Verify in that run: the "about 25 pages" cap per search, how many products one search page shows, the row figures in
// the worked example (illustrative until measured).
// Title targets search phrases (2026-10-21): "scrape walmart", "scrape product prices"; prices and savings are the draw.

export const walmart: ScraperPageContent = {
    slug: "walmart",
    category: "online-stores",
    site: { name: "Walmart", url: "https://www.walmart.com" },
    meta: {
        title: "How to Scrape Walmart Search Results to Excel, with Prices",
        description: "Run a search on Walmart and get every product as a row: name, price, original price, savings, rating, review count, delivery and pickup, across every page. Free Chrome extension, no code.",
    },
    h1: "How to scrape Walmart search results to Excel, with prices and savings",
    intro: "Search Walmart, pick the results in the side panel, and set how many pages. You get one row per product with price, savings, rating and review count as named columns. Compare a category against another store in one sheet.",
    allowed: "Walmart's terms restrict automated collection, and it shows a verification page when it sees many pages load quickly. This page reads the search results you have open, in your own browser, at a person's pace, for your own price research; product images and text stay Walmart's. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for trail running shoes, after export. Products and numbers are made up.",
        columns: ["Product Name", "Price", "Original Price", "Savings", "Rating"],
        rows: [
            ["Trail Runner 2 Men's Shoes", "89.00", "110.00", "21.00", "4.6"],
            ["Ridge Trail Shoes, Waterproof", "129.00", "", "", "4.8"],
            ["Lightweight Trail Runners", "64.99", "79.99", "15.00", "4.3"],
        ],
    },
    fields: {
        heading: "What you get for every product",
        intro: "Seventeen columns come from the Walmart setup. A column the search never shows stays out, and prices, savings, ratings and counts are saved as numbers.",
        items: [
            { name: "Product Name, Product URL", description: "The title and the link." },
            { name: "Price, Original Price, Savings, Extra Savings, Save With", description: "The current price, the struck-through price, the savings shown, and offers such as subscribe and save." },
            { name: "Options Price Range, Sizes", description: "For products with options: the price range and the sizes on the card." },
            { name: "Rating, Review Count", description: "The star rating and the number of reviews." },
            { name: "Delivery, Pickup, Shipping", description: "The delivery date, pickup availability and shipping notes." },
            { name: "Badge, Sponsored", description: "Labels such as Best seller or Rollback, and whether the row is an ad." },
            { name: "Image URL", description: "The product's main image." },
        ],
    },
    steps: {
        heading: "How to scrape a Walmart search in three steps",
        items: [
            {
                title: "Search on Walmart",
                body: "Search and filter as you normally would: price, brand, fulfilment, rating. The extension collects what the page shows.",
                points: [
                    "Example: trail running shoes, with a brand or fulfilment filter.",
                    "Sponsored rows are kept and marked. Settings → Results → Skip sponsored products leaves them out.",
                ],
            },
            {
                title: "Pick the list and the pages",
                body: "Open the side panel's List tab and choose the results list. Choose Collect more pages; the Next button is found on its own. Set Stop after and click Collect from 5 pages, or the number you set.",
                points: ["Walmart shows about 25 pages per search at most.", "Keep the tab in front. The tab title counts the products."],
            },
            {
                title: "Review and export",
                body: "Sort by Price or Rating and remove the columns you don't need. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only name, price, rating and review count, sorted by price."],
            },
        ],
    },
    notes: {
        heading: "Good to know about Walmart",
        items: [
            "Delivery and pickup lines depend on the store and zip code Walmart has for you. Set them on the site before collecting.",
            "Walmart limits a search to about 25 pages. For more, search narrower categories.",
            "Walmart sometimes shows a verification page when many pages load quickly. Complete the check in the tab, then collect again.",
            "Walmart's terms restrict automated collection. Collect for your own research, such as a price comparison, and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [
        { column: "Original Price, Savings", when: "No rollback or struck-through price." },
        { column: "Options Price Range, Sizes", when: "The product has no options." },
        { column: "Pickup", when: "No store set for your zip code, or pickup not offered." },
        { column: "Badge", when: "No Best seller or Rollback label." },
        { column: "Rating, Review Count", when: "No reviews yet." },
    ],
    pushback: [
        "If Walmart shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again. What was collected is kept.",
        "Loading many pages fast can bring fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.",
        "When Walmart changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three Walmart searches worth running",
            paragraphs: [
                "Walmart's search is built for shoppers, so its filters do the narrowing. These three searches cover most reasons people collect Walmart results, and each needs only a few of the seventeen columns.",
                "Set the filters on Walmart first: price, brand, rating, fulfilment. Set your store and zip code too, because the Delivery and Pickup columns follow them.",
            ],
            table: {
                columns: ["Search", "Why run it", "Columns to keep"],
                rows: [
                    ["Your product's keyword, say \"trail running shoes\"", "See the price band, who's on Rollback and who ranks above you", "Product Name, Price, Original Price, Savings, Badge, Sponsored"],
                    ["The same keyword you collected on Amazon", "Line the two stores up on product name and compare prices", "Product Name, Price, Rating, Review Count"],
                    ["A category filtered to 4 stars and up", "Size up a category before you source or list a product", "Product Name, Price, Review Count, Delivery, Pickup"],
                ],
                caption: "Three searches and what to keep from each. Savings is the gap Walmart shows between Original Price and Price.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "A worked example: a price check on trail running shoes",
            paragraphs: [
                "Here is a run from start to finish, with made-up but typical numbers. The figures show the shape of a run; your counts depend on the search.",
            ],
            steps: [
                { title: "Set your store.", body: "On walmart.com, set your store and zip code first. Delivery and Pickup are filled from them." },
                { title: "Search.", body: "Type trail running shoes and set the filter to 4 stars and up. Walmart shows the first page with a Next button at the bottom." },
                { title: "Pick the list.", body: "Open the List tab. Under Choose from lists we found, the results show as the first card with the number of products on this page. Hover it and the cards are outlined." },
                { title: "Set the pages.", body: "Choose Collect more pages. The panel reads Next button ready. Set Stop after to 10 pages and click Collect from 10 pages." },
                { title: "Watch the tab title.", body: "The count climbs page by page. Ten pages give a few hundred rows, some marked Rollback in the Badge column and a few marked Sponsored." },
                { title: "Export and compare.", body: "Click Export as and choose Excel. Open the Amazon export of the same search beside it; both name the price column Price, so a lookup on Product Name lines them up." },
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
                "Find the deals: click Filter rows and keep rows where Savings is not empty, then sort by Savings, high to low. Badge shows which of them are Rollbacks.",
                "Sort by Price or Rating: click the column header. Review Count high to low shows the established products.",
                "Drop the ads: filter rows where Sponsored is empty, or turn on Settings → Results → Skip sponsored products before the next run.",
                "Hide what you don't need: hover a header and click the trash icon, or rename a column with the pencil. Mostly empty columns are already hidden.",
                "Run it again next week: collect the same search and compare the two exports on Product URL. Price and Savings changes show up in a lookup.",
                "Go deeper on one product: open its page and click Collect details on this page in the Properties tab. It reads the seller, which the search card doesn't show, and View all reviews collects the reviews across pages.",
            ],
        },
        {
            id: "what-walmart-shows",
            eyebrow: "Limits",
            heading: "What a Walmart search shows, and what it doesn't",
            paragraphs: [
                "The extension collects what the search card shows. A few things live only on the product page, and the delivery lines depend on the store Walmart has for you.",
                "A product with options shows a price range on the card, which lands in Options Price Range with the sizes in Sizes. Open the product for one option's price.",
            ],
            points: [
                "Pages: about 25 per search, set by Walmart. Narrower categories reach more products than one broad search.",
                "Sponsored rows: kept and labelled, or skipped when Settings → Results → Skip sponsored products is on.",
                "Delivery and Pickup: filled from the store and zip code set on walmart.com. Without a store, Pickup stays empty.",
                "Seller: not on the card. The Properties tab reads it from the product page.",
                "Reviews: the card shows the rating and the count only. Reviews come from the product page through View all reviews.",
            ],
        },
        {
            id: "compared",
            eyebrow: "Other ways",
            heading: "Compared with Walmart's own tools and copying by hand",
            paragraphs: [
                "For a search you can see, the extension is the quickest route to a sheet. Walmart's seller reports cover your own listings on the marketplace, not a competitor's search, and copying cards by hand loses prices and savings as numbers.",
            ],
            table: {
                columns: ["Method", "What you get", "Where it falls short"],
                rows: [
                    ["This extension", "Every page of the search as named columns, including Savings and Badge, in your own browser, free", "A verification page stops the run until you complete it; the seller isn't on the card"],
                    ["Walmart's seller reports", "Sales and traffic for your own marketplace listings", "Nothing about other sellers' prices, rollbacks or ratings"],
                    ["Copying by hand", "Whatever you have the patience for", "Prices paste as text, sponsored rows mix in, and a second run next week starts from zero"],
                ],
            },
        },
    ],
    screenshots: ["ext/results-walmart"],
    feature: "list-scraper",
    guide: "collect-store-listings-to-excel",
    useCase: "ecommerce",
    related: ["amazon", "ebay", "etsy"],
    faqs: [
        { q: "Is this Walmart scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "How do I scrape Walmart search results without code?", a: "Run the search, open the List tab, pick the results list, choose Collect more pages and set Stop after. The Walmart setup names the columns, so the sheet is ready to sort by price." },
        { q: "Can I compare Walmart prices with Amazon's?", a: "Yes. Collect the same search on each store and export both. Both setups name the price column Price, so a lookup on product name lines them up." },
        { q: "Does it show the seller?", a: "Not from the search card, which doesn't show it. Open a product and use the Properties tab, which reads the seller on the product page." },
        { q: "Can I scrape Walmart product reviews?", a: "Yes, one product at a time. Open the product page, click Collect details on this page in the Properties tab, then View all reviews to collect them across pages." },
        { q: "Why is Pickup empty?", a: "Walmart fills the pickup line from the store set for your zip code. Set your store on walmart.com before collecting." },
        { q: "Can I scrape several Walmart searches at once?", a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings. View merged table puts them in one sheet." },
        { q: "Will Walmart block me?", a: "The run happens in your own browser at a person's pace. Walmart sometimes shows a check when many pages load quickly; complete it in the tab and collect again." },
        { q: "Is scraping Walmart allowed?", a: "Walmart's terms restrict automated collection, and product text and images belong to Walmart and its sellers. Collect for your own research, such as a price comparison, keep it to what the public page shows, and read our plain-words explainer on web scraping and the law at /web-scraping-legal. It isn't legal advice." },
    ],
};
