import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Properties tab "Collect details on this page", "View product data", "Fix or add a field", saved layouts per
//   site: components/scraper/PropertiesTab.tsx
// - 15 standard fields (Image Gallery, Title, Product URL, Brand, Current Price, MRP, Discount, Rating, Review
//   Count, Availability, Delivery Info, Seller, Selected Variant, Offers, Reviews): lib/pdp/constants.ts
// - Site-specific extra fields: DECISIONS.md D-014; built-in profiles for 17 platforms: configs-prod/pdp-selectors/
//   (allegro, amazon, asos, booking, cargurus, costco, ebay, etsy, flipkart, g2, myntra, samsclub, target,
//   tripadvisor, trustpilot, walmart, yelp)
// - Reviews across pages by auto-scroll or a mapped button ("View all reviews", "Collect reviews", "Select how more
//   reviews open"), exported separately: lib/pdp/reviewsExtraction.ts, PropertiesTab.tsx
// - Chat "collect the product details"; on a list page it offers the list instead: lib/tools/capabilityTools.ts
// - Numbers as numbers and the suggested export format: Settings → Results (D-033)
// - Bulk scrape has list, Google Maps, Scholar, contacts and page-text modes (lib/bulk/executors/); it has no
//   product-details mode, so this page no longer claims product details from a bulk run (removed 2026-10-21).
//   Verify before restoring that claim.
// Title and headings target what people type ("how to scrape amazon product data", "how to scrape amazon
// reviews", "scrape product prices"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md, 2026-10-21.
// Deepened 2026-10-21 (owner: pages too thin): worked example, what to do with the table, settings, methods
// compared, what it doesn't do, when it goes wrong, FAQs to ten. Facts from the sources above only.

export const productScraper: FeaturePageContent = {
    page: getPage("product-scraper"),
    meta: {
        title: "How to Scrape Amazon Product Data and Reviews, Free",
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
                body: "Click View all reviews, then Collect reviews. The extension scrolls or clicks through the review pages until the end, or until you stop it. Reviews land in their own table with rating, title, text, author and date.",
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
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "One running shoe, three stores, every review",
            paragraphs: [
                "Say you sell running shoes and want to know how a rival's best-known model is priced and reviewed before you write your own listing. The product is sold on Amazon, Walmart and the brand's own store. Here is the job, with made-up numbers for the shoe.",
            ],
            steps: [
                { title: "Open the Amazon listing and click Collect details on this page.", body: "Fifteen fields fill in: Title, Brand, Current Price $89.00, MRP $110.00, Discount, Rating 4.6, Review Count 1,204, Availability, Delivery Info, Seller, Selected Variant Black / 9, Offers, Image Gallery with eight image addresses, Product URL. Amazon's profile adds its own extras, such as the best-seller rank." },
                { title: "Do the same on Walmart and the brand's store.", body: "The same field names fill in, so the three collections line up when you put them in one sheet. On the brand's store, a field the page labels differently gets fixed once with Fix or add a field, and the fix is kept for that site." },
                { title: "Back on Amazon, click View all reviews, then Collect reviews.", body: "The extension pages through the reviews until Amazon has no more to show, or until you click Stop. Each review keeps its rating, title, text, author and date." },
                { title: "Export the reviews and sort by Rating.", body: "The one- and two-star reviews tell you what to fix; the three-star reviews are where buyers say what they wanted. The product table exports separately, from History." },
                { title: "Change the size on the page and collect again.", body: "Each variant you select is a new collection in History, with its own Current Price and Availability." },
            ],
        },
        {
            id: "use-the-table",
            eyebrow: "What you can do with the table",
            heading: "Four things people do with product and review exports",
            paragraphs: ["The fields are the same on every store, which is what makes the first two possible."],
            table: {
                columns: ["Job", "How", "Fields that matter"],
                rows: [
                    ["Compare one product across stores", "Collect it on each store, export each from History, put the rows in one sheet", "Current Price, MRP, Seller, Availability, Product URL"],
                    ["Find what buyers complain about", "Export the reviews, sort by Rating, read the one- to three-star rows", "Rating, Title, Text, Date"],
                    ["Watch a price over time", "Collect the same page weekly; each collection is dated in History", "Current Price, Discount, Offers"],
                    ["Write a better listing", "Collect a top competitor's page and read its title, images, offers and variants", "Title, Image Gallery, Offers, Selected Variant"],
                ],
            },
        },
        {
            id: "reviews",
            eyebrow: "Reviews",
            heading: "How to scrape all the reviews of a product",
            paragraphs: [
                "Click View all reviews on the product's fields, then Collect reviews. The extension pages through the reviews by scrolling, or by the button you point at once, until the store has no more to show.",
                "Stores that cap how many reviews they show cap the collection too. Each review keeps its rating, title, text, author and date, so you can sort a sheet by rating and read what buyers say.",
                "If a store shows more reviews only after a Show more or Next click, the panel asks you to click that button once with Select how more reviews open. From then on it pages through on its own.",
            ],
        },
        {
            id: "many-products",
            eyebrow: "Many products",
            heading: "How to scrape many product pages",
            paragraphs: [
                "A product page is collected from the Properties tab, one page at a time, and every collection is saved in History. For ten products, that's ten clicks; for the reviews of each, one more click apiece.",
                "For a whole category, collect the category page with Lists from any website for one row per product, with price, rating and link from the cards. For every product in a Shopify store, use the Shopify scraper, which reads the whole catalog in one go.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Two settings that change the result",
            paragraphs: ["Both sit under Settings → Results. A third habit matters as much: fix a field once, and the fix is kept for that site."],
            table: {
                columns: ["Setting", "Default", "What it changes"],
                rows: [
                    ["Save prices, ratings and counts as numbers", "On", "$89.00 exports as 89, and 1,204 as 1204, so a spreadsheet can sort and compare them. Off, they stay as the page shows them."],
                    ["Suggested format", "The last one you used", "Which export format shows first on the results page."],
                    ["Fix or add a field (per site)", "Nothing saved", "Where a field was read from, on that site. The next product on the same site uses the fix."],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Other ways to do it",
            heading: "Compared with copying by hand, writing a script, or a price-tracking service",
            paragraphs: [
                "For product research you do yourself, in your own browser, the extension is the quickest route and reads reviews the stores keep behind sign-in. A script or a service earns its place when prices must be checked every hour without you.",
            ],
            table: {
                columns: ["Route", "Good for", "Where it falls short"],
                rows: [
                    ["Web Scraper Pro", "Any product page you can open, with every review, in named fields", "One page at a time; no scheduled checks until cloud runs ship"],
                    ["Copying by hand", "One or two products", "Reviews run to thousands of rows; prices change before you finish"],
                    ["A script", "Developers who need the data inside their own system", "Stores change their pages and block scripts; reviews behind sign-in come back empty"],
                    ["A price-tracking service", "Hourly price alerts on a few products", "Prices only, no reviews or images, and a monthly fee"],
                ],
            },
        },
        {
            id: "cant-do",
            eyebrow: "Honest limits",
            heading: "What it doesn't do",
            paragraphs: ["Each of these is a real limit of reading a page as you see it."],
            points: [
                "It reads the variant selected on the page. Every size or colour needs its own collection.",
                "It gives you the price now, not a price history. A history is two collections, a week apart, in History.",
                "Reviews stop where the store stops showing them. A store that shows 100 of 1,204 gives 100.",
                "A page that hides prices or reviews until you sign in shows them to the extension only after you've signed in. It never signs in for you.",
                "Product pages aren't collected in a bulk run. Bulk scrape handles list pages, Google Maps searches, contact details and page text.",
                "No scheduled checks until cloud runs ship.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When it goes wrong",
            heading: "Reviews behind a button, pages that need a sign-in, and fields that come back wrong",
            paragraphs: ["A product page is read as you see it. When something's off, it's usually one of these."],
            points: [
                "A field is empty or wrong. Click Fix or add a field and click the right spot on the page. The fix is remembered for that site.",
                "Reviews don't move past the first page. The store needs a Show more or Next click. Click Select how more reviews open and point at that button once.",
                "The price is for the wrong variant. Pick the size or colour on the page first, then collect again.",
                "A verification page appears. Complete it in the tab and collect again.",
                "The Properties tab offers the list instead. You're on a category page, not a product page. Open one product, or collect the list.",
                "Numbers export as text. Turn on Save prices, ratings and counts as numbers under Settings → Results.",
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
            a: "Most online stores. Amazon, Flipkart, Myntra, Walmart, eBay, Etsy, Target, Costco and other large stores have built-in profiles. On other stores the standard fields are read from the page, and you can fix a field by pointing at it once.",
        },
        {
            q: "Can I scrape Amazon reviews, all of them?",
            a: "All that the page can show. Click View all reviews, then Collect reviews, and it pages through until the end, or until you stop it. The reviews are saved as their own table and export separately.",
        },
        {
            q: "Will Amazon block me?",
            a: "It reads the page you have open, in your own browser, at a person's pace. If a store shows a verification page, complete it in the tab and collect again.",
        },
        {
            q: "Can I scrape many product pages at once?",
            a: "One at a time, from the Properties tab; each collection is saved in History. For a whole category, collect the category page as a list, and for a Shopify store use the Shopify scraper.",
        },
        {
            q: "Does it get every variant's price?",
            a: "It reads the variant selected on the page. Pick another size or colour and collect again; each collection is saved in History.",
        },
        {
            q: "Can I get a whole category, not one product?",
            a: "Yes. Collect the category page with Lists from any website for one row per product. For every product in a Shopify store, use the Shopify scraper.",
        },
        {
            q: "Does it track price changes over time?",
            a: "Not on its own yet. Collect the page whenever you want a reading; each collection is dated in History, and two exports side by side show the change. Scheduled checks come with cloud runs.",
        },
        {
            q: "Can I scrape reviews that only show after I sign in?",
            a: "Yes, once you've signed in. The extension reads the page you see, so reviews that appear after sign-in are collected like any other. It never signs in for you.",
        },
        {
            q: "Which review fields do I get?",
            a: "Rating, title, text, author and date for each review, in their own table. Sort by rating in the export to read the critical ones first.",
        },
    ],
    related: ["list-scraper", "shopify-scraper", "image-downloader", "export-to-google-sheets", "ai-chat"],
};
