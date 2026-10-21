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
import { proseFromMarkdown, proseFromObject, readability, titleOverlaps, type Readability } from "@/lib/readability";
import SectionHeading from "@/components/landing/SectionHeading";
import { aiChat } from "@/content/features/ai-chat";
import { cloud } from "@/content/features/cloud";
import { bulkScraper } from "@/content/features/bulk-scraper";
import { emailExtractor } from "@/content/features/email-extractor";
import { imageDownloader } from "@/content/features/image-downloader";
import { exportToGoogleSheets } from "@/content/features/export-to-google-sheets";
import { listScraper } from "@/content/features/list-scraper";
import { mapsLeads } from "@/content/features/maps-leads";
import { pageText } from "@/content/features/page-text";
import { mcp } from "@/content/features/mcp";
import { productScraper } from "@/content/features/product-scraper";
import { shopifyScraper } from "@/content/features/shopify-scraper";
import type { FeaturePageContent } from "@/components/pages/FeaturePage";

// Local-preview review desk: every draft on the site with its status, size, capture coverage, pre-read numbers
// (lib/readability.ts) and the verify notes from its source header, so content can be read page by page with the
// numbers beside it. Not built in production.

export const metadata = { title: "Review desk", robots: { index: false, follow: false } };

const have = new Set(captureIds());
const featureContent: FeaturePageContent[] = [aiChat, mapsLeads, listScraper, shopifyScraper, productScraper, emailExtractor, pageText, imageDownloader, bulkScraper, exportToGoogleSheets, mcp, cloud];

/** The "verify" or "Draft until" sentences from a content file's header comment. */
function notes(file: string): string[] {
    if (!fs.existsSync(file)) return [];
    const head = fs.readFileSync(file, "utf8").split("\n").filter((l) => l.startsWith("//")).join(" ").replace(/\/\/ ?/g, " ");
    return head.split(/(?<=\.)\s+/).filter((s) => /verify|Draft until|never imply|Never/i.test(s)).map((s) => s.trim());
}

/** The "verify" lines from a Markdown file's leading HTML comment. */
function mdNotes(md: string): string[] {
    const m = md.match(/<!--([\s\S]*?)-->/);
    if (!m) return [];
    return m[1].split("\n").map((l) => l.replace(/^[\s*-]+/, "").trim()).filter((l) => l.length > 12).slice(0, 6);
}

/** Capture ids a content object references, anywhere in it. */
const idsIn = (o: unknown): string[] => Array.from(new Set((JSON.stringify(o).match(/ext\/[a-z0-9-]+/g) ?? [])));

interface Row { title: string; metaTitle: string; description: string; href: string; status: string; captures: [number, number]; updated: string; notes: string[]; read: Readability }

const LIMITS = { title: 60, description: 160, grade: 8, ease: 60 };

function Flag({ bad, children }: { bad: boolean; children: React.ReactNode }) {
    // Amber marks a value outside the writing-style limit; it's a real state, not decoration.
    return <span className={bad ? "font-semibold text-amber-700 dark:text-amber-300" : ""}>{children}{bad ? " !" : ""}</span>;
}

function Table({ heading, rows, overlaps }: { heading: string; rows: Row[]; overlaps: Map<string, string[]> }) {
    const th = "py-2 pr-3 font-medium whitespace-nowrap";
    return (
        <section className="mt-12">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{heading} <span className="text-slate-500 dark:text-slate-400 font-normal">· {rows.length}</span></h2>
            <div className="mt-4 overflow-x-auto" tabIndex={0} role="group" aria-label={`${heading} table, scrolls sideways`}>
                <table className="w-full text-sm text-left border-collapse">
                    <thead>
                        <tr className="text-slate-600 dark:text-slate-300">
                            <th className={th}>Page</th><th className={th}>Status</th><th className={th}>Title</th><th className={th}>Desc.</th><th className={th}>Words</th>
                            <th className={th}>Grade</th><th className={th}>Ease</th><th className={th}>Long sent.</th><th className={th}>Long paras</th><th className={th}>Banned</th><th className={th}>Captures</th><th className={th}>Competes with</th><th className={th}>Verify before publishing</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r) => (
                            <tr key={r.href} className="border-t border-slate-100 dark:border-slate-800 align-top text-slate-700 dark:text-slate-200">
                                <td className="py-2 pr-3 min-w-[16rem]"><Link href={r.href} className="font-medium text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">{r.title}</Link><div className="text-xs text-slate-500 dark:text-slate-400">{r.href}</div></td>
                                <td className="py-2 pr-3 whitespace-nowrap">{r.status}</td>
                                <td className="py-2 pr-3"><Flag bad={r.metaTitle.length > LIMITS.title}>{r.metaTitle.length}</Flag></td>
                                <td className="py-2 pr-3"><Flag bad={r.description.length > LIMITS.description || r.description.length < 70}>{r.description.length}</Flag></td>
                                <td className="py-2 pr-3">{r.read.words.toLocaleString("en-US")}</td>
                                <td className="py-2 pr-3"><Flag bad={r.read.grade > LIMITS.grade}>{r.read.grade}</Flag></td>
                                <td className="py-2 pr-3"><Flag bad={r.read.ease < LIMITS.ease}>{r.read.ease}</Flag></td>
                                <td className="py-2 pr-3"><Flag bad={r.read.longSentences > 0}>{r.read.longSentences}</Flag></td>
                                <td className="py-2 pr-3"><Flag bad={r.read.longParagraphs > 0}>{r.read.longParagraphs}</Flag></td>
                                <td className="py-2 pr-3">{r.read.banned.length ? <Flag bad>{r.read.banned.map((b) => `${b.word} ×${b.n}`).join(", ")}</Flag> : "0"}</td>
                                <td className="py-2 pr-3 whitespace-nowrap">{r.captures[0]} of {r.captures[1]}</td>
                                <td className="py-2 pr-3">{(overlaps.get(r.href) ?? []).map((h) => <div key={h}><Link href={h} className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">{h}</Link></div>)}</td>
                                <td className="py-2 text-slate-600 dark:text-slate-300 min-w-[18rem]">{r.notes.length ? <ul className="list-disc pl-4 space-y-1">{r.notes.map((n) => <li key={n}>{n}</li>)}</ul> : "—"}</td>
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
        return { title: g.title, metaTitle: g.title, description: g.description, href: `/guides/${g.slug}`, status: g.status, captures: [ids.filter((i) => have.has(i)).length, ids.length], updated: g.updated, notes: mdNotes(g.content), read: readability(proseFromMarkdown(g.content)) };
    });
    const useCases: Row[] = Object.values(useCasePages).map((c) => {
        const ids = idsIn(c);
        return { title: c.h1, metaTitle: c.meta.title, description: c.meta.description, href: c.page.href, status: c.status, captures: [ids.filter((i) => have.has(i)).length, ids.length], updated: c.lastUpdated, notes: notes(path.join(root, "content/use-cases", `${c.page.slug}.ts`)), read: readability(proseFromObject(c)) };
    });
    const sites: Row[] = Object.values(scraperPages).map((c) => {
        const ids = idsIn(c);
        return { title: c.h1, metaTitle: c.meta.title, description: c.meta.description, href: `/scrapers/${c.slug}`, status: c.status, captures: [ids.filter((i) => have.has(i)).length, ids.length], updated: c.lastVerified, notes: notes(path.join(root, "content/scrapers", `${c.slug}.ts`)), read: readability(proseFromObject(c)) };
    });
    const features: Row[] = featureContent.map((c) => {
        const ids = idsIn(c);
        return { title: c.h1, metaTitle: c.meta.title, description: c.meta.description, href: c.page.href, status: c.page.comingSoon ? "coming soon" : c.page.status, captures: [ids.filter((i) => have.has(i)).length, ids.length], updated: c.lastUpdated, notes: notes(path.join(root, "content/features", `${c.page.slug}.ts`)), read: readability(proseFromObject(c)) };
    });
    const legal = fs.readFileSync(path.join(root, "content/pages/web-scraping-legal.md"), "utf8");
    const compare = fs.readFileSync(path.join(root, "content/compare/webscraper-io.ts"), "utf8");
    const terms = fs.readFileSync(path.join(root, "content/legal/terms-of-service.md"), "utf8");
    const privacy = fs.readFileSync(path.join(root, "content/legal/privacy-policy.md"), "utf8");
    const resources: Row[] = [
        { title: "Is web scraping legal?", metaTitle: "Is web scraping legal?", description: legal.match(/description:\s*"([^"]+)"/)?.[1] ?? "", href: "/web-scraping-legal", status: "live", captures: [0, 0], updated: "", notes: ["Check each source link opens; re-read the court cases yearly."], read: readability(proseFromMarkdown(legal)) },
        { title: "Compare: Web Scraper (webscraper.io)", metaTitle: compare.match(/title:\s*"([^"]+)"/)?.[1] ?? "", description: compare.match(/description:\s*"([^"]+)"/)?.[1] ?? "", href: "/compare/webscraper-io", status: "live", captures: [0, 0], updated: "", notes: ["Names a competitor and its prices; owner reads the tone; re-check their pricing page monthly."], read: readability(proseFromMarkdown(compare.replace(/^[^"]*"|"[^"]*$/g, ""))) },
        { title: "Terms of Service", metaTitle: "Terms of Service", description: "", href: "/terms-of-service", status: "live", captures: [0, 0], updated: "", notes: ["Rewritten 2026-10-21 for a free, account-less product; the liability cap wording is the owner's call."], read: readability(proseFromMarkdown(terms)) },
        { title: "Privacy Policy", metaTitle: "Privacy Policy", description: "", href: "/privacy-policy", status: "live", captures: [0, 0], updated: "", notes: [], read: readability(proseFromMarkdown(privacy)) },
    ];
    const posts: Row[] = getAllPosts().map((b) => ({ title: b.title, metaTitle: b.title, description: b.description, href: `/blog/${b.slug}`, status: b.status, captures: [0, 0], updated: b.updated, notes: b.category === "Comparisons" ? ["Names competitors and prices; the owner reads the tone first."] : [], read: readability(proseFromMarkdown(b.content)) }));

    const all = [...guides, ...useCases, ...sites, ...features, ...posts];
    const overlaps = titleOverlaps(all.map((r) => ({ href: r.href, title: r.metaTitle })));
    const flagged = (rows: Row[]) => rows.filter((r) => r.read.grade > LIMITS.grade || r.read.longSentences > 0 || r.read.longParagraphs > 0 || r.read.banned.length > 0 || r.metaTitle.length > LIMITS.title || r.description.length > LIMITS.description).length;
    const totalWords = all.reduce((n, r) => n + r.read.words, 0);

    return (
        <main id="main" className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-[90rem] mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="Local preview" title="Review desk" intro="Every page and draft on the site with its pre-read numbers, so you can read page by page with the numbers beside it. Open a page, read it as the persona it's written for, and fix what the numbers point at." align="left" />
                <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-base text-slate-700 dark:text-slate-200">
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4"><div className="text-2xl font-semibold text-slate-900 dark:text-white">{all.length}</div>pages with content, {totalWords.toLocaleString("en-US")} words of prose</div>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4"><div className="text-2xl font-semibold text-slate-900 dark:text-white">{flagged(all)}</div>pages with at least one number outside the limit</div>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4"><div className="text-2xl font-semibold text-slate-900 dark:text-white">{all.filter((r) => r.read.grade > LIMITS.grade).length}</div>pages above grade {LIMITS.grade}</div>
                    <div className="rounded-xl border border-slate-200 dark:border-slate-800 p-4"><div className="text-2xl font-semibold text-slate-900 dark:text-white">{all.filter((r) => (overlaps.get(r.href) ?? []).length > 0).length}</div>pages whose title competes with another page&apos;s</div>
                </div>
                <p className="mt-6 text-base text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-800 dark:text-slate-100">How to read the numbers.</strong> Title and Desc. are character counts (limits {LIMITS.title} and {LIMITS.description}). Grade is Flesch-Kincaid (target {LIMITS.grade} or under); Ease is Flesch reading ease (target {LIMITS.ease}+, 70+ for a how-to). Long sent. counts sentences over 25 words; Long paras counts paragraphs over three sentences. Banned lists hype and jargon words from the writing style. Competes with lists pages whose title shares most of its meaningful words with this one, which means two pages going after one search. Captures are counted against the visuals library. An amber value with &quot;!&quot; is outside its limit.
                </p>
                <Table heading="Guides" rows={guides} overlaps={overlaps} />
                <Table heading="Use cases" rows={useCases} overlaps={overlaps} />
                <Table heading="Site pages" rows={sites} overlaps={overlaps} />
                <Table heading="Feature pages" rows={features} overlaps={overlaps} />
                <Table heading="Resources" rows={resources} overlaps={overlaps} />
                <Table heading="Blog posts" rows={posts} overlaps={overlaps} />
                <section className="mt-12 text-base text-slate-600 dark:text-slate-300">
                    <h2 className="text-xl font-semibold text-slate-900 dark:text-white">How to review a page</h2>
                    <ol className="mt-4 list-decimal pl-5 space-y-2">
                        <li>Read it once as the persona named in its source header (docs/personas.md), asking the review questions listed there.</li>
                        <li>Check every product claim against the released extension; the capture sheet lists the labels and defaults as shipped, and the Verify column lists what each draft still needs.</li>
                        <li>Walk the pre-publish checklist in docs/content-standards.md §9, then set <code>status: &quot;published&quot;</code> in the content file once the captures are in.</li>
                    </ol>
                </section>
            </div>
        </main>
    );
}
