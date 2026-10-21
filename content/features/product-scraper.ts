import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Properties tab "Collect details on this page", "View product data", "Fix or add a field", saved layouts per
//   site: components/scraper/PropertiesTab.tsx
// - 15 standard fields (Image Gallery, Title, Product URL, Brand, Current Price, MRP, Discount, Rating, Review
//   Count, Availability, Delivery Info, Seller, Selected Variant, Offers, Reviews): lib/pdp/constants.ts
// - Site-specific extra fields: DECISIONS.md D-014; built-in profiles for 17 platforms: configs-prod/pdp-selectors/
// - Reviews across pages by auto-scroll or a mapped button, "View all reviews", exported separately:
//   lib/pdp/reviewsExtraction.ts
// - Chat "collect the product details"; on a list page it offers the list instead: lib/tools/capabilityTools.ts
// Title and headings target what people type ("how to scrape amazon product data", "how to scrape amazon
// reviews", "scrape product prices"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md, 2026-10-21.

export const productScraper: FeaturePageContent = {
    page: getPage("product-scraper"),
    meta: {
        title: "How to Scrape Amazon Product Data and Reviews: Free Extension",
        description:
            "Open a product on Amazon, Walmart, Flipkart or most online stores and get its price, list price, discount, rating, seller, variant and images in named fields, then every review across pages. Free, no code.",
    },
    eyebrow: "Product scraper",
    h1: "How to scrape product data and reviews from Amazon and other stores",
    intro:
        "Open a product page in Chrome. Click once. Its price, list price, discount, rating, availability, seller, variant and images land in named fields. Then collect every review, across all the review pages, into a sheet.",
    lastUpdated: "2026-10-20",
    sample: {
        caption: "One product's details, after export. The product is made up.",
        columns: ["Title", "Current Price", "MRP", "Rating", "Review Count"],
        rows: [
            ["Trail Runner 2 Shoes, Black", "$89.00", "$110.00", "4.6", "1,204"],
            ["Summit Rain Jacket, Blue", "$74.50", "$95.00", "4.3", "318"],
            ["Basecamp Socks, 3 pack", "$18.00", "$18.00", "4.7", "2,045"],
        ],
    },
    steps: {
        heading: "How to scrape a product page in three steps",
        intro: "Amazon, Flipkart, Myntra, Walmart and other big stores have built-in profiles. Other stores are read from the page's own labels.",
        items: [
            {
                title: "Open the product page",
                body: "Go to the product in Chrome. Click the Web Scraper Pro icon and open the Properties tab.",
                points: ["Or type in the Chat tab: Collect this product."],
            },
            {
                title: "Click Collect details on this page",
                body: "The fields fill in from the page. Click View product data to see them.",
                points: [
                    "A field wrong or missing? Click Fix or add a field and click the right spot on the page. The fix is remembered for that site.",
                    "Pick another size or colour on the page and collect again for that variant's price.",
                ],
            },
            {
                title: "Collect the reviews, then export",
                body: "Click View all reviews. The extension scrolls or clicks through the review pages until the end, or until you stop it. Reviews land in their own table with rating, title, text, author and date.",
                points: ["Click Export as for Excel, CSV, JSON or Google Sheets. The product and its reviews export separately."],
            },
        ],
    },
    fields: {
        heading: "What you get for every product",
        intro: "Every product page is read into the same fields, so products from different stores line up in one sheet.",
        items: [
            { name: "Title, Brand, Product URL", description: "The product's name, brand and page address." },
            { name: "Current Price, MRP, Discount", description: "The selling price, the list price and the gap between them, saved as numbers." },
            { name: "Rating, Review Count", description: "The star rating and how many reviews it has." },
            { name: "Availability, Delivery Info", description: "Whether it's in stock, and the delivery information the page shows." },
            { name: "Seller", description: "Who sells it." },
            { name: "Selected Variant, Offers", description: "The size or colour selected on the page, and the offers or coupons shown." },
            { name: "Image Gallery", description: "The URLs of every image, and videos where the page has them." },
            { name: "Reviews", description: "Every review's rating, title, text, author and date, in their own table." },
            { name: "Site extras", description: "Stores with a built-in profile add their own fields, such as a best-seller rank." },
        ],
    },
    sections: [
        {
            id: "reviews",
            eyebrow: "Reviews",
            heading: "How to scrape all the reviews of a product",
            paragraphs: [
                "Click View all reviews on the product's fields. The extension pages through the reviews by scrolling, or by the button you point at once, until the store has no more to show.",
                "Stores that cap how many reviews they show cap the collection too. Each review keeps its rating, title, text, author and date, so you can sort a sheet by rating and read what buyers say.",
            ],
        },
        {
            id: "many-products",
            eyebrow: "Many products",
            heading: "How to scrape many product pages at once",
            paragraphs: [
                "Paste the product addresses into Bulk scrape. Each page's details are collected in turn and merged into one table. Reviews are collected one product at a time.",
                "For a whole category, collect the category page with Lists from any website for one row per product. For every product in a Shopify store, use the Shopify scraper.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Two settings that change the result",
            paragraphs: ["Both sit under Settings → Results."],
            points: [
                "Save prices, ratings and counts as numbers: on. A spreadsheet can then sort and compare them.",
                "Suggested format: the export format shown first. The last one you used, by default.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When a product page pushes back",
            heading: "Reviews behind a button, and pages that need a sign-in",
            paragraphs: ["A product page is read as you see it. Two things stop it: a hidden review list and a page you can't see."],
            points: [
                "A store that shows reviews only after a See more or Load more click asks you to point at that button once. Then it pages through on its own.",
                "A page that shows prices or reviews only when you're signed in shows them to the extension once you've signed in.",
                "A verification page? Complete it in the tab and collect again.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It reads the variant selected on the page. Pick another and collect again; each collection is saved in History.",
            "Reviews come from the page's own review list. Stores that show them only after a click need that button pointed at once.",
            "The product's images, text and reviews belong to the store and its reviewers. Check the store's terms before reusing them.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Price checks", body: "The same products from several stores, with current price, list price and seller, side by side." },
            { title: "Review analysis", body: "Every review of a product in a sheet, to sort by rating and read what buyers say." },
            { title: "Listing research", body: "A competitor's title, images, offers and variants before you write your own listing." },
            { title: "Catalog building", body: "Product details and images gathered page by page for a new store." },
        ],
    },
    faqs: [
        {
            q: "Is this product scraper free?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create.",
        },
        {
            q: "Which stores does it work on?",
            a: "Most online stores. Amazon, Flipkart, Myntra, Walmart and other large stores have built-in profiles. On other stores the standard fields are read from the page, and you can fix a field by pointing at it once.",
        },
        {
            q: "Can I scrape Amazon reviews, all of them?",
            a: "All that the page can show. Click View all reviews and it pages through until the end, or until you stop it. The reviews are saved as their own table and export separately.",
        },
        {
            q: "Will Amazon block me?",
            a: "It reads the page you have open, in your own browser, at a person's pace. If a store shows a verification page, complete it in the tab and collect again.",
        },
        {
            q: "Can I scrape many product pages at once?",
            a: "Yes. Paste the product addresses into Bulk scrape and each page's details are collected in turn into one table. Reviews are collected one product at a time.",
        },
        {
            q: "Does it get every variant's price?",
            a: "It reads the variant selected on the page. Pick another size or colour and collect again; each collection is saved in History.",
        },
        {
            q: "Can I get a whole category, not one product?",
            a: "Yes. Collect the category page with Lists from any website for one row per product. For every product in a Shopify store, use the Shopify scraper.",
        },
    ],
    related: ["list-scraper", "shopify-scraper", "image-downloader", "export-to-google-sheets", "ai-chat"],
};
