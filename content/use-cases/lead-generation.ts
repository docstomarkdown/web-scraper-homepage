import type { UseCasePageContent } from "@/components/pages/UseCasePage";
import { getPage } from "@/config/pages";

// Persona: Arjun, lead-generation agency owner (docs/personas.md). Facts checked against release 1.3.0 on 2026-10-20:
// Maps run with contact details (DECISIONS.md D-022, D-026), Bulk Maps and contacts (D-023), Add contact details on a
// saved table (D-024), results page filters and exports (lib/tools/arrangeResults.ts, lib/tools/exportDataset.ts).
// Draft until the workflow screenshots exist.

export const leadGeneration: UseCasePageContent = {
    page: getPage("lead-generation", "use-case"),
    meta: {
        title: "Lead Generation: Local Business Lists with Emails and Phones",
        description: "Build a list of local businesses by niche and city, with phone, website, email and social links, from Maps and directories, ready for a CRM or a mail merge.",
    },
    h1: "Build a lead list by niche and city, with emails",
    intro: "Search Maps for a type of business in a place and get every result with its phone, website, email and social links in one run. Then repeat it for ten more cities in bulk.",
    status: "draft",
    lastUpdated: "2026-10-20",
    job: {
        heading: "A client-ready list, without the copy-paste",
        paragraphs: [
            "You need a list of a specific kind of business in a specific place, with a way to reach each one. The names and phone numbers are on Maps and in directories; the emails are on each business's own website; and the client wants it all in one sheet by tomorrow.",
            "Web Scraper Pro does the three parts in one run: it collects the businesses, reads each one's website for contact details, and saves the rows in a table you can filter and export.",
        ],
    },
    workflow: {
        heading: "From a search to a sheet",
        steps: [
            { title: "Search Maps and collect", body: "Type \"Find dentists in Austin\" in the side panel's Chat tab. A card asks how many businesses to collect and whether to add contact details; pick 100 and keep contact details on.", feature: "maps-leads", screenshot: "ext/chat-maps-count-card" },
            { title: "Watch the emails arrive", body: "During the run, each business's website and contact page is read in the background and the emails, phone numbers and social links are added to its row. The progress line counts how many have an email so far.", feature: "email-extractor", screenshot: "ext/chat-maps-progress" },
            { title: "Clean the list", body: "On the results page, keep only the columns the client wants and the rows with a phone or an email: type \"only name, phone, email and website, rows with an email\" in chat, or use the column and filter controls.", feature: "export-to-google-sheets", screenshot: "ext/results-filtered-leads" },
            { title: "Repeat for every city", body: "Paste ten Maps search links into Bulk runs, one per city, and let them run in turn. The Collection overview merges them into one table with a Location column.", feature: "bulk-scraper" },
            { title: "Export", body: "Export to Excel for the client, CSV for the CRM, or straight into a Google Sheet. The collection stays in History for next month's refresh.", feature: "export-to-google-sheets" },
        ],
    },
    sample: {
        caption: "Three rows of a finished list. Names, numbers and addresses are made up.",
        columns: ["Business Name", "Phone", "Website", "Emails", "Rating", "Address"],
        rows: [
            ["Bright Smile Dental", "(555) 010-2231", "brightsmile.example", "hello@brightsmile.example", "4.8", "101 Main St, Austin"],
            ["Lakeside Family Dentistry", "(555) 010-4410", "lakesidefd.example", "", "4.6", "42 Lake Rd, Austin"],
            ["Northside Orthodontics", "(555) 010-7782", "northsideortho.example", "info@northsideortho.example", "4.9", "7 Oak Ave, Austin"],
        ],
    },
    sites: [{ name: "Maps", page: "maps" }, { name: "Yellow Pages", page: "yellow-pages" }, { name: "Justdial", page: "justdial" }, { name: "BBB", page: "bbb" }, { name: "Any directory with a list" }],
    cantDo: {
        heading: "What it won't do",
        items: [
            "Promise an email for every business: only businesses that publish one on their site get one.",
            "Verify emails. Run your email tool's verification before a campaign.",
            "Collect from LinkedIn, Facebook groups or other sites that need a login to see anything.",
            "Collect people's personal profiles. It's for businesses and their public contact details.",
        ],
    },
    guides: ["get-local-business-leads-from-maps", "get-maps-leads-with-emails", "get-emails-from-a-list-of-websites"],
    faqs: [
        { q: "How many leads can I collect in a day?", a: "In chat, up to 200 businesses per Maps search; with contact details on, 200 take about 15 minutes. Run several searches in bulk for more. Sites can slow down accounts that load many pages quickly, so split big jobs into smaller runs." },
        { q: "Can I add emails to a list I already have?", a: "Yes. Any saved table with a Website column gets an Add contact details button on its results page." },
        { q: "Is it legal to use these leads?", a: "The details are what the businesses publish. Whether you may contact them depends on the anti-spam and privacy laws where you and they are. Check them before a campaign; this isn't legal advice." },
    ],
};
