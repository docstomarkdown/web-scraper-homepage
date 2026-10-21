import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: justdial.com pack columns (Business Name, URL, Rating, Rating Count,
// Address, Categories, Phone, Highlights, Services) in configs-prod/; the pack's default paging is auto scroll.
// Draft until a real run's screenshots and date exist.
// 2026-10-21: title targets the search phrase ("extract business phone numbers from justdial"); the site says "Google Maps".
// 2026-10-21 (later): deepened. Verify before publishing: how many listings load per scroll, when Justdial asks to sign in,
// and which numbers sit behind Show number on the day of the run.

export const justdial: ScraperPageContent = {
    slug: "justdial",
    category: "maps-and-directories",
    site: { name: "Justdial", url: "https://www.justdial.com" },
    meta: {
        title: "How to Scrape Justdial Business Listings and Phone Numbers",
        description: "Turn a Justdial search into a spreadsheet: business name, rating, address, categories, phone, highlights and services for every listing, across every page. Free Chrome extension, no code.",
    },
    h1: "How to scrape Justdial business listings and phone numbers",
    intro: "Search Justdial for a service in a city and get every listing as a row. Rating, address, phone and services come in named columns, page after page.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for AC repair, after export. Businesses are made up.",
        columns: ["Business Name", "Rating", "Address", "Phone", "Services"],
        rows: [
            ["Cool Air Services", "4.4", "RS Puram, Coimbatore", "+91 55500 10001", "Split AC, Window AC"],
            ["Sri Comfort Cooling", "4.1", "Gandhipuram, Coimbatore", "+91 55500 10002", "Servicing, Gas refill"],
            ["Breeze Point AC Care", "3.9", "Saibaba Colony, Coimbatore", "", "Installation"],
        ],
    },
    fields: {
        heading: "What you get for every listing",
        intro: "Nine columns, as Justdial lists them.",
        items: [
            { name: "Business Name", description: "The name on the listing." },
            { name: "URL", description: "A link to the Justdial page." },
            { name: "Rating and Rating Count", description: "The rating and how many people rated it." },
            { name: "Address", description: "The area and city." },
            { name: "Categories", description: "The categories it's listed under." },
            { name: "Phone", description: "The phone number shown on the card." },
            { name: "Highlights and Services", description: "The highlights and services shown on the listing." },
        ],
    },
    steps: {
        heading: "How to scrape Justdial in three steps",
        items: [
            {
                title: "Search Justdial",
                body: "Search for a service in a city, such as dentists in Chennai. Then click the Web Scraper Pro icon and open the List tab.",
                points: ["Justdial may ask you to sign in or verify after a few pages. Do it in the tab and collect again."],
            },
            {
                title: "Collect the pages",
                body: "Choose Collect more pages, then Auto scroll or Next page, whichever the panel found. Set Stop after and click Collect.",
                points: ["Keep the tab in front while it runs.", "Click Stop at any time. What's collected is kept."],
            },
            {
                title: "Export",
                body: "Keep the columns you want and export to Excel, CSV, JSON or Google Sheets. The list is saved in History too.",
                points: ["For emails, run Bulk scrape → Collect contacts over the Website column with Use saved data."],
            },
        ],
    },
    notes: {
        heading: "Specific to Justdial",
        items: [
            "Justdial sometimes asks you to sign in or verify after many pages. Do that in the tab and carry on.",
            "Some phone numbers show only after a click or a sign-in. The extension collects what the card shows and never clicks through for you.",
            "Listings given as the website for a business are directory pages, so contact details aren't read from them.",
        ],
    },
    emptyWhen: [
        { column: "Phone", when: "Justdial hides some numbers behind a Show number button. Only numbers shown on the card are collected." },
        { column: "Rating, Rating Count", when: "The listing has no ratings yet." },
        { column: "Services, Highlights", when: "The card lists none." },
    ],
    pushback: [
        "If the site shows a verification page, the run stops and the panel says so. Complete the check in the tab, click Rescan, and collect again.",
        "A site that slows down when many pages load fast shows fewer results or an error page. Collect in smaller runs and come back later. History keeps each run.",
        "When the site changes its layout, the list is found again on the next visit. Column names may change; rename them once on the results page.",
    ],
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three searches worth running",
            paragraphs: [
                "Justdial is a service plus an Indian city, and it goes deeper into local trades than Google Maps does in many towns. The Services and Highlights columns are the reason to use it: they say what each business does, not only what it's called.",
                "These three shapes cover most jobs. Change the trade and the city to yours.",
            ],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["AC repair in Coimbatore", "Trades with a phone on the card and a Services column that says split, window or gas refill", "Business Name, Phone, Services, Rating"],
                    ["dentists in Chennai", "Rating and Rating Count on every card, so the sheet ranks clinics by social proof", "Business Name, Rating, Rating Count, Address"],
                    ["packers and movers in Pune", "Highlights show the extras (insurance, packing material) that decide a quote", "Business Name, Phone, Highlights, Address"],
                ],
                caption: "Justdial searches are service names, so \"AC repair\" finds more than \"air conditioning technician\".",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "AC repair in Coimbatore, from search to sheet",
            paragraphs: ["Justdial loads more listings as you scroll, so the run scrolls for you. Here is a typical run on version 1.3.0; the counts are what the search showed on the day."],
            steps: [
                { title: "Search AC repair in Coimbatore.", body: "Open the List tab. The listing cards appear as List 1 with the count on the first screen." },
                { title: "Choose Collect more pages.", body: "The panel reads Auto scroll detected. Set Stop after to the number of loads you want, or choose to the end, and click Collect." },
                { title: "Keep the tab in front.", body: "The page scrolls, more cards load, and the tab title counts the rows. If Justdial asks you to sign in or verify, do it in the tab, click Rescan, and collect again; the rows so far are kept." },
                { title: "Check the Phone column.", body: "Numbers hidden behind Show number arrive empty. Open those few listings yourself from the URL column if you need them." },
                { title: "Export.", body: "Export as → Excel, or type Only name, phone and services in chat with the results tab in front." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: ["Four moves on the results page turn a Justdial run into a list you can call or compare."],
            points: [
                "Keep the ones you can call now: Filter rows, Phone is not empty. Hidden numbers can be fetched by hand later from the URL column.",
                "Rank by ratings: click the Rating Count header to sort, then keep the top twenty. A high count with a low rating is a business with unhappy customers and a reason to switch.",
                "Split by service: Filter rows on the Services column for the one you sell to, such as gas refill, and export that slice.",
                "Compare with Google Maps: run the same service on Google Maps, export both, and match on Business Name. Justdial often lists trades that have no Google Maps listing at all.",
            ],
        },
        {
            id: "caps",
            eyebrow: "Limits",
            heading: "What Justdial shows, and what it doesn't",
            paragraphs: ["Justdial keeps some of its data behind a click, and it asks visitors to sign in or verify after a while. The extension collects what the card shows and never clicks through or signs in for you."],
            table: {
                columns: ["What", "On Justdial", "In your table"],
                rows: [
                    ["Listings", "Load as you scroll", "Every card loaded, up to the Stop after you set"],
                    ["Phone numbers", "Some on the card, some behind Show number", "The numbers on the card; hidden ones stay empty"],
                    ["Emails and websites", "Rarely on the card; the URL column points to Justdial's own page", "Collect contacts works only on a business's own website, so most rows have none"],
                    ["Sign-in and verification", "Asked after many pages", "The run stops; complete it in the tab and collect again"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with reading Justdial by hand",
            paragraphs: [
                "Justdial has no export and the cards are long, so copying even one screen into a sheet takes a while. Collecting wins on the first page already.",
                "The limit is the same for both: a number behind Show number needs a click. The run leaves it empty; by hand, you click. For a short list of the best-rated businesses, that's a few clicks.",
            ],
            table: {
                columns: ["", "By hand", "With the extension"],
                rows: [
                    ["One screen of listings", "Ten minutes of copying", "A few seconds"],
                    ["Services and highlights per business", "Retyping", "Their own columns"],
                    ["Hidden phone numbers", "One click each", "Empty; open the URL for the few you need"],
                ],
                caption: "Hand timings are a rough estimate for one person copying rows into a sheet.",
            },
        },
    ],
    screenshots: ["ext/list-tab-justdial"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["maps", "yellow-pages", "bbb"],
    faqs: [
        { q: "Is this Justdial scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "Why are some phone numbers missing?", a: "Justdial shows some numbers only after a click or a sign-in. The extension collects the numbers shown on the card; it doesn't click through or sign in for you." },
        { q: "Can I get emails for the businesses?", a: "Where a listing has the business's own website, yes. Run Bulk scrape → Collect contacts with Use saved data over the table. Directory pages given as the website are skipped." },
        { q: "How many listings can I collect?", a: "As many loads as you set under Stop after. If Justdial asks you to verify, complete it in the tab and collect again; the rows so far are kept." },
        { q: "Does it work in every city?", a: "Yes. The setup reads the listing cards, which are the same across Justdial's cities and categories." },
        { q: "Can I export to Excel or Google Sheets?", a: "Yes. Export as offers Excel, CSV, JSON and Google Sheets." },
        { q: "How do I scrape Justdial data for several cities?", a: "Paste the search addresses, one per city, into Bulk scrape. Each is collected in turn with the same page settings, and View merged table puts them together with a Source URL column." },
        { q: "Can I scrape Justdial reviews?", a: "The rating and rating count on the card, yes. Review text sits on each listing's own page and isn't collected in a list run." },
        { q: "Is scraping Justdial allowed?", a: "You collect public listing cards in your own browser, at a person's pace, and the extension never signs in or clicks past a Show number button for you. Justdial's terms and India's rules on unsolicited calls decide what you may do with the list; our explainer at /web-scraping-legal covers the basics. It isn't legal advice." },
    ],
};
