import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the amazon pack in configs-prod/ (amazon.com, amazon.ae, amazon.in and
// every other country store via *amazon.*; Next page by the s-pagination-next link) and the amazon column mapping in
// site-column-mappings/ (Product Name, Product URL, ASIN, Brand, Price, Original Price, Discount Percentage, Coupon, Rating,
// Review Count, Bought In Past Month, Delivery Date, Stock, Sponsored, Badge, Image URL). Sponsored rows are kept and
// labelled unless Settings → Results → Skip sponsored products is on. Product pages: lib/pdp/ (15 standard fields, reviews).
// Draft until a real run's screenshots are in the visuals library and lastVerified is set from that run.
// Title targets search phrases (2026-10-21): "scraping product data from amazon website into excel"; /product-scraper owns
// "how to scrape amazon product data and reviews", so this page is about search and category results.

export const amazon: ScraperPageContent = {
    slug: "amazon",
    category: "online-stores",
    site: { name: "Amazon", url: "https://www.amazon.com" },
    meta: {
        title: "How to Scrape Amazon Search Results into a Spreadsheet",
        description: "Run a search on Amazon and get every result as a row: product name, price, rating, review count, badges and link, across every page, in 21 country stores. Free Chrome extension, no code.",
    },
    h1: "How to scrape Amazon search results into a spreadsheet",
    intro: "Run a search on Amazon, pick the list in the side panel, and set how many pages. You get one row per product with named columns. The same setup works in Amazon's stores in 21 countries.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for trail running shoes, after export. Products and numbers are made up.",
        columns: ["Product Name", "Price", "Original Price", "Rating", "Review Count"],
        rows: [
            ["Trail Runner 2 Men's Shoes", "89.00", "110.00", "4.6", "1,204"],
            ["Ridge Trail Shoes, Waterproof", "129.00", "", "4.8", "532"],
            ["Lightweight Trail Runners", "64.99", "79.99", "4.3", "318"],
        ],
    },
    fields: {
        heading: "What you get for every product",
        intro: "Sixteen columns come from the Amazon setup. A column the search never shows stays out, and prices, ratings and counts are saved as numbers.",
        items: [
            { name: "Product Name, Product URL, ASIN", description: "The title, the link and Amazon's product id, which is the same in every country store." },
            { name: "Brand", description: "When the listing shows it." },
            { name: "Price, Original Price, Discount Percentage", description: "The current price, the struck-through price and the gap between them." },
            { name: "Coupon, Price With Coupon", description: "When a coupon is offered on the listing." },
            { name: "Rating, Review Count", description: "The star rating and the number of ratings." },
            { name: "Bought In Past Month", description: "The \"N+ bought in past month\" line, when Amazon shows it." },
            { name: "Delivery Date, Stock", description: "The delivery line and any stock note." },
            { name: "Sponsored, Badge", description: "Whether the row is an ad, and labels such as Best Seller or Amazon's Choice." },
            { name: "Image URL", description: "The listing's image." },
        ],
    },
    steps: {
        heading: "How to scrape an Amazon search in three steps",
        items: [
            {
                title: "Run the search on Amazon",
                body: "Search and filter as you normally would. The extension collects what the page shows, so a price range or a Prime filter shapes the list.",
                points: [
                    "Example: trail running shoes, with the filters you'd use anyway.",
                    "Sponsored rows are kept and marked. Settings → Results → Skip sponsored products leaves them out.",
                ],
            },
            {
                title: "Pick the list and the pages",
                body: "Open the side panel's List tab and choose the results list. Choose Collect more pages; the Next button is found on its own. Set Stop after and click Collect from 5 pages, or the number you set.",
                points: [
                    "A search shows 7 to 20 pages.",
                    "Keep the tab in front. The tab title counts the products.",
                ],
            },
            {
                title: "Review and export",
                body: "Rename or remove columns and filter rows. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only name, price, rating and review count, rows rated above 4, sorted by price."],
            },
        ],
    },
    notes: {
        heading: "Good to know about Amazon",
        items: [
            "Every country store works with the same setup: .com, .co.uk, .de, .in, .ae, .ca, .co.jp and the rest.",
            "A search page shows a product's rating and review count, not the reviews. For the reviews, open the product page and use the Properties tab.",
            "Amazon limits a search to 7 to 20 pages. For more products, run narrower searches or categories.",
            "Amazon's terms restrict automated collection, and product images and text are theirs. Collect for your own research and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [
        { column: "Brand", when: "The listing doesn't show a brand line." },
        { column: "Original Price, Discount Percentage", when: "No struck-through price on the listing." },
        { column: "Coupon, Price With Coupon", when: "No coupon offered." },
        { column: "Bought In Past Month", when: "Amazon shows the line on some listings only." },
        { column: "Delivery Date", when: "Shown mostly for Prime-eligible items." },
        { column: "Badge", when: "No Best Seller, Amazon's Choice or similar label." },
        { column: "Price", when: "A listing with several offers shows a range or no price until opened." },
    ],
    pushback: [
        "If Amazon shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again. What was collected is kept.",
        "Loading many pages fast can bring fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.",
        "When Amazon changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
        "The country stores use the same setup, so a verification on one behaves the same way.",
    ],
    screenshots: ["ext/list-tab-amazon", "ext/results-amazon"],
    feature: "list-scraper",
    guide: "collect-amazon-search-results",
    useCase: "ecommerce",
    related: [],
    faqs: [
        { q: "Is this Amazon scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Can I scrape a product's full details and reviews?", a: "Yes. Open the product page and click Collect details on this page in the Properties tab. It reads the standard fields, such as price, list price, rating, availability, seller and variants, and collects the reviews across their pages." },
        { q: "Can I scrape Amazon Best Sellers?", a: "Yes. Best Sellers, New Releases, Movers & Shakers and category pages are lists like any other. Pick the list in the side panel and collect." },
        { q: "Why is the price empty on some rows?", a: "A listing with several sellers or variations sometimes shows a range or no price on the search card. The cell stays empty rather than guessing; open the listing for the price." },
        { q: "Can I scrape several Amazon searches at once?", a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings." },
        { q: "Does it work on Amazon.in, Amazon.co.uk and other country stores?", a: "Yes. The setup covers 21 country stores, and the ASIN column is the same product id in each, so you can compare prices across stores." },
        { q: "Does it work on Amazon Fresh or Amazon Business?", a: "The setup is for the main store's search and category pages. Other storefronts are detected as a plain list; check the columns on the first page." },
    ],
};
