import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the hotels.com pack in configs-prod/ (lodging cards, Load more paging)
// and its column mapping (Hotel Name, Hotel URL, Location, Guest Rating (out of 10), Rating Label, Review Count, Price Per
// Night, Original Price, Discount, Total Price (incl. taxes & fees), Rooms Left, Amenities, Badges, Booking Policies,
// Sponsored, Image URL). Draft until a real run's screenshots are in the visuals library.
// Title and headings target search phrases ("scrape hotel prices", "hotels.com scraper"), 2026-10-21.

// Verify on a real run before publishing (added with the deeper sections, 2026-10-21): hotels per Load more (ten loads covering a city search is assumed), and that Sponsored rows are labelled on the results page.
export const hotelsCom: ScraperPageContent = {
    slug: "hotels-com",
    category: "travel",
    site: { name: "Hotels.com", url: "https://www.hotels.com" },
    meta: {
        title: "How to Scrape Hotels.com Prices and Ratings into Excel",
        description: "Search a city and your dates on Hotels.com and get every hotel as a row: price per night, total with taxes, guest rating, review count and policies. Free, no code.",
    },
    h1: "How to scrape Hotels.com prices and ratings into a spreadsheet",
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
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three Hotels.com searches worth running",
            paragraphs: ["Each search is one run for one set of dates. Set the dates, guests and filters on Hotels.com first, because the price on every card depends on them."],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["A city, your dates, free cancellation", "A traveller choosing by total price and rating, not by the first page.", "Hotel Name, Guest Rating, Review Count, Total Price, Booking Policies"],
                    ["The same city, two different weekends", "A planner finding the cheaper weekend before booking flights.", "Hotel Name, Price Per Night, Total Price, Hotel URL"],
                    ["A city, 4 stars and up, sorted by rating", "A hotel owner or analyst watching what competitors charge for the same nights.", "Hotel Name, Location, Guest Rating, Price Per Night, Original Price, Discount"],
                ],
                caption: "Member prices show only when you're signed in. Sign in first if you want them in the table.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "Two nights in one city, start to finish",
            paragraphs: ["This is the run a traveller does the evening before booking. The row count depends on the city and how many loads you allow."],
            steps: [
                { title: "Search.", body: "Enter the city, two nights and two guests on Hotels.com, then tick Free cancellation and set a price range." },
                { title: "Pick the list.", body: "Open the List tab and choose the results list. Hotels.com uses a Load more button, so the panel offers Load more." },
                { title: "Set the loads.", body: "Choose Collect more pages, set Stop after to 10 loads, and click Collect. Ten loads covers most city searches." },
                { title: "Sort and export.", body: "Sort by Total Price, filter rows to Guest Rating of 8 and above, and click Export as, then Google Sheets to share it with whoever is travelling with you." },
            ],
        },
        {
            id: "what-to-do",
            eyebrow: "After the run",
            heading: "What to do with the Hotels.com table",
            paragraphs: ["The results page does the first pass, so the sheet you export is the one you wanted."],
            points: [
                "Sort by Total Price, not Price Per Night, so taxes and fees are in the comparison.",
                "Filter rows to a Guest Rating of 8 or more, or to Booking Policies that mention free cancellation.",
                "Run the search again for other dates and match on Hotel URL in your sheet to see how much the price moves.",
                "Hide Sponsored rows, or keep the column and sort by it, so ads don't sit at the top of your shortlist.",
                "Export to Google Sheets for a shared trip plan, or Excel for your own records.",
            ],
        },
        {
            id: "shows",
            eyebrow: "Limits",
            heading: "What Hotels.com shows, and what it doesn't",
            paragraphs: [
                "The card carries the lead price for your dates, the total with taxes and fees as Hotels.com states it, the rating and review count, the location line, amenities, badges and policies. Room types, the full amenity list and the hotel's own fees are on the hotel's page.",
                "Prices are for the dates, guests and currency you set, so two runs with different dates are two different tables. Both stay in History.",
            ],
            table: {
                columns: ["You want", "Where it is", "How"],
                rows: [
                    ["Price per night, total, rating, policies", "The results card", "This page's steps"],
                    ["Room types, full amenity list", "The hotel's page", "Properties tab on one hotel"],
                    ["Prices for other dates", "A new search", "Change the dates, collect again, compare on Hotel URL"],
                    ["Resort fees paid at the hotel", "Often not on the card", "Check the hotel's page before booking"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with sorting on Hotels.com",
            paragraphs: ["Sorting on the site shows one order at a time and ads stay near the top. The table lets you sort by total price, then by rating, with the ads marked."],
            table: {
                columns: ["", "Sorting on Hotels.com", "Web Scraper Pro"],
                rows: [
                    ["What you see", "One sort order, ads mixed in", "Every hotel as a row, Sponsored marked"],
                    ["Comparing dates", "Search again and remember", "Two tables side by side, matched on Hotel URL"],
                    ["Effort", "Scrolling and tabs", "A few clicks, one run per date range"],
                ],
            },
        },
    ],
    screenshots: ["ext/results-hotels"],
    feature: "list-scraper",
    guide: "collect-every-page-of-results",
    useCase: "travel",
    related: [],
    faqs: [
        { q: "Is this Hotels.com scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "How do I scrape hotel prices from Hotels.com without coding?", a: "Search the city and dates on Hotels.com, open the side panel's List tab, pick the results list, choose Collect more pages and click Collect. The columns come out named, including the total with taxes." },
        { q: "Can I compare the same hotels across two date ranges?", a: "Yes. Run the search for each date range and export both. Hotel URL is the same across runs, so a lookup in your sheet lines them up." },
        { q: "Are taxes and fees in the total?", a: "The Total Price column is the card's total including taxes and fees as Hotels.com states it. Resort fees paid at the hotel may not be in it." },
        { q: "Does it collect the room types?", a: "The results card shows the lead price, not every room. Open a hotel's page and use the Properties tab for the details on that page." },
        { q: "Are the prices in my currency?", a: "In whatever currency Hotels.com shows you. Set it on the site before collecting." },
        { q: "Does it collect member prices?", a: "Only when you're signed in, because it collects what you see. Sign in first if you want them." },
        { q: "Does it work on Expedia and Booking.com too?", a: "Booking.com and Tripadvisor have ready-made setups with named columns. Expedia is detected as a list without one, so its columns are named from the page's own labels." },
        { q: "Is scraping Hotels.com allowed?", a: "Hotels.com's terms restrict automated collection. Collect what you can see, for your own planning or research, and read the terms before reusing anything. Our plain-words explainer on web scraping and the law covers the rest; it isn't legal advice." },
    ],
};
