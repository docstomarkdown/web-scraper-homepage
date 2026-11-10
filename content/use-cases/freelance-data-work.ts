import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Rina, freelancer or virtual assistant (docs/personas.md), written so a first-time reader can follow.
// Title targets how a freelancer or client phrases the job ("data entry from a website to Excel", "web research list");
// no direct search-volume data for this page, 2026-10-21.
//
// Facts checked against chrome-extension-source on 2026-11-10 (no real run; sample rows are invented):
// - List tab cards ("List 1", "N items on this page"), hover outline, "Choose an item on the page", "Collect more pages",
//   "Next page" / "Load more" / "Auto scroll", "Stop after" (default 5, or All pages), "Collect from N pages",
//   "Stop and save": components/scraper/ListTab.tsx, lib/tools/helpTopics.json (stop_collection).
// - Ready-made setups for Yellow Pages, Amazon and Zillow: configs-prod/{yellowpages.com,amazon,zillow.com}.json.
// - Settings > All results: "Remove duplicates" (on by default), "Hide mostly empty columns":
//   components/scraper/ResultsSettingsCards.tsx.
// - Results page: rename with the pencil ("Edit column name"), "Delete column", "Columns", "Filter rows", drag to
//   reorder, Export as Google Sheets / Microsoft Excel / CSV / JSON: entrypoints/dataviewer/main.tsx, lib/tools/helpTopics.json.
// - "Add contact details" on a table with a Website column (D-022, D-024): entrypoints/dataviewer/AddWebsiteContactsButton.tsx.
//   Emails only from each business's own website, checked for shape, not for a working mailbox: lib/contactEnrichment/.
// - Bulk scrape menu: "Collect contacts", upload a file or "Paste URLs", "Start collecting", "View merged table",
//   sites one after another: lib/tools/helpTopics.json (many_urls), entrypoints/bulk/main.tsx, lib/bulk/useBulkRunner.ts.
// - Chat Google Maps searches up to 200 businesses in 1.3.0 (D-031); History keeps 500 lists with their saved time:
//   lib/db/historyService.ts, components/scraper/HistoryTab.tsx. Cloud runs coming soon (cloudLaunched false).
export const freelanceDataWork: UseCasePageContent = {
    page: getPage("freelance-data-work", "use-case"),
    meta: {
        title: "How to Deliver a Clean Data List from Any Website",
        description: "Deliver lead lists, product lists and directory exports from the site a client names, with their column names, in Excel or Google Sheets. No code."
    },
    h1: "How to deliver a clean data list from any website for a client",
    intro: "A new order means a new website, a deadline and the client's own format. With Web Scraper Pro, a free Chrome extension, you open the site, collect the list, name the columns the way the client wants, and send an Excel file or a Google Sheet.",
    status: "draft",
    lastUpdated: "2026-11-10",
    job: {
        heading: "More orders a day, fewer hours of copy and paste",
        paragraphs: [
            "Lead lists, product lists, directory exports, web research: the jobs differ, the shape is the same. The client names a site, says which fields they want and how the sheet should look, and wants it soon with no duplicates and no typos.",
            "Web Scraper Pro collects the list from the page inside your Chrome browser. Sites with a ready-made setup come with named columns; on other sites the columns are named from the page. The results page lets you rename, reorder and clean the columns before you save the file.",
            "You don't need to write code. If the site shows a list, the List tab is where you start.",
        ],
    },
    workflow: {
        heading: "From the brief to the delivery file",
        intro: "Five steps, from the page the client named to the file you send.",
        steps: [
            {
                title: "Open the site and find the list",
                body: "Open the page the client named and click the Web Scraper Pro icon; the side panel opens. In the List tab, each list it finds shows as a card with a count, such as List 1 with the number of items on this page. Hover a card to see that list outlined on the page, then click the one you want.",
                points: [
                    "On a site with a ready-made setup, such as Yellow Pages, Amazon or Zillow, the columns come out named.",
                    "On other sites, the columns are named from the page, and you can rename them.",
                    "If the List tab doesn't find the entries as one list, click Choose an item on the page, then click one entry. Similar entries are picked with it.",
                ],
                feature: "list-scraper",
                screenshot: "ext/list-tab-detected",
            },
            {
                title: "Collect every page",
                body: "Choose Collect more pages, then Next page, Load more or Auto scroll, whichever the site uses. Set Stop after (5 pages by default, or All pages) and click Collect from 5 pages. Stop and save keeps what's collected so far.",
                points: [
                    "With Remove duplicates on (the default, in Settings > All results), a row that shows up twice is kept once.",
                    "Collect one page first and check the columns before you collect the rest.",
                ],
                feature: "list-scraper",
                screenshot: "ext/list-tab-more-pages",
            },
            {
                title: "Add the contact details the brief asks for",
                body: "If the rows have a Website column, click Add contact details on the results page. Each website is read for emails, phone numbers and social links, and the new columns fill in. For a list of websites the client sends you, open the Bulk scrape menu and choose Collect contacts.",
                points: [
                    "Many small businesses publish no email, so some rows stay empty. Say so in the delivery note.",
                    "Emails are checked for shape, not for a working mailbox.",
                ],
                feature: "email-extractor",
                screenshot: "ext/results-add-contacts",
            },
            {
                title: "Shape the sheet to the client's format",
                body: "Hover a column's name and click the pencil to rename it, or the trash icon to delete it, and drag columns to reorder. Click Filter rows to drop the rows the client doesn't want.",
                points: [
                    "To export only some columns, type in chat: download only the company, phone, email and city as Excel.",
                    "Mostly empty columns are hidden; click Columns to show one the client wants.",
                ],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-rename-column",
            },
            {
                title: "Send the file, and keep it for the next order",
                body: "Click Export as and choose Microsoft Excel, CSV, or Google Sheets for a sheet you can share. The collection stays in History with the time it was saved, so you can export it again later.",
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    sample: {
        caption: "Sample data: invented businesses, with columns renamed to a client's headings.",
        columns: ["Company", "City", "Phone", "Email"],
        rows: [
            ["Sample Dental Studio", "Austin", "(555) 010-2231", "hello@sampledental.example"],
            ["Sample Plumbing Co.", "Northgate", "(555) 019-8800", "quotes@sampleplumbing.example"],
            ["Sample Bakery", "Riverside", "(555) 017-7431", ""],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Five orders, one set of clicks",
            paragraphs: [
                "Many data orders fall into one of these shapes. The table shows where each starts and what to tell the client about the result.",
            ],
            table: {
                columns: ["Order", "Start from", "What to tell the client"],
                rows: [
                    ["Lead list by trade and city", "Chat: find roofers in Phoenix (a Google Maps search of up to 200 businesses)", "One business per row with phone, website and rating; emails only for businesses whose website publishes one."],
                    ["Directory export", "The directory's category page in the List tab, Collect more pages", "Every listing across the pages; columns from the setup or named from the page, renamed to the brief."],
                    ["Product list from a store", "The category page, or the Shopify store card", "One row per product; for Shopify, every product or variant with price, SKU and images."],
                    ["Emails for a list of websites", "The client's file in Bulk scrape > Collect contacts", "One row per site with any emails, phones and social links it publishes."],
                    ["Web research into a sheet", "Any results page in the List tab", "The list as a table with its links; add the detail pages in a second run if the brief needs them."],
                ],
                caption: "On a site with a ready-made setup the columns come out named; on other sites they're named from the page and you rename them.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "A directory order, step by step",
            paragraphs: [
                "Here is a typical order from brief to delivery: every member of a trade association's online directory, with company, city, phone and email, in the client's column order.",
            ],
            steps: [
                { title: "Open the directory and find the list.", body: "In the List tab, hover each card until the members are outlined on the page, then click it. If no card matches, use Choose an item on the page and click one member." },
                { title: "Collect every page.", body: "Choose Collect more pages, then Next page, set Stop after to All pages, and click Collect. A member that shows up twice is kept once while Remove duplicates is on." },
                { title: "Add the emails.", body: "If the rows have a Website column, click Add contact details on the results page. Each site is read for emails, phones and social links." },
                { title: "Shape it to the brief.", body: "Rename the headers with the pencil to Company, City, Phone, Email; drag them into that order; delete the rest with the trash icon. Use Filter rows if the brief excludes a region." },
                { title: "Deliver.", body: "Export as > Microsoft Excel. Write the delivery note: how many rows, how many with an email, and the date collected. The collection stays in History for the repeat order." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do before you send it",
            paragraphs: [
                "A short check saves a revision round. These four are the ones clients notice.",
            ],
            points: [
                "Duplicates: Remove duplicates keeps one copy of a repeated row in each collection. For a list combined from several runs, use your spreadsheet's remove-duplicates on the website or phone column too.",
                "Column names and order: rename and reorder on the results page before Export as, so the file arrives in the client's format.",
                "Empty columns: mostly empty columns are hidden. Click Columns to show one the client asked for, even if it's thin, and say so in the note.",
                "The note: say what the source was, when it was collected, how many rows have each field, and what the site didn't show.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes to avoid",
            heading: "Six things that cost a revision",
            paragraphs: [
                "Each of these turns a finished order into a revision.",
            ],
            points: [
                "Accepting an order the site can't give. If the site shows nothing until you sign in, such as a members-only directory, check whether you have access and the site allows exporting before you quote.",
                "Collecting every page before checking the first one. Collect This page only first, read the columns, then collect the rest.",
                "Promising emails for every row. Only businesses whose website publishes an email get one. Put that in the quote.",
                "Shaping the file in Excel when the brief changes often. Rename and reorder on the results page, and the collection in History keeps the shape for the next export.",
                "Closing the bulk page during a bulk run. Sites run one after another and the page needs to stay open. A run you stop keeps its rows.",
                "Collecting personal data because the client asked. Personal data and sites whose terms forbid collection are on you and the client; check before you accept the order.",
            ],
        },
    ],
    sites: [{ name: "Yellow Pages", page: "yellow-pages" }, { name: "Amazon", page: "amazon" }, { name: "Zillow", page: "zillow" }, { name: "Google Maps" }, { name: "Any directory, store or job board the client names" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Collect from sites that show nothing until you sign in, unless you have an account and the site allows exporting.",
            "Check that an email still works, or invent a field the site doesn't show. What's on the page is what you get; say so in the delivery note.",
            "Run while you're away. Collecting happens in your open browser; bulk runs go through several sites but still need the window open. Cloud runs are coming soon.",
            "Decide what's allowed. Collecting personal data, or data a site's terms forbid, is on you and the client. Check before you accept the order.",
        ],
    },
    guides: ["clean-scraped-data-in-excel"],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free, with no paid plan, and there's no account to create." },
        { q: "Does it work on a site that isn't in your list?", a: "Often. The List tab looks for the lists on any page and names the columns from the page. If it doesn't find the one you want, Choose an item on the page lets you click one entry and pick similar ones with it. Sites with a ready-made setup come with named columns." },
        { q: "How do I deliver a web scraping job to a client in Excel?", a: "Collect the list, rename and reorder the columns on the results page to the client's headings, delete the rest, and click Export as > Microsoft Excel." },
        { q: "Can I deliver in the client's column names and order?", a: "Yes. Rename, reorder and delete columns on the results page before you export, or ask chat for only the columns you want." },
        { q: "How do I avoid duplicates?", a: "Remove duplicates in Settings > All results is on by default and keeps one copy of a row that shows up twice. For lists you combine from several runs, use your spreadsheet's remove-duplicates on the website or phone column." },
        { q: "How much data can I collect in a day?", a: "A Google Maps search in chat collects up to 200 businesses, a list goes through as many pages as you set, and bulk runs cover lists of URLs. Chat has a daily message limit; the List and Properties tabs don't use it. Sites can slow down anyone who loads many pages fast, so split big jobs into runs." },
        { q: "Can I add emails to a client's list of websites?", a: "Yes. Open the Bulk scrape menu, choose Collect contacts, and upload the file or choose Paste URLs. Each site is read for emails, phones and social links, and View merged table gives you one table." },
        { q: "Can I run the same order again next month?", a: "Yes. Open the same page and collect it again; the earlier collection stays in History with its saved time, so you can compare the two." },
        { q: "What should the delivery note say?", a: "The source, the date collected, how many rows have each field, and what the site didn't show. A client who reads that up front doesn't expect an email on every row." },
        { q: "Is collecting data for a client allowed?", a: "It depends on the site's terms and the law where you work, especially for personal details like names, emails and phone numbers. Read our plain-words explainer on web scraping and the law, and check before you accept the order. This isn't legal advice." },
    ],
};
