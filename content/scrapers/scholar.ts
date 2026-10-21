import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the Scholar pack in configs-prod/scholar/google-scholar.json
// (columns Rank, Title, Result Type, Result URL, Authors, Author Profile URLs, Publication, Year, Publisher / Source,
// Cited By, Cited By URL, Versions, Versions URL, Related Articles URL, Document URL, Document Type, Document Host Name;
// Next-page paging, 10 pages by default or every page) and the List tab's Scholar mode ("Collect this page, choose a page
// limit, or continue through every available Scholar page"; a verification page stops the run and is never bypassed).
// Draft until a real run's screenshots are in the visuals library.
// 2026-10-21: title targets the search phrase ("scrape google scholar search results"); the site is named "Google Scholar",
// following the Google Maps wording decision of the same day.

export const scholar: ScraperPageContent = {
    slug: "scholar",
    category: "research-papers",
    site: { name: "Google Scholar", url: "https://scholar.google.com" },
    meta: {
        title: "How to Scrape Google Scholar Search Results into a Spreadsheet",
        description: "Turn a Google Scholar search into a spreadsheet: title, authors, publication, year, citation count and full-text link for every result, across every page. Free Chrome extension, no code.",
    },
    h1: "How to scrape Google Scholar search results into a spreadsheet",
    intro: "Run a search on Google Scholar and open the side panel. Every result becomes a row with title, authors, publication, year, citation count and the full-text link, across as many pages as you choose. Sort by citations or year in the sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search on a research topic, after export. Papers and authors are made up.",
        columns: ["Title", "Authors", "Year", "Cited By", "Document URL"],
        rows: [
            ["Trail surface and running injury rates", "A. Rivera, M. Chen", "2024", "41", "example.edu/rivera2024.pdf"],
            ["Footwear cushioning in long-distance runners", "J. Okafor", "2023", "118", "example.org/okafor-cushioning"],
            ["A meta-analysis of hiking boot stiffness", "L. Haddad, S. Park, R. Byrne", "2022", "27", "example.edu/haddad2022.pdf"],
        ],
    },
    fields: {
        heading: "What you get for every result",
        intro: "Seventeen columns from the Google Scholar setup, so every search gives the same sheet.",
        items: [
            { name: "Rank", description: "The result's position on the page." },
            { name: "Title and Result URL", description: "The title and the link Google Scholar points to." },
            { name: "Result Type", description: "Article, citation, book or the other kinds Google Scholar labels." },
            { name: "Authors", description: "The author line as Google Scholar shows it." },
            { name: "Author Profile URLs", description: "Links to the author profiles it offers." },
            { name: "Publication, Year, Publisher / Source", description: "The venue, the year and the source site, split from the source line." },
            { name: "Cited By and Cited By URL", description: "The citation count as a number, and the link to the citing papers." },
            { name: "Versions and Versions URL", description: "How many versions were found, with the link to them." },
            { name: "Related Articles URL", description: "The link to related articles." },
            { name: "Document URL, Document Type, Document Host Name", description: "The full-text link where one is shown, whether it's a PDF or HTML, and the site hosting it." },
        ],
    },
    steps: {
        heading: "How to scrape Google Scholar in three steps",
        items: [
            {
                title: "Search on Google Scholar",
                body: "Run the search with the filters you want: year range, sort by date, include citations or not. The extension collects the results as the page shows them.",
                points: ["Example: trail running injury rates, with a year range.", "Each page holds ten results."],
            },
            {
                title: "Choose how many pages",
                body: "Click the Web Scraper Pro icon and open the List tab. Google Scholar is recognised, and the panel offers to collect this page, a number of pages, or every available page. Ten pages is the default.",
                points: ["The run pauses between pages on purpose.", "If a verification page appears, the run stops. Complete it in the tab, click Rescan, and collect again."],
            },
            {
                title: "Review and export",
                body: "Sort by Cited By or Year, remove the columns you don't need, then export to Excel, CSV, JSON or Google Sheets.",
                points: ["Or type with the results tab in front: Only title, authors, year and cited by, sorted by cited by."],
            },
        ],
    },
    notes: {
        heading: "Specific to Google Scholar",
        items: [
            "Google Scholar shows at most 1,000 results per search, 100 pages. For a wider sweep, run several narrower searches or year ranges.",
            "A verification page can appear when many pages load in a sitting. The run stops; complete the check, rescan and continue. The extension never bypasses it.",
            "Abstracts aren't on the results page, so they aren't collected. The Result URL and Document URL lead to them.",
            "Author names come as the abbreviated line, such as A Rivera, M Chen, not as one column per author.",
            "Google Scholar's terms restrict automated collection. Collect for your own research and cite the papers from their own pages.",
        ],
    },
    emptyWhen: [
        { column: "Document URL, Document Type, Document Host Name", when: "No full-text link is shown for the result." },
        { column: "Author Profile URLs", when: "No author has a profile." },
        { column: "Cited By, Cited By URL", when: "The paper has no citations yet." },
        { column: "Versions, Versions URL", when: "One version only was found." },
        { column: "Year, Publication", when: "A citation-only result with no venue or date." },
    ],
    pushback: [
        "A verification page can appear when many pages load in a sitting. The run stops and keeps what it has. Complete the check, Rescan, and continue.",
        "A search is capped at 100 pages, 1,000 results. Split a wider sweep into narrower searches or year ranges.",
    ],
    screenshots: ["ext/list-tab-scholar", "ext/results-scholar"],
    feature: "list-scraper",
    guide: "export-scholar-search-results",
    useCase: "research",
    related: [],
    faqs: [
        { q: "Is this Google Scholar scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "How many pages can I collect?", a: "As many as Google Scholar offers, up to its own limit of 100 pages. The panel's default is 10; choose a number or every available page." },
        { q: "Does it get the citation counts?", a: "Yes. Cited By is a number column, so the sheet sorts by it, and Cited By URL links to the citing papers." },
        { q: "Can I export Google Scholar results to a reference manager?", a: "Export as CSV and use your reference manager's CSV import, mapping Title, Authors, Publication and Year. The Document URL column gives the full-text link where there is one." },
        { q: "Can I scrape an author profile or a Cited by list?", a: "A Cited by page is a results page too, so it collects the same way. Author profile pages are detected as a plain list." },
        { q: "Why is the full-text link empty?", a: "Google Scholar shows a PDF or HTML link only when it knows of one. Follow the Result URL for the publisher's page." },
        { q: "Does it collect abstracts?", a: "No. Abstracts aren't on the results page. The Result URL and Document URL lead to them." },
    ],
};
