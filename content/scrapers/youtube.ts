import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the youtube.com pack in configs-prod/ (video cards on search results,
// channel video tabs and home feeds, including Shorts shelves; auto-scroll paging) and its column mapping (Title, URL,
// Video ID, Channel, Channel URL, Verified Channel, Views, Published, Duration, Type, Badges, Description, Chapters,
// Thumbnail URL, Playlist ID, Videos in Playlist). Comments and channel emails are not collected and must never be claimed.
// Draft until a real run's screenshots are in the visuals library.
// Title and headings target search phrases ("how to scrape youtube channels", "scrape youtube videos"), 2026-10-21.

// Verify on a real run before publishing (added with the deeper sections, 2026-10-21): run time for a 300-video channel (a few minutes is assumed), and that a channel's Shorts tab is detected as a list the same way as the Videos tab.
export const youtube: ScraperPageContent = {
    slug: "youtube",
    category: "video",
    site: { name: "YouTube", url: "https://www.youtube.com" },
    meta: {
        title: "How to Scrape a YouTube Channel's Videos into a Spreadsheet",
        description: "Open a channel's Videos tab or a YouTube search and get every video as a row: title, channel, views, date, duration, type and link, as far as the page scrolls. Free, no code.",
    },
    h1: "How to scrape a YouTube channel's videos into a spreadsheet",
    intro: "Open a channel's Videos tab or run a search. Pick the list in the side panel and get one row per video with title, channel, views, date, duration and link. Sort a whole topic by views in a sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for trail running shoe reviews, after export. Titles, channels and numbers are made up.",
        columns: ["Title", "Channel", "Views", "Published", "Duration"],
        rows: [
            ["Trail Runner 2 review after 500 miles", "Summit Trails", "48,200", "3 months ago", "12:41"],
            ["Best trail shoes for wide feet", "Peak Form", "131,000", "1 year ago", "9:08"],
            ["Stop buying the wrong trail shoes", "Ridge Running", "22,900", "2 weeks ago", "0:48"],
        ],
    },
    fields: {
        heading: "What you get for every video",
        intro: "A search, a channel page and a feed give the same columns, and a column the card doesn't show stays empty.",
        items: [
            { name: "Title, URL, Video ID", description: "The video's title, its link and its id." },
            { name: "Channel, Channel URL, Verified Channel", description: "Who published it, the channel link, and whether it carries the verified mark." },
            { name: "Views, Published, Duration", description: "The view count as a number, the relative date YouTube shows, and the length." },
            { name: "Type and Badges", description: "Video, Short, live or playlist, and labels such as New or 4K." },
            { name: "Description and Chapters", description: "The snippet on the card and, where listed, its chapters." },
            { name: "Thumbnail URL", description: "The card's thumbnail." },
            { name: "Playlist ID, Videos in Playlist", description: "For playlist cards, the playlist's id and how many videos it holds." },
        ],
    },
    steps: {
        heading: "How to scrape YouTube in three steps",
        items: [
            {
                title: "Open the channel or the search",
                body: "Open a channel's Videos or Shorts tab, or run a search with the filters you want: upload date, type, duration. The extension collects what the page shows.",
                points: ["Example: trail running shoe review, filtered to this year.", "A channel's Videos tab lists every public upload as you scroll."],
            },
            {
                title: "Pick the list and let it scroll",
                body: "Click the Web Scraper Pro icon and open the List tab. Choose the videos list, then Collect more pages. YouTube loads more as you scroll, so the panel shows Auto scroll detected. Click Collect to end.",
                points: ["Click Stop whenever you have enough. The rows so far are kept."],
            },
            {
                title: "Review and export",
                body: "Sort by Views and remove the columns you don't need. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only title, channel, views and url, sorted by views."],
            },
        ],
    },
    notes: {
        heading: "Good to know about YouTube",
        items: [
            "Views and dates are what the card shows: rounded counts such as 48K and relative dates such as 3 months ago. Views are saved as numbers.",
            "A very large channel takes a while to scroll through. Stop keeps what it has.",
            "Comments, channel email addresses and subscriber lists aren't collected. Business emails sit behind a verification on the About page and aren't read.",
            "Search results mix videos, Shorts, playlists and channels. Filter the Type column to the kind you want.",
            "YouTube's terms restrict automated collection. Collect for your own research, such as topic analysis or a creator shortlist, and check the terms first.",
        ],
    },
    emptyWhen: [
        { column: "Playlist ID, Videos in Playlist", when: "The card is a video, not a playlist." },
        { column: "Chapters", when: "The card lists no chapters." },
        { column: "Description", when: "Search cards show a snippet; channel pages often don't." },
        { column: "Badges", when: "No New, 4K or similar label." },
        { column: "Verified Channel", when: "The channel has no verification mark." },
    ],
    pushback: [
        "YouTube loads results as you scroll, with no end on busy searches. Stop when you have enough. The rows so far are kept.",
        "A very large channel takes a while to scroll through. Sort by date on YouTube first if you only want recent videos.",
    ],
    sections: [
        {
            id: "searches",
            eyebrow: "Where to start",
            heading: "Three YouTube runs worth doing",
            paragraphs: ["Each is one run. Use YouTube's own filters first, because the extension collects what the page shows and scrolls."],
            table: {
                columns: ["Run", "Why", "Columns to keep"],
                rows: [
                    ["A channel's Videos tab, to the end", "A creator or an agency sizing up a channel: how often it posts and what gets views.", "Title, Views, Published, Duration, URL"],
                    ["A search, filtered to this year", "A researcher mapping who covers a topic and how well.", "Title, Channel, Views, Published, Type"],
                    ["A channel's Shorts tab", "Comparing formats: do Shorts or long videos carry the channel?", "Title, Views, Published, Duration, Type"],
                ],
                caption: "Views and dates are what the card shows: rounded counts and relative dates. The exact count is on each video's page.",
            },
        },
        {
            id: "worked-example",
            eyebrow: "Worked example",
            heading: "One channel's every video, start to finish",
            paragraphs: ["This is the run a creator does on a competitor, or an agency does before a sponsorship call. The row count is the channel's upload count."],
            steps: [
                { title: "Open the channel.", body: "Go to the channel and open its Videos tab. Sort by Latest if you only want recent uploads." },
                { title: "Pick the list.", body: "Open the List tab and choose the videos list. YouTube loads more as you scroll, so the panel shows Auto scroll detected." },
                { title: "Let it scroll.", body: "Choose Collect more pages and click Collect to end. A channel with 300 videos takes a few minutes; click Stop whenever you have enough." },
                { title: "Sort and export.", body: "Sort by Views, hide Thumbnail URL and Description, and click Export as, then Excel. Views are numbers, so the sheet sorts and averages them." },
            ],
        },
        {
            id: "what-to-do",
            eyebrow: "After the run",
            heading: "What to do with the YouTube table",
            paragraphs: ["The results page does the first pass, so the sheet you export is the one you wanted."],
            points: [
                "Sort by Views to find the channel's best videos, then by Published to see whether they're old or recent.",
                "Filter the Type column to Video, or to Short, so the two formats don't mix in your averages.",
                "In your sheet, divide total views by the number of videos for the channel's typical view count: the number a sponsor wants, not the subscriber count.",
                "Run several searches in their own tabs and type in chat: Combine the lists in this conversation into one table.",
                "Export to Google Sheets to share a creator shortlist, or CSV for your own analysis.",
            ],
        },
        {
            id: "shows",
            eyebrow: "Limits",
            heading: "What YouTube shows, and what it doesn't",
            paragraphs: [
                "The card carries the title, channel, rounded view count, relative date, duration, type and badges. Exact view counts, likes, the full description and the comments are on the video's page.",
                "Comments are a separate list on the watch page and are collected like any list, without named columns; the YouTube comments guide shows that run. Channel email addresses sit behind a verification on the About page and aren't read.",
            ],
            table: {
                columns: ["You want", "Where it is", "How"],
                rows: [
                    ["Title, channel, views, date, duration", "The card", "This page's steps"],
                    ["Exact views, likes, full description", "The video's page", "Properties tab on one video"],
                    ["Comments", "The watch page, as a list", "The YouTube comments guide"],
                    ["A channel's email", "Behind a verification", "Not collected; use the channel's own website"],
                ],
            },
        },
        {
            id: "compared",
            eyebrow: "Compared",
            heading: "Compared with YouTube's own tools",
            paragraphs: ["YouTube Studio shows you your own channel in depth and nothing about anyone else's. For another channel, or a topic across channels, the public cards are what there is, and the table is the honest comparison."],
            table: {
                columns: ["", "YouTube Studio", "Web Scraper Pro"],
                rows: [
                    ["Whose channel", "Yours only", "Any public channel or search"],
                    ["What you get", "Exact analytics", "The public cards as rows: title, views, date, duration"],
                    ["Effort", "Built in", "A few clicks, one run per channel or search"],
                ],
            },
        },
    ],
    screenshots: ["ext/results-youtube"],
    feature: "list-scraper",
    guide: "collect-youtube-search-results",
    useCase: "research",
    related: [],
    faqs: [
        { q: "Is this YouTube scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "How do I scrape a YouTube channel's full video list?", a: "Open the channel's Videos tab, pick the list in the side panel, choose Collect more pages, and let the run scroll to the end. Sort the sheet by Views or Published afterwards." },
        { q: "Can I scrape YouTube search results too?", a: "Yes. Run the search with YouTube's filters, pick the results list, and let it scroll. Search results mix videos, Shorts and playlists, so filter the Type column afterwards." },
        { q: "Does it scrape YouTube comments?", a: "Not with this setup. A video's comment list is detected like any other list, without named columns; the YouTube comments guide shows that run." },
        { q: "Can I scrape emails from YouTube channels?", a: "No. Channel contact emails sit behind a verification on the About page, and the extension never completes one for you. Many channels link their own website; collect contacts there instead." },
        { q: "Can I compare several topics or channels?", a: "Run a search or channel per tab and export each; History keeps every run. Or ask chat to combine the lists in the conversation into one table." },
        { q: "Why are the views rounded?", a: "They're what the card shows, such as 48K, saved as numbers. A video's own page shows the exact count." },
        { q: "Does it collect Shorts?", a: "Yes, as rows with Type set to Short, from a search or a channel's Shorts tab. Filter the Type column to keep or drop them." },
        { q: "Is scraping YouTube allowed?", a: "YouTube's terms restrict automated collection. Collect public listings for your own research and read the terms before reusing anything. Our plain-words explainer on web scraping and the law covers the rest; it isn't legal advice." },
    ],
};
