import type { Metadata } from "next";
import Link from "next/link";
import { pages, isPublished, showPlannedPages } from "@/config/pages";
import { useCasePages } from "@/content/use-cases";
import { isUseCaseVisible } from "@/components/pages/UseCasePage";
import SectionHeading from "@/components/landing/SectionHeading";

export const metadata: Metadata = {
    title: "Use cases",
    description: "What people collect with Web Scraper Pro, job by job: lead lists, listings, prices, reviews, job posts and research, with the sites and steps for each.",
    alternates: { canonical: "/use-cases" },
};

export default function UseCasesHub() {
    const list = pages.filter((p) => p.kind === "use-case" && (isPublished(p) || showPlannedPages));
    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="Use cases" title="One job at a time, start to finish" intro="Each page walks through a whole job: which sites, which steps, what the sheet looks like, and what it won't do." />
                <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {list.map((p) => {
                        const c = useCasePages[p.slug];
                        const linkable = c && isUseCaseVisible(c);
                        return (
                            <li key={p.slug} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                                <h2 className="font-semibold text-slate-900 dark:text-white">{linkable ? <Link href={p.href} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{p.label}</Link> : p.label}</h2>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{p.summary}</p>
                                {!linkable && <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">Page on the way</p>}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </main>
    );
}
