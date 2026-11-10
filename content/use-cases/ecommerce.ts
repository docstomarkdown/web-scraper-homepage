import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Personas: Priya, online store owner, and Kai, Shopify agency or dropshipper (docs/personas.md), written so a first-time
// reader can follow. Title targets the search phrases "track competitor prices", "scrape product prices" and "scrape reviews"
// (youtube-research/SEARCH_QUERIES.md, AUTOSUGGEST.md), 2026-10-21.
//
// Facts checked against chrome-extension-source on 2026-11-10 (no real run; sample rows are invented):
// - Amazon list columns Product Name, Price, Original Price, Rating, Review Count, Product URL, Sponsored, Bought In Past
//   Month: configs-prod/site-column-mappings/amazon.com.json. eBay has a Sold column: site-column-mappings/ebay.com.json.
//   Amazon, Walmart, Etsy, eBay, Target, Costco and Wayfair have setups in configs-prod/.
// - List tab "Collect more pages", "Next page", "Stop after" (default 5), "Collect from 5 pages", "Choose an item on the
//   page": components/scraper/ListTab.tsx.
// - Properties tab "Collect details on this page", "Fix or add a field", the 15 product fields: components/scraper/
//   PropertiesTab.tsx, lib/pdp/types.ts (PDPField). Ready-made product profiles for Amazon, Walmart, Flipkart and others:
//   configs-prod/pdp-selectors/.
// - "View all reviews" and the reviews table's columns Reviewer, Rating, Review, plus Verified purchase where the site
//   shows it; "Click the button or link that opens or loads more reviews": components/scraper/PropertiesTab.tsx.
// - Shopify store card, "All products", "One row per product" / "One row per variant", "Collect products", the columns:
//   components/scraper/shopify/ShopifyStoreCard.tsx, lib/platform/shopify/rows.ts. Password-protected stores: products/web-scraper-pro.md.
// - Settings > Shopping sites > "Skip sponsored products": components/scraper/ResultsSettingsCards.tsx.
// - Export as Google Sheets, Microsoft Excel, CSV, JSON; History with saved time, 500 lists: lib/tools/helpTopics.json,
//   components/scraper/HistoryTab.tsx, lib/db/historyService.ts. Bulk runs have no product-page fields: lib/bulk/executors/.
// - Scheduled price checks are not live (cloudLaunched false in config/products.mjs): say "coming soon", never imply alerts.
export const ecommerce: UseCasePageContent = {
    page: getPage("ecommerce", "use-case"),
    meta: {
        title: "How to Track Competitor Prices from Online Stores, Free",
        description: "Collect a competitor's prices, ratings and reviews from Amazon, other marketplaces and independent stores into one spreadsheet, with a free extension."
    },
    h1: "How to track competitor prices and reviews from online stores",
    intro: "Open a store's category page in Web Scraper Pro, a free Chrome extension, and collect every product with its price, rating and review count into a spreadsheet. Open a product and collect its reviews too. Compare it all in Excel or Google Sheets.",
    status: "draft",
    lastUpdated: "2026-11-10",
    job: {
        heading: "The price check you'd otherwise do tab by tab",
        paragraphs: [
            "A competitor undercuts you, a sale season is coming, or you want to know what sells before you stock it. The answers are on Amazon, on the other marketplaces and on independent stores, spread over many product pages.",
            "Web Scraper Pro collects each of those pages into the same kind of table, inside your Chrome browser. Big marketplaces come with ready-made columns, and on independent stores the columns are named from the page. You get one sheet you can sort by price, rating or review count.",
            "There's no setup to build. You open the page, pick the list, and collect.",
        ],
    },
    workflow: {
        heading: "From a competitor's category to a comparison sheet",
        intro: "Five steps, from a category page to a sheet you can compare.",
        steps: [
            {
                title: "Collect a competitor's category",
                body: "Open the search or category page on Amazon, Walmart, Etsy or another store, then click the Web Scraper Pro icon in Chrome. The side panel opens. In the List tab, each list it finds shows as a card with a count; click the product list.",
                points: [
                    "Choose Collect more pages, then Next page, and set Stop after to the number of pages you want.",
                    "Click Collect from 5 pages (or the number you set).",
                    "On Amazon you get one row per product with Product Name, Price, Original Price, Rating, Review Count and Product URL, among other columns.",
                    "If the List tab doesn't find the products as one list, choose Choose an item on the page and click one product.",
                ],
                feature: "list-scraper",
                screenshot: "ext/results-amazon",
            },
            {
                title: "Open the products that matter most",
                body: "For your closest competitors, open the product page itself. In the panel's Properties tab, click Collect details on this page. The same fields come back on every store, so products from different sites line up in one sheet.",
                points: [
                    "Fields: title, brand, current price, list price, discount, rating, review count, availability, delivery, seller, selected variant, offers, images, the product link and reviews.",
                    "Amazon, Walmart, Flipkart and other big stores have a ready-made profile. On other stores, click Fix or add a field to point at a value the page shows.",
                ],
                feature: "product-scraper",
            },
            {
                title: "Collect the reviews",
                body: "On the same product page, click View all reviews. The extension pages through the reviews and puts them in their own table. Sort by Rating to read the complaints first.",
                points: [
                    "Columns: Reviewer, Rating and Review, plus Verified purchase on sites that show it.",
                    "If a store loads more reviews only after a click, the panel asks you to click the button or link that opens or loads more reviews.",
                ],
                feature: "product-scraper",
            },
            {
                title: "Export a Shopify competitor's whole catalog",
                body: "If the competitor runs on Shopify, a Shopify store card appears in the List tab. Choose All products, pick One row per product or One row per variant, and click Collect products. The rows come from the store's own product data, not page by page.",
                points: [
                    "Columns: Title, Vendor, Type, Price, Compare At Price, Available, SKU, Tags, Images, Description, URL and more.",
                    "Password-protected stores aren't supported.",
                ],
                feature: "shopify-scraper",
                screenshot: "ext/shopify-store-card",
            },
            {
                title: "Compare in one sheet, and again next month",
                body: "Click Export as and choose Google Sheets or Microsoft Excel for each collection. Put them side by side and sort. Every collection stays in History with the time it was saved, so next month's collection shows you what changed.",
                points: [
                    "To export only some columns, type in chat: download only the name, price and rating as Excel.",
                    "Scheduled price checks that run on their own are coming soon. Today you collect again when you want fresh numbers.",
                ],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    sample: {
        caption: "Sample data: invented products, with the column names the Amazon setup gives.",
        columns: ["Product Name", "Price", "Original Price", "Rating", "Review Count"],
        rows: [
            ["Sample Trail Shoe", "89.00", "99.00", "4.6", "1,204"],
            ["Sample Waterproof Trail Shoe", "129.00", "", "4.8", "532"],
            ["Sample Lightweight Runner", "64.99", "79.99", "4.3", "318"],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Four shapes the same job takes",
            paragraphs: [
                "A price check, a reviews read and a catalog copy all start from one of three pages: a category, a product page, or a Shopify store. The table shows which.",
            ],
            table: {
                columns: ["Variation", "Start from", "What you get"],
                rows: [
                    ["Competitor prices for a category", "The search or category page, List tab, Collect more pages", "One row per product. On Amazon: Product Name, Price, Original Price, Rating, Review Count, Product URL and more."],
                    ["The same product across stores", "Each store's product page, Properties tab", "The same 15 fields on every store, so rows from different sites line up in one sheet."],
                    ["What buyers complain about", "A product page, View all reviews", "A separate reviews table: Reviewer, Rating, Review. Sort by Rating."],
                    ["A Shopify competitor's whole catalog", "The store's page, Shopify store card", "Every product, or every variant, from the store's own product data."],
                ],
                caption: "Scheduled price checks that run on their own are coming soon; today you collect again when you want fresh numbers.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "One category, step by step",
            paragraphs: [
                "Here is a trail-running-shoes check on Amazon, from search to sheet.",
            ],
            steps: [
                { title: "Search the category.", body: "Search trail running shoes on Amazon with the filters you'd use anyway, such as a price range." },
                { title: "Collect five pages.", body: "Open the List tab, pick the results list, choose Collect more pages and leave Stop after at 5. Sponsored rows are marked in a Sponsored column; turn on Skip sponsored products in Settings > Shopping sites to leave them out." },
                { title: "Read the table.", body: "Product Name, Price, Original Price, Rating, Review Count and Product URL, among other columns. Click the Price header to sort." },
                { title: "Open the three that matter.", body: "On each product page, Properties tab > Collect details on this page for the 15 fields, then View all reviews for the reviews table. Sort reviews by Rating and read the lowest first." },
                { title: "Export.", body: "Export as > Google Sheets or Microsoft Excel for each collection. Next month, run the same search; History keeps today's collection with its saved time, so the two sheets side by side show what moved." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: [
                "The sheet answers the question you started with once you add one column or one filter. Four that help.",
            ],
            points: [
                "Where you stand: add your own price as a row and sort by Price. The rows above and below you are the competitors a buyer compares you with.",
                "Discount depth: Original Price minus Price, divided by Original Price, for every row. Sort by it before a sale season.",
                "What sells: sort by Review Count. On Amazon, the Bought In Past Month column helps where the page shows it; on eBay, the Sold column.",
                "Complaints to solve: in the reviews table, use Filter rows to keep the lowest ratings, then read. Recurring complaints are a product brief.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes to avoid",
            heading: "Five things that waste a run",
            paragraphs: [
                "These are the runs that look complete and aren't, or that read as something they're not.",
            ],
            points: [
                "Treating one search as the whole category. A store shows a limited number of result pages for one search. Run narrower searches or categories and combine them.",
                "Reading a card price as the final price. A card can show a range for a product with variants; the Properties tab reads the variant selected on the page. Collect again after picking another.",
                "Expecting sales or stock numbers. The page shows prices, ratings, review counts, badges and stock notes; it doesn't show how many a competitor sold.",
                "Loading many pages fast. Sites can slow down or block visitors who do, so collect in smaller runs; History keeps each one.",
                "Reusing photos, descriptions or reviews. They belong to the store and its reviewers. Collect them for your own analysis and check the terms where you sell.",
            ],
        },
    ],
    sites: [{ name: "Amazon", page: "amazon" }, { name: "eBay", page: "ebay" }, { name: "Walmart", page: "walmart" }, { name: "Etsy", page: "etsy" }, { name: "Target" }, { name: "Costco" }, { name: "Wayfair" }, { name: "Any Shopify store" }, { name: "Any store with a product list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Check prices every day on its own, or alert you to a change. Cloud runs are coming soon. Today you collect when you need fresh numbers, and History keeps each collection to compare.",
            "Show a competitor's sales or stock levels. It collects what the page shows: prices, ratings, review counts, badges and the stock notes a listing displays.",
            "Collect product-page fields in a bulk run. Open each product page and use the Properties tab instead.",
            "Read a password-protected Shopify store, or any page you can't open in your browser.",
            "Give you the right to reuse product photos, descriptions or reviews. They belong to the store and its reviewers; collect them for your own analysis.",
        ],
    },
    guides: ["scrape-products-from-any-online-store"],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free, with no paid plan, and there's no account to create." },
        { q: "How do I track competitor prices without a tool subscription?", a: "Collect the competitor's category into a table, export it, and collect the same page again when you want fresh numbers. History keeps each collection with its saved time, so two exports side by side show what changed." },
        { q: "Does it work on small independent stores, not only Amazon?", a: "Often, yes. On a store without a ready-made setup, the List tab looks for the product list on the page and names the columns from the page. If it doesn't find the list, choose Choose an item on the page and click one product. Shopify stores get the full catalog from their product data." },
        { q: "How many products can I collect from one search?", a: "As many as the store shows across its result pages. Set how many pages under Stop after. For more, search narrower categories and combine them." },
        { q: "Can I track a competitor's prices over time?", a: "By collecting the same page again. Each collection is saved in History with its saved time, so two exports side by side show what changed. Scheduled runs are coming soon." },
        { q: "Can I get the reviews with their star ratings?", a: "Yes. From a product page, View all reviews collects the reviews across their pages into a table with Reviewer, Rating and Review columns." },
        { q: "Can I compare the same product across several stores?", a: "Yes. Open each store's product page and use the Properties tab; the same 15 fields come back on every store, so the rows line up in one sheet." },
        { q: "Can I copy a competitor's Shopify catalog?", a: "You can collect it: every product or variant with price, compare-at price, SKU, tags and images, from the store's own product data. What you may do with it is set by the store's terms and the law where you sell." },
        { q: "Does it skip sponsored products?", a: "On stores with a ready-made setup, sponsored rows are marked in a Sponsored column. Turn on Skip sponsored products in Settings > Shopping sites to leave them out." },
        { q: "Is collecting competitor prices allowed?", a: "Prices on a public page are public information, but many marketplaces' terms restrict automated collection, and images and text are theirs. Collect for your own research, and check the terms where you sell. This isn't legal advice." },
    ],
};
