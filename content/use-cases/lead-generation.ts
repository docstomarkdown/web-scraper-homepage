import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Arjun, lead-generation agency owner (docs/personas.md), written so a first-time, non-technical reader can
// follow it too. Facts checked against release 1.3.0 on 2026-10-21: Google Maps run with contact details (DECISIONS.md D-022,
// D-026), Bulk Google Maps and contacts (D-023), Add contact details on a saved table (D-024), results page filters and exports
// (lib/tools/arrangeResults.ts, lib/tools/exportDataset.ts). Draft until the workflow screenshots exist.

export const leadGeneration: UseCasePageContent = {
    page: getPage("lead-generation", "use-case"),
    meta: {
        title: "Lead Generation: Local Business Lists with Emails and Phones",
        description: "Build a list of local businesses by type and city, with phone, website, email and social links, from Google Maps and business directories. Ready for your email tool or a spreadsheet.",
    },
    h1: "Get a list of local businesses, with phone numbers and emails",
    intro: "Type the kind of business and the city. In a few minutes you have a spreadsheet: one business per row, with the phone number, the website and the email from the business's own site.",
    status: "draft",
    lastUpdated: "2026-10-21",
    job: {
        heading: "The list you'd otherwise copy by hand",
        paragraphs: [
            "You need every dentist in Austin, or every plumber in Denver, with a way to reach each one. The names and phone numbers are on Google Maps. The emails are on each business's own website. Copying them one by one takes a day.",
            "Web Scraper Pro does it for you, inside your Chrome browser. It collects the businesses from Google Maps, visits each business's website for the email, and puts everything in one table you can save as an Excel file.",
            "You don't need to know anything technical. You type what you want in plain words, and you watch the rows appear.",
        ],
    },
    workflow: {
        heading: "From one search to a finished spreadsheet",
        intro: "Five steps. The first three take about ten minutes for a hundred businesses.",
        steps: [
            {
                title: "Type the business type and the city",
                body: "Click the Web Scraper Pro icon in Chrome. A panel opens on the right side of the browser. In the Chat tab, type a sentence like the one below and press Enter.",
                points: ["Example: Find dentists in Austin", "A card asks how many businesses you want: 20, 50, 100 or 200. Pick one and click Start.", "Emails are collected too, unless you turn that off in Settings."],
                feature: "maps-leads",
                screenshot: "ext/chat-maps-count-card",
            },
            {
                title: "Watch the businesses and emails arrive",
                body: "Google Maps opens in a new tab and the extension works through the results on its own. For each business it also opens the business's website and reads the contact page. You can stop at any time and keep what it has found.",
                points: ["The panel counts the businesses as they come in, and how many have an email.", "Fifty businesses take about four minutes. Two hundred take about fifteen.", "Some businesses never publish an email. Those rows still have the phone number and the website."],
                feature: "email-extractor",
                screenshot: "ext/chat-maps-progress",
            },
            {
                title: "Keep only the columns and rows you need",
                body: "When the run finishes, click View results. The table opens in a new tab with one business per row. Tell it what to keep, in plain words, in the same chat.",
                points: ["Example: Only name, phone, email and website, rows with an email", "Columns you didn't name are hidden. Rows without an email are hidden too.", "You can also click a column's name to rename it, or the trash icon to remove it."],
                feature: "export-to-google-sheets",
                screenshot: "ext/results-filtered-leads",
            },
            {
                title: "Do the same for more cities",
                body: "Searched Austin and want Dallas and Houston too? Run a search for each city. Chat offers to combine the searches into one table. For ten or more cities, paste the Google Maps search links into Bulk scrape and they run one after another.",
                feature: "bulk-scraper",
            },
            {
                title: "Save the file",
                body: "Click Export as and choose Excel, CSV, or Google Sheets. The file opens with your columns, ready for your email tool or for a client. Every list is kept in History, so next month you can run it again and see what's new.",
                feature: "export-to-google-sheets",
                screenshot: "ext/results-export-menu",
            },
        ],
    },
    sample: {
        caption: "This is what three rows look like after you save the file.",
        columns: ["Business Name", "Phone", "Website", "Email"],
        rows: [
            ["Bright Smile Dental", "(555) 010-2231", "brightsmile.example", "hello@brightsmile.example"],
            ["Lakeside Dentistry", "(555) 010-4410", "lakeside-dental.example", ""],
            ["Northside Orthodontics", "(555) 010-7782", "northside.example", "info@northside.example"],
        ],
    },
    sites: [{ name: "Google Maps", page: "maps" }, { name: "Yellow Pages", page: "yellow-pages" }, { name: "Justdial", page: "justdial" }, { name: "BBB", page: "bbb" }, { name: "Any business directory" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Find an email for every business. It finds the emails businesses publish on their own websites. Many small businesses don't publish one, and those rows show the phone and website only.",
            "Check that an email address still works. Run your list through an email checking tool before you send a campaign.",
            "Collect from LinkedIn, Facebook or any site you have to sign in to see.",
            "Collect people's personal details. It collects businesses and the contact details they publish.",
        ],
    },
    guides: ["get-local-business-leads-from-maps", "get-maps-leads-with-emails", "get-emails-from-a-list-of-websites"],
    faqs: [
        { q: "Do I need to know anything technical?", a: "No. You type what you want, such as \"find dentists in Austin\", and click a few buttons. There is nothing to set up and no code." },
        { q: "How many businesses can I collect in one go?", a: "Up to 200 per search in chat. For more, search smaller areas or more specific business types, and combine the results." },
        { q: "How long does it take?", a: "About four minutes for 50 businesses with emails, and about fifteen minutes for 200. Without emails it's much faster." },
        { q: "Can I add emails to a list I already have?", a: "Yes. Any saved list with a Website column gets an Add contact details button on its results page. Click it and the emails fill in." },
        { q: "Is it legal to use these leads?", a: "The details are what the businesses publish about themselves. Whether you may contact them depends on the anti-spam and privacy laws where you and they are. Check them before a campaign; our guide to the law explains the basics, and it isn't legal advice." },
    ],
};
