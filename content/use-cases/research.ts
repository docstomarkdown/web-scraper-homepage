import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Wei, analyst or researcher (docs/personas.md), written so a first-time reader can follow. Facts checked against
// release 1.3.0 on 2026-10-21: the Scholar pack (configs-prod/scholar/: 17 columns, 10 results a page, default 10 pages,
// Google Scholar's own cap of 100 pages), page text columns and Word export (lib/tools/capabilityTools.ts
// collect_page_text, entrypoints/dataviewer/), bulk Collect page text (lib/bulk/executors/textBulkExecutor.ts), list
// detection on any site, the YouTube pack (content/scrapers/youtube.ts), "Combine the N searches into one table" in chat
// (DECISIONS.md D-027), Filter rows and the Columns panel on the results page (content/features/export-to-google-sheets.ts).
// Never claim anything about what an AI tool does with the text. Draft until the screenshots exist.
// Title targets what a reader would type into Google; "Google Scholar" is the site's name on this site (2026-10-21).
// Deepened 2026-10-21 (variations, worked example, recipes, mistakes). Verify before publishing: that a PDF link opened in
// Chrome is not collected as page text (the page says "it collects the link, not the file"); that a results page on a
// library database without a pack is detected as a list.

export const research: UseCasePageContent = {
    page: getPage("research", "use-case"),
    meta: {
        title: "How to Collect Research Data from Websites into a Dataset",
        description: "Turn Google Scholar results into a citation sheet, save the clean text of the pages you cite, and make a dated dataset from any list on the web. In your browser, no code, nothing uploaded.",
    },
    h1: "How to collect research data from websites into a clean dataset",
    intro: "Collect Google Scholar results into a citation sheet, save the readable text of the pages you cite, and turn any list on the web into a dated table. Web Scraper Pro does all three in your Chrome browser, with no code and nothing uploaded.",
    status: "draft",
    lastUpdated: "2026-10-28",
    job: {
        heading: "The collecting part of research, done in an afternoon",
        paragraphs: [
            "A literature review starts with a hundred results to sort. A report needs a dataset that exists only as a web page. An AI tool needs the text of thirty documentation pages without the menus.",
            "Each of those is a day of copying, or a scraper you'd have to write and maintain. Web Scraper Pro does them with two tabs in one panel: the List tab for anything that repeats down a page, and the Properties tab for the text of a single page.",
            "Every collection is saved with its date, so the dataset says when it was taken. Nothing is uploaded; the data stays in your browser until you save a file.",
        ],
    },
    workflow: {
        heading: "How to go from search results to a dataset in five steps",
        intro: "A ten-page Google Scholar search takes under a minute.",
        steps: [
            {
                title: "Collect the search results",
                body: "Run your search on Google Scholar and click the Web Scraper Pro icon; a panel opens on the right. In the List tab, Google Scholar is recognised and the panel asks how many pages to collect. Keep 10, type a number, or choose every page, then click Collect.",
                points: ["You get one row per result: Rank, Title, Authors, Publication, Year, Cited By, the link, and the full-text link where Google Scholar shows one.", "Cited By and Year are numbers, so the sheet sorts by them.", "If Google Scholar shows a verification page, the run stops. Complete the check in the tab, click Rescan, and collect again."],
                feature: "list-scraper",
                screenshot: "ext/results-scholar",
            },
            {
                title: "Sort the shortlist",
                body: "Click View results. Click the Cited By column to sort by citations, or Year for the newest. Remove the columns you don't need with the trash icon, then click Export as and choose Google Sheets or Excel.",
                points: ["Example to type in the panel's chat with the results tab in front: Only title, authors, year and cited by, sorted by cited by", "For a reference manager, export as CSV and map Title, Authors, Publication and Year."],
                feature: "export-to-google-sheets",
            },
            {
                title: "Save the text of the pages you keep",
                body: "For each web page you want to read or quote, open it, open the panel's Properties tab, and click Collect page text. You get the readable text with the title, author, date and word count, without menus, ads or comments.",
                points: ["Click Export as and choose Microsoft Word for a document, or Copy text to paste it into a note or an AI tool.", "Author and date are filled when the page states them; some pages leave them blank."],
                feature: "page-text",
                screenshot: "ext/page-text-document",
            },
            {
                title: "Do a whole reading list at once",
                body: "Click the Bulk scrape icon at the top of the panel and choose Collect page text. Paste the addresses, click Continue, then Start collecting. Each page becomes a row with its text and details, and View merged table puts the whole list in one file.",
                points: ["Pages load one after another in an embedded browser. Thirty pages take a few minutes.", "Export the merged table as one Word document, or as CSV or JSON for a pipeline."],
                feature: "bulk-scraper",
                screenshot: "ext/bulk-overview",
            },
            {
                title: "Turn any web list into a dataset",
                body: "A table of countries, a directory of organisations, a list of software reviews: open the page, pick the list in the List tab, collect every page, and save the file. Add the date from History as a column when the dataset needs it on every row.",
                points: ["Capterra, Product Hunt, G2 and YouTube have ready-made columns; any other list is read from the page."],
                feature: "list-scraper",
                screenshot: "ext/list-tab-detected",
            },
        ],
    },
    sample: {
        caption: "Three rows of a Google Scholar export. Titles and names are made up.",
        columns: ["Title", "Authors", "Year", "Cited By"],
        rows: [
            ["Trail surface and running injury rates", "A. Rivera, M. Chen", "2024", "41"],
            ["Footwear cushioning in distance runners", "J. Okafor", "2023", "118"],
            ["A meta-analysis of boot stiffness", "L. Haddad, S. Park", "2022", "27"],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Four research jobs, and where each one starts",
            paragraphs: [
                "The same two tabs cover most collecting jobs a researcher has. What changes is the page you start on and how many pages you let it run through.",
            ],
            table: {
                columns: ["The job", "Start from", "What changes"],
                rows: [
                    ["A literature search", "A Google Scholar search with a year range", "The List tab recognises Google Scholar and asks how many pages. Ten pages is 100 results; every page runs to Google Scholar's own cap of 100 pages."],
                    ["A reading list as clean text", "A list of page addresses, one per line", "Bulk scrape → Collect page text reads each page in turn. The merged table holds one row per page, with its text, author, date and word count."],
                    ["A directory or table as a dataset", "Any page where the rows repeat", "The List tab finds the list and names the columns from the page. Choose Collect more pages for a list that continues."],
                    ["Videos on a topic", "A YouTube search or a channel's Videos tab", "YouTube has ready-made columns: Title, Channel, Views as a number, Published, Duration, Type. The run scrolls until nothing new loads."],
                    ["Text for an AI tool", "The addresses of the pages you want it to know: documentation, a help centre, a set of articles", "Bulk scrape → Collect page text with Clean page text on. Export the merged table as a Word document, one heading per page, or as JSON, and add the file to the tool the way its own help describes."],
                ],
                caption: "Every run is saved in History with its date, whichever job it was.",
            },
        },
        {
            id: "text-for-ai",
            eyebrow: "Text for an AI tool",
            heading: "Thirty pages of documentation into one clean file",
            paragraphs: [
                "A knowledge base, a ChatGPT project or a Claude project wants the text of the pages, not the pages: no menus, cookie banners or footers, and a title and date on each so you know what the tool was given. That is a bulk page-text run.",
                "Paste the page addresses into Bulk scrape, choose Collect page text, and leave Clean page text and Page details on. Each page becomes a row with Source URL, Page title, Description, Page text, Word count, Author and Publish date. Export the merged table as a Word document, which puts one heading per page with its details under it, or as JSON if the tool takes structured files. What the tool does with the file is the tool's business; the extension gives you clean, dated text and nothing more.",
            ],
            points: [
                "Keep the Word count column: it tells you at once which pages are a paragraph and which are the manual.",
                "Rerun the same list when the documentation changes; History keeps each run with its date, so you know which version the tool holds.",
                "For a site's every page, collect the links from its sitemap or index page with the List tab first, then paste the link column into the bulk run.",
            ],
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "A literature review on trail running injuries, start to finish",
            paragraphs: [
                "Here is one afternoon's work, with the counts and times the extension gives. The topic is made up; the steps are the ones you'd take for any topic.",
            ],
            steps: [
                { title: "Search Google Scholar with a year range.", body: "Type the topic, set 2019 to 2024 under the year filter, and sort by relevance. Each page holds ten results." },
                { title: "Collect ten pages.", body: "Open the List tab, keep the default of 10 pages, and click Collect. The run pauses between pages on purpose and finishes in under a minute with 100 rows." },
                { title: "Sort and cut.", body: "On the results page, click Cited By to sort by citations. Use Filter rows to keep rows with a Document URL, so the shortlist has full texts. Remove the URL columns you don't need with the trash icon." },
                { title: "Export the citation sheet.", body: "Click Export as and choose CSV for your reference manager, or Google Sheets or Excel for the review table. Cited By and Year stay numbers." },
                { title: "Collect the text of the thirty you keep.", body: "Copy the Result URL column of the shortlist, open Bulk scrape → Collect page text, paste the addresses, and click Start collecting. Thirty pages take a few minutes." },
                { title: "Save one document.", body: "Click View merged table, then Export as → Microsoft Word. You have the readable text of thirty pages, each with its title, author and date, in one file, and the collection's date in History." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: ["The sheet is the start of the analysis, not the end of it. These four recipes come up most."],
            points: [
                "A reference manager: export the Google Scholar table as CSV and use the manager's CSV import, mapping Title, Authors, Publication and Year. For a BibTeX entry, use Google Scholar's own export on the paper's page.",
                "A citation table that updates: run the same search next month, export again, and look up each row by Result URL. Cited By is a number, so the sheet can subtract last month's count.",
                "A corpus for an AI tool: open the merged page-text table, click Copy text for one page or Export as → Microsoft Word for all of them. The text is the page's main text in reading order, without menus or comments.",
                "A dated dataset for a report: in History, every collection carries the date it was taken. Add that date as a column in the sheet so each row says when it was true.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes",
            heading: "Six mistakes that cost an afternoon",
            paragraphs: ["Most of them come from treating a results page as the paper, or a run as a one-off."],
            points: [
                "Collecting fifty pages of Google Scholar in one sitting. A verification page appears, the run stops, and you complete the check and continue. Ten or twenty pages at a time is calmer.",
                "Expecting abstracts in the Google Scholar table. The results page shows a snippet, not the abstract. The Result URL and Document URL lead to the paper.",
                "Expecting the PDF itself. The table holds the full-text link; the extension collects the link, not the file.",
                "Forgetting the date. A dataset without the day it was collected can't be cited or compared. History has the date; copy it into the sheet.",
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
            "Tell an AI tool anything on your behalf. It gives you clean text and tables; what you do with them in another tool is yours.",
            "Decide what you may republish. Collected text belongs to its publisher; keep it for notes and analysis, and quote from the source.",
        ],
    },
    guides: ["export-scholar-search-results", "save-a-pages-text-as-a-document", "collect-youtube-search-results", "collect-every-page-of-results"],
    faqs: [
        { q: "Is it free to use for research?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create. Install it, collect what you need, and remove it when you're done; your exports stay with you." },
        { q: "How do I scrape Google Scholar search results?", a: "Run the search, open the panel's List tab, choose how many pages, and click Collect. You get one row per result with title, authors, publication, year, citations and links, ready for Excel or Google Sheets." },
        { q: "How many Google Scholar results can I collect?", a: "As many pages as Google Scholar offers, up to its own limit of 100 pages, or 1,000 results. The panel's default is 10 pages; choose a number or every page." },
        { q: "Is the collected text clean enough for an AI tool?", a: "It's the page's main text in reading order, without menus, ads, cookie banners, sidebars or comments. The title, description, author and date sit in their own columns. Save it as a Word document, or as CSV or JSON for a pipeline." },
        { q: "Can I build a knowledge base for ChatGPT or Claude from a website?", a: "You can collect the text for one. Paste the pages' addresses into Bulk scrape → Collect page text, export the merged table as a Word document or JSON, and add the file to the tool the way its own help describes. The extension gives you clean, dated page text; it doesn't connect to the tool or know what it does with the file." },
        { q: "Can I combine several searches into one table?", a: "Yes, from the Chat tab. When a conversation has collected two or more searches of the same kind, the latest result offers to combine them into one table, with a first column saying which search each row came from. The separate collections stay in History too." },
        { q: "Does every row carry the date it was collected?", a: "Every collection is saved in History with its date, and bulk runs record the source address per row. Add the date as a column in the sheet when the dataset needs it on each row." },
        { q: "Can I collect videos on a topic from YouTube?", a: "Yes. Run the search or open a channel's Videos tab, pick the list in the panel, and let it scroll to the end. Views are saved as numbers, so the sheet sorts a whole topic by views." },
        { q: "Does it work on a library database without a ready-made setup?", a: "The List tab finds the results list on most pages and names the columns from what the page shows. Collect the first page and check the columns before a long run. Pages you're signed in to work, because the extension reads what your browser shows." },
        { q: "Can it collect software reviews for a competitor table?", a: "Capterra and Product Hunt listings have ready-made columns, and a review page's list of reviews is found like any other list. Collect every page and export with the source links." },
        { q: "What happens when Google Scholar asks for a verification?", a: "The run stops and keeps what it has. Complete the check in the tab, click Rescan, and collect again. The extension never bypasses it; fewer pages per sitting keeps it from appearing." },
    ],
};
