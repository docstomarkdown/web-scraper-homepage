import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - Columns Source URL, Page title, Description, Page text, Word count, Author, Publish date:
//   lib/tools/capabilityTools.ts (collect_page_text)
// - Properties tab "Collect page text"; chat "collect the page text": components/scraper/PropertiesTab.tsx
// - Results page Document layout with Copy text; Word (.docx) export for page-text collections: entrypoints/dataviewer/
// - Bulk → Collect page text with clean text and/or page details per site: lib/bulk/executors/textBulkExecutor.ts

export const pageText: FeaturePageContent = {
    page: getPage("page-text"),
    meta: {
        title: "Page Text Extractor: Clean Article Text for Documents and AI",
        description:
            "Collect a page's readable text with its title, description, author and date, without menus and ads, as a Word document, CSV or JSON, one page or hundreds.",
    },
    eyebrow: "Page text for AI",
    h1: "Get the readable text of a page, without the clutter",
    intro:
        "One click turns an article or documentation page into clean text with its title, author and date. Export it as a Word document, or collect hundreds of pages into one file for a report or an AI tool.",
    lastUpdated: "2026-10-20",
    sample: {
        caption: "Two pages after a bulk run. The articles are made up.",
        columns: ["Page title", "Author", "Publish date", "Word count", "Page text"],
        rows: [
            ["How to size a rain jacket", "J. Rivera", "2026-03-12", "1,140", "A rain jacket should sit loosely over a mid layer…"],
            ["Trail shoes vs hiking boots", "M. Chen", "2026-05-02", "1,820", "The choice comes down to the ground you walk on…"],
        ],
    },
    fields: {
        heading: "The text and its details",
        intro: "Menus, ads, cookie banners and comments are left out. What's kept is what a reader would read.",
        items: [
            { name: "Page text", description: "The main readable text of the page, in reading order, with the word count in its own column." },
            { name: "Page title and description", description: "The page's title and its summary line, as the site set them." },
            { name: "Author and publish date", description: "Who wrote it and when it was published, where the page states them." },
            { name: "Source URL", description: "The page address, so every row traces back to its page." },
        ],
    },
    steps: {
        heading: "One page, one click",
        items: [
            {
                title: "Open the page",
                points: ["Articles, help pages, documentation, news stories and reports all work."],
                body: "Go to the article, guide or documentation page in Chrome and open the side panel's Properties tab.",
            },
            {
                title: "Click Collect page text",
                points: ["Or type in the Chat tab: Collect the page text.", "Columns: Source URL, Page title, Description, Page text, Word count, Author, Publish date."],
                body: "Or type \"collect the page text\" in the Chat tab. The results page opens in Document layout, where you can read it or click Copy text.",
            },
            {
                title: "Export",
                points: ["Microsoft Word for a document. Copy text for the clipboard. CSV or JSON for a pipeline."],
                body: "Save it as a Word document, or as CSV or JSON for a tool. The collection stays in History.",
            },
        ],
    },
    sections: [
        {
            id: "kept",
            eyebrow: "What's kept and what's left out",
            heading: "The text a reader would read, nothing else",
            paragraphs: ["The main text of the page is kept in reading order. Everything around it is left out."],
            points: ["Left out: navigation menus, ads, cookie banners, sidebars, comments, footers.", "Kept: headings, paragraphs, lists and the text of tables, in order.", "Author and date are filled when the page states them in a form the extension recognises; some pages leave them blank."],
        },
        {
            id: "pushback",
            eyebrow: "When a page pushes back",
            heading: "Paywalls, sign-ins and pages that load as you scroll",
            paragraphs: ["The extension collects the text the page shows you."],
            points: ["Text behind a paywall or a sign-in is read only once you can see it.", "A page that loads more text as you scroll is read as far as it has loaded; scroll to the end first.", "A page that shows a verification instead of its content gives nothing; complete the check and collect again."],
        },
        {
            id: "many-pages",
            eyebrow: "A reading list",
            heading: "Hundreds of pages into one file",
            paragraphs: [
                "Click the Bulk scrape icon at the top of the side panel and choose Collect page text. Paste the addresses or upload a file, choose clean text, page details or both for each site, and click Start collecting. Each page becomes a row, and View merged table puts them in one table to export together.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It collects the text the page shows you. Content behind a paywall or a sign-in is read only if you can see it.",
            "Author and date are filled when the page states them in a form it recognises; some pages leave them blank.",
            "The text belongs to its publisher. Keep collected text for your own reading, notes and analysis, and check the site's terms before republishing any of it.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Research notes", body: "A dozen articles on a topic as clean text with titles and dates, in one document." },
            { title: "AI context", body: "Documentation pages collected as text to give an AI tool, without menus and footers in the way." },
            { title: "Content audits", body: "Every page of a site with its title, description, author and word count in a sheet." },
            { title: "Reading offline", body: "Long reads saved as Word documents, without the ads." },
        ],
    },
    faqs: [
        {
            q: "What's left out of the text?",
            a: "Navigation menus, ads, cookie banners, sidebars, comments and footers. The main article or body text is kept in reading order.",
        },
        {
            q: "Which formats can I save it in?",
            a: "Word (.docx) for one page or a collection, plus CSV, JSON, Excel and Google Sheets like every other collection. Copy text puts the plain text on your clipboard.",
        },
        {
            q: "Can I collect a whole site?",
            a: "Give the bulk run a list of the site's page addresses and it collects each one's text in turn into one table.",
        },
        {
            q: "Is this included in the plan?",
            a: "Yes. Page text is part of the one plan, Pro.",
        },
        {
            q: "Can I collect a page I'm reading behind a sign-in?",
            a: "Yes, once you're signed in and can see it. The extension reads the page in your browser; it doesn't sign in for you.",
        },
        {
            q: "Can I collect the text of a whole website?",
            a: "Give Bulk scrape → Collect page text a list of the site's page addresses and each one's text is collected in turn into one table.",
        },
    ],
    related: ["bulk-scraper", "list-scraper", "export-to-google-sheets", "ai-chat"],
};
