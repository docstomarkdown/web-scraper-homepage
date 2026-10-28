import type { ComparePageContent } from "@/components/pages/ComparePage";

// Every fact about Web Scraper (webscraper.io) comes from its public pages as fetched on 2026-09-06 and indexed on
// 2026-09-25 (home/pricing, the extension page, the documentation and the marketplace), re-read for this page on
// 2026-10-21. Prices and limits are theirs to change; the page carries its compared-on date and must be re-checked
// before republishing. Our side is checked against release 1.3.0. Fair and specific; no claims about their quality.

export const webscraperIo: ComparePageContent = {
    slug: "webscraper-io",
    competitor: { name: "Web Scraper (webscraper.io)", short: "Web Scraper", url: "https://webscraper.io" },
    meta: {
        title: "Web Scraper Pro vs Web Scraper (webscraper.io): Which Fits Your Job?",
        description: "A fair, dated comparison of Web Scraper Pro and webscraper.io: how each collects data, what runs in the browser and what in the cloud, pricing models, and which one fits a lead list, a product catalog or a scheduled crawl.",
    },
    h1: "Web Scraper Pro vs Web Scraper (webscraper.io)",
    intro: "Both are Chrome extensions that turn web pages into spreadsheets, and the resemblance ends there. Web Scraper asks you to build a \"sitemap\" of selectors and sells cloud runs by URL credit; Web Scraper Pro asks you what you want and collects it in your browser, with the lead-list extras built in.",
    comparedOn: "2026-10-21",
    disclosure: "We make Web Scraper Pro. Everything about Web Scraper below comes from its public pages on the date shown, with links; tell us if something is out of date and we'll fix it.",
    verdict: {
        ours: "You want a list, a lead list with emails, a product catalog or a product page in a spreadsheet today, without building a selector tree, and you're fine running it in your own browser.",
        theirs: "You need recurring cloud crawls on a schedule, an API that returns the data to your systems, proxies for sites that block you, or a crawl of tens of thousands of URLs you don't want to watch.",
    },
    rows: [
        { area: "How you tell it what to collect", ours: "Type a request in the Chat tab (\"collect every listing in this directory\", \"collect the products on this page\"), or pick a list the List tab found. No selectors.", theirs: "Build a sitemap: a tree of selectors (text, link, image, element, pagination) per site, by clicking elements in DevTools. An AI-assisted setup is offered on the extension page." },
        { area: "Ready-made sites", ours: "Named columns for popular sites (Amazon, Zillow, Yellow Pages, Booking.com and more), detected automatically on everything else.", theirs: "A marketplace of about 96 prebuilt scrapers for named sites, run in the cloud; the free extension needs a sitemap you build or import." },
        { area: "Lead lists with emails", ours: "Collect a directory search (Yellow Pages, Justdial, BBB or any directory) across every page, then read each business's website for emails and social links on the same rows. Also collects from Google Maps; for Maps-only lead lists, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only.", theirs: "No lead-list or email feature on the public pages; a directory sitemap would be built like any other, and the websites handled separately." },
        { area: "Every page of results", ours: "Next page, Load more and endless scroll, detected on the page; set how many pages.", theirs: "Pagination and scroll selectors you add to the sitemap; the documentation covers each type." },
        { area: "Product pages and reviews", ours: "Fifteen standard fields from a product page plus the reviews across their pages, from the Properties tab.", theirs: "Product-page scrapers exist for named sites in the marketplace; otherwise an element selector tree." },
        { area: "Shopify stores", ours: "The whole catalog from the store's own product data, one row per product or variant, with a Shopify import CSV and the images.", theirs: "Not a listed feature; a store would be scraped as a generic site." },
        { area: "Where it runs", ours: "In your Chrome window, on the pages you can see, including pages you're signed in to. Nothing is uploaded; chat sends only your request.", theirs: "The extension runs locally too. Cloud runs are the paid product: scheduler, proxies, parser, data-quality monitoring, API and webhooks." },
        { area: "Scheduled runs and API", ours: "Coming soon with the cloud. Today you run it when you need fresh data; History keeps every run.", theirs: "Yes, on the Cloud plans: scheduled jobs, an API, and exports to Dropbox, Google Drive, Google Sheets, Amazon S3 and Azure." },
        { area: "Many pages at once", ours: "Bulk scrape: paste or upload a list of addresses and each is collected in turn in an embedded browser, merged into one table.", theirs: "Cloud runs over a sitemap's start URLs, with concurrent scrapers per plan (2 to 3 on self-serve tiers)." },
        { area: "Exports", ours: "Excel, CSV, JSON and Google Sheets; Word for page text; a Shopify import CSV for catalogs.", theirs: "CSV and XLSX on all plans, JSON from the Professional plan up; the cloud integrations above." },
        { area: "Pricing model", ours: "Free, every feature included; no paid plan, no credits and no per-row charges. There's no paid plan.", theirs: "Extension free. Cloud: Project $50/month (5,000 URL credits), Professional $100 (20,000), Scale from $200 (unlimited credits), Enterprise custom; 7-day trial. One credit is one page loaded." },
        { area: "What it costs at 1,000 and 10,000 rows", ours: "$0 for either, in your browser. There are no credits, no per-row charges and no paid plan.", theirs: "In the free extension, $0 and your own setup time. In the cloud, one credit is one page loaded, so the bill depends on rows per page: 1,000 rows at 20 per page is 50 credits, and 10,000 rows is 500 credits, both inside the $50 Project plan's 5,000 credits; a crawl that opens each item's page spends one credit per row, so 10,000 rows is 10,000 credits, above the Project plan." },
        { area: "Team and scale claims", ours: "A small company; one founder answers support from the side panel.", theirs: "Started in 2013; the site states 1M+ active users and enterprise positioning for the cloud product." },
    ],
    sections: [
        {
            heading: "The real difference: a request versus a selector tree",
            paragraphs: [
                "Web Scraper's model is powerful and precise: you describe a page's structure as selectors, and the same sitemap runs again and again, locally or in the cloud. The cost is the setup. Building a sitemap for a new site means opening DevTools, picking elements, and knowing what a CSS selector is, and when the site changes its layout, the sitemap breaks until you fix it.",
                "Web Scraper Pro starts from the other end. The extension finds the list on the page and names the columns, or you say what you want in chat, and the collecting happens in your browser. The result is a spreadsheet in minutes on a site you've never seen, with no structure to maintain. The trade is that today it runs while your browser is open, and the cloud, scheduling and API are still coming.",
            ],
        },
        {
            heading: "Lead lists, specifically",
            paragraphs: [
                "If the job is a lead list, the gap is widest. Web Scraper Pro collects a directory search across every page with named columns, then reads each business's website for emails, website phone numbers and social links and adds them to the same rows. Any saved table with a Website column, or a client's list of websites, gets the same treatment. Web Scraper's public pages describe no contact or email feature; you'd build the sitemap and handle the websites separately.",
            ],
        },
        {
            heading: "When Web Scraper is the better choice",
            paragraphs: [
                "A crawl that must run every night without a person at the keyboard, deliver JSON to your own system through an API, and get through sites that block ordinary visitors with residential proxies is exactly what Web Scraper Cloud sells. If that's the job, and someone on the team can build and maintain sitemaps, it's the more complete product today, and the Project plan at $50 a month is a fair price for it.",
            ],
        },
    ],
    faqs: [
        { q: "Can I import my Web Scraper sitemaps into Web Scraper Pro?", a: "No, and you don't need to. Open the site and let the List tab find the list, or describe it in chat. There's no structure to carry over." },
        { q: "Which one is free?", a: "Web Scraper's extension is free to use locally; its cloud plans start at $50 a month. Web Scraper Pro is free, with every feature included and no paid plan." },
        { q: "Does either one run without my computer on?", a: "Web Scraper Cloud does, on its paid plans. Web Scraper Pro runs in your open browser today; cloud runs are coming." },
        { q: "Which handles sites that block scrapers?", a: "Web Scraper Cloud offers residential proxies as an add-on. Web Scraper Pro reads pages in your own browser as an ordinary visit, which most sites allow, and never bypasses a verification page." },
    ],
    sources: [
        { label: "Web Scraper Cloud home and pricing (webscraper.io, fetched 2026-09-06)", url: "https://webscraper.io/pricing" },
        { label: "Web Scraper extension page (webscraper.io)", url: "https://webscraper.io/web-scraper-extension" },
        { label: "Web Scraper documentation: sitemaps and selectors", url: "https://webscraper.io/documentation" },
        { label: "Web Scraper marketplace of prebuilt scrapers", url: "https://webscraper.io/marketplace" },
    ],
};
