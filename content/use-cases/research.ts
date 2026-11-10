import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Wei, analyst or researcher (docs/personas.md), written so a first-time reader can follow.
// Never claim anything about what an AI tool does with the text.
// Title targets what a reader would type into Google; "Google Scholar" is the site's name on this site (2026-10-21).
//
// Facts checked against chrome-extension-source on 2026-11-10 (no real run; sample rows are invented):
// - Google Scholar setup: 19 columns (Rank, Title, Result Type, Result URL, Authors, Author Profile URLs, Publication, Year,
//   Publisher / Source, Cited By, Cited By URL, Versions, Versions URL, Related Articles URL, Document URL, Document Type,
//   Document Host Name, Year From, Year To), maxPages 10, allowUntilEnd: configs-prod/scholar/google-scholar.json.
// - Scholar page choices 1, 3, 5, 10, "Until the end", "Custom"; default 5 pages; "Scholar verification required" and
//   "Complete the verification directly in Google Scholar, then refresh detection. The extension will not bypass it.";
//   "Continues until the last available page, you stop it, or Scholar requests verification.": components/scraper/ListTab.tsx.
// - Bulk runs wait at a Scholar verification and resume: lib/bulk/useBulkRunner.ts, entrypoints/bulk/main.tsx.
// - Page text columns Source URL, Page title, Description, Page text, Word count, Author, Publish date:
//   lib/content/pageTextExtraction.ts. Properties tab "Collect page text": components/scraper/usePropertiesQuickActions.ts.
//   Word export for page-text collections, "Copy text": entrypoints/dataviewer/main.tsx, lib/utils/docx-export.ts.
// - Bulk scrape > Collect page text, "Clean page text", "Page details", "Paste URLs", "Continue", "Start collecting",
//   "View merged table", sites one after another: entrypoints/bulk/main.tsx, lib/bulk/executors/textBulkExecutor.ts.
// - YouTube setup columns (Title, Channel, Views, Published, Duration, Type) and autoScroll pagination:
//   configs-prod/youtube.com.json, site-column-mappings/youtube.com.json. Capterra, Product Hunt and G2 setups:
//   configs-prod/{capterra,producthunt.com,g2}.json.
// - Chat can combine collections of the same kind with a column saying which run each row came from (D-027):
//   lib/tools/combineCollections.ts. History keeps 500 lists with their saved time: lib/db/historyService.ts.
export const research: UseCasePageContent = {
    page: getPage("research", "use-case"),
    meta: {
        title: "How to Collect Research Data from Websites into a Dataset",
        description: "Turn Google Scholar results into a citation sheet, save the readable text of the pages you cite, and make a dated dataset from a list on the web.",
    },
    h1: "How to collect research data from websites into a clean dataset",
    intro: "Collect Google Scholar results into a citation sheet, save the readable text of the pages you cite, and turn a list on the web into a dated table. Web Scraper Pro does all three in your Chrome browser, with no code, and what you collect stays in your browser until you export it.",
    status: "draft",
    lastUpdated: "2026-11-10",
    job: {
        heading: "The collecting part of research",
        paragraphs: [
            "A literature review starts with many results to sort. A report needs a dataset that exists only as a web page. An AI tool needs the text of a set of documentation pages without the menus.",
            "Each of those is hours of copying, or a scraper you'd have to write and maintain. Web Scraper Pro handles them with two tabs in one panel: the List tab for anything that repeats down a page, and the Properties tab for the text of a single page.",
            "Every collection is saved in History with the time it was saved, so the dataset says when it was taken. The rows stay in your browser until you save a file.",
        ],
    },
    workflow: {
        heading: "How to go from search results to a dataset in five steps",
        intro: "Five steps, from a Google Scholar search to a citation sheet and the text of the pages you keep.",
        steps: [
            {
                title: "Collect the search results",
                body: "Run your search on Google Scholar and click the Web Scraper Pro icon to open the side panel. In the List tab, Google Scholar has a ready-made setup, and the panel asks how many pages to collect: 1, 3, 5 (the default) or 10, Until the end, or Custom. Then click Collect.",
                points: [
                    "You get one row per result, with Rank, Title, Authors, Publication, Year, Cited By, Result URL and Document URL where Google Scholar shows a full-text link, among 19 columns.",
                    "If Google Scholar shows a verification page, the panel says Scholar verification required. Complete the verification in Google Scholar, then refresh detection. The extension won't bypass it.",
                ],
                feature: "list-scraper",
                screenshot: "ext/results-scholar",
            },
            {
                title: "Sort the shortlist",
                body: "Click View results. Click the Cited By column to sort by citations, or Year for the newest. Delete the columns you don't need with the trash icon, then click Export as and choose Google Sheets or Microsoft Excel.",
                points: [
                    "To export only some columns, type in chat: download only the title, authors, year and cited by as CSV.",
                    "For a reference manager, export as CSV and map Title, Authors, Publication and Year.",
                ],
                feature: "export-to-google-sheets",
            },
            {
                title: "Save the text of the pages you keep",
                body: "For each web page you want to read or quote, open it, open the panel's Properties tab, and click Collect page text. You get the readable text with the page title, description, author, publish date and word count.",
                points: [
                    "Click Export as and choose Microsoft Word for a document, or use Copy text to paste it into a note or an AI tool.",
                    "Author and publish date are filled when the page states them; some pages leave them blank.",
                ],
                feature: "page-text",
                screenshot: "ext/page-text-document",
            },
            {
                title: "Do a whole reading list at once",
                body: "Open the Bulk scrape menu at the top of the panel and choose Collect page text. Choose Paste URLs, paste the addresses, click Continue, then Start collecting. Each page becomes a row with its text and details, and View merged table puts the whole list in one table.",
                points: [
                    "Pages load one after another in a browser inside the bulk page.",
                    "Export the merged table as one Word document, or as CSV or JSON for a pipeline.",
                ],
                feature: "bulk-scraper",
                screenshot: "ext/bulk-overview",
            },
            {
                title: "Turn a web list into a dataset",
                body: "A table of countries, a directory of organizations, a list of software products: open the page, pick the list in the List tab, collect every page, and save the file. Add the saved time from History as a column when the dataset needs it on every row.",
                points: [
                    "Capterra, Product Hunt, G2 and YouTube have ready-made setups. On other pages the List tab looks for the list and names the columns from the page.",
                    "If it doesn't find the rows as one list, choose Choose an item on the page and click one row.",
                ],
                feature: "list-scraper",
                screenshot: "ext/list-tab-detected",
            },
        ],
    },
    sample: {
        caption: "Sample data: invented papers and authors, with column names from the Google Scholar setup.",
        columns: ["Title", "Authors", "Year", "Cited By"],
        rows: [
            ["Sample study of trail surfaces and injury", "A. Sample, M. Example", "2024", "41"],
            ["Sample review of footwear cushioning", "J. Example", "2023", "118"],
            ["A sample meta-analysis of boot stiffness", "L. Sample, S. Example", "2022", "27"],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Five research jobs, and where each one starts",
            paragraphs: [
                "The same two tabs cover many collecting jobs a researcher has. What changes is the page you start on and how many pages you collect.",
            ],
            table: {
                columns: ["The job", "Start from", "What changes"],
                rows: [
                    ["A literature search", "A Google Scholar search with a year range", "The List tab asks how many pages: up to 10, or Until the end, which continues until the last page, you stop it, or Google Scholar asks for verification."],
                    ["A reading list as clean text", "A list of page addresses, one per line", "Bulk scrape > Collect page text reads each page in turn. The merged table holds one row per page, with its text, author, publish date and word count."],
                    ["A directory or table as a dataset", "A page where the rows repeat", "The List tab looks for the list and names the columns from the page. Choose Collect more pages for a list that continues."],
                    ["Videos on a topic", "A YouTube search or a channel's Videos tab", "YouTube has a ready-made setup with Title, Channel, Views, Published, Duration and Type. The collection scrolls the page to load more videos."],
                    ["Text for an AI tool", "The addresses of the pages you want it to know: documentation, a help center, a set of articles", "Bulk scrape > Collect page text with Clean page text on. Export the merged table as a Word document or as JSON, and add the file to the tool the way its own help describes."],
                ],
                caption: "Every collection is saved in History with its saved time, whichever job it was.",
            },
        },
        {
            id: "text-for-ai",
            eyebrow: "Text for an AI tool",
            heading: "A set of documentation pages in one file",
            paragraphs: [
                "A knowledge base, a ChatGPT project or a Claude project wants the text of the pages, not the pages: a title and date on each so you know what the tool was given. That is a bulk page-text run.",
                "Paste the page addresses into Bulk scrape, choose Collect page text, and leave Clean page text and Page details on. Each page becomes a row with Source URL, Page title, Description, Page text, Word count, Author and Publish date.",
                "Export the merged table as a Word document, or as JSON if the tool takes structured files. What the tool does with the file is up to the tool; the extension gives you the text with its details.",
            ],
            points: [
                "Keep the Word count column: it shows which pages are a paragraph and which are the manual.",
                "Collect the same list again when the documentation changes; History keeps each collection with its saved time, so you know which version the tool holds.",
                "For every page of a site, collect the links from its sitemap or index page with the List tab first, then paste the link column into the bulk run.",
            ],
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "A literature review on trail running injuries, start to finish",
            paragraphs: [
                "Here is the shape of the work. The topic is an example; the steps are the ones you'd take for any topic.",
            ],
            steps: [
                { title: "Search Google Scholar with a year range.", body: "Type the topic, set a year range under the year filter, and sort by relevance." },
                { title: "Collect ten pages.", body: "Open the List tab, choose 10 pages, and click Collect." },
                { title: "Sort and cut.", body: "On the results page, click Cited By to sort by citations. Use Filter rows to keep the rows you want, such as those with a Document URL, so the shortlist has full texts. Delete the URL columns you don't need with the trash icon." },
                { title: "Export the citation sheet.", body: "Click Export as and choose CSV for your reference manager, or Google Sheets or Microsoft Excel for the review table." },
                { title: "Collect the text of the ones you keep.", body: "Copy the Result URL column of the shortlist, open Bulk scrape > Collect page text, choose Paste URLs, paste the addresses, and click Start collecting." },
                { title: "Save one document.", body: "Click View merged table, then Export as > Microsoft Word. You have the readable text of each page, with its title, author and date where the page states them, in one file, and the collection's saved time in History." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: ["The sheet is the start of the analysis, not the end of it. Four recipes."],
            points: [
                "A reference manager: export the Google Scholar table as CSV and use the manager's CSV import, mapping Title, Authors, Publication and Year. For a BibTeX entry, use Google Scholar's own export on the paper's page.",
                "A citation table that updates: collect the same search next month, export again, and look up each row by Result URL to compare Cited By.",
                "A corpus for an AI tool: open the merged page-text table, use Copy text for one page or Export as > Microsoft Word for all of them.",
                "A dated dataset for a report: in History, every collection carries the time it was saved. Add that date as a column in the sheet so each row says when it was true.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes",
            heading: "Six mistakes that cost an afternoon",
            paragraphs: ["Many of them come from treating a results page as the paper, or a collection as a one-off."],
            points: [
                "Collecting many Google Scholar pages in one sitting. Google Scholar can ask for a verification; complete it in Google Scholar, refresh detection, and continue. Fewer pages at a time is calmer.",
                "Expecting abstracts in the Google Scholar table. The results page shows a snippet, not the abstract. The Result URL and Document URL lead to the paper.",
                "Expecting the PDF itself. The table holds the full-text link in Document URL, not the file.",
                "Forgetting the date. A dataset without the day it was collected can't be cited or compared. History has the saved time; copy it into the sheet.",
                "Collecting a page that loads more text as you scroll before scrolling to the end. Scroll first, then click Collect page text.",
                "Republishing collected text. The text belongs to its publisher. Keep it for notes and analysis, and quote from the source with a citation.",
            ],
        },
    ],
    sites: [{ name: "Google Scholar", page: "scholar" }, { name: "YouTube", page: "youtube" }, { name: "Capterra" }, { name: "Product Hunt" }, { name: "Any page with a list or an article" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Read papers behind a paywall or a sign-in you don't have. It collects what your browser shows you.",
            "Collect abstracts from the Google Scholar results page; they aren't there. Follow the link and collect the page text.",
            "Download the PDFs. The table holds the full-text link; open it yourself.",
            "Get past a Google Scholar verification. You complete it yourself, in Google Scholar.",
            "Decide what you may republish. Collected text belongs to its publisher; keep it for notes and analysis, and quote from the source.",
        ],
    },
    guides: [],
    faqs: [
        { q: "Is it free to use for research?", a: "Yes. Web Scraper Pro is free, with no paid plan, and there's no account to create. Your exports stay with you." },
        { q: "How do I scrape Google Scholar search results?", a: "Run the search, open the panel's List tab, choose how many pages, and click Collect. You get one row per result with title, authors, publication, year, citations and links, ready for Excel or Google Sheets." },
        { q: "How many Google Scholar results can I collect?", a: "The panel offers 1, 3, 5 or 10 pages, a custom number up to 10, or Until the end, which continues until the last page Google Scholar offers, you stop it, or Google Scholar asks for verification. The default is 5 pages." },
        { q: "Is the collected text clean enough for an AI tool?", a: "With Clean page text on, it's the page's readable text, with the page title, description, author and publish date in their own columns. Save it as a Word document, or as CSV or JSON for a pipeline." },
        { q: "Can I build a knowledge base for ChatGPT or Claude from a website?", a: "You can collect the text for one. Paste the pages' addresses into Bulk scrape > Collect page text, export the merged table as a Word document or JSON, and add the file to the tool the way its own help describes. The extension doesn't connect to the tool." },
        { q: "Can I combine several searches into one table?", a: "Yes, from chat. When a conversation has collected two or more searches of the same kind, chat offers to combine them into one table, with a column saying where each row came from. The separate collections stay in History too." },
        { q: "Does every row carry the date it was collected?", a: "Every collection is saved in History with the time it was saved, and page-text rows carry their Source URL. Add the date as a column in the sheet when the dataset needs it on each row." },
        { q: "Can I collect videos on a topic from YouTube?", a: "Yes. Run the search or open a channel's Videos tab and pick the list in the panel; YouTube has a ready-made setup with Title, Channel, Views, Published and Duration, and the collection scrolls the page to load more." },
        { q: "Does it work on a library database without a ready-made setup?", a: "Often. The List tab looks for the results list and names the columns from the page; if it doesn't find it, choose Choose an item on the page and click one result. Collect the first page and check the columns before a long collection. Pages you're signed in to work, because the extension reads what your browser shows." },
        { q: "Can it collect software reviews for a competitor table?", a: "Capterra, G2 and Product Hunt have ready-made setups for their product lists. Collect every page and export with the product links." },
        { q: "What happens when Google Scholar asks for a verification?", a: "In the List tab, the panel says Scholar verification required: complete it in Google Scholar, then refresh detection. In a bulk run, the run waits for you to complete it and then resumes. The extension never bypasses it." },
    ],
};
