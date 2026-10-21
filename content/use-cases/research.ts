import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Wei, analyst or researcher (docs/personas.md). Facts checked against release 1.3.0 on 2026-10-21: the Scholar
// pack (configs-prod/scholar/), page text columns and Word export (lib/tools/capabilityTools.ts collect_page_text,
// entrypoints/dataviewer/), bulk Collect page text (lib/bulk/executors/textBulkExecutor.ts), list detection on any site.
// Never claim anything about what an AI tool does with the text. Draft until the screenshots exist.

export const research: UseCasePageContent = {
    page: getPage("research", "use-case"),
    meta: {
        title: "Research and AI Datasets: Papers, Page Text and Lists, Collected Clean",
        description: "Build a literature table from Scholar, collect clean page text with title, author and date for notes or an AI tool, and turn any list on the web into a dated dataset, all in your browser.",
    },
    h1: "A citation table, clean text and dated datasets, from your browser",
    intro: "Collect Scholar results into a citation sheet, the readable text of the pages you cite, and any list on the web into a table with the date you collected it. One-off jobs, no code, nothing uploaded.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The collecting part of research, done in an afternoon",
        paragraphs: [
            "A literature review starts with a hundred results to triage. A report needs a dataset that exists only as a web page. An AI tool needs the text of thirty documentation pages without the menus. Each is a day of copying, or a scraper you'd have to write and maintain.",
            "Web Scraper Pro does the three jobs with the same two tabs: the List tab for anything that repeats down a page, and the Properties tab for the text of a single page. Every collection is saved with its date, so the dataset says when it was taken.",
        ],
    },
    workflow: {
        heading: "From search results to a dataset",
        steps: [
            { title: "Collect the search results", body: "Run the search on Scholar, open the side panel's List tab, choose how many pages, and collect. One row per result with Title, Authors, Publication, Year, Cited By and the full-text link, as numbers where they are numbers.", feature: "list-scraper", screenshot: "ext/results-scholar" },
            { title: "Triage in the sheet", body: "Sort by Cited By or Year on the results page, remove the columns you don't need, and export the shortlist to Google Sheets or Excel. The Result URL column takes you back to each paper.", feature: "export-to-google-sheets" },
            { title: "Collect the text of the pages you keep", body: "For each web page you want to read or quote, open it and click Collect page text in the Properties tab. You get the readable text with the title, author, date and word count, exported as a Word document or as rows.", feature: "page-text" },
            { title: "Do it for a reading list at once", body: "Paste the addresses into Bulk scrape → Collect page text. Each page becomes a row with its text and details, and View merged table puts the whole list in one file for a report or an AI tool.", feature: "bulk-scraper", screenshot: "ext/bulk-overview" },
            { title: "Turn any web list into a dataset", body: "A table of countries, a directory of organisations, a list of software reviews: open the page, pick the list in the List tab, collect every page, and export with the collection date from History.", feature: "list-scraper", screenshot: "ext/list-tab-detected" },
        ],
    },
    sample: {
        caption: "Three rows of a Scholar export after triage. Papers and authors are made up.",
        columns: ["Title", "Authors", "Publication", "Year", "Cited By", "Document URL"],
        rows: [
            ["Trail surface and running injury rates", "A. Rivera, M. Chen", "Journal of Sports Science", "2024", "41", "example.edu/rivera2024.pdf"],
            ["Footwear cushioning in long-distance runners", "J. Okafor", "Sports Medicine Review", "2023", "118", "example.org/okafor-cushioning"],
            ["A meta-analysis of hiking boot stiffness", "L. Haddad, S. Park, R. Byrne", "Applied Biomechanics", "2022", "27", "example.edu/haddad2022.pdf"],
        ],
    },
    sites: [{ name: "Scholar search results", page: "scholar" }, { name: "Capterra" }, { name: "Product Hunt" }, { name: "Any page with a list or an article" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Read papers behind a paywall or a sign-in you don't have. It collects what your browser shows you.",
            "Collect abstracts from the Scholar results page; they aren't there. Follow the link and collect the page text.",
            "Tell an AI tool anything on your behalf. It gives you clean text and tables; what you do with them in another tool is yours.",
            "Decide what you may republish. Collected text belongs to its publisher; keep it for notes and analysis, and quote from the source.",
        ],
    },
    guides: ["export-scholar-search-results", "scrape-data-from-any-website-to-excel", "collect-every-page-of-results"],
    faqs: [
        { q: "Is the collected text clean enough for an AI tool?", a: "It's the page's main text in reading order, without menus, ads, cookie banners, sidebars or comments, with the title, description, author and date in their own columns. Export as a Word document, or as CSV or JSON for a pipeline." },
        { q: "Does every row carry the date it was collected?", a: "Every collection is saved in History with its date, and bulk runs record the source URL per row. Add the date as a column in the sheet when the dataset needs it on each row." },
        { q: "Can I use it for one project and stop?", a: "Yes. There's one plan, Pro, with every feature included, and you can cancel at any time. One month covers a project." },
        { q: "Can it collect software reviews for a competitor table?", a: "Capterra and Product Hunt listings have ready-made columns, and a review page's list of reviews is detected like any other list. Collect every page and export with the source links." },
    ],
};
