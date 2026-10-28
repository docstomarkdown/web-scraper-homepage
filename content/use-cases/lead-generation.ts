import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Arjun, lead-generation agency owner (docs/personas.md), written so a first-time, non-technical reader can
// follow it too. Rewritten 2026-10-28 around the sources this site owns: business directories, a list of websites,
// careers pages and member lists. Google Maps gets one paragraph that points at mapsscraper.pro, which covers Maps only.
// Facts checked against release 1.3.0 on 2026-10-28: the List tab's list detection and paging (Collect more pages →
// Next page, Stop after); the results page's Add contact details button, enabled only for a table with a column named
// Website (DECISIONS.md D-024, lib/contactEnrichment/addWebsiteContacts.ts namedWebsiteColumn); chat's "every page"
// run and its "Add emails and social links" card when the rows have a Website column (D-027); Bulk scrape → Collect
// contacts → Use saved data over any saved table's URL column; the Yellow Pages column mapping names a Website column
// (configs-prod/site-column-mappings/yellowpages.com.json), Justdial's and BBB's do not. The "half to two thirds with an
// email" line is an estimate: verify against a real run before publishing. Draft until the workflow screenshots exist.
// Title targets "web scraping for lead generation" (youtube-research/SEARCH_QUERIES.md, AUTOSUGGEST.md), 2026-10-21.
export const leadGeneration: UseCasePageContent = {
    page: getPage("lead-generation", "use-case"),
    meta: {
        title: "How to Use Web Scraping for Lead Generation, Free",
        description: "Build a lead list of businesses by type and city from Yellow Pages, Yelp, Justdial, BBB or any directory, with phone, website, email and social links. Free Chrome extension, no code.",
    },
    h1: "How to use web scraping for lead generation",
    intro: "Lead generation means building a list of businesses to contact. Open a business directory in Chrome, collect every listing with Web Scraper Pro, a free extension, and let it read each business's website for its email. In under an hour you have a spreadsheet with one business per row.",
    status: "draft",
    lastUpdated: "2026-10-28",
    job: {
        heading: "The list you'd otherwise copy by hand",
        paragraphs: [
            "You need every plumber in Denver, or every dental clinic in Houston, with a way to reach each one. Directories such as Yellow Pages, Yelp, Justdial and BBB already list them with a phone, an address and often a website. The emails are on each business's own site. Copying them one by one takes a day.",
            "Web Scraper Pro does it for you, inside your Chrome browser. It collects the directory's listings page after page, then visits each business's website for the email, and puts everything in one table you can save as an Excel file.",
            "You don't need to know anything technical. You pick the list in a side panel, or type what you want in plain words, and you watch the rows appear.",
        ],
    },
    workflow: {
        heading: "From a directory search to a finished spreadsheet",
        intro: "Five steps. The first three take about fifteen minutes for a hundred businesses, most of it waiting.",
        steps: [
            {
                title: "Open the directory search",
                body: "In Chrome, search the directory for a business type and a place: plumbers in Denver on Yellow Pages, or a service and a city on Justdial. Click the Web Scraper Pro icon. A panel opens on the right side of the browser; open its List tab.",
                points: [
                    "Yellow Pages, Justdial and BBB have ready-made columns, so Business Name, Phone, Address and the rest come out named.",
                    "On Yelp or any other directory, the extension finds the lists on the page and names the columns from what the cards show.",
                    "Wrong list? Click Choose an item on the page, then click one listing. Every similar listing is picked with it.",
                ],
                feature: "list-scraper",
                screenshot: "ext/list-tab-yellowpages",
            },
            {
                title: "Collect every page",
                body: "Under the list, choose Collect more pages and confirm Next page. Set Stop after to the number of pages you want and click Collect. The table fills page by page; keep the tab in front while it works.",
                points: [
                    "A Yellow Pages page holds about 30 listings, so 4 pages is about a hundred businesses.",
                    "In the Chat tab you can type the same thing: Collect every plumber in this list.",
                    "Click Stop at any time. What's collected so far is kept.",
                ],
                feature: "list-scraper",
                screenshot: "ext/list-tab-more-pages",
            },
            {
                title: "Add the emails from each website",
                body: "When the run finishes, click View results. If the table has a column named Website, as Yellow Pages tables do, click Add contact details at the top of the results page. Each business's website and its Contact or About page are read, and new columns fill in on the same rows.",
                points: [
                    "Emails, Website phones, Faxes and one column per social network are added.",
                    "If the website column has another name, open Bulk scrape → Collect contacts → Use saved data and pick the table and that column.",
                    "About four minutes per 50 websites. Some businesses never publish an email; those rows keep their phone and website.",
                ],
                feature: "email-extractor",
                screenshot: "ext/results-add-contacts",
            },
            {
                title: "Keep only the rows and columns you need",
                body: "On the results page, click Filter rows to keep the rows with an email, or with a phone, depending on how you'll reach them. Click a column's name to rename it, or the trash icon to remove it. Remove duplicates takes out a business listed twice.",
                points: [
                    "Example: keep Business Name, Phone, Website and Emails, and the rows where Emails is not empty.",
                    "Sponsored rows are marked, so you can filter them out.",
                    "In chat you can say it instead: Only name, phone, website and emails, rows with an email.",
                ],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-filtered-leads",
            },
            {
                title: "Save the file, and run it again next month",
                body: "Click Export as and choose Excel, CSV or JSON. The file opens with your columns, ready for your email tool or a client. Every list is kept in History, so next month you run the same search again and compare.",
                points: [
                    "Export CSV with the columns your sales tool expects, renamed first.",
                    "Match on Website or Phone between two runs to see which businesses are new.",
                ],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    sample: {
        caption: "This is what three rows look like after you save the file.",
        columns: ["Business Name", "Phone", "Website", "Emails"],
        rows: [
            ["Sample Plumbing Co.", "(555) 010-2231", "sampleplumbing.example", "hello@sampleplumbing.example"],
            ["Riverside Pipe & Drain", "(555) 010-4410", "riversidepipe.example", ""],
            ["Quick Fix Plumbing", "(555) 010-7782", "quickfixplumbing.example", "info@quickfixplumbing.example"],
        ],
    },
    sections: [
        {
            id: "sources",
            eyebrow: "Where the lists are",
            heading: "Four sources, and what each one gives you",
            paragraphs: [
                "Every lead list starts from a page that already lists the businesses. These four cover most briefs, and the extension collects all of them the same way: pick the list, collect every page, add the emails.",
            ],
            table: {
                columns: ["Source", "Start from", "What the rows carry", "Watch for"],
                rows: [
                    ["Business directories", "A Yellow Pages, Justdial or BBB search for a category and a place; Yelp or any other directory with a list", "Name, phone, address, rating and often the website; years in business on Yellow Pages, the bureau's grade on BBB", "Sponsored rows, marked so you can filter them; Yelp stops after about 24 pages"],
                    ["A list of websites you already have", "A client's spreadsheet of company websites, or the Website column of any saved table", "One row per site with Emails, Website phones and social links", "A site with no published email stays empty; nothing is guessed"],
                    ["Careers pages and job boards", "A company's jobs page, or a job board search", "Role, location, department and link: a company that's hiring is a company that's spending", "Roles only, never candidates"],
                    ["Member and vendor lists", "An association's member directory, a chamber of commerce, an exhibitor or vendor list", "Firm, city and website: the right businesses, verified by the body", "A list behind a sign-in comes with terms to read first; the extension never signs in for you"],
                ],
                caption: "Whichever source you start from, the result is the same kind of table, so one client's list looks like the next.",
            },
        },
        {
            id: "google-maps",
            eyebrow: "Google Maps",
            heading: "Building the list from Google Maps instead",
            paragraphs: [
                "Web Scraper Pro also collects from Google Maps: a search for a business type in a city returns every business with phone, website, rating and address, with the emails from each website in the same run. If Google Maps is your only source, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only, with its own guides for city-by-city lead lists, emails and phone numbers.",
            ],
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "One run, with the numbers",
            paragraphs: [
                "Here is a plumbers-in-Denver run on Yellow Pages from the first search to the export, with the counts and times the extension gives you. Your numbers will differ by directory, city and trade, but the shape holds.",
            ],
            steps: [
                { title: "Search Yellow Pages.", body: "Plumbers in Denver, CO. Open the List tab; the listings card shows about 30 items on this page." },
                { title: "Collect 4 pages.", body: "Collect more pages → Next page → Stop after 4 → Collect. About 120 rows arrive in a few minutes, with Business Name, Phone, Address, Rating, Years in Business and Website named." },
                { title: "Add contact details.", body: "View results, then Add contact details. About ten minutes for 120 websites; the notice counts the sites read and how many gave an email." },
                { title: "Read the counts.", body: "Every row has a name, phone and address; most have a website; roughly half to two thirds have an email, because many small businesses publish none." },
                { title: "Trim and export.", body: "Filter rows to keep Emails not empty, remove the Sponsored rows, then Export as → Excel. The run stays in History under its search." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: [
                "A list is a start, not a campaign. These four moves turn the export into something a client or a sales rep can use the same day.",
            ],
            points: [
                "Calling sheet: keep Business Name, Phone, Rating and Review Count, sort by Review Count, and hand it to whoever makes the calls. The best-established businesses are at the top.",
                "Email campaign: Filter rows to keep rows with an email, export CSV, and import it into your email tool. Run the addresses through an email checker first; the extension doesn't verify them.",
                "Websites to pitch: Filter rows where Website is empty. For an agency that builds websites, that filter is the lead list, and the phone column is how you reach them.",
                "Next month's list: run the same search again. History keeps both runs with their dates; match on Website or Phone in your spreadsheet to see who's new.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes to avoid",
            heading: "Six things that waste a run",
            paragraphs: [
                "Most bad lists come from the search, not the extension. Each of these costs an hour or a client.",
            ],
            points: [
                "One broad category in a big city. Directories cap how many pages a search shows, so \"plumbers in Los Angeles\" misses most of them. Search by neighbourhood or zip code and combine the tables.",
                "Expecting an email for every row. Only businesses that publish one on their website get one. Say so to the client before the job, not after.",
                "Sending a campaign without checking the rules. Anti-spam and privacy laws differ by country and by whether you're contacting a business or a person. Read the [plain-words explainer on web scraping and the law](/web-scraping-legal) first.",
                "Closing the tab. The run happens in your browser; keep the tab in front until the panel says it's done. Stop keeps what it has.",
                "Keeping the sponsored rows. Directories mix paid listings into results; they're marked Sponsored so you can filter them out, or skip them in Settings → Results.",
                "Collecting people instead of businesses. The extension collects businesses and the contact details they publish. Leave personal profiles out of the brief.",
            ],
        },
    ],
    sites: [{ name: "Yellow Pages", page: "yellow-pages" }, { name: "Justdial", page: "justdial" }, { name: "BBB", page: "bbb" }, { name: "Yelp" }, { name: "Any business directory" }, { name: "Any careers page or member list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Find an email for every business. It finds the emails businesses publish on their own websites. Many small businesses don't publish one, and those rows show the phone and website only.",
            "Check that an email address still works. Run your list through an email checking tool before you send a campaign.",
            "Collect from LinkedIn, Facebook or any site you have to sign in to see.",
            "Collect people's personal details. It collects businesses and the contact details they publish.",
        ],
    },
    guides: ["collect-business-listings-from-yellow-pages", "scrape-yelp-business-listings", "get-emails-from-a-list-of-websites", "collect-job-postings-from-a-careers-page"],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free to install and use. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "Do I need to know anything technical?", a: "No. You open a directory search, click the list in the side panel, and click a few buttons. There is nothing to set up and no code." },
        { q: "How do I use web scraping for lead generation?", a: "Search a business type and a place on a directory, collect the results into a table across every page, and let the extension read each business's website for its email. Export to Excel or CSV and start calling or writing." },
        { q: "Which directories work?", a: "Yellow Pages, Justdial and BBB have ready-made columns. Yelp and any other directory with a list are detected on the page, with columns named from what the cards show. Careers pages and member lists collect the same way." },
        { q: "Can I get an email for every business?", a: "No. The extension finds the emails a business publishes on its own website, and many small businesses publish none. Those rows keep the phone and website from the directory." },
        { q: "How long does it take?", a: "A hundred listings collect in a few minutes. Adding emails takes about four minutes per 50 websites, so a hundred businesses with emails is about fifteen minutes from the first click." },
        { q: "Can I add emails to a list I already have?", a: "Yes. Open Bulk scrape → Collect contacts → Use saved data and pick the table and its website column, or upload a CSV of websites. Each site is read for emails, phone numbers and social links, one row per site." },
        { q: "Does it remove duplicates?", a: "A business that appears twice while the list pages through is kept once. For tables you combine from several runs, click Remove duplicates on the results page." },
        { q: "Can I export to my sales tool?", a: "Export CSV with the columns your tool expects, renamed on the results page first. Most sales and email tools import a CSV directly." },
        { q: "Is it legal to use these leads?", a: "The details are what the businesses publish about themselves. Whether you may contact them depends on the anti-spam and privacy laws where you and they are. Check them before a campaign; our explainer on web scraping and the law covers the basics, and it isn't legal advice." },
    ],
};
