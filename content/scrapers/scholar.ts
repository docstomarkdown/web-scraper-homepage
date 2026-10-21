import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the Scholar pack in configs-prod/scholar/google-scholar.json
// (columns Rank, Title, Result Type, Result URL, Authors, Author Profile URLs, Publication, Year, Publisher / Source,
// Cited By, Cited By URL, Versions, Versions URL, Related Articles URL, Document URL, Document Type, Document Host Name;
// Next-page paging with a 1.5 s wait between pages, 10 pages by default or every page) and the List tab's Scholar mode
// ("Collect this page, choose a page limit, or continue through every available Scholar page"; a verification page stops
// the run and is never bypassed). Google Scholar's own cap: 10 results a page, 100 pages, 1,000 results per search.
// Draft until a real run's screenshots are in the visuals library.
// 2026-10-21: title targets the search phrase ("scrape google scholar"); the site is named "Google Scholar". The guide
// owns "How To Scrape Search Results from Google Scholar"; this page owns the citation-counts phrase.
// 2026-10-21 (later): deepened. Verify before publishing: the time for ten pages in the worked example (written as
// "under a minute", from the 1.5 s page wait plus load time).

export const scholar: ScraperPageContent = {
    slug: "scholar",
    category: "research-papers",
    site: { name: "Google Scholar", url: "https://scholar.google.com" },
    meta: {
        title: "How to Scrape Google Scholar Results with Citation Counts",
        description: "Turn a Google Scholar search into a spreadsheet: title, authors, publication, year, citation count and full-text link for every result, across every page. Free Chrome extension, no code.",
    },
    h1: "How to scrape Google Scholar results with citation counts into a spreadsheet",
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
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three searches worth running",
            paragraphs: [
                "A Google Scholar search is a topic plus the filters on the left: a year range, sort by date, and whether to include citations. The extension collects whatever the page shows, so set the filters first.",
                "These three shapes cover most literature jobs. Change the topic to yours.",
            ],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["trail running injury rates, 2019 to 2025", "A year range keeps a literature review current and under the 1,000-result cap", "Title, Authors, Year, Cited By, Document URL"],
                    ["\"hiking boot\" stiffness, sorted by date", "The newest work on a narrow phrase; quotes keep the phrase together", "Title, Year, Publication, Result URL"],
                    ["author:\"A Rivera\" running", "One author's papers, with citation counts, for a reading list or a CV check", "Title, Year, Cited By, Versions"],
                ],
                caption: "Google Scholar's own operators (quotes, author:, the year boxes) all work, because the run reads the page you set up.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "A hundred papers on a topic, ranked by citations",
            paragraphs: ["Google Scholar shows ten results a page, so ten pages is a hundred papers. Here is a typical run on version 1.3.0."],
            steps: [
                { title: "Search trail running injury rates and set the years.", body: "Type the year range in the boxes on the left, then open the List tab. Google Scholar is recognised, and the panel offers a page limit." },
                { title: "Keep the default of 10 pages and click Collect.", body: "The run reads a page, waits a moment, and clicks Next. Ten pages take under a minute when Google Scholar answers normally." },
                { title: "If a verification page appears, answer it.", body: "The run stops and keeps what it has. Complete the check in the tab, click Rescan, and collect again from the page you're on." },
                { title: "Sort by Cited By.", body: "Click the header. The most-cited papers rise to the top, and Document URL shows which have a free PDF." },
                { title: "Export to Excel or CSV.", body: "Click Export as. For a reference manager, export CSV and map Title, Authors, Publication and Year on import." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: ["Four moves on the results page turn a search into a reading list, a review table or a download list."],
            points: [
                "The reading list: sort by Cited By, keep the top thirty, hide every column but Title, Authors, Year and Result URL, and export.",
                "The free-PDF list: Filter rows, Document Type is PDF. Those links open the full text without a library sign-in.",
                "The review table: keep Publication and Year, export to Google Sheets, and count papers per venue per year with a pivot table to see where a field publishes.",
                "The citation trail: open a Cited By URL, which is a results page too, and collect it the same way. Two runs give you the paper and everything that cites it.",
            ],
        },
        {
            id: "caps",
            eyebrow: "Limits",
            heading: "What Google Scholar shows, and what it doesn't",
            paragraphs: ["The results page is a summary of each paper. Abstracts, full author names and the paper itself sit one click away, and the run doesn't take that click."],
            table: {
                columns: ["What", "On Google Scholar", "In your table"],
                rows: [
                    ["Results per search", "10 a page, at most 100 pages", "Up to 1,000 rows; for more, narrow the search or the years"],
                    ["Abstracts", "On the paper's own page", "Not collected; Result URL and Document URL lead there"],
                    ["Authors", "One abbreviated line per result", "The Authors column as shown, not one column per author"],
                    ["Verification page", "Appears after many pages in a sitting", "The run stops and is never bypassed; answer it and continue"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with Google Scholar's own export",
            paragraphs: [
                "Google Scholar exports one citation at a time, through the quote button under each result, in BibTeX or a reference manager's format. For a hundred papers that's a hundred clicks, and the citation counts don't come with them.",
                "The run gives the whole page set as one table with Cited By as a number. The one thing Google Scholar's export has that the table doesn't is the formatted citation itself, which your reference manager builds from the columns on import.",
            ],
            table: {
                columns: ["", "Google Scholar's quote button", "With the extension"],
                rows: [
                    ["A hundred papers", "A hundred clicks, one file each", "One run, one table"],
                    ["Citation counts", "Not exported", "Cited By, as a number you can sort"],
                    ["Full-text links", "Not exported", "Document URL, with PDF or HTML in Document Type"],
                ],
            },
        },
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
        { q: "How do I scrape Google Scholar without getting a verification page?", a: "Collect in sittings of a few hundred results, and let the run keep its pause between pages. When the page appears anyway, answer it in the tab, click Rescan, and continue; nothing collected is lost." },
        { q: "Is scraping Google Scholar allowed?", a: "Google Scholar's terms restrict automated collection, and the run never bypasses its verification page. Collect for your own research, keep the rows to the public results page, and cite papers from their own pages; our explainer at /web-scraping-legal covers the rules in plain words. It isn't legal advice." },
    ],
};
