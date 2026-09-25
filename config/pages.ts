// Page registry: every product, use-case, scraper and resource page on the site, with its status.
// The header menus, footer, sitemap and "related" links are all built from this list, so adding a
// page means adding an entry here plus its content file and route. See docs/site-structure.md.

export type PageStatus =
    | "live" // published and linked everywhere
    | "soon" // published as a "coming soon" page
    | "planned"; // page not written yet

export type PageKind = "feature" | "use-case" | "scraper" | "resource";

/** Menu groups for feature pages, in display order. */
export const featureGroups = [
    { id: "connect", label: "Chat and AI agents" },
    { id: "collect", label: "Collect data" },
    { id: "scale", label: "Work at scale" },
] as const;
export type FeatureGroup = (typeof featureGroups)[number]["id"];

/** Icon keys resolved by components/layout/nav-menu.tsx. */
export type PageIcon =
    | "map-pin" | "list" | "mail" | "layers" | "shopping-bag" | "file-text" | "image" | "table" | "store"
    | "message" | "bot" | "cloud" | "target" | "home" | "tag" | "star" | "briefcase" | "graduation"
    | "plane" | "book" | "lock" | "newspaper" | "scale" | "calculator" | "history" | "gavel" | "car";

export interface SitePage {
    kind: PageKind;
    slug: string;
    href: string;
    /** Short label for menus and link lists. */
    label: string;
    /** One sentence saying what the page covers; used under menu items and in related links. */
    summary: string;
    status: PageStatus;
    icon: PageIcon;
    /** The feature itself isn't available yet (only cloud today); shown as "Coming soon" everywhere. */
    comingSoon?: boolean;
    /** Feature pages only: which menu group. */
    group?: FeatureGroup;
}

type Entry = [slug: string, label: string, summary: string, status: PageStatus, icon: PageIcon];

const make = (kind: PageKind, prefix: string, group?: FeatureGroup) =>
    ([slug, label, summary, status, icon]: Entry): SitePage => ({
        kind,
        slug,
        href: `${prefix}${slug}`,
        label,
        summary,
        status,
        icon,
        group,
    });

const collect = make("feature", "/", "collect");
const scale = make("feature", "/", "scale");
const connect = make("feature", "/", "connect");
const useCase = make("use-case", "/use-cases/");
const scraper = make("scraper", "/scrapers/");
const resource = make("resource", "/");

export const pages: SitePage[] = [
    // Product: one page per feature
    connect(["ai-chat", "AI chat", "Ask for the data you want in plain words, and it collects and exports it for you.", "planned", "message"]),
    connect(["mcp", "MCP and AI agents", "Connect Claude or another AI agent to collect data through your browser.", "planned", "bot"]),
    collect(["maps-leads", "Maps leads", "Every business from a Maps search, with phone, website, address and rating.", "live", "map-pin"]),
    collect(["list-scraper", "Lists from any website", "Directories, search results and catalogs on other sites, with named columns and every page of results.", "planned", "list"]),
    collect(["shopify-scraper", "Shopify store export", "Every product in a public store, with variants, images and an import CSV.", "planned", "store"]),
    collect(["product-scraper", "Product details and reviews", "A product's full details, variants and images, plus its customer reviews.", "planned", "shopping-bag"]),
    collect(["email-extractor", "Emails and contacts", "Emails, phone numbers and social profiles from a list of websites.", "planned", "mail"]),
    collect(["page-text", "Page text for AI", "A page's readable text, ready for a document or an AI tool.", "planned", "file-text"]),
    collect(["image-downloader", "Image downloader", "Save every image on a page in one ZIP file.", "planned", "image"]),
    scale(["bulk-scraper", "Bulk runs", "Paste a list of web pages and collect from all of them in one run.", "planned", "layers"]),
    scale(["export-to-google-sheets", "Edit and export", "Rename, reorder and clean columns, then export to Google Sheets, Excel, CSV or JSON.", "planned", "table"]),
    { ...scale(["cloud", "Cloud runs", "Big jobs and scheduled runs without keeping your browser open, plus a REST API.", "planned", "cloud"]), comingSoon: true },

    // Use cases: one page per job
    useCase(["lead-generation", "Lead generation", "Local businesses with phones and websites, plus emails from their own sites.", "planned", "target"]),
    useCase(["ecommerce", "E-commerce research", "Competitor prices, bestsellers and reviews from marketplaces and independent stores.", "planned", "tag"]),
    useCase(["real-estate", "Real estate", "Homes for sale or rent in any area, with price, beds, baths, size and photos.", "planned", "home"]),
    useCase(["shopify", "Shopify agencies and dropshipping", "Research products and move catalogs between stores.", "planned", "store"]),
    useCase(["freelance-data-work", "Freelance data work", "Client-ready lead lists and data exports from whatever site the client names.", "planned", "table"]),
    useCase(["reviews", "Reviews and reputation", "Ratings and review text from review sites and stores.", "planned", "star"]),
    useCase(["job-postings", "Job postings", "See who is hiring, from job boards and company careers pages.", "planned", "briefcase"]),
    useCase(["research", "Research and AI datasets", "Research papers, page text and lists, ready for analysis or AI tools.", "planned", "graduation"]),
    useCase(["travel", "Travel and hospitality", "Hotels, prices and ratings from travel sites.", "planned", "plane"]),

    // Scrapers: categories of ready-made sites (per-site pages hang off these)
    // Summaries list only sites from the verified "ready-made sites" list (components/landing/Sites.tsx).
    scraper(["maps-and-directories", "Maps and directories", "Maps, Yellow Pages, Manta", "planned", "map-pin"]),
    scraper(["online-stores", "Online stores", "Amazon, Walmart, Target, Etsy, Costco, Wayfair and more", "planned", "shopping-bag"]),
    scraper(["real-estate", "Real estate", "Zillow, Realtor.com, Rightmove", "planned", "home"]),
    scraper(["travel", "Travel", "Booking.com, Hotels.com, Tripadvisor", "planned", "plane"]),
    scraper(["jobs-cars-software", "Jobs, cars and software", "Monster, CarGurus, Capterra, Product Hunt", "planned", "briefcase"]),
    scraper(["research-papers", "Research papers", "Scholar search results", "planned", "graduation"]),
    scraper(["shopify-stores", "Shopify stores", "Full catalogs from public Shopify stores", "planned", "store"]),

    // Resources
    resource(["guides", "Guides", "Step-by-step tutorials, from first install to export.", "planned", "book"]),
    resource(["docs", "Developer docs", "Connect Claude and other MCP clients to Web Scraper Pro.", "planned", "file-text"]),
    resource(["blog", "Blog", "News, explainers and ideas for using web data.", "planned", "newspaper"]),
    resource(["compare", "Comparisons", "How Web Scraper Pro compares with other tools.", "planned", "scale"]),
    resource(["changelog", "What's new", "Every new feature and fix, as it ships.", "planned", "history"]),
    resource(["web-scraping-legal", "Is web scraping legal?", "What the law says about collecting public data.", "planned", "gavel"]),
    resource(["privacy", "Your data and privacy", "What stays in your browser and what reaches our servers.", "planned", "lock"]),
    resource(["tools", "Free seller calculators", "Marketplace fees, profit margins, shipping and stock.", "live", "calculator"]),
    resource(["contact", "Contact us", "Questions, problems, or a site you need.", "live", "mail"]),
];

export const isPublished = (p: SitePage) => p.status === "live" || p.status === "soon";

/**
 * Local preview: on `next dev`, menus also show unbuilt pages (greyed out, not linked) so the whole
 * structure can be reviewed. Production builds only ever show published pages.
 */
export const showPlannedPages = process.env.NODE_ENV === "development";

export const publishedPages = (kind?: PageKind) =>
    pages.filter((p) => isPublished(p) && (!kind || p.kind === kind));

/** Pages to show in a menu: published ones, plus unbuilt ones in local preview. */
export const menuPages = (kind: PageKind) =>
    pages.filter((p) => p.kind === kind && (isPublished(p) || showPlannedPages));

export function getPage(slug: string, kind: PageKind = "feature"): SitePage {
    const page = pages.find((p) => p.slug === slug && p.kind === kind);
    if (!page) throw new Error(`Unknown ${kind} page: ${slug}`);
    return page;
}

/** Published feature pages from `slugs`, in order. Unpublished ones are skipped, so they appear once they go live. */
export const relatedPages = (slugs: string[]) =>
    slugs
        .map((s) => pages.find((p) => p.slug === s && p.kind === "feature"))
        .filter((p): p is SitePage => !!p && isPublished(p));

/** Badge for a menu item, or null for none. "Page to build" only ever shows in local preview. */
export function statusBadge(p: SitePage): string | null {
    if (p.comingSoon || p.status === "soon") return "Coming soon";
    if (p.status === "planned") return "Page to build";
    return null;
}
