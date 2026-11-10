import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against chrome-extension-source on 2026-11-10:
// - Columns: configs-prod/site-column-mappings/justdial.com.json (Business Name, Business URL, Image Preview, Image URL,
//   Listing ID, Rating, Rating Count, Badges, Address, Categories, Phone, Highlights, Review Snippet, Review Suggestions,
//   Response Time, Recent Enquiries, Services). There is no Website column, so this page doesn't send Justdial rows to
//   Add contact details (entrypoints/dataviewer/AddWebsiteContactsButton.tsx needs a Website column).
// - Paging: configs-prod/justdial.com.json, mode autoScroll; "Auto scroll detected" and "Collect to end" (no page limit for auto scroll): components/scraper/ListTab.tsx.
// - Collecting count on a tab group: lib/background/scrapeTabIndicator.ts. Bulk scrape modes: entrypoints/bulk/main.tsx.
// - Not stated, because only a run could confirm them: listings per scroll, when Justdial asks to sign in or verify,
//   which numbers sit behind Show number.
// 2026-10-21: title targets the search phrase ("extract business phone numbers from justdial"); the site says "Google Maps".

export const justdial: ScraperPageContent = {
    slug: "justdial",
    category: "business-directories",
    site: { name: "Justdial", url: "https://www.justdial.com" },
    meta: {
        title: "How to Scrape Justdial Business Listings and Phone Numbers",
        description: "Turn a Justdial search into a spreadsheet: name, rating, address, categories, phone and services for every listing. Free Chrome extension, no code.",
    },
    h1: "How to scrape Justdial business listings and phone numbers",
    intro: "Search Justdial for a service in a city and get every listing as a row. Rating, address, phone and services come in named columns, page after page.",
    allowed: "Justdial's terms restrict automated collection, and some phone numbers show only after a click or a sign-in, which the extension never does for you. This page reads the listings you have open, in your own browser, at a person's pace, for your own research or prospecting; India's rules on unsolicited calls and messages decide how you may contact the businesses. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
    status: "draft",
    lastVerified: "2026-11-10",
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
        intro: "The Justdial setup names these columns. Listing ID, Badges, Review Snippet and Response Time also appear when the card shows them.",
        items: [
            { name: "Business Name", description: "The name on the listing." },
            { name: "Business URL", description: "A link to the business's page on Justdial." },
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
                points: ["If Justdial asks you to sign in or verify, do it in the tab, click Rescan, and collect again."],
            },
            {
                title: "Collect the pages",
                body: "Choose Collect more pages, then Auto scroll; the panel shows Auto scroll detected. Click Collect to end, and click Stop when you have enough.",
                points: ["Keep the tab in front while it runs.", "Click Stop at any time. What's collected is kept."],
            },
            {
                title: "Export",
                body: "Keep the columns you want and export to Excel, CSV, JSON or Google Sheets. The list is saved in History too.",
                points: ["The cards give no website column. For emails, paste the businesses' own websites into Bulk scrape and choose Collect contacts."],
            },
        ],
    },
    notes: {
        heading: "Specific to Justdial",
        items: [
            "If Justdial asks you to sign in or verify, do that in the tab and carry on.",
            "Some phone numbers show only after a click or a sign-in. The extension collects what the card shows and never clicks through for you.",
            "Business URL is Justdial's own page for the business, not the business's website. The setup has no Website column.",
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
                "A Justdial search is a service plus an Indian city. The Services and Highlights columns are the reason to use it: they say what each business does, not only what it's called.",
                "These three shapes cover common jobs. Change the trade and the city to yours.",
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
            paragraphs: ["Justdial loads more listings as you scroll, so the run scrolls for you. Here is each step on one search; how many rows you get depends on the search and when you click Stop."],
            steps: [
                { title: "Search AC repair in Coimbatore.", body: "Open the List tab. The listings appear as a card under Choose from lists we found, with the number loaded so far." },
                { title: "Choose Collect more pages, then Auto scroll.", body: "The panel reads Auto scroll detected. Click Collect to end." },
                { title: "Keep the tab in front.", body: "The page scrolls, more cards load, and the tab's group, named Collecting, shows the count. If Justdial asks you to sign in or verify, do it in the tab, click Rescan, and collect again; the rows so far are kept." },
                { title: "Check the Phone column.", body: "Numbers hidden behind Show number arrive empty. Open those few listings yourself from the Business URL column if you need them." },
                { title: "Export.", body: "Export as → Excel, or type Only name, phone and services in chat with the results tab in front." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: ["Four moves on the results page turn a Justdial run into a list you can call or compare."],
            points: [
                "Keep the ones you can call now: Filter rows, Phone is not empty. Hidden numbers can be fetched by hand later from the Business URL column.",
                "Rank by ratings: click the Rating Count header to sort, then keep the top 20. A high count with a low rating is a business with unhappy customers and a reason to switch.",
                "Split by service: Filter rows on the Services column for the one you sell to, such as gas refill, and export that slice.",
                "Compare with a Google Maps list: export both and match on Phone or Business Name; a business on one list and not the other is worth a look. For the Maps list, [Maps Scraper Pro](https://mapsscraper.pro/) is the same engine, Maps only.",
            ],
        },
        {
            id: "caps",
            eyebrow: "Limits",
            heading: "What Justdial shows, and what it doesn't",
            paragraphs: ["Justdial keeps some of its data behind a click, and it can ask visitors to sign in or verify. The extension collects what the card shows and never clicks through or signs in for you."],
            table: {
                columns: ["What", "On Justdial", "In your table"],
                rows: [
                    ["Listings", "Load as you scroll", "Every card loaded, until the list ends or you click Stop"],
                    ["Phone numbers", "Some on the card, some behind Show number", "The numbers on the card; hidden ones stay empty"],
                    ["Emails and websites", "Not columns in the setup; Business URL points to Justdial's own page", "Paste the businesses' own websites into Bulk scrape → Collect contacts"],
                    ["Sign-in and verification", "Asked at times", "The run stops; complete it in the tab and collect again"],
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
                    ["One screen of listings", "Copying each card by hand", "One run"],
                    ["Services and highlights per business", "Retyping", "Their own columns"],
                    ["Hidden phone numbers", "One click each", "Empty; open the Business URL for the few you need"],
                ],
            },
        },
    ],
    screenshots: ["ext/list-tab-justdial"],
    feature: "list-scraper",
    useCase: "lead-generation",
    related: ["yellow-pages", "bbb"],
    faqs: [
        { q: "Is this Justdial scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "Why are some phone numbers missing?", a: "Justdial shows some numbers only after a click or a sign-in. The extension collects the numbers shown on the card; it doesn't click through or sign in for you." },
        { q: "Can I get emails for the businesses?", a: "Not from the cards: the setup has no Website column, and Business URL is Justdial's own page. Paste the businesses' own websites into Bulk scrape and choose Collect contacts." },
        { q: "How many listings can I collect?", a: "As many as load before the list ends or you click Stop. If Justdial asks you to verify, complete it in the tab and collect again; the rows so far are kept." },
        { q: "Does it work in every city?", a: "The setup is for justdial.com's listing cards, whatever the city or category. Check the columns on the first screen of a new search." },
        { q: "Can I export to Excel or Google Sheets?", a: "Yes. Export as offers Excel, CSV, JSON and Google Sheets." },
        { q: "How do I scrape Justdial data for several cities?", a: "Paste the search addresses, one per city, into Bulk scrape. Each is collected in turn with the same page settings, and View merged table puts them together in one table." },
        { q: "Can I scrape Justdial reviews?", a: "The rating and rating count on the card, yes. Review text sits on each listing's own page and isn't collected in a list run." },
        { q: "Is scraping Justdial allowed?", a: "You collect public listing cards in your own browser, at a person's pace, and the extension never signs in or clicks past a Show number button for you. Justdial's terms and India's rules on unsolicited calls decide what you may do with the list; our explainer at /web-scraping-legal covers the basics. It isn't legal advice." },
    ],
};
