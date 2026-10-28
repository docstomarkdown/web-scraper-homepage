import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Rina, freelancer or virtual assistant (docs/personas.md), written so a first-time reader can follow. Facts checked
// against release 1.3.0 on 2026-10-21: list detection on any site and Choose an item on the page (components/scraper/
// ListTab.tsx), ready-made packs (configs-prod/), results page rename/reorder/delete/filter and exports
// (entrypoints/dataviewer/), Bulk scrape and Collect contacts (entrypoints/bulk/), History. No pricing claims:
// the extension is free (owner decision, 2026-10-21). Draft until the screenshots exist.
// Title targets how a freelancer or client phrases the job ("data entry from a website to Excel", "web research list");
// no direct search-volume data for this page, 2026-10-21.

// Deepened 2026-10-21 (owner: pages too thin): variations, a worked example (the 300-row directory and its 190 emails are
// an illustration; the 50-sites-in-four-minutes timing is from the 1.3.0 release note), what to check before sending, mistakes,
// ten FAQs.
export const freelanceDataWork: UseCasePageContent = {
    page: getPage("freelance-data-work", "use-case"),
    meta: {
        title: "How to Deliver a Clean Data List from Any Website",
        description: "Deliver lead lists, product lists and directory exports from whatever site the client names, with clean column names and no duplicates, in Excel or Google Sheets. Free Chrome extension, no code."
    },
    h1: "How to deliver a clean data list from any website for a client",
    intro: "A new order means a new website, a deadline and the client's own format. With Web Scraper Pro, a free Chrome extension, you open the site, click Collect, name the columns the way the client wants, and send an Excel or Google Sheets file the same day.",
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
                body: "Choose Collect more pages, set Stop after (5 pages by default, or All pages), and click Collect from N pages. The extension clicks Next, waits, collects and repeats; keep the tab in front while it runs.",
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
                body: "Hover a column's name and click the pencil to rename it, or the trash icon to remove it, and drag names to reorder. Click Filter rows to drop the rows the client doesn't want. Or say it in the panel's chat with the results tab in front.",
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
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Four orders, one set of clicks",
            paragraphs: [
                "Most data orders fall into one of these shapes. The table shows where each starts and what to tell the client about the result.",
            ],
            table: {
                columns: ["Order", "Start from", "What to tell the client"],
                rows: [
                    ["Lead list by trade and city", "Chat: Find roofers in Phoenix, then Add contact details if needed", "One business per row with phone and website; emails for the businesses that publish one, usually not all."],
                    ["Directory export", "The directory's category page in the List tab, Collect more pages", "Every listing across the pages; columns named from the page, renamed to the brief."],
                    ["Product list from a store", "The category page, or the Shopify stores card", "Name, price, rating, review count and link; for Shopify, every variant with SKU and images."],
                    ["Emails for a list of websites", "The client's CSV in Bulk scrape → Collect contacts", "One row per site with emails, phones and social links; sites with no published email come back with the phone only."],
                    ["Web research into a sheet", "Any results page in the List tab", "The list as a table with its links; add the detail pages in a second run if the brief needs them."],
                ],
                caption: "On a site with a ready-made setup the columns come out named; on any other site they're named from the page and you rename them once.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "A 300-row directory order, with the numbers",
            paragraphs: [
                "Here is a typical order from brief to delivery: every member of a trade association's online directory, with company, city, phone and email, in the client's column order.",
            ],
            steps: [
                { title: "Open the directory and find the list.", body: "In the List tab the members show as a list with a count, such as List 1, 25 items on this page. Hover it and the entries are outlined on the page." },
                { title: "Collect every page.", body: "Choose Collect more pages, set Stop after to All pages, and click Collect. Twelve pages of 25 take two or three minutes; an entry that repeats across pages is kept once." },
                { title: "Add the emails.", body: "The rows have a Website column, so click Add contact details on the results page. Each site is read for emails, phones and social links; 50 websites take about four minutes, so 300 take about half an hour." },
                { title: "Shape it to the brief.", body: "Rename the headers with the pencil to Company, City, Phone, Email; drag them into that order; remove the rest with the trash icon. Filter rows if the brief excludes a region." },
                { title: "Deliver.", body: "Export as → Excel. Write the delivery note: 300 rows, 190 with an email, the rest with phone only, collected today. The collection stays in History for the repeat order." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do before you send it",
            paragraphs: [
                "Ten minutes of checking saves a revision round. These four are the ones clients notice.",
            ],
            points: [
                "Duplicates: Remove duplicates on the results page keeps one copy of a repeated row. For a list combined from several runs, use your spreadsheet's remove-duplicates on the website or phone column too.",
                "Column names and order: the file matches what's on screen, so rename and reorder before Export as, not after in Excel.",
                "Empty columns: mostly empty columns are hidden on their own. Click Columns to show one the client asked for, even if it's thin, and say so in the note.",
                "The note: say what the source was, when it was collected, how many rows have each field, and what the site didn't show. A list with 60% emails is normal; a client who expected 100% is a revision.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes to avoid",
            heading: "Six things that cost a revision",
            paragraphs: [
                "Every one of these has cost a freelancer an evening.",
            ],
            points: [
                "Accepting an order the site can't give. If the site shows nothing until you sign in, such as LinkedIn or a members-only directory, check whether you have access and the site allows exporting before you quote.",
                "Running all pages before checking page one. Collect This page only first, read the columns, then run the rest.",
                "Promising emails for every row. Only sites that publish an email get one. Put the expected share in the quote.",
                "Renaming columns in Excel instead of on the results page. The next order on the same site then starts from scratch; done in the extension, the collection in History already has the right names.",
                "Closing the browser during a bulk run. Sites run one at a time and the tab needs to stay open. A run you stop keeps its rows.",
                "Collecting personal data because the client asked. Personal data and sites whose terms forbid collection are on you and the client; check before you accept the order.",
            ],
        },
    ],
    sites: [{ name: "Yellow Pages", page: "yellow-pages" }, { name: "Amazon", page: "amazon" }, { name: "Zillow", page: "zillow" }, { name: "Google Maps" }, { name: "Any directory, store or job board the client names" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Collect from sites that show nothing until you sign in, such as LinkedIn or a members-only directory, unless you have an account and the site allows exporting.",
            "Check that an email still works, or invent a field the site doesn't show. What's on the page is what you get; say so in the delivery note.",
            "Run while you're away. Collecting happens in your open browser; bulk runs queue several sites but still need the window open. Cloud runs are coming.",
            "Decide what's allowed. Collecting personal data, or data a site's terms forbid, is on you and the client. Check before you accept the order.",
        ],
    },
    guides: ["clean-scraped-data-in-excel", "scrape-data-from-any-website-to-excel", "get-emails-from-a-list-of-websites", "collect-every-page-of-results", "collect-business-listings-from-yellow-pages"],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free to install and use. There's no paid plan, every feature is included, and there's no account to create. There is no per-row price and no credits to count." },
        { q: "Does it work on a site that isn't in your list?", a: "Yes. On any site with a list, the List tab finds it and names the columns from the page's own labels; Choose an item on the page handles the rest. Ready-made sites come with better names." },
        { q: "How do I deliver a web scraping job to a client in Excel?", a: "Collect the list, rename and reorder the columns on the results page to the client's headings, remove the rest, and click Export as → Excel. The file matches what's on screen." },
        { q: "Can I deliver in the client's column names and order?", a: "Yes. Rename, reorder and remove columns on the results page before you save, or tell the chat the columns you want. The file matches what's shown." },
        { q: "How do I avoid duplicates?", a: "Rows that repeat across pages or carousels are kept once on their own. For lists you combine from several runs, use Remove duplicates on the results page or your spreadsheet's remove-duplicates on the website or phone column." },
        { q: "How much data can I collect in a day?", a: "There's no credit or per-row limit. A Google Maps search returns up to 200 businesses per run in chat, a list runs as many pages as you set, and bulk runs cover lists of URLs. Big sites slow down anyone who loads hundreds of pages fast, so split big jobs into runs." },
        { q: "Can I add emails to a client's list of websites?", a: "Yes. Paste the list into Bulk scrape → Collect contacts, or upload the CSV. Each site is read for emails, phones and social links, and View merged table gives you one file." },
        { q: "Can I run the same order again next month?", a: "Yes. Every collection stays in History with its date. Open it, click Collect again on the same site, and the columns you renamed are already in place." },
        { q: "What should the delivery note say?", a: "The source, the date collected, how many rows have each field, and what the site didn't show. Clients trust a list with a 60% email share when the note says so up front." },
        { q: "Is collecting data for a client allowed?", a: "Public business listings are generally fine to collect for research; personal data and sites whose terms forbid collection aren't, whoever asks. Read our plain-words explainer on web scraping and the law, and check before you accept the order." },
    ],
};
