import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Columns Source URL, Page title, Description, Page text, Word count, Author, Publish date:
//   lib/tools/capabilityTools.ts (collect_page_text)
// - Properties tab "Collect page text"; chat "collect the page text": components/scraper/PropertiesTab.tsx
// - Results page Document layout with Copy text; Word (.docx) export for page-text collections: entrypoints/dataviewer/
// - Bulk → Collect page text with clean text and/or page details per site: lib/bulk/executors/textBulkExecutor.ts
//
// Title and headings target what people type into Google ("how to scrape text from a website", "how to scrape a
// website for text"): youtube-research/AUTOSUGGEST.md in the strategy repo. Owner instruction 2026-10-21: titles
// start with "How to" and say what a user would search. Copy rules: docs/writing-style.md §11.

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
                points: ["Articles, help pages, documentation, news stories and reports all work."],
            },
            {
                title: "Click Collect page text",
                body: "The results page opens in Document layout, with the text in reading order and the page's details above it. Read it there, or click Copy text to put it on your clipboard.",
                points: [
                    "Or type in the Chat tab: Collect the page text.",
                    "Columns: Source URL, Page title, Description, Page text, Word count, Author, Publish date.",
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
                "Click the Bulk scrape icon at the top of the side panel and choose Collect page text. Paste the addresses or upload a CSV or TXT file, choose clean text, page details or both for each site, and click Start collecting.",
                "Each page becomes a row. View merged table puts them in one table, and Export as → Microsoft Word saves the lot as one document.",
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
            a: "Give Bulk scrape → Collect page text a list of the site's page addresses. Each page's text is collected in turn into one table you can export as one document.",
        },
        {
            q: "Can I collect a page I'm reading behind a sign-in?",
            a: "Yes, once you're signed in and can see it. The extension reads the page in your browser; it doesn't sign in for you.",
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
