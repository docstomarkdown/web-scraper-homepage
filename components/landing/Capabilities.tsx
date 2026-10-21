import React from "react";
import Link from "next/link";
import { Columns3, FileSpreadsheet, Layers, Link2, LockKeyhole, SquarePen } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";
import { publishedHref } from "@/config/pages";

const ITEMS: { icon: typeof Layers; title: string; body: string; link?: { slug: string; text: string } }[] = [
    {
        icon: Layers,
        title: "Every page, not just the first",
        body: "Next-page buttons, “Load more” and infinite scroll are all handled, so you get the whole list.",
        link: { slug: "list-scraper", text: "How lists from any website work" },
    },
    {
        icon: LockKeyhole,
        title: "Works where you're signed in",
        body: "It runs in your own browser, so it can read pages you're already signed in to.",
    },
    {
        icon: Link2,
        title: "Hundreds of URLs at once",
        body: "Paste or upload a list of URLs and get one combined table back.",
        link: { slug: "bulk-scraper", text: "See bulk runs" },
    },
    {
        icon: Columns3,
        title: "Columns with real names",
        body: "Columns come back named Price, Rating or Address, not col1 and col2.",
    },
    {
        icon: SquarePen,
        title: "Tidy up before you export",
        body: "Rename, reorder, hide or delete columns and rows in the built-in data viewer.",
        link: { slug: "export-to-google-sheets", text: "See editing and export" },
    },
    {
        icon: FileSpreadsheet,
        title: "Export anywhere",
        body: "Excel, CSV and JSON, or send it straight to Google Sheets.",
    },
];

export default function Capabilities() {
    return (
        <section id="features" className="py-20 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading eyebrow="Features" title="What's handled for you" />
                </Reveal>

                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {ITEMS.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.05}>
                            <div className="flex gap-4">
                                <span className="shrink-0 flex w-10 h-10 items-center justify-center rounded-xl bg-[#2772ED]/10 text-[#1f5ec2] dark:text-[#7aa7ff]" aria-hidden="true">
                                    <item.icon className="w-5 h-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="mt-1.5 text-base text-slate-700 dark:text-slate-200 leading-[1.65]">{item.body}</p>
                                    {item.link && publishedHref(item.link.slug) && (
                                        <Link href={publishedHref(item.link.slug)!} className="mt-2 inline-block text-sm font-semibold text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline">
                                            {item.link.text} →
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
