// Ready-made sites: the one list behind the homepage Sites section, the /scrapers hub and the per-site pages.
// Only sites with a tuned setup in the released extension (configs-prod/*.json with named columns) belong here.
// `page` is the slug of a per-site page in content/scrapers/, set once that page exists.

import { getPage, type SitePage } from "@/config/pages";

export interface ReadyMadeSite {
    name: string;
    /** Registry slug of the category page (kind "scraper"). */
    category: string;
    /** Slug of this site's own page under /scrapers/, once written. */
    page?: string;
    /** Left off the homepage and hub until the setup is re-verified or its columns are named. */
    hidden?: boolean;
}

export const readyMadeSites: ReadyMadeSite[] = [
    // Business directories. Google Maps has a tuned setup too and is listed as a fact, with no page of its own:
    // Maps how-tos live on mapsscraper.pro (the same engine, Maps only), and /maps-leads redirects there (next.config.js).
    { name: "Yellow Pages", category: "business-directories", page: "yellow-pages" },
    { name: "Justdial", category: "business-directories", page: "justdial" },
    { name: "BBB", category: "business-directories", page: "bbb" },
    { name: "Google Maps", category: "business-directories" },
    // configs-prod/manta.com.json is the generic default with no site-specific selectors: nothing is tuned yet.
    { name: "Manta", category: "business-directories", hidden: true },
    // Shopify
    { name: "Any Shopify store: full catalog", category: "shopify-stores" },
    // Online stores
    { name: "Amazon", category: "online-stores", page: "amazon" },
    { name: "eBay", category: "online-stores", page: "ebay" },
    { name: "Walmart", category: "online-stores", page: "walmart" },
    { name: "Target", category: "online-stores" },
    { name: "Etsy", category: "online-stores", page: "etsy" },
    { name: "Costco", category: "online-stores" },
    { name: "Wayfair", category: "online-stores" },
    { name: "Newegg", category: "online-stores" },
    { name: "Lowe's", category: "online-stores" },
    { name: "Nike", category: "online-stores" },
    { name: "Zara", category: "online-stores" },
    { name: "Flipkart", category: "online-stores" },
    { name: "Allegro", category: "online-stores" },
    // Real estate
    { name: "Zillow", category: "real-estate", page: "zillow" },
    // configs-prod/realtor.com.json targets the agent directory only, not home listings.
    { name: "Realtor.com", category: "real-estate", hidden: true },
    { name: "Rightmove", category: "real-estate", page: "rightmove" },
    // Travel
    { name: "Booking.com", category: "travel" },
    { name: "Hotels.com", category: "travel", page: "hotels-com" },
    { name: "Tripadvisor", category: "travel" },
    // Jobs, cars and software
    { name: "Monster", category: "jobs-cars-software" },
    { name: "CarGurus", category: "jobs-cars-software" },
    { name: "Capterra", category: "jobs-cars-software" },
    { name: "Product Hunt", category: "jobs-cars-software" },
    // Research
    { name: "Google Scholar", category: "research-papers", page: "scholar" },
    // Video
    { name: "YouTube", category: "video", page: "youtube" },
];

export const visibleSites = () => readyMadeSites.filter((s) => !s.hidden);

/** Sites grouped by their category page, in registry order. */
export function sitesByCategory(): { category: SitePage; sites: ReadyMadeSite[] }[] {
    const order = Array.from(new Set(readyMadeSites.map((s) => s.category)));
    return order.map((slug) => ({ category: getPage(slug, "scraper"), sites: visibleSites().filter((s) => s.category === slug) }));
}
