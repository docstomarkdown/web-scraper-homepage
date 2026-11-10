import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Maria, real estate professional or investor (docs/personas.md), written so a first-time reader can follow.
// Never imply days on market, price history or MLS data: none come from a results card.
// Title targets the search phrases "how to scrape real estate data" and "scrape real estate websites"
// (youtube-research/SEARCH_QUERIES.md), 2026-10-21.
//
// Facts checked against chrome-extension-source on 2026-11-10 (no real run; sample rows are invented):
// - Setups for Zillow, Rightmove, Redfin, Zoopla and Property Finder: configs-prod/{zillow.com,rightmove.co.uk,redfin.com,
//   zoopla.co.uk,propertyfinder.ae}.json.
// - Zillow list columns Address, Property URL, Zillow Property ID, Price, Beds, Baths, Sq Ft, Lot Size, Listing Type,
//   Listed By, Badges, Image URL: configs-prod/site-column-mappings/zillow.com.json. Rightmove: Price, Address, Property
//   Type, Bedrooms, Bathrooms, Added / Reduced, Marketed By, Agent Phone: site-column-mappings/rightmove.co.uk.json.
//   Redfin, Zoopla and Property Finder name their own columns (Beds or Bedrooms, Sq Ft, Floor Area, Area):
//   site-column-mappings/{redfin.com,zoopla.co.uk,propertyfinder.ae}.json.
// - Zillow's list panel is scrolled before reading so every card loads: lib/platform/hooks/zillow.ts.
// - List tab "Collect more pages", "Stop after" (or All pages), "Collect from N pages", "Stop and save", "Choose an item on
//   the page": components/scraper/ListTab.tsx. Bulk scrape list mode and "View merged table": lib/bulk/executors/
//   listBulkExecutor.ts, entrypoints/bulk/main.tsx. Filter rows, delete column, Export as: lib/tools/helpTopics.json.
// - Scheduled runs not live (cloudLaunched false in config/products.mjs).
export const realEstate: UseCasePageContent = {
    page: getPage("real-estate", "use-case"),
    meta: {
        title: "How to Scrape Real Estate Data into a Spreadsheet, No Code",
        description: "Collect homes for sale or rent from Zillow, Rightmove, Redfin, Zoopla or Property Finder into a spreadsheet: price, address, beds, baths, size and link."
    },
    h1: "How to scrape real estate data into a spreadsheet",
    intro: "Search a zip code or a town on your listing site and collect the results with Web Scraper Pro, a free Chrome extension. You get one home per row with the price, address, beds, baths, size and link, across the pages you choose. Collect again next week and see what's new.",
    status: "draft",
    lastUpdated: "2026-11-10",
    job: {
        heading: "The area's inventory, without copying it by hand",
        paragraphs: [
            "You're sizing up a new area, keeping a weekly list of new listings or rentals, or pulling the comparables for a report. The listings are on the public sites, spread over many pages of cards.",
            "Web Scraper Pro turns a search on Zillow, Rightmove, Redfin, Zoopla or Property Finder into a table with the same columns every time, inside your Chrome browser. Next week you collect the same search again, and History keeps both so you can see what changed.",
            "You don't need to write code. You search the way you always do, then collect.",
        ],
    },
    workflow: {
        heading: "From a search to this week's sheet",
        intro: "Five steps, from a search with your filters to a sheet you can compare next week.",
        steps: [
            {
                title: "Search the area with your filters",
                body: "On the listing site, search the zip code, town or drawn area and set the filters you'd use anyway: price, beds, home type, for sale or for rent. The extension collects what the list shows, so the filters do the narrowing.",
                points: ["Listing sites show a limited number of result pages per search. For a big city, search one zip code at a time."],
                feature: "list-scraper",
            },
            {
                title: "Collect every page",
                body: "Click the Web Scraper Pro icon in Chrome to open the side panel. In the List tab, the homes show as a list with a count; click it, choose Collect more pages, and click Collect from 5 pages (or the number you set under Stop after). Keep the tab open while it runs.",
                points: [
                    "On Zillow the extension scrolls the list panel first, so every card loads before it reads them.",
                    "On Zillow you get one row per home with Address, Price, Beds, Baths, Sq Ft, Listing Type, Listed By and Property URL, among other columns.",
                    "If the site asks you to confirm you're human, click Stop and save, complete the check in the tab, and collect again.",
                ],
                feature: "list-scraper",
                screenshot: "ext/results-zillow",
            },
            {
                title: "Keep what the report needs",
                body: "When the collection finishes, click View results. The table opens in a new tab. Delete the columns you don't want with the trash icon, or click Filter rows to keep the homes you want.",
                points: ["To export only some columns, type in chat: download only the address, price, beds, baths and sq ft as Excel."],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-arranged",
            },
            {
                title: "Save the file",
                body: "Click Export as and choose Google Sheets for a shared sheet, Microsoft Excel for a report, or CSV for your own tools. Add a column for price per square foot in your spreadsheet.",
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
            {
                title: "Collect again next week",
                body: "Collect the same search again. Each collection is saved in History with the time it was saved. Match rows on the listing link, or on Zillow Property ID, and the new and reduced homes stand out.",
                points: ["Scheduled runs that do this on their own are coming soon. Today you collect again when you want fresh rows."],
                feature: "export-to-google-sheets",
            },
        ],
    },
    sample: {
        caption: "Sample data: invented homes, with the column names the Zillow setup gives.",
        columns: ["Address", "Price", "Beds", "Baths", "Sq Ft"],
        rows: [
            ["101 Sample St, Springfield", "$325,000", "3", "2", "1,640"],
            ["42 Example Rd, Springfield", "$289,900", "2", "2", "1,210"],
            ["7 Sample Ave, Springfield", "$1,450/mo", "2", "1", "980"],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Five shapes the same job takes",
            paragraphs: [
                "Whether you're pricing one street or tracking a county, each version is a search on the listing site plus a collection in the List tab. The table shows where to start and what changes.",
            ],
            table: {
                columns: ["Variation", "Start from", "What changes"],
                rows: [
                    ["Comparables for a report", "One zip code with your price and beds filters, for sale", "One collection across the result pages; add a price-per-square-foot column in your spreadsheet."],
                    ["This week's new listings", "The same search as last week", "Collect it again; History keeps both. Match on Zillow Property ID or the listing link to see what's new or reduced."],
                    ["Rentals in an area", "Switch the search to for rent", "Same columns; the Price column holds the rent as the card shows it."],
                    ["A whole city", "One search per zip code, pasted into Bulk scrape", "Each search runs in turn; View merged table puts them together."],
                    ["A site without a ready-made setup", "Any listing site's results page in the List tab", "The columns are named from the page; check the first page before a long collection."],
                ],
                caption: "Listing sites limit how many pages one search shows; split a big area by zip code or price band.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "One zip code, step by step",
            paragraphs: [
                "Here is a for-sale search in one zip code, from search to export. How long it takes depends on how many pages the site has for your filters.",
            ],
            steps: [
                { title: "Search with the filters you'd use anyway.", body: "On Zillow: one zip code, for sale, a price range and 3+ beds. The page says how many homes match." },
                { title: "Collect every page.", body: "Open the List tab, pick the results list, choose Collect more pages and set Stop after to All pages. Zillow's list panel is scrolled for you so every card loads." },
                { title: "Read the table.", body: "Address, Price, Beds, Baths, Sq Ft, Lot Size, Listing Type, Listed By, Badges, Zillow Property ID, Property URL and Image URL. A column stays empty where the card doesn't show the value, such as Lot Size for many condos." },
                { title: "Trim it.", body: "Click Filter rows to keep the homes you want, and delete the columns you don't need." },
                { title: "Export.", body: "Export as > Microsoft Excel. Add one column, Price divided by Sq Ft, and sort the comparables by it. The collection stays in History." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: [
                "The export is the inventory; the report is what you do with it. Four moves in a spreadsheet.",
            ],
            points: [
                "Price per square foot: divide Price by Sq Ft for every row, after converting the cells to numbers if your spreadsheet reads them as text. Sort by it to find the outliers.",
                "What changed since last week: keep last week's export, match the two on Zillow Property ID or the listing link, and mark rows that are new, gone or cheaper.",
                "Rentals next to sales: collect the same zip code for rent, export, and put the two sheets side by side for a gross yield column.",
                "Share with a client: Export as > Google Sheets for a sheet you can share, or Microsoft Excel for a file to attach. Delete Image URL and Property URL first if the client doesn't need them.",
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
                "One search for a whole city. Listing sites limit how many pages a search shows, so a city search can miss many homes. Search by zip code or price band and combine.",
                "Expecting days on market, price history or the agent's phone on Zillow. A Zillow results card doesn't show them, so they aren't collected. Open a listing and use the Properties tab for what its page shows, one home at a time.",
                "Reading rent as price. Rentals come through as the card shows them, in the Price column. Keep sales and rentals in separate collections.",
                "Closing the tab mid-collection. It happens in your browser; keep the tab open. If the site asks you to confirm you're human, complete it in the tab and collect again.",
                "Reusing the data beyond your own research. Listing sites' terms can restrict automated collection and reuse. Collect for your own analysis and check the terms before anything goes to a third party.",
            ],
        },
    ],
    sites: [{ name: "Zillow", page: "zillow" }, { name: "Rightmove", page: "rightmove" }, { name: "Redfin" }, { name: "Zoopla" }, { name: "Property Finder" }, { name: "Any listing site with a results list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Give you days on market or price history. A results card doesn't show them, so they aren't collected. Some are on the listing page, which the Properties tab reads one home at a time.",
            "Reach private MLS data. It collects what the site shows you in your browser, including pages you're signed in to, under that site's terms.",
            "Watch an area and email you the new listings. Scheduled runs are coming soon; today you collect when you want fresh rows.",
            "Settle whether you may reuse the data. Listing sites' terms can restrict automated collection; collect for your own research and check them first.",
        ],
    },
    guides: [],
    faqs: [
        { q: "Is this free?", a: "Yes. Web Scraper Pro is free, with no paid plan, and there's no account to create." },
        { q: "Do I need to know anything technical?", a: "No. You search the site the way you always do, open the side panel, and collect. There's no code." },
        { q: "How do I scrape real estate data without coding?", a: "Search the area on your listing site, open the List tab, pick the results list and choose Collect more pages. One row per home comes back with price, address, beds, baths and size, and Export as saves it to Excel." },
        { q: "Which listing sites have ready-made columns?", a: "Zillow, Rightmove, Redfin, Zoopla and Property Finder have ready-made setups. Each names its columns its own way, such as Beds on Zillow and Bedrooms on Rightmove. On other sites the List tab looks for the results list on the page and names the columns from the page." },
        { q: "How many listings can one search give me?", a: "As many as the site shows across its result pages. Set how many pages under Stop after. For more, split the search by zip code or price band." },
        { q: "Can I get rentals?", a: "Yes. Switch the search to rentals and the same columns fill in, with the rent in the Price column as the card shows it." },
        { q: "Can I get the listing agent's phone number?", a: "On Rightmove, the setup has an Agent Phone column for the branch the card shows. On Zillow the setup has Listed By, not a phone; open the listing and use the Properties tab for what its page shows." },
        { q: "Can I see which listings are new since last week?", a: "Collect the same search again. Each collection is saved in History with its saved time; match the two exports on Zillow Property ID or the listing link, and the new and reduced homes stand out." },
        { q: "Does it work on a site I sign in to, like an MLS?", a: "It reads what you see once you're signed in, because it runs in your own browser. Whether you may export it is set by that system's rules; check them first." },
        { q: "Is scraping Zillow allowed?", a: "Zillow's terms restrict automated collection and reuse of its data. Collect for your own research in modest runs, keep it to the public listings, and read our plain-words explainer on web scraping and the law. It isn't legal advice." },
    ],
};
