import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the hotels.com pack in configs-prod/ (lodging cards, Load more paging)
// and its column mapping (Hotel Name, Hotel URL, Location, Guest Rating (out of 10), Rating Label, Review Count, Price Per
// Night, Original Price, Discount, Total Price (incl. taxes & fees), Rooms Left, Amenities, Badges, Booking Policies,
// Sponsored, Image URL). Draft until a real run's screenshots are in the visuals library.
// Title and headings target search phrases ("scrape hotel prices", "hotels.com scraper"), 2026-10-21.

export const hotelsCom: ScraperPageContent = {
    slug: "hotels-com",
    category: "travel",
    site: { name: "Hotels.com", url: "https://www.hotels.com" },
    meta: {
        title: "How to Scrape Hotels.com Prices for Your Dates into a Sheet",
        description: "Search a city and your dates on Hotels.com and get every hotel as a row: price per night, total with taxes, guest rating, review count, rooms left and amenities. Free, no code.",
    },
    h1: "How to scrape Hotels.com prices for your dates into a spreadsheet",
    intro: "Search a city and your dates on Hotels.com. Open the side panel and get one row per hotel with the price per night, the total with taxes and the guest rating. Sort the whole city by price in a sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A two-night city search, after export. Hotels and prices are made up.",
        columns: ["Hotel Name", "Guest Rating", "Review Count", "Price Per Night", "Total Price"],
        rows: [
            ["Harbor View Hotel", "8.8", "1,204", "149", "341"],
            ["Northgate Inn", "8.2", "532", "109", "251"],
            ["Bluebird Boutique Hotel", "9.1", "318", "189", "432"],
        ],
    },
    fields: {
        heading: "What you get for every hotel",
        intro: "Prices and ratings are saved as numbers, and a column stays empty when the card doesn't show it.",
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
        heading: "How to scrape Hotels.com in three steps",
        items: [
            {
                title: "Search on Hotels.com",
                body: "Enter the city, dates and guests, then set the filters you want: price, star rating, free cancellation. The extension collects what the list shows for those dates.",
                points: ["Example: a city, two nights, two guests, filtered to free cancellation.", "Member prices show only when you're signed in."],
            },
            {
                title: "Pick the list and load more",
                body: "Click the Web Scraper Pro icon and open the List tab. Choose the results list, then Collect more pages. Hotels.com uses a Load more button, so set Stop after to a number of loads or To end, and click Collect.",
                points: ["Each load adds a page of hotels. Ten loads covers most city searches."],
            },
            {
                title: "Review and export",
                body: "Sort by price or rating and filter rows. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only hotel name, guest rating and total price, sorted by total price."],
            },
        ],
    },
    notes: {
        heading: "Good to know about Hotels.com",
        items: [
            "Prices are for the dates and guests you searched. Change the dates and collect again to compare. Both runs stay in History.",
            "Member prices show only when you're signed in. The extension collects what you see, so sign in first if you want them.",
            "The total includes taxes and fees as Hotels.com states them. Resort fees paid at the hotel may not be in it.",
            "Booking.com and Tripadvisor have their own ready-made setups with similar columns. See the travel sites list.",
            "Hotels.com's terms restrict automated collection. Collect for your own planning or research and check the terms before reusing anything.",
        ],
    },
    emptyWhen: [
        { column: "Original Price, Discount", when: "No deal on the card." },
        { column: "Rooms Left", when: "No scarcity note." },
        { column: "Rating Label, Guest Rating", when: "A new property with no reviews." },
        { column: "Amenities", when: "The card lists none." },
    ],
    pushback: [
        "If Hotels.com shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again. What was collected is kept.",
        "After many loads, Hotels.com may show fewer results or an error page. Collect in smaller runs and come back later. History keeps each run.",
        "When Hotels.com changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    screenshots: ["ext/results-hotels"],
    feature: "list-scraper",
    guide: "collect-every-page-of-results",
    useCase: "travel",
    related: [],
    faqs: [
        { q: "Is this Hotels.com scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Can I compare the same hotels across two date ranges?", a: "Yes. Run the search for each date range and export both. Hotel URL is the same across runs, so a lookup in your sheet lines them up." },
        { q: "Are taxes and fees in the total?", a: "The Total Price column is the card's total including taxes and fees as Hotels.com states it. Resort fees paid at the hotel may not be in it." },
        { q: "Does it collect the room types?", a: "The results card shows the lead price, not every room. Open a hotel's page and use the Properties tab for the details on that page." },
        { q: "Are the prices in my currency?", a: "In whatever currency Hotels.com shows you. Set it on the site before collecting." },
        { q: "Does it work on Expedia and Booking.com too?", a: "Booking.com and Tripadvisor have ready-made setups with named columns. Expedia is detected as a list without one, so its columns are named from the page's own labels." },
        { q: "Is scraping Hotels.com allowed?", a: "Hotels.com's terms restrict automated collection. Collect what you can see, for your own planning or research, and read the terms before reusing anything. This isn't legal advice." },
    ],
};
