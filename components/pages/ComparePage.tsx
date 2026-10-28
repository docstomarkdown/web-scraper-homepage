import type { Metadata } from "next";
import Link from "next/link";
import { Chrome } from "lucide-react";
import Reveal from "@/components/landing/Reveal";
import SectionHeading from "@/components/landing/SectionHeading";
import CTA from "@/components/landing/CTA";
import { productConfig } from "@/config/product";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/format-date";
import { ogImageUrl } from "@/lib/og";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/JsonLd";
import RichText from "@/components/pages/RichText";

/** One comparison page: verdict first, a disclosure line, the at-a-glance table, then the detail. Copy rules: docs/content-standards.md §7. */
export interface ComparePageContent {
    slug: string;
    competitor: { name: string; short: string; url: string };
    meta: { title: string; description: string };
    h1: string;
    intro: string;
    /** The date the competitor's public pages were last read for this comparison. */
    comparedOn: string;
    disclosure: string;
    verdict: { ours: string; theirs: string };
    rows: { area: string; ours: string; theirs: string }[];
    sections: { heading: string; paragraphs: string[] }[];
    faqs: { q: string; a: string }[];
    sources: { label: string; url: string }[];
}

export function compareMetadata(c: ComparePageContent): Metadata {
    const href = `/compare/${c.slug}`;
    return {
        title: c.meta.title,
        description: c.meta.description,
        alternates: { canonical: href },
        openGraph: { title: c.meta.title, description: c.meta.description, url: href, images: [{ url: ogImageUrl(c.h1, c.meta.description), width: 1200, height: 630, alt: c.h1 }] },
    };
}

const cell = "py-3 pr-4 align-top text-base leading-relaxed";

export default function ComparePage({ content: c }: { content: ComparePageContent }) {
    const base = siteConfig.url.replace(/\/$/, "");
    const href = `/compare/${c.slug}`;
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=compare&utm_campaign=${c.slug}`;
    return (
        <main id="main" className="flex-1 bg-white dark:bg-slate-950">
            <JsonLd data={[breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Comparisons", href: "/compare" }, { name: c.competitor.short, href }], base), ...(c.faqs.length ? [faqJsonLd(c.faqs)] : [])]} />
            <section className="pt-32 pb-12 md:pt-36">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <Reveal>
                        <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-300">
                            <Link href="/compare" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">Comparisons</Link>
                        </nav>
                        <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{c.h1}</h1>
                        <p className="mt-5 text-lg text-slate-700 dark:text-slate-200 leading-[1.65]">{c.intro}</p>
                        <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                            Compared on <time dateTime={c.comparedOn}>{formatDate(c.comparedOn)}</time> from <a href={c.competitor.url} rel="nofollow noopener" target="_blank" className="underline underline-offset-2">{c.competitor.short}&apos;s public pages</a>.
                        </p>
                    </Reveal>
                    <Reveal className="mt-10 grid md:grid-cols-2 gap-5">
                        <div className="rounded-2xl border border-[#2772ED]/30 bg-[#2772ED]/5 dark:bg-[#2772ED]/10 p-6">
                            <p className="text-sm font-semibold text-[#1f5ec2] dark:text-[#7aa7ff]">Choose Web Scraper Pro when</p>
                            <p className="mt-2 text-base text-slate-700 dark:text-slate-200 leading-relaxed">{c.verdict.ours}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">Choose {c.competitor.short} when</p>
                            <p className="mt-2 text-base text-slate-700 dark:text-slate-200 leading-relaxed">{c.verdict.theirs}</p>
                        </div>
                    </Reveal>
                    <p className="mt-6 text-sm text-slate-600 dark:text-slate-300">{c.disclosure}</p>
                </div>
            </section>

            <section className="py-12">
                <div className="max-w-5xl mx-auto px-6 md:px-12">
                    <Reveal>
                        <SectionHeading eyebrow="At a glance" title="Side by side" align="left" />
                    </Reveal>
                    <Reveal className="mt-8">
                        <div className="overflow-x-auto" tabIndex={0} role="group" aria-label="Comparison table, scrolls sideways">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-200 dark:border-slate-800 text-sm text-slate-600 dark:text-slate-300">
                                    <th className="py-3 pr-4 font-medium w-[22%]">Area</th>
                                    <th className="py-3 pr-4 font-semibold text-slate-900 dark:text-white w-[39%]">Web Scraper Pro</th>
                                    <th className="py-3 font-semibold text-slate-900 dark:text-white w-[39%]">{c.competitor.short}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {c.rows.map((r) => (
                                    <tr key={r.area} className="border-b border-slate-100 dark:border-slate-800/60">
                                        <th scope="row" className={`${cell} font-semibold text-slate-900 dark:text-white`}>{r.area}</th>
                                        <td className={`${cell} text-slate-700 dark:text-slate-200`}><RichText text={r.ours} /></td>
                                        <td className={`${cell} pr-0 text-slate-700 dark:text-slate-200`}><RichText text={r.theirs} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                    </Reveal>
                </div>
            </section>

            {c.sections.map((s) => (
                <section key={s.heading} className="py-10">
                    <div className="max-w-3xl mx-auto px-6 md:px-12">
                        <Reveal>
                            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{s.heading}</h2>
                            {s.paragraphs.map((p) => (
                                <p key={p} className="mt-4 text-lg text-slate-700 dark:text-slate-200 leading-[1.65]"><RichText text={p} /></p>
                            ))}
                        </Reveal>
                    </div>
                </section>
            ))}

            {c.faqs.length > 0 && (
                <section className="py-12">
                    <div className="max-w-3xl mx-auto px-6 md:px-12">
                        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Questions</h2>
                        <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
                            {c.faqs.map((f) => (
                                <details key={f.q} className="group py-4">
                                    <summary className="cursor-pointer list-none font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden"><h3 className="inline text-base">{f.q}</h3></summary>
                                    <p className="mt-3 text-base text-slate-700 dark:text-slate-200 leading-[1.65]"><RichText text={f.a} /></p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="py-10">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Sources</h2>
                    <ul className="mt-3 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                        {c.sources.map((s) => (
                            <li key={s.url}><a href={s.url} rel="nofollow noopener" target="_blank" className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">{s.label}</a></li>
                        ))}
                    </ul>
                    <Link href={installUrl} target="_blank" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1f5ec2] hover:bg-[#1a4fa3] px-5 py-3 text-sm font-semibold text-white transition-colors">
                        <Chrome className="w-4 h-4" aria-hidden="true" />
                        Add Web Scraper Pro to Chrome
                    </Link>
                </div>
            </section>
            <CTA />
        </main>
    );
}
