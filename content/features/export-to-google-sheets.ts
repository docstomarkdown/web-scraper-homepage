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
// Title and headings target what people type into Google ("get data from website to google sheets",
// "extract data from website to excel", "can google sheets pull data from a website"): youtube-research/
// AUTOSUGGEST.md and SEARCH_QUERIES.md in the strategy repo. Owner instruction 2026-10-21: titles start with "How to".

export const exportToGoogleSheets: FeaturePageContent = {
    page: getPage("export-to-google-sheets"),
    meta: {
        title: "How to Get Data from a Website into Google Sheets or Excel",
        description:
            "Collect any list or page in your browser, tidy the columns and rows, then export to Google Sheets, Excel, CSV or JSON. Every collection stays in History to export again. Free Chrome extension, no code.",
    },
    eyebrow: "Export to Google Sheets and Excel",
    h1: "How to get data from a website into Google Sheets or Excel",
    intro:
        "Collect the page in your browser, tidy the table, and click Export as. A new Google Sheet opens in a tab, or you get an Excel, CSV or JSON file. Every collection stays in History to export again.",
    lastUpdated: "2026-10-20",
    hero: "ext/results-export-menu",
    steps: {
        heading: "How to send website data to Google Sheets in three steps",
        intro: "Any collection works the same way: a list, a Google Maps search, contact details or page text.",
        items: [
            {
                title: "Open the results",
                body: "A collection opens on its results page when it finishes. For an earlier one, open the History tab and click View results.",
                points: ["History keeps every collection with its date and type. Pin the ones you reuse."],
            },
            {
                title: "Tidy the table",
                body: "Rename or remove columns, sort, filter rows and fix any cell. Or tell the Chat tab what you want.",
                points: [
                    "Hover a column header: the pencil renames it, the trash icon deletes it. Drag headers to reorder.",
                    "Example to type in chat: Only name and phone, sorted by rating.",
                ],
                screenshot: "ext/results-rename-column",
            },
            {
                title: "Click Export as",
                body: "Choose Google Sheets, Microsoft Excel, CSV or JSON. The format you used last is offered first. The file holds exactly the rows and columns shown, with your edits.",
                points: [
                    "Google Sheets opens a new sheet in a tab. Excel, CSV and JSON download a file.",
                    "Page text collections also export as a Word document.",
                ],
            },
        ],
    },
    fields: {
        eyebrow: "What you can do",
        heading: "What the results page lets you do before you export",
        intro: "A spreadsheet's basics, before the spreadsheet.",
        items: [
            { name: "Rename, reorder, remove", description: "Hover a column header to rename or delete it. Drag headers to reorder." },
            { name: "Sort and search", description: "Click a header to sort, or type in Search in table to find rows." },
            { name: "Filter rows", description: "Keep or hide rows by the words they contain. In chat, ask for \"price under 500\" or \"rows with a phone\"." },
            { name: "Fix cells and rows", description: "Edit a cell in place, delete rows, and remove repeated rows." },
            { name: "Numbers as numbers", description: "Prices, ratings and counts are saved as numbers, so the sheet can sort and sum them." },
            { name: "Export as", description: "Google Sheets, Excel, CSV or JSON, with the filters applied. Word for page text." },
            { name: "History", description: "Every collection is kept, searchable by site or name. Pin, rename and export again any time." },
        ],
    },
    sections: [
        {
            id: "sheets",
            eyebrow: "Google Sheets",
            heading: "How the Google Sheets export works",
            paragraphs: [
                "Choose Google Sheets under Export as, or say \"put this in Google Sheets\" in chat. The first time, Google asks you to sign in and allow Web Scraper Pro to create files in your Drive. It can't see files it didn't create.",
                "The new sheet opens in a tab. Each export creates a new sheet, and the collection stays in History to export again.",
            ],
        },
        {
            id: "ask",
            screenshot: "ext/results-arranged",
            eyebrow: "Or ask instead",
            heading: "Tidy the table by typing",
            paragraphs: [
                "On the results page, the Chat tab understands \"remove duplicates by email\", \"rename Rating to Stars\", \"average price\" or \"download only the name and website as CSV\". It changes the view, and the download matches what you see.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Four settings that shape every table and file",
            paragraphs: ["They sit under Settings → Results in the side panel."],
            points: [
                "Suggested format: the export format shown first. The last one used, by default.",
                "Save prices, ratings and counts as numbers: on. $19.99 becomes 19.99 and 1,234 becomes 1234. Phone numbers stay as written.",
                "Hide mostly empty columns: on. Columns filled in for fewer than a third of the rows are hidden, never deleted.",
                "Remove duplicates: on. The same result that appears twice is kept once.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "Big tables and sign-ins",
            heading: "What to know about large collections and Google Sheets",
            paragraphs: ["Two practical limits, neither a surprise once you know them."],
            points: [
                "Collections over 500 rows show a page at a time. Click Load all before a sort or a filter so it covers every row.",
                "Google Sheets export signs in with your Google account once. Excel, CSV and JSON need no sign-in.",
                "Text that looks like a spreadsheet formula is written as text, never run, so a collected cell can't execute anything in your sheet.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "Collections stay in your browser's storage until you delete them. Export anything you need to keep for the long term.",
            "Collections over 500 rows show a page at a time. Click Load all to see every row before a sort or filter.",
            "Google Sheets export needs a Google sign-in. Excel, CSV and JSON need nothing.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Client-ready sheets", body: "Rename the columns the way the client expects, drop the rest, and send an Excel file." },
            { title: "Imports into a sales tool", body: "Keep only the columns your sales or email tool wants and export CSV." },
            { title: "Shared research", body: "A Google Sheet the whole team can open, created straight from the results page." },
            { title: "Repeat exports", body: "The same collection exported again next week, in a different format, from History." },
        ],
    },
    faqs: [
        {
            q: "How do I get a table from a website into Google Sheets?",
            a: "Open the page, click Collect in the side panel, then Export as → Google Sheets on the results page. Or type \"put this in Google Sheets\" in the Chat tab. A new sheet opens in a tab.",
        },
        {
            q: "Can Google Sheets pull data from a website on its own?",
            a: "For a plain HTML table on one page, Sheets' own import functions can. For a list that spans pages, a page that loads as you scroll, or a page you're signed in to, collect it with the extension and export to Google Sheets.",
        },
        {
            q: "Which formats can I export to?",
            a: "Google Sheets, Microsoft Excel, CSV and JSON, for any collection. Page text collections also export as a Word document.",
        },
        {
            q: "Does the export include my edits?",
            a: "Yes. Renamed and removed columns, sorting, filters and edited cells are all in the file. The download matches what the results page shows.",
        },
        {
            q: "Can it update the sheet automatically?",
            a: "Not yet. Each run creates a new sheet, and every collection stays in History to export again. Scheduled runs are coming with the cloud.",
        },
        {
            q: "Where is my data kept?",
            a: "In your browser, in History, until you export or delete it. Nothing you collect is uploaded to our servers. Google Sheets receives a copy only when you export to it.",
        },
        {
            q: "Is this free?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create. Editing and every export format are included.",
        },
        {
            q: "Can I combine two collections?",
            a: "Yes. In chat, ask to combine the searches or lists from the conversation into one table. A bulk run also merges its sites' tables on the Collection results page.",
        },
        {
            q: "Can I fix a wrong cell?",
            a: "Yes. Click a cell on the results page to edit it. The change is saved to the collection and included in the export.",
        },
    ],
    related: ["ai-chat", "list-scraper", "maps-leads", "bulk-scraper"],
};
