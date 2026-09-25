import React from "react";
import { Check, CloudUpload, Loader2 } from "lucide-react";
import Reveal from "@/components/landing/Reveal";

const POINTS = [
    "Paste up to 200 URLs at a time, or upload a CSV",
    "Runs on our servers, so you can close your laptop",
    "Download results as CSV, JSON or Excel",
];

// Illustrative batch in the mock dashboard (sample data).
const JOBS = [
    { name: "Listings · page 1", status: "done", rows: 25 },
    { name: "Listings · page 2", status: "done", rows: 25 },
    { name: "Listings · page 3", status: "running", rows: 0 },
];

export default function Cloud() {
    return (
        <section id="cloud" className="py-20 md:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2772ED] via-[#3b5bdb] to-[#5b3fd6] px-6 py-12 md:px-12 md:py-14">
                        <div
                            className="absolute inset-0 opacity-20 text-white"
                            style={{ backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)", backgroundSize: "22px 22px" }}
                            aria-hidden="true"
                        />
                        <div className="relative grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <p className="text-sm font-semibold text-blue-100">Cloud</p>
                                <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                                    Bigger jobs? Run them in the cloud.
                                </h2>
                                <p className="mt-4 text-lg text-blue-50/90 leading-relaxed">
                                    Instead of running in your browser, it runs on our servers. Paste your URLs, and the results are waiting in your
                                    dashboard.
                                </p>
                                <ul className="mt-6 space-y-3">
                                    {POINTS.map((p) => (
                                        <li key={p} className="flex items-start gap-3 text-[15px] text-white">
                                            <span className="mt-0.5 flex w-5 h-5 shrink-0 items-center justify-center rounded-full bg-white/20" aria-hidden="true">
                                                <Check className="w-3 h-3" />
                                            </span>
                                            {p}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Mock dashboard card (decorative) */}
                            <div className="rounded-2xl bg-white dark:bg-slate-900 shadow-2xl shadow-black/20 p-5" aria-hidden="true">
                                <div className="flex items-center justify-between">
                                    <p className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                                        <CloudUpload className="w-4 h-4 text-[#2772ED]" />
                                        Batch · 200 URLs
                                    </p>
                                    <span className="text-xs text-slate-500 dark:text-slate-400">124 of 200 done</span>
                                </div>
                                <div className="mt-3 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                    <div className="h-full w-[62%] rounded-full bg-gradient-to-r from-[#2772ED] to-[#5b3fd6]" />
                                </div>
                                <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                                    {JOBS.map((j) => (
                                        <li key={j.name} className="flex items-center justify-between py-2.5 text-sm">
                                            <span className="text-slate-700 dark:text-slate-200">{j.name}</span>
                                            {j.status === "done" ? (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:text-emerald-300">
                                                    <Check className="w-3 h-3" />
                                                    {j.rows} rows
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1 rounded-full bg-[#2772ED]/10 px-2 py-0.5 text-xs font-medium text-[#1f5ec2] dark:text-[#7aa7ff]">
                                                    <Loader2 className="w-3 h-3 animate-spin motion-reduce:animate-none" />
                                                    Running
                                                </span>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                                <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Sample data</p>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
