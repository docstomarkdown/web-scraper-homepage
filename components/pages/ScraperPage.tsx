import Link from "next/link";
import { Chrome } from "lucide-react";
import type { Metadata } from "next";
import Reveal from "@/components/landing/Reveal";
import CTA from "@/components/landing/CTA";
import { Screenshot } from "@/components/Screenshot";
import ProseSection, { type ContentSection } from "@/components/pages/ProseSection";
import Glossary from "@/components/pages/Glossary";
import { getAllGuides } from "@/lib/guides";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/JsonLd";
import { productConfig } from "@/config/product";
import { siteConfig } from "@/config/site";
import { getPage, showPlannedPages, type SitePage } from "@/config/pages";
import { formatDate } from "@/lib/format-date";
import { ogImageUrl } from "@/lib/og";

/**
 * Content for one per-site scraper page (/scrapers/<site>). Only sites with a tuned, verified setup get one, and each
 * page carries site-specific facts: the real columns, a sample, how collecting works on that site, and a verified date.
 * See docs/content-standards.md §3 (scaled content) and docs/site-structure.md §4.
 */
export interface ScraperPageContent {
    slug: string;
    /** Registry slug of the category page this site belongs to. */
    category: string;
    site: { name: string; url: string };
    meta: { title: string; description: string };
    h1: string;
    intro: string;
    /** Drafts render in local development only. */
    status: "draft" | "published";
    /** When the setup was last run on the released extension, and which version. */
    lastVerified: string;
    version: string;
    /** Keep to five columns or fewer so it reads without scrolling. */
    sample: { caption: string; columns: string[]; rows: string[][] };
    fields: { heading: string; intro?: string; items: { name: string; description: string }[] };
    /** `points` are the specifics under a step: an example to type, a number, a thing to watch for. */
    steps: { heading: string; items: { title: string; body: string; points?: string[] }[] };
    /** What's specific to this site: sign-in, paging, limits, known gaps. */
    notes: { heading: string; items: string[] };
    /** Which columns can come back empty, and why. */
    emptyWhen?: { column: string; when: string }[];
    /** What happens when the site slows down, asks a question or changes. */
    pushback?: string[];
    /** Site-specific reading sections after the notes: worked examples, what to do with the table, filters, caps. */
    sections?: ContentSection[];
    /** Capture ids from the visuals library, shown after the steps. */
    screenshots: string[];
    /** The feature page that does the work, and the guide and use case that go with it. */
    feature: string;
    guide?: string;
    useCase?: string;
    /** Slugs of other per-site pages. */
    related: string[];
    faqs: { q: string; a: string }[];
}

export const isVisible = (c: ScraperPageContent) => c.status === "published" || showPlannedPages;

export function scraperMetadata(c: ScraperPageContent): Metadata {
    const href = `/scrapers/${c.slug}`;
    return {
        title: c.meta.title,
        description: c.meta.description,
        alternates: { canonical: href },
        robots: c.status === "draft" ? { index: false, follow: false } : undefined,
        openGraph: { title: c.meta.title, description: c.meta.description, url: href, images: [{ url: ogImageUrl(c.h1, c.meta.description), width: 1200, height: 630, alt: c.h1 }] },
    };
}

// Readability rules (docs/writing-style.md §11): one reading column, 18px body, semibold headings in slate-800,
// every section opens with its answer. Same shape as FeaturePage and UseCasePage.
const reading = "max-w-[56rem] mx-auto px-6 md:px-12";
const body = "text-lg text-slate-700 dark:text-slate-200 leading-[1.65]";
const h2 = "text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white leading-tight";
const h3 = "text-xl font-semibold text-slate-800 dark:text-white leading-snug";
const eyebrowCls = "text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]";
const link = "text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2";
const section = "py-12 md:py-16 scroll-mt-24 border-t border-slate-200 dark:border-slate-800";
const thCls = "py-2.5 pr-5 text-base font-semibold text-slate-800 dark:text-white";

export default function ScraperPage({ content: c, related }: { content: ScraperPageContent; related: { slug: string; name: string }[] }) {
    const category: SitePage = getPage(c.category, "scraper");
    const feature = getPage(c.feature);
    const base = siteConfig.url.replace(/\/$/, "");
    const href = `/scrapers/${c.slug}`;
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=scraper-${c.slug}&utm_campaign=chrome_install`;
    const guides = getAllGuides().filter((g) => g.sites.includes(c.slug) || g.slug === c.guide);

    return (
        <main id="main" className="flex-1 bg-white dark:bg-slate-950">
            <JsonLd data={[breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Sites", href: "/scrapers" }, { name: category.label, href: `/scrapers#${category.slug}` }, { name: c.site.name, href }], base), ...(c.faqs.length > 0 ? [faqJsonLd(c.faqs)] : [])]} />

            {/* Hero: the answer, one short intro, the two buttons, then the sample */}
            <section className="pt-28 pb-10 md:pt-32 md:pb-12">
                <div className={reading}>
                    {c.status === "draft" && (
                        <p className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-2 text-base text-amber-800 dark:text-amber-200">Draft: visible in local development only.</p>
                    )}
                    <Reveal>
                        <nav aria-label="Breadcrumb" className="text-base text-slate-600 dark:text-slate-300">
                            <Link href="/scrapers" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff] hover:underline">Sites</Link>
                            {" / "}
                            <Link href={`/scrapers#${category.slug}`} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff] hover:underline">{category.label}</Link>
                        </nav>
                        <h1 className="mt-4 text-[2rem] md:text-[2.5rem] font-semibold tracking-tight text-slate-800 dark:text-white leading-[1.2]">{c.h1}</h1>
                        <p className={`mt-5 ${body} md:text-xl`}>{c.intro}</p>
                        <div className="mt-7 flex flex-col sm:flex-row gap-3">
                            <Link href={installUrl} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f5ec2] hover:bg-[#1a4fa3] px-6 py-3 text-base font-semibold text-white transition-colors">
                                <Chrome className="w-5 h-5" aria-hidden="true" />
                                Add to Chrome, it&apos;s free
                            </Link>
                            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 transition-colors">
                                See the steps
                            </a>
                        </div>
                        <p className="mt-5 text-base text-slate-600 dark:text-slate-300">
                            Last run on version {c.version} on <time dateTime={c.lastVerified}>{formatDate(c.lastVerified)}</time>.
                        </p>
                    </Reveal>
                    <Glossary text={JSON.stringify(c)} className="mt-8" />
                    <Reveal className="mt-10" delay={0.08}>
                        <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
                            <div className="overflow-x-auto" tabIndex={0} role="group" aria-label="Sample table, scrolls sideways">
                                <table className="w-full text-base text-left">
                                    <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-100">
                                        <tr>{c.sample.columns.map((col) => <th key={col} scope="col" className="px-3 py-2.5 font-semibold whitespace-nowrap">{col}</th>)}</tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                                        {c.sample.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j} className="px-3 py-2.5 whitespace-nowrap">{cell}</td>)}</tr>)}
                                    </tbody>
                                </table>
                            </div>
                            <figcaption className="px-4 py-3 text-base text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800">
                                <span className="font-medium text-slate-700 dark:text-slate-200">Sample data.</span> {c.sample.caption}
                            </figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            {/* Steps */}
            <section id="how-it-works" className={section}>
                <div className={reading}>
                    <Reveal>
                        <p className={eyebrowCls}>How it works</p>
                        <h2 className={`mt-2 ${h2}`}>{c.steps.heading}</h2>
                    </Reveal>
                    <ol className="mt-8 divide-y divide-slate-200 dark:divide-slate-800">
                        {c.steps.items.map((s, i) => (
                            <Reveal as="li" key={s.title} delay={i * 0.04} className="py-8 first:pt-2">
                                <div className="flex items-start gap-4">
                                    <span className="mt-0.5 inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-[#2772ED]/10 text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]" aria-hidden="true">{i + 1}</span>
                                    <div className="min-w-0">
                                        <h3 className={h3}><span className="sr-only">Step {i + 1}: </span>{s.title}</h3>
                                        <p className={`mt-3 ${body}`}>{s.body}</p>
                                        {s.points && s.points.length > 0 && (
                                            <ul className={`mt-4 space-y-2 ${body}`}>
                                                {s.points.map((pt) => (
                                                    <li key={pt} className="flex gap-3"><span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-[#1f5ec2] dark:bg-[#7aa7ff]" aria-hidden="true" /><span>{pt}</span></li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            </Reveal>
                        ))}
                    </ol>
                    {c.screenshots.map((id) => <Screenshot key={id} id={id} />)}
                </div>
            </section>

            {/* Columns */}
            <section id="what-you-get" className={section}>
                <div className={reading}>
                    <Reveal>
                        <p className={eyebrowCls}>What you get</p>
                        <h2 className={`mt-2 ${h2}`}>{c.fields.heading}</h2>
                        {c.fields.intro && <p className={`mt-4 ${body}`}>{c.fields.intro}</p>}
                        <table className="mt-8 w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                                    <th scope="col" className={thCls}>Column</th>
                                    <th scope="col" className={thCls}>What it holds</th>
                                </tr>
                            </thead>
                            <tbody>
                                {c.fields.items.map((f) => (
                                    <tr key={f.name} className="border-b border-slate-100 dark:border-slate-800/60 align-top">
                                        <th scope="row" className="py-3 pr-5 text-lg font-semibold text-slate-800 dark:text-white">{f.name}</th>
                                        <td className={`py-3 ${body}`}>{f.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Reveal>
                    {c.emptyWhen && c.emptyWhen.length > 0 && (
                        <Reveal className="mt-12">
                            <h3 className={h3}>Which columns can be empty, and why</h3>
                            <p className={`mt-3 ${body}`}>An empty cell means the page didn&apos;t show that detail. Nothing is guessed.</p>
                            <table className="mt-6 w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                                        <th scope="col" className={`${thCls} w-[32%]`}>Column</th>
                                        <th scope="col" className={thCls}>Empty when</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {c.emptyWhen.map((r) => (
                                        <tr key={r.column} className="border-b border-slate-100 dark:border-slate-800/60 align-top">
                                            <th scope="row" className="py-3 pr-5 text-lg font-semibold text-slate-800 dark:text-white">{r.column}</th>
                                            <td className={`py-3 ${body}`}>{r.when}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Notes and pushback */}
            <section className={section}>
                <div className={reading}>
                    <Reveal>
                        <h2 className={h2}>{c.notes.heading}</h2>
                        <ul className={`mt-6 space-y-3 ${body}`}>
                            {c.notes.items.map((n) => (
                                <li key={n} className="flex gap-3"><span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-[#1f5ec2] dark:bg-[#7aa7ff]" aria-hidden="true" /><span>{n}</span></li>
                            ))}
                        </ul>
                        {c.pushback && c.pushback.length > 0 && (
                            <>
                                <h3 className={`mt-10 ${h3}`}>When the site pushes back</h3>
                                <ul className={`mt-4 space-y-3 ${body}`}>
                                    {c.pushback.map((n) => (
                                        <li key={n} className="flex gap-3"><span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden="true" /><span>{n}</span></li>
                                    ))}
                                </ul>
                            </>
                        )}
                    </Reveal>
                </div>
            </section>

            {c.sections?.map((s) => <ProseSection key={s.id} s={s} />)}

            {/* FAQ */}
            {c.faqs.length > 0 && (
                <section id="faq" className={section}>
                    <div className={reading}>
                        <Reveal>
                            <h2 className={h2}>Questions, answered</h2>
                        </Reveal>
                        <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
                            {c.faqs.map((f, i) => (
                                <details key={f.q} className="group py-5" open={i === 0}>
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5ec2]">
                                        <h3 className={h3}>{f.q}</h3>
                                        <span className="mt-1 text-2xl leading-none text-slate-500 dark:text-slate-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                                    </summary>
                                    <p className={`mt-3 ${body}`}>{f.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Go further */}
            <section className={section}>
                <div className={reading}>
                    <Reveal>
                        <h2 className={h2}>Go further</h2>
                        <ul className={`mt-6 space-y-3 ${body}`}>
                            <li><Link href={feature.href} className={link}>{feature.label}</Link>: {feature.summary}</li>
                            {guides.map((g) => <li key={g.slug}><Link href={`/guides/${g.slug}`} className={link}>{g.title}</Link></li>)}
                            {c.useCase && <li><Link href={`/use-cases/${c.useCase}`} className={link}>{getPage(c.useCase, "use-case").label}</Link>: the whole workflow, from search to a list you can use</li>}
                            {related.map((r) => <li key={r.slug}><Link href={`/scrapers/${r.slug}`} className={link}>Collect from {r.name}</Link></li>)}
                        </ul>
                    </Reveal>
                </div>
            </section>

            <CTA />
        </main>
    );
}
