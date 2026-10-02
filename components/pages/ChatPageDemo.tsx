"use client";

import React, { useRef, useState } from "react";
import { MapPin, ShoppingBag, Store } from "lucide-react";
import ChatDemo, { type Scenario } from "@/components/landing/ChatDemo";

// Only what chat really does (see content/features/ai-chat.ts): a Maps search, a whole Shopify
// catalog, and the list on the open page (one page, not every page). Sample data only.
const CHAT_SCENARIOS: Scenario[] = [
    {
        id: "local",
        chip: "Maps search",
        icon: MapPin,
        source: "Maps · plumbers in Denver",
        prompt: "Find plumbers in Denver",
        working: "Searching Maps for plumbers in Denver…",
        found: "Found 50 businesses · reading details…",
        total: "50",
        columns: ["Name", "Phone", "Website"],
        rows: [
            ["Sample Plumbing Co.", "(555) 010-2231", "sampleplumbing.example"],
            ["Riverside Pipe & Drain", "(555) 010-4410", "riversidepipe.example"],
            ["Northside Plumbers", "(555) 010-7782", "northside.example"],
            ["Quick Fix Plumbing", "(555) 010-9043", "quickfix.example"],
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
                                ? "inline-flex items-center gap-1.5 rounded-full border border-[#2772ED] bg-[#2772ED] px-3 py-1.5 text-[13px] font-medium text-white"
                                : "inline-flex items-center gap-1.5 rounded-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-3 py-1.5 text-[13px] font-medium text-slate-700 dark:text-slate-200 hover:border-[#2772ED]/50"
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
