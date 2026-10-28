"use client";

import React, { useRef, useState } from "react";
import { BookUser, ShoppingBag, Store } from "lucide-react";
import ChatDemo, { type Scenario } from "@/components/landing/ChatDemo";

// Only what chat really does (see content/features/ai-chat.ts): a directory list across its pages, a whole Shopify
// catalog, and the list on the open page (one page). Sample data only.
const CHAT_SCENARIOS: Scenario[] = [
    {
        id: "directory",
        chip: "Directory, every page",
        icon: BookUser,
        source: "Business directory · plumbers in Denver",
        prompt: "Collect every plumber in this list",
        working: "Collecting the list, page after page…",
        found: "Found 96 businesses · naming columns…",
        total: "96",
        columns: ["Business", "Phone", "Website"],
        rows: [
            ["Sample Plumbing Co.", "(555) 010-2231", "sampleplumbing.example"],
            ["Riverside Pipe & Drain", "(555) 010-4410", "riversidepipe.example"],
            ["Quick Fix Plumbing", "(555) 010-7782", "quickfixplumbing.example"],
            ["Mile High Drain Pros", "(555) 010-9043", "milehighdrain.example"],
        ],
        file: "plumbers-denver.xlsx",
    },
    {
        id: "shopify",
        chip: "Shopify catalog",
        icon: Store,
        source: "Shopify store · Trail Gear Co.",
        prompt: "Get every product here, one row per size",
        working: "Reading the store's catalog…",
        found: "Found 412 products · adding 1,180 variants…",
        total: "1,180",
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
        chip: "List on this page",
        icon: ShoppingBag,
        source: "Online store · running shoes",
        prompt: "Collect the shoes on this page",
        working: "Reading the list on this page…",
        found: "Found 48 products · naming columns…",
        total: "48",
        columns: ["Product", "Price", "Reviews"],
        rows: [
            ["Trail Runner Lite", "$89.50", "860"],
            ["Road Racer Pro", "$129.99", "1,240"],
            ["Everyday Cushion 3", "$74.00", "412"],
            ["Tempo Knit Trainer", "$109.00", "2,180"],
        ],
        file: "running-shoes.csv",
    },
];

export default function ChatPageDemo() {
    const [index, setIndex] = useState(0);
    const [replayKey, setReplayKey] = useState(0);
    const pinned = useRef(false);

    return (
        <div>
            <ChatDemo
                scenarios={CHAT_SCENARIOS}
                scenarioIndex={index}
                replayKey={replayKey}
                onCycleEnd={() => {
                    if (!pinned.current) setIndex((i) => (i + 1) % CHAT_SCENARIOS.length);
                }}
            />
            <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Choose an example">
                {CHAT_SCENARIOS.map((sc, i) => (
                    <button
                        key={sc.id}
                        type="button"
                        aria-pressed={i === index}
                        onClick={() => {
                            pinned.current = true;
                            setIndex(i);
                            setReplayKey((k) => k + 1);
                        }}
                        className={
                            i === index
                                ? "inline-flex items-center gap-1.5 rounded-full border border-[#1f5ec2] bg-[#1f5ec2] px-3 py-1.5 text-sm font-medium text-white"
                                : "inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-200 hover:border-[#2772ED]/50"
                        }
                    >
                        <sc.icon className="w-3.5 h-3.5" aria-hidden="true" />
                        {sc.chip}
                    </button>
                ))}
            </div>
        </div>
    );
}
