import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Bulk page steps Upload → Detect → Configure → Run; three entry modes (bulk, contacts, text): entrypoints/bulk/
// - Inputs: CSV/TXT file, pasted URLs, a saved table's URL column; chat-pasted URLs open Bulk prefilled:
//   lib/bulk/dataSourceUrls.ts, lib/tools/ (open_bulk card)
// - Site types list / Google Maps / Scholar / contacts / page text, one site at a time in order, pauses for
//   verification, Stop keeps rows, "Collection results page" merge: lib/bulk/executors/, lib/bulk/useBulkRunner.ts
// - Google Maps contact details during a bulk run: DECISIONS.md D-023
// - Not in Bulk: Shopify catalogs; no notifications for bulk runs: change_documentation/REFACTORING_TODO.md
// Title and headings target what people type ("how to scrape multiple pages", "web scrape multiple pages",
// "scrape a list of urls"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md, 2026-10-21.

export const bulkScraper: FeaturePageContent = {
    page: getPage("bulk-scraper"),
    meta: {
        title: "How to Scrape Multiple Pages or URLs of a Website at Once",
        description:
            "Paste or upload a list of web addresses, say what to collect from each site, and Web Scraper Pro works through them one by one in your browser: lists, Google Maps searches, contact details or page text, merged into one table. Free, no code.",
    },
    eyebrow: "Bulk scraper",
    h1: "How to scrape multiple pages or URLs of a website at once",
    intro:
        "Paste or upload the addresses. Say what to collect from each site. The extension works through them one by one in your browser and gives you one table per site and one merged table. Free, no code.",
    lastUpdated: "2026-10-20",
    hero: "ext/bulk-overview",
    sample: {
        caption: "The merged table after a run over three category pages. Products and prices are made up.",
        columns: ["Source URL", "Product Name", "Price", "Rating"],
        rows: [
            ["store.example/boots", "Ridge Hiking Boots", "$129.00", "4.8"],
            ["store.example/boots", "Scree Approach Boots", "$149.00", "4.5"],
            ["store.example/jackets", "Summit Rain Jacket", "$74.50", "4.3"],
            ["store.example/socks", "Basecamp Socks, 3 pack", "$18.00", "4.7"],
        ],
    },
    steps: {
        heading: "How to scrape a list of URLs in four steps",
        intro: "Sites run one at a time, on purpose, so each one sees an ordinary visitor. A few hundred pages is a normal run.",
        items: [
            {
                title: "Add the addresses",
                body: "Click the Bulk scrape icon at the top of the side panel. Choose Bulk scrape, Collect contacts or Collect page text. Then upload a CSV or TXT file with one address per line, or paste the addresses in.",
                points: [
                    "Use saved data takes the addresses from a column of a table you collected earlier, such as the Website column of a Google Maps list.",
                    "Paste a list of addresses into the Chat tab and it offers to open a bulk run with them filled in.",
                ],
                screenshot: "ext/bulk-upload",
            },
            {
                title: "Check what it found",
                body: "The Detect step groups the addresses by site and says what each one is: a list page, a Google Maps search, a Scholar search, or a plain page. Drag the sites into the order you want and remove any you don't.",
                points: ["Pages from the same site share one setup."],
            },
            {
                title: "Set up each site",
                body: "For a list site, confirm the list it found or pick an area on the page. For contacts, choose emails, phones and social links. For page text, choose clean text, page details or both.",
                points: [
                    "If a list goes on over many pages, choose Next page, Load more or Auto scroll and set a page limit.",
                    "Google Maps searches collect each business's contact details during the run.",
                ],
                screenshot: "ext/bulk-contacts-config",
            },
            {
                title: "Click Start collecting",
                body: "Sites load one after another in an embedded browser on the right, while the cards on the left count rows. Stop keeps everything collected so far. When it finishes, the Collection results page shows every site's table and merges them into one.",
                points: ["If a site asks you to verify, the run pauses with Waiting for you. Complete the check and it carries on."],
                screenshot: "ext/bulk-run",
            },
        ],
    },
    fields: {
        eyebrow: "What a run can collect",
        heading: "The same jobs, over many pages",
        intro: "Each address in the list is set up with one of these.",
        items: [
            { name: "Lists", description: "The list on each page, or an area you point at, across the next pages if you want them." },
            { name: "Google Maps searches", description: "Every business from each search, with its contact details added during the run." },
            { name: "Contact details", description: "Emails, phone numbers and social links from each website, one row per site." },
            { name: "Page text", description: "The readable text and details of each page: title, description, author, date and word count." },
            { name: "Research papers", description: "Google Scholar result pages, with every paper's title, authors, source, year and citations." },
            { name: "Source URL", description: "Every row in the merged table says which page it came from." },
        ],
    },
    sections: [
        {
            id: "many-cities",
            eyebrow: "Google Maps",
            heading: "How to scrape Google Maps for many cities at once",
            paragraphs: [
                "Paste one Google Maps search link per town into the Bulk page. Each search runs in turn, with emails and social links read from each business's website during the run, and the merged table holds every town.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "The Results settings apply to every site in the run",
            paragraphs: ["A bulk run uses the same settings as a single collection. Set them once under Settings → Results."],
            points: [
                "Pages to go through sets the page limit each list site starts with. Change it per site on the Configure step.",
                "Remove duplicates, Hide mostly empty columns and Save prices as numbers apply to every site's table and to the merged one.",
                "Add emails from their websites decides whether Google Maps searches read contact details during the run.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When a site pushes back",
            heading: "What the run does when a site asks a question or stops answering",
            paragraphs: ["Sites run one at a time so each one sees an ordinary visitor and the load stays light."],
            points: [
                "A verification page pauses the run with Waiting for you. Complete the check in the embedded browser and it carries on.",
                "A site that stops answering is skipped after its pages time out. Its rows so far are kept and the run moves on.",
                "A long list needs the tab open. The run doesn't send a notification when it finishes; check the panel or History.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Sites run one at a time. A long list takes a while, and the tab needs to stay open.",
            "Shopify catalog exports run from the store's own page, not from a bulk run.",
            "Sites you're signed in to are collected as you see them.",
            "Each site's rules on collecting and reusing data still apply. For personal details such as emails, collect only what you need.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Many cities, one list", body: "Ten Google Maps searches, one per town, and every business with its contact details in one table." },
            { title: "Emails for a client list", body: "A client's list of company websites, handed back with emails and phones." },
            { title: "A catalog across categories", body: "Every category page of a store in one run, merged into a single product sheet." },
            { title: "Articles for research", body: "A reading list of pages as clean text with titles and dates, ready for a report or an AI tool." },
        ],
    },
    faqs: [
        {
            q: "Is bulk scraping free?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create.",
        },
        {
            q: "How many URLs can I scrape at once?",
            a: "There's no fixed limit on the list. Sites run one at a time, so the practical limit is how long you want the run to take. A few hundred pages is normal.",
        },
        {
            q: "Can I scrape all the pages of a website?",
            a: "Every page of a list, yes: choose Next page, Load more or Auto scroll for that site and set a page limit. The run doesn't crawl a whole site on its own; you give it the addresses.",
        },
        {
            q: "Do I get one table or many?",
            a: "Both. Each site is saved as its own collection, and View merged table puts them in one table with a Source URL column.",
        },
        {
            q: "Can I use a list I already collected as the input?",
            a: "Yes. On the Upload step, choose Use saved data and pick the table and its address column, such as the Website column of a Google Maps list.",
        },
        {
            q: "Can it run while I do something else?",
            a: "Yes, in other windows. The run happens in your browser, so its tab must stay open.",
        },
        {
            q: "Can I run it overnight?",
            a: "Only while the browser tab stays open. Scheduled runs that work without you are coming with the cloud.",
        },
    ],
    related: ["email-extractor", "maps-leads", "list-scraper", "page-text", "export-to-google-sheets"],
};
