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
// - Results page labels (entrypoints/dataviewer, 2026-10-21): "Search in table…", "Row filters" with "Keep tags" and
//   "Hide tags", "Hide unrelated rows", "Columns" / "Mostly empty columns", "Show repeated rows", "Show the site's
//   order", "Spreadsheet layout" / "Readable document layout", "Copy text", "Records per page", "Add contact
//   details", "Delete collection". Over 500 rows the page shows a saved page at a time (SavedResultsNote.tsx).
// - Settings → Results labels (components/scraper/ResultsSettingsCards.tsx): "Suggested format", "Save prices, ratings
//   and counts as numbers", "Hide mostly empty columns", "Remove duplicates", "Skip sponsored products", "Sort products".
// Title and headings target what people type into Google ("get data from website to google sheets",
// "extract data from website to excel", "can google sheets pull data from a website"): youtube-research/
// AUTOSUGGEST.md and SEARCH_QUERIES.md in the strategy repo. The table guide owns "copy a table from a website into
// Excel or Google Sheets"; this page owns "get data from a website into Google Sheets or Excel". Deepened 2026-10-21.
// Google Sheets is named here as on every other page; docs/personas.md asks the owner to confirm the OAuth consent
// screen before launch.

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
                "It works from the site's tab too, right after a collection, on the last collection you made. Filters change the view you're looking at, not the saved rows, so nothing is lost.",
            ],
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "A Google Maps list to a client-ready Excel file in five minutes",
            paragraphs: ["A list of 50 dentists with their emails is on the results page. The client wants name, phone, website and email, sorted by rating, and nothing else."],
            steps: [
                { title: "Hide what the client doesn't need.", body: "Click Columns and untick Address, Operating Hours, Map URL and the social network columns. Hidden columns stay out of the file." },
                { title: "Keep only rows with an email.", body: "Click Row filters and add a keep tag on the Emails column, or type \"only rows with an email\" in chat. Thirty-one of the fifty rows stay." },
                { title: "Sort by rating.", body: "Click the Rating header. Ratings are numbers, so 4.9 sorts above 4.85 and 4.8." },
                { title: "Rename for the client.", body: "Hover Business Name and click the pencil: Practice. Hover Emails: Email." },
                { title: "Export as Microsoft Excel.", body: "The file holds the 31 rows and four columns as shown. Next week, open the collection from History and export it again with a different filter." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "What you can do with the table",
            heading: "Four exports people make most",
            paragraphs: ["Each one is a view on the results page followed by Export as. The view is kept with the collection."],
            points: [
                "A CSV for a sales or email tool: keep only the columns the tool imports, in its order, and export CSV. Phone numbers stay as written, so leading zeros survive.",
                "A shared Google Sheet for a team: export to Google Sheets once, then share the sheet from Drive. The next run is a new sheet, so name them by date.",
                "A JSON file for a developer: every column becomes a field name, numbers stay numbers, and the file is one array of rows.",
                "A Word document of a reading list: a page-text collection exports as one document. Each page gets a heading, its author and date under it, and the text.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Settings that shape every table and file",
            paragraphs: ["They sit under Settings → Results in the side panel and apply to every collection, including bulk runs."],
            table: {
                columns: ["Setting", "Default", "Change it when"],
                rows: [
                    ["Suggested format", "The last one used", "You always want Excel first, whatever you exported last"],
                    ["Save prices, ratings and counts as numbers", "On", "You need $19.99 kept as text, with its currency sign"],
                    ["Hide mostly empty columns", "On", "A column filled in for a third of the rows or fewer matters to you; it's hidden, never deleted"],
                    ["Remove duplicates", "On", "A list repeats an item on purpose and you want both rows; Show repeated rows brings them back on the page"],
                    ["Skip sponsored products", "Off", "You're comparing a store's own ranking and ads get in the way"],
                ],
                caption: "Phone numbers are never turned into numbers, so 020 and +44 stay as written.",
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with copy and paste, a script, or a spreadsheet formula",
            paragraphs: ["For a page you can open, collecting and exporting from the extension gives a clean table with named columns and numbers that add up. The others still have a place."],
            table: {
                columns: ["Route", "Setup", "Where it breaks", "Pick it when"],
                rows: [
                    ["Collect, then Export as", "None", "Each export is a snapshot; it doesn't refresh on its own", "The table should look right the first time, and you'll want it again"],
                    ["Copy and paste", "None", "Merged cells shift columns, prices paste as text, lists that load as you scroll come half empty", "A few rows from one screen"],
                    ["A spreadsheet import formula", "One formula", "Pages built by scripts, lists over several pages, and pages you're signed in to all come back empty", "A single plain table that changes and must refresh"],
                    ["A script", "Hours, plus upkeep when the site changes", "The same sign-in and scrolling problems, now in code", "The job must run unattended every day"],
                ],
            },
        },
        {
            id: "doesnt",
            eyebrow: "What it doesn't do",
            heading: "What the export doesn't do",
            paragraphs: ["Five limits, none of them a surprise once you know them."],
            points: [
                "It doesn't update an existing sheet. Every Google Sheets export creates a new sheet; the collection stays in History to export again.",
                "It doesn't run on a schedule. Scheduled runs are coming with the cloud.",
                "It doesn't upload your data to our servers. Collections stay in your browser until you export; Google Sheets gets a copy only when you choose it.",
                "It doesn't run formulas. Text that looks like a formula is written as text, so a collected cell can't execute anything in your sheet.",
                "It doesn't merge two collections on its own. Ask chat to combine the lists from the conversation, or use a bulk run, which merges its sites.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "Big tables and sign-ins",
            heading: "What to know about large collections and Google Sheets",
            paragraphs: ["Two practical limits, neither a surprise once you know them."],
            points: [
                "Collections over 500 rows show a page at a time, in the order they were saved. Files keep that order; use Records per page or Load all before a sort or a filter so it covers every row.",
                "Google Sheets export signs in with your Google account once. Excel, CSV and JSON need no sign-in.",
            ],
        },
        {
            id: "goes-wrong",
            eyebrow: "When it goes wrong",
            heading: "The five things that go wrong, and the fix for each",
            paragraphs: ["Each one shows up on the results page or in the file, and each has a one-line fix."],
            points: [
                "A column is missing from the file. It was hidden on the results page, or it's mostly empty and the setting hid it. Click Columns and tick it.",
                "Prices sort as text in the sheet. The collection was saved with Save prices as numbers off. Turn it on and collect again, or convert the column in the sheet.",
                "The sort covered only the first page. The collection has over 500 rows and the page showed one saved page. Click Load all, then sort.",
                "Google Sheets export asked me to sign in. That's the one-time permission to create files in your Drive. Choose Excel or CSV if you'd rather not.",
                "The file has rows I filtered out. Filters from chat change the view, and the download matches what you see; check the view before exporting from History.",
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
            a: "For a plain HTML table on one page, Sheets' own import functions can. A list that spans pages, a page that loads as you scroll, or a page you're signed in to is different. Collect it with the extension and export to Google Sheets.",
        },
        {
            q: "How do I extract data from a website to Excel?",
            a: "Collect the page, tidy the table, and choose Microsoft Excel under Export as. The .xlsx file holds the rows and columns shown, with prices, ratings and counts as numbers.",
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
