import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20, re-read 2026-10-21:
// - List tab: "Choose from lists we found", "Collect N items", "Rescan page", "Choose an item on the page",
//   "Collect more pages" with Next page / Load more / Auto scroll, "Stop after" (5, 10, 20, All pages; "To end"
//   for scrolling): components/scraper/ListTab.tsx
// - Pages to go through default 5; Remove repeated rows on; Leave out sponsored results off; Hide mostly empty
//   columns on; the results page says what was left out: DECISIONS.md D-032
// - Products in the site's order, leads best rated first: D-031; prices, ratings and counts as numbers: D-033
// - 113 ready-made site packs with named columns, generic detection elsewhere: configs-prod/, lib/platform/hooks/
// - Column names from the page's own labels on other sites, a category guessed from them: DECISIONS.md D-018, D-019
// - Verify before publishing as ready-made: Redfin, Booking.com and Tripadvisor have setups in configs-prod/ but no
//   verified run on 1.3.0 (2026-10-28); the copy below names them as setups to check, not as verified packs.
// - Chat "collect the list on this page" and "collect every page" run the List tab's own run: D-025, D-027
// - Paging slows down in a background tab: change_documentation/REFACTORING_TODO.md
// Verify before publishing: seconds per page in a paged run ("a few seconds a page") is not measured here; the
// worked example's 5 pages × 24 items is illustrative.
// Title and headings target what people type into Google ("how to extract data from website to excel",
// "scrape data from website to excel free", "how to scrape a website"): youtube-research/AUTOSUGGEST.md and
// SEARCH_QUERIES.md in the strategy repo. This page owns "extract data from a website to Excel"; the guide
// scrape-data-from-any-website-to-excel.md says "scrape data from any website into Excel", which is close; the
// guide should take a narrower phrase when it's next edited.

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
    lastUpdated: "2026-10-21",
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
                    "The page moves on by Next page, Load more or Auto scroll. The extension finds which, and asks when it can't tell.",
                    "Stop after offers 5, 10, 20 or All pages; 5 is the default. A scrolling list offers To end.",
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
            { name: "No repeats", description: "An item that appears again on the next page, or in a carousel, is kept once, and the results page says how many were left out." },
        ],
    },
    sections: [
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "A store category, five pages, one spreadsheet",
            paragraphs: [
                "Say a store's running-shoes category shows 24 products a page over five pages, and you want every product, price and rating in Excel. Here is the run.",
            ],
            steps: [
                { title: "Open the first page.", body: "Go to the category page in Chrome and open the List tab. Under Choose from lists we found, the products show as List 1 with 24 items; hover it and the product grid is outlined." },
                { title: "Choose Collect more pages.", body: "The panel checks how the page moves on and shows Next button ready. Stop after is on 5 pages, which is what you want here." },
                { title: "Click Collect from 5 pages.", body: "The tab moves through the pages on its own, a few seconds each, and the tab title counts the items. Keep the tab in front." },
                { title: "Read the results.", body: "About 120 rows open: Product Name, Price, Rating, Review Count, Availability, Product URL and Image URL. A chip says how many repeated rows were left out, if the site repeated any across pages." },
                { title: "Export.", body: "Click Export as and choose Microsoft Excel. Prices and ratings are numbers in the file, so Excel sorts them without clean-up." },
            ],
        },
        {
            id: "ready-made",
            eyebrow: "Ready-made sites",
            heading: "Over 100 sites come with named columns",
            paragraphs: [
                "Amazon, Walmart, Etsy, eBay, Zillow, Rightmove, Yellow Pages, Hotels.com and many more have a setup that names every column the way the site does and knows the site's Next button. On any other site the list is still detected, and the columns are named from the page's own labels.",
                "On a site without a setup, check the first page's columns before a long run. Rename what's odd once on the results page; the name is kept for the file.",
            ],
            points: [
                "Online stores: Amazon in 21 countries, eBay, Walmart, Target, Costco, Etsy, Wayfair, Flipkart and more.",
                "Real estate: Zillow and Rightmove, verified on 1.3.0; Redfin, Zoopla and Property Finder have setups not yet re-run on 1.3.0, so check the first page's columns.",
                "Directories and reviews: Yellow Pages, Justdial, BBB, Yelp, G2, Capterra, Trustpilot.",
                "Travel, jobs, cars and research: Hotels.com and Google Scholar, verified on 1.3.0; Booking.com, Tripadvisor, Monster, Copart and CarGurus have setups not yet re-run on 1.3.0.",
            ],
        },
        {
            id: "pick-it-yourself",
            screenshot: "ext/list-tab-pick-item",
            eyebrow: "When the wrong list is found",
            heading: "Point at one item, and it finds the rest",
            paragraphs: [
                "Pages often hold several lists: the main results, a sidebar, a row of recommendations. If the detected list isn't the one you want, click Choose an item on the page and click one of the items you're after. Similar items are picked with it.",
                "If nothing was collected, the panel says so and offers Rescan page. A page that loaded more while you waited is rescanned in a second.",
            ],
        },
        {
            id: "what-to-do-with-the-table",
            eyebrow: "After the run",
            heading: "What you can do with the table before you export",
            paragraphs: ["Most lists need two or three moves before they're useful. Each is a click on the results page or one sentence in chat."],
            table: {
                columns: ["You want", "Do this", "Where"],
                rows: [
                    ["Only items under $50", "Click Filter rows, choose Price, less than 50", "Results page"],
                    ["Columns renamed the way your sheet expects", "Hover the header, click the pencil; the trash icon removes a column", "Results page"],
                    ["The hidden, mostly empty columns back", "Click Columns and tick them; nothing is deleted", "Results page"],
                    ["Name, price and rating only, cheapest first", "Type: Only name, price and rating, sorted by price", "Chat, with the results tab in front"],
                    ["Every product's full details and reviews", "Run Bulk scrape with Use saved data over the Product URL column", "Bulk page"],
                ],
            },
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
            table: {
                columns: ["Setting", "Default", "Change it when"],
                rows: [
                    ["Pages to go through", "5", "You want the whole list every time; Stop after on the List tab overrides it for one run"],
                    ["Hide mostly empty columns", "On", "A column filled in for fewer than a third of the rows matters to you; it's hidden, never deleted"],
                    ["Remove repeated rows", "On", "Never, in practice; a repeat is a row the same as an earlier one in every field"],
                    ["Save prices, ratings and counts as numbers", "On", "You need the text exactly as shown, such as \"$19.99\" with its symbol"],
                    ["Leave out sponsored results", "Off", "You're comparing prices and ads would skew the list; sponsored rows are marked either way"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with copying by hand, writing a script, or paying for an API",
            paragraphs: [
                "For a list on a page you can open, the extension is the fastest honest route: it reads the page as you see it, names the columns, and follows the pages. A script is worth it when the same list must be pulled every night; an API when another program needs the rows. Both are what cloud runs are for, and those are coming.",
            ],
            table: {
                columns: ["Method", "What you do", "Time for 100 rows", "Where it breaks"],
                rows: [
                    ["Web Scraper Pro", "Open the page, pick the list, click Collect", "A minute or two, in the background", "Sites that need a sign-in you don't have; pages that load no list"],
                    ["Copy and paste", "Select, paste, fix the columns", "An hour, longer when the list runs over several pages", "Merged cells, images, prices as text, no links"],
                    ["A script", "Write selectors, handle paging, keep it working", "Minutes to run, hours to write", "Every site redesign; sites that block fast requests"],
                    ["A paid API", "Sign up, send URLs, pay per page", "Minutes", "Per-page costs; no view of pages behind your own sign-in"],
                ],
            },
        },
        {
            id: "pushback",
            eyebrow: "When a site pushes back",
            heading: "What happens when a site slows down, asks a question or changes",
            paragraphs: ["The extension reads the page in your own browser, so a site sees you browsing. Most sites allow that. A few have limits for anyone who loads many pages fast."],
            points: [
                "A verification page stops the run. Complete the check in the tab, click Rescan page, and collect again.",
                "A site that rate-limits shows fewer results or an error page. Collect in smaller runs and come back later.",
                "A page you're signed in to is read as you see it. The extension never signs in for you.",
                "When a site changes its layout, the list is found again on the next visit. Rename any changed columns once on the results page.",
            ],
        },
        {
            id: "doesnt-do",
            eyebrow: "Limits",
            heading: "What it doesn't do",
            paragraphs: ["Six limits worth knowing before you plan a job around this feature."],
            points: [
                "It doesn't collect what the page doesn't show. A price only visible after a click, or a detail on the item's own page, needs a product-details run.",
                "It doesn't sign in, solve verifications or get past a block. On a page you're signed in to, it reads what you see.",
                "It doesn't run with the tab closed or in the background at full speed. Keep the tab in front; scheduled runs come with cloud.",
                "It doesn't support social networks that need a sign-in to see anything, such as LinkedIn, Instagram and Facebook.",
                "It doesn't merge two different lists on its own. Collect them separately, then ask chat to combine them.",
                "It doesn't go past a site's own cap. A site that stops showing results after a certain page stops there for everyone.",
            ],
        },
        {
            id: "goes-wrong",
            eyebrow: "Troubleshooting",
            heading: "When it goes wrong",
            paragraphs: ["The six things that go wrong most often with a list, and what to do about each."],
            points: [
                "The wrong list was picked. Click Choose an item on the page and click one entry you want; every similar entry is picked with it.",
                "Only the first page was collected. Choose Collect more pages and set Stop after; This page only is the default choice.",
                "The Next button wasn't found. Click Change next to Next button ready and click the site's next-page button yourself.",
                "The columns have odd names. The site has no ready-made setup, so names come from the page. Rename them once with the pencil on the header.",
                "A column is missing. It was mostly empty and hidden. Click Columns to show it.",
                "The run slowed to a crawl. The tab went to the background or the site started rate-limiting. Bring the tab to the front, or collect in smaller runs.",
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
            q: "Does it work on pages that load with JavaScript, or behind Cloudflare?",
            a: "It reads what your browser shows, so a list drawn by JavaScript works, including one that loads more as you scroll (Auto scroll). A Cloudflare or other verification page stops the run until you complete the check in the tab yourself; the extension never gets past one for you.",
        },
        {
            q: "Is this free?",
            a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create. That includes lists from any website, every page of results, bulk runs and every export format.",
        },
        {
            q: "Can it extract a table from a website?",
            a: "Yes. A table is detected like any list, with the columns named from its header row. Pick it on the List tab, click Collect, and export to Excel or Google Sheets.",
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
            q: "Does it work on a page I'm signed in to?",
            a: "Yes. It reads the page as you see it in your own browser, so a member directory or your own account pages are collected like any other. It never signs in for you.",
        },
        {
            q: "Is there a tutorial?",
            a: "Yes: How To Scrape Data from Any Website into Excel, No Code, with a screenshot for every step, and How To Scrape Every Page of a List, Not Only the First for lists that continue over pages.",
        },
    ],
    related: ["ai-chat", "bulk-scraper", "export-to-google-sheets", "product-scraper", "email-extractor"],
};
