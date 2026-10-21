import type { Metadata } from "next";
import Link from "next/link";
import { changelog } from "@/content/changelog";
import { formatDate } from "@/lib/format-date";
import { siteConfig } from "@/config/site";
import { pages } from "@/config/pages";
import SectionHeading from "@/components/landing/SectionHeading";
import { JsonLd, breadcrumbJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "What's new",
    description: "Every Web Scraper Pro release, newest first: what changed, in plain words, with the page that explains each feature.",
    alternates: { canonical: "/changelog" },
};

export default function ChangelogPage() {
    const base = siteConfig.url.replace(/\/$/, "");
    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "What's new", href: "/changelog" }], base)} />
            <div className="max-w-3xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="What's new" title="Every release, in plain words" intro="What changed in each version of the Chrome extension, newest first. Cloud runs, MCP and the API are described on their own pages until they ship." align="left" />
                <div className="mt-14 space-y-16">
                    {changelog.map((r) => (
                        <article key={r.version} id={`v${r.version.replace(/\./g, "-")}`} className="scroll-mt-28">
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                <span className="font-semibold text-slate-900 dark:text-white">Version {r.version}</span>
                                {" · "}
                                <time dateTime={r.date}>{formatDate(r.date)}</time>
                            </p>
                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{r.title}</h2>
                            <p className="mt-3 text-[17px] text-slate-600 dark:text-slate-300 leading-relaxed">{r.intro}</p>
                            <ul className="mt-6 space-y-3">
                                {r.changes.map((c) => (
                                    <li key={c.text} className="flex gap-3 text-[15px] text-slate-700 dark:text-slate-200 leading-relaxed">
                                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2772ED]" aria-hidden="true" />
                                        <span>
                                            {c.text}
                                            {c.href && (
                                                <>
                                                    {" "}
                                                    <Link href={c.href} className="font-medium text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">
                                                        {pages.find((p) => p.href === c.href)?.label ?? "Read the page"}
                                                    </Link>
                                                </>
                                            )}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
                <p className="mt-16 text-sm text-slate-500 dark:text-slate-400">
                    The version you have is shown in Settings in the side panel. Chrome updates extensions on its own within a few hours of a release.
                </p>
            </div>
        </main>
    );
}
