import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the hotels.com pack in configs-prod/ (lodging cards, Load more paging)
// and its column mapping (Hotel Name, Hotel URL, Location, Guest Rating (out of 10), Rating Label, Review Count, Price Per
// Night, Original Price, Discount, Total Price (incl. taxes & fees), Rooms Left, Amenities, Badges, Booking Policies,
// Sponsored, Image URL). Draft until a real run's screenshots are in the visuals library.

export const hotelsCom: ScraperPageContent = {
    slug: "hotels-com",
    category: "travel",
    site: { name: "Hotels.com", url: "https://www.hotels.com" },
    meta: {
        title: "Hotels.com Scraper: Every Hotel for Your Dates in a Spreadsheet",
        description: "Collect a Hotels.com search into a spreadsheet: hotel name, location, guest rating, review count, price per night, total price, discount, rooms left and amenities, for every result, with no code.",
    },
    h1: "Collect every Hotels.com result for your dates",
    intro: "Search a city and your dates, open the side panel, and get one row per hotel with the price per night, the total with taxes, the guest rating and what's included. Sort the whole city by price or rating in a sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A two-night city search, after export. Hotels and prices are made up.",
        columns: ["Hotel Name", "Location", "Guest Rating (out of 10)", "Review Count", "Price Per Night", "Total Price (incl. taxes & fees)", "Rooms Left"],
        rows: [
            ["Harbor View Hotel", "Harborview, 0.4 mi to center", "8.8", "1,204", "149", "341", "2"],
            ["Northgate Inn", "Northgate, 1.2 mi to center", "8.2", "532", "109", "251", ""],
            ["Bluebird Boutique Hotel", "Riverside, 0.8 mi to center", "9.1", "318", "189", "432", "1"],
        ],
    },
    fields: {
        heading: "Sixteen columns from each hotel card",
        intro: "The columns come from the Hotels.com setup. Prices and ratings are saved as numbers, and a column stays empty when the card doesn't show it.",
        items: [
            { name: "Hotel Name, Hotel URL, Location", description: "The hotel, its page and the location line with the distance to the centre." },
            { name: "Guest Rating (out of 10), Rating Label, Review Count", description: "The score, its label such as Wonderful, and how many reviews." },
            { name: "Price Per Night, Original Price, Discount", description: "The nightly price, the struck-through price and the discount shown." },
            { name: "Total Price (incl. taxes & fees)", description: "The stay's total as the card states it, so comparisons include fees." },
            { name: "Rooms Left, Booking Policies", description: "Scarcity notes and policies such as free cancellation or reserve now, pay later." },
            { name: "Amenities, Badges, Sponsored", description: "The amenity line, labels such as Member price or Top rated, and whether the card is an ad." },
            { name: "Image URL", description: "The card's main photo." },
        ],
    },
    steps: {
        heading: "Search, pick, collect",
        items: [
            { title: "Search on Hotels.com", points: ["Example: a city, two nights, two guests, filtered to free cancellation.", "Member prices show only when you're signed in."], body: "Enter the city, dates and guests, then set the filters you want: price, star rating, free cancellation. The extension collects what the list shows, for those dates." },
            { title: "Pick the list and load more", points: ["Hotels.com uses a Load more button. Choose Collect more pages, set Stop after to a number of loads or To end, and click Collect."], body: "Open the side panel's List tab and choose the results list. Choose Collect more pages; Hotels.com uses a Load more button, so set Stop after to a number of loads or To end, and click Collect." },
            { title: "Review and export", points: ["Example to type with the results tab in front: Only hotel name, guest rating and total price, sorted by total price."], body: "Sort by price or rating, filter rows, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "Hotels.com specifics",
        items: [
            "Prices are for the dates and guests you searched. Change the dates and collect again to compare; both runs stay in History.",
            "Member prices show only when you're signed in; the extension collects what you see, so sign in first if you want them.",
            "The card's total includes taxes and fees as Hotels.com states them; resort fees paid at the hotel may not be in it.",
            "Booking.com and Tripadvisor have their own ready-made setups with similar columns; see the travel sites list.",
            "Hotels.com's terms restrict automated collection. Collect for your own planning or research and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [{"column": "Original Price, Discount", "when": "No deal on the card."}, {"column": "Rooms Left", "when": "No scarcity note."}, {"column": "Rating Label, Guest Rating", "when": "A new property with no reviews."}, {"column": "Amenities", "when": "The card lists none."}],
    pushback: ["If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again; what was collected is kept.", "A site that slows down for anyone loading many pages fast shows fewer results or an error page. Collect in smaller runs and come back later; History keeps each run.", "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page."],
    screenshots: ["ext/results-hotels"],
    feature: "list-scraper",
    guide: "collect-every-page-of-results",
    useCase: "travel",
    related: [],
    faqs: [
        { q: "Can I compare the same hotels across dates?", a: "Yes. Run the search for each date range and export both; History keeps every run with its date, and Hotel URL is the same across runs, so a lookup lines them up." },
        { q: "Does it collect the room types?", a: "The results card shows the lead price, not every room. Open a hotel's page and use the Properties tab for the details on that page." },
        { q: "Are the prices in my currency?", a: "In whatever currency Hotels.com shows you. Set it on the site before collecting." },
        { q: "Does it work on Expedia too?", a: "Expedia pages are detected as a list without a ready-made setup, so the columns are named from the page's own labels. Hotels.com, Booking.com and Tripadvisor have named columns." },
        { q: "Are taxes and fees in the total?", a: "The Total Price column is the card's total including taxes and fees as Hotels.com states it. Resort fees paid at the hotel may not be in it." },
        { q: "Can I compare two date ranges?", a: "Run the search for each and export both; Hotel URL is the same across runs, so a lookup lines them up." },
    ],
};
