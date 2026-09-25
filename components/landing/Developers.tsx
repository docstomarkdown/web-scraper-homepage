import React from "react";
import Link from "next/link";
import { ArrowUpRight, Bot, Braces, MonitorSmartphone } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

const POINTS = [
    {
        icon: Bot,
        title: "Connect AI agents over MCP",
        body: "Claude and other MCP clients can queue scrapes of one URL or many, and fetch the results as structured data.",
    },
    {
        icon: MonitorSmartphone,
        title: "Let an agent use your browser",
        body: "Turn on the extension's permission and an agent can collect from the page you have open, including pages you're signed in to.",
    },
    {
        icon: Braces,
        title: "Call the REST API",
        body: "Send URLs with an API key and get the results back as JSON.",
    },
];

// Example exchange using the real MCP tool names (decorative).
const LINES = [
    { dir: "→", text: "scrape_urls", note: "12 URLs" },
    { dir: "←", text: "batch queued", note: "12 jobs" },
    { dir: "→", text: "get_scrape_result", note: "job 1 of 12" },
    { dir: "←", text: "done", note: "25 rows · JSON" },
];

export default function Developers() {
    return (
        <section id="developers" className="py-20 md:py-24 bg-slate-50/70 dark:bg-slate-900/40 border-y border-slate-100 dark:border-slate-800/60">
            <div className="max-w-6xl mx-auto px-6 md:px-12 grid lg:grid-cols-2 gap-12 items-center">
                <Reveal>
                    <SectionHeading
                        align="left"
                        eyebrow="For developers and AI agents"
                        title="Plug it into your AI agent"
                        intro="The same collection engine, available to your code and your agents."
                    />
                    <ul className="mt-8 space-y-6">
                        {POINTS.map((p) => (
                            <li key={p.title} className="flex gap-4">
                                <span className="shrink-0 flex w-10 h-10 items-center justify-center rounded-xl bg-[#2772ED]/10 text-[#2772ED] dark:text-[#7aa7ff]" aria-hidden="true">
                                    <p.icon className="w-5 h-5" />
                                </span>
                                <div>
                                    <h3 className="text-base font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                                    <p className="mt-1 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{p.body}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="https://docs.webscraper.pro"
                        target="_blank"
                        className="mt-8 inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#1f5ec2] dark:text-[#7aa7ff] hover:underline"
                    >
                        Read the developer docs
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                </Reveal>

                <Reveal delay={0.08}>
                    <div className="rounded-2xl border border-slate-800 bg-slate-900 dark:bg-slate-950 shadow-2xl shadow-slate-900/20 dark:shadow-black/40 overflow-hidden" aria-hidden="true">
                        <div className="flex items-center gap-1.5 px-4 py-3 border-b border-slate-800">
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            <span className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                            <span className="ml-3 text-xs text-slate-400">MCP · webscraper-pro</span>
                        </div>
                        <div className="p-5 font-mono text-[13px] leading-7">
                            {LINES.map((l, i) => (
                                <div key={i} className="flex gap-3">
                                    <span className={l.dir === "→" ? "text-[#7aa7ff]" : "text-emerald-400"}>{l.dir}</span>
                                    <span className="text-slate-100">{l.text}</span>
                                    <span className="text-slate-500">{l.note}</span>
                                </div>
                            ))}
                            <p className="mt-3 text-[11px] font-sans text-slate-500">Example</p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
