// What's new: one entry per released version, newest first. Facts come from chrome-extension-source/DECISIONS.md and the
// release commits ("Version 1.3.0" on 2026-10-19, "Release 1.2.0 prep" on 2026-09-28); the date is the release build's date.
// Only shipped behaviour belongs here. Cloud runs, MCP and the API are "coming soon" on their own pages, not entries.

export interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    intro: string;
    /** Each change in one or two sentences, user-facing, with the page that explains it. */
    changes: { text: string; href?: string }[];
}

export const changelog: ChangelogEntry[] = [
    {
        version: "1.3.0",
        date: "2026-10-19",
        title: "Emails arrive in the same Google Maps run, and chat handles more of the job",
        intro: "A Google Maps search now reads each business's own website while it collects, so emails, website phone numbers and social links land in the same table. Chat collects every page of a list, tidies the last collection, and combines searches into one table.",
        changes: [
            { text: "Google Maps leads come with contact details. During a Google Maps run, each business's website and one linked Contact or About page are read, and Emails, Website phones, Faxes and one column per social network are added to its row. On by default; turn it off in Settings → Results, or say \"no emails\" in chat.", href: "/blog/web-scraper-pro-1-3-0-emails-in-the-same-maps-run" },
            { text: "Add contact details to any saved table with a Website column, from the button on its results page. Yellow Pages tables don't qualify yet; use Bulk scrape → Collect contacts → Use saved data for those.", href: "/email-extractor" },
            { text: "Bulk Google Maps runs read each lead's website during the run too, the same way the side panel does.", href: "/bulk-scraper" },
            { text: "Chat asks how many businesses to collect once, on one card (20, 50, 100, 200 or a number you type), then remembers your answer. Change it in Settings → Businesses per chat search.", href: "/ai-chat" },
            { text: "Chat collects every page. After collecting the page you're on, a What next card offers Collect every page, run with the List tab's own paging.", href: "/ai-chat" },
            { text: "Chat tidies the last collection from any tab (\"only name and phone, sorted by rating\"), and its downloads match what the results page shows.", href: "/export-to-google-sheets" },
            { text: "Chat combines a conversation's searches or lists into one new table, from a card.", href: "/ai-chat" },
            { text: "Google Maps leads are saved best rated first; products stay in the site's order. Both are a choice in Settings → Results.", href: "/blog/web-scraper-pro-1-3-0-emails-in-the-same-maps-run" },
            { text: "Repeated rows are left out by default. Sponsored rows and leads without a website stay in unless you choose otherwise.", href: "/export-to-google-sheets" },
            { text: "Exports write prices, ratings and counts as numbers, and the format you used last comes first in the Export as menu.", href: "/export-to-google-sheets" },
            { text: "Collected text that looks like a spreadsheet formula is written to Sheets and CSV as text, never run as a formula." },
            { text: "Contact results are one row per website, with several values in a cell joined by a bar, and fax numbers in their own column.", href: "/email-extractor" },
            { text: "Results tables order their columns by the site's kind (store, directory, listings) when the site sets no order, and product pages can carry site-specific named fields.", href: "/product-scraper" },
            { text: "A Google Maps run paces itself unevenly and slows down when Google Maps stops answering, so long runs finish instead of being blocked.", href: "/blog/web-scraper-pro-1-3-0-emails-in-the-same-maps-run" },
            { text: "Notifications are an optional permission, asked for only when you turn them on." },
        ],
    },
    {
        version: "1.2.0",
        date: "2026-09-28",
        title: "Ask for the data in plain words",
        intro: "The Chat tab arrived: type what you want, and the extension collects it in your browser. Contact collection, in-panel support and reply ratings came with it.",
        changes: [
            { text: "The Chat tab: \"find dentists in Austin\", \"collect the products on this page\", \"only name and phone, as CSV\". Chat reads your request; the collecting happens in your browser.", href: "/ai-chat" },
            { text: "Contact collection reads a page and one linked Contact or About page for emails, phone numbers and social links, one row per website. Fax numbers get their own column.", href: "/email-extractor" },
            { text: "Support from the side panel: Contact founder opens the support form with the page and your message filled in, and files a ticket.", href: "/support" },
            { text: "Rate a chat reply with a thumbs up or down, so the answers improve." },
            { text: "No site setup is compiled into the extension any more; ready-made site setups update on their own without a new release.", href: "/scrapers" },
        ],
    },
];
