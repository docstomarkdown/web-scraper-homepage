import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 on 2026-10-21: the booking.com (Hotel Name, Location / Address, Nightly Price, Guest
// Rating, Rating Class, Reviews Count), hotels.com (16 columns incl. Total Price, Rooms Left, Amenities, Load more paging)
// and tripadvisor (hotels, restaurants, attractions and tours: Name, Rating, Review Count, Ranking, Price From, Price Range,
// Cuisine, Category, Neighborhood, Award, Next page) packs and mappings in configs-prod/ and site-column-mappings/.
// Scheduled price tracking is not live. Draft until the screenshots exist.

export const travel: UseCasePageContent = {
    page: getPage("travel", "use-case"),
    meta: {
        title: "Travel and Hospitality: Hotel Prices, Ratings and Reviews in a Sheet",
        description: "Collect every hotel for your dates from Booking.com, Hotels.com and Tripadvisor into one spreadsheet, with prices, ratings and review counts, and the restaurants and attractions around them.",
    },
    h1: "Every hotel for your dates, in one spreadsheet",
    intro: "Search a city on Booking.com, Hotels.com or Tripadvisor, collect every result with its price, rating and review count, and compare the whole city in a sheet. Then add the restaurants and attractions for the itinerary, or the competitor set for a rate check.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The whole market for those dates, not the first twenty",
        paragraphs: [
            "A traveller comparing a city for a week, a travel agent building a shortlist for a client, or a hotel's revenue manager checking the competitor set before a weekend: each needs every hotel for the same dates with the price, the rating and the review count side by side.",
            "Web Scraper Pro collects the search results from the big travel sites into named columns, in your browser, for the dates and filters you set. Tripadvisor's restaurants and attractions collect the same way, so the itinerary and the rate check come from the same tabs.",
        ],
    },
    workflow: {
        heading: "From a search to a comparison",
        steps: [
            { title: "Search with your dates and filters", body: "On Booking.com, Hotels.com or Tripadvisor, enter the city, dates and guests, then filter: price range, star rating, free cancellation. The extension collects what the list shows, so the filters do the narrowing.", feature: "list-scraper" },
            { title: "Collect every result", body: "Open the side panel's List tab, pick the results list, and choose Collect more pages: a Load more button on Hotels.com, Next page on Tripadvisor. One row per hotel arrives with the price, rating and review count as numbers.", feature: "list-scraper", screenshot: "ext/results-hotels" },
            { title: "Compare in a sheet", body: "Sort by price or rating on the results page, remove the columns you don't need, and Export as Google Sheets or Excel. Price per night and the total with fees sit in separate columns on Hotels.com, so the comparison is honest.", feature: "export-to-google-sheets", screenshot: "ext/results-export-menu" },
            { title: "Add restaurants and attractions", body: "On Tripadvisor, a city's restaurants and attractions are lists too: name, rating, review count, ranking, cuisine or category, neighbourhood and price range. Collect each and export them for the itinerary.", feature: "list-scraper" },
            { title: "Check again before the trip, or the weekend", body: "Run the same search again; each collection is saved in History with its date, and the hotel's URL lines the runs up in a lookup. Scheduled checks are coming with the cloud.", feature: "export-to-google-sheets" },
        ],
    },
    sample: {
        caption: "Three rows of a city search on Hotels.com, after export. Hotels and prices are made up.",
        columns: ["Hotel Name", "Location", "Guest Rating (out of 10)", "Review Count", "Price Per Night", "Total Price (incl. taxes & fees)"],
        rows: [
            ["Harbor View Hotel", "Harborview, 0.4 mi to center", "8.8", "1,204", "149", "341"],
            ["Northgate Inn", "Northgate, 1.2 mi to center", "8.2", "532", "109", "251"],
            ["Bluebird Boutique Hotel", "Riverside, 0.8 mi to center", "9.1", "318", "189", "432"],
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
        { q: "Which travel sites have a ready-made setup?", a: "Booking.com, Hotels.com and Tripadvisor (hotels, restaurants, attractions and tours) come with named columns. On other sites the results list is detected and the columns are named from the page's labels." },
        { q: "Are taxes and fees included in the prices?", a: "On Hotels.com the card's total including taxes and fees is its own column next to the price per night. On other sites the price is what the card shows; check whether the site displays totals before you compare." },
        { q: "Can I collect reviews of a hotel?", a: "A hotel page's review list is detected like any other list; pick it in the List tab and collect every page. Review text belongs to its authors and the site, so keep it for analysis." },
        { q: "Can I compare the same city across several dates?", a: "Yes. Change the dates, collect again, and export both runs; History keeps each with its date, and the hotel URL matches rows across runs." },
    ],
};
