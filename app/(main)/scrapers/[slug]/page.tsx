import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScraperPage, { isVisible, scraperMetadata } from "@/components/pages/ScraperPage";
import { scraperPages } from "@/content/scrapers";
import { readyMadeSites, visibleSites } from "@/content/sites";
import { pages, getPage, isPublished, showPlannedPages } from "@/config/pages";
import SectionHeading from "@/components/landing/SectionHeading";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

// /scrapers/<slug> is either a per-site page (content/scrapers/) or a category page from the registry.
type Props = { params: Promise<{ slug: string }> };

const categories = () => pages.filter((p) => p.kind === "scraper" && (isPublished(p) || showPlannedPages));

export function generateStaticParams() {
    const sites = Object.values(scraperPages).filter((c) => c.status === "published").map((c) => ({ slug: c.slug }));
    const cats = pages.filter((p) => p.kind === "scraper" && isPublished(p)).map((p) => ({ slug: p.slug }));
    return [...sites, ...cats];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const site = scraperPages[slug];
    if (site && isVisible(site)) return scraperMetadata(site);
    const cat = categories().find((p) => p.slug === slug);
    if (!cat) return { title: "Not found" };
    return { title: `${cat.label}: ready-made sites`, description: `Sites in ${cat.label.toLowerCase()} with a ready-made setup in Web Scraper Pro: ${cat.summary}.`, alternates: { canonical: cat.href }, robots: isPublished(cat) ? undefined : { index: false, follow: false } };
}

export default async function Page({ params }: Props) {
    const { slug } = await params;
    const site = scraperPages[slug];
    if (site && isVisible(site)) {
        const related = site.related.map((s) => scraperPages[s]).filter((r) => r && isVisible(r)).map((r) => ({ slug: r.slug, name: r.site.name }));
        return <ScraperPage content={site} related={related} />;
    }
    const cat = categories().find((p) => p.slug === slug);
    if (!cat) notFound();
    const sites = visibleSites().filter((s) => s.category === cat.slug);
    const base = siteConfig.url.replace(/\/$/, "");
    return (
        <main id="main" className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Sites", href: "/scrapers" }, { name: cat.label, href: cat.href }], base)} />
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <nav aria-label="Breadcrumb" className="text-sm text-slate-600 dark:text-slate-300"><Link href="/scrapers" className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">Sites</Link></nav>
                <div className="mt-4"><SectionHeading as="h1" eyebrow="Ready-made sites" title={cat.label} intro={`Sites with a ready-made setup, so the right columns show up with no setup: ${cat.summary}.`} align="left" /></div>
                <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {sites.map((s) => {
                        const page = s.page ? scraperPages[s.page] : null;
                        const linkable = page && isVisible(page);
                        return (
                            <li key={s.name} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                                <h2 className="font-semibold text-slate-900 dark:text-white">
                                    {linkable ? <Link href={`/scrapers/${s.page}`} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{s.name}</Link> : s.name}
                                </h2>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{linkable ? page!.meta.description : "Ready-made columns in the extension. A page with its fields and a sample is on the way."}</p>
                            </li>
                        );
                    })}
                </ul>
                <p className="mt-10 text-base text-slate-600 dark:text-slate-300">
                    Not listed? Most other sites with a list are detected automatically. See <Link href={getPage("list-scraper").href} className="text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">lists from any website</Link>.
                </p>
            </div>
        </main>
    );
}

export const dynamicParams = false;
// Keep an explicit reference so an unused-import check doesn't drop the shared list.
void readyMadeSites;
