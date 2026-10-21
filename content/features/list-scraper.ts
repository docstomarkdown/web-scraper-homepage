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

export const listScraper: FeaturePageContent = {
    page: getPage("list-scraper"),
    meta: {
        title: "List Scraper: Any Web Page's List to a Spreadsheet",
        description:
            "Collect a directory, search results or a product catalog from any website into named columns, across every page of results, with no code or selectors.",
    },
    eyebrow: "Lists from any website",
    h1: "Turn any list on a web page into a spreadsheet",
    intro:
        "Open a page with a list, click Collect, and every item becomes a row with named columns. It follows the next pages too, so you get the whole list, not the first screen.",
    lastUpdated: "2026-10-20",
    hero: "ext/list-tab-detected",
    sample: {
        caption: "A store's category page, as it looks after export. Products and prices are made up.",
        columns: ["Product Name", "Price", "Rating", "Review Count", "Availability", "Product URL"],
        rows: [
            ["Trail Runner 2 Shoes", "$89.00", "4.6", "1,204", "In stock", "store.example/trail-runner-2"],
            ["Ridge Hiking Boots", "$129.00", "4.8", "532", "In stock", "store.example/ridge-boots"],
            ["Summit Rain Jacket", "$74.50", "4.3", "318", "Low stock", "store.example/summit-jacket"],
            ["Basecamp Socks, 3 pack", "$18.00", "4.7", "2,011", "In stock", "store.example/basecamp-socks"],
        ],
    },
    fields: {
        heading: "Named columns, from the page itself",
        intro:
            "Web Scraper Pro finds the repeating items on the page and reads each one's parts into columns. On sites with a ready-made setup the columns are fixed and named; elsewhere they're named from the page's own labels, and you can rename any of them before you export.",
        items: [
            { name: "Every repeated item", description: "Products, listings, search results, directory entries, posts: anything that repeats down the page becomes one row." },
            { name: "Text, numbers and links", description: "Names, prices, ratings, counts and dates, plus the link to each item's own page." },
            { name: "Images", description: "The image URL for each item, when the list shows one." },
            { name: "Every page of results", description: "Numbered pages, Load more buttons and endless scrolling, up to the page count you set." },
            { name: "Clean numbers", description: "Prices, ratings and counts are saved as numbers, so the spreadsheet can sort and sum them." },
            { name: "No repeats", description: "An item that appears again on the next page, or in a carousel, is kept once." },
        ],
    },
    steps: {
        heading: "Three clicks, no setup",
        intro: "It runs in your own Chrome window, on the page you have open. There's nothing to set up first.",
        items: [
            {
                title: "Open the page and the List tab",
                points: ["Hover a list card and the list it means is outlined on the page.", "Wrong list? Click Choose an item on the page, then click one entry. Every similar entry is picked with it."],
                body: "Go to the page that shows the list. Open the Web Scraper Pro side panel and the List tab. Under Choose from lists we found, it shows the lists it detected, with how many items each has.",
            },
            {
                title: "Pick the list and click Collect",
                points: ["This page only: click Collect N items.", "More pages: choose Collect more pages, confirm Next page, Load more or Auto scroll, set Stop after (5 pages by default), and click Collect from N pages.", "Keep the tab in front; paging slows down in a background tab."],
                screenshot: "ext/list-tab-more-pages",
                body: "Choose the list you want. For this page only, click Collect N items. For the whole list, choose Collect more pages, confirm how the page moves on (Next page, Load more or Auto scroll), set Stop after, and click Collect from N pages.",
            },
            {
                title: "Review and export",
                points: ["Mostly empty columns are hidden on their own; click Columns to show them.", "Example to type in the chat with the results tab in front: Only name, price and rating, sorted by price."],
                body: "The rows open on the results page, where you can rename or remove columns and filter rows. Export to Excel, CSV, JSON or Google Sheets. Every collection is saved in History.",
            },
        ],
    },
    sections: [
        {
            id: "settings",
            eyebrow: "Settings that change the result",
            heading: "Five settings shape every list you collect",
            paragraphs: ["They sit under Settings → Results in the side panel. Each can also be changed for one run on the List tab or the results page."],
            points: ["Pages to go through: 5 by default. The Stop after control on the List tab overrides it for one run.", "Hide mostly empty columns: on. A column filled in for fewer than a third of the rows is hidden, never deleted; the Columns button shows it again.", "Remove duplicates: on. An item that appears on two pages or in a carousel is kept once.", "Save prices, ratings and counts as numbers: on. $19.99 is saved as 19.99 so a spreadsheet can sort and add. Turn it off to keep values exactly as the site shows them.", "Skip sponsored products: off. Sponsored rows stay in, marked Sponsored, so you can filter them later."],
        },
        {
            id: "pushback",
            eyebrow: "When a site pushes back",
            heading: "What happens when a site slows down, asks a question or changes",
            paragraphs: ["Because the extension reads the page in your own browser, a site sees you browsing. Most sites allow that; a few have limits for anyone who loads many pages fast."],
            points: ["A verification page stops the run. Complete the check in the tab, click Rescan in the List tab, and collect again.", "A site that rate-limits shows fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.", "A page you're signed in to is read as you see it. The extension never signs in for you.", "When a site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page."],
        },
        {
            id: "pick-it-yourself",
            screenshot: "ext/list-tab-pick-item",
            eyebrow: "When the wrong list is found",
            heading: "Point at one item, and it finds the rest",
            paragraphs: [
                "Pages often hold several lists: the main results, a sidebar, a row of recommendations. If the detected list isn't the one you want, click Choose an item on the page and click one of the items you're after. Similar items on the page are picked with it, and Collect N items works the same way.",
            ],
        },
        {
            id: "ready-made",
            eyebrow: "Ready-made sites",
            heading: "Over 100 sites come with named columns",
            paragraphs: [
                "Amazon, Walmart, Target, Etsy, Zillow, Rightmove, Monster, Capterra, Tripadvisor, Yellow Pages and many more have a setup that names every column the way the site does. On any other site the list is still detected, and the columns are named from the page's own labels.",
            ],
            points: [
                "Online stores: Amazon in 21 countries, eBay, Walmart, Target, Costco, Etsy, Wayfair, Flipkart and more",
                "Real estate: Zillow, Redfin, Rightmove, Zoopla, Property Finder",
                "Directories and reviews: Yellow Pages, Justdial, BBB, Yelp, G2, Capterra, Trustpilot",
                "Travel, jobs, cars and research: Booking.com, Hotels.com, Tripadvisor, Monster, Copart, CarGurus, Google Scholar",
            ],
        },
        {
            id: "ask-instead",
            eyebrow: "Or ask instead",
            heading: "Type it instead of clicking",
            paragraphs: [
                "In the Chat tab, \"collect the list on this page\" does the same job. When the list goes on over more pages, chat offers Collect every page, and when the rows have websites it offers to add each site's emails and social links.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It collects what the page shows you. On a site you've signed in to, it sees what you see; it doesn't sign in for you.",
            "Paging goes through 5 pages unless you change it (Settings → Results, or Stop after on the List tab). Keep the tab in front while it works; paging slows down in a background tab.",
            "Sites that detect automated browsing can slow down or ask you to verify. Collect in smaller runs and take breaks between them.",
            "Social networks that need a sign-in, such as LinkedIn, Instagram and Facebook, aren't supported.",
            "Some site rules limit what you may collect and reuse. Check the terms of the site and the law where you are, especially for personal details.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Competitor catalogs", body: "A category page with every product and price, refreshed whenever you need to compare." },
            { title: "Directory lists", body: "Every business in a directory category, with phone and website, ready for calls or a mail merge." },
            { title: "Listings and results", body: "Homes, jobs, hotels or cars from a search, with the fields the site shows, across every page." },
            { title: "Research tables", body: "A list of papers, tools or events into a sheet you can sort, filter and share." },
        ],
    },
    faqs: [
        {
            q: "Does it work on any website?",
            a: "On most pages that show a list. Sites with a ready-made setup return fixed, named columns. On other sites the list is detected automatically and the columns are named from the page. The only hard limits are sites that need a sign-in to see anything, such as LinkedIn, and pages that load no list at all.",
        },
        {
            q: "How does it get the other pages?",
            a: "Choose Collect more pages and pick Next page, Load more or Auto scroll, then set how many pages to go through or choose To end. It visits them one by one, in your browser, and adds the rows to the same table. Stop and save keeps what it has so far.",
        },
        {
            q: "Do I need to write selectors or code?",
            a: "No. There are no selectors, templates or scripts. If the detected list is wrong, you click one item on the page and it picks the matching ones.",
        },
        {
            q: "What if the columns have odd names?",
            a: "On the results page, hover a column header and click the pencil to rename it, or the trash icon to remove it. Columns that are mostly empty can be hidden with one click.",
        },
        {
            q: "Can it collect from many pages at once?",
            a: "Yes. Bulk runs take a list of page addresses and collect each one's list in turn, into one table or one per site. See Bulk runs.",
        },
        {
            q: "Is this included in the plan?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create. That includes lists from any website, every page of results, bulk runs and every export format.",
        },
        {
            q: "How do I use it on a page with pagination (more pages of results)?",
            a: "Pick the list, choose Collect more pages, confirm how the page moves on (Next page, Load more or Auto scroll), set Stop after, and click Collect from N pages. The guide How To Collect Every Page of Results walks through it.",
        },
        {
            q: "Is there a tutorial?",
            a: "Yes: How To Scrape Data from Any Website to Excel, with a screenshot for every step, and How To Collect Every Page of Results for lists that continue over pages.",
        },
        {
            q: "What if the page loads more as I scroll instead of having pages?",
            a: "Choose Collect more pages and then Auto scroll. The run scrolls until nothing new loads, or until you stop it.",
        },
        {
            q: "Why are some columns hidden?",
            a: "Columns filled in for fewer than a third of the rows are hidden to keep the table readable. Click Columns to see them and show any you need; nothing is deleted.",
        },
    ],
    related: ["ai-chat", "bulk-scraper", "export-to-google-sheets", "product-scraper", "maps-leads"],
};
