import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the amazon pack in configs-prod/ (amazon.com, amazon.ae, amazon.in and
// every other country store via *amazon.*; Next page by the s-pagination-next link) and the amazon column mapping in
// site-column-mappings/ (Product Name, Product URL, ASIN, Brand, Price, Original Price, Discount Percentage, Coupon, Rating,
// Review Count, Bought In Past Month, Delivery Date, Stock, Sponsored, Badge, Image URL). Sponsored rows are kept and
// labelled unless Settings → Results → Skip sponsored products is on. Product pages: lib/pdp/ (15 standard fields, reviews).
// Draft until a real run's screenshots are in the visuals library and lastVerified is set from that run.

export const amazon: ScraperPageContent = {
    slug: "amazon",
    category: "online-stores",
    site: { name: "Amazon", url: "https://www.amazon.com" },
    meta: {
        title: "Amazon Scraper: Search Results and Product Pages to a Spreadsheet",
        description: "Collect an Amazon search or category into a spreadsheet with product name, price, rating, review count, badges and link, across every page, in 21 country stores. Then collect a product's details and reviews.",
    },
    h1: "Collect Amazon search results into a spreadsheet",
    intro: "Run a search on Amazon, pick the list in the side panel, set how many pages, and get one row per product with named columns. The same setup covers Amazon's stores in 21 countries.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for trail running shoes, after export. Products and numbers are made up.",
        columns: ["Product Name", "Brand", "Price", "Original Price", "Rating", "Review Count", "Badge", "Sponsored"],
        rows: [
            ["Trail Runner 2 Men's Shoes", "Trail Gear Co.", "89.00", "110.00", "4.6", "1,204", "Amazon's Choice", ""],
            ["Ridge Trail Shoes, Waterproof", "Summit Outdoors", "129.00", "", "4.8", "532", "Best Seller", ""],
            ["Lightweight Trail Runners", "Peak Form", "64.99", "79.99", "4.3", "318", "", "Sponsored"],
        ],
    },
    fields: {
        heading: "Sixteen columns, named by the Amazon setup",
        intro: "A column the search never shows stays out of the table. Prices, ratings and counts are saved as numbers.",
        items: [
            { name: "Product Name, Product URL, ASIN", description: "The listing's title, its link and Amazon's product id, which stays the same across country stores." },
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
        heading: "Search, pick, collect",
        items: [
            { title: "Run the search on Amazon", points: ["Example: trail running shoes, with the filters you'd use anyway.", "Sponsored rows are kept and marked; Settings → Results → Skip sponsored products leaves them out."], body: "Search and filter as you normally would. The extension collects what the page shows, so a price range or Prime filter shapes the list." },
            { title: "Pick the list and the pages", points: ["A search shows 7 to 20 pages. Set Stop after and click Collect from 5 pages (or the number you set).", "Keep the tab in front; the tab title counts the products."], body: "Open the side panel's List tab, choose the results list, then Collect more pages. The Next button is found on its own; set Stop after and click Collect from N pages." },
            { title: "Review and export", points: ["Example to type with the results tab in front: Only name, price, rating and review count, rows rated above 4, sorted by price."], body: "Rename or remove columns, filter rows, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Amazon specifics",
        items: [
            "Every country store works with the same setup: .com, .co.uk, .de, .in, .ae, .ca, .co.jp and the rest.",
            "Sponsored rows are included and carry a Sponsored label. Turn on Skip sponsored products in Settings → Results to leave them out.",
            "A search page shows a listing's rating and review count, not the reviews. For the reviews, open the product page and use the Properties tab.",
            "Amazon limits how many pages a search shows, usually 7 to 20. For more products, run narrower searches or categories.",
            "Amazon's terms restrict automated collection, and product images and text are theirs. Collect for your own research and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [{"column": "Brand", "when": "The listing doesn't show a brand line."}, {"column": "Original Price, Discount Percentage", "when": "No struck-through price on the listing."}, {"column": "Coupon, Price With Coupon", "when": "No coupon offered."}, {"column": "Bought In Past Month", "when": "Amazon shows the line only on some listings."}, {"column": "Delivery Date", "when": "Shown mostly for Prime-eligible items."}, {"column": "Badge", "when": "No Best Seller, Amazon's Choice or similar label."}, {"column": "Price", "when": "A listing with several offers shows a range or no price until opened."}],
    pushback: ["If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again; what was collected is kept.", "A site that slows down for anyone loading many pages fast shows fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.", "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.", "Amazon's country stores (.co.uk, .de, .in and the rest) use the same setup, so a verification on one behaves the same way."],
    screenshots: ["ext/list-tab-amazon", "ext/results-amazon"],
    feature: "list-scraper",
    guide: "collect-amazon-search-results",
    useCase: "ecommerce",
    related: [],
    faqs: [
        { q: "Can I collect a product's full details and reviews?", a: "Yes. Open the product page and click Collect details on this page in the Properties tab. It reads the standard fields (price, list price, discount, rating, availability, seller, variants, images) and collects the reviews across their pages." },
        { q: "Does it collect Best Sellers and other category lists?", a: "Yes. Category pages, Best Sellers, New Releases and Movers & Shakers are lists like any other; pick the list in the side panel and collect." },
        { q: "Why are some prices empty?", a: "A listing with several offers sometimes shows a price range or no price until you open it. Those cells stay empty rather than guessing." },
        { q: "Can I run several searches at once?", a: "Paste the search addresses into Bulk scrape and each is collected in turn, with the same page settings." },
        { q: "Why is the price empty on some rows?", a: "A listing with several sellers or variations sometimes shows no single price on the search card. The cell stays empty rather than guessing; open the listing for the price." },
        { q: "Does it collect from Amazon Fresh or Amazon Business?", a: "The setup is for the main store's search and category pages. Other storefronts are detected as a plain list; check the columns on the first page." },
    ],
};
