import type { Metadata } from "next";
import Link from "next/link";
import { comparePages } from "@/content/compare";
import { formatDate } from "@/lib/format-date";
import SectionHeading from "@/components/landing/SectionHeading";

export const metadata: Metadata = {
    title: "Comparisons",
    description: "How Web Scraper Pro compares with other web scraping tools: fair, dated, side by side, with the cases where the other tool is the better choice.",
    alternates: { canonical: "/compare" },
};

export default function CompareHub() {
    const list = Object.values(comparePages);
    return (
        <main className="flex-1 bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <SectionHeading as="h1" eyebrow="Comparisons" title="Web Scraper Pro, side by side" intro="Each comparison opens with when to choose the other tool, carries the date its facts were read, and links its sources. We make Web Scraper Pro; the pages say so." />
                <ul className="mt-12 grid gap-5 sm:grid-cols-2">
                    {list.map((c) => (
                        <li key={c.slug} className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5">
                            <h2 className="font-semibold text-slate-900 dark:text-white"><Link href={`/compare/${c.slug}`} className="hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]">{c.h1}</Link></h2>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{c.meta.description}</p>
                            <p className="mt-3 text-xs text-slate-600 dark:text-slate-300">Compared on {formatDate(c.comparedOn)}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
