import type { ScraperPageContent } from "@/components/pages/ScraperPage";

// Facts checked against release 1.3.0 on 2026-10-21: the youtube.com pack in configs-prod/ (video cards on search results,
// channel video tabs and home feeds, including Shorts shelves; auto-scroll paging) and its column mapping (Title, URL,
// Video ID, Channel, Channel URL, Verified Channel, Views, Published, Duration, Type, Badges, Description, Chapters,
// Thumbnail URL, Playlist ID, Videos in Playlist). Comments and channel emails are not collected and must never be claimed.
// Draft until a real run's screenshots are in the visuals library.

export const youtube: ScraperPageContent = {
    slug: "youtube",
    category: "video",
    site: { name: "YouTube", url: "https://www.youtube.com" },
    meta: {
        title: "YouTube Scraper: Search Results and Channel Videos to a Spreadsheet",
        description: "Collect a YouTube search or a channel's videos into a spreadsheet: title, channel, views, published date, duration, type and link, as far down the page as you scroll, with no code.",
    },
    h1: "Collect YouTube search results or a channel's videos",
    intro: "Run a search or open a channel's Videos tab, pick the list in the side panel, and get one row per video with title, channel, views, date, duration and link. Sort a whole topic by views in a sheet.",
    status: "draft",
    lastVerified: "2026-10-21",
    version: "1.3.0",
    sample: {
        caption: "A search for trail running shoe reviews, after export. Titles, channels and numbers are made up.",
        columns: ["Title", "Channel", "Views", "Published", "Duration", "Type", "URL"],
        rows: [
            ["Trail Runner 2 review after 500 miles", "Summit Trails", "48,200", "3 months ago", "12:41", "Video", "youtube.com/watch?v=example1"],
            ["Best trail shoes for wide feet", "Peak Form", "131,000", "1 year ago", "9:08", "Video", "youtube.com/watch?v=example2"],
            ["Stop buying the wrong trail shoes", "Ridge Running", "22,900", "2 weeks ago", "0:48", "Short", "youtube.com/shorts/example3"],
        ],
    },
    fields: {
        heading: "Sixteen columns from each video card",
        intro: "The columns come from the YouTube setup, so a search, a channel page and a feed give the same sheet. A column the card doesn't show stays empty.",
        items: [
            { name: "Title, URL, Video ID", description: "The video's title, its link and its id." },
            { name: "Channel, Channel URL, Verified Channel", description: "Who published it, their channel link, and whether the channel carries the verified mark." },
            { name: "Views, Published, Duration", description: "The view count as a number, the relative date YouTube shows, and the length." },
            { name: "Type and Badges", description: "Video, Short, live or playlist, and labels such as New or 4K." },
            { name: "Description and Chapters", description: "The snippet shown on the card and, where the card lists them, its chapters." },
            { name: "Thumbnail URL", description: "The card's thumbnail." },
            { name: "Playlist ID, Videos in Playlist", description: "For playlist cards, the playlist's id and how many videos it holds." },
        ],
    },
    steps: {
        heading: "Search, scroll, collect",
        items: [
            { title: "Open the search or the channel", body: "Run the search with the filters you want (upload date, type, duration), or open a channel's Videos or Shorts tab." },
            { title: "Pick the list and let it scroll", body: "Open the side panel's List tab and choose the videos list. YouTube loads more as you scroll, so choose Collect more pages; the run auto-scrolls until nothing new loads, or until you stop." },
            { title: "Review and export", body: "Sort by Views, remove columns you don't need, then Export as Excel, CSV, JSON or Google Sheets." },
        ],
    },
    notes: {
        heading: "YouTube specifics",
        items: [
            "Views and dates are what the card shows: rounded counts such as 48K and relative dates such as 3 months ago. The extension saves views as numbers.",
            "A channel's Videos tab lists every public upload as you scroll; a very large channel takes a while, and Stop keeps what it has.",
            "Comments aren't collected, and neither are channel email addresses or subscriber lists. Business emails some channels publish sit behind a verification on the About page and aren't read.",
            "Search results mix videos, Shorts, playlists and channels; the Type column tells them apart, so filter the sheet to the kind you want.",
            "YouTube's terms restrict automated collection. Collect for your own research, such as topic analysis or a creator shortlist, and check the terms before anything else.",
        ],
    },
    screenshots: ["ext/results-youtube"],
    feature: "list-scraper",
    guide: "collect-youtube-search-results",
    useCase: "research",
    related: [],
    faqs: [
        { q: "Can it collect a channel's full video list?", a: "Yes. Open the channel's Videos tab, pick the list, choose Collect more pages, and the run scrolls until the end. Sort the sheet by Views or Published afterwards." },
        { q: "Does it get the comments?", a: "No. Comments aren't part of the setup. A video's comment list on its page is detected like any other list, but there's no ready-made setup for it, so check the columns on a small run first." },
        { q: "Can I collect channel emails for outreach?", a: "No. Channel contact emails sit behind a verification on the About page, and the extension never bypasses one. Use the channel's own website, which many list in their links, and collect contacts there." },
        { q: "Can I compare several topics?", a: "Run a search per topic and export each; History keeps every run. Or search each topic in its own tab and ask chat to combine the conversation's lists into one table." },
    ],
};
