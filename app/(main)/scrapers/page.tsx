import type { Metadata } from "next";
import Link from "next/link";
import { sitesByCategory } from "@/content/sites";
import { scraperPages } from "@/content/scrapers";
import { isVisible } from "@/components/pages/ScraperPage";
import { getPage, isPublished, showPlannedPages } from "@/config/pages";
import SectionHeading from "@/components/landing/SectionHeading";

export const metadata: Metadata = {
    title: "Ready-made sites",
    description: "The sites Web Scraper Pro has a tuned setup for, with named columns and no configuration, grouped by what they're for.",
    alternates: { canonical: "/scrapers" },
};

export default function ScrapersHub() {
    const groups = sitesByCategory().filter((g) => isPublished(g.category) || showPlannedPages);
    return (
        <main id="main" className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="Sites" title="Ready-made for the sites you already use" intro="These sites come with a tuned setup, so the right columns show up with no configuration. Everything else with a list is detected automatically." />
                <div className="mt-14 space-y-12">
                    {groups.map(({ category, sites }) => (
                        <section key={category.slug}>
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {isPublished(category) ? <Link href={category.href} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{category.label}</Link> : category.label}
                            </h2>
                            <ul className="mt-4 flex flex-wrap gap-2">
                                {sites.map((s) => {
                                    const page = s.page ? scraperPages[s.page] : null;
                                    const linkable = page && isVisible(page);
                                    const cls = "rounded-full border px-3 py-1 text-sm";
                                    return (
                                        <li key={s.name}>
                                            {linkable ? (
                                                <Link href={`/scrapers/${s.page}`} className={`${cls} border-[#2772ED]/40 bg-[#2772ED]/5 text-[#1f5ec2] dark:text-[#7aa7ff] hover:bg-[#2772ED]/10`}>{s.name}</Link>
                                            ) : (
                                                <span className={`${cls} border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200`}>{s.name}</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                </div>
                <p className="mt-14 text-base text-slate-600 dark:text-slate-300">
                    Not listed? Most sites with a list are detected automatically. See <Link href={getPage("list-scraper").href} className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">lists from any website</Link>.
                </p>
            </div>
        </main>
    );
}
