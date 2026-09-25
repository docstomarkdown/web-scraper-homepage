import React from "react";
import { Columns3, FileSpreadsheet, Layers, Link2, LockKeyhole, SquarePen } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

const ITEMS = [
    {
        icon: Layers,
        title: "Every page, not just the first",
        body: "Next-page buttons, “Load more” and infinite scroll are all handled, so you get the whole list.",
    },
    {
        icon: LockKeyhole,
        title: "Works where you're signed in",
        body: "It runs in your own browser, so it can read pages you're already logged in to.",
    },
    {
        icon: Link2,
        title: "Hundreds of URLs at once",
        body: "Paste or upload a list of URLs and get one combined table back.",
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
                    <SectionHeading eyebrow="Features" title="Everything you need for clean data" />
                </Reveal>

                <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10">
                    {ITEMS.map((item, i) => (
                        <Reveal key={item.title} delay={i * 0.05}>
                            <div className="flex gap-4">
                                <span className="shrink-0 flex w-10 h-10 items-center justify-center rounded-xl bg-[#2772ED]/10 text-[#2772ED] dark:text-[#7aa7ff]" aria-hidden="true">
                                    <item.icon className="w-5 h-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                                    <p className="mt-1.5 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{item.body}</p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
