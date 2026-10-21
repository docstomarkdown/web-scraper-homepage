import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Rina, freelancer or virtual assistant (docs/personas.md). Facts checked against release 1.3.0 on 2026-10-21:
// list detection on any site and Choose an item on the page (components/scraper/ListTab.tsx), ready-made packs
// (configs-prod/), results page rename/reorder/delete/filter and exports (entrypoints/dataviewer/), Bulk scrape and Collect
// contacts (entrypoints/bulk/), History. No pricing claims beyond "one plan". Draft until the screenshots exist.

export const freelanceDataWork: UseCasePageContent = {
    page: getPage("freelance-data-work", "use-case"),
    meta: {
        title: "Freelance Data Work: Client-Ready Lists from Any Website",
        description: "Deliver lead lists, product lists and directory exports from whatever site the client names, with clean column names and no duplicates, in Excel or Google Sheets, and run it again next order.",
    },
    h1: "Client-ready data from whatever site the client names",
    intro: "A new order means a new site, a deadline and the client's own format. Collect the list in your browser, name and order the columns the way the brief says, and deliver an Excel or Google Sheets file the same day.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "More orders a day, fewer hours of copy-paste",
        paragraphs: [
            "Lead lists, product lists, directory exports, web research: the jobs differ, the shape is the same. The client names a site, says which fields they want and how the sheet should look, and wants it by tomorrow with no duplicates and no typos.",
            "Web Scraper Pro collects the list from the page in your browser, on sites it knows and sites it has never seen, and the results page lets you rename, reorder and clean the columns before you export. The next order on the same site is the same clicks.",
        ],
    },
    workflow: {
        heading: "From the brief to the delivery file",
        steps: [
            { title: "Open the site and find the list", body: "On a site with a ready-made setup, the columns are already named. On any other site, the List tab finds the lists on the page; if it picks the wrong one, click Choose an item on the page and click one entry.", feature: "list-scraper", screenshot: "ext/list-tab-detected" },
            { title: "Collect every page", body: "Choose Collect more pages, set Stop after, and click Collect from N pages. Rows that appear twice, in a carousel or on the next page, are kept once.", feature: "list-scraper", screenshot: "ext/list-tab-more-pages" },
            { title: "Add the contact details the brief asks for", body: "If the rows have websites, click Add contact details on the results page to add emails, phone numbers and social links from each site. For a list of websites the client sends, paste them into Bulk scrape → Collect contacts.", feature: "email-extractor", screenshot: "ext/results-add-contacts" },
            { title: "Shape the sheet to the client's format", body: "Hover a header to rename or delete a column, drag headers to reorder, filter out the rows the client doesn't want. Or say it in the Chat tab with the results tab in front: \"only company, phone, email and city, sorted by city\".", feature: "export-to-google-sheets", screenshot: "ext/results-rename-column" },
            { title: "Deliver, and keep it for the next order", body: "Export as Excel, CSV or a Google Sheet you can share. The collection stays in History, so a refresh or a repeat order is a rerun, not a redo.", feature: "export-to-google-sheets", screenshot: "ext/results-export-menu" },
        ],
    },
    sample: {
        caption: "Three rows of a delivered directory export, renamed to the client's headings. Names and numbers are made up.",
        columns: ["Company", "City", "Phone", "Email", "Website", "Category"],
        rows: [
            ["Bright Smile Dental", "Austin", "(555) 010-2231", "hello@brightsmile.example", "brightsmile.example", "Dentist"],
            ["Northgate Plumbing", "Northgate", "(555) 019-8800", "quotes@northgate-plumbing.example", "northgate-plumbing.example", "Plumber"],
            ["Bluebird Bakery", "Riverside", "(555) 017-7431", "orders@bluebird-bakery.example", "bluebird-bakery.example", "Bakery"],
        ],
    },
    sites: [{ name: "Maps", page: "maps" }, { name: "Yellow Pages", page: "yellow-pages" }, { name: "Amazon", page: "amazon" }, { name: "Zillow", page: "zillow" }, { name: "Any directory, store or job board the client names" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Collect from sites that show nothing until you sign in, such as LinkedIn or a members-only directory, unless you have an account and the site allows exporting.",
            "Verify emails or guarantee a field the site doesn't show. What's on the page is what you get; say so in the delivery note.",
            "Run while you're away. Collecting happens in your open browser; bulk runs queue several sites but still need the window open. Cloud runs are coming.",
            "Decide what's allowed. Collecting personal data, or data a site's terms forbid, is on you and the client; check before you accept the order.",
        ],
    },
    guides: ["scrape-data-from-any-website-to-excel", "get-emails-from-a-list-of-websites", "collect-every-page-of-results", "get-local-business-leads-from-maps"],
    faqs: [
        { q: "Does it work on a site that isn't in your list?", a: "Yes. On any site with a list, the List tab finds it and names the columns from the page's own labels; Choose an item on the page handles the rest. Ready-made sites simply come with better names." },
        { q: "Can I deliver in the client's column names and order?", a: "Yes. Rename, reorder and remove columns on the results page before you export, or tell the Chat tab the columns you want. The export matches what's shown." },
        { q: "How do I avoid duplicates?", a: "Rows that repeat across pages or carousels are kept once on their own. For lists you combine from several runs, the results page's filters and your spreadsheet's remove-duplicates finish the job." },
        { q: "Is there a per-row price or usage limit?", a: "No per-row pricing and no credits. There's one plan, Pro, with every feature included; a Maps search in chat returns up to 200 businesses per run, and bulk runs cover lists of URLs." },
    ],
};
