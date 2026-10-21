import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Bulk page steps Upload → Detect → Configure → Run; three entry modes (bulk, contacts, text): entrypoints/bulk/
// - Inputs: CSV/TXT file, pasted URLs, a saved table's URL column; chat-pasted URLs open Bulk prefilled:
//   lib/bulk/dataSourceUrls.ts, lib/tools/ (open_bulk card)
// - Site types list / Maps / Scholar / contacts / page text, one site at a time in order, pauses for
//   verification, Stop keeps rows, "Collection results page" merge: lib/bulk/executors/, lib/bulk/useBulkRunner.ts
// - Maps contact details during a bulk run: DECISIONS.md D-023
// - Not in Bulk: Shopify catalogs; no notifications for bulk runs: change_documentation/REFACTORING_TODO.md

export const bulkScraper: FeaturePageContent = {
    page: getPage("bulk-scraper"),
    meta: {
        title: "Bulk Scraper: Collect from a List of URLs in One Run",
        description:
            "Paste or upload a list of web pages and Web Scraper Pro collects from every one of them in turn: lists, Maps searches, contact details or page text, merged into one table.",
    },
    eyebrow: "Bulk runs",
    h1: "Collect from a list of web pages in one run",
    intro:
        "Give it the addresses, say what to collect from each, and let it work through them one by one in your browser. You get one table per site and a combined one.",
    lastUpdated: "2026-10-20",
    hero: "ext/bulk-overview",
    sample: {
        caption: "The combined table after a run over three category pages. Products and prices are made up.",
        columns: ["Source URL", "Product Name", "Price", "Rating", "Product URL"],
        rows: [
            ["store.example/boots", "Ridge Hiking Boots", "$129.00", "4.8", "store.example/ridge-boots"],
            ["store.example/boots", "Scree Approach Boots", "$149.00", "4.5", "store.example/scree-boots"],
            ["store.example/jackets", "Summit Rain Jacket", "$74.50", "4.3", "store.example/summit-jacket"],
            ["store.example/socks", "Basecamp Socks, 3 pack", "$18.00", "4.7", "store.example/basecamp-socks"],
        ],
    },
    fields: {
        eyebrow: "What a run can collect",
        heading: "The same jobs, over many pages",
        intro: "Each address in the list is set up with one of these. Pages from the same site share one setup.",
        items: [
            { name: "Lists", description: "The detected list on each page, or an area you point at, with the next pages, Load more or auto scroll if you want them." },
            { name: "Maps searches", description: "Paste several Maps search links and get every search's businesses, with their contact details added during the run." },
            { name: "Contact details", description: "Emails, phone numbers and social links from each website, one row per site." },
            { name: "Page text", description: "The readable text and details of each page: title, description, author, date and word count." },
            { name: "Research papers", description: "Google Scholar result pages, with every paper's title, authors, source, year and citations." },
        ],
    },
    steps: {
        heading: "Four steps, then it runs on its own",
        items: [
            {
                title: "Add the addresses",
                screenshot: "ext/bulk-upload",
                body: "Click the Bulk scrape icon at the top of the side panel and choose Bulk scrape, Collect contacts or Collect page text. Upload a CSV or TXT file with one address per line, paste them in, or reuse a column from a table you collected earlier.",
            },
            {
                title: "Check what it found",
                body: "The Detect step groups the addresses by site and says what each one is: a list page, a Maps search, a Scholar search, or a plain page. Drag the sites into the order you want.",
            },
            {
                title: "Set up each site",
                screenshot: "ext/bulk-contacts-config",
                body: "For a list site, confirm the list or pick an area on the page, and choose Next page, Load more or Auto scroll if the pages go on. For contacts, choose emails, phones and social links. For text, choose clean text, page details or both.",
            },
            {
                title: "Start collecting",
                screenshot: "ext/bulk-run",
                body: "Sites run one after another in an embedded browser frame, so you can watch progress and stop at any time; what's collected is kept. When it finishes, the Collection results page shows every site's table and merges them into one.",
            },
        ],
    },
    sections: [
        {
            id: "from-chat",
            eyebrow: "From chat",
            heading: "Paste the addresses into chat",
            paragraphs: [
                "Chat works on one page at a time, so when you paste a list of addresses it offers to open a bulk run with them already filled in.",
            ],
        },
        {
            id: "signed-in",
            eyebrow: "Sites that ask questions",
            heading: "It waits for you when a site checks",
            paragraphs: [
                "If a site shows a verification step, the run pauses and shows Waiting for you. Complete the check in the frame and the run carries on. Sites you're signed in to are collected as you see them.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Sites run one at a time, on purpose: it keeps the load on each site light and avoids triggering their limits. A long list takes a while; the tab needs to stay open.",
            "Shopify catalog exports run from the store's own page, not from a bulk run.",
            "A bulk run doesn't send a notification when it finishes; keep the panel visible or check History.",
            "Each site's rules on collecting and reusing data still apply. For personal details such as emails, collect only what you need.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Many cities, one list", body: "Paste ten Maps searches, one per town, and get every business with its contact details in one table." },
            { title: "Emails for a client list", body: "Upload the client's list of company websites and hand back the same list with emails and phones." },
            { title: "Catalog across categories", body: "Every category page of a store in one run, merged into a single product sheet." },
            { title: "Articles for research", body: "A reading list of pages, as clean text with titles and dates, ready for a report or an AI tool." },
        ],
    },
    faqs: [
        {
            q: "How many addresses can I add?",
            a: "There's no fixed limit on the list. Sites run one at a time, so the practical limit is how long you want the run to take; a few hundred pages is normal.",
        },
        {
            q: "Can I reuse a list I collected?",
            a: "Yes. Choose Reuse URLs from a saved table, pick the collection in History, then the column that holds the addresses, such as Website or Product URL.",
        },
        {
            q: "Do I get one table or many?",
            a: "Both. Each site is saved as its own collection, and View merged table puts them in one table with a Source URL column.",
        },
        {
            q: "Can it run while I do something else?",
            a: "It runs in your browser, so the tab stays open, but you can keep working in other windows. Runs that go through many pages of one site are faster when their tab stays in front.",
        },
        {
            q: "Is this included in the plan?",
            a: "Yes. Bulk runs are part of the one plan, Pro, with every other feature.",
        },
    ],
    related: ["email-extractor", "maps-leads", "list-scraper", "page-text", "export-to-google-sheets"],
};
