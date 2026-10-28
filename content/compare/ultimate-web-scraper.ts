import type { ComparePageContent } from "@/components/pages/ComparePage";

// Every fact about Ultimate Web Scraper comes from its public pages as read on 2026-10-28: ultimatewebscraper.com (home,
// /chrome-extension, /pricing) and its Chrome Web Store listing (version 3.2, updated 4 September 2026, offered by Happy
// Panda Tech FZ-LLC, "Offers in-app purchases"). Prices, credits and counts are theirs to change; the page carries its
// compared-on date and must be re-checked before republishing. Our side is checked against release 1.3.0. Fair and
// specific: it has cloud scheduling and an MCP connection live today, and the page says so.

export const ultimateWebScraper: ComparePageContent = {
    slug: "ultimate-web-scraper",
    competitor: { name: "Ultimate Web Scraper", short: "Ultimate Web Scraper", url: "https://ultimatewebscraper.com/" },
    meta: {
        title: "Web Scraper Pro vs Ultimate Web Scraper, Compared Honestly",
        description: "Point-and-click lists, bulk URLs, emails, Shopify, what each free tier lets you download, cloud and MCP today, and the cost at 1,000 and 10,000 rows.",
    },
    h1: "Web Scraper Pro vs Ultimate Web Scraper",
    intro: "The two extensions overlap more than most: both find a list on the page, follow its pages, take a list of URLs, read emails from websites and export Shopify catalogs. The differences are what you can download for free, how you tell it what you want, and what runs in the cloud today. Ultimate Web Scraper sells file downloads, cloud runs and an AI connection on a yearly plan; Web Scraper Pro is free with everything in the extension included, and its cloud and MCP are still coming.",
    comparedOn: "2026-10-28",
    disclosure: "We make Web Scraper Pro. Everything about Ultimate Web Scraper below comes from its public pages on the date shown, with links; tell us if something is out of date and we'll fix it.",
    verdict: {
        ours: "You want to download the file without paying, or you'd rather type what you want than click through a picker. Or you want named columns on popular sites, or a lead list from a directory with emails added to the same rows.",
        theirs: "You need scheduled runs on cloud browsers today, with proxies and a country to run from, and results written to a Google Sheet or a webhook. Or you want an AI app such as Claude connected now rather than later, and a yearly plan fits.",
    },
    rows: [
        { area: "How you tell it what to collect", ours: "Pick a list from the cards the List tab found, click one item on the page, or type a request in the Chat tab. No selectors.", theirs: "Point and click: hover an item, click once, and the similar items are picked. A side panel with a spreadsheet view of the rows." },
        { area: "Ready-made sites", ours: "Named columns for Amazon, Zillow, Yellow Pages, YouTube, eBay, Etsy, Walmart and others; detected automatically everywhere else.", theirs: "Its pages describe one picker for any website rather than per-site setups; column names come from what you pick." },
        { area: "Every page of results", ours: "Next page, Load more and endless scroll, detected on the page; set how many pages.", theirs: "Auto-scroll, Next links and Load more buttons, handled automatically per its listing." },
        { area: "A list of URLs", ours: "Bulk scrape: paste or upload addresses, one setup per site, one merged table with a Source URL column.", theirs: "A Page Extractor that works from a list of URLs, one row per page; the listing says you can feed it a list of URLs." },
        { area: "Emails and contact details", ours: "Emails, phones and social links from a list of websites, or added to the rows of a list you collected, in the same table.", theirs: "An Email Extractor and a Social Link Extractor that process lists of pages." },
        { area: "Shopify stores", ours: "The whole catalog from the store's own product data, one row per product or variant, with an import CSV and the images.", theirs: "A Shopify Extractor with an import-ready CSV, one row per variant." },
        { area: "Downloading the file", ours: "Excel, CSV, JSON and Google Sheets, free.", theirs: "Its FAQ says a handful of power features, file exports among them, are Pro; the free tier copies to the clipboard once every 24 hours and exports sample tables. Paid plans list unlimited CSV, Excel and JSON exports." },
        { area: "Cloud, scheduling and proxies", ours: "Coming soon. Today it runs in your open browser; History keeps every run.", theirs: "Live: parallel cloud browsers with proxies and locations, schedules from every ten minutes to monthly, results to Google Sheets or a webhook, paid with credits." },
        { area: "AI agents and MCP", ours: "Coming soon; the MCP page says what's planned. Chat inside the extension works today.", theirs: "Live on the paid plans: connect Claude or another AI app once and ask for scrapes in plain language; new cloud scrapes get a cost estimate first." },
        { area: "Where it runs and where data goes", ours: "In your Chrome window, on pages you can see. Nothing is uploaded; chat sends your request and the kind of page, never the page.", theirs: "Local scraping stays on your computer, which its page says it never receives; data leaves when you export or use the cloud." },
        { area: "Browsers", ours: "Chrome and Chromium browsers.", theirs: "Chrome, Microsoft Edge and Brave, per its site." },
        { area: "Pricing model", ours: "Free, every feature included; no paid plan, no credits, no per-row charges.", theirs: "The extension installs free. Pro $60 a year, Pro+ $99, Team $249 for six seats, billed annually, each with a yearly allowance of cloud credits; one credit is one cloud page." },
        { area: "What it costs at 1,000 and 10,000 rows", ours: "$0 either way, as a file on your computer.", theirs: "Locally, $0 to collect either; downloading the file is a Pro feature, so $60 a year for the first file. In the cloud, one credit per page: 10,000 rows at 20 a page is 500 credits, inside the Pro plan's 10,000 yearly credits." },
        { area: "Track record", ours: "Released in 2026; version 1.3.0 is on the store.", theirs: "Formerly PandaExtract; version 3.2 on the store, about 100,000 users. The store listing showed 4.1 from 252 ratings on the compared-on date; the product's site quotes 4.6 from more than 560 reviews." },
    ],
    sections: [
        {
            heading: "The real difference: what the free tier lets you keep",
            paragraphs: [
                "Both extensions collect for free, and the gap opens at the moment you want the file. Ultimate Web Scraper's free tier, as its own FAQ describes it, copies a table to the clipboard once every 24 hours and exports sample tables; a CSV or Excel download is a Pro feature at $60 a year. Web Scraper Pro exports Excel, CSV, JSON and Google Sheets at no charge, with no credits to count, which is the whole of its pricing page.",
                "The second difference is how you ask. Ultimate Web Scraper's picker is quick and precise once you've used it. Web Scraper Pro shows the lists it found as cards, names the columns from the site's own labels, and lets you type the request instead, with the rows copied from the page rather than generated.",
            ],
        },
        {
            heading: "Where the two overlap, and the details that differ",
            paragraphs: [
                "A list of URLs, emails from websites, Shopify catalogs and page text for AI are on both sides. The details: Web Scraper Pro adds contact details to the rows of a list you already collected, so a directory run and its emails are one table. Its Shopify export carries the images too, and its bulk run merges every site into one table with a Source URL column. Ultimate Web Scraper's Sitemap Explorer, which finds up to 50,000 pages of a site to feed its extractors, has no equivalent here yet.",
            ],
        },
        {
            heading: "When Ultimate Web Scraper is the better choice",
            paragraphs: [
                "Scheduled runs on cloud browsers, with proxies and a country to run from, that write to a Google Sheet or a webhook while your laptop is closed. That is live on its paid plans today and coming soon here. The same goes for connecting Claude or another AI app and asking for a scrape in a sentence; Web Scraper Pro's MCP page says what's planned and that it isn't shipped. If those two are the job and a yearly plan fits, Ultimate Web Scraper is the more complete product today, and its credit estimate before each cloud run is a fair way to price it.",
            ],
        },
    ],
    faqs: [
        { q: "Is Ultimate Web Scraper free?", a: "The extension installs free and, by its own FAQ, collects without page or row caps on your machine. Downloading files is a Pro feature; plans start at $60 a year, billed annually. Web Scraper Pro is free with every feature included and no paid plan." },
        { q: "Which one exports to Excel for free?", a: "Web Scraper Pro: Excel, CSV, JSON and Google Sheets at no charge. Ultimate Web Scraper lists file exports among its Pro features." },
        { q: "Which one runs on a schedule?", a: "Ultimate Web Scraper's cloud platform does, on its paid plans, from every ten minutes to monthly. Web Scraper Pro runs in your open browser today; scheduled cloud runs are coming." },
        { q: "Can I connect Claude to either one?", a: "To Ultimate Web Scraper, yes, on its paid plans, and it quotes a credit cost before each cloud scrape. Web Scraper Pro's MCP connection is planned and not shipped; its own chat works inside the extension today." },
        { q: "Which handles a lead list with emails?", a: "Both read emails from a list of websites. Web Scraper Pro also adds them to the rows of a list you collected a moment ago, so a Yellow Pages run and its emails are one table. For Maps-only lead lists, Maps Scraper Pro is the same engine, Maps only." },
        { q: "Does either work on LinkedIn?", a: "No. Ultimate Web Scraper's site says LinkedIn isn't supported by any of its tools, and Web Scraper Pro doesn't collect from LinkedIn either." },
    ],
    sources: [
        { label: "Ultimate Web Scraper: home page (read 2026-10-28)", url: "https://ultimatewebscraper.com/" },
        { label: "Ultimate Web Scraper: the Chrome extension page", url: "https://ultimatewebscraper.com/chrome-extension" },
        { label: "Ultimate Web Scraper: pricing", url: "https://ultimatewebscraper.com/pricing" },
        { label: "Ultimate Web Scraper on the Chrome Web Store (version 3.2, read 2026-10-28)", url: "https://chromewebstore.google.com/detail/ultimate-web-scraper/pdeldjlcnhallaapdggcmhpailpnnkmg" },
    ],
};
