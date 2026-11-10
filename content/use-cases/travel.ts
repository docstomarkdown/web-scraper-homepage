import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Written so a first-time reader can follow. Scheduled price tracking is not live.
// Title targets what a reader would type into Google (2026-10-21); /scrapers/hotels-com owns "Hotels.com prices for your
// dates" and the Booking.com guide owns "Booking.com hotel prices for your dates", so this page owns the comparison.
//
// Facts checked against chrome-extension-source on 2026-11-10 (no real run; sample rows are invented):
// - Hotels.com columns Hotel Name, Hotel URL, Location, Price Per Night, Original Price, Discount, Total Price (incl. taxes
//   & fees), Guest Rating (out of 10), Rating Label, Review Count, Amenities, Booking Policies, Rooms Left, Badges, Image
//   URL, Sponsored; "Load more" paging: configs-prod/hotels.com.json, site-column-mappings/hotels.com.json.
// - Booking.com columns Hotel Name, Location / Address, Nightly Price, Guest Rating, Rating Class, Reviews Count:
//   configs-prod/booking.com.json, site-column-mappings/booking.com.json.
// - Tripadvisor hotels, restaurants, attractions and tours: Name columns, Rating, Review Count, Ranking, Price Per Night,
//   Price From, Price Range, Cuisine, Category, Neighborhood, Award; "Next page" paging: configs-prod/tripadvisor.json,
//   site-column-mappings/tripadvisor.com.json.
// - List tab "Collect more pages", "Next page" / "Load more", "Stop after", "Stop and save", "Choose an item on the page":
//   components/scraper/ListTab.tsx. Filter rows, Columns, delete column, Export as: lib/tools/helpTopics.json.
// - Chat offers "Combine the N searches into one table" for collections of the same kind (lists get a Source column):
//   lib/tools/combineCollections.ts, D-027. History keeps 500 lists with saved time: lib/db/historyService.ts.
export const travel: UseCasePageContent = {
    page: getPage("travel", "use-case"),
    meta: {
        title: "How to Compare Hotel Prices for a City in One Spreadsheet",
        description: "Collect the hotels for your dates from Booking.com, Hotels.com and Tripadvisor into one spreadsheet, with prices, ratings and review counts. No code.",
    },
    h1: "How to compare every hotel's price for your dates in one spreadsheet",
    intro: "Search a city on Booking.com, Hotels.com or Tripadvisor, collect the results, and get each hotel with its price, rating and review count in a sheet. Web Scraper Pro turns the result pages into rows inside your Chrome browser, for the dates and filters you set.",
    status: "draft",
    lastUpdated: "2026-11-10",
    job: {
        heading: "The whole market for those dates, not the first screen of results",
        paragraphs: [
            "A traveler comparing a city for a week, a travel agent building a shortlist, or a hotel's revenue manager checking the competitor set before a weekend: each needs every hotel for the same dates side by side. The price, the rating and the review count, in one sheet.",
            "Web Scraper Pro collects the search results from Booking.com, Hotels.com and Tripadvisor into named columns. Tripadvisor's restaurants and attractions collect the same way.",
            "You search the way you always do. The extension turns the result pages into rows.",
        ],
    },
    workflow: {
        heading: "How to compare hotels in five steps",
        intro: "Five steps, from a search with your dates to a sheet you can sort.",
        steps: [
            {
                title: "Search with your dates and filters",
                body: "On Booking.com, Hotels.com or Tripadvisor, enter the city, dates and guests, then filter: price range, star rating, free cancellation. The extension collects what the list shows, so the filters do the narrowing.",
                points: ["Prices are for the dates and guests you searched. Change them and collect again to compare.", "Member prices show only when you're signed in; sign in first if you want them."],
                feature: "list-scraper",
            },
            {
                title: "Collect every result",
                body: "Click the Web Scraper Pro icon in Chrome to open the side panel. In the List tab, the hotels show as a list with a count: click it, choose Collect more pages, and click Collect. Keep the tab open while it runs.",
                points: [
                    "Hotels.com loads more with a Load more button; Tripadvisor has numbered pages. Set how many under Stop after.",
                    "On Hotels.com you get one row per hotel with Hotel Name, Location, Guest Rating (out of 10), Review Count, Price Per Night and Total Price (incl. taxes & fees), among other columns.",
                ],
                feature: "list-scraper",
                screenshot: "ext/results-hotels",
            },
            {
                title: "Compare in a sheet",
                body: "Click View results. Click a price or rating column to sort, delete columns you don't need with the trash icon, then click Export as and choose Google Sheets or Microsoft Excel.",
                points: [
                    "To export only some columns, type in chat: download only the hotel name, guest rating and total price as Excel.",
                    "On Hotels.com the price per night and the total with taxes and fees sit in separate columns, so you can compare like with like.",
                ],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
            {
                title: "Add restaurants and attractions",
                body: "On Tripadvisor, a city's restaurants and attractions are lists too. Open the restaurants page, pick the list in the panel, and collect every page. Do the same for attractions and tours.",
                points: ["The Tripadvisor setup's columns include Name, Rating, Review Count, Ranking, Cuisine or Category, Neighborhood and Price Range."],
                feature: "list-scraper",
            },
            {
                title: "Check again before the trip, or the weekend",
                body: "Collect the same search again. Each collection is saved in History with the time it was saved, and the hotel's link matches rows across collections, so a lookup shows what moved.",
                points: ["Scheduled checks that run on their own are coming soon. Today you collect again when you want fresh prices."],
                feature: "export-to-google-sheets",
            },
        ],
    },
    sample: {
        caption: "Sample data: invented hotels and prices, with the column names the Hotels.com setup gives.",
        columns: ["Hotel Name", "Guest Rating (out of 10)", "Price Per Night", "Total Price (incl. taxes & fees)"],
        rows: [
            ["Sample Harbor Hotel", "8.8", "$149", "$341"],
            ["Sample Inn", "8.2", "$109", "$251"],
            ["Sample Boutique Hotel", "9.1", "$189", "$432"],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Four travel comparisons, and how each one runs",
            paragraphs: [
                "The result pages look the same on every visit. What changes is what you type into the search box before you collect, and how many collections you put side by side.",
            ],
            table: {
                columns: ["The comparison", "Search", "What changes"],
                rows: [
                    ["One city, several dates", "The same city with each date range in turn", "One collection per date range. Hotel URL is the same across collections, so a lookup in the sheet lines the prices up."],
                    ["Several cities, one date", "Each city with the same dates", "One collection per city. Collected through chat, the latest result offers to combine them into one table with a Source column."],
                    ["Hotels plus restaurants and attractions", "Tripadvisor's hotel, restaurant and attraction lists for the city", "Three collections with named columns: Rating, Review Count, Ranking, Cuisine or Category, Neighborhood, Price Range."],
                    ["Reviews of a shortlist", "A hotel's own page", "If the List tab finds the reviews as a list, collect every page; if not, choose Choose an item on the page and click one review. Review text belongs to its authors and the site."],
                ],
                caption: "Every collection is saved in History with its saved time, which is what makes the comparisons possible.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Two nights in a city on Hotels.com, start to finish",
            paragraphs: [
                "Here is the traveler's job, step by step. The clicks are the same for any city.",
            ],
            steps: [
                { title: "Search Hotels.com with the dates.", body: "Two nights, two guests, filtered to free cancellation. Sign in first if you want the member prices on the cards." },
                { title: "Pick the list and set how many loads.", body: "Open the List tab, click the hotels list, choose Collect more pages, then Load more, and set Stop after to the number of loads you want." },
                { title: "Sort by the total, not the nightly price.", body: "On the results page, click Total Price (incl. taxes & fees). It is the card's total with taxes and fees. Price Per Night sits beside it for the comparison." },
                { title: "Keep the ones worth reading about.", body: "Use Filter rows to keep the hotels you'd consider. Hide the Amenities and Image URL columns with Columns." },
                { title: "Export the shortlist.", body: "Click Export as and choose Google Sheets or Microsoft Excel. The sheet has the hotel, its rating, its review count, the nightly price and the total." },
                { title: "Collect it again a week later.", body: "Same search, same settings. Export again and look up each hotel by Hotel URL; the difference in the total is what moved. History keeps both collections." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: ["The sheet answers different questions depending on who is asking."],
            points: [
                "The traveler's shortlist: sort by the total price, keep Guest Rating above a line, and read the Location column for the area.",
                "The travel agent's proposal: export two or three date ranges, put them side by side by Hotel URL, and send the client a sheet with the price per night and the total for each.",
                "The revenue manager's competitor set: filter to the hotels you compete with, export weekly, and chart Price Per Night by hotel across the collections from History.",
                "The city guide: put the Tripadvisor restaurant and attraction collections next to the hotel list in one workbook, each on its own sheet, with Ranking and Neighborhood to group by area.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes",
            heading: "Five mistakes that make two hotels look alike",
            paragraphs: ["Many of them are about comparing numbers that weren't collected under the same conditions."],
            points: [
                "Comparing a nightly price with a total. Hotels.com shows both on the card and the setup keeps them in two columns; compare like with like.",
                "Collecting without setting the dates and the currency. Prices are for the dates and guests you searched, in the currency the site shows you. Set both before you collect.",
                "Forgetting to sign in. Member prices show only when you're signed in, and the extension collects what your browser shows.",
                "Reading the card price as every room. The card shows one price; a hotel's own page holds the room types.",
                "Loading many pages in one sitting. A site may slow down, show an error page or ask for a verification. Collect in smaller runs; History keeps each one.",
            ],
        },
    ],
    sites: [{ name: "Hotels.com", page: "hotels-com" }, { name: "Booking.com" }, { name: "Tripadvisor" }, { name: "Any travel site with a results list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Watch prices and alert you when they drop. Scheduled runs are coming soon; today you collect the search again when you want fresh prices.",
            "See prices you can't see. Member rates show only when you're signed in, and the extension collects what your browser shows.",
            "Collect every room type from a results page. The card shows one price; a hotel's own page holds the rooms.",
            "Convert currencies. Prices come in the currency the site shows you; set it on the site before collecting.",
            "Settle what you may reuse. Travel sites' terms can restrict automated collection; collect for your own planning or research and check them first.",
        ],
    },
    guides: ["scrape-booking-com-hotel-prices"],
    faqs: [
        { q: "Is it free to scrape hotel prices?", a: "Yes. Web Scraper Pro is free, with no paid plan, and there's no account to create." },
        { q: "Which travel sites have ready-made columns?", a: "Hotels.com, Booking.com and Tripadvisor have ready-made setups. On other sites the List tab looks for the results list on the page and names the columns from the page; if it doesn't find it, choose Choose an item on the page and click one result." },
        { q: "How do I scrape Booking.com hotel prices?", a: "Search with your dates and guests, open the panel's List tab, pick the hotels list and collect. The Booking.com setup's columns are Hotel Name, Location / Address, Nightly Price, Guest Rating, Rating Class and Reviews Count." },
        { q: "Are taxes and fees included in the prices?", a: "On Hotels.com, the card's total including taxes and fees is its own column next to the price per night. On other sites the price is what the card shows; check whether the site displays totals before you compare." },
        { q: "Can I compare the same city across several dates?", a: "Yes. Change the dates, collect again, and save both. History keeps each collection, and the hotel link matches rows across them." },
        { q: "Can I compare several cities in one table?", a: "Collect each city through chat, and the latest result offers to combine the collections into one table with a Source column. Or export each collection and put them in one sheet." },
        { q: "Can I track hotel prices over time?", a: "Collect the same search when you want fresh numbers; each collection is saved in History and lines up by Hotel URL. Scheduled runs are coming soon." },
        { q: "Can I scrape hotel reviews?", a: "If the List tab finds a hotel page's reviews as a list, pick it and collect every page; if not, choose Choose an item on the page and click one review. Review text belongs to its authors and the site, so keep it for analysis." },
        { q: "Can I get the restaurants and attractions too?", a: "Yes, on Tripadvisor. Its setup covers restaurant, attraction and tour lists, with columns such as Name, Rating, Review Count, Ranking, Cuisine or Category, Neighborhood and Price Range." },
        { q: "Do I need to know anything technical?", a: "No. You search the site the way you always do, open the side panel, and collect. There's no code." },
    ],
};
