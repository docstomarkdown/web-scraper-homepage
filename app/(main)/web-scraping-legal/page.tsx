import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Metadata } from "next";
import Link from "next/link";
import { getAuthor } from "@/content/authors";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/format-date";
import { ogImageUrl } from "@/lib/og";
import { Markdown } from "@/components/blog/Markdown";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";

// A sourced explainer, written in Markdown at content/pages/web-scraping-legal.md with title, description, date,
// updated and author in its front matter. Dated and cited, never legal advice.

const file = path.join(process.cwd(), "content/pages/web-scraping-legal.md");
const load = () => {
    const { data, content } = matter(fs.readFileSync(file, "utf8"));
    const iso = (v: unknown) => (v instanceof Date ? v.toISOString().slice(0, 10) : String(v ?? ""));
    return { title: String(data.title), description: String(data.description), date: iso(data.date), updated: iso(data.updated ?? data.date), author: getAuthor(String(data.author ?? "vikram")), content };
};

export function generateMetadata(): Metadata {
    const p = load();
    return {
        title: p.title,
        description: p.description,
        alternates: { canonical: "/web-scraping-legal" },
        openGraph: { type: "article", title: p.title, description: p.description, url: "/web-scraping-legal", publishedTime: p.date, modifiedTime: p.updated, images: [{ url: ogImageUrl(p.title, p.description), width: 1200, height: 630, alt: p.title }] },
    };
}

export default function WebScrapingLegalPage() {
    const p = load();
    const base = siteConfig.url.replace(/\/$/, "");
    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <JsonLd
                data={[
                    { "@type": "Article", headline: p.title, description: p.description, datePublished: p.date, dateModified: p.updated, author: { "@type": "Person", name: p.author.name, url: p.author.url }, publisher: { "@type": "Organization", name: "Thinksolv Technologies", url: siteConfig.url }, mainEntityOfPage: `${base}/web-scraping-legal` },
                    breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Is web scraping legal?", href: "/web-scraping-legal" }], base),
                ]}
            />
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <article className="max-w-3xl">
                    <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
                        <Link href="/guides" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">Resources</Link>
                    </nav>
                    <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{p.title}</h1>
                    <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                        By <Link href={`/blog/author/${p.author.slug}`} className="font-medium text-slate-700 dark:text-slate-200 hover:underline">{p.author.name}</Link>
                        {" · "}Updated <time dateTime={p.updated}>{formatDate(p.updated)}</time>
                    </p>
                    <p className="mt-6 rounded-lg border border-amber-200 dark:border-amber-900/60 bg-amber-50 dark:bg-amber-900/20 px-4 py-3 text-sm text-amber-900 dark:text-amber-200">
                        General information, not legal advice. Laws differ by country and change; for a decision that matters, ask a lawyer where you operate.
                    </p>
                    <div className="mt-8">
                        <Markdown content={p.content} />
                    </div>
                    <aside className="mt-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{p.author.name}</p>
                        <p className="text-sm text-slate-500 dark:text-slate-400">{p.author.role}</p>
                        <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300">{p.author.bio}</p>
                    </aside>
                </article>
            </div>
        </main>
    );
}
