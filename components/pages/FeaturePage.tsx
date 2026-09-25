import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Chrome, Info } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import SectionHeading from "@/components/landing/SectionHeading";
import CTA from "@/components/landing/CTA";
import { productConfig } from "@/config/product";
import { relatedPages, type SitePage } from "@/config/pages";

/** Content for one product feature page. Copy rules: docs/content-standards.md and docs/writing-style.md. */
export interface FeaturePageContent {
    page: SitePage;
    meta: { title: string; description: string };
    eyebrow: string;
    h1: string;
    intro: string;
    /** ISO date the page's claims were last checked against the released extension. */
    lastUpdated: string;
    sample: { caption: string; columns: string[]; rows: string[][] };
    fields: { heading: string; intro?: string; items: { name: string; description: string }[] };
    steps: { heading: string; intro?: string; items: { title: string; body: string }[] };
    /** Extra sections that are specific to this feature (e.g. "Add emails to your list"). */
    sections?: { id: string; eyebrow: string; heading: string; paragraphs: string[]; points?: string[] }[];
    limits: { heading: string; items: string[] };
    useCases: { heading: string; items: { title: string; body: string }[] };
    faqs: { q: string; a: string }[];
    /** Slugs from config/pages.ts. Only published ones are shown. */
    related: string[];
}

const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

const container = "max-w-6xl mx-auto px-6 md:px-12";

export default function FeaturePage({ content: c }: { content: FeaturePageContent }) {
    const related = relatedPages(c.related);
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=${c.page.slug}&utm_campaign=chrome_install`;

    return (
        <main className="flex-1 bg-white dark:bg-slate-950">
            {/* Hero */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-20">
                <div className={container}>
                    <Reveal className="max-w-3xl">
                        <p className="text-sm font-semibold text-[#2772ED] dark:text-[#7aa7ff]">{c.eyebrow}</p>
                        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                            {c.h1}
                        </h1>
                        <p className="mt-5 text-lg md:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">{c.intro}</p>
                        <div className="mt-8 flex flex-col sm:flex-row gap-3">
                            <Link
                                href={installUrl}
                                target="_blank"
                                className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-[#2772ED]/25 transition-all hover:-translate-y-px"
                            >
                                <Chrome className="w-5 h-5" aria-hidden="true" />
                                Add to Chrome
                            </Link>
                            <a
                                href="#how-it-works"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
                            >
                                See how it works
                            </a>
                        </div>
                        <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                            Last updated <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time>
                        </p>
                    </Reveal>

                    {/* Sample output */}
                    <Reveal className="mt-14">
                        <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/50 dark:shadow-black/30 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[720px] text-left text-sm">
                                    <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-700 dark:text-slate-200">
                                        <tr>
                                            {c.sample.columns.map((col) => (
                                                <th key={col} scope="col" className="px-4 py-3 font-semibold whitespace-nowrap">
                                                    {col}
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                                        {c.sample.rows.map((row, i) => (
                                            <tr key={i}>
                                                {row.map((cell, j) => (
                                                    <td key={j} className="px-4 py-3 whitespace-nowrap">
                                                        {cell}
                                                    </td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <figcaption className="border-t border-slate-100 dark:border-slate-800 px-4 py-3 text-sm text-slate-500 dark:text-slate-400">
                                <span className="font-medium text-slate-700 dark:text-slate-200">Sample data.</span> {c.sample.caption}
                            </figcaption>
                        </figure>
                    </Reveal>
                </div>
            </section>

            {/* Fields */}
            <section id="what-you-get" className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
                <div className={container}>
                    <Reveal>
                        <SectionHeading eyebrow="What you get" title={c.fields.heading} intro={c.fields.intro} align="left" />
                    </Reveal>
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

            {/* Steps */}
            <section id="how-it-works" className="py-20 scroll-mt-24">
                <div className={container}>
                    <Reveal>
                        <SectionHeading eyebrow="How it works" title={c.steps.heading} intro={c.steps.intro} align="left" />
                    </Reveal>
                    <ol className="mt-10 grid md:grid-cols-3 gap-5">
                        {c.steps.items.map((s, i) => (
                            <Reveal key={s.title} delay={i * 0.05} className="h-full">
                                <li className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                                    <span className="inline-flex w-8 h-8 items-center justify-center rounded-full bg-[#2772ED]/10 text-sm font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">
                                        {i + 1}
                                    </span>
                                    <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                                    <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{s.body}</p>
                                </li>
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Feature-specific sections */}
            {c.sections?.map((s, i) => (
                <section
                    key={s.id}
                    id={s.id}
                    className={
                        i % 2 === 0
                            ? "py-20 scroll-mt-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60"
                            : "py-20 scroll-mt-24"
                    }
                >
                    <div className={container}>
                        <Reveal className="grid lg:grid-cols-2 gap-10">
                            <SectionHeading eyebrow={s.eyebrow} title={s.heading} align="left" />
                            <div className="space-y-4 text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed">
                                {s.paragraphs.map((p) => (
                                    <p key={p}>{p}</p>
                                ))}
                                {s.points && (
                                    <ul className="space-y-2.5 pt-1">
                                        {s.points.map((pt) => (
                                            <li key={pt} className="flex gap-3">
                                                <Check className="w-5 h-5 mt-0.5 shrink-0 text-[#2772ED] dark:text-[#7aa7ff]" aria-hidden="true" />
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </section>
            ))}

            {/* Use cases + limits */}
            <section className="py-20">
                <div className={`${container} grid lg:grid-cols-5 gap-12`}>
                    <Reveal className="lg:col-span-3">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">{c.useCases.heading}</h2>
                        <div className="mt-8 space-y-6">
                            {c.useCases.items.map((u) => (
                                <div key={u.title}>
                                    <h3 className="font-semibold text-slate-900 dark:text-white">{u.title}</h3>
                                    <p className="mt-1 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{u.body}</p>
                                </div>
                            ))}
                        </div>
                    </Reveal>
                    <Reveal className="lg:col-span-2" delay={0.05}>
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                            <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-white">
                                <Info className="w-5 h-5 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                                {c.limits.heading}
                            </h2>
                            <ul className="mt-4 space-y-3 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed list-disc pl-5">
                                {c.limits.items.map((l) => (
                                    <li key={l}>{l}</li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-20 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <Reveal>
                        <SectionHeading eyebrow="FAQ" title="Questions, answered" />
                    </Reveal>
                    <div className="mt-10 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
                        {c.faqs.map((f) => (
                            <details key={f.q} className="group py-5">
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
                                    <h3 className="text-base">{f.q}</h3>
                                    <span className="mt-0.5 text-slate-400 dark:text-slate-500 transition-transform group-open:rotate-45" aria-hidden="true">
                                        +
                                    </span>
                                </summary>
                                <p className="mt-3 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related */}
            {related.length > 0 && (
                <section className="py-16">
                    <div className={container}>
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Related features</h2>
                        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {related.map((r) => (
                                <li key={r.slug}>
                                    <Link
                                        href={r.href}
                                        className="group block h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-[#2772ED]/40 transition-colors"
                                    >
                                        <span className="flex items-center gap-1.5 font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">
                                            {r.label}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                                        </span>
                                        <span className="mt-1 block text-sm text-slate-600 dark:text-slate-300">{r.summary}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            <CTA />
        </main>
    );
}
