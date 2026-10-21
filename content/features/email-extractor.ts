import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20:
// - One row per website with Website, Email count, Emails, Phone count, Phones, Faxes, Social count and one column
//   per platform (LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest, Bluesky, Spotify, Google Maps),
//   several values joined with " | ": DECISIONS.md D-021, D-002
// - Deep scan of one linked Contact or About page: lib/content/contactExtraction.ts
// - Properties tab "Collect contacts"; chat "find contact emails on this site": lib/tools/capabilityTools.ts
// - Bulk → Collect contacts with pasted URLs, a CSV/TXT file, or a saved table's column: entrypoints/bulk/,
//   lib/bulk/executors/contactBulkExecutor.ts
// - "Add contact details" on any saved table with a Website column: DECISIONS.md D-024
// - Added to Maps rows in the same run: DECISIONS.md D-022

export const emailExtractor: FeaturePageContent = {
    page: getPage("email-extractor"),
    meta: {
        title: "Email Extractor: Emails, Phones and Social Links from Websites",
        description:
            "Collect the email addresses, phone numbers and social profiles a website publishes, from one site or a list of hundreds, into one row per website.",
    },
    eyebrow: "Emails and contacts",
    h1: "Get the contact details a website publishes",
    intro:
        "Open a company's website and collect its emails, phone numbers and social links in one click. Give it a list of websites and it does the same for each, one row per site.",
    lastUpdated: "2026-10-20",
    hero: "ext/results-contacts-one-site",
    sample: {
        caption: "Three websites after a bulk run. Every address and number is made up.",
        columns: ["Website", "Email count", "Emails", "Phones", "LinkedIn", "Instagram"],
        rows: [
            ["sampleplumbing.example", "2", "info@sampleplumbing.example | jobs@sampleplumbing.example", "(555) 010-2231", "linkedin.example/company/sample-plumbing", ""],
            ["riversidepipe.example", "1", "hello@riversidepipe.example", "(555) 010-4410 | (555) 010-4411", "", "instagram.example/riversidepipe"],
            ["quickfixplumbing.example", "0", "", "(555) 010-9043", "", "instagram.example/quickfixplumbing"],
        ],
    },
    fields: {
        heading: "One row per website",
        intro: "Each site you give it becomes one row. Where a site lists several addresses or numbers, the cell holds them all, separated by a bar, and the results page shows the first with a \"+N more\" button.",
        items: [
            { name: "Emails", description: "Every email address found on the page and, with the deep scan, on the site's Contact or About page. The Email count column says how many." },
            { name: "Phones and faxes", description: "Phone numbers in one column, fax numbers in their own, each with a count." },
            { name: "Social links", description: "One column per network: LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest, Bluesky, Spotify and a Maps listing, when the site links to them." },
            { name: "Website", description: "The site each row came from, so the table joins back to the list you started with." },
        ],
    },
    steps: {
        heading: "One site, three clicks",
        intro: "For a single website, open it and collect. For many, use a bulk run (below).",
        items: [
            {
                title: "Open the website",
                body: "Go to the company's site in Chrome, ideally its Contact or About page. Open the Web Scraper Pro side panel.",
            },
            {
                title: "Click Collect contacts",
                screenshot: "ext/properties-collect-contacts",
                body: "On the Properties tab, click Collect contacts. Or in the Chat tab, type \"find contact emails on this site\". The deep scan also reads one linked Contact or About page, where emails are usually listed.",
            },
            {
                title: "Export",
                body: "The results page shows one row for the site. Export it to Excel, CSV, JSON or Google Sheets, or keep collecting sites and export them together from History.",
            },
        ],
    },
    sections: [
        {
            id: "many-sites",
            screenshot: "ext/bulk-contacts-config",
            eyebrow: "A list of websites",
            heading: "Hundreds of sites in one run",
            paragraphs: [
                "Open the Bulk menu at the top of the side panel and choose Collect contacts. Paste the website addresses, one per line, or upload a CSV or TXT file. You can also pick a table you collected earlier, such as a directory list, and choose its website column.",
                "Choose emails, phone numbers and social links for all sites at once, turn on the deep scan, and click Start collecting. The sites are visited one after another in an embedded browser frame, and the table fills in as each one finishes. Stop keeps what it has.",
            ],
        },
        {
            id: "add-to-a-list",
            screenshot: "ext/results-add-contacts",
            eyebrow: "Add to a list you have",
            heading: "Contact details on the rows of any table",
            paragraphs: [
                "Any saved table with a Website column, from Maps, a directory or a list you collected, gets an Add contact details button on its results page. The emails, phones and social links land in new columns on the same rows, so there's nothing to join by hand.",
                "A Maps search does this during the run, on by default. See Maps leads.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It finds what a site publishes. Businesses that don't list an email on their site won't have one; you still get the phone and social links where they exist.",
            "Addresses shown as images, or hidden behind a contact form, can't be read.",
            "Social profile pages and directory pages given as the website aren't read as sources.",
            "Emails and phone numbers are personal data in many places. Collect only what you need, and check the rules where you are before you contact anyone.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Outreach lists", body: "Turn a list of company websites into a sheet with an email and phone for each, ready for a mail merge or CRM import." },
            { title: "Local business leads", body: "Collect businesses from Maps or a directory, then get each one's email and social links from its own site." },
            { title: "Partner and supplier research", body: "Find the right contact on dozens of supplier sites without opening each one." },
            { title: "Keeping records current", body: "Re-run the same list later and compare which contacts changed." },
        ],
    },
    faqs: [
        {
            q: "Where do the emails come from?",
            a: "From the website itself: the page you open, plus one linked Contact or About page when the deep scan is on. It doesn't guess addresses or look them up elsewhere.",
        },
        {
            q: "How many websites can I run at once?",
            a: "As many as you paste or upload. Sites are visited one at a time, so a long list takes a while; the table fills in as it goes and you can stop at any point and keep the rows.",
        },
        {
            q: "Can I add emails to a list I already collected?",
            a: "Yes. Open the table from History and click Add contact details. It needs a column named Website. Maps lists get this during the run unless you turn it off.",
        },
        {
            q: "Does it verify the emails?",
            a: "No. It collects the addresses the site shows. Use your email tool's verification before a campaign.",
        },
        {
            q: "Is this included in the plan?",
            a: "Yes. One plan, Pro, includes contact details on single sites, bulk runs and every export format.",
        },
    ],
    related: ["maps-leads", "bulk-scraper", "list-scraper", "export-to-google-sheets", "ai-chat"],
};
