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
// - Labels on the bulk page (entrypoints/bulk/*.tsx, 2026-10-21): "Drop your URL list here", "Paste URLs, one per
//   line", "Reuse URLs from a saved table", "Review sites", "Collection order — sites run from top to bottom; drag to
//   reorder", "Follows Next page" / "Clicks Load more" / "Scrolls for more", "Pick area", "Email addresses" /
//   "Phone numbers" / "Social media links", "Clean page text" / "Page details", "Start collecting", "Collection
//   results", "Results reflect what finished before you stopped it."
// - A site with no progress for 90 seconds is treated as stalled; a run is capped at 60 minutes:
//   lib/bulk/useBulkRunner.ts (STALL_TIMEOUT_MS, OVERALL_CAP_MS). Verify in a run whether the cap is per site or per run.
// Title and headings target what people type ("how to scrape multiple pages", "web scrape multiple pages",
// "scrape a list of urls"): youtube-research/AUTOSUGGEST.md and SEARCH_QUERIES.md, 2026-10-21. The guides own
// "scrape data from a list of URLs in one run" and "scrape a list and then every detail page"; this page owns
// "scrape multiple pages or URLs at once". Deepened 2026-10-21 (worked example, recipes, settings, comparison,
// limits, troubleshooting) from the sources above; nothing added that isn't in them.

export const bulkScraper: FeaturePageContent = {
    page: getPage("bulk-scraper"),
    meta: {
        title: "How to Scrape Multiple Pages or URLs of a Website at Once",
        description:
            "Paste or upload a list of web addresses, say what to collect from each site, and the extension works through them one by one in your browser: lists, Google Maps searches, contacts or page text, in one merged table.",
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
                body: "Click the Bulk scrape icon at the top of the side panel. Choose Bulk scrape, Collect contacts or Collect page text. Then drop a CSV or TXT file with one address per line onto the page, or paste the addresses in.",
                points: [
                    "Use saved data takes the addresses from a table you collected earlier; the step then reads Reuse URLs from a saved table. The Website column of a Google Maps list is the usual one.",
                    "Paste a list of addresses into the Chat tab and it offers to open a bulk run with them filled in.",
                    "A chip reads N valid URLs detected. Each address needs to start with http or https.",
                ],
                screenshot: "ext/bulk-upload",
            },
            {
                title: "Check what it found",
                body: "The Review sites step groups the addresses by site and says what each one is. It knows a list page, a Google Maps search, a Scholar search and a plain page. Drag the sites into the order you want and remove any you don't.",
                points: ["Pages from the same site share one setup, so 80 product pages from one store are one site to set up, not 80."],
            },
            {
                title: "Set up each site",
                body: "For a list site, confirm the list it found or click Pick area to choose part of the page. For contacts, choose emails, phones and social links. For page text, choose clean text, page details or both.",
                points: [
                    "If a list goes on over many pages, choose Next page, Load more or Auto scroll and set a page limit.",
                    "Google Maps and Google Scholar searches set themselves up; there's nothing to pick.",
                    "Google Maps searches collect each business's contact details during the run.",
                ],
                screenshot: "ext/bulk-contacts-config",
            },
            {
                title: "Click Start collecting",
                body: "Sites load one after another in an embedded browser on the right, while the cards on the left count rows. Stop keeps everything collected so far. When it finishes, the Collection results page shows every site's table and merges them into one.",
                points: ["If a site asks you to verify, the run pauses with Waiting for you. Complete the check in the embedded browser and it carries on."],
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
                "Google Maps shows a limited number of results per search, so a big city works better as several neighbourhood or zip-code searches than as one. Ten searches of 100 businesses each beat one search that stops at 120.",
            ],
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Forty company websites to a contact list, start to finish",
            paragraphs: [
                "A client sends a spreadsheet of 40 company websites and wants an email and a phone number for each. Here is the whole job, with what the screen shows at every step.",
            ],
            steps: [
                { title: "Save the client's list as a CSV.", body: "One address per line, nothing else in the file. Open the side panel, click the Bulk scrape icon and choose Collect contacts." },
                { title: "Drop the file on the Upload step.", body: "The chip reads 40 valid URLs detected. If it reads fewer, the missing ones lack http or https; fix them in the file and drop it again." },
                { title: "Check the Review sites step.", body: "Forty sites appear, one per company, in the file's order. Remove the two the client already has details for." },
                { title: "Leave Email addresses, Phone numbers and Social media links on.", body: "The Configure step applies the same choice to every site. One linked Contact or About page per site is read as well. Click Start collecting." },
                { title: "Let it run.", body: "Each site takes a few seconds to about half a minute. Thirty-eight sites finish in roughly 15 minutes while you do something else in another window." },
                { title: "Open the merged table.", body: "One row per site: Source URL, Email addresses, Phone numbers and one column per social network. Sites with no published email show an empty cell, not a guess." },
                { title: "Export as Microsoft Excel.", body: "Rename the Source URL column to Website if the client's sheet calls it that, then export. The run stays in History." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "What you can do with the table",
            heading: "Four things to do with a merged table",
            paragraphs: ["The merged table is an ordinary results page, so everything the results page does works on it."],
            points: [
                "Keep one site's rows: open that site's own table with View on the Collection results page, instead of filtering the merged one.",
                "Hide the columns that only one site has: click Columns and untick them, or turn on Hide mostly empty columns in Settings → Results.",
                "Feed the next run: a merged table with a Website or Product URL column can be the input of another bulk run. Choose Use saved data. A list run, then a contacts run over its websites, is the usual pair.",
                "Ask chat for the shape you want. With the results tab in front, type \"only name, phone and source url, sorted by name\" and download what's shown.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Settings that change the result of a bulk run",
            paragraphs: ["A bulk run uses the same settings as a single collection. They sit under Settings → Results, and the Configure step can override the page limit per site."],
            table: {
                columns: ["Setting", "Default", "Change it when"],
                rows: [
                    ["Pages to go through", "5", "A category runs to 20 pages and you want all of them; set it on the Configure card for that site"],
                    ["Add emails from their websites", "On", "You want a quick list of Google Maps names and phones without the extra seconds per business"],
                    ["Remove duplicates", "On", "Two pages of a list repeat an item on purpose and you want both rows"],
                    ["Hide mostly empty columns", "On", "A column that only a few sites fill matters to you; show it again on the results page"],
                    ["Save prices, ratings and counts as numbers", "On", "You need the price exactly as the page shows it, with its currency sign"],
                ],
                caption: "Settings → Results in the side panel. Each applies to every site's table and to the merged one.",
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "A bulk run, compared with doing it by hand, with code, or with an API",
            paragraphs: ["For a list of pages you can open in your browser, a bulk run is the quickest route that needs no setup. The table says where each of the other routes still wins."],
            table: {
                columns: ["Route", "Setup", "Where it breaks", "Pick it when"],
                rows: [
                    ["A bulk run in the extension", "None: paste the list, one setup per site", "The tab must stay open; sites run one at a time, so thousands of pages take hours", "The list is tens to a few hundred pages and you want it today"],
                    ["By hand", "None", "Forty pages is an afternoon; errors creep in by page ten", "Five pages or fewer"],
                    ["A script", "Hours to write, more when a site changes", "Sign-ins, verifications and pages that load as you scroll each need their own code", "The same job must run unattended every day"],
                    ["A scraping API", "An account, a key and a request format", "Pages you're signed in to and per-site quirks; costs scale with pages", "You're wiring data into your own software"],
                ],
            },
        },
        {
            id: "doesnt",
            eyebrow: "What it doesn't do",
            heading: "What a bulk run doesn't do",
            paragraphs: ["Six limits worth knowing before you paste a long list."],
            points: [
                "It doesn't crawl a site to find pages. You give it the addresses; a list run can give you the addresses for a second run.",
                "It doesn't run with the tab closed or the computer asleep. Scheduled runs that work without you are coming with the cloud.",
                "It doesn't sign in or complete a verification for you. A site that asks pauses the run until you do it in the embedded browser.",
                "It doesn't export Shopify catalogs. Those run from the store's own page in the side panel, with the store card.",
                "It doesn't send a notification when it finishes. Check the bulk tab or History.",
                "It doesn't make a site's columns match another's. The merged table shows every site's columns side by side, with a Source URL.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When a site pushes back",
            heading: "What the run does when a site asks a question or stops answering",
            paragraphs: ["Sites run one at a time so each one sees an ordinary visitor and the load stays light."],
            points: [
                "A verification page pauses the run with Waiting for you. Complete the check in the embedded browser and it carries on.",
                "A site that makes no progress for about a minute and a half is treated as stalled. Its rows so far are kept and the run moves on.",
                "A long run has a time cap of about an hour. What was collected is saved; start a second run with the rest of the list.",
                "A long list needs the tab open. The run doesn't send a notification when it finishes; check the panel or History.",
            ],
        },
        {
            id: "goes-wrong",
            eyebrow: "When it goes wrong",
            heading: "The five things that go wrong, and the fix for each",
            paragraphs: ["Most problems show up on the Upload step or in the merged table, and each has a one-line fix."],
            points: [
                "Continue stays greyed out. No valid addresses were found. Each one needs http or https at the start, one per line.",
                "Fewer URLs detected than lines in the file. Some lines hold more than one address, or a stray space. Put one per line and drop the file again.",
                "A site shows Waiting for you. It asked for a verification. Complete it in the embedded browser; the run carries on.",
                "The merged table mixes columns from different sites. That's by design. Open one site's table with View for a clean set, or hide the extra columns.",
                "The run didn't finish overnight. The tab was closed or the computer slept. What was collected before is in History; run the rest.",
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
            a: "There's no fixed limit on the list. Sites run one at a time, so the practical limit is how long you want the run to take. A few hundred pages is normal; a run is capped at about an hour, and you can run the rest afterwards.",
        },
        {
            q: "Can I scrape all the pages of a website?",
            a: "Every page of a list, yes: choose Next page, Load more or Auto scroll for that site and set a page limit. The run doesn't crawl a whole site on its own; you give it the addresses.",
        },
        {
            q: "How do I scrape multiple pages of a website with different layouts?",
            a: "Paste them all. The Review sites step groups the addresses by site, and each site gets its own setup on the Configure step. The merged table shows every site's columns with a Source URL per row.",
        },
        {
            q: "Do I get one table or many?",
            a: "Both. Each site is saved as its own collection, and View merged table puts them in one table with a Source URL column.",
        },
        {
            q: "Can I use a list I already collected as the input?",
            a: "Yes. On the Upload step, click Use saved data and pick the table and its address column. The Website column of a Google Maps list or the Product URL column of a category both work.",
        },
        {
            q: "What file format does the URL list need?",
            a: "A CSV or TXT file with one address per line, or the addresses pasted in. A spreadsheet export with one column of addresses works as the CSV.",
        },
        {
            q: "Can it run while I do something else?",
            a: "Yes, in other windows. The run happens in your browser, so its tab must stay open.",
        },
        {
            q: "Can I run it overnight?",
            a: "Only while the browser tab stays open and the computer stays awake. Scheduled runs that work without you are coming with the cloud.",
        },
        {
            q: "Does it stop when one site fails?",
            a: "No. A site that stops answering is skipped after about a minute and a half without progress. Its rows so far are kept, and the run moves to the next site.",
        },
    ],
    related: ["email-extractor", "maps-leads", "list-scraper", "page-text", "export-to-google-sheets"],
};
