import { MetadataRoute } from "next";
import { getAllPosts, getAllAuthors, getAllCategories, getPostsByAuthor, getPostsByCategory, categorySlug } from "@/lib/posts";
import { siteConfig, toolsGroups } from "@/config/site";
import { publishedPages } from "@/config/pages";
import { getGuides } from "@/lib/guides";
import { comparePages } from "@/content/compare";
import { scraperPages } from "@/content/scrapers";
import { useCasePages } from "@/content/use-cases";

// Canonical URLs only: no redirects, no noindex pages. Dates are given only where they're known.
const BASE = siteConfig.url.replace(/\/$/, "");
const url = (href: string, extra: Partial<MetadataRoute.Sitemap[number]> = {}) => ({ url: `${BASE}${href}`, ...extra });

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const pages: MetadataRoute.Sitemap = [url("/", { priority: 1 })];

    // Product, use-case, scraper and resource pages that are live or "coming soon", from the registry.
    for (const p of publishedPages()) pages.push(url(p.href, { priority: 0.8 }));

    pages.push(url("/support", { priority: 0.4 }), url("/privacy-policy", { priority: 0.3 }), url("/terms-of-service", { priority: 0.3 }));

    for (const group of toolsGroups) for (const t of group.items) pages.push(url(t.href, { priority: 0.5 }));

    for (const g of getGuides()) pages.push(url(`/guides/${g.slug}`, { lastModified: new Date(g.updated), priority: 0.7 }));
    for (const c of Object.values(comparePages)) pages.push(url(`/compare/${c.slug}`, { lastModified: new Date(c.comparedOn), priority: 0.6 }));
    for (const c of Object.values(scraperPages)) if (c.status === "published") pages.push(url(`/scrapers/${c.slug}`, { lastModified: new Date(c.lastVerified), priority: 0.7 }));
    for (const c of Object.values(useCasePages)) if (c.status === "published") pages.push(url(c.page.href, { lastModified: new Date(c.lastUpdated), priority: 0.7 }));

    const posts = getAllPosts();
    for (const post of posts) pages.push(url(`/blog/${post.slug}`, { lastModified: new Date(post.updated), priority: 0.7 }));
    // Archives are listed only once they hold more than one post; a one-post archive is a thin page.
    for (const a of getAllAuthors()) if (getPostsByAuthor(a).length > 1) pages.push(url(`/blog/author/${a}`, { priority: 0.4 }));
    for (const c of getAllCategories()) if (getPostsByCategory(c).length > 1) pages.push(url(`/blog/category/${categorySlug(c)}`, { priority: 0.4 }));

    const seen = new Set<string>();
    return pages.filter((p) => !seen.has(p.url) && seen.add(p.url));
}
