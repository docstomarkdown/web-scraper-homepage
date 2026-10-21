import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-20: Google Maps columns (Business Name, Category, Rating, Review Count,
// Address, Operating Hours, Phone, Website, Map URL) from the google-maps pack in configs-prod/; contact columns added in
// the same run (DECISIONS.md D-022); chat count card 50/100/200 or a typed number up to 200 (D-026); best rated first and
// repeats left out (D-031, D-032); pacing and timings from D-034 (20 businesses: about 30 s without contact details,
// 75 s with) and the feature page (50 with emails about four minutes, 200 about fifteen).
// Draft until a real run's screenshots are in the visuals library and lastVerified is set from that run.
// 2026-10-21: title targets the search phrase ("scrape google maps business listings"); the site says "Google Maps".
// The feature page /maps-leads owns "how to scrape google maps for business leads"; this page is the column-level sibling.
// 2026-10-21 (later): deepened with worked example, recipes, caps and a comparison. Verify before publishing: the
// "around 120 results per search" figure (from the Maps guide), the Yelp-style "Open now" wording in the searches table
// is only an example query and claims nothing about the product.

export const maps: ScraperPageContent = {
    slug: "maps",
    category: "maps-and-directories",
    site: { name: "Google Maps", url: "https://www.google.com/maps" },
    meta: {
        title: "How to Scrape Google Maps Listings with Phone and Email",
        description: "Turn a Google Maps search into a spreadsheet: name, category, rating, reviews, address, hours, phone and website for every business, plus the emails from each one's own site. Free Chrome extension.",
    },
    h1: "How to scrape Google Maps business listings with phone, website and emails",
    intro: "Search Google Maps for a type of business in a place and click once. Every listing becomes a row with its rating, address, phone and website. The emails and social links from each business's own site are added in the same run.",
    status: "draft",
    lastVerified: "2026-10-20",
    version: "1.3.0",
    sample: {
        caption: "A search for dentists, after export. Names, numbers and emails are made up.",
        columns: ["Business Name", "Rating", "Phone", "Website", "Emails"],
        rows: [
            ["Bright Smile Dental", "4.8", "(555) 010-2231", "brightsmile.example", "hello@brightsmile.example"],
            ["Lakeside Family Dentistry", "4.6", "(555) 010-4410", "lakesidefd.example", ""],
            ["Northside Orthodontics", "4.9", "(555) 010-7782", "northsideortho.example", "info@northsideortho.example"],
        ],
    },
    fields: {
        heading: "What you get for every business",
        intro: "Nine columns from the Google Maps listing, plus contact details from the business's own website.",
        items: [
            { name: "Business Name", description: "The name as Google Maps shows it." },
            { name: "Category", description: "The business type on the listing, such as Dentist." },
            { name: "Rating", description: "The star rating, saved as a number you can sort by." },
            { name: "Review Count", description: "How many reviews the place has." },
            { name: "Address", description: "The full street address." },
            { name: "Operating Hours", description: "The opening hours on the listing." },
            { name: "Phone", description: "The listed phone number." },
            { name: "Website", description: "The business's own site." },
            { name: "Map URL", description: "A link back to the place, so you can check any row." },
            { name: "Emails, Website phones, Faxes", description: "Read from the business's website and its contact page during the run." },
            { name: "Social links", description: "One column per network found on the website: LinkedIn, Instagram, Facebook and more." },
        ],
    },
    steps: {
        heading: "How to scrape Google Maps listings in three steps",
        items: [
            {
                title: "Search Google Maps",
                body: "Search for a type of business in a place, such as dentists in Springfield. Then click the Web Scraper Pro icon and open the List tab.",
                points: ["Or type it in the Chat tab: Find dentists in Austin.", "Chat asks how many you want: 50, 100, 200, or a number you type."],
            },
            {
                title: "Click Collect places from this map",
                body: "The table fills in as the list scrolls. Leave \"Also collect contact details from each business's website\" ticked and the emails and social links arrive in the same run.",
                points: ["Keep the tab in front. The tab's title counts the businesses as they come in.", "50 businesses with emails take about four minutes. 200 take about fifteen.", "Click Stop at any time. What's collected is kept."],
            },
            {
                title: "Export",
                body: "Open the results, keep the columns you want, and export to Excel, CSV, JSON or Google Sheets. The list is saved in History too.",
                points: ["Or type with the results tab in front: Only name, phone, website and rating, sorted by rating."],
            },
        ],
    },
    notes: {
        heading: "Specific to Google Maps",
        items: [
            "Google Maps shows a limited number of results per search, usually around 120. Search smaller areas or narrower categories and run them together in Bulk.",
            "In chat, one search collects up to 200 businesses. The side panel keeps going until Google Maps reaches the end.",
            "Businesses are saved best rated first, and a place that appears twice is kept once. Both can be changed in Settings → Results.",
            "Many small businesses publish no email. Those rows keep their phone and website.",
            "It collects what Google Maps shows publicly. It doesn't sign in or reveal hidden details.",
        ],
    },
    emptyWhen: [
        { column: "Website", when: "The business has no website listed on Google Maps. Its emails and social columns stay empty too." },
        { column: "Emails", when: "The website publishes no email as text, or only behind a form or an image." },
        { column: "Website phones, Faxes", when: "The website lists no phone beyond the one Google Maps shows, or no fax." },
        { column: "LinkedIn, Instagram and the other social columns", when: "No business in the run had that network. A column appears only when at least one row has a value." },
        { column: "Operating Hours", when: "The listing shows no hours." },
        { column: "Rating, Review Count", when: "A new listing with no reviews yet." },
    ],
    pushback: [
        "A run opens businesses at an uneven pace and slows down when Google Maps stops answering. A long run finishes instead of being cut off.",
        "If Google Maps shows a verification page, the run stops. Complete it in the tab and start the search again.",
        "One search returns at most 200 businesses in chat. Search by neighbourhood or zip code and let chat combine the searches.",
    ],
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three searches worth running",
            paragraphs: [
                "A Google Maps search is a type of business plus a place. The narrower the place, the more of the area you cover, because Google Maps stops at around 120 results however big the city is.",
                "These three shapes cover most jobs. Change the trade and the town to yours.",
            ],
            table: {
                columns: ["Search", "Why", "Columns to keep"],
                rows: [
                    ["dentists in Austin, TX 78704", "A zip code keeps the list under the cap, so you get every dentist in that part of town", "Business Name, Rating, Review Count, Phone, Emails"],
                    ["roofing contractors near Denver", "Trades with few reviews and no website are the classic lead for an agency", "Business Name, Phone, Website, Review Count"],
                    ["coffee shops in Brooklyn", "Opening hours and review counts side by side show who the busy competitors are", "Business Name, Rating, Review Count, Operating Hours, Address"],
                ],
                caption: "Run each as its own search; chat can combine them into one table afterwards.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Fifty dentists in Austin, with emails, in about four minutes",
            paragraphs: ["This is what a typical run looks like from the first click to the exported file. The numbers come from measured runs on version 1.3.0; your network and the time of day move them a little."],
            steps: [
                { title: "Type the search in chat.", body: "Find dentists in Austin. A card asks how many: choose 50, leave emails and social links on, and click Start." },
                { title: "Watch the tab title.", body: "Google Maps opens in a tab and the title counts up, 1 of 50, 2 of 50, as each place is opened and its website read in the background." },
                { title: "Wait about four minutes.", body: "Twenty businesses without contact details take about half a minute; with contact details, each one adds a few seconds for its website and contact page." },
                { title: "Read the result card.", body: "Chat reports 50 businesses, how many had an email, and offers the next count up. The rows are already in History." },
                { title: "Export.", body: "Click Export as on the results page, or type Only name, phone, website and emails as Excel in chat." },
            ],
        },
        {
            id: "recipes",
            eyebrow: "After the run",
            heading: "What to do with the table",
            paragraphs: ["The results page is a small spreadsheet of its own. Four moves cover most lead lists."],
            points: [
                "Find businesses without a website: click Filter rows and keep rows where Website is empty. That list is the pitch for an agency that builds websites.",
                "Rank by social proof: click the Review Count header to sort, then keep the top or bottom of the list. Low counts in a busy category are businesses that need marketing.",
                "Hide what you won't use: hover a column header and click the trash icon for Map URL, Operating Hours or the social columns you don't need, before you export.",
                "Repeat next month: run the same search, export both tables, and compare on Map URL. New rows are businesses that opened or started listing; missing ones closed or moved.",
            ],
        },
        {
            id: "caps",
            eyebrow: "Limits",
            heading: "What Google Maps shows, and what it doesn't",
            paragraphs: [
                "The extension reads the listing panel the way you would. What Google Maps keeps behind a click or a sign-in stays there.",
                "Three things decide how much a run returns.",
            ],
            table: {
                columns: ["What", "On Google Maps", "In your table"],
                rows: [
                    ["Results per search", "Around 120, however many businesses exist in the city", "Every result shown; for more, search smaller areas"],
                    ["Emails", "Never shown on Google Maps", "Read from each business's own website and contact page, when it publishes one"],
                    ["Review text", "Shown per place, behind a click", "Not collected; Rating and Review Count are"],
                    ["Repeated listings", "The same place can appear twice as the list scrolls", "Kept once, unless you turn Skip repeated businesses off"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with copying from Google Maps by hand",
            paragraphs: [
                "The run beats copying by hand on every count that matters, and the difference grows with the list. Fifty businesses by hand is an afternoon; with emails it's a week of opening websites.",
                "The one thing the run can't do is read a phone number that only appears after a click on the listing, which is rare on Google Maps.",
            ],
            table: {
                columns: ["", "By hand", "With the extension"],
                rows: [
                    ["50 businesses with phone and website", "About two hours", "About a minute"],
                    ["Emails for those 50", "A week of visiting websites", "The same run, about four minutes in all"],
                    ["Repeat next month", "Start again", "Run the search again, compare on Map URL"],
                ],
                caption: "Hand timings are a rough estimate for one person copying rows into a sheet.",
            },
        },
    ],
    screenshots: ["ext/list-tab-maps-collect", "ext/results-maps-with-contacts"],
    feature: "maps-leads",
    guide: "get-local-business-leads-from-maps",
    useCase: "lead-generation",
    related: ["yellow-pages", "justdial", "bbb"],
    faqs: [
        { q: "Is this Google Maps scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "Do I need a Google Maps API key?", a: "No. It works on the Google Maps website in your own browser." },
        { q: "Can I scrape Google Maps reviews as well?", a: "The rating and review count, yes. Review text isn't collected from Google Maps." },
        { q: "Why do some rows have no email?", a: "Google Maps never lists emails. They come from each business's own website, and many small businesses publish none. Those rows keep the phone and website from Google Maps." },
        { q: "How many businesses can I get from one search?", a: "In chat, up to 200. From the side panel, as many as Google Maps shows before it reaches the end of its results, usually around 120. For more, split a city into smaller searches." },
        { q: "Can I collect only businesses without a website?", a: "Yes. On the results page, click Filter rows and keep rows where Website is empty." },
        { q: "Does it add the same business twice?", a: "No. A place that appears again while the list scrolls is kept once." },
        { q: "How long does a Google Maps run take?", a: "About half a minute for 20 businesses without contact details. With emails on, 50 businesses take about four minutes and 200 about fifteen." },
        { q: "Is scraping Google Maps allowed?", a: "You collect what Google Maps shows publicly, in your own browser, at a person's pace. Google's terms restrict automated collection, and anti-spam and privacy laws apply to how you contact people. Our plain-words explainer at /web-scraping-legal covers the rules; it isn't legal advice." },
    ],
};
