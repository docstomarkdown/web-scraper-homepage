import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the youtube.com pack in configs-prod/ (video cards on search results,
// channel video tabs and home feeds, including Shorts shelves; auto-scroll paging) and its column mapping (Title, URL,
// Video ID, Channel, Channel URL, Verified Channel, Views, Published, Duration, Type, Badges, Description, Chapters,
// Thumbnail URL, Playlist ID, Videos in Playlist). Comments and channel emails are not collected and must never be claimed.
// Draft until a real run's screenshots are in the visuals library.
// Title and headings target search phrases ("how to scrape youtube channels", "scrape youtube videos"), 2026-10-21.

export const youtube: ScraperPageContent = {
    slug: "youtube",
    category: "video",
    site: { name: "YouTube", url: "https://www.youtube.com" },
    meta: {
        title: "How to Scrape YouTube Channel Videos and Search Results, Free",
        description: "Open a channel's Videos tab or a YouTube search and get every video as a row: title, channel, views, date, duration, type and link, as far as the page scrolls. Free, no code.",
    },
    h1: "How to scrape YouTube channel videos and search results into a spreadsheet",
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
    screenshots: ["ext/results-youtube"],
    feature: "list-scraper",
    guide: "collect-youtube-search-results",
    useCase: "research",
    related: [],
    faqs: [
        { q: "Is this YouTube scraper free?", a: "Yes. Web Scraper Pro is free to use today, with every feature included and no account to create." },
        { q: "How do I scrape a YouTube channel's full video list?", a: "Open the channel's Videos tab, pick the list, choose Collect more pages, and let the run scroll to the end. Sort the sheet by Views or Published afterwards." },
        { q: "Does it scrape YouTube comments?", a: "No. Comments aren't part of the setup. A video's comment list is detected like any other list, without named columns, so check the columns on a small run first." },
        { q: "Can I scrape emails from YouTube channels?", a: "No. Channel contact emails sit behind a verification on the About page, and the extension never completes one for you. Many channels link their own website; collect contacts there instead." },
        { q: "Can I compare several topics?", a: "Run a search per topic and export each; History keeps every run. Or search each topic in its own tab and ask chat to combine the lists into one table." },
        { q: "Why are the views rounded?", a: "They're what the card shows, such as 48K, saved as numbers. A video's own page shows the exact count." },
        { q: "Does it collect Shorts?", a: "Yes, as rows with Type set to Short. Filter the Type column to keep or drop them." },
        { q: "Is scraping YouTube allowed?", a: "YouTube's terms restrict automated collection. Collect public listings for your own research and read the terms before reusing anything. This isn't legal advice." },
    ],
};
