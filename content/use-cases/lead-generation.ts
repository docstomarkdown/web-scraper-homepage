import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Arjun, lead-generation agency owner (docs/personas.md), written so a first-time, non-technical reader can
// follow it too. Facts checked against release 1.3.0 on 2026-10-21: Google Maps run with contact details (DECISIONS.md D-022,
// D-026), Bulk Google Maps and contacts (D-023), Add contact details on a saved table (D-024), results page filters and exports
// (lib/tools/arrangeResults.ts, lib/tools/exportDataset.ts). Draft until the workflow screenshots exist.
// Title targets the search phrases "web scraping for lead generation" and "google maps for business lead generation"
// (youtube-research/SEARCH_QUERIES.md, AUTOSUGGEST.md), 2026-10-21.

// Deepened 2026-10-21 (owner: pages too thin): variations table, worked example, next steps, mistakes, ten FAQs. Every
// number comes from the Maps leads page and DECISIONS D-022..D-033; the "half to two thirds with an email" line is an
// estimate (verify against a real run before publishing).
export const leadGeneration: UseCasePageContent = {
    page: getPage("lead-generation", "use-case"),
    meta: {
        title: "How to Use Web Scraping for Lead Generation, Free",
        description: "Build a lead list of local businesses by type and city, with phone, website, email and social links, from Google Maps and business directories. Free Chrome extension, no code."
    },
    h1: "How to use web scraping for lead generation",
    intro: "Type the kind of business and the city into Web Scraper Pro, a free Chrome extension. In a few minutes you have a spreadsheet: one business per row, with its phone number, website and the email from its own site.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The list you'd otherwise copy by hand",
        paragraphs: [
            "You need every dentist in Austin, or every plumber in Denver, with a way to reach each one. The names and phone numbers are on Google Maps, and the emails are on each business's own website. Copying them one by one takes a day.",
            "Web Scraper Pro does it for you, inside your Chrome browser. It collects the businesses from Google Maps, visits each business's website for the email, and puts everything in one table you can save as an Excel file.",
            "You don't need to know anything technical. You type what you want in plain words, and you watch the rows appear.",
        ],
    },
    workflow: {
        heading: "From one search to a finished spreadsheet",
        intro: "Five steps. The first three take about ten minutes for a hundred businesses.",
        steps: [
            {
                title: "Type the business type and the city",
                body: "Click the Web Scraper Pro icon in Chrome. A panel opens on the right side of the browser. In the Chat tab, type a sentence like the one below and press Enter.",
                points: ["Example: Find dentists in Austin", "A card asks how many businesses you want: 20, 50, 100 or 200. Pick one and click Start.", "Emails are collected too, unless you turn that off in Settings."],
                feature: "maps-leads",
                screenshot: "ext/chat-maps-count-card",
            },
            {
                title: "Watch the businesses and emails arrive",
                body: "Google Maps opens in a new tab and the extension works through the results on its own. For each business it also reads the business's website and contact page. You can stop at any time and keep what it has found.",
                points: ["The panel counts the businesses as they come in, and how many have an email.", "Fifty businesses take about four minutes. Two hundred take about fifteen.", "Some businesses never publish an email. Those rows still have the phone number and the website."],
                feature: "email-extractor",
                screenshot: "ext/chat-maps-progress",
            },
            {
                title: "Keep only the columns and rows you need",
                body: "When the run finishes, click View results. The table opens in a new tab with one business per row. Tell it what to keep, in plain words, in the same chat.",
                points: ["Example: Only name, phone, email and website, rows with an email", "Columns you didn't name are hidden. Rows without an email are hidden too.", "You can also click a column's name to rename it, or the trash icon to remove it."],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-filtered-leads",
            },
            {
                title: "Do the same for more cities",
                body: "Searched Austin and want Dallas and Houston too? Run a search for each city, and chat offers to combine the searches into one table. For ten or more cities, paste the Google Maps search links into Bulk scrape and they run one after another.",
                feature: "bulk-scraper",
            },
            {
                title: "Save the file",
                body: "Click Export as and choose Excel, CSV, or Google Sheets. The file opens with your columns, ready for your email tool or for a client. Every list is kept in History, so next month you can run it again and see what's new.",
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    sample: {
        caption: "This is what three rows look like after you save the file.",
        columns: ["Business Name", "Phone", "Website", "Email"],
        rows: [
            ["Bright Smile Dental", "(555) 010-2231", "brightsmile.example", "hello@brightsmile.example"],
            ["Lakeside Dentistry", "(555) 010-4410", "lakeside-dental.example", ""],
            ["Northside Orthodontics", "(555) 010-7782", "northside.example", "info@northside.example"],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Four shapes the same job takes",
            paragraphs: [
                "The brief changes from client to client, but every version is a Google Maps or directory run plus the contact details from each business's website. The table shows where to start and what changes.",
                "Whichever shape it takes, the result is the same kind of table, so one client's list looks like the next.",
            ],
            table: {
                columns: ["Variation", "Start from", "What changes"],
                rows: [
                    ["One trade, one city", "Chat: Find dentists in Austin", "One run, up to 200 businesses, emails in the same run."],
                    ["One trade, ten cities", "Bulk scrape with one Google Maps search link per city", "Each search runs in turn; View merged table puts them together with a Source URL column."],
                    ["Every trade in one town", "One search per business type, then Combine in chat", "Chat merges the conversation's searches into one table from a card."],
                    ["A directory instead of Google Maps", "Yellow Pages, Justdial or BBB in the List tab", "Collect the pages, then Add contact details on the results page for emails."],
                    ["Emails for a list you already have", "The Website column of any saved table, or a client's CSV in Bulk scrape → Collect contacts", "Each site is read for emails, phones and social links; nothing else changes."],
                ],
                caption: "The side panel keeps collecting until Google Maps reaches the end of its results; chat stops at the count you chose.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "One run, with the numbers",
            paragraphs: [
                "Here is a dentists-in-Austin run from start to export, with the counts and times the extension gives you. Your numbers will differ by city and trade, but the shape holds.",
            ],
            steps: [
                { title: "Type the search.", body: "In the Chat tab: Find dentists in Austin. The card asks how many; choose 100 and leave contact details on." },
                { title: "Wait about eight minutes.", body: "Fifty businesses with emails take about four minutes, so a hundred takes about eight. The panel counts the businesses and how many have an email as they arrive." },
                { title: "Read the counts.", body: "A typical result: 100 rows, every one with a name, address and phone; most with a website; roughly half to two thirds with an email, because many small businesses publish none." },
                { title: "Trim the table.", body: "Type: Only name, phone, website and email, rows with an email. The hidden rows are still in the collection; the export holds what you see." },
                { title: "Export.", body: "Export as → Excel. The file has one business per row with the four columns, prices and ratings saved as numbers, and the run stays in History under its search." },
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
                "Next month's list: run the same search again. History keeps both runs with their dates; match on the Map URL column in your spreadsheet to see who's new.",
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
                "One broad search in a big city. Google Maps shows a limited number of results per search, so \"plumbers in Los Angeles\" misses most of them. Search by neighbourhood or zip code and merge.",
                "Expecting an email for every row. Only businesses that publish one on their website get one. Say so to the client before the job, not after.",
                "Sending a campaign without checking the rules. Anti-spam and privacy laws differ by country and by whether you're contacting a business or a person. Read the plain-words explainer on web scraping and the law first.",
                "Closing the tab. The run happens in your browser; keep the tab in front until the panel says it's done. Stop keeps what it has.",
                "Treating rounded counts as exact. Review counts on a card are what the card shows. Open the listing for the exact number if a client needs it.",
                "Collecting people instead of businesses. The extension collects businesses and the contact details they publish. Leave personal profiles out of the brief.",
            ],
        },
    ],
    sites: [{ name: "Google Maps", page: "maps" }, { name: "Yellow Pages", page: "yellow-pages" }, { name: "Justdial", page: "justdial" }, { name: "BBB", page: "bbb" }, { name: "Any business directory" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Find an email for every business. It finds the emails businesses publish on their own websites. Many small businesses don't publish one, and those rows show the phone and website only.",
            "Check that an email address still works. Run your list through an email checking tool before you send a campaign.",
            "Collect from LinkedIn, Facebook or any site you have to sign in to see.",
            "Collect people's personal details. It collects businesses and the contact details they publish.",
        ],
    },
    guides: ["get-local-business-leads-from-maps", "get-maps-leads-with-emails", "get-emails-from-a-list-of-websites"],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free to install and use. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "Do I need to know anything technical?", a: "No. You type what you want, such as \"find dentists in Austin\", and click a few buttons. There is nothing to set up and no code." },
        { q: "How do I use web scraping for lead generation?", a: "Search a business type and a city on Google Maps or a directory, collect the results into a table, and let the extension read each business's website for its email. Export to Excel or CSV and start calling or writing." },
        { q: "How many businesses can I collect in one go?", a: "Up to 200 per search in chat. From the side panel it keeps going until Google Maps reaches the end. For more, search smaller areas or more specific business types, and combine the results." },
        { q: "How long does it take?", a: "About four minutes for 50 businesses with emails, and about fifteen minutes for 200. Without emails it's a minute or two." },
        { q: "Can I add emails to a list I already have?", a: "Yes. Any saved list with a Website column gets an Add contact details button on its results page. Click it and the emails, phone numbers and social links fill in." },
        { q: "Can I get leads from Yellow Pages or another directory?", a: "Yes. Yellow Pages, Justdial and BBB have ready-made columns; other directories are detected as lists. Collect the pages, then click Add contact details for the emails." },
        { q: "Does it remove duplicates?", a: "Yes. A business that appears twice while the list scrolls is kept once, matched on its map link. For lists you combine from several runs, Remove duplicates on the results page does the same." },
        { q: "Can I export to my sales tool?", a: "Export CSV with the columns your tool expects, renamed on the results page first. Most sales and email tools import a CSV directly." },
        { q: "Is it legal to use these leads?", a: "The details are what the businesses publish about themselves. Whether you may contact them depends on the anti-spam and privacy laws where you and they are. Check them before a campaign; our guide to the law explains the basics, and it isn't legal advice." },
    ],
};
