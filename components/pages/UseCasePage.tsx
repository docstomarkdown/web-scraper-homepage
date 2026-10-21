import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Chrome, Minus } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import CTA from "@/components/landing/CTA";
import { Screenshot } from "@/components/Screenshot";
import { productConfig } from "@/config/product";
import { siteConfig } from "@/config/site";
import { getPage, showPlannedPages, type SitePage } from "@/config/pages";
import { formatDate } from "@/lib/format-date";
import { ogImageUrl } from "@/lib/og";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/JsonLd";

/**
 * One use-case page: a job from start to finish, written for the persona in docs/personas.md.
 * Readability rules (docs/writing-style.md §8): one column of reading text no wider than 70 characters, body text 18px,
 * every step opens with one bold line, bodies of two or three short sentences, parallel facts as bullets.
 */
export interface UseCasePageContent {
    page: SitePage;
    meta: { title: string; description: string };
    h1: string;
    intro: string;
    status: "draft" | "published";
    lastUpdated: string;
    /** The job as the reader would describe it, and who they are. Each paragraph two or three sentences. */
    job: { heading: string; paragraphs: string[] };
    /** The workflow from start to finish. `title` is the one-line instruction; `body` is two or three short sentences; `points` are optional specifics. */
    workflow: { heading: string; intro?: string; steps: { title: string; body: string; points?: string[]; feature?: string; screenshot?: string }[] };
    sample: { caption: string; columns: string[]; rows: string[][] };
    /** Sites this job usually involves: per-site page slugs, with a label for those without a page yet. */
    sites: { name: string; page?: string }[];
    cantDo: { heading: string; items: string[] };
    guides: string[];
    faqs: { q: string; a: string }[];
}

export const isUseCaseVisible = (c: UseCasePageContent) => c.status === "published" || showPlannedPages;

export function metadataForUseCase(c: UseCasePageContent): Metadata {
    return {
        title: c.meta.title,
        description: c.meta.description,
        alternates: { canonical: c.page.href },
        robots: c.status === "draft" ? { index: false, follow: false } : undefined,
        openGraph: { title: c.meta.title, description: c.meta.description, url: c.page.href, images: [{ url: ogImageUrl(c.h1, c.meta.description), width: 1200, height: 630, alt: c.h1 }] },
    };
}

// Reading column: about 85 characters at 18px, so the page breathes on a wide screen while lines stay readable.
const reading = "max-w-[56rem] mx-auto px-6 md:px-12";
const wide = "max-w-7xl mx-auto px-6 md:px-8";
const body = "text-lg text-slate-700 dark:text-slate-200 leading-[1.65]";
const link = "font-semibold text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline underline-offset-2";

export default function UseCasePage({ content: c }: { content: UseCasePageContent }) {
    const base = siteConfig.url.replace(/\/$/, "");
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=use-case-${c.page.slug}&utm_campaign=chrome_install`;
    const guideTitle = (slug: string) => slug.replace(/-/g, " ").replace(/^\w/, (m) => m.toUpperCase());
    return (
        <main className="flex-1 bg-white dark:bg-slate-950">
            <JsonLd data={[breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Use cases", href: "/use-cases" }, { name: c.page.label, href: c.page.href }], base), ...(c.faqs.length ? [faqJsonLd(c.faqs)] : [])]} />

            {/* Hero: the title and the result side by side, so the first screen shows what you get */}
            <section className="pt-24 pb-10 md:pt-28 md:pb-12">
                <div className={wide}>
                    {c.status === "draft" && <p className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-2 text-base text-amber-900 dark:text-amber-200">Draft: visible in local development only.</p>}
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,5fr)] lg:items-center">
                        <Reveal>
                            <nav aria-label="Breadcrumb" className="text-base text-slate-600 dark:text-slate-300"><Link href="/use-cases" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">Use cases</Link></nav>
                            <h1 className="mt-3 text-[2rem] md:text-[2.25rem] font-semibold tracking-tight text-slate-800 dark:text-white leading-[1.15]">{c.h1}</h1>
                            <p className="mt-4 text-lg text-slate-700 dark:text-slate-200 leading-[1.6]">{c.intro}</p>
                            <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-3">
                                <Link href={installUrl} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-5 py-3 text-base font-semibold text-white transition-colors"><Chrome className="w-5 h-5" aria-hidden="true" />Add to Chrome</Link>
                                <a href="#workflow" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:border-[#2772ED] transition-colors">See the steps<ArrowRight className="w-4 h-4" aria-hidden="true" /></a>
                            </div>
                            <p className="mt-5 text-base text-slate-600 dark:text-slate-300">Updated <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time></p>
                        </Reveal>
                        <Reveal delay={0.08} className="min-w-0">
                            <p className="text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">What you get: a spreadsheet like this</p>
                            <figure className="mt-3 overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-black/30">
                                <table className="w-full text-base text-left leading-snug">
                                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"><tr>{c.sample.columns.map((col) => <th key={col} className="px-2 py-3 font-semibold whitespace-nowrap align-bottom">{col}</th>)}</tr></thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">{c.sample.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j} className="px-2 py-3 whitespace-nowrap align-top">{cell || <span className="text-slate-400 dark:text-slate-500" aria-label="empty">—</span>}</td>)}</tr>)}</tbody>
                                </table>
                                <figcaption className="px-3 py-3 text-base text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">One row per item, with the columns named. {c.sample.caption}</figcaption>
                            </figure>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* The job, in the reader's words */}
            <section className="py-14 md:py-16 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
                <div className={reading}>
                    <Reveal>
                        <p className="text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">The job</p>
                        <h2 className="mt-2 text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white">{c.job.heading}</h2>
                        <div className={`mt-6 space-y-5 ${body}`}>{c.job.paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
                    </Reveal>
                </div>
            </section>

            {/* The steps */}
            <section id="workflow" className="py-14 md:py-16 scroll-mt-24">
                <div className={reading}>
                    <Reveal>
                        <p className="text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">Step by step</p>
                        <h2 className="mt-2 text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white">{c.workflow.heading}</h2>
                        {c.workflow.intro && <p className={`mt-4 ${body}`}>{c.workflow.intro}</p>}
                    </Reveal>
                    <ol className="mt-10 divide-y divide-slate-200 dark:divide-slate-800">
                        {c.workflow.steps.map((s, i) => {
                            const f = s.feature ? getPage(s.feature) : null;
                            return (
                                <Reveal key={s.title} delay={i * 0.04}>
                                    <li className="py-10 first:pt-2">
                                        <div className="flex items-start gap-4">
                                            <span className="mt-0.5 inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-[#2772ED]/10 text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]" aria-hidden="true">{i + 1}</span>
                                            <div className="min-w-0">
                                                <h3 className="text-xl font-semibold text-slate-800 dark:text-white leading-snug"><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
                                                <p className={`mt-3 ${body}`}>{s.body}</p>
                                                {s.points && s.points.length > 0 && (
                                                    <ul className={`mt-4 space-y-2 ${body}`}>
                                                        {s.points.map((p) => (
                                                            <li key={p} className="flex gap-3"><span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-[#2772ED]" aria-hidden="true" /><span>{p}</span></li>
                                                        ))}
                                                    </ul>
                                                )}
                                                {f && <p className="mt-4 text-base"><Link href={f.href} className={link}>How {f.label.toLowerCase()} works →</Link></p>}
                                            </div>
                                        </div>
                                        {s.screenshot && <Screenshot id={s.screenshot} className="mt-6 mb-0 md:ml-[3.25rem]" />}
                                    </li>
                                </Reveal>
                            );
                        })}
                    </ol>
                </div>
            </section>

            {/* Sites, limits, guides: three short lists, each on its own */}
            <section className="py-14 md:py-16">
                <div className={reading}>
                    <Reveal>
                        <h2 className="text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white">Which websites</h2>
                        <p className={`mt-3 ${body}`}>These are the sites this job usually starts from. The ones with a link have their own page with the columns you get.</p>
                        <ul className="mt-5 flex flex-wrap gap-2.5">
                            {c.sites.map((s) => (
                                <li key={s.name}>
                                    {s.page ? (
                                        <Link href={`/scrapers/${s.page}`} className="inline-block rounded-full border border-[#2772ED]/40 bg-[#2772ED]/5 px-4 py-1.5 text-base font-medium text-[#1f5ec2] dark:text-[#7aa7ff] hover:bg-[#2772ED]/10">{s.name}</Link>
                                    ) : (
                                        <span className="inline-block rounded-full border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 px-4 py-1.5 text-base text-slate-700 dark:text-slate-200">{s.name}</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal className="mt-14">
                        <h2 className="text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white">{c.cantDo.heading}</h2>
                        <ul className="mt-5 space-y-4">
                            {c.cantDo.items.map((n) => (
                                <li key={n} className={`flex gap-3 ${body}`}>
                                    <span className="mt-[0.35em] inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-100" aria-hidden="true"><Minus className="w-4 h-4" /></span>
                                    <span>{n}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    {c.guides.length > 0 && (
                        <Reveal className="mt-14">
                            <h2 className="text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white">Guides for this job</h2>
                            <p className={`mt-3 ${body}`}>Each guide shows every click with a screenshot, tested on the released extension.</p>
                            <ul className="mt-5 space-y-3 text-lg">
                                {c.guides.map((g) => <li key={g}><Link href={`/guides/${g}`} className={link}>{guideTitle(g)} →</Link></li>)}
                            </ul>
                        </Reveal>
                    )}
                </div>
            </section>

            {c.faqs.length > 0 && (
                <section className="py-14 md:py-16 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
                    <div className={reading}>
                        <Reveal>
                            <p className="text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">Questions</p>
                            <h2 className="mt-2 text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white">Things people ask before they start</h2>
                        </Reveal>
                        <div className="mt-8 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
                            {c.faqs.map((f) => (
                                <details key={f.q} className="group py-5" open>
                                    <summary className="cursor-pointer list-none font-semibold text-slate-800 dark:text-white [&::-webkit-details-marker]:hidden"><h3 className="text-xl leading-snug">{f.q}</h3></summary>
                                    <p className={`mt-3 ${body}`}>{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}
            <CTA />
        </main>
    );
}
