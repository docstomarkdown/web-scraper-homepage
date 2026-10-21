import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Written so a first-time reader can follow. Facts checked against release 1.3.0 on 2026-10-21: the booking.com (Hotel Name,
// Location / Address, Nightly Price, Guest Rating, Rating Class, Reviews Count), hotels.com (16 columns incl. Total Price,
// Rooms Left, Amenities, Load more paging) and tripadvisor (hotels, restaurants, attractions and tours: Name, Rating, Review
// Count, Ranking, Price From, Price Range, Cuisine, Category, Neighborhood, Award, Next page) packs and mappings; Filter rows
// and the Columns panel on the results page (content/features/export-to-google-sheets.ts); "Combine the N searches into one
// table" in chat (DECISIONS.md D-027). Scheduled price tracking is not live. Draft until the screenshots exist.
// Title targets what a reader would type into Google (2026-10-21); /scrapers/hotels-com owns "Hotels.com prices for your
// dates" and the Booking.com guide owns "Booking.com hotel prices for your dates", so this page owns the comparison.
// Deepened 2026-10-21 (variations, worked example, recipes, mistakes). Verify before publishing: the number of hotels ten
// Load more clicks give on Hotels.com (the page says "about 200"); that chat offers to combine two Hotels.com searches.

export const travel: UseCasePageContent = {
    page: getPage("travel", "use-case"),
    meta: {
        title: "How to Compare Hotel Prices for a City in One Spreadsheet",
        description: "Collect every hotel for your dates from Booking.com, Hotels.com and Tripadvisor into one spreadsheet, with prices, ratings and review counts, plus the restaurants and attractions around them. No code.",
    },
    h1: "How to compare every hotel's price for your dates in one spreadsheet",
    intro: "Search a city on Booking.com, Hotels.com or Tripadvisor, click once, and get every hotel with its price, rating and review count in a sheet. Web Scraper Pro turns the result pages into rows inside your Chrome browser, for the dates and filters you set.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The whole market for those dates, not the first twenty results",
        paragraphs: [
            "A traveller comparing a city for a week, a travel agent building a shortlist, or a hotel's revenue manager checking the competitor set before a weekend: each needs every hotel for the same dates side by side. The price, the rating and the review count, in one sheet.",
            "Web Scraper Pro collects the search results from the big travel sites into named columns. Tripadvisor's restaurants and attractions collect the same way.",
            "You search the way you always do. The extension turns the result pages into rows.",
        ],
    },
    workflow: {
        heading: "How to compare hotels in five steps",
        intro: "A city with 200 hotels takes about two minutes.",
        steps: [
            {
                title: "Search with your dates and filters",
                body: "On Booking.com, Hotels.com or Tripadvisor, enter the city, dates and guests, then filter: price range, star rating, free cancellation. The extension collects what the list shows, so the filters do the narrowing.",
                points: ["Prices are for the dates and guests you searched. Change them and collect again to compare.", "Member prices show only when you're signed in; sign in first if you want them."],
                feature: "list-scraper",
            },
            {
                title: "Collect every result",
                body: "Click the Web Scraper Pro icon in Chrome; a panel opens on the right. In the List tab, the hotels show as a list with a count: click it, choose Collect more pages, and click Collect. Keep the tab in front while it runs.",
                points: ["Hotels.com loads more with a Load more button; set how many loads. Tripadvisor has numbered pages; set Stop after.", "You get one row per hotel: Hotel Name, Location, Guest Rating, Review Count, Price Per Night and, on Hotels.com, the Total Price with taxes and fees."],
                feature: "list-scraper",
                screenshot: "ext/results-hotels",
            },
            {
                title: "Compare in a sheet",
                body: "Click View results. Click the Price or Rating column to sort, remove columns you don't need with the trash icon, then click Export as and choose Google Sheets or Excel. Prices and ratings are already numbers.",
                points: ["Example to type in the panel's chat with the results tab in front: Only hotel name, guest rating and total price, sorted by total price", "On Hotels.com the price per night and the total with fees sit in separate columns, so the comparison is honest."],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
            {
                title: "Add restaurants and attractions",
                body: "On Tripadvisor, a city's restaurants and attractions are lists too. Open the restaurants page, pick the list in the panel, and collect every page. Do the same for attractions and tours.",
                points: ["Restaurant rows: name, rating, review count, ranking, cuisine or category, neighbourhood and price range."],
                feature: "list-scraper",
            },
            {
                title: "Check again before the trip, or the weekend",
                body: "Run the same search again. Each collection is saved in History with its date, and the hotel's link matches rows across runs, so a lookup shows what moved.",
                points: ["Scheduled checks that run on their own are coming with the cloud. Today it's one click when you want fresh prices."],
                feature: "export-to-google-sheets",
            },
        ],
    },
    sample: {
        caption: "Three rows of a Hotels.com search. Hotel names and prices are made up.",
        columns: ["Hotel Name", "Guest Rating", "Price Per Night", "Total Price"],
        rows: [
            ["Harbor View Hotel", "8.8", "149", "341"],
            ["Northgate Inn", "8.2", "109", "251"],
            ["Bluebird Boutique Hotel", "9.1", "189", "432"],
        ],
    },
    sections: [
        {
            id: "variations",
            eyebrow: "Variations",
            heading: "Four travel comparisons, and how each one runs",
            paragraphs: [
                "The result pages are the same on every run. What changes is what you type into the search box before you collect, and how many runs you put side by side.",
            ],
            table: {
                columns: ["The comparison", "Search", "What changes"],
                rows: [
                    ["One city, several dates", "The same city with each date range in turn", "One run per date range. Hotel URL is the same across runs, so a lookup in the sheet lines the prices up."],
                    ["Several cities, one date", "Each city with the same dates", "One run per city. In chat, the latest result offers to combine the searches into one table with a column saying which search each row came from."],
                    ["Hotels plus restaurants and attractions", "Tripadvisor's hotel, restaurant and attraction lists for the city", "Three runs with named columns: Rating, Review Count, Ranking, Cuisine or Category, Neighborhood, Price Range."],
                    ["Reviews of a shortlist", "A hotel's own page", "The review list on the page is found like any other list; collect every page. Review text belongs to its authors and the site."],
                ],
                caption: "Every run is saved in History with its date, which is what makes the comparisons possible.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Two nights in a city on Hotels.com, start to finish",
            paragraphs: [
                "Here is the traveller's job with the counts and times the extension gives. The city and the hotels are made up; the clicks are the same for any city.",
            ],
            steps: [
                { title: "Search Hotels.com with the dates.", body: "Two nights, two guests, filtered to free cancellation. Sign in first if you want the member prices on the cards." },
                { title: "Pick the list and set ten loads.", body: "Open the List tab, click the hotels list, choose Collect more pages, and set Stop after to ten loads. Ten loads covers most city searches, about 200 hotels, in about two minutes." },
                { title: "Sort by the total, not the nightly price.", body: "On the results page, click Total Price. It is the card's total with taxes and fees, which is what you pay. Price Per Night sits beside it for the comparison." },
                { title: "Keep the ones worth reading about.", body: "Use Filter rows to keep rows with Guest Rating above 8.5 and Review Count above 200. Hide the Amenities and Image URL columns in the Columns panel." },
                { title: "Export the shortlist.", body: "Click Export as and choose Google Sheets or Excel. The sheet has the hotel, its rating, its review count, the nightly price and the total, as numbers." },
                { title: "Run it again a week later.", body: "Same search, same loads. Export again and look up each hotel by Hotel URL; the difference in Total Price is what moved. History keeps both runs with their dates." },
            ],
        },
        {
            id: "next",
            eyebrow: "After the export",
            heading: "What to do with the table next",
            paragraphs: ["The sheet answers three different questions depending on who is asking."],
            points: [
                "The traveller's shortlist: sort by Total Price, keep Guest Rating above a line, and read the Location column for the distance to the centre. Five rows is a decision.",
                "The travel agent's proposal: export two or three date ranges, put them side by side by Hotel URL, and send the client a sheet with the price per night and the total for each.",
                "The revenue manager's competitor set: filter the run to the hotels you compete with, export weekly, and chart Price Per Night by hotel across the dated runs from History.",
                "The city guide: combine the Tripadvisor restaurant and attraction runs with the hotel list in one workbook, each on its own sheet, with Ranking and Neighborhood to group by area.",
            ],
        },
        {
            id: "mistakes",
            eyebrow: "Mistakes",
            heading: "Five mistakes that make two hotels look alike",
            paragraphs: ["Most of them are about comparing numbers that weren't collected under the same conditions."],
            points: [
                "Comparing a nightly price with a total. Hotels.com shows both on the card and the extension keeps them in two columns; compare like with like.",
                "Collecting without setting the dates and the currency. Prices are for the dates and guests you searched, in the currency the site shows you. Set both before you click Collect.",
                "Forgetting to sign in. Member prices show only when you're signed in, and the extension collects what your browser shows.",
                "Reading the card price as every room. The card shows the lead price; a hotel's own page holds the room types, one hotel at a time through the Properties tab.",
                "Loading fifty pages in one sitting. After many loads a site may show fewer results, an error page or a verification. Collect in smaller runs; History keeps each one.",
            ],
        },
    ],
    sites: [{ name: "Hotels.com", page: "hotels-com" }, { name: "Booking.com" }, { name: "Tripadvisor" }, { name: "Any travel site with a results list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Watch prices and alert you when they drop. Scheduled runs are coming with the cloud; today you run the search again when you want fresh prices.",
            "See prices you can't see. Member rates show only when you're signed in, and the extension collects what your browser shows.",
            "Collect every room type from a results page. The card shows the lead price; a hotel's own page holds the rooms, one hotel at a time through the Properties tab.",
            "Convert currencies. Prices come in the currency the site shows you; set it on the site before collecting.",
            "Settle what you may reuse. Travel sites' terms restrict automated collection; collect for your own planning or research and check them first.",
        ],
    },
    guides: ["scrape-booking-com-hotel-prices", "collect-every-page-of-results", "scrape-data-from-any-website-to-excel"],
    faqs: [
        { q: "Is it free to scrape hotel prices?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "Which travel sites have ready-made columns?", a: "Booking.com, Hotels.com and Tripadvisor, for hotels, restaurants, attractions and tours. On other sites the results list is found on the page and the columns are named from its labels." },
        { q: "How do I scrape Booking.com hotel prices?", a: "Search with your dates and guests, open the panel's List tab, pick the hotels list and collect more pages. You get Hotel Name, Location, Nightly Price, Guest Rating, Rating Class and Reviews Count for every hotel in the results." },
        { q: "Are taxes and fees included in the prices?", a: "On Hotels.com the card's total including taxes and fees is its own column next to the price per night. On other sites the price is what the card shows; check whether the site displays totals before you compare." },
        { q: "Can I compare the same city across several dates?", a: "Yes. Change the dates, collect again, and save both. History keeps each with its date, and the hotel link matches rows across runs." },
        { q: "Can I compare several cities in one table?", a: "Yes. Collect each city from the Chat tab, and the latest result offers to combine the searches into one table with a column saying which search each row came from. Or export each run and put them in one sheet." },
        { q: "Can I track hotel prices over time?", a: "Run the same search when you want fresh numbers; each run is dated in History and lines up by Hotel URL. Scheduled runs that happen on their own are coming with the cloud." },
        { q: "Can I scrape hotel reviews?", a: "A hotel page's review list is found like any other list; pick it in the List tab and collect every page. Review text belongs to its authors and the site, so keep it for analysis." },
        { q: "Can I get the restaurants and attractions too?", a: "Yes, on Tripadvisor. The restaurant, attraction and tour lists have ready-made columns: name, rating, review count, ranking, cuisine or category, neighbourhood and price range." },
        { q: "Do I need to know anything technical?", a: "No. You search the site the way you always do, open the panel, and click Collect. There is nothing to set up and no code." },
    ],
};
