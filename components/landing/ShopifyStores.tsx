import React from "react";
import { Check, ChevronDown, Download, FileSpreadsheet, FolderTree, Images, Layers, Link2, Store, Tags } from "lucide-react";
import SectionHeading from "@/components/landing/SectionHeading";
import Reveal from "@/components/landing/Reveal";

const POINTS = [
    {
        icon: Layers,
        title: "Every product, not just the page",
        body: "It reads the store's whole catalog, so you also get the products that aren't on screen.",
    },
    {
        icon: Tags,
        title: "Variants, SKUs and prices",
        body: "One row per product or per variant, with options, SKU, price, compare-at price, stock status, vendor and tags.",
    },
    {
        icon: Images,
        title: "All product images",
        body: "Every image link in your table, or download all the images at once.",
    },
    {
        icon: FolderTree,
        title: "Pick collections",
        body: "Export the whole store, or only the collections you choose.",
    },
    {
        icon: FileSpreadsheet,
        title: "Shopify import CSV",
        body: "Download in Shopify's product import layout, ready to load into another store.",
    },
    {
        icon: Link2,
        title: "Many stores at once",
        body: "Paste a list of store URLs and get one catalog for each.",
    },
];

const COLLECTIONS = [
    { name: "Jackets", count: 184, on: true },
    { name: "Packs", count: 96, on: true },
    { name: "Footwear", count: 212, on: false },
];

export default function ShopifyStores() {
    return (
        <section id="shopify-stores" className="py-20 md:py-24 bg-white dark:bg-slate-950">
            <div className="max-w-6xl mx-auto px-6 md:px-12">
                <Reveal>
                    <SectionHeading
                        eyebrow="Shopify stores"
                        title="Export any Shopify store's full catalog"
                        intro="Open a Shopify store and get every product in one go, straight from the store's own product feed. No paging through the site."
                    />
                </Reveal>

                <div className="mt-14 grid lg:grid-cols-[1fr_380px] gap-12 items-start">
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-8">
                        {POINTS.map((p, i) => (
                            <li key={p.title}>
                                <Reveal delay={i * 0.05} className="flex gap-4">
                                    <span className="shrink-0 flex w-10 h-10 items-center justify-center rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400" aria-hidden="true">
                                        <p.icon className="w-5 h-5" />
                                    </span>
                                    <div>
                                        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{p.title}</h3>
                                        <p className="mt-1.5 text-[15px] text-slate-600 dark:text-slate-300 leading-relaxed">{p.body}</p>
                                    </div>
                                </Reveal>
                            </li>
                        ))}
                    </ul>

                    {/* Mock of the extension's Shopify card (decorative) */}
                    <Reveal delay={0.1}>
                        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-200/60 dark:shadow-black/30 p-5" aria-hidden="true">
                            <div className="flex items-center gap-2">
                                <span className="flex w-8 h-8 items-center justify-center rounded-lg bg-emerald-50 dark:bg-emerald-950/40">
                                    <Store className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Shopify store detected</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">Trail Gear Co. · 1,248 products · 12 collections</p>
                                </div>
                            </div>

                            <p className="mt-5 text-xs font-medium text-slate-700 dark:text-slate-200">Collections</p>
                            <ul className="mt-2 space-y-1.5">
                                {COLLECTIONS.map((c) => (
                                    <li key={c.name} className="flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm">
                                        <span className="flex items-center gap-2 text-slate-700 dark:text-slate-200">
                                            <span
                                                className={`flex w-4 h-4 items-center justify-center rounded ${c.on ? "bg-[#2772ED] text-white" : "border border-slate-300 dark:border-slate-600"}`}
                                            >
                                                {c.on && <Check className="w-3 h-3" />}
                                            </span>
                                            {c.name}
                                        </span>
                                        <span className="text-xs text-slate-400 dark:text-slate-500">{c.count}</span>
                                    </li>
                                ))}
                            </ul>

                            <div className="mt-4 flex items-center justify-between text-sm text-slate-700 dark:text-slate-200">
                                Include variants
                                <span className="relative w-9 h-5 rounded-full bg-[#2772ED]">
                                    <span className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white" />
                                </span>
                            </div>

                            <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-200 dark:border-slate-700 px-3 py-2 text-sm text-slate-700 dark:text-slate-200">
                                Shopify import CSV
                                <ChevronDown className="w-4 h-4 text-slate-400" />
                            </div>

                            <span className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#2772ED] px-4 py-2.5 text-sm font-semibold text-white">
                                <Download className="w-4 h-4" />
                                Export catalog
                            </span>
                            <p className="mt-3 text-[11px] text-slate-400 dark:text-slate-500">Sample data</p>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
