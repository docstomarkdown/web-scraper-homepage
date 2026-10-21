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

/** Content for one use-case page (/use-cases/<slug>): a whole job, in the reader's words, across the features it uses. */
export interface UseCasePageContent {
    page: SitePage;
    meta: { title: string; description: string };
    h1: string;
    intro: string;
    status: "draft" | "published";
    lastUpdated: string;
    /** The job as the reader would describe it, and who they are (from docs/personas.md). */
    job: { heading: string; paragraphs: string[] };
    /** The workflow from start to finish; each step names the feature it uses. */
    workflow: { heading: string; intro?: string; steps: { title: string; body: string; feature?: string; screenshot?: string }[] };
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

const container = "max-w-6xl mx-auto px-6 md:px-12";

export default function UseCasePage({ content: c }: { content: UseCasePageContent }) {
    const base = siteConfig.url.replace(/\/$/, "");
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=use-case-${c.page.slug}&utm_campaign=chrome_install`;
    return (
        <main className="flex-1 bg-white dark:bg-slate-950">
            <JsonLd data={[breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Use cases", href: "/use-cases" }, { name: c.page.label, href: c.page.href }], base), ...(c.faqs.length ? [faqJsonLd(c.faqs)] : [])]} />
            <section className="pt-32 pb-16 md:pt-36 md:pb-20">
                <div className={container}>
                    {c.status === "draft" && <p className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-2 text-sm text-amber-800 dark:text-amber-200">Draft: visible in local development only.</p>}
                    <Reveal className="max-w-3xl">
                        <nav aria-label="Breadcrumb" className="text-sm text-slate-500 dark:text-slate-400"><Link href="/use-cases" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">Use cases</Link></nav>
                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{c.h1}</h1>
                        <p className="mt-5 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">{c.intro}</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link href={installUrl} target="_blank" className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-6 py-3.5 text-base font-semibold text-white transition-colors"><Chrome className="w-5 h-5" aria-hidden="true" />Add to Chrome</Link>
                            <a href="#workflow" className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">See the workflow</a>
                        </div>
                        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">Last updated <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time></p>
                    </Reveal>
                </div>
            </section>

            <section className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
                <div className={`${container} grid lg:grid-cols-2 gap-10`}>
                    <Reveal><SectionHeading eyebrow="The job" title={c.job.heading} align="left" /></Reveal>
                    <Reveal className="space-y-4 text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed">{c.job.paragraphs.map((p) => <p key={p}>{p}</p>)}</Reveal>
                </div>
            </section>

            <section id="workflow" className="py-20 scroll-mt-24">
                <div className={container}>
                    <Reveal><SectionHeading eyebrow="Start to finish" title={c.workflow.heading} intro={c.workflow.intro} align="left" /></Reveal>
                    <ol className="mt-10 space-y-6">
                        {c.workflow.steps.map((s, i) => {
                            const f = s.feature ? getPage(s.feature) : null;
                            return (
                                <Reveal key={s.title} delay={i * 0.04}>
                                    <li className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 md:grid md:grid-cols-[48px_1fr] md:gap-5">
                                        <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#2772ED]/10 text-sm font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">{i + 1}</span>
                                        <div className="mt-3 md:mt-0">
                                            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                                            <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{s.body}</p>
                                            {f && <p className="mt-3 text-sm"><Link href={f.href} className="text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">{f.label}</Link></p>}
                                            {s.screenshot && <Screenshot id={s.screenshot} className="mt-4 mb-0" />}
                                        </div>
                                    </li>
                                </Reveal>
                            );
                        })}
                    </ol>
                    <Reveal className="mt-12">
                        <figure className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-200"><tr>{c.sample.columns.map((col) => <th key={col} className="px-4 py-2.5 font-semibold whitespace-nowrap">{col}</th>)}</tr></thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">{c.sample.rows.map((r, i) => <tr key={i}>{r.map((cell, j) => <td key={j} className="px-4 py-2.5 whitespace-nowrap">{cell}</td>)}</tr>)}</tbody>
                            </table>
                            <figcaption className="px-4 py-2.5 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">Sample data. {c.sample.caption}</figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            <section className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
                <div className={`${container} grid lg:grid-cols-3 gap-12`}>
                    <Reveal>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Which sites</h2>
                        <ul className="mt-5 flex flex-wrap gap-2">
                            {c.sites.map((s) => (
                                <li key={s.name}>
                                    {s.page ? <Link href={`/scrapers/${s.page}`} className="rounded-full border border-[#2772ED]/40 bg-[#2772ED]/5 px-3 py-1 text-sm text-[#1f5ec2] dark:text-[#7aa7ff] hover:bg-[#2772ED]/10">{s.name}</Link> : <span className="rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/60 px-3 py-1 text-sm text-slate-700 dark:text-slate-200">{s.name}</span>}
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                    <Reveal>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{c.cantDo.heading}</h2>
                        <ul className="mt-5 space-y-3">{c.cantDo.items.map((n) => <li key={n} className="flex gap-3 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed"><Check className="w-5 h-5 mt-0.5 shrink-0 text-slate-400" aria-hidden="true" /><span>{n}</span></li>)}</ul>
                    </Reveal>
                    <Reveal>
                        <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Guides</h2>
                        <ul className="mt-5 space-y-3 text-[15px]">{c.guides.map((g) => <li key={g}><Link href={`/guides/${g}`} className="text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">{g.replace(/-/g, " ").replace(/^\w/, (m) => m.toUpperCase())}</Link></li>)}</ul>
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
                                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden"><h3 className="text-base">{f.q}</h3><span className="mt-0.5 text-slate-400 dark:text-slate-500 transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary>
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
