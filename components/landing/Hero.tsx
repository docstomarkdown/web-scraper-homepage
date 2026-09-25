"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Car, Chrome, FileText, Image, Mail, Play, Plane, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { productConfig } from "@/config/product";
import ChatDemo, { SCENARIOS } from "@/components/landing/ChatDemo";

// Supported data types without their own demo scenario (all shipped in the extension).
const MORE_TYPES = [
    { label: "Emails & phones", icon: Mail },
    { label: "Hotels & travel", icon: Plane },
    { label: "Cars", icon: Car },
    { label: "Events", icon: Calendar },
    { label: "Research papers", icon: BookOpen },
    { label: "Images & links", icon: Image },
    { label: "Page text", icon: FileText },
];

export default function Hero() {
    const [scenarioIndex, setScenarioIndex] = useState(0);
    const [replayKey, setReplayKey] = useState(0);
    const pinnedRef = useRef(false);
    const demoRef = useRef<HTMLDivElement>(null);

    const pickScenario = (idx: number) => {
        pinnedRef.current = true;
        setScenarioIndex(idx);
        setReplayKey((k) => k + 1);
    };

    const replayMaps = () => {
        pickScenario(0);
        demoRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    // Auto-rotate through scenarios until the visitor picks one.
    const onCycleEnd = () => {
        if (!pinnedRef.current) setScenarioIndex((i) => (i + 1) % SCENARIOS.length);
    };

    return (
        <section className="w-full bg-white dark:bg-slate-950 pt-28 lg:pt-24 pb-20 px-6 md:px-12 lg:px-8 xl:px-12 relative overflow-hidden">
            {/* Background: masked dot grid + soft glows (decorative) */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                <div
                    className="absolute inset-0 text-slate-300 dark:text-slate-700"
                    style={{
                        backgroundImage: "radial-gradient(currentColor 1px, transparent 1px)",
                        backgroundSize: "22px 22px",
                        maskImage: "radial-gradient(ellipse 130% 95% at 35% 45%, black 45%, transparent 90%)",
                        WebkitMaskImage: "radial-gradient(ellipse 130% 95% at 35% 45%, black 45%, transparent 90%)",
                        opacity: 0.7,
                    }}
                />
                <div className="absolute top-16 right-[4%] w-[620px] h-[520px] rounded-full bg-gradient-to-tr from-[#2772ED]/25 via-[#7c3aed]/15 to-[#06b6d4]/20 dark:from-[#2772ED]/30 dark:via-[#7c3aed]/25 dark:to-[#06b6d4]/15 blur-[110px]" />
                <div className="absolute -top-24 -left-20 w-[420px] h-[420px] rounded-full bg-[#2772ED]/10 blur-[120px]" />
                <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-b from-transparent to-white dark:to-slate-950" />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start justify-between max-w-7xl mx-auto gap-12 lg:gap-10 xl:gap-14 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-2xl text-center lg:text-left lg:w-[42%] xl:w-[44%] lg:pt-16 xl:pt-20"
                >
                    <h1 className="text-4xl sm:text-5xl lg:text-[2.6rem] xl:text-[3.4rem] font-bold tracking-tight text-slate-900 dark:text-white leading-[1.06]">
                        Turn any web page into a{" "}
                        <span className="bg-gradient-to-r from-[#2772ED] via-[#4f46e5] to-[#7c3aed] dark:from-[#5b9bff] dark:via-[#818cf8] dark:to-[#a78bfa] bg-clip-text text-transparent">spreadsheet.</span>
                    </h1>

                    <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed mt-6 max-w-md mx-auto lg:mx-0">
                        A free Chrome extension. Just ask for the data you want, and get a clean table ready for Excel or Google Sheets.
                    </p>

                    <div className="flex flex-col sm:flex-row sm:flex-wrap items-center justify-center lg:justify-start gap-3 mt-9">
                        <Link
                            href={`${productConfig.product.ctaUrl}?utm_source=website&utm_medium=hero&utm_campaign=chrome_install`}
                            target="_blank"
                            className="w-full sm:w-auto group inline-flex items-center justify-center rounded-xl bg-[#2772ED] hover:bg-[#1f5ec2] px-7 lg:px-5 xl:px-7 py-3.5 text-base font-semibold text-white whitespace-nowrap transition-all hover:translate-y-[-1px] active:scale-[0.98] gap-2 shadow-lg shadow-[#2772ED]/25"
                        >
                            <Chrome className="w-5 h-5" />
                            Add to Chrome — it&apos;s free
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button
                            type="button"
                            onClick={replayMaps}
                            className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-[#2772ED]/50 hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff] px-6 lg:px-4 xl:px-6 py-3.5 text-base font-semibold text-slate-700 dark:text-slate-200 whitespace-nowrap transition-colors gap-2"
                        >
                            <Play className="w-4 h-4" />
                            See it on Maps
                        </button>
                    </div>

                    <p className="text-sm font-medium text-slate-700 dark:text-slate-200 mt-10 mb-3">What do you want to collect? <span className="font-normal text-slate-500 dark:text-slate-400">Pick one to see it work.</span></p>
                    <div className="flex flex-wrap justify-center lg:justify-start gap-2">
                        {SCENARIOS.map((sc, idx) => {
                            const active = idx === scenarioIndex;
                            return (
                                <button
                                    key={sc.id}
                                    type="button"
                                    onClick={() => pickScenario(idx)}
                                    aria-pressed={active}
                                    className={[
                                        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors",
                                        active
                                            ? "bg-[#2772ED] border-[#2772ED] text-white shadow-sm shadow-[#2772ED]/25"
                                            : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:border-[#2772ED]/50 hover:text-[#1f5ec2] dark:hover:text-[#7aa7ff]",
                                    ].join(" ")}
                                >
                                    <sc.icon className="w-3.5 h-3.5" />
                                    {sc.chip}
                                </button>
                            );
                        })}
                        {MORE_TYPES.map((t) => (
                            <span
                                key={t.label}
                                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 px-3 py-1.5 text-[13px] text-slate-600 dark:text-slate-300"
                            >
                                <t.icon className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                                {t.label}
                            </span>
                        ))}
                        <span className="inline-flex items-center gap-1 rounded-full border border-dashed border-slate-300 dark:border-slate-700 px-3 py-1.5 text-[13px] text-slate-500 dark:text-slate-400">
                            <Plus className="w-3.5 h-3.5" />
                            any list
                        </span>
                    </div>
                </motion.div>

                <motion.div
                    ref={demoRef}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="w-full lg:w-[58%] xl:w-[56%] lg:pt-12 xl:pt-16 scroll-mt-24"
                >
                    <div className="relative w-full max-w-2xl mx-auto">
                        <ChatDemo scenarioIndex={scenarioIndex} replayKey={replayKey} onCycleEnd={onCycleEnd} />
                        <div className="absolute -z-10 -inset-3 bg-gradient-to-r from-[#2772ED]/6 to-transparent rounded-3xl blur-2xl" />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
