import { MetadataRoute } from "next";
import { getAllPosts, getAllAuthors, getAllCategories, getPostsByAuthor, getPostsByCategory, categorySlug } from "@/lib/posts";
import { siteConfig, toolsGroups } from "@/config/site";
import { publishedPages } from "@/config/pages";

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

    const posts = getAllPosts();
    for (const post of posts) pages.push(url(`/blog/${post.slug}`, { lastModified: new Date(post.updated), priority: 0.7 }));
    // Archives are listed only once they hold more than one post; a one-post archive is a thin page.
    for (const a of getAllAuthors()) if (getPostsByAuthor(a).length > 1) pages.push(url(`/blog/author/${a}`, { priority: 0.4 }));
    for (const c of getAllCategories()) if (getPostsByCategory(c).length > 1) pages.push(url(`/blog/category/${categorySlug(c)}`, { priority: 0.4 }));

    const seen = new Set<string>();
    return pages.filter((p) => !seen.has(p.url) && seen.add(p.url));
}
