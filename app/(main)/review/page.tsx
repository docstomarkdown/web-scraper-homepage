import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { showPlannedPages, pages } from "@/config/pages";
import { getAllGuides } from "@/lib/guides";
import { getAllPosts } from "@/lib/posts";
import { useCasePages } from "@/content/use-cases";
import { scraperPages } from "@/content/scrapers";
import { captureIds } from "@/lib/visuals";
import SectionHeading from "@/components/landing/SectionHeading";

// Local-preview review desk: every draft on the site with its status, size, capture coverage and the verify notes
// from its source header, so content can be read page by page without opening the files. Not built in production.

export const metadata = { title: "Review desk", robots: { index: false, follow: false } };

const have = new Set(captureIds());
const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

/** The "verify" or "Draft until" sentences from a content file's header comment. */
function notes(file: string): string[] {
    if (!fs.existsSync(file)) return [];
    const head = fs.readFileSync(file, "utf8").split("\n").filter((l) => l.startsWith("//")).join(" ").replace(/\/\/ ?/g, " ");
    return head.split(/(?<=\.)\s+/).filter((s) => /verify|Draft until|never imply|Never/i.test(s)).map((s) => s.trim());
}

/** Capture ids a content object references, anywhere in it. */
const idsIn = (o: unknown): string[] => Array.from(new Set((JSON.stringify(o).match(/ext\/[a-z0-9-]+/g) ?? [])));

interface Row { title: string; href: string; status: string; words: number; captures: [number, number]; updated: string; notes: string[] }

function Table({ heading, rows }: { heading: string; rows: Row[] }) {
    return (
        <section className="mt-12">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{heading} <span className="text-slate-400 font-normal">· {rows.length}</span></h2>
            <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead><tr className="text-slate-500 dark:text-slate-400"><th className="py-2 pr-4 font-medium">Page</th><th className="py-2 pr-4 font-medium">Status</th><th className="py-2 pr-4 font-medium">Words</th><th className="py-2 pr-4 font-medium">Captures</th><th className="py-2 pr-4 font-medium">Updated</th><th className="py-2 font-medium">Check before publishing</th></tr></thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.href} className="border-t border-slate-100 dark:border-slate-800 align-top">
                                <td className="py-2 pr-4"><Link href={r.href} className="font-medium text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">{r.title}</Link><div className="text-xs text-slate-400">{r.href}</div></td>
                                <td className="py-2 pr-4 text-slate-700 dark:text-slate-200">{r.status}</td>
                                <td className="py-2 pr-4 text-slate-700 dark:text-slate-200">{r.words.toLocaleString("en-US")}</td>
                                <td className="py-2 pr-4 text-slate-700 dark:text-slate-200">{r.captures[0]} of {r.captures[1]}</td>
                                <td className="py-2 pr-4 text-slate-700 dark:text-slate-200">{r.updated}</td>
                                <td className="py-2 text-slate-600 dark:text-slate-300">{r.notes.length ? <ul className="list-disc pl-4 space-y-1">{r.notes.map((n) => <li key={n}>{n}</li>)}</ul> : "—"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default function ReviewDesk() {
    if (!showPlannedPages) notFound();
    const root = process.cwd();
    const guides: Row[] = getAllGuides().map((g) => {
        const ids = Array.from(new Set(g.content.match(/visual:(ext\/[a-z0-9-]+)/g)?.map((m) => m.slice("visual:".length)) ?? []));
        return { title: g.title, href: `/guides/${g.slug}`, status: g.status, words: words(g.content), captures: [ids.filter((i) => have.has(i)).length, ids.length], updated: g.updated, notes: [] };
    });
    const useCases: Row[] = Object.values(useCasePages).map((c) => {
        const ids = idsIn(c);
        return { title: c.h1, href: c.page.href, status: c.status, words: words(JSON.stringify(c)), captures: [ids.filter((i) => have.has(i)).length, ids.length], updated: c.lastUpdated, notes: notes(path.join(root, "content/use-cases", `${c.page.slug}.ts`)) };
    });
    const sites: Row[] = Object.values(scraperPages).map((c) => {
        const ids = idsIn(c);
        return { title: `${c.site.name}: ${c.h1}`, href: `/scrapers/${c.slug}`, status: c.status, words: words(JSON.stringify(c)), captures: [ids.filter((i) => have.has(i)).length, ids.length], updated: c.lastVerified, notes: notes(path.join(root, "content/scrapers", `${c.slug}.ts`)) };
    });
    const features: Row[] = pages.filter((p) => p.kind === "feature").map((p) => {
        const file = path.join(root, "content/features", `${p.slug}.ts`);
        const src = fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
        const ids = Array.from(new Set(src.match(/ext\/[a-z0-9-]+/g) ?? []));
        const updated = src.match(/lastUpdated:\s*"([^"]+)"/)?.[1] ?? "";
        return { title: p.label, href: p.href, status: p.comingSoon ? "coming soon" : p.status, words: words(src), captures: [ids.filter((i) => have.has(i)).length, ids.length], updated, notes: notes(file) };
    });
    const legal = fs.readFileSync(path.join(root, "content/pages/web-scraping-legal.md"), "utf8");
    const resources: Row[] = [
        { title: "What's new (changelog)", href: "/changelog", status: "live", words: words(fs.readFileSync(path.join(root, "content/changelog.ts"), "utf8")), captures: [0, 0], updated: "2026-10-21", notes: ["Entries come from DECISIONS.md; add one per release, newest first."] },
        { title: "Is web scraping legal?", href: "/web-scraping-legal", status: "live", words: words(legal), captures: [0, 0], updated: legal.match(/updated:\s*(\S+)/)?.[1] ?? "", notes: ["Check each source link opens; re-read when a cited case moves."] },
        { title: "Compare: Web Scraper (webscraper.io)", href: "/compare/webscraper-io", status: "live", words: words(fs.readFileSync(path.join(root, "content/compare/webscraper-io.ts"), "utf8")), captures: [0, 0], updated: "2026-10-21", notes: ["Their prices and limits were read on 2026-09-06; re-check before republishing."] },
        { title: "Blog: Web Scraper Pro 1.3.0", href: "/blog/web-scraper-pro-1-3-0-emails-in-the-same-maps-run", status: "live", words: words(fs.readFileSync(path.join(root, "content/blog/web-scraper-pro-1-3-0-emails-in-the-same-maps-run.md"), "utf8")), captures: [0, 0], updated: "2026-10-21", notes: [] },
    ];
    const posts: Row[] = getAllPosts().map((b) => ({ title: b.title, href: `/blog/${b.slug}`, status: b.status, words: words(b.content), captures: [0, 0], updated: b.updated, notes: b.category === "Comparisons" ? ["Names other products: check every line against their public pages before publishing."] : [] }));
    const total = (rows: Row[]) => rows.reduce((n, r) => n + r.words, 0);

    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="Local preview" title="Review desk" intro="Every page and draft on the site, with what to check before it goes live. Open a page, read it as the persona it's written for, and note what to change. Drafts render only on localhost." />
                <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">
                    Captures are counted against the visuals library: a page whose count reads 0 of 4 shows four placeholder boxes until those screenshots are taken (see the capture sheet). Words include front matter and FAQs.
                    Totals: guides {total(guides).toLocaleString("en-US")} words, use cases {total(useCases).toLocaleString("en-US")}, site pages {total(sites).toLocaleString("en-US")}.
                </p>
                <Table heading="Guides" rows={guides} />
                <Table heading="Use cases" rows={useCases} />
                <Table heading="Site pages" rows={sites} />
                <Table heading="Feature pages" rows={features} />
                <Table heading="Resources" rows={resources} />
                <Table heading="Blog posts" rows={posts} />
                <section className="mt-12 text-sm text-slate-600 dark:text-slate-300">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How to review a page</h2>
                    <ol className="mt-4 list-decimal pl-5 space-y-2">
                        <li>Read it once as the persona named in its source header (docs/personas.md), asking the review questions listed there.</li>
                        <li>Check every product claim against the released extension; the capture sheet lists the labels and defaults as shipped.</li>
                        <li>Walk the pre-publish checklist in docs/content-standards.md §9, then set <code>status: &quot;published&quot;</code> in the content file once the captures are in.</li>
                    </ol>
                </section>
            </div>
        </main>
    );
}
