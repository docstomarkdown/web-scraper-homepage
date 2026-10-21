import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chrome } from "lucide-react";
import { getGuide, getGuides, getRelatedGuides } from "@/lib/guides";
import { getPage, showPlannedPages } from "@/config/pages";
import { productConfig } from "@/config/product";
import { siteConfig } from "@/config/site";
import { formatDate } from "@/lib/format-date";
import { ogImageUrl } from "@/lib/og";
import { Markdown } from "@/components/blog/Markdown";
import { VideoEmbed } from "@/components/VideoEmbed";
import { JsonLd, breadcrumbJsonLd, faqJsonLd } from "@/components/seo/JsonLd";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
    return getGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const g = getGuide(slug);
    if (!g || (g.status === "draft" && !showPlannedPages)) return { title: "Guide not found" };
    const href = `/guides/${g.slug}`;
    return {
        title: g.title,
        description: g.description,
        alternates: { canonical: href },
        robots: g.status === "draft" ? { index: false, follow: false } : undefined,
        openGraph: {
            type: "article",
            title: g.title,
            description: g.description,
            url: href,
            publishedTime: g.date,
            modifiedTime: g.updated,
            images: [{ url: ogImageUrl(g.title, g.description), width: 1200, height: 630, alt: g.title }],
        },
    };
}

export default async function GuidePage({ params }: Props) {
    const { slug } = await params;
    const g = getGuide(slug);
    if (!g || (g.status === "draft" && !showPlannedPages)) notFound();
    const feature = g.feature ? getPage(g.feature) : null;
    const related = getRelatedGuides(g);
    const base = siteConfig.url.replace(/\/$/, "");
    const href = `/guides/${g.slug}`;
    const installUrl = `${productConfig.product.ctaUrl}?utm_source=website&utm_medium=guide&utm_campaign=${encodeURIComponent(g.campaign)}`;

    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <JsonLd
                data={[
                    {
                        "@type": "Article",
                        headline: g.title,
                        description: g.description,
                        datePublished: g.date,
                        dateModified: g.updated,
                        author: { "@type": "Person", name: g.author.name, url: g.author.url },
                        publisher: { "@type": "Organization", name: "Thinksolv Technologies", url: siteConfig.url },
                        mainEntityOfPage: `${base}${href}`,
                        ...(g.video ? { video: { "@type": "VideoObject", name: g.title, description: g.description, embedUrl: `https://www.youtube-nocookie.com/embed/${g.video}`, thumbnailUrl: `https://i.ytimg.com/vi/${g.video}/hqdefault.jpg`, uploadDate: g.date } } : {}),
                    },
                    breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Guides", href: "/guides" }, { name: g.title, href }], base),
                    ...(g.faq.length ? [faqJsonLd(g.faq)] : []),
                ]}
            />
            <div className="max-w-6xl mx-auto px-6 md:px-12 lg:grid lg:grid-cols-[1fr_300px] lg:gap-16">
                <article className="max-w-[52rem]">
                    {g.status === "draft" && (
                        <p className="mb-6 rounded-lg bg-amber-50 dark:bg-amber-900/20 px-4 py-2 text-sm text-amber-800 dark:text-amber-200">
                            Draft: visible in local development only. Set <code>status: published</code> once every step has been tested.
                        </p>
                    )}
                    <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-300">
                        <Link href="/guides" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">Guides</Link>
                        {feature ? <>{" / "}<Link href={feature.href} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{feature.label}</Link></> : null}
                    </nav>
                    <h1 className="mt-4 text-[2.125rem] md:text-[2.5rem] font-semibold tracking-tight text-slate-800 dark:text-white leading-[1.15]">{g.title}</h1>
                    <p className="mt-5 text-lg text-slate-700 dark:text-slate-200 leading-[1.65]">{g.description}</p>
                    <p className="mt-5 text-sm text-slate-600 dark:text-slate-300">
                        By <Link href={`/blog/author/${g.author.slug}`} className="font-medium text-slate-700 dark:text-slate-200 hover:underline">{g.author.name}</Link>
                        {" · "}Tested on version {g.version || "—"} on <time dateTime={g.updated}>{formatDate(g.updated)}</time>
                        {" · "}{g.readingMinutes} min read
                    </p>
                    {g.video ? <VideoEmbed id={g.video} title={g.title} /> : null}
                    <div className="mt-8">
                        <Markdown content={g.content} />
                    </div>
                    {g.faq.length > 0 && (
                        <section className="mt-14">
                            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Questions</h2>
                            <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800 border-y border-slate-200 dark:border-slate-800">
                                {g.faq.map((f) => (
                                    <details key={f.q} className="group py-4">
                                        <summary className="cursor-pointer list-none font-semibold text-slate-900 dark:text-white [&::-webkit-details-marker]:hidden">
                                            <h3 className="inline text-base">{f.q}</h3>
                                        </summary>
                                        <p className="mt-3 text-base text-slate-700 dark:text-slate-200 leading-[1.65]">{f.a}</p>
                                    </details>
                                ))}
                            </div>
                        </section>
                    )}
                    <aside className="mt-14 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 p-6">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{g.author.name}</p>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{g.author.role}</p>
                        <p className="mt-2 text-base text-slate-600 dark:text-slate-300">{g.author.bio}</p>
                    </aside>
                </article>
                <aside className="mt-12 lg:mt-0 lg:sticky lg:top-28 lg:self-start space-y-6">
                    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">What this guide uses</p>
                        {feature ? (
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                                <Link href={feature.href} className="font-medium text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">{feature.label}</Link>: {feature.summary}
                            </p>
                        ) : null}
                        <Link
                            href={installUrl}
                            target="_blank"
                            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-5 py-3 text-sm font-semibold text-white transition-colors"
                        >
                            <Chrome className="w-4 h-4" aria-hidden="true" />
                            Add to Chrome
                        </Link>
                    </div>
                    {related.length > 0 && (
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Related guides</p>
                            <ul className="mt-3 space-y-3">
                                {related.map((r) => (
                                    <li key={r.slug}>
                                        <Link href={`/guides/${r.slug}`} className="text-sm text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">{r.title}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </aside>
            </div>
        </main>
    );
}
