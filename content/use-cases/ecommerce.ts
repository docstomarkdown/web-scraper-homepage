import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Personas: Priya, online store owner, and Kai, Shopify agency or dropshipper (docs/personas.md), written so a first-time
// reader can follow. Facts checked against release 1.3.0 on 2026-10-21: Amazon and other store packs (configs-prod/),
// product pages and reviews (lib/pdp/), Shopify store export (lib/shopifyMode/), results page filters and exports
// (entrypoints/dataviewer/). Scheduled price checks are not live: say "coming with the cloud", never imply alerts.
// Draft until the workflow screenshots exist.
// Title targets the search phrases "track competitor prices", "scrape product prices" and "scrape reviews"
// (youtube-research/SEARCH_QUERIES.md, AUTOSUGGEST.md), 2026-10-21.

export const ecommerce: UseCasePageContent = {
    page: getPage("ecommerce", "use-case"),
    meta: {
        title: "How to Track Competitor Prices and Bestsellers from Online Stores",
        description: "Scrape a competitor's prices, bestsellers and reviews from Amazon, other marketplaces and independent stores into one spreadsheet, and export a Shopify store's whole catalog. Free Chrome extension."
    },
    h1: "How to track competitor prices, bestsellers and reviews from online stores",
    intro: "Open a store's category page and click once in Web Scraper Pro, a free Chrome extension, to get every product with its price, rating and review count in a spreadsheet. Open a product and get its reviews too. Compare it all in Excel or Google Sheets.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The price check you'd otherwise do tab by tab",
        paragraphs: [
            "A competitor undercuts you, a sale season is coming, or you want to know what sells before you stock it. The answers are on Amazon, on the other marketplaces and on independent stores, spread over hundreds of product pages.",
            "Web Scraper Pro collects each of those pages into the same kind of table, inside your Chrome browser. Big marketplaces come with ready-made columns. Independent stores are read from the page. You get one sheet you can sort by price, rating or review count.",
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
        { q: "Does it work on small independent stores, not only Amazon?", a: "Yes. On a store without a ready-made setup, the product list is found on the page and the columns are named from the page's own labels. Shopify stores get the full catalog from their product data." },
        { q: "How many products can I collect from one search?", a: "As many as the store shows. Amazon lists up to 20 pages per search, Walmart 25, Etsy 250. For more, search narrower categories and combine them." },
        { q: "Can I track a competitor's prices over time?", a: "By running the same collection again. Each run is saved in History with its date, so two exports side by side show what changed. Scheduled runs are coming with the cloud." },
        { q: "Can I get the reviews with their star ratings?", a: "Yes. From a product page, View all reviews collects every review across its pages into a table with rating, title, text, author and date." },
        { q: "Is collecting competitor prices allowed?", a: "Prices on a public page are public information, but each marketplace's terms restrict automated collection, and images and text are theirs. Collect for your own research, and check the terms where you sell." },
    ],
};
