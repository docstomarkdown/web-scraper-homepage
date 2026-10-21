import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the walmart.com pack in configs-prod/ (product cards by item id, Next
// page) and its column mapping (Product Name, Price, Original Price, Savings, Extra Savings, Save With, Options Price Range,
// Rating, Review Count, Delivery, Pickup, Shipping, Sizes, Badge, Sponsored, Product URL, Image URL). Draft until a real
// run's screenshots are in the visuals library.

export const walmart: ScraperPageContent = {
    slug: "walmart",
    category: "online-stores",
    site: { name: "Walmart", url: "https://www.walmart.com" },
    meta: {
        title: "Walmart Scraper: Search Results to a Spreadsheet, with Prices and Savings",
        description: "Collect a Walmart search into a spreadsheet: product name, price, original price, savings, rating, review count, delivery and pickup options and link, across every page, with no code.",
    },
    h1: "Collect Walmart search results into a spreadsheet",
    intro: "Search Walmart, pick the results in the side panel, set how many pages, and get one row per product with price, savings, rating and review count as named columns. Compare a category against another store in one sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for trail running shoes, after export. Products and numbers are made up.",
        columns: ["Product Name", "Price", "Original Price", "Savings", "Rating", "Review Count", "Delivery", "Sponsored"],
        rows: [
            ["Trail Runner 2 Men's Shoes", "89.00", "110.00", "21.00", "4.6", "1,204", "Free shipping, arrives in 2 days", ""],
            ["Ridge Trail Shoes, Waterproof", "129.00", "", "", "4.8", "532", "Free pickup today", ""],
            ["Lightweight Trail Runners", "64.99", "79.99", "15.00", "4.3", "318", "Free shipping, arrives in 3 days", "Sponsored"],
        ],
    },
    fields: {
        heading: "Seventeen columns from each product card",
        intro: "The columns come from the Walmart setup. A column the search never shows stays out; prices, savings, ratings and counts are saved as numbers.",
        items: [
            { name: "Product Name, Product URL", description: "The product's title and link." },
            { name: "Price, Original Price, Savings, Extra Savings, Save With", description: "The current price, the struck-through price, the savings shown, and offers such as subscribe-and-save." },
            { name: "Options Price Range, Sizes", description: "For products with options: the price range and the sizes listed on the card." },
            { name: "Rating, Review Count", description: "The star rating and the number of reviews." },
            { name: "Delivery, Pickup, Shipping", description: "The fulfilment lines: delivery date, pickup availability and shipping notes." },
            { name: "Badge, Sponsored", description: "Labels such as Best seller or Rollback, and whether the row is an ad." },
            { name: "Image URL", description: "The product's main image." },
        ],
    },
    steps: {
        heading: "Search, pick, collect",
        items: [
            { title: "Search on Walmart", body: "Search and filter as you normally would: price, brand, fulfilment, rating. The extension collects what the page shows." },
            { title: "Pick the list and the pages", body: "Open the side panel's List tab, choose the results list, then Collect more pages. The Next button is found on its own; set Stop after and click Collect from N pages." },
            { title: "Review and export", body: "Sort by Price or Rating, remove columns you don't need, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Walmart specifics",
        items: [
            "Delivery and pickup lines depend on the store and zip code Walmart has for you; set them on the site before collecting.",
            "Sponsored rows are kept and labelled; turn on Skip sponsored products in Settings → Results to leave them out.",
            "Walmart limits a search to 25 pages. For more, search narrower categories.",
            "Walmart sometimes shows a verification page when many pages load quickly. The run stops; complete the check in the tab, then collect again.",
            "Walmart's terms restrict automated collection. Collect for your own research, such as a price comparison, and check the terms before reusing anything.",
        ],
    },
    screenshots: ["ext/results-walmart"],
    feature: "list-scraper",
    guide: "collect-store-listings-to-excel",
    useCase: "ecommerce",
    related: ["amazon", "ebay", "etsy"],
    faqs: [
        { q: "Can I compare Walmart prices with Amazon's?", a: "Collect the same search on each store and export both; both setups name the price column Price, so a lookup on product name lines them up." },
        { q: "Does it collect marketplace sellers?", a: "The search card doesn't show the seller, so it isn't in the table. Open a product and use the Properties tab, which reads the seller on the product page." },
        { q: "Can I collect a product's reviews?", a: "Yes, one product at a time: open the product page, click Collect details on this page in the Properties tab, then View all reviews to collect them across pages." },
        { q: "Can I run several searches at once?", a: "Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings." },
    ],
};
