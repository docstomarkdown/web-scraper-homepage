import type { Metadata } from "next";
import Link from "next/link";
import { sitesByCategory } from "@/content/sites";
import { scraperPages } from "@/content/scrapers";
import { isVisible } from "@/components/pages/ScraperPage";
import { getPage, isPublished, showPlannedPages } from "@/config/pages";
import SectionHeading from "@/components/landing/SectionHeading";
import { formatDate } from "@/lib/format-date";

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
                        <section key={category.slug} id={category.slug} className="scroll-mt-28">
                            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                                {isPublished(category) ? <Link href={category.href} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{category.label}</Link> : category.label}
                            </h2>
                            <ul className="mt-4 grid gap-x-8 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                                {sites.map((s) => {
                                    const page = s.page ? scraperPages[s.page] : null;
                                    const linkable = page && isVisible(page);
                                    return (
                                        <li key={s.name} className="flex flex-col text-base">
                                            {linkable ? (
                                                <Link href={`/scrapers/${s.page}`} className="font-medium text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">{s.name}</Link>
                                            ) : (
                                                <span className="font-medium text-slate-800 dark:text-slate-100">{s.name}</span>
                                            )}
                                            {/* Only a published site page carries a verified run; drafts and setups without a page haven't been re-run on 1.3.0. */}
                                            <span className="text-slate-600 dark:text-slate-300">
                                                {page && page.status === "published" ? <>Last verified on {page.version}, <time dateTime={page.lastVerified}>{formatDate(page.lastVerified)}</time></> : "Setup in the extension; not yet re-run on 1.3.0"}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </section>
                    ))}
                </div>
                <p className="mt-14 text-base text-slate-600 dark:text-slate-300">
                    Not listed? Most sites with a list are detected automatically, including directories such as Hotfrog, Angi, Houzz, Manta and canada411, with the columns named from the page. See <Link href={getPage("list-scraper").href} className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">lists from any website</Link>.
                </p>
                <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
                    &quot;Last verified&quot; is the date the site&apos;s setup was last run on the released extension and its columns checked by hand. Need a site that isn&apos;t here, or found one that stopped working? <Link href="/support" className="text-[#1f5ec2] dark:text-[#7aa7ff] underline underline-offset-2">Request a site or report a problem</Link>, with the page&apos;s address.
                </p>
            </div>
        </main>
    );
}
