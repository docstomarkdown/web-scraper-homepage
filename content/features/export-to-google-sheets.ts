import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Results page: search, sort by header, drag to reorder, rename (pencil), delete column, edit cells, delete rows,
//   Filter rows (keep/hide tags), Columns (show/hide, hide mostly empty), Table/Document layout, Normalize numbers,
//   Load all for 500+ rows, Export as: entrypoints/dataviewer/
// - Chat on the results page: filters ("price < 500", "phone filled"), remove repeats, stats, rename, download
//   what's shown: lib/tools/arrangeResults.ts, DECISIONS.md D-028
// - Exports Google Sheets (Google sign-in, drive.file scope), Excel (.xlsx), CSV, JSON; Word for page text;
//   suggested format first; numbers written as numbers: lib/tools/exportDataset.ts, DECISIONS.md D-033
// - History: search, filter by site, pin, rename, export, delete, clear all; repeats left out by default: D-032

export const exportToGoogleSheets: FeaturePageContent = {
    page: getPage("export-to-google-sheets"),
    meta: {
        title: "Edit and Export: Clean Your Table, Then Excel, CSV, JSON or Sheets",
        description:
            "Rename, reorder and filter the columns and rows you collected, then export to Excel, CSV, JSON or Google Sheets. Every collection stays in History to export again.",
    },
    eyebrow: "Edit and export",
    h1: "Tidy the table, then export it anywhere",
    intro:
        "Every collection opens on a results page where you can rename columns, drop the ones you don't need, filter rows and fix a cell, then export to Excel, CSV, JSON or Google Sheets.",
    lastUpdated: "2026-10-20",
    fields: {
        eyebrow: "What you can do",
        heading: "A spreadsheet's basics, before the spreadsheet",
        items: [
            { name: "Rename, reorder, remove", description: "Hover a column header to rename it or delete it; drag headers to reorder. Hide mostly empty columns with one click." },
            { name: "Sort and search", description: "Click a header to sort, flip the row order, or type in Search in table to find rows." },
            { name: "Filter rows", description: "Keep or hide rows by the words they contain. In chat, ask for \"price under 500\" or \"rows with a phone\"." },
            { name: "Fix cells and rows", description: "Edit a cell in place, delete rows, and remove repeated rows by a column or the whole row." },
            { name: "Numbers as numbers", description: "Prices, ratings and counts are saved as numbers, so your spreadsheet can sort and sum them without clean-up." },
            { name: "Export as", description: "Microsoft Excel (.xlsx), CSV, JSON, or a new Google Sheet that opens in a tab. Page text also exports as a Word document. Download exactly what's shown, with the filters applied." },
            { name: "History", description: "Every collection is kept, searchable by site or name. Pin the ones you reuse, rename them, and export them again any time." },
        ],
    },
    steps: {
        heading: "From rows to a file",
        items: [
            {
                title: "Open the results",
                body: "A collection opens on its results page when it finishes. For an earlier one, open the History tab and click View results.",
            },
            {
                title: "Tidy it",
                body: "Rename or remove columns, sort, filter and fix what needs fixing. Or tell the Chat tab what you want: \"only name and phone, sorted by rating\".",
            },
            {
                title: "Export as",
                body: "Click Export as and choose Excel, CSV, JSON or Google Sheets. The format you used last is offered first.",
            },
        ],
    },
    sections: [
        {
            id: "sheets",
            eyebrow: "Google Sheets",
            heading: "Straight into a new sheet",
            paragraphs: [
                "Choose Google Sheets under Export as, or say \"put this in Google Sheets\" in chat. The first time, Google asks you to sign in and allow Web Scraper Pro to create files in your Drive; it can't see files it didn't create. The new sheet opens in a tab.",
            ],
        },
        {
            id: "ask",
            eyebrow: "Or ask instead",
            heading: "Tidy by typing",
            paragraphs: [
                "On the results page, the Chat tab understands \"remove duplicates by email\", \"rename Rating to Stars\", \"average price\" or \"download only the name and website as CSV\". It changes the view, and the download matches what you see.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Collections stay in your browser's storage until you delete them. Export anything you need to keep for the long term.",
            "Collections over 500 rows show a page at a time; click Load all to see every row before a sort or filter.",
            "Google Sheets export needs a Google sign-in. Excel, CSV and JSON need nothing.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Client-ready sheets", body: "Rename the columns the way the client expects, drop the rest, and send an Excel file." },
            { title: "CRM imports", body: "Keep only the columns the CRM wants and export CSV." },
            { title: "Shared research", body: "A Google Sheet the whole team can open, created straight from the results page." },
            { title: "Repeat exports", body: "The same collection exported again next week, in a different format, from History." },
        ],
    },
    faqs: [
        {
            q: "Which formats can I export to?",
            a: "Microsoft Excel (.xlsx), CSV, JSON and Google Sheets, for any collection. Page text collections also export as a Word document.",
        },
        {
            q: "Does the export include my edits?",
            a: "Yes. Renamed and removed columns, sorting, filters and edited cells are all in the file. The download matches what the results page shows.",
        },
        {
            q: "Where is my data kept?",
            a: "In your browser, in History, until you export or delete it. Nothing you collect is uploaded to our servers. Google Sheets receives a copy only when you export to it.",
        },
        {
            q: "Can I combine two collections?",
            a: "Yes. In chat, ask to combine the searches or lists from the conversation into one table; a bulk run also merges its sites' tables in the Collection overview.",
        },
        {
            q: "Is this included in the plan?",
            a: "Yes. Editing and every export format are part of the one plan, Pro.",
        },
    ],
    related: ["ai-chat", "list-scraper", "maps-leads", "bulk-scraper"],
};
