import React from "react";
import Link from "next/link";
import { ArrowRight, Check, Chrome } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import CTA from "@/components/landing/CTA";
import { productConfig } from "@/config/product";
import { JsonLd, faqJsonLd } from "@/components/seo/JsonLd";
import { ogImageUrl } from "@/lib/og";
import type { Metadata } from "next";
import { relatedPages, type SitePage } from "@/config/pages";
import { Screenshot } from "@/components/Screenshot";
import { getCapture } from "@/lib/visuals";

/** Content for one product feature page. Copy rules: docs/content-standards.md and docs/writing-style.md. */
export interface FeaturePageContent {
    page: SitePage;
    meta: { title: string; description: string };
    eyebrow: string;
    h1: string;
    intro: string;
    /** ISO date the page's claims were last checked against the released extension. */
    lastUpdated: string;
    /** Capture id (visuals library) shown under the headline once it exists; until then the sample table shows. */
    hero?: string;
    /** `label` defaults to "Sample data." Keep to five columns or fewer so it reads without scrolling. */
    sample?: { label?: string; caption: string; columns: string[]; rows: string[][] };
    /** `eyebrow` defaults to "What you get". Items render as a two-column table, or as cards when any item has an `example`. */
    fields: { eyebrow?: string; heading: string; intro?: string; items: { name: string; description: string; /** A prompt or input that shows the item in use; renders items as cards. */ example?: string }[] };
    /** Each step can name a capture id; it renders under the step once captured (placeholder in local dev). */
    /** `points` are the specifics under a step: an example to type, a number, a thing to watch for. */
    steps: { heading: string; intro?: string; items: { title: string; body: string; points?: string[]; screenshot?: string }[] };
    /** Extra sections that are specific to this feature (e.g. "Add emails to your list"). */
    sections?: { id: string; eyebrow: string; heading: string; paragraphs: string[]; points?: string[]; screenshot?: string }[];
    limits: { heading: string; items: string[] };
    useCases: { heading: string; items: { title: string; body: string }[] };
    faqs: { q: string; a: string }[];
    /** Slugs from config/pages.ts. Only published ones are shown. */
    related: string[];
}

const formatDate = (iso: string) =>
    new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

// Readability rules (docs/writing-style.md §11): one reading column, 18px body, semibold headings in slate-800,
// every section opens with its answer. Same shape as UseCasePage.
const reading = "max-w-[56rem] mx-auto px-6 md:px-12";
const wide = "max-w-7xl mx-auto px-6 md:px-8";
const body = "text-lg text-slate-700 dark:text-slate-200 leading-[1.65]";
const h2 = "text-[1.75rem] font-semibold tracking-tight text-slate-800 dark:text-white leading-tight";
const eyebrowCls = "text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]";

/** Page metadata for a feature page: its own canonical and a titled Open Graph image. */
export function featureMetadata(c: FeaturePageContent): Metadata {
    return {
        title: c.meta.title,
        description: c.meta.description,
        alternates: { canonical: c.page.href },
        openGraph: {
            title: c.meta.title,
            description: c.meta.description,
            url: c.page.href,
            images: [{ url: ogImageUrl(c.h1, c.meta.description), width: 1200, height: 630, alt: c.h1 }],
        },
    };
}

/** `visual` (optional) sits under the headline, e.g. a product demo; without it the capture or the sample table does. */
export default function FeaturePage({ content: c, visual }: { content: FeaturePageContent; visual?: React.ReactNode }) {
    const related = relatedPages(c.related);
    const comingSoon = Boolean(c.page.comingSoon || c.page.status === "soon");
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=${c.page.slug}&utm_campaign=chrome_install`;
    const heroVisual = visual ?? (c.hero && getCapture(c.hero) ? <Screenshot id={c.hero} className="my-0" /> : undefined);
    const cards = c.fields.items.some((f) => f.example);

    return (
        <main id="main" className="flex-1 bg-white dark:bg-slate-950">
            {c.faqs.length > 0 && <JsonLd data={faqJsonLd(c.faqs)} />}

            {/* Hero: the answer, one short intro, the two buttons */}
            <section className="pt-28 pb-10 md:pt-32 md:pb-12">
                <div className={reading}>
                    <Reveal>
                        <p className={eyebrowCls}>
                            {c.eyebrow}
                            {comingSoon && (
                                <span className="ml-2 inline-flex align-middle rounded-full bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-sm font-semibold text-slate-600 dark:text-slate-300">
                                    Coming soon
                                </span>
                            )}
                        </p>
                        <h1 className="mt-3 text-[2rem] md:text-[2.5rem] font-semibold tracking-tight text-slate-800 dark:text-white leading-[1.2]">{c.h1}</h1>
                        <p className={`mt-5 ${body} md:text-xl`}>{c.intro}</p>
                        <div className="mt-7 flex flex-col sm:flex-row gap-3">
                            <Link
                                href={installUrl}
                                target="_blank"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1f5ec2] hover:bg-[#1a4fa3] px-6 py-3 text-base font-semibold text-white transition-colors"
                            >
                                <Chrome className="w-5 h-5" aria-hidden="true" />
                                Add to Chrome, it&apos;s free
                            </Link>
                            <a
                                href="#how-it-works"
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-6 py-3 text-base font-semibold text-slate-800 dark:text-slate-100 hover:border-slate-400 dark:hover:border-slate-500 transition-colors"
                            >
                                See the steps
                            </a>
                        </div>
                        <p className="mt-5 text-base text-slate-600 dark:text-slate-300">
                            {comingSoon ? "Planned feature; details may change before release." : <>Last checked against the extension on <time dateTime={c.lastUpdated}>{formatDate(c.lastUpdated)}</time>.</>}
                        </p>
                    </Reveal>
                </div>
                {(heroVisual || c.sample) && (
                    <div className={`${reading} mt-10`}>
                        <Reveal delay={0.08}>{heroVisual ?? <SampleTable sample={c.sample!} />}</Reveal>
                    </div>
                )}
            </section>

            {/* Steps */}
            <section id="how-it-works" className="py-12 md:py-16 scroll-mt-24">
                <div className={reading}>
                    <Reveal>
                        <p className={eyebrowCls}>How it works</p>
                        <h2 className={`mt-2 ${h2}`}>{c.steps.heading}</h2>
                        {c.steps.intro && <p className={`mt-4 ${body}`}>{c.steps.intro}</p>}
                    </Reveal>
                    <ol className="mt-8 divide-y divide-slate-200 dark:divide-slate-800">
                        {c.steps.items.map((s, i) => (
                            <Reveal as="li" key={s.title} delay={i * 0.04} className="py-8 first:pt-2">
                                <div>
                                    <div className="flex items-start gap-4">
                                        <span className="mt-0.5 inline-flex w-9 h-9 shrink-0 items-center justify-center rounded-full bg-[#2772ED]/10 text-base font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]" aria-hidden="true">
                                            {i + 1}
                                        </span>
                                        <div className="min-w-0">
                                            <h3 className="text-xl font-semibold text-slate-800 dark:text-white leading-snug">
                                                <span className="sr-only">Step {i + 1}: </span>
                                                {s.title}
                                            </h3>
                                            <p className={`mt-3 ${body}`}>{s.body}</p>
                                            {s.points && s.points.length > 0 && (
                                                <ul className={`mt-4 space-y-2 ${body}`}>
                                                    {s.points.map((pt) => (
                                                        <li key={pt} className="flex gap-3">
                                                            <span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-[#1f5ec2] dark:bg-[#7aa7ff]" aria-hidden="true" />
                                                            <span>{pt}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                    {s.screenshot && <Screenshot id={s.screenshot} className="mt-6 mb-0 md:ml-[3.25rem]" />}
                                </div>
                            </Reveal>
                        ))}
                    </ol>
                </div>
            </section>

            {/* Fields */}
            <section id="what-you-get" className="py-12 md:py-16 scroll-mt-24 border-t border-slate-200 dark:border-slate-800">
                <div className={reading}>
                    <Reveal>
                        <p className={eyebrowCls}>{c.fields.eyebrow ?? "What you get"}</p>
                        <h2 className={`mt-2 ${h2}`}>{c.fields.heading}</h2>
                        {c.fields.intro && <p className={`mt-4 ${body}`}>{c.fields.intro}</p>}
                    </Reveal>
                    {cards ? (
                        <ul className="mt-8 grid sm:grid-cols-2 gap-4">
                            {c.fields.items.map((f, i) => (
                                <Reveal as="li" key={f.name} delay={i * 0.03} className="h-full">
                                    <div className="h-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                                        <h3 className="text-lg font-semibold text-slate-800 dark:text-white">{f.name}</h3>
                                        {f.example && (
                                            <p className="mt-3 inline-block rounded-2xl rounded-br-sm bg-[#1f5ec2] px-3 py-1.5 text-base text-white">{f.example}</p>
                                        )}
                                        <p className="mt-3 text-base text-slate-700 dark:text-slate-200 leading-[1.65]">{f.description}</p>
                                    </div>
                                </Reveal>
                            ))}
                        </ul>
                    ) : (
                        <Reveal className="mt-8">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b-2 border-slate-200 dark:border-slate-700">
                                        <th scope="col" className="py-2.5 pr-5 text-base font-semibold text-slate-800 dark:text-white">Column</th>
                                        <th scope="col" className="py-2.5 text-base font-semibold text-slate-800 dark:text-white">What it holds</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {c.fields.items.map((f) => (
                                        <tr key={f.name} className="border-b border-slate-100 dark:border-slate-800/60 align-top">
                                            <th scope="row" className="py-3 pr-5 text-lg font-semibold text-slate-800 dark:text-white whitespace-nowrap">{f.name}</th>
                                            <td className={`py-3 ${body}`}>{f.description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </Reveal>
                    )}
                </div>
            </section>

            {/* Feature-specific sections */}
            {c.sections?.map((s) => (
                <section key={s.id} id={s.id} className="py-12 md:py-16 scroll-mt-24 border-t border-slate-200 dark:border-slate-800">
                    <div className={reading}>
                        <Reveal>
                            <p className={eyebrowCls}>{s.eyebrow}</p>
                            <h2 className={`mt-2 ${h2}`}>{s.heading}</h2>
                            <div className={`mt-5 space-y-5 ${body}`}>
                                {s.paragraphs.map((p) => (
                                    <p key={p}>{p}</p>
                                ))}
                                {s.points && (
                                    <ul className="space-y-3">
                                        {s.points.map((pt) => (
                                            <li key={pt} className="flex gap-3">
                                                <Check className="w-5 h-5 mt-[0.3em] shrink-0 text-[#1f5ec2] dark:text-[#7aa7ff]" aria-hidden="true" />
                                                <span>{pt}</span>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                            {s.screenshot && <Screenshot id={s.screenshot} className="mt-8 mb-0" />}
                        </Reveal>
                    </div>
                </section>
            ))}

            {/* Use cases */}
            <section className="py-12 md:py-16 border-t border-slate-200 dark:border-slate-800">
                <div className={reading}>
                    <Reveal>
                        <h2 className={h2}>{c.useCases.heading}</h2>
                        <ul className="mt-6 space-y-6">
                            {c.useCases.items.map((u) => (
                                <li key={u.title}>
                                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white">{u.title}</h3>
                                    <p className={`mt-2 ${body}`}>{u.body}</p>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* Limits */}
            <section className="py-12 md:py-16 border-t border-slate-200 dark:border-slate-800">
                <div className={reading}>
                    <Reveal>
                        <h2 className={h2}>{c.limits.heading}</h2>
                        <ul className={`mt-6 space-y-3 ${body}`}>
                            {c.limits.items.map((l) => (
                                <li key={l} className="flex gap-3">
                                    <span className="mt-[0.7em] h-2 w-2 shrink-0 rounded-full bg-slate-400 dark:bg-slate-500" aria-hidden="true" />
                                    <span>{l}</span>
                                </li>
                            ))}
                        </ul>
                    </Reveal>
                </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="py-12 md:py-16 border-t border-slate-200 dark:border-slate-800">
                <div className={reading}>
                    <Reveal>
                        <h2 className={h2}>Questions, answered</h2>
                    </Reveal>
                    <div className="mt-6 divide-y divide-slate-200 dark:divide-slate-800">
                        {c.faqs.map((f, i) => (
                            <details key={f.q} className="group py-5" open={i === 0}>
                                <summary className="flex cursor-pointer list-none items-start justify-between gap-4 [&::-webkit-details-marker]:hidden rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1f5ec2]">
                                    <h3 className="text-xl font-semibold text-slate-800 dark:text-white leading-snug">{f.q}</h3>
                                    <span className="mt-1 text-2xl leading-none text-slate-500 dark:text-slate-400 transition-transform group-open:rotate-45" aria-hidden="true">+</span>
                                </summary>
                                <p className={`mt-3 ${body}`}>{f.a}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* Related */}
            {related.length > 0 && (
                <section className="py-12 md:py-16 border-t border-slate-200 dark:border-slate-800">
                    <div className={wide}>
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-white">Related features</h2>
                        <ul className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {related.map((r) => (
                                <li key={r.slug}>
                                    <Link
                                        href={r.href}
                                        className="group block h-full rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 hover:border-[#2772ED]/40 transition-colors"
                                    >
                                        <span className="flex items-center gap-1.5 text-lg font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">
                                            {r.label}
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                                        </span>
                                        <span className="mt-1 block text-base text-slate-700 dark:text-slate-200">{r.summary}</span>
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

function SampleTable({ sample }: { sample: NonNullable<FeaturePageContent["sample"]> }) {
    return (
        <figure className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden">
            <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Sample table, scrolls sideways">
                <table className="w-full text-left text-base">
                    <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-800 dark:text-slate-100">
                        <tr>
                            {sample.columns.map((col) => (
                                <th key={col} scope="col" className="px-3 py-2.5 font-semibold whitespace-nowrap">
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
                        {sample.rows.map((row, i) => (
                            <tr key={i}>
                                {row.map((cell, j) => (
                                    <td key={j} className="px-3 py-2.5 whitespace-nowrap">
                                        {cell}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <figcaption className="border-t border-slate-100 dark:border-slate-800 px-4 py-3 text-base text-slate-600 dark:text-slate-300">
                <span className="font-medium text-slate-700 dark:text-slate-200">{sample.label ?? "Sample data."}</span> {sample.caption}
            </figcaption>
        </figure>
    );
}
