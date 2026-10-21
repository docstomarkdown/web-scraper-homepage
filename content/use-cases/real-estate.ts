import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Maria, real estate professional or investor (docs/personas.md), written so a first-time reader can follow.
// Facts checked against release 1.3.0 on 2026-10-21: the zillow.com, rightmove.co.uk, redfin.com, zoopla.co.uk and
// propertyfinder.ae packs and their column mappings; results page filters and exports. Never imply days on market, price
// history, agent contact details or MLS data: none come from a results card. Draft until the screenshots exist.
// Title targets the search phrases "how to scrape real estate data" and "scrape real estate websites"
// (youtube-research/SEARCH_QUERIES.md), 2026-10-21.

// Deepened 2026-10-21 (owner: pages too thin): variations, a worked example (the 94-home count is an illustration;
// the four-page timing is from the list-scraper facts), next steps, mistakes, ten FAQs. Rightmove's Agent Phone column and
// Zillow's caps come from content/scrapers/{rightmove,zillow}.ts.
export const realEstate: UseCasePageContent = {
    page: getPage("real-estate", "use-case"),
    meta: {
        title: "How to Scrape Real Estate Data into a Spreadsheet, No Code",
        description: "Scrape homes for sale or rent from Zillow, Rightmove, Redfin, Zoopla and Property Finder into one spreadsheet: price, address, beds, baths, size and link, for every page of results. Free Chrome extension."
    },
    h1: "How to scrape real estate data into a spreadsheet",
    intro: "Search a zip code or a town on your listing site and click once in Web Scraper Pro, a free Chrome extension. You get one home per row with the price, address, beds, baths, size and link, for every page of results. Run it again next week and see what's new.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The area's inventory, without copying it by hand",
        paragraphs: [
            "You're sizing up a new area, keeping a weekly list of new listings or rentals, or pulling the comparables for a report. The data services are priced for big firms. The listings themselves are on the public sites, spread over twenty pages of cards.",
            "Web Scraper Pro turns a search on Zillow, Rightmove, Redfin, Zoopla or Property Finder into one table with the same columns every time, inside your Chrome browser. Next week's run is the same click, and History keeps both so you can see what changed.",
            "You don't need to know anything technical. You search the way you always do, then click Collect.",
        ],
    },
    workflow: {
        heading: "From a search to this week's sheet",
        intro: "Five steps. A 20-page search takes about three minutes.",
        steps: [
            {
                title: "Search the area with your filters",
                body: "On the listing site, search the zip code, town or drawn area and set the filters you'd use anyway: price, beds, home type, for sale or for rent. The extension collects what the list shows, so the filters do the narrowing.",
                points: ["Zillow shows at most 20 pages, about 800 homes, per search. For a big city, search one zip code at a time.", "Rightmove shows up to 42 pages per search."],
                feature: "list-scraper",
            },
            {
                title: "Collect every page",
                body: "Click the Web Scraper Pro icon in Chrome; a panel opens on the right, and in the List tab the homes show as a list with a count. Click it, choose Collect more pages, and click Collect from N pages. Keep the tab in front while it runs.",
                points: ["On Zillow the extension scrolls the list for you first, so every card loads before it reads them.", "You get one row per home: Address, Price, Beds, Baths, Sq Ft, Listing Type, who listed it and the link.", "If the site asks you to confirm you're human, do it in the tab and collect again."],
                feature: "list-scraper",
                screenshot: "ext/results-zillow",
            },
            {
                title: "Keep what the report needs",
                body: "When the run finishes, click View results. The table opens in a new tab. Remove the columns you don't want with the trash icon, or tell it what to keep in plain words in the panel's chat.",
                points: ["Example to type: Only address, price, beds, baths and sq ft, under 400000, sorted by price", "Click Filter rows to keep homes by a value, such as 3 or more beds."],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-arranged",
            },
            {
                title: "Save the file",
                body: "Click Export as and choose Google Sheets for a shared sheet, Excel for a report, or CSV for your own tools. Prices and sizes are saved as numbers, so price per square foot is one formula away.",
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
            {
                title: "Run it again next week",
                body: "Run the same search again. Each collection is saved in History with its date. Match rows on the listing link, or on Zillow's property id, and the new and the reduced homes stand out.",
                points: ["Scheduled runs that do this on their own are coming with the cloud. Today it's one click when you want fresh rows."],
                feature: "export-to-google-sheets",
            },
        ],
    },
    sample: {
        caption: "This is what three rows look like after you save the file.",
        columns: ["Address", "Price", "Beds", "Baths", "Sq Ft"],
        rows: [
            ["101 Main St, Springfield", "325,000", "3", "2", "1,640"],
            ["42 Lake Rd, Springfield", "289,900", "2", "2", "1,210"],
            ["7 Oak Ave, Springfield", "1,450 /mo", "2", "1", "980"],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Four shapes the same job takes",
            paragraphs: [
                "Whether you're pricing one street or tracking a county, every version is a search on the listing site plus one collection in the List tab. The table shows where to start and what changes.",
            ],
            table: {
                columns: ["Variation", "Start from", "What changes"],
                rows: [
                    ["Comparables for a report", "One zip code with your price and beds filters, for sale", "One run of up to 20 pages on Zillow; Price and Sq Ft come as numbers, so price per square foot is a formula."],
                    ["This week's new listings", "The same search as last week", "Run it again; History keeps both with their dates. Match on Zillow Property ID or the listing link to see what's new or reduced."],
                    ["Rentals in an area", "Switch the search to for rent", "Same columns; the Price column holds the monthly rent."],
                    ["A whole city", "One search per zip code, pasted into Bulk scrape", "Each search runs in turn; View merged table puts them together with a Source URL column."],
                    ["A site without a ready-made setup", "Any listing site's results page in the List tab", "The columns are named from the page's own labels; check the first page before a long run."],
                ],
                caption: "Zillow shows at most 20 pages, about 800 homes, per search; Rightmove shows up to 42 pages.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "One zip code, with the numbers",
            paragraphs: [
                "Here is a for-sale search in one zip code from search to export, with the counts the extension gives you. The times depend on how many pages the site has for your filters.",
            ],
            steps: [
                { title: "Search with the filters you'd use anyway.", body: "On Zillow: one zip code, for sale, $250,000 to $450,000, 3+ beds. The page says how many homes match; say 94 across 4 pages." },
                { title: "Collect every page.", body: "Open the List tab, pick the results list, choose Collect more pages and set Stop after to All pages. Zillow's list panel is scrolled for you so every card loads. Four pages take about a minute." },
                { title: "Read the table.", body: "94 rows with Address, Price, Beds, Baths, Sq Ft, Lot Size, Listing Type, Listed By, Badges, Zillow Property ID, Property URL and Image URL. Lot Size is empty for the condos; Badges show New or Price cut where the card did." },
                { title: "Trim it.", body: "Type in chat: Only address, price, beds, baths and sq ft, sorted by price. Or click Filter rows and keep Beds of 4 or more." },
                { title: "Export.", body: "Export as → Excel. Add one column, Price divided by Sq Ft, and the comparables sort themselves. The run stays in History under its search." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: [
                "The export is the inventory; the report is what you do with it. Four moves that take minutes in a spreadsheet.",
            ],
            points: [
                "Price per square foot: Price and Sq Ft are numbers, so one formula gives it for every row. Sort by it to find the outliers.",
                "What changed since last week: keep last week's export, match the two on Zillow Property ID or the listing link, and mark rows that are new, gone or cheaper.",
                "Rentals next to sales: run the same zip code for rent, export, and put the two sheets side by side for a gross yield column.",
                "Share with a client: Export as → Google Sheets for a sheet you can share, or Excel for a file to attach. Hide Image URL and Property URL first if the client doesn't need them.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes to avoid",
            heading: "Five things that waste a run",
            paragraphs: [
                "Each of these shows up as a sheet that looks right and isn't.",
            ],
            points: [
                "One search for a whole city. Zillow caps a search at 20 pages, so a city search misses most homes. Search by zip code or price band and merge.",
                "Expecting days on market, price history or the agent's phone. A results card doesn't show them, so they aren't collected. Open a listing and use the Properties tab for what its page shows, one home at a time.",
                "Reading rent as price. Rentals come through as shown, such as $1,450/mo, in the Price column. Keep sales and rentals in separate runs.",
                "Closing the tab mid-run. The run happens in your browser; keep the tab in front. If the site asks you to confirm you're human, do it in the tab and collect again.",
                "Reusing the data beyond your own research. Listing sites' terms restrict automated collection and reuse. Collect for your own analysis and check the terms before anything goes to a third party.",
            ],
        },
    ],
    sites: [{ name: "Zillow", page: "zillow" }, { name: "Rightmove", page: "rightmove" }, { name: "Redfin" }, { name: "Zoopla" }, { name: "Property Finder" }, { name: "Any listing site with a results list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Give you days on market, price history or the listing agent's phone number. A results card doesn't show them, so they aren't collected. Some are on the listing page, which the Properties tab reads one home at a time.",
            "Reach private MLS data. It collects what the public site shows you, or what you can see once you're signed in to a site that lets you export.",
            "Watch an area and email you the new listings. Scheduled runs are coming with the cloud; today you run it when you want fresh rows.",
            "Settle whether you may reuse the data. Listing sites' terms restrict automated collection; collect for your own research and check them first.",
        ],
    },
    guides: ["export-zillow-listings-to-excel", "collect-every-page-of-results", "scrape-data-from-any-website-to-excel"],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free to install and use today, with every feature included and no account to create." },
        { q: "Do I need to know anything technical?", a: "No. You search the site the way you always do, open the panel, and click Collect. There is nothing to set up and no code." },
        { q: "How do I scrape real estate data without coding?", a: "Search the area on your listing site, open the List tab, pick the results list and choose Collect more pages. One row per home comes back with price, address, beds, baths and size, and Export as saves it to Excel." },
        { q: "Which listing sites have ready-made columns?", a: "Zillow, Rightmove, Redfin, Zoopla and Property Finder. On other sites the results list is found on the page and the columns are named from its labels." },
        { q: "How many listings can one search give me?", a: "As many as the site shows: Zillow up to 20 pages, about 800 homes; Rightmove up to 42 pages. For more, split the search by zip code or price band." },
        { q: "Can I get rentals?", a: "Yes. Switch the search to rentals and the same columns fill in, with the monthly rent in the Price column." },
        { q: "Can I get the listing agent's phone number?", a: "On Rightmove the card shows the branch and its phone, so yes. On Zillow the card shows who listed it, not a phone; open the listing and use the Properties tab for what its page shows." },
        { q: "Can I see which listings are new since last week?", a: "Run the same search again. Each run is saved in History with its date; match the two exports on Zillow Property ID or the listing link, and the new and reduced homes stand out." },
        { q: "Does it work on a site I sign in to, like an MLS?", a: "It can read what you see once you're signed in, because it runs in your own browser. Whether you may export it is set by that system's rules; check them first." },
        { q: "Is scraping Zillow allowed?", a: "Zillow's terms restrict automated collection and reuse of its data. Collect for your own research at a person's pace, keep it to the public listings, and read our plain-words explainer on web scraping and the law. It isn't legal advice." },
    ],
};
