import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAuthor, type Author } from "@/content/authors";

// Guides are tutorials: one task, done with the extension, tested on the released version. They're Markdown files in
// content/guides/<slug>.md with YAML front matter:
//   title            "How To <Goal> with Web Scraper Pro", under 60 characters
//   description      one sentence for search results and cards
//   status           "draft" (hidden from listings, the sitemap and production) or "published"
//   date, updated    YYYY-MM-DD; `updated` is the last test on the released extension
//   version          extension version the steps were tested on, e.g. "1.3.0"
//   author           a key in content/authors.ts
//   feature          slug of the feature page this guide uses (config/pages.ts); shown as the "What this uses" box
//   sites            optional list of per-site page slugs under /scrapers/
//   video            optional YouTube video id, embedded under the introduction
//   campaign         optional utm_campaign for the store link; defaults to "guide-<slug>"
//   faq              optional list of { q, a }
// Screenshots in the body: ![](visual:ext/chat-maps-count-card) renders the capture with that id from the visuals library.

/** A front-matter value as a YYYY-MM-DD string; YAML parses bare dates into Date objects. */
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ""));

const dir = path.join(process.cwd(), "content/guides");

export interface Guide {
    slug: string;
    title: string;
    description: string;
    status: "draft" | "published";
    date: string;
    updated: string;
    version: string;
    author: Author;
    feature: string;
    sites: string[];
    video: string;
    campaign: string;
    faq: { q: string; a: string }[];
    content: string;
    readingMinutes: number;
}

function read(fileName: string): Guide {
    const slug = fileName.replace(/\.mdx?$/, "");
    const { data, content } = matter(fs.readFileSync(path.join(dir, fileName), "utf8"));
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
        slug,
        title: String(data.title ?? ""),
        description: String(data.description ?? ""),
        status: data.status === "published" ? "published" : "draft",
        date: isoDate(data.date),
        updated: isoDate(data.updated ?? data.date),
        version: String(data.version ?? ""),
        author: getAuthor(String(data.author ?? "vikram")),
        feature: String(data.feature ?? ""),
        sites: Array.isArray(data.sites) ? data.sites.map(String) : [],
        video: String(data.video ?? ""),
        campaign: String(data.campaign ?? `guide-${slug}`),
        faq: Array.isArray(data.faq) ? data.faq.map((f: { q: string; a: string }) => ({ q: String(f.q), a: String(f.a) })) : [],
        content,
        readingMinutes: Math.max(1, Math.round(words / 220)),
    };
}

const all = (): Guide[] => (fs.existsSync(dir) ? fs.readdirSync(dir).filter((n) => /\.mdx?$/.test(n)).map(read) : []);

/** Published guides, newest first. */
export const getGuides = () => all().filter((g) => g.status === "published").sort((a, b) => (a.updated < b.updated ? 1 : -1));

/** Every guide, drafts included, for local preview. */
export const getAllGuides = () => all().sort((a, b) => (a.updated < b.updated ? 1 : -1));

export function getGuide(slug: string): Guide | null {
    for (const ext of [".md", ".mdx"]) if (fs.existsSync(path.join(dir, `${slug}${ext}`))) return read(`${slug}${ext}`);
    return null;
}

/** Up to three other published guides, same feature first. */
export function getRelatedGuides(guide: Guide, count = 3): Guide[] {
    const others = getGuides().filter((g) => g.slug !== guide.slug);
    const same = others.filter((g) => g.feature === guide.feature);
    return [...same, ...others.filter((g) => !same.includes(g))].slice(0, count);
}
