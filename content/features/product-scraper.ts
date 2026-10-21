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

export const productScraper: FeaturePageContent = {
    page: getPage("product-scraper"),
    meta: {
        title: "Product Scraper: Details, Variants, Images and Reviews",
        description:
            "Collect a product page's price, discount, rating, availability, seller, variants and images, and every customer review across pages, into a spreadsheet.",
    },
    eyebrow: "Product details and reviews",
    h1: "Collect a product page, reviews included",
    intro:
        "Open a product on Amazon, Flipkart, Walmart or most online stores, click once, and get its details in named fields. Then collect every review, across all the review pages.",
    lastUpdated: "2026-10-20",
    sample: {
        caption: "One product's details as exported. The product is made up.",
        columns: ["Title", "Brand", "Current Price", "MRP", "Discount", "Rating", "Review Count", "Availability", "Seller"],
        rows: [["Trail Runner 2 Shoes, Black", "Trail Gear Co.", "$89.00", "$110.00", "19%", "4.6", "1,204", "In stock", "Trail Gear Official"]],
    },
    fields: {
        heading: "Fifteen standard fields, plus the site's own",
        intro: "Every product page is read into the same fields, so products from different stores line up in one sheet. Sites with a ready-made profile add their own extras.",
        items: [
            { name: "Title, brand and URL", description: "The product's name, brand and its page address." },
            { name: "Prices", description: "The current price, the list price (MRP) and the discount between them, saved as numbers." },
            { name: "Rating and review count", description: "The star rating and how many reviews it has." },
            { name: "Availability, delivery and seller", description: "Whether it's in stock, the delivery information shown, and who sells it." },
            { name: "Variant and offers", description: "The variant you have selected, and the offers or coupons shown on the page." },
            { name: "Images and videos", description: "The image gallery's URLs, and videos where the page has them." },
            { name: "Reviews", description: "Every review's text, rating, author and date, collected across pages into their own table." },
        ],
    },
    steps: {
        heading: "One product in three clicks",
        items: [
            {
                title: "Open the product page",
                body: "Go to the product in Chrome and open the side panel's Properties tab.",
            },
            {
                title: "Click Collect details on this page",
                body: "The fields fill in from the page. Click View product data to see them. If a field is wrong or missing, click Fix or add a field and click the right spot on the page; the fix is saved for that site.",
            },
            {
                title: "Collect the reviews, then export",
                body: "Click View all reviews to collect the reviews across their pages, by scrolling or by the button you point at. Export the product and its reviews to Excel, CSV, JSON or Google Sheets.",
            },
        ],
    },
    sections: [
        {
            id: "stores",
            eyebrow: "Stores",
            heading: "Ready-made for the big stores, workable on the rest",
            paragraphs: [
                "Amazon, Flipkart, Myntra, Walmart and other large stores have built-in profiles that know where each field sits. On other stores the standard fields are read from the page's own labels, and Fix or add a field corrects anything that's off.",
            ],
        },
        {
            id: "ask",
            eyebrow: "Or ask instead",
            heading: "\"Collect the product details\"",
            paragraphs: [
                "In the Chat tab, ask for the product details and it runs the same collection. Ask on a category page and chat offers to collect the list instead.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It collects one product page at a time, plus its reviews. For a whole category, use Lists from any website; for every product in a Shopify store, use Shopify store export.",
            "Reviews are collected from the page's own review list. Stores that show reviews only after a click need that button pointed at once.",
            "The product's images, text and reviews belong to the store and its reviewers. Check the store's terms before reusing them.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Price checks", body: "The same products from several stores, with current price, list price and seller, side by side." },
            { title: "Review analysis", body: "Every review of a product in a sheet, to sort by rating and read what buyers say." },
            { title: "Listing research", body: "A competitor's title, images, offers and variants before you write your own listing." },
            { title: "Catalog building", body: "Product details and images gathered one page at a time for a new store." },
        ],
    },
    faqs: [
        {
            q: "Which stores does it work on?",
            a: "Most online stores. Large ones such as Amazon, Flipkart, Myntra and Walmart have built-in profiles. On other stores the standard fields are detected from the page, and you can fix a field by pointing at it once.",
        },
        {
            q: "Does it collect all the reviews or only the first page?",
            a: "All of them that the page can show: it scrolls or clicks through the review pages until the end, or until you stop it. The reviews are saved as their own table and can be exported separately.",
        },
        {
            q: "Can I collect many products at once?",
            a: "Collect the category page with Lists from any website for one row per product, or the whole store with Shopify store export. Product pages themselves are collected one at a time.",
        },
        {
            q: "Is this included in the plan?",
            a: "Yes. Product details and reviews are part of the one plan, Pro.",
        },
    ],
    related: ["list-scraper", "shopify-scraper", "image-downloader", "export-to-google-sheets", "ai-chat"],
};
