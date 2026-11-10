import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against chrome-extension-source on 2026-11-10:
// - Columns: configs-prod/site-column-mappings/etsy.com.json (Product Name, Product URL, Listing ID, Shop Name, Shop ID,
//   Price, Original Price, Discount, Shop Rating, Shop Review Count, Delivery, Stock, Badges, Item Type, Sponsored, Image
//   Preview, Image URL).
// - Domains and paging: configs-prod/etsy.com.json (etsy.com and its subdomains; Next page by the pagination arrow).
// - Skip sponsored products applies to store sites like this one: lib/preferences/resultRows.ts, lib/utils/sponsoredRows.ts,
//   components/scraper/ResultsSettingsCards.tsx.
// - Numbers in files: lib/utils/fileNumbers.ts, DECISIONS.md D-033 (Price and Original Price here; Shop Rating and Shop
//   Review Count stay as shown), on by default.
// - Collecting count on a tab group: lib/background/scrapeTabIndicator.ts. Next button ready, Stop after:
//   components/scraper/ListTab.tsx. Properties tab: lib/pdp/.
// - Not stated, because only a run could confirm them: pages per search, listings per page, row counts, whether the
//   Properties tab reads an Etsy listing's reviews (written as a check to make).
// Title targets search phrases (2026-10-21): "how to scrape etsy product listings into a spreadsheet".

export const etsy: ScraperPageContent = {
    slug: "etsy",
    category: "online-stores",
    site: { name: "Etsy", url: "https://www.etsy.com" },
    meta: {
        title: "How to Scrape Etsy Product Listings into a Spreadsheet",
        description: "Run an Etsy search and get every listing as a row: name, price, discount, shop, shop rating, delivery and badges. Free Chrome extension, no code.",
    },
    h1: "How to scrape Etsy product listings into a spreadsheet",
    intro: "Search Etsy, pick the results in the side panel, and set how many pages. You get one row per listing with price, discount, shop and shop rating as named columns. See what a category charges, and which shops lead it, in one sheet.",
    allowed: "Etsy's terms restrict automated collection, and listing photos and descriptions belong to the sellers. This page reads the search results you have open, in your own browser, at a person's pace, for your own product research; don't reuse the images or text. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
    status: "draft",
    lastVerified: "2026-11-10",
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
        intro: "These columns come from the Etsy setup. A column the search never shows stays out. In exported files, Price and Original Price are written as numbers while Settings → Results → Save prices, ratings and counts as numbers is on, as it is by default.",
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
                points: ["Keep the tab in front. While it runs, the tab sits in a group named Collecting with the count so far."],
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
            "Etsy decides how many pages a search runs to. For a large category, split the search by price band or ships-from.",
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
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three Etsy searches worth running",
            paragraphs: [
                "Etsy's search is where buyers find listings, and the three searches below cover common reasons to collect it. Each needs only a few of the columns.",
                "Set the filters on Etsy first: price band, ships from, free shipping, item type. A narrow search gives a cleaner sheet than filtering a long one later.",
            ],
            table: {
                columns: ["Search", "Why run it", "Columns to keep"],
                rows: [
                    ["Your product's keyword, say \"linen apron\", sorted by Etsy's default", "See the price band, the badges and the shops that rank above you", "Product Name, Price, Discount, Shop Name, Badges, Sponsored"],
                    ["A category, filtered to Star Seller or Bestseller badges", "Find the shops that lead a category and what they charge", "Shop Name, Shop Review Count, Shop Rating, Price"],
                    ["A single shop's page", "Size up one competitor's whole range and sale pattern", "Product Name, Price, Original Price, Discount, Stock"],
                ],
                caption: "Three searches and what to keep from each. Shop Review Count is the surest sign of an established shop.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "A worked example: who leads the linen apron category",
            paragraphs: [
                "Here is each step of a run on a search for linen aprons. How many rows you get depends on the search.",
            ],
            steps: [
                { title: "Search.", body: "Type linen apron on etsy.com and tick Free shipping in the filters. Etsy shows the first page of listings with a Next link at the bottom." },
                { title: "Pick the list.", body: "Open the List tab. Under Choose from lists we found, each card is a list on the page with its number of items. Choose the card that holds the search results." },
                { title: "Set the pages.", body: "Choose Collect more pages. The panel reads Next button ready. Set Stop after to 10 pages and click Collect from 10 pages." },
                { title: "Watch the count.", body: "The tab sits in a group named Collecting, and its count climbs page by page. Click Stop at any time; the rows so far are kept." },
                { title: "Open the results.", body: "Sort by Shop Review Count, high to low. The top rows name the shops with the most reviews. Sort by Price for the band the category sells in." },
                { title: "Export.", body: "Click Export as and choose Google Sheets or Excel. Price is written as a number, so a pivot by Shop Name can average it." },
            ],
        },
        {
            id: "what-to-do",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: [
                "The results page is a small spreadsheet of its own. Here are some things to do before exporting.",
            ],
            points: [
                "Find the leading shops: sort by Shop Review Count, high to low. Because the count belongs to the shop, every listing from one shop shows the same number, which makes the leaders stand out.",
                "See what's on sale: click Filter rows and keep rows where Discount is not empty. Original Price next to Price shows the depth of each sale.",
                "Drop the ads: filter rows where Sponsored is empty, or turn on Settings → Results → Skip sponsored products before the next run.",
                "Hide what you don't need: hover a header and click the trash icon, or rename a column with the pencil.",
                "Run it again next week: collect the same search and compare the two exports on Listing ID. New listings and price changes show up in a lookup.",
            ],
        },
        {
            id: "what-etsy-shows",
            eyebrow: "Limits",
            heading: "What an Etsy search shows, and what it doesn't",
            paragraphs: [
                "The extension collects what the search card shows. Etsy's cards carry the shop's rating and review count, not the listing's, and no per-listing sales figure.",
                "For a listing's own details, open it and click Collect details on this page in the Properties tab. Whether an Etsy listing's reviews come through depends on how the page loads them, so look at the first listing's result before you collect more.",
            ],
            points: [
                "Pages: Etsy decides how many pages a search runs to. Split a large category by price band or ships-from to reach more.",
                "Sponsored rows: kept and labelled, or skipped when Settings → Results → Skip sponsored products is on.",
                "Prices and delivery: shown in the currency and for the location Etsy has for you. Set them on Etsy before collecting.",
                "Stock: only the notes Etsy shows on the card, such as Only 2 left.",
                "Item Type: physical or digital, which matters when you compare prices across a category.",
            ],
        },
        {
            id: "compared",
            eyebrow: "Other ways",
            heading: "Compared with Etsy's own tools and copying by hand",
            paragraphs: [
                "For a search you can see, the extension turns every page into one sheet. Etsy's shop stats cover your own listings, not a competitor's search, and copying cards by hand loses prices and counts as numbers.",
            ],
            table: {
                columns: ["Method", "What you get", "Where it falls short"],
                rows: [
                    ["This extension", "Every page of the search as named columns, including the shop's rating and review count, in your own browser, free", "A verification page stops the run until you complete it; no per-listing sales figure, because the card has none"],
                    ["Etsy's shop stats", "Views, visits and orders for your own shop", "Nothing about other shops' prices, badges or review counts"],
                    ["Copying by hand", "Whatever you have the patience for", "Prices paste as text, sponsored rows mix in, and a second run next week starts from zero"],
                ],
            },
        },
    ],
    screenshots: ["ext/results-etsy"],
    feature: "list-scraper",
    useCase: "ecommerce",
    related: ["ebay", "walmart", "amazon"],
    faqs: [
        { q: "Is this Etsy scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "How do I scrape Etsy listings without code?", a: "Run the search, open the List tab, pick the results list, choose Collect more pages and set Stop after. The Etsy setup names the columns, so the sheet is ready to sort by price or shop." },
        { q: "Can I scrape one Etsy shop's listings?", a: "Yes. Open the shop's page; its items are a list, so pick it in the List tab and collect every page or section." },
        { q: "Does it get the number of sales for a listing?", a: "Only what the card shows. Etsy's cards show the shop's review count and badges, not per-listing sales. Open a listing and use the Properties tab for its own details." },
        { q: "How do I find the top shops in an Etsy category?", a: "Collect the search, then sort the sheet by Shop Review Count. The shops with the most reviews lead the category." },
        { q: "Why do several listings share the same rating?", a: "Shop Rating and Shop Review Count belong to the shop, not the listing, so every listing from one shop shows the shop's numbers." },
        { q: "Can I scrape Etsy reviews?", a: "The search cards don't show reviews. Open one listing and use the Properties tab, which reads a product page's details and reviews. Whether an Etsy listing's reviews come through depends on how the page loads them, so look at the first listing's result before you collect more." },
        { q: "Can I scrape several Etsy searches at once?", a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings. View merged table puts them in one sheet." },
        { q: "Is scraping Etsy allowed?", a: "Etsy's terms restrict automated collection, and listing photos and text belong to their sellers. Collect for your own research, keep it to what the public page shows, and read our plain-words explainer on web scraping and the law at /web-scraping-legal. It isn't legal advice." },
    ],
};
