import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the walmart.com pack in configs-prod/ (product cards by item id, Next
// page) and its column mapping (Product Name, Price, Original Price, Savings, Extra Savings, Save With, Options Price Range,
// Rating, Review Count, Delivery, Pickup, Shipping, Sizes, Badge, Sponsored, Product URL, Image URL). Draft until a real
// run's screenshots are in the visuals library.
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
                points: ["Walmart shows up to 25 pages per search.", "Keep the tab in front. The tab title counts the products."],
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
            "Walmart limits a search to 25 pages. For more, search narrower categories.",
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
    screenshots: ["ext/results-walmart"],
    feature: "list-scraper",
    guide: "collect-store-listings-to-excel",
    useCase: "ecommerce",
    related: ["amazon", "ebay", "etsy"],
    faqs: [
        { q: "Is this Walmart scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Can I compare Walmart prices with Amazon's?", a: "Yes. Collect the same search on each store and export both. Both setups name the price column Price, so a lookup on product name lines them up." },
        { q: "Does it show the seller?", a: "Not from the search card, which doesn't show it. Open a product and use the Properties tab, which reads the seller on the product page." },
        { q: "Can I scrape Walmart product reviews?", a: "Yes, one product at a time. Open the product page, click Collect details on this page in the Properties tab, then View all reviews to collect them across pages." },
        { q: "Why is Pickup empty?", a: "Walmart fills the pickup line from the store set for your zip code. Set your store on walmart.com before collecting." },
        { q: "Can I scrape several Walmart searches at once?", a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings." },
        { q: "Will Walmart block me?", a: "The run happens in your own browser at a person's pace. Walmart sometimes shows a check when many pages load quickly; complete it in the tab and collect again." },
    ],
};
