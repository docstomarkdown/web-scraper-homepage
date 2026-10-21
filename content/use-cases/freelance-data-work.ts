import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Rina, freelancer or virtual assistant (docs/personas.md), written so a first-time reader can follow. Facts checked
// against release 1.3.0 on 2026-10-21: list detection on any site and Choose an item on the page (components/scraper/
// ListTab.tsx), ready-made packs (configs-prod/), results page rename/reorder/delete/filter and exports
// (entrypoints/dataviewer/), Bulk scrape and Collect contacts (entrypoints/bulk/), History. No pricing claims:
// the extension is free (owner decision, 2026-10-21). Draft until the screenshots exist.

export const freelanceDataWork: UseCasePageContent = {
    page: getPage("freelance-data-work", "use-case"),
    meta: {
        title: "Freelance Data Work: Client-Ready Lists from Any Website",
        description: "Deliver lead lists, product lists and directory exports from whatever site the client names, with clean column names and no duplicates, in Excel or Google Sheets, and run it again next order.",
    },
    h1: "Deliver a clean list from whatever website the client names",
    intro: "A new order means a new website, a deadline and the client's own format. Open the site, click Collect, name the columns the way the client wants, and send an Excel or Google Sheets file the same day.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "More orders a day, fewer hours of copy and paste",
        paragraphs: [
            "Lead lists, product lists, directory exports, web research: the jobs differ, the shape is the same. The client names a site, says which fields they want and how the sheet should look, and wants it by tomorrow with no duplicates and no typos.",
            "Web Scraper Pro collects the list from the page inside your Chrome browser, on sites it knows and on sites it has never seen. The results page lets you rename, reorder and clean the columns before you save the file. The next order on the same site is the same clicks.",
            "You don't need to know anything technical. If the site shows a list, you can collect it.",
        ],
    },
    workflow: {
        heading: "From the brief to the delivery file",
        intro: "Five steps. A directory of a few hundred rows is usually done in fifteen minutes.",
        steps: [
            {
                title: "Open the site and find the list",
                body: "Open the page the client named and click the Web Scraper Pro icon; a panel opens on the right. In the List tab, the lists on the page appear with a count each, such as List 1, 24 items on this page. Click the one you want.",
                points: ["On a site with a ready-made setup, such as Google Maps, Yellow Pages, Amazon or Zillow, the columns come out named.", "On any other site, the columns are named from the page's own labels, and you can rename them.", "Wrong list? Click Choose an item on the page, then click one entry on the page. Every similar entry is picked with it."],
                feature: "list-scraper",
                screenshot: "ext/list-tab-detected",
            },
            {
                title: "Collect every page",
                body: "Choose Collect more pages, set Stop after (5 pages by default, or All pages), and click Collect from N pages. The extension clicks Next, waits, collects, and repeats. Keep the tab in front while it runs.",
                points: ["Load more buttons and endless scrolling work the same way.", "An entry that appears twice, on two pages or in a carousel, is kept once."],
                feature: "list-scraper",
                screenshot: "ext/list-tab-more-pages",
            },
            {
                title: "Add the contact details the brief asks for",
                body: "If the rows have websites, click Add contact details on the results page. Each website is read for emails, phone numbers and social links, and the new columns fill in. For a list of websites the client sends you, paste them into Bulk scrape → Collect contacts.",
                points: ["Many small businesses publish no email. Say so in the delivery note: a list with 60% emails is normal.", "Fifty websites take about four minutes."],
                feature: "email-extractor",
                screenshot: "ext/results-add-contacts",
            },
            {
                title: "Shape the sheet to the client's format",
                body: "Hover a column's name and click the pencil to rename it, or the trash icon to remove it. Drag names to reorder. Click Filter rows to drop the rows the client doesn't want. Or say it in the panel's chat with the results tab in front.",
                points: ["Example to type: Only company, phone, email and city, sorted by city", "Mostly empty columns are hidden on their own; click Columns to show them if the client wants them."],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-rename-column",
            },
            {
                title: "Send the file, and keep it for the next order",
                body: "Click Export as and choose Excel, CSV, or a Google Sheet you can share. The file matches what's on screen. The collection stays in History, so a refresh or a repeat order is a rerun, not a redo.",
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    sample: {
        caption: "This is what three rows look like, renamed to the client's headings.",
        columns: ["Company", "City", "Phone", "Email"],
        rows: [
            ["Bright Smile Dental", "Austin", "(555) 010-2231", "hello@brightsmile.example"],
            ["Northgate Plumbing", "Northgate", "(555) 019-8800", "quotes@northgate.example"],
            ["Bluebird Bakery", "Riverside", "(555) 017-7431", "orders@bluebird.example"],
        ],
    },
    sites: [{ name: "Google Maps", page: "maps" }, { name: "Yellow Pages", page: "yellow-pages" }, { name: "Amazon", page: "amazon" }, { name: "Zillow", page: "zillow" }, { name: "Any directory, store or job board the client names" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Collect from sites that show nothing until you sign in, such as LinkedIn or a members-only directory, unless you have an account and the site allows exporting.",
            "Check that an email still works, or invent a field the site doesn't show. What's on the page is what you get; say so in the delivery note.",
            "Run while you're away. Collecting happens in your open browser; bulk runs queue several sites but still need the window open. Cloud runs are coming.",
            "Decide what's allowed. Collecting personal data, or data a site's terms forbid, is on you and the client. Check before you accept the order.",
        ],
    },
    guides: ["scrape-data-from-any-website-to-excel", "get-emails-from-a-list-of-websites", "collect-every-page-of-results", "get-local-business-leads-from-maps"],
    faqs: [
        { q: "Does it work on a site that isn't in your list?", a: "Yes. On any site with a list, the List tab finds it and names the columns from the page's own labels; Choose an item on the page handles the rest. Ready-made sites come with better names." },
        { q: "Can I deliver in the client's column names and order?", a: "Yes. Rename, reorder and remove columns on the results page before you save, or tell the chat the columns you want. The file matches what's shown." },
        { q: "How do I avoid duplicates?", a: "Rows that repeat across pages or carousels are kept once on their own. For lists you combine from several runs, use your spreadsheet's remove-duplicates on the website or phone column." },
        { q: "How much data can I collect in a day?", a: "There's no credit or per-row limit. A Google Maps search returns up to 200 businesses per run, a list runs as many pages as you set, and bulk runs cover lists of URLs. Big sites slow down anyone who loads hundreds of pages fast, so split big jobs into runs." },
        { q: "Is there a per-row price?", a: "No. Web Scraper Pro is free to use today, with every feature included and no credits to count." },
    ],
};
