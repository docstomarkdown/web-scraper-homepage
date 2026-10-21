import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Personas: Priya, online store owner, and Kai, Shopify agency or dropshipper (docs/personas.md), written so a first-time
// reader can follow. Facts checked against release 1.3.0 on 2026-10-21: Amazon and other store packs (configs-prod/),
// product pages and reviews (lib/pdp/), Shopify store export (lib/shopifyMode/), results page filters and exports
// (entrypoints/dataviewer/). Scheduled price checks are not live: say "coming with the cloud", never imply alerts.
// Draft until the workflow screenshots exist.
// Title targets the search phrases "track competitor prices", "scrape product prices" and "scrape reviews"
// (youtube-research/SEARCH_QUERIES.md, AUTOSUGGEST.md), 2026-10-21.

// Deepened 2026-10-21 (owner: pages too thin): variations, a worked example (the 240-row count assumes about 48
// products a page; verify on a real run), next steps, mistakes, ten FAQs. Page caps and Skip sponsored products come from
// content/scrapers/{amazon,walmart,etsy}.ts and content/features/product-scraper.ts.
export const ecommerce: UseCasePageContent = {
    page: getPage("ecommerce", "use-case"),
    meta: {
        title: "How to Track Competitor Prices from Online Stores, Free",
        description: "Scrape a competitor's prices, bestsellers and reviews from Amazon, other marketplaces and independent stores into one spreadsheet, and export a Shopify store's whole catalog. Free Chrome extension."
    },
    h1: "How to track competitor prices and reviews from online stores",
    intro: "Open a store's category page and click once in Web Scraper Pro, a free Chrome extension, to get every product with its price, rating and review count in a spreadsheet. Open a product and get its reviews too. Compare it all in Excel or Google Sheets.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The price check you'd otherwise do tab by tab",
        paragraphs: [
            "A competitor undercuts you, a sale season is coming, or you want to know what sells before you stock it. The answers are on Amazon, on the other marketplaces and on independent stores, spread over hundreds of product pages.",
            "Web Scraper Pro collects each of those pages into the same kind of table, inside your Chrome browser. Big marketplaces come with ready-made columns, and independent stores are read from the page. You get one sheet you can sort by price, rating or review count.",
            "There's nothing to set up. You open the page, click Collect, and watch the rows appear.",
        ],
    },
    workflow: {
        heading: "From a competitor's category to a comparison sheet",
        intro: "Five steps. The first one takes about two minutes for a hundred products.",
        steps: [
            {
                title: "Collect a competitor's category",
                body: "Open the search or category page on Amazon, Walmart, Etsy or a store of your own kind, then click the Web Scraper Pro icon in Chrome. A panel opens on the right. In the List tab, the products show as a list with a count; click it.",
                points: ["Choose Collect more pages and set how many pages. Amazon shows up to 20 per search.", "Click Collect from 5 pages (or the number you set). The tab counts the products as they arrive.", "You get one row per product: Product Name, Price, Original Price, Rating, Review Count and the link, as numbers you can sort."],
                feature: "list-scraper",
                screenshot: "ext/results-amazon",
            },
            {
                title: "Open the products that matter most",
                body: "For your closest competitors, open the product page itself. In the panel's Properties tab, click Collect details on this page. The same fields come back on every store, so products from different sites line up in one sheet.",
                points: ["Fields: title, brand, current price, list price, discount, rating, review count, availability, delivery, seller, selected variant, offers and images.", "Amazon, Walmart, Flipkart and other big stores have a ready-made profile. On other stores, click Fix or add a field once and it's remembered for that site."],
                feature: "product-scraper",
            },
            {
                title: "Collect the reviews",
                body: "On the same product page, click View all reviews. The extension pages through the reviews and puts them in their own table: rating, title, text, author and date. Sort by the lowest ratings to read the complaints first.",
                points: ["Reviews come from the page's own review list, across every review page.", "A store that shows reviews only after a click needs that button pointed at once; the panel asks you to click it."],
                feature: "product-scraper",
            },
            {
                title: "Export a Shopify competitor's whole catalog",
                body: "If the competitor runs on Shopify, a Shopify stores card appears in the List tab with the product count. Choose All products, pick one row per product or per variant, and click Collect products. The rows come from the store's own product data, so a thousand products take a minute or two.",
                points: ["Columns: Title, Vendor, Type, Tags, Price, Compare At Price, Available, SKU and more.", "Password-protected stores can't be read."],
                feature: "shopify-scraper",
                screenshot: "ext/shopify-store-card",
            },
            {
                title: "Compare in one sheet, and again next month",
                body: "Click Export as and choose Google Sheets or Excel for each collection. Put them side by side; prices and ratings are already numbers. Every collection stays in History, so next month's run shows you what changed.",
                points: ["Example to type in the chat with the results tab in front: Only name, price and rating, sorted by price", "Scheduled price checks that run on their own are coming with the cloud. Today you run it when you want fresh numbers."],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    sample: {
        caption: "This is what three rows look like after you save the file.",
        columns: ["Product Name", "Price", "Rating", "Review Count"],
        rows: [
            ["Trail Runner 2 Men's Shoes", "89.00", "4.6", "1,204"],
            ["Ridge Trail Shoes, Waterproof", "129.00", "4.8", "532"],
            ["Lightweight Trail Runners", "64.99", "4.3", "318"],
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
                columns: ["Variation", "Start from", "What changes"],
                rows: [
                    ["Competitor prices for a category", "The search or category page, List tab, Collect more pages", "One row per product: Product Name, Price, Original Price, Rating, Review Count, link. Amazon shows 7 to 20 pages, Walmart 25, Etsy 250."],
                    ["The same product across stores", "Each store's product page, Properties tab", "The same 15 fields on every store, so rows from different sites line up in one sheet."],
                    ["What buyers complain about", "A product page, View all reviews", "A separate reviews table: rating, title, text, author, date. Sort by the lowest ratings."],
                    ["A Shopify competitor's whole catalog", "The store's page, Shopify stores card", "Every product and variant from the store's own data; a thousand products in a minute or two."],
                    ["Prices from a list of product links", "Bulk scrape with the links pasted in", "One row per product with title and price, from several stores in one run."],
                ],
                caption: "Scheduled price checks that run on their own are coming with the cloud; today every check is one click when you want fresh numbers.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "One category, with the numbers",
            paragraphs: [
                "Here is a trail-running-shoes check on Amazon from search to sheet, with the counts the extension gives you.",
            ],
            steps: [
                { title: "Search the category.", body: "Search trail running shoes on Amazon with the filters you'd use anyway, such as a price range or Prime. Amazon shows up to 20 pages for a search." },
                { title: "Collect five pages.", body: "Open the List tab, pick the results list, choose Collect more pages and set Stop after to 5. About 240 rows arrive in two or three minutes; sponsored rows carry a Sponsored label, and Skip sponsored products in Settings leaves them out." },
                { title: "Read the table.", body: "Product Name, Price, Original Price, Rating, Review Count and Product URL, with prices and counts saved as numbers. Click the Price header to sort." },
                { title: "Open the three that matter.", body: "On each product page, Properties tab → Collect details on this page for the 15 fields, then View all reviews for the reviews table. Sort reviews by rating and read the 1- and 2-star ones first." },
                { title: "Export.", body: "Export as → Google Sheets or Excel for each collection. Next month, run the same search; History keeps today's run with its date, so the two sheets side by side show what moved." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: [
                "The sheet answers the question you started with once you add one column or one filter. Four that pay for themselves.",
            ],
            points: [
                "Where you stand: add your own price as a row and sort by Price. The rows above and below you are the competitors a buyer compares you with.",
                "Discount depth: Original Price minus Price, divided by Original Price, for every row. Sort by it before a sale season.",
                "What sells: sort by Review Count. On Amazon it's the closest public sign of volume; on eBay the Sold column is better.",
                "Complaints to solve: in the reviews table, Filter rows to keep ratings of 2 or less, then read. Three recurring complaints are a product brief.",
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
                "Treating one search as the whole category. Amazon caps a search at 7 to 20 pages. Run narrower searches or categories and combine them.",
                "Reading a card price as the final price. A card can show a range for a product with variants; the Properties tab reads the variant selected on the page. Collect again after picking another.",
                "Expecting sales or stock numbers. The page shows prices, ratings, review counts, badges and stock notes; it doesn't show how many a competitor sold.",
                "Loading many pages fast and then wondering about the error page. Collect in smaller runs and come back later; History keeps each one.",
                "Reusing photos, descriptions or reviews. They belong to the store and its reviewers. Collect them for your own analysis and check the terms where you sell.",
            ],
        },
    ],
    sites: [{ name: "Amazon", page: "amazon" }, { name: "eBay", page: "ebay" }, { name: "Walmart", page: "walmart" }, { name: "Etsy", page: "etsy" }, { name: "Target" }, { name: "Costco" }, { name: "Wayfair" }, { name: "Any Shopify store" }, { name: "Any store with a product list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Check prices every day on its own, or alert you to a change. That's coming with cloud runs. Today you run it when you need fresh numbers, and History keeps each run to compare.",
            "Show a competitor's sales or stock levels. It collects what the page shows: prices, ratings, review counts, badges and the stock notes a listing displays.",
            "Read a password-protected Shopify store, or any page you can't open in your browser.",
            "Give you the right to reuse product photos, descriptions or reviews. They belong to the store and its reviewers; collect them for your own analysis.",
        ],
    },
    guides: ["collect-amazon-search-results", "collect-store-listings-to-excel", "export-a-shopify-store-catalog", "scrape-data-from-any-website-to-excel"],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free to install and use today, with every feature included and no account to create." },
        { q: "How do I track competitor prices without a tool subscription?", a: "Collect the competitor's category into a table, export it, and run the same collection when you want fresh numbers. History keeps each run with its date, so two exports side by side show what changed." },
        { q: "Does it work on small independent stores, not only Amazon?", a: "Yes. On a store without a ready-made setup, the product list is found on the page and the columns are named from the page's own labels. Shopify stores get the full catalog from their product data." },
        { q: "How many products can I collect from one search?", a: "As many as the store shows. Amazon lists 7 to 20 pages per search, Walmart 25, Etsy 250. For more, search narrower categories and combine them." },
        { q: "Can I track a competitor's prices over time?", a: "By running the same collection again. Each run is saved in History with its date, so two exports side by side show what changed. Scheduled runs are coming with the cloud." },
        { q: "Can I get the reviews with their star ratings?", a: "Yes. From a product page, View all reviews collects every review across its pages into a table with rating, title, text, author and date." },
        { q: "Can I compare the same product across several stores?", a: "Yes. Open each store's product page and use the Properties tab; the same 15 fields come back on every store, so the rows line up in one sheet. Or paste the product links into Bulk scrape for one run." },
        { q: "Can I copy a competitor's Shopify catalog?", a: "You can collect it: every product and variant with price, compare-at price, SKU, tags and images, from the store's own product data. What you may do with it is set by the store's terms and the law where you sell." },
        { q: "Does it skip sponsored products?", a: "Sponsored rows carry a Sponsored label. Turn on Skip sponsored products under Settings → Results to leave them out." },
        { q: "Is collecting competitor prices allowed?", a: "Prices on a public page are public information, but each marketplace's terms restrict automated collection, and images and text are theirs. Collect for your own research, and check the terms where you sell." },
    ],
};
