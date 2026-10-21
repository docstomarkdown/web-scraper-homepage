import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAuthor, type Author } from "@/content/authors";

// Blog posts are Markdown files in content/blog/<slug>.md with YAML front matter:
//   title, description, date (YYYY-MM-DD), updated (YYYY-MM-DD, optional), author (a key in content/authors.ts),
//   category, tags (list), image (optional path under /public), imageAlt (optional).
// A post is published once its file exists; there is no draft flag, so unfinished posts stay out of the folder.

/** A front-matter value as a YYYY-MM-DD string; YAML parses bare dates into Date objects. */
const isoDate = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ""));

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
    slug: string;
    title: string;
    description: string;
    date: string;
    updated: string;
    author: Author;
    category: string;
    tags: string[];
    image: string;
    imageAlt: string;
    content: string;
    readingMinutes: number;
}

function readPost(fileName: string): BlogPost {
    const slug = fileName.replace(/\.mdx?$/, "");
    const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
    const { data, content } = matter(raw);
    const words = content.split(/\s+/).filter(Boolean).length;
    return {
        slug,
        title: String(data.title ?? ""),
        description: String(data.description ?? data.excerpt ?? ""),
        date: isoDate(data.date),
        updated: isoDate(data.updated ?? data.date),
        author: getAuthor(String(data.author ?? "vikram")),
        category: String(data.category ?? ""),
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        image: String(data.image ?? ""),
        imageAlt: String(data.imageAlt ?? data.title ?? ""),
        content,
        readingMinutes: Math.max(1, Math.round(words / 220)),
    };
}

export function getAllPosts(): BlogPost[] {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
        .readdirSync(postsDirectory)
        .filter((name) => /\.mdx?$/.test(name))
        .map(readPost)
        .filter((p) => p.title)
        .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
    for (const ext of [".md", ".mdx"]) {
        const p = path.join(postsDirectory, `${slug}${ext}`);
        if (fs.existsSync(p)) return readPost(`${slug}${ext}`);
    }
    return null;
}

export const getPostsByAuthor = (slug: string) => getAllPosts().filter((p) => p.author.slug === slug);
export const getPostsByCategory = (category: string) =>
    getAllPosts().filter((p) => p.category.toLowerCase() === category.toLowerCase());
export const getAllAuthors = () => Array.from(new Set(getAllPosts().map((p) => p.author.slug)));
export const getAllCategories = () => Array.from(new Set(getAllPosts().map((p) => p.category).filter(Boolean)));

/** Up to three other posts, same category first, then newest. */
export function getRelatedPosts(post: BlogPost, count = 3): BlogPost[] {
    const others = getAllPosts().filter((p) => p.slug !== post.slug);
    const same = others.filter((p) => p.category === post.category);
    return [...same, ...others.filter((p) => !same.includes(p))].slice(0, count);
}

export const categorySlug = (category: string) => category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
