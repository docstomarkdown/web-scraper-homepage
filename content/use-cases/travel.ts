import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Written so a first-time reader can follow. Facts checked against release 1.3.0 on 2026-10-21: the booking.com (Hotel Name,
// Location / Address, Nightly Price, Guest Rating, Rating Class, Reviews Count), hotels.com (16 columns incl. Total Price,
// Rooms Left, Amenities, Load more paging) and tripadvisor (hotels, restaurants, attractions and tours: Name, Rating, Review
// Count, Ranking, Price From, Price Range, Cuisine, Category, Neighborhood, Award, Next page) packs and mappings. Scheduled
// price tracking is not live. Draft until the screenshots exist.
// Title targets what a reader would type into Google (2026-10-21); /scrapers/hotels-com owns "Hotels.com prices for your dates".

export const travel: UseCasePageContent = {
    page: getPage("travel", "use-case"),
    meta: {
        title: "How to Compare Hotel Prices for Your Dates in One Spreadsheet",
        description: "Collect every hotel for your dates from Booking.com, Hotels.com and Tripadvisor into one spreadsheet, with prices, ratings and review counts, plus the restaurants and attractions around them. No code.",
    },
    h1: "How to compare hotel prices for your dates in one spreadsheet",
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
    sites: [{ name: "Hotels.com", page: "hotels-com" }, { name: "Booking.com" }, { name: "Tripadvisor" }, { name: "Any travel site with a results list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Watch prices and alert you when they drop. Scheduled runs are coming with the cloud; today you run the search again when you want fresh prices.",
            "See prices you can't see. Member rates show only when you're signed in, and the extension collects what your browser shows.",
            "Collect every room type from a results page. The card shows the lead price; a hotel's own page holds the rooms, one hotel at a time through the Properties tab.",
            "Settle what you may reuse. Travel sites' terms restrict automated collection; collect for your own planning or research and check them first.",
        ],
    },
    guides: ["collect-every-page-of-results", "scrape-data-from-any-website-to-excel"],
    faqs: [
        { q: "Is it free to scrape hotel prices?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Which travel sites have ready-made columns?", a: "Booking.com, Hotels.com and Tripadvisor, for hotels, restaurants, attractions and tours. On other sites the results list is found on the page and the columns are named from its labels." },
        { q: "Are taxes and fees included in the prices?", a: "On Hotels.com the card's total including taxes and fees is its own column next to the price per night. On other sites the price is what the card shows; check whether the site displays totals before you compare." },
        { q: "Can I scrape hotel reviews?", a: "A hotel page's review list is found like any other list; pick it in the List tab and collect every page. Review text belongs to its authors and the site, so keep it for analysis." },
        { q: "Can I compare the same city across several dates?", a: "Yes. Change the dates, collect again, and save both. History keeps each with its date, and the hotel link matches rows across runs." },
        { q: "Do I need to know anything technical?", a: "No. You search the site the way you always do, open the panel, and click Collect. There is nothing to set up and no code." },
    ],
};
