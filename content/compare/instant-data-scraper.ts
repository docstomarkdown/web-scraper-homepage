import type { ComparePageContent } from "@/components/pages/ComparePage";

// Every fact about Instant Data Scraper comes from its public pages as read on 2026-10-28: the Chrome Web Store
// listing (version 1.9.3, updated 16 October 2026, offered by Flavr Technology, LP) and the original developer's page
// at webrobots.io/instantdata, which states that the extension is "no longer owned, developed or supported by Web
// Robots". Counts and ratings are the store's figures on that date and change; the page carries its compared-on date
// and must be re-checked before republishing. Our side is checked against release 1.3.0. Fair and specific: where it
// is the better choice, the page says so. The Google Maps angle belongs to mapsscraper.pro and gets one line.

export const instantDataScraper: ComparePageContent = {
    slug: "instant-data-scraper",
    competitor: { name: "Instant Data Scraper", short: "Instant Data Scraper", url: "https://webrobots.io/instantdata/" },
    meta: {
        title: "A Free Instant Data Scraper Alternative, Compared Honestly",
        description: "Two free Chrome extensions side by side: guessed columns or named ones, the next page, emails and product pages, support, and when the older tool is right.",
    },
    h1: "Web Scraper Pro vs Instant Data Scraper",
    intro: "Both are free Chrome extensions that turn the page you're looking at into a spreadsheet. Instant Data Scraper guesses which table on the page you want and hands it over as it finds it. Web Scraper Pro names the columns the way the site does, follows the next pages on its own, and adds the jobs around a list: emails from each website, a product page's details, a whole Shopify catalog, and a typed request.",
    comparedOn: "2026-10-28",
    disclosure: "We make Web Scraper Pro. Everything about Instant Data Scraper below comes from its public pages on the date shown, with links; tell us if something is out of date and we'll fix it.",
    verdict: {
        ours: "You want named columns without renaming, every page of results without pointing at the Next button, or emails for the rows you collected. Or you want product pages and Shopify stores, would rather type what you want, and want someone to write to when it breaks.",
        theirs: "You want the simplest possible grab of one table from one page, and you're used to its guess-and-retry flow. Or you work in Edge as well as Chrome, or need to slow a crawl down with a delay you set yourself.",
    },
    rows: [
        { area: "How it finds the data", ours: "Lists on the page are found and shown as cards with their counts; hover to see which is which, or click one item on the page to choose. Popular sites have named columns ready.", theirs: "An AI guess at the most relevant table, with a Try another table button when it's the wrong one, and a manual selection if you need it." },
        { area: "Column names", ours: "Named from the site's own labels, and from a ready-made setup on Amazon, Zillow, Yellow Pages, YouTube and others. Rename once on the results page if needed.", theirs: "Generic names from the page's structure; its own page says the output often includes extra fields and may need renamed columns." },
        { area: "Every page of results", ours: "Next page, Load more and endless scroll are detected; set how many pages and go.", theirs: "You mark the Next button or link yourself, and it collects across the pages; infinite scrolling is supported." },
        { area: "Going slow when a site needs it", ours: "Runs at a person's pace and slows down when a site answers slowly; a verification page pauses the run for you to complete.", theirs: "A crawl delay (1 second by default) and a maximum wait you set yourself; useful on slow pages." },
        { area: "Emails and contact details", ours: "Emails, phone numbers and social links from a list of websites, or added to the rows of a list you already collected.", theirs: "Not described on its pages; it collects what the table shows." },
        { area: "Product pages, reviews and Shopify stores", ours: "A product page's fifteen fields and all its reviews from the Properties tab; a Shopify store's whole catalog with an import CSV.", theirs: "Not described; a product page would be a table like any other." },
        { area: "Typing what you want", ours: "A Chat tab: \"collect every listing on this page\" or \"only name and phone, as CSV\". The AI picks the tool; the rows are copied from the page.", theirs: "No chat; the extension's own buttons." },
        { area: "Exports", ours: "Excel, CSV, JSON and Google Sheets; Word for page text; a Shopify import CSV.", theirs: "Excel (XLS, XLSX) and CSV, downloadable at any point in a crawl." },
        { area: "Where your data goes", ours: "Collected in your browser and kept there until you export. Chat sends your request and the kind of page, never the page.", theirs: "Its listing says the scraped data does not leave your browser." },
        { area: "Who supports it", ours: "A small company; the side panel's help link reaches the founder, and the support form files a ticket.", theirs: "The original developer, Web Robots, says it no longer owns, develops or supports it; the store listing points to a Facebook group." },
        { area: "Track record", ours: "Released in 2026; version 1.3.0 is on the store.", theirs: "Years on the store, about 1,000,000 users and a 4.9 rating from about 7,800 ratings on the compared-on date." },
        { area: "Price", ours: "Free, every feature included; no paid plan, no credits.", theirs: "Free; its listing says it is completely free and lists no in-app purchases." },
        { area: "What it costs at 1,000 and 10,000 rows", ours: "$0 either way.", theirs: "$0 either way. The cost on both sides is time: with guessed columns, the clean-up after export; with named ones, less of it." },
        { area: "Google Maps", ours: "Also collects from Google Maps, with emails from each business's website. For Maps-only lead lists, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only, and its guide compares [Instant Data Scraper on Maps](https://mapsscraper.pro/guides/instant-data-scraper-on-maps).", theirs: "A Maps results panel is a table like any other; the guide linked on the left shows what comes out." },
    ],
    sections: [
        {
            heading: "The real difference: a guessed table versus named columns",
            paragraphs: [
                "Instant Data Scraper's whole idea is speed: open a page, click the icon, and a table appears. When its guess is right and the page is one page long, nothing is faster, and a million people have found that enough. Its own page is honest about the cost: the output often carries extra fields and columns you'll rename, and paging through a site means pointing at the Next button yourself.",
                "Web Scraper Pro spends a few more seconds up front so the sheet needs less work afterwards. Lists are shown as cards you can check against the page, popular sites come out with the columns named the way the site names them, and the next pages are followed on their own. Around the list sit the jobs the older tool never took on: the emails behind each row, a product page's details and reviews, a Shopify store's full catalog, and a typed request instead of a click.",
            ],
        },
        {
            heading: "\"Instant Data Scraper not working\": what that usually means",
            paragraphs: [
                "The two things people search for next are a guess that lands on the wrong table and a crawl that stops after the first page. Both have answers inside the tool: Try another table, and marking the Next button by hand. What it no longer has is someone to write to when a site changes and neither answer works. The developer that built it says it no longer supports it, and the store listing points to a community group.",
                "Web Scraper Pro's answer to a wrong list is a card for each list on the page, and Choose an item on the page when none fits. Its answer to the first-page problem is detecting how the list continues. When a site changes, the setup is updated on our side, and a support request from the side panel reaches a person.",
            ],
        },
        {
            heading: "When Instant Data Scraper is the better choice",
            paragraphs: [
                "One plain table on one page, needed once: it's as quick as anything made since, and there's nothing to learn. If you're already fluent in its guess-and-retry flow, you work in Microsoft Edge, or you want a crawl delay you set yourself for a slow page, it does the job and it's free. Its years on the store and its million users are a real record; Web Scraper Pro is the younger tool and says so.",
            ],
        },
    ],
    faqs: [
        { q: "Is Instant Data Scraper still maintained?", a: "Its original developer, Web Robots, says on its own page that the extension is no longer owned, developed or supported by Web Robots. The store listing is offered by another company, was updated in October 2026, and names a Facebook group for support. Read both pages before relying on it for a job that repeats." },
        { q: "Which one is free?", a: "Both. Instant Data Scraper's listing says it is completely free. Web Scraper Pro is free with every feature included and no paid plan." },
        { q: "Can I use both?", a: "Yes; they don't interfere. Many people keep the older tool for a quick single-page table and use Web Scraper Pro for lists over many pages, emails, product pages and Shopify stores." },
        { q: "Does Instant Data Scraper handle multiple pages?", a: "Yes, once you mark the Next button or link for it, and it supports infinite scrolling. Web Scraper Pro detects how the list continues and asks only when it can't tell." },
        { q: "Which one gets emails for a list of businesses?", a: "Web Scraper Pro. Collect the list, then click Add contact details on the results page or run Bulk scrape → Collect contacts, and each business's website is read for emails, phones and social links. Instant Data Scraper's pages describe no contact collection." },
        { q: "Does either work on Google Maps?", a: "Both read a page, and Web Scraper Pro has a Maps setup with emails in the same run. For Maps-only lead lists, Maps Scraper Pro is the same engine, Maps only, and its guide compares Instant Data Scraper on Maps step by step." },
    ],
    sources: [
        { label: "Instant Data Scraper on the Chrome Web Store (version 1.9.3, read 2026-10-28)", url: "https://chromewebstore.google.com/detail/instant-data-scraper/ofaokhiedipichpaobibbnahnkdoiiah" },
        { label: "Instant Data Scraping Extension: the original developer's page (webrobots.io, read 2026-10-28)", url: "https://webrobots.io/instantdata/" },
    ],
};
