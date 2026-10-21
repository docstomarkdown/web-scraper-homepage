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
                points: ["One address per line, pasted or in a CSV or TXT file.", "Use saved data takes the addresses from a column of a table you collected earlier, such as the Website column of a Maps list."],
                screenshot: "ext/bulk-upload",
                body: "Click the Bulk scrape icon at the top of the side panel and choose Bulk scrape, Collect contacts or Collect page text. Upload a CSV or TXT file with one address per line, paste them in, or reuse a column from a table you collected earlier.",
            },
            {
                title: "Check what it found",
                points: ["Drag the sites into order and remove any you don't want.", "Pages from the same site share one setup."],
                body: "The Detect step groups the addresses by site and says what each one is: a list page, a Maps search, a Scholar search, or a plain page. Drag the sites into the order you want.",
            },
            {
                title: "Set up each site",
                points: ["Lists: confirm the list, then Next page, Load more or Auto scroll with a page limit.", "Contacts: Email addresses, Phone numbers and Social media links, on for every site unless you untick them.", "Page text: clean text, page details or both."],
                screenshot: "ext/bulk-contacts-config",
                body: "For a list site, confirm the list or pick an area on the page, and choose Next page, Load more or Auto scroll if the pages go on. For contacts, choose emails, phones and social links. For text, choose clean text, page details or both.",
            },
            {
                title: "Start collecting",
                points: ["Sites load one after another in the embedded browser on the right while the cards count rows.", "Stop keeps everything collected so far. If a site asks you to verify, the run pauses with Waiting for you."],
                screenshot: "ext/bulk-run",
                body: "Sites run one after another in an embedded browser frame, so you can watch progress and stop at any time; what's collected is kept. When it finishes, the Collection results page shows every site's table and merges them into one.",
            },
        ],
    },
    sections: [
        {
            id: "settings",
            eyebrow: "Settings that change the result",
            heading: "The Results settings apply to every site in the run",
            paragraphs: ["A bulk run uses the same settings as a single collection, so set them once under Settings → Results."],
            points: ["Pages to go through sets the page limit each list site starts with; change it per site on the Configure step.", "Remove duplicates, Hide mostly empty columns and Save prices as numbers apply to every site's table and to the merged one.", "For Maps searches in a bulk run, Add emails from their websites decides whether contact details are read during the run."],
        },
        {
            id: "pushback",
            eyebrow: "When a site pushes back",
            heading: "What the run does when a site asks a question or stops answering",
            paragraphs: ["Sites run one at a time on purpose, so each one sees an ordinary visitor and the load stays light."],
            points: ["A verification page pauses the run with Waiting for you. Complete the check in the embedded browser and it carries on.", "A site that stops answering is skipped after its pages time out; its rows so far are kept and the run moves to the next site.", "A long list needs the tab open. A run doesn't send a notification when it finishes; check the panel or History."],
        },
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
            q: "Is this free?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create.",
        },
        {
            q: "Can I run a bulk job overnight?",
            a: "Only while the browser tab stays open. The run happens in your browser; scheduled runs that work without you are coming with the cloud.",
        },
        {
            q: "Can I use a list I already collected as the input?",
            a: "Yes. On the Upload step, choose Use saved data and pick the table and its address column, such as the Website column of a Maps list.",
        },
    ],
    related: ["email-extractor", "maps-leads", "list-scraper", "page-text", "export-to-google-sheets"],
};
