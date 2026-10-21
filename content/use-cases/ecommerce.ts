import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Personas: Priya, online store owner, and Kai, Shopify agency or dropshipper (docs/personas.md). Facts checked against
// release 1.3.0 on 2026-10-21: Amazon and other store packs (configs-prod/), product pages and reviews (lib/pdp/), Shopify
// store export (lib/shopifyMode/), results page filters and exports (entrypoints/dataviewer/). Scheduled price checks are
// not live: say "coming with the cloud", never imply alerts exist. Draft until the workflow screenshots exist.

export const ecommerce: UseCasePageContent = {
    page: getPage("ecommerce", "use-case"),
    meta: {
        title: "E-commerce Research: Competitor Prices, Bestsellers and Reviews in a Sheet",
        description: "Collect competitor prices, bestsellers and reviews from Amazon, other marketplaces and independent stores into one spreadsheet, and export a Shopify store's whole catalog.",
    },
    h1: "Competitor prices, bestsellers and reviews, in one sheet",
    intro: "Collect a marketplace search or a store's category into named columns, add the reviews from the products that matter, and compare it all in Google Sheets or Excel. Run it again before a sale season.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "Know what the competition charges before you set a price",
        paragraphs: [
            "A competitor undercuts you, a sale season is coming, or you want to know what sells before you stock it. The answers sit on Amazon, on the other marketplaces and on independent stores: price, list price, rating, review count, seller, and what reviewers complain about.",
            "Web Scraper Pro collects each of those pages into the same kind of table, in your own browser, so the comparison is a spreadsheet instead of an afternoon of tabs. Big marketplaces have ready-made columns; independent stores are detected on the page.",
        ],
    },
    workflow: {
        heading: "From a search to a comparison sheet",
        steps: [
            { title: "Collect the competitor's category", body: "Open the search or category on Amazon, Walmart, Etsy or a store of your own kind, pick the list in the side panel's List tab, set how many pages, and click Collect. The rows come with Price, Original Price, Rating and Review Count as numbers.", feature: "list-scraper", screenshot: "ext/results-amazon" },
            { title: "Open the products that matter", body: "For your closest competitors, open the product page and click Collect details on this page in the Properties tab: list price, discount, availability, seller, variants and images, in the same fields on every store.", feature: "product-scraper" },
            { title: "Collect the reviews", body: "On the same page, click View all reviews to collect every review across its pages into its own table: rating, title, text, author and date. Sort by the lowest ratings to read the complaints first.", feature: "product-scraper" },
            { title: "Export a Shopify competitor's whole catalog", body: "If the competitor runs on Shopify, the Shopify store card in the List tab collects every product and variant with prices and SKUs in one run, from the store's own product data.", feature: "shopify-scraper" },
            { title: "Compare in one sheet", body: "Export each collection to Google Sheets or Excel and put them side by side. Every collection stays in History, so next month's run gives you the change.", feature: "export-to-google-sheets", screenshot: "ext/results-export-menu" },
        ],
    },
    sample: {
        caption: "Three rows from a category comparison. Products and numbers are made up.",
        columns: ["Product Name", "Store", "Price", "Original Price", "Rating", "Review Count", "Seller"],
        rows: [
            ["Trail Runner 2 Men's Shoes", "Amazon", "89.00", "110.00", "4.6", "1,204", "Trail Gear Official"],
            ["Trail Runner 2", "trailgear.example", "85.00", "110.00", "4.7", "212", "Trail Gear Co."],
            ["Trail Runner 2 Shoes", "Walmart", "92.00", "", "4.4", "87", "Summit Outdoors"],
        ],
    },
    sites: [{ name: "Amazon", page: "amazon" }, { name: "Walmart" }, { name: "Target" }, { name: "Etsy" }, { name: "Costco" }, { name: "Wayfair" }, { name: "Flipkart" }, { name: "Any Shopify store" }, { name: "Any store with a product list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Check prices every day on its own, or alert you to a change. That's coming with cloud runs; today you run it when you need fresh numbers, and History keeps each run to compare.",
            "Read a competitor's sales or stock levels. It collects what the page shows: prices, ratings, review counts, badges and the stock notes a listing displays.",
            "Collect from a password-protected Shopify store, or from a page you can't open in your browser.",
            "Give you the right to reuse product images, text or reviews. They belong to the store and its reviewers.",
        ],
    },
    guides: ["collect-amazon-search-results", "export-a-shopify-store-catalog", "scrape-data-from-any-website-to-excel"],
    faqs: [
        { q: "Does it work on small independent stores, not only Amazon?", a: "Yes. On a store without a ready-made setup, the product list is detected on the page and the columns are named from the page's own labels. Shopify stores get the full catalog from their product data." },
        { q: "Can I track a competitor's prices over time?", a: "By running the same collection again. Each run is saved in History with its date, so two exports side by side show what changed. Scheduled runs that do this on their own are coming with the cloud." },
        { q: "Can I get the reviews into a sheet with their ratings?", a: "Yes. From a product page, View all reviews collects every review across its pages into a table with rating, title, text, author and date, exported separately from the product." },
        { q: "Is collecting competitor prices allowed?", a: "Prices on a public page are public information, but each marketplace's terms restrict automated collection, and images and text are theirs. Collect for your own research, and check the terms where you sell." },
    ],
};
