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
// Title and headings target what people type into Google ("extract email addresses from website",
// "how to extract emails from any website", "email scraper from website"): youtube-research/AUTOSUGGEST.md and
// SEARCH_QUERIES.md in the strategy repo. Owner instruction 2026-10-21: titles start with "How to".

export const emailExtractor: FeaturePageContent = {
    page: getPage("email-extractor"),
    meta: {
        title: "How to Extract Email Addresses from Any Website: Free Extension",
        description:
            "Open a website and collect the emails, phone numbers and social links it publishes in one click. Give it a list of hundreds of websites and get one row per site. Free Chrome extension, no code.",
    },
    eyebrow: "Email extractor",
    h1: "How to extract email addresses from any website",
    intro:
        "Open a company's website and collect its emails, phone numbers and social links in one click. Give it a list of websites and it does the same for each, one row per site. Free Chrome extension, no code.",
    lastUpdated: "2026-10-20",
    hero: "ext/results-contacts-one-site",
    sample: {
        caption: "Three websites after a bulk run. Every address and number is made up.",
        columns: ["Website", "Emails", "Phones", "LinkedIn", "Instagram"],
        rows: [
            ["sampleplumbing.example", "info@sampleplumbing.example | jobs@sampleplumbing.example", "(555) 010-2231", "linkedin.example/company/sample-plumbing", ""],
            ["riversidepipe.example", "hello@riversidepipe.example", "(555) 010-4410 | (555) 010-4411", "", "instagram.example/riversidepipe"],
            ["quickfixplumbing.example", "", "(555) 010-9043", "", "instagram.example/quickfixplumbing"],
        ],
    },
    steps: {
        heading: "How to extract emails from a website in three steps",
        intro: "For a single website, open it and collect. For many websites, use a bulk run, described below.",
        items: [
            {
                title: "Open the website",
                body: "Go to the company's site in Chrome, ideally its Contact or About page. Open the Web Scraper Pro side panel.",
                points: ["Any page works. One linked Contact or About page is read as well."],
            },
            {
                title: "Click Collect contacts",
                body: "On the Properties tab, click Collect contacts. The deep scan also reads one linked Contact or About page, where emails are usually listed.",
                points: [
                    "Or type in the Chat tab: Find contact emails on this site.",
                    "One site takes a few seconds.",
                ],
                screenshot: "ext/properties-collect-contacts",
            },
            {
                title: "Export",
                body: "The results page shows one row for the site. Export it to Excel, CSV, JSON or Google Sheets, or keep collecting sites and export them together from History.",
                points: [
                    "Several values in one cell show the first with a +N more button. The file joins them with a bar.",
                ],
            },
        ],
    },
    fields: {
        heading: "What you get for every website",
        intro: "Each site becomes one row. Where a site lists several addresses or numbers, the cell holds them all.",
        items: [
            { name: "Emails", description: "Every email address found on the page and on the site's Contact or About page, with a count." },
            { name: "Phones and faxes", description: "Phone numbers in one column, fax numbers in their own, each with a count." },
            { name: "Social links", description: "One column per network: LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest, Bluesky, Spotify and a Google Maps listing." },
            { name: "Website", description: "The site each row came from, so the table joins back to the list you started with." },
        ],
    },
    sections: [
        {
            id: "many-sites",
            screenshot: "ext/bulk-contacts-config",
            eyebrow: "A list of websites",
            heading: "How to extract emails from a list of websites",
            paragraphs: [
                "Click the Bulk scrape icon at the top of the side panel and choose Collect contacts. Paste the website addresses, one per line, or upload a CSV or TXT file. You can also pick a table you collected earlier and choose its website column.",
                "Tick emails, phone numbers and social links, turn on the deep scan, and click Start collecting. The sites are visited one after another, and the table fills in as each one finishes. Stop keeps what it has.",
            ],
        },
        {
            id: "add-to-a-list",
            screenshot: "ext/results-add-contacts",
            eyebrow: "Add to a list you have",
            heading: "How to add emails to a list of businesses",
            paragraphs: [
                "Any saved table with a Website column gets an Add contact details button on its results page. The emails, phones and social links land in new columns on the same rows, so there's nothing to join by hand.",
                "A Google Maps search does this during the run, on by default.",
            ],
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Where contact collection is switched on and off",
            paragraphs: ["Contact collection runs in three places, and each has its own switch."],
            points: [
                "Google Maps searches: Settings → Results → Add emails from their websites, on by default.",
                "Bulk runs: on the Configure step, Email addresses, Phone numbers and Social media links are ticked per site.",
                "A saved table: the Add contact details button runs with everything on. It reads Update contact details when the table already has them.",
            ],
        },
        {
            id: "pushback",
            eyebrow: "When a site gives nothing back",
            heading: "Why a row can have a phone but no email",
            paragraphs: ["The extension reads what a website publishes as text. Some sites publish their email in a way that can't be read, and many small businesses publish none."],
            points: [
                "An email shown as an image, or hidden behind a contact form, isn't read.",
                "A social profile or a directory page given as the website isn't read as a source.",
                "Bulk runs read one site at a time with pauses, so a long list takes a while. The tab needs to stay open.",
            ],
        },
    ],
    limits: {
        heading: "Good to know",
        items: [
            "It finds what a site publishes. Businesses that don't list an email won't have one; you still get the phone and social links where they exist.",
            "Addresses shown as images, or hidden behind a contact form, can't be read.",
            "Emails and phone numbers are personal data in many places. Collect only what you need, and check the rules where you are before you contact anyone.",
        ],
    },
    useCases: {
        heading: "What people use it for",
        items: [
            { title: "Outreach lists", body: "A list of company websites becomes a sheet with an email and phone for each, ready for your email tool." },
            { title: "Local business leads", body: "Collect businesses from Google Maps or a directory, then get each one's email from its own site." },
            { title: "Partner and supplier research", body: "Find the right contact on dozens of supplier sites without opening each one." },
            { title: "Keeping records current", body: "Re-run the same list later and compare which contacts changed." },
        ],
    },
    faqs: [
        {
            q: "How do I extract emails from a website for free?",
            a: "Install Web Scraper Pro, open the website, and click Collect contacts on the Properties tab. The emails, phones and social links appear as one row you can export. It's free, with no account to create.",
        },
        {
            q: "Where do the emails come from?",
            a: "From the website itself: the page you open, plus one linked Contact or About page. It doesn't guess addresses or look them up elsewhere.",
        },
        {
            q: "Can it extract emails from a whole domain?",
            a: "One page plus one linked Contact or About page per run. For a whole site, paste its main pages into Bulk scrape → Collect contacts; the merged table holds every email found.",
        },
        {
            q: "How many websites can I run at once?",
            a: "As many as you paste or upload. Sites are visited one at a time, so a list of 200 websites takes a few minutes. You can stop at any point and keep the rows.",
        },
        {
            q: "Can it get emails from Google Maps?",
            a: "Yes. A Google Maps search reads each business's website while it collects, so the Emails column fills in the same run. For a list you saved earlier, click Add contact details on its results page.",
        },
        {
            q: "Does it verify the emails?",
            a: "No. It collects the addresses the site shows. Use your email tool's verification before a campaign.",
        },
        {
            q: "Is it an online tool or an extension?",
            a: "A Chrome extension. The pages are read in your own browser and nothing is uploaded, which is also why it works on pages you're signed in to.",
        },
        {
            q: "Why did it find a phone number but no email?",
            a: "The site publishes a phone as text and either no email or one it hides behind a form or an image. The extension never guesses an address.",
        },
    ],
    related: ["maps-leads", "bulk-scraper", "list-scraper", "export-to-google-sheets", "ai-chat"],
};
