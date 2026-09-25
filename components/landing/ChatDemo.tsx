"use client";

import React, { useEffect, useRef, useState } from "react";
import SourcePage from "@/components/landing/SourcePage";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
    ArrowUp,
    Briefcase,
    Check,
    Download,
    FileSpreadsheet,
    FileText,
    Home,
    Loader2,
    MapPin,
    MessageSquareQuote,
    Search,
    ShoppingBag,
    Sparkles,
    Store,
    Table2,
} from "lucide-react";

// Illustrative sample data only: generic names, 555 numbers, no real brands.
export type Scenario = {
    id: string;
    chip: string;
    icon: React.ElementType;
    source: string;
    prompt: string;
    working: string;
    found: string;
    total: string;
    columns: [string, string, string];
    rows: [string, string, string][];
    file: string;
};

export const SCENARIOS: Scenario[] = [
    {
        id: "local",
        chip: "Local businesses",
        icon: MapPin,
        source: "Maps · dentists in Austin",
        prompt: "Find dentists in Austin",
        working: "Searching Maps for dentists in Austin…",
        found: "Found 48 businesses · reading details…",
        total: "48",
        columns: ["Name", "Phone", "Website"],
        rows: [
            ["Bright Smile Dental", "(512) 555-0142", "brightsmile.com"],
            ["Lakeside Family Dentistry", "(512) 555-0187", "lakesidefd.com"],
            ["Congress Ave Dental Care", "(512) 555-0123", "congressdental.com"],
            ["Hill Country Orthodontics", "(512) 555-0164", "hcortho.com"],
        ],
        file: "dentists-austin.xlsx",
    },
    {
        id: "shopify",
        chip: "Shopify stores",
        icon: Store,
        source: "Shopify store · Trail Gear Co.",
        prompt: "Export this store's full catalog",
        working: "Reading the store's catalog…",
        found: "Found 1,248 products · adding 3,904 variants…",
        total: "3,904",
        columns: ["Product", "SKU", "Price"],
        rows: [
            ["Alpine Down Jacket · Black / M", "ADJ-BLK-M", "$189.00"],
            ["Alpine Down Jacket · Black / L", "ADJ-BLK-L", "$189.00"],
            ["Summit 40L Pack · Moss", "S40-MOS", "$149.00"],
            ["Merino Trail Socks · 3-pack", "MTS-3P-M", "$24.00"],
        ],
        file: "trail-gear-catalog.csv",
    },
    {
        id: "products",
        chip: "Products & prices",
        icon: ShoppingBag,
        source: "Online store · running shoes",
        prompt: "Collect every shoe on this page with prices",
        working: "Reading the product list, all pages…",
        found: "Found 126 products · adding review counts…",
        total: "126",
        columns: ["Product", "Price", "Reviews"],
        rows: [
            ["Trail Runner Lite", "$89.50", "860"],
            ["Road Racer Pro", "$129.99", "1,240"],
            ["Everyday Cushion 3", "$74.00", "412"],
            ["Tempo Knit Trainer", "$109.00", "2,180"],
        ],
        file: "running-shoes.csv",
    },
    {
        id: "property",
        chip: "Property listings",
        icon: Home,
        source: "Listings · 2-bed homes in Denver",
        prompt: "Grab these listings with price and size",
        working: "Collecting listings from every page…",
        found: "Found 63 listings · opening each one…",
        total: "63",
        columns: ["Address", "Price", "Sq ft"],
        rows: [
            ["1420 Maple St", "$485,000", "1,120"],
            ["88 Larimer Ct #4", "$412,500", "960"],
            ["2716 Oak Ridge Dr", "$539,900", "1,340"],
            ["501 Pine Ave", "$449,000", "1,050"],
        ],
        file: "denver-listings.xlsx",
    },
    {
        id: "jobs",
        chip: "Job posts",
        icon: Briefcase,
        source: "Job board · data analyst, remote",
        prompt: "Collect all jobs here with salaries",
        working: "Collecting job posts…",
        found: "Found 85 jobs · reading salaries…",
        total: "85",
        columns: ["Role", "Company", "Salary"],
        rows: [
            ["Data Analyst", "Northwind Labs", "$78K–$92K"],
            ["Senior Data Analyst", "Bluefin Health", "$110K–$128K"],
            ["Marketing Analyst", "Crescent Retail", "$70K–$85K"],
            ["BI Analyst", "Harbor Freightworks", "$88K–$101K"],
        ],
        file: "analyst-jobs.csv",
    },
    {
        id: "reviews",
        chip: "Reviews",
        icon: MessageSquareQuote,
        source: "Product reviews · wireless earbuds",
        prompt: "Get all the reviews for this product",
        working: "Reading reviews, all pages…",
        found: "Found 1,204 reviews · tidying columns…",
        total: "1,204",
        columns: ["Reviewer", "Rating", "Review"],
        rows: [
            ["Priya S.", "5", "Battery lasts all week"],
            ["Mark T.", "3", "Case feels cheap"],
            ["Dana L.", "5", "Great for the gym"],
            ["Omar K.", "2", "Left bud stopped working"],
        ],
        file: "earbud-reviews.xlsx",
    },
];

// Stage timeline (ms): 0 typing → 1 searching → 2 results → 3 download.
const STAGE_MS = [1700, 1600, 2300, 2800];
type Stage = 0 | 1 | 2 | 3;

export default function ChatDemo({
    scenarioIndex,
    replayKey,
    onCycleEnd,
}: {
    scenarioIndex: number;
    replayKey: number;
    onCycleEnd: () => void;
}) {
    const reduceMotion = useReducedMotion();
    const s = SCENARIOS[scenarioIndex];
    const [stage, setStage] = useState<Stage>(reduceMotion ? 3 : 0);
    const [typed, setTyped] = useState(reduceMotion ? s.prompt.length : 0);
    const onCycleEndRef = useRef(onCycleEnd);
    onCycleEndRef.current = onCycleEnd;

    // Stage clock.
    useEffect(() => {
        if (reduceMotion) {
            setStage(3);
            return;
        }
        let i = 0;
        let timer: ReturnType<typeof setTimeout>;
        const tick = () => {
            setStage(i as Stage);
            timer = setTimeout(() => {
                if (i === STAGE_MS.length - 1) {
                    i = 0;
                    onCycleEndRef.current();
                } else {
                    i += 1;
                }
                tick();
            }, STAGE_MS[i]);
        };
        tick();
        return () => clearTimeout(timer);
    }, [scenarioIndex, replayKey, reduceMotion]);

    // Typewriter for the prompt during stage 0.
    useEffect(() => {
        if (reduceMotion) {
            setTyped(s.prompt.length);
            return;
        }
        if (stage !== 0) return;
        setTyped(0);
        const perChar = Math.max(18, Math.floor((STAGE_MS[0] - 400) / s.prompt.length));
        const id = setInterval(() => setTyped((n) => (n >= s.prompt.length ? n : n + 1)), perChar);
        return () => clearInterval(id);
    }, [stage, s.prompt, reduceMotion]);

    const sent = stage >= 1;

    return (
        <div
            className="relative w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/60 dark:shadow-black/30 overflow-hidden"
            role="img"
            aria-label={`Demo: the user types "${s.prompt}" in the extension chat. It collects ${s.total} rows with ${s.columns.join(", ")} columns and downloads ${s.file}.`}
        >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60">
                <span className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600" />
                </span>
                <div className="flex-1 min-w-0 flex items-center gap-1.5 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2.5 py-1 text-[11px] text-slate-500 dark:text-slate-400">
                    <Search className="w-3 h-3 shrink-0" />
                    <span className="truncate">{s.source}</span>
                </div>
            </div>

            <div className="grid md:grid-cols-[36%_64%]">
                {/* Source page (hidden on small screens) */}
                <div className="hidden md:block relative overflow-hidden border-r border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40">
                    <SourcePage key={`${s.id}-${replayKey}`} id={s.id} stage={stage} reduceMotion={!!reduceMotion} />
                </div>

                {/* Extension side panel: chat */}
                <div className="flex flex-col h-[410px]">
                    <div className="flex items-center gap-1.5 px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                        <Sparkles className="w-3.5 h-3.5 text-[#2772ED]" />
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">Web Scraper Pro</p>
                        <span className="ml-auto text-[10px] text-slate-400 dark:text-slate-500">Chat</span>
                    </div>

                    <div className="flex-1 overflow-hidden px-3 py-2.5 space-y-2">
                        <AnimatePresence initial={false}>
                            {sent && (
                                <motion.div
                                    key={`u-${s.id}-${replayKey}`}
                                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-end"
                                >
                                    <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-[#2772ED] px-3 py-1.5 text-[11px] text-white">{s.prompt}</p>
                                </motion.div>
                            )}
                            {sent && (
                                <motion.div
                                    key={`a1-${s.id}-${replayKey}`}
                                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: reduceMotion ? 0 : 0.25 }}
                                    className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-300"
                                >
                                    {stage === 1 ? (
                                        <Loader2 className="w-3.5 h-3.5 text-[#2772ED] animate-spin shrink-0" />
                                    ) : (
                                        <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                                    )}
                                    <span>{stage === 1 ? s.working : stage === 2 ? s.found : `Done. ${s.total} rows ready.`}</span>
                                </motion.div>
                            )}
                            {stage >= 2 && (
                                <motion.div
                                    key={`t-${s.id}-${replayKey}`}
                                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden"
                                >
                                    <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                                        <Table2 className="w-3 h-3" />
                                        {s.total} rows
                                    </div>
                                    <table className="w-full table-fixed border-collapse text-[10px] sm:text-[11px]">
                                        <colgroup>
                                            <col style={{ width: "38%" }} />
                                            <col style={{ width: "28%" }} />
                                            <col style={{ width: "34%" }} />
                                        </colgroup>
                                        <thead>
                                            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                                                {s.columns.map((c) => (
                                                    <th key={c} className="px-2 py-1 text-left font-semibold">
                                                        {c}
                                                    </th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {s.rows.map((r, idx) => (
                                                <motion.tr
                                                    key={`${s.id}-${idx}`}
                                                    className="border-b last:border-b-0 border-slate-100 dark:border-slate-800"
                                                    initial={reduceMotion ? false : { opacity: 0, x: -4 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.25, delay: reduceMotion ? 0 : 0.15 + idx * 0.3 }}
                                                >
                                                    <td className="px-2 py-1 truncate text-slate-800 dark:text-slate-100">{r[0]}</td>
                                                    <td className="px-2 py-1 truncate text-slate-600 dark:text-slate-300">{r[1]}</td>
                                                    <td className="px-2 py-1 truncate text-[#1f5ec2] dark:text-[#7aa7ff]">{r[2]}</td>
                                                </motion.tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </motion.div>
                            )}
                            {stage === 3 && (
                                <motion.div
                                    key={`d-${s.id}-${replayKey}`}
                                    initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-1.5"
                                >
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <DownloadChip icon={<FileSpreadsheet className="w-3 h-3" />} label="Excel" pressed={s.file.endsWith(".xlsx")} />
                                        <DownloadChip icon={<FileText className="w-3 h-3" />} label="CSV" pressed={s.file.endsWith(".csv")} />
                                        <DownloadChip icon={<Table2 className="w-3 h-3" />} label="Sheets" pressed={false} />
                                    </div>
                                    <motion.p
                                        initial={reduceMotion ? false : { opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: reduceMotion ? 0 : 0.7 }}
                                        className="inline-flex items-center gap-1.5 text-[11px] font-medium text-emerald-700 dark:text-emerald-300"
                                    >
                                        <Download className="w-3.5 h-3.5" />
                                        Downloaded {s.file}
                                    </motion.p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Composer */}
                    <div className="px-3 pb-3">
                        <div className="flex items-center gap-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-2">
                            <p className="flex-1 min-w-0 truncate text-[11px]">
                                {stage === 0 ? (
                                    <span className="text-slate-800 dark:text-slate-100">
                                        {s.prompt.slice(0, typed)}
                                        <span className="inline-block w-px h-3 align-middle bg-slate-800 animate-pulse ml-px" />
                                    </span>
                                ) : (
                                    <span className="text-slate-400 dark:text-slate-500">Ask for any data on this page…</span>
                                )}
                            </p>
                            <span
                                className={[
                                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-colors",
                                    stage === 0 && typed >= s.prompt.length ? "bg-[#2772ED] text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500",
                                ].join(" ")}
                            >
                                <ArrowUp className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <p className="mt-1.5 text-[10px] text-slate-400 dark:text-slate-500">Sample data</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

function DownloadChip({ icon, label, pressed }: { icon: React.ReactNode; label: string; pressed: boolean }) {
    return (
        <motion.span
            animate={pressed ? { scale: [1, 0.94, 1] } : {}}
            transition={{ delay: 0.4, duration: 0.3 }}
            className={[
                "inline-flex items-center gap-1 rounded-md border px-2 py-1 text-[10px] font-semibold",
                pressed ? "bg-[#2772ED] border-[#2772ED] text-white" : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300",
            ].join(" ")}
        >
            {icon}
            {label}
        </motion.span>
    );
}
