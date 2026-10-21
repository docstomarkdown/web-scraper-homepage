import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the etsy.com pack in configs-prod/ (listing cards, Next page) and its
// column mapping (Product Name, Price, Original Price, Discount, Shop Name, Shop Rating, Shop Review Count, Delivery,
// Badges, Sponsored, Item Type, Stock, Listing ID, Shop ID, Product URL, Image URL). Draft until a real run's screenshots
// are in the visuals library.
// Title targets search phrases (2026-10-21): "how to scrape etsy product listings into a spreadsheet".

export const etsy: ScraperPageContent = {
    slug: "etsy",
    category: "online-stores",
    site: { name: "Etsy", url: "https://www.etsy.com" },
    meta: {
        title: "How to Scrape Etsy Product Listings into a Spreadsheet",
        description: "Run a search on Etsy and get every listing as a row: product name, price, original price, discount, shop name, shop rating and review count, delivery and badges, across every page. Free Chrome extension, no code.",
    },
    h1: "How to scrape Etsy product listings into a spreadsheet",
    intro: "Search Etsy, pick the results in the side panel, and set how many pages. You get one row per listing with price, discount, shop and shop rating as named columns. See what a category charges, and which shops lead it, in one sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for linen aprons, after export. Listings and shops are made up.",
        columns: ["Product Name", "Price", "Discount", "Shop Name", "Shop Review Count"],
        rows: [
            ["Linen apron with pockets, natural", "42.00", "20%", "HarborLinenCo", "1,204"],
            ["Washed linen kitchen apron", "38.00", "", "NorthgateTextiles", "532"],
            ["Cross-back linen apron, striped", "46.00", "", "BluebirdStitch", "318"],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "Sixteen columns come from the Etsy setup. A column the search never shows stays out, and prices, ratings and counts are saved as numbers.",
        items: [
            { name: "Product Name, Product URL, Listing ID", description: "The title, the link and the listing id." },
            { name: "Price, Original Price, Discount", description: "The price, the struck-through price during a sale, and the discount shown." },
            { name: "Shop Name, Shop ID, Shop Rating, Shop Review Count", description: "Who sells it, with the shop's star rating and review count as shown on the card." },
            { name: "Delivery", description: "The delivery line, such as free shipping or arrives by a date." },
            { name: "Badges, Sponsored", description: "Labels such as Bestseller, Star Seller or Etsy's Pick, and whether the row is an ad." },
            { name: "Item Type, Stock", description: "Physical or digital, and stock notes such as only 2 left." },
            { name: "Image URL", description: "The listing's main photo." },
        ],
    },
    steps: {
        heading: "How to scrape an Etsy search in three steps",
        items: [
            {
                title: "Search on Etsy",
                body: "Search and filter as you normally would: price, ships from, free shipping, item type. The extension collects what the page shows.",
                points: [
                    "Example: linen apron, filtered to free shipping.",
                    "Sponsored rows are kept and marked. Settings → Results → Skip sponsored products leaves them out.",
                ],
            },
            {
                title: "Pick the list and the pages",
                body: "Open the side panel's List tab and choose the results list. Choose Collect more pages; the Next button is found on its own. Set Stop after and click Collect from 5 pages, or the number you set.",
                points: ["Keep the tab in front. The tab title counts the listings."],
            },
            {
                title: "Review and export",
                body: "Sort by Shop Review Count or Price and remove the columns you don't need. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only name, price, shop and shop review count, sorted by shop review count."],
            },
        ],
    },
    notes: {
        heading: "Good to know about Etsy",
        items: [
            "Shop Rating and Shop Review Count belong to the shop, not the listing. Every listing from one shop shows the shop's numbers.",
            "Etsy shows up to 250 pages per search. For a large category, split by price band or ships-from.",
            "Prices show in the currency Etsy displays to you. Set it on the site before collecting.",
            "Etsy's terms restrict automated collection, and listings' photos and text belong to their sellers. Collect for your own research and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [
        { column: "Original Price, Discount", when: "The listing isn't on sale." },
        { column: "Badges", when: "No Bestseller, Star Seller or Etsy's Pick label." },
        { column: "Stock", when: "Shown only as a note such as Only 2 left." },
        { column: "Delivery", when: "No delivery line on the card." },
        { column: "Shop Rating, Shop Review Count", when: "A new shop with no reviews yet." },
    ],
    pushback: [
        "If Etsy shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again. What was collected is kept.",
        "Loading many pages fast can bring fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.",
        "When Etsy changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    screenshots: ["ext/results-etsy"],
    feature: "list-scraper",
    guide: "collect-store-listings-to-excel",
    useCase: "ecommerce",
    related: ["ebay", "walmart", "amazon"],
    faqs: [
        { q: "Is this Etsy scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Can I scrape one Etsy shop's listings?", a: "Yes. Open the shop's page; its items are a list, so pick it in the List tab and collect every page or section." },
        { q: "Does it get the number of sales for a listing?", a: "Only what the card shows. Etsy's cards show the shop's review count and badges, not per-listing sales. Open a listing and use the Properties tab for its own details." },
        { q: "How do I find the top shops in an Etsy category?", a: "Collect the search, then sort the sheet by Shop Review Count. The shops with the most reviews lead the category." },
        { q: "Why do several listings share the same rating?", a: "Shop Rating and Shop Review Count belong to the shop, not the listing, so every listing from one shop shows the shop's numbers." },
        { q: "Can I scrape Etsy reviews?", a: "The search cards don't show reviews. Open one listing and use the Properties tab, which reads a product page's details and reviews. Etsy reviews haven't been checked in a verified run yet, so look at the first listing's result before a long one." },
        { q: "Can I scrape several Etsy searches at once?", a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings." },
    ],
};
