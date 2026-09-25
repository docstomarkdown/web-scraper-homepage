"use client";

import React from "react";
import { motion } from "framer-motion";
import { Anchor, Backpack, BadgeCheck, Bath, BedDouble, Clock, Fish, Footprints, Home, MapPin, Maximize2, Moon, Mountain, Shirt, ShoppingCart, Star, Wind } from "lucide-react";

// The fake "web page" on the left of the hero demo, one layout per scenario.
// Illustrative sample data only: generic names, no real brands.

type Props = { id: string; stage: number; reduceMotion: boolean };

const HIGHLIGHT_ON = ["0 0 0 0px rgba(39,114,237,0)", "0 0 0 2px rgba(39,114,237,0.9)", "0 0 0 0px rgba(39,114,237,0)"];
const HIGHLIGHT_OFF = "0 0 0 0px rgba(39,114,237,0)";

/** Wraps one item of the page: fades in, and pulses a blue ring while it is being collected. */
function Item({ idx, stage, reduceMotion, className, children }: { idx: number; stage: number; reduceMotion: boolean; className: string; children: React.ReactNode }) {
    const collecting = stage === 1 && !reduceMotion;
    return (
        <motion.div
            className={className}
            initial={reduceMotion ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0, boxShadow: collecting ? HIGHLIGHT_ON : HIGHLIGHT_OFF }}
            transition={{ duration: collecting ? 0.8 : 0.3, delay: collecting ? idx * 0.28 : idx * 0.05 }}
        >
            {children}
        </motion.div>
    );
}

function Stars({ value, size = "w-2.5 h-2.5" }: { value: number; size?: string }) {
    return (
        <span className="inline-flex items-center gap-px">
            {[1, 2, 3, 4, 5].map((n) => (
                <Star
                    key={n}
                    className={`${size} ${n <= Math.round(value) ? "text-amber-400 fill-amber-400" : "text-slate-300 dark:text-slate-600"}`}
                />
            ))}
        </span>
    );
}

const card = "rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm";

/* ---------------------------------- Maps ---------------------------------- */

const PLACES = [
    { name: "Bright Smile Dental", rating: 4.9, count: 312, addr: "Congress Ave", open: "Open · Closes 6 PM" },
    { name: "Lakeside Family Dentistry", rating: 4.8, count: 187, addr: "Lake Austin Blvd", open: "Open · Closes 5 PM" },
    { name: "Congress Ave Dental Care", rating: 4.7, count: 96, addr: "S Congress Ave", open: "Closed · Opens 8 AM" },
];
const PINS = [
    { x: 24, y: 38 },
    { x: 58, y: 24 },
    { x: 72, y: 60 },
    { x: 40, y: 72 },
    { x: 86, y: 34 },
];

function MapsPage({ stage, reduceMotion }: { stage: number; reduceMotion: boolean }) {
    return (
        <div className="flex flex-col h-full">
            {/* Mini map */}
            <div className="relative h-28 shrink-0 overflow-hidden bg-emerald-50/70 dark:bg-emerald-950/20 border-b border-slate-200 dark:border-slate-800">
                <div className="absolute inset-0 text-slate-200/80 dark:text-slate-800">
                    <div className="absolute left-0 right-0 top-[45%] h-2 bg-current" />
                    <div className="absolute top-0 bottom-0 left-[35%] w-2 bg-current" />
                    <div className="absolute top-0 bottom-0 left-[68%] w-1.5 bg-current rotate-12 origin-top" />
                    <div className="absolute left-0 right-0 top-[18%] h-1 bg-current" />
                </div>
                <div className="absolute right-2 bottom-2 w-10 h-6 rounded bg-sky-200/70 dark:bg-sky-900/40" />
                {PINS.map((p, i) => (
                    <motion.span
                        key={i}
                        className="absolute -translate-x-1/2 -translate-y-full"
                        style={{ left: `${p.x}%`, top: `${p.y}%` }}
                        animate={stage === 1 && !reduceMotion ? { y: [0, -4, 0] } : { y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.25 }}
                    >
                        <MapPin className="w-4 h-4 text-rose-500 fill-rose-500/90 drop-shadow-sm" strokeWidth={1.5} />
                    </motion.span>
                ))}
            </div>
            {/* Results list */}
            <div className="p-2.5 space-y-2">
                <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Results</p>
                {PLACES.map((p, idx) => (
                    <Item key={p.name} idx={idx} stage={stage} reduceMotion={reduceMotion} className={`${card} p-2`}>
                        <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-100 truncate">{p.name}</p>
                        <p className="flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-300">
                            {p.rating}
                            <Stars value={p.rating} />
                            <span className="text-slate-400 dark:text-slate-500">({p.count})</span>
                        </p>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">Dentist · {p.addr}</p>
                        <p className={`text-[10px] truncate ${p.open.startsWith("Open") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-500"}`}>{p.open}</p>
                    </Item>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------- Products -------------------------------- */

const PRODUCTS = [
    { name: "Trail Runner Lite", price: "$89.50", was: "$109.00", rating: 4.6, tile: "from-sky-100 to-sky-200 dark:from-sky-900/50 dark:to-sky-800/40", tint: "text-sky-600 dark:text-sky-300" },
    { name: "Road Racer Pro", price: "$129.99", was: "$159.99", rating: 4.8, tile: "from-orange-100 to-rose-200 dark:from-orange-900/40 dark:to-rose-900/40", tint: "text-rose-600 dark:text-rose-300" },
    { name: "Everyday Cushion 3", price: "$74.00", was: "", rating: 4.5, tile: "from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700", tint: "text-slate-600 dark:text-slate-300" },
    { name: "Tempo Knit Trainer", price: "$109.00", was: "$125.00", rating: 4.7, tile: "from-emerald-100 to-teal-200 dark:from-emerald-900/40 dark:to-teal-900/40", tint: "text-emerald-600 dark:text-emerald-300" },
];

function ProductsPage({ stage, reduceMotion }: { stage: number; reduceMotion: boolean }) {
    return (
        <div className="p-2.5">
            <div className="flex items-center justify-between mb-2">
                <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-100">Running shoes</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500">126 results</p>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {PRODUCTS.map((p, idx) => (
                    <Item key={p.name} idx={idx} stage={stage} reduceMotion={reduceMotion} className={`${card} p-1.5`}>
                        <div className={`h-14 rounded-md bg-gradient-to-br ${p.tile} flex items-center justify-center`}>
                            <Footprints className={`w-6 h-6 ${p.tint}`} strokeWidth={1.5} />
                        </div>
                        <p className="mt-1 text-[10px] font-medium text-slate-800 dark:text-slate-100 leading-tight line-clamp-2">{p.name}</p>
                        <Stars value={p.rating} />
                        <p className="text-[11px] font-bold text-slate-900 dark:text-white">
                            {p.price}
                            {p.was && <span className="ml-1 text-[9px] font-normal text-slate-400 line-through">{p.was}</span>}
                        </p>
                    </Item>
                ))}
            </div>
        </div>
    );
}

/* -------------------------------- Property -------------------------------- */

const HOMES = [
    { price: "$485,000", beds: 2, baths: 1, sqft: "1,120", addr: "1420 Maple St, Denver", tile: "from-amber-100 to-orange-200 dark:from-amber-900/40 dark:to-orange-900/40", tag: "New" },
    { price: "$412,500", beds: 2, baths: 2, sqft: "960", addr: "88 Larimer Ct #4, Denver", tile: "from-sky-100 to-indigo-200 dark:from-sky-900/40 dark:to-indigo-900/40", tag: "" },
    { price: "$539,900", beds: 2, baths: 2, sqft: "1,340", addr: "2716 Oak Ridge Dr, Denver", tile: "from-emerald-100 to-lime-200 dark:from-emerald-900/40 dark:to-lime-900/30", tag: "Price cut" },
];

function PropertyPage({ stage, reduceMotion }: { stage: number; reduceMotion: boolean }) {
    return (
        <div className="p-2.5 space-y-2">
            <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-100">2-bed homes · 63 listings</p>
            {HOMES.map((h, idx) => (
                <Item key={h.addr} idx={idx} stage={stage} reduceMotion={reduceMotion} className={`${card} p-1.5 flex gap-2`}>
                    <div className={`relative w-16 h-14 shrink-0 rounded-md bg-gradient-to-br ${h.tile} flex items-center justify-center`}>
                        <Home className="w-6 h-6 text-slate-600/70 dark:text-slate-300/70" strokeWidth={1.5} />
                        {h.tag && (
                            <span className="absolute top-0.5 left-0.5 rounded bg-white/90 dark:bg-slate-900/90 px-1 text-[8px] font-semibold text-slate-700 dark:text-slate-200">
                                {h.tag}
                            </span>
                        )}
                    </div>
                    <div className="min-w-0">
                        <p className="text-[12px] font-bold text-slate-900 dark:text-white">{h.price}</p>
                        <p className="flex items-center gap-1.5 text-[9px] text-slate-600 dark:text-slate-300">
                            <span className="inline-flex items-center gap-0.5"><BedDouble className="w-2.5 h-2.5" />{h.beds} bd</span>
                            <span className="inline-flex items-center gap-0.5"><Bath className="w-2.5 h-2.5" />{h.baths} ba</span>
                            <span className="inline-flex items-center gap-0.5"><Maximize2 className="w-2.5 h-2.5" />{h.sqft}</span>
                        </p>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{h.addr}</p>
                    </div>
                </Item>
            ))}
        </div>
    );
}

/* ---------------------------------- Jobs ---------------------------------- */

const JOBS = [
    { role: "Data Analyst", co: "Northwind Labs", where: "Remote", pay: "$78K–$92K", age: "2d ago", logo: "from-indigo-500 to-violet-600", mark: Wind },
    { role: "Senior Data Analyst", co: "Bluefin Health", where: "Remote", pay: "$110K–$128K", age: "5h ago", logo: "from-sky-400 to-blue-600", mark: Fish },
    { role: "Marketing Analyst", co: "Crescent Retail", where: "Remote · US", pay: "$70K–$85K", age: "1d ago", logo: "from-amber-400 to-orange-500", mark: Moon },
    { role: "BI Analyst", co: "Harbor Freightworks", where: "Hybrid · Chicago", pay: "$88K–$101K", age: "3d ago", logo: "from-emerald-400 to-teal-600", mark: Anchor },
];

function JobsPage({ stage, reduceMotion }: { stage: number; reduceMotion: boolean }) {
    return (
        <div className="p-2.5 space-y-1.5">
            <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-100">Data analyst · Remote · 85 jobs</p>
            {JOBS.map((j, idx) => (
                <Item key={j.role} idx={idx} stage={stage} reduceMotion={reduceMotion} className={`${card} p-2 flex gap-2`}>
                    <span className={`w-6 h-6 shrink-0 rounded-md bg-gradient-to-br ${j.logo} flex items-center justify-center shadow-sm`}>
                        <j.mark className="w-3.5 h-3.5 text-white" strokeWidth={2.25} />
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-100 truncate">{j.role}</p>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{j.co} · {j.where}</p>
                        <div className="mt-0.5 flex items-center justify-between gap-1">
                            <span className="rounded bg-emerald-50 dark:bg-emerald-950/40 px-1 text-[9px] font-medium text-emerald-700 dark:text-emerald-300">{j.pay}</span>
                            <span className="inline-flex items-center gap-0.5 text-[8px] text-slate-400 dark:text-slate-500"><Clock className="w-2 h-2" />{j.age}</span>
                        </div>
                    </div>
                </Item>
            ))}
        </div>
    );
}

/* --------------------------------- Reviews -------------------------------- */

const REVIEWS = [
    { who: "Priya S.", stars: 5, title: "Battery lasts all week", body: "Charged once on Monday and still going.", date: "Aug 12" },
    { who: "Mark T.", stars: 3, title: "Case feels cheap", body: "Sound is fine but the lid wobbles.", date: "Aug 9" },
    { who: "Dana L.", stars: 5, title: "Great for the gym", body: "Stays in during runs, no sweat issues.", date: "Aug 3" },
];
const BARS = [72, 14, 6, 3, 5];

function ReviewsPage({ stage, reduceMotion }: { stage: number; reduceMotion: boolean }) {
    return (
        <div className="p-2.5 space-y-2">
            {/* Summary */}
            <div className={`${card} p-2 flex gap-2.5`}>
                <div className="shrink-0 text-center">
                    <p className="text-lg font-bold leading-none text-slate-900 dark:text-white">4.3</p>
                    <Stars value={4.3} />
                    <p className="text-[8px] text-slate-400 dark:text-slate-500 mt-0.5">1,204 reviews</p>
                </div>
                <div className="flex-1 space-y-0.5">
                    {BARS.map((pct, i) => (
                        <div key={i} className="flex items-center gap-1">
                            <span className="text-[8px] w-2 text-slate-500 dark:text-slate-400">{5 - i}</span>
                            <div className="flex-1 h-1 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                                <div className="h-full rounded-full bg-amber-400" style={{ width: `${pct}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {REVIEWS.map((r, idx) => (
                <Item key={r.who} idx={idx} stage={stage} reduceMotion={reduceMotion} className={`${card} p-2`}>
                    <div className="flex items-center justify-between">
                        <Stars value={r.stars} />
                        <span className="text-[8px] text-slate-400 dark:text-slate-500">{r.date}</span>
                    </div>
                    <p className="mt-0.5 text-[10px] font-semibold text-slate-800 dark:text-slate-100 truncate">{r.title}</p>
                    <p className="text-[9px] text-slate-500 dark:text-slate-400 truncate">{r.body}</p>
                    <p className="mt-0.5 flex items-center gap-1 text-[8px] text-slate-500 dark:text-slate-400">
                        {r.who}
                        <span className="inline-flex items-center gap-0.5 text-emerald-600 dark:text-emerald-400">
                            <BadgeCheck className="w-2.5 h-2.5" />
                            Verified purchase
                        </span>
                    </p>
                </Item>
            ))}
        </div>
    );
}

/* -------------------------------- Shopify --------------------------------- */

const SHOP_ITEMS = [
    { name: "Alpine Down Jacket", price: "$189.00", icon: Shirt, tile: "from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600", tint: "text-slate-700 dark:text-slate-200", variants: "6 colors" },
    { name: "Summit 40L Pack", price: "$149.00", icon: Backpack, tile: "from-emerald-100 to-emerald-200 dark:from-emerald-900/40 dark:to-emerald-800/40", tint: "text-emerald-700 dark:text-emerald-300", variants: "3 colors" },
    { name: "Ridge Trail Shoe", price: "$129.00", icon: Footprints, tile: "from-orange-100 to-amber-200 dark:from-orange-900/40 dark:to-amber-900/40", tint: "text-orange-600 dark:text-orange-300", variants: "12 sizes" },
    { name: "Basecamp Tent 2P", price: "$329.00", icon: Mountain, tile: "from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/40", tint: "text-sky-700 dark:text-sky-300", variants: "2 colors" },
];

function ShopifyPage({ stage, reduceMotion }: { stage: number; reduceMotion: boolean }) {
    return (
        <div className="flex flex-col h-full">
            {/* Store header */}
            <div className="flex items-center justify-between px-2.5 py-2 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                <p className="text-[11px] font-bold tracking-wide text-slate-900 dark:text-white">TRAIL GEAR CO.</p>
                <ShoppingCart className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            </div>
            <div className="flex gap-1 px-2.5 pt-2">
                {["All", "Jackets", "Packs", "Footwear"].map((c, i) => (
                    <span
                        key={c}
                        className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${i === 0 ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"}`}
                    >
                        {c}
                    </span>
                ))}
            </div>
            <div className="p-2.5 grid grid-cols-2 gap-2">
                {SHOP_ITEMS.map((p, idx) => (
                    <Item key={p.name} idx={idx} stage={stage} reduceMotion={reduceMotion} className={`${card} p-1.5`}>
                        <div className={`h-12 rounded-md bg-gradient-to-br ${p.tile} flex items-center justify-center`}>
                            <p.icon className={`w-5 h-5 ${p.tint}`} strokeWidth={1.5} />
                        </div>
                        <p className="mt-1 text-[10px] font-medium text-slate-800 dark:text-slate-100 leading-tight truncate">{p.name}</p>
                        <p className="text-[11px] font-bold text-slate-900 dark:text-white">{p.price}</p>
                        <p className="text-[9px] text-slate-400 dark:text-slate-500">{p.variants}</p>
                    </Item>
                ))}
            </div>
            <p className="px-2.5 text-[9px] text-slate-400 dark:text-slate-500">Showing 4 of 1,248 products</p>
        </div>
    );
}

export default function SourcePage({ id, stage, reduceMotion }: Props) {
    const p = { stage, reduceMotion };
    switch (id) {
        case "local":
            return <MapsPage {...p} />;
        case "shopify":
            return <ShopifyPage {...p} />;
        case "products":
            return <ProductsPage {...p} />;
        case "property":
            return <PropertyPage {...p} />;
        case "jobs":
            return <JobsPage {...p} />;
        case "reviews":
            return <ReviewsPage {...p} />;
        default:
            return null;
    }
}
