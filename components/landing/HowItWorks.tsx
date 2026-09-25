import React from "react";
import { Download, Globe, MessageSquareText } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

const STEPS = [
    {
        icon: Globe,
        title: "Install, then open a page",
        body: "Add the free extension to Chrome, then go to the page you want: a Maps search, a store category, a job board or a page of listings.",
    },
    {
        icon: MessageSquareText,
        title: "Ask, or click Collect",
        body: "Type what you want in plain English, or click Collect. It finds the list, follows every page and fills the table.",
    },
    {
        icon: Download,
        title: "Export",
        body: "Download Excel, CSV or JSON, or send the table straight to Google Sheets.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-20 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading eyebrow="How it works" title="From web page to spreadsheet in three steps" />
                </Reveal>

                <div className="mt-14 relative">
                    {/* Connector line behind the step badges (desktop) */}
                    <div
                        className="hidden md:block absolute top-6 left-[16%] right-[16%] h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent"
                        aria-hidden="true"
                    />
                    <ol className="relative grid md:grid-cols-3 gap-8 md:gap-6">
                        {STEPS.map((s, i) => (
                            <li key={s.title} className="relative text-center px-2">
                                <Reveal delay={i * 0.08}>
                                    <span className="relative z-10 mx-auto flex w-12 h-12 items-center justify-center rounded-2xl bg-[#2772ED] text-white shadow-lg shadow-[#2772ED]/25">
                                        <s.icon className="w-5 h-5" aria-hidden="true" />
                                    </span>
                                    <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">Step {i + 1}</p>
                                    <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">{s.title}</h3>
                                    <p className="mt-2 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed max-w-xs mx-auto">{s.body}</p>
                                </Reveal>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    );
}
