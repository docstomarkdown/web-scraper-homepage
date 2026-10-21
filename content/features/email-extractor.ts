import type { FeaturePageContent } from "@/components/pages/FeaturePage";
import { getPage } from "@/config/pages";

// Facts checked against release 1.3.0 (branch test-branch-1) on 2026-10-20, re-read 2026-10-21:
// - One row per website with Website, Email count, Emails, Phone count, Phones, Faxes, Social count and one column
//   per platform (LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest, Bluesky, Spotify, Google Maps),
//   several values joined with " | "; a site with nothing found keeps its row with counts of 0: DECISIONS.md D-021
// - The site's page first, then one linked Contact or About page, always (no checkbox for the deep scan):
//   lib/content/contactExtraction.ts; capture sheet "Deep scan is always on; all three types on by default"
// - Properties tab "Collect contacts"; chat "Find contact emails on this site": lib/chat/suggestions.json
// - Bulk → Collect contacts with pasted URLs, a CSV/TXT file, or a saved table's column; a page that doesn't load
//   within 30 s is skipped: entrypoints/bulk/, lib/bulk/executors/contactBulkExecutor.ts (pageReadyTimeoutMs)
// - "Add contact details" / "Update contact details" on any saved table with a Website column, disabled with a
//   reason otherwise: DECISIONS.md D-024
// - Added to Google Maps rows in the same run, on by default: DECISIONS.md D-022, D-023
// - Reading websites never reaches a private network address: D-037
// Verify before publishing: seconds per site in a bulk run ("a few seconds" per site, "a few minutes" for 200)
// are from the guides, not measured here.
// Title and headings target what people type into Google ("extract email addresses from website",
// "how to extract emails from any website", "email scraper from website"): youtube-research/AUTOSUGGEST.md and
// SEARCH_QUERIES.md in the strategy repo. This page owns "extract email addresses from any website"; the guides own
// "scrape emails from a website into Excel" and "extract emails from a list of websites in bulk".

export const emailExtractor: FeaturePageContent = {
    page: getPage("email-extractor"),
    meta: {
        title: "How to Extract Email Addresses from Any Website, Free",
        description:
            "Open a website and collect the emails, phone numbers and social links it publishes in one click. Give it a list of hundreds of websites and get one row per site. Free Chrome extension, no code.",
    },
    eyebrow: "Email extractor",
    h1: "How to extract email addresses from any website",
    intro:
        "Open a company's website and collect its emails, phone numbers and social links in one click. Give it a list of websites and it does the same for each, one row per site. Free Chrome extension, no code.",
    lastUpdated: "2026-10-21",
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
                body: "Go to the company's site in Chrome. Any page works, because the extension also reads one linked Contact or About page, where emails are usually listed. Open the Web Scraper Pro side panel.",
                points: ["Starting on the Contact page saves nothing; the run finds it on its own."],
            },
            {
                title: "Click Collect contacts",
                body: "On the Properties tab, click Collect contacts. The page you're on is read first, then its Contact or About page. One site takes a few seconds.",
                points: [
                    "Or type in the Chat tab: Find contact emails on this site.",
                    "Emails, phone numbers and social links are all collected; there's nothing to tick for one site.",
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
        intro: "Each site becomes one row, in a fixed set of columns, so the table imports into a spreadsheet or a mail merge as one record per company.",
        items: [
            { name: "Website", description: "The site each row came from, so the table joins back to the list you started with." },
            { name: "Email count and Emails", description: "Every email address found on the page and on the site's Contact or About page. The count is a number you can filter on." },
            { name: "Phone count and Phones", description: "Phone numbers found as text, with a count." },
            { name: "Faxes", description: "Fax numbers in their own column, when a site lists one." },
            { name: "Social count and one column per network", description: "LinkedIn, Instagram, Facebook, X, YouTube, TikTok, Pinterest, Bluesky, Spotify and a Google Maps listing, each in its own column." },
        ],
    },
    sections: [
        {
            id: "worked-example",
            eyebrow: "A worked example",
            heading: "Forty supplier websites to one contact sheet",
            paragraphs: [
                "Say you have 40 supplier websites in a column of a spreadsheet and need an email and a phone for each. Here is the run, click by click.",
            ],
            steps: [
                { title: "Open Bulk scrape.", body: "Click the Bulk scrape icon at the top of the side panel and choose Collect contacts. A bulk page opens in a new tab." },
                { title: "Paste the sites.", body: "Choose Paste URLs and paste the 40 addresses, one per line. A chip reads 40 valid URLs detected. Click Continue." },
                { title: "Leave everything ticked.", body: "On the Configure step, Email addresses, Phone numbers and Social media links are on. Click Start collecting." },
                { title: "Watch the rows arrive.", body: "Sites are read one after another in the embedded browser, a few seconds each. A site that doesn't load within 30 seconds is skipped and keeps its row with counts of 0." },
                { title: "Filter and export.", body: "On the results page, click Filter rows and keep rows where Email count is more than 0. Export as Excel. The Website column lets you match the rows back to your original sheet." },
            ],
            table: {
                columns: ["What you had", "What you get", "Typical gap"],
                rows: [
                    ["40 website addresses", "40 rows: emails, phones, faxes, social links, with counts", "Some sites publish no email; their phone and social links still fill"],
                ],
            },
        },
        {
            id: "many-sites",
            screenshot: "ext/bulk-contacts-config",
            eyebrow: "A list of websites",
            heading: "How to extract emails from a list of websites",
            paragraphs: [
                "Click the Bulk scrape icon at the top of the side panel and choose Collect contacts. Paste the website addresses, one per line, or upload a CSV or TXT file. You can also pick a table you collected earlier and choose its website column with Use saved data.",
                "Leave emails, phone numbers and social links ticked and click Start collecting. The sites are visited one after another, and the table fills in as each one finishes. Stop keeps what it has.",
            ],
        },
        {
            id: "add-to-a-list",
            screenshot: "ext/results-add-contacts",
            eyebrow: "Add to a list you have",
            heading: "How to add emails to a list of businesses",
            paragraphs: [
                "Any saved table with a column named Website gets an Add contact details button on its results page. The emails, phones and social links land in new columns on the same rows, so there's nothing to join by hand.",
                "A Google Maps search does this during the run, on by default. A table without a Website column shows the button disabled, with a one-line reason, rather than hiding it.",
            ],
        },
        {
            id: "what-to-do-with-the-table",
            eyebrow: "After the run",
            heading: "What you can do with the table before you export",
            paragraphs: ["The counts are there so you can sort and filter without reading every cell."],
            table: {
                columns: ["You want", "Do this"],
                rows: [
                    ["Only sites that gave an email", "Filter rows where Email count is more than 0"],
                    ["Sites with a LinkedIn page, for a different kind of outreach", "Filter rows where LinkedIn is not empty"],
                    ["One email per row for a mail merge", "Export, then split the Emails column on the bar in your spreadsheet; the first address is usually the general one"],
                    ["Name, email and phone only", "Hover a column header and click the trash icon on the rest, or type in chat: Only website, emails and phones"],
                ],
            },
        },
        {
            id: "settings",
            eyebrow: "Settings",
            heading: "Where contact collection is switched on and off",
            paragraphs: ["Contact collection runs in four places. Three have a switch; the single-site run has none, because it reads everything."],
            table: {
                columns: ["Where", "What's collected", "Change it when"],
                rows: [
                    ["Properties tab, Collect contacts", "Emails, phones, faxes and social links, always", "Never; remove columns you don't need on the results page"],
                    ["Google Maps searches", "Settings → Results → Add emails from their websites, on by default", "You want a quick list of names and phones; or say \"no emails\" in a chat request"],
                    ["Bulk runs", "Email addresses, Phone numbers and Social media links, ticked per site on the Configure step", "A client asked for emails only"],
                    ["A saved table", "Add contact details runs with everything on; it reads Update contact details when the table already has them", "You want to refresh an older list"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with finding emails by hand, with a script, or with a finder tool",
            paragraphs: [
                "For a list of real companies whose sites you already have, reading the sites is the honest method: every address comes from a page the company published. Finder tools guess patterns and sell credits; scripts need a developer and break on every site that renders its contact page differently.",
            ],
            table: {
                columns: ["Method", "What you do", "Time for 100 sites", "Where it breaks"],
                rows: [
                    ["Web Scraper Pro", "Paste the sites into Bulk scrape, click Start", "A few minutes, in the background", "Sites that hide the email in an image or a form; sites that don't publish one"],
                    ["By hand", "Open each site, find the contact page, copy", "Half a day", "Fatigue, typos, no phone or social links unless you copy those too"],
                    ["A script", "Write a crawler and a pattern matcher, keep both working", "Minutes to run, hours to write", "Pages rendered by JavaScript; obfuscated addresses; blocks"],
                    ["An email finder", "Upload company names, spend credits", "Minutes", "Guessed addresses that bounce; per-lookup pricing; no phones or social links"],
                ],
            },
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
                "Reading never reaches a private network address, so an internal site on your office network returns nothing.",
            ],
        },
        {
            id: "doesnt-do",
            eyebrow: "Limits",
            heading: "What it doesn't do",
            paragraphs: ["Five things an email extractor is often expected to do that this one doesn't, on purpose or not yet."],
            points: [
                "It doesn't guess addresses. There's no first.last@ pattern filling; every email comes from a page.",
                "It doesn't verify addresses. Use your email tool's verification before a campaign.",
                "It doesn't crawl a whole domain. One page plus one linked Contact or About page per run; paste more pages into a bulk run for more.",
                "It doesn't read sites behind a sign-in it doesn't have. On a member site you're signed in to, it reads what you see.",
                "It doesn't send email or push to a sales tool. Export CSV and import it where you work.",
            ],
        },
        {
            id: "goes-wrong",
            eyebrow: "Troubleshooting",
            heading: "When it goes wrong",
            paragraphs: ["Four things that stop a contact run, and the fix for each."],
            points: [
                "Email count is 0 on a site that has an email. Open the site: the address is an image, a form, or on a page that isn't linked as Contact or About. Paste that page's address into a bulk run instead.",
                "Continue stays greyed out on the Upload step. No valid addresses were found. Each one needs to start with http or https, one per line.",
                "A site was skipped. It didn't load within 30 seconds, or it asked for a verification. Open it in a normal tab, then run it again on its own.",
                "The Add contact details button is disabled. The table has no column named Website. Rename the column that holds the sites to Website and reload the results page.",
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
            { title: "Local business leads", body: "Collect businesses from Google Maps or a directory, then get each one's email from its own site, in the same run." },
            { title: "Partner and supplier research", body: "Find the right contact on dozens of supplier sites without opening each one." },
            { title: "Keeping records current", body: "Re-run the same list later with Update contact details and compare which contacts changed." },
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
            q: "Does it find phone numbers too?",
            a: "Yes. Phone numbers and fax numbers found as text come in their own columns, each with a count, next to the phone a directory or Google Maps listed.",
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
        {
            q: "Is collecting emails from websites allowed?",
            a: "Reading a published business address is generally allowed; what you do with it is regulated. Anti-spam and privacy laws apply to outreach in most countries. Collect only what you need, and read our plain-words explainer on web scraping and the law. It isn't legal advice.",
        },
    ],
    related: ["maps-leads", "bulk-scraper", "list-scraper", "export-to-google-sheets", "ai-chat"],
};
