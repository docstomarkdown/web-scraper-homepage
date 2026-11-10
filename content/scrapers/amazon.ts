import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against chrome-extension-source on 2026-11-10:
// - Search-result columns: configs-prod/site-column-mappings/amazon.com.json and the 18 other country-store files, list rules
//   (Product Name, Product URL, Price, Original Price, Discount Percentage, Coupon, Price With Coupon, Rating, Review Count,
//   Bought In Past Month, Delivery Fee, Delivery Date, Fastest Delivery, Stock, Sponsored, Badge, Image URL, among others).
//   ASIN and Brand are product-page carousel columns only (pdp rules; lib/platform/hooks/amazon.ts AMAZON_CAROUSEL_COLUMNS),
//   so this page doesn't name them for a search.
// - Every country store: configs-prod/amazon.json domains (*amazon.*); Next page: a.s-pagination-next in the same file.
// - Numbers in files: lib/utils/fileNumbers.ts and DECISIONS.md D-033 (Price, Original Price, Rating, Review Count), the
//   setting "Save prices, ratings and counts as numbers", on by default (components/scraper/ResultsSettingsCards.tsx).
// - Skip sponsored products, Hide mostly empty columns: components/scraper/ResultsSettingsCards.tsx.
// - Collecting count on a tab group: lib/background/scrapeTabIndicator.ts. Next button ready, Collect from N pages, Stop
//   after: components/scraper/ListTab.tsx. Search in table, row numbers: entrypoints/dataviewer/main.tsx.
// - Product pages and reviews: lib/pdp/ (Properties tab, View all reviews).
// - Not stated, because only a run could confirm them: pages per search, products per page, row counts, run times.
// Title targets search phrases (2026-10-21): "scraping product data from amazon website into excel"; /product-scraper owns
// "how to scrape amazon product data and reviews", the guides own "product listings into Excel", "Best Sellers" and
// "reviews into Excel", so this page is about search and category results.

export const amazon: ScraperPageContent = {
    slug: "amazon",
    category: "online-stores",
    site: { name: "Amazon", url: "https://www.amazon.com" },
    meta: {
        title: "How to Scrape Amazon Search Results into a Spreadsheet",
        description: "Run an Amazon search and get every result as a row: name, price, rating, review count, badges and link, across pages. Free Chrome extension, no code.",
    },
    h1: "How to scrape Amazon search results into a spreadsheet",
    intro: "Run a search on Amazon, pick the list in the side panel, and set how many pages. You get one row per product with named columns. The same setup works in Amazon's country stores, from .com to .co.jp.",
    allowed: "Amazon's conditions of use restrict automated collection, and it shows a verification page when many result pages load quickly. This page reads the search results you have open, in your own browser, at a person's pace, for your own research; Amazon's images and text stay Amazon's. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
    status: "draft",
    lastVerified: "2026-11-10",
    version: "1.3.0",
    sample: {
        caption: "A search for trail running shoes, after export. Products and numbers are made up.",
        columns: ["Product Name", "Price", "Original Price", "Rating", "Review Count"],
        rows: [
            ["Trail Runner 2 Men's Shoes", "89.00", "110.00", "4.6", "1,204"],
            ["Ridge Trail Shoes, Waterproof", "129.00", "", "4.8", "532"],
            ["Lightweight Trail Runners", "64.99", "79.99", "4.3", "318"],
        ],
    },
    fields: {
        heading: "What you get for every product",
        intro: "These columns come from the Amazon setup, which names a few more, such as Delivery Fee and Product Subtitle. A column the search never shows stays out. In exported files, Price, Original Price, Rating and Review Count are written as numbers while Settings → Results → Save prices, ratings and counts as numbers is on, as it is by default.",
        items: [
            { name: "Product Name, Product URL", description: "The title and the link to the product." },
            { name: "Price, Original Price, Discount Percentage", description: "The current price, the struck-through price and the gap between them." },
            { name: "Coupon, Price With Coupon", description: "When a coupon is offered on the listing." },
            { name: "Rating, Review Count", description: "The star rating and the number of ratings." },
            { name: "Bought In Past Month", description: "The \"N+ bought in past month\" line, when Amazon shows it." },
            { name: "Delivery Fee, Delivery Date, Fastest Delivery, Stock", description: "The delivery lines and any stock note." },
            { name: "Sponsored, Badge", description: "Whether the row is an ad, and labels such as Best Seller or Amazon's Choice." },
            { name: "Image URL", description: "The listing's image." },
        ],
    },
    steps: {
        heading: "How to scrape an Amazon search in three steps",
        items: [
            {
                title: "Run the search on Amazon",
                body: "Search and filter as you normally would. The extension collects what the page shows, so a price range or a Prime filter shapes the list.",
                points: [
                    "Example: trail running shoes, with the filters you'd use anyway.",
                    "Sponsored rows are kept and marked. Settings → Results → Skip sponsored products leaves them out.",
                ],
            },
            {
                title: "Pick the list and the pages",
                body: "Open the side panel's List tab and choose the results list. Choose Collect more pages; the Next button is found on its own. Set Stop after and click Collect from 5 pages, or the number you set.",
                points: [
                    "Keep the tab in front. While it runs, the tab sits in a group named Collecting with the count so far.",
                ],
            },
            {
                title: "Review and export",
                body: "Rename or remove columns and filter rows. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only name, price, rating and review count, rows rated above 4, sorted by price."],
            },
        ],
    },
    notes: {
        heading: "Good to know about Amazon",
        items: [
            "Every country store uses the same setup: .com, .co.uk, .de, .in, .ae, .ca, .co.jp and the rest. 19 of them have named columns; on any other, the columns are named from the page.",
            "A search page shows a product's rating and review count, not the reviews. For the reviews, open the product page and use the Properties tab.",
            "Amazon decides how many pages a search runs to. If a search ends before you have enough, run narrower searches or categories.",
            "Amazon's terms restrict automated collection, and product images and text are theirs. Collect for your own research and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [
        { column: "Original Price, Discount Percentage", when: "No struck-through price on the listing." },
        { column: "Coupon, Price With Coupon", when: "No coupon offered." },
        { column: "Bought In Past Month", when: "Amazon shows the line on some listings only." },
        { column: "Delivery Date", when: "Shown mostly for Prime-eligible items." },
        { column: "Badge", when: "No Best Seller, Amazon's Choice or similar label." },
        { column: "Price", when: "A listing with several offers shows a range or no price until opened." },
    ],
    pushback: [
        "If Amazon shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again. What was collected is kept.",
        "Loading many pages fast can bring fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.",
        "When Amazon changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
        "The country stores use the same setup, so a verification on one behaves the same way.",
    ],
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three Amazon searches worth running",
            paragraphs: [
                "The search you run decides the sheet you get. These three cover common reasons to collect Amazon results, and each needs only a few of the columns.",
                "Set the filters on Amazon first. A price band, a brand or a star rating narrows the list before it's collected, which is quicker than filtering a long sheet afterwards.",
            ],
            table: {
                columns: ["Search", "Why run it", "Columns to keep"],
                rows: [
                    ["Your own product's keyword, say \"trail running shoes\", sorted by Amazon's default", "See who ranks above you, their prices and badges", "Product Name, Price, Rating, Review Count, Badge, Sponsored"],
                    ["A category page, such as Men's Trail Running Shoes, filtered to 4 stars and up", "Size up a category before you source or list a product", "Product Name, Price, Original Price, Review Count, Bought In Past Month"],
                    ["The same keyword on amazon.co.uk, amazon.de or amazon.in", "Compare one product's price across stores", "Product Name, Product URL, Price, Delivery Date"],
                ],
                caption: "Three searches and what to keep from each. Amazon's product id, the ASIN, is the 10 characters after /dp/ in a product link.",
            },
        },
        {
            id: "rank",
            eyebrow: "Your own listing",
            heading: "Find where your product ranks",
            paragraphs: [
                "Search your keyword the way a shopper would, collect the first few pages, and your listing's row number is its position. Sponsored rows are kept and labelled, so you can see which rows above you are ads and which rank on their own.",
            ],
            steps: [
                { title: "Search the keyword on Amazon with no filters.", body: "Use the country store your buyers use. Filters change the order, so leave them off for a rank check." },
                { title: "Collect 3 pages.", body: "Open the List tab, pick the results, choose Collect more pages, set Stop after to 3 and click Collect. The rows arrive in the order Amazon showed them." },
                { title: "Find your ASIN.", body: "On the results page, type your ASIN into Search in table to find the row with your product link. Its row number is the position; the Sponsored cell says whether the row is an ad." },
                { title: "Get the organic position.", body: "Click Filter rows and keep the rows where Sponsored is empty. Your product's place in that filtered list is its position among the results that rank on their own." },
                { title: "Repeat weekly.", body: "History keeps each run with its date, so the same search next week shows the move, and the Price and Badge columns say who moved around you." },
            ],
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "A worked example: five pages of trail running shoes",
            paragraphs: [
                "Here is each step of a run on a search for trail running shoes. How many rows you get depends on the search.",
            ],
            steps: [
                { title: "Search.", body: "Type trail running shoes on amazon.com and set the filter to 4 stars and up. Amazon shows the first page of results with a Next link at the bottom." },
                { title: "Pick the list.", body: "Open the List tab. Under Choose from lists we found, each card is a list on the page with its number of items. Choose the card that holds the search results." },
                { title: "Set the pages.", body: "Choose Collect more pages. The panel reads Next button ready. Under Stop after, keep 5 pages and click Collect from 5 pages." },
                { title: "Watch the count.", body: "The tab sits in a group named Collecting, and its count climbs page by page. Click Stop at any time; the rows so far are kept." },
                { title: "Open the results.", body: "The results page opens with the named columns. Columns the search barely filled, such as Coupon when few listings have one, are hidden by the Hide mostly empty columns setting, not deleted." },
                { title: "Export.", body: "Click Export as and choose Excel. Price, Original Price, Rating and Review Count are written as numbers, so the sheet sorts them without clean-up." },
            ],
        },
        {
            id: "what-to-do",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: [
                "The results page is a small spreadsheet of its own. Here are four things to do before exporting.",
            ],
            points: [
                "Filter rows: click Filter rows and keep rows where Rating is above 4 and Sponsored is empty. That's the organic list of well-rated products.",
                "Sort by Price or Review Count: click the column header. Review Count sorted high to low shows the established products; Price low to high shows where the floor is.",
                "Hide what you don't need: hover a header and click the trash icon, or rename a column with the pencil. Mostly empty columns are already hidden.",
                "Run it again next week: collect the same search and compare the two exports on Product URL. Price and Bought In Past Month changes show up in a lookup.",
                "Go deeper on one product: open its page and click Collect details on this page in the Properties tab. That reads the standard fields, then View all reviews collects the reviews across their pages.",
            ],
        },
        {
            id: "what-amazon-shows",
            eyebrow: "Limits",
            heading: "What an Amazon search shows, and what it doesn't",
            paragraphs: [
                "The extension collects what the search card shows. Some things live only on the product page, and some depend on how you're signed in.",
                "A listing with several sellers or variations can show a range or no price on the card. The Price cell stays empty rather than guessing; open the listing for one variation's price.",
            ],
            points: [
                "Pages: Amazon decides how many pages a search runs to. Several narrower searches reach more products than one broad one.",
                "Sponsored rows: kept and labelled, so you can filter them out later, or skipped when Settings → Results → Skip sponsored products is on.",
                "Prices and delivery: what Amazon shows you, which depends on your country store, your address and Prime. Set those on Amazon before collecting.",
                "Reviews: the card shows the rating and the count only. Reviews come from the product page through the Properties tab.",
                "Country stores: the same setup everywhere. To compare one product across stores, match on the ASIN inside Product URL.",
            ],
        },
        {
            id: "reviews",
            eyebrow: "Reviews",
            heading: "Reviews: the count from the search, the text from the product page",
            paragraphs: [
                "A search card shows a product's star rating and how many ratings it has, and those come through as Rating and Review Count. The reviews themselves live on the product page. Open it, click View all reviews in the Properties tab, then Collect reviews, and every review across the review pages lands in its own table.",
                "Review text belongs to the people who wrote it. Keep it for your own analysis, such as sorting by Rating to read what one- and two-star buyers say.",
            ],
            table: {
                columns: ["Rating", "Title", "Text", "Date"],
                rows: [
                    ["5", "Light and grippy", "Took them on a wet trail the first weekend and never slipped.", "12 August 2026"],
                    ["2", "Runs small", "Half a size smaller than my road shoes; returned them.", "3 August 2026"],
                    ["4", "Good for the price", "Cushioning is firmer than the photos suggest, but it lasts.", "29 July 2026"],
                ],
                caption: "Sample data: a review table after export. The product's fields and its reviews export as separate files.",
            },
        },
        {
            id: "compared",
            eyebrow: "Other ways",
            heading: "Compared with Amazon's own tools and copying by hand",
            paragraphs: [
                "For a search you can see, the extension turns every page into one sheet. Amazon's seller and advertising reports cover your own listings, not a competitor's search, and copying cards by hand loses the numbers as numbers.",
            ],
            table: {
                columns: ["Method", "What you get", "Where it falls short"],
                rows: [
                    ["This extension", "Every page of the search as named columns, in your own browser, free", "A verification page stops the run until you complete it"],
                    ["Amazon's seller reports", "Your own listings' sales and traffic", "Nothing about other sellers' prices, badges or ratings"],
                    ["Copying by hand", "Whatever you have the patience for", "Prices and counts paste as text, sponsored rows mix in, and a second run next week starts from zero"],
                ],
            },
        },
    ],
    screenshots: ["ext/list-tab-amazon", "ext/results-amazon"],
    feature: "list-scraper",
    useCase: "ecommerce",
    related: [],
    faqs: [
        { q: "Is this Amazon scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "How do I scrape Amazon search results without code?", a: "Run the search, open the List tab, pick the results list, choose Collect more pages and set Stop after. The columns are named by the Amazon setup, so the sheet is ready to sort." },
        { q: "Can I scrape a product's full details and reviews?", a: "Yes. Open the product page and click Collect details on this page in the Properties tab. It reads the standard fields, such as price, list price, rating, availability, seller and variants, and View all reviews collects the reviews across their pages." },
        { q: "Can I scrape Amazon Best Sellers?", a: "Yes. Best Sellers, New Releases, Movers & Shakers and category pages are lists like any other. Pick the list in the side panel and collect." },
        { q: "Why is the price empty on some rows?", a: "A listing with several sellers or variations sometimes shows a range or no price on the search card. The cell stays empty rather than guessing; open the listing for the price." },
        { q: "Can I scrape several Amazon searches at once?", a: "Yes. Paste the search addresses into Bulk scrape and each is collected in turn with the same page settings. View merged table puts them in one table." },
        { q: "Does it work on Amazon.in, Amazon.co.uk and other country stores?", a: "Yes. The setup covers every country store, and 19 of them have named columns. To compare a product across stores, match on the ASIN inside Product URL." },
        { q: "Does it work on Amazon Fresh or Amazon Business?", a: "The setup is for the main store's search and category pages. On other storefronts, if the List tab finds the products as a list, the columns are named from the page, so check them on the first page." },
        { q: "Will Amazon block me?", a: "Amazon can show a verification page when many result pages load quickly. The run stops and the panel says so; complete the check in the tab, click Rescan, and collect again. You browse as yourself at a person's pace; if checks keep appearing, collect fewer pages per run. Nothing happens to your Amazon account: the extension never signs in or acts for you." },
        { q: "Is scraping Amazon allowed?", a: "Amazon's terms restrict automated collection, and the product text and images belong to Amazon and its sellers. Collect for your own research, keep it to what the public page shows, and read our plain-words explainer on web scraping and the law at /web-scraping-legal. It isn't legal advice." },
    ],
};
