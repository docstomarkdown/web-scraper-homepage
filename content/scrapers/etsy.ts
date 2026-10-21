import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the etsy.com pack in configs-prod/ (listing cards, Next page) and its
// column mapping (Product Name, Price, Original Price, Discount, Shop Name, Shop Rating, Shop Review Count, Delivery,
// Badges, Sponsored, Item Type, Stock, Listing ID, Shop ID, Product URL, Image URL). Draft until a real run's screenshots
// are in the visuals library.

export const etsy: ScraperPageContent = {
    slug: "etsy",
    category: "online-stores",
    site: { name: "Etsy", url: "https://www.etsy.com" },
    meta: {
        title: "Etsy Scraper: Listings to a Spreadsheet, with Shop Ratings and Discounts",
        description: "Collect an Etsy search or category into a spreadsheet: product name, price, original price, discount, shop name, shop rating and review count, delivery and badges, across every page, with no code.",
    },
    h1: "Collect Etsy listings into a spreadsheet",
    intro: "Search Etsy, pick the results in the side panel, set how many pages, and get one row per listing with price, discount, shop and shop rating as named columns. See what a niche charges, and which shops lead it, in a sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for linen aprons, after export. Listings and shops are made up.",
        columns: ["Product Name", "Price", "Original Price", "Discount", "Shop Name", "Shop Rating", "Shop Review Count", "Badges"],
        rows: [
            ["Linen apron with pockets, natural", "42.00", "52.50", "20%", "HarborLinenCo", "4.9", "1,204", "Bestseller"],
            ["Washed linen kitchen apron", "38.00", "", "", "NorthgateTextiles", "4.8", "532", "Free shipping"],
            ["Cross-back linen apron, striped", "46.00", "", "", "BluebirdStitch", "5.0", "318", "Star Seller"],
        ],
    },
    fields: {
        heading: "Sixteen columns from each listing card",
        intro: "The columns come from the Etsy setup. A column the search never shows stays out; prices, ratings and counts are saved as numbers.",
        items: [
            { name: "Product Name, Product URL, Listing ID", description: "The listing's title, link and id." },
            { name: "Price, Original Price, Discount", description: "The price, the struck-through price during a sale, and the discount shown." },
            { name: "Shop Name, Shop ID, Shop Rating, Shop Review Count", description: "Who sells it, with the shop's star rating and review count as shown on the card." },
            { name: "Delivery", description: "The delivery line, such as free shipping or arrives by a date." },
            { name: "Badges, Sponsored", description: "Labels such as Bestseller, Star Seller or Etsy's Pick, and whether the row is an ad." },
            { name: "Item Type, Stock", description: "Physical or digital, and stock notes such as only 2 left." },
            { name: "Image URL", description: "The listing's main photo." },
        ],
    },
    steps: {
        heading: "Search, pick, collect",
        items: [
            { title: "Search on Etsy", body: "Search and filter as you normally would: price, ships from, free shipping, item type. The extension collects what the page shows." },
            { title: "Pick the list and the pages", body: "Open the side panel's List tab, choose the results list, then Collect more pages. The Next button is found on its own; set Stop after and click Collect from N pages." },
            { title: "Review and export", body: "Sort by Shop Review Count or Price, remove columns you don't need, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Etsy specifics",
        items: [
            "Shop Rating and Shop Review Count belong to the shop, not the listing; Etsy's cards show the shop's numbers.",
            "Sponsored listings are kept and labelled; turn on Skip sponsored products in Settings → Results to leave them out.",
            "Etsy shows up to 250 pages per search. For a large category, split by price band or ships-from.",
            "Prices show in the currency Etsy displays to you; set it on the site before collecting.",
            "Etsy's terms restrict automated collection, and listings' photos and text belong to their sellers. Collect for your own research and check the terms before reusing anything.",
        ],
    },
    screenshots: ["ext/results-etsy"],
    feature: "list-scraper",
    guide: "collect-store-listings-to-excel",
    useCase: "ecommerce",
    related: ["ebay", "walmart", "amazon"],
    faqs: [
        { q: "Can I collect a single shop's listings?", a: "Yes. Open the shop's page; its items are a list, so pick it in the List tab and collect every page or section." },
        { q: "Does it get the number of sales for a listing?", a: "Only what the card shows. Etsy's cards show the shop's review count and badges rather than per-listing sales; open a listing and use the Properties tab for its own details." },
        { q: "Can I find the top shops in a niche?", a: "Collect the search, then sort the sheet by Shop Review Count; the shops with the most reviews lead the niche." },
        { q: "Can I run several searches at once?", a: "Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings." },
    ],
};
