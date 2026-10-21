import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Wei, analyst or researcher (docs/personas.md), written so a first-time reader can follow. Facts checked against
// release 1.3.0 on 2026-10-21: the Scholar pack (configs-prod/scholar/), page text columns and Word export
// (lib/tools/capabilityTools.ts collect_page_text, entrypoints/dataviewer/), bulk Collect page text
// (lib/bulk/executors/textBulkExecutor.ts), list detection on any site. Never claim anything about what an AI tool does
// with the text. Draft until the screenshots exist.
// Title targets what a reader would type into Google; "Google Scholar" is the site's name on this site (2026-10-21).

export const research: UseCasePageContent = {
    page: getPage("research", "use-case"),
    meta: {
        title: "How to Collect Research Data from Websites into a Dataset",
        description: "Turn Google Scholar results into a citation sheet, save the clean text of the pages you cite, and make a dated dataset from any list on the web. In your browser, no code, nothing uploaded.",
    },
    h1: "How to collect research data from websites into a clean dataset",
    intro: "Collect Google Scholar results into a citation sheet, save the readable text of the pages you cite, and turn any list on the web into a dated table. Web Scraper Pro does all three in your Chrome browser, with no code and nothing uploaded.",
    status: "draft",
    lastUpdated: "2026-10-21",
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
    sites: [{ name: "Google Scholar", page: "scholar" }, { name: "YouTube", page: "youtube" }, { name: "Capterra" }, { name: "Product Hunt" }, { name: "Any page with a list or an article" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Read papers behind a paywall or a sign-in you don't have. It collects what your browser shows you.",
            "Collect abstracts from the Google Scholar results page; they aren't there. Follow the link and collect the page text.",
            "Tell an AI tool anything on your behalf. It gives you clean text and tables; what you do with them in another tool is yours.",
            "Decide what you may republish. Collected text belongs to its publisher; keep it for notes and analysis, and quote from the source.",
        ],
    },
    guides: ["export-scholar-search-results", "save-a-pages-text-as-a-document", "collect-youtube-search-results", "collect-every-page-of-results"],
    faqs: [
        { q: "Is it free to use for research?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create. Install it, collect what you need, and remove it when you're done; your exports stay with you." },
        { q: "How do I scrape Google Scholar search results?", a: "Run the search, open the panel's List tab, choose how many pages, and click Collect. You get one row per result with title, authors, publication, year, citations and links, ready for Excel or Google Sheets." },
        { q: "Is the collected text clean enough for an AI tool?", a: "It's the page's main text in reading order, without menus, ads, cookie banners, sidebars or comments. The title, description, author and date sit in their own columns. Save it as a Word document, or as CSV or JSON for a pipeline." },
        { q: "How many Google Scholar results can I collect?", a: "As many pages as Google Scholar offers, up to its own limit of 100 pages, or 1,000 results. The panel's default is 10 pages; choose a number or every page." },
        { q: "Does every row carry the date it was collected?", a: "Every collection is saved in History with its date, and bulk runs record the source address per row. Add the date as a column in the sheet when the dataset needs it on each row." },
        { q: "Can it collect software reviews for a competitor table?", a: "Capterra and Product Hunt listings have ready-made columns, and a review page's list of reviews is found like any other list. Collect every page and export with the source links." },
    ],
};
