import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against chrome-extension-source on 2026-11-10:
// - Columns: configs-prod/site-column-mappings/youtube.com.json (Title, URL, Type, Video ID, Playlist ID, Channel, Channel
//   URL, Verified Channel, Views, Published, Duration, Videos in Playlist, Playlist Preview, Description, Badges, Chapters,
//   Thumbnail, Thumbnail URL).
// - lib/platform/hooks/youtube.ts: Views keep the card's rounding ("48K", "1.2M"; " views" dropped); Type is Video, Short,
//   Playlist, Mix, Course or Podcast; Verified Channel is "Yes"; sponsored cards are dropped.
// - Views aren't written as numbers in files (lib/utils/fileNumbers.ts covers Price, Original Price, Rating, Review Count),
//   and the results page sorts by the number before any letter (lib/utils/sortValues.ts), so this page tells readers to
//   convert K and M in their sheet before sorting or averaging.
// - Paging: configs-prod/youtube.com.json, mode autoScroll; "Auto scroll detected", "Collect to end":
//   components/scraper/ListTab.tsx. Bulk scrape's Auto scroll: entrypoints/bulk/main.tsx. Chat combines collections:
//   lib/tools/combineCollections.ts.
// - Comments aren't in the setup; the comments guide is written conditionally. Channel emails are never read.
// - Not stated, because only a run could confirm them: run times, whether a channel's Shorts tab is found as one list.
// Title and headings target search phrases ("how to scrape youtube channels", "scrape youtube videos"), 2026-10-21.

export const youtube: ScraperPageContent = {
    slug: "youtube",
    category: "video",
    site: { name: "YouTube", url: "https://www.youtube.com" },
    meta: {
        title: "How to Scrape a YouTube Channel's Videos into a Spreadsheet",
        description: "Open a channel's Videos tab or a YouTube search and get every video as a row: title, channel, views, date, duration and link. Free, no code.",
    },
    h1: "How to scrape a YouTube channel's videos into a spreadsheet",
    intro: "Open a channel's Videos tab or run a search. Pick the list in the side panel and get one row per video with title, channel, views, date, duration and link. Compare a whole topic by views in a sheet.",
    allowed: "YouTube's terms restrict automated access, and its Data API is the route it offers developers, with a daily quota. This page reads the channel page you have open, in your own browser, at a person's pace, for your own research; titles and counts are public, and the videos stay on YouTube. Read [Is web scraping legal?](/web-scraping-legal) first; it isn't legal advice.",
    status: "draft",
    lastVerified: "2026-11-10",
    version: "1.3.0",
    sample: {
        caption: "A search for trail running shoe reviews, after export. Titles, channels and numbers are made up.",
        columns: ["Title", "Channel", "Views", "Published", "Duration"],
        rows: [
            ["Trail Runner 2 review after 500 miles", "Summit Trails", "48K", "3 months ago", "12:41"],
            ["Best trail shoes for wide feet", "Peak Form", "131K", "1 year ago", "9:08"],
            ["Stop buying the wrong trail shoes", "Ridge Running", "22K", "2 weeks ago", "0:48"],
        ],
    },
    fields: {
        heading: "What you get for every video",
        intro: "A search, a channel page and a feed give the same columns, and a column the card doesn't show stays empty.",
        items: [
            { name: "Title, URL, Video ID", description: "The video's title, its link and its id." },
            { name: "Channel, Channel URL, Verified Channel", description: "Who published it, the channel link, and whether it carries the verified mark." },
            { name: "Views, Published, Duration", description: "The view count as the card rounds it, such as 48K, the relative date YouTube shows, and the length." },
            { name: "Type and Badges", description: "Video, Short, Playlist, Mix, Course or Podcast, and labels such as New or 4K." },
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
                body: "Click the Web Scraper Pro icon and open the List tab. Choose the videos list, then Collect more pages and Auto scroll; the panel shows Auto scroll detected. Click Collect to end.",
                points: ["Click Stop whenever you have enough. The rows so far are kept."],
            },
            {
                title: "Review and export",
                body: "Remove the columns you don't need. Then click Export as and choose Excel, CSV, JSON or Google Sheets.",
                points: ["Or type in chat with the results tab in front: Only title, channel, views and url.", "Views stay rounded, such as 48K or 1.2M. Turn them into numbers in your sheet before you sort or average them."],
            },
        ],
    },
    notes: {
        heading: "Good to know about YouTube",
        items: [
            "Views and dates are what the card shows: rounded counts such as 48K and relative dates such as 3 months ago. Sorting Views on the results page reads the number before the letter, so 1.2M sorts below 48K; convert K and M in your sheet for a true order.",
            "A very large channel takes a while to scroll through. Stop keeps what it has.",
            "Comments aren't part of the YouTube setup, and channel email addresses and subscriber lists aren't collected. Business emails sit behind a verification on the About page and aren't read.",
            "Search results mix videos, Shorts and playlists. Filter the Type column to the kind you want.",
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
                { title: "Pick the list.", body: "Open the List tab and choose the videos list. Choose Collect more pages and Auto scroll; the panel shows Auto scroll detected." },
                { title: "Let it scroll.", body: "Click Collect to end. The page scrolls until the list ends; click Stop whenever you have enough, and the rows so far are kept." },
                { title: "Sort and export.", body: "Hide Thumbnail URL and Description, and click Export as, then Excel. In the sheet, turn Views such as 48K into numbers, then sort and average them." },
            ],
        },
        {
            id: "what-to-do",
            eyebrow: "After the run",
            heading: "What to do with the YouTube table",
            paragraphs: ["The results page does the first pass, so the sheet you export is the one you wanted."],
            points: [
                "Turn Views into numbers in your sheet and sort to find the channel's best videos, then check Published to see whether they're old or recent.",
                "Filter the Type column to Video, or to Short, so the two formats don't mix in your averages.",
                "In your sheet, divide total views by the number of videos for the channel's average views per video: the number a sponsor asks about, not the subscriber count.",
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
                "Comments are a separate list on the watch page and aren't part of the YouTube setup. If the List tab finds them as a list, they collect with columns named from the page; the YouTube comments guide covers that. Channel email addresses sit behind a verification on the About page and aren't read.",
            ],
            table: {
                columns: ["You want", "Where it is", "How"],
                rows: [
                    ["Title, channel, views, date, duration", "The card", "This page's steps"],
                    ["Exact views, likes, full description", "The video's page", "Open the video"],
                    ["Comments", "The watch page, as a list", "The YouTube comments guide"],
                    ["A channel's email", "Behind a verification", "Not collected; use the channel's own website"],
                ],
            },
        },
        {
            id: "channels",
            eyebrow: "Many channels",
            heading: "A list of channels at once",
            paragraphs: [
                "For 10 channels, paste each channel's Videos tab address into Bulk scrape, one per line. The YouTube setup applies to every one, so the columns match across channels, and the Channel column says which channel each video came from.",
                "On the Configure step, choose Auto scroll. The run happens in your browser, one channel after another, and Stop keeps what has arrived.",
            ],
        },
        {
            id: "api",
            eyebrow: "Compared",
            heading: "The YouTube Data API's quota, or the extension",
            paragraphs: [
                "YouTube's Data API gives developers exact counts and the full description through an API key, inside a daily quota set by Google. The extension needs no key: it reads the public cards you can see, with the rounded views and relative dates they show, and nothing more than the page shows.",
                "If you need exact view counts for a few videos, open each video's page. If you need thousands of exact counts every day, the API is the right tool, quota and all.",
            ],
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
    useCase: "research",
    related: [],
    faqs: [
        { q: "Is this YouTube scraper free?", a: "Yes. Web Scraper Pro is free. There's no paid plan, every feature is included, and there's no account to create." },
        { q: "How do I scrape a YouTube channel's full video list?", a: "Open the channel's Videos tab, pick the list in the side panel, choose Collect more pages and Auto scroll, and let the run scroll to the end. Then export it and work with Views and Published in your sheet." },
        { q: "Can I scrape YouTube search results too?", a: "Yes. Run the search with YouTube's filters, pick the results list, and let it scroll. Search results mix videos, Shorts and playlists, so filter the Type column afterwards." },
        { q: "Does it scrape YouTube comments?", a: "Not with this setup. If the List tab finds a video's comments as a list, they collect with columns named from the page; the YouTube comments guide covers that." },
        { q: "Can I scrape emails from YouTube channels?", a: "No. Channel contact emails sit behind a verification on the About page, and the extension never completes one for you. Many channels link their own website; collect contacts there instead." },
        { q: "Can I compare several topics or channels?", a: "Run a search or channel per tab and export each; History keeps every run. Or ask chat to combine the lists in the conversation into one table." },
        { q: "Why are the views rounded?", a: "They're what the card shows, such as 48K, kept as written. A video's own page shows the exact count." },
        { q: "Does it collect Shorts?", a: "Yes, as rows with Type set to Short, from a search or a channel's Shorts tab. Filter the Type column to keep or drop them." },
        { q: "Is scraping YouTube allowed?", a: "YouTube's terms restrict automated collection. Collect public listings for your own research and read the terms before reusing anything. Our plain-words explainer on web scraping and the law covers the rest; it isn't legal advice." },
    ],
};
