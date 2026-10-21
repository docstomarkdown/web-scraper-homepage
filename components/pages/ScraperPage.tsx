import Link from "next/link";
import { Chrome, Check } from "lucide-react";
import type { Metadata } from "next";
import Reveal from "@/components/landing/Reveal";
import SectionHeading from "@/components/landing/SectionHeading";
import CTA from "@/components/landing/CTA";
import { Screenshot } from "@/components/Screenshot";
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
    sample: { caption: string; columns: string[]; rows: string[][] };
    fields: { heading: string; intro?: string; items: { name: string; description: string }[] };
    steps: { heading: string; items: { title: string; body: string }[] };
    /** What's specific to this site: sign-in, paging, limits, known gaps. */
    notes: { heading: string; items: string[] };
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

const container = "max-w-6xl mx-auto px-6 md:px-12";

export default function ScraperPage({ content: c, related }: { content: ScraperPageContent; related: { slug: string; name: string }[] }) {
    const category: SitePage = getPage(c.category, "scraper");
    const feature = getPage(c.feature);
    const base = siteConfig.url.replace(/\/$/, "");
    const href = `/scrapers/${c.slug}`;
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=scraper-${c.slug}&utm_campaign=chrome_install`;

    return (
        <main className="flex-1 bg-white dark:bg-slate-950">
            <JsonLd data={[breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Sites", href: "/scrapers" }, { name: category.label, href: category.href }, { name: c.site.name, href }], base), ...(c.faqs.length ? [faqJsonLd(c.faqs)] : [])]} />
            <section className="pt-32 pb-16 md:pt-36 md:pb-20">
                <div className={container}>
                    {c.status === "draft" && (
                        <p className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-2 text-sm text-amber-800 dark:text-amber-200">Draft: visible in local development only.</p>
                    )}
                    <Reveal className="max-w-3xl">
                        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400">
                            <Link href="/scrapers" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">Sites</Link>
                            {" / "}
                            <Link href={category.href} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{category.label}</Link>
                        </nav>
                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{c.h1}</h1>
                        <p className="mt-5 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">{c.intro}</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link href={installUrl} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-6 py-3.5 text-base font-semibold text-white transition-colors">
                                <Chrome className="w-5 h-5" aria-hidden="true" />
                                Add to Chrome
                            </Link>
                            <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                See how it works
                            </a>
                        </div>
                        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                            Last verified on version {c.version} on <time dateTime={c.lastVerified}>{formatDate(c.lastVerified)}</time>
                        </p>
                    </Reveal>
                    <Reveal className="mt-14">
                        <figure className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200">
                                    <tr>{c.sample.columns.map((col) => <th key={col} className="px-4 py-2.5 font-semibold whitespace-nowrap">{col}</th>)}</tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                                    {c.sample.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j} className="px-4 py-2.5 whitespace-nowrap">{cell}</td>)}</tr>)}
                                </tbody>
                            </table>
                            <figcaption className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">Sample data. {c.sample.caption}</figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            <section className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
                <div className={container}>
                    <Reveal><SectionHeading eyebrow="What you get" title={c.fields.heading} intro={c.fields.intro} align="left" /></Reveal>
                    <Reveal className="mt-10">
                        <dl className="grid md:grid-cols-2 gap-x-10 gap-y-6">
                            {c.fields.items.map((f) => (
                                <div key={f.name} className="border-t border-slate-200 dark:border-slate-800 pt-4">
                                    <dt className="font-semibold text-slate-900 dark:text-white">{f.name}</dt>
                                    <dd className="mt-1 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{f.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </Reveal>
                </div>
            </section>

            <section id="how-it-works" className="py-20 scroll-mt-24">
                <div className={container}>
                    <Reveal><SectionHeading eyebrow="How it works" title={c.steps.heading} align="left" /></Reveal>
                    <ol className="mt-10 grid md:grid-cols-3 gap-5">
                        {c.steps.items.map((s, i) => (
                            <Reveal key={s.title} delay={i * 0.05} className="h-full">
                                <li className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                                    <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#2772ED]/10 text-sm font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">{i + 1}</span>
                                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                                    <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{s.body}</p>
                                </li>
                            </Reveal>
                        ))}
                    </ol>
                    {c.screenshots.map((id) => <Screenshot key={id} id={id} />)}
                </div>
            </section>

            <section className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
                <div className={`${container} grid lg:grid-cols-2 gap-12`}>
                    <Reveal>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{c.notes.heading}</h2>
                        <ul className="mt-6 space-y-3">
                            {c.notes.items.map((n) => (
                                <li key={n} className="flex gap-3 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">
                                    <Check className="w-5 h-5 mt-0.5 shrink-0 text-[#2772ED] dark:text-[#7aa7ff]" aria-hidden="true" />
                                    <span>{n}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal>
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Go further</h2>
                        <ul className="mt-6 space-y-3 text-[15px]">
                            <li><Link href={feature.href} className="text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">{feature.label}</Link>: {feature.summary}</li>
                            {c.guide && <li><Link href={`/guides/${c.guide}`} className="text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">Step-by-step guide for {c.site.name}</Link></li>}
                            {c.useCase && <li><Link href={`/use-cases/${c.useCase}`} className="text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">{getPage(c.useCase, "use-case").label}</Link>: the whole workflow</li>}
                            {related.map((r) => <li key={r.slug}><Link href={`/scrapers/${r.slug}`} className="text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">Collect from {r.name}</Link></li>)}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {c.faqs.length > 0 && (
                <section className="py-20">
                    <div className="max-w-3xl mx-auto px-6 md:px-12">
                        <Reveal><SectionHeading eyebrow="FAQ" title="Questions, answered" /></Reveal>
                        <div className="mt-10 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
                            {c.faqs.map((f) => (
                                <details key={f.q} className="group py-5">
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
                                        <h3 className="text-base">{f.q}</h3>
                                        <span className="mt-0.5 text-slate-400 dark:text-slate-500 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                                    </summary>
                                    <p className="mt-3 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
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
