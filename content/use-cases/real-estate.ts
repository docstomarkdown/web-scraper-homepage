import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Maria, real estate professional or investor (docs/personas.md), written so a first-time reader can follow.
// Facts checked against release 1.3.0 on 2026-10-21: the zillow.com, rightmove.co.uk, redfin.com, zoopla.co.uk and
// propertyfinder.ae packs and their column mappings; results page filters and exports. Never imply days on market, price
// history, agent contact details or MLS data: none come from a results card. Draft until the screenshots exist.

export const realEstate: UseCasePageContent = {
    page: getPage("real-estate", "use-case"),
    meta: {
        title: "Real Estate: Every Listing in an Area, in a Spreadsheet",
        description: "Export homes for sale or rent from Zillow, Rightmove, Redfin, Zoopla and Property Finder into one sheet: price, address, beds, baths, size, type and link, for every page of results, every week.",
    },
    h1: "Get every listing in an area into a spreadsheet",
    intro: "Search a zip code or a town on your listing site, click once, and get one home per row with the price, address, beds, baths, size and link, for every page of results. Run it again next week and see what's new.",
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
                body: "Click the Web Scraper Pro icon in Chrome; a panel opens on the right. In the List tab, the homes show as a list with a count. Click it, choose Collect more pages, and click Collect from N pages. Keep the tab in front while it runs.",
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
        { q: "Do I need to know anything technical?", a: "No. You search the site the way you always do, open the panel, and click Collect. There is nothing to set up and no code." },
        { q: "Which listing sites have ready-made columns?", a: "Zillow, Rightmove, Redfin, Zoopla and Property Finder. On other sites the results list is found on the page and the columns are named from its labels." },
        { q: "How many listings can one search give me?", a: "As many as the site shows: Zillow up to 20 pages, about 800 homes; Rightmove up to 42 pages. For more, split the search by zip code or price band." },
        { q: "Can I get rentals?", a: "Yes. Switch the search to rentals and the same columns fill in, with the monthly rent in the Price column." },
        { q: "Does it work on a site I sign in to, like an MLS?", a: "It can read what you see once you're signed in, because it runs in your own browser. Whether you may export it is set by that system's rules; check them first." },
    ],
};
