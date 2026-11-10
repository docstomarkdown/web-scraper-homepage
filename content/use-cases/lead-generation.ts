import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Arjun, lead-generation agency owner (docs/personas.md), written so a first-time, non-technical reader can
// follow it too. Rewritten 2026-10-28 around the sources this site owns: business directories, a list of websites,
// careers pages and member lists. Google Maps gets one paragraph that points at mapsscraper.pro, which covers Maps only.
// Title targets "web scraping for lead generation" (youtube-research/SEARCH_QUERIES.md, AUTOSUGGEST.md), 2026-10-21.
//
// Facts checked against chrome-extension-source on 2026-11-10 (no real run; sample rows are invented):
// - Ready-made setups for Yellow Pages, Justdial, BBB and Yelp: configs-prod/{yellowpages.com,justdial.com,bbb.org,yelp}.json.
//   Columns from configs-prod/site-column-mappings/: Yellow Pages has Business Name, Phone, Street Address, City, Rating,
//   Review Count, Years in Business, Website and Sponsored; Justdial and BBB have Business Name, Phone and Address but no
//   Website; BBB has BBB Rating; Yelp has Business Name, Rating, Review Count and Sponsored but no Phone or Website.
// - List tab "Collect more pages" > "Next page", "Stop after", "Choose an item on the page", "Stop and save", "View
//   results": components/scraper/ListTab.tsx, lib/tools/helpTopics.json.
// - "Add contact details", enabled only for a table with a column named Website (D-024,
//   lib/contactEnrichment/addWebsiteContacts.ts); added columns Emails, Website phones, Faxes and social links
//   (lib/utils/resultsTable.ts); emails only from a business's own website (its page and one contact page), checked for
//   shape, not for a working mailbox (lib/contactEnrichment/).
// - Chat's "Add emails and social links" card when the rows have a Website column (D-027, lib/tools/listFollowUps.ts).
// - Bulk scrape > Collect contacts > Use saved data: entrypoints/bulk/main.tsx.
// - Settings > All results "Remove duplicates"; Settings > Shopping sites "Skip sponsored products":
//   components/scraper/ResultsSettingsCards.tsx. Filter rows, rename, delete column, Export as: lib/tools/helpTopics.json.
// - Google Maps in chat: up to 200 businesses per search in 1.3.0, emails in the same run (D-022, D-026, D-031).
export const leadGeneration: UseCasePageContent = {
    page: getPage("lead-generation", "use-case"),
    meta: {
        title: "How to Use Web Scraping for Lead Generation, Free",
        description: "Build a lead list of businesses by type and city from Yellow Pages, Justdial, BBB or another directory, with phone, website and any published email.",
    },
    h1: "How to use web scraping for lead generation",
    intro: "Lead generation means building a list of businesses to contact. Open a business directory in Chrome, collect every listing with Web Scraper Pro, a free extension, and let it read each business's website for an email. You end with a spreadsheet of one business per row.",
    status: "draft",
    lastUpdated: "2026-11-10",
    job: {
        heading: "The list you'd otherwise copy by hand",
        paragraphs: [
            "You need every plumber in Denver, or every dental clinic in Houston, with a way to reach each one. Directories such as Yellow Pages, Justdial and BBB already list them with a phone and an address, and Yellow Pages often lists a website. Any emails are on each business's own site.",
            "Web Scraper Pro collects the directory's listings page after page, inside your Chrome browser. When the table has a Website column, it then visits each business's website for emails and puts everything in one table you can save as an Excel file.",
            "You don't need to write code. You pick the list in the side panel, or type what you want in plain words.",
        ],
    },
    workflow: {
        heading: "From a directory search to a finished spreadsheet",
        intro: "Five steps, from a directory search to a file for your email tool or a client.",
        steps: [
            {
                title: "Open the directory search",
                body: "In Chrome, search the directory for a business type and a place: plumbers in Denver on Yellow Pages, or a service and a city on Justdial. Click the Web Scraper Pro icon to open the side panel, then open its List tab.",
                points: [
                    "Yellow Pages, Justdial, BBB and Yelp have ready-made setups, so the columns come out named, such as Business Name and Phone.",
                    "On other directories, the List tab looks for the lists on the page and names the columns from the page.",
                    "If it doesn't find the listings as one list, click Choose an item on the page, then click one listing. Similar listings are picked with it.",
                ],
                feature: "list-scraper",
                screenshot: "ext/list-tab-yellowpages",
            },
            {
                title: "Collect every page",
                body: "Under the list, choose Collect more pages, then Next page. Set Stop after to the number of pages you want and click Collect. Keep the tab open while it works.",
                points: [
                    "In chat you can type the same thing: collect every page of this list.",
                    "Click Stop and save at any time. What's collected so far is kept.",
                ],
                feature: "list-scraper",
                screenshot: "ext/list-tab-more-pages",
            },
            {
                title: "Add the emails from each website",
                body: "When the collection finishes, click View results. If the table has a column named Website, as Yellow Pages tables do, click Add contact details at the top of the results page. Each business's website and one contact page are read, and new columns fill in on the same rows.",
                points: [
                    "Emails, Website phones, Faxes and a column for each social network found are added.",
                    "If the website column has another name, open the Bulk scrape menu, choose Collect contacts, then Use saved data, and pick the table and that column.",
                    "Some businesses publish no email; those rows keep their phone and website.",
                ],
                feature: "email-extractor",
                screenshot: "ext/results-add-contacts",
            },
            {
                title: "Keep only the rows and columns you need",
                body: "On the results page, click Filter rows to keep the rows you want. Hover a column's name and click the pencil to rename it, or the trash icon to delete it.",
                points: [
                    "Example: keep Business Name, Phone, Website and Emails.",
                    "On Yellow Pages, BBB and Yelp, sponsored listings are marked in a Sponsored column, so you can filter them out.",
                    "To export only some columns, type in chat: download only the name, phone, website and emails as CSV.",
                ],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-filtered-leads",
            },
            {
                title: "Save the file, and collect again next month",
                body: "Click Export as and choose Microsoft Excel, CSV, JSON or Google Sheets. Every collection is kept in History with the time it was saved, so next month you collect the same search again and compare.",
                points: [
                    "Rename the columns to what your sales tool expects before you export a CSV.",
                    "Match on Website or Phone between two collections to see which businesses are new.",
                ],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    sample: {
        caption: "Sample data: invented businesses, with Yellow Pages column names and the Emails column that Add contact details adds.",
        columns: ["Business Name", "Phone", "Website", "Emails"],
        rows: [
            ["Sample Plumbing Co.", "(555) 010-2231", "sampleplumbing.example", "hello@sampleplumbing.example"],
            ["Sample Pipe & Drain", "(555) 010-4410", "samplepipe.example", ""],
            ["Sample Quick Fix Plumbing", "(555) 010-7782", "samplequickfix.example", "info@samplequickfix.example"],
        ],
    },
    sections: [
        {
            id: "sources",
            eyebrow: "Where the lists are",
            heading: "Four sources, and what each one gives you",
            paragraphs: [
                "Every lead list starts from a page that already lists the businesses. These four cover many briefs, and the extension collects all of them the same way: pick the list, collect every page, add the emails.",
            ],
            table: {
                columns: ["Source", "Start from", "What the rows carry", "Watch for"],
                rows: [
                    ["Business directories", "A Yellow Pages, Justdial or BBB search for a category and a place, or another directory with a list", "Name, phone and address; on Yellow Pages also rating, years in business and website; on BBB the BBB Rating", "Justdial and BBB tables have no Website column, so emails need a website list from elsewhere"],
                    ["A list of websites you already have", "A client's spreadsheet of company websites, or the Website column of any saved table", "One row per site with Emails, Website phones and social links", "A site with no published email stays empty; nothing is guessed"],
                    ["Careers pages and job boards", "A company's jobs page, or a job board search", "The roles as a list, with columns named from the page: a company that's hiring is a company that's spending", "Roles only, never candidates"],
                    ["Member and vendor lists", "An association's member directory, a chamber of commerce, an exhibitor or vendor list", "The firms the list shows, often with city and website, with columns named from the page", "A list behind a sign-in comes with terms to read first"],
                ],
                caption: "Whichever source you start from, the result is a table with named columns, so one client's list looks like the next.",
            },
        },
        {
            id: "google-maps",
            eyebrow: "Google Maps",
            heading: "Building the list from Google Maps instead",
            paragraphs: [
                "Web Scraper Pro also collects from Google Maps: a search in chat for a business type in a city collects up to 200 businesses with phone, website, rating and address, and reads each website for emails in the same run. If Google Maps is your only source, [Maps Scraper Pro](https://mapsscraper.pro/) is our separate extension for it, with its own guides for city-by-city lead lists.",
            ],
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "One collection, step by step",
            paragraphs: [
                "Here is a plumbers-in-Denver list from Yellow Pages, from the first search to the export. Your counts will differ by directory, city and trade.",
            ],
            steps: [
                { title: "Search Yellow Pages.", body: "Plumbers in Denver, CO. Open the List tab and click the card for the listings." },
                { title: "Collect 4 pages.", body: "Collect more pages > Next page > Stop after 4 > Collect. The columns come out named, among them Business Name, Phone, Street Address, Rating, Years in Business and Website." },
                { title: "Add contact details.", body: "View results, then Add contact details. A notice shows the progress as each website is read." },
                { title: "Read what you have.", body: "Rows without a website can't get an email, and many small businesses publish none, so expect empty cells in Emails." },
                { title: "Trim and export.", body: "Filter rows to keep the rows you want, filter out the Sponsored rows, then Export as > Microsoft Excel. The collection stays in History." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: [
                "A list is a start, not a campaign. These four moves turn the export into something a client or a sales rep can use.",
            ],
            points: [
                "Calling sheet: keep Business Name, Phone, Rating and Review Count, sort by Review Count, and hand it to whoever makes the calls.",
                "Email campaign: keep the rows with an email, export CSV, and import it into your email tool. Run the addresses through an email checker first; the extension checks their shape, not whether the mailbox works.",
                "Websites to pitch: keep the rows where Website is empty. For an agency that builds websites, that filter is the lead list, and the phone column is how you reach them.",
                "Next month's list: collect the same search again. History keeps both collections with their saved times; match on Website or Phone in your spreadsheet to see who's new.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes to avoid",
            heading: "Six things that waste a run",
            paragraphs: [
                "Many bad lists come from the search, not the extension. Each of these costs time or a client.",
            ],
            points: [
                "One broad category in a big city. Directories limit how many pages a search shows, so a broad search can miss many businesses. Search by neighborhood or zip code and combine the tables.",
                "Expecting an email for every row. Only businesses that publish one on their website get one. Say so to the client before the job, not after.",
                "Sending a campaign without checking the rules. Anti-spam and privacy laws differ by country and by whether you're contacting a business or a person. Read the [plain-words explainer on web scraping and the law](/web-scraping-legal) first.",
                "Closing the tab. The collection happens in your browser; keep the tab open until it's done. Stop and save keeps what it has.",
                "Keeping the sponsored rows. Directories mix paid listings into results; on directories with a Sponsored column, filter them out.",
                "Collecting people instead of businesses. Collect businesses and the contact details they publish. Leave personal profiles out of the brief.",
            ],
        },
    ],
    sites: [{ name: "Yellow Pages", page: "yellow-pages" }, { name: "Justdial", page: "justdial" }, { name: "BBB", page: "bbb" }, { name: "Yelp" }, { name: "Any business directory" }, { name: "Any careers page or member list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Find an email for every business. It finds the emails businesses publish on their own websites. Many small businesses don't publish one, and those rows show the phone and website only.",
            "Check that an email address still works. Run your list through an email checking tool before you send a campaign.",
            "Collect from LinkedIn: it isn't supported. The extension also never signs in to a site for you.",
            "Collect people's personal profiles. Use it for businesses and the contact details they publish.",
        ],
    },
    guides: ["scrape-a-member-directory-into-a-lead-list", "get-emails-from-google-search-results", "collect-job-postings-from-a-careers-page"],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free, with no paid plan, and there's no account to create." },
        { q: "Do I need to know anything technical?", a: "No. You open a directory search, click the list in the side panel, and click a few buttons. There's no code." },
        { q: "How do I use web scraping for lead generation?", a: "Search a business type and a place on a directory, collect the results into a table across every page, and, when the table has a Website column, let the extension read each business's website for emails. Export to Excel or CSV and start calling or writing." },
        { q: "Which directories work?", a: "Yellow Pages, Justdial, BBB and Yelp have ready-made setups. On other directories, the List tab looks for the list on the page and names the columns from the page; if it doesn't find it, Choose an item on the page lets you click one listing. Careers pages and member lists collect the same way." },
        { q: "Can I get an email for every business?", a: "No. The extension finds the emails a business publishes on its own website, and many small businesses publish none. Those rows keep the phone and website from the directory." },
        { q: "How long does it take?", a: "It depends on the number of pages and websites. Listings collect page by page, and each website is read in turn for contact details, so a long list takes longer. The results page shows the progress." },
        { q: "Can I add emails to a list I already have?", a: "Yes. Open the Bulk scrape menu, choose Collect contacts, then Use saved data and pick the table and its website column, or upload a file of websites. Each site is read for emails, phone numbers and social links, one row per site." },
        { q: "Does it remove duplicates?", a: "Yes, while Remove duplicates is on in Settings > All results, which is the default: a business that shows up twice is kept once. For tables you combine from several collections, use your spreadsheet's remove-duplicates on the website or phone column." },
        { q: "Can I export to my sales tool?", a: "Export CSV with the columns your tool expects, renamed on the results page first, then import the CSV into your tool." },
        { q: "Is it legal to use these leads?", a: "The details are what the businesses publish about themselves. Whether you may contact them depends on the anti-spam and privacy laws where you and they are. Check them before a campaign; our explainer on web scraping and the law covers the basics, and it isn't legal advice." },
    ],
};
