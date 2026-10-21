import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the Scholar pack in configs-prod/scholar/google-scholar.json
// (columns Rank, Title, Result Type, Result URL, Authors, Author Profile URLs, Publication, Year, Publisher / Source,
// Cited By, Cited By URL, Versions, Versions URL, Related Articles URL, Document URL, Document Type, Document Host Name;
// Next-page paging, 10 pages by default or every page) and the List tab's Scholar mode ("Collect this page, choose a page
// limit, or continue through every available Scholar page"; a verification page stops the run and is never bypassed).
// Draft until a real run's screenshots are in the visuals library.

export const scholar: ScraperPageContent = {
    slug: "scholar",
    category: "research-papers",
    site: { name: "Scholar search results", url: "https://scholar.google.com" },
    meta: {
        title: "Scholar Scraper: Search Results to a Citation Spreadsheet",
        description: "Collect Scholar search results into a spreadsheet: title, authors, publication, year, citations, full-text link and source, across every page of results, for a literature review or a dataset.",
    },
    h1: "Collect Scholar search results into a spreadsheet",
    intro: "Run a search on Scholar, open the side panel, and get one row per result with title, authors, publication, year, citation count and the full-text link, across as many pages as you choose. Sort by citations or year in the sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search on a research topic, after export. Papers and authors are made up.",
        columns: ["Title", "Authors", "Publication", "Year", "Cited By", "Document Type", "Document URL"],
        rows: [
            ["Trail surface and running injury rates", "A. Rivera, M. Chen", "Journal of Sports Science", "2024", "41", "PDF", "example.edu/rivera2024.pdf"],
            ["Footwear cushioning in long-distance runners", "J. Okafor", "Sports Medicine Review", "2023", "118", "HTML", "example.org/okafor-cushioning"],
            ["A meta-analysis of hiking boot stiffness", "L. Haddad, S. Park, R. Byrne", "Applied Biomechanics", "2022", "27", "PDF", "example.edu/haddad2022.pdf"],
        ],
    },
    fields: {
        heading: "Seventeen columns from each result",
        intro: "The columns come from the Scholar setup, so every search gives the same sheet. A column stays empty when the result doesn't show it.",
        items: [
            { name: "Rank, Title, Result URL", description: "The result's position on the page, its title and the link Scholar points to." },
            { name: "Authors and Author Profile URLs", description: "The author line as Scholar shows it, and links to the author profiles it offers." },
            { name: "Publication, Year, Publisher / Source", description: "The journal or venue, the year and the source site, split from Scholar's source line." },
            { name: "Cited By and Cited By URL", description: "The citation count as a number, and the link to the citing papers." },
            { name: "Versions, Versions URL, Related Articles URL", description: "How many versions Scholar found, with the links to them and to related articles." },
            { name: "Document URL, Document Type, Document Host Name", description: "The full-text link where Scholar shows one, whether it's a PDF or HTML, and the site hosting it." },
            { name: "Result Type", description: "Article, citation, book or the other kinds Scholar labels." },
        ],
    },
    steps: {
        heading: "Search, choose the pages, collect",
        items: [
            { title: "Search on Scholar", points: ["Example: trail running injury rates, with a year range.", "Each Scholar page holds ten results."], body: "Run the search with the filters you want: year range, sort by date, include citations or not. The extension collects the results as the page shows them." },
            { title: "Choose how many pages", points: ["Keep 10, type a number, or choose every page. The run pauses between pages on purpose.", "If Scholar shows a verification page, the run stops; complete it in the tab, click Rescan, and collect again."], body: "Open the side panel's List tab. Scholar is recognised, and the panel offers to collect this page, a number of pages, or every available page. Ten pages is the default." },
            { title: "Review and export", points: ["Example to type with the results tab in front: Only title, authors, year and cited by, sorted by cited by."], body: "Sort by Cited By or Year, remove columns you don't need, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Scholar specifics",
        items: [
            "Scholar shows at most 1,000 results per search (100 pages). For a wider sweep, run several narrower searches or year ranges.",
            "Scholar sometimes shows a verification page when many pages are loaded. The run stops; complete the check in the tab, then rescan and continue. The extension never bypasses it.",
            "Abstracts aren't on the results page, so they aren't collected; the Result URL and Document URL lead to them.",
            "Author names come as Scholar's abbreviated line, such as A Rivera, M Chen, not as separate columns per author.",
            "Scholar's terms restrict automated collection. Collect for your own research and cite the papers from their own pages.",
        ],
    },
    emptyWhen: [{"column": "Document URL, Document Type, Document Host Name", "when": "Scholar shows no full-text link for the result."}, {"column": "Author Profile URLs", "when": "No author has a Scholar profile."}, {"column": "Cited By, Cited By URL", "when": "The paper has no citations yet."}, {"column": "Versions, Versions URL", "when": "Scholar found one version only."}, {"column": "Year, Publication", "when": "A citation-only result with no venue or date."}],
    pushback: ["Scholar shows a verification page when many pages load in a sitting. The run stops and keeps what it has; complete the check, Rescan, and continue.", "Scholar caps a search at 100 pages, 1,000 results. Split a wider sweep into narrower searches or year ranges."],
    screenshots: ["ext/list-tab-scholar", "ext/results-scholar"],
    feature: "list-scraper",
    guide: "export-scholar-search-results",
    useCase: "research",
    related: [],
    faqs: [
        { q: "Can I export Scholar results to a reference manager?", a: "Export as CSV and import it into your reference manager's CSV import, mapping Title, Authors, Publication and Year. The Document URL column gives the full-text link where Scholar has one." },
        { q: "Does it get the citation counts?", a: "Yes. Cited By is a number column, so the sheet sorts by it, and Cited By URL links to the citing papers." },
        { q: "How many pages can I collect?", a: "As many as Scholar offers, up to its own limit of 100 pages. The panel's default is 10; choose a number or every available page." },
        { q: "Can I collect a Scholar author profile or Cited by list?", a: "The ready-made setup is for search results. A Cited by page is a results page too, so it collects the same way; author profile pages are detected as a plain list." },
        { q: "Why is the full-text link empty?", a: "Scholar shows a PDF or HTML link only when it knows of one. Follow the Result URL for the publisher's page." },
        { q: "Can I import the file into a reference manager?", a: "Export as CSV and use your manager's CSV import, mapping Title, Authors, Publication and Year." },
    ],
};
