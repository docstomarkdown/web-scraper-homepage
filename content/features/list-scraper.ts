import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - List tab: "Choose from lists we found", "Collect N items", "Rescan", "Choose an item on the page",
//   "Collect more pages" with Next page / Load more / Auto scroll and "Stop after": components/scraper/ListTab.tsx
// - Pages to go through default (5, 10, 20, All) and repeated rows left out: DECISIONS.md D-032
// - 113 ready-made site packs with named columns, generic detection elsewhere: configs-prod/, lib/platform/hooks/
// - Column names guessed from the page's own labels for other sites: DECISIONS.md D-018, D-019
// - Chat "collect the list on this page" and "collect every page": lib/tools/capabilityTools.ts, D-025, D-027
// - Paging slows down in a background tab: change_documentation/REFACTORING_TODO.md
// Title and headings target what people type into Google ("how to extract data from website to excel",
// "scrape data from website to excel free", "how to scrape a website"): youtube-research/AUTOSUGGEST.md and
// SEARCH_QUERIES.md in the strategy repo. Owner instruction 2026-10-21: titles start with "How to".

export const listScraper: FeaturePageContent = {
    page: getPage("list-scraper"),
    meta: {
        title: "How to Extract Data from a Website to Excel: Free, No Code",
        description:
            "Open a page with a list, click Collect, and every item becomes a row with named columns, across every page of results. Export to Excel, CSV, JSON or Google Sheets. Free Chrome extension, no code.",
    },
    eyebrow: "Any website to Excel",
    h1: "How to extract data from a website to Excel, no code",
    intro:
        "Open a page with a list, click Collect, and every item becomes a row with named columns. It follows the next pages too, so you get the whole list. Export to Excel, CSV, JSON or Google Sheets.",
    lastUpdated: "2026-10-20",
    hero: "ext/list-tab-detected",
    sample: {
        caption: "A store's category page, after export. Products and prices are made up.",
        columns: ["Product Name", "Price", "Rating", "Review Count", "Availability"],
        rows: [
            ["Trail Runner 2 Shoes", "$89.00", "4.6", "1,204", "In stock"],
            ["Ridge Hiking Boots", "$129.00", "4.8", "532", "In stock"],
            ["Summit Rain Jacket", "$74.50", "4.3", "318", "Low stock"],
            ["Basecamp Socks, 3 pack", "$18.00", "4.7", "2,011", "In stock"],
        ],
    },
    steps: {
        heading: "How to extract a list from a website in three steps",
        intro: "It runs in your own Chrome window, on the page you have open. There's nothing to set up first.",
        items: [
            {
                title: "Open the page and the List tab",
                body: "Go to the page that shows the list. Open the Web Scraper Pro side panel and the List tab. Under Choose from lists we found, it shows the lists it detected and how many items each has.",
                points: [
                    "Hover a list card and the list it means is outlined on the page.",
                    "Wrong list? Click Choose an item on the page, then click one entry. Every similar entry is picked with it.",
                ],
            },
            {
                title: "Pick the list and click Collect",
                body: "For this page only, click Collect N items. For the whole list, choose Collect more pages, confirm how the page moves on, set Stop after, and click Collect from N pages.",
                points: [
                    "The page moves on by Next page, Load more or Auto scroll. The extension finds which.",
                    "Stop after is 5 pages by default. Choose To end for the whole list.",
                    "Keep the tab in front. Paging slows down in a background tab.",
                ],
                screenshot: "ext/list-tab-more-pages",
            },
            {
                title: "Review and export",
                body: "The rows open on the results page. Rename or remove columns, filter rows, then export to Excel, CSV, JSON or Google Sheets. Every collection is saved in History.",
                points: [
                    "Mostly empty columns are hidden on their own. Click Columns to show them.",
                    "Or type in chat with the results tab in front: Only name, price and rating, sorted by price.",
                ],
            },
        ],
    },
    fields: {
        heading: "What you get from any list",
        intro: "Web Scraper Pro finds the repeating items on the page and reads each one's parts into columns, named from the site's own labels.",
        items: [
            { name: "Every repeated item", description: "Products, listings, search results, directory entries, posts: anything that repeats down the page becomes one row." },
            { name: "Text, numbers and links", description: "Names, prices, ratings, counts and dates, plus the link to each item's own page." },
            { name: "Images", description: "The image URL for each item, when the list shows one." },
            { name: "Every page of results", description: "Numbered pages, Load more buttons and endless scrolling, up to the page count you set." },
            { name: "Clean numbers", description: "Prices, ratings and counts are saved as numbers, so the spreadsheet can sort and sum them." },
            { name: "No repeats", description: "An item that appears again on the next page, or in a carousel, is kept once." },
        ],
    },
    sections: [
        {
            id: "ready-made",
            eyebrow: "Ready-made sites",
            heading: "Over 100 sites come with named columns",
            paragraphs: [
                "Amazon, Walmart, Target, Etsy, Zillow, Rightmove, Monster, Capterra, Tripadvisor, Yellow Pages and many more have a setup that names every column the way the site does. On any other site the list is still detected, and the columns are named from the page's own labels.",
            ],
            points: [
                "Online stores: Amazon in 21 countries, eBay, Walmart, Target, Costco, Etsy, Wayfair, Flipkart and more.",
                "Real estate: Zillow, Redfin, Rightmove, Zoopla, Property Finder.",
                "Directories and reviews: Yellow Pages, Justdial, BBB, Yelp, G2, Capterra, Trustpilot.",
                "Travel, jobs, cars and research: Booking.com, Hotels.com, Tripadvisor, Monster, Copart, CarGurus, Google Scholar.",
            ],
        },
        {
            id: "pick-it-yourself",
            screenshot: "ext/list-tab-pick-item",
            eyebrow: "When the wrong list is found",
            heading: "Point at one item, and it finds the rest",
            paragraphs: [
                "Pages often hold several lists: the main results, a sidebar, a row of recommendations. If the detected list isn't the one you want, click Choose an item on the page and click one of the items you're after. Similar items are picked with it.",
            ],
        },
        {
            id: "ask-instead",
            eyebrow: "Or ask instead",
            heading: "How to scrape a website by typing what you want",
            paragraphs: [
                "In the Chat tab, \"collect the list on this page\" does the same job. When the list goes on over more pages, chat offers Collect every page. When the rows have websites, it offers to add each site's emails and social links.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Five settings that shape every list",
            paragraphs: ["They sit under Settings → Results in the side panel. Each can also be changed for one run on the List tab or the results page."],
            points: [
                "Pages to go through: 5 by default. Stop after on the List tab overrides it for one run.",
                "Hide mostly empty columns: on. A column filled in for fewer than a third of the rows is hidden, never deleted.",
                "Remove duplicates: on. An item that appears on two pages or in a carousel is kept once.",
                "Save prices, ratings and counts as numbers: on. $19.99 is saved as 19.99. Skip sponsored products: off, so sponsored rows stay in, marked Sponsored.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When a site pushes back",
            heading: "What happens when a site slows down, asks a question or changes",
            paragraphs: ["The extension reads the page in your own browser, so a site sees you browsing. Most sites allow that. A few have limits for anyone who loads many pages fast."],
            points: [
                "A verification page stops the run. Complete the check in the tab, click Rescan, and collect again.",
                "A site that rate-limits shows fewer results or an error page. Collect in smaller runs and come back later.",
                "A page you're signed in to is read as you see it. The extension never signs in for you.",
                "When a site changes its layout, the list is found again on the next visit. Rename any changed columns once on the results page.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It collects what the page shows you. On a site you've signed in to, it sees what you see.",
            "Paging goes through 5 pages unless you change it. Keep the tab in front while it works.",
            "Sites that detect automated browsing can slow down or ask you to verify. Collect in smaller runs.",
            "Social networks that need a sign-in, such as LinkedIn, Instagram and Facebook, aren't supported.",
            "Some site rules limit what you may collect and reuse. Check the site's terms and the law where you are, especially for personal details.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Competitor catalogs", body: "A category page with every product and price, refreshed whenever you need to compare." },
            { title: "Directory lists", body: "Every business in a directory category, with phone and website, ready for calls or a mail merge." },
            { title: "Listings and results", body: "Homes, jobs, hotels or cars from a search, across every page." },
            { title: "Research tables", body: "A list of papers, tools or events in a sheet you can sort, filter and share." },
        ],
    },
    faqs: [
        {
            q: "How do I extract data from a website to Excel without code?",
            a: "Open the page, open the List tab in the side panel, pick the list it found, and click Collect. On the results page click Export as and choose Microsoft Excel. No selectors, templates or scripts.",
        },
        {
            q: "Does it work on any website?",
            a: "On most pages that show a list. Sites with a ready-made setup return fixed, named columns. On other sites the list is detected and the columns are named from the page. The hard limits are sites that need a sign-in to see anything, such as LinkedIn, and pages that load no list at all.",
        },
        {
            q: "How do I scrape a website with multiple pages of results?",
            a: "Pick the list, choose Collect more pages, confirm Next page, Load more or Auto scroll, set Stop after, and click Collect from N pages. It visits them one by one in your browser and adds the rows to the same table.",
        },
        {
            q: "What if the page loads more as I scroll?",
            a: "Choose Collect more pages and then Auto scroll. The run scrolls until nothing new loads, or until you stop it.",
        },
        {
            q: "Is this free?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create. That includes lists from any website, every page of results, bulk runs and every export format.",
        },
        {
            q: "What if the columns have odd names?",
            a: "On the results page, hover a column header and click the pencil to rename it, or the trash icon to remove it. Columns that are mostly empty are hidden with one click.",
        },
        {
            q: "Can it collect from many pages at once?",
            a: "Yes. Bulk runs take a list of page addresses and collect each one's list in turn, into one table or one per site. See Bulk runs.",
        },
        {
            q: "Is there a tutorial?",
            a: "Yes: How To Scrape Data from Any Website to Excel, with a screenshot for every step, and How To Collect Every Page of Results for lists that continue over pages.",
        },
    ],
    related: ["ai-chat", "bulk-scraper", "export-to-google-sheets", "product-scraper", "maps-leads"],
};
