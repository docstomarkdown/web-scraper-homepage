import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Columns Source URL, Page title, Description, Page text, Word count, Author, Publish date:
//   lib/tools/capabilityTools.ts (collect_page_text: "Get the readable text and details (title, description, author,
//   date) of the open page and save it to History.")
// - Properties tab "Collect page text"; chat "collect the page text": components/scraper/PropertiesTab.tsx
// - Results page Document layout ("Readable document layout" / "Spreadsheet layout") with Copy text; Word (.docx)
//   export for page-text collections, one Heading 1 per page with its details under it, then the text:
//   entrypoints/dataviewer/, lib/utils/docx-export.ts
// - Bulk → Collect page text with "Clean page text" (main readable content with page chrome removed) and/or "Page
//   details" (title, description, author, publish date) per site: lib/bulk/executors/textBulkExecutor.ts,
//   entrypoints/bulk/ConfigureStage.tsx
//
// Title and headings target what people type into Google ("how to scrape text from a website", "how to scrape a
// website for text"): youtube-research/AUTOSUGGEST.md in the strategy repo. The Word guide owns "save a web page as a
// Word document" and the news guide owns "news headlines and articles"; this page owns "scrape text from a website
// into a document". Deepened 2026-10-21 from the sources above; nothing added that isn't in them.

export const pageText: FeaturePageContent = {
    page: getPage("page-text"),
    meta: {
        title: "How to Scrape Text from a Website into a Document, Free",
        description:
            "Open an article, click once, and get its readable text with the title, author, date and word count. Save it as a Word document or copy it for an AI tool. Free Chrome extension, no code.",
    },
    eyebrow: "Page text",
    h1: "How to scrape the text from a web page into a document",
    intro:
        "Open an article, a help page or a documentation page. Click once. You get the readable text with its title, author, date and word count, without menus, ads or comments. Save it as a Word document, or collect a whole reading list in one run.",
    lastUpdated: "2026-10-20",
    sample: {
        caption: "Two pages after a bulk run. The articles are made up.",
        columns: ["Page title", "Author", "Word count", "Page text"],
        rows: [
            ["How to size a rain jacket", "J. Rivera", "1,140", "A rain jacket should sit loosely over a mid layer…"],
            ["Trail shoes vs hiking boots", "M. Chen", "1,820", "The choice comes down to the ground you walk on…"],
            ["Packing for a three-day hike", "A. Okafor", "960", "Start with the weight you can carry on the last day…"],
        ],
    },
    steps: {
        heading: "How to scrape a page's text in three steps",
        intro: "Everything runs in your own Chrome window. The text stays in your browser until you export it.",
        items: [
            {
                title: "Open the page",
                body: "Go to the article, guide or documentation page in Chrome. Click the Web Scraper Pro icon and open the Properties tab.",
                points: ["Articles, help pages, documentation, news stories and reports all work.", "If the page loads more text as you scroll, scroll to the end first."],
            },
            {
                title: "Click Collect page text",
                body: "The results page opens in Readable document layout, with the text in reading order and the page's details above it. Read it there, or click Copy text to put it on your clipboard.",
                points: [
                    "Or type in the Chat tab: Collect the page text.",
                    "Columns: Source URL, Page title, Description, Page text, Word count, Author, Publish date.",
                    "Switch to Spreadsheet layout to see the same page as one row.",
                ],
            },
            {
                title: "Export",
                body: "Click Export as and choose Microsoft Word for a document, or CSV, JSON, Excel or Google Sheets for a table. The collection stays in History.",
                points: ["Copy text is the quickest way to paste it into an AI tool or a note."],
            },
        ],
    },
    fields: {
        heading: "What you get for every page",
        intro: "Menus, ads, cookie banners and comments are left out; what's kept is what a reader would read.",
        items: [
            { name: "Page text", description: "The main readable text, in reading order." },
            { name: "Word count", description: "The length of the text, as a number." },
            { name: "Page title", description: "The page's title, as the site set it." },
            { name: "Description", description: "The page's summary line, where the site has one." },
            { name: "Author", description: "Who wrote it, where the page states it." },
            { name: "Publish date", description: "When it was published, where the page states it." },
            { name: "Source URL", description: "The page address, so every row traces back to its page." },
        ],
    },
    sections: [
        {
            id: "kept",
            eyebrow: "What's kept",
            heading: "What's kept and what's left out",
            paragraphs: ["The main text of the page is kept in reading order. Everything around it is left out."],
            points: [
                "Left out: navigation menus, ads, cookie banners, sidebars, comments and footers.",
                "Kept: headings, paragraphs, lists and the text of tables, in order.",
                "Author and date are filled when the page states them in a form the extension recognises. Some pages leave them blank.",
            ],
        },
        {
            id: "many-pages",
            eyebrow: "A reading list",
            heading: "How to scrape the text of many pages at once",
            paragraphs: [
                "Click the Bulk scrape icon at the top of the side panel and choose Collect page text. Paste the addresses or upload a CSV or TXT file, choose Clean page text, Page details or both for each site, and click Start collecting.",
                "Each page becomes a row. View merged table puts them in one table, and Export as → Microsoft Word saves the lot as one document, with a heading per page.",
            ],
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Twelve help articles into one Word document for a product review",
            paragraphs: ["You're reviewing a rival product and its help centre has twelve articles that explain how it works. Here is the job from the first page to the document."],
            steps: [
                { title: "Collect the article list first.", body: "Open the help centre's index page and the side panel's List tab, pick the list of articles, and collect it. The table has a title and a link per article." },
                { title: "Open Bulk scrape → Collect page text.", body: "On the Upload step, click Use saved data and pick the link column of the table you just made. The chip reads 12 valid URLs detected." },
                { title: "Choose both text and details.", body: "On the Configure step, keep Clean page text and Page details on. Each row then gets its title, author and date as well as the text. Click Start collecting." },
                { title: "Wait a minute or two.", body: "Each article takes a few seconds. Twelve pages of about 800 words each finish in well under five minutes." },
                { title: "Read the merged table in Readable document layout.", body: "Twelve rows, each with Page title, Author, Publish date, Word count and Page text. Sort by Word count to see which articles carry the detail." },
                { title: "Export as Microsoft Word.", body: "One document, one heading per article with its details under it, then the text. Hand it to a colleague or paste a section into an AI tool with a question." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "What you can do with the text",
            heading: "Four things to do with collected text",
            paragraphs: ["The results page keeps the text with its details, so each of these is a click or a short line in chat."],
            points: [
                "Paste it into an AI tool with a question: click Copy text in Readable document layout and paste. Then ask for a summary, a comparison or the facts it contains.",
                "Build a content audit: a bulk run over a site's pages with Page details on gives the title, description, author, date and word count per page. Export as Excel and sort by Word count or date.",
                "Keep a dated archive: the collection in History holds the text as it was on the day. Rename it with the date and pin it.",
                "Quote with the source: every row carries Source URL, so a line pasted into a report can cite the page it came from.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "What you choose, and what's fixed",
            paragraphs: ["Page text has few settings. The choices sit on the bulk Configure step and on the results page."],
            table: {
                columns: ["Choice", "Where", "Default", "Change it when"],
                rows: [
                    ["Clean page text", "Bulk → Configure", "On", "You only need the details, not the text, for an audit of titles and dates"],
                    ["Page details", "Bulk → Configure", "On", "You only need the text; the row then holds Page text, Word count and Source URL"],
                    ["Readable document layout", "Results page", "On for page text", "You want each page as one row, with the text as a cell, to sort and filter"],
                    ["Hide mostly empty columns", "Settings → Results", "On", "Author or Publish date is empty on most pages but you want the column kept in the file"],
                ],
                caption: "Nothing on the page decides what counts as the main text; the extension reads it the way a reader view would.",
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with select-all, a reader view, or a script",
            paragraphs: ["For one article, selecting the text by hand is fine. The extension earns its place when you want the details with the text, or more than a handful of pages."],
            table: {
                columns: ["Route", "Setup", "Where it breaks", "Pick it when"],
                rows: [
                    ["Collect page text", "None", "Author and date are blank when the page doesn't state them in a form the extension recognises", "You want title, author, date and text together, or a whole reading list"],
                    ["Select all and copy", "None", "Menus, cookie banners and comments come along; no title or date", "One short page, once"],
                    ["The browser's reader view", "None", "One page at a time; no file, no details, nothing saved", "Reading, not keeping"],
                    ["A script", "Hours, plus a fix each time the site changes", "Sign-ins, paywalls and pages that load as you scroll each need their own code", "Thousands of pages on a schedule"],
                ],
            },
        },
        {
            id: "doesnt",
            eyebrow: "What it doesn't do",
            heading: "What page text doesn't do",
            paragraphs: ["Five limits, so you know before you start."],
            points: [
                "It doesn't read PDFs, images or text inside video players. It reads the readable text of a web page.",
                "It doesn't get past a paywall or a sign-in. It reads what the page shows you; sign in first and it reads the article.",
                "It doesn't keep the page's layout, images or links. The text comes out as paragraphs, headings and lists.",
                "It doesn't invent an author or a date. When the page doesn't state them in a form the extension recognises, the cells stay empty.",
                "It doesn't crawl a site for pages. Give a bulk run the addresses, or collect the list of articles first and reuse its link column.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When a page pushes back",
            heading: "Paywalls, sign-ins and pages that load as you scroll",
            paragraphs: ["The extension collects the text the page shows you. It doesn't sign in or get past a paywall for you."],
            points: [
                "Text behind a paywall or a sign-in is read once you can see it in your browser.",
                "A page that loads more text as you scroll is read as far as it has loaded. Scroll to the end first.",
                "A page that shows a verification instead of its content gives nothing. Complete the check and collect again.",
            ],
        },
        {
            id: "goes-wrong",
            eyebrow: "When it goes wrong",
            heading: "The five things that go wrong, and the fix for each",
            paragraphs: ["Each shows up in the text or in a detail cell, and each has a one-line fix."],
            points: [
                "The text is cut off. The page loads more as you scroll. Scroll to the end, wait, and collect again.",
                "Author or date is empty. The page doesn't state them in a form the extension recognises. Click the cell on the results page and type them in.",
                "The text includes a cookie banner or a menu line. Rare, but a site can mark its chrome as content. Delete the line in Word, or edit the cell.",
                "A bulk row is blank. That page showed a sign-in or a verification. Open it in your browser, complete the check, and run that address again.",
                "The Word export is one long file. That's by design: one document, a heading per page. Export as Excel instead for one row per page.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It collects the text the page shows you. Content behind a paywall or a sign-in is read only if you can see it.",
            "Author and date are filled when the page states them in a form the extension recognises. Some pages leave them blank.",
            "The text belongs to its publisher. Keep it for your own reading, notes and analysis, and check the site's terms before republishing any of it.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Research notes", body: "A dozen articles on a topic as clean text with titles and dates, in one document." },
            { title: "Context for an AI tool", body: "Documentation pages collected as text to paste into an AI tool, without menus and footers in the way." },
            { title: "Content audits", body: "Every page of a site with its title, description, author and word count in a sheet." },
            { title: "Reading offline", body: "Long reads saved as Word documents, without the ads." },
        ],
    },
    faqs: [
        {
            q: "How do I scrape text from a website without code?",
            a: "Open the page, open the side panel's Properties tab, and click Collect page text. The readable text opens with its title, author, date and word count, ready to export or copy.",
        },
        {
            q: "What's left out of the text?",
            a: "Navigation menus, ads, cookie banners, sidebars, comments and footers. The main article or body text is kept in reading order.",
        },
        {
            q: "Can I save a web page as a Word document?",
            a: "Yes. On the results page, Export as offers Microsoft Word for page-text collections, next to CSV, JSON, Excel and Google Sheets. Copy text puts the plain text on your clipboard.",
        },
        {
            q: "Can I scrape the text of a whole website?",
            a: "Give Bulk scrape → Collect page text a list of the site's page addresses. Or collect the site's article list first and reuse its link column. Each page's text is collected in turn into one table you can export as one document.",
        },
        {
            q: "How do I copy an article into ChatGPT without the ads and menus?",
            a: "Collect the page text, click Copy text in Readable document layout, and paste. You get the article's text and nothing else, with its title and date above it.",
        },
        {
            q: "Can I collect a page I'm reading behind a sign-in?",
            a: "Yes, once you're signed in and can see it. The extension reads the page in your browser; it doesn't sign in for you.",
        },
        {
            q: "Does it get the author and the publish date?",
            a: "When the page states them in a form the extension recognises, yes, in their own columns. Some pages leave them blank, and you can type them in on the results page.",
        },
        {
            q: "Is this free?",
            a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create.",
        },
        {
            q: "Is it allowed to copy text from a website?",
            a: "The text belongs to its publisher. Collecting it for your own reading, notes and analysis is the normal use; republishing it is a different matter, so check the site's terms first. This isn't legal advice.",
        },
    ],
    related: ["bulk-scraper", "list-scraper", "export-to-google-sheets", "ai-chat"],
};
